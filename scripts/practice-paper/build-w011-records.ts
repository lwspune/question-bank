/**
 * Assemble `data/gat-mock-w011.records.json` for NDA GAT MOCK W011.
 *
 * Three sources are merged, each answering a different question:
 *   - the pandoc EXTRACT  -> stem, options, printed key, RC context   (the paper)
 *   - the BLIND derivations -> subject/chapter/subtopic/difficulty/solution
 *                              for the 128 non-duplicate rows
 *   - the matched BANK rows -> the same fields for the 22 duplicates, whose
 *                              twin already carries a reviewed solution
 *
 * plus `rulings.json`, the human adjudication of every blind-vs-key
 * disagreement. A ruling with action CORRECT replaces the printed key; a ruling
 * with action SURFACE deliberately does not, and rides as a reviewNote instead.
 *
 *   npx tsx scripts/practice-paper/build-w011-records.ts <scratchpadDir> [--write]
 *
 * Dry by default: prints the composition and every validation problem, and
 * writes nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
if (!url || !key) throw new Error("missing NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY");

const dir = process.argv[2];
const write = process.argv.includes("--write");
if (!dir) throw new Error("usage: build-w011-records.ts <scratchpadDir> [--write]");

const read = <T,>(f: string): T => JSON.parse(readFileSync(join(dir, f), "utf8")) as T;

type Extract = {
  n: number;
  stem: string;
  optA: string;
  optB: string;
  optC: string;
  optD: string;
  printedKey: string;
  context?: string;
  setLabel?: string;
};
type Derived = {
  n: number;
  answer: string;
  subject: string;
  chapter: string;
  subtopic: string;
  difficulty: string;
  solution: string;
  note?: string;
  confidence?: string;
};
type Ruling = {
  /**
   * CORRECT     - replace the printed key (a proven key error)
   * SURFACE     - keep the printed key, record the disagreement as a note
   * REPAIR_STEM - a `find`/`replace` fix for a defect the SOURCE documents
   * FLAW        - the printed question is defective; hold it out of the public
   *               bank and say why
   */
  action: "CORRECT" | "SURFACE" | "REPAIR_STEM" | "FLAW";
  answer?: string;
  printedKey?: string;
  blind?: string;
  find?: string;
  replace?: string;
  reason: string;
  recommendation?: string;
};

const OUT = join(__dirname, "data", "gat-mock-w011.records.json");

async function main() {
  const extract = read<Extract[]>("w011.extract.json");
  const rulings = read<Record<string, Ruling>>("rulings.json");
  const dupMap = read<Record<string, string>>("dupfull.json");

  const derived = new Map<number, Derived>();
  for (const f of [
    "derived_english.json",
    "derived_chemistry.json",
    "derived_biology.json",
    "derived_physics.json",
    "derived_gk.json",
  ]) {
    for (const d of read<Derived[]>(f)) {
      if (derived.has(d.n)) throw new Error(`duplicate derivation for Q${d.n}`);
      derived.set(d.n, d);
    }
  }

  // --- the 22 duplicates inherit their twin's classification + solution -----
  const db = createClient(url!, key!, { auth: { persistSession: false } });
  const ids = Object.values(dupMap);
  const { data, error } = await db
    .from("questions")
    .select("id, difficulty, solution, subjects(name), chapters(name), subtopics(name)")
    .in("id", ids);
  if (error) throw new Error(error.message);
  type BankRow = {
    id: string;
    difficulty: string;
    solution: string | null;
    subjects: { name: string } | null;
    chapters: { name: string } | null;
    subtopics: { name: string } | null;
  };
  const bank = new Map((data as unknown as BankRow[]).map((r) => [r.id, r]));

  const problems: string[] = [];
  const records = extract
    .slice()
    .sort((a, b) => a.n - b.n)
    .map((e) => {
      const dupId = dupMap[String(e.n)];
      const ruling = rulings[String(e.n)];

      let subject: string, chapter: string, subtopic: string, difficulty: string, solution: string;
      let status: "new" | "dup" | "flawed";

      if (dupId) {
        const b = bank.get(dupId);
        if (!b) {
          problems.push(`Q${e.n}: dup id ${dupId} did not resolve`);
          return null;
        }
        subject = b.subjects?.name ?? "";
        chapter = b.chapters?.name ?? "";
        subtopic = b.subtopics?.name ?? "";
        difficulty = b.difficulty;
        solution = b.solution ?? "";
        status = "dup";
      } else {
        const d = derived.get(e.n);
        if (!d) {
          problems.push(`Q${e.n}: no blind derivation and not a dup`);
          return null;
        }
        subject = d.subject;
        chapter = d.chapter;
        subtopic = d.subtopic;
        difficulty = d.difficulty;
        solution = d.solution;
        status = "new";
      }

      // answer: the printed key, unless a CORRECT ruling replaced it
      let answer = e.printedKey;
      let stem = e.stem;
      const notes: string[] = [];
      if (ruling?.action === "CORRECT" && ruling.answer) {
        answer = ruling.answer;
        notes.push(`Key corrected from ${ruling.printedKey} to ${ruling.answer}. ${ruling.reason}`);
      } else if (ruling?.action === "SURFACE") {
        notes.push(
          `Printed key ${ruling.printedKey} retained; blind derivation gave ${ruling.blind}. ${ruling.reason}`,
        );
      } else if (ruling?.action === "REPAIR_STEM") {
        // Must match EXACTLY ONCE. A repair that silently misses, or applies
        // twice, is worse than no repair at all.
        const hits = ruling.find ? stem.split(ruling.find).length - 1 : 0;
        if (hits !== 1) {
          problems.push(`Q${e.n}: stem repair matched ${hits} times, expected exactly 1`);
        } else {
          stem = stem.split(ruling.find!).join(ruling.replace!);
          notes.push(`Stem repaired. ${ruling.reason}`);
        }
      } else if (ruling?.action === "FLAW") {
        status = "flawed";
        notes.push(`FLAWED as printed. ${ruling.reason}`);
      }
      const d = derived.get(e.n);
      if (d?.note) notes.push(d.note);

      const rec: Record<string, unknown> = {
        n: e.n,
        subject,
        chapter,
        subtopic,
        difficulty,
        status,
        stem,
        optA: e.optA,
        optB: e.optB,
        optC: e.optC,
        optD: e.optD,
        answer,
        solution,
      };
      if (e.context) rec.context = e.context;
      if (e.setLabel) rec.setLabel = e.setLabel;
      if (notes.length) rec.reviewNote = notes.join(" | ");

      // --- validation --------------------------------------------------
      if (!["A", "B", "C", "D"].includes(String(answer)))
        problems.push(`Q${e.n}: bad answer ${answer}`);
      if (!["EASY", "MODERATE", "HARD"].includes(difficulty))
        problems.push(`Q${e.n}: bad difficulty ${difficulty}`);
      for (const l of ["A", "B", "C", "D"] as const)
        if (!String(rec["opt" + l]).trim()) problems.push(`Q${e.n}: empty option ${l}`);
      if (new Set([e.optA, e.optB, e.optC, e.optD]).size < 4)
        problems.push(`Q${e.n}: duplicate option text`);
      if (!subject || !chapter || !subtopic) problems.push(`Q${e.n}: incomplete classification`);
      if (!solution.trim()) problems.push(`Q${e.n}: empty solution`);
      if (/[×÷≈→²³]/.test(solution)) problems.push(`Q${e.n}: unicode math in solution`);
      return rec;
    })
    .filter(Boolean) as Record<string, unknown>[];

  // --- composition report ------------------------------------------------
  const by = (k: string) =>
    records.reduce<Record<string, number>>((a, r) => {
      const v = String(r[k]);
      a[v] = (a[v] ?? 0) + 1;
      return a;
    }, {});
  console.log("records      :", records.length);
  console.log("status       :", by("status"));
  console.log("subject      :", by("subject"));
  console.log("difficulty   :", by("difficulty"));
  console.log("reviewNotes  :", records.filter((r) => r.reviewNote).length);

  // the PaperSpec `subjects` block, derived rather than hand-written
  const spec: Record<string, Record<string, string[]>> = {};
  for (const r of records) {
    const s = String(r.subject);
    const c = String(r.chapter);
    spec[s] ??= {};
    spec[s][c] ??= [];
    if (!spec[s][c].includes(String(r.subtopic))) spec[s][c].push(String(r.subtopic));
  }
  for (const s of Object.keys(spec)) for (const c of Object.keys(spec[s])) spec[s][c].sort();

  if (problems.length) {
    console.log(`\nPROBLEMS (${problems.length}):`);
    for (const p of problems) console.log("  " + p);
  } else {
    console.log("\nno validation problems");
  }

  if (write) {
    writeFileSync(OUT, JSON.stringify(records, null, 1), "utf8");
    writeFileSync(join(dir, "spec-subjects.json"), JSON.stringify(spec, null, 2), "utf8");
    console.log(`\nwrote ${OUT}`);
    console.log(`wrote ${join(dir, "spec-subjects.json")} (paste into config.ts)`);
  } else {
    console.log("\nDRY RUN - pass --write to emit the records file");
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
