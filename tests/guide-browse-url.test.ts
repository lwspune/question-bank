import { describe, it, expect } from "vitest";
import { buildBrowseUrl } from "@/lib/guide/buildBrowseUrl";

describe("buildBrowseUrl", () => {
  it("returns /browse with no query when given no filters", () => {
    expect(buildBrowseUrl({})).toBe("/browse");
  });

  it("serializes examId + subjectId", () => {
    expect(
      buildBrowseUrl({ examId: "exam-1", subjectId: "subj-2" })
    ).toBe("/browse?examId=exam-1&subjectId=subj-2");
  });

  it("serializes single chapter and subtopic ids as comma-joined", () => {
    expect(
      buildBrowseUrl({
        examId: "exam-1",
        chapterIds: ["c1"],
        subtopicIds: ["s1", "s2", "s3"],
      })
    ).toBe("/browse?examId=exam-1&chapterIds=c1&subtopicIds=s1%2Cs2%2Cs3");
  });

  it("includes difficulty multi-select", () => {
    expect(
      buildBrowseUrl({ difficulties: ["EASY", "MODERATE"] })
    ).toBe("/browse?difficulty=EASY%2CMODERATE");
  });

  it("includes pyq years", () => {
    expect(buildBrowseUrl({ pyqYears: [2024, 2025] })).toBe(
      "/browse?pyqYears=2024%2C2025"
    );
  });

  it("includes search query when provided", () => {
    expect(buildBrowseUrl({ q: "logarithm" })).toBe(
      "/browse?q=logarithm"
    );
  });

  it("omits empty arrays and falsy values", () => {
    expect(
      buildBrowseUrl({
        examId: "exam-1",
        chapterIds: [],
        subtopicIds: [],
        difficulties: [],
        pyqYears: [],
        q: "",
      })
    ).toBe("/browse?examId=exam-1");
  });

  it("combines exam + subject + subtopics + difficulty", () => {
    const url = buildBrowseUrl({
      examId: "exam-1",
      subjectId: "subj-2",
      subtopicIds: ["s1"],
      difficulties: ["HARD"],
    });
    expect(url).toBe(
      "/browse?examId=exam-1&subjectId=subj-2&subtopicIds=s1&difficulty=HARD"
    );
  });

  it("does not include a page param (defaults to 1 on browse)", () => {
    const url = buildBrowseUrl({ examId: "exam-1" });
    expect(url.includes("page")).toBe(false);
  });

  it("encodes special characters in search query", () => {
    expect(buildBrowseUrl({ q: "x + 1/x ≥ 2" })).toBe(
      "/browse?q=x+%2B+1%2Fx+%E2%89%A5+2"
    );
  });

  it("appends an encoded from + fromLabel for the back-to-notes pill", () => {
    expect(
      buildBrowseUrl({
        extraIds: ["u1", "u2"],
        from: "/notes/nda-maths/vectors/cross-product#triple-product",
        fromLabel: "Vectors notes",
      })
    ).toBe(
      "/browse?extras=u1%2Cu2&from=%2Fnotes%2Fnda-maths%2Fvectors%2Fcross-product%23triple-product&fromLabel=Vectors+notes"
    );
  });

  it("omits from/fromLabel when not provided", () => {
    const url = buildBrowseUrl({ examId: "exam-1" });
    expect(url.includes("from")).toBe(false);
    expect(url.includes("fromLabel")).toBe(false);
  });

  it("emits from with no fromLabel when only from is set", () => {
    expect(buildBrowseUrl({ from: "/notes/x" })).toBe(
      "/browse?from=%2Fnotes%2Fx"
    );
  });
});
