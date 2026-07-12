import { describe, it, expect } from "vitest";
import {
  sanitizeProgressWrite,
  mergeProgressPatch,
  summarizeNotesProgress,
  prettifyNotesSlug,
  type NotesProgressRow,
} from "@/lib/notes/progress";

const base = {
  subtopicSlug: "geometric-progressions",
  chapterSlug: "sequence-series",
  subjectRoute: "nda-maths",
};

describe("sanitizeProgressWrite", () => {
  it("accepts a valid bookmark write", () => {
    const r = sanitizeProgressWrite({ ...base, bookmarked: true });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.bookmarked).toBe(true);
  });

  it("accepts a valid checkpoint write", () => {
    const r = sanitizeProgressWrite({ ...base, checkpoint: { score: 4, total: 5 } });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.checkpoint).toEqual({ score: 4, total: 5 });
  });

  it("rejects a bad subtopic slug", () => {
    expect(sanitizeProgressWrite({ ...base, subtopicSlug: "Bad Slug!", bookmarked: true }).ok).toBe(false);
    expect(sanitizeProgressWrite({ ...base, subtopicSlug: "", bookmarked: true }).ok).toBe(false);
  });

  it("rejects missing slugs", () => {
    expect(sanitizeProgressWrite({ bookmarked: true }).ok).toBe(false);
  });

  it("rejects a checkpoint with score > total or total < 1", () => {
    expect(sanitizeProgressWrite({ ...base, checkpoint: { score: 6, total: 5 } }).ok).toBe(false);
    expect(sanitizeProgressWrite({ ...base, checkpoint: { score: 0, total: 0 } }).ok).toBe(false);
    expect(sanitizeProgressWrite({ ...base, checkpoint: { score: 1.5, total: 5 } }).ok).toBe(false);
  });

  it("rejects a no-op write (slugs only, no change)", () => {
    expect(sanitizeProgressWrite({ ...base }).ok).toBe(false);
  });

  it("rejects non-boolean flags", () => {
    expect(sanitizeProgressWrite({ ...base, bookmarked: "yes" }).ok).toBe(false);
  });

  it("drops touchViewed:false as a no-op but keeps it a change with another field", () => {
    expect(sanitizeProgressWrite({ ...base, touchViewed: false }).ok).toBe(false);
    const r = sanitizeProgressWrite({ ...base, touchViewed: true });
    expect(r.ok).toBe(true);
    if (r.ok) expect(r.value.touchViewed).toBe(true);
  });
});

describe("mergeProgressPatch", () => {
  const now = "2026-07-12T00:00:00.000Z";

  it("stamps mastered_at when mastered:true, clears it when false", () => {
    expect(mergeProgressPatch({ ...base, mastered: true }, now).mastered_at).toBe(now);
    expect(mergeProgressPatch({ ...base, mastered: false }, now).mastered_at).toBe(null);
  });

  it("omits mastered_at entirely when mastered is not in the patch", () => {
    const cols = mergeProgressPatch({ ...base, bookmarked: true }, now);
    expect("mastered_at" in cols).toBe(false);
    expect(cols.bookmarked).toBe(true);
  });

  it("writes the latest checkpoint columns", () => {
    const cols = mergeProgressPatch({ ...base, checkpoint: { score: 3, total: 5 } }, now);
    expect(cols.checkpoint_score).toBe(3);
    expect(cols.checkpoint_total).toBe(5);
    expect(cols.checkpoint_at).toBe(now);
  });

  it("bumps last_viewed_at only when touchViewed set; always sets updated_at", () => {
    expect(mergeProgressPatch({ ...base, touchViewed: true }, now).last_viewed_at).toBe(now);
    expect("last_viewed_at" in mergeProgressPatch({ ...base, bookmarked: true }, now)).toBe(false);
    expect(mergeProgressPatch({ ...base, bookmarked: true }, now).updated_at).toBe(now);
  });
});

describe("summarizeNotesProgress", () => {
  const rows: NotesProgressRow[] = [
    row({ subtopicSlug: "a", bookmarked: true, lastViewedAt: "2026-07-10T00:00:00Z" }),
    row({ subtopicSlug: "b", masteredAt: "2026-07-11T00:00:00Z", lastViewedAt: "2026-07-11T00:00:00Z" }),
    row({ subtopicSlug: "c", bookmarked: true, lastViewedAt: "2026-07-12T00:00:00Z" }),
    row({ subtopicSlug: "d", lastViewedAt: "2026-07-09T00:00:00Z" }),
  ];

  it("returns bookmarks newest-activity first", () => {
    const s = summarizeNotesProgress(rows);
    expect(s.bookmarked.map((r) => r.subtopicSlug)).toEqual(["c", "a"]);
    expect(s.bookmarkedCount).toBe(2);
  });

  it("excludes mastered rows from the continue list", () => {
    const s = summarizeNotesProgress(rows);
    expect(s.recent.map((r) => r.subtopicSlug)).not.toContain("b");
    expect(s.recent[0].subtopicSlug).toBe("c"); // newest non-mastered
  });

  it("counts mastered rows", () => {
    expect(summarizeNotesProgress(rows).masteredCount).toBe(1);
  });

  it("respects the recent limit", () => {
    expect(summarizeNotesProgress(rows, 1).recent).toHaveLength(1);
  });
});

describe("prettifyNotesSlug", () => {
  it("title-cases hyphenated slugs, keeping short words lowercase", () => {
    expect(prettifyNotesSlug("geometric-progressions")).toBe("Geometric Progressions");
    expect(prettifyNotesSlug("foot-image-projection")).toBe("Foot Image Projection");
    expect(prettifyNotesSlug("law-of-cooling")).toBe("Law of Cooling");
  });
});

function row(p: Partial<NotesProgressRow>): NotesProgressRow {
  return {
    subtopicSlug: "s",
    chapterSlug: "ch",
    subjectRoute: "nda-maths",
    bookmarked: false,
    masteredAt: null,
    checkpointScore: null,
    checkpointTotal: null,
    checkpointAt: null,
    lastViewedAt: "2026-07-01T00:00:00Z",
    ...p,
  };
}
