import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/gravitation";

export const SATELLITES_NOTE: SubtopicNote = {
  subtopicName: "Satellites, Orbital Motion, and Kepler's Laws",
  title: "Satellites, Orbits and Kepler's Laws",
  oneLineDefinition:
    "A satellite in a circular orbit of radius r has gravity as its centripetal force, so its speed is √(GM/r), its period grows as r^(3/2) (Kepler's third law, T² ∝ r³), and its total energy −GMm/2r is half its potential energy.",
  whyItMatters:
    "21 PYQs, 6 of them HARD. Seventeen scale the orbital speed or period with the radius — two satellites compared, a geostationary orbit, a satellite skimming a planet of given density, a force law other than inverse square, a comet's aphelion. " +
    "Four are a satellite's energy: total energy, the energy to launch it, and ratios. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-gr-orbital-motion",
      name: "Orbital Speed, Period and Kepler's Third Law",
      intuition:
        "Setting GMm/r² equal to mv²/r gives v = √(GM/r): four times the radius, half the speed. The period 2πr/v = 2π√(r³/GM) grows as r^(3/2), so T² ∝ r³ — a period 8 times longer means an orbit 4 times larger, and a quarter the radius means an eighth of the period. Just above a planet of density ρ, T = √(3π/Gρ), independent of the planet's size. A geostationary orbit has the earth's own ω: r³ = gR²/ω². The angular momentum mvr = m√(GMr) grows as √r. If the force followed some other power, F ∝ r⁻ᵏ, the same balance gives T² ∝ r^(k+1). Two equal masses circling their midpoint at radius r are 2r apart, so v = √(Gm/4r).",
      definition:
        "- \\(v = \\sqrt{\\dfrac{GM}{r}}\\), \\(T = 2\\pi\\sqrt{\\dfrac{r^3}{GM}}\\), \\(T^2 \\propto r^3\\).\n" +
        "- At height R: \\(T = 4\\pi\\sqrt{\\dfrac{2R}{g}}\\). Close to a planet: \\(T = \\sqrt{\\dfrac{3\\pi}{G\\rho}}\\), \\(T^2\\rho = \\dfrac{3\\pi}{G}\\).\n" +
        "- Geostationary: \\(r = \\left(\\dfrac{gR^2}{\\omega^2}\\right)^{1/3}\\). Angular momentum \\(L = m\\sqrt{GMr} \\propto r^{1/2}\\).\n" +
        "- Force ∝ \\(r^{-k}\\): \\(T^2 \\propto r^{k+1}\\) (k = 7/2 ⇒ \\(r^{9/2}\\)).\n" +
        "- Stable circular orbit needs the horizontal speed to equal the critical speed.",
      formula: {
        label: "Circular orbit",
        latex: "v = \\sqrt{\\frac{GM}{r}}, \\qquad T = 2\\pi\\sqrt{\\frac{r^3}{GM}}",
      },
      authoredExample: {
        prompt: "Two satellites orbit at radii R and 9R. Ratio of their speeds and of their periods?",
        steps: ["v ∝ 1/√r: 3 : 1.", "T ∝ r^(3/2): 1 : 27."],
        answer: "Speeds 3 : 1; periods 1 : 27",
      },
      selfCheckExample: {
        prompt: "A satellite's period is 24 h. Its orbit radius is made a quarter. New period?",
        steps: ["T ∝ r^(3/2): (1/4)^(3/2) = 1/8."],
        answer: "3 h",
      },
      practiceSet: [
        { prompt: "A planet's year is 8 earth years. Ratio of orbit radii?", answer: "4" },
        { prompt: "Force ∝ R^(−5/2). T is proportional to?", answer: "R^(7/4)" },
      ],
      pyqExampleId: "81a50834-a79d-4d6e-ac90-bf772d1bab77",
      traps: [
        {
          title: "Using the height instead of the orbit radius",
          body:
            "A satellite at height R above the surface orbits at radius 2R. The period is 2π√((2R)³/gR²), not 2π√(R/g).",
        },
        {
          title: "Taking the separation as the orbit radius",
          body:
            "Two equal masses circling their midpoint are 2r apart. The force uses (2r)², the circular motion uses r.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-gr-satellite-energy",
      name: "A Satellite's Energy",
      intuition:
        "In orbit, KE = GMm/2r, PE = −GMm/r and total E = −GMm/2r: the total is half the potential energy and minus the kinetic energy. Launching from the surface to an orbit of radius r needs the difference between the orbit's total energy and the surface value −GMm/R. The energy scales as m/r, so a satellite three times heavier at a quarter the radius has twelve times the energy.",
      definition:
        "- \\(KE = \\dfrac{GMm}{2r}\\), \\(PE = -\\dfrac{GMm}{r}\\), \\(E = -\\dfrac{GMm}{2r} = \\dfrac{PE}{2} = -KE\\).\n" +
        "- Launch from the surface to altitude 2R (r = 3R): \\(\\Delta E = \\dfrac{GMm}{R} - \\dfrac{GMm}{6R} = \\dfrac{5GMm}{6R}\\).\n" +
        "- \\(|E| \\propto \\dfrac{m}{r}\\): masses 3 : 1 at r and 4r ⇒ 12 : 1.",
      formula: {
        label: "Orbital energy",
        latex: "E = -\\frac{GMm}{2r} = \\frac{U}{2} = -K",
      },
      authoredExample: {
        prompt: "Minimum energy to put a satellite of mass m from the surface into orbit at altitude R?",
        steps: ["Orbit radius 2R: E = −GMm/4R.", "ΔE = GMm/R − GMm/4R = 3GMm/4R."],
        answer: "3GMm/(4R)",
      },
      selfCheckExample: {
        prompt: "A satellite's kinetic energy is K. Its total energy?",
        steps: ["E = −K."],
        answer: "−K",
      },
      practiceSet: [
        { prompt: "Total energy of a circular-orbit satellite is half of its?", answer: "Potential energy" },
      ],
      pyqExampleId: "79f12f69-32ca-4314-820b-4c61efa30016",
      traps: [
        {
          title: "Launching with only the orbit's kinetic energy",
          body:
            "From the surface the satellite must also be lifted. The launch energy is the total orbital energy minus the surface energy −GMm/R, not GMm/2r alone.",
        },
      ],
    },
  ],
  related: [
    { label: "Energy and Escape — the energy between two distances", href: `${BASE}/cetp-gr-energy-escape` },
  ],
};
