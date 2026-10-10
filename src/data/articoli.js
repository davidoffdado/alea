// Elenco degli articoli, dal più recente. Le pagine degli articoli si importano in public/ con npm run articoli.
// copertina: nome dell'immagine in public/img/copertine (<nome>-o.png orizzontale, <nome>-v.png verticale),
//   generata da scripts/copertine/<nome>.html con npm run copertine; per le bozze basta { colore, testo }.
// colore: la cornice della copertina, sopra e ai lati (alla The Pudding).
// bozza: true -> compare solo con npm run dev, mai nel sito pubblicato
export const ARTICOLI = [
  {
    numero: 2,
    data: "2026-10-10",
    tema: "statistica",
    titolo: "Non siamo bravi a simulare la casualità",
    sommario: "Inventa cento lanci di moneta: un programma che non sa niente di te proverà a prevederli. Poi li confrontiamo con una moneta vera.",
    url: "/prova-a-fare-il-caso/",
    copertina: "moneta",
    colore: "#c23a2b",
  },
  {
    numero: 1,
    data: "2026-10-06",
    tema: "politica",
    titolo: "I litigi tra gli alleati di governo",
    sommario: "Governano insieme e votano insieme la fiducia, ma in aula si contestano: 1.047 volte, alla Camera, dal 1948 al 2022.",
    url: "/litigi-tra-alleati/",
    copertina: "litigi",
    colore: "#eb6834",
  },
  // segnaposto per vedere la griglia mentre si lavora
  { bozza: true, tema: "statistica", titolo: "Il tuo numero «a caso» non è casuale", sommario: "Perché tutti scelgono il 7.", copertina: { colore: "#b9a5ff", testo: "7" } },
  { bozza: true, tema: "cultura", titolo: "Sanremo si vince in tonalità minore?", sommario: "Settant'anni di canzoni vincitrici, nota per nota.", copertina: { colore: "#ff8fb1", testo: "♭" } },
  { bozza: true, tema: "economia", titolo: "Chi paga davvero l'Irpef?", sommario: "Il 13% dei contribuenti versa più della metà dell'imposta.", copertina: { colore: "#ffd23f", testo: "13%" } },
  { bozza: true, tema: "europa", titolo: "Quanti anni hanno i leader europei?", sommario: "L'età mediana dei capi di governo è tornata quella del 1987.", copertina: { colore: "#7fb2ff", testo: "61" } },
];

export const articoliVisibili = () => ARTICOLI.filter((a) => !a.bozza || import.meta.env.DEV);
