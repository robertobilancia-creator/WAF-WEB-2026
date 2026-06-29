// DC (.dc.html) -> standalone static HTML renderer
// Usage: node render.js <src.dc.html> <out.html> "Page Title"
const fs = require('fs');
const { parse } = require('node-html-parser');

const [,, SRC, OUT, TITLE='We Are Fiber'] = process.argv;
const raw = fs.readFileSync(SRC, 'utf8');

/* ---------- 1. extract dc-script + eval data ---------- */
const scriptMatch = raw.match(/<script[^>]*data-dc-script[^>]*>([\s\S]*?)<\/script>/);
const scriptBody = scriptMatch ? scriptMatch[1] : '';

const CAMEL = {strokeWidth:'stroke-width',strokeLinecap:'stroke-linecap',strokeLinejoin:'stroke-linejoin',
  strokeMiterlimit:'stroke-miterlimit',strokeDasharray:'stroke-dasharray',fillRule:'fill-rule',
  clipRule:'clip-rule',fillOpacity:'fill-opacity',strokeOpacity:'stroke-opacity'};
const KEEP = new Set(['viewBox','preserveAspectRatio']);
function attrName(k){ if(k==='className')return 'class'; if(KEEP.has(k))return k; if(CAMEL[k])return CAMEL[k];
  return /[A-Z]/.test(k)? k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()) : k; }
function styleObj(o){ return Object.entries(o).map(([k,v])=>{const kk=/[A-Z]/.test(k)?k.replace(/[A-Z]/g,m=>'-'+m.toLowerCase()):k; return `${kk}:${v}`;}).join(';'); }
function serialize(node){
  if(node==null||node===false) return '';
  if(Array.isArray(node)) return node.map(serialize).join('');
  if(typeof node!=='object') return String(node);
  const {tag,props,children}=node;
  let a='';
  for(const [k,v] of Object.entries(props||{})){
    if(v==null||v===false) continue;
    if(k==='children') continue;
    if(k==='style'&&typeof v==='object'){ a+=` style="${styleObj(v)}"`; continue; }
    a+=` ${attrName(k)}="${String(v).replace(/"/g,'&quot;')}"`;
  }
  const kids=(children||[]).map(serialize).join('');
  return `<${tag}${a}>${kids}</${tag}>`;
}
const React = { createElement:(tag,props,...children)=>({tag,props:props||{},children:children.flat()}) };
class DCLogic { constructor(){ this.state={}; } setState(o){ Object.assign(this.state,o); } }
let data={};
try {
  const fn = new Function('DCLogic','React', scriptBody + '\n;return new Component();');
  const inst = fn(DCLogic, React);
  data = inst.renderVals();
} catch(e){ console.error('DATA EVAL ERROR:', e.message); process.exit(1); }

/* ---------- 2. expression interpolation ---------- */
function evalExpr(expr, scope){
  try {
    const keys=Object.keys(scope);
    const f=new Function(...keys, 'return ('+expr+');');
    return f(...keys.map(k=>scope[k]));
  } catch(e){ return ''; }
}
function interp(str, scope){
  return str.replace(/\{\{([\s\S]*?)\}\}/g, (_,e)=>{
    const v=evalExpr(e.trim(), scope);
    if(v==null) return '';
    if(typeof v==='object' && (v.tag || Array.isArray(v))) return serialize(v); // React element → SVG/HTML
    return String(v);
  });
}

/* ---------- 3. hover CSS collection ---------- */
let hoverRules=[]; let hid=0;

/* ---------- 4. recursive render ---------- */
function renderNode(node, scope){
  // text node
  if(node.nodeType===3) return interp(node.rawText, scope);
  if(node.nodeType!==1) return ''; // comments etc
  const tag=node.rawTagName ? node.rawTagName.toLowerCase() : '';

  if(tag==='helmet' || tag==='script') return '';

  if(tag==='sc-for'){
    const listExpr=(node.getAttribute('list')||'').replace(/^\{\{|\}\}$/g,'').trim();
    const as=node.getAttribute('as')||'item';
    const arr=evalExpr(listExpr, scope);
    if(!Array.isArray(arr)) return '';
    let out='';
    arr.forEach((item,i)=>{
      const s=Object.assign({},scope,{[as]:item,[as+'_index']:i,index:i});
      out+=node.childNodes.map(c=>renderNode(c,s)).join('');
    });
    return out;
  }
  if(tag==='sc-if'){
    const vExpr=(node.getAttribute('value')||'').replace(/^\{\{|\}\}$/g,'').trim();
    const cond=evalExpr(vExpr, scope);
    if(!cond) return '';
    return node.childNodes.map(c=>renderNode(c,s=scope)).join('');
  }

  // normal element
  let attrs='';
  const entries=Object.entries(node.attributes||{});
  let cls=node.getAttribute('class')||'';
  for(const [k,v] of entries){
    const lk=k.toLowerCase();
    if(lk==='style-hover'){
      const css=interp(v,scope);
      const cn='dc-h-'+(hid++);
      cls=(cls?cls+' ':'')+cn;
      hoverRules.push(`.${cn}:hover{${css}}`);
      continue;
    }
    if(lk.startsWith('on')) continue;            // drop handlers
    if(['list','as','value','class'].includes(lk)) continue;
    if(lk.startsWith('hint-placeholder')) continue;
    attrs+=` ${k}="${interp(v,scope).replace(/"/g,'&quot;')}"`;
  }
  if(cls) attrs=` class="${interp(cls,scope).replace(/"/g,'&quot;')}"`+attrs;
  const inner=node.childNodes.map(c=>renderNode(c,scope)).join('');
  const VOID=new Set(['img','input','br','hr','meta','link','source','area','base','col','embed','param','track','wbr']);
  if(VOID.has(tag)) return `<${tag}${attrs}>`;
  return `<${tag}${attrs}>${inner}</${tag}>`;
}

/* ---------- 5. extract x-dc inner via regex (robust) + parse fragment ---------- */
// Browser HTML parsing implicitly closes any <div> left open inside a <section>
// when </section> is reached. node-html-parser doesn't, so unbalanced source
// nests later sections inside a stray container. Replicate the browser here.
function balanceSections(html){
  const tokens = html.split(/(<section\b[^>]*>|<\/section>|<div\b[^>]*>|<\/div>)/);
  let out='', divDepth=0; const base=[];
  for(const t of tokens){
    if(/^<section\b/.test(t)){ base.push(divDepth); out+=t; }
    else if(t==='</section>'){ const b=base.pop()??0; while(divDepth>b){ out+='</div>'; divDepth--; } out+=t; }
    else if(/^<div\b/.test(t)){ divDepth++; out+=t; }
    else if(t==='</div>'){ if(divDepth>0)divDepth--; out+=t; }
    else out+=t;
  }
  return out;
}
const xm = raw.match(/<x-dc(?:\s[^>]*)?>([\s\S]*?)<\/x-dc>/);
if(!xm){ console.error('no x-dc'); process.exit(1); }
const frag=parse(balanceSections(xm[1]),{comment:false,blockTextElements:{script:true,style:true}});
const helmet=frag.querySelector('helmet');
let pageStyle='';
if(helmet){ const st=helmet.querySelector('style'); if(st) pageStyle=st.innerHTML; }

// render all x-dc children except helmet/script
const body=frag.childNodes.map(c=>renderNode(c, data)).join('');

/* ---------- 6. shared chrome + root-relative paths + assemble ---------- */
const path=require('path');
const HEADER=fs.readFileSync(path.join(__dirname,'partials','header.html'),'utf8');
const FOOTER=fs.readFileSync(path.join(__dirname,'partials','footer.html'),'utf8');

let b=body
  // remove source sticky header wrapper (…</header></div>) and source footer
  .replace(/<div style="position:sticky;[^"]*">[\s\S]*?<\/header>\s*<\/div>/,'')
  .replace(/<footer[\s\S]*?<\/footer>/,'')
  // root-relative asset paths
  .replace(/(src|href)="(assets|crops)\//g,'$1="/$2/')
  // home links from the dc sources
  .replace(/href="WeAreFiber Home[^"]*"/g,'href="/"');

const out=`<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE}</title>
<link rel="stylesheet" href="/fiber-tokens.css">
<style>
${pageStyle}
${hoverRules.join('\n')}
</style>
<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}</script>
<script src="/reveal.js" defer></script>
</head>
<body>
${HEADER}
${b}
${FOOTER}
</body>
</html>`;
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT, out);
console.log('WROTE', OUT, (out.length/1024|0)+'KB', '| hover rules:', hoverRules.length);
