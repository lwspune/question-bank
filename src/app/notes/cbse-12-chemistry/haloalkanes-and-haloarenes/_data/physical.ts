import type { SubtopicNote } from "@/app/notes/_types";

export const CB_CH_HA_PHYSICAL_NOTE: SubtopicNote = {
  subtopicName: "Physical Properties",
  title: "Physical Properties of Haloalkanes and Haloarenes",
  oneLineDefinition:
    "Boiling points (compared with hydrocarbons, across the halogens and across isomers), the high melting point of para isomers, solubility in water and in organic solvents, and density.",
  whyItMatters:
    "10 questions, seven of them from board papers. The board asked why p-dichlorobenzene melts higher than its isomers (2023, 2026) and why o-dichlorobenzene boils higher than the para isomer (2023), the order of boiling points of three bromobutanes (2025), three assertion-reason items on boiling points (2025), and why alkyl halides, though polar, hardly dissolve in water (2026). Orders of boiling points also come as parts of questions on the reactions page (2024, 2026).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbcha-boiling",
      name: "Boiling points of haloalkanes",
      intuition:
        "A liquid boils when its molecules pull free of one another. Haloalkanes hold together more strongly than hydrocarbons of similar mass because they are polar and heavier. Among halides of the same alkyl group, the bigger the halogen atom, the stronger the van der Waals pull and the higher the boiling point. Branching makes a molecule more compact, so it boils lower.",
      definition:
        "- Haloalkanes are polar and heavier than the parent hydrocarbon, so their **dipole-dipole and van der Waals forces** are stronger: chlorides, bromides and iodides boil considerably higher than hydrocarbons of comparable molecular mass.\n" +
        "- For the same alkyl group: **RI > RBr > RCl > RF**, because van der Waals forces increase with the size and mass of the halogen atom.\n" +
        "- For the same halogen, boiling point rises with the number of carbon atoms (molecular mass).\n" +
        "- **Isomers:** boiling point decreases with branching. 2-Bromo-2-methylpropane has the lowest boiling point of the three isomers named in the book.\n" +
        "- Methyl chloride, methyl bromide, ethyl chloride and some chlorofluoromethanes are gases at room temperature; higher members are liquids or solids.",
      table: {
        columns: ["Comparison", "Order of boiling point", "Reason"],
        rows: [
          {
            cells: ["Haloalkane and hydrocarbon of similar mass", "Chloride, bromide, iodide boil much higher", "More polar and heavier: stronger dipole-dipole and van der Waals forces"],
            pyqExampleId: "792c6a8b-77e3-42f3-8583-7c11c2994803",
            noteAmber: "Board 2025 paired this fact with the RI > RBr > RCl > RF order: both true, but it does not explain that order.",
          },
          {
            cells: ["Same alkyl group, different halogen", "RI > RBr > RCl > RF", "Van der Waals forces grow with the size and mass of the halogen"],
            pyqExampleId: "51579eb1-23b6-46d4-a030-d4149e45f3e4",
            noteAmber: "Board 2025 asked this order as assertion-reason; the van der Waals order is its correct reason.",
          },
          { cells: ["Same halogen, longer chain", "1-Chlorobutane > 1-chloropropane", "Higher molecular mass, stronger van der Waals forces"] },
          {
            cells: ["Isomers", "More branching, lower boiling point", "A branched molecule is more compact and has less surface in contact"],
            pyqExampleId: "ee4a253f-5ead-400c-80d7-6bdb55bae586",
            noteAmber: "Board 2025 asked the order for three bromobutanes with the same formula.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Arrange 1-bromobutane, 2-bromopropane and 1-bromopropane in increasing order of boiling point.",
        steps: [
          "1-Bromobutane has one carbon more than the other two, so it boils highest.",
          "2-Bromopropane and 1-bromopropane are isomers; the branched one, 2-bromopropane, boils lower.",
        ],
        answer: "2-Bromopropane < 1-bromopropane < 1-bromobutane",
      },
      practiceSet: [
        { prompt: "Which boils higher, ethane or chloroethane? Give the reason.", answer: "Chloroethane: it is polar and heavier, so its intermolecular forces are stronger" },
        { prompt: "Which isomer of C₄H₉Cl has the lowest boiling point?", answer: "2-Chloro-2-methylpropane, the most branched one" },
        { prompt: "Name two haloalkanes that are gases at room temperature.", answer: "Any two of methyl chloride, methyl bromide and ethyl chloride" },
      ],
      pyqExampleId: "5392ecac-0e2b-4037-a4a3-dfa5bb7e6de3",
      traps: [
        {
          title: "Deciding the order by bond polarity",
          body: "The C-Cl bond is more polar than C-Br, yet bromides boil higher. Among halides of the same alkyl group, size and mass (van der Waals forces) decide, not polarity.",
        },
        {
          title: "The fourth assertion-reason code",
          body: "In CBSE Chemistry papers, code (D) means the Assertion is false but the Reason is true. A false claim about boiling points with a true statement about bond polarity is (D).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbcha-melting-solubility",
      name: "Melting points, solubility and density",
      intuition:
        "Melting breaks up a crystal, so how well the molecules pack matters most: the symmetrical para isomer packs best and melts highest. Dissolving in water means breaking water's strong hydrogen bonds, and a haloalkane cannot form hydrogen bonds with water to pay that cost back, so it hardly dissolves.",
      definition:
        "- **Dihalobenzenes:** their boiling points are very nearly the same, but the **para isomer melts higher** than the ortho and meta isomers, because its symmetry lets it fit better in the crystal lattice.\n" +
        "- **Solubility in water is very low:** energy is needed to overcome the attractions between haloalkane molecules and to break the hydrogen bonds between water molecules; less energy is released by the new haloalkane-water attractions, which are not as strong as the hydrogen bonds in water.\n" +
        "- **Organic solvents:** haloalkanes dissolve, because the new attractions are of much the same strength as those broken.\n" +
        "- **Density:** bromo, iodo and polychloro derivatives are heavier than water. Density increases with the number of carbon atoms, the number of halogen atoms and the atomic mass of the halogen.\n" +
        "- Pure alkyl halides are colourless; bromides and iodides develop colour when exposed to light. Many volatile ones have a sweet smell.",
      table: {
        columns: ["Property", "Fact", "Reason"],
        rows: [
          {
            cells: ["Melting point of dichlorobenzenes", "Para > ortho and meta", "The symmetrical para isomer fits the crystal lattice better"],
            pyqExampleId: "f45c21a4-5da6-400e-b793-2758cf4fe2cb",
            noteAmber: "Board 2023 asked which isomer has the highest melting point; 2026 asked why, twice in the same year.",
          },
          { cells: ["Boiling point of dichlorobenzenes", "Very nearly the same; ortho a little higher than para", "Same mass; in the liquid there is no lattice, and the polar ortho isomer attracts its neighbours a little more than the non-polar para isomer"] },
          {
            cells: ["Solubility in water", "Very slight", "New haloalkane-water attractions are weaker than the hydrogen bonds of water that must break"],
            pyqExampleId: "e6c96b81-d8f7-4216-8e05-b8dd8004427f",
            noteAmber: "Board 2026 asked why alkyl halides, though polar, are only slightly soluble in water.",
          },
          { cells: ["Solubility in organic solvents", "Soluble", "Attractions made and broken are of similar strength"] },
          { cells: ["Density (g/mL)", "n-C₃H₇Cl 0.89; n-C₃H₇Br 1.335; n-C₃H₇I 1.747", "Rises with the atomic mass of the halogen"] },
        ],
      },
      selfCheckExample: {
        prompt: "Arrange CCl₄, CH₂Cl₂ and CHCl₃ in increasing order of density.",
        steps: [
          "Density rises with the number of halogen atoms.",
          "CH₂Cl₂ is 1.336, CHCl₃ is 1.489 and CCl₄ is 1.595 g/mL.",
        ],
        answer: "CH₂Cl₂ < CHCl₃ < CCl₄",
      },
      practiceSet: [
        { prompt: "Why do haloalkanes dissolve in organic solvents?", answer: "The new attractions with solvent molecules are of much the same strength as the ones broken" },
        { prompt: "Is 1-chloropropane (density 0.89 g/mL) lighter or heavier than water?", answer: "Lighter: its density is less than 1 g/mL" },
        { prompt: "What happens to alkyl bromides and iodides when they are exposed to light?", answer: "They develop colour" },
      ],
      pyqExampleId: "809186bd-d3cb-4015-af9d-151a786648a5",
      traps: [
        {
          title: "Explaining the para melting point by polarity",
          body: "The para isomer melts highest because of symmetry and packing in the crystal, not because of its dipole moment. Write the words \"symmetry\" and \"crystal lattice\".",
        },
        {
          title: "Half an answer on solubility",
          body: "\"They cannot form hydrogen bonds\" is not enough. Say that breaking the hydrogen bonds of water costs more energy than the weaker haloalkane-water attractions give back.",
        },
      ],
    },
  ],
};
