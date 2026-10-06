// Elenco degli articoli, dal più recente. Ogni articolo vive nel suo repository e qui c'è solo il collegamento.
// copertina: "litigi" ha una copertina disegnata apposta (src/components/Copertina.astro);
// per gli altri basta { colore, testo } oppure, più avanti, un'immagine.
// bozza: true -> compare solo con npm run dev, mai nel sito pubblicato
export const ARTICOLI = [
  {
    numero: 1,
    data: "2026-10-06",
    tema: "politica",
    titolo: "I litigi tra gli alleati di governo",
    sommario: "Governano insieme e votano insieme la fiducia, ma in aula si contestano: 1.047 volte, alla Camera, dal 1948 al 2022.",
    url: "https://davidoffdado.github.io/alleati-camera/viz/litigi.html",
    copertina: "litigi",
  },
  // segnaposto per vedere la griglia mentre si lavora
  { bozza: true, tema: "statistica", titolo: "Il tuo numero «a caso» non è casuale", sommario: "Perché tutti scelgono il 7.", copertina: { colore: "#b9a5ff", testo: "7" } },
  { bozza: true, tema: "cultura", titolo: "Sanremo si vince in tonalità minore?", sommario: "Settant'anni di canzoni vincitrici, nota per nota.", copertina: { colore: "#ff8fb1", testo: "♭" } },
  { bozza: true, tema: "economia", titolo: "Chi paga davvero l'Irpef?", sommario: "Il 13% dei contribuenti versa più della metà dell'imposta.", copertina: { colore: "#ffd23f", testo: "13%" } },
  { bozza: true, tema: "europa", titolo: "Quanti anni hanno i leader europei?", sommario: "L'età mediana dei capi di governo è tornata quella del 1987.", copertina: { colore: "#7fb2ff", testo: "61" } },
];

export const articoliVisibili = () => ARTICOLI.filter((a) => !a.bozza || import.meta.env.DEV);
