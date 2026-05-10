import { describe, expect, it } from "vitest";
import { buildActiveChips } from "@/app/browse/buildActiveChips";
import { EMPTY_FILTERS, type Filters } from "@/lib/questions/filters";

const labels = {
  examName: (id: string) => (id === "exam-mht" ? "MHT-CET" : id),
  subjectName: (id: string) =>
    id === "subj-physics" ? "Physics" : id === "subj-maths" ? "Maths" : id,
  chapterName: (id: string) =>
    id === "chap-kin" ? "Kinematics" : id === "chap-elec" ? "Electricity" : id,
  subtopicName: (id: string) => (id === "sub-1d" ? "1-D motion" : id),
};

describe("buildActiveChips", () => {
  it("returns no chips when no filters are active", () => {
    const chips = buildActiveChips(EMPTY_FILTERS, labels);
    expect(chips).toEqual([]);
  });

  it("emits one chip per active filter, in stable order", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-mht",
      subjectId: "subj-physics",
      chapterIds: ["chap-kin", "chap-elec"],
      subtopicIds: ["sub-1d"],
      difficulties: ["EASY", "HARD"],
      pyqYears: [2024, 2023],
      q: "newton",
    };
    const chips = buildActiveChips(filters, labels);
    expect(chips.map((c) => c.label)).toEqual([
      "Exam: MHT-CET",
      "Subject: Physics",
      "Chapter: Kinematics",
      "Chapter: Electricity",
      "Subtopic: 1-D motion",
      "Difficulty: Easy",
      "Difficulty: Hard",
      "Year: 2024",
      "Year: 2023",
      'Search: "newton"',
    ]);
  });

  it("removing the exam chip clears exam, subject, chapters, and subtopics", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-mht",
      subjectId: "subj-physics",
      chapterIds: ["chap-kin"],
      subtopicIds: ["sub-1d"],
      difficulties: ["EASY"],
    };
    const chips = buildActiveChips(filters, labels);
    const examChip = chips.find((c) => c.label === "Exam: MHT-CET")!;
    const next = examChip.nextFilters();
    expect(next.examId).toBeNull();
    expect(next.subjectId).toBeNull();
    expect(next.chapterIds).toEqual([]);
    expect(next.subtopicIds).toEqual([]);
    expect(next.difficulties).toEqual(["EASY"]);
    expect(next.page).toBe(1);
  });

  it("removing the subject chip clears subject, chapters, and subtopics", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-mht",
      subjectId: "subj-physics",
      chapterIds: ["chap-kin"],
      subtopicIds: ["sub-1d"],
    };
    const next = buildActiveChips(filters, labels)
      .find((c) => c.label === "Subject: Physics")!
      .nextFilters();
    expect(next.examId).toBe("exam-mht");
    expect(next.subjectId).toBeNull();
    expect(next.chapterIds).toEqual([]);
    expect(next.subtopicIds).toEqual([]);
  });

  it("removing one chapter chip preserves the others and clears subtopics", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-mht",
      subjectId: "subj-physics",
      chapterIds: ["chap-kin", "chap-elec"],
      subtopicIds: ["sub-1d"],
    };
    const next = buildActiveChips(filters, labels)
      .find((c) => c.label === "Chapter: Kinematics")!
      .nextFilters();
    expect(next.chapterIds).toEqual(["chap-elec"]);
    expect(next.subtopicIds).toEqual([]);
  });

  it("removing a subtopic chip leaves chapters and other subtopics intact", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-mht",
      subjectId: "subj-physics",
      chapterIds: ["chap-kin"],
      subtopicIds: ["sub-1d", "sub-other"],
    };
    const labelsWithExtra = {
      ...labels,
      subtopicName: (id: string) =>
        id === "sub-1d" ? "1-D motion" : id === "sub-other" ? "Other" : id,
    };
    const next = buildActiveChips(filters, labelsWithExtra)
      .find((c) => c.label === "Subtopic: 1-D motion")!
      .nextFilters();
    expect(next.subtopicIds).toEqual(["sub-other"]);
    expect(next.chapterIds).toEqual(["chap-kin"]);
  });

  it("removing a difficulty leaves the others intact", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      difficulties: ["EASY", "MODERATE", "HARD"],
    };
    const next = buildActiveChips(filters, labels)
      .find((c) => c.label === "Difficulty: Moderate")!
      .nextFilters();
    expect(next.difficulties).toEqual(["EASY", "HARD"]);
  });

  it("removing a year leaves the others intact", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      pyqYears: [2024, 2023, 2022],
    };
    const next = buildActiveChips(filters, labels)
      .find((c) => c.label === "Year: 2023")!
      .nextFilters();
    expect(next.pyqYears).toEqual([2024, 2022]);
  });

  it("removing the search clears q and resets page", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      q: "newton",
      page: 5,
    };
    const next = buildActiveChips(filters, labels)
      .find((c) => c.label === 'Search: "newton"')!
      .nextFilters();
    expect(next.q).toBe("");
    expect(next.page).toBe(1);
  });

  it("any chip removal resets page to 1", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      examId: "exam-mht",
      page: 7,
    };
    const next = buildActiveChips(filters, labels)
      .find((c) => c.label === "Exam: MHT-CET")!
      .nextFilters();
    expect(next.page).toBe(1);
  });

  it("falls back to the id when the label lookup returns the same id (unknown)", () => {
    const filters: Filters = {
      ...EMPTY_FILTERS,
      chapterIds: ["chap-unknown"],
    };
    const chips = buildActiveChips(filters, labels);
    expect(chips.map((c) => c.label)).toEqual(["Chapter: chap-unknown"]);
  });
});
