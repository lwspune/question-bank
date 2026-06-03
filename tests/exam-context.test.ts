import { describe, it, expect } from "vitest";
import {
  EXAM_REGISTRY,
  getExamBySlug,
  isExamSlug,
  resolveBankHref,
  resolveGuidesHref,
  resolveNotesHref,
  getActiveTab,
  DEFAULT_EXAM_SLUG,
} from "@/lib/exam/examContext";

describe("EXAM_REGISTRY", () => {
  it("includes NDA, MHT-CET and JEE Mains as known exams", () => {
    const slugs = EXAM_REGISTRY.map((e) => e.slug);
    expect(slugs).toContain("nda");
    expect(slugs).toContain("mht-cet");
    expect(slugs).toContain("jee-mains");
  });

  it("each exam has a non-empty display name and exam name", () => {
    for (const exam of EXAM_REGISTRY) {
      expect(exam.slug.length).toBeGreaterThan(0);
      expect(exam.displayName.length).toBeGreaterThan(0);
      expect(exam.examName.length).toBeGreaterThan(0);
    }
  });

  it("default exam slug is one of the registered slugs", () => {
    const slugs = EXAM_REGISTRY.map((e) => e.slug);
    expect(slugs).toContain(DEFAULT_EXAM_SLUG);
  });
});

describe("isExamSlug", () => {
  it("accepts known slugs", () => {
    expect(isExamSlug("nda")).toBe(true);
    expect(isExamSlug("mht-cet")).toBe(true);
    expect(isExamSlug("jee-mains")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isExamSlug("neet")).toBe(false);
    expect(isExamSlug("")).toBe(false);
    expect(isExamSlug(null)).toBe(false);
    expect(isExamSlug(undefined)).toBe(false);
  });

  it("rejects malicious-looking inputs", () => {
    expect(isExamSlug("nda; drop table users")).toBe(false);
    expect(isExamSlug("../etc/passwd")).toBe(false);
  });
});

describe("getExamBySlug", () => {
  it("returns the registry entry for a known slug", () => {
    const exam = getExamBySlug("nda");
    expect(exam?.slug).toBe("nda");
    expect(exam?.displayName).toBe("NDA");
  });

  it("returns null for an unknown slug", () => {
    expect(getExamBySlug("neet")).toBeNull();
    expect(getExamBySlug("")).toBeNull();
    expect(getExamBySlug(null)).toBeNull();
  });
});

describe("resolveBankHref", () => {
  it("returns /browse with no examId when given no exam UUID", () => {
    expect(resolveBankHref(null)).toBe("/browse");
  });

  it("returns /browse?examId=<uuid> when given a UUID", () => {
    expect(resolveBankHref("abc-123")).toBe("/browse?examId=abc-123");
  });

  it("URL-encodes special characters in the UUID just in case", () => {
    // UUIDs never contain these in practice, but defence-in-depth.
    expect(resolveBankHref("a b&c")).toBe("/browse?examId=a+b%26c");
  });
});

describe("resolveGuidesHref", () => {
  it("returns /guide/nda for the nda slug (real guide subtree)", () => {
    expect(resolveGuidesHref("nda")).toBe("/guide/nda");
  });

  it("returns /guide for mht-cet (no guide subtree yet — falls back to index)", () => {
    expect(resolveGuidesHref("mht-cet")).toBe("/guide");
  });

  it("returns /guide for null exam (no exam context)", () => {
    expect(resolveGuidesHref(null)).toBe("/guide");
  });

  it("returns /guide for unknown slug", () => {
    expect(resolveGuidesHref("neet")).toBe("/guide");
  });
});

describe("resolveNotesHref", () => {
  it("returns /notes/nda-maths for the nda slug (only chapter notes today)", () => {
    expect(resolveNotesHref("nda")).toBe("/notes/nda-maths");
  });

  it("returns /notes/mht-cet-maths for mht-cet (notes subtree shipped 2026-05-30)", () => {
    expect(resolveNotesHref("mht-cet")).toBe("/notes/mht-cet-maths");
  });

  it("returns /notes for jee-mains (no notes subtree yet — falls back to index)", () => {
    expect(resolveNotesHref("jee-mains")).toBe("/notes");
  });

  it("returns /notes for null exam", () => {
    expect(resolveNotesHref(null)).toBe("/notes");
  });

  it("returns /notes for unknown slug", () => {
    expect(resolveNotesHref("ipmat")).toBe("/notes");
  });
});

describe("getActiveTab", () => {
  it("returns 'bank' for /browse and sub-routes", () => {
    expect(getActiveTab("/browse")).toBe("bank");
    expect(getActiveTab("/browse/")).toBe("bank");
    expect(getActiveTab("/browse?examId=x")).toBe("bank");
  });

  it("returns 'guides' for /guide and sub-routes", () => {
    expect(getActiveTab("/guide")).toBe("guides");
    expect(getActiveTab("/guide/nda")).toBe("guides");
    expect(getActiveTab("/guide/nda-maths/principles/modulus-absolute-value")).toBe(
      "guides"
    );
  });

  it("returns 'notes' for /notes and sub-routes", () => {
    expect(getActiveTab("/notes")).toBe("notes");
    expect(getActiveTab("/notes/nda-maths")).toBe("notes");
    expect(getActiveTab("/notes/nda-maths/statistics/central-tendency")).toBe(
      "notes"
    );
  });

  it("returns null for routes not owned by a primary surface", () => {
    expect(getActiveTab("/")).toBeNull();
    expect(getActiveTab("/dashboard")).toBeNull();
    expect(getActiveTab("/upload")).toBeNull();
    expect(getActiveTab("/uploads")).toBeNull();
    expect(getActiveTab("/uploads/abc-123")).toBeNull();
    expect(getActiveTab("/questions/abc-123/edit")).toBeNull();
    expect(getActiveTab("/login")).toBeNull();
  });

  it("does not match prefix-only false positives", () => {
    // /browser would not exist but defensively confirm we don't match it.
    expect(getActiveTab("/browser-other")).toBeNull();
    expect(getActiveTab("/guides")).toBeNull(); // 's' suffix isn't a real route
    expect(getActiveTab("/notes-x")).toBeNull();
  });
});
