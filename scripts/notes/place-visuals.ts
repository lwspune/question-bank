/**
 * Place figures that are ALREADY wired (in the VisualizationSlug union and in
 * ConceptUnitCard) on notes concepts: adds `visualizationSlug` to each target
 * concept under src/app/notes/. For a NEW figure, wire it first
 * (scripts/imat/wire-visuals.ts does both steps for IMAT).
 *
 *   npx tsx scripts/notes/place-visuals.ts <manifest.json> [--dry]
 *
 * Manifest: [{ "slug": "field-lines-charge", "concept": "cetp-field-superposition" }]
 *
 * Refuses, and writes nothing, when a slug is not in the union, a concept
 * matches no file or several, a concept already has a figure, a concept appears
 * twice, or a page would show the same figure twice. Keeps each file's own line
 * endings. Written 2026-11-19 for the MHT-CET notes figures.
 */
import { readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

type Row = { slug: string; concept: string };

const TYPES = "src/app/notes/_types.ts";
const NOTES = "src/app/notes";

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
    if (!types.includes(`"${r.slug}"`)) problems.push(`${r.slug}: not in the VisualizationSlug union`);
    const hits = files.filter((x) => x.raw.replace(/\r\n/g, "\n").includes(`\n      slug: "${r.concept}",\n`));
    if (hits.length !== 1) {
      problems.push(`${r.concept}: matched ${hits.length} files`);
      continue;
    }
    const file = hits[0].f;
    const t = (edits.get(file) ?? hits[0].raw).replace(/\r\n/g, "\n");
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
  for (const [file, text] of edits) {
    if (!dry) writeFileSync(file, text);
    console.log(`${dry ? "would write" : "wrote"} ${path.relative(process.cwd(), file)}`);
  }
  console.log(`${rows.length} figures placed${dry ? " (dry run)" : ""}`);
}

main();
