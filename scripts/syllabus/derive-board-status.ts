/**
 * Fill the State Board spine's per-exam column by DERIVING it from the authored
 * exam rulings, so the two directions cannot disagree.
 *
 *   npx tsx scripts/syllabus/derive-board-status.ts --subject=physics
 *   npx tsx scripts/syllabus/derive-board-status.ts --subject=physics --apply
 *
 * The rules, each the weakest claim that fits the evidence:
 *
 *   exactly cited + no sub-sections -> `full`
 *   every direct child is `full`    -> `full`
 *   any other live citation         -> `partial`
 *   cited only by an OLD-syllabus chapter -> `not`
 *   not cited at all                -> NO ROW  (stays unassessed / "?")
 *
 * An uncited section gets no row because "no exam subtopic cites it" conflates
 * *not required* with *not sampled by the bank* — writing `not` there would be
 * exactly the confident unreviewed verdict this map exists to avoid
 * ([[default-becomes-assertion]]).
 *
 * A citation ROLLS UP, not down: citing 11.8.2 means 11.8 is at least partly
 * required, but citing 11.8 does not mean every sub-section under it is.
 *
 * ON `full`, WHICH THIS STEP USED TO REFUSE TO WRITE. The old rule wrote
 * `partial` for every cited section, reasoning that a pointer proves the exam
 * asks SOMETHING there and not that all of it is required. That holds for a
 * section with sub-sections and fails for a LEAF, which is the finest grain the
 * map has: "part of a leaf" is not a statement it can express or a reader can
 * act on, so the hedge described this script's confidence rather than the
 * syllabus. Measured 2026-08-18, the cost was that Physics and Maths rendered
 * ZERO `full` cells between them against Chemistry's 1,032. The verdict logic
 * now lives in `deriveSectionStatuses` in ./lib, with its own tests.
 *
 * REFUSES to overwrite an AUTHORED column (Chemistry's was hand-written long
 * before the mappings existed) unless --force is passed. A column this script
 * wrote itself is re-derivable by design and needs no flag — the two are told
 * apart by the note prefix every derived row carries.
 */
import { join } from "node:path";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import {
  SPINE,
  splitCoveredBy,
  parseCoveredRef,
  splitPyqCount,
  examOfSpine,
  isExamSpine,
} from "../../src/lib/syllabus/summary";
import { loadSyllabusData, loadOldSyllabusByExam } from "../../src/lib/syllabus/query";
import {
  directChildrenOf,
  deriveSectionStatuses,
  type ConceptStatus,
  type SectionEvidence,
} from "./lib";
import { requireSubjectArg } from "./subject-arg";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** "11.8.2" -> ["11.8.2", "11.8"]. Ancestors only; never descendants. */
function selfAndAncestors(sectionNo: string): string[] {
  const parts = sectionNo.trim().split(".");
  const out: string[] = [];
  for (let n = parts.length; n >= 2; n -= 1) out.push(parts.slice(0, n).join("."));
  return out;
}

/** Every note this script writes starts with it; the guard reads it back. */
const DERIVED_PREFIX = "Derived:";

async function main() {
  const apply = process.argv.includes("--apply");
  const force = process.argv.includes("--force");
  const cfg = requireSubjectArg(process.argv);
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  ) as unknown as SupabaseClient;

  const data = await loadSyllabusData(db, cfg.subject);
  const sb = data.concepts.filter((c) => c.source === SPINE.stateBoard);
  if (!sb.length) throw new Error(`no State Board spine for ${cfg.label}`);

  const sbByRef = new Map(sb.map((c) => [`${c.class}|${c.section_no}`, c]));
  const linkOf = new Map(data.links.map((l) => [`${l.concept_id}|${l.exam}`, l]));

  const examSpines = [...new Set(data.concepts.map((c) => c.source))].filter(isExamSpine);
  const oldByExam = await loadOldSyllabusByExam(db, {
    subject: cfg.subject,
    liveFromYear: cfg.liveFromYear,
    exams: examSpines.map(examOfSpine),
  });

  // (exam, sectionRef) -> evidence. Keyed on the SECTION, not the concept id,
  // because a verdict now depends on a section's children and that relation
  // lives in the refs.
  const evidenceByExam = new Map<string, Map<string, SectionEvidence>>();
  const evidenceFor = (exam: string, ref: string): SectionEvidence => {
    let m = evidenceByExam.get(exam);
    if (!m) {
      m = new Map();
      evidenceByExam.set(exam, m);
    }
    let e = m.get(ref);
    if (!e) {
      e = { exactLive: [], rolledUpLive: [], old: [] };
      m.set(ref, e);
    }
    return e;
  };

  for (const c of data.concepts) {
    // Exam spines fill their own column; the NCERT spine fills the "CBSE Class
    // 12" column, which asks the INVERSE of what the NCERT rulings record — they
    // say "which State Board section teaches this NCERT section", and inverting
    // that gives "is this State Board section covered by NCERT".
    const isNcert = c.source === SPINE.ncert;
    if (!isExamSpine(c.source) && !isNcert) continue;
    const exam = isNcert ? "CBSE Class 12" : examOfSpine(c.source);
    const covered = linkOf.get(`${c.id}|${SPINE.stateBoard}`)?.covered_by;
    if (!covered) continue;
    // A book has no dead chapters — only an exam drops topics from its syllabus.
    const isOld = isNcert ? false : (oldByExam.get(exam)?.has(c.chapter_name) ?? false);
    const name = splitPyqCount(c.concept).name;

    for (const raw of splitCoveredBy(covered)) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      const chain = selfAndAncestors(no);
      for (let i = 0; i < chain.length; i += 1) {
        const ref = `${cls}|${chain[i]}`;
        if (!sbByRef.has(ref)) continue;
        const e = evidenceFor(exam, ref);
        // i === 0 is the section the ruling actually NAMED. Everything after it
        // is an ancestor the citation rolled up into, which is weaker evidence
        // and must not earn the ancestor a `full`.
        const bucket = isOld ? e.old : i === 0 ? e.exactLive : e.rolledUpLive;
        if (!bucket.includes(name)) bucket.push(name);
      }
    }
  }

  const children = directChildrenOf(sb.map((c) => `${c.class}|${c.section_no}`));

  /** Why a cell says what it says. The note is the only audit trail a reader gets. */
  const noteFor = (
    exam: string,
    ref: string,
    status: ConceptStatus,
    e: SectionEvidence,
  ): string => {
    const live = [...e.exactLive, ...e.rolledUpLive].sort();
    const shown = live.slice(0, 4).join("; ") + (live.length > 4 ? "; …" : "");
    if (status === "not") {
      const old = [...e.old].sort();
      return `Derived: only ${exam} chapters no longer set point here (${old.slice(0, 3).join("; ")}). Not required by the live syllabus.`;
    }
    const head = `Derived: ${exam} asks ${live.length} subtopic(s) here — ${shown}.`;
    if (status === "full") {
      return `${head} 'full' because ${
        (children.get(ref) ?? []).length === 0
          ? "the ruling names this section itself and it has no sub-sections, so there is no finer grain to withhold"
          : "every sub-section of it is itself fully required"
      }.`;
    }
    return `${head} 'partial' because ${
      e.exactLive.length === 0
        ? "no ruling names this section itself — the citation is to something beneath it"
        : "a pointer proves the exam asks something in this section, not that all of it is required"
    }.`;
  };

  const rows = [...evidenceByExam.entries()].flatMap(([exam, evidence]) =>
    [...deriveSectionStatuses(evidence, children).entries()].map(([ref, status]) => ({
      concept_id: sbByRef.get(ref)!.id,
      exam,
      status,
      note: noteFor(exam, ref, status, evidence.get(ref)!).slice(0, 500),
    })),
  );

  const perExam = new Map<string, { full: number; partial: number; not: number }>();
  for (const r of rows) {
    if (!perExam.has(r.exam)) perExam.set(r.exam, { full: 0, partial: 0, not: 0 });
    perExam.get(r.exam)![r.status] += 1;
  }

  console.log(`
${cfg.label} — deriving State Board status from exam rulings`);
  console.log(`  State Board sections: ${sb.length}`);
  for (const [exam, s] of [...perExam].sort()) {
    const touched = s.full + s.partial + s.not;
    console.log(
      `  ${exam.padEnd(14)} full ${String(s.full).padStart(4)} · partial ${String(s.partial).padStart(4)} · not ${String(s.not).padStart(3)} · unassessed ${String(sb.length - touched).padStart(4)}`,
    );
  }
  console.log(`  total rows to write: ${rows.length}`);

  // Guard: never silently replace an AUTHORED column.
  //
  // Re-running this script is the designed workflow, so refusing on the mere
  // presence of rows would mean passing --force every time — and --force is the
  // one thing standing between a typo and Chemistry's 863 hand-authored rows,
  // which have no source of record and cannot be regenerated. So the two kinds
  // are told apart by the prefix every row this script writes carries: a column
  // it wrote itself is replaced freely, anything else still needs the flag.
  const sbIds = new Set(sb.map((c) => c.id));
  const existing = data.links.filter((l) => sbIds.has(l.concept_id));
  const authored = existing.filter((l) => !(l.note ?? "").startsWith(DERIVED_PREFIX));
  if (authored.length && !force) {
    console.error(
      `
REFUSING TO WRITE — ${authored.length} of the ${cfg.label} State Board spine's ${existing.length} link row(s) were NOT written by this script.`,
    );
    console.error("  Hand-authored rulings have no source of record (Chemistry's were authored");
    console.error("  from a docx that no longer exists). Re-run with --force to replace them.");
    process.exit(1);
  }
  if (existing.length) {
    console.log(
      `  replacing ${existing.length - authored.length} previously-derived row(s)` +
        (authored.length ? ` and ${authored.length} authored row(s) (--force)` : ""),
    );
  }

  if (!apply) {
    console.log("\nDRY RUN — nothing written. Re-run with --apply.");
    return;
  }
  for (let i = 0; i < rows.length; i += 200) {
    const { error } = await db
      .from("syllabus_concept_exams")
      .upsert(rows.slice(i, i + 200), { onConflict: "concept_id,exam" });
    if (error) throw new Error(`links: ${error.message}`);
  }
  console.log(`\nDone. ${rows.length} derived row(s) written.`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
