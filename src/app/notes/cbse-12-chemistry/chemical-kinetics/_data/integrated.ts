import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_CK_INTEGRATED_NOTE: SubtopicNote = {
  subtopicName: "Integrated Rate Equations",
  title: "Integrated Rate Laws: Zero Order, First Order and Half-Life",
  oneLineDefinition:
    "The integrated rate laws of zero and first order reactions, how to use them for time, rate constant and amount left, first order reactions followed by gas pressure, half-life, the straight-line plots that reveal the order, and pseudo first order reactions.",
  whyItMatters:
    "77 questions, sixty of them from board papers. A first order numerical comes every year from 2022 to 2026: the time for a mass or concentration to fall, k from the percentage decomposed, and radioactive decay and dating (2022, 2026). The rate constant from the total pressure of a gas decomposing at constant volume came in 2023, 2025 and 2026, and 'show that' t₉₉% = 2t₉₀% (2023, 2024) or t₉₉.₉% = 10t₁/₂ (2024). Zero order is asked every year too: its half-life, its slope and intercept, the unit of k, and a numerical in 2025. Half-life and the straight-line plots fill the MCQs: the slope of log([R]₀/[R]) or ln[R] against time (2022 twice with a graph, 2023, 2024, 2025) and the order from half-life data (2025 twice, 2026). In 2025 the board also asked pseudo first order reactions four times. The textbook adds its N₂O₅, carbon-14 and strontium-90 problems.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbcck-zero-order",
      name: "Zero order reactions",
      intuition:
        "In a zero order reaction the rate is set by something other than how much reactant is left, such as a metal surface that is already fully covered. So the reactant is used up at a steady pace, like water draining through a tap that never opens wider, and its concentration falls in a straight line until it runs out.",
      definition:
        "- **Rate law:** rate \\(= -\\dfrac{d[\\text{R}]}{dt} = k[\\text{R}]^0 = k\\). The rate is independent of the concentration.\n" +
        "- **Derivation outline:**\n" +
        "- \\(d[\\text{R}] = -k\\,dt\\); integrating, \\([\\text{R}] = -kt + I\\).\n" +
        "- At \\(t = 0\\), \\([\\text{R}] = [\\text{R}]_0\\), so \\(I = [\\text{R}]_0\\).\n" +
        "- Hence \\([\\text{R}] = [\\text{R}]_0 - kt\\) and \\(k = \\dfrac{[\\text{R}]_0 - [\\text{R}]}{t}\\).\n" +
        "- **Half-life:** put \\([\\text{R}] = [\\text{R}]_0/2\\): \\(t_{1/2} = \\dfrac{[\\text{R}]_0}{2k}\\). It is directly proportional to the initial concentration.\n" +
        "- **Graph:** [R] against t is a straight line with slope \\(-k\\) and intercept \\([\\text{R}]_0\\).\n" +
        "- **Unit of k:** mol L⁻¹ s⁻¹, the same as the rate.\n" +
        "- **Examples:** some enzyme catalysed reactions and reactions on metal surfaces. The decomposition of gaseous ammonia on a hot platinum surface (1130 K) at high pressure, \\(2\\text{NH}_3 \\xrightarrow{\\text{Pt}} \\text{N}_2 + 3\\text{H}_2\\), is zero order because the metal surface is saturated with gas molecules. The thermal decomposition of HI on a gold surface is another.",
      formula: {
        label: "Zero order integrated rate law",
        latex: "[\\text{R}] = [\\text{R}]_0 - kt, \\qquad k = \\frac{[\\text{R}]_0 - [\\text{R}]}{t}, \\qquad t_{1/2} = \\frac{[\\text{R}]_0}{2k}",
        symbols: [
          { symbol: "\\([\\text{R}]_0\\)", meaning: "initial concentration of the reactant" },
          { symbol: "\\([\\text{R}]\\)", meaning: "concentration left after time t" },
          { symbol: "\\(k\\)", meaning: "rate constant, in mol L⁻¹ s⁻¹" },
        ],
      },
      authoredExample: {
        prompt:
          "In a zero order reaction the concentration of the reactant falls from 0.50 mol L⁻¹ to 0.30 mol L⁻¹ in 50 s. Find (a) the rate constant, (b) the half-life, (c) the time at which the reactant is used up.",
        steps: [
          "Given: \\([\\text{R}]_0 = 0.50\\) mol L⁻¹, \\([\\text{R}] = 0.30\\) mol L⁻¹, \\(t = 50\\) s.",
          "(a) Formula: \\(k = \\dfrac{[\\text{R}]_0 - [\\text{R}]}{t}\\). Substitution: \\(k = \\dfrac{(0.50 - 0.30)\\ \\text{mol L}^{-1}}{50\\ \\text{s}} = 4.0 \\times 10^{-3}\\) mol L⁻¹ s⁻¹.",
          "(b) \\(t_{1/2} = \\dfrac{[\\text{R}]_0}{2k} = \\dfrac{0.50}{2 \\times 4.0 \\times 10^{-3}} = 62.5\\) s.",
          "(c) Used up when \\([\\text{R}] = 0\\): \\(t = \\dfrac{[\\text{R}]_0}{k} = \\dfrac{0.50}{4.0 \\times 10^{-3}} = 125\\) s, exactly twice the half-life.",
        ],
        answer: "(a) 4.0 × 10⁻³ mol L⁻¹ s⁻¹; (b) 62.5 s; (c) 125 s",
      },
      selfCheckExample: {
        prompt:
          "A plot of [R] against time is a straight line that starts at 0.80 mol L⁻¹ and has a slope of \\(-5.0 \\times 10^{-3}\\) mol L⁻¹ s⁻¹. Give the order, the rate constant and the half-life.",
        steps: ["A straight line for [R] against t means zero order, and \\(k = -\\text{slope} = 5.0 \\times 10^{-3}\\) mol L⁻¹ s⁻¹.", "\\(t_{1/2} = \\dfrac{0.80}{2 \\times 5.0 \\times 10^{-3}} = 80\\) s."],
        answer: "Zero order; k = 5.0 × 10⁻³ mol L⁻¹ s⁻¹; half-life 80 s",
      },
      practiceSet: [
        { prompt: "The initial concentration of a zero order reaction is doubled. What happens to its half-life?", answer: "It doubles, since \\(t_{1/2} = [\\text{R}]_0/2k\\)" },
        { prompt: "What are the slope and intercept of the plot of [R] against t for a zero order reaction?", answer: "Slope \\(-k\\); intercept \\([\\text{R}]_0\\)" },
        { prompt: "Why is the decomposition of ammonia on hot platinum at high pressure zero order?", answer: "The platinum surface is saturated with gas molecules, so a change in the amount of ammonia does not change the amount on the surface, and the rate stays the same" },
        { prompt: "Write the unit of k for a zero order reaction.", answer: "mol L⁻¹ s⁻¹" },
      ],
      pyqExampleId: "4e4e1620-71a2-46da-89ed-9417ea5d0625",
      traps: [
        {
          title: "Using the logarithm formula for a zero order reaction",
          body: "No logarithm appears in a zero order calculation. Use \\(k = ([\\text{R}]_0 - [\\text{R}])/t\\). Reaching for \\(2.303/t \\log\\) here gives a wrong answer with a wrong unit.",
        },
        {
          title: "Describe the graph with its axes",
          body: "This page cannot draw it, but in the exam you must: concentration of R on the y-axis, time on the x-axis, a straight line falling from \\([\\text{R}]_0\\) with slope \\(-k\\). A graph question gives marks for the labelled axes as well as the order.",
        },
        {
          title: "Saying a zero order reaction does not depend on temperature",
          body: "Its rate is independent of the reactant's concentration only. Its k still rises with temperature, like every rate constant.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-first-order",
      name: "First order reactions",
      intuition:
        "In a first order reaction the rate is proportional to how much reactant is left. So the reaction is fast at first and slows down as the reactant thins out, and the same fraction is used up in each equal interval of time. That is why only the ratio of the starting and remaining amounts enters the formula, and masses can stand in for concentrations.",
      definition:
        "- **Derivation outline:**\n" +
        "- Rate \\(= -\\dfrac{d[\\text{R}]}{dt} = k[\\text{R}]\\), so \\(\\dfrac{d[\\text{R}]}{[\\text{R}]} = -k\\,dt\\).\n" +
        "- Integrating, \\(\\ln[\\text{R}] = -kt + I\\). At \\(t = 0\\), \\([\\text{R}] = [\\text{R}]_0\\), so \\(I = \\ln[\\text{R}]_0\\).\n" +
        "- Hence \\(\\ln\\dfrac{[\\text{R}]_0}{[\\text{R}]} = kt\\), that is \\(k = \\dfrac{2.303}{t}\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]}\\), or \\([\\text{R}] = [\\text{R}]_0e^{-kt}\\).\n" +
        "- **Percentage questions:** if x% has reacted, \\(100 - x\\) is left, so the ratio is \\(\\dfrac{100}{100 - x}\\).\n" +
        "- **Gas phase, constant volume,** \\(\\text{A(g)} \\rightarrow \\text{B(g)} + \\text{C(g)}\\): with initial pressure \\(p_i\\) and total pressure \\(p_t\\), \\(p_t = p_i + x\\), so \\(p_\\text{A} = 2p_i - p_t\\) and \\(k = \\dfrac{2.303}{t}\\log\\dfrac{p_i}{2p_i - p_t}\\). For another equation, write the pressures at time t from its coefficients first.\n" +
        "- **Show that:** \\(t_{99\\%} = \\dfrac{2.303}{k}\\log 100\\) and \\(t_{90\\%} = \\dfrac{2.303}{k}\\log 10\\), so \\(t_{99\\%} = 2t_{90\\%}\\). Similarly \\(t_{99.9\\%} = \\dfrac{2.303}{k}\\log 1000 = \\dfrac{6.909}{k} = 10\\,t_{1/2}\\).\n" +
        "- **Examples:** hydrogenation of ethene, decomposition of N₂O₅ and N₂O, and all natural and artificial radioactive decay.",
      formula: {
        label: "First order integrated rate law",
        latex: "k = \\frac{2.303}{t}\\log\\frac{[\\text{R}]_0}{[\\text{R}]}, \\qquad [\\text{R}] = [\\text{R}]_0\\,e^{-kt}",
        symbols: [
          { symbol: "\\([\\text{R}]_0\\)", meaning: "initial concentration (or amount, or pressure) of the reactant" },
          { symbol: "\\([\\text{R}]\\)", meaning: "amount left after time t" },
          { symbol: "\\(k\\)", meaning: "rate constant, unit time⁻¹ (s⁻¹, min⁻¹ or year⁻¹)" },
        ],
      },
      authoredExample: {
        prompt:
          "A first order reaction has \\(k = 4.6 \\times 10^{-3}\\) s⁻¹. If 8.0 g of the reactant is taken, how much is left after 300 s? (antilog 0.5992 = 3.974)",
        steps: [
          "Given: \\(k = 4.6 \\times 10^{-3}\\) s⁻¹, \\(t = 300\\) s, \\([\\text{R}]_0 = 8.0\\) g. Masses can be used because only their ratio enters.",
          "Formula: \\(\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]} = \\dfrac{kt}{2.303}\\).",
          "Substitution: \\(\\log\\dfrac{8.0}{[\\text{R}]} = \\dfrac{4.6 \\times 10^{-3} \\times 300}{2.303} = \\dfrac{1.38}{2.303} = 0.5992\\).",
          "\\(\\dfrac{8.0}{[\\text{R}]} = \\text{antilog } 0.5992 = 3.974\\), so \\([\\text{R}] = \\dfrac{8.0}{3.974} = 2.01\\) g.",
        ],
        answer: "2.01 g of the reactant is left",
      },
      selfCheckExample: {
        prompt:
          "The first order decomposition \\(\\text{A(g)} \\rightarrow \\text{B(g)} + \\text{C(g)}\\) is carried out at constant volume. The total pressure is 0.30 atm at the start and 0.45 atm after 120 s. Find k.",
        steps: [
          "\\(p_\\text{A} = 2p_i - p_t = 0.60 - 0.45 = 0.15\\) atm, exactly half of 0.30 atm.",
          "\\(k = \\dfrac{2.303}{120}\\log\\dfrac{0.30}{0.15} = \\dfrac{2.303 \\times 0.3010}{120} = 5.78 \\times 10^{-3}\\ \\text{s}^{-1}\\).",
        ],
        answer: "5.78 × 10⁻³ s⁻¹",
      },
      practiceSet: [
        { prompt: "A first order reaction has \\(k = 0.0462\\) min⁻¹. How long does the reactant take to fall to one eighth of its initial amount?", answer: "45 min (three half-lives of 15 min each)" },
        { prompt: "Why can masses in grams be used in place of concentrations in the first order formula?", answer: "Only the ratio \\([\\text{R}]_0/[\\text{R}]\\) enters, and the volume and molar mass cancel in the ratio" },
        { prompt: "In \\(\\text{A(g)} \\rightarrow \\text{B(g)} + \\text{C(g)}\\), \\(p_i = 0.50\\) atm and \\(p_t = 0.80\\) atm. What is the pressure of A?", answer: "\\(2 \\times 0.50 - 0.80 = 0.20\\) atm" },
        { prompt: "For a first order reaction, how many half-lives does 99.9% completion take?", answer: "About 10" },
      ],
      pyqExampleId: "ebc4a2f1-06b7-47ca-97fe-3cde41313ba7",
      traps: [
        {
          title: "Putting the amount reacted where the amount left belongs",
          body: "The denominator is the amount left. If a reaction is 30% complete, the ratio is 100/70, not 100/30. This single slip loses most of the marks of a three-mark numerical.",
        },
        {
          title: "Using the total pressure as the reactant pressure",
          body: "In a gas decomposition the total pressure rises while the reactant pressure falls. Work out the reactant's own pressure from the equation before you use the formula.",
        },
        {
          title: "A unit that does not match the time",
          body: "k carries the reciprocal of the time unit you used: min⁻¹ if t was in minutes, s⁻¹ if in seconds. A first order k never carries a concentration or pressure unit.",
        },
        {
          title: "Skipping steps in a 'show that'",
          body: "Write the formula, the ratio for each percentage, both times, and then divide. Writing only 'log 100 = 2 log 10' earns one mark of three.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-half-life",
      name: "Half-life and the straight-line plots",
      intuition:
        "Half-life is the time for half of what is there to go. For a first order reaction this time is the same whether you start with a lot or a little, which is why a radioactive element can be given one half-life. For a zero order reaction twice as much takes twice as long. So watching how the half-life changes with the starting amount tells you the order, and so does finding which plot comes out straight.",
      definition:
        "- **Half-life \\(t_{1/2}\\):** the time in which the concentration of a reactant is reduced to one half of its initial concentration.\n" +
        "- **First order:** \\(t_{1/2} = \\dfrac{0.693}{k}\\), independent of the initial concentration.\n" +
        "- **Zero order:** \\(t_{1/2} = \\dfrac{[\\text{R}]_0}{2k}\\), directly proportional to the initial concentration.\n" +
        "- **Plots for zero order:** [R] against t is a straight line, slope \\(-k\\), intercept \\([\\text{R}]_0\\).\n" +
        "- **Plots for first order:** ln[R] against t is a straight line, slope \\(-k\\), intercept \\(\\ln[\\text{R}]_0\\). \\(\\log\\dfrac{[\\text{R}]_0}{[\\text{R}]}\\) against t is a straight line through the origin with slope \\(+\\dfrac{k}{2.303}\\). log[R] against t has slope \\(-\\dfrac{k}{2.303}\\).\n" +
        "- [R] against t for a first order reaction is a curve that falls steeply and then flattens.\n" +
        "- A plot of \\(t_{1/2}\\) against \\([\\text{R}]_0\\) is a horizontal line for first order and a straight line through the origin for zero order.\n" +
        "- n half-lives leave \\(\\left(\\tfrac{1}{2}\\right)^n\\) of the reactant in a first order reaction.",
      formula: {
        label: "Half-life of zero and first order reactions",
        latex: "t_{1/2} = \\frac{0.693}{k}\\ (\\text{first order}), \\qquad t_{1/2} = \\frac{[\\text{R}]_0}{2k}\\ (\\text{zero order})",
      },
      authoredExample: {
        prompt:
          "The half-life of a first order reaction is 20 min. (a) Calculate its rate constant. (b) What fraction of the reactant is left after 1 hour?",
        steps: [
          "Given: \\(t_{1/2} = 20\\) min.",
          "(a) Formula: \\(k = \\dfrac{0.693}{t_{1/2}}\\). Substitution: \\(k = \\dfrac{0.693}{20\\ \\text{min}} = 3.465 \\times 10^{-2}\\) min⁻¹.",
          "(b) 1 hour = 60 min = 3 half-lives, since the half-life does not depend on how much is left.",
          "Fraction left \\(= \\left(\\dfrac{1}{2}\\right)^3 = \\dfrac{1}{8}\\).",
        ],
        answer: "(a) k = 3.465 × 10⁻² min⁻¹; (b) one eighth is left",
      },
      selfCheckExample: {
        prompt: "A zero order reaction starts at 0.40 mol L⁻¹ and has \\(k = 2.0 \\times 10^{-3}\\) mol L⁻¹ s⁻¹. Find its half-life.",
        steps: ["\\(t_{1/2} = \\dfrac{[\\text{R}]_0}{2k} = \\dfrac{0.40}{2 \\times 2.0 \\times 10^{-3}}\\).", "\\(t_{1/2} = 100\\) s."],
        answer: "100 s",
      },
      practiceSet: [
        { prompt: "What is the slope of the plot of \\(\\log([\\text{R}]_0/[\\text{R}])\\) against time for a first order reaction, and where does the line start?", answer: "Slope \\(k/2.303\\); the line passes through the origin" },
        { prompt: "What is the slope of the plot of ln[R] against time for a first order reaction?", answer: "\\(-k\\)" },
        { prompt: "In a first order reaction, a quarter of the reactant is left after 30 min. What is the half-life?", answer: "15 min (a quarter is left after two half-lives)" },
        { prompt: "What does a plot of half-life against initial concentration look like for a first order reaction?", answer: "A horizontal straight line" },
      ],
      pyqExampleId: "bf34dead-b2f4-46b6-8288-444c31f2ddae",
      traps: [
        {
          title: "The graph carries marks: say the axes and the shape",
          body: "No graph can be drawn on this page, so learn each one in words. For log([R]₀/[R]) against t: time on the x-axis, a straight line rising from the origin, slope \\(k/2.303\\). Name the order, the slope and the intercept; each earns a mark.",
        },
        {
          title: "Mixing up the signs of the slopes",
          body: "\\(\\log([\\text{R}]_0/[\\text{R}])\\) grows with time, so its slope is \\(+k/2.303\\). log[R] falls, so its slope is \\(-k/2.303\\). With ln in place of log the 2.303 disappears.",
        },
        {
          title: "Multiplying instead of dividing",
          body: "\\(t_{1/2} = 0.693/k\\). A large k means a fast reaction and a short half-life; if your half-life grew when k grew, you multiplied.",
        },
        {
          title: "Saying a first order half-life doubles with concentration",
          body: "That is zero order. The board has set 'in first order kinetics, doubling the concentration doubles the half-life' as a false statement in assertion-reason items.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbcck-pseudo-first-order",
      name: "Pseudo first order reactions",
      intuition:
        "If one reactant is the solvent, there is so much of it that the reaction hardly dents its amount. Its concentration then acts as a constant, and the reaction behaves as if only the other reactant mattered. The reaction is really of higher order, but it looks first order.",
      definition:
        "- **Pseudo first order reaction:** a reaction of higher order (often second order) that obeys a first order rate law because one reactant is taken in large excess.\n" +
        "- **Hydrolysis of ethyl acetate:** \\(\\text{CH}_3\\text{COOC}_2\\text{H}_5 + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{CH}_3\\text{COOH} + \\text{C}_2\\text{H}_5\\text{OH}\\). Really second order, but water is in large excess, so its concentration is not altered much and the rate depends on ethyl acetate only.\n" +
        "- So rate \\(= k[\\text{ester}][\\text{H}_2\\text{O}] = k'[\\text{ester}]\\), with \\(k' = k[\\text{H}_2\\text{O}]\\). The observed constant k' depends on the concentration of the reactant in excess.\n" +
        "- **Inversion of cane sugar:** \\(\\text{C}_{12}\\text{H}_{22}\\text{O}_{11} + \\text{H}_2\\text{O} \\xrightarrow{\\text{H}^+} \\text{C}_6\\text{H}_{12}\\text{O}_6\\ (\\text{glucose}) + \\text{C}_6\\text{H}_{12}\\text{O}_6\\ (\\text{fructose})\\), rate \\(= k[\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}]\\).\n" +
        "- By its equation the reaction is bimolecular; only its observed order is 1.\n" +
        "- Order and molecularity have the same value for an elementary reaction.",
      formula: {
        label: "Pseudo first order rate law",
        latex: "\\text{rate} = k[\\text{A}][\\text{B}] = k'[\\text{A}], \\qquad k' = k[\\text{B}] \\ (\\text{B in large excess})",
      },
      authoredExample: {
        prompt:
          "In the book's example, 0.01 mol of ethyl acetate is hydrolysed with 10 mol of water. When the reaction is complete, how much water is left, and by what percentage has it changed? Use this to explain why the reaction is first order.",
        steps: [
          "Each mole of ester uses one mole of water, so 0.01 mol of water is used.",
          "Water left = 10 − 0.01 = 9.99 mol.",
          "Change in water = \\(\\dfrac{0.01}{10} \\times 100 = 0.1\\%\\).",
          "So the concentration of water stays practically constant and can be taken into k. The rate then depends on the concentration of ethyl acetate alone: rate = k'[ester].",
        ],
        answer: "9.99 mol of water is left, a change of only 0.1%, so the reaction behaves as first order",
      },
      selfCheckExample: {
        prompt:
          "For rate \\(= k[\\text{A}][\\text{B}]\\) with \\(k = 3.0 \\times 10^{-4}\\) L mol⁻¹ s⁻¹, B is kept in large excess at 2.0 mol L⁻¹. Find the observed rate constant and the observed order.",
        steps: ["\\(k' = k[\\text{B}] = 3.0 \\times 10^{-4} \\times 2.0 = 6.0 \\times 10^{-4}\\ \\text{s}^{-1}\\).", "Rate = k'[A], so the observed order is 1."],
        answer: "k' = 6.0 × 10⁻⁴ s⁻¹; first order",
      },
      practiceSet: [
        { prompt: "Which reactant is in large excess in the inversion of cane sugar?", answer: "Water" },
        { prompt: "Write the rate law for the inversion of cane sugar.", answer: "Rate \\(= k[\\text{C}_{12}\\text{H}_{22}\\text{O}_{11}]\\)" },
        { prompt: "What is the true order of the acid hydrolysis of ethyl acetate?", answer: "2 (it behaves as first order)" },
      ],
      pyqExampleId: "fb92b3ec-d595-4c56-814c-4fe22a89ff88",
      traps: [
        {
          title: "Giving the condition without an example",
          body: "'One reactant in large excess' earns one mark; the example with its equation earns the other. Write the ester hydrolysis or the inversion of cane sugar with H⁺ over the arrow.",
        },
        {
          title: "Saying the pseudo rate constant is a true constant",
          body: "k' = k[H₂O] carries the concentration of the reactant in excess. Change that excess and k' changes, though k does not.",
        },
      ],
    },
  ],
};
