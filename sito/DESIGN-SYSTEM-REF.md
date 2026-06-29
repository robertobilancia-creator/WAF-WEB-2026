# We Are Fiber — Claude Design project (import reference)

Project: `b3e11111-3cf6-48d7-8e86-0a34f34af2f1`
Design system folder: `_ds/we-are-fiber-design-system-3a2efe15-3733-4021-ad34-dd44ab3d81b6/`

## Pages (.dc.html, Claude Design format)
- `WeAreFiber Home OK.dc.html`
- `Chi siamo.dc.html`
- `E-commerce OK.dc.html`
- `Ticket Management OK.dc.html`

## Colour tokens
- Teal `#1ececa` (primary accent) · Pink `#e54360` (CTA/highlight) · Navy `#002e5d` (ink/dark ground)
- Steps 100/70/50/35/15% over white. Paper `#f3f6f9`. Line `#d8dfe6` (navy-15).
- Semantic: --color-primary=teal, --color-accent=pink, --text-strong=navy, --text-body=#1c4060, --text-muted=navy-50, --focus-ring=teal.

## Typography
- Display: Inter (substitute for UniType Fiber), white grounds only, ≥40px
- Title: Fabrikat Mono — titles/subtitles/eyebrows, UPPERCASE on colour, never body
- Text: Raleway (paragraphs)
- Scale: display-xl 96 / display 64 / h1 44 / h2 32 / h3 24 / title 20 / lg 18 / body 16 / sm 14 / xs 12
- Tracking: caps 0.12em, title 0.04em

## Spacing / shape
- 8px base, container 1200px, section-y 96px, gutter 24px
- Radius: default 4px (xs 2 / sm 4 / md 8 / pill 999) — near-square, geometric
- Shadows navy-tinted: sm/md/lg + pink CTA glow `--shadow-accent`
- Motion: ease cubic-bezier(.2,.7,.3,1), 120/200/360ms

## Assets
- Logos: `assets/logos/` (WAF_orizz_color/trasp, WAFProp_color, WAF_vert_*_payoff) — PNG
- Imagery: `assets/imagery/` (duotone-a/b/c, hero-home, ecommerce-hero, sector-*, ticket-management, imagery-people-team, full-portrait-1)
- Copy: `uploads/waf-copy_*.md`

## Page format note
Pages use `<x-dc><helmet>…</helmet>…</x-dc>` with `support.js` + `_ds_bundle.js` and link the DS token CSS via the `_ds/…` path. Edits push back via the DesignSync MCP (finalize_plan → write_files).
