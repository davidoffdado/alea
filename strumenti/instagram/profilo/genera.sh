#!/bin/sh
# Genera profilo-lime.png e profilo-nero.png (1080×1080) da profilo.html, con Edge headless.
# Uso (da Git Bash, dentro questa cartella):  sh genera.sh
EDGE="/c/Program Files (x86)/Microsoft/Edge/Application/msedge.exe"
CARTELLA="$(cd "$(dirname "$0")" && pwd -W)"
for v in lime nero; do
  "$EDGE" --headless=new --disable-gpu --hide-scrollbars --force-device-scale-factor=1 \
    --window-size=1080,1080 --virtual-time-budget=10000 \
    --screenshot="$CARTELLA/profilo-$v.png" "file:///$CARTELLA/profilo.html?v=$v" 2>/dev/null
done
echo "fatto: profilo-lime.png, profilo-nero.png"
