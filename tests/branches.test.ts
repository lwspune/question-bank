/**
 * Unit tests for the pure branch helpers (migration 0055). No env/DB dependency.
 * RLS + data layer is covered by tests/branches-rls.test.ts.
 */
import { describe, it, expect } from "vitest";
import { validateBranchInput, splitBranches, MAX_NAME } from "@/lib/branches/validate";
import type { Branch } from "@/lib/branches/types";

describe("validateBranchInput", () => {
  it("trims and returns the name", () => {
    expect(validateBranchInput({ name: "  FC Road " })).toEqual({
      ok: true,
      value: { name: "FC Road" },
    });
  });

  it("rejects blank names", () => {
    expect(validateBranchInput({ name: "   " })).toMatchObject({ ok: false });
    expect(validateBranchInput({ name: "" })).toMatchObject({ ok: false });
  });

  it("rejects an over-long name", () => {
    expect(validateBranchInput({ name: "x".repeat(MAX_NAME + 1) })).toMatchObject({ ok: false });
  });
});

describe("splitBranches", () => {
  const b = (over: Partial<Branch>): Branch => ({
    id: over.id ?? "id",
    name: over.name ?? "n",
    archived: over.archived ?? false,
    createdBy: null,
    updatedAt: "2026-01-01T00:00:00Z",
    ...over,
  });

  it("partitions into active vs archived, each name-sorted", () => {
    const { active, archived } = splitBranches([
      b({ id: "1", name: "Kothrud", archived: false }),
      b({ id: "2", name: "Old Campus", archived: true }),
      b({ id: "3", name: "FC Road", archived: false }),
    ]);
    expect(active.map((x) => x.id)).toEqual(["3", "1"]); // FC Road, Kothrud
    expect(archived.map((x) => x.id)).toEqual(["2"]);
  });
});
