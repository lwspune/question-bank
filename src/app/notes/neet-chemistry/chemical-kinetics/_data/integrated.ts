import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CK_INTEGRATED_NOTE: SubtopicNote = {
  subtopicName: "Integrated Rate Laws and Half-Life",
  title: "Integrated Rate Laws and Half-Life",
  oneLineDefinition:
    "How concentration falls with time in zero-order and first-order reactions, their half-lives, the time for a given fraction to react, and the plots that tell the two orders apart.",
  whyItMatters:
    "Six NEET questions from 2022 to 2026. Two use the first-order equation (k when 0.1 M falls to 0.001 M in 5 minutes, 2022; the time for 7.2 M to fall to 0.9 M, 2025), one uses the half-life (the time for 99.9% completion when the half-life is 1 minute, 2025), one is a zero-order time (75% of A reacting in 2A → B, Re-NEET 2026), and two read the order from a plot (2022 and 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nchck-zero-order",
      name: "Zero-order reactions",
      intuition:
        "In a zero-order reaction the rate does not depend on how much reactant is left. The reactant is used up at a steady pace, like water running out of a tap at a fixed flow, so its concentration falls in a straight line until it runs out.",
      definition:
        "- Rate \\(= k[\\text{R}]^{0} = k\\): the rate stays the same as R is used up.\n" +
        "- \\([\\text{R}] = [\\text{R}]_0 - kt\\): a straight line of [R] against t, with slope \\(-k\\) and intercept \\([\\text{R}]_0\\).\n" +
        "- Half-life: \\(t_{1/2} = \\dfrac{[\\text{R}]_0}{2k}\\). It is proportional to the starting concentration.\n" +
        "- The reaction is over at \\(t = \\dfrac{[\\text{R}]_0}{k}\\).\n" +
        "- Examples: the decomposition of gaseous ammonia on a hot platinum surface at high pressure, and the thermal decomposition of HI on a gold surface.",
      formula: {
        label: "Zero order",
        latex: "[\\text{R}] = [\\text{R}]_0 - kt, \\qquad t_{1/2} = \\frac{[\\text{R}]_0}{2k}",
      },
      authoredExample: {
        prompt:
          "A → products is zero order with \\(k = 0.02\\) mol L⁻¹ min⁻¹, and \\([\\text{A}]_0 = 0.5\\) M. Find the half-life and the time for the reaction to be complete.",
        steps: [
          "\\(t_{1/2} = \\dfrac{[\\text{A}]_0}{2k} = \\dfrac{0.5}{2 \\times 0.02} = 12.5\\) min.",
          "Complete when [A] = 0: \\(t = \\dfrac{[\\text{A}]_0}{k} = \\dfrac{0.5}{0.02} = 25\\) min.",
        ],
        answer: "Half-life 12.5 min; complete in 25 min",
      },
      selfCheckExample: {
        prompt:
          "In a zero-order reaction, [R] falls from 0.8 M to 0.6 M in 10 minutes. What is [R] after 30 minutes?",
        steps: [
          "\\(k = \\dfrac{0.8 - 0.6}{10} = 0.02\\) mol L⁻¹ min⁻¹.",
          "\\([\\text{R}] = 0.8 - 0.02 \\times 30 = 0.8 - 0.6 = 0.2\\) M.",
        ],
        answer: "0.2 M",
      },
      practiceSet: [
        { prompt: "A zero-order reaction has a half-life of 20 min when \\([\\text{R}]_0 = 1.0\\) M. What is its half-life when \\([\\text{R}]_0 = 0.5\\) M?", answer: "10 min" },
        { prompt: "A zero-order reaction has \\(k = 0.05\\) mol L⁻¹ s⁻¹ and \\([\\text{R}]_0 = 1.0\\) M. How long does it take to finish?", answer: "20 s" },
        { prompt: "A zero-order reaction has \\([\\text{R}]_0 = 0.3\\) M and \\(k = 0.025\\) mol L⁻¹ s⁻¹. What is [R] after 4 s?", answer: "0.2 M" },
        { prompt: "Name one zero-order reaction.", answer: "The decomposition of gaseous ammonia on a hot platinum surface at high pressure" },
      ],
      pyqExampleId: "c981a8e7-499f-4f00-b404-4d58aaaed7a1",
      traps: [
        {
          title: "Zero-order half-life grows with the start",
          body: "For a zero-order reaction \\(t_{1/2} = \\dfrac{[\\text{R}]_0}{2k}\\), so doubling the starting concentration doubles the half-life. Only a first-order half-life is independent of it.",
        },
        {
          title: "Watch the coefficient",
          body: "For \\(2\\text{A} \\rightarrow \\text{B}\\) with rate \\(= k\\), the rate is \\(-\\dfrac{1}{2}\\dfrac{d[\\text{A}]}{dt}\\), so A is used up at 2k, not k.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchck-first-order",
      name: "First-order reactions",
      intuition:
        "In a first-order reaction the rate is proportional to how much reactant is left. With a lot of reactant it goes fast; as the reactant runs down it slows. So the concentration falls quickly at first and then more and more slowly, and a fixed fraction is used up in each equal interval of time.",
      definition:
        "- Rate \\(= k[\\text{R}]\\).\n" +
        "- \\(\\ln[\\text{R}] = \\ln[\\text{R}]_0 - kt\\), or \\([\\text{R}] = [\\text{R}]_0 e^{-kt}\\).\n" +
        "- In base-10 logs: \\(k = \\dfrac{2.303}{t}\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]}\\).\n" +
        "- If a fraction x has reacted, \\([\\text{R}] = (1 - x)[\\text{R}]_0\\).\n" +
        "- Examples: hydrogenation of ethene, all natural and artificial radioactive decay, and the decomposition of \\(\\text{N}_2\\text{O}_5\\) and \\(\\text{N}_2\\text{O}\\).\n" +
        "- **Pseudo first order:** a reaction whose rate law has two reactants but which behaves as first order because one of them (often water as the solvent) is in large excess and hardly changes. Example: the acid hydrolysis of ethyl acetate.",
      formula: {
        label: "First order",
        latex: "k = \\frac{2.303}{t}\\log\\frac{[\\text{R}]_0}{[\\text{R}]}, \\qquad [\\text{R}] = [\\text{R}]_0\\,e^{-kt}",
        symbols: [
          { symbol: "\\([\\text{R}]_0\\)", meaning: "concentration at the start" },
          { symbol: "\\([\\text{R}]\\)", meaning: "concentration after time t" },
        ],
      },
      authoredExample: {
        prompt:
          "A first-order reaction has \\(k = 4.606 \\times 10^{-2}\\ \\text{min}^{-1}\\) and starts at \\([\\text{R}]_0 = 0.50\\) M. What is [R] after 50 minutes?",
        steps: [
          "\\(\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]} = \\dfrac{kt}{2.303} = \\dfrac{4.606 \\times 10^{-2} \\times 50}{2.303} = 1\\).",
          "So \\(\\dfrac{[\\text{R}]_0}{[\\text{R}]} = 10\\), and \\([\\text{R}] = \\dfrac{0.50}{10} = 0.050\\) M.",
        ],
        answer: "0.050 M",
      },
      selfCheckExample: {
        prompt:
          "A first-order reaction has \\(k = 2.303 \\times 10^{-2}\\ \\text{s}^{-1}\\). How long does it take for [R] to fall to one-tenth of its starting value?",
        steps: [
          "\\(t = \\dfrac{2.303}{k}\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]} = \\dfrac{2.303}{2.303 \\times 10^{-2}} \\times \\log 10\\).",
          "\\(t = 100 \\times 1 = 100\\) s.",
        ],
        answer: "100 s",
      },
      practiceSet: [
        { prompt: "A first-order reaction has \\(k = 0.01\\ \\text{s}^{-1}\\). What fraction of the reactant is left after 230.3 s?", answer: "One-tenth", method: "\\(\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]} = \\dfrac{kt}{2.303} = 1\\)" },
        { prompt: "In a first-order reaction, how many times as long does 99% completion take as 90% completion?", answer: "Twice as long", method: "\\(\\log 100 = 2\\) against \\(\\log 10 = 1\\)" },
        { prompt: "Write the concentration [R] of a first-order reactant after time t, in terms of \\([\\text{R}]_0\\) and k.", answer: "\\([\\text{R}] = [\\text{R}]_0\\,e^{-kt}\\)" },
        { prompt: "Name one first-order reaction.", answer: "Hydrogenation of ethene (or any radioactive decay)" },
      ],
      pyqExampleId: "e9d0c612-21ed-4c44-a82f-cbd8457d7f43",
      traps: [
        {
          title: "Use what is left, not what has reacted",
          body: "The ratio in the log is \\(\\dfrac{[\\text{R}]_0}{[\\text{R}]}\\), with [R] the amount LEFT. If 75% has reacted, 25% is left and the ratio is 4, not \\(\\dfrac{4}{3}\\).",
        },
        {
          title: "2.303 goes with log, not ln",
          body: "\\(k = \\dfrac{1}{t}\\ln\\dfrac{[\\text{R}]_0}{[\\text{R}]} = \\dfrac{2.303}{t}\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]}\\). Writing 2.303 with ln, or leaving it out with log, puts the answer out by a factor of 2.303.",
        },
        {
          title: "The time unit carries into k",
          body: "If t is in minutes, k comes out in min⁻¹. Change both to seconds (or both to minutes) before comparing with an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchck-half-life",
      name: "Half-life of a first-order reaction",
      intuition:
        "The half-life is the time for half of the reactant to be used up. In a first-order reaction the same fraction reacts in each equal interval, so every half-life is the same length, whatever amount you start with. After one half-life half is left, after two a quarter, after three an eighth.",
      definition:
        "- Put \\([\\text{R}] = \\dfrac{[\\text{R}]_0}{2}\\) in the first-order equation: \\(t_{1/2} = \\dfrac{2.303}{k}\\log 2 = \\dfrac{0.693}{k}\\).\n" +
        "- \\(t_{1/2}\\) does not depend on \\([\\text{R}]_0\\).\n" +
        "- After n half-lives the fraction left is \\(\\left(\\dfrac{1}{2}\\right)^{n}\\).\n" +
        "- 75% reacted takes 2 half-lives, 87.5% takes 3.\n" +
        "- 99.9% reacted: \\(t = \\dfrac{2.303}{k}\\log 1000 = \\dfrac{6.909}{k}\\), which is about \\(10\\,t_{1/2}\\).",
      formula: {
        label: "First-order half-life",
        latex: "t_{1/2} = \\frac{0.693}{k}, \\qquad \\frac{[\\text{R}]}{[\\text{R}]_0} = \\left(\\frac{1}{2}\\right)^{n}, \\quad n = \\frac{t}{t_{1/2}}",
      },
      authoredExample: {
        prompt:
          "A first-order reaction has a half-life of 15 min. Find k, and the fraction of the reactant left after 1 hour.",
        steps: [
          "\\(k = \\dfrac{0.693}{15} = 0.0462\\ \\text{min}^{-1}\\).",
          "1 hour = 60 min = \\(\\dfrac{60}{15} = 4\\) half-lives.",
          "Fraction left \\(= \\left(\\dfrac{1}{2}\\right)^{4} = \\dfrac{1}{16}\\).",
        ],
        answer: "\\(k = 0.0462\\ \\text{min}^{-1}\\); one-sixteenth is left",
      },
      selfCheckExample: {
        prompt: "In a first-order reaction, 87.5% of the reactant reacts in 45 minutes. What is the half-life?",
        steps: [
          "12.5% is left, which is \\(\\dfrac{1}{8} = \\left(\\dfrac{1}{2}\\right)^{3}\\): three half-lives.",
          "\\(t_{1/2} = \\dfrac{45}{3} = 15\\) min.",
        ],
        answer: "15 min",
      },
      practiceSet: [
        { prompt: "A first-order reaction has \\(k = 6.93 \\times 10^{-3}\\ \\text{s}^{-1}\\). What is its half-life?", answer: "100 s" },
        { prompt: "A first-order reaction has a half-life of 10 min when \\([\\text{R}]_0 = 1\\) M. What is its half-life when \\([\\text{R}]_0 = 2\\) M?", answer: "10 min" },
        { prompt: "What fraction of a first-order reactant is left after 5 half-lives?", answer: "\\(\\dfrac{1}{32}\\)" },
        { prompt: "Which order has a half-life that does not depend on the starting concentration: zero or first?", answer: "First order" },
      ],
      pyqExampleId: "cc5b02a0-6c81-4c91-af73-374c76b55a8b",
      traps: [
        {
          title: "First-order half-life ignores the start",
          body: "\\(t_{1/2} = \\dfrac{0.693}{k}\\) has no concentration in it. Doubling or halving \\([\\text{R}]_0\\) leaves a first-order half-life unchanged.",
        },
        {
          title: "Two half-lives leave a quarter",
          body: "After one half-life half is left; after two, half of that half, so 25% remains. The reactant is not used up after two half-lives.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchck-plots",
      name: "Plots that show the order",
      intuition:
        "Each integrated rate law turns into a straight line when you choose the right axes. So a graph tells you the order: find which pair of quantities gives a straight line, or which one stays flat. Always read the axes before the shape.",
      definition:
        "- Zero order: \\([\\text{R}] = [\\text{R}]_0 - kt\\), so [R] against t is a straight line with slope \\(-k\\).\n" +
        "- First order: \\(\\ln[\\text{R}] = \\ln[\\text{R}]_0 - kt\\), so ln[R] against t is a straight line with slope \\(-k\\); and \\(\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]} = \\dfrac{kt}{2.303}\\) is a straight line through the origin with slope \\(\\dfrac{k}{2.303}\\).\n" +
        "- A quantity that does not change with concentration gives a flat line: the rate of a zero-order reaction, and the half-life of a first-order reaction.",
      table: {
        columns: ["Plot", "Zero order", "First order"],
        rows: [
          { cells: ["[R] against t", "Straight line falling, slope \\(-k\\), intercept \\([\\text{R}]_0\\)", "A curve falling more and more slowly"], noteAmber: "NEET 2026: a straight falling line of [R] against t means zero order.", pyqExampleId: "8481383b-da26-4c3f-8039-5220fd1f90bf" },
          { cells: ["ln[R] against t", "A curve", "Straight line falling, slope \\(-k\\)"] },
          { cells: ["log([R]₀/[R]) against t", "A curve", "Straight line through the origin, slope \\(\\dfrac{k}{2.303}\\)"] },
          { cells: ["Rate against [R]", "Flat line, \\(\\text{rate} = k\\)", "Straight line through the origin, slope \\(k\\)"], noteAmber: "NEET 2022: the flat line, read as rate against concentration, is zero order." },
          { cells: ["Half-life against [R]₀", "Straight line through the origin, slope \\(\\dfrac{1}{2k}\\)", "Flat line, \\(t_{1/2} = \\dfrac{0.693}{k}\\)"], noteAmber: "NEET 2022: the flat line, read as half-life against concentration, is first order." },
        ],
      },
      pyqExampleId: "ae1ef709-0745-4c17-b7db-2e38b4b24f7a",
      selfCheckExample: {
        prompt: "A plot of ln[R] against time is a straight line with slope \\(-0.02\\ \\text{min}^{-1}\\). What is the order, and what is k?",
        steps: [
          "A straight line of ln[R] against t means \\(\\ln[\\text{R}] = \\ln[\\text{R}]_0 - kt\\): first order.",
          "The slope is \\(-k\\), so \\(k = 0.02\\ \\text{min}^{-1}\\).",
        ],
        answer: "First order, \\(k = 0.02\\ \\text{min}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "For a first-order reaction, what is the slope of the plot of \\(\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]}\\) against t?", answer: "\\(\\dfrac{k}{2.303}\\)" },
        { prompt: "A plot of half-life against starting concentration is a straight line through the origin. What is the order?", answer: "Zero order" },
        { prompt: "For a first-order reaction, what shape is the plot of rate against [R]?", answer: "A straight line through the origin with slope k" },
        { prompt: "For a zero-order reaction, what is the intercept of the plot of [R] against t?", answer: "\\([\\text{R}]_0\\), the starting concentration" },
      ],
      traps: [
        {
          title: "A straight [R] line is zero order",
          body: "A first-order reaction gives a curve when [R] is plotted against t. Its straight line comes from ln[R] against t. A falling straight line of [R] itself means zero order.",
        },
        {
          title: "Two different flat lines",
          body: "A flat line of rate against [R] means zero order. A flat line of half-life against \\([\\text{R}]_0\\) means first order. The same shape means different orders on different axes.",
        },
      ],
    },
  ],
};
