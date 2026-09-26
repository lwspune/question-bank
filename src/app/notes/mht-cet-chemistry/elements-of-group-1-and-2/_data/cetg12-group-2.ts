import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/elements-of-group-1-and-2";

export const GROUP_2_NOTE: SubtopicNote = {
  subtopicName: "Group 2 Alkaline Earth Metals, Properties and Reactivity",
  title: "Group 2: The Alkaline Earth Metals and Beryllium's Anomalies",
  oneLineDefinition:
    "The alkaline earth metals Be, Mg, Ca, Sr, Ba and Ra form +2 ions; beryllium, much smaller than the rest, behaves unlike its group — it does not react with water, its oxide is amphoteric, and it resembles aluminium diagonally.",
  whyItMatters:
    "11 PYQs, one MODERATE. Seven are about beryllium's odd behaviour — the diagonal relationship, water, amphoteric BeO, the soluble fluoride; four are the other metals — magnesium burning in air, quicklime, the ammonia solution, and naming a group-2 metal. " +
    "Two cards.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cetg12-beryllium-anomalies",
      name: "Beryllium: the Anomalous First Member",
      intuition:
        "Be²⁺ is tiny and highly charged, so it polarises strongly and bonds partly covalently. That one fact makes beryllium unreactive to water, its oxide amphoteric, its fluoride soluble, and its chemistry like aluminium's (similar charge-to-radius ratio) — the diagonal relationship.",
      definition:
        "- **Diagonal relationship**: **Be ↔ Al** (and Li ↔ Mg).\n" +
        "- **Water**: Be does **not** react even when hot (protective oxide film); Mg reacts with hot water; Ca, Sr, Ba with cold.\n" +
        "- **BeO is amphoteric**: with HCl → **BeCl₂**; with NaOH → **Na₂BeO₂** (sodium beryllate).\n" +
        "- **Fluorides**: **BeF₂ is very soluble** (high hydration energy); MgF₂, CaF₂, SrF₂ are sparingly soluble.",
      table: {
        columns: ["Property", "Beryllium", "Rest of group 2"],
        rows: [
          { cells: ["Diagonal partner", "**Al**", "—"], pyqExampleId: "9250514a-579c-48e4-abb6-49e53bb66e60" },
          { cells: ["Reaction with water", "**None**, even hot", "Mg hot; Ca, Sr, Ba cold"], pyqExampleId: "00c2465d-e68a-443d-a546-0758de67f7ce" },
          { cells: ["Oxide", "**Amphoteric**: BeCl₂ / Na₂BeO₂", "Basic"], pyqExampleId: "8aa87205-defd-4c64-b3b5-da0d6a8ad705" },
          { cells: ["Fluoride", "**BeF₂ soluble**", "Sparingly soluble"], pyqExampleId: "d1e3b7e6-69c2-4106-9c98-5858c34170e3" },
        ],
      },
      selfCheckExample: {
        prompt: "BeO is treated separately with aq. HCl and with aq. NaOH. Products?",
        steps: ["Amphoteric: a salt with the acid, a beryllate with the base."],
        answer: "BeCl₂ and Na₂BeO₂",
      },
      practiceSet: [
        { prompt: "Which does not react with water to form a hydroxide: Mg, Ca, Be, Sr?", answer: "Be" },
        { prompt: "Beryllium shows a diagonal relationship with?", answer: "Aluminium" },
        { prompt: "Most soluble: BeF₂, MgF₂, CaF₂, SrF₂?", answer: "BeF₂" },
      ],
      pyqExampleId: "8aa87205-defd-4c64-b3b5-da0d6a8ad705",
      traps: [
        {
          title: "Writing the beryllate as Na₂BeO₄",
          body: "Be is +2: Na₂BeO₂ balances (2 − 4 + 2 = 0). Na₂BeO₄ is offered as a formula that looks like sulphate but cannot balance.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetg12-alkaline-earth-reactions",
      name: "Magnesium, Calcium and the Ammonia Solution",
      intuition:
        "Magnesium is reactive enough to combine with the nitrogen of air as well as its oxygen, so burning it gives two products. Calcium carbonate heated gives quicklime. And like group 1, the heavier group-2 metals dissolve in liquid ammonia with a deep blue-black colour.",
      definition:
        "- **Group 2**: Be, Mg, Ca, **Sr**, Ba, Ra (Rb, Cs, Fr are group 1).\n" +
        "- **Mg burns in air**: **MgO and Mg₃N₂**.\n" +
        "- **Quicklime**: CaCO₃ → **CaO** + CO₂ (heating limestone).\n" +
        "- **In liquid ammonia**: **deep blue-black** solutions.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Product of Mg burning in air", "**MgO and Mg₃N₂**"], pyqExampleId: "eb8b9994-1818-4cd0-ad53-11dd86a6f9bc" },
          { cells: ["Raw material for quicklime", "**Calcium carbonate**"], pyqExampleId: "d3a979f5-bf98-447d-bad1-7802784dd5cb" },
          { cells: ["Colour in liquid NH₃", "**Deep blue-black**"], pyqExampleId: "82ec674f-3ca1-4433-8814-eedfdb5f7780" },
        ],
      },
      selfCheckExample: {
        prompt: "Identify the alkaline earth metal: Rb, Sr, Fr, Cs.",
        steps: ["The other three are alkali metals."],
        answer: "Sr",
      },
      pyqExampleId: "eb8b9994-1818-4cd0-ad53-11dd86a6f9bc",
      traps: [
        {
          title: "MgO only",
          body: "Air is mostly nitrogen, and magnesium burns in it too — the answer is MgO AND Mg₃N₂.",
        },
      ],
    },
  ],
  related: [
    { label: "Group 1", href: `${BASE}/cetg12-group-1` },
    { label: "Industrial chemistry of these elements", href: `${BASE}/cetg12-industry` },
  ],
};
