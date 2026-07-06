// Genera le sottopagine Customer Service sul template pilota Ticket Management.
// Layout: hero (immagine + 2 stat-card) -> il servizio -> benefici (3) ->
// come funziona -> case study -> settori (8) -> Try & Buy.
// Header/footer condivisi iniettati dai partials => identici su tutte le pagine.
// Uso: node build-sub.js
const fs = require('fs'), path = require('path');

const HEADER = fs.readFileSync(path.join(__dirname, 'partials', 'header.html'), 'utf8');
const FOOTER = fs.readFileSync(path.join(__dirname, 'partials', 'footer.html'), 'utf8');

const span = (t, color) => t.replace(/\*\*(.+?)\*\*/g, `<span style="color:var(--fbr-${color});">$1</span>`);
const strong = (t) => t.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--fbr-navy); font-weight:700;">$1</strong>');

const I = {
  star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>',
  clock: '<circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline>',
  calendar: '<rect x="3" y="4" width="18" height="18" rx="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line>',
  globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  trendingup: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
  percent: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
  checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
  bot: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path>',
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

function renderCaseStudy(cs) {
  if (cs.type === 'placeholder') {
    return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:860px; margin:0 auto; text-align:center;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:var(--fbr-pink); color:#fff; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; border-radius:30px; margin-bottom:28px; box-shadow:0 8px 20px rgba(229,67,96,0.28);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:38px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 18px;">${span(cs.h2, 'pink')}</h2>
      <p style="font-family:var(--font-text); font-size:17px; line-height:1.7; color:var(--text-body); margin:0 auto 32px; max-width:600px;">${cs.text}</p>
      <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
    </div>
  </section>`;
  }
  const kpis = cs.kpis.map(k => `<div style="display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding:16px 0; border-bottom:1px solid var(--fbr-line);">
                <span style="font-family:var(--font-text); font-size:15px; color:var(--text-body);">${k.label}</span>
                <span style="font-family:var(--font-title); font-weight:300; font-size:28px; line-height:1; color:var(--fbr-${k.accent ? 'pink' : 'navy'}); white-space:nowrap;">${k.value}</span>
              </div>`).join('\n            ');
  return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:var(--fbr-pink); color:#fff; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; border-radius:30px; margin-bottom:28px; box-shadow:0 8px 20px rgba(229,67,96,0.28);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 48px; max-width:820px;">${span(cs.h2, 'pink')}</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start;">
        <div style="display:flex; flex-direction:column; gap:20px;">
          <div style="border-left:3px solid var(--fbr-line); padding-left:20px;">
            <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:6px;">Azienda</div>
            <p style="font-family:var(--font-text); font-size:15px; line-height:1.6; color:var(--text-body); margin:0;">${cs.azienda}</p>
          </div>
          <div style="border-left:3px solid var(--fbr-line); padding-left:20px;">
            <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:6px;">Sfida</div>
            <p style="font-family:var(--font-text); font-size:15px; line-height:1.6; color:var(--text-body); margin:0;">${cs.sfida}</p>
          </div>
          <div style="border-left:3px solid var(--fbr-teal); padding-left:20px;">
            <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.1em; text-transform:uppercase; color:var(--fbr-teal); margin-bottom:6px;">Soluzione</div>
            <p style="font-family:var(--font-text); font-size:15px; line-height:1.6; color:var(--text-body); margin:0;">${cs.soluzione}</p>
          </div>
        </div>
        <div style="background:#fff; border:1px solid var(--fbr-line); border-radius:22px; padding:32px; box-shadow:0 4px 20px rgba(0,46,93,0.06);">
          <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:20px;">${cs.resultsTitle || 'Risultati'}</div>
          <div style="display:flex; flex-direction:column; gap:0;">
            ${kpis}
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function buildBody(s) {
  return `<div style="background:#fff; font-family:var(--font-text); color:var(--fbr-navy);">

  <!-- ===================== HERO ===================== -->
  <section style="padding:72px 24px 96px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="display:flex; align-items:center; gap:8px; font-family:var(--font-title); font-size:12px; letter-spacing:0.06em; color:var(--fbr-navy-50); margin-bottom:36px;">
        <a class="waf-link" href="/" style="text-decoration:none; color:var(--fbr-navy-50);">Home</a>
        <span>›</span><a class="waf-link" href="/servizi/" style="text-decoration:none; color:var(--fbr-navy-50);">Servizi</a>
        <span>›</span><a class="waf-link" href="/servizi/customer-service/" style="text-decoration:none; color:var(--fbr-navy-50);">Customer Service</a>
        <span>›</span><span style="color:var(--fbr-navy);">${s.breadcrumb}</span>
      </div>
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:64px; align-items:center;">
        <div>
          <div style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--fbr-teal); margin-bottom:22px;"><span style="width:7px; height:7px; border-radius:50%; background:var(--fbr-pink);"></span>Customer Service</div>
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
      <div style="display:grid; grid-template-columns:repeat(3,1fr); gap:18px;">
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
// DATI SOTTOPAGINE CUSTOMER SERVICE
// ============================================================
const SUBS = [
  {
    slug: 'digital-customer-care', name: 'Digital Customer Care', breadcrumb: 'Digital Customer Care',
    title: 'Digital Customer Care in Outsourcing — We Are Fiber',
    meta: "Digital customer care in outsourcing su sito, email, chat e social: operatori multilingua attivi 24/7 per un'assistenza sempre presente.",
    image: 'sector-phone.jpg',
    subtitle: 'Assistenza su sito, email, chat e social — con operatori multilingua attivi **24/7**.',
    tags: ['Social', 'Chat', 'Email', 'Multilingua', '24/7'],
    stats: [{ icon: 'clock', value: '24/7', label: 'operatività' }, { icon: 'globe', value: 'Multicanale', label: 'sito, chat, email, social' }],
    servizioH2: "L'assistenza dove sono i tuoi **clienti**",
    servizioText: 'La maggior parte degli utenti si muove sui canali digitali — sito, email, chat online e social. La Digital Customer Care mette le nuove tecnologie al centro dell\'assistenza, con operatori multilingua e operatività 24/7, per informazioni chiare e puntuali ovunque ti cerchino.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Assistenza in tempo reale', desc: 'Meno attesa, risposte immediate.', icon: 'zap' },
      { title: 'Più Customer Satisfaction', desc: "Un'esperienza positiva fidelizza.", icon: 'heart' },
      { title: 'Clienti raggiunti ovunque', desc: 'Un team pronto su tutti i canali digitali.', icon: 'globe' },
    ],
    comeFunziona: { h2: 'Esperienze **personalizzate**, su ogni canale', text: 'Garantiamo esperienze uniche e personalizzate con operatori multilingua attivi 24/7, coerenti con il tono di voce del tuo brand.' },
    caseStudy: { type: 'placeholder', h2: 'Grand Vision', text: 'Il case study Grand Vision per la Digital Customer Care è in aggiornamento: stiamo inserendo i KPI reali di questo servizio.' },
  },
  {
    slug: 'help-desk', name: 'Help Desk', breadcrumb: 'Help Desk',
    title: 'Help Desk in Outsourcing — We Are Fiber',
    meta: 'Help desk in outsourcing di primo e secondo livello, multilingua: individua il problema e lo risolve, prima e dopo la vendita.',
    image: 'imagery-people-team.png',
    subtitle: 'Supporto di primo e secondo livello che individua il problema e lo **risolve** — prima e dopo la vendita.',
    tags: ['Primo & secondo livello', 'Ticket', 'Multilingua', 'Dashboard BI'],
    stats: [{ icon: 'star', value: '90', suffix: '%', label: 'Customer Satisfaction' }, { icon: 'checkcircle', value: '97', suffix: '%', label: 'Assorbimento' }],
    servizioH2: 'Un supporto che **avvicina** il brand ai clienti',
    servizioText: "Un help desk affidabile individua e risolve i problemi, garantendo supporto costante prima e dopo la vendita, con impatti positivi su produttività e costi. Assistenza tempestiva e precisa, dall'apertura del ticket fino alla soluzione.",
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Più efficienza', desc: 'Servizio flessibile e scalabile, che risponde in fretta alle evoluzioni del mercato.', icon: 'trendingup' },
      { title: 'Personale ottimizzato', desc: 'Le tue risorse restano sulle aree core.', icon: 'users' },
      { title: 'Prestazioni sotto controllo', desc: 'Dashboard di business intelligence su tutti i KPI.', icon: 'eye' },
    ],
    comeFunziona: {
      h2: 'Due livelli, **una soluzione**',
      text: 'Servizio multilingue, con risorse dotate di ottime doti di problem solving e proattività.',
      steps: [
        { label: 'Primo livello', text: "L'operatore risolve il problema o smista il task a un team di specialisti." },
        { label: 'Secondo livello', text: "Lo specialista risolve il problema o guida l'utente nella procedura." },
      ],
    },
    caseStudy: {
      type: 'real',
      h2: 'GrandVision: customer care omnicanale per il **retail ottico**',
      azienda: 'Rivenditore internazionale di ottica (Gruppo Luxottica), presente in 44 Paesi con oltre 7.000 negozi nel mondo.',
      sfida: 'Migliorare la qualità del customer care su più canali.',
      soluzione: 'Monitoraggio costante di live chat ed email per assistenza di primo e secondo livello: spedizioni, acquisti, pagamenti, promozioni, fatturazione, garanzia, gestione reclami e recensioni.',
      resultsTitle: 'Risultati',
      kpis: [
        { label: 'Chiamate gestite / mese', value: '2.740' },
        { label: 'Ticket gestiti / mese', value: '4.186' },
        { label: 'Chat e-commerce', value: '2.226' },
        { label: 'Customer Satisfaction', value: '90%', accent: true },
        { label: 'Assorbimento', value: '97%' },
        { label: 'Risorse', value: '4' },
      ],
    },
  },
  {
    slug: 'chatbot', name: 'Chatbot', breadcrumb: 'Chatbot',
    title: 'Chatbot in Outsourcing — We Are Fiber',
    meta: 'Chatbot in outsourcing con AI e supervisione umana: risposte immediate 24/7, multilingua, con escalation all\'operatore quando serve.',
    image: 'sector-screens.jpg',
    subtitle: "L'intelligenza artificiale unita al **cuore umano**: risposte immediate, 24/7, con escalation all'operatore.",
    tags: ['AI', '24/7', 'Multilingua', 'Escalation umana'],
    stats: [{ icon: 'clock', value: '24/7', label: 'sempre attivo' }, { icon: 'bot', value: 'AI', label: '+ escalation umana' }],
    servizioH2: 'Tecnologia e persone, **insieme**',
    servizioText: 'I chatbot con intelligenza artificiale danno risposte precise e immediate, 24 ore su 24. Uniamo il cuore umano alla tecnologia dell\'IA per un supporto a 360°, liberando i tuoi operatori dalle richieste ripetitive.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Disponibile 24/7', desc: 'I chatbot lavorano sempre, senza pause.', icon: 'clock' },
      { title: 'Meno costi', desc: 'Le risposte ripetitive vengono automatizzate.', icon: 'percent' },
      { title: 'Clienti soddisfatti', desc: 'Risposte immediate e sempre coerenti.', icon: 'heart' },
    ],
    comeFunziona: { h2: 'AI davanti, **operatori dietro**', text: 'Il chatbot gestisce il primo contatto e passa all\'operatore quando serve. Alle spalle, un team che parla fluentemente sei lingue, formato per fornire la massima assistenza e migliorare la customer experience.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato al chatbot. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
  },
  {
    slug: 'booking-office', name: 'Booking Office', breadcrumb: 'Booking Office',
    title: 'Booking Office in Outsourcing — We Are Fiber',
    meta: 'Booking office in outsourcing: preventivi e prenotazioni gestiti in modo rapido, preciso e multilingua, prima e dopo la prenotazione.',
    image: 'sector-airplane.jpg',
    subtitle: 'Preventivi e prenotazioni gestiti in modo rapido e preciso, in **più lingue**.',
    tags: ['Prenotazioni', 'Preventivi', 'Multilingua', 'Pre e post'],
    stats: [{ icon: 'clock', value: '24h', label: 'prenotazioni' }, { icon: 'globe', value: '6', label: 'lingue' }],
    servizioH2: 'Nessuna occasione di contatto **persa**',
    servizioText: 'Una struttura ricettiva di successo è sempre presente. Il Booking Office gestisce preventivi e prenotazioni in modo rapido, preciso e multilingua, con supporto prima, durante e dopo la prenotazione — per nuove proposte o per risolvere eventuali problematiche.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Servizio flessibile', desc: 'Attivabile in outsourcing solo nei periodi di alta stagione.', icon: 'calendar' },
      { title: 'Più produttività', desc: 'Tutte le richieste gestite in modo rapido e preciso.', icon: 'zap' },
      { title: 'Meno costi operativi', desc: 'Minori oneri di reclutamento e formazione.', icon: 'percent' },
    ],
    comeFunziona: { h2: 'Un team multilingua, **sempre pronto**', text: 'Un team di operatori che parlano fluentemente sei lingue, formati per fornire la massima assistenza a clienti finali, agenzie e intermediari.' },
    caseStudy: {
      type: 'real',
      h2: 'Trivago: supporto multilingua su **più mercati**',
      azienda: 'Il più grande motore di ricerca per la comparazione dei prezzi degli hotel (750.000+ strutture nel mondo, dal 2005).',
      sfida: 'Tempi di risposta elevati sulle richieste dai diversi canali.',
      soluzione: 'Supporto multilingua (italiano, albanese, greco, inglese, rumeno) per assistere gli utenti nella registrazione al portale.',
      resultsTitle: 'Volumi · chiamate/mese',
      kpis: [
        { label: 'Italiano', value: '4.000', accent: true },
        { label: 'Inglese', value: '2.500' },
        { label: 'Rumeno', value: '2.500' },
        { label: 'Greco', value: '2.000' },
      ],
    },
  },
  {
    slug: 'smart-assistance', name: 'Smart Assistance', breadcrumb: 'Smart Assistance',
    title: 'Smart Assistance in Outsourcing — We Are Fiber',
    meta: 'Smart assistance in outsourcing: un assistente virtuale che gestisce grandi flussi di dati e alleggerisce il lavoro del team, per più produttività.',
    image: 'hero-teal.png',
    subtitle: 'Un assistente virtuale che gestisce grandi flussi di dati e **alleggerisce** il lavoro del team.',
    tags: ['Virtual assistant', 'Gestione dati', 'Produttività', 'Automazione'],
    stats: [{ icon: 'database', value: 'Dati', label: 'gestiti in automatico' }, { icon: 'zap', value: '+', label: 'produttività del team' }],
    servizioH2: 'Più tempo per il **core business**',
    servizioText: 'La Smart Assistance è un software capace di gestire un notevole flusso di dati e informazioni, supportando i dipendenti per ottimizzare il tempo e migliorare la produttività. Incameriamo, smistiamo, analizziamo ed elaboriamo le informazioni per supportare le decisioni migliori e alleggerire il lavoro del team.',
    beneficiH2: 'Cosa cambia **per il tuo business**',
    benefici: [
      { title: 'Più qualità', desc: 'Lavoro svolto senza errori, massimizzando i risultati.', icon: 'checkcircle' },
      { title: 'Gestione del tempo', desc: 'Tempo recuperato da dedicare al core business.', icon: 'clock' },
      { title: 'Risparmio', desc: 'Nessun costo per nuove risorse o formazione.', icon: 'percent' },
    ],
    comeFunziona: { h2: 'Il flusso di dati, **gestito in pochi step**', text: 'La Smart Assistance gestisce il flusso di dati e informazioni fornendo un supporto indispensabile ai dipendenti, ottimizzando il tempo e migliorando la produttività in pochi semplici step.' },
    caseStudy: { type: 'placeholder', h2: 'Case study in **arrivo**', text: 'Stiamo preparando un case study dedicato alla Smart Assistance. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.' },
  },
];

const OUT_DIR = path.join(__dirname, 'export', 'servizi', 'customer-service');
SUBS.forEach(s => {
  const out = path.join(OUT_DIR, s.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = buildPage(s);
  fs.writeFileSync(out, html);
  console.log('WROTE', path.relative(__dirname, out), (html.length / 1024 | 0) + 'KB');
});
console.log('Done:', SUBS.length, 'sottopagine Customer Service.');
