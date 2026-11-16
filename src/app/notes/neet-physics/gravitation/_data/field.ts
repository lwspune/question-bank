import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_GR_FIELD_NOTE: SubtopicNote = {
  subtopicName: "Gravitational Field and g",
  title: "Gravitational Field and g",
  oneLineDefinition:
    "Newton's law of gravitation, the field as force per unit mass, g = GM/R² on the surface, and how g falls off above the surface and below it.",
  whyItMatters:
    "Four NEET questions from 2022 to 2025. Two use the field at the surface: the field intensity from the force on a 60 g body (2022), and g on a planet with a tenth of the earth's mass and half its diameter (2024). Two use g at a height: a body's weight at a height of one third of the earth's radius (2025), and the change in weight of a falling body between two heights read from a figure (Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphgr-field",
      name: "Newton's law, field intensity and g",
      intuition:
        "Every two masses pull on each other. The pull grows with both masses and falls fast with distance: double the distance and the pull drops to a quarter. The field at a point tells you how hard gravity pulls on each kilogram placed there. On the earth's surface that pull per kilogram is what we call g.",
      definition:
        "- Newton's law: \\(F = \\dfrac{Gm_1m_2}{r^{2}}\\), always attractive, along the line joining the two masses. \\(G = 6.67 \\times 10^{-11}\\ \\text{N m}^{2}\\,\\text{kg}^{-2}\\).\n" +
        "- **Gravitational field intensity** is the force on unit mass: \\(E = \\dfrac{F}{m}\\), in N/kg. Due to a point mass M at distance r: \\(E = \\dfrac{GM}{r^{2}}\\), pointing towards M.\n" +
        "- A uniform sphere such as the earth pulls a mass outside it as if all its mass sat at its centre.\n" +
        "- On the surface: \\(g = \\dfrac{GM}{R^{2}}\\). With \\(M = \\dfrac{4}{3}\\pi R^{3}\\rho\\): \\(g = \\dfrac{4}{3}\\pi G\\rho R\\).\n" +
        "- So \\(g \\propto \\dfrac{M}{R^{2}}\\), and for planets of the same density \\(g \\propto R\\).",
      formula: {
        label: "Law of gravitation and g",
        latex: "F = \\frac{Gm_1m_2}{r^{2}}, \\qquad E = \\frac{F}{m} = \\frac{GM}{r^{2}}, \\qquad g = \\frac{GM}{R^{2}} = \\frac{4}{3}\\pi G\\rho R",
        symbols: [
          { symbol: "\\(G\\)", meaning: "universal gravitational constant" },
          { symbol: "\\(E\\)", meaning: "gravitational field intensity" },
          { symbol: "\\(\\rho\\)", meaning: "mean density of the planet" },
        ],
      },
      authoredExample: {
        prompt:
          "A body of mass 200 g feels a gravitational force of 0.5 N at a point. What is the field intensity there, and what force would a 5 kg body feel at the same point?",
        steps: [
          "Change grams to kilograms: 200 g = 0.2 kg.",
          "\\(E = \\dfrac{F}{m} = \\dfrac{0.5}{0.2} = 2.5\\ \\text{N/kg}\\).",
          "For the 5 kg body: \\(F = mE = 5 \\times 2.5 = 12.5\\ \\text{N}\\).",
        ],
        answer: "2.5 N/kg, and 12.5 N on the 5 kg body",
      },
      selfCheckExample: {
        prompt:
          "A planet has the same density as the earth but half its radius. What is g on its surface? (g on the earth is 9.8 m/s².)",
        steps: [
          "\\(g = \\dfrac{4}{3}\\pi G\\rho R\\), so with the same density \\(g \\propto R\\).",
          "Half the radius gives half of g: \\(\\dfrac{9.8}{2} = 4.9\\ \\text{m/s}^{2}\\).",
        ],
        answer: "4.9 m/s²",
      },
      practiceSet: [
        { prompt: "What is the SI unit of gravitational field intensity?", answer: "N/kg (the same as m/s²)" },
        { prompt: "The distance between two point masses is tripled. By what factor does the force between them change?", answer: "It becomes 1/9 of its value" },
        { prompt: "Write g at the earth's surface in terms of G, the earth's mass M and its radius R.", answer: "\\(g = GM/R^{2}\\)" },
        { prompt: "Two point masses of 1 kg each are 1 m apart. What is the gravitational force between them?", answer: "\\(6.67 \\times 10^{-11}\\ \\text{N}\\)" },
      ],
      pyqExampleId: "a34bbe67-5d6f-4921-85af-21c86b8f6074",
      traps: [
        {
          title: "Change grams to kilograms first",
          body: "Field intensity is force per kilogram. A force of 3 N on a 60 g body gives \\(3/0.06 = 50\\ \\text{N/kg}\\); dividing by 60 gives a value a thousand times too small.",
        },
        {
          title: "Half the diameter is half the radius",
          body: "In \\(g = GM/R^{2}\\) the radius is squared. A planet with half the earth's radius and the same mass has four times the earth's g, not twice.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphgr-height",
      name: "g at a height and at a depth",
      intuition:
        "Climb above the earth and you move away from its centre, so the pull weakens as one over the distance squared. Dig below the surface and the shell of earth above you pulls you no net way at all, so only the smaller ball of earth beneath you counts. Either way g is largest on the surface, and at the centre of the earth it is zero.",
      definition:
        "- At a height h: \\(g_h = \\dfrac{GM}{(R + h)^{2}} = g\\left(\\dfrac{R}{R + h}\\right)^{2}\\). A body's weight changes by the same factor.\n" +
        "- For a small height (h much less than R): \\(g_h \\approx g\\left(1 - \\dfrac{2h}{R}\\right)\\).\n" +
        "- At a depth d: \\(g_d = g\\left(1 - \\dfrac{d}{R}\\right)\\). It falls in a straight line to zero at the centre.\n" +
        "- So for small h, g at a height h equals g at a depth \\(d = 2h\\).",
      formula: {
        label: "g above and below the surface",
        latex: "g_h = g\\left(\\frac{R}{R + h}\\right)^{2} \\approx g\\left(1 - \\frac{2h}{R}\\right), \\qquad g_d = g\\left(1 - \\frac{d}{R}\\right)",
        symbols: [
          { symbol: "\\(h\\)", meaning: "height above the surface" },
          { symbol: "\\(d\\)", meaning: "depth below the surface" },
          { symbol: "\\(R\\)", meaning: "radius of the earth" },
        ],
      },
      authoredExample: {
        prompt: "At what height above the earth's surface does g fall to one quarter of its value on the surface? Give it in terms of the earth's radius R.",
        steps: [
          "\\(\\left(\\dfrac{R}{R + h}\\right)^{2} = \\dfrac{1}{4}\\), so \\(\\dfrac{R}{R + h} = \\dfrac{1}{2}\\).",
          "\\(R + h = 2R\\), so \\(h = R\\).",
        ],
        answer: "h = R",
      },
      selfCheckExample: {
        prompt: "At what depth below the earth's surface is g equal to 75% of its value on the surface? Take R = 6400 km.",
        steps: [
          "\\(1 - \\dfrac{d}{R} = 0.75\\), so \\(\\dfrac{d}{R} = 0.25\\).",
          "\\(d = 0.25 \\times 6400 = 1600\\ \\text{km}\\).",
        ],
        answer: "1600 km",
      },
      practiceSet: [
        { prompt: "What is the value of g at the centre of the earth?", answer: "Zero" },
        { prompt: "Write g at a small height h above the surface (h much less than R) in terms of g, h and R.", answer: "\\(g_h = g(1 - 2h/R)\\)" },
        { prompt: "At what depth below the surface is g half its surface value? Give it in terms of the earth's radius R.", answer: "R/2" },
        { prompt: "g at a small height h equals g at a depth d below the surface. How is d related to h?", answer: "\\(d = 2h\\)" },
      ],
      pyqExampleId: "a730ab61-0fd8-4087-9b55-b3479b582875",
      traps: [
        {
          title: "Measure from the centre, not the surface",
          body: "In \\(g_h = GM/(R + h)^{2}\\) the distance is from the earth's centre. A body at a height of 2R is 3R from the centre, so g there is g/9, not g/4.",
        },
        {
          title: "The 1 minus 2h/R form is for small heights only",
          body: "At a height of R/3 the short form gives \\(g/3\\), but the exact value is \\(g(3/4)^{2} = 9g/16\\). Use the exact formula whenever h is a sizeable part of R.",
        },
        {
          title: "Height and depth fall off differently",
          body: "Below the surface g falls in a straight line, \\(g(1 - d/R)\\), and reaches zero at the centre. Above the surface it falls as one over the distance squared and never reaches zero.",
        },
      ],
    },
  ],
};
