import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 10 Biotechnology and its Applications.
 * Definitions, genes, products and examples checked against the NCERT text
 * (the book's own wording, trimmed); most-asked years and marks from the
 * CBSE board past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Biotechnology and its Applications",
  chapterSlug: "biotechnology-and-its-applications",
  source: "NCERT Biology (CBSE Class 12), Chapter 10",
  keyPoints: [
    {
      term: "Genetically modified organisms (GMO)",
      text: "Plants, bacteria, fungi and animals whose genes have been altered by manipulation. GM plants: (i) more **tolerant to abiotic stresses** (cold, drought, salt, heat); (ii) **less reliance on chemical pesticides**; (iii) **fewer post harvest losses**; (iv) more **efficient mineral usage**; (v) **enhanced nutritional value**, e.g. **golden rice** (vitamin A enriched rice).",
    },
    {
      term: "Tissue culture and totipotency",
      text: "Whole plants can be regenerated from **explants** (any plant part grown in a test tube under sterile conditions in special nutrient media). **Totipotency:** the capacity to generate a **whole plant** from any cell or explant. The medium must give a **carbon source (sucrose)**, inorganic salts, vitamins, amino acids and growth regulators (**auxins, cytokinins**).",
    },
    {
      term: "Micro-propagation",
      text: "Producing **thousands of plants** through tissue culture in a very short time. Each plant is **genetically identical** to the original plant: they are **somaclones**. Tomato, banana, apple, etc. are produced commercially this way. It arose because traditional breeding could not keep pace with demand.",
    },
    {
      term: "Virus-free plants and somatic hybrids",
      text: "Even in a virus-infected plant the **meristem (apical and axillary) is free of virus**; grown in vitro it gives **virus-free plants** (banana, sugarcane, potato). Naked **protoplasts** of two varieties, each with a desirable character, are fused into hybrid protoplasts and grown into **somatic hybrids**. **Pomato** (tomato and potato) lacked the desired combination for commercial use.",
    },
    {
      term: "Bt toxin",
      text: "Some strains of *Bacillus thuringiensis* make protein crystals with a toxic insecticidal protein that kills **lepidopterans** (tobacco budworm, armyworm), **coleopterans** (beetles) and **dipterans** (flies, mosquitoes). It exists as an **inactive protoxin**; the **alkaline pH of the insect gut** solubilises the crystals and activates it. It binds **midgut epithelial cells**, making **pores**: swelling, lysis, death.",
    },
    {
      term: "cry genes",
      text: "The toxin is coded by a gene named ***cry***. Most Bt toxins are **insect-group specific**, so the gene chosen depends on the crop and the pest. Proteins of ***cryIAc* and *cryIIAb*** control **cotton bollworms**; that of ***cryIAb*** controls **corn borer**. Bt crops: cotton, corn, rice, tomato, potato, soyabean.",
    },
    {
      term: "RNA interference (RNAi) in tobacco",
      text: "The nematode ***Meloidegyne incognitia*** infects the **roots of tobacco**. RNAi, a cellular defence in **all eukaryotes**, silences a specific mRNA by a **complementary dsRNA**. Nematode-specific genes were introduced with **Agrobacterium vectors** to make **sense and anti-sense RNA**; these formed **dsRNA**, which silenced the nematode's mRNA, so the parasite could not survive.",
    },
    {
      term: "Insulin and pro-insulin",
      text: "Insulin has two short polypeptide chains, **A and B**, linked by **disulphide bridges**. It is made as a **pro-hormone** (pro-insulin) with an extra stretch, the **C peptide**, which is **removed during maturation** and is not in mature insulin. Insulin was earlier taken from the pancreas of **slaughtered cattle and pigs**; it caused **allergy** in some patients.",
    },
    {
      term: "Genetically engineered insulin (Eli Lilly)",
      text: "In **1983** the American company **Eli Lilly** prepared **two DNA sequences corresponding to chains A and B** of human insulin and introduced them into **plasmids of *E. coli***. Chains A and B were produced **separately**, extracted and **combined by creating disulfide bonds** to form human insulin. The main challenge had been assembling insulin into a mature form.",
    },
    {
      term: "Gene therapy and ADA deficiency",
      text: "**Gene therapy:** methods that correct a gene defect diagnosed in a child or embryo by delivering a **normal gene** to take over the function of the non-functional one. First given in **1990** to a **4-year old girl** with **adenosine deaminase (ADA) deficiency**, caused by **deletion of the ADA gene**; ADA is vital for the **immune system**. Marrow transplant, enzyme replacement: not fully curative.",
    },
    {
      term: "Molecular diagnosis",
      text: "Conventional methods (serum and urine analysis) cannot detect disease early. **PCR** amplifies the nucleic acid of a pathogen at **very low concentration**, before symptoms (HIV in suspected AIDS patients, mutations in suspected cancer). A **probe** (single stranded DNA or RNA tagged with a **radioactive** molecule) plus **autoradiography** finds mutated genes. **ELISA** works on **antigen-antibody interaction**.",
    },
    {
      term: "Transgenic animals",
      text: "Animals that have had their DNA manipulated to **possess and express an extra (foreign) gene**. Over **95 per cent are mice**. Uses: (i) **normal physiology and development** (e.g. insulin-like growth factor); (ii) **study of disease** (models for cancer, cystic fibrosis, rheumatoid arthritis, Alzheimer's); (iii) **biological products**; (iv) **vaccine safety**; (v) **chemical safety (toxicity) testing**.",
    },
    {
      term: "Products and tests from transgenic animals",
      text: "**Human protein (\\(\\alpha\\)-1-antitrypsin)** is used to treat **emphysema**. **Rosie** (1997), the **first transgenic cow**, gave human protein-enriched milk (**2.4 grams per litre**) containing **human alpha-lactalbumin**, nutritionally more balanced for babies than natural cow-milk. **Transgenic mice** test the safety of the **polio vaccine** and could replace monkeys.",
    },
    {
      term: "GEAC, patents and biopiracy",
      text: "**GEAC (Genetic Engineering Approval Committee)** decides the **validity of GM research** and the **safety of introducing GM-organisms** for public services. In **1997** an American company got **patent rights on Basmati rice** through the US Patent and Trademark Office; turmeric and neem too. **Biopiracy:** use of bio-resources by multinational companies without proper authorisation and without compensatory payment.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain how Bt cotton protects itself from bollworms",
      steps: [
        "Bt toxin genes (*cryIAc*, *cryIIAb*) from *Bacillus thuringiensis* are incorporated into cotton plants.",
        "The plant makes the toxin as an **inactive protoxin** (in crystals), so it does not harm the plant or the bacterium.",
        "When a bollworm eats the plant, the **alkaline pH** of its gut solubilises the crystals and activates the toxin.",
        "The active toxin binds the **midgut epithelial cells** and creates pores: the cells swell and lyse, and the insect dies.",
      ],
    },
    {
      title: "Explain how RNA interference makes tobacco plants resistant to the nematode",
      steps: [
        "Nematode-specific genes are introduced into the tobacco plant using **Agrobacterium** vectors.",
        "The DNA produces both **sense and anti-sense RNA** in the host cells.",
        "The two complementary RNAs form **dsRNA**, which initiates RNAi.",
        "The dsRNA silences (prevents translation of) the specific **mRNA of the nematode**, so the parasite cannot survive in the transgenic host.",
      ],
    },
    {
      title: "How was human insulin produced by rDNA technology?",
      steps: [
        "Prepare two DNA sequences corresponding to chains **A and B** of human insulin.",
        "Introduce them into **plasmids of *E. coli*** to produce the insulin chains.",
        "Produce chains A and B **separately**, then extract them.",
        "Combine them by creating **disulfide bonds** to form human insulin (no C peptide to remove).",
      ],
    },
    {
      title: "Describe gene therapy for ADA deficiency",
      steps: [
        "Grow **lymphocytes** from the patient's blood in a culture outside the body.",
        "Introduce a **functional ADA cDNA** into them using a **retroviral vector**.",
        "Return the cells to the patient.",
        "The cells are **not immortal**, so periodic infusions are needed; introducing the gene from marrow cells at **early embryonic stages** could be a permanent cure.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Maturation of pro-insulin into insulin (Figure 10.3)",
      labels: ["pro-insulin", "A chain and B chain", "C peptide (removed)", "disulphide bridges", "mature insulin"],
    },
    {
      title: "dsRNA protecting tobacco roots from the nematode (Figure 10.2)",
      labels: ["(a) roots of a control plant, infested", "(b) transgenic plant roots, protected", "5 days after deliberate infection"],
    },
  ],
  mostAsked: [
    {
      topic: "Bt crops: cry genes (cryIAc, cryIIAb, cryIAb), Bt toxin as inactive protoxin, why it does not kill the bacterium, how it kills the insect",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Transgenic animals: definition, mice, Rosie, alpha-1-antitrypsin, vaccine and chemical safety testing, disease models",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Tissue culture, micropropagation, virus-free plants from meristems, somatic hybrids (pomato), advantages of GM plants, golden rice",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "RNA interference: protecting tobacco roots from Meloidegyne incognitia using Agrobacterium and dsRNA",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Genetically engineered insulin: pro-insulin, C peptide, chains A and B, Eli Lilly",
      marks: 3,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Gene therapy for ADA deficiency: why repeated infusion, what could be a permanent cure",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Molecular diagnosis: PCR, probes and autoradiography, ELISA (antigen-antibody interaction)",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Ethical issues: GEAC, patents, Basmati and turmeric, biopiracy",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Why Bt toxin does not kill the bacterium",
      body: "It is stored as an **inactive protoxin**. Only the **alkaline** pH of the insect's gut activates it; do not write acidic.",
    },
    {
      title: "cry genes and their pests swapped",
      body: "***cryIAc* and *cryIIAb***: cotton bollworms. ***cryIAb***: corn borer. Write the gene names in italics exactly.",
    },
    {
      title: "Whose mRNA RNAi silences",
      body: "The dsRNA made by the transgenic tobacco silences the **nematode's** mRNA, not the plant's. The RNAs come from **sense and anti-sense** strands, delivered by *Agrobacterium*.",
    },
    {
      title: "C peptide and the Eli Lilly method",
      body: "The C peptide is **removed** during maturation and is **not** part of mature insulin. Eli Lilly made chains **A and B separately** in *E. coli* and joined them by disulfide bonds.",
    },
    {
      title: "Calling ADA gene therapy a permanent cure",
      body: "Engineered **lymphocytes are not immortal**, so infusions are repeated. A permanent cure needs the gene (from marrow cells) put into cells at an **early embryonic stage**.",
    },
    {
      title: "Transgenic animal facts",
      body: "Over **95%** of transgenic animals are **mice**; transgenic mice test the **polio** vaccine. Rosie's milk had **human alpha-lactalbumin**; \\(\\alpha\\)-1-antitrypsin treats **emphysema**.",
    },
  ],
};

export default sheet;
