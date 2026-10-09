import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_CHE_BND_STRUCTURES_NOTE: SubtopicNote = {
  subtopicName: "Giant and Molecular Structures",
  title: "Giant Structures, Simple Molecules and Types of Solid",
  oneLineDefinition:
    "A solid is either a giant lattice held by strong bonds throughout (ionic, covalent network, metallic) or simple molecules held by weak forces between them.",
  whyItMatters:
    "Both recent questions here are classification: what kind of solid sodium chloride is (2025), and which substances in a list are elements and which are made of molecules (2023).",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-bnd-solid-types",
      name: "The four types of crystalline solid and their properties",
      intuition:
        "What holds the particles together decides how the solid behaves. If strong bonds run through the whole crystal, you must break them to melt it, so the melting point is high. If the crystal is a stack of molecules, melting only separates molecules, which is easy. Conduction needs charged particles that can move.",
      definition:
        "Classify a solid by its particles and what holds them:\n" +
        "- **Giant ionic**: ions in a lattice, ionic bonds. High melting point, brittle, conducts only when molten or dissolved.\n" +
        "- **Giant covalent** (covalent network): atoms joined by covalent bonds throughout. Very high melting point, hard, insoluble, usually does not conduct.\n" +
        "- **Metallic**: positive ions in a sea of electrons. Conducts as a solid, malleable.\n" +
        "- **Simple molecular**: separate molecules held by intermolecular forces. Low melting point, soft, does not conduct.\n" +
        "- An **amorphous** solid (glass, many plastics) has no regular long-range order. That describes the arrangement, not the bonding: glass is a disordered covalent network.",
      table: {
        columns: ["Type", "Particles and what holds them", "Typical properties", "Examples"],
        rows: [
          { cells: ["Giant ionic", "Ions; ionic bonds in all directions", "High melting point; brittle; conducts molten or in solution", "NaCl, MgO, \\(\\mathrm{CaF_2}\\)"] },
          { cells: ["Giant covalent", "Atoms; covalent bonds throughout", "Very high melting point; hard; insoluble; insulator (graphite apart)", "Diamond, graphite, \\(\\mathrm{SiO_2}\\), silicon"] },
          { cells: ["Metallic", "Cations in delocalised electrons", "Conducts as a solid; malleable; shiny", "Cu, Fe, Na"] },
          { cells: ["Simple molecular", "Molecules; intermolecular forces", "Low melting point; soft; insulator", "Ice, \\(\\mathrm{I_2}\\), dry ice (\\(\\mathrm{CO_2}\\)), sugar"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "A white solid melts at about 1700 °C. It is very hard, insoluble in water, and does not conduct electricity either as a solid or when molten. What type of solid is it?",
        options: [
          "Giant ionic",
          "Simple molecular",
          "Metallic",
          "Giant covalent",
          "Simple molecular with hydrogen bonds",
        ],
        steps: [
          "A very high melting point rules out simple molecular solids (B and E).",
          "No conduction even when molten rules out ionic (A), whose ions become free to move on melting, and metallic (C).",
          "Hard, insoluble and non-conducting with a high melting point: a covalent network, such as silicon dioxide.",
        ],
        answer: "(D) Giant covalent",
      },
      practiceSet: [
        { prompt: "A solid melts at 80 °C and does not conduct. What type is it most likely?", answer: "Simple molecular", method: "Low melting point" },
        { prompt: "Why does solid NaCl not conduct, while molten NaCl does?", answer: "The ions are fixed in the solid and free to move in the liquid", method: "Conduction needs moving charges" },
        { prompt: "What type of solid is ice?", answer: "Simple molecular (with hydrogen bonds between the molecules)", method: "Separate \\(\\mathrm{H_2O}\\) molecules" },
      ],
      traps: [
        {
          title: "Simple molecular does not mean weak covalent bonds",
          body: "Iodine melts easily, but the I to I bond inside each molecule is a strong covalent bond. What is weak is the attraction between molecules. Melting or boiling a molecular solid leaves its molecules intact.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-giant",
      name: "Diamond, graphite, silicon dioxide and the sodium chloride lattice",
      intuition:
        "Diamond and graphite are both pure carbon, yet one is the hardest natural material and the other is soft enough to write with. The difference is only how each carbon atom uses its four outer electrons: four bonds in three dimensions, or three bonds in flat sheets with one electron left free.",
      definition:
        "Know these four giant structures by heart:\n" +
        "- **Diamond**: each C bonded to **four** others in a tetrahedron (109.5°), a 3D network. Hardest natural substance, very high melting point, no free electrons, so no conduction.\n" +
        "- **Graphite**: each C bonded to **three** others in flat hexagonal layers; the fourth electron is **delocalised** along the layer. Conducts along the layers; layers held by weak forces slide, so it is soft and a lubricant.\n" +
        "- **Silicon dioxide** (quartz, sand): each Si bonded to four O, each O to two Si. Formula \\(\\mathrm{SiO_2}\\) is a ratio, not a molecule.\n" +
        "- **Sodium chloride**: a cubic lattice in which each \\(\\mathrm{Na^+}\\) is surrounded by **six** \\(\\mathrm{Cl^-}\\) and each \\(\\mathrm{Cl^-}\\) by six \\(\\mathrm{Na^+}\\).\n" +
        "- Diamond and graphite are **allotropes**: different structural forms of the same element (fullerenes such as \\(\\mathrm{C_{60}}\\) are a third, molecular form).",
      table: {
        columns: ["Structure", "Arrangement", "Bonding", "Key properties"],
        rows: [
          { cells: ["Diamond", "Each C joined to 4 C, tetrahedral", "Covalent, 3D network", "Very hard; very high melting point; does not conduct"] },
          { cells: ["Graphite", "Each C joined to 3 C in hexagonal layers", "Covalent in layers; weak forces between layers", "Soft, slippery; conducts along layers; high melting point"] },
          { cells: ["Silicon dioxide", "Each Si joined to 4 O, each O to 2 Si", "Covalent, 3D network", "Hard; high melting point; does not conduct"] },
          { cells: ["Sodium chloride", "Each ion surrounded by 6 of the opposite charge", "Ionic", "High melting point; brittle; conducts molten or dissolved"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about graphite is correct?",
        options: [
          "It conducts electricity along its layers because each carbon atom has one delocalised electron",
          "Each carbon atom forms four covalent bonds to other carbon atoms",
          "Its layers are held together by covalent bonds",
          "It has a low melting point because it is soft",
          "It is made of separate \\(\\mathrm{C_{60}}\\) molecules",
        ],
        steps: [
          "Each C forms three bonds within its layer, and its fourth outer electron is delocalised: that gives conduction along the layers.",
          "B describes diamond. C is wrong: the forces between layers are weak, which is why it is soft. D confuses softness with melting point: melting graphite breaks strong covalent bonds, so it melts very high. E describes a fullerene.",
        ],
        answer: "(A) It conducts along its layers because of delocalised electrons",
      },
      practiceSet: [
        { prompt: "How many Cl⁻ ions surround each Na⁺ ion in sodium chloride?", answer: "6", method: "6 : 6 arrangement" },
        { prompt: "What is the bond angle around each carbon in diamond?", answer: "109.5°", method: "Tetrahedral, four bonds" },
        { prompt: "What is the name for different structural forms of the same element?", answer: "Allotropes", method: "Diamond, graphite, fullerenes" },
      ],
      traps: [
        {
          title: "Graphite is soft but melts very high",
          body: "Softness comes from the weak forces between layers. Melting must break the strong covalent bonds within the layers, so graphite's melting point is even higher than most metals'. Do not link softness with a low melting point here.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-bnd-particles",
      name: "Elements, compounds, atoms and molecules: classifying substances",
      intuition:
        "Two separate questions hide in one: how many kinds of atom does the substance contain (element or compound), and what are its smallest units (single atoms, molecules, ions, or a giant network)? Answer each on its own and the classification is easy.",
      definition:
        "- An **element** contains one kind of atom; a **compound** contains two or more elements chemically bonded.\n" +
        "- A **molecule** is a group of atoms covalently bonded into a separate unit. Elements can be molecular (\\(\\mathrm{O_2}\\), \\(\\mathrm{N_2}\\), \\(\\mathrm{Cl_2}\\), \\(\\mathrm{P_4}\\), \\(\\mathrm{S_8}\\)); so can compounds (\\(\\mathrm{H_2O}\\), \\(\\mathrm{CO_2}\\)).\n" +
        "- **Noble gases** exist as single, separate atoms, not molecules.\n" +
        "- **Ionic compounds** and **giant covalent** substances contain no molecules: NaCl, \\(\\mathrm{SiO_2}\\), diamond.\n" +
        "- The seven diatomic elements: \\(\\mathrm{H_2}\\), \\(\\mathrm{N_2}\\), \\(\\mathrm{O_2}\\), \\(\\mathrm{F_2}\\), \\(\\mathrm{Cl_2}\\), \\(\\mathrm{Br_2}\\), \\(\\mathrm{I_2}\\).",
      table: {
        columns: ["Substance", "Element or compound", "Smallest units"],
        rows: [
          { cells: ["Helium, He", "Element", "Single atoms"] },
          { cells: ["Oxygen, \\(\\mathrm{O_2}\\); ozone, \\(\\mathrm{O_3}\\)", "Element", "Molecules"] },
          { cells: ["Sulfur, \\(\\mathrm{S_8}\\)", "Element", "Molecules"] },
          { cells: ["Diamond, C", "Element", "Giant covalent network (no molecules)"] },
          { cells: ["Iron, Fe", "Element", "Metallic lattice (no molecules)"] },
          { cells: ["Ammonia, \\(\\mathrm{NH_3}\\)", "Compound", "Molecules"] },
          { cells: ["Potassium bromide, KBr", "Compound", "Ions (no molecules)"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Consider these five substances: He, \\(\\mathrm{Cl_2}\\), \\(\\mathrm{CH_4}\\), KBr, \\(\\mathrm{S_8}\\). How many of them are elements, and how many of them consist of molecules?",
        options: [
          "Elements 2; molecular 3",
          "Elements 3; molecular 4",
          "Elements 3; molecular 3",
          "Elements 3; molecular 2",
          "Elements 2; molecular 4",
        ],
        steps: [
          "Elements: He, \\(\\mathrm{Cl_2}\\), \\(\\mathrm{S_8}\\), so 3.",
          "Molecular: \\(\\mathrm{Cl_2}\\), \\(\\mathrm{CH_4}\\), \\(\\mathrm{S_8}\\), so 3. Helium is single atoms and KBr is ionic.",
          "B counts helium as a molecule; E also counts KBr as a molecule and forgets helium is an element.",
        ],
        answer: "(C) Elements 3; molecular 3",
      },
      practiceSet: [
        { prompt: "Is \\(\\mathrm{Br_2}\\) an element or a compound, and is it molecular?", answer: "An element made of molecules", method: "One kind of atom, two atoms bonded" },
        { prompt: "Does solid magnesium oxide contain MgO molecules?", answer: "No, it is a lattice of \\(\\mathrm{Mg^{2+}}\\) and \\(\\mathrm{O^{2-}}\\) ions", method: "Ionic compound" },
        { prompt: "Name a compound that is made of molecules.", answer: "For example water, carbon dioxide or methane", method: "Two or more elements, covalently bonded into separate units" },
      ],
      traps: [
        {
          title: "\"Molecule\" and \"compound\" are different ideas",
          body: "\\(\\mathrm{N_2}\\) is a molecule but not a compound; NaCl is a compound but not made of molecules. Check one kind of atom versus several, and separate units versus a lattice, as two separate questions.",
        },
      ],
    },
  ],
};
