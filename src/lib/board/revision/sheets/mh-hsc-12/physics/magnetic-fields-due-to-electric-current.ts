import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 10 Magnetic Fields due to Electric Current.
 * Statements checked against the Balbharati text; most-asked years from the
 * 31 board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Magnetic Fields due to Electric Current",
  chapterSlug: "magnetic-fields-due-to-electric-current",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 10",
  keyPoints: [
    {
      term: "Lorentz force",
      text: "With both fields present, the net force on a charge \\(q\\) moving with velocity \\(\\vec{v}\\) is \\(\\vec{F} = q[\\vec{E} + (\\vec{v} \\times \\vec{B})]\\): electric part \\(q\\vec{E}\\) plus magnetic part \\(q(\\vec{v} \\times \\vec{B})\\).",
    },
    {
      term: "Magnetic force on a charge",
      text: "\\(F = qvB\\sin\\theta\\). It is zero when \\(\\vec{v}\\) is parallel to \\(\\vec{B}\\) or when the charge is **stationary**. Being perpendicular to \\(\\vec{v}\\), it never does any work: it can change the direction of motion, never the speed.",
    },
    {
      term: "Tesla",
      text: "1 T is the field in which a charge of 1 C moving at 1 m/s perpendicular to it feels a force of 1 N. \\(1\\ \\text{T} = 1\\ \\text{Wb/m}^2 = 1\\ \\text{N/(A m)} = 10^4\\) gauss.",
    },
    {
      term: "Cyclotron",
      text: "A charged particle accelerator (Lawrence and Livingston). Crossed fields: \\(B\\) bends the ion into a circle inside the dees; the high frequency field across the gap accelerates it. It works because the frequency of revolution is independent of the energy.",
    },
    {
      term: "Resonance condition",
      text: "The frequency of the applied voltage equals the cyclotron frequency, \\(f_a = f_c\\), so the dees reverse polarity as the ion reaches the gap. The ion gains \\(eV\\) at each crossing; its final energy is proportional to \\(R_{exit}^2\\).",
    },
    {
      term: "Helical motion",
      text: "A velocity component parallel to \\(\\vec{B}\\) is unaffected, while the perpendicular component gives circular motion, so the path becomes a helix.",
    },
    {
      term: "Force on a closed circuit",
      text: "\\(\\vec{F} = I\\left(\\oint d\\vec{l}\\right) \\times \\vec{B}\\). The sum of the length vectors around a closed circuit is zero, so in a **uniform** field the net force on a closed circuit is zero.",
    },
    {
      term: "Magnetic dipole moment",
      text: "A current coil has \\(\\mu = NIA\\), directed along the normal to its plane (right hand rule). SI unit A m² (or J/T). Torque on it: \\(\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}\\), analogous to \\(\\vec{p} \\times \\vec{E}\\).",
    },
    {
      term: "Magnetic potential energy",
      text: "\\(U = -\\vec{\\mu}\\cdot\\vec{B} = -\\mu B\\cos\\theta\\). Minimum \\(-\\mu B\\) when \\(\\vec{\\mu}\\) is parallel to \\(\\vec{B}\\); maximum \\(+\\mu B\\) when antiparallel.",
    },
    {
      term: "Moving coil galvanometer",
      text: "A coil of N turns free to rotate in a **radial** field made by a soft iron core, so \\(\\tau = NIAB\\) always. A spring gives a restoring torque \\(K\\phi\\); at balance \\(\\phi = \\frac{NAB}{K}I\\), so deflection is proportional to current.",
    },
    {
      term: "Biot-Savart law",
      text: "A current element \\(I\\,dl\\) produces at distance \\(r\\) a field \\(dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^2}\\), directed along \\(d\\vec{l} \\times \\vec{r}\\). The net field is found by adding (integrating) the fields of all elements.",
    },
    {
      term: "The ampere",
      text: "The constant current which, in two infinitely long parallel wires 1 m apart in vacuum, produces a force of \\(2 \\times 10^{-7}\\) N per metre of length on each.",
    },
    {
      term: "Ampere's circuital law",
      text: "\\(\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I\\): the line integral of \\(\\vec{B}\\) around a closed (Amperian) loop equals \\(\\mu_0\\) times the **net current encircled** by the loop. Use it where the currents have symmetry.",
    },
    {
      term: "Solenoid and toroid",
      text: "Ideal solenoid: uniform field \\(\\mu_0 ni\\) inside along the axis, zero outside. A toroid is a solenoid bent into a hollow ring: field lines are concentric circles, and \\(B \\propto \\frac{1}{R}\\), so it is not constant over the cross section.",
    },
  ],
  formulas: [
    { label: "Lorentz force", latex: "\\vec{F} = q\\vec{E} + q(\\vec{v} \\times \\vec{B}) \\qquad F_m = qvB\\sin\\theta" },
    { label: "Circular motion in a field", latex: "r = \\frac{mv}{qB} \\qquad f_c = \\frac{qB}{2\\pi m} \\qquad T = \\frac{2\\pi m}{qB}" },
    { label: "Cyclotron: final kinetic energy", latex: "K.E. = \\frac{q^2 B^2 R_{exit}^2}{2m}" },
    { label: "Force on a current carrying wire", latex: "\\vec{F} = I\\vec{l} \\times \\vec{B} \\qquad F = IlB\\sin\\theta" },
    { label: "Magnetic dipole moment and torque", latex: "\\mu = NIA \\qquad \\vec{\\tau} = \\vec{\\mu} \\times \\vec{B} \\qquad \\tau = NIAB\\sin\\theta" },
    { label: "Magnetic potential energy", latex: "U = -\\vec{\\mu}\\cdot\\vec{B} = -\\mu B\\cos\\theta" },
    {
      label: "Moving coil galvanometer",
      latex: "K\\phi = NIAB \\qquad \\phi = \\left(\\frac{NAB}{K}\\right)I",
      symbols: [{ symbol: "K", meaning: "torsional constant of the spring" }],
    },
    { label: "Biot-Savart law", latex: "dB = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\sin\\theta}{r^2} \\qquad \\mu_0 = 4\\pi \\times 10^{-7}\\ \\text{T m/A}" },
    { label: "Long straight wire", latex: "B = \\frac{\\mu_0 I}{2\\pi r}" },
    { label: "Force between parallel wires (per unit length)", latex: "\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}" },
    {
      label: "Circular arc and loop: field at the centre",
      latex: "B_{arc} = \\frac{\\mu_0 I \\theta}{4\\pi R} \\qquad B_{loop} = \\frac{\\mu_0 N I}{2R}",
      symbols: [{ symbol: "θ", meaning: "angle (radians) the arc subtends at the centre" }],
    },
    { label: "Axis of a circular loop", latex: "B = \\frac{\\mu_0 I R^2}{2(z^2 + R^2)^{3/2}} \\qquad B \\approx \\frac{\\mu_0 \\mu}{2\\pi z^3} \\ (z \\gg R)" },
    { label: "Ampere's law", latex: "\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I" },
    { label: "Solenoid and toroid", latex: "B_{solenoid} = \\mu_0 n i \\qquad B_{toroid} = \\frac{\\mu_0 N i}{2\\pi R}" },
  ],
  derivations: [
    {
      title: "Radius, frequency and kinetic energy of a charged particle in a cyclotron",
      steps: [
        "Magnetic force gives the centripetal force: \\(qvB = \\frac{mv^2}{r}\\), so \\(r = \\frac{mv}{qB}\\).",
        "Period \\(T = \\frac{2\\pi r}{v} = \\frac{2\\pi m}{qB}\\); cyclotron frequency \\(f_c = \\frac{qB}{2\\pi m}\\), independent of speed and energy.",
        "Resonance \\(f_a = f_c\\): the ion is accelerated at every crossing of the gap and spirals out.",
        "At exit \\(v = \\frac{qBR_{exit}}{m}\\), so \\(K.E. = \\frac{1}{2}mv^2 = \\frac{q^2B^2R_{exit}^2}{2m}\\).",
      ],
    },
    {
      title: "Force on a closed circuit in a uniform magnetic field",
      steps: [
        "Force on an element: \\(d\\vec{F} = I\\,d\\vec{l} \\times \\vec{B}\\); for the whole circuit \\(\\vec{F} = \\oint I\\,d\\vec{l} \\times \\vec{B}\\).",
        "For a uniform \\(\\vec{B}\\), take it out: \\(\\vec{F} = I\\left(\\oint d\\vec{l}\\right) \\times \\vec{B}\\).",
        "The vector sum of length elements around a closed circuit is zero, so \\(\\vec{F} = 0\\).",
      ],
    },
    {
      title: "Torque on a rectangular current loop in a uniform magnetic field",
      steps: [
        "Loop abcd with sides ab and cd (length \\(a\\)) perpendicular to \\(\\vec{B}\\); its normal makes angle \\(\\theta\\) with \\(\\vec{B}\\).",
        "Forces on bc and da are equal, opposite and in line: they cancel. Forces \\(IaB\\) on ab and cd are equal, opposite but not in line: a couple.",
        "Arm of the couple is \\(b\\sin\\theta\\), so \\(\\tau = IaB\\,b\\sin\\theta = IAB\\sin\\theta\\); for N turns \\(\\tau = NIAB\\sin\\theta = \\mu B\\sin\\theta\\).",
      ],
    },
    {
      title: "Explain Biot-Savart law and find the field of a long straight wire",
      steps: [
        "State \\(dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl\\sin\\theta}{r^2}\\), direction of \\(d\\vec{l} \\times \\vec{r}\\) (into the paper in the figure).",
        "For a straight wire, integrate the elements of the upper half from 0 to infinity; the lower half gives the same field in the same direction.",
        "Adding the two halves: \\(B = \\frac{\\mu_0 I}{2\\pi R}\\) at distance \\(R\\) from the wire.",
      ],
    },
    {
      title: "Force between two long parallel current carrying wires; define the ampere",
      steps: [
        "Field of wire 1 at wire 2: \\(B = \\frac{\\mu_0 I_1}{2\\pi d}\\), perpendicular to wire 2.",
        "Force on length \\(L\\) of wire 2: \\(F = I_2 L B = \\frac{\\mu_0 I_1 I_2 L}{2\\pi d}\\); wire 1 feels an equal and opposite force.",
        "So \\(\\frac{F}{L} = \\frac{\\mu_0 I_1 I_2}{2\\pi d}\\): attraction for currents in the same direction, repulsion for opposite.",
        "With \\(I_1 = I_2 = 1\\) A and \\(d = 1\\) m, \\(\\frac{F}{L} = 2 \\times 10^{-7}\\) N/m: this defines 1 ampere.",
      ],
    },
    {
      title: "Magnetic field at the centre of a circular arc of a wire carrying current (and of a loop)",
      steps: [
        "Every element \\(dl\\) of the arc is perpendicular to the radius \\(R\\), so \\(dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl}{R^2}\\), all into the paper.",
        "Integrate over the arc: \\(B = \\frac{\\mu_0 I}{4\\pi R^2}\\int dl\\), and the arc length is \\(R\\theta\\).",
        "Hence \\(B = \\frac{\\mu_0 I\\theta}{4\\pi R}\\). For a full loop \\(\\theta = 2\\pi\\): \\(B = \\frac{\\mu_0 I}{2R}\\); for N turns \\(\\frac{\\mu_0 NI}{2R}\\).",
      ],
    },
    {
      title: "Axial magnetic field of a circular current loop",
      steps: [
        "Each \\(d\\vec{l}\\) is perpendicular to \\(\\vec{r}\\), with \\(r^2 = R^2 + z^2\\): \\(dB = \\frac{\\mu_0}{4\\pi}\\frac{I\\,dl}{z^2 + R^2}\\).",
        "Components perpendicular to the axis cancel in pairs (diametrically opposite elements); only \\(dB_z = dB\\cos\\theta\\), \\(\\cos\\theta = \\frac{R}{r}\\), adds up.",
        "Integrate over \\(2\\pi R\\): \\(B = \\frac{\\mu_0 I R^2}{2(z^2 + R^2)^{3/2}}\\). At the centre (\\(z = 0\\)) this gives \\(\\frac{\\mu_0 I}{2R}\\).",
      ],
    },
    {
      title: "State Ampere's law; field of a long wire and of a coaxial cable",
      steps: [
        "State \\(\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I\\), \\(I\\) being the net current encircled by the Amperian loop.",
        "Long wire: a circular loop of radius \\(r\\); \\(B\\) is tangent and constant, so \\(B \\cdot 2\\pi r = \\mu_0 I\\) and \\(B = \\frac{\\mu_0 I}{2\\pi r}\\).",
        "Coaxial cable: for \\(a < r < b\\) the loop encircles \\(I\\), so \\(B = \\frac{\\mu_0 I}{2\\pi r}\\); for \\(r > b\\) the net current is zero, so \\(B = 0\\).",
      ],
    },
    {
      title: "Magnetic field of a long solenoid using Ampere's law",
      steps: [
        "Take a rectangular Amperian loop abcd of length \\(L\\), side ab inside along the axis, cd outside.",
        "Only ab contributes: \\(BL\\). On bc and da \\(\\vec{B} \\perp d\\vec{l}\\); outside, \\(B = 0\\).",
        "Current encircled \\(I = nLi\\), so \\(BL = \\mu_0 nLi\\) and \\(B = \\mu_0 ni\\).",
      ],
    },
    {
      title: "Obtain an expression for the magnetic induction of a toroid",
      steps: [
        "Draw a circular Amperian loop of radius \\(R\\) along the central axis of the tube; \\(B\\) is tangent and equal all along it.",
        "\\(\\oint \\vec{B}\\cdot d\\vec{l} = B \\cdot 2\\pi R\\); the loop encircles the current \\(Ni\\) (N total turns).",
        "\\(B \\cdot 2\\pi R = \\mu_0 Ni\\), so \\(B = \\frac{\\mu_0 Ni}{2\\pi R}\\): inversely proportional to \\(R\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Cyclotron", labels: ["dees D1 and D2", "ion source at the centre", "uniform field B perpendicular to the dees", "high frequency oscillator across the gap", "spiral path", "exit slit and target"] },
    { title: "Moving coil galvanometer", labels: ["coil of N turns", "pole pieces of the magnet", "soft iron core", "radial field", "spring", "pointer and scale"] },
    { title: "Current loop in a magnetic field (torque)", labels: ["loop abcd", "field B", "forces on ab and cd", "normal at angle θ to B", "current direction"] },
    { title: "Two long parallel wires", labels: ["currents I1 and I2", "separation d", "field of wire 1 at wire 2", "forces F12 and F21"] },
    { title: "Circular arc of a wire", labels: ["arc AB of radius R", "centre O", "angle θ at the centre", "element dl perpendicular to r", "current I"] },
    { title: "Amperian loop in a solenoid and a toroid", labels: ["rectangular loop abcd, length L", "dots and crosses for current", "circular loop along the toroid axis", "radius R"] },
  ],
  mostAsked: [
    {
      topic: "Cyclotron: what it accelerates, diagram, kinetic energy or frequency numericals",
      years: [2026, 2025, 2024, 2019, 2018, 2016],
    },
    {
      topic: "Biot-Savart law, and the field at the centre of a circular arc or loop",
      years: [2026, 2025, 2024],
    },
    {
      topic: "Ampere's circuital law: statement, long straight wire, coaxial cable, solenoid or toroid",
      years: [2026, 2025, 2023, 2022, 2018],
    },
    { topic: "Magnetic force on a charge: stationary charge, work done, unit of B", years: [2026, 2025, 2022] },
    { topic: "Magnetic dipole moment of a coil and torque \\(\\vec{\\tau} = \\vec{\\mu} \\times \\vec{B}\\)", years: [2024, 2020] },
    { topic: "Moving coil galvanometer: diagram or a numerical", years: [2022, 2020, 2017] },
    { topic: "Force between two long parallel wires: numerical", years: [2026, 2023] },
    { topic: "Force on a closed circuit in a uniform magnetic field", years: [2025, 2023] },
  ],
  mistakes: [
    {
      title: "Saying a magnetic field does work on a moving charge",
      body: "The magnetic force is always perpendicular to the velocity, so the work done is zero and the speed (kinetic energy) does not change. On a stationary charge the force is zero.",
    },
    {
      title: "Writing the arc angle in degrees",
      body: "In \\(B = \\frac{\\mu_0 I\\theta}{4\\pi R}\\), \\(\\theta\\) is in radians. A full loop is \\(2\\pi\\), a semicircle \\(\\pi\\).",
    },
    {
      title: "Using the diameter as R",
      body: "A coil of diameter 14 cm has \\(R = 7\\) cm \\(= 0.07\\) m. Area \\(A = \\pi R^2\\) for the dipole moment \\(\\mu = NIA\\).",
    },
    {
      title: "Expecting a cyclotron to accelerate neutrons",
      body: "It accelerates **charged** particles only. The frequency of the electric field must equal \\(\\frac{qB}{2\\pi m}\\) (resonance), and the electric field is reversed every half period.",
    },
    {
      title: "Taking toroid B as uniform like a solenoid",
      body: "Solenoid: \\(B = \\mu_0 ni\\) with \\(n\\) turns per metre. Toroid: \\(B = \\frac{\\mu_0 Ni}{2\\pi R}\\) with \\(N\\) total turns, and it varies with \\(R\\).",
    },
    {
      title: "Getting the direction of the force between wires wrong",
      body: "Parallel currents attract; antiparallel currents repel. The forces on the two wires are equal and opposite.",
    },
  ],
};

export default sheet;
