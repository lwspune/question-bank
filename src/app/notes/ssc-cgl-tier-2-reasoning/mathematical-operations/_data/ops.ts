import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RMO_OPS_NOTE: SubtopicNote = {
  subtopicName: "Sign Rules and Balancing Equations",
  title: "Sign Rules and Balancing Equations",
  oneLineDefinition:
    "Rewrite an expression whose signs have been given new meanings or swapped, then work it out; or find the signs or the swap that make an equation true.",
  whyItMatters:
    "16 questions in the Tier II bank, all EASY. Nearly every wrong answer comes from calculating before rewriting, or from working left to right instead of in the usual order.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rmoop-symbol",
      name: "Signs with new meanings",
      visualizationSlug: "ssc-t2-sign-rewrite",
      intuition:
        "The question gives a table of what each sign or letter now means. Rewrite the whole expression with the real signs on paper before touching a number.",
      definition:
        "- **Rewrite first,** one sign at a time, left to right.\n" +
        "- **Then the usual order:** division and multiplication before addition and subtraction.\n" +
        "- **Letters as signs** (A for ÷, B for ×) work the same way.\n" +
        "- **'Which equation is correct?'** questions: rewrite each option and test it.",
      formula: { label: "Order of operations", latex: "\\div,\\ \\times \\;\\text{ before }\\; +,\\ -" },
      authoredExample: {
        prompt: "If + means ×, × means −, − means ÷ and ÷ means +, find 8 + 3 × 12 − 4 ÷ 2.",
        steps: ["Rewrite: 8 × 3 − 12 ÷ 4 + 2.", "Order: 24 − 3 + 2 = 23."],
        answer: "23",
      },
      selfCheckExample: {
        prompt: "If × means + and + means ×, find 6 × 4 + 3.",
        steps: ["Rewrite: 6 + 4 × 3.", "Multiply first: 6 + 12 = 18."],
        answer: "18",
      },
      practiceSet: [
        { prompt: "If − means + and + means −, find 20 − 5 + 3.", answer: "22 (20 + 5 − 3)" },
        { prompt: "If P means ×, Q means +, find 4 P 5 Q 6.", answer: "26" },
        { prompt: "If ÷ means × and × means ÷, find 18 × 3 ÷ 2.", answer: "12 (18 ÷ 3 × 2)" },
      ],
      pyqExampleId: "7c8c0e1e-76c1-4d84-a0f7-24abfe3c9269",
      traps: [
        {
          title: "Working left to right",
          body: "After rewriting, 24 − 12 ÷ 4 is 21, not 3. Division and multiplication come first, wherever they sit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rmoop-swap",
      name: "Interchanged signs",
      intuition:
        "'+ and − are interchanged, × and ÷ are interchanged' means every + becomes −, every − becomes +, and the same for × and ÷. Swap them all at once, then calculate.",
      definition:
        "- **Swap in pairs:** + with −, × with ÷ (only the pairs named).\n" +
        "- **Swap every occurrence,** not just the first.\n" +
        "- **Then the usual order** of operations.",
      authoredExample: {
        prompt: "If + and − are interchanged and × and ÷ are interchanged, find 20 × 4 − 6 ÷ 3 + 5.",
        steps: ["Rewrite: 20 ÷ 4 + 6 × 3 − 5.", "5 + 18 − 5 = 18."],
        answer: "18",
      },
      selfCheckExample: {
        prompt: "If + and × are interchanged, find 7 + 3 × 2.",
        steps: ["Rewrite: 7 × 3 + 2.", "21 + 2 = 23."],
        answer: "23",
      },
      practiceSet: [
        { prompt: "If + and − are interchanged, find 15 + 4 − 2.", answer: "13 (15 − 4 + 2)" },
        { prompt: "If × and ÷ are interchanged, find 40 × 8 ÷ 3.", answer: "15 (40 ÷ 8 × 3)" },
        { prompt: "After rewriting, what do you do before adding?", answer: "Divide and multiply first" },
      ],
      pyqExampleId: "3f538918-f369-4a51-985e-80527dc3a32b",
      traps: [
        {
          title: "Swapping only some signs",
          body: "Every + in the expression becomes −, including the last one. Rewrite the whole line before calculating.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rmoop-balance",
      name: "Balancing an equation",
      intuition:
        "Here the answer is given and the signs, or two numbers, are missing or misplaced. Test the options, starting with the one whose first sign makes the biggest change (usually ÷ or ×).",
      definition:
        "- **Choose signs:** put each option's signs in order and work the left side out; the right one equals the right side.\n" +
        "- **Swap two numbers:** try swaps that change a division or a multiplication, since those move the total most.\n" +
        "- **Use divisibility:** a ÷ must leave a whole number in most SSC questions, which rules out options fast.",
      authoredExample: {
        prompt: "Choose the signs for the stars: 15 * 3 * 4 * 2 = 13.",
        steps: ["15 ÷ 3 = 5 is a clean start; try ÷, +, ×.", "15 ÷ 3 + 4 × 2 = 5 + 8 = 13."],
        answer: "÷, +, ×",
      },
      selfCheckExample: {
        prompt: "Which two numbers must be swapped to make this true? 8 + 6 ÷ 2 − 3 = 7",
        steps: ["As written: 8 + 3 − 3 = 8, not 7.", "Swap 8 and 6: 6 + 8 ÷ 2 − 3 = 6 + 4 − 3 = 7."],
        answer: "8 and 6",
      },
      practiceSet: [
        { prompt: "Choose the signs: 12 * 4 * 2 = 6", answer: "÷ and × (12 ÷ 4 × 2)" },
        { prompt: "Choose the signs: 9 * 3 * 5 = 32", answer: "× and + (27 + 5)" },
        { prompt: "Why test a ÷ first?", answer: "It must divide exactly, which rules out options quickly" },
      ],
      pyqExampleId: "63bcf10e-7558-43a5-9598-da3b973e8821",
      traps: [
        {
          title: "Checking only the first few signs",
          body: "Two options can agree for three signs and differ in the last. Work each candidate through to the end.",
        },
      ],
    },
  ],
};
