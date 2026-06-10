import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONAL_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Functional Groups and Common Organic Compounds",
  title: "Functional Groups and Common Organic Compounds",
  oneLineDefinition:
    "A functional group is the reactive part of an organic molecule that decides its family and properties — alcohols, acids, esters — plus a handful of named compounds the bank tests on sight.",
  whyItMatters:
    "Nine PYQs of pure recall: which group gives a fruity smell (ester), which acid is in a nettle sting (formic), why carbon monoxide is poisonous, and a few common formulas. " +
    "Learn the group→family→property table and the named facts; there is nothing to derive.",
  concepts: [
    // functional group families (reference)
    {
      kind: "reference" as const,
      slug: "functional-group-families",
      name: "Functional groups and their families",
      intuition:
        "The functional group is the small cluster of atoms that gives an organic molecule its character. Swap the group and you change the family — an -OH makes an alcohol, a -COOH makes an acid, a -COO- makes a sweet-smelling ester.",
      definition:
        "The families the bank tests, with their group and a giveaway property:\n" +
        "- **Alcohol** — group **-OH** — e.g. ethanol; **neutral to litmus** (does not turn litmus red).\n" +
        "- **Carboxylic acid** — group **-COOH** — e.g. acetic acid (ethanoic), formic acid (methanoic); **sour, turns blue litmus red**.\n" +
        "- **Ester** — group **-COO-** — e.g. ethyl acetate; **sweet, fruity smell** (used in flavourings).\n" +
        "- **Aldehyde / ketone** — groups **-CHO / C=O** — e.g. formaldehyde, acetone.",
      table: {
        columns: ["Family", "Functional group", "Example", "Giveaway property"],
        rows: [
          {
            cells: ["Alcohol", "-OH", "Ethanol", "Neutral to litmus"],
            noteAmber: "Ethanol does NOT turn litmus red — alcohols are neutral, unlike acids.",
          },
          { cells: ["Carboxylic acid", "-COOH", "Acetic acid; formic (methanoic) acid", "Sour; turns blue litmus red"] },
          { cells: ["Ester", "-COO-", "Ethyl acetate", "Sweet, fruity smell"] },
          { cells: ["Aldehyde / Ketone", "-CHO / C=O", "Formaldehyde / Acetone", "Reactive carbonyl group"] },
        ],
      },
      pyqExampleId: "9a13f864-70d3-46ff-ae6a-132f215a1a37", // ethyl acetate sweet/fruity
      practiceSet: [
        { prompt: "Which family of compounds has a sweet, fruity smell?", answer: "Esters" },
        { prompt: "What is the functional group of an alcohol?", answer: "-OH" },
        { prompt: "What is the action of litmus on ethanol?", answer: "Neutral — no colour change", method: "alcohols are neutral, not acidic" },
        { prompt: "Which acid is present in a nettle sting?", answer: "Methanoic (formic) acid" },
        { prompt: "Is acetic acid organic or inorganic?", answer: "Organic", method: "a carboxylic acid, -COOH" },
      ],
      traps: [
        {
          title: "Alcohol is neutral, acid turns litmus red",
          body:
            "Ethanol (an alcohol) is **neutral to litmus**. Only the -COOH acids (acetic, formic) turn blue litmus red. Options that say ethanol turns litmus red are wrong.",
        },
      ],
    },

    // carbon monoxide + misc named facts (reference)
    {
      kind: "reference" as const,
      slug: "carbon-monoxide-and-named-facts",
      name: "Carbon monoxide and other named facts",
      intuition:
        "A cluster of one-off recall facts the bank repeats: why carbon monoxide kills, where litmus comes from, and that carbon tops the periodic table for sheer number of compounds.",
      definition:
        "The recurring named facts:\n" +
        "- **Carbon monoxide (CO)** is poisonous because it binds **haemoglobin** (forming carboxyhaemoglobin), blocking oxygen transport. CO is also a **neutral** oxide.\n" +
        "- **Litmus** (the acid–base indicator) is extracted from **lichens**.\n" +
        "- **Carbon** forms the **largest number of compounds** of any element (catenation + tetra-valency).",
      table: {
        columns: ["Fact", "Detail"],
        rows: [
          {
            cells: ["CO is poisonous because…", "It binds haemoglobin (carboxyhaemoglobin), blocking O₂ transport"],
            noteAmber: "CO is dangerous because of its affinity for haemoglobin — not because it is acidic. CO is a neutral oxide.",
          },
          { cells: ["Litmus is derived from…", "Lichens"] },
          { cells: ["Element forming the most compounds", "Carbon"] },
        ],
      },
      pyqExampleId: "1ebbf64b-55ec-4848-952f-5bbb92406084", // CO poisonous — haemoglobin
      practiceSet: [
        { prompt: "Why is carbon monoxide poisonous?", answer: "It forms a complex with haemoglobin, blocking oxygen transport" },
        { prompt: "Litmus is derived from which organism?", answer: "Lichens" },
        { prompt: "Which element forms the highest number of compounds?", answer: "Carbon" },
      ],
    },

    // common formulas + their uses (reference) — the subtopic-4 compound facts
    {
      kind: "reference" as const,
      slug: "common-formulas-and-uses",
      name: "Common compounds — formula and use",
      intuition:
        "A short formula-recall block: baking soda's decomposition is why cakes rise, and gypsum's formula carries its two waters of crystallization.",
      definition:
        "Two high-frequency formulas:\n" +
        "- **Baking soda** = **NaHCO₃** (sodium bicarbonate). On heating above ~70°C it decomposes, releasing **CO₂** gas that makes dough rise: 2NaHCO₃ → Na₂CO₃ + H₂O + CO₂.\n" +
        "- **Gypsum** = **CaSO₄·2H₂O** (calcium sulphate dihydrate).",
      table: {
        columns: ["Common name", "Formula", "Key fact / use"],
        rows: [
          {
            cells: ["Baking soda", "NaHCO₃", "Decomposes on heating → CO₂ makes cakes rise"],
            noteAmber: "It is the released CO₂ — not water vapour — that raises the dough.",
          },
          { cells: ["Gypsum", "CaSO₄·2H₂O", "Two waters of crystallization; used to make plaster of Paris"] },
        ],
      },
      pyqExampleId: "3e5baa7b-88a6-4064-8c9f-328d8c7e9c30", // NaHCO3 decomposition → CO2
      practiceSet: [
        { prompt: "Chemical formula of baking soda?", answer: "NaHCO₃" },
        { prompt: "Which gas released by baking soda makes cakes rise?", answer: "Carbon dioxide (CO₂)" },
        { prompt: "Chemical formula of gypsum?", answer: "CaSO₄·2H₂O" },
      ],
    },
  ],
};
