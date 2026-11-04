import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 11 Magnetic Materials. Statements checked against the
 * Balbharati text (definitions are the book's own); most-asked years from the
 * 28 board past-paper questions in the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Magnetic Materials",
  chapterSlug: "magnetic-materials",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 11",
  keyPoints: [
    {
      term: "Bar magnet in a uniform field",
      text: "A freely suspended magnet rests along the geographic North-South direction, a property used in **navigation**. Turned away, the forces on its poles form a couple: \\(\\tau = mB\\sin\\theta\\), and it oscillates about the field.",
    },
    {
      term: "Vibration magnetometer",
      text: "Compares magnetic moments and magnetic fields, and finds the horizontal component of the Earth's field. A suspended magnet disturbed from equilibrium in a uniform field vibrates about its mean position.",
    },
    {
      term: "Orbital magnetic moment",
      text: "A revolving electron is a tiny current loop, \\(m_{orb} = IA = \\frac{evr}{2}\\). It is proportional to the angular momentum, \\(m_{orb} = \\frac{e}{2m_e}L\\), but opposite to \\(\\vec{L}\\) since the electron is negative.",
    },
    {
      term: "Gyromagnetic ratio and Bohr magneton",
      text: "\\(\\frac{e}{2m_e} = 8.8 \\times 10^{10}\\) C/kg is the gyromagnetic ratio. With \\(L = \\frac{nh}{2\\pi}\\), the moment for \\(n = 1\\) is the Bohr magneton \\(\\frac{eh}{4\\pi m_e} = 9.274 \\times 10^{-24}\\) A m².",
    },
    {
      term: "Magnetization",
      text: "The ratio of magnetic moment to the volume of the material: \\(M = \\frac{m_{net}}{V}\\). A vector; SI unit A/m; dimensions \\([L^{-1}A]\\).",
    },
    {
      term: "Magnetic intensity",
      text: "\\(H = nI\\) inside a solenoid. Unlike \\(B\\), it does not depend on the material placed inside. Same unit (A/m) and dimensions as \\(M\\); \\(B = \\mu_0(H + M)\\).",
    },
    {
      term: "Magnetic susceptibility",
      text: "\\(\\chi = \\frac{M}{H}\\): a measure of a material's response to an applied field. Dimensionless. Negative when the atomic moments oppose the field, positive when they align; large for soft iron (over 1000).",
    },
    {
      term: "Diamagnetism",
      text: "Atoms have zero net moment; the field induces an opposing moment (Lenz's law), so \\(\\chi\\) is small and **negative**. Moves from stronger to weaker field; a rod sets perpendicular to \\(B\\). Examples: copper, bismuth, water, glass.",
    },
    {
      term: "Paramagnetism",
      text: "Unpaired electrons give each atom a moment, randomly oriented by thermal agitation. In a field they partly align: \\(\\chi\\) small and **positive**. Moves from weaker to stronger field. Examples: magnesium, lithium, oxygen.",
    },
    {
      term: "Curie law",
      text: "Magnetization of a paramagnetic material is directly proportional to the applied field and inversely proportional to the absolute temperature: \\(M = C\\frac{B}{T}\\), so \\(\\chi \\propto \\frac{1}{T}\\).",
    },
    {
      term: "Ferromagnetism: domain theory",
      text: "Exchange interaction aligns neighbouring moments in small regions called **domains**. Unmagnetized: domains random. In a field they rotate into line and finally merge into a giant domain. Iron, cobalt, nickel.",
    },
    {
      term: "Curie temperature",
      text: "The temperature at which a ferromagnetic material transforms into a paramagnetic substance: heating weakens exchange coupling until the domain structure collapses. Above it, \\(\\chi = \\frac{C}{T - T_C}\\).",
    },
    {
      term: "Retentivity and coercivity",
      text: "On the hysteresis loop, the value of \\(B\\) when \\(H = 0\\) is **retentivity** (remanence); the reverse \\(H\\) that makes \\(B = 0\\) is **coercivity**. The loop's area is the energy lost per cycle.",
    },
    {
      term: "Electromagnets and magnetic shielding",
      text: "Soft iron (large permeability, little retained magnetization) makes electromagnets and transformer cores; a hard ferromagnet makes permanent magnets. A soft iron shell crowds field lines into itself: magnetic shielding.",
    },
  ],
  formulas: [
    { label: "Bar magnet in a uniform field", latex: "\\tau = mB\\sin\\theta \\qquad U_m = -mB\\cos\\theta" },
    {
      label: "Period of oscillation of a bar magnet",
      latex: "T = 2\\pi\\sqrt{\\frac{I}{mB}}",
      symbols: [{ symbol: "I", meaning: "moment of inertia of the magnet" }],
    },
    { label: "Orbital current and moment", latex: "I = \\frac{ev}{2\\pi r} \\qquad m_{orb} = \\frac{evr}{2} = \\frac{e}{2m_e}L" },
    { label: "Bohr magneton", latex: "\\mu_B = \\frac{eh}{4\\pi m_e} = 9.274 \\times 10^{-24}\\ \\text{A m}^2 \\qquad m_{orb} = n\\frac{eh}{4\\pi m_e}" },
    { label: "Magnetization of a bar magnet", latex: "M = \\frac{m}{V} = \\frac{m}{A\\,l}" },
    { label: "Field, intensity and magnetization", latex: "H = nI \\qquad B = \\mu_0(H + M) \\qquad M = \\chi H" },
    { label: "Permeability and susceptibility", latex: "\\mu = \\mu_0(1 + \\chi) \\qquad \\mu_r = 1 + \\chi" },
    { label: "Percentage increase in B with a material", latex: "\\frac{B - B_0}{B_0} \\times 100 = \\chi \\times 100" },
    { label: "Curie law and Curie-Weiss law", latex: "\\chi = \\frac{C}{T} \\qquad \\chi = \\frac{C}{T - T_C}\\ (T > T_C)" },
  ],
  derivations: [
    {
      title: "Torque and potential energy of a bar magnet in a uniform magnetic field",
      steps: [
        "The forces on the two poles are equal, opposite and along different lines: a couple, \\(\\tau = mB\\sin\\theta\\), i.e. \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\).",
        "Work to turn it from \\(90^\\circ\\) to \\(\\theta\\) is stored as potential energy: \\(U_m = \\int \\tau\\,d\\theta = -mB\\cos\\theta\\).",
        "\\(\\theta = 0^\\circ\\): \\(U = -mB\\) (stable); \\(\\theta = 180^\\circ\\): \\(U = +mB\\) (unstable); \\(\\theta = 90^\\circ\\): \\(U = 0\\).",
      ],
    },
    {
      title: "Obtain an expression for the period of a bar magnet vibrating in a uniform magnetic field",
      steps: [
        "Displaced by \\(\\theta\\), the magnet feels a restoring torque: \\(I\\frac{d^2\\theta}{dt^2} = -mB\\sin\\theta\\).",
        "For small \\(\\theta\\), \\(\\sin\\theta \\approx \\theta\\): \\(\\frac{d^2\\theta}{dt^2} = -\\frac{mB}{I}\\theta\\), which is angular S.H.M.",
        "Compare with \\(\\frac{d^2x}{dt^2} = -\\omega^2 x\\): \\(\\omega = \\sqrt{\\frac{mB}{I}}\\), so \\(T = \\frac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\frac{I}{mB}}\\).",
      ],
    },
    {
      title: "Obtain an expression for the orbital magnetic moment of an electron revolving around the nucleus",
      steps: [
        "Electron with speed \\(v\\) in an orbit of radius \\(r\\): period \\(T = \\frac{2\\pi r}{v}\\), so current \\(I = \\frac{e}{T} = \\frac{ev}{2\\pi r}\\).",
        "\\(m_{orb} = IA = \\frac{ev}{2\\pi r} \\times \\pi r^2 = \\frac{evr}{2}\\).",
        "With \\(L = m_e vr\\): \\(m_{orb} = \\frac{e}{2m_e}L\\); vectorially \\(\\vec{m}_{orb} = -\\frac{e}{2m_e}\\vec{L}\\), perpendicular to the orbit.",
      ],
    },
    {
      title: "Bohr magneton: magnetic moment of an electron in the nth orbit",
      steps: [
        "Bohr's second postulate: \\(L = \\frac{nh}{2\\pi}\\).",
        "Substitute in \\(m_{orb} = \\frac{e}{2m_e}L\\): \\(m_{orb} = n\\frac{eh}{4\\pi m_e}\\).",
        "For \\(n = 1\\), \\(\\frac{eh}{4\\pi m_e} = 9.274 \\times 10^{-24}\\) A m², the Bohr magneton: the natural unit of atomic magnetic moments.",
      ],
    },
    {
      title: "Relation between magnetic permeability and susceptibility",
      steps: [
        "A rod in a solenoid: \\(B = B_0 + B_m = \\mu_0 nI + \\mu_0 M = \\mu_0(H + M)\\), with \\(H = nI\\).",
        "For a field that is not too strong, \\(M = \\chi H\\), so \\(B = \\mu_0(1 + \\chi)H\\).",
        "Writing \\(B = \\mu H\\): \\(\\mu = \\mu_0(1 + \\chi)\\) and \\(\\mu_r = \\frac{\\mu}{\\mu_0} = 1 + \\chi\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Bar magnet in a uniform magnetic field", labels: ["field B", "poles N and S", "forces on the poles (couple)", "magnetic moment m", "angle θ"] },
    { title: "Electron revolving around the nucleus", labels: ["nucleus", "orbit of radius r", "electron velocity v", "current direction opposite to motion", "m(orb) opposite to L"] },
    { title: "Domains in a ferromagnetic material", labels: ["unmagnetised: random domain axes", "domain walls", "magnetised: aligned domains", "applied field B"] },
    { title: "Hysteresis loop (B against H)", labels: ["saturation a and d", "retentivity b and e", "coercivity c and f", "origin O, dotted first path"] },
    { title: "Diamagnetic and paramagnetic substances in a field", labels: ["diamagnetic: lines pushed out", "paramagnetic: lines crowd in", "external field B"] },
    { title: "Magnetic shielding", labels: ["soft iron shell", "uniform field lines", "lines crowded into the shell", "nearly field-free space inside"] },
  ],
  mostAsked: [
    {
      topic: "Magnetization, magnetic intensity, susceptibility and permeability: definitions, units, dimensions or a numerical",
      years: [2026, 2025, 2024, 2023, 2022, 2018],
    },
    {
      topic: "Orbital magnetic moment of a revolving electron, gyromagnetic ratio, Bohr magneton",
      years: [2026, 2025, 2023, 2020],
    },
    {
      topic: "Distinguish diamagnetic, paramagnetic and ferromagnetic substances",
      years: [2025, 2024, 2017, 2016],
    },
    { topic: "Curie law: susceptibility at another temperature (numerical)", years: [2026, 2019, 2016] },
    { topic: "Period of a bar magnet oscillating in a uniform field: derivation or a numerical", years: [2025, 2024, 2023] },
    { topic: "Ferromagnetism: domain theory, and heating above the Curie temperature", years: [2025, 2019] },
    { topic: "Hysteresis: retentivity, and why soft iron is used in a transformer core", years: [2025, 2023] },
    { topic: "Property of a bar magnet used in navigation", years: [2026] },
  ],
  mistakes: [
    {
      title: "Using Celsius in Curie's law",
      body: "\\(\\chi \\propto \\frac{1}{T}\\) with \\(T\\) in kelvin: 27°C is 300 K. So \\(\\chi\\) falls to \\(\\frac{\\chi}{3}\\) at 900 K (627°C), not at 81°C.",
    },
    {
      title: "Giving susceptibility a unit",
      body: "\\(\\chi = \\frac{M}{H}\\) is a ratio of two quantities in A/m, so it is dimensionless. Magnetization and magnetic intensity are both in A/m.",
    },
    {
      title: "Confusing retentivity and coercivity",
      body: "Retentivity is \\(B\\) left when \\(H = 0\\); coercivity is the reverse \\(H\\) needed to make \\(B = 0\\). Transformer cores need **low** values of both, which is why soft iron is used.",
    },
    {
      title: "Writing \\(\\vec{m}_{orb}\\) along \\(\\vec{L}\\)",
      body: "The electron is negative, so its orbital magnetic moment is opposite to its angular momentum: \\(\\vec{m}_{orb} = -\\frac{e}{2m_e}\\vec{L}\\).",
    },
    {
      title: "Mixing up which way materials move",
      body: "Diamagnetic (water, bismuth): from stronger to weaker field, so water is pushed away from where the field is strongest. Paramagnetic and ferromagnetic: from weaker to stronger field.",
    },
    {
      title: "Leaving units mixed in the oscillation formula",
      body: "In \\(T = 2\\pi\\sqrt{\\frac{I}{mB}}\\), convert g cm² to kg m² (\\(1\\ \\text{g cm}^2 = 10^{-7}\\ \\text{kg m}^2\\)) before solving for \\(m\\).",
    },
  ],
};

export default sheet;
