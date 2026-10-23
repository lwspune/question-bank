/**
 * PROD-CONTRACT: `EXAM_REGISTRY.pastPaperSolutions` vs the live past papers.
 *
 * The flag decides whether an exam's past-paper list is titled "with
 * Solutions" or "with Answers" (lib/mocks/paperPage.ts downloadPageTitle). On
 * 2026-10-15 every MPSC, IPMAT and JIPMAT past-paper question had an answer
 * but no worked solution, while MHT-CET, JEE, NDA, CDS, NEET and UPSC had one
 * on effectively every question. A page that promises solutions it does not
 * have is the thing ChatGPT and a student would both catch.
 *
 * A hand-declared fact needs a standing probe or it rots, the same bargain as
 * tests/mocks-registry.test.ts. It fails in BOTH directions:
 *   - flag set, solutions missing -> the title over-claims.
 *   - flag missing, solutions there -> the title under-sells (and the exam
 *     loses the word students search for). Safe, but still wrong.
 */
import { readAllPages } from "@/lib/supabase/readAllPages";
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { SOLVED_SHARE } from "@/lib/mocks/paperPage";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

/** `.in()` puts the list in the URL: ~200 uuids is the safe chunk (CLAUDE.md pitfalls). */
const CHUNK = 200;

describe.skipIf(!HAS_ENV)("EXAM_REGISTRY.pastPaperSolutions vs the live past papers", () => {
  let client: SupabaseClient;
  /** Exam NAME -> { questions on its past papers, how many carry a solution }. */
  const share = new Map<string, { total: number; solved: number }>();

  beforeAll(async () => {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    // Paged: 921 past papers on 2026-10-23, close to the 1000 an unpaged read returns.
    const mocks = await readAllPages<Record<string, unknown>>((from, to) =>
      client
        .from("mock_tests")
        .select("questions, exam:exams(name)")
        .eq("status", "published")
        .eq("source", "pyq")
        .eq("scope", "full")
        .order("id")
        .range(from, to)
    );

    const examOf = new Map<string, string>();
    for (const m of mocks) {
      const exam = (Array.isArray(m.exam) ? m.exam[0] : m.exam) as { name: string } | null;
      if (!exam) continue;
      for (const q of (m.questions as { questionId: string }[]) ?? []) examOf.set(q.questionId, exam.name);
    }

    const ids = [...examOf.keys()];
    const solved = new Set<string>();
    for (let i = 0; i < ids.length; i += CHUNK) {
      const { data, error: qErr } = await client
        .from("questions")
        .select("id")
        .in("id", ids.slice(i, i + CHUNK))
        .not("solution", "is", null)
        .neq("solution", "");
      if (qErr) throw new Error(`questions: ${qErr.message}`);
      for (const r of data ?? []) solved.add(r.id as string);
    }

    for (const [id, exam] of examOf) {
      const s = share.get(exam) ?? { total: 0, solved: 0 };
      s.total++;
      if (solved.has(id)) s.solved++;
      share.set(exam, s);
    }
  }, 120_000);

  it("flags exactly the exams whose past papers carry worked solutions", () => {
    const wrong: string[] = [];
    for (const [examName, s] of share) {
      const entry = EXAM_REGISTRY.find((e) => e.examName === examName);
      const measured = s.solved / s.total >= SOLVED_SHARE;
      const declared = entry?.pastPaperSolutions === true;
      if (measured !== declared) {
        wrong.push(
          `${examName}: ${s.solved}/${s.total} past-paper questions have a solution, but ${
            entry ? `"${entry.slug}"` : "(not in the registry)"
          } ${declared ? "sets" : "does not set"} pastPaperSolutions: true`
        );
      }
    }
    expect(wrong).toEqual([]);
  });

  it("does not flag an exam with no past papers", () => {
    const stale = EXAM_REGISTRY.filter((e) => e.pastPaperSolutions === true && !share.has(e.examName)).map(
      (e) => e.slug
    );
    expect(stale).toEqual([]);
  });
});
