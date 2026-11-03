import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 8 Electrostatics. Statements checked against the
 * Balbharati text; most-asked years from the 34 board past-paper questions in
 * the bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Electrostatics",
  chapterSlug: "electrostatics",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 8",
  keyPoints: [
    {
      term: "Gauss' law",
      text: "The total flux coming out of a closed surface is \\(\\frac{1}{\\varepsilon_0}\\) times the total charge inside it: \\(\\phi = \\oint \\vec{E}\\cdot d\\vec{s} = \\frac{q}{\\varepsilon_0}\\). Use it for charge distributions of sufficient symmetry: sphere, long wire, plane sheet.",
    },
    {
      term: "Electric potential",
      text: "The potential at a point in an electric field is the amount of work done to bring a **unit positive charge** from infinity to that point. It is a scalar; SI unit volt (J/C).",
    },
    {
      term: "Potential gradient",
      text: "The electric field at a point is the **negative gradient** of the potential at that point: \\(E = -\\frac{dV}{dx}\\). SI unit of potential gradient: V/m (same as N/C).",
    },
    {
      term: "Zero of potential",
      text: "Its zero point is arbitrary. For a point charge or a localised collection of charges it is set at infinity; for electrical circuits the earth is taken to be at zero potential.",
    },
    {
      term: "Equipotential surface",
      text: "A surface at every point of which the electric potential is the same. No work is done in moving a charge along it, the field is always **normal** to it, and two equipotential surfaces never intersect.",
    },
    {
      term: "Conductor in electrostatics",
      text: "Net field inside is zero; potential is constant within and on the surface; the interior has no charge; the field just outside is perpendicular to the surface; surface charge density can differ from point to point.",
    },
    {
      term: "Electrostatic shielding",
      text: "Placing a delicate instrument inside a hollow conductor, where \\(E = 0\\), protects it from nearby charged bodies. That is why a car is safer than a tree during a thunderstorm.",
    },
    {
      term: "Free and bound charges",
      text: "Loosely held outer electrons of a metal move freely: **free charges**. The nucleus and inner-shell electrons stay fixed: **bound charges**. An insulator has no free charges.",
    },
    {
      term: "Polar molecule",
      text: "The centre of mass of positive charges does **not** coincide with that of negative charges (asymmetric shape), so it has a permanent dipole moment. Examples: HCl, water, alcohol, NH₃.",
    },
    {
      term: "Non-polar molecule",
      text: "The centre of mass of positive charges **coincides** with that of negative charges (symmetric shape), so the dipole moment is zero normally. Examples: H₂, N₂, O₂, CO₂, benzene, methane.",
    },
    {
      term: "Dielectric and polarization",
      text: "A dielectric is an insulator that can be polarized by a small displacement of charges in a field. The polarization field opposes the applied field, so the field inside falls: \\(E = \\frac{E_0}{k}\\). For a conductor \\(k\\) is infinite.",
    },
    {
      term: "Capacitance",
      text: "\\(C = \\frac{Q}{V}\\), depending on the size, shape and separation of the two conductors. SI unit farad: 1 F when 1 C of charge raises the potential difference by 1 V. Dimensions \\([M^{-1}L^{-2}T^4A^2]\\).",
    },
    {
      term: "Displacement current",
      text: "Caused by the displacement of bound charges in the dielectric between the plates under a changing field. It exists at any point in space where a time-varying electric field exists (\\(\\frac{dE}{dt} \\neq 0\\)).",
    },
    {
      term: "Van de Graaff generator",
      text: "Develops potentials of the order of \\(10^7\\) V. **Principle:** corona discharge (action of sharp points); charge on a hollow conductor goes to its outer surface; supplying charge continuously keeps raising its potential.",
    },
  ],
  formulas: [
    {
      label: "Charged spherical shell",
      latex: "E_{out} = \\frac{q}{4\\pi\\varepsilon_0 r^2} = \\frac{\\sigma R^2}{\\varepsilon_0 r^2} \\qquad E_{surface} = \\frac{\\sigma}{\\varepsilon_0} \\qquad E_{in} = 0",
    },
    { label: "Infinitely long charged wire", latex: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}" },
    { label: "Charged infinite plane sheet", latex: "E = \\frac{\\sigma}{2\\varepsilon_0}" },
    { label: "In a medium of dielectric constant k", latex: "\\varepsilon = \\varepsilon_0 k \\qquad \\text{replace } \\varepsilon_0 \\text{ by } \\varepsilon_0 k" },
    { label: "Potential of a point charge", latex: "V = \\frac{q}{4\\pi\\varepsilon_0 r} \\qquad W = qV" },
    {
      label: "Potential of a short dipole",
      latex: "V = \\frac{p\\cos\\theta}{4\\pi\\varepsilon_0 r^2} \\qquad V_{axis} = \\frac{p}{4\\pi\\varepsilon_0 r^2} \\qquad V_{equator} = 0",
    },
    { label: "Field and potential", latex: "E = -\\frac{dV}{dx}" },
    { label: "Potential energy of two charges", latex: "U = \\frac{q_1 q_2}{4\\pi\\varepsilon_0 r}" },
    {
      label: "Dipole in a uniform field",
      latex: "\\tau = pE\\sin\\theta \\qquad U = -pE\\cos\\theta \\qquad W = pE(\\cos\\theta_0 - \\cos\\theta)",
    },
    { label: "Capacitors in series and parallel", latex: "\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2} + \\dots \\qquad C_p = C_1 + C_2 + \\dots" },
    {
      label: "Parallel plate capacitor",
      latex: "C_0 = \\frac{\\varepsilon_0 A}{d} \\qquad C = \\frac{k\\varepsilon_0 A}{d} = kC_0 \\qquad C = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{k}}",
      symbols: [{ symbol: "t", meaning: "thickness of the dielectric slab" }],
    },
    { label: "Displacement current", latex: "i_d = \\varepsilon_0 k A \\frac{dE}{dt} \\qquad (k = 1 \\text{ for air})" },
    { label: "Energy stored in a capacitor", latex: "U = \\frac{Q^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}QV" },
  ],
  derivations: [
    {
      title: "Electric field due to a uniformly charged spherical shell (outside, on and inside)",
      steps: [
        "Draw a concentric Gaussian sphere of radius \\(r\\) through P; by symmetry \\(E\\) is radial and the same everywhere on it.",
        "Flux \\(\\phi = E \\cdot 4\\pi r^2\\); Gauss' law gives \\(\\phi = \\frac{q}{\\varepsilon_0}\\), so \\(E = \\frac{q}{4\\pi\\varepsilon_0 r^2}\\), with \\(q = \\sigma \\cdot 4\\pi R^2\\).",
        "Outside, the shell acts as a point charge at its centre. On the surface (\\(r = R\\)): \\(E = \\frac{\\sigma}{\\varepsilon_0}\\).",
        "Inside, the Gaussian sphere encloses no charge, so \\(E = 0\\).",
      ],
    },
    {
      title: "Electric field due to an infinitely long straight charged wire",
      steps: [
        "Take a coaxial Gaussian cylinder of radius \\(r\\) and length \\(l\\) through P; \\(E\\) is radial and equal on the curved surface.",
        "Flux through the flat caps is zero (\\(E\\) is along the caps); through the curved surface it is \\(E \\cdot 2\\pi r l\\).",
        "Charge enclosed is \\(\\lambda l\\), so \\(E \\cdot 2\\pi r l = \\frac{\\lambda l}{\\varepsilon_0}\\), giving \\(E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}\\).",
      ],
    },
    {
      title: "Electric field due to a charged infinite plane sheet",
      steps: [
        "Take a Gaussian cylinder of cross-section \\(A\\) and length \\(2r\\), its axis perpendicular to the sheet, with P and P' on its end caps.",
        "Flux through the curved surface is zero; through the two caps it is \\(2EA\\).",
        "Charge enclosed is \\(\\sigma A\\), so \\(2EA = \\frac{\\sigma A}{\\varepsilon_0}\\), giving \\(E = \\frac{\\sigma}{2\\varepsilon_0}\\).",
      ],
    },
    {
      title: "Derive an expression for electric potential due to a point charge",
      steps: [
        "Potential at A is the work done per unit positive charge brought from infinity to A; the work is path independent, so come along OA.",
        "For a small displacement \\(dx\\) against the field: \\(dV = -E\\,dx = -\\frac{q}{4\\pi\\varepsilon_0 x^2}dx\\).",
        "Integrate from \\(\\infty\\) to \\(r\\): \\(V = -\\int_{\\infty}^{r} \\frac{q}{4\\pi\\varepsilon_0 x^2}dx = \\frac{q}{4\\pi\\varepsilon_0 r}\\).",
      ],
    },
    {
      title: "Relation between electric field and potential gradient",
      steps: [
        "Move a unit positive charge from M to N, a small distance \\(dx\\), against the field \\(E\\).",
        "Work done \\(dW = -E\\,dx\\), and this work equals the potential difference \\(dV\\) between M and N.",
        "So \\(dV = -E\\,dx\\), i.e. \\(E = -\\frac{dV}{dx}\\): the field is the negative potential gradient.",
      ],
    },
    {
      title: "Potential energy of a dipole in a uniform electric field",
      steps: [
        "A dipole at angle \\(\\theta\\) to \\(E\\) feels a couple: \\(\\tau = pE\\sin\\theta\\), maximum at \\(\\theta = 90^\\circ\\).",
        "Rotate it slowly from \\(\\theta_0\\) to \\(\\theta\\) with an equal and opposite external torque: \\(W = \\int_{\\theta_0}^{\\theta} pE\\sin\\theta\\,d\\theta = pE(\\cos\\theta_0 - \\cos\\theta)\\).",
        "This work is stored as potential energy. Choosing \\(\\theta_0 = 90^\\circ\\) as zero gives \\(U = -pE\\cos\\theta = -\\vec{p}\\cdot\\vec{E}\\).",
      ],
    },
    {
      title: "Equivalent capacitance of capacitors in series (and in parallel)",
      steps: [
        "Series: each capacitor carries the same charge \\(Q\\); the voltages add: \\(V = V_1 + V_2 = \\frac{Q}{C_1} + \\frac{Q}{C_2}\\).",
        "With \\(V = \\frac{Q}{C_s}\\): \\(\\frac{1}{C_s} = \\frac{1}{C_1} + \\frac{1}{C_2}\\); for \\(n\\) equal capacitors \\(C_s = \\frac{C}{n}\\).",
        "Parallel: same \\(V\\) across each; charges add: \\(Q = Q_1 + Q_2\\), so \\(C_p = C_1 + C_2\\); for \\(n\\) equal capacitors \\(C_p = nC\\).",
      ],
    },
    {
      title: "Capacitance of a parallel plate capacitor with a dielectric slab between the plates",
      steps: [
        "Without dielectric: \\(E_0 = \\frac{\\sigma}{\\varepsilon_0} = \\frac{Q}{A\\varepsilon_0}\\), \\(V = E_0 d\\), so \\(C_0 = \\frac{\\varepsilon_0 A}{d}\\).",
        "A slab of thickness \\(t\\) is polarized; the field inside it falls to \\(E = \\frac{E_0}{k}\\), while \\(E_0\\) acts over the remaining \\(d - t\\).",
        "\\(V = E_0(d - t) + \\frac{E_0}{k}t = \\frac{Q}{A\\varepsilon_0}\\left(d - t + \\frac{t}{k}\\right)\\).",
        "\\(C = \\frac{Q}{V} = \\frac{\\varepsilon_0 A}{d - t + \\frac{t}{k}}\\). If the slab fills the gap (\\(t = d\\)), \\(C = \\frac{k\\varepsilon_0 A}{d}\\).",
      ],
    },
    {
      title: "Expression for displacement current",
      steps: [
        "Between the plates, \\(E = \\frac{q}{k\\varepsilon_0 A}\\), so \\(q = k\\varepsilon_0 A E\\).",
        "Differentiate: \\(\\frac{dq}{dt} = k\\varepsilon_0 A\\frac{dE}{dt}\\), which equals the conduction current \\(i_c\\) in the wires.",
        "This current between the plates is the displacement current \\(i_d = k\\varepsilon_0 A\\frac{dE}{dt}\\); for air \\(i_d = \\varepsilon_0 A\\frac{dE}{dt}\\).",
      ],
    },
    {
      title: "Derive an expression for energy stored in a charged capacitor",
      steps: [
        "When the charge is \\(q'\\), the potential difference is \\(\\frac{q'}{C}\\); moving a further \\(dq\\) needs \\(dW = \\frac{q'}{C}dq\\).",
        "Total work \\(W = \\int_0^Q \\frac{q'}{C}dq' = \\frac{Q^2}{2C}\\), stored as electrical potential energy.",
        "With \\(Q = CV\\): \\(U = \\frac{Q^2}{2C} = \\frac{1}{2}CV^2 = \\frac{1}{2}QV\\). The battery supplies \\(QV\\); the other half is lost as heat.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Van de Graaff generator",
      labels: ["pulleys P1 and P2", "conveyor belt", "spray brush and collector brush", "hollow dome", "ion source and accelerating tube", "steel vessel and earthed plate"],
    },
    { title: "Gaussian sphere around a charged spherical shell", labels: ["shell of radius R", "Gaussian sphere of radius r", "point P and area ds", "radial E"] },
    { title: "Gaussian cylinder around a long charged wire", labels: ["charged wire", "coaxial cylinder of radius r and length l", "radial E on the curved surface", "flat caps"] },
    { title: "Gaussian cylinder through a charged plane sheet", labels: ["plane sheet with σ", "cylinder of area A, length 2r", "points P and P'", "E away from the sheet on both sides"] },
    { title: "Dielectric slab in a parallel plate capacitor", labels: ["plates +Q and -Q", "separation d", "slab of thickness t", "field E0 in air, E0/k in the slab"] },
    { title: "Couple on a dipole in a uniform field", labels: ["charges +q and -q", "dipole moment p", "field E", "forces qE in opposite directions", "angle θ"] },
  ],
  mostAsked: [
    {
      topic: "Electric field by Gauss' law: charged spherical shell, long wire (cylinder), plane sheet or conductor",
      years: [2026, 2025, 2019, 2018, 2016],
    },
    {
      topic: "Capacitance: definition and unit, or a parallel plate capacitor with or without a dielectric",
      years: [2026, 2024, 2022, 2020, 2019, 2018],
    },
    { topic: "Electric potential: definition, due to a point charge, or potential gradient", years: [2026, 2025, 2024, 2023, 2018] },
    { topic: "Capacitors in series: equivalent capacitance, derivation or a numerical", years: [2026, 2024, 2023] },
    { topic: "Dipole in a uniform field: torque and work done in rotating it", years: [2026, 2023, 2022] },
    { topic: "Polar and non-polar molecules (dielectrics)", years: [2026, 2022] },
    { topic: "Van de Graaff generator: diagram or uses", years: [2025, 2024] },
    { topic: "Energy stored in a charged capacitor", years: [2024, 2017] },
  ],
  mistakes: [
    {
      title: "Using \\(\\frac{\\sigma}{\\varepsilon_0}\\) for a plane sheet",
      body: "A charged infinite plane sheet gives \\(E = \\frac{\\sigma}{2\\varepsilon_0}\\). \\(\\frac{\\sigma}{\\varepsilon_0}\\) is the field at the surface of a charged sphere or conductor.",
    },
    {
      title: "Giving a field inside a charged shell",
      body: "Inside a uniformly charged spherical shell \\(E = 0\\): the Gaussian surface encloses no charge. The potential inside is not zero; it is constant.",
    },
    {
      title: "Adding series capacitances directly",
      body: "In series the reciprocals add (\\(n\\) equal capacitors give \\(\\frac{C}{n}\\)); in parallel the capacitances add. This is the reverse of resistors.",
    },
    {
      title: "Leaving areas in cm² and gaps in mm",
      body: "Convert first: 6 cm² = \\(6 \\times 10^{-4}\\) m², 2 mm = \\(2 \\times 10^{-3}\\) m, 1 μF = \\(10^{-6}\\) F. Take \\(\\varepsilon_0 = 8.85 \\times 10^{-12}\\) C²/N m².",
    },
    {
      title: "Wrong angle for maximum torque on a dipole",
      body: "\\(\\tau = pE\\sin\\theta\\) is maximum at \\(\\theta = 90^\\circ\\) and zero at 0° and 180°. Potential energy \\(-pE\\cos\\theta\\) is least at 0° (stable).",
    },
    {
      title: "Taking the dielectric slab as the whole gap",
      body: "\\(C = kC_0\\) only when the dielectric fills the space. A slab of thickness \\(t < d\\) needs \\(C = \\frac{\\varepsilon_0 A}{d - t + t/k}\\).",
    },
  ],
};

export default sheet;
