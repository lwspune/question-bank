import type { SubtopicNote } from "@/app/notes/_types";

export const MIXTURES_NOTE: SubtopicNote = {
  subtopicName: "Compounds, Mixtures and Solutions",
  title: "Compounds, Mixtures and Solutions",
  oneLineDefinition:
    "Matter is either a pure substance (element or compound, fixed composition) or a mixture (two or more substances physically mixed); mixtures are homogeneous (uniform, like a solution) or heterogeneous (non-uniform).",
  whyItMatters:
    "Seven PYQs, mostly EASY classification: 'which is NOT a mixture / solution / heterogeneous mixture?', plus a 'compound statement that is NOT correct' and one mass-percentage sum. " +
    "The whole subtopic is one classification tree — element vs compound vs mixture, then homogeneous vs heterogeneous — plus the one calculation. Learn where the trick examples sit (ice and tin are pure; milk is heterogeneous; sugar is a pure compound, not a solution).",
  concepts: [
    // FOUNDATION — pure substances vs mixtures (reference)
    {
      kind: "reference" as const,
      slug: "pure-substances-vs-mixtures",
      name: "Elements, compounds and mixtures",
      intuition:
        "First split everything into pure substances (fixed composition, one kind of particle throughout) and mixtures (two or more substances just stirred together). Pure substances split again into elements (one type of atom) and compounds (atoms chemically bonded in a fixed ratio).",
      definition:
        "The classification tree:\n" +
        "- **Element** — a pure substance made of **one type of atom** (iron, tin, oxygen, gold). Cannot be broken down chemically.\n" +
        "- **Compound** — a pure substance of **two or more elements chemically combined in a fixed proportion** (water H₂O, salt NaCl, sugar C₁₂H₂₂O₁₁). Its properties **differ** from its constituent elements, and it is a **pure substance** (NOT impure). Its constituents are separable **only by chemical or electrochemical means**.\n" +
        "- **Mixture** — two or more substances **physically mixed**, in **any proportion**, separable by **physical** methods (air, brass, sand-and-salt, milk).\n" +
        "- **Trap examples**: **ice** is pure (frozen water — a compound), **tin** is pure (an element), **sugar** is pure (a compound) — none of these is a mixture.",
      table: {
        columns: ["Substance", "Category", "Why"],
        rows: [
          { cells: ["Tin", "Element (pure)", "One type of atom — not a mixture"] },
          { cells: ["Ice", "Compound (pure)", "Frozen H₂O — not a mixture"] },
          { cells: ["Sugar", "Compound (pure)", "C₁₂H₂₂O₁₁ — a pure substance, not a solution"] },
          { cells: ["Air", "Mixture", "Mainly N₂ + O₂, variable proportion"] },
          { cells: ["Brass", "Mixture (alloy)", "Copper + zinc, variable proportion"] },
          {
            cells: ["A compound", "Pure substance", "Fixed ratio; NOT an impure substance"],
            noteAmber: "A compound is a PURE substance with fixed composition — the claim 'a compound is an impure substance' is false.",
          },
        ],
        caption: "Pure = element or compound (fixed composition). Mixture = physically mixed, any proportion.",
      },
      pyqExampleId: "a5dbea69-e6fa-4623-8ed3-995f0d5cc2ea", // compound NOT correct: impure substance
      selfCheckExample: {
        prompt:
          "Which statement about a compound is NOT correct? (a) Two or more elements chemically combined in a fixed proportion (b) Properties differ from its constituent elements (c) A compound is an impure substance (d) Constituents separable only by chemical reactions.",
        steps: [
          "A compound is elements combined in a fixed ratio — (a) is correct.",
          "A compound's properties differ from its elements (water vs hydrogen + oxygen) — (b) is correct.",
          "A compound has fixed composition, so it is a PURE substance, not impure — (c) is the false statement.",
          "Compounds need chemical means to break apart — (d) is correct.",
        ],
        answer: "Statement (c) — a compound is a pure substance, not an impure one.",
      },
      practiceSet: [
        { prompt: "Of tin, brass, air and sandy water, which is NOT a mixture?", answer: "Tin", method: "tin is a pure element" },
        { prompt: "Is ice a pure substance or a mixture?", answer: "Pure substance (a compound, frozen H₂O)" },
        { prompt: "Is a compound a pure or impure substance?", answer: "Pure", method: "it has a fixed composition" },
        { prompt: "How can the constituents of a compound be separated?", answer: "Only by chemical or electrochemical means" },
      ],
      traps: [
        {
          title: "A compound is pure, not impure",
          body:
            "A compound has a fixed composition, so it is a **pure substance**. The statement 'a compound is an impure substance' is the **wrong** one. (Mixtures are the variable-composition ones.)",
        },
        {
          title: "Ice and tin are not mixtures",
          body:
            "**Ice** is frozen water (a pure compound) and **tin** is a pure element — neither is a mixture. The mixtures in a list are things like air, brass, or sandy water.",
        },
      ],
    },

    // homogeneous vs heterogeneous + solutions (reference)
    {
      kind: "reference" as const,
      slug: "homogeneous-heterogeneous-solutions",
      name: "Homogeneous vs heterogeneous mixtures, and solutions",
      intuition:
        "Mixtures split by how uniform they look. A homogeneous mixture is the same throughout with no visible boundaries (a solution — salt water, air, brass). A heterogeneous mixture has visible different parts (sandy water, oil and water, milk).",
      definition:
        "The second split, and what a solution is:\n" +
        "- **Homogeneous mixture** — uniform throughout, single phase, no visible boundaries. A **solution** is a homogeneous mixture (salt water, air, alloys like brass).\n" +
        "- **Heterogeneous mixture** — non-uniform, you can see the separate components or phases (sandy water, sulphur in water, a mixture of sugar and salt crystals, oil and water).\n" +
        "- A **solution** = solute (dissolved) + solvent (dissolving medium), homogeneous. Air (gas in gas), brass (solid in solid) and salt water (solid in liquid) are all solutions.\n" +
        "- **Trap examples**: **milk** is a **heterogeneous** mixture (a colloid — fat droplets in water); **sulphur dissolved in carbon disulphide** is **homogeneous** (sulphur IS soluble in CS₂, so it forms a true solution); **pure sugar** is a compound, **not a solution**.",
      table: {
        columns: ["Mixture", "Homogeneous or heterogeneous?", "Note"],
        rows: [
          { cells: ["Salt dissolved in water", "Homogeneous (a solution)", "Uniform, single phase"] },
          { cells: ["Air", "Homogeneous (a solution)", "Gases evenly mixed"] },
          { cells: ["Brass / alloy", "Homogeneous (a solution)", "Solid solution of metals"] },
          {
            cells: ["Sulphur in carbon disulphide", "Homogeneous", "Sulphur dissolves in CS₂ → true solution"],
            noteAmber: "Sulphur IS soluble in carbon disulphide, so this is the NON-heterogeneous (homogeneous) one. Sulphur in WATER would be heterogeneous.",
          },
          {
            cells: ["Milk", "Heterogeneous (a colloid)", "Fat droplets dispersed in water"],
            noteAmber: "Milk is heterogeneous, not a true solution — it is a colloid.",
          },
          { cells: ["Sugar and salt crystals", "Heterogeneous", "Visible separate crystals"] },
        ],
      },
      pyqExampleId: "35d3e86c-55d8-4202-8506-1926fb2efe58", // NOT heterogeneous: sulphur in CS2
      selfCheckExample: {
        prompt:
          "Which is NOT a heterogeneous mixture? (a) Sulphur in carbon disulphide (b) Sugar and salt crystals (c) Sandy water (d) Sulphur in water.",
        steps: [
          "Sulphur dissolves in carbon disulphide, giving a uniform single phase — homogeneous.",
          "Sugar + salt crystals are visibly separate — heterogeneous.",
          "Sandy water has visible sand — heterogeneous.",
          "Sulphur does NOT dissolve in water — visible particles — heterogeneous.",
        ],
        answer: "Sulphur in carbon disulphide — it forms a homogeneous true solution.",
      },
      practiceSet: [
        { prompt: "Is a solution homogeneous or heterogeneous?", answer: "Homogeneous" },
        { prompt: "Is milk a homogeneous or heterogeneous mixture?", answer: "Heterogeneous", method: "it is a colloid — fat droplets in water" },
        { prompt: "Of alloy, milk, air and salt water, which is NOT a solution?", answer: "Milk", method: "the other three are homogeneous solutions" },
        { prompt: "Why is sulphur in carbon disulphide homogeneous?", answer: "Sulphur dissolves in CS₂, forming a true solution" },
      ],
      traps: [
        {
          title: "Milk is heterogeneous, not a solution",
          body:
            "Milk looks uniform but is a **heterogeneous** mixture (a colloid of fat droplets in water). In a 'which is NOT a solution' list, milk is the answer.",
        },
        {
          title: "Sulphur dissolves in CS₂ but not water",
          body:
            "Sulphur is **soluble in carbon disulphide** (giving a homogeneous solution) but **insoluble in water** (giving a heterogeneous mixture). Watch which solvent the question uses.",
        },
      ],
    },

    // mass percentage (formula)
    {
      kind: "formula" as const,
      slug: "mass-percentage",
      name: "Mass percentage of a solution",
      intuition:
        "The strength of a solution by mass is just the fraction of the total mass that is the solute, expressed as a percentage. Remember the denominator is the mass of the WHOLE solution (solute + solvent), not just the solvent.",
      definition:
        "The mass percentage of a solute in a solution:\n" +
        "- **Mass % = (mass of solute ÷ mass of solution) × 100**, where **mass of solution = mass of solute + mass of solvent**.\n" +
        "- The classic error is dividing by the mass of the solvent alone — always use the **total** solution mass.",
      formula: {
        label: "Mass percentage of solute",
        latex: "\\text{Mass \\%} = \\frac{\\text{mass of solute}}{\\text{mass of solute} + \\text{mass of solvent}} \\times 100",
        symbols: [
          { symbol: "mass of solute", meaning: "mass of the dissolved substance (e.g. salt)" },
          { symbol: "mass of solvent", meaning: "mass of the dissolving medium (e.g. water)" },
        ],
      },
      pyqExampleId: "65c22fdf-5cb9-4830-949c-cf4836dfe132", // 20 g salt in 180 g water = 10%
      authoredExample: {
        prompt: "20 g of common salt is dissolved in 180 g of water. What is the mass percentage of salt in the solution?",
        steps: [
          "Mass of solution = mass of salt + mass of water = 20 + 180 = 200 g.",
          "Mass % = (20 ÷ 200) × 100.",
          "= 0.1 × 100 = 10%.",
        ],
        answer: "10%.",
      },
      selfCheckExample: {
        prompt: "25 g of sugar is dissolved in 75 g of water. What is the mass percentage of sugar?",
        steps: [
          "Mass of solution = 25 + 75 = 100 g.",
          "Mass % = (25 ÷ 100) × 100 = 25%.",
        ],
        answer: "25%.",
      },
      practiceSet: [
        { prompt: "10 g of salt in 90 g of water — mass %?", answer: "10%", method: "10 ÷ (10 + 90) × 100" },
        { prompt: "5 g of solute in 45 g of solvent — mass %?", answer: "10%", method: "5 ÷ 50 × 100" },
        { prompt: "In a mass-% calculation, the denominator is the mass of the solvent or the whole solution?", answer: "The whole solution (solute + solvent)" },
      ],
      traps: [
        {
          title: "Divide by the whole solution, not the solvent",
          body:
            "For 20 g salt in 180 g water, the answer is 20 ÷ **200** × 100 = **10%**, NOT 20 ÷ 180 × 100 ≈ 11%. The denominator is the total solution mass.",
        },
      ],
    },
  ],
};
