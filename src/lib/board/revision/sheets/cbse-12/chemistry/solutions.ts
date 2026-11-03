import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 12 Chemistry, Ch. 1 Solutions. Statements checked against the
 * NCERT text (definitions and laws in the book's own words); most-asked years
 * and marks from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Solutions",
  chapterSlug: "solutions",
  source: "NCERT Chemistry Part I (CBSE Class 12), Chapter 1",
  keyPoints: [
    {
      term: "Henry's law",
      text: "The partial pressure of the gas in vapour phase \\((p)\\) is proportional to the mole fraction of the gas \\((x)\\) in the solution: \\(p = K_H x\\). The higher the value of \\(K_H\\) at a given pressure, the lower is the solubility of the gas.",
    },
    {
      term: "Applications of Henry's law",
      text: "Soda bottles are sealed under high pressure to dissolve more \\(\\ce{CO2}\\). **Bends:** divers rising to the surface release dissolved \\(\\ce{N2}\\) as bubbles in the blood, so their tanks use air diluted with helium. **Anoxia:** low \\(\\ce{O2}\\) partial pressure at high altitudes gives low blood oxygen.",
    },
    {
      term: "Gas solubility and temperature",
      text: "Solubility of gases in liquids decreases with rise in temperature, because dissolution is exothermic (Le Chatelier). \\(K_H\\) increases with temperature. So aquatic species are more comfortable in cold water, which holds more dissolved oxygen.",
    },
    {
      term: "Raoult's law",
      text: "For a solution of volatile liquids, the partial vapour pressure of each component of the solution is directly proportional to its mole fraction present in solution. It is a special case of Henry's law in which \\(K_H\\) becomes equal to \\(p_1^0\\).",
    },
    {
      term: "Ideal solutions",
      text: "Solutions which obey Raoult's law over the entire range of concentration. \\(\\Delta_{mix}H = 0\\) and \\(\\Delta_{mix}V = 0\\): A-B attractions are nearly equal to A-A and B-B. Examples: n-hexane and n-heptane, bromoethane and chloroethane, benzene and toluene.",
    },
    {
      term: "Positive deviation",
      text: "A-B interactions are weaker than A-A or B-B, so molecules escape more easily and the vapour pressure is higher than Raoult's law predicts (\\(\\Delta_{mix}H > 0\\), \\(\\Delta_{mix}V > 0\\)). Examples: ethanol and acetone (acetone breaks the H bonds of ethanol), carbon disulphide and acetone.",
    },
    {
      term: "Negative deviation",
      text: "A-B interactions are stronger than A-A and B-B, so the vapour pressure is lower (\\(\\Delta_{mix}H < 0\\), \\(\\Delta_{mix}V < 0\\)). Examples: phenol and aniline (H bond between phenolic H and N of aniline), chloroform and acetone (H bond between \\(\\ce{CHCl3}\\) and the C=O oxygen).",
    },
    {
      term: "Azeotropes",
      text: "Binary mixtures having the same composition in liquid and vapour phase that boil at a constant temperature, so fractional distillation cannot separate them. Large positive deviation: **minimum boiling** (ethanol and water, about 95 % ethanol). Large negative deviation: **maximum boiling** (nitric acid 68 % and water, 393.5 K).",
    },
    {
      term: "Colligative properties",
      text: "Properties which depend on the number of solute particles and are independent of their chemical identity: relative lowering of vapour pressure, elevation of boiling point, depression of freezing point and osmotic pressure. Relative lowering of vapour pressure equals the mole fraction of the solute.",
    },
    {
      term: "Kb and Kf",
      text: "Molal elevation constant (ebullioscopic) \\(K_b\\) and molal depression constant (cryoscopic) \\(K_f\\): the elevation or depression for a 1 molal solution. They depend only on the nature of the solvent. Unit K kg mol⁻¹.",
    },
    {
      term: "Osmosis and osmotic pressure",
      text: "Osmosis: flow of solvent through a semipermeable membrane from pure solvent (or dilute solution) to the solution. The pressure that just stops this flow is the osmotic pressure. It suits proteins and polymers: measured at room temperature, uses molarity, and is large even for very dilute solutions.",
    },
    {
      term: "Isotonic, hypertonic and hypotonic",
      text: "Isotonic solutions have the same osmotic pressure at a given temperature, so no osmosis occurs between them. Blood cell fluid is isotonic with 0.9 % (mass/volume) NaCl. In more than 0.9 % (hypertonic) cells shrink; in less (hypotonic) they swell.",
    },
    {
      term: "Reverse osmosis",
      text: "If a pressure larger than the osmotic pressure is applied to the solution side, pure solvent flows out of the solution through the semipermeable membrane. Used in desalination of sea water; a film of cellulose acetate is the membrane.",
    },
    {
      term: "Abnormal molar mass and van't Hoff factor",
      text: "A molar mass lower or higher than expected, from dissociation or association. \\(i\\) is greater than 1 for dissociation (KCl, \\(i = 2\\)) and less than 1 for association (ethanoic acid dimerises in benzene by H bonding, \\(i\\) close to 0.5).",
    },
  ],
  formulas: [
    { label: "Henry's law", latex: "p = K_H\\,x" },
    {
      label: "Raoult's law for two volatile liquids",
      latex: "p_1 = p_1^0 x_1 \\qquad p_{total} = p_1^0 x_1 + p_2^0 x_2 = p_1^0 + (p_2^0 - p_1^0)\\,x_2",
    },
    { label: "Composition of the vapour", latex: "y_1 = \\frac{p_1}{p_{total}}" },
    {
      label: "Relative lowering of vapour pressure",
      latex: "\\frac{p_1^0 - p_1}{p_1^0} = x_2 = \\frac{n_2}{n_1 + n_2} \\approx \\frac{w_2 M_1}{M_2 w_1}",
      symbols: [{ symbol: "1, 2", meaning: "1 = solvent, 2 = solute; w in g, M in g mol⁻¹" }],
    },
    { label: "Elevation of boiling point", latex: "\\Delta T_b = K_b\\,m \\qquad M_2 = \\frac{1000\\,K_b\\,w_2}{\\Delta T_b\\,w_1}" },
    { label: "Depression of freezing point", latex: "\\Delta T_f = K_f\\,m \\qquad M_2 = \\frac{1000\\,K_f\\,w_2}{\\Delta T_f\\,w_1}" },
    {
      label: "Molality",
      latex: "m = \\frac{n_2}{\\text{mass of solvent in kg}} = \\frac{1000\\,w_2}{M_2\\,w_1}",
    },
    {
      label: "Kb and Kf from the solvent",
      latex: "K_b = \\frac{R\\,M_1\\,T_b^2}{1000\\,\\Delta_{vap}H} \\qquad K_f = \\frac{R\\,M_1\\,T_f^2}{1000\\,\\Delta_{fus}H}",
      symbols: [{ symbol: "Tb, Tf", meaning: "boiling and freezing point of the pure solvent in K; M₁ in g mol⁻¹" }],
    },
    {
      label: "Osmotic pressure",
      latex: "\\pi = CRT = \\frac{n_2}{V}RT \\qquad M_2 = \\frac{w_2\\,R\\,T}{\\pi\\,V}",
      symbols: [{ symbol: "R", meaning: "0.0821 L atm K⁻¹ mol⁻¹ (V in L, π in atm) or 0.083 L bar K⁻¹ mol⁻¹" }],
    },
    {
      label: "van't Hoff factor",
      latex: "i = \\frac{\\text{normal molar mass}}{\\text{abnormal molar mass}} = \\frac{\\text{observed colligative property}}{\\text{calculated colligative property}}",
    },
    {
      label: "Colligative properties with i",
      latex: "\\frac{p_1^0 - p_1}{p_1^0} = i\\,\\frac{n_2}{n_1} \\quad \\Delta T_b = iK_b m \\quad \\Delta T_f = iK_f m \\quad \\pi = iCRT",
    },
    {
      label: "Degree of dissociation",
      latex: "\\alpha = \\frac{i - 1}{n - 1}",
      symbols: [{ symbol: "n", meaning: "ions from one formula unit (KCl 2, CaCl₂ 3)" }],
    },
    {
      label: "Degree of association",
      latex: "\\alpha = \\frac{1 - i}{1 - \\frac{1}{n}}",
      symbols: [{ symbol: "n", meaning: "molecules that associate (dimer 2, so i = 1 - α/2)" }],
    },
  ],
  derivations: [
    {
      title: "Show that the relative lowering of vapour pressure equals the mole fraction of the solute",
      steps: [
        "Only the solvent is volatile, so by Raoult's law \\(p_1 = x_1 p_1^0\\).",
        "Lowering \\(\\Delta p_1 = p_1^0 - p_1 = p_1^0(1 - x_1) = x_2 p_1^0\\).",
        "So \\(\\frac{p_1^0 - p_1}{p_1^0} = x_2 = \\frac{n_2}{n_1 + n_2}\\); for a dilute solution \\(\\approx \\frac{n_2}{n_1} = \\frac{w_2 M_1}{M_2 w_1}\\).",
      ],
    },
    {
      title: "Molar mass of a solute from elevation of boiling point (or depression of freezing point)",
      steps: [
        "For a dilute solution \\(\\Delta T_b = K_b m\\).",
        "\\(w_2\\) g of solute in \\(w_1\\) g of solvent: \\(m = \\frac{w_2/M_2}{w_1/1000} = \\frac{1000\\,w_2}{M_2 w_1}\\).",
        "So \\(\\Delta T_b = \\frac{1000\\,K_b w_2}{M_2 w_1}\\), giving \\(M_2 = \\frac{1000\\,K_b w_2}{\\Delta T_b w_1}\\). Replace \\(K_b\\), \\(\\Delta T_b\\) by \\(K_f\\), \\(\\Delta T_f\\) for freezing point.",
      ],
    },
    {
      title: "Molar mass of a solute from osmotic pressure",
      steps: [
        "For dilute solutions \\(\\pi = CRT = \\frac{n_2}{V}RT\\), with \\(V\\) in litres.",
        "With \\(n_2 = \\frac{w_2}{M_2}\\): \\(\\pi V = \\frac{w_2 RT}{M_2}\\).",
        "So \\(M_2 = \\frac{w_2 RT}{\\pi V}\\).",
      ],
    },
  ],
  diagrams: [
    {
      title: "Vapour pressure against mole fraction for positive and negative deviation",
      labels: ["x-axis: mole fraction x₁, x₂", "dashed lines: ideal (Raoult) behaviour", "(a) curves above: positive deviation", "(b) curves below: negative deviation"],
    },
    {
      title: "Elevation of boiling point and depression of freezing point",
      labels: ["vapour pressure against temperature", "solution curve below pure solvent", "1.013 bar line, Tb⁰ and Tb", "ΔTb and ΔTf marked"],
    },
    {
      title: "Reverse osmosis",
      labels: ["piston: pressure > osmotic pressure", "sea water side", "semipermeable membrane", "fresh water side"],
    },
  ],
  mostAsked: [
    {
      topic: "Osmosis and osmotic pressure: definition, isotonic and hypertonic solutions, reverse osmosis, use for proteins, or a \\(\\pi = iCRT\\) numerical",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Which solution freezes lowest, boils highest or has the highest osmotic pressure (count the particles), and reasoning on \\(\\Delta T_b\\) and \\(\\Delta T_f\\)",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Deviations from Raoult's law: the type for a given pair, the reason, and the change in volume or temperature on mixing",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Elevation of boiling point or depression of freezing point: find \\(\\Delta T\\) or the molar mass of the solute, or relate \\(K_f\\) to enthalpy of fusion",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Raoult's law and ideal solutions: statement, properties of an ideal solution, or a vapour pressure numerical",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Van't Hoff factor: \\(i\\) for dissociation or association, degree of dissociation or association, abnormal molar mass",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Henry's law: statement, \\(K_H\\) and solubility, applications (bends, anoxia, aquatic life in cold water), or a numerical",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Azeotropes: definition, minimum and maximum boiling types with examples, and why fractional distillation cannot separate them",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Leaving out \\(i\\) for an electrolyte",
      body: "Count the particles: NaCl and KCl \\(i = 2\\); \\(\\ce{CaCl2}\\), \\(\\ce{MgBr2}\\), \\(\\ce{K2SO4}\\) and \\(\\ce{Na2SO4.10H2O}\\) \\(i = 3\\) (water of crystallisation adds no ions). Glucose and urea \\(i = 1\\). The most particles gives the lowest freezing point and highest boiling point.",
    },
    {
      title: "Using grams of solvent as kilograms",
      body: "Molality is moles of solute per **kg** of solvent: 250 g of water is 0.250 kg. Osmotic pressure uses molarity (per litre of solution) and \\(T\\) in kelvin, so 27 °C is 300 K.",
    },
    {
      title: "Reading \\(K_H\\) the wrong way round",
      body: "A larger \\(K_H\\) means a **less** soluble gas. \\(\\ce{CO2}\\) is more soluble in water than \\(\\ce{O2}\\), so \\(\\ce{O2}\\) has the higher \\(K_H\\). \\(K_H\\) rises with temperature as solubility falls.",
    },
    {
      title: "Swapping the azeotrope types",
      body: "Positive deviation gives a **minimum** boiling azeotrope (ethanol and water); negative deviation gives a **maximum** boiling azeotrope (nitric acid and water). Volume increases and heat is absorbed on mixing for positive deviation; the reverse for negative.",
    },
    {
      title: "Treating \\(K_b\\) and \\(K_f\\) as depending on the solution",
      body: "\\(K_b\\) and \\(K_f\\) depend only on the solvent. Doubling the molality doubles \\(\\Delta T_b\\), but \\(K_b\\) stays the same.",
    },
    {
      title: "Getting \\(i\\) wrong for association",
      body: "On association \\(i < 1\\): complete dimerisation gives \\(i = 0.5\\), tetramerisation \\(i = 0.25\\). For a dimer \\(i = 1 - \\frac{\\alpha}{2}\\), so \\(i = 0.54\\) means \\(\\alpha = 0.92\\).",
    },
  ],
};

export default sheet;
