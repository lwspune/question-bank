import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_CT_PLANT_NOTE: SubtopicNote = {
  subtopicName: "Plant Tissues",
  title: "Plant Tissues",
  oneLineDefinition:
    "Plant tissues are meristems, which keep dividing to make the plant grow, and permanent tissues: the simple ones parenchyma, collenchyma and sclerenchyma, and the complex ones xylem and phloem.",
  whyItMatters:
    "Seven questions in the bank, one EASY, five MODERATE and one HARD. Three sort the simple permanent tissues by their cell walls and their work, one finds the plant with no aerenchyma, one asks where intercalary meristem lies and two are about xylem and phloem. Two are lists of statements to judge true or false, so each fact in the tables below is worth a mark.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9ctpl-meristem",
      name: "Meristems: the tissues that make a plant grow",
      intuition:
        "A plant keeps growing all its life, but only in a few places. At those places small, busy cells keep dividing, like a workshop that never closes. Where the workshop sits decides what grows: at the tips the plant gets longer, along the sides it gets thicker.",
      definition:
        "- **Meristem** cells are small, have **thin walls**, dense cytoplasm, a large nucleus and almost no vacuoles. They keep **dividing**.\n" +
        "- **Apical meristem**: at the **tips of the root and stem**. It increases the **length**.\n" +
        "- **Intercalary meristem**: at the **base of the internodes, near the nodes**, as in **grasses and bamboo**. It also increases **length**.\n" +
        "- **Lateral meristem** (the **cambium**): along the sides of the stem and root. It increases the **girth** (thickness).\n" +
        "- Cells made by a meristem soon stop dividing and become **permanent tissue**.",
      table: {
        columns: ["Meristem", "Where it is", "What it does"],
        rows: [
          { cells: ["Apical", "Tips of the root and the stem", "Increases length"] },
          { cells: ["Intercalary", "Base of the internodes, at the nodes (grasses, bamboo)", "Increases length"] },
          { cells: ["Lateral (cambium)", "Along the sides of the stem and root", "Increases girth"] },
        ],
        caption: "Lateral means at the side: it makes the stem fatter, never longer.",
      },
      selfCheckExample: {
        prompt: "A tree trunk becomes thicker every year. Which meristem is responsible?",
        steps: ["Growth in thickness (girth) comes from the meristem along the sides of the stem."],
        answer: "The lateral meristem (cambium)",
      },
      practiceSet: [
        { prompt: "Which meristem makes a root grow longer at its tip?", answer: "The apical meristem" },
        { prompt: "In which plants is intercalary meristem easy to see?", answer: "In grasses and bamboo, at the base of the internodes" },
        { prompt: "Do meristem cells have thick walls or thin walls?", answer: "Thin walls" },
        { prompt: "What is the other name of the lateral meristem?", answer: "Cambium" },
      ],
      pyqExampleId: "a2aa5bbb-29d1-4202-a377-47796ac1fdfe",
      traps: [
        {
          title: "Saying lateral meristem makes the plant longer",
          body: "The lateral meristem (cambium) increases girth. Length comes from the apical and intercalary meristems.",
        },
        {
          title: "Putting intercalary meristem at the tip",
          body: "The tips hold the apical meristem. Intercalary meristem lies at the base of the internodes, near the nodes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ctpl-simple",
      name: "Simple permanent tissues: parenchyma, collenchyma and sclerenchyma",
      intuition:
        "Tell the three apart by their walls. Parenchyma has thin walls, like soft packing. Collenchyma is thickened only at the corners, so it is strong but still bends, like a leaf stalk in the wind. Sclerenchyma has thick walls full of lignin, like a coconut shell: very strong, and the cells inside are dead.",
      definition:
        "- **Parenchyma**: living cells with **thin cellulose walls** and spaces between them. Stores food. With chloroplasts it is **chlorenchyma** and makes food in leaves (**photosynthesis**). With large air spaces it is **aerenchyma**, which helps water plants such as **Pistia**, lotus and water hyacinth float.\n" +
        "- **Collenchyma**: living cells whose walls are **thickened at the corners** with **cellulose and pectin**. Gives **support and flexibility**, as in leaf stalks and young stems.\n" +
        "- **Sclerenchyma**: **dead** cells with thick walls of **cellulose and lignin**. Gives **strength and rigidity**: the husk of a coconut, jute fibres, hard seed coats.\n" +
        "- **Bamboo** grows on dry land: its stem is hollow, but it has no aerenchyma.",
      table: {
        columns: ["Tissue", "Cell wall", "Living or dead", "Main work"],
        rows: [
          { cells: ["Parenchyma", "Thin, of cellulose", "Living", "Stores food; photosynthesis (chlorenchyma); floating (aerenchyma)"] },
          { cells: ["Collenchyma", "Thickened at the corners with cellulose and pectin", "Living", "Support and flexibility"] },
          { cells: ["Sclerenchyma", "Thick, with lignin", "Dead", "Strength and rigidity"] },
        ],
        caption: "Flexibility belongs to collenchyma alone; sclerenchyma is rigid.",
      },
      selfCheckExample: {
        prompt: "The fibres of a coconut husk are very hard and do not bend. Which tissue are they made of, and what makes their walls so hard?",
        steps: ["Hard, rigid tissue with thick walls is sclerenchyma.", "Its walls are thickened with lignin."],
        answer: "Sclerenchyma, whose walls contain lignin",
      },
      practiceSet: [
        { prompt: "Which tissue in a leaf has chloroplasts and makes food?", answer: "Chlorenchyma, a kind of parenchyma" },
        { prompt: "What is parenchyma with large air spaces called, and in which plants is it found?", answer: "Aerenchyma, found in water plants such as lotus and water hyacinth" },
        { prompt: "Which simple tissue has cell walls thickened only at the corners?", answer: "Collenchyma" },
        { prompt: "Are the cells of sclerenchyma living or dead?", answer: "Dead" },
      ],
      pyqExampleId: "3e9626d6-2fa4-4791-9e76-4272f5af1bb2",
      traps: [
        {
          title: "Giving flexibility to sclerenchyma",
          body: "Sclerenchyma gives rigid strength. The tissue that gives both support and flexibility is collenchyma.",
        },
        {
          title: "Giving parenchyma thick walls",
          body: "Parenchyma cells have thin walls. Thick walls belong to sclerenchyma, and corner thickening to collenchyma.",
        },
        {
          title: "Thinking every hollow stem has aerenchyma",
          body: "Aerenchyma is found in plants of water and wet soil. Bamboo grows on dry land: its hollow stem is not aerenchyma.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9ctpl-complex",
      name: "Complex tissues: xylem and phloem",
      intuition:
        "A plant has two pipe systems running side by side. Xylem is the water pipe: it lifts water and minerals from the roots, always upwards. Phloem is the food delivery line: it takes the food made in the leaves to every part, up or down, wherever it is needed.",
      definition:
        "- A **complex tissue** is made of more than one kind of cell working together.\n" +
        "- **Xylem**: tube-like **tracheids and vessels**, with xylem parenchyma and xylem fibres. Carries **water and minerals** from the roots, in **one direction only: upwards**. Most of its cells are dead.\n" +
        "- **Phloem**: **sieve tubes** and **companion cells**, with phloem parenchyma and phloem fibres. Carries **food** (sugars and **amino acids**) from the leaves, **both upwards and downwards**.\n" +
        "- Xylem and phloem together make a **vascular bundle**.",
      table: {
        columns: ["Tissue", "Made of", "Carries", "Direction"],
        rows: [
          { cells: ["Xylem", "Tracheids, vessels, xylem parenchyma, xylem fibres", "Water and minerals", "Upwards only"] },
          { cells: ["Phloem", "Sieve tubes, companion cells, phloem parenchyma, phloem fibres", "Food: sugars and amino acids", "Upwards and downwards"] },
        ],
        caption: "If the options name only parenchyma, collenchyma and sclerenchyma, none of them conducts anything.",
      },
      selfCheckExample: {
        prompt: "Sugar made in the leaves of a sugarcane plant is stored in its stem. Which tissue carries it there?",
        steps: ["Food made in the leaves is carried by phloem, which can move it downwards."],
        answer: "Phloem",
      },
      practiceSet: [
        { prompt: "Which tissue carries water from the roots to the leaves?", answer: "Xylem" },
        { prompt: "In which direction does phloem carry food?", answer: "Both upwards and downwards" },
        { prompt: "What is a group of xylem and phloem running together called?", answer: "A vascular bundle" },
        { prompt: "Name the cells that sit beside the sieve tubes in phloem.", answer: "Companion cells" },
      ],
      pyqExampleId: "d5710f06-4526-40a1-b618-6045fa56e183",
      traps: [
        {
          title: "Letting xylem carry food",
          body: "Xylem carries water and minerals only. Food, including amino acids, travels in the phloem.",
        },
        {
          title: "Calling a simple tissue a conducting tissue",
          body: "Parenchyma, collenchyma and sclerenchyma do not conduct water. Only the complex tissues, xylem and phloem, do.",
        },
      ],
    },
  ],
};
