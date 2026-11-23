import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_CK_INTEGRATED_NOTE: SubtopicNote = {
  subtopicName: "Integrated Rate Law",
  title: "Integrated Rate Laws, Half Life and Pseudo First Order Reactions",
  oneLineDefinition:
    "The integrated rate laws of first order and zero order reactions with their derivations and graphs, the half life of each, the first order law in terms of gas pressure, pseudo first order reactions, and the unit of the rate constant for each order.",
  whyItMatters:
    "43 questions, the most of any page in this chapter. Twenty-one were set in board papers: derive the relation between half life and rate constant for a first order reaction (2014, 2022, 2024 and 2025); calculate a rate constant or half life from the percentage decomposed (2016, 2024 and 2026) or from the half life (2019); define a zero order reaction, derive its integrated rate law or give its half life (2018, 2020, 2023, 2024 and twice in 2025); explain pseudo first order reactions (2020 and 2023); show that 99.9% completion takes three times as long as 90% (2023); the first order law in terms of pressure (2023); and the order from the unit of the rate constant (2024, 2025 and 2026, with the zero order unit again in 2026). The textbook adds concentrations left after a given time, graphs of first and zero order reactions and the decomposition of SO₂Cl₂ followed by pressure.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccck-first-order",
      name: "First order reactions: integrated rate law and graphs",
      intuition:
        "In a first order reaction the rate is proportional to how much reactant is left, so the reaction slows down as it goes. The same fraction of what is left reacts in each equal time interval. That is why the law involves a logarithm of the ratio of concentrations, and why only the ratio, never the actual amounts, matters.",
      definition:
        "- **Derivation** (for \\(\\text{A} \\to\\) product):\n" +
        "- Differential rate law: rate \\(= -\\dfrac{d[\\text{A}]}{dt} = k[\\text{A}]\\) (6.4)\n" +
        "- Rearranging: \\(\\dfrac{d[\\text{A}]}{[\\text{A}]} = -k\\,dt\\) (6.5)\n" +
        "- Integrate between \\([\\text{A}] = [\\text{A}]_0\\) at \\(t = 0\\) and \\([\\text{A}] = [\\text{A}]_t\\) at \\(t = t\\): \\(\\displaystyle\\int_{[\\text{A}]_0}^{[\\text{A}]_t} \\frac{d[\\text{A}]}{[\\text{A}]} = -k\\int_0^t dt\\)\n" +
        "- \\(\\ln[\\text{A}]_t - \\ln[\\text{A}]_0 = -kt\\), or \\(\\ln\\dfrac{[\\text{A}]_t}{[\\text{A}]_0} = -kt\\) (6.6)\n" +
        "- \\(k = \\dfrac{1}{t}\\ln\\dfrac{[\\text{A}]_0}{[\\text{A}]_t} = \\dfrac{2.303}{t}\\log_{10}\\dfrac{[\\text{A}]_0}{[\\text{A}]_t}\\) (6.7)\n" +
        "- **Other forms:** \\([\\text{A}]_t = [\\text{A}]_0 e^{-kt}\\) (6.8), and with \\(a\\) the initial concentration and \\(x\\) the amount reacted, \\(k = \\dfrac{2.303}{t}\\log_{10}\\dfrac{a}{a - x}\\) (6.9).\n" +
        "- **Graphs:** rate against \\([\\text{A}]_t\\) is a straight line through the origin, slope \\(k\\); \\(\\log_{10}[\\text{A}]_t\\) against \\(t\\) is a straight line of slope \\(-k/2.303\\) and intercept \\(\\log_{10}[\\text{A}]_0\\); \\(\\log_{10}([\\text{A}]_0/[\\text{A}]_t)\\) against \\(t\\) is a straight line through the origin, slope \\(k/2.303\\).\n" +
        "- **Gas phase** \\(\\text{A}(\\text{g}) \\to \\text{B}(\\text{g}) + \\text{C}(\\text{g})\\): if the initial pressure \\(P_i\\) falls by \\(x\\), then \\(P_\\text{A} = P_i - x\\) and total \\(P = P_i + x\\), so \\(x = P - P_i\\) and \\(P_\\text{A} = 2P_i - P\\). Hence \\(k = \\dfrac{2.303}{t}\\log_{10}\\dfrac{P_i}{2P_i - P}\\) (6.13), \\(P\\) being the total pressure at time \\(t\\).\n" +
        "- **Examples:** \\(2\\text{H}_2\\text{O}_2 \\to 2\\text{H}_2\\text{O} + \\text{O}_2\\) and \\(2\\text{N}_2\\text{O}_5 \\to 4\\text{NO}_2 + \\text{O}_2\\); radioactive decay also follows first order kinetics.\n" +
        "- **Pseudo first order reaction:** a reaction expected to be of higher order that follows first order kinetics. Hydrolysis of methyl acetate, \\(\\text{CH}_3\\text{COOCH}_3 + \\text{H}_2\\text{O} \\to \\text{CH}_3\\text{COOH} + \\text{CH}_3\\text{OH}\\), has rate \\(= k'[\\text{CH}_3\\text{COOCH}_3][\\text{H}_2\\text{O}]\\). Water, the solvent, is in such large excess that its concentration stays constant, \\([\\text{H}_2\\text{O}] = k''\\), so rate \\(= k[\\text{CH}_3\\text{COOCH}_3]\\) with \\(k = k'k''\\): first order.",
      formula: {
        label: "First order integrated rate law",
        latex: "k = \\frac{2.303}{t}\\log_{10}\\frac{[\\text{A}]_0}{[\\text{A}]_t}",
        symbols: [
          { symbol: "\\([\\text{A}]_0\\)", meaning: "initial concentration (or amount) of the reactant" },
          { symbol: "\\([\\text{A}]_t\\)", meaning: "concentration (or amount) still unreacted at time t" },
        ],
      },
      authoredExample: {
        prompt: "In a first order reaction, 25% of the reactant decomposes in 20 minutes. Calculate the rate constant.",
        steps: [
          "Given: 25% decomposes, so 75% remains. Take \\([\\text{A}]_0 = 100\\), \\([\\text{A}]_t = 75\\); \\(t = 20\\) min.",
          "Formula: \\(k = \\dfrac{2.303}{t}\\log_{10}\\dfrac{[\\text{A}]_0}{[\\text{A}]_t}\\).",
          "Substitution: \\(k = \\dfrac{2.303}{20\\ \\text{min}}\\log_{10}\\dfrac{100}{75} = \\dfrac{2.303}{20} \\times \\log_{10}1.333 = \\dfrac{2.303 \\times 0.1249}{20}\\).",
          "\\(k = 0.0144\\) min⁻¹ \\(= 1.44 \\times 10^{-2}\\) min⁻¹.",
        ],
        answer: "k = 1.44 × 10⁻² min⁻¹",
      },
      selfCheckExample: {
        prompt: "A first order reaction has \\(k = 0.050\\) min⁻¹. What percentage of the reactant remains after 30 minutes?",
        steps: [
          "\\(\\log_{10}\\dfrac{[\\text{A}]_0}{[\\text{A}]_t} = \\dfrac{kt}{2.303} = \\dfrac{0.050 \\times 30}{2.303} = 0.6513\\).",
          "\\(\\dfrac{[\\text{A}]_0}{[\\text{A}]_t} = \\text{antilog } 0.6513 = 4.48\\), so \\([\\text{A}]_t = \\dfrac{100}{4.48} = 22.3\\).",
        ],
        answer: "About 22.3% remains",
      },
      practiceSet: [
        { prompt: "What is the slope of the straight line obtained by plotting log₁₀[A]ₜ against t for a first order reaction?", answer: "\\(-k/2.303\\)" },
        { prompt: "For \\(\\text{A}(\\text{g}) \\to \\text{B}(\\text{g}) + \\text{C}(\\text{g})\\), the initial pressure is 0.40 atm and the total pressure after some time is 0.50 atm. What is the pressure of A then?", answer: "\\(P_\\text{A} = 2P_i - P = 0.80 - 0.50 = 0.30\\) atm" },
        { prompt: "Show that for a first order reaction the time for 99% completion is twice the time for 90% completion.", answer: "\\(t_{99} = \\dfrac{2.303}{k}\\log_{10}100 = \\dfrac{2 \\times 2.303}{k}\\) and \\(t_{90} = \\dfrac{2.303}{k}\\log_{10}10 = \\dfrac{2.303}{k}\\), so \\(t_{99} = 2t_{90}\\)" },
        { prompt: "Why does the hydrolysis of methyl acetate in water follow first order kinetics?", answer: "Water is in such large excess that its concentration stays constant, so the rate depends on [CH₃COOCH₃] alone" },
      ],
      pyqExampleId: "2a3e7468-a0db-41ab-8cf4-e43668638594",
      traps: [
        {
          title: "Putting the amount reacted in place of the amount left",
          body: "\\([\\text{A}]_t\\) is what remains. If 30% has reacted, \\([\\text{A}]_t = 70\\), not 30. Using 30 gives a rate constant several times too large.",
        },
        {
          title: "Dropping 2.303 with log₁₀",
          body: "The factor 2.303 converts ln to log₁₀. Write \\(k = \\dfrac{1}{t}\\ln\\) or \\(k = \\dfrac{2.303}{t}\\log_{10}\\), never \\(\\dfrac{1}{t}\\log_{10}\\).",
        },
        {
          title: "Taking the total pressure as the pressure of A",
          body: "In the gas phase law, \\(P\\) is the total pressure of the mixture. The pressure of A at time \\(t\\) is \\(2P_i - P\\), which goes in the denominator.",
        },
        {
          title: "Pseudo first order without the reason",
          body: "A definition with an example is not enough. Say why: one reactant (water, the solvent) is in such large excess that its concentration stays constant and merges into \\(k\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-half-life",
      name: "Half life of first order and zero order reactions",
      intuition:
        "Half life is the time for half the reactant to go. In a first order reaction the starting amount cancels out, so every halving takes the same time, whether you start with a lot or a little. In a zero order reaction the reactant is used at a fixed speed, so more reactant takes longer to halve.",
      definition:
        "- **Half life** \\(t_{1/2}\\): the time required for the reactant concentration to fall to one half of its initial value.\n" +
        "- **Derivation for a first order reaction:**\n" +
        "- Start from \\(k = \\dfrac{2.303}{t}\\log_{10}\\dfrac{[\\text{A}]_0}{[\\text{A}]_t}\\).\n" +
        "- At \\(t = t_{1/2}\\), \\([\\text{A}]_t = [\\text{A}]_0/2\\).\n" +
        "- \\(k = \\dfrac{2.303}{t_{1/2}}\\log_{10}\\dfrac{[\\text{A}]_0}{[\\text{A}]_0/2} = \\dfrac{2.303}{t_{1/2}}\\log_{10}2 = \\dfrac{2.303 \\times 0.3010}{t_{1/2}}\\)\n" +
        "- \\(k = \\dfrac{0.693}{t_{1/2}}\\), or \\(t_{1/2} = \\dfrac{0.693}{k}\\) (6.10)\n" +
        "- So the half life of a first order reaction is **independent of the initial concentration** (Fig. 6.2).\n" +
        "- **Zero order:** from \\(kt = [\\text{A}]_0 - [\\text{A}]_t\\) with \\([\\text{A}]_t = [\\text{A}]_0/2\\): \\(t_{1/2} = \\dfrac{[\\text{A}]_0}{2k}\\) (6.16). The half life of a zero order reaction is **directly proportional to the initial concentration**.\n" +
        "- After \\(n\\) half lives of a first order reaction, \\(\\left(\\tfrac{1}{2}\\right)^n\\) of the reactant is left.",
      formula: {
        label: "Half life",
        latex: "t_{1/2} = \\frac{0.693}{k}\\ (\\text{first order}), \\qquad t_{1/2} = \\frac{[\\text{A}]_0}{2k}\\ (\\text{zero order})",
      },
      authoredExample: {
        prompt:
          "The half life of a first order reaction is 15 minutes. Calculate its rate constant and the time needed for the concentration of the reactant to fall to one eighth of its initial value.",
        steps: [
          "Given: \\(t_{1/2} = 15\\) min; \\([\\text{A}]_t = [\\text{A}]_0/8\\).",
          "Formula: \\(k = \\dfrac{0.693}{t_{1/2}} = \\dfrac{0.693}{15\\ \\text{min}} = 0.0462\\) min⁻¹.",
          "Time: \\(t = \\dfrac{2.303}{k}\\log_{10}\\dfrac{[\\text{A}]_0}{[\\text{A}]_t} = \\dfrac{2.303}{0.0462\\ \\text{min}^{-1}}\\log_{10}8 = \\dfrac{2.303 \\times 0.9031}{0.0462}\\).",
          "\\(t = 45\\) min. Check: one eighth is \\(\\left(\\tfrac{1}{2}\\right)^3\\), three half lives, \\(3 \\times 15 = 45\\) min.",
        ],
        answer: "k = 0.0462 min⁻¹; time = 45 min",
      },
      selfCheckExample: {
        prompt: "A zero order reaction has an initial concentration of 0.60 mol dm⁻³ and \\(k = 3.0 \\times 10^{-3}\\) mol dm⁻³ s⁻¹. Find its half life.",
        steps: ["\\(t_{1/2} = \\dfrac{[\\text{A}]_0}{2k} = \\dfrac{0.60}{2 \\times 3.0 \\times 10^{-3}}\\).", "\\(t_{1/2} = 100\\) s."],
        answer: "100 s",
      },
      practiceSet: [
        { prompt: "A first order reaction has \\(k = 0.0693\\) h⁻¹. Find its half life.", answer: "\\(0.693/0.0693 = 10\\) h" },
        { prompt: "The initial concentration of a first order reactant is doubled. What happens to the half life?", answer: "It stays the same" },
        { prompt: "The initial concentration of a zero order reactant is doubled. What happens to the half life?", answer: "It doubles" },
        { prompt: "What fraction of a first order reactant is left after four half lives?", answer: "\\(\\left(\\tfrac{1}{2}\\right)^4 = \\tfrac{1}{16}\\)" },
      ],
      pyqExampleId: "6e46998c-2375-4e56-95a3-b45e228ed72a",
      traps: [
        {
          title: "Using 0.693/k for every order",
          body: "\\(t_{1/2} = 0.693/k\\) holds only for a first order reaction. For a zero order reaction it is \\([\\text{A}]_0/2k\\).",
        },
        {
          title: "Stopping the derivation without the conclusion",
          body: "The last line of the derivation should say that \\([\\text{A}]_0\\) has cancelled, so the half life of a first order reaction does not depend on the initial concentration. That sentence carries a mark.",
        },
        {
          title: "Mixing minutes and seconds",
          body: "The unit of \\(k\\) follows the unit of the half life. A half life in minutes gives \\(k\\) in min⁻¹; convert before combining it with a time in seconds.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccck-zero-order",
      name: "Zero order reactions",
      intuition:
        "In a zero order reaction the rate does not care how much reactant there is. Ammonia decomposing on hot platinum is the picture: only the molecules sitting on the metal surface react, the surface is fully covered, and the rest of the gas just waits. So the reactant is used up at a steady speed, like sand through an hourglass.",
      definition:
        "- **Zero order reaction:** a reaction whose rate is independent of the reactant concentration.\n" +
        "- **Derivation** (for \\(\\text{A} \\to \\text{P}\\)):\n" +
        "- rate \\(= -\\dfrac{d[\\text{A}]}{dt} = k[\\text{A}]^0 = k\\) (6.14)\n" +
        "- Rearranging: \\(d[\\text{A}] = -k\\,dt\\)\n" +
        "- Integrate between \\([\\text{A}]_0\\) at \\(t = 0\\) and \\([\\text{A}]_t\\) at \\(t = t\\): \\(\\displaystyle\\int_{[\\text{A}]_0}^{[\\text{A}]_t} d[\\text{A}] = -k\\int_0^t dt\\)\n" +
        "- \\([\\text{A}]_t - [\\text{A}]_0 = -kt\\), hence \\(kt = [\\text{A}]_0 - [\\text{A}]_t\\) (6.15), or \\(k = \\dfrac{[\\text{A}]_0 - [\\text{A}]_t}{t}\\)\n" +
        "- **Unit of k:** \\(\\dfrac{\\text{mol dm}^{-3}}{\\text{time}}\\), that is mol dm⁻³ s⁻¹: the same as the unit of rate.\n" +
        "- **Graph:** \\([\\text{A}]_t = -kt + [\\text{A}]_0\\) (6.17), so \\([\\text{A}]_t\\) against \\(t\\) is a straight line of slope \\(-k\\) and intercept \\([\\text{A}]_0\\) (Fig. 6.6).\n" +
        "- **Examples:** decomposition of NH₃ on platinum, \\(2\\text{NH}_3 \\to \\text{N}_2 + 3\\text{H}_2\\) (the metal surface is completely covered by NH₃ and only the molecules on the surface react); decomposition of N₂O on a Pt catalyst; catalytic decomposition of PH₃ on hot tungsten at high pressure.",
      formula: {
        label: "Zero order integrated rate law",
        latex: "kt = [\\text{A}]_0 - [\\text{A}]_t, \\qquad [\\text{A}]_t = -kt + [\\text{A}]_0",
      },
      authoredExample: {
        prompt:
          "A zero order reaction has a rate constant of 0.025 mol dm⁻³ min⁻¹ and an initial reactant concentration of 0.80 mol dm⁻³. Find the concentration after 12 minutes and the time at which the reactant is used up.",
        steps: [
          "Given: \\(k = 0.025\\) mol dm⁻³ min⁻¹, \\([\\text{A}]_0 = 0.80\\) mol dm⁻³, \\(t = 12\\) min.",
          "Formula: \\([\\text{A}]_t = [\\text{A}]_0 - kt\\).",
          "Substitution: \\([\\text{A}]_t = 0.80 - 0.025 \\times 12 = 0.80 - 0.30 = 0.50\\) mol dm⁻³.",
          "Used up when \\([\\text{A}]_t = 0\\): \\(t = \\dfrac{[\\text{A}]_0}{k} = \\dfrac{0.80\\ \\text{mol dm}^{-3}}{0.025\\ \\text{mol dm}^{-3}\\ \\text{min}^{-1}} = 32\\) min.",
        ],
        answer: "0.50 mol dm⁻³ after 12 min; used up after 32 min",
      },
      selfCheckExample: {
        prompt: "In a zero order reaction the reactant concentration falls from 0.50 mol dm⁻³ to 0.35 mol dm⁻³ in 60 s. Find the rate constant.",
        steps: ["\\(k = \\dfrac{[\\text{A}]_0 - [\\text{A}]_t}{t} = \\dfrac{0.50 - 0.35}{60}\\).", "\\(k = 2.5 \\times 10^{-3}\\) mol dm⁻³ s⁻¹."],
        answer: "2.5 × 10⁻³ mol dm⁻³ s⁻¹",
      },
      practiceSet: [
        { prompt: "Why is the decomposition of NH₃ on platinum zero order?", answer: "The platinum surface is completely covered by NH₃; only the molecules on the surface react, so the rate does not depend on the total NH₃ concentration" },
        { prompt: "On the straight line of [A]ₜ against t for a zero order reaction, what does the intercept on the y-axis give?", answer: "The initial concentration \\([\\text{A}]_0\\)" },
        { prompt: "Name two zero order reactions other than NH₃ on platinum.", answer: "N₂O decomposing on a Pt catalyst; PH₃ decomposing on hot tungsten at high pressure" },
      ],
      pyqExampleId: "bd90677c-e721-4cd0-ab5b-382ab9209d65",
      traps: [
        {
          title: "A log graph for a zero order reaction",
          body: "For zero order, \\([\\text{A}]_t\\) itself against \\(t\\) is the straight line. A log plot is the test for first order.",
        },
        {
          title: "Wrong sign order in k",
          body: "\\(k = \\dfrac{[\\text{A}]_0 - [\\text{A}]_t}{t}\\), initial minus final. The other way round makes \\(k\\) negative, which a rate constant never is.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccck-k-units",
      name: "Unit of the rate constant and the order",
      intuition:
        "The rate always has the unit mol dm⁻³ s⁻¹. The rate constant must make up whatever the concentration terms leave over, so its unit tells you the order at a glance.",
      definition:
        "- From rate \\(= k[\\text{A}]^n\\): \\(k = \\dfrac{\\text{rate}}{[\\text{A}]^n}\\), so the unit of \\(k\\) is \\(\\dfrac{\\text{mol dm}^{-3}\\ \\text{s}^{-1}}{(\\text{mol dm}^{-3})^n} = (\\text{mol dm}^{-3})^{1-n}\\ \\text{s}^{-1}\\).\n" +
        "- **First order:** \\(\\log_{10}([\\text{A}]_0/[\\text{A}]_t)\\) has no unit, so \\(k\\) has the unit (time)⁻¹: s⁻¹, min⁻¹ or h⁻¹.\n" +
        "- **Zero order:** \\(k\\) has the same unit as the rate.\n" +
        "- The time unit in \\(k\\) is whatever time unit was used in the data.",
      table: {
        columns: ["Order", "Rate law", "Unit of k (mol dm⁻³ and s)"],
        rows: [
          {
            cells: ["Zero", "rate \\(= k\\)", "mol dm⁻³ s⁻¹ (same as the rate)"],
            pyqExampleId: "c2c30b2a-d5e6-43f7-96d4-a669ae5549f6",
            noteAmber: "Board 2024, 2025 and 2026 asked which order has k in mol dm⁻³ s⁻¹, or the unit of k for zero order.",
          },
          { cells: ["First", "rate \\(= k[\\text{A}]\\)", "s⁻¹"], noteAmber: "Board 2026 asked the order when k is in s⁻¹." },
          { cells: ["Second", "rate \\(= k[\\text{A}]^2\\)", "dm³ mol⁻¹ s⁻¹ (L mol⁻¹ s⁻¹ or M⁻¹ s⁻¹)"] },
          { cells: ["Third", "rate \\(= k[\\text{A}]^2[\\text{B}]\\)", "dm⁶ mol⁻² s⁻¹"] },
        ],
      },
      selfCheckExample: {
        prompt: "A rate constant is reported as \\(4.2 \\times 10^{-3}\\) dm³ mol⁻¹ s⁻¹. What is the order of the reaction?",
        steps: ["\\((\\text{mol dm}^{-3})^{1-n} = \\text{mol}^{-1}\\ \\text{dm}^3\\) needs \\(1 - n = -1\\).", "\\(n = 2\\)."],
        answer: "Second order",
      },
      practiceSet: [
        { prompt: "A first order reaction is followed with time in minutes. What is the unit of k?", answer: "min⁻¹" },
        { prompt: "Which order of reaction has a rate constant with the same unit as the rate?", answer: "Zero order" },
        { prompt: "Write the unit of k for a third order reaction with concentration in mol L⁻¹ and time in s.", answer: "L² mol⁻² s⁻¹" },
      ],
      pyqExampleId: "d92cc074-52fc-4d4e-a41a-f9b863c1efdd",
      traps: [
        {
          title: "Order read from the coefficient instead of the unit",
          body: "\\(2\\text{N}_2\\text{O}_5 \\to 2\\text{N}_2\\text{O}_4 + \\text{O}_2\\) with \\(k\\) in s⁻¹ is first order. The coefficient 2 says nothing about the order; the unit does.",
        },
        {
          title: "Getting the second order unit upside down",
          body: "Second order is dm³ mol⁻¹ s⁻¹ (mol to the power −1, dm³ to the power +1). Writing mol⁻¹ dm⁻³ s⁻¹ is a common slip; work it out from \\((\\text{mol dm}^{-3})^{1-n}\\).",
        },
      ],
    },
  ],
};
