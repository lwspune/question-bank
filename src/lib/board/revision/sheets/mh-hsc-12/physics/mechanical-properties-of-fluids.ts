import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Physics, Ch. 2 Mechanical Properties of Fluids. Statements checked
 * against the Balbharati text (law and definition wordings are the book's own);
 * most-asked years from the 38 board past-paper questions in the bank, 2016-2026.
 * The book's Reynolds-number thresholds did not survive text extraction, so
 * the sheet says low/high rather than quoting numbers it could not check.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Physics",
  subjectRoute: "physics",
  chapterName: "Mechanical Properties of Fluids",
  chapterSlug: "mechanical-properties-of-fluids",
  source: "Balbharati Physics Std XII (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "Pascal's law",
      text: "The pressure applied at any point of an enclosed fluid at rest is transmitted equally and undiminished to every point of the fluid and also on the walls of the container, provided the effect of gravity is neglected. A **hydraulic lift** and **hydraulic brakes** work on this law.",
    },
    {
      term: "Cohesive and adhesive force",
      text: "**Cohesive force**: the force of attraction between the molecules of the same substance (water and water). It is strongest in solids and weakest in gases. **Adhesive force**: the force of attraction between the molecules of different substances (glass and water).",
    },
    {
      term: "Range of molecular force, sphere of influence",
      text: "**Range**: the maximum distance from a molecule up to which the molecular force is effective (a few nanometre). **Sphere of influence**: an imaginary sphere with the molecule at its centre and radius equal to the molecular range. **Surface film**: the surface layer of thickness equal to the range of molecular force.",
    },
    {
      term: "Surface tension",
      text: "The tangential force acting per unit length on both sides of an imaginary line drawn on the free surface of a liquid: \\(T = \\frac{F}{L}\\). SI unit N/m (equivalently J/m²); dimensions \\([L^0M^1T^{-2}]\\). Gases have no free surface, so they show no surface tension.",
    },
    {
      term: "Surface energy",
      text: "The extra potential energy of the molecules in the surface layer, compared with the molecules inside the liquid. Surface energy \\(= T\\,dA\\), so surface tension equals the surface energy per unit area. When droplets coalesce into one drop, the total surface area **decreases** and energy is **released**.",
    },
    {
      term: "Angle of contact",
      text: "The angle between the tangents drawn to the free surface of the liquid and to the surface of the solid at the point of contact, measured **within the liquid**. Acute: concave meniscus, the liquid wets the solid (water and glass). Obtuse: convex meniscus, it does not wet (mercury and glass). A liquid that wets completely has \\(\\theta = 0^\\circ\\).",
    },
    {
      term: "Effect of impurities on surface tension",
      text: "A highly soluble substance (common salt) **increases** the surface tension of water. A sparingly soluble substance (phenol, detergent) **decreases** it, which is why detergent is mixed with water to wash clothes: water then makes good contact with the fabric. An insoluble impurity (dust on mercury) also decreases it.",
    },
    {
      term: "Effect of temperature on surface tension",
      text: "In most liquids, surface tension **decreases** as temperature increases (hot water removes tough stains). It becomes **zero at the critical temperature**. Exception: for molten copper and molten cadmium, surface tension increases with temperature.",
    },
    {
      term: "Excess pressure and Laplace's law",
      text: "Across a curved liquid surface, the pressure on the **concave side** is greater than on the convex side. For a drop, \\(p_i - p_0 = \\frac{2T}{r}\\) (Laplace's law of a spherical membrane); a soap bubble has two surfaces, so \\(p_i - p_0 = \\frac{4T}{r}\\).",
    },
    {
      term: "Capillarity",
      text: "The rise or fall of a liquid inside a capillary tube when it is dipped in the liquid. Examples: oil rises up a lamp wick, blotting paper absorbs ink, a cloth rag sucks water, sap rises in trees. Water rises in glass; mercury falls. Narrower the tube, greater the rise: \\(h \\propto \\frac{1}{r}\\).",
    },
    {
      term: "Streamline flow, critical velocity, Reynolds number",
      text: "**Streamline flow**: a steady flow in which adjacent layers move smoothly over each other; two streamlines never intersect. **Critical velocity**: the velocity beyond which a streamline flow becomes turbulent. **Reynolds number** is a pure number (no unit, no dimensions): a low value means streamline flow, a high value turbulent flow.",
    },
    {
      term: "Viscosity and coefficient of viscosity",
      text: "Viscosity is the property of a fluid by virtue of which the relative motion between its layers experiences a dragging force (viscous drag). **Coefficient of viscosity**: the viscous force per unit area per unit velocity gradient. SI unit N s/m²; CGS unit poise. **Velocity gradient**: rate of change of velocity with distance from a stationary layer, \\(\\frac{dv}{dx}\\).",
    },
    {
      term: "Stokes' law and terminal velocity",
      text: "**Stokes' law**: the viscous force on a small sphere falling through a viscous medium is directly proportional to its radius, its velocity and the coefficient of viscosity: \\(F_v = 6\\pi\\eta r v\\). **Terminal velocity**: the constant velocity reached when the weight equals the viscous force plus the upthrust.",
    },
    {
      term: "Continuity and Bernoulli's principle",
      text: "**Continuity**: the volume rate of flow of an incompressible fluid in steady flow is the same throughout, \\(A_1v_1 = A_2v_2\\). **Bernoulli's equation**: the work done per unit volume by the surrounding fluid equals the sum of the changes in kinetic and potential energies per unit volume. It is consistent with the conservation of **energy**.",
    },
  ],
  formulas: [
    { label: "Pressure", latex: "p = \\frac{F}{A} \\qquad p = p_0 + h\\rho g \\qquad p_{gauge} = p - p_0 = h\\rho g" },
    { label: "Hydraulic lift", latex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\qquad F_2 = F_1\\frac{A_2}{A_1}" },
    { label: "Surface tension and surface energy", latex: "T = \\frac{F}{L} \\qquad W = T\\,dA" },
    {
      label: "Surface energy of a drop and of a bubble",
      latex: "E_{drop} = T(4\\pi r^2) \\qquad W_{bubble} = T \\times 2(4\\pi r^2) = 8\\pi r^2 T",
      symbols: [{ symbol: "2", meaning: "a soap bubble has two surfaces, inner and outer" }],
    },
    {
      label: "Drops coalescing (volume is conserved)",
      latex: "n \\cdot \\frac{4}{3}\\pi r^3 = \\frac{4}{3}\\pi R^3 \\qquad R = n^{1/3} r",
    },
    { label: "Excess pressure (Laplace's law)", latex: "p_{drop} - p_0 = \\frac{2T}{r} \\qquad p_{bubble} - p_0 = \\frac{4T}{r}" },
    {
      label: "Angle of contact (equilibrium of a drop)",
      latex: "\\cos\\theta = \\frac{T_2 - T_1}{T_3}",
      symbols: [
        { symbol: "T₁", meaning: "liquid-solid surface tension" },
        { symbol: "T₂", meaning: "air-solid surface tension" },
        { symbol: "T₃", meaning: "air-liquid surface tension" },
      ],
    },
    {
      label: "Capillary rise or fall",
      latex: "h = \\frac{2T\\cos\\theta}{r\\rho g} \\qquad T = \\frac{rh\\rho g}{2\\cos\\theta}",
    },
    { label: "Newton's law of viscosity", latex: "f = \\eta A\\frac{dv}{dx} \\qquad \\eta = \\frac{f}{A\\,(dv/dx)}" },
    {
      label: "Critical velocity and Reynolds number",
      latex: "v_c = \\frac{R_n \\eta}{\\rho d} \\qquad R_n = \\frac{v_c \\rho d}{\\eta}",
      symbols: [{ symbol: "d", meaning: "diameter of the tube" }],
    },
    { label: "Stokes' law", latex: "F_v = 6\\pi\\eta r v" },
    {
      label: "Terminal velocity",
      latex: "v = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta} \\qquad \\eta = \\frac{2r^2(\\rho - \\sigma)g}{9v}",
      symbols: [
        { symbol: "ρ", meaning: "density of the sphere" },
        { symbol: "σ", meaning: "density of the medium" },
      ],
    },
    { label: "Equation of continuity", latex: "A_1v_1 = A_2v_2" },
    { label: "Bernoulli's equation", latex: "p + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}" },
    { label: "Speed of efflux (Torricelli)", latex: "v = \\sqrt{2gh}" },
  ],
  derivations: [
    {
      title: "Explain surface tension on the basis of molecular theory",
      steps: [
        "Molecule A deep inside: its sphere of influence is wholly in the liquid, so cohesive forces act equally in all directions and the net force is zero.",
        "Molecule B in the surface film: a larger part of its sphere of influence is in the liquid, so a net cohesive force pulls it downward. The adhesive pull of the air above is weak.",
        "Molecule C on the free surface: half its sphere is in air, which has far fewer molecules, so it is also pulled into the liquid.",
        "All molecules of the surface film feel a net inward pull, so the film behaves like a stretched elastic membrane. This tension is surface tension.",
      ],
    },
    {
      title: "Obtain the relation between surface energy and surface tension",
      steps: [
        "A C shaped wire frame with a movable arm QR of length L holds a soap film. The film has two surfaces, so the inward force on QR is \\(F = T \\times 2L\\).",
        "Pull QR out isothermally through \\(dx\\) with an equal and opposite force. Work done \\(dw = F\\,dx = T(2L\\,dx)\\).",
        "\\(2L\\,dx = dA\\), the increase in area of both surfaces, so \\(dw = T\\,dA\\).",
        "This work is stored as surface energy: surface energy \\(= T\\,dA\\). So surface tension is the surface energy per unit area.",
      ],
    },
    {
      title: "Derive Laplace's law: excess pressure inside a drop and a soap bubble",
      steps: [
        "A drop of radius r has pressure \\(p_i\\) inside and \\(p_0\\) outside. Let its radius grow from r to \\(r + \\Delta r\\), so small that the pressure stays constant.",
        "Increase in area \\(dA = 4\\pi(r + \\Delta r)^2 - 4\\pi r^2 = 8\\pi r\\Delta r\\) (neglect \\(\\Delta r^2\\)). Work stored \\(dW = T(8\\pi r\\Delta r)\\).",
        "The excess force does this work: \\(dW = (p_i - p_0)4\\pi r^2\\Delta r\\).",
        "Equate: \\(p_i - p_0 = \\frac{2T}{r}\\). A soap bubble has two surfaces, so \\(dA = 16\\pi r\\Delta r\\) and \\(p_i - p_0 = \\frac{4T}{r}\\).",
      ],
    },
    {
      title: "Obtain an expression for the rise of a liquid in a capillary tube",
      steps: [
        "A capillary of radius r is dipped in a liquid of density \\(\\rho\\) and angle of contact \\(\\theta\\); the liquid rises to height h.",
        "Surface tension acts along the tangent over the contact length \\(2\\pi r\\): \\(f_T = T \\times 2\\pi r\\). Its vertical component is \\(T \\times 2\\pi r\\cos\\theta\\).",
        "Weight of the raised column (meniscus ignored): \\(w = \\pi r^2 h\\rho g\\).",
        "Equate: \\(\\pi r^2 h\\rho g = 2\\pi rT\\cos\\theta\\), so \\(h = \\frac{2T\\cos\\theta}{r\\rho g}\\). An obtuse \\(\\theta\\) gives a negative h: capillary fall.",
      ],
    },
    {
      title: "Using Newton's law of viscosity, derive an expression for the coefficient of viscosity",
      steps: [
        "Newton's law: for a streamline flow, the viscous force f on a layer is directly proportional to the area A of the layer and to the velocity gradient \\(\\frac{dv}{dx}\\).",
        "So \\(f \\propto A\\frac{dv}{dx}\\), that is \\(f = \\eta A\\frac{dv}{dx}\\), where \\(\\eta\\) is the coefficient of viscosity.",
        "Hence \\(\\eta = \\frac{f}{A\\,(dv/dx)}\\): the viscous force per unit area per unit velocity gradient. SI unit N s/m².",
      ],
    },
    {
      title: "Derive an expression for the terminal velocity of a sphere falling through a viscous medium",
      steps: [
        "A sphere of radius r and density \\(\\rho\\) falls through a medium of density \\(\\sigma\\) and viscosity \\(\\eta\\). Weight acts down; upthrust and viscous force act up.",
        "Weight \\(F_g = \\frac{4}{3}\\pi r^3\\rho g\\); upthrust \\(F_u = \\frac{4}{3}\\pi r^3\\sigma g\\); viscous force \\(F_v = 6\\pi\\eta rv\\).",
        "The viscous force grows with speed until \\(F_g = F_v + F_u\\). The net force is then zero and the velocity stays constant: the terminal velocity.",
        "So \\(6\\pi\\eta rv = \\frac{4}{3}\\pi r^3(\\rho - \\sigma)g\\), giving \\(v = \\frac{2r^2(\\rho - \\sigma)g}{9\\eta}\\).",
      ],
    },
    {
      title: "Derive the equation of continuity",
      steps: [
        "Steady flow of an incompressible fluid through a tube: cross sections \\(A_1\\), \\(A_2\\) and speeds \\(v_1\\), \\(v_2\\).",
        "Mass entering in time \\(\\Delta t\\) is \\(\\rho A_1v_1\\Delta t\\); mass leaving is \\(\\rho A_2v_2\\Delta t\\). No fluid is lost or gained, so they are equal.",
        "Hence \\(A_1v_1 = A_2v_2\\): the volume flux is the same throughout. A narrower section means a faster flow.",
      ],
    },
    {
      title: "Derive Bernoulli's equation",
      steps: [
        "Ideal fluid in a tube: at section 1, pressure \\(p_1\\), speed \\(v_1\\), height \\(h_1\\); at section 2, \\(p_2\\), \\(v_2\\), \\(h_2\\). A volume \\(\\Delta V\\) flows through.",
        "Net work done by the surrounding fluid's pressure: \\(W = (p_1 - p_2)\\Delta V\\).",
        "Change in kinetic energy \\(\\frac{1}{2}\\rho\\Delta V(v_2^2 - v_1^2)\\); change in potential energy \\(\\rho\\Delta Vg(h_2 - h_1)\\).",
        "Work energy theorem: \\(p_1 - p_2 = \\frac{1}{2}\\rho(v_2^2 - v_1^2) + \\rho g(h_2 - h_1)\\), so \\(p + \\frac{1}{2}\\rho v^2 + \\rho gh\\) is constant.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Sphere of influence and surface film (molecular theory)",
      labels: ["molecule A deep inside", "molecule B in the surface film", "molecule C on the free surface", "sphere of influence of each", "free surface XY", "surface film between XY and X′Y′"],
    },
    {
      title: "Acute angle of contact (concave meniscus)",
      labels: ["solid wall", "concave meniscus", "tangent AT to the liquid surface", "angle θ measured within the liquid", "adhesive force AP, cohesive force AC", "resultant AR normal to the surface"],
    },
    {
      title: "Surface energy: soap film on a wire frame",
      labels: ["C shaped frame", "movable arm QR of length L", "soap film (two surfaces)", "inward force F = 2TL", "displacement dx to Q′R′"],
    },
    {
      title: "Capillary rise",
      labels: ["capillary of radius r", "height of rise h", "concave meniscus", "angle of contact θ", "T along the tangent, T cos θ vertical"],
    },
    {
      title: "Forces on a sphere falling through a viscous medium",
      labels: ["weight Fg down", "viscous force Fv up", "buoyant force Fu up", "radius r", "terminal velocity v"],
    },
    {
      title: "Hydraulic lift",
      labels: ["small piston S1, area A1", "large piston S2, area A2", "force F1 applied", "force F2 on the load", "enclosed liquid"],
    },
  ],
  mostAsked: [
    {
      topic: "Surface energy and surface tension: the relation, or a numerical on blowing a soap bubble or a drop's surface energy",
      years: [2024, 2023, 2020, 2018, 2017, 2016],
    },
    { topic: "Capillarity: definition and examples, rise in a capillary tube, or a ratio of heights", years: [2026, 2025, 2022, 2020, 2019] },
    { topic: "Coefficient of viscosity: definition, derivation from Newton's law, velocity gradient, or a numerical", years: [2026, 2025, 2024, 2023] },
    { topic: "Effect of impurities and temperature on surface tension (detergent, alcohol, critical temperature)", years: [2025, 2024, 2019] },
    { topic: "Molecular theory of surface tension: cohesive force, range of molecular force, sphere of influence", years: [2026, 2025, 2024] },
    { topic: "Stokes' law and terminal velocity: derivation or a numerical", years: [2026, 2024, 2022] },
    { topic: "Excess pressure inside a drop or bubble: Laplace's law or a numerical", years: [2026, 2025, 2016] },
    { topic: "Droplets coalescing into one drop: surface area and energy released", years: [2026, 2022] },
  ],
  mistakes: [
    {
      title: "Forgetting that a soap bubble has two surfaces",
      body: "A bubble's area is \\(2 \\times 4\\pi r^2\\), so the work to blow it is \\(8\\pi r^2 T\\) and the excess pressure is \\(\\frac{4T}{r}\\). A liquid drop has one surface: \\(4\\pi r^2 T\\) and \\(\\frac{2T}{r}\\).",
    },
    {
      title: "Mixing CGS and SI units",
      body: "1 dyne/cm \\(= 10^{-3}\\) N/m and 1 poise \\(= 0.1\\) N s/m². Either convert everything to SI, or keep everything in CGS (g = 980 cm/s²) when the answer is asked in CGS.",
    },
    {
      title: "Using the diameter as the radius",
      body: "Board numericals often give the diameter of a drop, or ask for it. Halve it before using \\(\\frac{2T}{r}\\) or \\(4\\pi r^2\\), and double r at the end if the diameter is asked.",
    },
    {
      title: "Giving the excess pressure when the pressure inside is asked",
      body: "The pressure inside a drop is \\(p_i = p_0 + \\frac{2T}{r}\\): add the atmospheric pressure. The excess pressure alone is \\(\\frac{2T}{r}\\).",
    },
    {
      title: "Dropping the upthrust in terminal velocity",
      body: "Use \\((\\rho - \\sigma)\\), the density of the sphere minus that of the medium, not \\(\\rho\\) alone. In Newton's law of viscosity, A is the area of the layer parallel to the flow, not the cross section of the tube.",
    },
    {
      title: "Saying coalescing drops absorb energy",
      body: "When droplets join into one drop, volume stays the same but the total surface area decreases, so surface energy is **released**. Find the new radius from \\(R^3 = nr^3\\) first.",
    },
  ],
};

export default sheet;
