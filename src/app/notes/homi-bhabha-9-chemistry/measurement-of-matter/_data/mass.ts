import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_MM_MASS_NOTE: SubtopicNote = {
  subtopicName: "Atomic and Molecular Mass",
  title: "Atomic and Molecular Mass",
  oneLineDefinition:
    "Atomic mass compares an atom with one twelfth of a carbon-12 atom, and the molecular mass of a compound is the sum of the atomic masses of all the atoms in one molecule.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE. One asks why carbon-12 is the standard for atomic masses; the other four are molecular mass sums: the mass of carbon dioxide, a pair of compounds with the same mass, four compounds put in ascending order, and the compound whose mass is 138. Every later page of the chapter starts with this sum.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9mmma-atomic",
      name: "Relative atomic mass and the carbon-12 standard",
      intuition:
        "An atom is far too light to weigh on a balance, so chemists compare atoms with one chosen atom instead. The chosen atom is carbon-12. One twelfth of its mass is the unit, and every other atom is measured in those units: an oxygen atom is 16 of them, a hydrogen atom about 1.",
      definition:
        "- The **atomic mass unit** (u) is **one twelfth** of the mass of one **carbon-12** atom.\n" +
        "- The **relative atomic mass** of an element tells how many times heavier its atom is than this unit. It is a **comparison**, so it has no unit of its own.\n" +
        "- **Carbon-12** is the standard reference for all atomic masses today.\n" +
        "- Most elements are a mixture of **isotopes**, so the atomic mass is an **average**. That is why chlorine is **35.5**, not a whole number.\n" +
        "- Papers usually print the atomic masses you need. Knowing the common ones saves time.",
      table: {
        columns: ["Element", "Symbol", "Atomic mass"],
        rows: [
          { cells: ["Hydrogen", "H", "1"] },
          { cells: ["Carbon", "C", "12"] },
          { cells: ["Nitrogen", "N", "14"] },
          { cells: ["Oxygen", "O", "16"] },
          { cells: ["Sodium", "Na", "23"] },
          { cells: ["Magnesium", "Mg", "24"] },
          { cells: ["Aluminium", "Al", "27"] },
          { cells: ["Sulphur", "S", "32"] },
          { cells: ["Chlorine", "Cl", "35.5"], noteAmber: "An average of its isotopes, so not a whole number." },
          { cells: ["Potassium", "K", "39"] },
          { cells: ["Calcium", "Ca", "40"] },
          { cells: ["Copper", "Cu", "63.5"] },
        ],
        caption: "The atomic masses used in school sums. A paper may print slightly different values: always use the paper's.",
      },
      selfCheckExample: {
        prompt: "An atom of an element is 2 times as heavy as one carbon-12 atom. What is the atomic mass of the element?",
        steps: ["One carbon-12 atom has mass 12 u.", "So the atom has mass \\(2 \\times 12 = 24\\) u."],
        answer: "24 (this element is magnesium)",
      },
      practiceSet: [
        { prompt: "Which atom is used today as the standard for measuring atomic masses?", answer: "The carbon-12 atom" },
        { prompt: "What fraction of the mass of a carbon-12 atom is one atomic mass unit?", answer: "One twelfth" },
        { prompt: "Why is the atomic mass of chlorine 35.5 and not a whole number?", answer: "It is the average mass of the isotopes of chlorine" },
        { prompt: "What is the atomic mass of sodium?", answer: "23" },
      ],
      pyqExampleId: "8853a139-313d-40d6-b5e2-0daceccebfc6",
      traps: [
        {
          title: "Taking hydrogen as the standard",
          body: "The modern standard is one twelfth of the mass of a carbon-12 atom, not the hydrogen atom.",
        },
        {
          title: "Giving relative atomic mass in grams",
          body: "Relative atomic mass is a comparison with the carbon-12 unit, so it is a plain number such as 16 for oxygen. The mass of one atom is far smaller than a gram.",
        },
        {
          title: "Rounding chlorine to 35",
          body: "Use 35.5 for chlorine unless the paper prints another value. A rounded 35 gives a wrong molecular mass for every chloride.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9mmma-molecular",
      name: "Working out molecular mass",
      intuition:
        "A molecule is a group of atoms held together, so its mass is just the masses of its atoms added up. Read the formula, count how many atoms of each element there are, multiply each count by that element's atomic mass, and add.",
      definition:
        "- **Molecular mass** = sum of (atomic mass × number of atoms) for every element in the formula.\n" +
        "- A **subscript** counts the atom just before it: in \\(\\mathrm{H_2O}\\) there are 2 H atoms and 1 O atom.\n" +
        "- A subscript after a **bracket** multiplies everything inside the bracket: \\(\\mathrm{(OH)_2}\\) means 2 O and 2 H.\n" +
        "- For ionic compounds such as NaCl the same sum is called the **formula mass**; papers call it molecular mass too.\n" +
        "- To compare or order compounds, work out each mass first, then compare the numbers.",
      formula: {
        label: "Molecular mass",
        latex: "M = \\sum (\\text{atomic mass} \\times \\text{number of atoms})",
        symbols: [{ symbol: "M", meaning: "molecular mass of the compound" }],
      },
      authoredExample: {
        prompt: "Find the molecular masses of calcium carbonate, \\(\\mathrm{CaCO_3}\\), and aluminium sulphate, \\(\\mathrm{Al_2(SO_4)_3}\\). (Ca = 40, C = 12, O = 16, Al = 27, S = 32)",
        steps: [
          "\\(\\mathrm{CaCO_3}\\): one Ca, one C, three O, so \\(40 + 12 + 3 \\times 16 = 40 + 12 + 48 = 100\\).",
          "\\(\\mathrm{Al_2(SO_4)_3}\\): one \\(\\mathrm{SO_4}\\) group is \\(32 + 4 \\times 16 = 96\\).",
          "There are three such groups and two Al atoms: \\(2 \\times 27 + 3 \\times 96 = 54 + 288 = 342\\).",
        ],
        answer: "\\(\\mathrm{CaCO_3}\\) = 100 and \\(\\mathrm{Al_2(SO_4)_3}\\) = 342",
      },
      selfCheckExample: {
        prompt: "Find the molecular mass of calcium hydroxide, \\(\\mathrm{Ca(OH)_2}\\). (Ca = 40, O = 16, H = 1)",
        steps: ["One OH group is \\(16 + 1 = 17\\).", "\\(40 + 2 \\times 17 = 40 + 34 = 74\\)."],
        answer: "74",
      },
      practiceSet: [
        { prompt: "Find the molecular mass of hydrogen chloride, HCl. (H = 1, Cl = 35.5)", answer: "36.5" },
        { prompt: "Find the molecular mass of sodium carbonate, \\(\\mathrm{Na_2CO_3}\\). (Na = 23, C = 12, O = 16)", answer: "\\(46 + 12 + 48 = 106\\)" },
        { prompt: "Which two of these have the same molecular mass: \\(\\mathrm{N_2}\\), CO, \\(\\mathrm{O_2}\\)? (N = 14, C = 12, O = 16)", answer: "\\(\\mathrm{N_2}\\) and CO, both 28" },
        { prompt: "Arrange in ascending order of molecular mass: \\(\\mathrm{O_2}\\), \\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_3}\\). (O = 16, C = 12, H = 1, N = 14)", answer: "\\(\\mathrm{CH_4}\\) (16), \\(\\mathrm{NH_3}\\) (17), \\(\\mathrm{O_2}\\) (32)" },
      ],
      pyqExampleId: "2065d434-537c-48f0-818b-11070dac5f7f",
      traps: [
        {
          title: "Forgetting the subscript",
          body: "Each subscript multiplies the atom before it. In \\(\\mathrm{K_2CO_3}\\) potassium counts twice (78) and oxygen three times (48).",
        },
        {
          title: "Multiplying only the last atom in a bracket",
          body: "A subscript after a bracket multiplies everything inside it. \\(\\mathrm{Ca(OH)_2}\\) is \\(40 + 2 \\times 17 = 74\\), not \\(40 + 16 + 2 = 58\\).",
        },
        {
          title: "Using the atom's mass for a gas molecule",
          body: "Oxygen gas is \\(\\mathrm{O_2}\\), so its molecular mass is 32, not 16. The same goes for \\(\\mathrm{H_2}\\) (2), \\(\\mathrm{N_2}\\) (28) and \\(\\mathrm{Cl_2}\\) (71).",
        },
      ],
    },
  ],
};
