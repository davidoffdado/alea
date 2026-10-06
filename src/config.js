// Dati generali del sito: cambiano qui e si aggiornano ovunque
export const SITO = {
  nome: "àlea",
  descrizione: "Storie con i dati, per curiosità: domande serie e meno serie, con dati aperti e codice pubblico.",
  autore: "David Ruffini",
  sitoAutore: "https://www.davidruffini.com",
  email: "ciao@alea.news",
  // indirizzo della newsletter su Substack (es. "https://nome.substack.com"); vuoto finché non è deciso
  substack: "https://aalea.substack.com",
  // i social senza indirizzo non vengono mostrati
  social: [
    { nome: "instagram", url: "" },
    { nome: "linkedin", url: "" },
  ],
};

export const socialAttivi = () => SITO.social.filter((s) => s.url);

// percorso di un file in public/, tenendo conto della base del sito (vedi astro.config.mjs)
export const url = (percorso) => import.meta.env.BASE_URL.replace(/\/$/, "") + "/" + percorso.replace(/^\//, "");
