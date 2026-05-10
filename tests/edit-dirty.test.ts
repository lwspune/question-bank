import { describe, it, expect } from "vitest";
import {
  isQuestionDirty,
  toFormState,
  type ExistingQuestion,
} from "@/lib/questions/dirty";

const baseline: ExistingQuestion = {
  text: "What is 2 + 2?",
  context: null,
  difficulty: "EASY",
  solution: null,
  imageUrl: null,
  subjectId: "subj-1",
  chapterId: "chap-1",
  subtopicId: null,
  visibility: "PRIVATE",
  options: [
    { label: "A", text: "3", imageUrl: null, isCorrect: false },
    { label: "B", text: "4", imageUrl: null, isCorrect: true },
    { label: "C", text: "5", imageUrl: null, isCorrect: false },
    { label: "D", text: "6", imageUrl: null, isCorrect: false },
  ],
};

describe("isQuestionDirty", () => {
  it("returns false when nothing has changed", () => {
    expect(isQuestionDirty(baseline, toFormState(baseline))).toBe(false);
  });

  it("normalises null context/solution to empty string and is not dirty", () => {
    const state = toFormState(baseline);
    expect(state.context).toBe("");
    expect(state.solution).toBe("");
    expect(isQuestionDirty(baseline, state)).toBe(false);
  });

  it("detects question text change", () => {
    const state = { ...toFormState(baseline), text: "What is 2 + 3?" };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects difficulty change", () => {
    const state = { ...toFormState(baseline), difficulty: "HARD" as const };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects taxonomy change (subject)", () => {
    const state = { ...toFormState(baseline), subjectId: "subj-2" };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects subtopic change from null to a value", () => {
    const state = { ...toFormState(baseline), subtopicId: "st-1" };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects correct-option change", () => {
    const state = { ...toFormState(baseline), correct: "C" as const };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects option text change", () => {
    const start = toFormState(baseline);
    const state = {
      ...start,
      optionTexts: { ...start.optionTexts, A: "three" },
    };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects question image change (null -> path)", () => {
    const state = { ...toFormState(baseline), imagePath: "org/abc.png" };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects option image change", () => {
    const start = toFormState(baseline);
    const state = {
      ...start,
      optionImages: { ...start.optionImages, B: "org/b.png" },
    };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("treats whitespace-only context edits as dirty (does not auto-trim)", () => {
    const state = { ...toFormState(baseline), context: "  " };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });

  it("detects visibility flip (PRIVATE -> PUBLIC)", () => {
    const state = { ...toFormState(baseline), visibility: "PUBLIC" as const };
    expect(isQuestionDirty(baseline, state)).toBe(true);
  });
});
