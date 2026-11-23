import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MF_BERNOULLI_NOTE: SubtopicNote = {
  subtopicName: "Equation of Continuity and Bernoulli's Equation",
  title: "Equation of Continuity and Bernoulli's Equation",
  oneLineDefinition:
    "Why a fluid speeds up in a narrow pipe (continuity, Av = constant), why its pressure falls where it is faster (Bernoulli's equation), and the speed of a liquid leaving a hole in a tank (Torricelli's law).",
  whyItMatters:
    "14 questions, one of them from a board paper: what Bernoulli's theorem conserves (2025). The textbook adds the equation of continuity and its derivation, flow through nozzles and narrow pipes, pressure differences in a pipe, a mercury manometer, and the speed of water leaving a dam or a tank.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmf-continuity",
      name: "Equation of continuity",
      intuition:
        "A liquid cannot be squeezed, and in a steady flow none of it piles up anywhere. So every second the same volume must pass every section of the pipe. Where the pipe is narrow, the liquid has to move faster to get the same volume through. That is why water spurts out when you partly cover the mouth of a hose.",
      definition:
        "- Take a tube of flow with cross-sections \\(A_1\\) at A and \\(A_2\\) at B, and speeds \\(v_1\\) and \\(v_2\\) there.\n" +
        "- In a time \\(\\Delta t\\) the mass entering at A is \\(\\rho A_1 v_1 \\Delta t\\), and the mass leaving at B is \\(\\rho A_2 v_2 \\Delta t\\).\n" +
        "- In steady flow no mass is gained or lost between A and B (**conservation of mass**), so \\(\\rho A_1 v_1 \\Delta t = \\rho A_2 v_2 \\Delta t\\).\n" +
        "- For an **incompressible** fluid (density does not change) \\(\\rho\\) cancels: \\(A_1 v_1 = A_2 v_2\\), that is \\(Av = \\) constant.\n" +
        "- \\(Av\\) is the volume of fluid passing per second. The speed is inversely proportional to the area: narrow section, faster flow.\n" +
        "- For a circular pipe \\(A = \\pi d^2/4\\), so \\(d_1^2 v_1 = d_2^2 v_2\\).",
      formula: {
        label: "Equation of continuity",
        latex: "A_1 v_1 = A_2 v_2 \\quad (Av = \\text{constant})",
        symbols: [
          { symbol: "\\(A_1, A_2\\)", meaning: "areas of cross-section at two points" },
          { symbol: "\\(v_1, v_2\\)", meaning: "speeds of the fluid there" },
        ],
      },
      authoredExample: {
        prompt:
          "Water flows at 0.5 m/s through a pipe of cross-section 20 cm², which narrows to 5 cm². Find the speed in the narrow part and the volume of water flowing per second.",
        steps: [
          "Given: \\(A_1 = 20\\) cm² \\(= 20 \\times 10^{-4}\\) m², \\(v_1 = 0.5\\) m/s, \\(A_2 = 5\\) cm².",
          "Formula: \\(A_1 v_1 = A_2 v_2\\), so \\(v_2 = \\dfrac{A_1 v_1}{A_2} = \\dfrac{20 \\times 0.5}{5} = 2\\) m/s. (Only the ratio of areas enters.)",
          "Volume per second: \\(A_1 v_1 = 20 \\times 10^{-4} \\times 0.5 = 1 \\times 10^{-3}\\) m³/s.",
        ],
        answer: "2 m/s in the narrow part; 1 × 10⁻³ m³ of water per second",
      },
      selfCheckExample: {
        prompt: "A pipe of internal diameter 4 cm narrows to 2 cm. Water moves at 1 m/s in the wide part. Find its speed in the narrow part.",
        steps: ["\\(d_1^2 v_1 = d_2^2 v_2\\)", "\\(v_2 = 1 \\times \\left(\\dfrac{4}{2}\\right)^2 = 4\\) m/s"],
        answer: "4 m/s",
      },
      practiceSet: [
        { prompt: "The equation of continuity is a statement of the conservation of which quantity?", answer: "Mass" },
        {
          prompt: "Why does water come out faster when you partly cover the mouth of a hose pipe?",
          answer: "The area of the opening is smaller, and \\(Av\\) stays constant, so the speed increases",
        },
        { prompt: "Water flows at 2 m/s through a pipe of cross-section 10 cm². Find the volume flowing per second.", answer: "\\(2 \\times 10^{-3}\\) m³/s" },
      ],
      pyqExampleId: "6c796463-7256-417b-94b3-61af0117abe2",
      traps: [
        {
          title: "Diameter ratio used as an area ratio",
          body: "Halving the diameter makes the area a quarter, so the speed becomes four times. Square the diameter ratio.",
        },
        {
          title: "Continuity for a gas",
          body: "\\(Av = \\) constant needs an incompressible fluid. For a fluid whose density changes, the conserved quantity is \\(\\rho A v\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-bernoulli",
      name: "Bernoulli's equation",
      intuition:
        "When a liquid speeds up into a narrow part of a pipe, something must push it forward. That push comes from the pressure behind it being higher than the pressure ahead. So where the liquid moves faster, its pressure is lower. Bernoulli's equation says this with energy: pressure energy, kinetic energy and potential energy per unit volume add up to the same total everywhere along the flow.",
      definition:
        "- Holds for a fluid in **steady, streamline** flow that is **incompressible** and **non-viscous**.\n" +
        "- Derivation (work-energy theorem): a small volume \\(dV\\) moves from a point at pressure \\(P_1\\), speed \\(v_1\\), height \\(h_1\\) to one at \\(P_2\\), \\(v_2\\), \\(h_2\\).\n" +
        "- Net work done on it by the surrounding fluid: \\((P_1 - P_2)\\,dV\\).\n" +
        "- Change in kinetic energy \\(\\frac{1}{2}\\rho\\,dV(v_2^2 - v_1^2)\\); change in potential energy \\(\\rho\\,dV\\,g(h_2 - h_1)\\).\n" +
        "- Work done equals the change in energy: \\((P_1 - P_2)\\,dV = \\frac{1}{2}\\rho\\,dV(v_2^2 - v_1^2) + \\rho\\,dV\\,g(h_2 - h_1)\\).\n" +
        "- Rearranging: \\(P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\) constant. Each term is an energy per unit volume, so Bernoulli's equation is the **conservation of energy** for a flowing fluid.\n" +
        "- In a horizontal pipe \\(P + \\frac{1}{2}\\rho v^2 = \\) constant: where the speed is greater, the pressure is less.",
      formula: {
        label: "Bernoulli's equation",
        latex: "P + \\frac{1}{2}\\rho v^2 + \\rho g h = \\text{constant}",
        symbols: [
          { symbol: "\\(P\\)", meaning: "pressure (pressure energy per unit volume)" },
          { symbol: "\\(\\frac{1}{2}\\rho v^2\\)", meaning: "kinetic energy per unit volume" },
          { symbol: "\\(\\rho g h\\)", meaning: "potential energy per unit volume" },
        ],
      },
      authoredExample: {
        prompt:
          "Water flows through a horizontal pipe. At one point its speed is 1 m/s and the pressure is \\(2.0 \\times 10^{5}\\) Pa. Find the pressure at a narrower point where the speed is 3 m/s. (Density of water \\(= 1000\\) kg/m³)",
        steps: [
          "Given: \\(v_1 = 1\\) m/s, \\(P_1 = 2.0 \\times 10^{5}\\) Pa, \\(v_2 = 3\\) m/s, \\(\\rho = 1000\\) kg/m³, \\(h_1 = h_2\\).",
          "Formula: \\(P_1 + \\frac{1}{2}\\rho v_1^2 = P_2 + \\frac{1}{2}\\rho v_2^2\\), so \\(P_2 = P_1 - \\frac{1}{2}\\rho(v_2^2 - v_1^2)\\).",
          "Substitution: \\(P_2 = 2.0 \\times 10^{5} - \\frac{1}{2} \\times 1000 \\times (9 - 1) = 2.0 \\times 10^{5} - 4000\\).",
          "\\(P_2 = 1.96 \\times 10^{5}\\) Pa.",
        ],
        answer: "1.96 × 10⁵ Pa",
      },
      selfCheckExample: {
        prompt:
          "In a horizontal pipe the pressure falls by 1500 Pa from a wide section to a narrow one. Water moves at 1 m/s in the wide section. Find its speed in the narrow section. (Density \\(= 1000\\) kg/m³)",
        steps: ["\\(\\frac{1}{2}\\rho(v_2^2 - v_1^2) = 1500\\)", "\\(v_2^2 - 1 = 3\\), so \\(v_2 = 2\\) m/s"],
        answer: "2 m/s",
      },
      practiceSet: [
        { prompt: "State the conditions under which Bernoulli's equation holds.", answer: "Steady, streamline flow of an incompressible, non-viscous fluid" },
        {
          prompt: "Name the three terms of Bernoulli's equation as energies.",
          answer: "Pressure energy, kinetic energy and potential energy, each per unit volume",
        },
        { prompt: "In a horizontal pipe, is the pressure greater in a wide part or a narrow part?", answer: "In the wide part, where the speed is smaller" },
      ],
      pyqExampleId: "fe8ba986-7864-4636-a88f-3c9e4e383e8c",
      traps: [
        {
          title: "Bernoulli conserves energy, not mass",
          body: "Mass is conserved too, but that is the equation of continuity. Bernoulli's equation is the conservation of energy for a flowing fluid.",
        },
        {
          title: "Speeds in cm/s with density in kg/m³",
          body: "Convert speeds to m/s before squaring. A speed left in cm/s makes \\(\\frac{1}{2}\\rho v^2\\) ten thousand times too large.",
        },
        {
          title: "Faster flow, higher pressure",
          body: "It is the other way round. Along a horizontal streamline the pressure is lowest where the speed is highest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmf-torricelli",
      name: "Speed of efflux (Torricelli's law)",
      intuition:
        "Water leaving a hole near the bottom of a tank comes out as fast as a stone dropped from the water surface to the hole would be moving. The deeper the hole, the faster the jet.",
      definition:
        "- Apply Bernoulli's equation between the free surface of a large open tank and a small hole at a depth \\(h\\) below it.\n" +
        "- Both points are at atmospheric pressure. The surface of a large tank falls very slowly, so its speed is taken as zero.\n" +
        "- \\(P_0 + \\rho g h = P_0 + \\frac{1}{2}\\rho v^2\\), so \\(v = \\sqrt{2gh}\\). This is **Torricelli's law**.\n" +
        "- If the water is held at a gauge pressure \\(p\\) instead, \\(p = \\frac{1}{2}\\rho v^2\\) and \\(v = \\sqrt{2p/\\rho}\\).",
      formula: {
        label: "Speed of efflux",
        latex: "v = \\sqrt{2gh}",
        symbols: [{ symbol: "\\(h\\)", meaning: "depth of the hole below the free surface" }],
      },
      authoredExample: {
        prompt: "A small hole is made 5 m below the water surface in the side of a large open tank. Find the speed with which water leaves the hole. (\\(g = 9.8\\) m/s²)",
        steps: [
          "Given: \\(h = 5\\) m, \\(g = 9.8\\) m/s².",
          "Formula: \\(v = \\sqrt{2gh}\\).",
          "Substitution: \\(v = \\sqrt{2 \\times 9.8 \\times 5} = \\sqrt{98} = 9.90\\) m/s.",
        ],
        answer: "9.90 m/s",
      },
      selfCheckExample: {
        prompt: "Water leaves a hole in the side of a large tank at 14 m/s. How far below the water surface is the hole? (\\(g = 9.8\\) m/s²)",
        steps: ["\\(h = \\dfrac{v^2}{2g} = \\dfrac{196}{19.6} = 10\\) m"],
        answer: "10 m",
      },
      practiceSet: [
        { prompt: "The depth of a hole below the water surface is made four times as great. What happens to the speed of efflux?", answer: "It doubles, since \\(v \\propto \\sqrt{h}\\)" },
        { prompt: "Torricelli's law is a special case of which equation?", answer: "Bernoulli's equation" },
      ],
      pyqExampleId: "d496b312-4e30-40db-bc09-9e8e5dea521b",
      traps: [
        {
          title: "Depth measured from the bottom",
          body: "In \\(v = \\sqrt{2gh}\\), \\(h\\) is the depth of the hole below the free surface of the water, not its height above the floor of the tank.",
        },
        {
          title: "Speed proportional to depth",
          body: "The speed goes as \\(\\sqrt{h}\\). Doubling the depth raises the speed by a factor of \\(\\sqrt{2}\\), not 2.",
        },
      ],
    },
  ],
};
