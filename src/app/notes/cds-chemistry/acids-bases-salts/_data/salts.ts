import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_AB_SALTS_NOTE: SubtopicNote = {
  subtopicName: "Common Salts and Carbonates",
  title: "Common Salts and Carbonates",
  oneLineDefinition:
    "The trade names and formulas of everyday salts, how many water molecules their crystals carry, and the carbonates behind marble, pearl and the fire extinguisher.",
  whyItMatters:
    "Ten CDS questions. Four are match-the-list or spot-the-wrong-pair on trade names and formulas, so one table answers them all. The rest ask about calcium carbonate, baking soda and water of crystallisation.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdschab-named-salts",
      name: "Trade names and formulas of common salts",
      intuition:
        "CDS loves to list four trade names against four formulas. The trick is to know each name's formula exactly, including the water it carries, because the wrong options swap one or two pairs.",
      definition:
        "The names to know:\n" +
        "- **Baking soda / cooking soda**: sodium hydrogen carbonate, **NaHCO₃**.\n" +
        "- **Washing soda**: **Na₂CO₃·10H₂O**. **Soda ash** is anhydrous Na₂CO₃.\n" +
        "- **Bleaching powder**: calcium oxychloride, **CaOCl₂**.\n" +
        "- **Plaster of Paris**: **CaSO₄·½H₂O**, also written **2CaSO₄·H₂O**. Mixed with water it sets hard into gypsum, which is why it holds **fractured bones** in place.\n" +
        "- **Gypsum**: CaSO₄·2H₂O. **Slaked lime**: Ca(OH)₂. **Quicklime**: CaO.\n" +
        "- **Baking powder** is baking soda mixed with a mild acid such as tartaric acid.",
      table: {
        columns: ["Trade name", "Chemical name", "Formula"],
        rows: [
          {
            cells: ["Baking soda (cooking soda)", "Sodium hydrogen carbonate", "NaHCO₃"],
            noteAmber: "CDS 2026 (II): cooking soda is NaHCO₃, not Na₂CO₃.",
            pyqExampleId: "f914e91c-4965-4579-a58d-ac6b87b717d1",
          },
          { cells: ["Washing soda", "Sodium carbonate decahydrate", "Na₂CO₃·10H₂O"] },
          { cells: ["Soda ash", "Sodium carbonate (anhydrous)", "Na₂CO₃"] },
          { cells: ["Bleaching powder", "Calcium oxychloride", "CaOCl₂"] },
          {
            cells: ["Plaster of Paris", "Calcium sulphate hemihydrate", "CaSO₄·½H₂O (2CaSO₄·H₂O)"],
            noteAmber: "CDS 2017 (II): its paste holds a fractured bone in place.",
            pyqExampleId: "f05b45e5-e029-4638-8e40-3b7de73072ec",
          },
          { cells: ["Gypsum", "Calcium sulphate dihydrate", "CaSO₄·2H₂O"] },
          { cells: ["Slaked lime", "Calcium hydroxide", "Ca(OH)₂"] },
          { cells: ["Quicklime", "Calcium oxide", "CaO"] },
        ],
      },
      pyqExampleId: "6aec4792-432f-45fb-b684-274d02c3c434",
      selfCheckExample: {
        prompt: "Which pair is wrongly matched? (a) Quicklime : CaO (b) Gypsum : CaSO₄·2H₂O (c) Washing soda : NaHCO₃ (d) Slaked lime : Ca(OH)₂",
        steps: [
          "Quicklime is CaO, gypsum is CaSO₄·2H₂O, slaked lime is Ca(OH)₂: all correct.",
          "Washing soda is Na₂CO₃·10H₂O. NaHCO₃ is baking soda.",
        ],
        answer: "(c): washing soda is Na₂CO₃·10H₂O, not NaHCO₃.",
      },
      practiceSet: [
        { prompt: "What is the formula of bleaching powder?", answer: "CaOCl₂" },
        { prompt: "What is the chemical name of washing soda?", answer: "Sodium carbonate decahydrate, Na₂CO₃·10H₂O" },
        { prompt: "Which white paste is used to hold a fractured bone in place?", answer: "Plaster of Paris" },
        { prompt: "What is the chemical name of slaked lime?", answer: "Calcium hydroxide, Ca(OH)₂" },
      ],
      traps: [
        {
          title: "Baking soda and washing soda are different salts",
          body: "**Baking soda** is NaHCO₃ (a hydrogen carbonate). **Washing soda** is Na₂CO₃·10H₂O (a carbonate with ten waters). Most wrong options swap these two.",
        },
        {
          title: "Plaster of Paris has half a water, not two",
          body: "Plaster of Paris is CaSO₄·½H₂O. Gypsum, which it turns into when it sets, is CaSO₄·2H₂O.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-crystallisation",
      name: "Water of crystallisation",
      intuition:
        "Some salts lock a fixed number of water molecules into their crystals. The water is part of the formula, and heating drives it off. Blue copper sulphate turns white when it loses its water.",
      definition:
        "What it is:\n" +
        "- **Water of crystallisation** is the fixed number of water molecules in one formula unit of a crystalline salt.\n" +
        "- **Copper sulphate** crystals (blue vitriol) are **CuSO₄·5H₂O**: five waters. Heated, they lose them and turn **white**; adding water turns them blue again.\n" +
        "- Washing soda carries 10, gypsum 2, plaster of Paris ½.",
      table: {
        columns: ["Salt", "Formula", "Waters per formula unit"],
        rows: [
          {
            cells: ["Copper sulphate (blue vitriol)", "CuSO₄·5H₂O", "5"],
            noteAmber: "CDS 2020 (I): copper sulphate crystals carry five water molecules.",
            pyqExampleId: "fc396420-b234-4b29-82e0-90b9d0fa2508",
          },
          { cells: ["Washing soda", "Na₂CO₃·10H₂O", "10"] },
          { cells: ["Gypsum", "CaSO₄·2H₂O", "2"] },
          { cells: ["Plaster of Paris", "CaSO₄·½H₂O", "½"] },
        ],
      },
      pyqExampleId: "fc396420-b234-4b29-82e0-90b9d0fa2508",
      practiceSet: [
        { prompt: "How many water molecules does one unit of washing soda carry?", answer: "10" },
        { prompt: "What colour does blue copper sulphate become when heated strongly?", answer: "White (it loses its water)" },
        { prompt: "How many water molecules does gypsum carry?", answer: "2" },
      ],
      traps: [
        {
          title: "Blue vitriol has five waters",
          body: "Copper sulphate crystals are CuSO₄·**5**H₂O. Options of 2, 4 or 6 are distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdschab-carbonates",
      name: "Calcium carbonate and hydrogen carbonates",
      intuition:
        "Calcium carbonate is everywhere: marble, chalk, limestone, eggshell and pearl are all CaCO₃. Hydrogen carbonates are the other half of this page: baking soda puts out fires and raises cakes because it gives off carbon dioxide.",
      definition:
        "The facts:\n" +
        "- **Marble, chalk and limestone** are all forms of **calcium carbonate**, CaCO₃.\n" +
        "- A **pearl** is mainly **calcium carbonate** (nacre), laid down by a mollusc.\n" +
        "- A **soda-acid fire extinguisher** holds **sodium hydrogen carbonate** solution and a bottle of sulphuric acid. Mixing them gives **CO₂**, which smothers the fire.\n" +
        "- Heating baking soda gives CO₂: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂. That gas makes cakes rise.\n" +
        "- **Lithium** forms **no solid hydrogen carbonate**; LiHCO₃ exists only in solution. Sodium, potassium and caesium all give solid ones.",
      table: {
        columns: ["Material or use", "Compound"],
        rows: [
          {
            cells: ["Marble, chalk, limestone", "Calcium carbonate, CaCO₃"],
            noteAmber: "CDS 2026 (II): all three are forms of calcium carbonate.",
            pyqExampleId: "9d63a438-ec52-4908-837d-69bf7f040daf",
          },
          {
            cells: ["Pearl", "Calcium carbonate (nacre)"],
            pyqExampleId: "db919cd9-c60f-46ee-bc6b-d38f3eb16713",
          },
          {
            cells: ["Soda-acid fire extinguisher", "Sodium hydrogen carbonate with sulphuric acid"],
            pyqExampleId: "7b62fa3b-0818-40ad-9c61-652a8ecd9eee",
          },
          {
            cells: ["No solid hydrogen carbonate", "Lithium"],
            noteAmber: "CDS 2016 (II), HARD: LiHCO₃ exists only in solution.",
            pyqExampleId: "b4153ae7-0ca0-4150-a973-1c33bfc11725",
          },
        ],
      },
      pyqExampleId: "9d63a438-ec52-4908-837d-69bf7f040daf",
      selfCheckExample: {
        prompt: "Why does a soda-acid fire extinguisher put out a fire when its acid mixes with the baking-soda solution?",
        steps: [
          "Sulphuric acid reacts with sodium hydrogen carbonate.",
          "The reaction gives carbon dioxide gas.",
          "CO₂ is heavier than air and does not support burning, so it cuts the fire off from oxygen.",
        ],
        answer: "The reaction releases carbon dioxide, which blankets the fire and keeps oxygen out.",
      },
      practiceSet: [
        { prompt: "What is the main constituent of pearl?", answer: "Calcium carbonate" },
        { prompt: "Which gas does baking soda give off when heated?", answer: "Carbon dioxide" },
        { prompt: "Which alkali metal forms no solid hydrogen carbonate?", answer: "Lithium" },
        { prompt: "Name two natural forms of calcium carbonate.", answer: "Any two of marble, chalk, limestone" },
      ],
      traps: [
        {
          title: "The extinguisher uses the hydrogen carbonate",
          body: "A soda-acid extinguisher uses **sodium hydrogen carbonate** (NaHCO₃), not sodium carbonate or sodium chloride.",
        },
      ],
    },
  ],
};
