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
 *
 * Since the header's exam pill was removed (2026-08-21) the cookie is written
 * ONLY by /welcome and /account, both of which require signing in. So "no
 * cookie" now means "nobody ever told us an exam" — which must resolve to the
 * neutral indexes, NOT to a silent NDA default that would strand an anonymous
 * JEE visitor in the NDA bank with no control to change it.
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

  it("routes Guides to the exam subtree when one exists", () => {
    expect(resolveExamNav("nda", IDS).guidesHref).toBe("/guide/nda");
  });

  it("falls back to the index for an exam with no guide subtree", () => {
    // neet has no /guide subtree; mht-cet gained one on 2026-08-22, so it is
    // no longer the right exemplar for this fallback.
    expect(resolveExamNav("neet", IDS).guidesHref).toBe("/guide");
  });

  it("sends the Guides tab to the MHT-CET subtree for mht-cet", () => {
    expect(resolveExamNav("mht-cet", IDS).guidesHref).toBe("/guide/mht-cet");
  });

  it("sends the Board tab to the exam hub only for a board exam", () => {
    expect(resolveExamNav("cbse-12", IDS).boardHref).toBe("/board/cbse-12");
    expect(resolveExamNav("nda", IDS).boardHref).toBe("/board");
  });

  // Notes is the one tab that is NEVER personalised, and that is deliberate:
  // /notes/<slug> renders "teaching notes are coming soon" for the 10 of 13
  // exams that have none, so pointing the tab there sends most visitors to a
  // dead end. The /notes index lists the exams that actually have notes.
  it("always sends Notes to the cross-exam index, even for an exam WITH notes", () => {
    expect(resolveExamNav("nda", IDS).notesHref).toBe("/notes");
    expect(resolveExamNav("cbse-12", IDS).notesHref).toBe("/notes");
    expect(resolveExamNav(null, IDS).notesHref).toBe("/notes");
  });

  describe("when no exam has been chosen (null)", () => {
    // Every anonymous visitor is in this state, and they are most of the
    // traffic. Nav must be neutral rather than quietly NDA.
    it("routes every tab to its index", () => {
      const nav = resolveExamNav(null, IDS);
      expect(nav.bankHref).toBe("/browse");
      expect(nav.guidesHref).toBe("/guide");
      expect(nav.notesHref).toBe("/notes");
      expect(nav.boardHref).toBe("/board");
    });
  });

  it("treats an unknown slug as no choice at all", () => {
    // A retired exam slug left in an old cookie must not resolve to NDA.
    const nav = resolveExamNav("not-an-exam", IDS);
    expect(nav.bankHref).toBe("/browse");
    expect(nav.guidesHref).toBe("/guide");
  });
});

describe("readExamSlugFromCookieString", () => {
  it("returns null when there are no cookies", () => {
    expect(readExamSlugFromCookieString("")).toBeNull();
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

  it("returns null for a junk or unknown value", () => {
    // A slug retired from the registry must read as "no choice", so the visitor
    // gets neutral nav rather than someone else's exam.
    expect(readExamSlugFromCookieString("qb_exam=deleted-exam")).toBeNull();
    expect(readExamSlugFromCookieString("qb_exam=")).toBeNull();
  });

  it("does not match a cookie whose name merely ENDS with qb_exam", () => {
    // `xqb_exam` must not be mistaken for `qb_exam`.
    expect(readExamSlugFromCookieString("xqb_exam=mht-cet")).toBeNull();
  });
});
