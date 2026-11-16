import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_EF_DIPOLE_NOTE: SubtopicNote = {
  subtopicName: "Electric Dipole",
  title: "Electric Dipole",
  oneLineDefinition:
    "A pair of equal and opposite charges a small distance apart: its dipole moment p = q × 2a, its field on the axis and the equatorial line, the torque and energy in a uniform field, and the net force in a non-uniform field.",
  whyItMatters:
    "Four NEET questions from 2021 to 2025, the most asked idea in this chapter. One asks how a dipole's field falls with distance (2022), one finds the charge from a measured torque (2023), one finds the change in energy when a dipole is turned through 60° (2025) and one asks which way a dipole moves in a non-uniform field (2021).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphef-dipole-field",
      name: "Dipole moment and the field of a dipole",
      intuition:
        "An electric dipole is a charge +q and a charge −q held a small distance 2a apart. Its total charge is zero, but its field is not, because the two charges are at slightly different distances from any point. Far away the two fields nearly cancel, so a dipole's field dies away faster than a single charge's: as one over r cubed instead of one over r squared.",
      definition:
        "- **Dipole moment:** \\(p = q \\times 2a\\), a vector pointing from −q to +q. Unit C m.\n" +
        "- On the **axis** of a short dipole (r much larger than a): \\(E = \\dfrac{2kp}{r^{3}}\\), pointing along \\(\\vec{p}\\).\n" +
        "- On the **equatorial line** (the perpendicular bisector): \\(E = \\dfrac{kp}{r^{3}}\\), pointing opposite to \\(\\vec{p}\\).\n" +
        "- At the same distance the axial field is twice the equatorial field.\n" +
        "- **Polar molecules** such as \\(\\text{H}_2\\text{O}\\) have a permanent dipole moment. Non-polar molecules get one only while a field acts on them.",
      formula: {
        label: "Dipole moment and field",
        latex: "p = q(2a), \\qquad E_{\\text{axial}} = \\frac{2kp}{r^{3}}, \\qquad E_{\\text{equatorial}} = \\frac{kp}{r^{3}}",
        symbols: [
          { symbol: "\\(2a\\)", meaning: "distance between the two charges" },
          { symbol: "\\(p\\)", meaning: "dipole moment, from −q to +q" },
          { symbol: "\\(r\\)", meaning: "distance from the centre of the dipole, much larger than a" },
        ],
      },
      authoredExample: {
        prompt:
          "A short dipole has moment \\(2 \\times 10^{-8}\\) C m. Find the field at a point on its axis 0.1 m from its centre.",
        steps: [
          "\\(E = \\dfrac{2kp}{r^{3}} = \\dfrac{2 \\times 9 \\times 10^{9} \\times 2 \\times 10^{-8}}{(0.1)^{3}}\\).",
          "\\(E = \\dfrac{360}{10^{-3}} = 3.6 \\times 10^{5}\\ \\text{N/C}\\), pointing along \\(\\vec{p}\\).",
        ],
        answer: "\\(3.6 \\times 10^{5}\\) N/C, along p",
      },
      selfCheckExample: {
        prompt:
          "The field of a short dipole at a point on its equatorial line, a distance r from its centre, is E. What is the field at a point on its axis a distance 2r from its centre?",
        steps: [
          "Axial field at 2r: \\(\\dfrac{2kp}{(2r)^{3}} = \\dfrac{2kp}{8r^{3}} = \\dfrac{1}{4} \\times \\dfrac{kp}{r^{3}}\\).",
          "And \\(\\dfrac{kp}{r^{3}} = E\\), so the axial field is \\(E/4\\).",
        ],
        answer: "\\(E/4\\)",
      },
      practiceSet: [
        { prompt: "Charges of +3 nC and −3 nC are 2 mm apart. Find the dipole moment.", answer: "\\(6 \\times 10^{-12}\\) C m" },
        { prompt: "At equal distances from a short dipole, what is the ratio of the axial field to the equatorial field?", answer: "2 : 1" },
        { prompt: "At a point on the equatorial line of a dipole, which way does the field point compared with the dipole moment?", answer: "Opposite to the dipole moment" },
        { prompt: "Does a polar molecule or a non-polar molecule have a permanent dipole moment?", answer: "A polar molecule" },
      ],
      pyqExampleId: "01b93348-cd55-47bd-b367-cf24ccf8b65d",
      traps: [
        {
          title: "A dipole's field falls as one over r cubed",
          body: "A single charge's field goes as \\(1/r^{2}\\), but a dipole's goes as \\(1/r^{3}\\). Doubling the distance cuts a dipole's field to one eighth.",
        },
        {
          title: "The dipole moment points from minus to plus",
          body: "\\(\\vec{p}\\) runs from −q to +q. Drawn the other way, every direction you find afterwards, for the field, the torque or the force, comes out reversed.",
        },
        {
          title: "The equatorial field is parallel to the axis",
          body: "On the equatorial line the field points opposite to \\(\\vec{p}\\), parallel to the dipole's axis. It does not point along the line from the point to the dipole's centre.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphef-torque",
      name: "Dipole in a uniform field: torque and energy",
      intuition:
        "In a uniform field the push on +q and the pull on −q are equal and opposite, so the dipole as a whole does not move. But the two forces act at different points, so they twist it, turning p to line up with E. Lined up with the field is the dipole's lowest energy; turned against the field is its highest, and turning it there takes work.",
      definition:
        "- Net force in a uniform field: zero.\n" +
        "- **Torque:** \\(\\vec{\\tau} = \\vec{p} \\times \\vec{E}\\), so \\(\\tau = pE\\sin\\theta\\). It is largest, pE, at 90° and zero at 0° and 180°.\n" +
        "- **Potential energy:** \\(U = -\\vec{p}\\cdot\\vec{E} = -pE\\cos\\theta\\). It is −pE at 0°, zero at 90° and +pE at 180°.\n" +
        "- At θ = 0° the dipole is in stable equilibrium; at θ = 180° it is in unstable equilibrium.\n" +
        "- **Work** to turn the dipole from \\(\\theta_1\\) to \\(\\theta_2\\): \\(W = U_2 - U_1 = pE(\\cos\\theta_1 - \\cos\\theta_2)\\).",
      formula: {
        label: "Torque and energy of a dipole",
        latex: "\\tau = pE\\sin\\theta, \\qquad U = -pE\\cos\\theta, \\qquad W = pE(\\cos\\theta_1 - \\cos\\theta_2)",
        symbols: [
          { symbol: "\\(\\theta\\)", meaning: "angle between the dipole moment and the field" },
          { symbol: "\\(U\\)", meaning: "potential energy of the dipole in the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A dipole of moment \\(4 \\times 10^{-9}\\) C m sits in a uniform field of \\(5 \\times 10^{4}\\) N/C. Find the largest torque it can feel, and the work needed to turn it from lined up with the field to pointing against it.",
        steps: [
          "Largest torque, at 90°: \\(\\tau = pE = 4 \\times 10^{-9} \\times 5 \\times 10^{4} = 2 \\times 10^{-4}\\ \\text{N m}\\).",
          "Work from 0° to 180°: \\(W = pE(\\cos 0^\\circ - \\cos 180^\\circ) = pE(1 + 1) = 2pE\\).",
          "\\(W = 2 \\times 2 \\times 10^{-4} = 4 \\times 10^{-4}\\ \\text{J}\\).",
        ],
        answer: "\\(2 \\times 10^{-4}\\) N m; \\(4 \\times 10^{-4}\\) J",
      },
      selfCheckExample: {
        prompt:
          "A dipole in a uniform field feels a torque of \\(8 \\times 10^{-3}\\) N m when it is at right angles to the field. What torque does it feel at 30° to the field?",
        steps: [
          "At 90°, \\(\\tau = pE = 8 \\times 10^{-3}\\ \\text{N m}\\).",
          "At 30°, \\(\\tau = pE\\sin 30^\\circ = 8 \\times 10^{-3} \\times \\dfrac{1}{2} = 4 \\times 10^{-3}\\ \\text{N m}\\).",
        ],
        answer: "\\(4 \\times 10^{-3}\\) N m",
      },
      practiceSet: [
        { prompt: "What is the net force on an electric dipole in a uniform electric field?", answer: "Zero" },
        { prompt: "At what angle between the dipole moment and a uniform field is the torque on the dipole largest?", answer: "90°" },
        { prompt: "In which position is a dipole in stable equilibrium in a uniform field?", answer: "With its dipole moment along the field (θ = 0°)" },
        { prompt: "What is the potential energy of a dipole whose moment is at right angles to a uniform field?", answer: "Zero" },
      ],
      pyqExampleId: "a7d3df20-a3e6-4285-8df3-6949c7798ffe",
      traps: [
        {
          title: "No net force, but a torque",
          body: "A uniform field turns a dipole without moving it as a whole. The net force is zero while the torque is \\(pE\\sin\\theta\\).",
        },
        {
          title: "Sine for torque, cosine for energy",
          body: "Torque is \\(pE\\sin\\theta\\) and energy is \\(-pE\\cos\\theta\\). Mixing them up gives zero torque at 90°, where it is actually largest.",
        },
        {
          title: "The energy is lowest when lined up, not at 90°",
          body: "\\(U = -pE\\cos\\theta\\) is −pE at 0°, the minimum, and zero at 90°. The work to turn a dipole is the change in U, not U at the final angle.",
        },
        {
          title: "The length in p is the full separation, in metres",
          body: "In \\(p = q \\times 2a\\) the length is the whole distance between the two charges. Turn centimetres into metres before dividing to find q.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphef-nonuniform",
      name: "Dipole in a non-uniform field",
      intuition:
        "If the field is stronger at one end of the dipole than at the other, the two forces no longer cancel. The charge sitting in the stronger field wins, so the dipole is pulled bodily one way. This is why a charged comb picks up bits of paper: the comb makes each bit a small dipole lined up with its field, and the field is stronger nearer the comb.",
      definition:
        "- In a non-uniform field the forces on +q and −q differ, so the net force is not zero.\n" +
        "- Measured along the field, the net force is \\(q(E_{+} - E_{-})\\), where \\(E_{+}\\) and \\(E_{-}\\) are the field strengths at +q and at −q.\n" +
        "- With \\(\\vec{p}\\) along the field, the dipole is pulled towards the stronger field.\n" +
        "- With \\(\\vec{p}\\) against the field, the dipole is pushed towards the weaker field.\n" +
        "- Either way the dipole moves the way its potential energy \\(U = -\\vec{p}\\cdot\\vec{E}\\) falls.",
      formula: {
        label: "Net force on a dipole along the field",
        latex: "F_{\\text{net}} = q\\,(E_{+} - E_{-})",
        symbols: [
          { symbol: "\\(E_{+}\\)", meaning: "field strength where the positive charge sits" },
          { symbol: "\\(E_{-}\\)", meaning: "field strength where the negative charge sits" },
        ],
      },
      authoredExample: {
        prompt:
          "A dipole lies along the x axis with its moment pointing along +x. The field also points along +x and gets stronger as x increases. Which way is the net force on the dipole?",
        steps: [
          "\\(\\vec{p}\\) points from −q to +q, so +q is the end at larger x, where the field is stronger: \\(E_{+} > E_{-}\\).",
          "The force on +q is along +x and the force on −q is along −x, and the first is larger.",
          "So the net force \\(q(E_{+} - E_{-})\\) is along +x, towards the stronger field.",
        ],
        answer: "Along +x, towards the stronger field",
      },
      selfCheckExample: {
        prompt: "Why does a charged comb attract small pieces of uncharged paper?",
        steps: [
          "The comb's field pulls the charges in each piece slightly apart, making it a small dipole lined up with the field.",
          "The field is stronger near the comb, so the end nearer the comb feels the larger force.",
          "A dipole along a non-uniform field is pulled towards the stronger field, that is towards the comb.",
        ],
        answer: "The paper becomes a dipole in the comb's non-uniform field and is pulled towards the stronger field",
      },
      practiceSet: [
        { prompt: "Is the net force on an electric dipole zero in a non-uniform field?", answer: "No" },
        { prompt: "A dipole's moment points along a non-uniform field. Is it pulled towards the stronger or the weaker field?", answer: "Towards the stronger field" },
        { prompt: "Write the net force along the field on a dipole whose +q sits where the field is \\(E_{+}\\) and whose −q sits where it is \\(E_{-}\\).", answer: "\\(q(E_{+} - E_{-})\\)" },
        { prompt: "A dipole is released at an angle to a uniform field. Does it move along the field or only turn?", answer: "It only turns; the net force is zero" },
      ],
      pyqExampleId: "9bae0a4e-e384-41d1-9938-0a5b06d0f160",
      traps: [
        {
          title: "A net force needs a non-uniform field",
          body: "In a uniform field a dipole only turns. A dipole moves as a whole only where the field is stronger at one end than at the other.",
        },
        {
          title: "Find which charge is in the stronger field",
          body: "The direction of \\(\\vec{p}\\) alone does not fix the force. Find where +q sits, compare the field at its end with the field at −q's end, and the charge in the stronger field decides the direction.",
        },
      ],
    },
  ],
};
