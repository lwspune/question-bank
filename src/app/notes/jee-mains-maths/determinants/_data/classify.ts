import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSIFY_DET_NOTE: SubtopicNote = {
  subtopicName: "Classifying a System: Unique, Infinite or None",
  title: "Classifying a System: Unique, Infinite or None",
  oneLineDefinition:
    "Deciding for every value of the parameters whether a linear system has one solution, infinitely many or none, and finding the one solution by Cramer's rule.",
  whyItMatters:
    "Nineteen PYQs, eighteen of them multiple choice. Eleven give several statements about a system and ask which is not correct; eight ask for the unique solution, or for the chance that a system with random coefficients has one. Two ideas cover the page.",
  concepts: [
    // C1 — statements
    {
      kind: "formula" as const,
      slug: "jdet-statements",
      name: "The full classification",
      intuition:
        "Build the whole table once. Find the parameter values with \\(\\Delta=0\\); everywhere else the solution is unique. At those values, test consistency: infinitely many if the right-hand sides fit, none if they do not. Then check each statement against the table, remembering that a statement about 'all' values fails if one value breaks it.",
      definition:
        "- \\(\\Delta\\neq0\\): unique.\n" +
        "- \\(\\Delta=0\\), consistent: infinitely many.\n" +
        "- \\(\\Delta=0\\), inconsistent: none.\n" +
        "- A 'for all' statement needs every case; a 'there exists' statement needs one.",
      formula: {
        label: "Three cases",
        latex: "\\Delta\\neq0\\Rightarrow\\text{unique};\\quad\\Delta=0\\Rightarrow\\text{infinite or none}",
      },
      authoredExample: {
        prompt: "Classify \\(x+y+z=3\\), \\(x+2y+2z=5\\), \\(x+2y+\\lambda z=\\mu\\).",
        steps: [
          "Eliminate: \\(y+z=2\\) and \\(y+(\\lambda-1)z=\\mu-3\\), so \\((\\lambda-2)z=\\mu-5\\).",
        ],
        answer: "Unique if \\(\\lambda\\neq2\\); infinitely many if \\(\\lambda=2,\\ \\mu=5\\); none if \\(\\lambda=2,\\ \\mu\\neq5\\).",
      },
      selfCheckExample: {
        prompt: "For the system above, is 'it has infinitely many solutions for \\(\\lambda=2,\\ \\mu=4\\)' correct?",
        steps: [
          "\\(\\lambda=2\\) gives \\(0\\cdot z=-1\\).",
        ],
        answer: "No — there is no solution.",
      },
      practiceSet: [
        { prompt: "\\(\\Delta=(\\lambda-1)(\\lambda-3)\\): unique for?", answer: "\\(\\lambda\\neq1,3\\)" },
        { prompt: "'No solution for all \\(\\mu\\)' at a value where \\(\\mu=5\\) works?", answer: "Not correct" },
        { prompt: "Homogeneous system: can it have no solution?", answer: "No — \\((0,0,0)\\) always works" },
        { prompt: "\\(\\Delta=0\\): possible outcomes?", answer: "Infinitely many or none" },
      ],
      pyqExampleId: "36bc6448-7093-4aa8-b85d-8a8b1f9e1df6", // 2024 — which statement about a system is not correct
      traps: [
        {
          title: "Two options can be wrong",
          body: "In 'which is NOT correct' questions, check every option against the table, not just until one fails. A booklet may print two incorrect statements; the key then picks one.",
        },
      ],
    },

    // C2 — the unique solution
    {
      kind: "formula" as const,
      slug: "jdet-unique",
      name: "The unique solution",
      intuition:
        "When \\(\\Delta\\neq0\\) the solution is \\(x=\\frac{\\Delta_x}{\\Delta}\\), \\(y=\\frac{\\Delta_y}{\\Delta}\\), \\(z=\\frac{\\Delta_z}{\\Delta}\\), or it is found by elimination. When the coefficients are random — dice, or a choice from a set — the probability of a unique solution is the share of choices with \\(\\Delta\\neq0\\).",
      definition:
        "- Cramer: \\(x=\\frac{\\Delta_x}{\\Delta}\\) and so on.\n" +
        "- Probability of a unique solution: \\(P(\\Delta\\neq0)\\).\n" +
        "- Count the choices with \\(\\Delta=0\\), then take the complement.",
      formula: {
        label: "Cramer's rule",
        latex: "x=\\frac{\\Delta_x}{\\Delta},\\ y=\\frac{\\Delta_y}{\\Delta},\\ z=\\frac{\\Delta_z}{\\Delta}\\quad(\\Delta\\neq0)",
      },
      authoredExample: {
        prompt: "Solve \\(x+y=3\\), \\(2x-y=0\\) by Cramer's rule.",
        steps: [
          "\\(\\Delta=-3\\), \\(\\Delta_x=\\begin{vmatrix}3&1\\\\0&-1\\end{vmatrix}=-3\\), \\(\\Delta_y=\\begin{vmatrix}1&3\\\\2&0\\end{vmatrix}=-6\\).",
        ],
        answer: "\\(x=1\\), \\(y=2\\).",
      },
      selfCheckExample: {
        prompt: "A die shows \\(k\\). Find the probability that \\(x+ky=1\\), \\(kx+4y=2\\) has a unique solution.",
        steps: [
          "\\(\\Delta=4-k^2=0\\) only for \\(k=2\\).",
        ],
        answer: "\\(\\frac56\\).",
      },
      practiceSet: [
        { prompt: "\\(\\Delta=2\\), \\(\\Delta_x=6\\): \\(x\\)?", answer: "\\(3\\)" },
        { prompt: "\\(x+y=2\\), \\(x-y=0\\)?", answer: "\\(x=y=1\\)" },
        { prompt: "Die value \\(k\\), \\(\\Delta=k-3\\): \\(P(\\text{unique})\\)?", answer: "\\(\\frac56\\)" },
        { prompt: "\\(\\Delta=0\\): does Cramer's rule apply?", answer: "No" },
      ],
      pyqExampleId: "64b5336f-db63-4516-ba47-44211476a587", // 2023 — the unique solution of a system
      traps: [
        {
          title: "Count ordered choices",
          body: "With two dice, the pairs \\((a,b)\\) and \\((b,a)\\) are different outcomes. Count the pairs making \\(\\Delta=0\\) as ordered pairs out of 36.",
        },
      ],
    },
  ],
};
