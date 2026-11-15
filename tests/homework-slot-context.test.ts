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

  /** UPSC (NDA, CDS) English stores its long section direction on every
   *  question of the section; read as passages, they glued up to 23 separate
   *  antonym or error-spotting questions into one homework item (2026-11-15). */
  it("is false for a UPSC English section direction, however long", () => {
    for (const c of [
      "Directions : Each item in this section consists of a sentence with an underlined word followed by four words. Select the option that is nearest in meaning to the underlined word and mark your response in your Answer Sheet accordingly.",
      "Directions for the following 5 (five) items : In this section, each item consists of a sentence with a word underlined and is followed by four words. Select the word that is most opposite in meaning to the underlined word and indicate your response in the Answer Sheet accordingly.",
      "Directions : Each item in this section has a sentence with three underlined parts labelled (a), (b) and (c). Read each sentence to find out whether there is any error in any underlined part and indicate your response in the Answer Sheet against the corresponding letter, i.e., (a) or (b) or (c). If you find no error, your response should be indicated as (d).",
      "Directions for the following 10 (ten) items : In this section, look at the underlined part of each sentence. Below each sentence are given three possible substitutions for the underlined part. If one of them, (a), (b) or (c), is better than the underlined part, indicate your response on the Answer Sheet against the corresponding letter (a), (b) or (c). If none of these substitutions improves the sentence, indicate (d) as your response on the Answer Sheet. Thus a 'no improvement' response will be signified by the letter (d).",
      "Directions : Given below are some idioms/phrases followed by four alternative meanings for each. Choose the most appropriate answer from among the options (a), (b), (c) or (d).",
      "Directions : Given below are some idioms/phrases followed by four alternative meanings to each. Choose the response (a), (b), (c) or (d) which is the most appropriate expression.",
      "Directions : Each of the following items features one part of a sentence, followed by four alternatives. Complete the sentence by choosing the correct alternative.",
      "Directions : In this section each item consists of six sentences of a passage. The first and sixth sentences are given in the beginning as S1 and S6. The middle four sentences in each have been jumbled up and labelled P, Q, R and S. You are required to find the proper sequence of the four sentences and mark your response accordingly on the Answer Sheet.",
      "Directions : In the following items, a pair of words is provided. You are required to select the option that most appropriately describes the relationship between the words and mark your response on the Answer Sheet accordingly",
    ]) {
      expect(isHomeworkPassage(c), c.slice(0, 60)).toBe(false);
    }
  });

  it("keeps a UPSC passage or data set that opens with Directions", () => {
    for (const c of [
      // NDA Maths sets: short, but they end with the data the parts share.
      "Directions for the following three (03) items: Consider the following Venn diagram, where X, Y and Z are three sets. Let the number of elements in Z be denoted by n(Z) which is equal to 90.",
      "Directions for the following two (02) items: Read the following information and answer the two items that follow: ABCD is a trapezium such that AB and CD are parallel and BC is perpendicular to them. Let ∠ADB = θ, ∠ABD = α, BC = p and CD = q.",
      // A cloze passage: its blanks are the questions.
      "Directions : In the following passage there are some blank spaces with four words or groups of words given. Select whichever word or group of words you consider most appropriate for the blank space and indicate your response on the Answer Sheet accordingly. The queen bee is larger than the rest of the bees. Her main task is to ______ eggs.",
      "Directions : In the following passage, at certain points you are given a choice of four words. The [28] that [29] on the face of a [30] man after a full meal.",
    ]) {
      expect(isHomeworkPassage(c), c.slice(0, 60)).toBe(true);
    }
  });

  it("does not take a passage for an instruction because its opening words match", () => {
    expect(
      isHomeworkPassage(
        "Give geographical reasons using the map below. The map is titled 'World - Major transportation routes'. Its index marks canals, sea routes and the major ports of each continent."
      )
    ).toBe(true);
  });
});
