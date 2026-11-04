import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 5 Magnetism and Matter. Statements checked against the
 * NCERT text (definitions are the book's own wording); most-asked years from
 * the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Magnetism and Matter",
  chapterSlug: "magnetism-and-matter",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 5",
  keyPoints: [
    {
      term: "Magnetic poles",
      text: "A freely suspended magnet points roughly north-south; like poles repel, unlike poles attract. Isolated magnetic poles (monopoles) do not exist: cutting a bar magnet in two gives two smaller magnets, each with a north and a south pole.",
    },
    {
      term: "Magnetic field lines",
      text: "(i) They form continuous **closed loops**. (ii) The tangent at a point gives the direction of \\(\\vec{B}\\). (iii) The more lines per unit area, the stronger B. (iv) They never intersect. They are not lines of force on a moving charge.",
    },
    {
      term: "Bar magnet as an equivalent solenoid",
      text: "The field lines of a bar magnet and of a current-carrying solenoid are alike; at large distances the axial field of a solenoid resembles that of a bar magnet. A bar magnet can be thought of as many circulating currents.",
    },
    {
      term: "Magnetic dipole in a uniform field",
      text: "Net force zero; torque \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\); potential energy \\(U = -\\vec{m}\\cdot\\vec{B}\\). Minimum \\(-mB\\) at \\(0^\\circ\\) (most stable), maximum \\(+mB\\) at \\(180^\\circ\\) (most unstable). In a non-uniform field (an iron nail near a magnet) there is a force as well.",
    },
    {
      term: "Gauss's law for magnetism",
      text: "The net magnetic flux through any closed surface is zero: as many field lines enter as leave. It reflects the fact that isolated magnetic poles do not exist; the simplest magnetic element is a dipole or current loop.",
    },
    {
      term: "Magnetisation",
      text: "M is the net magnetic moment per unit volume of a sample, \\(\\vec{M} = \\frac{\\vec{m}_{net}}{V}\\). A vector; unit A m\\(^{-1}\\).",
    },
    {
      term: "Magnetic intensity",
      text: "\\(\\vec{H} = \\frac{\\vec{B}}{\\mu_0} - \\vec{M}\\), unit A m\\(^{-1}\\). The field in a material is \\(\\vec{B} = \\mu_0(\\vec{H} + \\vec{M})\\): H is set by the external currents, M by the material.",
    },
    {
      term: "Susceptibility and permeability",
      text: "For a linear material \\(\\vec{M} = \\chi\\vec{H}\\), with \\(\\chi\\) the magnetic susceptibility (no unit). Relative permeability \\(\\mu_r = 1 + \\chi\\); permeability \\(\\mu = \\mu_0\\mu_r\\) and \\(\\vec{B} = \\mu\\vec{H}\\).",
    },
    {
      term: "Diamagnetism",
      text: "Diamagnetic substances tend to move from the stronger to the weaker part of a field: a magnet repels them. Field lines are expelled and the field inside is reduced slightly. Their atoms have zero resultant magnetic moment. \\(-1 \\le \\chi < 0\\), \\(0 \\le \\mu_r < 1\\).",
    },
    {
      term: "Diamagnetic and paramagnetic examples",
      text: "**Diamagnetic:** bismuth, copper, lead, silicon, nitrogen, water, sodium chloride. **Paramagnetic:** aluminium, sodium, calcium, oxygen, copper chloride. **Ferromagnetic:** iron, cobalt, nickel, gadolinium.",
    },
    {
      term: "Paramagnetism",
      text: "Paramagnetic substances get weakly magnetised and move from weak to strong field (weakly attracted). Each atom has a permanent dipole moment, but thermal motion keeps them random. \\(0 < \\chi < \\varepsilon\\) (small, positive) and depends on temperature.",
    },
    {
      term: "Ferromagnetism and domains",
      text: "Ferromagnetic substances get strongly magnetised and are strongly attracted. Atomic dipoles align spontaneously over regions called **domains**; an applied field grows the aligned domains and rotates the rest. \\(\\chi \\gg 1\\), \\(\\mu_r \\gg 1\\); field lines crowd inside.",
    },
    {
      term: "Effect of temperature",
      text: "At high enough temperature a ferromagnet becomes a paramagnet: the domain structure breaks up, and this loss of magnetisation is **gradual**. A superconductor is a perfect diamagnet (\\(\\chi = -1\\)): the Meissner effect.",
    },
    {
      term: "Hard and soft ferromagnets",
      text: "Hard (alnico, lodestone): magnetisation persists after the field is removed, so they make permanent magnets. Soft (soft iron): magnetisation disappears when the field is removed.",
    },
  ],
  formulas: [
    { label: "Field of a bar magnet on its axis", latex: "B = \\frac{\\mu_0}{4\\pi}\\,\\frac{2m}{r^3} \\quad (r \\gg l)" },
    { label: "Field of a bar magnet on its equator", latex: "B = -\\frac{\\mu_0}{4\\pi}\\,\\frac{m}{r^3} \\quad (\\text{opposite to } \\vec{m})" },
    { label: "Electric to magnetic dipole", latex: "\\vec{E} \\to \\vec{B}, \\quad \\vec{p} \\to \\vec{m}, \\quad \\frac{1}{4\\pi\\varepsilon_0} \\to \\frac{\\mu_0}{4\\pi}" },
    { label: "Torque on a magnetic dipole", latex: "\\vec{\\tau} = \\vec{m} \\times \\vec{B}, \\qquad \\tau = mB\\sin\\theta" },
    {
      label: "Potential energy and work",
      latex: "U = -\\vec{m}\\cdot\\vec{B} = -mB\\cos\\theta \\qquad W_{\\theta_1 \\to \\theta_2} = mB(\\cos\\theta_1 - \\cos\\theta_2)",
    },
    { label: "Magnetic moment of a solenoid", latex: "m = NIA" },
    { label: "Gauss's law for magnetism", latex: "\\phi_B = \\sum \\vec{B}\\cdot\\Delta\\vec{S} = 0" },
    { label: "Magnetisation", latex: "\\vec{M} = \\frac{\\vec{m}_{net}}{V}" },
    { label: "Field in a material", latex: "\\vec{B} = \\mu_0(\\vec{H} + \\vec{M}) \\qquad H = nI \\ (\\text{solenoid})" },
    {
      label: "Susceptibility and permeability",
      latex: "\\vec{M} = \\chi\\vec{H} \\qquad \\mu_r = 1 + \\chi \\qquad \\mu = \\mu_0\\mu_r \\qquad \\vec{B} = \\mu\\vec{H}",
    },
    {
      label: "Ranges for the three classes",
      latex: "\\text{dia: } -1 \\le \\chi < 0 \\qquad \\text{para: } 0 < \\chi \\ll 1 \\qquad \\text{ferro: } \\chi \\gg 1",
    },
  ],
  derivations: [
    {
      title: "Obtain the torque and potential energy of a magnetic dipole in a uniform magnetic field",
      steps: [
        "A needle of moment \\(\\vec{m}\\) at angle \\(\\theta\\) to \\(\\vec{B}\\): torque \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\), magnitude \\(mB\\sin\\theta\\); net force zero.",
        "Work to turn it: \\(U = \\int \\tau\\,d\\theta = \\int mB\\sin\\theta\\,d\\theta = -mB\\cos\\theta\\).",
        "Zero of energy at \\(\\theta = 90^\\circ\\): \\(U = -\\vec{m}\\cdot\\vec{B}\\).",
        "Minimum \\(-mB\\) at \\(0^\\circ\\) (stable), maximum \\(+mB\\) at \\(180^\\circ\\) (unstable). Turning from aligned to opposite needs \\(2mB\\).",
      ],
    },
    {
      title: "Explain ferromagnetism using magnetic domains",
      steps: [
        "Atoms of a ferromagnet carry dipole moments that interact and align spontaneously over a macroscopic volume called a domain.",
        "Unmagnetised: domains point randomly, so the net moment is zero.",
        "In a field the domains aligned with B grow and the others rotate towards B, giving a large magnetisation; field lines crowd into the sample.",
        "Hard ferromagnets keep this alignment when the field is removed; heating breaks up the domains and the substance becomes paramagnetic.",
      ],
    },
    {
      title: "Compare the behaviour of diamagnetic and paramagnetic substances in an external field",
      steps: [
        "Diamagnetic: no net atomic moment; a field induces a moment opposite to it, so lines are pushed out and the sample moves to the weaker field.",
        "Paramagnetic: atoms have permanent moments; a field partly aligns them, so lines are drawn in a little and the sample moves to the stronger field.",
        "Paramagnetic \\(\\chi\\) rises as temperature falls; diamagnetism is present in all substances but is very weak.",
      ],
    },
  ],
  diagrams: [
    { title: "Field lines of a bar magnet and a solenoid", labels: ["closed loops from N to S outside", "S to N inside the magnet", "solenoid with current direction", "Gaussian surfaces i and ii"] },
    { title: "Magnetic needle in a uniform field", labels: ["uniform field B", "needle with moment m", "angle θ between m and B", "restoring torque"] },
    { title: "Field lines near diamagnetic and paramagnetic substances", labels: ["diamagnetic: lines pushed out", "paramagnetic: lines drawn in", "uniform external field"] },
    { title: "Magnetic domains", labels: ["randomly oriented domains", "aligned domains in a field", "direction of B"] },
  ],
  mostAsked: [
    {
      topic: "Classify a material as diamagnetic, paramagnetic or ferromagnetic from its susceptibility or permeability",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Behaviour of the three classes in a field: field lines, attraction or repulsion, domains, effect of temperature",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Bar magnet in a uniform field: torque, potential energy, work done in turning it",
      years: [2025, 2024],
    },
    {
      topic: "Field of a magnetic dipole, field lines and Gauss's law for magnetism",
      marks: 2,
      years: [2025, 2023],
    },
  ],
  mistakes: [
    {
      title: "Getting the examples wrong",
      body: "**Copper**, lead, bismuth, water and sodium chloride are diamagnetic; **aluminium**, sodium, calcium and copper chloride are paramagnetic. Only diamagnetic materials have \\(\\mu < \\mu_0\\).",
    },
    {
      title: "Saying a diamagnet is attracted by one pole",
      body: "A diamagnetic substance is **repelled** by both the north and the south pole; it moves towards the weaker field. Paramagnetic and ferromagnetic ones are attracted by both.",
    },
    {
      title: "Calling the ferro to para change abrupt",
      body: "The book says the disappearance of magnetisation with temperature is **gradual**. Also, not all atoms have a net magnetic moment: in diamagnetic atoms it is zero.",
    },
    {
      title: "Wrong work done in turning a magnet",
      body: "\\(W = mB(\\cos\\theta_1 - \\cos\\theta_2)\\). Aligned to normal: \\(mB\\). Aligned to opposite: \\(2mB\\). Potential energy is least when \\(\\vec{m}\\) is along \\(\\vec{B}\\).",
    },
    {
      title: "Treating field lines as lines of force",
      body: "Magnetic field lines form closed loops and do not show the force on a moving charge (that force is normal to B). If monopoles existed, Gauss's law would read \\(\\phi_B = \\mu_0 q_m\\), not zero.",
    },
  ],
};

export default sheet;
