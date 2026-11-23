import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_OS_ANGULAR_NOTE: SubtopicNote = {
  subtopicName: "Angular S.H.M. and Magnet Vibrating in a Magnetic Field",
  title: "Angular S.H.M. and a Magnet Vibrating in a Magnetic Field",
  oneLineDefinition:
    "Angular S.H.M. driven by a restoring torque, its differential equation and period, and the period of a bar magnet oscillating in a uniform magnetic field.",
  whyItMatters:
    "8 questions, two of them from board papers: write the differential equation of angular S.H.M. (2022) and obtain the period of a bar magnet vibrating in a uniform magnetic field (2026). The textbook adds proving that the magnet performs angular S.H.M., a twisted disc hung from a wire, and numericals on magnets that are timed or joined together.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpos-angular-shm",
      name: "Angular S.H.M. and its differential equation",
      intuition:
        "Angular S.H.M. is linear S.H.M. turned into rotation. In place of a displacement there is an angle, in place of a force a torque, and in place of mass the moment of inertia. A disc hung from a wire and twisted is the classic example: the twisted wire turns it back with a torque proportional to the twist.",
      definition:
        "- **Angular S.H.M.:** an oscillation about an axis in which the restoring torque is always directed towards the mean position and is directly proportional to the angular displacement: \\(\\tau \\propto -\\theta\\), so \\(\\tau = -c\\theta\\).\n" +
        "- c is the torque constant (torsion constant), in N m/rad.\n" +
        "- With \\(\\tau = I\\alpha = I\\dfrac{d^{2}\\theta}{dt^{2}}\\): \\(I\\dfrac{d^{2}\\theta}{dt^{2}} = -c\\theta\\), so \\(\\dfrac{d^{2}\\theta}{dt^{2}} = -\\dfrac{c}{I}\\theta\\).\n" +
        "- Put \\(\\omega^{2} = \\dfrac{c}{I}\\): \\(\\dfrac{d^{2}\\theta}{dt^{2}} + \\omega^{2}\\theta = 0\\). This is the **differential equation of angular S.H.M.**\n" +
        "- Period: \\(T = \\dfrac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\dfrac{I}{c}}\\).",
      formula: {
        label: "Angular S.H.M.",
        latex: "\\tau = -c\\theta, \\qquad \\frac{d^{2}\\theta}{dt^{2}} + \\omega^{2}\\theta = 0, \\qquad T = 2\\pi\\sqrt{\\frac{I}{c}}",
        symbols: [
          { symbol: "\\(c\\)", meaning: "torque constant, in N m/rad" },
          { symbol: "\\(I\\)", meaning: "moment of inertia about the axis of oscillation" },
          { symbol: "\\(\\theta\\)", meaning: "angular displacement from the mean position" },
        ],
      },
      authoredExample: {
        prompt:
          "A disc of moment of inertia \\(2 \\times 10^{-3}\\) kg m² hangs from a wire whose torque constant is \\(8 \\times 10^{-2}\\) N m/rad. Find the period of its angular oscillations and the restoring torque when it is twisted through 0.5 rad. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(I = 2 \\times 10^{-3}\\) kg m², \\(c = 8 \\times 10^{-2}\\) N m/rad, \\(\\theta = 0.5\\) rad.",
          "\\(T = 2\\pi\\sqrt{\\dfrac{I}{c}} = 6.284 \\times \\sqrt{\\dfrac{2 \\times 10^{-3}}{8 \\times 10^{-2}}} = 6.284 \\times \\sqrt{0.025} = 6.284 \\times 0.1581 = 0.994\\) s.",
          "\\(|\\tau| = c\\theta = 8 \\times 10^{-2} \\times 0.5 = 0.04\\) N m.",
        ],
        answer: "Period 0.994 s; restoring torque 0.04 N m",
      },
      selfCheckExample: {
        prompt: "In angular S.H.M., which quantity plays the part that mass plays in linear S.H.M.?",
        steps: ["In linear S.H.M., \\(F = ma\\); in angular S.H.M., \\(\\tau = I\\alpha\\).", "So the moment of inertia I takes the place of the mass."],
        answer: "The moment of inertia",
      },
      practiceSet: [
        { prompt: "What is the SI unit of the torque constant c?", answer: "N m/rad" },
        { prompt: "A body in angular S.H.M. has \\(\\omega^{2} = 25\\ \\text{s}^{-2}\\). Find its period.", answer: "\\(2\\pi/5 = 1.257\\) s" },
        { prompt: "The moment of inertia of a twisted disc is made four times as large, with the same wire. What happens to its period?", answer: "It doubles" },
      ],
      pyqExampleId: "28d83a85-e08c-4a3a-9c11-f5387a8343b3",
      traps: [
        {
          title: "Torque without the minus sign",
          body: "Write \\(\\tau = -c\\theta\\). The minus sign shows that the torque turns the body back towards the mean position.",
        },
        {
          title: "Mixing linear and angular symbols",
          body: "In angular S.H.M. use \\(\\theta\\), \\(\\tau\\), I and \\(\\alpha\\), not x, F, m and a. An equation in the wrong symbols does not answer the question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpos-magnet",
      name: "Magnet vibrating in a uniform magnetic field",
      intuition:
        "A compass needle nudged away from north swings back and forth before it settles. The field turns the magnet back with a torque that, for small angles, is proportional to the angle, so the magnet performs angular S.H.M. A stronger magnet or a stronger field gives a quicker swing; a magnet with a larger moment of inertia swings more slowly.",
      definition:
        "- A bar magnet of magnetic moment \\(\\mu\\) and moment of inertia I is free to turn in a uniform field B. Turned through a small angle \\(\\theta\\) from the field, it feels a restoring couple \\(\\tau = -\\mu B\\sin\\theta\\).\n" +
        "- For small \\(\\theta\\) in radian, \\(\\sin\\theta \\approx \\theta\\), so \\(\\tau = -\\mu B\\theta\\). The torque is proportional to the angle and opposite to it: angular S.H.M. with \\(c = \\mu B\\).\n" +
        "- \\(I\\dfrac{d^{2}\\theta}{dt^{2}} = -\\mu B\\theta\\), so \\(\\omega^{2} = \\dfrac{\\mu B}{I}\\) and \\(T = 2\\pi\\sqrt{\\dfrac{I}{\\mu B}}\\).\n" +
        "- **Conditions:** the field is uniform, the angular amplitude is small, and the suspension is twistless with negligible damping.\n" +
        "- Two magnets joined with like poles together act as one magnet of moment \\(\\mu_1 + \\mu_2\\); with unlike poles together, \\(\\mu_1 - \\mu_2\\).",
      formula: {
        label: "Period of a vibrating magnet",
        latex: "T = 2\\pi\\sqrt{\\frac{I}{\\mu B}}",
      },
      authoredExample: {
        prompt:
          "A magnet of moment of inertia \\(4 \\times 10^{-6}\\) kg m² and magnetic moment 2 A m² oscillates in a uniform field of \\(2 \\times 10^{-5}\\) T. Find its period and the number of oscillations it makes in one minute. (\\(\\pi = 3.142\\))",
        steps: [
          "Given: \\(I = 4 \\times 10^{-6}\\) kg m², \\(\\mu = 2\\) A m², \\(B = 2 \\times 10^{-5}\\) T.",
          "\\(\\mu B = 4 \\times 10^{-5}\\) N m, so \\(\\dfrac{I}{\\mu B} = 0.1\\ \\text{s}^{2}\\).",
          "\\(T = 2\\pi\\sqrt{0.1} = 6.284 \\times 0.3162 = 1.987\\) s.",
          "Oscillations in 60 s: \\(\\dfrac{60}{1.987} = 30.2\\), so about 30.",
        ],
        answer: "Period 1.987 s; about 30 oscillations a minute",
      },
      selfCheckExample: {
        prompt: "The magnetic field in which a magnet oscillates is made four times stronger. What happens to its period?",
        steps: ["\\(T \\propto \\dfrac{1}{\\sqrt{B}}\\).", "\\(\\sqrt{4} = 2\\), so the period is halved."],
        answer: "It is halved",
      },
      practiceSet: [
        { prompt: "Why must the angular amplitude be small for a magnet in a field to perform angular S.H.M.?", answer: "Only then is \\(\\sin\\theta \\approx \\theta\\), so the torque is proportional to the angle" },
        { prompt: "Two magnets of moments 5 A m² and 3 A m² are joined with unlike poles together. What is the combined magnetic moment?", answer: "2 A m²" },
        { prompt: "What is the torque constant of a magnet of moment \\(\\mu\\) in a uniform field B?", answer: "\\(\\mu B\\)" },
      ],
      pyqExampleId: "e2d2082a-1b97-41cc-94c9-b7c66017a094",
      traps: [
        {
          title: "Putting μB on top",
          body: "The moment of inertia goes on top: \\(T = 2\\pi\\sqrt{I/(\\mu B)}\\). A larger I means a slower swing.",
        },
        {
          title: "Leaving out the conditions",
          body: "When asked to prove that the magnet performs angular S.H.M., state the conditions: a uniform field and a small angular amplitude.",
        },
      ],
    },
  ],
};
