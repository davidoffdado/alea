# Caroselli di àlea: come modificarli e rigenerarli

## 0. Il modo più semplice: l'editor

Apri `Desktop/alea/strumenti/editor-caroselli.html` con un doppio clic: si aggiungono le slide (copertina, foto e testo, testo e ritaglio, chiusura), si caricano le foto con i loro crediti, si scrive il testo (`==parole==` per evidenziarle) e con «Scarica le slide» si ottiene un PNG per slide. «Salva progetto» crea un file .json da riaprire dopo. Per i ritagli basta una schermata del grafico: i bordi vuoti si tagliano da soli.

I metodi qui sotto servono quando vuoi i ritagli presi automaticamente dagli articoli.

I comandi si danno da **Git Bash**, dentro la cartella indicata.
I PNG finali vanno copiati in `pubblicare/` (una cartella per numero, file `01.png`, `02.png`, ...).

## 1. Carosello con foto e ritagli (copertina, moneta)

Cartella: `Desktop/alea/strumenti/instagram/caroselli/`

| Cosa vuoi cambiare | Dove |
|---|---|
| Testo della copertina, foto, ordine delle slide, frase di chiusura | `carosello.html`, oggetto `ARTICOLI` |
| Crediti delle foto (compaiono su ogni foto) | `carosello.html`, oggetto `CREDITI` |
| Quale pezzo dell'articolo diventa un ritaglio | `ritagli/elenco.js` |
| Colori e caratteri | `temi.js` |

Esempio di slide in `ARTICOLI`:

```js
{ foto: ["mario_draghi.jpg", "matteo_salvini.jpg"], col: 2, rit: ["l_draghi_testo"] },   // 2 foto affiancate + un ritaglio
{ gancio: "Testo della copertina", foto: [...], col: 3 },                                  // copertina
{ chiusura: "Frase finale." },                                                              // ultima slide: frase + «Leggi tutto su alea.news»
{ foto: ["ibm-nasa.jpg"], titolo: "Un titolo", testo: "Testo scritto a mano, *corsivo*.", rit: ["m_serie_g"] },  // testo scritto (con le righe evidenziate come i ritagli) + ritaglio
```

Le foto stanno in `foto/`. Una foto nuova va aggiunta anche in `CREDITI`.

Un ritaglio in `ritagli/elenco.js` è un pezzo della pagina dell'articolo:

```js
m_rand: { pag: "moneta.html?prova", sel: "#articolo p", testo: "Nel 1947", frase: "Nel 1947|simulazioni Monte Carlo." },
```

- `sel` è l'elemento della pagina e `testo` è una parola che deve contenere.
- `frase` dice quale testo tenere, da "inizio" a "fine".
- `blocco: true` va messo sui grafici e sui fumetti.

**Rigenerare:**

```sh
node ritagli/scatta.mjs bianco-lime        # solo se hai cambiato elenco.js, temi.js o gli articoli
sh genera.sh "" bianco-lime                # tutte le slide → png/<articolo>-bianco-lime-<n>.png
sh genera.sh moneta bianco-lime            # solo la moneta
```

Per vedere una slide senza generare niente, apri nel browser
`carosello.html?a=moneta&tema=bianco-lime&s=3`.
Se i ritagli non compaiono, il browser blocca la lettura dei file locali: usa i PNG.

Se aggiungi slide, aggiorna il numero `N` in `genera.sh`.

## 2. Carosello a timeline dei litigi (slide 2-7 del n. 1)

Cartella: `Desktop/discorsi_camera/applausi/`

- Si modifica `carosello/b4_alea_template.html`: testi delle note, posizioni (`left`/`top`), classifica.
- Poi: `node carosello/genera.js b4_alea` → `carosello/png/b4_alea/litigi_1.png ... litigi_6.png`
- I numeri (1047, 38, 98...) li calcola da `viz/litigi.json`.

## 3. Copertina lime della presentazione

`copertine/copertina.html` (testi nell'oggetto `C`), poi `sh genera.sh`.
