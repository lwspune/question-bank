/**
 * The JEE Main marking rules every JEE subject guide states: +4 for a right answer, 1 mark off for a
 * wrong one, on the multiple-choice AND the numeric-answer questions. The same penalty gives the two
 * formats opposite rules, so both are data here, shared by /guide/jee-mains-maths and
 * /guide/jee-mains-chemistry rather than copied into each.
 */

/** Expected marks from one MCQ guess, by how many options are still in play (+4 / −1). */
export const GUESS_RULE: { optionsLeft: number; expected: string; verdict: string }[] = [
  { optionsLeft: 4, expected: "+0.25", verdict: "A blind guess still pays on average. Never leave an MCQ blank at the end." },
  { optionsLeft: 3, expected: "+0.67", verdict: "Rule out one option and the guess is worth two-thirds of a mark." },
  { optionsLeft: 2, expected: "+1.5", verdict: "Down to two, a guess is worth more than a mark." },
];

/** The numeric-answer rule, the opposite of the MCQ one. */
export const NUMERIC_RULE = {
  expected: "close to −1",
  verdict:
    "A numeric answer has no options, so a guess is almost never right and still costs a mark. Enter one only when you have worked it out.",
};
