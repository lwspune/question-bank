import type { SubtopicNote } from "@/app/notes/_types";

export const INSTRUMENTS_UNIT_NOTE: SubtopicNote = {
  subtopicName: "Vernier Callipers, Screw Gauge and Zero Error",
  title: "Vernier Callipers, Screw Gauge and Zero Error",
  oneLineDefinition:
    "A vernier's least count is one main-scale division minus one vernier division, a screw gauge's is its pitch divided by the circular divisions, and a true reading is the observed reading minus the zero error, taken with its sign.",
  whyItMatters:
    "Thirty-seven PYQs, thirty of them multiple choice, and seven from 2026, the largest page in the chapter. Sixteen find the least count of a vernier callipers, a travelling microscope or a screw gauge; seventeen correct a reading for zero error; four turn a reading into a density, an area or a refractive index. The sign of the zero error decides most of the marks.",
  concepts: [
    // C1 — least count
    {
      kind: "formula" as const,
      slug: "jpunit-least-count",
      name: "Least count of a vernier and a screw gauge",
      intuition:
        "A vernier scale has divisions slightly shorter than the main scale's. Lined up from zero, the first vernier mark falls short of the first main mark by one least count, the second by two, and so on; the mark that coincides tells you how many least counts to add. A screw gauge instead turns rotation into distance: one full turn moves the spindle by the pitch, so one circular division moves it by pitch ÷ divisions.",
      definition:
        "- **Vernier**: least count (vernier constant) \\(= 1\\ \\text{MSD} - 1\\ \\text{VSD}\\).\n" +
        "- If \\(N\\) VSD \\(= (N - 1)\\) MSD, then LC \\(= \\dfrac{\\text{MSD}}{N}\\). In general, if \\(N\\) VSD \\(= m\\) MSD, then LC \\(= \\left(1 - \\dfrac{m}{N}\\right)\\) MSD.\n" +
        "- A travelling microscope carries a vernier; find its MSD from 'divisions per cm' first.\n" +
        "- **Screw gauge**: pitch = distance moved per rotation; LC \\(= \\dfrac{\\text{pitch}}{\\text{number of circular divisions}}\\).\n" +
        "- A spherometer is a screw gauge on three legs; it measures the radius of curvature of a curved surface and small thicknesses.\n" +
        "- From a set of recorded readings, the least count is one unit in the last recorded decimal place.",
      formula: {
        label: "Least count",
        latex: "\\text{vernier: } \\text{LC} = 1\\,\\text{MSD} - 1\\,\\text{VSD} = \\left(1 - \\frac{m}{N}\\right)\\text{MSD} \\qquad \\text{screw gauge: } \\text{LC} = \\frac{\\text{pitch}}{\\text{circular divisions}}",
      },
      authoredExample: {
        prompt:
          "(a) A vernier has 25 divisions equal to 24 main-scale divisions, and one main-scale division is 0.5 mm. Find its least count. (b) A screw gauge has pitch 0.5 mm and 50 circular divisions. Find its least count.",
        steps: [
          "(a) \\(1\\ \\text{VSD} = \\dfrac{24}{25}\\ \\text{MSD}\\), so LC \\(= \\left(1 - \\dfrac{24}{25}\\right) \\times 0.5 = \\dfrac{0.5}{25}\\) mm.",
          "LC \\(= 0.02\\) mm.",
          "(b) LC \\(= \\dfrac{0.5}{50} = 0.01\\) mm.",
        ],
        answer: "(a) \\(0.02\\) mm; (b) \\(0.01\\) mm.",
      },
      selfCheckExample: {
        prompt:
          "In a vernier callipers, 40 vernier divisions equal 38 main-scale divisions, and one main-scale division is 1 mm. Find the least count.",
        steps: [
          "\\(1\\ \\text{VSD} = \\dfrac{38}{40} = 0.95\\) mm.",
          "LC \\(= 1 - 0.95 = 0.05\\) mm.",
        ],
        answer: "\\(0.05\\) mm",
      },
      practiceSet: [
        { prompt: "10 VSD = 9 MSD and 1 MSD = 1 mm. Least count?", answer: "\\(0.1\\) mm" },
        { prompt: "A screw advances 2 mm in 4 rotations and has 100 circular divisions. Least count?", answer: "\\(0.005\\) mm" },
        { prompt: "A screw gauge's pitch is doubled and its circular divisions halved. By what factor does the least count change?", answer: "It becomes 4 times as large" },
        { prompt: "Readings 2.36 cm, 2.38 cm and 2.35 cm were recorded. Least count of the instrument?", answer: "\\(0.01\\) cm" },
      ],
      pyqExampleId: "09c66b9c-5037-4b88-aec2-ee37dee20699", // 2026: 50 VSD = 48 MSD with MSD 0.05 mm
      traps: [
        {
          title: "The vernier constant is MSD minus VSD, not MSD times divisions",
          body: "The least count is the DIFFERENCE between one main-scale and one vernier division. It is not one MSD multiplied by the number of vernier divisions, a statement that appears as a false option.",
        },
        {
          title: "Find the pitch from distance per rotation",
          body: "If five rotations move the spindle 2.5 mm, the pitch is 0.5 mm, not 2.5 mm. Divide by the number of rotations before dividing by the circular divisions.",
        },
      ],
    },

    // C2 — zero error
    {
      kind: "formula" as const,
      slug: "jpunit-zero-error",
      name: "Zero error and the corrected reading",
      intuition:
        "If the instrument does not read zero when its jaws or studs touch, every reading is off by that same amount. A positive zero error makes every reading too large, so it is subtracted; a negative zero error makes every reading too small, so subtracting it adds its size. One rule covers both: true reading = observed reading − zero error, with the zero error's sign.",
      definition:
        "- Observed reading = main-scale reading + (coinciding division) × LC.\n" +
        "- **Corrected reading = observed reading − zero error** (with sign).\n" +
        "- **Vernier**: vernier zero to the RIGHT of the main-scale zero → positive error, \\(+n \\times \\text{LC}\\) when the n-th vernier division coincides. To the LEFT → negative error.\n" +
        "- **Screw gauge**: circular-scale zero BELOW the reference line → positive error, \\(+n \\times \\text{LC}\\). ABOVE the line → negative error, \\(-n \\times \\text{LC}\\).\n" +
        "- 'The reference line coincides with the n-th circular division' means the zero has passed the line: positive, \\(+n \\times \\text{LC}\\).\n" +
        "- With a positive zero error, readings are larger than the true values.",
      formula: {
        label: "Corrected reading",
        latex: "\\text{true reading} = \\text{MSR} + n \\times \\text{LC} - (\\text{zero error})",
      },
      authoredExample: {
        prompt:
          "A vernier callipers has least count 0.1 mm. With the jaws closed, the vernier zero lies to the right of the main zero and the 3rd vernier division coincides. Measuring a rod, the main-scale reading is 24 mm and the 7th vernier division coincides. Find the true length.",
        steps: [
          "Zero error: right of zero, so positive: \\(+3 \\times 0.1 = +0.3\\) mm.",
          "Observed reading: \\(24 + 7 \\times 0.1 = 24.7\\) mm.",
          "True length: \\(24.7 - 0.3 = 24.4\\) mm.",
        ],
        answer: "\\(24.4\\) mm",
      },
      selfCheckExample: {
        prompt:
          "A screw gauge has pitch 0.5 mm and 50 circular divisions. With the studs touching, the circular-scale zero is 4 divisions ABOVE the reference line. A sheet gives a main-scale reading of 3.5 mm and a circular-scale reading of 22. Find its true thickness.",
        steps: [
          "LC \\(= 0.5/50 = 0.01\\) mm.",
          "Zero above the line: negative error, \\(-4 \\times 0.01 = -0.04\\) mm.",
          "Observed: \\(3.5 + 22 \\times 0.01 = 3.72\\) mm. True: \\(3.72 - (-0.04) = 3.76\\) mm.",
        ],
        answer: "\\(3.76\\) mm",
      },
      practiceSet: [
        { prompt: "Vernier LC 0.1 mm; with jaws closed the vernier zero is right of the main zero and the 6th division coincides. Zero error?", answer: "\\(+0.6\\) mm" },
        { prompt: "Screw gauge LC 0.01 mm; circular zero 7 divisions below the reference line. Zero error?", answer: "\\(+0.07\\) mm" },
        { prompt: "Zero error +0.3 mm, observed reading 25.4 mm. True reading?", answer: "\\(25.1\\) mm" },
        { prompt: "Zero error −0.05 mm, observed reading 3.20 mm. True reading?", answer: "\\(3.25\\) mm" },
      ],
      pyqExampleId: "a6f844fd-8cdb-499e-8572-bc29e14be3b3", // 2026: screw gauge, reference line on the 5th division, sphere diameter
      traps: [
        {
          title: "Subtract a positive zero error, never add it",
          body: "A positive zero error means the instrument already reads more than zero with nothing between the jaws, so every reading is too large. Subtract it. Adding it is the most common wrong option.",
        },
        {
          title: "Below the line is positive for a screw gauge",
          body: "When the studs touch and the circular-scale zero sits below the reference line, the screw has gone past zero: the error is positive. Above the line, it has not reached zero: the error is negative.",
        },
        {
          title: "A vernier zero to the left: the textbook count and the keys' count differ",
          body: "When the vernier zero is left of the main zero, the textbook zero error is −(N − n) × LC for an N-division vernier whose n-th division coincides: count back from the vernier's last mark. Two JEE keys instead took it as −n × LC, the right-side count with a minus sign. Work the textbook count first; if no option matches it and −n × LC is offered, that is the count the paper used.",
        },
      ],
    },

    // C3 — using a reading
    {
      kind: "formula" as const,
      slug: "jpunit-readings",
      name: "Taking a reading and using it in a calculation",
      intuition:
        "Once the reading is right, it becomes a length in an ordinary formula: a diameter for a density, a radius for an area, a depth for a refractive index. Convert to one unit before you calculate, and give the result no more significant figures than the reading allows.",
      definition:
        "- Vernier reading = MSR + n × LC; screw-gauge reading = linear-scale reading + circular-scale reading × LC.\n" +
        "- Halve a diameter for a radius; keep cm with grams for g/cm³.\n" +
        "- Travelling microscope: read the mark with no slab (\\(R_1\\)), the mark through the slab (\\(R_2\\)) and the top of the slab (\\(R_3\\)); \\(\\mu = \\dfrac{R_3 - R_1}{R_3 - R_2}\\), real thickness over apparent thickness.\n" +
        "- Round the result to the significant figures of the least precise reading.",
      formula: {
        label: "Reading",
        latex: "\\text{reading} = \\text{MSR} + n \\times \\text{LC}",
      },
      authoredExample: {
        prompt:
          "A screw gauge has pitch 1 mm and 100 circular divisions. For a wire the linear-scale reading is 2 mm and the circular-scale reading is 35. Find the wire's cross-sectional area.",
        steps: [
          "LC \\(= 1/100 = 0.01\\) mm.",
          "Diameter \\(= 2 + 35 \\times 0.01 = 2.35\\) mm, so the radius is \\(1.175\\) mm.",
          "Area \\(= \\pi r^{2} = \\pi \\times 1.175^{2} = 4.34\\ \\text{mm}^{2}\\).",
        ],
        answer: "About \\(4.34\\ \\text{mm}^{2}\\).",
      },
      selfCheckExample: {
        prompt:
          "A vernier callipers of least count 0.1 mm measures the side of a cube: the main-scale reading is 3.4 cm and the 7th vernier division coincides. Find the cube's volume.",
        steps: [
          "Side \\(= 3.4 + 7 \\times 0.01 = 3.47\\) cm (0.1 mm is 0.01 cm).",
          "Volume \\(= 3.47^{3} = 41.78\\ \\text{cm}^{3}\\).",
          "The side has three significant figures, so the volume keeps three.",
        ],
        answer: "\\(41.8\\ \\text{cm}^{3}\\)",
      },
      practiceSet: [
        { prompt: "Vernier LC 0.01 cm; MSR 5.2 cm and the 4th division coincides. Reading?", answer: "\\(5.24\\) cm" },
        { prompt: "Screw gauge LC 0.01 mm; linear reading 1.5 mm, circular reading 18. Reading?", answer: "\\(1.68\\) mm" },
        { prompt: "A sphere's diameter reads 2.00 cm. Its volume?", answer: "About \\(4.19\\ \\text{cm}^{3}\\)" },
        { prompt: "Real depth 6.00 mm, apparent depth 4.00 mm. Refractive index?", answer: "\\(1.50\\)" },
      ],
      pyqExampleId: "bf25cf5f-0975-4021-9f58-0d7aed2685a2", // 2024: vernier reading of a sphere's diameter, then its density
      traps: [
        {
          title: "Match the units before adding",
          body: "A main-scale reading in cm and a least count in mm cannot be added directly. 2.1 cm + 5 × 0.1 mm is 2.15 cm, not 2.6 cm.",
        },
      ],
    },
  ],
};
