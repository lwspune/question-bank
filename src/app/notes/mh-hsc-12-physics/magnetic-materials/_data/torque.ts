import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MM_TORQUE_NOTE: SubtopicNote = {
  subtopicName: "Torque on a Magnetic Dipole",
  title: "Torque on a Bar Magnet and Its Oscillations",
  oneLineDefinition:
    "The torque and potential energy of a bar magnet in a uniform magnetic field, and the period of a magnet that oscillates about the field direction.",
  whyItMatters:
    "9 questions. Three were set in board papers: derive the period of a bar magnet oscillating in a uniform field (2025), find a magnet's moment from its period in the earth's field (2024), and find the field from the period of a block-shaped magnet (2023). The textbook adds the torque and work on a magnet turned in a field, a needle held level by a small weight, and a magnet broken into two halves.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmm-torque-energy",
      name: "Torque and potential energy of a magnet in a field",
      intuition:
        "A field pulls the north pole one way and the south pole the other way. The two forces act along different lines, so they form a couple that turns the magnet towards the field. Turning the magnet away from the field takes work, and that work is stored as potential energy, just like lifting a stone stores energy.",
      definition:
        "- **Torque:** a magnet of dipole moment \\(m\\) at an angle \\(\\theta\\) to a uniform field \\(B\\) feels \\(\\tau = mB\\sin\\theta\\), or \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\).\n" +
        "- **Potential energy:** \\(U_m = -mB\\cos\\theta\\).\n" +
        "- \\(\\theta = 0^\\circ\\): \\(U_m = -mB\\), the least energy, the **most stable** position (m parallel to B).\n" +
        "- \\(\\theta = 90^\\circ\\): \\(U_m = 0\\), magnet perpendicular to the field.\n" +
        "- \\(\\theta = 180^\\circ\\): \\(U_m = +mB\\), the greatest energy, the **most unstable** position (m antiparallel to B).\n" +
        "- **Work** to turn the magnet from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = U_2 - U_1 = mB(\\cos\\theta_1 - \\cos\\theta_2)\\).",
      formula: {
        label: "Torque, energy and work",
        latex: "\\tau = mB\\sin\\theta, \\qquad U_m = -mB\\cos\\theta, \\qquad W = mB(\\cos\\theta_1 - \\cos\\theta_2)",
        symbols: [
          { symbol: "\\(m\\)", meaning: "magnetic dipole moment of the magnet, in A m²" },
          { symbol: "\\(B\\)", meaning: "uniform magnetic field, in tesla" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the magnet's moment and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A bar magnet of magnetic moment 2.5 A m² is placed in a uniform magnetic field of 0.2 T with its axis at 60° to the field. Find (a) the torque on it, (b) its potential energy, and (c) the work needed to turn it from the field direction to a position perpendicular to the field.",
        steps: [
          "Given: \\(m = 2.5\\) A m², \\(B = 0.2\\) T, \\(\\theta = 60^\\circ\\).",
          "(a) \\(\\tau = mB\\sin\\theta = 2.5 \\times 0.2 \\times \\sin 60^\\circ = 0.5 \\times 0.866 = 0.433\\) N m.",
          "(b) \\(U_m = -mB\\cos\\theta = -0.5 \\times 0.5 = -0.25\\) J.",
          "(c) \\(W = mB(\\cos 0^\\circ - \\cos 90^\\circ) = 0.5 \\times (1 - 0) = 0.5\\) J.",
        ],
        answer: "(a) 0.433 N m (b) −0.25 J (c) 0.5 J",
      },
      selfCheckExample: {
        prompt:
          "A magnet of moment 0.5 A m² sits in a field of 0.04 T at 60° to the field. How much work is needed to turn it to the position where its moment points opposite to the field?",
        steps: [
          "\\(W = mB(\\cos 60^\\circ - \\cos 180^\\circ) = 0.5 \\times 0.04 \\times (0.5 + 1)\\).",
          "\\(W = 0.02 \\times 1.5 = 0.03\\) J.",
        ],
        answer: "0.03 J",
      },
      practiceSet: [
        { prompt: "A magnet of moment 2 A m² is at 30° to a field of 0.05 T. Find the torque on it.", answer: "0.05 N m" },
        { prompt: "In which position does a bar magnet in a uniform field have the least potential energy?", answer: "With its moment parallel to the field, \\(\\theta = 0^\\circ\\), where \\(U_m = -mB\\)" },
        { prompt: "What is the potential energy of a magnet held perpendicular to a uniform field?", answer: "Zero" },
        { prompt: "What is the torque on a magnet whose axis lies along the field?", answer: "Zero, since \\(\\sin 0^\\circ = 0\\)" },
      ],
      pyqExampleId: "4c8c6884-0f35-4fbe-b9fe-f19f6ca32777",
      traps: [
        {
          title: "Using the torque formula for work",
          body: "Work is the change in potential energy, \\(mB(\\cos\\theta_1 - \\cos\\theta_2)\\). Writing \\(mB\\sin\\theta\\) for work mixes up a torque (N m) with an energy (J).",
        },
        {
          title: "Leaving the field in gauss",
          body: "\\(1\\) gauss \\(= 10^{-4}\\) T. Convert before you substitute, or the answer is off by ten thousand.",
        },
        {
          title: "Swapping stable and unstable",
          body: "Parallel (\\(\\theta = 0^\\circ\\)) is the most stable, with the least energy \\(-mB\\). Antiparallel (\\(\\theta = 180^\\circ\\)) is the most unstable, with \\(+mB\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-shm-derivation",
      name: "Period of a magnet oscillating in a field (derivation)",
      intuition:
        "Push a freely hung magnet a little away from the field and let go. The field's torque pulls it back, it overshoots, and it swings to and fro. For small swings the pull back grows in step with the angle, which is exactly the rule for simple harmonic motion, so the magnet keeps a steady period like a pendulum.",
      definition:
        "Board answer, one step a line (textbook labelling):\n" +
        "- A magnet of moment \\(m\\) and moment of inertia \\(I\\) hangs in a uniform field \\(B\\). It is turned through a small angle \\(\\theta\\) and released.\n" +
        "- Restoring torque: \\(\\tau = -mB\\sin\\theta\\). The minus sign shows it acts back towards the field.\n" +
        "- Equation of rotation: \\(\\tau = I\\dfrac{d^2\\theta}{dt^2}\\), so \\(I\\dfrac{d^2\\theta}{dt^2} = -mB\\sin\\theta\\).\n" +
        "- For small \\(\\theta\\) in radian, \\(\\sin\\theta \\approx \\theta\\): \\(\\dfrac{d^2\\theta}{dt^2} = -\\left(\\dfrac{mB}{I}\\right)\\theta\\).\n" +
        "- Angular acceleration is proportional to angular displacement and opposite to it, so the motion is **angular S.H.M.**\n" +
        "- Comparing with \\(\\dfrac{d^2\\theta}{dt^2} = -\\omega^2\\theta\\): \\(\\omega = \\sqrt{\\dfrac{mB}{I}}\\).\n" +
        "- Period: \\(T = \\dfrac{2\\pi}{\\omega} = 2\\pi\\sqrt{\\dfrac{I}{mB}}\\).\n" +
        "- This is the principle of the **vibration magnetometer**, used to compare magnetic moments and to find the earth's horizontal field.",
      formula: {
        label: "Period of angular oscillations",
        latex: "T = 2\\pi\\sqrt{\\frac{I}{mB}}",
        symbols: [
          { symbol: "\\(I\\)", meaning: "moment of inertia of the magnet about the axis of suspension, in kg m²" },
          { symbol: "\\(m\\)", meaning: "magnetic dipole moment, in A m²" },
          { symbol: "\\(B\\)", meaning: "uniform magnetic field, in tesla" },
        ],
      },
      authoredExample: {
        prompt:
          "A magnet oscillates with a period of 2 s in a uniform magnetic field. The field is made four times as strong. Find the new period.",
        steps: [
          "Given: \\(T_1 = 2\\) s, \\(B_2 = 4B_1\\); \\(I\\) and \\(m\\) are unchanged.",
          "Formula: \\(T = 2\\pi\\sqrt{I/(mB)}\\), so \\(T \\propto \\dfrac{1}{\\sqrt{B}}\\).",
          "\\(\\dfrac{T_2}{T_1} = \\sqrt{\\dfrac{B_1}{B_2}} = \\sqrt{\\dfrac{1}{4}} = \\dfrac{1}{2}\\).",
          "\\(T_2 = 2 \\times \\dfrac{1}{2} = 1\\) s.",
        ],
        answer: "1 s",
      },
      selfCheckExample: {
        prompt:
          "Two magnets have the same moment of inertia. The moment of the first is four times that of the second. In the same field, what is the ratio of their periods?",
        steps: ["\\(T \\propto \\dfrac{1}{\\sqrt{m}}\\).", "\\(\\dfrac{T_1}{T_2} = \\sqrt{\\dfrac{m_2}{m_1}} = \\sqrt{\\dfrac{1}{4}} = \\dfrac{1}{2}\\)."],
        answer: "1 : 2",
      },
      practiceSet: [
        { prompt: "Which approximation turns the magnet's equation of motion into simple harmonic motion?", answer: "\\(\\sin\\theta \\approx \\theta\\) for a small angle measured in radian" },
        { prompt: "Write the angular frequency of a magnet oscillating in a uniform field.", answer: "\\(\\omega = \\sqrt{mB/I}\\)" },
        { prompt: "Name the instrument that works on the oscillation of a freely suspended magnet in a field.", answer: "The vibration magnetometer" },
        { prompt: "Does the period of small oscillations of the magnet depend on how far it is first turned?", answer: "No. The period has no amplitude in it" },
      ],
      pyqExampleId: "d0503b95-8109-43f4-810b-c6b5e33960bf",
      traps: [
        {
          title: "Dropping the condition of small angles",
          body: "The motion is S.H.M. only because \\(\\sin\\theta \\approx \\theta\\) for small \\(\\theta\\). Leave out this step and the derivation loses a mark.",
        },
        {
          title: "Not stating why it is S.H.M.",
          body: "Write the reason in words: the angular acceleration is directly proportional to the angular displacement and directed opposite to it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscpmm-oscillation-calc",
      name: "Sums on the period of an oscillating magnet",
      intuition:
        "Every sum here is the same formula, rearranged for whatever is missing. Most of the marks are lost on units: moments of inertia come in g cm², fields in gauss, and periods are hidden inside 'so many oscillations in so many seconds'.",
      definition:
        "- Rearranged forms: \\(m = \\dfrac{4\\pi^2 I}{T^2 B}\\) and \\(B = \\dfrac{4\\pi^2 I}{T^2 m}\\).\n" +
        "- Period from a count: \\(T = \\dfrac{\\text{time}}{\\text{number of oscillations}}\\). Ten oscillations a minute gives \\(T = 6\\) s.\n" +
        "- Units: \\(1\\) g cm² \\(= 10^{-3}\\) kg \\(\\times 10^{-4}\\) m² \\(= 10^{-7}\\) kg m²; \\(1\\) gauss \\(= 10^{-4}\\) T.\n" +
        "- In the earth's field use its horizontal component \\(B_H\\), because the magnet swings in a horizontal plane.\n" +
        "- **Board 2023** gave the magnet as a block of mass M with sides l and b horizontal and h vertical. It turns about the vertical axis, so \\(I = \\dfrac{M(l^2 + b^2)}{12}\\). This chapter of the present textbook does not give that formula, so learn it but give it less time.",
      formula: {
        label: "Period rearranged",
        latex: "m = \\frac{4\\pi^2 I}{T^2 B}, \\qquad B = \\frac{4\\pi^2 I}{T^2 m}",
      },
      authoredExample: {
        prompt:
          "A bar magnet of moment of inertia 400 g cm² and magnetic moment 0.4 A m² oscillates in a uniform field of 0.01 T. Find its period and the number of oscillations it makes in one minute.",
        steps: [
          "Given: \\(I = 400\\) g cm² \\(= 400 \\times 10^{-7} = 4 \\times 10^{-5}\\) kg m², \\(m = 0.4\\) A m², \\(B = 0.01\\) T.",
          "Formula: \\(T = 2\\pi\\sqrt{\\dfrac{I}{mB}}\\).",
          "Substitution: \\(\\dfrac{I}{mB} = \\dfrac{4 \\times 10^{-5}}{0.4 \\times 0.01} = 0.01\\) s², so \\(T = 2\\pi \\times 0.1 = 0.628\\) s.",
          "Oscillations in one minute: \\(\\dfrac{60}{0.628} = 95.5\\), about 95.",
        ],
        answer: "Period 0.628 s; about 95 oscillations a minute",
      },
      selfCheckExample: {
        prompt:
          "A magnet of moment of inertia \\(1 \\times 10^{-4}\\) kg m² and magnetic moment 1 A m² makes 20 oscillations in 40 s in a uniform field. Find the field.",
        steps: [
          "\\(T = \\dfrac{40}{20} = 2\\) s.",
          "\\(B = \\dfrac{4\\pi^2 I}{T^2 m} = \\dfrac{39.48 \\times 10^{-4}}{4 \\times 1} = 9.87 \\times 10^{-4}\\) T.",
        ],
        answer: "\\(9.87 \\times 10^{-4}\\) T",
      },
      practiceSet: [
        { prompt: "Convert a moment of inertia of 800 g cm² into kg m².", answer: "\\(8 \\times 10^{-5}\\) kg m²" },
        { prompt: "Convert a field of 0.36 gauss into tesla.", answer: "\\(3.6 \\times 10^{-5}\\) T" },
        { prompt: "A magnet makes 15 oscillations in 45 s. What is its period?", answer: "3 s" },
        { prompt: "Rearrange \\(T = 2\\pi\\sqrt{I/(mB)}\\) for the magnetic moment.", answer: "\\(m = 4\\pi^2 I/(T^2 B)\\)" },
      ],
      pyqExampleId: "78629152-526c-404a-b2c8-97627def5424",
      traps: [
        {
          title: "Turning the count upside down",
          body: "The period is time divided by the number of oscillations. Ten oscillations a minute is a period of 6 s, not \\(1/6\\) s.",
        },
        {
          title: "Forgetting to square the period",
          body: "The formula needs \\(T^2\\). Using \\(T\\) alone gives a wrong moment or field even when every unit is right.",
        },
        {
          title: "Using the wrong edges for a block magnet",
          body: "For a block turning about its vertical edge h, only the two horizontal edges enter: \\(I = M(l^2 + b^2)/12\\). The edge along the axis does not.",
        },
      ],
    },
  ],
};
