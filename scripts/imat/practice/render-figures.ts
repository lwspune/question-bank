/**
 * Render the drawn IMAT twin figures: every figures/*.svg becomes a PNG beside
 * it, through headless Microsoft Edge (already installed; no new dependency).
 *
 *   npx tsx scripts/imat/practice/render-figures.ts            # render new or changed drawings
 *   npx tsx scripts/imat/practice/render-figures.ts --all      # re-render every drawing
 *
 * The SVG is the source of record and is committed with its PNG. Each drawing
 * must declare width and height on its root element: Edge screenshots a fixed
 * window, which is sized from them (svgSize). The PNG is rendered at 2x for
 * sharp print.
 */
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const FIGURES = join(__dirname, "figures");
const EDGE = String.raw`C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`;
const SCALE = 2;

export function svgSize(svg: string): { width: number; height: number } {
  const root = /<svg\b[^>]*>/.exec(svg)?.[0] ?? "";
  const w = /\bwidth="([\d.]+)"/.exec(root)?.[1];
  const h = /\bheight="([\d.]+)"/.exec(root)?.[1];
  if (!w || !h) throw new Error("the <svg> root needs explicit width and height");
  return { width: Math.ceil(Number(w)), height: Math.ceil(Number(h)) };
}

/**
 * A drawing may embed a licensed source image (an OpenStax figure kept beside
 * it in figures/) by its bare file name; the page is written to a temp folder,
 * so relative links resolve against figures/ through <base>.
 */
export function figuresBase(dir = FIGURES): string {
  return `file:///${dir.replace(/\\/g, "/").replace(/\/?$/, "/")}`;
}

function render(svgFile: string, pngFile: string) {
  const svg = readFileSync(svgFile, "utf8");
  const { width, height } = svgSize(svg);
  const dir = mkdtempSync(join(tmpdir(), "imat-fig-"));
  const html = join(dir, "figure.html");
  writeFileSync(
    html,
    `<!doctype html><html><head><meta charset="utf-8"><base href="${figuresBase()}"><style>html,body{margin:0;padding:0;background:#fff}svg{display:block}</style></head><body>${svg}</body></html>`
  );
  execFileSync(
    EDGE,
    [
      "--headless=new",
      "--disable-gpu",
      "--hide-scrollbars",
      `--force-device-scale-factor=${SCALE}`,
      `--window-size=${width},${height}`,
      "--default-background-color=FFFFFFFF",
      `--screenshot=${pngFile}`,
      `file:///${html.replace(/\\/g, "/")}`,
    ],
    { stdio: "ignore", timeout: 60_000 }
  );
  if (!existsSync(pngFile)) throw new Error(`Edge did not write ${pngFile}`);
}

function main() {
  const all = process.argv.includes("--all");
  const svgs = readdirSync(FIGURES).filter((f) => f.endsWith(".svg"));
  let done = 0;
  for (const f of svgs) {
    const svg = join(FIGURES, f);
    const png = svg.replace(/\.svg$/, ".png");
    if (!all && existsSync(png) && statSync(png).mtimeMs >= statSync(svg).mtimeMs) continue;
    render(svg, png);
    done++;
    console.log(`rendered ${f}`);
  }
  console.log(`${done} rendered, ${svgs.length - done} up to date`);
}

if (require.main === module) main();
