import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 9 Biotechnology: Principles and Processes.
 * Definitions, enzymes, vectors and steps checked against the NCERT text (the
 * book's own wording, trimmed); most-asked years and marks from the CBSE
 * board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Biotechnology: Principles and Processes",
  chapterSlug: "biotechnology-principles-and-processes",
  source: "NCERT Biology (CBSE Class 12), Chapter 9",
  keyPoints: [
    {
      term: "Two core techniques of biotechnology",
      text: "**Genetic engineering:** techniques to alter the chemistry of genetic material (DNA and RNA), to introduce these into host organisms and thus change the phenotype of the host. **Bioprocess engineering:** maintenance of a **sterile** (microbial contamination-free) ambience so that only the desired microbe or eukaryotic cell grows in large quantities, to make antibiotics, vaccines, enzymes, etc.",
    },
    {
      term: "Origin of replication and the three basic steps",
      text: "An alien DNA multiplies only when linked to the **origin of replication (ori)**, the sequence that initiates replication. Three basic steps in genetically modifying an organism: (i) **identification of DNA** with desirable genes; (ii) **introduction** of the identified DNA into the host; (iii) **maintenance** of the introduced DNA in the host and its transfer to the progeny.",
    },
    {
      term: "First recombinant DNA",
      text: "Made in **1972** by **Stanley Cohen and Herbert Boyer**: an **antibiotic resistance gene** cut from a plasmid was linked with the **native plasmid of *Salmonella typhimurium*** using **DNA ligase**. Transferred into ***Escherichia coli***, it replicated using the host's DNA polymerase: cloning of the antibiotic resistance gene in *E. coli*.",
    },
    {
      term: "Restriction enzymes and their naming",
      text: "In 1963 two enzymes restricting phage growth in *E. coli* were isolated: one methylated DNA, the other cut it (**restriction endonuclease**). The first, **Hind II**, always cut at a specific six base pair recognition sequence. Naming: first letter from the **genus**, next two from the **species**; **EcoRI** comes from *Escherichia coli* RY 13: **R** from the **strain**, Roman **I** the order of isolation.",
    },
    {
      term: "Exonucleases and endonucleases",
      text: "Restriction enzymes belong to the **nucleases**. **Exonucleases** remove nucleotides from the **ends** of the DNA; **endonucleases** make cuts at **specific positions within** the DNA. A restriction endonuclease inspects the DNA, binds at its recognition sequence and cuts each of the two strands at specific points in their **sugar-phosphate backbones**.",
    },
    {
      term: "Palindromes and sticky ends",
      text: "A DNA **palindrome** is a sequence of base pairs that **reads the same on the two strands** when the orientation of reading is kept the same: 5' GAATTC 3' / 3' CTTAAG 5' (EcoRI). Cuts a little away from the centre, between the same two bases on both strands, leave overhanging **sticky ends**, which form **hydrogen bonds** with complementary cut ends; **DNA ligase** then joins them.",
    },
    {
      term: "Gel electrophoresis",
      text: "DNA fragments are **negatively charged**, so they move **towards the anode** through a matrix, usually **agarose** (a natural polymer from sea weeds). They separate by **size** through the **sieving effect**: the **smaller the fragment, the farther it moves**. Stained with **ethidium bromide** and exposed to **UV**, bands look bright orange. Cutting out bands and extracting the DNA is **elution**.",
    },
    {
      term: "Features of a cloning vector",
      text: "**Ori:** where replication starts; also **controls the copy number**. **Selectable marker:** identifies and eliminates non-transformants (genes for resistance to ampicillin, chloramphenicol, tetracycline or kanamycin). **Cloning sites:** very few, preferably **single**, recognition sites for common restriction enzymes; more sites give several fragments, complicating cloning.",
    },
    {
      term: "Insertional inactivation",
      text: "Alien DNA ligated at the **BamH I site of tetR** in pBR322: recombinants **grow on ampicillin but not on tetracycline**; non-recombinants grow on both. Easier: insert the DNA within the coding sequence of **\\(\\beta\\)-galactosidase**. With a **chromogenic substrate**, colonies **without an insert give blue colour**; **recombinant colonies give no colour**.",
    },
    {
      term: "Vectors for plants and animals",
      text: "***Agrobacterium tumifaciens***, a pathogen of several **dicot** plants, delivers **T-DNA** that turns normal plant cells into a tumour. Its **tumour inducing (Ti) plasmid** has been modified into a cloning vector that is **no more pathogenic** but still delivers genes of interest. Likewise **retroviruses**, which make animal cells cancerous, are **disarmed** to deliver genes into animal cells.",
    },
    {
      term: "Competent host and other transfer methods",
      text: "**DNA is hydrophilic**, so it cannot pass through cell membranes. Bacteria are made **competent** with a divalent cation (**calcium**), then incubated with rDNA **on ice, heat shocked briefly at 42 °C, and put back on ice**. **Micro-injection:** rDNA put into the **nucleus of an animal cell**. **Biolistics (gene gun):** plant cells shot with DNA-coated **gold or tungsten** particles. **Disarmed pathogen** vectors.",
    },
    {
      term: "Isolation of DNA",
      text: "Break cells with **lysozyme (bacteria), cellulase (plant cells), chitinase (fungus)**. Remove RNA with **ribonuclease** and proteins with **protease**. Purified DNA **precipitates on adding chilled ethanol**, seen as fine threads that can be removed by **spooling**.",
    },
    {
      term: "Polymerase chain reaction (PCR)",
      text: "Multiple copies of the gene of interest made **in vitro** with **two sets of primers** (small chemically synthesised oligonucleotides complementary to regions of the DNA) and **DNA polymerase**. Each cycle: **denaturation, primer annealing, extension**. A **thermostable DNA polymerase** from ***Thermus aquaticus*** (Taq) stays active at the high denaturing temperature; DNA is amplified about **a billion times**.",
    },
    {
      term: "Bioreactors and downstream processing",
      text: "Vessels where large volumes (**100 to 1000 litres**) of culture convert raw materials into products under **optimum growth conditions** (temperature, pH, substrate, salts, vitamins, oxygen). The commonest are **stirred-tank**. **Downstream processing:** separation and purification of the product, its formulation with **preservatives**, clinical trials (for drugs) and strict **quality control**.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the amplification of a gene of interest by PCR",
      steps: [
        "Mix the template DNA, two sets of primers, the nucleotides (dNTPs) and thermostable Taq DNA polymerase.",
        "**Denaturation:** high temperature separates the two strands of the DNA.",
        "**Primer annealing:** on cooling, the two primers bind to their complementary regions on the single strands.",
        "**Extension:** Taq DNA polymerase (from *Thermus aquaticus*) extends the primers using the nucleotides and the DNA as template.",
        "Repeating the cycle doubles the DNA each time (\\(2^n\\) copies after n cycles), about a billion copies in all; the product can be ligated into a vector.",
      ],
    },
    {
      title: "Show the formation of recombinant DNA by EcoRI (illustration)",
      steps: [
        "EcoRI recognises the palindrome 5' GAATTC 3' / 3' CTTAAG 5' in both the vector DNA and the foreign DNA.",
        "It cuts each strand **between G and A**, leaving complementary single-stranded **sticky ends** (AATT overhangs).",
        "The sticky ends of foreign DNA and vector pair by hydrogen bonds; **DNA ligase** seals them.",
        "The result is a recombinant DNA, which is then transferred into a competent host.",
      ],
    },
    {
      title: "Describe the separation and isolation of DNA fragments by agarose gel electrophoresis",
      steps: [
        "Load the digested DNA in wells at the **cathode** end of an agarose gel and apply an electric field.",
        "Negatively charged DNA moves towards the **anode**; the sieving effect separates it by size, small fragments farthest.",
        "Stain with **ethidium bromide** and expose to **UV**: the DNA shows as orange bands.",
        "Cut out the bands and extract the DNA (**elution**); use the purified fragments to make recombinant DNA.",
      ],
    },
  ],
  diagrams: [
    {
      title: "E. coli cloning vector pBR322 (Figure 9.4)",
      labels: ["ori", "rop", "ampR with Pst I and Pvu I sites", "tetR with BamH I and Sal I sites", "EcoR I, Cla I and Hind III sites", "Pvu II site"],
    },
    {
      title: "Formation of recombinant DNA by EcoRI (Figure 9.1)",
      labels: ["vector DNA and foreign DNA", "EcoRI cut between G and A", "sticky ends", "DNA ligase", "recombinant DNA"],
    },
    {
      title: "Agarose gel electrophoresis (Figure 9.3)",
      labels: ["wells at the cathode end", "anode", "lane 1: undigested DNA", "lanes 2 to 4: digested fragments", "small fragments farther"],
    },
    {
      title: "Polymerase chain reaction (Figure 9.6)",
      labels: ["region to be amplified", "denaturation", "primers and annealing", "extension by thermostable DNA polymerase", "copies after each cycle"],
    },
    {
      title: "Simple and sparged stirred-tank bioreactors (Figure 9.7)",
      labels: ["motor and flat bladed impeller (agitator)", "foam breaker", "sterile air through sparger", "acid or base for pH control", "steam for sterilisation", "culture broth and sampling port"],
    },
  ],
  mostAsked: [
    {
      topic: "Restriction enzymes: naming convention (EcoRI), palindromes, sticky ends, exonuclease versus endonuclease, forming recombinant DNA",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Principles and steps of rDNA technology, isolation of DNA (lysozyme, cellulase, chitinase) and the first rDNA of Cohen and Boyer",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Competent host and gene transfer: calcium and heat shock, microinjection, biolistics (gene gun), disarmed pathogens (Ti plasmid, retroviruses)",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Plasmids as vectors, selectable markers and insertional inactivation (antibiotic resistance and beta-galactosidase)",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "PCR: primers, Taq polymerase (Thermus aquaticus), denaturation, annealing and extension, copies made",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "E. coli cloning vector pBR322: draw and label ori, rop, ampR, tetR and the restriction sites",
      marks: 1,
      years: [2026, 2025, 2024, 2022],
    },
    {
      topic: "Gel electrophoresis: separation of DNA fragments, agarose, ethidium bromide, elution",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Bioreactors (simple and sparged stirred-tank) and downstream processing",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
  ],
  mistakes: [
    {
      title: "Misreading the name EcoRI",
      body: "**E** = genus *Escherichia*, **co** = species *coli*, **R** = strain RY 13 (not \"restriction\"), **I** = first enzyme isolated from that strain.",
    },
    {
      title: "Wrong electrode or wrong order of fragments",
      body: "DNA is negatively charged and moves to the **anode (+)**; it is loaded at the cathode end. The **smallest** fragments move **farthest**. DNA is invisible until stained with ethidium bromide and seen in UV light.",
    },
    {
      title: "Blue and colourless colonies swapped",
      body: "In \\(\\beta\\)-galactosidase insertional inactivation, **blue** colonies have **no insert**; **colourless** colonies are the **recombinants**. With tetR inactivated, recombinants grow on ampicillin but **not** on tetracycline.",
    },
    {
      title: "Different enzymes for vector and source DNA",
      body: "Cut the vector and the source DNA with the **same** restriction enzyme, so both have the same sticky ends; DNA ligase joins them by **phosphodiester** bonds (not glycosidic bonds).",
    },
    {
      title: "Wrong enzyme to break the cell",
      body: "**Lysozyme** for bacteria, **cellulase** for plant cells, **chitinase** for fungi. Ribonuclease removes RNA, protease removes protein; **chilled ethanol** precipitates the DNA.",
    },
    {
      title: "Agrobacterium host and ori role",
      body: "*Agrobacterium tumifaciens* infects **dicot** plants. **Ori** controls the **copy number**; **rop** codes for proteins involved in **replication of the plasmid**.",
    },
  ],
};

export default sheet;
