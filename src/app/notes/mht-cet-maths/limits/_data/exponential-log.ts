import type { SubtopicNote } from "@/app/notes/_types";

export const EXPONENTIAL_LOG_LIMITS_NOTE: SubtopicNote = {
  subtopicName: "Exponential, Logarithmic and 1^∞ Limits",
  title: "Exponential, Logarithmic and 1^∞ Limits",
  oneLineDefinition:
    "Three standard limits — (aˣ − 1)/x → log a, log(1 + x)/x → 1 and (1 + x)^(1/x) → e — plus the algebra that reduces a stem to them.",
  whyItMatters:
    "11 PYQs at 64% HARD, and the single most productive page for marks per formula: five of the eleven are one factorisation or one substitution away from (aˣ − 1)/x. " +
    "The 1 to the power infinity form appears both here and, more often, wearing a continuity costume on the next page — learn e to the power of the limit of (f − 1)g once and it answers both. " +
    "In the CET bank and textbook log means the natural logarithm; a base is written only when it is not e.",
  concepts: [
    // 1 — the standard limits
    {
      kind: "formula" as const,
      slug: "cetlim-exp-log-standard-limits",
      name: "The Exponential and Logarithmic Standard Limits",
      intuition:
        "Near \\(0\\), \\(a^x - 1\\) grows like \\(x\\log a\\) — the slope of \\(a^x\\) at the origin — and \\(\\log(1 + x)\\) grows like \\(x\\). Each standard limit is one of these slopes.",
      definition:
        "- \\(\\lim_{x\\to 0}\\dfrac{a^x - 1}{x} = \\log a\\); in particular \\(\\lim_{x\\to 0}\\dfrac{e^x - 1}{x} = 1\\).\n" +
        "- \\(\\lim_{x\\to 0}\\dfrac{\\log(1 + x)}{x} = 1\\), and scaled: \\(\\lim_{x\\to 0}\\dfrac{\\log(1 + kx)}{x} = k\\), \\(\\lim_{x\\to 0}\\dfrac{\\log(1 + x^2/3)}{x^2} = \\dfrac{1}{3}\\).\n" +
        "- **Replacement rule**, exactly as for \\(\\sin\\): inside a product or quotient, \\(a^{\\square} - 1 \\to \\square\\log a\\), \\(e^{\\square} - 1 \\to \\square\\), \\(\\log(1 + \\square) \\to \\square\\) whenever \\(\\square \\to 0\\).\n" +
        "- Then **count powers of \\(x\\)** on each floor; matched powers give a finite constant, mismatched give \\(0\\) or \\(\\infty\\).\n" +
        "- \\(\\log a - \\log b = \\log\\dfrac{a}{b}\\) and \\(\\log a^2 = 2\\log a\\) are how the option list is written — reduce your answer to a single log.",
      formula: {
        label: "Exponential and logarithmic standard limits",
        latex:
          "\\lim_{x\\to 0}\\frac{a^x - 1}{x} = \\log a \\qquad \\lim_{x\\to 0}\\frac{e^x - 1}{x} = 1 \\qquad \\lim_{x\\to 0}\\frac{\\log(1 + x)}{x} = 1 \\qquad \\lim_{x\\to 0}\\frac{\\log(1 + kx)}{x} = k",
        symbols: [{ symbol: "\\(\\log\\)", meaning: "natural logarithm (base \\(e\\))" }],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{3^x - 1}{2^x - 1}\\).",
        steps: [
          "Divide top and bottom by \\(x\\): \\(\\dfrac{(3^x - 1)/x}{(2^x - 1)/x}\\).",
          "Each is a standard limit: numerator \\(\\to \\log 3\\), denominator \\(\\to \\log 2\\).",
        ],
        answer: "\\(\\dfrac{\\log 3}{\\log 2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{e^{2x} - 1}{\\log(1 + 3x)}\\).",
        steps: [
          "Replace: \\(e^{2x} - 1 \\sim 2x\\) and \\(\\log(1 + 3x) \\sim 3x\\).",
          "Ratio \\(\\dfrac{2x}{3x} = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\dfrac{2}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{5^x - 1}{x} = ?\\)",
          answer: "\\(\\log 5\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{3x} - 1}{x} = ?\\)",
          answer: "\\(3\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\log(1 + 4x)}{x} = ?\\)",
          answer: "\\(4\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{2^x - 1}{\\sin x} = ?\\)",
          answer: "\\(\\log 2\\)",
          method: "\\(\\sin x \\sim x\\).",
        },
      ],
      pyqExampleId: "1cde3603-2d40-464b-b1e3-d9a823d08d5c",
      traps: [
        {
          title: "(aˣ − 1)/x is log a, never a",
          body:
            "The limit is the slope of \\(a^x\\) at \\(0\\), which is \\(\\log a\\). An option reading \\(\\dfrac{3}{2}\\) where \\(\\log\\dfrac{3}{2}\\) is correct is the standard distractor.",
        },
      ],
    },

    // 2 — factorising exponentials
    {
      kind: "formula" as const,
      slug: "cetlim-factorise-exponential-sums",
      name: "Factorising aˣ − bˣ − cˣ + 1 into (bˣ − 1)(cˣ − 1)",
      intuition:
        "\\(63^x = 9^x\\cdot 7^x\\). So \\(63^x - 9^x - 7^x + 1\\) is \\(9^x\\cdot7^x - 9^x - 7^x + 1\\), which factors by grouping into \\((9^x - 1)(7^x - 1)\\) — two standard limits multiplied together.",
      definition:
        "- Whenever the first base is the **product** of the other two: \\((bc)^x - b^x - c^x + 1 = (b^x - 1)(c^x - 1)\\).\n" +
        "- The product is **second order** in \\(x\\): \\((b^x - 1)(c^x - 1) \\sim x^2\\log b\\log c\\). So it pairs with an \\(x^2\\), an \\(x\\sin x\\), or a \\(1 - \\cos x\\) below.\n" +
        "- Variants: \\(a^x - b^x = (a^x - 1) - (b^x - 1) \\sim x(\\log a - \\log b) = x\\log\\dfrac{a}{b}\\); and \\(10^x + 7^x - 14^x - 5^x = -(2^x - 1)(7^x - 5^x)\\)... check the grouping by expanding it back.\n" +
        "- \\(1^x\\) in a stem is just \\(1\\): \\(8^x - 4^x - 2^x + 1^x = (4^x - 1)(2^x - 1)\\).",
      formula: {
        label: "Grouping factorisation",
        latex:
          "(bc)^x - b^x - c^x + 1 = (b^x - 1)(c^x - 1) \\sim x^2\\,\\log b\\,\\log c",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{6^x - 3^x - 2^x + 1}{x^2}\\).",
        steps: [
          "\\(6 = 3\\cdot 2\\), so group: \\(6^x - 3^x - 2^x + 1 = 3^x(2^x - 1) - (2^x - 1) = (3^x - 1)(2^x - 1)\\).",
          "Split the \\(x^2\\): \\(\\dfrac{3^x - 1}{x}\\cdot\\dfrac{2^x - 1}{x}\\).",
          "Each factor is a standard limit: \\(\\log 3\\cdot\\log 2\\).",
        ],
        answer: "\\(\\log 3\\,\\log 2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{12^x - 4^x - 3^x + 1}{x\\sin x}\\).",
        steps: [
          "\\(12 = 4\\cdot 3\\): numerator \\(= (4^x - 1)(3^x - 1)\\).",
          "Denominator \\(x\\sin x \\sim x^2\\).",
          "Limit \\(= \\log 4\\cdot\\log 3\\).",
        ],
        answer: "\\(\\log 4\\,\\log 3\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{10^x - 2^x - 5^x + 1}{x^2} = ?\\)",
          answer: "\\(\\log 2\\,\\log 5\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{2x} - 2e^x + 1}{x^2} = ?\\)",
          answer: "\\(1\\)",
          method: "\\((e^x - 1)^2 / x^2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{4^x - 2^x}{x} = ?\\)",
          answer: "\\(\\log 2\\)",
          method: "\\(\\log 4 - \\log 2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{9^x - 2\\cdot 3^x + 1}{x^2} = ?\\)",
          answer: "\\((\\log 3)^2\\)",
          method: "\\((3^x - 1)^2\\).",
        },
      ],
      pyqExampleId: "845ecefc-7515-4738-8076-64e4fa1c3fb1",
      traps: [
        {
          title: "Sending each term to its own limit",
          body:
            "\\(63^x - 9^x - 7^x + 1 \\to 1 - 1 - 1 + 1 = 0\\) tells you the form is \\(0/0\\) and nothing else. The value comes from the factorised product, and it is second order — pair it with \\(x^2\\) or \\(1 - \\cos x\\), not with \\(x\\).",
        },
      ],
    },

    // 3 — substitute t = a^x
    {
      kind: "formula" as const,
      slug: "cetlim-substitute-t-equals-a-to-the-x",
      name: "Substitute t = aˣ When the Exponents Are Mixed",
      intuition:
        "\\(5^x\\), \\(5^{3 - x}\\) and \\(5^{x/2}\\) are all powers of one thing. Call \\(5^{x/2} = t\\) and the whole limit becomes a rational function of \\(t\\) — a factor-and-cancel problem from the algebraic page.",
      definition:
        "- Choose \\(t\\) as the **smallest power** present so that every other exponential is an integer power of \\(t\\): with \\(5^{x/2} = t\\), \\(5^x = t^2\\) and \\(5^{3 - x} = \\dfrac{125}{t^2}\\).\n" +
        "- Translate the point: \\(x \\to 2\\) becomes \\(t \\to 5\\).\n" +
        "- Clear the fractions in \\(t\\), factor the polynomial (it vanishes at the new point), cancel, substitute — or use the derivative-in-disguise reading on the \\(t\\)-expression.\n" +
        "- Same idea for \\(4^x\\) with \\(2^x\\): put \\(2^x = t\\), so \\(4^x = t^2\\) and \\(2^{x + 1} = 2t\\).",
      formula: {
        label: "Exponential substitution",
        latex:
          "t = a^{x/k}\\ \\Rightarrow\\ a^{x} = t^{k},\\quad a^{c - x} = \\frac{a^{c}}{t^{k}},\\qquad x \\to x_0 \\iff t \\to a^{x_0/k}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 1}\\dfrac{4^x - 2^{x + 1}}{2^x - 2}\\).",
        steps: [
          "Put \\(t = 2^x\\), so \\(4^x = t^2\\) and \\(2^{x + 1} = 2t\\); as \\(x \\to 1\\), \\(t \\to 2\\).",
          "Expression: \\(\\dfrac{t^2 - 2t}{t - 2} = \\dfrac{t(t - 2)}{t - 2} = t\\).",
          "As \\(t \\to 2\\) the limit is \\(2\\).",
        ],
        answer: "\\(2\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 1}\\dfrac{9^x - 3^{x + 1}}{3^x - 3}\\).",
        steps: [
          "Put \\(t = 3^x \\to 3\\): \\(9^x = t^2\\), \\(3^{x + 1} = 3t\\).",
          "\\(\\dfrac{t^2 - 3t}{t - 3} = t\\).",
        ],
        answer: "\\(3\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{4^x - 1}{2^x - 1} = ?\\)",
          answer: "\\(2\\)",
          method: "\\(t = 2^x\\): \\((t^2 - 1)/(t - 1) = t + 1 \\to 2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{2x} - 1}{e^x - 1} = ?\\)",
          answer: "\\(2\\)",
          method: "\\(t = e^x\\): \\(t + 1 \\to 2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 2}\\dfrac{2^x - 4}{x - 2} = ?\\)",
          answer: "\\(4\\log 2\\)",
          method: "Derivative of \\(2^x\\) at \\(2\\).",
        },
        {
          prompt: "With \\(t = 5^{x/2}\\) and \\(x \\to 2\\), \\(t \\to ?\\)",
          answer: "\\(5\\)",
        },
      ],
      pyqExampleId: "4dff0b96-f8de-40e0-b465-2d1e3593504e",
      traps: [
        {
          title: "Choosing t too large",
          body:
            "Putting \\(t = 5^x\\) leaves \\(5^{x/2} = \\sqrt{t}\\), a surd that needs rationalising. Choosing the SMALLEST power as \\(t\\) keeps everything polynomial.",
        },
      ],
    },

    // 4 — composite forms
    {
      kind: "formula" as const,
      slug: "cetlim-composite-exponential-forms",
      name: "Composite Forms: (eᵘ − 1)/u with u → 0, and Mixed Series Terms",
      intuition:
        "\\(e^{\\tan x} - e^{x}\\) is not a standard form until you factor out \\(e^{x}\\): then it is \\(e^{x}(e^{u} - 1)\\) with \\(u = \\tan x - x \\to 0\\), and \\(\\dfrac{e^{u} - 1}{u} \\to 1\\) even though \\(u\\) is a complicated function.",
      definition:
        "- \\(e^{a} - e^{b} = e^{b}(e^{a - b} - 1)\\), and \\(\\dfrac{e^{a - b} - 1}{a - b} \\to 1\\) whenever \\(a - b \\to 0\\). This kills any \\(\\dfrac{e^{f(x)} - e^{g(x)}}{f(x) - g(x)}\\) instantly.\n" +
        "- The same rule for any inner function: \\(\\dfrac{e^{x^2} - 1}{x^2} \\to 1\\), \\(\\dfrac{e^{\\sin x} - 1}{\\sin x} \\to 1\\), \\(\\dfrac{e^{5\\sqrt{x}} - 1}{5\\sqrt{x}} \\to 1\\).\n" +
        "- **Mixed numerators** like \\(e^{x^2} - \\cos 3x\\): add and subtract \\(1\\) to split into \\((e^{x^2} - 1) + (1 - \\cos 3x)\\), each a known order — \\(x^2\\) and \\(\\dfrac{9x^2}{2}\\).\n" +
        "- Then the denominator's pieces are replaced the same way: \\(\\sin x\\log(1 + 2x) \\sim x\\cdot 2x = 2x^2\\).",
      formula: {
        label: "Composite exponential forms",
        latex:
          "e^{a} - e^{b} = e^{b}\\left(e^{a - b} - 1\\right) \\qquad \\lim_{u\\to 0}\\frac{e^{u} - 1}{u} = 1 \\ \\text{ for any } u = u(x) \\to 0",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{e^{\\sin x} - e^{x}}{\\sin x - x}\\).",
        steps: [
          "Factor: \\(e^{\\sin x} - e^{x} = e^{x}\\left(e^{\\sin x - x} - 1\\right)\\).",
          "Let \\(u = \\sin x - x\\); as \\(x \\to 0\\), \\(u \\to 0\\). The expression is \\(e^{x}\\cdot\\dfrac{e^{u} - 1}{u}\\).",
          "\\(e^{x} \\to 1\\) and \\(\\dfrac{e^{u} - 1}{u} \\to 1\\).",
        ],
        answer: "\\(1\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{e^{2x^2} - \\cos 2x}{x^2}\\).",
        steps: [
          "Split: \\(e^{2x^2} - \\cos 2x = (e^{2x^2} - 1) + (1 - \\cos 2x)\\).",
          "\\(e^{2x^2} - 1 \\sim 2x^2\\) and \\(1 - \\cos 2x \\sim \\dfrac{4x^2}{2} = 2x^2\\).",
          "Total \\(4x^2\\); divide by \\(x^2\\).",
        ],
        answer: "\\(4\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{x^2} - 1}{x^2} = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{\\sin x} - 1}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(\\sin x \\sim x\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{3x} - e^{x}}{x} = ?\\)",
          answer: "\\(2\\)",
          method: "\\(e^{x}(e^{2x} - 1)/x \\to 2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{x} - \\cos x}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\((e^x - 1)/x \\to 1\\), \\((1 - \\cos x)/x \\to 0\\).",
        },
      ],
      pyqExampleId: "116ddb89-ca90-4bac-9ba1-ade529dc3551",
      traps: [
        {
          title: "Using only first order on eˣ² − cos x",
          body:
            "\\(\\dfrac{e^{x^2} - \\cos x}{x^2}\\) needs the \\(x^2\\) term of BOTH series: \\(x^2\\) from \\(e^{x^2}\\) and \\(\\dfrac{x^2}{2}\\) from \\(\\cos x\\), giving \\(\\dfrac{3}{2}\\). Dropping the cosine's \\(\\frac12\\) gives \\(1\\), which is among the options.",
        },
      ],
    },

    // 5 — 1^∞
    {
      kind: "formula" as const,
      slug: "cetlim-one-to-the-infinity",
      name: "The 1^∞ Form: lim f^g = e^{lim (f − 1)g}",
      intuition:
        "\\(\\left(1 + \\dfrac{1}{x}\\right)^x\\) is 'almost 1' raised to a huge power, and the two effects balance to give \\(e\\). Every \\(1^\\infty\\) limit is that balance in disguise: the answer is \\(e\\) raised to how fast the base leaves \\(1\\) times how fast the exponent grows.",
      definition:
        "- Base limits: \\(\\lim_{x\\to 0}(1 + x)^{1/x} = e\\) and \\(\\lim_{x\\to\\infty}\\left(1 + \\dfrac{k}{x}\\right)^{x} = e^{k}\\).\n" +
        "- **General rule**: if \\(f \\to 1\\) and \\(g \\to \\infty\\), then \\(\\lim f^{g} = e^{\\lim (f - 1)\\,g}\\). Compute the exponent \\((f - 1)g\\) as an ordinary limit.\n" +
        "- Recognise the form first: \\(\\dfrac{x + 8}{x + 1} \\to 1\\) with exponent \\(x + 5 \\to \\infty\\); \\(\\log_3 3x = 1 + \\log_3 x \\to 1\\) with exponent \\(\\log_x 8 \\to \\infty\\); \\((1 + \\tan x)^{\\csc x}\\) at \\(0\\).\n" +
        "- Quotient shortcut: \\(\\dfrac{(1 + 8/x)^{x}}{(1 + 1/x)^{x}} \\to \\dfrac{e^{8}}{e^{1}} = e^{7}\\).\n" +
        "- If the base does **not** tend to \\(1\\) the form is not \\(1^\\infty\\): \\(\\left(\\frac45\\right)^{\\text{something} \\to 0}\\) is simply \\(1\\), and \\(\\left(\\frac45\\right)^{\\text{something}\\to\\infty}\\) is \\(0\\).",
      formula: {
        label: "The 1^∞ rule",
        latex:
          "\\lim_{x\\to 0}(1 + x)^{1/x} = e \\qquad \\lim_{x\\to\\infty}\\left(1 + \\frac{k}{x}\\right)^{x} = e^{k} \\qquad f \\to 1,\\ g \\to \\infty:\\ \\lim f^{g} = e^{\\lim (f - 1)g}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to\\infty}\\left(\\dfrac{x + 3}{x - 1}\\right)^{x}\\).",
        steps: [
          "Base \\(\\to 1\\), exponent \\(\\to \\infty\\): a \\(1^\\infty\\) form. Compute \\(f - 1 = \\dfrac{x + 3}{x - 1} - 1 = \\dfrac{4}{x - 1}\\).",
          "Exponent of \\(e\\): \\(\\lim (f - 1)g = \\lim \\dfrac{4x}{x - 1} = 4\\).",
        ],
        answer: "\\(e^{4}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}(1 + 2\\sin x)^{1/x}\\).",
        steps: [
          "Base \\(\\to 1\\), exponent \\(\\to \\infty\\). \\(f - 1 = 2\\sin x\\), \\(g = \\dfrac{1}{x}\\).",
          "\\(\\lim (f - 1)g = \\lim\\dfrac{2\\sin x}{x} = 2\\).",
        ],
        answer: "\\(e^{2}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}(1 + 3x)^{1/x} = ?\\)",
          answer: "\\(e^{3}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\left(1 + \\dfrac{1}{x}\\right)^{2x} = ?\\)",
          answer: "\\(e^{2}\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to\\infty}\\left(\\dfrac{x + 1}{x}\\right)^{x} = ?\\)",
          answer: "\\(e\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}(\\cos x)^{1/x^2} = ?\\)",
          answer: "\\(e^{-1/2}\\)",
          method: "\\((\\cos x - 1)/x^2 \\to -1/2\\).",
        },
      ],
      pyqExampleId: "e5cc764b-1bf2-4f96-a482-cfebf39e5816",
      traps: [
        {
          title: "1^∞ is indeterminate — never answer 1 by substitution",
          body:
            "\\(\\left(\\dfrac{x + 8}{x + 1}\\right)^{x + 5}\\) looks like \\(1^\\infty = 1\\) and equals \\(e^{7}\\). The option '1' is present precisely for the student who substitutes.",
        },
      ],
    },

    // 6 — 0^0 and ∞^0 via logs
    {
      kind: "formula" as const,
      slug: "cetlim-zero-power-forms-via-logs",
      name: "0⁰ and ∞⁰ Forms — Take Logarithms",
      intuition:
        "\\(x^{x}\\) as \\(x \\to 0^+\\) pits a base going to \\(0\\) against an exponent going to \\(0\\). Taking logs turns the power into a product, \\(x\\log x\\), and that product tends to \\(0\\) — the log loses to the power of \\(x\\).",
      definition:
        "- For \\(l = \\lim f^{g}\\) with \\(f \\to 0^+, g \\to 0\\) (form \\(0^0\\)) or \\(f \\to \\infty, g \\to 0\\) (form \\(\\infty^0\\)): compute \\(\\log l = \\lim g\\log f\\), then \\(l = e^{\\log l}\\).\n" +
        "- Key fact: \\(\\lim_{x\\to 0^+} x\\log x = 0\\) — any positive power of \\(x\\) beats \\(\\log x\\). Hence \\(x^{x} \\to 1\\), \\(x^{\\sin x} \\to 1\\), \\(x^{2x} \\to 1\\).\n" +
        "- **Not every power form is indeterminate**: \\((\\sin x)^{1/x}\\) as \\(x \\to 0^+\\) has base \\(\\to 0\\) and exponent \\(\\to +\\infty\\), so it is simply \\(0\\) — a tiny number raised to a huge power.\n" +
        "- Sums of such terms are evaluated term by term once each is settled: \\((\\sin x)^{1/x} + \\dfrac{1}{x^{\\sin x}} \\to 0 + 1 = 1\\).",
      formula: {
        label: "Power forms through the logarithm",
        latex:
          "l = \\lim f^{g} \\ \\Rightarrow\\ \\log l = \\lim g\\log f \\qquad \\lim_{x\\to 0^+} x\\log x = 0 \\ \\Rightarrow\\ \\lim_{x\\to 0^+} x^{x} = 1",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0^+} x^{x}\\).",
        steps: [
          "Form \\(0^0\\). Let \\(l\\) be the limit; \\(\\log l = \\lim_{x\\to 0^+} x\\log x\\).",
          "Write \\(x\\log x = \\dfrac{\\log x}{1/x}\\), an \\(\\dfrac{\\infty}{\\infty}\\) form; L'Hôpital gives \\(\\dfrac{1/x}{-1/x^2} = -x \\to 0\\).",
          "So \\(\\log l = 0\\), and \\(l = e^{0} = 1\\).",
        ],
        answer: "\\(1\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0^+}(\\tan x)^{x}\\).",
        steps: [
          "\\(\\log l = \\lim x\\log(\\tan x) = \\lim\\left[x\\log x + x\\log\\dfrac{\\tan x}{x}\\right]\\).",
          "\\(x\\log x \\to 0\\), and \\(\\dfrac{\\tan x}{x} \\to 1\\) so \\(x\\log\\dfrac{\\tan x}{x} \\to 0\\cdot 0 = 0\\).",
          "\\(l = e^{0} = 1\\).",
        ],
        answer: "\\(1\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0^+} x^{2x} = ?\\)",
          answer: "\\(1\\)",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^+}(\\sin x)^{1/x} = ?\\)",
          answer: "\\(0\\)",
          method: "Base \\(\\to 0\\), exponent \\(\\to +\\infty\\): not indeterminate.",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^+}\\left(\\dfrac{1}{x}\\right)^{x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(\\log l = -x\\log x \\to 0\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0^+} x^{\\sin x} = ?\\)",
          answer: "\\(1\\)",
          method: "\\(\\sin x\\log x \\sim x\\log x \\to 0\\).",
        },
      ],
      pyqExampleId: "b48b6e52-f4de-482f-bb75-ae0473d3e6c0",
      traps: [
        {
          title: "Treating (sin x)^(1/x) as a 0⁰ form",
          body:
            "The exponent \\(1/x \\to +\\infty\\), not \\(0\\). A base below \\(1\\) raised to an unbounded power is \\(0\\); no logarithm is needed. Only \\(0^0\\), \\(\\infty^0\\) and \\(1^\\infty\\) are indeterminate among the power forms.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Continuity at a Point — Finding f(c) and the Parameter (1^∞ in its continuity costume)",
      href: "/notes/mht-cet-maths/limits/cetlim-continuity-at-a-point",
    },
  ],
};
