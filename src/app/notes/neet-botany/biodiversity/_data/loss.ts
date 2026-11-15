import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_BD_LOSS_NOTE: SubtopicNote = {
  subtopicName: "Loss of Biodiversity",
  title: "Loss of Biodiversity",
  oneLineDefinition:
    "How fast species are being lost, the recent extinctions NCERT names, what the loss does to an ecosystem, and the four causes called the Evil Quartet with their examples.",
  whyItMatters:
    "Eight NEET questions: five EASY and three MODERATE. Four were on the Evil Quartet itself (NEET 2022, 2023, 2024 and 2026), with habitat loss and fragmentation as the most important cause in NEET 2023. Two more tested its examples, and NEET 2026 asked how fast the sixth extinction is running.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbobd-extinction",
      name: "Extinctions and the sixth mass extinction",
      intuition:
        "Species have always gone extinct, but slowly. Since humans spread across the planet the losses have sped up so much that we are living through a new mass extinction, and this time we are the cause.",
      definition:
        "Loss of biodiversity in NCERT:\n" +
        "- When humans colonised the tropical **Pacific Islands**, more than **2,000** species of native birds became extinct.\n" +
        "- The **IUCN Red List** (2004) records the extinction of **784 species** in the last 500 years: **338 vertebrates**, **359 invertebrates** and **87 plants**. IUCN is the International Union for Conservation of Nature.\n" +
        "- In the last twenty years alone, **27 species** have disappeared. Some groups, such as **amphibians**, are more vulnerable to extinction.\n" +
        "- More than **15,500 species** worldwide face the threat of extinction. Of all species in the world, **12 percent of birds**, **23 percent of mammals**, **32 percent of amphibians** and **31 percent of gymnosperms** face this threat.\n" +
        "- Life on Earth has seen **five** episodes of mass extinction. The **sixth**, now in progress, is estimated to be **100 to 1,000 times faster** than in pre-human times, and **human activities** are responsible. If present trends continue, nearly **half** of all species might be wiped out within the next 100 years.\n" +
        "What the loss does to a region:\n" +
        "- a **decline in plant production**;\n" +
        "- **lowered resistance** to environmental disturbances such as **drought**;\n" +
        "- **increased variability** in some ecosystem processes such as plant productivity, water use, and pest and disease cycles.",
      table: {
        columns: ["Recently extinct", "Where NCERT places it"],
        rows: [
          { cells: ["Dodo", "Mauritius"] },
          { cells: ["Quagga", "Africa"] },
          { cells: ["Thylacine", "Australia"] },
          { cells: ["Steller's sea cow", "Russia"] },
          { cells: ["Tiger: three subspecies", "Bali, Javan and Caspian tigers"] },
        ],
        caption: "NCERT's examples of recent extinctions, besides the 784 recorded in the IUCN Red List.",
      },
      pyqExampleId: "1b038480-5cc4-46be-a8e4-50388ba26a3d",
      selfCheckExample: {
        prompt: "The IUCN Red List (2004) records 784 extinctions in the last 500 years, of which 338 are vertebrates and 87 are plants. How many are invertebrates?",
        steps: [
          "Take away the vertebrates and plants from the total: \\(784 - 338 - 87\\).",
          "\\(784 - 338 = 446\\), and \\(446 - 87 = 359\\).",
        ],
        answer: "359 invertebrates.",
      },
      practiceSet: [
        { prompt: "How many native bird species became extinct when humans colonised the tropical Pacific Islands?", answer: "More than 2,000" },
        { prompt: "Which body maintains the Red List that recorded 784 extinctions in the last 500 years?", answer: "The IUCN (International Union for Conservation of Nature)" },
        { prompt: "What percentage of the world's amphibian species face the threat of extinction?", answer: "32 percent" },
        { prompt: "Where did the quagga live before it became extinct?", answer: "Africa" },
        { prompt: "Name the three ways an ecosystem suffers when its biodiversity is lost.", answer: "Plant production declines, resistance to disturbances such as drought falls, and variability in processes such as productivity, water use and pest and disease cycles rises" },
      ],
      traps: [
        {
          title: "The thylacine and the quagga are on different continents",
          body: "The **thylacine** lived in **Australia**, the **quagga** in **Africa** and the **dodo** on **Mauritius**. Mixing the places is the usual slip in a match question.",
        },
        {
          title: "Losing species makes a system less steady",
          body: "Loss of biodiversity **lowers** resistance to disturbances and **increases** variability in productivity, water use and pest cycles. It never makes the ecosystem steadier.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobd-quartet",
      name: "The Evil Quartet",
      intuition:
        "Four human-made pressures drive most extinctions: destroying homes, taking too much, bringing in outsiders and dragging partners down. NCERT calls them the Evil Quartet, and habitat loss heads the list.",
      definition:
        "The four major causes of biodiversity loss, nicknamed **the Evil Quartet**:\n" +
        "- **Habitat loss and fragmentation**: the **most important** cause driving animals and plants to extinction.\n" +
        "- **Over-exploitation**: when human **need** turns to **greed**, natural resources are over-harvested.\n" +
        "- **Alien species invasions**: a species brought in on purpose or by accident turns invasive and causes the decline or extinction of native species.\n" +
        "- **Co-extinctions**: when a species becomes extinct, the plants and animals linked to it in an **obligatory** way also become extinct.\n" +
        "- **Pollution**, **mutation** and **migration** are not part of the quartet.",
      table: {
        columns: ["Cause", "What it does", "Who suffers most"],
        rows: [
          {
            cells: ["Habitat loss and fragmentation", "Forests are cleared, or broken into small pieces", "Mammals and birds needing large territories, and animals with migratory habits"],
            noteAmber: "NEET 2023: habitat loss and fragmentation is the most important cause driving species to extinction.",
            pyqExampleId: "1c8a7b71-603f-48b2-9343-c2eb7301364e",
          },
          { cells: ["Over-exploitation", "Too many are hunted, fished or harvested", "Species taken for food or trade, such as many marine fish"] },
          { cells: ["Alien species invasions", "An introduced species spreads and crowds out native ones", "The native species of the invaded habitat"] },
          { cells: ["Co-extinctions", "A partner species dies out with the one it depends on", "Parasites of a host, and partners in plant-pollinator mutualism"] },
        ],
      },
      pyqExampleId: "bf8e5a46-e552-4b6c-a776-d539c0a77ce1",
      selfCheckExample: {
        prompt: "A new highway cuts a large forest into many small patches. Which cause of biodiversity loss is this, and which animals does NCERT say are hit hardest?",
        steps: [
          "The forest is not gone but broken into pieces: that is fragmentation, part of habitat loss and fragmentation.",
          "Animals that need large territories, and those that migrate, can no longer live in small patches.",
        ],
        answer: "Habitat fragmentation; mammals and birds that need large territories and animals with migratory habits suffer most.",
      },
      practiceSet: [
        { prompt: "What nickname describes the four major causes of biodiversity loss?", answer: "The Evil Quartet" },
        { prompt: "Which cause of biodiversity loss begins when human need turns to greed?", answer: "Over-exploitation" },
        { prompt: "When a species dies out and a partner that depends on it in an obligatory way dies out too, what is it called?", answer: "Co-extinction" },
        { prompt: "Is pollution one of the four causes in the Evil Quartet?", answer: "No: the four are habitat loss and fragmentation, over-exploitation, alien species invasions and co-extinctions" },
      ],
      traps: [
        {
          title: "Pollution is not in the quartet",
          body: "The four are **habitat loss and fragmentation**, **over-exploitation**, **alien species invasions** and **co-extinctions**. Air, water or soil pollution, mutation and migration are distractors.",
        },
        {
          title: "Habitat loss ranks first",
          body: "Of the four, **habitat loss and fragmentation** is the **most important** cause of extinction, not over-exploitation or alien species.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbobd-examples",
      name: "Examples of each cause",
      intuition:
        "Each cause has its NCERT story: the shrinking rain forests, the sea cow hunted out, the perch that ate a lake's fishes, the weeds that took over. NEET hands you the story and asks which cause it shows.",
      definition:
        "NCERT's examples, cause by cause:\n" +
        "- **Habitat loss**: tropical rain forests once covered more than **14 percent** of Earth's land surface and now cover no more than **6 percent**. The **Amazon rain forest**, so huge it is called the **lungs of the planet**, is being cut and cleared to grow **soya beans** or turned into grasslands for raising **beef cattle**.\n" +
        "- **Over-exploitation**: **Steller's sea cow** and the **passenger pigeon** were driven extinct in the last 500 years by human over-exploitation. Many marine fish populations are over-harvested.\n" +
        "- **Alien species**: the **Nile perch** introduced into **Lake Victoria** in East Africa led to the extinction of more than **200 species of cichlid fish**. Carrot grass (*Parthenium*), *Lantana* and water hyacinth (*Eichhornia*) are invasive weeds. The illegal introduction of the **African catfish** *Clarias gariepinus* for aquaculture threatens the native catfishes of our rivers.\n" +
        "- **Co-extinction**: when a **host fish** becomes extinct, its unique assemblage of **parasites** goes with it. In a coevolved **plant-pollinator** mutualism, the extinction of one leads to the extinction of the other.",
      table: {
        columns: ["Example", "Cause it shows"],
        rows: [
          {
            cells: ["Amazon rain forest cleared for soya beans and beef cattle", "Habitat loss and fragmentation"],
            noteAmber: "NEET 2026: the Amazon clearing (habitat loss), Steller's sea cow and passenger pigeon (over-exploitation) and water hyacinth (invasive) were the true statements.",
            pyqExampleId: "55da0a73-f6e7-40dd-8e44-0de32f8c6a30",
          },
          { cells: ["Steller's sea cow and the passenger pigeon", "Over-exploitation"] },
          { cells: ["Nile perch in Lake Victoria, over 200 cichlid species lost", "Alien species invasion"] },
          {
            cells: ["*Parthenium*, *Lantana* and water hyacinth", "Alien species invasion"],
            noteAmber: "NEET 2025: matched *Lantana camara* to alien species invasion and the dodo to extinction.",
            pyqExampleId: "c60c8380-535b-46dc-8237-699c8b381590",
          },
          { cells: ["African catfish *Clarias gariepinus* in Indian rivers", "Alien species invasion"] },
          { cells: ["A host fish lost along with its parasites", "Co-extinction"] },
          { cells: ["A plant and its coevolved pollinator", "Co-extinction"] },
        ],
      },
      pyqExampleId: "55da0a73-f6e7-40dd-8e44-0de32f8c6a30",
      selfCheckExample: {
        prompt: "A fish farmer illegally releases an African catfish into an Indian river, and the native catfishes start to decline. Which cause of biodiversity loss is this, and what is the fish's scientific name?",
        steps: [
          "The catfish is not native to Indian rivers: it was brought in from Africa.",
          "An introduced species harming native ones is an alien species invasion.",
        ],
        answer: "Alien species invasion; the African catfish is *Clarias gariepinus*.",
      },
      practiceSet: [
        { prompt: "Tropical rain forests once covered more than 14 percent of Earth's land. How much do they cover now?", answer: "No more than 6 percent" },
        { prompt: "Which forest is so huge that it is called the lungs of the planet?", answer: "The Amazon rain forest" },
        { prompt: "Which cause of biodiversity loss does carrot grass (*Parthenium*) illustrate?", answer: "Alien species invasion" },
        { prompt: "A host fish becomes extinct and its unique parasites disappear with it. Which cause is this?", answer: "Co-extinction" },
        { prompt: "For which two uses is the Amazon rain forest being cleared?", answer: "Growing soya beans and making grasslands for beef cattle" },
      ],
      traps: [
        {
          title: "The Nile perch destroyed the cichlids",
          body: "The **Nile perch** in **Lake Victoria** led to the **extinction** of more than 200 cichlid species. It never helped the cichlid population grow.",
        },
        {
          title: "Co-extinction drags partners down",
          body: "When a species becomes extinct, the species tied to it in an **obligatory** way **also die out**. A statement that its partners are unaffected is false.",
        },
        {
          title: "Steller's sea cow was hunted out, not out-competed",
          body: "**Steller's sea cow** and the **passenger pigeon** are NCERT's examples of **over-exploitation** by humans, not of alien species or habitat loss.",
        },
      ],
    },
  ],
};
