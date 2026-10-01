import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_CH_MO_MOLE_NOTE: SubtopicNote = {
  subtopicName: "Mole Concept, Avogadro's Law and Molar Calculations",
  title: "The Mole, Equivalent Weight and Concentration",
  oneLineDefinition:
    "Moles from mass and molar mass, counting atoms with Avogadro's number, equivalent weight from the n-factor, and molarity against molality.",
  whyItMatters:
    "Six CDS questions. Two are short calculations (hydrogen atoms in glucose, moles of helium); the rest are definitions: molar mass, equivalent weight, molarity and molality, and counting atoms in a formula.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdschmo-mole",
      name: "Moles, molar mass and Avogadro's number",
      intuition:
        "A mole is a counting unit, like a dozen, only far bigger: 6.022 × 10²³ particles. The mass of one mole in grams is the molar mass, and it equals the formula mass in u. So grams divided by molar mass gives moles, and moles times Avogadro's number gives particles.",
      definition:
        "The rules:\n" +
        "- **1 mole** = **6.022 × 10²³** particles (Avogadro's number, Nₐ).\n" +
        "- **Molar mass** = mass of one mole **in grams**, numerically equal to the atomic or molecular mass.\n" +
        "- **Moles n = mass ÷ molar mass**; **particles N = n × Nₐ**.\n" +
        "- To count **atoms of one element**, multiply the molecules by that element's subscript (glucose C₆H₁₂O₆ has 12 H per molecule).\n" +
        "- Helium is **monatomic**: its molar mass is 4 g/mol.",
      formula: {
        label: "Moles and particles",
        latex: "n = \\frac{m}{M} \\qquad N = n \\times N_A, \\quad N_A = 6.022 \\times 10^{23}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of moles" },
          { symbol: "\\(m\\)", meaning: "mass in grams" },
          { symbol: "\\(M\\)", meaning: "molar mass in g/mol" },
          { symbol: "\\(N\\)", meaning: "number of particles" },
        ],
      },
      authoredExample: {
        prompt: "How many molecules are there in 9 g of water? (H = 1, O = 16)",
        steps: [
          "Molar mass of H₂O = 2 + 16 = 18 g/mol.",
          "\\(n = \\frac{9}{18} = 0.5\\) mol.",
          "\\(N = 0.5 \\times 6.022 \\times 10^{23} = 3.011 \\times 10^{23}\\).",
        ],
        answer: "3.011 × 10²³ molecules.",
      },
      selfCheckExample: {
        prompt: "How many oxygen atoms are there in 22 g of carbon dioxide? (C = 12, O = 16)",
        steps: [
          "Molar mass of CO₂ = 12 + 32 = 44 g/mol, so \\(n = \\frac{22}{44} = 0.5\\) mol of molecules.",
          "Each molecule has 2 oxygen atoms, so oxygen = 1 mol of atoms.",
          "1 mol = \\(6.022 \\times 10^{23}\\) atoms.",
        ],
        answer: "6.022 × 10²³ oxygen atoms.",
      },
      pyqExampleId: "284ff557-4f15-4d3b-acc5-a8038d581abe",
      practiceSet: [
        { prompt: "How many moles are in 64 g of oxygen gas, O₂? (O = 16)", answer: "2 mol" },
        { prompt: "What is the mass of 2 moles of NaCl? (Na = 23, Cl = 35.5)", answer: "117 g" },
        { prompt: "What is the mass of one mole of a substance in grams called?", answer: "Its molar mass" },
        { prompt: "How many atoms are in one molecule of C₂H₆O?", answer: "9" },
      ],
      traps: [
        {
          title: "Count atoms, not molecules, when asked for atoms",
          body: "After finding the moles of a compound, multiply by the number of that atom in the formula. Glucose has **12** hydrogen atoms per molecule, so hydrogen atoms = 12 × the molecules.",
        },
        {
          title: "Equal in number is not equal in mass",
          body: "Ethyne, C₂H₂, has as many carbon atoms as hydrogen atoms, but the carbon's mass is 24 and the hydrogen's 2. Multiply each count by its atomic mass before comparing masses.",
        },
        {
          title: "Helium is monatomic",
          body: "Helium exists as single atoms, so its molar mass is **4 g/mol**, not 8. Moles of helium = mass ÷ 4.",
        },
        {
          title: "A mole is a number, not a mass",
          body: "One mole of anything has 6.022 × 10²³ particles, but its mass depends on the substance: 1 mol of H₂ is 2 g, 1 mol of O₂ is 32 g.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschmo-equivalent",
      name: "Equivalent weight",
      intuition:
        "Equivalent weight is the mass that does one 'unit' of reacting: gives one H⁺, takes one H⁺ or one electron. Divide the molar mass by how many such units one formula unit supplies.",
      definition:
        "The rule:\n" +
        "- **Equivalent weight = molar mass ÷ n-factor**.\n" +
        "- For an **acid**, n-factor = **basicity** (replaceable H⁺): HCl 1, H₂SO₄ 2.\n" +
        "- For a **base**, n-factor = **acidity** (OH⁻ per formula): NaOH 1, Ca(OH)₂ 2, Ba(OH)₂ 2.",
      formula: {
        label: "Equivalent weight",
        latex: "E = \\frac{M}{n\\text{-factor}}",
        symbols: [
          { symbol: "\\(E\\)", meaning: "equivalent weight" },
          { symbol: "\\(M\\)", meaning: "molar mass" },
        ],
      },
      authoredExample: {
        prompt: "Find the equivalent weight of sulphuric acid, H₂SO₄ (molar mass 98).",
        steps: [
          "H₂SO₄ has 2 replaceable hydrogens, so its basicity is 2.",
          "\\(E = \\frac{98}{2} = 49\\).",
        ],
        answer: "49.",
      },
      selfCheckExample: {
        prompt: "Find the equivalent weight of calcium hydroxide, Ca(OH)₂ (molar mass 74).",
        steps: [
          "Ca(OH)₂ gives 2 OH⁻, so its acidity is 2.",
          "\\(E = \\frac{74}{2} = 37\\).",
        ],
        answer: "37.",
      },
      pyqExampleId: "e3127286-787b-45fc-a0ed-54c9a449c72b",
      practiceSet: [
        { prompt: "What is the n-factor of NaOH?", answer: "1" },
        { prompt: "What is the equivalent weight of HCl (molar mass 36.5)?", answer: "36.5" },
      ],
      traps: [
        {
          title: "Divide by the n-factor, not by the number of atoms",
          body: "A base with two OH⁻ per formula, such as Ca(OH)₂, has acidity 2, so its equivalent weight is half its molar mass, not the molar mass itself.",
        },
        {
          title: "Basicity counts only replaceable hydrogens",
          body: "Acetic acid, CH₃COOH, has four hydrogens but only the one in –COOH is given up as H⁺, so its basicity is 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdschmo-concentration",
      name: "Molarity and molality",
      intuition:
        "Both count moles of solute. Molarity divides by the volume of the whole solution; molality divides by the mass of the solvent alone. Molality does not change with temperature because mass does not, while volume does.",
      definition:
        "The two measures:\n" +
        "- **Molarity (M)** = moles of solute ÷ **litres of solution**.\n" +
        "- **Molality (m)** = moles of solute ÷ **kilograms of solvent**.\n" +
        "- Both are standard ways to state concentration, as is mass percentage.",
      formula: {
        label: "Molarity and molality",
        latex: "M = \\frac{n_{\\text{solute}}}{V_{\\text{solution}}\\,(\\text{L})} \\qquad m = \\frac{n_{\\text{solute}}}{m_{\\text{solvent}}\\,(\\text{kg})}",
      },
      authoredExample: {
        prompt: "4 g of NaOH (molar mass 40) is dissolved to make 500 mL of solution. Find its molarity.",
        steps: [
          "\\(n = \\frac{4}{40} = 0.1\\) mol.",
          "Volume = 0.5 L.",
          "\\(M = \\frac{0.1}{0.5} = 0.2\\) mol/L.",
        ],
        answer: "0.2 M.",
      },
      selfCheckExample: {
        prompt: "9 g of glucose (molar mass 180) is dissolved in 250 g of water. Find the molality.",
        steps: [
          "\\(n = \\frac{9}{180} = 0.05\\) mol.",
          "Mass of solvent = 0.25 kg.",
          "\\(m = \\frac{0.05}{0.25} = 0.2\\) mol/kg.",
        ],
        answer: "0.2 m.",
      },
      pyqExampleId: "acd7a99d-718c-4c07-9629-29b3407bd288",
      practiceSet: [
        { prompt: "Molarity is moles of solute per what?", answer: "Litre of solution" },
        { prompt: "Molality is moles of solute per what?", answer: "Kilogram of solvent" },
        { prompt: "Which of the two does not change with temperature?", answer: "Molality" },
      ],
      traps: [
        {
          title: "Molarity uses the solution, molality the solvent",
          body: "Molarity divides by the **volume of the solution** in litres; molality divides by the **mass of the solvent** in kilograms. Mixing them up gives the wrong number.",
        },
        {
          title: "Molality does not change with temperature",
          body: "Heating a solution expands its volume, so its **molarity** falls slightly. **Molality** uses mass, which does not change, so it stays the same.",
        },
      ],
    },
  ],
};
