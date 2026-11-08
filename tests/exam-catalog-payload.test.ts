import { describe, it, expect } from "vitest";
import type { SupabaseClient } from "@supabase/supabase-js";
import { loadExamCatalogPayload, shapeExamCatalog } from "@/lib/exam/allExamStats";
import { EXAM_REGISTRY } from "@/lib/exam/examContext";

/**
 * A stand-in for the anon client, just wide enough for loadExamCatalogPayload:
 * `exams` is read with a bare select, the counts with one RPC (migration 0237,
 * 2026-11-08; it was two head counts per exam, 50 at once).
 */
type Rows = { exam_id: string; question_kind: string; questions: number }[];
type RpcResult = { data: Rows | null; error: { message: string } | null };
function fakeClient(opts: {
  exams: { data: { id: string; name: string }[] | null; error: { message: string } | null };
  counts: RpcResult;
}): SupabaseClient & { rpcCalls: string[] } {
  const rpcCalls: string[] = [];
  return {
    rpcCalls,
    from(table: string) {
      if (table === "exams") return { select: () => Promise.resolve(opts.exams) };
      throw new Error(`unexpected read of ${table}: the counts come from the RPC`);
    },
    rpc(name: string) {
      rpcCalls.push(name);
      return Promise.resolve(opts.counts);
    },
  } as unknown as SupabaseClient & { rpcCalls: string[] };
}

const EXAM_ROWS = EXAM_REGISTRY.map((e, i) => ({ id: `id-${i}`, name: e.examName }));
const NDA = `id-${EXAM_REGISTRY.findIndex((e) => e.examName === "NDA")}`;
const both = (examId: string, pyq: number, practice: number): Rows => [
  { exam_id: examId, question_kind: "pyq", questions: pyq },
  { exam_id: examId, question_kind: "practice", questions: practice },
];

describe("loadExamCatalogPayload — a failed read must never become a count of 0", () => {
  // 2026-10-08: the homepage printed "0 past-year questions" and "Coming soon"
  // on all 13 exam cards, and /browse "0 public questions". One load had
  // failed, `count ?? 0` turned the failure into zeros, and unstable_cache kept
  // them for a day. A THROWN result is never cached, so failing loudly is what
  // lets the next request try again.
  it("returns both kinds per exam from one count read", async () => {
    const client = fakeClient({ exams: { data: EXAM_ROWS, error: null }, counts: { data: both(NDA, 100, 7), error: null } });
    const payload = await loadExamCatalogPayload(client);
    expect(new Map(payload.counts).get("NDA")).toEqual({ pyq: 100, practice: 7 });
    expect(payload.ids.length).toBe(EXAM_REGISTRY.length);
    expect(client.rpcCalls).toEqual(["public_question_counts"]);
  });

  it("throws when the exams read fails", async () => {
    const client = fakeClient({
      exams: { data: null, error: { message: "canceling statement due to statement timeout" } },
      counts: { data: both(NDA, 1, 1), error: null },
    });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/exams/);
  });

  it("throws when the exams read comes back empty (anon can always see the exam list)", async () => {
    const client = fakeClient({ exams: { data: [], error: null }, counts: { data: both(NDA, 1, 1), error: null } });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/exams/);
  });

  it("throws when the count read errors, rather than recording every exam as 0", async () => {
    const client = fakeClient({ exams: { data: EXAM_ROWS, error: null }, counts: { data: null, error: { message: "fetch failed" } } });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/count/);
  });

  it("throws when the count read returns no rows (the bank is never empty)", async () => {
    const client = fakeClient({ exams: { data: EXAM_ROWS, error: null }, counts: { data: [], error: null } });
    await expect(loadExamCatalogPayload(client)).rejects.toThrow(/count/);
  });

  it("still allows a genuine 0: an exam or kind with no row has no questions", async () => {
    const client = fakeClient({
      exams: { data: EXAM_ROWS, error: null },
      counts: { data: [{ exam_id: NDA, question_kind: "practice", questions: 12 }], error: null },
    });
    const payload = await loadExamCatalogPayload(client);
    expect(new Map(payload.counts).get("NDA")).toEqual({ pyq: 0, practice: 12 });
    expect(new Map(payload.counts).get(EXAM_REGISTRY.find((e) => e.examName !== "NDA")!.examName)).toEqual({ pyq: 0, practice: 0 });
  });

  it("keeps the total over EVERY exam, registered or not, for V's bank figure", async () => {
    const client = fakeClient({
      exams: { data: EXAM_ROWS, error: null },
      counts: { data: [...both(NDA, 100, 7), { exam_id: "not-in-registry", question_kind: "pyq", questions: 5 }], error: null },
    });
    const payload = await loadExamCatalogPayload(client);
    expect(payload.allPublicTotal).toBe(112);
    const catalog = shapeExamCatalog(new Map(payload.counts), new Map(payload.ids), undefined, payload.allPublicTotal);
    expect(catalog.allPublicQuestions).toBe(112);
  });
});
