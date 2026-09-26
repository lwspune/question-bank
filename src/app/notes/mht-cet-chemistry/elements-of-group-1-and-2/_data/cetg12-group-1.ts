import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/elements-of-group-1-and-2";

export const GROUP_1_NOTE: SubtopicNote = {
  subtopicName: "Group 1 Alkali Metals, Properties and Reactivity",
  title: "Group 1: The Alkali Metals — Properties, Oxides and Uses",
  oneLineDefinition:
    "The alkali metals Li, Na, K, Rb and Cs have one valence electron, form +1 ions with a noble-gas configuration, are the most electropositive elements, and become softer, lower-melting and more reactive down the group.",
  whyItMatters:
    "11 PYQs, all EASY. Six test the group's properties — which statement is false, which metal tarnishes, what +1 ions are like; five test oxides, carbonate decomposition, the blue solution in ammonia, and caesium's use. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetg12-alkali-properties",
      name: "Properties of the Alkali Metals",
      intuition:
        "One loosely held s-electron explains the whole group: the metals lose it easily (most electropositive, strongly negative E°), the resulting M⁺ ion has a closed shell (colourless, diamagnetic compounds), and metallic bonding weakens as the atoms grow, so melting points FALL down the group.",
      definition:
        "- **Group 1**: Li, Na, K, Rb, Cs, Fr. **Be, Mg, Sr are group 2** — not alkali metals.\n" +
        "- **Oxidation state +1** only; M⁺ has a noble-gas configuration → **colourless, diamagnetic** compounds.\n" +
        "- **Most electropositive** elements; large **negative** E°.\n" +
        "- **Melting point decreases** down the group; **density**: K < Na (the one exception to the rising trend).\n" +
        "- Silvery white, soft, and **tarnish rapidly in air** — potassium within seconds.",
      table: {
        columns: ["Statement", "True or false"],
        rows: [
          { cells: ["All alkali metals are silvery white", "True"] },
          { cells: ["Density of K is less than Na", "True"] },
          { cells: ["Compounds of M⁺ are diamagnetic (and colourless)", "True"], pyqExampleId: "8bb6a07c-4379-4c47-951c-4ccbea1a12c8" },
          { cells: ["Melting point increases down the group", "**False** — it decreases"], pyqExampleId: "ea7a74e0-0a46-4ef3-84db-ef87f02397a1" },
          { cells: ["They are the most electropositive elements", "True"], pyqExampleId: "c66abf31-ec03-40a9-908e-134adf19d0ed" },
          { cells: ["They form dipositive ions", "**False** — +1 only"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which is not an alkali metal: lithium, potassium, beryllium, caesium?",
        steps: ["Beryllium heads group 2."],
        answer: "Beryllium",
      },
      practiceSet: [
        { prompt: "Which element shows a common +2 state: Sr, Rb, Na, Li?", answer: "Sr (group 2)" },
        { prompt: "Which loses its lustre fastest in air: Ba, Be, K, Mg?", answer: "K" },
      ],
      pyqExampleId: "ea7a74e0-0a46-4ef3-84db-ef87f02397a1",
      traps: [
        {
          title: "Calling M⁺ compounds paramagnetic",
          body: "A +1 alkali-metal ion has no unpaired electrons, so its compounds are diamagnetic and colourless. 'Paramagnetic' is the false statement the paper plants.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetg12-alkali-reactions",
      name: "Oxides, Carbonates, Ammonia Solutions and Uses",
      intuition:
        "Burned in excess oxygen, each metal makes the oxide its cation can best stabilise: tiny Li⁺ a normal oxide, Na⁺ a peroxide, the big K⁺, Rb⁺, Cs⁺ superoxides. Li⁺ is also small enough to pull apart a carbonate, so only Li₂CO₃ decomposes on heating.",
      definition:
        "- **Oxides in excess O₂**: Li → **Li₂O**; Na → **Na₂O₂** (peroxide); **K, Rb, Cs → KO₂** (superoxide).\n" +
        "- **Li₂CO₃ → Li₂O + CO₂** on heating; the other group-1 carbonates are stable.\n" +
        "- **In liquid ammonia**: **deep blue** solution (ammoniated electrons), bronze when concentrated.\n" +
        "- **Uses**: **Cs** in photoelectric cells (lowest ionisation enthalpy); Li in batteries; Na in sodium lamps.",
      table: {
        columns: ["Metal", "Oxide with excess O₂", "Note"],
        rows: [
          { cells: ["Li", "Li₂O (normal oxide)", "Li₂CO₃ decomposes: Li₂O + CO₂"], pyqExampleId: "ea441288-13c6-4355-ab56-a310361e626e" },
          { cells: ["Na", "**Na₂O₂ (peroxide)**", ""], pyqExampleId: "cc9c9612-87bc-41e4-bdba-4d6d290b2690" },
          { cells: ["K, Rb, Cs", "**KO₂ (superoxide)**", "Cs used in photoelectric cells"], pyqExampleId: "6fb6aaaf-fa0b-452b-b152-11e330fdabfc" },
        ],
      },
      selfCheckExample: {
        prompt: "What colour does an alkali metal give when dissolved in liquid ammonia?",
        steps: ["Ammoniated electrons absorb in the red, so the solution looks deep blue."],
        answer: "Deep blue",
      },
      practiceSet: [
        { prompt: "Which element forms a superoxide with air: Li, Na, K, Mg?", answer: "K" },
        { prompt: "Which element is used in photoelectric cells: Li, Be, Cs, Mg?", answer: "Cs" },
      ],
      pyqExampleId: "6fb6aaaf-fa0b-452b-b152-11e330fdabfc",
    },
  ],
  related: [
    { label: "Group 2 and beryllium's anomalies", href: `${BASE}/cetg12-group-2` },
  ],
};
