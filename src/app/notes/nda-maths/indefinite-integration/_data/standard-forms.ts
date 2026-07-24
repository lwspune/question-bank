import type { SubtopicNote } from "@/app/notes/_types";

export const STANDARD_FORMS_NOTE: SubtopicNote = {
  subtopicName:
    "Standard Forms — Exponential, Logarithmic, and Paired Trigonometric Integrals",
  title: "Foundations & Standard Forms",
  oneLineDefinition:
    "Integration is differentiation run backwards: given a rate of change, recover the function — plus an unknown constant C that no derivative can pin down.",
  whyItMatters:
    "Before any technique, three reflexes carry the whole chapter: an indefinite integral is a FAMILY of functions (the +C), the standard-formula table must be instant recall, and most NDA integrands are simplified with exponent/log laws BEFORE a formula applies. " +
    "13 PYQs sit directly here — exponential bases, the eˡⁿ-collapse trick, completing the square, the eˣ[f+f′] pattern, and the paired eˣ·trig integrals — and these reflexes underpin all 40 questions in the chapter.",
  concepts: [
    // 1 — antiderivative + C (foundation, reuse the one chapter SVG)
    {
      kind: "formula" as const,
      slug: "antiderivative-and-c",
      name: "Antiderivative and the Constant of Integration",
      visualizationSlug: "antiderivative-family",
      intuition:
        "Differentiation turns a function into its slope. Integration runs that backwards — given the slope everywhere, find the function. " +
        "But a constant has zero slope, so ANY vertical shift of a correct answer is also correct. That unknown shift is the +C.",
      definition:
        "A function \\(F\\) is an **antiderivative** of \\(f\\) if \\(F'(x) = f(x)\\). " +
        "The **indefinite integral** \\(\\int f(x)\\,dx = F(x) + C\\) denotes the whole family of antiderivatives, where \\(C\\) is an arbitrary constant. " +
        "Because \\(\\dfrac{d}{dx}[F(x) + C] = f(x)\\) for every constant \\(C\\), the constant can never be recovered from \\(f\\) alone — an extra condition (a boundary value) is needed to fix it.",
      formula: {
        label: "Indefinite integral",
        latex: "\\int f(x)\\,dx = F(x) + C \\quad\\text{where}\\quad F'(x) = f(x)",
        symbols: [
          { symbol: "F(x)", meaning: "any one antiderivative of \\(f\\)" },
          { symbol: "C", meaning: "arbitrary constant of integration" },
        ],
      },
      authoredExample: {
        prompt:
          "Verify that both \\(\\sin x + 7\\) and \\(\\sin x - 2\\) are antiderivatives of \\(\\cos x\\), and write the indefinite integral.",
        steps: [
          "Differentiate the first: \\(\\dfrac{d}{dx}(\\sin x + 7) = \\cos x + 0 = \\cos x\\). ✓",
          "Differentiate the second: \\(\\dfrac{d}{dx}(\\sin x - 2) = \\cos x\\). ✓",
          "They differ only by a constant, so the whole family is \\(\\sin x + C\\).",
        ],
        answer: "\\(\\displaystyle\\int \\cos x\\,dx = \\sin x + C\\)",
      },
      traps: [
        {
          title: "Never drop the +C on an indefinite integral",
          body:
            "An indefinite integral with no \\(+C\\) is incomplete. NDA options are written so the 'no constant' version and a wrong-constant version both appear — only the form carrying \\(+C\\) (or \\(+k\\)) is correct.",
        },
      ],
    },

    // 2 — standard table (foundation, no PYQ)
    {
      kind: "formula" as const,
      slug: "standard-formula-table",
      name: "The Standard-Formula Table",
      intuition:
        "About a dozen integrals are the alphabet of the whole chapter. Every technique — substitution, parts, partial fractions — exists only to REDUCE a hard integral to one of these. Know them as reflexes, not look-ups.",
      definition:
        "The integrals you must recall instantly:\n" +
        "- \\(\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C\\) for \\(n \\neq -1\\)\n" +
        "- \\(\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C\\)\n" +
        "- \\(\\int e^x\\,dx = e^x + C\\), and \\(\\int a^x\\,dx = \\dfrac{a^x}{\\ln a} + C\\)\n" +
        "- \\(\\int \\sin x\\,dx = -\\cos x + C\\), \\(\\int \\cos x\\,dx = \\sin x + C\\)\n" +
        "- \\(\\int \\sec^2 x\\,dx = \\tan x + C\\), \\(\\int \\csc^2 x\\,dx = -\\cot x + C\\)\n" +
        "- \\(\\int \\sec x\\tan x\\,dx = \\sec x + C\\), \\(\\int \\tan x\\,dx = \\ln|\\sec x| + C\\)\n" +
        "- \\(\\int \\dfrac{dx}{1+x^2} = \\tan^{-1}x + C\\), \\(\\int \\dfrac{dx}{\\sqrt{1-x^2}} = \\sin^{-1}x + C\\)",
      formula: {
        label: "Power rule (the most-used row)",
        latex: "\\int x^n\\,dx = \\dfrac{x^{n+1}}{n+1} + C \\quad (n \\neq -1)",
        symbols: [
          {
            symbol: "\\(n \\neq -1\\)",
            meaning: "the exclusion that makes \\(\\int x^{-1} = \\ln|x|\\) a separate row",
          },
        ],
      },
      authoredExample: {
        prompt:
          "Evaluate \\(\\displaystyle\\int\\left(\\sqrt{x} + \\sec^2 x\\right)dx\\).",
        steps: [
          "Write \\(\\sqrt{x} = x^{1/2}\\) and apply the power rule: \\(\\int x^{1/2}\\,dx = \\dfrac{x^{3/2}}{3/2} = \\dfrac{2}{3}x^{3/2}\\).",
          "From the table, \\(\\int \\sec^2 x\\,dx = \\tan x\\).",
          "Add and attach one constant.",
        ],
        answer: "\\(\\dfrac{2}{3}x^{3/2} + \\tan x + C\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\displaystyle\\int x^4\\,dx\\).",
          answer: "\\(\\dfrac{x^5}{5} + C\\)",
          method: "Power rule: add 1 to the exponent (\\(4\\to5\\)) and divide by the new exponent.",
        },
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{1}{x}\\,dx\\).",
          answer: "\\(\\ln|x| + C\\)",
          method: "The \\(n=-1\\) special row — NOT the power rule. The modulus keeps it valid for \\(x<0\\).",
        },
        {
          prompt: "Evaluate \\(\\displaystyle\\int 3^x\\,dx\\).",
          answer: "\\(\\dfrac{3^x}{\\ln 3} + C\\)",
          method: "Exponential-base row \\(\\int a^x\\,dx = \\dfrac{a^x}{\\ln a}\\) with \\(a=3\\); the \\(\\ln a\\) goes in the denominator.",
        },
      ],
      traps: [
        {
          title: "The power rule excludes \\(n=-1\\)",
          body:
            "\\(\\int x^{-1}\\,dx\\) is NOT \\(\\dfrac{x^0}{0}\\) — that is undefined. It is the special row \\(\\int \\dfrac{1}{x}\\,dx = \\ln|x| + C\\).",
        },
      ],
    },

    // 3 — linearity (foundation, no PYQ)
    {
      kind: "formula" as const,
      slug: "linearity-term-by-term",
      name: "Linearity — Integrate Term by Term",
      intuition:
        "Integration is linear: a constant multiplier slides out, and a sum integrates piece by piece. This lets you break any polynomial or sum into table look-ups.",
      definition:
        "For constants \\(a, b\\):\n" +
        "\\[\\int\\big(a\\,f(x) + b\\,g(x)\\big)\\,dx = a\\int f(x)\\,dx + b\\int g(x)\\,dx.\\]\n" +
        "Only ONE constant of integration is needed for the whole expression — collect the separate constants into a single \\(C\\) at the end. Linearity does NOT extend to products or quotients: \\(\\int f g \\neq \\int f \\cdot \\int g\\).",
      formula: {
        label: "Linearity of the integral",
        latex:
          "\\int\\big(a\\,f(x)+b\\,g(x)\\big)\\,dx = a\\!\\int\\! f(x)\\,dx + b\\!\\int\\! g(x)\\,dx",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int\\dfrac{2x^2 - 3}{x}\\,dx\\).",
        steps: [
          "Split the quotient first (NOT a product rule): \\(\\dfrac{2x^2-3}{x} = 2x - \\dfrac{3}{x}\\).",
          "Integrate term by term: \\(\\int 2x\\,dx = x^2\\) and \\(\\int \\dfrac{3}{x}\\,dx = 3\\ln|x|\\).",
          "Combine with one constant.",
        ],
        answer: "\\(x^2 - 3\\ln|x| + C\\)",
      },
      traps: [
        {
          title: "You cannot split a product or a quotient like a sum",
          body:
            "\\(\\int \\dfrac{1}{x(x^2+1)}\\,dx \\neq \\int\\dfrac{1}{x}\\,dx \\cdot \\int\\dfrac{1}{x^2+1}\\,dx\\). Linearity is for SUMS only — products need substitution or partial fractions.",
        },
      ],
    },

    // 4 — simplify the integrand first (PYQ 4db92aeb)
    {
      kind: "formula" as const,
      slug: "simplify-integrand-first",
      name: "Simplify the Integrand First",
      pyqExampleId: "4db92aeb-f0ba-4eff-a5ee-5ca3890ad4de",
      intuition:
        "Many NDA integrals look terrifying until you apply one exponent or log law — then they collapse to a table form. Before reaching for a method, ask: can algebra make this a standard integral?",
      definition:
        "The collapsing identities the NDA tests most:\n" +
        "- \\(e^{\\ln u} = u\\) — the exponential and natural log undo each other, so \\(\\int e^{\\ln(\\tan x)}\\,dx = \\int \\tan x\\,dx\\).\n" +
        "- \\(\\ln(u^k) = k\\ln u\\), so \\(e^{k\\ln x} = x^k\\) — a stacked log/exponent becomes a power.\n" +
        "- A quotient like \\(\\dfrac{P(x)}{x}\\) splits into powers (linearity), and the \\(\\dfrac{1}{x}\\) term is exactly what forces a \\(\\ln\\) (or must vanish for a rational answer).",
      formula: {
        label: "The collapse identity",
        latex: "e^{\\ln u} = u \\qquad e^{k\\ln x} = x^{k}",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^{3\\ln x}\\,dx\\).",
        steps: [
          "Use \\(3\\ln x = \\ln(x^3)\\), so \\(e^{3\\ln x} = e^{\\ln(x^3)} = x^3\\).",
          "The integral is now a power: \\(\\int x^3\\,dx = \\dfrac{x^4}{4}\\).",
          "Attach the constant.",
        ],
        answer: "\\(\\dfrac{x^4}{4} + C\\)",
      },
      traps: [
        {
          title: "Resolve the exponent/log BEFORE you integrate",
          body:
            "Students who integrate \\(e^{\\ln(\\tan x)}\\) as if the exponent were a variable get nonsense. \\(e^{\\ln(\\tan x)}\\) is just \\(\\tan x\\) — simplify, then integrate.",
        },
      ],
    },

    // 5 — exponential bases (PYQ feb5042e)
    {
      kind: "formula" as const,
      slug: "exponential-bases",
      name: "Exponential Bases — a to the x",
      pyqExampleId: "feb5042e-22d3-4ea3-ab17-6e038072f2bc",
      intuition:
        "Any constant raised to the x integrates with the same a-to-the-x on top and a ln of the base on the bottom. The whole skill is recognising the base, even when it is disguised as e to the (x ln a) or as a product like (4e) to the 2x.",
      definition:
        "The base-\\(a\\) rule:\n" +
        "\\[\\int a^x\\,dx = \\dfrac{a^x}{\\ln a} + C \\quad (a>0,\\ a\\neq 1).\\]\n" +
        "Disguises to unmask: \\(e^{x\\ln a} = a^x\\); and \\((kc)^{mx} = \\big((kc)^m\\big)^x\\), so \\((4e)^{2x} = \\big(16e^2\\big)^x\\) integrates as a base-\\(16e^2\\) exponential.",
      formula: {
        label: "Exponential base rule",
        latex: "\\int a^x\\,dx = \\dfrac{a^x}{\\ln a} + C",
        symbols: [
          { symbol: "a", meaning: "the constant base, \\(a>0,\\ a\\neq 1\\)" },
          { symbol: "\\(\\ln a\\)", meaning: "natural log of the base — the divisor" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int 5^{x}\\,dx\\) and \\(\\displaystyle\\int e^{x\\ln 7}\\,dx\\).",
        steps: [
          "First is the rule directly: \\(\\int 5^x\\,dx = \\dfrac{5^x}{\\ln 5} + C\\).",
          "For the second, \\(e^{x\\ln 7} = (e^{\\ln 7})^x = 7^x\\).",
          "So \\(\\int e^{x\\ln 7}\\,dx = \\int 7^x\\,dx = \\dfrac{7^x}{\\ln 7} + C\\).",
        ],
        answer: "\\(\\dfrac{5^x}{\\ln 5} + C\\) and \\(\\dfrac{7^x}{\\ln 7} + C\\)",
      },
      traps: [
        {
          title: "Divide by \\(\\ln a\\), not by \\(a\\)",
          body:
            "\\(\\int a^x\\,dx = \\dfrac{a^x}{\\ln a}\\), never \\(\\dfrac{a^x}{a}\\) and never \\(a^x\\ln a\\) (that is the derivative). The \\(\\ln a\\) lives in the denominator.",
        },
      ],
    },

    // 6 — completing the square -> arctan (PYQ 84d75bd9)
    {
      kind: "formula" as const,
      slug: "complete-the-square-arctan",
      name: "Completing the Square for Quadratic Denominators",
      pyqExampleId: "84d75bd9-9a30-466b-b5e1-1f6fa555068b",
      intuition:
        "When the denominator is an irreducible quadratic with no helpful numerator, force it into the (something)-squared-plus-constant shape. That instantly matches the arctan standard form.",
      definition:
        "Drive any \\(ax^2+bx+c\\) into the form \\((x-h)^2 + k^2\\) by completing the square, then use:\n" +
        "\\[\\int \\dfrac{dx}{x^2 + k^2} = \\dfrac{1}{k}\\tan^{-1}\\!\\Big(\\dfrac{x}{k}\\Big) + C.\\]\n" +
        "If the leading coefficient is not 1, factor it out of the whole denominator first so the \\(x^2\\) coefficient is 1 before completing the square.",
      formula: {
        label: "Arctan standard form",
        latex:
          "\\int \\dfrac{dx}{x^2+k^2} = \\dfrac{1}{k}\\tan^{-1}\\!\\Big(\\dfrac{x}{k}\\Big) + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{x^2 + 4x + 13}\\).",
        steps: [
          "Complete the square: \\(x^2+4x+13 = (x+2)^2 + 9 = (x+2)^2 + 3^2\\).",
          "Substitute \\(t = x+2\\) (so \\(dt = dx\\)): the integral is \\(\\int \\dfrac{dt}{t^2 + 3^2}\\).",
          "Apply the arctan form with \\(k=3\\): \\(\\dfrac{1}{3}\\tan^{-1}\\!\\big(\\tfrac{t}{3}\\big)\\), then put \\(t = x+2\\) back.",
        ],
        answer: "\\(\\dfrac{1}{3}\\tan^{-1}\\!\\Big(\\dfrac{x+2}{3}\\Big) + C\\)",
      },
      practiceSet: [
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{x^2+25}\\).",
          answer: "\\(\\dfrac{1}{5}\\tan^{-1}\\!\\Big(\\dfrac{x}{5}\\Big) + C\\)",
          method: "Standard arctan form with \\(k=5\\): \\(\\int\\dfrac{dx}{x^2+k^2}=\\tfrac1k\\tan^{-1}\\tfrac{x}{k}\\).",
        },
        {
          prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{x^2+2x+5}\\).",
          answer: "\\(\\dfrac{1}{2}\\tan^{-1}\\!\\Big(\\dfrac{x+1}{2}\\Big) + C\\)",
          method: "Complete the square: \\(x^2+2x+5=(x+1)^2+2^2\\); arctan form with \\(k=2\\).",
        },
      ],
      traps: [
        {
          title: "Factor out the leading coefficient first",
          body:
            "For \\(\\int\\dfrac{dx}{2x^2-2x+1}\\), pull the 2 out: \\(2\\big(x^2 - x + \\tfrac12\\big)\\), THEN complete the square inside. Skipping this gives the wrong \\(k\\) and a wrong coefficient.",
        },
      ],
    },

    // 7 — e^x [f + f'] + combine-before-integrating (PYQ 0373d669)
    {
      kind: "formula" as const,
      slug: "ex-f-plus-fprime",
      name: "The e-to-the-x Times f-plus-f-prime Pattern",
      pyqExampleId: "0373d669-a59a-4bba-9115-49c57c0ac893",
      intuition:
        "Whenever an integrand is e to the x multiplied by a function PLUS its own derivative, the answer is simply e to the x times that function. It is the product rule run backwards, and the NDA hides it inside long bracketed expressions.",
      definition:
        "The pattern:\n" +
        "\\[\\int e^x\\big(f(x) + f'(x)\\big)\\,dx = e^x f(x) + C.\\]\n" +
        "It works because \\(\\dfrac{d}{dx}\\big(e^x f(x)\\big) = e^x f(x) + e^x f'(x) = e^x\\big(f + f'\\big)\\). " +
        "The skill is spotting the split — group the bracket into a function and its derivative. A related trick: when two integrals are easier to ADD than to do alone (\\(I_1 + I_2\\)), combine the integrands first.",
      formula: {
        label: "Reverse product rule",
        latex: "\\int e^x\\big(f(x)+f'(x)\\big)\\,dx = e^x f(x) + C",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int e^x\\big(\\tan x + \\sec^2 x\\big)\\,dx\\).",
        steps: [
          "Spot the split: let \\(f(x) = \\tan x\\). Then \\(f'(x) = \\sec^2 x\\).",
          "The integrand is exactly \\(e^x\\big(f + f'\\big)\\).",
          "Apply the pattern: the answer is \\(e^x f(x)\\).",
        ],
        answer: "\\(e^x \\tan x + C\\)",
      },
      traps: [
        {
          title: "The whole bracket must be \\(f + f'\\)",
          body:
            "Identify \\(f\\) so that the LEFTOVER terms are exactly \\(f'\\). If they are not, the shortcut does not apply and you fall back to substitution or parts. Check by differentiating your proposed \\(e^x f(x)\\).",
        },
      ],
    },

    // 8 — cyclic & paired e^x trig + reading a form (PYQ 9967b15a)
    {
      kind: "formula" as const,
      slug: "cyclic-paired-ex-trig",
      name: "Cyclic and Paired Integrals of e-to-the-x Times Trig",
      pyqExampleId: "9967b15a-79bb-4d0c-97cb-b7ab60cf1114",
      intuition:
        "Integrals of e to the x times sine or cosine come back to themselves after two by-parts steps, so they are best memorised as a matched pair. NDA passages then ask you to ADD, SUBTRACT, or READ these results rather than re-derive them.",
      definition:
        "The two standard results (each provable by parts — see Integration by Parts):\n" +
        "\\[\\int e^x\\cos x\\,dx = \\dfrac{e^x(\\cos x + \\sin x)}{2} + C,\\]\n" +
        "\\[\\int e^x\\sin x\\,dx = \\dfrac{e^x(\\sin x - \\cos x)}{2} + C.\\]\n" +
        "Verify either by differentiating the right side — a tool you already have. With \\(u = \\int e^x\\cos x\\,dx\\) and \\(v = \\int e^x\\sin x\\,dx\\), note \\(\\dfrac{du}{dx} = e^x\\cos x\\) and \\(\\dfrac{dv}{dx} = e^x\\sin x\\) by the fundamental theorem — so \\(u+v = e^x\\sin x = \\dfrac{dv}{dx}\\). Passages on a given antiderivative form \\(\\big(\\text{e.g. } U(x)V(x) - 3\\ln|U+V|\\big)\\) are solved by integrating, then matching the result piece-by-piece to read off \\(U\\) and \\(V\\).",
      formula: {
        label: "The matched pair",
        latex:
          "\\int e^x\\cos x\\,dx = \\tfrac{e^x(\\cos x+\\sin x)}{2}+C,\\quad \\int e^x\\sin x\\,dx = \\tfrac{e^x(\\sin x-\\cos x)}{2}+C",
      },
      authoredExample: {
        prompt:
          "Using the standard pair, find \\(\\displaystyle\\int e^x(\\cos x - \\sin x)\\,dx\\).",
        steps: [
          "By linearity, this is \\(\\int e^x\\cos x\\,dx - \\int e^x\\sin x\\,dx\\).",
          "Subtract the pair: \\(\\dfrac{e^x(\\cos x+\\sin x)}{2} - \\dfrac{e^x(\\sin x-\\cos x)}{2} = \\dfrac{e^x(2\\cos x)}{2}\\).",
          "Simplify.",
        ],
        answer: "\\(e^x \\cos x + C\\)",
      },
      traps: [
        {
          title: "du/dx is the integrand, not the other integral",
          body:
            "If \\(u = \\int e^x\\cos x\\,dx\\), then \\(\\dfrac{du}{dx} = e^x\\cos x\\) (you undo the integral), NOT \\(-v\\) or any other integral. Differentiation cancels the integral sign directly.",
        },
      ],
    },

    // 9 — periodicity / properties (PYQ 75af1160)
    {
      kind: "formula" as const,
      slug: "antiderivative-properties",
      name: "Properties of an Antiderivative",
      pyqExampleId: "75af1160-c774-4855-bc44-528276c45450",
      intuition:
        "Some NDA items are reasoning questions: they ask whether an antiderivative inherits a property of its integrand — most often periodicity. The key fact is that integrating ADDS a linear term, which can destroy periodicity even when the integrand is periodic.",
      definition:
        "A function \\(g\\) is periodic with period \\(p\\) if \\(g(x+p) = g(x)\\). " +
        "Integrating a periodic function need NOT give a periodic result. Example: \\(\\sin^2 x = \\dfrac{1-\\cos 2x}{2}\\) is periodic, but \\(\\int \\sin^2 x\\,dx = \\dfrac{x}{2} - \\dfrac{\\sin 2x}{4} + C\\) carries a \\(\\dfrac{x}{2}\\) term that grows without bound. So 'the integrand is periodic' is true, while 'the antiderivative is periodic' is false — two statements that look linked but are not. " +
        "Two inverse relations underpin all of this: integrating a derivative returns the function (up to \\(+C\\)), and differentiating an integral returns the integrand.",
      formula: {
        label: "Integration and differentiation are inverse",
        latex:
          "\\int F'(x)\\,dx = F(x) + C \\qquad \\dfrac{d}{dx}\\!\\int f(x)\\,dx = f(x)",
        symbols: [
          { symbol: "F'(x)", meaning: "a derivative; integrating it recovers \\(F\\) up to a constant" },
        ],
      },
      authoredExample: {
        prompt:
          "Is \\(\\displaystyle\\int(1+\\cos 2x)\\,dx\\) a periodic function of \\(x\\)?",
        steps: [
          "Integrate: \\(\\int 1\\,dx + \\int \\cos 2x\\,dx = x + \\dfrac{\\sin 2x}{2} + C\\).",
          "The \\(\\sin 2x / 2\\) part is periodic, but the bare \\(x\\) term is not — it increases forever.",
          "A sum of a periodic and a non-periodic (unbounded) term is not periodic.",
        ],
        answer: "No — the linear \\(x\\) term destroys periodicity, even though the integrand \\(1+\\cos 2x\\) is periodic.",
      },
      traps: [
        {
          title: "Two true facts can still give a false link",
          body:
            "'\\(\\sin^2(x+\\pi)=\\sin^2 x\\)' is true and 'the integrand is periodic' is true — but neither makes the ANTIDERIVATIVE periodic. Judge the statement about \\(f(x)\\), not the one about the integrand, on its own.",
        },
      ],
    },

    // Trig simplification toolkit (foundation — used across the whole chapter; no single PYQ)
    {
      kind: "formula" as const,
      slug: "ii-trig-simplification-toolkit",
      name: "Trigonometric Simplification Toolkit",
      intuition:
        "Across calculus a 'hard' integral is often just an unsimplified trig expression. Before reaching for a method, scan for these standard forms and collapse them first — a root disappears, a quotient becomes a single tangent, a product becomes one angle.",
      definition:
        "Keep these collapses in reflex memory:\n" +
        "- **Half-angle of \\(1\\pm\\cos x\\):** \\(1-\\cos x = 2\\sin^2\\tfrac{x}{2}\\), \\(1+\\cos x = 2\\cos^2\\tfrac{x}{2}\\); so \\(\\dfrac{1-\\cos x}{1+\\cos x}=\\tan^2\\tfrac{x}{2}\\), \\(\\dfrac{1}{1-\\cos x}=\\tfrac12\\csc^2\\tfrac{x}{2}\\), \\(\\dfrac{1}{1+\\cos x}=\\tfrac12\\sec^2\\tfrac{x}{2}\\).\n" +
        "- **Power-reduction (double angle):** \\(1-\\cos 2x = 2\\sin^2 x\\), \\(1+\\cos 2x = 2\\cos^2 x\\), \\(\\sin 2x = 2\\sin x\\cos x\\).\n" +
        "- **Perfect square under a root:** \\(1\\pm\\sin 2x=(\\sin x\\pm\\cos x)^2\\) and \\(1\\pm\\sin\\theta=\\left(\\cos\\tfrac\\theta2\\pm\\sin\\tfrac\\theta2\\right)^2\\), so \\(\\sqrt{1\\pm\\sin 2x}=|\\sin x\\pm\\cos x|\\) — **keep the modulus; its sign depends on the interval.**\n" +
        "- **\\(\\sec\\pm\\tan\\):** \\(\\sec x+\\tan x=\\dfrac{1+\\sin x}{\\cos x}=\\tan\\!\\left(\\tfrac\\pi4+\\tfrac x2\\right)\\), \\(\\sec x-\\tan x=\\tan\\!\\left(\\tfrac\\pi4-\\tfrac x2\\right)\\).\n" +
        "- **Harmonic form:** \\(a\\sin x+b\\cos x=\\sqrt{a^2+b^2}\\,\\sin(x+\\alpha)\\), so its extreme values are \\(\\pm\\sqrt{a^2+b^2}\\).\n" +
        "- **Weierstrass \\(t=\\tan\\tfrac{x}{2}\\):** \\(\\sin x=\\dfrac{2t}{1+t^2}\\), \\(\\cos x=\\dfrac{1-t^2}{1+t^2}\\), \\(dx=\\dfrac{2\\,dt}{1+t^2}\\) — turns any rational function of \\(\\sin x,\\cos x\\) into a rational function of \\(t\\).",
      formula: {
        label: "The collapses you reach for most",
        latex:
          "1+\\cos x = 2\\cos^2\\tfrac{x}{2},\\quad 1-\\cos x = 2\\sin^2\\tfrac{x}{2},\\quad \\sqrt{1\\pm\\sin 2x}=|\\sin x\\pm\\cos x|",
        symbols: [
          { symbol: "\\(\\tfrac{x}{2}\\)", meaning: "half-angle — appears whenever you collapse \\(1\\pm\\cos x\\)" },
          { symbol: "\\(|\\cdots|\\)", meaning: "the root of a perfect square is a MODULUS; fix the sign on the given interval" },
        ],
      },
      authoredExample: {
        prompt: "Evaluate \\(\\displaystyle\\int \\dfrac{dx}{1+\\cos x}\\).",
        steps: [
          "Collapse the denominator with the half-angle form: \\(1+\\cos x = 2\\cos^2\\tfrac{x}{2}\\).",
          "So \\(\\dfrac{1}{1+\\cos x} = \\tfrac12\\sec^2\\tfrac{x}{2}\\), and \\(\\int \\tfrac12\\sec^2\\tfrac{x}{2}\\,dx = \\tfrac12\\cdot\\dfrac{\\tan\\tfrac{x}{2}}{1/2}\\).",
          "The \\(\\tfrac12\\) cancels the \\(\\tfrac12\\) from differentiating \\(\\tfrac{x}{2}\\).",
        ],
        answer: "\\(\\tan\\tfrac{x}{2} + C\\)",
      },
      selfCheckExample: {
        prompt: "Simplify \\(\\dfrac{1-\\cos x}{1+\\cos x}\\), then evaluate \\(\\displaystyle\\int \\dfrac{1-\\cos x}{1+\\cos x}\\,dx\\).",
        steps: [
          "The quotient is \\(\\tan^2\\tfrac{x}{2} = \\sec^2\\tfrac{x}{2} - 1\\).",
          "Integrate: \\(\\int\\!\\left(\\sec^2\\tfrac{x}{2}-1\\right)dx = 2\\tan\\tfrac{x}{2} - x + C\\).",
        ],
        answer: "\\(2\\tan\\tfrac{x}{2} - x + C\\)",
      },
      practiceSet: [
        { prompt: "Write \\(1-\\cos 6x\\) without the leading \\(1\\).", answer: "\\(2\\sin^2 3x\\)", method: "power-reduction \\(1-\\cos 2\\theta=2\\sin^2\\theta\\) with \\(\\theta=3x\\)" },
        { prompt: "Simplify \\(\\sqrt{1+\\sin 2x}\\) for \\(0<x<\\tfrac{\\pi}{4}\\).", answer: "\\(\\sin x+\\cos x\\)", method: "\\((\\sin x+\\cos x)^2\\); positive on this interval" },
        { prompt: "Write \\(\\sec x-\\tan x\\) as one tangent.", answer: "\\(\\tan\\!\\left(\\tfrac\\pi4-\\tfrac x2\\right)\\)" },
        { prompt: "Maximum value of \\(5\\sin x+12\\cos x\\).", answer: "\\(13\\)", method: "\\(\\sqrt{5^2+12^2}\\)" },
      ],
      traps: [
        {
          title: "\\(1\\pm\\cos x\\) (half-angle) vs \\(1\\pm\\cos 2x\\) (power-reduction)",
          body:
            "Different collapses: \\(1-\\cos x = 2\\sin^2\\tfrac{x}{2}\\) but \\(1-\\cos 2x = 2\\sin^2 x\\). Read the angle inside the cosine before choosing the factor — the wrong one halves or doubles the argument.",
        },
        {
          title: "The root of a perfect square is a MODULUS",
          body:
            "\\(\\sqrt{(\\sin x-\\cos x)^2} = |\\sin x-\\cos x|\\), not \\(\\sin x-\\cos x\\). Resolve the sign on the given interval: on \\((\\tfrac\\pi4,\\tfrac\\pi2)\\) it is \\(+(\\sin x-\\cos x)\\); on \\((0,\\tfrac\\pi4)\\) it is \\(-(\\sin x-\\cos x)\\). Dropping the modulus is the most common error on \\(\\sqrt{1\\pm\\sin 2x}\\) problems.",
        },
        {
          title: "\\(\\sec\\pm\\tan\\) — mind which way the half-angle shifts",
          body:
            "\\(\\sec x+\\tan x=\\tan\\!\\left(\\tfrac\\pi4+\\tfrac x2\\right)\\) but \\(\\sec x-\\tan x=\\tan\\!\\left(\\tfrac\\pi4-\\tfrac x2\\right)\\). Useful check: \\((\\sec x+\\tan x)(\\sec x-\\tan x)=\\sec^2x-\\tan^2x=1\\).",
        },
      ],
    },
  ],
};
