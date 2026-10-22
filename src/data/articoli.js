// Elenco degli articoli, dal più recente. Con npm run deploy tutto quello che c'è qui (titolo, sommario, url, copertina)
// si aggiorna ovunque: home, pagine degli articoli, meta tag e anteprime per i social.
// copertina: nome del file in public/img/copertine/ (png, jpg o webp), mostrato così com'è in un riquadro 4:5
//   (se ha altre proporzioni si vede il centro); per le bozze basta { colore, testo }.
// colore: il blocco di colore pieno dietro la copertina ("ombra piena").
// bozza: true -> compare solo con npm run dev, mai nel sito pubblicato
export const ARTICOLI = [
  {
    numero: 3,
    data: "2026-10-22",
    tema: "cultura",
    titolo: "La rete di Infinite Jest",
    sommario: "Il romanzo di David Foster Wallace, visto attraverso una network analysis, ci mostra due mondi separati, se non per un personaggio",
    url: "/la-rete-di-infinite-jest/",
    copertina: "infinite-jest.png",
    colore: "#d4ff3a",
  },
  {
    numero: 2,
    data: "2026-10-10",
    tema: "probabilità",
    titolo: "Non siamo bravi a simulare la casualità",
    sommario: "Generare numeri casuali non è qualcosa di semplice e spesso un essere umano fallisce nel tentativo di provarci",
    url: "/simulazione-casualita/",
    copertina: "moneta.png",
    colore: "#d4ff3a",
  },
  {
    numero: 1,
    data: "2026-10-06",
    tema: "politica",
    titolo: "I litigi tra gli alleati di governo",
    sommario: "Governano insieme e votano insieme la fiducia, ma in aula si contestano: 1.047 volte alla Camera, dal 1948 al 2022",
    url: "/litigi-tra-alleati/",
    copertina: "litigi2.png",
    colore: "#d4ff3a",
  },
  // segnaposto per vedere la griglia mentre si lavora
  { bozza: true, tema: "statistica", titolo: "Il tuo numero «a caso» non è casuale", sommario: "Perché tutti scelgono il 7.", copertina: { colore: "#b9a5ff", testo: "7" } },
  { bozza: true, tema: "cultura", titolo: "Sanremo si vince in tonalità minore?", sommario: "Settant'anni di canzoni vincitrici, nota per nota.", copertina: { colore: "#ff8fb1", testo: "♭" } },
  { bozza: true, tema: "economia", titolo: "Chi paga davvero l'Irpef?", sommario: "Il 13% dei contribuenti versa più della metà dell'imposta.", copertina: { colore: "#ffd23f", testo: "13%" } },
  { bozza: true, tema: "europa", titolo: "Quanti anni hanno i leader europei?", sommario: "L'età mediana dei capi di governo è tornata quella del 1987.", copertina: { colore: "#7fb2ff", testo: "61" } },
];

export const articoliVisibili = () => ARTICOLI.filter((a) => !a.bozza || import.meta.env.DEV);
