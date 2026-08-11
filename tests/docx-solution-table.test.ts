/**
 * A GFM pipe-table inside a SOLUTION must export as a native Word table
 * (<w:tbl>) in the answer key — for every question format.
 *
 * Why this test exists: `parseTableBlocks` was wired into the docx stem and
 * context paths but NOT the solution path, which rendered solutions through
 * `mathRuns` alone. So a solution table printed as raw `| a | b |` pipes in the
 * downloaded answer key. The web renderer had the identical bug and was fixed
 * on 2026-07-06 (`/board` + `/browse` moved to `BlockText`); the exporter was
 * never brought along — 123 PUBLIC questions carry a table in their solution.
 *
 * This is the render CONTRACT test: every long-form field (text, context,
 * solution) must handle prose + math + table on every surface. If a new field
 * or a new surface is added and forgets tables, this fails.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import { buildAnswerKey, buildQuestionPaper } from "@/lib/export/docxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const SOLUTION_WITH_TABLE = [
  "Measure of central angle = (No. of persons / Total) x 360.",
  "| Age group | Persons | Central angle |",
  "|---|---|---|",
  "| 20 - 25 | 80 | 144 |",
  "| 25 - 30 | 60 | 108 |",
  "Hence the pie diagram can be drawn.",
].join("\n");

const base = {
  context: null,
  difficulty: "EASY" as const,
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "Maharashtra State Board Class 10" },
  subject: { id: "s", name: "Algebra" },
  chapter: { id: "c", name: "Statistics" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
};

const MCQ_Q: QuestionRow = {
  ...base,
  id: "q-mcq",
  text: "Complete the activity for the pie diagram.",
  solution: SOLUTION_WITH_TABLE,
  options: [
    { label: "A" as const, text: "144", isCorrect: true, imageUrl: null },
    { label: "B" as const, text: "108", isCorrect: false, imageUrl: null },
    { label: "C" as const, text: "63", isCorrect: false, imageUrl: null },
    { label: "D" as const, text: "45", isCorrect: false, imageUrl: null },
  ],
};

const SUBJECTIVE_Q: QuestionRow = {
  ...base,
  id: "q-subj",
  text: "Complete the following activity to find the central angles.",
  questionFormat: "subjective",
  solution: SOLUTION_WITH_TABLE,
  options: [],
};

const NUMERIC_Q: QuestionRow = {
  ...base,
  id: "q-num",
  text: "Find the central angle for the 20-25 age group.",
  questionFormat: "numeric",
  numericAnswer: 144,
  solution: SOLUTION_WITH_TABLE,
  options: [],
};

const NO_TABLE_Q: QuestionRow = {
  ...base,
  id: "q-plain",
  text: "What is the mean?",
  solution: "Mean = 141/50 = 2.82 litre.",
  options: [
    { label: "A" as const, text: "2.82", isCorrect: true, imageUrl: null },
    { label: "B" as const, text: "3.10", isCorrect: false, imageUrl: null },
    { label: "C" as const, text: "2.50", isCorrect: false, imageUrl: null },
    { label: "D" as const, text: "1.41", isCorrect: false, imageUrl: null },
  ],
};

async function documentXml(buf: Buffer): Promise<string> {
  const zip = await JSZip.loadAsync(buf);
  return zip.file("word/document.xml")!.async("text");
}

/** Cell values must land in real table cells, not a raw pipe run. */
function assertTableRendered(xml: string) {
  expect(xml).toContain("<w:tbl>");
  for (const v of ["Age group", "Persons", "Central angle", "144", "108"]) {
    expect(xml).toContain(v);
  }
  // The separator row must never survive as literal text.
  expect(xml).not.toContain("|---|");
  // Prose either side of the table is preserved.
  expect(xml).toContain("Hence the pie diagram can be drawn.");
}

describe("docx answer key — tables inside solutions", () => {
  it("renders a solution table for an MCQ", async () => {
    const xml = await documentXml(
      await buildAnswerKey({ title: "T", questions: [MCQ_Q], includeSolutions: true })
    );
    assertTableRendered(xml);
  });

  it("renders a solution table for a SUBJECTIVE model answer", async () => {
    const xml = await documentXml(
      await buildAnswerKey({ title: "T", questions: [SUBJECTIVE_Q], includeSolutions: true })
    );
    assertTableRendered(xml);
    expect(xml).toContain("Model answer");
  });

  it("renders a solution table for a NUMERIC question", async () => {
    const xml = await documentXml(
      await buildAnswerKey({ title: "T", questions: [NUMERIC_Q], includeSolutions: true })
    );
    assertTableRendered(xml);
  });

  it("emits no table when the solution has none (no regression)", async () => {
    const xml = await documentXml(
      await buildAnswerKey({ title: "T", questions: [NO_TABLE_Q], includeSolutions: true })
    );
    expect(xml).not.toContain("<w:tbl>");
    expect(xml).toContain("2.82");
  });

  it("omits solutions entirely when includeSolutions is false", async () => {
    const xml = await documentXml(
      await buildAnswerKey({ title: "T", questions: [MCQ_Q], includeSolutions: false })
    );
    expect(xml).not.toContain("<w:tbl>");
    expect(xml).not.toContain("Age group");
  });
});

/**
 * The other half of the same contract, on the other surface.
 *
 * The block above tests solution x answer key. It never tested the QUESTION
 * PAPER, and it never tested a table in a `context` at all — which is how a
 * third un-converted path survived: `passageBanner` renders the SHARED context
 * of a set of sibling questions through `mathRuns` alone, so a pipe-table there
 * printed as raw `| a | b |` in every downloaded paper. 36 PUBLIC rows across
 * 10 sets carry one.
 *
 * Note the asymmetry being pinned: a SOLO context and a SHARED context are two
 * different code paths in `buildQuestionPaper`, and only the solo one had been
 * converted. Testing one would not have caught the other.
 */
const TABLE_CONTEXT = [
  "The following table shows points on a number line and their co-ordinates.",
  "| Point | A | B | C | D | E |",
  "|---|---|---|---|---|---|",
  "| Co-ordinate | -3 | 5 | 2 | -7 | 9 |",
].join("\n");

function assertContextTableRendered(xml: string) {
  expect(xml).toContain("<w:tbl>");
  for (const v of ["Point", "Co-ordinate", "-7"]) expect(xml).toContain(v);
  expect(xml).not.toContain("|---|");
  expect(xml).toContain("The following table shows points on a number line and their co-ordinates.");
}

describe("docx question paper — tables inside a context", () => {
  it("renders a table in a SOLO question's context", async () => {
    const q: QuestionRow = {
      ...base,
      id: "q-solo-ctx",
      text: "seg DE and seg AB",
      questionFormat: "subjective",
      context: TABLE_CONTEXT,
      solution: null,
      options: [],
    };
    const xml = await documentXml(await buildQuestionPaper({ title: "T", questions: [q] }));
    assertContextTableRendered(xml);
  });

  it("renders a table in a SHARED (set) context banner", async () => {
    const siblings: QuestionRow[] = ["seg DE and seg AB", "seg BC and seg AD", "seg BE and seg AD"].map(
      (text, i) => ({
        ...base,
        id: `q-set-${i}`,
        text,
        questionFormat: "subjective",
        context: TABLE_CONTEXT,
        setId: "set-1",
        solution: null,
        options: [],
      })
    );
    const xml = await documentXml(await buildQuestionPaper({ title: "T", questions: siblings }));
    assertContextTableRendered(xml);
    // Still one shared banner for the run, not one per sibling.
    expect(xml).toContain("Common context for questions 1-3");
  });

  it("renders a table in a question STEM (no regression)", async () => {
    const q: QuestionRow = {
      ...base,
      id: "q-stem-table",
      text: `Study the table and answer.\n${TABLE_CONTEXT.split("\n").slice(1).join("\n")}`,
      questionFormat: "subjective",
      solution: null,
      options: [],
    };
    const xml = await documentXml(await buildQuestionPaper({ title: "T", questions: [q] }));
    expect(xml).toContain("<w:tbl>");
    expect(xml).not.toContain("|---|");
  });
});
