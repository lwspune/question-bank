import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 12 Electromagnetic Induction. Statements checked
 * against the Balbharati text; most-asked years from the 34 board past-paper
 * questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Electromagnetic Induction",
  chapterSlug: "electromagnetic-induction",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 12",
  keyPoints: [
    {
      term: "Faraday's first law",
      text: "Whenever there is a change of magnetic flux in a closed circuit, an induced emf is produced in the circuit. Also, if a conductor cuts the lines of magnetic field, an emf is induced between its ends. It is a qualitative law.",
    },
    {
      term: "Faraday's second law",
      text: "The magnitude of induced emf produced in the circuit is directly proportional to the rate of change of magnetic flux linked with the circuit: \\(e = -\\frac{d\\Phi}{dt}\\). It is a quantitative law. Called the **flux rule**.",
    },
    {
      term: "Lenz's law",
      text: "The direction of induced current in a circuit is such that the magnetic field produced by the induced current opposes the change in the magnetic flux that induces the current. The negative sign in \\(e = -\\frac{d\\Phi}{dt}\\) puts Lenz's law into Faraday's law.",
    },
    {
      term: "Lenz's law and energy",
      text: "Lenz's law follows from the conservation of energy. If the induced current helped the change causing it, the current would grow without limit and give joule heating at no cost (a perpetual motion machine).",
    },
    {
      term: "Motional emf",
      text: "A conductor of length \\(l\\) moving with velocity \\(v\\) perpendicular to \\(B\\) has an emf \\(e = Blv\\) between its ends. The Lorentz force \\(q(\\vec{v} \\times \\vec{B})\\) on its charges does the work.",
    },
    {
      term: "Eddy currents",
      text: "Currents induced in a solid conductor moving relative to a magnetic field; the electrons swirl about within the plate as if caught in an eddy of water. They turn mechanical energy into heat (a swinging plate stops quickly) and are reduced by a discontinuous structure of the plate (slots).",
    },
    {
      term: "Self-inductance",
      text: "The ratio of the magnetic flux linked with a circuit to the current flowing in it, \\(L = \\frac{N\\Phi}{i}\\). Equally, the induced emf per unit rate of change of current: \\(e = -L\\frac{di}{dt}\\). SI unit henry (H).",
    },
    {
      term: "Electrical inertia",
      text: "Self-inductance plays the same role in a circuit as mass plays in mechanics: it opposes any change of current, just as mass opposes change of velocity.",
    },
    {
      term: "Mutual inductance",
      text: "The magnetic flux linked with the secondary circuit per unit current of the primary: \\(M = \\frac{\\Phi_s}{I_p}\\). Equally, the emf induced in the secondary per unit rate of change of current in the primary, \\(e_s = -M\\frac{dI_p}{dt}\\). \\(M_{12} = M_{21}\\).",
    },
    {
      term: "One henry",
      text: "If a current changing at 1 A/s in the primary induces 1 V in the secondary, the mutual inductance is 1 H. \\(1\\ \\text{H} = 1\\ \\text{V s/A} = 1\\ \\Omega\\,\\text{s}\\).",
    },
    {
      term: "Coefficient of coupling",
      text: "\\(K\\) is a measure of the portion of flux from coil 1 that reaches coil 2: \\(M = K\\sqrt{L_1 L_2}\\), with \\(K \\le 1\\). \\(K > 0.5\\): tightly coupled; \\(K < 0.5\\): loosely coupled. Largest when the coil axes are parallel and in line.",
    },
    {
      term: "Inductances in series or parallel",
      text: "Series: \\(L = L_1 + L_2 + \\dots\\). Parallel: \\(\\frac{1}{L} = \\frac{1}{L_1} + \\frac{1}{L_2} + \\dots\\), so the parallel total is less than the smallest inductance.",
    },
    {
      term: "Transformer",
      text: "A device used for changing the voltage of alternating current from low value to high value or vice versa. It works on mutual induction: primary and secondary coils, insulated from each other, wound on a soft iron core.",
    },
    {
      term: "Step-up and step-down",
      text: "Step-up: \\(N_s > N_p\\), so \\(e_s > e_p\\) and \\(i_s < i_p\\). Step-down: \\(N_s < N_p\\), so \\(e_s < e_p\\) and \\(i_s > i_p\\). In an ideal transformer, input power equals output power.",
    },
  ],
  formulas: [
    { label: "Magnetic flux", latex: "\\Phi = \\vec{B}\\cdot\\vec{A} = BA\\cos\\theta" },
    { label: "Faraday's law (N turns)", latex: "e = -N\\frac{d\\Phi}{dt}" },
    { label: "Motional emf", latex: "e = Blv \\qquad e = Blv\\sin\\theta" },
    { label: "Rotating bar", latex: "e = \\frac{1}{2}B\\omega l^2" },
    { label: "AC generator", latex: "e = NBA\\omega\\sin\\omega t = e_0\\sin 2\\pi f t" },
    { label: "Self-inductance", latex: "N\\Phi = Li \\qquad e = -L\\frac{di}{dt}" },
    { label: "Inductance of a long solenoid", latex: "L = \\mu_0 n^2 A l = \\frac{\\mu_0 N^2 A}{l}" },
    { label: "Energy stored in an inductor", latex: "U_B = \\frac{1}{2}LI^2 \\qquad u_B = \\frac{B^2}{2\\mu_0}" },
    { label: "Mutual inductance", latex: "\\Phi_s = MI_p \\qquad e_s = -M\\frac{dI_p}{dt}" },
    { label: "Coefficient of coupling", latex: "M = K\\sqrt{L_1 L_2}" },
    { label: "Inductances combined", latex: "L_{series} = L_1 + L_2 \\qquad \\frac{1}{L_{parallel}} = \\frac{1}{L_1} + \\frac{1}{L_2}" },
    { label: "Transformer", latex: "\\frac{e_s}{e_p} = \\frac{N_s}{N_p} = \\frac{i_p}{i_s}" },
  ],
  derivations: [
    {
      title: "Derive the emf induced in a conductor of length l moving with velocity v in a uniform field B",
      steps: [
        "Wire BC of length \\(l\\) slides on a C-shaped frame ABCD in a field \\(B\\) perpendicular to the frame; the area of the loop is \\(lx\\).",
        "Flux \\(\\Phi = Blx\\), so \\(|e| = \\frac{d\\Phi}{dt} = Bl\\frac{dx}{dt} = Blv\\).",
        "Check by force: a charge \\(q\\) in the wire feels \\(F = q(\\vec{v} \\times \\vec{B})\\) along the wire; work over length \\(l\\) is \\(W = qvBl\\sin\\theta\\).",
        "emf = work per charge \\(= Blv\\sin\\theta\\); maximum \\(e = Blv\\) when \\(\\theta = 90^\\circ\\), the same as the flux rule.",
      ],
    },
    {
      title: "Obtain an expression for the emf induced in a bar rotating about one end in a uniform field perpendicular to its plane of rotation",
      steps: [
        "Take a small segment \\(dr\\) at distance \\(r\\) from the pivot; its speed is \\(v = \\omega r\\).",
        "Its emf, like a sliding bar: \\(de = Bv\\,dr = B\\omega r\\,dr\\). The segments are in series, so the emfs add.",
        "\\(e = \\int_0^l B\\omega r\\,dr = B\\omega\\frac{l^2}{2}\\).",
        "Hence \\(e = \\frac{1}{2}B\\omega l^2\\).",
      ],
    },
    {
      title: "Derive an expression for the energy stored in the magnetic field of an inductor",
      steps: [
        "While the current grows, the induced emf \\(e = L\\frac{di}{dt}\\) opposes it.",
        "Work to move charge \\(dq\\) against it: \\(dw = e\\,dq = L\\frac{di}{dt}dq = Li\\,di\\), since \\(\\frac{dq}{dt} = i\\).",
        "Total work to build the current from 0 to \\(I\\): \\(W = \\int_0^I Li\\,di = \\frac{1}{2}LI^2\\).",
        "This work is stored as \\(U_B = \\frac{1}{2}LI^2\\), like \\(U_E = \\frac{1}{2}CV^2\\) of a capacitor.",
      ],
    },
    {
      title: "Explain the construction and working of a transformer, and derive the transformer equation",
      steps: [
        "Construction: primary (input) and secondary (output) coils, insulated from each other, wound on a soft iron core.",
        "AC in the primary changes the flux \\(\\Phi\\) per turn in the core; the same changing flux links both coils.",
        "\\(e_p = -N_p\\frac{d\\Phi}{dt}\\) and \\(e_s = -N_s\\frac{d\\Phi}{dt}\\), so \\(\\frac{e_s}{e_p} = \\frac{N_s}{N_p}\\) (turn ratio).",
        "Ideal transformer: \\(e_p i_p = e_s i_s\\), so \\(\\frac{e_s}{e_p} = \\frac{N_s}{N_p} = \\frac{i_p}{i_s}\\).",
      ],
    },
    {
      title: "Obtain the emf induced in a coil rotating in a uniform magnetic field (AC generator)",
      steps: [
        "A coil of \\(N\\) turns and area \\(A\\) rotates with angular velocity \\(\\omega\\); the angle between \\(B\\) and \\(A\\) is \\(\\theta = \\omega t\\).",
        "Flux \\(\\Phi = BA\\cos\\omega t\\).",
        "\\(e = -N\\frac{d\\Phi}{dt} = NBA\\omega\\sin\\omega t = e_0\\sin\\omega t\\), with \\(e_0 = NBA\\omega\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Transformer", labels: ["soft iron core", "primary coil Np (input, AC)", "secondary coil Ns (output)", "flux in the core"] },
    { title: "Conductor sliding on a frame in a magnetic field", labels: ["frame ABCD", "sliding wire BC of length l", "velocity v along x", "field B", "width x"] },
    { title: "Bar rotating about one end", labels: ["pivot", "length l", "segment dr at distance r", "field B perpendicular to the plane", "angular velocity ω"] },
    { title: "Lenz's law: magnet moving towards a loop", labels: ["north pole approaching", "induced current direction", "north pole of the loop facing the magnet"] },
    { title: "Mutual inductance of two coils", labels: ["coil 1 with current I1", "coil 2", "flux from coil 1 linking coil 2"] },
  ],
  mostAsked: [
    { topic: "Self and mutual inductance: define them (and the henry), or a numerical on \\(e = M\\frac{dI}{dt}\\) or \\(M = K\\sqrt{L_1L_2}\\)", years: [2026, 2025, 2024, 2022, 2017, 2016] },
    { topic: "Transformer: principle, construction, working and equation; step-up and step-down", years: [2026, 2025, 2024, 2020, 2016] },
    { topic: "Faraday's laws and Lenz's law, or a numerical on flux and induced emf", years: [2025, 2024, 2023, 2020, 2017] },
    { topic: "Motional emf in a moving conductor: derive \\(e = Blv\\) or a numerical", years: [2024, 2023, 2022, 2018] },
    { topic: "Emf induced in a bar rotating about one end", years: [2026, 2025] },
    { topic: "Energy stored in the magnetic field of an inductor", years: [2026, 2023] },
    { topic: "Eddy currents: what they are and their uses", years: [2026, 2024] },
    { topic: "Inductances in series or parallel", years: [2023, 2022] },
  ],
  mistakes: [
    {
      title: "Forgetting the number of turns",
      body: "For a coil, \\(e = -N\\frac{d\\Phi}{dt}\\). Multiply by \\(N\\), and convert area from cm² to m² (\\(1\\ \\text{cm}^2 = 10^{-4}\\ \\text{m}^2\\)).",
    },
    {
      title: "Using \\(e = Blv\\) with \\(v = \\omega l\\) for a rotating bar",
      body: "Different points of the bar move at different speeds. Integrate: \\(e = \\frac{1}{2}B\\omega l^2\\), which uses the average speed \\(\\frac{\\omega l}{2}\\).",
    },
    {
      title: "Misreading the negative sign",
      body: "The minus sign in \\(e = -\\frac{d\\Phi}{dt}\\) is Lenz's law: the emf opposes the change of flux. In a numerical, give the magnitude and state the direction separately.",
    },
    {
      title: "Adding inductances in parallel",
      body: "In parallel the reciprocals add, so the total is less than either coil. Add directly only in series.",
    },
    {
      title: "Thinking a step-up transformer gives more power",
      body: "It raises voltage but lowers current in the same ratio; output power at most equals input power. A transformer works only on AC, never on steady DC.",
    },
  ],
};

export default sheet;
