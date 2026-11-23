import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BP_RESTRICTION_NOTE: SubtopicNote = {
  subtopicName: "Restriction Enzymes and Gel Electrophoresis",
  title: "Restriction Enzymes and Gel Electrophoresis",
  oneLineDefinition:
    "The idea behind recombinant DNA, how restriction enzymes find a palindrome and cut it to leave sticky ends, and how gel electrophoresis separates, shows and recovers the cut pieces.",
  whyItMatters:
    "Fifteen NEET questions from 2021 to 2026, the most of any page in this chapter. Seven are about restriction enzymes: palindromes, sticky ends, the six base pairs of Hind II and the EcoRI site. Gel electrophoresis was asked once in every year from 2021 to 2026, and the bright orange bands under UV light appear in three of those six questions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobp-principles",
      name: "The principle of recombinant DNA",
      intuition:
        "To copy a useful gene, you cannot just drop it into a bacterium. A loose piece of DNA cannot copy itself. It has to be stitched into DNA that already knows how to replicate, such as a plasmid. So you need scissors to cut, glue to join, and a carrier that the host will copy along with its own DNA.",
      definition:
        "Biotechnology and its two core techniques:\n" +
        "- The European Federation of Biotechnology (EFB) defines biotechnology as the **integration of natural science and organisms, cells, parts thereof, and molecular analogues for products and services**.\n" +
        "- **Genetic engineering** alters the chemistry of the genetic material (DNA and RNA), introduces it into the host and so changes the phenotype of the host.\n" +
        "- **Bioprocess engineering** keeps a **sterile** (microbial contamination free) ambience, so that only the desired microbe or cell grows in large quantity to make the product.\n\n" +
        "Three basic steps in genetically modifying an organism:\n" +
        "- Identification of DNA with the desirable genes.\n" +
        "- Introduction of the identified DNA into the host.\n" +
        "- Maintenance of the introduced DNA in the host and transfer of the DNA to its progeny.\n\n" +
        "Why the DNA needs a carrier:\n" +
        "- A piece of DNA carrying only the gene of interest, put into an alien organism, **cannot multiply itself** in the progeny cells.\n" +
        "- If it gets **integrated into the genome** of the recipient, it may multiply and be inherited **along with the host DNA**.\n" +
        "- A chromosome has a specific DNA sequence, the **origin of replication (ori)**, that starts replication. The alien DNA must be part of a chromosome or plasmid that has an ori.\n" +
        "- **Plasmids** are autonomously replicating, circular, extra-chromosomal DNA.\n\n" +
        "The first recombinant DNA was made in **1972 by Stanley Cohen and Herbert Boyer**: they linked a gene for antibiotic resistance to a native plasmid of *Salmonella typhimurium*. Cutting needs a **restriction enzyme** (molecular scissors); joining needs **DNA ligase**; the joined DNA is then put into *Escherichia coli*.",
      table: {
        columns: ["Tool", "What it does", "Needed in gene cloning?"],
        rows: [
          {
            cells: ["Restriction enzyme", "Cuts DNA at a specific recognition sequence", "Yes"],
            noteAmber: "NEET 2025: DNA mutase and DNA recombinase were the two enzymes not essential for gene cloning.",
            pyqExampleId: "fae0b4dd-8212-46f8-97d7-a5c099b737a3",
          },
          { cells: ["DNA ligase", "Joins the cut ends of the vector and the gene", "Yes"] },
          { cells: ["DNA polymerase", "Extends primers to copy DNA, as in PCR", "Yes"] },
          { cells: ["Vector with an ori", "Carries the gene and lets it replicate in the host", "Yes"] },
          { cells: ["Host organism", "Takes up the recombinant DNA and copies it", "Yes, usually Escherichia coli"] },
        ],
      },
      pyqExampleId: "56f38e93-25bb-44dc-933d-a3da819f4a43",
      selfCheckExample: {
        prompt: "Name the two core techniques that made modern biotechnology possible, and say what each one does.",
        steps: [
          "One technique changes the genetic material itself and puts it into a host.",
          "The other grows only the wanted cells, free of contamination, on a large scale.",
        ],
        answer: "Genetic engineering, which alters DNA or RNA and introduces it into a host; and bioprocess engineering, which keeps a sterile ambience so only the desired cells grow to make the product.",
      },
      practiceSet: [
        { prompt: "Who made the first recombinant DNA, and in which year?", answer: "Stanley Cohen and Herbert Boyer, in 1972" },
        { prompt: "Which bacterium's native plasmid was used to make the first recombinant DNA?", answer: "Salmonella typhimurium" },
        { prompt: "What is the name of the DNA sequence in a chromosome that starts replication?", answer: "The origin of replication (ori)" },
        { prompt: "Which enzyme joins a cut gene to a cut plasmid?", answer: "DNA ligase" },
        { prompt: "What are the three basic steps in genetically modifying an organism?", answer: "Identify the DNA with the desirable genes, introduce it into the host, and maintain it in the host and pass it to the progeny" },
      ],
      traps: [
        {
          title: "A bare gene cannot copy itself in a new host",
          body: "A piece of DNA with **only the gene of interest** cannot multiply on its own in the progeny cells. It is copied only if it is **integrated** into the host genome or carried by a vector with an **ori**.",
        },
        {
          title: "Mutase and recombinase are not cloning tools",
          body: "The enzymes gene cloning needs are **restriction enzymes, DNA ligase and DNA polymerase**. A DNA mutase or DNA recombinase is not among them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-restriction",
      name: "Restriction enzymes, palindromes and sticky ends",
      intuition:
        "A restriction enzyme reads along the DNA until it finds its own short code word, a palindrome that reads the same on both strands. It then cuts both strands, but a little off the centre, so each cut end is left with a short single strand hanging out. Those overhangs pair with any other end cut by the same enzyme, like matching jigsaw edges.",
      definition:
        "Discovery and naming:\n" +
        "- In **1963** two enzymes that restrict the growth of bacteriophage in *Escherichia coli* were isolated. One added **methyl groups** to DNA; the other **cut DNA** and was called **restriction endonuclease**.\n" +
        "- The first restriction endonuclease, **Hind II**, was isolated **five years later**. It always cuts DNA at a particular point by recognising a specific sequence of **six base pairs**, its **recognition sequence**.\n" +
        "- Today **more than 900** restriction enzymes are known, from **over 230 strains** of bacteria, each recognising a different sequence.\n" +
        "- Naming: the **first letter** comes from the **genus** and the **next two letters** from the **species**. In **EcoRI** (from *Escherichia coli* RY 13), **R** is from the **strain**, and the Roman numeral **I** gives the **order** in which the enzyme was isolated from that strain.\n\n" +
        "How they cut:\n" +
        "- Restriction enzymes belong to the **nucleases**. **Exonucleases** remove nucleotides from the **ends** of DNA; **endonucleases** cut at specific positions **within** the DNA.\n" +
        "- Each one inspects the DNA, binds at its recognition sequence and cuts **both strands** at specific points in the **sugar-phosphate backbone**.\n" +
        "- The recognition sequence is a **palindrome**: it reads the same on the two strands when the orientation of reading is kept the same, as in 5'-GAATTC-3' on one strand and 3'-CTTAAG-5' on the other.\n" +
        "- The cut is made **a little away from the centre** of the palindrome, but **between the same two bases** on the opposite strands. EcoRI cuts **between G and A**.\n" +
        "- This leaves single-stranded overhangs, the **sticky ends**, which form hydrogen bonds with their complementary cut counterparts. The stickiness helps **DNA ligase** join them.\n" +
        "- So the vector and the source DNA must be cut with the **same** restriction enzyme to give the same kind of sticky ends.",
      table: {
        columns: ["Statement", "True or false"],
        rows: [
          {
            cells: ["Restriction endonucleases recognise palindromic nucleotide sequences", "True"],
            noteAmber: "NEET 2021: the recognition sequence is a palindromic nucleotide sequence, not an Okazaki or poly(A) sequence.",
            pyqExampleId: "a4324911-a9a7-43db-87d3-cd537126c4c6",
          },
          {
            cells: ["Hind II recognises a sequence of six base pairs", "True"],
            noteAmber: "NEET 2024: six base pairs, not 4, 8 or 10.",
            pyqExampleId: "53785ba8-fc93-4a88-9a77-71262584cf4e",
          },
          { cells: ["EcoRI cuts GAATTC between G and A, leaving sticky ends", "True"] },
          {
            cells: ["Restriction enzymes cut only at the exact centre of the palindrome", "False: a little away from the centre"],
            noteAmber: "NEET 2026: cutting only at the centre, and removing nucleotides from the ends, were the two false statements.",
            pyqExampleId: "c3aeadca-7906-402e-9015-2a98226b0730",
          },
          { cells: ["Restriction endonucleases remove nucleotides from the ends of DNA", "False: that is an exonuclease"] },
          { cells: ["Restriction enzymes restrict the growth of bacteriophage in Escherichia coli", "True"] },
          {
            cells: ["Vector and source DNA are cut with the same enzyme", "True: Hind II with Hind II, never two different enzymes"],
            noteAmber: "Re-NEET 2024: vector and source DNA are both cut with Hind II.",
            pyqExampleId: "910c9338-943d-47f9-9a6a-b11b9671fec3",
          },
        ],
      },
      pyqExampleId: "8de21fbe-087b-4158-83ff-842491bd4916",
      selfCheckExample: {
        prompt: "Is 5'-GATATC-3' paired with 3'-CTATAG-5' a palindrome in the sense NCERT uses? Explain how you check.",
        steps: [
          "Read the top strand from its 5' end: GATATC.",
          "Read the bottom strand from its own 5' end, which is on the right: CTATAG backwards gives GATATC.",
          "Both strands read GATATC from 5' to 3', so the two readings match.",
        ],
        answer: "Yes. Read 5' to 3' on each strand, both give GATATC, so it is a palindrome.",
      },
      practiceSet: [
        { prompt: "In the name EcoRI, what does the letter R stand for?", answer: "The strain of Escherichia coli (RY 13) from which it was isolated" },
        { prompt: "What does the Roman numeral in a restriction enzyme name show?", answer: "The order in which the enzyme was isolated from that strain" },
        { prompt: "Which kind of nuclease removes nucleotides from the ends of a DNA molecule?", answer: "An exonuclease" },
        { prompt: "Why are the overhanging single strands left by a restriction enzyme called sticky ends?", answer: "They form hydrogen bonds with their complementary cut counterparts" },
        { prompt: "In which year were the first enzymes restricting bacteriophage growth in Escherichia coli isolated?", answer: "1963" },
      ],
      traps: [
        {
          title: "Restriction enzymes are endonucleases",
          body: "They cut **within** the DNA at a recognition sequence. Removing nucleotides from the **ends** is the work of an **exonuclease**.",
        },
        {
          title: "The cut is off-centre, not at the centre",
          body: "The cut is made **a little away from the centre** of the palindrome, between the **same two bases** on both strands. That off-centre cut is what leaves **sticky ends**.",
        },
        {
          title: "Hind II came five years after 1963",
          body: "The **1963** enzymes were the first restricting phage growth; **Hind II**, the first restriction endonuclease whose action depended on a specific sequence, was isolated **five years later**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-gel",
      name: "Gel electrophoresis, staining and elution",
      visualizationSlug: "imat-gel-electrophoresis",
      intuition:
        "Cut DNA is a mixture of pieces of many lengths. DNA carries a negative charge, so in an electric field all the pieces move towards the positive end. The agarose gel is like a crowded forest: small pieces slip through quickly and go far, big pieces get held back near the wells. You cannot see DNA, so you stain it and shine UV light on it.",
      definition:
        "Gel electrophoresis in NCERT:\n" +
        "- Cutting DNA with restriction endonucleases gives **fragments**. Gel electrophoresis **separates** them.\n" +
        "- DNA fragments are **negatively charged**, so under an electric field they move towards the **anode** (positive electrode) through a matrix.\n" +
        "- The most commonly used matrix is **agarose**, a natural polymer extracted from **sea weeds**.\n" +
        "- The fragments separate (resolve) by **size** through the **sieving effect** of the gel: the **smaller** the fragment, the **farther** it moves. Large fragments stay near the **wells**.\n" +
        "- Agarose gel electrophoresis is also used to **check the progress** of a restriction digestion.\n\n" +
        "Seeing and recovering the DNA:\n" +
        "- Pure DNA **cannot be seen** in visible light or without staining.\n" +
        "- The DNA is stained with **ethidium bromide** and then exposed to **UV radiation**: the bands look **bright orange**.\n" +
        "- The bands are **cut out** of the gel and the DNA is **extracted** from the gel piece. This step is **elution**.\n" +
        "- DNA purified this way is joined with cloning vectors to build **recombinant DNA**.",
      table: {
        columns: ["Point", "The NCERT fact"],
        rows: [
          { cells: ["Charge on DNA", "Negative, so it moves towards the anode"] },
          { cells: ["Matrix", "Agarose, a natural polymer from sea weeds"] },
          {
            cells: ["Basis of separation", "Size, by the sieving effect; small fragments move farthest"],
            noteAmber: "NEET 2025: smaller fragments lie near the anode and larger ones near the wells.",
            pyqExampleId: "5a7524fe-090d-4a84-b658-67f7790726d4",
          },
          { cells: ["Stain", "Ethidium bromide"] },
          {
            cells: ["How bands are seen", "Bright orange, after staining and exposure to UV light"],
            noteAmber: "NEET 2023: ethidium bromide stained DNA shows bright orange under UV light.",
            pyqExampleId: "e79b0056-d999-44a0-8be3-feea82a5a8ca",
          },
          {
            cells: ["Elution", "Cutting the band out and extracting the DNA from the gel piece"],
            noteAmber: "NEET 2022: a chromogenic substrate gives blue colonies, never blue DNA bands on a gel.",
            pyqExampleId: "b57ea4d4-91a9-43d5-8a48-b646702d5a2e",
          },
          {
            cells: ["Use of eluted DNA", "Joined with cloning vectors to build recombinant DNA"],
            noteAmber: "NEET 2026: DNA is cut by molecular scissors and fragments separate by size; they are never seen without a stain or in visible light.",
            pyqExampleId: "7d281a50-e081-4dbc-87cf-255f1a6da85c",
          },
        ],
      },
      pyqExampleId: "4bbf5592-f6d8-44bf-9f99-2a2d3ef5296e",
      selfCheckExample: {
        prompt: "A digest gives three DNA fragments of 500, 2,000 and 8,000 base pairs. After electrophoresis, which lies nearest the wells and which nearest the anode?",
        steps: [
          "Agarose sieves the fragments by size, and smaller ones move farther towards the anode.",
          "So the 500 bp piece moves farthest and the 8,000 bp piece moves least.",
        ],
        answer: "The 8,000 bp fragment stays nearest the wells; the 500 bp fragment lies nearest the anode.",
      },
      practiceSet: [
        { prompt: "What is agarose, the matrix used in gel electrophoresis, extracted from?", answer: "Sea weeds" },
        { prompt: "Towards which electrode does DNA move in gel electrophoresis, and why?", answer: "Towards the anode, because DNA is negatively charged" },
        { prompt: "What is the step of cutting a DNA band out of the gel and extracting the DNA called?", answer: "Elution" },
        { prompt: "Which compound is used to stain DNA in an agarose gel?", answer: "Ethidium bromide" },
        { prompt: "Besides separating fragments for cloning, what else is agarose gel electrophoresis used to check?", answer: "The progress of a restriction enzyme digestion" },
      ],
      traps: [
        {
          title: "DNA is never seen without a stain",
          body: "Separated DNA can be seen **only after staining with ethidium bromide and exposure to UV light**. A statement that it can be seen directly under UV, or in visible light, is false.",
        },
        {
          title: "The bands are orange, the colonies are blue",
          body: "Ethidium bromide bands are **bright orange** under UV. **Blue** belongs to bacterial **colonies** on a chromogenic substrate, not to DNA bands on a gel.",
        },
        {
          title: "Small fragments travel farthest",
          body: "The **smaller** the fragment, the **farther** it moves towards the **anode**. The largest fragments stay near the **wells**.",
        },
      ],
    },
  ],
};
