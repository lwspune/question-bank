import type { SubtopicNote } from "@/app/notes/_types";

export const HEIGHT_GRAV_NOTE: SubtopicNote = {
  subtopicName: "Acceleration due to Gravity: Surface and Height",
  title: "Acceleration due to Gravity: Surface and Height",
  oneLineDefinition:
    "On the surface g = GM/R² = (4/3)πGρR; at height h it falls as g/(1 + h/R)², which is close to g(1 − 2h/R) only when h is small.",
  whyItMatters:
    "Sixteen PYQs, fifteen of them multiple choice, and one from 2026. Six compare g on planets of different mass, radius or density; ten find g or a weight at some height above the surface. All of them are ratio questions: write g as a fraction of its surface value and the arithmetic is one line.",
  concepts: [
    // C1 — g on the surface of a planet
    {
      kind: "formula" as const,
      slug: "jpgrav-surface-g",
      name: "g on the surface: mass, radius and density",
      intuition:
        "Surface gravity depends on how much mass there is and how far the surface is from the centre. If you are told the mass, use \\(GM/R^{2}\\). If you are told the density, replace M by \\(\\tfrac{4}{3}\\pi R^{3}\\rho\\) and g becomes proportional to \\(\\rho R\\). Which form to use depends only on which quantity the question holds fixed.",
      definition:
        "- \\(g = \\dfrac{GM}{R^{2}} = \\dfrac{4}{3}\\pi G\\rho R\\).\n" +
        "- Same mass: \\(g \\propto \\dfrac{1}{R^{2}}\\). Halving the diameter (or the radius) makes g four times larger.\n" +
        "- Same density: \\(g \\propto R\\), and since \\(M \\propto R^{3}\\), \\(g \\propto M^{1/3}\\).\n" +
        "- Two planets in general: \\(\\dfrac{g_1}{g_2} = \\dfrac{\\rho_1R_1}{\\rho_2R_2}\\).\n" +
        "- A small change with mass fixed: \\(\\dfrac{\\Delta g}{g} = -2\\dfrac{\\Delta R}{R}\\). The radius shrinking by 1% raises g by 2%.\n" +
        "- Weight mg changes from planet to planet; mass does not.",
      formula: {
        label: "Surface gravity",
        latex: "g = \\frac{GM}{R^{2}} = \\frac{4}{3}\\pi G\\rho R",
      },
      authoredExample: {
        prompt:
          "A planet has three times the earth's radius and two thirds of the earth's average density. Find g on its surface. Take g on earth as 9.8 m/s².",
        steps: [
          "Density is given, so use \\(g \\propto \\rho R\\).",
          "\\(\\dfrac{g_p}{g_e} = \\dfrac{2}{3} \\times 3 = 2\\).",
          "\\(g_p = 2 \\times 9.8\\).",
        ],
        answer: "\\(19.6\\ \\text{m/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A planet has 27 times the earth's mass and the same average density. A body weighs 50 N on earth. What does it weigh on the planet?",
        steps: [
          "Same density, so \\(M \\propto R^{3}\\): the radius is \\(27^{1/3} = 3\\) times the earth's.",
          "Same density, so \\(g \\propto R\\): g is 3 times larger.",
          "Weight \\(= 3 \\times 50\\).",
        ],
        answer: "150 N",
      },
      practiceSet: [
        { prompt: "The earth's radius doubles and its mass stays the same. New g?", answer: "\\(\\dfrac{g}{4}\\)" },
        { prompt: "The earth's mass doubles and its radius stays the same. New g?", answer: "\\(2g\\)" },
        { prompt: "A planet has the earth's density and half its radius. Its g?", answer: "\\(\\dfrac{g}{2}\\)" },
        { prompt: "The radius shrinks by 1% with mass unchanged. Change in g?", answer: "An increase of 2%" },
      ],
      pyqExampleId: "82ba1418-7877-4ce4-81b2-9b2cd7877059", // 13 Apr 2023: radii R, 1.5R, densities ρ, ρ/2 → 3 : 4
      traps: [
        {
          title: "Same density is not same mass",
          body: "With density fixed, a bigger planet has MORE gravity (g ∝ R). The 1/R² rule holds only when the mass is fixed. Read which quantity the question keeps constant.",
        },
        {
          title: "A diameter changes in the same ratio as the radius",
          body: "'The diameter is reduced to one third' means R becomes R/3, so with the same mass g becomes 9g. Do not halve the ratio because the word was diameter.",
        },
      ],
    },

    // C2 — g at a height
    {
      kind: "formula" as const,
      slug: "jpgrav-g-height",
      name: "g at a height above the surface",
      intuition:
        "Above the surface the whole earth still acts as a point mass at its centre, so g falls as the inverse square of the distance from the CENTRE. Write that distance as \\(R + h\\) and compare it with R. Only when h is a small fraction of R may you use the straight-line approximation.",
      definition:
        "- \\(g_h = \\dfrac{GM}{(R + h)^{2}} = \\dfrac{g}{(1 + h/R)^{2}}\\).\n" +
        "- Useful values: \\(h = R/4 \\to \\tfrac{16}{25}g\\); \\(h = R/2 \\to \\tfrac{4}{9}g\\); \\(h = R \\to \\tfrac{1}{4}g\\); \\(h = 2R \\to \\tfrac{1}{9}g\\); \\(h = 9R \\to \\tfrac{1}{100}g\\).\n" +
        "- To make g fall to \\(g/n\\): \\(1 + h/R = \\sqrt{n}\\), so \\(h = (\\sqrt{n} - 1)R\\).\n" +
        "- Small heights, \\(h \\ll R\\): \\(g_h \\approx g\\left(1 - \\dfrac{2h}{R}\\right)\\); the percentage fall is \\(\\dfrac{2h}{R} \\times 100\\).\n" +
        "- A distance 'from the centre' is r; a height 'above the surface' is \\(h = r - R\\).",
      formula: {
        label: "g at height h",
        latex: "g_h = \\frac{g}{(1 + h/R)^{2}} \\approx g\\left(1 - \\frac{2h}{R}\\right)\\ \\ (h \\ll R)",
      },
      authoredExample: {
        prompt:
          "A body weighs 72 N on the earth's surface. What does it weigh at a height equal to half the earth's radius?",
        steps: [
          "\\(h = R/2\\) is not small, so use the exact formula.",
          "\\(\\dfrac{g_h}{g} = \\dfrac{1}{(1 + 1/2)^{2}} = \\dfrac{4}{9}\\).",
          "The mass is unchanged, so the weight scales the same way: \\(\\dfrac{4}{9} \\times 72 = 32\\).",
        ],
        answer: "32 N",
      },
      selfCheckExample: {
        prompt:
          "By what percentage does a body's weight fall when it is taken 64 km above the surface? Take R = 6400 km.",
        steps: [
          "\\(h/R = 0.01\\), which is small, so use \\(\\dfrac{\\Delta g}{g} = \\dfrac{2h}{R}\\).",
          "\\(2 \\times 0.01 = 0.02\\).",
        ],
        answer: "2%",
      },
      practiceSet: [
        { prompt: "g at a height equal to the earth's radius?", answer: "\\(\\dfrac{g}{4}\\)" },
        { prompt: "g at a distance 3R from the earth's CENTRE?", answer: "\\(\\dfrac{g}{9}\\)" },
        { prompt: "At what height does g fall to \\(g/16\\)?", answer: "\\(3R\\)" },
        { prompt: "g at a height \\(R/4\\)?", answer: "\\(\\dfrac{16g}{25}\\)" },
      ],
      pyqExampleId: "eaafc429-4278-45f2-b616-0e1ba02bbdbc", // 4 Apr 2026 S2: height at which g becomes g/9 → 2R
      traps: [
        {
          title: "From the centre or from the surface?",
          body: "A body '2R from the surface' is 3R from the centre, so g is g/9. A body '2R from the centre' is at height R, so g is g/4. Read the phrase before you write r.",
        },
        {
          title: "A height of one diameter is 2R",
          body: "A point whose height equals the earth's diameter is 3R from the centre, so g there is g/9, not g/4.",
        },
        {
          title: "The 2h/R rule fails for large heights",
          body: "At h = R/2 the approximation g(1 − 2h/R) gives zero, which is absurd. Use g/(1 + h/R)² unless h is a few percent of R.",
        },
      ],
    },
  ],
};
