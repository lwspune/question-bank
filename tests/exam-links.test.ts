/**
 * Per-exam destinations used by /me and the nav (EXAM_TIER_SPEC.md §4.2, §4.5).
 * The rule the tests guard: a shortcut goes to an exam's own page ONLY when that
 * page has something on it. /notes/<slug> for an exam with no notes is a
 * "coming soon" dead end, and that dead end is why the Notes tab was never
 * personalised before.
 */
import { describe, it, expect } from "vitest";
import {
  mockCatalogueHref,
  notesHubHref,
  firstMockHref,
  firstNotesHref,
  yourExamLinks,
} from "@/lib/exam/examLinks";
import type { ExamSlug } from "@/lib/exam/examContext";

const NOTES = new Set<ExamSlug>(["nda", "mht-cet"]);
const IDS = { nda: "uuid-nda", "cbse-11": "uuid-cbse-11", "mh-sb-9": null };

describe("mockCatalogueHref", () => {
  it("goes to the exam's catalogue when it has mocks", () => {
    expect(mockCatalogueHref("nda")).toBe("/mock/exam/nda");
  });
  it("falls back to /mock for an exam without mocks, or none", () => {
    expect(mockCatalogueHref("cbse-11")).toBe("/mock");
    expect(mockCatalogueHref(null)).toBe("/mock");
  });
});

describe("notesHubHref", () => {
  it("goes to the exam's hub only when it has notes", () => {
    expect(notesHubHref("nda", NOTES)).toBe("/notes/nda");
    expect(notesHubHref("neet", NOTES)).toBe("/notes");
    expect(notesHubHref(null, NOTES)).toBe("/notes");
  });
});

describe("firstMockHref / firstNotesHref", () => {
  it("uses the first target that has mocks", () => {
    expect(firstMockHref(["cbse-11", "neet", "nda"])).toBe("/mock/exam/neet");
    expect(firstMockHref(["cbse-11"])).toBe("/mock");
    expect(firstMockHref([])).toBe("/mock");
  });
  it("uses the first target that has notes", () => {
    expect(firstNotesHref(["neet", "mht-cet", "nda"], NOTES)).toBe("/notes/mht-cet");
    expect(firstNotesHref(["neet"], NOTES)).toBe("/notes");
  });
});

describe("yourExamLinks", () => {
  it("links each target in order: mocks when it has them, else its bank", () => {
    expect(yourExamLinks(["cbse-11", "nda"], IDS)).toEqual([
      { slug: "cbse-11", label: "CBSE Class 11", href: "/browse?examId=uuid-cbse-11" },
      { slug: "nda", label: "NDA", href: "/mock/exam/nda" },
    ]);
  });
  it("falls back to the bare bank when the exam id is unknown", () => {
    expect(yourExamLinks(["mh-sb-9"], IDS)[0].href).toBe("/browse");
  });
  it("skips a slug the registry does not know", () => {
    expect(yourExamLinks(["bogus" as ExamSlug], IDS)).toEqual([]);
  });
});
