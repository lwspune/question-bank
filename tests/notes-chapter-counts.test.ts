/**
 * /notes SUBJECT-landing per-chapter PYQ counts.
 *
 * The subject page fetched ONE ROW PER QUESTION across every chapter of the
 * subject and tallied them in JS. PostgREST stops at 1000 rows without an
 * error, and NDA Maths has 2,280 PYQs, so every chapter whose rows fell past
 * row 1000 rendered "0 PYQs": 18 of 30 cards on /notes/nda-maths, 98 of 172
 * across seven subject pages (2026-10-04), next to blurbs saying "181
 * past-year questions". The counts now come from the `get_chapter_facets`
 * aggregate, which counts in Postgres.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { chapterCountsFromFacets } from "@/lib/notes/chapterCounts";

describe("chapterCountsFromFacets (pure)", () => {
  it("keeps only the chapters the notes registry teaches", () => {
    const rows = [
      { chapter_id: "a", q_count: 181 },
      { chapter_id: "b", q_count: 94 },
      { chapter_id: "c", q_count: 7 },
    ];
    const out = chapterCountsFromFacets(rows, ["a", "b"]);
    expect(out.get("a")).toBe(181);
    expect(out.get("b")).toBe(94);
    expect(out.has("c")).toBe(false);
  });

  it("is not capped: counts past 1000 survive", () => {
    const out = chapterCountsFromFacets([{ chapter_id: "a", q_count: 2280 }], ["a"]);
    expect(out.get("a")).toBe(2280);
  });

  it("omits a chapter with no row, so the caller's ?? 0 applies", () => {
    expect(chapterCountsFromFacets([], ["a"]).has("a")).toBe(false);
  });
});

describe("NotesSubjectLanding counts in the database", () => {
  const src = readFileSync(
    join(process.cwd(), "src/app/notes/_components/NotesSubjectLanding.tsx"),
    "utf8"
  );

  it("never tallies question rows itself", () => {
    // A row tally is what hit the 1000-row cap. Any count must come from an
    // aggregate (RPC or count: "exact").
    expect(src).not.toMatch(/\.from\(\s*["']questions["']\s*\)/);
  });

  it("uses the chapter-count loader", () => {
    expect(src).toMatch(/loadChapterPyqCounts\(/);
  });
});
