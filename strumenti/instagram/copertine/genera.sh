#!/bin/sh
# Genera le copertine (copertina-01.png, copertina-02.png, ...) da copertina.html, con Edge headless.
# Uso (da Git Bash, dentro questa cartella):  sh genera.sh        tutte
#                                              sh genera.sh 3      solo il numero 3
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
NUMERI="${1:-$(grep -o '^  [0-9]*:' "$CARTELLA/copertina.html" | tr -d ' :')}"
for n in $NUMERI; do
  f="$CARTELLA/copertina-$(printf %02d "$n").png"
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1350 --virtual-time-budget=10000 \
    --screenshot="$f" "file:///$CARTELLA/copertina.html?n=$n" 2>/dev/null
  echo "$f"
done
