import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_BD_GROUPS_NOTE: SubtopicNote = {
  subtopicName: "Plant and Animal Groups",
  title: "Plant and Animal Groups",
  oneLineDefinition:
    "Plants are grouped by whether they have tubes for water and whether they bear seeds; vertebrates are grouped into five classes by their skin, heart and breathing.",
  whyItMatters:
    "Two questions in the bank: one EASY (the group of horsetails and ferns) and one MODERATE (the animals with single circulation, named by their Latin genus names). The MODERATE one is won by knowing which genus is a fish, so learn the common examples by name.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spibdgr-plants",
      name: "The plant groups",
      intuition:
        "Plants are sorted by three questions: does the body have a stem, root and leaves; does it have tubes (vascular tissue) to carry water; and does it make seeds, bare or inside a fruit?",
      definition:
        "- **Thallophyta** (algae): no root, stem or leaves. Spirogyra, Chara.\n" +
        "- **Bryophyta** (mosses, liverworts): no vascular tissue; the 'amphibians of the plant kingdom'. **Funaria** (moss), **Marchantia** (liverwort).\n" +
        "- **Pteridophyta**: root, stem, leaves and **vascular tissue**, but **no seeds** (spores). **Ferns**, **horsetails** (Equisetum), Marsilea.\n" +
        "- **Gymnosperms**: **naked seeds**, no fruit. Pine, cycas, deodar.\n" +
        "- **Angiosperms**: **seeds inside a fruit**; flowering plants. Mango, wheat, rose.",
      table: {
        columns: ["Group", "Vascular tissue", "Seeds", "Examples"],
        rows: [
          { cells: ["Thallophyta", "No", "No", "Spirogyra, Chara"] },
          { cells: ["Bryophyta", "No", "No", "Funaria (moss), Marchantia"] },
          {
            cells: ["Pteridophyta", "Yes", "No (spores)", "Ferns, horsetails, Marsilea"],
            noteAmber: "First plants with vascular tissue, but still no seeds.",
          },
          { cells: ["Gymnosperms", "Yes", "Naked", "Pine, cycas"] },
          { cells: ["Angiosperms", "Yes", "Inside a fruit", "Mango, wheat"] },
        ],
      },
      selfCheckExample: {
        prompt: "A plant has roots, stem, leaves and vascular tissue, and its seeds are not covered by a fruit. Which group is it in?",
        steps: ["Vascular tissue rules out algae and mosses.", "It has seeds, so it is not a pteridophyte.", "Bare seeds, no fruit: a gymnosperm."],
        answer: "Gymnosperms",
      },
      practiceSet: [
        { prompt: "Which plant group is called the amphibians of the plant kingdom?", answer: "Bryophyta" },
        { prompt: "Is pine a gymnosperm or an angiosperm?", answer: "A gymnosperm" },
        { prompt: "To which group does Spirogyra belong?", answer: "Thallophyta (algae)" },
        { prompt: "Which plant group bears seeds inside a fruit?", answer: "Angiosperms" },
      ],
      pyqExampleId: "83fe62a8-39c0-4ea2-abcc-5e90eb484968",
      traps: [
        {
          title: "Ferns as mosses",
          body: "Mosses (bryophytes) have no vascular tissue. Ferns and horsetails have it but bear no seeds, so they are pteridophytes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spibdgr-vertebrates",
      name: "The five vertebrate classes and their hearts",
      intuition:
        "A fish's heart has two chambers and sends blood to the gills only, so blood passes through the heart once per round of the body: single circulation. " +
        "Every other vertebrate sends blood through the heart twice. Questions often give Latin genus names, so learn which class each belongs to.",
      definition:
        "- **Pisces** (fishes): gills, scales, **two-chambered heart**, **single circulation**. Labeo (rohu), Hippocampus (sea horse), Exocoetus (flying fish), Anabas (climbing perch).\n" +
        "- **Amphibia**: moist skin, live on land and in water, three-chambered heart. Rana (frog), Hyla (tree frog), Salamander.\n" +
        "- **Reptilia**: dry scaly skin, mostly three-chambered heart (crocodile has four). Draco (flying lizard), chameleon, turtle, snake.\n" +
        "- **Aves** (birds): feathers, four-chambered heart. Pigeon, sparrow.\n" +
        "- **Mammalia**: hair, mammary glands, four-chambered heart. Whale, dolphin, bat, human.",
      table: {
        columns: ["Class", "Heart chambers", "Circulation", "Examples"],
        rows: [
          {
            cells: ["Pisces", "Two", "Single", "Labeo, Hippocampus, Exocoetus, Anabas"],
            noteAmber: "Only the fishes have single circulation.",
          },
          { cells: ["Amphibia", "Three", "Double", "Rana, Hyla, Salamander"] },
          { cells: ["Reptilia", "Three (crocodile four)", "Double", "Draco, chameleon, turtle"] },
          { cells: ["Aves", "Four", "Double", "Pigeon, sparrow"] },
          { cells: ["Mammalia", "Four", "Double", "Whale, dolphin, bat"] },
        ],
        caption: "Sea horse, flying fish and climbing perch are all true fishes; whale and dolphin are mammals.",
      },
      selfCheckExample: {
        prompt: "Spot the odd one out by class: Rana, Hyla, Salamander, Draco.",
        steps: ["Rana, Hyla and Salamander are amphibians.", "Draco, the flying lizard, is a reptile."],
        answer: "Draco",
      },
      practiceSet: [
        { prompt: "How many chambers does a fish's heart have?", answer: "Two" },
        { prompt: "Is a whale a fish or a mammal?", answer: "A mammal" },
        { prompt: "Which vertebrate class has feathers?", answer: "Aves (birds)" },
        { prompt: "Which reptile has a four-chambered heart?", answer: "The crocodile" },
      ],
      pyqExampleId: "40726a65-eed5-427d-a9da-78e489010427",
      traps: [
        {
          title: "Whales and dolphins as fishes",
          body: "Whales and dolphins live in water but breathe air with lungs and feed their young on milk: they are mammals with double circulation.",
        },
        {
          title: "Sea horse and flying fish as not fish",
          body: "The sea horse (Hippocampus) and flying fish (Exocoetus) look odd but have gills, fins and a two-chambered heart. They are true fishes.",
        },
      ],
    },
  ],
};
