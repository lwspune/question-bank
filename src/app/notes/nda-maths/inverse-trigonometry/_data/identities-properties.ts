import type { SubtopicNote } from "@/app/notes/_types";

export const IDENTITIES_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Identities, Properties, and Sum-Difference Formulas",
  title: "Identities, Properties & Sum-Difference Formulas",
  oneLineDefinition:
    "Inverse trig functions each return an angle in a fixed principal range, obey a handful of odd/even and complementary identities, and combine through the tan⁻¹a ± tan⁻¹b sum formula.",
  whyItMatters:
    "The chapter's largest pocket (17 PYQs). Almost every question is an identity in disguise: the complementary rule (sin⁻¹x + cos⁻¹x = π/2) and the tan⁻¹ sum formula crack the majority. Get the principal range right and the rest is substitution.",
  concepts: [
    // FOUNDATION — principal values (viz)
    {
      kind: "formula" as const,
      slug: "it-principal-values",
      name: "Principal Values & Basic Properties",
      pyqExampleId: "cede697a-4c77-42f0-b9f2-e1dc14bbfc4f",
      intuition:
        "Sine, cosine, and tangent each hit every value infinitely often, so to invert them we pick ONE branch — the principal range. Every inverse-trig answer must land in its range, and the odd/even rules tell you how a negative input shifts the result.",
      definition:
        "**Principal-value ranges:**\n" +
        "- \\(\\sin^{-1}x \\in \\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right]\\), \\(\\cos^{-1}x \\in [0, \\pi]\\) (for \\(-1 \\le x \\le 1\\)).\n" +
        "- \\(\\tan^{-1}x \\in \\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)\\), \\(\\cot^{-1}x \\in (0, \\pi)\\) (for all real \\(x\\)).\n" +
        "**Sign rules:** \\(\\sin^{-1}(-x) = -\\sin^{-1}x\\) and \\(\\tan^{-1}(-x) = -\\tan^{-1}x\\) (odd); but \\(\\cos^{-1}(-x) = \\pi - \\cos^{-1}x\\) and \\(\\cot^{-1}(-x) = \\pi - \\cot^{-1}x\\).",
      formula: {
        label: "Principal ranges",
        latex: "\\sin^{-1}x \\in [-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}], \\quad \\cos^{-1}x \\in [0,\\pi], \\quad \\tan^{-1}x \\in (-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2})",
      },
      visualizationSlug: "it-principal-ranges",
      authoredExample: {
        prompt: "Evaluate \\(\\cos^{-1}\\!\\left(-\\tfrac{1}{2}\\right)\\).",
        steps: [
          "Use \\(\\cos^{-1}(-x) = \\pi - \\cos^{-1}x\\): \\(\\cos^{-1}\\!\\left(-\\tfrac12\\right) = \\pi - \\cos^{-1}\\tfrac12\\).",
          "\\(\\cos^{-1}\\tfrac12 = \\tfrac{\\pi}{3}\\), so the value is \\(\\pi - \\tfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{2\\pi}{3}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^{-1}(-1) = ?\\)", answer: "\\(-\\tfrac{\\pi}{2}\\)", method: "\\(\\sin^{-1}\\) is odd; \\(\\sin^{-1}1 = \\tfrac{\\pi}{2}\\)." },
        { prompt: "Range of \\(\\tan^{-1}x\\)?", answer: "\\(\\left(-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}\\right)\\) — open ends." },
        { prompt: "\\(\\cos^{-1}\\!\\left(-\\tfrac{1}{2}\\right) = ?\\)", answer: "\\(\\tfrac{2\\pi}{3}\\)", method: "\\(\\cos^{-1}(-x)=\\pi-\\cos^{-1}x = \\pi - \\tfrac{\\pi}{3}\\)." },
        { prompt: "\\(\\tan^{-1}(-\\sqrt3) = ?\\)", answer: "\\(-\\tfrac{\\pi}{3}\\)", method: "\\(\\tan^{-1}\\) is odd; \\(\\tan^{-1}\\sqrt3 = \\tfrac{\\pi}{3}\\)." },
        { prompt: "\\(\\sin^{-1}\\!\\left(\\tfrac{\\sqrt3}{2}\\right) = ?\\)", answer: "\\(\\tfrac{\\pi}{3}\\)", method: "Standard value; in range \\([-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]\\)." },
      ],
      traps: [
        {
          title: "cos⁻¹ and cot⁻¹ are NOT odd",
          body:
            "\\(\\cos^{-1}(-x) = \\pi - \\cos^{-1}x\\), not \\(-\\cos^{-1}x\\) — because the range \\([0,\\pi]\\) has no negative angles. The same holds for \\(\\cot^{-1}\\). Treating them as odd is the classic error.",
        },
        {
          title: "tan⁻¹ is odd, but its range is OPEN",
          body:
            "\\(\\tan^{-1}x \\in \\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right)\\) — the endpoints are never attained, because \\(\\tan(\\pm\\tfrac{\\pi}{2})\\) is undefined. Writing \\(\\tan^{-1}x = \\tfrac{\\pi}{2}\\) for any finite \\(x\\) is wrong.",
        },
        {
          title: "Inverse-trig answers must LAND in the principal range",
          body:
            "After any manipulation, check the result lies in the function's principal range: \\(\\sin^{-1}\\in[-\\tfrac{\\pi}{2},\\tfrac{\\pi}{2}]\\), \\(\\cos^{-1}\\in[0,\\pi]\\). An angle like \\(\\tfrac{5\\pi}{6}\\) is a valid \\(\\cos^{-1}\\) output but can NEVER be a \\(\\sin^{-1}\\) output.",
        },
      ],
    },

    // complementary identities
    {
      kind: "formula" as const,
      slug: "it-complementary-identities",
      name: "Complementary Identities",
      pyqExampleId: "7fbd6238-f30f-4eef-9704-192290046493",
      intuition:
        "An inverse function and its co-function add to a right angle for any valid input. This single fact converts mixed sin⁻¹/cos⁻¹ (or tan⁻¹/cot⁻¹) expressions into one variable and solves a whole class of 'find the value' questions in one step.",
      definition:
        "For all valid \\(x\\):\n" +
        "\\[\\sin^{-1}x + \\cos^{-1}x = \\tfrac{\\pi}{2}, \\quad \\tan^{-1}x + \\cot^{-1}x = \\tfrac{\\pi}{2}, \\quad \\sec^{-1}x + \\csc^{-1}x = \\tfrac{\\pi}{2}.\\]\n" +
        "Also \\(\\tan^{-1}x + \\tan^{-1}\\tfrac{1}{x} = \\tfrac{\\pi}{2}\\) for \\(x > 0\\). Use these to replace one inverse function by \\(\\tfrac{\\pi}{2}\\) minus the other, collapsing an equation to a single unknown.",
      formula: {
        label: "Complementary pairs",
        latex: "\\sin^{-1}x + \\cos^{-1}x = \\tfrac{\\pi}{2}, \\quad \\tan^{-1}x + \\cot^{-1}x = \\tfrac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "If \\(2\\sin^{-1}x + \\cos^{-1}x = \\pi\\), find \\(\\sin^{-1}x\\).",
        steps: [
          "Write \\(\\cos^{-1}x = \\tfrac{\\pi}{2} - \\sin^{-1}x\\).",
          "Then \\(2\\sin^{-1}x + \\tfrac{\\pi}{2} - \\sin^{-1}x = \\pi \\Rightarrow \\sin^{-1}x = \\tfrac{\\pi}{2}\\).",
        ],
        answer: "\\(\\sin^{-1}x = \\dfrac{\\pi}{2}\\) (so \\(x = 1\\)).",
      },
      practiceSet: [
        { prompt: "If \\(\\sin^{-1}x = \\tfrac{\\pi}{6}\\), find \\(\\cos^{-1}x\\).", answer: "\\(\\tfrac{\\pi}{3}\\)", method: "\\(\\cos^{-1}x = \\tfrac{\\pi}{2} - \\sin^{-1}x = \\tfrac{\\pi}{2}-\\tfrac{\\pi}{6}\\)." },
        { prompt: "\\(\\sin^{-1}\\tfrac{1}{2} + \\cos^{-1}\\tfrac{1}{2} = ?\\)", answer: "\\(\\tfrac{\\pi}{2}\\)", method: "Complementary identity holds for ANY valid \\(x\\) — no need to evaluate each term." },
        { prompt: "\\(\\tan^{-1}3 + \\cot^{-1}3 = ?\\)", answer: "\\(\\tfrac{\\pi}{2}\\)", method: "\\(\\tan^{-1}x + \\cot^{-1}x = \\tfrac{\\pi}{2}\\) for all real \\(x\\)." },
      ],
      traps: [
        {
          title: "sin⁻¹x + cos⁻¹x = π/2 always — don't evaluate term by term",
          body:
            "\\(\\sin^{-1}x + \\cos^{-1}x = \\tfrac{\\pi}{2}\\) for EVERY valid \\(x\\), not just nice values. Students waste time evaluating each inverse separately; the sum is fixed. The same fixed-sum holds for \\(\\tan^{-1}x+\\cot^{-1}x\\) and \\(\\sec^{-1}x+\\csc^{-1}x\\).",
        },
      ],
    },

    // sum-difference formulas
    {
      kind: "formula" as const,
      slug: "it-sum-difference-formulas",
      name: "Sum & Difference Formulas",
      pyqExampleId: "932e69d7-f6d6-4a83-9bf3-c0b70ed58ef9",
      intuition:
        "Two arctangents combine into one by the tangent-of-a-sum formula. The same idea handles sin⁻¹ + tan⁻¹ etc. once you convert everything to a tangent. The only catch is a validity check on the combined formula.",
      definition:
        "The workhorse identities:\n" +
        "\\[\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}\\dfrac{a+b}{1-ab} \\quad (ab < 1),\\]\n" +
        "\\[\\tan^{-1}a - \\tan^{-1}b = \\tan^{-1}\\dfrac{a-b}{1+ab}.\\]\n" +
        "When \\(ab > 1\\) (with \\(a,b>0\\)) add \\(\\pi\\); when \\(ab > 1\\) with both negative, subtract \\(\\pi\\). To combine a \\(\\sin^{-1}\\) or \\(\\cos^{-1}\\) with a \\(\\tan^{-1}\\), first rewrite each as a \\(\\tan^{-1}\\) (draw the right triangle).",
      formula: {
        label: "Arctangent sum",
        latex: "\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}\\dfrac{a+b}{1-ab}\\quad (ab<1)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\tan^{-1}\\tfrac{1}{2} + \\tan^{-1}\\tfrac{1}{3}\\).",
        steps: [
          "\\(ab = \\tfrac16 < 1\\), so \\(= \\tan^{-1}\\dfrac{\\tfrac12 + \\tfrac13}{1 - \\tfrac16} = \\tan^{-1}\\dfrac{5/6}{5/6}\\).",
          "\\(= \\tan^{-1}(1)\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{4}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tan^{-1}\\tfrac{1}{2} + \\tan^{-1}\\tfrac{1}{3} = ?\\)", answer: "\\(\\tfrac{\\pi}{4}\\)", method: "\\(ab=\\tfrac16<1\\); \\(\\tan^{-1}\\dfrac{\\frac12+\\frac13}{1-\\frac16}=\\tan^{-1}1\\)." },
        { prompt: "\\(\\tan^{-1}2 + \\tan^{-1}3 = ?\\)", answer: "\\(\\tfrac{3\\pi}{4}\\)", method: "\\(ab=6>1\\): \\(\\tan^{-1}\\dfrac{5}{1-6}=\\tan^{-1}(-1)=-\\tfrac{\\pi}{4}\\), then ADD \\(\\pi\\)." },
        { prompt: "\\(\\tan^{-1}\\tfrac{1}{2} - \\tan^{-1}\\tfrac{1}{3} = ?\\)", answer: "\\(\\tan^{-1}\\tfrac{1}{7}\\)", method: "\\(\\tan^{-1}\\dfrac{\\frac12-\\frac13}{1+\\frac16}=\\tan^{-1}\\dfrac{1/6}{7/6}\\)." },
      ],
      traps: [
        {
          title: "Check ab < 1 before using the sum formula",
          body:
            "\\(\\tan^{-1}a + \\tan^{-1}b = \\tan^{-1}\\frac{a+b}{1-ab}\\) only when \\(ab<1\\). If \\(ab>1\\) (positive \\(a,b\\)) the true value exceeds \\(\\tfrac{\\pi}{2}\\) and you must add \\(\\pi\\). Skipping this gives an answer in the wrong quadrant.",
        },
        {
          title: "Difference formula uses 1 + ab in the denominator",
          body:
            "\\(\\tan^{-1}a - \\tan^{-1}b = \\tan^{-1}\\frac{a-b}{1+ab}\\) — the denominator is \\(1+ab\\), NOT \\(1-ab\\). Mixing up the sign of the \\(ab\\) term between the sum and difference forms is a frequent slip.",
        },
      ],
    },

    // 2 tan substitutions
    {
      kind: "formula" as const,
      slug: "it-2tan-substitutions",
      name: "The 2 tan⁻¹ Substitutions",
      pyqExampleId: "9e4d9c6b-6336-48ce-af87-7e5927c3feec",
      intuition:
        "Expressions like 2x/(1+x²) and (1−x²)/(1+x²) are exactly the double-angle formulas in disguise — so an inverse trig of them collapses to 2 tan⁻¹x. Recognising the pattern turns a fearsome equation into simple arctangent algebra.",
      definition:
        "For suitable \\(x\\):\n" +
        "- \\(\\sin^{-1}\\dfrac{2x}{1+x^2} = 2\\tan^{-1}x\\)\n" +
        "- \\(\\cos^{-1}\\dfrac{1-x^2}{1+x^2} = 2\\tan^{-1}x\\)\n" +
        "- \\(\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x\\)\n" +
        "These come from \\(\\sin 2\\theta, \\cos 2\\theta, \\tan 2\\theta\\) with \\(\\theta = \\tan^{-1}x\\). They reduce a tangled equation to a linear one in arctangents.",
      formula: {
        label: "Double-angle substitution",
        latex: "\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x",
      },
      authoredExample: {
        prompt: "Simplify \\(\\cos^{-1}\\dfrac{1-x^2}{1+x^2}\\) for \\(x \\ge 0\\).",
        steps: [
          "Set \\(x = \\tan\\theta\\) with \\(\\theta = \\tan^{-1}x\\). Then \\(\\dfrac{1-x^2}{1+x^2} = \\cos 2\\theta\\).",
          "So the expression is \\(\\cos^{-1}(\\cos 2\\theta) = 2\\theta\\) (valid since \\(2\\theta \\in [0,\\pi]\\) for \\(x\\ge0\\)).",
        ],
        answer: "\\(2\\tan^{-1}x\\).",
      },
      practiceSet: [
        { prompt: "Simplify \\(\\tan^{-1}\\dfrac{2x}{1-x^2}\\) (for \\(|x|<1\\)).", answer: "\\(2\\tan^{-1}x\\)", method: "Double-angle pattern: with \\(x=\\tan\\theta\\), \\(\\dfrac{2x}{1-x^2}=\\tan 2\\theta\\)." },
        { prompt: "Simplify \\(\\sin^{-1}\\dfrac{2x}{1+x^2}\\) (for \\(|x|\\le1\\)).", answer: "\\(2\\tan^{-1}x\\)", method: "\\(\\dfrac{2x}{1+x^2}=\\sin 2\\theta\\) with \\(\\theta=\\tan^{-1}x\\)." },
      ],
      traps: [
        {
          title: "The 2 tan⁻¹ substitutions need a validity range",
          body:
            "\\(\\sin^{-1}\\dfrac{2x}{1+x^2} = 2\\tan^{-1}x\\) holds only for \\(|x|\\le 1\\); \\(\\tan^{-1}\\dfrac{2x}{1-x^2} = 2\\tan^{-1}x\\) only for \\(|x|<1\\). Outside the range you must add or subtract \\(\\pi\\) — applying the identity blindly gives an out-of-range angle.",
        },
      ],
    },
  ],
};
