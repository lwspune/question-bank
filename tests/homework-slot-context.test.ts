import { describe, expect, it } from "vitest";
import { isHomeworkPassage } from "@/lib/homework/slotContext";

describe("isHomeworkPassage", () => {
  it("is false for no context", () => {
    expect(isHomeworkPassage(null)).toBe(false);
    expect(isHomeworkPassage("   ")).toBe(false);
  });

  it("is false for an instruction the shared detector already knows", () => {
    expect(isHomeworkPassage("Choose the correct option and complete the sentences :")).toBe(false);
    expect(isHomeworkPassage("Write short notes on the following (Any THREE) :")).toBe(false);
    expect(
      isHomeworkPassage("Mark and name the following on the outline map of the world with suitable index (Any SIX) :")
    ).toBe(false);
  });

  it("is false for a board section instruction the shared detector does not know", () => {
    for (const c of [
      "Give geographical reasons (Any FOUR) :",
      "Differentiate between (Any THREE) :",
      "Draw neat, labelled diagrams (Any TWO) :",
      "State whether the following statements are True or False :",
      "Explain the following statements with reasons (Any TWO) :",
      "Answer the following questions in detail (Any ONE) :",
      "Distinguish between (Any THREE) :",
      "True or False :",
    ]) {
      expect(isHomeworkPassage(c)).toBe(false);
    }
  });

  it("is true for a passage, a graph or a map the parts were written against", () => {
    expect(
      isHomeworkPassage(
        "Observe the pie-chart and answer the following : The pie-chart shows the percentage distribution of world population by continent (2019). | Continent | Share | |---|---| | Asia | 60% |"
      )
    ).toBe(true);
    expect(
      isHomeworkPassage(
        "Read the following graph and answer the questions given below : The bar graph is titled 'Percentage of Population Below Poverty Line in Different States'."
      )
    ).toBe(true);
    expect(
      isHomeworkPassage(
        "Smoking increases the risk of lung problems. A study revealed that 170 in 1000 males who smoke develop lung complications, while 120 out of 1000 females who smoke develop lung related problems."
      )
    ).toBe(true);
  });

  /** The MH SSC Class 10 papers store their section instruction on every
   *  question of the section; read as passages, they glued a determinant, a
   *  probability and a quadratic from three chapters into one homework item. */
  it("is false for the MH SSC section instructions", () => {
    for (const c of [
      "Solve the following subquestions (any four):",
      "Solve the following questions (Any two):",
      "Complete the activity as per given instructions (any two) :",
      "Do as directed (any one) :",
      "Attempt any five of the following.",
      "Attempt any five of the following questions.",
      "Mark the following in the outline map of Brazil. Write the names and give index (any four)",
      "Rewrite the following statements by selecting the proper options.",
      "Identify the odd factor out :",
    ]) {
      expect(isHomeworkPassage(c), c).toBe(false);
    }
  });

  it("keeps a shared stem that only opens like an instruction", () => {
    expect(isHomeworkPassage("Attempt any one of the following. In the extraction of aluminium:")).toBe(true);
    expect(isHomeworkPassage("Observe the map of India and answer the following questions (any four).")).toBe(true);
  });

  it("does not take a passage for an instruction because its opening words match", () => {
    expect(
      isHomeworkPassage(
        "Give geographical reasons using the map below. The map is titled 'World - Major transportation routes'. Its index marks canals, sea routes and the major ports of each continent."
      )
    ).toBe(true);
  });
});
