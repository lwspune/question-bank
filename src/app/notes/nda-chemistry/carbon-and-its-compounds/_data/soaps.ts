import type { SubtopicNote } from "@/app/notes/_types";

export const SOAPS_NOTE: SubtopicNote = {
  subtopicName: "Soaps, Detergents and Hydrogenation of Oils",
  title: "Soaps, Detergents and Hydrogenation of Oils",
  oneLineDefinition:
    "Soap is the sodium or potassium salt of a long-chain fatty acid; detergents do the same job with a synthetic head that survives hard water; hydrogenation turns liquid oils into solid fats.",
  whyItMatters:
    "Four PYQs, including one HARD: telling a soap from a synthetic detergent by its formula, the micelle's orientation, soft vs hard soap, and how margarine is made. " +
    "The recurring trap is the micelle direction — tails in, heads out.",
  concepts: [
    // soaps, saponification, micelles (reference)
    {
      kind: "reference" as const,
      slug: "soaps-saponification-micelles",
      name: "Soaps, saponification and micelles",
      intuition:
        "A soap molecule has two ends: a long oily tail that grabs grease, and an ionic head that loves water. In water the molecules cluster into a micelle — tails pointing inward onto the oil droplet, heads facing out into the water — which lifts the dirt away. " +
        "Soap itself is made by boiling a fat or oil with alkali (saponification).",
      definition:
        "The structure and chemistry of soap:\n" +
        "- A **soap** is the **sodium or potassium salt of a long-chain fatty acid** (e.g. sodium stearate).\n" +
        "- Each molecule has a **hydrophobic (oily) tail** and a **hydrophilic (ionic) head**.\n" +
        "- In a **micelle**, the **tails point inward** onto the oil droplet and the **ionic heads face outward** into the water.\n" +
        "- **Saponification** = fat/oil + alkali → soap + glycerol. **NaOH gives hard soap**; **KOH gives soft (liquid) soap**, gentler on skin.",
      table: {
        columns: ["Feature", "Detail"],
        rows: [
          { cells: ["What a soap is", "Na or K salt of a long-chain fatty acid"] },
          { cells: ["Two ends of the molecule", "Hydrophobic tail + hydrophilic (ionic) head"] },
          {
            cells: ["Micelle orientation", "Tails inward onto oil; ionic heads outward into water"],
            noteAmber: "The ionic heads face the WATER, not the oil — the common trap reverses this.",
          },
          { cells: ["NaOH vs KOH in saponification", "NaOH → hard soap; KOH → soft (liquid) soap"] },
        ],
      },
      pyqExampleId: "d02568ea-0263-48a4-be63-db2c95317a04", // micelle orientation NOT correct
      practiceSet: [
        { prompt: "A soap is the salt of which acid?", answer: "A long-chain fatty acid (Na or K salt)" },
        { prompt: "In a micelle, which way do the oily tails point?", answer: "Inward, onto the oil droplet" },
        { prompt: "Which alkali gives a soft soap, gentle on skin?", answer: "Potassium hydroxide (KOH)" },
        { prompt: "What is saponification?", answer: "Boiling a fat/oil with alkali to make soap and glycerol" },
      ],
      traps: [
        {
          title: "Micelle: ionic heads face the water",
          body:
            "In a micelle the **ionic heads point outward into the water** and the **oily tails point inward** onto the grease. A statement that the ionic end points toward the oil droplet is the one that is **NOT correct**.",
        },
      ],
    },

    // detergents vs soaps (reference)
    {
      kind: "reference" as const,
      slug: "detergents-vs-soaps",
      name: "Detergents vs soaps",
      intuition:
        "Soap fails in hard water — it reacts with calcium and magnesium ions to form a useless scum. Synthetic detergents were designed to fix this: same oily tail, but a sulphonate or quaternary-ammonium head that stays soluble in hard water.",
      definition:
        "How a synthetic detergent differs from a soap:\n" +
        "- A **soap** is a fatty-acid salt (e.g. sodium stearate, CH₃(CH₂)₁₆COO⁻Na⁺) — it is **NOT** a synthetic detergent.\n" +
        "- A **synthetic detergent** has an **ionic head from a strong acid** — a **sulphonate (-OSO₃⁻Na⁺)** or a **quaternary ammonium** group.\n" +
        "- **Detergents work in hard water**; soaps do not (they form scum with Ca²⁺/Mg²⁺).",
      table: {
        columns: ["", "Soap", "Synthetic detergent"],
        rows: [
          { cells: ["Head group", "Carboxylate (-COO⁻Na⁺)", "Sulphonate or quaternary ammonium"] },
          { cells: ["Source", "Natural fats/oils", "Petrochemicals (synthetic)"] },
          {
            cells: ["Works in hard water?", "No — forms scum", "Yes"],
            noteAmber: "Sodium stearate is a SOAP, not a detergent — the carboxylate head gives it away.",
          },
        ],
      },
      pyqExampleId: "4c757c8e-2e01-4d43-be1a-248a3981ac72", // which is NOT a synthetic detergent
      practiceSet: [
        { prompt: "Which head group marks a synthetic detergent?", answer: "Sulphonate or quaternary ammonium" },
        { prompt: "Is sodium stearate (CH₃(CH₂)₁₆COO⁻Na⁺) a soap or a detergent?", answer: "A soap", method: "carboxylate head from a fatty acid" },
        { prompt: "Which works better in hard water, soap or detergent?", answer: "Detergent" },
      ],
      traps: [
        {
          title: "The carboxylate is the soap",
          body:
            "In a 'which is NOT a synthetic detergent' list, the molecule ending in **-COO⁻Na⁺** (a carboxylate, e.g. sodium stearate) is the **soap**. Sulphonates (-OSO₃⁻) and quaternary ammonium salts are the detergents.",
        },
      ],
    },

    // hydrogenation of oils (reference)
    {
      kind: "reference" as const,
      slug: "hydrogenation-of-oils",
      name: "Hydrogenation of oils",
      intuition:
        "Liquid vegetable oils are unsaturated (they have C=C double bonds). Adding hydrogen across those double bonds saturates them, raising the melting point so the oil becomes a solid fat — this is how margarine and vanaspati are made.",
      definition:
        "The hydrogenation reaction:\n" +
        "- **Unsaturated liquid oil + H₂** (with a **nickel catalyst**) → **saturated solid fat**.\n" +
        "- This converts vegetable oils into **margarine / vanaspati ghee**.\n" +
        "- Adding hydrogen removes the C=C double bonds, raising the melting point.",
      table: {
        columns: ["Starting material", "Reagent / catalyst", "Product"],
        rows: [
          {
            cells: ["Unsaturated vegetable oil (liquid)", "H₂ gas, nickel catalyst", "Saturated fat (solid) — margarine / vanaspati"],
            noteAmber: "The reagent is HYDROGEN gas (with a Ni catalyst) — that is what 'hydrogenation' means.",
          },
        ],
      },
      pyqExampleId: "31dd0c2b-a53a-4e32-8a3b-7bd8823285eb", // oils to margarine via hydrogen
      practiceSet: [
        { prompt: "Liquid vegetable oils are converted to solid margarine using what?", answer: "Hydrogen gas (with a nickel catalyst)" },
        { prompt: "What catalyst is used in the hydrogenation of oils?", answer: "Nickel" },
        { prompt: "Hydrogenation removes which type of bond?", answer: "C=C double bonds (it saturates the oil)" },
      ],
    },
  ],
};
