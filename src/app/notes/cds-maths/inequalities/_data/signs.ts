import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_IQ_SIGNS_NOTE: SubtopicNote = {
  subtopicName: "Signs, Powers and Comparisons",
  title: "Signs, Powers and Comparisons",
  oneLineDefinition:
    "Many inequality questions need only signs: an even power is never negative, an odd power keeps the sign, and x + 1/x ≥ 2 for every positive x.",
  whyItMatters:
    "Eight PYQs, two of them HARD, mostly data-sufficiency items. Read each statement for what it forces about signs — x⁸y⁹ < 0 forces y < 0 but says nothing about x — and test borderline values (a negative n, r between 1 and 1.26) before calling a statement sufficient.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsiq-signs",
      name: "What a statement forces about signs",
      intuition:
        "An even power hides the sign of its base; an odd power shows it. So a sign condition on a product of powers tells you only about the bases raised to odd powers.",
      definition:
        "- \\(x^{2k} \\ge 0\\) always; \\(x^{2k+1}\\) has the sign of \\(x\\).\n" +
        "- \\(\\dfrac mn > 1\\) gives \\(m > n\\) only when \\(n > 0\\); for \\(n < 0\\) it gives \\(m < n\\).\n" +
        "- \\(|r| < 1\\) makes \\(|r^n| < 1\\) for every natural \\(n\\); \\(r\\) just above \\(1\\) makes \\(r^n\\) grow.\n" +
        "- For \\(x < 0\\): \\(2x < x < -x\\), and \\(kx < 0\\) for every natural \\(k\\).\n" +
        "- To show a statement is NOT sufficient, find two cases that fit it with different answers.",
      formula: {
        label: "Odd and even powers",
        latex: "x^{2k} \\ge 0, \\qquad \\operatorname{sign}\\!\\left(x^{2k+1}\\right) = \\operatorname{sign}(x)",
      },
      authoredExample: {
        prompt: "Is \\(ab < 0\\)? (I) \\(a^4b^5 > 0\\). (II) \\(a^3b^6 < 0\\).",
        steps: ["(I) forces \\(b > 0\\) only. (II) forces \\(a < 0\\) only.", "Together: \\(a < 0 < b\\), so \\(ab < 0\\)."],
        answer: "Both together are needed; neither alone is enough.",
      },
      selfCheckExample: {
        prompt: "Is \\(r^n < 1\\) for every natural \\(n\\), given only \\(0 < r < 1.5\\)?",
        steps: ["\\(r = 0.5\\) says yes; \\(r = 1.2\\), \\(n = 5\\) gives \\(2.49\\)."],
        answer: "Not determined.",
      },
      practiceSet: [
        { prompt: "\\(x^6y^3 < 0\\). Sign of \\(y\\)?", answer: "Negative" },
        { prompt: "\\(x^6y^3 < 0\\). Sign of \\(x\\)?", answer: "Unknown (non-zero)" },
        { prompt: "\\(n = -2\\), \\(m = -3\\): is \\(\\dfrac mn > 1\\)? Is \\(m > n\\)?", answer: "Yes; no" },
        { prompt: "\\(x = -\\tfrac12\\): sign of \\(x^2 + x\\)?", answer: "Negative" },
      ],
      pyqExampleId: "8d9f8ae8-618d-406f-9790-b1013bc14efd", // 2022 (II) — is xy > 0, given x^8 y^9 < 0 and x^9 y^10 < 0
      traps: [
        {
          title: "Dividing by an unknown sign",
          body:
            "\\(\\dfrac mn > 1\\) does not mean \\(m > n\\) unless \\(n\\) is positive. With \\(n = -2\\) and \\(m = -3\\) the ratio exceeds \\(1\\) but \\(m < n\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsiq-amgm",
      name: "x + 1/x and comparing expressions",
      intuition:
        "For positive numbers, the arithmetic mean is never below the geometric mean. Applied to \\(x\\) and \\(\\tfrac1x\\), whose product is \\(1\\), that gives \\(x + \\tfrac1x \\ge 2\\).",
      definition:
        "- \\(x > 0 \\Rightarrow x + \\dfrac1x \\ge 2\\), with equality only at \\(x = 1\\).\n" +
        "- To compare two expressions, look at their difference (or ratio) and factorise it.\n" +
        "- \\((a^3 + b^3)(a + b) - (a^2 + b^2)^2 = ab(a - b)^2 \\ge 0\\) for positive \\(a, b\\).\n" +
        "- A statement saying 'only when \\(a > b\\)' is false if it also holds when \\(b > a\\).",
      formula: {
        label: "AM–GM for x and 1/x",
        latex: "x + \\dfrac{1}{x} \\ge 2 \\quad (x > 0)",
      },
      authoredExample: {
        prompt: "For positive \\(x\\), is \\(\\left(x + \\dfrac1x\\right)^3 > 7\\) always?",
        steps: ["\\(x + \\tfrac1x \\ge 2\\), so the cube is at least \\(8\\)."],
        answer: "Yes.",
      },
      selfCheckExample: {
        prompt: "What is the least value of \\(x + \\dfrac{9}{x}\\) for \\(x > 0\\)?",
        steps: ["AM \\(\\ge\\) GM: \\(x + \\tfrac9x \\ge 2\\sqrt{9}\\)."],
        answer: "\\(6\\), at \\(x = 3\\).",
      },
      practiceSet: [
        { prompt: "Least \\(x + \\tfrac1x\\), \\(x > 0\\)?", answer: "\\(2\\)" },
        { prompt: "Least \\(4x + \\tfrac1x\\), \\(x > 0\\)?", answer: "\\(4\\)" },
        { prompt: "Is \\(\\left(x + \\tfrac1x\\right)^2 > 3\\) for all \\(x > 0\\)?", answer: "Yes" },
        { prompt: "Sign of \\(ab(a - b)^2\\) for positive \\(a \\ne b\\)?", answer: "Positive" },
      ],
      pyqExampleId: "3a7b73a0-70a2-4f1f-95f8-3df0f2e3bacb", // 2025 (II) — x + 1/x > 1, its square > 2, its fourth power > 9
      traps: [
        {
          title: "'Only when' is a claim too",
          body:
            "An inequality that holds for every pair of unequal positive numbers does not hold 'only when \\(a > b\\)'. The word 'only' makes the statement false.",
        },
      ],
    },
  ],
};
