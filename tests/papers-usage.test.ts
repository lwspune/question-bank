/**
 * Unit tests for the pure cross-paper usage helpers (soft-warn feature).
 * These have no env/DB dependency and always run.
 *
 * The DB query getQuestionUsage is covered by papers-usage-rls.test.ts.
 */
import { describe, it, expect } from "vitest";
import {
  summarizeUsage,
  formatUsageLabel,
  filterUnused,
  type UsageQueryRow,
  type UsageRef,
} from "@/lib/papers/usage";

const row = (
  questionId: string,
  paper: Partial<{
    id: string;
    title: string;
    status: "draft" | "finalized";
    finalized_at: string | null;
    updated_at: string | null;
  }>
): UsageQueryRow => ({
  question_id: questionId,
  paper: {
    id: paper.id ?? "p1",
    title: paper.title ?? "Paper",
    status: paper.status ?? "draft",
    finalized_at: paper.finalized_at ?? null,
    updated_at: paper.updated_at ?? null,
  },
});

describe("summarizeUsage", () => {
  it("groups multiple papers under one question id", () => {
    const map = summarizeUsage([
      row("q1", { id: "pa", title: "Mock A" }),
      row("q1", { id: "pb", title: "Mock B" }),
      row("q2", { id: "pa", title: "Mock A" }),
    ]);
    expect(map.get("q1")).toHaveLength(2);
    expect(map.get("q2")).toHaveLength(1);
  });

  it("uses finalized_at as the date for finalized papers, updated_at otherwise", () => {
    const map = summarizeUsage([
      row("q1", {
        id: "pf",
        status: "finalized",
        finalized_at: "2026-04-12T00:00:00Z",
        updated_at: "2026-01-01T00:00:00Z",
      }),
      row("q2", {
        id: "pd",
        status: "draft",
        updated_at: "2026-05-01T00:00:00Z",
      }),
    ]);
    expect(map.get("q1")![0].date).toBe("2026-04-12T00:00:00Z");
    expect(map.get("q2")![0].date).toBe("2026-05-01T00:00:00Z");
  });

  it("flattens a PostgREST array-shaped embed", () => {
    const arrShaped: UsageQueryRow = {
      question_id: "q1",
      // supabase-js sometimes types a to-one embed as an array
      paper: [
        { id: "pa", title: "Mock A", status: "draft", finalized_at: null, updated_at: null },
      ] as unknown as UsageQueryRow["paper"],
    };
    const map = summarizeUsage([arrShaped]);
    expect(map.get("q1")).toHaveLength(1);
    expect(map.get("q1")![0].title).toBe("Mock A");
  });

  it("dedupes the same paper appearing twice for one question", () => {
    const map = summarizeUsage([
      row("q1", { id: "pa", title: "Mock A" }),
      row("q1", { id: "pa", title: "Mock A" }),
    ]);
    expect(map.get("q1")).toHaveLength(1);
  });

  it("sorts refs most-recent first", () => {
    const map = summarizeUsage([
      row("q1", { id: "old", title: "Old", updated_at: "2026-01-01T00:00:00Z" }),
      row("q1", { id: "new", title: "New", updated_at: "2026-06-01T00:00:00Z" }),
    ]);
    expect(map.get("q1")!.map((r) => r.paperId)).toEqual(["new", "old"]);
  });

  it("skips rows whose embed is null", () => {
    const map = summarizeUsage([{ question_id: "q1", paper: null }]);
    expect(map.has("q1")).toBe(false);
  });
});

describe("formatUsageLabel", () => {
  const ref = (over: Partial<UsageRef> = {}): UsageRef => ({
    paperId: "p",
    title: "Maths Mock 3",
    status: "finalized",
    date: null,
    ...over,
  });

  it("renders a single finalized paper as 'issued'", () => {
    expect(formatUsageLabel([ref({ status: "finalized" })])).toBe(
      'Used in "Maths Mock 3" (issued)'
    );
  });

  it("renders a single draft paper as 'draft'", () => {
    expect(formatUsageLabel([ref({ status: "draft" })])).toBe(
      'Used in "Maths Mock 3" (draft)'
    );
  });

  it("appends +N for additional papers", () => {
    expect(
      formatUsageLabel([
        ref({ paperId: "a", title: "Mock A", status: "finalized" }),
        ref({ paperId: "b", title: "Mock B" }),
        ref({ paperId: "c", title: "Mock C" }),
      ])
    ).toBe('Used in "Mock A" (issued) +2');
  });

  it("returns empty string for no refs", () => {
    expect(formatUsageLabel([])).toBe("");
  });
});

describe("filterUnused", () => {
  it("drops ids that appear in the usage map with refs", () => {
    const usage = new Map<string, UsageRef[]>([
      ["used1", [{ paperId: "p", title: "x", status: "draft", date: null }]],
    ]);
    expect(filterUnused(["used1", "free1", "free2"], usage)).toEqual(["free1", "free2"]);
  });

  it("keeps ids whose usage list is empty", () => {
    const usage = new Map<string, UsageRef[]>([["q", []]]);
    expect(filterUnused(["q"], usage)).toEqual(["q"]);
  });

  it("preserves input order", () => {
    expect(filterUnused(["b", "a", "c"], new Map())).toEqual(["b", "a", "c"]);
  });
});
