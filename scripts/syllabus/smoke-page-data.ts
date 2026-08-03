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
import { loadSyllabusMatrix, loadMappingRows, loadOldSyllabusChapters } from "../../src/lib/syllabus/query";
import { SPINE } from "../../src/lib/syllabus/summary";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const db = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { persistSession: false } },
  ) as never;

  const oldSyllabus = await loadOldSyllabusChapters(db);
  console.log(`old-syllabus chapters: ${oldSyllabus.size} — ${[...oldSyllabus].join(", ")}`);

  const matrix = await loadSyllabusMatrix(db);
  console.log(`\nState Board matrix: ${matrix.totalConcepts} concepts, ${matrix.chapters.length} chapters`);
  console.log(
    "  first 3:",
    matrix.chapters.slice(0, 3).map((c) => `Std${c.cls} ${c.chapterNo}. ${c.chapterName} (${c.conceptCount})`),
  );

  const ncert = await loadMappingRows(db, {
    spine: SPINE.ncert,
    books: ["MH State Board"],
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

  // The bug this port fixes: without the spine filter these were one list.
  const mixed = matrix.chapters.filter((c) => c.conceptCount > 60);
  console.log(`\nchapters with >60 concepts (a merge symptom): ${mixed.length}`);
}

main().catch((e) => {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
});
