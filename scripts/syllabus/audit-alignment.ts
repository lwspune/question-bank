/**
 * Health of the three-book alignment table.
 *
 *   npx tsx scripts/syllabus/audit-alignment.ts
 *
 * TRIAGE, not a gate — it exits 0 and prints. There is one exception: it fails
 * if a paired row ever appears that the authored JEE->NCERT edge does not
 * support, because that is the one defect that would put a fabricated
 * correspondence in front of a teacher looking as authoritative as a real one.
 *
 * Why it exists. NCERT and JEE both point AT the State Board, so it is tempting
 * to join them through a shared State Board section. Measured against the
 * separately authored JEE->NCERT edge, that inference agrees 129 times, INVENTS
 * 39 and MISSES 25 — so the builder pairs only on the authored edge and splits
 * everything else onto its own row. This script re-measures those numbers: if
 * agreement falls after a mapping edit, the two directions have drifted and one
 * of them is now wrong.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import { loadAlignmentRows, loadOldSyllabusChapters } from "../../src/lib/syllabus/query";
import { requireSubjectArg } from "./subject-arg";
import { SPINE, splitCoveredBy, parseCoveredRef } from "../../src/lib/syllabus/summary";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

type C = { id: string; source: string; class: number; section_no: string };
type L = { concept_id: string; exam: string; covered_by: string | null };

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
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  );

  const concepts = await page<C>(db, "syllabus_concepts", "id,source,class,section_no");
  const links = await page<L>(db, "syllabus_concept_exams", "concept_id,exam,covered_by");
  const byId = new Map(concepts.map((c) => [c.id, c]));
  const ncertByKey = new Map(
    concepts.filter((c) => c.source === SPINE.ncert).map((c) => [`${c.class}|${c.section_no}`, c.id]),
  );

  const sbTargets = (spine: string) => {
    const m = new Map<string, Set<string>>(); // conceptId -> set of `cls|sec`
    for (const l of links) {
      if (l.exam !== SPINE.stateBoard || !l.covered_by) continue;
      const c = byId.get(l.concept_id);
      if (!c || c.source !== spine) continue;
      const set = new Set<string>();
      for (const raw of splitCoveredBy(l.covered_by)) {
        const { cls, no } = parseCoveredRef(raw, c.class);
        set.add(`${cls}|${no}`);
      }
      m.set(l.concept_id, set);
    }
    return m;
  };
  const nTargets = sbTargets(SPINE.ncert);
  const jTargets = sbTargets(SPINE.jee);

  const authored = new Set<string>();
  for (const l of links) {
    if (l.exam !== "CBSE Class 12" || !l.covered_by) continue;
    const c = byId.get(l.concept_id);
    if (!c || c.source !== SPINE.jee) continue;
    for (const raw of splitCoveredBy(l.covered_by)) {
      const { cls, no } = parseCoveredRef(raw, c.class);
      const nid = ncertByKey.get(`${cls}|${no}`);
      if (nid) authored.add(`${l.concept_id}|${nid}`);
    }
  }

  // What a naive pivot through the State Board WOULD have paired.
  const inferred = new Set<string>();
  for (const [jid, js] of jTargets)
    for (const [nid, ns] of nTargets)
      for (const k of js) if (ns.has(k)) inferred.add(`${jid}|${nid}`);

  const agree = [...inferred].filter((k) => authored.has(k)).length;
  const invented = [...inferred].filter((k) => !authored.has(k)).length;
  const missed = [...authored].filter((k) => !inferred.has(k)).length;

  console.log("Pairing NCERT<->JEE by SHARED State Board section, vs the authored edge:");
  console.log(`  agree    ${agree}`);
  console.log(`  INVENTED ${invented}   <- rows the table refuses to emit`);
  console.log(`  missed   ${missed}`);
  const pct = inferred.size ? Math.round((agree / inferred.size) * 100) : 0;
  console.log(`  inference would be ${pct}% correct — which is why pairing is authored-only\n`);

  const cfg = requireSubjectArg(process.argv);
  const rows = await loadAlignmentRows(db as never, {
    subject: cfg.subject,
    oldSyllabus: await loadOldSyllabusChapters(db as never, {
      subject: cfg.subject,
      liveFromYear: cfg.liveFromYear,
    }),
  });
  const anchors = new Set(rows.map((r) => `${r.anchor.cls}|${r.anchor.sectionNo}`));
  console.log(`Alignment table: ${rows.length} rows over ${anchors.size} State Board subtopics`);
  console.log(`  both books ${rows.filter((r) => r.ncert && r.jee).length}`);
  console.log(`  NCERT only ${rows.filter((r) => r.ncert && !r.jee).length}`);
  console.log(`  JEE only   ${rows.filter((r) => !r.ncert && r.jee).length}`);
  console.log(`  neither    ${rows.filter((r) => !r.ncert && !r.jee).length}  (State Board taught, neither book asks)`);

  const bogus = rows.filter((r) => r.ncert && r.jee && !authored.has(`${r.jee.id}|${r.ncert.id}`));
  if (bogus.length) {
    console.log(`\nFAIL: ${bogus.length} paired row(s) not backed by the authored edge`);
    for (const b of bogus.slice(0, 10))
      console.log(`  ${b.anchor.sectionNo} ${b.anchor.concept} | ${b.ncert!.label} | ${b.jee!.label}`);
    process.exit(1);
  }
  console.log("\nEvery paired row is backed by an authored NCERT<->JEE mapping.");
}

main().catch((e) => {
  console.error(e.message);
  process.exit(1);
});
