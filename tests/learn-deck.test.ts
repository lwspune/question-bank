// Copied from Concept Ladder (src/lessons/deck.test.ts, afca8bf), without the cases that read its content files.
import { describe, expect, it } from "vitest";
import type { Figure, LessonBody } from "@/lib/learn/types";
import { buildDeck } from "@/lib/learn/lesson/deck";

function fake(formal: string, steps: string[]): LessonBody {
  return {
    hook: { prompt: "P", reveal: "R" },
    explanation: { intuition: "I", formal, worked: { prompt: "W", steps, answer: "A" }, visualSpec: "" },
  };
}

const FIG: Figure = { alt: "a point", view: { x: [-1, 1], y: [-1, 1] }, elements: [{ kind: "point", at: [0, 0] }] };

describe("buildDeck", () => {
  it("puts the concept's figure on the idea slide", () => {
    const c = fake("F", ["s1"]);
    c.explanation.figure = FIG;
    const idea = buildDeck(c).find((s) => s.id === "idea");
    expect(idea).toMatchObject({ kind: "text", figure: FIG });
  });

  it("gives each worked slide the worked figure, up to that slide's step", () => {
    const c = fake("F", ["s1", "s2"]);
    c.explanation.worked.figure = FIG;
    const worked = buildDeck(c).filter((s) => s.kind === "worked");
    expect(worked.map((s) => s.kind === "worked" && [s.figure, s.step])).toEqual([
      [FIG, 1],
      [FIG, 2],
    ]);
  });

  it("leaves slides without a figure when the concept has none", () => {
    const deck = buildDeck(fake("F", ["s1"]));
    expect(deck.some((s) => "figure" in s && s.figure)).toBe(false);
  });

  it("orders slides: hook, reveal, idea, formal, worked steps, questions", () => {
    expect(buildDeck(fake("F", ["s1", "s2", "s3"])).map((s) => s.id)).toEqual([
      "hook", "reveal", "idea", "formal-1", "worked-1", "worked-2", "worked-3", "questions",
    ]);
  });

  it("starts a new formal slide at each blank line, keeping a list with its lead-in", () => {
    const deck = buildDeck(fake("Para one.\n\nLead-in:\n- a\n- b\n\nLast.", ["s"]));
    const formal = deck.filter((s) => s.kind === "text" && s.id.startsWith("formal-"));
    expect(formal.map((s) => s.kind === "text" && s.body)).toEqual(["Para one.", "Lead-in:\n- a\n- b", "Last."]);
  });

  it("keeps display math with the paragraph it belongs to", () => {
    const deck = buildDeck(fake("For $c$:\n$$x$$\nSpecial case.", ["s"]));
    expect(deck.filter((s) => s.id.startsWith("formal-"))).toHaveLength(1);
  });

  it("builds the worked example up one step per slide, answer on the last", () => {
    const worked = buildDeck(fake("F", ["s1", "s2", "s3"])).filter((s) => s.kind === "worked");
    expect(worked.map((s) => s.kind === "worked" && [s.steps, s.answer])).toEqual([
      [["s1"], null],
      [["s1", "s2"], null],
      [["s1", "s2", "s3"], "A"],
    ]);
  });

  it("shows the hook prompt again on the reveal slide", () => {
    const reveal = buildDeck(fake("F", ["s"])).find((s) => s.id === "reveal");
    expect(reveal).toMatchObject({ kind: "reveal", prompt: "P", reveal: "R" });
  });

  it("gives every slide a title", () => {
    for (const s of buildDeck(fake("F\n\nG", ["s1", "s2"]))) expect(s.title.length).toBeGreaterThan(0);
  });


});

describe("buildDeck: formal slides", () => {
  const formal = (c: LessonBody) =>
    buildDeck(c).flatMap((s) => (s.kind === "text" && s.id.startsWith("formal-") ? [s] : []));

  it("titles a formal slide by its bold lead-in, and drops the lead-in from the body", () => {
    const slides = formal(fake("**Directed angle.** A ray turns.\n\n**Standard position:** Vertex at $O$.", ["s"]));
    expect(slides.map((s) => [s.title, s.body])).toEqual([
      ["Directed angle", "A ray turns."],
      ["Standard position", "Vertex at $O$."],
    ]);
  });

  it("continues the previous slide's title on a section without a lead-in; the first falls back to Precisely", () => {
    const slides = formal(fake("Intro.\n\n**Rule.** One.\n\nMore of it.", ["s"]));
    expect(slides.map((s) => s.title)).toEqual(["Precisely", "Rule", "Rule"]);
  });

  it("keeps a lead-in longer than six words in the body: it is a sentence, not a title", () => {
    const slides = formal(fake("**Rule.** One.\n\n**First make the coefficients of $x^2$ and $y^2$ equal to $1$.** Then.", ["s"]));
    expect(slides.map((s) => s.title)).toEqual(["Rule", "Rule"]);
    expect(slides[1].body).toMatch(/^\*\*First make/);
  });

  it("keeps a section that ends in a colon with what follows it", () => {
    const slides = formal(fake("**Quadrants.** It lies in:\n\n$$\\begin{array}{c} I \\end{array}$$\n\nNext.", ["s"]));
    expect(slides.map((s) => s.body)).toEqual(["It lies in:\n\n$$\\begin{array}{c} I \\end{array}$$", "Next."]);
  });

  it("takes sections written one per slide, each with its own figure", () => {
    const c = fake("", ["s"]);
    c.explanation.formal = [{ body: "**First.** One.\n\nStill one.", figure: FIG }, { body: "**Second.** Two." }];
    expect(formal(c).map((s) => [s.title, s.body, s.figure])).toEqual([
      ["First", "One.\n\nStill one.", FIG],
      ["Second", "Two.", undefined],
    ]);
  });

});

describe("buildDeck: points", () => {
  it("makes the idea slide a points slide when the intuition is a list", () => {
    const c = fake("F", ["s"]);
    c.explanation.intuition = ["One.", "Two."];
    c.explanation.figure = FIG;
    expect(buildDeck(c).find((s) => s.id === "idea")).toEqual({ id: "idea", title: "The idea", kind: "points", points: ["One.", "Two."], figure: FIG });
  });

  it("makes a formal section written as points a points slide with its own title", () => {
    const c = fake("", ["s"]);
    c.explanation.formal = [{ title: "Arc length", points: ["s = rθ.", "Radians only."], figure: FIG }, { body: "**Next.** Text." }];
    const slides = buildDeck(c).filter((s) => s.id.startsWith("formal-"));
    expect(slides).toEqual([
      { id: "formal-1", title: "Arc length", kind: "points", points: ["s = rθ.", "Radians only."], figure: FIG },
      { id: "formal-2", title: "Next", kind: "text", body: "Text." },
    ]);
  });
});

