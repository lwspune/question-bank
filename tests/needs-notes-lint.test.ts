/**
 * The relevance rule behind the gate's conditional `notes:lint`.
 *
 * `notes:lint` validates the /notes editorial modules against the LIVE
 * taxonomy + concept tags. It costs 69-76 s in Aug 2026 and 91 s by Sep — it
 * grows with the bank — and it can only be moved by a change to the editorial
 * modules, the lint itself, or the schema it reads. Every other push paid for
 * it and could not have failed it.
 *
 * POLARITY — the OPPOSITE of needsBuild, and the difference matters. needsBuild
 * is an allowlist of SKIPS (an unrecognised path builds). Almost every push
 * touches src/ somewhere, so a skip-allowlist here would fire on nearly all of
 * them and buy nothing. This is therefore an allowlist of RUNS: named roots
 * that notes:lint actually reads. That polarity CAN rot — notes-lint.ts grows
 * a new import and the rule never learns — so it is pinned by
 * tests/notes-lint-import-roots.test.ts, which walks the lint's real static
 * import graph and fails if any reachable file lies outside NOTES_LINT_ROOTS.
 */
import { describe, it, expect } from "vitest";
import { needsNotesLint, NOTES_LINT_ROOTS } from "../scripts/lib/needsNotesLint";

describe("needsNotesLint", () => {
  describe("runs when something notes:lint reads changed", () => {
    it.each([
      ["src/app/notes/nda-maths/statistics/_data/index.ts", "a chapter's editorial data"],
      ["src/app/notes/_types.ts", "the SubtopicNote / ConceptUnit types"],
      ["src/app/notes/mht-cet-maths/vectors/page.tsx", "anything under the notes route"],
      ["src/lib/notes/chapters.ts", "the NOTES_CHAPTERS registry"],
      ["src/lib/notes/pyqDuplication.ts", "a helper the lint imports"],
      ["scripts/notes-lint.ts", "the lint itself"],
      ["supabase/migrations/0113_rename_concept_tags.sql", "the schema it reads"],
      ["package.json", "dependencies"],
      ["package-lock.json", "a locked dependency tree"],
      ["tsconfig.json", "path aliases the lint resolves through"],
    ])("%s → runs (%s)", (path) => {
      expect(needsNotesLint([path])).toBe(true);
    });
  });

  describe("skips when nothing it reads changed", () => {
    it.each([
      ["src/app/browse/page.tsx", "an unrelated route"],
      ["src/lib/questions/query.ts", "app code outside notes"],
      ["src/app/guide/nda-maths/page.tsx", "the guide (not imported by the lint)"],
      ["src/components/AppHeader.tsx", "shared chrome"],
      ["CLAUDE.md", "docs"],
      ["tests/browse-query.test.ts", "tests"],
      ["scripts/jee/commit.ts", "an ingestion pipeline"],
      ["scripts/lib/needsBuild.ts", "another gate helper"],
      ["generated-papers/omml-sweep.md", "build output"],
    ])("%s → skips (%s)", (path) => {
      expect(needsNotesLint([path])).toBe(false);
    });
  });

  describe("mixed changesets", () => {
    it("runs when ANY path is relevant, however many are not", () => {
      expect(
        needsNotesLint([
          "CLAUDE.md",
          "src/app/browse/page.tsx",
          "scripts/jee/commit.ts",
          "src/lib/notes/chapters.ts", // the one that matters
        ])
      ).toBe(true);
    });

    it("skips a changeset that touches only unrelated roots", () => {
      expect(
        needsNotesLint(["CLAUDE.md", "src/app/browse/page.tsx", "tests/x.test.ts"])
      ).toBe(false);
    });
  });

  describe("edge handling", () => {
    it("skips only on an empty changeset", () => {
      expect(needsNotesLint([])).toBe(false);
    });

    it("ignores blank lines from a raw git diff", () => {
      expect(needsNotesLint(["", "  ", "CLAUDE.md"])).toBe(false);
      expect(needsNotesLint(["", "src/lib/notes/chapters.ts"])).toBe(true);
    });

    it("normalises Windows-style separators", () => {
      expect(needsNotesLint(["src\\lib\\notes\\chapters.ts"])).toBe(true);
      expect(needsNotesLint(["src\\app\\browse\\page.tsx"])).toBe(false);
    });

    it("matches roots on a LEADING segment only", () => {
      // `src/lib/notes-reports/` is a different module; `tests/src/lib/notes/…` is not app code.
      expect(needsNotesLint(["src/lib/notes-reports/create.ts"])).toBe(false);
      expect(needsNotesLint(["tests/src/lib/notes/x.ts"])).toBe(false);
    });
  });

  it("exports the roots so the import-graph guard can pin them", () => {
    expect(NOTES_LINT_ROOTS).toContain("src/app/notes/");
    expect(NOTES_LINT_ROOTS).toContain("src/lib/notes/");
    expect(NOTES_LINT_ROOTS).toContain("scripts/notes-lint.ts");
  });
});
