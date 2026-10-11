#!/bin/sh
# Genera le slide in png/<articolo>-<versione>-<slide>.png da carosello.html, con Edge headless, e i fogli di confronto.
# Una versione è la variante, con l'evidenziatore dopo il trattino: D, E, F, E-bianco, E-grigio, E-nero
# Uso (da Git Bash, dentro questa cartella):  sh genera.sh                       tutto
#                                              sh genera.sh moneta "E-nero"       solo un articolo e/o alcune versioni
# --disable-web-security serve all'evidenziatore, che legge i pixel delle schermate in locale (file://)
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
VERSIONI="${2:-E-bianco E-grigio E-nero D E F}"
mkdir -p "$CARTELLA/png"
for a in ${1:-litigi moneta}; do for ver in $VERSIONI; do
  v="${ver%%-*}"; e="${ver#*-}"; [ "$e" = "$ver" ] && e=""
  for s in 1 2 3 4 5 6; do
    "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --disable-web-security \
      --user-data-dir="$TEMP/edge-caroselli" --force-device-scale-factor=1 --window-size=1080,1350 --virtual-time-budget=8000 \
      --screenshot="$CARTELLA/png/$a-$ver-$s.png" "file:///$CARTELLA/carosello.html?a=$a&v=$v&ev=$e&s=$s" 2>/dev/null
  done; echo "$a $ver"
done; done
for a in ${1:-litigi moneta}; do for foglio in "E-bianco E-grigio E-nero" "D E F"; do
  nome=$(echo "$foglio" | tr -d ' ')
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=1900,1260 --virtual-time-budget=4000 \
    --screenshot="$CARTELLA/confronto-$a-$nome.png" "file:///$CARTELLA/confronto.html?a=$a&v=$(echo $foglio | tr ' ' ,)" 2>/dev/null
done; done
