import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MN_REACTIVITY_NOTE: SubtopicNote = {
  subtopicName: "The Reactivity Series",
  title: "The Reactivity Series",
  oneLineDefinition:
    "The order of metals by reactivity, what it predicts about acids, oxygen and displacement, and why the most reactive metals are stored under oil.",
  whyItMatters:
    "Eight CDS questions, the largest page in the chapter. The same order, Mg > Al > Zn > Fe, was asked twice word for word (2021 and 2024), and storing sodium under kerosene was asked twice.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschmn-series",
      name: "The reactivity series and reactions with acids",
      intuition:
        "List the metals from most to least reactive and most questions become a lookup. A metal above hydrogen pushes hydrogen out of a dilute acid; a metal below it cannot. The metals at the bottom, silver and gold, barely react with anything.",
      definition:
        "The series, most reactive first:\n" +
        "- **K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Hg > Ag > Au**.\n" +
        "- A metal **above hydrogen** reacts with dilute HCl or H₂SO₄ to give **hydrogen gas**: Mg + 2HCl → MgCl₂ + H₂.\n" +
        "- The higher the metal, the faster: with dilute HCl, **Mg > Al > Zn > Fe**.\n" +
        "- **Nitric acid** is an oxidising acid: with most metals it gives oxides of nitrogen, not hydrogen.\n" +
        "- A **carbonate** with an acid gives **carbon dioxide**, not hydrogen.\n" +
        "- **Silver** and gold do not react with oxygen in air; silver tarnishes by forming a sulphide, not an oxide.",
      table: {
        columns: ["Metal", "Reaction with dilute HCl", "Reaction with oxygen"],
        rows: [
          { cells: ["K, Na, Ca", "Violent", "Burn readily"] },
          {
            cells: ["Mg", "Fast; gives H₂", "Burns with a white flame"],
            noteAmber: "CDS 2018 (II): magnesium with hydrochloric acid is the pair that gives hydrogen.",
            pyqExampleId: "3491d7db-78cc-4e09-8f9d-031dde9fdaef",
          },
          { cells: ["Al, Zn, Fe", "Slower in that order; gives H₂", "Form oxides"] },
          { cells: ["Pb", "Very slow", "Forms an oxide"] },
          { cells: ["Cu", "No reaction (below H)", "Forms a black oxide when heated"] },
          {
            cells: ["Ag, Au", "No reaction", "Do not form an oxide"],
            noteAmber: "CDS 2020 (II): silver is the metal that does not form an oxide with oxygen.",
            pyqExampleId: "6ca38c46-89eb-401e-8a6a-c5984d36b72b",
          },
        ],
        caption: "Order with dilute HCl, asked in CDS 2021 (II) and 2024 (I): Mg > Al > Zn > Fe.",
      },
      pyqExampleId: "d70b8cdf-75cd-41ee-b449-eb27af4bb89c",
      selfCheckExample: {
        prompt: "Which of these gives hydrogen with dilute sulphuric acid: copper, zinc, silver, gold?",
        steps: [
          "Only a metal above hydrogen in the series displaces it from an acid.",
          "Copper, silver and gold are below hydrogen. Zinc is above it.",
        ],
        answer: "Zinc.",
      },
      practiceSet: [
        { prompt: "Which is more reactive, aluminium or iron?", answer: "Aluminium" },
        { prompt: "Does copper give hydrogen with dilute HCl?", answer: "No — copper is below hydrogen" },
        { prompt: "Which gas does a carbonate give with dilute acid?", answer: "Carbon dioxide" },
        { prompt: "Put K, Cu and Zn in decreasing order of reactivity.", answer: "K > Zn > Cu" },
      ],
      traps: [
        {
          title: "Nitric acid rarely gives hydrogen",
          body: "Nitric acid is an **oxidising** acid. Zinc or copper with nitric acid gives oxides of nitrogen, not hydrogen. Use HCl or dilute H₂SO₄ for the hydrogen test.",
        },
        {
          title: "Zinc sits above iron",
          body: "The order is Mg > **Zn** > Fe. A statement giving 'Mg > Fe > Zn' is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschmn-displacement",
      name: "Displacement: a more reactive metal pushes out a less reactive one",
      intuition:
        "A metal can take the place of another metal in its salt only if it is higher in the reactivity series. Iron in copper sulphate turns copper-coated because iron is above copper. Copper in a lead salt does nothing.",
      definition:
        "The rule:\n" +
        "- **A + BX → AX + B** happens only if **A is more reactive than B**.\n" +
        "- Fe, Zn and Mg all displace copper from copper sulphate (the blue colour fades).\n" +
        "- Copper is **below** lead, so copper cannot displace lead from its salts.",
      formula: {
        label: "Displacement rule",
        latex: "A + BX \\rightarrow AX + B \\quad \\text{only if } A \\text{ is above } B",
      },
      authoredExample: {
        prompt: "Will a strip of iron react with zinc sulphate solution? Will a strip of zinc react with iron(II) sulphate solution?",
        steps: [
          "Zinc is above iron in the reactivity series.",
          "Iron cannot push the more reactive zinc out of its salt: no reaction.",
          "Zinc can push iron out: Zn + FeSO₄ → ZnSO₄ + Fe.",
        ],
        answer: "Iron in zinc sulphate: no reaction. Zinc in iron(II) sulphate: zinc sulphate and iron form.",
      },
      pyqExampleId: "cccc92d8-f1d2-41bb-8da5-04774f4452b4",
      practiceSet: [
        { prompt: "Will copper displace silver from silver nitrate solution?", answer: "Yes — copper is above silver" },
        { prompt: "Will silver displace copper from copper sulphate?", answer: "No" },
        { prompt: "What happens to the blue colour when iron is placed in copper sulphate?", answer: "It fades, as copper is displaced" },
      ],
      traps: [
        {
          title: "Only the higher metal displaces",
          body: "Copper is **below** lead, so Cu + PbCl₂ → CuCl₂ + Pb does **not** happen. Fe, Zn and Mg are all above copper, so each displaces copper from copper sulphate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschmn-storage",
      name: "Why reactive metals are stored under oil",
      intuition:
        "Sodium and potassium react so violently with the oxygen and moisture in air that they can catch fire. Keeping them under kerosene shuts the air out. Lithium is the odd one: it is lighter than oil, so it floats.",
      definition:
        "Storage rules:\n" +
        "- **Sodium** and **potassium** (and rubidium) are stored **under kerosene**, because they react **violently with moisture and oxygen** in air.\n" +
        "- **Lithium** is **less dense than kerosene**, so it floats and stays exposed. It is kept coated in **paraffin wax** or petroleum jelly instead.\n" +
        "- **White phosphorus** is stored **under water**, because it catches fire in air.",
      table: {
        columns: ["Substance", "Stored in", "Why"],
        rows: [
          {
            cells: ["Sodium, potassium", "Kerosene", "React violently with moisture and air"],
            noteAmber: "Asked in CDS 2021 (I) and 2026 (II).",
            pyqExampleId: "d7d398e1-6d3a-4695-87a6-ab64bf05e3a4",
          },
          {
            cells: ["Lithium", "Paraffin wax", "Floats on oil, so oil cannot cover it"],
            noteAmber: "CDS 2024 (II), HARD: lithium is the one not stored under oil.",
            pyqExampleId: "9a3a2a48-f56e-4847-ad56-432cf113b9db",
          },
          { cells: ["White phosphorus", "Water", "Catches fire in air"] },
        ],
      },
      pyqExampleId: "3f3cd0a0-1f50-42d1-b0f6-7189969336fb",
      practiceSet: [
        { prompt: "In what is sodium metal stored?", answer: "Kerosene" },
        { prompt: "Why is lithium not stored under oil?", answer: "It is less dense than oil and floats" },
        { prompt: "In what is white phosphorus stored?", answer: "Water" },
      ],
      traps: [
        {
          title: "Sodium is under kerosene because of moisture, not evaporation",
          body: "Sodium does not evaporate. It is kept under kerosene because it **reacts violently with moisture** and oxygen in the air.",
        },
      ],
    },
  ],
};
