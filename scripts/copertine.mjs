// Genera le copertine degli articoli (public/img/copertine/<nome>.png, 4:5) ritagliando una schermata dell'articolo
// visto da telefono (scripts/copertine/schermate/<nome>.png, scattata con scripts/copertine/telefono.html). Il ritaglio lo fa scripts/copertine/ritaglio.html,
// fotografato con Edge in modalità headless a densità 2 (780x976 px).
// La cornice colorata non è nell'immagine: la aggiunge src/components/Copertina.astro, con il colore di src/data/articoli.js.
//
// Per un articolo nuovo: scattare la schermata con scripts/copertine/prove/scatta.html (vedi il commento lì),
// salvarla in schermate/, aggiungere una riga qui sotto con l'altezza del ritaglio (y, in px del telefono largo 390).
// Uso: npm run copertine
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const COPERTINE = [
  { nome: "litigi", y: 305 },    // la scena di Cè (governo Berlusconi II): titolo, alleati e dialogo
  { nome: "moneta", y: 2850 },   // la serie più lunga: testo e grafico, con il lettore in nero
  { nome: "infinite-jest", y: 0 },  // la rete al passo di Joelle (pagina con ?ig=rete-joelle, telefono alto 488)
];

const EDGE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!EDGE) throw new Error("Edge non trovato");
mkdirSync("public/img/copertine", { recursive: true });

for (const { nome, y } of COPERTINE) {
  execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=2", "--virtual-time-budget=4000",
    "--allow-file-access-from-files", "--window-size=390,488", `--screenshot=${resolve("public/img/copertine", nome + ".png")}`,
    pathToFileURL(resolve("scripts/copertine/ritaglio.html")).href + `?s=${nome}.png&y=${y}`], { stdio: "ignore" });
  console.log(`✓ public/img/copertine/${nome}.png`);
}
