// TEMI DI ÀLEA, "stile 3": stessi caratteri per tutti gli articoli (General Sans per i titoli, Noto Sans per il testo,
// Noto Sans piccolo e grigio anche per etichette e numeri, niente monospazio dal 2026-10-21), fondo bianco o nero, un solo colore d'accento.
// Un tema = fondo + evidenziatore: nero-lime, nero-bianco, bianco-lime, bianco-nero.
// Usato da ritagli/temizza.mjs (copie ricolorate degli articoli da fotografare) e da carosello.html.
// Le pagine vere degli articoli NON vengono modificate.

const FONDI = {
  // resto = il resto della maggioranza nell'emiciclo e le barre "normali" dei grafici; opp = opposizione, elementi spenti
  nero:   { fondo: "#0d0d0d", testo: "#f2f2f0", testo2: "#a9a8a2", linea: "#33332f", tenue: "#1a1a18", resto: "#6e6e69", opp: "#2e2e2b" },
  bianco: { fondo: "#ffffff", testo: "#111111", testo2: "#5e5d58", linea: "#e0e0db", tenue: "#f2f2ef", resto: "#b4b4af", opp: "#e8e8e4" },
};
// colore dell'evidenziatore e colore del testo che ci va sopra
const EVID = {
  lime:   { ev: "#d4ff3a", su: "#000" },
  bianco: { ev: "#ffffff", su: "#000" },
  nero:   { ev: "#000000", su: "#fff" },
};
const COMBO = [["nero", "lime"], ["nero", "bianco"], ["bianco", "lime"], ["bianco", "nero"]];
const evid = (fondo, e) => EVID[e];
// colore dei DATI (partiti in lite, barra del lettore): sul nero è l'evidenziatore, sul bianco è il nero
// (il lime come colore di un segno sottile sul bianco non si vede)
const accento = (fondo, e) => fondo === "nero" ? { a: EVID[e].ev, su: "#000" } : { a: "#000", su: "#fff" };

const FONT_TEMA = `
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@500,600&display=block" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;500;600&display=block" rel="stylesheet">`;

// CSS da aggiungere a ciascun articolo (con !important perché arriva prima dei fogli di stile della pagina)
function cssSito(articolo, fondo, e) {
  const F = FONDI[fondo], E = evid(fondo, e), A = accento(fondo, e);
  const titoli = `font-family: "General Sans", sans-serif !important; font-weight: 600 !important; letter-spacing: -.04em !important;`;
  if (articolo === "litigi") return `
    :root, :root[data-theme] { --surface: ${F.fondo} !important; --page: ${F.fondo} !important; --ink: ${F.testo} !important; --ink-2: ${F.testo2} !important;
      --grid: ${F.linea} !important; --band-a: ${F.tenue} !important; --band-b: ${F.fondo} !important;
      --border: ${fondo === "nero" ? "rgba(255,255,255,.14)" : "rgba(0,0,0,.12)"} !important;
      --ost: ${A.a} !important; --ost-soft: ${A.a}66 !important; --magg: ${F.resto} !important; --opp: ${F.opp} !important; }
    body { background: ${F.fondo} !important; font-family: "Noto Sans", sans-serif !important; }
    h1, .scena h2, .metodo h2 { ${titoli} }
    .fumetto q { font-family: "Noto Sans", sans-serif !important; font-weight: 500 !important; }
    .chip.lite, .reazione .fumetto { color: ${A.su} !important; }
    mark.pennarello { background: ${E.ev} !important; color: ${E.su} !important; }
    .metodo h3, .scena .data, .fumetto .sten { font-family: "Noto Sans", sans-serif !important; letter-spacing: 0 !important; text-transform: none !important; }
    .metodo h3, .scena .data { font-size: .85rem !important; }
    .fumetto .sten { font-size: .78rem !important; }
    .fumetto .reaz { font-family: "Noto Sans", sans-serif !important; }`;
  return `
    :root { --fondo: ${F.fondo} !important; --testo: ${F.testo} !important; --testo-2: ${F.testo2} !important; --linea: ${F.linea} !important;
      --fondo-fonti: ${F.tenue} !important; --accento: ${F.testo} !important; --macchina: ${F.resto} !important;
      --macchina-soft: ${F.resto}40 !important; --tu: ${A.a} !important; --tu-testo: ${F.testo} !important;
      --font: "Noto Sans", sans-serif !important; }
    body { background: ${F.fondo} !important; }
    h1 { ${titoli} text-transform: none !important; }
    .cifre, .griglia, .cella, table, .stato, .asse text, .segno text, .leg { font-variant-numeric: tabular-nums; }
    .barra-titolo { font-size: .85rem !important; font-weight: 600 !important; letter-spacing: 0 !important; text-transform: none !important; }
    .tasti button { text-transform: none !important; letter-spacing: 0 !important; }
    .tu { background: ${E.ev}; color: ${E.su} !important; padding: 0 .15em; }
    td.tu { background: none; color: ${F.testo} !important; }
    .confronto .cella.serie-tu { color: ${A.su} !important; }`;
}
