/**
 * Place figures on notes concepts under src/app/notes/: adds
 * `visualizationSlug` to each target concept. A row naming a `component` is a
 * NEW figure: it is first wired into the VisualizationSlug union
 * (src/app/notes/_types.ts) and diagramRegistry.tsx, then the page files are regenerated.
 * A row without one must name a figure that is already wired (a borrow).
 * (IMAT's concepts live elsewhere: scripts/imat/wire-visuals.ts.)
 *
 *   npx tsx scripts/notes/place-visuals.ts <manifest.json> [--dry]
 *
 * Manifest: [{ "slug": "field-lines-charge", "concept": "cetp-field-superposition" },
 *            { "slug": "cet-pn-junction", "component": "CetPnJunction", "concept": "cetp-depletion-layer" }]
 *
 * Refuses, and writes nothing, when a borrowed slug is not wired, a new slug is
 * already wired or its component file is missing, a concept matches no file or
 * several, a concept already has a figure, a concept appears twice, or a page
 * would show the same figure twice. Keeps each file's own line endings.
 * Written 2026-11-19 for the MHT-CET notes figures.
 */
import { execSync } from "node:child_process";
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

type Row = { slug: string; concept: string; component?: string };

const TYPES = "src/app/notes/_types.ts";
const CARD = "src/app/notes/_components/diagramRegistry.tsx";
const VIZ = "src/app/notes/_components/visualizations";
const NOTES = "src/app/notes";
// The same anchors as scripts/imat/wire-visuals.ts: new entries go just above
// (union) or below (import, case) the last IMAT one, so the anchors survive.
const LAST_UNION = '  | "imat-chart-types";';
const LAST_IMPORT = 'import ImatChartTypes from "./visualizations/ImatChartTypes";';
const LAST_CASE = '    case "imat-chart-types":\n      return <ImatChartTypes />;';

const toLf = (s: string) => s.replace(/\r\n/g, "\n");

/** Edit with LF, give back the text with the file's own line ending. */
function editFile(file: string, fn: (lf: string) => string): string {
  const raw = readFileSync(file, "utf8");
  const next = fn(toLf(raw));
  return raw.includes("\r\n") ? next.replace(/\n/g, "\r\n") : next;
}

function walk(d: string, out: string[] = []): string[] {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) {
      if (!f.startsWith("_components")) walk(p, out);
    } else if (p.endsWith(".ts") && p.includes(`${path.sep}_data${path.sep}`)) out.push(p);
  }
  return out;
}

/** The text of one concept object: from its slug line to the next concept's slug line. */
function conceptSpan(t: string, concept: string): { start: number; end: number } | null {
  const start = t.indexOf(`\n      slug: "${concept}",\n`);
  if (start < 0) return null;
  const next = t.indexOf('\n      slug: "', start + 1);
  return { start, end: next < 0 ? t.length : next };
}

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const rows = JSON.parse(readFileSync(args.find((a) => !a.startsWith("--"))!, "utf8")) as Row[];
  const types = readFileSync(TYPES, "utf8");
  const files = walk(NOTES).map((f) => ({ f, raw: readFileSync(f, "utf8") }));
  const problems: string[] = [];
  const edits = new Map<string, string>();
  const pageFigures = new Map<string, Set<string>>();

  for (const r of rows) {
    if (r.component) {
      if (!/^[a-z0-9]+(-[a-z0-9]+)*$/.test(r.slug)) problems.push(`${r.slug}: slug must be kebab-case`);
      if (types.includes(`"${r.slug}"`)) problems.push(`${r.slug}: already wired`);
      if (!existsSync(path.join(VIZ, `${r.component}.tsx`))) problems.push(`${r.slug}: no ${r.component}.tsx`);
    } else if (!types.includes(`"${r.slug}"`)) problems.push(`${r.slug}: not in the VisualizationSlug union`);
    const hits = files.filter((x) => toLf(x.raw).includes(`\n      slug: "${r.concept}",\n`));
    if (hits.length !== 1) {
      problems.push(`${r.concept}: matched ${hits.length} files`);
      continue;
    }
    const file = hits[0].f;
    const t = toLf(edits.get(file) ?? hits[0].raw);
    const span = conceptSpan(t, r.concept)!;
    const body = t.slice(span.start, span.end);
    if (body.includes("visualizationSlug")) {
      problems.push(`${r.concept}: already has a figure`);
      continue;
    }
    const onPage = pageFigures.get(file) ?? new Set([...t.matchAll(/visualizationSlug: "([^"]+)"/g)].map((m) => m[1]));
    if (onPage.has(r.slug)) problems.push(`${r.concept}: ${r.slug} is already on this page`);
    onPage.add(r.slug);
    pageFigures.set(file, onPage);
    const nameLine = body.match(/\n      name: [^\n]*\n/);
    if (!nameLine || nameLine.index === undefined) {
      problems.push(`${r.concept}: no one-line name to anchor after`);
      continue;
    }
    const at = span.start + nameLine.index + nameLine[0].length;
    const next = `${t.slice(0, at)}      visualizationSlug: "${r.slug}",\n${t.slice(at)}`;
    edits.set(file, hits[0].raw.includes("\r\n") ? next.replace(/\n/g, "\r\n") : next);
  }
  if (new Set(rows.map((r) => r.concept)).size !== rows.length) problems.push("a concept appears twice in the manifest");

  if (problems.length) {
    console.log(problems.map((p) => `!! ${p}`).join("\n"));
    console.log("nothing written");
    process.exit(1);
  }

  const fresh = rows.filter((r) => r.component);
  if (fresh.length) {
    edits.set(
      TYPES,
      editFile(TYPES, (t) => {
        if (!t.includes(LAST_UNION)) throw new Error("union anchor not found");
        return t.replace(LAST_UNION, `${fresh.map((r) => `  | "${r.slug}"`).join("\n")}\n${LAST_UNION}`);
      }),
    );
    edits.set(
      CARD,
      editFile(CARD, (t) => {
        if (!t.includes(LAST_IMPORT) || !t.includes(LAST_CASE)) throw new Error("card anchors not found");
        const imports = fresh.map((r) => `import ${r.component} from "./visualizations/${r.component}";`).join("\n");
        const cases = fresh.map((r) => `    case "${r.slug}":\n      return <${r.component} />;`).join("\n");
        return t.replace(LAST_IMPORT, `${LAST_IMPORT}\n${imports}`).replace(LAST_CASE, `${LAST_CASE}\n${cases}`);
      }),
    );
  }
  for (const [file, text] of edits) {
    if (!dry) writeFileSync(file, text);
    console.log(`${dry ? "would write" : "wrote"} ${path.relative(process.cwd(), file)}`);
  }
  if (fresh.length && !dry) execSync("npx tsx scripts/notes/gen-diagrams.ts", { stdio: "inherit" });
  console.log(`${rows.length} figures placed, ${fresh.length} of them newly wired${dry ? " (dry run)" : ""}`);
}

main();
