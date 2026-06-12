import type { SubtopicNote } from "@/app/notes/_types";

export const FOOD_SPOILAGE_NOTE: SubtopicNote = {
  subtopicName: "Food Spoilage — Rancidity and Browning",
  title: "Food Spoilage — Rancidity and Browning",
  oneLineDefinition:
    "Food goes bad mainly through oxidation: fats and oils turn rancid when oxidised by air, and cut fruit browns when the enzyme polyphenol oxidase oxidises its compounds — both slowed by keeping oxygen away.",
  whyItMatters:
    "The NDA tests this as everyday-science recall — what happens to fats left in air (oxidation → rancidity) and how to stop a cut apple browning (lemon juice). " +
    "The common thread is oxidation by oxygen, and the fixes all work by blocking oxygen or an antioxidant. EASY recall.",
  concepts: [
    // Rancidity (PYQ 129f4393)
    {
      kind: "formula" as const,
      slug: "biochem-rancidity",
      name: "Rancidity — the oxidation of fats and oils",
      intuition:
        "Leave butter, cooking oil or fried snacks out in the air long enough and they develop a stale, unpleasant smell and taste. " +
        "That is rancidity: the oxygen in air slowly oxidises the fats and oils, breaking them into smelly compounds.",
      definition:
        "**Rancidity** is the **oxidation of fats and oils** by atmospheric oxygen, producing the off-flavours and bad smell of spoiled fatty food.\n" +
        "Ways to slow it down — all work by keeping oxygen away or scavenging it:\n" +
        "- Add **antioxidants** (e.g. BHA, BHT) to packaged fatty food.\n" +
        "- Store in **airtight** containers and **refrigerate** (cold slows the reaction).\n" +
        "- **Flush packets with nitrogen** gas (replacing the oxygen — why chip packets are puffed with N₂).\n" +
        "- Keep food **away from light**.",
      formula: {
        label: "What rancidity is",
        latex: "\\text{fats / oils} + O_2 \\;\\to\\; \\text{oxidised (rancid) products}",
      },
      authoredExample: {
        prompt:
          "Why are packets of potato chips often filled with nitrogen gas instead of ordinary air?",
        steps: [
          "Rancidity is caused by oxygen oxidising the fats/oils in the chips.",
          "Nitrogen is unreactive and displaces the oxygen, so there is no O₂ left to oxidise the fat.",
        ],
        answer:
          "Nitrogen removes oxygen from the packet, preventing oxidation (rancidity) of the fatty chips.",
      },
      pyqExampleId: "129f4393-40fc-4006-81f3-618d9ef927dc", // fats oxidised
      traps: [
        {
          title: "Rancidity is OXIDATION, not reduction or freezing",
          body:
            "Fats left in air get **oxidised** (not reduced, not 'ice-covered'). The whole point is that atmospheric **oxygen** attacks the fat — so every prevention method works by removing or blocking oxygen.",
        },
      ],
    },

    // Enzymatic browning (PYQ 2b37b3bc)
    {
      kind: "formula" as const,
      slug: "biochem-enzymatic-browning",
      name: "Enzymatic browning of cut fruit",
      intuition:
        "Slice an apple, potato or banana and the exposed surface turns brown within minutes. " +
        "An enzyme in the fruit reacts with oxygen in the air to make brown pigments — and a squeeze of lemon juice stops it.",
      definition:
        "**Enzymatic browning** is the browning of cut fruit and vegetables, caused by the enzyme **polyphenol oxidase (PPO)** oxidising the fruit's phenolic compounds (using atmospheric O₂) into brown pigments.\n" +
        "Ways to prevent it:\n" +
        "- **Lemon juice** — its **ascorbic acid (vitamin C) and citric acid** are acidic antioxidants that inhibit the enzyme (the bank's answer).\n" +
        "- **Dipping in cold water or salt water** — limits contact with oxygen.\n" +
        "- **Blanching** (brief heating) — denatures the enzyme.",
      formula: {
        label: "What enzymatic browning is",
        latex:
          "\\text{phenols} + O_2 \\;\\xrightarrow{\\text{polyphenol oxidase}}\\; \\text{brown pigments}",
      },
      authoredExample: {
        prompt:
          "A cook sprinkles lemon juice on freshly cut apple slices to keep them looking fresh for a fruit salad. How does this work?",
        steps: [
          "Apple browning is caused by the enzyme polyphenol oxidase oxidising the fruit's compounds in air.",
          "Lemon juice is acidic and contains vitamin C (an antioxidant), which inhibits the enzyme.",
        ],
        answer:
          "The acid/antioxidant in lemon juice inhibits polyphenol oxidase, preventing browning.",
      },
      pyqExampleId: "2b37b3bc-8f44-4da5-b8d4-f2dfd704d078", // lemon juice browning
      traps: [
        {
          title: "Lemon juice stops browning — not sugar or milk of magnesia",
          body:
            "The browning fix is **lemon juice** (acidic + vitamin C, inhibits the enzyme). Table sugar, a closed container alone, or milk of magnesia (a base) are distractors. Browning needs the enzyme + oxygen; an acid antioxidant is what stops it.",
        },
        {
          title: "Rancidity vs enzymatic browning",
          body:
            "Both are oxidation, but **rancidity** is the oxidation of **fats/oils** (no enzyme needed), while **browning** is an **enzyme-driven** (polyphenol oxidase) oxidation of cut **fruit/vegetables**. Don't merge them.",
        },
      ],
    },
  ],
};
