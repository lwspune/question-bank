import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 5 Life Processes. Statements checked against the
 * NCERT text (definitions in the book's own words). Most-asked years and marks
 * from all 170 CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Life Processes",
  chapterSlug: "life-processes",
  source: "NCERT Science (CBSE Class 10), Chapter 5",
  keyPoints: [
    {
      term: "Autotrophic and heterotrophic nutrition",
      text: "**Autotrophs** (green plants, some bacteria) make food from simple inorganic substances using sunlight. **Heterotrophs** (animals, fungi) take in complex food made by others, so they depend on autotrophs. Fungi break food down outside the body and absorb it (saprophytic); Cuscuta is a parasite.",
    },
    {
      term: "Events of photosynthesis",
      text: "(i) Absorption of light energy by chlorophyll. (ii) Conversion of light energy to chemical energy and splitting of water into hydrogen and oxygen. (iii) Reduction of carbon dioxide to carbohydrates. Desert plants take in \\(\\ce{CO2}\\) at night and use the energy absorbed in the day. Extra glucose is stored as starch.",
    },
    {
      term: "Stomata",
      text: "Tiny pores on the leaf for gaseous exchange. Their opening and closing is a function of the **guard cells**: water flows into them, they swell and the pore opens; they shrink and it closes. The pore closes when the plant does not need \\(\\ce{CO2}\\), to save water.",
    },
    {
      term: "Nutrition in Amoeba",
      text: "Amoeba takes in food using temporary finger-like extensions of the cell surface (pseudopodia) that fuse over the food to form a **food vacuole**. The food is broken down inside it and diffuses into the cytoplasm; undigested matter is thrown out at the surface. Paramecium uses cilia to move food to a fixed spot.",
    },
    {
      term: "Mouth and stomach",
      text: "Saliva contains **salivary amylase**, which breaks starch into sugar. Gastric glands release hydrochloric acid, pepsin (digests protein) and mucus. The acid makes the medium acidic for pepsin; mucus protects the stomach lining from the acid. A sphincter muscle lets food into the small intestine a little at a time.",
    },
    {
      term: "Small intestine",
      text: "Bile from the liver makes the food alkaline and its salts emulsify fats into small globules. Pancreatic juice has trypsin (proteins) and lipase (fats). Intestinal juice completes digestion: proteins to amino acids, carbohydrates to glucose, fats to fatty acids and glycerol. Villi increase the surface area for absorption. Herbivores have a longer small intestine to digest cellulose.",
    },
    {
      term: "Respiration: breakdown of glucose",
      text: "First step, in the cytoplasm: glucose (six-carbon) to pyruvate (three-carbon). With oxygen, in mitochondria: pyruvate to \\(\\ce{CO2}\\), water and much energy (aerobic). Without oxygen in yeast: ethanol and \\(\\ce{CO2}\\) (fermentation). Lack of oxygen in muscles: lactic acid, which causes cramps. The energy is stored as **ATP**, the energy currency of the cell.",
    },
    {
      term: "Human respiratory system",
      text: "Nostrils (fine hairs and mucus filter air), pharynx, trachea (rings of cartilage stop it collapsing), bronchi, bronchioles, alveoli. Breathing in: ribs lift, diaphragm flattens, chest cavity grows. The alveoli provide a large surface for gas exchange and are richly supplied with blood capillaries. Lungs always keep a residual volume of air.",
    },
    {
      term: "Breathing rate and haemoglobin",
      text: "Water holds much less dissolved oxygen than air, so aquatic organisms breathe much faster. In large animals diffusion alone is too slow, so the respiratory pigment **haemoglobin** in red blood cells, with a very high affinity for oxygen, carries it. \\(\\ce{CO2}\\) is more soluble and is carried mostly dissolved in plasma.",
    },
    {
      term: "Heart and double circulation",
      text: "Four chambers: deoxygenated blood from the body enters the right atrium, goes to the right ventricle and to the lungs; oxygenated blood returns to the left atrium, then the left ventricle pumps it to the body. Blood passes through the heart twice in one cycle: **double circulation**. Valves stop backflow. Ventricles have thicker walls. Amphibians and reptiles have three chambers; fish two.",
    },
    {
      term: "Blood vessels, platelets and lymph",
      text: "Arteries carry blood away from the heart under high pressure: thick, elastic walls. Veins bring blood back: thin walls, valves. Capillaries have one-cell-thick walls for exchange. Platelets plug leaks by clotting. Lymph (tissue fluid) carries digested fat from the intestine and drains excess fluid back into the blood.",
    },
    {
      term: "Transport in plants",
      text: "**Xylem** moves water and minerals from the roots; vessels and tracheids form continuous channels. Transpiration (loss of water vapour from aerial parts) creates a suction that pulls water up, helps absorb minerals and controls temperature. **Phloem** carries food: translocation, using energy from ATP, in sieve tubes with companion cells, upwards and downwards.",
    },
    {
      term: "Excretion in human beings",
      text: "Excretion removes harmful metabolic wastes. Each kidney has many **nephrons**, the filtration units. Blood enters by the renal artery; the glomerulus (a cluster of thin-walled capillaries) filters it into Bowman's capsule. Glucose, amino acids, salts and much water are selectively reabsorbed in the tubule. Urine goes by the ureter to the urinary bladder, then the urethra.",
    },
    {
      term: "Excretion in plants",
      text: "Plants get rid of oxygen and excess water by transpiration, store wastes in leaves that fall off and in vacuoles, store resins and gums in old xylem, and excrete some wastes into the soil around them.",
    },
  ],
  formulas: [
    { label: "Photosynthesis", latex: "\\ce{6CO2 + 12H2O ->[\\text{chlorophyll}][\\text{sunlight}] C6H12O6 + 6O2 + 6H2O}" },
    { label: "Aerobic respiration", latex: "\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O} + \\text{energy}" },
    { label: "First step (in cytoplasm)", latex: "\\text{Glucose (6 C)} \\longrightarrow \\text{Pyruvate (3 C)} + \\text{energy}" },
    { label: "Aerobic (in mitochondria)", latex: "\\text{Pyruvate} \\xrightarrow{\\text{oxygen}} \\ce{CO2} + \\ce{H2O} + \\text{energy}" },
    { label: "Anaerobic in yeast", latex: "\\text{Pyruvate} \\xrightarrow{\\text{absence of oxygen}} \\text{Ethanol} + \\ce{CO2} + \\text{energy}" },
    { label: "Lack of oxygen in muscle", latex: "\\text{Pyruvate} \\xrightarrow{\\text{lack of oxygen}} \\text{Lactic acid} + \\text{energy}" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Open and closed stomatal pore (Figure 5.3)",
      labels: ["guard cells", "stomatal pore", "chloroplast", "nucleus", "epidermal cells"],
    },
    {
      title: "Human alimentary canal (Figure 5.6)",
      labels: ["mouth, salivary glands", "oesophagus", "stomach, liver, gall bladder", "pancreas", "small and large intestine", "anus"],
    },
    {
      title: "Human respiratory system (Figure 5.9)",
      labels: ["nasal passage", "trachea with rings of cartilage", "bronchi, bronchioles", "lungs, alveoli", "diaphragm", "ribs"],
    },
    {
      title: "Sectional view of the human heart (Figure 5.10)",
      labels: ["right and left atrium", "right and left ventricle", "aorta, pulmonary artery", "pulmonary veins, vena cava", "valves"],
    },
    {
      title: "Structure of a nephron (Figure 5.14)",
      labels: ["Bowman's capsule", "glomerulus", "tubule", "renal artery and vein", "collecting duct"],
    },
    {
      title: "Excretory system in human beings (Figure 5.13)",
      labels: ["kidneys", "ureters", "urinary bladder", "urethra", "aorta and vena cava"],
    },
  ],
  mostAsked: [
    {
      topic: "Nutrition and human digestion: Amoeba and other modes; saliva, gastric juice, bile, pancreatic juice, villi, peristalsis, longer intestine in herbivores",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Photosynthesis and stomata: events in order, the equation, opening and closing of stomata, desert plants, experiments for light, chlorophyll and \\(\\ce{CO2}\\)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Circulation: double circulation, chambers and valves of the heart, arteries, veins and capillaries, platelets, lymph",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Excretion: nephron structure and urine formation, Bowman's capsule, path of urine, excretion in plants",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Respiration: pathways of glucose breakdown, aerobic and anaerobic, muscle cramps, ATP",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Human respiratory system: labelled diagram, rings of cartilage, diaphragm and ribs, alveoli, residual air, haemoglobin, faster breathing in aquatic animals",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Transport in plants: xylem and phloem, transpiration pull, translocation",
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Events of photosynthesis out of order",
      body: "Write them in order: absorption of light by chlorophyll, then conversion of light energy to chemical energy with splitting of water, then reduction of \\(\\ce{CO2}\\) to carbohydrate. The oxygen given out comes from water.",
    },
    {
      title: "Wrong side of the heart",
      body: "The **right** side handles deoxygenated blood (body to lungs); the **left** side handles oxygenated blood (lungs to body). The pulmonary vein carries oxygenated blood; the pulmonary artery carries deoxygenated blood.",
    },
    {
      title: "Giving arteries the valves",
      body: "Veins have valves (blood at low pressure). Arteries have thick elastic walls (blood at high pressure). Capillaries have walls one cell thick.",
    },
    {
      title: "Saying bile digests fat",
      body: "Bile has **no enzyme**. It makes the food alkaline for pancreatic enzymes and its salts break fat into small globules (emulsification), so lipase works better.",
    },
    {
      title: "Mixing the anaerobic products",
      body: "Yeast: ethanol + \\(\\ce{CO2}\\). Our muscles: lactic acid, no \\(\\ce{CO2}\\). The first step, glucose to pyruvate, happens in the cytoplasm in every case; only aerobic respiration uses the mitochondria.",
    },
    {
      title: "Transpiration and translocation",
      body: "Transpiration is loss of water vapour (xylem side, no energy needed). Translocation is movement of food in the **phloem** and uses energy from ATP.",
    },
  ],
};

export default sheet;
