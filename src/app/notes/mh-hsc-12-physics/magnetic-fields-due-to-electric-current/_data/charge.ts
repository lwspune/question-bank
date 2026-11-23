import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_MG_CHARGE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Force on a Moving Charge",
  title: "The Magnetic Force on a Moving Charge",
  oneLineDefinition:
    "The force F = q(v × B) that a magnetic field exerts on a moving charge, its direction, the Lorentz force, the tesla, and why a magnetic field never does work.",
  whyItMatters:
    "8 questions. Three were set in board papers, all one-mark answers: the unit Wb m⁻², which is the tesla (2022), the work done by a magnetic field perpendicular to the velocity of a charge (2025) and the force on a stationary charge (2026). The textbook adds the direction of the force on a negative charge, the sign of a charge from its path, the path of a proton in a field, and distinguishing the electric and magnetic forces.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscpmg-lorentz",
      name: "The magnetic force on a moving charge",
      intuition:
        "A magnetic field pushes only on a charge that moves, and it pushes sideways. The force is at right angles both to the velocity and to the field, so it can bend the path but never speed the charge up. It is largest when the charge moves straight across the field and zero when the charge moves along the field or does not move at all.",
      definition:
        "- A charge \\(q\\) moving with velocity \\(\\vec{v}\\) in a magnetic field \\(\\vec{B}\\) feels the force \\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\).\n" +
        "- Its magnitude is \\(F_m = qvB\\sin\\theta\\), where \\(\\theta\\) is the angle between \\(\\vec{v}\\) and \\(\\vec{B}\\). It is greatest, \\(qvB\\), when \\(\\vec{v}\\) is perpendicular to \\(\\vec{B}\\).\n" +
        "- **Direction:** perpendicular to the plane containing \\(\\vec{v}\\) and \\(\\vec{B}\\), given by the cross product. For a negative charge such as an electron, the force is opposite to \\(\\vec{v} \\times \\vec{B}\\).\n" +
        "- The force is **zero** when the charge is at rest (\\(v = 0\\)) and when \\(\\vec{v}\\) is parallel or antiparallel to \\(\\vec{B}\\) (\\(\\sin 0^\\circ = \\sin 180^\\circ = 0\\)).\n" +
        "- **Lorentz force:** with both an electric and a magnetic field present, \\(\\vec{F} = q\\vec{E} + q(\\vec{v} \\times \\vec{B})\\).\n" +
        "- **Unit of B, the tesla (T):** 1 T is the field in which a charge of 1 C moving at 1 m/s perpendicular to the field feels a force of 1 N. 1 T = 1 Wb m⁻² = 10⁴ gauss.",
      formula: {
        label: "Magnetic force on a moving charge",
        latex: "\\vec{F}_m = q(\\vec{v} \\times \\vec{B}), \\qquad F_m = qvB\\sin\\theta",
        symbols: [
          { symbol: "\\(q\\)", meaning: "charge of the particle, in coulomb" },
          { symbol: "\\(v\\)", meaning: "speed of the particle" },
          { symbol: "\\(B\\)", meaning: "magnetic field (magnetic induction), in tesla" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the velocity and the field" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton (charge \\(1.6 \\times 10^{-19}\\) C) moves with a speed of \\(2 \\times 10^{6}\\) m/s at an angle of 30° to a uniform magnetic field of 0.5 T. Find the magnetic force on it and state its direction.",
        steps: [
          "Given: \\(q = 1.6 \\times 10^{-19}\\) C, \\(v = 2 \\times 10^{6}\\) m/s, \\(B = 0.5\\) T, \\(\\theta = 30^\\circ\\).",
          "Formula: \\(F = qvB\\sin\\theta\\).",
          "Substitution: \\(F = 1.6 \\times 10^{-19} \\times 2 \\times 10^{6} \\times 0.5 \\times \\sin 30^\\circ = 1.6 \\times 10^{-19} \\times 2 \\times 10^{6} \\times 0.5 \\times 0.5\\).",
          "\\(F = 8 \\times 10^{-14}\\) N.",
          "Direction: perpendicular to the plane containing \\(\\vec{v}\\) and \\(\\vec{B}\\), along \\(\\vec{v} \\times \\vec{B}\\) because the proton is positive.",
        ],
        answer: "\\(8 \\times 10^{-14}\\) N, perpendicular to both the velocity and the field",
      },
      selfCheckExample: {
        prompt:
          "An electron moves with a speed of \\(3 \\times 10^{6}\\) m/s perpendicular to a uniform magnetic field of 0.2 T. Find the magnitude of the magnetic force on it. (Charge of electron \\(= 1.6 \\times 10^{-19}\\) C.)",
        steps: [
          "\\(\\theta = 90^\\circ\\), so \\(\\sin\\theta = 1\\).",
          "\\(F = qvB = 1.6 \\times 10^{-19} \\times 3 \\times 10^{6} \\times 0.2 = 9.6 \\times 10^{-14}\\) N.",
        ],
        answer: "\\(9.6 \\times 10^{-14}\\) N",
      },
      practiceSet: [
        { prompt: "A charge moves parallel to a uniform magnetic field. What force does the field exert on it?", answer: "Zero, because \\(\\sin 0^\\circ = 0\\)" },
        { prompt: "An electron moves along the \\(+x\\) axis in a magnetic field directed along the \\(+y\\) axis. In which direction is the magnetic force on it?", answer: "Along \\(-z\\) (\\(\\hat{i} \\times \\hat{j} = \\hat{k}\\), reversed for a negative charge)" },
        { prompt: "How many gauss make one tesla?", answer: "\\(10^{4}\\) gauss" },
      ],
      pyqExampleId: "a2bdef7b-ac40-4528-ac6b-5db7bf002f07",
      traps: [
        {
          title: "Not reversing the direction for a negative charge",
          body: "\\(\\vec{v} \\times \\vec{B}\\) gives the direction of the force on a positive charge. For an electron the force is the opposite way. Write this step out in a direction question.",
        },
        {
          title: "Taking the wrong angle",
          body: "In \\(F = qvB\\sin\\theta\\), \\(\\theta\\) is the angle between the velocity and the field, not between the velocity and the force (that one is always 90°).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscpmg-no-work",
      name: "Electric and magnetic forces compared",
      intuition:
        "The magnetic force always acts at right angles to the motion, like a string whirling a stone. A force at right angles to the displacement does no work, so the speed and the kinetic energy stay the same. Only the direction of motion changes. An electric force can push along the motion, so it can change the speed.",
      definition:
        "- Since \\(\\vec{F}_m\\) is always perpendicular to \\(\\vec{v}\\), \\(\\vec{F}_m \\cdot \\vec{v} = 0\\). So the magnetic force is perpendicular to the displacement and **does no work**.\n" +
        "- A magnetic field can change the direction of motion of a charged particle but never its speed or kinetic energy.\n" +
        "- The board asks this as a one-mark question ('work done by a magnetic field' or 'force on a stationary charge'). Give the value and the reason in one line each.",
      table: {
        columns: ["Point", "Electric force", "Magnetic force"],
        rows: [
          { cells: ["Formula", "\\(\\vec{F}_e = q\\vec{E}\\)", "\\(\\vec{F}_m = q(\\vec{v} \\times \\vec{B})\\)"] },
          { cells: ["On a charge at rest", "Acts", "Zero"] },
          { cells: ["Depends on the velocity", "No", "Yes, on the speed and on the angle between \\(\\vec{v}\\) and \\(\\vec{B}\\)"] },
          { cells: ["Direction", "Along \\(\\vec{E}\\) for a positive charge", "Perpendicular to both \\(\\vec{v}\\) and \\(\\vec{B}\\)"] },
          {
            cells: ["Work done on the charge", "Can do work and change the speed", "No work; the speed and kinetic energy stay the same"],
            pyqExampleId: "f5bb159d-195f-4a64-bfa6-fef99e8c4d31",
            noteAmber: "Board 2025 asked for the work done by a magnetic field perpendicular to the velocity: zero, because the force is perpendicular to the displacement.",
          },
        ],
      },
      selfCheckExample: {
        prompt:
          "A charged particle enters a uniform magnetic field with a speed of \\(4 \\times 10^{5}\\) m/s. Only the magnetic force acts on it. What is its speed 5 seconds later?",
        steps: [
          "The magnetic force is always perpendicular to the velocity, so it does no work.",
          "No work means no change in kinetic energy, so the speed stays \\(4 \\times 10^{5}\\) m/s.",
        ],
        answer: "\\(4 \\times 10^{5}\\) m/s, unchanged",
      },
      practiceSet: [
        { prompt: "Can a magnetic field set a charge at rest into motion?", answer: "No. The magnetic force on a charge at rest is zero" },
        { prompt: "Write the Lorentz force on a charge q moving with velocity v in an electric field E and a magnetic field B.", answer: "\\(\\vec{F} = q\\vec{E} + q(\\vec{v} \\times \\vec{B})\\)" },
      ],
      traps: [
        {
          title: "Writing 'zero' with no reason",
          body: "For the work done by a magnetic field, the mark is for the reason: the force is perpendicular to the velocity, so \\(\\vec{F} \\cdot \\vec{v} = 0\\). A bare 'zero' can lose the mark.",
        },
        {
          title: "A distinguish answer that covers one side only",
          body: "In 'distinguish between the electric and magnetic forces', every point must say what happens for both forces. Writing only that the magnetic force does no work is half a point.",
        },
      ],
    },
  ],
};
