/**
 * PROD-CONTRACT: `EXAM_REGISTRY.hasMocks` vs the live `mock_tests` table.
 *
 * /mock used to render whatever getPublishedMocks returned, so an exam could
 * carry published mocks without a registry flag and still be listed. As of the
 * exam-picker rewrite /mock renders ONLY registry exams (buildMockExamCards),
 * which means an unflagged exam's mocks would be reachable by direct URL and
 * invisible everywhere else on the site — no error, no empty state, just gone.
 *
 * A hand-declared fact needs a standing probe or it rots. This is that probe,
 * the same bargain tests/format-mix-registry.test.ts makes for `mixedFormats`.
 * It runs as service_role, so the grouping query is affordable once per gate.
 *
 * It fails in BOTH directions on purpose:
 *   - flag missing -> a newly built exam's mocks are live but off the picker,
 *     the rail and generateStaticParams. This is the one that hides content.
 *   - flag stale   -> the picker and rail advertise an exam with nothing to
 *     sit, so /mock/exam/<slug> is a dead end.
 *
 * Neither can break a viewer at runtime — buildMockExamCards renders an empty
 * card and the per-exam page has a "coming soon" state — which is why this is
 * a correctness gate rather than a runtime guard.
 */
import { describe, it, expect, beforeAll } from "vitest";
import { createClient, type SupabaseClient } from "@supabase/supabase-js";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

const HAS_ENV =
  !!process.env.NEXT_PUBLIC_SUPABASE_URL && !!process.env.SUPABASE_SERVICE_ROLE_KEY;

describe.skipIf(!HAS_ENV)("EXAM_REGISTRY.hasMocks vs the live mock_tests table", () => {
  let client: SupabaseClient;
  /** Exam NAME -> count of published mocks, straight from the DB. */
  const published = new Map<string, number>();

  beforeAll(async () => {
    client = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!,
      { auth: { persistSession: false } }
    );

    const { data: exams, error: examErr } = await client.from("exams").select("id, name");
    if (examErr) throw new Error(`exams: ${examErr.message}`);
    const nameById = new Map<string, string>(
      (exams ?? []).map((e) => [e.id as string, e.name as string])
    );

    // 63 rows today, far under the PostgREST 1000-row cap, and this is the
    // whole population rather than a count derived from a truncated page.
    const { data: mocks, error: mockErr } = await client
      .from("mock_tests")
      .select("exam_id")
      .eq("status", "published");
    if (mockErr) throw new Error(`mock_tests: ${mockErr.message}`);
    expect((mocks ?? []).length).toBeLessThan(1000);

    for (const m of mocks ?? []) {
      const name = nameById.get(m.exam_id as string);
      if (!name) continue;
      published.set(name, (published.get(name) ?? 0) + 1);
    }
  });

  it("flags every exam that has published mocks", () => {
    const missing: string[] = [];
    for (const [examName, count] of published) {
      const entry = EXAM_REGISTRY.find((e) => e.examName === examName);
      if (entry?.hasMocks !== true) {
        missing.push(
          `${examName} has ${count} published mock(s) but ${
            entry ? `EXAM_REGISTRY entry "${entry.slug}" does not set hasMocks: true` : "is not in EXAM_REGISTRY at all"
          } — they are invisible on /mock, the rail and the sitemap`
        );
      }
    }
    expect(missing).toEqual([]);
  });

  it("does not flag an exam with nothing published", () => {
    const stale = EXAM_REGISTRY.filter((e) => e.hasMocks === true)
      .filter((e) => (published.get(e.examName) ?? 0) === 0)
      .map(
        (e) =>
          `${e.slug} sets hasMocks: true but has 0 published mocks — /mock/exam/${e.slug} is a dead end`
      );
    expect(stale).toEqual([]);
  });

  it("agrees with the live bank on which exams those are", () => {
    // Belt-and-braces on the two directions above: the sets must be equal, so
    // neither list can drift while both per-direction checks read clean.
    const flagged = EXAM_REGISTRY.filter((e) => e.hasMocks === true)
      .map((e) => e.examName)
      .sort();
    expect(flagged).toEqual([...published.keys()].sort());
    expect(flagged.length).toBeGreaterThan(0);
  });
});
