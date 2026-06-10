import type { SubtopicNote } from "@/app/notes/_types";

export const WATER_OF_CRYSTALLIZATION_NOTE: SubtopicNote = {
  subtopicName: "Water of Crystallization",
  title: "Water of Crystallization",
  oneLineDefinition:
    "The fixed number of water molecules locked into a salt crystal's structure, written after a dot in the formula — and the salts that have none.",
  whyItMatters:
    "Three PYQs, all single-fact recall: the water count of a named hydrate, the salt that has no water of crystallization, and why hydrated copper sulphate is blue. " +
    "Memorise the handful of counts and these are free marks.",
  concepts: [
    // water of crystallization counts (reference)
    {
      kind: "reference" as const,
      slug: "hydrate-water-counts",
      name: "Water of crystallization of common salts",
      intuition:
        "Water of crystallization is the fixed number of water molecules built into a crystal, written after a dot (for example CuSO4·5H2O). The bank asks for the count of a specific salt, or which salt has none. Learn the numbers.",
      definition:
        "The hydration numbers the bank tests:\n" +
        "- **Blue vitriol** (copper sulphate) = **CuSO4·5H2O** → **5**.\n" +
        "- **Green vitriol** (ferrous sulphate) = **FeSO4·7H2O** → **7**.\n" +
        "- **Washing soda** (sodium carbonate) = **Na2CO3·10H2O** → **10**.\n" +
        "- **Gypsum** (calcium sulphate) = **CaSO4·2H2O** → **2**.\n" +
        "- **Mohr's salt** = **FeSO4·(NH4)2SO4·6H2O** → **6**.\n" +
        "- **Potassium permanganate (KMnO4)** has **NO water of crystallization**.",
      table: {
        columns: ["Salt", "Formula", "Water molecules"],
        rows: [
          { cells: ["Blue vitriol (copper sulphate)", "CuSO4·5H2O", "5"] },
          {
            cells: ["Green vitriol (ferrous sulphate)", "FeSO4·7H2O", "7"],
            noteAmber: "Ferrous sulphate crystal carries 7 water molecules.",
          },
          { cells: ["Washing soda", "Na2CO3·10H2O", "10"] },
          { cells: ["Gypsum", "CaSO4·2H2O", "2"] },
          { cells: ["Mohr's salt", "FeSO4·(NH4)2SO4·6H2O", "6"] },
          {
            cells: ["Potassium permanganate", "KMnO4", "0 (none)"],
            noteAmber: "KMnO4 has NO water of crystallization — the bank's answer for 'which salt has none'.",
          },
        ],
      },
      pyqExampleId: "0b4bd134-b74d-48be-b6b1-e97f85b714b9", // ferrous sulphate = 7
      selfCheckExample: {
        prompt: "Which salt does NOT have water of crystallization: potassium permanganate, blue vitriol, washing soda or Mohr's salt?",
        steps: [
          "Blue vitriol = CuSO4·5H2O (5 waters).",
          "Washing soda = Na2CO3·10H2O (10 waters).",
          "Mohr's salt = FeSO4·(NH4)2SO4·6H2O (6 waters).",
          "Potassium permanganate is KMnO4 — no dot, no water.",
        ],
        answer: "Potassium permanganate (KMnO4) — it has no water of crystallization.",
      },
      practiceSet: [
        { prompt: "How many water molecules are in a ferrous sulphate crystal?", answer: "7" },
        { prompt: "Water of crystallization in copper sulphate (blue vitriol)?", answer: "5" },
        { prompt: "Water of crystallization in washing soda?", answer: "10" },
        { prompt: "Which salt has NO water of crystallization: KMnO4, blue vitriol, washing soda or Mohr's salt?", answer: "Potassium permanganate (KMnO4)" },
        { prompt: "Water of crystallization in Mohr's salt?", answer: "6" },
      ],
      traps: [
        {
          title: "KMnO4 has no water of crystallization",
          body:
            "Blue vitriol (5), washing soda (10) and Mohr's salt (6) are all hydrates. **Potassium permanganate (KMnO4)** is the one with **no** water of crystallization — there is no dot-water term in its formula.",
        },
      ],
    },

    // why hydrated copper sulphate is blue (reference)
    {
      kind: "reference" as const,
      slug: "hydration-colour-change",
      name: "Water of crystallization and colour",
      intuition:
        "The water locked into a crystal can give it its colour. Blue copper sulphate crystals owe their blue to that water; heat it out and the crystal turns white. Add water back and the blue returns. The water of crystallization is the colour.",
      definition:
        "The colour-from-water facts:\n" +
        "- Hydrated copper sulphate **CuSO4·5H2O** is **blue**; the blue colour is due to the **water of crystallization**.\n" +
        "- On careful heating the water is driven off, leaving **anhydrous CuSO4**, which is **white**.\n" +
        "- Adding water back turns it blue again — a standard test for the presence of water.",
      table: {
        columns: ["Form", "Colour", "Cause"],
        rows: [
          {
            cells: ["CuSO4·5H2O (hydrated)", "Blue", "Water of crystallization"],
            noteAmber: "The blue colour of copper sulphate crystals is due to water — heat it out and it turns white.",
          },
          { cells: ["CuSO4 (anhydrous, after heating)", "White", "Water removed"] },
        ],
      },
      pyqExampleId: "17132880-1f2e-4fa4-baaf-6cadfaece02d", // blue colour due to water
      practiceSet: [
        { prompt: "Why are copper sulphate crystals blue?", answer: "Due to their water of crystallization" },
        { prompt: "What colour is copper sulphate after the water is driven off by heating?", answer: "White (anhydrous CuSO4)" },
        { prompt: "What is responsible for the blue colour of CuSO4·5H2O: oxygen, nitrogen, water or hydrogen?", answer: "Water" },
      ],
      traps: [
        {
          title: "Blue copper sulphate owes its colour to water",
          body:
            "The blue of copper sulphate crystals is caused by the **water of crystallization**, not by oxygen, nitrogen or hydrogen. Heating drives the water off and the solid turns white.",
        },
      ],
    },
  ],
};
