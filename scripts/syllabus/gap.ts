/**
 * Syllabus gap report over the concept map (migration 0065).
 *
 *   npx tsx scripts/syllabus/gap.ts                 # coverage per exam
 *   npx tsx scripts/syllabus/gap.ts "JEE Mains"     # per-chapter detail for one exam
 *   npx tsx scripts/syllabus/gap.ts --subject=physics
 *
 * Scoped to ONE subject (Chemistry unless --subject says otherwise): the table
 * holds every subject's spines, so an unscoped total mixes them.
 *
 * Reports THREE distinct states per exam, and keeping them distinct is the whole
 * point of the table: `full`/`partial`/`not` are adjudicated judgements, while a
 * concept with NO row for that exam is NOT YET ASSESSED. A report that merged the
 * last two would show a never-reviewed exam as needing nothing.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { SYLLABUS_EXAMS, isSyllabusExam } from "./lib";
import { requireSubjectArg } from "./subject-arg";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

type ConceptRow = { id: string; class: number; chapter_no: number; chapter_name: string };
type ExamRow = { concept_id: string; exam: string; status: string };

function bar(n: number, total: number, width = 24): string {
  const filled = total === 0 ? 0 : Math.round((n / total) * width);
  return "█".repeat(filled) + "·".repeat(width - filled);
}

async function main() {
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("NEXT_PUBLIC_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  /**
   * Pages past the PostgREST 1000-row cap — the concept map is already 864 rows
   * and grows with every subject added. A closure rather than a top-level
   * generic so the Supabase client keeps its inferred type.
   */
  async function fetchAll<T>(
    table: string,
    columns: string,
    eq?: { column: string; value: string },
  ): Promise<T[]> {
    const out: T[] = [];
    const PAGE = 1000;
    for (let from = 0; ; from += PAGE) {
      let q = db.from(table).select(columns);
      if (eq) q = q.eq(eq.column, eq.value);
      const { data, error } = await q.range(from, from + PAGE - 1);
      if (error) throw new Error(`${table}: ${error.message}`);
      const rows = (data ?? []) as unknown as T[];
      out.push(...rows);
      if (rows.length < PAGE) break;
    }
    return out;
  }

  // Scoped to ONE subject: this table holds every subject's spines, so an
  // unfiltered read reports a coverage total that silently mixes them and the
  // "UNASSESSED" column becomes every other subject's concepts.
  const cfg = requireSubjectArg(process.argv);
  const concepts = await fetchAll<ConceptRow>(
    "syllabus_concepts",
    "id,class,chapter_no,chapter_name",
    { column: "subject", value: cfg.subject },
  );
  // syllabus_concept_exams has NO subject column — a link is scoped only through
  // the concept it points at, so it must be filtered by membership, not by a
  // column. Skipping this would leave every other subject's rulings in the
  // per-exam counts while `concepts` held one subject, making "UNASSESSED"
  // (concepts - rows) understate and potentially go negative.
  const conceptIds = new Set(concepts.map((c) => c.id));
  const allLinks = await fetchAll<ExamRow>("syllabus_concept_exams", "concept_id,exam,status");
  const links = allLinks.filter((l) => conceptIds.has(l.concept_id));

  // First NON-FLAG argument: `--subject=` may sit in any position.
  const target = process.argv.slice(2).find((a) => !a.startsWith("--"));
  if (target && !isSyllabusExam(target)) {
    throw new Error(`unknown exam "${target}". Known: ${SYLLABUS_EXAMS.join(", ")}`);
  }

  console.log(`\nSubject: ${cfg.label}`);
  console.log(`\nConcept map: ${concepts.length} concepts ` +
    `(Std 11: ${concepts.filter((c) => c.class === 11).length}, ` +
    `Std 12: ${concepts.filter((c) => c.class === 12).length})\n`);

  if (!target) {
    console.log("Coverage by exam");
    console.log("  exam                 full  partial   not   UNASSESSED");
    for (const exam of SYLLABUS_EXAMS) {
      const rows = links.filter((l) => l.exam === exam);
      const by = (s: string) => rows.filter((r) => r.status === s).length;
      const unassessed = concepts.length - rows.length;
      console.log(
        `  ${exam.padEnd(18)} ${String(by("full")).padStart(5)}` +
        `${String(by("partial")).padStart(9)}${String(by("not")).padStart(6)}` +
        `${String(unassessed).padStart(13)}  ${bar(rows.length, concepts.length)}`,
      );
    }
    console.log("\n  UNASSESSED = no row yet for that exam. It is NOT the same as");
    console.log("  'out of syllabus', which is recorded explicitly as status='not'.");
    console.log(`\n  Detail for one exam:  npm run syllabus:gap -- "JEE Mains"\n`);
    return;
  }

  const status = new Map(
    links.filter((l) => l.exam === target).map((l) => [l.concept_id, l.status]),
  );
  const chapters = new Map<string, { cls: number; no: number; name: string; ids: string[] }>();
  for (const c of concepts) {
    const key = `${c.class}|${c.chapter_no}`;
    if (!chapters.has(key)) {
      chapters.set(key, { cls: c.class, no: c.chapter_no, name: c.chapter_name, ids: [] });
    }
    chapters.get(key)!.ids.push(c.id);
  }

  console.log(`${target} — per chapter\n`);
  console.log("  Std  Ch  Chapter                                   n  full  part   not  unasd");
  for (const ch of [...chapters.values()].sort((a, b) => a.cls - b.cls || a.no - b.no)) {
    const s = ch.ids.map((id) => status.get(id));
    const count = (v?: string) => s.filter((x) => x === v).length;
    console.log(
      `  ${String(ch.cls).padStart(3)} ${String(ch.no).padStart(3)}  ${ch.name.slice(0, 38).padEnd(38)}` +
      `${String(ch.ids.length).padStart(4)}${String(count("full")).padStart(6)}` +
      `${String(count("partial")).padStart(6)}${String(count("not")).padStart(6)}` +
      `${String(count(undefined)).padStart(7)}`,
    );
  }
  console.log();
}

main().catch((err) => {
  console.error(err instanceof Error ? err.message : err);
  process.exit(1);
});
