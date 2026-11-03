import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Chemistry, Ch. 2 Solutions. Laws and definitions checked against
 * the Balbharati text (wordings are the book's own, trimmed); most-asked years
 * from the 46 board past-paper questions in the bank, 2014-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Chemistry",
  subjectRoute: "chemistry",
  chapterName: "Solutions",
  chapterSlug: "solutions",
  source: "Balbharati Chemistry Std XII (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Types of solutions",
      text: "A solution is a homogeneous mixture of two or more pure substances. Solute and solvent may each be solid, liquid or gas: carbonated water (\\(\\ce{CO2}\\) in water) is a **gas in liquid** solution, an amalgam of mercury with silver is liquid in solid, air is gas in gas.",
    },
    {
      term: "Henry's law",
      text: "The solubility of a gas in a liquid is directly proportional to the pressure of the gas over the solution: \\(S = K_H P\\). Units of \\(K_H\\): mol L⁻¹ bar⁻¹. \\(\\ce{NH3}\\) and \\(\\ce{CO2}\\) do not obey it, because they react with water.",
    },
    {
      term: "Raoult's law",
      text: "The partial vapour pressure of any volatile component of a solution is equal to the vapour pressure of the pure component multiplied by its mole fraction in the solution: \\(P_1 = P_1^0 x_1\\).",
    },
    {
      term: "Ideal solutions",
      text: "(i) Obey Raoult's law over the entire range of concentrations. (ii) \\(\\Delta_{mix}H = 0\\). (iii) \\(\\Delta_{mix}V = 0\\). (iv) Solvent-solute, solute-solute and solvent-solvent interactions are comparable. Their vapour pressure lies between those of the pure components. Benzene + toluene is nearly ideal.",
    },
    {
      term: "Nonideal solutions",
      text: "Do not obey Raoult's law. **Positive deviation:** solute-solvent attractions weaker than solute-solute and solvent-solvent ones; vapour pressure higher than expected. **Negative deviation:** attractions stronger; vapour pressure lower (phenol + aniline, chloroform + acetone).",
    },
    {
      term: "Colligative properties",
      text: "The physical properties of solutions that depend on the **number** of solute particles and not on their nature: vapour pressure lowering, boiling point elevation, freezing point depression and osmotic pressure.",
    },
    {
      term: "Relative lowering of vapour pressure",
      text: "The vapour pressure lowering of the solvent divided by the vapour pressure of the pure solvent. For a nonvolatile solute it equals the mole fraction of the solute: \\(\\frac{P_1^0 - P_1}{P_1^0} = x_2\\).",
    },
    {
      term: "Boiling point elevation",
      text: "Boiling point: the temperature at which the vapour pressure equals the applied pressure. A nonvolatile solute lowers the vapour pressure, so the solution boils higher: \\(\\Delta T_b = K_b m\\). **Ebullioscopic constant** \\(K_b\\): the elevation produced by a 1 molal solution. Unit K kg mol⁻¹.",
    },
    {
      term: "Freezing point depression",
      text: "\\(\\Delta T_f = K_f m\\). **Cryoscopic constant** \\(K_f\\): the depression in freezing point produced by a 1 molal solution. Unit K kg mol⁻¹. Molality is used, not molarity, because molality does not change with temperature.",
    },
    {
      term: "Osmosis",
      text: "The net spontaneous flow of solvent molecules into the solution, or from a more dilute solution to a more concentrated solution, through a semipermeable membrane. A semipermeable membrane (cellophane) lets solvent molecules pass but not solute molecules.",
    },
    {
      term: "Osmotic pressure",
      text: "The hydrostatic pressure (\\(h\\rho g\\)) that stops osmosis: \\(\\pi = MRT\\). Concentration is in **molarity**, since the measurement is made at a constant temperature. Being large, it suits molar masses of expensive substances and of substances made in small quantities.",
    },
    {
      term: "Isotonic, hypertonic, hypotonic",
      text: "**Isotonic:** two or more solutions having the same osmotic pressure (0.1 M urea and 0.1 M sucrose). Of two solutions with unequal osmotic pressures, the more concentrated one is **hypertonic** and the more dilute one **hypotonic**.",
    },
    {
      term: "Reverse osmosis",
      text: "The direction of osmosis can be reversed by applying a pressure **larger than the osmotic pressure** to the solution side; pure solvent then flows from the solution into the solvent. Used to get fresh water from sea water.",
    },
    {
      term: "van't Hoff factor",
      text: "\\(i = \\frac{\\text{colligative property of electrolyte solution}}{\\text{that of a nonelectrolyte solution of the same concentration}}\\), or actual moles of particles after dissociation over moles of formula units dissolved. \\(i = 1\\) for a nonelectrolyte, 2 for NaCl, 3 for \\(\\ce{CaCl2}\\).",
    },
  ],
  formulas: [
    { label: "Henry's law", latex: "S = K_H P" },
    { label: "Raoult's law (two volatile liquids)", latex: "P_1 = P_1^0 x_1 \\qquad P_{total} = P_1^0 x_1 + P_2^0 x_2" },
    { label: "Relative lowering of vapour pressure", latex: "\\frac{P_1^0 - P_1}{P_1^0} = x_2 \\approx \\frac{W_2 M_1}{M_2 W_1}" },
    { label: "Boiling point elevation", latex: "\\Delta T_b = K_b m \\qquad M_2 = \\frac{1000\\,K_b W_2}{\\Delta T_b W_1}" },
    { label: "Freezing point depression", latex: "\\Delta T_f = K_f m \\qquad M_2 = \\frac{1000\\,K_f W_2}{\\Delta T_f W_1}" },
    {
      label: "Osmotic pressure",
      latex: "\\pi = MRT = \\frac{n_2 RT}{V} \\qquad M_2 = \\frac{W_2 RT}{\\pi V}",
      symbols: [
        { symbol: "V", meaning: "volume of solution in dm³" },
        { symbol: "R", meaning: "0.08205 dm³ atm K⁻¹ mol⁻¹ (π in atm)" },
      ],
    },
    { label: "Molality", latex: "m = \\frac{1000\\,W_2}{M_2 W_1}" },
    { label: "Colligative properties of electrolytes", latex: "\\Delta T_b = iK_b m \\qquad \\Delta T_f = iK_f m \\qquad \\pi = iMRT" },
    { label: "van't Hoff factor and degree of dissociation", latex: "i = 1 + (n-1)\\alpha \\qquad \\alpha = \\frac{i-1}{n-1}" },
  ],
  derivations: [
    {
      title: "Raoult's law for a nonvolatile solute, and molar mass from relative lowering of vapour pressure",
      steps: [
        "Only the solvent is volatile: \\(P_1 = P_1^0 x_1\\). With \\(x_1 = 1 - x_2\\), \\(P_1^0 - P_1 = P_1^0 x_2\\).",
        "So the relative lowering \\(\\frac{P_1^0 - P_1}{P_1^0} = x_2 = \\frac{n_2}{n_1 + n_2}\\).",
        "Dilute solution, \\(n_2 \\ll n_1\\): \\(x_2 \\approx \\frac{n_2}{n_1} = \\frac{W_2/M_2}{W_1/M_1}\\).",
        "Hence \\(M_2 = \\frac{W_2 M_1 P_1^0}{W_1 (P_1^0 - P_1)}\\).",
      ],
    },
    {
      title: "Molar mass of a nonvolatile solute from boiling point elevation",
      steps: [
        "\\(\\Delta T_b = K_b m\\), where \\(m\\) is the molality.",
        "\\(m = \\frac{n_2}{W_1 \\text{ in kg}} = \\frac{1000\\,W_2}{M_2 W_1}\\), with \\(W_1\\) in grams.",
        "So \\(\\Delta T_b = \\frac{1000\\,K_b W_2}{M_2 W_1}\\), giving \\(M_2 = \\frac{1000\\,K_b W_2}{\\Delta T_b W_1}\\).",
      ],
    },
    {
      title: "Molar mass of a nonvolatile solute from freezing point depression",
      steps: [
        "\\(\\Delta T_f = T_f^0 - T_f = K_f m\\).",
        "\\(m = \\frac{1000\\,W_2}{M_2 W_1}\\), with \\(W_1\\) in grams.",
        "So \\(\\Delta T_f = \\frac{1000\\,K_f W_2}{M_2 W_1}\\), giving \\(M_2 = \\frac{1000\\,K_f W_2}{\\Delta T_f W_1}\\).",
      ],
    },
    {
      title: "Molar mass of a solute from osmotic pressure",
      steps: [
        "For a very dilute solution \\(\\pi = \\frac{n_2 RT}{V}\\), \\(V\\) in dm³.",
        "\\(n_2 = \\frac{W_2}{M_2}\\), so \\(\\pi = \\frac{W_2 RT}{M_2 V}\\).",
        "Hence \\(M_2 = \\frac{W_2 RT}{\\pi V}\\).",
      ],
    },
    {
      title: "Relation between van't Hoff factor and degree of dissociation",
      steps: [
        "Take 1 mol of \\(\\ce{A_xB_y}\\), which dissociates into \\(x\\) cations and \\(y\\) anions; \\(\\alpha\\) is the degree of dissociation.",
        "At equilibrium: \\((1 - \\alpha)\\) mol undissociated, \\(x\\alpha\\) mol cations, \\(y\\alpha\\) mol anions.",
        "Total moles \\(= 1 - \\alpha + x\\alpha + y\\alpha = 1 + (n - 1)\\alpha\\), where \\(n = x + y\\).",
        "\\(i = \\frac{1 + (n-1)\\alpha}{1}\\), so \\(\\alpha = \\frac{i - 1}{n - 1}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Osmosis and osmotic pressure (thistle tube)", labels: ["inverted thistle tube", "sugar solution", "semipermeable membrane", "pure water", "hydrostatic pressure hρg"] },
    { title: "Reverse osmosis", labels: ["piston: pressure greater than π", "salt water", "semipermeable membrane", "fresh water", "water outlet"] },
    { title: "Vapour pressure against temperature: boiling point elevation", labels: ["pure solvent curve", "solution curve below it", "1 atm (760 mm) line", "Tb0 and Tb", "ΔTb"] },
    { title: "Vapour pressure against temperature: freezing point depression", labels: ["AB: solid solvent", "CD: pure liquid solvent", "EF: solution", "Tf0 at B, Tf at E", "ΔTf"] },
  ],
  mostAsked: [
    { topic: "Define osmosis, osmotic pressure, isotonic solution, colligative properties or molality; condition of reverse osmosis", years: [2026, 2025, 2024, 2023, 2022, 2020] },
    { topic: "Molar mass from osmotic pressure: derive it, or an osmotic pressure numerical", years: [2026, 2024, 2022, 2018, 2017, 2014] },
    { topic: "Boiling point elevation: molar mass derivation or numerical, ebullioscopic constant", years: [2024, 2023, 2020, 2018, 2017, 2016, 2014] },
    { topic: "Henry's law: state it, its constant's unit, or a solubility numerical; carbonated water as a gas in liquid solution", years: [2026, 2025, 2024, 2022] },
    { topic: "Raoult's law and relative lowering of vapour pressure: derive it, or a vapour pressure numerical", years: [2026, 2025, 2023, 2017, 2016] },
    { topic: "Freezing point depression: molar mass derivation or numerical, unit of the cryoscopic constant", years: [2026, 2025, 2023, 2016, 2015] },
    { topic: "van't Hoff factor and degree of dissociation", years: [2026, 2025, 2024] },
    { topic: "What colligative properties depend on; molality of a solution", years: [2018, 2015, 2014] },
  ],
  mistakes: [
    {
      title: "Molality for boiling and freezing, molarity for osmotic pressure",
      body: "\\(\\Delta T_b\\) and \\(\\Delta T_f\\) use molality (mol per kg of solvent). \\(\\pi\\) uses molarity, with \\(V\\) in dm³: 300 mL is 0.3 dm³.",
    },
    {
      title: "Wrong units in \\(\\pi = MRT\\)",
      body: "With \\(R = 0.08205\\) dm³ atm K⁻¹ mol⁻¹, \\(\\pi\\) must be in atm (divide mmHg by 760) and \\(T\\) in kelvin.",
    },
    {
      title: "Forgetting the factor 1000",
      body: "In \\(M_2 = \\frac{1000\\,K_b W_2}{\\Delta T_b W_1}\\) the 1000 is there because \\(W_1\\) is in grams. If \\(W_1\\) is given in kg, drop it.",
    },
    {
      title: "Ignoring \\(i\\) for an electrolyte",
      body: "KBr gives two ions, so \\(\\Delta T_f = iK_f m\\) with \\(i = 2\\). Use \\(i\\) whenever the solute is an electrolyte (\\(\\ce{CaCl2}\\), \\(i = 3\\)); use \\(\\alpha = \\frac{i-1}{n-1}\\) for a weak one.",
    },
    {
      title: "Giving \\(\\Delta T_f\\) as the freezing point",
      body: "The freezing point is \\(T_f = T_f^0 - \\Delta T_f\\). For 0.1 m urea, \\(\\Delta T_f = 0.186\\) K, so water freezes at \\(-0.186\\) °C.",
    },
  ],
};

export default sheet;
