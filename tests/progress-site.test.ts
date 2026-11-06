/**
 * A student's progress on the site they are on (2026-11-06).
 *
 * intl.pyqvault.com shows no Indian exam (owner's rule, 2026-10-30), so its
 * map and drill must show IMAT alone; www shows every exam but the
 * international ones, as it does everywhere else (lib/sites/nicheExams).
 * And nothing on those pages may send an intl student to www.
 */
import { describe, it, expect } from "vitest";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { onSite, forSite, siteFillExam } from "@/lib/sites/siteScope";
import { intlHostDecision, INTL_EXAMS } from "@/lib/sites/intl";
import { drillHref, drillChapterHref } from "@/lib/drill/from";
import { goPracticeHref } from "@/lib/performance/links";
import { holdsSitePass } from "@/lib/billing/passScope";

const IMAT = INTL_EXAMS[0].examName;

describe("onSite", () => {
  it("keeps international exams on intl and every other exam on www", () => {
    expect(onSite(IMAT, true)).toBe(true);
    expect(onSite("NDA", true)).toBe(false);
    expect(onSite("NDA", false)).toBe(true);
    expect(onSite(IMAT, false)).toBe(false);
  });

  it("drops a question it cannot place on intl, and keeps it on www as before", () => {
    expect(onSite(undefined, true)).toBe(false);
    expect(onSite("", true)).toBe(false);
    expect(onSite(undefined, false)).toBe(true);
  });
});

describe("forSite", () => {
  const items = [
    { id: 1, exam: IMAT },
    { id: 2, exam: "NDA" },
    { id: 3, exam: undefined },
  ];
  it("filters by the exam each item names", () => {
    expect(forSite(items, (i) => i.exam, true).map((i) => i.id)).toEqual([1]);
    expect(forSite(items, (i) => i.exam, false).map((i) => i.id)).toEqual([2, 3]);
  });
});

describe("siteFillExam (where the drill tops up from)", () => {
  it("on intl, the student's international exam, else the first one", () => {
    expect(siteFillExam(["nda", "imat"], true)).toBe("imat");
    expect(siteFillExam(["nda"], true)).toBe("imat");
    expect(siteFillExam([], true)).toBe("imat");
  });

  it("on www, the first exam that is not international, else none", () => {
    expect(siteFillExam(["imat", "nda"], false)).toBe("nda");
    expect(siteFillExam(["imat"], false)).toBeNull();
    expect(siteFillExam([], false)).toBeNull();
  });
});

/** True when the intl host serves the link itself or redirects within intl. */
function staysOnIntl(href: string): boolean {
  const url = new URL(href, "https://intl.pyqvault.com");
  const d = intlHostDecision(url.pathname, url.search);
  if (d.kind === "next" || d.kind === "rewrite") return true;
  return d.url.startsWith("/");
}

describe("the progress pages never send an intl student to www", () => {
  const built = [
    drillHref("map"),
    drillHref("again"),
    drillChapterHref("me_weak", "00000000-0000-0000-0000-000000000000"),
    goPracticeHref(IMAT, "Biology", "Genetics", "Mendel"),
    goPracticeHref(IMAT, "Biology", "Genetics"),
    "/me/map?exam=IMAT&subject=Biology",
    "/login?next=/me/map",
    "/login?next=/drill",
  ];
  it.each(built)("%s stays on intl", (href) => {
    expect(staysOnIntl(href)).toBe(true);
  });

  // Every literal href in the pages themselves, so a link added later is checked too.
  const files = ["src/app/me/map/page.tsx", "src/app/drill/page.tsx", "src/app/drill/DrillRunner.tsx"];
  const literals = files.flatMap((f) =>
    [...readFileSync(join(process.cwd(), f), "utf8").matchAll(/href="([^"]+)"/g)].map((m) => [f, m[1]] as const)
  );
  it("finds the pages' literal links", () => {
    expect(literals.length).toBeGreaterThan(3);
  });
  it.each(literals)("%s: %s stays on intl", (_file, href) => {
    expect(staysOnIntl(href)).toBe(true);
  });
});

describe("holdsSitePass (which pass lifts a site's free limits)", () => {
  it("on www, the www pass, as before", () => {
    expect(holdsSitePass({ hasPass: true, passScopes: ["mocks"] }, "pyqvault")).toBe(true);
    expect(holdsSitePass({ hasPass: false, passScopes: ["imat"] }, "pyqvault")).toBe(false);
  });

  it("on intl, the international exam's pass, not the rupee www pass", () => {
    expect(holdsSitePass({ hasPass: false, passScopes: ["imat"] }, "intl")).toBe(true);
    expect(holdsSitePass({ hasPass: true, passScopes: ["mocks"] }, "intl")).toBe(false);
  });

  it("staff ('all') hold every site's pass", () => {
    expect(holdsSitePass({ hasPass: true, passScopes: ["all"] }, "intl")).toBe(true);
  });
});
