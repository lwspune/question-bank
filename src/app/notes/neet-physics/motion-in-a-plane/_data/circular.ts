import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_MP_CIRCULAR_NOTE: SubtopicNote = {
  subtopicName: "Uniform Circular Motion",
  title: "Uniform Circular Motion",
  oneLineDefinition:
    "Motion round a circle at steady speed: angle turned, angular speed ω = 2π/T and v = ωR, and the centripetal acceleration v²/R that always points to the centre, plus the tangential part when the speed changes.",
  whyItMatters:
    "Two NEET questions, both from 2024. NEET 2024 asked which quantities stay constant when a body goes round a circle at uniform speed, and Re-NEET 2024 compared the angular speeds of a clock's three hands with the angles they turn in one minute. Both are about reading the circle correctly, not about long sums.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphmp-angular",
      name: "Angle turned, angular speed and period",
      intuition:
        "On a circle it is easier to track the angle a body has turned than the distance it has covered. Angular speed is how fast that angle grows. Every point on a turning wheel turns through the same angle in the same time, so they share one angular speed, but a point farther out covers more distance, so its speed is larger.",
      definition:
        "- Angle turned in radians: \\(\\theta = \\dfrac{s}{R}\\), where s is the arc length. One full turn is \\(2\\pi\\) rad.\n" +
        "- **Angular speed** \\(\\omega = \\dfrac{\\Delta\\theta}{\\Delta t}\\). In uniform circular motion ω is constant, so \\(\\theta = \\omega t\\).\n" +
        "- **Period** T is the time for one turn and **frequency** \\(\\nu = \\dfrac{1}{T}\\): \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi\\nu\\).\n" +
        "- Speed and angular speed: \\(v = \\omega R\\).\n" +
        "- A clock's hands: the second hand turns once in 60 s, the minute hand once in 3600 s, the hour hand once in 12 hours.",
      formula: {
        label: "Angular speed",
        latex: "\\omega = \\frac{\\Delta\\theta}{\\Delta t} = \\frac{2\\pi}{T} = 2\\pi\\nu, \\qquad \\theta = \\omega t, \\qquad v = \\omega R",
        symbols: [
          { symbol: "\\(\\omega\\)", meaning: "angular speed, in rad/s" },
          { symbol: "\\(T\\)", meaning: "time for one turn" },
          { symbol: "\\(\\nu\\)", meaning: "turns per second" },
        ],
      },
      authoredExample: {
        prompt:
          "A wheel makes 300 turns a minute. Find its angular speed, and the speed of a point on its rim 0.5 m from the axis.",
        steps: [
          "300 turns a minute is 5 turns a second, so \\(\\omega = 2\\pi \\times 5 = 10\\pi \\approx 31.4\\ \\text{rad/s}\\).",
          "\\(v = \\omega R = 10\\pi \\times 0.5 = 5\\pi \\approx 15.7\\ \\text{m/s}\\).",
        ],
        answer: "about 31.4 rad/s and 15.7 m/s",
      },
      selfCheckExample: {
        prompt:
          "An insect sits 0.2 m from the centre of a turntable that makes 2 turns a second. Through what angle does it turn in 0.25 s, and what is its speed?",
        steps: [
          "\\(\\omega = 2\\pi \\times 2 = 4\\pi\\ \\text{rad/s}\\).",
          "\\(\\theta = \\omega t = 4\\pi \\times 0.25 = \\pi\\ \\text{rad}\\), half a turn.",
          "\\(v = \\omega R = 4\\pi \\times 0.2 = 0.8\\pi \\approx 2.5\\ \\text{m/s}\\).",
        ],
        answer: "\\(\\pi\\) rad; about 2.5 m/s",
      },
      practiceSet: [
        { prompt: "A body goes round a circle 4 times a second. What is its angular speed?", answer: "\\(8\\pi\\) rad/s" },
        { prompt: "Through what angle, in radians, does a body turn in a quarter of a turn?", answer: "\\(\\dfrac{\\pi}{2}\\) rad" },
        { prompt: "A particle moves on a circle of radius 2 m with angular speed 3 rad/s. What is its speed?", answer: "6 m/s" },
        { prompt: "A body turns with a steady angular speed of \\(\\pi\\) rad/s. How long does one full turn take?", answer: "2 s" },
      ],
      pyqExampleId: "aae90469-a6bc-4993-ad53-bd66ea8b7ee0",
      traps: [
        {
          title: "Turns are not radians",
          body: "A rate in turns per second must be multiplied by \\(2\\pi\\) to give ω in rad/s. Using the turns per second as ω makes every later answer \\(2\\pi\\) times too small.",
        },
        {
          title: "The hour hand takes 12 hours",
          body: "The hour hand of a clock goes round once in 12 hours, not 24. Its period is \\(12 \\times 3600 = 43200\\ \\text{s}\\).",
        },
        {
          title: "Angle and angular speed go together",
          body: "In a fixed time the angle turned is \\(\\theta = \\omega t\\), so a faster hand turns through a larger angle in the same ratio. The ratio \\(\\dfrac{\\omega}{\\theta}\\) is then the same for every hand, and equals \\(\\dfrac{1}{t}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphmp-centripetal",
      name: "Centripetal acceleration",
      intuition:
        "Going round a circle at steady speed still needs an acceleration, because the direction of the velocity keeps turning. The velocity always points along the tangent, and the change in it always points to the centre. So the acceleration has a fixed size, v²/R, but its direction turns with the body. If the body also speeds up or slows down, a second part along the tangent is added.",
      definition:
        "- Uniform circular motion: the speed is constant, but the velocity is not, since its direction changes all the time.\n" +
        "- **Centripetal acceleration** \\(a_c = \\dfrac{v^{2}}{R} = \\omega^{2}R = \\dfrac{4\\pi^{2}R}{T^{2}}\\), pointing to the centre. Its size is constant but its direction changes, so it is not a constant acceleration, and the equations for constant acceleration do not apply.\n" +
        "- The velocity is along the tangent, at right angles to the radius and to \\(a_c\\).\n" +
        "- If the speed also changes, a **tangential acceleration** \\(a_t\\) (the rate of change of speed) acts along the tangent. The total is \\(a = \\sqrt{a_c^{2} + a_t^{2}}\\), since the two are at right angles.\n" +
        "- In half a turn the velocity reverses, so the change in velocity is 2v.",
      formula: {
        label: "Centripetal acceleration",
        latex: "a_c = \\frac{v^{2}}{R} = \\omega^{2}R = \\frac{4\\pi^{2}R}{T^{2}}, \\qquad a = \\sqrt{a_c^{2} + a_t^{2}}",
        symbols: [
          { symbol: "\\(a_c\\)", meaning: "acceleration towards the centre" },
          { symbol: "\\(a_t\\)", meaning: "rate of change of speed, along the tangent" },
        ],
      },
      authoredExample: {
        prompt:
          "A stone tied to a string 0.4 m long is whirled in a horizontal circle at 2 turns a second. Find its centripetal acceleration.",
        steps: [
          "\\(\\omega = 2\\pi \\times 2 = 4\\pi\\ \\text{rad/s}\\).",
          "\\(a_c = \\omega^{2}R = 16\\pi^{2} \\times 0.4 = 6.4\\pi^{2} \\approx 63\\ \\text{m/s}^{2}\\), towards the centre.",
        ],
        answer: "about \\(63\\ \\text{m/s}^{2}\\), towards the centre",
      },
      selfCheckExample: {
        prompt:
          "A car takes a curve of radius 50 m at 10 m/s while braking, so its speed falls by 1.5 m/s every second. What is the size of its total acceleration?",
        steps: [
          "Towards the centre: \\(a_c = \\dfrac{10^{2}}{50} = 2\\ \\text{m/s}^{2}\\).",
          "Along the tangent: \\(a_t = 1.5\\ \\text{m/s}^{2}\\).",
          "At right angles: \\(a = \\sqrt{2^{2} + 1.5^{2}} = \\sqrt{6.25} = 2.5\\ \\text{m/s}^{2}\\).",
        ],
        answer: "\\(2.5\\ \\text{m/s}^{2}\\)",
      },
      practiceSet: [
        { prompt: "A particle moves at 4 m/s on a circle of radius 2 m. What is its centripetal acceleration?", answer: "\\(8\\ \\text{m/s}^{2}\\)" },
        { prompt: "In which direction does the acceleration of a body in uniform circular motion point?", answer: "Towards the centre of the circle" },
        { prompt: "A body's speed on a circle doubles while the radius stays the same. By what factor does its centripetal acceleration change?", answer: "4 times" },
        { prompt: "A particle goes half way round a circle at a steady speed v. What is the size of the change in its velocity?", answer: "2v" },
      ],
      pyqExampleId: "8dfaad31-fa6d-42dc-a8ec-f370dd2beb45",
      traps: [
        {
          title: "Uniform speed is not uniform velocity",
          body: "A body going round a circle at steady speed has a changing velocity, because velocity has a direction and the direction keeps turning. That change is why it accelerates.",
        },
        {
          title: "Towards the centre, not away",
          body: "Centripetal acceleration points towards the centre of the circle. Nothing in uniform circular motion accelerates the body outward.",
        },
        {
          title: "Constant size is not constant acceleration",
          body: "The size \\(\\dfrac{v^{2}}{R}\\) stays fixed, but the direction turns with the body. So the acceleration is not constant, and \\(v = u + at\\) cannot be used on the curved path.",
        },
        {
          title: "Add the two parts at right angles",
          body: "When the speed changes on a circle, the total acceleration is \\(\\sqrt{a_c^{2} + a_t^{2}}\\), not \\(a_c + a_t\\): one part points to the centre and the other along the tangent.",
        },
      ],
    },
  ],
};
