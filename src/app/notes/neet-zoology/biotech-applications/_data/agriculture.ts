import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_ZO_BA_AGRICULTURE_NOTE: SubtopicNote = {
  subtopicName: "Biotechnology in Agriculture",
  title: "Biotechnology in Agriculture",
  oneLineDefinition:
    "Why genetically modified crops are grown, how the Bt toxin of Bt cotton kills an insect, which cry gene protects which crop, and how RNA interference protects tobacco from a root nematode.",
  whyItMatters:
    "Ten NEET questions, seven of them from 2024 or later. Five are on the Bt toxin, and the alkaline pH of the insect gut alone decides three of them (NEET 2024, Re-NEET 2024 and Re-NEET 2026). Three are on RNA interference, and two of those turn on one word: the silencing RNA is double stranded. The two biofortification questions are from 2021 and 2022, with none since.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nzoba-gm-plants",
      name: "GM crops and biofortified crops",
      intuition:
        "The Green Revolution raised food output, but not enough for a growing population, and the fertilisers and pesticides it relies on are costly and harmful. One way out is to change a crop's genes so it needs fewer chemicals or gives better food. A plant, bacterium, fungus or animal whose genes have been changed this way is a genetically modified organism (GMO). Biofortification is a related idea from plant breeding: breed crops that carry more nutrients.",
      definition:
        "What NCERT says:\n" +
        "- Three options for raising food production: **agro-chemical based agriculture**, **organic agriculture** and **genetically engineered crop-based agriculture**.\n" +
        "- **Genetically Modified Organisms (GMO):** plants, bacteria, fungi and animals whose genes have been altered by manipulation.\n" +
        "- GM plants have: (i) made crops more **tolerant to abiotic stresses** (cold, drought, salt, heat); (ii) **reduced reliance on chemical pesticides** (pest-resistant crops); (iii) helped to **reduce post-harvest losses**; (iv) **increased efficiency of mineral usage** by plants, which prevents early exhaustion of soil fertility; (v) **enhanced the nutritional value** of food, for example **Golden rice**, a vitamin A enriched rice.\n" +
        "- GM has also been used to make tailor-made plants that supply industries with **starches, fuels and pharmaceuticals**.\n" +
        "- **Biofortification** (from plant breeding): breeding crops with **higher levels of vitamins and minerals, or higher protein and healthier fats**. Its objectives are to improve **protein content and quality, oil content and quality, vitamin content, and micronutrient and mineral content**. Examples: the wheat variety **Atlas 66**, high in protein, used as a donor to improve cultivated wheat; an **iron-fortified rice** with over five times as much iron as common varieties.",
      table: {
        columns: ["Goal", "How biotechnology or breeding meets it", "Example or note"],
        rows: [
          { cells: ["Survive stress", "GM crops tolerant to abiotic stress", "Cold, drought, salt and heat"] },
          { cells: ["Fewer pesticides", "Pest-resistant GM crops", "Bt cotton against bollworms"] },
          { cells: ["Less waste", "GM crops with lower post-harvest losses", "Food lost after harvest is cut down"] },
          { cells: ["Better use of soil minerals", "GM crops that use minerals efficiently", "Soil fertility is not exhausted early"] },
          { cells: ["More nutritious food", "GM crop with an added nutrient", "Golden rice, enriched in vitamin A"] },
          {
            cells: ["More nutrients by breeding", "Biofortification: more protein, oil quality, vitamins, micronutrients and minerals", "Atlas 66 wheat (protein), iron-fortified rice"],
            noteAmber: "NEET 2021: improving resistance to diseases is NOT an objective of biofortification.",
            pyqExampleId: "87f18d0f-7092-4a75-8a9d-1152725b38bd",
          },
        ],
      },
      pyqExampleId: "57d00742-d23b-48db-9dc0-dc3502341da4",
      selfCheckExample: {
        prompt: "A seed company sells a rice variety whose grains were made to carry a vitamin they normally lack, by inserting a gene. Which use of GM plants listed by NCERT is this, and what is the rice called?",
        steps: [
          "NCERT lists enhanced nutritional value of food as one use of GM plants.",
          "Its example is rice enriched in vitamin A.",
        ],
        answer: "Enhanced nutritional value of food; the rice is Golden rice (vitamin A enriched rice).",
      },
      practiceSet: [
        { prompt: "Name the three options NCERT gives for increasing food production.", answer: "Agro-chemical based agriculture, organic agriculture and genetically engineered crop-based agriculture" },
        { prompt: "What is a genetically modified organism (GMO)?", answer: "A plant, bacterium, fungus or animal whose genes have been altered by manipulation" },
        { prompt: "How do GM plants that use minerals efficiently help the soil?", answer: "They prevent early exhaustion of the fertility of the soil" },
        { prompt: "Name the four objectives of breeding crops for improved nutritional quality (biofortification).", answer: "Improving protein content and quality, oil content and quality, vitamin content, and micronutrient and mineral content" },
        { prompt: "Which wheat variety, high in protein, has been used as a donor to improve cultivated wheat?", answer: "Atlas 66" },
      ],
      traps: [
        {
          title: "Biofortification is about nutrition, not disease",
          body: "Biofortification raises **protein, oil quality, vitamins, micronutrients and minerals**. Breeding a crop to **resist disease** is a different aim, so it is the odd one out in an objectives list.",
        },
        {
          title: "Biofortification is not bio-magnification",
          body: "**Biofortification** breeds crops richer in nutrients. **Bio-magnification** is the rise of a toxic substance at each step of a food chain, and **bioremediation** is cleaning pollution with living things. The names look alike; the meanings do not.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-bt-action",
      name: "How the Bt toxin kills an insect",
      visualizationSlug: "neet-bt-toxin",
      intuition:
        "The soil bacterium *Bacillus thuringiensis* makes a poison that kills certain insects, yet the poison does not harm the bacterium itself. The trick is that the bacterium keeps it in an inactive form. Only inside the insect gut, which is alkaline, does the crystal dissolve and the toxin switch on. The active toxin then punches holes in the gut lining. Learn the steps in order, because NEET asks them as a sequence.",
      definition:
        "The Bt toxin, step by step:\n" +
        "- **Bt** is short for *Bacillus thuringiensis*. Some strains make proteins that kill certain insects: **lepidopterans** (tobacco budworm, armyworm), **coleopterans** (beetles) and **dipterans** (flies, mosquitoes).\n" +
        "- During a particular phase of growth, *B. thuringiensis* forms **protein crystals** that contain a **toxic insecticidal protein**.\n" +
        "- In the bacterium the toxin exists as an **inactive protoxin**, which is why it does not kill the *Bacillus*.\n" +
        "- When an insect eats it, the **alkaline pH of the gut solubilises the crystals** and the protoxin is converted into the **active toxin**.\n" +
        "- The active toxin **binds to the surface of the midgut epithelial cells** and **creates pores**, which cause cell **swelling and lysis**, and the insect dies.\n" +
        "- The Bt toxin gene has been cloned from the bacterium and expressed in plants, so the plant resists insects **without insecticides**: it is a **bio-pesticide**. Examples: **Bt cotton, Bt corn, rice, tomato, potato and soyabean**.",
      table: {
        columns: ["Step", "What happens"],
        rows: [
          { cells: ["1", "B. thuringiensis forms protein crystals holding an insecticidal protein"] },
          { cells: ["2", "The toxin stays an inactive protoxin inside the bacterium, so the bacterium is safe"] },
          { cells: ["3", "The insect eats it; the alkaline pH of its gut solubilises the crystals"] },
          {
            cells: ["4", "The protoxin is converted into the active toxin"],
            noteAmber: "Re-NEET 2026: the protoxin becomes active due to alkaline pH, not acidic pH, proteases or nucleases.",
            pyqExampleId: "b559adab-d3a1-4974-a2c2-3ff8af3a9654",
          },
          {
            cells: ["5", "The active toxin binds the midgut epithelial cells and creates pores; the cells swell and burst and the insect dies"],
            noteAmber: "Re-NEET 2024: Bt toxin kills by creating pores in the midgut, not by damaging the respiratory or nervous system.",
            pyqExampleId: "2b34cdb3-4769-4bb2-9e16-d832f5e04332",
          },
        ],
      },
      pyqExampleId: "d0b170dc-1459-47e8-9465-9438bc67e5ec",
      selfCheckExample: {
        prompt: "A student says the Bt bacterium survives its own poison because it has a thick cell wall. What is the reason NCERT gives?",
        steps: [
          "Inside the bacterium the Bt toxin protein exists as an inactive protoxin.",
          "It becomes active only after the alkaline pH of an insect gut solubilises the crystal.",
        ],
        answer: "The toxin is held as an inactive protoxin, so it cannot harm the bacterium; the cell wall is not the reason.",
      },
      practiceSet: [
        { prompt: "Name the three insect groups that some strains of Bacillus thuringiensis kill, with an NCERT example of each.", answer: "Lepidopterans (tobacco budworm, armyworm), coleopterans (beetles) and dipterans (flies, mosquitoes)" },
        { prompt: "In which form does B. thuringiensis store its insecticidal protein?", answer: "As protein crystals holding an inactive protoxin" },
        { prompt: "Which cells of an insect does the activated Bt toxin bind to?", answer: "The epithelial cells of the midgut" },
        { prompt: "Why is a Bt crop called a bio-pesticide?", answer: "The plant itself makes the insect-killing Bt toxin, so it resists insects without chemical insecticides" },
        { prompt: "Name four crops besides cotton into which a Bt toxin gene has been put, as listed by NCERT.", answer: "Corn, rice, tomato, potato and soyabean (any four)" },
      ],
      traps: [
        {
          title: "The insect gut is alkaline",
          body: "The protoxin turns active because of the **alkaline** pH of the insect gut. A statement saying **acidic** pH is false, and so is one naming proteases or nucleases as the trigger.",
        },
        {
          title: "Crystals first, then pH, then activation",
          body: "The order is: the bacterium forms crystals, the toxin sits there as a protoxin, the alkaline gut **solubilises the crystals**, the protoxin becomes active, and the toxin makes **pores in the midgut**. A sequence that activates the toxin before the crystal dissolves is wrong.",
        },
        {
          title: "Bt toxin bursts gut cells",
          body: "The active toxin creates **pores in midgut epithelial cells**, so they swell and lyse. It does not attack the nervous or respiratory system or change body-fluid pH.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-cry-genes",
      name: "The cry genes and the pests they control",
      intuition:
        "Most Bt toxins work only on one group of insects, so the gene put into a crop is chosen to match that crop and its pest. The toxin genes are called cry genes. NEET asks you to match the gene to the pest, and the names differ by a single letter or numeral, so learn them exactly.",
      definition:
        "Cry genes:\n" +
        "- Specific Bt toxin genes were isolated from *Bacillus thuringiensis* and put into several crop plants such as cotton.\n" +
        "- **Most Bt toxins are insect-group specific**, so the choice of gene depends on the **crop and the targeted pest**.\n" +
        "- The toxin is coded by genes named **cry**. There are many of them.\n" +
        "- The proteins encoded by **cryIAc** and **cryIIAb** control the **cotton bollworms**.\n" +
        "- The protein encoded by **cryIAb** controls the **corn borer**.",
      table: {
        columns: ["Gene", "Pest it controls"],
        rows: [
          { cells: ["cryIAc", "Cotton bollworms"] },
          { cells: ["cryIIAb", "Cotton bollworms"] },
          {
            cells: ["cryIAb", "Corn borer"],
            noteAmber: "NEET 2026: the genes for cotton bollworms and corn borer, in that order, are cryIAc and cryIAb.",
            pyqExampleId: "57611761-a79b-41f1-a753-0a04540551f5",
          },
        ],
      },
      pyqExampleId: "6c183bd6-fa74-4cf1-8f61-86a780b5f0bf",
      selfCheckExample: {
        prompt: "A farmer grows maize and wants a Bt crop that resists the corn borer. Which cry gene should the crop carry?",
        steps: [
          "Bt toxins are insect-group specific, so the gene must match the pest.",
          "The protein of cryIAb controls the corn borer.",
        ],
        answer: "cryIAb.",
      },
      practiceSet: [
        { prompt: "Name the two cry genes whose proteins control cotton bollworms.", answer: "cryIAc and cryIIAb" },
        { prompt: "From which bacterium were the cry genes put into Bt crops isolated?", answer: "Bacillus thuringiensis" },
        { prompt: "What are the genes that code the Bt toxin called?", answer: "cry genes" },
      ],
      traps: [
        {
          title: "cryIAb is for corn, not cotton",
          body: "**cryIAc** and **cryIIAb** control **cotton bollworms**; **cryIAb** controls the **corn borer**. Options swap the Ac and Ab endings, or the I and II, to catch a hurried reader.",
        },
        {
          title: "One Bt gene does not kill every pest",
          body: "Most Bt toxins are **insect-group specific**. A statement that a single Bt gene controls all insect pests on all crops is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nzoba-rnai",
      name: "RNA interference and nematode-resistant tobacco",
      intuition:
        "A tiny root worm, a nematode, attacks tobacco roots and cuts the yield. Scientists used a defence that all eukaryotic cells already have: a double-stranded RNA that matches an mRNA switches that mRNA off. They made the tobacco plant produce double-stranded RNA matching a nematode gene. When the nematode feeds, its own gene is silenced and it dies.",
      definition:
        "RNAi, as NCERT gives it:\n" +
        "- The nematode *Meloidogyne incognita* (NCERT prints it as *Meloidegyne incognitia*) infects the **roots of tobacco** plants and greatly reduces yield.\n" +
        "- **RNA interference (RNAi)** takes place in **all eukaryotic organisms** as a method of **cellular defence**.\n" +
        "- It is the **silencing of a specific mRNA** by a **complementary dsRNA** molecule that binds to the mRNA and **prevents its translation**.\n" +
        "- The complementary RNA may come from an infection by **viruses with RNA genomes**, or from **mobile genetic elements (transposons)** that replicate via an **RNA intermediate**.\n" +
        "- Using **Agrobacterium vectors**, **nematode-specific genes** were introduced into the host plant.\n" +
        "- The introduced DNA produced **both sense and anti-sense RNA** in the host cells. Being complementary, the two formed **dsRNA**, which started RNAi and silenced the specific mRNA of the nematode.\n" +
        "- The parasite could not survive in a transgenic host that makes this interfering RNA, so the plant was protected.",
      table: {
        columns: ["Point", "Fact"],
        rows: [
          { cells: ["Pest", "Meloidogyne incognita, a nematode that infects tobacco roots"] },
          { cells: ["Where RNAi occurs", "All eukaryotic organisms, as cellular defence"] },
          {
            cells: ["What silences the mRNA", "A complementary double-stranded RNA (dsRNA) that blocks translation"],
            noteAmber: "Re-NEET 2024: a statement saying a single-stranded RNA does the silencing is false.",
            pyqExampleId: "c2686b27-d725-4c73-9992-387ed755c99d",
          },
          {
            cells: ["Source of the complementary RNA", "Viruses with RNA genomes, or transposons that replicate via an RNA intermediate"],
            noteAmber: "NEET 2022: transposons can be used in gene silencing.",
            pyqExampleId: "c462c261-4575-49db-b6f1-27e9e9189e94",
          },
          { cells: ["Vector used", "Agrobacterium, carrying nematode-specific genes"] },
          { cells: ["What the host makes", "Sense and anti-sense RNA, which pair into dsRNA"] },
        ],
      },
      pyqExampleId: "30343a21-c403-4d15-919b-0284c376ed6a",
      selfCheckExample: {
        prompt: "In the transgenic tobacco that resists the root nematode, the introduced DNA makes two RNAs in the plant cells. What are they, and what do they form together?",
        steps: [
          "The DNA produces both sense and anti-sense RNA.",
          "The two are complementary, so they pair into a double-stranded RNA that starts RNAi.",
        ],
        answer: "Sense and anti-sense RNA; together they form dsRNA.",
      },
      practiceSet: [
        { prompt: "Which part of the tobacco plant does the nematode Meloidogyne incognita infect?", answer: "The roots" },
        { prompt: "Which vector was used to put nematode-specific genes into tobacco?", answer: "Agrobacterium" },
        { prompt: "In which organisms does RNA interference take place, and as what?", answer: "In all eukaryotic organisms, as a method of cellular defence" },
        { prompt: "Name two possible sources of the complementary RNA used in RNAi.", answer: "Viruses with RNA genomes, and mobile genetic elements (transposons) that replicate via an RNA intermediate" },
        { prompt: "Why can the nematode not survive on the transgenic tobacco?", answer: "The plant makes interfering dsRNA that silences a specific mRNA of the nematode" },
      ],
      traps: [
        {
          title: "RNAi uses double-stranded RNA",
          body: "The silencing molecule is a **complementary dsRNA**. A statement naming single-stranded RNA, single-stranded DNA or tRNA is false.",
        },
        {
          title: "Transposons belong in RNAi",
          body: "Transposons that replicate via an RNA intermediate can be the **source of the complementary RNA** for RNAi, so they are linked with **gene silencing**, not with PCR, autoradiography or sequencing.",
        },
        {
          title: "The tobacco is protected by RNA, not a toxin",
          body: "Bt crops make a **toxic protein**. The nematode-resistant tobacco makes **sense and anti-sense RNA** that silence the parasite's mRNA. Do not mix the two methods.",
        },
      ],
    },
  ],
};
