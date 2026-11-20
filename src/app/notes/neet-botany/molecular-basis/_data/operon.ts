import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MB_OPERON_NOTE: SubtopicNote = {
  subtopicName: "Regulation and the Lac Operon",
  title: "Regulation and the Lac Operon",
  oneLineDefinition:
    "Where gene expression can be controlled in eukaryotes and bacteria, what an operon is, the genes of the lac operon with their products, and how lactose switches the operon on by taking the repressor off the operator.",
  whyItMatters:
    "Six NEET questions, one each in NEET 2022, NEET 2023, NEET 2024, Re-NEET 2024, NEET 2026 and Re-NEET 2026, and two of them HARD. Three ask which gene codes for which product (NEET 2023, NEET 2024 and NEET 2026); the HARD ones ask what happens when the repressor is changed, and which statement about the operon is correct.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomb-lac-genes",
      name: "Gene regulation and the genes of the lac operon",
      intuition:
        "A cell does not need every enzyme all the time. Bacteria save effort by keeping genes that work together in one block, read from one promoter and switched by one operator. In the lac operon, three such genes make the three enzymes needed to use lactose, and a separate gene makes the repressor that keeps them off.",
      definition:
        "What NCERT says:\n" +
        "- In eukaryotes, gene expression can be regulated at the (i) **transcriptional** level (forming the primary transcript), (ii) **processing** level (splicing), (iii) **transport of mRNA** from nucleus to cytoplasm and (iv) **translational** level.\n" +
        "- In prokaryotes, the main site of control is the **rate of transcriptional initiation**. Accessory proteins act **positively (activators)** or **negatively (repressors)**. A repressor binds a sequence called the **operator**, which lies next to the promoter. Each operon has its **own operator and its own repressor**.\n" +
        "- An **operon** is a polycistronic structural gene regulated by a **common promoter** and regulatory genes. Examples: **lac, trp, ara, his and val** operons.\n" +
        "- The lac operon was worked out by geneticist **François Jacob** and biochemist **Jacques Monod**, the first transcriptionally regulated system to be explained.\n" +
        "- It has one **regulatory gene, i** (from **inhibitor**, not inducer), and three **structural genes, z, y and a**.\n" +
        "- **z**: **beta-galactosidase**, which hydrolyses lactose into **galactose and glucose**. **y**: **permease**, which increases the cell's permeability to beta-galactosides. **a**: **transacetylase**. All three products are needed to use lactose.",
      table: {
        columns: ["Gene or region", "Product or role"],
        rows: [
          { cells: ["i (regulator)", "Repressor protein, made all the time (constitutively)"] },
          { cells: ["Promoter", "Where RNA polymerase binds to transcribe the structural genes"] },
          { cells: ["Operator", "Where the repressor binds, next to the promoter"] },
          {
            cells: ["z", "Beta-galactosidase: hydrolyses lactose into galactose and glucose"],
            noteAmber: "NEET 2026: the z gene codes for beta-galactosidase.",
            pyqExampleId: "a7ecb0d8-88ba-4080-92d3-5c13d5d7ac7b",
          },
          {
            cells: ["y", "Permease: lets lactose into the cell"],
            noteAmber: "NEET 2024: lactose in the medium is carried into the cell by permease.",
            pyqExampleId: "3c0f4fc8-8eee-489a-b597-3ab66808a5ce",
          },
          { cells: ["a", "Transacetylase"] },
        ],
      },
      pyqExampleId: "8e68acbe-7b0e-4b46-8876-8af7d7caf596",
      selfCheckExample: {
        prompt: "Name the four levels at which gene expression can be regulated in eukaryotes.",
        steps: [
          "First, when the primary transcript is made: the transcriptional level.",
          "Then, when it is spliced: the processing level.",
          "Then, when the mRNA moves from nucleus to cytoplasm: the transport level.",
          "Last, when the mRNA is read: the translational level.",
        ],
        answer: "Transcriptional, processing (splicing), transport of mRNA, and translational.",
      },
      practiceSet: [
        { prompt: "In the lac operon, what does the letter i in the i gene stand for?", answer: "Inhibitor (not inducer)" },
        { prompt: "Into which two sugars does beta-galactosidase break lactose?", answer: "Galactose and glucose" },
        { prompt: "Name two operons other than the lac operon.", answer: "Any two of the trp, ara, his and val operons" },
        { prompt: "Which two scientists worked out the lac operon?", answer: "François Jacob and Jacques Monod" },
        { prompt: "In prokaryotes, what is the main site at which gene expression is controlled?", answer: "The rate of transcriptional initiation" },
        { prompt: "What is the DNA sequence next to the promoter, to which a repressor binds, called?", answer: "The operator" },
      ],
      traps: [
        {
          title: "i is for inhibitor",
          body: "The **i** gene is named from **inhibitor**, not inducer. It makes the **repressor**; the inducer is lactose.",
        },
        {
          title: "y is permease, a is transacetylase",
          body: "Learn the order **z, y, a** with **beta-galactosidase, permease, transacetylase**. **Permease** (y) brings lactose in; **beta-galactosidase** (z) breaks it.",
        },
        {
          title: "One operator per operon",
          body: "Each operon has its **own** operator and repressor: the lac operator binds only the lac repressor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-lac-switch",
      name: "Switching the lac operon on and off",
      visualizationSlug: "neet-lac-operon",
      intuition:
        "The repressor sits on the operator and blocks RNA polymerase, so the operon is off. When lactose comes in, it grips the repressor and pulls it off the operator. Now RNA polymerase can pass, and the three enzymes are made. Because the switch works by removing a block, NCERT calls it negative regulation.",
      definition:
        "What NCERT says:\n" +
        "- **Lactose** is the substrate of beta-galactosidase and switches the operon on and off, so it is the **inducer**. **Allolactose** also acts as an inducer.\n" +
        "- When a preferred carbon source such as glucose is absent and lactose is present, lactose enters through **permease**. A **very low level** of lac expression must be present all the time, or lactose could not enter.\n" +
        "- The **repressor** is made **all the time (constitutively)** from the **i gene**. With no inducer, it binds the **operator** and stops RNA polymerase from transcribing the operon.\n" +
        "- With an inducer, the repressor is **inactivated** by binding the inducer. RNA polymerase reaches the promoter and **transcription proceeds**.\n" +
        "- Regulation by the repressor is **negative regulation**. The lac operon is under **positive regulation** as well.",
      table: {
        columns: ["Condition", "Repressor", "Structural genes z, y, a"],
        rows: [
          { cells: ["No lactose", "Active; bound to the operator", "Not transcribed (off)"] },
          {
            cells: ["Lactose (or allolactose) present", "Inactivated by the inducer; off the operator", "Transcribed (on)"],
            noteAmber: "Re-NEET 2024: glucose and galactose cannot induce the lac operon; lactose and allolactose do.",
            pyqExampleId: "fb0d426b-7c7a-4802-85ab-8c0d42cbecc5",
          },
          {
            cells: ["At all times", "Made constitutively from the i gene", "Kept at a very low level so lactose can enter"],
            noteAmber: "Re-NEET 2026: of four statements on the lac operon, the correct one was that gene i is constitutively expressed.",
            pyqExampleId: "8df1a65d-b5b0-4cf8-8a29-2150eaaa6235",
          },
        ],
      },
      pyqExampleId: "d427b1d5-a2a6-45f1-9c85-a92a8b7ab92a",
      selfCheckExample: {
        prompt: "In a mutant E. coli, the lac repressor is made normally but cannot bind the operator. Will z, y and a be transcribed without lactose? With lactose?",
        steps: [
          "The repressor blocks transcription only by sitting on the operator.",
          "If it can never bind the operator, nothing blocks RNA polymerase.",
          "So the structural genes are transcribed whether lactose is there or not.",
        ],
        answer: "Yes in both cases: the operon stays switched on.",
      },
      practiceSet: [
        { prompt: "Name the two inducers of the lac operon given by NCERT.", answer: "Lactose and allolactose" },
        { prompt: "Why is regulation of the lac operon by its repressor called negative regulation?", answer: "The regulatory protein switches the genes off by blocking transcription" },
        { prompt: "What does the lac repressor stop when it is bound to the operator?", answer: "RNA polymerase transcribing the operon" },
        { prompt: "Why must a very low level of lac operon expression be present in the cell all the time?", answer: "Otherwise lactose (which needs permease) could not enter the cell" },
        { prompt: "What does an inducer do to the lac repressor?", answer: "It binds and inactivates the repressor" },
      ],
      traps: [
        {
          title: "Lactose inactivates the repressor",
          body: "Lactose **inactivates** the repressor and takes it off the operator. It does not activate the repressor or help it bind.",
        },
        {
          title: "Glucose and galactose are not inducers",
          body: "The inducers are **lactose** and **allolactose**. Glucose and galactose are the **products** of lactose breakdown and do **not** induce the operon.",
        },
        {
          title: "The repressor is always made",
          body: "The repressor is made **constitutively**, all the time, from the i gene. Lactose changes whether it is **active**, not whether it is made.",
        },
      ],
    },
  ],
};
