// Dati generali del sito: cambiano qui e si aggiornano ovunque
export const SITO = {
  nome: "àlea",
  // nome con cui Google mostra il sito sopra il link nei risultati (dati strutturati WebSite)
  nomeRicerca: "Àlea",
  indirizzo: "https://alea.news",
  // titolo e descrizione della home nei risultati di ricerca e nelle anteprime
  titolo: "Àlea - Dati per raccontare storie interessanti in modi interessanti",
  descrizione: "Àlea raccoglie progetti di data journalism su cultura, politica, economia, società, scienza e ogni altro tema che abbia una bella storia da raccontare.",
  autore: "David Ruffini",
  // testo dell'about (home e fondo degli articoli): {autore} diventa il nome con il link a sitoAutore
  about: "àlea è un progetto di data journalism di {autore} per raccontare storie interessanti in modi interessanti, partendo dai dati.",
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
