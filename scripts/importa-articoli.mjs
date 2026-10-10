// Copia dentro il sito le pagine degli articoli, generate nei rispettivi progetti,
// così vengono pubblicate su alea.news/<cartella>/ insieme al resto.
// Durante la copia aggiunge: la testata per tornare ad àlea, la firma sotto il titolo (autore e data),
// il fondo di àlea (invito agli altri articoli, newsletter, about, contatti, social) e i meta tag per i social,
// presi da src/data/articoli.js (titolo, sommario, data), da src/config.js e da public/og/<cartella>.png.
// Uso: npm run articoli   (poi controllare con npm run dev e pubblicare con npm run deploy)
// Le copie in public/ fanno parte del repository: il sito si costruisce anche senza i progetti originali.
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { ARTICOLI as ELENCO } from "../src/data/articoli.js";
import { SITO } from "../src/config.js";

const ARTICOLI = [
  {
    cartella: "prova-a-fare-il-caso",
    sorgente: "../moneta",                          // pagina unica, senza file esterni
    pagina: "moneta.html",
    risorse: [],
  },
  {
    cartella: "litigi-tra-alleati",
    sorgente: "../discorsi_camera/applausi/viz",   // si rigenera con R/13_litigi.R nel progetto
    pagina: "litigi.html",
    risorse: ["foto", "loghi"],                     // cartelle usate dalla pagina con percorsi relativi
  },
];

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

// testata nera in cima alla pagina, con àlea al centro (si clicca per tornare alla home): non è fissa,
// così non si sovrappone a eventuali elementi "sticky" dell'articolo
const TESTATA = `
<header class="alea-testa"><a class="alea-logo" href="/">àlea</a></header>`;

// tutto lo stile aggiunto, con prefisso alea- per non toccare quello dell'articolo
const STILE = `
<link href="https://api.fontshare.com/v2/css?f[]=general-sans@400,600,700&display=swap" rel="stylesheet">
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400;600&display=swap" rel="stylesheet">
<style>
  .alea-testa { display: flex; justify-content: center; background: #000; padding: 14px 16px 12px; position: relative; z-index: 30; }
  .alea-logo { font-family: "General Sans", system-ui, sans-serif; font-weight: 700; font-size: 52px; letter-spacing: -0.07em; line-height: .9; color: #f2f0ea; text-decoration: none; }
  .alea-logo:hover { color: #d4ff3a; }
  .alea-firma { font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: .85rem; letter-spacing: .02em; color: #898781; margin: -12px 0 24px; }
  .alea-firma a { color: inherit; text-decoration: underline; text-underline-offset: 3px; }
  .alea-firma a:hover { color: #eb6834; }

  .alea-fondo { background: #000; color: #f2f0ea; font-family: "General Sans", system-ui, sans-serif; padding: 0 16px 64px; }
  .alea-fondo * { box-sizing: border-box; }
  .alea-fondo a { color: inherit; text-decoration: none; }
  .alea-fondo-in { max-width: 1280px; margin: 0 auto; border-top: 1px solid #2a2a28; }
  .alea-invito { display: block; padding: 72px 0 56px; font-weight: 400; font-size: clamp(2.4rem, 6vw, 5rem); line-height: 1; letter-spacing: -0.035em; max-width: 18ch; }
  .alea-invito b { font-weight: 700; letter-spacing: -0.07em; }
  .alea-invito:hover, .alea-invito:hover b { color: #d4ff3a; }
  .alea-altri { display: grid; grid-template-columns: repeat(3, 1fr); gap: 32px 20px; margin: -16px 0 48px; }
  .alea-altri a { display: flex; flex-direction: column; gap: 8px; }
  .alea-altri .t { font-size: 1.5rem; line-height: 1.08; letter-spacing: -0.03em; }
  .alea-altri .s { color: #8b8880; line-height: 1.45; }
  .alea-altri a:hover .t { color: #d4ff3a; }
  .alea-barra { background: #d4ff3a; color: #000; padding: 12px 16px; font-weight: 600; font-size: .95rem; }
  .alea-nl { display: grid; grid-template-columns: 1fr 1fr; gap: 28px; align-items: end; padding: 24px 0 8px; }
  .alea-nl h3 { font-weight: 400; font-size: clamp(1.8rem, 3.5vw, 2.8rem); line-height: 1.05; letter-spacing: -0.03em; margin: 0; }
  .alea-nl p { color: #8b8880; margin: 10px 0 0; }
  .alea-iscr { display: flex; max-width: 460px; width: 100%; }
  .alea-iscr input { flex: 1; min-width: 0; font: inherit; background: transparent; color: #f2f0ea; border: 1px solid #f2f0ea; border-right: 0; border-radius: 0; padding: 12px 14px; }
  .alea-iscr button { font: inherit; font-weight: 600; background: #d4ff3a; color: #000; border: 1px solid #d4ff3a; border-radius: 0; padding: 12px 20px; cursor: pointer; }
  .alea-iscr button:hover { background: #f2f0ea; border-color: #f2f0ea; }
  .alea-piede { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 28px; border-top: 1px solid #2a2a28; margin-top: 64px; padding-top: 28px; }
  .alea-piede h4 { font-family: "IBM Plex Mono", ui-monospace, monospace; font-weight: 600; font-size: .72rem; letter-spacing: .08em; text-transform: uppercase; color: #8b8880; margin: 0 0 12px; }
  .alea-piede p { margin: 0; line-height: 1.5; color: #cfccc4; max-width: 46ch; }
  .alea-piede p a { text-decoration: underline; text-underline-offset: 3px; }
  .alea-col { display: flex; flex-direction: column; gap: 8px; }
  .alea-col a { font-family: "IBM Plex Mono", ui-monospace, monospace; font-size: .78rem; letter-spacing: .06em; text-transform: uppercase; }
  .alea-col a:hover { color: #d4ff3a; }
  @media (max-width: 860px) { .alea-nl, .alea-piede, .alea-altri { grid-template-columns: 1fr; } }
</style>`;

const dataIt = (d) => new Date(d + "T12:00:00").toLocaleDateString("it-IT", { day: "numeric", month: "long", year: "numeric" });

// firma sotto il titolo: "di David Ruffini · 6 ottobre 2026"
const firma = (info) => `
<p class="alea-firma">di <a href="${SITO.sitoAutore}" target="_blank" rel="noopener">${esc(SITO.autore)}</a>${info.data ? ` · ${dataIt(info.data)}` : ""}</p>`;

// fondo di àlea, come in fondo alla home (src/components/Fondo.astro), più l'invito agli altri articoli
function fondo(info) {
  const altri = ELENCO.filter((x) => !x.bozza && x.url && x.url !== info.url).slice(0, 3);
  const [prima, dopo] = SITO.about.split("{autore}");
  const azione = SITO.substack ? `${SITO.substack.replace(/\/$/, "")}/subscribe` : null;
  const social = SITO.social.filter((x) => x.url);
  return `
<section class="alea-fondo" data-nosnippet>
  <div class="alea-fondo-in">
    <a class="alea-invito" href="/">Questo è un progetto di <b>àlea</b>, dai un'occhiata anche agli altri →</a>
    ${altri.length ? `<div class="alea-altri">${altri.map((x) => `<a href="${x.url}"><span class="t">${esc(x.titolo)}</span><span class="s">${esc(x.sommario)}</span></a>`).join("")}</div>` : ""}
    <div class="alea-barra">newsletter ↓</div>
    <div class="alea-nl">
      <div>
        <h3>Un'email quando esce un nuovo articolo.</h3>
        <p>Niente spam, niente cadenza fissa: solo quando c'è qualcosa da leggere.</p>
      </div>
      <form class="alea-iscr"${azione ? ` action="${azione}"` : ` onsubmit="return false"`} method="get" target="_blank">
        <input type="email" name="email" placeholder="la tua email" aria-label="email" required>
        <button>iscriviti</button>
      </form>
    </div>
    <footer class="alea-piede">
      <div><h4>about</h4><p>${esc(prima)}<a href="${SITO.sitoAutore}" target="_blank" rel="noopener">${esc(SITO.autore)}</a>${esc(dopo)}</p></div>
      <div class="alea-col"><h4>contatti</h4><a href="mailto:${SITO.email}">${SITO.email}</a></div>
      ${social.length ? `<div class="alea-col"><h4>social</h4>${social.map((x) => `<a href="${x.url}" target="_blank" rel="noopener">${x.nome} ↗</a>`).join("")}</div>` : ""}
    </footer>
  </div>
</section>`;
}

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
  // sostituisce il primo tag che corrisponde a "tag", saltando i commenti <!-- ... -->:
  // una pagina può nominare <body> o <h1> nelle note iniziali, e lì non va inserito niente
  const inserisci = (tag, fn) => {
    let fatto = false;
    html = html.replace(new RegExp(`<!--[\\s\\S]*?-->|${tag.source}`, "gi"), (m, ...g) => {
      if (fatto || m.startsWith("<!--")) return m;
      fatto = true;
      return fn(m, ...g);
    });
    return fatto;
  };
  html = html.replace(/<title>[\s\S]*?<\/title>\s*/i, "");                    // il titolo lo riscrive metaTag
  if (!inserisci(/<\/head>/, () => `${metaTag(info, a.cartella)}${STILE}\n</head>`)) throw new Error(`${a.cartella}: pagina senza </head>`);
  if (!inserisci(/<body([^>]*)>/, (m) => `${m}${TESTATA}`)) throw new Error(`${a.cartella}: pagina senza <body>`);
  if (!inserisci(/<\/h1>/, () => `</h1>${firma(info)}`)) throw new Error(`${a.cartella}: niente <h1>, non so dove mettere la firma`);   // sotto il primo titolo
  if (!inserisci(/<\/body>/, () => `${fondo(info)}\n</body>`)) throw new Error(`${a.cartella}: pagina senza </body>`);
  writeFileSync(`${dest}/index.html`, html);
  console.log(`✓ ${a.cartella}`);
}
