import type { SubtopicNote } from "@/app/notes/_types";

export const CB_PH_MC_TORQUE_NOTE: SubtopicNote = {
  subtopicName: "Torque on a Current Loop and Magnetic Dipole",
  title: "Torque on a Current Loop and the Magnetic Dipole",
  oneLineDefinition:
    "The torque on a current loop in a uniform magnetic field, the magnetic moment of a loop and a loop as a magnetic dipole, and the magnetic moment of an electron going round a nucleus.",
  whyItMatters:
    "29 questions, twenty-four of them from board papers. The board asks you to derive the torque on a rectangular loop in vector form (2024, 2025, 2026), find the torque on a coil set at an angle to the field (2025, 2026), compare the magnetic moments of loops bent from the same wire (2023, 2026), explain why a current loop is a magnetic dipole and find its stable position (2025) and find the magnetic moment of a revolving electron (2023, 2024, 2025). The textbook adds torque numericals on coils.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbpmc-loop-torque",
      name: "Torque on a current loop in a uniform field",
      intuition:
        "Two sides of the loop are pushed one way and the other two sides are pushed the other way. In a uniform field these pushes cancel as forces, but the two that are not in line form a couple that turns the loop until its face is square to the field.",
      definition:
        "- **Set-up:** a rectangular loop ABCD with AB = CD = b and BC = DA = a carries current I in a uniform field \\(\\vec{B}\\). θ is the angle between \\(\\vec{B}\\) and the normal to the loop.\n" +
        "- **Step 1:** the forces on BC and DA are equal, opposite and along the same line, so they cancel and give no torque.\n" +
        "- **Step 2:** AB and CD stay at right angles to \\(\\vec{B}\\), so each feels \\(F_1 = F_2 = IbB\\), equal and opposite but not along the same line: a couple. So the net force is zero but there is a torque.\n" +
        "- **Step 3:** the arm of each force about the axis is \\(\\dfrac{a}{2}\\sin\\theta\\): \\(\\tau = F_1\\dfrac{a}{2}\\sin\\theta + F_2\\dfrac{a}{2}\\sin\\theta = IabB\\sin\\theta = IAB\\sin\\theta\\).\n" +
        "- **Step 4:** with the magnetic moment \\(\\vec{m} = I\\vec{A}\\) (along the area vector, by the right-hand thumb rule), \\(\\vec{\\tau} = \\vec{m} \\times \\vec{B}\\). For N turns, \\(m = NIA\\) and \\(\\tau = NIAB\\sin\\theta\\).\n" +
        "- The torque is largest, NIAB, when the plane of the coil is along the field (θ = 90°). It is zero when \\(\\vec{m}\\) is along or against \\(\\vec{B}\\), that is when the plane of the coil is at right angles to the field.\n" +
        "- The torque depends on the area of a flat coil, not on its shape.",
      formula: {
        label: "Torque on a current loop",
        latex: "\\vec{\\tau} = \\vec{m} \\times \\vec{B}, \\qquad \\tau = NIAB\\sin\\theta",
      },
      authoredExample: {
        prompt:
          "A rectangular coil of 40 turns, 6 cm by 5 cm, carries a current of 2 A. The normal to the coil makes 60° with a uniform field of 0.5 T. Find the torque on the coil.",
        steps: [
          "Given: N = 40, I = 2 A, A = 0.06 × 0.05 = \\(3 \\times 10^{-3}\\) m², B = 0.5 T, θ = 60°.",
          "Formula: \\(\\tau = NIAB\\sin\\theta\\).",
          "\\(\\tau = 40 \\times 2 \\times 3 \\times 10^{-3} \\times 0.5 \\times 0.866 = 0.10\\) N m.",
        ],
        answer: "0.10 N m",
      },
      selfCheckExample: {
        prompt:
          "A coil of 100 turns and area \\(2 \\times 10^{-3}\\) m² carries 1.5 A in a uniform field of 0.8 T. The field lines make 30° with the plane of the coil. Find the torque.",
        steps: [
          "The angle with the normal is 90° − 30° = 60°.",
          "\\(\\tau = 100 \\times 1.5 \\times 2 \\times 10^{-3} \\times 0.8 \\times \\sin 60^\\circ = 0.24 \\times 0.866 = 0.21\\) N m.",
        ],
        answer: "0.21 N m",
      },
      practiceSet: [
        { prompt: "What is the net force on a current loop in a uniform magnetic field?", answer: "Zero" },
        { prompt: "What is the torque on a current loop whose plane is at right angles to a uniform field?", answer: "Zero, since \\(\\vec{m}\\) is along \\(\\vec{B}\\)" },
        { prompt: "What is the largest torque on a coil of N turns and area A carrying current I in a field B?", answer: "NIAB, when the plane of the coil is along the field" },
      ],
      pyqExampleId: "991cd8b7-f95f-4d7e-9f67-ae94522f5bee",
      traps: [
        {
          title: "The angle with the plane, not the normal",
          body: "θ in \\(\\tau = NIAB\\sin\\theta\\) is measured from the normal. If the question gives the angle between the field and the plane of the coil, use 90° minus that angle.",
        },
        {
          title: "No labelled diagram in the derivation",
          body: "Draw the loop with its sides named, the field, the normal at θ to it, and the two forces \\(F_1\\) and \\(F_2\\) with their arms. The figure carries marks.",
        },
        {
          title: "Torque as a dot product",
          body: "The torque is the cross product \\(\\vec{m} \\times \\vec{B}\\), a vector. Writing \\(\\vec{m} \\cdot \\vec{B}\\) is wrong; the board set an assertion-reason item on this in 2023.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-magnetic-moment",
      name: "Magnetic moment of a loop and the loop as a magnetic dipole",
      intuition:
        "Seen from far away, a small current loop behaves just like a tiny bar magnet. How strong a magnet it is depends on the current and the area it encloses, so a loop that encloses more area is a stronger magnet.",
      definition:
        "- **Magnetic moment:** \\(\\vec{m} = NI\\vec{A}\\), along the normal to the loop. Curl the fingers of the right hand along the current; the thumb points along \\(\\vec{m}\\). SI unit: A m².\n" +
        "- **Loop as a magnetic dipole:** far from the loop, on its axis \\(B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{2m}{x^3}\\), and in its plane \\(B = \\dfrac{\\mu_0}{4\\pi}\\,\\dfrac{m}{x^3}\\). These have the form of an electric dipole's field with p replaced by m and \\(1/\\varepsilon_0\\) by \\(\\mu_0\\). So a current loop is a magnetic dipole of moment m = IA. Unlike charges, magnetic monopoles are not known to exist.\n" +
        "- **Equilibrium:** stable when \\(\\vec{m}\\) is along \\(\\vec{B}\\); unstable when \\(\\vec{m}\\) is against \\(\\vec{B}\\). In the stable position the loop's own field is along the outside field, so the flux of the total field through the loop is largest.\n" +
        "- **Potential energy:** \\(U = -\\vec{m} \\cdot \\vec{B} = -mB\\cos\\theta\\) (NCERT works this out in the next chapter). The work to turn the loop from \\(\\theta_1\\) to \\(\\theta_2\\) is \\(W = mB(\\cos\\theta_1 - \\cos\\theta_2)\\).\n" +
        "- **Same wire, different shapes:** with a fixed length of wire L, a square encloses \\(L^2/16\\), an equilateral triangle \\(\\sqrt{3}L^2/36\\) and a circle \\(L^2/(4\\pi)\\). The circle encloses the most area, so it has the largest moment and feels the largest torque.",
      formula: {
        label: "Magnetic moment and energy of a loop",
        latex: "\\vec{m} = NI\\vec{A}, \\qquad U = -\\vec{m} \\cdot \\vec{B}",
      },
      authoredExample: {
        prompt:
          "A circular coil of 50 turns, each of radius 3 cm, carries a current of 0.5 A. It lies with its magnetic moment along a uniform field of 0.2 T. Find its magnetic moment and the work needed to turn it until its moment is at right angles to the field.",
        steps: [
          "Given: N = 50, I = 0.5 A, r = 0.03 m, B = 0.2 T.",
          "\\(m = NI\\pi r^2 = 50 \\times 0.5 \\times 3.14 \\times 9 \\times 10^{-4} = 7.07 \\times 10^{-2}\\) A m².",
          "Work: \\(W = mB(\\cos 0^\\circ - \\cos 90^\\circ) = mB = 7.07 \\times 10^{-2} \\times 0.2 = 1.4 \\times 10^{-2}\\) J.",
        ],
        answer: "\\(m = 7.1 \\times 10^{-2}\\) A m²; W = \\(1.4 \\times 10^{-2}\\) J",
      },
      selfCheckExample: {
        prompt: "A wire of length L is bent into a single circular turn and carries current I. Find its magnetic moment in terms of L and I.",
        steps: ["\\(2\\pi r = L\\), so \\(r = \\dfrac{L}{2\\pi}\\) and \\(A = \\pi r^2 = \\dfrac{L^2}{4\\pi}\\).", "\\(m = IA = \\dfrac{IL^2}{4\\pi}\\)."],
        answer: "\\(m = \\dfrac{IL^2}{4\\pi}\\)",
      },
      practiceSet: [
        { prompt: "What is the SI unit of magnetic moment?", answer: "A m² (ampere square metre)" },
        { prompt: "The radius of a circular loop is doubled, keeping the current the same. What happens to its magnetic moment?", answer: "It becomes four times as large" },
        { prompt: "In which position is a current loop in stable equilibrium in a uniform magnetic field?", answer: "With its magnetic moment along the field" },
      ],
      pyqExampleId: "584a6a5c-72a3-43b4-a45f-f77ebf567574",
      traps: [
        {
          title: "Comparing loops by their perimeters",
          body: "Loops made from the same wire have the same perimeter but not the same area. The magnetic moment and the torque follow the area, and the circle wins.",
        },
        {
          title: "The direction of m",
          body: "A current that looks anticlockwise to you gives \\(\\vec{m}\\) pointing towards you; clockwise gives \\(\\vec{m}\\) pointing away. State the direction with the value.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbpmc-electron-moment",
      name: "Magnetic moment of a revolving electron",
      intuition:
        "An electron going round a nucleus passes each point of its orbit again and again, so it is a tiny current loop. That loop has a magnetic moment, and it is tied to the electron's angular momentum by a fixed number.",
      definition:
        "- The present NCERT book does not work this out, but the board asked it in 2023, 2024 and 2025, so learn this short derivation. It uses only two ideas: current is charge passing a point per second, and m = IA.\n" +
        "- **Step 1:** an electron of charge e and mass \\(m_e\\) moves at speed v in a circle of radius r. Its period is \\(T = \\dfrac{2\\pi r}{v}\\), so the current is \\(I = \\dfrac{e}{T} = \\dfrac{ev}{2\\pi r}\\). If it makes ν turns per second, \\(I = e\\nu\\).\n" +
        "- **Step 2:** \\(\\mu = IA = \\dfrac{ev}{2\\pi r} \\times \\pi r^2 = \\dfrac{evr}{2}\\).\n" +
        "- **Step 3:** the angular momentum is \\(L = m_e v r\\), so \\(\\mu = \\dfrac{e}{2m_e}L\\).\n" +
        "- **Direction:** the electron is negative, so its current goes the opposite way to its motion and \\(\\vec{\\mu} = -\\dfrac{e}{2m_e}\\vec{L}\\).\n" +
        "- **Gyromagnetic ratio:** \\(\\dfrac{\\mu}{L} = \\dfrac{e}{2m_e} = 8.8 \\times 10^{10}\\) C/kg, the same for every orbit.",
      formula: {
        label: "Magnetic moment of a revolving electron",
        latex: "\\mu = \\frac{evr}{2} = \\frac{e}{2m_e}L, \\qquad \\vec{\\mu} = -\\frac{e}{2m_e}\\vec{L}",
      },
      authoredExample: {
        prompt:
          "An electron goes round a nucleus in a circle of radius 0.5 Å at a speed of \\(2.2 \\times 10^{6}\\) m/s. Find the current it makes and its magnetic moment.",
        steps: [
          "Given: e = \\(1.6 \\times 10^{-19}\\) C, v = \\(2.2 \\times 10^{6}\\) m/s, r = \\(0.5 \\times 10^{-10}\\) m.",
          "\\(I = \\dfrac{ev}{2\\pi r} = \\dfrac{1.6 \\times 10^{-19} \\times 2.2 \\times 10^{6}}{2 \\times 3.14 \\times 0.5 \\times 10^{-10}} = 1.1 \\times 10^{-3}\\) A.",
          "\\(\\mu = \\dfrac{evr}{2} = \\dfrac{1.6 \\times 10^{-19} \\times 2.2 \\times 10^{6} \\times 0.5 \\times 10^{-10}}{2} = 8.8 \\times 10^{-24}\\) A m².",
        ],
        answer: "I = 1.1 mA; \\(\\mu = 8.8 \\times 10^{-24}\\) A m²",
      },
      selfCheckExample: {
        prompt: "An electron makes \\(6 \\times 10^{15}\\) revolutions per second round a nucleus. Find the current it makes.",
        steps: ["\\(I = e\\nu = 1.6 \\times 10^{-19} \\times 6 \\times 10^{15}\\).", "\\(I = 9.6 \\times 10^{-4}\\) A."],
        answer: "\\(9.6 \\times 10^{-4}\\) A",
      },
      practiceSet: [
        { prompt: "How is the magnetic moment of a revolving electron directed compared with its angular momentum?", answer: "Opposite to it" },
        { prompt: "What is the value of e/2m for an electron?", answer: "\\(8.8 \\times 10^{10}\\) C/kg" },
        { prompt: "Does the ratio of the magnetic moment to the angular momentum of an orbiting electron depend on the radius of its orbit?", answer: "No; it is always e/2m" },
      ],
      pyqExampleId: "72a60571-2bb0-4d04-ae2a-4dda55c9a07a",
      traps: [
        {
          title: "Losing the minus sign",
          body: "For an electron \\(\\vec{\\mu} = -\\dfrac{e}{2m_e}\\vec{L}\\). Without the minus sign the vector form is wrong, because the electron's current is opposite to its motion.",
        },
        {
          title: "Using the charge as the current",
          body: "The current is the charge passing a point each second: \\(e/T\\) or \\(e\\nu\\), not e itself.",
        },
      ],
    },
  ],
};
