import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/alkanes";

export const STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Nomenclature, Structural Isomers and Physical Properties",
  title: "The Alkane Series: Formula, Isomers, Carbon Types and Boiling Points",
  oneLineDefinition:
    "Alkanes are saturated hydrocarbons CₙH₂ₙ₊₂; each member differs from the next by CH₂ (14 g/mol), the number of structural isomers grows with n, and boiling point rises with chain length and falls with branching.",
  whyItMatters:
    "14 PYQs, three MODERATE. Seven count isomers or carbon types, four are homologous-series arithmetic, and three are boiling points and uses. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetalkane-homologous-series",
      name: "The Homologous Series and Its Molar Masses",
      intuition:
        "Every step along the series adds one CH₂, so formula and molar mass are both linear in n. That turns any 'which member' or 'difference in molar mass' question into one line of arithmetic.",
      definition:
        "- **General formula**: **CₙH₂ₙ₊₂**; molar mass **14n + 2**.\n" +
        "- Successive members differ by **CH₂ = 14 g/mol**, whatever the series.\n" +
        "- Names: methane 16, ethane 30, **propane 44** (the third member), butane 58 … decane C₁₀H₂₂, **undecane C₁₁H₂₄**.",
      formula: {
        label: "Alkane molar mass",
        latex: "\\mathrm{C_nH_{2n+2}}:\\quad M = 14n + 2\\ \\text{g mol}^{-1}",
      },
      authoredExample: {
        prompt: "The first member of a homologous series has molar mass 46 g. What is the molar mass of the third member?",
        steps: ["Each step adds CH₂ = 14 g.", "Third member = 46 + 2 × 14 = 74 g."],
        answer: "74 g",
      },
      selfCheckExample: {
        prompt: "Molecular formula of undecane?",
        steps: ["Undec- = 11 carbons; H = 2(11) + 2 = 24."],
        answer: "C₁₁H₂₄",
      },
      practiceSet: [
        { prompt: "Difference in molar mass of undecane and decane?", answer: "14 g mol⁻¹" },
        { prompt: "Molar mass of the third member of the alkane series?", answer: "44 g mol⁻¹ (propane)" },
      ],
      pyqExampleId: "9070014e-50e1-4803-a85b-865e9f0b0d2e",
      traps: [
        {
          title: "Starting the count at ethane",
          body: "The third alkane is propane, 44 — count from methane. 58 is butane, the fourth.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetalkane-isomers-and-carbon-types",
      name: "Structural Isomers and Primary, Secondary, Tertiary Carbons",
      intuition:
        "Branching the chain gives structural isomers: two for butane, three for pentane, five for hexane. Questions run the table backwards — 'an alkane with five isomers' means six carbons, so n moles of it hold 6n moles of carbon. A carbon's type is simply how many other carbons it is bonded to.",
      definition:
        "- **Isomer counts**: C₄H₁₀ **2**, C₅H₁₂ **3**, C₆H₁₄ **5**, C₇H₁₆ 9. C₁–C₃ have one each.\n" +
        "- **Carbon types**: primary (1°) bonded to one C, secondary (2°) to two, tertiary (3°) to three, quaternary (4°) to four.\n" +
        "- **Isobutane** (CH₃)₃CH: **one 3°** carbon. **Isopentane** (CH₃)₂CHCH₂CH₃: **one 2°** carbon.\n" +
        "- **(CH₃)₄C** is neopentane; IUPAC name **2,2-dimethylpropane**.",
      table: {
        columns: ["Isomers", "Alkane", "Carbon moles in n mol"],
        rows: [
          { cells: ["2", "**C₄H₁₀**", "4n"], pyqExampleId: "0222c90e-e03a-49a3-aea4-f1d7af061bf5" },
          { cells: ["3", "**C₅H₁₂**", "**5n**"], pyqExampleId: "966d8333-7db2-4f16-bd01-5b505483cbb5" },
          { cells: ["5", "**C₆H₁₄**", "**6n**"], pyqExampleId: "b4cb8a88-45b5-4198-96f9-8921806c50a8" },
        ],
      },
      selfCheckExample: {
        prompt: "How many moles of secondary carbon are in n mol of isopentane?",
        steps: ["(CH₃)₂CH–CH₂–CH₃: the CH₂ is bonded to two carbons.", "The CH is bonded to three — tertiary."],
        answer: "n",
      },
      practiceSet: [
        { prompt: "Moles of tertiary carbon in one molecule's worth of isobutane?", answer: "One" },
        { prompt: "IUPAC name of (CH₃)₄C?", answer: "2,2-Dimethylpropane" },
        { prompt: "An alkane shows three structural isomers. Its formula?", answer: "C₅H₁₂" },
      ],
      pyqExampleId: "885cc58e-fe83-4758-9d0d-869cc0b97580",
      traps: [
        {
          title: "Neopentane as the IUPAC name",
          body: "Neopentane is the common name, and it is offered. The IUPAC name of (CH₃)₄C is 2,2-dimethylpropane.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetalkane-physical-properties",
      name: "Boiling Points and Uses",
      intuition:
        "Alkanes hold together only by dispersion forces, which grow with surface area. A longer chain has more surface, so it boils higher; branching makes the molecule compact, so for the same formula the straight chain boils highest.",
      definition:
        "- **Boiling point rises with chain length**: n-pentane > n-butane.\n" +
        "- **Isomers: branching lowers bp**: n-hexane > 2-methylpentane > 3-methylpentane > 2,2-dimethylbutane.\n" +
        "- **Uses by chain length**: C₁–C₄ fuel gases; petrol, kerosene, diesel in between; **more than 35 C — road surfacing** (bitumen).",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Highest bp: 2-methoxypropane, n-butane, 2-methylbutane, n-pentane", "**n-Pentane**"], pyqExampleId: "c54b2f5c-17cc-4525-9de8-1117a36dbc2b" },
          { cells: ["Highest bp among the C₆H₁₄ isomers", "**n-Hexane**"], pyqExampleId: "93cdf258-28b7-4f1e-80d5-ad2d4c3ed9fb" },
          { cells: ["Alkanes used for road surfacing", "**More than 35 C atoms**"], pyqExampleId: "fe39a114-50dc-4099-a233-603cc9026920" },
        ],
      },
      selfCheckExample: {
        prompt: "Which boils highest: n-hexane, 2-methylpentane, 3-methylpentane, 2,2-dimethylbutane?",
        steps: ["Same formula, so compare branching: the unbranched chain has the most contact."],
        answer: "n-Hexane",
      },
      pyqExampleId: "93cdf258-28b7-4f1e-80d5-ad2d4c3ed9fb",
    },
  ],
  related: [
    { label: "Preparing alkanes", href: `${BASE}/cetalkane-preparation` },
  ],
};
