/**
 * Which question contexts a chapter test may carry on a loose question, and
 * what a chapter test shows in place of an Assertion-Reason instruction.
 *
 * Board MCQs carry a context almost every time, but most of those contexts are
 * only the exercise's instruction ("Choose the correct option."), not a shared
 * passage. A chapter test can take such a question alone. A real passage (a
 * CBSE case study) still cannot, because its siblings were written against it.
 *
 * Every fixture below is a real wording from the bank (2026-10-05): all the
 * MH instruction wordings, all 25 CBSE 12 Assertion-Reason wordings, and the
 * shortest case-study passages, which sit closest to the line.
 */
import { describe, it, expect } from "vitest";
import {
  ASSERTION_REASON_INSTRUCTION,
  chapterTestContext,
  isAssertionReasonInstruction,
  isInstructionOnlyContext,
} from "@/lib/mocks/instructionContext";

const MH_INSTRUCTIONS = [
  "Choose the most correct option.",
  "Choose the correct option.",
  "Select and write the correct answer for the following multiple choice type of questions :",
  "Select appropriate answers for the following.",
  "Choose the correct option and complete the sentences :",
  "Choose the correct option from the given alternatives.",
  "Select the most apropriate option.",
  "Select and write the correct answers for the following multiple choice type of questions :",
  "Choose the most correct answer.",
  "Choose the most correct answer :",
  "Use \\(g = 10\\ \\text{m/s}^2\\), unless, otherwise stated.\n\n**Choose the correct option.**",
  "Select the most correct choice.",
  "Choose the correct option",
  "Do as directed: Choose the correct option and write.",
  "Choose the correct option and complete the sentences.",
  "Choose the correct answer.",
  "Multiple Choice Questions",
  "Choose the correct option and complete the sentence :",
  "Choose the correct option :",
  "Identify the correct group :",
  "Do as directed :",
  "Select and write the correct answer for the following multiple choice type of questions:",
  "Choose the correct option from the given options and complete the statement.",
  "Choose the correct option from the given options and complete the sentences.",
  "Choose the correct alternative answer for each of the following questions.",
  "Choose the correct alternative answer for each of the following sub questions.",
  "Four alternative answers for each of the following questions are given. Choose the correct alternative.",
  "Some questions and their alternative answers are given. Select the correct alternative.",
  "Choose the correct answers for the following questions.",
  "Complete the sentences by choosing the right option :",
  "Find the correct answer from the alternatives given.",
  "Write the correct alternative for each of the following.",
  "Rewrite the following statements by selecting the proper options.",
  "Select the appropriate alternative.",
  "Write the correct alternative for the following questions.",
  "Choose correct alternative for each of the following questions",
  "Tick (✓) the correct options :",
  "Four alternative answers are given for every subquestion. Choose the correct alternative and write its alphabet with subquestion number.",
  "Fill in the blanks using correct alternatives.",
  "Complete the following sentences by choosing the appropriate alternatives from those given and rewrite the sentences in your answer-book:",
  "Answer the following questions by choosing correct option.",
  "Choose the correct alternative answer for the following questions.",
  "Choose the correct alternative:",
  "Identify the odd factor out :",
  "Identify the odd man out",
  "Choose the correct option and rewrite the statement.",
  "Select the correct option",
  "Fill in the blank with appropriate word.",
  "Select the correct alternative for each of the following questions.",
  "Identify and write the wrong pair in the following sets.",
  "Identify the wrong pair in the following and rewrite it :",
  "Mark the correct answer in the following questions.",
  "Choose the correct option from the given options and complete the sentences :",
  "Choose the correct option from given options and complete the statements :",
  "Multiple choice questions.",
];

const ASSERTION_REASON = [
  "For Questions number 13 to 16, two statements are given — one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below.",
  "Questions number 13 to 16 are Assertion (A) and Reason (R) type questions. Two statements are given — one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the codes (A), (B), (C) and (D) as given below.",
  "Questions number 19 and 20 are Assertion and Reason based questions. Two statements are given, one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the codes (A), (B), (C) and (D) as given below.",
  "For Questions number 15 to 18, two statements are given — one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (a), (b), (c) and (d) as given below.",
  "For questions number 13 to 16, two statements are given – one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "For questions number 15 to 18, two statements are given – one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (a), (b), (c) and (d) as given below :",
  "For Questions number 13 to 16, two statements are given — one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "Questions number 19 and 20 are Assertion and Reason based questions carrying 1 mark each. Two statements are given, one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the codes (a), (b), (c) and (d) as given below.",
  "For questions number 13 to 16, two statements are given one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "Questions number 16 to 18 are Assertion (A) and Reason (R) type questions. Two statements are given — one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the codes (a), (b), (c) and (d) as given below.",
  "In question number 16 to 18 two statements are given – one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer to these questions from the codes (a), (b), (c) and (d) as given below :\n(A) Both Assertion (A) and Reason (R) are true and (R) is the correct explanation of (A).\n(B) Both Assertion (A) and Reason (R) are true and (R) is NOT the correct explanation of (A).\n(C) Assertion (A) is true and Reason (R) is false.\n(D) Assertion (A) is false and Reason (R) is also false.",
  "For questions number 13 to 16, two statements are given - one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "For Questions 13 to 16, two statements are given – one labelled Assertion (A) and other labelled Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "For question number 13 to 16, two statements are given – one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "For question number 13 to 16, two statements are given - one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the options (A), (B), (C) and (D) as given below :",
  "Note : For questions number 13 to 16, two statements are given — one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "For question number 13 to 16, two statements are given - one labelled as Assertion (A) and the other labelled as Reason (R). Select the correct answer to these questions from the codes (A), (B), (C) and (D) as given below :",
  "For Questions 13 to 16, two statements are given – one labelled Assertion (A) and other labelled Reason (R). Select the correct answer to these questions from the options as given below.\n(A) If both Assertion (A) and Reason (R) are true and Reason (R) is correct explanation of Assertion (A).\n(B) If both Assertion (A) and Reason (R) are true and Reason (R) is not the correct explanation of Assertion (A).\n(C) If Assertion (A) is true but Reason (R) is false.\n(D) If both Assertion (A) and Reason (R) are false.",
  "Questions number 16 to 18 are Assertion (A) and Reason (R) type questions. Two statements are given — one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the codes (A), (B), (C) and (D) as given below.",
  "In question number 16 to 18, two statements are given - one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer to these questions from the codes (a), (b), (c) and (d) as given below :",
  "Direction : Questions number 19 and 20 are Assertion and Reason based questions carrying 1 mark each. Two statements are given, one labelled Assertion (A) and other labelled Reason (R).\nSelect the correct answer from the codes (A), (B), (C) and (D) as given below.",
  "In the following questions 19 & 20, a statement of Assertion (A) is followed by a statement of Reason (R).\nChoose the correct answer out of the following choices :",
  "In the following questions 19 and 20, a statement of Assertion (A) is followed by a statement of Reason (R). Choose the correct answer out of the following choices :",
  "ASSERTION – REASON BASED QUESTIONS\nDirection : Question number 19 and 20 are Assertion (A) and Reason (R) based questions. Two statements are given, one labelled Assertion (A) and other labelled Reason (R). Select the correct answer from the options (A), (B), (C) and (D) as given below :",
  "Questions No. 19 & 20, are Assertion (A) and Reason (R) based questions carrying 1 mark each. Two statements are given, one labelled Assertion (A) and the other labelled Reason (R). Select the correct answer from the codes (A), (B), (C) and (D) as given below :",
];

/**
 * Case-study passages: the two shortest in the bank (180 and 286 characters,
 * nearest the line), then two real openings with an instruction appended, so
 * the rule cannot pass a passage just because it says "choose" or "select".
 */
const PASSAGES = [
  "A student sets up the circuit as shown in the figure to find the value of unknown resistance X and records a set of readings of the voltmeter and the ammeter by varying the current in the circuit.",
  "The figure shows four pairs of parallel identical conducting plates, separated by the same distance \\(2{\\cdot}0\\) cm and arranged perpendicular to x-axis. The electric potential of each plate is mentioned. The electric field between a pair of plates is uniform and normal to the plates.",
  "In an experiment with convex lens of focal length f, the screen is fixed at a distance D from the object. A student slowly moves the lens away from the object to obtain a sharp image on the screen. Choose the correct option for each of the questions that follow.",
  "A galvanometer is used to detect or/and measure small currents in an electrical circuit. It essentially works on the fact that a current-carrying coil experiences a torque when placed in a magnetic field. Select the correct option.",
];

describe("isInstructionOnlyContext", () => {
  it.each(MH_INSTRUCTIONS)("an exercise instruction is not a passage: %s", (ctx) => {
    expect(isInstructionOnlyContext(ctx)).toBe(true);
  });

  it.each(ASSERTION_REASON)("an Assertion-Reason instruction is not a passage: %s", (ctx) => {
    expect(isInstructionOnlyContext(ctx)).toBe(true);
  });

  it.each(PASSAGES)("a case-study passage is not an instruction, even when it says choose: %s", (ctx) => {
    expect(isInstructionOnlyContext(ctx)).toBe(false);
  });

  it("says no to an empty or missing context, which is not an instruction at all", () => {
    expect(isInstructionOnlyContext(null)).toBe(false);
    expect(isInstructionOnlyContext("   ")).toBe(false);
  });

  it("says no to a short line that instructs nothing", () => {
    expect(isInstructionOnlyContext("Read the passage given below.")).toBe(false);
    expect(isInstructionOnlyContext("Figure 4.2")).toBe(false);
  });
});

describe("isAssertionReasonInstruction", () => {
  it.each(ASSERTION_REASON)("recognises %s", (ctx) => {
    expect(isAssertionReasonInstruction(ctx)).toBe(true);
  });

  it("does not take an ordinary instruction for one", () => {
    expect(isAssertionReasonInstruction("Choose the correct option.")).toBe(false);
  });

  it("does not take a long passage that mentions a reason", () => {
    const passage = `${PASSAGES[3]} ${"The reason is explained in the assertion of Ampere. ".repeat(20)}`;
    expect(isAssertionReasonInstruction(passage)).toBe(false);
  });
});

describe("chapterTestContext", () => {
  it.each(ASSERTION_REASON)("a chapter test shows one standard instruction in place of %s", (ctx) => {
    expect(chapterTestContext(ctx, "sectional")).toBe(ASSERTION_REASON_INSTRUCTION);
  });

  it("the standard instruction names no question numbers and no option letters", () => {
    expect(ASSERTION_REASON_INSTRUCTION).not.toMatch(/\d/);
    // "(A)" is the Assertion's own label; (B) to (D) can only come from a codes list.
    expect(ASSERTION_REASON_INSTRUCTION).not.toMatch(/\([b-dB-D]\)/);
    expect(ASSERTION_REASON_INSTRUCTION).toMatch(/Assertion \(A\)/);
    expect(ASSERTION_REASON_INSTRUCTION).toMatch(/Reason \(R\)/);
  });

  it("a full paper keeps the printed wording, where the numbers are right", () => {
    expect(chapterTestContext(ASSERTION_REASON[0], "full")).toBe(ASSERTION_REASON[0]);
  });

  it("leaves every other context alone", () => {
    expect(chapterTestContext("Choose the correct option.", "sectional")).toBe("Choose the correct option.");
    expect(chapterTestContext(PASSAGES[0], "sectional")).toBe(PASSAGES[0]);
    expect(chapterTestContext(null, "sectional")).toBeNull();
  });
});
