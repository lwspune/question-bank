import type { SubtopicNote } from "@/app/notes/_types";

export const APPROXIMATIONS_NOTE: SubtopicNote = {
  subtopicName: "Approximations using Differentials",
  title: "Approximations Using Differentials",
  oneLineDefinition:
    "Near an easy point, a smooth curve is almost its tangent line — so f(a + h) is roughly f(a) plus the tangent's rise h·f'(a). This one formula estimates roots, powers, trig values, logs, exponentials, and polynomial values.",
  whyItMatters:
    "This subtopic is a reliable easy-to-moderate scorer on MHT-CET: 11 PYQs sit here (10 MODERATE, 1 EASY), and every one is the SAME single-line move — pick a nearby exact point, add the tangent correction. " +
    "The recurring traps are all mechanical: choosing an anchor whose value you cannot compute exactly, getting the sign of h wrong, and — the biggest one — using degrees instead of radians for a trig derivative. Master the formula once and the whole subtopic collapses into arithmetic.",
  concepts: [
    // 1 — dy = f'(x) dx and the linear-approximation formula (foundation, no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetaod-linear-approximation",
      name: "The Differential dy and the Linear-Approximation Formula",
      visualizationSlug: "diff-tangent-slope",
      intuition:
        "For a tiny input change \\(dx\\), the actual change in \\(y\\) is almost exactly the tangent's rise: \\(dy = f'(x)\\,dx\\). Geometrically the tangent line hugs the curve near the point of contact, so replacing the curve by its tangent gives a fast, accurate estimate. To evaluate \\(f\\) at a point slightly off an easy one, start at the easy value and add the tangent's rise.",
      definition:
        "For a differentiable function, the **differential** is \\(dy = f'(x)\\,dx\\) — the change predicted by the tangent line. Writing the target as \\(a + h\\) where \\(a\\) is a nearby point with an easy exact value and \\(h\\) is a small (possibly negative) gap:\n" +
        "\\[f(a + h) \\approx f(a) + h\\,f'(a).\\]\n" +
        "Two disciplines make this work every time:\n" +
        "- **Choose \\(a\\) so \\(f(a)\\) is exact and clean** — a perfect square/cube, a standard angle, a round power of 10.\n" +
        "- **Get the sign of \\(h\\) right** — if the target is below the anchor, \\(h\\) is negative.\n" +
        "The correction term \\(h\\,f'(a)\\) uses the slope AT the anchor \\(a\\), never at the target.",
      formula: {
        label: "Linear approximation",
        latex: "f(a + h) \\approx f(a) + h\\,f'(a) \\qquad \\big(dy = f'(x)\\,dx\\big)",
        symbols: [
          { symbol: "a", meaning: "nearby point with an easy exact value" },
          { symbol: "h", meaning: "small gap to the target (may be negative)" },
          { symbol: "f'(a)", meaning: "slope at the anchor a — the multiplier of h" },
        ],
      },
      authoredExample: {
        prompt: "Estimate \\(\\sqrt{25.3}\\) using differentials.",
        steps: [
          "Take \\(f(x) = \\sqrt{x}\\), anchor \\(a = 25\\) (since \\(\\sqrt{25} = 5\\) exactly), gap \\(h = 0.3\\).",
          "\\(f'(x) = \\dfrac{1}{2\\sqrt{x}}\\), so \\(f'(25) = \\dfrac{1}{10} = 0.1\\).",
          "Apply the formula: \\(\\sqrt{25.3} \\approx 5 + 0.3 \\times 0.1 = 5 + 0.03 = 5.03\\).",
        ],
        answer: "\\(\\sqrt{25.3} \\approx 5.03\\)",
      },
      selfCheckExample: {
        prompt: "Estimate \\((1.02)^5\\) using the linear-approximation formula.",
        steps: [
          "Take \\(f(x) = x^5\\), anchor \\(a = 1\\) (\\(f(1) = 1\\)), gap \\(h = 0.02\\).",
          "\\(f'(x) = 5x^4\\), so \\(f'(1) = 5\\).",
          "\\((1.02)^5 \\approx 1 + 0.02 \\times 5 = 1 + 0.1 = 1.10\\).",
        ],
        answer: "\\((1.02)^5 \\approx 1.10\\)",
      },
      practiceSet: [
        { prompt: "Write the linear-approximation formula for \\(f(a+h)\\).", answer: "\\(f(a) + h\\,f'(a)\\)", method: "tangent-line correction" },
        { prompt: "For \\(\\sqrt{16.2}\\), what anchor \\(a\\) and gap \\(h\\)?", answer: "\\(a = 16,\\; h = 0.2\\)", method: "nearest perfect square" },
        { prompt: "The differential \\(dy\\) equals?", answer: "\\(f'(x)\\,dx\\)", method: "tangent's rise" },
        { prompt: "For \\((7.9)^2\\), is the gap \\(h\\) positive or negative?", answer: "Negative (\\(a=8,\\; h=-0.1\\))", method: "target below anchor" },
      ],
      traps: [
        {
          title: "The slope is \\(f'(a)\\) — evaluate at the anchor, not the target",
          body:
            "The correction term is \\(h\\,f'(a)\\), using the derivative at the EASY point \\(a\\). Evaluating \\(f'(a+h)\\) (at the target) defeats the whole purpose — you chose \\(a\\) precisely so the slope there is easy. For \\(\\sqrt{25.3}\\) use \\(f'(25)=1/10\\), not \\(f'(25.3)\\).",
        },
        {
          title: "Get the sign of \\(h\\) right",
          body:
            "If the target is BELOW the anchor, \\(h\\) is negative. To estimate \\(\\sqrt{24.7}\\) with \\(a=25\\), take \\(h=-0.3\\), giving \\(5 - 0.03 = 4.97\\). A wrong sign pushes the estimate the wrong way by twice the correction.",
        },
      ],
    },

    // 2 — roots and powers (anchored: cube roots, ^(3/2))
    {
      kind: "formula" as const,
      slug: "cetaod-roots-and-powers",
      name: "Approximating Roots and Powers",
      intuition:
        "The most common target is a root or a fractional power near a perfect value — \\(\\sqrt[3]{64.04}\\), \\((3.978)^{3/2}\\), \\(\\sqrt[3]{0.026}\\). Anchor at the nearest perfect power so \\(f(a)\\) is a whole number, then add one tangent correction. The whole difficulty is picking the right anchor and computing \\(f'(a)\\) cleanly.",
      definition:
        "For \\(f(x) = x^{p/q}\\): \\(f'(x) = \\dfrac{p}{q}\\,x^{p/q - 1}\\), and \\(f(a+h) \\approx a^{p/q} + h\\cdot\\dfrac{p}{q}\\,a^{p/q-1}\\).\n" +
        "- **Cube root** \\(f(x)=x^{1/3}\\): \\(f'(x)=\\dfrac{1}{3x^{2/3}}\\). Anchor at a perfect cube (\\(64,\\;0.027,\\;8\\)).\n" +
        "- **Three-halves power** \\(f(x)=x^{3/2}\\): \\(f'(x)=\\dfrac{3}{2}\\sqrt{x}\\). Anchor at a perfect square (\\(4,\\;9,\\;16\\)).\n" +
        "Small decimals like \\(0.026\\) still work — anchor at the nearby perfect cube \\(0.027 = 0.3^3\\).",
      formula: {
        label: "Power/root approximation",
        latex: "(a + h)^{p/q} \\approx a^{p/q} + h\\cdot\\dfrac{p}{q}\\,a^{\\,p/q - 1}",
        symbols: [
          { symbol: "a", meaning: "nearest perfect power (perfect cube for a cube root, etc.)" },
          { symbol: "p/q", meaning: "the exponent — carries through to the derivative" },
        ],
      },
      authoredExample: {
        prompt: "Estimate \\(\\sqrt[3]{64.04}\\).",
        steps: [
          "Take \\(f(x) = x^{1/3}\\), anchor \\(a = 64\\) (\\(\\sqrt[3]{64} = 4\\)), gap \\(h = 0.04\\).",
          "\\(f'(x) = \\dfrac{1}{3x^{2/3}}\\), so \\(f'(64) = \\dfrac{1}{3\\cdot 16} = \\dfrac{1}{48}\\).",
          "\\(\\sqrt[3]{64.04} \\approx 4 + 0.04 \\times \\dfrac{1}{48} = 4 + 0.000833 \\approx 4.00083\\).",
        ],
        answer: "\\(\\sqrt[3]{64.04} \\approx 4.00083\\)",
      },
      selfCheckExample: {
        prompt: "Estimate \\(\\sqrt[3]{0.026}\\).",
        steps: [
          "Take \\(f(x) = x^{1/3}\\), anchor \\(a = 0.027 = (0.3)^3\\), gap \\(h = -0.001\\).",
          "\\(f'(0.027) = \\dfrac{1}{3\\,(0.027)^{2/3}} = \\dfrac{1}{3\\,(0.09)} = \\dfrac{1}{0.27}\\).",
          "\\(\\sqrt[3]{0.026} \\approx 0.3 + (-0.001)\\cdot\\dfrac{1}{0.27} \\approx 0.3 - 0.0037 = 0.2963\\).",
        ],
        answer: "\\(\\sqrt[3]{0.026} \\approx 0.2963\\)",
      },
      practiceSet: [
        { prompt: "\\(f'(x)\\) for \\(f(x) = x^{3/2}\\)?", answer: "\\(\\dfrac{3}{2}\\sqrt{x}\\)", method: "power rule" },
        { prompt: "Estimate \\((3.978)^{3/2}\\).", answer: "\\(\\approx 7.934\\)", method: "\\(a=4,\\; h=-0.022,\\; f'(4)=3\\)" },
        { prompt: "Estimate \\((8.1)^{1/3}\\).", answer: "\\(\\approx 2.0083\\)", method: "\\(a=8,\\; h=0.1,\\; f'=1/12\\)" },
        { prompt: "Best anchor for \\(\\sqrt[3]{0.026}\\)?", answer: "\\(0.027 = 0.3^3\\)", method: "nearest perfect cube" },
      ],
      pyqExampleId: "bc096b50-bfd1-4315-959b-82f55eb185dd",
      traps: [
        {
          title: "Anchor at a perfect power, not just any round number",
          body:
            "For \\(\\sqrt[3]{0.026}\\), do NOT anchor at \\(0\\) or \\(0.025\\) — neither has a clean cube root. Use \\(0.027 = 0.3^3\\) so \\(f(a)=0.3\\) is exact. Choosing an anchor whose value you cannot compute exactly wrecks the whole method.",
        },
        {
          title: "Watch \\(x^{p/q - 1}\\) in the derivative",
          body:
            "For \\(x^{3/2}\\) the derivative is \\(\\tfrac32 x^{1/2} = \\tfrac32\\sqrt{x}\\), so \\(f'(4) = \\tfrac32\\cdot 2 = 3\\) — a clean integer, which is why \\(a=4\\) is the right anchor. Subtracting \\(1\\) from the exponent wrongly (e.g. leaving \\(x^{3/2}\\)) inflates the correction.",
        },
      ],
    },

    // 3 — trig values (degrees→radians, cos/sin at standard angles)
    {
      kind: "formula" as const,
      slug: "cetaod-trig-approximation",
      name: "Approximating Trigonometric Values",
      intuition:
        "To estimate a trig value a few minutes/seconds away from a standard angle, anchor at the standard angle (30°, 45°, 60°) and add the tangent correction. The one rule that trips everyone: the derivative of a trig function is in RADIANS, so the gap \\(h\\) must be converted from degrees/minutes/seconds to radians first.",
      definition:
        "Use \\(f(a+h) \\approx f(a) + h\\,f'(a)\\) with \\(f = \\sin\\) or \\(\\cos\\):\n" +
        "- \\(\\dfrac{d}{dx}\\sin x = \\cos x\\), \\(\\dfrac{d}{dx}\\cos x = -\\sin x\\) (note the sign for cosine).\n" +
        "- **\\(h\\) must be in radians:** \\(1^\\circ = 0.0175\\) rad, \\(1' = \\tfrac{1}{60}^\\circ\\), \\(1'' = \\tfrac{1}{3600}^\\circ\\). So \\(30' = 0.5^\\circ = 0.00875\\) rad, \\(10'' \\approx 0.0000485\\) rad.\n" +
        "- Anchor \\(a\\) at the standard angle so \\(\\sin a,\\cos a\\) are exact; if the target is below the anchor, \\(h < 0\\).",
      formula: {
        label: "Trig approximation (h in radians)",
        latex: "\\sin(a + h) \\approx \\sin a + h\\cos a, \\qquad \\cos(a + h) \\approx \\cos a - h\\sin a",
        symbols: [
          { symbol: "a", meaning: "nearby standard angle (30°, 45°, 60° …)" },
          { symbol: "h", meaning: "the small angular gap, CONVERTED TO RADIANS" },
        ],
      },
      authoredExample: {
        prompt:
          "Estimate \\(\\sin(46^\\circ)\\), given \\(1^\\circ = 0.0175\\) rad and \\(\\sin 45^\\circ = \\cos 45^\\circ = 0.7071\\).",
        steps: [
          "Anchor \\(a = 45^\\circ\\); target is ABOVE it, so gap \\(h = +1^\\circ = 0.0175\\) rad.",
          "\\(f(x) = \\sin x\\), \\(f'(x) = \\cos x\\), so \\(f'(45^\\circ) = \\cos 45^\\circ = 0.7071\\).",
          "\\(\\sin(46^\\circ) \\approx 0.7071 + 0.0175 \\times 0.7071 = 0.7071 + 0.012374 \\approx 0.7195\\).",
        ],
        answer: "\\(\\sin(46^\\circ) \\approx 0.7195\\)",
      },
      selfCheckExample: {
        prompt:
          "Estimate \\(\\cos(59^\\circ 30')\\), given \\(1^\\circ = 0.0175\\) rad and \\(\\sin 60^\\circ = 0.8660\\).",
        steps: [
          "Anchor at the nearby standard angle \\(a = 60^\\circ\\); target is BELOW it, so \\(h = -30' = -0.5^\\circ = -0.00875\\) rad.",
          "\\(f(x) = \\cos x\\), \\(f'(60^\\circ) = -\\sin 60^\\circ = -0.8660\\).",
          "\\(\\cos(59^\\circ 30') \\approx \\cos 60^\\circ + (-0.00875)(-0.8660) = 0.5 + 0.00758 \\approx 0.5076\\).",
        ],
        answer: "\\(\\cos(59^\\circ 30') \\approx 0.5076\\)",
      },
      practiceSet: [
        { prompt: "Convert \\(30'\\) to radians (use \\(1^\\circ = 0.0175\\)).", answer: "\\(0.00875\\) rad", method: "\\(30' = 0.5^\\circ\\)" },
        { prompt: "\\(\\dfrac{d}{dx}\\cos x = ?\\)", answer: "\\(-\\sin x\\)", method: "sign is negative" },
        { prompt: "Anchor angle for \\(\\sin(44^\\circ)\\)?", answer: "\\(45^\\circ\\) (\\(h = -1^\\circ\\))", method: "nearest standard angle, target below" },
        { prompt: "Estimate \\(\\sin(60^\\circ 0'10'')\\) (given \\(\\sqrt3 = 1.732\\)).", answer: "\\(\\approx 0.8660243\\)", method: "\\(a=60^\\circ,\\; h=10''\\approx 0.0000485,\\; f'=\\cos60^\\circ=0.5\\)" },
      ],
      pyqExampleId: "a5670ff8-8382-4928-8c6f-71795fef5317",
      traps: [
        {
          title: "Convert the gap to RADIANS before multiplying",
          body:
            "The derivatives \\(\\cos x,\\;-\\sin x\\) are rates per radian. If you plug \\(h = 0.5\\) (the degree count) instead of \\(0.00875\\) rad, the correction is off by a factor of ~57. Always convert minutes/seconds → degrees → radians first.",
        },
        {
          title: "Cosine's derivative carries a minus sign",
          body:
            "\\(\\dfrac{d}{dx}\\cos x = -\\sin x\\). For \\(\\cos(30^\\circ 30')\\) the correction is \\(h\\cdot(-\\sin 30^\\circ)\\), which DECREASES the value (cosine falls as the angle rises past 0). Dropping the minus pushes the estimate the wrong way.",
        },
      ],
    },

    // 4 — logs and exponentials
    {
      kind: "formula" as const,
      slug: "cetaod-log-exp-approximation",
      name: "Approximating Logarithms and Exponentials",
      intuition:
        "Logs and exponentials near a clean anchor estimate the same way — anchor at a round power (\\(1000\\), an integer exponent) and add the tangent correction. The two facts to keep straight are the derivatives: \\(\\dfrac{d}{dx}\\log_{10} x = \\dfrac{\\log_{10} e}{x}\\) and \\(\\dfrac{d}{dx}a^x = a^x \\log a\\).",
      definition:
        "For a **base-10 log**, \\(f(x) = \\log_{10} x\\) gives \\(f'(x) = \\dfrac{\\log_{10} e}{x} = \\dfrac{0.4343}{x}\\) (since \\(\\log_{10} x = \\dfrac{\\log_e x}{\\log_e 10}\\)). Anchor at a power of 10 so \\(f(a)\\) is a whole number.\n" +
        "For an **exponential** \\(f(x) = a^x\\), \\(f'(x) = a^x \\log a\\) (natural log). Anchor at an integer exponent so \\(f(a)\\) is exact, then \\(f(a+h) \\approx a^n + h\\,a^n\\log a\\).\n" +
        "Throughout, an unqualified \\(\\log\\) means the natural logarithm; a base-10 log is written \\(\\log_{10}\\).",
      formula: {
        label: "Log & exponential approximation",
        latex: "\\dfrac{d}{dx}\\log_{10} x = \\dfrac{0.4343}{x}, \\qquad \\dfrac{d}{dx}a^x = a^x \\log a",
        symbols: [
          { symbol: "0.4343", meaning: "\\(\\log_{10} e\\) — the base-conversion factor for a base-10 log" },
          { symbol: "\\(\\log a\\)", meaning: "natural log of the base, in the exponential derivative" },
        ],
      },
      authoredExample: {
        prompt: "Estimate \\(\\log_{10} 1002\\), given \\(\\log_{10} e = 0.4343\\).",
        steps: [
          "Take \\(f(x) = \\log_{10} x\\), anchor \\(a = 1000\\) (\\(\\log_{10} 1000 = 3\\)), gap \\(h = 2\\).",
          "\\(f'(x) = \\dfrac{0.4343}{x}\\), so \\(f'(1000) = \\dfrac{0.4343}{1000} = 0.0004343\\).",
          "\\(\\log_{10} 1002 \\approx 3 + 2 \\times 0.0004343 = 3 + 0.0008686 \\approx 3.0009\\).",
        ],
        answer: "\\(\\log_{10} 1002 \\approx 3.0009\\)",
      },
      selfCheckExample: {
        prompt: "Estimate \\(3^{2.001}\\), given \\(\\log 3 = 1.0986\\).",
        steps: [
          "Take \\(f(x) = 3^x\\), anchor \\(a = 2\\) (\\(3^2 = 9\\)), gap \\(h = 0.001\\).",
          "\\(f'(x) = 3^x \\log 3\\), so \\(f'(2) = 9 \\times 1.0986 = 9.8874\\).",
          "\\(3^{2.001} \\approx 9 + 0.001 \\times 9.8874 = 9 + 0.0098874 \\approx 9.00989\\).",
        ],
        answer: "\\(3^{2.001} \\approx 9.00989\\)",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{d}{dx}\\log_{10} x = ?\\)", answer: "\\(\\dfrac{0.4343}{x}\\)", method: "\\(\\log_{10} e / x\\)" },
        { prompt: "\\(\\dfrac{d}{dx}2^x = ?\\)", answer: "\\(2^x \\log 2\\)", method: "exponential rule" },
        { prompt: "Anchor for \\(\\log_{10} 998\\)?", answer: "\\(a = 1000,\\; h = -2\\)", method: "power of 10, target below" },
        { prompt: "Estimate \\(\\log_{10} 998\\) (\\(\\log_{10} e = 0.4343\\)).", answer: "\\(\\approx 2.99913\\)", method: "\\(3 + (-2)(0.4343/1000)\\)" },
      ],
      pyqExampleId: "a3d52e66-6e81-487d-87ac-10995bbd1fc8",
      traps: [
        {
          title: "\\(\\dfrac{d}{dx}\\log_{10} x\\) carries the \\(0.4343\\) factor",
          body:
            "A base-10 log is NOT \\(\\dfrac{1}{x}\\) — that is the natural log. \\(\\dfrac{d}{dx}\\log_{10} x = \\dfrac{\\log_{10} e}{x} = \\dfrac{0.4343}{x}\\). Forgetting the factor makes the correction ~2.3× too big.",
        },
        {
          title: "\\(\\dfrac{d}{dx}a^x = a^x\\log a\\), not \\(x\\,a^{x-1}\\)",
          body:
            "The base is constant and the EXPONENT is the variable, so the power rule does not apply. For \\(3^{2.001}\\) use \\(f'(x) = 3^x \\log 3\\); here \\(\\log 3 = 1.0986\\) is the natural log, supplied in the question.",
        },
      ],
    },

    // 5 — polynomial value approximation (incl. via given P'' / Taylor data)
    {
      kind: "formula" as const,
      slug: "cetaod-polynomial-approximation",
      name: "Approximating Polynomial Values",
      intuition:
        "For a polynomial you could just substitute, but near a whole-number anchor the linear approximation is faster and is exactly what the paper tests. Anchor at the nearest integer, compute \\(f(a)\\) and \\(f'(a)\\), and add the correction. When the question hands you \\(P(a)\\), \\(P'(a)\\), \\(P''(a)\\) instead of the polynomial, you often reconstruct \\(P\\) first, then approximate.",
      definition:
        "For \\(f(x) = a_n x^n + \\dots + a_0\\): \\(f(a+h) \\approx f(a) + h\\,f'(a)\\), with \\(a\\) the nearest integer to the target.\n" +
        "When only derivative DATA is given (a Taylor-style setup): a degree-2 polynomial is fully determined by \\(P(a)\\), \\(P'(a)\\), \\(P''(a)\\) via\n" +
        "\\[P(x) = P(a) + P'(a)(x-a) + \\tfrac12 P''(a)(x-a)^2.\\]\n" +
        "Reconstruct \\(P\\), then evaluate (or linearly approximate) at the required point. The target may be near a DIFFERENT integer than the one where the data is given — anchor at whatever integer is nearest the target.",
      formula: {
        label: "Polynomial approximation / reconstruction",
        latex: "f(a+h) \\approx f(a) + h\\,f'(a); \\quad P(x) = P(a) + P'(a)(x-a) + \\tfrac12 P''(a)(x-a)^2",
      },
      authoredExample: {
        prompt: "Estimate \\(x^3 - 2x^2 + 3x + 2\\) at \\(x = 2.01\\).",
        steps: [
          "Let \\(f(x) = x^3 - 2x^2 + 3x + 2\\); anchor \\(a = 2\\), gap \\(h = 0.01\\).",
          "\\(f(2) = 8 - 8 + 6 + 2 = 8\\).",
          "\\(f'(x) = 3x^2 - 4x + 3\\), so \\(f'(2) = 12 - 8 + 3 = 7\\).",
          "\\(f(2.01) \\approx 8 + 0.01 \\times 7 = 8.07\\).",
        ],
        answer: "\\(f(2.01) \\approx 8.07\\)",
      },
      selfCheckExample: {
        prompt:
          "Let \\(P(x)\\) be a degree-2 polynomial with \\(P(1) = 3,\\; P'(1) = 4,\\; P''(1) = 6\\). Find \\(P(2.002)\\).",
        steps: [
          "Reconstruct: \\(P(x) = P(1) + P'(1)(x-1) + \\tfrac12 P''(1)(x-1)^2 = 3 + 4(x-1) + 3(x-1)^2 = 3x^2 - 2x + 2\\).",
          "The target \\(2.002\\) is near the integer \\(2\\), so anchor \\(a = 2\\): \\(P(2) = 12 - 4 + 2 = 10\\).",
          "\\(P'(x) = 6x - 2\\), so \\(P'(2) = 10\\).",
          "\\(P(2.002) \\approx P(2) + 0.002 \\times P'(2) = 10 + 0.002 \\times 10 = 10.02\\).",
        ],
        answer: "\\(P(2.002) \\approx 10.02\\)",
      },
      practiceSet: [
        { prompt: "\\(f(x) = x^2\\); estimate \\(f(3.01)\\).", answer: "\\(9.06\\)", method: "\\(9 + 0.01 \\times 6\\)" },
        { prompt: "Anchor for \\(f(4.98)\\)?", answer: "\\(a = 5,\\; h = -0.02\\)", method: "nearest integer, target below" },
        { prompt: "Degree-2 \\(P\\) with \\(P(0)=1, P'(0)=2, P''(0)=6\\): write \\(P(x)\\).", answer: "\\(3x^2 + 2x + 1\\)", method: "\\(P(0) + P'(0)x + \\tfrac12 P''(0)x^2\\)" },
        { prompt: "\\(f(x)=x^3\\); estimate \\(f(2.001)\\).", answer: "\\(8.012\\)", method: "\\(8 + 0.001 \\times 12\\)" },
      ],
      pyqExampleId: "48eb4c48-e846-4033-b537-ca65478b4c8f",
      traps: [
        {
          title: "Anchor at the integer nearest the TARGET",
          body:
            "In the reconstruction question the data is at \\(x = 2\\), but \\(P(1.001)\\) is asked — anchor at \\(a = 1\\), not \\(2\\). Blindly linearising at the data point \\(a = 2\\) uses \\(P(2) = -1\\) and \\(P'(2) = 0\\) and gives the wrong answer. Reconstruct \\(P\\) first, then anchor near the target.",
        },
        {
          title: "The \\(\\tfrac12\\) in the reconstruction is essential",
          body:
            "\\(P(x) = P(a) + P'(a)(x-a) + \\tfrac12 P''(a)(x-a)^2\\) — the second-order term carries a \\(\\tfrac12\\). Dropping it doubles the quadratic coefficient. Here \\(\\tfrac12 P''(2) = \\tfrac12(2) = 1\\), so the leading coefficient is \\(1\\), not \\(2\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Differentiation — foundations & chain rule",
      href: "/notes/mht-cet-maths/differentiation/cetdiff-standard-derivatives-rules",
    },
    {
      label: "NDA Application of Derivatives — Tangents & Approximations",
      href: "/notes/nda-maths/application-of-derivatives/aod-tangents-normals",
    },
  ],
};
