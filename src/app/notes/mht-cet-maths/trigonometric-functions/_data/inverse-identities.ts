import type { SubtopicNote } from "@/app/notes/_types";

export const INVERSE_IDENTITIES_NOTE: SubtopicNote = {
  subtopicName: "Inverse Trigonometric Identities — Sums, Substitution and Telescoping",
  title: "Inverse Trigonometric Identities — Complementary Pairs, the Addition Formula, Substitution and Telescoping",
  oneLineDefinition:
    "Sums of inverse trigonometric values collapse through four tools: complementary pairs that add to π/2, the arctan addition formula, a substitution that turns an algebraic argument into a single angle, and a telescoping split of each term into a difference.",
  whyItMatters:
    "30 PYQs, 63% of them HARD — the hardest page of the chapter. Fourteen are the addition formula (three-term sums, 2 tan⁻¹ forms, and the identity a + b + c = abc when three arctangents sum to π), eight are substitution simplifications, four telescope and four use a complementary pair. " +
    "Each tool has one signal in the stem, and seeing it first is the whole difficulty.",
  concepts: [
    // 1 — complementary pairs
    {
      kind: "formula" as const,
      slug: "cettf-complementary-pairs",
      name: "Complementary Pairs — sin⁻¹x + cos⁻¹x = π/2",
      intuition:
        "If an angle has sine \\(x\\), its complement has cosine \\(x\\). So \\(\\sin^{-1}x\\) and \\(\\cos^{-1}x\\) are complementary for every \\(x\\) in \\([-1, 1]\\), and any expression mixing the two for the same argument collapses to a constant.",
      definition:
        "- \\(\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}\\) \\((|x| \\le 1)\\), \\(\\tan^{-1}x + \\cot^{-1}x = \\frac{\\pi}{2}\\), \\(\\sec^{-1}x + \\csc^{-1}x = \\frac{\\pi}{2}\\) \\((|x| \\ge 1)\\).\n" +
        "- **Swap pairs**: \\(\\cos^{-1}x + \\sin^{-1}y = \\pi - (\\sin^{-1}x + \\cos^{-1}y)\\).\n" +
        "- **Reciprocals**: \\(\\cot^{-1}x = \\tan^{-1}\\frac1x\\) for \\(x > 0\\); \\(\\csc^{-1}x = \\sin^{-1}\\frac1x\\).\n" +
        "- \\(\\cot^{-1}u - \\tan^{-1}u = x\\) becomes \\(\\frac{\\pi}{2} - 2\\tan^{-1}u = x\\), so \\(\\sin x = \\cos(2\\tan^{-1}u) = \\dfrac{1 - u^2}{1 + u^2}\\). With \\(u = \\cos\\alpha\\) or \\(u = \\sqrt{\\cos\\alpha}\\) that becomes a half-angle expression.\n" +
        "- **Three cosines summing to \\(\\pi\\)**: if \\(\\cos^{-1}x + \\cos^{-1}y + \\cos^{-1}z = \\pi\\), then \\(x^2 + y^2 + z^2 + 2xyz = 1\\).",
      formula: {
        label: "The three complementary pairs",
        latex: "\\sin^{-1}x+\\cos^{-1}x=\\tan^{-1}x+\\cot^{-1}x=\\sec^{-1}x+\\csc^{-1}x=\\frac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "If \\(\\sin^{-1}x + \\cos^{-1}y = \\frac{2\\pi}{5}\\), find \\(\\cos^{-1}x + \\sin^{-1}y\\).",
        steps: [
          "Add the two expressions: \\((\\sin^{-1}x + \\cos^{-1}x) + (\\sin^{-1}y + \\cos^{-1}y) = \\pi\\).",
          "So the second is \\(\\pi - \\frac{2\\pi}{5}\\).",
        ],
        answer: "\\(\\dfrac{3\\pi}{5}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\cot^{-1}u - \\tan^{-1}u = x\\), express \\(\\sin x\\) in terms of \\(u\\).",
        steps: [
          "\\(x = \\frac{\\pi}{2} - 2\\tan^{-1}u\\).",
          "\\(\\sin x = \\cos(2\\tan^{-1}u)\\).",
        ],
        answer: "\\(\\dfrac{1 - u^2}{1 + u^2}\\)",
      },
      pyqExampleId: "bb16d478-ad2d-496f-a4eb-920ef7e7226b",
    },

    // 2 — arctan addition
    {
      kind: "formula" as const,
      slug: "cettf-arctan-addition",
      name: "The Addition Formula — tan⁻¹x ± tan⁻¹y, 2 tan⁻¹x and Three-Term Sums",
      intuition:
        "\\(\\tan^{-1}x + \\tan^{-1}y\\) is the angle whose tangent is \\(\\tan(\\alpha + \\beta)\\), which is the compound-angle formula with \\(x, y\\) in place of \\(\\tan\\alpha, \\tan\\beta\\). Chain it for three terms, and convert any sine or cosine term to a tangent first.",
      definition:
        "- \\(\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\dfrac{x + y}{1 - xy}\\) while \\(xy < 1\\); \\(\\tan^{-1}x - \\tan^{-1}y = \\tan^{-1}\\dfrac{x - y}{1 + xy}\\).\n" +
        "- \\(2\\tan^{-1}x = \\tan^{-1}\\dfrac{2x}{1 - x^2} = \\sin^{-1}\\dfrac{2x}{1 + x^2} = \\cos^{-1}\\dfrac{1 - x^2}{1 + x^2}\\) (for \\(0 \\le x \\le 1\\)).\n" +
        "- **Sine sums**: \\(\\sin^{-1}a + \\sin^{-1}b = \\sin^{-1}\\left(a\\sqrt{1 - b^2} + b\\sqrt{1 - a^2}\\right)\\). Or convert: \\(\\sin^{-1}\\frac45 = \\tan^{-1}\\frac43\\), \\(\\sin^{-1}\\frac{5}{13} = \\tan^{-1}\\frac{5}{12}\\), and their sum is \\(\\tan^{-1}\\frac{63}{16}\\), whose complement is \\(\\sin^{-1}\\frac{16}{65}\\).\n" +
        "- **Three arctangents summing to \\(\\pi\\)**: \\(a + b + c = abc\\). **Summing to \\(\\frac{\\pi}{2}\\)**: \\(ab + bc + ca = 1\\).\n" +
        "- **Difference of two inverse cosines**: \\(\\cos^{-1}x - \\cos^{-1}\\frac{y}{k} = \\alpha\\) leads (after taking cosines and squaring) to \\(k^2x^2 - 2kxy\\cos\\alpha + y^2 = k^2\\sin^2\\alpha\\).",
      formula: {
        label: "Addition formula",
        latex: "\\tan^{-1}x+\\tan^{-1}y=\\tan^{-1}\\frac{x+y}{1-xy}\\ (xy<1) \\qquad 2\\tan^{-1}x=\\tan^{-1}\\frac{2x}{1-x^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\tan^{-1}\\frac13 + \\tan^{-1}\\frac14 + \\tan^{-1}\\frac29\\).",
        steps: [
          "\\(\\tan^{-1}\\frac13 + \\tan^{-1}\\frac14 = \\tan^{-1}\\dfrac{\\frac{7}{12}}{\\frac{11}{12}} = \\tan^{-1}\\frac{7}{11}\\).",
          "\\(\\tan^{-1}\\frac{7}{11} + \\tan^{-1}\\frac29 = \\tan^{-1}\\dfrac{\\frac{85}{99}}{\\frac{85}{99}} = \\tan^{-1}1\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Express \\(2\\tan^{-1}\\frac13 + \\tan^{-1}\\frac17\\) as a single angle.",
        steps: [
          "\\(2\\tan^{-1}\\frac13 = \\tan^{-1}\\dfrac{2/3}{8/9} = \\tan^{-1}\\frac34\\).",
          "\\(\\tan^{-1}\\frac34 + \\tan^{-1}\\frac17 = \\tan^{-1}\\dfrac{25/28}{25/28}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\cot^{-1}7 + \\cot^{-1}8 + \\cot^{-1}18 = \\cot^{-1}x\\). Find \\(x\\).", answer: "3" },
        { prompt: "If \\(\\tan^{-1}a + \\tan^{-1}b + \\tan^{-1}c = \\pi\\), then?", answer: "\\(a + b + c = abc\\)" },
        { prompt: "\\(\\cos^{-1}\\frac{12}{13} + \\sin^{-1}\\frac35 = \\sin^{-1}P\\). Find \\(P\\).", answer: "\\(\\frac{56}{65}\\)" },
      ],
      pyqExampleId: "d9022ccc-208d-4b25-b51e-195b36555652",
      traps: [
        {
          title: "Forgetting the xy < 1 condition",
          body: "When \\(xy > 1\\) and \\(x, y > 0\\), the sum is \\(\\pi + \\tan^{-1}\\frac{x + y}{1 - xy}\\). The formula without the \\(\\pi\\) gives a negative angle for a sum of two positive ones — a sign that the condition was ignored.",
        },
      ],
    },

    // 3 — substitution
    {
      kind: "formula" as const,
      slug: "cettf-inverse-substitution",
      name: "Simplifying by Substitution — x = tan θ, cos θ or cos 2θ",
      intuition:
        "An argument like \\(\\frac{1 - x^2}{1 + x^2}\\) or \\(\\frac{\\sqrt{1 + x} - \\sqrt{1 - x}}{\\sqrt{1 + x} + \\sqrt{1 - x}}\\) is a trigonometric ratio in disguise. Choose the substitution that turns it into one ratio of one angle; the inverse then cancels, provided the angle is inside the principal range.",
      definition:
        "- **Signals and substitutions**: \\(1 + x^2\\) → \\(x = \\tan\\theta\\); \\(1 - x^2\\) → \\(x = \\sin\\theta\\) or \\(\\cos\\theta\\); \\(\\sqrt{1 \\pm x}\\) → \\(x = \\cos 2\\theta\\) (then \\(\\sqrt{1 + x} = \\sqrt2\\cos\\theta\\), \\(\\sqrt{1 - x} = \\sqrt2\\sin\\theta\\)).\n" +
        "- With \\(x = \\tan\\theta\\): \\(\\frac{2x}{1 + x^2} = \\sin 2\\theta\\), \\(\\frac{1 - x^2}{1 + x^2} = \\cos 2\\theta\\), \\(\\frac{2x}{1 - x^2} = \\tan 2\\theta\\), \\(\\frac{1 - x^2}{2x} = \\cot 2\\theta\\).\n" +
        "- \\(\\dfrac{\\cos\\theta + \\sin\\theta}{\\cos\\theta - \\sin\\theta} = \\tan\\left(\\frac{\\pi}{4} + \\theta\\right)\\); \\(\\sec x + \\tan x = \\tan\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)\\).\n" +
        "- \\(\\tan\\left(\\frac{\\pi}{4} + \\theta\\right) + \\tan\\left(\\frac{\\pi}{4} - \\theta\\right) = \\frac{2}{\\cos 2\\theta}\\).\n" +
        "- **Check the range**: \\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta\\) only for \\(0 \\le 2\\theta \\le \\pi\\); the stem's condition on \\(x\\) (such as \\(0 < x < 1\\)) is what guarantees it.",
      formula: {
        label: "The tan θ substitution",
        latex: "x=\\tan\\theta:\\quad \\frac{2x}{1+x^2}=\\sin2\\theta,\\quad \\frac{1-x^2}{1+x^2}=\\cos2\\theta,\\quad \\frac{2x}{1-x^2}=\\tan2\\theta",
      },
      authoredExample: {
        prompt: "Simplify \\(\\tan^{-1}\\dfrac{\\cos x}{1 - \\sin x}\\) for \\(-\\frac{\\pi}{2} < x < \\frac{\\pi}{2}\\).",
        steps: [
          "Write \\(\\cos x = \\cos^2\\frac{x}{2} - \\sin^2\\frac{x}{2}\\) and \\(1 - \\sin x = \\left(\\cos\\frac{x}{2} - \\sin\\frac{x}{2}\\right)^2\\).",
          "The ratio is \\(\\dfrac{\\cos\\frac{x}{2} + \\sin\\frac{x}{2}}{\\cos\\frac{x}{2} - \\sin\\frac{x}{2}} = \\tan\\left(\\frac{\\pi}{4} + \\frac{x}{2}\\right)\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4} + \\dfrac{x}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sin\\left[\\tan^{-1}\\frac{1 - x^2}{2x} + \\cos^{-1}\\frac{1 - x^2}{1 + x^2}\\right]\\) for \\(0 < x < 1\\).",
        steps: [
          "\\(x = \\tan\\theta\\): the first term is \\(\\tan^{-1}(\\cot 2\\theta) = \\frac{\\pi}{2} - 2\\theta\\), the second \\(2\\theta\\).",
          "Their sum is \\(\\frac{\\pi}{2}\\).",
        ],
        answer: "1",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}\\dfrac{\\sqrt{1+x} - \\sqrt{1-x}}{\\sqrt{1+x} + \\sqrt{1-x}} + \\frac12\\cos^{-1}x = ?\\)", answer: "\\(\\frac{\\pi}{4}\\)", method: "\\(x = \\cos 2\\theta\\) makes the first term \\(\\frac{\\pi}{4} - \\theta\\)." },
      ],
      pyqExampleId: "418b187a-b4e5-4455-8d56-e0f52d8697a5",
      traps: [
        {
          title: "Cancelling an inverse outside its range",
          body: "\\(\\tan^{-1}(\\tan 2\\theta) = 2\\theta\\) needs \\(-\\frac{\\pi}{4} < \\theta < \\frac{\\pi}{4}\\). If \\(x = \\tan\\theta > 1\\), the cancellation gives the wrong branch; read the stated range of \\(x\\) before cancelling.",
        },
      ],
    },

    // 4 — telescoping
    {
      kind: "formula" as const,
      slug: "cettf-telescoping",
      name: "Telescoping Sums of Inverse Tangents",
      intuition:
        "A long sum of inverse tangents always hides the subtraction formula backwards: each term is \\(\\tan^{-1}A - \\tan^{-1}B\\) where \\(A - B\\) is the numerator and \\(1 + AB\\) the denominator. Write each term that way and everything but the first and last cancels.",
      definition:
        "- **Split**: \\(\\tan^{-1}\\dfrac{A - B}{1 + AB} = \\tan^{-1}A - \\tan^{-1}B\\). Find \\(A\\) and \\(B\\) whose difference is the numerator and whose product is the denominator minus 1.\n" +
        "- \\(\\cot^{-1}(n^2 + n + 1) = \\tan^{-1}\\dfrac{1}{1 + n(n + 1)} = \\tan^{-1}(n + 1) - \\tan^{-1}n\\).\n" +
        "- \\(\\tan^{-1}\\dfrac{1}{2r^2} = \\tan^{-1}\\dfrac{2}{4r^2} = \\tan^{-1}(2r + 1) - \\tan^{-1}(2r - 1)\\).\n" +
        "- \\(\\tan^{-1}\\dfrac{2^{n-1}}{1 + 2^{2n-1}} = \\tan^{-1}2^n - \\tan^{-1}2^{n-1}\\); the infinite sum is \\(\\frac{\\pi}{2} - \\frac{\\pi}{4}\\).\n" +
        "- The last step is usually \\(\\tan(\\tan^{-1}P - \\tan^{-1}Q) = \\frac{P - Q}{1 + PQ}\\) or its cotangent.",
      formula: {
        label: "The split",
        latex: "\\tan^{-1}\\frac{A-B}{1+AB}=\\tan^{-1}A-\\tan^{-1}B",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\sum_{n=1}^{10}\\tan^{-1}\\dfrac{1}{n^2 + n + 1}\\).",
        steps: [
          "Each term is \\(\\tan^{-1}(n + 1) - \\tan^{-1}n\\).",
          "The sum telescopes to \\(\\tan^{-1}11 - \\tan^{-1}1\\).",
          "Its tangent is \\(\\frac{11 - 1}{1 + 11} = \\frac{5}{6}\\).",
        ],
        answer: "\\(\\tan^{-1}\\dfrac56\\)",
      },
      selfCheckExample: {
        prompt: "Split \\(\\tan^{-1}\\dfrac{1}{x^2 + 3x + 3}\\).",
        steps: ["Denominator \\(1 + (x + 1)(x + 2)\\), numerator \\((x + 2) - (x + 1)\\)."],
        answer: "\\(\\tan^{-1}(x + 2) - \\tan^{-1}(x + 1)\\)",
      },
      pyqExampleId: "da4c738f-f098-4c65-b694-e911ac3c5e22",
    },
  ],
  related: [
    { label: "Principal values and evaluation", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-inverse-values" },
    { label: "Inverse trigonometric equations", href: "/notes/mht-cet-maths/trigonometric-functions/cettf-inverse-equations" },
  ],
};
