import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_WE_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power",
  title: "Power",
  oneLineDefinition:
    "Power as the rate of doing work, P = W/t, the power of falling or pumped water and a machine's efficiency, then instantaneous power P = F·v.",
  whyItMatters:
    "Four NEET questions from 2021 to 2026. Two use average power: a turbine run by falling water with 10% lost (NEET 2021) and a crane lifting a load in a given time (NEET 2026). Two use P = F·v: a lift moving up at steady speed against its weight and friction (NEET 2022), and a particle whose position is given as a function of time (NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphwe-average-power",
      name: "Power, efficiency and energy per second",
      intuition:
        "Power tells you how fast work is done. Two people who lift the same load to the same height do the same work, but the quicker one has more power. Falling water is a steady stream of energy: every second a certain mass drops a height h and gives up mgh. No machine passes on all the energy it takes in; its efficiency is the share that comes out as useful work.",
      definition:
        "- Average power: \\(P_{\\text{av}} = \\dfrac{W}{t}\\). Unit: the watt, 1 W = 1 J/s. 1 horsepower = 746 W.\n" +
        "- Lifting a mass m through a height h at steady speed in a time t: \\(P = \\dfrac{mgh}{t}\\).\n" +
        "- Water falling or pumped at a rate \\(\\dfrac{dm}{dt}\\) (kg per second) through a height h: \\(P = \\dfrac{dm}{dt}\\,gh\\).\n" +
        "- **Efficiency:** \\(\\eta = \\dfrac{P_{\\text{out}}}{P_{\\text{in}}}\\), so useful output \\(= \\eta \\times\\) input.\n" +
        "- The kilowatt hour is a unit of energy, not power: 1 kWh = \\(3.6 \\times 10^{6}\\) J.",
      formula: {
        label: "Power",
        latex: "P_{\\text{av}} = \\frac{W}{t}, \\qquad P = \\frac{dm}{dt}\\,gh, \\qquad \\eta = \\frac{P_{\\text{out}}}{P_{\\text{in}}}",
        symbols: [
          { symbol: "\\(\\dfrac{dm}{dt}\\)", meaning: "mass moved each second" },
          { symbol: "\\(\\eta\\)", meaning: "efficiency, useful output over input" },
        ],
      },
      authoredExample: {
        prompt:
          "A pump lifts 600 kg of water into a tank 20 m high in 4 minutes. Its efficiency is 50%. What power does it draw? (g = 10 m/s²)",
        steps: [
          "Useful work: \\(mgh = 600 \\times 10 \\times 20 = 1.2 \\times 10^{5}\\) J, in 240 s.",
          "Useful power: \\(\\dfrac{1.2 \\times 10^{5}}{240} = 500\\) W.",
          "Input power: \\(\\dfrac{500}{0.5} = 1000\\) W.",
        ],
        answer: "1 kW",
      },
      selfCheckExample: {
        prompt: "A motor of efficiency 80% draws 2 kW. How much useful work does it do in one minute?",
        steps: [
          "Useful power: \\(0.8 \\times 2000 = 1600\\) W.",
          "Work in 60 s: \\(1600 \\times 60 = 96\\,000\\) J.",
        ],
        answer: "96 kJ",
      },
      practiceSet: [
        { prompt: "How many joules are there in 1 kWh?", answer: "\\(3.6 \\times 10^{6}\\) J" },
        { prompt: "A machine does 1500 J of work in 30 s. What is its average power?", answer: "50 W" },
        { prompt: "A waterfall delivers 50 kg of water every second from a height of 20 m. What is the power of the falling water? (g = 10 m/s²)", answer: "10 kW" },
        { prompt: "An engine of efficiency 40% delivers 2 kW of useful power. What power does it take in?", answer: "5 kW" },
      ],
      pyqExampleId: "e145ba12-3326-4307-851a-4568fceb37c5",
      traps: [
        {
          title: "A kilowatt hour is energy",
          body: "kWh measures energy (power times time), not power. 1 kWh = \\(3.6 \\times 10^{6}\\) J.",
        },
        {
          title: "Multiply by the efficiency for output, divide for input",
          body: "Useful output = efficiency times input. To find the input from a known output, divide by the efficiency: an engine 60% efficient giving 2 kW takes in about 3.3 kW, not 1.2 kW.",
        },
        {
          title: "Time changes the power, not the work",
          body: "Lifting the same load to the same height takes the same work, mgh, however long it takes. A slower lift needs less power, not less work.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphwe-instant-power",
      name: "Instantaneous power, P = F·v",
      intuition:
        "At any instant, the work a force does each second is the force times the distance it moves the body in that second, that is the force times the velocity. Only the part of the force along the velocity counts. A motor pulling a load at steady speed still works hard: the net force is zero, but the motor's own force must balance the weight and the friction, and its power is that force times the speed.",
      definition:
        "- \\(P = \\dfrac{dW}{dt} = \\vec{F}\\cdot\\vec{v} = Fv\\cos\\theta\\).\n" +
        "- In components: \\(P = F_xv_x + F_yv_y + F_zv_z\\).\n" +
        "- Steady speed: the driving force equals the total of the forces against the motion (weight on a rise, friction), so \\(P = (\\text{that force}) \\times v\\).\n" +
        "- If the position is given as a function of time, find \\(v = \\dfrac{dx}{dt}\\) first.\n" +
        "- P positive: the force is speeding the body up. P negative: it is slowing it down. P zero: the force is at right angles to the motion.",
      formula: {
        label: "Instantaneous power",
        latex: "P = \\vec{F}\\cdot\\vec{v} = Fv\\cos\\theta",
      },
      authoredExample: {
        prompt:
          "A force \\(\\vec{F} = (4\\hat{i} + 3\\hat{j})\\) N acts on a body moving with velocity \\(\\vec{v} = (2\\hat{i} - \\hat{j} + 5\\hat{k})\\) m/s. Find the power delivered by the force.",
        steps: [
          "\\(P = \\vec{F}\\cdot\\vec{v} = (4)(2) + (3)(-1) + (0)(5)\\).",
          "\\(P = 8 - 3 + 0 = 5\\) W.",
        ],
        answer: "5 W",
      },
      selfCheckExample: {
        prompt:
          "A body moves along the x-axis with position \\(x = 3t^{2}\\) m. A constant 4 N force acts on it along x. What power does the force deliver at t = 2 s?",
        steps: [
          "\\(v = \\dfrac{dx}{dt} = 6t\\), so at t = 2 s, v = 12 m/s.",
          "\\(P = Fv = 4 \\times 12 = 48\\) W.",
        ],
        answer: "48 W",
      },
      practiceSet: [
        { prompt: "A 10 N force acts at 60° to a body's velocity of 4 m/s. What power does it deliver?", answer: "20 W" },
        { prompt: "A force stays at right angles to a body's velocity at every instant. What power does it deliver?", answer: "Zero" },
        { prompt: "A body's velocity is \\((3\\hat{i} + 4\\hat{j})\\) m/s and the force on it is \\((2\\hat{i} - \\hat{j})\\) N. Is the force speeding the body up or slowing it down at that instant?", answer: "Speeding it up: \\(P = 2\\) W is positive" },
        { prompt: "A constant net force acts on a body that starts from rest. How does the power delivered change with time?", answer: "It grows in proportion to the time" },
      ],
      pyqExampleId: "3b846825-82cf-4cb4-b0f0-63bd1e399a80",
      traps: [
        {
          title: "Steady speed does not mean zero motor force",
          body: "At constant speed the net force is zero, but the motor still supplies a force equal to the weight plus the friction. The power is that force times the speed, not zero.",
        },
        {
          title: "Find the velocity before the power",
          body: "When the position is given as a function of time, differentiate it to get v, then use \\(P = Fv\\). Multiplying the force by the position is a common slip.",
        },
        {
          title: "Power is a dot product",
          body: "Only the part of the force along the velocity delivers power: \\(P = Fv\\cos\\theta\\). Multiplying the magnitudes overstates it whenever the force is at an angle.",
        },
      ],
    },
  ],
};
