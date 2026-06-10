import type { SubtopicNote } from "@/app/notes/_types";

export const TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Reactions: Combination, Decomposition, Displacement",
  title: "Types of Reactions — Combination, Decomposition, Displacement",
  oneLineDefinition:
    "Every reaction in the bank falls into one of four shapes — combination, decomposition, displacement or double displacement — and recognising the shape from the equation is most of the marks.",
  whyItMatters:
    "The largest non-redox subtopic (7 PYQs) and the home of the match-list questions, where you classify four equations in one go. " +
    "Get the four shapes cold and you can also do the addition/hydrogenation and 'which statement is NOT correct' variants the bank slips in.",
  concepts: [
    // the four reaction shapes (reference)
    {
      kind: "reference" as const,
      slug: "four-reaction-types",
      name: "The four reaction shapes",
      intuition:
        "Look at how many reactants and products there are, and whether atoms swap partners. One product from many = combination. Many products from one = decomposition. One element kicks another out = displacement. Two compounds swap ions = double displacement.",
      definition:
        "The four shapes by their equation pattern:\n" +
        "- **Combination** (A + B → AB): two or more reactants make ONE product. Example: **C + O₂ → CO₂** (burning coal); **CaO + H₂O → Ca(OH)₂**.\n" +
        "- **Decomposition** (AB → A + B): ONE reactant splits into two or more products, usually on heating, electrolysis or light. Example: **2H₂O → 2H₂ + O₂** (electrolysis); **CaCO₃ → CaO + CO₂**.\n" +
        "- **Displacement** (A + BC → AC + B): a more reactive element displaces a less reactive one. Example: **Fe + CuSO₄ → FeSO₄ + Cu**.\n" +
        "- **Double displacement** (AB + CD → AD + CB): two compounds exchange ions, often forming a precipitate. Example: **BaCl₂ + Na₂SO₄ → BaSO₄↓ + 2NaCl**.",
      table: {
        columns: ["Type", "Pattern", "Example"],
        rows: [
          { cells: ["Combination", "A + B → AB", "C + O₂ → CO₂ (burning coal)"] },
          { cells: ["Decomposition", "AB → A + B", "2H₂O → 2H₂ + O₂ (electrolysis of water)"] },
          { cells: ["Displacement", "A + BC → AC + B", "Fe + CuSO₄ → FeSO₄ + Cu"] },
          {
            cells: ["Double displacement", "AB + CD → AD + CB", "BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl"],
            noteAmber: "Double displacement = ions swap partners; a precipitate or water often forms.",
          },
        ],
      },
      pyqExampleId: "4ddb4fc4-2bee-4a98-82b7-67d414f2f650", // match list: electrolysis/burning coal/Fe nail/BaCl2 = 3-2-4-1
      practiceSet: [
        { prompt: "Classify: 2H₂O → 2H₂ + O₂.", answer: "Decomposition", method: "one reactant splits into many" },
        { prompt: "Classify: C + O₂ → CO₂.", answer: "Combination", method: "two reactants → one product" },
        { prompt: "Classify: Fe + CuSO₄ → FeSO₄ + Cu.", answer: "Displacement", method: "Fe displaces Cu" },
        { prompt: "Classify: BaCl₂ + Na₂SO₄ → BaSO₄ + 2NaCl.", answer: "Double displacement", method: "ions swap, BaSO₄ precipitates" },
      ],
      traps: [
        {
          title: "Decomposition vs double displacement in match-lists",
          body:
            "Electrolysis of water is DECOMPOSITION (one → many), while BaCl₂ + a sulphate is DOUBLE displacement (two compounds swap ions). Both feel like 'breaking up', but only one reactant breaks in decomposition.",
        },
        {
          title: "Single vs double displacement",
          body:
            "Single (simple) displacement has a free ELEMENT kicking another out (Fe + CuSO₄). Double displacement has TWO compounds swapping ions (Na₂SO₄ + BaCl₂) — no free element is involved.",
        },
      ],
    },

    // displacement and the activity series (formula variant)
    {
      kind: "formula" as const,
      slug: "displacement-reactivity",
      name: "Displacement and metal reactivity",
      intuition:
        "In a displacement reaction the MORE reactive metal pushes the less reactive one out of its salt. An iron nail in blue copper sulphate goes brown because iron (more reactive) displaces copper (less reactive) and a reddish-brown copper coating deposits on the nail.",
      definition:
        "A metal displaces another metal from its salt solution only if it is **higher in the reactivity (activity) series**:\n" +
        "- Reactivity order (high to low): **K > Na > Ca > Mg > Al > Zn > Fe > Pb > (H) > Cu > Ag > Au**.\n" +
        "- **Fe + CuSO₄ → FeSO₄ + Cu**: iron is above copper, so iron displaces copper; the blue solution fades to green and a brown copper layer forms.\n" +
        "- This is also a **redox** reaction — the more reactive metal is oxidised (loses electrons), the displaced metal ion is reduced.\n" +
        "- A metal **cannot** displace one ABOVE it: copper cannot displace iron, so 'copper is more reactive than iron' is always **false**.",
      formula: {
        label: "Reactivity (activity) series — selected metals",
        latex: "\\text{K} > \\text{Na} > \\text{Ca} > \\text{Mg} > \\text{Al} > \\text{Zn} > \\text{Fe} > \\text{Pb} > \\text{Cu} > \\text{Ag}",
      },
      pyqExampleId: "9cf74356-2ec9-4d7e-a51f-818fe3183894", // NOT correct: copper more reactive than iron
      authoredExample: {
        prompt:
          "An iron nail is dipped in blue copper sulphate solution and turns brown. State the reaction type and which statement is false: (a) Fe displaces Cu, (b) it is a displacement reaction, (c) copper is more reactive than iron.",
        steps: [
          "Iron is above copper in the activity series, so Fe displaces Cu from CuSO₄: Fe + CuSO₄ → FeSO₄ + Cu.",
          "The brown coating on the nail is the deposited copper; the blue colour fades as Cu²⁺ leaves solution.",
          "Because Fe (more reactive) displaces Cu (less reactive), statement (c) reverses the order and is false.",
        ],
        answer:
          "It is a displacement reaction; the FALSE statement is 'copper is more reactive than iron' — iron is the more reactive one.",
      },
      selfCheckExample: {
        prompt: "Will zinc displace copper from copper sulphate solution? Why?",
        steps: [
          "Check the activity series: Zn is above Cu.",
          "A metal higher in the series displaces a lower one from its salt.",
          "So Zn + CuSO₄ → ZnSO₄ + Cu proceeds.",
        ],
        answer: "Yes — zinc is more reactive than copper, so it displaces copper (the blue colour fades).",
      },
      practiceSet: [
        { prompt: "When an iron nail is dipped in CuSO₄, what coats the nail?", answer: "Copper (reddish-brown)", method: "Fe displaces Cu" },
        { prompt: "Can copper displace iron from FeSO₄?", answer: "No", method: "Cu is below Fe in the activity series" },
        { prompt: "In Fe + CuSO₄ → FeSO₄ + Cu, which metal is more reactive?", answer: "Iron" },
        { prompt: "Why does the blue colour of CuSO₄ fade when iron is added?", answer: "Cu²⁺ ions leave solution as copper metal deposits" },
      ],
      traps: [
        {
          title: "'Copper is more reactive than iron' is always false",
          body:
            "If iron displaces copper from CuSO₄, iron MUST be the more reactive metal. Any statement that copper is more reactive than iron is incorrect — it would mean copper could displace iron, which it cannot.",
        },
      ],
    },

    // addition / hydrogenation (formula variant, no formula box)
    {
      kind: "formula" as const,
      slug: "addition-hydrogenation",
      name: "Addition reactions and hydrogenation of oils",
      intuition:
        "An addition reaction adds atoms across a double bond, turning an unsaturated molecule into a saturated one — no atoms are lost. Hardening vegetable oil into vanaspati ghee is exactly this: hydrogen adds across the C=C double bonds of the oil over a nickel catalyst.",
      definition:
        "Key points about addition reactions:\n" +
        "- An **addition reaction** adds atoms across a **double or triple bond** — the unsaturated compound becomes saturated; nothing is released.\n" +
        "- **Hydrogenation of vegetable oils** (liquid, unsaturated) with **H₂ over a nickel (Ni) catalyst** gives a **solid fat** (vanaspati / margarine). It is an addition reaction.\n" +
        "- It is NOT a displacement or decomposition — the whole H₂ molecule is added, none of the oil is broken off.",
      pyqExampleId: "4bd70603-a2e5-4f92-a369-ce1e6fe70958", // hydrogenation of vegetable oils = addition
      authoredExample: {
        prompt:
          "Hydrogenation of vegetable oils using a nickel catalyst converts liquid oil into solid fat. What type of reaction is this?",
        steps: [
          "The vegetable oil is unsaturated — it has C=C double bonds.",
          "Hydrogen (H₂) adds across each double bond, with nickel acting as a catalyst.",
          "The molecule becomes saturated; nothing is split off, so atoms are only ADDED.",
        ],
        answer: "An addition reaction (specifically hydrogenation) — H₂ adds across the double bonds.",
      },
      practiceSet: [
        { prompt: "Hydrogenation of vegetable oils is which type of reaction?", answer: "Addition reaction" },
        { prompt: "Which catalyst is used to hydrogenate vegetable oils?", answer: "Nickel (Ni)" },
        { prompt: "Hydrogenation converts an unsaturated oil into what?", answer: "A saturated solid fat (vanaspati/margarine)" },
      ],
      traps: [
        {
          title: "Hydrogenation is addition, not displacement",
          body:
            "In hydrogenation the whole H₂ molecule ADDS across a double bond — nothing leaves the oil. So it is an addition reaction, not displacement (which requires one element to leave).",
        },
      ],
    },
  ],
};
