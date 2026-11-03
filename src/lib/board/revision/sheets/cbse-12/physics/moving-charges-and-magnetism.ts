import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 4 Moving Charges and Magnetism. Statements checked
 * against the NCERT text (law wordings are the book's own); most-asked years
 * from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Moving Charges and Magnetism",
  chapterSlug: "moving-charges-and-magnetism",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 4",
  keyPoints: [
    {
      term: "Lorentz force",
      text: "The total force on a charge q moving with velocity \\(\\vec{v}\\) in fields \\(\\vec{E}\\) and \\(\\vec{B}\\): \\(\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B})\\). The magnetic part is normal to \\(\\vec{v}\\), so it does **no work** and does not change the speed. It is zero for a charge at rest or moving along \\(\\vec{B}\\).",
    },
    {
      term: "Tesla",
      text: "SI unit of magnetic field: B is 1 T when a charge of 1 C moving at 1 m/s normal to it feels a force of 1 N. A smaller unit, the gauss, is \\(10^{-4}\\) T.",
    },
    {
      term: "Motion in a magnetic field",
      text: "Velocity normal to \\(\\vec{B}\\): uniform circular motion, with the magnetic force giving the centripetal force. Velocity with a component along \\(\\vec{B}\\): a **helix**. The frequency \\(\\frac{qB}{2\\pi m}\\) (cyclotron frequency) does not depend on the speed or radius.",
    },
    {
      term: "Biot-Savart law",
      text: "The field \\(d\\vec{B}\\) due to a current element \\(I\\,d\\vec{l}\\) at a point at distance r: \\(d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{l} \\times \\vec{r}}{r^3}\\), magnitude \\(\\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\sin\\theta}{r^2}\\). \\(\\mu_0 = 4\\pi \\times 10^{-7}\\) T m A\\(^{-1}\\).",
    },
    {
      term: "Ampere's circuital law",
      text: "The line integral of \\(\\vec{B}\\) round a closed curve equals \\(\\mu_0\\) times the net current through the surface it bounds: \\(\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I\\). Useful when there is symmetry, like Gauss's law.",
    },
    {
      term: "Right-hand rules",
      text: "Straight wire: grasp it with the thumb along the current; the fingers curl along \\(\\vec{B}\\) (circles round the wire). Loop: curl the fingers along the current; the thumb gives \\(\\vec{B}\\) on the axis and \\(\\vec{m}\\).",
    },
    {
      term: "Solenoid",
      text: "A long wire wound as a helix with closely spaced turns. The field inside is uniform and along the axis, \\(B = \\mu_0 nI\\); outside it is nearly zero. It is made stronger by more turns per unit length, more current or a soft iron core.",
    },
    {
      term: "Parallel currents",
      text: "Each conductor sits in the field of the other and feels a force. Parallel currents **attract**, anti-parallel currents **repel**. The forces are equal and opposite.",
    },
    {
      term: "Definition of the ampere",
      text: "The ampere is the steady current which, maintained in each of two very long, straight, parallel conductors of negligible cross section placed one metre apart in vacuum, produces a force of \\(2 \\times 10^{-7}\\) newton per metre of length on each.",
    },
    {
      term: "Current loop as a magnetic dipole",
      text: "A planar loop of N turns, area A and current I has magnetic moment \\(\\vec{m} = NI\\vec{A}\\) (unit A m\\(^2\\)), direction by the right-hand thumb rule. Its axial field far away has the same form as that of a bar magnet, so it behaves as a magnetic dipole.",
    },
    {
      term: "Loop in a uniform field",
      text: "Net force is zero; torque \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\). Torque is zero when the plane of the loop is normal to \\(\\vec{B}\\) (\\(\\vec{m}\\) along \\(\\vec{B}\\)) and maximum when the plane is along \\(\\vec{B}\\).",
    },
    {
      term: "Moving coil galvanometer",
      text: "A coil free to rotate in a **uniform radial** field, so \\(\\sin\\theta = 1\\) and torque \\(NIAB\\) at every position. A spring gives counter torque \\(k\\phi\\): at balance \\(k\\phi = NIAB\\), so \\(\\phi \\propto I\\). The soft iron core makes the field radial and stronger.",
    },
    {
      term: "Sensitivity",
      text: "Current sensitivity: deflection per unit current, \\(\\frac{NAB}{k}\\). Voltage sensitivity: deflection per unit voltage, \\(\\frac{NAB}{kR}\\). Doubling N doubles the current sensitivity but also about doubles R, so the voltage sensitivity may not rise.",
    },
    {
      term: "Ammeter and voltmeter",
      text: "Ammeter: a small resistance (shunt) **in parallel** with the galvanometer, so most current bypasses the coil and the meter's resistance is low. Voltmeter: a large resistance **in series**, so it draws very little current.",
    },
  ],
  formulas: [
    { label: "Lorentz force", latex: "\\vec{F} = q(\\vec{E} + \\vec{v} \\times \\vec{B}) \\qquad F_B = qvB\\sin\\theta" },
    {
      label: "Circular motion in B",
      latex: "r = \\frac{mv}{qB} = \\frac{p}{qB} = \\frac{\\sqrt{2mK}}{qB} \\qquad T = \\frac{2\\pi m}{qB} \\qquad \\nu = \\frac{qB}{2\\pi m}",
    },
    {
      label: "Helical motion",
      latex: "r = \\frac{mv_\\perp}{qB} \\qquad \\text{pitch } p = v_\\parallel T = \\frac{2\\pi m v_\\parallel}{qB}",
    },
    { label: "Undeflected through crossed E and B", latex: "qE = qvB \\ \\Rightarrow\\ v = \\frac{E}{B}" },
    { label: "Force on a conductor", latex: "\\vec{F} = I\\,\\vec{l} \\times \\vec{B} \\qquad F = IlB\\sin\\theta" },
    { label: "Biot-Savart law", latex: "d\\vec{B} = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,d\\vec{l} \\times \\vec{r}}{r^3}, \\qquad dB = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl\\sin\\theta}{r^2}" },
    {
      label: "Circular loop: on the axis and at the centre",
      latex: "B = \\frac{\\mu_0 N I R^2}{2(x^2 + R^2)^{3/2}} \\qquad B_{\\text{centre}} = \\frac{\\mu_0 N I}{2R}",
    },
    { label: "Arc of angle θ at its centre", latex: "B = \\frac{\\mu_0 I}{4\\pi R}\\,\\theta \\quad (\\text{semicircle: } \\frac{\\mu_0 I}{4R})" },
    { label: "Ampere's circuital law", latex: "\\oint \\vec{B}\\cdot d\\vec{l} = \\mu_0 I_{\\text{enclosed}}" },
    {
      label: "Long straight wire",
      latex: "B = \\frac{\\mu_0 I}{2\\pi r}\\ (r \\ge a) \\qquad B = \\frac{\\mu_0 I r}{2\\pi a^2}\\ (r < a)",
      symbols: [{ symbol: "a", meaning: "radius of the wire, current spread uniformly" }],
    },
    { label: "Long solenoid", latex: "B = \\mu_0 n I, \\qquad n = \\frac{N}{L}" },
    { label: "Force per unit length between parallel wires", latex: "f = \\frac{\\mu_0 I_a I_b}{2\\pi d}" },
    { label: "Magnetic moment and torque", latex: "\\vec{m} = NI\\vec{A} \\qquad \\vec{\\tau} = \\vec{m} \\times \\vec{B}, \\quad \\tau = NIAB\\sin\\theta" },
    { label: "Galvanometer", latex: "k\\phi = NIAB \\qquad \\frac{\\phi}{I} = \\frac{NAB}{k} \\qquad \\frac{\\phi}{V} = \\frac{NAB}{kR}" },
    {
      label: "Galvanometer to ammeter: shunt",
      latex: "S = \\frac{I_g G}{I - I_g}",
      symbols: [{ symbol: "Ig", meaning: "current for full scale deflection; G galvanometer resistance" }],
    },
    { label: "Galvanometer to voltmeter: series R", latex: "R = \\frac{V}{I_g} - G" },
  ],
  derivations: [
    {
      title: "Derive the force on a straight conductor carrying current in a uniform magnetic field",
      steps: [
        "Rod of length l, area A, n free charges per unit volume each of charge q, drifting with \\(\\vec{v}_d\\).",
        "Force on each carrier \\(q\\vec{v}_d \\times \\vec{B}\\); number of carriers \\(nAl\\).",
        "Total force \\(\\vec{F} = (nqv_dA)\\,\\vec{l} \\times \\vec{B}\\), and \\(nqv_dA = I\\).",
        "So \\(\\vec{F} = I\\,\\vec{l} \\times \\vec{B}\\): maximum when the wire is normal to \\(\\vec{B}\\), zero when along it.",
      ],
    },
    {
      title: "Show that a charge moving normal to a uniform magnetic field goes in a circle, and find its radius and frequency",
      steps: [
        "The force \\(q\\vec{v} \\times \\vec{B}\\) is always normal to \\(\\vec{v}\\): it changes direction, not speed, so it acts as a centripetal force.",
        "\\(\\frac{mv^2}{r} = qvB\\), so \\(r = \\frac{mv}{qB}\\).",
        "\\(\\omega = \\frac{v}{r} = \\frac{qB}{m}\\), \\(\\nu = \\frac{qB}{2\\pi m}\\), \\(T = \\frac{2\\pi m}{qB}\\): independent of speed.",
        "If \\(\\vec{v}\\) also has a part along \\(\\vec{B}\\), that part is unchanged: the path is a helix with pitch \\(v_\\parallel T\\).",
      ],
    },
    {
      title: "Using Biot-Savart law, derive the magnetic field on the axis of a circular current loop",
      steps: [
        "Loop of radius R, current I; point P on the axis at distance x. Each element dl is normal to the line to P, at distance \\(\\sqrt{x^2 + R^2}\\).",
        "\\(dB = \\frac{\\mu_0}{4\\pi}\\,\\frac{I\\,dl}{x^2 + R^2}\\).",
        "Components normal to the axis cancel for opposite elements; the axial parts add, each times \\(\\cos\\theta = \\frac{R}{\\sqrt{x^2 + R^2}}\\).",
        "\\(B = \\frac{\\mu_0 I R}{4\\pi (x^2 + R^2)^{3/2}} \\times 2\\pi R = \\frac{\\mu_0 I R^2}{2(x^2 + R^2)^{3/2}}\\); at the centre (x = 0) \\(B = \\frac{\\mu_0 I}{2R}\\).",
      ],
    },
    {
      title: "Using Ampere's circuital law, find the field due to a long straight current-carrying wire",
      steps: [
        "By symmetry the field lines are circles centred on the wire and B is the same everywhere on such a circle.",
        "Take an Amperian circle of radius r: \\(\\oint \\vec{B}\\cdot d\\vec{l} = B \\times 2\\pi r\\).",
        "Current enclosed is I, so \\(B \\times 2\\pi r = \\mu_0 I\\) and \\(B = \\frac{\\mu_0 I}{2\\pi r}\\).",
        "Inside a wire of radius a with uniform current, enclosed current is \\(\\frac{Ir^2}{a^2}\\), so \\(B = \\frac{\\mu_0 I r}{2\\pi a^2}\\).",
      ],
    },
    {
      title: "Using Ampere's law, find the field inside a long solenoid",
      steps: [
        "Inside, the field is uniform and along the axis; outside, it is nearly zero.",
        "Take a rectangular Amperian loop abcd with side h inside along the axis.",
        "Only side h inside contributes: \\(\\oint \\vec{B}\\cdot d\\vec{l} = Bh\\). Current enclosed \\(= nhI\\).",
        "\\(Bh = \\mu_0 nhI\\), so \\(B = \\mu_0 nI\\).",
      ],
    },
    {
      title: "Derive the force between two long parallel currents and define the ampere",
      steps: [
        "Wire a (current \\(I_a\\)) sets up \\(B_a = \\frac{\\mu_0 I_a}{2\\pi d}\\) at wire b, normal to it.",
        "Force on length L of b: \\(F_{ba} = I_b L B_a = \\frac{\\mu_0 I_a I_b}{2\\pi d}\\,L\\), directed towards a for parallel currents.",
        "Per unit length \\(f = \\frac{\\mu_0 I_a I_b}{2\\pi d}\\); equal and opposite on a. Parallel attract, anti-parallel repel.",
        "With \\(I_a = I_b = 1\\) A and d = 1 m, \\(f = 2 \\times 10^{-7}\\) N/m: this defines one ampere.",
      ],
    },
    {
      title: "Derive the torque on a rectangular current loop in a uniform magnetic field",
      steps: [
        "Loop of sides a and b, current I; normal at angle \\(\\theta\\) to \\(\\vec{B}\\). Forces on the two arms of length b cancel and are collinear.",
        "Forces \\(IbB\\) on the arms of length a are equal, opposite and not collinear: a couple with arm \\(a\\sin\\theta\\).",
        "\\(\\tau = IbB \\cdot a\\sin\\theta = IAB\\sin\\theta\\); for N turns \\(NIAB\\sin\\theta\\).",
        "With \\(\\vec{m} = NI\\vec{A}\\): \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\). Net force on the loop is zero.",
      ],
    },
    {
      title: "Explain the working of a moving coil galvanometer and convert it to an ammeter or a voltmeter",
      steps: [
        "Coil in a radial field round a soft iron core: torque \\(NIAB\\) at every position, balanced by spring torque \\(k\\phi\\), so \\(\\phi = \\frac{NAB}{k}I\\).",
        "Ammeter: shunt S in parallel; \\(I_gG = (I - I_g)S\\), so \\(S = \\frac{I_gG}{I - I_g}\\).",
        "Voltmeter: high resistance R in series; \\(V = I_g(G + R)\\), so \\(R = \\frac{V}{I_g} - G\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Helical motion of a charge in a magnetic field", labels: ["uniform field B", "v along B and v normal to B", "radius r", "pitch p"] },
    { title: "Field on the axis of a circular loop", labels: ["loop of radius R, current I", "point P at distance x", "element dl and dB", "components that cancel and add"] },
    { title: "Long solenoid with Amperian loop", labels: ["closely wound turns", "uniform B inside along the axis", "rectangular loop abcd", "side h inside"] },
    { title: "Two long parallel currents", labels: ["wires a and b, distance d", "currents Ia and Ib", "field Ba at b", "force Fba towards a"] },
    { title: "Torque on a rectangular loop", labels: ["loop of sides a and b", "field B and normal at angle θ", "forces on the two arms", "magnetic moment m"] },
    { title: "Moving coil galvanometer", labels: ["coil", "concave pole pieces N and S", "soft iron core", "spring", "pointer and scale", "radial field"] },
  ],
  mostAsked: [
    {
      topic: "Charged particle in a magnetic field: force, circular or helical path, radius, period and energy",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Moving coil galvanometer: principle, radial field, sensitivity, and conversion to an ammeter or voltmeter",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Torque on a current loop and its magnetic moment: derivation, zero and maximum, loops of the same wire",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Biot-Savart law: field of a current element, a circular loop on its axis or at its centre, arcs",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Ampere's circuital law: field of a long straight wire and of a solenoid",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Force between two long parallel currents and the definition of the ampere",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Force on a current-carrying conductor in a magnetic field: derivation or a numerical",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Saying the magnetic force changes speed",
      body: "\\(q\\vec{v} \\times \\vec{B}\\) is normal to \\(\\vec{v}\\): it does no work, so kinetic energy and speed stay constant. An electron leaving a semicircle has its entry speed.",
    },
    {
      title: "Forgetting the sign of the charge",
      body: "Work out \\(\\vec{v} \\times \\vec{B}\\), then **reverse** it for an electron. An electron and a proton with the same momentum have the same radius but turn opposite ways.",
    },
    {
      title: "Mixing the two right-hand rules",
      body: "Straight wire: thumb along current, fingers give B. Loop or solenoid: fingers along current, thumb gives B (and m). State the rule you use.",
    },
    {
      title: "Wrong torque angle",
      body: "In \\(\\tau = NIAB\\sin\\theta\\), \\(\\theta\\) is between \\(\\vec{B}\\) and the **normal** (\\(\\vec{m}\\)). Plane of the coil normal to B: \\(\\tau = 0\\). Plane along B: maximum.",
    },
    {
      title: "Loops made from the same wire",
      body: "For a wire of length L, a circle has the most area, so the most m and torque. Rewinding into n turns: radius becomes \\(\\frac{R}{n}\\), field at the centre \\(n^2\\) times, magnetic moment \\(\\frac{1}{n}\\) times.",
    },
    {
      title: "Shunt and series resistance swapped",
      body: "Ammeter: **small** shunt in **parallel**, \\(S = \\frac{I_gG}{I - I_g}\\). Voltmeter: **large** resistance in **series**, \\(R = \\frac{V}{I_g} - G\\).",
    },
  ],
};

export default sheet;
