import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MC_NITROGEN_NOTE: SubtopicNote = {
  subtopicName: "Microbes and Nitrogen Fixation",
  title: "Microbes and Nitrogen Fixation",
  oneLineDefinition:
    "Rhizobium, Azotobacter and blue-green algae fix nitrogen from the air; Nitrosomonas and Nitrobacter turn it into nitrates, Pseudomonas returns it to the air, and putrefying bacteria break down the dead.",
  whyItMatters:
    "Four questions in the bank, three MODERATE and one HARD. Three are odd-one-out questions: which microbe does not fix nitrogen (Pseudomonas, putrefying bacteria, Nitrosomonas). One asks what a farmer gains from Rhizobium inoculation. Know each microbe's one job in the nitrogen cycle and all four fall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mcni-cycle",
      name: "The microbes of the nitrogen cycle",
      intuition:
        "Air is nearly four fifths nitrogen, yet plants cannot use nitrogen gas directly. A few microbes can grab it from the air and turn it into compounds that plants can absorb. Other microbes then pass nitrogen from one form to the next, and some send it back into the air, so the nitrogen keeps going round.",
      definition:
        "- **Nitrogen fixation**: nitrogen gas of the air is turned into compounds plants can use. Done by **Rhizobium** (in the **root nodules** of pulse crops such as peas, beans and groundnut), **Azotobacter** (free in the soil) and **blue-green algae** (such as Nostoc and Anabaena, in rice fields).\n" +
        "- **Putrefying bacteria** (decomposers) break down dead bodies and wastes, releasing **ammonia**. They do **not** fix nitrogen.\n" +
        "- **Nitrification**: **Nitrosomonas** turns ammonia into **nitrites**; **Nitrobacter** turns nitrites into **nitrates**, which plants absorb.\n" +
        "- **Denitrification**: **Pseudomonas** turns nitrates back into **nitrogen gas**, returning it to the air.",
      table: {
        columns: ["Microbe", "Job in the nitrogen cycle", "Fixes nitrogen?"],
        rows: [
          { cells: ["Rhizobium", "Fixes nitrogen in the root nodules of pulse crops", "Yes"] },
          { cells: ["Azotobacter", "Fixes nitrogen, living free in the soil", "Yes"] },
          { cells: ["Blue-green algae", "Fix nitrogen in water and wet soil, as in rice fields", "Yes"] },
          { cells: ["Putrefying bacteria", "Break down dead matter, releasing ammonia", "No"] },
          { cells: ["Nitrosomonas", "Ammonia to nitrites", "No"] },
          { cells: ["Nitrobacter", "Nitrites to nitrates", "No"] },
          { cells: ["Pseudomonas", "Nitrates back to nitrogen gas (denitrification)", "No: it removes nitrogen from the soil"] },
        ],
        caption: "Only the first three take nitrogen out of the air.",
      },
      selfCheckExample: {
        prompt: "Which bacterium turns the nitrites in soil into nitrates?",
        steps: ["Ammonia becomes nitrite by Nitrosomonas; nitrite becomes nitrate by Nitrobacter."],
        answer: "Nitrobacter",
      },
      practiceSet: [
        { prompt: "In which part of a pea plant does Rhizobium live?", answer: "In the root nodules" },
        { prompt: "Which bacterium sends nitrogen from the soil back into the air?", answer: "Pseudomonas (a denitrifying bacterium)" },
        { prompt: "Name a nitrogen-fixing bacterium that lives free in the soil.", answer: "Azotobacter" },
        { prompt: "Which microbes fix nitrogen in rice fields?", answer: "Blue-green algae such as Nostoc and Anabaena" },
      ],
      pyqExampleId: "46a1e6d9-1bfd-4221-b05e-36e5b4ccc756",
      traps: [
        {
          title: "Calling Nitrosomonas a nitrogen fixer",
          body: "Nitrosomonas turns ammonia into nitrites. It does not take nitrogen from the air; Rhizobium, Azotobacter and blue-green algae do.",
        },
        {
          title: "Thinking every soil microbe adds nitrogen",
          body: "Pseudomonas does the opposite: it turns nitrates back into nitrogen gas, so the soil loses nitrogen.",
        },
        {
          title: "Counting putrefying bacteria as nitrogen fixers",
          body: "Putrefying bacteria decompose dead bodies and wastes. They release ammonia from dead matter but fix no nitrogen from the air.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9mcni-rhizobium",
      name: "Rhizobium inoculation as a biofertiliser",
      intuition:
        "Instead of buying a sack of chemical fertiliser, a farmer can coat seeds with a culture of Rhizobium before sowing. The bacteria settle in the roots and feed the crop nitrogen from the air for free. It is fertiliser that grows itself.",
      definition:
        "- **Rhizobium inoculation**: pulse seeds are coated with a **culture of Rhizobium** before sowing.\n" +
        "- The bacteria form root nodules and **supply nitrogen** to the crop.\n" +
        "- Less chemical fertiliser is needed, so its **side effects are avoided** and the **cost** of farming **falls**.\n" +
        "- The soil stays fertile for the next crop too. Such living fertilisers are called **biofertilisers**.\n" +
        "- Rhizobium gives the crop **nitrogen only**: not oxygen, not carbon dioxide.",
      table: {
        columns: ["Claim about Rhizobium inoculation", "True or false"],
        rows: [
          { cells: ["It supplies nitrogen to the crop", "True"] },
          { cells: ["It lets the farmer use less chemical fertiliser and avoid its side effects", "True"] },
          { cells: ["It lowers the cost of farming", "True"] },
          { cells: ["It gives the crop more oxygen and carbon dioxide", "False"] },
          { cells: ["It raises the farmer's cost", "False"] },
        ],
        caption: "Check each claim in a statement question against this table: true benefits and false ones come mixed.",
      },
      selfCheckExample: {
        prompt: "Why does a farmer who coats groundnut seeds with Rhizobium culture need less urea?",
        steps: ["Rhizobium in the root nodules supplies the crop with nitrogen fixed from the air.", "Urea is bought only to supply nitrogen."],
        answer: "The bacteria supply the nitrogen that urea would otherwise have given.",
      },
      practiceSet: [
        { prompt: "What is done to seeds in Rhizobium inoculation?", answer: "They are coated with a culture of Rhizobium before sowing" },
        { prompt: "What are living fertilisers such as Rhizobium cultures called?", answer: "Biofertilisers" },
        { prompt: "Which nutrient does Rhizobium supply to a crop?", answer: "Nitrogen" },
        { prompt: "Does Rhizobium inoculation raise or lower the cost of farming?", answer: "It lowers it, since less chemical fertiliser is needed" },
      ],
      pyqExampleId: "dcf2f581-2cba-4b51-8737-03ef944ea7a9",
      traps: [
        {
          title: "Thinking Rhizobium gives the crop oxygen or carbon dioxide",
          body: "Rhizobium fixes nitrogen only. The crop takes its carbon dioxide from the air through its leaves.",
        },
      ],
    },
  ],
};
