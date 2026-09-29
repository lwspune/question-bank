import type { SubtopicNote } from "@/app/notes/_types";

export const COUNT_FN_NOTE: SubtopicNote = {
  subtopicName: "Counting Functions",
  title: "Counting Functions",
  oneLineDefinition:
    "Counting functions between finite sets: all functions, one-one functions, functions with conditions on some values, and onto functions by inclusion–exclusion.",
  whyItMatters:
    "Nineteen PYQs. Most count all functions or one-one functions, often after a condition fixes a few values; the rest count onto functions, which is the same as sharing distinct objects so that everyone gets at least one. Two ideas cover the page.",
  concepts: [
    // C1 — all and one-one
    {
      kind: "formula" as const,
      slug: "jfn-count-maps",
      name: "Counting all functions and one-one functions",
      intuition:
        "From an \\(m\\)-element set to an \\(n\\)-element set, each of the \\(m\\) elements chooses its image independently: \\(n^m\\) functions. For one-one, the choices shrink by one each time: \\(n(n-1)\\cdots(n-m+1)\\). With a condition, count the choices for the constrained elements first, then multiply by the free choices of the rest. Many-one means all minus one-one.",
      definition:
        "- All functions: \\(n^m\\).\n" +
        "- One-one: \\(\\frac{n!}{(n-m)!}\\) (none if \\(m>n\\)).\n" +
        "- Many-one: \\(n^m-\\frac{n!}{(n-m)!}\\).\n" +
        "- Conditions: (choices for the constrained elements) \\(\\times\\) (free choices).",
      formula: {
        label: "One-one functions",
        latex: "\\frac{n!}{(n-m)!}=n(n-1)\\cdots(n-m+1)",
      },
      authoredExample: {
        prompt: "How many one-one functions are there from \\(\\{1,2,3\\}\\) to \\(\\{a,b,c,d,e\\}\\)?",
        steps: [
          "\\(5\\cdot4\\cdot3\\).",
        ],
        answer: "\\(60\\).",
      },
      selfCheckExample: {
        prompt: "How many functions \\(f:\\{1,2,3,4\\}\\to\\{1,\\dots,5\\}\\) have \\(f(1)<f(2)\\)?",
        steps: [
          "Choose the two values for \\(f(1)<f(2)\\): \\(\\binom52=10\\). \\(f(3),f(4)\\) free: \\(25\\).",
        ],
        answer: "\\(250\\).",
      },
      practiceSet: [
        { prompt: "Functions from a 3-element set to a 2-element set?", answer: "\\(8\\)" },
        { prompt: "One-one functions from a 3-element set to itself?", answer: "\\(6\\)" },
        { prompt: "Many-one functions from a 3-element set to itself?", answer: "\\(21\\)" },
        { prompt: "Functions \\(\\{1,2,3\\}\\to\\{1,2,3\\}\\) with \\(f(1)=1\\)?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "282a2317-d9df-47d5-98fb-6da71a1f9444", // 2024 — one-one maps from the solutions of 2x + 3y = 23
      traps: [
        {
          title: "More inputs than outputs",
          body: "A one-one function needs at least as many outputs as inputs. From a larger set to a smaller one there are none.",
        },
      ],
    },

    // C2 — onto
    {
      kind: "formula" as const,
      slug: "jfn-count-onto",
      name: "Counting onto functions",
      intuition:
        "Count all functions, then remove those that miss some output, by inclusion–exclusion: subtract those missing one named output, add back those missing two, and so on. For two outputs this is \\(2^m-2\\); for three it is \\(3^m-3\\cdot2^m+3\\). Giving \\(m\\) distinct objects to \\(n\\) people so that each gets at least one is the same count.",
      definition:
        "- Onto: \\(\\sum_{j=0}^{n}(-1)^j\\binom nj(n-j)^m\\).\n" +
        "- \\(n=2\\): \\(2^m-2\\). \\(n=3\\): \\(3^m-3\\cdot2^m+3\\).\n" +
        "- None if \\(m<n\\). Not onto = all − onto.",
      formula: {
        label: "Onto functions",
        latex: "n^m-\\binom n1(n-1)^m+\\binom n2(n-2)^m-\\cdots",
      },
      authoredExample: {
        prompt: "How many onto functions are there from a 5-element set to a 3-element set?",
        steps: [
          "\\(3^5-3\\cdot2^5+3=243-96+3\\).",
        ],
        answer: "\\(150\\).",
      },
      selfCheckExample: {
        prompt: "How many onto functions are there from a 4-element set to a 2-element set?",
        steps: [
          "\\(2^4-2\\).",
        ],
        answer: "\\(14\\).",
      },
      practiceSet: [
        { prompt: "Onto functions from a 3-element set to a 3-element set?", answer: "\\(6\\)" },
        { prompt: "Onto functions from a 6-element set to a 2-element set?", answer: "\\(62\\)" },
        { prompt: "5 distinct pens to 2 children, each at least one?", answer: "\\(30\\)" },
        { prompt: "Onto functions from a 2-element set to a 3-element set?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "705577d2-b748-497f-9b8e-fc52c067fd0d", // 2026 — functions {1,2,3,4} -> {a,b,c} that are not onto
      traps: [
        {
          title: "Add back the double-counted",
          body: "Subtracting 'misses \\(a\\)' and 'misses \\(b\\)' removes the functions that miss both twice. The \\(+\\binom n2(n-2)^m\\) term puts them back.",
        },
      ],
    },
  ],
};
