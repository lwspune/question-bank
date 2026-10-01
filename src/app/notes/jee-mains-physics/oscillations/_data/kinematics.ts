import type { SubtopicNote } from "@/app/notes/_types";

export const KINEMATICS_OSC_NOTE: SubtopicNote = {
  subtopicName: "SHM Equation, Velocity and Acceleration",
  title: "SHM Equation, Velocity and Acceleration",
  oneLineDefinition:
    "In x = A sin(ωt + φ) the phase ωt + φ fixes where the particle is, how fast it moves and which way it accelerates; speed and displacement are tied by v = ω√(A² − x²).",
  whyItMatters:
    "Twenty-two PYQs, half of them asking for a number, and two from 2026. Nine read the phase from the equation or from the starting position: when the particle stops, where it starts and which way it moves. Thirteen tie speed to displacement: a speed at a point, an amplitude from one snapshot, ω from a relation such as v² = c − bx², and the ellipse that v against x draws.",
  concepts: [
    // C1 — the phase
    {
      kind: "formula" as const,
      slug: "jposc-phase",
      name: "Phase, velocity and acceleration from the SHM equation",
      intuition:
        "Everything about the particle sits in one angle, the phase \\(\\omega t + \\phi\\). Displacement is its sine, velocity its cosine, and acceleration is always \\(-\\omega^{2}\\) times the displacement. So the particle stops where the sine is \\(\\pm 1\\) (the extremes), and its acceleration is zero where the sine is 0 (the mean position).",
      definition:
        "- \\(x = A\\sin(\\omega t + \\phi)\\), \\(v = A\\omega\\cos(\\omega t + \\phi)\\), \\(a = -\\omega^{2}A\\sin(\\omega t + \\phi) = -\\omega^{2}x\\).\n" +
        "- Velocity leads displacement by \\(\\pi/2\\); acceleration is always opposite to displacement.\n" +
        "- **At rest** (\\(v = 0\\)) when the phase is \\(\\pi/2, 3\\pi/2, \\dots\\): the extremes.\n" +
        "- **Zero acceleration** when the phase is \\(0, \\pi, \\dots\\): the mean position, where the speed is largest.\n" +
        "- **Initial phase** from \\(x(0)\\) and the direction: \\(x(0) = A/2\\) moving towards \\(+x\\) gives \\(\\phi = \\pi/6\\); moving towards \\(-x\\) gives \\(\\phi = 5\\pi/6\\).\n" +
        "- From \\(x(0) = x_0\\) and \\(v(0) = v_0\\): \\(A^{2} = x_0^{2} + v_0^{2}/\\omega^{2}\\) and \\(\\tan\\phi = \\omega x_0/v_0\\). So the starting position and momentum fix the whole motion.\n" +
        "- **Reference circle**: a point moving round a circle of radius r at angular speed ω. Its projection on a diameter does SHM of amplitude r. If the radius makes angle \\(\\omega t + \\phi_0\\) with the x-axis, the projection on the x-axis is \\(r\\cos(\\omega t + \\phi_0)\\).",
      formula: {
        label: "Displacement, velocity and acceleration in SHM",
        latex: "x = A\\sin(\\omega t + \\phi) \\qquad v = A\\omega\\cos(\\omega t + \\phi) \\qquad a = -\\omega^{2}x",
      },
      authoredExample: {
        prompt:
          "A particle moves as \\(x = 4\\sin\\left(10t + \\dfrac{\\pi}{6}\\right)\\) cm. Find (a) the first time after \\(t = 0\\) at which it is at rest, (b) the first time its acceleration is zero, and (c) its velocity at \\(t = 0\\).",
        steps: [
          "(a) At rest when the phase reaches \\(\\pi/2\\): \\(10t = \\dfrac{\\pi}{2} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3}\\), so \\(t = \\dfrac{\\pi}{30}\\) s.",
          "(b) Acceleration is zero when \\(x = 0\\), that is when the phase next reaches \\(\\pi\\): \\(10t = \\pi - \\dfrac{\\pi}{6} = \\dfrac{5\\pi}{6}\\), so \\(t = \\dfrac{\\pi}{12}\\) s.",
          "(c) \\(v = A\\omega\\cos\\phi = 4 \\times 10 \\times \\cos\\dfrac{\\pi}{6} = 40 \\times \\dfrac{\\sqrt{3}}{2} = 20\\sqrt{3}\\) cm/s.",
        ],
        answer: "(a) \\(\\pi/30\\) s; (b) \\(\\pi/12\\) s; (c) \\(20\\sqrt{3} \\approx 34.6\\) cm/s.",
      },
      selfCheckExample: {
        prompt:
          "A particle moves as \\(x = 6\\sin\\left(\\dfrac{\\pi t}{2} + \\phi\\right)\\) cm. At \\(t = 0\\) it is at \\(x = 3\\) cm and moving towards \\(-x\\). Find \\(\\phi\\) and the first time it reaches the mean position.",
        steps: [
          "\\(3 = 6\\sin\\phi\\), so \\(\\sin\\phi = \\dfrac{1}{2}\\): \\(\\phi = \\dfrac{\\pi}{6}\\) or \\(\\dfrac{5\\pi}{6}\\).",
          "Moving towards \\(-x\\) means \\(v(0) = A\\omega\\cos\\phi < 0\\), so \\(\\cos\\phi < 0\\) and \\(\\phi = \\dfrac{5\\pi}{6}\\).",
          "The mean position comes when the phase reaches \\(\\pi\\): \\(\\dfrac{\\pi t}{2} = \\pi - \\dfrac{5\\pi}{6} = \\dfrac{\\pi}{6}\\), so \\(t = \\dfrac{1}{3}\\) s.",
        ],
        answer: "\\(\\phi = 5\\pi/6\\); \\(t = 1/3\\) s.",
      },
      practiceSet: [
        { prompt: "\\(x = 5\\sin(2t + \\pi/4)\\) m. What is the maximum speed?", answer: "\\(10\\) m/s" },
        { prompt: "In SHM, by what phase does velocity lead displacement?", answer: "\\(\\pi/2\\)" },
        { prompt: "\\(x = A\\sin(\\omega t + \\phi)\\) with \\(x(0) = A/2\\), moving towards \\(+x\\). Find \\(\\phi\\).", answer: "\\(\\pi/6\\)" },
        { prompt: "\\(x = A\\sin(\\omega t + \\phi)\\) with \\(x(0) = 3\\) cm and \\(v(0) = 4\\omega\\) cm/s. Find the amplitude.", answer: "\\(5\\) cm" },
      ],
      pyqExampleId: "61424739-b543-495b-be9a-cddf4ecceac0", // 2026: x = a sin(50t + π/3), times of rest and of zero acceleration
      traps: [
        {
          title: "At rest means phase π/2, not phase 0",
          body: "At phase 0 the particle is at the mean position, moving at its fastest. It stops at the extremes, where the phase is π/2 or 3π/2.",
        },
        {
          title: "The starting direction picks the initial phase",
          body: "x(0) = A/2 gives sin φ = 1/2, which allows both π/6 and 5π/6. Moving towards +x needs cos φ > 0 (π/6); moving towards −x needs cos φ < 0 (5π/6).",
        },
        {
          title: "Projection on the x-axis is a cosine",
          body: "For a point on the reference circle at angle ωt + φ₀ from the x-axis, the projection on the x-axis is r cos(ωt + φ₀) and on the y-axis r sin(ωt + φ₀). Mixing them up shifts the phase by π/2.",
        },
      ],
    },

    // C2 — speed against displacement
    {
      kind: "formula" as const,
      slug: "jposc-v-x",
      name: "Speed at a displacement and amplitude from one snapshot",
      intuition:
        "Squaring and adding the sine and the cosine removes time: \\(v^{2} = \\omega^{2}(A^{2} - x^{2})\\). So the speed is largest at the mean and zero at the extremes, while the acceleration does the opposite. One snapshot of x, v and a is enough to find ω and A.",
      definition:
        "- \\(v = \\omega\\sqrt{A^{2} - x^{2}}\\); \\(v_{max} = A\\omega\\) at the mean.\n" +
        "- \\(|a| = \\omega^{2}|x|\\); \\(a_{max} = \\omega^{2}A\\) at the extremes; maximum force \\(F_{max} = m\\omega^{2}A\\).\n" +
        "- **From a relation** \\(v^{2} = c - bx^{2}\\): \\(\\omega^{2} = b\\) and \\(A^{2} = c/b\\). If \\(v^{2}\\) has a number in front, divide by it first: \\(9v^{2} = 36 - x^{2}\\) gives \\(\\omega = 1/3\\), \\(A = 6\\).\n" +
        "- **From one snapshot**: ω from \\(|a| = \\omega^{2}|x|\\), then \\(A^{2} = x^{2} + v^{2}/\\omega^{2}\\).\n" +
        "- **From two (x, v) pairs**: \\(\\omega^{2} = \\dfrac{v_1^{2} - v_2^{2}}{x_2^{2} - x_1^{2}}\\).\n" +
        "- **From a force law** \\(F = -Cx\\): \\(\\omega = \\sqrt{C/m}\\).\n" +
        "- The v–x graph is an **ellipse**, \\(\\dfrac{x^{2}}{A^{2}} + \\dfrac{v^{2}}{A^{2}\\omega^{2}} = 1\\); the a–x graph is a straight line through the origin with slope \\(-\\omega^{2}\\).",
      formula: {
        label: "Speed and acceleration at a displacement",
        latex: "v = \\omega\\sqrt{A^{2} - x^{2}} \\qquad v_{max} = A\\omega \\qquad a_{max} = \\omega^{2}A",
      },
      authoredExample: {
        prompt:
          "At one instant a particle in SHM is 3 cm from the mean position, moving at 8 cm/s, with an acceleration of magnitude 12 cm/s². Find ω, the amplitude and the maximum speed.",
        steps: [
          "\\(|a| = \\omega^{2}|x|\\): \\(12 = \\omega^{2} \\times 3\\), so \\(\\omega = 2\\) rad/s.",
          "\\(A^{2} = x^{2} + \\dfrac{v^{2}}{\\omega^{2}} = 9 + \\dfrac{64}{4} = 25\\), so \\(A = 5\\) cm.",
          "\\(v_{max} = A\\omega = 5 \\times 2 = 10\\) cm/s.",
        ],
        answer: "\\(\\omega = 2\\) rad/s, \\(A = 5\\) cm, \\(v_{max} = 10\\) cm/s.",
      },
      selfCheckExample: {
        prompt:
          "The speed v (in m/s) of a particle in SHM varies with its displacement x (in m) as \\(2v^{2} = 72 - 8x^{2}\\). Find its period and amplitude.",
        steps: [
          "Divide by 2: \\(v^{2} = 36 - 4x^{2} = 4(9 - x^{2})\\).",
          "Compare with \\(v^{2} = \\omega^{2}(A^{2} - x^{2})\\): \\(\\omega = 2\\) rad/s and \\(A = 3\\) m.",
          "\\(T = \\dfrac{2\\pi}{\\omega} = \\pi\\) s.",
        ],
        answer: "\\(T = \\pi \\approx 3.14\\) s; \\(A = 3\\) m.",
      },
      practiceSet: [
        { prompt: "Amplitude 0.05 m, period \\(0.2\\pi\\) s. What is the maximum speed?", answer: "\\(0.5\\) m/s" },
        { prompt: "Amplitude 10 cm and maximum speed 20 cm/s. What is the speed at \\(x = 6\\) cm?", answer: "\\(16\\) cm/s" },
        { prompt: "At what displacement is the speed half its maximum value, for amplitude A?", answer: "\\(\\dfrac{\\sqrt{3}}{2}A\\)" },
        { prompt: "A 0.5 kg particle moves under \\(F = -50x\\) N with amplitude 0.2 m. What is its maximum speed?", answer: "\\(2\\) m/s" },
      ],
      pyqExampleId: "329fa425-58ea-4f8a-9a4a-4d3eed034a2b", // 2024: x, v, a at one instant give the amplitude √17 m
      traps: [
        {
          title: "Divide by the number in front of v² first",
          body: "In 4v² = 50 − x², ω² is not 1. Divide through: v² = 12.5 − x²/4, so ω = 1/2 and the period is 4π, not 2π.",
        },
        {
          title: "The v–x graph is an ellipse",
          body: "Speed against displacement is an ellipse, not a straight line and not a parabola. It is a circle only when Aω equals A in the chosen units. The straight line is the a–x graph.",
        },
        {
          title: "Acceleration is largest at the extremes",
          body: "Where the speed is zero, the acceleration is ω²A, its largest value. At the mean position the speed is largest and the acceleration is zero.",
        },
      ],
    },
  ],
};
