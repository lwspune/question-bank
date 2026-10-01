import type { SubtopicNote } from "@/app/notes/_types";

export const TERMINAL_FLUID_NOTE: SubtopicNote = {
  subtopicName: "Terminal Velocity",
  title: "Terminal Velocity",
  oneLineDefinition:
    "A sphere falling through a fluid speeds up until the viscous drag 6πηrv and the buoyancy together equal its weight; that steady speed is v = 2r²(ρ − σ)g/9η, so for one material it grows as the square of the radius.",
  whyItMatters:
    "Nineteen PYQs, six of them numeric, and five from 2026. Eleven use the terminal-velocity formula directly: a speed, a viscosity found from a rising bubble or a falling ball, a drop height that matches the speed in water, and the shape of the velocity-time graph; eight use only how the speed scales, for drops that merge or split, for balls of the same mass, and for the error in a measured radius.",
  concepts: [
    // C1 — the formula
    {
      kind: "formula" as const,
      slug: "jpfluid-terminal-speed",
      name: "The terminal-velocity formula",
      intuition:
        "At first the ball accelerates. As it speeds up, the drag \\(6\\pi\\eta r v\\) grows, until drag plus buoyancy equals the weight. From then on it falls at a constant speed, the terminal velocity. Setting the forces equal gives the formula. An air bubble rising through a liquid is the same balance upside down: buoyancy pulls it up, drag holds it back, and its own weight is too small to count.",
      definition:
        "- Balance: \\(6\\pi\\eta r v_T + \\tfrac{4}{3}\\pi r^{3}\\sigma g = \\tfrac{4}{3}\\pi r^{3}\\rho g\\), with ρ the sphere's density and σ the fluid's.\n" +
        "- So \\(v_T = \\dfrac{2r^{2}(\\rho - \\sigma)g}{9\\eta}\\).\n" +
        "- Air bubble rising, air's density neglected: \\(v_T = \\dfrac{2r^{2}\\sigma g}{9\\eta}\\), so \\(\\eta = \\dfrac{2r^{2}\\sigma g}{9v_T}\\).\n" +
        "- Use one system of units: SI (m, kg/m³, Pa s, g = 10 m/s²) or CGS (cm, g/cm³, poise, g = 1000 cm/s²).\n" +
        "- 'Enters the water without changing speed': the free-fall speed \\(\\sqrt{2gh}\\) equals \\(v_T\\) in water, so \\(h = \\dfrac{v_T^{2}}{2g}\\).\n" +
        "- Velocity-time graph: rises from zero with a slope that keeps falling, and levels off at \\(v_T\\).\n" +
        "- In the lab: η does not depend on how fast the ball was launched, but it does depend on temperature, so the temperature must be kept steady.",
      formula: {
        label: "Terminal velocity",
        latex: "v_T = \\frac{2r^{2}(\\rho - \\sigma)g}{9\\eta}",
      },
      authoredExample: {
        prompt:
          "A steel ball of radius 1.5 mm and density \\(7.8\\ \\text{g/cm}^{3}\\) falls through oil of density \\(0.9\\ \\text{g/cm}^{3}\\) and viscosity 15 poise. Find its terminal velocity. (\\(g = 1000\\ \\text{cm/s}^{2}\\))",
        steps: [
          "Work in CGS: \\(r = 0.15\\) cm, \\(r^{2} = 0.0225\\ \\text{cm}^{2}\\), \\(\\rho - \\sigma = 6.9\\ \\text{g/cm}^{3}\\).",
          "\\(v_T = \\dfrac{2 \\times 0.0225 \\times 6.9 \\times 1000}{9 \\times 15} = \\dfrac{310.5}{135}\\).",
          "\\(v_T = 2.3\\) cm/s.",
        ],
        answer: "2.3 cm/s",
      },
      selfCheckExample: {
        prompt:
          "An air bubble of radius 1 mm rises steadily at 0.4 cm/s through a liquid of density \\(1800\\ \\text{kg/m}^{3}\\). Find the liquid's viscosity in Pa s and in poise. Neglect the density of air. (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "\\(\\eta = \\dfrac{2r^{2}\\sigma g}{9v_T} = \\dfrac{2 \\times 10^{-6} \\times 1800 \\times 10}{9 \\times 0.004}\\).",
          "\\(= \\dfrac{0.036}{0.036} = 1.0\\) Pa s.",
          "1 Pa s = 10 poise.",
        ],
        answer: "1.0 Pa s, that is 10 poise.",
      },
      practiceSet: [
        { prompt: "A raindrop falls at its terminal velocity. What is its acceleration?", answer: "Zero: the forces on it balance." },
        { prompt: "A ball is dropped from rest into glycerine. Describe its velocity-time graph.", answer: "It rises with a falling slope and levels off at the terminal velocity." },
        { prompt: "A ball's terminal velocity in water is 2 m/s. From what height must it fall freely to enter the water at that speed? (\\(g = 10\\ \\text{m/s}^{2}\\))", answer: "0.2 m" },
        { prompt: "A viscosity of 4 poise in Pa s?", answer: "0.4 Pa s" },
      ],
      pyqExampleId: "1bf8e402-e255-4e85-b4f1-5d021a8f082b", // 2026: metal sphere in glycerine, terminal velocity in cm/s
      traps: [
        {
          title: "Diameter or radius",
          body: "Stems usually give the diameter. Halve it before squaring, or the answer is four times too big.",
        },
        {
          title: "Do not mix CGS and SI",
          body: "With η in poise, use cm, g/cm³ and g = 1000 cm/s². With η in Pa s, use m, kg/m³ and g = 10 m/s². A g of 10 with lengths in cm gives an answer 100 times too small.",
        },
        {
          title: "A faster launch does not change η",
          body: "A ball thrown in with some speed still settles to the same terminal velocity, so the measured viscosity is the same.",
        },
      ],
    },

    // C2 — scaling
    {
      kind: "formula" as const,
      slug: "jpfluid-terminal-scaling",
      name: "How terminal velocity scales with the radius",
      intuition:
        "For one material in one fluid, everything in the formula is fixed except \\(r^{2}\\), so \\(v_T \\propto r^{2}\\). When n equal drops merge, the volume is kept: the big radius is \\(n^{1/3}\\) times the small one, and the speed rises by \\(n^{2/3}\\). If the MASS is kept fixed instead of the material, the answer changes completely.",
      definition:
        "- Same material, same fluid: \\(v_T \\propto r^{2}\\).\n" +
        "- n equal drops merge: \\(R = n^{1/3}r\\), so \\(v' = n^{2/3}v\\). Eight drops give × 4, 27 give × 9, 64 give × 16.\n" +
        "- One drop split into n equal droplets: each droplet falls at \\(v/n^{2/3}\\).\n" +
        "- Same MASS, different radius, fluid density negligible: the weight is fixed and must equal \\(6\\pi\\eta r v\\), so \\(v \\propto 1/r\\).\n" +
        "- Error in the speed from an error in the radius: \\(\\dfrac{\\Delta v}{v} = 2\\dfrac{\\Delta r}{r}\\).",
      formula: {
        label: "Merging drops",
        latex: "v_T \\propto r^{2}, \\qquad R = n^{1/3}r \\Rightarrow v' = n^{2/3}v",
      },
      authoredExample: {
        prompt:
          "Twenty-seven equal raindrops each fall at a terminal velocity of 6 cm/s. They merge into one drop. Find its terminal velocity.",
        steps: [
          "Volume is kept: \\(R^{3} = 27r^{3}\\), so \\(R = 3r\\).",
          "\\(v_T \\propto r^{2}\\), so the speed grows by \\(3^{2} = 9\\).",
          "\\(v' = 9 \\times 6 = 54\\) cm/s.",
        ],
        answer: "54 cm/s",
      },
      selfCheckExample: {
        prompt:
          "A ball of radius 4 mm has a terminal velocity of 12 cm/s in an oil. Find the terminal velocity of a ball of the same material, radius 2 mm, in the same oil. If the 4 mm radius was measured as \\((4 \\pm 0.05)\\) mm, what is the percentage error in its terminal velocity?",
        steps: [
          "The radius halves, so the speed is divided by \\(2^{2} = 4\\): \\(12/4 = 3\\) cm/s.",
          "\\(\\dfrac{\\Delta r}{r} = \\dfrac{0.05}{4} = 1.25\\%\\), so \\(\\dfrac{\\Delta v}{v} = 2 \\times 1.25 = 2.5\\%\\).",
        ],
        answer: "3 cm/s; 2.5%.",
      },
      practiceSet: [
        { prompt: "125 equal drops merge. By what factor does the terminal velocity grow?", answer: "25" },
        { prompt: "A drop falling at v splits into 8 equal droplets. The speed of each?", answer: "v/4" },
        { prompt: "Two balls of the same MASS have radii r and 3r; the medium's density is negligible. Ratio of their terminal velocities?", answer: "3 : 1" },
        { prompt: "A radius has a 1% error. Error in the terminal velocity?", answer: "2%" },
      ],
      pyqExampleId: "120a366f-d8f3-452f-9554-ca0e08a2db4d", // 2026: 64 raindrops coalesce
      traps: [
        {
          title: "Same mass is not same material",
          body: "For one material, v ∝ r². For one mass, a bigger radius means a lighter material and more drag: v ∝ 1/r, so doubling the radius halves the speed.",
        },
        {
          title: "Merging multiplies by n^(2/3), not n",
          body: "27 drops merging make the speed 9 times larger, not 27 times. The radius grows only by the cube root of n.",
        },
        {
          title: "v grows as r², not inversely with r",
          body: "A reason that says terminal velocity is inversely proportional to the radius is false for a given material. The squared radius is also why its error is doubled.",
        },
      ],
    },
  ],
};
