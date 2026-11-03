import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 11 Enhancement of Food Production. Definitions and
 * examples checked against the Balbharati text (wordings are the book's own,
 * trimmed); most-asked years from the 14 board past-paper questions in the
 * bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Enhancement of Food Production",
  chapterSlug: "enhancement-of-food-production",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 11",
  keyPoints: [
    {
      term: "Plant breeding",
      text: "The improvement or purposeful manipulation in the heredity of crops and the production of new superior varieties of existing crop plants. Aims: higher yield, better quality, tolerance to stress, resistance to pathogens and pests. Methods: introduction, selection, hybridisation, mutation breeding, polyploidy, tissue culture, rDNA technology.",
    },
    {
      term: "Indian hybrid crops",
      text: "**Wheat:** Sonalika, Kalyan Sona (semi dwarf, from Borlaug's work). **Rice:** Jaya, Padma, **Ratna** (semi dwarf, from IR 8 and Taichung native 1). **Maize:** Ganga 3. **Jowar:** CO 12. **Bajra:** Niphad. These millets are high yielding and resistant to water stress.",
    },
    {
      term: "Sugarcane varieties",
      text: "*Saccharum barberi* is native to **North India**; *S. officinarum* belongs to **South India** (thicker stem, high sugar, but grows poorly in the north). The two were crossed; high yielding, high sugar varieties CO 419, 421, 453 were developed at **Coimbatore** (Tamil Nadu).",
    },
    {
      term: "Tissue culture and explant",
      text: "Isolated cells, tissues or organs grown in vitro on a nutrient medium under aseptic, controlled conditions. The part of the plant used is the **explant**. It rests on **totipotency**: the ability of a living plant cell to divide and give rise to a whole plant (Haberlandt, 1902). Common medium: MS (Murashige and Skoog).",
    },
    {
      term: "Callus and suspension culture",
      text: "**Callus:** a mass of undifferentiated cells formed when explant cells divide and redivide on a **solid** medium; it can be induced to form roots (rhizogenesis) and shoots (caulogenesis). **Suspension culture:** single cells or small groups in a **liquid** medium kept agitated by shakers.",
    },
    {
      term: "Advantages of micropropagation",
      text: "Rapid multiplication of plants; many plantlets in a short time and small space; plants all year round, independent of seasons; genetically identical clones, so desirable characters stay constant; rare and endangered species can be multiplied and saved.",
    },
    {
      term: "Single cell protein (SCP)",
      text: "Crude or refined edible protein extracted from pure microbial cultures or dead or dried cell biomass. Microbes used: **algae** (*Spirulina*, *Chlorella pyrenoidosa*), fungi (*Aspergillus niger*, *Trichoderma viride*), yeast (*Saccharomyces cerevisiae*, *Candida utilis*), bacteria (*Methylophilus methylotrophus*).",
    },
    {
      term: "Lac culture",
      text: "Lac is a resin secreted by the dermal glands of the female lac insect *Tachardia lacca*, feeding on twigs of ber, peepal, palas, kusum. Shellac is the purified form. India gives 85% of world lac. Uses: bangles, toys, woodwork, inks, mirrors; it supports farmers' income.",
    },
    {
      term: "Microbes in industry",
      text: "**Beverages:** brewer's yeast *Saccharomyces cerevisiae* var. *ellipsoidis* ferments malted cereals and fruit juices to ethanol; wine and beer are undistilled, whisky, brandy and rum distilled. **Antibiotics:** chloromycetin from *Streptomyces venezuelae*, streptomycin from *S. griseus*, penicillin from *Penicillium chrysogenum*.",
    },
    {
      term: "Biogas",
      text: "A mixture of methane (50 to 60%), \\(\\ce{CO2}\\) (30 to 40%), \\(\\ce{H2S}\\) (0 to 3%) and traces of CO, \\(\\ce{N2}\\), \\(\\ce{H2}\\), made by anaerobic microbial fermentation, mostly of cattle dung. **Benefits:** cheap, safe, renewable; used for lighting and cooking; burns with a blue flame without smoke; improves sanitation; eco friendly; the sludge is a fertilizer.",
    },
    {
      term: "Mycoherbicides",
      text: "Pathogenic fungi used to kill weeds. *Phytophthora palmivora* controls milkweed in orchards; *Alternaria crassa* controls water hyacinth; *Fusarium* spp. control most weeds.",
    },
    {
      term: "Biofertilizers",
      text: "Commercial, ready to use live bacterial or fungal formulations which, applied to plant, soil or compost pits, enrich soil fertility by their biological activity. Mostly \\(\\ce{N2}\\) fixing: *Rhizobium* in root nodules of legumes, *Azospirillum*, cyanobacteria. Low cost, free from pollution, raise soil fertility.",
    },
    {
      term: "Azolla and Anabaena",
      text: "*Azolla* is a free floating water fern. In the dorsal lobe of its leaf, filaments of the cyanobacterium *Anabaena* fix nitrogen (in heterocysts). So Azolla is used as a **biofertilizer in rice fields**.",
    },
    {
      term: "Mycorrhiza",
      text: "A symbiotic association of a fungus with roots or rhizomes of higher plants. **Ectomycorrhizae:** mycelium forms a mantle outside the root. **Endomycorrhizae:** hyphae grow within cortical cells, forming arbuscules and vesicles. **Benefits:** selective absorption of P, Zn, Cu and other minerals; more water uptake; growth hormones; antibiotics protect the host.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Steps of hybridization in plant breeding",
      steps: [
        "Collect variability from the germ plasm; evaluate and select parents with different qualities, selfed to make them true breeding.",
        "Collect pollen from the male parent; remove stamens from the flowers of the female parent (emasculation).",
        "Artificially cross pollinate with the collected pollen, then bag and tag the emasculated flower.",
        "Seeds give the F1 hybrid; select and test F1 hybrids for the desired combination of characters.",
        "Field trials for yield in different agroclimatic zones; test and release the new variety to farmers.",
      ],
    },
    {
      title: "Steps in plant tissue culture (callus culture)",
      steps: [
        "Clean and sterilise glassware; prepare MS medium and sterilise it in an autoclave (15 lb per square inch, 20 minutes).",
        "Isolate the explant from the stock plant and surface sterilise it (ethyl alcohol, \\(\\ce{HgCl2}\\)).",
        "Inoculate the explant on the medium in a laminar air flow; incubate at controlled temperature and light.",
        "Explant cells divide into a callus; growth hormones induce shoots and roots (organogenesis) to form plantlets.",
        "Harden the plantlets and transfer them to the field.",
      ],
    },
    {
      title: "Explain the steps of sewage treatment",
      steps: [
        "**Preliminary:** screening removes large floating and suspended objects; grit chambers with pebbles and brick ballast let coarse particles settle.",
        "**Primary (physical):** in the primary sedimentation tank 50 to 70% of solids settle as primary sludge.",
        "**Secondary (biological):** in aeration tanks aerobic bacteria form flocs and consume organic matter, so BOD falls sharply.",
        "**Tertiary:** flocs settle as activated sludge; part returns to the aeration tank, the rest is digested by anaerobic bacteria, giving biogas.",
      ],
    },
    {
      title: "Production of biogas in a biogas plant",
      steps: [
        "Cattle dung mixed with an equal amount of water (slurry) is fed into the digester.",
        "**Hydrolysis:** anaerobic bacteria break carbohydrates, proteins and fats into simple sugars, amino acids and fatty acids.",
        "**Acidogenesis:** acidogenic bacteria turn these into acetic and formic acids, \\(\\ce{H2}\\) and \\(\\ce{CO2}\\).",
        "**Methanogenesis:** methanogens (*Methanobacterium*, *Methanococcus*) convert them into methane; the gas collects in the gas holder.",
      ],
    },
  ],
  diagrams: [
    { title: "T.S. of root nodule", labels: ["root nodule", "bacterial colonies in cortical cells", "root xylem", "phloem"] },
    { title: "Steps in plant tissue culture (callus culture)", labels: ["mother plant", "explant", "callus", "shoot and root (organogenesis)", "multiple plants", "hardening"] },
    { title: "Biogas plant", labels: ["dung water", "charge pit", "digester", "gas holder", "biogas (CH₄ + CO₂)", "sludge"] },
    { title: "Stages in wastewater treatment", labels: ["screening and grit setting", "primary treatment", "aeration tank (aerobic bacteria)", "activated sludge", "anaerobic digester", "water to recycle"] },
    { title: "L.S. of Azolla leaf showing Anabaena", labels: ["dorsal lobe", "cavity with Anabaena filaments", "photosynthetic zone"] },
  ],
  mostAsked: [
    { topic: "Biofertilizers: definition, T.S. of root nodule, Azolla for rice, mycorrhiza", years: [2026, 2025, 2024] },
    { topic: "Tissue culture: explant, callus, advantages of micropropagation", years: [2026, 2025] },
    { topic: "Plant breeding: hybrid crop varieties, sugarcane species and Coimbatore", years: [2026, 2025] },
    { topic: "Microbes in industry: yeast for beverages, source of chloromycetin", years: [2026, 2024] },
    { topic: "Biogas and sewage treatment: composition, benefits, preliminary treatment", years: [2026, 2024] },
    { topic: "Identify an alga among given microbes (Spirulina, Chlorella)", years: [2026] },
    { topic: "Mycoherbicides: Phytophthora, Alternaria, Fusarium", years: [2024] },
    { topic: "Lac and its economic importance", years: [2024] },
  ],
  mistakes: [
    {
      title: "Mixing up the hybrid varieties",
      body: "Ganga 3 is **maize**, CO 12 is **jowar**, Niphad is **bajra**, Ratna is **rice**. Sonalika and Kalyan Sona are wheat.",
    },
    {
      title: "Swapping the sugarcane species",
      body: "*S. barberi* is the **North** Indian species; *S. officinarum* the **South** Indian one. The high sugar varieties came from Coimbatore.",
    },
    {
      title: "Explant and callus confused",
      body: "The **explant** is the piece of plant put on the medium; the **callus** is the undifferentiated mass of cells it forms.",
    },
    {
      title: "Preliminary is not primary treatment",
      body: "Preliminary treatment is **screening and grit chambers** only. Settling in the sedimentation tank is primary treatment.",
    },
    {
      title: "Azolla does not fix nitrogen itself",
      body: "Azolla is a fern; the nitrogen is fixed by *Anabaena* living in its leaf cavities. Name both.",
    },
    {
      title: "Wrong Streptomyces",
      body: "Chloromycetin comes from *Streptomyces venezuelae*; *S. griseus* gives streptomycin, *S. erythreus* erythromycin.",
    },
  ],
};

export default sheet;
