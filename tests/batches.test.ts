/**
 * Unit tests for the pure batch helpers (migration 0054). No env/DB dependency.
 * The RLS + data layer is covered by tests/batches-rls.test.ts.
 */
import { describe, it, expect } from "vitest";
import {
  validateBatchInput,
  splitBatches,
  formatBatchLabel,
  MAX_NAME,
  MAX_BRANCH,
} from "@/lib/batches/validate";
import type { Batch } from "@/lib/batches/types";

describe("validateBatchInput", () => {
  it("trims the name and returns normalized fields", () => {
    const r = validateBatchInput({ name: "  NDA Morning  " });
    expect(r).toEqual({ ok: true, value: { name: "NDA Morning", branch: null, examId: null } });
  });

  it("trims branch and keeps it", () => {
    const r = validateBatchInput({ name: "Batch A", branch: "  FC Road " });
    expect(r).toMatchObject({ ok: true, value: { branch: "FC Road" } });
  });

  it("coerces a blank branch to null", () => {
    expect(validateBatchInput({ name: "B", branch: "   " })).toMatchObject({
      ok: true,
      value: { branch: null },
    });
  });

  it("coerces a blank examId to null and passes a real one through", () => {
    expect(validateBatchInput({ name: "B", examId: "" })).toMatchObject({
      ok: true,
      value: { examId: null },
    });
    expect(validateBatchInput({ name: "B", examId: "abc" })).toMatchObject({
      ok: true,
      value: { examId: "abc" },
    });
  });

  it("rejects an empty / whitespace-only name", () => {
    expect(validateBatchInput({ name: "   " })).toMatchObject({ ok: false });
    expect(validateBatchInput({ name: "" })).toMatchObject({ ok: false });
  });

  it("rejects an over-long name or branch", () => {
    expect(validateBatchInput({ name: "x".repeat(MAX_NAME + 1) })).toMatchObject({ ok: false });
    expect(
      validateBatchInput({ name: "ok", branch: "y".repeat(MAX_BRANCH + 1) })
    ).toMatchObject({ ok: false });
  });
});

describe("splitBatches", () => {
  const b = (over: Partial<Batch>): Batch => ({
    id: over.id ?? "id",
    name: over.name ?? "n",
    branch: over.branch ?? null,
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

  it("sorts each group by branch then name", () => {
    const { active } = splitBatches([
      b({ id: "1", branch: "Kothrud", name: "Z" }),
      b({ id: "2", branch: "FC Road", name: "M" }),
      b({ id: "3", branch: null, name: "A" }),
    ]);
    // unbranched (null -> "") sorts first, then FC Road, then Kothrud
    expect(active.map((x) => x.id)).toEqual(["3", "2", "1"]);
  });
});

describe("formatBatchLabel", () => {
  it("prefixes the branch when present", () => {
    expect(formatBatchLabel({ name: "Morning", branch: "FC Road" })).toBe("FC Road · Morning");
  });
  it("shows just the name when unbranched", () => {
    expect(formatBatchLabel({ name: "Morning", branch: null })).toBe("Morning");
  });
});
