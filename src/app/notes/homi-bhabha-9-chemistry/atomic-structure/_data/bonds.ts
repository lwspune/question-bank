import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_AT_BONDS_NOTE: SubtopicNote = {
  subtopicName: "Ionic and Covalent Bonds",
  title: "Ionic and Covalent Bonds",
  oneLineDefinition:
    "Atoms bond to reach a full outer shell like a noble gas: a metal and a non-metal do it by transferring electrons (an ionic bond), and two non-metals by sharing electron pairs (a covalent bond).",
  whyItMatters:
    "Six questions in the bank, one EASY and five MODERATE. Four are about ionic bonds (transfer and sharing in reactions, which compounds are not ionic, which pairs of elements form ionic compounds, why sodium chloride is so stable), and two about covalent bonds: the electron dot structure of acetylene and the properties of covalent compounds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9atbo-ionic",
      name: "Ionic bonds: transfer of electrons",
      intuition:
        "Neon, with a full outer shell, never reacts. Other atoms react to get a full shell too. Sodium has one electron too many and chlorine one too few, so sodium hands its electron to chlorine. Now sodium is a positive ion and chlorine a negative ion, both with full shells, and the opposite charges hold them tightly together.",
      definition:
        "- **Noble gases** (helium, neon, argon) have a **complete outer shell** (2 for helium, 8 for the others) and do not react.\n" +
        "- Other atoms combine to reach a complete octet. A **metal** gives electrons to a **non-metal**: this **transfer** forms ions, and the attraction between the oppositely charged ions is an **ionic bond**.\n" +
        "- Example: Na (2, 8, 1) loses one electron to form \\(\\mathrm{Na^+}\\) (2, 8); Cl (2, 8, 7) gains it to form \\(\\mathrm{Cl^-}\\) (2, 8, 8). Both have a complete octet, and the strong ionic bond makes NaCl very stable.\n" +
        "- In chemical reactions bonds can form both ways: by **transfer** of electrons (ionic) and by **sharing** of electrons (covalent).\n" +
        "- Ionic compounds are hard **crystalline solids** with **high melting and boiling points**; they dissolve in water and **conduct electricity** when molten or dissolved.",
      table: {
        columns: ["Compound", "Formed from", "Type of bond"],
        rows: [
          { cells: ["Sodium chloride, \\(\\mathrm{NaCl}\\)", "Metal + non-metal", "Ionic"] },
          { cells: ["Potassium bromide, \\(\\mathrm{KBr}\\)", "Metal + non-metal", "Ionic"] },
          { cells: ["Magnesium oxide, \\(\\mathrm{MgO}\\)", "Metal + non-metal", "Ionic"] },
          { cells: ["Calcium chloride, \\(\\mathrm{CaCl_2}\\)", "Metal + non-metal", "Ionic"] },
          { cells: ["Hydrogen chloride, \\(\\mathrm{HCl}\\)", "Two non-metals", "Covalent"], noteAmber: "It gives ions in water, but the HCl molecule itself is covalent." },
          { cells: ["Water, \\(\\mathrm{H_2O}\\)", "Two non-metals", "Covalent"] },
          { cells: ["Carbon tetrachloride, \\(\\mathrm{CCl_4}\\)", "Two non-metals", "Covalent"] },
        ],
        caption: "Metal with non-metal: ionic. Non-metal with non-metal: covalent. A noble gas: no bond at all.",
      },
      selfCheckExample: {
        prompt: "Which of these compounds are ionic: calcium oxide, carbon dioxide, lithium fluoride, ammonia?",
        steps: ["Calcium and lithium are metals, joined to the non-metals oxygen and fluorine: ionic.", "Carbon dioxide and ammonia are made only of non-metals: covalent."],
        answer: "Calcium oxide and lithium fluoride",
      },
      practiceSet: [
        { prompt: "Why does neon not form compounds?", answer: "Its outer shell is already complete (2, 8)" },
        { prompt: "Is an ionic bond formed by transfer or by sharing of electrons?", answer: "By transfer of electrons" },
        { prompt: "What are the electronic configurations of Na⁺ and Cl⁻?", answer: "Na⁺: 2, 8. Cl⁻: 2, 8, 8" },
        { prompt: "Does a solution of an ionic compound in water conduct electricity?", answer: "Yes, because it contains free ions" },
      ],
      pyqExampleId: "65d1235e-faf7-435b-83ff-22b1ac2cfe02",
      traps: [
        {
          title: "Calling HCl ionic because it is an acid",
          body: "Hydrogen and chlorine are both non-metals and share a pair of electrons, so the HCl molecule is covalent.",
        },
        {
          title: "Pairing a noble gas with another element",
          body: "A noble gas such as neon has a complete outer shell and forms no ionic compound.",
        },
        {
          title: "Giving a result as the reason for stability",
          body: "NaCl is stable because both ions have a complete octet and are held by a strong ionic bond. Its high melting point is a result of that bond, not its cause.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9atbo-covalent",
      name: "Covalent bonds: sharing electron pairs",
      intuition:
        "Two non-metals both want electrons, so neither gives any away. Instead they share. Each shared pair is one bond: one pair makes a single bond, two pairs a double bond, three pairs a triple bond. Molecules held this way are separate small units, so covalent compounds melt and boil easily.",
      definition:
        "- A **covalent bond** forms when two atoms, usually non-metals, **share** a pair of electrons. **Single** bond: 1 shared pair; **double**: 2 pairs; **triple**: 3 pairs.\n" +
        "- In an electron dot structure, each shared pair is drawn as two dots between the atoms.\n" +
        "- **Acetylene** (ethyne), \\(\\mathrm{C_2H_2}\\): the two carbon atoms share **three** pairs (a triple bond) and each carbon shares **one** pair with a hydrogen.\n" +
        "- Covalent compounds have **low melting and boiling points** (many are liquids or gases), often **dissolve in organic solvents** rather than water, and are **poor conductors** of heat and electricity.",
      table: {
        columns: ["Molecule", "Formula", "Shared pairs"],
        rows: [
          { cells: ["Hydrogen", "\\(\\mathrm{H_2}\\)", "1 (single bond)"] },
          { cells: ["Methane", "\\(\\mathrm{CH_4}\\)", "4 single bonds, one to each H"] },
          { cells: ["Oxygen", "\\(\\mathrm{O_2}\\)", "2 (double bond)"] },
          { cells: ["Carbon dioxide", "\\(\\mathrm{CO_2}\\)", "Two double bonds, one to each O"] },
          { cells: ["Nitrogen", "\\(\\mathrm{N_2}\\)", "3 (triple bond)"] },
          { cells: ["Acetylene (ethyne)", "\\(\\mathrm{C_2H_2}\\)", "3 between the two C atoms, 1 between each C and H"] },
        ],
        caption: "Count the dots between two atoms and halve them: that is the number of shared pairs.",
      },
      selfCheckExample: {
        prompt: "How many pairs of electrons are shared between the two atoms of a nitrogen molecule, and what is this bond called?",
        steps: ["Each N atom (2, 5) needs 3 more electrons, so each shares 3."],
        answer: "3 pairs: a triple bond",
      },
      practiceSet: [
        { prompt: "How many shared pairs of electrons are there in a molecule of methane?", answer: "4" },
        { prompt: "What kind of bond joins the two atoms of an oxygen molecule?", answer: "A double bond (2 shared pairs)" },
        { prompt: "Do covalent compounds generally have high or low melting points?", answer: "Low" },
        { prompt: "Are covalent compounds good conductors of electricity?", answer: "No, they conduct very poorly" },
      ],
      pyqExampleId: "b19824f2-bcba-45c0-a595-e52bb0142fcf",
      traps: [
        {
          title: "Giving covalent compounds a high boiling point",
          body: "Covalent compounds have low melting points AND low boiling points. High values belong to ionic compounds.",
        },
        {
          title: "Counting dots as bonds",
          body: "Two dots between atoms make one shared pair. Six dots between the carbon atoms of acetylene are a triple bond, not six bonds.",
        },
      ],
    },
  ],
};
