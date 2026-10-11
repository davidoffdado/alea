// RITAGLI DEI CAROSELLI: ognuno è un pezzo dell'articolo trovato con un selettore CSS, non con coordinate fisse,
// così resta giusto con qualunque tema (i caratteri cambiano l'altezza della pagina).
//   pag   = articolo e parametri (litigi?statico mostra tutta la pagina senza animazioni, &solo=N una scena sola)
//   sel   = primo elemento; testo = (facoltativo) deve contenere questo testo; fino = (facoltativo) ultimo elemento
//   frase = "inizio|fine": del paragrafo si tiene solo il testo da inizio a fine (frasi intere)
//   righe = [prima, ultima] righe da tenere (contate da 0); se manca si tiene tutto
//   blocco = grafici e fumetti: nel carosello restano un riquadro unico (non una banda per riga)
const ELENCO = {
  l_titolo:       { pag: "litigi.html?statico", sel: ".intro h1", fino: ".intro .alea-firma" },
  l_1047:         { pag: "litigi.html?statico", sel: ".intro p:not(.alea-firma)" },
  l_bossi_tit:    { pag: "litigi.html?statico&solo=5", sel: ".scena .data", fino: ".scena h2" },
  l_bossi_frase:  { pag: "litigi.html?statico&solo=5", sel: ".dialogo .battuta", blocco: true },
  l_bossi_dopo:   { pag: "litigi.html", sel: ".passo p", testo: "17 litigi", frase: "Quel giorno|mozioni di sfiducia." },
  l_ce_tit:       { pag: "litigi.html?statico&solo=6", sel: ".scena .data", fino: ".scena h2" },
  l_ce_dialogo:   { pag: "litigi.html?statico&solo=6", sel: ".dialogo", blocco: true },
  l_draghi_testo: { pag: "litigi.html", sel: ".passo p", testo: "Il governo Draghi teneva", frase: "Il governo Draghi|57 volte." },
  l_draghi_emi:   { pag: "litigi.html?statico&solo=8", sel: "#aula", righe: [1, 999], blocco: true },
  l_draghi_tl:    { pag: "litigi.html?statico&solo=8", sel: ".scena .mini", blocco: true },
  m_gioco:        { pag: "moneta.html", sel: "#schermata-gioco .apertura", fino: "#schermata-gioco p:nth-of-type(3)" },
  m_rand:         { pag: "moneta.html?prova", sel: "#articolo p", testo: "Nel 1947", frase: "Nel 1947|simulazioni Monte Carlo." },
  m_serie_t:      { pag: "moneta.html?prova", sel: "#testo-serie", frase: "Invece, su cento|5 lanci o più." },
  m_serie_g:      { pag: "moneta.html?prova", sel: "#ch-serie", blocco: true },
  m_cambi_t:      { pag: "moneta.html?prova", sel: "#testo-cambi", frase: "Con una moneta|serie che evita." },
  m_cambi_g:      { pag: "moneta.html?prova", sel: "#ch-cambi", blocco: true },
  m_oracolo_t:    { pag: "moneta.html?prova", sel: "#testo-oracolo", frase: "Il programma|lo rifarai." },
  m_oracolo_g:    { pag: "moneta.html?prova", sel: "#ch-oracolo", blocco: true },
};
if (typeof module !== "undefined") module.exports = ELENCO;
