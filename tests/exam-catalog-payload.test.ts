import { describe, it, expect } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadExamCatalogPayload } from "@/lib/exam/allExamStats";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

/**
 * A stand-in for the anon client, just wide enough for loadExamCatalogPayload:
 * `exams` is read with a bare select, `questions` with select + three .eq().
 */
type CountResult = { count: number | null; error: { message: string } | null };
function fakeClient(opts: {
  exams: { data: { id: string; name: string }[] | null; error: { message: string } | null };
  count: (filters: Record<string, unknown>) => CountResult;
}): SupabaseClient {
  return {
    from(table: string) {
      if (table === "exams") return { select: () => Promise.resolve(opts.exams) };
      const filters: Record<string, unknown> = {};
      const builder = {
        select: () => builder,
        eq: (col: string, val: unknown) => {
          filters[col] = val;
          return builder;
        },
        then: (resolve: (r: CountResult) => unknown, reject: (e: unknown) => unknown) =>
          Promise.resolve(opts.count(filters)).then(resolve, reject),
      };
      return builder;
    },
  } as unknown as SupabaseClient;
}

const EXAM_ROWS = EXAM_REGISTRY.map((e, i) => ({ id: `id-${i}`, name: e.examName }));
const ok = (n: number): CountResult => ({ count: n, error: null });

describe("loadExamCatalogPayload — a failed read must never become a count of 0", () => {
  // 2026-10-08: the homepage printed "0 past-year questions" and "Coming soon"
  // on all 13 exam cards, and /browse "0 public questions". One load had
  // failed, `count ?? 0` turned the failure into zeros, and unstable_cache kept
  // them for a day. A THROWN result is never cached, so failing loudly is what
  // lets the next request try again.
  it("returns both kinds per exam when every read succeeds", async () => {
    const client = fakeClient({
      exams: { data: EXAM_ROWS, error: null },
      count: (f) => ok(f.question_kind === "pyq" ? 100 : 7),
    });
    const payload = await loadExamCatalogPayload(client);
    expect(new Map(payload.counts).get("NDA")).toEqual({ pyq: 100, practice: 7 });
    expect(payload.ids.length).toBe(EXAM_REGISTRY.length);
  });

  it("throws when the exams read fails", async () => {
    const client = fakeClient({
      exams: { data: null, error: { message: "canceling statement due to statement timeout" } },
      count: () => ok(1),
    });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/exams/);
  });

  it("throws when the exams read comes back empty (anon can always see the exam list)", async () => {
    const client = fakeClient({ exams: { data: [], error: null }, count: () => ok(1) });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/exams/);
  });

  it("throws when any one head-count errors, rather than recording that exam as 0", async () => {
    const client = fakeClient({
      exams: { data: EXAM_ROWS, error: null },
      count: (f) =>
        f.exam_id === "id-0" && f.question_kind === "practice"
          ? { count: null, error: { message: "fetch failed" } }
          : ok(5),
    });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/count/);
  });

  it("throws when a head-count returns no count at all", async () => {
    const client = fakeClient({
      exams: { data: EXAM_ROWS, error: null },
      count: (f) => (f.exam_id === "id-1" ? { count: null, error: null } : ok(5)),
    });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/count/);
  });

  it("still allows a genuine 0 (an exam with no questions of one kind)", async () => {
    const client = fakeClient({
      exams: { data: EXAM_ROWS, error: null },
      count: (f) => ok(f.question_kind === "pyq" ? 0 : 12),
    });
    const payload = await loadExamCatalogPayload(client);
    expect(new Map(payload.counts).get("NDA")).toEqual({ pyq: 0, practice: 12 });
  });
});
