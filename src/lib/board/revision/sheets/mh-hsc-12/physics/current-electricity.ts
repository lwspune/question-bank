import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 9 Current Electricity. Statements checked against the
 * Balbharati text (law wordings are the book's own); most-asked years from the
 * 33 board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Current Electricity",
  chapterSlug: "current-electricity",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 9",
  keyPoints: [
    {
      term: "Junction and loop",
      text: "A **junction** is any point in a circuit where two or more conductors are joined. A **loop** (mesh) is any closed conducting path in an electric network.",
    },
    {
      term: "Kirchhoff's first law",
      text: "(Current law or junction law) The algebraic sum of the currents at a junction in an electrical network is zero: \\(\\sum I = 0\\). It follows from the **conservation of electrical charge**.",
    },
    {
      term: "Kirchhoff's voltage law",
      text: "The algebraic sum of the potential differences (products of current and resistance) and the emfs in a closed loop is zero: \\(\\sum IR + \\sum \\varepsilon = 0\\). It follows from the **conservation of energy**.",
    },
    {
      term: "Sign convention",
      text: "Along the current through a resistor, \\(IR\\) is negative; against it, positive. An emf is positive when traced inside the source from its negative to its positive terminal.",
    },
    {
      term: "Wheatstone bridge",
      text: "Four resistances P, Q, R, S with a galvanometer across the middle. The condition for balance is \\(I_g = 0\\), which gives \\(\\frac{P}{Q} = \\frac{S}{R}\\) (P, Q in arm ABC; S, R in arm ADC). If any three are known, the fourth can be found.",
    },
    {
      term: "Metre bridge",
      text: "A wire of uniform cross section, one metre long, on a metre scale, with an unknown resistance X in the left gap and a resistance box in the right gap. The jockey is **tapped**, never slid, to find the null point.",
    },
    {
      term: "Metre bridge: errors and remedies",
      text: "Errors: non-uniform wire, contact (end) resistance at the soldered ends, inaccurate lengths. Remedies: get the null point in the middle third (34 to 66 cm); repeat with X and R interchanged; tap the jockey.",
    },
    {
      term: "Potentiometer principle",
      text: "The potential difference between two points on the wire is directly proportional to the length between them, \\(V = K\\ell\\), provided the wire is uniform, the current is the same and the temperature stays constant.",
    },
    {
      term: "Potential gradient",
      text: "The potential difference per unit length of the potentiometer wire, \\(K = \\frac{V_{AB}}{L}\\). SI unit V/m. A longer wire at the same potential difference has a smaller \\(K\\) (more sensitive).",
    },
    {
      term: "Ideal voltmeter",
      text: "Should have **infinite resistance**, so that it draws no current and does not change the potential difference it measures. A potentiometer draws no current at the null point: it acts as an ideal voltmeter.",
    },
    {
      term: "Potentiometer over a voltmeter",
      text: "More sensitive; measures emf as well as potential difference (a voltmeter draws current, so it shows only terminal p.d.); very accurate, down to about \\(10^{-6}\\) V. Demerit: not portable, no direct reading.",
    },
    {
      term: "Galvanometer",
      text: "A device used to detect weak electric currents in a circuit. The coil deflects in proportion to the current. Coil resistance about 100 Ω; current capacity about 1 mA.",
    },
    {
      term: "Shunt",
      text: "A low resistance connected **in parallel** with the galvanometer. It provides an alternate path for the current, protects the instrument, increases the range of an ammeter and lowers its resistance.",
    },
    {
      term: "Ammeter and voltmeter",
      text: "Ammeter: measures current, connected in series, low resistance (ideally zero). Voltmeter: measures potential difference, connected in parallel, high resistance (ideally infinite), made with a high resistance in series.",
    },
  ],
  formulas: [
    { label: "Kirchhoff's laws", latex: "\\sum I = 0 \\qquad \\sum IR + \\sum \\varepsilon = 0" },
    { label: "Wheatstone bridge: balance", latex: "\\frac{P}{Q} = \\frac{S}{R}" },
    {
      label: "Metre bridge",
      latex: "X = R\\,\\frac{\\ell_X}{\\ell_R} = R\\,\\frac{\\ell_X}{100 - \\ell_X}",
      symbols: [{ symbol: "ℓX", meaning: "balancing length (cm) on the side of X" }],
    },
    { label: "Kelvin's method: galvanometer resistance", latex: "G = R\\,\\frac{\\ell_g}{100 - \\ell_g}" },
    { label: "Potential gradient", latex: "K = \\frac{V_{AB}}{L} = \\frac{\\varepsilon R}{L(R + r)} \\qquad V = K\\ell" },
    { label: "Comparing emfs: one cell at a time", latex: "\\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{\\ell_1}{\\ell_2}" },
    { label: "Comparing emfs: sum and difference", latex: "\\frac{\\varepsilon_1 + \\varepsilon_2}{\\varepsilon_1 - \\varepsilon_2} = \\frac{\\ell_1}{\\ell_2}" },
    {
      label: "Internal resistance of a cell",
      latex: "r = R\\left(\\frac{\\ell_1}{\\ell_2} - 1\\right) = R\\,\\frac{\\ell_1 - \\ell_2}{\\ell_2}",
      symbols: [
        { symbol: "ℓ1", meaning: "balancing length for the emf (open circuit)" },
        { symbol: "ℓ2", meaning: "balancing length with R across the cell" },
      ],
    },
    { label: "Galvanometer to ammeter: shunt", latex: "S = \\frac{I_g G}{I - I_g} = \\frac{G}{n - 1} \\qquad R_A = \\frac{SG}{S + G}" },
    { label: "Galvanometer to voltmeter: series resistance", latex: "X = \\frac{V}{I_g} - G = G(n - 1)" },
  ],
  derivations: [
    {
      title: "Obtain the balancing condition of a Wheatstone bridge",
      steps: [
        "Current \\(I\\) splits at A into \\(I_1\\) (through P) and \\(I_2\\) (through S); \\(I_g\\) flows through the galvanometer in BD.",
        "Apply Kirchhoff's voltage law to loops ABDA and BCDB, with currents \\(I_1 - I_g\\) in Q and \\(I_2 + I_g\\) in R.",
        "At balance \\(I_g = 0\\): \\(I_1 P = I_2 S\\) and \\(I_1 Q = I_2 R\\).",
        "Divide: \\(\\frac{P}{Q} = \\frac{S}{R}\\). If any three resistances are known, the fourth can be found.",
      ],
    },
    {
      title: "Determine an unknown resistance with a metre bridge",
      steps: [
        "X in the left gap, resistance box R in the right gap, galvanometer from the central strip to the jockey; cell, key and rheostat across the wire.",
        "Take a suitable R and tap the jockey along the wire to find the null point D.",
        "At balance \\(\\frac{X}{R} = \\frac{R_{AD}}{R_{DC}} = \\frac{\\ell_X}{\\ell_R}\\) for a uniform wire.",
        "So \\(X = R\\,\\frac{\\ell_X}{100 - \\ell_X}\\). Repeat for several R and with X and R interchanged; take the mean.",
      ],
    },
    {
      title: "Kelvin's method to determine the resistance of a galvanometer by using a metre bridge",
      steps: [
        "Galvanometer G in one gap, resistance box R in the other; no separate galvanometer: the jockey joins B to the wire.",
        "Adjust the rheostat for a deflection of about two-thirds of the range with the jockey off the wire.",
        "Find the point D where tapping the jockey causes **no change** in deflection: B and D are then at the same potential.",
        "Bridge balanced: \\(\\frac{G}{R} = \\frac{\\ell_g}{\\ell_r}\\), so \\(G = R\\,\\frac{\\ell_g}{100 - \\ell_g}\\).",
      ],
    },
    {
      title: "Compare emfs of two cells with a potentiometer",
      steps: [
        "A battery, key and rheostat send a steady current through wire AB; the cells \\(\\varepsilon_1\\) and \\(\\varepsilon_2\\) join A through a two-way key, the galvanometer and the jockey.",
        "With \\(\\varepsilon_1\\) in circuit, the null point is at \\(\\ell_1\\): \\(\\varepsilon_1 = K\\ell_1\\). With \\(\\varepsilon_2\\): \\(\\varepsilon_2 = K\\ell_2\\).",
        "Hence \\(\\frac{\\varepsilon_1}{\\varepsilon_2} = \\frac{\\ell_1}{\\ell_2}\\). In the sum and difference method, \\(\\frac{\\varepsilon_1 + \\varepsilon_2}{\\varepsilon_1 - \\varepsilon_2} = \\frac{\\ell_1}{\\ell_2}\\).",
      ],
    },
    {
      title: "Determine the internal resistance of a cell with a potentiometer",
      steps: [
        "Key K2 open (no current from the cell): null point at \\(\\ell_1\\), so \\(\\varepsilon_1 = K\\ell_1\\).",
        "K2 closed, resistance R across the cell: null point at \\(\\ell_2\\) for the terminal p.d., \\(V = IR = K\\ell_2\\).",
        "\\(\\frac{\\varepsilon_1}{V} = \\frac{I(R + r)}{IR} = \\frac{\\ell_1}{\\ell_2}\\).",
        "Hence \\(r = R\\left(\\frac{\\ell_1}{\\ell_2} - 1\\right)\\).",
      ],
    },
    {
      title: "Convert a moving coil galvanometer into an ammeter",
      steps: [
        "Range must rise and resistance must fall: connect a low resistance S (shunt) **in parallel** with the galvanometer G.",
        "\\(I_g\\) flows through G and \\(I - I_g\\) through S; the p.d. across both is the same: \\(I_g G = (I - I_g)S\\).",
        "So \\(S = \\frac{I_g G}{I - I_g}\\); with \\(n = \\frac{I}{I_g}\\), \\(S = \\frac{G}{n - 1}\\).",
      ],
    },
    {
      title: "Convert a moving coil galvanometer into a voltmeter",
      steps: [
        "Range and resistance must both rise: connect a high resistance X **in series** with the galvanometer G.",
        "For full scale deflection at voltage V: \\(V = I_g(G + X)\\).",
        "So \\(X = \\frac{V}{I_g} - G\\); with \\(n = \\frac{V}{V_g}\\), \\(X = G(n - 1)\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Wheatstone bridge", labels: ["resistances P, Q, R, S", "galvanometer G across BD", "cell, key across AC", "currents I1, I2 and Ig"] },
    { title: "Metre bridge", labels: ["one metre wire on a scale", "L-shaped strips and central strip", "X in the left gap, resistance box R in the right", "galvanometer and jockey", "cell, key and rheostat", "lengths ℓX and ℓR"] },
    { title: "Potentiometer: internal resistance of a cell", labels: ["wire AB with battery, key K1 and rheostat", "cell ε1 with + at A", "galvanometer and jockey", "resistance box R and key K2", "null points ℓ1 and ℓ2"] },
    { title: "Potentiometer: comparing emfs", labels: ["wire AB with battery, key and rheostat", "cells ε1 and ε2", "two-way key", "galvanometer and jockey"] },
    { title: "Galvanometer as an ammeter", labels: ["galvanometer G", "shunt S in parallel", "currents Ig and I minus Ig", "total current I"] },
    { title: "Galvanometer as a voltmeter", labels: ["galvanometer G", "high resistance X in series", "current Ig", "p.d. V across the ends"] },
  ],
  mostAsked: [
    {
      topic: "Metre bridge and Wheatstone bridge: unknown resistance, balancing condition, errors, Kelvin's method or a numerical",
      years: [2026, 2025, 2024, 2020, 2018, 2017, 2016],
    },
    {
      topic: "Convert a moving coil galvanometer into an ammeter or a voltmeter: method or a numerical",
      years: [2026, 2025, 2024, 2023],
    },
    { topic: "Potential gradient and measuring emf with a potentiometer", years: [2026, 2025, 2022, 2020] },
    { topic: "Internal resistance of a cell with a potentiometer: method or a numerical", years: [2025, 2023, 2019, 2016] },
    { topic: "Ideal voltmeter, or distinguish between an ammeter and a voltmeter", years: [2024, 2023] },
    { topic: "Advantages of a potentiometer over a voltmeter", years: [2025, 2022, 2017] },
    { topic: "Kirchhoff's laws: statements, what they conserve, or a two-cell numerical", years: [2026, 2025, 2022] },
  ],
  mistakes: [
    {
      title: "Swapping shunt and series resistance",
      body: "Ammeter: a **low** resistance in **parallel** (shunt). Voltmeter: a **high** resistance in **series**. Say which, and how it is connected, every time.",
    },
    {
      title: "Using \\(G(n - 1)\\) for a shunt",
      body: "Shunt \\(S = \\frac{G}{n - 1}\\); series resistance \\(X = G(n - 1)\\). Put full scale currents in amperes: 20 μA is \\(20 \\times 10^{-6}\\) A.",
    },
    {
      title: "Mixing up what Kirchhoff's laws conserve",
      body: "The junction (current) law conserves **charge**; the loop (voltage) law conserves **energy**.",
    },
    {
      title: "Taking the wrong balancing length in a metre bridge",
      body: "\\(\\ell_X\\) is measured from the end on X's side and \\(\\ell_R = 100 - \\ell_X\\). A null point outside 34 to 66 cm gives a large error.",
    },
    {
      title: "Reversing \\(\\ell_1\\) and \\(\\ell_2\\) for internal resistance",
      body: "\\(\\ell_1\\) is for the emf (K2 open) and is the longer one; \\(\\ell_2\\) is with R across the cell. \\(r = R\\frac{\\ell_1 - \\ell_2}{\\ell_2}\\).",
    },
    {
      title: "Connecting cells to the potentiometer the wrong way",
      body: "The positive terminal of the main battery and of each cell must go to the same end A; otherwise no null point is found.",
    },
  ],
};

export default sheet;
