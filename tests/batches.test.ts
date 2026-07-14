/**
 * Unit tests for the pure batch helpers (migration 0054; branch entity 0055).
 * No env/DB dependency. RLS + data layer is covered by tests/batches-rls.test.ts.
 */
import { describe, it, expect } from "vitest";
import {
  validateBatchInput,
  splitBatches,
  formatBatchLabel,
  MAX_NAME,
} from "@/lib/batches/validate";
import type { Batch } from "@/lib/batches/types";

describe("validateBatchInput", () => {
  it("trims the name and returns normalized fields", () => {
    const r = validateBatchInput({ name: "  NDA Morning  " });
    expect(r).toEqual({ ok: true, value: { name: "NDA Morning", branchId: null, examId: null } });
  });

  it("keeps a provided branchId and examId, coercing blanks to null", () => {
    expect(validateBatchInput({ name: "B", branchId: "br-1", examId: "ex-1" })).toMatchObject({
      ok: true,
      value: { branchId: "br-1", examId: "ex-1" },
    });
    expect(validateBatchInput({ name: "B", branchId: "  ", examId: "" })).toMatchObject({
      ok: true,
      value: { branchId: null, examId: null },
    });
  });

  it("rejects an empty / whitespace-only name", () => {
    expect(validateBatchInput({ name: "   " })).toMatchObject({ ok: false });
    expect(validateBatchInput({ name: "" })).toMatchObject({ ok: false });
  });

  it("rejects an over-long name", () => {
    expect(validateBatchInput({ name: "x".repeat(MAX_NAME + 1) })).toMatchObject({ ok: false });
  });
});

describe("splitBatches", () => {
  const b = (over: Partial<Batch>): Batch => ({
    id: over.id ?? "id",
    name: over.name ?? "n",
    branchId: over.branchId ?? null,
    branchName: over.branchName ?? null,
    examId: over.examId ?? null,
    archived: over.archived ?? false,
    createdBy: null,
    updatedAt: "2026-01-01T00:00:00Z",
    ...over,
  });

  it("partitions into active vs archived", () => {
    const { active, archived } = splitBatches([
      b({ id: "1", name: "B", archived: false }),
      b({ id: "2", name: "A", archived: true }),
      b({ id: "3", name: "A", archived: false }),
    ]);
    expect(active.map((x) => x.id)).toEqual(["3", "1"]); // name-sorted: A then B
    expect(archived.map((x) => x.id)).toEqual(["2"]);
  });

  it("sorts each group by branch name then batch name", () => {
    const { active } = splitBatches([
      b({ id: "1", branchName: "Kothrud", name: "Z" }),
      b({ id: "2", branchName: "FC Road", name: "M" }),
      b({ id: "3", branchName: null, name: "A" }),
    ]);
    // unbranched (null -> "") sorts first, then FC Road, then Kothrud
    expect(active.map((x) => x.id)).toEqual(["3", "2", "1"]);
  });
});

describe("formatBatchLabel", () => {
  it("prefixes the branch name when present", () => {
    expect(formatBatchLabel({ name: "Morning", branchName: "FC Road" })).toBe("FC Road · Morning");
  });
  it("shows just the name when unbranched", () => {
    expect(formatBatchLabel({ name: "Morning", branchName: null })).toBe("Morning");
  });
});
