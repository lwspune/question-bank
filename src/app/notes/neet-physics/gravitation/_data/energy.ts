import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_GR_ENERGY_NOTE: SubtopicNote = {
  subtopicName: "Potential Energy and Escape Speed",
  title: "Potential Energy and Escape Speed",
  oneLineDefinition:
    "Gravitational potential energy U = −GMm/r and potential V = −GM/r, the work to lift a body far from the surface, and the escape speed √(2GM/R) that frees a body from a planet.",
  whyItMatters:
    "Seven NEET questions from 2021 to 2026, the most of any page. Three are about potential: a match of the dimensions of G, potential energy, potential and field intensity (2022), the potential where the fields of two masses cancel (2023), and the work to raise a mass to a height R (2026). Four are about escape: a planet with the same density and four times the radius (2021), one with 9 times the mass and 16 times the radius (Re-NEET 2024), two planets of equal mass and different radii (Re-NEET 2026), and how high a body launched below escape speed rises (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphgr-potential",
      name: "Gravitational potential energy and potential",
      intuition:
        "Two masses far apart are taken to have zero potential energy. As gravity pulls them together it does work, so their potential energy drops below zero. That is why gravitational potential energy is negative, and why you must do work to pull two masses apart. Near the surface the change in this energy is just mgh, but far from the surface you need the full formula.",
      definition:
        "- Potential energy of masses M and m a distance r apart: \\(U = -\\dfrac{GMm}{r}\\), zero at infinity.\n" +
        "- Work to lift m from the surface to a height h: \\(W = GMm\\left(\\dfrac{1}{R} - \\dfrac{1}{R + h}\\right) = \\dfrac{mgRh}{R + h}\\), using \\(GM = gR^{2}\\). For h much less than R this is mgh.\n" +
        "- **Gravitational potential** is potential energy per unit mass: \\(V = \\dfrac{U}{m} = -\\dfrac{GM}{r}\\), in J/kg. Potentials of several masses add as plain numbers.\n" +
        "- The field of two masses is zero where their pulls cancel: \\(\\dfrac{Gm_1}{x^{2}} = \\dfrac{Gm_2}{(d - x)^{2}}\\). The potential there is not zero.\n" +
        "- Dimensions: G is \\([M^{-1}L^{3}T^{-2}]\\), potential energy \\([ML^{2}T^{-2}]\\), potential \\([L^{2}T^{-2}]\\), field intensity \\([LT^{-2}]\\).",
      formula: {
        label: "Potential energy and potential",
        latex: "U = -\\frac{GMm}{r}, \\qquad V = -\\frac{GM}{r}, \\qquad W_{R \\to R + h} = \\frac{mgRh}{R + h}",
        symbols: [
          { symbol: "\\(U\\)", meaning: "gravitational potential energy" },
          { symbol: "\\(V\\)", meaning: "gravitational potential" },
          { symbol: "\\(r\\)", meaning: "distance between the centres" },
        ],
      },
      authoredExample: {
        prompt:
          "Two point masses M and 4M are a distance d apart. Where on the line joining them is the gravitational field zero, and what is the gravitational potential at that point?",
        steps: [
          "Let the point be x from M: \\(\\dfrac{GM}{x^{2}} = \\dfrac{4GM}{(d - x)^{2}}\\), so \\(\\dfrac{d - x}{x} = 2\\) and \\(x = \\dfrac{d}{3}\\).",
          "Potential adds as numbers: \\(V = -\\dfrac{GM}{d/3} - \\dfrac{4GM}{2d/3}\\).",
          "\\(V = -\\dfrac{3GM}{d} - \\dfrac{6GM}{d} = -\\dfrac{9GM}{d}\\).",
        ],
        answer: "At d/3 from M, where \\(V = -\\dfrac{9GM}{d}\\)",
      },
      selfCheckExample: {
        prompt:
          "What is the least work needed to take a body of mass m from the earth's surface to infinity? Give it in terms of m, g and the earth's radius R.",
        steps: [
          "\\(W = U_\\infty - U_R = 0 - \\left(-\\dfrac{GMm}{R}\\right) = \\dfrac{GMm}{R}\\).",
          "With \\(GM = gR^{2}\\): \\(W = mgR\\).",
        ],
        answer: "mgR",
      },
      practiceSet: [
        { prompt: "What are the dimensions of gravitational potential?", answer: "\\([L^{2}T^{-2}]\\)" },
        { prompt: "What are the dimensions of the gravitational constant G?", answer: "\\([M^{-1}L^{3}T^{-2}]\\)" },
        { prompt: "Write the gravitational potential at a distance r from a point mass M.", answer: "\\(V = -GM/r\\)" },
        { prompt: "Two masses have gravitational potential energy U when r apart. What is it when they are 2r apart?", answer: "U/2 (still negative, closer to zero)" },
      ],
      pyqExampleId: "8546593f-4a61-4967-95ac-bf0bd4d1a8d6",
      traps: [
        {
          title: "Gravitational potential energy is negative",
          body: "It is zero at infinity and becomes more negative as the masses come closer. Pulling them apart raises it towards zero, which takes positive work.",
        },
        {
          title: "mgh only works near the surface",
          body: "Lifting a body to a height equal to the earth's radius takes \\(mgR/2\\), not mgR. The formula mgh assumes g stays the same all the way up.",
        },
        {
          title: "Zero field does not mean zero potential",
          body: "Where the pulls of two masses cancel, the field is zero, but each mass still adds a negative potential. Add \\(-GM/r\\) for each mass as a plain number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphgr-escape",
      name: "Escape speed",
      intuition:
        "Throw a stone up and it comes back. Throw it faster and it climbs higher before it turns. There is a launch speed at which its kinetic energy is just enough to cancel its negative potential energy, so it slows down for ever but never comes back. That is the escape speed. It depends on the planet, not on the body.",
      definition:
        "- Escape speed from the surface: \\(\\dfrac{1}{2}mv_e^{2} = \\dfrac{GMm}{R}\\), so \\(v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR}\\). For the earth it is about 11.2 km/s.\n" +
        "- It does not depend on the mass of the body.\n" +
        "- Between planets: \\(v_e \\propto \\sqrt{\\dfrac{M}{R}}\\). For the same density, \\(M \\propto R^{3}\\), so \\(v_e \\propto R\\).\n" +
        "- A body launched at a speed v less than \\(v_e\\) rises to a height h given by \\(\\dfrac{1}{2}mv^{2} = GMm\\left(\\dfrac{1}{R} - \\dfrac{1}{R + h}\\right)\\). With \\(v = kv_e\\): \\(h = \\dfrac{Rk^{2}}{1 - k^{2}}\\).",
      formula: {
        label: "Escape speed",
        latex: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}, \\qquad h = \\frac{Rk^{2}}{1 - k^{2}} \\ \\text{for}\\ v = kv_e",
        symbols: [
          { symbol: "\\(v_e\\)", meaning: "escape speed from the surface" },
          { symbol: "\\(k\\)", meaning: "launch speed as a fraction of the escape speed" },
        ],
      },
      authoredExample: {
        prompt:
          "On a planet g = 4 m/s² and the radius is \\(2 \\times 10^{6}\\) m. What is the escape speed from its surface?",
        steps: [
          "\\(v_e = \\sqrt{2gR} = \\sqrt{2 \\times 4 \\times 2 \\times 10^{6}}\\).",
          "\\(v_e = \\sqrt{1.6 \\times 10^{7}} = 4 \\times 10^{3}\\ \\text{m/s}\\).",
        ],
        answer: "4 km/s",
      },
      selfCheckExample: {
        prompt:
          "A body is launched straight up from the earth's surface at half the escape speed. How high above the surface does it rise? Give it in terms of the earth's radius R.",
        steps: [
          "Here \\(k = \\dfrac{1}{2}\\), so \\(k^{2} = \\dfrac{1}{4}\\).",
          "\\(h = \\dfrac{R \\times \\frac{1}{4}}{1 - \\frac{1}{4}} = \\dfrac{R}{3}\\).",
        ],
        answer: "R/3",
      },
      practiceSet: [
        { prompt: "Write the escape speed from a planet's surface in terms of g and its radius R.", answer: "\\(v_e = \\sqrt{2gR}\\)" },
        { prompt: "Does the escape speed from the earth depend on the mass of the body thrown?", answer: "No" },
        { prompt: "What is the escape speed from the earth's surface, roughly?", answer: "About 11.2 km/s" },
        { prompt: "Two planets have the same density, and one has three times the radius of the other. Ratio of their escape speeds, larger planet to smaller?", answer: "3 : 1" },
      ],
      pyqExampleId: "81a98ef9-c3c3-4408-b636-fb35f7b83b1c",
      traps: [
        {
          title: "Mass of the body does not matter",
          body: "A heavier rocket needs more energy to escape, but the same speed. The mass m cancels from \\(\\tfrac{1}{2}mv_e^{2} = GMm/R\\).",
        },
        {
          title: "Keep the square root",
          body: "\\(v_e \\propto \\sqrt{M/R}\\). A planet with four times the earth's mass and the same radius has twice the earth's escape speed, not four times.",
        },
        {
          title: "Same density means v grows with R itself",
          body: "When the density is the same, the mass grows as \\(R^{3}\\), so \\(v_e \\propto R\\), not \\(\\sqrt{R}\\).",
        },
        {
          title: "v squared over 2g is only for slow throws",
          body: "A body thrown at half the escape speed rises to R/3, not the R/4 that \\(v^{2}/2g\\) gives. Fast launches climb where g is weaker, so use energy with \\(-GMm/r\\).",
        },
      ],
    },
  ],
};
