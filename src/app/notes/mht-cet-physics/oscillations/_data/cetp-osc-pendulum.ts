import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/oscillations";

export const PENDULUM_NOTE: SubtopicNote = {
  subtopicName: "Simple Pendulum — Period, Lift, Weightlessness",
  title: "The Simple Pendulum: Period, Effective g, Speed and Tension",
  oneLineDefinition:
    "A simple pendulum of length L swings with T = 2π√(L/g), independent of its mass and (for small swings) its amplitude; in a lift, on an accelerating support or in orbit, g is replaced by the effective gravity, and energy conservation gives the bob's speed and the string's tension along the swing.",
  whyItMatters:
    "24 PYQs, 5 HARD. Ten are the period and length — ratios of lengths and frequencies, a length change of 20%, a pendulum of length L₁ − L₂, a bob that leaks water, a mass hung from two strings; eight are effective g — lifts accelerating up or down, a support moving as y = kt², a pendulum in orbit, and a sonometer wire at the poles and the equator; six are speed and tension — the speed at 60°, the maximum tension, the angle where the maximum tension is four times the minimum. " +
    "Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-osc-pendulum-period",
      name: "Period and Length",
      intuition:
        "T = 2π√(L/g): the period goes as the square root of the length and has nothing to do with the bob's mass or material. Four times the length doubles the period; frequencies 4 : 3 mean lengths 9 : 16; a 20% longer period needs 1.44 times the length. Lengths subtract as T²: a pendulum of length L₁ − L₂ has period √(T₁² − T₂²). The length is measured to the bob's centre of mass, so a leaking bob first lengthens its pendulum and then, once nearly empty, shortens it back.",
      definition:
        "- \\(T = 2\\pi\\sqrt{\\dfrac{L}{g}}\\), \\(T \\propto \\sqrt{L}\\); independent of the bob's mass and density.\n" +
        "- \\(\\dfrac{L_1}{L_2} = \\left(\\dfrac{f_2}{f_1}\\right)^2\\); T + 20% ⇒ L × 1.44; T × 2 ⇒ L × 4.\n" +
        "- \\(T_{L_1 - L_2} = \\sqrt{T_1^2 - T_2^2}\\).\n" +
        "- **Leaking bob**: T first increases, then decreases back to its first value.\n" +
        "- **Hung from two strings** of length L from points 2d apart, swinging out of their plane: effective length \\(\\sqrt{L^2 - d^2}\\).",
      formula: {
        label: "Simple pendulum",
        latex: "T = 2\\pi\\sqrt{\\frac{L}{g}}",
      },
      authoredExample: {
        prompt: "Pendulums of periods 5 s and 3 s. Period of a pendulum whose length is the difference of theirs?",
        steps: ["T = √(25 − 9) = 4 s."],
        answer: "4 s",
      },
      selfCheckExample: {
        prompt: "A pendulum's length is made 3 times. New period, original T?",
        steps: ["T ∝ √L."],
        answer: "√3 T",
      },
      practiceSet: [
        { prompt: "Frequencies of two pendulums 4 : 3. Ratio of lengths?", answer: "9 : 16" },
        { prompt: "Length changed so the period rises 20%. L₂/L₁?", answer: "1.44" },
        { prompt: "Brass bob replaced by steel (x times denser), length changed so the period is 2T. New length?", answer: "4l" },
      ],
      pyqExampleId: "c26bd624-b383-4607-afa6-b976bf525bf2",
      traps: [
        {
          title: "Changing the bob to change the period",
          body:
            "A heavier or denser bob of the same size leaves T unchanged. Only the length (to the centre of mass) and g matter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-effective-g",
      name: "Effective g: Lifts, Moving Supports and Orbit",
      intuition:
        "In an accelerating frame the pendulum feels g_eff = g + a when its support accelerates upward and g − a when downward, so T′ = T√(g/g_eff). A support moving as y = kt² has acceleration 2k. In free fall or in orbit g_eff = 0 and the pendulum does not swing at all — its period is infinite. The same g changes a sonometer: a wire stretched by a hanging mass has less tension where g is smaller, at the equator, so it must be shortened to keep its frequency.",
      definition:
        "- **Up** at a: \\(T' = T\\sqrt{\\dfrac{g}{g + a}}\\); **down**: \\(T' = T\\sqrt{\\dfrac{g}{g - a}}\\). Up at g/3 ⇒ \\(\\tfrac{\\sqrt{3}}{2}T\\); down at g/4 ⇒ \\(\\tfrac{2}{\\sqrt{3}}T\\); to halve T accelerate up at 3g.\n" +
        "- **Support** \\(y = kt^2\\): a = 2k; with k = 1, g = 10: \\(\\dfrac{T_1^2}{T_2^2} = \\dfrac{12}{10} = \\dfrac{6}{5}\\).\n" +
        "- **In orbit** or free fall: \\(g_{\\text{eff}} = 0\\), period **infinite**.\n" +
        "- **Sonometer** (tension Mg): at the equator g is smaller, so the resonating length must be **decreased**.",
      formula: {
        label: "Accelerating support",
        latex: "T' = 2\\pi\\sqrt{\\frac{L}{g \\pm a}}",
      },
      authoredExample: {
        prompt: "A pendulum has period 2 s at rest. The lift accelerates down at g/2. New period?",
        steps: ["g_eff = g/2 ⇒ T′ = 2√2 s."],
        answer: "2√2 s",
      },
      selfCheckExample: {
        prompt: "Period √3 s in a stationary lift. The lift accelerates up at g/3. New period?",
        steps: ["T′ = √3 × √(3/4)."],
        answer: "1.5 s",
      },
      practiceSet: [
        { prompt: "A seconds pendulum in a space station orbiting at 3R. Its period?", answer: "Infinite" },
        { prompt: "Acceleration of a lift that halves a pendulum's period?", answer: "3g upward" },
      ],
      pyqExampleId: "ecff9517-bbeb-4a06-9cf9-e444ed49bef8",
      traps: [
        {
          title: "Adding the acceleration in the wrong direction",
          body:
            "Accelerating UP presses the bob down harder — larger g_eff, shorter period. Accelerating down (or falling) lightens it — longer period, infinite in free fall.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-osc-pendulum-speed-tension",
      name: "Speed and Tension Along the Swing",
      intuition:
        "Energy conservation gives the speed: dropping from angle θ, the bob falls L(1 − cos θ), so it passes the bottom at √(2gL(1 − cos θ)). The string's tension is least at the extremes, mg cos θ, where the bob is momentarily still, and greatest at the bottom, mg + mv²/L = mg(3 − 2 cos θ). Setting the maximum to four times the minimum gives cos θ = ½. For a small amplitude A the bottom speed is A√(g/L), so the maximum tension is mg(1 + A²/L²).",
      definition:
        "- **Speed at the bottom** from θ: \\(v = \\sqrt{2gL(1 - \\cos\\theta)}\\); from the bottom at speed u up to angle φ: \\(v^2 = u^2 - 2gL(1 - \\cos\\varphi)\\) (4 m/s, 1 m, 60° ⇒ √6 m/s).\n" +
        "- \\(T_{\\min} = mg\\cos\\theta\\), \\(T_{\\max} = mg(3 - 2\\cos\\theta)\\); \\(T_{\\max} = 4T_{\\min}\\) ⇒ \\(\\theta = \\cos^{-1}(0.5)\\).\n" +
        "- Small amplitude A: \\(T_{\\max} = mg\\left(1 + \\dfrac{A^2}{L^2}\\right)\\).\n" +
        "- Equal total energies, equal masses, \\(L_1 = 2L_2\\): \\(\\dfrac{A^2}{L}\\) equal, so the SHORTER pendulum has the smaller amplitude.",
      formula: {
        label: "Tension along the swing",
        latex: "T_{\\max} = mg(3 - 2\\cos\\theta), \\qquad T_{\\min} = mg\\cos\\theta",
      },
      authoredExample: {
        prompt: "A 2 m pendulum is released from 60°. Speed at the bottom and the maximum tension for a 0.5 kg bob (g = 10)?",
        steps: ["v² = 2 × 10 × 2 × 0.5 = 20.", "T_max = mg(3 − 1) = 2mg = 10 N."],
        answer: "√20 m/s; 10 N",
      },
      selfCheckExample: {
        prompt: "The bob has 4 m/s at the bottom; the string is 1 m. Speed where the string makes 60° with the vertical (g = 10)?",
        steps: ["v² = 16 − 2 × 10 × 1 × 0.5."],
        answer: "√6 m/s",
      },
      practiceSet: [
        { prompt: "Maximum tension four times the minimum. Angular amplitude?", answer: "cos⁻¹(0.5)" },
        { prompt: "Maximum tension for small amplitude A, length l?", answer: "mg(1 + A²/l²)" },
      ],
      pyqExampleId: "d9dc9f4a-18ec-493b-b29d-a116e8c1893b",
      traps: [
        {
          title: "Taking the minimum tension as mg",
          body:
            "At the extreme the bob is still but the string is slanted: only mg cos θ is balanced by the tension. mg is the tension of a pendulum at rest.",
        },
      ],
    },
  ],
  related: [
    { label: "Energy in SHM", href: `${BASE}/cetp-osc-energy` },
    { label: "Springs and other oscillators", href: `${BASE}/cetp-osc-springs` },
  ],
};
