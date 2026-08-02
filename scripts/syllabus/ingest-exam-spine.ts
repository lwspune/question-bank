/**
 * Second spine: each exam's OWN subtopics (from the question bank), with a
 * ruling on whether the State Board syllabus covers them.
 *
 *   npx tsx scripts/syllabus/ingest-exam-spine.ts          # dry-run
 *   npx tsx scripts/syllabus/ingest-exam-spine.ts --apply
 *
 * This is the INVERSE of the State Board spine already in the table:
 *   SB spine   — rows are State Board concepts; "does exam X require this?"
 *   exam spine — rows are what exam X actually asks; "does the State Board cover it?"
 * Only the second can express "exam asks something the books never teach", which
 * is the gap worth acting on.
 *
 * The spine is the BANK taxonomy, not a syllabus document, so it measures what
 * each exam demonstrably asked in the years the bank holds. Recorded per row via
 * `source` so nobody mistakes it for the full official syllabus.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";

function loadEnv() {
  require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });
}

const EXAMS = ["MHT-CET", "JEE Mains", "NDA"] as const;

/** Explicit separator. An earlier revision keyed on a raw control character, which
 *  worked but made the file binary to git. */
const SEP = " :: ";

type Ruling = ["partial" | "not", string];

/**
 * `<exam> :: <subtopic>` -> ruling. Adjudicated BY HAND against the State Board
 * chapter that would TEACH the topic — never from a probe score, and never
 * against the whole corpus, since a passing mention elsewhere is not coverage.
 *
 * Everything unlisted is `full`. That is only safe because every probe flag was
 * read: the ~15 unlisted low scorers resolved to question-format noise ("nearest
 * integer" is a JEE NAT instruction), wording misses (the book says "quantum
 * theory", not "Planck"; "IUPAC", not "nomenclature") or a too-narrow chapter map
 * (carbanions sit in Organic Basics, not Hydrocarbons).
 */
const METALLURGY_NOTE =
  "No State Board chapter teaches extraction of metals — there is no metallurgy chapter in Std XI or Std XII. NOT ACTIONABLE: JEE removed 'General Principles and Processes of Isolation of Elements' in the 2023-24 rationalisation, and every PYQ here is 2021, none since 2023.";

const ADJUDICATED: Record<string, Ruling> = {
  [`JEE Mains${SEP}Estimation of Elements`]: [
    "not",
    "Kjeldahl and Carius are absent from the ENTIRE State Board corpus. JEE Unit 13 requires quantitative estimation of C, H, N, halogens, S and P; State Board Ch.3 teaches purification only (crystallisation, distillation, chromatography) and never elemental analysis. 15 PYQs, 13 since 2023 — the largest live JEE gap.",
  ],
  [`JEE Mains${SEP}Detection of Elements`]: [
    "not",
    "Lassaigne's test is absent from the entire State Board corpus. This is the other half of JEE Unit 13 (qualitative detection of N, S, P, halogens). 3 PYQs. Together with Estimation of Elements it forms Unit 13's analysis block, which the State Board books do not cover at all.",
  ],
  [`JEE Mains${SEP}Vitamins`]: [
    "not",
    "The State Board Std XII Biomolecules chapter contains the word 'vitamin' ZERO times — no thiamine, riboflavin, pyridoxine or ascorbic acid, and no deficiency diseases. 4 PYQs, two in 2026. Independently confirmed from the NCERT spine, whose 10.4 Vitamins section maps to the same empty chapter.",
  ],
  [`JEE Mains${SEP}Metal Carbonyls and Synergic Bonding`]: [
    "not",
    "State Board Coordination Compounds has no synergic bonding and no metal carbonyls ('carbonyl' appears once, as an organic functional group). JEE 2026 asked it directly.",
  ],
  [`JEE Mains${SEP}Atomic Orbitals`]: [
    "partial",
    "Quantum numbers and the Aufbau principle are well covered (43 and 8 mentions), but 'radial' appears ZERO times — no radial nodes, no radial distribution plots. JEE names 'variation of psi and psi-squared with r' explicitly. 10 PYQs, 7 since 2023.",
  ],
  [`JEE Mains${SEP}Oxoacids of Phosphorus`]: [
    "partial",
    "Orthophosphoric acid is covered (3 mentions) but hypophosphorous, hypophosphoric and phosphonic acids are absent. All 3 PYQs are 2021, before p-block was cut back to trends only — historical rather than live.",
  ],
  // Metallurgy: genuinely uncovered by the State Board, recorded as such rather
  // than waved away — but flagged not-actionable, since JEE dropped the chapter.
  ...Object.fromEntries(
    [
      "Refining of Metals",
      "Thermodynamics of Metallurgy",
      "Ores and Minerals",
      "Alloys",
      "Extraction of Aluminium",
      "Ellingham Diagram",
      "Roasting and Calcination",
      "Concentration of Ores",
    ].map((s) => [`JEE Mains${SEP}${s}`, ["not", METALLURGY_NOTE] as Ruling]),
  ),
};

async function main() {
  const apply = process.argv.includes("--apply");
  loadEnv();
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("service-role env required");
  const db = createClient(url, key, { auth: { persistSession: false } });

  type Row = { exam: string; chapter: string; subtopic: string; n: number };
  const counts = new Map<string, Row>();
  for (let from = 0; ; from += 1000) {
    const { data, error } = await db
      .from("questions")
      .select("exams!inner(name),subjects!inner(name),chapters!inner(name),subtopics!inner(name)")
      .eq("visibility", "PUBLIC")
      .eq("question_kind", "pyq")
      .range(from, from + 999);
    if (error) throw new Error(error.message);
    const batch = (data ?? []) as unknown as Record<string, { name: string }>[];
    for (const r of batch) {
      const subject = (r as never as { subjects: { name: string } }).subjects?.name ?? "";
      const exam = (r as never as { exams: { name: string } }).exams?.name ?? "";
      if (!/chem/i.test(subject) || !(EXAMS as readonly string[]).includes(exam)) continue;
      const chapter = (r as never as { chapters: { name: string } }).chapters.name;
      const subtopic = (r as never as { subtopics: { name: string } }).subtopics.name;
      const k = [exam, chapter, subtopic].join("|");
      const hit = counts.get(k);
      if (hit) hit.n += 1;
      else counts.set(k, { exam, chapter, subtopic, n: 1 });
    }
    if (batch.length < 1000) break;
  }

  const rows = [...counts.values()].sort(
    (a, b) =>
      a.exam.localeCompare(b.exam) ||
      a.chapter.localeCompare(b.chapter) ||
      a.subtopic.localeCompare(b.subtopic),
  );

  const rulingFor = (r: Row): Ruling | undefined => ADJUDICATED[`${r.exam}${SEP}${r.subtopic}`];

  // A ruling naming a subtopic that no longer exists would silently do nothing.
  const known = new Set(rows.map((r) => `${r.exam}${SEP}${r.subtopic}`));
  const orphans = Object.keys(ADJUDICATED).filter((k) => !known.has(k));
  if (orphans.length) {
    console.error(`\nREFUSING TO WRITE — ${orphans.length} ruling(s) name no live subtopic:`);
    for (const o of orphans) console.error("  " + o);
    process.exitCode = 1;
    return;
  }

  const tally = new Map<string, { full: number; partial: number; not: number }>();
  for (const e of EXAMS) tally.set(e, { full: 0, partial: 0, not: 0 });
  for (const r of rows) tally.get(r.exam)![rulingFor(r)?.[0] ?? "full"] += 1;

  console.log("\nExam spine — does the State Board cover what each exam asks?\n");
  console.log("  exam            subtopics   covered   partly   NOT covered");
  for (const e of EXAMS) {
    const t = tally.get(e)!;
    const n = rows.filter((r) => r.exam === e).length;
    console.log(
      `  ${e.padEnd(14)} ${String(n).padStart(9)} ${String(t.full).padStart(9)} ${String(t.partial).padStart(8)} ${String(t.not).padStart(13)}`,
    );
  }

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }

  const concepts = rows.map((r, i) => ({
    class: 12, // the spine is exam-level, not class-level; 12 satisfies the CHECK
    subject: "Chemistry",
    source: `${r.exam} bank taxonomy`,
    chapter_no: 1 + rows.filter((x) => x.exam === r.exam).findIndex((x) => x.chapter === r.chapter),
    chapter_name: r.chapter,
    section_no: `${r.exam.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`,
    concept: `${r.subtopic} (${r.n} PYQ)`,
    seq: i + 1,
  }));

  for (let i = 0; i < concepts.length; i += 200) {
    const { error } = await db
      .from("syllabus_concepts")
      .upsert(concepts.slice(i, i + 200), { onConflict: "source,class,subject,section_no" });
    if (error) throw new Error(`concepts: ${error.message}`);
  }

  const { data: back, error: backErr } = await db
    .from("syllabus_concepts")
    .select("id,source,section_no")
    .in("source", EXAMS.map((e) => `${e} bank taxonomy`));
  if (backErr) throw new Error(backErr.message);
  const idBy = new Map((back ?? []).map((r) => [`${r.source}|${r.section_no}`, r.id]));

  const links = rows
    .map((r, i) => {
      const adj = rulingFor(r);
      const sec = `${r.exam.slice(0, 3).toUpperCase()}-${String(i + 1).padStart(3, "0")}`;
      const id = idBy.get(`${r.exam} bank taxonomy|${sec}`);
      return id
        ? {
            concept_id: id,
            exam: "MH State Board",
            status: adj ? adj[0] : "full",
            note: adj ? adj[1] : null,
          }
        : null;
    })
    .filter(Boolean) as { concept_id: string; exam: string; status: string; note: string | null }[];

  // 0065 CHECKs note length at 500 and the upsert is chunked, so a violation
  // partway through would leave a half-applied ruling. Validate before writing.
  const tooLong = links.filter((l) => (l.note?.length ?? 0) > 500);
  if (tooLong.length) throw new Error(`${tooLong.length} note(s) over 500 chars — fix before writing`);

  for (let i = 0; i < links.length; i += 200) {
    const { error } = await db
      .from("syllabus_concept_exams")
      .upsert(links.slice(i, i + 200), { onConflict: "concept_id,exam" });
    if (error) throw new Error(`links: ${error.message}`);
  }
  console.log(`\nDone. ${concepts.length} exam-spine concepts, ${links.length} coverage rulings.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
