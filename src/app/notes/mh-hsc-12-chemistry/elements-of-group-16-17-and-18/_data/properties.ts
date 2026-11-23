import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_GP_PROPERTIES_NOTE: SubtopicNote = {
  subtopicName: "Atomic and Physical Properties",
  title: "Atomic and Physical Properties of Groups 16, 17 and 18",
  oneLineDefinition:
    "How atomic radius, ionisation enthalpy, electronegativity and electron gain enthalpy change down and across groups 16, 17 and 18, and why the elements differ in state, colour and boiling point.",
  whyItMatters:
    "12 questions. Three were set in board papers: the trends in atomic radius, ionisation enthalpy, electronegativity and electron gain enthalpy in group 16 (2022), why group 16 has a lower ionisation enthalpy than group 15 (2023), and the trends in atomic radius and electronegativity in group 17 (2026). The textbook adds its solved problems on the electron gain enthalpy of fluorine, the weak bond in F₂ and the low boiling points of the noble gases.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccgp-group-trends",
      name: "Trends down groups 16 and 17",
      intuition:
        "Going down a group, each element adds a whole new shell of electrons. The outer electrons sit further from the nucleus and more inner shells screen them. So the atom grows, it lets go of an electron more easily, and it pulls less strongly on shared or incoming electrons. Only the first members, oxygen and fluorine, break one trend: they are so small that an extra electron is crowded and unwelcome.",
      definition:
        "- **Atomic and ionic radii** increase down each group because a new quantum shell is added at each step. Across a period they decrease as the effective nuclear charge rises, so the halogens have the smallest atoms of their periods.\n" +
        "- **Ionisation enthalpy** is high for groups 16, 17 and 18 and decreases down each group as the atoms grow.\n" +
        "- **Electronegativity** decreases down each group. Fluorine is the most electronegative element; oxygen comes next to fluorine.\n" +
        "- **Electron gain enthalpy** becomes less negative down groups 16 and 17. The first member breaks the trend: oxygen is less negative than sulfur, and fluorine less negative than chlorine, because the incoming electron is crowded into a small 2p subshell. So chlorine has the most negative electron gain enthalpy in group 17.\n" +
        "- **Noble gases** have a stable \\(ns^2np^6\\) shell, no tendency to accept an electron, and a large positive electron gain enthalpy.\n" +
        "- In a 'trends' answer give three things for each property: the direction of change, the reason, and the values from the table.",
      table: {
        columns: ["Property", "Trend down the group", "Reason", "Values: group 16 (O, S, Se, Te, Po); group 17 (F, Cl, Br, I)"],
        rows: [
          {
            cells: ["Atomic radius (pm)", "Increases", "A new shell is added at each step", "66, 104, 117, 137, 146; 64, 99, 114, 133"],
            pyqExampleId: "ce6579f0-b63f-4e6a-af6d-3e436baad357",
            noteAmber: "Board 2026 asked the trends in atomic radius and electronegativity for group 17.",
          },
          { cells: ["First ionisation enthalpy (kJ/mol)", "Decreases", "Outer electron further away and better screened", "1314, 1000, 941, 869, 813; 1680, 1256, 1142, 1008"] },
          { cells: ["Electronegativity", "Decreases", "Bonding pair held further from the nucleus", "3.50, 2.44, 2.48, 2.01, 1.76; 4.0, 3.2, 3.0, 2.7"] },
          {
            cells: [
              "Electron gain enthalpy (kJ/mol)",
              "Less negative, except the first member",
              "Oxygen and fluorine are so small that the added electron meets strong repulsion",
              "\\(-141, -200, -195, -190, -174\\); \\(-333, -349, -325, -296\\)",
            ],
            pyqExampleId: "002f726a-0b30-4df3-88ea-a77149e38050",
          },
        ],
      },
      practiceSet: [
        { prompt: "Which element of group 16 has the most negative electron gain enthalpy?", answer: "Sulfur, \\(-200\\) kJ/mol" },
        { prompt: "Why does electronegativity decrease down group 17?", answer: "The atom grows, so the shared pair is held further from the nucleus and is screened by more inner shells" },
        { prompt: "Why do noble gases have a positive electron gain enthalpy?", answer: "Their stable \\(ns^2np^6\\) configuration gives them no tendency to accept an electron" },
        { prompt: "Which group has the smallest atoms in each period: 16, 17 or 18?", answer: "Group 17, the halogens" },
      ],
      pyqExampleId: "96a49daf-bf1f-406e-9c41-ea92274455e4",
      traps: [
        {
          title: "Fluorine is not the most negative",
          body: "Chlorine has the most negative electron gain enthalpy of the halogens, not fluorine. The small 2p subshell of fluorine repels the incoming electron.",
        },
        {
          title: "Oxygen breaks the group 16 trend too",
          body: "Oxygen's electron gain enthalpy is the least negative in its group, even less than polonium's. Do not write it as the most negative because it is at the top.",
        },
        {
          title: "A trend with no reason",
          body: "'Decreases down the group' earns half the marks. Add the reason, such as 'because a new shell is added and the outer electrons are further from the nucleus'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccgp-ionisation",
      name: "Ionisation enthalpy across a period",
      intuition:
        "Across a period each element adds one proton to the nucleus and one electron to the same shell. The extra electron hardly screens the others, so the nucleus pulls harder and the atom shrinks. Removing an electron gets steadily harder. The one dip is from group 15 to group 16: group 15 has three p electrons, one in each p orbital, a half-filled and extra stable arrangement.",
      definition:
        "- **Across a period** ionisation enthalpy increases with atomic number: the effective nuclear charge rises and the atomic size falls, while the electrons are added to the same shell.\n" +
        "- **Group 16 below group 15:** a group 15 element has \\(ns^2np^3\\), a half-filled p subshell that is extra stable, so more energy is needed to remove an electron. A group 16 element of the same period has \\(ns^2np^4\\), so it has the lower ionisation enthalpy.\n" +
        "- **Down a group** ionisation enthalpy decreases as the atomic size increases.\n" +
        "- **Group 18** has the highest values of each period because of the completely filled \\(ns^2np^6\\) shell. Down the group the value falls, from helium 2372 to xenon 1170 kJ/mol, which is why the heavier noble gases krypton, xenon and radon can form compounds.\n" +
        "- Sulfur, chlorine and argon are all in the **third** period. The textbook's printed solution to its Problem 7.2 says 'second period'; that is a misprint.",
      formula: {
        label: "Ionisation enthalpy: group 15 against group 16",
        latex: "I_1(\\text{group 15},\\ ns^2np^3) > I_1(\\text{group 16},\\ ns^2np^4) \\ \\text{in the same period}",
      },
      authoredExample: {
        prompt:
          "The first ionisation enthalpies of selenium and bromine are 941 and 1142 kJ mol⁻¹. Explain why the value for bromine is higher.",
        steps: [
          "Given: \\(I_1(\\text{Se}) = 941\\) kJ mol⁻¹, \\(I_1(\\text{Br}) = 1142\\) kJ mol⁻¹.",
          "Selenium \\([\\text{Ar}]3d^{10}4s^24p^4\\) and bromine \\([\\text{Ar}]3d^{10}4s^24p^5\\) are next to each other in the fourth period, so the electron removed comes from the same shell.",
          "Across a period the effective nuclear charge increases and the atomic size decreases (Se 117 pm, Br 114 pm).",
          "The valence electron of bromine is held more tightly, so more energy is needed to remove it.",
        ],
        answer: "Br is after Se in the same period: higher effective nuclear charge, smaller atom, so a higher ionisation enthalpy (Se < Br)",
      },
      selfCheckExample: {
        prompt: "Arrange oxygen, sulfur, selenium and tellurium in decreasing order of first ionisation enthalpy, and give the reason.",
        steps: [
          "Values: O 1314, S 1000, Se 941, Te 869 kJ/mol.",
          "Down the group a new shell is added, so the outer electron is further away and easier to remove.",
        ],
        answer: "O > S > Se > Te",
      },
      practiceSet: [
        { prompt: "Which element has the highest first ionisation enthalpy in group 18?", answer: "Helium, 2372 kJ/mol" },
        { prompt: "Why can xenon form compounds while helium and neon cannot?", answer: "Xenon has a much lower ionisation enthalpy (1170 kJ/mol), because its atom is larger" },
        { prompt: "In which period are sulfur and chlorine placed?", answer: "The third period" },
        { prompt: "Across a period, what happens to the effective nuclear charge?", answer: "It increases, so the atomic size decreases" },
      ],
      pyqExampleId: "200c0d1a-1223-42fe-824a-b72cc07a34df",
      traps: [
        {
          title: "Half-filled, not full",
          body: "The stable arrangement of group 15 is a half-filled p subshell, \\(np^3\\). Writing 'completely filled' gives the wrong reason.",
        },
        {
          title: "Copying the misprinted period",
          body: "Sulfur is \\([\\text{Ne}]3s^23p^4\\), so it is in the third period, not the second. Write the period correctly even though the printed solution says second.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccgp-physical",
      name: "Physical properties: state, colour and boiling point",
      intuition:
        "Molecules of these elements are held to each other only by weak van der Waals forces, and those forces grow with the size of the molecule. Tiny O₂ molecules and single noble gas atoms barely attract each other, so they boil far below room temperature. Big S₈ rings attract strongly, so sulfur is a solid.",
      definition:
        "- **Group 16:** oxygen is a gas, the others are solids. Oxygen and sulfur are non-metals, selenium and tellurium metalloids, polonium a radioactive metal. Melting and boiling points increase with atomic number.\n" +
        "- **Group 17:** fluorine and chlorine are gases, bromine a liquid, iodine a solid. \\(\\text{F}_2\\) is yellow, \\(\\text{Cl}_2\\) greenish yellow, \\(\\text{Br}_2\\) red, \\(\\text{I}_2\\) violet. Bond dissociation enthalpies follow \\(\\text{Cl}-\\text{Cl} > \\text{Br}-\\text{Br} > \\text{F}-\\text{F} > \\text{I}-\\text{I}\\).\n" +
        "- **Group 18:** monoatomic gases with very low melting and boiling points; helium has the lowest boiling point of any known substance, 4.2 K.\n" +
        "- A 'why' answer here names the force between the particles (van der Waals) or the repulsion inside the molecule, and links it to the size of the atom or molecule.",
      table: {
        columns: ["Observation", "Reason"],
        rows: [
          { cells: ["Oxygen has far lower melting and boiling points than sulfur", "\\(\\text{O}_2\\) is a small diatomic molecule with weak van der Waals forces; \\(\\text{S}_8\\) is a large molecule with much stronger van der Waals forces"] },
          {
            cells: ["The bond in \\(\\text{F}_2\\) is weaker than the bond in \\(\\text{Cl}_2\\)", "Fluorine atoms are so small that the lone pairs on the two atoms are close and repel strongly; in \\(\\text{Cl}_2\\) they are further apart"],
            pyqExampleId: "50aedf14-2e52-4de0-b9c7-e208f6b6bd7c",
          },
          {
            cells: ["Noble gases have very low melting and boiling points", "They are monoatomic, so the only attraction between atoms is weak van der Waals forces"],
            pyqExampleId: "baaf8d2c-01ab-4577-ad93-85d26daf1295",
          },
          { cells: ["Bromine is a liquid and iodine a solid at room temperature", "Larger molecules have stronger van der Waals forces, so melting and boiling points rise down the group"] },
        ],
      },
      practiceSet: [
        { prompt: "Name the halogen that is a liquid at room temperature.", answer: "Bromine" },
        { prompt: "Give the colour of iodine, I₂.", answer: "Violet" },
        { prompt: "Which element of group 16 is a metal?", answer: "Polonium" },
        { prompt: "Arrange the bonds in F₂, Cl₂, Br₂ and I₂ in decreasing order of dissociation enthalpy.", answer: "Cl₂ > Br₂ > F₂ > I₂" },
      ],
      pyqExampleId: "c2802c97-770a-483e-91ce-5b46ac357703",
      traps: [
        {
          title: "Expecting F₂ to have the strongest bond",
          body: "The F-F bond is weaker than Cl-Cl and Br-Br, though fluorine is the smallest halogen. The close lone pairs repel and weaken it.",
        },
        {
          title: "Bonds inside versus forces between",
          body: "Melting and boiling depend on the van der Waals forces between molecules, not on the strength of the bonds inside them. Do not explain the boiling point of oxygen with its O=O bond.",
        },
      ],
    },
  ],
};
