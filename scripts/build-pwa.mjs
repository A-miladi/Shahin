import { readFile, readdir, writeFile } from "node:fs/promises";
import { relative, resolve, sep } from "node:path";
import { fileURLToPath } from "node:url";

const root = new URL("../", import.meta.url);
const buildId = (await readFile(new URL(".next/BUILD_ID", root), "utf8")).trim();
const staticFiles = await readdir(new URL(".next/static/", root), { recursive: true, withFileTypes: true });
const staticRoot = fileURLToPath(new URL(".next/static/", root));
const staticUrls = staticFiles
  .filter((entry) => entry.isFile() && !entry.name.endsWith(".map"))
  .map((entry) => "/_next/static/" + relative(staticRoot, resolve(entry.parentPath, entry.name)).split(sep).join("/"))
  .sort();
const menuImages = (await readdir(new URL("public/images/menu/", root)))
  .filter((file) => file.endsWith(".webp"))
  .sort();
const urls = [
  "/",
  "/manifest.webmanifest",
  "/favicon.ico",
  "/images/DesktopHero.png",
  "/images/MobileHero.png",
  "/icons/icon-192x192.png",
  "/icons/icon-512x512.png",
  "/icons/icon-maskable.png",
  "/icons/apple-touch-icon.png",
  ...staticUrls,
  ...menuImages.map((file) => "/images/menu/" + file),
];
const worker = await readFile(new URL("scripts/service-worker.js", root), "utf8");
const settings = `const buildId = ${JSON.stringify(buildId)};\nconst offlineUrls = ${JSON.stringify(urls, null, 2)};\n`;
await writeFile(new URL("public/sw.js", root), settings + worker);
console.log(`PWA precache: ${urls.length} URLs, including ${menuImages.length} menu images.`);
