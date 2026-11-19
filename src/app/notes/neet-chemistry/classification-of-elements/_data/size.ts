import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_CH_CP_SIZE_NOTE: SubtopicNote = {
  subtopicName: "Atomic Size and Ionisation Enthalpy",
  title: "Atomic Size and Ionisation Enthalpy",
  oneLineDefinition:
    "How atomic radius falls across a period and rises down a group, why a cation is smaller and an anion larger than its atom, how size runs in an isoelectronic series, and how first ionisation enthalpy rises across a period with two dips.",
  whyItMatters:
    "Five NEET questions, from 2023 to 2026. One orders Li, Be, B and C by atomic radius (Re-NEET 2024), one asks which element forms the largest ion on reaching the nearest noble gas configuration (2023), and one is a five-statement question whose true statements are about isoelectronic species and the radius of caesium (2025). Two are on ionisation enthalpy: the order for Li, Be, B, C and N (2024), and an assertion that oxygen's first ionisation enthalpy is lower than that of nitrogen and fluorine (Re-NEET 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "nchcp-atomic-radius",
      name: "Atomic radius across a period and down a group",
      visualizationSlug: "atom-periodic-trends",
      intuition:
        "Across a period, each new electron goes into the same outer shell while the nuclear charge rises by one. The bigger effective nuclear charge pulls the whole electron cloud in, so the atom shrinks. Down a group, every step adds a new shell further from the nucleus, and the inner electrons shield the outer ones, so the atom grows.",
      definition:
        "- **Covalent radius:** half the distance between the nuclei of two atoms joined by a single bond. The Cl-Cl bond in \\(\\text{Cl}_2\\) is 198 pm, so the radius of chlorine is 99 pm.\n" +
        "- **Metallic radius:** half the distance between neighbouring atoms in a metal crystal. In solid copper the atoms are 256 pm apart, so the metallic radius of copper is 128 pm.\n" +
        "- **Across a period** the atomic radius decreases: the effective nuclear charge rises while the outer shell stays the same.\n" +
        "- **Down a group** the atomic radius increases: \\(n\\) rises and the inner electrons shield the outer ones.\n" +
        "- Noble gas radii are left out of these comparisons. Being monoatomic, their non-bonded (van der Waals) radii are very large and should not be compared with covalent radii.",
      table: {
        columns: ["Series", "Atomic radius in pm", "Trend"],
        rows: [
          { cells: ["Period 2", "Li 152, Be 111, B 88, C 77, N 74, O 66, F 64", "Falls across the period"], pyqExampleId: "e97abedf-0ac2-48cb-98f7-b2996eb1c3a8", noteAmber: "Re-NEET 2024: the decreasing order asked was Li > Be > B > C." },
          { cells: ["Period 3", "Na 186, Mg 160, Al 143, Si 117, P 110, S 104, Cl 99", "Falls across the period"] },
          { cells: ["Group 1", "Li 152, Na 186, K 231, Rb 244, Cs 262", "Rises down the group"] },
          { cells: ["Group 17", "F 64, Cl 99, Br 114, I 133, At 140", "Rises down the group"] },
        ],
        caption: "Values are NCERT's covalent or metallic radii.",
      },
      pyqExampleId: "e97abedf-0ac2-48cb-98f7-b2996eb1c3a8",
      selfCheckExample: {
        prompt: "Potassium and sodium are both in group 1. Which atom is larger, and why?",
        steps: [
          "Potassium's outer electron is in the fourth shell (4s); sodium's is in the third (3s).",
          "The extra shell, shielded by more inner electrons, puts potassium's outer electron further out.",
        ],
        answer: "Potassium (231 pm against 186 pm for sodium)",
      },
      practiceSet: [
        { prompt: "The bond length in a Cl₂ molecule is 198 pm. What is the covalent radius of chlorine?", answer: "99 pm" },
        { prompt: "Neighbouring atoms in solid copper are 256 pm apart. What is the metallic radius of copper?", answer: "128 pm" },
        { prompt: "Which atom is larger, bromine or iodine?", answer: "Iodine (133 pm against 114 pm)" },
        { prompt: "Why are noble gas radii not compared with the covalent radii of other elements in the same period?", answer: "Noble gases are monoatomic, so their radii are non-bonded (van der Waals) radii, which are much larger" },
      ],
      traps: [
        {
          title: "More electrons, yet a smaller atom",
          body: "Across a period the atom gains electrons but gets smaller, because the nuclear charge rises and the electrons stay in the same shell. Lithium is the largest atom of period 2, not fluorine.",
        },
        {
          title: "Leave the noble gas out of a period's order",
          body: "A noble gas radius is a van der Waals radius, which is much larger than a covalent radius. It does not fit the falling trend of its period.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcp-ionic-radius",
      name: "Ionic radius and isoelectronic species",
      intuition:
        "Take an electron away and the same nucleus now holds fewer electrons, so it pulls each one in harder: a cation is smaller than its atom. Add an electron and the same nucleus has more to hold, while the electrons repel each other more: an anion is larger. When several ions have the same number of electrons, the one with the most protons pulls hardest and is the smallest.",
      definition:
        "- A **cation** is smaller than its parent atom: Na is 186 pm, \\(\\text{Na}^+\\) is 95 pm.\n" +
        "- An **anion** is larger than its parent atom: F is 64 pm, \\(\\text{F}^-\\) is 136 pm.\n" +
        "- **Isoelectronic species** are atoms and ions with the same number of electrons, for example \\(\\text{O}^{2-}\\), \\(\\text{F}^-\\), Ne, \\(\\text{Na}^+\\) and \\(\\text{Mg}^{2+}\\), all with 10 electrons.\n" +
        "- In an isoelectronic series the radius falls as the nuclear charge rises. So the cation with the larger positive charge is smaller, and the anion with the larger negative charge is larger.\n" +
        "- To find an ion's electrons: atomic number minus the positive charge, or plus the negative charge.",
      table: {
        columns: ["Species", "Protons", "Electrons", "Place in the 10-electron series"],
        rows: [
          { cells: ["N³⁻", "7", "10", "Largest: fewest protons"], pyqExampleId: "309a87fb-8015-4455-a9d4-bc4d4220d70e", noteAmber: "NEET 2023: of O, F, N and Na, nitrogen forms the largest ion on reaching the neon configuration." },
          { cells: ["O²⁻", "8", "10", "Second largest"] },
          { cells: ["F⁻", "9", "10", "Third"] },
          { cells: ["Na⁺", "11", "10", "Fourth"] },
          { cells: ["Mg²⁺", "12", "10", "Fifth"] },
          { cells: ["Al³⁺", "13", "10", "Smallest: most protons"] },
        ],
        caption: "Same electrons, different nuclear charge: size falls as the proton count rises.",
      },
      pyqExampleId: "309a87fb-8015-4455-a9d4-bc4d4220d70e",
      selfCheckExample: {
        prompt: "Arrange \\(\\text{Cl}^-\\), \\(\\text{K}^+\\), \\(\\text{Ca}^{2+}\\) and \\(\\text{S}^{2-}\\) in decreasing order of size.",
        steps: [
          "Each has 18 electrons: \\(16 + 2\\) for S, \\(17 + 1\\) for Cl, \\(19 - 1\\) for K and \\(20 - 2\\) for Ca.",
          "The protons are 16, 17, 19 and 20. More protons pull the same 18 electrons in harder.",
        ],
        answer: "\\(\\text{S}^{2-} > \\text{Cl}^- > \\text{K}^+ > \\text{Ca}^{2+}\\)",
      },
      practiceSet: [
        { prompt: "Which is smaller, a sodium atom or a sodium ion, Na⁺?", answer: "\\(\\text{Na}^+\\) (95 pm against 186 pm)" },
        { prompt: "Which is larger, a fluorine atom or a fluoride ion, F⁻?", answer: "\\(\\text{F}^-\\) (136 pm against 64 pm)" },
        { prompt: "How many electrons does the sulphide ion, S²⁻, have?", answer: "18" },
        { prompt: "Name two cations that are isoelectronic with neon.", answer: "Any two of \\(\\text{Na}^+\\), \\(\\text{Mg}^{2+}\\) and \\(\\text{Al}^{3+}\\)" },
      ],
      traps: [
        {
          title: "Same electrons does not mean same size",
          body: "Isoelectronic species have the same number of electrons but different nuclear charges, so their sizes differ. The one with fewer protons is larger.",
        },
        {
          title: "Count electrons, not protons",
          body: "To test whether species are isoelectronic, count electrons: \\(\\text{Ca}^{2+}\\) has \\(20 - 2 = 18\\), the same as argon, though calcium's atomic number is 20.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nchcp-ionisation-enthalpy",
      name: "First ionisation enthalpy and its two dips",
      intuition:
        "Ionisation enthalpy is the price of pulling one electron off a gaseous atom. Across a period the nucleus grips harder and the atom gets smaller, so the price rises. Down a group the outer electron sits further out and is better shielded, so the price falls. Two steps in each period go down instead of up, and both are about which orbital the electron leaves from.",
      definition:
        "- **Ionisation enthalpy** is the energy needed to remove the most loosely bound electron from an isolated gaseous atom in its ground state: \\(\\text{X(g)} \\rightarrow \\text{X}^+\\text{(g)} + e^-\\). It is always positive and is given in kJ/mol.\n" +
        "- The second ionisation enthalpy is higher than the first, because it is harder to remove an electron from a positive ion.\n" +
        "- **Across a period** it generally increases; **down a group** it decreases.\n" +
        "- **Boron is below beryllium:** boron's electron comes from 2p, beryllium's from 2s. A 2s electron penetrates closer to the nucleus, so a 2p electron is more shielded and easier to remove.\n" +
        "- **Oxygen is below nitrogen:** nitrogen's three 2p electrons are in separate orbitals. In oxygen two of the four 2p electrons share an orbital, and their repulsion makes one of them easier to remove.\n" +
        "- The same two dips appear in period 3: Al is below Mg, and S is below P.",
      table: {
        columns: ["Group", "Period 2 (kJ/mol)", "Period 3 (kJ/mol)", "Why"],
        rows: [
          { cells: ["1", "Li 520", "Na 496", "One s electron outside a noble gas core: lowest in the period"] },
          { cells: ["2", "Be 899", "Mg 737", "Electron removed from a filled ns subshell"] },
          { cells: ["13", "B 801", "Al 577", "Dip: the np electron is more shielded than an ns electron"], pyqExampleId: "a2428897-81af-444e-910c-b2de5435b22a", noteAmber: "NEET 2024: the increasing order was Li < B < Be < C < N, with boron below beryllium." },
          { cells: ["14", "C 1086", "Si 786", "Rises again"] },
          { cells: ["15", "N 1402", "P 1012", "Three np electrons in separate orbitals"] },
          { cells: ["16", "O 1314", "S 1000", "Dip: two np electrons share an orbital and repel"] },
          { cells: ["17", "F 1681", "Cl 1256", "Rises again"] },
          { cells: ["18", "Ne 2080", "Ar 1520", "Filled shell: highest in the period"] },
        ],
      },
      pyqExampleId: "a2428897-81af-444e-910c-b2de5435b22a",
      selfCheckExample: {
        prompt: "Which has the higher first ionisation enthalpy, phosphorus or sulphur? Give the reason.",
        steps: [
          "Phosphorus is \\([\\text{Ne}]3s^23p^3\\): its three 3p electrons are in separate orbitals.",
          "Sulphur is \\([\\text{Ne}]3s^23p^4\\): two of its 3p electrons share an orbital, and their repulsion makes one easier to remove.",
        ],
        answer: "Phosphorus (1012 kJ/mol against 1000 kJ/mol for sulphur)",
      },
      practiceSet: [
        { prompt: "Write the equation for the first ionisation of sodium.", answer: "\\(\\text{Na(g)} \\rightarrow \\text{Na}^+\\text{(g)} + e^-\\)" },
        { prompt: "Which element of period 2 has the highest first ionisation enthalpy?", answer: "Neon (2080 kJ/mol)" },
        { prompt: "Why is the second ionisation enthalpy of an element higher than its first?", answer: "The second electron is removed from a positive ion, which holds its electrons more strongly" },
        { prompt: "Which has the lower first ionisation enthalpy, lithium or sodium?", answer: "Sodium (496 kJ/mol against 520 kJ/mol)" },
      ],
      traps: [
        {
          title: "Group 13 is below group 2",
          body: "First ionisation enthalpy does not rise smoothly across a period. Boron (801) is below beryllium (899) and aluminium (577) is below magnesium (737).",
        },
        {
          title: "Group 16 is below group 15",
          body: "Oxygen (1314) is below nitrogen (1402), and sulphur (1000) is below phosphorus (1012), because of the paired np electron in group 16.",
        },
        {
          title: "Ionisation enthalpy is never negative",
          body: "Removing an electron always needs energy, so every ionisation enthalpy is positive. A low value means the electron is easy to remove, not that energy is released.",
        },
      ],
    },
  ],
};
