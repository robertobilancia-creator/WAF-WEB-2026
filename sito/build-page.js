// Wrap an authored body fragment with shared header/footer + head.
// Usage: node build-page.js <body-fragment.html> <out/index.html> "Page Title"
const fs=require('fs'), path=require('path');
const [,,FRAG,OUT,TITLE='We Are Fiber']=process.argv;
const body=fs.readFileSync(FRAG,'utf8');
const HEADER=fs.readFileSync(path.join(__dirname,'partials','header.html'),'utf8');
const FOOTER=fs.readFileSync(path.join(__dirname,'partials','footer.html'),'utf8');
const out=`<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${TITLE}</title>
<link rel="stylesheet" href="/fiber-tokens.css">
<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}</script>
<script src="/reveal.js" defer></script>
</head>
<body>
${HEADER}
${body}
${FOOTER}
</body>
</html>`;
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,out);
console.log('WROTE',OUT,(out.length/1024|0)+'KB');
