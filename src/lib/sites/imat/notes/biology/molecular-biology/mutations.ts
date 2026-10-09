import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MOL_MUTATIONS_NOTE: SubtopicNote = {
  subtopicName: "Gene Mutations",
  title: "Mutations at the Level of DNA",
  oneLineDefinition:
    "A gene mutation is a permanent change in the base sequence; its effect on the protein depends on whether it swaps, adds or removes bases and on how the codons are then read.",
  whyItMatters:
    "Mutation questions give a normal and a changed sequence and ask what kind of change explains them (2014, 2015, 2019), or ask what a single-base change can do to the protein (2020). Large chromosome changes and inheritance belong to the genetics chapter.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mol-mutation-types",
      name: "Point mutations: silent, missense, nonsense and frameshift",
      intuition:
        "Changing one letter of a sentence may change nothing, change one word, or end the sentence early. Adding or losing a letter is worse: every word after it is read wrongly. Mutations in DNA behave the same way, because the ribosome reads codons in a fixed frame of three.",
      definition:
        "A **point mutation** changes a single base pair: a **substitution**, an **insertion** or a **deletion**.\n" +
        "- A substitution may be **silent**, **missense** or **nonsense**, depending on the new codon.\n" +
        "- An insertion or deletion of a number of bases that is not a multiple of 3 causes a **frameshift**.\n" +
        "- So a single-base change can leave the protein unchanged, change one amino acid (possibly altering its folding and tertiary structure), make it shorter, or, if a stop codon is lost, make it longer.\n" +
        "- Example: in **sickle-cell anaemia**, one substitution in the β-globin gene (GAG to GTG on the coding strand) replaces glutamic acid with valine.",
      table: {
        columns: ["Type", "Change in the DNA", "Effect on the protein"],
        rows: [
          { cells: ["Silent", "substitution giving a codon for the same amino acid", "no change"] },
          { cells: ["Missense", "substitution giving a codon for a different amino acid", "one amino acid replaced; the protein may fold differently"] },
          { cells: ["Nonsense", "substitution giving a stop codon", "a shorter protein, usually not functional"] },
          { cells: ["Frameshift", "insertion or deletion of 1, 2, 4 ... bases (not a multiple of 3)", "every codon after it read wrongly, often reaching an early stop"] },
          { cells: ["In-frame insertion or deletion", "3 bases (or a multiple of 3) added or lost", "one amino acid gained or lost; the rest unchanged"] },
        ],
      },
      selfCheckExample: {
        prompt: "A single base is deleted near the start of the coding sequence of a gene. What is the most likely result?",
        options: [
          "One amino acid is replaced and the rest are unchanged.",
          "The protein is unchanged because the code is degenerate.",
          "The amino acid sequence changes from that point on, often ending early at a new stop codon.",
          "Only the amino acid at that position is lost.",
          "The gene is no longer transcribed.",
        ],
        steps: [
          "Losing one base shifts the reading frame, so every codon after it changes. C is correct.",
          "A and B describe substitutions. D would need three bases lost. E is wrong: the promoter is untouched, so the gene is still transcribed.",
        ],
        answer: "(C) The amino acid sequence changes from that point on, often ending early at a new stop codon.",
      },
      practiceSet: [
        { prompt: "A codon UGG (tryptophan) becomes UGA. What type of mutation is this?", answer: "Nonsense" },
        { prompt: "A codon GCU becomes GCC; both code for alanine. What type of mutation is this?", answer: "Silent" },
        { prompt: "Three neighbouring bases are deleted from a gene. Is this a frameshift?", answer: "No: the frame is kept and one amino acid is lost" },
      ],
      traps: [
        {
          title: "A single-base change can have any of several effects",
          body: "Do not assume a point mutation always changes the protein, or always ruins it. The same kind of event can be silent, change one amino acid, shorten the protein or shift the frame. A 'which effects are possible' question usually wants all of them.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-mol-mutation-analysis",
      name: "Reading two sequences to name the mutation",
      intuition:
        "Most mutation questions are a comparison. Line the two sequences up, find where they first differ, check whether the length changed, and then read both in codons from the start. The codons tell you the effect on the protein.",
      definition:
        "A method for any sequence comparison:\n" +
        "- **Line up** the normal and mutant sequences and find the first difference.\n" +
        "- **Count** the bases: same length suggests a substitution; one more or one fewer suggests an insertion or a deletion.\n" +
        "- **Convert** to mRNA codons if needed (coding strand with U for T), reading in threes from the start.\n" +
        "- **Translate** the changed codons with the table given, and name the effect: silent, missense, nonsense or frameshift.\n" +
        "- Same length does not prove a substitution: an insertion and a nearby deletion together keep the length but shift the frame between them.",
      authoredExample: {
        prompt:
          "The coding strand of a gene begins 5′-ATG GCT TGG AAA-3′. Name the effect of each mutant. Mutant 1: 5′-ATG GCC TGG AAA-3′. Mutant 2: 5′-ATG GCT TGA AAA-3′. Mutant 3: the G of the second codon is lost. Use: AUG = Met, GCU and GCC = Ala, UGG = Trp, AAA = Lys, UGA = stop, CUU = Leu, GGA = Gly.",
        steps: [
          "Normal mRNA codons: AUG GCU UGG AAA, giving Met-Ala-Trp-Lys.",
          "Mutant 1: GCU becomes GCC, still alanine. Same length, same protein: a silent substitution.",
          "Mutant 2: UGG becomes UGA, a stop codon. The protein stops after Met-Ala: a nonsense substitution.",
          "Mutant 3: the sequence becomes ATG CTT GGA AA..., read as AUG CUU GGA: Met-Leu-Gly and onwards. One base lost shifts every later codon: a frameshift deletion.",
        ],
        answer: "Mutant 1 silent; mutant 2 nonsense; mutant 3 frameshift",
      },
      selfCheckExample: {
        prompt:
          "The coding strand of a gene begins 5′-ATG CAT GGC-3′. In a mutant it begins 5′-ATG CAA GGC-3′. Using AUG = Met, CAU = His, CAA = Gln and GGC = Gly, which kind of mutation is this?",
        options: [
          "a missense substitution",
          "a silent substitution",
          "a nonsense substitution",
          "a frameshift insertion",
          "a frameshift deletion",
        ],
        steps: [
          "Both sequences have nine bases, and only the sixth differs, so this is a substitution.",
          "The second codon changes from CAU (His) to CAA (Gln): a different amino acid, so it is missense.",
          "B would keep histidine; C would need a stop codon; D and E would change the length.",
        ],
        answer: "(A) a missense substitution",
      },
      practiceSet: [
        { prompt: "A coding-strand codon 5′-TGG-3′ becomes 5′-TAG-3′. What is the effect?", answer: "Nonsense: UAG is a stop codon" },
        { prompt: "A coding-strand codon 5′-GAA-3′ becomes 5′-GAG-3′; both code for glutamic acid. What is the effect?", answer: "Silent" },
        { prompt: "A normal sequence ATGCCG becomes ATGCCCG. What kind of mutation is this?", answer: "An insertion of one base, so a frameshift" },
      ],
      traps: [
        {
          title: "Equal length does not rule out insertion or deletion",
          body: "If one base is inserted and another deleted a few bases later, the length is unchanged but the codons between them are read in the wrong frame. When two sequences of equal length differ in a run of bases, consider substitution, insertion and deletion together.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mol-mutagens",
      name: "Causes of mutation, repair and inheritance of mutations",
      intuition:
        "Mutations arise from rare copying mistakes and from damage by radiation or chemicals. Cells repair most of the damage, so only a few changes become permanent. Whether a mutation reaches the next generation depends on which cell it happens in.",
      definition:
        "A **mutation** is a permanent change in the base sequence of DNA; a **mutagen** is an agent that raises the mutation rate.\n" +
        "- Mutations are random: a mutagen does not aim at a useful gene.\n" +
        "- **Somatic** mutations (in body cells) are not inherited; they can cause cancer.\n" +
        "- **Germ-line** mutations (in cells that make eggs or sperm) can pass to offspring.\n" +
        "- Many mutations are neutral (in non-coding DNA, or silent); some are harmful; a few are useful. They are the raw material for evolution.",
      table: {
        columns: ["Source or system", "What it does to DNA"],
        rows: [
          { cells: ["Copying errors", "a wrong base slips past DNA polymerase; after proofreading and repair about 1 base in \\(10^9\\) to \\(10^{10}\\) copied stays wrong"] },
          { cells: ["Ultraviolet light", "joins neighbouring thymines into thymine dimers, which distort the helix"] },
          { cells: ["Ionising radiation (X-rays, gamma rays)", "breaks one or both strands of the backbone"] },
          { cells: ["Chemical mutagens", "alter bases or slip between them (intercalating agents cause frameshifts); tobacco smoke contains several"] },
          { cells: ["Repair systems", "proofreading by DNA polymerase, mismatch repair, and excision repair of damaged bases"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these mutations could be passed on to a person's children?",
        options: [
          "a mutation caused by sunlight in a skin cell",
          "a mutation in a liver cell",
          "any mutation that changes a protein",
          "a mutation in a cell that will give rise to eggs or sperm",
          "a mutation in a white blood cell",
        ],
        steps: [
          "Only germ-line cells pass their DNA to the next generation, so D is correct.",
          "A, B and E are somatic mutations, which stay in the person. C is wrong because inheritance depends on the cell type, not on the effect.",
        ],
        answer: "(D) a mutation in a cell that will give rise to eggs or sperm",
      },
      practiceSet: [
        { prompt: "What kind of damage does ultraviolet light cause in DNA?", answer: "Thymine dimers" },
        { prompt: "Which kind of chemical mutagen tends to cause frameshifts?", answer: "Intercalating agents, which slip between the bases" },
        { prompt: "Are most mutations harmful?", answer: "No: many are neutral, because they fall in non-coding DNA or are silent" },
      ],
      traps: [
        {
          title: "Mutations are random, not directed by need",
          body: "A mutagen raises the rate of mutation everywhere in the genome. It does not produce the change an organism needs; natural selection later acts on whatever variation arises.",
        },
      ],
    },
  ],
};
