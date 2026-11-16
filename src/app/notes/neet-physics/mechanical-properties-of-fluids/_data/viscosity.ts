import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_FL_VISCOSITY_NOTE: SubtopicNote = {
  subtopicName: "Viscosity and Terminal Velocity",
  title: "Viscosity and Terminal Velocity",
  oneLineDefinition:
    "Viscosity as the friction between layers of a moving fluid, Stokes' law F = 6πηrv for a sphere, and the terminal velocity a ball reaches when the forces on it balance.",
  whyItMatters:
    "Three NEET questions, from 2021, 2022 and Re-NEET 2026, all about a ball falling through a viscous liquid. One asks for the viscous force once the ball moves at constant velocity (2021). Two ask for a graph: the ball's speed against time (2022) and the terminal velocity against the ratio of the ball's density to the liquid's (Re-NEET 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphfl-viscosity",
      name: "Viscosity, Stokes' law and the viscous force",
      intuition:
        "Pour honey and water side by side: the honey moves slowly because its layers drag on each other. Viscosity is this internal friction between layers of a fluid that slide past one another. A ball moving through a liquid feels it as a backward force that grows with the ball's speed. Once the ball moves at a steady velocity, there is no net force on it, so the viscous force simply makes up whatever the other forces leave over.",
      definition:
        "- Viscous force between layers: \\(F = \\eta A \\dfrac{v}{l}\\), where v is the relative speed of two layers a distance l apart and A is the area of a layer.\n" +
        "- \\(\\eta\\) is the **coefficient of viscosity**. SI unit: Pa s (also written N s m⁻² or poiseuille).\n" +
        "- The viscosity of a liquid decreases as it is heated; the viscosity of a gas increases.\n" +
        "- **Stokes' law**: a sphere of radius r moving at speed v through a fluid feels \\(F = 6\\pi \\eta r v\\).\n" +
        "- At constant velocity the net force is zero: weight = upthrust + viscous force, so \\(F_v = mg - \\rho_{liquid} V g\\).",
      formula: {
        label: "Stokes' law",
        latex: "F = \\eta A \\frac{v}{l}, \\qquad F = 6\\pi \\eta r v",
        symbols: [
          { symbol: "\\(\\eta\\)", meaning: "coefficient of viscosity" },
          { symbol: "\\(r\\)", meaning: "radius of the sphere" },
          { symbol: "\\(v\\)", meaning: "speed of the sphere through the fluid" },
        ],
      },
      authoredExample: {
        prompt:
          "A sphere of radius 1 mm moves at 0.1 m/s through a liquid of viscosity 0.5 Pa s. Find the viscous force on it.",
        steps: [
          "\\(F = 6\\pi \\eta r v = 6\\pi \\times 0.5 \\times 10^{-3} \\times 0.1\\).",
          "\\(F = 3\\pi \\times 10^{-4} \\approx 9.4 \\times 10^{-4}\\) N.",
        ],
        answer: "\\(9.4 \\times 10^{-4}\\) N",
      },
      selfCheckExample: {
        prompt:
          "A flat plate of area 0.1 m² slides at 0.2 m/s over a fixed surface, separated from it by a layer of oil 2 mm thick. The oil's viscosity is 0.8 Pa s. What force keeps the plate moving?",
        steps: [
          "\\(F = \\eta A \\dfrac{v}{l} = 0.8 \\times 0.1 \\times \\dfrac{0.2}{0.002}\\).",
          "\\(F = 0.08 \\times 100 = 8\\) N.",
        ],
        answer: "8 N",
      },
      practiceSet: [
        { prompt: "What is the SI unit of the coefficient of viscosity?", answer: "Pa s (N s m⁻²)" },
        { prompt: "What happens to the viscosity of a liquid when it is heated?", answer: "It decreases" },
        { prompt: "What happens to the viscosity of a gas when it is heated?", answer: "It increases" },
        { prompt: "A sphere's radius and its speed through a liquid are both doubled. By what factor does the Stokes force change?", answer: "4 times" },
      ],
      pyqExampleId: "2381056f-780a-4365-aa4f-fe3d01bbb147",
      traps: [
        {
          title: "Liquids and gases go opposite ways",
          body: "Heating makes a liquid less viscous but a gas more viscous. A statement that heating lowers the viscosity of every fluid is false.",
        },
        {
          title: "Do not forget the upthrust",
          body: "At constant velocity the viscous force is not equal to the weight. The upthrust also acts upward, so \\(F_v\\) is the weight minus the upthrust.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphfl-terminal",
      name: "Terminal velocity",
      intuition:
        "Drop a ball into a tall jar of glycerine. At first it speeds up, but the faster it goes the bigger the viscous drag. Soon the drag plus the upthrust exactly balance the weight. From then on the ball falls at a steady speed, the terminal velocity. A raindrop does the same in air, which is why rain does not hit you like a bullet.",
      definition:
        "- Setting weight = upthrust + Stokes force for a sphere gives \\(v_t = \\dfrac{2r^{2}(\\sigma - \\rho)g}{9\\eta}\\), where \\(\\sigma\\) is the density of the sphere and \\(\\rho\\) that of the fluid.\n" +
        "- \\(v_t \\propto r^{2}\\): a drop of twice the radius falls four times as fast.\n" +
        "- \\(v_t \\propto (\\sigma - \\rho)\\): it is zero when the densities are equal, and when \\(\\sigma < \\rho\\) the body rises (an air bubble in water).\n" +
        "- The speed starts at zero and rises, more and more slowly, towards \\(v_t\\); it never passes it.\n" +
        "- When n equal drops join into one, volume is kept: the new radius is \\(n^{1/3}r\\), so the new terminal velocity is \\(n^{2/3}\\) times the old.",
      formula: {
        label: "Terminal velocity",
        latex: "v_t = \\frac{2r^{2}(\\sigma - \\rho)g}{9\\eta}",
        symbols: [
          { symbol: "\\(\\sigma\\)", meaning: "density of the falling sphere" },
          { symbol: "\\(\\rho\\)", meaning: "density of the fluid" },
          { symbol: "\\(\\eta\\)", meaning: "coefficient of viscosity of the fluid" },
        ],
      },
      authoredExample: {
        prompt:
          "A metal ball of radius 1 mm and density 8000 kg/m³ falls through glycerine of density 1250 kg/m³ and viscosity 1.5 Pa s. Find its terminal velocity (g = 10 m/s²).",
        steps: [
          "\\(\\sigma - \\rho = 8000 - 1250 = 6750\\ \\text{kg m}^{-3}\\).",
          "\\(v_t = \\dfrac{2 \\times (10^{-3})^{2} \\times 6750 \\times 10}{9 \\times 1.5} = \\dfrac{0.135}{13.5} = 0.01\\) m/s.",
        ],
        answer: "0.01 m/s (1 cm/s)",
      },
      selfCheckExample: {
        prompt:
          "Eight identical raindrops, each falling at a terminal velocity of 2 cm/s, join to form one bigger drop. What is the terminal velocity of the big drop?",
        steps: [
          "The volume is kept: \\(\\dfrac{4}{3}\\pi R^{3} = 8 \\times \\dfrac{4}{3}\\pi r^{3}\\), so R = 2r.",
          "\\(v_t \\propto r^{2}\\), so the new speed is \\(2^{2} \\times 2 = 8\\) cm/s.",
        ],
        answer: "8 cm/s",
      },
      practiceSet: [
        { prompt: "Two balls of the same material have radii in the ratio 1 : 3. Ratio of their terminal velocities in the same liquid?", answer: "1 : 9" },
        { prompt: "Why does an air bubble in water move upward instead of falling?", answer: "Its density is less than that of water, so the upthrust is more than its weight" },
        { prompt: "What is the net force on a ball falling at its terminal velocity?", answer: "Zero" },
        { prompt: "The viscosity of the liquid is doubled with everything else kept the same. What happens to the terminal velocity?", answer: "It halves" },
      ],
      pyqExampleId: "028b379f-999c-4a45-b387-83a6c9c7bef3",
      traps: [
        {
          title: "Terminal velocity goes as r squared",
          body: "In \\(v_t = \\dfrac{2r^{2}(\\sigma - \\rho)g}{9\\eta}\\) the radius is squared. A drop of three times the radius falls nine times as fast, not three times.",
        },
        {
          title: "Use the density difference",
          body: "The formula has \\(\\sigma - \\rho\\), not \\(\\sigma\\) alone. Leaving out the liquid's density forgets the upthrust and gives a speed that is too large.",
        },
        {
          title: "The speed levels off; it does not overshoot",
          body: "A ball dropped from rest in a viscous liquid speeds up quickly at first and then more and more slowly, getting closer to \\(v_t\\). Its speed-time graph rises and flattens out; it does not climb past \\(v_t\\) and come back.",
        },
      ],
    },
  ],
};
