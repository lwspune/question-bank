import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_KT_EQUIPARTITION_NOTE: SubtopicNote = {
  subtopicName: "Law of Equipartition of Energy and Degrees of Freedom",
  title: "Degrees of Freedom and the Law of Equipartition",
  oneLineDefinition:
    "The independent ways a molecule can move, counted for monatomic, diatomic and polyatomic gases, and the law that gives each of them an average energy of ½kT, which fixes Cv, Cp and their ratio.",
  whyItMatters:
    "4 questions. Two were set in board papers: the ratio of specific heats of a polyatomic gas with f vibrational modes (2016) and the degrees of freedom of a monoatomic gas (2026). The textbook asks you to state the law, find the molar specific heats of monatomic and diatomic gases, and name the factors on which degrees of freedom depend.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hscpkt-dof",
      name: "Degrees of freedom of a molecule",
      intuition:
        "A degree of freedom is one independent way in which a molecule can move and so hold energy. A single atom can only move along x, y and z. A dumb-bell shaped molecule can also tumble about two axes. At high temperature its two atoms can also vibrate towards and away from each other.",
      definition:
        "- **Degrees of freedom** are the independent coordinates needed to describe the motion of a molecule completely.\n" +
        "- They depend on the **number of atoms** in the molecule, the **arrangement** of the atoms (linear or not) and the **temperature** (vibration starts only at high temperature).\n" +
        "- A diatomic molecule has only 2 rotational degrees of freedom: rotation about the line joining its atoms does not move the atoms, so it is not counted.\n" +
        "- Each vibrational mode counts twice, because it has both kinetic and potential energy.",
      table: {
        columns: ["Molecule", "Translational", "Rotational", "Total"],
        rows: [
          {
            cells: ["Monatomic (He, Ne, Ar)", "3", "0", "3"],
            pyqExampleId: "c1962368-6e44-4067-804f-5b9185620b74",
            noteAmber: "Board 2026 asked the degrees of freedom of a monoatomic gas: 3.",
          },
          { cells: ["Diatomic, rigid (O₂, N₂ at room temperature)", "3", "2", "5"] },
          { cells: ["Diatomic, vibrating (high temperature)", "3", "2", "7 (one vibration counts twice)"] },
          { cells: ["Non-linear polyatomic, rigid", "3", "3", "6"] },
        ],
      },
      selfCheckExample: {
        prompt: "How many degrees of freedom does a molecule of carbon monoxide (CO) have at room temperature?",
        steps: ["CO is diatomic and, at room temperature, rigid.", "3 translational + 2 rotational."],
        answer: "5",
      },
      practiceSet: [
        { prompt: "How many rotational degrees of freedom does a diatomic molecule have?", answer: "2" },
        { prompt: "Why is rotation about the axis of a diatomic molecule not counted?", answer: "It does not change the positions of the atoms, so it stores no energy" },
        { prompt: "Name the factors on which the degrees of freedom of a molecule depend.", answer: "The number of atoms, their arrangement, and the temperature" },
      ],
      traps: [
        {
          title: "Counting a vibration once",
          body: "A vibrational mode has kinetic AND potential energy, so it adds 2 to the count, not 1. A vibrating diatomic molecule has 7, not 6.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpkt-equipartition-law",
      name: "Law of equipartition of energy",
      intuition:
        "Energy shares itself out fairly. In a gas at temperature T, every way a molecule can hold energy gets the same average share, ½kT. Count the ways, multiply, and you have the energy of the gas; how fast that energy rises with temperature is its specific heat.",
      definition:
        "- **Law:** for a dynamical system in thermal equilibrium, the total energy is distributed equally among all the degrees of freedom. The average energy per molecule for each degree of freedom is \\(\\dfrac{1}{2}k_BT\\).\n" +
        "- For one mole with f degrees of freedom: \\(E = \\dfrac{f}{2}RT\\), so \\(C_V = \\dfrac{dE}{dT} = \\dfrac{f}{2}R\\).\n" +
        "- By Mayer's relation \\(C_P = C_V + R\\), and \\(\\gamma = \\dfrac{C_P}{C_V} = 1 + \\dfrac{2}{f}\\).\n" +
        "- Monatomic: \\(C_V = \\dfrac{3}{2}R\\), \\(C_P = \\dfrac{5}{2}R\\), \\(\\gamma = \\dfrac{5}{3}\\). Rigid diatomic: \\(C_V = \\dfrac{5}{2}R\\), \\(C_P = \\dfrac{7}{2}R\\), \\(\\gamma = \\dfrac{7}{5}\\). Vibrating diatomic: \\(C_V = \\dfrac{7}{2}R\\), \\(C_P = \\dfrac{9}{2}R\\), \\(\\gamma = \\dfrac{9}{7}\\).\n" +
        "- Polyatomic with f vibrational modes: \\(C_V = (3 + f)R\\), \\(C_P = (4 + f)R\\).",
      formula: {
        label: "Molar specific heats from equipartition",
        latex: "C_V = \\frac{f}{2}R, \\qquad C_P = \\left(\\frac{f}{2} + 1\\right)R, \\qquad \\gamma = 1 + \\frac{2}{f}",
        symbols: [
          { symbol: "\\(f\\)", meaning: "degrees of freedom of one molecule, a vibration counted twice" },
          { symbol: "\\(\\gamma\\)", meaning: "ratio of the two specific heats" },
        ],
      },
      authoredExample: {
        prompt: "Using the law of equipartition of energy, find \\(C_V\\), \\(C_P\\) and γ for a rigid diatomic gas. (R = 8.31 J mol⁻¹ K⁻¹)",
        steps: [
          "Given: rigid diatomic, so \\(f = 3 + 2 = 5\\).",
          "Energy of one mole: \\(E = \\dfrac{5}{2}RT\\), so \\(C_V = \\dfrac{5}{2}R = 2.5 \\times 8.31 = 20.8\\) J mol⁻¹ K⁻¹.",
          "\\(C_P = C_V + R = \\dfrac{7}{2}R = 29.1\\) J mol⁻¹ K⁻¹.",
          "\\(\\gamma = \\dfrac{7/2}{5/2} = \\dfrac{7}{5} = 1.4\\).",
        ],
        answer: "Cv = 20.8 J mol⁻¹ K⁻¹, Cp = 29.1 J mol⁻¹ K⁻¹, γ = 1.4",
      },
      selfCheckExample: {
        prompt: "A gas has γ = 1.4. How many degrees of freedom does each of its molecules have?",
        steps: ["\\(\\gamma = 1 + \\dfrac{2}{f}\\), so \\(\\dfrac{2}{f} = 0.4\\).", "\\(f = 5\\)."],
        answer: "5 (a rigid diatomic gas)",
      },
      practiceSet: [
        { prompt: "What is the average energy per molecule for each degree of freedom?", answer: "\\(\\frac{1}{2}k_BT\\)" },
        { prompt: "Find the energy of one mole of a rigid diatomic gas at 400 K. (R = 8.31 J mol⁻¹ K⁻¹)", answer: "\\(\\frac{5}{2} \\times 8.31 \\times 400 = 8310\\) J" },
        { prompt: "Why does one vibrational mode contribute \\(k_BT\\) and not \\(\\frac{1}{2}k_BT\\)?", answer: "It has two energy terms, kinetic and potential, each with \\(\\frac{1}{2}k_BT\\)" },
      ],
      pyqExampleId: "b1ce01c2-7ced-4a06-bff2-4e363191a7d1",
      traps: [
        {
          title: "Stating the law without its condition",
          body: "The equal sharing holds for a system in thermal equilibrium. State that condition, and give the value \\(\\frac{1}{2}k_BT\\) per degree of freedom per molecule.",
        },
        {
          title: "Expecting γ to grow with more degrees of freedom",
          body: "Each extra degree of freedom adds the same amount to \\(C_P\\) and \\(C_V\\), so \\(\\gamma = 1 + 2/f\\) falls towards 1. Monatomic gases have the largest γ.",
        },
      ],
    },
  ],
};
