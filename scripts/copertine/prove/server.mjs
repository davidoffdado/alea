// Server statico minimo per le prove delle copertine: serve la cartella del sito (Desktop/alea) su http://localhost:4400
// Uso: node scripts/copertine/prove/server.mjs
import { createServer } from "node:http";
import { readFile } from "node:fs/promises";
import { extname, join, normalize } from "node:path";

const RADICE = process.cwd();
const TIPI = { ".html": "text/html; charset=utf-8", ".js": "text/javascript", ".mjs": "text/javascript", ".css": "text/css", ".json": "application/json",
               ".png": "image/png", ".jpg": "image/jpeg", ".svg": "image/svg+xml" };
createServer(async (req, res) => {
  const percorso = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^([/\\])+/, "");
  try {
    const dati = await readFile(join(RADICE, percorso));
    res.writeHead(200, { "content-type": TIPI[extname(percorso)] || "application/octet-stream" });
    res.end(dati);
  } catch {
    res.writeHead(404); res.end("non trovato");
  }
}).listen(4400, () => console.log("http://localhost:4400"));
