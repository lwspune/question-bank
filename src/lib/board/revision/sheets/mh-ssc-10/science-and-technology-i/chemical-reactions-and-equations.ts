import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 3 Chemical Reactions and Equations.
 * Statements checked against the Balbharati text; equations rebuilt and
 * balanced by hand; most-asked years from the board past papers in the bank,
 * 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Chemical Reactions and Equations",
  chapterSlug: "chemical-reactions-and-equations",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Physical and chemical change",
      text: "In a physical change the composition of matter stays the same (ice melting, water evaporating). If the composition changes, it is a chemical change (cooking food, ripening fruit, milk turning into curd, digestion).",
    },
    {
      term: "Balanced equation",
      text: "The number of atoms of each element in the reactants is the same as in the products. If not, the equation is unbalanced. Balance by trial and error, starting from the compound with the most atoms.",
    },
    {
      term: "Combination reaction",
      text: "When two or more reactants combine in a reaction to form a single product. Example: burning magnesium in air gives magnesium oxide.",
    },
    {
      term: "Decomposition reaction",
      text: "Only one reactant gives two or more products. By heat: limestone, sugar, potassium chlorate. By electricity: water breaks into hydrogen and oxygen (**electrolysis**).",
    },
    {
      term: "Displacement reaction",
      text: "A more reactive element takes the place of the ion of a less reactive element in a compound. Iron or zinc displaces copper from copper sulphate solution; the blue colour fades.",
    },
    {
      term: "Double displacement reaction",
      text: "The ions in the reactants are exchanged to form a precipitate. Example: silver nitrate and sodium chloride give a white precipitate of silver chloride.",
    },
    {
      term: "Endothermic and exothermic",
      text: "Exothermic: heat is given out (quicklime with water, NaOH with HCl). Endothermic: heat is absorbed or must be supplied continuously (decomposition of limestone, dissolving KNO₃ in water).",
    },
    {
      term: "Factors affecting rate",
      text: "Nature of the reactants, size of the particles, concentration of the reactants, temperature, and a catalyst.",
    },
    {
      term: "Catalyst",
      text: "The substance in whose presence the rate of a chemical reaction increases, without causing any chemical change to it. Example: MnO₂ speeds up the decomposition of KClO₃ and H₂O₂.",
    },
    {
      term: "Oxidation",
      text: "A reactant combines with oxygen or loses hydrogen. In terms of electrons: losing one or more electrons, so the positive charge increases or the negative charge decreases.",
    },
    {
      term: "Reduction",
      text: "A reactant gains hydrogen or loses oxygen. In terms of electrons: gaining electrons, so the positive charge decreases or the negative charge increases.",
    },
    {
      term: "Redox reaction",
      text: "Oxidation and reduction take place together. The reductant is oxidised by the oxidant, and the oxidant is reduced by the reductant. Cellular respiration is a redox reaction.",
    },
    {
      term: "Corrosion",
      text: "Damage to metals by oxidation due to components of the atmosphere. Iron rusts: a reddish hydrated oxide, rust, collects on its surface. Rusting is faster in salt water.",
    },
    {
      term: "Rancidity",
      text: "Oil, ghee or fried food left for long undergoes air oxidation and gets a foul smell and taste. Prevented by antioxidants and air-tight containers.",
    },
  ],
  formulas: [
    { label: "Combination", latex: "\\ce{2Mg + O2 -> 2MgO} \\qquad \\ce{CaO + H2O -> Ca(OH)2} + \\text{heat}" },
    { label: "Decomposition of limestone", latex: "\\ce{CaCO3 ->[\\Delta] CaO + CO2 ^}" },
    { label: "Carbon dioxide turns lime water milky", latex: "\\ce{Ca(OH)2 + CO2 -> CaCO3 v + H2O}" },
    { label: "Decomposition of sugar on heating", latex: "\\ce{C12H22O11 ->[heat] 12C + 11H2O}" },
    { label: "Electrolysis of water", latex: "\\ce{2H2O ->[electric current] 2H2 ^ + O2 ^}" },
    { label: "Decomposition with a catalyst", latex: "\\ce{2KClO3 ->[\\Delta][MnO2] 2KCl + 3O2 ^}" },
    { label: "Displacement", latex: "\\ce{CuSO4 + Fe -> FeSO4 + Cu} \\qquad \\ce{CuSO4 + Zn -> ZnSO4 + Cu}" },
    { label: "Double displacement", latex: "\\ce{AgNO3 + NaCl -> AgCl v + NaNO3}" },
    { label: "Neutralisation (balanced)", latex: "\\ce{2NaOH + H2SO4 -> Na2SO4 + 2H2O}" },
    { label: "Redox: CuO reduced, H2 oxidised", latex: "\\ce{CuO + H2 -> Cu + H2O}" },
    { label: "Redox: H2S oxidised, SO2 reduced", latex: "\\ce{2H2S + SO2 -> 3S v + 2H2O}" },
    { label: "Oxidation as loss of electrons", latex: "\\ce{Fe^{2+} -> Fe^{3+} + e-}" },
  ],
  derivations: [
    {
      title: "Steps in balancing a chemical equation (NaOH with H2SO4)",
      steps: [
        "Write the skeletal equation: \\(\\ce{NaOH + H2SO4 -> Na2SO4 + H2O}\\).",
        "Count the atoms of each element on both sides.",
        "Start with the compound with the most atoms (\\(\\ce{Na2SO4}\\)): put 2 before NaOH to balance Na.",
        "Then balance H and O: put 2 before \\(\\ce{H2O}\\). Never change a formula, only the coefficients.",
        "Check: \\(\\ce{2NaOH + H2SO4 -> Na2SO4 + 2H2O}\\) has Na 2, S 1, O 6, H 4 on each side.",
      ],
    },
    {
      title: "Factors affecting the rate of a chemical reaction, with one example each",
      steps: [
        "Nature of reactants: Al reacts faster than Zn with dilute HCl, because Al is more reactive.",
        "Particle size: powdered Shahabad tile gives \\(\\ce{CO2}\\) faster than pieces. Smaller particles, faster reaction.",
        "Concentration: concentrated HCl reacts faster with \\(\\ce{CaCO3}\\) than dilute HCl.",
        "Temperature: limestone does not decompose until heated. Rate increases with temperature.",
        "Catalyst: \\(\\ce{MnO2}\\) makes \\(\\ce{KClO3}\\) decompose rapidly.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Decomposition of calcium carbonate",
      labels: ["test tube with calcium carbonate", "burner (heating)", "bent delivery tube", "lime water turns milky"],
    },
    {
      title: "To study rusting",
      labels: ["boiled water with an oil layer", "salt water", "air with anhydrous calcium chloride", "water and air", "iron nails"],
    },
  ],
  mostAsked: [
    { topic: "Decomposition: limestone (carbon dioxide turns lime water milky), sugar, electrolysis of water", years: [2026, 2025, 2024, 2023, 2018] },
    { topic: "Iron or zinc in copper sulphate solution: complete the equation, name the products and the type (displacement)", marks: 1, years: [2025, 2024, 2022, 2020, 2019, 2016] },
    { topic: "Oxidation, reduction and redox reactions: define, distinguish, identify in an equation", years: [2026, 2025, 2024, 2018, 2016] },
    { topic: "Identify the type of reaction, or write equations for given reactions", marks: 3, years: [2025, 2022, 2019] },
    { topic: "Physical or chemical change", marks: 1, years: [2026, 2023] },
    { topic: "Endothermic or exothermic reaction", years: [2025] },
    { topic: "Factors affecting the rate of a chemical reaction: state them, explain one", marks: 3, years: [2026, 2024] },
    { topic: "Double displacement reaction and its precipitate", marks: 1, years: [2025, 2023] },
  ],
  mistakes: [
    {
      title: "Changing a formula to balance an equation",
      body: "Only change the coefficients in front. Writing \\(\\ce{H2O2}\\) for \\(\\ce{H2O}\\) to fix the oxygen count makes it a different substance.",
    },
    {
      title: "Calling iron in copper sulphate a double displacement",
      body: "One element pushes out another: it is a **displacement**. Double displacement is an exchange of ions that forms a precipitate.",
    },
    {
      title: "Defining oxidation only as adding oxygen",
      body: "Oxidation is also loss of hydrogen and loss of electrons (\\(\\ce{Fe^{2+}}\\) to \\(\\ce{Fe^{3+}}\\)). In a redox equation, name both the substance oxidised and the substance reduced.",
    },
    {
      title: "Leaving out states, heat or conditions",
      body: "Write (s), (l), (g), (aq), heat on the arrow, and arrows for a gas or a precipitate where the question asks for a complete equation.",
    },
    {
      title: "Calling melting of ice a chemical change",
      body: "Melting, evaporation and attraction of iron filings to a magnet change no composition: they are physical changes.",
    },
  ],
};

export default sheet;
