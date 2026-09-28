import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/oscillations";

export const KINEMATICS_NOTE: SubtopicNote = {
  subtopicName: "SHM Kinematics — Displacement, Velocity, Phase, and Damping",
  title: "SHM: Displacement, Velocity, Acceleration and Phase",
  oneLineDefinition:
    "In simple harmonic motion the acceleration is proportional to the displacement and directed towards the mean position, a = −ω²x; so x = A sin(ωt + α), the speed at displacement x is ω√(A² − x²), the extremes are ωA and ω²A, and the phase ωt + α says where in the cycle the particle is.",
  whyItMatters:
    "44 PYQs, 7 HARD — the largest page in the chapter. Twenty-four use the velocity–displacement relation — the speed at a given x, the displacement at a given speed, the period, frequency or amplitude from two positions, and the distance between two positions (the HARD ones); thirteen are phase and time — the time to reach a point, the distance covered in successive seconds, the phase difference between two motions; seven are forces — a platform that must not lose its load, two restoring forces acting together, damping. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-osc-velocity-displacement",
      name: "Velocity, Acceleration and Displacement",
      intuition:
        "Everything follows from v² = ω²(A² − x²) and a = −ω²x. At the mean position the speed is largest, ωA, and the acceleration zero; at the extremes the speed is zero and the acceleration ω²A. Two positions with known speeds give two equations: subtract them and A drops out, leaving ω; divide and ω drops out, leaving A. Given accelerations instead, use a = ω²x to turn them into positions. Maximum velocity and maximum acceleration together give both A = v²/a and ω = a/v.",
      definition:
        "- \\(v = \\omega\\sqrt{A^2 - x^2}\\), \\(a = -\\omega^2 x\\); \\(v_{\\max} = \\omega A\\), \\(a_{\\max} = \\omega^2 A\\).\n" +
        "- **Two positions** \\((x_1, v_1)\\), \\((x_2, v_2)\\): \\(\\omega^2 = \\dfrac{v_2^2 - v_1^2}{x_1^2 - x_2^2}\\), \\(A^2 = \\dfrac{v_1^2x_2^2 - v_2^2x_1^2}{v_1^2 - v_2^2}\\).\n" +
        "- **Distance between two positions** given speeds u, V and accelerations \\(a_1 < a_2\\): \\(\\dfrac{u^2 - V^2}{a_1 + a_2}\\).\n" +
        "- **From the extremes**: \\(A = \\dfrac{v_{\\max}^2}{a_{\\max}}\\); path length \\(2A = \\dfrac{2v_{\\max}^2}{a_{\\max}}\\).\n" +
        "- Speed \\(\\tfrac{1}{2}v_{\\max}\\) at \\(x = \\tfrac{\\sqrt{3}}{2}A\\); \\(\\tfrac{1}{3}v_{\\max}\\) at \\(\\tfrac{2\\sqrt{2}}{3}A\\). Amplitude × 2 with period ÷ 3 ⇒ \\(v_{\\max}\\) × 6.",
      formula: {
        label: "SHM velocity",
        latex: "v = \\omega\\sqrt{A^2 - x^2}, \\qquad a = -\\omega^2 x",
      },
      authoredExample: {
        prompt: "A particle in SHM has speeds 10 cm/s at 6 cm and 20 cm/s at 3 cm from the mean position. Find ω and the amplitude.",
        steps: [
          "ω² = (20² − 10²)/(6² − 3²) = 300/27, so ω = 10/3 rad/s.",
          "100 = (100/9)(A² − 36) ⇒ A² = 45, A = 3√5 cm.",
        ],
        answer: "ω = 10/3 rad/s; A = 3√5 cm",
      },
      selfCheckExample: {
        prompt: "At 3 cm and 4 cm from the mean position a particle has speeds 8 cm/s and 6 cm/s. Its period?",
        steps: ["ω² = (64 − 36)/(16 − 9) = 4, ω = 2."],
        answer: "π s",
      },
      practiceSet: [
        { prompt: "SHM of amplitude 4 cm, speed 12 cm/s at the mean position. Distance from the mean where the speed is 6 cm/s?", answer: "2√3 cm" },
        { prompt: "Maximum velocity α, maximum acceleration β. Path length?", answer: "2α²/β" },
        { prompt: "Equal amplitudes, ω = 300 and 3000 rad/s. Ratio of maximum accelerations?", answer: "1 : 100" },
      ],
      pyqExampleId: "3b41ca29-54b0-42e7-886f-517c7a5d6d5a",
      traps: [
        {
          title: "Subtracting the accelerations instead of adding",
          body:
            "The two positions are on the same side, so their distance is x₂ − x₁ = (u² − V²)/(a₁ + a₂). Dividing by a₁ − a₂ gives x₁ + x₂ instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-phase-and-time",
      name: "Phase, and Time to Reach a Point",
      intuition:
        "Write x = A sin ωt if the particle starts at the mean position, x = A cos ωt if it starts at an extreme. The phase ωt then tells you where it is: from the mean position it reaches A/2 at ωt = π/6 (T/12), A/√2 at π/4 (T/8), and the extreme at π/2 (T/4). Each full oscillation adds 2π of phase. Velocity leads displacement by π/2 and acceleration is opposite to displacement, π out of phase — so force against time is the displacement graph turned upside down.",
      definition:
        "- From the mean: \\(x = A\\sin\\omega t\\); from an extreme: \\(x = A\\cos\\omega t\\); \\(\\omega = \\dfrac{2\\pi}{T}\\).\n" +
        "- Mean → \\(\\tfrac{A}{2}\\): \\(\\tfrac{T}{12}\\); → \\(\\tfrac{A}{\\sqrt{2}}\\): \\(\\tfrac{T}{8}\\); → A: \\(\\tfrac{T}{4}\\).\n" +
        "- **Successive seconds** with T = 8 s from the mean: first second covers \\(\\tfrac{A}{\\sqrt{2}}\\), second covers \\(A - \\tfrac{A}{\\sqrt{2}}\\) — ratio \\(1 : (\\sqrt{2} - 1)\\).\n" +
        "- **Phase gap** between motions of periods \\(T_1, T_2\\) after time t: \\(2\\pi t\\left(\\tfrac{1}{T_1} - \\tfrac{1}{T_2}\\right)\\). Two oscillations ⇒ phase \\(4\\pi\\).\n" +
        "- **Phase relations**: v leads x by \\(\\tfrac{\\pi}{2}\\); a and F are \\(\\pi\\) out of phase with x.\n" +
        "- Pendulum released from θ: linear displacement \\(L\\theta\\cos\\left(\\sqrt{\\tfrac{g}{L}}\\,t\\right)\\).",
      formula: {
        label: "Phase",
        latex: "x = A\\sin(\\omega t + \\alpha), \\qquad \\omega = \\frac{2\\pi}{T}",
      },
      authoredExample: {
        prompt: "SHM of period 6 s starts at the mean position. When does it first reach half the amplitude, and what is its phase then?",
        steps: ["sin ωt = ½ ⇒ ωt = π/6.", "t = (π/6)/(2π/6) = 0.5 s."],
        answer: "0.5 s; π/6",
      },
      selfCheckExample: {
        prompt: "Period 16 s. Phase difference between the positions at t = 2 s and t = 4 s?",
        steps: ["ω = π/8; Δφ = ω × 2 s."],
        answer: "π/4",
      },
      practiceSet: [
        { prompt: "x = A cos(ωt + π/6). Earliest time of maximum speed?", answer: "π/(3ω)" },
        { prompt: "Time from mean position to half the amplitude, period T?", answer: "T/12" },
        { prompt: "Periods T and 3T/2, both from the mean. Phase difference when the first completes two oscillations?", answer: "4π/3" },
      ],
      pyqExampleId: "414cbbed-0afb-497a-a5fb-9eb45a73bea6",
      traps: [
        {
          title: "Using cos when the motion starts at the mean",
          body:
            "cos ωt starts at the extreme. A particle released from the mean position follows sin ωt — mixing them swaps T/12 with T/6.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-forces-and-damping",
      name: "Restoring Forces, Detachment and Damping",
      intuition:
        "A restoring force F = −kx gives ω = √(k/m); two such forces acting together add their k's, so 1/T² = 1/T₁² + 1/T₂². A load resting on a platform in vertical SHM stays on only while the platform's downward acceleration never exceeds g: ω²A ≤ g. A mass hung on a spring that is unstretched at the top of its swing has amplitude equal to the static stretch g/ω², and its top speed g/ω. Damping makes the amplitude die away exponentially — a factor each equal time — and slightly lowers ω.",
      definition:
        "- \\(a = -bx\\) ⇒ \\(\\omega = \\sqrt{b}\\), \\(T = \\dfrac{2\\pi}{\\sqrt{b}}\\).\n" +
        "- Two forces together: \\(T = \\dfrac{T_1T_2}{\\sqrt{T_1^2 + T_2^2}}\\).\n" +
        "- **Detachment**: \\(\\omega^2A = g\\) ⇒ \\(A = \\dfrac{gT^2}{4\\pi^2}\\) (T = 1 s ⇒ 0.25 m); least period for amplitude A: \\(2\\pi\\sqrt{\\tfrac{A}{g}}\\).\n" +
        "- **Unstretched at the top**: \\(A = \\dfrac{g}{\\omega^2}\\), \\(v_{\\max} = \\dfrac{g}{\\omega}\\).\n" +
        "- **Damped**: \\(A = A_0e^{-\\lambda t}\\) (⅓ in 2 s ⇒ 1/27 in 6 s); \\(\\omega' = \\sqrt{\\dfrac{k}{m} - \\left(\\dfrac{b}{2m}\\right)^2}\\).\n" +
        "- Equal masses on springs \\(K_1, K_2\\) with equal top speeds: \\(\\dfrac{A_B}{A_A} = \\sqrt{\\dfrac{K_1}{K_2}}\\).",
      formula: {
        label: "Damped amplitude",
        latex: "A = A_0e^{-\\lambda t}, \\qquad \\omega' = \\sqrt{\\frac{k}{m} - \\left(\\frac{b}{2m}\\right)^2}",
      },
      authoredExample: {
        prompt: "A platform oscillates vertically with period 2 s. Largest amplitude that keeps a coin on it (g = π² m/s²)?",
        steps: ["ω = π; ω²A = g ⇒ A = π²/π² = 1 m."],
        answer: "1 m",
      },
      selfCheckExample: {
        prompt: "A damped amplitude falls to one third in 2 s. After 6 s it is 1/n of the original. n?",
        steps: ["Three factors of ⅓."],
        answer: "27",
      },
      practiceSet: [
        { prompt: "Platform amplitude 40 cm, g = 10. Least period so the object stays on?", answer: "0.4π s" },
        { prompt: "A mass on a vertical spring, 10 Hz, spring unstretched at the top. Maximum speed (g = 10)?", answer: "1/(2π) m/s" },
      ],
      pyqExampleId: "038f425c-1535-4504-9316-b8aa018cc371",
      traps: [
        {
          title: "Thinking damping only shrinks the amplitude",
          body:
            "Damping also lowers the angular frequency: ω′ = √(k/m − b²/4m²). Adding the damping term, or leaving out the square root, gives the wrong options.",
        },
      ],
    },
  ],
  related: [
    { label: "Springs — where ω comes from", href: `${BASE}/cetp-osc-springs` },
    { label: "Energy in SHM", href: `${BASE}/cetp-osc-energy` },
  ],
};
