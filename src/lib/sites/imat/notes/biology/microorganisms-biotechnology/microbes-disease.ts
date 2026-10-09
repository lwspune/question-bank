import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_BIO_MBT_MICROBES_DISEASE_NOTE: SubtopicNote = {
  subtopicName: "Fungi, Protists and Pathogens",
  title: "Fungi, Protists, Pathogens, Antibiotics and Vaccines",
  oneLineDefinition:
    "Fungi and protists are eukaryotic microbes; bacteria, viruses, fungi and protists can all be pathogens, fought with antibiotics (bacteria only) and prevented with vaccines.",
  whyItMatters:
    "No past IMAT question in this chapter has asked about fungi, protists, antibiotics or vaccines yet. They are on the syllabus and are classic one-fact questions, so a short table each is enough.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-mbt-fungi-protists",
      name: "Fungi and protists in outline",
      intuition:
        "Fungi and protists are eukaryotes, like us: they have a nucleus, mitochondria and 80S ribosomes. Fungi look a little like plants because they have cell walls and do not move, but they cannot photosynthesise; they feed by digesting food outside their bodies and absorbing it. Protists are the eukaryotes that are not plants, animals or fungi, mostly single cells.",
      definition:
        "**Fungi**:\n" +
        "- Eukaryotic, with cell walls made of **chitin** (not cellulose).\n" +
        "- **Heterotrophic**: most are **saprotrophs**, which secrete enzymes onto dead matter and absorb the products. They store carbohydrate as **glycogen**, not starch.\n" +
        "- Moulds and mushrooms are made of threads called **hyphae**, which form a **mycelium**; they reproduce with **spores**.\n" +
        "- **Yeasts** are single-celled fungi that reproduce by **budding**; without oxygen they ferment sugar to ethanol and carbon dioxide (bread, beer, wine).\n" +
        "- Penicillium is the mould in which Fleming found penicillin (1928).\n" +
        "**Protists**: eukaryotes, mostly single-celled. Some are animal-like (**protozoa**, such as Amoeba, Paramecium, Plasmodium), some are plant-like (**algae**, which photosynthesise).",
      table: {
        columns: ["Group", "Cells and wall", "Nutrition", "Examples"],
        rows: [
          { cells: ["Yeasts (fungi)", "Single eukaryotic cells, chitin wall", "Heterotrophic; respire aerobically or ferment", "Saccharomyces cerevisiae (baker's yeast), Candida"] },
          { cells: ["Moulds and mushrooms (fungi)", "Hyphae forming a mycelium, chitin walls", "Saprotrophic or parasitic", "Penicillium, Rhizopus (bread mould), field mushrooms"] },
          { cells: ["Protozoa (protists)", "Single eukaryotic cells, no wall", "Heterotrophic, take in food", "Amoeba, Paramecium, Plasmodium, Trypanosoma"] },
          { cells: ["Algae (protists)", "Single or many cells, usually cellulose walls", "Photosynthetic (autotrophic)", "Chlamydomonas, diatoms, seaweeds"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which feature do fungi share with plants but not with animals?",
        options: [
          "Heterotrophic nutrition",
          "A cell wall",
          "Photosynthesis",
          "Storage of carbohydrate as starch",
          "Cell walls made of cellulose",
        ],
        steps: [
          "Fungal and plant cells both have a cell wall; animal cells have none. So B.",
          "Heterotrophic nutrition (A) is shared by fungi and animals, not plants.",
          "Fungi do not photosynthesise (C), store glycogen rather than starch (D), and build their walls from chitin, not cellulose (E).",
        ],
        answer: "(B) A cell wall",
      },
      practiceSet: [
        { prompt: "What polymer makes up fungal cell walls?", answer: "Chitin" },
        { prompt: "How does yeast usually reproduce asexually?", answer: "By budding" },
        { prompt: "What are the products when yeast ferments glucose?", answer: "Ethanol and carbon dioxide" },
        { prompt: "To which kingdom does Plasmodium, the malaria parasite, belong?", answer: "Protists (it is a protozoan)" },
      ],
      traps: [
        {
          title: "Fungi are not plants, and yeast is not a prokaryote",
          body: "Fungi have walls but no chlorophyll; the wall is chitin and the stored sugar is glycogen. Yeast is a single cell, but it is a eukaryote with a nucleus, mitochondria and 80S ribosomes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-pathogens",
      name: "Pathogens and the diseases they cause",
      intuition:
        "A pathogen is anything that causes disease. Each kind does damage in its own way: viruses destroy the cells they multiply in, many bacteria release toxins, and parasites such as Plasmodium feed inside our cells. Knowing which kind of pathogen causes a disease tells you which treatment can work.",
      definition:
        "- A **pathogen** is an organism or agent that causes disease: bacteria, viruses, fungi, protists and also **prions** (misfolded proteins with no nucleic acid, the cause of CJD and BSE).\n" +
        "- **Communicable** diseases pass from one host to another: by droplets in the air, contaminated water or food, body fluids, direct contact, or a **vector**.\n" +
        "- A **vector** is an organism that carries a pathogen between hosts, such as the mosquito for malaria. The vector is not the cause of the disease.\n" +
        "- Many bacteria cause disease with **toxins**: cholera toxin makes the gut lose water and salts, causing severe diarrhoea.",
      table: {
        columns: ["Disease", "Pathogen", "Type", "How it spreads"],
        rows: [
          { cells: ["Tuberculosis", "Mycobacterium tuberculosis", "Bacterium", "Airborne droplets"] },
          { cells: ["Cholera", "Vibrio cholerae", "Bacterium", "Contaminated water"] },
          { cells: ["Influenza", "Influenza virus", "RNA virus", "Airborne droplets"] },
          { cells: ["COVID-19", "SARS-CoV-2", "RNA virus (coronavirus)", "Droplets and aerosols"] },
          { cells: ["AIDS", "HIV", "Retrovirus", "Blood, sex, mother to baby"] },
          { cells: ["Malaria", "Plasmodium", "Protist", "Bite of an infected female Anopheles mosquito"] },
          { cells: ["Athlete's foot, ringworm", "Several skin fungi", "Fungus", "Direct contact, shared surfaces"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these diseases is caused by a protist and spread by a vector?",
        options: ["Cholera", "Tuberculosis", "Influenza", "Athlete's foot", "Malaria"],
        steps: [
          "Malaria is caused by Plasmodium, a protist, and is carried between people by Anopheles mosquitoes. So E.",
          "Cholera and tuberculosis are bacterial; influenza is viral; athlete's foot is fungal and spreads by contact.",
        ],
        answer: "(E) Malaria",
      },
      practiceSet: [
        { prompt: "What is a vector?", answer: "An organism that carries a pathogen from one host to another" },
        { prompt: "What kind of pathogen causes tuberculosis?", answer: "A bacterium (Mycobacterium tuberculosis)" },
        { prompt: "What is a prion made of?", answer: "Only protein (a misfolded form of a normal protein)" },
        { prompt: "Why does cholera cause dehydration?", answer: "Its toxin makes the gut lining lose water and salts" },
      ],
      traps: [
        {
          title: "The mosquito is the vector, not the cause, of malaria",
          body: "Malaria is caused by the protist Plasmodium. The Anopheles mosquito only carries it. Malaria is not caused by a bacterium or a virus, so antibiotics against bacteria are not the treatment; antimalarial drugs are.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-antibiotics",
      name: "Antibiotics and antibiotic resistance",
      intuition:
        "An antibiotic is useful only if it harms the bacterium and not the patient. So antibiotics attack structures that bacteria have and our cells lack, or have in a different form: the peptidoglycan wall and the 70S ribosome are the favourite targets. Resistance is natural selection in action: the drug does not create resistant bacteria, it clears away the others.",
      definition:
        "- An **antibiotic** kills bacteria (**bactericidal**) or stops them growing (**bacteriostatic**). Many were first found in fungi or other bacteria.\n" +
        "- It works by **selective toxicity**: it hits a bacterial target with no exact human equivalent.\n" +
        "- Antibiotics do **not** work against viruses, which have no wall and use the host's ribosomes.\n" +
        "**How resistance spreads**:\n" +
        "- A random **mutation** gives a few bacteria a resistance allele, before any drug is present.\n" +
        "- The antibiotic kills the sensitive bacteria; the resistant ones survive and multiply (**selection**).\n" +
        "- Resistance genes on **plasmids** spread to other bacteria, even other species, by conjugation, transformation and transduction.\n" +
        "- Mechanisms: an enzyme that destroys the drug (**β-lactamase** breaks down penicillin), pumps that push it out, or a changed target.\n" +
        "- Overuse speeds this up: antibiotics for viral infections, unfinished courses, routine use in farm animals. MRSA (methicillin-resistant Staphylococcus aureus) is a well-known result.",
      table: {
        columns: ["Antibiotic", "Target in the bacterium", "Why human cells are spared"],
        rows: [
          { cells: ["Penicillin and other β-lactams", "Block cross-linking of peptidoglycan as the wall is built; the cell bursts by osmosis", "Human cells have no cell wall"] },
          { cells: ["Tetracycline, streptomycin, erythromycin", "Bind 70S ribosomes and block protein synthesis", "Human cytoplasm has 80S ribosomes"] },
          { cells: ["Ciprofloxacin (quinolones)", "Block DNA gyrase, so DNA cannot be copied", "Human enzymes of this kind are different"] },
          { cells: ["Sulfonamides", "Block the bacterium's synthesis of folic acid", "Humans take folic acid from food"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement best explains why antibiotic-resistant bacteria have become more common in hospitals?",
        options: [
          "Bacteria already carrying resistance alleles survive treatment and multiply, and the alleles can also pass to other bacteria on plasmids",
          "Antibiotics cause bacteria to mutate in ways that make them resistant",
          "Bacteria build up immunity to an antibiotic after meeting it several times",
          "Patients become resistant to antibiotics after repeated use",
          "Antibiotics kill the viruses that normally keep bacteria in check",
        ],
        steps: [
          "Resistance arises by chance mutation and is then selected by the drug; plasmids spread it sideways. So A.",
          "B reverses cause and effect: the drug selects, it does not cause the mutation. C uses the idea of immunity, which bacteria do not have.",
          "D is wrong because it is the bacteria, not the patient, that become resistant. E is invented: antibiotics do not act on viruses.",
        ],
        answer: "(A) Bacteria already carrying resistance alleles survive treatment and multiply, and the alleles can also pass to other bacteria on plasmids",
      },
      practiceSet: [
        { prompt: "Why does an antibiotic not cure influenza?", answer: "Influenza is a virus, which has none of the bacterial targets" },
        { prompt: "Which bacterial structure does penicillin weaken?", answer: "The peptidoglycan cell wall" },
        { prompt: "Name the enzyme some bacteria make to destroy penicillin.", answer: "β-lactamase (penicillinase)" },
        { prompt: "Why can tetracycline stop bacterial protein synthesis without stopping ours?", answer: "It binds 70S ribosomes; our cytoplasmic ribosomes are 80S" },
      ],
      traps: [
        {
          title: "Antibiotics select resistance; they do not cause it",
          body: "The resistance allele already exists by random mutation. The antibiotic removes the competitors, so the resistant bacteria take over. Options saying the bacteria 'adapt', 'become immune' or are made to mutate by the drug are wrong, and so is any option where the patient becomes resistant.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-mbt-vaccines",
      name: "Vaccines and types of immunity",
      intuition:
        "A vaccine is a safe rehearsal. It shows the immune system an antigen from a pathogen without causing the disease, so the body makes memory cells. When the real pathogen arrives, those memory cells respond so fast that the person usually never falls ill. The detailed immune response is taught in the Human Anatomy and Physiology chapter.",
      definition:
        "- A **vaccine** contains antigens (or instructions to make them) that start a **primary immune response** and leave **memory B and T cells**.\n" +
        "- On real infection the **secondary response** is faster, stronger and longer. Boosters raise the level of memory again.\n" +
        "- **Active immunity**: your own body makes antibodies and memory cells. Natural (after infection) or artificial (after a vaccine). Slow to start, long-lasting.\n" +
        "- **Passive immunity**: ready-made antibodies are received. Natural (across the placenta, in breast milk) or artificial (an injection of antibodies, such as antivenom). Immediate but short-lived, with **no memory cells**.\n" +
        "- **Herd immunity**: when enough people are immune, the pathogen cannot spread, which protects those who cannot be vaccinated.\n" +
        "- Jenner (1796) used cowpox to protect against smallpox; smallpox was declared eradicated in 1980.",
      table: {
        columns: ["Vaccine type", "What it contains", "Examples"],
        rows: [
          { cells: ["Live attenuated", "A weakened living pathogen", "Measles, mumps and rubella (MMR); oral polio"] },
          { cells: ["Inactivated", "Killed pathogen", "Injected polio, most flu vaccines"] },
          { cells: ["Toxoid", "A bacterial toxin made harmless", "Tetanus, diphtheria"] },
          { cells: ["Subunit (recombinant)", "One purified antigen, often made by genetically modified yeast", "Hepatitis B, HPV"] },
          { cells: ["mRNA", "mRNA coding for one viral protein, inside lipid droplets", "The first COVID-19 vaccines (2020)"] },
        ],
      },
      selfCheckExample: {
        prompt: "A person bitten by a venomous snake is given an injection of antibodies against the venom. What type of immunity does this give?",
        options: ["Active natural", "Active artificial", "Passive artificial", "Passive natural", "Herd immunity"],
        steps: [
          "The antibodies are made by another animal and injected, so the person receives them ready-made: passive. They come from a medical procedure: artificial. So C.",
          "Active immunity (A, B) would need the person's own B cells to make the antibodies. Passive natural (D) is from mother to baby.",
        ],
        answer: "(C) Passive artificial",
      },
      practiceSet: [
        { prompt: "Which cells give long-lasting protection after vaccination?", answer: "Memory B and T cells" },
        { prompt: "What does a toxoid vaccine contain?", answer: "A bacterial toxin that has been made harmless" },
        { prompt: "Does an mRNA vaccine change the DNA of the person's cells?", answer: "No", method: "The mRNA stays in the cytoplasm, is translated and is broken down" },
        { prompt: "Why does passive immunity fade within weeks?", answer: "The received antibodies are broken down and no memory cells were made" },
      ],
      traps: [
        {
          title: "Passive immunity has no memory",
          body: "Received antibodies work at once but are gone within weeks or months, and they leave no memory cells. Only active immunity, after infection or a vaccine, produces memory cells and lasting protection.",
        },
      ],
    },
  ],
};
