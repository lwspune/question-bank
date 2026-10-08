import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_VIRUSES_NOTE: SubtopicNote = {
  subtopicName: "Viruses",
  title: "Viruses: Structure, Life Cycles and HIV",
  oneLineDefinition:
    "A virus is a particle of nucleic acid in a protein coat, sometimes wrapped in a lipid envelope, that can only multiply inside a living host cell.",
  whyItMatters:
    "Five Cambridge papers between 2014 and 2021 asked about viruses, three of them about HIV. They were all statement questions: which molecules, bonds or structures a virus has and which it lacks.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mbt-virus-structure",
      name: "Virus structure: genome, capsid and envelope",
      intuition:
        "A virus is not a cell. It has no cytoplasm, no ribosomes and no metabolism of its own, so it cannot make anything by itself. It is a set of genes in a protective package, built so that it can get those genes into a host cell, which then does all the work.",
      definition:
        "- Viruses are **acellular** and are **obligate intracellular parasites**: they multiply only inside living host cells, using the host's ribosomes, enzymes, ATP and nucleotides.\n" +
        "- The **genome** is **either DNA or RNA**, never both in one particle. It can be single-stranded or double-stranded, linear or circular.\n" +
        "- The **capsid** is a protein coat built from repeating subunits (**capsomeres**).\n" +
        "- Some viruses have an **envelope**: a phospholipid bilayer taken from the host's membrane as the virus buds out, studded with viral **glycoproteins** that attach to host receptors.\n" +
        "- Size about 20 to 300 nm, so they are seen only with an electron microscope.\n" +
        "- **Bacteriophages** are viruses that infect bacteria (for example T4, with a head, tail and tail fibres).\n" +
        "- Antibiotics have no effect on viruses: there is no wall or bacterial ribosome to attack.",
      table: {
        columns: ["Part", "Made of", "Building blocks and bonds"],
        rows: [
          { cells: ["Genome (DNA or RNA)", "Nucleic acid, single- or double-stranded", "Nucleotides joined by **phosphodiester bonds**; bases (A, G, C, and T or U)"] },
          { cells: ["Capsid", "Protein subunits (capsomeres)", "Amino acids joined by **peptide bonds**"] },
          { cells: ["Envelope (some viruses only)", "Phospholipid bilayer from the host, with viral glycoproteins", "Fatty acids and glycerol in the lipids; peptide bonds in the proteins"] },
          { cells: ["Viral enzymes (some viruses)", "Proteins carried inside the capsid, such as reverse transcriptase", "Amino acids joined by peptide bonds"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following is present in every virus particle?",
        options: ["A protein capsid", "A phospholipid envelope", "Ribosomes", "Both DNA and RNA", "Reverse transcriptase"],
        steps: [
          "Every virus has a genome inside a protein capsid, so A.",
          "Only some viruses are enveloped (B), and only some carry reverse transcriptase (E).",
          "No virus has ribosomes (C), and a virus particle holds DNA or RNA but never both (D).",
        ],
        answer: "(A) A protein capsid",
      },
      practiceSet: [
        { prompt: "Where does a virus's envelope come from?", answer: "From the host cell's membrane, as the virus buds out", method: "Viral glycoproteins are inserted into it" },
        { prompt: "Can a virus have a single-stranded DNA genome?", answer: "Yes", method: "Viral genomes can be ssDNA, dsDNA, ssRNA or dsRNA" },
        { prompt: "Why can viruses not be grown in a plain nutrient broth?", answer: "They need living host cells to multiply" },
        { prompt: "What type of bond links the subunits of a capsid protein chain?", answer: "Peptide bonds" },
      ],
      traps: [
        {
          title: "The envelope is lipid, the capsid is protein",
          body: "An enveloped virus is wrapped in a phospholipid bilayer, so its envelope contains fatty acids (plus glycoproteins). The capsid is protein, made of amino acids. Glycogen and other polysaccharides are not structural parts of either, and phosphodiester bonds belong to the genome.",
        },
        {
          title: "Viral nucleic acid comes in every form",
          body: "Viruses can carry double-stranded DNA, single-stranded DNA, double-stranded RNA or single-stranded RNA. An option saying viruses contain only RNA, or only double-stranded DNA, is wrong. What is true is that one particle carries one kind of nucleic acid, not both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-lytic-lysogenic",
      name: "Lytic and lysogenic cycles of a bacteriophage",
      intuition:
        "Once a phage's DNA is inside a bacterium, it has two choices. It can take over at once, make hundreds of new phages and burst the cell. Or it can hide by joining the bacterial chromosome, riding along quietly each time the cell divides, until something triggers it to break out.",
      definition:
        "Both cycles start the same way: the phage **attaches** to receptors on the cell and **injects** its DNA, leaving the empty capsid outside.\n" +
        "- **Lytic cycle**: the viral genes are expressed at once; the host's machinery copies the viral DNA and makes capsid proteins; new phages are **assembled**; the cell bursts (**lysis**) and releases them.\n" +
        "- **Lysogenic cycle**: the viral DNA is **integrated** into the host chromosome as a **prophage**. It is copied with the chromosome at every division, so all the daughter cells carry it. A stress such as UV light can **induce** it to leave the chromosome and enter the lytic cycle.\n" +
        "- Animal viruses show the same idea as **latency**: herpes simplex can hide in nerve cells for years, and HIV DNA sits in the host chromosome as a **provirus**.",
      table: {
        columns: ["Stage", "Lytic cycle", "Lysogenic cycle"],
        rows: [
          { cells: ["Viral DNA after entry", "Stays separate and is used straight away", "Inserted into the host chromosome as a prophage"] },
          { cells: ["Host cell meanwhile", "Makes viral DNA and proteins, not its own", "Lives and divides normally, copying the prophage each time"] },
          { cells: ["New virus particles", "Many, assembled inside the cell", "None while the prophage stays dormant"] },
          { cells: ["End of the cycle", "Lysis: the cell bursts and dies", "Induction by a trigger, then the lytic cycle"] },
        ],
      },
      selfCheckExample: {
        prompt: "In the lysogenic cycle of a bacteriophage, the viral DNA:",
        options: [
          "is destroyed by the host's restriction enzymes",
          "is used at once to make new capsids",
          "is inserted into the host chromosome and copied each time the host divides",
          "is translated by ribosomes carried inside the phage",
          "bursts the cell soon after entry",
        ],
        steps: [
          "Lysogeny means the viral DNA joins the host chromosome as a prophage and is copied with it, so C.",
          "B and E describe the lytic cycle. Phages carry no ribosomes (D).",
          "A does happen to some phage DNA, but then there is no cycle at all.",
        ],
        answer: "(C) is inserted into the host chromosome and copied each time the host divides",
      },
      practiceSet: [
        { prompt: "What is the viral DNA called once it has joined the bacterial chromosome?", answer: "A prophage" },
        { prompt: "What event ends the lytic cycle?", answer: "Lysis: the host cell bursts, releasing new phages" },
        { prompt: "Name one trigger that can switch a prophage into the lytic cycle.", answer: "UV light (or other damage or stress to the cell)" },
        { prompt: "Which part of a phage enters the bacterium during infection?", answer: "Only the nucleic acid", method: "The capsid stays outside" },
      ],
      traps: [
        {
          title: "Lysogenic does not mean harmless for ever",
          body: "During lysogeny the host is not killed and keeps dividing, but the prophage can be induced at any time to start the lytic cycle and burst the cell. The two cycles are two routes of the same virus, not two kinds of virus.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-hiv",
      name: "Retroviruses and HIV",
      intuition:
        "A retrovirus runs the usual flow of genetic information backwards. Its genes are stored as RNA, but it brings an enzyme that copies that RNA into DNA, and the DNA is then built into the host's own chromosome. From there, the host cell reads the viral genes as if they were its own.",
      definition:
        "**HIV** (human immunodeficiency virus) is a **retrovirus**. Its life cycle:\n" +
        "- The envelope glycoprotein **gp120** binds the **CD4** receptor on **helper T cells** (and macrophages); the envelope fuses with the cell membrane.\n" +
        "- **Reverse transcriptase** uses the viral RNA as a template to make DNA.\n" +
        "- **Integrase** inserts this DNA into a host chromosome as a **provirus**.\n" +
        "- The host transcribes the provirus; viral proteins are made on the **host's ribosomes**; new particles assemble and **bud** off, taking host membrane as their envelope.\n" +
        "Loss of helper T cells weakens the whole immune system: years later this becomes **AIDS**, where opportunistic infections (tuberculosis, pneumonia) and some cancers take hold. HIV spreads by blood, sex and from mother to baby. **Antiretroviral therapy** blocks reverse transcriptase, protease or integrase; it controls but does not cure the infection, and there is no vaccine. Reverse transcriptase makes many copying errors, so HIV mutates fast.",
      table: {
        columns: ["Part of HIV", "Made of", "Role"],
        rows: [
          { cells: ["Genome", "**Two copies of single-stranded RNA**", "Carries the viral genes"] },
          { cells: ["Reverse transcriptase", "Enzyme (protein)", "Copies the RNA genome into DNA"] },
          { cells: ["Integrase", "Enzyme (protein)", "Inserts the viral DNA into a host chromosome"] },
          { cells: ["Protease", "Enzyme (protein)", "Cuts long viral proteins into working pieces"] },
          { cells: ["Capsid", "Protein", "Encloses the RNA and the enzymes"] },
          { cells: ["Envelope", "Phospholipid bilayer from the host, with glycoproteins gp120 and gp41", "Attachment to CD4 and fusion with the host cell"] },
        ],
        caption: "HIV has no ribosomes, no cytoplasm and no DNA in the particle itself.",
      },
      selfCheckExample: {
        prompt: "Which statement about HIV is correct?",
        options: [
          "The virus particle carries DNA, which is transcribed in the host nucleus",
          "HIV makes its proteins on its own ribosomes",
          "Antibiotics such as penicillin stop HIV from multiplying",
          "Reverse transcriptase uses an RNA template to make DNA",
          "HIV mainly infects red blood cells",
        ],
        steps: [
          "Reverse transcriptase is an RNA-dependent DNA polymerase: RNA template, DNA product. D is correct.",
          "A: the particle carries RNA; the DNA copy only appears inside the host cell. B: viruses have no ribosomes.",
          "C: antibiotics act on bacterial targets that viruses do not have. E: HIV infects CD4 cells, mainly helper T cells.",
        ],
        answer: "(D) Reverse transcriptase uses an RNA template to make DNA",
      },
      practiceSet: [
        { prompt: "Which receptor on helper T cells does HIV bind to?", answer: "CD4" },
        { prompt: "Which HIV enzyme inserts the viral DNA into the host chromosome?", answer: "Integrase" },
        { prompt: "Why does the HIV envelope contain phospholipids?", answer: "It is taken from the host's membrane when the virus buds out" },
        { prompt: "Which parts of an HIV particle are made of protein?", answer: "The capsid, the enzymes, and the glycoproteins of the envelope" },
      ],
      traps: [
        {
          title: "The HIV particle contains RNA, not DNA",
          body: "HIV's genome is RNA. DNA is made from it only after infection, inside the host cell. So DNA is not a component of the virus particle, but RNA, phospholipids (in the envelope) and reverse transcriptase are.",
        },
        {
          title: "HIV and AIDS are not the same thing",
          body: "HIV is the virus. AIDS is the late stage of the disease, when so many helper T cells are lost that opportunistic infections take hold. A person can carry HIV for years without having AIDS, especially with treatment.",
        },
      ],
    },
  ],
};
