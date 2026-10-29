import { describe, it, expect } from "vitest";
// Next's own copy of the library it compiles middleware matchers with.
// eslint-disable-next-line @typescript-eslint/no-require-imports
const { pathToRegexp } = require("next/dist/compiled/path-to-regexp") as {
  pathToRegexp: (path: string) => RegExp;
};
import { config, needsSession } from "@/middleware";
import { INTL_EXAMS, intlExamOfPath } from "@/lib/sites/intl";

// The middleware only runs where its matcher says, and on production www the
// matcher is a static list of paths (Next requires a literal). So a new intl
// exam, or a new URL family for one, must be added to that list by hand, or
// its www copy is served forever instead of moving to intl. This test is the
// check that the list keeps up.

type Matcher = string | { source: string; has?: unknown[]; missing?: unknown[] };

/** The matchers that run on production www: plain paths, plus entries not excluding www. */
const wwwPatterns: RegExp[] = (config.matcher as Matcher[])
  .filter((m) => typeof m === "string")
  .map((m) => pathToRegexp(m as string));

const runsOnWww = (path: string) => wwwPatterns.some((re) => re.test(path));

function samplePaths(slug: string): string[] {
  return [
    `/exams/${slug}`,
    `/notes/${slug}`,
    `/notes/${slug}-biology`,
    `/notes/${slug}-biology/cell-biology/a-page`,
    `/notes/print/${slug}-physics/kinematics`,
    `/formula/${slug}`,
    `/formula/${slug}/biology/enzymes`,
    `/mock/exam/${slug}`,
    `/mock/exam/${slug}/past-papers`,
    `/mock/${slug}-2023`,
    `/mock/${slug}-2023/paper`,
    `/questions/${slug}/biology/cell-biology`,
  ];
}

describe("middleware matcher on www", () => {
  it("runs on every URL family of every international exam", () => {
    for (const exam of INTL_EXAMS) {
      for (const p of samplePaths(exam.slug)) {
        expect(intlExamOfPath(p), p).toBe(exam.slug);
        expect(runsOnWww(p), `matcher misses ${p}`).toBe(true);
      }
    }
  });

  it("runs on the intl-only pages, so www never serves them", () => {
    expect(runsOnWww("/intl")).toBe(true);
    expect(runsOnWww("/intl/sitemap.xml")).toBe(true);
  });

  it("still runs on the signed-in surfaces it always ran on", () => {
    for (const p of ["/dashboard", "/dashboard/sales", "/account", "/upload", "/uploads/x", "/login", "/signup"]) {
      expect(runsOnWww(p), p).toBe(true);
    }
  });

  it("does NOT run on PYQ Vault's public pages, which pay for every middleware call", () => {
    for (const p of ["/", "/notes/nda-maths", "/mock/nda-2024-i", "/browse", "/questions/jee-mains/maths/x", "/exams/ipmat-indore"]) {
      expect(runsOnWww(p), p).toBe(false);
    }
  });

  it("runs on every page of every other host (intl, localhost, previews)", () => {
    const other = (config.matcher as Matcher[]).find(
      (m) => typeof m !== "string" && Array.isArray(m.missing)
    ) as { source: string } | undefined;
    expect(other).toBeDefined();
    const re = pathToRegexp(other!.source);
    expect(re.test("/")).toBe(true);
    expect(re.test("/notes/nda-maths")).toBe(true);
    expect(re.test("/_next/static/chunk.js")).toBe(false);
    expect(re.test("/api/billing/order")).toBe(false);
  });
});

describe("needsSession", () => {
  it("refreshes the session only on the surfaces that always had it", () => {
    for (const p of ["/dashboard", "/dashboard/x", "/account", "/account/x", "/upload", "/uploads", "/login", "/signup"]) {
      expect(needsSession(p), p).toBe(true);
    }
    for (const p of ["/", "/notes/imat", "/pricing", "/accounts", "/uploader"]) {
      expect(needsSession(p), p).toBe(false);
    }
  });
});
