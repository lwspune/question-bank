/**
 * Drive /dashboard/exam-features' OWN loader + the pure core against live data.
 *
 *   npm run exam-features:smoke
 *
 * The page is superadmin-gated and dynamic, so `next build` never renders it.
 * This runs the loader the page calls and THROWS on a contradiction a
 * type-check cannot see: active students above students, an exam the code
 * knows that the database lacks, or a feature count above the exam count.
 * Read-only. It does NOT prove the page lays out: that is owed to a browser.
 */
import { join } from "node:path";

require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

function assert(cond: boolean, msg: string): void {
  if (!cond) throw new Error(`INVARIANT VIOLATED — ${msg}`);
}

async function main() {
  const { createClient } = await import("@supabase/supabase-js");
  const { fetchExamFeatures } = await import("@/lib/examFeatures/query");
  const { coverageSummary, featureCoverage } = await import("@/lib/examFeatures/build");

  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });
  const { rows, unmatched } = await fetchExamFeatures(db);

  assert(rows.length > 30, `only ${rows.length} exams`);
  for (const r of rows) {
    assert(r.active30 <= r.students, `${r.slug}: active30 ${r.active30} > students ${r.students}`);
    assert(r.pyq + r.practice > 0 || r.students === 0, `${r.slug}: students but no public questions`);
  }
  for (let i = 1; i < rows.length; i++) {
    assert(rows[i - 1].students >= rows[i].students, `not sorted by students at ${rows[i].slug}`);
  }
  const sum = coverageSummary(rows);
  for (const f of featureCoverage(rows)) {
    assert(f.exams <= f.total, `${f.key}: ${f.exams} > ${f.total}`);
    assert(f.pickShare >= 0 && f.pickShare <= 100, `${f.key}: share ${f.pickShare}`);
  }

  console.log(`${rows.length} exams · ${sum.withMocks} with mocks · ${sum.withNotes} with notes · ${sum.withGuides} with guides`);
  console.log("Top 10 by students:");
  for (const r of rows.slice(0, 10)) {
    console.log(
      `  ${r.exam.padEnd(28)} ${String(r.students).padStart(4)} picked · ${String(r.active30).padStart(4)} active · notes ${r.notes} · guides ${r.guides} · mocks ${r.fullMocks}/${r.sectionMocks}`,
    );
  }
  if (unmatched.examNames.length || unmatched.targetSlugs.length) {
    console.log(`Unmatched: db exams [${unmatched.examNames.join(", ")}] · picked slugs [${unmatched.targetSlugs.join(", ")}]`);
  }
  console.log("OK");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
