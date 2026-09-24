import type { SubtopicNote } from "@/app/notes/_types";

export const ALGEBRAIC_LIMITS_NOTE: SubtopicNote = {
  subtopicName: "Algebraic Limits — Factorisation, Rationalisation and the xⁿ − aⁿ Form",
  title: "Algebraic Limits — Factorisation, Rationalisation and the xⁿ − aⁿ Form",
  oneLineDefinition:
    "When substitution gives 0/0 in an algebraic expression, a hidden factor of (x − a) is cancelling — factor it out, rationalise it out, or quote the xⁿ − aⁿ standard form.",
  whyItMatters:
    "13 PYQs at 46% HARD, spread across every year from 2021 to 2025 — the most evenly recurring page in the chapter. " +
    "Three stems here have been set twice in different sittings with the numbers unchanged, so the forms are worth knowing cold: a double rationalisation, a nested square root, and the 'limit is finite, find a and b' problem. " +
    "The derivative-in-disguise reading at the end is the single fastest tool in the chapter and reappears on the continuity pages.",
  concepts: [
    // 1 — foundation: recognise 0/0
    {
      kind: "formula" as const,
      slug: "cetlim-recognise-zero-by-zero",
      name: "Spotting the 0/0 Form",
      intuition:
        "Always substitute first. If you get a number, that is the answer. If you get \\(\\dfrac{0}{0}\\), the numerator and denominator share a factor that vanishes at \\(a\\), and the whole game is to expose and cancel it.",
      definition:
        "- **Step 0 of every limit**: substitute \\(x = a\\). A finite non-zero denominator means the limit is the value — stop.\n" +
        "- \\(\\dfrac{0}{0}\\) is **indeterminate**: it tells you a factor \\((x - a)\\) is hiding on both floors, not what the answer is.\n" +
        "- \\(\\dfrac{\\text{non-zero}}{0}\\) is **not** indeterminate: the function blows up and there is no finite limit (check the sign of each side if the question asks).\n" +
        "- The three algebraic tools for \\(0/0\\), in the order to try them: **factor** (polynomials), **rationalise** (square roots), **quote the standard form** \\(\\dfrac{x^n - a^n}{x - a}\\) (fractional or large powers).\n" +
        "- If \\(x = a\\) makes a polynomial zero, then \\((x - a)\\) divides it exactly — the **factor theorem** is what makes the cancellation possible.",
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 3}\\dfrac{x^2 - 9}{x - 3}\\).",
        steps: [
          "Substitute \\(x = 3\\): \\(\\dfrac{0}{0}\\). Indeterminate, so a factor \\((x - 3)\\) is hiding.",
          "Factor: \\(x^2 - 9 = (x - 3)(x + 3)\\). Cancel the common \\((x - 3)\\) — legal because \\(x \\neq 3\\) during the approach.",
          "What remains is \\(x + 3\\), which at \\(3\\) is \\(6\\).",
        ],
        answer: "\\(6\\)",
      },
      practiceSet: [
        {
          prompt: "Name the form of \\(\\dfrac{x^2 - 4}{x - 2}\\) as \\(x \\to 2\\).",
          answer: "\\(0/0\\) — factor and cancel; the limit is \\(4\\).",
        },
        {
          prompt: "Name the form of \\(\\dfrac{x + 2}{x - 2}\\) as \\(x \\to 2\\).",
          answer: "\\(4/0\\) — not indeterminate; no finite limit.",
        },
        {
          prompt: "Name the form of \\(\\dfrac{\\sin x}{x}\\) as \\(x \\to 0\\).",
          answer: "\\(0/0\\) — a standard form, limit \\(1\\).",
        },
        {
          prompt: "Name the form of \\(\\dfrac{x^2 + 1}{x + 1}\\) as \\(x \\to 1\\).",
          answer: "Not indeterminate — substitute: \\(1\\).",
        },
      ],
      traps: [
        {
          title: "Cancelling before checking the form",
          body:
            "Cancelling \\((x - a)\\) is only valid when it is genuinely a factor of both floors. If substitution gives \\(\\dfrac{5}{0}\\) there is nothing to cancel and no finite limit — writing an option like '5' or '0' there is the standard distractor.",
        },
      ],
    },

    // 2 — factor and cancel
    {
      kind: "formula" as const,
      slug: "cetlim-factor-and-cancel",
      name: "Factor and Cancel",
      intuition:
        "Polynomials vanish at \\(a\\) because \\((x - a)\\) divides them. Pull that factor out of top and bottom, cancel, and substitute into what is left.",
      definition:
        "- Know the factorisations by heart: \\(x^2 - a^2 = (x - a)(x + a)\\), \\(x^3 - a^3 = (x - a)(x^2 + ax + a^2)\\), \\(x^3 + a^3 = (x + a)(x^2 - ax + a^2)\\).\n" +
        "- For a general polynomial that vanishes at \\(a\\), **divide** by \\((x - a)\\) (synthetic division) to expose the factor.\n" +
        "- Irrational points work identically: \\(x^4 - 4 = (x^2 - 2)(x^2 + 2) = (x - \\sqrt2)(x + \\sqrt2)(x^2 + 2)\\).\n" +
        "- A **difference of two fractions** that each blow up must be **combined into one fraction** first; only the combined numerator has the cancelling factor.\n" +
        "- Sometimes the point \\(a\\) is itself hidden — given as 'where \\(f\\) attains its maximum' or as a computed product — resolve it before touching the limit.",
      formula: {
        label: "Factorisations that unlock 0/0",
        latex:
          "x^2 - a^2 = (x - a)(x + a) \\qquad x^3 - a^3 = (x - a)(x^2 + ax + a^2) \\qquad p(a) = 0 \\Rightarrow (x - a) \\mid p(x)",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 1}\\dfrac{x^3 - 1}{x^2 - 1}\\).",
        steps: [
          "Substitute: \\(\\dfrac{0}{0}\\).",
          "Factor both: \\(x^3 - 1 = (x - 1)(x^2 + x + 1)\\) and \\(x^2 - 1 = (x - 1)(x + 1)\\).",
          "Cancel \\((x - 1)\\): \\(\\dfrac{x^2 + x + 1}{x + 1}\\). Substitute \\(x = 1\\): \\(\\dfrac{3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 2}\\dfrac{x^3 - 8}{x^2 - 3x + 2}\\).",
        steps: [
          "Substitute: \\(\\dfrac{0}{0}\\).",
          "\\(x^3 - 8 = (x - 2)(x^2 + 2x + 4)\\); \\(x^2 - 3x + 2 = (x - 2)(x - 1)\\).",
          "Cancel and substitute: \\(\\dfrac{4 + 4 + 4}{2 - 1} = 12\\).",
        ],
        answer: "\\(12\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to -2}\\dfrac{x^2 - 4}{x + 2} = ?\\)",
          answer: "\\(-4\\)",
          method: "Cancel to \\(x - 2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 1}\\dfrac{x^2 - 1}{x - 1} = ?\\)",
          answer: "\\(2\\)",
          method: "Cancel to \\(x + 1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 3}\\dfrac{x^2 - 5x + 6}{x - 3} = ?\\)",
          answer: "\\(1\\)",
          method: "\\((x-3)(x-2)/(x-3) \\to 3 - 2\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{x^2 + x}{x} = ?\\)",
          answer: "\\(1\\)",
          method: "Cancel \\(x\\): \\(x + 1\\).",
        },
      ],
      pyqExampleId: "84fc1af9-90a7-48e3-b475-0cde784bdaec",
      traps: [
        {
          title: "Two blowing-up fractions must be combined first",
          body:
            "\\(\\dfrac{1}{x - 2} - \\dfrac{2x}{x^3 - 3x^2 + 2x}\\) at \\(x \\to 2\\): each piece alone is \\(\\infty\\), and '\\(\\infty - \\infty = 0\\)' is a trap. " +
            "Factor the second denominator as \\(x(x - 1)(x - 2)\\), put everything over it, and the combined numerator \\((x - 2)(x + 1)\\) cancels to give \\(\\dfrac{3}{2}\\).",
        },
      ],
    },

    // 3 — rationalisation
    {
      kind: "formula" as const,
      slug: "cetlim-rationalise",
      name: "Rationalisation — Single, Double and Nested Surds",
      intuition:
        "A square root hides its factor of \\((x - a)\\). Multiplying by the conjugate \\(\\sqrt{A} + \\sqrt{B}\\) converts \\(\\sqrt{A} - \\sqrt{B}\\) into \\(A - B\\), which is a polynomial that can be factored like any other.",
      definition:
        "- **Conjugate rule**: \\(\\sqrt{A} - \\sqrt{B} = \\dfrac{A - B}{\\sqrt{A} + \\sqrt{B}}\\). The new denominator is harmless — it does not vanish at \\(a\\).\n" +
        "- Surds in **both** numerator and denominator: rationalise **both**, one after the other. Each conjugate contributes a factor to evaluate at the end.\n" +
        "- **Nested** roots \\(\\sqrt{1 + \\sqrt{1 + u}} - \\sqrt2\\): rationalise the outer difference to get \\(\\sqrt{1 + u} - 1\\) on top, then rationalise that.\n" +
        "- After each rationalisation, **substitute into the conjugate factors immediately** — they are continuous at \\(a\\) — and keep only the part that is still \\(0/0\\).",
      formula: {
        label: "Conjugate rule",
        latex:
          "\\frac{\\sqrt{A} - \\sqrt{B}}{C} = \\frac{A - B}{C\\left(\\sqrt{A} + \\sqrt{B}\\right)}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 0}\\dfrac{\\sqrt{1 + x} - 1}{x}\\).",
        steps: [
          "Substitute: \\(\\dfrac{0}{0}\\). Multiply top and bottom by the conjugate \\(\\sqrt{1 + x} + 1\\).",
          "Numerator becomes \\((1 + x) - 1 = x\\), so the expression is \\(\\dfrac{x}{x\\left(\\sqrt{1 + x} + 1\\right)}\\).",
          "Cancel \\(x\\) and substitute: \\(\\dfrac{1}{1 + 1} = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 4}\\dfrac{\\sqrt{x} - 2}{x - 4}\\).",
        steps: [
          "Rationalise the numerator: \\(\\dfrac{x - 4}{(x - 4)\\left(\\sqrt{x} + 2\\right)}\\).",
          "Cancel \\((x - 4)\\): \\(\\dfrac{1}{\\sqrt{x} + 2}\\).",
          "Substitute \\(x = 4\\): \\(\\dfrac{1}{4}\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{\\sqrt{4 + x} - 2}{x} = ?\\)",
          answer: "\\(\\dfrac{1}{4}\\)",
          method: "Conjugate gives \\(1/(\\sqrt{4+x} + 2)\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 1}\\dfrac{\\sqrt{x} - 1}{x - 1} = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
          method: "\\(x - 1 = (\\sqrt{x} - 1)(\\sqrt{x} + 1)\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{x}{\\sqrt{1 + x} - \\sqrt{1 - x}} = ?\\)",
          answer: "\\(1\\)",
          method: "Rationalise the denominator: \\(2x\\) below, conjugate \\(\\to 2\\) above.",
        },
        {
          prompt: "\\(\\lim_{x\\to 2}\\dfrac{x - 2}{\\sqrt{x + 2} - 2} = ?\\)",
          answer: "\\(4\\)",
          method: "Denominator conjugate: \\(\\sqrt{x+2} + 2 \\to 4\\).",
        },
      ],
      pyqExampleId: "e7db73f2-e7cc-467a-bfdd-4f9928840f43",
      traps: [
        {
          title: "Rationalising only one floor when both carry surds",
          body:
            "In \\(\\dfrac{\\sqrt{a + 2x} - \\sqrt{3x}}{\\sqrt{3a + x} - 2\\sqrt{x}}\\) the top rationalises to \\(a - x\\) and the bottom to \\(3(a - x)\\); stopping after one of them leaves a \\(0/0\\) you cannot substitute into. " +
            "Do both, cancel \\((a - x)\\), then evaluate the two conjugate factors at \\(x = a\\) to get \\(\\dfrac{2}{3\\sqrt3}\\).",
        },
      ],
    },

    // 4 — x^n − a^n standard form
    {
      kind: "formula" as const,
      slug: "cetlim-x-n-minus-a-n",
      name: "The xⁿ − aⁿ Standard Form and Fractional Powers",
      intuition:
        "\\(\\dfrac{x^n - a^n}{x - a}\\) is the slope of \\(x^n\\) at \\(a\\), and the result \\(na^{n-1}\\) holds for ANY rational \\(n\\) — which is what makes cube roots and fourth roots tractable without a conjugate.",
      definition:
        "- \\(\\lim_{x\\to a}\\dfrac{x^n - a^n}{x - a} = na^{n-1}\\) for every rational \\(n\\), positive or negative, integer or fraction.\n" +
        "- To use it, **rewrite the root as a power**: \\((84 - x)^{1/4} - 3\\) at \\(x \\to 3\\) is \\(u^{1/4} - 81^{1/4}\\) with \\(u = 84 - x \\to 81\\); note \\(x - 3 = -(u - 81)\\), which supplies a minus sign.\n" +
        "- Ratio of two such forms: \\(\\dfrac{x^m - a^m}{x^n - a^n} = \\dfrac{m}{n}a^{m-n}\\) — divide numerator and denominator by \\((x - a)\\).\n" +
        "- **Small-\\(x\\) version**: \\(\\lim_{x\\to 0}\\dfrac{(1 + x)^n - 1}{x} = n\\), i.e. \\((1 + x)^n \\approx 1 + nx\\) for small \\(x\\). This is how \\(\\sqrt[3]{1 + a} - 1 \\approx \\dfrac{a}{3}\\), \\(\\sqrt{1 + a} - 1 \\approx \\dfrac{a}{2}\\), \\(\\sqrt[6]{1 + a} - 1 \\approx \\dfrac{a}{6}\\) turn a frightening quadratic into \\(2x^2 + 3x + 1 = 0\\).",
      formula: {
        label: "The xⁿ − aⁿ family",
        latex:
          "\\lim_{x\\to a}\\frac{x^n - a^n}{x - a} = n a^{n-1} \\quad (n \\in \\mathbb{Q}) \\qquad \\lim_{x\\to 0}\\frac{(1 + x)^n - 1}{x} = n",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 8}\\dfrac{x^{1/3} - 2}{x - 8}\\).",
        steps: [
          "Write \\(2 = 8^{1/3}\\), so the expression is \\(\\dfrac{x^{1/3} - 8^{1/3}}{x - 8}\\): the standard form with \\(n = \\dfrac{1}{3}\\), \\(a = 8\\).",
          "Limit \\(= n a^{n-1} = \\dfrac{1}{3}\\cdot 8^{-2/3}\\).",
          "\\(8^{-2/3} = \\dfrac{1}{(8^{1/3})^2} = \\dfrac{1}{4}\\), so the limit is \\(\\dfrac{1}{12}\\).",
        ],
        answer: "\\(\\dfrac{1}{12}\\)",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 1}\\dfrac{x^5 - 1}{x^3 - 1}\\).",
        steps: [
          "Divide top and bottom by \\((x - 1)\\): \\(\\dfrac{(x^5 - 1)/(x - 1)}{(x^3 - 1)/(x - 1)}\\).",
          "Each piece is a standard form at \\(a = 1\\): top \\(\\to 5\\cdot1^4 = 5\\), bottom \\(\\to 3\\cdot1^2 = 3\\).",
        ],
        answer: "\\(\\dfrac{5}{3}\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 2}\\dfrac{x^4 - 16}{x - 2} = ?\\)",
          answer: "\\(32\\)",
          method: "\\(4\\cdot 2^3\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 1}\\dfrac{\\sqrt{x} - 1}{x - 1} = ?\\)",
          answer: "\\(\\dfrac{1}{2}\\)",
          method: "\\(n = 1/2\\), \\(a = 1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{(1 + x)^6 - 1}{x} = ?\\)",
          answer: "\\(6\\)",
          method: "Small-\\(x\\) version with \\(n = 6\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to a}\\dfrac{x^{3/2} - a^{3/2}}{x - a} = ?\\)",
          answer: "\\(\\dfrac{3}{2}\\sqrt{a}\\)",
          method: "\\(n a^{n-1}\\) with \\(n = 3/2\\).",
        },
      ],
      pyqExampleId: "963d3bda-7c0a-488e-8203-1fed19a1e4ed",
      traps: [
        {
          title: "The inner function's sign",
          body:
            "In \\(\\dfrac{(84 - x)^{1/4} - 3}{x - 3}\\) the inner variable is \\(84 - x\\), which DECREASES as \\(x\\) increases. Writing \\(u = 84 - x\\) gives \\(x - 3 = -(u - 81)\\), so the answer is \\(-\\dfrac{1}{4}\\cdot 81^{-3/4} = -\\dfrac{1}{108}\\), not \\(+\\dfrac{1}{108}\\). Both signs are always in the options.",
        },
      ],
    },

    // 5 — derivative in disguise + L'Hôpital
    {
      kind: "formula" as const,
      slug: "cetlim-derivative-in-disguise",
      name: "The Derivative in Disguise — [f(x) − f(a)]/(x − a) and L'Hôpital",
      intuition:
        "\\(\\dfrac{f(x) - f(a)}{x - a}\\) is the definition of \\(f'(a)\\). Any \\(0/0\\) limit whose denominator is \\(x - a\\) and whose numerator vanishes at \\(a\\) can be read as a derivative, and answered by differentiating instead of factoring.",
      definition:
        "- **Definition of the derivative**: \\(\\lim_{x\\to a}\\dfrac{f(x) - f(a)}{x - a} = f'(a)\\). A polynomial numerator \\(p(x) - p(a)\\) over \\(x - a\\) is therefore \\(p'(a)\\) — no factoring needed.\n" +
        "- **L'Hôpital's rule**: if \\(\\dfrac{f(x)}{g(x)}\\) is \\(\\dfrac{0}{0}\\) or \\(\\dfrac{\\infty}{\\infty}\\) at \\(a\\), then \\(\\lim\\dfrac{f}{g} = \\lim\\dfrac{f'}{g'}\\) whenever the right side exists. Differentiate top and bottom **separately** — this is not the quotient rule.\n" +
        "- Apply it **only** to an indeterminate form; on \\(\\dfrac{3}{5}\\) it produces nonsense.\n" +
        "- When the stem gives \\(f(a), f'(a), g(a), g'(a)\\) as numbers and asks for a limit at \\(a\\), the question is L'Hôpital by construction: differentiate and substitute the given values.\n" +
        "- A limit of the form \\(\\dfrac{\\int_{c}^{h(x)} \\phi(t)\\,dt}{x - a}\\) is the same idea: the derivative of the integral is \\(\\phi(h(x))\\,h'(x)\\).",
      formula: {
        label: "Derivative form and L'Hôpital",
        latex:
          "\\lim_{x\\to a}\\frac{f(x) - f(a)}{x - a} = f'(a) \\qquad \\lim_{x\\to a}\\frac{f(x)}{g(x)} \\overset{0/0}{=} \\lim_{x\\to a}\\frac{f'(x)}{g'(x)}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\lim_{x\\to 2}\\dfrac{x^5 + x^3 - 40}{x - 2}\\).",
        steps: [
          "Let \\(p(x) = x^5 + x^3\\). Then \\(p(2) = 32 + 8 = 40\\), so the numerator is \\(p(x) - p(2)\\) and the limit is \\(p'(2)\\).",
          "\\(p'(x) = 5x^4 + 3x^2\\).",
          "\\(p'(2) = 5\\cdot16 + 3\\cdot4 = 80 + 12 = 92\\).",
        ],
        answer: "\\(92\\)",
      },
      selfCheckExample: {
        prompt: "If \\(f(1) = 3\\) and \\(f'(1) = -2\\), find \\(\\lim_{x\\to 1}\\dfrac{x\\,f(1) - f(x)}{x - 1}\\).",
        steps: [
          "At \\(x = 1\\) the numerator is \\(f(1) - f(1) = 0\\): a \\(0/0\\) form.",
          "L'Hôpital: differentiate top and bottom in \\(x\\): \\(\\dfrac{f(1) - f'(x)}{1}\\).",
          "Substitute \\(x = 1\\): \\(f(1) - f'(1) = 3 - (-2) = 5\\).",
        ],
        answer: "\\(5\\)",
      },
      practiceSet: [
        {
          prompt: "\\(\\lim_{x\\to 1}\\dfrac{\\log x}{x - 1} = ?\\)",
          answer: "\\(1\\)",
          method: "Derivative of \\(\\log x\\) at \\(1\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to \\pi}\\dfrac{\\sin x}{x - \\pi} = ?\\)",
          answer: "\\(-1\\)",
          method: "\\(\\sin\\pi = 0\\); derivative \\(\\cos\\pi = -1\\).",
        },
        {
          prompt: "By L'Hôpital, \\(\\lim_{x\\to 3}\\dfrac{x^2 - 9}{x - 3} = ?\\)",
          answer: "\\(6\\)",
          method: "\\(2x/1\\) at \\(3\\).",
        },
        {
          prompt: "\\(\\lim_{x\\to 0}\\dfrac{e^{x} - 1}{x} = ?\\) (as a derivative)",
          answer: "\\(1\\)",
          method: "Derivative of \\(e^x\\) at \\(0\\).",
        },
      ],
      pyqExampleId: "3f5a5c6a-52ea-4991-aff4-c50a7b85ff80",
      traps: [
        {
          title: "L'Hôpital on a form that is not indeterminate",
          body:
            "\\(\\lim_{x\\to 1}\\dfrac{x^2 + 1}{x + 1}\\) is \\(1\\) by substitution; 'differentiating' gives \\(\\dfrac{2x}{1} \\to 2\\), which is wrong. The rule has a precondition, and the paper's distractors are built from students who skip it.",
        },
      ],
    },

    // 6 — finite limit forces numerator to vanish
    {
      kind: "formula" as const,
      slug: "cetlim-finite-limit-forces-numerator-zero",
      name: "A Finite Limit Forces the Numerator to Vanish — Finding a and b",
      intuition:
        "If \\(\\dfrac{x^2 - ax + b}{x - 1}\\) has a finite limit at \\(1\\), the numerator must be \\(0\\) at \\(1\\) — otherwise the fraction blows up. That hidden equation is the one students forget, and without it there are two unknowns and one equation.",
      definition:
        "- **Condition 1**: \\(\\lim_{x\\to a}\\dfrac{p(x)}{x - a}\\) is finite only if \\(p(a) = 0\\). Write this equation down **first**.\n" +
        "- **Condition 2**: with \\(p(a) = 0\\) the limit is \\(p'(a)\\) (the derivative-in-disguise reading), which the stem sets equal to the given value.\n" +
        "- Two equations, two unknowns — solve, and answer the combination asked for (\\(a + b\\), \\(ab\\), and so on).\n" +
        "- Same logic with a general denominator \\(q(x)\\) that vanishes at \\(a\\): the numerator must share the factor.",
      formula: {
        label: "Finite limit at a zero of the denominator",
        latex:
          "\\lim_{x\\to a}\\frac{p(x)}{x - a} = L \\text{ (finite)} \\ \\Rightarrow\\ p(a) = 0 \\ \\text{ and } \\ p'(a) = L",
      },
      authoredExample: {
        prompt: "If \\(\\lim_{x\\to 2}\\dfrac{x^2 + ax + b}{x - 2} = 3\\), find \\(a + b\\).",
        steps: [
          "Finite limit at a zero of the denominator: the numerator vanishes at \\(2\\), so \\(4 + 2a + b = 0\\).",
          "The limit is then the derivative of the numerator at \\(2\\): \\(2x + a \\to 4 + a = 3\\), so \\(a = -1\\).",
          "Back-substitute: \\(4 - 2 + b = 0 \\Rightarrow b = -2\\). Hence \\(a + b = -3\\).",
        ],
        answer: "\\(a + b = -3\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\lim_{x\\to -1}\\dfrac{x^2 + px + q}{x + 1} = 4\\), find \\(pq\\).",
        steps: [
          "Numerator vanishes at \\(-1\\): \\(1 - p + q = 0\\).",
          "Derivative at \\(-1\\): \\(2x + p \\to -2 + p = 4\\), so \\(p = 6\\).",
          "Then \\(q = p - 1 = 5\\), and \\(pq = 30\\).",
        ],
        answer: "\\(30\\)",
      },
      pyqExampleId: "3ead9e95-981c-4792-82ec-38dc5770f831",
      traps: [
        {
          title: "Treating a as free and reading b off the limit",
          body:
            "Skipping \\(p(a) = 0\\) leaves one equation for two unknowns, and every option looks reachable. The vanishing condition is not optional — it is the reason the limit is finite at all.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Differentiation — Foundations, Chain Rule & Differentiability (the derivative this page keeps borrowing)",
      href: "/notes/mht-cet-maths/differentiation/foundations-chain",
    },
  ],
};
