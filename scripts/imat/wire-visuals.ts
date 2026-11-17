/**
 * Wire drafted IMAT notes figures into the notes: for each manifest row, add
 * the slug to the VisualizationSlug union (src/app/notes/_types.ts), the
 * import and the `case` in renderVisualization (ConceptUnitCard.tsx), and
 * `visualizationSlug` on the target concept in src/lib/sites/imat/notes/.
 *
 *   npx tsx scripts/imat/wire-visuals.ts <manifest.json> [--dry]
 *
 * Manifest: [{ "slug": "imat-x", "component": "ImatX", "concept": "imat-bmo-..." }]
 *
 * Refuses (and writes nothing) when a slug is already wired, the component
 * file is missing, the concept matches no file or several, or the concept
 * already has a figure. Keeps each file's own line endings. Idempotent only in
 * the sense that a second run refuses: run it once per manifest.
 */
import { existsSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import path from "node:path";

type Row = { slug: string; component: string; concept: string };

const TYPES = "src/app/notes/_types.ts";
const CARD = "src/app/notes/_components/ConceptUnitCard.tsx";
const NOTES = "src/lib/sites/imat/notes";
const VIZ = "src/app/notes/_components/visualizations";
const LAST_UNION = '  | "imat-chart-types";';
const LAST_IMPORT = 'import ImatChartTypes from "./visualizations/ImatChartTypes";';
const LAST_CASE = '    case "imat-chart-types":\n      return <ImatChartTypes />;';

function walk(d: string, out: string[] = []): string[] {
  for (const f of readdirSync(d)) {
    const p = path.join(d, f);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (p.endsWith(".ts")) out.push(p);
  }
  return out;
}

/** Edit with LF, write back with the file's own ending. */
function edit(file: string, fn: (lf: string) => string): [string, string] {
  const raw = readFileSync(file, "utf8");
  const crlf = raw.includes("\r\n");
  const next = fn(raw.replace(/\r\n/g, "\n"));
  return [file, crlf ? next.replace(/\n/g, "\r\n") : next];
}

function main() {
  const args = process.argv.slice(2);
  const dry = args.includes("--dry");
  const rows = JSON.parse(readFileSync(args.find((a) => !a.startsWith("--"))!, "utf8")) as Row[];
  const problems: string[] = [];
  const types = readFileSync(TYPES, "utf8");
  const notes = walk(NOTES).map((f) => ({ f, t: readFileSync(f, "utf8").replace(/\r\n/g, "\n") }));

  for (const r of rows) {
    if (!/^imat-[a-z0-9-]+$/.test(r.slug)) problems.push(`${r.slug}: slug must be imat-kebab-case`);
    if (types.includes(`"${r.slug}"`)) problems.push(`${r.slug}: already in the union`);
    if (!existsSync(path.join(VIZ, `${r.component}.tsx`))) problems.push(`${r.slug}: no ${r.component}.tsx`);
    const hits = notes.filter((n) => n.t.includes(`slug: "${r.concept}",\n`));
    if (hits.length !== 1) problems.push(`${r.concept}: matched ${hits.length} files`);
    else {
      const t = hits[0].t;
      const start = t.indexOf(`slug: "${r.concept}",\n`);
      const next = t.indexOf('kind: "', start);
      if (t.slice(start, next < 0 ? undefined : next).includes("visualizationSlug")) problems.push(`${r.concept}: already has a figure`);
    }
  }
  if (new Set(rows.map((r) => r.concept)).size !== rows.length) problems.push("a concept appears twice in the manifest");
  if (problems.length) {
    console.log(problems.map((p) => `!! ${p}`).join("\n"));
    console.log("nothing written");
    process.exit(1);
  }

  const writes: [string, string][] = [];
  writes.push(
    edit(TYPES, (t) => {
      if (!t.includes(LAST_UNION)) throw new Error("union anchor not found");
      // New members go just above the last one, so the anchor survives for the next run.
      const added = rows.map((r) => `  | "${r.slug}"`).join("\n");
      return t.replace(LAST_UNION, `${added}\n${LAST_UNION}`);
    }),
  );
  writes.push(
    edit(CARD, (t) => {
      if (!t.includes(LAST_IMPORT) || !t.includes(LAST_CASE)) throw new Error("card anchors not found");
      const imports = rows.map((r) => `import ${r.component} from "./visualizations/${r.component}";`).join("\n");
      const cases = rows.map((r) => `    case "${r.slug}":\n      return <${r.component} />;`).join("\n");
      return t.replace(LAST_IMPORT, `${LAST_IMPORT}\n${imports}`).replace(LAST_CASE, `${LAST_CASE}\n${cases}`);
    }),
  );
  const byFile = new Map<string, Row[]>();
  for (const r of rows) {
    const f = notes.find((n) => n.t.includes(`slug: "${r.concept}",\n`))!.f;
    byFile.set(f, [...(byFile.get(f) ?? []), r]);
  }
  for (const [f, rs] of byFile) {
    writes.push(
      edit(f, (t) =>
        rs.reduce(
          (acc, r) => acc.replace(new RegExp(`\\n([ \\t]+)slug: "${r.concept}",\\n`), (_m, ind: string) => `\n${ind}slug: "${r.concept}",\n${ind}visualizationSlug: "${r.slug}",\n`),
          t,
        ),
      ),
    );
  }
  if (dry) {
    console.log(`dry run: would wire ${rows.length} figures into ${byFile.size} notes files`);
    return;
  }
  for (const [f, t] of writes) writeFileSync(f, t);
  console.log(`wired ${rows.length} figures (${byFile.size} notes files)`);
}

main();
