/**
 * The build-relevance rule behind the gate's conditional `next build`.
 *
 * `next build` prerenders 689 pages, ~317 of which query Postgres (~25 MB of
 * egress, a couple of minutes). Over 30 days, 78 of 145 pushes to main changed
 * NOTHING the compiler reads — pure ingestion data and docs — so that build ran
 * twice (pre-push + CI) each time and could not have failed.
 *
 * The polarity of this rule is the load-bearing part: it is an ALLOWLIST OF
 * SKIPS, not an allowlist of builds. An unrecognised path builds. That way a
 * new top-level directory, a new config file, or a rename can never silently
 * turn the build off — the rule degrades toward doing the work.
 */
import { describe, it, expect } from "vitest";
import { needsBuild } from "../scripts/lib/needsBuild";

describe("needsBuild", () => {
  describe("builds when the compiler could see the change", () => {
    it.each([
      ["src/lib/questions/query.ts", "app code"],
      ["src/app/browse/page.tsx", "a route"],
      ["src/app/notes/_data/statistics.ts", "notes editorial data (it is TS)"],
      ["next.config.mjs", "build config"],
      ["package.json", "dependencies"],
      ["package-lock.json", "a locked dependency tree"],
      ["tsconfig.json", "compiler config"],
      ["tailwind.config.ts", "style generation"],
      ["postcss.config.mjs", "style generation"],
      ["public/favicon.ico", "a served static asset"],
    ])("%s → builds (%s)", (path) => {
      expect(needsBuild([path])).toBe(true);
    });
  });

  describe("skips when nothing the compiler reads changed", () => {
    it.each([
      ["CLAUDE.md", "docs"],
      ["ROADMAP.md", "docs"],
      ["docs/nested/deep/NOTE.md", "docs at any depth"],
      ["tests/browse-query.test.ts", "tests are not bundled"],
      ["scripts/jee/commit.ts", "ingestion pipeline — src/ never imports it"],
      ["scripts/neet/data/2025.json", "ingestion data"],
      ["supabase/migrations/0066_covered_by.sql", "SQL applied out of band"],
      ["supabase/seed/taxonomy.json", "seed data — src/ never imports it"],
      ["generated-papers/omml-sweep.md", "gitignored build output"],
    ])("%s → skips (%s)", (path) => {
      expect(needsBuild([path])).toBe(false);
    });
  });

  describe("mixed changesets", () => {
    it("builds when ANY path is build-relevant, however many are inert", () => {
      expect(
        needsBuild([
          "CLAUDE.md",
          "scripts/jee/commit.ts",
          "supabase/migrations/0067_x.sql",
          "src/lib/questions/query.ts", // the one that matters
        ])
      ).toBe(true);
    });

    it("skips a wholly inert changeset spanning several inert roots", () => {
      expect(
        needsBuild([
          "CLAUDE.md",
          "ROADMAP.md",
          "tests/needs-build.test.ts",
          "scripts/lib/foo.ts",
          "supabase/migrations/0067_x.sql",
        ])
      ).toBe(false);
    });
  });

  describe("fail-safe polarity", () => {
    it("builds on an unrecognised top-level path, so the rule cannot rot", () => {
      expect(needsBuild(["some-new-toolchain/config.yaml"])).toBe(true);
      expect(needsBuild([".gitattributes"])).toBe(true);
    });

    it("builds on a path that merely CONTAINS an inert segment", () => {
      // `src/scripts/…` is application code; only a LEADING `scripts/` is inert.
      expect(needsBuild(["src/scripts/helper.ts"])).toBe(true);
      expect(needsBuild(["src/tests/fixture.ts"])).toBe(true);
    });

    it("does not treat a .md-like suffix as markdown", () => {
      expect(needsBuild(["src/lib/notes.md.ts"])).toBe(true);
    });

    it("skips only on an empty changeset (nothing to build)", () => {
      expect(needsBuild([])).toBe(false);
    });

    it("ignores blank lines from a raw git diff", () => {
      expect(needsBuild(["CLAUDE.md", "", "  "])).toBe(false);
      expect(needsBuild(["", "src/app/page.tsx"])).toBe(true);
    });

    it("normalises Windows-style separators", () => {
      // The hook shells out to git on Windows; don't let a backslash smuggle a
      // src/ change past the rule as an 'unrecognised' path (it would build
      // anyway — but classify it correctly rather than by accident).
      expect(needsBuild(["scripts\\jee\\commit.ts"])).toBe(false);
      expect(needsBuild(["src\\lib\\query.ts"])).toBe(true);
    });
  });
});
