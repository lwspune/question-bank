import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Dipole Moment and Potential Energy",
  title: "Magnetic Dipole Moment and Potential Energy",
  oneLineDefinition:
    "The magnetic dipole moment μ = NIA of a current-carrying coil, its unit and direction, the potential energy U = −μB cos θ of a dipole in a field, and finding the moment of a loop from the field at its centre.",
  whyItMatters:
    "4 questions. Two were set in board papers: the magnetic dipole moment of a circular coil of 300 turns (2020), and the moment of a loop found from the field at its centre (2024). The textbook adds the moment of a 500-turn coil and a second loop worked from the field at its centre.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-dipole-moment",
      name: "Magnetic dipole moment of a coil and its energy in a field",
      intuition:
        "A current loop behaves like a tiny bar magnet, with a north face and a south face. Its strength as a magnet is its magnetic dipole moment: more turns, more current or a bigger area make a stronger one. Like a compass needle, it has the least energy when it points along the field and the most when it points against it.",
      definition:
        "- **Magnetic dipole moment:** \\(\\mu = NIA\\), where \\(N\\) is the number of turns, \\(I\\) the current and \\(A\\) the area enclosed by each turn.\n" +
        "- It is a vector along the normal to the plane of the coil, in the direction given by the right hand rule (curl the fingers along the current; the thumb gives \\(\\vec{\\mu}\\)).\n" +
        "- SI unit: A m², which is the same as J/T.\n" +
        "- **Potential energy** of a dipole in a uniform field: \\(U = -\\vec{\\mu} \\cdot \\vec{B} = -\\mu B\\cos\\theta\\), \\(\\theta\\) being the angle between \\(\\vec{\\mu}\\) and \\(\\vec{B}\\).\n" +
        "- \\(\\theta = 0^\\circ\\) (\\(\\vec{\\mu}\\) parallel to \\(\\vec{B}\\)): \\(U = -\\mu B\\), the **minimum**. \\(\\theta = 180^\\circ\\) (antiparallel): \\(U = +\\mu B\\), the **maximum**.\n" +
        "- These match the electric dipole: \\(U = -\\vec{p} \\cdot \\vec{E}\\).",
      formula: {
        label: "Magnetic dipole moment and potential energy",
        latex: "\\mu = NIA, \\qquad U = -\\vec{\\mu} \\cdot \\vec{B} = -\\mu B\\cos\\theta",
        symbols: [
          { symbol: "\\(\\mu\\)", meaning: "magnetic dipole moment, in A m² or J/T" },
          { symbol: "\\(A\\)", meaning: "area enclosed by one turn, in m²" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the moment and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A square coil of side 5 cm has 40 turns and carries a current of 0.5 A. Find its magnetic dipole moment. It is placed in a uniform field of 0.2 T. Find its potential energy when its moment is parallel to the field, and when it is antiparallel.",
        steps: [
          "Given: \\(N = 40\\), \\(A = (0.05)^2 = 2.5 \\times 10^{-3}\\) m², \\(I = 0.5\\) A, \\(B = 0.2\\) T.",
          "Moment: \\(\\mu = NIA = 40 \\times 0.5 \\times 2.5 \\times 10^{-3} = 0.05\\) A m².",
          "Parallel (\\(\\theta = 0^\\circ\\)): \\(U = -\\mu B = -0.05 \\times 0.2 = -0.01\\) J.",
          "Antiparallel (\\(\\theta = 180^\\circ\\)): \\(U = +\\mu B = +0.01\\) J.",
        ],
        answer: "0.05 A m²; −0.01 J parallel, +0.01 J antiparallel",
      },
      selfCheckExample: {
        prompt:
          "A coil of magnetic moment 0.4 A m² lies in a uniform field of 0.5 T with its moment along the field. How much work is needed to turn it until its moment points against the field?",
        steps: [
          "\\(W = U_{180^\\circ} - U_{0^\\circ} = \\mu B - (-\\mu B) = 2\\mu B\\).",
          "\\(W = 2 \\times 0.4 \\times 0.5 = 0.4\\) J.",
        ],
        answer: "0.4 J",
      },
      practiceSet: [
        { prompt: "Give the SI unit of magnetic dipole moment in two forms.", answer: "A m² and J/T" },
        { prompt: "In which position does a magnetic dipole in a uniform field have its least potential energy?", answer: "With its moment parallel to the field (\\(U = -\\mu B\\))" },
        { prompt: "What is the potential energy of a magnetic dipole whose moment is perpendicular to the field?", answer: "Zero, since \\(\\cos 90^\\circ = 0\\)" },
      ],
      pyqExampleId: "c25a9543-f9af-4cf9-b0e6-2f8d3446bb5c",
      traps: [
        {
          title: "Using the diameter as the radius",
          body: "When a coil's diameter is given, halve it before finding \\(A = \\pi r^2\\). Using the diameter makes the moment four times too large.",
        },
        {
          title: "Losing the minus sign in U",
          body: "\\(U = -\\mu B\\cos\\theta\\). The minimum energy is \\(-\\mu B\\) (moment along the field), not zero.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmg-moment-from-field",
      name: "Moment of a loop from the field at its centre",
      intuition:
        "If you know the field at the centre of a loop and its radius, you can work back to the current, and from the current to the moment. Two short steps, each with a formula you already know.",
      definition:
        "- Field at the centre of a single circular loop: \\(B = \\dfrac{\\mu_0 I}{2R}\\), so \\(I = \\dfrac{2RB}{\\mu_0}\\).\n" +
        "- Moment of the loop: \\(\\mu = IA = I\\pi R^2\\).\n" +
        "- Putting the two together: \\(\\mu = \\dfrac{2\\pi R^3 B}{\\mu_0}\\).\n" +
        "- Take \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A.",
      formula: {
        label: "Moment from the field at the centre",
        latex: "I = \\frac{2RB}{\\mu_0}, \\qquad \\mu = I\\pi R^2 = \\frac{2\\pi R^3 B}{\\mu_0}",
        symbols: [
          { symbol: "\\(B\\)", meaning: "field at the centre of the loop" },
          { symbol: "\\(R\\)", meaning: "radius of the loop" },
          { symbol: "\\(\\mu_0\\)", meaning: "permeability of free space" },
        ],
      },
      authoredExample: {
        prompt:
          "The magnetic field at the centre of a single circular loop of radius 10 cm is \\(4 \\times 10^{-6}\\) T. Find the current in the loop and its magnetic moment.",
        steps: [
          "Given: \\(R = 0.1\\) m, \\(B = 4 \\times 10^{-6}\\) T, \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m/A.",
          "Current: \\(I = \\dfrac{2RB}{\\mu_0} = \\dfrac{2 \\times 0.1 \\times 4 \\times 10^{-6}}{4\\pi \\times 10^{-7}} = 0.637\\) A.",
          "Moment: \\(\\mu = I\\pi R^2 = 0.637 \\times 3.142 \\times 0.01 = 0.02\\) A m².",
        ],
        answer: "0.637 A; 0.02 A m²",
      },
      selfCheckExample: {
        prompt: "A single circular loop of radius 5 cm carries a current of 4 A. Find the field at its centre and its magnetic moment.",
        steps: [
          "\\(B = \\dfrac{\\mu_0 I}{2R} = \\dfrac{4\\pi \\times 10^{-7} \\times 4}{2 \\times 0.05} = 5.03 \\times 10^{-5}\\) T.",
          "\\(\\mu = I\\pi R^2 = 4 \\times 3.142 \\times 0.0025 = 0.0314\\) A m².",
        ],
        answer: "\\(5.03 \\times 10^{-5}\\) T; 0.0314 A m²",
      },
      practiceSet: [
        { prompt: "Two single loops have the same field at their centres, but one has twice the radius. How do their moments compare?", answer: "The larger loop's moment is 8 times as large, since \\(\\mu \\propto R^3\\) for a given B" },
        { prompt: "Write the current in a single loop of radius R in terms of the field B at its centre.", answer: "\\(I = 2RB/\\mu_0\\)" },
      ],
      pyqExampleId: "25777a36-26cd-4a8b-8d5e-31e1e5e895d7",
      traps: [
        {
          title: "Skipping the current",
          body: "The moment needs the current, and the question gives the field. Find \\(I\\) from \\(B = \\mu_0 I/(2R)\\) first; using B in place of I in \\(\\mu = IA\\) gives nonsense.",
        },
        {
          title: "Radius left in centimetres",
          body: "R appears squared in the area and cubed in \\(2\\pi R^3B/\\mu_0\\), so a radius left in cm makes the answer wrong by a large power of ten. Convert to metres first.",
        },
      ],
    },
  ],
};
