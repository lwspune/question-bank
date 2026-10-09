import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BMO_KINETICS_NOTE: SubtopicNote = {
  subtopicName: "Enzyme Activity and Inhibition",
  title: "Temperature, pH, Substrate and Inhibitors",
  oneLineDefinition:
    "Enzyme rate rises with temperature until the protein denatures, peaks at an optimum pH, levels off as substrate saturates the active sites, and falls when an inhibitor blocks or distorts the enzyme.",
  whyItMatters:
    "Two ministry questions sit here: which enzymes can work in the same pH (2023) and what happens in competitive inhibition (2025). The older papers asked for the right rate curves with and without a competitive inhibitor (2014), what all inhibitors have in common (2017), how a drug that mimics nucleotides acts (2018), and how to read temperature and pH graphs (2022).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bmo-temperature-ph",
      name: "Effect of temperature and pH on enzyme activity",
      intuition:
        "Warming speeds molecules up, so they meet more often and with more energy, and the rate rises. But the enzyme's shape is held by weak bonds, and too much heat shakes them apart: the active site loses its shape and activity collapses. pH works on the same weak bonds, by changing the charges on R groups, so each enzyme works only inside a range of pH around its optimum.",
      definition:
        "- **Temperature**: below the optimum, the rate roughly **doubles for every 10 °C** rise. Above the **optimum** (about 37 to 40 °C for most human enzymes), the enzyme **denatures**: the active site changes shape and the rate falls steeply. Denaturation by heat is usually **irreversible**.\n" +
        "- Cold does **not** denature: at low temperature an enzyme is simply slow, and works again when warmed.\n" +
        "- Enzymes of organisms from hot springs (such as the Taq polymerase used in PCR) have optima above 70 °C.\n" +
        "- **pH**: each enzyme has an **optimum pH** and a working range. Away from it, the charges on R groups change, ionic and hydrogen bonds break, and the active site changes shape. Pepsin works best at about pH 2, salivary amylase near pH 7, trypsin near pH 8.\n" +
        "- Two enzymes can work in the same solution only at a pH inside **both** of their working ranges.\n" +
        "- In an experiment on one factor, the others (pH, temperature, concentrations) are kept constant, usually at their optimum.",
      table: {
        columns: ["Condition", "Effect on rate", "Reason"],
        rows: [
          { cells: ["Temperature rising below the optimum", "Increases", "More frequent and more energetic collisions"] },
          { cells: ["Temperature above the optimum", "Falls steeply", "Bonds holding the shape break; the enzyme denatures"] },
          { cells: ["Low temperature", "Very slow, but recovers on warming", "Few collisions; the enzyme is not denatured"] },
          { cells: ["pH away from the optimum", "Falls on both sides", "Charges on R groups change; the active site changes shape"] },
          { cells: ["More enzyme, with plenty of substrate", "Increases in proportion", "More active sites available"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Five enzymes are active only within these pH ranges: P from 1.5 to 3.5; Q from 4.0 to 6.0; R from 6.5 to 8.5; S from 9.0 to 11.0; T from 5.5 to 7.0. Which pair of enzymes could both be active in the same solution?",
        options: ["P and Q", "Q and R", "Q and T", "R and S", "P and T"],
        steps: [
          "Two enzymes can work together only where their ranges overlap.",
          "Q (4.0 to 6.0) and T (5.5 to 7.0) overlap between pH 5.5 and 6.0.",
          "P ends at 3.5 before Q starts at 4.0; Q ends at 6.0 before R starts at 6.5; R ends at 8.5 before S starts at 9.0; P and T are far apart. Comparing only the optimum values, instead of the whole ranges, is the usual slip.",
        ],
        answer: "(C) Q and T",
      },
      practiceSet: [
        { prompt: "A human enzyme is kept at 5 °C and then warmed to 37 °C. Will it work?", answer: "Yes: cold slows it but does not denature it" },
        { prompt: "What is the approximate optimum pH of pepsin?", answer: "About pH 2" },
        { prompt: "Why does an enzyme stop working at 70 °C?", answer: "It is denatured: the bonds holding the active site's shape are broken" },
        { prompt: "In an experiment on the effect of pH, what should be done with the temperature?", answer: "Keep it constant, ideally at the enzyme's optimum" },
      ],
      traps: [
        {
          title: "Low temperature inactivates; high temperature denatures",
          body: "Cooling slows an enzyme but leaves its shape intact, so activity returns on warming. Heating above the optimum breaks the bonds holding the shape, and this is usually permanent. Do not say an enzyme is denatured by cold.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bmo-substrate-concentration",
      name: "Substrate concentration, Vmax and Km",
      intuition:
        "With little substrate, most active sites are empty, so adding substrate fills more of them and the rate climbs almost in proportion. As substrate builds up, nearly every active site is busy all the time, and adding more cannot make the enzyme work faster. The rate levels off at a maximum set by how much enzyme there is.",
      definition:
        "- At low substrate concentration the rate rises steeply; at high concentration it levels off at the **maximum rate**, \\(V_{\\max}\\), because all active sites are occupied (the enzyme is **saturated**).\n" +
        "- \\(V_{\\max}\\) depends on the amount of enzyme: double the enzyme, double \\(V_{\\max}\\).\n" +
        "- The **Michaelis constant** \\(K_m\\) is the substrate concentration at which the rate is **half** of \\(V_{\\max}\\).\n" +
        "- A **low** \\(K_m\\) means the enzyme reaches half speed at a low substrate concentration: it has a **high affinity** for its substrate.\n" +
        "- IMAT asks this mostly in words or as a graph; the equation below shows where the curve comes from.",
      formula: {
        label: "Michaelis-Menten equation",
        latex: "v = \\frac{V_{\\max}\\,[S]}{K_m + [S]}",
        symbols: [
          { symbol: "\\(v\\)", meaning: "initial rate of reaction" },
          { symbol: "\\(V_{\\max}\\)", meaning: "maximum rate, when all active sites are occupied" },
          { symbol: "\\([S]\\)", meaning: "substrate concentration" },
          { symbol: "\\(K_m\\)", meaning: "substrate concentration giving half of \\(V_{\\max}\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "An enzyme has \\(V_{\\max} = 40\\ \\mu\\text{mol/min}\\) and \\(K_m = 2.0\\ \\text{mmol/dm}^3\\). Find the initial rate when the substrate concentration is 2.0 and when it is 6.0 \\(\\text{mmol/dm}^3\\).",
        steps: [
          "At \\([S] = K_m = 2.0\\): \\(v = 40 \\times 2.0 / (2.0 + 2.0) = 20\\ \\mu\\text{mol/min}\\), exactly half of \\(V_{\\max}\\), as the definition of \\(K_m\\) says.",
          "At \\([S] = 6.0\\): \\(v = 40 \\times 6.0 / (2.0 + 6.0) = 30\\ \\mu\\text{mol/min}\\).",
          "Tripling the substrate raised the rate by only half: the enzyme is moving towards saturation.",
        ],
        answer: "20 µmol/min, then 30 µmol/min",
      },
      selfCheckExample: {
        prompt:
          "In an experiment with a fixed amount of enzyme, the initial rate stops increasing once the substrate concentration is high. What is the best explanation?",
        options: [
          "All the active sites are occupied at any moment",
          "The substrate denatures the enzyme",
          "The activation energy of the reaction rises",
          "The enzyme is used up in the reaction",
          "The equilibrium shifts towards the substrate",
        ],
        steps: [
          "With the enzyme saturated, each active site is already busy; extra substrate has to wait, so the rate stays at \\(V_{\\max}\\).",
          "Substrate does not denature the enzyme, the activation energy of the catalysed path does not change, enzymes are not used up, and the initial rate is measured before equilibrium matters.",
        ],
        answer: "(A) All the active sites are occupied at any moment",
      },
      practiceSet: [
        { prompt: "An enzyme reaches 40 units/min at 0.5 mmol/dm³ of substrate, and its \\(V_{\\max}\\) is 80 units/min. What is its \\(K_m\\)?", answer: "0.5 mmol/dm³", method: "Half of \\(V_{\\max}\\) is reached at \\([S] = K_m\\)" },
        { prompt: "What fraction of \\(V_{\\max}\\) is reached when \\([S] = 9K_m\\)?", answer: "0.9 (90%)", method: "\\(9/(1+9)\\)" },
        { prompt: "With \\(V_{\\max} = 50\\) units and \\(K_m = 4.0\\ \\text{mmol/dm}^3\\), what is the rate at \\([S] = 12\\ \\text{mmol/dm}^3\\)?", answer: "37.5 units", method: "\\(50 \\times 12 / 16\\)" },
        { prompt: "Enzyme X has a lower \\(K_m\\) than enzyme Y for the same substrate. Which has the higher affinity?", answer: "Enzyme X" },
      ],
      traps: [
        {
          title: "Km is a substrate concentration, not a rate",
          body: "\\(K_m\\) is the substrate concentration at half the maximum rate, so its unit is a concentration. A smaller \\(K_m\\) means higher affinity, not a slower enzyme.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bmo-inhibition",
      name: "Competitive, non-competitive and irreversible inhibition",
      intuition:
        "A competitive inhibitor looks like the substrate and sits in the active site, so the two compete for the same seat: flood the enzyme with substrate and the substrate wins. A non-competitive inhibitor binds somewhere else and bends the enzyme out of shape, so no amount of substrate can help. The cell also uses inhibition on purpose, letting the end product of a pathway switch off its first enzyme.",
      definition:
        "- **Competitive inhibitor**: similar in shape to the substrate; binds **reversibly to the active site**, blocking the substrate. Adding more substrate overcomes it. \\(V_{\\max}\\) is **unchanged**; \\(K_m\\) **rises**. On a rate against substrate graph, the curve rises more slowly but reaches the same plateau.\n" +
        "- Example: drugs that mimic nucleotides block the viral enzyme reverse transcriptase, so no new phosphodiester bonds form and fewer virus particles are made.\n" +
        "- **Non-competitive inhibitor**: binds to another site (often an **allosteric site**), changing the shape of the active site. More substrate does **not** overcome it. \\(V_{\\max}\\) is **lowered**; \\(K_m\\) is unchanged. The curve levels off lower.\n" +
        "- **Irreversible inhibitors** bind permanently, often covalently: cyanide on cytochrome oxidase, nerve agents on acetylcholinesterase, aspirin on cyclooxygenase.\n" +
        "- **End-product (feedback) inhibition**: the final product of a pathway inhibits an early enzyme, usually allosterically, so the cell makes only what it needs.\n" +
        "- The only thing every inhibitor does is **reduce the rate**. Not all change the active site's shape, none denature the enzyme, and they do not raise the activation energy of the catalysed reaction.",
      table: {
        columns: ["Type", "Where it binds", "Effect of adding more substrate", "Effect on Vmax and Km"],
        rows: [
          { cells: ["Competitive", "Active site", "Overcomes the inhibition", "Vmax same; Km higher"] },
          { cells: ["Non-competitive", "Another site (allosteric)", "Does not help", "Vmax lower; Km same"] },
          { cells: ["Irreversible", "Usually the active site, permanently", "Does not help", "Enzyme molecules lost for good"] },
          { cells: ["End-product (feedback)", "Allosteric site of an early enzyme", "Depends on the product level", "Pathway slows when product builds up"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A fixed concentration of a non-competitive inhibitor is added to an enzyme reaction. Compared with the reaction without inhibitor, which statement is correct?",
        options: [
          "\\(V_{\\max}\\) is unchanged and \\(K_m\\) is higher",
          "\\(V_{\\max}\\) is higher and \\(K_m\\) is unchanged",
          "\\(V_{\\max}\\) and \\(K_m\\) are both unchanged",
          "\\(V_{\\max}\\) is lower, and adding more substrate cannot restore it",
          "The inhibitor binds to the substrate, so less free substrate is available",
        ],
        steps: [
          "A non-competitive inhibitor binds away from the active site and distorts it, so some enzyme molecules cannot work whatever the substrate concentration. \\(V_{\\max}\\) falls and extra substrate does not help.",
          "Option A describes a competitive inhibitor. Option E is wrong for both types: inhibitors bind to the enzyme, not to the substrate.",
        ],
        answer: "(D) \\(V_{\\max}\\) is lower, and adding more substrate cannot restore it",
      },
      practiceSet: [
        { prompt: "Which type of inhibition can be overcome by raising the substrate concentration?", answer: "Competitive inhibition" },
        { prompt: "Where does a non-competitive inhibitor bind?", answer: "At a site other than the active site (an allosteric site)" },
        { prompt: "What is end-product inhibition?", answer: "The final product of a pathway inhibits an enzyme early in the pathway" },
      ],
      traps: [
        {
          title: "A competitive inhibitor binds the enzyme, not the substrate",
          body: "The inhibitor and the substrate compete for the same active site. The inhibitor does not attach to the substrate, and it does not block the release of products. Options describing either are wrong.",
        },
        {
          title: "The one property all inhibitors share is a lower rate",
          body: "Competitive inhibitors do not change the active site's shape; no inhibitor denatures the enzyme; none raise the activation energy of the catalysed reaction. The only statement true of every inhibitor is that it reduces the rate of the reaction.",
        },
      ],
    },
  ],
};
