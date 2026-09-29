import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_SI_FRACTIONS_NOTE: SubtopicNote = {
  subtopicName: "Fractions and Decimals",
  title: "Fractions and Decimals",
  oneLineDefinition:
    "Convert recurring decimals to fractions, compare fractions by cross-multiplying or by their distance from 1, and simplify decimals by spotting squares.",
  whyItMatters:
    "Eleven PYQs, almost all EASY or MODERATE. The recurring-decimal conversion is asked in some form nearly every other year; learn the one rule for it and these are free.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdssi-recurring-decimals",
      name: "Recurring decimals as fractions",
      intuition:
        "A repeating block of \\(n\\) digits becomes a denominator of \\(n\\) nines; each non-repeating digit after the point adds a zero. The numerator is the whole digit string minus the part that does not repeat.",
      definition:
        "- \\(0.\\overline{ab} = \\dfrac{ab}{99}\\), \\(0.\\overline{a} = \\dfrac a9\\).\n" +
        "- \\(0.a\\overline{b} = \\dfrac{ab - a}{90}\\); in general, numerator = (all digits) − (non-repeating digits), denominator = one \\(9\\) per repeating digit followed by one \\(0\\) per non-repeating digit.\n" +
        "- \\(0.\\overline{9} = 1\\).\n" +
        "- A fraction in lowest terms terminates exactly when its denominator has no prime factor other than \\(2\\) and \\(5\\).",
      formula: {
        label: "Mixed recurring decimal",
        latex: "0.a\\overline{b} = \\dfrac{\\overline{ab} - a}{90}",
      },
      authoredExample: {
        prompt: "Write \\(0.4\\overline{7}\\) and \\(0.\\overline{36}\\) as fractions.",
        steps: [
          "\\(0.4\\overline{7} = \\dfrac{47 - 4}{90} = \\dfrac{43}{90}\\).",
          "\\(0.\\overline{36} = \\dfrac{36}{99} = \\dfrac{4}{11}\\).",
        ],
        answer: "\\(\\dfrac{43}{90}\\) and \\(\\dfrac{4}{11}\\).",
      },
      selfCheckExample: {
        prompt: "Which of \\(\\dfrac{7}{40}\\), \\(\\dfrac{9}{24}\\), \\(\\dfrac{5}{14}\\) has a non-terminating decimal?",
        steps: ["\\(40 = 2^3\\cdot 5\\); \\(\\dfrac{9}{24} = \\dfrac38\\); \\(14 = 2\\cdot 7\\)."],
        answer: "\\(\\dfrac{5}{14}\\).",
      },
      practiceSet: [
        { prompt: "\\(0.\\overline{7}\\)?", answer: "\\(\\dfrac79\\)" },
        { prompt: "\\(0.1\\overline{6}\\)?", answer: "\\(\\dfrac16\\)" },
        { prompt: "\\(0.\\overline{12}\\)?", answer: "\\(\\dfrac{4}{33}\\)" },
        { prompt: "Does \\(\\dfrac{3}{80}\\) terminate?", answer: "Yes" },
      ],
      pyqExampleId: "8acb2f68-d967-46f4-9b01-97ceed904de1", // 2017 (II) — distance between 0.83̄ and 0.62̄
      traps: [
        {
          title: "Read where the bar starts",
          body:
            "\\(0.5\\overline{3}\\) repeats only the \\(3\\) (\\(= \\dfrac{48}{90}\\)); \\(0.\\overline{53}\\) repeats both digits (\\(= \\dfrac{53}{99}\\)). The same four symbols give two different numbers.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-comparing-fractions",
      name: "Comparing fractions and fractions of a whole",
      intuition:
        "Two fractions compare by cross-multiplying. For fractions just below \\(1\\), compare how far each is from \\(1\\): the smaller gap is the larger fraction.",
      definition:
        "- \\(\\dfrac ab > \\dfrac cd\\) (positive denominators) \\(\\iff ad > bc\\).\n" +
        "- \\(\\dfrac{n}{n + 1}\\) grows with \\(n\\): \\(\\dfrac34 < \\dfrac45 < \\dfrac56\\).\n" +
        "- Adding the same \\(k\\) to top and bottom of \\(\\dfrac ab\\) (\\(a < b\\)) raises it by \\(\\dfrac{k(b - a)}{b(b + k)}\\).\n" +
        "- 'A fraction of those who remain': take the fraction of the remainder, not of the original total.",
      formula: {
        label: "Cross-multiplication",
        latex: "\\dfrac ab > \\dfrac cd \\iff ad > bc \\quad (b, d > 0)",
      },
      authoredExample: {
        prompt: "Which is larger, \\(\\dfrac{5}{7}\\) or \\(\\dfrac{8}{11}\\)?",
        steps: ["Cross-multiply: \\(5\\times 11 = 55\\) and \\(8\\times 7 = 56\\)."],
        answer: "\\(\\dfrac{8}{11}\\).",
      },
      selfCheckExample: {
        prompt: "Of \\(1200\\) people, \\(\\dfrac14\\) left early; \\(\\dfrac23\\) of the rest stayed for dinner. How many stayed for dinner?",
        steps: ["\\(900\\) remained; \\(\\dfrac23\\times 900\\)."],
        answer: "\\(600\\).",
      },
      practiceSet: [
        { prompt: "Larger: \\(\\dfrac{4}{9}\\) or \\(\\dfrac{5}{11}\\)?", answer: "\\(\\dfrac{5}{11}\\)" },
        { prompt: "Largest of \\(\\dfrac23, \\dfrac34, \\dfrac45\\)?", answer: "\\(\\dfrac45\\)" },
        { prompt: "Minutes in \\(2\\) days?", answer: "\\(2880\\)" },
        { prompt: "Add \\(1\\) to top and bottom of \\(\\dfrac12\\). New value?", answer: "\\(\\dfrac23\\)" },
      ],
      pyqExampleId: "3fa0656d-7aed-4897-a2f8-6462cd26d7c4", // 2021 (I) — adding 3 to numerator and denominator
      traps: [
        {
          title: "The remainder, not the total",
          body:
            "'\\(\\dfrac{11}{20}\\) of those who appeared' is a fraction of the students left after the absentees, not of everyone registered.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdssi-decimal-simplification",
      name: "Simplifying decimal expressions",
      intuition:
        "Decimal expressions in the paper are built from squares and simple fractions in disguise. Write each decimal as a fraction or spot a square, and the arithmetic collapses.",
      definition:
        "- Convert: \\(0.064 = \\dfrac{64}{1000}\\), \\(6.25 = \\dfrac{25}{4}\\), \\(4.84 = 2.2^2\\).\n" +
        "- Spot \\(a^2 + 2a + 1 = (a + 1)^2\\) with decimals: \\(0.35^2 + 0.70 + 1 = 1.35^2\\).\n" +
        "- Under a square root, look for perfect squares in both numerator and denominator.",
      formula: {
        label: "Square of a sum",
        latex: "a^2 + 2ab + b^2 = (a + b)^2",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\dfrac{0.25^2 + 0.5 + 1}{1.25}\\).",
        steps: ["\\(0.5 = 2\\times 0.25\\), so the numerator is \\(1.25^2\\).", "Dividing by \\(1.25\\) leaves \\(1.25\\)."],
        answer: "\\(1.25\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\sqrt{\\dfrac{0.49\\times 0.16}{0.64}}\\).",
        steps: ["\\(\\sqrt{0.49}\\times\\sqrt{0.16}\\div\\sqrt{0.64} = 0.7\\times 0.4\\div 0.8\\)."],
        answer: "\\(0.35\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sqrt{0.0081}\\)?", answer: "\\(0.09\\)" },
        { prompt: "\\(1.1^2 - 0.9^2\\)?", answer: "\\(0.4\\)" },
        { prompt: "\\(\\sqrt{6.25}\\)?", answer: "\\(2.5\\)" },
        { prompt: "\\(0.2^2 + 0.4 + 1\\)?", answer: "\\(1.44\\)" },
      ],
      pyqExampleId: "30cd95e3-627c-4557-8e64-da17bf14e57f", // 2017 (I) — √((0.064 × 6.25)/(0.081 × 4.84))
      traps: [
        {
          title: "Count decimal places when you take a root",
          body:
            "\\(\\sqrt{0.0081} = 0.09\\), not \\(0.9\\): the root has half as many decimal places as the number.",
        },
      ],
    },
  ],
};
