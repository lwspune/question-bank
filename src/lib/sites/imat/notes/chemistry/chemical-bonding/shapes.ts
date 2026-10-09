import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_BND_SHAPES_NOTE: SubtopicNote = {
  subtopicName: "Molecular Shapes and Polarity",
  title: "VSEPR Shapes, Bond Angles and Polar Molecules",
  oneLineDefinition:
    "Electron pairs around a central atom push as far apart as possible, which fixes the shape; the shape then decides whether the bond dipoles cancel.",
  whyItMatters:
    "This is the most asked page of the chapter. Shapes and bond angles came up in 2016, 2017, 2018, 2021 and 2022, and \"which molecule has a permanent dipole\" in 2014, 2018, 2019, 2020 and the 2023 ministry paper.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-bnd-vsepr-count",
      name: "Counting electron domains on the central atom (VSEPR)",
      intuition:
        "Every group of electrons around the central atom, whether a bond or a lone pair, is a cloud of negative charge. The clouds repel each other and spread out as far as they can. So the number of clouds fixes the arrangement, and you only need to count them.",
      definition:
        "**VSEPR** (valence shell electron pair repulsion): the electron **domains** around a central atom arrange themselves as far apart as possible.\n" +
        "- A domain is a single bond, a double bond, a triple bond or a lone pair: a **multiple bond counts as one domain**.\n" +
        "- Number of domains = atoms bonded to the central atom + lone pairs on it.\n" +
        "- The shortcut formula below gives the number of domains directly. Then lone pairs = domains minus atoms bonded.\n" +
        "- The **shape** is named from the positions of the atoms only; lone pairs shape the molecule but are not part of its name.",
      formula: {
        label: "Domains on the central atom",
        latex: "D = \\frac{V + m - q}{2}",
        symbols: [
          { symbol: "\\(V\\)", meaning: "valence electrons of the central atom" },
          { symbol: "\\(m\\)", meaning: "number of H or halogen atoms bonded to it (O and S atoms add nothing)" },
          { symbol: "\\(q\\)", meaning: "charge of the ion, with its sign (so a 2− ion adds 2)" },
          { symbol: "\\(D\\)", meaning: "number of electron domains; round a half up (odd-electron molecules)" },
        ],
      },
      authoredExample: {
        prompt: "Find the number of lone pairs on the central atom and the shape of (a) nitrogen trichloride, \\(\\mathrm{NCl_3}\\), and (b) the carbonate ion, \\(\\mathrm{CO_3^{2-}}\\).",
        steps: [
          "(a) N has 5 valence electrons and 3 Cl atoms: \\(D = (5 + 3)/2 = 4\\). Atoms bonded 3, so 1 lone pair.",
          "Four domains point to the corners of a tetrahedron; with one corner a lone pair, the atoms form a **trigonal pyramid**.",
          "(b) C has 4, the O atoms add nothing, and the charge is \\(-2\\): \\(D = (4 + 0 + 2)/2 = 3\\). Atoms bonded 3, so no lone pair.",
          "Three domains in a plane at 120°: **trigonal planar**.",
        ],
        answer: "(a) 1 lone pair, trigonal pyramidal; (b) no lone pair, trigonal planar",
      },
      selfCheckExample: {
        prompt: "What are the shape of the sulfite ion, \\(\\mathrm{SO_3^{2-}}\\), and the number of lone pairs on its sulfur atom?",
        options: [
          "Trigonal planar; no lone pair",
          "Trigonal pyramidal; one lone pair",
          "T-shaped; two lone pairs",
          "Tetrahedral; no lone pair",
          "Bent; one lone pair",
        ],
        steps: [
          "S has 6 valence electrons, the O atoms add nothing, and the charge adds 2: \\(D = (6 + 0 + 2)/2 = 4\\).",
          "Three O atoms are bonded, so there is \\(4 - 3 = 1\\) lone pair: trigonal pyramidal.",
          "Option A is the answer for neutral \\(\\mathrm{SO_3}\\): it comes from forgetting the charge. Option D names the arrangement of the domains rather than the atoms.",
        ],
        answer: "(B) Trigonal pyramidal; one lone pair",
      },
      practiceSet: [
        { prompt: "How many lone pairs are on S in \\(\\mathrm{H_2S}\\), and what is its shape?", answer: "2; bent", method: "\\(D = (6 + 2)/2 = 4\\), 2 atoms" },
        { prompt: "How many domains does P have in \\(\\mathrm{PF_5}\\)?", answer: "5, all bonding", method: "\\((5 + 5)/2\\)" },
        { prompt: "Shape of \\(\\mathrm{NH_2^-}\\)?", answer: "Bent, with 2 lone pairs on N", method: "\\(D = (5 + 2 + 1)/2 = 4\\)" },
        { prompt: "How many domains does carbon have in \\(\\mathrm{CO_2}\\)?", answer: "2, so linear", method: "\\(D = 4/2\\); each double bond is one domain" },
      ],
      traps: [
        {
          title: "Forgetting the charge changes the shape",
          body: "\\(\\mathrm{SO_3}\\) is trigonal planar but \\(\\mathrm{SO_3^{2-}}\\) is trigonal pyramidal: the two extra electrons make a lone pair. Always add the negative charge (or subtract the positive charge) before counting domains.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-shapes-table",
      name: "The VSEPR shapes and their bond angles",
      intuition:
        "Two domains go to opposite sides, three to the corners of a triangle, four to the corners of a tetrahedron. Lone pairs sit closer to the central atom than bonding pairs and push harder, so each lone pair squeezes the bond angles a little below the ideal value.",
      definition:
        "Repulsion order: **lone pair to lone pair > lone pair to bond pair > bond pair to bond pair**.\n" +
        "- Each lone pair closes the bond angle by roughly 2 to 3°: \\(\\mathrm{CH_4}\\) 109.5°, \\(\\mathrm{NH_3}\\) about 107°, \\(\\mathrm{H_2O}\\) about 104.5°.\n" +
        "- In the five-domain shape, lone pairs take the equatorial positions; in the six-domain shape, two lone pairs sit opposite each other.\n" +
        "- \\(\\mathrm{AlCl_3}\\) on its own is trigonal planar; in \\(\\mathrm{Al_2Cl_6}\\) each Al has four Cl around it and is tetrahedral.",
      table: {
        columns: ["Domains", "Lone pairs", "Shape", "Bond angle", "Examples"],
        rows: [
          { cells: ["2", "0", "Linear", "180°", "\\(\\mathrm{BeCl_2}\\), \\(\\mathrm{CO_2}\\), \\(\\mathrm{C_2H_2}\\)"] },
          { cells: ["3", "0", "Trigonal planar", "120°", "\\(\\mathrm{BF_3}\\), \\(\\mathrm{SO_3}\\), \\(\\mathrm{CO_3^{2-}}\\)"] },
          { cells: ["3", "1", "Bent", "just under 120°", "\\(\\mathrm{SO_2}\\), \\(\\mathrm{O_3}\\)"] },
          { cells: ["4", "0", "Tetrahedral", "109.5°", "\\(\\mathrm{CH_4}\\), \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{SO_4^{2-}}\\)"] },
          { cells: ["4", "1", "Trigonal pyramidal", "about 107°", "\\(\\mathrm{NH_3}\\), \\(\\mathrm{PCl_3}\\), \\(\\mathrm{H_3O^+}\\)"] },
          { cells: ["4", "2", "Bent", "about 104.5°", "\\(\\mathrm{H_2O}\\), \\(\\mathrm{H_2S}\\)"] },
          { cells: ["5", "0", "Trigonal bipyramidal", "120° and 90°", "\\(\\mathrm{PCl_5}\\)"] },
          { cells: ["5", "1", "Seesaw", "below 120° and 90°", "\\(\\mathrm{SF_4}\\)"] },
          { cells: ["5", "2", "T-shaped", "about 90°", "\\(\\mathrm{ClF_3}\\)"] },
          { cells: ["6", "0", "Octahedral", "90°", "\\(\\mathrm{SF_6}\\)"] },
          { cells: ["6", "2", "Square planar", "90°", "\\(\\mathrm{XeF_4}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which pair of molecules have the same shape?",
        options: [
          "\\(\\mathrm{CO_2}\\) and \\(\\mathrm{SO_2}\\)",
          "\\(\\mathrm{NH_3}\\) and \\(\\mathrm{BF_3}\\)",
          "\\(\\mathrm{CH_4}\\) and \\(\\mathrm{XeF_4}\\)",
          "\\(\\mathrm{BF_3}\\) and \\(\\mathrm{SO_3}\\)",
          "\\(\\mathrm{H_2O}\\) and \\(\\mathrm{BeCl_2}\\)",
        ],
        steps: [
          "\\(\\mathrm{BF_3}\\) and \\(\\mathrm{SO_3}\\): three domains, no lone pair, both trigonal planar.",
          "A: \\(\\mathrm{SO_2}\\) has a lone pair, so it is bent while \\(\\mathrm{CO_2}\\) is linear. B: \\(\\mathrm{NH_3}\\) is pyramidal. C: four atoms, but \\(\\mathrm{XeF_4}\\) is square planar. E: water is bent, \\(\\mathrm{BeCl_2}\\) linear.",
        ],
        answer: "(D) \\(\\mathrm{BF_3}\\) and \\(\\mathrm{SO_3}\\)",
      },
      practiceSet: [
        { prompt: "What is the bond angle in \\(\\mathrm{BeCl_2}\\)?", answer: "180°", method: "Two domains, linear" },
        { prompt: "Which has the smaller bond angle: \\(\\mathrm{NH_3}\\) or \\(\\mathrm{H_2O}\\)?", answer: "\\(\\mathrm{H_2O}\\)", method: "Two lone pairs squeeze harder than one" },
        { prompt: "What bond angles are found in \\(\\mathrm{PCl_5}\\)?", answer: "120° and 90°", method: "Trigonal bipyramid: equatorial and axial" },
        { prompt: "Name the shape of \\(\\mathrm{SF_6}\\).", answer: "Octahedral", method: "Six bonding domains" },
      ],
      traps: [
        {
          title: "Ammonia is pyramidal, not tetrahedral",
          body: "Its four domains point to the corners of a tetrahedron, but one is a lone pair, and the shape is named from the atoms: trigonal pyramidal, about 107°. Four atoms around a centre with a lone pair is never trigonal planar either.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-polarity",
      name: "Polar and non-polar molecules: when bond dipoles cancel",
      intuition:
        "Each polar bond is a small arrow pointing towards its more electronegative atom. If the arrows are arranged symmetrically, they pull equally in opposite directions and cancel, like a tug of war with equal teams. A lone pair or a mix of different outer atoms breaks the symmetry, and the molecule is left with a positive end and a negative end.",
      definition:
        "A molecule is **polar** (has a permanent **dipole moment**) when its bond dipoles do not cancel.\n" +
        "- Step 1: are there any polar bonds? If none (\\(\\mathrm{Cl_2}\\), \\(\\mathrm{CH_4}\\) in practice), the molecule is non-polar.\n" +
        "- Step 2: is the shape symmetric with identical outer atoms and no lone pair on the centre (linear, trigonal planar, tetrahedral, trigonal bipyramidal, octahedral, square planar)? Then the dipoles cancel: **non-polar**.\n" +
        "- A lone pair on the central atom (bent, pyramidal) or different outer atoms around a symmetric centre usually leave a dipole: **polar**.\n" +
        "- Polar bonds do not guarantee a polar molecule.",
      table: {
        columns: ["Molecule", "Shape", "Bond dipoles cancel?", "Polar molecule?"],
        rows: [
          { cells: ["\\(\\mathrm{CO_2}\\)", "Linear", "Yes", "No"] },
          { cells: ["\\(\\mathrm{H_2O}\\)", "Bent", "No", "Yes"] },
          { cells: ["\\(\\mathrm{BF_3}\\)", "Trigonal planar", "Yes", "No"] },
          { cells: ["\\(\\mathrm{NH_3}\\), \\(\\mathrm{PCl_3}\\)", "Trigonal pyramidal", "No", "Yes"] },
          { cells: ["\\(\\mathrm{CCl_4}\\)", "Tetrahedral, four identical atoms", "Yes", "No"] },
          { cells: ["\\(\\mathrm{CHCl_3}\\), \\(\\mathrm{CH_3Cl}\\)", "Tetrahedral, mixed atoms", "No", "Yes"] },
          { cells: ["\\(\\mathrm{PCl_5}\\), \\(\\mathrm{SF_6}\\)", "Trigonal bipyramidal, octahedral", "Yes", "No"] },
          { cells: ["HCl, HBr", "Linear, two different atoms", "Only one bond", "Yes"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which one of these molecules has a permanent dipole moment?",
        options: [
          "\\(\\mathrm{SO_2}\\)",
          "\\(\\mathrm{CS_2}\\)",
          "\\(\\mathrm{BCl_3}\\)",
          "\\(\\mathrm{SiF_4}\\)",
          "\\(\\mathrm{XeF_4}\\)",
        ],
        steps: [
          "\\(\\mathrm{SO_2}\\) has a lone pair on S, so it is bent and its two S to O dipoles do not cancel.",
          "\\(\\mathrm{CS_2}\\) is linear, \\(\\mathrm{BCl_3}\\) trigonal planar, \\(\\mathrm{SiF_4}\\) tetrahedral and \\(\\mathrm{XeF_4}\\) square planar: all symmetric with identical outer atoms, so their dipoles cancel.",
        ],
        answer: "(A) \\(\\mathrm{SO_2}\\)",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{CCl_4}\\) polar?", answer: "No", method: "Four identical polar bonds in a tetrahedron cancel" },
        { prompt: "Is \\(\\mathrm{CH_3Cl}\\) polar?", answer: "Yes", method: "Tetrahedral but the outer atoms are not all the same" },
        { prompt: "Why is \\(\\mathrm{H_2O}\\) polar but \\(\\mathrm{CO_2}\\) not?", answer: "Water is bent, so its dipoles add; \\(\\mathrm{CO_2}\\) is linear, so they cancel", method: "Two lone pairs on O" },
      ],
      traps: [
        {
          title: "Polar bonds can still give a non-polar molecule",
          body: "The C to O bonds in \\(\\mathrm{CO_2}\\) and the B to F bonds in \\(\\mathrm{BF_3}\\) are strongly polar, but the shapes are symmetric and the dipoles cancel. Ask about the shape before answering \"polar\".",
        },
        {
          title: "A tetrahedral molecule can be polar",
          body: "Tetrahedral cancels only when all four outer atoms are the same. \\(\\mathrm{CHCl_3}\\) is tetrahedral and polar, because its C to Cl and C to H bonds pull with different strengths.",
        },
      ],
    },
  ],
};
