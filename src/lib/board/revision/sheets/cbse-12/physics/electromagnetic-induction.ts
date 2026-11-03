import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 6 Electromagnetic Induction. Statements checked against
 * the NCERT text (laws in the book's own wording); most-asked years from all 99
 * CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Electromagnetic Induction",
  chapterSlug: "electromagnetic-induction",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 6",
  keyPoints: [
    {
      term: "Magnetic flux",
      text: "Through a plane of area A in a uniform field B: \\(\\Phi_B = \\vec{B}\\cdot\\vec{A} = BA\\cos\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{B}\\) and the area vector (the normal). SI unit weber (Wb) or T m\\(^2\\). Magnetic flux is a scalar quantity.",
    },
    {
      term: "Faraday's law of induction",
      text: "The magnitude of the induced emf in a circuit is equal to the time rate of change of magnetic flux through the circuit: \\(\\varepsilon = -N\\frac{d\\Phi_B}{dt}\\) for a closely wound coil of N turns.",
    },
    {
      term: "Ways to induce an emf",
      text: "The flux can be varied by changing any one or more of B, A and \\(\\theta\\): move a magnet or a current-carrying coil (change B), shrink or stretch the coil, or move a rod on rails (change A), or rotate the coil in the field (change \\(\\theta\\)).",
    },
    {
      term: "Lenz's law",
      text: "The polarity of induced emf is such that it tends to produce a current which opposes the change in magnetic flux that produced it. The negative sign in Faraday's law shows this.",
    },
    {
      term: "Lenz's law and conservation of energy",
      text: "An N-pole pushed towards a closed coil meets a N-pole of the induced current and is repelled, so a person must do work; that energy is dissipated as Joule heat. If the current flowed the other way the magnet would be pulled in with ever increasing speed: a perpetual-motion machine, which violates conservation of energy.",
    },
    {
      term: "Motional emf",
      text: "A rod of length l moved with velocity v normal to a uniform field B has an emf \\(Blv\\) across its ends. It can also be explained by the Lorentz force \\(qvB\\) on the free charges of the rod: work per unit charge \\(= Blv\\).",
    },
    {
      term: "Inductance",
      text: "The ratio of the flux linkage to current, \\(\\frac{N\\Phi_B}{I}\\). A scalar; SI unit henry (H); dimensions \\([\\mathrm{M\\,L^2\\,T^{-2}\\,A^{-2}}]\\).",
    },
    {
      term: "Mutual inductance",
      text: "A current \\(I_2\\) in coil 2 gives a flux linkage \\(N_1\\Phi_1 = M_{12}I_2\\) with coil 1; \\(M_{12}\\) is the mutual inductance (coefficient of mutual induction). A changing \\(I_2\\) induces \\(\\varepsilon_1 = -M_{12}\\frac{dI_2}{dt}\\). Always \\(M_{12} = M_{21}\\).",
    },
    {
      term: "What mutual inductance depends on",
      text: "The geometry of the coils (radii, number of turns, length), their separation and relative orientation, and the medium between them (\\(\\mu_r\\)). Not on the currents or their rate of change. It is largest when one coil is wound over the other.",
    },
    {
      term: "Self-induction",
      text: "An emf induced in a single coil by a change of current in the same coil. \\(N\\Phi_B = LI\\), L the self-inductance (coefficient of self-induction); \\(\\varepsilon = -L\\frac{dI}{dt}\\). The self-induced emf always opposes any change (increase or decrease) of current in the coil.",
    },
    {
      term: "Back emf and electrical inertia",
      text: "The self-induced emf is also called the back emf. Self-inductance plays the role of inertia: it is the electromagnetic analogue of mass. It depends on the geometry of the coil and on the permeability of the medium (an iron core raises it).",
    },
    {
      term: "AC generator",
      text: "Converts mechanical energy into electrical energy. A coil (armature) on a rotor shaft is rotated in a uniform field, its axis of rotation perpendicular to B; the changing flux induces an emf. The ends of the coil connect to the external circuit through slip rings and brushes.",
    },
    {
      term: "Generators in practice",
      text: "Rotation comes from falling water (hydro-electric), steam from coal (thermal) or nuclear fuel (nuclear). In most generators the coils are held stationary and the electromagnets rotate. The frequency is 50 Hz in India.",
    },
  ],
  formulas: [
    { label: "Magnetic flux", latex: "\\Phi_B = \\vec{B}\\cdot\\vec{A} = BA\\cos\\theta" },
    { label: "Faraday's law", latex: "\\varepsilon = -N\\frac{d\\Phi_B}{dt} \\qquad I = \\frac{\\varepsilon}{R}" },
    { label: "Induced charge", latex: "q = \\frac{N\\,\\Delta\\Phi_B}{R}" },
    { label: "Motional emf", latex: "\\varepsilon = Blv" },
    { label: "Rod rotating about one end", latex: "\\varepsilon = \\frac{1}{2}B\\omega R^2 \\qquad \\omega = 2\\pi\\nu" },
    { label: "Mutual inductance", latex: "N_1\\Phi_1 = M I_2 \\qquad \\varepsilon_1 = -M\\frac{dI_2}{dt} \\qquad M_{12} = M_{21}" },
    {
      label: "Two long coaxial solenoids",
      latex: "M = \\mu_0 n_1 n_2 \\pi r_1^2 l \\qquad M = \\mu_r\\mu_0 n_1 n_2 \\pi r_1^2 l \\text{ (with a core)}",
      symbols: [
        { symbol: "\\(r_1\\)", meaning: "radius of the inner solenoid" },
        { symbol: "\\(n_1, n_2\\)", meaning: "turns per unit length" },
      ],
    },
    { label: "Two concentric coplanar coils", latex: "M = \\frac{\\mu_0 \\pi r_1^2}{2 r_2} \\quad (r_1 \\ll r_2,\\ \\text{one turn each})" },
    { label: "Self-inductance", latex: "N\\Phi_B = LI \\qquad \\varepsilon = -L\\frac{dI}{dt}" },
    { label: "Long solenoid", latex: "L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l} \\qquad L = \\mu_r\\mu_0 n^2 A l" },
    { label: "Energy in an inductor", latex: "U = \\frac{1}{2}LI^2 \\qquad \\frac{U}{V} = \\frac{B^2}{2\\mu_0}" },
    { label: "AC generator", latex: "\\varepsilon = NBA\\omega\\sin\\omega t = \\varepsilon_0\\sin\\omega t \\qquad \\varepsilon_0 = NBA(2\\pi\\nu)" },
    {
      label: "Dimensions",
      latex: "[\\Phi_B] = [\\mathrm{M\\,L^2\\,T^{-2}\\,A^{-1}}] \\quad [\\varepsilon] = [\\mathrm{M\\,L^2\\,T^{-3}\\,A^{-1}}] \\quad [L] = [M] = [\\mathrm{M\\,L^2\\,T^{-2}\\,A^{-2}}]",
    },
  ],
  derivations: [
    {
      title: "Motional emf in a rod moving on a rectangular conductor",
      steps: [
        "Rod PQ of length l slides on arms of PQRS in a uniform field B normal to the plane; with \\(RQ = x\\), the flux is \\(\\Phi_B = Blx\\).",
        "\\(\\varepsilon = -\\frac{d\\Phi_B}{dt} = -Bl\\frac{dx}{dt} = Blv\\), since \\(\\frac{dx}{dt} = -v\\).",
        "Lorentz force check: a charge q in the rod feels \\(qvB\\) along PQ; work in moving it from P to Q is \\(W = qvBl\\), so \\(\\varepsilon = \\frac{W}{q} = Blv\\).",
        "With arm resistance r: \\(I = \\frac{Blv}{r}\\); the force to keep v constant is \\(F = \\frac{B^2l^2v}{r}\\).",
      ],
    },
    {
      title: "Emf across a rod rotating about one end in a uniform field",
      steps: [
        "Rod of length R rotates with angular speed \\(\\omega\\) about one end, in a plane normal to B.",
        "An element dr at distance r moves with \\(v = \\omega r\\): \\(d\\varepsilon = Bv\\,dr = B\\omega r\\,dr\\).",
        "\\(\\varepsilon = \\int_0^R B\\omega r\\,dr = \\frac{1}{2}B\\omega R^2\\).",
        "Or: area swept per second is \\(\\frac{1}{2}R^2\\omega\\), so \\(\\varepsilon = B\\cdot\\frac{1}{2}R^2\\omega\\). The number of spokes of a wheel does not matter (they are in parallel).",
      ],
    },
    {
      title: "Mutual inductance of two long coaxial solenoids",
      steps: [
        "Inner solenoid \\(S_1\\) (radius \\(r_1\\), \\(n_1\\) turns per unit length), outer \\(S_2\\) (\\(r_2\\), \\(n_2\\)), both of length l.",
        "Current \\(I_2\\) in \\(S_2\\): field inside \\(B_2 = \\mu_0 n_2 I_2\\). Flux linkage with \\(S_1\\): \\(N_1\\Phi_1 = (n_1 l)(\\pi r_1^2)(\\mu_0 n_2 I_2)\\).",
        "So \\(M_{12} = \\mu_0 n_1 n_2 \\pi r_1^2 l\\).",
        "Current \\(I_1\\) in \\(S_1\\): \\(B_1 = \\mu_0 n_1 I_1\\) only inside \\(S_1\\), so \\(N_2\\Phi_2 = (n_2 l)(\\pi r_1^2)(\\mu_0 n_1 I_1)\\) and \\(M_{21} = M_{12}\\).",
        "With a core of relative permeability \\(\\mu_r\\): \\(M = \\mu_r\\mu_0 n_1 n_2 \\pi r_1^2 l\\).",
      ],
    },
    {
      title: "Mutual inductance of two concentric coaxial circular coils (r1 much smaller than r2)",
      steps: [
        "Current \\(I_2\\) in the outer coil: field at the centre \\(B_2 = \\frac{\\mu_0 I_2}{2r_2}\\), nearly uniform over the small inner coil.",
        "Flux through the inner coil: \\(\\Phi_1 = \\pi r_1^2 \\frac{\\mu_0 I_2}{2r_2}\\).",
        "\\(M = \\frac{\\Phi_1}{I_2} = \\frac{\\mu_0\\pi r_1^2}{2r_2}\\); with \\(N_1\\), \\(N_2\\) turns multiply by \\(N_1N_2\\).",
      ],
    },
    {
      title: "Self-inductance of a long solenoid",
      steps: [
        "Solenoid of length l, area A, n turns per unit length; current I gives \\(B = \\mu_0 nI\\) inside.",
        "Flux linkage \\(N\\Phi_B = (nl)(\\mu_0 nI)(A) = \\mu_0 n^2 A l\\,I\\).",
        "\\(L = \\frac{N\\Phi_B}{I} = \\mu_0 n^2 A l\\), or \\(\\frac{\\mu_0 N^2 A}{l}\\) with N total turns; with a core, \\(L = \\mu_r\\mu_0 n^2 A l\\).",
      ],
    },
    {
      title: "Energy required to build up a current I in an inductor",
      steps: [
        "Work is done against the back emf \\(\\varepsilon = -L\\frac{dI}{dt}\\). Rate of work: \\(\\frac{dW}{dt} = |\\varepsilon| I = LI\\frac{dI}{dt}\\).",
        "\\(W = \\int_0^I LI\\,dI = \\frac{1}{2}LI^2\\), stored as magnetic energy (like \\(\\frac{1}{2}mv^2\\), L playing the part of m).",
        "Solenoid: \\(U = \\frac{1}{2}(\\mu_0 n^2 A l)\\left(\\frac{B}{\\mu_0 n}\\right)^2 = \\frac{B^2}{2\\mu_0}Al\\), so energy per unit volume is \\(\\frac{B^2}{2\\mu_0}\\).",
      ],
    },
    {
      title: "Expression for the instantaneous emf of an ac generator",
      steps: [
        "Coil of N turns, area A, rotated at constant \\(\\omega\\) in field B; angle between \\(\\vec{B}\\) and \\(\\vec{A}\\) is \\(\\theta = \\omega t\\).",
        "Flux \\(\\Phi_B = BA\\cos\\omega t\\).",
        "\\(\\varepsilon = -N\\frac{d\\Phi_B}{dt} = NBA\\omega\\sin\\omega t\\). Maximum \\(\\varepsilon_0 = NBA\\omega\\) when the plane of the coil is parallel to B (\\(\\theta = 90^\\circ\\) or \\(270^\\circ\\)).",
        "With \\(\\omega = 2\\pi\\nu\\): \\(\\varepsilon = NBA(2\\pi\\nu)\\sin(2\\pi\\nu t)\\); the polarity reverses every half turn, so the current is alternating.",
      ],
    },
    {
      title: "Show that Lenz's law follows from conservation of energy",
      steps: [
        "N-pole pushed towards a closed coil: the induced current makes the near face a N-pole, which repels the magnet.",
        "So work must be done to move the magnet; this mechanical energy appears as Joule heat from the induced current.",
        "If the current were the other way, the near face would be a S-pole, the magnet would be attracted and speed up without any work: perpetual motion, which is impossible.",
      ],
    },
    {
      title: "Prove that the induced charge depends only on the change in flux, not on the time taken",
      steps: [
        "Induced current \\(I = \\frac{|\\varepsilon|}{R} = \\frac{N}{R}\\frac{d\\Phi_B}{dt}\\).",
        "Charge \\(q = \\int I\\,dt = \\frac{N}{R}\\int d\\Phi_B = \\frac{N\\,\\Delta\\Phi_B}{R}\\): the time interval cancels.",
      ],
    },
  ],
  diagrams: [
    {
      title: "AC generator",
      labels: ["magnetic poles N and S", "coil (armature) on the rotor shaft", "slip rings", "carbon brushes", "external load", "axis of rotation perpendicular to B"],
    },
    {
      title: "Emf of a coil rotating in a field: graph against time",
      labels: ["emf \\(\\varepsilon_0\\sin\\omega t\\) on the vertical axis", "\\(\\omega t\\) from 0 to \\(2\\pi\\)", "maximum at 90° and 270°", "flux \\(BA\\cos\\omega t\\), a quarter cycle ahead"],
    },
    {
      title: "Motional emf: rod PQ on a rectangular conductor PQRS",
      labels: ["field B normal to the plane (crosses)", "rod PQ of length l, velocity v", "distance RQ = x", "direction of induced current I"],
    },
    {
      title: "Two long coaxial solenoids",
      labels: ["inner solenoid S1, radius r1, n1", "outer solenoid S2, radius r2, n2", "common length l", "currents I1 and I2"],
    },
    {
      title: "Lenz's law: magnet and coil",
      labels: ["N-pole moving towards (or away from) the coil", "induced current anticlockwise, seen from the magnet", "N-pole (or S-pole) on the coil face", "galvanometer"],
    },
  ],
  mostAsked: [
    { topic: "Faraday's law: flux through a loop, and the induced emf, current or charge when it changes (numericals)", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Lenz's law and conservation of energy; direction of the induced current (magnet and coil, falling magnet, two loops)", marks: 1, years: [2026, 2025, 2024, 2023] },
    { topic: "Mutual inductance: define it, derive it for two long coaxial solenoids or two concentric coils, or a numerical", marks: 3, years: [2026, 2025, 2024, 2023] },
    { topic: "Self-inductance of a long solenoid, energy stored in an inductor, or a numerical", years: [2026, 2025, 2024, 2023] },
    { topic: "AC generator: principle, labelled diagram, working and the expression for the instantaneous emf", years: [2026, 2025, 2024, 2023] },
    { topic: "Motional emf: a rod or loop moving in a field, or a rod rotating about one end", years: [2026, 2025, 2024, 2023] },
  ],
  mistakes: [
    {
      title: "Taking the angle from the plane of the coil",
      body: "\\(\\theta\\) in \\(BA\\cos\\theta\\) is between \\(\\vec{B}\\) and the normal. If the plane of the coil makes angle \\(\\alpha\\) with \\(\\vec{B}\\), the flux is \\(BA\\sin\\alpha\\). For a loop in the x-y plane only the z-component of \\(\\vec{B}\\) gives flux.",
    },
    {
      title: "Saying a larger flux gives a larger emf",
      body: "The emf depends on the rate of change of flux, not on the flux itself. A steady field (even the Earth's) linked with a loop induces nothing.",
    },
    {
      title: "Falling magnet: forgetting the cut",
      body: "Through a closed ring or a metal tube, the induced current opposes the fall, so the acceleration is less than g. A ring with a cut carries no current, so the magnet falls with acceleration g.",
    },
    {
      title: "Writing \\(B\\omega R^2\\) for a rotating rod",
      body: "The emf is \\(\\frac{1}{2}B\\omega R^2\\). Convert rpm or rev/s to rad/s first: \\(\\omega = 2\\pi\\nu\\). The same \\(2\\pi\\) is needed in \\(\\varepsilon_0 = NBA\\omega\\) for a generator.",
    },
    {
      title: "Getting L wrong when a solenoid is cut",
      body: "\\(L = \\mu_0 n^2 A l\\): cutting a solenoid into two halves keeps n and A, so each half has \\(\\frac{L}{2}\\). With N fixed, \\(L = \\frac{\\mu_0 N^2 A}{l}\\) rises if l falls or A rises.",
    },
    {
      title: "Unit slips",
      body: "Area in m\\(^2\\) (1 cm\\(^2\\) = \\(10^{-4}\\) m\\(^2\\)), field in tesla (1 mT = \\(10^{-3}\\) T, 1 G = \\(10^{-4}\\) T), diameter halved to get the radius.",
    },
  ],
};

export default sheet;
