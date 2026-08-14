/**
 * The two directions must not contradict each other.
 *
 *   npx tsx scripts/syllabus/audit-directions.ts        # report
 *   npx tsx scripts/syllabus/audit-directions.ts --ci   # exit 1 on any hit
 *
 * `syllabus_concept_exams.status` on the STATE BOARD spine says "does exam X
 * require this concept?". `covered_by` on an EXAM or NCERT spine says "which
 * State Board section teaches this?". They were authored separately, months
 * apart, and nothing keeps them in step — so they drifted: on 2026-08-03, 13
 * State Board concepts were marked `status='not'` for an exam that a LIVE
 * subtopic of that same exam points straight at. The user-facing symptom was a
 * page asserting "Std XI Ch.8 is not required by JEE" directly above a table
 * showing JEE's s-Block chapter mapping into it.
 *
 * A pointer is evidence; a stored verdict is an assertion. Where they conflict,
 * the pointer wins — it names a specific section, the verdict names nothing.
 *
 * SCOPE, deliberately narrow: only JEE Mains and CBSE Class 12 can be checked,
 * because only the JEE bank taxonomy and NCERT carry `covered_by`. The NDA (47)
 * and MHT-CET (122) spines have ZERO pointers, so their State Board rulings
 * have nothing to be checked against and are NOT audited here. Do not read a
 * clean run as "all four exams verified".
 *
 * Retired exam chapters are excluded: a pointer from a chapter JEE stopped
 * setting in 2023 does NOT contradict "not required by JEE today".
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/**
 * A JEE subtopic is retired if its own newest PYQ predates this — three full
 * cycles of silence across a 3,455-question corpus, which is evidence.
 *
 * JEE-only and deliberately NOT the page's `liveFromYear`. That constant has to
 * serve all three exams at once and is pinned low because raising it would mark
 * MHT-CET (no 2026 papers at all) and NDA (~29 questions a year over 12
 * chapters) wholesale dead. This probe audits only the JEE spine — NDA and
 * MHT-CET carry no covered_by pointers — so it can use the sharper JEE-specific
 * rule without touching what the page shows.
 */
const JEE_RETIRED_BEFORE = 2024;

/**
 * Which JEE subtopics are retired, DERIVED from the bank per (chapter,
 * subtopic).
 *
 * This replaced a hardcoded list of chapter NAMES, which was wrong in both
 * directions. It had rotted — it recorded Chemistry's chapters as dead "after
 * 2021" when the completed corpus shows they ran to 2023 — and, more
 * importantly, it was at the wrong GRAIN. JEE's rationalisation retired content
 * at subtopic level, and our taxonomy files some of that into chapters that are
 * still very much set: "Gas Laws and Ideal Gas Equation" (13 PYQ, none since
 * 2023) sits inside Some Basic Concepts of Chemistry, 205 PYQ and still set in
 * 2026. A chapter-grained flag cannot express a dead subtopic in a live chapter,
 * so it reported four contradictions where BOTH rulings were correct.
 */
async function loadRetiredJeeSubtopics(db: any): Promise<Set<string>> {
  const newest = new Map<string, number>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("pyq_year,exams!inner(name),chapters!inner(name),subtopics!inner(name)")
      .eq("exams.name", "JEE Mains")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(`retired subtopics: ${error.message}`);
    const rows = (data ?? []) as {
      pyq_year: number | null;
      chapters: { name: string } | null;
      subtopics: { name: string } | null;
    }[];
    for (const r of rows) {
      if (!r.pyq_year || !r.chapters?.name || !r.subtopics?.name) continue;
      const k = `${r.chapters.name}\t${r.subtopics.name}`;
      newest.set(k, Math.max(newest.get(k) ?? 0, r.pyq_year));
    }
    if (rows.length < 1000) break;
  }
  return new Set([...newest].filter(([, y]) => y < JEE_RETIRED_BEFORE).map(([k]) => k));
}

/** Strip the " (N PYQ)" the bank spine bakes into a concept name. */
function bareSubtopic(concept: string): string {
  return concept.replace(/\s*\(\d+\s*PYQ\)\s*$/, "").trim();
}

type C = { id: string; subject: string; source: string; class: number; chapter_no: number; chapter_name: string; section_no: string; concept: string };
type L = { concept_id: string; exam: string; status: string | null; covered_by: string | null };

async function page<T>(db: any, table: string, cols: string): Promise<T[]> {
  const out: T[] = [];
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db.from(table).select(cols).range(from, from + 999);
    if (error) throw new Error(`${table}: ${error.message}`);
    out.push(...(data as T[]));
    if ((data as T[]).length < 1000) break;
  }
  return out;
}

async function main() {
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const concepts = await page<C>(db, "syllabus_concepts", "id,subject,source,class,chapter_no,chapter_name,section_no,concept");
  const links = await page<L>(db, "syllabus_concept_exams", "concept_id,exam,status,covered_by");
  const byId = new Map(concepts.map((c) => [c.id, c]));
  const retiredJee = await loadRetiredJeeSubtopics(db);

  // Every LIVE pointer into a State Board section, keyed `exam|cls|section`.
  const pointers = new Map<string, string[]>();
  for (const l of links) {
    if (l.exam !== "MH State Board" || !l.covered_by) continue;
    const c = byId.get(l.concept_id);
    if (!c) continue;
    const isJee = c.source === "JEE Mains bank taxonomy";
    const isNcert = c.source === "NCERT";
    if (!isJee && !isNcert) continue;
    // Retired ≠ contradiction. Tested per SUBTOPIC, not per chapter: the
    // rationalisation retired subtopics inside chapters that are still set.
    if (isJee && retiredJee.has(`${c.chapter_name}\t${bareSubtopic(c.concept)}`)) continue;
    const targetExam = isJee ? "JEE Mains" : "CBSE Class 12";
    for (const raw of l.covered_by.split(",").map((s) => s.trim()).filter(Boolean)) {
      const m = /^(XI|XII):(.+)$/.exec(raw);
      const cls = m ? (m[1] === "XII" ? 12 : 11) : c.class;
      const sec = (m ? m[2] : raw).trim();
      // SUBJECT-scoped: every subject's spines share source names, class
      // numbers and section refs ("XI:4.2" exists in three subjects), so an
      // unscoped key lets a Maths pointer "contradict" a Chemistry verdict —
      // 100+ manufactured hits the moment a second subject's rulings landed.
      const key = `${c.subject}|${targetExam}|${cls}|${sec}`;
      pointers.set(key, [...(pointers.get(key) ?? []), `${c.concept} [${c.chapter_name}]`]);
    }
  }

  const hits: string[] = [];
  for (const l of links) {
    if (l.status !== "not") continue;
    const c = byId.get(l.concept_id);
    if (!c || c.source !== "MH State Board") continue;
    const from = pointers.get(`${c.subject}|${l.exam}|${c.class}|${c.section_no}`);
    if (!from) continue;
    hits.push(
      `  ${c.subject.padEnd(11)} ${l.exam.padEnd(14)} Std ${c.class === 11 ? "XI " : "XII"} Ch.${String(c.chapter_no).padEnd(2)} ` +
        `${c.section_no.padEnd(7)} ${c.concept.slice(0, 44).padEnd(46)} <- ${from.join(" | ")}`,
    );
  }

  console.log("Contradictions — State Board says 'not required', a LIVE subtopic points here:");
  console.log(hits.length ? hits.join("\n") : "  none");
  console.log(`\n${hits.length} contradiction(s). Audited: JEE Mains, CBSE Class 12.`);
  console.log("NOT audited: NDA, MHT-CET — those spines carry no covered_by pointers at all.");
  if (hits.length && process.argv.includes("--ci")) process.exit(1);
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
