/**
 * The NDA Maths Top 10 PYQs list must not weigh down every notes chapter page.
 *
 * WHY (measured from the deploy route tables): every /notes chapter landing went from
 * 325 kB to 411 kB of first-load JavaScript between the 2026-11-03 and 2026-11-04 deploys,
 * while the subtopic page moved 2 kB and /browse 0. The only commit in that window touching
 * NotesChapterLanding was a601fc9c6, which imported the client component NotesTopPyqs
 * statically, although it renders on 30 of 523 chapters (TOP_PYQS_SUBJECTS = nda-maths).
 * A static import of a client component puts it in every page that can reach it; a
 * next/dynamic import loads it only where it renders. TECH_DEBT_SPEC.md 1.3.
 */
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";

const SRC = fs.readFileSync(path.resolve(__dirname, "../src/app/notes/_components/NotesChapterLanding.tsx"), "utf8");

describe("NotesChapterLanding loads Top 10 PYQs lazily", () => {
  it("has no static import of NotesTopPyqs", () => {
    expect(SRC).not.toMatch(/^import\s+NotesTopPyqs\b/m);
  });

  it("loads it with next/dynamic", () => {
    expect(SRC).toMatch(/dynamic\(\s*\(\)\s*=>\s*import\(\s*["']\.\/NotesTopPyqs["']\s*\)/);
  });
});
