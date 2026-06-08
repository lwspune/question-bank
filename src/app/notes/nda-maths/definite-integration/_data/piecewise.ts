import type { SubtopicNote } from "@/app/notes/_types";

export const PIECEWISE_NOTE: SubtopicNote = {
  subtopicName: "Integration of Absolute Value, Piecewise, and Greatest Integer Functions",
  title: "Absolute Value, Piecewise and Greatest-Integer Integrals",
  oneLineDefinition:
    "When the integrand changes formula across the interval — an absolute value, a piecewise rule, or a greatest-integer function — split the integral at every break-point and integrate each piece on its own.",
  whyItMatters:
    "17 PYQs built on one habit: never integrate across a break-point. " +
    "For |f(x)| the break-points are where f changes sign; for greatest-integer functions they are where the integer part jumps. Split, integrate each piece, add. Get the break-points right and these are reliable marks.",
  concepts: [
    // 1 — absolute value / piecewise
    {
      kind: "formula" as const,
      slug: "integrating-absolute-value",
      name: "Integrating absolute-value and piecewise functions",
      intuition:
        "An absolute value hides a sign change. To integrate \\(|f(x)|\\), find where \\(f\\) is zero, split the interval there, and on each piece replace \\(|f|\\) by \\(+f\\) or \\(-f\\) according to its sign. The same split-and-integrate idea handles any piecewise rule.",
      definition:
        "The method for \\(\\int_a^b |f(x)|\\,dx\\):\n" +
        "- Find the zeros of \\(f\\) inside \\([a,b]\\) — these are the sign changes.\n" +
        "- On each subinterval, \\(|f| = f\\) where \\(f\\ge 0\\) and \\(|f| = -f\\) where \\(f< 0\\).\n" +
        "- Integrate each piece and add. Because \\(|f|\\ge 0\\), the answer is the **total (unsigned) area**, so \\(\\int_a^b|f|\\,dx \\ge \\big|\\int_a^b f\\,dx\\big|\\).",
      visualizationSlug: "defint-absolute-value-fold",
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_2^8 |x-5|\\,dx\\).",
        steps: [
          "\\(x-5\\) is zero at \\(x=5\\): negative on \\([2,5]\\), positive on \\([5,8]\\).",
          "\\(\\int_2^5 (5-x)\\,dx + \\int_5^8 (x-5)\\,dx\\).",
          "Each is a triangle of base 3, height 3: \\(\\tfrac12\\cdot3\\cdot3 = \\tfrac92\\) each.",
        ],
        answer: "\\(\\frac92+\\frac92 = 9\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^{\\pi/2} |\\sin x - \\cos x|\\,dx\\).",
        steps: [
          "\\(\\sin x = \\cos x\\) at \\(x=\\tfrac{\\pi}{4}\\): on \\([0,\\tfrac{\\pi}{4}]\\) \\(\\cos x>\\sin x\\); on \\([\\tfrac{\\pi}{4},\\tfrac{\\pi}{2}]\\) \\(\\sin x>\\cos x\\).",
          "\\(\\int_0^{\\pi/4}(\\cos x-\\sin x)\\,dx + \\int_{\\pi/4}^{\\pi/2}(\\sin x-\\cos x)\\,dx\\).",
          "Each evaluates to \\(\\sqrt2-1\\).",
        ],
        answer: "\\(2(\\sqrt2-1)\\).",
      },
      practiceSet: [
        { prompt: "Where do you split \\(\\int|x^2-1|\\,dx\\)?", answer: "At \\(x=\\pm1\\) (the zeros of \\(x^2-1\\))" },
        { prompt: "\\(\\int_{-2}^{-1}\\frac{x}{|x|}\\,dx = ?\\)", answer: "\\(-1\\)", method: "on negatives \\(\\frac{x}{|x|}=-1\\)" },
        { prompt: "If \\(\\int_a^b f = p\\) and \\(\\int_a^b|f| = q\\), which is larger?", answer: "\\(q \\ge |p|\\)", method: "unsigned area ≥ signed" },
      ],
      pyqExampleId: "79f247bd-0a1d-4db7-abf2-c1813d55aed7", // |sinx - cosx|
      traps: [
        {
          title: "Find the zeros first — don't drop the absolute value",
          body:
            "\\(\\int_{-1}^{1}(1-x^2)\\,dx\\) (no bars) gives a SIGNED area, but \\(\\int_{-1}^{1}|x^2-1|\\,dx\\) needs the sign of \\(x^2-1\\) on each piece. Forgetting the bars (or the split) gives the wrong, signed value.",
        },
      ],
    },

    // 2 — greatest integer
    {
      kind: "formula" as const,
      slug: "integrating-greatest-integer",
      name: "Integrating greatest-integer (floor) functions",
      intuition:
        "The greatest-integer function ⌊x⌋ is constant between consecutive integers and jumps by 1 at each integer. To integrate it (or anything built from it), split the interval at every point where the integer part changes, replace ⌊·⌋ by its constant value on each piece, and add.",
      definition:
        "Working with ⌊·⌋ under an integral:\n" +
        "- ⌊x⌋ is constant on \\([n, n+1)\\) with value \\(n\\); split at each integer.\n" +
        "- For ⌊x²⌋ or ⌊√x⌋, split where the INSIDE crosses an integer (e.g. ⌊x²⌋ jumps at \\(x=1,\\sqrt2,\\sqrt3,\\dots\\)).\n" +
        "- Useful identity: \\(\\lfloor x\\rfloor + \\lfloor -x\\rfloor = -1\\) for non-integer \\(x\\), so \\(\\int_a^b(\\lfloor x\\rfloor+\\lfloor -x\\rfloor)\\,dx = a-b\\).\n" +
        "- The fractional part \\(x-\\lfloor x\\rfloor\\) has \\(\\int_n^{n+1}(x-\\lfloor x\\rfloor)\\,dx = \\tfrac12\\).",
      visualizationSlug: "defint-greatest-integer-area",
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^{1.5} \\lfloor x\\rfloor\\,dx\\).",
        steps: [
          "On \\([0,1)\\): \\(\\lfloor x\\rfloor = 0\\). On \\([1,1.5]\\): \\(\\lfloor x\\rfloor = 1\\).",
          "\\(\\int_0^1 0\\,dx + \\int_1^{1.5} 1\\,dx = 0 + 0.5\\).",
        ],
        answer: "\\(0.5\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\int_0^{\\sqrt2} \\lfloor x^2\\rfloor\\,dx\\).",
        steps: [
          "\\(x^2\\) crosses 1 at \\(x=1\\). On \\([0,1)\\): \\(x^2<1\\) so \\(\\lfloor x^2\\rfloor=0\\). On \\([1,\\sqrt2)\\): \\(1\\le x^2<2\\) so \\(\\lfloor x^2\\rfloor=1\\).",
          "\\(\\int_0^1 0\\,dx + \\int_1^{\\sqrt2} 1\\,dx = 0 + (\\sqrt2-1)\\).",
        ],
        answer: "\\(\\sqrt2-1\\).",
      },
      practiceSet: [
        { prompt: "Value of \\(\\lfloor x\\rfloor\\) on \\([-1,0)\\)?", answer: "\\(-1\\)", method: "floor of a negative non-integer rounds DOWN" },
        { prompt: "\\(\\int_n^{n+1}(x-\\lfloor x\\rfloor)\\,dx = ?\\)", answer: "\\(1/2\\)" },
        { prompt: "\\(\\lfloor x\\rfloor + \\lfloor -x\\rfloor\\) for non-integer x?", answer: "\\(-1\\)" },
      ],
      pyqExampleId: "33c569a9-a9b1-4fbb-962d-74086fda3858", // ∫₀^√2 [x²]
      traps: [
        {
          title: "⌊x⌋ on [−1, 0) is −1, not 0",
          body:
            "The floor of a negative non-integer rounds DOWN: \\(\\lfloor -0.3\\rfloor = -1\\). A common slip is using \\(\\lfloor x\\rfloor=0\\) on \\([-1,0)\\) — it is \\(-1\\) there, which flips the sign of the contribution.",
        },
      ],
    },
  ],
};
