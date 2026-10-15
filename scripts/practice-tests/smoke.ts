/**
 * Drive the practice-test pool against live data, read-only:
 *
 *   npm run practice:smoke                 # every exam and subject V offers
 *   npm run practice:smoke -- --exam=nda   # one exam
 *
 * Runs the routes' OWN loader (readSubjectPool, with the anon client the route
 * uses, so it proves the anon client can read what the eligibility rules
 * need: options.is_correct and numeric_answer) and the OWN picker, then
 * prints per subject: chapters offered, questions usable, and one sample
 * 20-question pick from the three most-asked chapters. Throws if a subject V
 * offers has no chapter at all, which would leave a student at a dead end.
 *
 * unstable_cache needs Next, so this calls the uncached read directly.
 */
import { join } from "node:path";
import { createClient } from "@supabase/supabase-js";
import { PRACTICE_EXAMS } from "../../src/lib/practiceTests/config";
import { readSubjectPool } from "../../src/lib/practiceTests/poolQuery";
import { mostAskedChapters, pickPracticeQuestions, practiceLengths } from "../../src/lib/practiceTests/pick";

// eslint-disable-next-line @typescript-eslint/no-require-imports
require("dotenv").config({ path: join(process.cwd(), ".env.local"), override: true });

async function main() {
  const only = process.argv.find((a) => a.startsWith("--exam="))?.slice("--exam=".length);
  const db = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: { persistSession: false },
  });
  const dead: string[] = [];
  for (const exam of PRACTICE_EXAMS.filter((e) => !only || e.slug === only)) {
    console.log(`\n${exam.shortName}`);
    for (const subject of exam.subjects) {
      const t0 = Date.now();
      const got = await readSubjectPool(db, exam, subject, new Date());
      const ms = Date.now() - t0;
      if (!got || got.pool.chapters.length === 0) {
        dead.push(`${exam.slug}/${subject.key}`);
        console.log(`  ! ${subject.label.padEnd(28)} NO CHAPTERS (${got ? "subject found" : "subject missing"})`);
        continue;
      }
      const chapters = got.pool.chapters;
      const usable = chapters.reduce((n, c) => n + c.available, 0);
      const top = mostAskedChapters(chapters);
      const topPool = chapters.filter((c) => top.includes(c.id)).flatMap((c) => c.items);
      const n = practiceLengths(topPool.length).at(-1);
      const pick = n ? pickPracticeQuestions(topPool, Math.min(n, 20), { difficulty: "mixed", seed: 1 }) : null;
      const bytes = JSON.stringify(got).length;
      console.log(
        `  ${subject.label.padEnd(28)} ${String(chapters.length).padStart(3)} ch · ${String(usable).padStart(5)} usable · ` +
          `most-asked ${top.length} ch → ${pick ? `${pick.ids.length} q` : "no test"} · ${(bytes / 1024).toFixed(0)} KB · ${ms} ms`
      );
    }
  }
  if (dead.length) throw new Error(`subjects with no chapters: ${dead.join(", ")}`);
  console.log("\nok");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
