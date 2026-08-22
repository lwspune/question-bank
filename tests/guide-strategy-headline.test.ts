/**
 * Cross-guide invariants for `STRATEGY_HEADLINE` constants.
 *
 * Catches two bug classes that have shipped before:
 *
 *   (1) Inconsistent within a single guide — e.g. `paperQ × marksPerCorrect`
 *       not equal to `totalMarks`, or `targetMarks > totalMarks`.
 *       Pure-unit checks; no DB.
 *
 *   (2) Drift from live bank — `paperQ` no longer matches the average
 *       per-paper q-count in the live PUBLIC bank. This catches the
 *       2026-05-18 incident where Chemistry + Biology shipped with
 *       Physics's 25 q / 100 marks headline copy-pasted in. DB-integration
 *       check; skipped when env vars aren't loaded (mirrors other DB
 *       tests in this suite).
 *
 * See `[[per-paper-q-counts]]` memory + the 2026-05-18 (latest)
 * Decisions log entry for context.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

import { STRATEGY_HEADLINE as MATHS_HEADLINE } from "@/app/guide/nda-maths/_data/strategy";
import { STRATEGY_HEADLINE as ENGLISH_HEADLINE } from "@/app/guide/nda-english/_data/strategy";
import { STRATEGY_HEADLINE as PHYSICS_HEADLINE } from "@/app/guide/nda-physics/_data/strategy";
import { STRATEGY_HEADLINE as CHEMISTRY_HEADLINE } from "@/app/guide/nda-chemistry/_data/strategy";
import { STRATEGY_HEADLINE as BIOLOGY_HEADLINE } from "@/app/guide/nda-biology/_data/strategy";
import { STRATEGY_HEADLINE as CET_MATHS_HEADLINE } from "@/app/guide/mht-cet-maths/_data/strategy";

type Headline = {
  paperQ: number;
  totalMarks: number;
  marksPerCorrect: number;
  penaltyPerWrong: number;
  targetMarks: number;
  targetAttempts: number;
  targetAccuracyPct: number;
};

/**
 * The marking scheme is PER EXAM, not universal. Until 2026-08-22 this suite
 * asserted `penaltyPerWrong ~= marksPerCorrect / 3` for every guide, which is
 * NDA's -1/3 rule stated as though it were a law. MHT-CET has NO negative
 * marking at all, so that assertion would have been false for a correct
 * headline. Making the scheme explicit data is what keeps the invariant
 * meaningful for both.
 */
type MarkingScheme = "nda-one-third" | "none";

type GuideSpec = {
  guide: string;
  headline: Headline;
  examName: string;
  subjectName: string;
  marking: MarkingScheme;
};

const GUIDES: GuideSpec[] = [
  { guide: "nda-maths",     headline: MATHS_HEADLINE,     examName: "NDA",     subjectName: "Mathematics", marking: "nda-one-third" },
  { guide: "nda-english",   headline: ENGLISH_HEADLINE,   examName: "NDA",     subjectName: "English",     marking: "nda-one-third" },
  { guide: "nda-physics",   headline: PHYSICS_HEADLINE,   examName: "NDA",     subjectName: "Physics",     marking: "nda-one-third" },
  { guide: "nda-chemistry", headline: CHEMISTRY_HEADLINE, examName: "NDA",     subjectName: "Chemistry",   marking: "nda-one-third" },
  { guide: "nda-biology",   headline: BIOLOGY_HEADLINE,   examName: "NDA",     subjectName: "Biology",     marking: "nda-one-third" },
  // Subject literal is "Maths", not "Mathematics" — MHT-CET and JEE use the
  // short form in the DB while NDA uses the long one.
  { guide: "mht-cet-maths", headline: CET_MATHS_HEADLINE, examName: "MHT-CET", subjectName: "Maths",       marking: "none" },
];

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL &&
  !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe("STRATEGY_HEADLINE — internal invariants (pure)", () => {
  for (const { guide, headline, marking } of GUIDES) {
    describe(guide, () => {
      it("paperQ × marksPerCorrect === totalMarks", () => {
        expect(headline.paperQ * headline.marksPerCorrect).toBeCloseTo(
          headline.totalMarks,
          1 // allow 0.1 marks rounding (e.g. 2.5-marks-per-correct Maths)
        );
      });

      it("penaltyPerWrong matches the exam's declared marking scheme", () => {
        if (marking === "nda-one-third") {
          expect(headline.penaltyPerWrong).toBeCloseTo(
            headline.marksPerCorrect / 3,
            2 // allow rounding (NDA Maths uses 0.83, exact would be 0.833)
          );
        } else {
          // MHT-CET deducts nothing. This is not a missing value — it is the
          // fact the whole guide's strategy rests on, so pin it as exactly 0.
          expect(headline.penaltyPerWrong).toBe(0);
        }
      });

      it("attempts every question when nothing is deducted for a wrong one", () => {
        // With no penalty a blank and a wrong answer score identically, so any
        // targetAttempts below paperQ is strictly worse than guessing.
        if (marking === "none") {
          expect(headline.targetAttempts).toBe(headline.paperQ);
        }
      });

      it("targetMarks ≤ totalMarks", () => {
        expect(headline.targetMarks).toBeLessThanOrEqual(headline.totalMarks);
      });

      it("targetMarks ≥ totalMarks × 0.3 (don't ship a defeatist target)", () => {
        // 30% floor accommodates NDA Maths's 100/300 cutoff-convention target.
        // Most subjects target 70%+; this is just a "is there a target at all?" guard.
        expect(headline.targetMarks).toBeGreaterThanOrEqual(
          headline.totalMarks * 0.3
        );
      });

      it("targetAttempts ≤ paperQ", () => {
        expect(headline.targetAttempts).toBeLessThanOrEqual(headline.paperQ);
      });

      it("targetAttempts × marksPerCorrect ≥ targetMarks (target is actually reachable)", () => {
        // The most optimistic case (100% accuracy on every attempted question)
        // must be ≥ the target. If not, the target is unreachable even at
        // perfect play.
        expect(
          headline.targetAttempts * headline.marksPerCorrect
        ).toBeGreaterThanOrEqual(headline.targetMarks);
      });

      it("targetAccuracyPct between 50 and 100", () => {
        expect(headline.targetAccuracyPct).toBeGreaterThanOrEqual(50);
        expect(headline.targetAccuracyPct).toBeLessThanOrEqual(100);
      });

      // NOTE: NOT testing "at targetAccuracyPct × targetAttempts ≥ targetMarks".
      // NDA English currently sets target 140 against 85% accuracy on 40 attempts
      // (yields ~128 marks, 12 short of the 140 target — target is the stretch
      // ceiling, accuracy is the prep floor). That's a deliberate aspirational
      // gap and shouldn't fail this test. The "reachable at perfect play" check
      // above is sufficient for "target isn't nonsense".
    });
  }
});

describe.skipIf(!HAS_ENV)(
  "STRATEGY_HEADLINE — matches live bank per-paper q-count",
  () => {
    let client: SupabaseClient;

    beforeAll(() => {
      client = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!,
        { auth: { persistSession: false } }
      );
    });

    for (const { guide, headline, examName, subjectName } of GUIDES) {
      it(`${guide}: paperQ within ±30% of live avg q/paper for ${examName}/${subjectName}`, async () => {
        // Each paper = distinct (pyq_year, pyq_month, pyq_note). Group, count
        // per group, average across groups. Mirrors the SQL probe in the
        // [[per-paper-q-counts]] memory.
        //
        // PAGINATE — `.range()` doesn't bypass Supabase's server-side
        // `db-max-rows` cap (~1000); NDA Mathematics has 2160 q and would
        // truncate. Loop until a page returns < pageSize. See CLAUDE.md
        // "Recurring pitfalls" → PostgREST 1000-row cap.
        const perPaper = new Map<string, number>();
        const pageSize = 1000;
        let offset = 0;
        while (true) {
          const { data, error } = await client
            .from("questions")
            .select(
              "pyq_year, pyq_month, pyq_note, exams!inner(name), subjects!inner(name)"
            )
            .eq("visibility", "PUBLIC")
            .eq("exams.name", examName)
            .eq("subjects.name", subjectName)
            .not("pyq_year", "is", null)
            .range(offset, offset + pageSize - 1);

          expect(error, error?.message).toBeNull();
          if (!data || data.length === 0) break;

          for (const row of data as Array<{
            pyq_year: number | null;
            pyq_month: string | null;
            pyq_note: string | null;
          }>) {
            const key = `${row.pyq_year}|${row.pyq_month ?? ""}|${row.pyq_note ?? ""}`;
            perPaper.set(key, (perPaper.get(key) ?? 0) + 1);
          }

          if (data.length < pageSize) break;
          offset += pageSize;
        }

        expect(perPaper.size, "no papers found").toBeGreaterThan(0);

        const counts = [...perPaper.values()];
        const avgQPerPaper =
          counts.reduce((s, n) => s + n, 0) / counts.length;

        const lowerBound = avgQPerPaper * 0.7;
        const upperBound = avgQPerPaper * 1.3;

        expect(
          headline.paperQ,
          `${guide}: STRATEGY_HEADLINE.paperQ = ${headline.paperQ}, but live bank avg = ${avgQPerPaper.toFixed(1)} (range ${Math.min(...counts)}–${Math.max(...counts)} across ${counts.length} papers). Allowed range ±30%: [${lowerBound.toFixed(1)}, ${upperBound.toFixed(1)}]. See [[per-paper-q-counts]] memory.`
        ).toBeGreaterThanOrEqual(lowerBound);
        expect(headline.paperQ).toBeLessThanOrEqual(upperBound);
      });
    }
  }
);
