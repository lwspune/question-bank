import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_BND_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Bond Types and Electronegativity",
  title: "Ionic, Covalent and Metallic Bonds",
  oneLineDefinition:
    "The electronegativity difference between two atoms decides whether they share electrons equally, share them unequally, or transfer them to make ions.",
  whyItMatters:
    "The papers ask which pair of elements forms a covalent bond (2012), which atomic numbers fit an ionic formula (2015), and what a pure covalent bond is (2025). All three are answered by electronegativity and ion charges from the group number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-bnd-electroneg",
      name: "Electronegativity difference and bond character",
      intuition:
        "Two atoms in a bond pull on the same pair of electrons. If they pull equally, the pair sits in the middle. If one pulls harder, the pair moves towards it and that end becomes slightly negative. If one pulls much harder, it takes the electron completely and the two atoms become ions.",
      definition:
        "**Electronegativity** is the ability of an atom in a bond to attract the shared electrons. On the Pauling scale fluorine is the highest (4.0); it rises across a period and falls down a group, so the most electronegative elements are F, O, N and Cl, and the least are at the bottom left (Cs, Fr).\n" +
        "- \\(\\Delta\\chi = 0\\) (two atoms of the same element): **pure (non-polar) covalent** bond, electrons shared exactly equally, as in \\(\\mathrm{Cl_2}\\) or \\(\\mathrm{H_2}\\).\n" +
        "- \\(\\Delta\\chi\\) below about 0.4: treated as **non-polar** in practice (the C to H bond, 0.35).\n" +
        "- \\(\\Delta\\chi\\) from about 0.4 up to about 1.7 to 1.9: **polar covalent**, with partial charges \\(\\delta^+\\) and \\(\\delta^-\\).\n" +
        "- \\(\\Delta\\chi\\) above about 1.7 to 1.9: mostly **ionic** (Italian textbooks use 1.9, many English ones 1.7). The line is a guide, not a wall: bond character changes gradually.\n" +
        "- Quick rule: a metal from Group 1 or 2 with a non-metal from Group 16 or 17 gives an ionic compound; two non-metals give a covalent one. Beryllium is the usual exception: its compounds are largely covalent.",
      formula: {
        label: "Electronegativity difference",
        latex: "\\Delta\\chi = \\left|\\chi_A - \\chi_B\\right|",
        symbols: [
          { symbol: "\\(\\chi_A, \\chi_B\\)", meaning: "Pauling electronegativities of the two bonded atoms" },
          { symbol: "\\(\\Delta\\chi\\)", meaning: "the difference, always taken as positive" },
        ],
      },
      authoredExample: {
        prompt:
          "Use the electronegativities H 2.20, C 2.55, O 3.44, Na 0.93 and Cl 3.16 to classify the bonds C to H, O to H, Na to Cl and Cl to Cl. Which end of the O to H bond is \\(\\delta^-\\)?",
        steps: [
          "C to H: \\(|2.55 - 2.20| = 0.35\\), below 0.4, so treated as non-polar.",
          "O to H: \\(|3.44 - 2.20| = 1.24\\), so polar covalent. Oxygen is more electronegative, so O is \\(\\delta^-\\) and H is \\(\\delta^+\\).",
          "Na to Cl: \\(|0.93 - 3.16| = 2.23\\), above 1.9, so ionic: \\(\\mathrm{Na^+}\\) and \\(\\mathrm{Cl^-}\\).",
          "Cl to Cl: \\(\\Delta\\chi = 0\\), a pure covalent bond.",
        ],
        answer: "Non-polar, polar (O is \\(\\delta^-\\)), ionic, pure covalent",
      },
      selfCheckExample: {
        prompt:
          "Electronegativities: H 2.20, F 3.98, Na 0.93, Cl 3.16, K 0.82, Br 2.96. Which one of these bonds is polar covalent?",
        options: [
          "Cl to Cl",
          "Na to F",
          "H to Cl",
          "K to Br",
          "H to H",
        ],
        steps: [
          "Work out each difference: Cl to Cl 0, Na to F 3.05, H to Cl 0.96, K to Br 2.14, H to H 0.",
          "Only H to Cl lies between about 0.4 and 1.7, so it is the polar covalent bond.",
          "A and E are pure covalent (identical atoms). B and D are ionic: a Group 1 metal with a halogen.",
        ],
        answer: "(C) H to Cl",
      },
      practiceSet: [
        { prompt: "Which element has the highest electronegativity of all?", answer: "Fluorine", method: "Top right of the table, noble gases aside" },
        { prompt: "In the bond between N (3.04) and H (2.20), which atom carries \\(\\delta^+\\)?", answer: "Hydrogen", method: "The less electronegative atom loses electron density" },
        { prompt: "Is the bond in \\(\\mathrm{O_2}\\) polar or pure covalent?", answer: "Pure covalent", method: "Two atoms of the same element: \\(\\Delta\\chi = 0\\)" },
        { prompt: "Which forms an ionic compound with chlorine: calcium or phosphorus?", answer: "Calcium", method: "Group 2 metal with a halogen; phosphorus is a non-metal" },
      ],
      traps: [
        {
          title: "Pure covalent means identical atoms, not just similar ones",
          body: "A bond is purely covalent only when \\(\\Delta\\chi = 0\\), which means two atoms of the same element. Atoms with similar electronegativities (C and H) make a bond that is nearly non-polar, but not pure. An option saying \"atoms of quite similar electronegativity\" describes a weakly polar bond.",
        },
        {
          title: "A metal and a non-metal are not always ionic",
          body: "Beryllium, and aluminium with chlorine, sit close to the boundary and form largely covalent compounds. When an option pairs beryllium with a halogen, expect covalent, not ionic.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bnd-ionic",
      name: "Ionic bonds and the formula of an ionic compound",
      intuition:
        "A metal atom with one, two or three outer electrons loses them easily; a non-metal atom a few electrons short of a full shell gains them. Both end up with a noble gas configuration. The positive and negative ions then attract each other in every direction, so they pack into a huge lattice rather than forming separate molecules.",
      definition:
        "An **ionic bond** is the electrostatic attraction between oppositely charged ions, formed by **electron transfer** from a metal to a non-metal.\n" +
        "- Ion charge from the group: Group 1 \\(+1\\), Group 2 \\(+2\\), Group 13 (Al) \\(+3\\); Group 15 \\(-3\\), Group 16 \\(-2\\), Group 17 \\(-1\\).\n" +
        "- The formula is the simplest ratio that makes the total charge zero. It is a **formula unit**, not a molecule.\n" +
        "- The bond is stronger when the ions have higher charges and are smaller: MgO (\\(\\mathrm{Mg^{2+}}\\), \\(\\mathrm{O^{2-}}\\)) melts near 2850 °C, NaCl at 801 °C.\n" +
        "- To use atomic numbers, write the electron configuration (2, 8, 8 ...) and count the outer electrons to find the group.",
      formula: {
        label: "Charge balance in an ionic formula",
        latex: "\\mathrm{M}_a\\mathrm{X}_b: \\quad a \\times (\\text{charge of M}) + b \\times (\\text{charge of X}) = 0",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "the smallest whole numbers that balance the charges" },
        ],
      },
      authoredExample: {
        prompt:
          "Element X has atomic number 13 and element Y has atomic number 8. Find the formula of the ionic compound they form.",
        steps: [
          "X: 2, 8, 3. Three outer electrons, Group 13, so it forms \\(\\mathrm{X^{3+}}\\) (it is aluminium).",
          "Y: 2, 6. Six outer electrons, Group 16, so it gains two and forms \\(\\mathrm{Y^{2-}}\\) (it is oxygen).",
          "Balance the charges: two \\(\\mathrm{X^{3+}}\\) give \\(+6\\), three \\(\\mathrm{Y^{2-}}\\) give \\(-6\\).",
          "Formula: \\(\\mathrm{X_2Y_3}\\), which is \\(\\mathrm{Al_2O_3}\\).",
        ],
        answer: "\\(\\mathrm{X_2Y_3}\\) (aluminium oxide)",
      },
      selfCheckExample: {
        prompt:
          "Element P has atomic number 20 and element Q has atomic number 7. What is the formula of the ionic compound formed between them?",
        options: [
          "\\(\\mathrm{PQ}\\)",
          "\\(\\mathrm{P_2Q_3}\\)",
          "\\(\\mathrm{PQ_2}\\)",
          "\\(\\mathrm{P_3Q_2}\\)",
          "\\(\\mathrm{P_3Q}\\)",
        ],
        steps: [
          "P: 2, 8, 8, 2, Group 2, forms \\(\\mathrm{P^{2+}}\\) (calcium).",
          "Q: 2, 5, Group 15, gains three, forms \\(\\mathrm{Q^{3-}}\\) (nitrogen).",
          "Three \\(\\mathrm{P^{2+}}\\) (\\(+6\\)) balance two \\(\\mathrm{Q^{3-}}\\) (\\(-6\\)): \\(\\mathrm{P_3Q_2}\\), calcium nitride.",
          "Option B swaps the numbers, the usual slip when crossing charges over.",
        ],
        answer: "(D) \\(\\mathrm{P_3Q_2}\\)",
      },
      practiceSet: [
        { prompt: "Formula of the compound of potassium (Z = 19) and sulfur (Z = 16)?", answer: "\\(\\mathrm{K_2S}\\)", method: "\\(\\mathrm{K^+}\\) and \\(\\mathrm{S^{2-}}\\)" },
        { prompt: "Formula of magnesium fluoride?", answer: "\\(\\mathrm{MgF_2}\\)", method: "\\(\\mathrm{Mg^{2+}}\\) and two \\(\\mathrm{F^-}\\)" },
        { prompt: "Which noble gas has the same electron configuration as \\(\\mathrm{Na^+}\\)?", answer: "Neon (2, 8)", method: "Sodium loses its one outer electron" },
        { prompt: "Which has the stronger ionic bonding: KCl or CaO?", answer: "CaO", method: "Charges \\(2+\\) and \\(2-\\) against \\(1+\\) and \\(1-\\)" },
      ],
      traps: [
        {
          title: "An ionic formula is a ratio, not a molecule",
          body: "\\(\\mathrm{NaCl}\\) does not exist as NaCl molecules. Each ion is surrounded by ions of the opposite charge throughout a lattice, and the formula only gives their ratio. An option calling solid sodium chloride molecular is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-metallic",
      name: "Metallic bonding and the properties it explains",
      intuition:
        "Metal atoms hold their outer electrons loosely. In the solid each atom gives these electrons up to a shared pool, the sea of delocalised electrons, and becomes a positive ion. The ions are held together by their attraction to this sea, and because the electrons can move, metals conduct.",
      definition:
        "A **metallic bond** is the attraction between a lattice of **positive metal ions** and a **sea of delocalised electrons**.\n" +
        "- The bond has no direction, so layers of ions can slide without breaking it.\n" +
        "- It is stronger when each atom gives more electrons to the sea and when the ions are smaller.\n" +
        "- Alloys mix in atoms of a different size, which stops the layers sliding so easily: alloys are harder than the pure metal.",
      table: {
        columns: ["Property", "Explanation"],
        rows: [
          { cells: ["Conducts electricity as a solid and as a liquid", "Delocalised electrons move through the lattice when a voltage is applied"] },
          { cells: ["Good conductor of heat", "Free electrons carry energy quickly through the metal"] },
          { cells: ["Malleable and ductile", "Layers of ions slide over each other and the electron sea still holds them"] },
          { cells: ["Usually high melting point", "Strong attraction between the ions and the electron sea"] },
          { cells: ["Melting point rises from Na to Mg to Al", "More delocalised electrons per atom (1, 2, 3) and smaller, more charged ions"] },
        ],
      },
      selfCheckExample: {
        prompt: "Magnesium melts at about 650 °C and sodium at about 98 °C. Which statement best explains the difference?",
        options: [
          "Each magnesium atom gives two electrons to the delocalised sea and forms a smaller 2+ ion, so the metallic bonding is stronger",
          "Magnesium atoms are joined to each other by covalent bonds",
          "Sodium ions are smaller than magnesium ions",
          "Sodium has more delocalised electrons per atom than magnesium",
          "Magnesium atoms are much heavier than sodium atoms",
        ],
        steps: [
          "Both are metals, so compare the strength of metallic bonding.",
          "Magnesium contributes two electrons per atom and forms \\(\\mathrm{Mg^{2+}}\\), which is also smaller than \\(\\mathrm{Na^+}\\). Both make the attraction stronger.",
          "C and D state the reverse of the facts; E is wrong because the masses (24 and 23) are almost equal and mass does not set melting point here.",
        ],
        answer: "(A) Two delocalised electrons per atom and a smaller 2+ ion give stronger metallic bonding",
      },
      practiceSet: [
        { prompt: "What carries the current in a metal wire?", answer: "Delocalised electrons", method: "Not ions: they stay in the lattice" },
        { prompt: "Why can copper be drawn into a wire without snapping?", answer: "The layers of ions slide while the electron sea keeps holding them", method: "Metallic bonds have no fixed direction" },
        { prompt: "Why is an alloy usually harder than the pure metal?", answer: "Atoms of a different size disrupt the layers so they cannot slide easily", method: "Irregular lattice" },
      ],
      traps: [
        {
          title: "Solid ionic compounds do not conduct; solid metals do",
          body: "Both contain charged particles, but in a solid ionic compound the ions are locked in place. It conducts only when molten or dissolved. A metal conducts as a solid because its electrons are free to move.",
        },
      ],
    },
  ],
};
