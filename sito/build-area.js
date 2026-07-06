// Genera le pagine-area sul template pilota Customer Service.
// Layout: hero (tag) -> intro -> le soluzioni (grid -> sottopagine) ->
// benefici -> settori (8 link) -> prova aggregata -> Try & Buy.
// Header/footer condivisi iniettati dai partials => identici su tutte le pagine.
// Uso: node build-area.js
const fs = require('fs'), path = require('path');

const HEADER = fs.readFileSync(path.join(__dirname, 'partials', 'header.html'), 'utf8');
const FOOTER = fs.readFileSync(path.join(__dirname, 'partials', 'footer.html'), 'utf8');

const span = (t, color) => t.replace(/\*\*(.+?)\*\*/g, `<span style="color:var(--fbr-${color});">$1</span>`);
const strong = (t) => t.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--fbr-navy); font-weight:700;">$1</strong>');

const I = {
  keyboard: '<rect x="2" y="4" width="20" height="16" rx="2"></rect><path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M7 16h10"></path>',
  database: '<ellipse cx="12" cy="5" rx="9" ry="3"></ellipse><path d="M3 5v14a9 3 0 0 0 18 0V5"></path><path d="M3 12a9 3 0 0 0 18 0"></path>',
  filetext: '<path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line>',
  truck: '<rect x="1" y="3" width="15" height="13"></rect><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"></polygon><circle cx="5.5" cy="18.5" r="2.5"></circle><circle cx="18.5" cy="18.5" r="2.5"></circle>',
  package: '<path d="M21 8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"></path><path d="m3.3 7 8.7 5 8.7-5"></path><path d="M12 22V12"></path>',
  monitor: '<rect x="2" y="3" width="20" height="14" rx="2"></rect><line x1="8" y1="21" x2="16" y2="21"></line><line x1="12" y1="17" x2="12" y2="21"></line><path d="m6 10 3-3 2 2 4-4"></path>',
  shieldcheck: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path><path d="m9 12 2 2 4-4"></path>',
  bot: '<rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line>',
  clipboardlist: '<rect x="8" y="2" width="8" height="4" rx="1"></rect><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"></path><path d="M9 12h6"></path><path d="M9 16h6"></path>',
  piechart: '<path d="M21.21 15.89A10 10 0 1 1 8 2.83"></path><path d="M22 12A10 10 0 0 0 12 2v10z"></path>',
  heart: '<path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>',
  trendingup: '<polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline><polyline points="17 6 23 6 23 12"></polyline>',
  percent: '<line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle>',
  target: '<circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle>',
  checkcircle: '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>',
  zap: '<polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>',
  eye: '<path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path><circle cx="12" cy="12" r="3"></circle>',
  users: '<path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path>',
  globe: '<circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>',
};

const ico = (k) => `<div class="waf-ico" style="margin-bottom:18px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[k]}</svg></div>`;

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

function renderSoluzioni(items) {
  return items.map(s =>
    `<a class="waf-card" href="${s.href}" style="padding:32px">
        ${ico(s.icon)}
        <div style="font-family:var(--font-title);font-weight:700;font-size:18px;color:var(--fbr-navy);margin-bottom:8px">${s.title}</div>
        <div style="font-size:14.5px;line-height:1.6;color:var(--text-body);margin-bottom:16px">${s.desc}</div>
        <div style="font-family:var(--font-title);font-weight:700;font-size:13px;color:var(--fbr-teal)">Scopri →</div>
      </a>`
  ).join('\n      ');
}

function renderBenefici(items) {
  return items.map(b =>
    `<div class="waf-card" style="padding:32px">
        <div class="waf-ico" style="margin-bottom:20px"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${I[b.icon]}</svg></div>
        <h3 style="font-family:var(--font-title);font-weight:700;font-size:18px;color:var(--fbr-navy);margin:0 0 10px">${b.title}</h3>
        <p style="font-size:14.5px;line-height:1.65;color:var(--text-body);margin:0">${b.desc}</p>
      </div>`
  ).join('\n      ');
}

function renderSettori() {
  return SETTORI.map(([name, href]) =>
    `<a class="waf-card" href="${href}" style="padding:22px 24px;display:flex;align-items:center;justify-content:space-between;gap:12px"><span style="font-family:var(--font-text);font-weight:600;font-size:16px;color:var(--fbr-navy)">${name}</span><span style="color:var(--fbr-teal);font-size:18px">→</span></a>`
  ).join('\n      ');
}

function renderProva(cs) {
  if (cs.type === 'placeholder') {
    return `<div style="text-align:center; max-width:620px; margin:0 auto;">
      <h3 style="font-family:var(--font-display); font-weight:700; font-size:26px; color:var(--fbr-navy); margin:0 0 14px;">Case study <span style="color:var(--fbr-pink);">in arrivo</span></h3>
      <p style="font-family:var(--font-text); font-size:16px; line-height:1.7; color:var(--text-body); margin:0 auto 28px; max-width:520px;">${cs.text}</p>
      <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
    </div>`;
  }
  const cols = Math.min(cs.items.length, 3);
  const cards = cs.items.map(it => {
    if (it.placeholder) {
      return `<div class="waf-card" style="padding:32px; background:#fff; border-style:dashed; display:flex; flex-direction:column; justify-content:center;">
          <div style="font-family:var(--font-title); font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--fbr-pink); margin-bottom:10px;">In arrivo</div>
          <div style="font-family:var(--font-display); font-weight:700; font-size:19px; color:var(--fbr-navy); margin-bottom:8px;">${it.title}</div>
          <p style="font-size:14px; line-height:1.6; color:var(--text-muted); margin:0;">${it.text}</p>
        </div>`;
    }
    return `<a class="waf-card" href="${it.href}" style="padding:32px; background:#fff;">
        <div style="font-family:var(--font-display); font-weight:700; font-size:20px; color:var(--fbr-navy); margin-bottom:4px;">${it.name}</div>
        <div style="font-family:var(--font-title); font-size:11px; font-weight:700; letter-spacing:1px; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:18px;">${it.label}</div>
        <p style="font-size:14px; line-height:1.6; color:var(--text-body); margin:0 0 18px;">${it.desc}</p>
        <div style="font-family:var(--font-title); font-weight:700; font-size:13px; color:var(--fbr-teal);">${it.linkLabel} →</div>
      </a>`;
  }).join('\n      ');
  return `<div style="display:grid; grid-template-columns:repeat(${cols},1fr); gap:18px;">
      ${cards}
    </div>`;
}

function buildBody(a) {
  return `<div style="background:#fff; font-family:var(--font-text); color:var(--fbr-navy);">

  <!-- ===================== HERO ===================== -->
  <section style="position:relative;overflow:hidden;padding:100px 24px 96px;border-bottom:1px solid var(--fbr-line)">
    <div style="position:absolute;bottom:-18px;right:max(24px, calc(50% - 590px));font-family:var(--font-title);font-weight:700;font-size:clamp(42px, 12vw, 150px);line-height:1;color:var(--fbr-teal);opacity:0.045;white-space:nowrap;pointer-events:none;letter-spacing:-0.04em;user-select:none">We Are Fiber</div>
    <div class="waf-wrap" style="position:relative">
      <div style="display:flex;align-items:center;gap:8px;font-family:var(--font-title);font-size:12px;letter-spacing:.06em;color:var(--fbr-navy-50);margin-bottom:36px">
        <a class="waf-link" href="/" style="text-decoration:none;color:var(--fbr-navy-50)">Home</a><span>›</span>
        <a class="waf-link" href="/servizi/" style="text-decoration:none;color:var(--fbr-navy-50)">Servizi</a><span>›</span>
        <span style="color:var(--fbr-navy)">${a.breadcrumb}</span>
      </div>
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:80px;align-items:end">
        <div>
          <div class="waf-eyebrow">Servizi</div>
          <h1 style="font-family:var(--font-display);font-weight:700;font-size:56px;line-height:1.03;letter-spacing:-0.03em;color:var(--fbr-navy);margin:0">${a.name}<br>in <span style="color:var(--fbr-teal)">Outsourcing</span></h1>
        </div>
        <div style="padding-bottom:8px">
          <p style="font-family:var(--font-text);font-size:20px;line-height:1.65;color:var(--text-body);margin:0 0 24px">${strong(a.subtitle)}</p>
          <div style="display:flex;flex-wrap:wrap;gap:8px;margin-bottom:28px">
            ${a.tags.map(t => `<span class="waf-tag">${t}</span>`).join('')}
          </div>
          <div style="display:flex;gap:14px;flex-wrap:wrap">
            <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
            <a class="waf-btn waf-btn--ghost" href="/contatti/">Prenota una call</a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ===================== INTRO ===================== -->
  <section class="waf-sec">
    <div class="waf-wrap" style="display:grid;grid-template-columns:0.9fr 1.1fr;gap:80px;align-items:center">
      <div>
        <div class="waf-eyebrow">Il servizio</div>
        <h2 class="waf-h2">${span(a.introH2, 'teal')}</h2>
      </div>
      <div>
        <p class="waf-lead" style="margin:0">${a.introText}</p>
      </div>
    </div>
  </section>

  <!-- ===================== LE SOLUZIONI ===================== -->
  <section class="waf-sec waf-band">
    <div class="waf-wrap">
      <div style="max-width:680px;margin-bottom:52px">
        <div class="waf-eyebrow">Le soluzioni</div>
        <h2 class="waf-h2">${span(a.soluzioniH2, 'teal')}</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:18px">
      ${renderSoluzioni(a.soluzioni)}
      </div>
    </div>
  </section>

  <!-- ===================== BENEFICI ===================== -->
  <section class="waf-sec">
    <div class="waf-wrap">
      <div style="max-width:640px;margin-bottom:52px">
        <div class="waf-eyebrow">Benefici</div>
        <h2 class="waf-h2">${span(a.beneficiH2, 'teal')}</h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:18px">
      ${renderBenefici(a.benefici)}
      </div>
    </div>
  </section>

  <!-- ===================== SETTORI ===================== -->
  <section class="waf-sec waf-band">
    <div class="waf-wrap">
      <div style="max-width:680px;margin-bottom:40px">
        <div class="waf-eyebrow">Settori</div>
        <h2 class="waf-h2">Lo applichiamo nel <span class="waf-hl">tuo settore</span></h2>
      </div>
      <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:14px">
      ${renderSettori()}
      </div>
    </div>
  </section>

  <!-- ===================== PROVA AGGREGATA ===================== -->
  <section class="waf-sec" style="background:var(--fbr-teal-15)">
    <div class="waf-wrap">
      <div style="display:inline-flex;align-items:center;gap:8px;background:var(--fbr-pink);color:#fff;font-family:var(--font-title);font-weight:700;font-size:12px;letter-spacing:0.08em;padding:10px 18px;border-radius:30px;margin-bottom:28px;box-shadow:0 8px 20px rgba(229,67,96,0.28)">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>
      <h2 class="waf-h2" style="margin:0 0 48px;max-width:760px">Risultati <span style="color:var(--fbr-pink)">reali</span></h2>
      ${renderProva(a.caseStudy)}
    </div>
  </section>

  <!-- ===================== TRY & BUY ===================== -->
  <section class="waf-sec" style="padding-top:88px">
    <div class="waf-wrap" style="background:linear-gradient(135deg,var(--fbr-teal-15) 0%,#ffffff 46%,var(--fbr-pink-15) 100%);border:1px solid var(--fbr-line);border-radius:28px;padding:76px 56px;text-align:center">
      <div style="display:inline-flex;align-items:center;gap:9px;font-family:var(--font-title);font-weight:700;font-size:12px;letter-spacing:0.14em;text-transform:uppercase;color:var(--fbr-pink);margin-bottom:18px"><span style="width:7px;height:7px;border-radius:50%;background:var(--fbr-teal)"></span>Try &amp; Buy</div>
      <h2 class="waf-h2" style="margin:0 0 16px">Inizia con un progetto pilota.<br>Scala con <span class="waf-hl">fiducia</span>.</h2>
      <p class="waf-lead" style="max-width:580px;margin:0 auto 32px">Con la formula Try &amp; Buy testi il servizio fino a 3 mesi prima di sceglierci come partner. Analizziamo i tuoi flussi, definiamo insieme il perimetro e attiviamo un team dedicato a rischio contenuto.</p>
      <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
        <a class="waf-btn waf-btn--navy" href="/contatti/">Parliamo del tuo progetto →</a>
        <a class="waf-btn waf-btn--ghost" href="/contatti/">Scarica la company profile</a>
      </div>
    </div>
  </section>

</div>`;
}

function buildPage(a) {
  return `<!doctype html>
<html lang="it">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>${a.title}</title>
<meta name="description" content="${a.meta}">
<link rel="stylesheet" href="/fiber-tokens.css">
<script>if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('js-reveal')}</script>
<script src="/reveal.js" defer></script>
</head>
<body>
${HEADER}
${buildBody(a)}
${FOOTER}
</body>
</html>`;
}

// ============================================================
// DATI PAGINE-AREA
// ============================================================
const AREAS = [
  {
    slug: 'back-office', name: 'Back Office', breadcrumb: 'Back Office',
    title: 'Back Office in Outsourcing — We Are Fiber',
    meta: 'Back office in outsourcing: data entry, gestione documentale, ordini e logistica con precisione oltre il 99%, mentre resti sul core business.',
    subtitle: 'Dati, documenti e ordini gestiti con **precisione oltre il 99%**, mentre tu resti sul core business.',
    tags: ['Data entry', 'Gestione documentale', 'Order management', 'Logistica', 'Multilingua'],
    introH2: 'I processi che **non puoi sbagliare**',
    introText: 'Un know-how consolidato, modelli strutturati e metodologie innovative per erogare servizi a valore aggiunto in modalità end-to-end. Gestiamo i tuoi processi interni ed esterni con precisione, migliorando la qualità percepita dei tuoi prodotti e servizi.',
    soluzioniH2: 'Cinque soluzioni, **un back office che gira**',
    soluzioni: [
      { title: 'Data Entry', desc: 'Inserimento e gestione dati su grandi volumi, con controllo qualità.', icon: 'keyboard', href: '/servizi/back-office/data-entry/' },
      { title: 'Data Enrichment', desc: 'Arricchimento e pulizia dei database, per dati sempre affidabili.', icon: 'database', href: '/servizi/back-office/data-enrichment/' },
      { title: 'Gestione Documentale', desc: 'Archiviazione, digitalizzazione e gestione dei flussi documentali.', icon: 'filetext', href: '/servizi/back-office/gestione-documentale/' },
      { title: 'Gestione Logistica', desc: 'Tracking, consegne e logistica inversa: i resi diventano opportunità.', icon: 'truck', href: '/servizi/back-office/gestione-logistica/' },
      { title: 'Gestione Ordini', desc: 'Order management e magazzino in tempo reale, strategia omnichannel.', icon: 'package', href: '/servizi/back-office/gestione-ordini/' },
    ],
    beneficiH2: 'Perché affidarci il **back office**',
    benefici: [
      { title: 'Precisione oltre il 99%', desc: 'Controllo qualità su ogni flusso.', icon: 'shieldcheck' },
      { title: 'Scalabilità sui volumi', desc: 'Capacità che si adatta ai picchi.', icon: 'trendingup' },
      { title: 'Meno costi', desc: 'Risorse interne liberate dalle attività ripetitive.', icon: 'percent' },
      { title: 'Focus sul core', desc: "L'operatività a noi, la strategia a te.", icon: 'target' },
    ],
    caseStudy: {
      type: 'cards',
      items: [
        { name: 'Just Eat', label: 'Food Delivery', desc: 'Data entry e onboarding ristoranti a errore zero.', linkLabel: 'Data Entry', href: '/servizi/back-office/data-entry/' },
        { name: 'Bloom & Wild', label: 'E-commerce', desc: 'Gestione logistica e ordini per l\'e-commerce.', linkLabel: 'Gestione Ordini', href: '/servizi/back-office/gestione-ordini/' },
      ],
    },
  },
  {
    slug: 'process-management', name: 'Process Management', breadcrumb: 'Process Management',
    title: 'Process Management in Outsourcing — We Are Fiber',
    meta: 'Process management in outsourcing: Control Room, Quality Audit e Robotic Process Automation per processi più veloci, monitorati e con errori vicini allo zero.',
    subtitle: 'Control Room, Quality Audit e RPA: processi più veloci, monitorati e con **errori vicini allo zero**.',
    tags: ['Control Room', 'Quality Audit', 'RPA', 'Automazione', 'Monitoraggio real-time'],
    introH2: 'La tecnologia che **amplifica** i tuoi processi',
    introText: 'Il process management raccoglie le soluzioni tecnologiche per automatizzare le attività e renderle più efficienti. Una rete di esperti specializzati, le migliori tecnologie e le soluzioni di automazione più efficienti per ottimizzare e velocizzare i tuoi processi, risparmiando risorse.',
    soluzioniH2: 'Tre soluzioni per **processi che scalano**',
    soluzioni: [
      { title: 'Control Room', desc: 'Monitoraggio costante dei processi e delle performance.', icon: 'monitor', href: '/servizi/process-management/control-room/' },
      { title: 'Quality Audit', desc: 'Controllo qualità con risorse dedicate.', icon: 'shieldcheck', href: '/servizi/process-management/quality-audit/' },
      { title: 'Robotic Process Automation', desc: 'Automazione dei task ripetitivi, per liberare tempo e ridurre gli errori.', icon: 'bot', href: '/servizi/process-management/robotic-process-automation/' },
    ],
    beneficiH2: 'Perché affidarci il **process management**',
    benefici: [
      { title: 'Errori vicini allo zero', desc: 'Automazione e controllo qualità sui processi.', icon: 'checkcircle' },
      { title: 'Processi più veloci', desc: 'Attività ottimizzate e velocizzate.', icon: 'zap' },
      { title: 'Scalabilità efficiente', desc: 'Crescita della capacità senza crescita lineare dei costi.', icon: 'trendingup' },
      { title: 'Monitoraggio trasparente', desc: 'Dashboard e dati sempre sotto controllo.', icon: 'eye' },
    ],
    caseStudy: {
      type: 'cards',
      items: [
        { name: 'Operatore settore energia', label: 'Energia · anonimo', desc: 'Processi documentali automatizzati con RPA: ROI in pochi mesi, forte riduzione dei costi, errori azzerati.', linkLabel: 'Robotic Process Automation', href: '/servizi/process-management/robotic-process-automation/' },
        { placeholder: true, title: 'Control Room & Quality Audit', text: 'Case study dedicati in arrivo, da integrare quando disponibili.' },
      ],
    },
  },
  {
    slug: 'outbound-marketing', name: 'Outbound Marketing', breadcrumb: 'Outbound Marketing',
    title: 'Outbound Marketing in Outsourcing — We Are Fiber',
    meta: 'Outbound marketing in outsourcing: survey, indagini di mercato e campagne loyalty multilingua che trasformano i contatti in opportunità di crescita.',
    subtitle: 'Survey, indagini di mercato e campagne loyalty che trasformano i contatti in **opportunità**.',
    tags: ['Survey', 'Indagini di mercato', 'Loyalty', 'Lead generation', 'Multilingua'],
    introH2: 'Dai contatti alle **opportunità**',
    introText: "L'outbound marketing raggiunge clienti e prospect in modo proattivo — per ascoltarli, capire il mercato e coltivare la relazione. Campagne multilingua, gestite da un team dedicato e misurate su KPI chiari.",
    soluzioniH2: 'Tre soluzioni orientate al **risultato**',
    soluzioni: [
      { title: 'Survey Customer Satisfaction', desc: 'Misura la soddisfazione dei clienti e trasforma il feedback in azioni.', icon: 'clipboardlist', href: '/servizi/outbound-marketing/survey-customer-satisfaction/' },
      { title: 'Indagini di Mercato', desc: 'Raccogli insight sul mercato e sui tuoi target per decidere meglio.', icon: 'piechart', href: '/servizi/outbound-marketing/indagini-di-mercato/' },
      { title: 'Campagne Loyalty', desc: 'Coltiva la relazione e aumenta la fidelizzazione dei clienti.', icon: 'heart', href: '/servizi/outbound-marketing/campagne-loyalty/' },
    ],
    beneficiH2: "Perché affidarci l'**outbound**",
    benefici: [
      { title: 'Più conoscenza del cliente', desc: 'Feedback e insight che orientano le decisioni.', icon: 'eye' },
      { title: 'Relazione più solida', desc: 'Contatti curati che rafforzano la fidelizzazione.', icon: 'heart' },
      { title: 'Contatti qualificati', desc: 'Attività orientate a opportunità concrete.', icon: 'target' },
      { title: 'Team multilingua', desc: 'Campagne coerenti su più mercati.', icon: 'globe' },
    ],
    caseStudy: {
      type: 'placeholder',
      text: 'Stiamo preparando un case study dedicato all\'outbound marketing. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su attività simili.',
    },
  },
];

const OUT_DIR = path.join(__dirname, 'export', 'servizi');
AREAS.forEach(a => {
  const out = path.join(OUT_DIR, a.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = buildPage(a);
  fs.writeFileSync(out, html);
  console.log('WROTE', path.relative(__dirname, out), (html.length / 1024 | 0) + 'KB');
});
console.log('Done:', AREAS.length, 'pagine-area.');
