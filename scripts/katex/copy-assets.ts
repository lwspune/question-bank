/**
 * Copies KaTeX's stylesheet and its .woff2 fonts from node_modules into
 * public/katex/, where V links them (src/lib/chat/katexStylesheet.ts, 2026-11-27).
 *
 *   npm run katex:assets
 *
 * Run after a KaTeX upgrade: tests/katex-public-stylesheet.test.ts fails until the
 * copy matches the installed version. Only .woff2 is copied: every browser V
 * supports reads it, and the stylesheet lists it first, so the .woff and .ttf it
 * also names are never requested. Fonts the new version no longer names are removed.
 */
import { copyFileSync, existsSync, mkdirSync, readdirSync, readFileSync, rmSync } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const dist = join(root, "node_modules", "katex", "dist");
const out = join(root, "public", "katex");
const outFonts = join(out, "fonts");

if (!existsSync(join(dist, "katex.min.css"))) throw new Error(`KaTeX not installed at ${dist}: run npm install first`);
mkdirSync(outFonts, { recursive: true });

const css = readFileSync(join(dist, "katex.min.css"), "utf8");
const fonts = [...new Set([...css.matchAll(/url\(fonts\/([^)]+\.woff2)\)/g)].map((m) => m[1]))];
copyFileSync(join(dist, "katex.min.css"), join(out, "katex.min.css"));
for (const f of fonts) copyFileSync(join(dist, "fonts", f), join(outFonts, f));
const stale = readdirSync(outFonts).filter((f) => !fonts.includes(f));
for (const f of stale) rmSync(join(outFonts, f));

const version = (JSON.parse(readFileSync(join(root, "node_modules", "katex", "package.json"), "utf8")) as { version: string }).version;
console.log(`KaTeX ${version}: katex.min.css + ${fonts.length} .woff2 fonts -> public/katex/${stale.length ? ` (removed ${stale.length} stale)` : ""}`);
