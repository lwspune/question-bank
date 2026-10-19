/**
 * The counts behind V's exam_strategy tool, read from the test database: the
 * per-chapter, per-year numbers must add up to the exam's PUBLIC past-year
 * questions counted directly, so nothing is lost to a cap or a missing chapter.
 */
import { describe, it, expect } from "vitest";
import { createClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";
import { readExamStrategyUncached } from "@/lib/chat/examStrategyServer";

const HAS_ENV = !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

describe.skipIf(!HAS_ENV)("readExamStrategyUncached", () => {
  const anon = () => createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!);

  it("returns null for an exam that is not registered", async () => {
    expect(await readExamStrategyUncached("no-such-exam")).toBeNull();
  });

  it("adds up to the exam's public past-year questions over the years it reads", async () => {
    const db = anon();
    // The registered exam holding the most dated past-year questions in this database.
    let pick: { slug: string; id: string; latest: number } | null = null;
    let best = 0;
    for (const e of EXAM_REGISTRY) {
      const { data: exam } = await db.from("exams").select("id").eq("name", e.examName).maybeSingle();
      if (!exam) continue;
      const { count } = await db
        .from("questions")
        .select("id", { count: "exact", head: true })
        .eq("exam_id", exam.id)
        .eq("question_kind", "pyq")
        .not("pyq_year", "is", null);
      if ((count ?? 0) > best) {
        const { data: top } = await db
          .from("questions")
          .select("pyq_year")
          .eq("exam_id", exam.id)
          .eq("question_kind", "pyq")
          .not("pyq_year", "is", null)
          .order("pyq_year", { ascending: false })
          .limit(1);
        best = count ?? 0;
        pick = { slug: e.slug, id: exam.id, latest: (top?.[0] as { pyq_year: number }).pyq_year };
      }
    }
    if (!pick) return; // No dated past-year questions seeded: nothing to add up.

    const { count: direct } = await db
      .from("questions")
      .select("id", { count: "exact", head: true })
      .eq("exam_id", pick.id)
      .eq("question_kind", "pyq")
      .gte("pyq_year", pick.latest - 9)
      .lte("pyq_year", pick.latest);

    const data = await readExamStrategyUncached(pick.slug);
    expect(data).not.toBeNull();
    const summed = data!.chapters.reduce((n, c) => n + Object.values(c.byYear).reduce((a, b) => a + b, 0), 0);
    expect(summed).toBe(direct);
    for (const c of data!.chapters) {
      expect(c.name.length).toBeGreaterThan(0);
      expect(c.subject.length).toBeGreaterThan(0);
    }
  });
});
