import { defineConfig } from "astro/config";

// Il sito è pubblicato su alea.news (dominio proprio, quindi base "/").
// public/CNAME dice a GitHub Pages quale dominio usare e viene ricopiato a ogni deploy.
export default defineConfig({
  site: "https://alea.news",
  base: "/",
});
