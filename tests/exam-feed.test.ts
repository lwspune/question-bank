/**
 * Spec for the exam feed (EXAM_TIER_SPEC.md §3.3): which exams a signed-in
 * student sees first, and which collapse under "Other exams".
 *
 * Runs against a SYNTHETIC registry. Asserting only against the real one would
 * pass vacuously for any rule the live data happens not to exercise (the
 * buildExamChips precedent) — e.g. there is one graduate exam today.
 */
import { describe, it, expect } from "vitest";
import type { ExamEntry, ExamSlug, ExamTier } from "@/lib/exam/examContext";
import {
  ANON_FEED,
  anonFeedFor,
  resolveExamFeed,
  resolveStudentTier,
  splitByFeed,
  type ExamFeed,
} from "@/lib/exam/examFeed";

// The slugs are real ExamSlug values so the types hold; the tiers and flags are
// deliberately NOT the real registry's.
function entry(slug: ExamSlug, tier: ExamTier, extra: Partial<ExamEntry> = {}): ExamEntry {
  return {
    slug,
    displayName: slug,
    examName: slug,
    guidesPath: null,
    notesPath: null,
    tier,
    ...extra,
  };
}

const REG: readonly ExamEntry[] = [
  entry("nda", "senior"),
  entry("mht-cet", "senior"),
  entry("cds", "graduate"),
  entry("cbse-10", "school"),
  entry("isc-12", "senior", { noPublicContent: true }),
  entry("jee-mains", "senior"),
  entry("neet", "graduate"),
  entry("mh-sb-9", "school"),
];

describe("resolveStudentTier", () => {
  it("lets a stated stage win over the targets", () => {
    expect(resolveStudentTier({ stage: "college", targetExams: ["nda"] }, REG)).toBe(
      "graduate"
    );
  });

  it("takes the tier held by most targets when no stage is set", () => {
    expect(
      resolveStudentTier({ stage: null, targetExams: ["cds", "nda", "mht-cet"] }, REG)
    ).toBe("senior");
  });

  it("breaks a tie with the FIRST target's tier", () => {
    expect(resolveStudentTier({ stage: null, targetExams: ["cds", "nda"] }, REG)).toBe(
      "graduate"
    );
    expect(resolveStudentTier({ stage: null, targetExams: ["nda", "cds"] }, REG)).toBe(
      "senior"
    );
  });

  it("ignores a target the registry does not know", () => {
    expect(
      resolveStudentTier(
        { stage: null, targetExams: ["bogus" as ExamSlug, "cbse-10"] },
        REG
      )
    ).toBe("school");
  });

  it("is null when nothing is known", () => {
    expect(resolveStudentTier({ stage: null, targetExams: [] }, REG)).toBeNull();
  });
});

describe("resolveExamFeed", () => {
  it("returns the anon feed when nothing is known", () => {
    const feed = resolveExamFeed({ stage: null, targetExams: [] }, REG);
    expect(feed).toEqual(anonFeedFor(REG));
    expect(feed.other).toEqual([]);
    expect(feed.tier).toBeNull();
  });

  it("puts targets first in stored order, then the tier in registry order", () => {
    const feed = resolveExamFeed({ stage: "class-12", targetExams: ["jee-mains", "nda"] }, REG);
    expect(feed.tier).toBe("senior");
    expect(feed.primary).toEqual(["jee-mains", "nda", "mht-cet"]);
    expect(feed.other).toEqual(["cds", "cbse-10", "neet", "mh-sb-9"]);
  });

  it("keeps an out-of-tier target in primary, not other (the CDS+NDA case)", () => {
    const feed = resolveExamFeed({ stage: "class-12", targetExams: ["nda", "cds"] }, REG);
    expect(feed.primary).toEqual(["nda", "cds", "mht-cet", "jee-mains"]);
    expect(feed.other).not.toContain("cds");
  });

  it("never lists a noPublicContent exam, even as a target", () => {
    const feed = resolveExamFeed({ stage: "class-12", targetExams: ["isc-12"] }, REG);
    expect([...feed.primary, ...feed.other]).not.toContain("isc-12");
  });

  it("lists every public exam exactly once across the two groups", () => {
    const feed = resolveExamFeed({ stage: null, targetExams: ["cds", "nda"] }, REG);
    const all = [...feed.primary, ...feed.other];
    expect(new Set(all).size).toBe(all.length);
    expect(all.sort()).toEqual(
      REG.filter((e) => !e.noPublicContent).map((e) => e.slug).sort()
    );
  });

  it("drops unknown target slugs", () => {
    const feed = resolveExamFeed(
      { stage: "class-9-10", targetExams: ["bogus" as ExamSlug] },
      REG
    );
    expect(feed.primary).toEqual(["cbse-10", "mh-sb-9"]);
  });
});

describe("ANON_FEED", () => {
  it("lists every public registry exam in primary and nothing in other", () => {
    expect(ANON_FEED.tier).toBeNull();
    expect(ANON_FEED.other).toEqual([]);
    expect(ANON_FEED.primary).not.toContain("isc-12");
    expect(ANON_FEED.primary[0]).toBe("nda");
  });
});

describe("splitByFeed", () => {
  const feed: ExamFeed = {
    tier: "senior",
    primary: ["jee-mains", "nda"],
    other: ["cds", "cbse-10", "mh-sb-9"],
  };
  type Card = { id: string; slug: ExamSlug | readonly ExamSlug[] | null };

  it("orders primary by the feed and keeps other in input order", () => {
    const cards: Card[] = [
      { id: "mh", slug: "mh-sb-9" },
      { id: "nda", slug: "nda" },
      { id: "cds", slug: "cds" },
      { id: "jee", slug: "jee-mains" },
      { id: "cbse", slug: "cbse-10" },
    ];
    const { primary, other } = splitByFeed(cards, (c) => c.slug, feed);
    expect(primary.map((c) => c.id)).toEqual(["jee", "nda"]);
    expect(other.map((c) => c.id)).toEqual(["mh", "cds", "cbse"]);
  });

  it("keeps an item with no slug in primary rather than dropping it", () => {
    const cards: Card[] = [
      { id: "unknown", slug: null },
      { id: "cds", slug: "cds" },
      { id: "nda", slug: "nda" },
    ];
    const { primary, other } = splitByFeed(cards, (c) => c.slug, feed);
    expect(primary.map((c) => c.id)).toEqual(["nda", "unknown"]);
    expect(other.map((c) => c.id)).toEqual(["cds"]);
  });

  it("puts a family in primary when ANY member is, ranked by its best member", () => {
    const cards: Card[] = [
      { id: "cbse", slug: ["cbse-10", "nda"] }, // a family: one member is primary
      { id: "mh", slug: ["mh-sb-9", "cds"] }, // no member is primary
      { id: "jee", slug: "jee-mains" },
    ];
    const { primary, other } = splitByFeed(cards, (c) => c.slug, feed);
    expect(primary.map((c) => c.id)).toEqual(["jee", "cbse"]);
    expect(other.map((c) => c.id)).toEqual(["mh"]);
  });
});
