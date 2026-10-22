import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PB_NUTRITION_NOTE: SubtopicNote = {
  subtopicName: "Nutrition and Respiration in Plants",
  title: "Nutrition and Respiration in Plants",
  oneLineDefinition:
    "A green plant makes its own food from carbon dioxide and water using sunlight, takes in gases through its stomata, and like every living thing respires to release energy from that food.",
  whyItMatters:
    "Six questions in the bank, four EASY and two MODERATE: the share of sunlight plants use, which events of photosynthesis are wrongly stated, the black paper experiment, guard cells, the crop that holds Rhizobium, and the seeds used to show respiration. The two MODERATE ones test the details of photosynthesis, so learn its three events exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spipbnu-photosynthesis",
      name: "Photosynthesis: raw materials, events and experiments",
      intuition:
        "A leaf is a small food factory. It takes in carbon dioxide from the air and water from the roots, and chlorophyll traps sunlight to join them into glucose, giving out oxygen. " +
        "Each school experiment takes away one need (light, carbon dioxide or chlorophyll) and shows that no starch forms without it.",
      definition:
        "- **Equation**: carbon dioxide + water, with sunlight and chlorophyll, gives glucose + oxygen.\n" +
        "- **Three events**: (1) chlorophyll **absorbs light energy**; (2) light energy is **changed to chemical energy** and **water is split** into hydrogen and oxygen; (3) **carbon dioxide is reduced** to carbohydrate.\n" +
        "- The light phase makes the energy carriers **ATP and NADPH**; the dark phase uses them to make sugar.\n" +
        "- The energy change is **light (radiant) to chemical**, never the other way.\n" +
        "- Green plants store only about **1%** of the sunlight that falls on them.\n" +
        "- Glucose is stored as **starch**, which turns blue black with **iodine**. A plant is first **de-starched** by keeping it in the dark.",
      table: {
        columns: ["Experiment", "What is taken away", "Result", "It shows"],
        rows: [
          {
            cells: ["Part of a leaf covered with black paper", "Light, from that part", "No starch where covered", "Light is necessary"],
            noteAmber: "Air still reaches the covered part, so the black paper tests light only.",
          },
          { cells: ["Variegated leaf (green and white patches)", "Chlorophyll, from the white part", "Starch only in green parts", "Chlorophyll is necessary"] },
          { cells: ["Plant in a jar with potassium hydroxide", "Carbon dioxide (KOH absorbs it)", "No starch", "Carbon dioxide is necessary"] },
        ],
        caption: "In each experiment the plant is de-starched first, and the leaf is tested with iodine.",
      },
      selfCheckExample: {
        prompt:
          "Spot the wrong statement: (a) water is split during photosynthesis (b) chlorophyll absorbs light (c) photosynthesis changes chemical energy into light energy (d) carbon dioxide is reduced to carbohydrate",
        steps: [
          "Splitting water, absorbing light and reducing carbon dioxide are the three events: (a), (b), (d) are right.",
          "Photosynthesis changes light energy into chemical energy, so (c) has it backwards.",
        ],
        answer: "(c) is wrong: light energy becomes chemical energy.",
      },
      practiceSet: [
        { prompt: "Which gas is given out by a green plant during photosynthesis?", answer: "Oxygen" },
        { prompt: "Which chemical is used to test a leaf for starch?", answer: "Iodine solution (starch turns blue black)" },
        { prompt: "In which phase of photosynthesis are ATP and NADPH made?", answer: "The light phase" },
        { prompt: "A plant is kept in a jar with potassium hydroxide. Which need of photosynthesis is removed?", answer: "Carbon dioxide" },
        { prompt: "Why is a plant kept in the dark for a day before a starch test?", answer: "To use up the starch already in its leaves (to de-starch it)" },
      ],
      pyqExampleId: "9298a8d9-aa77-4666-beed-b5fb3b120396",
      traps: [
        {
          title: "Putting ATP and NADPH in the dark phase",
          body: "ATP and NADPH are made in the light phase. The dark phase uses them to reduce carbon dioxide to sugar.",
        },
        {
          title: "10% for the sunlight plants use",
          body:
            "Plants store only about 1% of the sunlight falling on them. The 10% figure belongs to food chains: the energy passed from one level to the next.",
        },
        {
          title: "Reading the black paper test as a carbon dioxide test",
          body: "The paper blocks light but not air, so it tests light alone. Carbon dioxide is tested by removing it with potassium hydroxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipbnu-stomata",
      name: "Stomata and root nodules",
      intuition:
        "A leaf breathes through tiny pores, the stomata, each guarded by two bean shaped guard cells that open and close it. " +
        "Nitrogen is the one raw material a plant cannot take from the air by itself; some plants keep bacteria in their roots that do it for them.",
      definition:
        "- **Stomata**: tiny pores, mostly on the underside of leaves. Gases go in and out; water vapour is lost (transpiration).\n" +
        "- **Guard cells**: a pair of kidney (bean) shaped cells around each stoma. They are found **only in plants**.\n" +
        "- **Rhizobium**: a bacterium that lives in the **root nodules** of **legumes** (pea, gram, bean, groundnut) and fixes nitrogen from the air for the plant.\n" +
        "- Cereals such as **wheat, rice and barley** are grasses, not legumes, and have no root nodules.",
      table: {
        columns: ["Plant", "Group", "Root nodules with Rhizobium"],
        rows: [
          { cells: ["Pea", "Legume", "Yes"] },
          { cells: ["Gram", "Legume", "Yes"] },
          { cells: ["Groundnut", "Legume", "Yes"] },
          { cells: ["Wheat", "Cereal (grass)", "No"] },
          { cells: ["Rice", "Cereal (grass)", "No"] },
        ],
        caption: "Legumes enrich the soil with nitrogen, so farmers grow them between cereal crops.",
      },
      selfCheckExample: {
        prompt: "Spot the odd one out for root nodules with nitrogen fixing bacteria: gram, bean, groundnut, maize.",
        steps: ["Gram, bean and groundnut are legumes with root nodules.", "Maize is a cereal with none."],
        answer: "Maize",
      },
      practiceSet: [
        { prompt: "What are the tiny pores on the surface of a leaf called?", answer: "Stomata" },
        { prompt: "Which cells open and close a stoma?", answer: "Guard cells" },
        { prompt: "Name the bacterium in the root nodules of legumes.", answer: "Rhizobium" },
        { prompt: "What is the loss of water vapour through the stomata called?", answer: "Transpiration" },
      ],
      pyqExampleId: "3c0b87be-4e94-4992-b8e3-3b9f22593c7a",
      traps: [
        {
          title: "Picking a cereal for Rhizobium",
          body: "Wheat, rice and barley are grasses and have no root nodules. Rhizobium lives with legumes such as pea, gram and bean.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spipbnu-respiration",
      name: "Respiration in plants and seeds",
      intuition:
        "Plants respire all the time, day and night, just as animals do. Photosynthesis makes food; respiration breaks it down to release energy and gives out carbon dioxide. " +
        "A germinating seed is growing fast, so it respires fast and gives out a lot of carbon dioxide.",
      definition:
        "- Plants **respire day and night**; they photosynthesise only in light.\n" +
        "- Respiration takes in **oxygen** and gives out **carbon dioxide**; photosynthesis does the opposite.\n" +
        "- To show that seeds respire, use **germinating (sprouting) seeds**: they respire actively.\n" +
        "- Dry seeds respire very slowly, and boiled seeds are dead and do not respire at all.\n" +
        "- The carbon dioxide is shown by **potassium hydroxide** absorbing it (a liquid rises in a bent tube) or by **lime water** turning milky.",
      table: {
        columns: ["Seeds", "Alive", "Respiration"],
        rows: [
          { cells: ["Germinating", "Yes", "Fast, gives out much carbon dioxide"] },
          { cells: ["Dry", "Yes, but resting", "Very slow"] },
          {
            cells: ["Boiled", "No", "None"],
            noteAmber: "Boiled seeds are used only as the control: they show nothing happens without life.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Which process goes on in a green plant at night: photosynthesis, respiration, or both?",
        steps: ["Photosynthesis needs light, so it stops at night.", "Respiration never stops."],
        answer: "Respiration only",
      },
      practiceSet: [
        { prompt: "Which gas do plants give out during respiration?", answer: "Carbon dioxide" },
        { prompt: "Do boiled seeds respire?", answer: "No: they are dead" },
        { prompt: "Which chemical absorbs carbon dioxide in a respiration experiment with seeds?", answer: "Potassium hydroxide" },
      ],
      pyqExampleId: "14930942-f671-4f12-94bf-b7dd0c52335d",
      traps: [
        {
          title: "Plants respire only at night",
          body: "Plants respire all the time. At night it is simply the only one of the two processes going on, because photosynthesis needs light.",
        },
      ],
    },
  ],
};
