import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_AC_RMS_NOTE: SubtopicNote = {
  subtopicName: "Average and RMS Values",
  title: "Average and RMS Values of AC",
  oneLineDefinition:
    "How to read an alternating e.m.f. e = e₀ sin ωt, and the two single numbers used to describe it: the average value over a half cycle and the rms (effective) value.",
  whyItMatters:
    "7 questions. Three were set in board papers: the average value of AC over a full cycle (2022 as an MCQ, 2023 as a short answer), and the peak value, frequency and an instantaneous value read from e = 8 sin 628.4t (2024). The textbook adds the time an AC takes to rise from zero to its rms value and the current a fraction of a second after it was zero.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpac-sinusoid",
      name: "Reading an alternating e.m.f.",
      intuition:
        "An AC generator gives an e.m.f. that swings up and down like a sine curve. Its equation tells you everything: the number in front is the peak value, and the number multiplying t is the angular frequency ω. From ω you get the frequency and the time period, and putting a time into the equation gives the value at that instant.",
      definition:
        "- **Peak value:** the largest value of the current (or e.m.f.) in either direction, written \\(i_0\\) or \\(e_0\\).\n" +
        "- Compare the given equation with \\(e = e_0 \\sin \\omega t\\) to read \\(e_0\\) and \\(\\omega\\).\n" +
        "- Frequency \\(f = \\dfrac{\\omega}{2\\pi}\\) and time period \\(T = \\dfrac{1}{f}\\).\n" +
        "- The instantaneous value at time t is \\(e = e_0 \\sin \\omega t\\). The angle \\(\\omega t\\) is in **radian**, so set your calculator to radian or convert to degrees first.\n" +
        "- In a phasor picture the e.m.f. is an arrow of length \\(e_0\\) turning anticlockwise at angular speed \\(\\omega\\); its projection on the vertical axis is the instantaneous value.",
      formula: {
        label: "Alternating e.m.f.",
        latex: "e = e_0 \\sin \\omega t = e_0 \\sin 2\\pi f t, \\qquad T = \\frac{1}{f} = \\frac{2\\pi}{\\omega}",
        symbols: [
          { symbol: "\\(e_0\\)", meaning: "peak value of the e.m.f." },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency in rad/s" },
          { symbol: "\\(f\\)", meaning: "frequency in hertz" },
        ],
      },
      authoredExample: {
        prompt:
          "The mains supply has an rms value of 220 V and a frequency of 50 Hz. Write the equation of the e.m.f., taking it as zero at t = 0, and find its value at t = 2.5 ms.",
        steps: [
          "Given: \\(e_{rms} = 220\\) V, \\(f = 50\\) Hz.",
          "Peak value: \\(e_0 = \\sqrt{2}\\, e_{rms} = 1.414 \\times 220 = 311.1\\) V.",
          "Angular frequency: \\(\\omega = 2\\pi f = 2 \\times 3.142 \\times 50 = 314.2\\) rad/s.",
          "Equation: \\(e = 311.1 \\sin (314.2\\, t)\\) V.",
          "At \\(t = 2.5 \\times 10^{-3}\\) s: \\(\\omega t = 100\\pi \\times 2.5 \\times 10^{-3} = \\dfrac{\\pi}{4}\\) rad, so \\(e = 311.1 \\times \\sin 45^\\circ = 311.1 \\times 0.7071 = 220\\) V.",
        ],
        answer: "e = 311.1 sin (314.2 t) V; at 2.5 ms, e = 220 V",
      },
      selfCheckExample: {
        prompt:
          "An alternating current is \\(i = 5 \\sin (100\\pi t)\\) A. Find the earliest time after t = 0 at which the current is 2.5 A.",
        steps: [
          "\\(2.5 = 5 \\sin (100\\pi t)\\), so \\(\\sin (100\\pi t) = 0.5\\).",
          "\\(100\\pi t = \\dfrac{\\pi}{6}\\), so \\(t = \\dfrac{1}{600}\\) s.",
        ],
        answer: "1/600 s, about 1.67 ms",
      },
      practiceSet: [
        { prompt: "Find the angular frequency of a 60 Hz supply (take \\(\\pi = 3.142\\)).", answer: "377 rad/s" },
        { prompt: "An e.m.f. is \\(e = 50 \\sin (400\\pi t)\\) V. Find its time period.", answer: "f = 200 Hz, so T = 0.005 s (5 ms)" },
        { prompt: "In \\(e = e_0 \\sin \\omega t\\), in what unit is the angle \\(\\omega t\\)?", answer: "Radian" },
      ],
      pyqExampleId: "896fbfe6-3b31-4cba-8c48-385a703a9169",
      traps: [
        {
          title: "Calculator left in degree mode",
          body: "In \\(\\sin \\omega t\\) the angle is in radian. Working \\(\\sin 3.142\\) in degree mode gives 0.055 instead of zero, and the instantaneous value comes out wrong.",
        },
        {
          title: "Taking ω as the frequency",
          body: "The number multiplying t is \\(\\omega = 2\\pi f\\), not f. For \\(e = 10 \\sin 314.2t\\) the frequency is 50 Hz, not 314.2 Hz.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-average-value",
      name: "Average value of AC",
      intuition:
        "An alternating current flows one way for half a cycle and the other way for the next half, with exactly matching values. So its average over a full cycle is zero, which tells you nothing. That is why the average value of AC is taken over a half cycle, where it comes to about 64% of the peak.",
      definition:
        "- Over a **full cycle** the average value of AC is **zero**, because the average of \\(\\sin \\omega t\\) over a cycle is zero.\n" +
        "- So the **average value of AC** is defined as the average over **one half cycle**.\n" +
        "- Over a half cycle: \\(i_{av} = \\dfrac{2 i_0}{\\pi} = 0.637\\, i_0\\) and \\(e_{av} = 0.637\\, e_0\\).\n" +
        "- A moving-coil ammeter or voltmeter measures the average value, so it reads zero on AC and cannot be used to measure it.",
      formula: {
        label: "Average value over a half cycle",
        latex: "i_{av} = \\frac{2 i_0}{\\pi} = 0.637\\, i_0, \\qquad e_{av} = 0.637\\, e_0",
      },
      authoredExample: {
        prompt:
          "An alternating e.m.f. has a peak value of 311 V. Find its average value over a half cycle, and say what a moving-coil voltmeter connected across it would read.",
        steps: [
          "Given: \\(e_0 = 311\\) V.",
          "Formula: \\(e_{av} = 0.637\\, e_0\\).",
          "Substitution: \\(e_{av} = 0.637 \\times 311 = 198.1\\) V.",
          "A moving-coil voltmeter reads the average over full cycles, where the positive and negative halves cancel, so it reads zero.",
        ],
        answer: "198.1 V over a half cycle; the moving-coil voltmeter reads zero",
      },
      selfCheckExample: {
        prompt: "The average value of an alternating current over a half cycle is 6.37 A. Find its peak value.",
        steps: ["\\(i_0 = \\dfrac{i_{av}}{0.637} = \\dfrac{6.37}{0.637}\\).", "\\(i_0 = 10\\) A."],
        answer: "10 A",
      },
      practiceSet: [
        { prompt: "Find the half-cycle average value of an alternating current of peak value 5 A.", answer: "3.185 A" },
        { prompt: "Over what part of a cycle is the average value of an alternating current defined?", answer: "One half cycle" },
        { prompt: "What fraction of the peak value is the half-cycle average value of AC?", answer: "\\(2/\\pi\\), about 0.637" },
      ],
      pyqExampleId: "7bcf30b5-010f-4bf4-8e7b-742417321a33",
      traps: [
        {
          title: "Not saying which cycle",
          body: "The average value is zero over a full cycle and \\(0.637\\, i_0\\) over a half cycle. Writing 0.637 i₀ for a full cycle (or zero for a half cycle) loses the mark, so always name the cycle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpac-rms-value",
      name: "RMS (effective) value of AC",
      intuition:
        "Heating does not care which way a current flows, because it depends on the square of the current. So we compare AC with DC by heat: the rms value is the steady current that would heat the same resistor just as much. For a sine wave it is the peak divided by √2. Every AC meter and every rating on an appliance gives this value.",
      definition:
        "- **RMS value:** the value of the steady current which, when passed through a resistance for a given time, produces the same heat as the alternating current produces in the same resistance in the same time. It is also called the **effective** or **virtual** value.\n" +
        "- \\(i_{rms} = \\dfrac{i_0}{\\sqrt{2}} = 0.707\\, i_0\\) and \\(e_{rms} = \\dfrac{e_0}{\\sqrt{2}} = 0.707\\, e_0\\).\n" +
        "- AC ammeters and voltmeters read rms values. The 220 V of household mains is an rms value; its peak is \\(1.414 \\times 220 = 311\\) V.",
      formula: {
        label: "RMS value",
        latex: "i_{rms} = \\frac{i_0}{\\sqrt{2}} = 0.707\\, i_0, \\qquad e_{rms} = \\frac{e_0}{\\sqrt{2}} = 0.707\\, e_0",
      },
      authoredExample: {
        prompt:
          "An AC ammeter in a circuit reads 3 A. Find the peak value of the current and its average value over a half cycle.",
        steps: [
          "Given: \\(i_{rms} = 3\\) A (an AC ammeter reads the rms value).",
          "Peak value: \\(i_0 = \\sqrt{2}\\, i_{rms} = 1.414 \\times 3 = 4.242\\) A.",
          "Half-cycle average: \\(i_{av} = 0.637\\, i_0 = 0.637 \\times 4.242 = 2.702\\) A.",
        ],
        answer: "Peak 4.242 A; half-cycle average 2.702 A",
      },
      selfCheckExample: {
        prompt: "An alternating e.m.f. has a peak value of 340 V. What will an AC voltmeter connected across it read?",
        steps: ["The voltmeter reads the rms value.", "\\(e_{rms} = 0.707 \\times 340 = 240.4\\) V."],
        answer: "240.4 V",
      },
      practiceSet: [
        { prompt: "Find the rms value of an alternating e.m.f. of peak value 100 V.", answer: "70.7 V" },
        { prompt: "Which value of an alternating voltage does an AC voltmeter read?", answer: "The rms value" },
        { prompt: "Find the ratio of the rms value to the half-cycle average value of a sinusoidal current.", answer: "0.707/0.637, about 1.11" },
      ],
      pyqExampleId: "71cfb3f9-b0e2-41ad-85a3-888cc542f7cb",
      traps: [
        {
          title: "Dividing when you should multiply",
          body: "Peak is larger than rms: \\(i_0 = \\sqrt{2}\\, i_{rms}\\). Dividing the rms value by √2 gives a number smaller than the rms value, which cannot be the peak.",
        },
        {
          title: "A definition without 'same resistance, same time'",
          body: "The rms value is defined by equal heat in the same resistance in the same time. Leaving out either condition makes the definition incomplete for the board.",
        },
      ],
    },
  ],
};
