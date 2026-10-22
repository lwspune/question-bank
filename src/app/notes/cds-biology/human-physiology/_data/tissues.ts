import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_BI_HU_TISSUES_NOTE: SubtopicNote = {
  subtopicName: "Tissues and Muscles",
  title: "Tissues and Muscles",
  oneLineDefinition:
    "The tissues every organ is built from: the epithelium that lines it, the connective tissues that store fat and hold it together, and the three kinds of muscle.",
  whyItMatters:
    "Six CDS questions from 2018 (I) to 2026 (II). Two ask where fat is stored (2018 (I) and 2022 (II)), two ask about the kinds of muscle, one about the lining of the mouth and one about the protein of cartilage.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsbihu-tissues",
      name: "Epithelial and connective tissue",
      intuition:
        "A tissue is a group of similar cells doing one job. Epithelium covers and lines: the skin, the inside of the mouth, the gut. Connective tissue joins and supports: bone, cartilage, the tendons and ligaments, the fat under the skin, and even the blood. Each has its own kind of cell, and the cell names give the answers away once you know them.",
      definition:
        "Four kinds of animal tissue: **epithelial**, **connective**, **muscular** and **nervous**.\n\n" +
        "Epithelium:\n" +
        "- **Squamous**: thin, flat cells. Lines the **mouth, oesophagus** and blood vessels; many layers of it (stratified) form the skin.\n" +
        "- **Cuboidal**: cube-shaped cells, in kidney tubules and glands.\n" +
        "- **Columnar**: tall cells lining the intestine; **ciliated** ones line the windpipe.\n\n" +
        "Connective tissue:\n" +
        "- **Adipose tissue**: fat stored in cells called **adipocytes**, below the skin and around organs.\n" +
        "- **Cartilage**: flexible, made by **chondrocytes** in a matrix with **collagen** fibres (nose, ear, ends of bones).\n" +
        "- **Bone**: hard, made by **osteocytes**. **Tendons** join muscle to bone; **ligaments** join bone to bone.\n" +
        "- **Blood** is a fluid connective tissue. A **reticulocyte** is a young red blood cell.",
      table: {
        columns: ["Tissue", "Where it is found", "Its cell or key part"],
        rows: [
          {
            cells: ["Squamous epithelium", "Lining of the mouth and oesophagus; skin", "Thin, flat cells"],
            noteAmber: "CDS 2022 (I): an injury to the delicate lining of the mouth and oesophagus damages squamous epithelium.",
            pyqExampleId: "218547d3-2ea7-4113-b6e8-35959b06bc58",
          },
          { cells: ["Cuboidal epithelium", "Kidney tubules, glands", "Cube-shaped cells"] },
          {
            cells: ["Adipose tissue", "Below the skin, around organs", "Adipocytes, which store fat"],
            noteAmber: "Asked twice, CDS 2018 (I) and 2022 (II): fat is stored in adipose tissue, in adipocytes.",
            pyqExampleId: "664250d2-8009-472e-ab0e-04598570ff14",
          },
          {
            cells: ["Cartilage", "Nose, ear, ends of bones", "Chondrocytes, with collagen fibres"],
            noteAmber: "CDS 2026 (II): collagen matters for cartilage and is not a globin.",
            pyqExampleId: "ea7b3e3f-8409-48c4-a2b4-7307354ba930",
          },
          { cells: ["Bone", "Skeleton", "Osteocytes"] },
          { cells: ["Blood", "Inside the blood vessels", "A fluid connective tissue"] },
        ],
      },
      pyqExampleId: "218547d3-2ea7-4113-b6e8-35959b06bc58",
      selfCheckExample: {
        prompt: "In a sprained ankle, a tough band joining one bone to another is stretched or torn. Which connective tissue is it?",
        steps: [
          "Tendons join a muscle to a bone.",
          "Ligaments join one bone to another bone.",
        ],
        answer: "A ligament.",
      },
      practiceSet: [
        { prompt: "Which cells build cartilage?", answer: "Chondrocytes" },
        { prompt: "Which tissue joins a muscle to a bone?", answer: "A tendon" },
        { prompt: "Which connective tissue is a fluid?", answer: "Blood" },
        { prompt: "Which kind of epithelium lines the kidney tubules?", answer: "Cuboidal epithelium" },
      ],
      traps: [
        {
          title: "Adipocyte stores fat; the other '-cytes' do not",
          body: "**Adipocytes** store fat. **Chondrocytes** make cartilage, **osteocytes** are bone cells, and a **reticulocyte** is a young red blood cell.",
        },
        {
          title: "Collagen is not a globin",
          body: "**Haemoglobin** and **myoglobin** are globins that carry oxygen. **Collagen** is the fibrous protein of cartilage, bone and tendon, and **keratin** is the protein of hair and nails.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsbihu-muscle",
      name: "The three kinds of muscle",
      intuition:
        "Muscles that move your bones, like the biceps, work when you decide: they are voluntary, and their cells look striped. The muscles in the walls of your gut, bladder tubes and airways work on their own; they are smooth, without stripes. Heart muscle is striped like skeletal muscle but works on its own like smooth muscle, and its cells branch and join so the whole heart beats together.",
      definition:
        "Three kinds of muscle:\n" +
        "- **Skeletal (striated)**: **voluntary**, attached to bones (biceps, triceps). Cells are long **cylinders, unbranched** and **multinucleate**.\n" +
        "- **Smooth (unstriated)**: **involuntary**, in the walls of the gut, **ureters**, **bronchi**, blood vessels and the **iris** of the eye. Cells are **spindle-shaped** with one nucleus.\n" +
        "- **Cardiac**: **involuntary**, only in the heart; it beats rhythmically all through life. Cells are **cylindrical, branched** and **uninucleate**, with stripes.",
      table: {
        columns: ["Feature", "Skeletal", "Smooth", "Cardiac"],
        rows: [
          { cells: ["Control", "Voluntary", "Involuntary", "Involuntary"] },
          { cells: ["Stripes", "Striated", "Unstriated", "Striated"] },
          {
            cells: ["Cell shape", "Cylindrical, unbranched", "Spindle-shaped", "Cylindrical, branched"],
            noteAmber: "CDS 2021 (I): a cardiac muscle cell is cylindrical, branched and uninucleate.",
            pyqExampleId: "8ebfd9bd-92e5-4e92-ba35-88edf92eba34",
          },
          { cells: ["Nuclei per cell", "Many", "One", "One"] },
          {
            cells: ["Found in", "Biceps and other limb muscles", "Ureters, iris, bronchi, gut", "Heart"],
            noteAmber: "CDS 2019 (II): the biceps has no smooth muscle; the ureters, iris and bronchi do.",
            pyqExampleId: "11321c4b-1477-47e9-abbd-fc766daad76d",
          },
        ],
      },
      pyqExampleId: "8ebfd9bd-92e5-4e92-ba35-88edf92eba34",
      selfCheckExample: {
        prompt: "You cannot stop your heartbeat by choice, but you can bend your arm whenever you like. Which muscle types are at work, and what is the key difference between them?",
        steps: [
          "Bending the arm uses the biceps, a skeletal muscle under your control.",
          "The heartbeat uses cardiac muscle, which contracts on its own.",
        ],
        answer: "Skeletal muscle in the arm is voluntary; cardiac muscle in the heart is involuntary.",
      },
      practiceSet: [
        { prompt: "Which kind of muscle is voluntary?", answer: "Skeletal muscle" },
        { prompt: "Which kind of muscle lines the wall of the stomach?", answer: "Smooth muscle" },
        { prompt: "Is smooth muscle striated or unstriated?", answer: "Unstriated" },
        { prompt: "Which kind of muscle contracts rhythmically throughout life without tiring?", answer: "Cardiac muscle" },
      ],
      traps: [
        {
          title: "The biceps is skeletal muscle",
          body: "Organs with walls that squeeze on their own (ureters, bronchi, gut, iris) use **smooth** muscle. The **biceps** moves a bone at your command, so it is **skeletal**.",
        },
        {
          title: "Branched means cardiac",
          body: "Only **cardiac** cells are **branched**. Skeletal cells are unbranched and multinucleate; smooth cells are spindle-shaped (some options misprint this as 'spinal shaped').",
        },
      ],
    },
  ],
};
