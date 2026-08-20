/**
 * Teaching-deck slide types layered onto the classroom .pptx builder.
 *
 * The question-per-slide deck (pptx-builder.test.ts) proved the math, sizing
 * and packaging. This suite covers only what teaching slides ADD: a titled
 * concept/formula/derivation slide, and the question-then-answer PAIR that a
 * PDF export needs in place of click-to-reveal.
 *
 * The load-bearing assertion is the last one: every emitted attribute that
 * OOXML types as an integer must BE an integer. A fractional `cy` produced a
 * file PowerPoint refused to open while every other test stayed green.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import {
  buildQuestionSlides,
  buildTeachingDeck,
  planDeck,
  teachingBlocks,
  estimateTableLines,
  tableSizingLengths,
  estimateLines,
  MAX_FONT,
  type DeckSlide,
} from "@/lib/export/pptxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const question: QuestionRow = {
  id: "q1",
  text: "A body starts from rest with uniform acceleration \\(a\\). Find \\(s\\) after \\(t\\).",
  context: null,
  difficulty: "EASY",
  solution: "Using \\(s = ut + \\tfrac{1}{2}at^2\\) with \\(u = 0\\) gives \\(s = \\tfrac{1}{2}at^2\\).",
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "MHT-CET" },
  subject: { id: "s", name: "Physics" },
  chapter: { id: "c", name: "Motion in a Plane" },
  subtopic: { id: "st", name: "Kinematics" },
  questionNumber: null,
  pyqYear: 2025,
  pyqMonth: null,
  pyqNote: null,
  questionKind: "pyq",
  questionFormat: "mcq",
  numericAnswer: null,
  options: [
    { label: "A", text: "\\(\\tfrac{1}{2}at^2\\)", isCorrect: true, imageUrl: null },
    { label: "B", text: "\\(at^2\\)", isCorrect: false, imageUrl: null },
    { label: "C", text: "\\(2at^2\\)", isCorrect: false, imageUrl: null },
    { label: "D", text: "\\(at\\)", isCorrect: false, imageUrl: null },
  ],
} as unknown as QuestionRow;

describe("teachingBlocks", () => {
  it("puts the title first, in bold", () => {
    const blocks = teachingBlocks({
      kind: "teaching",
      title: "Average velocity",
      lines: [{ text: "Displacement over elapsed time." }],
    });
    const first = blocks[0];
    expect(first.kind).toBe("paras");
    if (first.kind !== "paras") throw new Error("unreachable");
    expect(first.items[0].text).toContain("Average velocity");
    expect(first.items[0].opts.bold).toBe(true);
  });

  it("marks a bulleted line with a leading bullet glyph", () => {
    const blocks = teachingBlocks({
      kind: "teaching",
      title: "T",
      lines: [{ text: "First point", bullet: true }],
    });
    const texts = blocks
      .filter((b) => b.kind === "paras")
      .flatMap((b) => (b.kind === "paras" ? b.items.map((i) => i.text) : []));
    expect(texts.some((t) => t.startsWith("• First point"))).toBe(true);
  });

  it("centres a display equation and does not bullet it", () => {
    const blocks = teachingBlocks({
      kind: "teaching",
      title: "T",
      lines: [{ text: "\\(v = u + at\\)", display: true }],
    });
    const item = blocks
      .filter((b) => b.kind === "paras")
      .flatMap((b) => (b.kind === "paras" ? b.items : []))
      .find((i) => i.text.includes("v = u + at"));
    expect(item?.opts.align).toBe("ctr");
    expect(item?.text.startsWith("•")).toBe(false);
  });

  it("renders a note in muted grey italic, smaller than body text", () => {
    const blocks = teachingBlocks({
      kind: "teaching",
      title: "T",
      lines: [{ text: "Air resistance is neglected.", note: true }],
    });
    const item = blocks
      .filter((b) => b.kind === "paras")
      .flatMap((b) => (b.kind === "paras" ? b.items : []))
      .find((i) => i.text.includes("Air resistance"));
    expect(item?.opts.italic).toBe(true);
    expect(item?.opts.color).toBeTruthy();
    expect(item?.scale).toBeLessThan(1);
  });

  it("carries a badge through as its own line", () => {
    const blocks = teachingBlocks({
      kind: "teaching",
      title: "Projectile motion",
      badge: "JEE 58 | CET 8 | NDA 7",
      lines: [],
    });
    const texts = blocks
      .filter((b) => b.kind === "paras")
      .flatMap((b) => (b.kind === "paras" ? b.items.map((i) => i.text) : []));
    expect(texts.some((t) => t.includes("JEE 58"))).toBe(true);
  });

  it("keeps a pipe-table as a table block rather than prose", () => {
    const blocks = teachingBlocks({
      kind: "teaching",
      title: "Weightage",
      lines: [{ text: "| Exam | Q |\n|---|---|\n| JEE | 58 |" }],
    });
    expect(blocks.some((b) => b.kind === "table")).toBe(true);
  });
});

describe("estimateTableLines", () => {
  // A table whose height is under-estimated has the NEXT shape drawn on top of
  // it. This shipped: the weightage table's border struck through the bullet
  // below it, because the estimate assumed one line per row and the first
  // column wrapped to two.
  const short = { kind: "table" as const, headers: ["A", "B"], rows: [["1", "2"]] };

  it("counts one line per row when every cell fits its column", () => {
    expect(estimateTableLines(short, MAX_FONT)).toBe(2);
  });

  it("counts a WRAPPED cell as more than one line", () => {
    const wide = {
      kind: "table" as const,
      headers: ["Topic", "JEE Mains", "MHT-CET", "NDA"],
      rows: [["Straight-line motion and graphs", "103", "20", "18"]],
    };
    expect(estimateTableLines(wide, MAX_FONT)).toBeGreaterThan(2);
  });

  it("charges the row for its WIDEST cell, not the sum of them", () => {
    const one = {
      kind: "table" as const,
      headers: ["h", "h"],
      rows: [["x".repeat(60), "y"]],
    };
    const both = {
      kind: "table" as const,
      headers: ["h", "h"],
      rows: [["x".repeat(60), "y".repeat(60)]],
    };
    expect(estimateTableLines(both, MAX_FONT)).toBe(estimateTableLines(one, MAX_FONT));
  });

  it("never returns fewer lines than rows", () => {
    const empty = { kind: "table" as const, headers: ["", ""], rows: [["", ""], ["", ""]] };
    expect(estimateTableLines(empty, MAX_FONT)).toBe(3);
  });

  it("allots MORE lines as the font grows, never fewer", () => {
    const wide = {
      kind: "table" as const,
      headers: ["Topic", "Count"],
      rows: [["Straight-line motion and graphs", "103"]],
    };
    expect(estimateTableLines(wide, 2400)).toBeGreaterThanOrEqual(
      estimateTableLines(wide, 1400)
    );
  });
});

describe("tableSizingLengths", () => {
  // Sizing scores each entry as a FULL-WIDTH paragraph, but a cell spans only
  // its column. Under-charging here picks too large a font and the slide runs
  // off its bottom edge — which shipped: the weightage table's closing note
  // lost its last word.
  it("charges a cell for the column it occupies, not the whole slide width", () => {
    const table = {
      kind: "table" as const,
      headers: ["Topic", "JEE Mains", "MHT-CET", "NDA"],
      rows: [["Straight-line motion and graphs", "103", "20", "18"]],
    };
    const [, dataRow] = tableSizingLengths(table);
    // 31 chars in a 4-column table costs about four times a full-width line.
    expect(dataRow).toBe("Straight-line motion and graphs".length * 4);
  });

  it("agrees with the layout estimator on how many lines that is", () => {
    const table = {
      kind: "table" as const,
      headers: ["Topic", "JEE Mains", "MHT-CET", "NDA"],
      rows: [["Straight-line motion and graphs", "103", "20", "18"]],
    };
    const layoutLines = estimateTableLines(table, MAX_FONT);
    const sizingLines = tableSizingLengths(table).reduce(
      (n, chars) => n + estimateLines(chars, 0, MAX_FONT, "layout"),
      0
    );
    expect(sizingLines).toBe(layoutLines);
  });

  it("returns one entry per row including the header", () => {
    const table = {
      kind: "table" as const,
      headers: ["a", "b"],
      rows: [["1", "2"], ["3", "4"], ["5", "6"]],
    };
    expect(tableSizingLengths(table)).toHaveLength(4);
  });
});

describe("sizing agrees with layout", () => {
  // pickFontSize used to measure with the OPTIMISTIC line width while layout
  // drew with the pessimistic one, so a slide sized as "just fits" was laid out
  // a line taller and ran off the bottom. This shipped: the weightage slide's
  // closing note lost its last word.
  it("shrinks a table-plus-note slide below the maximum font", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [
        {
          kind: "teaching",
          title: "Why this chapter earns your time",
          badge: "Past-year questions in our bank, this chapter only",
          lines: [
            {
              text:
                "| Topic | JEE Mains | MHT-CET | NDA |\n|---|---|---|---|\n" +
                "| Straight-line motion and graphs | 103 | 20 | 18 |\n" +
                "| Projectile | 58 | 8 | 7 |\n" +
                "| Circular motion | 52 | 12 | 9 |\n" +
                "| Relative motion | — | 7 | — |",
            },
            { text: "Straight-line motion is the LARGEST bucket for MHT-CET and NDA.", strong: true },
            {
              text:
                "JEE files those 103 questions under a separate chapter, but the " +
                "physics is identical — and it is what Part 1 teaches.",
              note: true,
            },
          ],
        },
      ],
    });
    const zip = await JSZip.loadAsync(buffer);
    const xml = await zip.file("ppt/slides/slide1.xml")!.async("string");
    const sizes = [...xml.matchAll(/sz="(\d+)"/g)].map((m) => Number(m[1]));
    expect(sizes.length).toBeGreaterThan(0);
    expect(Math.max(...sizes)).toBeLessThan(MAX_FONT);
  });

  it("still uses the maximum font for a slide with room to spare", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [{ kind: "teaching", title: "Short", lines: [{ text: "One point", bullet: true }] }],
    });
    const zip = await JSZip.loadAsync(buffer);
    const xml = await zip.file("ppt/slides/slide1.xml")!.async("string");
    const sizes = [...xml.matchAll(/sz="(\d+)"/g)].map((m) => Number(m[1]));
    expect(Math.max(...sizes)).toBe(MAX_FONT);
  });
});

describe("colour", () => {
  const colours = (xml: string) =>
    new Set([...xml.matchAll(/srgbClr val="([0-9A-F]{6})"/g)].map((m) => m[1]));

  it("leaves the printed question deck black — it is not a teaching deck", async () => {
    // buildQuestionSlides feeds /browse downloads, and its contract is white
    // background, black Cambria. Teaching accents must not leak into it.
    const buffer = await buildQuestionSlides({
      title: "Paper",
      questions: [question],
      includeSourceTag: true,
      groupBySubtopic: true,
    });
    const zip = await JSZip.loadAsync(buffer);
    for (const path of Object.keys(zip.files)) {
      if (!path.startsWith("ppt/slides/slide")) continue;
      const found = colours(await zip.file(path)!.async("string"));
      for (const c of found) {
        expect(["000000", "FFFFFF", "555555"]).toContain(c);
      }
    }
  });

  it("sets a teaching title in indigo and a trap line in dark red", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [
        {
          kind: "teaching",
          title: "Projectile traps",
          lines: [{ text: "Acceleration at the top is NOT zero", warn: true }],
        },
      ],
    });
    const zip = await JSZip.loadAsync(buffer);
    const found = colours(await zip.file("ppt/slides/slide1.xml")!.async("string"));
    expect(found).toContain("312E81");
    expect(found).toContain("991B1B");
  });

  it("sets an all-traps slide's TITLE in red rather than indigo", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [{ kind: "teaching", title: "Traps", tone: "warn", lines: [] }],
    });
    const zip = await JSZip.loadAsync(buffer);
    const found = colours(await zip.file("ppt/slides/slide1.xml")!.async("string"));
    expect(found).toContain("991B1B");
    expect(found).not.toContain("312E81");
  });

  it("marks the key on an answer slide in dark green", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [{ kind: "practice", question, number: 1 }],
    });
    const zip = await JSZip.loadAsync(buffer);
    const asked = colours(await zip.file("ppt/slides/slide1.xml")!.async("string"));
    const answered = colours(await zip.file("ppt/slides/slide2.xml")!.async("string"));
    // The key colour appears only once the answer is revealed.
    expect(answered).toContain("065F46");
    expect(asked).not.toContain("065F46");
  });

  it("keeps every equation black", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [
        {
          kind: "teaching",
          title: "Third equation",
          lines: [{ text: "\\(v^{2} - u^{2} = 2as\\)", display: true }],
        },
      ],
    });
    const zip = await JSZip.loadAsync(buffer);
    const xml = await zip.file("ppt/slides/slide1.xml")!.async("string");
    // The maths run must not pick up the title's accent.
    const mathRun = xml.slice(xml.indexOf("<a14:m>"));
    expect(mathRun).not.toContain("312E81");
  });
});

describe("planDeck", () => {
  it("expands a practice question into a question slide THEN an answer slide", () => {
    const plan = planDeck([
      { kind: "practice", question, number: 1 },
    ]);
    expect(plan).toHaveLength(2);
    expect(plan[0].kind).toBe("question");
    expect(plan[1].kind).toBe("answer");
  });

  it("numbers the pair identically so the PDF reads Q3 then Q3 answered", () => {
    const plan = planDeck([
      { kind: "practice", question, number: 3 },
    ]);
    const first = plan[0];
    const second = plan[1];
    if (first.kind !== "question" || second.kind !== "answer") throw new Error("shape");
    expect(first.number).toBe(3);
    expect(second.number).toBe(3);
  });

  it("passes teaching and section slides through untouched", () => {
    const slides: DeckSlide[] = [
      { kind: "section", title: "Part 1" },
      { kind: "teaching", title: "Average velocity", lines: [] },
    ];
    const plan = planDeck(slides);
    expect(plan.map((s) => s.kind)).toEqual(["section", "teaching"]);
  });
});

describe("answer slides", () => {
  it("names the correct option and includes the worked solution", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [{ kind: "practice", question, number: 1 }],
    });
    const zip = await JSZip.loadAsync(buffer);
    const answer = await zip.file("ppt/slides/slide2.xml")!.async("string");
    // The key is stated as a letter the student can check against their work…
    expect(answer).toContain("(A)");
    // …and the reasoning is on the slide, since a PDF cannot reveal it later.
    expect(answer).toMatch(/Solution|solution/);
  });

  it("does NOT leak the answer onto the question slide", async () => {
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [{ kind: "practice", question, number: 1 }],
    });
    const zip = await JSZip.loadAsync(buffer);
    const asked = await zip.file("ppt/slides/slide1.xml")!.async("string");
    expect(asked).not.toMatch(/Answer:/);
    expect(asked).not.toMatch(/Solution/);
  });
});

describe("package integrity", () => {
  it("emits one slide part per planned slide and a matching content-type count", async () => {
    const buffer = await buildTeachingDeck({
      title: "Motion in a Plane",
      slides: [
        { kind: "section", title: "Rectilinear motion" },
        { kind: "teaching", title: "Average velocity", lines: [{ text: "x", bullet: true }] },
        { kind: "practice", question, number: 1 },
      ],
    });
    const zip = await JSZip.loadAsync(buffer);
    // section + teaching + question + answer
    expect(zip.file("ppt/slides/slide4.xml")).toBeTruthy();
    expect(zip.file("ppt/slides/slide5.xml")).toBeNull();
    const types = await zip.file("[Content_Types].xml")!.async("string");
    expect(types).toContain("slide4.xml");
  });

  it("emits no fractional value in an integer-typed OOXML attribute", async () => {
    // This is the defect that shipped a file PowerPoint would not open while
    // every other assertion passed: `cy="3147060.0000000005"`. Well-formedness
    // and schema validity are different properties.
    const buffer = await buildTeachingDeck({
      title: "T",
      slides: [
        { kind: "teaching", title: "Derivation", lines: [
          { text: "\\(v = u + at\\)", display: true },
          { text: "\\(s = ut + \\tfrac{1}{2}at^{2}\\)", display: true },
          { text: "so \\(v^{2} - u^{2} = 2as\\)", display: true },
        ] },
        { kind: "practice", question, number: 1 },
      ],
    });
    const zip = await JSZip.loadAsync(buffer);
    for (const path of Object.keys(zip.files)) {
      if (!path.endsWith(".xml")) continue;
      const xml = await zip.file(path)!.async("string");
      for (const attrName of ["x", "y", "cx", "cy", "sz", "spcBef"]) {
        const bad = xml.match(new RegExp(`${attrName}="-?\\d+\\.\\d+"`, "g"));
        expect(bad, `${path} has a fractional ${attrName}: ${bad?.join(", ")}`).toBeNull();
      }
    }
  });
});
