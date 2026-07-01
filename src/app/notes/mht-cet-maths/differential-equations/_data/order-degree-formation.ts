import type { SubtopicNote } from "@/app/notes/_types";

export const ORDER_DEGREE_FORMATION_NOTE: SubtopicNote = {
  subtopicName: "Order, Degree, Formation of ODE, and Verification of Solutions",
  title: "Order, Degree, Formation, and Verification",
  oneLineDefinition:
    "The order is the highest derivative present; the degree is the power of that highest derivative once the equation is made polynomial in its derivatives; n independent arbitrary constants force an order-n differential equation, which you build by differentiating and eliminating the constants — or verify by substituting a proposed solution back.",
  whyItMatters:
    "This is the entire MHT-CET differential-equations subtopic and it is a mark-bank: 33 PYQs sit here, spanning EASY definitional order/degree right up to HARD elimination of circle and parabola families. Two mechanical skills carry almost every question — read order/degree only AFTER clearing radicals and fractional powers, and form a family's equation by differentiating once per independent constant and eliminating. " +
    "The recurring traps are exactly three: the degree is undefined when a derivative sits inside a log/trig, redundant constants (like C₃e^{x+C₄}) must be collapsed before you count the order, and only INDEPENDENT constants count.",
  concepts: [
    // 1 — DE terminology (foundation, no PYQ — formula-variant, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetde-de-terminology",
      name: "Differential Equation Terminology",
      intuition:
        "Before classifying anything, fix the vocabulary. A differential equation relates a function to its derivatives. Its order and degree are two independent labels; its solution comes in two flavours — a general solution carrying arbitrary constants, and a particular solution with those constants pinned down by conditions.",
      definition:
        "The vocabulary you must have cold:\n" +
        "- **Differential equation:** an equation involving derivatives of an unknown function, e.g. \\(\\dfrac{dy}{dx} = 3x\\) or \\(\\dfrac{d^2y}{dx^2} + 4y = 0\\).\n" +
        "- **Order:** the order of the **highest derivative** present.\n" +
        "- **Degree:** the **power of the highest-order derivative** once the equation is polynomial in its derivatives.\n" +
        "- **Arbitrary constants:** free parameters (\\(a, b, c, C_1, \\dots\\)) in a solution family.\n" +
        "- **General solution:** contains as many independent arbitrary constants as the order.\n" +
        "- **Particular solution:** a general solution with its constants fixed by given conditions.",
      formula: {
        label: "The master link",
        latex:
          "\\text{order of the ODE} \\;=\\; \\text{number of independent arbitrary constants in its general solution}",
        symbols: [
          { symbol: "order", meaning: "order of the highest derivative appearing" },
          { symbol: "arbitrary constants", meaning: "independent free parameters in the solution family" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(y = c_1 e^{2x} + c_2 e^{-3x}\\), name the order of the differential equation it solves and the type of solution it is.",
        steps: [
          "Count the independent arbitrary constants: \\(c_1\\) and \\(c_2\\) — two of them.",
          "Order \\(=\\) number of independent arbitrary constants \\(= 2\\).",
          "Because the constants are still free, this is the GENERAL solution of a second-order equation.",
        ],
        answer: "Order 2; it is a general solution.",
      },
      selfCheckExample: {
        prompt:
          "A general solution carries the constants \\(a\\) and \\(b\\) as in \\(y = a\\cos x + b\\sin x\\). What is the order of its differential equation?",
        steps: [
          "There are two independent arbitrary constants, \\(a\\) and \\(b\\).",
          "Order \\(=\\) number of arbitrary constants \\(= 2\\).",
        ],
        answer: "Order 2.",
      },
      practiceSet: [
        { prompt: "A general solution has 4 arbitrary constants. Order of the ODE?", answer: "4", method: "order = number of arbitrary constants" },
        { prompt: "Is \\(y = 3e^{2x}\\) (no free constant) a general or particular solution?", answer: "Particular", method: "the constant is fixed" },
        { prompt: "Order of the ODE whose solution is \\(y = c_1 + c_2 x\\)?", answer: "2", method: "two constants \\(c_1, c_2\\)" },
        { prompt: "How many arbitrary constants in the general solution of a 3rd-order ODE?", answer: "3" },
      ],
      traps: [
        {
          title: "Order and degree are separate labels",
          body:
            "Order is about WHICH derivative is highest; degree is about the POWER on it. \\(\\big(\\tfrac{d^2y}{dx^2}\\big)^3 = x\\) is order 2 but degree 3. Don't conflate the two.",
        },
        {
          title: "\"Number of constants\" means INDEPENDENT constants",
          body:
            "Two constants that always merge into one (like \\(c_1 + c_3\\)) count as a single arbitrary constant. Collapse the family first, then count — the order equals the number of constants that survive.",
        },
      ],
    },

    // 2 — order = highest derivative
    {
      kind: "formula" as const,
      slug: "cetde-order",
      name: "Order = Order of the Highest Derivative Present",
      intuition:
        "Order is the easiest classifier to read: scan the equation for derivatives and pick the one differentiated the most times. A cubed second derivative is still order 2 — the power never touches the order.",
      definition:
        "**Order** of a differential equation \\(=\\) the order of the **highest-order derivative** that appears in it.\n" +
        "- \\(\\dfrac{d^2y}{dx^2}\\) present but no higher derivative \\(\\Rightarrow\\) order 2, regardless of any power on it.\n" +
        "- A high power on a LOW derivative does not raise the order: \\(\\big(\\tfrac{dy}{dx}\\big)^{5} + \\tfrac{d^3y}{dx^3} = 0\\) is order 3 (because \\(\\tfrac{d^3y}{dx^3}\\) is present), not order 5.\n" +
        "- Mixed powers of the same top derivative also leave the order alone.",
      formula: {
        label: "Order",
        latex: "\\text{order} = \\text{the order of the highest derivative appearing in the equation}",
      },
      authoredExample: {
        prompt:
          "Find the order of \\(x^2\\dfrac{d^3y}{dx^3} + \\big(\\dfrac{dy}{dx}\\big)^{4} - y = 0\\).",
        steps: [
          "List the derivatives present: \\(\\dfrac{d^3y}{dx^3}\\) and \\(\\dfrac{dy}{dx}\\).",
          "The highest-order one is \\(\\dfrac{d^3y}{dx^3}\\) — a third derivative.",
          "The power \\(4\\) sits on the FIRST derivative, so it is irrelevant to the order.",
        ],
        answer: "Order 3.",
      },
      selfCheckExample: {
        prompt:
          "For the equation \\(\\big(\\tfrac{d^2y}{dx^2}\\big)^{3} + 5\\big(\\tfrac{dy}{dx}\\big)^{7} = \\tfrac{d^4y}{dx^4} + \\cos x\\), give the order \\(m\\) and hence \\(m^2\\).",
        steps: [
          "Highest derivative present is \\(\\dfrac{d^4y}{dx^4}\\) \\(\\Rightarrow\\) order \\(m = 4\\).",
          "The powers \\(3\\) and \\(7\\) sit on the LOWER derivatives — they do not raise the order.",
          "So \\(m^2 = 16\\).",
        ],
        answer: "\\(m = 4\\), \\(m^2 = 16\\).",
      },
      practiceSet: [
        { prompt: "Order of \\(\\big(\\frac{d^2y}{dx^2}\\big)^7 + y = 0\\)?", answer: "2", method: "power 7 doesn't change order" },
        { prompt: "Order of \\(\\frac{d^4y}{dx^4} - \\big(\\frac{dy}{dx}\\big)^{10} = x\\)?", answer: "4" },
        { prompt: "Order of \\(x\\frac{d^3y}{dx^3} - \\frac{dy}{dx} = 0\\)?", answer: "3" },
        { prompt: "If order \\(m=3\\) and degree \\(n=1\\), find \\(m^2 + n^2\\).", answer: "10", method: "\\(9 + 1\\)" },
      ],
      pyqExampleId: "61cf70ca-8da9-43e4-bea2-5c79c2a72b5c", // m^2+n^2 with 3rd derivative order 3
      traps: [
        {
          title: "A power on the top derivative is DEGREE, never order",
          body:
            "\\(\\big(\\tfrac{d^2y}{dx^2}\\big)^{5}\\) reads as \"order 2, degree 5\", not \"order 5\". The exponent belongs to degree; the order only counts how many times you differentiated.",
        },
      ],
    },

    // 3 — degree after clearing radicals/fractions
    {
      kind: "formula" as const,
      slug: "cetde-degree-clear-radicals",
      name: "Degree = Power of the Highest Derivative After Clearing Radicals",
      intuition:
        "Degree is only meaningful once the equation is polynomial in its derivatives. So the first move is always to rationalize: raise both sides to a power that clears every root and fractional exponent. Read the degree only from the CLEAN equation, never the raw one.",
      definition:
        "To find the **degree**:\n" +
        "1. Clear all radicals and fractional powers on the derivatives (raise to a suitable power).\n" +
        "2. Once the equation is polynomial in the derivatives, the degree is the **power on the highest-order derivative**.\n" +
        "- Example shape: \\(\\sqrt{y''} = \\sqrt[5]{y' - 5}\\) becomes \\((y'')^5 = (y'-5)^2\\) after raising to the 10th power \\(\\Rightarrow\\) degree 5.\n" +
        "- The LCM of the fractional exponents tells you the power to raise both sides to.",
      formula: {
        label: "Degree",
        latex:
          "\\text{degree} = \\text{power of the highest-order derivative, once the equation is polynomial in its derivatives}",
      },
      authoredExample: {
        prompt:
          "Find the order and degree of \\(\\big(\\dfrac{d^2y}{dx^2}\\big)^{2/3} = \\big(1 + \\dfrac{dy}{dx}\\big)^{1/2}\\), and their sum.",
        steps: [
          "Highest derivative is \\(\\dfrac{d^2y}{dx^2}\\) \\(\\Rightarrow\\) order \\(= 2\\).",
          "Clear the fractional powers: raise both sides to the 6th power (LCM of 3 and 2): \\(\\big(\\tfrac{d^2y}{dx^2}\\big)^{4} = \\big(1 + \\tfrac{dy}{dx}\\big)^{3}\\).",
          "Now the power on \\(\\dfrac{d^2y}{dx^2}\\) is \\(4\\) \\(\\Rightarrow\\) degree \\(= 4\\).",
          "Sum \\(= 2 + 4 = 6\\).",
        ],
        answer: "Order 2, degree 4; sum \\(= 6\\).",
      },
      selfCheckExample: {
        prompt:
          "Find the order and degree of \\(k\\,\\dfrac{d^2y}{dx^2} = \\Big[1 + \\big(\\dfrac{dy}{dx}\\big)^2\\Big]^{3/2}\\).",
        steps: [
          "Highest derivative is \\(\\dfrac{d^2y}{dx^2}\\) \\(\\Rightarrow\\) order \\(= 2\\).",
          "Clear the \\(\\tfrac32\\) fractional power: square both sides so every exponent becomes an integer.",
          "\\(k^2\\big(\\dfrac{d^2y}{dx^2}\\big)^{2} = \\big[1 + (y')^2\\big]^{3}\\) — now polynomial in the derivatives.",
          "The power on \\(\\dfrac{d^2y}{dx^2}\\) is \\(2\\) \\(\\Rightarrow\\) degree \\(= 2\\).",
        ],
        answer: "Order 2, degree 2.",
      },
      practiceSet: [
        { prompt: "Degree of \\(\\big(\\frac{d^2y}{dx^2}\\big)^{3/2} = \\big(\\frac{dy}{dx}\\big)^{5/2}\\) after clearing?", answer: "3", method: "square: \\((y'')^3 = (y')^5\\)" },
        { prompt: "Order and degree of \\(\\sqrt{\\frac{dy}{dx}} - 4\\frac{dy}{dx} - 7x = 0\\)?", answer: "Order 1, degree 2", method: "square to clear the root" },
        { prompt: "Sum of order and degree of \\(\\big(\\frac{d^3y}{dx^3}\\big)^2 = 1 + \\frac{dy}{dx}\\)?", answer: "5", method: "order 3 + degree 2" },
        { prompt: "Degree of \\(\\big(1+(y')^2\\big)^{1/2} = y''\\)?", answer: "2", method: "square: \\(1+(y')^2 = (y'')^2\\)" },
      ],
      pyqExampleId: "838fabe7-9a5e-4c5c-8cea-f57ed6c2b1bb", // sqrt(y'') = 5th-root(y'-5), sum = 7
      traps: [
        {
          title: "Clear radicals BEFORE you read the degree",
          body:
            "The degree is NOT the fractional exponent you first see. For \\(\\big(\\tfrac{d^2y}{dx^2}\\big)^{0.6} = y'\\), raise to the 5th power to get \\(\\big(\\tfrac{d^2y}{dx^2}\\big)^{3} = (y')^5\\): degree \\(= 3\\), not \\(0.6\\). Make it polynomial first.",
        },
        {
          title: "Raise to the LCM of the fractional exponents",
          body:
            "With a \\(\\sqrt{\\;}\\) (power \\(\\tfrac12\\)) and a \\(\\sqrt[5]{\\;}\\) (power \\(\\tfrac15\\)), raise both sides to the 10th power in one shot — squaring alone leaves the 5th root, and 5th-powering alone leaves the square root.",
        },
      ],
    },

    // 4 — degree undefined / negative-fractional powers
    {
      kind: "formula" as const,
      slug: "cetde-degree-undefined",
      name: "When Degree Is Undefined (Derivative Inside a Transcendental)",
      intuition:
        "You can only clear radicals and fractional powers by algebra. If a derivative is trapped inside a log, a trig, or an exponential, no amount of raising to powers makes the equation polynomial in its derivatives — so the degree simply does not exist. The order still does.",
      definition:
        "**Degree is undefined** when the equation cannot be made polynomial in its derivatives:\n" +
        "- A derivative appears inside a **transcendental** function: \\(\\log\\!\\big(\\tfrac{d^2y}{dx^2}\\big)\\), \\(\\sin\\!\\big(\\tfrac{dy}{dx}\\big)\\), \\(e^{\\,y''}\\), etc.\n" +
        "- **Order is still well-defined** in these cases — read it as usual (the highest derivative present).\n" +
        "- Only radicals/fractional powers can be cleared; a derivative inside \\(\\log\\)/\\(\\sin\\)/\\(\\cos\\)/\\(e^{(\\cdot)}\\) is permanent.",
      formula: {
        label: "Degree-undefined criterion",
        latex:
          "\\text{degree undefined} \\iff \\text{a derivative sits inside a transcendental (}\\log,\\ \\sin,\\ \\cos,\\ e^{(\\cdot)}\\text{)}",
      },
      authoredExample: {
        prompt:
          "State the order and degree of \\(\\dfrac{d^2y}{dx^2} = e^{\\,dy/dx} + x\\).",
        steps: [
          "Highest derivative is \\(\\dfrac{d^2y}{dx^2}\\) \\(\\Rightarrow\\) order \\(= 2\\).",
          "The term \\(e^{\\,dy/dx}\\) contains a derivative inside an exponential.",
          "No algebra can make this polynomial in the derivatives, so the degree does not exist.",
        ],
        answer: "Order 2; degree not defined.",
      },
      selfCheckExample: {
        prompt:
          "Find the order and degree of \\(\\dfrac{dy}{dx} + \\sin\\!\\Big(\\dfrac{dy}{dx}\\Big) = 0\\).",
        steps: [
          "Highest derivative is \\(\\dfrac{dy}{dx}\\) \\(\\Rightarrow\\) order \\(= 1\\).",
          "A derivative sits inside \\(\\sin\\) — it cannot be made polynomial in \\(\\tfrac{dy}{dx}\\).",
          "So the degree is undefined.",
        ],
        answer: "Order 1; degree not defined.",
      },
      practiceSet: [
        { prompt: "Degree of \\(\\frac{d^2y}{dx^2} = \\cos\\!\\big(\\frac{dy}{dx}\\big)\\)?", answer: "Not defined", method: "derivative inside \\(\\cos\\)" },
        { prompt: "Order of \\(\\frac{d^2y}{dx^2} = x^2\\log\\!\\big(\\frac{d^2y}{dx^2}\\big)\\)?", answer: "2", method: "order stays defined" },
        { prompt: "Degree of \\(e^{\\,dy/dx} = x\\)?", answer: "Not defined", method: "derivative inside \\(e^{(\\cdot)}\\)" },
        { prompt: "Degree of \\(y'' + \\tan(y') = 0\\)?", answer: "Not defined" },
      ],
      pyqExampleId: "9b508010-831c-4c8c-baf6-865685743d0a", // log(d2y/dx2): degree not defined
      traps: [
        {
          title: "Seeing a first power does NOT mean degree 1",
          body:
            "For \\(\\tfrac{d^2y}{dx^2} + \\sin\\!\\big(\\tfrac{dy}{dx}\\big) = 0\\), writing \"degree 1\" because \\(\\tfrac{d^2y}{dx^2}\\) appears once is the trap. A derivative inside \\(\\sin\\), \\(\\cos\\), \\(\\log\\), or \\(e^{(\\cdot)}\\) makes the degree UNDEFINED regardless of the visible power.",
        },
        {
          title: "Order survives; only degree dies",
          body:
            "\"Degree undefined\" never means \"order undefined\". Always still report the order — it is just the highest derivative present.",
        },
      ],
    },

    // 5 — collapsing redundant arbitrary constants
    {
      kind: "formula" as const,
      slug: "cetde-collapse-constants",
      name: "Collapse Redundant Arbitrary Constants Before Counting Order",
      intuition:
        "The order of a family equals its number of INDEPENDENT arbitrary constants — but families are often written with fake extra constants that secretly merge. Simplify first: combine sums, absorb exponentials, and see how many truly-free constants remain. That count is the order.",
      definition:
        "Constants merge in predictable ways — spot and collapse them:\n" +
        "- **Sums merge:** \\(C_1 + C_2 \\to A\\) (one constant), and \\(C_1 + C_3 \\to A\\).\n" +
        "- **Exponential shifts absorb:** \\(C_3 e^{x + C_4} = (C_3 e^{C_4})e^x = B e^x\\) — the \\(C_4\\) vanishes into a single \\(B\\).\n" +
        "- **Same-form terms merge:** \\((C_1 + C_2)e^x = A e^x\\); two constants become one.\n" +
        "- After collapsing, **order = number of surviving independent constants**.",
      formula: {
        label: "Constant-absorption identity",
        latex: "C_3\\,e^{\\,x + C_4} = \\big(C_3 e^{C_4}\\big)e^{x} = B\\,e^{x}",
        symbols: [
          { symbol: "B", meaning: "the single surviving constant after absorbing \\(C_3, C_4\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Find the order of the ODE whose general solution is \\(y = C_1 + C_2 e^x + C_3 e^{x + C_4}\\).",
        steps: [
          "Absorb the exponential shift: \\(C_3 e^{x + C_4} = (C_3 e^{C_4})e^x = B e^x\\).",
          "Now \\(y = C_1 + C_2 e^x + B e^x = C_1 + (C_2 + B)e^x = A + D e^x\\).",
          "Only two independent constants survive: \\(A\\) and \\(D\\).",
        ],
        answer: "Order 2.",
      },
      selfCheckExample: {
        prompt:
          "Find the order of the ODE whose general solution is \\(y = (C_1 + C_2)\\sin(x + C_3) - C_4 e^{x + C_5}\\).",
        steps: [
          "Merge the sum: \\(C_1 + C_2 = A\\), giving \\(A\\sin(x + C_3)\\).",
          "Absorb the exponential shift: \\(C_4 e^{x + C_5} = (C_4 e^{C_5})e^x = B e^x\\).",
          "Surviving independent constants: \\(A\\), \\(C_3\\), and \\(B\\) — three of them.",
        ],
        answer: "Order 3.",
      },
      practiceSet: [
        { prompt: "Independent constants in \\(y = C_1 + C_2\\cos x + C_3 - C_4 e^{x+C_5}\\)?", answer: "3", method: "\\(C_1+C_3=A\\), \\(C_4 e^{C_5}=B\\); \\(A, C_2, B\\)" },
        { prompt: "Order for \\(y = A e^{x+B}\\)?", answer: "1", method: "\\(A e^B = C\\): one constant" },
        { prompt: "Order for \\(y = (a+b)x + c\\)?", answer: "2", method: "\\(a+b=A\\); \\(A, c\\)" },
        { prompt: "Independent constants in \\(y = c_1 e^{2x+c_2}\\)?", answer: "1", method: "\\(c_1 e^{c_2} = C\\)" },
      ],
      pyqExampleId: "46fa8d47-ff95-468f-b5df-f7dd5672ab1a", // y = C1 + C2 e^x + C3 e^{x+C4}: order 1
      traps: [
        {
          title: "\\(e^{x + C}\\) hides a constant, it does not add one",
          body:
            "\\(C_3 e^{x + C_4}\\) LOOKS like two constants but is just \\(B e^x\\) — one constant. Counting \\(C_4\\) separately over-states the order. Absorb every exponential shift before you count.",
        },
        {
          title: "Only INDEPENDENT constants count",
          body:
            "A sum like \\(C_1 + C_2\\) is a single free parameter. Two constants that can only ever appear as their sum contribute one to the order, not two.",
        },
      ],
    },

    // 6 — formation: n constants ⇒ order-n (the core rule)
    {
      kind: "formula" as const,
      slug: "cetde-formation-rule",
      name: "Formation: n Independent Constants ⇒ Order-n Differential Equation",
      intuition:
        "To build the differential equation of a family, you must get rid of every arbitrary constant. Each differentiation gives you one more equation to eliminate one constant — so a family with n independent constants needs n differentiations, producing an order-n equation. Count the constants first; that fixes the order before you compute anything.",
      definition:
        "The formation recipe:\n" +
        "- Count the **independent arbitrary constants** \\(n\\) in the family (collapse redundant ones first).\n" +
        "- **Differentiate the family \\(n\\) times**, then **eliminate** all \\(n\\) constants using the original equation plus the derived equations.\n" +
        "- The result is a differential equation of **order \\(n\\)**, free of arbitrary constants.\n" +
        "- The **degree** of that equation is read afterwards (clear radicals first).",
      formula: {
        label: "Formation order",
        latex:
          "n \\text{ independent arbitrary constants} \\;\\Longrightarrow\\; \\text{differential equation of order } n",
      },
      authoredExample: {
        prompt:
          "What order and degree of differential equation represents the family of tangent lines to \\(x^2 = 4y\\)?",
        steps: [
          "A tangent to \\(x^2 = 4y\\) (here \\(a = 1\\)) in slope form is \\(x = m y + \\dfrac{1}{m}\\), i.e. \\(m x = m^2 y + 1\\) — ONE arbitrary constant \\(m\\).",
          "One constant \\(\\Rightarrow\\) order 1: replace \\(m = \\dfrac{dy}{dx}\\): \\(x\\dfrac{dy}{dx} = \\big(\\dfrac{dy}{dx}\\big)^2 y + 1\\).",
          "The highest derivative \\(\\dfrac{dy}{dx}\\) appears to the second power \\(\\Rightarrow\\) degree 2.",
        ],
        answer: "Order 1, degree 2.",
      },
      selfCheckExample: {
        prompt:
          "The family of curves \\(y^2 = 2c(x + \\sqrt{c})\\) with positive parameter \\(c\\). What are the order and degree of its differential equation?",
        steps: [
          "One arbitrary constant \\(c\\) \\(\\Rightarrow\\) one differentiation \\(\\Rightarrow\\) order 1.",
          "Differentiate: \\(2yy' = 2c\\), so \\(c = yy'\\); substitute back into \\(y^2 = 2c(x + \\sqrt{c})\\).",
          "This leaves a \\(\\sqrt{c} = \\sqrt{yy'}\\); clear the radical by raising to a power — the resulting polynomial equation has degree 3.",
        ],
        answer: "Order 1, degree 3.",
      },
      practiceSet: [
        { prompt: "Family \\(y = c_1 e^{c_2 x}\\) has how many constants, so what order?", answer: "2 constants, order 2" },
        { prompt: "Order of the ODE of all parabolas with axis parallel to the Y-axis, \\((x-h)^2 = 4a(y-k)\\)?", answer: "3", method: "three constants \\(h, a, k\\)" },
        { prompt: "Order of the ODE of all straight lines \\(y = mx + c\\)?", answer: "2", method: "two constants \\(m, c\\)" },
        { prompt: "Order of the ODE of all lines through a FIXED point \\((1,-1)\\)?", answer: "1", method: "only slope \\(m\\) is free" },
      ],
      pyqExampleId: "635f9d0f-d604-4e0a-8de0-7eaa7fe65cc5", // tangent lines to x^2=4y: order 1 degree 2
      traps: [
        {
          title: "Collapse constants BEFORE fixing the order",
          body:
            "For all parabolas with axis parallel to Y, \\((x-h)^2 = 4a(y-k)\\) has THREE independent constants \\(h, a, k\\) — so its ODE is order 3 (\\(\\tfrac{d^3y}{dx^3} = 0\\)). Miscounting the constants sets the wrong order from the start.",
        },
        {
          title: "A fixed point removes a constant",
          body:
            "All lines through a fixed point have only the slope free (order 1), while all lines in the plane have slope AND intercept free (order 2). Read what is fixed before counting.",
        },
      ],
    },

    // 7 — forming the DE of a curve family (differentiate & eliminate), SVG
    {
      kind: "formula" as const,
      slug: "cetde-form-curve-family",
      name: "Forming the Differential Equation of a Curve Family",
      visualizationSlug: "defeq-family-of-curves",
      intuition:
        "Once you know the order equals the number of constants, the mechanics are pure elimination: differentiate the family, solve for a constant, and substitute back. Known functions like e^x stay in the equation — only the ARBITRARY constants must go. The visual: one equation with a free constant is a whole family of curves; the differential equation is the single rule they all obey.",
      definition:
        "For a family with constants, differentiate as many times as there are constants, then eliminate:\n" +
        "- **One constant:** differentiate once, solve for the constant, substitute back.\n" +
        "- **Two constants** (e.g. \\(Ax^2 + By^2 = 1\\)): differentiate twice and eliminate \\(A, B\\), giving a second-order equation.\n" +
        "- **Keep known functions:** in \\(x^2 y = 4e^x + c\\), the \\(e^x\\) is a known function, NOT the arbitrary constant — only \\(c\\) is eliminated, so \\(e^x\\) survives in the answer.\n" +
        "- For \\(y = e^x(a + bx + x^2)\\): use \\(y = e^x u\\), differentiate, and eliminate \\(a, b\\).",
      formula: {
        label: "Elimination recipe",
        latex:
          "\\text{differentiate } n \\text{ times} \\;\\to\\; \\text{solve for the constants} \\;\\to\\; \\text{substitute back to eliminate them}",
      },
      authoredExample: {
        prompt:
          "Form the differential equation of the family \\(x^2 y = 4e^x + c\\), where \\(c\\) is arbitrary.",
        steps: [
          "One arbitrary constant \\(c\\) \\(\\Rightarrow\\) differentiate once.",
          "\\(\\dfrac{d}{dx}(x^2 y) = \\dfrac{d}{dx}(4e^x + c)\\): \\(2xy + x^2\\dfrac{dy}{dx} = 4e^x\\).",
          "The constant \\(c\\) has already dropped out; the known function \\(4e^x\\) stays.",
          "Rearrange: \\(x^2\\dfrac{dy}{dx} + 2xy - 4e^x = 0\\).",
        ],
        answer: "\\(x^2\\dfrac{dy}{dx} + 2xy - 4e^x = 0\\).",
      },
      selfCheckExample: {
        prompt:
          "Form the differential equation of the family \\(y = e^x(a + bx + x^2)\\).",
        steps: [
          "Write \\(y = e^x u\\) with \\(u = a + bx + x^2\\), so \\(u' = b + 2x\\), \\(u'' = 2\\).",
          "Then \\(y' = e^x(u + u')\\) and \\(y'' = e^x(u + 2u' + u'')\\).",
          "Compute \\(y'' - 2y' + y = e^x\\big[(u + 2u' + u'') - 2(u + u') + u\\big] = e^x u'' = 2e^x\\).",
          "So \\(\\dfrac{d^2y}{dx^2} - 2\\dfrac{dy}{dx} + y - 2e^x = 0\\).",
        ],
        answer: "\\(\\dfrac{d^2y}{dx^2} - 2\\dfrac{dy}{dx} + y - 2e^x = 0\\).",
      },
      practiceSet: [
        { prompt: "Form the ODE of \\(y = c_1 e^{c_2 x}\\).", answer: "\\(yy'' = (y')^2\\)", method: "\\(c_2 = y'/y\\), then differentiate" },
        { prompt: "Form the ODE of \\(y = e^x(a\\cos x + b\\sin x)\\).", answer: "\\(y'' - 2y' + 2y = 0\\)", method: "roots \\(1 \\pm i\\)" },
        { prompt: "Form the ODE of all lines through \\((1,-1)\\).", answer: "\\(y = (x-1)y' - 1\\)", method: "\\(y+1 = m(x-1)\\), \\(m = y'\\)" },
        { prompt: "Form the ODE of \\(y = X\\sin(6t+5) + Y\\cos(6t+5)\\).", answer: "\\(\\frac{d^2y}{dt^2} + 36y = 0\\)", method: "\\(y'' = -36y\\)" },
      ],
      pyqExampleId: "e0eb39a6-cfb7-4cae-b43e-f4c5ac6da886", // x^2 y = 4e^x + c
      traps: [
        {
          title: "Eliminate the CONSTANT, not the known function",
          body:
            "In \\(x^2 y = 4e^x + c\\) only \\(c\\) is arbitrary — the \\(e^x\\) is a fixed function that survives differentiation. Dropping \\(e^x\\) as if it were the constant gives the wrong equation. The correct ODE keeps the \\(4e^x\\) term.",
        },
        {
          title: "Differentiate ONCE per constant — no more, no less",
          body:
            "\\(Ax^2 + By^2 = 1\\) has two constants, so it needs TWO differentiations to eliminate both (giving \\(xy y'' + x(y')^2 - yy' = 0\\)). Stopping after one differentiation leaves a constant behind.",
        },
      ],
    },

    // 8 — geometric families: circles and parabolas
    {
      kind: "formula" as const,
      slug: "cetde-geometric-families",
      name: "Forming the Differential Equation of Circles and Parabolas",
      intuition:
        "Geometric families are just curve families with a geometric constraint that fixes some constants and frees others. The whole skill is translating the words (\"centre on the X-axis\", \"touching the Y-axis\", \"vertex at origin, axis along +Y\") into an equation with the RIGHT number of free constants, then eliminating them exactly as before.",
      definition:
        "Set up the standard form from the geometric description, then eliminate:\n" +
        "- **Circles, centre on X-axis, through origin:** \\((x-a)^2 + y^2 = a^2 \\Rightarrow x^2 + y^2 = 2ax\\); eliminate \\(a\\) \\(\\to\\) \\(y^2 = x^2 + 2xy\\,y'\\) (order 1, one constant).\n" +
        "- **Circles through origin, centre on Y-axis:** \\(x^2 + y^2 = 2ky \\Rightarrow (x^2 - y^2)y' - 2xy = 0\\).\n" +
        "- **Circles touching Y-axis at origin, centre on X-axis:** \\(x^2 + y^2 = 2hx \\Rightarrow x^2 - y^2 + 2xy\\,y' = 0\\).\n" +
        "- **Parabolas, vertex origin, axis along +Y:** \\(x^2 = 4ay \\Rightarrow x\\dfrac{dy}{dx} = 2y\\) (one constant \\(a\\), order 1).\n" +
        "- **All parabolas, axis parallel to Y:** three constants \\(\\Rightarrow\\) order 3, \\(\\dfrac{d^3y}{dx^3} = 0\\).",
      formula: {
        label: "Two workhorses",
        latex:
          "x^2 + y^2 = 2ax \\;(\\text{circle}) \\qquad x^2 = 4ay \\;(\\text{parabola, axis } +Y)",
        symbols: [
          { symbol: "a", meaning: "the single geometric parameter to eliminate by one differentiation" },
        ],
      },
      authoredExample: {
        prompt:
          "Form the differential equation of all circles passing through the origin with centres on the X-axis.",
        steps: [
          "Circle through origin, centre \\((a, 0)\\): \\((x - a)^2 + y^2 = a^2\\), i.e. \\(x^2 - 2ax + y^2 = 0\\).",
          "Differentiate: \\(2x - 2a + 2y\\dfrac{dy}{dx} = 0 \\Rightarrow a = x + y\\dfrac{dy}{dx}\\).",
          "Substitute \\(a\\) back into \\(x^2 - 2ax + y^2 = 0\\): \\(x^2 - 2x\\big(x + y\\,y'\\big) + y^2 = 0\\).",
          "Simplify: \\(y^2 = x^2 + 2xy\\dfrac{dy}{dx}\\).",
        ],
        answer: "\\(y^2 = x^2 + 2xy\\dfrac{dy}{dx}\\).",
      },
      selfCheckExample: {
        prompt:
          "Form the differential equation of all circles touching the Y-axis at the origin with centre on the X-axis.",
        steps: [
          "Such a circle has centre \\((h, 0)\\) and passes through the origin: \\(x^2 + y^2 = 2hx\\), i.e. \\(x^2 - 2hx + y^2 = 0\\).",
          "Differentiate: \\(2x - 2h + 2y\\dfrac{dy}{dx} = 0 \\Rightarrow h = x + y\\dfrac{dy}{dx}\\).",
          "Substitute back: \\(x^2 - 2x\\big(x + y\\,y'\\big) + y^2 = 0 \\Rightarrow x^2 - y^2 + 2xy\\dfrac{dy}{dx} = 0\\).",
        ],
        answer: "\\(x^2 - y^2 + 2xy\\dfrac{dy}{dx} = 0\\).",
      },
      practiceSet: [
        { prompt: "ODE of parabolas, vertex origin, axis along +Y \\((x^2 = 4ay)\\)?", answer: "\\(x\\frac{dy}{dx} = 2y\\)", method: "eliminate \\(a\\)" },
        { prompt: "ODE of circles through origin, centre on Y-axis?", answer: "\\((x^2 - y^2)y' - 2xy = 0\\)", method: "\\(x^2 + y^2 = 2ky\\)" },
        { prompt: "ODE of all parabolas with axis parallel to Y-axis?", answer: "\\(\\frac{d^3y}{dx^3} = 0\\)", method: "three constants ⇒ order 3" },
        { prompt: "ODE of circles centre on \\(y = 5\\), touching X-axis?", answer: "\\((5-y)^2(y')^2 + y^2 - 10y = 0\\)", method: "\\((x-h)^2 + (y-5)^2 = 25\\)" },
      ],
      pyqExampleId: "a0a1c851-dec9-4f36-8d52-aa8405fc64d9", // circles through origin, centre on X-axis
      traps: [
        {
          title: "Translate the geometry into the RIGHT free constants",
          body:
            "\"Centre on the X-axis and touching the Y-axis\" fixes the centre as \\((a,0)\\) with radius \\(|a|\\) — ONE free constant, giving an order-1 equation. Treating it as a general circle (two/three constants) inflates the order and the answer.",
        },
        {
          title: "Mind the sign when substituting the eliminated constant",
          body:
            "For circles through the origin centred on the X-axis, substituting \\(a = x + yy'\\) yields \\(y^2 = x^2 + 2xy\\,y'\\) — a plus sign. Careless algebra flips it to \\(y^2 = x^2 - 2xy\\,y'\\), which is a different (wrong) option.",
        },
      ],
    },

    // 9 — verification / parametric / find-k / identify family
    {
      kind: "formula" as const,
      slug: "cetde-verify-solution",
      name: "Verifying a Solution and Identifying Its Family",
      intuition:
        "Sometimes you are handed a candidate solution and asked to check it, find a constant that makes it fit, or say what curve it represents. The move is the reverse of formation: substitute the function (and its derivatives) into the differential equation and simplify — matching both sides confirms it, or reveals the unknown constant.",
      definition:
        "Three verification tasks, all by substitution:\n" +
        "- **Confirm a solution:** compute \\(y', y''\\) from the given \\(y\\), plug into the ODE, and check the equation holds identically.\n" +
        "- **Find a constant \\(k\\):** for a PARAMETRIC solution \\(x = x(t),\\ y = y(t)\\), use \\(\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt}\\) and \\(\\dfrac{d^2y}{dx^2} = \\dfrac{d}{dx}\\!\\big(\\tfrac{dy}{dx}\\big)\\) to substitute, then solve for \\(k\\).\n" +
        "- **Identify the family:** solve/simplify the given ODE to its solution curve and name it (circle, hyperbola, ellipse, pair of lines).",
      formula: {
        label: "Parametric derivative",
        latex:
          "\\dfrac{dy}{dx} = \\dfrac{dy/dt}{dx/dt} \\qquad \\dfrac{d^2y}{dx^2} = \\dfrac{1}{dx/dt}\\dfrac{d}{dt}\\!\\left(\\dfrac{dy}{dx}\\right)",
        symbols: [
          { symbol: "t", meaning: "the parameter — differentiate x and y with respect to it, then divide" },
        ],
      },
      authoredExample: {
        prompt:
          "For \\(x = \\sin t\\), \\(y = a e^{t\\sqrt{2}} + b e^{-t\\sqrt{2}}\\), find \\(k\\) so that \\((1 - x^2)y'' - x y' = k y\\).",
        steps: [
          "Note \\(y\\) satisfies \\(\\dfrac{d^2y}{dt^2} = 2y\\) (each exponential contributes a factor \\((\\pm\\sqrt2)^2 = 2\\)).",
          "With \\(x = \\sin t\\): \\(\\dfrac{dx}{dt} = \\cos t\\), and \\(1 - x^2 = \\cos^2 t\\).",
          "Converting the parametric derivatives, \\((1 - x^2)y'' - x y'\\) reduces to \\(\\dfrac{d^2y}{dt^2} = 2y\\).",
          "So \\((1 - x^2)y'' - x y' = 2y\\), giving \\(k = 2\\).",
        ],
        answer: "\\(k = 2\\).",
      },
      selfCheckExample: {
        prompt:
          "The particular solution of \\((1 + y^2)\\,dx - xy\\,dy = 0\\) through \\((1, 0)\\) represents which conic?",
        steps: [
          "Separate: \\(\\dfrac{dx}{x} = \\dfrac{y\\,dy}{1 + y^2}\\).",
          "Integrate: \\(\\log x = \\tfrac12\\log(1 + y^2) + C \\Rightarrow x^2 = c(1 + y^2)\\).",
          "Apply \\((1, 0)\\): \\(1 = c(1) \\Rightarrow c = 1\\), so \\(x^2 = 1 + y^2\\), i.e. \\(x^2 - y^2 = 1\\).",
        ],
        answer: "A hyperbola.",
      },
      practiceSet: [
        { prompt: "Which ODE does \\(y = e^x(A\\cos x + B\\sin x)\\) satisfy?", answer: "\\(y'' - 2y' + 2y = 0\\)", method: "roots \\(1 \\pm i\\)" },
        { prompt: "Does \\(y = c_1 e^{c_2 x}\\) satisfy \\(yy'' = (y')^2\\)?", answer: "Yes", method: "verify by substitution" },
        { prompt: "\\(\\frac{dy}{dx} = \\frac{1 - y^2}{y}\\) gives which family?", answer: "Circles of radius 1, centre on X-axis", method: "\\((x+c)^2 + y^2 = 1\\)" },
        { prompt: "Family represented by \\(x^2 = c(1 + y^2)\\) with \\(c > 0\\)?", answer: "Hyperbolas (when reduced through a point)", method: "\\(x^2 - c y^2 = c\\)" },
      ],
      pyqExampleId: "db8d8735-3fab-42ba-9bb3-e38184fc56ff", // parametric, find k = 2
      traps: [
        {
          title: "Convert parametric derivatives correctly",
          body:
            "\\(\\dfrac{dy}{dx} \\ne \\dfrac{dy}{dt}\\) — you must divide by \\(\\dfrac{dx}{dt}\\). For \\(x = \\sin t\\), \\(\\dfrac{dx}{dt} = \\cos t\\); skipping this factor is the most common error in find-\\(k\\) questions and gives the wrong constant.",
        },
        {
          title: "Identify the conic from the SIMPLIFIED solution",
          body:
            "\\(x^2 = c(1 + y^2)\\) only becomes \\(x^2 - y^2 = 1\\) (a hyperbola) AFTER applying the given point to fix \\(c\\). Reading the conic type off the un-simplified, constant-carrying form is unreliable.",
        },
      ],
    },
  ],
};
