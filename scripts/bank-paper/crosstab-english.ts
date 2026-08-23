/**
 * Compare BLIND re-derivations against the stored CDS English keys.
 *
 * This is the first point at which both halves are in one place — the dump
 * withheld the key, and the deriving agents never saw it. Everything here is
 * reporting: a disagreement is a QUESTION for a human, never a verdict. The
 * corpus this checks has no official key at all, so "the stored key disagrees"
 * means one of two derivations is wrong and only reading the item settles it.
 *
 *   npx tsx scripts/bank-paper/crosstab-english.ts <dir>
 *
 * Exit code is always 0 — this is triage, not a gate.
 */
import { readFileSync, readdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const dir = process.argv[2];
if (!dir) throw new Error("usage: crosstab-english.ts <dir>");

type Blind = {
  id: string; chapter: string; setId: string; sourceFile: string | null;
  questionNumber: string | null; directions: string | null; stem: string;
  options: { label: string; text: string }[];
};
type Derived = { id: string; derived: string; confidence: string; why: string; task?: string };

const read = <T>(f: string): T => JSON.parse(readFileSync(join(dir, f), "utf8")) as T;

const blind = read<Blind[]>("blind.json");
const stored = read<{ id: string; storedKey: string | null }[]>("stored-keys.json");

const derivedFiles = readdirSync(dir).filter((f) => f.startsWith("derived_") && f.endsWith(".json"));
if (!derivedFiles.length) throw new Error(`no derived_*.json in ${dir}`);
const derived: Derived[] = derivedFiles.flatMap((f) => read<Derived[]>(f));

const byId = new Map(blind.map((b) => [b.id, b]));
const keyById = new Map(stored.map((s) => [s.id, s.storedKey]));
const derById = new Map<string, Derived>();
for (const d of derived) {
  if (derById.has(d.id)) {
    console.log(`WARNING: ${d.id} derived twice — keeping the first`);
    continue;
  }
  derById.set(d.id, d);
}

// Coverage is reported, never assumed: a missing derivation is a gap in the
// check, and silently treating it as agreement is the failure this guards.
const missing = blind.filter((b) => !derById.has(b.id));
const orphan = derived.filter((d) => !byId.has(d.id));

type Row = { b: Blind; stored: string | null; d: Derived };
const rows: Row[] = [];
for (const b of blind) {
  const d = derById.get(b.id);
  if (!d) continue;
  rows.push({ b, stored: keyById.get(b.id) ?? null, d });
}

const agree = rows.filter((r) => r.stored === r.d.derived);
const disagree = rows.filter((r) => r.stored !== r.d.derived);

const pct = (n: number, d: number) => (d === 0 ? "n/a" : `${((100 * n) / d).toFixed(1)}%`);

console.log(`crosstab — ${rows.length} of ${blind.length} blind rows have a derivation`);
if (missing.length) {
  const byCh = new Map<string, number>();
  for (const m of missing) byCh.set(m.chapter, (byCh.get(m.chapter) ?? 0) + 1);
  const summary = [...byCh.entries()].sort().map(([c, n]) => `${c} ${n}`).join(", ");
  console.log(`  NOT DERIVED: ${missing.length} — ${summary}`);
}
if (orphan.length) console.log(`  ORPHAN derivations (id not in blind.json): ${orphan.length}`);
console.log(`\nAGREE    ${String(agree.length).padStart(3)}  ${pct(agree.length, rows.length)}`);
console.log(`DISAGREE ${String(disagree.length).padStart(3)}  ${pct(disagree.length, rows.length)}`);

console.log(`\nby chapter:`);
const chapters = [...new Set(rows.map((r) => r.b.chapter))].sort();
for (const c of chapters) {
  const sub = rows.filter((r) => r.b.chapter === c);
  const a = sub.filter((r) => r.stored === r.d.derived).length;
  console.log(`  ${c.padEnd(24)} ${String(a).padStart(3)}/${String(sub.length).padEnd(3)} agree  ${pct(a, sub.length)}`);
}

console.log(`\nby the DERIVER's own confidence:`);
for (const conf of ["HIGH", "MED", "LOW"]) {
  const sub = rows.filter((r) => r.d.confidence === conf);
  if (!sub.length) continue;
  const a = sub.filter((r) => r.stored === r.d.derived).length;
  console.log(`  ${conf.padEnd(6)} ${String(a).padStart(3)}/${String(sub.length).padEnd(3)} agree  ${pct(a, sub.length)}`);
}

// Full detail for every disagreement, so adjudication needs no extra query.
const report = disagree.map((r) => ({
  id: r.b.id,
  chapter: r.b.chapter,
  source: `${r.b.sourceFile} Q${r.b.questionNumber}`,
  directions: r.b.directions,
  stem: r.b.stem,
  options: r.b.options.map((o) => `${o.label}) ${o.text}`),
  storedKey: r.stored,
  derived: r.d.derived,
  deriverConfidence: r.d.confidence,
  deriverReasoning: r.d.why,
  task: r.d.task ?? null,
}));
writeFileSync(join(dir, "disagreements.json"), JSON.stringify(report, null, 1), "utf8");

console.log(`\n${disagree.length} disagreement(s) -> ${join(dir, "disagreements.json")}`);
for (const r of disagree) {
  console.log(
    `  ${r.b.chapter.padEnd(22)} ${String(r.b.sourceFile).replace("Eng_CDS_", "").replace(".pdf", "")} Q${String(r.b.questionNumber).padEnd(4)} stored=${r.stored} derived=${r.d.derived} (${r.d.confidence})`
  );
}
console.log(
  `\nA disagreement is NOT a verdict — this corpus has no official key, so it means ` +
    `two derivations differ. Read the item before changing anything.`
);
