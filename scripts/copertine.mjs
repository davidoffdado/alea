// Genera le copertine degli articoli (public/img/copertine/<nome>-o.png e <nome>-v.png) dalle pagine in scripts/copertine/,
// fotografandole con Edge in modalità headless, come scripts/og.mjs.
//   -o orizzontale 1600x1000: l'ultimo articolo, in apertura
//   -v verticale 1200x1500: le "figurine" nella griglia degli altri articoli
// Uso: npm run copertine
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const EDGE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!EDGE) throw new Error("Edge non trovato");
mkdirSync("public/img/copertine", { recursive: true });

const FORMATI = { o: [1600, 1000], v: [1200, 1500] };
for (const f of readdirSync("scripts/copertine").filter((f) => f.endsWith(".html"))) {
  for (const [formato, [w, h]] of Object.entries(FORMATI)) {
    const nome = `${f.replace(/\.html$/, "")}-${formato}.png`;
    execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--force-device-scale-factor=1", "--virtual-time-budget=10000",
      "--allow-file-access-from-files", `--window-size=${w},${h}`, `--screenshot=${resolve("public/img/copertine", nome)}`,
      pathToFileURL(resolve("scripts/copertine", f)).href + `?f=${formato}`], { stdio: "ignore" });
    console.log(`✓ public/img/copertine/${nome}`);
  }
}
