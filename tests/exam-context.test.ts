import { describe, it, expect } from "vitest";
import {
  EXAM_REGISTRY,
  getExamBySlug,
  isExamSlug,
  isPracticeOnlyExam,
  resolveBankHref,
  resolveGuidesHref,
  resolveNotesHref,
  getActiveTab,
  examHasMocks,
  DEFAULT_EXAM_SLUG,
  BOARDS,
  stdsForBoard,
  getExamForBoardStd,
} from "@/lib/exam/examContext";

describe("isPracticeOnlyExam", () => {
  it("is true for the Foundation Course (worksheet-only corpus)", () => {
    expect(isPracticeOnlyExam("Foundation Course")).toBe(true);
  });
  // FLIPPED 2026-08-13, deliberately. This asserted `true` while the exam held
  // only the Balbharati textbook corpus. Its board PYQs are now in — 317
  // questions across all 15 Maths chapters, every sitting 2015-2025 — so the
  // flag has to read false: it tracks whether an exam HAS past-year questions,
  // not which corpus is larger (the textbook side is still ~8x bigger and stays
  // reachable on the /browse toggle). Same reasoning as mh-ssc-10, which has
  // never been practiceOnly because Class 10 is a board year.
  it("is FALSE for Maharashtra HSC Class 12 now that its board PYQs are in", () => {
    expect(isPracticeOnlyExam("Maharashtra HSC Class 12")).toBe(false);
  });

  // Class 9 and 11 are NOT board years, so they can never acquire PYQs and stay
  // practice-only permanently — unlike Class 12 above, whose flag was always
  // going to flip once the papers were ingested.
  it("is true for the non-board years, which can never have PYQs", () => {
    expect(isPracticeOnlyExam("Maharashtra State Board Class 9")).toBe(true);
    expect(isPracticeOnlyExam("Maharashtra State Board Class 11")).toBe(true);
  });
  it("is false for PYQ exams and unknown/empty names", () => {
    expect(isPracticeOnlyExam("NDA")).toBe(false);
    expect(isPracticeOnlyExam("MHT-CET")).toBe(false);
    expect(isPracticeOnlyExam("Nonexistent")).toBe(false);
    expect(isPracticeOnlyExam(null)).toBe(false);
    expect(isPracticeOnlyExam(undefined)).toBe(false);
  });
});

describe("EXAM_REGISTRY", () => {
  it("includes NDA, MHT-CET, JEE Mains and NEET as known exams", () => {
    const slugs = EXAM_REGISTRY.map((e) => e.slug);
    expect(slugs).toContain("nda");
    expect(slugs).toContain("mht-cet");
    expect(slugs).toContain("jee-mains");
    expect(slugs).toContain("neet");
    expect(slugs).toContain("mh-hsc-12");
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
    expect(isExamSlug("neet")).toBe(true);
  });

  it("rejects unknown values", () => {
    expect(isExamSlug("ipmat")).toBe(false); // still on the roadmap, not yet registered
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

  it("returns the registry entry for the neet slug", () => {
    const exam = getExamBySlug("neet");
    expect(exam?.slug).toBe("neet");
    expect(exam?.examName).toBe("NEET");
  });

  it("returns null for an unknown slug", () => {
    expect(getExamBySlug("ipmat")).toBeNull();
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

  it("returns the MHT-CET subtree for mht-cet", () => {
    // Shipped 2026-08-22 (Template C, Mathematics). The guide-less fallback
    // is still covered below by neet + jee-mains.
    expect(resolveGuidesHref("mht-cet")).toBe("/guide/mht-cet");
  });

  it("returns /guide for jee-mains (no guide subtree yet — falls back to index)", () => {
    expect(resolveGuidesHref("jee-mains")).toBe("/guide");
  });

  it("returns /guide for null exam (no exam context)", () => {
    expect(resolveGuidesHref(null)).toBe("/guide");
  });

  it("returns /guide for neet (no guide subtree yet — falls back to index)", () => {
    expect(resolveGuidesHref("neet")).toBe("/guide");
  });

  it("returns /guide for unknown slug", () => {
    expect(resolveGuidesHref("ipmat")).toBe("/guide");
  });
});

describe("resolveNotesHref", () => {
  it("returns the /notes/nda exam hub for the nda slug", () => {
    expect(resolveNotesHref("nda")).toBe("/notes/nda");
  });

  it("returns the /notes/mht-cet exam hub for mht-cet", () => {
    expect(resolveNotesHref("mht-cet")).toBe("/notes/mht-cet");
  });

  it("returns the /notes/jee-mains hub for jee-mains (shows coming-soon until notes ship)", () => {
    expect(resolveNotesHref("jee-mains")).toBe("/notes/jee-mains");
  });

  it("returns /notes for null exam", () => {
    expect(resolveNotesHref(null)).toBe("/notes");
  });

  it("returns the /notes/neet hub for neet (shows coming-soon until notes ship)", () => {
    expect(resolveNotesHref("neet")).toBe("/notes/neet");
  });

  it("returns the /notes/mh-hsc-12 hub for mh-hsc-12 (coming-soon until notes ship)", () => {
    expect(resolveNotesHref("mh-hsc-12")).toBe("/notes/mh-hsc-12");
  });

  it("returns /notes for unknown slug", () => {
    expect(resolveNotesHref("cuet")).toBe("/notes");
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

  it("returns 'mock' for /mock and sub-routes", () => {
    expect(getActiveTab("/mock")).toBe("mock");
    expect(getActiveTab("/mock/nda-2024-sep-maths")).toBe("mock");
    expect(getActiveTab("/mock/nda-2024-sep-maths/attempt/abc-123")).toBe("mock");
    expect(getActiveTab("/mock/attempt/abc-123/result")).toBe("mock");
  });

  it("returns 'papers' for /dashboard/papers and sub-routes", () => {
    expect(getActiveTab("/dashboard/papers")).toBe("papers");
    expect(getActiveTab("/dashboard/papers/")).toBe("papers");
    expect(getActiveTab("/dashboard/papers/abc-123")).toBe("papers");
  });

  it("returns null for routes not owned by a primary surface", () => {
    expect(getActiveTab("/")).toBeNull();
    // bare /dashboard is admin tooling, not a primary tab
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

// ---------------------------------------------------------------------------
// Board x Std axis — the written-paper picker's first two dropdowns.
//
// The `exams` table CONFLATES board and class into one row (mh-ssc-10 IS
// "Maharashtra State Board" x 10), so the registry is the only place the two
// can be separated. These tests pin the derivation, and — just as important —
// pin the HONEST GAPS: CBSE 9/10 resolve to null because there is no corpus,
// so the picker can never offer a paper the bank cannot fill. Maharashtra Std 11
// WAS such a gap until the mh-sb-11 Class-11 Maths corpus landed (2026-08-10);
// CBSE Std 11 was the last remaining one until the NCERT Class-11 Maths corpus
// landed (2026-08-17). Both boards now carry 11 — so a `null` here means only
// CBSE 9/10, and if either of those ever ships, this block must move again.
// ---------------------------------------------------------------------------

describe("BOARDS", () => {
  it("lists each board once, in registry order", () => {
    expect(BOARDS).toEqual(["Maharashtra State Board", "CBSE"]);
  });
});

describe("stdsForBoard", () => {
  it("returns Maharashtra's stds ascending — 11 present since the Class-11 corpus landed", () => {
    expect(stdsForBoard("Maharashtra State Board")).toEqual([9, 10, 11, 12]);
  });

  it("returns CBSE's stds ascending — 11 present since the NCERT Class-11 corpus landed", () => {
    expect(stdsForBoard("CBSE")).toEqual([11, 12]);
  });

  it("returns [] for an unknown or empty board", () => {
    expect(stdsForBoard("ICSE")).toEqual([]);
    expect(stdsForBoard("")).toEqual([]);
    expect(stdsForBoard(null)).toEqual([]);
    expect(stdsForBoard(undefined)).toEqual([]);
  });
});

describe("getExamForBoardStd", () => {
  it("resolves each Maharashtra board+std pair to its exam", () => {
    expect(getExamForBoardStd("Maharashtra State Board", 9)?.slug).toBe("mh-sb-9");
    expect(getExamForBoardStd("Maharashtra State Board", 10)?.slug).toBe("mh-ssc-10");
    expect(getExamForBoardStd("Maharashtra State Board", 11)?.slug).toBe("mh-sb-11");
    expect(getExamForBoardStd("Maharashtra State Board", 12)?.slug).toBe("mh-hsc-12");
  });

  it("resolves each CBSE board+std pair to its exam", () => {
    expect(getExamForBoardStd("CBSE", 11)?.slug).toBe("cbse-11");
    expect(getExamForBoardStd("CBSE", 12)?.slug).toBe("cbse-12");
  });

  it("returns null for CBSE classes that have no corpus yet", () => {
    expect(getExamForBoardStd("CBSE", 9)).toBeNull();
    expect(getExamForBoardStd("CBSE", 10)).toBeNull();
  });

  it("returns null for an unknown board or a missing argument", () => {
    expect(getExamForBoardStd("ICSE", 10)).toBeNull();
    expect(getExamForBoardStd(null, 10)).toBeNull();
    expect(getExamForBoardStd("CBSE", null)).toBeNull();
  });
});

describe("board/std registry invariants", () => {
  it("board and std are declared together — never one without the other", () => {
    for (const exam of EXAM_REGISTRY) {
      expect(exam.board === undefined).toBe(exam.std === undefined);
    }
  });

  it("no two exams claim the same board+std pair (the pair must resolve to one exam)", () => {
    const seen = new Set<string>();
    for (const exam of EXAM_REGISTRY) {
      if (!exam.board || !exam.std) continue;
      const pair = `${exam.board}|${exam.std}`;
      expect(seen.has(pair)).toBe(false);
      seen.add(pair);
    }
  });

  it("every board+std exam is a school board, and coaching exams carry no board", () => {
    // Foundation Course spans Class 9 AND 10 and is an LWS course, not a board —
    // it must stay off this axis or the picker would offer it as a "board".
    expect(getExamBySlug("foundation-course")?.board).toBeUndefined();
    expect(getExamBySlug("nda")?.board).toBeUndefined();
    expect(getExamBySlug("neet")?.board).toBeUndefined();
  });
});
