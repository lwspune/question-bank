import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_CC_CYCLE_NOTE: SubtopicNote = {
  subtopicName: "Cell Cycle and Mitosis",
  title: "Cell Cycle and Mitosis",
  oneLineDefinition:
    "The phases of the cell cycle in order (G1, S, G2, M and the quiescent G0), what the DNA content does in each, the four stages of mitosis with cytokinesis, and why mitosis matters.",
  whyItMatters:
    "Fourteen NEET questions from 2021 to 2026. Four are match-the-columns on what happens in G1, S, G2, M and the quiescent stage, two ask the order of the phases, and four are on mitosis: where spindle fibres attach, what they do, which animal makes its gametes by mitosis, and which statement about mitosis is wrong (NEET 2022). NEET 2021 also asked two on the S phase: the chromosome number after it, and when the centriole duplicates.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbocc-phases",
      name: "The phases of the cell cycle, in order",
      intuition:
        "A cell cycle is everything a cell does from one division to the next: it grows, copies its DNA once, and then splits into two. Cell growth goes on all the time, but the DNA is copied in only one fixed stage. Most of the cycle is spent getting ready (interphase). The division itself (M phase) is short: in a human cell in culture it takes about one hour of a 24-hour cycle.",
      definition:
        "Two main phases:\n" +
        "- **Interphase**: the time between two successive M phases. It is called the **resting phase**, but the cell is busy growing and copying its DNA. It takes **more than 95%** of the cycle.\n" +
        "- **M phase** (mitosis phase): the actual division. It starts with **karyokinesis** (division of the nucleus) and usually ends with **cytokinesis** (division of the cytoplasm).\n\n" +
        "Interphase has three parts, in this order:\n" +
        "- **G1 (Gap 1)**: the interval between mitosis and the start of DNA replication. The cell is metabolically active and grows, but does **not** copy its DNA.\n" +
        "- **S (Synthesis)**: **DNA replication**. The DNA per cell doubles.\n" +
        "- **G2 (Gap 2)**: **proteins are made** to prepare for mitosis, while the cell keeps growing.\n\n" +
        "So the cycle runs **G1 → S → G2 → M**. Cells that stop dividing leave G1 and enter the **quiescent stage (G0)**.\n\n" +
        "How long: a human cell in culture divides about once every **24 hours**, and **yeast** in about **90 minutes**.",
      table: {
        columns: ["Phase", "What happens (NCERT)", "DNA per cell"],
        rows: [
          {
            cells: ["G1 (Gap 1)", "Interval between mitosis and the start of DNA replication; the cell is metabolically active and grows but does not replicate DNA", "2C"],
            noteAmber: "Re-NEET 2024: metabolically active, proliferating cells that have not yet copied their DNA are in G1.",
            pyqExampleId: "8a3f918a-942c-462f-808e-0262bb1b7be7",
          },
          { cells: ["S (Synthesis)", "DNA replication; the amount of DNA per cell doubles", "2C rises to 4C"] },
          {
            cells: ["G2 (Gap 2)", "Proteins are made in preparation for mitosis; cell growth continues", "4C"],
            noteAmber: "NEET 2021: proteins are synthesised in G2, and the inactive phase in the same list is the quiescent stage.",
            pyqExampleId: "c28df7be-595e-468d-b60e-3672f4334533",
          },
          {
            cells: ["M (Mitosis)", "Actual cell division, also called equational division: karyokinesis, then cytokinesis", "4C, back to 2C in each daughter cell"],
            noteAmber: "NEET 2023: M phase was matched with equational division.",
            pyqExampleId: "7228cfe2-93c9-4677-aa33-faba514f7531",
          },
          { cells: ["G0 (Quiescent stage)", "Cells that leave G1 and stop dividing; still metabolically active", "2C"] },
          {
            cells: ["The whole cycle in order", "G1, S, G2, then karyokinesis, then cytokinesis", "2C, 4C, 4C, then 2C"],
            noteAmber: "NEET 2024: Gap 1, Synthesis, Gap 2, Karyokinesis, Cytokinesis is the correct sequence.",
            pyqExampleId: "bababcde-005c-4b10-b2f0-d0e01726df50",
          },
        ],
      },
      pyqExampleId: "41368aa1-d150-499a-967a-c63ac8f2c304",
      selfCheckExample: {
        prompt: "A human cell in culture takes 24 hours to complete one cell cycle. About how long does it spend in M phase, and about how long in interphase?",
        steps: [
          "In a 24-hour human cell cycle, cell division proper lasts only about an hour.",
          "Interphase takes the rest, more than 95% of the cycle: 24 − 1 = 23 hours.",
        ],
        answer: "About 1 hour in M phase and about 23 hours in interphase.",
      },
      practiceSet: [
        { prompt: "About how long does a yeast cell take to complete one cell cycle?", answer: "About 90 minutes" },
        { prompt: "In M phase, what is the division of the nucleus called?", answer: "Karyokinesis" },
        { prompt: "Which stage does a cell enter when it leaves G1 and stops dividing?", answer: "The quiescent stage (G0)" },
        { prompt: "Interphase is called the resting phase. What is the cell actually doing in interphase?", answer: "Growing and copying its DNA to prepare for division" },
      ],
      traps: [
        {
          title: "Interphase is not resting",
          body: "Interphase is called the **resting phase** only because no division is seen. The cell is growing and replicating its DNA, and interphase takes more than 95% of the cycle. **Mitosis** is the division itself, not the resting phase.",
        },
        {
          title: "Proteins go with G2 in NEET lists",
          body: "In NCERT's lists, **G2** is the phase where **proteins are synthesised** for mitosis, and **G1** is the **interval between mitosis and the start of DNA replication**. DNA replication itself is **S**.",
        },
        {
          title: "Karyokinesis comes before cytokinesis",
          body: "M phase starts with **karyokinesis** (the nucleus divides) and usually ends with **cytokinesis** (the cytoplasm divides). The full order is G1, S, G2, karyokinesis, cytokinesis.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbocc-interphase",
      name: "S phase, DNA content and the quiescent stage",
      intuition:
        "In S phase the cell copies every DNA molecule once. The amount of DNA doubles, but the number of chromosomes does not: each chromosome now has two identical sister chromatids held together at the centromere. Think of photocopying every page of a book and stapling each copy to its original. You have twice the paper, but still the same number of pages.",
      definition:
        "S phase:\n" +
        "- DNA replication happens in the **nucleus**. The DNA content goes from **2C to 4C**.\n" +
        "- The **chromosome number does not change**: a cell that is 2n in G1 is still 2n in G2. Each chromosome now has **two sister chromatids**.\n" +
        "- In **animal cells**, the **centriole duplicates in the cytoplasm** during S phase, while DNA replicates in the nucleus.\n\n" +
        "Quiescent stage (G0):\n" +
        "- Cells that do not divide further leave **G1** and enter **G0**.\n" +
        "- They stay **metabolically active** but no longer proliferate unless the organism needs them to.\n" +
        "- In adult animals some cells, such as **heart cells**, do not seem to divide at all; many others divide only now and then.",
      table: {
        columns: ["Point in the cycle", "DNA content", "Chromosome number"],
        rows: [
          { cells: ["G1", "2C", "2n"] },
          {
            cells: ["After S phase (G2)", "4C", "2n, each chromosome with two sister chromatids"],
            noteAmber: "NEET 2023: in eukaryotes, DNA replication takes place in S phase.",
            pyqExampleId: "57475dca-85a8-4f8d-b567-c7b9666b3e15",
          },
          { cells: ["Each daughter cell after M phase", "2C", "2n"] },
          {
            cells: ["G0 (quiescent)", "2C", "2n; the cell is metabolically active but does not divide"],
            noteAmber: "NEET 2023: G0 cells are metabolically inactive is the false statement; the centrosome duplicating in S phase is true.",
            pyqExampleId: "92cb41b9-4b5d-4f60-a5ef-5bf03825c086",
          },
        ],
      },
      pyqExampleId: "57475dca-85a8-4f8d-b567-c7b9666b3e15",
      selfCheckExample: {
        prompt: "A plant cell in G1 has 2C DNA and 20 chromosomes. What are its DNA content and its chromosome number in G2?",
        steps: [
          "S phase lies between G1 and G2, and it doubles the DNA: 2C becomes 4C.",
          "Replication adds a sister chromatid to each chromosome but adds no new chromosomes.",
        ],
        answer: "4C DNA, and still 20 chromosomes (each with two chromatids).",
      },
      practiceSet: [
        { prompt: "In animal cells, where does the centriole duplicate during S phase: in the nucleus or the cytoplasm?", answer: "In the cytoplasm" },
        { prompt: "Name a kind of cell in adult animals that does not appear to divide.", answer: "Heart cells" },
        { prompt: "Does S phase change the number of chromosomes in a cell?", answer: "No. Only the amount of DNA doubles." },
        { prompt: "After S phase, how many chromatids does each chromosome have?", answer: "Two sister chromatids, joined at the centromere" },
      ],
      traps: [
        {
          title: "G0 cells are still metabolically active",
          body: "The quiescent stage is **inactive only in division**. NCERT says cells in **G0 remain metabolically active**; they simply stop proliferating unless called on.",
        },
        {
          title: "S phase doubles DNA, not chromosomes",
          body: "DNA goes from **2C to 4C**, but the chromosome number stays the same (**2n stays 2n**). A cell with 16 chromosomes in G1 still has 16 after S phase.",
        },
        {
          title: "Two copies, two places",
          body: "In an animal cell in S phase, **DNA replicates in the nucleus** while the **centriole duplicates in the cytoplasm**. Neither happens in M phase.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbocc-mitosis",
      name: "Mitosis: the four stages, cytokinesis and why it matters",
      visualizationSlug: "imat-mitosis-steps",
      intuition:
        "Mitosis shares out the copied chromosomes so that each daughter cell gets one full, identical set. First the chromosomes thicken so they can be moved (prophase). Then they line up in the middle on spindle fibres (metaphase). The centromeres split and the spindle pulls the two chromatids of each chromosome to opposite ends (anaphase). Finally a nucleus forms at each end (telophase) and the cytoplasm divides (cytokinesis). Because the chromosome number stays the same, mitosis is called equational division.",
      definition:
        "Mitosis is **equational division**: parent and daughter cells have the **same chromosome number**.\n\n" +
        "Who divides by mitosis:\n" +
        "- In **animals**, mitosis is seen only in **diploid somatic cells**.\n" +
        "- In **plants**, both **haploid and diploid** cells divide by mitosis.\n" +
        "- In some **lower plants** and some **social insects**, haploid cells divide by mitosis. The **male honeybee** is haploid and makes its gametes by mitosis.\n\n" +
        "Cytokinesis:\n" +
        "- **Animal cells**: a **furrow** in the plasma membrane deepens until the cell splits in two.\n" +
        "- **Plant cells**: the wall forms from the **centre outward** as a **cell plate**, which becomes the middle lamella.\n" +
        "- If karyokinesis is not followed by cytokinesis, one cell gets many nuclei: a **syncytium**, as in the **liquid endosperm of coconut**.\n\n" +
        "Why mitosis matters: growth of multicellular organisms, restoring the **nucleo-cytoplasmic ratio**, and **repair** (cells of the upper epidermis, the gut lining and blood cells are constantly replaced). In plants, mitosis in the **apical and lateral meristems** gives growth throughout life.",
      table: {
        columns: ["Stage or point", "What happens (NCERT)"],
        rows: [
          { cells: ["Prophase", "Chromosomes begin to condense; the centrosomes (duplicated in S phase) move to opposite poles and send out asters; by its end the Golgi, ER, nucleolus and nuclear envelope are not seen"] },
          {
            cells: ["Metaphase", "Nuclear envelope fully gone; chromosomes fully condensed (best stage to study their shape); spindle fibres attach to the kinetochores; chromosomes line up on the metaphase plate"],
            noteAmber: "NEET 2024: spindle fibres attach to the kinetochores of chromosomes in metaphase.",
            pyqExampleId: "07b83ab7-d000-44ce-96f1-cccaf3fd1be4",
          },
          {
            cells: ["Anaphase", "Centromeres split; sister chromatids separate and move to opposite poles, centromere first and arms trailing"],
            noteAmber: "NEET 2025: the main job of the spindle fibres is to separate the chromosomes.",
            pyqExampleId: "b54a7ab9-cef2-484d-8968-7f1f5fdd4f18",
          },
          { cells: ["Telophase", "Chromosomes gather at the poles and lose their separate identity; the nuclear envelope, nucleolus, Golgi complex and ER re-form"] },
          { cells: ["Cytokinesis", "Animal cell: a furrow divides it; plant cell: a cell plate grows from the centre outward"] },
          {
            cells: ["Haploid cells that divide by mitosis", "Some lower plants and some social insects, such as the male honeybee"],
            noteAmber: "NEET 2026: male honeybees are haploid and produce their gametes by mitosis.",
            pyqExampleId: "09838555-8813-4fff-8772-8db7a2d48e1d",
          },
        ],
      },
      pyqExampleId: "07b83ab7-d000-44ce-96f1-cccaf3fd1be4",
      selfCheckExample: {
        prompt: "Under the microscope a dividing cell shows its chromosomes clustered at both poles, with a nuclear envelope and a nucleolus forming again at each pole. Which stage of mitosis is this, and what usually follows it?",
        steps: [
          "Chromosomes gathering at the poles while the nuclear envelope, nucleolus, Golgi and ER re-form is telophase.",
          "Karyokinesis is then usually followed by division of the cytoplasm.",
        ],
        answer: "Telophase, followed by cytokinesis.",
      },
      practiceSet: [
        { prompt: "In which stage of mitosis do the centromeres split so that sister chromatids move to opposite poles?", answer: "Anaphase" },
        { prompt: "What forms between two daughter plant cells during cytokinesis, growing from the centre outward?", answer: "The cell plate" },
        { prompt: "What is a cell with many nuclei, formed when karyokinesis is not followed by cytokinesis, called? Give the NCERT example.", answer: "A syncytium; the liquid endosperm of coconut" },
        { prompt: "Name two kinds of cells in the human body that are constantly replaced by mitosis.", answer: "Any two of: upper epidermis cells, gut lining cells, blood cells" },
      ],
      traps: [
        {
          title: "Haploid cells can divide by mitosis",
          body: "Mitosis is not only for diploid cells. In some lower plants and some social insects haploid cells divide by mitosis: the **male honeybee** is haploid and forms its gametes by **mitosis**, not meiosis.",
        },
        {
          title: "Spindle fibres attach in metaphase",
          body: "In **prophase** the centrosomes move apart and the spindle starts to form. The spindle fibres **attach to the kinetochores in metaphase**, and the chromatids are pulled apart in **anaphase**.",
        },
        {
          title: "Mitosis keeps the chromosome number",
          body: "Mitosis is **equational**: each daughter cell has the same chromosome number as the parent. Halving the number is the work of **meiosis**.",
        },
        {
          title: "Plant cells do not furrow",
          body: "An animal cell divides its cytoplasm by a **furrow** from the outside in. A plant cell, with its rigid wall, builds a **cell plate** from the **centre outward**.",
        },
      ],
    },
  ],
};
