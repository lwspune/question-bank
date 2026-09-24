import type { SubtopicNote } from "@/app/notes/_types";

export const CONTINUITY_AT_A_POINT_NOTE: SubtopicNote = {
  subtopicName: "Continuity at a Point — Finding f(c) and the Parameter",
  title: "Continuity at a Point — Finding f(c) and the Parameter",
  oneLineDefinition:
    "f is continuous at c when the limit exists and equals f(c) — so a 'find k' or 'find f(0)' question is a limit from the earlier pages, set equal to a value.",
  whyItMatters:
    "19 PYQs at 58% HARD, the largest page in the chapter and pure recycling: every question here is a limit from the four pages before it, evaluated and then equated. " +
    "The extra difficulty is clerical — a parameter buried inside the limit, a point that is not 0, an integral in the numerator — never a new idea. " +
    "Four of these stems were set twice in different sittings with identical numbers, so the recurring forms are worth recognising on sight.",
  concepts: [
    // 1 — the three-part test
    {
      kind: "formula" as const,
      slug: "cetlim-three-part-continuity-test",
      name: "Continuity at a Point — The Three-Part Test",
      intuition:
        "A function is continuous at \\(c\\) if you can draw it through \\(c\\) without lifting the pen: the left approach, the right approach and the actual dot at \\(c\\) all agree.",
      definition:
        "- \\(f\\) is **continuous at \\(c\\)** when three things hold: \\(f(c)\\) exists; \\(\\lim_{x\\to c} f(x)\\) exists (left = right); and the two are equal.\n" +
        "- **Removable** discontinuity: the limit exists but \\(f(c)\\) is missing or different — a hole, fixable by redefining one value. **Jump**: left and right limits differ. **Infinite**: the function blows up.\n" +
        "- Polynomials, \\(\\sin\\), \\(\\cos\\), \\(e^x\\) are continuous everywhere; rational functions, \\(\\tan\\), \\(\\log\\), roots are continuous at every point of their domain. So discontinuity can only happen where a formula **changes** or a denominator **vanishes**.\n" +
        "- Every 'is continuous at \\(c\\), find \\(k\\)' stem is the equation \\(\\lim_{x\\to c} f(x) = f(c)\\) with \\(k\\) on one side.\n" +
        "- Continuity on an **interval** means continuity at every interior point plus the appropriate one-sided continuity at the endpoints.",
      formula: {
        label: "Continuity at c",
        latex:
          "f \\text{ continuous at } c \\iff \\lim_{x\\to c^-} f(x) = \\lim_{x\\to c^+} f(x) = f(c)",
      },
      visualizationSlug: "lim-discontinuity-types",
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{x^2 - 4}{x - 2}\\) for \\(x \\neq 2\\) and \\(f(2) = 5\\). Is \\(f\\) continuous at \\(2\\)? If not, how should \\(f(2)\\) be redefined?",
        steps: [
          "\\(f(2) = 5\\) exists.",
          "The limit: \\(\\dfrac{(x - 2)(x + 2)}{x - 2} = x + 2 \\to 4\\).",
          "\\(4 \\neq 5\\): the third condition fails — a removable discontinuity. Setting \\(f(2) = 4\\) makes \\(f\\) continuous.",
        ],
        answer: "Not continuous; redefine \\(f(2) = 4\\).",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = \\dfrac{\\sin x}{x}\\) for \\(x \\neq 0\\), \\(f(0) = 1\\). Continuous at \\(0\\)?",
          answer: "Yes — the limit is \\(1 = f(0)\\).",
        },
        {
          prompt: "\\(f(x) = \\dfrac{|x|}{x}\\) for \\(x \\neq 0\\), \\(f(0) = 0\\). Continuous at \\(0\\)?",
          answer: "No — left limit \\(-1\\), right limit \\(1\\): a jump.",
        },
        {
          prompt: "Is \\(f(x) = x^2 + 1\\) continuous at \\(x = 3\\)?",
          answer: "Yes — a polynomial is continuous everywhere.",
        },
        {
          prompt: "Is \\(f(x) = \\dfrac{1}{x - 1}\\) continuous at \\(x = 1\\)?",
          answer: "No — infinite discontinuity; \\(f(1)\\) does not exist.",
        },
      ],
      pyqExampleId: "097ed633-2466-4921-87b3-87adf674ce4b",
      traps: [
        {
          title: "A limit existing is not continuity",
          body:
            "\\(\\dfrac{x^2 - 4}{x - 2}\\) has a perfectly good limit at \\(2\\); it is still discontinuous there if \\(f(2)\\) is undefined or set to the wrong number. The test has three parts, and the third one is where the marks are.",
        },
      ],
    },

    // 2 — plug the hole
    {
      kind: "formula" as const,
      slug: "cetlim-define-f-c-as-the-limit",
      name: "Removable Discontinuity: Define f(c) as the Limit",
      intuition:
        "When the formula is undefined at exactly one point, continuity has only one possible meaning: \\(f(c)\\) must be whatever the formula is heading towards. The question 'find \\(f(c)\\) so that \\(f\\) is continuous' is the question 'evaluate the limit'.",
      definition:
        "- **Template**: \\(f(x) = \\dfrac{\\text{something}}{\\text{something that vanishes at } c}\\) for \\(x \\neq c\\), continuous at \\(c\\). Then \\(f(c) = \\lim_{x\\to c} f(x)\\), full stop.\n" +
        "- The limit is one of the earlier pages: factor, rationalise, \\(x^n - a^n\\), a trigonometric or exponential standard form.\n" +
        "- Cube and fifth roots at \\(0\\): \\((27 - 2x)^{1/3} - 3\\) and \\(9 - 3(243 + 5x)^{1/5}\\) are both derivative-in-disguise forms — differentiate top and bottom once (L'Hôpital) and substitute \\(x = 0\\).\n" +
        "- A sum \\(x + x^2 + \\dots + x^n - n\\) over \\(x - 1\\) splits into \\(\\dfrac{x - 1}{x - 1} + \\dfrac{x^2 - 1}{x - 1} + \\dots\\), giving \\(1 + 2 + \\dots + n\\).\n" +
        "- Trigonometric points other than \\(0\\) (\\(x \\to 1\\) with \\(\\cos\\pi x\\), \\(x \\to \\pi/4\\)): shift the variable as on the trigonometric page.",
      formula: {
        label: "Filling a removable discontinuity",
        latex:
          "f \\text{ continuous at } c,\\ f \\text{ undefined at } c \\text{ by formula} \\ \\Rightarrow\\ f(c) := \\lim_{x\\to c} f(x)",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{\\sqrt{x + 4} - 2}{x}\\) for \\(x \\neq 0\\) is continuous at \\(0\\). Find \\(f(0)\\).",
        steps: [
          "\\(f(0)\\) must equal \\(\\lim_{x\\to 0}\\dfrac{\\sqrt{x + 4} - 2}{x}\\), a \\(0/0\\) form with a surd — rationalise.",
          "\\(\\dfrac{(x + 4) - 4}{x\\left(\\sqrt{x + 4} + 2\\right)} = \\dfrac{1}{\\sqrt{x + 4} + 2}\\).",
          "At \\(x = 0\\): \\(\\dfrac{1}{2 + 2} = \\dfrac{1}{4}\\).",
        ],
        answer: "\\(f(0) = \\dfrac{1}{4}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{x^3 - 27}{x^2 - 9}\\) for \\(x \\neq 3\\) is continuous at \\(3\\). Find \\(f(3)\\).",
        steps: [
          "Factor: \\(\\dfrac{(x - 3)(x^2 + 3x + 9)}{(x - 3)(x + 3)} = \\dfrac{x^2 + 3x + 9}{x + 3}\\).",
          "At \\(3\\): \\(\\dfrac{9 + 9 + 9}{6} = \\dfrac{27}{6} = \\dfrac{9}{2}\\).",
        ],
        answer: "\\(f(3) = \\dfrac{9}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = \\dfrac{x^2 - 1}{x - 1}\\), \\(x \\neq 1\\), continuous at \\(1\\). \\(f(1) = ?\\)",
          answer: "\\(2\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{\\sin 3x}{x}\\), \\(x \\neq 0\\), continuous at \\(0\\). \\(f(0) = ?\\)",
          answer: "\\(3\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{e^{2x} - 1}{x}\\), \\(x \\neq 0\\), continuous at \\(0\\). \\(f(0) = ?\\)",
          answer: "\\(2\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{1 - \\cos x}{x^2}\\), \\(x \\neq 0\\), continuous at \\(0\\). \\(f(0) = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
        },
      ],
      pyqExampleId: "f4ce6784-e50c-4897-93cc-4a843b74bde7",
      traps: [
        {
          title: "Computing f(c) from the formula",
          body:
            "Substituting \\(x = c\\) into the formula divides by zero — that is the whole reason the point is special. \\(f(c)\\) is the LIMIT, obtained by resolving the \\(0/0\\).",
        },
      ],
    },

    // 3 — standard-form products
    {
      kind: "formula" as const,
      slug: "cetlim-standard-form-products-in-continuity",
      name: "Products of Standard Forms in Continuity Dress",
      intuition:
        "The HARD continuity stems stack three or four standard forms into one fraction — \\(\\sin^3\\sqrt{x}\\) over \\((\\tan^{-1}\\sqrt{x})^2\\), \\(\\log(1 + 3x)\\) over \\(e^{5\\sqrt{x}} - 1\\). Replace each by its order, multiply the powers of \\(x\\), and the fraction collapses to a constant.",
      definition:
        "- Replace every factor by its **leading behaviour**: \\(\\sin u \\to u\\), \\(\\tan u \\to u\\), \\(\\tan^{-1}u \\to u\\), \\(e^{u} - 1 \\to u\\), \\(a^{u} - 1 \\to u\\log a\\), \\(\\log(1 + u) \\to u\\), \\(1 - \\cos u \\to \\dfrac{u^2}{2}\\), each valid because \\(u \\to 0\\).\n" +
        "- Then **total the powers of \\(x\\)** upstairs and downstairs, treating \\(\\sqrt{x}\\) as \\(x^{1/2}\\). Equal totals → the constant that remains is \\(f(c)\\). Unequal → the limit is \\(0\\) or infinite and **no** value of the parameter rescues continuity.\n" +
        "- Exponential differences factor first: \\(10^x + 7^x - 14^x - 5^x = (2^x - 1)(5^x - 7^x)\\), each bracket first order, so the product pairs with \\(1 - \\cos x\\).\n" +
        "- Keep \\(\\log a - \\log b = \\log\\dfrac{a}{b}\\) and \\(2\\log 2 = \\log 4\\) ready: the option list is written in a single log.",
      formula: {
        label: "Order bookkeeping",
        latex:
          "\\frac{\\prod (\\text{factors} \\sim c_i x^{p_i})}{\\prod (\\text{factors} \\sim d_j x^{q_j})} \\to \\frac{\\prod c_i}{\\prod d_j} \\ \\text{ exactly when } \\sum p_i = \\sum q_j",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{(e^{x} - 1)\\sin 2x}{x\\log(1 + 3x)}\\) for \\(x \\neq 0\\) is continuous at \\(0\\). Find \\(f(0)\\).",
        steps: [
          "Replace: \\(e^{x} - 1 \\sim x\\), \\(\\sin 2x \\sim 2x\\), \\(\\log(1 + 3x) \\sim 3x\\).",
          "Numerator \\(\\sim x\\cdot 2x = 2x^2\\); denominator \\(\\sim x\\cdot 3x = 3x^2\\). Powers match.",
          "\\(f(0) = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(f(0) = \\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{(3^{x} - 1)^2}{x\\sin x}\\) for \\(x \\neq 0\\) is continuous at \\(0\\). Find \\(f(0)\\).",
        steps: [
          "\\((3^{x} - 1)^2 \\sim (x\\log 3)^2 = x^2(\\log 3)^2\\); \\(x\\sin x \\sim x^2\\).",
          "Powers match; the constant is \\((\\log 3)^2\\).",
        ],
        answer: "\\(f(0) = (\\log 3)^2\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = \\dfrac{\\sin 4x}{e^{2x} - 1}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(2\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{\\log(1 + 5x)}{\\tan 2x}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(\\dfrac{5}{2}\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{2^{x} - 1}{\\sqrt{1 + x} - 1}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(2\\log 2\\)",
          method: "\\(\\sqrt{1+x} - 1 \\sim x/2\\).",
        },
        {
          prompt: "\\(f(x) = \\dfrac{1 - \\cos 2x}{x\\log(1 + x)}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(2\\)",
          method: "\\(2x^2 / x^2\\).",
        },
      ],
      pyqExampleId: "082fbd23-3596-4b83-ba0b-f5b7df59b516",
      traps: [
        {
          title: "Powers that do not match",
          body:
            "If the numerator is order \\(x^2\\) and the denominator order \\(x^3\\), the limit is infinite and no \\(k\\) makes \\(f\\) continuous — the answer to 'find \\(k\\)' would be 'no such \\(k\\)'. When your bookkeeping gives that on a paper that offers four numbers, re-read the stem: a lost square or a misread \\(f(0)\\) is the usual cause.",
        },
      ],
    },

    // 4 — non-zero point, shift
    {
      kind: "formula" as const,
      slug: "cetlim-continuity-at-a-non-zero-point",
      name: "Continuity at a Non-Zero Point: Shift to h → 0",
      intuition:
        "At \\(x = \\dfrac{\\pi}{4}\\) or \\(\\dfrac{\\pi}{2}\\) the standard limits do not apply directly. Either shift the variable so the point becomes \\(0\\), or — faster when both floors are differentiable — read the ratio as a derivative and apply L'Hôpital once.",
      definition:
        "- **Shift**: at \\(c = \\dfrac{\\pi}{2}\\) put \\(x = \\dfrac{\\pi}{2} - h\\); at \\(c = \\dfrac{\\pi}{4}\\) put \\(x = \\dfrac{\\pi}{4} + h\\) and use \\(\\tan\\left(\\dfrac{\\pi}{4} + h\\right) = \\dfrac{1 + \\tan h}{1 - \\tan h}\\).\n" +
        "- **L'Hôpital**: for \\(\\dfrac{1 - \\tan x}{4x - \\pi}\\) at \\(\\dfrac{\\pi}{4}\\), differentiate: \\(\\dfrac{-\\sec^2 x}{4} \\to \\dfrac{-2}{4} = -\\dfrac{1}{2}\\). For \\(\\dfrac{\\sqrt2\\cos x - 1}{\\cot x - 1}\\): \\(\\dfrac{-\\sqrt2\\sin x}{-\\csc^2 x} \\to \\dfrac{-1}{-2} = \\dfrac{1}{2}\\).\n" +
        "- Both routes must agree; use the shift when a **power** of \\((\\pi - 2x)\\) sits below (L'Hôpital would need repeating), and L'Hôpital when the denominator is **linear** in \\(x\\).\n" +
        "- The value \\(f(c)\\) or \\(k\\) is then the number obtained — nothing else changes.",
      formula: {
        label: "Two routes at a non-zero point",
        latex:
          "x = c + h \\ (h \\to 0) \\qquad \\text{or} \\qquad \\lim_{x\\to c}\\frac{p(x)}{q(x)} \\overset{0/0}{=} \\frac{p'(c)}{q'(c)} \\ \\text{ when } q'(c) \\neq 0",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{\\cos x}{\\pi - 2x}\\) for \\(x \\neq \\dfrac{\\pi}{2}\\) is continuous at \\(\\dfrac{\\pi}{2}\\). Find \\(f\\!\\left(\\dfrac{\\pi}{2}\\right)\\).",
        steps: [
          "Shift: \\(x = \\dfrac{\\pi}{2} - h\\). Then \\(\\cos x = \\sin h\\) and \\(\\pi - 2x = 2h\\).",
          "\\(\\dfrac{\\sin h}{2h} \\to \\dfrac{1}{2}\\).",
          "Check by L'Hôpital: \\(\\dfrac{-\\sin x}{-2} \\to \\dfrac{1}{2}\\). Agrees.",
        ],
        answer: "\\(f\\!\\left(\\dfrac{\\pi}{2}\\right) = \\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{1 - \\sin x}{\\left(\\frac{\\pi}{2} - x\\right)^2}\\) for \\(x \\neq \\dfrac{\\pi}{2}\\) is continuous at \\(\\dfrac{\\pi}{2}\\). Find \\(f\\!\\left(\\dfrac{\\pi}{2}\\right)\\).",
        steps: [
          "The denominator is squared, so shift rather than differentiate: \\(x = \\dfrac{\\pi}{2} - h\\) gives \\(1 - \\sin x = 1 - \\cos h\\) and \\(\\left(\\frac{\\pi}{2} - x\\right)^2 = h^2\\).",
          "\\(\\dfrac{1 - \\cos h}{h^2} \\to \\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = \\dfrac{\\sin x}{\\pi - x}\\), \\(x \\neq \\pi\\). \\(f(\\pi) = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{\\tan x - 1}{x - \\pi/4}\\), \\(x \\neq \\pi/4\\). \\(f(\\pi/4) = ?\\)",
          answer: "\\(2\\)",
          method: "\\(\\sec^2(\\pi/4) = 2\\).",
        },
        {
          prompt: "\\(f(x) = \\dfrac{x - \\pi/2}{\\cos x}\\), \\(x \\neq \\pi/2\\). \\(f(\\pi/2) = ?\\)",
          answer: "\\(-1\\)",
          method: "L'Hôpital: \\(1/(-\\sin x) \\to -1\\).",
        },
        {
          prompt: "\\(f(x) = \\dfrac{\\sqrt2\\cos x - 1}{\\pi/4 - x}\\), \\(x \\neq \\pi/4\\). \\(f(\\pi/4) = ?\\)",
          answer: "\\(1\\)",
          method: "\\((-\\sqrt2\\sin x)/(-1) \\to 1\\).",
        },
      ],
      pyqExampleId: "8ab31758-9146-431a-b11f-4a2e108389f5",
      traps: [
        {
          title: "Applying the quotient rule instead of L'Hôpital",
          body:
            "L'Hôpital differentiates the top and the bottom SEPARATELY. Differentiating the fraction as a whole is a different operation and gives a different, wrong number.",
        },
      ],
    },

    // 5 — 1^∞ in continuity
    {
      kind: "formula" as const,
      slug: "cetlim-one-to-infinity-in-continuity",
      name: "1^∞ in Continuity Problems: k = e^{…}",
      intuition:
        "When the formula is a power whose base \\(\\to 1\\) and exponent \\(\\to \\infty\\) at the point, the value that makes \\(f\\) continuous is \\(e\\) to a limit — and the option list is written as \\(e^{6}, e^{2}, e^{-6}, e^{-2}\\).",
      definition:
        "- \\(k = f(c) = \\lim f^{g} = e^{\\lim (f - 1)g}\\), the rule from the exponential page.\n" +
        "- Rational base: \\(\\left(\\dfrac{5x - 8}{8 - 3x}\\right)^{3/(2x - 4)}\\) at \\(x \\to 2\\): base \\(\\to 1\\), exponent \\(\\to \\infty\\); \\(f - 1 = \\dfrac{8x - 16}{8 - 3x}\\), and \\((f - 1)g = \\dfrac{3(8x - 16)}{(8 - 3x)(2x - 4)} = \\dfrac{24}{2(8 - 3x)} \\to \\dfrac{24}{4} = 6\\), so \\(k = e^{6}\\).\n" +
        "- Trigonometric base: \\(\\left(\\dfrac{1 + \\tan x}{1 + \\sin x}\\right)^{\\csc x}\\) at \\(0\\): \\(f - 1 = \\dfrac{\\tan x - \\sin x}{1 + \\sin x} \\sim \\dfrac{x^3}{2}\\), times \\(\\csc x \\sim \\dfrac{1}{x}\\) gives \\(\\to 0\\), so \\(k = e^{0} = 1\\).\n" +
        "- **Not \\(1^\\infty\\)**: \\(\\left(\\dfrac{4}{5}\\right)^{\\tan 4x/\\tan 5x}\\) at \\(\\dfrac{\\pi}{2}\\) has a fixed base; the exponent \\(\\to 0\\), so the limit is simply \\(1\\).",
      formula: {
        label: "The 1^∞ continuity value",
        latex:
          "f(c) = \\lim_{x\\to c} u(x)^{v(x)} = e^{\\lim_{x\\to c}(u - 1)\\,v} \\qquad (u \\to 1,\\ v \\to \\infty)",
      },
      authoredExample: {
        prompt: "\\(f(x) = (1 + 2x)^{1/x}\\) for \\(x \\neq 0\\) is continuous at \\(0\\). Find \\(f(0)\\).",
        steps: [
          "Base \\(\\to 1\\), exponent \\(\\to \\infty\\): \\(1^\\infty\\).",
          "\\((f - 1)g = 2x\\cdot\\dfrac{1}{x} = 2\\).",
          "\\(f(0) = e^{2}\\).",
        ],
        answer: "\\(f(0) = e^{2}\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = (1 + \\sin x)^{\\cot x}\\) for \\(x \\neq 0\\) is continuous at \\(0\\). Find \\(f(0)\\).",
        steps: [
          "\\(1^\\infty\\) form. \\((f - 1)g = \\sin x\\cot x = \\cos x \\to 1\\).",
          "\\(f(0) = e^{1}\\).",
        ],
        answer: "\\(f(0) = e\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = (1 + x)^{2/x}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(e^{2}\\)",
        },
        {
          prompt: "\\(f(x) = (1 + 3\\tan x)^{1/x}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(e^{3}\\)",
        },
        {
          prompt: "\\(f(x) = (\\cos x)^{1/x}\\), \\(x \\neq 0\\). \\(f(0) = ?\\)",
          answer: "\\(1\\)",
          method: "\\((\\cos x - 1)/x \\to 0\\).",
        },
        {
          prompt: "\\(f(x) = \\left(\\dfrac{x + 2}{x + 1}\\right)^{x}\\) as \\(x \\to \\infty\\) tends to?",
          answer: "\\(e\\)",
        },
      ],
      pyqExampleId: "756bfe73-9d34-4083-95a7-07151dc69888",
      traps: [
        {
          title: "A fixed base is not 1^∞",
          body:
            "\\(\\left(\\frac45\\right)^{\\tan 4x/\\tan 5x}\\) at \\(x \\to \\frac{\\pi}{2}\\): the exponent is \\(-\\tan 4h\\tan 5h \\to 0\\), so the power is \\(\\left(\\frac45\\right)^{0} = 1\\) and \\(k + \\frac25 = 1\\) gives \\(k = \\frac35\\). Reaching for \\(e^{\\dots}\\) here is the wrong tool.",
        },
      ],
    },

    // 6 — parameter inside the function
    {
      kind: "formula" as const,
      slug: "cetlim-parameter-inside-the-function",
      name: "The Parameter Inside the Function",
      intuition:
        "Sometimes the unknown is not \\(f(c)\\) but a constant buried inside the formula — \\(k\\) in \\(\\sin\\dfrac{x}{k}\\), or \\(a, b, c\\) in \\(\\dfrac{\\cos ax - \\cos bx}{\\cos cx - \\cos bx}\\). Evaluate the limit **with the parameter as a symbol**, equate to the given \\(f(c)\\), and solve.",
      definition:
        "- Carry the parameter through the standard limits: \\(\\sin\\dfrac{x}{k} \\sim \\dfrac{x}{k}\\), \\(1 - \\cos ax \\sim \\dfrac{a^2x^2}{2}\\), \\(\\dfrac{a^{x} - 1}{x} \\to \\log a\\).\n" +
        "- \\(\\dfrac{\\cos ax - \\cos bx}{\\cos cx - \\cos bx} \\to \\dfrac{b^2 - a^2}{b^2 - c^2}\\); setting this equal to \\(-1\\) gives \\(a^2 + c^2 = 2b^2\\) — \\(a^2, b^2, c^2\\) in **arithmetic progression**.\n" +
        "- The equation may be quadratic (\\(k^2 = 16\\), \\(a^2 = 2\\)); the stem or the options decide the sign.\n" +
        "- **Integral in the numerator**: \\(g(x) = \\dfrac{\\int_{3}^{f(x)} 3t^2\\,dt}{x - 3}\\) is \\(0/0\\) at \\(3\\) when \\(f(3) = 3\\); L'Hôpital with the fundamental theorem gives \\(3[f(x)]^2 f'(x) \\to 3\\cdot 9\\cdot f'(3)\\). Differentiate the integral by substituting the upper limit and multiplying by its derivative.",
      formula: {
        label: "Parameter through a standard limit",
        latex:
          "\\lim_{x\\to 0}\\frac{\\cos ax - \\cos bx}{\\cos cx - \\cos bx} = \\frac{b^2 - a^2}{b^2 - c^2} \\qquad \\frac{d}{dx}\\int_{c}^{u(x)}\\phi(t)\\,dt = \\phi(u(x))\\,u'(x)",
      },
      authoredExample: {
        prompt: "\\(f(x) = \\dfrac{\\cos ax - \\cos 3x}{x^2}\\) for \\(x \\neq 0\\) and \\(f(0) = 4\\) is continuous at \\(0\\). Find \\(a\\).",
        steps: [
          "\\(\\cos ax - \\cos 3x = (1 - \\cos 3x) - (1 - \\cos ax) \\sim \\dfrac{9x^2}{2} - \\dfrac{a^2x^2}{2}\\).",
          "Divide by \\(x^2\\): the limit is \\(\\dfrac{9 - a^2}{2}\\). Continuity: \\(\\dfrac{9 - a^2}{2} = 4\\).",
          "\\(9 - a^2 = 8 \\Rightarrow a^2 = 1 \\Rightarrow a = \\pm 1\\).",
        ],
        answer: "\\(a = \\pm 1\\)",
      },
      selfCheckExample: {
        prompt: "\\(f(x) = \\dfrac{1 - \\cos kx}{x\\sin x}\\) for \\(x \\neq 0\\) and \\(f(0) = 8\\) is continuous at \\(0\\). Find \\(k\\).",
        steps: [
          "\\(1 - \\cos kx \\sim \\dfrac{k^2x^2}{2}\\) and \\(x\\sin x \\sim x^2\\), so the limit is \\(\\dfrac{k^2}{2}\\).",
          "\\(\\dfrac{k^2}{2} = 8 \\Rightarrow k^2 = 16\\).",
        ],
        answer: "\\(k = \\pm 4\\)",
      },
      practiceSet: [
        {
          prompt: "\\(f(x) = \\dfrac{\\sin ax}{x}\\), \\(f(0) = 3\\), continuous at \\(0\\). \\(a = ?\\)",
          answer: "\\(3\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{e^{ax} - 1}{x}\\), \\(f(0) = 5\\), continuous at \\(0\\). \\(a = ?\\)",
          answer: "\\(5\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{\\log(1 + ax)}{2x}\\), \\(f(0) = 3\\), continuous at \\(0\\). \\(a = ?\\)",
          answer: "\\(6\\)",
        },
        {
          prompt: "\\(f(x) = \\dfrac{1 - \\cos ax}{x^2}\\), \\(f(0) = 2\\), continuous at \\(0\\). \\(a = ?\\)",
          answer: "\\(\\pm 2\\)",
        },
      ],
      pyqExampleId: "406694be-3fde-4161-8cf7-9dcba2ea4753",
      traps: [
        {
          title: "Differentiating the integral without the chain factor",
          body:
            "\(\dfrac{d}{dx}\int_{3}^{f(x)} 3t^2\,dt = 3[f(x)]^2\cdot f'(x)\). Dropping \(f'(x)\) gives \(3\cdot 9 = 27\); with it, \(27\cdot\frac{1}{27} = 1\). The chain factor is the whole question.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Exponential, Logarithmic and 1^∞ Limits — where the e^{…} rule is taught",
      href: "/notes/mht-cet-maths/limits/cetlim-exponential-log",
    },
    {
      label: "Trigonometric Limits — the shift to h → 0 in full",
      href: "/notes/mht-cet-maths/limits/cetlim-trigonometric",
    },
  ],
};
