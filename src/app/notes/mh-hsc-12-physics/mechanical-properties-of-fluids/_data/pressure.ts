import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_PRESSURE_NOTE: SubtopicNote = {
  subtopicName: "Fluid Pressure and Pascal's Law",
  title: "Fluid Pressure and Pascal's Law",
  oneLineDefinition:
    "How pressure grows with depth in a liquid, what gauge and absolute pressure mean, and how Pascal's law lets a hydraulic lift or brake multiply a force.",
  whyItMatters:
    "9 questions. Two were set in board papers: compressibility as the reciprocal of the bulk modulus (2018) and the force on the large piston of a hydraulic lift (2025). The textbook adds pressure at a depth, the heights of two liquid columns, the manometer, the hydraulic lift and a hydraulic brake that stops a car.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-pressure-depth",
      name: "Pressure at a depth in a liquid",
      intuition:
        "A liquid presses on everything inside it because of the weight of the liquid above. Go deeper and there is more liquid above you, so the pressure grows. It depends only on how deep you are and how dense the liquid is, not on the shape of the vessel. On top of that sits the pressure of the air on the free surface.",
      definition:
        "- **Pressure** is the normal force per unit area, \\(p = F/A\\). Its SI unit is N/m², also called the pascal (Pa).\n" +
        "- A liquid column of height \\(h\\) and density \\(\\rho\\) exerts a pressure \\(p = h\\rho g\\) at its base.\n" +
        "- At a depth \\(h\\) below a free surface open to the air, the **absolute pressure** is \\(p = p_0 + h\\rho g\\), where \\(p_0\\) is the atmospheric pressure (about \\(1.013 \\times 10^{5}\\) Pa at sea level).\n" +
        "- The **gauge pressure** is the pressure above atmospheric, \\(p - p_0 = h\\rho g\\).\n" +
        "- The pressure depends only on the depth, not on the shape or size of the vessel. This is the **hydrostatic paradox**.\n" +
        "- An open U-tube **manometer** shows a gauge pressure as a difference \\(h\\) of liquid levels, \\(p - p_0 = h\\rho g\\). A low density liquid gives a larger level difference.\n" +
        "- Liquids are nearly **incompressible**: their bulk modulus is very large, so their compressibility (the reciprocal of the bulk modulus) is very small.",
      formula: {
        label: "Pressure at depth h",
        latex: "p = p_0 + h\\rho g, \\qquad p - p_0 = h\\rho g \\ (\\text{gauge pressure})",
        symbols: [
          { symbol: "\\(p_0\\)", meaning: "atmospheric pressure on the free surface" },
          { symbol: "\\(h\\)", meaning: "depth below the free surface" },
          { symbol: "\\(\\rho\\)", meaning: "density of the liquid" },
        ],
      },
      authoredExample: {
        prompt:
          "A tank holds a 0.5 m layer of oil of density 800 kg/m³ floating on 1.0 m of water of density 1000 kg/m³. Find the gauge pressure and the absolute pressure at the bottom of the tank. (\\(g = 9.8\\) m/s², \\(p_0 = 1.013 \\times 10^{5}\\) Pa)",
        steps: [
          "Given: \\(h_1 = 0.5\\) m, \\(\\rho_1 = 800\\) kg/m³; \\(h_2 = 1.0\\) m, \\(\\rho_2 = 1000\\) kg/m³.",
          "Formula: each layer adds its own \\(h\\rho g\\), so gauge pressure \\(= h_1\\rho_1 g + h_2\\rho_2 g\\).",
          "Substitution: \\(0.5 \\times 800 \\times 9.8 + 1.0 \\times 1000 \\times 9.8 = 3920 + 9800 = 13720\\) Pa.",
          "Absolute pressure: \\(p = p_0 + 13720 = 1.013 \\times 10^{5} + 0.1372 \\times 10^{5} = 1.150 \\times 10^{5}\\) Pa.",
        ],
        answer: "Gauge pressure 1.372 × 10⁴ Pa; absolute pressure 1.150 × 10⁵ Pa",
      },
      selfCheckExample: {
        prompt:
          "At what depth in fresh water (density 1000 kg/m³) is the gauge pressure equal to one atmosphere, \\(1.013 \\times 10^{5}\\) Pa? (\\(g = 9.8\\) m/s²)",
        steps: ["\\(h\\rho g = 1.013 \\times 10^{5}\\)", "\\(h = \\dfrac{1.013 \\times 10^{5}}{1000 \\times 9.8} = 10.34\\) m"],
        answer: "About 10.3 m",
      },
      practiceSet: [
        { prompt: "What is the SI unit of pressure?", answer: "N/m², also called the pascal (Pa)" },
        {
          prompt: "Two vessels of different shapes hold water to the same height. Compare the pressures at their bases.",
          answer: "They are equal: the pressure depends only on the depth (the hydrostatic paradox)",
        },
        {
          prompt: "Mercury is 13.6 times as dense as water. What height of water exerts the same pressure as a 10 cm column of mercury?",
          answer: "136 cm",
        },
        {
          prompt: "Why are liquids treated as incompressible?",
          answer: "Their bulk modulus is very large, so a change of pressure changes their volume very little",
        },
      ],
      pyqExampleId: "53248191-ec25-4851-89e3-6ef16c39eebb",
      traps: [
        {
          title: "Gauge pressure or absolute pressure?",
          body: "\\(h\\rho g\\) is the gauge pressure. If the question asks for the total or absolute pressure, add the atmospheric pressure \\(p_0\\). Read the question before you stop.",
        },
        {
          title: "Pressure does not depend on the shape of the vessel",
          body: "A wide tank and a narrow tube filled to the same height have the same pressure at the base. Only the depth and the density matter.",
        },
        {
          title: "Mixed units",
          body: "Put \\(h\\) in metres and \\(\\rho\\) in kg/m³ to get the answer in Pa. A depth left in centimetres makes the answer 100 times too large.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-pascal",
      name: "Pascal's law and hydraulic machines",
      intuition:
        "Push on a liquid shut in a container and every part of it feels the same extra pressure at once. A small force on a small piston makes a pressure; that same pressure acting on a large piston gives a large force. The price is distance: the small piston must move a long way to lift the large one a little.",
      definition:
        "- **Pascal's law:** the pressure applied to an enclosed fluid is transmitted undiminished to every part of the fluid and to the walls of its container.\n" +
        "- **Hydraulic lift:** a force \\(F_1\\) on a piston of area \\(A_1\\) makes a pressure \\(F_1/A_1\\). The same pressure acts on the large piston of area \\(A_2\\), so \\(F_2 = F_1 \\dfrac{A_2}{A_1}\\).\n" +
        "- The liquid moved is the same on both sides, \\(A_1 d_1 = A_2 d_2\\), so the large piston moves a smaller distance. The force is multiplied, the work is not.\n" +
        "- **Hydraulic brakes:** the pedal pushes a piston in the master cylinder; the pressure reaches the slave cylinders at the wheels, whose larger pistons press the brake shoes with a larger force.",
      formula: {
        label: "Pascal's law in a hydraulic lift",
        latex: "\\frac{F_1}{A_1} = \\frac{F_2}{A_2} \\quad \\Rightarrow \\quad F_2 = F_1\\frac{A_2}{A_1}",
        symbols: [
          { symbol: "\\(F_1, A_1\\)", meaning: "force on, and area of, the small piston" },
          { symbol: "\\(F_2, A_2\\)", meaning: "force on, and area of, the large piston" },
        ],
      },
      authoredExample: {
        prompt:
          "In a hydraulic brake, the master cylinder piston has an area of 2 cm² and each slave cylinder piston an area of 10 cm². A force of 150 N acts on the master piston. Find the pressure in the brake fluid and the force on one slave piston.",
        steps: [
          "Given: \\(F_1 = 150\\) N, \\(A_1 = 2\\) cm² \\(= 2 \\times 10^{-4}\\) m², \\(A_2 = 10\\) cm² \\(= 10 \\times 10^{-4}\\) m².",
          "Pressure: \\(p = \\dfrac{F_1}{A_1} = \\dfrac{150}{2 \\times 10^{-4}} = 7.5 \\times 10^{5}\\) Pa.",
          "By Pascal's law the same pressure acts on the slave piston: \\(F_2 = pA_2 = 7.5 \\times 10^{5} \\times 10 \\times 10^{-4} = 750\\) N.",
        ],
        answer: "Pressure 7.5 × 10⁵ Pa; force on the slave piston 750 N",
      },
      selfCheckExample: {
        prompt:
          "The small piston of a hydraulic press has one twenty-fifth the area of the large piston. The small piston is pushed down 50 cm. How far does the large piston rise?",
        steps: ["Volume pushed is the same: \\(A_1 d_1 = A_2 d_2\\).", "\\(d_2 = d_1 \\dfrac{A_1}{A_2} = 50 \\times \\dfrac{1}{25} = 2\\) cm."],
        answer: "2 cm",
      },
      practiceSet: [
        {
          prompt: "State Pascal's law.",
          answer: "The pressure applied to an enclosed fluid is transmitted undiminished to every part of the fluid and to the walls of its container",
        },
        { prompt: "Name two devices that work on Pascal's law.", answer: "The hydraulic lift and hydraulic brakes" },
        {
          prompt: "In a hydraulic brake, which has the larger piston: the master cylinder or the slave cylinder?",
          answer: "The slave cylinder, so that the force on the brake shoes is larger than the force on the pedal piston",
        },
        {
          prompt: "A load of 1000 kg rests on a piston of area 0.05 m². What pressure must the liquid supply? (\\(g = 9.8\\) m/s²)",
          answer: "\\(1.96 \\times 10^{5}\\) Pa",
        },
      ],
      pyqExampleId: "101012f0-d64d-476e-accb-2352c79d1df9",
      traps: [
        {
          title: "Areas from radii",
          body: "When the pistons are given by radius or diameter, the force ratio is the square of the radius ratio. A radius five times larger gives 25 times the force, not 5 times.",
        },
        {
          title: "The machine does not create energy",
          body: "A hydraulic lift multiplies force, not work. The large piston moves through a smaller distance, \\(A_1 d_1 = A_2 d_2\\).",
        },
        {
          title: "A statement of Pascal's law without 'enclosed' and 'undiminished'",
          body: "Both words carry the mark. The fluid must be enclosed, and the pressure reaches every part without becoming smaller.",
        },
      ],
    },
  ],
};
