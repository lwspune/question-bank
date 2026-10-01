import type { SubtopicNote } from "@/app/notes/_types";

export const FRINGES_WO_NOTE: SubtopicNote = {
  subtopicName: "Double Slit Fringe Width and Fringe Positions",
  title: "Double Slit Fringe Width and Fringe Positions",
  oneLineDefinition:
    "In Young's double slit the bright fringes sit at whole multiples of the fringe width β = λD/d and the dark ones halfway between, so every position question is a count of fringe widths.",
  whyItMatters:
    "Twenty-seven PYQs, sixteen of them multiple choice, and four from 2026: the largest page in the chapter. Twelve ask how the fringe width changes with the wavelength, the slit gap or the screen distance, several as true-or-false statements. Five put the whole apparatus in a liquid. Ten locate a fringe, and half of those ask where the bright fringes of two wavelengths first fall on top of each other.",
  concepts: [
    // C1 — fringe width
    {
      kind: "formula" as const,
      slug: "jpwo-fringe-width",
      name: "Fringe width and what it depends on",
      intuition:
        "Moving one fringe along the screen changes the path difference by one wavelength. The path difference grows as yd/D, so the step from one bright fringe to the next is λD/d. Longer waves, a farther screen or closer slits all spread the fringes out. The angle between fringes, λ/d, does not depend on the screen at all.",
      definition:
        "- Fringe width (bright to bright, or dark to dark): \\(\\beta = \\dfrac{\\lambda D}{d}\\).\n" +
        "- Angular fringe width: \\(\\theta = \\dfrac{\\lambda}{d}\\), independent of D.\n" +
        "- Scaling: \\(\\dfrac{\\beta_{2}}{\\beta_{1}} = \\dfrac{\\lambda_{2}}{\\lambda_{1}} \\cdot \\dfrac{D_{2}}{D_{1}} \\cdot \\dfrac{d_{1}}{d_{2}}\\).\n" +
        "- Moving the screen by \\(\\Delta D\\) changes the fringe width by \\(\\Delta\\beta = \\dfrac{\\lambda\\,\\Delta D}{d}\\).\n" +
        "- Shorter wavelength (red to violet, orange to blue) gives narrower fringes; the central fringe stays bright.\n" +
        "- If d varies with time, the widest fringes come with the smallest gap and the narrowest with the largest.",
      formula: {
        label: "Fringe width",
        latex: "\\beta = \\frac{\\lambda D}{d}, \\qquad \\theta = \\frac{\\lambda}{d}, \\qquad \\Delta\\beta = \\frac{\\lambda\\,\\Delta D}{d}",
      },
      authoredExample: {
        prompt:
          "In a double-slit set-up, d = 0.5 mm, D = 1.2 m and λ = 600 nm. Find the fringe width and the angular fringe width. The screen is then moved 30 cm closer to the slits. Find the new fringe width.",
        steps: [
          "\\(\\beta = \\dfrac{600 \\times 10^{-9} \\times 1.2}{0.5 \\times 10^{-3}} = 1.44 \\times 10^{-3}\\) m = 1.44 mm.",
          "Angular width: \\(\\dfrac{\\lambda}{d} = \\dfrac{600 \\times 10^{-9}}{0.5 \\times 10^{-3}} = 1.2 \\times 10^{-3}\\) rad.",
          "Change: \\(\\Delta\\beta = \\dfrac{600 \\times 10^{-9} \\times 0.3}{0.5 \\times 10^{-3}} = 0.36\\) mm, so the new width is 1.08 mm. The angular width does not change.",
        ],
        answer: "1.44 mm and \\(1.2 \\times 10^{-3}\\) rad; then 1.08 mm.",
      },
      selfCheckExample: {
        prompt:
          "Fringes are 1.2 mm wide with light of 600 nm. The light is changed to 450 nm and the screen distance is made 1.5 times as large. New fringe width?",
        steps: [
          "\\(\\beta_{2} = 1.2 \\times \\dfrac{450}{600} \\times 1.5\\).",
          "\\(= 1.2 \\times 0.75 \\times 1.5 = 1.35\\) mm.",
        ],
        answer: "1.35 mm",
      },
      practiceSet: [
        { prompt: "λ = 500 nm, d = 0.25 mm. Angular fringe width?", answer: "\\(2 \\times 10^{-3}\\) rad" },
        { prompt: "The screen is moved farther from the slits. What happens to the angular fringe width?", answer: "Nothing; it is λ/d" },
        { prompt: "The slit gap is increased by 25%. Percentage change in the fringe width?", answer: "A 20% decrease" },
        { prompt: "Red light is replaced by violet light. Fringes become?", answer: "Narrower; the centre stays bright" },
      ],
      pyqExampleId: "7c08f2c9-502f-49fa-a7bd-e54f63ca83fd", // 2022: 5000 Å → 6000 Å, slit gap doubled, 0.5 mm → 0.3 mm
      traps: [
        {
          title: "Angular width ignores the screen",
          body: "Moving the screen changes β but not λ/d. A statement that the angular separation grows as the screen moves away is false.",
        },
        {
          title: "β falls as d rises",
          body: "Doubling the slit gap halves the fringe width. Write the full ratio λ₂D₂d₁/(λ₁D₁d₂) and the d's cannot end up the wrong way up.",
        },
        {
          title: "A percentage change is not a ratio",
          body: "If β becomes 0.8 of its old value, the change is −20%, not 80%. Say which one the question asks for.",
        },
      ],
    },

    // C2 — apparatus in a liquid
    {
      kind: "formula" as const,
      slug: "jpwo-liquid",
      name: "The apparatus in a liquid",
      intuition:
        "Fill the space between the slits and the screen with a liquid and the light slows down by μ. Its frequency is fixed, so its wavelength shrinks by μ. Every fringe width and every angle carries λ, so all of them shrink by the same factor μ. Nothing else in the set-up changes.",
      definition:
        "- In a liquid of index μ: \\(\\lambda' = \\dfrac{\\lambda}{\\mu}\\).\n" +
        "- So \\(\\beta' = \\dfrac{\\beta}{\\mu} = \\dfrac{\\lambda D}{\\mu d}\\) and the angular width becomes \\(\\dfrac{\\lambda}{\\mu d}\\).\n" +
        "- The central fringe is still bright; the fringes simply crowd closer together.\n" +
        "- To get the old fringe width back, the screen must go \\(\\mu\\) times farther away.",
      formula: {
        label: "Fringes in a liquid",
        latex: "\\beta' = \\frac{\\beta}{\\mu} = \\frac{\\lambda D}{\\mu d}, \\qquad \\theta' = \\frac{\\lambda}{\\mu d}",
      },
      authoredExample: {
        prompt:
          "In air the fringe width is 1.6 mm. The whole apparatus is put in water of refractive index 4/3. Find the new fringe width, and the factor by which D must change to restore 1.6 mm.",
        steps: [
          "\\(\\beta' = \\dfrac{1.6}{4/3} = 1.2\\) mm.",
          "Fringe width goes as D, so D must be made \\(\\dfrac{4}{3}\\) times as large.",
        ],
        answer: "1.2 mm; D must be multiplied by 4/3.",
      },
      selfCheckExample: {
        prompt:
          "The angular fringe width in air is \\(0.30^{\\circ}\\). What is it when the apparatus is in a liquid of refractive index 1.5?",
        steps: [
          "The angular width is \\(\\lambda/d\\), and \\(\\lambda\\) falls by \\(\\mu\\).",
          "\\(\\dfrac{0.30^{\\circ}}{1.5} = 0.20^{\\circ}\\).",
        ],
        answer: "\\(0.20^{\\circ}\\)",
      },
      practiceSet: [
        { prompt: "β = 3 mm in air. In water of μ = 4/3?", answer: "2.25 mm" },
        { prompt: "β falls from 2.0 mm to 1.6 mm when the set-up is immersed. μ of the liquid?", answer: "1.25" },
        { prompt: "λ = 600 nm in air, liquid μ = 1.5, d = 1 mm, D = 1 m. Fringe width?", answer: "0.4 mm" },
        { prompt: "Is the central fringe bright or dark in the liquid?", answer: "Bright" },
      ],
      pyqExampleId: "9ef2a5ab-b77c-48cd-921d-e18f253faf35", // 2025: liquid 1.44, d = 1.5 mm, 690 nm, D = 0.72 m → 0.23 mm
      traps: [
        {
          title: "Divide by μ, do not multiply",
          body: "The wavelength shrinks in a liquid, so the fringes get narrower. An option larger than the air value is the multiply-by-μ slip.",
        },
        {
          title: "The given wavelength is the one in air",
          body: "When a question gives λ in air and asks for β in the liquid, divide λ by μ before using λD/d.",
        },
        {
          title: "Angles shrink too",
          body: "The angular width λ/d also carries λ, so it falls by μ as well. It is only the screen distance that it ignores.",
        },
      ],
    },

    // C3 — fringe positions and coincidences
    {
      kind: "formula" as const,
      slug: "jpwo-fringe-position",
      name: "Fringe positions and two wavelengths",
      intuition:
        "Count in fringe widths. The nth bright fringe is n widths from the centre; the nth dark fringe is half a width short of that. With two colours, each has its own fringe width, and their bright fringes coincide where a whole number of one wavelength equals a whole number of the other.",
      definition:
        "- nth bright fringe: \\(y_{n} = n\\beta = \\dfrac{n\\lambda D}{d}\\) (the centre is n = 0).\n" +
        "- nth dark fringe: \\(y_{n} = \\left(n - \\tfrac{1}{2}\\right)\\beta\\).\n" +
        "- Same side: subtract positions. Opposite sides: add them. The nth bright on both sides are \\(2n\\beta\\) apart.\n" +
        "- Two wavelengths: bright fringes coincide where \\(n_{1}\\lambda_{1} = n_{2}\\lambda_{2}\\). Reduce \\(\\dfrac{n_{1}}{n_{2}} = \\dfrac{\\lambda_{2}}{\\lambda_{1}}\\) to lowest terms; the least distance from the centre is \\(\\dfrac{n_{1}\\lambda_{1}D}{d}\\).\n" +
        "- A frequency question works the same way: find λ from the position, then \\(f = c/\\lambda\\).",
      formula: {
        label: "Positions and coincidence",
        latex: "y_{\\text{bright}} = \\frac{n\\lambda D}{d}, \\qquad y_{\\text{dark}} = \\left(n - \\tfrac{1}{2}\\right)\\frac{\\lambda D}{d}, \\qquad n_{1}\\lambda_{1} = n_{2}\\lambda_{2}",
      },
      authoredExample: {
        prompt:
          "Light of wavelengths 630 nm and 420 nm falls on slits 0.9 mm apart, with the screen 1.5 m away. Find the least distance from the central fringe where bright fringes of both wavelengths coincide.",
        steps: [
          "\\(\\dfrac{n_{1}}{n_{2}} = \\dfrac{\\lambda_{2}}{\\lambda_{1}} = \\dfrac{420}{630} = \\dfrac{2}{3}\\): the 2nd bright of 630 nm sits on the 3rd bright of 420 nm.",
          "\\(y = \\dfrac{2 \\times 630 \\times 10^{-9} \\times 1.5}{0.9 \\times 10^{-3}} = 2.1 \\times 10^{-3}\\) m.",
          "Check with the other colour: \\(\\dfrac{3 \\times 420 \\times 10^{-9} \\times 1.5}{0.9 \\times 10^{-3}} = 2.1 \\times 10^{-3}\\) m.",
        ],
        answer: "2.1 mm",
      },
      selfCheckExample: {
        prompt:
          "d = 0.4 mm, D = 1 m and λ = 500 nm. How far is the 2nd bright fringe on one side from the 3rd dark fringe on the other side?",
        steps: [
          "\\(\\beta = \\dfrac{500 \\times 10^{-9} \\times 1}{0.4 \\times 10^{-3}} = 1.25\\) mm.",
          "Opposite sides add: \\(2\\beta + 2.5\\beta = 4.5\\beta = 5.625\\) mm.",
        ],
        answer: "5.625 mm",
      },
      practiceSet: [
        { prompt: "The 5th bright fringe is 4 mm from the centre. Fringe width?", answer: "0.8 mm" },
        { prompt: "Distance between the 3rd bright fringes on the two sides, in fringe widths?", answer: "6β" },
        { prompt: "Distance of the 3rd dark fringe from the centre, in fringe widths?", answer: "2.5β" },
        { prompt: "Wavelengths 500 nm and 400 nm. Order of the 500 nm bright fringe that first coincides with one of 400 nm?", answer: "4th (with the 5th of 400 nm)" },
      ],
      pyqExampleId: "3d4e46ed-307a-4a0d-8d9c-e9e4a7153cf0", // 2023: 7000 Å and 5500 Å, d = 2.5 mm, D = 150 cm → 462 × 10⁻⁵ m
      traps: [
        {
          title: "The ratio flips",
          body: "n₁/n₂ = λ₂/λ₁: the longer wavelength needs the smaller order. Putting λ₁ on top gives a coincidence that does not exist.",
        },
        {
          title: "Dark fringes are half a width short",
          body: "The 3rd dark fringe is at 2.5β, not 3β and not 1.5β. Count the bright fringes, then step back half a width.",
        },
        {
          title: "Reduce the ratio fully",
          body: "The least distance needs the lowest-terms pair. 630 : 420 is 3 : 2; using 63 : 42 gives a coincidence 21 times too far out.",
        },
      ],
    },
  ],
};
