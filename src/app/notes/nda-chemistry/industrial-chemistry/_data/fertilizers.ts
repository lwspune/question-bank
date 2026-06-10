import type { SubtopicNote } from "@/app/notes/_types";

export const FERTILIZERS_NOTE: SubtopicNote = {
  subtopicName: "Fertilizers",
  title: "Fertilizers",
  oneLineDefinition:
    "The chemicals that supply the three plant nutrients — nitrogen (N), phosphorus (P) and potassium (K) — to soil, which nutrient each fertilizer carries, and how the common ones are manufactured.",
  whyItMatters:
    "Five PYQs, all recall. The bank's favourite move is 'which is NOT a fertilizer' or 'which nutrient does urea supply?' — both answered by knowing the nutrient each fertilizer carries. " +
    "Two reliable traps: urea is a NITROGEN fertilizer (not phosphorus), and ammonium sulphide is not a fertilizer at all.",
  concepts: [
    // nitrogen / phosphorus / potash fertilizers — which nutrient (reference)
    {
      kind: "reference" as const,
      slug: "fertilizer-nutrients",
      name: "Which nutrient each fertilizer supplies",
      intuition:
        "Every fertilizer supplies one or more of N, P and K. The bank asks which nutrient a named fertilizer carries, or which listed compound is NOT a fertilizer. Learn the nutrient column.",
      definition:
        "The nutrient each common fertilizer supplies:\n" +
        "- **Nitrogen (N)** fertilizers: **urea** (CO(NH₂)₂), **ammonium nitrate**, **ammonium sulphate**, **ammonium phosphate** (also P), **calcium ammonium nitrate**.\n" +
        "- **Phosphorus (P)** fertilizers: **superphosphate of lime**, **ammonium phosphate** (also N).\n" +
        "- **Potassium (K)** fertilizers: **potassium chloride (muriate of potash)**, potassium sulphate.\n" +
        "- **Ammonium sulphide ((NH₄)₂S) is NOT a fertilizer** — it is a laboratory reagent.\n" +
        "- **Urea is the richest common nitrogen fertilizer** (≈ 46% N), and supplies NO phosphorus.",
      table: {
        columns: ["Fertilizer", "Nutrient supplied", "Note"],
        rows: [
          {
            cells: ["Urea", "Nitrogen (N)", "≈ 46% N — highest-N solid fertilizer"],
            noteAmber: "Urea is a NITROGEN fertilizer, not a phosphorus one.",
          },
          { cells: ["Ammonium nitrate", "Nitrogen (N)", "Common N fertilizer" ] },
          { cells: ["Ammonium sulphate", "Nitrogen (N)", "Common N fertilizer" ] },
          { cells: ["Superphosphate of lime", "Phosphorus (P)", "Made from rock phosphate + H₂SO₄"] },
          { cells: ["Muriate of potash (KCl)", "Potassium (K)", "Main K source"] },
          {
            cells: ["Ammonium sulphide ((NH₄)₂S)", "None — not a fertilizer", "A lab reagent"],
            noteAmber: "Ammonium SULPHIDE is the odd one out — it is NOT used as a fertilizer (sulphate, nitrate and phosphate of ammonium all are).",
          },
        ],
      },
      pyqExampleId: "b9709372-500b-4178-aed9-dcab29c4f198", // ammonium sulphide NOT a fertilizer
      selfCheckExample: {
        prompt: "A student says 'urea supplies phosphorus to the soil'. Is this correct? Which nutrient does urea actually supply?",
        steps: [
          "Urea is CO(NH₂)₂ — its only nutrient element is nitrogen.",
          "It contains no phosphorus atom at all.",
        ],
        answer: "Incorrect — urea is a nitrogen fertilizer (≈ 46% N) and supplies no phosphorus.",
      },
      practiceSet: [
        { prompt: "Which nutrient does urea supply?", answer: "Nitrogen (N)" },
        { prompt: "Which of ammonium nitrate, ammonium sulphide, ammonium phosphate, ammonium sulphate is NOT a fertilizer?", answer: "Ammonium sulphide" },
        { prompt: "Which nutrient does muriate of potash (KCl) supply?", answer: "Potassium (K)" },
        { prompt: "Is urea a phosphorus fertilizer?", answer: "No — it is a nitrogen fertilizer" },
      ],
      traps: [
        {
          title: "Urea = nitrogen, never phosphorus",
          body:
            "'Urea is a phosphorus-containing fertilizer' is FALSE. Urea (CO(NH₂)₂) supplies nitrogen only. Phosphorus comes from superphosphate, not urea.",
        },
        {
          title: "Ammonium sulphide is not a fertilizer",
          body:
            "Ammonium nitrate, sulphate and phosphate are all fertilizers; ammonium SULPHIDE is not — it is an analytical reagent. The bank lists three real ammonium fertilizers plus the sulphide as the trap.",
        },
      ],
    },

    // manufacture: superphosphate + nitrolim (reference)
    {
      kind: "reference" as const,
      slug: "fertilizer-manufacture",
      name: "How superphosphate and nitrolim are made",
      intuition:
        "A couple of fertilizers come with a 'how is it made?' question. Superphosphate is rock phosphate treated with sulphuric acid; nitrolim is calcium carbide heated with nitrogen. Learn the reaction in one line each.",
      definition:
        "The manufacturing facts the bank tests:\n" +
        "- **Superphosphate of lime** is made by treating **calcium phosphate (rock phosphate) with sulphuric acid** — this converts insoluble phosphate into a soluble (plant-available) form.\n" +
        "- **Nitrolim (calcium cyanamide)** is made by **heating calcium carbide (CaC₂) with nitrogen**: CaC₂ + N₂ → CaCN₂ + C. In soil it slowly **decomposes to release ammonia**.\n" +
        "- Nitrolim supplies **nitrogen only** — it is **inorganic** and is **NOT an NPK fertilizer**.",
      table: {
        columns: ["Fertilizer", "Made from", "Key fact"],
        rows: [
          {
            cells: ["Superphosphate of lime", "Calcium phosphate + sulphuric acid", "Makes phosphate soluble"],
            noteAmber: "Superphosphate = rock phosphate (calcium phosphate) treated with H₂SO₄.",
          },
          {
            cells: ["Nitrolim (calcium cyanamide)", "Calcium carbide (CaC₂) + nitrogen", "Decomposes to ammonia in soil"],
            noteAmber: "Nitrolim supplies nitrogen only, is inorganic, and is NOT an NPK fertilizer.",
          },
        ],
      },
      pyqExampleId: "acd96ba0-14d5-4db6-9993-e5ea1d0ad08a", // nitrolim statements
      practiceSet: [
        { prompt: "Superphosphate of lime is made by reacting calcium phosphate with what?", answer: "Sulphuric acid (H₂SO₄)" },
        { prompt: "Nitrolim is prepared by heating calcium carbide with what?", answer: "Nitrogen (N₂)" },
        { prompt: "What does nitrolim decompose into in the soil?", answer: "Ammonia" },
        { prompt: "Is nitrolim an NPK fertilizer?", answer: "No — it supplies nitrogen only and is inorganic" },
      ],
      traps: [
        {
          title: "Nitrolim is N-only and inorganic",
          body:
            "Nitrolim (calcium cyanamide) supplies nitrogen ONLY — it is NOT an NPK fertilizer and NOT organic. The two correct statements about it are: made from calcium carbide + nitrogen, and decomposes to ammonia in soil.",
        },
      ],
    },
  ],
};
