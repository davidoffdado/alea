# Guida all'editor degli articoli di àlea

L'editor è `strumenti/editor-articoli.html`: si apre con un doppio clic, in Chrome o Edge.
Con un browser diverso l'anteprima funziona, ma il salvataggio va nella cartella Download invece di farti scegliere dove.

## 1. Cominciare

1. Premi **Nuovo** e scegli da dove partire:
   - **Classico:** titolo, paragrafi, grafici, nota metodologica.
   - **Scrollytelling:** una figura ferma che cambia mentre si scorre.
   - **Con domanda iniziale:** il lettore risponde prima di leggere.
   - **Vuoto.**
2. Nel riquadro **Articolo**, in alto, compila:
   - **titolo** e **sommario** (compaiono anche nella home e nelle anteprime sui social);
   - **data**;
   - **indirizzo:** la parte dopo `alea.news/`; se lo lasci vuoto viene dal titolo;
   - **fondo:** bianco o nero;
   - **colore d'accento:** di base lime.
3. Scrivi i blocchi. A destra l'anteprima si aggiorna da sola; **telefono** e **computer** cambiano la larghezza.

Il lavoro si salva da solo nel browser. Non è una copia sicura: se il browser cancella i dati, o se le immagini sono troppe, va perso.
**Salva progetto** spesso: crea un file `.json` che si riapre con **Apri**. Tienilo in `Desktop/alea/articoli/`, accanto all'HTML.

## 2. Scrivere i paragrafi

Nel blocco **Paragrafi** si scrive normalmente:

| Scrivi | Ottieni |
|---|---|
| una riga vuota | un nuovo paragrafo |
| `**parole**` | **grassetto** |
| `*parole*` | *corsivo* |
| `==parole==` | parole evidenziate con il colore d'accento |
| `[testo](https://indirizzo)` | un link |
| `{risposta}` | la risposta che il lettore ha dato alla domanda iniziale |

Puoi scrivere tutto il testo in un solo blocco Paragrafi, oppure spezzarlo in più blocchi per mettere i grafici in mezzo.

## 3. I blocchi

Il pulsante **+ aggiungi** sta tra un blocco e l'altro. Ogni blocco ha in alto quattro pulsanti: ↑ ↓ per spostarlo, ⧉ per duplicarlo, ✕ per eliminarlo.

- **Intertitolo:** divide l'articolo in parti.
- **Grafico:**
  - *Dati:* copia le celle da Excel o Google Sheets e incollale nel campo Dati, comprese le intestazioni.
  - *Barre e colonne:* prima colonna = nome, seconda = valore.
  - *Linee:* prima colonna = anno (o data), poi una colonna per ogni serie.
  - *Da evidenziare:* nomi separati da virgola. Vanno in nero, o nel colore d'accento sul fondo nero; tutto il resto è grigio.
  - *Unità:* si aggiunge ai numeri, per esempio `%`.
  - *Fonte:* compare sotto il grafico.
- **Immagine:** foto o grafico già pronto, con didascalia e credito. Può essere in bianco e nero o più larga del testo. Le immagini vengono rimpicciolite a 1600 px.
- **Scrollytelling:** una figura resta ferma mentre i passi scorrono.
  - *Con un grafico:* a ogni passo scrivi cosa evidenziare; se lo lasci vuoto, niente è evidenziato.
  - *Con immagini:* ogni passo ha la sua immagine. Un passo senza immagine tiene quella del passo prima.
  - Puoi metterne più di uno, e fare un articolo tutto in scrollytelling.
- **Citazione:** una frase in grande, con chi l'ha detta.
- **Numero grande:** un dato da far risaltare, con una riga di spiegazione.
- **Domanda al lettore:**
  - *Risposte:* una per riga.
  - *Risposta giusta:* il suo numero (1 = la prima), oppure 0 per un sondaggio senza risposta giusta.
  - *Spiegazione:* compare dopo la risposta.
- **Codice HTML:** per tutto quello che l'editor non sa fare (vedi il punto 6).
- **Separatore:** una pausa.
- **Nota metodologica:** finisce sempre in fondo, su fondo nero. Un paragrafo che inizia con `### ` diventa un sottotitolo, per esempio `### Fonti`.

## 4. La schermata iniziale

Si sceglie nel riquadro **Articolo**:

- **Caricamento:** il titolo, o un testo a scelta, con una barra che si riempie; dopo circa due secondi compare l'articolo.
- **Domanda al lettore prima di leggere:**
  - *Risposte:* una per riga.
  - *Commenti:* uno per riga, nello stesso ordine delle risposte; oppure uno solo, uguale per tutte.
  - *Pulsante:* il testo del pulsante per continuare.
  - Nel testo, `{risposta}` diventa la scelta del lettore.
- **Copertina:** una foto a tutto schermo con titolo e sommario evidenziati.

Nell'anteprima la schermata iniziale si vede solo se spunti **mostra la schermata iniziale**, così mentre scrivi non ti blocca.

## 5. Pubblicare

1. **Salva progetto** in `Desktop/alea/articoli/<indirizzo>.json`.
2. **Esporta HTML** in `Desktop/alea/articoli/<indirizzo>.html`.
3. Premi **Pubblica…** e copia la riga da aggiungere in cima a `Desktop/alea/src/data/articoli.js`. Controlla il numero e il tema.
4. Nel terminale, dentro `Desktop/alea`:
   ```sh
   npm run articoli    # aggiunge l'articolo al sito con testata, firma, fondo e meta tag
   npm run dev         # controlla su localhost:4321/<indirizzo>/
   ```
5. Fai la copertina per la home (vedi `scripts/copertine.mjs`), oppure chiedi a Claude: «fai la copertina di <indirizzo>».
6. Quando è tutto a posto: `npm run deploy`. Poi `git add articoli src && git commit -m "…" && git push`, così non si perde niente.

## 6. Le cose complesse (con Claude)

Per un grafico o un'interazione che l'editor non sa fare ci sono due strade.

**A. Dentro l'editor (consigliata).**
- Chiedi a Claude il codice per un blocco **Codice HTML**: HTML, SVG o JavaScript, anche con D3.
- Incollalo nel blocco: resta nel progetto, si vede nell'anteprima e sopravvive a ogni nuova esportazione.
- Quando chiedi il codice, scrivi che va dentro un articolo fatto con l'editor. Così Claude userà gli stessi colori, cioè le variabili CSS della pagina: `--testo`, `--resto`, `--dato`, `--ev`.

**B. Sull'HTML esportato.**
- Claude modifica direttamente `articoli/<indirizzo>.html`.
- **Attenzione:** se poi esporti di nuovo dall'editor, il file viene sostituito e le modifiche fatte a mano si perdono.
- Quindi usa questa strada solo alla fine, quando il testo è definitivo. Da lì in poi le correzioni si fanno sull'HTML (da te o da Claude), non più nell'editor.

## 7. Se qualcosa non va

- **Un grafico mostra «(mancano i dati)»:** il campo Dati deve avere almeno due righe, le intestazioni più un dato.
- **I numeri sono sbagliati:** con i dati incollati da Excel (o separati da `;`) va bene sia `1,5` sia `1.5`; il punto vale come separatore delle migliaia solo nella forma `1.500` o `12.345.678`. Con i dati separati da virgole il decimale è il punto.
- **L'anteprima non si aggiorna:** salva il progetto e ricarica la pagina dell'editor.
- **Hai perso il lavoro:** riapri l'ultimo `.json` con **Apri**.
