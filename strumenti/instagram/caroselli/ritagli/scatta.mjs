// Fotografa tutti i ritagli di elenco.js per ogni tema: ritagli/<tema>/<nome>.png (500×1000 px CSS, densità 2).
// Prima crea le copie ricolorate degli articoli (temizza.mjs). Uso (dentro caroselli/):
//   node ritagli/scatta.mjs                     tutti i temi e tutti i ritagli
//   node ritagli/scatta.mjs nero-lime m_cifre   solo un tema e/o un ritaglio
import { execFileSync } from "node:child_process";
import { mkdirSync, existsSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { createRequire } from "node:module";

const qui = dirname(fileURLToPath(import.meta.url));
const ELENCO = createRequire(import.meta.url)("./elenco.js");
execFileSync("node", [resolve(qui, "temizza.mjs")]);
const EDGE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
const FONDO = { nero: "#0d0d0d", bianco: "#ffffff" };
const [soloTema, soloNome] = process.argv.slice(2);
const temi = soloTema ? [soloTema] : ["nero-lime", "nero-bianco", "bianco-lime", "bianco-nero"];

for (const t of temi) {
  mkdirSync(resolve(qui, t), { recursive: true });
  for (const [nome, r] of Object.entries(ELENCO)) {
    if (soloNome && nome !== soloNome) continue;
    const pagina = pathToFileURL(resolve(qui, "pagine", t)).href + "/" + r.pag;
    const par = new URLSearchParams({ p: pagina, sel: r.sel, fondo: FONDO[t.split("-")[0]] });
    if (r.testo) par.set("testo", r.testo);
    if (r.fino) par.set("fino", r.fino);
    if (r.frase) par.set("frase", r.frase);
    // l'emiciclo dei litigi resta fisso in alto e coprirebbe il pezzo: si nasconde, tranne quando è lui il ritaglio
    if (r.pag.startsWith("litigi") && r.sel !== "#aula") par.set("nascondi", ".aula");
    execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--allow-file-access-from-files", "--disable-web-security",
      `--user-data-dir=${process.env.TEMP}/edge-caroselli`, "--force-device-scale-factor=2", "--virtual-time-budget=" + (r.pag.includes("prova") ? 15000 : 8000),
      "--window-size=500,1000", `--screenshot=${resolve(qui, t, nome + ".png")}`, pathToFileURL(resolve(qui, "scatta.html")).href + "?" + par], { stdio: "ignore" });
  }
  console.log("✓ " + t);
}
