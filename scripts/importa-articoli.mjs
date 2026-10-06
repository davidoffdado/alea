// Copia dentro il sito le pagine degli articoli, generate nei rispettivi progetti,
// così vengono pubblicate su alea.news/<cartella>/ insieme al resto.
// Uso: npm run articoli   (poi controllare con npm run dev e pubblicare con npm run deploy)
// Le copie in public/ fanno parte del repository: il sito si costruisce anche senza i progetti originali.
import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";

const ARTICOLI = [
  {
    cartella: "litigi-tra-alleati",
    sorgente: "../discorsi_camera/applausi/viz",   // si rigenera con R/13_litigi.R nel progetto
    pagina: "litigi.html",
    risorse: ["foto", "loghi"],                     // cartelle usate dalla pagina con percorsi relativi
  },
];

for (const a of ARTICOLI) {
  if (!existsSync(`${a.sorgente}/${a.pagina}`)) {
    console.warn(`! ${a.cartella}: non trovo ${a.sorgente}/${a.pagina}, lascio la copia che c'è`);
    continue;
  }
  const dest = `public/${a.cartella}`;
  rmSync(dest, { recursive: true, force: true });
  mkdirSync(dest, { recursive: true });
  cpSync(`${a.sorgente}/${a.pagina}`, `${dest}/index.html`);
  for (const r of a.risorse) cpSync(`${a.sorgente}/${r}`, `${dest}/${r}`, { recursive: true });
  console.log(`✓ ${a.cartella}`);
}
