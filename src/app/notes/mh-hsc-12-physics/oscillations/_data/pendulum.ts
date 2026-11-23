import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_PENDULUM_NOTE: SubtopicNote = {
  subtopicName: "Simple Pendulum",
  title: "The Simple Pendulum",
  oneLineDefinition:
    "Why a simple pendulum performs S.H.M. for small swings, its period T = 2π√(L/g), the second's pendulum, and the laws of the simple pendulum.",
  whyItMatters:
    "13 questions, five of them from board papers from 2019 to 2026. The board asks you to define the second's pendulum (2022, 2026) and derive its length (2022), find the speed of its bob at a point (2024), the number of oscillations a pendulum four times as long makes in a minute (2019), and the potential energy of a pendulum bob at an extreme position (2020). The textbook adds the derivation of the period, the laws of the simple pendulum, and pendulum clocks that gain or lose time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-pendulum-period",
      name: "Period of a simple pendulum",
      intuition:
        "When the bob is pulled aside, only the part of its weight along the arc pulls it back. For a small angle this part is almost exactly proportional to the displacement, so the bob performs S.H.M. The mass cancels out, which is why a heavy bob and a light bob on the same string keep the same time.",
      definition:
        "- **Simple pendulum:** a heavy point mass (the bob) hung from a rigid support by a weightless, inextensible, twistless string. Its length L is measured from the support to the centre of gravity of the bob.\n" +
        "- Displace the bob through a small angle \\(\\theta\\). Its weight splits into \\(mg\\cos\\theta\\) along the string, balanced by the tension, and \\(mg\\sin\\theta\\) along the arc, which is the restoring force: \\(F = -mg\\sin\\theta\\).\n" +
        "- For small \\(\\theta\\) in radian, \\(\\sin\\theta \\approx \\theta = \\dfrac{x}{L}\\). So \\(F = -\\dfrac{mg}{L}x\\): linear S.H.M. with force constant \\(k = \\dfrac{mg}{L}\\).\n" +
        "- \\(a = -\\dfrac{g}{L}x\\), so \\(\\omega^{2} = \\dfrac{g}{L}\\) and \\(T = \\dfrac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\dfrac{L}{g}}\\).\n" +
        "- Draw the pendulum with the angle, the tension, mg and its two components marked.",
      formula: {
        label: "Period of a simple pendulum",
        latex: "T = 2\\pi\\sqrt{\\frac{L}{g}}, \\qquad F = -\\frac{mg}{L}x",
      },
      authoredExample: {
        prompt:
          "A simple pendulum of length 0.4 m has a bob of mass 100 g. Find its period and the restoring force on the bob when it is 2 cm from the mean position. (\\(g = 9.8\\) m/s², \\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(L = 0.4\\) m, \\(m = 0.1\\) kg, \\(x = 0.02\\) m.",
          "\\(T = 2\\pi\\sqrt{\\dfrac{L}{g}} = 6.284 \\times \\sqrt{\\dfrac{0.4}{9.8}} = 6.284 \\times 0.2020 = 1.270\\) s.",
          "\\(F = \\dfrac{mg}{L}x = \\dfrac{0.1 \\times 9.8}{0.4} \\times 0.02 = 0.049\\) N, towards the mean position.",
        ],
        answer: "Period 1.270 s; restoring force 0.049 N towards the mean position",
      },
      selfCheckExample: {
        prompt: "A simple pendulum has a period of 2 s on the earth. What is its period on the moon, where g is one sixth of its value on the earth?",
        steps: ["\\(T \\propto \\dfrac{1}{\\sqrt{g}}\\), so \\(T_{moon} = T_{earth}\\sqrt{6}\\).", "\\(T_{moon} = 2 \\times 2.449 = 4.899\\) s."],
        answer: "4.9 s",
      },
      practiceSet: [
        { prompt: "Which component of the bob's weight acts as the restoring force?", answer: "\\(mg\\sin\\theta\\), along the arc" },
        { prompt: "What is the force constant of a simple pendulum of length L with a bob of mass m?", answer: "\\(mg/L\\)" },
        { prompt: "Why must the angle of swing be small for a simple pendulum to perform S.H.M.?", answer: "Only then is \\(\\sin\\theta \\approx \\theta\\), which makes the restoring force proportional to the displacement" },
      ],
      pyqExampleId: "ae606490-1233-4332-8d98-df1dd3903adb",
      traps: [
        {
          title: "Measuring L to the top of the bob",
          body: "The length of a simple pendulum is measured from the point of suspension to the centre of gravity of the bob.",
        },
        {
          title: "Dropping the small-angle condition",
          body: "State that \\(\\theta\\) is small and measured in radian before writing \\(\\sin\\theta \\approx \\theta\\). Without it the derivation is incomplete.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-seconds-pendulum",
      name: "The second's pendulum",
      intuition:
        "A second's pendulum ticks once a second: each swing from one extreme to the other takes one second, so a full oscillation takes two. Put T = 2 s in the period formula and its length comes out as g/π², very close to one metre on the earth.",
      definition:
        "- **Second's pendulum:** a simple pendulum whose period is exactly 2 s.\n" +
        "- From \\(T = 2\\pi\\sqrt{L/g}\\): \\(L = \\dfrac{gT^{2}}{4\\pi^{2}}\\). With \\(T = 2\\) s, \\(L = \\dfrac{g}{\\pi^{2}}\\).\n" +
        "- With \\(g = 9.8\\) m/s², \\(L \\approx 0.993\\) m, about 1 m.\n" +
        "- Its period is fixed, so its length depends on g: \\(L \\propto g\\). Where g is smaller, a second's pendulum must be shorter.\n" +
        "- Its angular frequency is \\(\\omega = 2\\pi/2 = \\pi\\) rad/s.",
      formula: {
        label: "Length of a second's pendulum",
        latex: "L = \\frac{gT^{2}}{4\\pi^{2}} = \\frac{g}{\\pi^{2}} \\quad (T = 2\\ \\text{s})",
      },
      authoredExample: {
        prompt: "Find the length of a second's pendulum at a place where \\(g = 9.78\\) m/s². (\\(\\pi^{2} = 9.87\\))",
        steps: [
          "Given: \\(T = 2\\) s, \\(g = 9.78\\) m/s².",
          "Formula: \\(L = \\dfrac{gT^{2}}{4\\pi^{2}} = \\dfrac{g}{\\pi^{2}}\\).",
          "\\(L = \\dfrac{9.78}{9.87} = 0.991\\) m.",
        ],
        answer: "0.991 m (99.1 cm)",
      },
      selfCheckExample: {
        prompt:
          "A second's pendulum is 1 m long on the earth. How long must it be on a planet where g is four times as large, to remain a second's pendulum?",
        steps: ["The period stays 2 s, so \\(L \\propto g\\).", "\\(L = 4 \\times 1 = 4\\) m."],
        answer: "4 m",
      },
      practiceSet: [
        { prompt: "What is the angular frequency of a second's pendulum?", answer: "\\(\\pi\\) rad/s" },
        { prompt: "A second's pendulum swings with an amplitude of 5 cm. Find the maximum speed of its bob.", answer: "\\(5\\pi = 15.7\\) cm/s" },
        { prompt: "If g at a place increases, should a second's pendulum be made longer or shorter?", answer: "Longer, since \\(L \\propto g\\)" },
      ],
      pyqExampleId: "eb941b63-e9b4-42c1-80a3-d0669e152ef3",
      traps: [
        {
          title: "Taking the period of a second's pendulum as 1 s",
          body: "Each swing takes 1 s, but a full oscillation, there and back, takes 2 s. Use \\(T = 2\\) s.",
        },
        {
          title: "Shortening it when g rises",
          body: "With T fixed, \\(L = g/\\pi^{2}\\): a larger g needs a longer pendulum, not a shorter one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-pendulum-laws",
      name: "Laws of the simple pendulum",
      intuition:
        "Read the formula T = 2π√(L/g) and the laws fall out. Only L and g appear in it, so only they change the period. The mass of the bob and the size of a small swing are missing from the formula, so they do not matter.",
      definition:
        "- **Law of length:** \\(T \\propto \\sqrt{L}\\), when g is constant.\n" +
        "- **Law of acceleration due to gravity:** \\(T \\propto \\dfrac{1}{\\sqrt{g}}\\), when L is constant.\n" +
        "- **Law of mass:** the period does not depend on the mass, material, size or density of the bob.\n" +
        "- **Law of isochronism:** for small amplitudes, the period does not depend on the amplitude.\n" +
        "- For one pendulum at one place, \\(\\dfrac{T_2}{T_1} = \\sqrt{\\dfrac{L_2}{L_1}}\\). The number of oscillations in a time t is \\(t/T\\).",
      formula: {
        label: "Ratio of periods",
        latex: "\\frac{T_2}{T_1} = \\sqrt{\\frac{L_2}{L_1}}, \\qquad \\frac{T_2}{T_1} = \\sqrt{\\frac{g_1}{g_2}}",
      },
      authoredExample: {
        prompt: "The length of a simple pendulum is increased by 44%. By what percentage does its period increase?",
        steps: [
          "Given: \\(L_2 = 1.44L_1\\).",
          "Formula: \\(\\dfrac{T_2}{T_1} = \\sqrt{\\dfrac{L_2}{L_1}} = \\sqrt{1.44} = 1.2\\).",
          "\\(T_2 = 1.2T_1\\), so the period increases by 20%.",
        ],
        answer: "20%",
      },
      selfCheckExample: {
        prompt: "The rod of a pendulum clock gets longer in summer. Does the clock gain or lose time? Give the reason.",
        steps: [
          "By the law of length, \\(T \\propto \\sqrt{L}\\), so a longer rod means a longer period.",
          "Each oscillation takes more time, so the clock counts fewer oscillations in a day and runs slow.",
        ],
        answer: "It loses time",
      },
      practiceSet: [
        { prompt: "Does the period of a simple pendulum change if a brass bob is replaced by a wooden bob of the same size?", answer: "No, by the law of mass" },
        { prompt: "Two simple pendulums at the same place have lengths in the ratio 1 : 9. Find the ratio of their periods.", answer: "1 : 3" },
        { prompt: "State the law of isochronism.", answer: "For small amplitudes, the period of a simple pendulum does not depend on its amplitude" },
      ],
      pyqExampleId: "1c4e2167-5cef-4b18-afd9-48b285e4f00f",
      traps: [
        {
          title: "Stating a law without its condition",
          body: "'T is proportional to the square root of L' needs 'when g is constant'. Each law of the pendulum carries its condition.",
        },
        {
          title: "Forgetting the square root",
          body: "Making a pendulum nine times as long makes its period three times as long, not nine times.",
        },
      ],
    },
  ],
};
