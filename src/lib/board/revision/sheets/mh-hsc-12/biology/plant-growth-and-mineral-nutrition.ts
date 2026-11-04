import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Biology, Ch. 7 Plant Growth and Mineral Nutrition. Definitions
 * checked against the Balbharati text (wordings are the book's own, trimmed);
 * most-asked years from the 18 board past-paper questions in the bank,
 * 2024-2026. Deficiency symptoms are read from the book's mineral table, whose
 * columns came out of extraction jumbled; each row was matched by its element.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Biology",
  subjectRoute: "biology",
  chapterName: "Plant Growth and Mineral Nutrition",
  chapterSlug: "plant-growth-and-mineral-nutrition",
  source: "Balbharati Biology Std XII (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Growth",
      text: "A permanent, irreversible increase in the bulk of an organism, accompanied by the change of form. Root and stem show indeterminate growth; leaves, flowers and fruits show determinate growth.",
    },
    {
      term: "Phases of growth",
      text: "**Cell division** (meristematic cells divide mitotically), **cell enlargement** (cells turn vacuolated and turgid; growth is exponential) and **cell maturation** (cells specialise; growth slows to a steady state).",
    },
    {
      term: "Arithmetic and geometric growth",
      text: "**Arithmetic**: after mitosis one daughter cell keeps dividing, the other differentiates; growth is constant and the curve linear. **Geometric**: both daughter cells divide and redivide repeatedly; slow at first, then exponential.",
    },
    {
      term: "AGR and RGR",
      text: "**Absolute growth rate**: total growth per unit time. **Relative growth rate**: growth per unit time expressed per unit initial parameter. A 5 cm² leaf gaining 5 cm² a day has RGR 100%; a 50 cm² leaf gaining the same has RGR 10%.",
    },
    {
      term: "Sigmoid growth curve, grand period",
      text: "Growth plotted against time gives an S-shaped (sigmoid) curve: **lag** phase (slow), **exponential (log)** phase (fastest), **stationary** phase (slows down). The total time for all phases is the **grand period of growth**.",
    },
    {
      term: "Differentiation, dedifferentiation, redifferentiation",
      text: "**Differentiation**: permanent change in structure and function leading to maturation. **Dedifferentiation**: a mature cell regains the power to divide (interfascicular and cork cambium). **Redifferentiation**: those cells mature again (secondary xylem and phloem).",
    },
    {
      term: "Plasticity",
      text: "The ability of plants to form different kinds of structures in response to different environmental or internal stimuli, in various phases of life. Example: **heterophylly** in cotton, coriander, larkspur, and in buttercup (environmental).",
    },
    {
      term: "Plant hormones",
      text: "Organic substances produced naturally in higher plants, affecting growth at a site remote from their production, active in very minute amounts. **Promoters**: auxins, gibberellins, cytokinins. **Inhibitors**: ethylene, abscisic acid.",
    },
    {
      term: "Auxin (IAA)",
      text: "IAA is **Indole-3-acetic acid**, made from tryptophan. Causes cell elongation, apical dominance, rooting of cuttings, parthenocarpy; prevents premature fruit drop. 2,4-D kills dicot weeds.",
    },
    {
      term: "Photoperiodism",
      text: "Effect of the duration of light on flowering. **SDP** (long night): flower when day is shorter than the critical photoperiod (Dahlia, Xanthium, soybean). **LDP** (short night): need a longer day (pea, radish, wheat, spinach). **DNP**: flower all year (tomato, cotton, maize, sunflower).",
    },
    {
      term: "Vernalization",
      text: "Acceleration of the ability to flower by chilling treatment: seeds or seedlings at 1 to 6 °C for one to one and half months. Term coined by Lysenko (1928). Reversal by high temperature is devernalization.",
    },
    {
      term: "Essential elements",
      text: "Indispensable elements without which a plant cannot complete its life cycle. **Macroelements** (C, H, O, N, P, K, S, Ca, Mg, Fe) are needed in large amounts; **microelements** (Zn, Cu, Mn, B, Mo, Cl) in traces, mainly as cofactors.",
    },
    {
      term: "Deficiency symptoms",
      text: "**Chlorosis**: loss or non-development of chlorophyll, yellowing of leaves. **Necrosis**: localized death of leaf tissue. **Mottling**: green and non-green patches. **Stunting**: retarded growth. **Abscission**: premature fall of flowers, fruits, leaves.",
    },
    {
      term: "Nitrogen fixation",
      text: "Conversion of free atmospheric nitrogen into nitrogenous salts usable by plants. Biological fixation is done by prokaryotes called **diazotrophs** (Rhizobium in root nodules of Fabaceae); cyanobacteria fix it in **heterocysts**.",
    },
  ],
  formulas: [
    {
      label: "Arithmetic growth",
      latex: "L_t = L_0 + rt",
      symbols: [
        { symbol: "Lt, L0", meaning: "length at time t, and at time zero" },
        { symbol: "r", meaning: "growth rate" },
      ],
    },
    {
      label: "Geometric growth",
      latex: "W_1 = W_0\\, e^{rt}",
      symbols: [
        { symbol: "W1, W0", meaning: "final size and initial size" },
        { symbol: "e", meaning: "base of natural logarithm" },
      ],
    },
    {
      label: "Biological nitrogen fixation",
      latex: "\\ce{N2 + 8H+ + 8e- + 16ATP -> 2NH3 + H2 + 16ADP + 16Pi}",
    },
  ],
  derivations: [
    {
      title: "Physiological effects and applications of ethylene",
      steps: [
        "The only gaseous growth regulator; ethephon releases it in water.",
        "Promotes ripening of banana, apple, mango; breaks bud and seed dormancy; starts lateral roots.",
        "Speeds abscission and senescence; causes epinasty; inhibits flowering except in pineapple.",
        "Raises chlorophyllase activity: degreening of banana and Citrus.",
      ],
    },
    {
      title: "Physiological effects and applications of cytokinin",
      steps: [
        "Kinetin found by Skoog and Miller (1954) in tobacco callus culture; promotes cell division and enlargement.",
        "Low cytokinin to auxin ratio gives roots; high ratio gives buds and shoots.",
        "Promotes lateral buds (controls apical dominance), delays senescence (Richmond and Lang), breaks dormancy.",
      ],
    },
    {
      title: "Physiological effects of gibberellins and abscisic acid",
      steps: [
        "Gibberellins: break bud dormancy, make amylase in germinating cereals, elongate internodes (genetic dwarf to tall), cause bolting, parthenocarpy, bigger grapes.",
        "Abscisic acid: promotes abscission and dormancy, speeds senescence, closes stomata by K+ efflux (antitranspirant), acts as a stress hormone.",
      ],
    },
    {
      title: "Physical (non-biological) nitrogen fixation",
      steps: [
        "Electric discharge: \\(\\ce{N2 + O2 -> 2NO}\\), then \\(\\ce{2NO + O2 -> 2NO2}\\).",
        "With rain water: \\(\\ce{2NO2 + H2O -> HNO2 + HNO3}\\); in soil these form nitrites and nitrates.",
        "Industrial (Haber-Bosch, 450 °C, 200 atm): \\(\\ce{N2 + 3H2 -> 2NH3}\\).",
      ],
    },
    {
      title: "Steps of the nitrogen cycle",
      steps: [
        "**Nitrification** (exothermic): \\(\\ce{2NH3 + 3O2 -> 2HNO2 + 2H2O}\\) by Nitrosomonas, Nitrosococcus; then \\(\\ce{2HNO2 + O2 -> 2HNO3}\\) by Nitrobacter.",
        "**Ammonification**: fungi, actinomycetes and bacteria break proteins into amino acids, then amino acids into ammonia (\\(\\ce{NH3}\\)) and an organic acid.",
        "**Assimilation**: nitrates are reduced to ammonia and built into amino acids (reductive amination, transamination, amides).",
        "**Denitrification**: anaerobic bacteria (Pseudomonas denitrificans, Bacillus, Paracoccus) turn nitrates back into nitrogen gas.",
      ],
    },
    {
      title: "Functions and deficiency symptoms of key minerals",
      steps: [
        "Potassium: anion-cation balance, stomatal movement, turgidity. Deficiency: yellow leaf edges, premature death.",
        "Magnesium: constituent of chlorophyll, activates phosphate-metabolism enzymes. Deficiency: chlorosis.",
        "Boron: Ca uptake, pollen germination, carbohydrate translocation. Deficiency: brown heart disease.",
        "Molybdenum: activates enzymes of nitrogen metabolism. Deficiency: slight retardation of growth.",
        "Nitrogen: stunted growth, chlorosis. Phosphorus: poor growth, dull green leaves.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Sigmoid growth curve (Graph 7.6)",
      labels: ["size or weight of the organ (y-axis)", "time (x-axis)", "lag phase", "exponential (log) phase", "stationary phase"],
    },
    {
      title: "Nitrogen cycle (Fig. 7.11)",
      labels: ["atmospheric N2", "biological and non-biological fixation", "nitrifying bacteria", "ammonifying bacteria", "denitrifying bacteria", "plant and animal proteins"],
    },
    {
      title: "Photoperiodism (Fig. 7.9)",
      labels: ["short day plant", "long day plant", "critical photoperiod", "dark period interrupted by a flash of light"],
    },
  ],
  mostAsked: [
    { topic: "Growth hormones: promoters and inhibitors, full form of IAA, effects and applications of ethylene or cytokinin", years: [2026, 2024] },
    { topic: "Growth rate: geometric growth, AGR and RGR, phases of the growth curve", years: [2026, 2025, 2024] },
    { topic: "Mineral deficiency: chlorosis, symptoms of K, Mg and B, function of molybdenum", years: [2026, 2025] },
    { topic: "Nitrogen cycle: ATP cost of fixation (heterocysts), ammonification equations, diazotrophs", years: [2026, 2025, 2024] },
    { topic: "Photoperiodism: long day plants, day neutral plants", years: [2026] },
    { topic: "Plasticity; differentiation and redifferentiation", years: [2026, 2024] },
  ],
  mistakes: [
    {
      title: "Wrong ATP count for nitrogen fixation",
      body: "16 ATP fix one \\(\\ce{N2}\\) into 2 \\(\\ce{NH3}\\), so 8 ATP per ammonia. 1000 molecules of ammonia need 8000 ATP. In cyanobacteria fixation happens in heterocysts.",
    },
    {
      title: "Calling ethylene a growth promoter",
      body: "Ethylene and abscisic acid are the growth inhibitors. Auxins, gibberellins and cytokinins are the promoters.",
    },
    {
      title: "Mixing SDP and LDP by season",
      body: "SDP are long night plants: a flash of light in the dark period stops their flowering. LDP are short night plants. Tomato, cotton and maize are day neutral.",
    },
    {
      title: "Confusing nitrification with nitrogen fixation",
      body: "Diazotrophs fix free \\(\\ce{N2}\\) into ammonia. Nitrification is a different step: Nitrosomonas and Nitrobacter oxidise ammonia to nitrite and then nitrate.",
    },
    {
      title: "Swapping AGR and RGR",
      body: "AGR is growth per unit time. RGR divides that by the initial size, so two leaves with the same AGR can have very different RGR.",
    },
  ],
};

export default sheet;
