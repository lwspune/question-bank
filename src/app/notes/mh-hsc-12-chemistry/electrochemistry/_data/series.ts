import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_EC_SERIES_NOTE: SubtopicNote = {
  subtopicName: "Electrochemical Series",
  title: "The Electrochemical Series",
  oneLineDefinition:
    "The electrochemical series as the textbook arranges it, how it ranks oxidising and reducing agents, and how it predicts whether a redox reaction is spontaneous.",
  whyItMatters:
    "7 questions. Three were set in board papers, and all three ask the same thing: define the electrochemical series and write its applications (2019, 2020 and 2024); 2020 also asked you to define corrosion. The textbook adds picking the strongest oxidising and reducing agents, ranking them, and predicting whether reactions occur.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccec-series-order",
      name: "The series and the strength of oxidising and reducing agents",
      intuition:
        "List every electrode by its standard reduction potential, highest at the top. The top left of the list holds the species most eager to take electrons, the strongest oxidising agents. The bottom right holds the species most eager to give them away, the strongest reducing agents. Read the list and you can rank any two substances without doing an experiment.",
      definition:
        "- **Definition (textbook):** the arrangement of electrodes with their half reactions in the **decreasing order of their standard potentials** (standard reduction potentials, measured against SHE) is the electrochemical series, or electromotive series.\n" +
        "- Half reactions are written as reductions: oxidising agents and electrons on the left, reducing agents on the right.\n" +
        "- **Oxidising agents:** the higher the \\(E^0\\), the stronger. Strength falls from top to bottom; F₂ at the top left is the strongest.\n" +
        "- **Reducing agents:** the more negative the \\(E^0\\), the stronger. Li at the bottom right is the strongest.\n" +
        "- Hydrogen (\\(E^0 = 0\\)) sits in the middle: potentials above it are positive, below it negative.\n" +
        "- **Rules:** an oxidising agent can oxidise any reducing agent that appears below it; a reducing agent can reduce an oxidising agent located above it.\n" +
        "- **Applications:** (i) relative strengths of oxidising agents, (ii) relative strengths of reducing agents, (iii) predicting whether a redox reaction is spontaneous, through \\(E^0_{\\text{cell}}\\).\n" +
        "- Board 2020 also asked you to define corrosion; this chapter of the present textbook does not teach it.",
      table: {
        columns: ["Half reaction", "E⁰ in V", "What it shows"],
        rows: [
          { cells: ["\\(\\text{F}_2 + 2e^- \\to 2\\text{F}^-\\)", "+2.870", "F₂ is the strongest oxidising agent"] },
          { cells: ["\\(\\text{Ag}^+ + e^- \\to \\text{Ag}\\)", "+0.799", "Ag⁺ is a fairly strong oxidising agent"] },
          { cells: ["\\(\\text{Cu}^{2+} + 2e^- \\to \\text{Cu}\\)", "+0.337", "Above hydrogen: positive potential"] },
          { cells: ["\\(2\\text{H}^+ + 2e^- \\to \\text{H}_2\\)", "0.00", "The reference, SHE"] },
          { cells: ["\\(\\text{Zn}^{2+} + 2e^- \\to \\text{Zn}\\)", "−0.763", "Zn reduces Cu²⁺, which lies above it"] },
          { cells: ["\\(\\text{Li}^+ + e^- \\to \\text{Li}\\)", "−3.045", "Li is the strongest reducing agent"] },
        ],
      },
      practiceSet: [
        { prompt: "In the electrochemical series, on which side of the half reactions are the reducing agents?", answer: "The right side" },
        { prompt: "Where in the electrochemical series are the strongest oxidising agents found?", answer: "At the top, on the left side of the half reactions" },
        { prompt: "In which order does the textbook arrange the electrodes in the electrochemical series?", answer: "In decreasing order of their standard reduction potentials" },
      ],
      pyqExampleId: "637dfc1a-6bdd-451d-89e4-c643c59e6e03",
      traps: [
        {
          title: "Increasing instead of decreasing",
          body: "The textbook arranges the electrodes in decreasing order of standard reduction potential, with F₂ at the top and Li at the bottom. Write the definition that way.",
        },
        {
          title: "Calling a metal ion a strong reducing agent",
          body: "In \\(\\text{Zn}^{2+} + 2e^- \\to \\text{Zn}\\), the reducing agent is Zn, on the right. Zn²⁺, on the left, is the oxidising form.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccec-spontaneity",
      name: "Predicting whether a redox reaction occurs",
      intuition:
        "Pretend the reaction is running in a galvanic cell. The species that gets reduced is the cathode and the species that gets oxidised is the anode. If the cell potential comes out positive, the reaction goes by itself; if negative, it goes the other way.",
      definition:
        "- A redox reaction is spontaneous only if the species with the higher \\(E^0\\) is reduced and the one with the lower \\(E^0\\) is oxidised.\n" +
        "- Steps: (1) find which species is reduced and which is oxidised in the reaction as written; (2) \\(E^0_{\\text{cell}} = E^0(\\text{reduced}) - E^0(\\text{oxidised})\\); (3) positive means spontaneous under standard conditions, negative means not (the reverse reaction is spontaneous).\n" +
        "- A metal displaces from solution the ions of a metal lying above it in the series.",
      formula: {
        label: "Test for spontaneity",
        latex: "E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}} > 0 \\ \\Rightarrow \\ \\text{spontaneous}",
      },
      authoredExample: {
        prompt:
          "Predict whether the reaction \\(\\text{Zn}(s) + \\text{Fe}^{2+}(aq) \\to \\text{Zn}^{2+}(aq) + \\text{Fe}(s)\\) occurs under standard conditions. E⁰ of Zn = −0.763 V, E⁰ of Fe = −0.440 V.",
        steps: [
          "Zn is oxidised (anode); Fe²⁺ is reduced (cathode).",
          "Formula: \\(E^0_{\\text{cell}} = E^0_{\\text{cathode}} - E^0_{\\text{anode}}\\).",
          "Substitution: \\(E^0_{\\text{cell}} = -0.440 - (-0.763) = +0.323\\) V.",
          "\\(E^0_{\\text{cell}}\\) is positive, so the reaction is spontaneous: zinc displaces iron.",
        ],
        answer: "E⁰cell = +0.323 V; the reaction occurs",
      },
      selfCheckExample: {
        prompt: "Using standard potentials, show why zinc gives hydrogen with 1 M acid but copper does not. E⁰ of Zn = −0.763 V, E⁰ of Cu = 0.337 V, E⁰ of H⁺ | H₂ = 0.",
        steps: [
          "Zinc with H⁺: H⁺ reduced, Zn oxidised; \\(E^0_{\\text{cell}} = 0 - (-0.763) = +0.763\\) V, positive, so it occurs.",
          "Copper with H⁺: \\(E^0_{\\text{cell}} = 0 - 0.337 = -0.337\\) V, negative, so it does not.",
        ],
        answer: "Zinc lies below hydrogen in the series and reduces H⁺; copper lies above it and cannot",
      },
      practiceSet: [
        { prompt: "What sign of E⁰cell shows that a redox reaction is spontaneous under standard conditions?", answer: "Positive" },
        { prompt: "In a spontaneous redox reaction, is the species with the higher E⁰ oxidised or reduced?", answer: "Reduced" },
        { prompt: "If a reaction as written gives a negative E⁰cell, which reaction is spontaneous?", answer: "The reverse reaction" },
      ],
      pyqExampleId: "5b4c6548-6221-400d-aa77-84465ea79f39",
      traps: [
        {
          title: "Choosing the cathode from the table, not the reaction",
          body: "When asked about a given reaction, the cathode is the species reduced IN THAT REACTION. A negative answer is then the correct verdict: the reaction does not occur.",
        },
      ],
    },
  ],
};
