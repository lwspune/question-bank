import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_EI_GENERATOR_NOTE: SubtopicNote = {
  subtopicName: "AC Generator",
  title: "The AC Generator",
  oneLineDefinition:
    "The principle, parts and working of an ac generator, the instantaneous emf of a coil rotating in a magnetic field, and its peak value.",
  whyItMatters:
    "13 questions, twelve of them from board papers, three in each year from 2023 to 2026. The board asks you to draw and explain the principle, construction and working of an ac generator and obtain its emf (2023, 2024, 2025, 2026), name its parts from a figure (2025), plot the flux and the emf against time (2026), and find the peak emf (2023, 2025, 2026). The textbook adds a coil turned by a bicycle.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbpei-generator-working",
      name: "Principle, construction and working of an ac generator",
      intuition:
        "A generator turns mechanical energy into electrical energy. A coil is spun in a magnetic field, so the angle between the field and the coil keeps changing, and so does the flux through it. The changing flux induces an emf that reverses every half turn, which is why the current is alternating.",
      definition:
        "- **Principle:** electromagnetic induction. As a coil rotates in a magnetic field, its effective area \\(A\\cos\\theta\\) keeps changing, so the flux through it changes and an emf is induced.\n" +
        "- **Working:** the coil (armature) is rotated by an outside source, such as water falling from a height or a turbine driven by steam. The flux through it changes all the time, so an emf is induced, and its polarity reverses every half turn. The current it drives is alternating.\n" +
        "- **The diagram** carries marks: draw the coil on its shaft between the N and S pole pieces, the two slip rings on the shaft, and the two brushes leading to the external circuit, and label every part.\n" +
        "- **Ways to raise the output:** more turns, a stronger field, a larger coil area or a faster rotation (give any two).",
      table: {
        columns: ["Part", "What it does"],
        rows: [
          { cells: ["Armature (the coil)", "A coil of many turns on a rotor shaft; it is rotated in the field and the emf is induced in it"] },
          { cells: ["Field magnet (pole pieces N and S)", "Gives the uniform magnetic field; the axis of rotation is at right angles to it"] },
          {
            cells: ["Slip rings", "Two rings on the shaft, each joined to one end of the coil, turning with it"],
            noteAmber: "Board 2025 showed the machine and asked you to name its parts and the poles of the magnet.",
          },
          { cells: ["Brushes", "Fixed contacts pressing on the slip rings; they carry the alternating emf to the external circuit"] },
          { cells: ["Rotor shaft", "Turned by the outside source of mechanical energy"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why is the current from this generator alternating?",
        steps: [
          "As the coil turns, the flux through it rises and falls, and the emf \\(\\varepsilon_0\\sin\\omega t\\) changes sign every half turn.",
          "Each end of the coil stays joined to its own slip ring and brush, so the reversal reaches the external circuit.",
        ],
        answer: "Because the induced emf reverses its polarity every half turn",
      },
      practiceSet: [
        { prompt: "On what principle does an ac generator work?", answer: "Electromagnetic induction" },
        { prompt: "What energy change takes place in an ac generator?", answer: "Mechanical energy is changed into electrical energy" },
        { prompt: "Give two ways of increasing the output voltage of an ac generator.", answer: "Any two of: more turns, a stronger field, a larger coil area, faster rotation" },
      ],
      pyqExampleId: "fc452b85-c3bd-41be-b493-6c4b34b63b49",
      traps: [
        {
          title: "No labelled diagram",
          body: "'With the help of a labelled diagram' means the diagram carries marks. Label the coil, the pole pieces, the slip rings and the brushes; an unlabelled sketch earns little.",
        },
        {
          title: "A principle that is not a principle",
          body: "'It produces ac' is not the principle. Write: electromagnetic induction, an emf is induced in a coil when the flux through it changes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-generator-emf",
      name: "Instantaneous emf of a rotating coil",
      intuition:
        "As the coil turns at a steady rate, its flux rises and falls like a cosine wave. The emf follows the rate of change of that flux, so it is a sine wave. The emf is greatest when the plane of the coil lies along the field: the flux there is zero but changing fastest.",
      definition:
        "- **Derivation** (coil of N turns and area A, rotating at angular speed \\(\\omega\\) in a uniform field B, with \\(\\theta = 0\\) at t = 0):\n" +
        "- Angle between \\(\\vec{B}\\) and \\(\\vec{A}\\) at time t: \\(\\theta = \\omega t\\).\n" +
        "- Flux through each turn: \\(\\Phi_B = BA\\cos\\omega t\\).\n" +
        "- Faraday's law: \\(\\varepsilon = -N\\dfrac{d\\Phi_B}{dt} = -NBA\\dfrac{d}{dt}(\\cos\\omega t)\\).\n" +
        "- So \\(\\varepsilon = NBA\\omega\\sin\\omega t = \\varepsilon_0\\sin\\omega t\\), with peak value \\(\\varepsilon_0 = NBA\\omega\\).\n" +
        "- Since \\(\\omega = 2\\pi\\nu\\), \\(\\varepsilon = \\varepsilon_0\\sin 2\\pi\\nu t\\), where \\(\\nu\\) is the frequency of rotation of the coil.\n" +
        "- The emf is greatest when \\(\\theta = 90^\\circ\\) or \\(270^\\circ\\): the plane of the coil is then parallel to the field and the change of flux is greatest.\n" +
        "- If the coil starts with its plane parallel to the field, the flux starts at zero and the emf at its peak. Flux and emf are always a quarter cycle apart.",
      formula: {
        label: "Emf of an ac generator",
        latex: "\\varepsilon = NBA\\omega\\sin\\omega t, \\qquad \\varepsilon_0 = NBA\\omega",
      },
      authoredExample: {
        prompt:
          "A coil of 50 turns and area 0.1 m² turns at 50 rev/s in a uniform field of 0.2 T, starting with its plane perpendicular to the field. Write its emf as a function of time and find the emf at t = 1/600 s.",
        steps: [
          "Given: \\(N = 50\\), \\(A = 0.1\\ \\text{m}^2\\), \\(B = 0.2\\) T, \\(\\omega = 2\\pi \\times 50 = 100\\pi\\ \\text{rad s}^{-1}\\).",
          "Peak emf: \\(\\varepsilon_0 = NBA\\omega = 50 \\times 0.2 \\times 0.1 \\times 100\\pi = 100\\pi \\approx 314\\) V.",
          "The coil starts face-on, so \\(\\varepsilon = 314\\sin(100\\pi t)\\) V.",
          "At \\(t = \\dfrac{1}{600}\\) s: \\(100\\pi t = \\dfrac{\\pi}{6}\\), and \\(\\sin\\dfrac{\\pi}{6} = \\dfrac{1}{2}\\), so \\(\\varepsilon = 157\\) V.",
        ],
        answer: "\\(\\varepsilon = 314\\sin(100\\pi t)\\) V; 157 V at t = 1/600 s",
      },
      selfCheckExample: {
        prompt: "The emf of a generator is \\(\\varepsilon = 220\\sin(100\\pi t)\\) V. Find its peak emf and the frequency of rotation of the coil.",
        steps: ["Peak emf: 220 V.", "\\(2\\pi\\nu = 100\\pi\\), so \\(\\nu = 50\\) Hz."],
        answer: "220 V; 50 Hz",
      },
      practiceSet: [
        { prompt: "In which position of the rotating coil is the induced emf zero?", answer: "When the plane of the coil is perpendicular to the field, where the flux is greatest" },
        { prompt: "Write the instantaneous emf of a generator in terms of the frequency of rotation ν.", answer: "\\(\\varepsilon = \\varepsilon_0\\sin 2\\pi\\nu t\\)" },
        { prompt: "The speed of rotation of a generator coil is doubled. What happens to the peak emf and the frequency?", answer: "Both are doubled" },
      ],
      pyqExampleId: "989518d8-9e93-49c2-99dd-646971887f87",
      traps: [
        {
          title: "Greatest emf at greatest flux",
          body: "The emf is greatest when the flux is zero (plane of the coil parallel to the field), because the flux is then changing fastest. At the greatest flux the emf is zero.",
        },
        {
          title: "Losing a minus sign",
          body: "\\(\\dfrac{d}{dt}(\\cos\\omega t) = -\\omega\\sin\\omega t\\). With the minus of Faraday's law the two cancel and give \\(+NBA\\omega\\sin\\omega t\\). Drop one and the sign of the answer is wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpei-generator-peak",
      name: "Peak emf: putting numbers into NBAω",
      intuition:
        "The peak emf is a product of four things: turns, field, area and angular speed. The arithmetic is easy; the marks are lost in the units. Turn revolutions per second or per minute into radians per second, cm² into m² and mT into T before you multiply.",
      definition:
        "- \\(\\varepsilon_0 = NBA\\omega\\), with \\(\\omega = 2\\pi\\nu\\) and \\(\\nu\\) in revolutions per second.\n" +
        "- 60 rpm is 1 rev/s, so \\(\\omega = 2\\pi\\) rad/s. Half a revolution per second gives \\(\\omega = \\pi\\) rad/s.\n" +
        "- The emf does not depend on the resistance of the coil; the resistance decides only the current the emf drives.\n" +
        "- The rms emf is \\(\\varepsilon_0/\\sqrt{2}\\), and the average power in a resistance R is \\(\\varepsilon_{rms}^2/R\\) (from the Alternating Current chapter).",
      formula: {
        label: "Peak emf",
        latex: "\\varepsilon_0 = NBA\\omega = NBA(2\\pi\\nu)",
      },
      authoredExample: {
        prompt: "A coil of 200 turns, each of area 150 cm², rotates at 1500 rpm in a uniform field of 0.08 T. Find the peak emf.",
        steps: [
          "Given: \\(N = 200\\), \\(A = 150 \\times 10^{-4} = 0.015\\ \\text{m}^2\\), \\(B = 0.08\\) T.",
          "1500 rpm is 25 rev/s, so \\(\\omega = 2\\pi \\times 25 = 50\\pi = 157.1\\ \\text{rad s}^{-1}\\).",
          "Formula: \\(\\varepsilon_0 = NBA\\omega\\).",
          "Substitution: \\(\\varepsilon_0 = 200 \\times 0.08 \\times 0.015 \\times 157.1 = 37.7\\) V.",
        ],
        answer: "About 37.7 V",
      },
      selfCheckExample: {
        prompt: "A coil of 40 turns and area 0.05 m² rotates at 10 rad/s in a uniform field of 0.3 T. Find the peak emf.",
        steps: ["\\(\\varepsilon_0 = NBA\\omega = 40 \\times 0.3 \\times 0.05 \\times 10\\).", "\\(\\varepsilon_0 = 6\\) V."],
        answer: "6 V",
      },
      practiceSet: [
        { prompt: "Convert 3000 rpm into rad/s.", answer: "\\(100\\pi \\approx 314\\) rad/s" },
        { prompt: "The number of turns of a generator coil is halved. What happens to the peak emf?", answer: "It is halved" },
        { prompt: "Does the peak emf of a generator depend on the resistance of its coil?", answer: "No" },
      ],
      pyqExampleId: "936da15f-5074-4c11-9d08-d5961bd48a06",
      traps: [
        {
          title: "Using rev/s as ω",
          body: "The formula needs radians per second. Leaving out the \\(2\\pi\\) gives an answer 6.28 times too small, and the board offers that wrong answer as an option.",
        },
        {
          title: "Area left in cm²",
          body: "Multiply cm² by \\(10^{-4}\\) to get m². A coil of 250 cm² has an area of 0.025 m².",
        },
      ],
    },
  ],
};
