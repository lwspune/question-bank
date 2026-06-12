import type { SubtopicNote } from "@/app/notes/_types";

export const CELL_RESPIRATION_ATP_NOTE: SubtopicNote = {
  subtopicName: "Cellular Respiration and ATP",
  title: "Cellular Respiration and ATP — the Cell's Energy",
  oneLineDefinition:
    "Cells release energy from glucose in stages: glycolysis in the cytoplasm splits glucose into pyruvate (+ ATP), and the mitochondrion finishes the job, making most of the cell's ATP — the universal energy currency — at its inner membrane.",
  whyItMatters:
    "A 4-PYQ cluster on where energy comes from. " +
    "Three facts carry the marks: ATP is the cell's energy currency, glycolysis happens in the CYTOPLASM and yields pyruvate + energy (no CO2), and ATP is synthesised at the INNER mitochondrial membrane. " +
    "All EASY or MODERATE.",
  concepts: [
    // ATP as energy currency (PYQ 923d9005)
    {
      kind: "reference" as const,
      slug: "cell-atp-energy-currency",
      name: "ATP — the energy currency of the cell",
      intuition:
        "Cells store usable energy in ATP (adenosine triphosphate). Snapping off its outermost phosphate releases energy for the cell's work; adding it back recharges the molecule. ATP — not ADP or AMP — is the form the cell spends.",
      definition:
        "ATP facts:\n" +
        "- **ATP (adenosine triphosphate)** is the universal **energy currency** of the cell.\n" +
        "- Energy is released when ATP's terminal phosphate bond is **hydrolysed** (ATP → ADP + phosphate + energy).\n" +
        "- **ADP** (di-phosphate) and **AMP** (mono-phosphate) are the lower-energy forms; **NAD** is an electron carrier, not the energy currency.",
      table: {
        columns: ["Molecule", "Role"],
        rows: [
          {
            cells: ["**ATP**", "Energy currency — the form the cell spends"],
            noteAmber: "Source of energy in cells → ATP (not ADP, AMP or NAD).",
          },
          { cells: ["ADP", "Lower-energy form (after ATP is used)"] },
          { cells: ["AMP", "Adenosine monophosphate — lowest energy"] },
          { cells: ["NAD", "Electron carrier, not the energy currency"] },
        ],
      },
      practiceSet: [
        { prompt: "What is the source of energy in cells?", answer: "ATP" },
        { prompt: "What does ATP stand for?", answer: "Adenosine triphosphate" },
        { prompt: "What is released when ATP is hydrolysed to ADP?", answer: "Energy (and a phosphate)" },
      ],
      pyqExampleId: "923d9005-0466-4cf8-a899-2b604b65a351",
      traps: [
        {
          title: "ATP, not ADP — and not NAD",
          body:
            "The energy CURRENCY is ATP. ADP and AMP are spent/lower-energy forms; NAD is an electron carrier in respiration. For 'source of energy in cells', choose ATP.",
        },
      ],
    },

    // glycolysis (PYQs b73330d5, dee18a54)
    {
      kind: "reference" as const,
      slug: "cell-glycolysis",
      name: "Glycolysis — breaking glucose in the cytoplasm",
      intuition:
        "The first step of releasing energy from glucose happens right in the cytoplasm — no oxygen, no mitochondrion needed. Glucose is split into pyruvate, releasing a little ATP. Pyruvate is the branch point: with oxygen it enters the mitochondrion; without it, it becomes lactic acid.",
      definition:
        "Glycolysis facts:\n" +
        "- Glycolysis happens in the **cytoplasm** and breaks glucose into **pyruvate + energy (ATP)**.\n" +
        "- **No carbon dioxide** is released in glycolysis (CO2 comes later, in the Krebs cycle).\n" +
        "- During vigorous exercise (low oxygen), pyruvate is converted to **lactic acid** in muscle — causing cramps. So lactic acid is produced directly from **pyruvate**.",
      table: {
        columns: ["Glycolysis fact", "Detail"],
        rows: [
          { cells: ["Location", "Cytoplasm (not the mitochondrion)"] },
          {
            cells: ["Products", "Pyruvate + energy (ATP)"],
            noteAmber: "Glucose breakdown in cytoplasm → pyruvate + energy. NO CO2 here.",
          },
          {
            cells: ["Lactic acid is made from", "Pyruvate (under low oxygen)"],
            noteAmber: "Muscle cramps: pyruvate → lactic acid when oxygen is short.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "The breakdown of glucose in the cytoplasm produces which two things?",
        steps: [
          "Glycolysis splits glucose into a 3-carbon molecule.",
          "That molecule is pyruvate, and the process releases a small amount of ATP (energy).",
          "No CO2 or oxygen is produced here — those involve later stages.",
        ],
        answer: "Pyruvate and energy (ATP).",
      },
      practiceSet: [
        { prompt: "Where does glycolysis take place?", answer: "In the cytoplasm" },
        { prompt: "Breakdown of glucose in the cytoplasm yields ___ and ___.", answer: "Pyruvate and energy" },
        { prompt: "Lactic acid in cramping muscle is produced from ___.", answer: "Pyruvate" },
        { prompt: "Is CO2 released during glycolysis?", answer: "No", method: "CO2 comes in the Krebs cycle" },
      ],
      pyqExampleId: "b73330d5-929f-4e4b-818d-8f6e51f6d430",
      traps: [
        {
          title: "Glycolysis gives pyruvate + energy, NOT pyruvate + CO2",
          body:
            "A favourite distractor pairs pyruvate with carbon dioxide or oxygen. Glycolysis produces pyruvate + energy only — CO2 is released later in the Krebs cycle inside the mitochondrion.",
        },
      ],
    },

    // mitochondrion structure / ATP synthesis site (PYQ 14b34af1)
    {
      kind: "reference" as const,
      slug: "cell-mitochondrion-atp-site",
      name: "The mitochondrion — where ATP is synthesised",
      intuition:
        "The mitochondrion is the powerhouse, but ATP isn't made just anywhere inside it. The electron transport chain sits in the heavily-folded INNER membrane, and that's exactly where ATP synthase builds ATP. The folds (cristae) pack in more surface for the job.",
      definition:
        "Mitochondrion structure and the ATP-making site:\n" +
        "- The mitochondrion has an **outer membrane** and a folded **inner membrane** (the folds are **cristae**); the inner space is the **matrix**.\n" +
        "- **ATP synthesis** (by ATP synthase) occurs at the **inner membrane**, where the electron transport chain builds a proton gradient.\n" +
        "- This is why the mitochondrion is the cell's powerhouse.",
      table: {
        columns: ["Mitochondrial part", "Role"],
        rows: [
          { cells: ["Outer membrane", "Smooth boundary"] },
          {
            cells: ["Inner membrane (cristae)", "Site of ATP synthesis (electron transport chain)"],
            noteAmber: "ATP-synthesising reactions take place at the INNER membrane.",
          },
          { cells: ["Matrix", "Inner fluid (Krebs cycle reactions)"] },
        ],
      },
      practiceSet: [
        { prompt: "Where in the mitochondrion is ATP synthesised?", answer: "The inner membrane" },
        { prompt: "What are the folds of the inner mitochondrial membrane called?", answer: "Cristae" },
        { prompt: "Which organelle is the powerhouse of the cell?", answer: "The mitochondrion" },
      ],
      pyqExampleId: "14b34af1-f8c9-4368-b152-e1d4d9e5caed",
      traps: [
        {
          title: "ATP is made at the INNER membrane, not the matrix or outer membrane",
          body:
            "ATP synthase and the electron transport chain sit in the INNER mitochondrial membrane. The matrix runs the Krebs cycle and the outer membrane is just a boundary — neither is the ATP-synthesis site.",
        },
      ],
    },
  ],
};
