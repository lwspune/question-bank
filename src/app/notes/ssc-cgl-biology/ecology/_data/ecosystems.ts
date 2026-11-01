import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BEE_ECOSYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Ecosystems, Adaptations and Environment",
  title: "Ecosystems, Adaptations and Environment",
  oneLineDefinition:
    "Kinds of ecosystem and the terms for energy and mass in them, the nitrogen-cycle microbes, named adaptations and the ecologists behind them, and greenhouse gases and threatened species.",
  whyItMatters:
    "Seventeen questions in the bank: four from the 2023 shifts, 12 from the 2024 shifts and one from the 2025 shifts, three of them HARD. The hard ones ask a scientist and a year, so learn the short list of names with their dates.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbeeec-ecosystems",
      name: "Ecosystems and their terms",
      intuition:
        "An ecosystem is living things together with their surroundings. SSC asks its kinds, and the words for how much is there and how energy passes along.",
      definition:
        "Kinds:\n" +
        "- The ecosystem is the **functional unit of nature**.\n" +
        "- Two basic kinds: **terrestrial** (forest, grassland, desert) and **aquatic** (fresh water and sea).\n" +
        "- **Freshwater** habitats: rivers, creeks, lakes, ponds, streams. Sea water is salt water.\n" +
        "- **Man-made** ecosystems: an **aquarium**, a crop field, a garden.\n\n" +
        "Terms:\n" +
        "- **Standing crop**: the living material at a trophic level at one time, measured as **biomass**.\n" +
        "- **Ecological efficiency**: the **ratio of energy flows** at two points in a food chain, about 10% from one level to the next.\n\n" +
        "Nitrogen cycle: **Rhizobium** fixes nitrogen in legume roots; **Nitrosomonas** and **Nitrobacter** turn ammonia into nitrite and then nitrate.",
      table: {
        columns: ["Term", "Meaning"],
        rows: [
          { cells: ["Two basic kinds", "Terrestrial and aquatic"], pyqExampleId: "e2c907a7-ff0c-4ae8-bf64-339dbc2a8493" },
          { cells: ["Man-made ecosystem", "Aquarium"], pyqExampleId: "aeb0697a-5620-4477-aa10-37ea63961de6" },
          { cells: ["Standing crop", "Measured as biomass"], pyqExampleId: "22ee9177-a929-433e-9801-f8c7aa119ddb" },
          { cells: ["Ecological efficiency", "Ratio of energy flows"], pyqExampleId: "a5af5f38-0ab7-48cb-b53b-46bb83b954d2" },
          { cells: ["Rhizobium, Nitrobacter", "Nitrogen cycle"], pyqExampleId: "d78f014b-d749-4601-a109-378649b3acb2" },
        ],
      },
      pyqExampleId: "a1a611c5-af25-4c86-a6c3-0a08d79a6da7",
      selfCheckExample: {
        prompt: "A plant level holds 10,000 units of energy and the herbivores feeding on it hold 1,000. What is the ecological efficiency?",
        steps: ["Efficiency is the ratio of the two energy flows.", "1,000 / 10,000 = 0.1, or 10%."],
        answer: "10%.",
      },
      practiceSet: [
        { prompt: "Is a pond a freshwater habitat?", answer: "Yes" },
        { prompt: "Which microbe fixes nitrogen in legume roots?", answer: "Rhizobium" },
        { prompt: "Is a grassland natural or man-made?", answer: "Natural" },
      ],
      traps: [
        {
          title: "Standing crop is not productivity",
          body: "**Standing crop** is an amount present now (biomass). **Productivity** is a rate of production, gross or net.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbeeec-interactions",
      name: "Adaptations, interactions and ecologists",
      intuition:
        "Living things adapt to climate and to each other. SSC names an adaptation or a strategy and asks for it, or asks which scientist studied what.",
      definition:
        "Adaptations and interactions:\n" +
        "- **Allen's rule**: mammals from **cold** climates have **shorter ears and limbs**, to lose less heat.\n" +
        "- **Brood parasitism**: a parasite gets another animal to raise its young, as the **cuckoo** does with a crow.\n" +
        "- **Calotropis** defends itself **chemically** with poisonous glycosides, so cattle do not eat it.\n\n" +
        "Branches and people:\n" +
        "- **Paleoecology**: ancient environments and the organisms of the past.\n" +
        "- **Henry Chandler Cowles**: plant succession in the **Indiana Dunes**, from **1896**.\n" +
        "- **Pierre François Verhulst**: the **logistic** growth equation, **1838**.",
      table: {
        columns: ["Name", "What it is"],
        rows: [
          { cells: ["Brood parasitism", "Others raise the parasite's young"], pyqExampleId: "e62d7543-0796-4a59-99a8-ada22e9786b3" },
          { cells: ["Calotropis", "Chemical defence"], pyqExampleId: "7d9342d4-f97e-4029-8212-e24edc8bb2b5" },
          { cells: ["Paleoecology", "Ancient environments"], pyqExampleId: "b75c3c58-980d-4511-be67-e4e57556a036" },
          { cells: ["Verhulst, 1838", "Logistic growth"], pyqExampleId: "df8ff889-8789-45c1-b2d7-0e20f89ab3bc" },
          { cells: ["Cowles, 1896", "Indiana Dunes"], pyqExampleId: "d3e1de39-d141-40c1-a352-2de7609f3ab0" },
        ],
      },
      pyqExampleId: "1fc313e2-a282-4010-af5d-fd69aaf55af9",
      selfCheckExample: {
        prompt: "An arctic fox has smaller ears than a desert fox. Which rule explains this, and why does it help?",
        steps: ["Allen's rule: animals from cold climates have shorter appendages.", "Smaller ears expose less surface, so less body heat is lost."],
        answer: "Allen's rule; it cuts heat loss.",
      },
      practiceSet: [
        { prompt: "Which bird is the usual example of brood parasitism?", answer: "The cuckoo" },
        { prompt: "Who published the logistic growth equation?", answer: "Pierre François Verhulst" },
        { prompt: "What does paleoecology study?", answer: "Ancient environments and organisms" },
      ],
      traps: [
        {
          title: "Kleptoparasitism is stealing food",
          body: "**Kleptoparasitism** means stealing another animal's food. Getting others to raise your young is **brood** parasitism.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbeeec-environment",
      name: "Greenhouse gases and threatened species",
      intuition:
        "A few environment questions sit in this chapter: which gases trap heat, and which species are in danger and why.",
      definition:
        "The facts:\n" +
        "- **Greenhouse gases** (Kyoto list): carbon dioxide, methane, **nitrous oxide** (N2O). **Nitric oxide** (NO) is a smog pollutant, **not** a greenhouse gas.\n" +
        "- **Hubbardia heptaneuron** is a **grass** of the Western Ghats, first found in the spray of **Jog Falls**; a dam cut the falls' flow, and it is now critically endangered.\n" +
        "- In the **Western Ghats**, beyond habitat loss, **invasive alien species** such as Lantana threaten native plants.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Nitrous oxide", "Greenhouse gas"] },
          { cells: ["Nitric oxide", "Not a greenhouse gas"] },
          { cells: ["Hubbardia heptaneuron", "Endangered grass"], pyqExampleId: "3263b1b4-e2dd-459f-ace7-353b5faca5d4" },
        ],
      },
      pyqExampleId: "76c0ec17-273c-4c2c-9204-c46f8dd50a05",
      selfCheckExample: {
        prompt: "Why is Hubbardia heptaneuron, a grass first found at Jog Falls, now critically endangered?",
        steps: ["It grew in the spray zone of the falls.", "A dam cut the falls' flow, and the spray zone it depended on dried up."],
        answer: "Its habitat, the spray zone of Jog Falls, was lost when a dam cut the flow.",
      },
      practiceSet: [
        { prompt: "Is methane a greenhouse gas?", answer: "Yes" },
        { prompt: "What kind of plant is Hubbardia heptaneuron?", answer: "A grass" },
        { prompt: "Name an invasive plant in the Western Ghats.", answer: "Lantana" },
      ],
      traps: [
        {
          title: "Nitric and nitrous differ",
          body: "**Nitrous** oxide traps heat; **nitric** oxide does not. The names differ by one syllable, and SSC uses exactly that.",
        },
      ],
    },
  ],
};
