import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_SE_RECTIFIER_NOTE: SubtopicNote = {
  subtopicName: "Application of Junction Diode as a Rectifier",
  title: "Application of Junction Diode as a Rectifier",
  oneLineDefinition:
    "How a junction diode, which conducts only in forward bias, turns ac into a one-way voltage: the half-wave rectifier with one diode, the full-wave rectifier with two diodes and a centre-tap transformer, the output frequency of each, and the capacitor filter.",
  whyItMatters:
    "22 questions. Twenty-one were set in board papers, and the full-wave rectifier, with its circuit, working and input and output waveforms, was asked every year from 2022 to 2026.The board also asks the half-wave rectifier and its output (2022, 2023, 2024), the differences between half-wave and full-wave rectification (2022, 2023, 2025), the property of a diode that makes it a rectifier, and the output (ripple) frequency of each rectifier for a given input (2024, 2025). The textbook exercise asks the output frequencies for a 50 Hz input.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpse-half-wave",
      name: "Half-wave rectifier, and how it differs from full-wave",
      intuition:
        "A diode lets current through only when it is forward biased. Put it in series with a load across an ac supply, and current flows during one half of each cycle and stops during the other. The output across the load is a row of humps with gaps between them: it still varies, but it never changes direction. That is rectification.",
      definition:
        "- **Rectifier:** a circuit that uses a diode to restrict an alternating voltage to one direction. The property used: a diode allows current only when forward biased (low forward resistance, very high reverse resistance).\n" +
        "- **Half-wave circuit:** the secondary of a transformer gives the ac across terminals A and B. A diode and the load resistance \\(R_L\\) are in series across A and B, and the output is taken across \\(R_L\\).\n" +
        "- **When A is positive**, the diode is forward biased and conducts, so current flows through \\(R_L\\) and the output follows the input half cycle.\n" +
        "- **When A is negative**, the diode is reverse biased and does not conduct. Its reverse saturation current is negligible, so the output is zero for that half cycle.\n" +
        "- The output is pulsating but in one direction only. Since it uses only half of each input cycle, the circuit is called a half-wave rectifier.\n" +
        "- The reverse breakdown voltage of the diode must be well above the peak ac voltage of the secondary, to protect the diode.\n" +
        "- **Waveforms in words:** draw the input sine wave on one time axis and, directly below it on the same time scale, the output: a hump for each positive half cycle and a flat line on the axis for each negative half cycle.",
      table: {
        columns: ["Feature", "Half-wave rectifier", "Full-wave rectifier"],
        rows: [
          { cells: ["Diodes used", "One", "Two, with a centre-tap transformer"] },
          {
            cells: ["Half cycles giving output", "Only one half of each cycle", "Both halves of each cycle"],
            pyqExampleId: "546e5669-8053-487d-ad78-5f4c8318b8fe",
            noteAmber: "Board 2022 asked two differences between a half-wave and a full-wave rectifier.",
          },
          {
            cells: ["Output waveform", "Humps with gaps of equal width between them", "Humps with no gaps between them"],
            pyqExampleId: "20604daf-1228-4f34-b9ab-85d47fc64653",
            noteAmber: "Board 2023 asked which graph shows the output of a single diode in series with a load.",
          },
          { cells: ["Output frequency", "Equal to the input frequency", "Twice the input frequency"] },
          { cells: ["Efficiency", "Lower: half of each cycle is lost", "Higher: both halves are used"] },
        ],
      },
      selfCheckExample: {
        prompt: "In a half-wave rectifier, what is the output across the load during the half cycle that reverse biases the diode? Give the reason.",
        steps: ["In reverse bias the diode does not conduct.", "Only the negligible reverse saturation current could flow, so the current through \\(R_L\\) is zero."],
        answer: "Zero, because the reverse-biased diode does not conduct",
      },
      practiceSet: [
        { prompt: "Name the circuit that converts an ac voltage into a one-way (dc) voltage.", answer: "A rectifier" },
        { prompt: "Why must a rectifier diode's reverse breakdown voltage be higher than the peak secondary voltage?", answer: "So that the diode does not break down and get damaged in the reverse half cycle" },
        { prompt: "How many diodes does a centre-tap full-wave rectifier use?", answer: "Two" },
      ],
      pyqExampleId: "4378b5b4-8ceb-43e9-8e60-65a8f96c3d6a",
      traps: [
        {
          title: "Drawing the output below the axis",
          body: "A half-wave output has humps on ONE side of the time axis only, with flat gaps on the axis. A hump below the axis means the diode is not rectifying.",
        },
        {
          title: "Waveforms not lined up",
          body: "Draw the output directly under the input on the same time scale, so each hump sits under the half cycle that made it. Unlabelled axes or misaligned waves lose the waveform mark.",
        },
        {
          title: "Stating the property vaguely",
          body: "Say exactly what makes a diode a rectifier: it conducts only when forward biased, with low resistance in forward bias and very high resistance in reverse bias.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbpse-full-wave",
      name: "Full-wave rectifier with a centre-tap transformer",
      intuition:
        "Measured from the centre tap, the two ends of the secondary are always opposite: when one is positive the other is negative. So there is always one diode facing the right way. The two diodes take turns, and each sends its current through the load in the same direction. The output gets a hump in every half cycle.",
      definition:
        "How a full-wave rectifier works, one step a line:\n" +
        "- **Circuit:** the secondary of a **centre-tap transformer** has ends A and B. The p-sides of diodes \\(D_1\\) and \\(D_2\\) are joined to A and B. Their n-sides are joined together, and the output is taken across \\(R_L\\) between this common point and the centre tap.\n" +
        "- The voltages at A and B, measured from the centre tap, are always out of phase. Each diode gets only half the total secondary voltage.\n" +
        "- **When A is positive** (B negative), \\(D_1\\) is forward biased and conducts; \\(D_2\\) is reverse biased and does not. Current flows through \\(R_L\\).\n" +
        "- **When A is negative** (B positive), \\(D_2\\) conducts and \\(D_1\\) does not. Current flows through \\(R_L\\) in the SAME direction as before.\n" +
        "- So each diode conducts for half a cycle, on alternate halves, and there is output in both halves of the cycle. This makes it a more efficient circuit than the half-wave rectifier.\n" +
        "- **Filter:** the output is a series of half-sine pulses. A capacitor across \\(R_L\\) charges to the peak on each pulse and discharges slowly through \\(R_L\\) between pulses. The slower it discharges, the steadier the output, so a large \\(C\\) (large time constant \\(CR_L\\)) is used. An inductor in series with \\(R_L\\) also works.\n" +
        "- **Waveforms in words:** the input at A, below it the input at B (the same wave inverted), then the output: humps every half cycle with no gaps. Label which diode gives which hump.",
      table: {
        columns: ["Half cycle", "Diode D₁", "Diode D₂", "Current through the load"],
        rows: [
          {
            cells: ["A positive, B negative", "Forward biased, conducts", "Reverse biased, off", "Flows one way through \\(R_L\\)"],
            pyqExampleId: "aa424f34-b4d9-45a8-8244-4200dabe4b7a",
            noteAmber: "Board 2024 asked the state of the two diodes at any instant: one forward and the other reverse biased.",
          },
          {
            cells: ["A negative, B positive", "Reverse biased, off", "Forward biased, conducts", "Flows the SAME way through \\(R_L\\)"],
            pyqExampleId: "63ffbaef-1ab0-4b71-b362-b7d6f36cb261",
            noteAmber: "Board 2024 asked for how long each diode conducts: half a cycle.",
          },
        ],
        caption: "Each diode conducts for half a cycle; between them the load gets current in every half cycle, always in the same direction.",
      },
      selfCheckExample: {
        prompt: "In a centre-tap full-wave rectifier, diode \\(D_2\\) burns out and stops conducting. What output do you now get across the load?",
        steps: ["Only \\(D_1\\) still conducts, during the half cycles when A is positive.", "The other half cycles give no output."],
        answer: "A half-wave output: humps in alternate half cycles only",
      },
      practiceSet: [
        { prompt: "Why does a full-wave rectifier need a centre-tap transformer?", answer: "So that the two ends of the secondary are always opposite in phase with respect to the centre tap, and one diode conducts in each half cycle" },
        { prompt: "What is connected across the load of a rectifier to smooth its output?", answer: "A capacitor (a capacitor input filter)" },
        { prompt: "Why are large capacitors used in a capacitor input filter?", answer: "A large C gives a large time constant \\(CR_L\\), so the capacitor discharges slowly and the output stays near the peak" },
      ],
      pyqExampleId: "e25c7c34-ee16-4a17-a9eb-91cd0b851eef",
      traps: [
        {
          title: "Saying both diodes conduct together",
          body: "At any instant one diode is forward biased and the other reverse biased. They take turns, one each half cycle.",
        },
        {
          title: "Drawing the second half as negative",
          body: "The current through \\(R_L\\) is in the same direction in both halves, so every output hump is on the SAME side of the axis.",
        },
        {
          title: "Circuit without the centre tap or labels",
          body: "The diagram carries marks. Show the centre-tap transformer, label A, B, \\(D_1\\), \\(D_2\\) and \\(R_L\\), and take the output between the joined n-sides and the centre tap.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpse-rectifier-frequency",
      name: "Output frequency of a rectifier",
      intuition:
        "Count the humps. A half-wave rectifier gives one hump for each input cycle, so its output repeats as often as the input. A full-wave rectifier gives a hump for every half cycle, two per input cycle, so its output repeats twice as often. Faster humps leave shorter gaps, which a filter smooths more easily.",
      definition:
        "- **Half-wave:** one output pulse per input cycle, so the output frequency equals the input frequency.\n" +
        "- **Full-wave:** two output pulses per input cycle, so the output frequency is twice the input frequency.\n" +
        "- If the input is given as \\(V = V_m \\sin \\omega t\\), first find the input frequency: \\(f = \\dfrac{\\omega}{2\\pi}\\).\n" +
        "- The output frequency is also called the ripple frequency.",
      formula: {
        label: "Output frequency",
        latex: "f_{\\text{half-wave}} = f \\qquad f_{\\text{full-wave}} = 2f \\qquad f = \\frac{\\omega}{2\\pi}",
        symbols: [
          { symbol: "\\(f\\)", meaning: "frequency of the input ac" },
          { symbol: "\\(\\omega\\)", meaning: "angular frequency in the input \\(V_m \\sin \\omega t\\)" },
        ],
      },
      authoredExample: {
        prompt: "An ac voltage \\(V = 20 \\sin(120\\pi t)\\) volt is applied to a half-wave rectifier and then to a full-wave rectifier. Find the output frequency in each case.",
        steps: [
          "Given: \\(\\omega = 120\\pi\\) rad/s.",
          "Formula: \\(f = \\dfrac{\\omega}{2\\pi}\\).",
          "\\(f = \\dfrac{120\\pi}{2\\pi} = 60\\) Hz.",
          "Half-wave: output frequency = \\(f\\) = 60 Hz.",
          "Full-wave: output frequency = \\(2f\\) = 120 Hz.",
        ],
        answer: "60 Hz for the half-wave rectifier, 120 Hz for the full-wave rectifier",
      },
      selfCheckExample: {
        prompt: "A 40 Hz ac supply feeds a full-wave rectifier. What is the output frequency?",
        steps: ["A full-wave rectifier gives two pulses per input cycle.", "\\(2 \\times 40 = 80\\) Hz."],
        answer: "80 Hz",
      },
      practiceSet: [
        { prompt: "An ac voltage \\(V = 10 \\sin(300\\pi t)\\) volt feeds a half-wave rectifier. What is the output frequency?", answer: "150 Hz" },
        { prompt: "The output of a full-wave rectifier has a frequency of 90 Hz. What is the input frequency?", answer: "45 Hz" },
        { prompt: "Why is the output of a full-wave rectifier easier to smooth than that of a half-wave rectifier?", answer: "Its pulses come twice as often, so the gaps between them are shorter" },
      ],
      pyqExampleId: "b4f4f4b7-df5e-44a0-b09d-a977070bad93",
      traps: [
        {
          title: "Reading ω as the frequency",
          body: "In \\(V = V_m \\sin \\omega t\\) the number in front of \\(t\\) is the angular frequency. Divide by \\(2\\pi\\) to get the frequency before doubling or not.",
        },
        {
          title: "Halving instead of doubling",
          body: "A full-wave rectifier DOUBLES the frequency: two humps for every input cycle. It never gives a lower frequency than the input.",
        },
      ],
    },
  ],
};
