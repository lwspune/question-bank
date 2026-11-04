import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 2 Electrostatic Potential and Capacitance. Statements
 * checked against the NCERT text (definitions are the book's own wording);
 * most-asked years from the CBSE board past-paper questions in the bank,
 * 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Electrostatic Potential and Capacitance",
  chapterSlug: "electrostatic-potential-and-capacitance",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 2",
  keyPoints: [
    {
      term: "Electrostatic potential",
      text: "The potential V at a point is the work done in bringing a **unit positive charge** (without acceleration) from infinity to that point. Scalar; SI unit volt, 1 V = 1 J C\\(^{-1}\\). Only potential differences are physically significant.",
    },
    {
      term: "Conservative field",
      text: "Electrostatic force is conservative: the work done in moving a charge from one point to another depends only on the initial and final points and is independent of the path. Round a closed path it is zero.",
    },
    {
      term: "Equipotential surface",
      text: "A surface with a constant value of potential at all points on it. No work is needed to move a test charge on it, so the field is **normal** to it at every point. Point charge: concentric spheres. Uniform field: planes normal to the field.",
    },
    {
      term: "Field and potential",
      text: "(i) The electric field is in the direction in which the potential decreases steepest. (ii) Its magnitude is the change in potential per unit displacement normal to the equipotential surface: \\(E = -\\frac{dV}{dr}\\).",
    },
    {
      term: "Potential energy of a system",
      text: "The work done by an external agency in assembling the charges at their locations, bringing them from infinity. It depends only on the final arrangement. A **negative** value means work must be done to separate the charges (an attractive, bound system).",
    },
    {
      term: "Dipole in a uniform field: energy",
      text: "\\(U = -\\vec{p}\\cdot\\vec{E} = -pE\\cos\\theta\\). Minimum \\(-pE\\) at \\(\\theta = 0^\\circ\\) (stable equilibrium); maximum \\(+pE\\) at \\(\\theta = 180^\\circ\\) (unstable equilibrium).",
    },
    {
      term: "Electrostatics of conductors",
      text: "Inside a conductor the field is zero; just outside, it is normal to the surface, \\(E = \\frac{\\sigma}{\\varepsilon_0}\\). The interior has no excess charge: charges reside on the surface. Potential is constant throughout the volume and on the surface.",
    },
    {
      term: "Electrostatic shielding",
      text: "The field inside a charge-free cavity of a conductor is zero, whatever the charge and field outside. Any cavity in a conductor remains shielded from outside electric influence. It protects sensitive instruments.",
    },
    {
      term: "Polar and non-polar molecules",
      text: "Non-polar (\\(\\mathrm{O_2}\\), \\(\\mathrm{H_2}\\)): centres of positive and negative charge coincide, no permanent dipole moment. Polar (HCl, \\(\\mathrm{H_2O}\\)): the centres do not coincide, so a permanent dipole moment. In a field both kinds develop a net dipole moment.",
    },
    {
      term: "Polarisation",
      text: "The field of the charged plates induces a net dipole moment in a dielectric. This gives a field in the opposite direction, so the net field inside the dielectric, and the potential difference between the plates, are reduced.",
    },
    {
      term: "Capacitor and capacitance",
      text: "A capacitor is a system of two conductors separated by an insulator. \\(C = \\frac{Q}{V}\\) depends only on the shapes, sizes and separation of the conductors and the medium. Unit farad, 1 F = 1 C V\\(^{-1}\\).",
    },
    {
      term: "Dielectric strength",
      text: "The maximum electric field a medium can withstand without breakdown of its insulation: about \\(3 \\times 10^6\\) V m\\(^{-1}\\) for air. It limits the charge a capacitor can store at a given size.",
    },
    {
      term: "Dielectric constant",
      text: "\\(K = \\frac{C}{C_0} = \\frac{\\varepsilon}{\\varepsilon_0}\\): the factor (greater than 1) by which the capacitance increases from its vacuum value when the dielectric fills the space between the plates.",
    },
    {
      term: "Combinations of capacitors",
      text: "**Series:** every capacitor carries the same charge Q; the potential differences add. **Parallel:** the same potential difference V across each; the charges add.",
    },
  ],
  formulas: [
    { label: "Potential and work", latex: "V = \\frac{W}{q} \\qquad W_{A \\to B} = q(V_B - V_A)" },
    { label: "Potential of a point charge", latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{Q}{r}" },
    { label: "Potential of a system of charges", latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1}{r_{1P}} + \\frac{q_2}{r_{2P}} + \\dots + \\frac{q_n}{r_{nP}}\\right)" },
    {
      label: "Potential of a dipole (far point)",
      latex: "V = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{\\vec{p}\\cdot\\hat{r}}{r^2} = \\frac{p\\cos\\theta}{4\\pi\\varepsilon_0 r^2}",
      symbols: [{ symbol: "θ", meaning: "angle between p and r; on the equatorial plane V = 0" }],
    },
    { label: "Field from potential", latex: "E = -\\frac{dV}{dr} \\qquad E = \\frac{V}{d}\\ (\\text{uniform field})" },
    { label: "Potential energy of two charges", latex: "U = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q_1 q_2}{r_{12}}" },
    { label: "Potential energy of three charges", latex: "U = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1 q_2}{r_{12}} + \\frac{q_1 q_3}{r_{13}} + \\frac{q_2 q_3}{r_{23}}\\right)" },
    {
      label: "Two charges in an external field",
      latex: "U = q_1 V(\\vec{r}_1) + q_2 V(\\vec{r}_2) + \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q_1 q_2}{r_{12}}",
    },
    {
      label: "Dipole in a uniform field",
      latex: "U(\\theta) = -\\vec{p}\\cdot\\vec{E} = -pE\\cos\\theta \\qquad W = pE(\\cos\\theta_0 - \\cos\\theta_1)",
    },
    { label: "Field just outside a conductor", latex: "\\vec{E} = \\frac{\\sigma}{\\varepsilon_0}\\,\\hat{n}" },
    { label: "Capacitance", latex: "C = \\frac{Q}{V} \\qquad C = \\frac{\\varepsilon_0 A}{d}\\ (\\text{parallel plates, air})" },
    { label: "Full dielectric slab", latex: "C = \\frac{K\\varepsilon_0 A}{d} = KC_0" },
    {
      label: "Slab of thickness t (t less than d)",
      latex: "C = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{K}}",
      symbols: [{ symbol: "t", meaning: "thickness of the slab; a metal sheet acts as K infinite" }],
    },
    { label: "Series and parallel", latex: "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots \\qquad C_p = C_1 + C_2 + \\dots" },
    { label: "Energy stored", latex: "U = \\frac{Q^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}QV" },
    { label: "Energy density", latex: "u = \\frac{1}{2}\\varepsilon_0 E^2" },
    {
      label: "Sharing charge between two capacitors",
      latex: "V = \\frac{C_1 V_1 + C_2 V_2}{C_1 + C_2} \\qquad \\Delta U = \\frac{C_1 C_2 (V_1 - V_2)^2}{2(C_1 + C_2)}",
      symbols: [{ symbol: "ΔU", meaning: "energy lost as heat when they are joined" }],
    },
  ],
  derivations: [
    {
      title: "Obtain the potential due to a point charge at a distance r",
      steps: [
        "Bring a unit positive charge from infinity to P against the field of Q along the radius.",
        "Work done \\(= -\\int_{\\infty}^{r} \\frac{Q}{4\\pi\\varepsilon_0 r'^2}\\,dr' = \\frac{Q}{4\\pi\\varepsilon_0 r}\\).",
        "So \\(V(r) = \\frac{Q}{4\\pi\\varepsilon_0 r}\\), taking V = 0 at infinity; V varies as \\(\\frac{1}{r}\\), the field as \\(\\frac{1}{r^2}\\).",
      ],
    },
    {
      title: "Derive the potential due to an electric dipole at a far point (axis and equatorial plane)",
      steps: [
        "Charges q at distance \\(r_1\\) and \\(-q\\) at \\(r_2\\) from P; by superposition \\(V = \\frac{q}{4\\pi\\varepsilon_0}\\left(\\frac{1}{r_1} - \\frac{1}{r_2}\\right)\\).",
        "\\(r_{1,2}^2 = r^2 + a^2 \\mp 2ar\\cos\\theta\\). For \\(r \\gg a\\): \\(\\frac{1}{r_1} \\approx \\frac{1}{r}\\left(1 + \\frac{a\\cos\\theta}{r}\\right)\\), \\(\\frac{1}{r_2} \\approx \\frac{1}{r}\\left(1 - \\frac{a\\cos\\theta}{r}\\right)\\).",
        "So \\(V = \\frac{q \\cdot 2a\\cos\\theta}{4\\pi\\varepsilon_0 r^2} = \\frac{p\\cos\\theta}{4\\pi\\varepsilon_0 r^2} = \\frac{\\vec{p}\\cdot\\hat{r}}{4\\pi\\varepsilon_0 r^2}\\).",
        "Axis (\\(\\theta = 0\\) or \\(\\pi\\)): \\(V = \\pm\\frac{p}{4\\pi\\varepsilon_0 r^2}\\). Equatorial plane (\\(\\theta = \\frac{\\pi}{2}\\)): V = 0. Falls as \\(\\frac{1}{r^2}\\).",
      ],
    },
    {
      title: "Obtain the potential energy of a system of two (or three) point charges",
      steps: [
        "Bring \\(q_1\\) from infinity to \\(r_1\\): no field yet, so no work.",
        "Bring \\(q_2\\) to \\(r_2\\) in the field of \\(q_1\\): work \\(= q_2 \\times \\frac{q_1}{4\\pi\\varepsilon_0 r_{12}}\\). This is U for two charges.",
        "For a third charge, add the work in the field of \\(q_1\\) and \\(q_2\\): \\(U = \\frac{1}{4\\pi\\varepsilon_0}\\left(\\frac{q_1 q_2}{r_{12}} + \\frac{q_1 q_3}{r_{13}} + \\frac{q_2 q_3}{r_{23}}\\right)\\).",
        "The work does not depend on how the charges are assembled, only on the final arrangement.",
      ],
    },
    {
      title: "Derive the potential energy of an electric dipole in a uniform electric field",
      steps: [
        "In a uniform field the dipole has no net force but a torque \\(\\tau = pE\\sin\\theta\\).",
        "An external torque rotates it slowly from \\(\\theta_0\\) to \\(\\theta_1\\): work \\(W = \\int_{\\theta_0}^{\\theta_1} pE\\sin\\theta\\,d\\theta = pE(\\cos\\theta_0 - \\cos\\theta_1)\\).",
        "This work is stored as potential energy. Taking \\(U = 0\\) at \\(\\theta_0 = 90^\\circ\\): \\(U(\\theta) = -pE\\cos\\theta = -\\vec{p}\\cdot\\vec{E}\\).",
        "Minimum (stable) at \\(\\theta = 0^\\circ\\), maximum (unstable) at \\(\\theta = 180^\\circ\\).",
      ],
    },
    {
      title: "Derive the capacitance of a parallel plate capacitor (air between the plates)",
      steps: [
        "Plates of area A, separation d, charges \\(\\pm Q\\); surface charge density \\(\\sigma = \\frac{Q}{A}\\).",
        "Between the plates the fields of the two sheets add: \\(E = \\frac{\\sigma}{2\\varepsilon_0} + \\frac{\\sigma}{2\\varepsilon_0} = \\frac{\\sigma}{\\varepsilon_0}\\); outside they cancel.",
        "\\(V = Ed = \\frac{Qd}{\\varepsilon_0 A}\\).",
        "\\(C = \\frac{Q}{V} = \\frac{\\varepsilon_0 A}{d}\\): depends only on the geometry.",
      ],
    },
    {
      title: "Obtain the capacitance of a parallel plate capacitor with a dielectric slab (full or of thickness t)",
      steps: [
        "Polarisation puts charges \\(\\pm\\sigma_p\\) on the slab's faces; the field inside the dielectric falls to \\(\\frac{E_0}{K}\\), where \\(E_0 = \\frac{\\sigma}{\\varepsilon_0}\\).",
        "Full slab: \\(V = \\frac{E_0 d}{K} = \\frac{Qd}{K\\varepsilon_0 A}\\), so \\(C = \\frac{K\\varepsilon_0 A}{d} = KC_0\\).",
        "Slab of thickness t: \\(V = E_0(d - t) + \\frac{E_0 t}{K}\\).",
        "So \\(C = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{K}}\\); it is \\(KC_0\\) when t = d.",
      ],
    },
    {
      title: "Derive the equivalent capacitance of capacitors in series and in parallel",
      steps: [
        "Series: each capacitor carries the same charge Q; \\(V = V_1 + V_2 + \\dots = \\frac{Q}{C_1} + \\frac{Q}{C_2} + \\dots\\)",
        "Since \\(V = \\frac{Q}{C}\\): \\(\\frac{1}{C} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots\\)",
        "Parallel: the same V across each; \\(Q = Q_1 + Q_2 + \\dots = C_1 V + C_2 V + \\dots\\)",
        "Since \\(Q = CV\\): \\(C = C_1 + C_2 + \\dots\\)",
      ],
    },
    {
      title: "Obtain the energy stored in a capacitor and the energy density of an electric field",
      steps: [
        "At a stage the charge is \\(Q'\\) and the potential difference \\(\\frac{Q'}{C}\\); moving \\(dQ'\\) more needs work \\(dW = \\frac{Q'}{C}\\,dQ'\\).",
        "\\(W = \\int_0^Q \\frac{Q'}{C}\\,dQ' = \\frac{Q^2}{2C}\\), stored as energy: \\(U = \\frac{Q^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}QV\\).",
        "Parallel plates: \\(U = \\frac{1}{2}\\,\\frac{\\varepsilon_0 A}{d}(Ed)^2 = \\left(\\frac{1}{2}\\varepsilon_0 E^2\\right)Ad\\).",
        "Ad is the volume between the plates, so the energy density is \\(u = \\frac{1}{2}\\varepsilon_0 E^2\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Equipotential surfaces with field lines", labels: ["point charge: concentric spheres", "uniform field: planes normal to E", "dipole", "two identical positive charges", "field lines normal to the surfaces"] },
    { title: "Potential due to a dipole", labels: ["charges -q and q, 2a apart", "point P at distance r", "angle θ between p and r", "distances r1 and r2"] },
    { title: "Potential energy of a dipole in a uniform field", labels: ["uniform field E", "dipole p at angle θ", "forces qE and -qE"] },
    { title: "Parallel plate capacitor", labels: ["plates of area A", "separation d", "charges +Q and -Q (σ and -σ)", "uniform field E between the plates"] },
    { title: "Capacitors in series and in parallel", labels: ["C1, C2 in series with the same Q", "p.d.s V1 and V2", "C1, C2 in parallel with the same V", "charges Q1 and Q2"] },
  ],
  mostAsked: [
    {
      topic: "Field and potential between charged plates or in a given field: potential difference, work done, field from V",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Capacitors in series and parallel, energy stored, and charge sharing between two capacitors",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Parallel plate capacitor with a dielectric slab (full or partial) or a metal sheet: derivation or a numerical",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Potential and potential energy of a system of point charges, including in an external field",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Conductors: connected spheres, charge on a shell or a cavity, field and potential inside",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Effect of a dielectric slab or a change in plate separation on C, V, E and energy, battery connected or not",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Equipotential surfaces: draw them for given charges or a field, and why E is normal to them",
      marks: 3,
      years: [2026, 2025, 2024],
    },
    {
      topic: "Electric dipole: potential at a far point, or potential energy in a uniform field",
      marks: 5,
      years: [2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Not asking whether the battery is still connected",
      body: "Battery **connected**: V stays fixed. A slab makes C, Q and U grow K times; E is unchanged. Battery **disconnected**: Q stays fixed. A slab makes C grow K times, while V, E and \\(U = \\frac{Q^2}{2C}\\) fall K times.",
    },
    {
      title: "Adding potentials as vectors",
      body: "Potential is a scalar: add \\(\\frac{q}{4\\pi\\varepsilon_0 r}\\) with the sign of each charge. The field is a vector. A point where V = 0 need not have E = 0 (the equatorial plane of a dipole).",
    },
    {
      title: "Dropping signs in potential energy",
      body: "Put the sign of every charge into \\(\\frac{q_1 q_2}{4\\pi\\varepsilon_0 r}\\) and count every **pair** once. A negative total means the system is bound; the work to dissociate it is \\(-U\\).",
    },
    {
      title: "Saying V = 0 inside a charged shell",
      body: "Inside a charged conducting shell E = 0, but V is constant and equal to its surface value \\(\\frac{q}{4\\pi\\varepsilon_0 R}\\), not zero.",
    },
    {
      title: "Using resistor rules for capacitors",
      body: "Capacitors in **series** add as reciprocals and share the same charge; in **parallel** they add directly. It is the reverse of resistors.",
    },
    {
      title: "Wrong ratio for connected spheres",
      body: "Joined by a wire, two spheres reach the same potential: \\(\\frac{q_1}{r_1} = \\frac{q_2}{r_2}\\). So \\(\\frac{\\sigma_1}{\\sigma_2} = \\frac{r_2}{r_1}\\) and the smaller sphere has the larger surface field.",
    },
  ],
};

export default sheet;
