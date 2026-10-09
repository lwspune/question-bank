import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_BEM_FERMENTATION_NOTE: SubtopicNote = {
  subtopicName: "Anaerobic Respiration and Fermentation",
  title: "Fermentation: Respiration Without Oxygen",
  oneLineDefinition:
    "Without oxygen, cells keep glycolysis running by using pyruvate to reoxidise NADH, making lactate in muscle or ethanol and CO₂ in yeast, for only 2 ATP per glucose.",
  whyItMatters:
    "The 2025 paper asked what happens to pyruvate in lactic fermentation, and 2023 asked for a ranking of pathways by the ATP they make. Older papers asked where both kinds of fermentation happen, which end products belong to muscle and to yeast, and what a muscle produces during vigorous exercise.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bem-lactic-alcoholic",
      name: "Lactic and alcoholic fermentation compared",
      intuition:
        "Without oxygen the respiratory chain stops, so NADH cannot be reoxidised. Glycolysis would then stop too, because it needs a supply of \\(\\mathrm{NAD^+}\\). Fermentation solves this: pyruvate, or a molecule made from it, takes the electrons back from NADH, so \\(\\mathrm{NAD^+}\\) is regenerated and glycolysis can keep making its 2 ATP.",
      definition:
        "- Both kinds happen in the **cytoplasm**. Mitochondria are not involved.\n" +
        "- **Lactic fermentation** (muscle during vigorous exercise, red blood cells, lactic acid bacteria in yoghurt): pyruvate + NADH \\(\\rightarrow\\) **lactate** + \\(\\mathrm{NAD^+}\\), catalysed by lactate dehydrogenase. Pyruvate is **reduced**. No \\(\\mathrm{CO_2}\\) is released.\n" +
        "- **Alcoholic fermentation** (yeast, plant roots in waterlogged soil): pyruvate is first **decarboxylated** to ethanal (acetaldehyde), releasing \\(\\mathrm{CO_2}\\); ethanal is then **reduced** by NADH to **ethanol**.\n" +
        "- Yield: **2 ATP per glucose**, all from glycolysis. The fermentation step itself makes no ATP; its job is to regenerate \\(\\mathrm{NAD^+}\\).\n" +
        "- In humans, lactate travels in the blood to the liver, which turns it back into pyruvate and glucose. The extra oxygen taken in after exercise (the oxygen debt) pays for this.\n" +
        "- Strictly, **anaerobic respiration** uses an electron transport chain with a final acceptor other than oxygen (some bacteria use nitrate or sulfate), while fermentation uses no chain. School books often use the two names for the same thing.",
      table: {
        columns: ["Feature", "Lactic fermentation", "Alcoholic fermentation"],
        rows: [
          { cells: ["Where it occurs", "Animal muscle, red blood cells, lactic acid bacteria", "Yeast, some plant cells"] },
          { cells: ["Site in the cell", "Cytoplasm", "Cytoplasm"] },
          { cells: ["End products", "Lactate", "Ethanol and CO₂"] },
          { cells: ["CO₂ released", "No", "Yes, one per pyruvate"] },
          { cells: ["What happens to pyruvate", "Reduced directly to lactate", "Decarboxylated to ethanal, which is then reduced"] },
          { cells: ["ATP per glucose", "2", "2"] },
          { cells: ["Everyday use", "Yoghurt and cheese making", "Bread rising, beer and wine"] },
        ],
      },
      selfCheckExample: {
        prompt: "Bread dough rises because the yeast in it releases a gas. Which statement about this is correct?",
        options: [
          "The gas is oxygen, released during glycolysis",
          "The gas is \\(\\mathrm{CO_2}\\), released when pyruvate is reduced to lactate",
          "The gas is made in the mitochondrial matrix of the yeast",
          "The process makes about 30 ATP per glucose",
          "The gas is \\(\\mathrm{CO_2}\\), released when pyruvate is decarboxylated before ethanol is formed",
        ],
        steps: [
          "In dough the yeast is short of oxygen, so it ferments: pyruvate loses \\(\\mathrm{CO_2}\\) to give ethanal, which is reduced to ethanol.",
          "B mixes in lactic fermentation, which releases no gas. A is wrong: no stage of respiration releases oxygen.",
          "C and D are wrong: fermentation runs in the cytoplasm and gives only 2 ATP per glucose.",
        ],
        answer: "(E) The gas is \\(\\mathrm{CO_2}\\), released when pyruvate is decarboxylated before ethanol is formed",
      },
      practiceSet: [
        { prompt: "In a muscle short of oxygen, which molecule gives its electrons to pyruvate?", answer: "NADH, which becomes \\(\\mathrm{NAD^+}\\)" },
        { prompt: "Which product of alcoholic fermentation is a gas?", answer: "\\(\\mathrm{CO_2}\\)" },
        { prompt: "Why do red blood cells make all their ATP by glycolysis and lactic fermentation?", answer: "They have no mitochondria" },
        { prompt: "Name the organ that converts lactate back into glucose.", answer: "The liver" },
      ],
      traps: [
        {
          title: "Fermentation regenerates NAD⁺; it makes no extra ATP",
          body: "All the ATP of fermentation, 2 per glucose, comes from glycolysis. The step from pyruvate to lactate or ethanol makes no ATP; it only reoxidises NADH so that glycolysis can continue.",
        },
        {
          title: "Only alcoholic fermentation releases CO₂",
          body: "Lactic fermentation keeps all 3 carbons of pyruvate in lactate. Alcoholic fermentation removes one as \\(\\mathrm{CO_2}\\). Exercising muscle does still release \\(\\mathrm{CO_2}\\), but that comes from its aerobic respiration running at the same time, not from lactic fermentation.",
        },
        {
          title: "Both fermentations happen in the cytoplasm",
          body: "Neither kind uses mitochondria. Options placing fermentation in the matrix or on the cristae are wrong for yeast and for muscle alike.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bem-anaerobic-yield",
      name: "Comparing ATP yields: fermentation against aerobic respiration",
      intuition:
        "Fermentation stops after glycolysis, so most of the energy of glucose stays locked in lactate or ethanol. Aerobic respiration oxidises glucose all the way to \\(\\mathrm{CO_2}\\) and water and gets about 15 times as much ATP from each glucose. A fermenting cell must therefore use glucose much faster to keep up.",
      definition:
        "- Fermentation: **2 ATP per glucose**. Aerobic respiration: **about 30 to 32 ATP per glucose**. The ratio is about 15 to 16.\n" +
        "- Glycolysis alone gives the same net 2 ATP per glucose, whatever happens to the pyruvate afterwards.\n" +
        "- The respiratory chain stage (oxidative phosphorylation) gives about 26 to 28 ATP per glucose: more than any other stage.\n" +
        "- To compare pathways that use different amounts of glucose, compare **totals**: number of glucose multiplied by ATP per glucose.",
      formula: {
        label: "Total ATP from a pathway",
        latex: "\\text{total ATP} = (\\text{number of glucose}) \\times (\\text{ATP per glucose for that pathway})",
        symbols: [
          { symbol: "\\(2\\)", meaning: "ATP per glucose for glycolysis alone, or glycolysis + fermentation" },
          { symbol: "\\(30 \\text{ to } 32\\)", meaning: "ATP per glucose for complete aerobic respiration (approximate)" },
        ],
      },
      authoredExample: {
        prompt:
          "During a hard 400 m race, suppose a leg muscle breaks down 50 glucose molecules by lactic fermentation and 5 by aerobic respiration (take 30 ATP per glucose). What fraction of its ATP comes from fermentation?",
        steps: [
          "Fermentation: \\(50 \\times 2 = 100\\) ATP.",
          "Aerobic respiration: \\(5 \\times 30 = 150\\) ATP.",
          "Total: \\(100 + 150 = 250\\) ATP, so fermentation supplies \\(100 / 250 = 40\\%\\).",
          "Fermentation gives a large share only because ten times as much glucose goes through it.",
        ],
        answer: "40% of the ATP",
      },
      selfCheckExample: {
        prompt:
          "Yeast growing in air is moved into a sealed flask with no oxygen. Taking 32 ATP per glucose for aerobic respiration, roughly how many times faster must the yeast use glucose to make ATP at the same rate as before?",
        options: ["2 times", "8 times", "16 times", "30 times", "64 times"],
        steps: [
          "Without oxygen the yeast ferments, gaining 2 ATP per glucose instead of 32.",
          "To make the same ATP it needs \\(32 / 2 = 16\\) times as much glucose in the same time.",
          "A confuses the ATP per glucose with the ratio; E multiplies instead of dividing.",
        ],
        answer: "(C) 16 times",
      },
      practiceSet: [
        { prompt: "How many ATP does lactic fermentation of 12 glucose molecules give?", answer: "24", method: "\\(12 \\times 2\\)" },
        { prompt: "How many net ATP does glycolysis of 5 glucose molecules give?", answer: "10", method: "\\(5 \\times 2\\)" },
        {
          prompt: "Rank by total ATP, largest first: (1) lactic fermentation of 10 glucose; (2) aerobic respiration of 1 glucose, at 30 ATP; (3) alcoholic fermentation of 20 glucose.",
          answer: "3, 2, 1",
          method: "40, 30 and 20 ATP",
        },
      ],
      traps: [
        {
          title: "Compare totals, not yields per glucose",
          body: "Per glucose, aerobic respiration always beats fermentation. But a ranking question may give different numbers of glucose for each pathway; then multiply first. Many fermented glucose molecules can out-produce one glucose respired aerobically.",
        },
      ],
    },
  ],
};
