import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MC_HARMFUL_NOTE: SubtopicNote = {
  subtopicName: "Disease-Causing Microbes",
  title: "Disease-Causing Microbes",
  oneLineDefinition:
    "Diseases are caused by bacteria, viruses, protozoa and fungi; Clostridium is an anaerobic bacterium that spoils food and forms bottle-shaped endospores.",
  whyItMatters:
    "Five questions in the bank, two EASY and three MODERATE. Three ask which kind of microbe causes a disease (malaria, dandruff) or which drawing is HIV; two are about Clostridium: its species, and how it lives and spoils food.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mcha-diseases",
      name: "Which microbe causes which disease",
      intuition:
        "To answer a disease question, first ask which group the germ belongs to. Malaria is a protozoan carried by a mosquito, AIDS is a virus, typhoid is a bacterium, and dandruff and ringworm are fungi. Each group is fought differently, so doctors care about the group too.",
      definition:
        "- **Bacteria**: typhoid (**Salmonella typhi**), cholera, tuberculosis, tetanus (**Clostridium tetani**), syphilis (**Treponema pallidum**), most pneumonia.\n" +
        "- **Viruses**: influenza, common cold, polio, measles, dengue, rabies, **AIDS** (caused by **HIV**).\n" +
        "- **Protozoa**: **malaria** (**Plasmodium**, spread by the **female Anopheles** mosquito), amoebic dysentery (Entamoeba).\n" +
        "- **Fungi**: **dandruff** (a yeast-like fungus on the scalp), ringworm, athlete's foot.\n" +
        "- **Scabies** is caused by a tiny **mite**, an animal, not a microbe.\n" +
        "- **HIV** is round, with an outer envelope carrying knob-like proteins and a **cone-shaped core** holding **two strands of RNA**. The **rabies** virus is **bullet-shaped**.",
      table: {
        columns: ["Disease", "Caused by", "Kind of microbe"],
        rows: [
          { cells: ["Malaria", "Plasmodium", "Protozoan"] },
          { cells: ["Amoebic dysentery", "Entamoeba", "Protozoan"] },
          { cells: ["Typhoid", "Salmonella typhi", "Bacterium"] },
          { cells: ["Tetanus", "Clostridium tetani", "Bacterium"] },
          { cells: ["AIDS", "HIV", "Virus"] },
          { cells: ["Influenza", "Influenza virus", "Virus"] },
          { cells: ["Dandruff, ringworm", "Fungi", "Fungus"] },
          { cells: ["Scabies", "A mite", "Not a microbe: a tiny animal"] },
        ],
        caption: "A mosquito carries malaria, but the germ itself is a protozoan.",
      },
      selfCheckExample: {
        prompt: "Of typhoid, measles and amoebic dysentery, which is caused by a protozoan?",
        steps: ["Typhoid is bacterial and measles is viral.", "Amoebic dysentery is caused by Entamoeba, a protozoan."],
        answer: "Amoebic dysentery",
      },
      practiceSet: [
        { prompt: "Which mosquito spreads malaria?", answer: "The female Anopheles mosquito" },
        { prompt: "What kind of microbe causes ringworm?", answer: "A fungus" },
        { prompt: "Which virus causes AIDS?", answer: "HIV (human immunodeficiency virus)" },
        { prompt: "What is the shape of the rabies virus?", answer: "Bullet-shaped" },
      ],
      pyqExampleId: "fb287e17-52e0-42a5-9fcc-c30f8e6e12ae",
      traps: [
        {
          title: "Calling malaria a bacterial disease",
          body: "Malaria is caused by Plasmodium, a protozoan. The mosquito only carries it from person to person.",
        },
        {
          title: "Calling scabies a microbial disease",
          body: "Scabies is caused by a mite, a tiny animal that burrows into the skin, not by a bacterium, virus or fungus.",
        },
        {
          title: "Thinking dandruff is caused by bacteria",
          body: "Dandruff is linked to a yeast-like fungus that grows on the scalp.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mcha-clostridium",
      name: "Clostridium: the food-spoiling bacterium",
      intuition:
        "Clostridium is a bacterium that hates oxygen. It thrives in sealed places where air cannot reach, such as a badly made can of food. When times are bad it hides inside a tough, bottle-shaped spore that can survive boiling, and wakes up when conditions improve.",
      definition:
        "- **Clostridium** is a **rod-shaped bacterium**.\n" +
        "- It is **anaerobic**: it **cannot survive** at the **normal oxygen level of air**.\n" +
        "- In **adverse conditions** it forms **bottle-shaped endospores**, which can survive heat.\n" +
        "- It **spoils cooked and canned food** and causes **food poisoning**.",
      table: {
        columns: ["Species", "What it causes"],
        rows: [
          { cells: ["Clostridium botulinum", "Botulism, a severe food poisoning from badly canned food"] },
          { cells: ["Clostridium perfringens", "Food poisoning"] },
          { cells: ["Clostridium tetani", "Tetanus"] },
          { cells: ["Clostridium difficile", "Severe diarrhoea"] },
        ],
        caption: "Cerevisiae is not a Clostridium: it is the species name of yeast, Saccharomyces cerevisiae.",
      },
      selfCheckExample: {
        prompt: "Why does Clostridium grow inside a sealed can of food but not on food left open to the air?",
        steps: ["Clostridium is anaerobic: oxygen harms it.", "A sealed can has no air inside."],
        answer: "It cannot survive at the normal oxygen level of air, and the sealed can keeps the air out.",
      },
      practiceSet: [
        { prompt: "What shape are the endospores of Clostridium?", answer: "Bottle-shaped" },
        { prompt: "Which species of Clostridium causes tetanus?", answer: "Clostridium tetani" },
        { prompt: "What is a microbe that cannot live in the presence of oxygen called?", answer: "Anaerobic" },
        { prompt: "What is the poisoning caused by Clostridium botulinum in canned food called?", answer: "Botulism" },
      ],
      pyqExampleId: "f5f6a9e4-859f-451f-9fce-13d29d026737",
      traps: [
        {
          title: "Thinking Clostridium needs air",
          body: "Clostridium is anaerobic: it cannot survive at the normal oxygen level of air. That is why sealed cans are where it causes trouble.",
        },
        {
          title: "Taking cerevisiae for a Clostridium",
          body: "Difficile, perfringens, botulinum and tetani are Clostridium species. Cerevisiae belongs to yeast, Saccharomyces cerevisiae.",
        },
      ],
    },
  ],
};
