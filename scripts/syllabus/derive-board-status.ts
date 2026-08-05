/**
 * Fill the State Board spine's per-exam column by DERIVING it from the authored
 * exam rulings, so the two directions cannot disagree.
 *
 *   npx tsx scripts/syllabus/derive-board-status.ts --subject=physics
 *   npx tsx scripts/syllabus/derive-board-status.ts --subject=physics --apply
 *
 * The rule, and why it is deliberately conservative:
 *
 *   cited by a LIVE exam subtopic  -> `partial`
 *   cited only by an OLD-syllabus chapter -> `not`
 *   not cited at all               -> NO ROW  (stays unassessed / "?")
 *
 * `partial`, not `full`: a pointer proves the exam asks SOMETHING in that
 * section, never that the whole section is required. And an uncited section gets
 * no row because "no exam subtopic cites it" conflates *not required* with *not
 * sampled by the bank* — writing `not` there would be exactly the confident
 * unreviewed verdict this map exists to avoid ([[default-becomes-assertion]]).
 *
 * A citation ROLLS UP, not down: citing 11.8.2 means 11.8 is at least partly
 * required, but citing 11.8 does not mean every sub-section under it is.
 *
 * REFUSES to overwrite an existing authored column (Chemistry's was hand-written
 * long before the mappings existed) unless --force is passed.
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
import { requireSubjectArg } from "./subject-arg";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

/** "11.8.2" -> ["11.8.2", "11.8"]. Ancestors only; never descendants. */
function selfAndAncestors(sectionNo: string): string[] {
  const parts = sectionNo.trim().split(".");
  const out: string[] = [];
  for (let n = parts.length; n >= 2; n -= 1) out.push(parts.slice(0, n).join("."));
  return out;
}

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

  // (sbConceptId, exam) -> { live: Set<subtopic>, old: Set<subtopic> }
  type Hit = { live: Set<string>; old: Set<string> };
  const hits = new Map<string, Hit>();

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
      for (const ref of selfAndAncestors(no)) {
        const target = sbByRef.get(`${cls}|${ref}`);
        if (!target) continue;
        const k = `${target.id}|${exam}`;
        if (!hits.has(k)) hits.set(k, { live: new Set(), old: new Set() });
        (isOld ? hits.get(k)!.old : hits.get(k)!.live).add(name);
      }
    }
  }

  const rows = [...hits.entries()].map(([k, h]) => {
    const [concept_id, exam] = [k.slice(0, k.lastIndexOf("|")), k.slice(k.lastIndexOf("|") + 1)];
    const live = [...h.live].sort();
    const old = [...h.old].sort();
    const status = live.length ? "partial" : "not";
    const note = live.length
      ? `Derived: ${exam} asks ${live.length} subtopic(s) here — ${live.slice(0, 4).join("; ")}${live.length > 4 ? "; …" : ""}. 'partial' because a pointer proves the exam asks something in this section, not that all of it is required.`
      : `Derived: only ${exam} chapters no longer set point here (${old.slice(0, 3).join("; ")}). Not required by the live syllabus.`;
    return { concept_id, exam, status, note: note.slice(0, 500) };
  });

  const perExam = new Map<string, { partial: number; not: number }>();
  for (const r of rows) {
    if (!perExam.has(r.exam)) perExam.set(r.exam, { partial: 0, not: 0 });
    const s = perExam.get(r.exam)!;
    if (r.status === "partial") s.partial += 1;
    else s.not += 1;
  }

  console.log(`\n${cfg.label} — deriving State Board status from exam rulings`);
  console.log(`  State Board sections: ${sb.length}`);
  for (const [exam, s] of [...perExam].sort()) {
    const touched = s.partial + s.not;
    console.log(
      `  ${exam.padEnd(10)} partial ${String(s.partial).padStart(4)} · not ${String(s.not).padStart(3)} · unassessed ${String(sb.length - touched).padStart(4)}`,
    );
  }
  console.log(`  total rows to write: ${rows.length}`);

  // Guard: never silently replace an authored column.
  const sbIds = new Set(sb.map((c) => c.id));
  const existing = data.links.filter((l) => sbIds.has(l.concept_id));
  if (existing.length && !force) {
    console.error(
      `\nREFUSING TO WRITE — the ${cfg.label} State Board spine already has ${existing.length} link row(s).`,
    );
    console.error("  They may be hand-authored (Chemistry's were). Re-run with --force to replace.");
    process.exit(1);
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
