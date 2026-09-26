import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-chemistry/redox-reactions";

export const AGENTS_AND_OXIDES_NOTE: SubtopicNote = {
  subtopicName: "Reducing/Oxidizing Agents and Acidic/Basic Oxides",
  title: "Oxidising and Reducing Agents, and Acidic, Basic and Neutral Oxides",
  oneLineDefinition:
    "An oxidising agent takes electrons and is itself reduced; a reducing agent gives electrons and is itself oxidised; and an oxide is acidic, basic, amphoteric or neutral depending on the element it is made from.",
  whyItMatters:
    "6 PYQs, none HARD. Four are about agents — the weakest reducing agent, which element tends to be reduced, what tin can reduce, the catalyst for KClO₃ — and two classify an oxide. " +
    "Two cards, and the second is a table to learn.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetrdx-agents",
      name: "Oxidising and Reducing Agents and Their Strength",
      intuition:
        "A strong reducing agent loses electrons easily; a strong oxidising agent grabs them. Metals on the left of the table are reducing agents, non-metals like oxygen and the halogens are oxidising agents, and a species that has already gained electrons — F⁻, Cl⁻ — is a very poor reducing agent. The standard reduction potential ranks them: the more positive E°, the stronger the oxidising agent.",
      definition:
        "- **Reducing agent** is oxidised (loses e⁻); **oxidising agent** is reduced (gains e⁻).\n" +
        "- **Strongest reducing agent**: Li (most negative E°). **Weakest reducing agent**: F⁻ (F₂ is the strongest oxidising agent, so F⁻ holds its electron hardest).\n" +
        "- **Tends to be reduced**: non-metals with high electron affinity — O, the halogens. Metals (Mg, Ni, Cu) tend to be oxidised.\n" +
        "- **A metal reduces a species with a higher E°**: Sn (E° −0.14 V) reduces I₂ (+0.54 V) to I⁻.\n" +
        "- **KClO₃ decomposition**: 2KClO₃ → 2KCl + 3O₂ with **MnO₂** as catalyst (an internal redox: Cl +5 → −1, O −2 → 0).",
      formula: {
        label: "Can A reduce B?",
        latex: "\\text{A reduces B if } E^\\circ_{\\text{B}} > E^\\circ_{\\text{A}^{n+}/\\text{A}}",
      },
      authoredExample: {
        prompt: "Which is the weakest reducing agent: Li, Li⁺, F₂, F⁻?",
        steps: [
          "A reducing agent must LOSE electrons. Li loses one easily — the strongest.",
          "Li⁺ and F₂ are not reducing agents in any normal sense (Li⁺ has nothing easy to lose; F₂ is an oxidising agent).",
          "Among the two that could be compared as electron-donors, F⁻ holds its electron most tightly, since F₂/F⁻ has the most positive E° of all.",
        ],
        answer: "F⁻",
      },
      selfCheckExample: {
        prompt: "Which is reduced by tin easily: iodine, iron, zinc, sodium?",
        steps: [
          "Only a species that can gain electrons can be reduced; the three metals are reducing agents themselves.",
          "I₂/I⁻ (+0.54 V) lies above Sn²⁺/Sn (−0.14 V), so tin reduces iodine.",
        ],
        answer: "Iodine",
      },
      practiceSet: [
        { prompt: "Which element tends to undergo reduction: Mg, Ni, O, Cu?", answer: "O" },
        { prompt: "Catalyst for the thermal decomposition of KClO₃?", answer: "MnO₂" },
        { prompt: "Strongest oxidising agent among the halogens?", answer: "F₂" },
      ],
      pyqExampleId: "ddf89838-9ebb-4218-a9da-e117b3e5d196",
      traps: [
        {
          title: "Confusing the strongest oxidising agent with the weakest reducing agent",
          body: "F₂ is the strongest oxidising agent; its partner F⁻ is the weakest reducing agent. The question may offer both — read which one it asks for.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cetrdx-oxides",
      name: "Acidic, Basic, Amphoteric and Neutral Oxides",
      intuition:
        "An oxide's character follows the element: a metal oxide dissolves in acid (basic), a non-metal oxide in its higher state is the anhydride of an acid (acidic), a few in the middle do both (amphoteric), and a handful of low oxides of non-metals do neither (neutral).",
      definition:
        "- **Basic**: metal oxides — Na₂O, **CaO**, MgO.\n" +
        "- **Acidic**: non-metal oxides that form an acid with water — **N₂O₅** (HNO₃), SO₃ (H₂SO₄), CO₂, P₄O₁₀.\n" +
        "- **Amphoteric**: react with both acids and bases — **Al₂O₃**, ZnO.\n" +
        "- **Neutral**: **CO, NO, N₂O**, H₂O.",
      table: {
        columns: ["Oxide", "Character", "Why"],
        rows: [
          { cells: ["CaO", "**Basic**", "Metal oxide; CaO + 2HCl → CaCl₂ + H₂O"], pyqExampleId: "959e6db9-b869-48d3-a731-81179f9bc596" },
          { cells: ["N₂O₅", "**Acidic**", "Anhydride of HNO₃"], pyqExampleId: "4fece4dd-15b0-4969-b873-b6104e8f4087" },
          { cells: ["SO₃", "**Acidic**", "Anhydride of H₂SO₄"] },
          { cells: ["Al₂O₃", "**Amphoteric**", "Dissolves in HCl and in NaOH"] },
          { cells: ["CO, NO, N₂O", "**Neutral**", "No acid or base forms with water"], noteAmber: "The trap: N₂O₅ is acidic, but N₂O and NO are neutral — the oxidation state decides." },
        ],
        caption: "Higher oxidation state of a non-metal → more acidic oxide.",
      },
      selfCheckExample: {
        prompt: "Which is an acidic oxide: CO, NO, N₂O, N₂O₅?",
        steps: ["N₂O₅ gives HNO₃ with water. The other three are neutral oxides."],
        answer: "N₂O₅",
      },
      practiceSet: [
        { prompt: "Identify the basic oxide: SO₃, NO, Al₂O₃, CaO?", answer: "CaO" },
        { prompt: "Character of Al₂O₃?", answer: "Amphoteric" },
        { prompt: "Character of CO?", answer: "Neutral" },
      ],
      pyqExampleId: "959e6db9-b869-48d3-a731-81179f9bc596",
    },
  ],
  related: [
    { label: "Identifying the oxidised and reduced element", href: `${BASE}/cetrdx-balancing-redox` },
  ],
};
