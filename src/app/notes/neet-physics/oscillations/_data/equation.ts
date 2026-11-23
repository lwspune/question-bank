import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_OS_EQUATION_NOTE: SubtopicNote = {
  subtopicName: "SHM and Its Equation",
  title: "SHM and Its Equation",
  oneLineDefinition:
    "Periodic and oscillatory motion, the SHM equation x = A sin(ωt + φ) with its amplitude, period and phase, and the velocity and acceleration that follow from it, with a = −ω²x as the test for SHM.",
  whyItMatters:
    "Three NEET questions from 2023 to 2024. One reads the amplitude and period off an equation (NEET 2024), one asks what kind of motion a two-dimensional equation describes (Re-NEET 2024), and one finds the acceleration from an x-t graph (NEET 2023, the chapter's only HARD question).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphos-equation",
      name: "Displacement, amplitude, period and phase",
      visualizationSlug: "osc-shm-displacement-time",
      intuition:
        "A motion that repeats itself after a fixed time is periodic. If it also goes to and fro about a mean position, it is an oscillation. Simple harmonic motion (SHM) is the simplest oscillation: the displacement is a sine (or cosine) of time. Picture a point going round a circle at a steady speed and look at its shadow on a diameter. The shadow moves to and fro in SHM, with the radius as its amplitude and the point's angular speed as its ω.",
      definition:
        "- **Period** T: the time for one full oscillation. **Frequency** \\(\\nu = \\dfrac{1}{T}\\), in hertz (Hz).\n" +
        "- SHM: \\(x = A\\sin(\\omega t + \\phi)\\), or equally \\(x = A\\cos(\\omega t + \\phi)\\). The two differ only in the phase constant.\n" +
        "- **Amplitude** A is the largest displacement from the mean position. It carries the unit of x.\n" +
        "- **Phase** is the angle \\(\\omega t + \\phi\\); the **phase constant** \\(\\phi\\) is its value at t = 0 and fixes where the particle starts.\n" +
        "- **Angular frequency**: \\(\\omega = \\dfrac{2\\pi}{T} = 2\\pi\\nu\\), in rad/s.\n" +
        "- Every oscillation is periodic, but not every periodic motion is an oscillation: a body going round a circle repeats its motion without going to and fro.",
      formula: {
        label: "The SHM equation",
        latex: "x = A\\sin(\\omega t + \\phi), \\qquad \\omega = \\frac{2\\pi}{T} = 2\\pi\\nu",
        symbols: [
          { symbol: "\\(A\\)", meaning: "amplitude" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency" },
          { symbol: "\\(\\phi\\)", meaning: "phase constant" },
        ],
      },
      authoredExample: {
        prompt:
          "A particle moves as \\(x = 0.2\\sin\\left(4\\pi t + \\dfrac{\\pi}{6}\\right)\\) m. Where is it at t = 0, and when does it first reach x = +0.2 m?",
        steps: [
          "At t = 0: \\(x = 0.2\\sin\\dfrac{\\pi}{6} = 0.2 \\times \\dfrac{1}{2} = 0.1\\) m.",
          "It reaches +0.2 m, the positive extreme, when the phase becomes \\(\\dfrac{\\pi}{2}\\): \\(4\\pi t + \\dfrac{\\pi}{6} = \\dfrac{\\pi}{2}\\).",
          "\\(4\\pi t = \\dfrac{\\pi}{3}\\), so \\(t = \\dfrac{1}{12}\\) s.",
        ],
        answer: "0.1 m at t = 0; it first reaches +0.2 m at \\(t = \\dfrac{1}{12}\\) s",
      },
      selfCheckExample: {
        prompt:
          "A particle in SHM makes 10 oscillations in 4 s. Its amplitude is 3 cm and it starts from the mean position moving towards +x. Write its displacement as a function of time.",
        steps: [
          "\\(T = \\dfrac{4}{10} = 0.4\\) s, so \\(\\omega = \\dfrac{2\\pi}{0.4} = 5\\pi\\) rad/s.",
          "Starting at the mean position moving towards +x means \\(\\phi = 0\\) in the sine form.",
        ],
        answer: "\\(x = 3\\sin(5\\pi t)\\) cm",
      },
      practiceSet: [
        { prompt: "An oscillator makes 50 oscillations per second. What is its angular frequency?", answer: "\\(100\\pi\\) rad/s" },
        { prompt: "In \\(x = A\\sin(\\omega t + \\phi)\\), what is the phase constant if the particle starts at its positive extreme?", answer: "\\(\\phi = \\pi/2\\)" },
        { prompt: "A point moves round a circle of radius 5 cm at a steady angular speed. What motion does its shadow on a diameter make, and with what amplitude?", answer: "SHM with amplitude 5 cm" },
        { prompt: "Is the motion of the Earth round the Sun periodic, oscillatory, or both?", answer: "Periodic but not oscillatory" },
      ],
      pyqExampleId: "7a721a30-a07a-4baa-b791-c338e74b4b47",
      traps: [
        {
          title: "The amplitude takes the unit of the equation",
          body: "In \\(x = 5\\sin(\\pi t + \\pi/3)\\) m the amplitude is 5 m. Reading it as 5 cm because amplitudes are often small loses the mark.",
        },
        {
          title: "ω is not the frequency",
          body: "The number in front of t is the angular frequency, \\(\\omega = 2\\pi\\nu\\). For \\(\\sin(\\pi t)\\), \\(\\omega = \\pi\\) rad/s, so T = 2 s and \\(\\nu = 0.5\\) Hz.",
        },
        {
          title: "Periodic does not mean oscillatory",
          body: "Uniform circular motion repeats itself, so it is periodic, but it does not go to and fro about a mean position, so it is not an oscillation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphos-motion",
      name: "Velocity, acceleration and the test for SHM",
      visualizationSlug: "cet-shm-reference-circle",
      intuition:
        "Differentiate the displacement and the velocity comes out as a cosine, a quarter cycle ahead. Differentiate again and the acceleration is minus ω² times the displacement: it always points back towards the mean position and grows with the distance from it. That is the test for SHM. If a body's acceleration is proportional to its displacement and opposite to it, the body does SHM.",
      definition:
        "- \\(v = A\\omega\\cos(\\omega t + \\phi)\\) and \\(a = -\\omega^{2}A\\sin(\\omega t + \\phi) = -\\omega^{2}x\\).\n" +
        "- Speed at a displacement: \\(v = \\omega\\sqrt{A^{2} - x^{2}}\\). Largest, \\(A\\omega\\), at the mean; zero at the extremes.\n" +
        "- Acceleration: zero at the mean; largest, \\(\\omega^{2}A\\), at the extremes.\n" +
        "- Velocity leads displacement by \\(\\dfrac{\\pi}{2}\\); acceleration is opposite to displacement (phase difference \\(\\pi\\)).\n" +
        "- **Force law**: \\(F = ma = -m\\omega^{2}x = -kx\\), with \\(k = m\\omega^{2}\\). A restoring force proportional to the displacement gives SHM.\n" +
        "- Graphs: a against x is a straight line through the origin with slope \\(-\\omega^{2}\\); v against x is an ellipse.\n" +
        "- In two dimensions, \\(\\vec{r} = \\vec{C}\\cos\\omega t\\) with a fixed vector \\(\\vec{C}\\) moves along a straight line, and \\(\\vec{a} = -\\omega^{2}\\vec{r}\\): it is SHM along that line.",
      formula: {
        label: "Velocity, acceleration and force",
        latex: "v = \\omega\\sqrt{A^{2} - x^{2}}, \\qquad a = -\\omega^{2}x, \\qquad F = -kx,\\ k = m\\omega^{2}",
      },
      authoredExample: {
        prompt:
          "A particle in SHM has amplitude 5 cm and angular frequency 4 rad/s. Find its speed and the size of its acceleration at x = 3 cm.",
        steps: [
          "\\(v = \\omega\\sqrt{A^{2} - x^{2}} = 4\\sqrt{25 - 9} = 4 \\times 4 = 16\\) cm/s.",
          "\\(|a| = \\omega^{2}|x| = 16 \\times 3 = 48\\ \\text{cm/s}^{2}\\), directed towards the mean position.",
        ],
        answer: "16 cm/s and \\(48\\ \\text{cm/s}^{2}\\)",
      },
      selfCheckExample: {
        prompt: "A particle moves along a line with acceleration \\(a = -36x\\) (SI units). Is its motion SHM, and if so what is its period?",
        steps: [
          "The acceleration is proportional to x and opposite to it, so the motion is SHM.",
          "Compare with \\(a = -\\omega^{2}x\\): \\(\\omega^{2} = 36\\), \\(\\omega = 6\\) rad/s.",
          "\\(T = \\dfrac{2\\pi}{6} = \\dfrac{\\pi}{3} \\approx 1.05\\) s.",
        ],
        answer: "Yes; \\(T = \\pi/3 \\approx 1.05\\) s",
      },
      practiceSet: [
        { prompt: "What is the maximum speed of a particle in SHM with amplitude 0.1 m and angular frequency 20 rad/s?", answer: "2 m/s" },
        { prompt: "What is the phase difference between the displacement and the acceleration of a particle in SHM?", answer: "\\(\\pi\\)" },
        { prompt: "Where in SHM is the acceleration largest, and what is its value?", answer: "At the extremes; \\(\\omega^{2}A\\)" },
        { prompt: "What is the shape of the graph of acceleration against displacement in SHM?", answer: "A straight line through the origin with a negative slope" },
      ],
      pyqExampleId: "86bf9139-7d59-4ad4-9ec0-2525235e0630",
      traps: [
        {
          title: "Speed and acceleration peak at opposite places",
          body: "At the mean position the speed is largest and the acceleration is zero. At the extremes the speed is zero and the acceleration is largest, \\(\\omega^{2}A\\).",
        },
        {
          title: "One cosine for both components means a straight line",
          body: "In \\(\\vec{r} = (\\hat{i} + 2\\hat{j})A\\cos\\omega t\\), x and y share the same \\(\\cos\\omega t\\), so \\(y = 2x\\): the path is a straight line, not an ellipse or a parabola, and the motion is SHM along it.",
        },
        {
          title: "Acceleration has the opposite sign to displacement",
          body: "Since \\(a = -\\omega^{2}x\\), the acceleration is negative wherever the displacement is positive. Reading the size correctly but dropping the minus sign picks the wrong option.",
        },
      ],
    },
  ],
};
