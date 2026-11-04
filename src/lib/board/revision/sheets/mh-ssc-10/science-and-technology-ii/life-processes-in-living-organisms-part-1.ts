import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 2 Life Processes in Living
 * Organisms Part 1. Statements checked against the Balbharati text; the
 * respiration equations are rebuilt (the book states the products in words);
 * most-asked years from the board past papers in the bank. Excretion,
 * transpiration, osmosis and diffusion (2016 to 2018) are not taught in the
 * current book and are left out.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Life Processes in Living Organisms Part 1",
  chapterSlug: "life-processes-in-living-organisms-part-1",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Cellular respiration",
      text: "Glucose is oxidized step by step in the cells to give energy as ATP. Two methods: **aerobic** (oxygen is involved) and **anaerobic** (oxygen is not involved).",
    },
    {
      term: "Glycolysis",
      text: "Occurs in the **cytoplasm**. One glucose gives two molecules each of pyruvic acid, ATP, NADH2 and water. Pyruvic acid then becomes acetyl-CoA, releasing 2 NADH2 and 2 CO2. Also called the EMP pathway.",
    },
    {
      term: "Krebs cycle (TCA cycle)",
      text: "Acetyl-CoA enters the **mitochondria**; its acetyl part is completely oxidized in a cyclic chain of reactions, giving CO2, H2O, NADH2 and FADH2. Discovered by Sir Hans Krebs (Nobel Prize 1953).",
    },
    {
      term: "Electron transfer chain",
      text: "Runs in mitochondria only. Each NADH2 gives **3 ATP**, each FADH2 gives **2 ATP**; water is also formed. Complete oxidation of one glucose gives **38 ATP** in all.",
    },
    {
      term: "ATP: energy currency",
      text: "Adenosine triphosphate: adenine, ribose sugar and three phosphate groups. Energy is stored in the phosphate bonds and released by breaking them (ATP to ADP), so ATP is the energy currency of the cell.",
    },
    {
      term: "Anaerobic respiration",
      text: "Glycolysis and **fermentation**: glucose is incompletely oxidized, less energy is obtained. Pyruvic acid becomes other organic acids or alcohol. Muscle cells during exercise and seeds in waterlogged soil respire anaerobically.",
    },
    {
      term: "Energy per gram",
      text: "Carbohydrates **4 kcal**, proteins **4 kcal**, lipids **9 kcal**. Excess carbohydrate is stored as glycogen in liver and muscles; excess lipid in adipose tissue.",
    },
    {
      term: "Proteins",
      text: "Macromolecules of many amino acids. Animal proteins are first class proteins. Blood: haemoglobin, antibodies. Skin: melanin, keratin. Bones: **ossein**. Muscles: actin, myosin. Pancreas: **insulin**, trypsin.",
    },
    {
      term: "Lipids",
      text: "Formed by a specific bond between fatty acids and alcohol. Fatty acids make **phospholipids** for the plasma membrane, hormones (progesterone, estrogen, testosterone) and the covering of axons.",
    },
    {
      term: "Vitamins",
      text: "Heterogeneous compounds, each essential for body processes. Six main types: A, B, C, D, E, K. **Fat-soluble**: A, D, E, K. **Water-soluble**: B, C. Vitamins B2 and B3 are needed to make FADH2 and NADH2.",
    },
    {
      term: "Water and fibres",
      text: "The body is 65 to 70% water, so water is an essential nutrient. **Fibres** cannot be digested, but they help digestion of other substances and egestion of undigested matter. Sources: leafy vegetables, fruits, cereals.",
    },
    {
      term: "Mitosis and meiosis",
      text: "**Mitosis** occurs in somatic cells and stem cells; needed for growth, wound healing and blood cell formation. **Meiosis** occurs in germ cells: one diploid (2n) cell gives four haploid (n) cells, all genetically different.",
    },
    {
      term: "Meiosis",
      text: "Two stages. **Meiosis I**: crossing over between homologous chromosomes, which then separate into two haploid cells. **Meiosis II** is just like mitosis and gives four haploid cells. Gametes and spores form by meiosis.",
    },
  ],
  formulas: [
    {
      label: "Aerobic respiration (overall)",
      latex: "\\ce{C6H12O6 + 6O2 -> 6CO2 + 6H2O} + \\text{energy (38 ATP)}",
    },
    {
      label: "Anaerobic respiration in muscle cells",
      latex: "\\ce{C6H12O6 -> 2C3H6O3} \\;(\\text{lactic acid}) + \\text{less energy}",
    },
    {
      label: "Fermentation by yeast",
      latex: "\\ce{C6H12O6 -> 2C2H5OH + 2CO2} + \\text{less energy}",
    },
  ],
  derivations: [
    {
      title: "Explain the process of glycolysis",
      steps: [
        "First step of aerobic respiration; occurs in the cytoplasm.",
        "One glucose molecule is oxidized step by step into two molecules each of pyruvic acid, ATP, NADH2 and water.",
        "The two pyruvic acid molecules are converted into acetyl-CoA, releasing two NADH2 and two CO2.",
        "Discovered by Embden, Meyerhof and Parnas, so it is also called the EMP pathway.",
      ],
    },
    {
      title: "Explain mitosis with diagrams (four stages of karyokinesis)",
      steps: [
        "**Prophase**: chromosomes condense, become short and thick; centrioles move to opposite poles; nuclear membrane and nucleolus start to disappear.",
        "**Metaphase**: nuclear membrane disappears; chromosomes line up on the equatorial plane; spindle fibres form between centromeres and centrioles.",
        "**Anaphase**: centromeres split, sister chromatids are pulled to opposite poles (like a bunch of bananas).",
        "**Telophase**: chromosomes decondense, nuclear membrane and nucleolus reappear, two daughter nuclei form, spindle fibres disappear.",
        "**Cytokinesis**: a notch at the equator in animal cells, a cell plate in plant cells, gives two daughter cells.",
      ],
    },
    {
      title: "How is energy formed from oxidation of carbohydrates, fats and proteins?",
      steps: [
        "Carbohydrates: glucose, by glycolysis, to pyruvic acid, then to acetyl-CoA.",
        "Lipids are converted to fatty acids, proteins to amino acids; both are converted to acetyl-CoA.",
        "Acetyl-CoA is completely oxidized in the Krebs cycle in mitochondria, giving CO2, H2O and energy.",
        "Lipids and proteins are used when carbohydrates are short (fasting or hunger).",
      ],
    },
    {
      title: "Distinguish between aerobic and anaerobic respiration",
      steps: [
        "Aerobic: oxygen is used; anaerobic: oxygen is not used.",
        "Aerobic: glucose is completely oxidized to CO2 and H2O; anaerobic: incompletely oxidized to alcohol or organic acids (lactic acid).",
        "Aerobic: more energy (38 ATP); anaerobic: less energy.",
        "Aerobic: cytoplasm and mitochondria; anaerobic: glycolysis then fermentation, e.g. yeast, many bacteria, muscle cells in exercise.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Mitosis (Fig. 2.6)",
      labels: ["prophase", "metaphase (chromosomes on equator)", "anaphase (chromatids to poles)", "telophase (two nuclei)", "spindle fibres, centrioles"],
    },
    {
      title: "Chromosome (Fig. 2.5)",
      labels: ["centromere", "sister chromatids", "p-arm (short arm)", "q-arm (long arm)"],
    },
    {
      title: "Mitochondria and TCA cycle (Fig. 2.2)",
      labels: ["outer membrane", "inner membrane", "mitochondrial matrix", "acetyl CoA into TCA cycle"],
    },
    {
      title: "Energy from carbohydrates, lipids and proteins (chart)",
      labels: ["lipids to fatty acids", "carbohydrates, glycolysis, pyruvic acid", "proteins to amino acids", "acetyl-CoA", "Krebs cycle", "CO2 + H2O + energy"],
    },
  ],
  mostAsked: [
    { topic: "Aerobic and anaerobic respiration: distinguish; why we feel tired after exercise; why higher plants and animals respire anaerobically", marks: 2, years: [2026, 2025, 2024, 2023, 2020, 2016] },
    { topic: "Cell division: where mitosis occurs, the four stages of karyokinesis, why cell division matters, the chromosome diagram", years: [2026, 2025, 2022, 2020, 2019] },
    { topic: "Glycolysis, Krebs cycle and ATP: explain glycolysis, 38 ATP per glucose, products of complete oxidation", years: [2026, 2025, 2019] },
    { topic: "Proteins and nutrients: energy per gram, proteins made by organs (ossein, insulin)", marks: 1, years: [2024, 2022, 2017] },
    { topic: "Energy from carbohydrates, fats and proteins: complete or correct the chart", marks: 3, years: [2025, 2024, 2022] },
    { topic: "Vitamins: define, classify by solubility, one example of each", years: [2024, 2022] },
    { topic: "Give scientific reason: fibres are one of the important nutrients", marks: 2, years: [2025, 2024] },
  ],
  mistakes: [
    {
      title: "Putting glycolysis in the mitochondria",
      body: "Glycolysis occurs in the cytoplasm. The Krebs cycle and the electron transfer chain run in the mitochondria.",
    },
    {
      title: "Wrong ATP count",
      body: "Each NADH2 gives 3 ATP, each FADH2 gives 2 ATP. One glucose fully oxidized gives 38 ATP.",
    },
    {
      title: "Tiredness reason without lactic acid",
      body: "During exercise muscle cells respire anaerobically: less energy is produced and **lactic acid** accumulates, so we feel tired. Name both.",
    },
    {
      title: "Mixing up vitamin solubility",
      body: "Fat-soluble: A, D, E, K. Water-soluble: B and C.",
    },
    {
      title: "Mitosis and meiosis cells swapped",
      body: "Mitosis: somatic and stem cells, two daughter cells. Meiosis: germ cells, four haploid cells. Crossing over happens only in meiosis I.",
    },
  ],
};

export default sheet;
