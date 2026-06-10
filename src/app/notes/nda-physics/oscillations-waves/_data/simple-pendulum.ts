import type { SubtopicNote } from "@/app/notes/_types";

export const OSCILLATIONS_SIMPLE_PENDULUM_NOTE: SubtopicNote = {
  subtopicName: "Simple Pendulum",
  title: "The Simple Pendulum",
  oneLineDefinition:
    "A simple pendulum is a point mass on a light inextensible string; for small swings it performs simple harmonic motion with a period T = 2π√(L/g) that depends only on the length and the local gravity — never on the mass of the bob.",
  whyItMatters:
    "The chapter's workhorse — seven PYQs, almost all turning on the one formula T = 2π√(L/g). The bank tests it from every angle: scale the length and the period scales as its square root (×4 length → ×2 period; halve length → period ÷√2), move to weaker gravity and the period lengthens, and — the recurring trap — double the mass and nothing happens at all. " +
    "A second, subtler thread is amplitude: the period is amplitude-independent only while the swing is small, because only then is the restoring force proportional to displacement. Memorise the formula, spot what each problem changes, and these are reliable marks.",
  concepts: [
    // 1 — the period law (workhorse)
    {
      kind: "formula" as const,
      slug: "osc-pendulum-period-law",
      name: "The pendulum period law T = 2π√(L/g) — mass-independent",
      intuition:
        "The time a pendulum takes for one swing depends on just two things: how long the string is and how strong gravity is. A longer string swings more slowly; stronger gravity swings it faster. What it does NOT depend on is the mass of the bob — a heavy bob and a light bob on equal strings keep perfect time together, because gravity pulls harder on the heavy one but also has more inertia to move.",
      definition:
        "For small oscillations the period of a simple pendulum is \\(T = 2\\pi\\sqrt{\\dfrac{L}{g}}\\).\n" +
        "- It is **proportional to \\(\\sqrt{L}\\)**: quadruple the length and the period doubles; halve the length and the period falls by \\(\\sqrt{2}\\).\n" +
        "- It is **inversely proportional to \\(\\sqrt{g}\\)**.\n" +
        "- It is **completely independent of the mass of the bob** and of the amplitude (for small swings).",
      formula: {
        label: "Period of a simple pendulum",
        latex: "T = 2\\pi\\sqrt{\\dfrac{L}{g}}",
        symbols: [
          { symbol: "T", meaning: "period (s)" },
          { symbol: "L", meaning: "length of the string" },
          { symbol: "g", meaning: "acceleration due to gravity" },
        ],
      },
      visualizationSlug: "osc-pendulum-restoring-force",
      authoredExample: {
        prompt:
          "A simple pendulum has period \\(T\\). Its length is increased to nine times its original value while the bob is replaced by one of triple the mass. Find the new period.",
        steps: [
          "Period depends only on length: \\(T \\propto \\sqrt{L}\\). The mass change is irrelevant.",
          "\\(\\dfrac{T'}{T} = \\sqrt{\\dfrac{9L}{L}} = \\sqrt{9} = 3\\).",
          "So \\(T' = 3T\\).",
        ],
        answer: "\\(T' = 3T\\) (the mass change has no effect).",
      },
      selfCheckExample: {
        prompt:
          "A pendulum of length \\(L\\) has period \\(T\\). The string is shortened to \\(L/4\\) and the bob is made twice as heavy. What is the new period?",
        steps: [
          "\\(T \\propto \\sqrt{L}\\), independent of mass.",
          "\\(\\dfrac{T'}{T} = \\sqrt{\\dfrac{L/4}{L}} = \\sqrt{\\tfrac{1}{4}} = \\tfrac{1}{2}\\).",
          "So \\(T' = T/2\\); the doubled mass changes nothing.",
        ],
        answer: "\\(T' = T/2\\).",
      },
      practiceSet: [
        { prompt: "Length ×4, mass ×3. Ratio of new to old period?", answer: "2:1", method: "√(4) = 2; mass irrelevant" },
        { prompt: "Length halved. New period in terms of old T?", answer: "T/√2", method: "√(½)" },
        { prompt: "Does doubling the bob's mass change the period?", answer: "No — period is mass-independent" },
        { prompt: "Approx. period of a 1 m pendulum (g ≈ 10)?", answer: "≈ 2 s", method: "2π√(1/10) ≈ 2 s" },
      ],
      pyqExampleId: "b8a2ac7a-946f-4bdb-afbe-ea0161d90d58", // 2018 — 4L, 2m → 2T
      traps: [
        {
          title: "Period does NOT depend on the mass of the bob",
          body:
            "Every length-and-mass problem in this bank plants a mass change to distract you. \\(T = 2\\pi\\sqrt{L/g}\\) has no \\(m\\) in it — double, triple or halve the mass and the period is unchanged. Read off only what happens to the LENGTH.",
        },
        {
          title: "Period scales as √L, not as L",
          body:
            "Quadrupling the length doubles the period (\\(\\sqrt{4} = 2\\)), it does NOT quadruple it. A distractor that gives '4T' for a ×4 length is using the wrong power — the square root is the whole point.",
        },
      ],
    },

    // 2 — g-dependence
    {
      kind: "formula" as const,
      slug: "osc-pendulum-g-dependence",
      name: "How gravity changes the period",
      intuition:
        "Because gravity is the restoring agent, a weaker pull makes the pendulum sluggish and a stronger pull makes it brisk. Take the same pendulum to a mountaintop, a deep mine, or the Moon, and although its length is unchanged its period shifts — lengthening wherever g is smaller. Since T depends on 1/√g, halving g multiplies the period by √2.",
      definition:
        "With length fixed, the period varies as \\(T \\propto \\dfrac{1}{\\sqrt{g}}\\).\n" +
        "- **Weaker gravity** (high altitude, the Moon) → **longer** period → a pendulum clock runs **slow**.\n" +
        "- **Stronger gravity** → **shorter** period → the clock runs **fast**.\n" +
        "- Quantitatively, if \\(g\\) becomes \\(g/2\\) the period becomes \\(\\sqrt{2}\\,T\\); if \\(g\\) doubles the period becomes \\(T/\\sqrt{2}\\).",
      formula: {
        label: "Period and gravity (length fixed)",
        latex: "\\dfrac{T_2}{T_1} = \\sqrt{\\dfrac{g_1}{g_2}}",
        symbols: [
          { symbol: "T_1, T_2", meaning: "old and new periods" },
          { symbol: "g_1, g_2", meaning: "old and new gravitational accelerations" },
        ],
      },
      authoredExample: {
        prompt:
          "A pendulum has period \\(T\\) where the gravitational acceleration is \\(g\\). It is carried (length unchanged) to a place where the gravitational acceleration is \\(4g\\). Find its new period.",
        steps: [
          "Length fixed, so \\(T \\propto 1/\\sqrt{g}\\): \\(\\dfrac{T'}{T} = \\sqrt{\\dfrac{g}{4g}} = \\sqrt{\\tfrac{1}{4}} = \\tfrac{1}{2}\\).",
          "Stronger gravity → shorter period, as expected.",
          "So \\(T' = T/2\\).",
        ],
        answer: "\\(T' = T/2\\).",
      },
      selfCheckExample: {
        prompt:
          "On Earth a pendulum's period is \\(T\\). On the Moon, where \\(g\\) is about one-sixth of Earth's, what is its period (same length)?",
        steps: [
          "\\(T \\propto 1/\\sqrt{g}\\): \\(\\dfrac{T_{\\text{Moon}}}{T} = \\sqrt{\\dfrac{g}{g/6}} = \\sqrt{6}\\).",
          "Weaker gravity → longer period, as expected.",
        ],
        answer: "\\(T_{\\text{Moon}} = \\sqrt{6}\\,T \\approx 2.45\\,T\\).",
      },
      practiceSet: [
        { prompt: "g → g/2 (length fixed). New period?", answer: "√2 · T", method: "T ∝ 1/√g" },
        { prompt: "g doubled (length fixed). New period?", answer: "T/√2" },
        { prompt: "Does a pendulum clock run fast or slow on a high mountain?", answer: "Slow — weaker g lengthens the period" },
        { prompt: "Where is the period longer: Earth or the Moon?", answer: "The Moon (smaller g)" },
      ],
      pyqExampleId: "47cd6d81-3718-4404-9215-275a2e277dd6", // 2019 — g/2 → √2 T
      traps: [
        {
          title: "Smaller g gives a LONGER period (and a slow clock)",
          body:
            "Because \\(T \\propto 1/\\sqrt{g}\\), weaker gravity LENGTHENS the period — the clock loses time. Don't let the mass in the problem mislead you: the bob's mass never enters, only the change in g (and length) does.",
        },
        {
          title: "Use the √(g₁/g₂) ratio, not g₁/g₂",
          body:
            "Halving g multiplies the period by √2, not by 2. Gravity sits under a square root, so always take the square root of the gravity ratio when comparing periods.",
        },
      ],
    },

    // 3 — large-amplitude correction
    {
      kind: "formula" as const,
      slug: "osc-large-amplitude-correction",
      name: "Amplitude-independence holds only for small swings",
      intuition:
        "The neat formula T = 2π√(L/g) is built on one approximation: for a small angle, sinθ ≈ θ, so the restoring force mg sinθ is very nearly proportional to the displacement — exactly the SHM condition. Push the swing out to a large angle and that approximation breaks: sinθ falls below θ, the restoring force is a little weaker than SHM predicts, and the real period comes out slightly LONGER than T₀.",
      definition:
        "The restoring force on the bob is \\(mg\\sin\\theta\\).\n" +
        "- For **small angles**, \\(\\sin\\theta \\approx \\theta\\), so the force is proportional to displacement → true SHM → period \\(T_0 = 2\\pi\\sqrt{L/g}\\), **independent of amplitude**.\n" +
        "- For **large angles**, \\(\\sin\\theta < \\theta\\), so the restoring force is **smaller** than the SHM value → the motion is slower → the actual period \\(T > T_0\\).\n" +
        "So amplitude-independence is a small-angle property, not a universal one.",
      formula: {
        label: "Restoring force and the small-angle condition",
        latex: "F = -mg\\sin\\theta \\;\\approx\\; -mg\\,\\theta \\quad (\\theta \\text{ small})",
        symbols: [
          { symbol: "F", meaning: "restoring force along the arc" },
          { symbol: "\\theta", meaning: "angular displacement from the vertical" },
          { symbol: "m", meaning: "mass of the bob" },
        ],
      },
      authoredExample: {
        prompt:
          "A pendulum is set swinging first through a tiny angle and then through a large angle of 50°. Compared with the small-angle period \\(T_0 = 2\\pi\\sqrt{L/g}\\), is the large-angle period longer, shorter, or the same? Why?",
        steps: [
          "The exact restoring force is \\(mg\\sin\\theta\\); the SHM formula assumes \\(mg\\theta\\).",
          "At 50°, \\(\\sin 50° \\approx 0.766\\) is less than \\(\\theta = 0.873\\) rad, so the real restoring force is weaker than the SHM value.",
          "A weaker restoring force means slower motion, so the actual period exceeds \\(T_0\\).",
        ],
        answer: "Longer than \\(T_0\\) — at large angles \\(\\sin\\theta < \\theta\\) weakens the restoring force.",
      },
      selfCheckExample: {
        prompt:
          "A simple pendulum is said to have an amplitude-independent period. Under what condition is this statement true, and why?",
        steps: [
          "It is true only for SMALL amplitudes.",
          "Only then is \\(\\sin\\theta \\approx \\theta\\), making the restoring force proportional to displacement (the SHM condition), which gives an amplitude-independent period.",
          "At large amplitudes the proportionality fails, so the period grows with amplitude.",
        ],
        answer: "Only for small amplitudes — because then the net force on the bob is proportional to its displacement.",
      },
      practiceSet: [
        { prompt: "Is the pendulum period amplitude-independent at large angles?", answer: "No — only for small angles" },
        { prompt: "At a large angle, is the real period larger or smaller than T₀?", answer: "Larger (T > T₀)" },
        { prompt: "Which approximation gives SHM for a pendulum?", answer: "sinθ ≈ θ (small angle)" },
        { prompt: "What is the exact restoring force on the bob?", answer: "mg sinθ" },
      ],
      pyqExampleId: "6c3fd484-8c70-4a36-b646-0f464a86e99f", // 2024 — amplitude-independent only for small amplitudes
      traps: [
        {
          title: "Amplitude-independence is a SMALL-angle property",
          body:
            "The period is independent of amplitude only while the swing is small, because only then is sinθ ≈ θ and the restoring force proportional to displacement. At a large amplitude the period is no longer constant — it grows. Picking 'for any amplitude' is the trap.",
        },
        {
          title: "Large amplitude → period gets LONGER, not shorter",
          body:
            "Because sinθ < θ for large angles, the restoring force is weaker than the SHM value, so the bob moves more slowly and the period exceeds T₀. An option saying the large-angle period is slightly SMALLER than T₀ has the inequality backwards.",
        },
      ],
    },
  ],
};
