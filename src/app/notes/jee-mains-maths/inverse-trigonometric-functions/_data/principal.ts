import type { SubtopicNote } from "@/app/notes/_types";

export const PRINCIPAL_ITF_NOTE: SubtopicNote = {
  subtopicName: "Domain, Range and Principal Values",
  title: "Domain, Range and Principal Values",
  oneLineDefinition:
    "Where each inverse function is defined, what values it can take, and how an inverse of a trigonometric value is brought back into the principal range.",
  whyItMatters:
    "Sixteen PYQs, fourteen of them multiple choice, and one from 2026. Six find the domain of an inverse function of an expression; four find a range, a maximum or a minimum; six evaluate inverse functions of trigonometric values, where the principal range decides the answer. Three ideas cover the page.",
  concepts: [
    // C1 — domain
    {
      kind: "formula" as const,
      slug: "jitf-domain",
      name: "Domain conditions on the argument",
      intuition:
        "Each inverse function accepts only certain arguments. \\(\\sin^{-1}\\) and \\(\\cos^{-1}\\) need the argument in \\([-1,1]\\); \\(\\sec^{-1}\\) and \\(\\csc^{-1}\\) need it outside \\((-1,1)\\); \\(\\tan^{-1}\\) and \\(\\cot^{-1}\\) take anything. So the domain of \\(\\sin^{-1}(g(x))\\) is the set of \\(x\\) with \\(-1\\le g(x)\\le1\\): an inequality in \\(x\\).",
      definition:
        "- \\(\\sin^{-1}u,\\ \\cos^{-1}u\\): \\(-1\\le u\\le1\\).\n" +
        "- \\(\\sec^{-1}u,\\ \\csc^{-1}u\\): \\(|u|\\ge1\\).\n" +
        "- \\(\\tan^{-1}u,\\ \\cot^{-1}u\\): every real \\(u\\).\n" +
        "- For \\(\\left|\\frac{p}{q}\\right|\\le1\\), solve \\(p^2\\le q^2\\) with \\(q\\ne0\\).\n" +
        "- For a sum of terms, intersect their domains.",
      formula: {
        label: "Domains",
        latex: "\\sin^{-1}u,\\ \\cos^{-1}u:\\ |u|\\le1,\\qquad \\sec^{-1}u,\\ \\csc^{-1}u:\\ |u|\\ge1",
      },
      authoredExample: {
        prompt: "Find the domain of \\(\\cos^{-1}\\left(\\frac{x+1}{x-1}\\right)\\).",
        steps: [
          "Need \\(\\left|\\frac{x+1}{x-1}\\right|\\le1\\), so \\((x+1)^2\\le(x-1)^2\\) with \\(x\\ne1\\).",
          "This gives \\(4x\\le0\\).",
        ],
        answer: "\\((-\\infty,0]\\).",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(\\sin^{-1}(x^2-3)\\).",
        steps: [
          "\\(-1\\le x^2-3\\le1\\) gives \\(2\\le x^2\\le4\\).",
        ],
        answer: "\\([-2,-\\sqrt2]\\cup[\\sqrt2,2]\\).",
      },
      practiceSet: [
        { prompt: "Domain of \\(\\cos^{-1}(3x)\\)?", answer: "\\(\\left[-\\frac13,\\frac13\\right]\\)" },
        { prompt: "Domain of \\(\\sec^{-1}(x+1)\\)?", answer: "\\((-\\infty,-2]\\cup[0,\\infty)\\)" },
        { prompt: "Domain of \\(\\tan^{-1}(x^2-5)\\)?", answer: "\\(\\mathbb{R}\\)" },
        { prompt: "Domain of \\(\\sin^{-1}x+\\cos^{-1}(x-1)\\)?", answer: "\\([0,1]\\)" },
      ],
      pyqExampleId: "be5f1208-b23a-4191-a7bc-d27eaa2cbdd1", // 2023 — domain of an inverse secant of a ratio
      traps: [
        {
          title: "Do not multiply by a denominator of unknown sign",
          body: "Turning \\(\\frac{p}{q}\\le1\\) into \\(p\\le q\\) is wrong when \\(q<0\\). Square instead: \\(\\left|\\frac pq\\right|\\le1\\) exactly when \\(p^2\\le q^2\\), and then remove the points where \\(q=0\\).",
        },
      ],
    },

    // C2 — range
    {
      kind: "formula" as const,
      slug: "jitf-range",
      name: "Ranges and complementary pairs",
      intuition:
        "To find a range, first find the set of values the argument takes, then push it through the inverse function, which is monotonic. When an expression mixes \\(\\sin^{-1}x\\) and \\(\\cos^{-1}x\\), replace one with \\(\\frac\\pi2\\) minus the other. The expression becomes a polynomial in one angle \\(a\\), and \\(a\\) runs over a known interval.",
      definition:
        "- Ranges: \\(\\sin^{-1}\\): \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]\\); \\(\\cos^{-1}\\): \\([0,\\pi]\\); \\(\\tan^{-1}\\): \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\); \\(\\cot^{-1}\\): \\((0,\\pi)\\).\n" +
        "- \\(\\sec^{-1}\\): \\([0,\\pi]-\\left\\{\\frac\\pi2\\right\\}\\); \\(\\csc^{-1}\\): \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]-\\{0\\}\\).\n" +
        "- \\(\\sin^{-1}x+\\cos^{-1}x=\\frac\\pi2\\) for \\(|x|\\le1\\); \\(\\tan^{-1}x+\\cot^{-1}x=\\frac\\pi2\\) for all \\(x\\); \\(\\sec^{-1}x+\\csc^{-1}x=\\frac\\pi2\\) for \\(|x|\\ge1\\).\n" +
        "- With \\(a=\\sin^{-1}x\\), \\(a^2+\\left(\\frac\\pi2-a\\right)^2\\) is a parabola in \\(a\\): least at \\(a=\\frac\\pi4\\), greatest at the end of the interval farther from \\(\\frac\\pi4\\).",
      formula: {
        label: "Complementary pairs",
        latex: "\\sin^{-1}x+\\cos^{-1}x=\\tan^{-1}x+\\cot^{-1}x=\\frac{\\pi}{2}",
      },
      authoredExample: {
        prompt: "Find the range of \\((\\tan^{-1}x)^2+(\\cot^{-1}x)^2\\).",
        steps: [
          "Let \\(a=\\tan^{-1}x\\in\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\); then \\(\\cot^{-1}x=\\frac\\pi2-a\\).",
          "The expression is \\(2a^2-\\pi a+\\frac{\\pi^2}4=2\\left(a-\\frac\\pi4\\right)^2+\\frac{\\pi^2}8\\), least \\(\\frac{\\pi^2}8\\) at \\(a=\\frac\\pi4\\).",
          "As \\(a\\to-\\frac\\pi2\\) it tends to \\(\\frac{\\pi^2}4+\\pi^2=\\frac{5\\pi^2}4\\), which is never reached.",
        ],
        answer: "\\(\\left[\\frac{\\pi^2}8,\\frac{5\\pi^2}4\\right)\\).",
      },
      selfCheckExample: {
        prompt: "Find the least value of \\((\\sin^{-1}x)^3+(\\cos^{-1}x)^3\\).",
        steps: [
          "With \\(a+b=\\frac\\pi2\\): \\(a^3+b^3=(a+b)^3-3ab(a+b)=\\frac{\\pi^3}8-\\frac{3\\pi}2ab\\).",
          "\\(ab=a\\left(\\frac\\pi2-a\\right)\\) is greatest, \\(\\frac{\\pi^2}{16}\\), at \\(a=\\frac\\pi4\\).",
          "\\(\\frac{\\pi^3}8-\\frac{3\\pi^3}{32}\\).",
        ],
        answer: "\\(\\frac{\\pi^3}{32}\\).",
      },
      practiceSet: [
        { prompt: "Range of \\(\\cot^{-1}x\\)?", answer: "\\((0,\\pi)\\)" },
        { prompt: "Range of \\(\\sin^{-1}(x^2)\\)?", answer: "\\(\\left[0,\\frac\\pi2\\right]\\)" },
        { prompt: "Range of \\(2\\tan^{-1}x\\)?", answer: "\\((-\\pi,\\pi)\\)" },
        { prompt: "\\(\\sin^{-1}(0.3)+\\cos^{-1}(0.3)\\)?", answer: "\\(\\frac\\pi2\\)" },
      ],
      pyqExampleId: "9d401d9a-48c1-4843-8fae-d7e03a317823", // 2026 — maximum of a sum of squares of sin⁻¹x and cos⁻¹x
      traps: [
        {
          title: "Check whether each endpoint is reached",
          body: "\\(\\tan^{-1}x\\) never equals \\(\\pm\\frac\\pi2\\), and \\(\\frac{x^2}{x^2+1}\\) never equals 1. An endpoint that is only approached gets a round bracket, and options often differ only in that bracket.",
        },
      ],
    },

    // C3 — principal values
    {
      kind: "formula" as const,
      slug: "jitf-principal",
      name: "Inverse of a trigonometric value outside the principal range",
      intuition:
        "\\(\\sin^{-1}(\\sin x)\\) is the angle in \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]\\) with the same sine as \\(x\\). It equals \\(x\\) only when \\(x\\) is already in that interval. Otherwise, use \\(\\sin(\\pi-x)=\\sin x\\) or the period \\(2\\pi\\) to move \\(x\\) into the range. Do the same for \\(\\cos^{-1}(\\cos x)\\) on \\([0,\\pi]\\) and \\(\\tan^{-1}(\\tan x)\\) on \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\).",
      definition:
        "- \\(\\sin^{-1}(\\sin x)=x\\) on \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]\\); \\(=\\pi-x\\) on \\(\\left[\\frac\\pi2,\\frac{3\\pi}2\\right]\\); \\(=x-2\\pi\\) on \\(\\left[\\frac{3\\pi}2,\\frac{5\\pi}2\\right]\\).\n" +
        "- \\(\\cos^{-1}(\\cos x)=x\\) on \\([0,\\pi]\\); \\(=2\\pi-x\\) on \\([\\pi,2\\pi]\\); \\(\\cos^{-1}(\\cos(-x))=\\cos^{-1}(\\cos x)\\).\n" +
        "- \\(\\tan^{-1}(\\tan x)=x-k\\pi\\), with \\(k\\) chosen so the result lies in \\(\\left(-\\frac\\pi2,\\frac\\pi2\\right)\\).\n" +
        "- Use \\(\\pi\\approx3.14\\): \\(\\frac\\pi2\\approx1.57\\), \\(\\frac{3\\pi}2\\approx4.71\\), \\(2\\pi\\approx6.28\\).",
      formula: {
        label: "Back into the principal range",
        latex: "\\sin^{-1}(\\sin x)=\\pi-x\\ \\ \\left(\\tfrac{\\pi}{2}\\le x\\le\\tfrac{3\\pi}{2}\\right),\\qquad \\cos^{-1}(\\cos x)=2\\pi-x\\ \\ (\\pi\\le x\\le2\\pi)",
      },
      authoredExample: {
        prompt: "Find \\(\\sin^{-1}(\\sin4)+\\cos^{-1}(\\cos4)\\).",
        steps: [
          "\\(4\\in\\left[\\frac\\pi2,\\frac{3\\pi}2\\right]\\), so \\(\\sin^{-1}(\\sin4)=\\pi-4\\approx-0.86\\).",
          "\\(4\\in[\\pi,2\\pi]\\), so \\(\\cos^{-1}(\\cos4)=2\\pi-4\\approx2.28\\).",
        ],
        answer: "\\(3\\pi-8\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos^{-1}(\\cos10)\\).",
        steps: [
          "\\(10-2\\pi\\approx3.72\\) is still greater than \\(\\pi\\).",
          "\\(\\cos10=\\cos(4\\pi-10)\\), and \\(4\\pi-10\\approx2.57\\) lies in \\([0,\\pi]\\).",
        ],
        answer: "\\(4\\pi-10\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin^{-1}\\left(\\sin\\frac{5\\pi}6\\right)\\)?", answer: "\\(\\frac\\pi6\\)" },
        { prompt: "\\(\\cos^{-1}\\left(\\cos\\frac{5\\pi}4\\right)\\)?", answer: "\\(\\frac{3\\pi}4\\)" },
        { prompt: "\\(\\tan^{-1}(\\tan3)\\)?", answer: "\\(3-\\pi\\)" },
        { prompt: "\\(\\sin^{-1}(\\sin2)\\)?", answer: "\\(\\pi-2\\)" },
      ],
      pyqExampleId: "6bfd2bef-43d0-40f4-932c-f574d9dcf96f", // 2024 — sin⁻¹(sin x) and cos⁻¹(cos x) outside the range
      traps: [
        {
          title: "sin⁻¹(sin x) is not always x",
          body: "\\(\\sin^{-1}(\\sin3)\\) is \\(\\pi-3\\), not 3, because 3 lies outside \\(\\left[-\\frac\\pi2,\\frac\\pi2\\right]\\). Before writing the answer, check that it lies in the principal range.",
        },
      ],
    },
  ],
};
