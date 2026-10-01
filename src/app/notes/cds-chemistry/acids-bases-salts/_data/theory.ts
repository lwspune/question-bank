import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AB_THEORY_NOTE: SubtopicNote = {
  subtopicName: "Acids, Bases and Oxides",
  title: "Acids, Bases and Oxides",
  oneLineDefinition:
    "The three definitions of an acid and a base, what makes a base an alkali, how acids behave in water, and which oxides are acidic, basic or amphoteric.",
  whyItMatters:
    "Twelve CDS questions, almost one a year since 2017. Most are statement checks: is water an acid or a base here, is every base an alkali, which oxide reacts with both acids and bases. " +
    "Two harder ones need the Brønsted and Lewis definitions, which go beyond the Class 10 book.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschab-definitions",
      name: "Three definitions of an acid and a base",
      intuition:
        "Each definition widens the one before it. Arrhenius talks about ions in water. Brønsted–Lowry talks about who gives a proton (H⁺) to whom. Lewis talks about who gives a pair of electrons. A substance that is not an acid in one sense can be one in the next.",
      definition:
        "The three definitions:\n" +
        "- **Arrhenius:** an acid gives **H⁺ ions** in water; a base gives **OH⁻ ions** in water.\n" +
        "- **Brønsted–Lowry:** an acid is a **proton donor**; a base is a **proton acceptor**. Water can be either, depending on its partner.\n" +
        "- **Lewis:** an acid is an **electron-pair acceptor**; a base is an **electron-pair donor**.\n" +
        "- A proton-loving (**protophilic**) substance is a base. Hydrophilic and hydrophobic describe water, not protons.",
      table: {
        columns: ["Definition", "Acid", "Base", "Example"],
        rows: [
          { cells: ["Arrhenius", "Gives H⁺ in water", "Gives OH⁻ in water", "HCl → H⁺ + Cl⁻; NaOH → Na⁺ + OH⁻"] },
          {
            cells: ["Brønsted–Lowry", "Proton donor", "Proton acceptor", "HSO₄⁻ + H₂O → H₃O⁺ + SO₄²⁻: water takes the proton, so water is the base"],
            noteAmber: "CDS 2017 (II): in this reaction water acts as a base.",
            pyqExampleId: "759b0507-ad85-4cba-8b15-4241684fcb33",
          },
          {
            cells: ["Lewis", "Electron-pair acceptor", "Electron-pair donor", "Acids: BF₃, AlCl₃, Co³⁺, Mg²⁺. Bases: NH₃, H₂O, OH⁻, F⁻"],
            noteAmber: "CDS 2025 (I): AlCl₃, Co³⁺ and BF₃ are all Lewis acids. Anything with a lone pair to give, such as NH₃ or OH⁻, is a Lewis base.",
            pyqExampleId: "7fa45f9f-c40e-49c4-a06b-83d08fe850d5",
          },
        ],
        caption: "Electron-poor molecules (BF₃, AlCl₃) and small, highly charged metal ions are the usual Lewis acids.",
      },
      pyqExampleId: "759b0507-ad85-4cba-8b15-4241684fcb33",
      selfCheckExample: {
        prompt: "In the reaction NH₃ + H₂O → NH₄⁺ + OH⁻, which species acts as the Brønsted–Lowry acid?",
        steps: [
          "Find the proton. NH₃ becomes NH₄⁺, so ammonia gained a proton.",
          "Water became OH⁻, so water lost a proton.",
          "The proton donor is the acid.",
        ],
        answer: "Water is the acid here; ammonia is the base.",
      },
      practiceSet: [
        { prompt: "A substance that donates a proton is called what, on the Brønsted–Lowry definition?", answer: "An acid" },
        { prompt: "Is BF₃ a Lewis acid or a Lewis base?", answer: "A Lewis acid", method: "it accepts an electron pair" },
        { prompt: "Is the hydroxide ion OH⁻ a Lewis acid or a Lewis base?", answer: "A Lewis base", method: "it has lone pairs to donate" },
        { prompt: "On the Arrhenius definition, what does a base give in water?", answer: "OH⁻ ions" },
      ],
      traps: [
        {
          title: "Water is not always neutral in a reaction",
          body: "Water is amphiprotic: it is a **base** when it takes a proton from HSO₄⁻ or HCl, and an **acid** when it gives a proton to NH₃. Read which way the proton moves.",
        },
        {
          title: "A Lewis acid ACCEPTS electrons",
          body: "Lewis acids are electron-pair **acceptors** (BF₃, AlCl₃, metal ions). A set containing NH₃, H₂O, OH⁻ or F⁻ is not 'all Lewis acids', because each of those has a lone pair to donate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-alkalis",
      name: "Bases, alkalis and acids in water",
      intuition:
        "A base is anything that neutralises an acid. An alkali is a base that also dissolves in water. So every alkali is a base, but many bases (copper oxide, iron hydroxide) are not alkalis. Acids and alkalis in water are full of ions, which is why they conduct and why mixing them with water gives out heat.",
      definition:
        "What the bank checks:\n" +
        "- **Alkali** = a **water-soluble base**: NaOH, KOH, Ca(OH)₂, NH₄OH. Insoluble bases such as CuO and Cu(OH)₂ are bases but **not** alkalis.\n" +
        "- Alkalis are **bitter**, **soapy** to touch and **corrosive**, and turn red litmus blue.\n" +
        "- Dissolving an alkali such as NaOH in water is **exothermic** (gives out heat).\n" +
        "- An acid solution **conducts electricity** because the acid ionises into **H⁺ (H₃O⁺) ions**.\n" +
        "- **Diluting** an acid spreads the same ions through more water, so the H₃O⁺ concentration **falls**.\n" +
        "- Always add **acid to water**, slowly, while stirring. Water added to concentrated acid can boil and splash.",
      table: {
        columns: ["Statement", "True or false", "Why"],
        rows: [
          {
            cells: ["All bases are alkalis", "False", "Only the bases that dissolve in water are alkalis"],
            pyqExampleId: "e8facf84-52d8-4061-94ef-a264a28a706a",
          },
          { cells: ["All alkalis dissolve in water", "True", "Dissolving is what makes a base an alkali"] },
          { cells: ["Alkalis are soapy, bitter and corrosive", "True", "The standard properties of an alkali"] },
          {
            cells: ["Adding water to an alkali gives out heat", "True", "Dissolving NaOH or KOH is exothermic"],
            pyqExampleId: "97fc6283-4bf8-4320-bb71-079949065c16",
          },
          {
            cells: ["An acid solution conducts because it holds H⁺ ions", "True", "The ions carry the charge"],
            pyqExampleId: "61ef97db-f5c4-4253-9219-7dd44b3f1d62",
          },
          {
            cells: ["Diluting an acid raises its H₃O⁺ concentration", "False", "The ions spread through more volume, so it falls"],
            pyqExampleId: "439b663e-8fe8-40cf-a384-6b1d6f6dad22",
          },
          { cells: ["To dilute, add water to the concentrated acid", "False", "Add the acid to water, slowly"] },
        ],
      },
      pyqExampleId: "97fc6283-4bf8-4320-bb71-079949065c16",
      selfCheckExample: {
        prompt: "Copper(II) oxide neutralises dilute hydrochloric acid but does not dissolve in water. Is it a base, an alkali, or both?",
        steps: [
          "It neutralises an acid, so it is a base.",
          "An alkali must also dissolve in water. Copper(II) oxide does not.",
        ],
        answer: "A base, but not an alkali.",
      },
      practiceSet: [
        { prompt: "What name is given to a base that dissolves in water?", answer: "An alkali" },
        { prompt: "Does the H₃O⁺ concentration rise or fall when an acid is diluted?", answer: "It falls" },
        { prompt: "When diluting concentrated sulphuric acid, what is added to what?", answer: "The acid is added slowly to water" },
        { prompt: "Why does dilute hydrochloric acid conduct electricity?", answer: "It contains free H⁺ (H₃O⁺) and Cl⁻ ions" },
      ],
      traps: [
        {
          title: "Every alkali is a base, not the reverse",
          body: "'All bases are alkalis' is **false**. Copper oxide, copper hydroxide and iron hydroxide are bases that do not dissolve in water, so they are not alkalis.",
        },
        {
          title: "Dilution lowers concentration",
          body: "Adding water does not create H₃O⁺ ions; it spreads them out. The number of ions per unit volume **decreases** on dilution.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-oxides",
      name: "Acidic, basic, amphoteric and neutral oxides",
      intuition:
        "Most metal oxides are basic and most non-metal oxides are acidic. A few oxides, zinc oxide and aluminium oxide above all, sit in the middle and react with both acids and bases. A handful, like carbon monoxide, react with neither.",
      definition:
        "The four kinds of oxide:\n" +
        "- **Basic oxides** (metals): Na₂O, MgO, CaO, CuO. They react with acids to give a **salt and water**.\n" +
        "- **Acidic oxides** (non-metals): CO₂, SO₂, P₄O₁₀. In water they form acids, e.g. CO₂ + H₂O → H₂CO₃ (carbonic acid).\n" +
        "- **Amphoteric oxides** react with **both** acids and bases: **ZnO**, **Al₂O₃** (also PbO, SnO).\n" +
        "- **Neutral oxides** react with neither: CO, NO, N₂O.\n" +
        "- Acid + basic oxide → salt + water. CuO + 2HCl → **CuCl₂** (copper(II) chloride, blue-green) + H₂O.",
      table: {
        columns: ["Kind of oxide", "Examples", "Reacts with"],
        rows: [
          {
            cells: ["Basic", "Na₂O, MgO, CaO, CuO", "Acids, giving a salt and water"],
            noteAmber: "CDS 2026 (II): CuO in hydrochloric acid turns blue-green because copper(II) chloride forms.",
            pyqExampleId: "d7f69f79-c514-46b0-80d8-e03c9a8f9862",
          },
          {
            cells: ["Acidic", "CO₂, SO₂, P₄O₁₀", "Bases; in water it gives an acid"],
            noteAmber: "CDS 2018 (I): CO₂ is the gas that dissolves in water to give an acidic solution.",
            pyqExampleId: "b4e93cf6-e5e8-490d-98f7-63534445cb8f",
          },
          {
            cells: ["Amphoteric", "ZnO, Al₂O₃", "Both acids and bases"],
            noteAmber: "Both have been asked: ZnO (CDS 2020 II) and Al₂O₃ (CDS 2024 I).",
            pyqExampleId: "3555ec49-6d24-469b-a898-1d13d047a533",
          },
          { cells: ["Neutral", "CO, NO, N₂O", "Neither acids nor bases"] },
        ],
      },
      pyqExampleId: "3555ec49-6d24-469b-a898-1d13d047a533",
      selfCheckExample: {
        prompt: "Black copper(II) oxide is warmed with dilute sulphuric acid. What forms, and what colour is the solution?",
        steps: [
          "Copper(II) oxide is a basic oxide, so with an acid it gives a salt and water.",
          "CuO + H₂SO₄ → CuSO₄ + H₂O.",
          "Copper(II) sulphate solution is blue.",
        ],
        answer: "Copper(II) sulphate and water; the solution turns blue.",
      },
      practiceSet: [
        { prompt: "Is the oxide of a non-metal usually acidic or basic?", answer: "Acidic" },
        { prompt: "Is phosphorus pentoxide, P₄O₁₀, acidic or basic?", answer: "Acidic" },
        { prompt: "Is magnesium oxide acidic, basic or amphoteric?", answer: "Basic" },
        { prompt: "Name a neutral oxide of carbon.", answer: "Carbon monoxide (CO)" },
      ],
      traps: [
        {
          title: "Non-metal oxides are acidic",
          body: "Non-metals give **acidic** oxides (CO₂, SO₂). Metals give **basic** oxides. A statement that non-metals dissolved in water 'produce basic oxides' or 'provide hydroxides' has it backwards.",
        },
        {
          title: "Amphoteric is not the same as neutral",
          body: "ZnO and Al₂O₃ react with acids **and** with bases. CO and NO react with **neither**. MgO, CaO and Na₂O are purely basic, and P₄O₁₀ is purely acidic.",
        },
      ],
    },
  ],
};
