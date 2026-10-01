import type { SubtopicNote } from "@/app/notes/_types";

export const PENDULUM_OSC_NOTE: SubtopicNote = {
  subtopicName: "Simple Pendulum and Effective g",
  title: "Simple Pendulum and Effective g",
  oneLineDefinition:
    "A simple pendulum swings with T = 2π√(L/g), whatever the mass of its bob; a height, a planet, a lift, an incline or a liquid changes only the g in that formula.",
  whyItMatters:
    "Twenty-six PYQs, twenty-three of them multiple choice, and two from 2026. Twelve use T = 2π√(L/g) directly: a changed length, a T²–L graph, the seconds pendulum, a clock's daily error, a large swing. Fourteen change g: a height above the earth, another planet, a lift, a vehicle on an incline, a bob in a liquid.",
  concepts: [
    // C1 — the period and its length
    {
      kind: "formula" as const,
      slug: "jposc-pendulum-basics",
      name: "Period of a simple pendulum and how it depends on length",
      intuition:
        "For small swings the pull back towards the lowest point is \\(mg\\theta\\), and the bob's mass cancels. So the period depends only on the length and on g, and grows as the square root of the length: four times the length, twice the period.",
      definition:
        "- \\(T = 2\\pi\\sqrt{L/g}\\), independent of the bob's mass and of the (small) amplitude.\n" +
        "- \\(T^{2} = \\dfrac{4\\pi^{2}}{g}L\\): the \\(T^{2}\\)–L graph is a straight line through the origin, and \\(g = 4\\pi^{2}L/T^{2}\\).\n" +
        "- n oscillations in time t: \\(T = t/n\\). Twice as many in the same time needs a quarter of the length.\n" +
        "- **Seconds pendulum**: \\(T = 2\\) s, so 1 s from one extreme to the other. Its length is \\(g/\\pi^{2}\\), about 1 m.\n" +
        "- **Clock error**: \\(\\dfrac{\\Delta T}{T} = \\dfrac{1}{2}\\dfrac{\\Delta L}{L}\\). Time lost per day \\(= \\dfrac{1}{2}\\dfrac{\\Delta L}{L} \\times 86400\\) s; a longer pendulum runs slow.\n" +
        "- Angular acceleration \\(= -\\dfrac{g}{L}\\theta\\).\n" +
        "- **Large swings** (amplitude \\(\\theta_0\\)): at the extreme the acceleration is \\(g\\sin\\theta_0\\), all tangential; at the lowest point it is \\(v^{2}/L = 2g(1 - \\cos\\theta_0)\\), all towards the pivot. The tension is largest at the lowest point: \\(mg(3 - 2\\cos\\theta_0)\\).",
      formula: {
        label: "Simple pendulum",
        latex: "T = 2\\pi\\sqrt{\\frac{L}{g}} \\qquad \\frac{\\Delta T}{T} = \\frac{1}{2}\\frac{\\Delta L}{L}",
      },
      authoredExample: {
        prompt:
          "A pendulum 100 cm long makes 30 oscillations in one minute. (a) Find its period. (b) What length makes 60 oscillations in one minute? (c) Find g at that place.",
        steps: [
          "(a) \\(T = 60/30 = 2\\) s.",
          "(b) 60 oscillations a minute means \\(T = 1\\) s, half as long. \\(T \\propto \\sqrt{L}\\), so the length is a quarter: \\(100/4 = 25\\) cm.",
          "(c) \\(g = \\dfrac{4\\pi^{2}L}{T^{2}} = \\dfrac{4\\pi^{2} \\times 1}{4} = \\pi^{2} \\approx 9.87\\) m/s².",
        ],
        answer: "(a) 2 s; (b) 25 cm; (c) \\(\\pi^{2} \\approx 9.87\\) m/s².",
      },
      selfCheckExample: {
        prompt:
          "A pendulum clock keeps correct time. Its pendulum then grows longer by 0.05%. How many seconds does it lose in a day?",
        steps: [
          "\\(\\dfrac{\\Delta T}{T} = \\dfrac{1}{2} \\times 0.0005 = 0.00025\\).",
          "Loss per day \\(= 0.00025 \\times 86400 = 21.6\\) s.",
        ],
        answer: "About 21.6 s",
      },
      practiceSet: [
        { prompt: "The length of a pendulum is made 9 times as long. What happens to its period?", answer: "It becomes 3 times as long" },
        { prompt: "How long does a seconds pendulum take to go from one extreme to the other?", answer: "\\(1\\) s" },
        { prompt: "Period of a 2.5 m pendulum where g = 10 m/s²?", answer: "\\(\\pi \\approx 3.14\\) s" },
        { prompt: "A pendulum is released from 60° to the vertical. What is its acceleration at that extreme?", answer: "\\(g\\sin 60^{\\circ} \\approx 8.7\\) m/s² (taking g = 10), along the arc" },
      ],
      pyqExampleId: "6ac968a6-22ce-4e52-ac12-296092e620e5", // 2026: 30 cm, 20 oscillations in 10 s; length for 40 oscillations
      traps: [
        {
          title: "A seconds pendulum has a period of 2 s",
          body: "It takes 1 s to go from one extreme to the other, and 2 s for a full oscillation. Taking T = 1 s gives a length a quarter of the right one.",
        },
        {
          title: "The bob's mass does not enter",
          body: "Changing the mass of the bob, or keeping it the same, does not change T = 2π√(L/g). Only L and g matter.",
        },
        {
          title: "A longer pendulum makes a clock slow",
          body: "A longer pendulum has a longer period, so the clock ticks less often and loses time. Heat lengthens the pendulum, so a clock loses time in summer.",
        },
        {
          title: "Large swings: the two accelerations point different ways",
          body: "At the extreme the speed is zero, so the acceleration is only tangential, g sin θ₀. At the lowest point the tangential part is zero and only v²/L remains.",
        },
      ],
    },

    // C2 — effective g
    {
      kind: "formula" as const,
      slug: "jposc-effective-g",
      name: "Effective g for a pendulum at a height, on a planet, in a lift or in a liquid",
      intuition:
        "Whatever changes, the pendulum still obeys \\(T = 2\\pi\\sqrt{L/g}\\) with g replaced by the acceleration the bob would have if it were let go, measured from the support. Find that effective g first, then use the formula.",
      definition:
        "- **Height h** above the earth: \\(g_h = g\\dfrac{R^{2}}{(R + h)^{2}}\\), so \\(T \\propto R + h\\). At \\(h = R\\), g falls to \\(g/4\\) and T doubles.\n" +
        "- **Mountain**: g is smaller, T is longer, so a pendulum clock runs slow.\n" +
        "- **Planet**: \\(g \\propto M/R^{2}\\). Four times the mass and twice the radius give the same g.\n" +
        "- **Lift** accelerating upward at a (or moving down and slowing): \\(g + a\\). Accelerating downward at a: \\(g - a\\). In free fall: 0, and the pendulum does not swing.\n" +
        "- **Vehicle sliding freely down a smooth incline** of angle α: \\(g\\cos\\alpha\\). Vehicle accelerating horizontally at a: \\(\\sqrt{g^{2} + a^{2}}\\).\n" +
        "- **Bob in a liquid** (ignoring drag): buoyancy reduces the pull, \\(g_{eff} = g(1 - \\rho_{liquid}/\\rho_{bob})\\).",
      formula: {
        label: "Pendulum with an effective g",
        latex: "T = 2\\pi\\sqrt{\\frac{L}{g_{eff}}} \\qquad g_h = g\\left(\\frac{R}{R + h}\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "A pendulum has period 2 s in a lift at rest. Find its period (a) when the lift accelerates upward at \\(g/3\\), (b) when it accelerates downward at \\(g/3\\), and (c) on the ground of a planet with twice the earth's mass and twice its radius.",
        steps: [
          "(a) \\(g_{eff} = g + \\dfrac{g}{3} = \\dfrac{4g}{3}\\), so \\(T = 2\\sqrt{\\dfrac{3}{4}} = \\sqrt{3} \\approx 1.73\\) s.",
          "(b) \\(g_{eff} = g - \\dfrac{g}{3} = \\dfrac{2g}{3}\\), so \\(T = 2\\sqrt{\\dfrac{3}{2}} = \\sqrt{6} \\approx 2.45\\) s.",
          "(c) \\(g' = g \\times \\dfrac{2}{2^{2}} = \\dfrac{g}{2}\\), so \\(T = 2\\sqrt{2} \\approx 2.83\\) s.",
        ],
        answer: "(a) about 1.73 s; (b) about 2.45 s; (c) about 2.83 s.",
      },
      selfCheckExample: {
        prompt:
          "A pendulum bob of density 8000 kg/m³ swings with period 2 s in air. Find its period when it swings fully under a liquid of density 2000 kg/m³ (ignore drag).",
        steps: [
          "\\(g_{eff} = g\\left(1 - \\dfrac{2000}{8000}\\right) = \\dfrac{3g}{4}\\).",
          "\\(T' = 2\\sqrt{\\dfrac{4}{3}} = \\dfrac{4}{\\sqrt{3}} \\approx 2.31\\) s.",
        ],
        answer: "About 2.31 s",
      },
      practiceSet: [
        { prompt: "By what factor does a pendulum's period change at a height equal to the earth's radius?", answer: "It doubles" },
        { prompt: "What is the period of a pendulum in a freely falling lift?", answer: "Infinite: it does not oscillate" },
        { prompt: "A vehicle slides freely down a smooth 60° incline. What is g_eff for a pendulum hung inside it?", answer: "\\(g/2\\)" },
        { prompt: "A planet has 4 times the earth's mass and twice its radius. How does a pendulum's period there compare?", answer: "The same as on the earth" },
      ],
      pyqExampleId: "6662ea0e-4aa9-44e0-b261-4b3ed8a7fd17", // 2022: clocks with periods 4 s and 6 s, height of the space station
      traps: [
        {
          title: "A height R puts the pendulum 2R from the centre",
          body: "\"At a height equal to the earth's radius\" means a distance R + R = 2R from the centre, so g is g/4 and T doubles. Using distance R from the centre gives no change at all.",
        },
        {
          title: "The lift's acceleration decides, not its velocity",
          body: "A lift moving down but slowing has an upward acceleration, so g_eff = g + a and the period is shorter. Look at the direction of a, not of v.",
        },
        {
          title: "A clock on a mountain runs slow",
          body: "g is smaller at a height, so T is longer and the clock ticks less often. It runs slow, not fast.",
        },
      ],
    },
  ],
};
