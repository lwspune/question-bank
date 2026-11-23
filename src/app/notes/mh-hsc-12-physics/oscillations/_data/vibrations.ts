import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_VIBRATIONS_NOTE: SubtopicNote = {
  subtopicName: "Free, Forced and Damped Vibrations",
  title: "Free, Forced and Damped Vibrations",
  oneLineDefinition:
    "How real oscillations lose energy and die away, how a periodic force keeps a body vibrating at the force's frequency, and resonance.",
  whyItMatters:
    "3 questions, all from board papers: what happens to the amplitude of a damped oscillator (2017), and distinguish between free and forced vibrations (2023 and 2026).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-damped",
      name: "Damped oscillations",
      intuition:
        "A real pendulum or spring does not swing for ever. Air or a liquid pushes against the motion and takes a little energy away at every swing, so the amplitude dies away gradually. The stronger the damping, the faster it dies.",
      definition:
        "- A damping force opposes the motion and, for small speeds, is proportional to the velocity: \\(F_d = -bv\\), where b is the damping constant.\n" +
        "- Equation of motion: \\(m\\dfrac{d^{2}x}{dt^{2}} + b\\dfrac{dx}{dt} + kx = 0\\).\n" +
        "- For weak damping: \\(x = A_0e^{-bt/2m}\\cos(\\omega' t + \\phi)\\). The amplitude \\(A_0e^{-bt/2m}\\) **decreases gradually** (exponentially) with time.\n" +
        "- The angular frequency is \\(\\omega' = \\sqrt{\\dfrac{k}{m} - \\dfrac{b^{2}}{4m^{2}}}\\), a little less than the undamped value \\(\\sqrt{k/m}\\).\n" +
        "- The lost mechanical energy becomes heat, and the oscillator finally comes to rest at its mean position.",
      formula: {
        label: "Damped amplitude",
        latex: "A = A_0\\,e^{-bt/2m}, \\qquad \\omega' = \\sqrt{\\frac{k}{m} - \\frac{b^{2}}{4m^{2}}}",
      },
      authoredExample: {
        prompt:
          "A damped oscillator has mass 0.5 kg and damping constant 0.1 kg/s. In what time does its amplitude fall to half its first value? (\\(\\ln 2 = 0.693\\))",
        steps: [
          "Given: \\(m = 0.5\\) kg, \\(b = 0.1\\) kg/s, \\(A = A_0/2\\).",
          "\\(\\dfrac{A}{A_0} = e^{-bt/2m} = \\dfrac{1}{2}\\), so \\(\\dfrac{bt}{2m} = \\ln 2\\).",
          "\\(t = \\dfrac{2m\\ln 2}{b} = \\dfrac{2 \\times 0.5 \\times 0.693}{0.1} = 6.93\\) s.",
        ],
        answer: "6.93 s",
      },
      pyqExampleId: "922520f9-22ba-458c-877d-f25aae276c2a",
      selfCheckExample: {
        prompt: "Why is the period of a damped oscillator slightly longer than that of the same oscillator without damping?",
        steps: [
          "Damping gives \\(\\omega' = \\sqrt{k/m - b^{2}/4m^{2}}\\), which is smaller than \\(\\sqrt{k/m}\\).",
          "\\(T = 2\\pi/\\omega'\\), so a smaller \\(\\omega'\\) means a longer period.",
        ],
        answer: "Damping lowers the angular frequency, so the period is longer",
      },
      practiceSet: [
        { prompt: "What force makes the swings of a simple pendulum in air die away?", answer: "The viscous force that the air exerts on the bob" },
        { prompt: "Into what form is the energy lost by a damped oscillator converted?", answer: "Heat" },
        { prompt: "Write the damping force on a body moving with velocity v, in terms of the damping constant b.", answer: "\\(F_d = -bv\\)" },
      ],
      traps: [
        {
          title: "Saying the amplitude drops suddenly",
          body: "Damping takes energy away steadily, so the amplitude falls gradually, never in a jump.",
        },
        {
          title: "Opposing the displacement instead of the velocity",
          body: "\\(F_d = -bv\\) always opposes the velocity. The restoring force \\(-kx\\) is the one that opposes the displacement.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpos-free-forced",
      name: "Free, forced and resonant vibrations",
      intuition:
        "Pluck a guitar string and leave it: it vibrates freely at its own natural frequency. Press the stem of a vibrating tuning fork on a table: the table top is forced to vibrate at the fork's frequency. When the pushes come at exactly the body's own natural frequency, the amplitude builds up hugely. That is resonance.",
      definition:
        "- **Free vibrations:** a body disturbed once and then left to itself vibrates with its **natural frequency**, \\(n_0 = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{k}{m}}\\).\n" +
        "- **Forced vibrations:** a body acted on by an external periodic force vibrates with the **frequency of that force**.\n" +
        "- **Resonance:** when the frequency of the periodic force equals the natural frequency of the body, the amplitude of the forced vibrations is greatest.\n" +
        "- 'Distinguish between free and forced vibrations': give matching points from both sides, with an example of each.",
      table: {
        columns: ["Point", "Free vibrations", "Forced vibrations"],
        rows: [
          {
            cells: ["Cause", "A single initial disturbance, with no external periodic force afterwards", "An external periodic force acting all the time"],
            pyqExampleId: "72034c0c-3697-440c-b421-d590e00cce75",
            noteAmber: "Board 2026 asked you to distinguish free and forced vibrations; board 2023 asked the same for two points.",
          },
          { cells: ["Frequency", "The natural frequency of the body", "The frequency of the applied force"] },
          { cells: ["Amplitude", "Dies away because of damping", "Stays constant while the force acts; greatest at resonance"] },
          { cells: ["Example", "A tuning fork sounding after it is struck once", "A table top made to vibrate by a tuning fork pressed on it"] },
        ],
      },
      pyqExampleId: "72034c0c-3697-440c-b421-d590e00cce75",
      selfCheckExample: {
        prompt:
          "A child on a swing is pushed once and left. Later the swing is given a push every time it comes back. Name the kind of vibration in each case.",
        steps: [
          "Pushed once and left: the swing moves under its own restoring force at its natural frequency. These are free vibrations.",
          "Pushed every time it comes back: an external periodic force acts, in step with the swing's own frequency. These are forced vibrations at resonance.",
        ],
        answer: "Free vibrations, then forced vibrations at resonance",
      },
      practiceSet: [
        { prompt: "With what frequency does a body perform forced vibrations?", answer: "The frequency of the applied periodic force" },
        { prompt: "What is resonance?", answer: "The case in which the frequency of the applied force equals the natural frequency of the body, so the amplitude is greatest" },
      ],
      traps: [
        {
          title: "One-sided distinguish points",
          body: "Each point must cover both sides. 'Forced vibrations need an external force' alone earns nothing; pair it with 'free vibrations need only one initial disturbance'.",
        },
      ],
    },
  ],
};
