import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 1 Chemical Reactions and Equations. Statements
 * checked against the NCERT text (definitions in the book's own words); every
 * equation rebuilt and its atoms counted. Most-asked years and marks from all
 * 131 CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Chemical Reactions and Equations",
  chapterSlug: "chemical-reactions-and-equations",
  source: "NCERT Science (CBSE Class 10), Chapter 1",
  keyPoints: [
    {
      term: "Signs of a chemical reaction",
      text: "A change in state, a change in colour, evolution of a gas or a change in temperature tells us a chemical reaction has taken place. Example: magnesium ribbon burns with a dazzling white flame and becomes a white powder (magnesium oxide).",
    },
    {
      term: "Balanced chemical equation",
      text: "The number of atoms of each element is the same on the reactant and product sides. We balance because of the **law of conservation of mass**: mass can neither be created nor destroyed in a chemical reaction. An unbalanced equation is a skeletal equation.",
    },
    {
      term: "State symbols",
      text: "(s) solid, (l) liquid, (g) gas, (aq) aqueous solution in water. Conditions such as heat, light, pressure or a catalyst are written above or below the arrow.",
    },
    {
      term: "Combination reaction",
      text: "A reaction in which a single product is formed from two or more reactants. Example: quicklime and water give slaked lime, \\(\\ce{CaO + H2O -> Ca(OH)2}\\) + heat. Burning of coal and of magnesium are also combination reactions.",
    },
    {
      term: "Decomposition reaction",
      text: "A single substance breaks down into two or more simpler substances. It needs energy: **heat** (thermal decomposition: ferrous sulphate, lead nitrate, limestone), **light** (silver chloride, silver bromide in black and white photography) or **electricity** (electrolysis of water). It is the opposite of combination.",
    },
    {
      term: "Exothermic and endothermic",
      text: "Exothermic: heat is given out along with the products (burning natural gas, respiration, decomposition of vegetable matter into compost, quicklime with water). Endothermic: energy is absorbed (most decomposition reactions; barium hydroxide with ammonium chloride).",
    },
    {
      term: "Electrolysis of water",
      text: "A few drops of dilute sulphuric acid are added so that water conducts electricity. Hydrogen collects at the cathode (negative) and oxygen at the anode (positive). The volume of hydrogen is double that of oxygen (2 : 1). Hydrogen burns with a pop; oxygen makes a candle burn brighter.",
    },
    {
      term: "Displacement reaction",
      text: "A more reactive element displaces a less reactive element from its compound. Iron, zinc and lead are more reactive than copper: an iron nail in copper sulphate gets a brownish coating and the blue solution fades to light green.",
    },
    {
      term: "Double displacement and precipitation",
      text: "Reactions in which there is an exchange of ions between the reactants. An insoluble substance formed is a **precipitate**, and a reaction that gives one is a precipitation reaction: sodium sulphate and barium chloride give white \\(\\ce{BaSO4}\\); lead nitrate and potassium iodide give yellow \\(\\ce{PbI2}\\).",
    },
    {
      term: "Oxidation and reduction",
      text: "Oxidation: a substance gains oxygen or loses hydrogen. Reduction: a substance loses oxygen or gains hydrogen. The substance that gives oxygen (and is itself reduced) is the **oxidising agent**; the one that takes oxygen (and is itself oxidised) is the **reducing agent**.",
    },
    {
      term: "Redox reaction",
      text: "One reactant gets oxidised while the other gets reduced. In \\(\\ce{CuO + H2 -> Cu + H2O}\\), CuO is reduced and \\(\\ce{H2}\\) is oxidised. In \\(\\ce{ZnO + C -> Zn + CO}\\), ZnO is reduced and C is oxidised. In \\(\\ce{MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2}\\), HCl is oxidised and \\(\\ce{MnO2}\\) reduced.",
    },
    {
      term: "Corrosion",
      text: "When a metal is attacked by substances around it such as moisture, acids, etc., it is said to corrode. Examples: rusting of iron (reddish brown), black coating on silver, green coating on copper. It damages car bodies, bridges, railings and ships.",
    },
    {
      term: "Rancidity",
      text: "When fats and oils are oxidised, they become rancid and their smell and taste change. Prevented by adding antioxidants, keeping food in airtight containers, and flushing chip packets with nitrogen so the chips are not oxidised.",
    },
  ],
  formulas: [
    { label: "Burning magnesium (combination)", latex: "\\ce{2Mg + O2 -> 2MgO}" },
    { label: "Quicklime and water (combination, exothermic)", latex: "\\ce{CaO(s) + H2O(l) -> Ca(OH)2(aq) + heat}" },
    { label: "Burning natural gas (exothermic)", latex: "\\ce{CH4(g) + 2O2(g) -> CO2(g) + 2H2O(g)}" },
    { label: "Respiration (exothermic)", latex: "\\ce{C6H12O6(aq) + 6O2(aq) -> 6CO2(aq) + 6H2O(l)} + \\text{energy}" },
    { label: "Heating ferrous sulphate (thermal decomposition)", latex: "\\ce{FeSO4.7H2O ->[heat] FeSO4 + 7H2O} \\qquad \\ce{2FeSO4(s) ->[heat] Fe2O3(s) + SO2(g) + SO3(g)}" },
    { label: "Heating limestone (thermal decomposition)", latex: "\\ce{CaCO3(s) ->[heat] CaO(s) + CO2(g)}" },
    { label: "Heating lead nitrate (thermal decomposition)", latex: "\\ce{2Pb(NO3)2(s) ->[heat] 2PbO(s) + 4NO2(g) + O2(g)}" },
    { label: "Electrolysis of water", latex: "\\ce{2H2O(l) ->[electricity] 2H2(g) + O2(g)}" },
    { label: "Silver halides in sunlight (photography)", latex: "\\ce{2AgCl(s) ->[sunlight] 2Ag(s) + Cl2(g)} \\qquad \\ce{2AgBr(s) ->[sunlight] 2Ag(s) + Br2(g)}" },
    { label: "Displacement of copper", latex: "\\ce{Fe + CuSO4 -> FeSO4 + Cu} \\qquad \\ce{Zn + CuSO4 -> ZnSO4 + Cu}" },
    { label: "Barium sulphate precipitate", latex: "\\ce{Na2SO4(aq) + BaCl2(aq) -> BaSO4(s) + 2NaCl(aq)}" },
    { label: "Lead iodide precipitate (yellow)", latex: "\\ce{Pb(NO3)2(aq) + 2KI(aq) -> PbI2(s) + 2KNO3(aq)}" },
    { label: "Barium chloride and aluminium sulphate", latex: "\\ce{3BaCl2 + Al2(SO4)3 -> 3BaSO4 + 2AlCl3}" },
    { label: "Copper heated in air, then hydrogen passed", latex: "\\ce{2Cu + O2 ->[heat] 2CuO} \\qquad \\ce{CuO + H2 ->[heat] Cu + H2O}" },
    { label: "Steam over red hot iron", latex: "\\ce{3Fe(s) + 4H2O(g) -> Fe3O4(s) + 4H2(g)}" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Electrolysis of water (Figure 1.6)",
      labels: ["plastic mug with water and a few drops of dilute H₂SO₄", "carbon electrodes in rubber stoppers", "test tubes over the electrodes", "hydrogen at cathode (double volume)", "oxygen at anode", "6 V battery"],
    },
    {
      title: "Heating ferrous sulphate crystals (Figure 1.4)",
      labels: ["boiling tube with green ferrous sulphate crystals", "test tube holder", "burner", "smell of burning sulphur (SO₂, SO₃)"],
    },
    {
      title: "Heating lead nitrate (Figure 1.5)",
      labels: ["boiling tube with lead nitrate powder", "brown fumes of nitrogen dioxide", "test tube holder", "burner"],
    },
    {
      title: "Iron nails in copper sulphate solution (Figure 1.8)",
      labels: ["test tube A: solution only, blue", "test tube B: iron nails tied with thread", "nail turns brownish", "blue colour fades"],
    },
    {
      title: "Oxidation of copper to copper oxide (Figure 1.10)",
      labels: ["china dish with copper powder", "tripod and wire gauze", "burner", "black coating of copper(II) oxide"],
    },
  ],
  mostAsked: [
    {
      topic: "Decomposition by heat or light: heating ferrous sulphate, lead nitrate or calcium carbonate; silver chloride or bromide in sunlight (photography)",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Displacement and double displacement (precipitation): iron nail in copper sulphate, sodium sulphate with barium chloride, potassium iodide with lead nitrate",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Write and balance an equation from a word statement, find the coefficients, and say why equations are balanced",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Combination, exothermic and endothermic reactions: quicklime and water, burning magnesium ribbon, natural gas, respiration",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Oxidation and reduction: name the substance oxidised and reduced or the oxidising and reducing agent; copper heated in air, then CuO with hydrogen",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Electrolysis of water: the gas at each electrode, why acid is added, volume ratio 2 : 1 and mass ratio 1 : 8",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Observations that show a chemical reaction has taken place: change in colour, state or temperature, or a gas given off",
      marks: 3,
      years: [2025, 2024, 2023],
    },
    {
      topic: "Corrosion and rancidity: define them, the black coating on silver, nitrogen in chip packets",
      marks: 3,
      years: [2026],
    },
  ],
  mistakes: [
    {
      title: "Balancing by changing a formula",
      body: "Change only the numbers in front (coefficients), never the small numbers inside a formula. Count every atom on both sides at the end: \\(\\ce{MnO2 + 4HCl -> MnCl2 + 2H2O + Cl2}\\) has 4 Cl, 4 H and 2 O on each side.",
    },
    {
      title: "Mixing up volume and mass in electrolysis",
      body: "By **volume**, hydrogen : oxygen = 2 : 1. By **mass** it is 1 : 8 (4 g of \\(\\ce{H2}\\) to 32 g of \\(\\ce{O2}\\)). Hydrogen is at the cathode, oxygen at the anode.",
    },
    {
      title: "Wrong gases from lead nitrate",
      body: "Heating lead nitrate gives lead oxide (solid), brown nitrogen dioxide \\(\\ce{NO2}\\) and colourless oxygen. Not NO or \\(\\ce{N2O}\\). The brown fumes are \\(\\ce{NO2}\\), not oxygen.",
    },
    {
      title: "Swapping the oxidising and reducing agent",
      body: "The oxidising agent is the substance that gets **reduced** (it gives oxygen). The reducing agent is the substance that gets **oxidised**. In \\(\\ce{CuO + H2 -> Cu + H2O}\\), CuO is the oxidising agent and \\(\\ce{H2}\\) the reducing agent.",
    },
    {
      title: "Thinking every decomposition is endothermic",
      body: "Most decomposition reactions absorb energy, but the book's example of decomposition of vegetable matter into compost is exothermic. Also, an exothermic reaction gives out heat, not always light.",
    },
    {
      title: "Confusing displacement with double displacement",
      body: "Displacement: an element and a compound (\\(\\ce{Fe + CuSO4}\\)). Double displacement: two compounds swap ions (\\(\\ce{Na2SO4 + BaCl2}\\)). Neutralisation (\\(\\ce{NaOH + HCl}\\)) is also double displacement.",
    },
  ],
};

export default sheet;
