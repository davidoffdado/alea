#!/bin/sh
# Genera le 4 slide del post di presentazione (slide-1.png ... slide-4.png) da presentazione.html, con Edge headless.
# Uso (da Git Bash, dentro questa cartella):  sh genera.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
for s in 1 2 3 4; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1350 --virtual-time-budget=10000 \
    --screenshot="$CARTELLA/slide-$s.png" "file:///$CARTELLA/presentazione.html?s=$s" 2>/dev/null
done
echo "fatto: slide-1.png ... slide-4.png"
