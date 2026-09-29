import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_NESTED_NOTE: SubtopicNote = {
  subtopicName: "Continued Fractions and Nested Radicals",
  title: "Continued Fractions and Nested Radicals",
  oneLineDefinition:
    "A finite continued fraction is evaluated from the bottom up and decomposed by repeatedly splitting off whole parts; an infinite nest equals itself, which gives a quadratic.",
  whyItMatters:
    "Twelve PYQs. The finite continued fractions are pure bookkeeping — invert, take the whole part, repeat — and the infinite nested radicals all fall to one move: call the value x and notice that x sits inside itself.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-continued-fractions",
      name: "Continued fractions",
      intuition:
        "Evaluating \\(a + \\cfrac{1}{b + \\cfrac{1}{c}}\\) runs from the bottom up. Decomposing a fraction runs the other way: the whole part of the fraction is \\(a\\); invert what is left and repeat.",
      definition:
        "- Evaluate from the innermost level outward.\n" +
        "- Decompose \\(\\dfrac pq\\): write \\(\\dfrac pq = a + \\dfrac rq\\) with \\(0 \\le r < q\\), then continue with \\(\\dfrac qr\\).\n" +
        "- If a fraction \\(\\dfrac{1}{a + \\cdots}\\) is given, first invert it.\n" +
        "- A repeating continued fraction with \\(x\\) at the bottom is a fixed-point equation: solve \\(x = f(x)\\) and use the stated range.",
      formula: {
        label: "One step of the decomposition",
        latex: "\\dfrac pq = a + \\cfrac{1}{\\;q/r\\;}, \\quad a = \\left\\lfloor \\tfrac pq \\right\\rfloor",
      },
      authoredExample: {
        prompt: "Write \\(\\dfrac{43}{30}\\) as \\(a + \\cfrac{1}{b + \\cfrac{1}{c + \\cfrac1d}}\\) with natural numbers, and find \\(a + b + c + d\\).",
        steps: [
          "\\(\\dfrac{43}{30} = 1 + \\dfrac{13}{30}\\); \\(\\dfrac{30}{13} = 2 + \\dfrac{4}{13}\\); \\(\\dfrac{13}{4} = 3 + \\dfrac14\\).",
          "So \\(a, b, c, d = 1, 2, 3, 4\\).",
        ],
        answer: "\\(10\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(1 + \\cfrac{1}{2 + \\cfrac{1}{2 + \\cfrac12}}\\).",
        steps: ["\\(2 + \\dfrac12 = \\dfrac52\\); \\(2 + \\dfrac25 = \\dfrac{12}{5}\\); \\(1 + \\dfrac{5}{12}\\)."],
        answer: "\\(\\dfrac{17}{12}\\).",
      },
      practiceSet: [
        { prompt: "\\(1 + \\cfrac{1}{1 + \\cfrac11}\\)?", answer: "\\(\\dfrac32\\)" },
        { prompt: "Whole part of \\(\\dfrac{47}{13}\\)?", answer: "\\(3\\)" },
        { prompt: "\\(2 + \\cfrac{1}{3}\\) inverted?", answer: "\\(\\dfrac37\\)" },
        { prompt: "\\(x = \\dfrac{6}{5 - x}\\), \\(x > 2\\). \\(x\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "69f8eff0-3ffd-4003-8ef8-f91f82d6fce0", // 2019 (I) — 36/11 as a continued fraction
      traps: [
        {
          title: "Invert before splitting",
          body:
            "If the given value is \\(\\dfrac{1}{a + \\cdots} = \\dfrac{16}{23}\\), the first whole part comes from \\(\\dfrac{23}{16}\\), not from \\(\\dfrac{16}{23}\\) (whose whole part is \\(0\\)).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-nested-radicals",
      name: "Infinite nested radicals",
      intuition:
        "An infinite nest looks the same after you peel off the outer layer. So if \\(x = \\sqrt{a + \\sqrt{a + \\cdots}}\\), then \\(x = \\sqrt{a + x}\\), a quadratic. The value is the positive root.",
      definition:
        "- \\(x = \\sqrt{a + \\sqrt{a + \\cdots}}\\) gives \\(x^2 = a + x\\); take the positive root.\n" +
        "- \\(x = \\sqrt{a\\sqrt{a\\sqrt{a\\cdots}}}\\) gives \\(x^2 = ax\\), so \\(x = a\\).\n" +
        "- Read where the nest starts: \\(2 + \\sqrt{2 + \\sqrt{\\cdots}}\\) has a \\(2\\) OUTSIDE the first root.",
      formula: {
        label: "Self-similar nest",
        latex: "x = \\sqrt{a + x} \\;\\Rightarrow\\; x^2 - x - a = 0",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\sqrt{12 + \\sqrt{12 + \\sqrt{12 + \\cdots}}}\\).",
        steps: ["\\(x^2 = 12 + x\\), so \\(x^2 - x - 12 = (x - 4)(x + 3) = 0\\)."],
        answer: "\\(4\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\sqrt{3\\sqrt{3\\sqrt{3\\cdots}}}\\).",
        steps: ["\\(x = \\sqrt{3x}\\), so \\(x^2 = 3x\\) and \\(x = 3\\)."],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sqrt{6 + \\sqrt{6 + \\cdots}}\\)?", answer: "\\(3\\)" },
        { prompt: "\\(\\sqrt{30 + \\sqrt{30 + \\cdots}}\\)?", answer: "\\(6\\)" },
        { prompt: "\\(\\sqrt{5\\sqrt{5\\sqrt{5\\cdots}}}\\)?", answer: "\\(5\\)" },
        { prompt: "\\(1 + \\sqrt{6 + \\sqrt{6 + \\cdots}}\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "874b877a-cbd6-4a50-997f-daa78a5a5201", // 2022 (II) — x² − 20 = √(20 + √(20 + ...))
      traps: [
        {
          title: "Drop the negative root",
          body:
            "\\(x^2 - x - 12 = 0\\) has roots \\(4\\) and \\(-3\\); a square root is never negative, so the value is \\(4\\). Likewise \\(x^2 = 4x\\) gives \\(x = 4\\), not \\(0\\).",
        },
      ],
    },
  ],
};
