import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BP_PCR_NOTE: SubtopicNote = {
  subtopicName: "Polymerase Chain Reaction",
  title: "Polymerase Chain Reaction",
  oneLineDefinition:
    "How PCR copies a stretch of DNA in a test tube with two primers and a heat-stable DNA polymerase, the order denaturation, annealing, extension, what PCR is used for, and how the number of copies doubles each cycle.",
  whyItMatters:
    "Eight NEET questions from 2021 to 2026, three of them in NEET 2021 alone. The order of the steps was asked three times (NEET 2021, Re-NEET 2024 and NEET 2026), Re-NEET 2026 asked in which step the primers bind, and NEET 2025 asked the equation by which the copies grow.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobp-pcr-steps",
      name: "The steps of PCR and Taq polymerase",
      intuition:
        "PCR is DNA copying done in a tube, over and over. Heat the DNA so its two strands come apart. Cool it so two short primers can stick to the ends of the region you want. Let the polymerase build the new strands from the primers. Repeat the cycle many times. The trick is an enzyme from a hot-spring bacterium that does not die each time the tube is heated.",
      definition:
        "PCR in NCERT:\n" +
        "- **PCR** stands for **Polymerase Chain Reaction**. Multiple copies of the gene (or DNA) of interest are made **in vitro**.\n" +
        "- It uses **two sets of primers**, small **chemically synthesised oligonucleotides** complementary to the regions of DNA at each end of the stretch, and the enzyme **DNA polymerase**.\n" +
        "- The enzyme **extends the primers** using the nucleotides provided in the reaction, with the genomic DNA as the **template**.\n" +
        "- Repeated many times, the segment can be amplified about **a billion times** (1 billion copies).\n" +
        "- This repeated amplification uses a **thermostable DNA polymerase** isolated from the bacterium *Thermus aquaticus*. It **remains active** during the high temperature that **denatures** the double-stranded DNA.\n" +
        "- The amplified fragment can then be **ligated with a vector** for further cloning.\n\n" +
        "The three steps of each cycle, in order:\n" +
        "- **Denaturation:** heat separates the two strands of the DNA.\n" +
        "- **Annealing:** the **primers bind** to the separated strands.\n" +
        "- **Extension:** the thermostable polymerase, with deoxynucleotides, extends the primers to make new strands.\n" +
        "- Many such cycles give **amplification** of about a billion times.",
      table: {
        columns: ["Step", "What happens", "Asked as"],
        rows: [
          {
            cells: ["1. Denaturation", "High temperature separates the two DNA strands", "The step hit first if the high temperature is not reached"],
            noteAmber: "NEET 2021: without a very high temperature at the start, denaturation is affected first.",
            pyqExampleId: "1635016a-0fa5-4e82-aa2d-ef718804f56f",
          },
          {
            cells: ["2. Annealing", "The two primers bind to the separated strands", "The step in which primers bind"],
            noteAmber: "Re-NEET 2026: primers bind to the DNA strands in the annealing step.",
            pyqExampleId: "9a618be1-9b1f-4036-bd9f-820f169bd1c2",
          },
          {
            cells: ["3. Extension", "Taq polymerase adds deoxynucleotides to the primers", "The last step of each cycle"],
            noteAmber: "NEET 2026: each cycle runs denaturation, then annealing, then extension.",
            pyqExampleId: "21b28388-52f1-4575-aede-8592fd31d191",
          },
          { cells: ["Many cycles", "The DNA segment is amplified about a billion times", "The end result"] },
        ],
      },
      pyqExampleId: "f67c7444-0efe-4218-a8a6-5700505c3882",
      selfCheckExample: {
        prompt: "Why must the DNA polymerase used in PCR be thermostable?",
        steps: [
          "Every cycle begins with a high temperature to denature the DNA.",
          "An ordinary polymerase would be destroyed by that heat each time.",
        ],
        answer: "Because each cycle heats the DNA to denature it, and only a thermostable polymerase, such as the one from Thermus aquaticus, stays active through it.",
      },
      practiceSet: [
        { prompt: "From which bacterium is the thermostable DNA polymerase used in PCR isolated?", answer: "Thermus aquaticus" },
        { prompt: "What are the primers used in PCR?", answer: "Small chemically synthesised oligonucleotides complementary to the regions of DNA at the ends of the stretch to be copied" },
        { prompt: "About how many times can PCR amplify a segment of DNA?", answer: "About a billion times" },
        { prompt: "In PCR, what acts as the template for the new strands?", answer: "The genomic DNA" },
      ],
      traps: [
        {
          title: "Denaturation comes first, extension last",
          body: "Each cycle is **denaturation, then annealing, then extension**. Ligation is **not** a PCR step.",
        },
        {
          title: "Primers bind in annealing",
          body: "Primers attach to the separated strands during **annealing**. The polymerase adds nucleotides during **extension**.",
        },
        {
          title: "Taq polymerase is from a bacterium",
          body: "The thermostable polymerase comes from the **bacterium** *Thermus aquaticus*, not from a virus. Its value is that it stays **active at high temperature**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-pcr-uses",
      name: "What PCR is used for",
      intuition:
        "PCR does one thing: it makes huge numbers of copies of a piece of DNA. So anything that needs a lot of one stretch of DNA, or needs to find a tiny amount of it, uses PCR. It never works on proteins.",
      definition:
        "Uses of PCR:\n" +
        "- **Gene amplification:** making many copies of a gene of interest, which can then be ligated with a vector for cloning.\n" +
        "- **Molecular diagnosis:** PCR can detect a pathogen when its numbers are still very low, for example **HIV** in suspected AIDS patients.\n" +
        "- **Detecting mutations:** it is used to find mutations in genes in suspected **cancer** patients.\n\n" +
        "What PCR is **not** used for:\n" +
        "- Purifying an isolated **protein**: PCR copies DNA only.\n" +
        "- Selecting transformants: that is the job of a **selectable marker** such as the **ampicillin resistance gene**.",
      table: {
        columns: ["Task", "Done by PCR?", "Why"],
        rows: [
          { cells: ["Gene amplification", "Yes", "PCR makes many copies of a chosen DNA stretch"] },
          { cells: ["Molecular diagnosis", "Yes", "It finds a pathogen's DNA, such as HIV, while it is still scarce"] },
          { cells: ["Detection of gene mutations", "Yes", "Used in suspected cancer patients"] },
          { cells: ["Purification of an isolated protein", "No", "PCR works on DNA, not protein"] },
          {
            cells: ["Checking which cells were transformed", "No", "A selectable marker such as the ampicillin resistance gene does this"],
            noteAmber: "NEET 2022: PCR is used in DNA amplification and the ampicillin resistance gene checks transformation; both true, but one does not explain the other.",
            pyqExampleId: "ed3bcac7-8f36-4bea-b656-7f7b297d4eed",
          },
        ],
      },
      pyqExampleId: "d70e73c9-45a2-49e8-bb0b-58de5155f0e0",
      selfCheckExample: {
        prompt: "A patient may have an infection, but the pathogen is still too scarce to show symptoms. How can PCR help?",
        steps: [
          "PCR amplifies even a tiny amount of a chosen DNA sequence.",
          "Amplifying the pathogen's DNA makes it detectable early.",
        ],
        answer: "PCR amplifies the pathogen's nucleic acid so it can be detected before symptoms, as in finding HIV in suspected AIDS patients.",
      },
      practiceSet: [
        { prompt: "In which group of patients is PCR used to detect mutations in genes?", answer: "Suspected cancer patients" },
        { prompt: "What can be done with a DNA fragment after it is amplified by PCR?", answer: "It can be ligated with a vector for further cloning" },
        { prompt: "Does PCR copy RNA, DNA or protein?", answer: "DNA" },
      ],
      traps: [
        {
          title: "PCR never purifies protein",
          body: "PCR amplifies **DNA**. Purifying an isolated **protein** is not one of its uses.",
        },
        {
          title: "PCR and selectable markers do different jobs",
          body: "PCR **amplifies** DNA; an antibiotic resistance gene such as \\(\\text{amp}^R\\) **selects transformants**. Both statements can be true without one explaining the other.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nzobp-pcr-copies",
      name: "Copies double each cycle",
      intuition:
        "Each cycle copies every double-stranded DNA molecule in the tube once, so the number of molecules doubles: one becomes two, two become four, four become eight. After n cycles, one molecule has become two multiplied by itself n times. About thirty cycles give the billion copies NCERT talks about.",
      definition:
        "Counting PCR copies:\n" +
        "- In each cycle the two strands of every molecule separate and each is copied, so **every cycle doubles** the number of DNA molecules.\n" +
        "- Starting from **one** double-stranded molecule, after \\(n\\) cycles there are \\(2^n\\) molecules.\n" +
        "- Starting from \\(N_0\\) molecules, there are \\(N_0 \\times 2^n\\).\n" +
        "- \\(2^{10} = 1024\\), about a thousand, so \\(2^{30}\\) is about a thousand million: the **billion copies** of NCERT come from about **30 cycles**.",
      formula: {
        label: "Number of DNA molecules after n cycles",
        latex: "N = N_0 \\times 2^n",
        symbols: [
          { symbol: "\\(N_0\\)", meaning: "the number of double-stranded DNA molecules at the start" },
          { symbol: "\\(n\\)", meaning: "the number of PCR cycles" },
          { symbol: "\\(N\\)", meaning: "the number of DNA molecules after n cycles" },
        ],
      },
      authoredExample: {
        prompt: "A tube starts with one double-stranded DNA molecule. How many molecules are there after 10 cycles of PCR?",
        steps: [
          "Each cycle doubles the number, so use \\(N = N_0 \\times 2^n\\) with \\(N_0 = 1\\) and \\(n = 10\\).",
          "\\(N = 1 \\times 2^{10} = 1024\\).",
        ],
        answer: "1,024 molecules.",
      },
      pyqExampleId: "fe5f73c8-9942-4c71-989c-1012784c424d",
      selfCheckExample: {
        prompt: "Starting from one DNA molecule, about how many PCR cycles give the billion copies NCERT mentions?",
        steps: [
          "\\(2^{10} = 1024\\), which is about a thousand.",
          "\\(2^{30} = (2^{10})^3\\), about a thousand times a thousand times a thousand, which is a billion.",
        ],
        answer: "About 30 cycles.",
      },
      practiceSet: [
        { prompt: "How many DNA molecules come from one molecule after 5 cycles of PCR?", answer: "\\(2^5 = 32\\)" },
        { prompt: "A reaction starts with 4 DNA molecules and runs 6 cycles. How many molecules are there at the end?", answer: "\\(4 \\times 2^6 = 256\\)" },
        { prompt: "After how many cycles does one DNA molecule become 128 molecules?", answer: "7 cycles, since \\(2^7 = 128\\)" },
      ],
      traps: [
        {
          title: "Copies grow as a power of 2, not as a square",
          body: "PCR copies grow as \\(2^n\\), where \\(n\\) is the number of cycles. \\(n^2\\), \\(2n + 1\\) and \\(2n^2\\) grow far too slowly.",
        },
      ],
    },
  ],
};
