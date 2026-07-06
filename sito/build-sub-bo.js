// Genera le sottopagine Back Office sul template pilota Ticket Management.
// Layout: hero (immagine + 2 stat-card) -> il servizio -> benefici ->
// come funziona -> case study -> settori (8) -> Try & Buy.
// Header/footer condivisi iniettati dai partials => identici su tutte le pagine.
// Uso: node build-sub-bo.js
const fs = require('fs'), path = require('path');

const HEADER = fs.readFileSync(path.join(__dirname, 'partials', 'header.html'), 'utf8');
const FOOTER = fs.readFileSync(path.join(__dirname, 'partials', 'footer.html'), 'utf8');

const AREA = { eyebrow: 'Back Office', parentName: 'Back Office', parentHref: '/servizi/back-office/', outDir: 'back-office' };

const span = (t, color) => t.replace(/\*\*(.+?)\*\*/g, `<span style="color:var(--fbr-${color});">$1</span>`);
const strong = (t) => t.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--fbr-navy); font-weight:700;">$1</strong>');

const I = {
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
  clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  trendingup: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
  percent: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
  checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
  target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path>',
  filetext: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
  truck: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
  package: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>',
  search: '<circle cx="11" cy="11" r="8"></circle><path d="m21 21-4.3-4.3"></path>',
  shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>',
};

const SETTORI = [
  ['Healthcare', '/settori/healthcare/'],
  ['E-commerce', '/settori/ecommerce/'],
  ['Food Delivery', '/settori/food-delivery/'],
  ['Retail', '/settori/retail/'],
  ['Finance &amp; Insurance', '/settori/finance-insurance/'],
  ['Mobility', '/settori/mobility/'],
  ['Travel', '/settori/travel/'],
  ['B2B Services', '/settori/b2b-services/'],
];

const eyebrow = (label) =>
  `<div style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--fbr-teal); margin-bottom:18px;"><span style="width:7px; height:7px; border-radius:50%; background:var(--fbr-pink);"></span>${label}</div>`;

const statCard = (s, pos) => `<div style="position:absolute; ${pos} display:flex; align-items:center; gap:14px; background:#fff; border:1px solid var(--fbr-line); border-radius:16px; padding:15px 20px; box-shadow:0 16px 38px rgba(0,46,93,0.14);">
            <div style="width:42px; height:42px; border-radius:11px; background:var(--fbr-teal-15); display:flex; align-items:center; justify-content:center; color:var(--fbr-navy); flex:none;"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[s.icon]}</svg></div>
            <div><div style="font-family:var(--font-title); font-weight:300; font-size:26px; line-height:1; color:var(--fbr-navy);">${s.value}${s.suffix ? `<span style="color:var(--fbr-teal); font-size:18px;">${s.suffix}</span>` : ''}</div><div style="font-family:var(--font-text); font-size:12.5px; color:var(--text-muted); margin-top:3px;">${s.label}</div></div>
          </div>`;

const renderTags = (tags) => tags.map(t => `<div style="background:#fff; border:1px solid var(--fbr-line); border-radius:16px; padding:18px 22px; display:flex; align-items:center; gap:16px;"><div style="width:10px; height:10px; border-radius:50%; background:var(--fbr-teal); flex:none;"></div><span style="font-family:var(--font-text); font-weight:500; font-size:16px; color:var(--fbr-navy);">${t}</span></div>`).join('\n        ');

const renderBenefici = (items) => items.map(b =>
  `<div style="background:#fff; border:1px solid var(--fbr-line); border-radius:18px; padding:34px;">
          <div style="width:44px; height:44px; border-radius:13px; background:var(--fbr-teal-15); display:flex; align-items:center; justify-content:center; color:var(--fbr-navy); margin-bottom:20px;"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[b.icon]}</svg></div>
          <h3 style="font-family:var(--font-title); font-weight:700; font-size:19px; color:var(--fbr-navy); margin:0 0 12px;">${b.title}</h3>
          <p style="font-family:var(--font-text); font-size:15px; line-height:1.65; color:var(--text-body); margin:0;">${b.desc}</p>
        </div>`
).join('\n        ');

const renderSettori = () => SETTORI.map(([name, href]) =>
  `<a class="waf-card" href="${href}" style="padding:22px 24px; display:flex; align-items:center; justify-content:space-between; gap:12px;"><span style="font-family:var(--font-text); font-weight:600; font-size:16px; color:var(--fbr-navy);">${name}</span><span style="color:var(--fbr-teal); font-size:18px;">→</span></a>`
).join('\n        ');

function renderComeFunziona(cf) {
  if (cf.steps) {
    const cards = cf.steps.map((st, i) => `<div style="background:#fff; border:1px solid var(--fbr-line); border-radius:18px; padding:30px; position:relative; overflow:hidden;">
          <div style="position:absolute; left:0; top:0; bottom:0; width:4px; background:var(--fbr-${i === 0 ? 'teal' : 'pink'}); border-radius:4px 0 0 4px;"></div>
          <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--fbr-${i === 0 ? 'teal' : 'pink'}); margin-bottom:12px;">${st.label}</div>
          <p style="font-family:var(--font-text); font-size:15px; line-height:1.6; color:var(--text-body); margin:0;">${st.text}</p>
        </div>`).join('\n        ');
    return `<section style="background:var(--fbr-paper); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:start;">
      <div>
        ${eyebrow('Come funziona')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 22px;">${span(cf.h2, 'teal')}</h2>
        ${cf.text ? `<p style="font-family:var(--font-text); font-size:17px; line-height:1.7; color:var(--text-body); margin:0;">${cf.text}</p>` : ''}
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${cards}
      </div>
    </div>
  </section>`;
  }
  return `<section style="background:var(--fbr-paper); padding:116px 24px;">
    <div style="max-width:760px; margin:0 auto; text-align:center;">
      ${eyebrow('Come funziona')}
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 22px;">${span(cf.h2, 'teal')}</h2>
      <p style="font-family:var(--font-text); font-size:17px; line-height:1.75; color:var(--text-body); margin:0;">${cf.text}</p>
    </div>
  </section>`;
}

const caseHead = () => `<div style="display:inline-flex; align-items:center; gap:8px; background:var(--fbr-pink); color:#fff; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; border-radius:30px; margin-bottom:28px; box-shadow:0 8px 20px rgba(229,67,96,0.28);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>`;

function caseLeft(cs) {
  const block = (label, text, teal) => `<div style="border-left:3px solid var(--fbr-${teal ? 'teal' : 'line'}); padding-left:20px;">
            <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--fbr-${teal ? 'teal' : 'navy-50'}); margin-bottom:6px;">${label}</div>
            <p style="font-family:var(--font-text); font-size:15px; line-height:1.6; color:var(--text-body); margin:0;">${text}</p>
          </div>`;
  const blocks = [];
  if (cs.azienda) blocks.push(block('Azienda', cs.azienda, false));
  if (cs.sfida) blocks.push(block('Sfida', cs.sfida, false));
  if (cs.soluzione) blocks.push(block('Soluzione', cs.soluzione, true));
  return `<div style="display:flex; flex-direction:column; gap:20px;">
          ${blocks.join('\n          ')}
        </div>`;
}

function renderCaseStudy(cs) {
  if (cs.type === 'placeholder') {
    return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:860px; margin:0 auto; text-align:center;">
      ${caseHead()}
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:38px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 18px;">${span(cs.h2, 'pink')}</h2>
      <p style="font-family:var(--font-text); font-size:17px; line-height:1.7; color:var(--text-body); margin:0 auto 32px; max-width:600px;">${cs.text}</p>
      <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
    </div>
  </section>`;
  }
  let resultsInner;
  if (cs.table) {
    const th = cs.table.headers.map((h, i) => `<th style="text-align:${i === 0 ? 'left' : 'right'}; font-family:var(--font-title); font-weight:700; font-size:10.5px; letter-spacing:0.08em; text-transform:uppercase; color:var(--fbr-navy-50); padding:0 0 12px; border-bottom:1px solid var(--fbr-line);">${h}</th>`).join('');
    const tr = cs.table.rows.map(r => `<tr>${r.map((c, i) => `<td style="text-align:${i === 0 ? 'left' : 'right'}; padding:14px 0; border-bottom:1px solid var(--fbr-line); font-family:${i === 0 ? 'var(--font-text)' : 'var(--font-title)'}; font-weight:${i === 0 ? '600' : '300'}; font-size:${i === 0 ? '14px' : '20px'}; color:var(--fbr-navy); white-space:nowrap;">${c}</td>`).join('')}</tr>`).join('');
    resultsInner = `<div style="overflow-x:auto;"><table style="width:100%; border-collapse:collapse;"><thead><tr>${th}</tr></thead><tbody>${tr}</tbody></table></div>`;
  } else {
    resultsInner = `<div style="display:flex; flex-direction:column; gap:0;">
            ${cs.kpis.map(k => `<div style="display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding:16px 0; border-bottom:1px solid var(--fbr-line);">
                <span style="font-family:var(--font-text); font-size:15px; color:var(--text-body);">${k.label}</span>
                <span style="font-family:var(--font-title); font-weight:300; font-size:28px; line-height:1; color:var(--fbr-${k.accent ? 'pink' : 'navy'}); white-space:nowrap;">${k.value}</span>
              </div>`).join('\n            ')}
          </div>`;
  }
  return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      ${caseHead()}
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 48px; max-width:820px;">${span(cs.h2, 'pink')}</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start;">
        ${caseLeft(cs)}
        <div style="background:#fff; border:1px solid var(--fbr-line); border-radius:22px; padding:32px; box-shadow:0 4px 20px rgba(0,46,93,0.06);">
          <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:20px;">${cs.resultsTitle || 'Risultati'}</div>
          ${resultsInner}
        </div>
      </div>
    </div>
  </section>`;
}

function buildBody(s) {
  const bcols = s.benefici.length === 4 ? 4 : 3;
  return `<div style="background:#fff; font-family:var(--font-text); color:var(--fbr-navy);">

  <!-- ===================== HERO ===================== -->
  <section style="padding:72px 24px 96px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="display:flex; align-items:center; gap:8px; font-family:var(--font-title); font-size:12px; letter-spacing:0.06em; color:var(--fbr-navy-50); margin-bottom:36px;">
        <a class="waf-link" href="/" style="text-decoration:none; color:var(--fbr-navy-50);">Home</a>
        <span>›</span><a class="waf-link" href="/servizi/" style="text-decoration:none; color:var(--fbr-navy-50);">Servizi</a>
        <span>›</span><a class="waf-link" href="${AREA.parentHref}" style="text-decoration:none; color:var(--fbr-navy-50);">${AREA.parentName}</a>
        <span>›</span><span style="color:var(--fbr-navy);">${s.breadcrumb}</span>
      </div>
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:64px; align-items:center;">
        <div>
          <div style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--fbr-teal); margin-bottom:22px;"><span style="width:7px; height:7px; border-radius:50%; background:var(--fbr-pink);"></span>${AREA.eyebrow}</div>
          <h1 style="font-family:var(--font-display); font-weight:700; font-size:52px; line-height:1.04; letter-spacing:-0.025em; color:var(--fbr-navy); margin:0 0 22px;">${s.name}<br>in <span style="color:var(--fbr-teal);">Outsourcing</span></h1>
          <p style="font-family:var(--font-text); font-weight:400; font-size:19px; line-height:1.65; color:var(--text-body); margin:0 0 28px; max-width:520px;">${strong(s.subtitle)}</p>
          <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:34px;">
            ${s.tags.map(t => `<span style="font-family:var(--font-text); font-weight:500; font-size:13px; color:var(--fbr-navy); background:var(--fbr-paper); border:1px solid var(--fbr-line); border-radius:40px; padding:7px 15px;">${t}</span>`).join('\n            ')}
          </div>
          <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
            <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
            <a class="waf-btn waf-btn--ghost" href="/contatti/">Prenota una call</a>
          </div>
        </div>
        <div style="position:relative;">
          <div style="position:relative; border-radius:24px; overflow:hidden; box-shadow:0 22px 60px rgba(0,46,93,0.18);">
            <img src="/assets/imagery/${s.image}" alt="${s.breadcrumb} We Are Fiber" style="width:100%; height:470px; object-fit:cover; display:block;">
            <div style="position:absolute; inset:0; background:linear-gradient(150deg, rgba(30,206,202,0.05), rgba(0,46,93,0.14));"></div>
          </div>
          ${statCard(s.stats[0], 'top:28px; right:-22px;')}
          ${statCard(s.stats[1], 'bottom:28px; left:-24px;')}
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== IL SERVIZIO ===================== -->
  <section style="background:var(--fbr-paper); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;">
      <div>
        ${eyebrow('Il servizio')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 24px;">${span(s.servizioH2, 'teal')}</h2>
        <p style="font-family:var(--font-text); font-size:17px; line-height:1.7; color:var(--text-body); margin:0;">${s.servizioText}</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${renderTags(s.tags)}
      </div>
    </div>
  </section>

  <!-- ===================== BENEFICI ===================== -->
  <section style="padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="max-width:640px; margin-bottom:52px;">
        ${eyebrow('Benefici')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0;">${span(s.beneficiH2, 'teal')}</h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(${bcols},1fr); gap:18px;">
        ${renderBenefici(s.benefici)}
      </div>
    </div>
  </section>

  ${renderComeFunziona(s.comeFunziona)}

  ${renderCaseStudy(s.caseStudy)}

  <!-- ===================== SETTORI ===================== -->
  <section style="padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="max-width:680px; margin-bottom:40px;">
        ${eyebrow('Settori')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0;">Lo applichiamo nel <span style="color:var(--fbr-teal);">tuo settore</span></h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:14px;">
        ${renderSettori()}
      </div>
    </div>
  </section>

  <!-- ===================== TRY & BUY ===================== -->
  <section style="padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto; background:linear-gradient(135deg, var(--fbr-teal-15) 0%, #ffffff 46%, var(--fbr-pink-15) 100%); border:1px solid var(--fbr-line); border-radius:28px; padding:76px 56px; text-align:center;">
      <div style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--fbr-pink); margin-bottom:18px;"><span style="width:7px; height:7px; border-radius:50%; background:var(--fbr-teal);"></span>Try &amp; Buy</div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:42px; line-height:1.08; letter-spacing:-0.025em; color:var(--fbr-navy); margin:0 0 16px;">Inizia con un progetto pilota.<br>Scala con <span style="color:var(--fbr-teal);">fiducia</span>.</h2>
      <p style="font-family:var(--font-text); font-size:17px; line-height:1.6; color:var(--text-body); margin:0 auto 32px; max-width:580px;">Con la formula Try &amp; Buy testi il servizio fino a 3 mesi prima di sceglierci come partner. Analizziamo i tuoi flussi, definiamo insieme il perimetro e attiviamo un team dedicato a rischio contenuto.</p>
      <div style="display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap;">
        <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
        <a class="waf-btn waf-btn--ghost" href="/contatti/">Scarica la company profile</a>
      </div>
    </div>
  </section>

</div>`;
}

function buildPage(s) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${s.title}</title>
<meta name="description" content="${s.meta}">
<link rel="stylesheet" href="/fiber-tokens.css">
<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}</script>
<script src="/reveal.js" defer></script>
</head>
<body>
${HEADER}
${buildBody(s)}
${FOOTER}
</body>
</html>`;
}

// ============================================================
// DATI SOTTOPAGINE BACK OFFICE
// ============================================================
const SUBS = [
  {
    slug: 'data-entry', name: 'Data Entry', breadcrumb: 'Data Entry',
    title: 'Data Entry in Outsourcing — We Are Fiber',
    meta: 'Data entry in outsourcing online e offline: grandi volumi di dati gestiti con precisione oltre il 99%, data cleaning e inserimento prodotti e-commerce.',
    image: 'sector-screens.jpg',
    subtitle: 'Grandi volumi di dati inseriti e gestiti con **precisione oltre il 99%**, online e offline.',
    tags: ['Grandi volumi', 'Data cleaning', 'E-commerce', 'Precisione 99%+'],
    stats: [{ icon: 'database', value: '650', label: 'ristoranti / mese' }, { icon: 'checkcircle', value: '99', suffix: '%+', label: 'precisione dati' }],
    servizioH2: 'I tuoi dati, **al posto giusto**',
    servizioText: 'Il data entry inserisce i dati nei campi corretti di un database. Su volumi importanti, farlo manualmente sottrae tempo e risorse alle attività decisive: esternalizzarlo ti permette di gestire al meglio il flusso quotidiano di informazioni, online e offline.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Proof of value', desc: 'Prototipazione rapida per dimostrare efficacia e fattibilità della tecnologia e delle risorse.', icon: 'trendingup' },
      { title: 'Soluzioni quick-win', desc: "Approccio rapido per portare in esercizio l'ottimizzazione dei processi.", icon: 'zap' },
      { title: 'Zero errori', desc: 'ROI veloce ed eliminazione quasi totale di errori e record aggiornati male.', icon: 'checkcircle' },
    ],
    comeFunziona: { h2: 'Online e offline, con **servizi dedicati**', text: 'Offline con precisione e padronanza di Word/Excel; online con compilazione moduli, elaborazione immagini, indicizzazione, estrazione e pulizia, inserimento prodotti e-commerce. Data Cleaning, Data Processing, Data Classification, Data Conversion — con precisione garantita oltre il 99%.' },
    caseStudy: {
      type: 'real',
      h2: 'Just Eat: onboarding ristoranti **a errore zero**',
      azienda: 'Piattaforma di food delivery con oltre 66.000 ristoranti in 13 mercati mondiali.',
      sfida: "Velocizzare l'aggiornamento dei ristoranti nel database ed eliminare gli errori.",
      soluzione: "Gestione dell'intero processo di Data Entry, digitalizzazione, pulizia database e analisi big data.",
      resultsTitle: 'Risultati',
      kpis: [
        { label: 'Risorse full time', value: '19' },
        { label: 'Ristoranti inseriti / mese', value: '650' },
        { label: 'Menu inseriti / mese', value: '2.000' },
        { label: 'Menu aggiornati / mese', value: '1.100', accent: true },
      ],
    },
  },
  {
    slug: 'data-enrichment', name: 'Data Enrichment', breadcrumb: 'Data Enrichment',
    title: 'Data Enrichment in Outsourcing — We Are Fiber',
    meta: 'Data enrichment in outsourcing: dati validati, integrati e puliti per una visione unica del cliente e un database accurato e completo.',
    image: 'duotone-a.png',
    subtitle: 'Dati validati, integrati e puliti per una **visione unica** del cliente.',
    tags: ['Validazione', 'Deduplica', 'Contact list', 'Customer insight'],
    stats: [{ icon: 'eye', value: '360°', label: 'vista cliente' }, { icon: 'trendingup', value: '+', label: 'conversioni e ROI' }],
    servizioH2: 'Da dati grezzi a **decisioni migliori**',
    servizioText: "Il data enrichment valida, integra e migliora i dati grezzi: corregge gli errori, elimina i duplicati e integra le informazioni mancanti nelle contact list, per una visione unica dell'utente e un database accurato e completo.",
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Meno costi di gestione', desc: 'Un database accurato consente monitoraggio e gestione snelli ed efficienti.', icon: 'percent' },
      { title: 'Campagne più efficaci', desc: 'Anticipa bisogni e desideri, decidi con il minimo margine di errore.', icon: 'target' },
      { title: 'Più profitti', desc: 'Prevedi con precisione il ROI di ogni iniziativa, aumenta vendite e conversioni.', icon: 'trendingup' },
    ],
    comeFunziona: { h2: "Conosci ogni cliente, **fino all'ultimo**", text: 'Con una visione completa e aggiornata dei dati — anagrafiche e attributi di qualità — prevedi i top-customer e i clienti a rischio abbandono: premi e fidelizzi i primi, trattieni i secondi con offerte dedicate.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato al Data Enrichment. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
  },
  {
    slug: 'gestione-documentale', name: 'Gestione Documentale', breadcrumb: 'Gestione Documentale',
    title: 'Gestione Documentale in Outsourcing — We Are Fiber',
    meta: 'Gestione documentale in outsourcing: acquisizione, digitalizzazione e archiviazione dei documenti, tracciati per l\'intero ciclo di vita.',
    image: 'duotone-b.png',
    subtitle: 'Documenti acquisiti, archiviati e ritrovati in un attimo, **tracciati per tutto il ciclo di vita**.',
    tags: ['Digitalizzazione', 'Archiviazione', 'Tracciabilità', 'Compliance'],
    stats: [{ icon: 'search', value: 'Ricerca', label: 'istantanea' }, { icon: 'shield', value: 'Compliance', label: 'e sicurezza' }],
    servizioH2: 'Ogni documento, **tracciabile e a portata**',
    servizioText: 'La gestione documentale acquisisce, modifica, archivia e rende ricercabile ogni documento, tracciandolo lungo tutto il ciclo di vita. Digitalizziamo i documenti in outsourcing, liberando le tue risorse dalle attività ripetitive per dedicarle alle attività fondamentali del business.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Taglio dei costi', desc: 'Lavoro svolto riducendo i costi e massimizzando i risultati.', icon: 'percent' },
      { title: 'Semplificazione dei processi', desc: 'Recuperi tempo e risorse da dedicare ad altro.', icon: 'zap' },
      { title: 'Archiviazione intelligente', desc: 'Ogni passaggio reso fluido dalla tecnologia.', icon: 'search' },
      { title: 'Cliente al centro', desc: 'Tutte le informazioni utili, senza dispersione dei dati.', icon: 'users' },
    ],
    comeFunziona: { h2: "Dall'acquisizione **all'archivio**", text: 'L\'archiviazione permette di tracciare un documento lungo tutto il suo ciclo di vita: risparmi tempo e aumenti le informazioni disponibili, in modo ordinato e sicuro.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato alla Gestione Documentale. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
  },
  {
    slug: 'gestione-logistica', name: 'Gestione Logistica', breadcrumb: 'Gestione Logistica',
    title: 'Gestione Logistica in Outsourcing — We Are Fiber',
    meta: 'Gestione logistica in outsourcing: tracking spedizioni, inventario e ordini con processi automatizzati, in tempo reale e senza errori.',
    image: 'sector-delivery.jpg',
    subtitle: 'Spedizioni, inventario e ordini gestiti con **processi automatizzati** e zero errori.',
    tags: ['Tracking spedizioni', 'Inventario', 'RPA', 'Real-time'],
    stats: [{ icon: 'truck', value: 'Real-time', label: 'tracking spedizioni' }, { icon: 'checkcircle', value: '0', label: 'errori di processo' }],
    servizioH2: 'La supply chain, **più rapida e senza errori**',
    servizioText: 'Le attività di supply chain producono un volume elevato di dati su consegne, stoccaggio e ordini. Con processi automatizzati acceleriamo le operazioni, miglioriamo le performance, riduciamo i costi e liberiamo risorse per le attività core — con controllo e tracciamento delle spedizioni, monitoraggio dell\'inventario, ordini di acquisto, fatturazione e scambio di documenti.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Zero errori', desc: "L'automazione intelligente elimina i processi manuali imprecisi.", icon: 'checkcircle' },
      { title: 'Controllo in tempo reale', desc: 'Visibilità sempre aggiornata di ordini e disponibilità su tutti i canali.', icon: 'eye' },
      { title: 'Velocità ed efficienza', desc: "Con l'RPA semplifichi e velocizzi la gestione di magazzino e inventario.", icon: 'zap' },
    ],
    comeFunziona: { h2: 'Know-how più **intelligenza artificiale**', text: 'Al know-how si aggiungono le potenzialità dell\'Intelligenza Artificiale per gestire in modo automatizzato le comunicazioni con i clienti, tramite chatbot e assistenti virtuali.' },
    caseStudy: {
      type: 'real',
      h2: 'Bloom & Wild: customer care che regge i **picchi stagionali**',
      azienda: 'Il più grande e-commerce di fiori del Regno Unito.',
      soluzione: 'Gestione delle telefonate inbound e presidio costante di email e live chat, con riorganizzazione rapida e flessibile dei servizi di customer care.',
      resultsTitle: 'Volumi gestiti',
      table: {
        headers: ['Periodo', 'Telefonate', 'Ticket', 'E-commerce', 'Store'],
        rows: [
          ['Dicembre', '1.078', '1.141', '987', '91'],
          ['Giugno', '6.228', '7.175', '4.626', '1.602'],
        ],
      },
    },
  },
  {
    slug: 'gestione-ordini', name: 'Gestione Ordini', breadcrumb: 'Gestione Ordini',
    title: 'Gestione Ordini in Outsourcing — We Are Fiber',
    meta: "Gestione ordini in outsourcing per l'e-commerce: order management omnicanale, tracciamento in tempo reale e automazione con RPA.",
    image: 'sector-ecommerce.jpg',
    subtitle: 'Il cliente al centro: ordini tracciati in ogni momento, con supporto **omnicanale**.',
    tags: ['Order management', 'Tracking', 'Omnicanale', 'RPA'],
    stats: [{ icon: 'package', value: 'Omnicanale', label: 'ordini tracciati' }, { icon: 'checkcircle', value: '0', label: 'errori di processo' }],
    servizioH2: "Il cliente al **centro dell'ordine**",
    servizioText: 'La logistica parte da un presupposto: il cliente al centro. Un cliente insoddisfatto lascia feedback negativi che si diffondono e intaccano brand awareness e affidabilità. Diamo al cliente gli strumenti per tracciare il pacco in ogni momento, con supporto omnicanale, per gestire la logistica e-commerce in modo produttivo e oculato.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Zero errori', desc: "Con l'automazione intelligente il margine di errore è azzerato.", icon: 'checkcircle' },
      { title: 'Controllo in tempo reale', desc: 'Ordini sempre visibili su tutti i canali.', icon: 'eye' },
      { title: 'Velocità ed efficienza', desc: "Con l'RPA velocizzi la gestione di magazzino e inventario.", icon: 'zap' },
    ],
    comeFunziona: { h2: 'Una supply chain **agile e trasparente**', text: 'Le soluzioni di gestione ordini aumentano l\'efficienza dei processi e rendono la supply chain più agile, trasparente e reattiva — per i tuoi dipendenti e per i tuoi clienti.' },
    caseStudy: {
      type: 'real',
      h2: 'Bloom & Wild: continuità di servizio **anche nei picchi**',
      azienda: 'Il più grande e-commerce di fiori del Regno Unito.',
      sfida: 'Aumento delle richieste di assistenza durante il lockdown Covid-19.',
      soluzione: 'Business Continuity Plan per garantire la continuità del servizio senza interruzioni.',
      resultsTitle: 'Risultati · Feb–Mag 2020',
      kpis: [
        { label: 'Chiamate in entrata / mese', value: '8.539' },
        { label: 'Chiamate in uscita / mese', value: '1.023' },
        { label: 'Richieste gestite / mese', value: '41.933' },
        { label: 'Customer Satisfaction', value: '98%', accent: true },
      ],
    },
  },
];

const OUT_DIR = path.join(__dirname, 'export', 'servizi', AREA.outDir);
SUBS.forEach(s => {
  const out = path.join(OUT_DIR, s.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = buildPage(s);
  fs.writeFileSync(out, html);
  console.log('WROTE', path.relative(__dirname, out), (html.length / 1024 | 0) + 'KB');
});
console.log('Done:', SUBS.length, 'sottopagine Back Office.');
