// Copia dentro il sito le pagine degli articoli, generate nei rispettivi progetti,
// così vengono pubblicate su alea.news/<cartella>/ insieme al resto.
// Durante la copia aggiunge la testata per tornare ad àlea e i meta tag per i social,
// presi da src/data/articoli.js (titolo, sommario, data) e da public/og/<cartella>.png.
// Uso: npm run articoli   (poi controllare con npm run dev e pubblicare con npm run deploy)
// Le copie in public/ fanno parte del repository: il sito si costruisce anche senza i progetti originali.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { ARTICOLI as ELENCO } from "../src/data/articoli.js";
import { SITO } from "../src/config.js";

const ARTICOLI = [
  {
    cartella: "litigi-tra-alleati",
    sorgente: "../discorsi_camera/applausi/viz",   // si rigenera con R/13_litigi.R nel progetto
    pagina: "litigi.html",
    risorse: ["foto", "loghi"],                     // cartelle usate dalla pagina con percorsi relativi
  },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// testata nera in cima alla pagina: non è fissa, così non si sovrappone a eventuali elementi "sticky" dell'articolo
const TESTATA = `
<header class="alea-testa">
  <a class="alea-logo" href="/">àlea</a>
  <a class="alea-torna" href="/">← tutti gli articoli</a>
</header>`;
const STILE_TESTATA = `
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@700&display=swap" rel="stylesheet">
<style>
  .alea-testa { display: flex; justify-content: space-between; align-items: center; gap: 16px; background: #000; padding: 10px 16px; position: relative; z-index: 30; }
  .alea-testa a { color: #f2f0ea; text-decoration: none; }
  .alea-logo { font-family: "General Sans", system-ui, sans-serif; font-weight: 700; font-size: 28px; letter-spacing: -0.07em; line-height: 1; }
  .alea-torna { font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: 12px; letter-spacing: .06em; text-transform: uppercase; }
  .alea-testa a:hover { color: #d4ff3a; }
</style>`;

function metaTag(info, cartella) {
  const indirizzo = `${SITO.indirizzo}/${cartella}/`;
  const titolo = `${info.titolo} · ${SITO.nome}`;
  const immagine = existsSync(`public/og/${cartella}.png`) ? `${SITO.indirizzo}/og/${cartella}.png` : `${SITO.indirizzo}/og/alea.png`;
  return `
<meta name="description" content="${esc(info.sommario)}">
<link rel="canonical" href="${indirizzo}">
<meta property="og:type" content="article">
<meta property="og:site_name" content="${esc(SITO.nome)}">
<meta property="og:title" content="${esc(info.titolo)}">
<meta property="og:description" content="${esc(info.sommario)}">
<meta property="og:url" content="${indirizzo}">
<meta property="og:image" content="${immagine}">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:locale" content="it_IT">
${info.data ? `<meta property="article:published_time" content="${info.data}">` : ""}
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(info.titolo)}">
<meta name="twitter:description" content="${esc(info.sommario)}">
<meta name="twitter:image" content="${immagine}">
<link rel="icon" href="/favicon.svg" type="image/svg+xml">
<title>${esc(titolo)}</title>`;
}

for (const a of ARTICOLI) {
  if (!existsSync(`${a.sorgente}/${a.pagina}`)) {
    console.warn(`! ${a.cartella}: non trovo ${a.sorgente}/${a.pagina}, lascio la copia che c'è`);
    continue;
  }
  const info = ELENCO.find((x) => x.url === `/${a.cartella}/`);
  if (!info) throw new Error(`${a.cartella}: manca in src/data/articoli.js (url "/${a.cartella}/")`);

  const dest = `public/${a.cartella}`;
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  for (const r of a.risorse) cpSync(`${a.sorgente}/${r}`, `${dest}/${r}`, { recursive: true });

  let html = readFileSync(`${a.sorgente}/${a.pagina}`, "utf8");
  if (!/<\/head>/i.test(html) || !/<body[^>]*>/i.test(html)) throw new Error(`${a.cartella}: pagina senza <head> o <body>`);
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, "");                    // il titolo lo riscrive metaTag
  html = html.replace(/<\/head>/i, `${metaTag(info, a.cartella)}${STILE_TESTATA}\n</head>`);
  html = html.replace(/<body([^>]*)>/i, `<body$1>${TESTATA}`);
  writeFileSync(`${dest}/index.html`, html);
  console.log(`✓ ${a.cartella}`);
}
