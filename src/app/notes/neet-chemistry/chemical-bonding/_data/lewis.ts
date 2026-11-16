import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CB_LEWIS_NOTE: SubtopicNote = {
  subtopicName: "Lewis Structures and Bond Parameters",
  title: "Lewis Structures and Bond Parameters",
  oneLineDefinition:
    "The octet rule and its three kinds of exception, formal charge on an atom in a Lewis structure, and the bond parameters: length, enthalpy, bond order and resonance.",
  whyItMatters:
    "Four NEET questions from 2023 to 2026. One counts the species that break the octet rule (2023), one works out formal charges on the three oxygens of ozone (2026), one matches four molecules to their bond enthalpies (Re-NEET 2024), and one tests resonance: how many canonical forms ozone and the carbonate ion have (2024).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcb-octet",
      name: "The octet rule and its exceptions",
      intuition:
        "Atoms bond so that each ends up with eight electrons in its outer shell, like a noble gas. This octet rule explains a great many molecules, but not all. Some central atoms are left with fewer than eight, some take more than eight because they have empty d orbitals to use, and a molecule with an odd number of electrons cannot give every atom an octet.",
      definition:
        "Three kinds of exception:\n" +
        "- **Incomplete octet:** fewer than eight electrons around the central atom. Common for Li, Be and B: \\(\\text{LiCl}\\), \\(\\text{BeH}_2\\) and \\(\\text{BeCl}_2\\) (4), \\(\\text{BCl}_3\\) and \\(\\text{AlCl}_3\\) (6).\n" +
        "- **Expanded octet:** more than eight, possible only from the third period onwards because those atoms have 3d orbitals: \\(\\text{PF}_5\\) and \\(\\text{PCl}_5\\) (10), \\(\\text{SF}_6\\) (12), \\(\\text{H}_2\\text{SO}_4\\) (12).\n" +
        "- **Odd-electron molecules:** \\(\\text{NO}\\) and \\(\\text{NO}_2\\) cannot give every atom an octet.\n" +
        "- The rule also fails to explain why noble gases such as xenon form compounds (\\(\\text{XeF}_2\\), \\(\\text{XeF}_4\\)), and says nothing about the shape or the energy of a molecule.",
      table: {
        columns: ["Species", "Electrons around the central atom", "Kind"],
        rows: [
          { cells: ["\\(\\text{BeCl}_2\\)", "4 around Be", "Incomplete octet"] },
          { cells: ["\\(\\text{BCl}_3\\), \\(\\text{AlCl}_3\\)", "6 around B or Al", "Incomplete octet"] },
          { cells: ["\\(\\text{NH}_3\\), \\(\\text{CCl}_4\\)", "8", "Obeys the octet rule"] },
          { cells: ["\\(\\text{PCl}_5\\)", "10 around P", "Expanded octet"] },
          { cells: ["\\(\\text{SF}_6\\)", "12 around S", "Expanded octet"] },
          { cells: ["\\(\\text{NO}\\), \\(\\text{NO}_2\\)", "An odd number in total", "Odd-electron molecule"] },
        ],
      },
      pyqExampleId: "9ff7b2d9-13b8-4480-9dcf-1b807915c348",
      selfCheckExample: {
        prompt: "Why can phosphorus have ten electrons around it in PCl₅ while nitrogen never has more than eight?",
        steps: [
          "To hold more than eight electrons an atom needs empty orbitals beyond its s and p orbitals.",
          "Phosphorus is in the third period and has empty 3d orbitals; nitrogen, in the second period, has none.",
        ],
        answer: "Phosphorus can use its 3d orbitals; nitrogen has no d orbitals in its outer shell",
      },
      practiceSet: [
        { prompt: "How many electrons surround beryllium in BeH₂?", answer: "4" },
        { prompt: "Name one odd-electron molecule.", answer: "NO (or NO₂)" },
        { prompt: "How many electrons surround sulphur in SF₆?", answer: "12" },
        { prompt: "Does BF₃ have a complete octet on boron?", answer: "No, only 6 electrons" },
      ],
      traps: [
        {
          title: "Only the third period onwards can expand",
          body: "An expanded octet needs vacant d orbitals, so it is seen for P, S, Cl and beyond, never for C, N, O or F.",
        },
        {
          title: "Aluminium chloride is electron deficient",
          body: "In \\(\\text{AlCl}_3\\) the aluminium has only six electrons around it, like boron in \\(\\text{BCl}_3\\). Count it among the species without an octet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nchcb-formal-charge",
      name: "Formal charge",
      intuition:
        "A Lewis structure shares electrons between atoms, but it helps to ask how many electrons each atom owns in that drawing. Give each atom all its lone-pair electrons and half of every shared pair. Compare that with the valence electrons of the free atom: the difference is its formal charge. The structure with the smallest formal charges is usually the best one.",
      definition:
        "- Formal charge = (valence electrons of the free atom) − (non-bonding electrons) − ½ (bonding electrons).\n" +
        "- In symbols: \\(\\text{FC} = V - L - \\tfrac{1}{2}S\\).\n" +
        "- The formal charges in a molecule add up to its overall charge (zero for a neutral molecule).\n" +
        "- The lowest-energy Lewis structure is the one with the smallest formal charges.\n" +
        "- Formal charges are a bookkeeping device: they do not mean the charge is really there.",
      formula: {
        label: "Formal charge",
        latex: "\\text{FC} = V - L - \\tfrac{1}{2}S",
        symbols: [
          { symbol: "\\(V\\)", meaning: "valence electrons of the free atom" },
          { symbol: "\\(L\\)", meaning: "non-bonding (lone pair) electrons on the atom" },
          { symbol: "\\(S\\)", meaning: "electrons the atom shares in bonds" },
        ],
      },
      authoredExample: {
        prompt:
          "In the carbon monoxide structure with a triple bond and one lone pair on each atom, find the formal charge on carbon and on oxygen.",
        steps: [
          "Carbon: \\(V = 4\\), \\(L = 2\\), \\(S = 6\\). \\(\\text{FC} = 4 - 2 - 3 = -1\\).",
          "Oxygen: \\(V = 6\\), \\(L = 2\\), \\(S = 6\\). \\(\\text{FC} = 6 - 2 - 3 = +1\\).",
          "Check: \\(-1 + 1 = 0\\), the charge on the neutral molecule.",
        ],
        answer: "Carbon −1, oxygen +1",
      },
      selfCheckExample: {
        prompt: "What is the formal charge on nitrogen in the ammonium ion, NH₄⁺, where nitrogen forms four single bonds and has no lone pair?",
        steps: [
          "\\(V = 5\\), \\(L = 0\\), \\(S = 8\\).",
          "\\(\\text{FC} = 5 - 0 - 4 = +1\\).",
        ],
        answer: "+1",
      },
      practiceSet: [
        { prompt: "What is the formal charge on carbon in methane, CH₄?", answer: "0" },
        { prompt: "An oxygen atom has one single bond and three lone pairs. Its formal charge?", answer: "−1" },
        { prompt: "What should the formal charges of a neutral molecule add up to?", answer: "Zero" },
        { prompt: "Of two Lewis structures, which is usually preferred?", answer: "The one with the smaller formal charges" },
      ],
      pyqExampleId: "57406025-4973-437a-a7c3-442ab79f11c8",
      traps: [
        {
          title: "Count half of the bonding electrons",
          body: "Each bond is shared, so an atom gets half of its bonding electrons. Counting all of them makes every formal charge too negative.",
        },
        {
          title: "In ozone the central oxygen is the positive one",
          body: "In ozone the central oxygen, with one double bond, one single bond and one lone pair, carries +1. The singly bonded end oxygen carries −1, and the doubly bonded end oxygen 0.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcb-bond-parameters",
      name: "Bond length, bond enthalpy, bond order and resonance",
      intuition:
        "A bond can be described by a few numbers. The more electron pairs two atoms share (the higher the bond order), the shorter and stronger the bond: a triple bond is the shortest and needs the most energy to break. When one Lewis structure cannot describe a molecule, several are drawn, and the real molecule is a blend of them, the resonance hybrid.",
      definition:
        "- **Bond length:** the distance between the nuclei of two bonded atoms.\n" +
        "- **Bond enthalpy:** the energy needed to break one mole of bonds of a kind in the gas phase.\n" +
        "- **Bond order:** the number of bonds between two atoms. As bond order rises, bond enthalpy rises and bond length falls.\n" +
        "- **Resonance:** when one Lewis structure is not enough, the molecule is shown by two or more canonical structures. The real structure, the resonance hybrid, has a lower energy than any of them. Ozone has two canonical forms; the carbonate ion \\(\\text{CO}_3^{2-}\\) has three.\n" +
        "- In resonance only π electrons and lone pairs move; the atoms and σ bonds stay where they are.",
      table: {
        columns: ["Molecule", "Bond order", "Bond enthalpy, kJ per mol"],
        rows: [
          { cells: ["\\(\\text{N}_2\\)", "3", "946.0"], pyqExampleId: "0587aaec-931d-4fdc-9238-0e62c20d1c12", noteAmber: "Re-NEET 2024: N₂ was matched with 946.0, O₂ with 498, H₂ with 435.8 and HCl with 431.0." },
          { cells: ["\\(\\text{O}_2\\)", "2", "498"] },
          { cells: ["\\(\\text{H}_2\\)", "1", "435.8"] },
          { cells: ["\\(\\text{HCl}\\)", "1", "431.0"] },
        ],
      },
      pyqExampleId: "0587aaec-931d-4fdc-9238-0e62c20d1c12",
      selfCheckExample: {
        prompt: "Arrange the carbon-carbon bonds in ethane, ethene and ethyne in order of increasing bond length.",
        steps: [
          "Bond orders: ethyne 3, ethene 2, ethane 1.",
          "Higher bond order means a shorter bond.",
        ],
        answer: "Ethyne < ethene < ethane",
      },
      practiceSet: [
        { prompt: "How many canonical (resonance) structures can be drawn for the carbonate ion?", answer: "3" },
        { prompt: "Is the resonance hybrid more or less stable than any single canonical structure?", answer: "More stable" },
        { prompt: "As the bond order between two atoms rises, what happens to the bond length?", answer: "It decreases" },
        { prompt: "Which needs more energy to break: the bond in N₂ or in O₂?", answer: "N₂" },
      ],
      traps: [
        {
          title: "Ozone has two canonical forms, not three",
          body: "The double bond in ozone can sit on either side of the central oxygen: two structures. Three canonical forms belong to the carbonate ion.",
        },
        {
          title: "Higher order, shorter bond",
          body: "Bond length falls as bond order rises. A statement that bond length increases with bond order is false.",
        },
      ],
    },
  ],
};
