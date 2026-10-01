import type { SubtopicNote } from "@/app/notes/_types";

export const UCM_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Uniform Circular Motion: Angular Speed and Acceleration",
  title: "Uniform Circular Motion: Angular Speed and Acceleration",
  oneLineDefinition:
    "A body moving round a circle of radius r at angular speed ω has speed v = ωr and an acceleration v²/r = ω²r pointing at the centre, even when its speed is constant; if the speed changes as well, a tangential acceleration dv/dt adds to it at right angles.",
  whyItMatters:
    "Nineteen PYQs, sixteen of them multiple choice, and none from 2026. Seven compare the distance travelled round a circle with the displacement, or the average velocity with the speed. Twelve use the centripetal acceleration: a value from a period or an rpm, its direction as a vector, how the speed must change with the radius, and three where the speed itself changes so a tangential acceleration joins in. Three of the seven distance questions come with a figure; read the angle turned off it first.",
  concepts: [
    // C1 — arc, chord, average velocity
    {
      kind: "formula" as const,
      slug: "jpplane-arc-displacement",
      name: "Distance, displacement and average velocity on a circle",
      intuition:
        "Going round a circle, the distance travelled is the length of the arc, but the displacement is the straight chord from start to finish. After a full turn the displacement is zero; after half a turn it is the diameter. Average speed uses the arc, average velocity uses the chord, so on a circle the average velocity is always smaller than the speed.",
      definition:
        "- Angle turned \\(\\theta = \\omega t\\) (in radians); arc \\(s = r\\theta\\).\n" +
        "- Displacement \\(= 2r\\sin\\dfrac{\\theta}{2}\\): \\(r\\sqrt{2}\\) for a quarter or three quarters of a turn, \\(2r\\) for half a turn, 0 for a whole one.\n" +
        "- Average speed \\(= v\\); average velocity \\(= \\dfrac{2r\\sin(\\theta/2)}{t}\\).\n" +
        "- \\(\\dfrac{v}{v_{avg}} = \\dfrac{\\theta}{2\\sin(\\theta/2)}\\).\n" +
        "- Clock hands: the second hand turns once a minute, the minute hand once an hour, the hour hand once in 12 hours.",
      formula: {
        label: "Arc and chord",
        latex: "s = r\\theta \\qquad |\\Delta\\vec{r}| = 2r\\sin\\frac{\\theta}{2} \\qquad \\frac{v}{v_{avg}} = \\frac{\\theta}{2\\sin(\\theta/2)}",
      },
      authoredExample: {
        prompt:
          "A particle moves at constant speed on a circle of radius 6 m and turns through \\(60^{\\circ}\\) in 2 s. Find the distance travelled, the displacement, the average speed and the average velocity.",
        steps: [
          "Distance \\(= 6 \\times \\dfrac{\\pi}{3} = 2\\pi\\ \\text{m}\\); displacement \\(= 2(6)\\sin 30^{\\circ} = 6\\ \\text{m}\\).",
          "Average speed \\(= \\dfrac{2\\pi}{2} = \\pi\\ \\text{m/s}\\); average velocity \\(= \\dfrac{6}{2} = 3\\ \\text{m/s}\\).",
          "Their ratio is \\(\\pi : 3\\), which matches \\(\\dfrac{\\pi/3}{2\\sin 30^{\\circ}}\\).",
        ],
        answer: "\\(2\\pi\\) m, 6 m, \\(\\pi\\) m/s, 3 m/s",
      },
      selfCheckExample: {
        prompt:
          "A runner covers two thirds of a circular track of radius 4 m. Find the distance run and the size of the displacement.",
        steps: [
          "Angle turned \\(= \\dfrac{2}{3} \\times 2\\pi = \\dfrac{4\\pi}{3}\\) (\\(240^{\\circ}\\)); distance \\(= 4 \\times \\dfrac{4\\pi}{3} = \\dfrac{16\\pi}{3}\\ \\text{m}\\).",
          "Displacement \\(= 2(4)\\sin 120^{\\circ} = 4\\sqrt{3}\\ \\text{m}\\).",
        ],
        answer: "\\(16\\pi/3\\) m and \\(4\\sqrt{3}\\) m",
      },
      practiceSet: [
        { prompt: "The tip of a 10 cm minute hand in 15 minutes: distance and displacement?", answer: "\\(5\\pi\\) cm and \\(10\\sqrt{2}\\) cm" },
        { prompt: "Half a turn on a circle of radius 3 m: distance and displacement?", answer: "\\(3\\pi\\) m and 6 m" },
        { prompt: "Displacement after one full lap of a 400 m track?", answer: "Zero" },
        { prompt: "Angular speed of a clock's second hand?", answer: "\\(\\pi/30\\) rad/s" },
      ],
      pyqExampleId: "45888d72-09c0-4273-8e92-562f63211906", // 6 Apr 2023: ratio of speed to average velocity over 90°
      traps: [
        {
          title: "Average velocity from the arc",
          body: "Average velocity is displacement over time, and the displacement is the chord 2r sin(θ/2). Dividing the arc length by the time gives the average speed instead.",
        },
        {
          title: "Degrees in s = rθ",
          body: "The arc length rθ needs θ in radians. Ninety degrees is π/2, so a quarter turn of radius r is πr/2 long, not 90r.",
        },
      ],
    },

    // C2 — centripetal and tangential acceleration
    {
      kind: "formula" as const,
      slug: "jpplane-centripetal",
      name: "Centripetal and tangential acceleration",
      intuition:
        "At constant speed the velocity still changes direction all the time, and that change needs an acceleration pointing at the centre: v²/r, or ω²r. Because it is always at right angles to the velocity, it turns the motion without speeding it up, and the force behind it does no work. If the speed is also changing, a second acceleration dv/dt acts along the velocity; the two are at right angles, so they add by Pythagoras.",
      definition:
        "- \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi f\\); for N rpm, \\(\\omega = \\dfrac{2\\pi N}{60}\\). Speed \\(v = \\omega r\\).\n" +
        "- Centripetal acceleration \\(a_c = \\dfrac{v^{2}}{r} = \\omega^{2}r\\), towards the centre; as a vector \\(\\vec{a} = -\\omega^{2}\\vec{r}\\).\n" +
        "- In uniform circular motion the force is at right angles to the velocity and to the momentum, so it does no work and the speed stays constant.\n" +
        "- Same mass and same centripetal force: \\(v \\propto \\sqrt{r}\\). A central force \\(F \\propto 1/R^{n}\\) gives \\(T \\propto R^{(n+1)/2}\\).\n" +
        "- Changing speed: tangential acceleration \\(a_t = \\dfrac{dv}{dt}\\); total \\(a = \\sqrt{a_t^{2} + a_c^{2}}\\). Only the tangential force does work: power \\(P = F_t v\\).\n" +
        "- \\(a_t = a_c\\) at every instant: \\(v\\dfrac{dv}{ds} = \\dfrac{v^{2}}{R}\\) gives \\(v = v_0e^{s/R}\\), and the time to turn through θ is \\(\\dfrac{R}{v_0}(1 - e^{-\\theta})\\).",
      formula: {
        label: "Circular motion",
        latex:
          "v = \\omega r \\qquad a_c = \\frac{v^{2}}{r} = \\omega^{2}r \\qquad a = \\sqrt{a_t^{2} + a_c^{2}},\\ a_t = \\frac{dv}{dt}",
      },
      authoredExample: {
        prompt:
          "A stone on a string goes round a horizontal circle of radius 0.5 m at 120 rpm. Find its angular speed, its speed and its centripetal acceleration.",
        steps: [
          "\\(\\omega = \\dfrac{2\\pi \\times 120}{60} = 4\\pi\\ \\text{rad/s}\\).",
          "\\(v = \\omega r = 2\\pi \\approx 6.28\\ \\text{m/s}\\).",
          "\\(a_c = \\omega^{2}r = 16\\pi^{2}(0.5) = 8\\pi^{2} \\approx 79\\ \\text{m/s}^{2}\\), towards the centre.",
        ],
        answer: "\\(4\\pi\\) rad/s, \\(2\\pi\\) m/s, \\(8\\pi^{2} \\approx 79\\ \\text{m/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt:
          "A car on a circular track of radius 50 m moves at 10 m/s and is speeding up at \\(2\\ \\text{m/s}^{2}\\). Find the size of its acceleration and its angle with the velocity.",
        steps: [
          "\\(a_c = \\dfrac{100}{50} = 2\\ \\text{m/s}^{2}\\) (towards the centre); \\(a_t = 2\\ \\text{m/s}^{2}\\) (along the velocity).",
          "\\(a = \\sqrt{4 + 4} = 2\\sqrt{2}\\ \\text{m/s}^{2}\\), at \\(\\tan^{-1}(a_c/a_t) = 45^{\\circ}\\) to the velocity.",
        ],
        answer: "\\(2\\sqrt{2}\\ \\text{m/s}^{2}\\), at \\(45^{\\circ}\\) to the velocity",
      },
      practiceSet: [
        { prompt: "A particle goes anticlockwise round a circle of radius 2 m centred at the origin at 3 m/s. At (0, 2), its velocity and acceleration?", answer: "\\(\\vec{v} = -3\\hat{i}\\) m/s, \\(\\vec{a} = -4.5\\hat{j}\\ \\text{m/s}^{2}\\)" },
        { prompt: "Two equal masses feel the same centripetal force on circles of radii in the ratio 4 : 9. Ratio of speeds?", answer: "2 : 3" },
        { prompt: "Work done by the centripetal force in one full turn of uniform circular motion?", answer: "Zero" },
        { prompt: "A 2 kg body goes round a circle of radius 1 m at 3 rad/s. Centripetal force?", answer: "18 N" },
      ],
      pyqExampleId: "50b1dc8f-aa9d-427e-bc8c-21caac7878dd", // 29 Jan 2023: velocity and acceleration vectors half a turn later
      traps: [
        {
          title: "Constant speed, zero acceleration",
          body: "In uniform circular motion the speed is constant but the direction is not, so the acceleration is v²/r towards the centre. Only straight-line motion at constant speed has zero acceleration.",
        },
        {
          title: "Forgetting to convert rpm",
          body: "ω in rad/s is 2π × (revolutions per second). For N rpm divide by 60 first: 120 rpm is 4π rad/s, not 240π.",
        },
        {
          title: "Adding the two accelerations directly",
          body: "Tangential and centripetal accelerations are at right angles. Their total is √(a_t² + a_c²), never a_t + a_c.",
        },
      ],
    },
  ],
};
