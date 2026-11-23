import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_PERIOD_NOTE: SubtopicNote = {
  subtopicName: "Amplitude, Period and Frequency of S.H.M.",
  title: "Amplitude, Period and Frequency of S.H.M.",
  oneLineDefinition:
    "What amplitude, period, frequency and angular frequency mean, how they are linked, and the period of a body oscillating on a spring.",
  whyItMatters:
    "4 questions, one of them from a board paper: the angular frequency and frequency of a 1 kg body on a spring of force constant 15 N/m (2019). The textbook adds the frequency and period from a differential equation, comparing two masses on one spring, and springs joined in series and in parallel.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-amplitude-period",
      name: "Amplitude, period and frequency",
      intuition:
        "Amplitude is how far the particle goes from the mean position. Period is how long one full oscillation takes, and frequency is how many oscillations happen in one second. Angular frequency ω is the same idea measured in radian per second: one oscillation is 2π radian.",
      definition:
        "- **Amplitude (A):** the maximum displacement of the particle from its mean position, on either side. Unit: m.\n" +
        "- **Period (T):** the time taken for one complete oscillation. Unit: s.\n" +
        "- **Frequency (n):** the number of oscillations in one second, \\(n = \\dfrac{1}{T}\\). Unit: Hz.\n" +
        "- **Angular frequency:** \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi n\\), in rad/s.\n" +
        "- Since \\(|a| = \\omega^{2}|x|\\), the period is \\(T = 2\\pi\\sqrt{\\dfrac{|x|}{|a|}}\\): two pi times the square root of displacement over acceleration.",
      formula: {
        label: "Period and frequency",
        latex: "T = \\frac{2\\pi}{\\omega} = \\frac{1}{n}, \\qquad \\omega = 2\\pi n",
      },
      authoredExample: {
        prompt:
          "A particle in linear S.H.M. has an acceleration of 0.64 m/s² when it is 4 cm from the mean position. Find its period and frequency. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(x = 4\\) cm \\(= 0.04\\) m, \\(|a| = 0.64\\) m/s².",
          "\\(\\omega^{2} = \\dfrac{|a|}{x} = \\dfrac{0.64}{0.04} = 16\\ \\text{s}^{-2}\\), so \\(\\omega = 4\\) rad/s.",
          "\\(T = \\dfrac{2\\pi}{\\omega} = \\dfrac{2 \\times 3.142}{4} = 1.571\\) s.",
          "\\(n = \\dfrac{1}{T} = \\dfrac{4}{2 \\times 3.142} = 0.6365\\) Hz.",
        ],
        answer: "Period 1.571 s; frequency 0.6365 Hz",
      },
      selfCheckExample: {
        prompt: "An S.H.M. has a frequency of 2.5 Hz. Find its period and its angular frequency.",
        steps: ["\\(T = \\dfrac{1}{n} = \\dfrac{1}{2.5} = 0.4\\) s.", "\\(\\omega = 2\\pi n = 2 \\times 3.142 \\times 2.5 = 15.71\\) rad/s."],
        answer: "0.4 s; 15.71 rad/s",
      },
      practiceSet: [
        { prompt: "What is the SI unit of frequency?", answer: "Hertz (Hz)" },
        { prompt: "A pendulum completes 30 oscillations in 60 s. Find its period and frequency.", answer: "2 s; 0.5 Hz" },
        { prompt: "Through how many radian does the phase of an S.H.M. advance in one period?", answer: "\\(2\\pi\\) rad" },
      ],
      pyqExampleId: "6edab665-3796-4404-943e-fa7dfb34162d",
      traps: [
        {
          title: "Confusing ω with n",
          body: "\\(\\omega\\) is in rad/s and equals \\(2\\pi n\\). A frequency of 3 Hz is \\(\\omega = 6\\pi = 18.85\\) rad/s, not 3 rad/s.",
        },
        {
          title: "An answer with no unit",
          body: "Write the period in seconds and the frequency in hertz. A bare number loses the unit mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-spring",
      name: "Period of a body on a spring",
      intuition:
        "A heavier body is harder to speed up and slow down, so it swings more slowly. A stiffer spring pulls back harder, so the body swings faster. The period grows with the square root of the mass and falls with the square root of the force constant.",
      definition:
        "- For a mass m on a spring of force constant k: \\(\\omega = \\sqrt{\\dfrac{k}{m}}\\), \\(T = 2\\pi\\sqrt{\\dfrac{m}{k}}\\), \\(n = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}\\).\n" +
        "- On the same spring, \\(T \\propto \\sqrt{m}\\). To double the period, make the mass four times as large.\n" +
        "- Two springs \\(k_1\\) and \\(k_2\\) in **parallel**: \\(k_p = k_1 + k_2\\). In **series**: \\(\\dfrac{1}{k_s} = \\dfrac{1}{k_1} + \\dfrac{1}{k_2}\\). Use the combined value of k in the formula for T.",
      formula: {
        label: "Mass on a spring",
        latex: "T = 2\\pi\\sqrt{\\frac{m}{k}}, \\qquad n = \\frac{1}{2\\pi}\\sqrt{\\frac{k}{m}}",
      },
      authoredExample: {
        prompt:
          "A spring stretches by 4 cm when a 0.2 kg mass is hung from it. The mass is pulled down a little and released. Find the period of its oscillations. (\\(g = 9.8\\) m/s², \\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(m = 0.2\\) kg, extension \\(= 4\\) cm \\(= 0.04\\) m.",
          "Force constant: \\(k = \\dfrac{mg}{\\text{extension}} = \\dfrac{0.2 \\times 9.8}{0.04} = 49\\) N/m.",
          "\\(T = 2\\pi\\sqrt{\\dfrac{m}{k}} = 2 \\times 3.142 \\times \\sqrt{\\dfrac{0.2}{49}} = 6.284 \\times 0.0639\\).",
          "\\(T = 0.401\\) s.",
        ],
        answer: "0.401 s",
      },
      selfCheckExample: {
        prompt: "The mass hung on a spring is made four times as large. What happens to the period of its oscillations?",
        steps: ["\\(T \\propto \\sqrt{m}\\) for the same spring.", "\\(\\sqrt{4} = 2\\), so the period doubles."],
        answer: "The period doubles",
      },
      practiceSet: [
        { prompt: "Two identical springs of force constant k are joined in parallel. What is the combined force constant?", answer: "\\(2k\\)" },
        { prompt: "Two identical springs of force constant k are joined in series. What is the combined force constant?", answer: "\\(k/2\\)" },
        { prompt: "Does the period of a mass oscillating on a spring depend on g?", answer: "No. \\(T = 2\\pi\\sqrt{m/k}\\) has no g in it" },
      ],
      pyqExampleId: "11a1292e-92c2-4db1-851e-ca6be269d470",
      traps: [
        {
          title: "Turning the ratio upside down",
          body: "\\(T = 2\\pi\\sqrt{m/k}\\), with the mass on top. \\(\\sqrt{k/m}\\) is \\(\\omega\\), not T.",
        },
        {
          title: "Adding spring constants in series",
          body: "Springs in series are softer: \\(1/k_s = 1/k_1 + 1/k_2\\). Adding the k values is right only for springs in parallel.",
        },
      ],
    },
  ],
};
