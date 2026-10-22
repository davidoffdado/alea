// Genera le immagini di anteprima per i social (public/og/*.png), fotografando con Edge in modalità headless:
// - la home da scripts/og/alea.html
// - ogni articolo pubblicato dal modello scripts/og/articolo.html, con titolo, numero e copertina presi da src/data/articoli.js
//   (public/og/<cartella>.png, dove <cartella> è l'url dell'articolo)
// Uso: npm run og (lo fa anche npm run deploy)
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { ARTICOLI } from "../src/data/articoli.js";

const EDGE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!EDGE) throw new Error("Edge non trovato");
mkdirSync("public/og", { recursive: true });

const foto = (pagina, nome) => {
  execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=8000", "--allow-file-access-from-files",
    "--window-size=1200,630", `--screenshot=${resolve("public/og", nome + ".png")}`, pathToFileURL(resolve(pagina)).href], { stdio: "ignore" });
  console.log(`✓ public/og/${nome}.png`);
};

foto("scripts/og/alea.html", "alea");

const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;");
const modello = readFileSync("scripts/og/articolo.html", "utf8");
for (const a of ARTICOLI.filter((a) => !a.bozza && a.url?.startsWith("/") && typeof a.copertina === "string")) {
  const cartella = a.url.replace(/^\/|\/$/g, "");
  const temp = `scripts/og/_${cartella}.html`;   // accanto al modello, così il percorso della copertina è lo stesso
  writeFileSync(temp, modello
    .replace("{{copertina}}", `../../public/img/copertine/${a.copertina}`)
    .replace("{{colore}}", a.colore || "#d4ff3a")
    .replace("{{numero}}", String(a.numero).padStart(2, "0"))
    .replace("{{titolo}}", esc(a.titolo)));
  try { foto(temp, cartella); } finally { rmSync(temp); }
}
