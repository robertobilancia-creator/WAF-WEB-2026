// Genera le pagine Settore sullo schema della pagina E-commerce.
// Layout: hero (tag + stat card) -> la sfida -> i vantaggi (stat-band) ->
// servizi (cross-link aree) -> la soluzione -> case study -> Try & Buy.
// Header/footer condivisi iniettati dai partials => identici su tutte le pagine.
// Uso: node build-settore.js            (genera tutte le pagine)
const fs = require('fs'), path = require('path');

const HEADER = fs.readFileSync(path.join(__dirname, 'partials', 'header.html'), 'utf8');
const FOOTER = fs.readFileSync(path.join(__dirname, 'partials', 'footer.html'), 'utf8');

// **x** -> span colorato (per gli H2)
const span = (t, color) => t.replace(/\*\*(.+?)\*\*/g, `<span style="color:var(--fbr-${color});">$1</span>`);
// **x** -> <strong> (per sottotitoli / paragrafi)
const strong = (t) => t.replace(/\*\*(.+?)\*\*/g, '<strong style="color:var(--fbr-navy); font-weight:700;">$1</strong>');

const ICON = {
  'Customer Service': '<path d="M3 14v-3a9 9 0 0 1 18 0v3"></path><path d="M21 16a2 2 0 0 1-2 2h-2v-6h2a2 2 0 0 1 2 2z"></path><path d="M3 16a2 2 0 0 0 2 2h2v-6H5a2 2 0 0 0-2 2z"></path>',
  'Back Office': '<path d="M12 3 3 8l9 5 9-5-9-5z"></path><path d="m3 13 9 5 9-5"></path><path d="m3 18 9 5 9-5"></path>',
  'Process Management': '<path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>',
  'Outbound Marketing': '<path d="m3 11 18-5v12L3 14v-3z"></path><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"></path>',
};
const AREA_URL = {
  'Customer Service': '/servizi/customer-service/',
  'Back Office': '/servizi/back-office/',
  'Process Management': '/servizi/process-management/',
  'Outbound Marketing': '/servizi/outbound-marketing/',
};

const eyebrow = (label, dot = 'pink') =>
  `<div style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--fbr-teal); margin-bottom:18px;"><span style="width:7px; height:7px; border-radius:50%; background:var(--fbr-${dot});"></span>${label}</div>`;

function renderTags(tags) {
  return tags.map(t =>
    `<span style="font-family:var(--font-text); font-weight:500; font-size:13px; color:var(--fbr-navy); background:var(--fbr-paper); border:1px solid var(--fbr-line); border-radius:40px; padding:7px 15px;">${t}</span>`
  ).join('\n          ');
}

function renderVantaggi(items) {
  return items.map(v => {
    const color = v.sign === '+' ? 'teal' : 'pink';
    return `<div style="padding:40px 32px; border-right:1px solid var(--fbr-line); text-align:center;">
            <div style="font-family:var(--font-title); font-weight:300; font-size:80px; line-height:1; color:var(--fbr-${color}); margin-bottom:16px;">${v.sign}</div>
            <div style="font-family:var(--font-title); font-weight:700; font-size:17px; color:var(--fbr-navy); margin-bottom:10px;">${v.title}</div>
            <div style="font-family:var(--font-text); font-size:14px; line-height:1.55; color:var(--text-muted);">${v.desc}</div>
          </div>`;
  }).join('\n        ');
}

function renderServizi(items) {
  return items.map((s, i) => {
    const href = AREA_URL[s.area];
    return `<a class="s-row" href="${href}" style="display:grid; grid-template-columns:56px 1fr auto; gap:24px; align-items:center; padding:28px 16px; border-bottom:1px solid var(--fbr-line); text-decoration:none; transition:background .18s;">
            <div style="width:46px; height:46px; border-radius:13px; background:var(--fbr-teal-15); display:flex; align-items:center; justify-content:center; color:var(--fbr-navy);"><svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICON[s.area]}</svg></div>
            <div>
              <div style="font-family:var(--font-title); font-weight:700; font-size:18px; color:var(--fbr-navy); margin-bottom:5px;">${s.title}</div>
              <div style="font-family:var(--font-text); font-size:15px; color:var(--text-body); line-height:1.5;">${s.desc}</div>
            </div>
            <div style="display:flex; align-items:center; gap:8px; font-family:var(--font-title); font-weight:700; font-size:13px; color:var(--fbr-teal); white-space:nowrap;">${s.area} →</div>
          </a>`;
  }).join('\n        ');
}

function renderSolList(tags) {
  return tags.map(t =>
    `<div style="background:#fff; border:1px solid var(--fbr-line); border-radius:16px; padding:22px 26px; display:flex; align-items:center; gap:18px;">
            <div style="width:10px; height:10px; border-radius:50%; background:var(--fbr-teal); flex:none;"></div>
            <span style="font-family:var(--font-text); font-weight:500; font-size:16px; color:var(--fbr-navy);">${t}</span>
          </div>`
  ).join('\n        ');
}

function renderKpis(kpis) {
  return kpis.map(k =>
    `<div style="display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding:16px 0; border-bottom:1px solid var(--fbr-line);">
                <span style="font-family:var(--font-text); font-size:15px; color:var(--text-body);">${k.label}</span>
                <span style="font-family:var(--font-title); font-weight:300; font-size:28px; line-height:1; color:var(--fbr-${k.accent ? 'pink' : 'navy'}); white-space:nowrap;">${k.value}</span>
              </div>`
  ).join('\n            ');
}

function caseStudy(cs) {
  if (cs.type === 'placeholder') {
    return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:860px; margin:0 auto; text-align:center;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:var(--fbr-pink); color:#fff; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; border-radius:30px; margin-bottom:28px; box-shadow:0 8px 20px rgba(229,67,96,0.28);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 18px;">Case study <span style="color:var(--fbr-pink);">in arrivo</span></h2>
      <p style="font-family:var(--font-text); font-size:17px; line-height:1.7; color:var(--text-body); margin:0 auto 32px; max-width:600px;">${cs.text}</p>
      <a class="s-btn-navy" href="/contatti/" style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-text); font-weight:700; font-size:15px; color:#fff; background:var(--fbr-navy); padding:16px 30px; border-radius:14px; text-decoration:none; transition:all .2s; box-shadow:0 10px 26px rgba(0,46,93,0.2);">Parliamo del tuo progetto →</a>
    </div>
  </section>`;
  }

  if (cs.type === 'narrative') {
    const hl = cs.highlights.map(h =>
      `<div style="display:flex; align-items:baseline; justify-content:space-between; gap:16px; padding:16px 0; border-bottom:1px solid var(--fbr-line);">
                <span style="font-family:var(--font-text); font-size:15px; color:var(--text-body);">${h.label}</span>
                <span style="font-family:var(--font-title); font-weight:300; font-size:24px; line-height:1; color:var(--fbr-${h.accent ? 'pink' : 'navy'}); white-space:nowrap;">${h.value}</span>
              </div>`
    ).join('\n            ');
    return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:var(--fbr-pink); color:#fff; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; border-radius:30px; margin-bottom:28px; box-shadow:0 8px 20px rgba(229,67,96,0.28);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 48px; max-width:820px;">${span(cs.h2, 'pink')}</h2>
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:40px; align-items:start;">
        <div>
          <p style="font-family:var(--font-text); font-size:17px; line-height:1.75; color:var(--text-body); margin:0 0 24px;">${cs.text}</p>
          <a class="waf-link" href="${cs.linkHref}" style="display:inline-flex; align-items:center; gap:8px; font-family:var(--font-title); font-weight:700; font-size:14px; color:var(--fbr-teal); text-decoration:none;">${cs.linkLabel}</a>
          <div style="font-family:var(--font-text); font-size:12.5px; color:var(--fbr-navy-50); font-style:italic; margin-top:24px;">${cs.note}</div>
        </div>
        <div style="background:#fff; border:1px solid var(--fbr-line); border-radius:22px; padding:32px; box-shadow:0 4px 20px rgba(0,46,93,0.06);">
          <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:20px;">Risultati</div>
          <div style="display:flex; flex-direction:column; gap:0;">
            ${hl}
          </div>
        </div>
      </div>
    </div>
  </section>`;
  }

  // type === 'real'
  return `<section style="background:var(--fbr-teal-15); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="display:inline-flex; align-items:center; gap:8px; background:var(--fbr-pink); color:#fff; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.08em; padding:10px 18px; border-radius:30px; margin-bottom:28px; box-shadow:0 8px 20px rgba(229,67,96,0.28);">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>
        CASE STUDY
      </div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 48px; max-width:820px;">${span(cs.h2, 'pink')}</h2>
      <div style="display:grid; grid-template-columns:1fr 1fr; gap:40px; align-items:start;">
        <div>
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
        </div>
        <div style="background:#fff; border:1px solid var(--fbr-line); border-radius:22px; padding:32px; box-shadow:0 4px 20px rgba(0,46,93,0.06);">
          <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--fbr-navy-50); margin-bottom:20px;">${cs.resultsTitle || 'Risultati'}</div>
          <div style="display:flex; flex-direction:column; gap:0;">
            ${renderKpis(cs.kpis)}
          </div>
        </div>
      </div>
    </div>
  </section>`;
}

function buildBody(s) {
  return `<div style="background:#fff; font-family:var(--font-text); color:var(--fbr-navy);">

  <section style="padding:72px 24px 96px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="display:flex; align-items:center; gap:8px; font-family:var(--font-title); font-size:12px; letter-spacing:0.06em; color:var(--fbr-navy-50); margin-bottom:48px;">
        <a class="waf-link" href="/" style="text-decoration:none; color:var(--fbr-navy-50);">Home</a>
        <span>›</span><a class="waf-link" href="/settori/" style="text-decoration:none; color:var(--fbr-navy-50);">Settori</a>
        <span>›</span><span style="color:var(--fbr-navy);">${s.breadcrumb}</span>
      </div>
      <div style="display:grid; grid-template-columns:1.1fr 0.9fr; gap:64px; align-items:center;">
    <div style="display:flex; flex-direction:column; justify-content:flex-start;">
      ${eyebrow('Settori')}
      <h1 style="font-family:var(--font-display); font-weight:700; font-size:54px; line-height:1.04; letter-spacing:-0.025em; color:var(--fbr-navy); margin:0 0 22px;">${s.name}<br>in <span style="color:var(--fbr-teal);">Outsourcing</span></h1>
      <p style="font-family:var(--font-text); font-size:19px; line-height:1.65; color:var(--text-body); margin:0 0 28px; max-width:480px;">${strong(s.subtitle)}</p>
      <div style="display:flex; flex-wrap:wrap; gap:8px; margin-bottom:34px;">
          ${renderTags(s.tags)}
      </div>
      <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
        <a class="s-btn-navy" href="/contatti/" style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-text); font-weight:700; font-size:15px; color:#fff; background:var(--fbr-navy); padding:15px 26px; border-radius:14px; text-decoration:none; transition:all .2s; box-shadow:0 10px 26px rgba(0,46,93,0.2);">Parliamo del tuo progetto →</a>
        <a class="s-btn-ghost" href="/contatti/" style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-text); font-weight:700; font-size:15px; color:var(--fbr-navy); background:#fff; padding:15px 26px; border:1px solid var(--fbr-navy-35); border-radius:14px; text-decoration:none; transition:all .2s;">Prenota una call</a>
      </div>
    </div>
    <div style="position:relative;">
      <div style="position:relative; border-radius:24px; overflow:hidden; box-shadow:0 22px 60px rgba(0,46,93,0.18);">
        <img src="/assets/imagery/${s.image}" alt="${s.breadcrumb} outsourcing" style="width:100%; height:470px; object-fit:cover; object-position:center top; display:block;">
        <div style="position:absolute; inset:0; background:linear-gradient(150deg, rgba(30,206,202,0.04), rgba(0,46,93,0.12));"></div>
      </div>
      <div style="position:absolute; bottom:28px; left:-24px; background:rgba(0,46,93,0.88); backdrop-filter:blur(10px); border-radius:18px; padding:20px 26px; color:#fff; box-shadow:0 16px 38px rgba(0,46,93,0.22);">
        <div style="font-family:var(--font-title); font-weight:700; font-size:11px; letter-spacing:0.12em; text-transform:uppercase; color:var(--fbr-teal); margin-bottom:12px;">${s.heroCard.eyebrow}</div>
        <div style="display:flex; gap:28px; align-items:baseline;">
          <div><div style="font-family:var(--font-title); font-weight:300; font-size:30px; line-height:1; color:#fff; margin-bottom:4px;">${s.heroCard.s1v}</div><div style="font-family:var(--font-text); font-size:12px; color:rgba(255,255,255,0.6);">${s.heroCard.s1l}</div></div>
          <div style="width:1px; height:32px; background:rgba(255,255,255,0.18);"></div>
          <div><div style="font-family:var(--font-title); font-weight:300; font-size:30px; line-height:1; color:var(--fbr-teal); margin-bottom:4px;">${s.heroCard.s2v}</div><div style="font-family:var(--font-text); font-size:12px; color:rgba(255,255,255,0.6);">${s.heroCard.s2l}</div></div>
        </div>
      </div>
      </div>
    </div>
  </div></section>

  <section style="padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:0.9fr 1.1fr; gap:80px; align-items:center;">
      <div>
        ${eyebrow('La sfida')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:44px; line-height:1.06; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0;">${span(s.sfidaH2, 'pink')}</h2>
      </div>
      <div>
        <p style="font-family:var(--font-text); font-size:18px; line-height:1.75; color:var(--text-body); margin:0;">${s.sfidaText}</p>
      </div>
    </div>
  </section>

  <section style="background:var(--fbr-paper); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="text-align:center; max-width:560px; margin:0 auto 64px;">
        ${eyebrow('I vantaggi')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0;">I risultati che <span style="color:var(--fbr-teal);">puoi aspettarti</span></h2>
      </div>
      <div style="display:grid; grid-template-columns:repeat(4,1fr); gap:0; border-top:1px solid var(--fbr-line);">
        ${renderVantaggi(s.vantaggi)}
      </div>
    </div>
  </section>

  <section style="padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto;">
      <div style="max-width:680px; margin-bottom:52px;">
        ${eyebrow('Servizi')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 14px;">${span(s.serviziH2, 'teal')}</h2>
        <p style="font-family:var(--font-text); font-size:16px; line-height:1.6; color:var(--text-body); margin:0;">${s.serviziIntro}</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:0; border-top:1px solid var(--fbr-line);">
        ${renderServizi(s.servizi)}
      </div>
    </div>
  </section>

  <section style="background:var(--fbr-paper); padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:80px; align-items:center;">
      <div>
        ${eyebrow('La soluzione')}
        <h2 style="font-family:var(--font-display); font-weight:700; font-size:40px; line-height:1.08; letter-spacing:-0.02em; color:var(--fbr-navy); margin:0 0 22px;">${span(s.soluzioneH2, 'teal')}</h2>
        <p style="font-family:var(--font-text); font-size:17px; line-height:1.7; color:var(--text-body); margin:0;">${s.soluzioneText}</p>
      </div>
      <div style="display:flex; flex-direction:column; gap:16px;">
        ${renderSolList(s.tags)}
      </div>
    </div>
  </section>

  ${caseStudy(s.caseStudy)}

  <section style="padding:116px 24px;">
    <div style="max-width:1180px; margin:0 auto; background:linear-gradient(135deg, var(--fbr-teal-15) 0%, #ffffff 46%, var(--fbr-pink-15) 100%); border:1px solid var(--fbr-line); border-radius:28px; padding:76px 56px; text-align:center;">
      <div style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-title); font-weight:700; font-size:12px; letter-spacing:0.14em; text-transform:uppercase; color:var(--fbr-pink); margin-bottom:18px;"><span style="width:7px; height:7px; border-radius:50%; background:var(--fbr-teal);"></span>Try &amp; Buy</div>
      <h2 style="font-family:var(--font-display); font-weight:700; font-size:42px; line-height:1.08; letter-spacing:-0.025em; color:var(--fbr-navy); margin:0 0 16px;">Inizia con un progetto pilota.<br>Scala con <span style="color:var(--fbr-teal);">fiducia</span>.</h2>
      <p style="font-family:var(--font-text); font-size:17px; line-height:1.6; color:var(--text-body); margin:0 auto 32px; max-width:580px;">Con la formula Try &amp; Buy testi il servizio fino a 3 mesi prima di sceglierci come partner. Analizziamo i tuoi flussi, definiamo insieme il perimetro e attiviamo un team dedicato a rischio contenuto.</p>
      <div style="display:flex; align-items:center; justify-content:center; gap:14px; flex-wrap:wrap;">
        <a class="s-btn-navy" href="/contatti/" style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-text); font-weight:700; font-size:15px; color:#fff; background:var(--fbr-navy); padding:16px 30px; border-radius:14px; text-decoration:none; transition:all .2s; box-shadow:0 10px 26px rgba(0,46,93,0.2);">Parliamo del tuo progetto →</a>
        <a class="s-btn-ghost" href="/contatti/" style="display:inline-flex; align-items:center; gap:9px; font-family:var(--font-text); font-weight:700; font-size:15px; color:var(--fbr-navy); background:#fff; padding:16px 30px; border:1px solid var(--fbr-navy-35); border-radius:14px; text-decoration:none; transition:all .2s;">Scarica la company profile</a>
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
<style>
  .s-btn-navy:hover{ background:var(--fbr-black); transform:translateY(-1px); }
  .s-btn-ghost:hover{ border-color:var(--fbr-navy); transform:translateY(-1px); }
  .s-row:hover{ background:var(--fbr-paper); }
  .waf-link:hover{ color:var(--fbr-pink) !important; }
</style>
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
// DATI SETTORI
// ============================================================
const SECTORS = [
  {
    slug: 'healthcare', name: 'Healthcare', breadcrumb: 'Healthcare', image: 'sector-healthcare.jpg',
    title: 'Healthcare in Outsourcing — We Are Fiber',
    meta: 'Gestione prenotazioni, customer care e back office per il settore sanitario in outsourcing, con team multilingua e gestione sicura dei dati sensibili.',
    subtitle: 'Una chiamata persa è una prenotazione mancata. Gestiamo richieste e appuntamenti con **tempestività e sicurezza dei dati**.',
    tags: ['Gestione prenotazioni', 'Customer care', 'Back office', 'Dati sensibili in sicurezza'],
    heroCard: { eyebrow: 'Healthcare · Medicenter', s1v: '98%', s1l: 'customer satisfaction', s2v: '20 sec', s2l: 'tempo di risposta' },
    sfidaH2: 'Tempestività e **sicurezza**, senza compromessi',
    sfidaText: 'Nel settore sanitario contano la tempestività, la disponibilità e la gestione sicura dei dati sensibili. Cliniche e strutture faticano a reggere il flusso di richieste con strumenti obsoleti — e ogni chiamata persa è una prenotazione mancata. Esternalizzare significa assorbire i picchi senza far attendere il paziente.',
    vantaggi: [
      { sign: '+', title: 'Prenotazioni gestite', desc: 'anche nei picchi di richieste' },
      { sign: '−', title: 'Chiamate perse', desc: 'assorbimento elevato' },
      { sign: '−', title: 'Tempi di attesa', desc: 'risposte rapide al paziente' },
      { sign: '+', title: 'Soddisfazione', desc: 'assistenza personalizzata' },
    ],
    serviziH2: 'Tutto ciò che serve alla **tua struttura**',
    serviziIntro: 'Componiamo il servizio sui processi che pesano di più su cliniche e strutture sanitarie.',
    servizi: [
      { title: 'Gestione prenotazioni e help desk', desc: 'Acquisizione, assistenza e gestione reclami, con tracciamento di ogni richiesta.', area: 'Customer Service' },
      { title: 'Back office sanitario', desc: 'Archiviazione documentale, data entry, gestione database e flussi (PEC, reclami).', area: 'Back Office' },
      { title: 'Process management', desc: 'Control Room, Quality Audit e RPA per processi tracciati e conformi.', area: 'Process Management' },
    ],
    soluzioneH2: 'Prenotazioni gestite per cliniche e **ospedali**',
    soluzioneText: "Gestiamo le prenotazioni in ingresso e l'help desk con tempi di attesa minimi e assistenza personalizzata, garantendo elevati livelli di assorbimento delle chiamate anche nei picchi. Supporto post-servizio per refertazione ed eventuali problematiche.",
    caseStudy: {
      type: 'real',
      h2: 'Medicenter Group: assorbimento delle chiamate **anche nei picchi**',
      azienda: 'Clinica che offre diagnostica, medicina specialistica, chirurgia ambulatoriale e riabilitazione.',
      sfida: 'Garantire elevati livelli di assorbimento delle chiamate in entrata nei momenti di picco.',
      soluzione: "Gestione delle prenotazioni in ingresso e dell'help desk, con miglioramento dei KPI.",
      resultsTitle: 'Risultati',
      kpis: [
        { label: 'Risorse', value: '14' },
        { label: 'Tempi di risposta', value: '20 sec' },
        { label: 'Customer Satisfaction', value: '98%', accent: true },
        { label: 'Controllo qualità', value: '96%' },
      ],
    },
  },
  {
    slug: 'food-delivery', name: 'Food Delivery', breadcrumb: 'Food Delivery', image: 'sector-delivery.jpg',
    title: 'Food Delivery in Outsourcing — We Are Fiber',
    meta: 'Onboarding ristoranti, gestione menu e customer care per il food delivery in outsourcing. Dati sempre aggiornati e processi a massima precisione.',
    subtitle: 'Inserimento e aggiornamento di ristoranti e menu **senza errori**, mentre tu resti sul tuo core business.',
    tags: ['Onboarding ristoranti', 'Gestione menu', 'Customer care', 'Big data'],
    heroCard: { eyebrow: 'Food Delivery · Just Eat', s1v: '650', s1l: 'ristoranti / mese', s2v: '2.000', s2l: 'menu inseriti / mese' },
    sfidaH2: 'Stai sfruttando tutte le **opportunità** del food delivery?',
    sfidaText: 'Il food delivery richiede dati sempre aggiornati e scadenze rispettate. Esternalizzare consente di tagliare i costi, ottimizzare le risorse interne e digitalizzare i dati con la massima precisione nei processi di inserimento — restando concentrati sul core business.',
    vantaggi: [
      { sign: '+', title: 'Menu aggiornati', desc: 'giornalieri, settimanali o mensili' },
      { sign: '−', title: 'Errori di inserimento', desc: 'processi puliti e verificati' },
      { sign: '−', title: 'Costi', desc: 'risorse interne ottimizzate' },
      { sign: '+', title: 'Velocità di onboarding', desc: 'ristoranti a sistema in fretta' },
    ],
    serviziH2: 'Dai dati al cliente, **in un unico partner**',
    serviziIntro: "Dall'inserimento dei menu fino al supporto al cliente finale, con un solo interlocutore.",
    servizi: [
      { title: 'Data entry e gestione menu', desc: 'Inserimento e aggiornamento di ristoranti e menu, pulizia database, analisi big data.', area: 'Back Office' },
      { title: 'Customer care', desc: 'Acquisizione clienti, assistenza, gestione reclami e help desk.', area: 'Customer Service' },
      { title: 'Process management', desc: 'Control Room, Quality Audit e RPA per processi tracciati.', area: 'Process Management' },
    ],
    soluzioneH2: 'Menu sempre aggiornati, in **ogni dettaglio**',
    soluzioneText: 'Creazione e aggiornamento di menu personalizzabili — allergeni, prodotti biologici, specialità locali, vini DOC e birre artigianali — con aggiornamenti rapidi giornalieri, settimanali o mensili.',
    caseStudy: {
      type: 'real',
      h2: 'Just Eat: onboarding ristoranti **a errore zero**',
      azienda: 'Piattaforma di food delivery con oltre 66.000 ristoranti in 13 mercati mondiali.',
      sfida: "Velocizzare l'inserimento e l'aggiornamento dei ristoranti ed eliminare gli errori nei processi.",
      soluzione: 'Gestione dell\'intero processo di Data Entry, pulizia database e analisi big data; registrazione nuovi ristoranti, creazione e aggiornamento menu.',
      resultsTitle: 'Risultati',
      kpis: [
        { label: 'Risorse full time', value: '19' },
        { label: 'Ristoranti inseriti / mese', value: '650' },
        { label: 'Menu inseriti / mese', value: '2.000' },
        { label: 'Menu aggiornati / mese', value: '1.156', accent: true },
      ],
    },
  },
  {
    slug: 'retail', name: 'Retail', breadcrumb: 'Retail', image: 'sector-retail.jpg',
    title: 'Retail in Outsourcing — We Are Fiber',
    meta: 'Customer care in outsourcing per il retail: supporto 24/7 prima e dopo la vendita, multilingua, per fidelizzare i tuoi clienti.',
    subtitle: 'Customer care modellato sui tuoi clienti per **fidelizzare** e risolvere ogni dubbio in fretta.',
    tags: ['Customer care 24/7', 'Live chat', 'Pre e post vendita', 'Multilingua'],
    heroCard: { eyebrow: 'Retail', s1v: '24/7', s1l: 'assistenza clienti', s2v: 'Multilingua', s2l: 'su ogni canale' },
    sfidaH2: 'Nel retail, **fidelizzare** è tutto',
    sfidaText: 'Fidelizzare i clienti è uno degli obiettivi principali del retail. Esternalizzare il customer care ti permette di sfruttare al massimo le tue potenzialità e concentrarti sulle attività a maggior valore, offrendo risposte rapide che fanno tornare il consumatore.',
    vantaggi: [
      { sign: '+', title: 'Fidelizzazione', desc: 'clienti che tornano' },
      { sign: '+', title: 'Soddisfazione', desc: 'dubbi risolti in fretta' },
      { sign: '−', title: 'Costi', desc: 'focus sulle attività a valore' },
      { sign: '+', title: 'Reattività', desc: 'supporto su ogni canale' },
    ],
    serviziH2: 'Tutto ciò che serve al **tuo store**',
    serviziIntro: 'Un presidio completo sul cliente, prima e dopo ogni acquisto.',
    servizi: [
      { title: 'Customer care 24/7', desc: 'Live chat, supporto telefonico e smistamento tra primo e secondo livello.', area: 'Customer Service' },
      { title: 'Back office', desc: 'Archiviazione documentale, data entry, gestione database e flussi.', area: 'Back Office' },
      { title: 'Process management', desc: 'Control Room, Quality Audit e RPA.', area: 'Process Management' },
    ],
    soluzioneH2: 'Supporto a 360°, **prima e dopo la vendita**',
    soluzioneText: "Customer care attivo 24/7 su più livelli — live chat da dispositivi mobili, supporto telefonico con smistamento tra primo e secondo livello — per un'assistenza completa prima e dopo l'acquisto.",
    caseStudy: {
      type: 'placeholder',
      text: 'Stiamo preparando un case study dedicato al settore retail. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su casi simili.',
    },
  },
  {
    slug: 'finance-insurance', name: 'Finance &amp; Insurance', breadcrumb: 'Finance & Insurance', image: 'sector-fintech.jpg',
    title: 'Finance & Insurance in Outsourcing — We Are Fiber',
    meta: 'Back office, customer care e Robotic Process Automation per il settore Finance & Insurance in outsourcing: meno carico, meno errori, più efficienza.',
    subtitle: 'Il settore che vive di dati. Automatizziamo le attività time-consuming per **ridurre il carico e gli errori**.',
    tags: ['RPA', 'Back office', 'Customer care', 'Compliance'],
    heroCard: { eyebrow: 'Finance &amp; Insurance', s1v: 'RPA', s1l: 'processi automatizzati', s2v: '≈0', s2l: 'errori di processo' },
    sfidaH2: 'Più dati, **meno tempo**',
    sfidaText: 'Finance & Insurance è il settore che più di tutti vive di dati. Esternalizzare le attività time-consuming riduce il carico sui dipendenti e i costi del personale specializzato. Con la Robotic Process Automation semplifichi il lavoro e abbatti gli errori.',
    vantaggi: [
      { sign: '+', title: 'Pratiche evase', desc: 'più volume gestito' },
      { sign: '−', title: 'Errori', desc: 'automazione dei processi' },
      { sign: '−', title: 'Costi', desc: 'meno personale dedicato' },
      { sign: '+', title: 'Efficienza', desc: 'team liberati dalle attività ripetitive' },
    ],
    serviziH2: "Dalla pratica all'automazione",
    serviziIntro: 'Uniamo automazione, back office e assistenza in un unico flusso conforme.',
    servizi: [
      { title: 'Process management & RPA', desc: 'Control Room, Quality Audit e Robotic Process Automation su processi documentali.', area: 'Process Management' },
      { title: 'Back office', desc: 'Data entry, gestione documentale e database, quality check.', area: 'Back Office' },
      { title: 'Customer care', desc: 'Assistenza, gestione reclami e help desk.', area: 'Customer Service' },
    ],
    soluzioneH2: 'Tecnologie che liberano il **potere dell\'innovazione**',
    soluzioneText: 'Implementiamo tecnologie innovative per svolgere attività tipiche delle abilità umane, liberando il potenziale dei tuoi team e aumentando le performance aziendali.',
    caseStudy: {
      type: 'narrative',
      h2: 'Automazione dei processi per il **settore finance**',
      text: "Un operatore del settore energia ha automatizzato i propri processi documentali e di data entry con la nostra Robotic Process Automation, con ritorno dell'investimento in pochi mesi, forte riduzione dei costi di processo ed errori azzerati.",
      linkLabel: 'Vedi il case study completo su Robotic Process Automation →',
      linkHref: '/servizi/process-management/robotic-process-automation/',
      note: 'Cliente anonimizzato — progetto RPA già attivo sul servizio.',
      highlights: [
        { label: 'Ritorno dell\'investimento', value: 'pochi mesi' },
        { label: 'Costi di processo', value: 'in forte calo' },
        { label: 'Errori', value: 'azzerati', accent: true },
      ],
    },
  },
  {
    slug: 'mobility', name: 'Mobility', breadcrumb: 'Mobility', image: 'sector-mobility.jpg',
    title: 'Mobility in Outsourcing — We Are Fiber',
    meta: 'Data entry e customer service in outsourcing per logistica e trasporti: flessibili, multilingua e sempre attivi.',
    subtitle: 'Data entry e customer service flessibili per logistica e trasporti, **sempre attivi**.',
    tags: ['Data entry', 'Customer service', 'Tracciamento', 'Multilingua'],
    heroCard: { eyebrow: 'Mobility', s1v: '24/7', s1l: 'servizio attivo', s2v: 'Multilingua', s2l: 'supporto clienti' },
    sfidaH2: 'Logistica e trasporti, **sempre più digitali**',
    sfidaText: 'Il settore logistica e trasporti si è profondamente rinnovato con la digitalizzazione dei servizi. Servono Data Entry e Customer Service flessibili e personalizzati, che reggano i volumi e mantengano alta la qualità del supporto.',
    vantaggi: [
      { sign: '+', title: 'Tracciamento', desc: 'flussi sotto controllo' },
      { sign: '+', title: 'Reattività', desc: 'supporto sempre attivo' },
      { sign: '−', title: 'Costi', desc: 'gestione flessibile dei volumi' },
      { sign: '+', title: 'Brand reputation', desc: 'customer support eccellente' },
    ],
    serviziH2: 'Flessibili su ogni **necessità**',
    serviziIntro: 'Scaliamo dati e assistenza sui volumi reali di logistica e trasporti.',
    servizi: [
      { title: 'Customer service', desc: 'Assistenza telefonica e gestione di richieste, domande e reclami.', area: 'Customer Service' },
      { title: 'Data entry e back office', desc: 'Gestione e tracciamento dei dati e dei flussi.', area: 'Back Office' },
      { title: 'Process management', desc: 'Control Room, Quality Audit e RPA.', area: 'Process Management' },
    ],
    soluzioneH2: 'Un supporto professionale e **sempre attivo**',
    soluzioneText: 'Un servizio sempre attivo che migliora la brand reputation grazie a un customer support eccellente: professionisti capaci di gestire in modo ottimale richieste, domande e reclami dei clienti.',
    caseStudy: {
      type: 'placeholder',
      text: 'Stiamo preparando un case study dedicato al settore mobility. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su casi simili.',
    },
  },
  {
    slug: 'travel', name: 'Travel', breadcrumb: 'Travel', image: 'sector-airplane.jpg',
    title: 'Travel in Outsourcing — We Are Fiber',
    meta: 'Booking office multilingua e attivo 24h in outsourcing per il settore travel: supporto a clienti, agenzie e intermediari in ogni fase del viaggio.',
    subtitle: 'Un canale di booking **multilingua e attivo 24h**, per clienti finali, agenzie e intermediari.',
    tags: ['Booking 24h', 'Multilingua', 'Pre e post viaggio', 'Qualità'],
    heroCard: { eyebrow: 'Travel · Trivago', s1v: '24h', s1l: 'canale di booking', s2v: '5', s2l: 'lingue gestite' },
    sfidaH2: 'Supporto costante, in **ogni fase del viaggio**',
    sfidaText: "Nel turismo il cliente vuole supporto non solo al momento dell'acquisto, ma anche prima e dopo. L'obiettivo è fornire un supporto costante, evitando cali di produttività e mettendo al primo posto la soddisfazione del consumatore.",
    vantaggi: [
      { sign: '+', title: 'Prenotazioni', desc: 'canale di booking sempre aperto' },
      { sign: '−', title: 'Tempi di risposta', desc: 'assistenza su tutti i canali' },
      { sign: '+', title: 'Copertura multilingua', desc: 'più mercati serviti' },
      { sign: '+', title: 'Soddisfazione', desc: 'supporto in ogni fase del viaggio' },
    ],
    serviziH2: "Dal booking all'**assistenza**",
    serviziIntro: 'Un unico partner dal momento della prenotazione fino al post-viaggio.',
    servizi: [
      { title: 'Booking office multilingua', desc: 'Canale di prenotazione attivo 24h per clienti, agenzie e intermediari.', area: 'Customer Service' },
      { title: 'Back office', desc: 'Gestione documentale, data entry e database.', area: 'Back Office' },
      { title: 'Process management', desc: 'Control Room, Quality Audit e RPA.', area: 'Process Management' },
    ],
    soluzioneH2: 'Un canale di booking multilingua, **24h**',
    soluzioneText: 'Un canale di booking sempre disponibile e multilingua per clienti finali, agenzie di viaggio e intermediari, con personale altamente qualificato per uno standard elevato in ogni segmento.',
    caseStudy: {
      type: 'real',
      h2: 'Trivago: supporto multilingua su **più mercati**',
      azienda: 'Il più grande motore di ricerca per la comparazione dei prezzi degli hotel, con oltre 750.000 strutture nel mondo.',
      sfida: 'Tempi di risposta elevati sulle richieste provenienti dai diversi canali.',
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
    slug: 'b2b-services', name: 'B2B Services', breadcrumb: 'B2B Services', image: 'sector-screens.jpg',
    title: 'B2B Services in Outsourcing — We Are Fiber',
    meta: 'Business Process Outsourcing per le aziende B2B: customer care, back office, process management e outbound su misura, multilingua e 24/7.',
    subtitle: 'Esternalizza i processi time-consuming e concentra le risorse sul tuo **core business**.',
    tags: ['BPO', 'Customer care', 'Back office', 'Multilingua 24/7'],
    heroCard: { eyebrow: 'B2B Services', s1v: '24/7', s1l: 'copertura servizio', s2v: 'BPO', s2l: 'end-to-end' },
    sfidaH2: 'Le tue forze sul **core business**',
    sfidaText: 'Vuoi concentrare risorse ed energie sulle attività core della tua azienda? Esternalizzare i servizi time-consuming aumenta efficienza e produttività. Sviluppiamo attività di Business Process Outsourcing con tempestività, professionalità, aderenza agli obiettivi e riduzione dei costi operativi.',
    vantaggi: [
      { sign: '+', title: 'Produttività', desc: 'processi più snelli' },
      { sign: '+', title: 'Efficienza', desc: 'operatività continua' },
      { sign: '−', title: 'Costi operativi', desc: 'meno oneri di struttura' },
      { sign: '+', title: 'Focus sul core', desc: 'il time-consuming a noi' },
    ],
    serviziH2: "Un partner per **l'intero processo**",
    serviziIntro: 'Quattro aree integrate, per coprire end-to-end i processi della tua azienda.',
    servizi: [
      { title: 'Customer care multicanale', desc: 'Live chat, contact center, social e chatbot.', area: 'Customer Service' },
      { title: 'Back office', desc: 'Data entry, gestione documentale, database e flussi.', area: 'Back Office' },
      { title: 'Process management', desc: 'Control Room, Quality Audit e RPA.', area: 'Process Management' },
      { title: 'Outbound marketing', desc: 'Survey, indagini di mercato e campagne loyalty.', area: 'Outbound Marketing' },
    ],
    soluzioneH2: 'BPO su misura, multilingua e **24/7**',
    soluzioneText: 'Gestione del servizio clienti tramite live chat, contact center, social e chatbot. Servizi di Customer Care, Back Office, Process Management e Outbound Marketing su misura, multilingua e disponibili 24/7 per i clienti di tutto il mondo.',
    caseStudy: {
      type: 'placeholder',
      text: 'Stiamo preparando un case study dedicato ai servizi B2B. Nel frattempo, parlaci del tuo progetto: ti mostriamo risultati e referenze su casi simili.',
    },
  },
];

const OUT_DIR = path.join(__dirname, 'export', 'settori');
SECTORS.forEach(s => {
  const out = path.join(OUT_DIR, s.slug, 'index.html');
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const html = buildPage(s);
  fs.writeFileSync(out, html);
  console.log('WROTE', path.relative(__dirname, out), (html.length / 1024 | 0) + 'KB');
});
console.log('Done:', SECTORS.length, 'pagine settore.');
