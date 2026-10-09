import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Biotechnology Applications",
  title: "GM Organisms, Gene Therapy, Stem Cells, Cloning and CRISPR",
  oneLineDefinition:
    "The tools of DNA technology put to use: transgenic microbes, crops and animals, adding working genes to patients, stem cells, clones and precise gene editing.",
  whyItMatters:
    "Two Cambridge papers asked about uses: which combinations of DNA a transgenic organism can carry (2017), and why gene therapy for cystic fibrosis gives only short-term relief (2018). Stem cells, cloning and CRISPR have not been asked yet in this chapter.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mbt-gmo",
      name: "Genetically modified organisms and their products",
      intuition:
        "A gene is a set of instructions written in a code that almost every organism reads the same way. So a gene taken from a bacterium, a jellyfish or a human can be read and turned into the same protein by a plant, a mouse or a yeast. That shared code is what makes transgenic organisms possible.",
      definition:
        "- A **transgenic** (genetically modified) organism contains DNA from another species. Any combination is possible: bacterial genes in plants, plant genes in animals, human genes in bacteria or goats.\n" +
        "- This works because the **genetic code is universal**: the same codons mean the same amino acids in nearly all organisms.\n" +
        "- Bacteria cannot remove introns, so eukaryotic genes go into bacteria as cDNA.\n" +
        "- **Human insulin** was the first medicine made this way (approved in 1982). Before that, diabetics used insulin from pigs and cattle.\n" +
        "- Concerns: genes spreading to wild relatives, pests becoming resistant to built-in toxins, possible allergens, and control of seeds by a few companies. The EU regulates GM crops strictly.",
      table: {
        columns: ["Product or organism", "Gene added", "Host", "Purpose"],
        rows: [
          { cells: ["Human insulin", "Human insulin gene (as cDNA)", "E. coli or yeast", "Treat type 1 diabetes"] },
          { cells: ["Bt cotton, Bt maize", "Toxin gene from the bacterium Bacillus thuringiensis", "Plant, using Agrobacterium", "Kills insect larvae that eat the crop"] },
          { cells: ["Golden Rice", "Genes for making β-carotene", "Rice", "Reduces vitamin A deficiency"] },
          { cells: ["Herbicide-tolerant soya", "A bacterial gene the herbicide cannot block", "Soya", "Weeds can be sprayed without harming the crop"] },
          { cells: ["Hepatitis B vaccine", "Gene for a viral surface protein", "Yeast", "A safe vaccine antigen"] },
          { cells: ["Transgenic goats", "Human antithrombin gene, active in the udder", "Goat", "A human medicine collected from the milk"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why can a gene taken from a bacterium be expressed to make a working protein in a cotton plant?",
        options: [
          "Plant cells have no nucleus, like bacteria",
          "Bacteria and plants have the same genomes",
          "Plant ribosomes are the same 70S type as bacterial ribosomes",
          "The bacterium's ribosomes travel into the plant cell with the gene",
          "Nearly all organisms use the same genetic code to translate mRNA into protein",
        ],
        steps: [
          "The universal genetic code means the plant reads the bacterial codons as the same amino acids. So E.",
          "A and C are false: plant cells have a nucleus and 80S cytoplasmic ribosomes. B is false. D is invented: only DNA is transferred.",
        ],
        answer: "(E) Nearly all organisms use the same genetic code to translate mRNA into protein",
      },
      practiceSet: [
        { prompt: "What is a transgenic organism?", answer: "One containing DNA from another species" },
        { prompt: "Which bacterium supplies the insect toxin gene in Bt crops?", answer: "Bacillus thuringiensis" },
        { prompt: "Which deficiency was Golden Rice designed to reduce?", answer: "Vitamin A deficiency" },
        { prompt: "Name two hosts used to make human insulin.", answer: "The bacterium E. coli and yeast" },
      ],
      traps: [
        {
          title: "Transgenic DNA can cross any kingdom",
          body: "There is no rule limiting gene transfer to related species. Invertebrate genes in mammals, bacterial genes in plants and plant genes in animals have all been made. Options that allow only one direction, or only prokaryote to eukaryote, are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-gene-therapy",
      name: "Gene therapy: somatic and germline",
      intuition:
        "Many genetic diseases happen because a person has two faulty recessive alleles and so no working protein. Adding one working copy of the gene to the cells that need it can be enough, because the working allele is dominant. The difficulty is getting the gene in, and keeping it there.",
      definition:
        "- **Gene therapy** adds a working allele to a patient's cells, using a vector: a modified virus or a **liposome**.\n" +
        "- **Somatic** gene therapy changes body cells only; it is **not inherited**. **Germline** gene therapy would change eggs, sperm or embryos, so it would be inherited; it is banned in most countries.\n" +
        "- It suits **recessive single-gene disorders**: one working allele restores the protein. The first approved trial (1990) treated **SCID**, a severe immune deficiency.\n" +
        "- **Cystic fibrosis** is caused by faulty alleles of the **CFTR** gene, which codes for a chloride channel. Working alleles can be delivered to airway cells by liposomes or viral vectors in an aerosol.\n" +
        "- Problems: cells that receive the gene die and are replaced by new cells from the patient's own stem cells, which still carry the faulty alleles, so treatment must be repeated; viral vectors can cause immune reactions; a gene inserted in the wrong place can disrupt another gene.",
      table: {
        columns: ["Feature", "Somatic gene therapy", "Germline gene therapy"],
        rows: [
          { cells: ["Cells changed", "Body cells, such as airway or blood cells", "Eggs, sperm or early embryo"] },
          { cells: ["Passed to children", "No", "Yes"] },
          { cells: ["How long it lasts", "Only as long as the treated cells live", "Every cell of the new person carries it"] },
          { cells: ["Status", "Approved treatments exist", "Banned in most countries"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why is gene therapy by adding a working allele more likely to succeed for a recessive single-gene disorder than for a dominant one?",
        options: [
          "One added working allele can supply the missing protein, but against a dominant allele the faulty allele would still act",
          "Recessive alleles are never transcribed, so they are easy to replace",
          "Dominant disorders affect only the germ cells",
          "Vectors can carry only recessive alleles",
          "Recessive disorders are caused by many genes at once",
        ],
        steps: [
          "In a recessive disorder the problem is a missing protein; one working allele supplies it. In a dominant disorder the faulty allele causes harm even when a working allele is present, so adding another does not help. So A.",
          "B is false: recessive alleles are usually transcribed but give a faulty or no protein. C, D and E are invented.",
        ],
        answer: "(A) One added working allele can supply the missing protein, but against a dominant allele the faulty allele would still act",
      },
      practiceSet: [
        { prompt: "Is a change made by somatic gene therapy passed to the patient's children?", answer: "No" },
        { prompt: "Which gene is faulty in cystic fibrosis, and what does it code for?", answer: "CFTR; a chloride ion channel" },
        { prompt: "Name a non-viral vector used in gene therapy.", answer: "A liposome" },
        { prompt: "Why must gene therapy to airway cells be repeated?", answer: "The treated cells are replaced by new cells that carry the faulty alleles" },
      ],
      traps: [
        {
          title: "The added allele is dominant, and it fades with the cells",
          body: "The working allele added in gene therapy is the dominant one, which is why one copy helps. The effect is short-lived because treated cells are replaced by new ones made from untreated stem cells, not because genes break down on their own in a cell.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-stem-cells",
      name: "Stem cells and potency",
      intuition:
        "A stem cell has not yet decided what to become, and it can divide to make more of itself. The earlier in development a cell is, the more options it keeps open. A fertilised egg can make an entire person plus the placenta; a bone marrow stem cell can only make blood cells.",
      definition:
        "- A **stem cell** is unspecialised, can **self-renew** by dividing, and can **differentiate** into specialised cells.\n" +
        "- **Potency** is the range of cells it can become (see the table).\n" +
        "- **Embryonic stem cells** come from the **inner cell mass** of a blastocyst (about 5 days after fertilisation). Using embryos raises ethical objections.\n" +
        "- **Induced pluripotent stem (iPS) cells** are adult body cells reprogrammed to pluripotency by adding a few genes for transcription factors (Yamanaka, 2006). Made from the patient's own cells, they avoid rejection and the embryo question.\n" +
        "- Uses: bone marrow transplants (already routine), research into repairing damaged tissue.\n" +
        "- In plants, **meristems** hold stem cells, and many mature plant cells can become totipotent again in tissue culture.",
      table: {
        columns: ["Potency", "Can become", "Examples"],
        rows: [
          { cells: ["Totipotent", "Every cell type, including the placenta", "The zygote and the cells of the first few divisions"] },
          { cells: ["Pluripotent", "Any cell of the body, but not the placenta", "Embryonic stem cells from the inner cell mass; iPS cells"] },
          { cells: ["Multipotent", "Several cell types of one family", "Bone marrow stem cells, which make all blood cells"] },
          { cells: ["Unipotent", "Only one cell type", "Muscle satellite cells, which make muscle fibres"] },
        ],
      },
      selfCheckExample: {
        prompt: "Stem cells in bone marrow can produce red blood cells, white blood cells and platelets, but not nerve or liver cells. How are they best described?",
        options: ["Totipotent", "Pluripotent", "Unipotent", "Multipotent", "Fully differentiated"],
        steps: [
          "They make several cell types, all within the blood family, so they are multipotent: D.",
          "Totipotent and pluripotent cells (A, B) could also make nerve and liver cells. Unipotent (C) means only one type. E is wrong: differentiated cells are no longer stem cells.",
        ],
        answer: "(D) Multipotent",
      },
      practiceSet: [
        { prompt: "From which part of the blastocyst are embryonic stem cells taken?", answer: "The inner cell mass" },
        { prompt: "What can a totipotent cell make that a pluripotent cell cannot?", answer: "The placenta (extra-embryonic tissues)" },
        { prompt: "How are iPS cells made?", answer: "Adult body cells are reprogrammed by adding genes for a few transcription factors" },
        { prompt: "Why are iPS cells from a patient not rejected when returned to that patient?", answer: "They carry the patient's own antigens" },
      ],
      traps: [
        {
          title: "Pluripotent is one step below totipotent",
          body: "Only the zygote and the cells of the first few divisions are totipotent: they can also form the placenta. Embryonic stem cells from the inner cell mass are pluripotent: any body cell, but not the placenta.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-cloning",
      name: "Cloning: natural, plant and animal",
      intuition:
        "A clone is a genetically identical copy. Nature makes clones all the time, every time a bacterium divides or a strawberry plant sends out a runner. Cloning an adult mammal is harder: the nucleus of a specialised cell has to be put into an egg, which resets it to start development again.",
      definition:
        "- A **clone** is a group of genetically identical cells or organisms, made by asexual reproduction or mitosis.\n" +
        "- **Natural clones**: bacteria (binary fission), plants that spread by runners or tubers, and **identical twins** (one early embryo splits).\n" +
        "- **Somatic cell nuclear transfer (SCNT)**: the nucleus of a body cell from the animal to be copied is put into an egg cell whose own nucleus has been removed. An electric pulse fuses them and starts division; the embryo is placed in a **surrogate mother**.\n" +
        "- **Dolly the sheep** (born 1996) was the first mammal cloned from an adult cell: the nucleus came from an udder cell.\n" +
        "- The clone shares the **nuclear DNA** of the nucleus donor, but its **mitochondrial DNA** comes from the egg donor. The surrogate gives no DNA.\n" +
        "- **Therapeutic cloning** grows an SCNT embryo only to the blastocyst stage to obtain embryonic stem cells matched to a patient.",
      table: {
        columns: ["Type of cloning", "How it is done", "Example"],
        rows: [
          { cells: ["Natural cloning", "Asexual reproduction, or splitting of an early embryo", "Bacteria, strawberry runners, identical twins"] },
          { cells: ["Plant cloning", "Cuttings, or tissue culture of small pieces of tissue", "Mass production of identical crop plants"] },
          { cells: ["Reproductive cloning (SCNT)", "Body-cell nucleus into an enucleated egg; embryo into a surrogate", "Dolly the sheep, 1996"] },
          { cells: ["Therapeutic cloning", "SCNT embryo grown only to a blastocyst", "Embryonic stem cells matched to a patient"] },
          { cells: ["Gene cloning", "Many copies of one gene made in bacteria or by PCR", "Bacteria carrying a recombinant plasmid"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In a cloning experiment, the nucleus is taken from a skin cell of sheep X and put into an egg from sheep Y whose nucleus has been removed. The embryo develops in sheep Z. Which statement about the lamb is correct?",
        options: [
          "All of its DNA comes from sheep X",
          "Its nuclear DNA comes from sheep X and its mitochondrial DNA from sheep Y",
          "Its nuclear DNA is half from X and half from Y",
          "Its nuclear DNA comes from sheep Z",
          "Its DNA comes from sheep Z, because Z gave birth to it",
        ],
        steps: [
          "The nucleus, with all the chromosomes, comes from X. The egg's cytoplasm, with its mitochondria, comes from Y. So B.",
          "A forgets the mitochondria. C would need fertilisation, which did not happen. D and E: the surrogate only carries the embryo.",
        ],
        answer: "(B) Its nuclear DNA comes from sheep X and its mitochondrial DNA from sheep Y",
      },
      practiceSet: [
        { prompt: "What does SCNT stand for?", answer: "Somatic cell nuclear transfer" },
        { prompt: "Which kind of cell supplied the nucleus that made Dolly?", answer: "An udder (mammary gland) cell from an adult sheep" },
        { prompt: "Are identical twins clones?", answer: "Yes: they come from one embryo that split" },
        { prompt: "What is the aim of therapeutic cloning?", answer: "Embryonic stem cells genetically matched to a patient" },
      ],
      traps: [
        {
          title: "A clone is not a perfect copy of the nucleus donor",
          body: "A cloned animal has the donor's nuclear DNA but the egg donor's mitochondrial DNA, and it grows up in a different environment. So it can differ from the donor in small ways, including its appearance and behaviour. The surrogate mother gives it no DNA at all.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-crispr",
      name: "CRISPR-Cas9 gene editing in outline",
      intuition:
        "CRISPR is a cut-and-repair tool that can be aimed at almost any gene. A short guide RNA does the aiming by base pairing with the target DNA, and the Cas9 enzyme it carries does the cutting. The cell then repairs the cut, and the way it repairs it decides whether a gene is switched off or rewritten.",
      definition:
        "- CRISPR began as a **bacterial defence system**: bacteria store short pieces of phage DNA and use matching RNAs to guide Cas enzymes to cut the phage if it returns.\n" +
        "- **Cas9** is a nuclease that cuts **both strands** of DNA. It goes where the **guide RNA** (about 20 nucleotides long) pairs with the DNA, next to a short **PAM** sequence.\n" +
        "- Repair by simply joining the ends often adds or loses a few bases, which **knocks out** the gene. Repair copying a supplied DNA template makes a **precise edit** or inserts new DNA.\n" +
        "- Nobel Prize in Chemistry 2020: Emmanuelle Charpentier and Jennifer Doudna.\n" +
        "- The first approved CRISPR treatment (2023) edits a patient's own blood stem cells outside the body to treat sickle cell disease and β-thalassaemia.\n" +
        "- Editing embryos (germline editing) is widely condemned; a 2018 attempt in China led to a prison sentence.",
      table: {
        columns: ["Component", "What it is", "Job"],
        rows: [
          { cells: ["Cas9", "A nuclease enzyme (protein)", "Cuts both strands of the target DNA"] },
          { cells: ["Guide RNA", "About 20 nucleotides matching the target", "Leads Cas9 to the right place by base pairing"] },
          { cells: ["PAM", "A short DNA sequence beside the target", "Must be present for Cas9 to cut"] },
          { cells: ["End-joining repair", "The cell rejoins the cut ends, often imperfectly", "Small insertions or deletions knock the gene out"] },
          { cells: ["Template repair", "The cell copies a DNA template supplied with Cas9", "A precise change or an inserted sequence"] },
        ],
      },
      selfCheckExample: {
        prompt: "In CRISPR-Cas9 gene editing, what decides where in the genome the DNA is cut?",
        options: [
          "Cas9 recognises a fixed palindromic sequence, like a restriction enzyme",
          "DNA ligase marks the target site",
          "The sequence of the guide RNA, which pairs with the target DNA",
          "The promoter of the target gene",
          "Cas9 cuts at random, and cells with the wanted change are selected",
        ],
        steps: [
          "Cas9 cuts wherever its guide RNA finds complementary DNA (next to a PAM). Changing the guide changes the target. So C.",
          "A describes a restriction enzyme, which can only cut one fixed sequence. B: ligase joins DNA, it does not mark anything. D and E are not how targeting works.",
        ],
        answer: "(C) The sequence of the guide RNA, which pairs with the target DNA",
      },
      practiceSet: [
        { prompt: "Which part of the CRISPR system cuts the DNA?", answer: "The Cas9 nuclease" },
        { prompt: "What was the natural role of CRISPR in bacteria?", answer: "Defence against bacteriophages" },
        { prompt: "How can CRISPR be used to switch a gene off?", answer: "Cut it and let end-joining repair add or delete a few bases" },
        { prompt: "Who shared the 2020 Nobel Prize in Chemistry for CRISPR?", answer: "Emmanuelle Charpentier and Jennifer Doudna" },
      ],
      traps: [
        {
          title: "The guide RNA aims; Cas9 cuts",
          body: "Apart from needing a short PAM beside the target, Cas9 has no fixed target sequence, unlike a restriction enzyme. The guide RNA chooses the site by base pairing, so one Cas9 can be sent to almost any gene just by changing the guide.",
        },
      ],
    },
  ],
};
