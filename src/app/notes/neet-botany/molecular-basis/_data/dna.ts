import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_BO_MB_DNA_NOTE: SubtopicNote = {
  subtopicName: "DNA Structure and Packaging",
  title: "DNA Structure and Packaging",
  oneLineDefinition:
    "The parts of a nucleotide and how nucleotides join into a chain, the Watson and Crick double helix with Chargaff's rule and its sizes, and how a 2.2 metre long DNA is packed into a nucleus with histones, nucleosomes and chromatin.",
  whyItMatters:
    "Ten NEET questions from 2021 to 2026. Six are on DNA packaging, one in every year from 2021 to 2026: the charge on histones, their lysine and arginine, the 200 base pairs of a nucleosome, euchromatin and heterochromatin. Two are calculations (Chargaff percentages in NEET 2021, base pairs from length in NEET 2022), and two ask nucleoside against nucleotide.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nbomb-nucleotides",
      name: "Nucleosides, nucleotides and the polynucleotide chain",
      intuition:
        "A nucleotide has three parts: a base, a sugar and a phosphate. Take away the phosphate and what is left is a nucleoside. Nucleotides then join end to end, sugar to phosphate, into a long chain with the bases sticking out to one side. Most questions here are naming questions, so learn which name goes with which part.",
      definition:
        "What NCERT says:\n" +
        "- A nucleotide has three components: a **nitrogenous base**, a **pentose sugar** (ribose in RNA, deoxyribose in DNA) and a **phosphate group**.\n" +
        "- Bases are **purines** (adenine, guanine) and **pyrimidines** (cytosine, uracil, thymine). Cytosine is in both DNA and RNA; **thymine is only in DNA**; **uracil is in RNA** in place of thymine. Thymine is 5-methyl uracil.\n" +
        "- A base linked to the OH of the **1' carbon** of the sugar by an **N-glycosidic linkage** forms a **nucleoside**: adenosine or deoxyadenosine, guanosine or deoxyguanosine, cytidine or deoxycytidine, uridine or deoxythymidine.\n" +
        "- A phosphate linked to the **5'-OH** of a nucleoside by a **phosphoester linkage** forms a **nucleotide** (or deoxynucleotide).\n" +
        "- Two nucleotides join by a **3'-5' phosphodiester linkage** into a dinucleotide; more join into a **polynucleotide**. The chain has a free **phosphate at its 5' end** and a free **OH at its 3' end**.\n" +
        "- Sugar and phosphate form the **backbone**; the bases project from it. In RNA every nucleotide has an extra **OH at the 2' position** of the ribose.",
      table: {
        columns: ["Name", "What it is", "Made of"],
        rows: [
          { cells: ["Adenine, guanine", "Purine bases", "A nitrogenous base alone"] },
          { cells: ["Cytosine, thymine, uracil", "Pyrimidine bases", "A nitrogenous base alone"] },
          { cells: ["Adenosine, guanosine, cytidine, uridine", "Nucleosides", "Base and sugar joined by an N-glycosidic linkage"] },
          {
            cells: ["Adenylic acid", "A nucleotide", "Base, sugar and phosphate"],
            noteAmber: "Re-NEET 2024: of uridine, adenylic acid, guanine and guanosine, only adenylic acid is a nucleotide.",
            pyqExampleId: "562b1216-67b8-4f41-96aa-a9317a2baaf5",
          },
          { cells: ["Dinucleotide", "Two nucleotides joined", "Linked by a 3'-5' phosphodiester linkage"] },
          { cells: ["Polynucleotide", "A long chain of nucleotides", "Free phosphate at the 5' end, free OH at the 3' end"] },
        ],
      },
      pyqExampleId: "26126dfe-6d3b-4ed1-a1bc-702154ef09fa",
      selfCheckExample: {
        prompt: "A polynucleotide chain has a free phosphate group at one end and a free hydroxyl group at the other. Name each end, and name the bond that joins one nucleotide to the next.",
        steps: [
          "The phosphate sits on the 5' carbon of the sugar, so the end with a free phosphate is the 5' end.",
          "The free OH sits on the 3' carbon of the last sugar, so that end is the 3' end.",
          "Each nucleotide joins the next through a 3'-5' phosphodiester linkage.",
        ],
        answer: "Free phosphate: 5' end. Free OH: 3' end. Nucleotides join by 3'-5' phosphodiester linkages.",
      },
      practiceSet: [
        { prompt: "Which linkage joins a nitrogenous base to the 1' carbon of the pentose sugar?", answer: "An N-glycosidic linkage" },
        { prompt: "Which linkage joins a phosphate group to the 5'-OH of a nucleoside?", answer: "A phosphoester linkage" },
        { prompt: "Which nitrogenous base is found in RNA in place of thymine?", answer: "Uracil" },
        { prompt: "What extra group does every nucleotide of RNA carry on its ribose sugar?", answer: "A hydroxyl (OH) group at the 2' position" },
        { prompt: "Name the two purine bases found in DNA.", answer: "Adenine and guanine" },
      ],
      traps: [
        {
          title: "No phosphate means a nucleoside",
          body: "A base joined to a sugar is a **nucleoside** (adenosine, guanosine, uridine). Only when a **phosphate** is added does it become a **nucleotide** (adenylic acid). A bare base such as adenine or guanine is neither.",
        },
        {
          title: "Adenosine is not adenine",
          body: "**Adenine** is the base. **Adenosine** is adenine plus sugar (a nucleoside). **Adenylic acid** is adenosine plus phosphate (a nucleotide). Read the ending of the word before you match it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nbomb-double-helix",
      name: "The double helix, Chargaff's rule and DNA length",
      visualizationSlug: "cet-dna-base-pairing",
      intuition:
        "In the double helix, A on one strand always faces T on the other, and G always faces C. So in any double-stranded DNA there is exactly as much A as T, and as much G as C. Every base pair also adds the same small step of 0.34 nm to the length. These two facts turn into the two calculations NEET sets: percentages of bases, and base pairs from length.",
      definition:
        "What NCERT says:\n" +
        "- DNA was first identified as an acidic substance in the nucleus by **Friedrich Meischer in 1869**; he named it **Nuclein**.\n" +
        "- In **1953 James Watson and Francis Crick** proposed the **double helix**, from X-ray diffraction data produced by **Maurice Wilkins and Rosalind Franklin**.\n" +
        "- **Erwin Chargaff** observed that in double-stranded DNA the ratios A/T and G/C are constant and equal to one.\n" +
        "- Two polynucleotide chains, sugar-phosphate backbone outside, bases inside. The chains are **antiparallel** (one runs 5' to 3', the other 3' to 5').\n" +
        "- **A pairs with T by two hydrogen bonds; G pairs with C by three.** A purine always faces a pyrimidine, so the distance between the strands stays the same.\n" +
        "- The two chains coil **right-handed**. The **pitch is 3.4 nm** with about **10 base pairs per turn**, so the gap between base pairs is about **0.34 nm**. Stacking of one base pair over the next adds to the stability given by hydrogen bonds.\n" +
        "- The length of DNA is usually given as its number of nucleotides (or base pairs in double-stranded DNA). Sizes NCERT gives: bacteriophage φX174 has **5386 nucleotides**, bacteriophage lambda **48502 bp**, *Escherichia coli* \\(4.6 \\times 10^{6}\\) bp and **haploid human DNA \\(3.3 \\times 10^{9}\\) bp**.\n" +
        "- A typical mammalian cell has \\(6.6 \\times 10^{9}\\) bp, so its DNA is \\(6.6 \\times 10^{9} \\times 0.34 \\times 10^{-9}\\) m, about **2.2 m** long.",
      formula: {
        label: "Chargaff's rule and DNA length",
        latex: "\\text{A} = \\text{T},\\quad \\text{G} = \\text{C};\\qquad \\text{length} = \\text{base pairs} \\times 0.34\\ \\text{nm}",
        symbols: [
          { symbol: "A, T, G, C", meaning: "the percentage (or number) of each base in double-stranded DNA" },
          { symbol: "0.34 nm", meaning: "the distance between two neighbouring base pairs" },
          { symbol: "10", meaning: "base pairs in one full turn of 3.4 nm" },
        ],
      },
      authoredExample: {
        prompt: "A double-stranded DNA molecule is 680 nm long and 18% of its bases are guanine. Find the percentage of each of the other bases, the number of base pairs and the number of complete turns.",
        steps: [
          "G pairs with C, so C is also 18%. G and C together are 36%.",
          "A and T share the remaining 64% equally, so A is 32% and T is 32%.",
          "Each base pair adds 0.34 nm, so base pairs \\(= \\dfrac{680}{0.34} = 2000\\).",
          "One turn holds 10 base pairs, so turns \\(= \\dfrac{2000}{10} = 200\\).",
        ],
        answer: "C 18%, A 32%, T 32%; 2000 base pairs; 200 turns.",
      },
      pyqExampleId: "adada88f-90b8-4ca1-abe6-ac97c3fb2c9e",
      selfCheckExample: {
        prompt: "A typical mammalian cell has \\(6.6 \\times 10^{9}\\) base pairs of DNA. Find the total length of this DNA in metres.",
        steps: [
          "Each base pair adds 0.34 nm, which is \\(0.34 \\times 10^{-9}\\) m.",
          "Length \\(= 6.6 \\times 10^{9} \\times 0.34 \\times 10^{-9}\\) m.",
          "The powers of ten cancel, leaving \\(6.6 \\times 0.34 \\approx 2.2\\) m.",
        ],
        answer: "About 2.2 metres.",
      },
      practiceSet: [
        { prompt: "In a double-stranded DNA, 15% of the bases are thymine. What percentage are guanine?", answer: "35%", method: "A = T = 15%, so G + C = 70% and G = 35%" },
        { prompt: "How many hydrogen bonds join adenine to thymine, and guanine to cytosine?", answer: "Two between A and T; three between G and C" },
        { prompt: "What is the pitch of the DNA double helix, and about how many base pairs make one turn?", answer: "3.4 nm, with about 10 base pairs per turn" },
        { prompt: "Whose X-ray diffraction data did Watson and Crick use to propose the double helix in 1953?", answer: "Maurice Wilkins and Rosalind Franklin" },
        { prompt: "Who first identified DNA as an acidic substance in the nucleus, and what did he call it?", answer: "Friedrich Meischer, in 1869; he called it Nuclein" },
        { prompt: "A double-stranded DNA has 1000 base pairs, of which 300 are A-T pairs. How many guanine bases does it have?", answer: "700", method: "1000 minus 300 leaves 700 G-C pairs, so 700 guanines" },
      ],
      traps: [
        {
          title: "Chargaff pairs A with T, not A with G",
          body: "Chargaff's rule says **A = T** and **G = C** in double-stranded DNA. It does **not** say A = G. With A at 30%, T is 30% and G and C are 20% each.",
        },
        {
          title: "0.34 nm per base pair, 3.4 nm per turn",
          body: "The gap between two base pairs is **0.34 nm**. **3.4 nm** is the pitch, one full turn of about **10** base pairs. Using 3.4 nm per base pair makes every length answer ten times too small.",
        },
        {
          title: "G and C hold tighter",
          body: "**G and C** are joined by **three** hydrogen bonds, **A and T** by **two**. The strands are **antiparallel**, and the helix is **right-handed**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nbomb-packaging",
      name: "Packaging of DNA: histones, nucleosomes and chromatin",
      intuition:
        "DNA is long and negatively charged; histones are small proteins with a positive charge. Opposite charges attract, so DNA winds around a ball of eight histones like thread on a bead. Each bead is a nucleosome. Chains of these beads coil again and again until they fit inside the nucleus. Where the coiling is loose, genes can be read; where it is tight, they are silent.",
      definition:
        "What NCERT says:\n" +
        "- In a typical mammalian cell the DNA is about **2.2 m** long, while the nucleus is only about \\(10^{-6}\\) m across.\n" +
        "- **Prokaryotes** such as *E. coli* have no defined nucleus. Their **negatively charged DNA** is held with some proteins that have **positive charges** in a region called the **nucleoid**, organised in large loops held by proteins.\n" +
        "- **Eukaryotes** have **histones**: a set of **positively charged, basic proteins**. A protein's charge depends on how many of its amino acid residues have charged side chains; histones are rich in the basic residues **lysine and arginine**, which carry positive charges in their side chains.\n" +
        "- Histones form a unit of **eight molecules**, the **histone octamer**. The negatively charged DNA wraps around the positively charged octamer to form a **nucleosome**. A typical nucleosome holds **200 bp** of DNA.\n" +
        "- Nucleosomes are the repeating unit of **chromatin**, the thread-like stained bodies of the nucleus; under the electron microscope they look like **beads-on-string**.\n" +
        "- Chromatin is packaged into **chromatin fibres**, which coil and condense further at **metaphase** to form **chromosomes**. Packaging at higher levels needs **non-histone chromosomal (NHC) proteins**.\n" +
        "- **Euchromatin**: loosely packed, stains light, transcriptionally **active**. **Heterochromatin**: densely packed, stains dark, transcriptionally **inactive**.",
      table: {
        columns: ["Term", "What NCERT says"],
        rows: [
          { cells: ["Nucleoid", "Region of a prokaryotic cell where negatively charged DNA is held with positively charged proteins"] },
          {
            cells: ["Histones", "Positively charged, basic proteins rich in lysine and arginine"],
            noteAmber: "NEET 2025: histones are enriched with lysine and arginine.",
            pyqExampleId: "882fad92-4691-4d41-8b5f-91b6d6993f89",
          },
          { cells: ["Histone octamer", "A unit of eight histone molecules"] },
          {
            cells: ["Nucleosome", "Negatively charged DNA wrapped around the positively charged histone octamer; about 200 bp of DNA"],
            noteAmber: "NEET 2022: a typical nucleosome contains 200 bp of DNA, not 400 bp.",
            pyqExampleId: "caae2393-d407-433b-8372-9d92e635eb51",
          },
          { cells: ["Chromatin", "Repeating nucleosomes; beads-on-string under the electron microscope"] },
          { cells: ["Non-histone chromosomal (NHC) proteins", "Extra proteins needed to package chromatin at higher levels"] },
          {
            cells: ["Euchromatin", "Loosely packed, light-staining and transcriptionally active"],
            noteAmber: "Re-NEET 2024: matched histones, nucleosome, euchromatin and heterochromatin with their descriptions.",
            pyqExampleId: "3cc5db35-1739-4d50-aaff-241fe38655ec",
          },
          { cells: ["Heterochromatin", "Densely packed, dark-staining and transcriptionally inactive"] },
        ],
      },
      pyqExampleId: "7c49ef98-f0c9-4e32-9708-1ce5937b6501",
      selfCheckExample: {
        prompt: "A stretch of eukaryotic chromatin contains 50 nucleosomes. About how many base pairs of DNA does it hold?",
        steps: [
          "A typical nucleosome holds about 200 bp of DNA.",
          "So 50 nucleosomes hold about \\(50 \\times 200 = 10{,}000\\) bp.",
        ],
        answer: "About 10,000 base pairs.",
      },
      practiceSet: [
        { prompt: "In a prokaryotic cell with no defined nucleus, what is the region holding the DNA called?", answer: "The nucleoid" },
        { prompt: "Which kind of chromatin is loosely packed and transcriptionally active?", answer: "Euchromatin" },
        { prompt: "How does chromatin look under the electron microscope?", answer: "Like beads-on-string" },
        { prompt: "Which chromatin is densely packed, stains dark and is transcriptionally inactive?", answer: "Heterochromatin" },
        { prompt: "Into what do chromatin fibres coil and condense at metaphase?", answer: "Chromosomes" },
      ],
      traps: [
        {
          title: "DNA is negative, histones are positive",
          body: "In both prokaryotes and eukaryotes the **DNA is negatively charged** and the proteins holding it are **positively charged**. A statement calling DNA positive or histones negative is false.",
        },
        {
          title: "Histones are basic, not acidic",
          body: "Histones are **basic** proteins, rich in **lysine and arginine**. They are not acidic, and they are not rich in leucine or phenylalanine.",
        },
        {
          title: "200 bp per nucleosome",
          body: "A typical nucleosome holds **200 bp** of DNA around an octamer of **eight** histones. Do not confuse 200 bp with 400 bp.",
        },
        {
          title: "Active chromatin is the loose one",
          body: "**Euchromatin** is loose and **active**; **heterochromatin** is dense and **inactive**. Dense packing hides genes from being read.",
        },
      ],
    },
  ],
};
