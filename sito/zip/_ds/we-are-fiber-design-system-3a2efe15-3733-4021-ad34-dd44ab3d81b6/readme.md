# We Are Fiber — Design System

A brand-foundations system reconstructed from the **We Are Fiber brand manual** (*"FBR"*, REV04, dated 30/10/2017), authored by **Solid Studio** (Milano · Caserta — solidstudio.it). We Are Fiber is a data / connectivity brand with a strongly **human-centred** identity: technology is always shown in the hands of real, diverse people.

> Brand name: **We Are Fiber** (workspace short name *"WAF"*). Payoff / tagline: **"outsource. human force."**. The brand mark is a **U-shaped symbol of two overlapping arcs** (red + teal arcs overlapping into navy) — a Venn-like "union" of forces. Logo artwork now lives in `assets/logos/` (horizontal + vertical lockups; full-colour, one-colour, mono line-pattern, and reversed/transparent variants).

## Sources
- `uploads/FBR_Brand_Manual_REV04_compressed.pdf` — the brand manual (27 pp). All colours, type roles, imagery rules and tone below come from it.
- `uploads/HVD-Fonts-Fabrikat-Mono-*.ttf` — the supplied **Fabrikat Mono** family (HVD Fonts), self-hosted in `assets/fonts/`.
- No codebase or Figma was provided — this is a **brand-manual-only** build, scoped (per the user) to **foundations: colour, type, tokens, specimen cards**.

---

## CONTENT FUNDAMENTALS

**Voice.** Human-first, declarative, value-led. The manual's headline copy is in **English, ALL CAPS, short and absolute**:
- *"OUR FIRST VALUE: HUMAN VALUE."*
- *"NOT PEOPLE, BUT PERSON"*

**Tone.** Warm, reassuring, optimistic, inclusive. The brand pillars (stated in the manual's *immaginario* section) are **Fiducia** (trust), **Vicinanza / Persone** (proximity / people), **Competenza** (competence — modern tech, always with a human), **Velocità** (speed — smart, young, dynamic).

**Person.** Speaks about *people* and shared human value — collective and inclusive ("person", "human"), not a chummy first-person "we/you" startup voice. Keep statements universal and dignified.

**Casing.** Titles and value statements are **UPPERCASE** (set in Fabrikat Mono Bold). Body copy is sentence case (Raleway). The decorative display face is reserved for single hero words.

**Emoji.** None. Not part of the brand. Do not introduce them.

**Vibe.** Confident, premium, technological-but-warm. Lots of white breathing room; the occasional bold colour-field statement.

---

## VISUAL FOUNDATIONS

**Colour.** Three Pantone-locked brand colours and *nothing else* — the manual is explicit: *"3 colori utilizzati in diverse opacità"* generate the entire spectrum.
- **Teal** `#1ECECA` (PANTONE 3252 C ref) — signature / primary accent
- **Pink/Red** `#E54360` (PANTONE 198 C ref) — energetic highlight, CTA
- **Navy** `#002E5D` (PANTONE 648 C ref) — the ink + dark "colour ground"
- Colour values are **sampled from the official logo artwork**; each is used at **100 / 70 / 50 / 35 / 15 %**.

**Type.** Three roles, strictly separated:
- **Display — "UniType Fiber"** (custom, decorative, built from the logo's base sign). **White grounds only, never < 40 px**, must be the protagonist with generous white margin. *Not supplied → substituted with **Inter** (Google Fonts); flagged below.*
- **Title — Fabrikat Mono** (supplied). Titles, subtitles, eyebrows. **Never for paragraphs.** On coloured grounds, titles use **Fabrikat Mono Bold, UPPERCASE** (UniType is never used on colour).
- **Text — Raleway** (Google Fonts). Paragraphs only — ExtraLight / Light / Regular / Bold.

**Backgrounds.** Mostly clean **white**; bold solid **colour fields** (navy primary) for statement sections. No gradients in the manual. No textures or repeating patterns. Photography can run full-bleed.

**Imagery.** Real photography of **diverse people collaborating** — warm, soft, positive tones; modern tech (tablet/phone/laptop) always paired with a human. A signature **duotone treatment** maps shadows→navy and highlights→pink (or teal). See `assets/imagery/`.

**Shape & depth.** Geometric brand built on a unit "x" → **near-square corners** (radius 0–8 px; default 4 px). Shadows are **soft and navy-tinted, never grey** (`--shadow-sm/md/lg`), used sparingly; a pink glow (`--shadow-accent`) for CTAs.

**Layout.** 8 px base grid, 1200 px container, generous section rhythm (96 px). The mark carries strict clear-space ("aree di rispetto") — give logo and display type room to breathe.

**Motion / states.** Not specified in the 2017 manual. Sensible, restrained defaults defined in tokens: standard ease `cubic-bezier(.2,.7,.3,1)`, 120–360 ms. Recommended hover = slight darken / accent; press = subtle shrink; focus = **teal ring**. (These are reasonable extrapolations — flagged as not from source.)

**Borders.** Hairline rules in `--fbr-line` (navy-15). Strong borders in navy.

---

## ICONOGRAPHY

The 2017 manual documents **no icon system** — it covers logo, colour, type and photography only. There is no brand icon font, sprite, or SVG set in the source.

**Recommendation (flagged — not from source):** pair the geometric/monospace character of the brand with a **thin, geometric line icon set**. Good CDN matches: **Lucide** or **Phosphor (thin/light)** — 1.5–2 px stroke, square-ish terminals, no fills. Use navy as the default icon colour, teal/pink for active/accent states. Avoid emoji and avoid mixing icon families.

If a real Fiber icon set exists, supply it and it will replace this recommendation.

---

## INDEX

**Root**
- `styles.css` — global entry point (consumers link this one file; `@import`s everything below)
- `readme.md` — this guide
- `SKILL.md` — Agent-Skills-compatible wrapper

**Tokens** (`tokens/`)
- `fonts.css` — `@font-face` (Fabrikat Mono self-hosted) + Raleway & Inter imports
- `colors.css` — 3 brand colours, opacity steps, neutrals, semantic aliases
- `typography.css` — families, weights, scale, line-height, tracking
- `spacing.css` — spacing, layout, radius, shadow, motion

**Specimen cards** (`guidelines/*.card.html`) — render in the Design System tab
- Colours: brand · opacity steps · neutrals & semantic
- Type: display · title · text · scale · weights
- Spacing: scale · radius & shadow
- Brand: logo · logo variants · symbol (Property) · photography · titles on grounds

**Index** (`assets/`)
- `fonts/` — Fabrikat Mono + Clash Display
- `imagery/` — brand photography
- `logos/` — WAF symbol + full lockups (h/v · colour/one-colour/mono/reversed · with payoff)

---

## CAVEATS / SUBSTITUTIONS
- **Display font "UniType Fiber" is missing** → substituted with **Inter**. Supply the real font to make the display layer accurate.
- **Logo artwork** is supplied in `assets/logos/` (raster PNG). SVG vector versions would be ideal for production — supply if available.
- **Motion, hover/press, iconography** are not in the source manual and are reasonable extrapolations.
- Colour opacity-step hexes are computed over white for solid swatches; use `rgba(var(--fbr-*-rgb) / a)` for true transparency.
