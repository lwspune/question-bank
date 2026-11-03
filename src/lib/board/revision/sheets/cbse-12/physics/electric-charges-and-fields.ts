import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE 12 Physics, Ch. 1 Electric Charges and Fields. Statements checked
 * against the NCERT text (law wordings are the book's own); most-asked years
 * from the CBSE board past-paper questions in the bank, 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Electric Charges and Fields",
  chapterSlug: "electric-charges-and-fields",
  source: "NCERT Physics Part I (CBSE Class 12), Chapter 1",
  keyPoints: [
    {
      term: "Basic properties of charge",
      text: "**Additivity:** charges add up like real numbers (algebraically). **Conservation:** the total charge of an isolated system is always conserved. **Quantisation:** all free charges are integral multiples of a basic unit e, so \\(q = ne\\).",
    },
    {
      term: "Coulomb's law",
      text: "The force between two point charges varies inversely as the square of the distance between them, is directly proportional to the product of their magnitudes and acts along the line joining the two charges.",
    },
    {
      term: "Principle of superposition",
      text: "The force on any charge due to a number of other charges is the vector sum of all the forces on that charge due to the other charges, taken one at a time. The individual forces are unaffected by the presence of other charges.",
    },
    {
      term: "Electric field",
      text: "The electric field at a point is the force experienced by a unit positive test charge placed at that point, without disturbing the source charges. It is radially outward from a positive point charge and radially inward towards a negative one.",
    },
    {
      term: "Electric field line",
      text: "A curve drawn so that the tangent at each point gives the direction of the electric field there. Field lines crowd where the field is strong and are far apart where it is weak.",
    },
    {
      term: "Properties of field lines",
      text: "(i) They start from positive charges and end at negative charges. (ii) In a charge-free region they are continuous curves without breaks. (iii) Two field lines never cross (the field would have two directions there). (iv) Electrostatic field lines do not form closed loops.",
    },
    {
      term: "Electric flux",
      text: "\\(\\Delta\\phi = \\vec{E}\\cdot\\Delta\\vec{S} = E\\,\\Delta S\\cos\\theta\\): proportional to the number of field lines cutting the area. For a closed surface, \\(\\theta\\) is measured from the **outward** normal. Scalar; SI unit N C\\(^{-1}\\) m\\(^2\\).",
    },
    {
      term: "Electric dipole",
      text: "A pair of equal and opposite point charges q and \\(-q\\) separated by a distance 2a. Dipole moment \\(\\vec{p}\\) has magnitude \\(q \\times 2a\\) and points along the axis from \\(-q\\) to q. Total charge is zero, but the field is not.",
    },
    {
      term: "Dipole in a uniform field",
      text: "Net force is zero (forces qE and \\(-qE\\) cancel) but the two forces form a couple: torque \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\). The torque tends to align \\(\\vec{p}\\) with \\(\\vec{E}\\) and is zero when they are aligned. In a non-uniform field there is also a net force.",
    },
    {
      term: "Continuous charge distribution",
      text: "Linear charge density \\(\\lambda\\) (C/m) for a wire, surface charge density \\(\\sigma\\) (C/m\\(^2\\)) for a sheet, volume charge density \\(\\rho\\) (C/m\\(^3\\)). The field is found by superposition over small elements.",
    },
    {
      term: "Gauss's law",
      text: "The flux of electric field through any closed surface S is \\(1/\\varepsilon_0\\) times the total charge enclosed by S: \\(\\oint \\vec{E}\\cdot d\\vec{S} = \\frac{q}{\\varepsilon_0}\\).",
    },
    {
      term: "Points about Gauss's law",
      text: "True for any closed surface of any shape. A charge **outside** the surface gives zero net flux, but \\(\\vec{E}\\) in the law is due to all charges. The closed surface chosen is the **Gaussian surface**; it must not pass through a discrete charge. Gauss's law rests on the inverse square law.",
    },
    {
      term: "Field inside a charged shell",
      text: "The field due to a uniformly charged thin shell is zero at all points inside the shell. Its experimental verification confirms the \\(1/r^2\\) dependence in Coulomb's law.",
    },
  ],
  formulas: [
    {
      label: "Coulomb's law",
      latex: "F = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q_1 q_2}{r^2} \\qquad \\vec{F}_{21} = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q_1 q_2}{r_{21}^2}\\,\\hat{r}_{21}",
      symbols: [{ symbol: "F21", meaning: "force on q2 due to q1; unit vector from q1 to q2" }],
    },
    { label: "Constants", latex: "\\frac{1}{4\\pi\\varepsilon_0} = 9 \\times 10^{9}\\ \\mathrm{N\\,m^2\\,C^{-2}} \\qquad \\varepsilon_0 = 8.854 \\times 10^{-12}\\ \\mathrm{C^2\\,N^{-1}\\,m^{-2}}" },
    { label: "Quantisation of charge", latex: "q = ne, \\qquad e = 1.6 \\times 10^{-19}\\ \\mathrm{C}" },
    { label: "Field of a point charge", latex: "\\vec{E} = \\frac{\\vec{F}}{q} \\qquad E = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{Q}{r^2}" },
    { label: "Dipole moment", latex: "\\vec{p} = q \\times 2a\\,\\hat{p} \\quad (\\text{from } -q \\text{ to } q)" },
    {
      label: "Dipole field on the axis",
      latex: "E = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{2pr}{(r^2 - a^2)^2} \\approx \\frac{2p}{4\\pi\\varepsilon_0 r^3} \\ (r \\gg a), \\text{ along } \\vec{p}",
    },
    {
      label: "Dipole field on the equatorial plane",
      latex: "E = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{p}{(r^2 + a^2)^{3/2}} \\approx \\frac{p}{4\\pi\\varepsilon_0 r^3} \\ (r \\gg a), \\text{ opposite to } \\vec{p}",
    },
    { label: "Torque on a dipole", latex: "\\vec{\\tau} = \\vec{p} \\times \\vec{E}, \\qquad \\tau = pE\\sin\\theta" },
    { label: "Electric flux", latex: "\\Delta\\phi = \\vec{E}\\cdot\\Delta\\vec{S} = E\\,\\Delta S\\cos\\theta" },
    { label: "Gauss's law", latex: "\\phi = \\oint_S \\vec{E}\\cdot d\\vec{S} = \\frac{q_{\\text{enclosed}}}{\\varepsilon_0}" },
    { label: "Infinitely long straight wire", latex: "E = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}" },
    { label: "Infinite plane sheet", latex: "E = \\frac{\\sigma}{2\\varepsilon_0} \\quad (\\text{same at every distance})" },
    {
      label: "Thin spherical shell",
      latex: "E = \\frac{1}{4\\pi\\varepsilon_0}\\,\\frac{q}{r^2}\\ (r \\ge R), \\qquad E = 0\\ (r < R), \\qquad q = 4\\pi R^2 \\sigma",
    },
    {
      label: "Charge in a uniform field",
      latex: "a = \\frac{qE}{m} \\qquad t = \\sqrt{\\frac{2ym}{qE}} \\qquad y = \\frac{qE x^2}{2 m v^2}",
      symbols: [
        { symbol: "t", meaning: "time to move y from rest along the field" },
        { symbol: "y", meaning: "sideways deflection after x, entering at speed v across the field" },
      ],
    },
  ],
  derivations: [
    {
      title: "Derive the electric field of a dipole at a point on its axis",
      steps: [
        "Charges \\(-q\\) and q at distance a either side of the centre O; point P on the axis at distance r from O, on the side of q.",
        "Field of \\(-q\\): \\(\\frac{q}{4\\pi\\varepsilon_0 (r + a)^2}\\) towards \\(-q\\); field of q: \\(\\frac{q}{4\\pi\\varepsilon_0 (r - a)^2}\\) along \\(\\hat{p}\\).",
        "Total: \\(\\frac{q}{4\\pi\\varepsilon_0}\\left[\\frac{1}{(r - a)^2} - \\frac{1}{(r + a)^2}\\right]\\hat{p} = \\frac{q}{4\\pi\\varepsilon_0}\\,\\frac{4ar}{(r^2 - a^2)^2}\\,\\hat{p}\\).",
        "With \\(p = 2qa\\): \\(\\vec{E} = \\frac{2p\\,r}{4\\pi\\varepsilon_0 (r^2 - a^2)^2}\\,\\hat{p}\\); for \\(r \\gg a\\), \\(\\vec{E} = \\frac{2\\vec{p}}{4\\pi\\varepsilon_0 r^3}\\).",
      ],
    },
    {
      title: "Derive the electric field of a dipole at a point on its equatorial plane",
      steps: [
        "P on the perpendicular bisector at distance r from O; each charge is \\(\\sqrt{r^2 + a^2}\\) from P.",
        "Both fields have magnitude \\(\\frac{q}{4\\pi\\varepsilon_0 (r^2 + a^2)}\\).",
        "Components normal to the axis cancel; components along the axis add, each with \\(\\cos\\theta = \\frac{a}{\\sqrt{r^2 + a^2}}\\), pointing opposite to \\(\\hat{p}\\).",
        "\\(\\vec{E} = -\\frac{2qa}{4\\pi\\varepsilon_0 (r^2 + a^2)^{3/2}}\\,\\hat{p} = -\\frac{\\vec{p}}{4\\pi\\varepsilon_0 (r^2 + a^2)^{3/2}}\\); for \\(r \\gg a\\), \\(\\vec{E} = -\\frac{\\vec{p}}{4\\pi\\varepsilon_0 r^3}\\).",
      ],
    },
    {
      title: "Derive the torque on an electric dipole in a uniform electric field",
      steps: [
        "Dipole at angle \\(\\theta\\) to \\(\\vec{E}\\): force qE on q and \\(-qE\\) on \\(-q\\). Net force is zero.",
        "The two equal, opposite forces act at different points and form a couple; arm \\(= 2a\\sin\\theta\\).",
        "\\(\\tau = qE \\times 2a\\sin\\theta = pE\\sin\\theta\\), so \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\).",
        "Maximum \\(pE\\) at \\(\\theta = 90^\\circ\\); zero at \\(0^\\circ\\) and \\(180^\\circ\\). The torque tends to align \\(\\vec{p}\\) with \\(\\vec{E}\\).",
      ],
    },
    {
      title: "Using Gauss's law, find the field due to an infinitely long straight uniformly charged wire",
      steps: [
        "By symmetry the field is radial and the same at all points at distance r. Take a coaxial cylinder of radius r and length l as the Gaussian surface.",
        "Flux through the two flat ends is zero (E lies along them); flux through the curved part is \\(E \\times 2\\pi r l\\).",
        "Charge enclosed is \\(\\lambda l\\). Gauss's law: \\(E \\times 2\\pi r l = \\frac{\\lambda l}{\\varepsilon_0}\\).",
        "\\(\\vec{E} = \\frac{\\lambda}{2\\pi\\varepsilon_0 r}\\,\\hat{n}\\): outward if \\(\\lambda\\) is positive, inward if negative.",
      ],
    },
    {
      title: "Using Gauss's law, find the field due to a uniformly charged infinite plane sheet",
      steps: [
        "By symmetry the field is normal to the sheet, outward on both sides. Take a cylinder of cross section A crossing the sheet as the Gaussian surface.",
        "The curved surface gives no flux (E is along it). Each flat face gives EA, so the total flux is 2EA.",
        "Charge enclosed is \\(\\sigma A\\). Gauss's law: \\(2EA = \\frac{\\sigma A}{\\varepsilon_0}\\).",
        "\\(\\vec{E} = \\frac{\\sigma}{2\\varepsilon_0}\\,\\hat{n}\\), independent of the distance from the sheet.",
      ],
    },
    {
      title: "Using Gauss's law, find the field due to a uniformly charged thin spherical shell, outside and inside",
      steps: [
        "Spherical symmetry: E is radial and depends only on r. Take a concentric sphere of radius r through P as the Gaussian surface; flux \\(= E \\times 4\\pi r^2\\).",
        "Outside (\\(r > R\\)): charge enclosed \\(q = \\sigma \\times 4\\pi R^2\\), so \\(E = \\frac{q}{4\\pi\\varepsilon_0 r^2}\\), as if all the charge were at the centre.",
        "Inside (\\(r < R\\)): no charge enclosed, so \\(E \\times 4\\pi r^2 = 0\\) and \\(E = 0\\).",
        "Graph: E is zero up to R, jumps to \\(\\frac{\\sigma}{\\varepsilon_0}\\) at the surface, then falls as \\(\\frac{1}{r^2}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Field lines of simple charge configurations", labels: ["lines leave + and end on -", "single positive and negative charge", "two equal positive charges (neutral point)", "dipole: lines from +q to -q", "arrows on every line"] },
    { title: "Electric field of a dipole: axis and equatorial plane", labels: ["charges -q and +q, 2a apart", "centre O and direction of p", "point P on the axis at r", "point on the equatorial plane at r", "E(+q), E(-q) and resultant"] },
    { title: "Dipole in a uniform electric field", labels: ["uniform field lines E", "forces qE and -qE", "angle θ between p and E", "arm 2a sin θ"] },
    { title: "Gaussian surface for a long straight wire", labels: ["charged wire, λ", "coaxial cylinder of radius r, length l", "radial E on the curved surface", "no flux through the ends"] },
    { title: "Gaussian surface for an infinite plane sheet", labels: ["sheet with σ", "cylinder of cross section A through the sheet", "E normal to the sheet on both sides", "unit normal n"] },
    { title: "Gaussian surfaces for a thin spherical shell", labels: ["shell of radius R, σ", "Gaussian sphere outside, r > R", "Gaussian sphere inside, r < R", "radial E"] },
  ],
  mostAsked: [
    {
      topic: "Coulomb's law and superposition: force or net field of a set of point charges",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Motion of a charge in a uniform electric field: electron beam between charged plates",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Electric field of a dipole on its axis or equatorial plane: derivation, far point or a numerical",
      marks: 5,
      years: [2026, 2025, 2023],
    },
    {
      topic: "Infinitely long charged wire: field by Gauss's law, or the force it exerts",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Electric flux: definition, unit, Gauss's law and flux through a cube or cylinder",
      marks: 3,
      years: [2025, 2024, 2023],
    },
    {
      topic: "Field of a thin spherical shell, inside and outside, by Gauss's law (with the E against r graph)",
      marks: 5,
      years: [2025, 2024, 2023],
    },
    {
      topic: "Field of a uniformly charged infinite plane sheet by Gauss's law (one or two sheets)",
      marks: 5,
      years: [2026, 2024, 2023],
    },
    {
      topic: "Torque on a dipole in a uniform field: value, graph against angle, zero and maximum",
      marks: 1,
      years: [2025, 2023],
    },
  ],
  mistakes: [
    {
      title: "Getting the direction of a dipole wrong",
      body: "\\(\\vec{p}\\) points from \\(-q\\) to \\(+q\\). On the axis \\(\\vec{E}\\) is along \\(\\vec{p}\\); on the equatorial plane it is **opposite** to \\(\\vec{p}\\). For the same far distance the axial field is twice the equatorial field.",
    },
    {
      title: "Using \\(1/r^2\\) for a dipole",
      body: "A dipole's field falls as \\(\\frac{1}{r^3}\\) at large r, a point charge's as \\(\\frac{1}{r^2}\\), a long wire's as \\(\\frac{1}{r}\\), and an infinite sheet's not at all.",
    },
    {
      title: "Writing \\(\\sigma/\\varepsilon_0\\) for a single sheet",
      body: "One thin sheet gives \\(\\frac{\\sigma}{2\\varepsilon_0}\\). Two parallel sheets with \\(+\\sigma\\) and \\(-\\sigma\\): \\(\\frac{\\sigma}{\\varepsilon_0}\\) between them, zero outside. With equal \\(+\\sigma\\) on both: zero between, \\(\\frac{\\sigma}{\\varepsilon_0}\\) outside.",
    },
    {
      title: "Counting outside charges in the flux",
      body: "Only the charge **enclosed** decides the net flux. A charge at the centre of a cube sends \\(\\frac{q}{6\\varepsilon_0}\\) through each face. The field on the surface, though, is due to all charges.",
    },
    {
      title: "Wrong torque angles",
      body: "\\(\\tau = pE\\sin\\theta\\): zero at \\(0^\\circ\\) and \\(180^\\circ\\), maximum at \\(90^\\circ\\). In a uniform field the net force on a dipole is zero, whatever the angle.",
    },
    {
      title: "Sharing charge on contact",
      body: "Identical conducting spheres touched together share the **algebraic** total equally: q and \\(-2q\\) become \\(-\\frac{q}{2}\\) each. Then apply Coulomb's law at the new distance.",
    },
  ],
};

export default sheet;
