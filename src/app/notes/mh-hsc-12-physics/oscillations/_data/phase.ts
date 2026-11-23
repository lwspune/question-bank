import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_PHASE_NOTE: SubtopicNote = {
  subtopicName: "Reference Circle, Phase and Graphical Representation",
  title: "Reference Circle, Phase and Graphs of S.H.M.",
  oneLineDefinition:
    "Linear S.H.M. as the projection of uniform circular motion on a diameter, what the phase of an S.H.M. tells you, and the graphs of displacement, velocity and acceleration.",
  whyItMatters:
    "7 questions, two of them from board papers: define linear S.H.M. and show that it is the projection of a U.C.M. on any diameter (2016), and the phase difference between displacement and acceleration (2018). The textbook adds describing the state of a particle from its phase, finding a phase angle, and drawing the three graphs.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-reference-circle",
      name: "S.H.M. as the projection of U.C.M.",
      intuition:
        "Watch a ball going round a circle at constant speed from the side, edge on. Its shadow moves to and fro along a straight line, fast in the middle and slow at the ends. That shadow is doing S.H.M. The radius of the circle is the amplitude, and the angular speed of the ball is the angular frequency.",
      definition:
        "- A particle P moves anticlockwise round a circle of radius A and centre O with a constant angular speed \\(\\omega\\) (U.C.M.). This circle is the **reference circle**.\n" +
        "- At \\(t = 0\\) the radius OP makes an angle \\(\\phi\\) with the X axis. After time t, \\(\\angle POX = \\omega t + \\phi\\).\n" +
        "- N is the foot of the perpendicular from P on the Y axis, a diameter. In triangle ONP: \\(y = ON = A\\sin(\\omega t + \\phi)\\).\n" +
        "- Differentiating twice: \\(\\dfrac{d^{2}y}{dt^{2}} = -A\\omega^{2}\\sin(\\omega t + \\phi) = -\\omega^{2}y\\).\n" +
        "- The acceleration of N is proportional to its displacement and directed towards O, so N performs linear S.H.M. The projection on the X axis, \\(x = A\\cos(\\omega t + \\phi)\\), gives S.H.M. too, and the axes can be any pair of perpendicular diameters. So the result holds for **any diameter**.\n" +
        "- Draw the reference circle with P, N, O and the angle marked.",
      formula: {
        label: "Projection on a diameter",
        latex: "y = A\\sin(\\omega t + \\phi), \\qquad \\frac{d^{2}y}{dt^{2}} = -\\omega^{2}y",
      },
      authoredExample: {
        prompt:
          "A particle goes round a circle of radius 5 cm at 2 revolutions per second. Its projection on a diameter performs S.H.M. Find the amplitude, the period and the maximum speed of the projection.",
        steps: [
          "Given: radius \\(= 5\\) cm, \\(n = 2\\) Hz.",
          "Amplitude = radius of the reference circle: \\(A = 5\\) cm.",
          "Period: \\(T = \\dfrac{1}{n} = 0.5\\) s. Angular frequency: \\(\\omega = 2\\pi n = 4\\pi = 12.57\\) rad/s.",
          "Maximum speed: \\(v_{\\max} = A\\omega = 5 \\times 12.57 = 62.83\\) cm/s.",
        ],
        answer: "Amplitude 5 cm, period 0.5 s, maximum speed 62.8 cm/s",
      },
      selfCheckExample: {
        prompt:
          "The radius of a reference circle is 8 cm, and the particle on it takes 4 s for one revolution, starting on the X axis. Write the displacement of its projection on the Y axis.",
        steps: ["\\(A = 8\\) cm, \\(\\omega = \\dfrac{2\\pi}{4} = \\dfrac{\\pi}{2}\\) rad/s, \\(\\phi = 0\\).", "\\(y = A\\sin(\\omega t + \\phi) = 8\\sin\\dfrac{\\pi t}{2}\\) cm."],
        answer: "\\(y = 8\\sin(\\pi t/2)\\) cm",
      },
      practiceSet: [
        { prompt: "What is the amplitude of the S.H.M. of the projection, in terms of the reference circle?", answer: "The radius of the reference circle" },
        { prompt: "How is the angular frequency of the S.H.M. related to the circular motion?", answer: "It equals the constant angular speed of the particle on the circle" },
        { prompt: "Does the projection of a U.C.M. on a diameter move fastest at the centre or at the ends?", answer: "At the centre, the mean position" },
      ],
      pyqExampleId: "780dfe98-693d-4b42-a274-4d1d1cba39a9",
      traps: [
        {
          title: "Projecting on one diameter only",
          body: "The question says 'any diameter'. After the Y axis, show that the X axis projection \\(x = A\\cos(\\omega t + \\phi)\\) also gives S.H.M., and say that the axes can be any pair of perpendicular diameters.",
        },
        {
          title: "No diagram",
          body: "Draw the reference circle with P, N, O and the angle \\(\\omega t + \\phi\\) marked. A proof without the figure leaves the reader to guess what N and the angle are.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-phase",
      name: "Phase of S.H.M.",
      intuition:
        "The phase is the angle (ωt + φ) inside the sine. It tells you the state of the particle: where it is and which way it is moving. Every 2π of phase is one full oscillation, so take away whole multiples of 360° to find which oscillation the particle is in and where.",
      definition:
        "- **Phase:** the angle \\(\\theta = \\omega t + \\phi\\) in \\(x = A\\sin(\\omega t + \\phi)\\). It gives the state of oscillation: the position and the direction of motion.\n" +
        "- **Epoch (initial phase):** \\(\\phi\\), the phase at \\(t = 0\\).\n" +
        "- In one oscillation, starting at the mean position and moving to the positive side: phase 0 to \\(\\pi/2\\), mean to positive extreme; \\(\\pi/2\\) to \\(\\pi\\), back to the mean; \\(\\pi\\) to \\(3\\pi/2\\), out to the negative extreme; \\(3\\pi/2\\) to \\(2\\pi\\), back to the mean.\n" +
        "- A phase of \\(2\\pi k + \\theta_1\\) means the particle is in its \\((k + 1)\\)th oscillation, in the state given by \\(\\theta_1\\).",
      formula: {
        label: "Phase",
        latex: "\\theta = \\omega t + \\phi, \\qquad x = A\\sin\\theta",
      },
      authoredExample: {
        prompt: "Describe the state of oscillation of a particle in S.H.M. whose phase angle is 870°.",
        steps: [
          "\\(870^{\\circ} = 2 \\times 360^{\\circ} + 150^{\\circ}\\). Two oscillations are complete, so the particle is in its third oscillation.",
          "\\(x = A\\sin 150^{\\circ} = \\dfrac{A}{2}\\).",
          "\\(150^{\\circ}\\) lies between \\(90^{\\circ}\\) and \\(180^{\\circ}\\), so the particle has passed the positive extreme and is moving back towards the mean position.",
        ],
        answer: "In its third oscillation, at +A/2, moving towards the mean position",
      },
      selfCheckExample: {
        prompt: "Find the displacement of a particle in S.H.M. of amplitude 4 cm when its phase is \\(7\\pi/6\\).",
        steps: ["\\(7\\pi/6 = 210^{\\circ}\\).", "\\(x = 4\\sin 210^{\\circ} = 4 \\times (-0.5) = -2\\) cm."],
        answer: "\\(-2\\) cm, that is 2 cm on the negative side",
      },
      practiceSet: [
        { prompt: "A particle started with phase 0. How many complete oscillations has it made when its phase is \\(6\\pi\\) rad?", answer: "Three" },
        { prompt: "What name is given to the initial phase of an S.H.M.?", answer: "Epoch" },
        { prompt: "A particle has phase \\(\\pi\\) rad. Where is it, and which way is it moving?", answer: "At the mean position, moving towards the negative extreme" },
      ],
      pyqExampleId: "fb62adf9-c025-44b5-bb5d-04a2b830bcc0",
      traps: [
        {
          title: "Ignoring the direction of motion",
          body: "Two phases in one oscillation give the same displacement: \\(\\pi/6\\) and \\(5\\pi/6\\) both give \\(A/2\\). The direction of motion decides which one is meant.",
        },
        {
          title: "Miscounting the oscillation",
          body: "A phase of \\(2 \\times 360^{\\circ} + \\theta\\) is in the third oscillation, not the second: two full oscillations are already complete.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpos-graphs",
      name: "Graphs of displacement, velocity and acceleration",
      intuition:
        "Plot x, v and a against the phase angle and you get three wave shapes with the same period. The velocity curve peaks where the displacement curve crosses zero, and the acceleration curve is the displacement curve turned upside down. That is the phase story told as a picture.",
      definition:
        "- For a particle starting from the mean position: \\(x = A\\sin\\theta\\), \\(v = A\\omega\\cos\\theta\\), \\(a = -A\\omega^{2}\\sin\\theta\\), where \\(\\theta = \\omega t\\).\n" +
        "- Velocity leads displacement by \\(\\pi/2\\) rad. Acceleration leads velocity by a further \\(\\pi/2\\) rad, so acceleration and displacement differ in phase by \\(\\pi\\) rad.\n" +
        "- Starting from the positive extreme shifts every curve by \\(\\pi/2\\) along the phase axis. The shapes, the maximum values and the phase differences do not change.\n" +
        "- Draw the three graphs one below the other on the same phase axis, with \\(0, \\pi/2, \\pi, 3\\pi/2, 2\\pi\\) marked and the peak values labelled.",
      table: {
        columns: ["Phase angle", "Displacement", "Velocity", "Acceleration"],
        rows: [
          { cells: ["\\(0\\)", "\\(0\\)", "\\(+A\\omega\\)", "\\(0\\)"] },
          {
            cells: ["\\(\\pi/2\\)", "\\(+A\\)", "\\(0\\)", "\\(-A\\omega^{2}\\)"],
            pyqExampleId: "833656e1-d8a8-4a9e-9e38-eaaa7499d368",
            noteAmber: "Board 2018 asked the phase difference between displacement and acceleration: π rad.",
          },
          { cells: ["\\(\\pi\\)", "\\(0\\)", "\\(-A\\omega\\)", "\\(0\\)"] },
          { cells: ["\\(3\\pi/2\\)", "\\(-A\\)", "\\(0\\)", "\\(+A\\omega^{2}\\)"] },
          { cells: ["\\(2\\pi\\)", "\\(0\\)", "\\(+A\\omega\\)", "\\(0\\)"] },
        ],
        caption: "A particle starting from the mean position. The acceleration always has the opposite sign to the displacement.",
      },
      pyqExampleId: "833656e1-d8a8-4a9e-9e38-eaaa7499d368",
      selfCheckExample: {
        prompt: "For a particle starting from the mean position, at which phase angles in one oscillation is its velocity zero?",
        steps: ["\\(v = A\\omega\\cos\\theta\\) is zero where \\(\\cos\\theta = 0\\).", "That is at \\(\\theta = \\pi/2\\) and \\(3\\pi/2\\), the two extreme positions."],
        answer: "\\(\\pi/2\\) and \\(3\\pi/2\\), at the extreme positions",
      },
      practiceSet: [
        { prompt: "By how much does the velocity of a particle in S.H.M. lead its displacement?", answer: "\\(\\pi/2\\) rad" },
        { prompt: "A particle in S.H.M. starts from the mean position. What is its speed at \\(t = T/2\\)?", answer: "Maximum, \\(A\\omega\\), since it is back at the mean position" },
        { prompt: "How do the graphs change if the particle starts from the positive extreme instead of the mean position?", answer: "Every curve shifts by \\(\\pi/2\\) along the phase axis; shapes and maxima stay the same" },
      ],
      traps: [
        {
          title: "Drawing acceleration in step with displacement",
          body: "Acceleration is \\(-\\omega^{2}x\\), so its graph is the displacement graph flipped upside down. Drawing the two in step is wrong.",
        },
        {
          title: "Graphs without values",
          body: "Mark the peak values \\(A\\), \\(A\\omega\\) and \\(A\\omega^{2}\\) and label the phase points on the axis. A bare wave shape earns little.",
        },
      ],
    },
  ],
};
