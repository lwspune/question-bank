import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_CH_SS_EFFICIENCY_NOTE: SubtopicNote = {
  subtopicName: "Packing Efficiency",
  title: "Packing Efficiency of sc, bcc and fcc Lattices",
  oneLineDefinition:
    "The percentage of a unit cell's volume filled by its particles, derived step by step for simple cubic (52.36 %), body-centred cubic (68 %) and face-centred cubic or hcp (74 %) lattices, and found from an atomic radius.",
  whyItMatters:
    "4 questions, all from the textbook exercises and solved examples. They ask you to derive the packing efficiency of a simple cubic lattice, give the void volume of a bcc lattice, say which packing uses space best and worst, and work out the per cent filled from a radius.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hsccss-pe-derivation",
      name: "Deriving the packing efficiency",
      intuition:
        "Packing efficiency asks: of all the space in a unit cell, how much do the spheres actually fill? Write the radius in terms of the edge, find the volume of one sphere, multiply by the number of spheres in the cell, and divide by the volume of the cube. The edge cancels, so every crystal of the same lattice has the same answer.",
      definition:
        "- **Packing efficiency:** the percentage of the total space of the unit cell occupied by the particles.\n" +
        "- Step 1, radius: sc \\(r = \\dfrac{a}{2}\\); bcc \\(r = \\dfrac{\\sqrt{3}}{4}a\\); fcc \\(r = \\dfrac{\\sqrt{2}}{4}a\\).\n" +
        "- Step 2, volume of one sphere: \\(\\dfrac{4}{3}\\pi r^3\\), with r put in terms of a.\n" +
        "- Step 3, total volume of particles: multiply by the particles per cell (1 for sc, 2 for bcc, 4 for fcc).\n" +
        "- Step 4, packing efficiency: divide by \\(a^3\\) and multiply by 100.\n" +
        "- Results: sc 52.36 % (void 47.64 %), bcc 68 % (void 32 %), fcc, ccp and hcp 74 % (void 26 %). The close packed structures use space best and simple cubic worst.",
      formula: {
        label: "Packing efficiency",
        latex: "\\text{Packing efficiency} = \\frac{\\text{volume occupied by particles in unit cell}}{\\text{total volume of unit cell}} \\times 100",
      },
      authoredExample: {
        prompt: "Calculate the packing efficiency of a metal crystal that has a body-centred cubic lattice.",
        steps: [
          "Step 1, radius: the body-centre particle touches two corner particles along the body diagonal, so \\(\\sqrt{3}\\,a = 4r\\) and \\(r = \\dfrac{\\sqrt{3}}{4}a\\).",
          "Step 2, volume of one particle: \\(\\dfrac{4}{3}\\pi r^3 = \\dfrac{4}{3}\\pi \\left(\\dfrac{\\sqrt{3}}{4}a\\right)^3 = \\dfrac{\\sqrt{3}}{16}\\pi a^3\\).",
          "Step 3, a bcc cell holds 2 particles: volume occupied \\(= 2 \\times \\dfrac{\\sqrt{3}}{16}\\pi a^3 = \\dfrac{\\sqrt{3}}{8}\\pi a^3\\).",
          "Step 4: packing efficiency \\(= \\dfrac{\\sqrt{3}\\pi a^3 / 8}{a^3} \\times 100 = \\dfrac{\\sqrt{3}\\pi}{8} \\times 100 = 68\\ \\%\\).",
        ],
        answer: "68 % of the volume is occupied; 32 % is void",
      },
      selfCheckExample: {
        prompt: "For a face-centred cubic lattice, \\(r = \\dfrac{\\sqrt{2}}{4}a\\) and the cell holds 4 particles. Find the packing efficiency.",
        steps: [
          "Volume of 4 spheres \\(= 4 \\times \\dfrac{4}{3}\\pi \\left(\\dfrac{\\sqrt{2}}{4}a\\right)^3 = \\dfrac{\\sqrt{2}}{6}\\pi a^3\\).",
          "Packing efficiency \\(= \\dfrac{\\sqrt{2}\\pi}{6} \\times 100\\).",
        ],
        answer: "74 %",
      },
      practiceSet: [
        { prompt: "What percentage of the space in a simple cubic lattice is empty?", answer: "47.64 %" },
        { prompt: "What percentage of an hcp lattice is void space?", answer: "26 %" },
        { prompt: "Arrange sc, bcc and fcc in increasing order of packing efficiency.", answer: "sc < bcc < fcc" },
      ],
      pyqExampleId: "b3037b8f-0b57-4aae-beae-e26df0f03d62",
      traps: [
        {
          title: "Giving the occupied volume when the void is asked",
          body: "Void volume is 100 minus the packing efficiency: 32 % for bcc, not 68 %. Read 'void' or 'empty space' in the question.",
        },
        {
          title: "One particle for every cell",
          body: "Multiply the volume of one sphere by the particles per cell: 1 for sc, 2 for bcc, 4 for fcc. Using 1 for bcc gives 34 %, half the true value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hsccss-pe-numeric",
      name: "Per cent of a cell filled, from the atomic radius",
      intuition:
        "With a real radius you can do the same four steps with numbers. Get the edge from the radius, the volume of one atom from the radius, the volume of all the atoms in the cell, and compare with the volume of the cube. The answer must come out at the lattice's packing efficiency, which is a good check.",
      definition:
        "- fcc: \\(r = 0.3535a\\), so \\(a = \\dfrac{r}{0.3535}\\). bcc: \\(r = 0.433a\\). sc: \\(r = 0.5a\\).\n" +
        "- Volume of one atom \\(= \\dfrac{4}{3}\\pi r^3\\); volume of the atoms in the cell \\(= n \\times \\dfrac{4}{3}\\pi r^3\\); volume of the cell \\(= a^3\\).\n" +
        "- Per cent occupied \\(= \\dfrac{n \\times \\tfrac{4}{3}\\pi r^3}{a^3} \\times 100\\); per cent empty \\(= 100\\) minus that.",
      formula: {
        label: "Per cent occupied",
        latex: "\\%\\ \\text{occupied} = \\frac{n \\times \\tfrac{4}{3}\\pi r^{3}}{a^{3}} \\times 100",
      },
      authoredExample: {
        prompt:
          "Copper has an fcc unit cell and the radius of a Cu atom is 128 pm. Calculate (a) the edge length, (b) the volume of one Cu atom, (c) the per cent of the cell volume occupied and (d) the per cent of empty space.",
        steps: [
          "Given: fcc, \\(n = 4\\), \\(r = 128\\ \\text{pm} = 1.28 \\times 10^{-8}\\ \\text{cm}\\).",
          "(a) \\(a = \\dfrac{r}{0.3535} = \\dfrac{1.28 \\times 10^{-8}\\ \\text{cm}}{0.3535} = 3.621 \\times 10^{-8}\\ \\text{cm}\\) (362.1 pm).",
          "(b) Volume of one atom \\(= \\dfrac{4}{3} \\times 3.142 \\times (1.28 \\times 10^{-8}\\ \\text{cm})^3 = 8.786 \\times 10^{-24}\\ \\text{cm}^3\\).",
          "(c) Volume of 4 atoms \\(= 3.514 \\times 10^{-23}\\ \\text{cm}^3\\); \\(a^3 = (3.621 \\times 10^{-8}\\ \\text{cm})^3 = 4.747 \\times 10^{-23}\\ \\text{cm}^3\\). Per cent occupied \\(= \\dfrac{3.514}{4.747} \\times 100 = 74\\ \\%\\).",
          "(d) Per cent empty = 100 minus 74 = 26 %.",
        ],
        answer: "a = 362.1 pm; 8.786 × 10⁻²⁴ cm³; 74 % occupied; 26 % empty",
      },
      selfCheckExample: {
        prompt: "A bcc unit cell has a volume of 2.4 × 10⁻²³ cm³. What volume of it do the atoms fill?",
        steps: ["bcc packing efficiency is 68 %: \\(0.68 \\times 2.4 \\times 10^{-23}\\)."],
        answer: "1.632 × 10⁻²³ cm³",
      },
      practiceSet: [
        { prompt: "Find the volume of one atom of radius 100 pm, in cm³ (take π = 3.142).", answer: "\\(4.19 \\times 10^{-24}\\ \\text{cm}^3\\)" },
        { prompt: "An fcc unit cell has a volume of 6.0 × 10⁻²³ cm³. How much of it is empty space?", answer: "\\(1.56 \\times 10^{-23}\\ \\text{cm}^3\\) (26 %)" },
      ],
      pyqExampleId: "5d4d7d78-ed06-4b58-98eb-8a4660f44e77",
      traps: [
        {
          title: "Mixing picometres and centimetres",
          body: "Put r and a in the same unit before dividing volumes. Converting r to cm but leaving a in pm makes the per cent meaningless.",
        },
        {
          title: "An answer above 74 %",
          body: "The best packing in this chapter, fcc (ccp) or hcp, fills 74 % of space. If your per cent comes out higher, recheck n and the radius relation.",
        },
      ],
    },
  ],
};
