import type { SubtopicNote } from "@/app/notes/_types";

export const JEE_CH_KIN_ZERO_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Zero Order and Finding the Order",
  title: "Zero Order and Finding the Order",
  oneLineDefinition:
    "A zero-order reactant falls in a straight line and its half-life shrinks with the concentration; how the half-life depends on the starting concentration, or which plot is straight, tells you the order.",
  whyItMatters:
    "Sixteen PYQs, seven of them multiple choice, and three from 2026. Six use the zero-order law, its half-life or a zero-order plot; six find the order from how the half-life changes with the starting concentration or pressure; four name the order from the shape of a graph. Three ideas cover the page.",
  concepts: [
    // C1 — the zero-order law
    {
      kind: "formula" as const,
      slug: "jckin-zero-order",
      name: "The zero-order law and its half-life",
      intuition:
        "In a zero-order reaction the rate does not depend on how much reactant is left — for example when a gas decomposes on a metal surface that is fully covered. The concentration falls by the same amount every minute, in a straight line. So the more there is, the longer half of it takes.",
      definition:
        "- \\(r = k\\); \\([A] = [A]_0 - kt\\); \\(k\\) in mol L\\(^{-1}\\) s\\(^{-1}\\).\n" +
        "- \\([A]\\) against \\(t\\): a straight line, slope \\(-k\\), intercept \\([A]_0\\).\n" +
        "- \\(t_{1/2} = \\dfrac{[A]_0}{2k}\\), proportional to \\([A]_0\\).\n" +
        "- Completion: \\(t_{100\\%} = \\dfrac{[A]_0}{k} = 2t_{1/2}\\). A first-order reaction, by contrast, never completes.\n" +
        "- Each later half-life is half the one before, so the time to fall to \\(\\tfrac14\\) is \\(1.5\\,t_{1/2}\\), not \\(2t_{1/2}\\).\n" +
        "- Examples: \\(\\mathrm{NH_3}\\) decomposing on hot platinum at high pressure; \\(\\mathrm{H_2 + Cl_2}\\) in light.",
      formula: {
        label: "Zero-order law",
        latex: "[A] = [A]_0 - kt\\qquad t_{1/2} = \\frac{[A]_0}{2k}",
      },
      authoredExample: {
        prompt:
          "A zero-order reaction has \\(t_{1/2} = 40\\) min when \\([A]_0 = 0.80\\) M. Find \\(k\\), and the time for \\([A]\\) to fall from 0.30 M to 0.10 M.",
        steps: [
          "\\(k = \\dfrac{[A]_0}{2t_{1/2}} = \\dfrac{0.80}{80} = 0.01\\) M min\\(^{-1}\\).",
          "The fall is 0.20 M at a constant 0.01 M min\\(^{-1}\\): \\(t = \\dfrac{0.20}{0.01} = 20\\) min.",
        ],
        answer: "\\(k = 0.01\\) M min\\(^{-1}\\); \\(20\\) min.",
      },
      selfCheckExample: {
        prompt: "A zero-order reaction has \\(t_{1/2} = 30\\) min. How long does it take for the reactant to fall to 10% of its starting value?",
        steps: [
          "\\(\\dfrac{[A]_0}{k} = 2t_{1/2} = 60\\) min.",
          "90% has to go: \\(t = \\dfrac{0.9[A]_0}{k} = 0.9 \\times 60 = 54\\) min.",
        ],
        answer: "\\(54\\) min.",
      },
      practiceSet: [
        { prompt: "\\([A]_0\\) is doubled for a zero-order reaction. What happens to \\(t_{1/2}\\)?", answer: "It doubles" },
        { prompt: "Zero order: \\(t_{100\\%}\\) in terms of \\(t_{1/2}\\)?", answer: "\\(2t_{1/2}\\)" },
        { prompt: "Zero order with \\(k = 0.02\\) M s\\(^{-1}\\) and \\([A]_0 = 0.5\\) M. Half-life?", answer: "\\(12.5\\) s" },
        { prompt: "Unit of \\(k\\) for a zero-order reaction?", answer: "mol L\\(^{-1}\\) s\\(^{-1}\\)" },
      ],
      pyqExampleId: "689ed24e-0dc4-4100-b96e-1af02c2d2dca", // 2025 — zero order, t½ given at 2.0 M, time from 0.50 to 0.25
      traps: [
        {
          title: "One-quarter taken as two half-lives",
          body:
            "That holds only for first order. For zero order the second half-life is half the first, so the reactant reaches one-quarter at \\(1.5\\,t_{1/2}\\).",
        },
        {
          title: "Zero-order half-life treated as fixed",
          body:
            "\\(t_{1/2} = \\dfrac{[A]_0}{2k}\\) depends on the concentration you start from. Work out \\(k\\) from the stated half-life first, then find any later time from \\([A] = [A]_0 - kt\\).",
        },
      ],
    },

    // C2 — order from the half-life
    {
      kind: "formula" as const,
      slug: "jckin-order-from-half-life",
      name: "Order from how the half-life depends on the starting concentration",
      intuition:
        "For order \\(n\\), \\(t_{1/2} \\propto [A]_0^{\\,1-n}\\). So compare two half-lives measured from two starting concentrations (or pressures): the power that links them gives \\(1 - n\\). A constant half-life means first order; one that grows with \\([A]_0\\) means an order below 1.",
      definition:
        "- \\(n = 0\\): \\(t_{1/2} \\propto [A]_0\\). \\(n = \\tfrac12\\): \\(t_{1/2} \\propto \\sqrt{[A]_0}\\). \\(n = 1\\): constant. \\(n = 2\\): \\(t_{1/2} \\propto \\dfrac{1}{[A]_0}\\).\n" +
        "- \\(\\dfrac{t_{1/2}'}{t_{1/2}} = \\left(\\dfrac{[A]_0'}{[A]_0}\\right)^{1-n}\\). For a gas, initial pressure stands in for \\([A]_0\\).\n" +
        "- Put both half-lives in the same unit before dividing.\n" +
        "- Time to \\(\\tfrac14\\) exactly twice the time to \\(\\tfrac12\\) means equal successive half-lives: first order.\n" +
        "- The order of a reaction is fixed; it does not change when the starting concentration changes.",
      formula: {
        label: "Half-life and order",
        latex: "t_{1/2} \\propto [A]_0^{\\,1-n}\\quad\\Rightarrow\\quad \\frac{t_{1/2}'}{t_{1/2}} = \\left(\\frac{[A]_0'}{[A]_0}\\right)^{1-n}",
      },
      authoredExample: {
        prompt:
          "The half-life of a reaction is 120 s when \\([A]_0 = 0.20\\) M and 30 s when \\([A]_0 = 0.80\\) M. Find the order.",
        steps: [
          "\\([A]_0\\) rises 4 times while \\(t_{1/2}\\) becomes \\(\\tfrac14\\).",
          "\\(\\tfrac14 = 4^{1-n}\\), so \\(1 - n = -1\\) and \\(n = 2\\).",
        ],
        answer: "Second order.",
      },
      selfCheckExample: {
        prompt:
          "A gas decomposes with a half-life of 40 s at an initial pressure of 100 Torr and 80 s at 200 Torr. What is the order?",
        steps: [
          "Doubling the pressure doubles \\(t_{1/2}\\): \\(2 = 2^{1-n}\\), so \\(1 - n = 1\\).",
        ],
        answer: "Zero order.",
      },
      practiceSet: [
        { prompt: "\\(t_{1/2}\\) is unchanged when \\([A]_0\\) is tripled. Order?", answer: "\\(1\\)" },
        { prompt: "\\(t_{1/2}\\) halves when \\([A]_0\\) is doubled. Order?", answer: "\\(2\\)" },
        { prompt: "\\(t_{1/2}\\) doubles when \\([A]_0\\) is made 4 times. Order?", answer: "\\(\\tfrac12\\)" },
        { prompt: "The time to reach one-quarter is exactly twice the time to reach one-half. Order?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "d2984670-0b2f-4061-b5ad-d380f631aae9", // 2025 — half-life table gives n = ½, then predict other half-lives
      traps: [
        {
          title: "Seconds compared with minutes",
          body:
            "240 s at one pressure and 4.0 min at another are the SAME half-life, which means first order. Convert both to one unit before taking the ratio.",
        },
        {
          title: "The order changing with concentration",
          body:
            "A half-life table is used to find one fixed order. A statement that the order becomes 1 when the concentration is raised is false.",
        },
      ],
    },

    // C3 — reading the order from a graph
    {
      kind: "reference" as const,
      slug: "jckin-order-graphs",
      name: "Identifying zero and first order from the shape of a graph",
      intuition:
        "Each order has one pair of axes that gives a straight line. Zero order is straight in \\([A]\\) against \\(t\\); first order is straight in \\(\\ln[A]\\) against \\(t\\). Read which plot is straight and which way it slopes.",
      definition:
        "- Zero order: \\([A]\\) against \\(t\\) is straight; the rate is constant, so rate against \\(t\\) or against \\([A]\\) is horizontal.\n" +
        "- First order: \\(\\ln[A]\\) or \\(\\log\\dfrac{[A]}{[A]_0}\\) against \\(t\\) is straight; rate against \\([A]\\) is a line through the origin; \\(t_{1/2}\\) against \\([A]_0\\) is horizontal.\n" +
        "- \\(\\log\\dfrac{[A]}{[A]_0}\\) falls with time: its slope is \\(-\\dfrac{k}{2.303}\\). Its reverse, \\(\\log\\dfrac{[A]_0}{[A]}\\), rises with slope \\(+\\dfrac{k}{2.303}\\).",
      table: {
        columns: ["Plot", "Zero order", "First order"],
        rows: [
          { cells: ["\\([A]\\) against \\(t\\)", "Straight line, slope \\(-k\\)", "Falling exponential curve that never reaches zero"] },
          { cells: ["\\(\\ln[A]\\) against \\(t\\)", "Curve bending downward", "Straight line, slope \\(-k\\)"] },
          { cells: ["\\(\\log\\dfrac{[A]}{[A]_0}\\) against \\(t\\)", "Curve bending downward", "Straight line through the origin, slope \\(-\\dfrac{k}{2.303}\\)"] },
          { cells: ["Rate against \\(t\\)", "Horizontal line", "Falling exponential curve"] },
          { cells: ["Rate against \\([A]\\)", "Horizontal line", "Straight line through the origin, slope \\(k\\)"] },
          { cells: ["\\(t_{1/2}\\) against \\([A]_0\\)", "Straight line through the origin", "Horizontal line"] },
        ],
        caption: "Find the straight plot first; its slope then gives k.",
      },
      selfCheckExample: {
        prompt:
          "For a reaction, the plot of rate against \\([A]\\) is a straight line through the origin. What is the order, and what does the plot of \\(t_{1/2}\\) against \\([A]_0\\) look like?",
        steps: [
          "Rate \\(\\propto [A]\\): first order.",
          "A first-order half-life does not depend on \\([A]_0\\), so the plot is a horizontal line.",
        ],
        answer: "First order; a horizontal line.",
      },
      practiceSet: [
        { prompt: "\\([A]\\) against \\(t\\) is a straight line with a negative slope. Order?", answer: "Zero" },
        { prompt: "Which plot is straight for a first-order reaction: \\([A]\\) against \\(t\\), or \\(\\ln[A]\\) against \\(t\\)?", answer: "\\(\\ln[A]\\) against \\(t\\)" },
        { prompt: "Slope of \\(\\log\\dfrac{[A]}{[A]_0}\\) against \\(t\\) for a first-order reaction?", answer: "\\(-\\dfrac{k}{2.303}\\)" },
        { prompt: "Rate against time is a horizontal line. Order?", answer: "Zero" },
      ],
      pyqExampleId: "ddb64e18-4dc9-4aea-8a4c-0ff1d4fda770", // 2025 — two graphs: t½ against [R]₀, log([R]/[R]₀) against t
      traps: [
        {
          title: "The sign of the slope",
          body:
            "\\(\\log\\dfrac{[A]}{[A]_0}\\) falls with time, so its slope is \\(-\\dfrac{k}{2.303}\\). A statement giving the slope as \\(+\\dfrac{k}{2.303}\\) for this plot is false.",
        },
        {
          title: "A rate–time line read as a concentration–time line",
          body:
            "A horizontal RATE against time line means zero order. A horizontal CONCENTRATION against time line would mean nothing is reacting. Read the axis label first.",
        },
      ],
    },
  ],
};
