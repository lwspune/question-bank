import type { SubtopicNote } from "@/app/notes/_types";

export const COUNTING_DIFF_NOTE: SubtopicNote = {
  subtopicName: "Counting Points of Non-Differentiability",
  title: "Counting Points of Non-Differentiability",
  oneLineDefinition:
    "Counting the points where a function with a modulus, a maximum, a minimum or the greatest integer function fails to be continuous or differentiable.",
  whyItMatters:
    "Twenty-one PYQs, eleven of them multiple choice, and three from 2026. Twelve look for corners of a modulus, a maximum or a minimum and check which candidates survive; nine involve the greatest integer function, where every jump is also a point of non-differentiability. Two ideas cover the page.",
  concepts: [
    // C1 — corners
    {
      kind: "formula" as const,
      slug: "jdiff-corners",
      name: "Corners of modulus, max and min",
      intuition:
        "\\(|g(x)|\\) can have a corner only where \\(g(x)=0\\); \\(\\max\\{g,h\\}\\) and \\(\\min\\{g,h\\}\\) only where \\(g=h\\). Each such point is a candidate, and it is a real corner only if the slopes differ there. A factor that vanishes at the same point removes the corner: \\((x-a)|x-a|\\) is smooth. When several terms break at one point, add their slope jumps; they can cancel.",
      definition:
        "- \\(|g|\\): check where \\(g=0\\); a simple root is a corner.\n" +
        "- \\(|g|\\) at a double root, like \\(|(x-1)^2|\\), is smooth.\n" +
        "- \\(\\max\\{g,h\\}\\), \\(\\min\\{g,h\\}\\): check where \\(g=h\\) and the slopes differ.\n" +
        "- \\(h(x)\\,|x-a|\\) is differentiable at \\(a\\) when \\(h(a)=0\\).\n" +
        "- Several terms at one point: their slope jumps add, and may cancel.",
      formula: {
        label: "Slope jump at a corner",
        latex: "k\\,|x-a|:\\quad f'(a^+)-f'(a^-)=2k",
      },
      authoredExample: {
        prompt: "At how many points is \\(f(x)=|x^2-4|-4|x-2|\\) not differentiable?",
        steps: [
          "Candidates: \\(x=\\pm2\\) from \\(|x^2-4|\\), and \\(x=2\\) from \\(|x-2|\\).",
          "Near \\(x=2\\): \\(f=|x-2|\\,\\big(|x+2|-4\\big)=|x-2|\\,(x-2)\\), which is smooth.",
          "At \\(x=-2\\): only \\(|x^2-4|\\) breaks, and \\(f\\) has slope \\(0\\) on the left and \\(8\\) on the right.",
        ],
        answer: "One point, \\(x=-2\\).",
      },
      selfCheckExample: {
        prompt: "Where is \\(f(x)=\\max\\{x,\\,x^2\\}\\) not differentiable?",
        steps: [
          "\\(x=x^2\\) at \\(x=0\\) and \\(x=1\\).",
          "At 0: slope \\(0\\) (from \\(x^2\\)) on the left, \\(1\\) (from \\(x\\)) on the right.",
          "At 1: slope \\(1\\) on the left, \\(2\\) on the right.",
        ],
        answer: "At \\(x=0\\) and \\(x=1\\).",
      },
      practiceSet: [
        { prompt: "Corners of \\(|x^2-3x+2|\\)?", answer: "\\(2\\) (at \\(x=1\\) and \\(x=2\\))" },
        { prompt: "\\((x-1)|x-1|\\): differentiable at 1?", answer: "Yes" },
        { prompt: "\\(|\\sin x|\\) on \\((0,2\\pi)\\): points of non-differentiability?", answer: "\\(1\\) (at \\(x=\\pi\\))" },
        { prompt: "Where is \\(\\min\\{x,\\,2-x\\}\\) not differentiable?", answer: "\\(x=1\\)" },
      ],
      pyqExampleId: "efa3d7d5-8e1f-41a1-8ad5-ee5599c3a7de", // 2026 — max of a line and a parabola plus a modulus term; count the corners
      traps: [
        {
          title: "A candidate is not yet a corner",
          body: "Every zero inside a modulus is only a candidate. \\(|x-1|\\sin|x-1|\\) and \\(e^{|(x-1)^2|}\\) are smooth at 1, and a factor that vanishes at the same point removes the corner. Test each candidate before counting it.",
        },
      ],
    },

    // C2 — greatest integer jumps
    {
      kind: "formula" as const,
      slug: "jdiff-jumps",
      name: "Jumps of the greatest integer function",
      intuition:
        "\\([g(x)]\\) is constant while \\(g\\) stays between two integers, and it jumps where \\(g\\) crosses an integer. A jump is a discontinuity, and a function that is not continuous is not differentiable, so every jump counts for both. A peak exactly at an integer also counts: \\(5\\sin x\\) reaches 5 at \\(\\frac\\pi2\\), so \\([5\\sin x]\\) is 5 there and 4 on both sides. A trough at an integer does not: \\([x^2]\\) is 0 on both sides of 0.",
      definition:
        "- \\([g(x)]\\) jumps where \\(g\\) crosses an integer, or peaks exactly at one.\n" +
        "- Not continuous means not differentiable: each jump counts for both.\n" +
        "- \\([x+n]=[x]+n\\) for an integer \\(n\\).\n" +
        "- Write the function interval by interval between the integers, then test each break.\n" +
        "- A continuous term cannot cancel a jump; only another jump at the same point can.",
      formula: {
        label: "Greatest integer function",
        latex: "[x]=n\\ \\text{ for }\\ n\\le x<n+1,\\qquad[x+n]=[x]+n\\ \\ (n\\in\\mathbb{Z})",
      },
      authoredExample: {
        prompt: "At how many points of \\((0,3)\\) is \\(f(x)=[x^2]\\) not differentiable?",
        steps: [
          "\\(x^2\\) rises from 0 to 9 on \\((0,3)\\).",
          "It crosses \\(1,2,\\dots,8\\), at \\(x=\\sqrt1,\\sqrt2,\\dots,\\sqrt8\\), and \\([x^2]\\) jumps at each.",
          "Each jump is a discontinuity, so \\(f\\) is not differentiable there.",
        ],
        answer: "\\(8\\).",
      },
      selfCheckExample: {
        prompt: "Where in \\((0,2)\\) is \\(f(x)=x[x]\\) not differentiable?",
        steps: [
          "\\(f=0\\) on \\((0,1)\\) and \\(f=x\\) on \\([1,2)\\).",
          "At 1: the left value tends to 0, but \\(f(1)=1\\).",
        ],
        answer: "Only at \\(x=1\\), where \\(f\\) jumps.",
      },
      practiceSet: [
        { prompt: "\\([x]\\) on \\((0,4)\\): points of non-differentiability?", answer: "\\(3\\)" },
        { prompt: "\\((x-1)[x]\\) at \\(x=1\\)?", answer: "Continuous, not differentiable (slopes 0 and 1)" },
        { prompt: "\\([2x]\\) on \\((0,2)\\): points of non-differentiability?", answer: "\\(3\\) (at \\(\\frac12,1,\\frac32\\))" },
        { prompt: "\\([x^2]\\) at \\(x=0\\)?", answer: "Differentiable: \\([x^2]=0\\) on \\((-1,1)\\)" },
      ],
      pyqExampleId: "523471ba-a99e-4925-8bcc-d17426934aee", // 2025 — piecewise with min{1 + x + [x], x + 2[x]}; count jumps and corners
      traps: [
        {
          title: "A jump counts twice in m + n",
          body: "When a question asks for the points where \\(f\\) is not continuous (\\(m\\)) and not differentiable (\\(n\\)), a jump belongs to both counts. Add every jump to \\(n\\) as well as to \\(m\\).",
        },
      ],
    },
  ],
};
