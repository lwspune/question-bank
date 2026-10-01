import type { SubtopicNote } from "@/app/notes/_types";

export const RMS_AC_NOTE: SubtopicNote = {
  subtopicName: "RMS Values and Timing in AC",
  title: "RMS Values and Timing in AC",
  oneLineDefinition:
    "The rms value of an alternating current is the steady current that heats a resistor at the same rate: I₀/√2 for a sine wave, and for a constant plus a sinusoid the squares add.",
  whyItMatters:
    "Fifteen PYQs, thirteen of them multiple choice, and five from 2025 or 2026. Eight read a single sine wave: its rms value, its frequency, the heat it makes, or the time it takes to move between two values. Seven ask for the rms of a sum, a constant plus a sinusoid or a sine plus a cosine. None needs more than two lines once you square before you average.",
  concepts: [
    // C1 — one sine wave: rms, meters, heating, timing
    {
      kind: "formula" as const,
      slug: "jpac-rms-sine",
      name: "RMS value, meters and timing on a sine wave",
      intuition:
        "Heat in a resistor goes as the square of the current, so the useful average of an alternating current is the root of the mean of its square. For a sine wave that is the peak divided by √2. Meters and ratings quote this rms value. For timing, remember that the phase ωt grows at a steady rate ω, so the time between two points on the wave is their phase gap divided by ω.",
      definition:
        "- \\(i = I_0\\sin\\omega t\\): \\(I_{rms} = \\dfrac{I_0}{\\sqrt{2}} \\approx 0.707\\,I_0\\); in the same way \\(V_{rms} = \\dfrac{V_0}{\\sqrt{2}}\\).\n" +
        "- Read \\(\\omega\\) from the argument: \\(\\sin(200\\pi t)\\) has \\(\\omega = 200\\pi\\ \\text{rad/s}\\), so \\(f = \\dfrac{\\omega}{2\\pi} = 100\\ \\text{Hz}\\) and \\(T = 10\\ \\text{ms}\\).\n" +
        "- A.c. ammeters, voltmeters and hot-wire meters read rms values. A supply 'rated 230 V' means \\(V_{rms} = 230\\ \\text{V}\\), with peak \\(230\\sqrt{2} \\approx 325\\ \\text{V}\\).\n" +
        "- Heat in time t: \\(H = I_{rms}^{2}Rt\\). A d.c. current I and an a.c. current of PEAK value I heat equal resistors in the ratio \\(2 : 1\\).\n" +
        "- A lamp rated P at V: \\(I_{rms} = \\dfrac{P}{V}\\), \\(R = \\dfrac{V^{2}}{P}\\), and the peak current is \\(\\sqrt{2}\\) times \\(I_{rms}\\).\n" +
        "- Time between two values \\(= \\dfrac{\\text{phase gap}}{\\omega}\\). From zero: to half peak \\(\\dfrac{T}{12}\\), to the rms value \\(\\dfrac{T}{8}\\), to the peak \\(\\dfrac{T}{4}\\). From half peak to peak \\(\\dfrac{T}{6}\\); from peak down to rms \\(\\dfrac{T}{8}\\).",
      formula: {
        label: "RMS value and time on the wave",
        latex: "I_{rms} = \\frac{I_0}{\\sqrt{2}} \\qquad t = \\frac{\\Delta(\\omega t)}{\\omega}",
      },
      authoredExample: {
        prompt:
          "A current \\(i = 10\\sin(200\\pi t)\\ \\text{A}\\) flows through a resistor. Find the rms current, the frequency, and the time the current takes to fall from its peak to its rms value.",
        steps: [
          "\\(I_{rms} = \\dfrac{10}{\\sqrt{2}} \\approx 7.07\\ \\text{A}\\).",
          "\\(\\omega = 200\\pi\\), so \\(f = 100\\ \\text{Hz}\\) and \\(T = 10\\ \\text{ms}\\).",
          "The peak is at phase \\(\\dfrac{\\pi}{2}\\). Falling, \\(\\sin\\) is back to \\(\\dfrac{1}{\\sqrt{2}}\\) at phase \\(\\dfrac{3\\pi}{4}\\): a gap of \\(\\dfrac{\\pi}{4}\\).",
          "\\(t = \\dfrac{\\pi/4}{200\\pi} = \\dfrac{1}{800}\\ \\text{s} = 1.25\\ \\text{ms}\\), which is \\(\\dfrac{T}{8}\\).",
        ],
        answer: "\\(7.07\\ \\text{A}\\), \\(100\\ \\text{Hz}\\), \\(1.25\\ \\text{ms}\\)",
      },
      selfCheckExample: {
        prompt:
          "A voltage \\(v = 200\\sin(400\\pi t)\\ \\text{V}\\) is applied to a resistor. How long after \\(t = 0\\) does the current first reach half its peak, and how long does it then take to reach the peak?",
        steps: [
          "\\(\\omega = 400\\pi\\ \\text{rad/s}\\), so \\(T = 5\\ \\text{ms}\\). The current is in phase with the voltage.",
          "Half peak: \\(\\sin\\theta = \\dfrac{1}{2}\\) at \\(\\theta = \\dfrac{\\pi}{6}\\), so \\(t_1 = \\dfrac{\\pi/6}{400\\pi} = \\dfrac{1}{2400}\\ \\text{s} \\approx 0.42\\ \\text{ms}\\).",
          "To the peak: a further \\(\\dfrac{\\pi}{2} - \\dfrac{\\pi}{6} = \\dfrac{\\pi}{3}\\), so \\(t_2 = \\dfrac{\\pi/3}{400\\pi} = \\dfrac{1}{1200}\\ \\text{s} \\approx 0.83\\ \\text{ms}\\).",
        ],
        answer: "\\(\\approx 0.42\\ \\text{ms}\\) (T/12), then \\(\\approx 0.83\\ \\text{ms}\\) (T/6)",
      },
      practiceSet: [
        { prompt: "\\(i = 5\\sqrt{2}\\sin(300\\pi t)\\ \\text{A}\\). RMS current and frequency?", answer: "\\(5\\ \\text{A}\\), \\(150\\ \\text{Hz}\\)" },
        { prompt: "An a.c. voltmeter reads \\(230\\ \\text{V}\\). Peak voltage?", answer: "\\(\\approx 325\\ \\text{V}\\)" },
        { prompt: "A d.c. current of 3 A and an a.c. current of peak 3 A each flow through a \\(5\\ \\Omega\\) resistor for the same time. Ratio of heats?", answer: "\\(2 : 1\\)" },
        { prompt: "A 60 W, 120 V lamp runs on 120 V rms. Peak current?", answer: "\\(0.5\\sqrt{2} \\approx 0.71\\ \\text{A}\\)" },
        { prompt: "Time from zero to the peak for a \\(25\\ \\text{Hz}\\) sine wave?", answer: "\\(\\dfrac{T}{4} = 10\\ \\text{ms}\\)" },
      ],
      pyqExampleId: "02530621-5b02-4595-bf73-cf336a010035", // 30 Jan 2024: half peak to peak is T/6
      traps: [
        {
          title: "Peak to rms is T/8, not T/4",
          body: "From the peak, the wave must lose a phase of π/4 to fall to 1/√2 of the peak. That is one eighth of a cycle. A quarter cycle takes it all the way to zero.",
        },
        {
          title: "Taking the coefficient of t as the frequency",
          body: "In sin(200πt) the coefficient 200π is ω in rad/s. The frequency is ω/2π = 100 Hz. Do not multiply by 2π again.",
        },
        {
          title: "Using the peak where the meter reads rms",
          body: "A meter reading or a rating like '220 V' is an rms value. Multiply by √2 only when the question asks for a peak.",
        },
      ],
    },

    // C2 — rms of a sum
    {
      kind: "formula" as const,
      slug: "jpac-rms-combined",
      name: "RMS of a sum: d.c. plus a.c., sine plus cosine",
      intuition:
        "The rms value comes from the average of i², never of i. Square the sum and average it over a cycle. When the pieces are a constant and a sinusoid, or a sine and a cosine of the same ω, the cross term averages to zero. So the mean squares simply add, and you take the root at the end.",
      definition:
        "- \\(i = I_{dc} + I_0\\sin(\\omega t + \\phi)\\): \\(I_{rms} = \\sqrt{I_{dc}^{2} + \\dfrac{I_0^{2}}{2}}\\). The phase \\(\\phi\\) does not matter.\n" +
        "- \\(i = I_1\\sin\\omega t + I_2\\cos\\omega t\\) is one sinusoid of amplitude \\(\\sqrt{I_1^{2} + I_2^{2}}\\), so \\(I_{rms} = \\sqrt{\\dfrac{I_1^{2} + I_2^{2}}{2}}\\). A hot-wire ammeter reads this.\n" +
        "- Any shape: \\(I_{rms}^{2} = \\dfrac{1}{T}\\displaystyle\\int_0^{T} i^{2}\\,dt\\). Write i as a function of t over one period, square, integrate, divide by T.\n" +
        "- A wave that is \\(I_0\\) for half of each period and zero for the other half has \\(I_{rms} = \\dfrac{I_0}{\\sqrt{2}}\\), but its average is \\(\\dfrac{I_0}{2}\\).\n" +
        "- The rms of a sum is NOT the sum of the rms values.",
      formula: {
        label: "Mean squares add",
        latex: "I_{rms} = \\sqrt{I_{dc}^{2} + \\frac{I_0^{2}}{2}} \\qquad I_{rms}^{2} = \\frac{1}{T}\\int_0^{T} i^{2}\\,dt",
      },
      authoredExample: {
        prompt: "Find the rms value of \\(i = \\left[3 + 4\\sqrt{2}\\sin(200\\pi t)\\right]\\ \\text{A}\\).",
        steps: [
          "\\(i^{2} = 9 + 24\\sqrt{2}\\sin(200\\pi t) + 32\\sin^{2}(200\\pi t)\\).",
          "Over a cycle the middle term averages to zero and \\(\\sin^{2}\\) averages to \\(\\dfrac{1}{2}\\): mean of \\(i^{2} = 9 + 16 = 25\\).",
          "\\(I_{rms} = \\sqrt{25} = 5\\ \\text{A}\\). Adding the rms values, \\(3 + 4 = 7\\), would be wrong.",
        ],
        answer: "\\(5\\ \\text{A}\\)",
      },
      selfCheckExample: {
        prompt:
          "A current \\(i = 5\\sin\\omega t + 12\\cos\\omega t\\) amperes flows in a wire. What does a hot-wire ammeter read? Then find the rms value of \\(i = i_0\\left(\\dfrac{t}{T}\\right)^{2}\\) over one period from 0 to T.",
        steps: [
          "Sine and cosine of the same \\(\\omega\\): amplitude \\(\\sqrt{25 + 144} = 13\\ \\text{A}\\), so the meter reads \\(\\dfrac{13}{\\sqrt{2}} \\approx 9.19\\ \\text{A}\\).",
          "Second part: \\(I_{rms}^{2} = \\dfrac{1}{T}\\displaystyle\\int_0^{T} i_0^{2}\\dfrac{t^{4}}{T^{4}}\\,dt = \\dfrac{i_0^{2}}{5}\\).",
        ],
        answer: "\\(\\approx 9.19\\ \\text{A}\\); \\(\\dfrac{i_0}{\\sqrt{5}}\\)",
      },
      practiceSet: [
        { prompt: "\\(i = 2 + 2\\sqrt{2}\\sin\\omega t\\) A. RMS value?", answer: "\\(2\\sqrt{2} \\approx 2.83\\ \\text{A}\\)" },
        { prompt: "\\(i = 3\\sin\\omega t + 4\\cos\\omega t\\) A. Peak value?", answer: "\\(5\\ \\text{A}\\)" },
        { prompt: "A square wave is \\(+I_0\\) for half of each period and \\(-I_0\\) for the other half. RMS value?", answer: "\\(I_0\\)" },
        { prompt: "\\(i = 4 + 3\\sin(\\omega t + \\pi/6)\\) A. Does the phase \\(\\pi/6\\) change the rms value?", answer: "No: it is \\(\\sqrt{16 + 4.5} \\approx 4.53\\ \\text{A}\\)" },
      ],
      pyqExampleId: "5c7596f9-25bf-4d89-ab3b-8a8253aa7d6e", // 4 Apr 2024: a constant plus a sinusoid
      traps: [
        {
          title: "Adding rms values",
          body: "For 3 + 4√2 sin ωt the rms is √(9 + 16) = 5, not 3 + 4 = 7. Mean squares add; rms values do not.",
        },
        {
          title: "Averaging i instead of i²",
          body: "The plain average of a sinusoid over a cycle is zero. The rms comes from the average of the SQUARE, and the root is taken last.",
        },
        {
          title: "Adding the amplitudes of a sine and a cosine",
          body: "sin ωt and cos ωt are 90° apart, so their amplitudes combine like the sides of a right triangle: √(I₁² + I₂²), not I₁ + I₂.",
        },
      ],
    },
  ],
};
