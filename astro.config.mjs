import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
import { ARTICOLI } from "./src/data/articoli.js";

// Il sito è pubblicato su alea.news (dominio proprio, quindi base "/").
// public/CNAME dice a GitHub Pages quale dominio usare e viene ricopiato a ogni deploy.
// sitemap: a ogni build scrive sitemap-index.xml (da segnalare una volta sola in Google Search Console;
// public/robots.txt la indica ai motori di ricerca). Gli articoli sono pagine statiche in public/,
// che l'integrazione non vede da sola: li aggiunge leggendo src/data/articoli.js, bozze escluse.
const SITO = "https://alea.news";
export default defineConfig({
  site: SITO,
  base: "/",
  integrations: [sitemap({ customPages: ARTICOLI.filter((a) => !a.bozza && a.url).map((a) => SITO + a.url) })],
});
