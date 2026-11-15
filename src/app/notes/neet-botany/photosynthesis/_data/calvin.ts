import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_PS_CALVIN_NOTE: SubtopicNote = {
  subtopicName: "Calvin Cycle",
  title: "Calvin Cycle",
  oneLineDefinition:
    "How the ATP and NADPH of the light reaction are used to fix CO₂ into sugar: the three stages of the Calvin cycle, the enzyme RuBisCO, and how many ATP, NADPH and turns each sugar costs.",
  whyItMatters:
    "Eight NEET questions from 2023 to 2026, three of them in 2026. The count of ATP and NADPH was asked four times (NEET 2023, NEET 2024, NEET 2026 and Re-NEET 2026), so learn 3 ATP and 2 NADPH for each CO₂ and six turns for each glucose. RuBisCO was asked in NEET 2025 and NEET 2026.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbops-calvin-stages",
      name: "The three stages and RuBisCO",
      intuition:
        "The light reaction makes ATP and NADPH; the Calvin cycle spends them to turn CO₂ into sugar. A 5-carbon sugar, RuBP, picks up CO₂, the product is reduced to sugar, and RuBP is made again so the cycle can turn once more. It does not need light directly, but it stops without the ATP and NADPH that light makes.",
      definition:
        "The biosynthetic phase, as NCERT gives it:\n" +
        "- It needs **CO₂, ATP and NADPH**. It does not use light directly, but depends on the products of the light reaction. Calling it the **dark reaction** does **not** mean it happens in the dark.\n" +
        "- **Melvin Calvin**, using radioactive **¹⁴C** in algae, found the first product of CO₂ fixation to be a 3-carbon acid, **3-phosphoglyceric acid (PGA)**. Hence the name **C₃ pathway**.\n" +
        "- The **primary CO₂ acceptor** is **ribulose bisphosphate (RuBP)**, a **5-carbon ketose sugar**.\n" +
        "- The Calvin cycle runs in **all photosynthetic plants**, whether C₃ or C₄.\n" +
        "- **RuBisCO** (RuBP carboxylase-oxygenase) is the **most abundant enzyme in the world**. Its active site can bind both CO₂ and O₂, but it has a **much greater affinity for CO₂**.",
      table: {
        columns: ["Stage", "What happens", "Cost for each CO₂ fixed"],
        rows: [
          {
            cells: ["1. Carboxylation", "CO₂ is fixed onto RuBP by RuBisCO, giving two molecules of 3-PGA. The most crucial step.", "No ATP or NADPH"],
            noteAmber: "NEET 2026: the enzyme of carboxylation is RuBP carboxylase-oxygenase.",
            pyqExampleId: "ad263459-600f-4fca-a606-e468965e2f30",
          },
          { cells: ["2. Reduction", "A series of reactions that lead to glucose; ATP is used for phosphorylation and NADPH for reduction", "2 ATP and 2 NADPH"] },
          { cells: ["3. Regeneration", "RuBP, the CO₂ acceptor, is formed again so the cycle continues", "1 ATP"] },
        ],
        caption: "Re-NEET 2024 asked to name the three stages in order on a figure: carboxylation, reduction, regeneration. NEET 2024 asked what the dark reaction needs: CO₂, ATP and NADPH, not light or chlorophyll.",
      },
      pyqExampleId: "ff1cf4ff-0297-44cc-a518-f16ac8b11fa4",
      selfCheckExample: {
        prompt: "In the Calvin cycle, which molecule accepts CO₂, how many carbons does it have, and what is formed?",
        steps: [
          "The acceptor is ribulose bisphosphate (RuBP), a 5-carbon sugar.",
          "RuBisCO joins CO₂ to it, and the product splits into two 3-carbon molecules.",
        ],
        answer: "RuBP (5 carbons); two molecules of 3-phosphoglyceric acid are formed.",
      },
      practiceSet: [
        { prompt: "Which scientist worked out the C₃ pathway using radioactive ¹⁴C?", answer: "Melvin Calvin" },
        { prompt: "What is the first stable product of CO₂ fixation in the Calvin cycle?", answer: "3-phosphoglyceric acid (PGA), a 3-carbon acid" },
        { prompt: "Which stage of the Calvin cycle uses 1 ATP and no NADPH for each CO₂?", answer: "Regeneration" },
        { prompt: "Which is the most abundant enzyme in the world?", answer: "RuBisCO" },
        { prompt: "Does the Calvin cycle run in C₃ plants only, or in C₃ and C₄ plants?", answer: "In both: in all photosynthetic plants" },
      ],
      traps: [
        {
          title: "The dark reaction also runs in light",
          body: "It is called the **dark reaction** only because it does not use light **directly**. It needs the **ATP and NADPH** made in light, so it runs in the light, not only at night.",
        },
        {
          title: "Light and chlorophyll are not inputs of the Calvin cycle",
          body: "The Calvin cycle needs **CO₂, ATP and NADPH**. Light and chlorophyll are needs of the **light reaction**.",
        },
        {
          title: "RuBP is the acceptor, PGA the product",
          body: "**RuBP** is the **5-carbon** acceptor. **3-PGA** is the **3-carbon** first product. Do not swap them.",
        },
        {
          title: "RuBisCO is not PEP carboxylase",
          body: "The Calvin cycle enzyme is **RuBisCO** (RuBP carboxylase-oxygenase). **PEP carboxylase** fixes CO₂ in the mesophyll of C₄ plants. RuBisCO has a **greater affinity for CO₂** than for O₂.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbops-calvin-count",
      name: "Counting ATP, NADPH and turns",
      intuition:
        "Each turn of the Calvin cycle fixes one CO₂ and costs 3 ATP and 2 NADPH. Glucose has six carbons, so one glucose needs six turns. Every count question is these two facts multiplied out.",
      definition:
        "The arithmetic of the Calvin cycle:\n" +
        "- For **each CO₂** fixed: **3 ATP** (2 in reduction, 1 in regeneration) and **2 NADPH** (in reduction).\n" +
        "- **One glucose** needs **6 CO₂**, so **6 turns** of the cycle.\n" +
        "- NCERT's table for one glucose: **in**, 6 CO₂, 18 ATP and 12 NADPH; **out**, 1 glucose, 18 ADP and 12 NADP.\n" +
        "- The cycle uses more ATP than NADPH. NCERT suggests that **cyclic photophosphorylation**, which makes ATP only, probably makes up this difference.",
      formula: {
        label: "Cost of the Calvin cycle",
        latex:
          "\\text{per CO}_2: 3\\,\\text{ATP} + 2\\,\\text{NADPH} \\qquad \\text{per glucose}: 6 \\times (3\\,\\text{ATP} + 2\\,\\text{NADPH}) = 18\\,\\text{ATP} + 12\\,\\text{NADPH}",
        symbols: [
          { symbol: "per CO₂", meaning: "one turn of the cycle" },
          { symbol: "6", meaning: "turns (CO₂ molecules) for one glucose" },
        ],
      },
      authoredExample: {
        prompt: "How many turns of the Calvin cycle, and how many ATP and NADPH, are needed to make two molecules of glucose?",
        steps: [
          "One glucose needs 6 turns, so two need \\(2 \\times 6 = 12\\) turns.",
          "Each turn uses 3 ATP: \\(12 \\times 3 = 36\\) ATP.",
          "Each turn uses 2 NADPH: \\(12 \\times 2 = 24\\) NADPH.",
        ],
        answer: "12 turns, 36 ATP and 24 NADPH.",
      },
      pyqExampleId: "e511dbb7-2d38-4862-8f25-247b45bd0187",
      selfCheckExample: {
        prompt: "A leaf fixes 15 molecules of CO₂ in the Calvin cycle. How many ATP and how many NADPH does it use?",
        steps: [
          "Each CO₂ costs 3 ATP: \\(15 \\times 3 = 45\\).",
          "Each CO₂ costs 2 NADPH: \\(15 \\times 2 = 30\\).",
        ],
        answer: "45 ATP and 30 NADPH.",
      },
      practiceSet: [
        { prompt: "How many molecules of CO₂ must be fixed to make one molecule of glucose?", answer: "6" },
        { prompt: "How many turns of the Calvin cycle make 4 molecules of glucose?", answer: "24" },
        { prompt: "How many NADPH are used to fix 9 molecules of CO₂?", answer: "18" },
        { prompt: "How many ATP does the regeneration stage use in making one glucose?", answer: "6 (1 for each of the 6 turns)" },
        { prompt: "How many ATP does the reduction stage use in making one glucose?", answer: "12 (2 for each of the 6 turns)" },
      ],
      traps: [
        {
          title: "18 ATP and 12 NADPH, not the other way round",
          body: "For one glucose the cycle uses **18 ATP** and **12 NADPH**: 3 ATP but only 2 NADPH per CO₂. So ATP is always the larger number.",
        },
        {
          title: "Turns count CO₂, not glucose",
          body: "One turn fixes **one CO₂**. One glucose needs **6 turns**, so multiply the number of glucose molecules by 6 to get the turns.",
        },
      ],
    },
  ],
};
