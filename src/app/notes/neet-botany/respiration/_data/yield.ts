import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_RS_YIELD_NOTE: SubtopicNote = {
  subtopicName: "Energy Yield and Respiratory Quotient",
  title: "Energy Yield and Respiratory Quotient",
  oneLineDefinition:
    "How many ATP one glucose gives in aerobic respiration and the assumptions behind that count, how fats and proteins enter the same pathway, why it is called amphibolic, and how to work out the respiratory quotient of a substrate.",
  whyItMatters:
    "Two NEET questions, one in NEET 2021 (how many ATP one NADH and one FADH₂ give) and one in NEET 2026 (the respiratory quotient of a fat from its equation). Both are numbers, so learn the ATP count and the RQ formula well enough to work them out.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nbors-balance-sheet",
      name: "The respiratory balance sheet",
      intuition:
        "To count the ATP from one glucose, list what each stage hands over. Some ATP is made directly. Most comes later, when the ETS cashes in the NADH and FADH₂: each NADH is worth 3 ATP and each FADH₂ is worth 2. Add it all up and one glucose gives 38 ATP. NCERT calls this a theoretical count, because it rests on assumptions a real cell does not always keep.",
      definition:
        "What NCERT says:\n" +
        "- Oxidation of one **NADH** gives **3 ATP**; oxidation of one **FADH₂** gives **2 ATP**.\n" +
        "- Per glucose: glycolysis gives **2 ATP** and **2 NADH**; pyruvic acid to acetyl CoA gives **2 NADH**; the Krebs cycle (two turns) gives **2 ATP**, **6 NADH** and **2 FADH₂**.\n" +
        "- So there can be a **net gain of 38 ATP** in the aerobic respiration of one glucose.\n" +
        "- The count is possible only on these **assumptions**:\n" +
        "- The pathway runs in order, one substrate forming the next: glycolysis, then the TCA cycle, then the ETS.\n" +
        "- The NADH made in glycolysis is carried into the mitochondria and undergoes oxidative phosphorylation.\n" +
        "- None of the intermediates is used to make any other compound.\n" +
        "- Only glucose is being respired; no other substrate enters at any stage.\n" +
        "- In a living cell these do not all hold, so the balance sheet is a theoretical exercise.",
      formula: {
        label: "ATP from one glucose (aerobic)",
        latex: "\\text{ATP} = 4 + (10 \\times 3) + (2 \\times 2) = 38",
        symbols: [
          { symbol: "4", meaning: "ATP made directly: 2 in glycolysis and 2 in the Krebs cycle" },
          { symbol: "10 × 3", meaning: "10 NADH + H⁺ per glucose, 3 ATP from each" },
          { symbol: "2 × 2", meaning: "2 FADH₂ per glucose, 2 ATP from each" },
        ],
      },
      authoredExample: {
        prompt: "Work out the net ATP from the complete aerobic oxidation of one glucose molecule, stage by stage.",
        steps: [
          "Glycolysis: 2 ATP net, plus 2 NADH, worth \\(2 \\times 3 = 6\\). Total 8.",
          "Two pyruvic acid to two acetyl CoA: 2 NADH, worth \\(2 \\times 3 = 6\\).",
          "Two turns of the Krebs cycle: 2 ATP, plus 6 NADH worth \\(6 \\times 3 = 18\\), plus 2 FADH₂ worth \\(2 \\times 2 = 4\\). Total 24.",
          "Add the stages: \\(8 + 6 + 24 = 38\\).",
        ],
        answer: "38 ATP.",
      },
      pyqExampleId: "39ac3588-ff4d-4c34-8219-66553ed9dc40",
      selfCheckExample: {
        prompt: "One glucose has gone through glycolysis. How many ATP will the complete aerobic oxidation of its two pyruvic acid molecules give?",
        steps: [
          "Two pyruvic acid to acetyl CoA: 2 NADH, worth 6 ATP.",
          "Two turns of the Krebs cycle: 2 ATP, 6 NADH (18 ATP) and 2 FADH₂ (4 ATP), so 24.",
          "\\(6 + 24 = 30\\). This is the 38 for glucose less the 8 from glycolysis.",
        ],
        answer: "30 ATP.",
      },
      practiceSet: [
        { prompt: "How many NADH + H⁺ molecules does the complete aerobic oxidation of one glucose produce in all?", answer: "10 (2 in glycolysis, 2 from pyruvic acid to acetyl CoA, 6 in the Krebs cycle)" },
        { prompt: "How many FADH₂ molecules does the complete aerobic oxidation of one glucose produce?", answer: "2" },
        { prompt: "How many ATP do 5 glucose molecules give in complete aerobic respiration, by the balance sheet?", answer: "190", method: "\\(5 \\times 38\\)" },
        { prompt: "How many times more ATP does aerobic respiration of a glucose give than fermentation of a glucose?", answer: "19 times", method: "\\(38 \\div 2\\)" },
        { prompt: "Of the 38 ATP in the balance sheet for one glucose, how many come from NADH + H⁺?", answer: "30", method: "\\(10 \\times 3\\)" },
        { prompt: "Name one assumption behind the figure of 38 ATP per glucose.", answer: "Any one: the pathway runs in order; glycolysis NADH enters the mitochondria; no intermediate is drawn off; only glucose is respired" },
      ],
      traps: [
        {
          title: "NADH is worth 3, FADH₂ is worth 2",
          body: "One **NADH** gives **3 ATP** and one **FADH₂** gives **2 ATP**. A statement that swaps them is false.",
        },
        {
          title: "38 is a theoretical figure",
          body: "The net gain of **38 ATP** holds only on NCERT's assumptions (orderly pathway, glycolysis NADH entering the mitochondria, no intermediate drawn off, only glucose respired). In a living cell these do not all hold.",
        },
        {
          title: "Count both turns of the Krebs cycle",
          body: "One glucose gives **two** pyruvic acid, so the link step and the Krebs cycle run **twice** per glucose. Counting one turn gives a total that is far too low.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbors-rq",
      name: "Respiratory substrates and the respiratory quotient",
      intuition:
        "Glucose is not the only fuel. Fats and proteins are first broken into pieces that join the same pathway at different points, so the pathway both breaks down and builds up molecules. The respiratory quotient tells you which fuel is burning: divide the CO₂ given out by the O₂ taken in. Carbohydrates give exactly 1; fats need extra oxygen, so they give less than 1.",
      definition:
        "Respiratory substrates (NCERT):\n" +
        "- **Glucose** is the favoured substrate. Other carbohydrates are first converted to glucose.\n" +
        "- **Fats** are broken into **glycerol** and **fatty acids**. Fatty acids are degraded to **acetyl CoA**; glycerol enters after being converted to **PGAL**.\n" +
        "- **Proteins** are broken by **proteases** into amino acids, which (after **deamination**) enter within the **Krebs cycle**, or as **pyruvic acid** or **acetyl CoA**.\n" +
        "- When fatty acids are made, acetyl CoA is **withdrawn** from the pathway. Since the pathway serves both breaking down and building up, it is better called an **amphibolic pathway** than a catabolic one.\n\n" +
        "Respiratory quotient (RQ):\n" +
        "- RQ is the ratio of the **volume of CO₂ evolved** to the **volume of O₂ consumed** in respiration. It depends on the substrate.\n" +
        "- **Carbohydrates**: RQ = **1** (equal CO₂ and O₂).\n" +
        "- **Fats**: RQ **less than 1**. Tripalmitin: \\(2(\\text{C}_{51}\\text{H}_{98}\\text{O}_6) + 145\\,\\text{O}_2 \\rightarrow 102\\,\\text{CO}_2 + 98\\,\\text{H}_2\\text{O} + \\text{energy}\\), RQ = 0.7.\n" +
        "- **Proteins**: RQ about **0.9**.\n" +
        "- In living organisms the substrate is often a mixture; pure proteins or fats are never used as respiratory substrates.",
      formula: {
        label: "Respiratory quotient",
        latex: "\\text{RQ} = \\dfrac{\\text{volume of CO}_2\\text{ evolved}}{\\text{volume of O}_2\\text{ consumed}}",
        symbols: [
          { symbol: "Volume of CO₂ evolved", meaning: "the CO₂ given out, read from the number of CO₂ molecules in the balanced equation" },
          { symbol: "Volume of O₂ consumed", meaning: "the O₂ taken in, read from the number of O₂ molecules in the balanced equation" },
        ],
      },
      authoredExample: {
        prompt: "Glucose is respired completely: \\(\\text{C}_6\\text{H}_{12}\\text{O}_6 + 6\\text{O}_2 \\rightarrow 6\\text{CO}_2 + 6\\text{H}_2\\text{O} + \\text{energy}\\). What is the RQ?",
        steps: [
          "CO₂ evolved: 6. O₂ consumed: 6.",
          "\\(\\text{RQ} = 6 \\div 6 = 1\\).",
        ],
        answer: "RQ = 1.0, as for any carbohydrate.",
      },
      pyqExampleId: "ee93ff0a-0ecb-4d51-9b99-5950f662373e",
      selfCheckExample: {
        prompt: "A seed respires stearic acid: \\(\\text{C}_{18}\\text{H}_{36}\\text{O}_2 + 26\\,\\text{O}_2 \\rightarrow 18\\,\\text{CO}_2 + 18\\,\\text{H}_2\\text{O} + \\text{energy}\\). What is the RQ, and what kind of substrate does it point to?",
        steps: [
          "CO₂ evolved: 18. O₂ consumed: 26.",
          "\\(\\text{RQ} = 18 \\div 26 \\approx 0.69\\).",
          "An RQ below 1 is what fats give.",
        ],
        answer: "About 0.69, less than 1: a fat (a fatty acid).",
      },
      practiceSet: [
        { prompt: "What is the respiratory quotient when proteins are the respiratory substrate?", answer: "About 0.9" },
        { prompt: "A tissue takes up 10 volumes of O₂ and gives out 8 volumes of CO₂. What is its RQ?", answer: "0.8", method: "\\(8 \\div 10\\)" },
        { prompt: "In what form do fatty acids enter the respiratory pathway?", answer: "As acetyl CoA" },
        { prompt: "After being converted to which compound does glycerol enter the respiratory pathway?", answer: "PGAL (3-phosphoglyceraldehyde)" },
        { prompt: "Why does NCERT call the respiratory pathway amphibolic rather than catabolic?", answer: "It is used both to break down substrates and to build compounds such as fatty acids" },
        { prompt: "What must happen to amino acids before they enter the respiratory pathway?", answer: "Deamination" },
      ],
      traps: [
        {
          title: "CO₂ on top, O₂ below",
          body: "RQ = **CO₂ evolved ÷ O₂ consumed**. Dividing O₂ by CO₂ turns a fat's 0.7 into a value above 1.",
        },
        {
          title: "Fats give less than 1, not more",
          body: "Fats such as **tripalmitin** need more oxygen than the CO₂ they give out, so their RQ is **less than 1** (0.7). Carbohydrates give exactly **1**; proteins about **0.9**.",
        },
        {
          title: "Glycerol and fatty acids enter at different points",
          body: "**Fatty acids** enter as **acetyl CoA**; **glycerol** enters as **PGAL**. Do not send glycerol in as acetyl CoA.",
        },
      ],
    },
  ],
};
