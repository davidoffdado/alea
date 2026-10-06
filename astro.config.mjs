import { defineConfig } from "astro/config";

// Indirizzo del sito pubblicato. Da aggiornare quando il repository GitHub (e poi il dominio) è deciso:
// - repository "<nome>.github.io" o dominio proprio: base "/"
// - qualsiasi altro repository: base "/<nome-repository>"
export default defineConfig({
  site: "https://davidoffdado.github.io",
  base: "/alea",
});
