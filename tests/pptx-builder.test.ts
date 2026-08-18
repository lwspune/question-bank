/**
 * .pptx classroom deck: ONE slide per question (stem + options), white
 * background, black Cambria, LaTeX preserved as real PowerPoint equations.
 *
 * The math-embedding shape and the sizing rules here were established by
 * rendering through PowerPoint itself; the comments name what each assertion
 * is defending, because none of it is guessable from the OOXML spec alone.
 */
import { describe, it, expect } from "vitest";
import JSZip from "jszip";
import {
  buildQuestionSlides,
  planSlides,
  pickFontSize,
  estimateLines,
  MAX_FONT,
  MIN_FONT,
} from "@/lib/export/pptxBuilder";
import type { QuestionRow } from "@/lib/questions/query";

const base = {
  context: null,
  difficulty: "EASY" as const,
  solution: null,
  imageUrl: null,
  solutionImageUrl: null,
  setId: null,
  exam: { id: "e", name: "NDA" },
  subject: { id: "s", name: "Mathematics" },
  chapter: { id: "c", name: "Statistics" },
  subtopic: null,
  questionNumber: null,
  pyqYear: null,
  pyqMonth: null,
  pyqNote: null,
  options: [
    { label: "A" as const, text: "20", isCorrect: true, imageUrl: null },
    { label: "B" as const, text: "25", isCorrect: false, imageUrl: null },
    { label: "C" as const, text: "30", isCorrect: false, imageUrl: null },
    { label: "D" as const, text: "35", isCorrect: false, imageUrl: null },
  ],
};

function q(id: string, text: string, extra: Partial<QuestionRow> = {}): QuestionRow {
  return { ...base, id, text, ...extra } as QuestionRow;
}

async function slides(buf: Buffer): Promise<string[]> {
  const zip = await JSZip.loadAsync(buf);
  const names = Object.keys(zip.files)
    .filter((n) => /^ppt\/slides\/slide\d+\.xml$/.test(n))
    .sort(
      (a, b) =>
        Number(a.match(/(\d+)/)![1]) - Number(b.match(/(\d+)/)![1])
    );
  return Promise.all(names.map((n) => zip.file(n)!.async("text")));
}

describe("planSlides", () => {
  it("makes one slide per question, numbered from 1", () => {
    const plan = planSlides([q("a", "First"), q("b", "Second"), q("c", "Third")], {});
    expect(plan).toHaveLength(3);
    expect(plan.map((s) => s.kind)).toEqual(["question", "question", "question"]);
    expect(plan.map((s) => s.kind === "question" && s.number)).toEqual([1, 2, 3]);
  });

  it("REPEATS a set's shared context on every sibling slide", () => {
    // A slide is shown on its own, so a passage printed once (as the paper
    // does) would leave siblings 2..n unanswerable on screen.
    const passage = "Consider the following for the next two items.";
    const plan = planSlides(
      [
        q("a", "First of set", { setId: "s1", context: passage }),
        q("b", "Second of set", { setId: "s1", context: passage }),
      ],
      {}
    );
    expect(plan).toHaveLength(2);
    for (const s of plan) {
      expect(s.kind === "question" && s.context).toBe(passage);
    }
  });

  it("strips the passage's own count phrase so it cannot contradict a subset", () => {
    const plan = planSlides(
      [
        q("a", "Only sibling exported", {
          setId: "s1",
          context: "Consider the following for the three (03) items that follow. Rain fell.",
        }),
      ],
      {}
    );
    const ctx = plan[0].kind === "question" ? plan[0].context : "";
    expect(ctx).not.toMatch(/three \(03\) items/);
    expect(ctx).toMatch(/Rain fell/);
  });

  it("inserts a section slide per subtopic run only when asked", () => {
    const rows = [
      q("a", "One", { subtopic: { id: "t1", name: "Mean" } }),
      q("b", "Two", { subtopic: { id: "t1", name: "Mean" } }),
      q("c", "Three", { subtopic: { id: "t2", name: "Median" } }),
    ];
    expect(planSlides(rows, {}).every((s) => s.kind === "question")).toBe(true);

    const grouped = planSlides(rows, { groupBySubtopic: true });
    expect(grouped.map((s) => s.kind)).toEqual([
      "section",
      "question",
      "question",
      "section",
      "question",
    ]);
    // Question numbering ignores section slides — it counts questions.
    expect(
      grouped.filter((s) => s.kind === "question").map((s) => s.kind === "question" && s.number)
    ).toEqual([1, 2, 3]);
  });
});

describe("pickFontSize", () => {
  it("uses the largest size for a short question", () => {
    expect(pickFontSize({ paragraphs: [20, 6, 6, 6, 6], mathZones: 0, imageFraction: 0 })).toBe(
      MAX_FONT
    );
  });

  it("steps down for a stem far past the bank's p99", () => {
    const huge = "x".repeat(2600);
    const size = pickFontSize({
      paragraphs: [huge.length, 6, 6, 6, 6],
      mathZones: 0,
      imageFraction: 0,
    });
    expect(size).toBeLessThan(MAX_FONT);
    expect(size).toBeGreaterThanOrEqual(MIN_FONT);
  });

  it("never returns a size outside the ladder's bounds", () => {
    const absurd = pickFontSize({
      paragraphs: Array.from({ length: 60 }, () => 900),
      mathZones: 40,
      imageFraction: 0.9,
    });
    expect(absurd).toBe(MIN_FONT);
  });

  it("is monotonic — more content never yields a BIGGER font", () => {
    // The property that matters: whatever the model, adding content must not
    // make the text grow. Guards against a sign slip in the height estimate.
    let previous = MAX_FONT + 1;
    for (let n = 1; n <= 40; n++) {
      const size = pickFontSize({
        paragraphs: Array.from({ length: n }, () => 120),
        mathZones: 0,
        imageFraction: 0,
      });
      expect(size).toBeLessThanOrEqual(previous);
      previous = size;
    }
  });

  it("counts 2-D math as taller than plain text", () => {
    const plain = pickFontSize({ paragraphs: [400, 60, 60, 60, 60], mathZones: 0, imageFraction: 0 });
    const mathy = pickFontSize({ paragraphs: [400, 60, 60, 60, 60], mathZones: 24, imageFraction: 0 });
    expect(mathy).toBeLessThanOrEqual(plain);
  });

  it("reserves room for an image", () => {
    const noImg = pickFontSize({ paragraphs: [500, 60, 60, 60, 60], mathZones: 0, imageFraction: 0 });
    const withImg = pickFontSize({ paragraphs: [500, 60, 60, 60, 60], mathZones: 0, imageFraction: 0.5 });
    expect(withImg).toBeLessThanOrEqual(noImg);
  });
});

describe("layout vs sizing estimates", () => {
  it("layout always allots at least as many lines as sizing", () => {
    // The invariant that stops a shape being drawn on top of the previous
    // one's text — a real defect caught by rendering, where an image landed
    // over the last line of a 4-line paragraph allotted 3.
    for (const size of [2400, 2000, 1800, 1600, 1400]) {
      for (const chars of [1, 40, 76, 77, 200, 431, 900, 2600]) {
        for (const math of [0, 3]) {
          expect(
            estimateLines(chars, math, size, "layout"),
            `size=${size} chars=${chars} math=${math}`
          ).toBeGreaterThanOrEqual(estimateLines(chars, math, size, "sizing"));
        }
      }
    }
  });

  it("never allots zero lines to a non-empty paragraph", () => {
    expect(estimateLines(0, 0, MAX_FONT, "layout")).toBeGreaterThanOrEqual(1);
    expect(estimateLines(1, 0, MIN_FONT, "layout")).toBeGreaterThanOrEqual(1);
  });
});

describe("buildQuestionSlides — rendered output", () => {
  it("writes one slide part per question and registers each one", async () => {
    const buf = await buildQuestionSlides({
      title: "Deck",
      questions: [q("a", "One"), q("b", "Two"), q("c", "Three")],
    });
    const zip = await JSZip.loadAsync(buf);

    expect(await slides(buf)).toHaveLength(3);
    // A slide part that is not declared in all THREE places is invisible or
    // corrupt — content types, presentation rels, and the slide id list.
    const ct = await zip.file("[Content_Types].xml")!.async("text");
    const rels = await zip.file("ppt/_rels/presentation.xml.rels")!.async("text");
    const pres = await zip.file("ppt/presentation.xml")!.async("text");
    for (let i = 1; i <= 3; i++) {
      expect(ct).toContain(`/ppt/slides/slide${i}.xml`);
      expect(rels).toContain(`slides/slide${i}.xml`);
      expect(zip.file(`ppt/slides/_rels/slide${i}.xml.rels`)).toBeTruthy();
    }
    expect((pres.match(/<p:sldId\b/g) ?? []).length).toBe(3);
  });

  it("prefixes the stem with the question number and prints every option", async () => {
    const [slide] = await slides(
      await buildQuestionSlides({ title: "D", questions: [q("a", "What is the mean?")] })
    );
    expect(slide).toContain("Q1.");
    expect(slide).toContain("What is the mean?");
    for (const label of ["(A)", "(B)", "(C)", "(D)"]) {
      expect(slide).toContain(label);
    }
    // Question-only deck: the correct answer must not leak onto the slide.
    expect(slide).not.toMatch(/correct|Answer:/i);
  });

  it("embeds LaTeX as a real equation with a readable fallback", async () => {
    const [slide] = await slides(
      await buildQuestionSlides({
        title: "D",
        questions: [q("a", "Value of \\(\\frac{a}{b}\\) is")],
      })
    );
    // The verified PowerPoint shape: a14:m inside mc:Choice Requires="a14".
    expect(slide).toContain("<a14:m>");
    expect(slide).toContain('Requires="a14"');
    expect(slide).toContain("<m:oMath");
    expect(slide).toContain("<m:f>"); // a genuine fraction, not flattened text
    // mc:Fallback keeps older renderers legible rather than blank.
    expect(slide).toContain("<mc:Fallback>");
  });

  it("falls back to readable Unicode when OMML conversion fails", async () => {
    // (A ∪ B)' is the documented unconvertible shape — a prime on a
    // parenthesised group containing \cup. It must degrade, never vanish.
    const [slide] = await slides(
      await buildQuestionSlides({
        title: "D",
        questions: [q("a", "Simplify \\((A \\cup B)^c\\) for the sets")],
      })
    );
    expect(slide).toContain("∪");
    expect(slide).not.toContain("\\cup");
  });

  it("sizes math via the paragraph defRPr, not just the runs", async () => {
    // Verified by rendering: an a14:m block ignores sibling run properties and
    // would otherwise draw at the slide master's default size.
    const [slide] = await slides(
      await buildQuestionSlides({ title: "D", questions: [q("a", "Val \\(\\frac{a}{b}\\)")] })
    );
    expect(slide).toMatch(/<a:defRPr\b[^>]*\bsz="\d+"/);
  });

  it("uses 150% line spacing so 2-D math does not collide", async () => {
    const [slide] = await slides(
      await buildQuestionSlides({ title: "D", questions: [q("a", "Val \\(\\frac{a}{b}\\)")] })
    );
    // spcPct is THOUSANDTHS of a percent — 150000 = 150%.
    expect(slide).toMatch(/<a:spcPct val="150000"\/>/);
  });

  it("paints an explicit white background and black text", async () => {
    // The deck must not inherit a theme background; teachers project it.
    const [slide] = await slides(
      await buildQuestionSlides({ title: "D", questions: [q("a", "Plain")] })
    );
    expect(slide).toContain('<a:srgbClr val="FFFFFF"/>');
    expect(slide).toContain('<a:srgbClr val="000000"/>');
    expect(slide).toContain('typeface="Cambria"');
  });

  it("renders a GFM pipe-table as a native PowerPoint table", async () => {
    const [slide] = await slides(
      await buildQuestionSlides({
        title: "D",
        questions: [
          q("a", "Given:\n\n| x | 1 | 2 |\n|---|---|---|\n| P(x) | k | 2k |\n\nFind k."),
        ],
      })
    );
    expect(slide).toContain("<a:tbl>");
    expect(slide).toContain("<a:gridCol");
    expect(slide).toContain("P(x)");
    // The prose either side of the table survives.
    expect(slide).toContain("Find k.");
    // …and the raw pipes do not reach the slide.
    expect(slide).not.toContain("| P(x) |");
  });

  it("embeds a question image as a picture part with a relationship", async () => {
    const png = Buffer.from(
      "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==",
      "base64"
    );
    const buf = await buildQuestionSlides({
      title: "D",
      questions: [q("a", "See figure", { imageUrl: "figs/one.png" })],
      imageBytes: new Map([["figs/one.png", png]]),
    });
    const zip = await JSZip.loadAsync(buf);
    const media = Object.keys(zip.files).filter(
      (n) => !zip.files[n].dir && n.startsWith("ppt/media/")
    );
    expect(media).toHaveLength(1);

    const slide = (await slides(buf))[0];
    expect(slide).toContain("<p:pic>");
    const rels = await zip.file("ppt/slides/_rels/slide1.xml.rels")!.async("text");
    const embedId = slide.match(/r:embed="([^"]+)"/)![1];
    expect(rels).toContain(`Id="${embedId}"`);
    expect(rels).toContain("image");
  });

  it("skips an image whose bytes could not be fetched, without failing the deck", async () => {
    // The route fetches images best-effort; a missing one must not 500.
    const buf = await buildQuestionSlides({
      title: "D",
      questions: [q("a", "See figure", { imageUrl: "figs/missing.png" })],
      imageBytes: new Map(),
    });
    const zip = await JSZip.loadAsync(buf);
    expect(Object.keys(zip.files).filter(
      (n) => !zip.files[n].dir && n.startsWith("ppt/media/")
    )).toHaveLength(0);
    expect((await slides(buf))[0]).toContain("See figure");
  });

  it("prints a source tag only when asked, and only for a PYQ", async () => {
    const rows = [
      q("a", "A PYQ", { pyqYear: 2016, exam: { id: "e", name: "JEE Mains" } }),
      q("b", "A practice question"),
    ];
    const off = await slides(await buildQuestionSlides({ title: "D", questions: rows }));
    expect(off[0]).not.toContain("2016");

    const on = await slides(
      await buildQuestionSlides({ title: "D", questions: rows, includeSourceTag: true })
    );
    expect(on[0]).toContain("2016");
    expect(on[1]).not.toContain("[");
  });

  it("renders a subjective question with no options rather than empty labels", async () => {
    const [slide] = await slides(
      await buildQuestionSlides({
        title: "D",
        questions: [q("a", "Prove the identity.", { questionFormat: "subjective", options: [] })],
      })
    );
    expect(slide).toContain("Prove the identity.");
    expect(slide).not.toContain("(A)");
  });
});
