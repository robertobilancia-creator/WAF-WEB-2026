# WE ARE FIBER — ANALISI VISUAL & DESIGN SYSTEM
> Documento preparato per il redesign del sito wearefiber.com
> Data analisi: giugno 2026 | CMS: HubSpot | URL: https://www.wearefiber.com/it

---

## 1. DESIGN SYSTEM ATTUALE

### 1.1 Palette Colori

| Nome Token | Hex | RGB | Utilizzo principale |
|------------|-----|-----|---------------------|
| **Primary / Dark Blue** | `#00385A` | rgb(0, 56, 90) | Testo principale, sfondi sezioni, bottoni primari, navbar secondaria, footer |
| **Accent Cyan / Teal** | `#00E6D4` | rgb(0, 230, 212) | Parole chiave highlight nei titoli, H4 footer, icone freccia, accenti |
| **Accent Pink / Coral** | `#FF3E6C` | rgb(255, 62, 108) | Bottone Industry navbar, icone step numerati metodologia, CTA urgenti |
| **White** | `#FFFFFF` | rgb(255, 255, 255) | Sfondi sezioni chiare, testo su sfondo scuro |
| **Light Background** | `#FAFAFA` | rgb(250, 250, 250) | Sfondi sezioni secondarie (servizi, methodology) |
| **Text Muted Light** | `#B6C5CF` | rgb(182, 197, 207) | Testi secondari, decorativi |
| **Text Muted** | `#809CAC` | rgb(128, 156, 172) | Testi di supporto |
| **Black** | `#1E1E1E` | rgb(30, 30, 30) | Casi specifici |

**Logica cromatica:**
Il sito usa una **triade cromatica**:
- **Blu scuro** (#00385A): dominante, trasmette fiducia/professionalità
- **Ciano/teal** (#00E6D4): accent principale, parole chiave, modernità/tech
- **Rosa/corallo** (#FF3E6C): accent secondario, urgenza, CTA forti

Il ciano viene usato per evidenziare specifiche parole chiave nei titoli (es: "insieme", "azienda.", "Smart", "Settori") creando un effetto highlight semantico. Il rosa/corallo è usato per i cerchi numerati della metodologia e il bottone Industry.

---

### 1.2 Tipografia

**Font principale:** **Aileron** (Google Fonts, sans-serif)
**Font secondario / decorativo:** **FabrikatMono** (HVD Fonts, monospace — caricato localmente via HubSpot CDN)

> **FabrikatMono** è usata nell'hero della homepage e nelle card servizi per creare un effetto "typewriter/computer" che richiama il mondo digitale e tech. Non è usata in corpo testo.

#### Scala Tipografica Rilevata

| Elemento | Font | Size | Weight | Line-height | Color | Note |
|----------|------|------|--------|-------------|-------|------|
| H1 (pagine interne) | Aileron | ~48-56px | 800 | ~60px | #00385A | Hero principale |
| H1 homepage (visivo) | FabrikatMono | ~52px | 400/700 | ~60px | #FFFFFF | Su sfondo dark blue |
| H2 | Aileron | 40px | 800 | 52px | #00385A | Titoli sezione |
| H3 | Aileron | 30px | 600 | 32px | #00385A | Card title, sottotitoli |
| H4 (footer) | Aileron | 21px | 600 | 26px | #00E6D4 | Intestazioni footer |
| H6 | Aileron | 18px | 600 | 20px | #00385A | Etichette |
| Body | Aileron | 18px | 400 | ~27px | #00385A | Testo corrente |
| Paragrafo hero | Aileron | 30px | 400 | 37.5px | #00385A | Sottotitolo hero pagine interne |
| Nav links top | Aileron | 14px | 700 | 10px | #00385A | Menu navigazione |
| Nav links bottom | Aileron | ~16px | 700 | – | #FFFFFF | Servizi bar |
| Button text | Aileron | 15-18px | 700 | – | #FFFFFF | CTA |
| Badge uppercase | Aileron | ~12px | 700 | – | #00E6D4 | "MIGLIORARE I PROCESSI..." |

---

### 1.3 Bottoni & CTA

#### Bottone Primario (Main CTA)
```
Background: #00385A
Color: #FFFFFF
Border-radius: 25px (pillola)
Font: Aileron 15-18px, weight 700
Padding: 10px 20px
Border: nessuno
```
Utilizzo: "Contattaci", "VAI AL FORM", "Mettiti in contatto", "Inviaci il tuo CV"

#### Bottone Industry (Accent CTA)
```
Background: #FF3E6C
Color: #FFFFFF
Border-radius: 25px (pillola)
```
Utilizzo: esclusivo per il bottone "Industry" nella navbar secondaria

#### Bottone Outline (form/newsletter)
```
Background: rgba(0,0,0,0) — trasparente
Border: 1px solid #00385A o 1px solid #FFFFFF
Color: #00385A o #FFFFFF (a seconda del contesto)
Border-radius: 25px
```
Utilizzo: "Invia" newsletter footer, form submit

#### Link con freccia (→)
```
Color: #00E6D4
Dimensione: inline arrow icon
```
Utilizzo: card servizi, industry cards — unico elemento interattivo nelle card

---

### 1.4 Navbar / Header

**Struttura:** Doppia barra orizzontale

**Barra superiore (top nav):**
- Background: #FFFFFF
- Altezza: ~60px
- Contenuto: Logo (sinistra) | Menu testo (destra: Metodo, Azienda, CSR, Knowledge, Governance, Blog, Careers, Contattaci) | Selettore lingua (IE flag icon)
- Font: Aileron 14px Bold, #00385A

**Barra inferiore (service nav):**
- Background: #00385A
- Altezza: ~60px
- Contenuto: 4 voci testo bianco (Customer Service ▾, Back Office ▾, Process Management ▾, Outbound Marketing) + bottone pink "Industry ▾"
- Font: Aileron, #FFFFFF
- Dropdown: caret icon (▾) per voci con sottomenu

**Header complessivo:** 121px di altezza
**Sticky:** NO — position: relative (non segue lo scroll)

⚠️ **Problema UX critico:** La doppia navbar crea confusione gerarchica tra pagine aziendali e pagine di servizio, che sono sullo stesso piano visivo ma in barre fisicamente separate.

---

### 1.5 Footer

**Background:** #00385A (dark blue)
**Layout:** 5 colonne

| Colonna 1 | Colonna 2 | Colonna 3 | Colonna 4 | Colonna 5 |
|-----------|-----------|-----------|-----------|-----------|
| Logo bianco | Company | Insights | Services + Industries | Newsletter |
| Certificazioni (badge ISO, SOC, PCI) | Our story, Vision, Meet our team, Career | Blog, Knowledge base | Tutti servizi e sottopagine | Campo email + "Invia" |
| Contacts (email + indirizzo) | | | | |

**Social icons:** cerchi neri con icone bianche — Facebook, Instagram, LinkedIn (centrati)
**Legal bar:** Privacy Policy | Cookie Policy | Termini e condizioni d'uso (centrati, testo piccolo)
**H4 footer:** Aileron 21px, #00E6D4

---

## 2. COMPONENTI UI — CATALOGO

### 2.1 Hero Sections

**Homepage Hero (unica):**
```
Background: #00385A (full-width)
Layout: 2 colonne — immagine sinistra (55%) | testo destra (45%)
Font titolo: FabrikatMono — effetto typewriter
Testo: bianco (#FFFFFF)
Keyword accent: #00E6D4 (ciano) per "insieme" e "azienda."
CTA: ASSENTE nell'hero (problema UX)
Immagine: foto stock persone in riunione di lavoro
```

**Pagine Interne Hero (standard):**
```
Background: #FFFFFF (bianco)
Layout: 2 colonne — testo sinistra (50%) | immagine destra (50%)
Immagine: clip-path circolare/arrotondato
Badge: testo uppercase piccolo, #00E6D4, prima del titolo
H1: Aileron, ~48px, #00385A
Sottotitolo: Aileron 30px/400w, #00385A, grassetto su parole chiave
CTA: bottone "Contattaci" dark blue pillola
```

---

### 2.2 Logo Strip / Social Proof
```
Background: #FFFFFF
Layout: carousel orizzontale con frecce nav laterali
Brand: Fastweb, Trivago, UNICA, BricoBravo, Vodafone
Stile logo: colori originali del brand (non monocromatici)
H2: "Le aziende che ci hanno scelto" — bicolore (nero + ciano)
```

---

### 2.3 Service Cards (homepage)
```
Background card: #00385A (dark blue)
Testo: #FFFFFF
Titolo card: FabrikatMono (monospace)
Layout: griglia 2×2
Arrow link: #00E6D4 (→)
Hover: non rilevato con certezza
```

---

### 2.4 Industry Cards
```
Background: #FFFFFF con bordo leggero
Icona: illustrativa outline in #FF3E6C (rosa/corallo)
Titolo: FabrikatMono o Aileron monospace
Arrow: #00E6D4 (→)
Layout: griglia 4 colonne desktop
Padding: ~20px
```

---

### 2.5 Step Cards (Metodologia 3 step)
```
Background: #FFFFFF o #FAFAFA
Layout: 3 colonne
Numero: cerchio #FF3E6C con numero bianco al centro
Titolo step: Aileron H3 600w
Body: Aileron 18px 400w
```

---

### 2.6 Benefit Cards (homepage)
```
Background: #FFFFFF
Layout: 3 colonne orizzontali
Numero: testo grande bold in #FF3E6C o #00385A
Testo: breve descrizione inline
```

---

### 2.7 Case Study Block (Industry pages)
```
Layout: 2 colonne (descrizione | KPI)
Descrizione: Azienda + Sfida + Soluzione
KPI: numero grande bold + label piccola
Struttura KPI: 4 metriche in griglia 2x2 o 4x1
Colors: numeri in #00E6D4 o #FF3E6C
```

---

### 2.8 Form "Possiamo aiutarti?"
```
Background: #FFFFFF
Titolo H2: "Possiamo aiutarti?"
Sottotitolo: "Inserisci le informazioni richieste..."
CTA: bottone "VAI AL FORM" dark blue pillola → apre popup/overlay
Popup/Modal: form HubSpot integrato
```

---

### 2.9 Try & Buy Block
```
Background: #00385A (dark blue) o #FAFAFA
Titolo: "Approfitta della formula Try & Buy"
Body: "Prova il nostro servizio per 3 mesi prima di sceglierci come partner."
CTA: "Contattaci" (bianco su scuro, o dark blue su chiaro)
```

---

### 2.10 Tab Navigation (sub-servizi)
```
Layout: lista link orizzontale o verticale
Items: nomi sottopagine (Ticket Management, Digital Customer Care, ecc.)
Active/Hover: non definito chiaramente nel CSS
```

---

## 3. LAYOUT & GRID

| Parametro | Valore |
|-----------|--------|
| Max container width | 1280px |
| Sistema layout | CSS Grid / Flexbox (HubSpot theme) |
| Colonne principali | 2 colonne (50/50 o 60/40 tipico) |
| Padding sezioni verticale | ~60–80px |
| Gutter colonne | Standard HubSpot (~30px) |
| Mobile breakpoint | Standard HubSpot responsive |
| Full-width sections | Hero, logo strip, service bar, footer |

---

## 4. IMMAGINI & ICONOGRAFIA

### Immagini
- **Stile:** Foto stock professionali — persone in ufficio/riunione, lavoro in team
- **Qualità:** Buona risoluzione, ma poco distintive (generiche)
- **Forma:** Nelle pagine interne usano un clip-path arrotondato/ovale
- **Mancanza:** Nessuna foto del team reale di WE Are Fiber, nessuna foto degli uffici di Tirana

### Iconografia
- **Stile:** Outline/stroke icons — linee sottili
- **Colore dominante:** #FF3E6C (corallo/pink)
- **Utilizzo:** Industry cards, step numerati metodologia
- **Consistenza:** Discreta — alcune icone sono più illustrative, altre più simboliche

### Logo
- **Forma:** "U" stilizzata composta da due forme geometriche sovrapposte (ciano + magenta/pink)
- **Testo:** "we are fiber" lowercase, sans-serif leggero
- **Versioni:**
  - Light version: colori vivaci su sfondo bianco (header)
  - Dark version: tutto bianco su sfondo dark blue (footer)

---

## 5. ASPETTI UX — ANALISI CRITICA

### ✅ Punti di forza
- Palette cromatica coerente e memorabile (triade blu-ciano-corallo)
- Font Aileron è leggibile e moderno
- Utilizzo del ciano per highlight semantico nei titoli è efficace e differenziante
- FabrikatMono nell'hero crea carattere e personalità tech
- CTA con forma a pillola (border-radius 25px) coerente in tutto il sito
- Footer completo e ben organizzato (5 colonne con tutto il sito map)
- Badge "Try & Buy" come elemento di riduzione del rischio

### ❌ Problemi UX critici
1. **Doppia navbar** — due barre con logiche gerarchiche diverse creano confusione
2. **No sticky header** — dopo scroll il menu scompare, UX povera su pagine lunghe
3. **Hero senza CTA** — homepage non ha nessun bottone nel hero (drop in conversioni)
4. **No H1 homepage** — struttura headings completamente sbagliata
5. **Contenuto duplicato** — stesse sezioni (metodologia, logo strip, industry links, try & buy) ripetute identicamente in ogni pagina (12+ pagine)
6. **No breadcrumbs** — navigazione nelle pagine profonde difficoltosa
7. **Hover states non definiti** — cards e link non hanno feedback visivo chiaro
8. **Scroll eccessivo** — ogni pagina servizi è molto lunga (10 sezioni) con molto contenuto boilerplate

### ⚠️ Problemi UX importanti
9. **Icone Industry in rosa** — non coerenti con l'identità principale dark blue
10. **Badge "MIGLIORARE I PROCESSI AZIENDALI"** — stesso testo in ogni pagina servizi, perde impatto
11. **Nessun testimonial testuale** — solo logo strip, nessuna quote con nome/ruolo
12. **Form minimal** — solo 4 campi obbligatori, nessuna qualificazione lead
13. **No indicatori di progresso** — nelle pagine Industry il pulsante "CONTINUA" non spiega cosa succede dopo
14. **Social media nel footer** — visibilità molto bassa

---

## 6. RACCOMANDAZIONI PER IL REDESIGN

### Design System
- **Definire e documentare** una type scale completa con token CSS
- **Standardizzare** l'uso di FabrikatMono (solo decorativo/hero) vs Aileron (corpo)
- **Creare un component library** con: bottoni (3 varianti), cards (4 tipi), form, badge, modal
- **Aumentare il contrasto** per accessibilità WCAG AA (specialmente testi su sfondo #FAFAFA)
- **Definire hover states** chiari per tutti i componenti interattivi
- **Ridisegnare le icone Industry** — portarle in linea con il brand (dark blue o dual-color)

### Navigazione
- **Unificare la navbar** in una singola barra con mega-menu per Servizi e Industry
- **Rendere sticky** l'header con comportamento hide-on-scroll-down / show-on-scroll-up
- **Aggiungere breadcrumbs** nelle pagine di secondo e terzo livello (es. Customer Service > Help Desk)
- **Aggiungere un CTA primario nell'hero** della homepage (es. "Scopri i servizi" o "Richiedi un preventivo")

### Struttura Pagine
- **Ridurre il boilerplate** — creare sezioni comuni come componenti genuinamente personalizzati per settore
- **Aggiungere una sezione numeri/stats** nella homepage (clienti, agenti, anni, paesi)
- **Aggiungere testimonial testuali** con foto, nome, azienda, ruolo
- **Rendere le pagine Industry più verticali** e specializzate (eliminare la metodologia generica e sostituire con contenuti specifici del settore)
- **Evidenziare le certificazioni** nella homepage — non solo in una pagina nascosta

### Conversione
- **Migliorare il form lead** con campi aggiuntivi: settore, dimensione azienda, servizio di interesse
- **Aggiungere live chat** o widget chatbot per lead generation immediata
- **Aggiungere CTA secondaria** (es. "Scarica la brochure") per utenti non pronti a contattare
- **A/B test hero homepage** con CTA primaria

---

## 7. SCREENSHOT RIFERIMENTO

### Homepage — above the fold
- Navbar: doppia barra (bianca + dark blue)
- Hero: sfondo dark blue, testo FabrikatMono bianco, immagine a sinistra
- Prima sezione: "Le aziende che ci hanno scelto" + logo carousel

### Pagina Approccio (Metodo)
- Layout bicolonna hero: testo sinistra, immagine rotonda destra
- Badge ciano
- CTA dark blue pill

### Pagina Azienda (About)
- Hero con H1 "Il valore umano è Smart" — "Smart" in ciano
- Foto team di lavoro diversificato

---

*Fine Documento 2 — Analisi Visual & Design System*
*Versione: 1.0 | Preparato per redesign wearefiber.com*