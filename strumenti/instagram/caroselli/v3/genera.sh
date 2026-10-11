#!/bin/sh
# Genera le slide in png/<articolo>-<tema>-<slide>.png da carosello.html, con Edge headless, e i fogli di confronto
# (confronto-<articolo>-<fondo>.png: una riga per evidenziatore).
# Uso (da Git Bash, dentro questa cartella):  sh genera.sh                         tutto
#                                              sh genera.sh moneta "nero-lime"      solo un articolo e/o alcuni temi
# Prima servono i ritagli: node ritagli/scatta.mjs
# --disable-web-security serve all'evidenziatore, che legge i pixel delle schermate in locale (file://)
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
TEMI="${2:-nero-lime nero-bianco bianco-lime bianco-nero}"
mkdir -p "$CARTELLA/png"
for a in ${1:-litigi moneta}; do for t in $TEMI; do
  for s in 1 2 3 4 5 6; do
    "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --disable-web-security \
      --user-data-dir="$TEMP/edge-caroselli-genera" --force-device-scale-factor=1 --window-size=1080,1350 --virtual-time-budget=8000 \
      --screenshot="$CARTELLA/png/$a-$t-$s.png" "file:///$CARTELLA/carosello.html?a=$a&tema=$t&s=$s" 2>/dev/null
  done; echo "$a $t"
done; done
for a in ${1:-litigi moneta}; do for fo in nero bianco; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=1900,1200 --virtual-time-budget=4000 \
    --screenshot="$CARTELLA/confronto-$a-$fo.png" "file:///$CARTELLA/confronto.html?a=$a&fondo=$fo" 2>/dev/null
done; done
