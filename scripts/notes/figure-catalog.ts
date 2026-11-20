/**
 * Catalog of every wired notes figure, and the concept list of chosen notes
 * subjects, for matching figures to concepts (scripts/notes/BORROW_BRIEF.md).
 *
 *   npx tsx --require ./scripts/notes/nocss.cjs scripts/notes/figure-catalog.ts <outDir> [routePrefix ...]
 *
 * Writes <outDir>/figure-catalog.txt: `slug | still|slider|animation | the
 * words it shows`, and for each route prefix (e.g. `jee-mains-`)
 * <outDir>/concepts-<prefix>.txt: `subjectRoute | chapter | subtopic | concept
 * | name | formula|reference | figure already placed`. Read-only.
 */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { renderDiagramMarkup } from "@/lib/ebooks/diagrams";
import { visibleText } from "@/lib/notes/visualText";
import { NOTES_CHAPTERS } from "@/lib/notes/chapters";
import type { VisualizationSlug } from "@/app/notes/_types";

const [outDir, ...prefixes] = process.argv.slice(2);
if (!outDir) throw new Error("usage: figure-catalog.ts <outDir> [routePrefix ...]");

const types = readFileSync("src/app/notes/_types.ts", "utf8");
const start = types.indexOf("export type VisualizationSlug");
const slugs = [...types.slice(start, types.indexOf(";", start)).matchAll(/\| "([^"]+)"/g)].map((m) => m[1]);
const lines = slugs.map((s) => {
  const m = renderDiagramMarkup(s as VisualizationSlug);
  const kind = m.includes("data-step-list") ? "animation" : /type="range"/.test(m) ? "slider" : "still";
  return `${s} | ${kind} | ${visibleText(m).slice(0, 300)}`;
});
writeFileSync(path.join(outDir, "figure-catalog.txt"), lines.join("\n"));
console.log(`figure-catalog.txt: ${lines.length} figures`);

for (const prefix of prefixes) {
  const rows: string[] = [];
  for (const c of NOTES_CHAPTERS.filter((x) => x.subjectRoute.startsWith(prefix)))
    for (const [s, n] of Object.entries(c.notes))
      for (const k of n.concepts) rows.push([c.subjectRoute, c.chapterSlug, s, k.slug, k.name, k.kind, k.visualizationSlug ?? ""].join(" | "));
  writeFileSync(path.join(outDir, `concepts-${prefix.replace(/-$/, "")}.txt`), rows.join("\n"));
  console.log(`concepts-${prefix.replace(/-$/, "")}.txt: ${rows.length} concepts`);
}
