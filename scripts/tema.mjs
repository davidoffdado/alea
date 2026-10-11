// TEMA DEGLI ARTICOLI DI ÀLEA (scelto il 2026-10-11): fondo bianco, evidenziatore lime, dati in nero.
// Stessi caratteri per tutti gli articoli: General Sans per i titoli, Noto Sans per il testo,
// IBM Plex Mono per etichette e numeri. Lo aggiunge importa-articoli.mjs in fondo all'<head> di ogni articolo:
// le pagine originali nei progetti non cambiano. !important perché le pagine definiscono i loro colori;
// i selettori :root:not(...) e :root[data-theme] servono a battere anche il tema scuro automatico della pagina.
const T = {
  fondo: "#ffffff", testo: "#111111", testo2: "#5e5d58", linea: "#e0e0db", tenue: "#f2f2ef",
  resto: "#b4b4af",   // il resto della maggioranza, le barre "normali" dei grafici
  opp: "#e8e8e4",     // opposizione, elementi spenti
  ev: "#d4ff3a",      // evidenziatore (testo nero sopra)
  dato: "#000000",    // il colore dei dati in evidenza (partiti in lite, il lettore): il lime sottile sul bianco non si vede
};
const RADICE = `:root, :root:not([data-theme="light"]), :root[data-theme]`;
const TITOLI = `font-family: "General Sans", sans-serif !important; font-weight: 600 !important; letter-spacing: -.04em !important;`;

export const FONT_TEMA = `
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">`;

export const CSS_TEMA = {
  "litigi-tra-alleati": `
  ${RADICE} { color-scheme: light !important; --surface: ${T.fondo} !important; --page: ${T.fondo} !important; --ink: ${T.testo} !important;
    --ink-2: ${T.testo2} !important; --grid: ${T.linea} !important; --band-a: ${T.tenue} !important; --band-b: ${T.fondo} !important;
    --border: rgba(0,0,0,.12) !important; --ost: ${T.dato} !important; --ost-soft: ${T.dato}66 !important;
    --magg: ${T.resto} !important; --opp: ${T.opp} !important; }
  body { background: ${T.fondo} !important; font-family: "Noto Sans", sans-serif !important; }
  h1, .scena h2, .metodo h2 { ${TITOLI} }
  .fumetto q { font-family: "Noto Sans", sans-serif !important; font-weight: 500 !important; }
  .chip.lite, .reazione .fumetto { color: #fff !important; }
  mark.pennarello { background: ${T.ev} !important; color: #000 !important; }`,
  "prova-a-fare-il-caso": `
  ${RADICE} { color-scheme: light !important; --fondo: ${T.fondo} !important; --testo: ${T.testo} !important; --testo-2: ${T.testo2} !important;
    --linea: ${T.linea} !important; --fondo-fonti: ${T.tenue} !important; --accento: ${T.testo} !important; --macchina: ${T.resto} !important;
    --macchina-soft: ${T.resto}40 !important; --tu: ${T.dato} !important; --tu-testo: ${T.testo} !important;
    --font: "Noto Sans", sans-serif !important; }
  body { background: ${T.fondo} !important; }
  h1 { ${TITOLI} text-transform: none !important; }
  .cifre, .griglia, .cella, table, .stato, .barra-titolo, kbd, .asse text, .segno text, .leg { font-family: "IBM Plex Mono", monospace !important; }
  .tu { background: ${T.ev}; color: #000 !important; padding: 0 .15em; }
  td.tu { background: none; color: ${T.testo} !important; }
  .confronto .cella.serie-tu { color: #fff !important; }
  .g-caso .cella { color: ${T.testo2} !important; }                                  /* le lettere della moneta vera: --macchina qui è troppo chiaro */
  .confronto .cella.serie-caso { background: ${T.testo2} !important; color: #fff !important; }`,
};

// testi che parlano dei vecchi colori e vanno aggiornati: [cerca, sostituisci]
export const TESTI_TEMA = {
  "prova-a-fare-il-caso": [["la linea rossa", "la linea nera"]],
};
