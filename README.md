# WAF-WEB-2026 — We Are Fiber

Redesign del sito **We Are Fiber** (BPO/outsourcing). Prototipo HTML/CSS di riferimento per la futura build in WordPress + Elementor.

## Struttura

- **`sito/`** — pipeline di export e sito statico
  - `render.js` — compila i `.dc.html` (Claude Design) in HTML statico standalone
  - `build-page.js` — assembla le pagine authored con header/footer condivisi
  - `partials/` — header e footer condivisi (uguali su tutte le pagine)
  - `pages-src/` — corpi HTML delle pagine scritte a mano
  - `export/` — sito statico navigabile (output finale)
  - `zip/` — sorgenti `.dc.html` esportati da Claude Design
  - `SITEMAP-SLUGS.md` — mappa slug/URL del sito
- **`Brand identity/`** — font, logo, presentazione brand
- **`Prototipo/`** — prototipi precedenti
- **`Risorse MD/`** — copy e materiali di riferimento

## Anteprima locale

```bash
cd sito/export
python3 -m http.server 8011
# → http://localhost:8011/
```

## Rigenerare le pagine

```bash
cd sito
# pagina da sorgente Claude Design (.dc.html)
node render.js zip/<pagina>.dc.html export/<path>/index.html "Titolo"
# pagina authored a mano
node build-page.js pages-src/<slug>.body.html export/<path>/index.html "Titolo"
```
