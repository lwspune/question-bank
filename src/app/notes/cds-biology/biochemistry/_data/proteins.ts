import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_BC_PROTEINS_NOTE: SubtopicNote = {
  subtopicName: "Proteins, Enzymes and Lactic Acid",
  title: "Proteins, Enzymes and Lactic Acid",
  oneLineDefinition:
    "What a protein is made of, why heat changes it for good, what isoenzymes are, and why a sprinter's muscles fill with lactic acid.",
  whyItMatters:
    "Five CDS questions from 2017 (II) to 2025 (I). Two are the same sprinter's cramp, asked in 2018 (I) and 2023 (I). The others ask why egg white turns solid on heating, what isoenzymes are, and which protein gives silk its shine.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbibc-proteins",
      name: "Proteins, denaturation and isoenzymes",
      intuition:
        "A protein is a long chain of amino acids folded into an exact shape, and its shape is what lets it do its job. Heat or acid can break the weak bonds that hold the fold. The chain then unfolds and tangles with its neighbours, and it cannot fold back. That is why a boiled egg never turns raw again. Enzymes are proteins too, and a cell can make several slightly different versions of one enzyme that all do the same job.",
      definition:
        "Proteins:\n" +
        "- Built from **amino acids** joined by **peptide bonds**. Every protein contains **nitrogen**.\n" +
        "- **Denaturation**: heat, strong acid or alcohol **unfolds** the protein so it loses its shape and its function. Boiling egg white (albumin) makes it solid and white; lemon juice curdles milk protein.\n" +
        "- **Enzymes** are protein catalysts: they speed up a reaction and are left unchanged at the end.\n" +
        "- **Isoenzymes** (isozymes) are different forms of an enzyme that catalyse the **same reaction** but differ in their **amino acid sequence**. Lactate dehydrogenase is the usual example.\n" +
        "- A **coenzyme** is something else: a small non-protein helper (often made from a vitamin) that an enzyme needs to work.",
      table: {
        columns: ["Protein or term", "What it is or does"],
        rows: [
          {
            cells: ["Albumin of egg white", "Turns solid and white on heating: thermal denaturation"],
            noteAmber: "CDS 2024 (I): heating changes the egg white because its proteins are denatured, not its fats or sugars.",
            pyqExampleId: "3ec3b264-c8b2-4df7-90c0-25f438598a8a",
          },
          { cells: ["Collagen", "Fibrous protein of skin, tendon, bone and cartilage"] },
          { cells: ["Keratin", "Protein of hair, nails and the outer skin"] },
          { cells: ["Haemoglobin", "Carries oxygen in red blood cells"] },
          { cells: ["Isoenzymes", "Forms of one enzyme: same reaction, different amino acids"] },
          { cells: ["Coenzyme", "Non-protein helper an enzyme needs"] },
        ],
      },
      pyqExampleId: "f36da7d5-1a00-4f9a-952c-e4e8456b0da9",
      selfCheckExample: {
        prompt: "A few drops of lemon juice are added to warm milk and it splits into lumps. What has happened to the milk protein?",
        steps: [
          "Lemon juice is an acid.",
          "Acid breaks the weak bonds that keep a protein folded, so the protein unfolds and clumps together.",
        ],
        answer: "The protein has been denatured by acid and has clotted.",
      },
      practiceSet: [
        { prompt: "What are the building blocks of a protein?", answer: "Amino acids" },
        { prompt: "What is the bond joining two amino acids called?", answer: "A peptide bond" },
        { prompt: "Which protein makes up hair and nails?", answer: "Keratin" },
        { prompt: "Name the small non-protein helper that some enzymes need in order to work.", answer: "A coenzyme" },
      ],
      traps: [
        {
          title: "Isoenzymes, not isomers or isotopes",
          body: "**Isoenzymes** are forms of one enzyme with different amino acid sequences. **Isomers** are compounds with the same formula, **isotopes** are atoms of one element with different masses, and **coenzymes** are helpers. Only the first is about enzymes doing the same job.",
        },
        {
          title: "Cooked egg white is a protein change",
          body: "Egg white is mostly water and protein. Heat **denatures the protein**; there is almost no fat or sugar in the white to change.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbibc-lactic",
      name: "Respiration without oxygen: lactic acid and alcohol",
      intuition:
        "Cells get energy by breaking down glucose. With enough oxygen they break it all the way to carbon dioxide and water and get a lot of energy. When oxygen runs short, as in the leg muscles of a sprinter, they stop half way and the leftover becomes lactic acid. Lactic acid building up in the muscle is what causes the cramp. Yeast also works without oxygen, but it makes alcohol and carbon dioxide instead.",
      definition:
        "Breaking down glucose:\n" +
        "- **Glycolysis**, in the **cytoplasm**, splits glucose into **pyruvate**. This step needs no oxygen.\n" +
        "- **With oxygen** (aerobic): pyruvate goes into the **mitochondria** and is broken down to **carbon dioxide and water**, releasing much more energy.\n" +
        "- **Without oxygen in muscle**: pyruvate becomes **lactic acid**. Its build-up causes **cramp** and pain after hard exercise.\n" +
        "- **Without oxygen in yeast** (fermentation): pyruvate becomes **ethanol and carbon dioxide**. This is how bread rises and how alcohol is made.",
      table: {
        columns: ["Where glucose is broken down", "Oxygen", "End products"],
        rows: [
          { cells: ["Mitochondria of most cells", "Enough", "Carbon dioxide, water and much energy"] },
          {
            cells: ["Muscle of a sprinter", "Short supply", "Lactic acid and a little energy"],
            noteAmber: "Asked twice, CDS 2018 (I) and 2023 (I): the cramp is from lactic acid, never pyruvic acid or ethanol.",
            pyqExampleId: "8035de8a-c9da-4752-a770-633a87b79b3e",
          },
          { cells: ["Yeast", "None", "Ethanol, carbon dioxide and a little energy"] },
        ],
      },
      pyqExampleId: "8035de8a-c9da-4752-a770-633a87b79b3e",
      selfCheckExample: {
        prompt: "Bread dough rises after yeast is added and the dough is kept warm. Which gas makes it rise, and which process makes the gas?",
        steps: [
          "Inside the dough yeast breaks down sugar without oxygen.",
          "This fermentation gives ethanol and carbon dioxide; the gas forms bubbles that puff up the dough.",
        ],
        answer: "Carbon dioxide, made by fermentation by the yeast.",
      },
      practiceSet: [
        { prompt: "What does yeast make from glucose when there is no oxygen?", answer: "Ethanol and carbon dioxide" },
        { prompt: "In which part of the cell does glycolysis happen?", answer: "The cytoplasm" },
        { prompt: "In which organelle is pyruvate broken down to carbon dioxide and water?", answer: "The mitochondrion" },
        { prompt: "Which releases more energy from one glucose: respiration with oxygen or without it?", answer: "Respiration with oxygen" },
      ],
      traps: [
        {
          title: "Lactic acid, not pyruvic acid",
          body: "Pyruvic acid is the step **before**: in a muscle short of oxygen it is turned into **lactic acid**, and it is lactic acid that piles up and causes the cramp.",
        },
        {
          title: "Muscles do not make alcohol",
          body: "**Ethanol** comes from fermentation in **yeast**. Human muscle working without oxygen makes **lactic acid** only.",
        },
      ],
    },
  ],
};
