/**
 * PROD-CONTRACT: `EXAM_REGISTRY.solutionCoverage` vs the live bank.
 *
 * The declaration decides whether an exam's page and chapter landing pages promise
 * "worked solutions" (lib/exam/solutionClaim.ts). Measured here as the share of the
 * exam's PUBLIC questions with a non-empty solution, classified by the SAME
 * classifySolutionShare the pages' declaration was made with. Fails in BOTH
 * directions, the bargain of tests/past-paper-solutions-registry.test.ts:
 *   - declared better than measured -> a page promises solutions it does not have.
 *   - declared worse than measured  -> a page undersells (solutions were added and
 *     the declaration was not lifted). Safe, but still wrong.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { classifySolutionShare, solutionCoverageOf } from "@/lib/exam/solutionClaim";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("EXAM_REGISTRY.solutionCoverage vs the live bank", () => {
  let client: SupabaseClient;
  /** Registry slug -> { PUBLIC questions, how many carry a solution }. */
  const measured = new Map<string, { total: number; solved: number }>();

  beforeAll(async () => {
    client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });
    const { data: exams, error } = await client.from("exams").select("id, name");
    if (error) throw new Error(`exams: ${error.message}`);
    const idOf = new Map((exams ?? []).map((e) => [e.name as string, e.id as string]));

    for (const entry of EXAM_REGISTRY) {
      const examId = idOf.get(entry.examName);
      if (!examId) continue;
      const base = () =>
        client.from("questions").select("id", { count: "exact", head: true }).eq("exam_id", examId).eq("visibility", "PUBLIC");
      const [{ count: total, error: tErr }, { count: solved, error: sErr }] = await Promise.all([
        base(),
        base().not("solution", "is", null).neq("solution", ""),
      ]);
      if (tErr || sErr) throw new Error(`${entry.slug}: ${(tErr ?? sErr)!.message}`);
      if (total) measured.set(entry.slug, { total, solved: solved ?? 0 });
    }
  }, 180_000);

  it("declares each exam's solution coverage as the bank measures it", () => {
    const wrong: string[] = [];
    for (const [slug, m] of measured) {
      const entry = EXAM_REGISTRY.find((e) => e.slug === slug)!;
      const share = m.solved / m.total;
      const actual = classifySolutionShare(share);
      const declared = solutionCoverageOf(entry);
      if (actual !== declared) {
        wrong.push(`${slug}: declared "${declared}", measured "${actual}" (${m.solved}/${m.total} = ${(share * 100).toFixed(1)}%)`);
      }
    }
    expect(wrong, `set solutionCoverage on EXAM_REGISTRY to match:\n${wrong.join("\n")}`).toEqual([]);
  });

  it("measured at least one exam (the probe reached the bank)", () => {
    expect(measured.size).toBeGreaterThan(10);
  });
});
