import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ES_BIO_NOTE: SubtopicNote = {
  subtopicName: "Biomass and Biogas",
  title: "Biomass and Biogas",
  oneLineDefinition:
    "Biomass is fuel from the bodies and waste of plants and animals, and biogas is the gas that bacteria make from it when they break it down without air.",
  whyItMatters:
    "Three questions in the bank, all EASY: how biogas forms, what a biogas plant needs, and which fuel is not biomass. Each turns on one word, so learn why air is kept out and why coal and nuclear fuel are not biomass.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiesbi-biomass",
      name: "What counts as biomass, and how biogas forms",
      intuition:
        "Wood, cow dung and crop waste all come from living things that stored the Sun's energy as they grew. Burning them, or letting bacteria turn them into gas, gets that energy back. That is biomass energy.",
      definition:
        "- **Biomass** is the material of plants and animals used as fuel: **wood**, **cow dung cakes**, **crop waste** and the **gobar gas** (biogas) made from them.\n" +
        "- **Coal** and **petroleum** are **fossil fuels**. They formed from plants and animals buried for millions of years, so they are not counted as biomass.\n" +
        "- **Nuclear fuel** (uranium) has nothing to do with living matter, so it is never biomass.\n" +
        "- **Biogas** forms when bacteria break down dung and plant waste **without oxygen**. This breaking down by microbes is called **fermentation** (here, anaerobic fermentation). It is not aerobic respiration, which needs oxygen.",
      table: {
        columns: ["Fuel", "Biomass?", "Why"],
        rows: [
          { cells: ["Wood", "Yes", "Comes from trees"] },
          { cells: ["Cow dung cakes", "Yes", "Animal waste"] },
          { cells: ["Crop waste", "Yes", "Plant material"] },
          { cells: ["Gobar gas (biogas)", "Yes", "Made by bacteria from dung and plant waste"] },
          { cells: ["Coal", "No", "A fossil fuel, buried for millions of years"] },
          { cells: ["Petroleum", "No", "A fossil fuel"] },
          { cells: ["Uranium (nuclear fuel)", "No", "Not from living matter at all"] },
        ],
      },
      selfCheckExample: {
        prompt: "Is petroleum a biomass fuel or a fossil fuel?",
        steps: [
          "Biomass is fresh plant and animal material, such as wood and dung.",
          "Petroleum formed from living things buried for millions of years.",
        ],
        answer: "A fossil fuel",
      },
      practiceSet: [
        { prompt: "What is the common Indian name for biogas made from cow dung?", answer: "Gobar gas" },
        { prompt: "Do the bacteria that make biogas need oxygen?", answer: "No: they work without oxygen (anaerobic)." },
        { prompt: "Which of these is a biomass fuel: coal, wood or uranium?", answer: "Wood" },
      ],
      pyqExampleId: "9301c35a-840c-42cf-a004-bc601a7680fe",
      traps: [
        {
          title: "Calling coal biomass",
          body:
            "Coal did come from plants, but it is a fossil fuel formed over millions of years. Biomass means fresh plant and animal material such as wood and dung.",
        },
        {
          title: "Choosing aerobic respiration for biogas",
          body:
            "Biogas forms by fermentation without oxygen. Aerobic respiration needs oxygen, which is exactly what the biogas plant keeps out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiesbi-plant",
      name: "The biogas plant: what goes in and what comes out",
      intuition:
        "A biogas plant is a closed tank where dung and water sit together with no air. Bacteria eat the dung slowly and give off gas that collects at the top, ready for a stove.",
      definition:
        "- Dung (or plant waste) is mixed with **water** to make a **slurry**, which goes into a closed tank called the **digester**.\n" +
        "- The digester is sealed so that **no air** gets in. The bacteria need **water but not air**.\n" +
        "- The gas is mostly **methane** (up to about three quarters), with some carbon dioxide, hydrogen and hydrogen sulphide.\n" +
        "- The slurry left behind is a good **manure**, rich in nitrogen and phosphorus.\n" +
        "- Biogas burns without smoke and is used for **cooking** and **lighting**.",
      table: {
        columns: ["Part of the process", "What it is"],
        rows: [
          { cells: ["Goes in", "Slurry of dung (or plant waste) and water"] },
          { cells: ["Conditions", "Water present, air kept out"] },
          { cells: ["Closed tank", "The digester"] },
          { cells: ["Main gas made", "Methane"] },
          { cells: ["Other gases", "Carbon dioxide, hydrogen, hydrogen sulphide"] },
          { cells: ["Left behind", "Slurry used as manure, rich in nitrogen and phosphorus"] },
          { cells: ["Uses of the gas", "Cooking and lighting"] },
        ],
        caption: "The two things a biogas plant needs: water in the slurry, and no air.",
      },
      selfCheckExample: {
        prompt: "Which gas makes up most of biogas?",
        steps: ["Bacteria in the digester break down dung without air.", "The main gas they give off is methane."],
        answer: "Methane",
      },
      practiceSet: [
        { prompt: "What is the closed tank of a biogas plant called?", answer: "The digester" },
        { prompt: "What is the slurry left in a biogas plant used for?", answer: "As manure" },
        { prompt: "Name two uses of biogas in a village home.", answer: "Cooking and lighting" },
      ],
      pyqExampleId: "8b761b27-f87a-48b3-924f-3f8a6e88d406",
      traps: [
        {
          title: "Thinking the digester needs fresh air",
          body:
            "Air must be kept out of a biogas plant. The bacteria that make methane work only without oxygen, so the digester is sealed.",
        },
        {
          title: "Forgetting the water",
          body: "Dry dung does not work. It is mixed with water into a slurry, so a biogas plant needs water but not air.",
        },
        {
          title: "Calling carbon dioxide the main gas",
          body: "Biogas has some carbon dioxide, but most of it is methane, which is the part that burns.",
        },
      ],
    },
  ],
};
