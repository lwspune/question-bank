import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BPB_PLANTS_NOTE: SubtopicNote = {
  subtopicName: "Plant Form and Processes",
  title: "Plant Form and Processes",
  oneLineDefinition:
    "Leaf venation and arrangement with example plants, xylem and phloem, how stomata open, transpiration, plant nutrients and plant hormones.",
  whyItMatters:
    "Eleven questions in the bank: one from the 2023 shifts, six from the 2024 shifts and four from the 2025 shifts. Most name a plant and ask its leaf type, or state a process and ask whether it is true, so the example plants are worth learning.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbpbpl-form",
      name: "Leaves, tissues and plant form",
      intuition:
        "A leaf's veins and its place on the stem follow a few patterns, and SSC asks which plant shows which. Monocots and dicots split cleanly on venation.",
      definition:
        "Leaves:\n" +
        "- **Venation**: **reticulate** (net) in dicots such as tulsi, coriander, China rose; **parallel** in monocots such as **maize**. Parallel veins give vascular bundles of similar size.\n" +
        "- **Phyllotaxy** (leaf arrangement): **opposite** in **guava** and Calotropis; alternate in China rose and mustard; whorled in Alstonia.\n" +
        "- Compound leaves: **pinnate** in **neem** (leaflets along an axis); **palmate** in silk cotton (leaflets from one point).\n\n" +
        "Tissues and form:\n" +
        "- **Xylem** carries **water**; **phloem** carries **food**.\n" +
        "- A plant's **habit** is its growth form: size, shape, orientation. Its habitat is where it lives.\n" +
        "- **Red algae** reproduce vegetatively by **fragmentation**; grafting and cutting are methods people use.",
      table: {
        columns: ["Plant or term", "Feature"],
        rows: [
          { cells: ["Guava", "Opposite phyllotaxy"], pyqExampleId: "8276fc27-b30a-438f-9a8f-fd67b42a0dd2" },
          { cells: ["Neem", "Pinnately compound leaf"], pyqExampleId: "a7454c17-f2e6-4b5b-8cae-ed91fc46e51b" },
          { cells: ["Habit", "Size, shape and orientation"], pyqExampleId: "f9947fc8-673f-4a60-a765-87caf3efa2fb" },
          { cells: ["Phloem", "Carries food, not water"], pyqExampleId: "57e8cba8-e8b8-45c7-a0e2-670403980104" },
          { cells: ["Red algae", "Fragmentation"], pyqExampleId: "c53e21f0-74cf-4a0f-aa45-b4a32ae3ef8a" },
        ],
      },
      pyqExampleId: "30f3590f-dbe4-4584-b317-0aa61fec5078",
      selfCheckExample: {
        prompt: "Why are the vascular bundles of a monocot leaf nearly all the same size?",
        steps: ["Monocot leaves have parallel venation.", "Veins running side by side carry bundles of similar size; net veins branch into bundles of many sizes."],
        answer: "Because of parallel venation.",
      },
      practiceSet: [
        { prompt: "What venation does tulsi have?", answer: "Reticulate" },
        { prompt: "Which tissue carries water up the plant?", answer: "Xylem" },
        { prompt: "What is the phyllotaxy of China rose?", answer: "Alternate" },
      ],
      traps: [
        {
          title: "Habit is not habitat",
          body: "A plant's **habit** is its growth form. Its **habitat** is the place where it grows. Options offer both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbpbpl-processes",
      name: "Stomata, transpiration, nutrients and hormones",
      intuition:
        "A plant loses water through its stomata, and that loss pulls water up the stem. SSC also asks which nutrients are needed in bulk and what each hormone does.",
      definition:
        "Water:\n" +
        "- When water flows **into** the guard cells they swell and the **stoma opens**; when they lose water it closes.\n" +
        "- **Transpiration** is fastest in **dry, windy** weather. Its pull lifts sap by **cohesion-tension**. It causes wilting only when loss exceeds uptake, not always.\n\n" +
        "Nutrients: **macronutrients** (in bulk) include calcium; **micronutrients** (in traces) include **boron**, zinc and iron.\n\n" +
        "Hormones: **auxins** promote growth; **gibberellins** lengthen stems; **cytokinins** delay ageing; **ethylene** ripens fruit.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Water into guard cells", "Stoma opens"], pyqExampleId: "606aeba6-cbb1-4431-84cc-1afdbd561313" },
          { cells: ["Boron", "Micronutrient"], pyqExampleId: "720584d6-5f5b-46ef-b4aa-bf385e995ec4" },
          { cells: ["Calcium", "Macronutrient"] },
          { cells: ["Cytokinins", "Delay ageing"] },
        ],
      },
      pyqExampleId: "e8913534-ba8c-40bb-b293-b0d7f030d7a8",
      selfCheckExample: {
        prompt: "Is zinc a macronutrient or a micronutrient for plants? And calcium?",
        steps: ["Zinc is needed only in traces.", "Calcium is needed in larger amounts."],
        answer: "Zinc: micronutrient. Calcium: macronutrient.",
      },
      practiceSet: [
        { prompt: "Which plant hormone lengthens stems?", answer: "Gibberellin" },
        { prompt: "In what weather is transpiration fastest?", answer: "Dry and windy weather" },
        { prompt: "Which hormone ripens fruit?", answer: "Ethylene" },
      ],
      traps: [
        {
          title: "Transpiration does not always wilt a plant",
          body: "A statement that transpiration **always** causes wilting is false. Wilting comes only when water loss is greater than uptake.",
        },
      ],
    },
  ],
};
