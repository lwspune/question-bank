import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 8 Cell Biology and Biotechnology.
 * Statements checked against the Balbharati text; most-asked years from the
 * board past papers in the bank. Protein-and-organ tables (taught in Ch. 2),
 * human body organization labels (Ch. 6) and tissue culture steps (recalled
 * from Class 9, not taught here) are left out.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Cell Biology and Biotechnology",
  chapterSlug: "cell-biology-and-biotechnology",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Stem cells",
      text: "Special cells of multicellular organisms that give rise to all other types of cells; they can replicate themselves and help in wound healing. Found in the umbilical cord, the blastocyst, red bone marrow, adipose tissue and blood.",
    },
    {
      term: "Embryonic stem cells",
      text: "Cells of the embryo before differentiation (which starts on the **14th day**). They form all 220 types of human cells: this property is **pluripotency**. Stored in liquid nitrogen at -135°C to -190°C.",
    },
    {
      term: "Uses of stem cells",
      text: "**Cell therapy**: replace dead cells in diabetes, myocardial infarction, Alzheimer's, Parkinson's. Produce **blood cells** in anaemia, thalassemia, leukemia. Grow organs like kidney and liver for **transplantation**.",
    },
    {
      term: "Organ and body donation",
      text: "A kidney or skin can be donated in life; liver, heart and eyes only after death. Blood group, diseases and age of donor and recipient must match. Donation can save lives and give vision to the blind.",
    },
    {
      term: "Biotechnology",
      text: "Bringing about artificial genetic changes and hybridization in organisms for **human welfare**. Includes cytology, biochemistry, molecular biology and genetic engineering. Department of Biotechnology set up in 1986.",
    },
    {
      term: "Genetically modified crops",
      text: "Crops with desired characters made by integrating a **foreign gene** into their genome. **Bt cotton** and **Bt brinjal**: gene from Bacillus thuringiensis kills the bollworm. **Golden rice**: 23 times more beta carotene.",
    },
    {
      term: "Biofertilizers",
      text: "Improve nitrogen fixation and phosphate solubilization. Bacteria: **Rhizobium**, **Azotobacter**, Nostoc, Anabaena; plant: Azolla.",
    },
    {
      term: "Vaccines",
      text: "Antigen-containing material that gives immunity against a pathogen. Biotechnology makes pure antigen proteins from the pathogen's gene: safer, more thermo-stable vaccines. Transgenic potatoes are edible vaccines.",
    },
    {
      term: "Proteins made by biotechnology",
      text: "Insulin: diabetes. Somatostatin: dwarfism. **Erythropoietin: anaemia**. Factor VIII: haemophilia. **Interleukin: cancer**. **Interferon: viral diseases** (made by transgenic E. coli).",
    },
    {
      term: "Cloning",
      text: "Production of replica of any cell, organ or entire organism. **Reproductive cloning** fuses a somatic cell nucleus with an enucleated ovum; no sperm needed. **Dolly** the sheep, Scotland, 5 July 1996.",
    },
    {
      term: "DNA fingerprinting",
      text: "Each person's DNA sequence is unique, so identity can be established from available DNA. Used mainly in **forensic science**: identifying a criminal, or the father of a child. Centre at Hyderabad.",
    },
    {
      term: "Bioremediation",
      text: "Absorption or destruction of toxic chemicals by plants and microbes (phyto-remediation when plants). Pseudomonas cleans oil; the fern Pteris vitata absorbs arsenic; sunflower absorbs uranium and arsenic.",
    },
    {
      term: "Green, white and blue revolution",
      text: "**Green**: maximum food grain yield from minimum land (Borlaug, M. S. Swaminathan). **White**: dairy (Dr Verghese Kurien, Anand). **Blue**: production of useful aquatic organisms; pisciculture through **NKM-16**.",
    },
    {
      term: "Organic farming and medicinal plants",
      text: "Organic farming bans chemical fertilizers and pesticides and uses local, sturdy varieties. Medicinal plants (Adulsa for cough, neem) are now cultivated as forests shrink; ayurveda cures with natural sources.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "What are stem cells? Write their uses",
      steps: [
        "Undifferentiated cells that replicate themselves and can be transformed into other types of cells.",
        "Sources: umbilical cord blood, blastocyst, red bone marrow, adipose tissue, blood.",
        "Uses: cell therapy (diabetes, heart attack, Alzheimer's, Parkinson's); blood cells for anaemia, thalassemia, leukemia; organs like kidney and liver for transplantation.",
      ],
    },
    {
      title: "Commercial applications of biotechnology",
      steps: [
        "**Crops**: hybrid seeds, GM crops (Bt cotton, golden rice), biofertilizers.",
        "**Animal husbandry**: artificial insemination and embryo transfer for more milk, meat, wool.",
        "**Health**: insulin from bacteria, safer vaccines, interferon, gene therapy, cloning.",
        "**Industry and environment**: alcohol by transgenic yeast, sewage treatment, bioremediation; **food**: bread, cheese, vinegar; **DNA fingerprinting**.",
      ],
    },
    {
      title: "Benefits of biotechnology in agriculture",
      steps: [
        "Higher yield per hectare; less expense on disease control due to resistant varieties.",
        "Fast fruit setting varieties raise the yield per year.",
        "Stress resistant varieties withstand changing temperature, water-stress and soil fertility.",
      ],
    },
    {
      title: "How was Dolly the sheep cloned?",
      steps: [
        "The nucleus of an udder cell of a Finn Dorset sheep was put into an enucleated ovum of a Scottish sheep.",
        "The ovum developed in the uterus of the Scottish sheep; Dolly was born on 5 July 1996.",
        "Dolly showed the characters of the nucleus donor, none of the Scottish sheep.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Organs that can be donated (Fig. 8.4)",
      labels: ["eyes", "heart, heart valves", "liver", "kidneys", "skin"],
    },
  ],
  mostAsked: [
    { topic: "Biotechnology: define it, its benefits, commercial uses", marks: 2, years: [2026, 2025, 2024, 2020, 2019] },
    { topic: "GM crops, cloning and DNA fingerprinting: define, examples, Dolly the sheep, biofertilizer bacteria", marks: 2, years: [2026, 2024, 2022, 2020] },
    { topic: "Stem cells: define, sources, uses (concept map)", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Organ transplantation and donation: which organs, why some organs are valuable", years: [2025, 2022] },
    { topic: "Proteins by biotechnology and diseases: erythropoietin, interleukin, interferon", marks: 1, years: [2026, 2025, 2023] },
    { topic: "Revolutions: green, white and blue revolution, NKM-16 for pisciculture", marks: 1, years: [2025, 2024, 2019] },
    { topic: "Importance of medicinal plants", marks: 3, years: [2025] },
  ],
  mistakes: [
    {
      title: "Mixing up the protein and disease pairs",
      body: "Insulin: diabetes. Erythropoietin: anaemia. Interleukin: cancer. Interferon: viral diseases. Factor VIII: haemophilia.",
    },
    {
      title: "Getting the revolutions wrong",
      body: "Green: food grains. White: dairy. Blue: fish and other aquatic organisms (NKM-16 for pisciculture).",
    },
    {
      title: "Cloning needs no sperm",
      body: "In reproductive cloning a somatic cell nucleus goes into an enucleated ovum. The clone shows the characters of the nucleus donor.",
    },
    {
      title: "Organs that can be donated while alive",
      body: "The book's answer: a kidney and some skin can be donated during life; liver, heart and eyes only after death.",
    },
  ],
};

export default sheet;
