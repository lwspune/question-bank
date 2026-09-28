import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/gravitation";

export const VARIATION_OF_G_NOTE: SubtopicNote = {
  subtopicName: "Variation of g with Depth, Altitude, Density, and Latitude",
  title: "How g Changes: Height, Depth, Density and Spin",
  oneLineDefinition:
    "Above the surface g falls as the inverse square of the distance from the centre, below it g falls linearly to zero at the centre; a planet's surface g is proportional to its radius times its density; and the earth's spin reduces the effective g everywhere except the poles, most at the equator.",
  whyItMatters:
    "33 PYQs, one HARD — the largest page in the chapter, but mostly direct. Twenty-two put a body or a pendulum at a height or a depth: its weight, its period, the height where g falls to a fraction. " +
    "Eight compare planets by radius and density, and three ask what the earth's spin does at the equator or a latitude. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-gr-altitude-depth",
      name: "Height and Depth",
      intuition:
        "At height h, g_h = g R²/(R + h)²: at h = R it is g/4, at 2R it is g/9. The small-height form g(1 − 2h/R) is for h much smaller than R. At depth d, only the sphere of radius R − d below still pulls, so g_d = g(1 − d/R), halved at R/2 and zero at the centre. A pendulum's period goes as 1/√g, so it slows at a height and at a depth; its frequency goes as √g. A capillary rise goes as 1/g, so it grows in a mine. 'Reduced BY 64%' means g becomes 36% of its value.",
      definition:
        "- Height: \\(g_h = g\\dfrac{R^2}{(R + h)^2}\\) (\\(h = R\\) ⇒ g/4; \\(\\tfrac{1}{9}\\) ⇒ h = 2R; \\(\\tfrac{1}{n}\\) ⇒ \\(h = (\\sqrt{n} - 1)R\\)). Small h: \\(g(1 - \\tfrac{2h}{R})\\).\n" +
        "- Depth: \\(g_d = g\\left(1 - \\dfrac{d}{R}\\right)\\) (\\(\\tfrac{g}{n}\\) ⇒ \\(d = \\dfrac{R(n - 1)}{n}\\)).\n" +
        "- Weight at h = R/2: \\(\\tfrac{4}{9}W\\) (72 N ⇒ 32 N).\n" +
        "- Pendulum: \\(T \\propto \\dfrac{1}{\\sqrt{g}}\\) (h = R ⇒ 2T; h = 2R ⇒ 3T); frequency at depth R/4 ⇒ \\(\\dfrac{\\sqrt{3}}{2}n\\).\n" +
        "- Capillary rise ∝ 1/g: in a mine \\(\\dfrac{Y}{X} = \\dfrac{R}{R - d}\\).",
      formula: {
        label: "Height and depth",
        latex: "g_h = g\\frac{R^2}{(R + h)^2}, \\qquad g_d = g\\left(1 - \\frac{d}{R}\\right)",
      },
      authoredExample: {
        prompt: "At what height is g reduced by 64%?",
        steps: ["g_h = 0.36g, so R/(R + h) = 0.6.", "R + h = 5R/3, h = 2R/3."],
        answer: "2R/3",
      },
      selfCheckExample: {
        prompt: "At what depth is g half its surface value?",
        steps: ["1 − d/R = 1/2."],
        answer: "R/2",
      },
      practiceSet: [
        { prompt: "A body weighs 500 N at the surface. Depth where it weighs 250 N? (R = 6400 km)", answer: "3200 km" },
        { prompt: "A pendulum's period is T at the surface. At height R?", answer: "2T" },
      ],
      pyqExampleId: "4b9b76d7-de1a-4986-b98b-87dcb3cbb9c7",
      traps: [
        {
          title: "Using the small-height formula at large heights",
          body:
            "g(1 − 2h/R) only works for h ≪ R; at h = R it would give −g. Use g R²/(R + h)² whenever h is comparable to R.",
        },
        {
          title: "Reading 'reduced by' as 'reduced to'",
          body:
            "Reduced BY 64% leaves 36%; reduced TO 64% leaves 64%. The two give 2R/3 and R/4.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-gr-density-planets",
      name: "g on Other Planets",
      intuition:
        "With M = (4/3)πR³ρ, the surface value g = GM/R² becomes (4/3)πGρR: proportional to radius times density. A planet of the same density and three times the radius has three times the earth's g; one with twice the density and the same g must have half the radius. Written with mass and radius instead, g ∝ M/R², so twice the mass and twice the radius give g/2. The same formula turned round gives the earth's density from g: ρ = 3g/(4πGR).",
      definition:
        "- \\(g = \\dfrac{4}{3}\\pi G\\rho R\\), so \\(g \\propto \\rho R\\); \\(g \\propto \\dfrac{M}{R^2}\\).\n" +
        "- Same ρ, radius 3R ⇒ 3g; same g, density 3ρ ⇒ radius R/3.\n" +
        "- Mass and radius both doubled ⇒ g/2 ⇒ second's pendulum period \\(2\\sqrt{2}\\) s.\n" +
        "- Earth's density: \\(\\rho = \\dfrac{3g}{4\\pi GR}\\).",
      formula: {
        label: "Surface gravity",
        latex: "g = \\frac{GM}{R^2} = \\frac{4}{3}\\pi G\\rho R",
      },
      authoredExample: {
        prompt: "A planet has half the earth's radius and twice its density. Its surface g?",
        steps: ["g ∝ ρR = 2 × 1/2 = 1."],
        answer: "Same as earth's",
      },
      selfCheckExample: {
        prompt: "A planet with the earth's density has twice its radius. Surface g?",
        steps: ["g ∝ R."],
        answer: "2g",
      },
      practiceSet: [
        { prompt: "Radii x : y and densities m : n. Ratio of surface g?", answer: "mx : ny" },
      ],
      pyqExampleId: "2e11cc64-2b5e-4a31-92a9-00854d82a3cb",
      traps: [
        {
          title: "Using g ∝ 1/R² at fixed density",
          body:
            "1/R² holds for a fixed MASS. At a fixed density the mass grows as R³, so g grows as R.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-gr-rotation-latitude",
      name: "The Earth's Spin and Latitude",
      intuition:
        "A body on the spinning earth needs part of gravity to keep it moving in a circle, so the effective g at latitude λ is g − Rω²cos²λ: reduced most at the equator (by Rω²) and not at all at the poles. The difference between the equator and latitude 30° is Rω²(1 − cos²30°) = Rω²/4. A body at the equator would weigh nothing if Rω² = g, which needs ω = √(g/R) ≈ 1/800 rad/s.",
      definition:
        "- \\(g_\\lambda = g - R\\omega^2\\cos^2\\lambda\\); equator \\(g - R\\omega^2\\), poles g.\n" +
        "- \\(|g_{\\text{eq}} - g_{30^\\circ}| = \\dfrac{1}{4}\\omega^2R\\).\n" +
        "- Weightless at equator: \\(\\omega = \\sqrt{\\dfrac{g}{R}}\\) ≈ 1/800 rad/s; weight \\(\\tfrac{3}{5}\\) ⇒ \\(\\omega = \\sqrt{\\dfrac{2g}{5R}}\\).",
      formula: {
        label: "Effective g with spin",
        latex: "g_\\lambda = g - R\\omega^2\\cos^2\\lambda",
      },
      authoredExample: {
        prompt: "How fast would the earth have to spin for a person at the equator to weigh half as much?",
        steps: ["g − Rω² = g/2.", "ω = √(g/2R)."],
        answer: "√(g/2R)",
      },
      selfCheckExample: {
        prompt: "Where does the earth's spin not change the effective g at all?",
        steps: ["cos 90° = 0."],
        answer: "At the poles",
      },
      practiceSet: [
        { prompt: "g − g at latitude 30°, in terms of ω and R?", answer: "ω²R/4" },
      ],
      pyqExampleId: "a6bdf873-7308-4fe8-ae6f-f8a0ca31fb4d",
      traps: [
        {
          title: "Using cos λ instead of cos²λ",
          body:
            "The reduction is Rω²cos²λ: one cos for the smaller circle's radius, one for the component along gravity. At 30° that is 3/4 of Rω², not √3/2.",
        },
      ],
    },
  ],
  related: [
    { label: "Newton's Law — the field of a sphere", href: `${BASE}/cetp-gr-newton-law` },
    { label: "Energy and Escape — lifting against a falling g", href: `${BASE}/cetp-gr-energy-escape` },
  ],
};
