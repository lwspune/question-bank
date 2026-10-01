import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_CB_HYDROCARBONS_NOTE: SubtopicNote = {
  subtopicName: "Hydrocarbons and Fuels",
  title: "Hydrocarbons and Fuels",
  oneLineDefinition:
    "The general formulas of alkanes, alkenes and alkynes, benzene's structure, why some fuels burn with a sooty flame, and what octane and cetane numbers measure.",
  whyItMatters:
    "Six CDS questions, three of them from the 2024 and 2025 papers. The fuel-rating questions (octane, cetane) are the newest and the hardest; the rest test one formula or one flame.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschcb-series",
      name: "Alkanes, alkenes, alkynes and benzene",
      intuition:
        "A hydrocarbon contains only carbon and hydrogen. If every carbon-carbon bond is single, the compound is saturated and holds as many hydrogens as it can. Each double bond removes two hydrogens; a triple bond removes four.",
      definition:
        "The series:\n" +
        "- **Alkanes** (saturated, single bonds only): **CₙH₂ₙ₊₂** — methane CH₄, ethane C₂H₆.\n" +
        "- **Alkenes** (one double bond): **CₙH₂ₙ** — ethene C₂H₄.\n" +
        "- **Alkynes** (one triple bond): **CₙH₂ₙ₋₂** — ethyne C₂H₂.\n" +
        "- Name stems give the number of carbons: meth 1, eth 2, prop 3, but 4, pent 5, hex 6, … **hexadec 16**.\n" +
        "- **Benzene** C₆H₆ is a flat ring: each carbon makes sigma bonds to two carbons at **120°**, the pi electrons are **delocalised** above and below the ring, and every C–C bond is the **same length**, between single and double. Benzene itself has **no isomers**.",
      formula: {
        label: "General formulas",
        latex: "\\text{alkane } C_nH_{2n+2} \\qquad \\text{alkene } C_nH_{2n} \\qquad \\text{alkyne } C_nH_{2n-2}",
      },
      authoredExample: {
        prompt: "Write the molecular formulas of the alkane, the alkene and the alkyne that each contain four carbon atoms.",
        steps: [
          "Alkane: \\(C_nH_{2n+2}\\) with n = 4 gives \\(C_4H_{10}\\) (butane).",
          "Alkene: \\(C_nH_{2n}\\) gives \\(C_4H_8\\) (butene).",
          "Alkyne: \\(C_nH_{2n-2}\\) gives \\(C_4H_6\\) (butyne).",
        ],
        answer: "C₄H₁₀, C₄H₈ and C₄H₆.",
      },
      selfCheckExample: {
        prompt: "A hydrocarbon has the formula C₃H₄. Is it an alkane, an alkene or an alkyne?",
        steps: [
          "For n = 3: an alkane would be C₃H₈, an alkene C₃H₆, an alkyne C₃H₄.",
          "C₃H₄ matches \\(C_nH_{2n-2}\\).",
        ],
        answer: "An alkyne (propyne).",
      },
      pyqExampleId: "9d29ec52-127f-4baa-9f56-176cb7afe511",
      practiceSet: [
        { prompt: "What is the general formula of a saturated hydrocarbon?", answer: "CₙH₂ₙ₊₂" },
        { prompt: "What is the formula of ethene?", answer: "C₂H₄" },
        { prompt: "What is the bond angle between carbons in benzene?", answer: "120°" },
        { prompt: "How many carbons does a 'hexadecane' have?", answer: "16" },
      ],
      traps: [
        {
          title: "CₙH₂ₙ₊₁ is a group, not a compound",
          body: "Formulas with an odd number of hydrogens, such as CₙH₂ₙ₊₁, describe an **alkyl group** (methyl, ethyl), not a stable hydrocarbon. Saturated hydrocarbons are CₙH₂ₙ₊₂.",
        },
        {
          title: "Benzene has no isomers of its own",
          body: "All six carbons and all six hydrogens in benzene are equivalent, so 'benzene has six isomers' is false. Its C–C bonds are all the same length.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcb-flames",
      name: "Clean and sooty flames",
      intuition:
        "A flame is yellow and smoky when there is not enough oxygen to burn all the carbon. Fuels rich in carbon compared with hydrogen, such as unsaturated and aromatic compounds, run short of oxygen first.",
      definition:
        "The rule:\n" +
        "- **Saturated** hydrocarbons burn with a **clean blue flame** when air is enough.\n" +
        "- **Unsaturated** hydrocarbons (and aromatics such as **naphthalene**) burn with a **yellow, sooty flame**.\n" +
        "- The soot is unburnt carbon: the cause is **incomplete combustion**, because the **carbon-to-hydrogen ratio is high**.",
      table: {
        columns: ["Fuel", "Flame", "Why"],
        rows: [
          { cells: ["Saturated (methane, LPG)", "Blue, clean", "Burns completely"] },
          {
            cells: ["Unsaturated hydrocarbons", "Yellow, sooty", "Incomplete combustion"],
            pyqExampleId: "2c2fb893-5594-4a64-865e-6d7df5d71d51",
          },
          {
            cells: ["Naphthalene (aromatic)", "Yellow, sooty", "High carbon to hydrogen ratio, so incomplete combustion"],
            noteAmber: "CDS 2023 (I): the reason is incomplete combustion. 'The carbon to hydrogen ratio is low' states the reverse.",
            pyqExampleId: "e73941fa-8cf5-45fc-b3b6-ce2ba43efca1",
          },
        ],
      },
      pyqExampleId: "2c2fb893-5594-4a64-865e-6d7df5d71d51",
      practiceSet: [
        { prompt: "What colour flame does a saturated hydrocarbon give in enough air?", answer: "Blue" },
        { prompt: "What is the black smoke from a sooty flame?", answer: "Unburnt carbon" },
        { prompt: "Is the carbon-to-hydrogen ratio of naphthalene high or low?", answer: "High" },
      ],
      traps: [
        {
          title: "Sooty means carbon-rich, not carbon-poor",
          body: "A sooty flame comes from a **high** carbon-to-hydrogen ratio and incomplete combustion. Excess air would give a cleaner flame, not a sootier one.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschcb-fuel-ratings",
      name: "Octane and cetane numbers",
      intuition:
        "Petrol and diesel are rated on opposite qualities. A petrol should resist igniting too early (knocking), so a high octane number is good. A diesel should ignite quickly when compressed, so a high cetane number is good.",
      definition:
        "The two ratings:\n" +
        "- **Octane number** (petrol): resistance to knocking. Iso-octane = 100, n-heptane = 0.\n" +
        "- Among straight-chain alkanes the octane number **falls as the chain gets longer**. **Branching and rings raise** it.\n" +
        "- So **butane > cyclohexane > pentane > hexane**: the ring puts cyclohexane above the five- and six-carbon chains, but still below butane.\n" +
        "- **Cetane number** (diesel): ease of ignition. **Cetane is n-hexadecane** (C₁₆H₃₄), rated 100.",
      table: {
        columns: ["Rating", "For", "Reference fuel = 100"],
        rows: [
          {
            cells: ["Octane number", "Petrol (resists knocking)", "Iso-octane"],
            noteAmber: "CDS 2024 (I), HARD: butane > cyclohexane > pentane > hexane.",
            pyqExampleId: "8d3c8631-ba13-4f83-9f65-555e378ad40d",
          },
          {
            cells: ["Cetane number", "Diesel (ignites easily)", "Cetane (n-hexadecane)"],
            pyqExampleId: "738aa02a-4788-4ce3-9fc2-8086a162b83d",
          },
        ],
      },
      pyqExampleId: "738aa02a-4788-4ce3-9fc2-8086a162b83d",
      practiceSet: [
        { prompt: "Which compound is called cetane?", answer: "n-Hexadecane" },
        { prompt: "Which fuel is rated by octane number?", answer: "Petrol" },
        { prompt: "Does branching raise or lower the octane number?", answer: "Raises it" },
        { prompt: "Which has the higher octane number, pentane or hexane?", answer: "Pentane" },
      ],
      traps: [
        {
          title: "Longer chain, lower octane",
          body: "For straight-chain alkanes the octane number **drops** as carbons are added: butane > pentane > hexane. A ring (cyclohexane) raises it above the matching chain.",
        },
      ],
    },
  ],
};
