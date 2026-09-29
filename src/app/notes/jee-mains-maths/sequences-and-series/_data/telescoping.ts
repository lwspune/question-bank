import type { SubtopicNote } from "@/app/notes/_types";

export const TELESCOPING_SEQ_NOTE: SubtopicNote = {
  subtopicName: "Telescoping Sums",
  title: "Telescoping Sums",
  oneLineDefinition:
    "Sums where each term splits as a difference f(k) − f(k + 1), so almost everything cancels: partial fractions over an AP, quartic denominators, surds, and factorial terms.",
  whyItMatters:
    "Thirty PYQs. The task is always the same: write the kth term as a difference of two consecutive values of some expression. The skill is seeing which expression. Partial fractions cover half; quartic denominators and surds a third; factorials and functions the rest.",
  concepts: [
    // C1 — partial fractions
    {
      kind: "formula" as const,
      slug: "jseq-tele-partial",
      name: "Partial fractions that cancel in pairs",
      intuition:
        "If each term is \\(f(k)-f(k+1)\\), the sum from 1 to \\(n\\) collapses to \\(f(1)-f(n+1)\\). For consecutive AP terms, \\(\\frac1{a_ka_{k+1}}=\\frac1d\\left(\\frac1{a_k}-\\frac1{a_{k+1}}\\right)\\). For three factors, \\(\\frac1{k(k+1)(k+2)}=\\frac12\\left[\\frac1{k(k+1)}-\\frac1{(k+1)(k+2)}\\right]\\): the ½ is the gap between the outer factors.",
      definition:
        "- \\(\\sum_{k=1}^n[f(k)-f(k+1)]=f(1)-f(n+1)\\).\n" +
        "- \\(\\frac1{a_ka_{k+1}}=\\frac1d\\left(\\frac1{a_k}-\\frac1{a_{k+1}}\\right)\\) for an AP with difference \\(d\\).\n" +
        "- \\(\\frac1{k(k+1)(k+2)}=\\frac12\\left[\\frac1{k(k+1)}-\\frac1{(k+1)(k+2)}\\right]\\).\n" +
        "- \\(\\frac1{k(k+2)}=\\frac12\\left(\\frac1k-\\frac1{k+2}\\right)\\): two terms survive at each end.",
      formula: {
        label: "Telescoping",
        latex: "\\sum_{k=1}^{n}\\big[f(k)-f(k+1)\\big]=f(1)-f(n+1)",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{k=1}^{20}\\frac{1}{k(k+1)}\\).",
        steps: [
          "\\(\\frac1{k(k+1)}=\\frac1k-\\frac1{k+1}\\), so the sum is \\(1-\\frac1{21}\\).",
        ],
        answer: "\\(\\frac{20}{21}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{k=1}^{10}\\frac{1}{(2k-1)(2k+1)}\\).",
        steps: [
          "\\(d=2\\): \\(\\frac12\\left(1-\\frac1{21}\\right)\\).",
        ],
        answer: "\\(\\frac{10}{21}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k=1}^{\\infty}\\frac1{k(k+1)}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\frac1{3\\cdot7}+\\frac1{7\\cdot11}+\\dots+\\frac1{39\\cdot43}\\)?", answer: "\\(\\frac{10}{129}\\)" },
        { prompt: "\\(\\sum_{k=1}^{\\infty}\\frac1{k(k+2)}\\)?", answer: "\\(\\frac34\\)" },
        { prompt: "The factor in front when splitting \\(\\frac1{k(k+1)(k+2)}\\)?", answer: "\\(\\frac12\\)" },
      ],
      pyqExampleId: "84578849-5c59-4952-9d6d-887db2db62bd", // 2026 — sum of 528/(n(n+1)(n+2)) from 1 to 10
      traps: [
        {
          title: "A gap of two leaves two terms at each end",
          body: "In \\(\\frac12\\left(\\frac1k-\\frac1{k+2}\\right)\\) the first two positive terms and the last two negative terms survive, not one of each.",
        },
      ],
    },

    // C2 — quartics and surds
    {
      kind: "formula" as const,
      slug: "jseq-tele-quartic",
      name: "Quartic denominators and surds",
      intuition:
        "\\(k^4+k^2+1=(k^2-k+1)(k^2+k+1)\\), and the two factors differ by \\(2k\\). So \\(\\frac{k}{k^4+k^2+1}=\\frac12\\left[\\frac1{k^2-k+1}-\\frac1{k^2+k+1}\\right]\\), and since \\(k^2+k+1\\) at \\(k\\) equals \\(k^2-k+1\\) at \\(k+1\\), it telescopes. The same trick handles \\(4k^4+1=(2k^2-2k+1)(2k^2+2k+1)\\). For \\(\\frac1{\\sqrt a+\\sqrt b}\\), rationalise to \\(\\frac{\\sqrt b-\\sqrt a}{b-a}\\); along an AP every denominator is \\(d\\).",
      definition:
        "- \\(k^4+k^2+1=(k^2-k+1)(k^2+k+1)\\).\n" +
        "- \\(4k^4+1=(2k^2-2k+1)(2k^2+2k+1)\\).\n" +
        "- \\(\\frac1{\\sqrt{a_k}+\\sqrt{a_{k+1}}}=\\frac{\\sqrt{a_{k+1}}-\\sqrt{a_k}}{d}\\) for an AP.",
      formula: {
        label: "Quartic split",
        latex: "\\frac{k}{k^4+k^2+1}=\\frac12\\left[\\frac{1}{k^2-k+1}-\\frac{1}{k^2+k+1}\\right]",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{k=1}^{5}\\frac{k}{k^4+k^2+1}\\).",
        steps: [
          "It telescopes to \\(\\frac12\\left(\\frac11-\\frac1{31}\\right)\\).",
        ],
        answer: "\\(\\frac{15}{31}\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\frac1{\\sqrt1+\\sqrt2}+\\frac1{\\sqrt2+\\sqrt3}+\\dots+\\frac1{\\sqrt{24}+\\sqrt{25}}\\).",
        steps: [
          "Each term is \\(\\sqrt{k+1}-\\sqrt k\\): the sum is \\(\\sqrt{25}-\\sqrt1\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "\\(k^4+k^2+1\\) at \\(k=2\\), factored?", answer: "\\(21=3\\cdot7\\)" },
        { prompt: "\\(k^2+k+1\\) at \\(k=3\\) equals \\(k^2-k+1\\) at \\(k=\\)?", answer: "\\(4\\) (both 13)" },
        { prompt: "\\(\\sum_{k=1}^{\\infty}\\frac{k}{k^4+k^2+1}\\)?", answer: "\\(\\frac12\\)" },
        { prompt: "\\(\\frac1{\\sqrt2+\\sqrt5}+\\frac1{\\sqrt5+\\sqrt8}+\\dots+\\frac1{\\sqrt{29}+\\sqrt{32}}\\)?", answer: "\\(\\sqrt2\\)" },
      ],
      pyqExampleId: "bee9d0f0-e989-4a5c-bd6f-6fd9f781daf8", // 2023 — sum to 10 terms of n/(1 + n^2 + n^4)
      traps: [
        {
          title: "Keep the ½",
          body: "The two factors differ by \\(2k\\), not \\(k\\), so the split carries a factor \\(\\frac12\\). Dropping it doubles the answer, and the doubled value is usually an option.",
        },
      ],
    },

    // C3 — factorials, powers, functions
    {
      kind: "formula" as const,
      slug: "jseq-tele-other",
      name: "Factorials, powers and functions that telescope",
      intuition:
        "\\(k\\cdot k!=(k+1)!-k!\\) and \\(\\frac{k}{(k+1)!}=\\frac1{k!}-\\frac1{(k+1)!}\\). More generally \\(r!\\,P(r)\\) telescopes when \\(P(r)=(r+1)Q(r+1)-Q(r)\\) for a polynomial \\(Q\\) one degree lower; match coefficients to find \\(Q\\). Powers: \\(\\frac1{y-1}-\\frac2{y^2-1}=\\frac1{y+1}\\) makes \\(\\frac{2^k}{x^{2^k}+1}\\) telescope. A relation like \\(f(2x)-f(x)=x\\) chains down: \\(f(x)-f\\left(\\frac x{2^n}\\right)\\) is a finite GP.",
      definition:
        "- \\(k\\cdot k!=(k+1)!-k!\\); \\(\\frac k{(k+1)!}=\\frac1{k!}-\\frac1{(k+1)!}\\).\n" +
        "- \\(r!\\,P(r)=(r+1)!\\,Q(r+1)-r!\\,Q(r)\\) when \\(P(r)=(r+1)Q(r+1)-Q(r)\\).\n" +
        "- \\(\\frac{2^k}{x^{2^k}+1}=\\frac{2^k}{x^{2^k}-1}-\\frac{2^{k+1}}{x^{2^{k+1}}-1}\\).",
      formula: {
        label: "Factorial telescoping",
        latex: "k\\cdot k!=(k+1)!-k!",
      },
      authoredExample: {
        prompt: "Find \\(\\sum_{k=1}^{6}k\\cdot k!\\).",
        steps: [
          "It telescopes to \\(7!-1!\\).",
        ],
        answer: "\\(5039\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sum_{k=1}^{5}\\frac{k}{(k+1)!}\\).",
        steps: [
          "It telescopes to \\(\\frac1{1!}-\\frac1{6!}\\).",
        ],
        answer: "\\(\\frac{719}{720}\\).",
      },
      practiceSet: [
        { prompt: "\\(1\\cdot1!+2\\cdot2!+3\\cdot3!\\)?", answer: "\\(23\\)" },
        { prompt: "\\(\\sum_{k=1}^{\\infty}\\frac{k}{(k+1)!}\\)?", answer: "\\(1\\)" },
        { prompt: "\\(\\sum_{k=1}^{n}\\big[(k+1)^3-k^3\\big]\\)?", answer: "\\((n+1)^3-1\\)" },
        { prompt: "\\(f(2x)-f(x)=x\\). Then \\(f(x)-f\\left(\\frac x{2^n}\\right)\\)?", answer: "\\(x\\left(1-\\frac1{2^n}\\right)\\)" },
      ],
      pyqExampleId: "0c11cc12-09ff-41f5-813d-5bc2f3b8701c", // 2021 — sum of r!(r^3 + 6r^2 + 2r + 5) = alpha(11!)
      traps: [
        {
          title: "The leftover at the lower limit",
          body: "The sum is \\(Q(n+1)(n+1)!-Q(1)\\cdot1!\\). \\(Q(1)\\) is often zero, but not always: work it out before dropping it.",
        },
      ],
    },
  ],
};
