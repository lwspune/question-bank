import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_PL_FOOD_NOTE: SubtopicNote = {
  subtopicName: "Photosynthesis, Nutrients and Hormones",
  title: "Photosynthesis, Nutrients and Hormones",
  oneLineDefinition:
    "How a leaf turns light, water and carbon dioxide into glucose, the pigments that catch the light, the mineral elements a plant needs, and the five plant hormones.",
  whyItMatters:
    "Eleven CDS questions from 2018 (I) to 2026 (II). Seven are about photosynthesis and its pigments, three about plant hormones and one about micronutrients. Magnesium has come up twice: once as the metal in chlorophyll and once as the element that is not a micronutrient.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbipl-photosynthesis",
      name: "Photosynthesis",
      intuition:
        "In photosynthesis a leaf uses the energy of sunlight to build glucose out of carbon dioxide and water. It happens in two stages. In the first, chlorophyll catches light and uses its energy to split water: oxygen is given off, and the hydrogen is kept. In the second, which needs no light of its own, that hydrogen is used to turn carbon dioxide into sugar.",
      definition:
        "Photosynthesis (NCERT Class 10 and 11):\n" +
        "- Overall: \\(6\\,\\mathrm{CO_2} + 12\\,\\mathrm{H_2O} \\rightarrow \\mathrm{C_6H_{12}O_6} + 6\\,\\mathrm{O_2} + 6\\,\\mathrm{H_2O}\\), in the presence of **sunlight and chlorophyll**. It makes **glucose**; respiration breaks glucose down.\n" +
        "- It takes place in the **chloroplast**, the only part of a leaf cell that holds chlorophyll.\n" +
        "- **Light reactions** (in the grana, the thylakoids): chlorophyll absorbs light, **water is split** (photolysis), **oxygen** is released, and ATP and NADPH are made. The splitting of water by light is the **Hill reaction**.\n" +
        "- **Light-independent (dark) reactions** in the **stroma**: the **Calvin cycle** uses that ATP and NADPH to **reduce carbon dioxide** to sugar.\n" +
        "- So the **oxygen** given off comes from **water**, and the **carbon** in sugar comes from **carbon dioxide**.\n" +
        "- Extra glucose is stored as **starch**. **Starch test**: boil the leaf in water (kills the cells), then in alcohol (removes the chlorophyll), then add **iodine**: starch turns **blue-black**.",
      table: {
        columns: ["Stage", "Where", "What happens"],
        rows: [
          { cells: ["Light reactions", "Thylakoids (grana) of the chloroplast", "Light absorbed, water split, oxygen released, ATP and NADPH made"] },
          {
            cells: ["Calvin cycle (light-independent)", "Stroma of the chloroplast", "Carbon dioxide reduced to sugar"],
            noteAmber: "CDS 2026 (II): the Calvin cycle is the light-independent part; the Hill reaction and photosystems need light.",
            pyqExampleId: "b9728539-8bc0-44c0-96e2-4acac772f075",
          },
          {
            cells: ["Product", "Leaf cells", "Glucose, stored as starch"],
            noteAmber: "CDS 2022 (I): plants prepare glucose by photosynthesis.",
            pyqExampleId: "1cbe4f12-f24c-4ed6-b2ab-26e3a19bb81e",
          },
          {
            cells: ["Starch test", "A leaf from a sunny day", "Boiled, decolourised in alcohol, turns blue-black with iodine"],
            noteAmber: "CDS 2023 (I): the leaf ends up blue (blue-black) after the iodine test.",
            pyqExampleId: "6be54527-12ef-4e12-b5eb-75e065f27315",
          },
        ],
      },
      pyqExampleId: "58798656-97cd-40d0-bae1-ec628177c9d0",
      selfCheckExample: {
        prompt: "A potted plant is kept in the dark for two days. Then part of one leaf is covered with black paper and the plant is kept in sunlight for a day. The leaf is tested with iodine. What does it show?",
        steps: [
          "Two days of darkness use up the starch already in the leaves.",
          "In sunlight the uncovered part photosynthesises and stores new starch; the covered part gets no light and makes none.",
          "Iodine turns starch blue-black.",
        ],
        answer: "Only the uncovered part turns blue-black, which shows that light is needed for photosynthesis.",
      },
      practiceSet: [
        { prompt: "Which gas does a green plant give off during photosynthesis?", answer: "Oxygen" },
        { prompt: "In which part of the chloroplast does the Calvin cycle take place?", answer: "The stroma" },
        { prompt: "Why is a leaf boiled in alcohol before testing it for starch?", answer: "To remove the chlorophyll so the colour change can be seen" },
        { prompt: "In what form do plants store extra glucose?", answer: "Starch" },
      ],
      traps: [
        {
          title: "Carbon dioxide is reduced, not oxidised",
          body: "In photosynthesis **water** is split and **carbon dioxide** is **reduced** to sugar. Options saying carbon dioxide is oxidised, or that light turns into kinetic energy, are wrong.",
        },
        {
          title: "The oxygen comes from water",
          body: "The **oxygen** released in photosynthesis comes from the **splitting of water**, not from carbon dioxide.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-pigments",
      name: "Chlorophyll and carotenoids",
      intuition:
        "Chlorophyll is green because it absorbs red and blue light and reflects green. At the centre of every chlorophyll molecule sits one atom of magnesium. The yellow and orange carotenoids help by catching extra light and passing its energy on, and by protecting chlorophyll from too much light. In autumn the chlorophyll breaks down first, and the yellow and orange colours that were there all along show through.",
      definition:
        "Leaf pigments (NCERT Class 11):\n" +
        "- **Chlorophyll** is held in the **chloroplasts**. **Magnesium** is the metal at the centre of its molecule.\n" +
        "- **Chlorophyll a** is the **chief pigment**: it forms the **reaction centre** where light energy is turned into chemical energy.\n" +
        "- **Chlorophyll b** and the **carotenoids** are **accessory pigments**: they catch more light and pass the energy to chlorophyll a.\n" +
        "- **Carotenoids**: **carotene** (orange) and **xanthophyll** (yellow). They **protect chlorophyll from photo-oxidation** and give the **yellow and orange** colours of autumn leaves.\n" +
        "- In the human eye, carotenoids such as lutein also shield the retina from strong light.",
      table: {
        columns: ["Pigment", "Colour", "Role"],
        rows: [
          { cells: ["Chlorophyll a", "Blue-green", "Chief pigment; the reaction centre"] },
          { cells: ["Chlorophyll b", "Yellow-green", "Accessory pigment"] },
          {
            cells: ["Carotene", "Orange", "Accessory pigment; protects chlorophyll"],
            noteAmber: "CDS 2026 (I): forming the reaction centre is NOT a function of carotenoids.",
            pyqExampleId: "7c0fa451-e404-468b-ae9e-e26929e65210",
          },
          { cells: ["Xanthophyll", "Yellow", "Accessory pigment; protects chlorophyll"] },
          {
            cells: ["Where they sit", "Chloroplast", "In the thylakoid membranes"],
            noteAmber: "CDS 2024 (II): the only structure in a leaf that hosts chlorophyll is the chloroplast.",
            pyqExampleId: "a7c2559e-fac6-4de1-856b-f93f8c10c77e",
          },
        ],
      },
      pyqExampleId: "e4c25724-1e4e-4b85-abd4-f1d27e0602a8",
      selfCheckExample: {
        prompt: "In autumn the leaves of many trees turn yellow and orange before they fall. Where do these colours come from?",
        steps: [
          "Green chlorophyll breaks down as the leaf ages.",
          "The carotenoids, carotene (orange) and xanthophyll (yellow), break down more slowly.",
          "They were in the leaf all along, hidden by the green, and now show through.",
        ],
        answer: "From the carotenoids, which show once the green chlorophyll has broken down.",
      },
      practiceSet: [
        { prompt: "Which pigment is the chief pigment of photosynthesis?", answer: "Chlorophyll a" },
        { prompt: "What colour is xanthophyll?", answer: "Yellow" },
        { prompt: "Which pigment gives a carrot its orange colour?", answer: "Carotene" },
        { prompt: "Are carotenoids chief pigments or accessory pigments?", answer: "Accessory pigments" },
      ],
      traps: [
        {
          title: "Magnesium, not iron, in chlorophyll",
          body: "**Magnesium** sits at the centre of chlorophyll. **Iron** sits at the centre of haemoglobin in blood, and plants need iron to make chlorophyll but it is not part of the molecule.",
        },
        {
          title: "Only chlorophyll a is the reaction centre",
          body: "Carotenoids colour leaves, protect chlorophyll and protect the eye, but they do **not** form the **reaction centre**. That is **chlorophyll a**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-nutrients",
      name: "Macronutrients and micronutrients",
      intuition:
        "A plant takes many elements from the soil. Some it needs in large amounts, because they go into the bulk of its body: these are the macronutrients. Others it needs only in traces, mostly to make enzymes work: these are the micronutrients. A small need does not mean a small role; without them the plant still falls sick.",
      definition:
        "Essential mineral elements (NCERT Class 11, Mineral Nutrition):\n" +
        "- **Macronutrients** (needed in large amounts): **carbon, hydrogen, oxygen, nitrogen, phosphorus, sulphur, potassium, calcium and magnesium**.\n" +
        "- **Micronutrients** (needed in traces): **iron, manganese, copper, molybdenum, zinc, boron, chlorine and nickel**.\n" +
        "- **Magnesium** is part of chlorophyll; **nitrogen** is part of every protein and of chlorophyll; **iron** is needed to make chlorophyll.\n" +
        "- A shortage that turns leaves yellow is **chlorosis**; it follows a lack of nitrogen, magnesium or iron, among others.",
      table: {
        columns: ["Element", "Kind", "One role"],
        rows: [
          { cells: ["Nitrogen", "Macronutrient", "Part of proteins and chlorophyll"] },
          { cells: ["Phosphorus", "Macronutrient", "Part of nucleic acids and ATP"] },
          { cells: ["Potassium", "Macronutrient", "Opening and closing of stomata"] },
          {
            cells: ["Magnesium", "Macronutrient", "Centre of the chlorophyll molecule"],
            noteAmber: "CDS 2024 (II): magnesium is NOT a micronutrient; iron, manganese and chlorine are.",
            pyqExampleId: "2829378f-d75c-4502-8e0d-01b398505d79",
          },
          { cells: ["Iron", "Micronutrient", "Needed to make chlorophyll"] },
          { cells: ["Zinc", "Micronutrient", "Activates enzymes; needed for auxin"] },
          { cells: ["Boron", "Micronutrient", "Pollen germination, cell growth"] },
        ],
      },
      pyqExampleId: "2829378f-d75c-4502-8e0d-01b398505d79",
      selfCheckExample: {
        prompt: "Sort these into macronutrients and micronutrients: nitrogen, zinc, potassium, boron, calcium, copper.",
        steps: [
          "The macronutrients are C, H, O, N, P, S, K, Ca and Mg.",
          "The micronutrients are Fe, Mn, Cu, Mo, Zn, B, Cl and Ni.",
          "Place each element in its list.",
        ],
        answer: "Macronutrients: nitrogen, potassium, calcium. Micronutrients: zinc, boron, copper.",
      },
      practiceSet: [
        { prompt: "Is phosphorus a macronutrient or a micronutrient?", answer: "A macronutrient" },
        { prompt: "Is molybdenum a macronutrient or a micronutrient?", answer: "A micronutrient" },
        { prompt: "Which element is part of every protein?", answer: "Nitrogen" },
        { prompt: "What is the yellowing of leaves from a nutrient shortage called?", answer: "Chlorosis" },
      ],
      traps: [
        {
          title: "Magnesium and manganese are different",
          body: "**Magnesium** (Mg) is a **macronutrient**, part of chlorophyll. **Manganese** (Mn) is a **micronutrient**. The names look alike, which is the trap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbipl-hormones",
      name: "Plant hormones",
      intuition:
        "Plants have no nerves, so they send messages with chemicals. Three of these chemicals speed growth up in different ways: one makes cells longer, one makes stems shoot up, and one makes cells divide. A fourth, a gas, ripens fruit. The fifth puts the brakes on: it slows growth, keeps seeds asleep and closes the stomata when water is short.",
      definition:
        "The five plant hormones (NCERT Class 10 and 11):\n" +
        "- **Auxin**: **cell elongation**; makes shoots bend towards light (phototropism); used to make cuttings root.\n" +
        "- **Gibberellins**: **stem elongation**, bolting, breaking seed dormancy; used to make grapes bigger.\n" +
        "- **Cytokinins**: promote **cell division**; delay the ageing of leaves. Most plentiful where cells divide fast, as in fruits and seeds.\n" +
        "- **Ethylene**: a gas that **ripens fruit**; it can promote or inhibit, but is largely an inhibitor of growth.\n" +
        "- **Abscisic acid (ABA)**: the **growth inhibitor**; causes dormancy, **closes stomata** in drought, and the fall of leaves (abscission). It is called the stress hormone.\n" +
        "- **Thyroxine** is an **animal** hormone, made by the thyroid gland. It is not a plant hormone.",
      table: {
        columns: ["Hormone", "Main effect"],
        rows: [
          { cells: ["Auxin", "Cell elongation; bending towards light"] },
          { cells: ["Gibberellins", "Stem elongation; seed germination"] },
          { cells: ["Cytokinins", "Cell division"] },
          { cells: ["Ethylene", "Fruit ripening"] },
          {
            cells: ["Abscisic acid", "Inhibits growth; dormancy; closes stomata"],
            noteAmber: "CDS 2024 (II): the hormone that inhibits growth is abscisic acid.",
            pyqExampleId: "b21fd326-d218-4d64-b686-af39cc06b3fd",
          },
          {
            cells: ["Thyroxine", "Not a plant hormone: made by the thyroid of animals"],
            noteAmber: "CDS 2025 (I): of gibberellins, abscisic acid, auxins and thyroxine, thyroxine is not a plant hormone.",
            pyqExampleId: "a1807a62-ed8f-4cf8-ad84-94e5874a44b7",
          },
        ],
      },
      pyqExampleId: "882d7164-4268-4a5d-973e-cd252e14e828",
      selfCheckExample: {
        prompt: "A gardener wants stem cuttings of a rose to grow roots quickly. Which hormone should be applied, and what else does that hormone do?",
        steps: [
          "Root formation on cuttings is promoted by auxin.",
          "Auxin also makes cells grow longer.",
          "It gathers on the shaded side of a shoot, so the shoot bends towards light.",
        ],
        answer: "Auxin; it also causes cell elongation and the bending of shoots towards light.",
      },
      practiceSet: [
        { prompt: "Which plant hormone is a gas that ripens fruit?", answer: "Ethylene" },
        { prompt: "Which hormone is used to make grapes grow bigger?", answer: "Gibberellins" },
        { prompt: "Which hormone closes the stomata when a plant is short of water?", answer: "Abscisic acid" },
        { prompt: "Which hormone makes a shoot bend towards light?", answer: "Auxin" },
      ],
      traps: [
        {
          title: "Cytokinin divides, auxin lengthens",
          body: "**Cytokinins** promote **cell division**. **Auxin** promotes cell **elongation**, and gibberellins lengthen the stem. Mixing these up is the usual mistake.",
        },
        {
          title: "Three promote, abscisic acid inhibits",
          body: "**Auxin, gibberellins and cytokinins** are growth **promoters**. **Abscisic acid** is the growth **inhibitor**. Ethylene can act either way (NCERT calls it largely an inhibitor), so when abscisic acid is offered, it is the answer.",
        },
      ],
    },
  ],
};
