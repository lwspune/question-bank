import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CK_RATE_NOTE: SubtopicNote = {
  subtopicName: "Rate and Rate Law",
  title: "Rate and Rate Law",
  oneLineDefinition:
    "The rate of a reaction and how it links to each species, the rate law rate = k[A]ˣ[B]ʸ with its order and molecularity, finding the orders from initial rates, and the units of the rate constant.",
  whyItMatters:
    "Three NEET questions from 2023 to 2026. One scales a rate law (rate = k[A]²[B] with [A] tripled, 2023), one finds the orders in A and B from a table of initial rates (Re-NEET 2024), and one matches zero, first, second and third order with the units of k (2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchck-rate-law",
      name: "Rate of reaction and the rate law",
      intuition:
        "The rate of a reaction is how fast a reactant is used up or a product is formed, measured as a change in concentration per unit time. It depends on the concentrations of the reactants, and the rate law says exactly how. Once you know the power on each concentration, you can say what happens to the rate when any concentration is changed.",
      definition:
        "- Average rate over a time interval: \\(-\\dfrac{\\Delta[\\text{R}]}{\\Delta t}\\) for a reactant, \\(+\\dfrac{\\Delta[\\text{P}]}{\\Delta t}\\) for a product. The instantaneous rate is the slope of the tangent to the concentration against time curve.\n" +
        "- For \\(a\\text{A} + b\\text{B} \\rightarrow c\\text{C} + d\\text{D}\\): rate \\(= -\\dfrac{1}{a}\\dfrac{d[\\text{A}]}{dt} = -\\dfrac{1}{b}\\dfrac{d[\\text{B}]}{dt} = \\dfrac{1}{c}\\dfrac{d[\\text{C}]}{dt} = \\dfrac{1}{d}\\dfrac{d[\\text{D}]}{dt}\\).\n" +
        "- **Rate law:** rate \\(= k[\\text{A}]^{x}[\\text{B}]^{y}\\). The powers x and y are found by experiment and need not equal a and b.\n" +
        "- **Order** is the sum of the powers, \\(x + y\\). It can be 0, 1, 2, 3 or even a fraction.\n" +
        "- **Molecularity** is the number of reacting species that must collide at the same time in an elementary reaction: 1, 2 or rarely 3. It is always a whole number and is never zero.\n" +
        "- In a complex reaction (many steps), the slowest step decides the overall rate.\n" +
        "- If [A] is made n times with everything else fixed, the rate becomes \\(n^{x}\\) times.",
      formula: {
        label: "Rate law",
        latex: "\\text{rate} = k[\\text{A}]^{x}[\\text{B}]^{y}, \\qquad \\text{order} = x + y",
        symbols: [
          { symbol: "\\(k\\)", meaning: "rate constant" },
          { symbol: "\\(x, y\\)", meaning: "orders in A and B, found by experiment" },
        ],
      },
      authoredExample: {
        prompt:
          "For a reaction, rate \\(= k[\\text{A}][\\text{B}]^{2}\\). [A] is doubled and [B] is halved at the same time. What happens to the rate?",
        steps: [
          "The factor on [A] is \\(2^{1} = 2\\).",
          "The factor on [B] is \\(\\left(\\dfrac{1}{2}\\right)^{2} = \\dfrac{1}{4}\\).",
          "New rate \\(= 2 \\times \\dfrac{1}{4} = \\dfrac{1}{2}\\) of the old rate.",
        ],
        answer: "The rate halves",
      },
      selfCheckExample: {
        prompt:
          "In the reaction \\(2\\text{NO}_2 \\rightarrow 2\\text{NO} + \\text{O}_2\\), oxygen forms at \\(1.5 \\times 10^{-4}\\) mol L⁻¹ s⁻¹. At what rate is \\(\\text{NO}_2\\) used up?",
        steps: [
          "Rate \\(= -\\dfrac{1}{2}\\dfrac{d[\\text{NO}_2]}{dt} = \\dfrac{d[\\text{O}_2]}{dt}\\).",
          "\\(-\\dfrac{d[\\text{NO}_2]}{dt} = 2 \\times 1.5 \\times 10^{-4} = 3.0 \\times 10^{-4}\\) mol L⁻¹ s⁻¹.",
        ],
        answer: "\\(3.0 \\times 10^{-4}\\) mol L⁻¹ s⁻¹",
      },
      practiceSet: [
        { prompt: "For a reaction, rate \\(= k[\\text{A}]^{1/2}[\\text{B}]^{2}\\). What is its overall order?", answer: "2.5" },
        { prompt: "A reaction has the rate law rate \\(= k[\\text{A}][\\text{B}]\\). Must it be a single elementary step with molecularity 2?", answer: "No; the rate law comes from experiment, and molecularity applies only to an elementary step" },
        { prompt: "In the reaction \\(2\\text{A} \\rightarrow \\text{B}\\), A is used up at 0.4 mol L⁻¹ s⁻¹. What is the rate of the reaction?", answer: "0.2 mol L⁻¹ s⁻¹" },
        { prompt: "Can the molecularity of a reaction be zero or a fraction?", answer: "No; molecularity is always a whole number (1, 2 or 3)" },
      ],
      pyqExampleId: "35482413-7a35-4ae6-b7f5-e4dd49d6932a",
      traps: [
        {
          title: "The powers are not the coefficients",
          body: "The orders in a rate law come from experiment. For a complex reaction they need not match the numbers in the balanced equation, so never write the rate law straight from the equation.",
        },
        {
          title: "Divide by the coefficient",
          body: "The rate of a reaction is the rate of change of a species divided by its coefficient. In \\(2\\text{N}_2\\text{O}_5 \\rightarrow 4\\text{NO}_2 + \\text{O}_2\\), \\(\\text{NO}_2\\) forms twice as fast as \\(\\text{N}_2\\text{O}_5\\) is used up.",
        },
        {
          title: "Order and molecularity are different",
          body: "Order can be zero or a fraction and applies to any reaction. Molecularity is a whole number and has meaning only for an elementary reaction (a single step).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchck-initial-rates",
      name: "Finding the order from initial rates",
      intuition:
        "To find the order in one reactant, change only its concentration and keep the others the same. Whatever happens to the rate is then due to that reactant alone. The factor by which the rate changes, compared with the factor by which the concentration changed, gives the power.",
      definition:
        "- Choose two experiments in which only [A] changes. If [A] becomes n times and the rate becomes m times, then \\(n^{x} = m\\).\n" +
        "- When [A] is doubled: rate unchanged means order 0, doubled means 1, four times means 2, eight times means 3.\n" +
        "- Do the same for B with another pair of experiments.\n" +
        "- Then put any one experiment into the rate law to find k.",
      formula: {
        label: "Order from two experiments, B fixed",
        latex: "\\frac{r_2}{r_1} = \\left(\\frac{[\\text{A}]_2}{[\\text{A}]_1}\\right)^{x}",
      },
      authoredExample: {
        prompt:
          "For A + B → products: Experiment 1, [A] = 0.1 M, [B] = 0.1 M, rate \\(3.0 \\times 10^{-4}\\). Experiment 2, [A] = 0.2 M, [B] = 0.1 M, rate \\(1.2 \\times 10^{-3}\\). Experiment 3, [A] = 0.2 M, [B] = 0.3 M, rate \\(1.2 \\times 10^{-3}\\) (rates in mol L⁻¹ s⁻¹). Find the rate law and k.",
        steps: [
          "Experiments 1 and 2 (B fixed): [A] doubles and the rate becomes \\(\\dfrac{1.2 \\times 10^{-3}}{3.0 \\times 10^{-4}} = 4\\) times. \\(2^{x} = 4\\), so x = 2.",
          "Experiments 2 and 3 (A fixed): [B] triples and the rate does not change, so y = 0.",
          "Rate \\(= k[\\text{A}]^{2}\\). From experiment 1: \\(k = \\dfrac{3.0 \\times 10^{-4}}{(0.1)^{2}} = 3.0 \\times 10^{-2}\\) L mol⁻¹ s⁻¹.",
        ],
        answer: "Rate \\(= k[\\text{A}]^{2}\\), \\(k = 3.0 \\times 10^{-2}\\) L mol⁻¹ s⁻¹",
      },
      selfCheckExample: {
        prompt:
          "A reaction has rate \\(= k[\\text{A}]^{x}\\). When [A] is raised from 0.02 M to 0.08 M, the initial rate rises from \\(1.0 \\times 10^{-3}\\) to \\(8.0 \\times 10^{-3}\\) mol L⁻¹ s⁻¹. Find x.",
        steps: [
          "[A] becomes \\(\\dfrac{0.08}{0.02} = 4\\) times; the rate becomes \\(\\dfrac{8.0 \\times 10^{-3}}{1.0 \\times 10^{-3}} = 8\\) times.",
          "\\(4^{x} = 8\\), that is \\(2^{2x} = 2^{3}\\), so \\(x = \\dfrac{3}{2}\\).",
        ],
        answer: "x = 1.5",
      },
      practiceSet: [
        { prompt: "With [B] fixed, doubling [A] leaves the initial rate unchanged. What is the order in A?", answer: "Zero" },
        { prompt: "With [B] fixed, [A] is made 3 times and the initial rate becomes 9 times. What is the order in A?", answer: "2" },
        { prompt: "With [A] fixed, [B] is halved and the initial rate falls to one-eighth. What is the order in B?", answer: "3" },
        { prompt: "For a reaction with rate \\(= k[\\text{A}][\\text{B}]\\), the rate is \\(4.0 \\times 10^{-3}\\) mol L⁻¹ s⁻¹ when [A] = 0.2 M and [B] = 0.1 M. Find k.", answer: "0.2 L mol⁻¹ s⁻¹" },
      ],
      pyqExampleId: "09362120-9128-4d1f-8df2-bc6c5c415ec9",
      traps: [
        {
          title: "Change one concentration at a time",
          body: "Only compare two experiments in which a single concentration differs. A pair in which both [A] and [B] change mixes the two orders and gives neither.",
        },
        {
          title: "The order is the power, not the factor",
          body: "When doubling [A] makes the rate four times, the order is 2, because \\(2^{2} = 4\\). It is not 4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchck-units",
      name: "Units of the rate constant",
      intuition:
        "The rate always has the same unit, concentration per time. The rate constant has to make the rate law balance, so its unit changes with the order: the more concentration terms multiply k, the more concentration units k has to cancel.",
      definition:
        "- \\(k = \\dfrac{\\text{rate}}{[\\text{A}]^{n}}\\), so the unit of k is \\((\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}\\) for an order n reaction.\n" +
        "- Zero order: mol L⁻¹ s⁻¹. First order: s⁻¹. Second order: mol⁻¹ L s⁻¹. Third order: mol⁻² L² s⁻¹.\n" +
        "- For a gas reaction with concentrations as pressures in atm, the unit is \\(\\text{atm}^{1-n}\\,\\text{s}^{-1}\\).\n" +
        "- At a given temperature, k does not change when the concentrations change. It changes with temperature.",
      formula: {
        label: "Unit of k for order n",
        latex: "k = \\frac{\\text{rate}}{[\\text{A}]^{n}} \\;\\Rightarrow\\; \\text{unit of } k = (\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}",
      },
      authoredExample: {
        prompt: "What is the unit of k for a reaction of order 3/2, with concentration in mol L⁻¹ and time in seconds?",
        steps: [
          "\\(1 - n = 1 - \\dfrac{3}{2} = -\\dfrac{1}{2}\\).",
          "Unit \\(= (\\text{mol L}^{-1})^{-1/2}\\,\\text{s}^{-1} = \\text{mol}^{-1/2}\\,\\text{L}^{1/2}\\,\\text{s}^{-1}\\).",
        ],
        answer: "\\(\\text{mol}^{-1/2}\\,\\text{L}^{1/2}\\,\\text{s}^{-1}\\)",
      },
      selfCheckExample: {
        prompt: "A gas reaction is second order, and its rate is measured in atm s⁻¹. What is the unit of k?",
        steps: [
          "With pressure in place of concentration, the unit is \\(\\text{atm}^{1-n}\\,\\text{s}^{-1}\\).",
          "For n = 2: \\(\\text{atm}^{-1}\\,\\text{s}^{-1}\\).",
        ],
        answer: "atm⁻¹ s⁻¹",
      },
      practiceSet: [
        { prompt: "A first-order gas reaction is followed by its pressure instead of its concentration. Does the unit of k change?", answer: "No; it stays s⁻¹, because \\(1 - n = 0\\)" },
        { prompt: "What is the unit of k for a reaction of order 1/2, with concentration in mol L⁻¹ and time in seconds?", answer: "\\(\\text{mol}^{1/2}\\,\\text{L}^{-1/2}\\,\\text{s}^{-1}\\)" },
        { prompt: "A first-order reaction runs at 0.04 mol L⁻¹ s⁻¹ when [A] = 0.2 M. Find k with its unit.", answer: "0.2 s⁻¹" },
        { prompt: "Which changes the value of k: doubling a reactant's concentration, or raising the temperature?", answer: "Raising the temperature" },
      ],
      pyqExampleId: "8fb8a87a-6f4b-40dc-8fb0-64d8ebf34a2a",
      traps: [
        {
          title: "Rate keeps one unit, k does not",
          body: "The rate is always in mol L⁻¹ s⁻¹ whatever the order. It is the unit of k that changes, as \\((\\text{mol L}^{-1})^{1-n}\\,\\text{s}^{-1}\\).",
        },
        {
          title: "First order has no concentration unit",
          body: "For a first-order reaction \\(1 - n = 0\\), so k is in s⁻¹ (or min⁻¹) alone. That is why a first-order k does not depend on the unit chosen for concentration.",
        },
      ],
    },
  ],
};
