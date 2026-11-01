import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_BCB_PROCESSES_NOTE: SubtopicNote = {
  subtopicName: "Cell Division and Respiration",
  title: "Cell Division and Respiration",
  oneLineDefinition:
    "The enzymes that copy DNA, the first stage of meiosis and the word chromatin, and where each step of respiration happens and which step makes the most ATP.",
  whyItMatters:
    "Six questions in the bank, two from each year's shifts. Each asks one step and its place or its enzyme, so the two short tables here are enough.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscbcbpr-division",
      name: "DNA copying and cell division",
      intuition:
        "Copying DNA takes a team: one enzyme opens the helix, one lays a starter, one builds the new strand and one seals the gaps. Learn the four with their jobs.",
      definition:
        "DNA replication:\n" +
        "- **Helicase** opens the double helix.\n" +
        "- **Primase** lays down the **RNA primer**.\n" +
        "- **DNA polymerase** adds nucleotides.\n" +
        "- **DNA ligase** joins the fragments (it seals the 3' end of one piece to the 5' end of the next).\n\n" +
        "Division:\n" +
        "- **Walther Flemming** named **chromatin** in **1879** and coined **mitosis** in 1882.\n" +
        "- Prophase I of meiosis: **leptotene** (chromosomes **begin to condense**), then zygotene (homologues pair, synapsis), then pachytene (synapsis complete), diplotene, diakinesis.",
      table: {
        columns: ["Item", "Job or fact"],
        rows: [
          { cells: ["Helicase", "Opens the helix"] },
          { cells: ["DNA ligase", "Joins the fragments"] },
          { cells: ["Chromatin, 1879", "Walther Flemming"], pyqExampleId: "f959afa8-02cc-42aa-a36d-33150a8899b0" },
          { cells: ["Leptotene", "Chromosomes begin to condense"], pyqExampleId: "8c09e840-3b3e-4467-a0c2-5e6adbf52f5b" },
        ],
      },
      pyqExampleId: "4161455a-0141-4ac3-b3e3-0dcc9843c096",
      selfCheckExample: {
        prompt: "In which stage of prophase I do homologous chromosomes start to pair?",
        steps: ["Leptotene comes first, with chromosomes only starting to condense.", "Pairing (synapsis) begins in the next stage, zygotene."],
        answer: "Zygotene.",
      },
      practiceSet: [
        { prompt: "Which enzyme lays the RNA primer?", answer: "Primase" },
        { prompt: "Who coined the word mitosis?", answer: "Walther Flemming" },
        { prompt: "In which stage is synapsis complete?", answer: "Pachytene" },
      ],
      traps: [
        {
          title: "Leptotene is only the start",
          body: "In **leptotene** chromosomes **begin to condense**. Pairing belongs to **zygotene**, and complete synapsis to pachytene.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscbcbpr-respiration",
      name: "Respiration and ATP",
      intuition:
        "Glucose is broken down in three steps, each in its own place. The last step, using oxygen, makes far more ATP than the first two together.",
      definition:
        "The steps:\n" +
        "- **Glycolysis**, in the **cytoplasm**: glucose to **pyruvic acid**; a net 2 ATP.\n" +
        "- **Krebs cycle**, in the **mitochondrial matrix**: about 2 ATP.\n" +
        "- **Electron transport chain**, on the inner mitochondrial membrane: about **32 to 34 ATP**, **the most**. **Oxygen** is the final electron acceptor and becomes water.\n\n" +
        "Without oxygen, **yeast** ferments sugar and gets only the 2 ATP of glycolysis. **Glucose** is the usual substrate for respiration.",
      table: {
        columns: ["Step", "Where", "ATP per glucose"],
        rows: [
          { cells: ["Glycolysis", "Cytoplasm", "2"], pyqExampleId: "76f1c274-83f0-4730-b21b-98a52cf6e70b" },
          { cells: ["Krebs cycle", "Mitochondrial matrix", "2"] },
          { cells: ["Electron transport chain", "Inner mitochondrial membrane", "32 to 34"], pyqExampleId: "d99ebd55-16dc-4967-b562-98e0f390e1ee" },
        ],
      },
      pyqExampleId: "0c960c5e-ddeb-49b6-afb8-3df31ce2be17",
      selfCheckExample: {
        prompt: "What is the product of glycolysis, and does glycolysis need oxygen?",
        steps: ["Glycolysis splits glucose into pyruvic acid.", "It runs in the cytoplasm without oxygen; that is why fermentation can use it."],
        answer: "Pyruvic acid; no oxygen is needed.",
      },
      practiceSet: [
        { prompt: "Where does the Krebs cycle take place?", answer: "In the mitochondrial matrix" },
        { prompt: "What is the final electron acceptor in aerobic respiration?", answer: "Oxygen" },
        { prompt: "Which step of respiration makes the most ATP?", answer: "The electron transport chain" },
      ],
      traps: [
        {
          title: "Glycolysis is outside the mitochondria",
          body: "A statement placing **glycolysis** in the **mitochondria** is false. It happens in the **cytoplasm**.",
        },
      ],
    },
  ],
};
