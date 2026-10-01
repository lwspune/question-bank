import type { SubtopicNote } from "@/app/notes/_types";

export const BERNOULLI_FLUID_NOTE: SubtopicNote = {
  subtopicName: "Continuity, Bernoulli's Equation and Efflux",
  title: "Continuity, Bernoulli's Equation and Efflux",
  oneLineDefinition:
    "In steady flow the volume passing each section per second is the same, so a liquid speeds up where a pipe narrows; Bernoulli's equation, P + ρgh + ½ρv² = constant, then says its pressure falls there, and it gives the speed of a jet leaving a tank as √(2gh).",
  whyItMatters:
    "Twenty-three PYQs, ten of them numeric, and four from 2026. Twelve are pipes and tubes: continuity alone, the pressure difference across a narrowing, a venturi meter, a bent pipe or the correct form of Bernoulli's equation; five turn a pressure difference into a speed, for a valve gauge or an aircraft wing; six are liquid leaving a hole in a tank, for its speed, its range or the push it gives the tank.",
  concepts: [
    // C1 — continuity + Bernoulli in a pipe
    {
      kind: "formula" as const,
      slug: "jpfluid-pipe-flow",
      name: "Continuity and Bernoulli's equation in a pipe",
      intuition:
        "A liquid cannot pile up inside a pipe, so the volume passing each section per second is the same: Av is constant. Where the pipe narrows, the liquid speeds up. It gains kinetic energy only if the liquid behind pushes harder than the liquid ahead, so the narrow part is at LOWER pressure. Bernoulli's equation is this energy balance written per unit volume.",
      definition:
        "- Continuity: \\(A_1 v_1 = A_2 v_2 = Q\\), the volume flow rate. A hose feeding n holes of area a: \\(Av = n\\,a\\,v'\\). Radius halved: area ÷ 4, speed × 4.\n" +
        "- A tank of area A emptied through a tap of area a at speed v: the level falls at \\(\\dfrac{dh}{dt} = \\dfrac{a v}{A}\\).\n" +
        "- Bernoulli along a streamline: \\(P + \\rho g h + \\tfrac{1}{2}\\rho v^{2} = \\text{constant}\\). Each term is energy per unit volume, measured in pascals.\n" +
        "- Horizontal pipe: \\(P_1 - P_2 = \\tfrac{1}{2}\\rho(v_2^{2} - v_1^{2})\\). If \\(A_2 = A_1/2\\), then \\(v_2 = 2v_1\\) and \\(P_1 - P_2 = \\tfrac{3}{2}\\rho v_1^{2}\\).\n" +
        "- Venturi meter: the difference h between the water columns gives \\(g h = \\tfrac{1}{2}(v_2^{2} - v_1^{2})\\), with \\(v_2\\) at the throat. Then \\(Q = A_1 v_1\\).\n" +
        "- Pipe whose ends are at different heights: \\(P_1 - P_2 = \\tfrac{1}{2}\\rho(v_2^{2} - v_1^{2}) + \\rho g(h_2 - h_1)\\). Read which end is higher from the figure.",
      formula: {
        label: "Continuity and Bernoulli",
        latex: "A_1 v_1 = A_2 v_2, \\qquad P + \\rho g h + \\tfrac{1}{2}\\rho v^{2} = \\text{constant}",
      },
      authoredExample: {
        prompt:
          "Water (\\(1000\\ \\text{kg/m}^{3}\\)) flows along a horizontal pipe. At X the area is \\(40\\ \\text{cm}^{2}\\) and the speed is 0.5 m/s; at Y the area is \\(10\\ \\text{cm}^{2}\\). Find the speed at Y and \\(P_X - P_Y\\).",
        steps: [
          "Continuity: \\(v_Y = 0.5 \\times \\dfrac{40}{10} = 2\\) m/s.",
          "Same height, so \\(P_X - P_Y = \\tfrac{1}{2}\\rho(v_Y^{2} - v_X^{2})\\).",
          "\\(= 500 \\times (4 - 0.25) = 500 \\times 3.75 = 1875\\) Pa.",
        ],
        answer: "2 m/s; \\(P_X - P_Y = 1875\\) Pa (X is at the higher pressure).",
      },
      selfCheckExample: {
        prompt:
          "A venturi meter has area \\(8\\ \\text{cm}^{2}\\) at its wide part and \\(4\\ \\text{cm}^{2}\\) at the throat. The water columns above the two parts differ by 15 cm. Find the flow rate. (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "Continuity: the throat speed is \\(v_2 = 2v_1\\).",
          "\\(g h = \\tfrac{1}{2}(4v_1^{2} - v_1^{2}) = 1.5\\,v_1^{2}\\), so \\(v_1^{2} = \\dfrac{10 \\times 0.15}{1.5} = 1\\) and \\(v_1 = 1\\) m/s.",
          "\\(Q = A_1 v_1 = 8 \\times 10^{-4} \\times 1 = 8 \\times 10^{-4}\\ \\text{m}^{3}/\\text{s}\\).",
        ],
        answer: "\\(8 \\times 10^{-4}\\ \\text{m}^{3}/\\text{s}\\), that is \\(800\\ \\text{cm}^{3}/\\text{s}\\).",
      },
      practiceSet: [
        { prompt: "A pipe's radius halves. What happens to the speed of the liquid?", answer: "It becomes 4 times as large." },
        { prompt: "A hose of area \\(20\\ \\text{cm}^{2}\\) carries water at 1 m/s into a nozzle of area \\(0.5\\ \\text{cm}^{2}\\). Exit speed?", answer: "40 m/s" },
        { prompt: "A tank of area \\(2\\ \\text{m}^{2}\\) empties through a tap of area \\(4\\ \\text{cm}^{2}\\) at 5 m/s. How fast does the level fall?", answer: "\\(1 \\times 10^{-3}\\) m/s" },
        { prompt: "In \\(P + \\rho g h + \\tfrac{1}{2}\\rho v^{2}\\), what does each term measure?", answer: "Energy per unit volume, in pascals." },
      ],
      pyqExampleId: "a9c0fc05-b2a9-4fcb-bd99-3a8d2a77f002", // 2026: horizontal tube, areas in cm² and mm², pressure difference
      traps: [
        {
          title: "Put both areas in the same unit",
          body: "1 cm² = 100 mm². A ratio of 1 cm² to 20 mm² is 5, not 1/20. Convert before using continuity.",
        },
        {
          title: "The narrow section is at the lower pressure",
          body: "Faster flow means lower pressure. In a venturi meter with v₁ at the wide part, 2gh = v₂² − v₁². A statement written as v₁² − v₂² has the sign the wrong way round.",
        },
        {
          title: "Square the speeds, then subtract",
          body: "The pressure difference is ½ρ(v₂² − v₁²), not ½ρ(v₂ − v₁)². The second form is a common wrong option.",
        },
      ],
    },

    // C2 — speed from a pressure drop
    {
      kind: "formula" as const,
      slug: "jpfluid-speed-pressure",
      name: "Speed from a pressure drop: gauges and wings",
      intuition:
        "When liquid at rest starts to move, it pays for its speed with pressure: a fall of \\(\\tfrac{1}{2}\\rho v^{2}\\) in pressure buys speed v. A wing works the same way in air. The air over the top moves faster, so the pressure above is lower, and that difference times the wing area is the lift.",
      definition:
        "- Valve closed, then opened, at the same height: \\(P_1 - P_2 = \\tfrac{1}{2}\\rho v^{2}\\). So \\(v = \\sqrt{\\dfrac{2(P_1 - P_2)}{\\rho}}\\) and \\(v \\propto \\sqrt{P_1 - P_2}\\).\n" +
        "- Lift on a wing: \\(F = \\tfrac{1}{2}\\rho\\left(v_{\\text{top}}^{2} - v_{\\text{bottom}}^{2}\\right)A\\), with A the TOTAL area of the wings.\n" +
        "- Level flight at constant speed: lift = weight, mg.\n" +
        "- Two close speeds: \\(v_1^{2} - v_2^{2} = (v_1 + v_2)(v_1 - v_2)\\). This turns a pressure difference into a small speed difference.\n" +
        "- Convert km/h to m/s by multiplying by 5/18.",
      formula: {
        label: "Lift on a wing",
        latex: "F = \\tfrac{1}{2}\\rho\\left(v_{\\text{top}}^{2} - v_{\\text{bottom}}^{2}\\right)A",
      },
      authoredExample: {
        prompt:
          "Air (\\(1.2\\ \\text{kg/m}^{3}\\)) flows over a glider's wings at 144 km/h above and 108 km/h below. The total wing area is \\(25\\ \\text{m}^{2}\\). Find the lift and the largest mass the glider can have in level flight. (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "Speeds: 144 km/h = 40 m/s, 108 km/h = 30 m/s.",
          "\\(\\Delta P = \\tfrac{1}{2} \\times 1.2 \\times (40^{2} - 30^{2}) = 0.6 \\times 700 = 420\\) Pa.",
          "Lift \\(= 420 \\times 25 = 10\\,500\\) N.",
          "Level flight: \\(m = 10\\,500/10 = 1050\\) kg.",
        ],
        answer: "Lift 10 500 N; mass 1050 kg.",
      },
      selfCheckExample: {
        prompt:
          "A gauge on a closed water pipe reads \\(3.0 \\times 10^{5}\\) Pa. When the valve is opened it reads \\(2.5 \\times 10^{5}\\) Pa. Find the speed of the water. (\\(\\rho = 1000\\ \\text{kg/m}^{3}\\))",
        steps: [
          "\\(\\Delta P = 0.5 \\times 10^{5} = 5 \\times 10^{4}\\) Pa.",
          "\\(\\tfrac{1}{2} \\times 1000 \\times v^{2} = 5 \\times 10^{4}\\), so \\(v^{2} = 100\\).",
        ],
        answer: "10 m/s",
      },
      practiceSet: [
        { prompt: "A water gauge drops by 2000 Pa when the valve opens. Speed of the water?", answer: "2 m/s" },
        { prompt: "The gauge drop becomes four times as large. The speed becomes?", answer: "Twice as large" },
        { prompt: "72 km/h in m/s?", answer: "20 m/s" },
        { prompt: "Wings of total area \\(10\\ \\text{m}^{2}\\); the pressure below exceeds that above by 500 Pa. Lift?", answer: "5000 N" },
      ],
      pyqExampleId: "29ff82a1-bed6-4c34-9118-4b6c0389308e", // 2024: two wings, mass of the plane
      traps: [
        {
          title: "Two wings: add both areas",
          body: "'Each of its two wings has an area A' means a total of 2A. Using one wing's area halves the lift and the mass.",
        },
        {
          title: "Convert km/h before squaring",
          body: "Square the speeds in m/s. Converting after squaring needs (5/18)², and mixing the two orders is a common slip.",
        },
      ],
    },

    // C3 — efflux
    {
      kind: "formula" as const,
      slug: "jpfluid-efflux",
      name: "Liquid leaving a hole: Torricelli's law",
      intuition:
        "Liquid leaving a small hole at depth h below the free surface comes out as fast as a body that has fallen freely through h: \\(v = \\sqrt{2gh}\\). Anything that adds pressure on the surface, such as a load or a piston, adds to the push. Once out, the jet is a projectile launched horizontally.",
      definition:
        "- \\(v = \\sqrt{2gh}\\), with h measured DOWN from the free surface to the hole. The tank is wide, so the speed of the top surface is neglected.\n" +
        "- A load or piston of weight W on the surface of area A: \\(\\tfrac{1}{2}\\rho v^{2} = \\rho g h + \\dfrac{W}{A}\\). The atmosphere acts on both the surface and the jet, so it cancels.\n" +
        "- Range on the floor from a hole at height y above the base, depth h below the surface: \\(x = v\\sqrt{2y/g} = 2\\sqrt{h y}\\).\n" +
        "- For water of total height H, the range is greatest for a hole at the middle, \\(h = H/2\\), and then \\(x = H\\).\n" +
        "- If the tank stands on a block, the jet falls through the block's height as well.\n" +
        "- The jet pushes the tank back with force \\(\\rho a v^{2} = 2\\rho a g h\\). To hold a massless tank by friction, \\(\\mu \\ge \\dfrac{2a}{A}\\).",
      formula: {
        label: "Torricelli's law and the range",
        latex: "v = \\sqrt{2gh}, \\qquad x = 2\\sqrt{h\\,y}",
      },
      authoredExample: {
        prompt:
          "A wide tank holds water 1.25 m deep. A small hole is made 0.45 m above the base. Find the speed of the jet and how far from the tank it lands. Where should the hole be for the longest range? (\\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "Depth below the surface: \\(h = 1.25 - 0.45 = 0.8\\) m, so \\(v = \\sqrt{2 \\times 10 \\times 0.8} = 4\\) m/s.",
          "Fall time: \\(t = \\sqrt{2 \\times 0.45/10} = 0.3\\) s, so \\(x = 4 \\times 0.3 = 1.2\\) m. Check: \\(2\\sqrt{0.8 \\times 0.45} = 2 \\times 0.6\\).",
          "Longest range: a hole at half the height, 0.625 m, gives \\(x = H = 1.25\\) m.",
        ],
        answer: "4 m/s; it lands 1.2 m away. Longest range 1.25 m, from a hole 0.625 m up.",
      },
      selfCheckExample: {
        prompt:
          "A 60 kg piston rests on the water in a wide tank of area \\(0.3\\ \\text{m}^{2}\\). A small hole is 1.6 m below the water surface. Find the speed of the jet. (\\(\\rho = 1000\\ \\text{kg/m}^{3}\\), \\(g = 10\\ \\text{m/s}^{2}\\))",
        steps: [
          "The piston adds \\(\\dfrac{60 \\times 10}{0.3} = 2000\\) Pa.",
          "The water adds \\(\\rho g h = 1000 \\times 10 \\times 1.6 = 16\\,000\\) Pa.",
          "\\(\\tfrac{1}{2} \\times 1000 \\times v^{2} = 18\\,000\\), so \\(v^{2} = 36\\).",
        ],
        answer: "6 m/s",
      },
      practiceSet: [
        { prompt: "A hole is 5 m below the water surface. Jet speed? (\\(g = 10\\ \\text{m/s}^{2}\\))", answer: "10 m/s" },
        { prompt: "Water stands 8 m deep. At what depth should a hole be for the longest range?", answer: "4 m (the range is then 8 m)" },
        { prompt: "By what factor must the depth of a hole grow to double the jet speed?", answer: "4" },
        { prompt: "A hole is 0.2 m above the floor and 0.8 m below the water surface. Range?", answer: "0.8 m" },
      ],
      pyqExampleId: "1c118811-dbb3-41ad-b94c-2694c13a877d", // 2025: load on the water, speed through a side hole
      traps: [
        {
          title: "Depth is measured from the free surface",
          body: "h in √(2gh) is the depth of the hole below the water surface: the water's height minus the hole's height. Using the hole's height above the base gives the wrong speed.",
        },
        {
          title: "A load adds W/A, the atmosphere adds nothing",
          body: "Air presses on the surface and on the jet alike, so P₀ cancels. Only the extra pressure of the load, its weight over the tank's area, joins ρgh.",
        },
      ],
    },
  ],
};
