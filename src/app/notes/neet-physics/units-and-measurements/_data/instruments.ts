import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_UM_INSTRUMENTS_NOTE: SubtopicNote = {
  subtopicName: "Vernier Callipers and Screw Gauge",
  title: "Vernier Callipers and Screw Gauge",
  oneLineDefinition:
    "Two instruments that read lengths finer than a millimetre scale: how to find their least count, how to take a reading, and how to correct it for a zero error.",
  whyItMatters:
    "Six NEET questions, five of them from 2024 or later. Four are on the vernier calliper: its least count from how its divisions match the main scale (2024, 2026), and a reading corrected for a zero error (2025, and Re-NEET 2026, which NTA made a bonus question). Two read a wire's diameter on a screw gauge (2021, Re-NEET 2024).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphum-vernier",
      name: "Vernier calliper: least count and reading",
      visualizationSlug: "jee-vernier-scale",
      intuition:
        "A vernier scale slides along the main scale. Its divisions are made a little shorter than the main scale divisions, so only one vernier line lines up exactly with a main scale line. How far along that line is tells you the fraction of a main scale division that the main scale alone cannot show.",
      definition:
        "- **Least count (vernier constant):** \\(\\text{LC} = 1\\ \\text{MSD} - 1\\ \\text{VSD}\\).\n" +
        "- If n vernier divisions equal \\((n - 1)\\) main scale divisions, \\(1\\ \\text{VSD} = \\dfrac{n-1}{n}\\ \\text{MSD}\\) and \\(\\text{LC} = \\dfrac{1\\ \\text{MSD}}{n}\\).\n" +
        "- In general, if N VSD equal M MSD, then \\(1\\ \\text{VSD} = \\dfrac{M}{N}\\ \\text{MSD}\\) and \\(\\text{LC} = \\left(1 - \\dfrac{M}{N}\\right)\\text{MSD}\\).\n" +
        "- **Reading** = main scale reading (the mark just before the vernier zero) + (number of the coinciding vernier division × LC).",
      formula: {
        label: "Vernier calliper",
        latex: "\\text{LC} = 1\\,\\text{MSD} - 1\\,\\text{VSD}, \\qquad \\text{Reading} = \\text{MSR} + n \\times \\text{LC}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of the vernier division that coincides" },
          { symbol: "\\(\\text{MSR}\\)", meaning: "main scale reading" },
        ],
      },
      authoredExample: {
        prompt:
          "In a vernier calliper 10 vernier divisions equal 9 main scale divisions, and one main scale division is 1 mm. The main scale reads 3.2 cm and the 7th vernier division coincides. Find the reading.",
        steps: [
          "\\(1\\ \\text{VSD} = \\dfrac{9}{10}\\ \\text{mm}\\), so \\(\\text{LC} = 1 - 0.9 = 0.1\\ \\text{mm} = 0.01\\ \\text{cm}\\).",
          "Vernier part: \\(7 \\times 0.01 = 0.07\\ \\text{cm}\\).",
          "Reading: \\(3.2 + 0.07 = 3.27\\ \\text{cm}\\).",
        ],
        answer: "3.27 cm",
      },
      selfCheckExample: {
        prompt:
          "A vernier calliper has a least count of 0.1 mm. Its zero lies between 4.3 cm and 4.4 cm on the main scale, and the 8th vernier division coincides. What is the length?",
        steps: [
          "Main scale reading: 4.3 cm. LC = 0.01 cm.",
          "\\(4.3 + 8 \\times 0.01 = 4.38\\ \\text{cm}\\).",
        ],
        answer: "4.38 cm",
      },
      practiceSet: [
        { prompt: "Write the least count of a vernier calliper in terms of MSD and VSD.", answer: "\\(1\\ \\text{MSD} - 1\\ \\text{VSD}\\)" },
        { prompt: "If n vernier divisions equal \\((n - 1)\\) main scale divisions, what is the least count?", answer: "\\(\\dfrac{1\\ \\text{MSD}}{n}\\)" },
        { prompt: "A vernier calliper of least count 0.01 cm has a main scale reading of 1.5 cm, and its 4th division coincides. Find the reading.", answer: "1.54 cm" },
        { prompt: "A vernier calliper of least count 0.01 cm reads 2.36 cm with a main scale reading of 2.3 cm. Which vernier division coincides?", answer: "The 6th" },
      ],
      pyqExampleId: "387bb51c-0900-414a-a2b5-deee429ecad5",
      traps: [
        {
          title: "Count the divisions both ways",
          body: "When N vernier divisions match M main scale divisions, one VSD is \\(\\tfrac{M}{N}\\) MSD, not \\(\\tfrac{N}{M}\\). The vernier division is the shorter one.",
        },
        {
          title: "Watch the unit in the options",
          body: "Least counts are often worked in millimetres while the options are in centimetres. 0.2 mm is 0.02 cm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-screw-gauge",
      name: "Screw gauge: pitch, least count and reading",
      intuition:
        "A screw moves forward by a fixed distance, the pitch, every time it turns once. The thimble's edge is cut into equal circular divisions, so turning by one division moves the screw by the pitch divided by that number. That tiny step is the least count, often 0.01 mm.",
      definition:
        "- **Pitch:** the distance the screw moves along its axis in one full turn. Pitch = distance moved ÷ number of full turns.\n" +
        "- **Least count:** \\(\\text{LC} = \\dfrac{\\text{pitch}}{\\text{number of circular divisions}}\\).\n" +
        "- **Reading** = main (pitch) scale reading + (circular scale reading × LC).\n" +
        "- More circular divisions, or a smaller pitch, gives a smaller least count.",
      formula: {
        label: "Screw gauge",
        latex: "\\text{LC} = \\frac{\\text{pitch}}{N}, \\qquad \\text{Reading} = \\text{MSR} + \\text{CSR} \\times \\text{LC}",
        symbols: [
          { symbol: "\\(N\\)", meaning: "number of divisions on the circular scale" },
          { symbol: "\\(\\text{CSR}\\)", meaning: "circular scale reading, in divisions" },
        ],
      },
      authoredExample: {
        prompt:
          "A screw gauge has a pitch of 0.5 mm and 50 circular divisions. The main scale reads 2.5 mm and the 36th circular division is on the reference line. Find the reading.",
        steps: [
          "\\(\\text{LC} = \\dfrac{0.5}{50} = 0.01\\ \\text{mm}\\).",
          "Circular part: \\(36 \\times 0.01 = 0.36\\ \\text{mm}\\).",
          "Reading: \\(2.5 + 0.36 = 2.86\\ \\text{mm}\\).",
        ],
        answer: "2.86 mm",
      },
      selfCheckExample: {
        prompt: "A screw moves 1 mm in two full turns, and its circular scale has 100 divisions. Find its least count.",
        steps: [
          "Pitch: \\(\\dfrac{1}{2} = 0.5\\ \\text{mm}\\).",
          "\\(\\text{LC} = \\dfrac{0.5}{100} = 0.005\\ \\text{mm}\\).",
        ],
        answer: "0.005 mm",
      },
      practiceSet: [
        { prompt: "What is the pitch of a screw gauge?", answer: "The distance the screw moves in one full turn" },
        { prompt: "A screw gauge has a pitch of 1 mm and 50 circular divisions. Find its least count.", answer: "0.02 mm" },
        { prompt: "A screw moves 2 mm in 4 full turns. What is its pitch?", answer: "0.5 mm" },
        { prompt: "To make a screw gauge's least count smaller, should the number of circular divisions be raised or lowered?", answer: "Raised" },
      ],
      pyqExampleId: "45884c1e-7996-41eb-9b74-f11521480d59",
      traps: [
        {
          title: "Multiply the division number by the least count",
          body: "A circular reading of 47 divisions with LC 0.01 mm adds 0.47 mm, not 47 mm and not 0.047 mm.",
        },
        {
          title: "Pitch is per full turn",
          body: "If the screw moves 1 mm in two turns, the pitch is 0.5 mm. Using 1 mm doubles the least count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphum-zero-error",
      name: "Zero error and the corrected reading",
      intuition:
        "Close the jaws of a vernier calliper and the reading should be zero. If the vernier zero sits a little to the right of the main scale zero, every reading is too large by that amount: a positive zero error. If it sits to the left, every reading is too small: a negative zero error. You fix it by subtracting the zero error, sign included.",
      definition:
        "- **Zero error** is the reading the instrument shows when the length measured is zero (jaws or studs touching).\n" +
        "- Vernier zero to the **right** of the main scale zero: positive zero error \\(= +n \\times \\text{LC}\\), where the nth vernier division coincides.\n" +
        "- Vernier zero to the **left**: negative zero error \\(= -(N - n) \\times \\text{LC}\\), where N is the number of vernier divisions.\n" +
        "- **Corrected reading** = observed reading − zero error, with the sign of the zero error. A negative zero error is therefore added on.",
      formula: {
        label: "Corrected reading",
        latex: "\\text{True reading} = \\text{observed reading} - (\\text{zero error})",
      },
      authoredExample: {
        prompt:
          "A vernier calliper has 10 vernier divisions and a least count of 0.01 cm. With the jaws closed, the vernier zero lies to the left of the main scale zero and the 6th vernier division coincides. A rod then reads 2.50 cm. Find its true length.",
        steps: [
          "Zero to the left, so the zero error is negative: \\(-(10 - 6) \\times 0.01 = -0.04\\ \\text{cm}\\).",
          "True length \\(= 2.50 - (-0.04) = 2.54\\ \\text{cm}\\).",
        ],
        answer: "2.54 cm",
      },
      selfCheckExample: {
        prompt: "A screw gauge shows +0.03 mm when its studs touch. It reads 1.47 mm across a wire. What is the wire's true diameter?",
        steps: [
          "The zero error is +0.03 mm.",
          "True diameter \\(= 1.47 - 0.03 = 1.44\\ \\text{mm}\\).",
        ],
        answer: "1.44 mm",
      },
      practiceSet: [
        { prompt: "With the jaws of a vernier calliper closed, its zero lies to the right of the main scale zero. Is the zero error positive or negative?", answer: "Positive" },
        { prompt: "A vernier calliper has a zero error of −0.02 cm and reads 4.10 cm. What is the true length?", answer: "4.12 cm" },
        { prompt: "How is the true reading found from the observed reading and the zero error?", answer: "Observed reading minus the zero error, with its sign" },
        { prompt: "Does taking many readings remove a zero error?", answer: "No; it is a systematic error, present in every reading" },
      ],
      pyqExampleId: "8f5a8e19-0be1-4cc2-acaa-0cd31ebb561d",
      traps: [
        {
          title: "Subtract the zero error, sign and all",
          body: "A positive zero error is taken away; a negative one is added. Adding a positive zero error gives a reading too large by twice the error.",
        },
        {
          title: "A negative zero error counts from the far end",
          body: "When the vernier zero is left of the main zero, the error is \\((N - n)\\) divisions, not n. With 10 divisions and the 3rd coinciding it is \\(-0.07\\ \\text{cm}\\) for LC 0.01 cm, not \\(-0.03\\ \\text{cm}\\).",
        },
      ],
    },
  ],
};
