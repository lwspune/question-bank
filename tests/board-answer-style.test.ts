import { describe, it, expect } from "vitest";
import { probeBoardAnswer, type StyleFinding } from "../scripts/lib/boardAnswerStyle";

const reasons = (f: StyleFinding[]) => f.map((x) => x.reason).join(" | ");
const errors = (f: StyleFinding[]) => f.filter((x) => x.severity === "error");

// Every offending string below was written by a real authoring pass on the
// MH HSC Physics board-PYQ pilot and caught in review. The convention they
// violate is the one the SHIPPED Maths corpus already follows: state the
// principle, show the working, close on a bolded result — a board answer, not
// a note to whoever is marking it.

describe("probeBoardAnswer — marker-facing text (error)", () => {
  it("catches an aside offering the marker alternative answers", () => {
    const f = probeBoardAnswer("x#1", "...gives the speed of flow.\n\n(Other acceptable applications: SONAR, and tracking a satellite.)");
    expect(errors(f)).toHaveLength(1);
    expect(reasons(f)).toMatch(/marker-facing/i);
  });

  it("catches an editorial aside", () => {
    expect(errors(probeBoardAnswer("x#2", "**A caution worth stating.** This uses the progressive-wave relation."))).toHaveLength(1);
    expect(errors(probeBoardAnswer("x#3", "It is worth noting that the node does not oscillate."))).toHaveLength(1);
  });

  it("catches a remark ABOUT the question rather than an answer to it", () => {
    expect(errors(probeBoardAnswer("x#4", "Note the question asks for the same SPEED, not the same velocity."))).toHaveLength(1);
  });

  it("catches an assertion standing in for a derivation", () => {
    // The brief already forbids this in words; the probe makes it enforceable.
    expect(errors(probeBoardAnswer("x#5", "By the standard result, the answer is 210 Hz."))).toHaveLength(1);
    expect(errors(probeBoardAnswer("x#6", "It can be shown that the ratio is 1 : 8."))).toHaveLength(1);
  });

  it("catches an option letter named in prose", () => {
    // Also what makes `audit:keys` misfire, so this closes two holes at once.
    expect(errors(probeBoardAnswer("x#7", "...integral multiples of lambda/2, which is option B."))).toHaveLength(1);
    expect(errors(probeBoardAnswer("x#8", "That alone rules out options A and D."))).toHaveLength(1);
  });
});

describe("probeBoardAnswer — a real board answer passes clean", () => {
  it("accepts a worked numerical closing on a bolded result", () => {
    const answer =
      "For a sonometer wire under fixed tension, \\(n \\propto \\dfrac{1}{L}\\).\n\n" +
      "\\(\\dfrac{n}{21} = 10\\)\n\n" +
      "\\(\\therefore n = 210\\text{ Hz}\\)\n\n" +
      "**Frequency of the tuning fork = 210 Hz.**";
    expect(probeBoardAnswer("x#9", answer, { numerical: true })).toHaveLength(0);
  });

  it("accepts an MCQ opening with the option and its value", () => {
    const answer = "**(B)** \\(\\dfrac{\\lambda}{2}\\)\n\nParticles \\(\\dfrac{\\lambda}{2}\\) apart are in antiphase.";
    expect(probeBoardAnswer("x#10", answer, { mcq: true })).toHaveLength(0);
  });

  it("does NOT mistake the opening **(B)** of an MCQ for an option letter in prose", () => {
    expect(errors(probeBoardAnswer("x#11", "**(D)** \\(\\pi\\) rad\n\nA crest returns as a trough."))).toHaveLength(0);
  });

  it("does NOT fire on ordinary physics prose that merely contains the words", () => {
    // "corresponds to" is legitimate English about harmonics; only the
    // hand-waved DERIVATION step form is worth flagging, and that is a warning.
    const ok = "The first overtone corresponds to the second harmonic of the pipe.";
    expect(errors(probeBoardAnswer("x#12", ok))).toHaveLength(0);
  });
});

describe("probeBoardAnswer — convention warnings, never blocking", () => {
  // MEASURED, not assumed: 0 of the 153 shipped Maths numericals close on a
  // bolded result line, so warning on its absence would have fired on 43% of the
  // shipped corpus. A numerical that simply ends on its `\therefore` is fine.
  it("does NOT require a bolded result line — that was never the convention", () => {
    expect(probeBoardAnswer("x#13", "\\(\\therefore n = 210\\text{ Hz}\\)", { numerical: true })).toHaveLength(0);
  });

  it("warns when a NUMERICAL never reaches a therefore", () => {
    const f = probeBoardAnswer("x#14", "n = 210 Hz\n\n**Frequency = 210 Hz.**", { numerical: true });
    expect(errors(f)).toHaveLength(0);
    expect(reasons(f)).toMatch(/therefore/i);
  });

  it("does not impose either convention on a derivation or an explanation", () => {
    const proof =
      "Let two identical waves travel in opposite directions.\n\n" +
      "\\(y = 2A\\cos(kx)\\sin(\\omega t)\\)\n\n" +
      "Hence nodes and antinodes are equally spaced.";
    expect(probeBoardAnswer("x#15", proof)).toHaveLength(0);
  });
});
