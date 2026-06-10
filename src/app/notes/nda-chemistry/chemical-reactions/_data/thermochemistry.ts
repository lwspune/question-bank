import type { SubtopicNote } from "@/app/notes/_types";

export const THERMOCHEMISTRY_NOTE: SubtopicNote = {
  subtopicName: "Endothermic and Exothermic Reactions",
  title: "Endothermic and Exothermic Reactions",
  oneLineDefinition:
    "An exothermic reaction releases heat to the surroundings (gets warm); an endothermic reaction absorbs heat from the surroundings (needs heat in).",
  whyItMatters:
    "A short subtopic (3 PYQs) that asks you to label a reaction by the direction the heat flows, or to pick the endothermic one from a list. " +
    "The reliable rules: combustion and neutralisation are exothermic; most decompositions need heat in and are endothermic.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "endo-exo",
      name: "Which way does the heat flow?",
      intuition:
        "If the container gets hot, the reaction is releasing heat — exothermic. If it must be heated to keep going, it is absorbing heat — endothermic. Combustion and adding water to quicklime warm up; thermal decompositions need a constant flame.",
      definition:
        "The two categories and their markers:\n" +
        "- **Exothermic** — **releases** heat (ΔH negative); surroundings warm up. Examples: **combustion/burning** (CH₄ + 2O₂ → CO₂ + 2H₂O), **neutralisation**, the **Haber process** (N₂ + 3H₂ → 2NH₃), the **thermite reaction** (Fe₂O₃ + 2Al → 2Fe + Al₂O₃), and **CaO + H₂O → Ca(OH)₂** (slaking of lime).\n" +
        "- **Endothermic** — **absorbs** heat (ΔH positive); needs heat supplied. Examples: most **thermal decompositions** (2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂), **photosynthesis**, and **N₂ + O₂ → 2NO** (needs very high temperature, which is why air's nitrogen and oxygen do not react at room temperature).\n" +
        "- Quick test for the bank: combustion/neutralisation/slaking = exothermic; 'requires heating to decompose' = endothermic.",
      table: {
        columns: ["Reaction", "Endothermic or exothermic?"],
        rows: [
          {
            cells: ["CaO + H₂O → Ca(OH)₂ (slaking lime)", "Exothermic — releases heat"],
            noteAmber: "Adding water to quicklime gets HOT — it is strongly exothermic.",
          },
          { cells: ["Combustion of CH₄ or glucose", "Exothermic"] },
          { cells: ["Haber process N₂ + 3H₂ → 2NH₃", "Exothermic"] },
          {
            cells: ["2Pb(NO₃)₂ → 2PbO + 4NO₂ + O₂", "Endothermic — needs heat in"],
            noteAmber: "Thermal decompositions absorb heat — they are endothermic.",
          },
          {
            cells: ["N₂ + O₂ → 2NO", "Endothermic — needs very high temperature"],
            noteAmber: "Air's N₂ and O₂ do not react at ordinary temperatures because the reaction is endothermic and needs > 2000°C.",
          },
        ],
      },
      pyqExampleId: "396696ee-ade7-49b5-902a-156a3951108b", // endothermic reaction = decomposition of lead nitrate
      practiceSet: [
        { prompt: "Reaction of quicklime (CaO) with water is endothermic or exothermic?", answer: "Exothermic", method: "it releases heat — the mixture warms up" },
        { prompt: "Is the combustion of methane endothermic or exothermic?", answer: "Exothermic" },
        { prompt: "Decomposition of lead nitrate on heating is which type?", answer: "Endothermic", method: "needs heat supplied" },
        { prompt: "Why don't N₂ and O₂ in air react to form NO at room temperature?", answer: "The reaction is endothermic and needs very high temperature (> 2000°C)" },
      ],
      traps: [
        {
          title: "Combustion and slaking are exothermic; decomposition is endothermic",
          body:
            "When asked 'which is endothermic?', rule out combustion (CH₄, glucose) and the Haber process — those RELEASE heat. The endothermic one is usually a thermal decomposition that needs heat in (e.g. lead nitrate).",
        },
        {
          title: "N₂ + O₂ needs huge energy",
          body:
            "Air's nitrogen and oxygen do not combine at room temperature because N₂ + O₂ → 2NO is ENDOTHERMIC and requires very high temperature (lightning or engine heat). It is not that the oxides are unstable or that a catalyst is missing.",
        },
      ],
    },
  ],
};
