#!/bin/sh
# Fotografa proposte.html in proposte.png con Edge headless. Uso: sh genera.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
"$EDGE" --headless=new --disable-gpu --hide-scrollbars --allow-file-access-from-files --force-device-scale-factor=1 \
  --window-size=1660,2600 --virtual-time-budget=6000 --screenshot="$CARTELLA/proposte.png" "file:///$CARTELLA/proposte.html" 2>/dev/null
