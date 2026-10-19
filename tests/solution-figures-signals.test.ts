import { describe, it, expect } from "vitest";
import { candidateSignals } from "../scripts/solution-figures/signals";

// Why a row is put in front of a triage agent. Over-reporting is fine (the
// agent rules); a miss is silent, so each fixture below is a real stem the
// finder skipped before 2026-10-19.
describe("candidateSignals", () => {
  it("asks: a request to draw, sketch, plot or construct", () => {
    expect(candidateSignals({ text: "Draw a neat labelled diagram of the human heart.", solution: "", image_url: null })).toContain("asks");
  });

  it("asks: Geography's 'prepare / draw a graph from the data' questions", () => {
    expect(candidateSignals({ text: "Prepare a simple bar graph with the help of the given statistical data.", solution: "", image_url: null })).toContain("asks");
    expect(candidateSignals({ text: "Show the following statistical data with a suitable diagram.", solution: "", image_url: null })).toContain("asks");
  });

  it("asks: not when 'draw' means taking current or a conclusion", () => {
    expect(candidateSignals({ text: "How much current will a 60 W bulb draw from a 220 V supply?", solution: "", image_url: null })).not.toContain("asks");
    expect(candidateSignals({ text: "What conclusion do you draw from this observation?", solution: "", image_url: null })).not.toContain("asks");
  });

  it("dangling: the solution cites a figure and the row carries none (shared rule)", () => {
    expect(candidateSignals({ text: "Explain.", solution: "We see from Fig. 3.2, that element with Z = 117 is a halogen.", image_url: null })).toContain("dangling");
    expect(candidateSignals({ text: "Construct it.", solution: "The circuit is as follows: [circuit diagram]", image_url: null })).toContain("dangling");
  });

  it("dangling: not when the question carries the figure the answer cites", () => {
    expect(candidateSignals({ text: "In the figure, find x.", solution: "From Fig. 3.2, x = 4.", image_url: "https://x/y.png" })).not.toContain("dangling");
  });

  it("nothing for a plain text answer", () => {
    expect(candidateSignals({ text: "Define one volt.", solution: "One volt is one joule per coulomb.", image_url: null })).toEqual([]);
  });
});
