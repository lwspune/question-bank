/**
 * Drive the SHIPPED page's loaders directly.
 *
 * /dashboard/syllabus is auth-gated and force-dynamic, so `next build` never
 * executes it and a green build proves only that it compiles. This runs the same
 * query functions the page calls, so at least the data half is verified before
 * anyone claims the page works. It is NOT a render — the browser check still has
 * to happen by hand.
 */
import { createClient } from "@supabase/supabase-js";
import { join } from "node:path";
import {
  loadSyllabusMatrix,
  loadMappingRows,
  loadOldSyllabusByExam,
  loadOldSyllabusChapters,
  loadExamSpineSummaries,
  loadAlignmentRows,
} from "../../src/lib/syllabus/query";
import { SPINE, examOfSpine, SYLLABUS_EXAMS } from "../../src/lib/syllabus/summary";
import { requireSubjectArg } from "./subject-arg";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  ) as never;

  const cfg = requireSubjectArg(process.argv);
  const subject = cfg.subject;
  console.log(`subject: ${cfg.label} (liveFromYear ${cfg.liveFromYear})\n`);

  // PER EXAM. A shared set was a real defect: exams reuse chapter names, so
  // JEE's dead chapters were burying live MHT-CET and NDA content.
  const EXAM_SPINES = [SPINE.jee, SPINE.cet, SPINE.nda];
  const oldByExam = await loadOldSyllabusByExam(db, {
    subject,
    liveFromYear: cfg.liveFromYear,
    exams: EXAM_SPINES.map(examOfSpine),
  });
  for (const [exam, dead] of oldByExam) {
    console.log(`old-syllabus ${exam}: ${dead.size}${dead.size ? ` — ${[...dead].join(", ")}` : ""}`);
  }

  // The JEE table must not move: its dead set is what the single-exam loader
  // returned before the fix, so prove that rather than assert it.
  const jeeLegacy = await loadOldSyllabusChapters(db, { subject, liveFromYear: cfg.liveFromYear });
  const jeeNow = oldByExam.get("JEE Mains")!;
  const same =
    jeeLegacy.size === jeeNow.size && [...jeeLegacy].every((c) => jeeNow.has(c));
  console.log(`JEE dead set unchanged vs single-exam loader: ${same ? "YES" : "NO — REGRESSION"}`);
  if (!same) process.exitCode = 1;

  // Names one exam calls dead while another still examines them. Applying one
  // shared set would have mis-flagged exactly these.
  //
  // A chapter must be PRESENT in the other exam before it can be called live
  // there: absence from a dead set is not evidence of liveness, it is usually
  // evidence the exam has no such chapter. Without this the check reported JEE's
  // Communication Systems as live for MHT-CET and NDA, neither of which has it.
  const chaptersOf = new Map<string, Set<string>>(
    await Promise.all(
      EXAM_SPINES.map(
        async (spine) =>
          [
            examOfSpine(spine),
            new Set(
              (
                await loadMappingRows(db, { spine, books: [], subject })
              ).map((r) => r.chapterName),
            ),
          ] as [string, Set<string>],
      ),
    ),
  );
  const crossExam = [...oldByExam].flatMap(([exam, dead]) =>
    [...dead].flatMap((ch) =>
      [...oldByExam]
        .filter(([other, d]) => other !== exam && !d.has(ch) && chaptersOf.get(other)?.has(ch))
        .map(([other]) => `${ch}: dead for ${exam}, LIVE for ${other}`),
    ),
  );
  console.log(
    `cross-exam name clashes the old shared set would mis-flag: ${crossExam.length}`,
  );
  for (const c of crossExam) console.log(`  ${c}`);

  const oldSyllabus = jeeNow;

  const matrix = await loadSyllabusMatrix(db, { subject });
  console.log(`\nState Board matrix: ${matrix.totalConcepts} concepts, ${matrix.chapters.length} chapters`);
  console.log(
    "  first 3:",
    matrix.chapters.slice(0, 3).map((c) => `Std${c.cls} ${c.chapterNo}. ${c.chapterName} (${c.conceptCount})`),
  );

  const ncert = await loadMappingRows(db, {
    spine: SPINE.ncert,
    books: ["MH State Board"],
    subject,
    topLevelOnly: true,
  });
  const ncertMapped = ncert.filter((r) => r.covers["MH State Board"].refs.length > 0).length;
  console.log(`\nNCERT rows: ${ncert.length} (${ncertMapped} with a State Board pointer)`);
  for (const r of ncert.slice(0, 3)) {
    const c = r.covers["MH State Board"];
    console.log(`  ${r.sectionNo.padEnd(6)} ${r.concept.slice(0, 34).padEnd(34)} -> ${c.refs.map((x) => `${x.no} ${x.title}`).join(" · ").slice(0, 60)}`);
  }

  const jee = await loadMappingRows(db, {
    spine: SPINE.jee,
    books: ["MH State Board", "CBSE Class 12"],
    subject,
    oldSyllabus,
  });
  const live = jee.filter((r) => !r.oldSyllabus);
  const liveGap = live.filter((r) => r.covers["MH State Board"].status === "not");
  console.log(`\nJEE rows: ${jee.length} (${live.length} live, ${jee.length - live.length} old-syllabus)`);
  console.log(`  live State Board gaps: ${liveGap.length} (${liveGap.reduce((s, r) => s + r.pyq, 0)} PYQ)`);
  for (const r of jee.slice(0, 3)) {
    const sb = r.covers["MH State Board"];
    const nc = r.covers["CBSE Class 12"];
    console.log(
      `  ${String(r.pyq).padStart(3)} ${r.concept.slice(0, 28).padEnd(28)} | SB ${sb.refs[0]?.chapterLabel?.slice(0, 34) ?? "-"} | NCERT ${nc.refs[0]?.chapterLabel?.slice(0, 34) ?? "-"}`,
    );
  }
  console.log(`\n  LAST row (should be old syllabus): ${jee.at(-1)?.chapterName} / ${jee.at(-1)?.concept} — old=${jee.at(-1)?.oldSyllabus}`);

  // The "live gaps" section. Its denominators are what the shared dead-set bug
  // corrupted: a wrongly-flagged row is dropped from `live` entirely, so the
  // exam's own coverage was computed over a subset of its subtopics.
  const spineSummaries = await loadExamSpineSummaries(db, {
    subject,
    oldSyllabusByExam: oldByExam,
  });
  console.log("\nlive-gap summary (per exam spine):");
  for (const s of spineSummaries) {
    console.log(
      `  ${s.label.padEnd(10)} live ${String(s.live).padStart(4)} · full ${String(s.full).padStart(4)} · ` +
        `partial ${String(s.partial).padStart(3)} · not ${String(s.not).padStart(3)} · old-excluded ${s.oldExcluded}`,
    );
  }

  // The chapter matrix and the three-book alignment table. Both render a BLANK
  // for "not assessed" and for "assessed as absent", so the only way to tell
  // which a page is showing is to count the rows behind it.
  console.log(`\nchapter matrix tallies — a blank cell renders the same whether the pair was`);
  console.log(`assessed-as-absent or never assessed, so the counts are the only way to tell:`);
  for (const exam of SYLLABUS_EXAMS) {
    const t = matrix.tallies[exam];
    console.log(
      `  ${exam.padEnd(16)} full ${String(t.full).padStart(4)} · partial ${String(t.partial).padStart(4)} · not ${String(t.not).padStart(3)} · UNASSESSED ${String(t.unassessed).padStart(4)}`,
    );
  }

  const align = await loadAlignmentRows(db, { subject, oldSyllabus });
  const nWith = (f: (r: (typeof align)[number]) => unknown) => align.filter(f).length;
  console.log(`\nalignment table: ${align.length} rows`);
  console.log(`  with an NCERT cell ${nWith((r) => r.ncert)} · with a JEE cell ${nWith((r) => r.jee)}`);
  console.log(
    `  paired ${nWith((r) => r.ncert && r.jee)} · neither ${nWith((r) => !r.ncert && !r.jee)}`,
  );
  if (!nWith((r) => r.ncert)) {
    console.log(
      "  NOTE: zero NCERT cells — the NCERT -> State Board edge is unauthored for this subject,",
    );
    console.log("        so the page must render 'not mapped yet', never 'not in NCERT'.");
  }

  // Every exam table the page renders, not just JEE.
  console.log("\nper-exam subtopic tables:");
  for (const spine of EXAM_SPINES) {
    const rows = await loadMappingRows(db, {
      spine,
      books: ["MH State Board", "CBSE Class 12"],
      subject,
      oldSyllabus: oldByExam.get(examOfSpine(spine)) ?? new Set<string>(),
      orderByBook: "MH State Board",
    });
    if (rows.length === 0) {
      console.log(`  ${examOfSpine(spine).padEnd(10)} — no rows (no spine for this subject)`);
      continue;
    }
    // Mirrors the page's render gate exactly: a spine with verdicts but no
    // section pointers must NOT render a table of blanks.
    const cited = rows.filter((r) =>
      Object.values(r.covers).some((c) => c.refs.length > 0),
    ).length;
    if (cited === 0) {
      console.log(
        `  ${examOfSpine(spine).padEnd(10)} ${String(rows.length).padStart(4)} rows · NO TABLE — verdicts but 0 section pointers`,
      );
      continue;
    }
    const blankBoth = rows.filter(
      (r) =>
        r.covers["MH State Board"].refs.length === 0 &&
        r.covers["CBSE Class 12"].refs.length === 0,
    );
    const noNcert = rows.filter((r) => r.covers["CBSE Class 12"].refs.length === 0);
    console.log(
      `  ${examOfSpine(spine).padEnd(10)} ${String(rows.length).padStart(4)} rows · ` +
        `${rows.filter((r) => r.oldSyllabus).length} old · ` +
        `${noNcert.length} with no NCERT home · ${blankBoth.length} in neither book`,
    );
    for (const r of blankBoth) console.log(`      neither: ${r.concept} (${r.pyq} PYQ)`);
  }

  // The bug this port fixes: without the spine filter these were one list.
  const mixed = matrix.chapters.filter((c) => c.conceptCount > 60);
  console.log(`\nchapters with >60 concepts (a merge symptom): ${mixed.length}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
