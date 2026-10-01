import type { SubtopicNote } from "@/app/notes/_types";

export const KEPLER_GRAV_NOTE: SubtopicNote = {
  subtopicName: "Kepler's Laws of Planetary Motion",
  title: "Kepler's Laws of Planetary Motion",
  oneLineDefinition:
    "Orbits are ellipses with the sun at a focus, the line to the sun sweeps equal areas in equal times, and T² is proportional to r³/M for the central mass M.",
  whyItMatters:
    "Twenty-four PYQs, twenty-two of them multiple choice, and one from 2026. Seventeen use the third law, mostly as a ratio of two periods; seven use the second law or the shape of the orbit. Four are statement questions. Most of the ratio questions take one line once you write T ∝ √(r³/M).",
  concepts: [
    // C1 — the third law
    {
      kind: "formula" as const,
      slug: "jpgrav-third-law",
      name: "Third law: period and orbit radius",
      intuition:
        "From \\(GMm/r^{2} = m(2\\pi/T)^{2}r\\), the square of the period is proportional to the cube of the radius, divided by the mass of the body being orbited. The orbiting body's own mass drops out. Almost every question compares two orbits, so write the ratio and let the constants cancel.",
      definition:
        "- \\(T^{2} = \\dfrac{4\\pi^{2}}{GM}r^{3}\\); for an ellipse, r is the semi-major axis.\n" +
        "- Same central mass: \\(\\dfrac{T_2}{T_1} = \\left(\\dfrac{r_2}{r_1}\\right)^{3/2}\\). Radius \\(\\times 4 \\to T \\times 8\\); radius \\(\\times 9 \\to T \\times 27\\); radius \\(\\times 3 \\to T \\times 3\\sqrt{3}\\).\n" +
        "- Different central masses: \\(T \\propto \\sqrt{r^{3}/M}\\).\n" +
        "- Small change: \\(\\dfrac{\\Delta T}{T} = \\dfrac{3}{2}\\dfrac{\\Delta r}{r}\\).\n" +
        "- Mass of the central body from a moon's orbit: \\(M = \\dfrac{4\\pi^{2}r^{3}}{GT^{2}}\\).\n" +
        "- A force \\(F \\propto r^{-n}\\) gives \\(T^{2} \\propto r^{n+1}\\); the inverse square (n = 2) gives Kepler's \\(r^{3}\\).\n" +
        "- Two coplanar satellites going the same way: at closest approach their relative angular speed is \\(\\dfrac{|v_2 - v_1|}{r_2 - r_1}\\).",
      formula: {
        label: "Kepler's third law",
        latex: "T^{2} = \\frac{4\\pi^{2}}{GM}r^{3} \\qquad \\frac{T_2}{T_1} = \\left(\\frac{r_2}{r_1}\\right)^{3/2}\\sqrt{\\frac{M_1}{M_2}}",
      },
      authoredExample: {
        prompt:
          "A moon circles planet X, of mass M, at radius r once every 10 days. A moon of planet Y, of mass 9M, circles at radius 4r. Find its period.",
        steps: [
          "\\(T \\propto \\sqrt{\\dfrac{r^{3}}{M}}\\).",
          "\\(\\dfrac{T_Y}{T_X} = \\sqrt{\\dfrac{(4r)^{3}}{9M} \\cdot \\dfrac{M}{r^{3}}} = \\sqrt{\\dfrac{64}{9}} = \\dfrac{8}{3}\\).",
          "\\(T_Y = \\dfrac{8}{3} \\times 10\\) days.",
        ],
        answer: "About 26.7 days",
      },
      selfCheckExample: {
        prompt:
          "The radius of a satellite's orbit grows by 2%. By what percentage does its period change?",
        steps: [
          "\\(\\dfrac{\\Delta T}{T} = \\dfrac{3}{2} \\times 2\\%\\).",
        ],
        answer: "An increase of 3%",
      },
      practiceSet: [
        { prompt: "A satellite's orbit radius is made 4 times larger. New period?", answer: "\\(8T\\)" },
        { prompt: "The moon's period is 27 days. Period of a satellite at one quarter of the moon's distance?", answer: "\\(27/8 \\approx 3.4\\) days" },
        { prompt: "A force varies as \\(1/r^{3}\\). How does T depend on r for a circular orbit?", answer: "\\(T \\propto r^{2}\\)" },
        { prompt: "Mass of a planet whose moon has period T at radius r?", answer: "\\(\\dfrac{4\\pi^{2}r^{3}}{GT^{2}}\\)" },
      ],
      pyqExampleId: "a72f071c-6420-491d-98bb-79b1ac9b57c9", // 2 Apr 2026 S1: stars 2M and 4M, radii R and 2R → ratio 2
      traps: [
        {
          title: "The central mass matters; the planet's mass does not",
          body: "T depends on the mass being orbited. A heavier planet in the same orbit has the same period. When two different stars or planets are involved, include √(1/M).",
        },
        {
          title: "Height or radius?",
          body: "Kepler's law uses the distance from the centre. A geostationary satellite 6R above the surface is at r = 7R.",
        },
        {
          title: "Raise the ratio to the power 3/2, not 3",
          body: "Halving the radius divides T by 2√2, not by 8. Square both sides only after you have written T² ∝ r³.",
        },
      ],
    },

    // C2 — first and second laws
    {
      kind: "formula" as const,
      slug: "jpgrav-areal-velocity",
      name: "First and second laws: ellipses and equal areas",
      intuition:
        "Gravity points at the sun, so it exerts no torque about the sun and the planet's angular momentum stays constant. Equal areas in equal times is that statement in geometric form. The planet must therefore move fastest when it is closest to the sun and slowest when it is farthest.",
      definition:
        "- First law: every orbit is an ellipse with the sun at one focus. The force is towards the sun, proportional to the product of the masses and to \\(1/r^{2}\\).\n" +
        "- Second law: \\(\\dfrac{dA}{dt} = \\dfrac{L}{2m}\\), a constant.\n" +
        "- At the nearest and farthest points the velocity is perpendicular to the radius, so \\(v_{\\max}r_{\\min} = v_{\\min}r_{\\max}\\).\n" +
        "- The speed changes round the orbit; the areal velocity and the angular momentum do not.\n" +
        "- Areal velocity is not proportional to the speed: it depends on the component of velocity perpendicular to r, times r.",
      formula: {
        label: "Kepler's second law",
        latex: "\\frac{dA}{dt} = \\frac{L}{2m} = \\text{constant} \\qquad v_{\\max}r_{\\min} = v_{\\min}r_{\\max}",
      },
      authoredExample: {
        prompt:
          "The earth moves at 30.3 km/s when it is \\(1.47 \\times 10^{11}\\) m from the sun, its nearest point. Find its speed at its farthest point, \\(1.52 \\times 10^{11}\\) m away.",
        steps: [
          "At both points the velocity is perpendicular to the radius, so \\(v_1r_1 = v_2r_2\\).",
          "\\(v_2 = \\dfrac{30.3 \\times 1.47 \\times 10^{11}}{1.52 \\times 10^{11}} = \\dfrac{44.54}{1.52}\\).",
        ],
        answer: "About 29.3 km/s",
      },
      selfCheckExample: {
        prompt:
          "A planet of mass \\(6 \\times 10^{24}\\) kg has orbital angular momentum \\(4 \\times 10^{40}\\ \\text{kg m}^{2}/\\text{s}\\). Find its areal velocity.",
        steps: [
          "\\(\\dfrac{dA}{dt} = \\dfrac{L}{2m} = \\dfrac{4 \\times 10^{40}}{1.2 \\times 10^{25}}\\).",
        ],
        answer: "\\(3.3 \\times 10^{15}\\ \\text{m}^{2}/\\text{s}\\)",
      },
      practiceSet: [
        { prompt: "Why is a planet's angular momentum about the sun constant?", answer: "Gravity is a central force, so its torque about the sun is zero" },
        { prompt: "Ratio \\(v_{\\max}/v_{\\min}\\) in terms of the nearest and farthest distances?", answer: "\\(r_{\\max}/r_{\\min}\\)" },
        { prompt: "Is a planet's speed constant round an elliptical orbit?", answer: "No; only its areal velocity is" },
        { prompt: "Where in its orbit does a planet move fastest?", answer: "At the point nearest the sun" },
      ],
      pyqExampleId: "35bb7e28-5ff0-4cce-8ded-0dfb7666aeb5", // 2021: comet, nearest and farthest distances → 3.0 × 10³ m/s
      traps: [
        {
          title: "Fastest when nearest",
          body: "A statement that a planet is slowest near the sun is false. Constant angular momentum means a smaller r needs a larger speed.",
        },
        {
          title: "Constant areal velocity, not constant speed",
          body: "The area swept per second is fixed; the distance travelled per second is not. 'The linear speed is constant' is the incorrect statement in this pair.",
        },
      ],
    },
  ],
};
