import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_RECOMBINANT_NOTE: SubtopicNote = {
  subtopicName: "Recombinant DNA Technology",
  title: "Recombinant DNA: Cutting, Joining and Cloning Genes",
  oneLineDefinition:
    "Restriction enzymes cut DNA at set sequences, ligase joins the pieces, and a vector carries the new combination into a host cell that is then selected and grown.",
  whyItMatters:
    "This is the most asked part of the chapter. Questions have asked for the fragments left after a plasmid is cut, the order of the steps, the bases of a sticky end, which bonds the enzymes break or make, the role of Agrobacterium, and (in 2026) which class of enzyme a restriction enzyme is.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-mbt-restriction",
      name: "Restriction enzymes, sticky ends and counting fragments",
      intuition:
        "A restriction enzyme is molecular scissors that cut only at one short sequence. Bacteria make them to chop up the DNA of invading phages. Because the cut is always at the same sequence, every molecule cut by the same enzyme gets the same matching ends, and any two such ends can be joined.",
      definition:
        "- **Restriction enzymes** are **endonucleases**: they cut within a DNA molecule (exonucleases trim from the ends). By the enzyme classes they are **hydrolases**: they use water to break **phosphodiester bonds** in the sugar-phosphate backbone of both strands.\n" +
        "- Each recognises a **recognition site** of 4 to 8 base pairs, usually a **palindrome**: both strands read the same 5' to 3'. EcoRI recognises 5'-GAATTC-3' and cuts each strand between the G and the first A, leaving an AATT overhang.\n" +
        "- A staggered cut leaves short single-stranded overhangs, **sticky ends**, which pair with any complementary overhang by hydrogen bonds. A straight cut leaves **blunt ends**.\n" +
        "- The bacterium's own DNA is protected because its recognition sites are **methylated**.\n" +
        "- Counting pieces: each cut adds one piece to a line, but the first cut in a circle only opens it.",
      formula: {
        label: "Fragments from n cuts",
        latex: "\\text{linear DNA: } n + 1 \\text{ fragments} \\qquad \\text{circular DNA: } n \\text{ fragments}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of cut sites (at least 1)" },
        ],
      },
      authoredExample: {
        prompt:
          "An enzyme cuts at positions 400, 1100 and 2500 bp. Find the fragment sizes (a) in a linear DNA molecule of 3000 bp, and (b) for sites at 1000, 1800 and 4200 bp in a circular plasmid of 5000 bp.",
        steps: [
          "(a) Linear, 3 cuts, so 4 pieces: 0 to 400 = 400, 400 to 1100 = 700, 1100 to 2500 = 1400, 2500 to 3000 = 500 bp. Check: \\(400 + 700 + 1400 + 500 = 3000\\).",
          "(b) Circular, 3 cuts, so 3 pieces: 1000 to 1800 = 800 bp and 1800 to 4200 = 2400 bp.",
          "The last piece runs from 4200 round past the end back to 1000: \\((5000 - 4200) + 1000 = 1800\\) bp. Check: \\(800 + 2400 + 1800 = 5000\\).",
        ],
        answer: "(a) 400, 700, 1400 and 500 bp; (b) 800, 2400 and 1800 bp",
      },
      selfCheckExample: {
        prompt:
          "A circular plasmid of 4800 bp is cut completely with an enzyme that has sites at 900 bp, 2100 bp and 3600 bp. Which fragments are produced?",
        options: [
          "900, 1200, 1200 and 1500 bp",
          "900, 1200 and 1500 bp",
          "900, 2100 and 3600 bp",
          "1200, 1500, 2100 and 4800 bp",
          "1200, 1500 and 2100 bp",
        ],
        steps: [
          "A circle with 3 cuts gives 3 fragments: \\(2100 - 900 = 1200\\) and \\(3600 - 2100 = 1500\\).",
          "The third runs across the starting point: \\((4800 - 3600) + 900 = 2100\\) bp. The total is 4800, as it must be. So E.",
          "A treats the plasmid as a straight line. B forgets the piece that crosses the starting point. C lists the positions, not the sizes. D adds an uncut plasmid, but the digestion was complete.",
        ],
        answer: "(E) 1200, 1500 and 2100 bp",
      },
      practiceSet: [
        { prompt: "How many fragments do 5 cuts make in a linear DNA molecule?", answer: "6" },
        { prompt: "A circular plasmid is cut at a single site. What is produced?", answer: "One linear molecule, the full length of the plasmid" },
        { prompt: "Which bonds does a restriction enzyme break?", answer: "Phosphodiester bonds in both strands" },
        { prompt: "Write the complementary strand of 5'-GAATTC-3', also reading 5' to 3'.", answer: "5'-GAATTC-3'", method: "A palindromic site reads the same on both strands" },
      ],
      traps: [
        {
          title: "Restriction enzymes break phosphodiester bonds",
          body: "The cut goes through the sugar-phosphate backbone, so the bonds broken are phosphodiester bonds. The few hydrogen bonds between the bases of a staggered cut simply come apart on their own. An enzyme that only broke hydrogen bonds would separate the strands without cutting anything.",
        },
        {
          title: "Restriction enzymes are endonucleases, which are hydrolases",
          body: "The six enzyme classes are oxidoreductases, transferases, hydrolases, lyases, isomerases and ligases. A restriction enzyme hydrolyses bonds inside the DNA chain, so it is an endonuclease, one kind of hydrolase. Ligase is the enzyme that joins DNA, the opposite job.",
        },
        {
          title: "A circle with n cuts gives n pieces",
          body: "Do not add the extra piece you would get on a straight molecule, and do not forget the piece that crosses the plasmid's starting point. The sizes must add up to the plasmid's full length.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-tools-vectors",
      name: "Ligase, reverse transcriptase and vectors",
      intuition:
        "Cutting DNA is only half the job. The new piece must be sealed into a carrier, a vector, that can get into the host cell and be copied there. Each tool in the kit has one job, and IMAT likes to swap the jobs around in its options.",
      definition:
        "- **DNA ligase** seals the sugar-phosphate backbone by forming **phosphodiester bonds** (using ATP). The base pairing between sticky ends forms by itself; ligase makes it permanent.\n" +
        "- **cDNA** (complementary DNA) is made from mature **mRNA** by **reverse transcriptase**. It has **no introns** and no promoter, so a bacterium, which cannot remove introns, can express it once it is placed after a bacterial promoter.\n" +
        "- A **vector** carries DNA into a host cell. A good plasmid vector has an **origin of replication**, one or more **marker genes** (such as antibiotic resistance) and **restriction sites** where the gene can go.\n" +
        "- **Agrobacterium tumefaciens** carries the **Ti plasmid**. In nature it transfers a piece of this plasmid (T-DNA) into plant cells, where its genes make the cells divide and form a gall. Biologists use it to carry a new gene into plant cells.",
      table: {
        columns: ["Tool", "What it does", "Point to remember"],
        rows: [
          { cells: ["Restriction enzyme", "Cuts DNA at a specific sequence", "Breaks phosphodiester bonds; same enzyme gives matching sticky ends"] },
          { cells: ["DNA ligase", "Joins DNA fragments", "**Forms** phosphodiester bonds; uses ATP"] },
          { cells: ["Reverse transcriptase", "Makes cDNA from an mRNA template", "From retroviruses; the cDNA has no introns"] },
          { cells: ["Plasmid vector", "Carries a gene into bacteria", "Origin of replication, marker genes, restriction sites"] },
          { cells: ["Ti plasmid of Agrobacterium tumefaciens", "Carries a gene into plant cells", "The bacterium supplies the vector; in nature its genes make plant cells divide"] },
          { cells: ["Viral vector", "Carries a gene into animal or human cells", "Modified so that it cannot multiply"] },
          { cells: ["Liposome", "Lipid sphere that fuses with the cell membrane", "Non-viral vector, used in gene therapy"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "To make a human protein in bacteria, scientists usually insert cDNA made from mRNA rather than the gene cut straight from a human chromosome. Why?",
        options: [
          "cDNA is double-stranded RNA, which bacteria translate directly",
          "Bacteria cannot remove introns, and cDNA has none",
          "cDNA carries the gene's own human promoter",
          "Bacteria read a different genetic code from human cells",
          "cDNA is shorter because it has lost the exons",
        ],
        steps: [
          "A human gene on a chromosome contains introns. Bacteria have no spliceosomes to remove them, so the protein would be wrong. cDNA is copied from mature mRNA, which has already lost its introns. So B.",
          "A: cDNA is DNA. C: mRNA has no promoter, so cDNA has none either. D: the genetic code is universal. E: it is the introns that are missing, not the exons.",
        ],
        answer: "(B) Bacteria cannot remove introns, and cDNA has none",
      },
      practiceSet: [
        { prompt: "Which enzyme seals the gaps in the backbone after sticky ends pair?", answer: "DNA ligase" },
        { prompt: "Why does a plasmid vector carry an antibiotic resistance gene?", answer: "So that bacteria which took up the plasmid can be selected on antibiotic plates" },
        { prompt: "Which bacterium supplies the Ti plasmid used to modify plants?", answer: "Agrobacterium tumefaciens" },
        { prompt: "Name a non-viral vector for putting genes into human lung cells.", answer: "Liposomes" },
      ],
      traps: [
        {
          title: "Ligase makes phosphodiester bonds, not hydrogen bonds",
          body: "Complementary sticky ends find each other and pair by hydrogen bonds without any enzyme. Ligase then forms the phosphodiester bonds that close the backbone. Options saying ligase forms hydrogen bonds, or breaks phosphodiester bonds, swap the jobs.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-recombinant-steps",
      name: "Making and selecting a recombinant organism",
      intuition:
        "The method follows the logic of the tools. Get the gene, open the vector with the same enzyme so the ends match, join them, put the result into a host, then find the few cells that took up the right plasmid. Only checked cells are grown on or used to modify a plant or animal.",
      definition:
        "- **Transformation** (here) is the uptake of a plasmid by the host cell. Bacteria are made to take up DNA by a **heat shock** in calcium chloride or by **electroporation** (a brief electric pulse).\n" +
        "- Only a small fraction of cells take up a plasmid, and some plasmids close up without the gene. So there are three kinds of cell: no plasmid, plasmid without the gene, and the wanted **recombinant plasmid**.\n" +
        "- **Selection** uses marker genes. If the gene is inserted inside a second marker, that marker is switched off (**insertional inactivation**). With lacZ as the second marker, on a plate with ampicillin and X-gal: no plasmid means no growth, an empty plasmid gives a **blue** colony, a recombinant plasmid gives a **white** colony.\n" +
        "- Fluorescent markers such as **GFP** (from a jellyfish) are also used: cells that glow carry the plasmid.",
      table: {
        columns: ["Step", "What is done", "Tool"],
        rows: [
          { cells: ["1. Obtain the gene", "Cut it out of DNA, make it as cDNA from mRNA, or copy it by PCR", "Restriction enzyme, reverse transcriptase or PCR"] },
          { cells: ["2. Open the vector", "Cut the plasmid with the same restriction enzyme", "Same enzyme, so the sticky ends match"] },
          { cells: ["3. Join", "Mix gene and plasmid; sticky ends pair; seal the backbone", "DNA ligase"] },
          { cells: ["4. Insert into the host", "Bacteria take up the plasmid (transformation)", "Heat shock in calcium chloride, or electroporation"] },
          { cells: ["5. Select", "Grow on a medium where only cells with the recombinant plasmid survive or show a colour", "Marker genes"] },
          { cells: ["6. Use", "Grow the chosen bacteria in a fermenter, or deliver the checked plasmid to plant or animal cells", "Fermenter; Agrobacterium or other vector"] },
        ],
        caption: "Steps 1 and 2 can be done in either order; joining must come after both, and selection after insertion into the host.",
      },
      selfCheckExample: {
        prompt:
          "A plasmid carries an ampicillin resistance gene and the lacZ gene. A new gene is inserted inside lacZ, and bacteria are then spread on a plate containing ampicillin and X-gal. Which colonies contain the recombinant plasmid?",
        options: [
          "Blue colonies",
          "No colonies, because ampicillin kills all bacteria",
          "Every colony that grows",
          "White colonies",
          "Only colonies that grow without ampicillin",
        ],
        steps: [
          "Only bacteria with a plasmid survive ampicillin, so every colony on the plate has a plasmid.",
          "If lacZ is intact (empty plasmid), the cells turn X-gal blue. If the new gene sits inside lacZ, lacZ is broken and the colony stays white. So D.",
          "C forgets the empty plasmids; A picks the empty plasmids; B ignores the resistance gene; E would include cells with no plasmid at all.",
        ],
        answer: "(D) White colonies",
      },
      practiceSet: [
        { prompt: "Why are the gene and the plasmid cut with the same restriction enzyme?", answer: "So their sticky ends are complementary and can pair" },
        { prompt: "What is the uptake of a plasmid by a bacterium called?", answer: "Transformation" },
        { prompt: "Why do bacteria with no plasmid fail to grow on an ampicillin plate?", answer: "They lack the resistance gene the plasmid carries" },
        { prompt: "Name two ways to make bacteria take up plasmids.", answer: "Heat shock in calcium chloride; electroporation" },
      ],
      traps: [
        {
          title: "A transformed cell is not necessarily recombinant",
          body: "A bacterium that has taken up a plasmid is transformed, but the plasmid may have closed up without the gene. That is why a second, screening step (such as blue and white colonies) is needed after the antibiotic selects for any plasmid.",
        },
        {
          title: "Join before you insert",
          body: "Ligation happens in the test tube, before the plasmid goes into the host, and the recombinant plasmid is checked before it is used to modify a plant or animal. An order that puts ligase after insertion into the host, or selection before the cutting, is wrong.",
        },
      ],
    },
  ],
};
