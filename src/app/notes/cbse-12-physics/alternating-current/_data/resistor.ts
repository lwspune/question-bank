import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_AC_RESISTOR_NOTE: SubtopicNote = {
  subtopicName: "AC Voltage Applied to a Resistor",
  title: "AC Voltage Across a Resistor: Peak, rms and Average Values",
  oneLineDefinition:
    "An alternating voltage and the current it drives through a resistor, the peak and rms values and how they are related, and the average value over a cycle and over half a cycle.",
  whyItMatters:
    "12 questions, nine of them from board papers. The board asks you to pick out an alternating current from graphs (2023), find the rms value of an unusual signal (2023, 2024), give the average value over a cycle or a half cycle (2024, 2026), find the peak current from an ammeter reading (2025), find the time a current takes to fall from its peak to zero (2025), and differentiate peak and rms values and derive the relation between them (2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpac-ac-basics",
      name: "Alternating voltage and the current through a resistor",
      intuition:
        "An alternating voltage rises to a peak, falls through zero, reverses, and repeats like a sine curve. A direct current never changes direction; an alternating current must swing to negative values as well. Put such a voltage across a resistor and Ohm's law holds at every instant, so the current rises and falls exactly with the voltage: both reach zero, maximum and minimum at the same moment.",
      definition:
        "- **Alternating voltage:** \\(v = v_m \\sin \\omega t\\), where \\(v_m\\) is the **amplitude** (peak value) and \\(\\omega\\) the angular frequency.\n" +
        "- \\(\\omega = 2\\pi\\nu\\) and the period \\(T = \\dfrac{1}{\\nu} = \\dfrac{2\\pi}{\\omega}\\). Indian mains: \\(\\nu = 50\\) Hz, so \\(\\omega = 100\\pi\\) rad/s.\n" +
        "- Across a resistor, Kirchhoff's loop rule gives \\(v_m \\sin \\omega t = iR\\), so \\(i = i_m \\sin \\omega t\\) with \\(i_m = \\dfrac{v_m}{R}\\). Voltage and current are **in phase**.\n" +
        "- From a peak to the next zero takes a quarter of a period, \\(T/4\\); from one zero to the next takes \\(T/2\\).\n" +
        "- The sum of the current over a full cycle is zero, but the heating \\(i^2R\\) is never negative, so a resistor takes power from ac throughout the cycle.",
      formula: {
        label: "AC through a resistor",
        latex: "v = v_m \\sin \\omega t, \\qquad i = \\frac{v_m}{R} \\sin \\omega t, \\qquad \\omega = 2\\pi\\nu = \\frac{2\\pi}{T}",
        symbols: [
          { symbol: "\\(v_m\\)", meaning: "peak (amplitude) of the voltage" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency in rad/s" },
          { symbol: "\\(\\nu\\)", meaning: "frequency in Hz" },
          { symbol: "\\(T\\)", meaning: "time period of one cycle" },
        ],
      },
      authoredExample: {
        prompt:
          "The voltage \\(v = 200 \\sin (50\\pi t)\\) V is applied across a 50 Ω resistor. Find (a) the peak voltage, the frequency and the period, (b) the voltage at \\(t = \\dfrac{1}{300}\\) s, and (c) the peak current.",
        steps: [
          "Given: \\(v = 200 \\sin (50\\pi t)\\). Comparing with \\(v = v_m \\sin \\omega t\\): \\(v_m = 200\\) V, \\(\\omega = 50\\pi\\) rad/s.",
          "Formula: \\(\\nu = \\dfrac{\\omega}{2\\pi}\\), \\(T = \\dfrac{1}{\\nu}\\).",
          "\\(\\nu = \\dfrac{50\\pi}{2\\pi} = 25\\) Hz, so \\(T = \\dfrac{1}{25} = 0.04\\) s.",
          "At \\(t = \\dfrac{1}{300}\\) s: \\(v = 200 \\sin\\left(\\dfrac{50\\pi}{300}\\right) = 200 \\sin\\left(\\dfrac{\\pi}{6}\\right) = 200 \\times 0.5 = 100\\) V.",
          "Peak current: \\(i_m = \\dfrac{v_m}{R} = \\dfrac{200}{50} = 4\\) A, in phase with the voltage.",
        ],
        answer: "(a) 200 V, 25 Hz, 0.04 s; (b) 100 V; (c) 4 A",
      },
      selfCheckExample: {
        prompt: "A bulb is rated 60 W for a 240 V supply. Find the resistance of the bulb and the current through it.",
        steps: [
          "\\(R = \\dfrac{V^2}{P} = \\dfrac{240^2}{60} = 960\\ \\Omega\\).",
          "\\(I = \\dfrac{P}{V} = \\dfrac{60}{240} = 0.25\\) A.",
        ],
        answer: "960 Ω and 0.25 A",
      },
      practiceSet: [
        { prompt: "What is the phase difference between the voltage across a pure resistor and the current through it?", answer: "Zero. They are in phase" },
        { prompt: "The voltage \\(v = 100 \\sin (100\\pi t)\\) V is applied across a 20 Ω resistor. Find the peak current.", answer: "5 A" },
        { prompt: "What is the frequency of a supply whose angular frequency is \\(120\\pi\\) rad/s?", answer: "60 Hz" },
      ],
      pyqExampleId: "c84adeea-1f06-4005-9890-e1fc6d0c1618",
      traps: [
        {
          title: "Reading ω as the frequency",
          body: "In \\(v = v_m \\sin(100\\pi t)\\) the number \\(100\\pi\\) is \\(\\omega\\), in rad/s. The frequency is \\(\\omega/2\\pi = 50\\) Hz. Writing 100π Hz loses the mark.",
        },
        {
          title: "A current that only rises and falls is not ac",
          body: "A current that varies but never changes sign is a varying direct current. On a graph, an alternating current must cross the time axis and take negative values.",
        },
        {
          title: "Quarter period, not half",
          body: "A sine or cosine goes from its peak to zero in \\(T/4\\). It takes \\(T/2\\) to go from peak to the opposite peak.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-rms-value",
      name: "Root mean square value and its relation to the peak",
      intuition:
        "The average of a sine current over a cycle is zero, so it tells you nothing about how well the current heats a wire. Heating depends on the square of the current, which is never negative. So we square, take the mean over a cycle, and take the square root. That number, the rms value, is the steady direct current that would give the same heating. Meters read it, and 220 V mains means 220 V rms.",
      definition:
        "- **Peak value** \\(i_m\\): the largest value the current reaches in a cycle.\n" +
        "- **rms (effective) value** \\(I\\): the steady direct current that produces the same average power in a resistor as the alternating current.\n" +
        "- **Derivation outline:**\n" +
        "- Instantaneous power in R: \\(p = i^2 R = i_m^2 R \\sin^2 \\omega t\\).\n" +
        "- Since \\(\\sin^2 \\omega t = \\tfrac{1}{2}(1 - \\cos 2\\omega t)\\) and \\(\\langle \\cos 2\\omega t \\rangle = 0\\) over a cycle, \\(\\langle \\sin^2 \\omega t \\rangle = \\tfrac{1}{2}\\).\n" +
        "- Average power: \\(\\bar{p} = \\tfrac{1}{2} i_m^2 R\\).\n" +
        "- Define I by \\(I^2 R = \\tfrac{1}{2} i_m^2 R\\), so \\(I = \\dfrac{i_m}{\\sqrt{2}} = 0.707\\, i_m\\).\n" +
        "- In the same way \\(V = \\dfrac{v_m}{\\sqrt{2}} = 0.707\\, v_m\\), and then \\(P = VI = I^2 R\\), just as for dc.\n" +
        "- Ac ammeters and voltmeters read rms values; a quoted ac value is the rms value unless it says otherwise.",
      formula: {
        label: "rms values",
        latex: "I = \\frac{i_m}{\\sqrt{2}} = 0.707\\, i_m, \\qquad V = \\frac{v_m}{\\sqrt{2}} = 0.707\\, v_m, \\qquad P = VI = I^2 R",
        symbols: [
          { symbol: "\\(I, V\\)", meaning: "rms current and rms voltage" },
          { symbol: "\\(i_m, v_m\\)", meaning: "peak current and peak voltage" },
        ],
      },
      authoredExample: {
        prompt:
          "A heater of resistance 46 Ω is connected to a 230 V ac supply. Find (a) the peak voltage, (b) the rms current and the peak current, and (c) the average power.",
        steps: [
          "Given: \\(V = 230\\) V (rms), \\(R = 46\\ \\Omega\\).",
          "(a) \\(v_m = \\sqrt{2}\\, V = 1.414 \\times 230 = 325.3\\) V.",
          "(b) \\(I = \\dfrac{V}{R} = \\dfrac{230}{46} = 5\\) A; \\(i_m = \\sqrt{2}\\, I = 1.414 \\times 5 = 7.07\\) A.",
          "(c) \\(P = VI = 230 \\times 5 = 1150\\) W.",
        ],
        answer: "(a) 325.3 V; (b) 5 A rms, 7.07 A peak; (c) 1150 W",
      },
      selfCheckExample: {
        prompt: "A sinusoidal current has a peak value of 4 A. Find its rms value.",
        steps: ["\\(I = \\dfrac{i_m}{\\sqrt{2}} = \\dfrac{4}{1.414} = 2.83\\) A."],
        answer: "2.83 A",
      },
      practiceSet: [
        { prompt: "An ac voltmeter reads 100 V. What is the peak voltage?", answer: "141.4 V" },
        { prompt: "Does an ac ammeter read the peak, the average or the rms value of the current?", answer: "The rms value" },
        { prompt: "Why is the rms value defined through the square of the current?", answer: "Heating depends on \\(i^2\\), which is never negative, so it does not average to zero" },
      ],
      pyqExampleId: "f1b2c160-2ca3-4259-8c56-623dde38d173",
      traps: [
        {
          title: "Averaging the current instead of its square",
          body: "In the derivation, average \\(i^2\\), not \\(i\\). The average of \\(i_m \\sin \\omega t\\) over a cycle is zero and leads nowhere.",
        },
        {
          title: "Dividing when you should multiply",
          body: "Peak is larger than rms: \\(i_m = \\sqrt{2}\\, I\\). A reading of 10 A has a peak of about 14 A, not 7 A.",
        },
        {
          title: "Leaving out the definition",
          body: "In a 'differentiate' answer, define the rms value as the steady current giving the same heating in the same resistor in the same time. A formula alone does not earn the definition mark.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpac-average-value",
      name: "Average value over a cycle and over half a cycle",
      intuition:
        "A sine curve spends as long below the axis as above it, with the same shape, so over a whole cycle the positive and negative parts cancel and the average is zero. Over only the positive half there is nothing to cancel, so the average is a definite number, a little smaller than the rms value.",
      definition:
        "- **Over a full cycle:** the average of \\(v_m \\sin \\omega t\\) is **zero**, because the negative half cancels the positive half.\n" +
        "- **Over a half cycle:** \\(\\langle v \\rangle = \\dfrac{1}{T/2}\\displaystyle\\int_0^{T/2} v_m \\sin \\omega t\\, dt = \\dfrac{2 v_m}{\\pi} = 0.637\\, v_m\\).\n" +
        "- For a sine wave: peak \\(v_m\\) is greater than rms \\(0.707\\, v_m\\), which is greater than the half cycle average \\(0.637\\, v_m\\).\n" +
        "- The present NCERT chapter states only that the average over a full cycle is zero. Board 2024 asked the average over the first half cycle, which the book does not work out: learn the result and its short integral.",
      formula: {
        label: "Average values of a sine wave",
        latex: "\\langle v \\rangle_{\\text{full cycle}} = 0, \\qquad \\langle v \\rangle_{\\text{half cycle}} = \\frac{2 v_m}{\\pi} = 0.637\\, v_m",
      },
      authoredExample: {
        prompt:
          "For the voltage \\(v = 220 \\sin \\omega t\\) V, find the average value (a) over the positive half cycle and (b) over the negative half cycle.",
        steps: [
          "Given: \\(v_m = 220\\) V.",
          "Formula: \\(\\langle v \\rangle_{\\text{half cycle}} = \\dfrac{2 v_m}{\\pi}\\).",
          "(a) \\(\\langle v \\rangle = \\dfrac{2 \\times 220}{3.142} = 140.0\\) V.",
          "(b) The negative half is the mirror image of the positive half, so its average is \\(-140.0\\) V.",
          "The two halves cancel, which is why the average over the whole cycle is zero.",
        ],
        answer: "(a) 140.0 V; (b) \\(-140.0\\) V",
      },
      selfCheckExample: {
        prompt: "The average value of a sinusoidal current over a half cycle is 7 A. Find its peak value.",
        steps: ["\\(i_m = \\dfrac{\\pi}{2} \\times \\langle i \\rangle = \\dfrac{3.142}{2} \\times 7 = 11.0\\) A."],
        answer: "11.0 A",
      },
      practiceSet: [
        { prompt: "A sinusoidal voltage has a peak value of 50 V. Find its average value over a half cycle.", answer: "31.8 V" },
        { prompt: "For a sine wave, which is larger: the rms value or the average over a half cycle?", answer: "The rms value, \\(0.707\\, v_m\\) against \\(0.637\\, v_m\\)" },
        { prompt: "Why is an alternating voltage described by its rms value and not its average over a cycle?", answer: "The average over a cycle is always zero, while the rms value measures its heating effect" },
      ],
      pyqExampleId: "854539e6-6143-413d-a26d-e081878b9b40",
      traps: [
        {
          title: "Giving the rms value when the average is asked",
          body: "Over a full cycle the average of a sine wave is zero, not \\(v_m/\\sqrt{2}\\). Read whether the question says rms (effective) or average, and over a cycle or a half cycle.",
        },
        {
          title: "Mixing up 0.637 and 0.707",
          body: "\\(2/\\pi = 0.637\\) belongs to the half cycle average; \\(1/\\sqrt{2} = 0.707\\) belongs to the rms value.",
        },
      ],
    },
  ],
};
