import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_SOL_SOLUBILITY_NOTE: SubtopicNote = {
  subtopicName: "Solubility and Saturation",
  title: "Like Dissolves Like, Electrolytes and Saturation",
  oneLineDefinition:
    "A substance dissolves when its particles are attracted to the solvent's about as strongly as to each other, and only up to a limit that depends on temperature.",
  whyItMatters:
    "Solubility appears in 2012, 2015, 2017, 2018 and 2020: which substance dissolves best in which solvent, which particles are in a salt solution, and what happens when a saturated solution cools.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-sol-like",
      name: "Like dissolves like: polar and non-polar solvents",
      intuition:
        "To dissolve, solute particles must separate from each other and mix among the solvent particles. This only happens if the new attractions to the solvent are about as strong as the ones that are broken. Polar water attracts ions and polar molecules; a non-polar solvent such as hexane only offers weak forces, so it dissolves non-polar substances.",
      definition:
        "- **Polar solvents** (water, ethanol) dissolve ionic compounds and polar molecules. Water molecules surround each ion (**hydration**).\n" +
        "- **Non-polar solvents** (hexane, cyclohexane, tetrachloromethane) dissolve non-polar substances such as iodine, bromine, fats and oils.\n" +
        "- Molecules with OH or NH groups (ethanol, glucose, sucrose, urea) dissolve in water by forming **hydrogen bonds** with it. Sucrose is polar.\n" +
        "- Giant covalent solids (silicon dioxide, diamond) dissolve in neither.\n" +
        "- Not every ionic compound dissolves in water (\\(\\mathrm{CaCO_3}\\), \\(\\mathrm{AgCl}\\), \\(\\mathrm{BaSO_4}\\)), and not every covalent compound is insoluble.",
      table: {
        columns: ["Solute", "In water (polar)", "In hexane (non-polar)", "Reason"],
        rows: [
          { cells: ["Most ionic salts (NaCl, KNO₃)", "Dissolve", "Do not dissolve", "Water's dipoles attract the ions"] },
          { cells: ["Small polar molecules (ethanol, glucose, sucrose)", "Dissolve", "Dissolve poorly", "Hydrogen bonds with water"] },
          { cells: ["Non-polar molecules (I₂, Br₂, oils, alkanes)", "Barely dissolve", "Dissolve", "Only weak dispersion forces on both sides"] },
          { cells: ["Non-polar gases (O₂, N₂, H₂)", "Very slightly", "Slightly", "Weak attractions to any solvent"] },
          { cells: ["Giant covalent solids (SiO₂, diamond)", "Insoluble", "Insoluble", "Strong covalent network cannot be broken"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following substances is the most soluble in tetrachloromethane, \\(\\mathrm{CCl_4}\\), a non-polar liquid?",
        options: ["Potassium chloride", "Glucose", "Silicon dioxide", "Iodine", "Calcium carbonate"],
        steps: [
          "A non-polar solvent dissolves non-polar solutes. Iodine, \\(\\mathrm{I_2}\\), is non-polar.",
          "A and E are ionic and C is a giant covalent solid: none dissolves in \\(\\mathrm{CCl_4}\\). B is polar and dissolves in water instead.",
        ],
        answer: "(D) Iodine",
      },
      practiceSet: [
        { prompt: "Does ethanol mix with water?", answer: "Yes, in any proportion", method: "Hydrogen bonding" },
        { prompt: "Will sodium chloride dissolve in hexane?", answer: "No", method: "Hexane cannot attract the ions" },
        { prompt: "Which removes candle wax from cloth better: water or hexane?", answer: "Hexane", method: "Wax is non-polar" },
      ],
      traps: [
        {
          title: "Ionic does not always mean soluble, covalent does not always mean insoluble",
          body: "Calcium carbonate and silver chloride are ionic but insoluble in water. Sugar and ethanol are covalent but very soluble, because they are polar and form hydrogen bonds. Statements starting with all ionic or all covalent are wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-sol-electrolytes",
      name: "Electrolytes and non-electrolytes: which particles are in a solution",
      intuition:
        "When an ionic solid dissolves, its ions separate and move freely among the water molecules, so the solution conducts electricity. A molecular solute such as sugar dissolves as whole molecules, which carry no charge, so the solution does not conduct.",
      definition:
        "- An **electrolyte** dissolves to give ions, so its solution conducts electricity.\n" +
        "- A **strong electrolyte** (soluble ionic compounds, strong acids and bases) is fully split into ions (**dissociated**).\n" +
        "- A **weak electrolyte** (ethanoic acid, ammonia) forms only a few ions; most of it stays as molecules.\n" +
        "- A **non-electrolyte** (glucose, sucrose, ethanol, urea) dissolves as molecules only.\n" +
        "- An aqueous salt solution contains ions and water molecules, but **no free atoms**.\n" +
        "- The current is carried by moving **ions**, not electrons. Solid ionic compounds do not conduct; molten or dissolved ones do.",
      table: {
        columns: ["Solute type", "Particles in water", "Conducts?", "Examples"],
        rows: [
          { cells: ["Strong electrolyte", "Ions only, plus water molecules", "Well", "NaCl, HCl, KOH, MgCl₂"] },
          { cells: ["Weak electrolyte", "Mostly molecules, a few ions", "Weakly", "Ethanoic acid, ammonia"] },
          { cells: ["Non-electrolyte", "Solute molecules and water molecules", "No", "Glucose, sucrose, ethanol, urea"] },
          { cells: ["Undissolved ionic solid", "Ions fixed in a lattice", "No", "Solid sodium chloride"] },
        ],
      },
      selfCheckExample: {
        prompt: "Solutions of the following substances are made, each at 0.1 mol/L. Which conducts electricity best?",
        options: ["Sucrose", "Ethanol", "Urea", "Ethanoic acid", "Magnesium chloride"],
        steps: [
          "Magnesium chloride is a strong electrolyte that gives three ions per formula unit, so its solution has many free ions.",
          "A, B and C are non-electrolytes: no ions. D is a weak acid: only a few ions.",
        ],
        answer: "(E) Magnesium chloride",
      },
      practiceSet: [
        { prompt: "Which particles are in an aqueous glucose solution?", answer: "Glucose molecules and water molecules" },
        { prompt: "Is hydrogen chloride dissolved in water a strong or a weak electrolyte?", answer: "Strong", method: "Hydrochloric acid is fully ionised" },
        { prompt: "Does solid sodium chloride conduct electricity?", answer: "No", method: "Its ions cannot move" },
        { prompt: "How many ions does one formula unit of \\(\\mathrm{Al_2(SO_4)_3}\\) release in water?", answer: "5", method: "2 aluminium ions and 3 sulfate ions" },
      ],
      traps: [
        {
          title: "A salt solution contains ions and molecules, not atoms",
          body: "Sodium chloride solution contains \\(\\mathrm{Na^+}\\) and \\(\\mathrm{Cl^-}\\) ions among water molecules. There are no free sodium or chlorine atoms, and no NaCl units. Options that include single atoms are wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-sol-saturation",
      name: "Solubility, saturation and crystals formed on cooling",
      intuition:
        "Water can only hold so much of a solute at a given temperature. Hot water usually holds more solid, so a hot saturated solution that cools must get rid of the extra solute, which comes out as crystals. The water stays; only solute leaves.",
      definition:
        "- **Solubility**: the maximum mass of solute that dissolves in 100 g of solvent at a given temperature (unit g per 100 g of water), or the concentration of a saturated solution.\n" +
        "- **Saturated**: no more solute dissolves at that temperature, and extra solid stays undissolved. **Unsaturated**: more can dissolve. **Supersaturated**: holds more than the solubility, an unstable state.\n" +
        "- Most **solids** become more soluble as temperature rises; a few (calcium hydroxide) become less soluble.\n" +
        "- **Gases** become **less** soluble as temperature rises, and **more** soluble at higher pressure (**Henry's law**: solubility is proportional to the gas pressure).\n" +
        "- When a saturated solution cools, solid crystallises, the mass of water stays the same, and the solution left is still saturated but less concentrated.",
      formula: {
        label: "Mass of crystals formed on cooling",
        latex: "m_{\\text{crystals}} = (S_{\\text{hot}} - S_{\\text{cold}}) \\times \\frac{m_{\\text{water}}}{100}",
        symbols: [
          { symbol: "\\(S_{\\text{hot}}, S_{\\text{cold}}\\)", meaning: "solubility at each temperature, in g per 100 g of water" },
          { symbol: "\\(m_{\\text{water}}\\)", meaning: "mass of water, in g" },
        ],
      },
      authoredExample: {
        prompt:
          "A salt has a solubility of 80 g per 100 g of water at 70 °C and 30 g per 100 g of water at 20 °C. A saturated solution made with 200 g of water at 70 °C is cooled to 20 °C. What mass of crystals forms, and what is the mass of solution left?",
        steps: [
          "At 70 °C, 200 g of water holds \\(80 \\times 2 = 160\\ \\text{g}\\) of salt.",
          "At 20 °C, the same water holds only \\(30 \\times 2 = 60\\ \\text{g}\\).",
          "Crystals: \\(160 - 60 = 100\\ \\text{g}\\). Solution left: \\(200 + 60 = 260\\ \\text{g}\\), still saturated.",
        ],
        answer: "100 g of crystals; 260 g of saturated solution left",
      },
      selfCheckExample: {
        prompt:
          "A solution contains 25 g of a salt dissolved in 50 g of water at 40 °C. The solubility of the salt at 40 °C is 60 g per 100 g of water. Which statement is correct?",
        options: [
          "The solution is unsaturated: 5 g more can dissolve.",
          "The solution is saturated: no more can dissolve.",
          "The solution is unsaturated: 35 g more can dissolve.",
          "The solution is supersaturated: 5 g will crystallise.",
          "The solution is unsaturated: 30 g more can dissolve.",
        ],
        steps: [
          "50 g of water can hold \\(60 \\times 50/100 = 30\\ \\text{g}\\) at 40 °C.",
          "It holds 25 g, so it is unsaturated and \\(30 - 25 = 5\\ \\text{g}\\) more can dissolve.",
          "C forgets that there is only 50 g of water, not 100 g. E gives the total the water can hold, not the extra.",
        ],
        answer: "(A) The solution is unsaturated: 5 g more can dissolve.",
      },
      practiceSet: [
        { prompt: "The solubility of sodium chloride is 36 g per 100 g of water. What mass dissolves in 250 g of water?", answer: "90 g", method: "\\(36 \\times 2.5\\)" },
        { prompt: "What happens to the solubility of oxygen in water as the water warms?", answer: "It decreases" },
        { prompt: "A salt's solubility is 40 g per 100 g of water at 50 °C and 20 g at 10 °C. A saturated solution in 50 g of water is cooled from 50 °C to 10 °C. What mass crystallises?", answer: "10 g", method: "\\((40 - 20) \\times 0.5\\)" },
        { prompt: "Why does a fizzy drink go flat faster once opened?", answer: "The pressure of \\(\\mathrm{CO_2}\\) above it falls, so less gas stays dissolved", method: "Henry's law" },
      ],
      traps: [
        {
          title: "Cooling removes solute, not solvent",
          body: "When a saturated solution of a solid cools, crystals form but the mass of water is unchanged. The remaining solution is still saturated, and its concentration is lower. Statements saying the concentration stays the same, or that water is lost, are wrong.",
        },
        {
          title: "Gases dissolve less in warm water",
          body: "The rule that solubility rises with temperature is for most solids only. For gases it is the reverse, which is why warm water holds less oxygen for fish.",
        },
      ],
    },
  ],
};
