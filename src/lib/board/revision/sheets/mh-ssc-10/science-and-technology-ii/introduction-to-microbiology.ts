import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology II, Ch. 7 Introduction to Microbiology.
 * Statements checked against the Balbharati text; the fermentation equations
 * are rebuilt (the book states the products in words); most-asked years from
 * the board past papers in the bank. The food-preservation odd one out (2020)
 * is not taught in the current book.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology II",
  subjectRoute: "science-and-technology-ii",
  chapterName: "Introduction to Microbiology",
  chapterSlug: "introduction-to-microbiology",
  source: "Balbharati Science and Technology Part 2 Std X (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Industrial microbiology",
      text: "Commercial use of microbes. Main features: (A) production by **fermentation** (bread, cheese, wine, enzymes, medicines); (B) use of microbes for **garbage management and pollution control**.",
    },
    {
      term: "Milk products and yoghurt",
      text: "Milk is pasteurized, then fermented by lactobacilli: lactose becomes **lactic acid**, which coagulates milk proteins. Yoghurt: Streptococcus thermophilus and Lactobacillus delbrueckii in 1:1.",
    },
    {
      term: "Cheese",
      text: "Made from cow milk with Lactobacillus lactis, Lactobacillus cremoris and Streptococcus thermophilus. Earlier, **rennet** from the alimentary canal of cattle was used; now **protease** from fungi gives **vegetarian cheese**.",
    },
    {
      term: "Probiotics",
      text: "Milk products with active bacteria (Lactobacillus, Bifidobacterium). They increase useful intestinal microbes and decrease harmful ones like **Clostridium**; they reactivate microbes made inactive by antibiotics.",
    },
    {
      term: "Bread",
      text: "Baker's yeast, **Saccharomyces cerevisiae**, ferments carbohydrates into CO2 and ethanol. CO2 makes the dough rise and the bread spongy. Yeast adds carbohydrates, proteins, vitamins and minerals, so bread is nutritive.",
    },
    {
      term: "Vinegar",
      text: "Chemically, vinegar is **4% acetic acid** (CH3COOH). Yeast makes ethanol; Acetobacter and Glucanobacter convert ethanol into acetic acid. Used for sour taste and to preserve pickles and sauces.",
    },
    {
      term: "Beverages and food additives",
      text: "Lactobacillus brevis: **coffee**; Candida, Hansenula, Pichia, Saccharomyces: **cocoa**; Saccharomyces cerevisiae: **wine** (grapes) and **cider** (apple). **Xylitol**: sweetener; gluconic acid (Aspergillus niger): calcium and iron supplements.",
    },
    {
      term: "Xanthan gum",
      text: "From fermentation of starch and molasses by **Xanthomonas**. Thickens ice creams, puddings, chocolates and soups; used for pigments, fertilizers, weedicides, tooth pastes and high quality paper.",
    },
    {
      term: "Microbial enzymes",
      text: "Active at low temperature, pH and pressure, so energy is saved; specific, so no unwanted by-products; reusable and **eco-friendly**. Used with detergents and in cheese, textile, leather and paper industries.",
    },
    {
      term: "Antibiotics",
      text: "Obtained from bacteria and fungi: penicillin, streptomycin, tetracyclins, erythromycin and others. **Rifamycin** is effective against tuberculosis.",
    },
    {
      term: "Microbes and fuels",
      text: "**Methane** by anaerobic decomposition of waste; **ethanol**, a clean fuel, from molasses by yeast; **hydrogen**, the fuel of the future, by bio-photolysis of water. Biofuels: solid (dung, crop residue), liquid (vegetable oils, alcohol), gas (gobar gas).",
    },
    {
      term: "Oil spills",
      text: "Oil is toxic to aquatic organisms and hard to remove mechanically. **Hydrocarbonoclastic bacteria** (Pseudomonas, Alcanovorax borkumensis) decompose the hydrocarbons into CO2 and water.",
    },
    {
      term: "Clean technology",
      text: "**Geobacter** turns soluble uranium salts into insoluble ones; Ideonella sakaiensis decomposes PET; Nocardia decomposes rubber; Acidophillium uses sulphuric acid from acid rain. Landfills and sewage plants use microbes.",
    },
    {
      term: "Microbial inoculants and biopesticides",
      text: "Inoculants (Azotobacter) supply nutrients to plants and prevent soil pollution from chemical fertilizers. Bacterial and fungal toxins act as **biopesticides** (Spinosad); microbes also destroy chemical pesticides in soil.",
    },
  ],
  formulas: [
    {
      label: "Fermentation by yeast (bread, ethanol)",
      latex: "\\ce{C6H12O6 -> 2C2H5OH + 2CO2}",
    },
    {
      label: "Ethanol to acetic acid (vinegar)",
      latex: "\\ce{C2H5OH + O2 -> CH3COOH + H2O}",
    },
  ],
  derivations: [
    {
      title: "Microbial enzymes are used instead of chemical catalysts in chemical industry",
      steps: [
        "They work at low temperature, pH and pressure: energy is saved and erosion-proof instruments are not needed.",
        "They carry out specific processes, so no unnecessary by-products form and purification costs are low.",
        "Waste decomposition is avoided and the enzymes can be reused, so they are eco-friendly.",
      ],
    },
    {
      title: "Describe cheese production",
      steps: [
        "Cow milk is tested; Lactobacillus lactis, L. cremoris and Streptococcus thermophilus make it sour.",
        "Rennet (earlier) or fungal protease (vegetarian cheese) coagulates the milk; whey is removed.",
        "The solid is cut, washed, salted and mixed with microbes, pigments and flavours, then pressed and stored for ripening.",
      ],
    },
    {
      title: "How can the oil spills of rivers and oceans be cleaned?",
      steps: [
        "Spilt petroleum oil is fatal and toxic to aquatic organisms and hard to remove mechanically.",
        "Pseudomonas and Alcanovorax borkumensis (hydrocarbonoclastic bacteria) destroy pyridines and other chemicals.",
        "They decompose hydrocarbons by reaction of carbon with oxygen, giving CO2 and water.",
      ],
    },
    {
      title: "Reasons for the increasing popularity of probiotic products",
      steps: [
        "They form colonies of useful microbes in the alimentary canal and control harmful microbes.",
        "They improve resistance and lower the ill-effects of harmful substances formed in metabolism.",
        "They make useful microbes active again after antibiotics; used to treat diarrhoea.",
      ],
    },
    {
      title: "Explain the importance of biopesticides in organic farming",
      steps: [
        "Bacterial and fungal toxins that destroy pests are integrated into plants; insects do not eat such plants.",
        "Some fungi and viruses also act as pesticides; Spinosad is a fermentation by-product.",
        "Chemical pesticides harm other plants, animals and human skin; biopesticides avoid this and microbes destroy pesticides left in soil.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Biofuel production (Fig. 7.8)",
      labels: ["solar energy + CO2", "biomass, harvesting, threshing", "cellulose to glucose", "fermentation", "liquid fuel"],
    },
    {
      title: "Modern landfill site (Fig. 7.9)",
      labels: ["garbage", "plastic sheet lining", "soil cover", "methane gas", "collection of sewage", "well to monitor ground water level"],
    },
  ],
  mostAsked: [
    { topic: "Microbial products: xanthan gum uses, xylitol, gluconic acid, microbes behind coffee, cocoa, wine and cider", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Microbes and pollution control: cleaning oil spills, uses of microbes", marks: 3, years: [2024, 2020, 2019] },
    { topic: "Cheese: rennet earlier, protease for vegetarian cheese, the microbes used", marks: 3, years: [2025, 2022] },
    { topic: "Vinegar: acetic acid and its formula", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Microbial enzymes instead of chemical catalysts; features of industrial microbiology", marks: 2, years: [2026, 2024, 2019] },
    { topic: "Fuels from microbial processes and biomass: name them, solid and liquid examples, why use more", years: [2026, 2024] },
    { topic: "Probiotics: why popular, destroy harmful Clostridium", years: [2026] },
    { topic: "Organic farming and biopesticides", years: [2026, 2024] },
  ],
  mistakes: [
    {
      title: "Vinegar is not lactic acid",
      body: "Vinegar is 4% acetic acid, CH3COOH. Lactic acid is formed from lactose when milk is fermented.",
    },
    {
      title: "Rennet and protease mixed up",
      body: "Rennet comes from the alimentary canal of cattle (used earlier). Protease from fungi gives vegetarian cheese.",
    },
    {
      title: "Probiotic microbe names swapped",
      body: "Lactobacillus and Bifidobacterium are the useful ones; Clostridium is the harmful one that probiotics reduce.",
    },
    {
      title: "Matching microbes to beverages",
      body: "Lactobacillus brevis: coffee. Candida, Hansenula, Pichia: cocoa. Saccharomyces cerevisiae: wine and cider.",
    },
  ],
};

export default sheet;
