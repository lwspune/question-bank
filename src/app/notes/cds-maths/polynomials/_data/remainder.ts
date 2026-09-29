import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_REMAINDER_NOTE: SubtopicNote = {
  subtopicName: "The Remainder Theorem",
  title: "The Remainder Theorem",
  oneLineDefinition:
    "The remainder when f(x) is divided by x − a is f(a); on division by a quadratic the remainder is linear and is fixed by its values at the two roots.",
  whyItMatters:
    "Fifteen PYQs, most EASY or MODERATE. Substituting one number replaces long division every time. The harder items divide by a quadratic — find the linear remainder from two values — or use the fact that xⁿ − aⁿ always has the factor x − a.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdspo-remainder-linear",
      name: "Remainder on division by a linear factor",
      intuition:
        "Write \\(f(x) = (x - a)q(x) + r\\). Putting \\(x = a\\) kills the first term, so the remainder is just \\(f(a)\\). For \\(ax - b\\) the root is \\(\\dfrac ba\\).",
      definition:
        "- Dividing by \\(x - a\\): remainder \\(f(a)\\). Dividing by \\(x + a\\): remainder \\(f(-a)\\). Dividing by \\(ax - b\\): remainder \\(f\\left(\\dfrac ba\\right)\\).\n" +
        "- A given remainder is one equation for an unknown coefficient.\n" +
        "- Equal remainders for \\(x - 1\\) and \\(x + 1\\): \\(f(1) = f(-1)\\), which kills every odd-power coefficient.\n" +
        "- The quotient comes from synthetic division, writing \\(0\\) for any missing power.",
      formula: {
        label: "Remainder theorem",
        latex: "f(x) \\div (x - a) \\;\\Rightarrow\\; \\text{remainder} = f(a)",
      },
      authoredExample: {
        prompt: "When \\(2x^3 - x^2 + kx + 4\\) is divided by \\(x - 2\\) the remainder is \\(18\\). Find \\(k\\).",
        steps: ["\\(f(2) = 16 - 4 + 2k + 4 = 16 + 2k = 18\\)."],
        answer: "\\(k = 1\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(x^4 + 2x^3 - 3x + 5\\) is divided by \\(x + 1\\).",
        steps: ["\\(f(-1) = 1 - 2 + 3 + 5\\)."],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "\\(x^3 - 4x + 1\\) divided by \\(x - 2\\): remainder?", answer: "\\(1\\)" },
        { prompt: "\\(f(x)\\) divided by \\(2x - 1\\): remainder?", answer: "\\(f\\left(\\dfrac12\\right)\\)" },
        { prompt: "\\(x^2 + ax + b\\): same remainder for \\(x \\pm 1\\). \\(a\\)?", answer: "\\(0\\)" },
        { prompt: "\\(x^3 - 3x^2y + 2y^3\\) divided by \\(x - y\\): remainder?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "e666ddf1-113e-44f2-b13c-d6c5e383f67b", // 2018 (I) — remainder −7 on division by x + 1
      traps: [
        {
          title: "x + a means substitute −a",
          body:
            "Dividing by \\(x + 3\\) leaves \\(f(-3)\\), not \\(f(3)\\). The wrong sign gives a remainder of the right size and wrong value, and it is usually printed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-remainder-quadratic",
      name: "Remainder on division by a quadratic",
      intuition:
        "Dividing by a quadratic leaves a remainder of degree at most one, \\(r(x) = px + q\\). The remainder agrees with \\(f\\) at the two roots of the divisor, which gives two equations for \\(p\\) and \\(q\\).",
      definition:
        "- \\(f(x) = (x - \\alpha)(x - \\beta)Q(x) + (px + q)\\), so \\(p\\alpha + q = f(\\alpha)\\) and \\(p\\beta + q = f(\\beta)\\).\n" +
        "- Dividing by \\(x^2 + 1\\): replace every \\(x^2\\) by \\(-1\\).\n" +
        "- A polynomial divisible by \\(x^2 + 1\\) and \\(x^4 + 1\\) has both as factors; look for the factorisation first.",
      formula: {
        label: "Linear remainder",
        latex: "r(x) = \\dfrac{(x - \\beta)f(\\alpha) - (x - \\alpha)f(\\beta)}{\\alpha - \\beta}",
      },
      authoredExample: {
        prompt: "\\(f(x)\\) leaves remainder \\(5\\) on division by \\(x - 2\\) and \\(-1\\) on division by \\(x + 1\\). Find the remainder on division by \\((x - 2)(x + 1)\\).",
        steps: ["Let \\(r = px + q\\): \\(2p + q = 5\\), \\(-p + q = -1\\).", "\\(3p = 6\\), \\(p = 2\\), \\(q = 1\\)."],
        answer: "\\(2x + 1\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(x^7\\) is divided by \\(x^2 + 1\\).",
        steps: ["\\(x^7 = x\\cdot(x^2)^3 \\to x\\cdot(-1)^3\\)."],
        answer: "\\(-x\\).",
      },
      practiceSet: [
        { prompt: "Remainder of \\(x^4\\) on division by \\(x^2 + 1\\)?", answer: "\\(1\\)" },
        { prompt: "Degree of a remainder on division by a quadratic?", answer: "At most \\(1\\)" },
        { prompt: "\\(f(0) = 3\\), \\(f(1) = 5\\). Remainder on division by \\(x(x - 1)\\)?", answer: "\\(2x + 3\\)" },
        { prompt: "Remainder of \\(x^5 + x\\) on division by \\(x^2 + 1\\)?", answer: "\\(2x\\)" },
      ],
      pyqExampleId: "7ee8216a-d440-4b74-a9db-1077a9a05b67", // 2025 (II) — remainders 2 and 1, divide by (x − 1)(x − 2)
      traps: [
        {
          title: "The remainder is not a number",
          body:
            "On division by a quadratic the remainder is usually a linear expression like \\(3 - x\\). An option that is a plain number fits only if the two values happen to be equal.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdspo-power-patterns",
      name: "Divisibility of xⁿ ± aⁿ",
      intuition:
        "Put \\(x = a\\) into \\(x^n - a^n\\) and you get zero for every \\(n\\), so \\(x - a\\) always divides it. Put \\(x = -a\\) into \\(x^n + a^n\\): the result is zero only when \\(n\\) is odd.",
      definition:
        "- \\(x - a\\) divides \\(x^n - a^n\\) for every natural \\(n\\).\n" +
        "- \\(x + a\\) divides \\(x^n - a^n\\) when \\(n\\) is even.\n" +
        "- \\(x + a\\) divides \\(x^n + a^n\\) when \\(n\\) is odd, never when \\(n\\) is even.\n" +
        "- \\(x^{2n} - y^{2n} = (x^n - y^n)(x^n + y^n)\\), so any expression 'difference of even powers plus a constant' leaves that constant as remainder.",
      formula: {
        label: "Factor of xⁿ − aⁿ",
        latex: "x^n - a^n = (x - a)\\left(x^{n - 1} + x^{n - 2}a + \\cdots + a^{n - 1}\\right)",
      },
      authoredExample: {
        prompt: "Which of \\(x^6 - 1\\), \\(x^6 + 1\\), \\(x^5 + 1\\) are divisible by \\(x + 1\\)?",
        steps: ["At \\(x = -1\\): \\(1 - 1 = 0\\); \\(1 + 1 = 2\\); \\(-1 + 1 = 0\\)."],
        answer: "\\(x^6 - 1\\) and \\(x^5 + 1\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(x^{10} - y^{10} + 7\\) is divided by \\(x^5 + y^5\\).",
        steps: ["\\(x^{10} - y^{10} = (x^5 - y^5)(x^5 + y^5)\\) divides exactly."],
        answer: "\\(7\\).",
      },
      practiceSet: [
        { prompt: "Is \\(x^7 - 1\\) divisible by \\(x - 1\\)?", answer: "Yes" },
        { prompt: "Is \\(x^4 + 16\\) divisible by \\(x + 2\\)?", answer: "No" },
        { prompt: "Is \\(x^3 + 8\\) divisible by \\(x + 2\\)?", answer: "Yes" },
        { prompt: "Is \\(x^4 - 16\\) divisible by \\(x + 2\\)?", answer: "Yes" },
      ],
      pyqExampleId: "397d25fc-5f04-42a9-a73c-3f0913db0fde", // 2020 (II) — xⁿ − aⁿ divisible by x − a for every n
      traps: [
        {
          title: "Even n and a plus sign",
          body:
            "\\(x^n + y^n\\) with \\(n\\) even is never divisible by \\(x + y\\): at \\(x = -y\\) it equals \\(2y^n\\). Knowing \\(n\\) is even therefore answers the question — with a 'no'.",
        },
      ],
    },
  ],
};
