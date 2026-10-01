import { describe, it, expect } from "vitest";
import { showsChapterFilter, showsSubtopicFilter } from "@/lib/questions/filterVisibility";

// Progressive reveal (2026-10-01): Clarity recorded a visitor tapping Chapters
// before any subject, meeting the empty "Pick a subject to see chapters" box
// twice, and leaving. A filter that cannot be used yet is now not shown.
describe("showsChapterFilter", () => {
  it("is hidden until a subject is picked", () => {
    expect(showsChapterFilter({ subjectId: null, chapterIds: [] })).toBe(false);
  });

  it("appears once a subject is picked", () => {
    expect(showsChapterFilter({ subjectId: "s1", chapterIds: [] })).toBe(true);
  });

  // A filter that is ACTIVE must stay visible, or it can be neither seen nor
  // cleared. No current link sets chapters without a subject, but the rule
  // must not depend on that staying true.
  it("stays visible whenever chapters are already selected", () => {
    expect(showsChapterFilter({ subjectId: null, chapterIds: ["c1"] })).toBe(true);
  });
});

describe("showsSubtopicFilter", () => {
  it("is hidden until a chapter is picked", () => {
    expect(showsSubtopicFilter({ chapterIds: [], subtopicIds: [] })).toBe(false);
  });

  it("appears once a chapter is picked", () => {
    expect(showsSubtopicFilter({ chapterIds: ["c1"], subtopicIds: [] })).toBe(true);
  });

  // The /notes "Drill the N questions" link is
  // /browse?examId=…&subjectId=…&subtopicIds=… with NO chapter. Its subtopic
  // filter is active and must be visible so the student can see and clear it.
  it("stays visible for a subtopic link that carries no chapter", () => {
    expect(showsSubtopicFilter({ chapterIds: [], subtopicIds: ["t1"] })).toBe(true);
  });
});
