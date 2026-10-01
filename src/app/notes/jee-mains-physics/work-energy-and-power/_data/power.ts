import type { SubtopicNote } from "@/app/notes/_types";

export const POWER_WEP_NOTE: SubtopicNote = {
  subtopicName: "Power",
  title: "Power",
  oneLineDefinition:
    "Power is the rate of doing work: P = F·v at an instant, and work divided by time on average.",
  whyItMatters:
    "Fourteen PYQs, nine of them multiple choice, and one from 2026. Nine use P = F·v or P = W/t: four time-dependent forces acting from rest, one average against instantaneous power, motors and a dam moving water, an elevator, and a block pulled up an incline; five drive a body with constant power and ask how its speed or position grows with time. The time-dependent force is the one to practise: velocity first, by integrating, and only then the dot product.",
  concepts: [
    // C1 — P = F·v
    {
      kind: "formula" as const,
      slug: "jpwep-power-force",
      name: "Power from force and velocity",
      intuition:
        "Power is how fast work is being done. A force F on a body moving at velocity v does work at the rate F·v. If the force changes with time and the body starts from rest, the velocity is not given, so find it first by integrating the acceleration F/m.",
      definition:
        "- Instantaneous: \\(P = \\vec F\\cdot\\vec v\\). Average: \\(P_{\\text{avg}} = W/t = \\Delta K/t\\).\n" +
        "- Force \\(\\vec F(t)\\) from rest: \\(\\vec v = \\dfrac{1}{m}\\displaystyle\\int_{0}^{t}\\vec F\\,dt\\), then \\(P = \\vec F\\cdot\\vec v\\) at the same instant.\n" +
        "- Lifting a mass m through h in time t: \\(P = mgh/t\\). Water pumped or falling: \\(P = (\\text{mass per second})\\,gh\\); a rate per hour is divided by 3600.\n" +
        "- Efficiency η: useful power \\(= \\eta \\times\\) input power.\n" +
        "- Elevator rising at steady speed v against friction f: \\(P = (Mg + f)v\\).\n" +
        "- Pulled up a smooth incline with acceleration a: \\(F = ma + mg\\sin\\theta\\), then \\(P = Fv\\).\n" +
        "- Units: 1 W = 1 J/s; 1 hp = 746 W; 1 kWh = \\(3.6 \\times 10^{6}\\) J.",
      formula: {
        label: "Power",
        latex: "P = \\vec F\\cdot\\vec v \\qquad P_{\\text{avg}} = \\frac{W}{t} \\qquad \\vec v = \\frac{1}{m}\\int_{0}^{t}\\vec F\\,dt",
      },
      authoredExample: {
        prompt:
          "A 3 kg body starts from rest under a force \\(\\vec F = (6t\\,\\hat i + 3t^{2}\\,\\hat j)\\) N. Find the power delivered by the force at \\(t = 2\\) s.",
        steps: [
          "\\(\\vec a = \\vec F/m = 2t\\,\\hat i + t^{2}\\,\\hat j\\).",
          "From rest: \\(\\vec v = t^{2}\\,\\hat i + \\dfrac{t^{3}}{3}\\,\\hat j\\); at \\(t = 2\\), \\(\\vec v = 4\\hat i + \\tfrac{8}{3}\\hat j\\) m/s.",
          "At \\(t = 2\\): \\(\\vec F = 12\\hat i + 12\\hat j\\) N.",
          "\\(P = 12 \\times 4 + 12 \\times \\tfrac{8}{3} = 48 + 32\\).",
        ],
        answer: "\\(80\\) W",
      },
      selfCheckExample: {
        prompt:
          "A pump lifts 600 kg of water per minute through a height of 15 m. Its efficiency is 75%. Find the power it draws. (\\(g = 10\\) m/s²)",
        steps: [
          "600 kg per minute is 10 kg per second.",
          "Useful power: \\(10 \\times 10 \\times 15 = 1500\\) W.",
          "Input: \\(1500 / 0.75\\).",
        ],
        answer: "\\(2000\\) W",
      },
      practiceSet: [
        { prompt: "A force \\((3\\hat i + 4\\hat j)\\) N acts on a body moving at \\((2\\hat i - \\hat j)\\) m/s. Find the power.", answer: "\\(2\\) W" },
        { prompt: "A 500 kg lift rises at a steady 2 m/s against a friction of 1000 N. Find the motor's power. (\\(g = 10\\) m/s²)", answer: "\\(12\\) kW" },
        { prompt: "A 2 kg block is pulled from rest up a smooth 30° incline with acceleration 2 m/s². Find the power of the pull at \\(t = 3\\) s. (\\(g = 10\\) m/s²)", answer: "\\(84\\) W" },
        { prompt: "A 1 kg body starts from rest under a force \\(F = 4t\\) N along a line. Find the power at \\(t = 1\\) s.", answer: "\\(8\\) W" },
      ],
      pyqExampleId: "7fbc7da4-80ea-4cde-8341-0e8f7d24694a", // 4 Apr 2026 S1: time-dependent force from rest, power at t = 2 s
      traps: [
        {
          title: "Instantaneous power needs the velocity at that instant",
          body: "P = F·v uses the force and the velocity at the same moment. With a time-dependent force, multiplying by an average velocity, or by v = (F/m)t as if the force were constant, gives the wrong power.",
        },
        {
          title: "Count friction and efficiency",
          body: "An elevator motor at steady speed supplies (Mg + f)v, not Mgv. A pump of efficiency η draws its useful power divided by η, which is more than the useful power, not less.",
        },
        {
          title: "Per hour means per 3600 seconds",
          body: "Water falling at 3600 kg per hour is 1 kg per second. Leaving the rate per hour in P = (mass per second)gh gives a power 3600 times too large.",
        },
      ],
    },

    // C2 — constant power
    {
      kind: "formula" as const,
      slug: "jpwep-constant-power",
      name: "Motion under constant power",
      intuition:
        "With constant power the kinetic energy grows at a steady rate, so ½mv² = Pt. The speed then grows as the square root of time, and the distance as time to the power three halves. The force is not constant: it falls as the body speeds up, because F = P/v.",
      definition:
        "- From rest: \\(\\tfrac12 mv^{2} = Pt\\), so \\(v = \\sqrt{\\dfrac{2P}{m}}\\,t^{1/2}\\).\n" +
        "- Integrating: \\(x = \\tfrac{2}{3}\\sqrt{\\dfrac{2P}{m}}\\,t^{3/2} = \\sqrt{\\dfrac{8P}{9m}}\\,t^{3/2}\\).\n" +
        "- \\(a = dv/dt \\propto t^{-1/2}\\) and \\(F = P/v \\propto t^{-1/2}\\).\n" +
        "- Distances in times \\(t_1\\) and \\(t_2\\) from rest: \\(x_1 : x_2 = (t_1/t_2)^{3/2}\\).\n" +
        "- Also \\(x = \\tfrac{2}{3}vt\\): the distance is two thirds of what the final speed would cover in the same time.",
      formula: {
        label: "Constant power from rest",
        latex: "v = \\sqrt{\\frac{2P}{m}}\\,t^{1/2} \\qquad x = \\sqrt{\\frac{8P}{9m}}\\,t^{3/2}",
      },
      authoredExample: {
        prompt:
          "A 4 kg cart starts from rest, driven by a motor that delivers a constant 8 W. Find its speed and the distance it has covered after 9 s.",
        steps: [
          "\\(\\tfrac12 (4)v^{2} = 8 \\times 9 = 72 \\Rightarrow v^{2} = 36\\), so \\(v = 6\\) m/s.",
          "\\(x = \\tfrac{2}{3}\\sqrt{\\dfrac{2P}{m}}\\,t^{3/2} = \\tfrac{2}{3}\\sqrt{4}\\,(9)^{3/2} = \\tfrac{2}{3} \\times 2 \\times 27\\).",
          "Check with \\(x = \\tfrac{2}{3}vt = \\tfrac{2}{3} \\times 6 \\times 9 = 36\\) m.",
        ],
        answer: "6 m/s; 36 m.",
      },
      selfCheckExample: {
        prompt:
          "A body starts from rest and moves under constant power. It covers 8 m in the first 4 s. How far does it go in the first 9 s?",
        steps: [
          "\\(x \\propto t^{3/2}\\), so \\(x_9 = 8 \\times \\left(\\dfrac{9}{4}\\right)^{3/2} = 8 \\times \\dfrac{27}{8}\\).",
        ],
        answer: "\\(27\\) m",
      },
      practiceSet: [
        { prompt: "A body moves from rest under constant power. How does its speed depend on time?", answer: "\\(v \\propto t^{1/2}\\)" },
        { prompt: "A motor delivers a constant 20 W to a body at rest. Find its kinetic energy after 5 s.", answer: "\\(100\\) J" },
        { prompt: "A 2 kg body starts from rest under a constant power of 4 W. Find its speed at \\(t = 4\\) s.", answer: "\\(4\\) m/s" },
        { prompt: "Under constant power from rest, how does the driving force depend on time?", answer: "\\(F \\propto t^{-1/2}\\)" },
      ],
      pyqExampleId: "628d93c9-fec6-457b-bd86-3f9b1ebeb828", // 30 Jan 2023: constant power from rest, displacement in 4 s
      traps: [
        {
          title: "Constant power is not constant force",
          body: "With constant power the force falls as the speed rises. Using v = at and x = ½at², as for a constant force, gives x ∝ t² instead of x ∝ t^(3/2).",
        },
        {
          title: "The power is t^(3/2), not t^(2/3)",
          body: "Both appear in the options. The distance grows faster than t, because the body keeps speeding up, so the power of t must be more than 1: three halves.",
        },
      ],
    },
  ],
};
