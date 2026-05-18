import { describe, it, expect } from "vitest";
import { getQuestionResources } from "@/lib/links/questionResources";

function call(input: {
  examName: string;
  subjectName: string;
  chapterName: string;
  subtopicName: string | null;
}) {
  return getQuestionResources(input);
}

describe("getQuestionResources — exam scoping", () => {
  it("returns no resources for non-NDA exams (no MHT-CET guide yet)", () => {
    const res = call({
      examName: "MHT-CET",
      subjectName: "Maths",
      chapterName: "Integration",
      subtopicName: "Definite Integral Properties",
    });
    expect(res.guide).toBeNull();
    expect(res.notes).toBeNull();
  });

  it("returns no resources for an unknown exam", () => {
    const res = call({
      examName: "IPMAT",
      subjectName: "Maths",
      chapterName: "Algebra",
      subtopicName: "Quadratic Equations",
    });
    expect(res.guide).toBeNull();
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA Mathematics", () => {
  it("links the NDA Maths overview for every Maths question (Template A — no per-chapter playbooks)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Functions",
      subtopicName: "Domain and Range",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-maths");
    expect(res.guide!.label.toLowerCase()).toContain("nda maths");
  });

  it("links Statistics subtopics to their notes page", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Statistics",
      subtopicName: "Measures of Central Tendency — Mean, Median, Mode",
    });
    expect(res.notes).not.toBeNull();
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/statistics/central-tendency"
    );
  });

  it("links Vectors subtopics to their notes page", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Vectors",
      subtopicName: "Dot Product and Angle",
    });
    expect(res.notes).not.toBeNull();
    expect(res.notes!.href).toBe(
      "/notes/nda-maths/vectors/dot-product-angle"
    );
  });

  it("returns guide-only for a Maths chapter without notes content", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Trigonometry — I",
      subtopicName: "Compound Angle Identities",
    });
    expect(res.guide).not.toBeNull();
    expect(res.notes).toBeNull();
  });

  it("returns guide-only when subtopic is null on a notes-covered chapter", () => {
    // Defensive: a Statistics question with no subtopic still gets the guide link
    const res = call({
      examName: "NDA",
      subjectName: "Mathematics",
      chapterName: "Statistics",
      subtopicName: null,
    });
    expect(res.guide).not.toBeNull();
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA English (subtopic-grain playbooks)", () => {
  it("links the matching playbook by chapter+subtopic", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: "Synonyms",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe(
      "/guide/nda-english/playbooks/vocab-synonyms"
    );
  });

  it("returns no guide when the subtopic isn't covered by a playbook", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: "Some Unmapped Subtopic XYZ",
    });
    expect(res.guide).toBeNull();
  });

  it("returns no guide for English when subtopic is null (playbooks are per-subtopic)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });

  it("returns no notes for English (no notes shipped)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "English",
      chapterName: "Vocabulary",
      subtopicName: "Synonyms",
    });
    expect(res.notes).toBeNull();
  });
});

describe("getQuestionResources — NDA Physics (chapter-grain playbooks)", () => {
  it("links the playbook by chapter (subtopic-agnostic)", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Physics",
      chapterName: "Sound",
      subtopicName: "SONAR and Ultrasonic",
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-physics/playbooks/sound");
  });

  it("links the playbook even when subtopic is null", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Physics",
      chapterName: "Modern Physics",
      subtopicName: null,
    });
    expect(res.guide).not.toBeNull();
    expect(res.guide!.href).toBe("/guide/nda-physics/playbooks/modern-physics");
  });

  it("returns no guide for an unknown chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Physics",
      chapterName: "Time Machines",
      subtopicName: null,
    });
    expect(res.guide).toBeNull();
  });
});

describe("getQuestionResources — NDA Chemistry / Biology / Geography", () => {
  it("links NDA Chemistry playbook by chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Chemistry",
      chapterName: "Carbon and Its Compounds",
      subtopicName: "Allotropes of Carbon",
    });
    expect(res.guide!.href).toBe(
      "/guide/nda-chemistry/playbooks/carbon-and-its-compounds"
    );
  });

  it("links NDA Biology playbook by chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Biology",
      chapterName: "Cell Biology",
      subtopicName: "Cell Organelles",
    });
    expect(res.guide!.href).toBe("/guide/nda-biology/playbooks/cell-biology");
  });

  it("links NDA Geography playbook by chapter", () => {
    const res = call({
      examName: "NDA",
      subjectName: "Geography",
      chapterName: "Indian Geography — Economy, Resources and Transport",
      subtopicName: "Agriculture, Crops, Soils and Land Use",
    });
    expect(res.guide!.href).toBe(
      "/guide/nda-geography/playbooks/indian-geography-economy"
    );
  });
});

describe("getQuestionResources — NDA subjects without a guide", () => {
  it.each([
    "History",
    "Polity",
    "Economics",
    "Current Affairs",
  ])("returns no guide for NDA %s (no guide shipped yet)", (subj) => {
    const res = call({
      examName: "NDA",
      subjectName: subj,
      chapterName: "Anything",
      subtopicName: "Anything",
    });
    expect(res.guide).toBeNull();
    expect(res.notes).toBeNull();
  });
});
