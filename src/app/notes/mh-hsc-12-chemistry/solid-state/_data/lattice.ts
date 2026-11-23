import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_LATTICE_NOTE: SubtopicNote = {
  subtopicName: "Crystal Structure and Unit Cells",
  title: "Lattice, Unit Cell, Crystal Systems, Isomorphism and Polymorphism",
  oneLineDefinition:
    "A crystal as a lattice plus a basis, the unit cell and its six parameters, the four types of unit cell, the seven crystal systems and fourteen Bravais lattices, and isomorphism against polymorphism.",
  whyItMatters:
    "3 questions, two of them from the 2026 board papers: one asked you to define polymorphism, the other to define isomorphism and a unit cell. These are one-line definitions worth a mark each, so learn the exact words.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccss-unit-cell",
      name: "Lattice, basis and the unit cell",
      intuition:
        "A lattice is just a pattern of points in space. Put the same particle on every point and you get the crystal. Inside that pattern there is one smallest block that, repeated again and again in three directions, builds the whole crystal: that block is the unit cell.",
      definition:
        "- **Lattice:** a geometrical arrangement of points in a three dimensional periodic array (also called the space lattice).\n" +
        "- **Basis:** the constituent particles attached to the lattice points.\n" +
        "- **Unit cell:** the smallest repeating structural unit of a crystalline solid. Repeated in three dimensions, it generates the entire crystal.\n" +
        "- A unit cell has six parameters: the edge lengths a, b and c along the three axes and the angles α, β and γ between those axes.\n" +
        "- **Four types of unit cell:** primitive (particles at the corners only), body-centred (one more at the centre of the body), face-centred (one more at the centre of each face) and base-centred (one more at the centres of two opposite faces).\n" +
        "- Only 14 kinds of space lattice are possible (the **Bravais lattices**). They fall into **seven crystal systems**: cubic, tetragonal, orthorhombic, rhombohedral, monoclinic, triclinic and hexagonal.",
      formula: {
        label: "Crystal structure",
        latex: "\\text{Lattice} + \\text{Basis} = \\text{Crystal}",
      },
      authoredExample: {
        prompt: "Name the four types of unit cell and state where the particles are in each.",
        steps: [
          "Primitive (simple) unit cell: particles at the corners only.",
          "Body-centred unit cell: particles at the corners and one at the centre of the body.",
          "Face-centred unit cell: particles at the corners and one at the centre of each of the six faces.",
          "Base-centred unit cell: particles at the corners and one at the centre of each of two opposite faces.",
        ],
        answer: "Primitive, body-centred, face-centred and base-centred",
      },
      selfCheckExample: {
        prompt: "How many crystal systems are there, and how many Bravais lattices?",
        steps: ["The fourteen Bravais lattices are divided among the seven crystal systems."],
        answer: "7 crystal systems, 14 Bravais lattices",
      },
      practiceSet: [
        { prompt: "What is attached to each lattice point to make a crystal?", answer: "The basis (the constituent particle)" },
        { prompt: "Which type of unit cell has particles at the centres of two opposite faces besides the corners?", answer: "Base-centred" },
        { prompt: "Name the three angle parameters of a unit cell.", answer: "α, β and γ, the angles between the three axes" },
      ],
      pyqExampleId: "ca6fff6a-11b7-40ba-a4f3-196ddda54862",
      traps: [
        {
          title: "Leaving out 'smallest'",
          body: "Any block that repeats is not enough: the unit cell is the SMALLEST repeating structural unit. The word carries the mark.",
        },
        {
          title: "Swapping 7 and 14",
          body: "There are seven crystal systems and fourteen Bravais lattices (unit cells). The bigger number is the lattices.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hsccss-iso-poly",
      name: "Isomorphism and polymorphism",
      intuition:
        "The two words are mirror images. Isomorphism is different substances sharing one crystal structure. Polymorphism is one substance taking several crystal structures. Keep 'iso' (same form, many substances) apart from 'poly' (many forms, one substance).",
      definition:
        "- **Isomorphism:** two or more substances having the same crystal structure are isomorphous. Their chemical compositions have the same atomic ratio.\n" +
        "- **Polymorphism:** a single substance that exists in two or more crystalline forms is polymorphous. The polymorphs form under different conditions.\n" +
        "- Polymorphism in an element is called **allotropy**: diamond, graphite and fullerene are allotropic forms of carbon.",
      table: {
        columns: ["Point", "Isomorphism", "Polymorphism"],
        rows: [
          {
            cells: ["Meaning", "Different substances have the same crystal structure", "One substance exists in two or more crystal structures"],
            pyqExampleId: "18bb971b-7517-4d2a-b7b7-17b98382c57c",
            noteAmber: "Board 2026 asked you to define polymorphism; a second 2026 question asked for isomorphism.",
          },
          { cells: ["Composition", "Different substances with the same atomic ratio", "The same substance, formed under different conditions"] },
          { cells: ["Examples", "NaF and MgO (ratio 1 : 1); NaNO₃ and CaCO₃ (ratio 1 : 1 : 3)", "Calcite and aragonite (CaCO₃); α-quartz, β-quartz and cristobalite (SiO₂)"] },
        ],
      },
      practiceSet: [
        { prompt: "What is polymorphism in an element called?", answer: "Allotropy" },
        { prompt: "NaNO₃ and CaCO₃ have the same crystal structure. What are such substances called?", answer: "Isomorphous substances" },
        { prompt: "Name two polymorphs of calcium carbonate.", answer: "Calcite and aragonite" },
      ],
      traps: [
        {
          title: "A definition with no example",
          body: "A board definition of isomorphism or polymorphism reads better with one example pair. One line of example is cheap insurance for the mark.",
        },
        {
          title: "Saying isomorphous substances have the same formula",
          body: "They have the same ATOMIC RATIO (NaF and MgO are both 1 : 1), not the same formula. The same formula in different forms is polymorphism.",
        },
      ],
    },
  ],
};
