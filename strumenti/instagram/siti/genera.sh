#!/bin/sh
# Fotografa confronto.html per i due articoli: temi-litigi.png, temi-moneta.png. Uso: sh genera.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
for a in litigi moneta; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
    --window-size=2100,1420 --virtual-time-budget=4000 --screenshot="$CARTELLA/temi-$a.png" "file:///$CARTELLA/confronto.html?a=$a" 2>/dev/null
done
