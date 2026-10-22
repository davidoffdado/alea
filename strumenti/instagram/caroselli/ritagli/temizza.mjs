// Crea le copie ricolorate degli articoli, una per tema: pagine/<tema>/litigi.html e moneta.html.
// Ogni copia è la pagina vera con, in fondo all'<head>, i caratteri e il CSS del tema (../temi.js) e un <base>
// che punta alla cartella originale (così foto, loghi e dati si caricano come prima). Le pagine vere non cambiano.
// Uso (dentro caroselli/):  node ritagli/temizza.mjs
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import vm from "node:vm";

const qui = dirname(fileURLToPath(import.meta.url));
const temi = {}; vm.createContext(temi);
vm.runInContext(readFileSync(resolve(qui, "../temi.js"), "utf8") + ";this.T={COMBO,cssSito,FONT_TEMA};", temi);
const { COMBO, cssSito, FONT_TEMA } = temi.T;
const SITO = resolve(qui, "../../../../public");   // Desktop/alea/public
const ARTICOLI = { litigi: "litigi-tra-alleati", moneta: "simulazione-casualita" };

for (const [fondo, ev] of COMBO) {
  const cartella = resolve(qui, "pagine", `${fondo}-${ev}`);
  mkdirSync(cartella, { recursive: true });
  for (const [nome, dir] of Object.entries(ARTICOLI)) {
    const html = readFileSync(resolve(SITO, dir, "index.html"), "utf8");
    const base = pathToFileURL(resolve(SITO, dir)).href + "/";
    const extra = `${FONT_TEMA}\n<style id="tema">${cssSito(nome, fondo, ev)}</style>\n`;
    writeFileSync(resolve(cartella, nome + ".html"), html.replace("<head>", "<head>\n" + `<base href="${base}">`).replace("</head>", extra + "</head>"));
  }
  console.log(`✓ ${fondo}-${ev}`);
}
