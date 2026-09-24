import type { SubtopicNote } from "@/app/notes/_types";

export const TRIGONOMETRIC_LIMITS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Limits — sin x/x and the 1 − cos x Family",
  title: "Trigonometric Limits — sin x/x and the 1 − cos x Family",
  oneLineDefinition:
    "Every trigonometric limit at 0 reduces to two facts — sin x/x tends to 1 and (1 − cos x)/x² tends to ½ — once the argument is scaled and the point shifted to 0.",
  whyItMatters:
    "12 PYQs at 67% HARD — the hardest page in the chapter, and the one where the difficulty is real rather than clerical. " +
    "The pattern is fixed: rewrite with an identity, shift the point to 0 if it is not there already, then read off powers of x. " +
    "Three stems here are third-order — the first-order expansions cancel to 0/0 again — and those are exactly the questions that eat four minutes when you do not know to expand one order further.",
  concepts: [
    // 1 — sin x / x, tan x / x
    {
      kind: "formula" as const,
      slug: "cetlim-sin-x-over-x",
      name: "sin x/x, tan x/x and Scaled Arguments",
      intuition:
        "For a tiny angle, the arc and the chord are the same length: \\(\\sin x \\approx x\\), and equally \\(\\tan x \\approx x\\). So \\(\\sin(\\text{anything small})\\) may be replaced by that small thing whenever it sits in a ratio.",
      definition:
        "- \\(\\lim_{x\\to 0}\\dfrac{\\sin x}{x} = 1\\) and \\(\\lim_{x\\to 0}\\dfrac{\\tan x}{x} = 1\\); the reciprocals \\(\\dfrac{x}{\\sin x}\\), \\(\\dfrac{x}{\\tan x}\\) also tend to \\(1\\). The angle must be in **radians** and must tend to \\(0\\).\n" +
        "- **Scaled argument**: \\(\\dfrac{\\sin kx}{x} = k\\cdot\\dfrac{\\sin kx}{kx} \\to k\\). In general each \\(\\sin(\\square)\\) or \\(\\tan(\\square)\\) with \\(\\square \\to 0\\) may be replaced by \\(\\square\\) inside a product or quotient.\n" +
        "- \\(\\dfrac{\\sin ax}{\\sin bx} \\to \\dfrac{a}{b}\\), \\(\\dfrac{\\tan ax}{\\sin bx} \\to \\dfrac{a}{b}\\), \\(x\\cot kx = \\dfrac{x\\cos kx}{\\sin kx} \\to \\dfrac{1}{k}\\).\n" +
        "- **Count the powers of \\(x\\)** on each floor after replacement. If they match, the limit is the ratio of coefficients; if not, it is \\(0\\) or \\(\\infty\\).\n" +
        "- Replacement is only safe in **products and quotients**. In a **difference** like \\(\\tan x - \\sin x\\) the first-order terms cancel, and you need the next order (last concept on this page).",
      formula: {
        label: "The sine and tangent standard limits",
        latex:
          "\\lim_{x\\to 0}\\frac{\\sin x}{x} = 1 \\qquad \\lim_{x\\to 0}\\frac{\\tan x}{x} = 1 \\qquad \\lim_{x\\to 0}\\frac{\\sin kx}{x} = k \\qquad \\lim_{x\\to 0}\\frac{\\sin ax}{\\sin bx} = \\frac{a}{b}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\sin 5x}{\\tan 3x}\\).",
        steps: [
          "Both arguments tend to \\(0\\). Replace \\(\\sin 5x\\) by \\(5x\\) and \\(\\tan 3x\\) by \\(3x\\) — formally, write \\(\\dfrac{\\sin 5x}{5x}\\cdot\\dfrac{3x}{\\tan 3x}\\cdot\\dfrac{5x}{3x}\\).",
          "The first two factors tend to \\(1\\).",
          "The third is the constant \\(\\dfrac{5}{3}\\).",
        ],
        answer: "\\(\\dfrac{5}{3}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0} x\\cot 3x\\).",
        steps: [
          "\\(x\\cot 3x = \\dfrac{x\\cos 3x}{\\sin 3x}\\).",
          "Replace \\(\\sin 3x\\) by \\(3x\\): \\(\\dfrac{x\\cos 3x}{3x} = \\dfrac{\\cos 3x}{3}\\).",
          "\\(\\cos 3x \\to 1\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin 4x}{x} = ?\\)",
          answer: "\\(4\\)",
          method: "Scaled argument.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\tan 2x}{\\sin 5x} = ?\\)",
          answer: "\\(\\dfrac{2}{5}\\)",
          method: "Replace both by their arguments.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{x}{\\sin(x/2)} = ?\\)",
          answer: "\\(2\\)",
          method: "\\(\\sin(x/2) \\approx x/2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin^2 3x}{x^2} = ?\\)",
          answer: "\\(9\\)",
          method: "\\((\\sin 3x / x)^2 \\to 3^2\\).",
        },
      ],
      pyqExampleId: "e2837788-76fe-41ff-b9c5-eebe10a80fec",
      traps: [
        {
          title: "sin x/x → 1 only as x → 0",
          body:
            "As \\(x \\to \\infty\\), \\(\\dfrac{\\sin x}{x} \\to 0\\): the numerator stays between \\(-1\\) and \\(1\\) while the denominator grows. The standard limit is a statement about small angles, not about the function.",
        },
      ],
    },

    // 2 — 1 − cos x family
    {
      kind: "formula" as const,
      slug: "cetlim-one-minus-cos-family",
      name: "The 1 − cos x Family: (1 − cos kx)/x² = k²/2",
      intuition:
        "\\(1 - \\cos x\\) is second-order small — it behaves like \\(\\dfrac{x^2}{2}\\), not like \\(x\\). The identity \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\) is how that half arises: two factors of \\(\\sin(x/2) \\approx x/2\\).",
      definition:
        "- \\(1 - \\cos x = 2\\sin^2\\dfrac{x}{2}\\), hence \\(\\lim_{x\\to 0}\\dfrac{1 - \\cos x}{x^2} = \\dfrac{1}{2}\\).\n" +
        "- Scaled: \\(\\lim_{x\\to 0}\\dfrac{1 - \\cos kx}{x^2} = \\dfrac{k^2}{2}\\). So \\(1 - \\cos 2x \\sim 2x^2\\), \\(1 - \\cos 4x \\sim 8x^2\\), \\(1 - \\cos\\dfrac{x}{2} \\sim \\dfrac{x^2}{8}\\).\n" +
        "- Consequently \\(\\dfrac{1 - \\cos x}{x} \\to 0\\) and \\(\\dfrac{1 - \\cos x}{\\sin^2 x} \\to \\dfrac{1}{2}\\).\n" +
        "- \\(1 - \\cos 2x = 2\\sin^2 x\\) is the same identity with the angle doubled — the form the paper prefers.\n" +
        "- A product of two such brackets, \\((1 - \\cos\\frac{x}{2})(1 - \\cos\\frac{x}{4})\\), is fourth-order: \\(\\dfrac{x^2}{8}\\cdot\\dfrac{x^2}{32} = \\dfrac{x^4}{256}\\).",
      formula: {
        label: "1 − cos x and its scaling",
        latex:
          "1 - \\cos x = 2\\sin^2\\frac{x}{2} \\qquad \\lim_{x\\to 0}\\frac{1 - \\cos x}{x^2} = \\frac{1}{2} \\qquad \\lim_{x\\to 0}\\frac{1 - \\cos kx}{x^2} = \\frac{k^2}{2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{1 - \\cos 3x}{x\\sin 2x}\\).",
        steps: [
          "Numerator: \\(1 - \\cos 3x \\sim \\dfrac{9x^2}{2}\\).",
          "Denominator: \\(x\\sin 2x \\sim x\\cdot 2x = 2x^2\\).",
          "Powers of \\(x\\) match; the limit is \\(\\dfrac{9/2}{2} = \\dfrac{9}{4}\\).",
        ],
        answer: "\\(\\dfrac{9}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{1 - \\cos 2x}{1 - \\cos 4x}\\).",
        steps: [
          "\\(1 - \\cos 2x \\sim \\dfrac{4x^2}{2} = 2x^2\\) and \\(1 - \\cos 4x \\sim \\dfrac{16x^2}{2} = 8x^2\\).",
          "Ratio \\(\\dfrac{2x^2}{8x^2} = \\dfrac{1}{4}\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{1 - \\cos x}{x^2} = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{1 - \\cos 6x}{x^2} = ?\\)",
          answer: "\\(18\\)",
          method: "\\(k^2/2\\) with \\(k = 6\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{1 - \\cos x}{x} = ?\\)",
          answer: "\\(0\\)",
          method: "Second-order over first-order.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{1 - \\cos x}{\\sin^2 x} = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
          method: "\\(\\sin^2 x \\sim x^2\\).",
        },
      ],
      pyqExampleId: "91637338-116f-418a-b0a0-c5a2f355e61d",
      traps: [
        {
          title: "Treating 1 − cos x as first order",
          body:
            "\\(\\dfrac{1 - \\cos x}{x}\\) is \\(0\\), not \\(1\\) and not \\(\\frac12\\). The \\(\\frac12\\) belongs with \\(x^2\\) in the denominator. Count the power of \\(x\\) below before you write the constant.",
        },
      ],
    },

    // 3 — identity first
    {
      kind: "formula" as const,
      slug: "cetlim-identity-before-limit",
      name: "Rewrite with an Identity Before Taking the Limit",
      intuition:
        "Half the HARD trigonometric limits are hard only because the standard form is hidden behind an identity: \\(\\sin(\\pi\\cos^2 x)\\) is \\(\\sin(\\pi\\sin^2 x)\\) in disguise, and \\(\\cos 3x - \\cos 5x\\) is a product of two sines. Do the trigonometry first, the limit second.",
      definition:
        "- \\(\\sin(\\pi - \\theta) = \\sin\\theta\\): so \\(\\sin(\\pi\\cos^2 x) = \\sin(\\pi - \\pi\\sin^2 x) = \\sin(\\pi\\sin^2 x)\\), whose argument **does** tend to \\(0\\).\n" +
        "- \\(\\cos A - \\cos B = -2\\sin\\dfrac{A + B}{2}\\sin\\dfrac{A - B}{2}\\): turns a difference of cosines into a product of two small sines, each replaceable by its argument.\n" +
        "- \\(\\sqrt{2 - 2\\cos\\phi} = \\sqrt{4\\sin^2\\frac{\\phi}{2}} = 2\\left|\\sin\\dfrac{\\phi}{2}\\right|\\) — note the modulus.\n" +
        "- \\(1 + x\\sin x - \\cos x = 2\\sin^2\\dfrac{x}{2} + x\\sin x \\sim \\dfrac{x^2}{2} + x^2 = \\dfrac{3x^2}{2}\\): split into pieces you already know the order of.\n" +
        "- A **factorisable argument** such as \\(x^2 - 12x + 35 = (x - 5)(x - 7)\\) is what makes \\(\\dfrac{\\sin(\\text{that})}{x - 5}\\) finite: one factor cancels, the other is evaluated.",
      formula: {
        label: "Identities that expose a standard form",
        latex:
          "\\sin(\\pi - \\theta) = \\sin\\theta \\qquad \\cos A - \\cos B = -2\\sin\\frac{A + B}{2}\\sin\\frac{A - B}{2} \\qquad \\sqrt{2 - 2\\cos\\phi} = 2\\left|\\sin\\frac{\\phi}{2}\\right|",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\cos 3x - \\cos 5x}{x^2}\\).",
        steps: [
          "\\(\\cos 3x - \\cos 5x = -2\\sin 4x\\sin(-x) = 2\\sin 4x\\sin x\\).",
          "Replace each sine by its argument: \\(2\\cdot 4x\\cdot x = 8x^2\\).",
          "Divide by \\(x^2\\): \\(8\\).",
        ],
        answer: "\\(8\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\sin(2\\pi\\cos^2 x)}{x^2}\\).",
        steps: [
          "\\(2\\pi\\cos^2 x = 2\\pi - 2\\pi\\sin^2 x\\), and \\(\\sin(2\\pi - \\theta) = -\\sin\\theta\\), so the numerator is \\(-\\sin(2\\pi\\sin^2 x)\\).",
          "Its argument \\(2\\pi\\sin^2 x \\to 0\\), so replace: \\(-2\\pi\\sin^2 x \\sim -2\\pi x^2\\).",
          "Divide by \\(x^2\\): \\(-2\\pi\\).",
        ],
        answer: "\\(-2\\pi\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\cos 2x - \\cos 4x}{x^2} = ?\\)",
          answer: "\\(6\\)",
          method: "\\(2\\sin 3x\\sin x \\sim 6x^2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin(\\pi - x)}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(\\sin(\\pi - x) = \\sin x\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^+}\\dfrac{\\sqrt{2 - 2\\cos x}}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(2\\sin(x/2)/x\\) for \\(x > 0\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\cos x - \\cos 3x}{x^2} = ?\\)",
          answer: "\\(4\\)",
          method: "\\(2\\sin 2x\\sin x \\sim 4x^2\\).",
        },
      ],
      pyqExampleId: "51a0349e-6478-49b0-a755-082f12de0c68",
      traps: [
        {
          title: "√(2 − 2cos φ) is 2|sin(φ/2)|, and the modulus decides the sides",
          body:
            "In \\(\\dfrac{\\sqrt{2 - 2\\cos(x^2 - 12x + 35)}}{x - 5}\\) the argument \\((x - 5)(x - 7)\\) is negative just right of \\(5\\) and positive just left, so the left limit is \\(-2\\) and the right limit \\(+2\\). " +
            "The official key drops the modulus and answers \\(-2\\), as the textbook convention does — on the paper, answer \\(-2\\); in your own understanding, know the two-sided limit does not exist.",
        },
        {
          title: "cos²x does not tend to 0",
          body:
            "\\(\\sin(\\pi\\cos^2 x)\\) cannot be replaced by \\(\\pi\\cos^2 x\\) — that argument tends to \\(\\pi\\), not \\(0\\). Use \\(\\sin(\\pi - \\theta) = \\sin\\theta\\) to move to \\(\\pi\\sin^2 x\\) first.",
        },
      ],
    },

    // 4 — shift to h
    {
      kind: "formula" as const,
      slug: "cetlim-shift-the-point-to-zero",
      name: "Shift the Variable: Limits at π/2 and Other Non-Zero Points",
      intuition:
        "The standard limits live at \\(0\\). A limit at \\(\\dfrac{\\pi}{2}\\) is brought home by writing \\(x = \\dfrac{\\pi}{2} - h\\): as \\(x \\to \\dfrac{\\pi}{2}\\), \\(h \\to 0\\), and every trigonometric function of \\(x\\) becomes its co-function of \\(h\\).",
      definition:
        "- Put \\(x = \\dfrac{\\pi}{2} - h\\). Then \\(\\sin x = \\cos h\\), \\(\\cos x = \\sin h\\), \\(\\tan x = \\cot h\\), \\(\\cot x = \\tan h\\), and \\(\\pi - 2x = 2h\\).\n" +
        "- Put \\(x = \\dfrac{\\pi}{2} + h\\) instead if the stem's form suggests it: \\(\\sin x = \\cos h\\), \\(\\cos x = -\\sin h\\), \\(\\cot x = -\\tan h\\), \\(\\pi - 2x = -2h\\). Either works; signs must be tracked.\n" +
        "- At \\(x \\to \\pi\\): \\(x = \\pi + h\\) gives \\(\\sin x = -\\sin h\\), \\(\\cos x = -\\cos h\\), so \\(1 + \\cos x = 1 - \\cos h\\).\n" +
        "- At \\(x \\to 1\\) with a \\(\\cos(\\pi x)\\): \\(x = 1 - h\\) gives \\(\\cos(\\pi - \\pi h) = -\\cos\\pi h\\), so \\(1 + \\cos\\pi x = 1 - \\cos\\pi h \\sim \\dfrac{\\pi^2 h^2}{2}\\).\n" +
        "- Powers: \\((\\pi - 2x)^3 = 8h^3\\) and \\((\\pi - 2x)^4 = 16h^4\\) — the constant is raised to the power too.\n" +
        "- After the shift, everything is a product of \\(\\sin h\\), \\(1 - \\cos h\\), \\(\\tan h\\) and powers of \\(h\\): count orders and read off the constant.",
      formula: {
        label: "The π/2 shift",
        latex:
          "x = \\tfrac{\\pi}{2} - h:\\quad \\sin x = \\cos h,\\ \\ \\cos x = \\sin h,\\ \\ \\cot x = \\tan h,\\ \\ \\pi - 2x = 2h,\\ \\ 1 - \\sin x = 1 - \\cos h \\sim \\tfrac{h^2}{2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\pi/2}\\dfrac{1 - \\sin x}{(\\pi - 2x)^2}\\).",
        steps: [
          "Put \\(x = \\dfrac{\\pi}{2} - h\\): \\(1 - \\sin x = 1 - \\cos h\\) and \\(\\pi - 2x = 2h\\).",
          "Expression: \\(\\dfrac{1 - \\cos h}{4h^2}\\).",
          "\\(\\dfrac{1 - \\cos h}{h^2} \\to \\dfrac{1}{2}\\), so the limit is \\(\\dfrac{1}{2}\\cdot\\dfrac{1}{4} = \\dfrac{1}{8}\\).",
        ],
        answer: "\\(\\dfrac{1}{8}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\pi}\\dfrac{1 + \\cos x}{(x - \\pi)^2}\\).",
        steps: [
          "Put \\(x = \\pi + h\\): \\(\\cos x = \\cos(\\pi + h) = -\\cos h\\), so \\(1 + \\cos x = 1 - \\cos h\\); and \\(x - \\pi = h\\).",
          "Expression: \\(\\dfrac{1 - \\cos h}{h^2}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to\\pi/2}\\dfrac{\\cos x}{\\pi/2 - x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(\\sin h / h\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\pi/2}\\left(\\tfrac{\\pi}{2} - x\\right)\\tan x = ?\\)",
          answer: "\\(1\\)",
          method: "\\(h\\cot h \\to 1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\pi}\\dfrac{\\sin x}{\\pi - x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(\\sin(\\pi - h) = \\sin h\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to\\pi/4}\\dfrac{\\sin x - \\cos x}{x - \\pi/4} = ?\\)",
          answer: "\\(\\sqrt2\\)",
          method: "Derivative of \\(\\sin x - \\cos x\\) at \\(\\pi/4\\): \\(\\cos + \\sin = \\sqrt2\\).",
        },
      ],
      pyqExampleId: "42e7c410-6655-4760-9083-4b1d8305487a",
      traps: [
        {
          title: "(π − 2x)³ is 8h³, not h³",
          body:
            "The factor \\(2\\) is cubed along with \\(h\\). Forgetting it multiplies the answer by \\(8\\), and \\(\\dfrac{1}{2}\\) instead of \\(\\dfrac{1}{16}\\) is always among the options.",
        },
      ],
    },

    // 5 — degrees
    {
      kind: "formula" as const,
      slug: "cetlim-degrees-not-radians",
      name: "Degrees Are Not Radians",
      intuition:
        "\\(\\sin x/x \\to 1\\) is a radian statement. A degree is a much smaller angle — \\(\\dfrac{\\pi}{180}\\) of a radian — so \\(\\sin x^\\circ\\) is roughly \\(\\dfrac{\\pi x}{180}\\), and every standard limit picks up that factor.",
      definition:
        "- \\(x^\\circ = \\dfrac{\\pi x}{180}\\) radians. Convert **inside** every trigonometric function before using any standard limit.\n" +
        "- \\(\\lim_{x\\to 0}\\dfrac{\\sin x^\\circ}{x} = \\dfrac{\\pi}{180}\\), \\(\\lim_{x\\to 0}\\dfrac{\\tan x^\\circ}{x} = \\dfrac{\\pi}{180}\\), \\(\\lim_{x\\to 0}\\dfrac{1 - \\cos x^\\circ}{x^2} = \\dfrac{1}{2}\\left(\\dfrac{\\pi}{180}\\right)^2\\).\n" +
        "- Differences of cosines in degrees combine both ideas: \\(\\dfrac{\\cos mx^\\circ - \\cos nx^\\circ}{x^2} \\to \\dfrac{(n^2 - m^2)\\pi^2}{2\\cdot 180^2}\\).\n" +
        "- The answer to a degree question always carries \\(\\pi\\) and a power of \\(180\\) (or a divisor of it); an answer without \\(\\pi\\) has ignored the degree sign.",
      formula: {
        label: "Degree conversion in a limit",
        latex:
          "x^\\circ = \\frac{\\pi x}{180}\\ \\text{rad} \\qquad \\lim_{x\\to 0}\\frac{\\sin x^\\circ}{x} = \\frac{\\pi}{180} \\qquad \\lim_{x\\to 0}\\frac{1 - \\cos x^\\circ}{x^2} = \\frac{\\pi^2}{2\\cdot 180^2}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\sin x^\\circ}{x}\\).",
        steps: [
          "Convert: \\(\\sin x^\\circ = \\sin\\dfrac{\\pi x}{180}\\).",
          "Scaled argument: \\(\\dfrac{\\sin(\\pi x/180)}{x} = \\dfrac{\\pi}{180}\\cdot\\dfrac{\\sin(\\pi x/180)}{\\pi x/180}\\).",
          "The second factor \\(\\to 1\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{180}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{1 - \\cos x^\\circ}{x^2}\\).",
        steps: [
          "\\(1 - \\cos x^\\circ = 1 - \\cos\\dfrac{\\pi x}{180} \\sim \\dfrac{1}{2}\\left(\\dfrac{\\pi x}{180}\\right)^2\\).",
          "Divide by \\(x^2\\): \\(\\dfrac{\\pi^2}{2\\cdot 32400} = \\dfrac{\\pi^2}{64800}\\).",
        ],
        answer: "\\(\\dfrac{\\pi^2}{64800}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\tan x^\\circ}{x} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{180}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin 2x^\\circ}{x} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{90}\\)",
          method: "\\(2\\pi/180\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin x^\\circ}{\\sin x} = ?\\)",
          answer: "\\(\\dfrac{\\pi}{180}\\)",
          method: "Each sine replaced by its radian argument.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin x^\\circ}{x^\\circ} = ?\\)",
          answer: "\\(1\\)",
          method: "Same angle top and bottom — the units cancel.",
        },
      ],
      pyqExampleId: "dce8c173-b05c-46f6-a6e4-9198a0d5436c",
      traps: [
        {
          title: "Dropping the degree sign",
          body:
            "\\(\\dfrac{\\cos 7x^\\circ - \\cos 2x^\\circ}{x^2}\\) is \\(-\\dfrac{\\pi^2}{1440}\\); the radian version would be \\(-\\dfrac{45}{2}\\), which is the first distractor. If the stem prints a small circle, the answer has a \\(\\pi\\) in it.",
        },
      ],
    },

    // 6 — higher-order expansions
    {
      kind: "formula" as const,
      slug: "cetlim-expand-to-the-needed-order",
      name: "Higher-Order Forms: Expand to the Needed Power",
      intuition:
        "When the first-order pieces cancel — \\(\\tan x - \\sin x\\), \\(x\\tan 2x - 2x\\tan x\\) — the limit lives in the \\(x^3\\) terms. Carrying one more term of each series is faster and safer than three rounds of L'Hôpital.",
      definition:
        "- Series to memorise: \\(\\sin x = x - \\dfrac{x^3}{6} + \\dots\\), \\(\\tan x = x + \\dfrac{x^3}{3} + \\dots\\), \\(\\cos x = 1 - \\dfrac{x^2}{2} + \\dfrac{x^4}{24} - \\dots\\), \\(e^x = 1 + x + \\dfrac{x^2}{2} + \\dots\\), \\(\\log(1 + x) = x - \\dfrac{x^2}{2} + \\dots\\).\n" +
        "- **Rule**: expand every term to the order of the denominator, and no further. A denominator of \\(x^3\\) needs cubic terms; \\(x^4\\) needs quartic terms.\n" +
        "- Scaled arguments scale the series: \\(\\tan 2x = 2x + \\dfrac{(2x)^3}{3} = 2x + \\dfrac{8x^3}{3}\\).\n" +
        "- Differences of standard forms: \\(\\tan x - \\sin x \\sim \\dfrac{x^3}{2}\\), \\(x - \\sin x \\sim \\dfrac{x^3}{6}\\), \\(\\tan x - x \\sim \\dfrac{x^3}{3}\\), \\(e^x - 1 - x \\sim \\dfrac{x^2}{2}\\).\n" +
        "- Without series: \\(\\tan h - \\sin h = \\tan h\\,(1 - \\cos h)\\) — a product of first- and second-order pieces, which is often the cleaner route on the paper.",
      formula: {
        label: "Series to the third order",
        latex:
          "\\sin x = x - \\frac{x^3}{6} + \\dots \\qquad \\tan x = x + \\frac{x^3}{3} + \\dots \\qquad \\cos x = 1 - \\frac{x^2}{2} + \\frac{x^4}{24} - \\dots \\qquad e^x = 1 + x + \\frac{x^2}{2} + \\dots",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\tan x - \\sin x}{x^3}\\).",
        steps: [
          "The denominator is cubic, so expand to \\(x^3\\): \\(\\tan x = x + \\dfrac{x^3}{3}\\), \\(\\sin x = x - \\dfrac{x^3}{6}\\).",
          "Difference: \\(\\dfrac{x^3}{3} + \\dfrac{x^3}{6} = \\dfrac{x^3}{2}\\). The first-order terms cancelled — that is why the series was needed.",
          "Divide by \\(x^3\\): \\(\\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{x - \\sin x}{x^3}\\).",
        steps: [
          "\\(\\sin x = x - \\dfrac{x^3}{6} + \\dots\\), so \\(x - \\sin x = \\dfrac{x^3}{6} + \\dots\\).",
          "Divide by \\(x^3\\).",
        ],
        answer: "\\(\\dfrac{1}{6}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sin x - x}{x^3} = ?\\)",
          answer: "\\(-\\dfrac{1}{6}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\tan x - x}{x^3} = ?\\)",
          answer: "\\(\\dfrac{1}{3}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^x - 1 - x}{x^2} = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\cos x - 1 + x^2/2}{x^4} = ?\\)",
          answer: "\\(\\dfrac{1}{24}\\)",
          method: "The quartic term of \\(\\cos x\\).",
        },
      ],
      pyqExampleId: "4dd0e45b-e2e3-4072-89db-6982c534369b",
      traps: [
        {
          title: "Stopping at first order and getting 0/0 again",
          body:
            "\\(\\dfrac{x\\tan 2x - 2x\\tan x}{(1 - \\cos 2x)^2}\\): first order gives \\(2x^2 - 2x^2 = 0\\) on top. Go to third order — \\(x\\left(2x + \\frac{8x^3}{3}\\right) - 2x\\left(x + \\frac{x^3}{3}\\right) = 2x^4\\) — against \\((2x^2)^2 = 4x^4\\) below, and the limit is \\(\\dfrac{1}{2}\\). The cancellation is the signal to expand further, not to answer \\(0\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Exponential, Logarithmic and 1^∞ Limits — the other family of standard forms",
      href: "/notes/mht-cet-maths/limits/cetlim-exponential-log",
    },
  ],
};
