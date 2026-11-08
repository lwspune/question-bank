/**
 * The live counts the /notes intros are checked against (2026-11-08). Both the
 * prod-contract test and `npm run notes:intro` read them through one loader
 * now. It used to be two copies of a paged select with a four-level embed and
 * OFFSET paging: each page re-built every row before it, 730 MB a page and
 * ~54 GB a run, once a day. The loader reads bare ids from questions and the
 * taxonomy once, and this pure step does the counting.
 */
import { describe, it, expect } from "vitest";
import { liveKey, tallyNotesLive, type LiveTaxonomy } from "../scripts/lib/notesLiveCounts";

const tax: LiveTaxonomy = {
  exams: new Map([
    ["e-nda", "NDA"],
    ["e-hsc", "Maharashtra HSC Class 12"],
  ]),
  subjects: new Map([
    ["s-nda", { name: "Mathematics", examId: "e-nda" }],
    ["s-hsc", { name: "Mathematics", examId: "e-hsc" }],
  ]),
  chapters: new Map([
    ["c-nda", { name: "Indefinite Integration", subjectId: "s-nda" }],
    ["c-hsc", { name: "Indefinite Integration", subjectId: "s-hsc" }],
  ]),
  subtopics: new Map([
    ["t-sub", "Integration by Substitution"],
    ["t-parts", "Integration by Parts"],
  ]),
};

const NDA = liveKey("NDA", "Mathematics", "Indefinite Integration");
const HSC = liveKey("Maharashtra HSC Class 12", "Mathematics", "Indefinite Integration");

describe("tallyNotesLive", () => {
  const live = tallyNotesLive(
    [
      { chapter_id: "c-nda", subtopic_id: "t-sub", pyq_year: 2024 },
      { chapter_id: "c-nda", subtopic_id: "t-sub", pyq_year: 2026 },
      { chapter_id: "c-nda", subtopic_id: "t-parts", pyq_year: 2024 },
      { chapter_id: "c-nda", subtopic_id: null, pyq_year: null },
      { chapter_id: "c-hsc", subtopic_id: "t-parts", pyq_year: 2025 },
    ],
    tax
  );

  it("keys by exam, subject AND chapter, so a chapter name shared across exams stays apart", () => {
    expect(live.chapter.get(NDA)).toBe(4);
    expect(live.chapter.get(HSC)).toBe(1);
  });

  it("counts each subtopic, a question with none under ?", () => {
    expect(Object.fromEntries(live.perSub.get(NDA)!)).toEqual({
      "Integration by Substitution": 2,
      "Integration by Parts": 1,
      "?": 1,
    });
  });

  it("counts years for the chapter (*) and each subtopic, and keeps the newest year", () => {
    expect(Object.fromEntries(live.perYear.get(NDA)!)).toEqual({
      "*\t2024": 2,
      "Integration by Substitution\t2024": 1,
      "*\t2026": 1,
      "Integration by Substitution\t2026": 1,
      "Integration by Parts\t2024": 1,
    });
    expect(live.maxYear.get(NDA)).toBe(2026);
    expect(live.maxYear.get(HSC)).toBe(2025);
  });

  it("files a question with no chapter under one key that matches no notes chapter", () => {
    const orphan = tallyNotesLive([{ chapter_id: null, subtopic_id: null, pyq_year: 2020 }], tax);
    expect([...orphan.chapter.keys()]).toEqual([liveKey(undefined, undefined, undefined)]);
  });
});
