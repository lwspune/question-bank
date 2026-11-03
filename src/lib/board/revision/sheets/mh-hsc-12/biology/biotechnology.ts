import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 12 Biotechnology. Definitions and examples checked
 * against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the 17 board past-paper questions in the bank,
 * 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Biotechnology",
  chapterSlug: "biotechnology",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 12",
  keyPoints: [
    {
      term: "Genetic engineering",
      text: "The manipulation of genetic material towards a desired end, in a directed and predetermined way, using an in vitro process: repairing or replacing defective genes, making new genes, or transferring genes into a new organism. In gene cloning a gene is carried into a cell by a suitable vector.",
    },
    {
      term: "Restriction enzymes",
      text: "Restriction endonucleases are the **molecular scissors** that recognise and cut DNA at specific sequences (recognition sites). Bacteria use them to destroy viral DNA, restricting the virus; they protect their own DNA by methylating it. Discovered by Smith, Nathans and Arber (Nobel Prize 1978).",
    },
    {
      term: "Recognition sequence and palindrome",
      text: "Recognition sequences are **4 to 8 nucleotides** long, with internal symmetry: a **palindrome**, a sequence that reads the same on both strands in the same direction (EcoRI site 5' GAATTC 3' / 3' CTTAAG 5'). EcoRI cuts between G and A. Cutting straight across gives **blunt ends**; staggered cuts give **sticky (cohesive) ends**.",
    },
    {
      term: "Cloning vector",
      text: "A DNA molecule that carries a foreign DNA segment and replicates inside the host cell: plasmids (pBR322, pUC, Ti plasmid), bacteriophages (lambda, M13), cosmids, BAC, YAC. Plasmids and bacteriophages are the most used; *E. coli* is the usual competent host.",
    },
    {
      term: "Characteristics of a good vector (plasmid)",
      text: "Able to **replicate independently** (has an ori) so many copies of the insert form; easily introduced into host cells; carries **marker genes** for antibiotic resistance; has a **unique cleavage site** for a restriction enzyme in a marker gene; has control elements like promoter, operator, ribosome binding site.",
    },
    {
      term: "Ti plasmid",
      text: "The tumour inducing plasmid of *Agrobacterium tumefaciens*, the soil bacterium causing crown gall. Its T DNA inserts into the plant cell's chromosomes, so a gene placed in it reaches the plant: the main vector for making transgenic plants.",
    },
    {
      term: "Polymerase chain reaction (PCR)",
      text: "In vitro amplification of a desired DNA segment (Kary Mullis, 1985) in a **thermal cycler**: a billion copies in a few hours. It needs the DNA to be copied, the four dNTPs, an excess of two primers, heat stable (Taq) DNA polymerase and \\(\\ce{Mg^{2+}}\\) ions. n cycles give \\(2^n\\) copies.",
    },
    {
      term: "Recombinant human proteins",
      text: "Anaemia: erythropoietin. Asthma: interleukin 1 receptor. Atherosclerosis: platelet derived growth factor. Parturition: **relaxin**. Blood clots: tissue plasminogen activator, urokinase. Diabetes: insulin. Emphysema: **alpha 1 antitrypsin**. Haemophilia A and B: factor VIII and IX. Hepatitis B: hepatitis B vaccine.",
    },
    {
      term: "Gene therapy and its uses",
      text: "Treatment of a disorder by replacing, altering or supplementing a gene that is absent or abnormal. Uses: replace missing or defective genes; speed up destruction of cancer cells or make them revert to normal; deliver genes as a vaccine; impair viral replication; promote or impede tissue growth; heal damaged tissue.",
    },
    {
      term: "Germ line and somatic cell gene therapy",
      text: "**Germ line:** healthy genes put into sperms, eggs or early embryos, so the change passes to the next generation; not encouraged in humans for technical and ethical reasons. **Somatic cell:** genes put only into body cells (bone marrow, liver); not inherited. Used for acquired disorders like **cancer** and **rheumatoid arthritis**, and SCID.",
    },
    {
      term: "Transgenic plants for pests and shelf life",
      text: "**Bt cotton:** *cry* gene of *Bacillus thuringiensis* gives a toxin that paralyses the insect's midgut. **Tobacco:** alpha amylase inhibitor gene (\\(\\alpha\\)AI-Pv) from *Phaseolus vulgaris* works against *Zabrotes subfasciatus* and *Callosobruchus chinensis*. **Flavr Savr tomato:** an antisense gene blocks polygalacturonase, so fruit stays firm (long shelf life).",
    },
    {
      term: "Transgenic plants for nutrition",
      text: "**Golden rice:** provitamin A (phytoene synthase, lycopene cyclase). **Canola:** vitamin E. **Tomato:** **flavonoids** (antioxidants) through the chalcone isomerase transgene. **Rice:** iron, through ferritin genes. Oil content and quality of soybean, oil palm, rapeseed and sunflower improved by **Arabidopsis genes**.",
    },
    {
      term: "Commercial products of transgenic plants",
      text: "A **superglue** from tobacco with mussel adhesive protein genes, for surgery; oil like cod liver oil from a marine algal gene; the antimalarial drug **artemisinin**; stronger painkillers from engineered opium poppy; **edible vaccines** (GM banana against hepatitis B); human growth hormone in tobacco chloroplasts.",
    },
    {
      term: "Transgenic animals",
      text: "Animals whose genome is deliberately modified with foreign DNA. Breeding aims: efficient, better meat; milk quality and quantity; eggs; wool; disease resistance; low cost pharmaceuticals. **Pigs:** faster growth, more meat, bioreactors, organs for xenotransplantation. **Cattle:** more beta and kappa casein in milk; human proteins in milk (Tracy, 1990).",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the steps involved in the PCR technique",
      steps: [
        "Mix the DNA segment, an excess of two primers, the four dNTPs and thermostable DNA polymerase in an eppendorf tube in the thermal cycler.",
        "**Denaturation (90 to 98 °C):** the two strands of the DNA separate.",
        "**Annealing (40 to 60 °C):** on cooling, the primers pair with their complementary sequences on each strand.",
        "**Primer extension (70 to 75 °C):** Taq DNA polymerase adds nucleotides using each single strand as template; one cycle takes 3 to 4 minutes.",
        "Repeat the cycle: each doubles the DNA, so n cycles give \\(2^n\\) copies.",
      ],
    },
    {
      title: "Steps of recombinant DNA technology (gene cloning)",
      steps: [
        "Isolate DNA from the donor and cut it with a restriction enzyme; select the fragment with the desired gene (foreign or passenger DNA).",
        "Cut the vector (e.g. plasmid pBR322) with the **same** restriction enzyme, and join the foreign DNA to it with **DNA ligase**: recombinant (chimeric) DNA.",
        "Transfer the rDNA into a competent host (usually *E. coli*) by transformation, helped by \\(\\ce{Ca^{2+}}\\).",
        "Select transformed cells using the plasmid's marker genes (e.g. ampicillin and tetracycline resistance).",
        "Multiply the transformed cells in fresh medium, express the gene and purify the product by downstream processing.",
      ],
    },
  ],
  diagrams: [
    { title: "Plasmid cloning vector", labels: ["replication origin (ori)", "drug resistance gene (ampʳ)", "polylinker with restriction sites", "region where foreign DNA is inserted"] },
    { title: "DNA replication through polymerase chain reaction", labels: ["denaturation 90 to 98 °C", "annealing of primers 40 to 60 °C", "extension by Taq polymerase 70 to 75 °C", "copies doubling each cycle"] },
    { title: "Mode of action of EcoRI", labels: ["palindrome GAATTC / CTTAAG", "5' and 3' ends", "cut between G and A", "sticky ends"] },
    { title: "Outline of recombinant DNA technology", labels: ["donor cell and vector", "cutting by restriction enzyme", "joining by DNA ligase", "rDNA", "transformation of host bacteria", "protein encoded by insert DNA"] },
  ],
  mostAsked: [
    { topic: "Transgenic plants: transgenes and their uses (Flavr Savr, tomato flavonoids, oil genes, tobacco against Zabrotes, commercial products)", years: [2026, 2025, 2024] },
    { topic: "Tools of rDNA technology: restriction enzymes (molecular scissors, palindromes, recognition sequence) and plasmid vectors", years: [2026, 2025, 2024] },
    { topic: "Gene therapy: its uses, germ line and somatic cell gene therapy", years: [2026, 2025, 2024] },
    { topic: "Recombinant proteins and the disorders they treat", years: [2026, 2025] },
    { topic: "Transgenic animals: breeding objectives and benefits of transgenic pigs and cattle", years: [2026, 2024] },
    { topic: "Explain the steps involved in PCR", years: [2024] },
  ],
  mistakes: [
    {
      title: "Defining a palindrome loosely",
      body: "A DNA palindrome reads the **same on both strands** when each is read in the same direction (5' to 3'). Write the two strands to show it.",
    },
    {
      title: "Germ line and somatic swapped",
      body: "Only **germ line** therapy passes the change to the next generation, which is why it is not encouraged. Somatic cell therapy affects only the patient.",
    },
    {
      title: "Flavr Savr is about shelf life",
      body: "Flavr Savr tomato blocks **polygalacturonase**, so the fruit softens late and keeps longer. It is not for flavonoids; those come from the chalcone isomerase tomato.",
    },
    {
      title: "PCR temperatures out of order",
      body: "Hot (90 to 98 °C) to separate, cool (40 to 60 °C) to anneal primers, warm (70 to 75 °C) to extend. Name each step with its temperature.",
    },
    {
      title: "Different enzymes for gene and vector",
      body: "The vector must be cut with the **same** restriction enzyme as the donor DNA, so the sticky ends match; DNA ligase then joins them.",
    },
  ],
};

export default sheet;
