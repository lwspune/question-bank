import type { SubtopicNote } from "@/app/notes/_types";

export const PHYSICAL_CHEMICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical vs Chemical Changes",
  title: "Physical vs Chemical Changes",
  oneLineDefinition:
    "A physical change alters only the form or state of a substance with no new substance formed; a chemical change rearranges atoms into a genuinely new substance — that is what a chemical reaction is.",
  whyItMatters:
    "The foundation of the whole chapter — a chemical reaction IS a chemical change, so everything later builds on this one distinction. " +
    "The bank asks it directly as 'which of the following is a chemical change?', testing whether you can tell burning, rusting and neutralisation apart from melting, dissolving and evaporating.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "physical-vs-chemical",
      name: "Telling a physical change from a chemical change",
      intuition:
        "Ask one question: is a NEW substance formed? Melting ice, dissolving sugar and boiling water just change the form — the substance is still water or sugar, so they are physical. Burning, rusting and reacting an acid with a base make something new, so they are chemical.",
      definition:
        "The test and the markers:\n" +
        "- **Physical change** — no new substance; usually **reversible**; only state, shape or size changes. Examples: melting ice, boiling water, dissolving sugar, breaking glass, magnetising iron.\n" +
        "- **Chemical change** — a **new substance** forms; usually **irreversible**; often shows heat/light, colour change, gas evolution or a precipitate. Examples: burning, rusting, cooking, neutralisation, digestion, photosynthesis.\n" +
        "- **Neutralisation** (acid + base, e.g. **NaOH + HCl → NaCl + H₂O**) is a chemical change — a new salt forms.\n" +
        "- **Burning magnesium** (2Mg + O₂ → 2MgO) is a chemical change — the bright white light and the new white solid MgO are the giveaways.",
      table: {
        columns: ["Process", "Change type", "Why"],
        rows: [
          { cells: ["Melting of ice", "Physical", "Still water, only state changes — reversible"] },
          { cells: ["Boiling / evaporation of water", "Physical", "Water vapour is still water"] },
          { cells: ["Dissolving sugar in water", "Physical", "Sugar can be recovered by evaporation"] },
          {
            cells: ["Mixing NaOH and HCl", "Chemical", "Neutralisation — new salt (NaCl) + water form"],
            noteAmber: "Mixing an acid and a base is a chemical change, not just mixing — a new substance (the salt) is made.",
          },
          {
            cells: ["Burning of magnesium ribbon", "Chemical", "New substance MgO forms with light and heat"],
            noteAmber: "Burning is always a chemical change — a new oxide forms.",
          },
          { cells: ["Rusting of iron", "Chemical", "New substance (hydrated iron oxide) forms"] },
        ],
      },
      pyqExampleId: "edd0ffd9-7bde-46c6-b975-c272a51b9718", // mixing NaOH and HCl is a chemical change
      practiceSet: [
        { prompt: "Is melting of ice a physical or chemical change?", answer: "Physical change", method: "no new substance — still water" },
        { prompt: "Mixing NaOH and HCl is which type of change?", answer: "Chemical change (neutralisation)" },
        { prompt: "Is burning of a magnesium ribbon physical or chemical?", answer: "Chemical change", method: "new substance MgO forms with light" },
        { prompt: "Is dissolving sugar in water a chemical change?", answer: "No — it is physical (sugar is recoverable)" },
      ],
      traps: [
        {
          title: "Dissolving and boiling are physical, not chemical",
          body:
            "Dissolving sugar, boiling water and melting ice make NO new substance — they are physical changes even though the substance looks different. The marker for a chemical change is a NEW substance, not just a new appearance.",
        },
        {
          title: "Mixing an acid and a base is a chemical change",
          body:
            "Mixing NaOH and HCl is not 'just mixing' — they react (neutralisation) to form a new salt and water, so it is a chemical change.",
        },
        {
          title: "Burning is always chemical",
          body:
            "Any burning or combustion (magnesium ribbon, fuel, a candle wick) is a chemical change — a new oxide or combustion product forms, releasing heat and often light.",
        },
      ],
    },
  ],
};
