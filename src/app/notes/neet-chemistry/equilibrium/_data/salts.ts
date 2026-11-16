import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_EQ_SALTS_NOTE: SubtopicNote = {
  subtopicName: "Salt Hydrolysis and Buffers",
  title: "Salt Hydrolysis and Buffers",
  oneLineDefinition:
    "Why salt solutions can be acidic, basic or neutral, the pH of a salt of a weak acid and a weak base, and buffer solutions with the Henderson equation.",
  whyItMatters:
    "Three NEET questions. One finds the pH of dimethylammonium acetate, a salt of a weak acid and a weak base (2021), and two find the pH of an acidic buffer: sodium acetate mixed with acetic acid (2022), and a buffer of HX and X⁻ in equal amounts given only the Kb of X⁻ (NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ncheq-hydrolysis",
      name: "Salt hydrolysis",
      intuition:
        "A salt's ions react with water only if they came from a weak partner. Acetate comes from a weak acid, so it takes a proton from water and leaves OH⁻: sodium acetate solution is basic. Ammonium comes from a weak base, so it gives a proton to water: ammonium chloride solution is acidic. Ions from a strong acid and a strong base leave water alone, so NaCl solution is neutral. When both ions come from weak partners, the stronger partner decides.",
      definition:
        "- **Strong acid + strong base** salt (NaCl): no hydrolysis, pH 7.\n" +
        "- **Weak acid + strong base** salt (\\(\\text{CH}_3\\text{COONa}\\)): the anion hydrolyses, so the solution is basic, pH above 7.\n" +
        "- **Strong acid + weak base** salt (\\(\\text{NH}_4\\text{Cl}\\)): the cation hydrolyses, so the solution is acidic, pH below 7.\n" +
        "- **Weak acid + weak base** salt (\\(\\text{CH}_3\\text{COONH}_4\\)): both ions hydrolyse and \\(\\text{pH} = 7 + \\dfrac{1}{2}(\\text{p}K_a - \\text{p}K_b)\\), with \\(\\text{p}K_a\\) of the weak acid and \\(\\text{p}K_b\\) of the weak base. This pH does not depend on the concentration.\n" +
        "- So the weak-weak salt is basic when \\(\\text{p}K_a > \\text{p}K_b\\) (the base is the stronger partner) and acidic when \\(\\text{p}K_a < \\text{p}K_b\\).",
      formula: {
        label: "Salt of a weak acid and a weak base",
        latex: "\\text{pH} = 7 + \\frac{1}{2}\\left(\\text{p}K_a - \\text{p}K_b\\right)",
        symbols: [
          { symbol: "\\(\\text{p}K_a\\)", meaning: "of the weak acid that formed the salt" },
          { symbol: "\\(\\text{p}K_b\\)", meaning: "of the weak base that formed the salt" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the pH of a solution of ammonium formate at 298 K. \\(\\text{p}K_a\\) of formic acid = 3.75 and \\(\\text{p}K_b\\) of ammonia = 4.75.",
        steps: [
          "Formic acid and ammonia are both weak, so use the weak-weak formula.",
          "\\(\\text{pH} = 7 + \\dfrac{1}{2}(3.75 - 4.75) = 7 - 0.5 = 6.5\\).",
          "The acid is the stronger partner (smaller \\(\\text{p}K_a\\)), so the solution is slightly acidic.",
        ],
        answer: "pH 6.5",
      },
      selfCheckExample: {
        prompt: "Is an aqueous solution of \\(\\text{NH}_4\\text{Cl}\\) acidic, basic or neutral? Why?",
        steps: [
          "\\(\\text{NH}_4\\text{Cl}\\) is the salt of a weak base (\\(\\text{NH}_3\\)) and a strong acid (HCl).",
          "\\(\\text{NH}_4^+\\) gives a proton to water, forming \\(\\text{H}_3\\text{O}^+\\).",
        ],
        answer: "Acidic: the ammonium ion hydrolyses and releases H₃O⁺",
      },
      practiceSet: [
        { prompt: "Is a solution of sodium acetate acidic, basic or neutral?", answer: "Basic" },
        { prompt: "Is a solution of KCN acidic, basic or neutral?", answer: "Basic: CN⁻ comes from the weak acid HCN" },
        { prompt: "What is the pH of NaCl solution at 298 K?", answer: "7" },
        { prompt: "A solution of ammonium acetate is diluted tenfold. What happens to its pH?", answer: "It stays the same: the weak-weak formula has no concentration term" },
      ],
      pyqExampleId: "26442b6c-da9e-4853-b9ea-506ce3583417",
      traps: [
        {
          title: "Mind the sign in the bracket",
          body: "In \\(\\text{pH} = 7 + \\dfrac{1}{2}(\\text{p}K_a - \\text{p}K_b)\\), the acid's \\(\\text{p}K_a\\) comes first. Swapping the two flips the answer to the other side of 7.",
        },
        {
          title: "A weak acid with a strong base is not neutral",
          body: "Sodium acetate solution is basic, not neutral, because acetate hydrolyses. Only a salt of a strong acid and a strong base gives pH 7.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ncheq-buffer",
      name: "Buffer solutions and the Henderson equation",
      intuition:
        "A buffer holds its pH steady when a little acid or base is added. It works because it holds both halves of a conjugate pair. The weak acid mops up any added OH⁻, and its conjugate base mops up any added H⁺. So the pH depends only on the acid's strength and on the ratio of the two halves.",
      definition:
        "- A **buffer** resists a change in pH when a small amount of acid or base is added, or when it is diluted.\n" +
        "- **Acidic buffer:** a weak acid and its salt with a strong base, such as \\(\\text{CH}_3\\text{COOH}\\) and \\(\\text{CH}_3\\text{COONa}\\).\n" +
        "- **Basic buffer:** a weak base and its salt with a strong acid, such as \\(\\text{NH}_4\\text{OH}\\) and \\(\\text{NH}_4\\text{Cl}\\).\n" +
        "- Henderson equation: \\(\\text{pH} = \\text{p}K_a + \\log\\dfrac{[\\text{salt}]}{[\\text{acid}]}\\) and \\(\\text{pOH} = \\text{p}K_b + \\log\\dfrac{[\\text{salt}]}{[\\text{base}]}\\).\n" +
        "- When the salt and acid are equal, \\(\\text{pH} = \\text{p}K_a\\).\n" +
        "- If only \\(K_b\\) of the conjugate base is given, first find \\(K_a = \\dfrac{K_w}{K_b}\\).\n" +
        "- Mixing equal volumes of the two solutions dilutes both equally, so their ratio is unchanged.",
      formula: {
        label: "Henderson equation",
        latex: "\\text{pH} = \\text{p}K_a + \\log\\frac{[\\text{salt}]}{[\\text{acid}]}, \\qquad \\text{pOH} = \\text{p}K_b + \\log\\frac{[\\text{salt}]}{[\\text{base}]}",
      },
      authoredExample: {
        prompt:
          "A buffer contains 0.2 M \\(\\text{NH}_3\\) and 0.02 M \\(\\text{NH}_4\\text{Cl}\\). \\(\\text{p}K_b\\) of \\(\\text{NH}_3\\) = 4.75. Find its pH at 298 K.",
        steps: [
          "It is a basic buffer, so find pOH first: \\(\\text{pOH} = 4.75 + \\log\\dfrac{0.02}{0.2}\\).",
          "\\(\\log 0.1 = -1\\), so \\(\\text{pOH} = 4.75 - 1 = 3.75\\).",
          "\\(\\text{pH} = 14 - 3.75 = 10.25\\).",
        ],
        answer: "pH 10.25",
      },
      selfCheckExample: {
        prompt:
          "A basic buffer has equal concentrations of \\(\\text{NH}_3\\) and \\(\\text{NH}_4^+\\), and \\(\\text{p}K_b = 4.75\\). Find its pOH and pH at 298 K.",
        steps: [
          "Equal concentrations: \\(\\log 1 = 0\\), so \\(\\text{pOH} = \\text{p}K_b = 4.75\\).",
          "\\(\\text{pH} = 14 - 4.75 = 9.25\\).",
        ],
        answer: "pOH 4.75, pH 9.25",
      },
      practiceSet: [
        { prompt: "Name a pair of substances that makes a basic buffer.", answer: "\\(\\text{NH}_4\\text{OH}\\) and \\(\\text{NH}_4\\text{Cl}\\)" },
        { prompt: "Is a mixture of HCl and NaCl a buffer?", answer: "No: HCl is a strong acid" },
        { prompt: "The conjugate base \\(\\text{A}^-\\) of a weak acid HA has \\(K_b = 10^{-9}\\) at 298 K. What is \\(\\text{p}K_a\\) of HA?", answer: "5" },
        { prompt: "What does a buffer solution do when a small amount of acid is added to it?", answer: "Its pH stays nearly the same" },
      ],
      pyqExampleId: "77839f3a-ee08-482d-8210-e7ca9094fa41",
      traps: [
        {
          title: "Salt over acid",
          body: "In the Henderson equation the salt (the conjugate base) goes on top and the acid below. Writing it the other way round puts the pH on the wrong side of \\(\\text{p}K_a\\).",
        },
        {
          title: "A basic buffer gives pOH first",
          body: "For a weak base with its salt, \\(\\text{p}K_b\\) and the log term give pOH. Subtract from 14 to get the pH.",
        },
        {
          title: "Kb of the conjugate base is not Ka",
          body: "When a question gives \\(K_b\\) of \\(\\text{X}^-\\), the acid's constant is \\(K_a = \\dfrac{K_w}{K_b}\\), not \\(K_b\\) itself.",
        },
      ],
    },
  ],
};
