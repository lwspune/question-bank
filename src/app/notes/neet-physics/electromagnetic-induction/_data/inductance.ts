import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EI_INDUCTANCE_NOTE: SubtopicNote = {
  subtopicName: "Self and Mutual Inductance",
  title: "Self and Mutual Inductance",
  oneLineDefinition:
    "Mutual inductance M links the current in one coil to the flux through another, self-inductance L links a coil's current to its own flux, an inductor's emf is L dI/dt, and a current I stores energy ½LI².",
  whyItMatters:
    "Six NEET questions from 2021 to 2026, four of them from 2024 or later. One asks how the mutual inductance of a small loop at the centre of a large one depends on the radii (2021). Two are about a solenoid's self-inductance: a ratio for two solenoids (Re-NEET 2024) and the formula itself (Re-NEET 2026). Two ask for the emf across inductors in a circuit: a branch with an inductor, a cell and a resistor (2025) and identical inductors joined two ways (Re-NEET 2026). One asks for the energy stored in an inductor (2023).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphei-mutual",
      name: "Mutual inductance of two coils",
      intuition:
        "A current in one coil sends magnetic flux through a nearby coil, and that flux is proportional to the current. The constant is the mutual inductance M. Change the current in the first coil and the second coil gets an emf. M is the same whichever coil carries the current, so work out the flux through the coil where the field is easiest to find.",
      definition:
        "- A current \\(I_1\\) in coil 1 gives a flux linkage \\(N_2\\Phi_2 = MI_1\\) in coil 2, and \\(\\varepsilon_2 = -M\\,\\dfrac{dI_1}{dt}\\).\n" +
        "- \\(M_{12} = M_{21}\\): the same M works both ways. SI unit: the henry, \\(1\\ \\text{H} = 1\\ \\text{Wb/A}\\).\n" +
        "- Two long coaxial solenoids of length l, inner radius \\(r_1\\), with \\(n_1\\) and \\(n_2\\) turns per unit length: \\(M = \\mu_0 n_1 n_2 \\pi r_1^{2} l\\). With a core of relative permeability \\(\\mu_r\\): \\(M = \\mu_r\\mu_0 n_1 n_2 \\pi r_1^{2} l\\).\n" +
        "- A small loop at the centre of a large one: pass the current through the large loop, whose field \\(\\dfrac{\\mu_0 I}{2R}\\) at its centre is nearly uniform over the small loop, and find the flux through the small loop.\n" +
        "- M depends on the shapes, sizes, separation and orientation of the coils and on the material around them, not on the current.",
      formula: {
        label: "Mutual inductance",
        latex: "\\varepsilon_2 = -M\\frac{dI_1}{dt}, \\qquad M = \\mu_0 n_1 n_2 \\pi r_1^{2} l",
        symbols: [
          { symbol: "\\(n_1, n_2\\)", meaning: "turns per unit length of the two solenoids" },
          { symbol: "\\(r_1\\)", meaning: "radius of the inner solenoid" },
          { symbol: "\\(l\\)", meaning: "length of the solenoids" },
        ],
      },
      authoredExample: {
        prompt:
          "Two long coaxial solenoids are 0.5 m long. The inner one has radius 2 cm and 1000 turns per metre; the outer one has 2000 turns per metre. Find their mutual inductance, and the emf in the outer solenoid when the current in the inner one changes at 10 A/s.",
        steps: [
          "\\(M = \\mu_0 n_1 n_2 \\pi r_1^{2} l = 4\\pi \\times 10^{-7} \\times 1000 \\times 2000 \\times \\pi \\times (0.02)^{2} \\times 0.5\\).",
          "\\(M = 1.6\\pi^{2} \\times 10^{-4} \\approx 1.58 \\times 10^{-3}\\ \\text{H}\\).",
          "\\(|\\varepsilon| = M\\,\\dfrac{dI}{dt} \\approx 1.58 \\times 10^{-3} \\times 10 \\approx 1.6 \\times 10^{-2}\\ \\text{V}\\).",
        ],
        answer: "\\(M \\approx 1.6\\ \\text{mH}\\); \\(\\varepsilon \\approx 16\\ \\text{mV}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two coils have a mutual inductance of 0.02 H. The current in the first rises steadily from 0 to 5 A in 0.1 s. What emf is induced in the second?",
        steps: [
          "\\(\\dfrac{dI_1}{dt} = \\dfrac{5}{0.1} = 50\\ \\text{A/s}\\).",
          "\\(|\\varepsilon_2| = M\\,\\dfrac{dI_1}{dt} = 0.02 \\times 50 = 1\\ \\text{V}\\).",
        ],
        answer: "1 V",
      },
      practiceSet: [
        { prompt: "A pair of coils has a mutual inductance of 1.5 H. The current in one changes from 0 to 20 A in 0.5 s. What is the change of flux linkage with the other coil?", answer: "30 Wb", method: "\\(\\Delta(N\\Phi) = M\\,\\Delta I = 1.5 \\times 20\\)." },
        { prompt: "A steady current in coil A gives a flux linkage in coil B. If the same current flows in coil B instead, is the flux linkage in coil A the same?", answer: "Yes, because \\(M_{12} = M_{21}\\)" },
        { prompt: "Two coaxial solenoids are filled with a core of relative permeability 400. By what factor does their mutual inductance change?", answer: "400 times" },
        { prompt: "What is the SI unit of mutual inductance?", answer: "The henry (H)" },
      ],
      pyqExampleId: "7e997213-17b2-44cf-aac1-dd0221d3fb71",
      traps: [
        {
          title: "Finding the flux through the wrong loop",
          body: "For a small loop inside a large one, the large loop's field is easy to find at its centre, but the small loop's field over the large loop is not. Pass the current through the large loop and find the flux through the small one; M is the same either way.",
        },
        {
          title: "Coaxial solenoids use the inner radius",
          body: "Only the inner solenoid's cross-section carries flux common to both coils, so M uses \\(\\pi r_1^{2}\\) of the inner solenoid, whichever one carries the current.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphei-self",
      name: "Self-inductance of a solenoid",
      intuition:
        "A coil's own current makes a flux through its own turns, and that flux is proportional to the current. The constant is the self-inductance L. When the current changes, the coil induces an emf in itself that opposes the change. L plays the part of inertia for current, just as mass resists a change of velocity. It depends on the coil's shape and on the material inside it, not on the current.",
      definition:
        "- \\(N\\Phi = LI\\), and the self-induced emf is \\(\\varepsilon = -L\\,\\dfrac{dI}{dt}\\). Unit: the henry.\n" +
        "- Long solenoid of length l, area A, n turns per unit length (\\(N = nl\\) turns in all): \\(L = \\mu_0 n^{2}Al = \\dfrac{\\mu_0 N^{2}A}{l}\\).\n" +
        "- For a round solenoid of radius r, \\(A = \\pi r^{2}\\), so \\(L = \\mu_0\\pi n^{2}r^{2}l\\).\n" +
        "- Filled with a core of relative permeability \\(\\mu_r\\): \\(L = \\mu_r\\mu_0 n^{2}Al\\).\n" +
        "- So \\(L \\propto n^{2}Al\\): a change in n counts twice.",
      formula: {
        label: "Self-inductance of a solenoid",
        latex: "\\varepsilon = -L\\frac{dI}{dt}, \\qquad L = \\mu_r\\mu_0 n^{2}Al",
        symbols: [
          { symbol: "\\(n\\)", meaning: "turns per unit length" },
          { symbol: "\\(A\\)", meaning: "area of cross-section" },
          { symbol: "\\(\\mu_r\\)", meaning: "relative permeability of the core (1 for air)" },
        ],
      },
      authoredExample: {
        prompt:
          "An air-cored solenoid 0.5 m long has 500 turns and a cross-section of \\(10\\ \\text{cm}^{2}\\). Find its self-inductance. What does it become when a core of relative permeability 100 fills it?",
        steps: [
          "\\(n = \\dfrac{500}{0.5} = 1000\\) turns per metre, \\(A = 10^{-3}\\ \\text{m}^{2}\\).",
          "\\(L = \\mu_0 n^{2}Al = 4\\pi \\times 10^{-7} \\times 10^{6} \\times 10^{-3} \\times 0.5 = 2\\pi \\times 10^{-4} \\approx 6.3 \\times 10^{-4}\\ \\text{H}\\).",
          "With the core, L is 100 times larger: about \\(6.3 \\times 10^{-2}\\ \\text{H}\\).",
        ],
        answer: "About 0.63 mH, and about 63 mH with the core",
      },
      selfCheckExample: {
        prompt:
          "An emf of 0.5 V is induced in a coil when the current in it changes at 25 A/s. What is its self-inductance?",
        steps: [
          "\\(|\\varepsilon| = L\\,\\dfrac{dI}{dt}\\), so \\(L = \\dfrac{0.5}{25}\\).",
          "\\(L = 0.02\\ \\text{H}\\).",
        ],
        answer: "20 mH",
      },
      practiceSet: [
        { prompt: "The current through a coil is doubled. Does its self-inductance change?", answer: "No: L depends only on the coil and its core" },
        { prompt: "A soft iron core of relative permeability 500 is slid fully into an air-cored solenoid. By what factor does its self-inductance change?", answer: "500 times" },
        { prompt: "Write the self-inductance of a long solenoid of N turns in all, length l and cross-section A.", answer: "\\(L = \\mu_0 N^{2}A/l\\)" },
        { prompt: "Express the henry in volts, seconds and amperes.", answer: "\\(1\\ \\text{H} = 1\\ \\text{V s/A}\\)" },
      ],
      pyqExampleId: "5a97c776-9d4c-4f1f-94ed-abb6fdcf85ad",
      traps: [
        {
          title: "Turns per unit length, not total turns",
          body: "In \\(L = \\mu_0 n^{2}Al\\), n is the number of turns per unit length. With the total number of turns N, the formula is \\(\\mu_0 N^{2}A/l\\). Mixing the two gives a factor of \\(l^{2}\\) wrong.",
        },
        {
          title: "n is squared",
          body: "L goes as \\(n^{2}\\), so halving the turns per unit length cuts L to a quarter, not a half. The length and the area enter only to the first power.",
        },
        {
          title: "L does not depend on the current",
          body: "A larger current gives a larger flux, but the ratio \\(N\\Phi/I\\) stays the same. L changes only with the coil's size, turns or core.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphei-circuit",
      name: "Inductors in a circuit",
      intuition:
        "In a circuit an inductor behaves like a small cell whose emf L dI/dt appears only while the current is changing. When the current rises, the inductor pushes back, so the potential drops across it in the direction of the current. When the current falls, it pushes the current on. With a steady current an ideal inductor is just a piece of wire.",
      definition:
        "- Across an inductor, in the direction of the current, the potential falls by \\(L\\,\\dfrac{dI}{dt}\\). If the current is falling, dI/dt is negative and the potential rises instead.\n" +
        "- Walking along a branch from A to B: subtract \\(IR\\) for each resistor, \\(L\\,dI/dt\\) for each inductor and E for each cell crossed from its + to its − terminal (add E for − to +). What is left is \\(V_B\\).\n" +
        "- Steady current: \\(dI/dt = 0\\), so there is no potential difference across an ideal inductor.\n" +
        "- Inductors far enough apart that mutual inductance can be neglected: in series they carry one current and their emfs add, \\(L = L_1 + L_2\\); in parallel they share one emf and their currents add, \\(\\dfrac{1}{L} = \\dfrac{1}{L_1} + \\dfrac{1}{L_2}\\).\n" +
        "- Two identical inductors in parallel carry half the current each.",
      formula: {
        label: "Inductor in a circuit",
        latex: "V_L = L\\frac{dI}{dt}, \\qquad L_{\\text{series}} = L_1 + L_2, \\qquad \\frac{1}{L_{\\text{parallel}}} = \\frac{1}{L_1} + \\frac{1}{L_2}",
      },
      authoredExample: {
        prompt:
          "A current flows from P to Q through a 2 Ω resistor and then a 0.5 H inductor in series. At one instant the current is 3 A and is falling at 4 A/s. Find \\(V_P - V_Q\\).",
        steps: [
          "Across the resistor the potential falls by \\(IR = 3 \\times 2 = 6\\ \\text{V}\\).",
          "Across the inductor it falls by \\(L\\,\\dfrac{dI}{dt} = 0.5 \\times (-4) = -2\\ \\text{V}\\), that is, it rises by 2 V.",
          "\\(V_P - 6 + 2 = V_Q\\), so \\(V_P - V_Q = 4\\ \\text{V}\\).",
        ],
        answer: "4 V",
      },
      selfCheckExample: {
        prompt:
          "Inductors of 2 mH and 3 mH are joined in series, far apart, and the current through them rises at 100 A/s. What is the emf across the pair?",
        steps: [
          "In series, \\(L = 2 + 3 = 5\\ \\text{mH}\\).",
          "\\(|\\varepsilon| = L\\,\\dfrac{dI}{dt} = 5 \\times 10^{-3} \\times 100 = 0.5\\ \\text{V}\\).",
        ],
        answer: "0.5 V",
      },
      practiceSet: [
        { prompt: "What is the potential difference across an ideal inductor carrying a steady current?", answer: "Zero" },
        { prompt: "Two 6 mH inductors are joined in parallel, far apart. What is their equivalent inductance?", answer: "3 mH" },
        { prompt: "The current through a 0.2 H inductor rises at 5 A/s. What is the size of the emf across it?", answer: "1 V" },
        { prompt: "Two identical inductors in parallel carry a total current I. What current flows through each?", answer: "\\(I/2\\)" },
      ],
      pyqExampleId: "1efffa80-f983-412d-b1fa-3679a1738568",
      traps: [
        {
          title: "Sign of dI/dt when the current falls",
          body: "For a falling current, \\(L\\,dI/dt\\) is negative, so the potential rises across the inductor in the direction of the current. The inductor then acts with the current, not against it.",
        },
        {
          title: "An inductor with a steady current",
          body: "An ideal inductor has no resistance. With a steady current there is no voltage across it at all; it is not a drop of \\(LI\\).",
        },
        {
          title: "Parallel inductors combine like resistors",
          body: "Inductors (with no mutual inductance) add in series and combine by reciprocals in parallel, the same rules as resistors, not the rules for capacitors.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphei-energy",
      name: "Energy stored in an inductor",
      intuition:
        "To build up a current in a coil you must push against its back emf, and that work is not lost: it is stored in the coil's magnetic field. The energy depends only on the final current, just as kinetic energy depends only on the final speed. Here L plays the part of mass and I the part of velocity.",
      definition:
        "- Work done to raise the current from 0 to I: \\(W = \\tfrac12 LI^{2}\\). This energy is stored in the magnetic field of the inductor.\n" +
        "- It matches kinetic energy \\(\\tfrac12 mv^{2}\\), with L in place of m and I in place of v.\n" +
        "- Energy goes as \\(I^{2}\\): doubling the current stores four times the energy.\n" +
        "- Keep the prefixes: 1 μH is \\(10^{-6}\\ \\text{H}\\) and 1 mH is \\(10^{-3}\\ \\text{H}\\).",
      formula: {
        label: "Energy in an inductor",
        latex: "U = \\tfrac12 LI^{2}",
      },
      authoredExample: {
        prompt:
          "The current in a 0.2 H coil is raised from 2 A to 4 A. How much extra energy is stored in its magnetic field?",
        steps: [
          "\\(U_1 = \\tfrac12 \\times 0.2 \\times 2^{2} = 0.4\\ \\text{J}\\).",
          "\\(U_2 = \\tfrac12 \\times 0.2 \\times 4^{2} = 1.6\\ \\text{J}\\).",
          "Extra energy \\(= 1.6 - 0.4 = 1.2\\ \\text{J}\\).",
        ],
        answer: "1.2 J",
      },
      selfCheckExample: {
        prompt: "An inductor stores 0.9 J of energy when it carries a current of 3 A. Find its inductance.",
        steps: [
          "\\(L = \\dfrac{2U}{I^{2}} = \\dfrac{2 \\times 0.9}{9}\\).",
          "\\(L = 0.2\\ \\text{H}\\).",
        ],
        answer: "0.2 H",
      },
      practiceSet: [
        { prompt: "The current through an inductor is doubled. By what factor does the stored energy change?", answer: "4 times" },
        { prompt: "A 50 mH inductor stores 0.1 J. What current does it carry?", answer: "2 A", method: "\\(I = \\sqrt{2U/L} = \\sqrt{0.2/0.05}\\)." },
        { prompt: "Where is the energy of a current-carrying inductor stored?", answer: "In its magnetic field" },
        { prompt: "In the energy \\(\\tfrac12 LI^{2}\\), which quantity plays the part of mass?", answer: "The inductance L" },
      ],
      pyqExampleId: "9e85b6ee-64c6-4625-84b9-517119c4b5c5",
      traps: [
        {
          title: "Energy goes as the square of the current",
          body: "Half the current stores a quarter of the energy, not a half. Square the current before multiplying by L/2.",
        },
        {
          title: "Losing the prefix",
          body: "An inductance in microhenry with a current of a few amperes gives an energy in microjoule. Writing μH as mH makes the answer a thousand times too big.",
        },
      ],
    },
  ],
};
