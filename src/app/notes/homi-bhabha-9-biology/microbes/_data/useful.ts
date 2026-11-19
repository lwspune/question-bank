import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MC_USEFUL_NOTE: SubtopicNote = {
  subtopicName: "Microbes in Food and Medicine",
  title: "Microbes in Food and Medicine",
  oneLineDefinition:
    "Lactobacilli make curd and shrikhand, yeast makes bread rise and turns molasses into alcohol, and Penicillium gives penicillin, a narrow-spectrum antibiotic.",
  whyItMatters:
    "Six questions in the bank, two EASY, two MODERATE and two HARD. Two match microbes to their uses, one asks which bacteria make cider and shrikhand, one asks what yeast in molasses gives besides alcohol, and two are the same question, asked in 2017 and again in 2021: which antibiotic is narrow spectrum.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mcus-food",
      name: "Microbes that make food and drink",
      intuition:
        "Microbes are tiny chemical factories. Feed them sugar and they turn it into something else: lactobacilli turn the sugar of milk into lactic acid, which sets milk into curd; yeast turns sugar into alcohol and carbon dioxide gas, which puffs up bread dough. We have used these factories for thousands of years.",
      definition:
        "- **Lactobacilli** carry out **lactic acid fermentation**: they make **curd**, buttermilk, cheese and **shrikhand**, and are used for **cider**, **cocoa** and **leavened fodder** (fermented cattle feed).\n" +
        "- **Yeast** (**Saccharomyces cerevisiae**, a fungus) ferments sugar into **ethyl alcohol** and **carbon dioxide**. The gas makes **bread** and idli batter rise.\n" +
        "- Yeast added to **molasses** (left over from making sugar) gives **ethyl alcohol**, with **esters** formed as by-products.\n" +
        "- **Acetobacter** turns alcohol into **acetic acid** (vinegar).\n" +
        "- **Rhizobium** fixes nitrogen for crops (next page); **Clostridium** spoils food (last page).",
      table: {
        columns: ["Microbe", "Kind", "Used for"],
        rows: [
          { cells: ["Lactobacilli", "Bacteria", "Curd, buttermilk, cheese, shrikhand, cider, cocoa, leavened fodder"] },
          { cells: ["Yeast (Saccharomyces)", "Fungus", "Bread, ethyl alcohol from molasses (esters as by-products)"] },
          { cells: ["Acetobacter", "Bacteria", "Vinegar (acetic acid) from alcohol"] },
          { cells: ["Penicillium", "Fungus", "The antibiotic penicillin"] },
          { cells: ["Rhizobium", "Bacteria", "Nitrogen fixation in pulse crops"] },
        ],
        caption: "Yeast goes with bakery products; Clostridium goes with food poisoning.",
      },
      selfCheckExample: {
        prompt: "Which gas, given off by yeast, makes bread dough rise?",
        steps: ["Yeast ferments the sugar in the dough into alcohol and carbon dioxide.", "Bubbles of the gas puff the dough up."],
        answer: "Carbon dioxide",
      },
      practiceSet: [
        { prompt: "Which bacteria turn milk into curd?", answer: "Lactobacilli" },
        { prompt: "What is the full scientific name of baker's yeast?", answer: "Saccharomyces cerevisiae" },
        { prompt: "Which microbe turns alcohol into vinegar?", answer: "Acetobacter" },
        { prompt: "Which acid do lactobacilli produce when they ferment sugar?", answer: "Lactic acid" },
      ],
      pyqExampleId: "ceb28f3c-5d5d-4afa-8d0a-7164ffcf77bf",
      traps: [
        {
          title: "Using Clostridium for bakery products",
          body: "Bakery products use yeast. Clostridium is a food-spoiling bacterium that causes food poisoning.",
        },
        {
          title: "Thinking yeast makes acetic acid from molasses",
          body: "Yeast in molasses gives ethyl alcohol, with esters as by-products. Acetic acid is made later from the alcohol by Acetobacter.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mcus-antibiotics",
      name: "Antibiotics: penicillin and broad or narrow spectrum",
      intuition:
        "In 1928 Alexander Fleming noticed that a blue-green mould, Penicillium, had killed the bacteria growing around it. The mould was making a substance, penicillin, that kills bacteria. Some antibiotics act on only a few kinds of bacteria, like a key that fits only a few locks; others act on many kinds.",
      definition:
        "- An **antibiotic** is a substance made by a microbe that kills or stops the growth of **bacteria**. Antibiotics do **not** work against viruses.\n" +
        "- **Penicillin**, the first antibiotic, comes from the fungus **Penicillium**; it was found by **Alexander Fleming** in **1928**.\n" +
        "- **Narrow-spectrum** antibiotics act on only a few kinds of bacteria: **penicillin**.\n" +
        "- **Broad-spectrum** antibiotics act on many kinds: **ampicillin**, **amoxicillin**, **tetracycline**.",
      table: {
        columns: ["Antibiotic", "Spectrum", "Note"],
        rows: [
          { cells: ["Penicillin", "Narrow", "From Penicillium; the first antibiotic"] },
          { cells: ["Ampicillin", "Broad", "Made by changing penicillin"] },
          { cells: ["Amoxicillin", "Broad", "Made by changing penicillin"] },
          { cells: ["Tetracycline", "Broad", "Acts on many kinds of bacteria"] },
        ],
        caption: "In a list of these four, penicillin is the odd one out.",
      },
      selfCheckExample: {
        prompt: "A doctor says an antibiotic will act on many different kinds of bacteria. What is such an antibiotic called?",
        steps: ["Acting on many kinds of bacteria is what broad spectrum means."],
        answer: "A broad-spectrum antibiotic",
      },
      practiceSet: [
        { prompt: "From which fungus is penicillin obtained?", answer: "Penicillium" },
        { prompt: "Who discovered penicillin?", answer: "Alexander Fleming, in 1928" },
        { prompt: "Is tetracycline a broad-spectrum or a narrow-spectrum antibiotic?", answer: "Broad spectrum" },
        { prompt: "Will an antibiotic cure a cold caused by a virus?", answer: "No: antibiotics act on bacteria, not viruses" },
      ],
      pyqExampleId: "53bb3968-a277-42a1-bbb0-6519ed3a6302",
      traps: [
        {
          title: "Calling penicillin broad spectrum because it is famous",
          body: "Penicillin acts on only a few kinds of bacteria, so it is narrow spectrum. Ampicillin, amoxicillin and tetracycline are the broad-spectrum ones.",
        },
        {
          title: "Giving antibiotics for viral illness",
          body: "Antibiotics kill bacteria. They have no effect on viruses such as those of influenza or the common cold.",
        },
      ],
    },
  ],
};
