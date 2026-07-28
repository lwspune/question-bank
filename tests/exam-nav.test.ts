/**
 * Spec for the client-side exam nav resolution.
 *
 * These hrefs used to be computed on the SERVER from the `qb_exam` cookie,
 * which forced every page on the site to render per-request — no page could
 * ever be cached. Moving the resolution to the browser is what unlocks caching,
 * so this pure core has to be exactly right: it is the whole primary nav.
 *
 * The exam-id map is passed IN rather than looked up, because it is public
 * taxonomy that is identical for every visitor — so the server can compute it
 * once, cache it, and embed it in a page that is shared by everyone.
 */
import { describe, it, expect } from "vitest";
import { resolveExamNav, readExamSlugFromCookieString } from "@/lib/exam/examNav";

const IDS = {
  nda: "11111111-1111-1111-1111-111111111111",
  "mht-cet": "22222222-2222-2222-2222-222222222222",
  "cbse-12": "33333333-3333-3333-3333-333333333333",
} as Record<string, string | null>;

describe("resolveExamNav", () => {
  it("points the Bank tab at the active exam's filtered view", () => {
    expect(resolveExamNav("nda", IDS).bankHref).toBe(`/browse?examId=${IDS.nda}`);
  });

  it("falls back to the bare bank when the exam has no seeded UUID", () => {
    // An exam registered in code but not yet seeded in the DB must not produce
    // `/browse?examId=undefined`.
    expect(resolveExamNav("nda", {}).bankHref).toBe("/browse");
    expect(resolveExamNav("nda", { nda: null }).bankHref).toBe("/browse");
  });

  it("routes Guides and Notes to the exam subtree when one exists", () => {
    const nav = resolveExamNav("nda", IDS);
    expect(nav.guidesHref).toBe("/guide/nda");
    expect(nav.notesHref).toBe("/notes/nda");
  });

  it("falls back to the index for an exam with no guide subtree", () => {
    expect(resolveExamNav("mht-cet", IDS).guidesHref).toBe("/guide");
  });

  it("sends the Board tab to the exam hub only for a board exam", () => {
    expect(resolveExamNav("cbse-12", IDS).boardHref).toBe("/board/cbse-12");
    expect(resolveExamNav("nda", IDS).boardHref).toBe("/board");
  });

  it("shows Mocks only for exams that have published mocks", () => {
    expect(resolveExamNav("nda", IDS).showMocks).toBe(true);
    expect(resolveExamNav("mht-cet", IDS).showMocks).toBe(false);
  });

  it("falls back to the default exam for an unknown slug", () => {
    const nav = resolveExamNav("not-an-exam", IDS);
    expect(nav.slug).toBe("nda");
    expect(nav.guidesHref).toBe("/guide/nda");
  });
});

describe("readExamSlugFromCookieString", () => {
  it("returns the default when there are no cookies", () => {
    expect(readExamSlugFromCookieString("")).toBe("nda");
  });

  it("reads the slug out of a cookie string with neighbours", () => {
    expect(
      readExamSlugFromCookieString("theme=dark; qb_exam=mht-cet; qb_revealed=3")
    ).toBe("mht-cet");
  });

  it("tolerates the leading space browsers put between cookies", () => {
    expect(readExamSlugFromCookieString("theme=dark;qb_exam=cbse-12")).toBe(
      "cbse-12"
    );
  });

  it("url-decodes the value", () => {
    expect(readExamSlugFromCookieString("qb_exam=mht%2Dcet")).toBe("mht-cet");
  });

  it("falls back to the default for a junk or unknown value", () => {
    expect(readExamSlugFromCookieString("qb_exam=deleted-exam")).toBe("nda");
    expect(readExamSlugFromCookieString("qb_exam=")).toBe("nda");
  });

  it("does not match a cookie whose name merely ENDS with qb_exam", () => {
    // `xqb_exam` must not be mistaken for `qb_exam`.
    expect(readExamSlugFromCookieString("xqb_exam=mht-cet")).toBe("nda");
  });
});
