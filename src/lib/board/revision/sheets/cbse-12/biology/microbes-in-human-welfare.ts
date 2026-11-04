import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Biology, Ch. 8 Microbes in Human Welfare. Definitions,
 * microbes and their products checked against the NCERT text (the book's own
 * wording, trimmed); most-asked years and marks from the CBSE board
 * past-paper questions in the bank, 2022-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Microbes in Human Welfare",
  chapterSlug: "microbes-in-human-welfare",
  source: "NCERT Biology (CBSE Class 12), Chapter 8",
  keyPoints: [
    {
      term: "Lactic acid bacteria (LAB) and curd",
      text: "*Lactobacillus* and other **lactic acid bacteria (LAB)** grow in milk and produce acids that **coagulate and partially digest the milk proteins**. A little curd added as inoculum (starter) has millions of LAB. LAB also improve the nutritional quality of curd by **increasing vitamin B12**, and in our stomach they check disease-causing microbes.",
    },
    {
      term: "Dough, toddy and cheese",
      text: "Dough for dosa and idli is fermented by bacteria; it puffs up from \\(\\ce{CO2}\\). Bread dough uses **baker's yeast** (*Saccharomyces cerevisiae*). Toddy is fermented palm sap. Large holes in **Swiss cheese** come from much \\(\\ce{CO2}\\) made by the bacterium ***Propionibacterium sharmanii***; **Roquefort cheese** is ripened by growing a specific **fungus** on it.",
    },
    {
      term: "Fermented beverages",
      text: "*Saccharomyces cerevisiae* (**brewer's yeast**) ferments malted cereals and fruit juices to produce ethanol. **Wine and beer** are produced **without distillation**; **whisky, brandy and rum** by **distillation** of the fermented broth. Large vessels for growing microbes are **fermentors**.",
    },
    {
      term: "Antibiotics and penicillin",
      text: "Chemical substances produced by some microbes that **kill or retard the growth of other (disease-causing) microbes**. **Penicillin**, the first antibiotic, was a chance discovery: **Alexander Fleming**, working on *Staphylococci*, saw that a mould (*Penicillium notatum*) stopped their growth. **Chain and Florey** established its full potential; all three won the **Nobel Prize in 1945**.",
    },
    {
      term: "Organic acids and alcohol",
      text: "***Aspergillus niger*** (fungus): **citric acid**. ***Acetobacter aceti*** (bacterium): **acetic acid**. ***Clostridium butylicum*** (bacterium): **butyric acid**. ***Lactobacillus*** (bacterium): **lactic acid**. Yeast (*Saccharomyces cerevisiae*): commercial **ethanol**.",
    },
    {
      term: "Enzymes and bioactive molecules",
      text: "**Lipases**: detergents (oily stains). **Pectinases, proteases**: clarify bottled juices. **Streptokinase** (*Streptococcus*, genetically modified): **clot buster** after myocardial infarction. **Cyclosporin A** (fungus *Trichoderma polysporum*): **immunosuppressive** in organ transplants. **Statins** (yeast *Monascus purpureus*): lower blood cholesterol by **competitively inhibiting the enzyme** for its synthesis.",
    },
    {
      term: "Primary treatment of sewage",
      text: "**Physical removal** of particles, large and small, by **filtration and sedimentation**: floating debris by sequential filtration, then grit (soil and small pebbles) by sedimentation. All solids that settle form the **primary sludge**; the supernatant is the **effluent**, taken for secondary treatment.",
    },
    {
      term: "Secondary (biological) treatment and flocs",
      text: "The primary effluent goes into large **aeration tanks**, constantly **agitated mechanically with air pumped in**. Useful **aerobic** microbes grow vigorously into **flocs** (masses of bacteria associated with fungal filaments forming mesh-like structures), which consume the major part of the organic matter and so **significantly reduce the BOD**.",
    },
    {
      term: "BOD (biochemical oxygen demand)",
      text: "The **amount of oxygen that would be consumed if all the organic matter in one litre of water were oxidised by bacteria**. The BOD test measures the rate of uptake of oxygen by micro-organisms in a water sample, so BOD is **indirectly a measure of the organic matter**. The **greater the BOD** of waste water, the **more its polluting potential**.",
    },
    {
      term: "Activated sludge and anaerobic sludge digester",
      text: "Once BOD falls, the effluent goes to a **settling tank** where flocs sediment as **activated sludge**. A **small part** is pumped back into the aeration tank as **inoculum**; the **major part** goes to **anaerobic sludge digesters**, where anaerobic bacteria digest the bacteria and fungi, giving **methane, hydrogen sulphide and \\(\\ce{CO2}\\)** (biogas). The effluent goes into rivers and streams.",
    },
    {
      term: "Biogas and methanogens",
      text: "A mixture of gases, **predominantly methane**, made by microbial activity and used as fuel. Bacteria growing **anaerobically on cellulosic material** make much methane with \\(\\ce{CO2}\\) and \\(\\ce{H2}\\): the **methanogens**, e.g. ***Methanobacterium***, found in anaerobic sludge and the **rumen of cattle**, where they help break down cellulose. So cattle dung (gobar) is rich in them.",
    },
    {
      term: "Biocontrol and the organic farmer",
      text: "**Biocontrol** is the use of biological methods for controlling plant diseases and pests. The organic farmer believes **biodiversity furthers health**: pests are **not eradicated** but kept at manageable levels by checks and balances, since the beneficial **predatory and parasitic insects** that depend on them as food or hosts would not survive without them. Ladybird eats **aphids**; dragonflies, **mosquitoes**.",
    },
    {
      term: "Microbial biocontrol agents",
      text: "***Bacillus thuringiensis* (Bt)**: dried spores in water are sprayed on brassicas and fruit trees; eaten by **butterfly caterpillars**, the **toxin is released in the larval gut** and kills them, sparing other insects. ***Trichoderma***: free-living root fungi, against **plant pathogens**. **Baculoviruses** (genus ***Nucleopolyhedrovirus***): **species-specific, narrow spectrum** insecticides, good for **IPM**.",
    },
    {
      term: "Biofertilisers",
      text: "Organisms that enrich the nutrient quality of the soil. ***Rhizobium***: symbiotic, fixes nitrogen in legume root nodules. ***Azospirillum*, *Azotobacter***: free-living nitrogen fixers. ***Glomus*** (mycorrhiza, a fungus): absorbs **phosphorus** for the plant; the plant also resists root pathogens, salinity and drought. **Cyanobacteria** (*Anabaena, Nostoc, Oscillatoria*): autotrophic nitrogen fixers, used in paddy.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the treatment of sewage in a sewage treatment plant (STP)",
      steps: [
        "**Primary treatment:** floating debris removed by sequential filtration, grit by sedimentation; settled solids are the primary sludge, the supernatant the primary effluent.",
        "**Secondary treatment:** the effluent is aerated and agitated in aeration tanks; aerobic microbes form **flocs** and eat the organic matter, so the **BOD falls**.",
        "In the **settling tank** the flocs sediment as **activated sludge**; a small part returns to the aeration tank as inoculum.",
        "The major part goes to **anaerobic sludge digesters**: anaerobic bacteria digest the bacteria and fungi and release biogas (methane, \\(\\ce{H2S}\\), \\(\\ce{CO2}\\)).",
        "The treated effluent is released into rivers and streams.",
      ],
    },
    {
      title: "Describe how biogas is produced in a biogas plant",
      steps: [
        "A **concrete tank (10 to 15 feet deep)** collects bio-wastes and a **slurry of dung** is fed into it; dung already carries methanogens, so no inoculum is needed.",
        "Methanogens (e.g. *Methanobacterium*) break down the cellulose **anaerobically**, producing methane with \\(\\ce{CO2}\\) and \\(\\ce{H2}\\).",
        "A **floating cover** over the slurry rises as gas collects; an outlet pipe supplies biogas to nearby houses for cooking and lighting.",
        "**Spent slurry** leaves through another outlet and is used as **fertiliser**. Technology developed mainly by **IARI and KVIC**.",
      ],
    },
  ],
  diagrams: [
    {
      title: "A typical biogas plant (Figure 8.8)",
      labels: ["dung and water (slurry) inlet", "digester (concrete tank)", "floating gas holder (cover)", "gas outlet pipe", "sludge (spent slurry) outlet"],
    },
    {
      title: "Stages of sewage treatment (flow chart)",
      labels: ["primary treatment: filtration, sedimentation", "primary sludge and effluent", "aeration tank with flocs", "settling tank: activated sludge", "anaerobic sludge digester: biogas", "effluent to river"],
    },
  ],
  mostAsked: [
    {
      topic: "Microbes in industrial products: organic acids, enzymes and bioactive molecules (statins, cyclosporin A, streptokinase) with their source microbes",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Microbes as biocontrol agents: Bacillus thuringiensis, Trichoderma, Nucleopolyhedrovirus, ladybird; why organic farmers do not eradicate pests",
      marks: 1,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Sewage treatment: primary and secondary treatment, aeration tank, flocs, activated sludge and anaerobic sludge digester",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Biofertilisers: Rhizobium, Azotobacter, Azospirillum, mycorrhiza (Glomus) and cyanobacteria",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Microbes in household products and beverages: LAB in curd, dough, cheese, wine and beer versus distilled drinks",
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "Biogas: methanogens, why cattle dung is used, the biogas plant and its by-products, IARI and KVIC",
      marks: 2,
      years: [2026, 2025, 2024, 2023, 2022],
    },
    {
      topic: "BOD: define it and compare the BOD of river water, untreated sewage and secondary effluent",
      years: [2026, 2025, 2023],
    },
    {
      topic: "Discovery of penicillin by Alexander Fleming",
      marks: 1,
      years: [2026, 2025, 2024],
    },
  ],
  mistakes: [
    {
      title: "Swiss cheese and Roquefort cheese mixed up",
      body: "Swiss cheese holes come from \\(\\ce{CO2}\\) made by a **bacterium**, *Propionibacterium sharmanii*. Roquefort cheese is ripened by a **fungus**.",
    },
    {
      title: "Wrong source microbe",
      body: "**Streptokinase**: *Streptococcus* (not *Streptomyces*). **Cyclosporin A**: the fungus *Trichoderma polysporum*. **Statins**: the yeast *Monascus purpureus*. **Citric acid**: *Aspergillus niger*. **Butyric acid**: *Clostridium butylicum*. Write full scientific names, in italics or underlined.",
    },
    {
      title: "Aerobic and anaerobic steps swapped",
      body: "The **aeration tank** is aerobic (flocs). Biogas forms only in the **anaerobic sludge digester**. Only a **small part** of the activated sludge goes back as inoculum; the **major part** goes to the digester.",
    },
    {
      title: "BOD read the wrong way round",
      body: "More organic matter means **higher BOD** and more pollution. Untreated sewage has the highest BOD, the secondary effluent the lowest; secondary treatment runs **till the BOD is reduced**.",
    },
    {
      title: "Biofertilisers misclassified",
      body: "*Rhizobium* fixes nitrogen but is **not an autotroph** (it is symbiotic); cyanobacteria are the **autotrophic** fixers. *Glomus* (mycorrhiza) does **not** fix nitrogen: it absorbs **phosphorus**.",
    },
    {
      title: "Distilled and undistilled drinks swapped",
      body: "**Wine and beer** are made **without** distillation; **whisky, brandy and rum** **with** distillation of the fermented broth.",
    },
  ],
};

export default sheet;
