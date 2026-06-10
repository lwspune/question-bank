import type { SubtopicNote } from "@/app/notes/_types";

export const CIRCULAR_NOTE: SubtopicNote = {
  subtopicName: "Circular Motion",
  title: "Circular Motion",
  oneLineDefinition:
    "In uniform circular motion the speed is constant but the velocity changes continuously because its direction keeps turning; this change is a centripetal acceleration of magnitude v²/r directed toward the centre.",
  whyItMatters:
    "Three PYQs, but they punch above their weight because they expose the chapter's deepest idea: constant speed is NOT constant velocity. " +
    "The bank tests that a body going round a circle at steady speed is still accelerating (toward the centre), that a gentler curve (larger radius) means a smaller acceleration, and — in a HARD item — the average acceleration over half a circle. Hold v²/r and the velocity-is-a-vector idea and these are quick marks.",
  concepts: [
    // 1 — uniform circular motion: velocity changes
    {
      kind: "formula" as const,
      slug: "uniform-circular-velocity-change",
      name: "Uniform circular motion — constant speed, changing velocity",
      intuition:
        "Drive a car round a roundabout at a steady 30 km/h: the speedometer never moves, but the car is constantly changing direction. Since velocity includes direction, the velocity is changing every instant — and a changing velocity means there is an acceleration, even though the speed is fixed.",
      definition:
        "In **uniform circular motion** the speed is constant but the **velocity changes** continuously because its direction is always changing (the velocity is tangent to the circle). " +
        "A changing velocity means a non-zero acceleration; that acceleration points toward the centre and is called **centripetal acceleration**.",
      authoredExample: {
        prompt:
          "A car moves uniformly along a circular track at constant speed. What, if anything, is changing about its motion?",
        steps: [
          "Speed is constant (uniform motion), so the magnitude of velocity is fixed.",
          "But the direction of motion changes continuously around the circle.",
          "Velocity is a vector, so a change in direction is a change in velocity.",
        ],
        answer: "The velocity changes (in direction), due to the continuous change in direction of motion.",
      },
      selfCheckExample: {
        prompt:
          "A satellite orbits Earth in a circle at constant speed. Is it accelerating? Justify in one line.",
        steps: [
          "Its speed is constant, but its direction changes continuously.",
          "Changing velocity ⟹ acceleration; the acceleration points toward Earth (the centre).",
        ],
        answer: "Yes — it has a centripetal acceleration directed toward Earth.",
      },
      practiceSet: [
        { prompt: "In uniform circular motion, is the speed constant?", answer: "Yes" },
        { prompt: "In uniform circular motion, is the velocity constant?", answer: "No — its direction changes" },
        { prompt: "Which way does the centripetal acceleration point?", answer: "Toward the centre" },
        { prompt: "Is a body in uniform circular motion accelerating?", answer: "Yes" },
      ],
      pyqExampleId: "cbd00437-d669-42c5-a2f8-c5424fbc8231", // 2021 — change in velocity due to direction
      traps: [
        {
          title: "Constant speed is not constant velocity",
          body:
            "The single most common error in circular motion: treating 'uniform speed' as 'no acceleration'. The direction of velocity changes every instant, so the velocity is changing and there IS an acceleration — directed toward the centre.",
        },
      ],
    },

    // 2 — centripetal acceleration v²/r
    {
      kind: "formula" as const,
      slug: "centripetal-acceleration",
      name: "Centripetal acceleration — v²/r toward the centre",
      intuition:
        "The inward acceleration that keeps a body on its circular path has magnitude v²/r. For the same speed, a sharper curve (smaller radius) needs a bigger inward acceleration; a gentle curve (large radius) needs only a small one. That is why fast bends on a road are built with large radii.",
      definition:
        "The **centripetal acceleration** of a body moving at speed \\(v\\) on a circle of radius \\(r\\) has magnitude \\(a_c = \\dfrac{v^2}{r}\\), directed toward the centre. " +
        "At fixed speed it is **inversely proportional to the radius**: a gentle curve (large \\(r\\)) gives a smaller acceleration than a sharp curve (small \\(r\\)).",
      formula: {
        label: "Centripetal acceleration",
        latex: "a_c = \\dfrac{v^2}{r}",
        symbols: [
          { symbol: "a_c", meaning: "centripetal acceleration (toward centre)" },
          { symbol: "v", meaning: "speed" },
          { symbol: "r", meaning: "radius of the circular path" },
        ],
      },
      authoredExample: {
        prompt:
          "A car takes a bend of radius 50 m at 10 m/s. Find its centripetal acceleration.",
        steps: [
          "Use \\(a_c = \\dfrac{v^2}{r}\\).",
          "\\(a_c = \\dfrac{10^2}{50} = \\dfrac{100}{50} = 2\\) m/s\\(^2\\), directed toward the centre of the bend.",
        ],
        answer: "2 m/s² (toward the centre).",
      },
      selfCheckExample: {
        prompt:
          "At the same speed, a car takes first a sharp curve (small radius) and then a gentle curve (large radius). On which curve is the centripetal acceleration larger?",
        steps: [
          "Centripetal acceleration is \\(a_c = v^2/r\\); at fixed v it varies as \\(1/r\\).",
          "Smaller radius ⟹ larger acceleration. So the sharp curve gives the larger centripetal acceleration.",
        ],
        answer: "On the sharp curve (smaller radius) — its centripetal acceleration is larger.",
      },
      practiceSet: [
        { prompt: "v = 6 m/s, r = 9 m. Centripetal acceleration?", answer: "4 m/s²", method: "v²/r = 36/9" },
        { prompt: "At fixed speed, doubling the radius does what to a_c?", answer: "Halves it", method: "a_c ∝ 1/r" },
        { prompt: "Direction of centripetal acceleration?", answer: "Toward the centre" },
        { prompt: "Gentle (large-radius) curve vs sharp (small-radius), same speed — which has smaller a_c?", answer: "Gentle curve" },
      ],
      pyqExampleId: "76b80c41-201c-40b9-b2b1-61917ceabb52", // 2017 — gentle curve smaller a_c
      traps: [
        {
          title: "Centripetal acceleration does not change the speed",
          body:
            "The centripetal acceleration is perpendicular to the velocity (it points inward, velocity is tangent), so it changes only the DIRECTION of motion, never the speed. An option claiming 'centripetal acceleration causes the object to slow down' is false.",
        },
      ],
    },

    // 3 — average acceleration over an arc
    {
      kind: "formula" as const,
      slug: "average-acceleration-over-arc",
      name: "Average acceleration over part of a circle",
      intuition:
        "Centripetal acceleration v²/r is the INSTANTANEOUS value. The AVERAGE acceleration over a stretch of the path is different — it uses the actual change in the velocity vector divided by the time. Over half a circle the velocity simply reverses, so the change in velocity is 2v.",
      definition:
        "Average acceleration over an interval is \\(\\bar{a} = \\dfrac{|\\Delta \\vec{v}|}{\\Delta t}\\), using the vector change in velocity. " +
        "Over **half a circle** the velocity reverses direction, so \\(|\\Delta \\vec{v}| = 2v\\); the time is the arc length over the speed, \\(\\Delta t = \\dfrac{\\pi r}{v}\\). " +
        "Hence the average acceleration over half a circle is \\(\\dfrac{2v}{\\pi r / v} = \\dfrac{2v^2}{\\pi r}\\).",
      formula: {
        label: "Average acceleration over half a circle",
        latex: "\\bar{a} = \\dfrac{|\\Delta \\vec{v}|}{\\Delta t} = \\dfrac{2v}{\\pi r / v} = \\dfrac{2v^2}{\\pi r}",
        symbols: [
          { symbol: "\\Delta \\vec{v}", meaning: "vector change in velocity (= 2v over half a circle)" },
          { symbol: "\\Delta t", meaning: "time for the half circle (= πr/v)" },
          { symbol: "v", meaning: "constant speed" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle moves at constant speed v on a circle of radius R. Find its average acceleration over the time it covers half the circle.",
        steps: [
          "Over half a circle the velocity reverses, so \\(|\\Delta \\vec{v}| = 2v\\).",
          "Time for the half circle: \\(\\Delta t = \\dfrac{\\text{half circumference}}{v} = \\dfrac{\\pi R}{v}\\).",
          "Average acceleration: \\(\\bar{a} = \\dfrac{2v}{\\pi R / v} = \\dfrac{2v^2}{\\pi R}\\).",
        ],
        answer: "\\(\\dfrac{2v^2}{\\pi R}\\).",
      },
      selfCheckExample: {
        prompt:
          "Over one COMPLETE revolution at constant speed, what is the average acceleration?",
        steps: [
          "After a full revolution the particle returns to its start with the same velocity vector.",
          "So the change in velocity over the full loop is \\(\\Delta \\vec{v} = 0\\).",
          "Average acceleration = \\(0 / \\Delta t = 0\\).",
        ],
        answer: "0 — the velocity vector is unchanged after a full revolution.",
      },
      practiceSet: [
        { prompt: "Over half a circle, the change in velocity magnitude is?", answer: "2v", method: "velocity reverses direction" },
        { prompt: "Average acceleration over one full revolution?", answer: "0", method: "Δv = 0" },
        { prompt: "Time to cover half a circle of radius R at speed v?", answer: "πR/v", method: "half circumference / speed" },
      ],
      pyqExampleId: "67e758f2-8830-42aa-b997-0d6275c41f15", // 2023 HARD — avg accel = 2v²/πR
      traps: [
        {
          title: "Average acceleration is not the instantaneous v²/r",
          body:
            "v²/r is the instantaneous centripetal acceleration. The AVERAGE over half a circle uses |Δv|/Δt = 2v ÷ (πr/v) = 2v²/πr — a different expression. And over a full revolution the average acceleration is zero (Δv = 0), even though the instantaneous value is never zero.",
        },
      ],
    },
  ],
};
