import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_STOKES_NOTE: SubtopicNote = {
  subtopicName: "Stokes' Law and Terminal Velocity",
  title: "Stokes' Law and Terminal Velocity",
  oneLineDefinition:
    "The viscous force on a small sphere moving through a fluid, F = 6πηrv, and the derivation and use of the terminal velocity of a sphere falling through a viscous medium.",
  whyItMatters:
    "8 questions. Three were set in board papers: derive the terminal velocity of a sphere falling through a viscous medium (2022), find the radius of an oil drop from its steady speed (2024), and find the viscous force on a steel ball (2026). The textbook adds a rising air bubble, a raindrop, hailstones and a second oil drop.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-stokes-law",
      name: "Stokes' law",
      intuition:
        "A small ball moving through a liquid or air has to push the fluid layers past each other, so it feels a drag that opposes its motion. The drag grows with the stickiness of the fluid, the size of the ball and its speed.",
      definition:
        "- **Stokes' law:** a small sphere of radius \\(r\\) moving with speed \\(v\\) through a fluid of coefficient of viscosity \\(\\eta\\) feels a viscous force \\(F = 6\\pi\\eta r v\\).\n" +
        "- The force acts opposite to the motion of the sphere.\n" +
        "- It holds for a small sphere moving slowly, so that the flow round it stays streamline.\n" +
        "- The force is proportional to \\(\\eta\\), to \\(r\\) and to \\(v\\).",
      formula: {
        label: "Stokes' law",
        latex: "F = 6\\pi\\eta r v",
        symbols: [
          { symbol: "\\(\\eta\\)", meaning: "coefficient of viscosity of the fluid" },
          { symbol: "\\(r\\)", meaning: "radius of the sphere" },
          { symbol: "\\(v\\)", meaning: "speed of the sphere through the fluid" },
        ],
      },
      authoredExample: {
        prompt:
          "A ball of radius 1 mm moving at 5 cm/s through a liquid feels a viscous force of \\(1.5 \\times 10^{-4}\\) N. Find the coefficient of viscosity of the liquid. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(r = 10^{-3}\\) m, \\(v = 0.05\\) m/s, \\(F = 1.5 \\times 10^{-4}\\) N.",
          "Formula: \\(F = 6\\pi\\eta r v\\), so \\(\\eta = \\dfrac{F}{6\\pi r v}\\).",
          "Substitution: \\(\\eta = \\dfrac{1.5 \\times 10^{-4}}{6 \\times 3.142 \\times 10^{-3} \\times 0.05} = \\dfrac{1.5 \\times 10^{-4}}{9.426 \\times 10^{-4}} = 0.159\\) N s/m².",
        ],
        answer: "0.159 N s/m²",
      },
      selfCheckExample: {
        prompt: "A sphere moving through a fluid feels a viscous force F. Its radius is doubled and its speed halved. What is the new viscous force?",
        steps: ["\\(F \\propto rv\\).", "\\(F' \\propto (2r)\\left(\\dfrac{v}{2}\\right) = rv\\), so \\(F' = F\\)."],
        answer: "F (unchanged)",
      },
      practiceSet: [
        {
          prompt: "State Stokes' law.",
          answer: "The viscous force on a small sphere moving slowly through a fluid is \\(F = 6\\pi\\eta r v\\)",
        },
        { prompt: "On which three quantities does the viscous force on a moving sphere depend?", answer: "The coefficient of viscosity, the radius of the sphere and its speed" },
        { prompt: "In which direction does the viscous force act on a falling raindrop?", answer: "Upward, opposite to its motion" },
      ],
      pyqExampleId: "ac16bf45-8ef6-4700-8557-2191926ef297",
      traps: [
        {
          title: "Diameter put in as the radius",
          body: "Stokes' law uses the radius. A question that gives the diameter of a drop needs it halved first, or the force comes out twice as large.",
        },
        {
          title: "Radius in mm",
          body: "Convert the radius to metres. With \\(\\eta\\) in N s/m² and \\(v\\) in m/s, the force is then in newtons.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-terminal-velocity",
      name: "Terminal velocity",
      intuition:
        "Drop a small ball into a thick liquid. At first it speeds up, but the faster it goes the larger the viscous drag. Soon the drag and the upthrust together equal its weight. The net force is then zero and the ball falls at a steady speed, its terminal velocity. Big drops reach a much larger terminal velocity than small ones, which is why raindrops fall fast and mist seems to float.",
      definition:
        "- A sphere of radius \\(r\\) and density \\(\\rho\\) falls through a fluid of density \\(\\sigma\\) and coefficient of viscosity \\(\\eta\\). Three forces act:\n" +
        "- Weight, downward: \\(W = \\frac{4}{3}\\pi r^3 \\rho g\\).\n" +
        "- Upthrust, upward (Archimedes' principle): \\(U = \\frac{4}{3}\\pi r^3 \\sigma g\\).\n" +
        "- Viscous force, upward (Stokes' law): \\(F = 6\\pi\\eta r v\\), growing as the speed grows.\n" +
        "- When \\(U + F = W\\) the net force is zero and the sphere moves with a constant velocity \\(v_t\\), the **terminal velocity**.\n" +
        "- \\(6\\pi\\eta r v_t = \\frac{4}{3}\\pi r^3(\\rho - \\sigma)g\\), so \\(v_t = \\dfrac{2r^2(\\rho - \\sigma)g}{9\\eta}\\).\n" +
        "- \\(v_t \\propto r^2\\). If \\(\\sigma > \\rho\\), \\(v_t\\) is negative: the body rises, like an air bubble in a liquid.",
      formula: {
        label: "Terminal velocity",
        latex: "v_t = \\frac{2 r^2 (\\rho - \\sigma) g}{9\\eta}",
        symbols: [
          { symbol: "\\(\\rho\\)", meaning: "density of the sphere" },
          { symbol: "\\(\\sigma\\)", meaning: "density of the fluid" },
          { symbol: "\\(\\eta\\)", meaning: "coefficient of viscosity of the fluid" },
        ],
      },
      authoredExample: {
        prompt:
          "A steel ball of radius 1 mm and density 7800 kg/m³ falls through glycerine of density 1260 kg/m³ and coefficient of viscosity 0.83 N s/m². Find its terminal velocity. (\\(g = 9.8\\) m/s²)",
        steps: [
          "Given: \\(r = 10^{-3}\\) m, \\(\\rho = 7800\\) kg/m³, \\(\\sigma = 1260\\) kg/m³, \\(\\eta = 0.83\\) N s/m².",
          "Formula: \\(v_t = \\dfrac{2r^2(\\rho - \\sigma)g}{9\\eta}\\).",
          "Substitution: \\(v_t = \\dfrac{2 \\times (10^{-3})^2 \\times 6540 \\times 9.8}{9 \\times 0.83} = \\dfrac{0.1282}{7.47} = 1.72 \\times 10^{-2}\\) m/s.",
        ],
        answer: "1.72 × 10⁻² m/s (about 1.7 cm/s)",
      },
      selfCheckExample: {
        prompt: "Two drops of the same liquid, with radii in the ratio 1 : 3, fall through air. Find the ratio of their terminal velocities.",
        steps: ["\\(v_t \\propto r^2\\)", "\\(\\dfrac{v_1}{v_2} = \\left(\\dfrac{1}{3}\\right)^2 = \\dfrac{1}{9}\\)"],
        answer: "1 : 9",
      },
      practiceSet: [
        { prompt: "Why does a fine mist seem to hang in the air while raindrops fall quickly?", answer: "Terminal velocity goes as \\(r^2\\), so tiny droplets fall very slowly" },
        { prompt: "What does a negative terminal velocity mean?", answer: "The body is less dense than the fluid and moves upward" },
        { prompt: "What is the net force on a ball moving at its terminal velocity?", answer: "Zero" },
      ],
      pyqExampleId: "fc5a46e7-dba9-4c2d-a4fe-4e18b941c190",
      traps: [
        {
          title: "Swapping the two densities",
          body: "\\(\\rho\\) is the density of the falling body and \\(\\sigma\\) that of the fluid. Swapping them flips the sign and makes a falling ball rise.",
        },
        {
          title: "Leaving out the upthrust",
          body: "In the derivation three forces act. Balancing the weight against the viscous force alone gives \\(\\rho\\) in place of \\(\\rho - \\sigma\\).",
        },
        {
          title: "Mixing C.G.S. and SI",
          body: "If the data are in g/cm³, cm/s and poise, take \\(g = 980\\) cm/s² and give the radius in cm. Mixing systems gives nonsense.",
        },
      ],
    },
  ],
};
