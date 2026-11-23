import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_CLASSES_NOTE: SubtopicNote = {
  subtopicName: "Classification of Crystalline Solids",
  title: "Crystalline and Amorphous Solids, and the Four Classes of Crystals",
  oneLineDefinition:
    "How crystalline solids differ from amorphous ones, and how ionic, covalent network, molecular and metallic crystals differ in their particles, forces and properties.",
  whyItMatters:
    "7 questions, three of them from board papers. The board asked you to distinguish crystalline and amorphous solids (2025), to differentiate ionic and covalent crystals (2024) and to name the kind of solid iodine forms (2016). The textbook adds the particles of each class and how to tell a class from its properties.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hsccss-crystalline-amorphous",
      name: "Crystalline solids and amorphous solids",
      intuition:
        "In a crystal the particles sit in a regular pattern that repeats over a long distance, like bricks in a well built wall. In an amorphous solid they are jumbled, like a heap of bricks, with order only between close neighbours. Almost every difference the board asks for follows from this one fact.",
      definition:
        "- A **crystalline solid** has a regular, periodic arrangement of particles that extends over a long range.\n" +
        "- An **amorphous solid** has particles arranged at random: short range order only. The textbook calls amorphous solids supercooled liquids.\n" +
        "- The board asks 'distinguish between' for two or three marks: give each point for both kinds of solid, side by side.",
      table: {
        columns: ["Point", "Crystalline solids", "Amorphous solids"],
        rows: [
          {
            cells: ["Arrangement of particles", "Regular and periodic; long range order", "Random; only short range order"],
            pyqExampleId: "65174867-a82c-44d5-9d95-56de83d37596",
            noteAmber: "Board 2025 asked you to distinguish crystalline and amorphous solids.",
          },
          { cells: ["Melting", "Sharp melting point: melt at one definite temperature", "No sharp melting point: soften gradually over a range of temperature and start to flow"] },
          { cells: ["Properties in different directions", "Anisotropic (except crystals of cubic structure): refractive index and conductivity differ with direction", "Isotropic: every property has the same value in every direction"] },
          { cells: ["What they really are", "Ordered solids built of repeating unit cells", "Supercooled liquids"] },
          { cells: ["Examples", "Ice, NaCl, sodium, gold, copper, diamond, graphite", "Glass, plastic, rubber, tar, metallic glass"] },
        ],
      },
      practiceSet: [
        { prompt: "Is rubber a crystalline or an amorphous solid?", answer: "Amorphous" },
        { prompt: "Which kind of solid has the same refractive index in every direction?", answer: "An amorphous solid (it is isotropic)" },
        { prompt: "Which melts at one definite temperature, sodium chloride or glass?", answer: "Sodium chloride, a crystalline solid" },
      ],
      traps: [
        {
          title: "Calling every crystal anisotropic",
          body: "The textbook says all crystalline substances are anisotropic except those with a cubic structure. Write 'anisotropic (except cubic crystals)' to be exact.",
        },
        {
          title: "A one-sided distinguish",
          body: "A point that describes only crystalline solids earns nothing. Each point needs both halves: 'sharp melting point' against 'melts over a range of temperature'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-four-classes",
      name: "Ionic, covalent network, molecular and metallic crystals",
      intuition:
        "Crystalline solids are sorted by what sits at the lattice points and what holds it there. Ions held by charge give ionic crystals; atoms joined by covalent bonds right through the crystal give a covalent network; molecules held by weak forces give molecular crystals; metal ions in a sea of moving electrons give metallic crystals. The force decides the hardness, the melting point and whether the solid conducts.",
      definition:
        "- **Ionic crystals:** cations and anions held by electrostatic (coulomb) attraction. Hard, brittle, high melting. Non-conductors as solids, good conductors when melted or dissolved in water.\n" +
        "- **Covalent network crystals:** atoms linked by a continuous system of covalent bonds, so the whole crystal is one giant molecule. The hardest materials; very high melting; electrons are fixed in bonds, so poor conductors.\n" +
        "- **Molecular crystals:** molecules (or unbonded single atoms) held by weak intermolecular forces. Soft, low melting, good insulators.\n" +
        "- **Metallic crystals:** metal ions in a sea of mobile valence electrons (the metallic bond). Malleable, ductile, good conductors of heat and electricity.\n" +
        "- Ionic and covalent crystals are both hard with high melting points. Tell them apart by conduction: an ionic solid conducts once it melts; a covalent solid shows no sudden rise in conductivity on melting.",
      table: {
        columns: ["Property", "Ionic", "Covalent network", "Molecular", "Metallic"],
        rows: [
          {
            cells: ["Particles", "Cations and anions", "Covalently bonded atoms", "Monoatomic or polyatomic molecules", "Metal ions in a sea of electrons"],
            pyqExampleId: "d65cda96-0d75-45f5-8715-36bae2e896f9",
            noteAmber: "Board 2024 asked you to differentiate ionic crystals and covalent crystals.",
          },
          { cells: ["Force between them", "Electrostatic attraction", "Covalent bonds", "London, dipole-dipole forces or hydrogen bonds", "Metallic bonds"] },
          { cells: ["Hardness", "Hard and brittle", "Very hard", "Soft", "Soft to very hard"] },
          { cells: ["Melting point", "High (600 °C to 3000 °C)", "High (1200 °C to 4000 °C)", "Low (-272 °C to 400 °C)", "Wide range (-39 °C to 3400 °C)"] },
          { cells: ["Electrical conduction", "Poor as a solid; good when melted or dissolved in water", "Poor (graphite is an exception)", "Poor; good insulators", "Good conductors of heat and electricity"] },
          { cells: ["Examples", "NaCl, K₂SO₄, CaF₂, KCl", "Diamond, quartz (SiO₂), boron nitride, carborundum", "Ice, CO₂, CH₄, benzoic acid", "Na, Mg, Cu, Au"] },
        ],
      },
      practiceSet: [
        { prompt: "A solid is very hard, melts above 1500 °C and does not conduct electricity even when melted. Which class of crystal is it?", answer: "A covalent network crystal" },
        { prompt: "What are the particles of a metallic crystal?", answer: "Metal ions in a sea of mobile valence electrons" },
        { prompt: "Why is a metal a good conductor of electricity?", answer: "Its valence electrons are delocalised over the whole crystal and are free to move" },
      ],
      traps: [
        {
          title: "Using hardness to tell ionic from covalent",
          body: "Both are hard with high melting points. The difference the board wants is in the particles and the forces, and in conduction: ions conduct once the solid melts.",
        },
        {
          title: "Forgetting graphite",
          body: "Graphite is a covalent solid, yet it is soft and conducts electricity. Name it as the exception when you say covalent solids are hard non-conductors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-molecular-solids",
      name: "The three kinds of molecular solid",
      intuition:
        "Inside each molecule the bonds are covalent and strong, but between molecules the pull is weak. Molecular solids are sorted by which weak force holds the molecules together: a permanent dipole, the very weak London force, or a hydrogen bond. Weak forces are why these solids are soft and melt easily.",
      definition:
        "- Molecular solids are **crystalline** solids: substances such as Cl₂, CH₄, H₂, CO₂ and O₂ give molecular crystals on freezing, and so do crystalline organic compounds.\n" +
        "- A molecule with no permanent dipole (H₂, CH₄, I₂) is held only by London (dispersion) forces: a **non-polar** molecular solid.\n" +
        "- Molecular solids are soft, have low melting points and are good insulators.",
      table: {
        columns: ["Kind of molecular solid", "Force between the molecules", "Examples"],
        rows: [
          { cells: ["Polar molecular solid", "Weak dipole-dipole attraction between molecules with a permanent dipole", "Solid HCl, SO₂"] },
          {
            cells: ["Non-polar molecular solid", "Very weak London (dispersion) forces", "Solid CH₄, H₂, argon, neon"],
            pyqExampleId: "fb6e1f88-5e83-4f78-ac1d-6d96fbe1dc45",
            noteAmber: "Board 2016 asked what kind of solid iodine forms: a non-polar molecular solid.",
          },
          { cells: ["Hydrogen bonded molecular solid", "Intermolecular hydrogen bonds", "Ice (H₂O), NH₃, HF"] },
        ],
      },
      practiceSet: [
        { prompt: "Which force holds the atoms together in solid argon?", answer: "London (dispersion) forces" },
        { prompt: "Ice is which kind of molecular solid?", answer: "A hydrogen bonded molecular solid" },
        { prompt: "Why are molecular solids soft with low melting points?", answer: "The forces between their molecules are weak" },
      ],
      traps: [
        {
          title: "Calling a molecular solid amorphous",
          body: "Molecular solids are one of the four classes of CRYSTALLINE solid. 'Molecular' names the particles, not a lack of order.",
        },
        {
          title: "Calling ice an ionic or covalent solid",
          body: "Ice is built of H₂O molecules held by hydrogen bonds, so it is a molecular solid. The O-H bonds inside each molecule do not make the solid a covalent network.",
        },
      ],
    },
  ],
};
