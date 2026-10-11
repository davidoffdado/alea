#!/bin/sh
# Genera le slide in png/<articolo>-<variante>-<slide>.png da carosello.html, con Edge headless, e il confronto.
# Uso (da Git Bash, dentro questa cartella):  sh genera.sh            tutto
#                                              sh genera.sh moneta B   solo un articolo e/o una variante
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
mkdir -p "$CARTELLA/png"
for a in ${1:-litigi moneta}; do for v in ${2:-A B C}; do for s in 1 2 3 4 5 6; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=1080,1350 --virtual-time-budget=8000 \
    --screenshot="$CARTELLA/png/$a-$v-$s.png" "file:///$CARTELLA/carosello.html?a=$a&v=$v&s=$s" 2>/dev/null
done; echo "$a $v"; done; done
# foglio di confronto: tutte le slide affiancate, una riga per variante
for a in ${1:-litigi moneta}; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=1900,1260 --virtual-time-budget=4000 \
    --screenshot="$CARTELLA/confronto-$a.png" "file:///$CARTELLA/confronto.html?a=$a" 2>/dev/null
done
