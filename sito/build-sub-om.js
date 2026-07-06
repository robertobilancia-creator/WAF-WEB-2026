// Genera le sottopagine Outbound Marketing sul template pilota Ticket Management.
// Layout: hero (immagine + 2 stat-card) -> il servizio -> benefici ->
// come funziona -> case study -> settori (8) -> Try & Buy.
// Header/footer condivisi iniettati dai partials => identici su tutte le pagine.
// Uso: node build-sub-om.js
const fs = require('fs'), path = require('path');

const HEADER = fs.readFileSync(path.join(__dirname, 'partials', 'header.html'), 'utf8');
const FOOTER = fs.readFileSync(path.join(__dirname, 'partials', 'footer.html'), 'utf8');

const AREA = { eyebrow: 'Outbound Marketing', parentName: 'Outbound Marketing', parentHref: '/servizi/outbound-marketing/', outDir: 'outbound-marketing' };

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
  bot: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="m6 10 3-3 2 2 4-4"></path>',
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
// DATI SOTTOPAGINE OUTBOUND MARKETING
// ============================================================
const SUBS = [
  {
    slug: 'survey-customer-satisfaction', name: 'Survey Customer Satisfaction', breadcrumb: 'Survey Customer Satisfaction',
    title: 'Survey Customer Satisfaction in Outsourcing — We Are Fiber',
    meta: 'Survey di customer satisfaction in outsourcing: rilevazione multicanale e multilingua di CSAT e NPS, con report e raccomandazioni su cui agire.',
    image: 'imagery-people-team.png',
    subtitle: 'Misura la soddisfazione dei tuoi clienti e trasforma il **feedback in azioni**.',
    tags: ['CSAT', 'NPS', 'Multicanale', 'Multilingua'],
    stats: [{ icon: 'star', value: 'CSAT', label: 'e NPS misurati' }, { icon: 'globe', value: 'Multilingua', label: 'su più canali' }],
    servizioH2: 'Ascolta i clienti, **prima che parlino gli altri**',
    servizioText: "Le survey di customer satisfaction raccolgono in modo strutturato la voce dei tuoi clienti — dopo un acquisto, un'assistenza o un'interazione. Un team dedicato e multilingua gestisce la rilevazione su più canali (telefono, email, chat), restituendoti dati chiari su cui agire.",
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Decisioni basate sui dati', desc: 'Capisci con precisione cosa funziona e cosa no.', icon: 'trendingup' },
      { title: 'Clienti più fedeli', desc: 'Chi si sente ascoltato tende a restare.', icon: 'heart' },
      { title: 'Segnali di allerta precoci', desc: "Intercetti l'insoddisfazione prima che diventi abbandono.", icon: 'eye' },
    ],
    comeFunziona: { h2: "Dalla rilevazione **all'insight**", text: 'Progettiamo il questionario, gestiamo la rilevazione multicanale e multilingua, analizziamo i risultati (CSAT, NPS, CES) e ti restituiamo report e raccomandazioni operative.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato alle survey di customer satisfaction. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
  },
  {
    slug: 'indagini-di-mercato', name: 'Indagini di Mercato', breadcrumb: 'Indagini di Mercato',
    title: 'Indagini di Mercato in Outsourcing — We Are Fiber',
    meta: 'Indagini di mercato in outsourcing: interviste e sondaggi multilingua su clienti, prospect e concorrenza, per decisioni informate e nuove opportunità.',
    image: 'duotone-a.png',
    subtitle: 'Raccogli insight su mercato e target per **decidere meglio**.',
    tags: ['Ricerca', 'Sondaggi', 'Target', 'Multilingua'],
    stats: [{ icon: 'search', value: 'Ricerca', label: 'interviste e sondaggi' }, { icon: 'target', value: 'Target', label: 'più mercati e lingue' }],
    servizioH2: 'Conosci il mercato **prima di muoverti**',
    servizioText: 'Le indagini di mercato raccolgono informazioni su clienti, prospect e concorrenza per orientare le tue decisioni. Un team dedicato gestisce interviste e sondaggi su più mercati e in più lingue, trasformando le risposte in insight utilizzabili.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Decisioni informate', desc: 'Riduci il rischio di ogni iniziativa.', icon: 'checkcircle' },
      { title: 'Nuove opportunità', desc: 'Individui bisogni del mercato non ancora coperti.', icon: 'target' },
      { title: 'Posizionamento più chiaro', desc: 'Capisci come ti vede davvero il mercato.', icon: 'eye' },
    ],
    comeFunziona: { h2: 'Dal disegno della ricerca **ai risultati**', text: 'Definiamo obiettivi e campione, gestiamo la raccolta dati multicanale e multilingua e ti consegniamo analisi e report azionabili.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato alle indagini di mercato. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
  },
  {
    slug: 'campagne-loyalty', name: 'Campagne Loyalty', breadcrumb: 'Campagne Loyalty',
    title: 'Campagne Loyalty in Outsourcing — We Are Fiber',
    meta: 'Campagne loyalty in outsourcing: programmi fedeltà, retention e contatti proattivi sui clienti a rischio, per aumentare il customer lifetime value.',
    image: 'full-portrait-1.png',
    subtitle: 'Coltiva la relazione e trasforma i clienti in **clienti fedeli**.',
    tags: ['Fidelizzazione', 'Retention', 'Loyalty program', 'Multilingua'],
    stats: [{ icon: 'heart', value: 'Retention', label: 'clienti fedeli nel tempo' }, { icon: 'trendingup', value: '+', label: 'customer lifetime value' }],
    servizioH2: 'Trattenere vale più che **acquisire**',
    servizioText: 'Le campagne loyalty rafforzano la relazione con i clienti esistenti: programmi fedeltà, iniziative di retention e contatti proattivi verso i clienti a rischio di abbandono. Un team dedicato e multilingua gestisce le campagne end-to-end, orientandole al risultato.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Più retention', desc: 'Trattieni i clienti di valore nel tempo.', icon: 'heart' },
      { title: 'Customer lifetime value più alto', desc: 'Relazioni che durano generano più valore.', icon: 'trendingup' },
      { title: 'Contatti proattivi', desc: 'Recuperi i clienti a rischio prima che se ne vadano.', icon: 'users' },
    ],
    comeFunziona: { h2: 'Dai dati **alla relazione**', text: 'Partiamo dai tuoi dati — spesso in sinergia con il <a class="waf-link" href="/servizi/back-office/data-enrichment/" style="color:var(--fbr-teal); font-weight:700; text-decoration:none;">Data Enrichment</a> — per identificare i segmenti giusti, disegnare la campagna, gestirla su più canali e misurarne i risultati.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato alle campagne loyalty. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
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
console.log('Done:', SUBS.length, 'sottopagine Outbound Marketing.');
