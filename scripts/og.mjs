// Genera le immagini di anteprima per i social (public/og/*.png) dalle pagine in scripts/og/,
// fotografandole con Edge in modalità headless. Uso: npm run og
import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const EDGE = ["C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe", "C:/Program Files/Microsoft/Edge/Application/msedge.exe"].find(existsSync);
if (!EDGE) throw new Error("Edge non trovato");
mkdirSync("public/og", { recursive: true });

for (const f of readdirSync("scripts/og").filter((f) => f.endsWith(".html"))) {
  const out = resolve("public/og", f.replace(/\.html$/, ".png"));
  execFileSync(EDGE, ["--headless=new", "--disable-gpu", "--hide-scrollbars", "--virtual-time-budget=8000",
    "--window-size=1200,630", `--screenshot=${out}`, pathToFileURL(resolve("scripts/og", f)).href], { stdio: "ignore" });
  console.log(`✓ public/og/${f.replace(/\.html$/, ".png")}`);
}
