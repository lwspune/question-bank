import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AG_PROTECT_NOTE: SubtopicNote = {
  subtopicName: "Crop Protection and Food Storage",
  title: "Crop Protection and Food Storage",
  oneLineDefinition:
    "Pesticides kill the insects, fungi, weeds and rats that damage crops and stored grain, and preservation methods such as drying, cold, heat, chemicals and irradiation stop food from spoiling.",
  whyItMatters:
    "Four questions in the bank, all MODERATE: what Gammexane is, which insecticide is sprayed on gunny bags of grain, which method uses aluminium phosphide, and what irradiation does to food. Each is a match between a chemical or a method and its job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9agpr-pesticides",
      name: "Pesticides and protecting stored grain",
      intuition:
        "Grain is grown for months and can be lost in days. In the field, insects eat the plants and fungi rot them. In the store, insects bore into the grain and rats eat it. A pesticide is any chemical that kills such a pest, and each kind is named after the pest it kills.",
      definition:
        "- **Pesticide**: the general name for a chemical that kills pests.\n" +
        "- **Insecticides** kill insects, **fungicides** kill fungi, **weedicides (herbicides)** kill weeds and **rodenticides** kill rats.\n" +
        "- **Gammexane** (BHC, benzene hexachloride) is an **insecticide** powder, so it is a pesticide.\n" +
        "- **Malathion** is **sprayed on gunny bags** of stored grain to keep insects away.\n" +
        "- **Aluminium phosphide** tablets are kept among stored grain; they give off a poisonous gas (phosphine) that kills insects. Treating stored food with a gas like this is **fumigation**.\n" +
        "- At home, dried **neem leaves** are kept in grain bins to keep insects away.",
      table: {
        columns: ["Chemical or method", "Kind", "How it is used"],
        rows: [
          { cells: ["Gammexane (BHC)", "Insecticide", "Powder that kills insects such as cockroaches"] },
          { cells: ["Malathion", "Insecticide", "Sprayed on gunny bags of stored grain"] },
          { cells: ["Aluminium phosphide", "Fumigant", "Tablets placed in the grain store give off a gas"] },
          { cells: ["Dried neem leaves", "Natural insect repellent", "Kept in grain bins at home"] },
        ],
        caption: "Sodium benzoate and nitrite are food preservatives, not insecticides.",
      },
      selfCheckExample: {
        prompt: "A farmer's grapes are spoiled by a fungus. Which kind of pesticide should he use?",
        steps: ["A pesticide is named after the pest it kills.", "The pest here is a fungus."],
        answer: "A fungicide",
      },
      practiceSet: [
        { prompt: "What does a weedicide kill?", answer: "Weeds (unwanted plants in a crop field)" },
        { prompt: "What gas do aluminium phosphide tablets give off in a grain store?", answer: "Phosphine, which kills insects" },
        { prompt: "What is the general name for chemicals that kill rats?", answer: "Rodenticides" },
        { prompt: "Why are dried neem leaves kept in grain bins at home?", answer: "To keep insects away from the grain" },
      ],
      pyqExampleId: "e2a3f5bd-1b87-41e8-a372-43d4fca50f98",
      traps: [
        {
          title: "Treating pesticide and insecticide as opposites",
          body: "Pesticide is the general name. An insecticide such as Gammexane is one kind of pesticide.",
        },
        {
          title: "Spraying aluminium phosphide on bags",
          body: "Malathion is the spray for gunny bags. Aluminium phosphide is a tablet put among the grain, where it gives off a gas.",
        },
        {
          title: "Counting food preservatives as insecticides",
          body: "Sodium benzoate and nitrite stop microbes from spoiling food. They are not used to kill insects in a grain store.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9agpr-preserve",
      name: "Methods of preserving food",
      intuition:
        "Food spoils because microbes grow in it and insects attack it. Microbes need water, warmth and time. Take away the water (drying, salt, sugar), the warmth (a fridge or freezer), or kill them (heat, rays, chemicals), and the food keeps for longer.",
      definition:
        "- **Drying**: removes water, so microbes cannot grow (grains, fish, papad).\n" +
        "- **Salt, sugar, oil and vinegar**: used in pickles, jams and murabbas; they stop microbes growing.\n" +
        "- **Cold**: a refrigerator slows microbes; **freezing** stops them.\n" +
        "- **Pasteurisation**: milk is heated to a set temperature for a short time and then cooled quickly, which kills most germs.\n" +
        "- **Chemical preservatives**: sodium benzoate, potassium metabisulphite.\n" +
        "- **Irradiation**: food is exposed to rays (such as gamma rays). It **kills microbes, fungi and insects**, makes **fruit take longer to ripen** and **slows the sprouting** of onions and potatoes.\n" +
        "- **Fumigation (smoking)**: stored grain is treated with a gas, such as the gas from aluminium phosphide tablets.",
      table: {
        columns: ["Method", "What it does", "Example"],
        rows: [
          { cells: ["Drying", "Removes water", "Sun-dried fish, grains"] },
          { cells: ["Salt or sugar", "Draws water out of microbes", "Pickles, jams"] },
          { cells: ["Freezing", "Stops microbes growing", "Frozen peas, ice cream"] },
          { cells: ["Pasteurisation", "Heat kills germs, then quick cooling", "Packaged milk"] },
          { cells: ["Irradiation", "Rays kill microbes and insects, slow ripening and sprouting", "Onions, potatoes, fruit"] },
          { cells: ["Fumigation", "A gas kills insects in the store", "Aluminium phosphide in grain stores"] },
        ],
        caption: "Irradiation does three jobs at once: it kills pests, slows ripening and slows sprouting.",
      },
      selfCheckExample: {
        prompt: "Which preservation method is used for packaged milk, heating it for a short time and then cooling it quickly?",
        steps: ["Heat kills most germs in the milk.", "Quick cooling stops the remaining ones from growing."],
        answer: "Pasteurisation",
      },
      practiceSet: [
        { prompt: "Why does drying keep fish from spoiling?", answer: "Microbes need water to grow, and drying removes it" },
        { prompt: "Name two chemical preservatives used in food.", answer: "Sodium benzoate and potassium metabisulphite" },
        { prompt: "Which two things are added to mango pickle to keep it from spoiling?", answer: "Salt and oil" },
        { prompt: "Why do jams keep for a long time without spoiling?", answer: "The large amount of sugar stops microbes from growing" },
      ],
      pyqExampleId: "1891b5f9-ab2a-4e56-94f0-0357ab0ee974",
      traps: [
        {
          title: "Thinking irradiation speeds up ripening",
          body: "Irradiation slows ripening, so fruit takes longer to ripen and keeps longer. It also slows sprouting.",
        },
        {
          title: "Confusing pasteurisation with boiling for a long time",
          body: "Pasteurisation heats milk for a short time and then cools it quickly. It kills most germs without spoiling the taste.",
        },
      ],
    },
  ],
};
