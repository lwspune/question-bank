import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_BND_LEWIS_NOTE: SubtopicNote = {
  subtopicName: "Covalent Bonds and Lewis Structures",
  title: "Covalent Bonds, Lewis Structures and the Octet Rule",
  oneLineDefinition:
    "A covalent bond is a shared pair of electrons; a Lewis structure shows every shared pair and lone pair, and most atoms end with eight electrons around them.",
  whyItMatters:
    "The papers ask how many electrons an atom uses in bonding (2011, 2022), how single, double and triple carbon bonds compare in length and strength (2013), and which central atoms break the octet rule. Expect a \"which statements are correct\" format.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bnd-covalent",
      name: "Single, double and triple covalent bonds",
      intuition:
        "Two non-metal atoms both want more electrons, so neither can take them from the other. Instead each puts electrons into a shared pair that both nuclei attract. Sharing two or three pairs pulls the atoms closer together and holds them more tightly.",
      definition:
        "A **covalent bond** is a pair of electrons shared between two atoms, usually one electron from each.\n" +
        "- **Single** bond: one shared pair (2 electrons). **Double**: two pairs (4). **Triple**: three pairs (6).\n" +
        "- The first bond between two atoms is a **σ (sigma)** bond; the second and third are **π (pi)** bonds. How carbon's orbitals make them (hybridisation) is taught in Organic Chemistry.\n" +
        "- More shared pairs: **shorter** and **stronger** bond.\n" +
        "- For carbon, a double bond is **less than twice** as strong as a single bond, because a π bond is weaker than a σ bond. Do not assume this for every element.\n" +
        "- Breaking any bond takes in energy (endothermic); forming one gives energy out.",
      table: {
        columns: ["Carbon to carbon bond", "Shared electrons", "Made of", "Length (pm)", "Bond energy (kJ/mol)"],
        rows: [
          { cells: ["Single, as in ethane", "2", "1 σ", "154", "about 348"] },
          { cells: ["Double, as in ethene", "4", "1 σ + 1 π", "134", "about 614"] },
          { cells: ["Triple, as in ethyne", "6", "1 σ + 2 π", "120", "about 839"] },
        ],
        caption: "Twice the single bond would be 696 kJ/mol, so the double bond (614) is less than twice as strong.",
      },
      selfCheckExample: {
        prompt:
          "Propyne contains one triple bond between two of its carbon atoms. How many electrons are shared between those two carbon atoms, and how many of the bonds between them are π bonds?",
        options: [
          "3 electrons; 3 π bonds",
          "3 electrons; 2 π bonds",
          "4 electrons; 2 π bonds",
          "6 electrons; 3 π bonds",
          "6 electrons; 2 π bonds",
        ],
        steps: [
          "A triple bond is three shared pairs: \\(3 \\times 2 = 6\\) electrons.",
          "One of the three bonds is σ; the other two are π.",
          "A and B count bonds instead of electrons; D forgets that the first bond is always σ.",
        ],
        answer: "(E) 6 electrons; 2 π bonds",
      },
      practiceSet: [
        { prompt: "Put C=C, C≡C and C-C in order of increasing bond length.", answer: "C≡C, C=C, C-C", method: "More shared pairs, shorter bond" },
        { prompt: "How many σ and π bonds are there in ethene, \\(\\mathrm{C_2H_4}\\)?", answer: "5 σ and 1 π", method: "4 C to H bonds and 1 C to C σ, plus the π" },
        { prompt: "How many electrons are shared in the \\(\\mathrm{O{=}O}\\) bond?", answer: "4", method: "Two shared pairs" },
      ],
      traps: [
        {
          title: "A triple bond shares six electrons, not three",
          body: "Each bond is a pair. A double bond shares four electrons and a triple bond six. Options that count the bond lines (2 or 3) as the number of electrons are wrong.",
        },
        {
          title: "A C=C bond is not twice as strong as a C-C bond",
          body: "The π bond is weaker than the σ bond, so the carbon double bond (about 614 kJ/mol) is less than double the single bond (about 348 kJ/mol). It is still stronger and shorter than the single bond.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bnd-lewis-count",
      name: "Drawing a Lewis structure by counting electrons",
      intuition:
        "Only outer (valence) electrons take part in bonding, and for main group elements their number is the group number. Count them all, connect the atoms with single bonds, then hand out the rest so each atom gets eight. If you run out, turn lone pairs into extra bonds.",
      definition:
        "A **Lewis structure** shows every valence electron: shared pairs as lines and **lone pairs** (non-bonding pairs) as dots.\n" +
        "- Valence electrons: Group 1 has 1, Group 2 has 2, Groups 13 to 17 have 3 to 7. Hydrogen has 1.\n" +
        "- For an ion, add one electron per negative charge and remove one per positive charge.\n" +
        "- The **octet rule**: most atoms end with eight electrons around them (shared pairs count for both atoms). Hydrogen ends with two.\n" +
        "- Steps: put the least electronegative atom (never H) in the centre; join each outer atom with a single bond; complete the outer atoms' octets; put any electrons left on the central atom; if the central atom is short of eight, move a lone pair from an outer atom into a double bond.\n" +
        "- An atom with **no lone pairs** has used all its valence electrons in bonds, as carbon does in \\(\\mathrm{CH_4}\\).",
      formula: {
        label: "Electrons to place in a Lewis structure",
        latex: "N_e = \\sum V - q",
        symbols: [
          { symbol: "\\(V\\)", meaning: "valence electrons of each atom (its group number for groups 13 to 17)" },
          { symbol: "\\(q\\)", meaning: "charge of the ion, with its sign (0 for a neutral molecule)" },
          { symbol: "\\(N_e\\)", meaning: "total electrons to place; \\(N_e/2\\) pairs" },
        ],
      },
      authoredExample: {
        prompt: "Draw the Lewis structure of hydrogen cyanide, HCN, and count its bonding pairs and lone pairs.",
        steps: [
          "\\(N_e = 1 + 4 + 5 = 10\\) electrons, so 5 pairs.",
          "Carbon goes in the centre: H to C to N with two single bonds uses 2 pairs.",
          "3 pairs are left. Put them on N: now N has 8, but C has only 4.",
          "Move two of nitrogen's lone pairs into bonds with carbon: \\(\\mathrm{H{-}C{\\equiv}N}\\). Now C has 8 (four bonds) and N has 8 (three bonds and one lone pair).",
          "Bonding pairs: 1 + 3 = 4. Lone pairs: 1, on nitrogen.",
        ],
        answer: "\\(\\mathrm{H{-}C{\\equiv}N}\\) with one lone pair on N: 4 bonding pairs, 1 lone pair",
      },
      selfCheckExample: {
        prompt:
          "Phosgene, \\(\\mathrm{COCl_2}\\), has carbon as its central atom, bonded to one oxygen and two chlorine atoms, and every atom obeys the octet rule. How many lone pairs are there in the whole molecule?",
        options: ["4", "6", "8", "10", "12"],
        steps: [
          "\\(N_e = 4 + 6 + 2 \\times 7 = 24\\) electrons, 12 pairs.",
          "Carbon needs four bonds: one double bond to O and single bonds to each Cl. That is 4 bonding pairs.",
          "Lone pairs: \\(12 - 4 = 8\\) (two on O, three on each Cl).",
          "E is the total number of pairs; A is the number of bonding pairs.",
        ],
        answer: "(C) 8",
      },
      practiceSet: [
        { prompt: "How many valence electrons are in the ammonium ion, \\(\\mathrm{NH_4^+}\\)?", answer: "8", method: "\\(5 + 4 - 1\\)" },
        { prompt: "How many valence electrons are in the sulfate ion, \\(\\mathrm{SO_4^{2-}}\\)?", answer: "32", method: "\\(6 + 4 \\times 6 + 2\\)" },
        { prompt: "How many lone pairs does the oxygen atom in water have?", answer: "2", method: "8 electrons: 2 bonding pairs and 2 lone pairs" },
        { prompt: "Draw \\(\\mathrm{N_2}\\): how many bonds join the atoms and how many lone pairs are there?", answer: "A triple bond; one lone pair on each N", method: "10 electrons, 5 pairs" },
      ],
      traps: [
        {
          title: "Count the charge of an ion",
          body: "A negative ion has extra electrons and a positive ion has fewer. Leaving the charge out gives the wrong number of lone pairs, and IMAT offers that wrong count among the options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-bnd-dative",
      name: "Dative (coordinate) covalent bonds",
      intuition:
        "Usually each atom gives one electron to a shared pair. But an atom with a lone pair can share the whole pair with an atom or ion that has an empty space. Once formed, the bond is just a shared pair like any other: you cannot tell it apart.",
      definition:
        "A **dative** (coordinate) covalent bond is a shared pair in which **both electrons come from the same atom**.\n" +
        "- The **donor** has a lone pair (N in \\(\\mathrm{NH_3}\\), O in \\(\\mathrm{H_2O}\\), Cl in a chloride).\n" +
        "- The **acceptor** has an empty orbital (\\(\\mathrm{H^+}\\), B in \\(\\mathrm{BF_3}\\), Al in \\(\\mathrm{AlCl_3}\\)).\n" +
        "- It is drawn as an arrow from donor to acceptor, but after it forms it is identical to the other bonds: the four N to H bonds in \\(\\mathrm{NH_4^+}\\) are all the same.\n" +
        "- Common examples: \\(\\mathrm{NH_4^+}\\), \\(\\mathrm{H_3O^+}\\), carbon monoxide (one of its three bonds), \\(\\mathrm{Al_2Cl_6}\\), and the bonds between metal ions and ligands in complexes such as haemoglobin's iron.",
      authoredExample: {
        prompt:
          "Ammonia, \\(\\mathrm{NH_3}\\), reacts with boron trifluoride, \\(\\mathrm{BF_3}\\), to form \\(\\mathrm{H_3N{\\rightarrow}BF_3}\\). Explain the bond formed and the electrons around boron before and after.",
        steps: [
          "In \\(\\mathrm{BF_3}\\), boron has three bonding pairs: 6 electrons, two short of an octet, so it has an empty orbital.",
          "Nitrogen in \\(\\mathrm{NH_3}\\) has one lone pair.",
          "Nitrogen shares that whole pair with boron: a dative bond, N donor, B acceptor.",
          "Boron now has four bonding pairs, 8 electrons. Nitrogen still has 8, now all in bonds.",
        ],
        answer: "A dative bond N to B; boron goes from 6 to 8 electrons",
      },
      selfCheckExample: {
        prompt: "Which one of the following species contains a dative covalent bond?",
        options: [
          "\\(\\mathrm{CH_4}\\)",
          "\\(\\mathrm{H_3O^+}\\)",
          "\\(\\mathrm{NH_3}\\)",
          "\\(\\mathrm{BF_3}\\)",
          "\\(\\mathrm{C_2H_4}\\)",
        ],
        steps: [
          "\\(\\mathrm{H_3O^+}\\) forms when water donates a lone pair from O to an \\(\\mathrm{H^+}\\) ion, which has no electrons of its own.",
          "C and D can take part in dative bonds (as donor and acceptor), but on their own they contain only ordinary covalent bonds.",
          "A and E: every bond has one electron from each atom.",
        ],
        answer: "(B) \\(\\mathrm{H_3O^+}\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\mathrm{NH_4^+}\\), how many bonds are dative, and can you tell which one?", answer: "One; no, all four N to H bonds are identical", method: "A dative bond is a normal shared pair once formed" },
        { prompt: "What must a donor atom have?", answer: "A lone pair", method: "It gives both electrons" },
        { prompt: "In \\(\\mathrm{Al_2Cl_6}\\), which atoms donate and which accept?", answer: "Bridging Cl atoms donate lone pairs to Al", method: "Al has only 6 electrons in \\(\\mathrm{AlCl_3}\\)" },
      ],
      traps: [
        {
          title: "A dative bond is not weaker or different once formed",
          body: "The arrow only records where the electrons came from. In \\(\\mathrm{NH_4^+}\\) all four N to H bonds have the same length and strength, and the ion is a regular tetrahedron.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-octet-exceptions",
      name: "Exceptions to the octet rule",
      intuition:
        "The octet rule is a strong habit, not a law. Atoms with very few valence electrons cannot reach eight by sharing alone. Atoms from period 3 onwards are larger and can fit more than four pairs around them. And a molecule with an odd number of electrons cannot pair them all.",
      definition:
        "Three kinds of exception:\n" +
        "- **Incomplete octet**: Be and B (and Al in its chloride) form compounds with fewer than 8 electrons on the central atom. These are electron-pair acceptors.\n" +
        "- **Expanded octet**: elements of **period 3 and below** (P, S, Cl, Xe) can hold 10 or 12 electrons. Period 2 elements (C, N, O, F) never can: \\(\\mathrm{PCl_5}\\) exists but \\(\\mathrm{NCl_5}\\) does not.\n" +
        "- **Odd-electron molecules** (radicals): NO and \\(\\mathrm{NO_2}\\) have an odd total, so one atom has an unpaired electron.\n" +
        "- Hydrogen is complete with 2 electrons (a duet).",
      table: {
        columns: ["Molecule", "Kind of exception", "Electrons around central atom", "Note"],
        rows: [
          { cells: ["\\(\\mathrm{BeCl_2}\\) (gas)", "Incomplete octet", "4", "Two bonding pairs, linear"] },
          { cells: ["\\(\\mathrm{BF_3}\\)", "Incomplete octet", "6", "Accepts a lone pair to reach 8"] },
          { cells: ["\\(\\mathrm{AlCl_3}\\)", "Incomplete octet", "6", "Pairs up as \\(\\mathrm{Al_2Cl_6}\\), where each Al has 8"] },
          { cells: ["\\(\\mathrm{PCl_5}\\)", "Expanded octet", "10", "Five bonding pairs"] },
          { cells: ["\\(\\mathrm{SF_6}\\)", "Expanded octet", "12", "Six bonding pairs"] },
          { cells: ["NO", "Odd electron", "11 valence electrons in total", "One unpaired electron"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which one of these molecules does the central atom have fewer than eight electrons in its outer shell?",
        options: [
          "\\(\\mathrm{NF_3}\\)",
          "\\(\\mathrm{CCl_4}\\)",
          "\\(\\mathrm{H_2S}\\)",
          "\\(\\mathrm{PCl_3}\\)",
          "\\(\\mathrm{BCl_3}\\)",
        ],
        steps: [
          "Boron has 3 valence electrons and forms three single bonds: 6 electrons.",
          "N in \\(\\mathrm{NF_3}\\) and P in \\(\\mathrm{PCl_3}\\): three bonds and one lone pair, 8. C in \\(\\mathrm{CCl_4}\\): four bonds, 8. S in \\(\\mathrm{H_2S}\\): two bonds and two lone pairs, 8.",
        ],
        answer: "(E) \\(\\mathrm{BCl_3}\\)",
      },
      practiceSet: [
        { prompt: "Can nitrogen form \\(\\mathrm{NF_5}\\)?", answer: "No", method: "Period 2 atoms cannot expand the octet" },
        { prompt: "How many electrons surround S in \\(\\mathrm{SF_6}\\)?", answer: "12", method: "Six bonding pairs" },
        { prompt: "Why is \\(\\mathrm{NO_2}\\) called a radical?", answer: "It has an odd number of electrons (17), so one is unpaired", method: "\\(5 + 2 \\times 6\\)" },
      ],
      traps: [
        {
          title: "Only period 3 and lower can expand the octet",
          body: "Phosphorus and sulfur can hold 10 or 12 electrons; nitrogen and oxygen, just above them in the same groups, cannot. An option giving nitrogen five bonds or oxygen four bonds in a neutral molecule is wrong.",
        },
      ],
    },
  ],
};
