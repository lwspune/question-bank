import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BP_VECTORS_NOTE: SubtopicNote = {
  subtopicName: "Cloning Vectors and Competent Hosts",
  title: "Cloning Vectors and Competent Hosts",
  oneLineDefinition:
    "What a cloning vector needs (ori, a selectable marker, a single cloning site), the map of pBR322, selecting recombinants by insertional inactivation and blue and white colonies, vectors for plants and animals, and how a host is made to take up DNA.",
  whyItMatters:
    "Fourteen NEET questions from 2021 to 2026, and every one of the eight papers asked at least one. Four are about pBR322: which genes carry the BamHI, SalI, PstI and PvuI sites, and which resistance is lost when DNA goes in. NEET 2025 asked the blue and white colony test twice, and Re-NEET 2026 matched transformation, cloning site, selection and ori with their roles.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzobp-vector-features",
      name: "Features a cloning vector needs",
      intuition:
        "A vector is a delivery van for a gene. It needs an engine that the host will run, so it gets copied (the ori). It needs a badge that lets you pick out the bacteria that took it up (a selectable marker). And it needs one clear door where the gene can go in (a single cloning site). Too many doors and the van falls apart into pieces.",
      definition:
        "Plasmids and bacteriophages as vectors:\n" +
        "- Both can replicate within bacterial cells **independent of the control of chromosomal DNA**.\n" +
        "- Bacteriophages have **very high copy numbers** in the bacterial cell. Some plasmids have **only one or two copies** per cell, others **15 to 100**.\n" +
        "- Natural vectors have been changed so that a foreign DNA is easy to link and the **recombinants** are easy to pick out from the **non-recombinants**.\n\n" +
        "Features a cloning vector needs:\n" +
        "- **Origin of replication (ori):** the sequence where replication starts. Any DNA linked to it can be made to replicate in the host. It also **controls the copy number** of the linked DNA, so for many copies choose a vector whose ori supports a **high copy number**.\n" +
        "- **Selectable marker:** helps identify and eliminate **non-transformants** and lets only the **transformants** grow. **Transformation** is the procedure by which a piece of DNA is introduced into a host bacterium. Genes for resistance to **ampicillin, chloramphenicol, tetracycline or kanamycin** are useful markers for *Escherichia coli*; normal *E. coli* cells resist none of these.\n" +
        "- **Cloning sites:** the vector needs **very few, preferably single**, recognition sites for the commonly used restriction enzymes. **More than one** site would cut the vector into several fragments and complicate the cloning.\n\n" +
        "Other DNA tools that are not plasmid vectors: **BAC** (bacterial artificial chromosome) and **YAC** (yeast artificial chromosome) are vectors too, used in the Human Genome Project. A **probe** is a single-stranded DNA or RNA tagged with a radioactive molecule, used to find a matching sequence; it is **not** a vector.",
      table: {
        columns: ["Term", "Meaning or role"],
        rows: [
          {
            cells: ["Ori", "Starts replication; controls the copy number of the linked DNA"],
            noteAmber: "Re-NEET 2024: the chromosome's sequence that initiates replication is the ori site.",
            pyqExampleId: "273e6363-6074-4f2e-aeba-1f61f8a7e52e",
          },
          {
            cells: ["Transformation", "Introducing a piece of DNA into a host bacterium"],
            noteAmber: "Re-NEET 2026: transformation, cloning site, selection and ori were matched with DNA transfer to the host, restriction enzyme, antibiotic and replication.",
            pyqExampleId: "6d8bcbbb-ab6e-4552-81aa-e590f112dba5",
          },
          { cells: ["Selectable marker", "Lets only transformants grow, as an antibiotic resistance gene does"] },
          { cells: ["Cloning site", "A recognition site for a restriction enzyme; very few, preferably one"] },
          {
            cells: ["Plasmid", "Autonomously replicating, circular, extra-chromosomal DNA"],
            noteAmber: "Re-NEET 2026: plasmids are autonomously replicating and extra-chromosomal; both statements were correct.",
            pyqExampleId: "420de144-1bfd-49bf-9780-4004741a0f2f",
          },
          {
            cells: ["BAC, YAC, pBR322", "All cloning vectors"],
            noteAmber: "NEET 2023: a probe was the one item that is not a cloning vector.",
            pyqExampleId: "0cdb3b81-eab1-4b84-a168-b9872db0805c",
          },
        ],
      },
      pyqExampleId: "c2ae558e-e383-43d6-bc99-ca06f1d967f9",
      selfCheckExample: {
        prompt: "You want to recover a very large number of copies of a target gene. What property of the vector's ori should you look for, and why?",
        steps: [
          "The ori is where replication starts in the vector.",
          "It also controls the copy number of the DNA linked to it.",
        ],
        answer: "An ori that supports a high copy number, because the ori controls how many copies of the linked DNA are made.",
      },
      practiceSet: [
        { prompt: "Name four antibiotic resistance genes that are useful selectable markers for Escherichia coli.", answer: "Resistance to ampicillin, chloramphenicol, tetracycline and kanamycin" },
        { prompt: "How many copies per cell can some plasmids have, at the high end?", answer: "15 to 100 copies per cell" },
        { prompt: "Which kind of vector has a very high copy number within a bacterial cell?", answer: "Bacteriophages" },
        { prompt: "What is a probe?", answer: "A single-stranded DNA or RNA tagged with a radioactive molecule, used to find a complementary sequence" },
      ],
      traps: [
        {
          title: "One cloning site, not several",
          body: "A good vector has **very few, preferably single**, recognition sites for a commonly used enzyme. **Two or more** sites would cut the vector into several pieces.",
        },
        {
          title: "Normal Escherichia coli resists no marker antibiotic",
          body: "Antibiotic genes work as markers **because** normal *E. coli* cells carry **no** resistance to ampicillin, chloramphenicol, tetracycline or kanamycin.",
        },
        {
          title: "A probe is not a vector",
          body: "**BAC, YAC and pBR322** are vectors. A **probe** is a labelled single strand used for detection; it carries no gene into a host.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-pbr322",
      name: "pBR322 and insertional inactivation of antibiotic genes",
      intuition:
        "pBR322 carries two resistance genes, one for ampicillin and one for tetracycline. Put your gene inside one of them and that gene breaks. So a recombinant plasmid still gives resistance to one drug but has lost resistance to the other. That loss is the tag that tells you the gene went in.",
      definition:
        "The *E. coli* cloning vector **pBR322** (NCERT's figure):\n" +
        "- Two antibiotic resistance genes: \\(\\text{amp}^R\\) (ampicillin) and \\(\\text{tet}^R\\) (tetracycline).\n" +
        "- **ori**, and **rop**, which codes for the **proteins involved in the replication of the plasmid**.\n" +
        "- Restriction sites on the map include **Hind III, EcoRI, BamHI, SalI, PvuII, PstI, PvuI** and **ClaI**.\n" +
        "- **BamHI and SalI** lie inside the \\(\\text{tet}^R\\) gene. **PstI and PvuI** lie inside the \\(\\text{amp}^R\\) gene.\n\n" +
        "Selecting recombinants by antibiotic resistance:\n" +
        "- Ligate foreign DNA at the **BamHI** site of the \\(\\text{tet}^R\\) gene. The recombinant plasmid **loses tetracycline resistance**, because the insert breaks the gene. This is **insertional inactivation**.\n" +
        "- Plate the transformants on **ampicillin**: both recombinants and non-recombinants grow, so all transformants are kept.\n" +
        "- Move them to **tetracycline**: **recombinants do not grow**; non-recombinants grow on both antibiotics.\n" +
        "- In the same way, an insert at the **PstI** site breaks \\(\\text{amp}^R\\), and the host can no longer resist ampicillin.\n" +
        "- This method is **cumbersome**, because it needs plating on two plates with different antibiotics.",
      table: {
        columns: ["Part of pBR322", "Where or what", "Effect of an insert there"],
        rows: [
          {
            cells: ["BamHI and SalI sites", "Inside \\(\\text{tet}^R\\)", "Tetracycline resistance is lost; ampicillin resistance stays"],
            noteAmber: "NEET 2026: an insert at the BamHI site loses resistance to tetracycline.",
            pyqExampleId: "4ad8035c-12c7-44b9-9edd-27391b90d3e5",
          },
          {
            cells: ["PstI and PvuI sites", "Inside \\(\\text{amp}^R\\)", "Ampicillin resistance is lost; tetracycline resistance stays"],
            noteAmber: "NEET 2021: a gene inserted at the PstI site leaves the host unable to resist ampicillin.",
            pyqExampleId: "9cbeb9c1-da4b-48bd-83a7-5312fff09dd5",
          },
          {
            cells: ["ori", "Origin of replication", "Controls the copy number of the linked DNA"],
            noteAmber: "NEET 2024: on the pBR322 map, ori controls copy number and rop codes for proteins of plasmid replication.",
            pyqExampleId: "c5b9a45b-d9b3-4578-b0aa-d5775d03c611",
          },
          { cells: ["rop", "A gene", "Codes for proteins involved in the replication of the plasmid"] },
        ],
      },
      pyqExampleId: "510eb117-67d6-4d74-9269-e322a4c5ea2b",
      selfCheckExample: {
        prompt: "A gene is ligated into pBR322 at the PvuI site and put into Escherichia coli. On which antibiotic will the recombinant cells grow, and on which will they fail?",
        steps: [
          "PvuI lies inside the ampicillin resistance gene.",
          "The insert breaks that gene, so ampicillin resistance is lost.",
          "The tetracycline resistance gene is untouched.",
        ],
        answer: "They grow on tetracycline but fail on ampicillin.",
      },
      practiceSet: [
        { prompt: "What does the rop gene of pBR322 code for?", answer: "Proteins involved in the replication of the plasmid" },
        { prompt: "What is the loss of a gene's function because foreign DNA is put inside it called?", answer: "Insertional inactivation" },
        { prompt: "Foreign DNA is put at the BamHI site of pBR322. Which antibiotic plate is used first to keep all transformants?", answer: "Ampicillin" },
        { prompt: "Why is selecting recombinants by loss of antibiotic resistance called cumbersome?", answer: "It needs plating on two plates with different antibiotics" },
      ],
      traps: [
        {
          title: "BamHI and SalI are in the tetracycline gene",
          body: "In pBR322, **BamHI and SalI** sit inside \\(\\text{tet}^R\\); **PstI and PvuI** sit inside \\(\\text{amp}^R\\). Swapping the pairs is the usual distractor.",
        },
        {
          title: "Ori controls copy number, rop helps replication",
          body: "It is the **ori** that controls the **copy number** of the linked DNA. **rop** codes for the **proteins** involved in plasmid replication.",
        },
        {
          title: "Recombinants lose the drug whose gene was broken",
          body: "An insert breaks only **the gene it lands in**. A recombinant with an insert in \\(\\text{tet}^R\\) still grows on **ampicillin** but not on **tetracycline**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-blue-white",
      name: "Blue and white colonies",
      intuition:
        "Checking two antibiotic plates is slow, so a colour test was invented. The vector's gene for an enzyme turns a colourless substrate blue. If your gene has gone inside that enzyme gene, the enzyme is broken and the colony stays white. White means success.",
      definition:
        "The chromogenic (colour) method:\n" +
        "- It was developed because selection by antibiotic inactivation needs two plates. These markers tell recombinants from non-recombinants by their **ability to produce colour** with a **chromogenic substrate**.\n" +
        "- The recombinant DNA is inserted **within the coding sequence of the enzyme β-galactosidase**. This inactivates the gene: **insertional inactivation**.\n" +
        "- Plasmid **without an insert**: the enzyme works and the colonies are **blue**. These are **non-recombinants**.\n" +
        "- Plasmid **with an insert**: the enzyme gene is inactivated and the colonies give **no colour**. These are the **recombinant** colonies, so you pick the **white** ones.",
      table: {
        columns: ["Colony", "β-galactosidase gene", "What it is"],
        rows: [
          { cells: ["Blue", "Working, no insert", "Non-recombinant"] },
          {
            cells: ["White (no colour)", "Inactivated by the insert", "Recombinant: the one to select"],
            noteAmber: "NEET 2025: with DNA inserted at the EcoRI site inside the β-galactosidase gene, the white colonies are selected.",
            pyqExampleId: "b2a33330-2900-473c-aa42-68f8e24cb6d7",
          },
        ],
      },
      pyqExampleId: "b95653ea-c9c2-4170-ae50-da2b24be880e",
      selfCheckExample: {
        prompt: "In the blue and white test, what is the substance added to the plate that the enzyme turns blue called, and which enzyme acts on it?",
        steps: [
          "The test tells colonies apart by their ability to produce colour.",
          "The colour comes from a chromogenic substrate acted on by the vector's enzyme.",
        ],
        answer: "A chromogenic substrate, acted on by β-galactosidase.",
      },
      practiceSet: [
        { prompt: "Inside the coding sequence of which enzyme is the DNA inserted in the colour method of selecting recombinants?", answer: "β-galactosidase" },
        { prompt: "Why were colour-based selectable markers developed?", answer: "Selection by inactivation of antibiotic genes is cumbersome, needing two plates with different antibiotics" },
        { prompt: "A colony on a chromogenic substrate plate turns blue. Does its plasmid carry an insert?", answer: "No: blue means a working β-galactosidase gene, so it is a non-recombinant" },
      ],
      traps: [
        {
          title: "White colonies are the recombinants",
          body: "A **blue** colony has a working β-galactosidase gene and **no insert**. The **colourless (white)** colonies carry the insert and are the **recombinants**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzobp-hosts",
      name: "Vectors for plants and animals, and competent hosts",
      intuition:
        "Some pathogens are natural genetic engineers: a soil bacterium pushes its own DNA into plant cells, and some viruses do the same to animal cells. Scientists took away their harmful genes and kept the delivery system. For bacteria, the trick is to make their walls let DNA in, with calcium and a quick heat shock. Plant cells can even be shot with DNA-coated metal particles.",
      definition:
        "Vectors for cloning genes in plants and animals:\n" +
        "- *Agrobacterium tumefaciens*, a pathogen of several **dicot plants**, delivers a piece of DNA called **T-DNA** that turns normal plant cells into a **tumour** and makes them produce the chemicals the pathogen needs.\n" +
        "- Its **tumour inducing (Ti) plasmid** has been modified into a cloning vector that is **no more pathogenic** but still delivers genes of interest into many plants.\n" +
        "- **Retroviruses** in animals can turn normal cells into cancerous cells. They have been **disarmed** and are used to deliver desirable genes into **animal cells**.\n\n" +
        "Making a host take up DNA (competent host):\n" +
        "- DNA is **hydrophilic**, so it cannot pass through cell membranes.\n" +
        "- Bacteria are made **competent** by treating them with a specific concentration of a **divalent cation such as calcium**, which helps DNA enter through **pores in the cell wall**.\n" +
        "- The cells are incubated with recombinant DNA **on ice**, then placed briefly at **42°C (heat shock)**, then put back **on ice**.\n" +
        "- **Micro-injection:** recombinant DNA is injected directly into the **nucleus of an animal cell**.\n" +
        "- **Biolistics (gene gun):** suitable for **plants**; cells are bombarded with high-velocity **micro-particles of gold or tungsten** coated with DNA.\n" +
        "- **Disarmed pathogen** vectors infect the cell and transfer the recombinant DNA into it.",
      table: {
        columns: ["Method or tool", "Used for", "Key fact"],
        rows: [
          {
            cells: ["Ti plasmid of Agrobacterium tumefaciens", "Plant cells", "Ti means tumour inducing; made non-pathogenic as a vector"],
            noteAmber: "NEET 2024: Ti plasmid stands for tumour inducing plasmid.",
            pyqExampleId: "071f913e-f297-4046-9303-0e86adaab2cb",
          },
          { cells: ["Disarmed retrovirus", "Animal cells", "Can no longer cause cancer but still delivers the gene"] },
          { cells: ["Calcium treatment and heat shock", "Bacteria", "Ice, then 42°C briefly, then ice again"] },
          { cells: ["Micro-injection", "Animal cells", "DNA injected straight into the nucleus"] },
          { cells: ["Biolistics (gene gun)", "Plant cells", "Micro-particles of gold or tungsten coated with DNA"] },
          {
            cells: ["Thermus aquaticus and Escherichia coli", "Source of tools", "Taq polymerase comes from Thermus aquaticus; pBR322 is an Escherichia coli vector"],
            noteAmber: "NEET 2026: GMO with Bt cotton, thermostable DNA polymerase with Thermus aquaticus, Ti plasmid with Agrobacterium tumefaciens, pBR322 with Escherichia coli.",
            pyqExampleId: "bc9c7d10-23d0-429e-8c7f-94908b4e44eb",
          },
        ],
      },
      pyqExampleId: "55cc1d77-f64b-4552-962c-a52c4e26d754",
      selfCheckExample: {
        prompt: "Why can recombinant DNA not simply diffuse into a bacterial cell, and what treatment is used to get it in?",
        steps: [
          "DNA is a hydrophilic molecule, so it cannot pass through the cell membrane.",
          "The cells are made competent with a divalent cation such as calcium, then given a heat shock.",
        ],
        answer: "DNA is hydrophilic and cannot cross membranes; calcium treatment, then incubation on ice, a brief 42°C heat shock and ice again, lets it in.",
      },
      practiceSet: [
        { prompt: "At what temperature is the heat shock given when bacteria take up recombinant DNA?", answer: "42°C" },
        { prompt: "Into which part of an animal cell is recombinant DNA put by micro-injection?", answer: "The nucleus" },
        { prompt: "What does Agrobacterium tumefaciens deliver into plant cells to turn them into a tumour?", answer: "A piece of DNA called T-DNA" },
        { prompt: "Which vectors are used to deliver desirable genes into animal cells?", answer: "Disarmed retroviruses" },
      ],
      traps: [
        {
          title: "Gene gun particles are gold or tungsten",
          body: "Biolistics bombards **plant** cells with micro-particles of **gold or tungsten**, not platinum, silver or zinc.",
        },
        {
          title: "Calcium makes bacteria competent",
          body: "Competence comes from a **divalent cation such as calcium**, followed by a **heat shock at 42°C** between two spells on ice.",
        },
        {
          title: "Ti is tumour inducing",
          body: "The **Ti** in Ti plasmid means **tumour inducing**. As a vector it has been made **non-pathogenic**, yet it still delivers genes into plants.",
        },
      ],
    },
  ],
};
