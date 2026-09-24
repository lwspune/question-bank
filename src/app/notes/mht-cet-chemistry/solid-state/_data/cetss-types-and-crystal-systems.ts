import type { SubtopicNote } from "@/app/notes/_types";

export const TYPES_AND_CRYSTAL_SYSTEMS_NOTE: SubtopicNote = {
  subtopicName: "Types of Solids, Crystal Systems and Properties",
  title: "Types of Solids, Crystal Systems and Properties",
  oneLineDefinition:
    "A crystalline solid has long-range order, a sharp melting point and direction-dependent properties; an amorphous one has none of these. Crystalline solids sort into four bonding classes and their lattices into seven crystal systems with fourteen Bravais lattices.",
  whyItMatters:
    "17 PYQs, all EASY or MODERATE — pure recall. The exam asks which statement about crystalline solids is NOT true (isotropy is the planted error), which listed solid is amorphous or isotropic, the class of ice or silica, the number of Bravais lattices or crystal systems, and which unit cell every system has. " +
    "Learn the tables below and every one of these is a ten-second question.",
  concepts: [
    // 1 — crystalline vs amorphous
    {
      kind: "reference" as const,
      slug: "cetss-crystalline-vs-amorphous",
      name: "Crystalline Versus Amorphous Solids",
      intuition:
        "Order is the whole difference. Particles arranged in a repeating pattern give a sharp melting point and properties that depend on direction (anisotropy); a random arrangement melts over a range and looks the same from every direction (isotropy). The exam plants 'crystalline solids are isotropic' as the false statement.",
      definition:
        "- **Crystalline**: long-range order, sharp melting point, **anisotropic** (refractive index, conductivity differ with direction), definite heat of fusion, cleaves along planes. Diamond, NaCl, ice, graphite, ceramics, metals.\n" +
        "- **Amorphous** (pseudo-solid, supercooled liquid): short-range order only, softens over a range, **isotropic**, irregular fracture. Glass, plastic, rubber, metallic glass.\n" +
        "- **Polymorphism**: one substance in more than one crystalline form, made under different conditions and with DIFFERENT crystal shapes; in an element it is called **allotropy** (diamond and graphite).\n" +
        "- **Isomorphism**: different substances with the same crystal structure and the same atomic ratio — \\(\\text{NaNO}_3\\) and \\(\\text{CaCO}_3\\) (1:1:3), \\(\\text{NaF}\\) and \\(\\text{MgO}\\).",
      table: {
        columns: ["Property", "Crystalline", "Amorphous"],
        rows: [
          { cells: ["Arrangement", "Long-range order, regular and periodic", "Short-range order only"] },
          { cells: ["Melting", "Sharp, definite temperature", "Softens over a range of temperature"] },
          { cells: ["Directional properties", "Anisotropic — refractive index, conductivity vary with direction", "Isotropic — the same in every direction"], noteAmber: "'Crystalline solids are isotropic' is the planted false statement." },
          { cells: ["Heat of fusion", "Definite", "Not definite"] },
          { cells: ["Examples", "Diamond, NaCl, ice, graphite, ceramics, sodium", "Glass, plastic, rubber, metallic glass"], noteAmber: "Ice and ceramics are crystalline; only glass-like solids are amorphous." },
        ],
        caption: "Isotropy belongs to amorphous solids; anisotropy to crystalline ones.",
      },
      selfCheckExample: {
        prompt: "Which of these is isotropic: ceramics, graphite, ice, glass? And which pair is isomorphous: calcite and aragonite, or sodium nitrate and calcium carbonate?",
        steps: [
          "Glass is amorphous, so it is isotropic; the other three are crystalline.",
          "Calcite and aragonite are two forms of the SAME substance (polymorphism). \\(\\text{NaNO}_3\\) and \\(\\text{CaCO}_3\\) are different substances with the same structure and 1:1:3 ratio — isomorphous.",
        ],
        answer: "Glass; sodium nitrate and calcium carbonate.",
      },
      practiceSet: [
        { prompt: "Which is NOT an amorphous solid: glass, plastic, rubber, diamond?", answer: "Diamond" },
        { prompt: "A solid with the same refractive index in every direction is?", answer: "Amorphous (isotropic)" },
        { prompt: "Polymorphism in an element is called?", answer: "Allotropy" },
        { prompt: "Do polymorphic forms have identical crystal shapes?", answer: "No" },
      ],
      pyqExampleId: "6be24c20-6eef-4fb6-8a75-4b74bafb128c",
      traps: [
        {
          title: "Reading 'NOT true' as 'true'",
          body:
            "Three of the four statements are correct properties of crystalline solids; the one that is wrong is always the isotropy line. Mark the odd one, not the first true one.",
        },
      ],
    },

    // 2 — classification of crystalline solids
    {
      kind: "reference" as const,
      slug: "cetss-classes-of-crystalline-solids",
      name: "Ionic, Covalent Network, Molecular and Metallic Solids",
      intuition:
        "Ask what holds the particles together. Ions — ionic solid; a continuous web of covalent bonds — covalent network; whole molecules held by weak forces — molecular; cations in a sea of electrons — metallic. Ice is molecular (hydrogen-bonded water molecules), silica is covalent network.",
      definition:
        "- **Ionic**: cations and anions, electrostatic attraction. Hard, brittle, high m.p., conduct only when molten or dissolved. NaCl, CaF\\(_2\\).\n" +
        "- **Covalent network**: atoms joined by covalent bonds throughout. Very hard, very high m.p., insulators (graphite the exception). Diamond, silica \\(\\text{SiO}_2\\), SiC, graphite.\n" +
        "- **Molecular**: molecules held by dispersion forces (Ar, CH\\(_4\\)), dipole–dipole (HCl, SO\\(_2\\)) or hydrogen bonds (ice, solid NH\\(_3\\)). Soft, low m.p., insulators.\n" +
        "- **Metallic**: metal cations in a sea of mobile electrons — the attraction is the **metallic bond**. Malleable, ductile, conductors. Cu, Fe, Na.",
      table: {
        columns: ["Class", "Particles", "Binding force", "Examples"],
        rows: [
          { cells: ["Ionic", "Ions", "Electrostatic", "NaCl, KCl, CaF\\(_2\\)"] },
          { cells: ["Covalent network", "Atoms", "Covalent bonds in a network", "Diamond, silica (\\(\\text{SiO}_2\\)), SiC, graphite"], noteAmber: "Silica is covalent, not ionic — Si–O bonds run through the whole crystal." },
          { cells: ["Molecular", "Molecules", "Dispersion, dipole–dipole or hydrogen bonds", "Ice, dry ice, solid Ar, I\\(_2\\), naphthalene"], noteAmber: "Ice is a MOLECULAR solid: hydrogen bonds between H₂O molecules." },
          { cells: ["Metallic", "Cations + mobile electrons", "Metallic bond", "Cu, Fe, Na, Ag"] },
        ],
        caption: "Classify by the force between the particles, not by the element's name.",
      },
      selfCheckExample: {
        prompt: "Classify dry ice, silicon carbide and calcium fluoride.",
        steps: [
          "Dry ice is solid \\(\\text{CO}_2\\) — molecules held by dispersion forces: molecular.",
          "SiC is a continuous covalent network: covalent network solid.",
          "\\(\\text{CaF}_2\\) is \\(\\text{Ca}^{2+}\\) and \\(\\text{F}^-\\): ionic.",
        ],
        answer: "Molecular; covalent network; ionic.",
      },
      practiceSet: [
        { prompt: "What type of solid is ice?", answer: "Molecular" },
        { prompt: "What type of solid is silica?", answer: "Covalent (network)" },
        { prompt: "The attraction between cations and mobile electrons is called?", answer: "Metallic bond" },
        { prompt: "Which class conducts only when molten or in solution?", answer: "Ionic" },
      ],
      pyqExampleId: "7a23acd3-1917-4f06-b045-fb93f4d25c8e",
      traps: [
        {
          title: "Ice as an ionic or covalent solid",
          body:
            "Water has covalent O–H bonds inside each molecule, but the SOLID is held by hydrogen bonds between molecules — molecular. The bond inside the particle never decides the class.",
        },
      ],
    },

    // 3 — crystal systems and Bravais lattices
    {
      kind: "formula" as const,
      slug: "cetss-crystal-systems-and-bravais-lattices",
      name: "Seven Crystal Systems, Fourteen Bravais Lattices",
      intuition:
        "A lattice is the repeating grid of points; the unit cell is its smallest repeating box. Seven cell shapes (by edge lengths and angles) combined with where the extra points sit (none, body, face, base) give exactly fourteen lattices — the simple (primitive) cell is the only one every system has, and triclinic has nothing else.",
      definition:
        "- **Seven crystal systems**: cubic, tetragonal, orthorhombic, monoclinic, triclinic, hexagonal, rhombohedral (trigonal).\n" +
        "- **Fourteen Bravais lattices**: cubic 3 (simple, body-centred, face-centred) · tetragonal 2 (simple, body-centred) · orthorhombic 4 (simple, body-, face-, base-centred) · monoclinic 2 (simple, base-centred) · triclinic 1 · hexagonal 1 · rhombohedral 1.\n" +
        "- The **simple (primitive)** cell, points at corners only, is common to all seven systems; **triclinic** has only that one.\n" +
        "- Cubic cell: \\(a = b = c\\), \\(\\alpha = \\beta = \\gamma = 90^\\circ\\). Tetragonal: \\(a = b \\neq c\\), all \\(90^\\circ\\). Orthorhombic: \\(a \\neq b \\neq c\\), all \\(90^\\circ\\).\n" +
        "- Structure is found by **X-ray diffraction** (Bragg's law, an X-ray diffractometer); a **scanning electron microscope** images the SURFACE; a transmission electron microscope images the interior.",
      formula: {
        label: "Bravais count",
        latex:
          "3 + 2 + 4 + 2 + 1 + 1 + 1 = 14 \\text{ lattices in } 7 \\text{ systems}",
      },
      authoredExample: {
        prompt: "How many Bravais lattices does the orthorhombic system have, and which one type of unit cell occurs in every crystal system?",
        steps: [
          "Orthorhombic allows simple, body-centred, face-centred and base-centred: four.",
          "The simple (primitive) cell, with lattice points only at the corners, exists in all seven systems.",
        ],
        answer: "Four; the simple (primitive) unit cell.",
      },
      selfCheckExample: {
        prompt: "Which crystal system has exactly one Bravais lattice yet is not triclinic, and which instrument would you use to determine a crystal's structure?",
        steps: [
          "Hexagonal and rhombohedral each have one lattice besides triclinic — either is a correct answer.",
          "Crystal structure comes from X-ray diffraction (an X-ray diffractometer), not from an electron microscope, which images surfaces.",
        ],
        answer: "Hexagonal (or rhombohedral); X-ray diffractometer.",
      },
      practiceSet: [
        { prompt: "Total number of Bravais lattices?", answer: "14" },
        { prompt: "Number of crystal systems?", answer: "7" },
        { prompt: "Unit cell types in the triclinic system?", answer: "1 (simple)" },
        { prompt: "Instrument for the structure of a material's surface?", answer: "Scanning electron microscope" },
      ],
      pyqExampleId: "f3e22ffd-7c77-415e-9f71-10850861457e",
      traps: [
        {
          title: "Swapping 7 and 14",
          body:
            "Both numbers are offered as options in the same question. Systems are the SHAPES (7); Bravais lattices are shapes × centring (14).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Unit Cells — particles per cell and the edge–radius relations",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-unit-cells",
    },
    {
      label: "Defects and Properties — semiconductors and magnetism",
      href: "/notes/mht-cet-chemistry/solid-state/cetss-defects-and-properties",
    },
  ],
};
