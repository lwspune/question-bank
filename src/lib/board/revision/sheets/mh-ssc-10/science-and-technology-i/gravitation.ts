import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 1 Gravitation. Statements checked
 * against the Balbharati text; most-asked years from the board past papers in
 * the bank, 2019-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Gravitation",
  chapterSlug: "gravitation",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Centripetal force",
      text: "A force that acts on any object moving along a circle, directed towards the centre of the circle. 'Centripetal' means centre seeking.",
    },
    {
      term: "Kepler's first law",
      text: "The orbit of a planet is an ellipse with the Sun at one of the foci.",
    },
    {
      term: "Kepler's second law",
      text: "The line joining the planet and the Sun sweeps equal areas in equal intervals of time. So a planet moves faster when it is nearer the Sun.",
    },
    {
      term: "Kepler's third law",
      text: "The square of a planet's period of revolution around the Sun is directly proportional to the cube of its mean distance from the Sun: \\(T^2 \\propto r^3\\).",
    },
    {
      term: "Newton's universal law of gravitation",
      text: "Every object in the Universe attracts every other object with a force directly proportional to the product of their masses and inversely proportional to the square of the distance between them.",
    },
    {
      term: "Universal gravitational constant G",
      text: "The gravitational force between two masses of 1 kg kept 1 m apart. \\(G = 6.67 \\times 10^{-11}\\) N m²/kg², the same everywhere in the universe. First measured by Henry Cavendish.",
    },
    {
      term: "Acceleration due to gravity g",
      text: "The acceleration produced in an object by the earth's gravitational force. \\(g = \\frac{GM}{R^2}\\) = 9.8 m/s² on the earth's surface. SI unit m/s².",
    },
    {
      term: "Variation in g",
      text: "g is highest at the poles (9.832 m/s²) and lowest at the equator (9.78 m/s²), because the earth bulges at the equator. g decreases with height, decreases with depth, and is **zero at the centre** of the earth.",
    },
    {
      term: "Mass",
      text: "The amount of matter in an object. A scalar, SI unit kg. It is the measure of inertia and stays the same everywhere, even on another planet.",
    },
    {
      term: "Weight",
      text: "The force with which the earth attracts an object, \\(W = mg\\). A vector towards the centre of the earth, SI unit newton. It changes from place to place because g changes.",
    },
    {
      term: "Weight on the moon",
      text: "g on the moon is about 1/6th of g on the earth, so the weight on the moon is nearly 1/6th of the weight on the earth. The mass stays the same.",
    },
    {
      term: "Free fall",
      text: "Whenever an object moves under the influence of the force of gravity alone, it is falling freely. True free fall is possible only in vacuum: in air, a feather falls slower than a stone.",
    },
    {
      term: "Escape velocity",
      text: "The minimum initial velocity with which an object thrown upwards overcomes the earth's pull and escapes forever. On the earth \\(v_{esc}\\) = 11.2 km/s; on the moon it is less, about 2.37 km/s.",
    },
  ],
  formulas: [
    {
      label: "Newton's law of gravitation",
      latex: "F = \\frac{G m_1 m_2}{d^2}",
      symbols: [
        { symbol: "d", meaning: "distance between the centres of the two masses" },
        { symbol: "G", meaning: "6.67 × 10⁻¹¹ N m²/kg²" },
      ],
    },
    { label: "Centripetal force and speed in a circle", latex: "F = \\frac{mv^2}{r} \\qquad v = \\frac{2\\pi r}{T}" },
    { label: "Kepler's third law", latex: "T^2 \\propto r^3 \\qquad \\frac{T^2}{r^3} = K" },
    {
      label: "Acceleration due to gravity",
      latex: "g = \\frac{GM}{R^2} \\qquad g_h = \\frac{GM}{(R + h)^2}",
      symbols: [
        { symbol: "M, R", meaning: "mass 6 × 10²⁴ kg and radius 6.4 × 10⁶ m of the earth" },
      ],
    },
    { label: "Weight", latex: "W = mg \\qquad W_{moon} = \\frac{1}{6}W_{earth}" },
    {
      label: "Free fall (u = 0, a = g)",
      latex: "v = gt \\qquad s = \\frac{1}{2}gt^2 \\qquad v^2 = 2gs",
    },
    {
      label: "Equations of motion (general)",
      latex: "v = u + at \\qquad s = ut + \\frac{1}{2}at^2 \\qquad v^2 = u^2 + 2as",
    },
    { label: "Gravitational potential energy", latex: "PE = -\\frac{GMm}{R + h}" },
    { label: "Escape velocity", latex: "v_{esc} = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} = 11.2\\ \\text{km/s}" },
  ],
  derivations: [
    {
      title: "Inverse square law from Kepler's third law",
      steps: [
        "A planet in uniform circular motion needs a centripetal force \\(F = \\frac{mv^2}{r}\\), with \\(v = \\frac{2\\pi r}{T}\\).",
        "So \\(F = \\frac{4\\pi^2 mr}{T^2} = \\frac{4\\pi^2 m}{r^2} \\times \\frac{r^3}{T^2}\\).",
        "Kepler's third law: \\(\\frac{T^2}{r^3} = K\\), a constant. So \\(F = \\frac{4\\pi^2 m}{K} \\times \\frac{1}{r^2}\\), that is \\(F \\propto \\frac{1}{r^2}\\).",
      ],
    },
    {
      title: "Value of g on the surface of the earth",
      steps: [
        "Force on mass \\(m\\) at distance \\(r\\) from the earth's centre: \\(F = \\frac{GMm}{r^2}\\). By Newton's second law, \\(F = mg\\).",
        "So \\(mg = \\frac{GMm}{r^2}\\), giving \\(g = \\frac{GM}{r^2}\\).",
        "On the surface \\(r = R\\): \\(g = \\frac{GM}{R^2} = \\frac{6.67 \\times 10^{-11} \\times 6 \\times 10^{24}}{(6.4 \\times 10^6)^2} = 9.77\\) m/s², about 9.8 m/s².",
      ],
    },
    {
      title: "Escape velocity, by conservation of energy",
      steps: [
        "On the surface: KE = \\(\\frac{1}{2}mv_{esc}^2\\), PE = \\(-\\frac{GMm}{R}\\).",
        "At infinite distance the object just escapes: KE = 0 and PE = 0, so total energy is zero.",
        "Energy is conserved: \\(\\frac{1}{2}mv_{esc}^2 - \\frac{GMm}{R} = 0\\).",
        "So \\(v_{esc} = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR} = \\sqrt{2 \\times 9.8 \\times 6.4 \\times 10^6}\\) = 11.2 km/s.",
      ],
    },
  ],
  diagrams: [
    {
      title: "Orbit of a planet moving around the Sun (Kepler's laws)",
      labels: ["elliptical orbit", "Sun S at one focus", "equal-area sectors", "positions A, B, C, D", "planet"],
    },
    {
      title: "Gravitational force between two objects",
      labels: ["masses m1 and m2", "distance d between centres", "force F on each, towards the other"],
    },
  ],
  mostAsked: [
    { topic: "Free fall: define it, when it is possible, or a numerical (time, velocity, g on a planet)", marks: 2, years: [2025, 2024, 2022, 2019] },
    { topic: "Mass and weight: distinguish, units, why weight changes from place to place", marks: 2, years: [2026, 2025, 2023, 2020] },
    { topic: "Escape velocity: explain it, its formula, or calculate it on the moon", years: [2026, 2025, 2023] },
    { topic: "State Kepler's three laws (often from the orbit figure)", marks: 3, years: [2026, 2022, 2020] },
    { topic: "Factors g depends on, or g when the earth's mass and radius change", marks: 3, years: [2024, 2019] },
    { topic: "Newton's universal law of gravitation from the two-masses figure", years: [2024, 2019] },
    { topic: "Time a satellite takes for one revolution", marks: 3, years: [2026, 2024] },
    { topic: "Name the force towards the centre of a circle (centripetal force)", marks: 1, years: [2026] },
  ],
  mistakes: [
    {
      title: "Writing weight in kilograms",
      body: "Weight is a force: its unit is the newton. Kilogram is the unit of mass.",
    },
    {
      title: "Mixing up G and g",
      body: "G is a universal constant, the same everywhere. g changes with place, height and depth, and is zero at the centre of the earth.",
    },
    {
      title: "Saying g increases as you go deeper",
      body: "Inside the earth r decreases, but so does the mass M that pulls. Together, g decreases with depth.",
    },
    {
      title: "Forgetting R + h for a satellite",
      body: "Distances are from the centre of the earth. A satellite at height h moves in a circle of radius \\(R + h\\). Convert km to m first.",
    },
    {
      title: "Thinking escape velocity depends on the object's mass",
      body: "\\(v_{esc} = \\sqrt{2GM/R}\\) has no \\(m\\) in it. It depends on the planet's mass and radius only.",
    },
  ],
};

export default sheet;
