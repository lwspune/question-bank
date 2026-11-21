import type { SubtopicNote } from "@/app/notes/_types";

export const MS4_FR_READING_NOTE: SubtopicNote = {
  subtopicName: "Reading and Comparing Fractions",
  title: "Reading and Comparing Fractions",
  oneLineDefinition:
    "The bottom number says how many equal parts make one whole, the top says how many parts you have; with the same bottom, the bigger top is the bigger fraction.",
  whyItMatters:
    "6 of the chapter's 9 questions: 4 EASY and 2 MODERATE. Two read fractions from pictures, three compare fractions or pick ones with the same denominator, and one asks which form of three quarters is wrong.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ms4frre-pictures",
      name: "Fractions from pictures, proper and mixed",
      intuition:
        "Cut a whole into equal parts and shade some of them: the fraction is shaded parts over all parts. When more than one whole is shaded, count the full wholes first, then the part left over.",
      definition:
        "- **Fraction** = shaded parts ÷ equal parts in one whole: 3 of 4 parts is \\(\\frac{3}{4}\\).\n" +
        "- **Proper fraction**: less than one whole. The top is smaller than the bottom, like \\(\\frac{2}{5}\\).\n" +
        "- **Improper fraction**: one whole or more. The top is equal to or bigger than the bottom, like \\(\\frac{7}{4}\\).\n" +
        "- **Mixed number**: wholes and a part together, like \\(2\\frac{1}{2}\\) (two and a half).",
      authoredExample: {
        prompt: "A picture shows one square fully shaded, and a second square cut into 4 equal parts with 3 of them shaded. What fraction is shaded?",
        steps: [
          "One full square is 1 whole.",
          "In the second square 3 of 4 parts are shaded: \\(\\frac{3}{4}\\).",
          "Together: 1 and \\(\\frac{3}{4}\\).",
        ],
        answer: "\\(1\\frac{3}{4}\\) (one and three quarters)",
      },
      selfCheckExample: {
        prompt: "Which of these is a proper fraction: \\(\\frac{5}{4}\\), \\(\\frac{3}{8}\\), \\(\\frac{7}{7}\\), \\(\\frac{9}{2}\\)?",
        steps: ["Only \\(\\frac{3}{8}\\) has a top smaller than its bottom."],
        answer: "\\(\\frac{3}{8}\\)",
      },
      practiceSet: [
        { prompt: "A circle is cut into 6 equal parts and 5 are shaded. What fraction is shaded?", answer: "\\(\\frac{5}{6}\\)" },
        { prompt: "Is \\(\\frac{7}{5}\\) a proper fraction?", answer: "No. Its top is bigger than its bottom, so it is more than one whole." },
        { prompt: "Write three and a half as a mixed number.", answer: "\\(3\\frac{1}{2}\\)" },
        { prompt: "Two whole pizzas and a quarter of a pizza are left. Write this as a mixed number.", answer: "\\(2\\frac{1}{4}\\)" },
      ],
      pyqExampleId: "c64e107d-ab87-4a72-84d1-30c4ba15e12e",
      traps: [
        {
          title: "Counting only the shaded part of the last whole",
          body: "If two circles are fully shaded and a third is half shaded, the picture shows two and a half, not one half.",
        },
        {
          title: "Calling every fraction proper",
          body: "A fraction is proper only when it is less than 1. A picture with a full whole shaded and more besides is not a proper fraction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4frre-compare",
      name: "Comparing fractions",
      intuition:
        "If two fractions cut the whole into the same number of parts, the one with more parts is bigger. If they have the same number of parts but different cuts, the one cut into fewer, bigger pieces is bigger.",
      definition:
        "- **Same denominator** (bottom number): the bigger numerator (top) is the bigger fraction: \\(\\frac{5}{7} > \\frac{2}{7}\\).\n" +
        "- **Same numerator**: the smaller denominator is the bigger fraction: \\(\\frac{3}{4} > \\frac{3}{8}\\).\n" +
        "- A fraction with the top **bigger than the bottom** is more than 1, so it beats any proper fraction.\n" +
        "- **Descending** order is biggest first; **ascending** is smallest first.",
      authoredExample: {
        prompt: "Which is greater: \\(\\frac{3}{5}\\) or \\(\\frac{3}{8}\\)?",
        steps: [
          "The tops are the same, 3.",
          "Fifths are bigger pieces than eighths, so 3 fifths is more than 3 eighths.",
        ],
        answer: "\\(\\frac{3}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Arrange \\(\\frac{2}{9}\\), \\(\\frac{7}{9}\\), \\(\\frac{4}{9}\\) in ascending order.",
        steps: ["Same denominator, so order by the top: 2, 4, 7."],
        answer: "\\(\\frac{2}{9}, \\frac{4}{9}, \\frac{7}{9}\\)",
      },
      practiceSet: [
        { prompt: "Which is greater: \\(\\frac{5}{6}\\) or \\(\\frac{1}{6}\\)?", answer: "\\(\\frac{5}{6}\\)" },
        { prompt: "Which is smaller: \\(\\frac{1}{4}\\) or \\(\\frac{1}{2}\\)?", answer: "\\(\\frac{1}{4}\\), because a whole cut into 4 gives smaller pieces than one cut into 2" },
        { prompt: "Which of these is more than 1: \\(\\frac{3}{4}\\), \\(\\frac{5}{5}\\), \\(\\frac{6}{5}\\)?", answer: "\\(\\frac{6}{5}\\). (\\(\\frac{5}{5}\\) is exactly 1.)" },
        { prompt: "Which two of \\(\\frac{2}{3}\\), \\(\\frac{3}{5}\\), \\(\\frac{4}{3}\\), \\(\\frac{5}{7}\\) have the same denominator?", answer: "\\(\\frac{2}{3}\\) and \\(\\frac{4}{3}\\)" },
      ],
      pyqExampleId: "6dbff78b-f8a4-4764-b2ac-cdc03957ec67",
      traps: [
        {
          title: "Thinking a bigger bottom means a bigger fraction",
          body: "\\(\\frac{1}{8}\\) is smaller than \\(\\frac{1}{2}\\): cutting a whole into more parts makes each part smaller.",
        },
        {
          title: "Mixing up the first and last",
          body: "In descending order the biggest fraction comes first. Read the question twice before choosing which end is which.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ms4frre-meaning",
      name: "A fraction as equal parts added up",
      intuition:
        "Three quarters is three pieces of one quarter each. You can add the quarter three times, or take it three times; both give three quarters. Adding 3 whole ones to a quarter gives something much bigger.",
      definition:
        "- \\(\\frac{3}{4} = \\frac{1}{4} + \\frac{1}{4} + \\frac{1}{4} = 3 \\times \\frac{1}{4}\\).\n" +
        "- \"3 times \\(\\frac{1}{4}\\)\" means the same as \\(3 \\times \\frac{1}{4}\\).\n" +
        "- \\(3 + \\frac{1}{4}\\) is **three and a quarter**, \\(3\\frac{1}{4}\\), not \\(\\frac{3}{4}\\).",
      authoredExample: {
        prompt: "Write \\(\\frac{2}{5}\\) as a sum of fifths.",
        steps: ["\\(\\frac{2}{5}\\) is 2 pieces of \\(\\frac{1}{5}\\) each."],
        answer: "\\(\\frac{1}{5} + \\frac{1}{5}\\)",
      },
      selfCheckExample: {
        prompt: "What is 4 times \\(\\frac{1}{7}\\)?",
        steps: ["4 pieces of one seventh each make four sevenths."],
        answer: "\\(\\frac{4}{7}\\)",
      },
      practiceSet: [
        { prompt: "Which one is NOT equal to \\(\\frac{3}{5}\\): \\(3 \\times \\frac{1}{5}\\), \\(\\frac{1}{5} + \\frac{1}{5} + \\frac{1}{5}\\), \\(3 + \\frac{1}{5}\\)?", answer: "\\(3 + \\frac{1}{5}\\), which is three and one fifth" },
        { prompt: "How many sixths make \\(\\frac{5}{6}\\)?", answer: "5" },
        { prompt: "Write \\(\\frac{1}{3} + \\frac{1}{3}\\) as one fraction.", answer: "\\(\\frac{2}{3}\\)" },
        { prompt: "Is \\(2 + \\frac{1}{4}\\) the same as \\(\\frac{2}{4}\\)?", answer: "No. \\(2 + \\frac{1}{4}\\) is two and a quarter; \\(\\frac{2}{4}\\) is a half." },
      ],
      pyqExampleId: "f38fa1b1-70ab-4938-afcb-3afe2af67c02",
      traps: [
        {
          title: "Reading plus as times",
          body: "\\(3 \\times \\frac{1}{4}\\) is three quarters, but \\(3 + \\frac{1}{4}\\) is three wholes and a quarter. Look at the sign.",
        },
      ],
    },
  ],
};
