import type { SubtopicNote } from "@/app/notes/_types";

export const MAGNETIC_FORCE_NOTE: SubtopicNote = {
  subtopicName: "Magnetic Force and Fleming's Rules",
  title: "Magnetic Force and Fleming's Rules",
  oneLineDefinition:
    "A magnetic field pushes on a moving charge (F = qvB sinθ) and on a current-carrying wire (F = BIL); the force is perpendicular to both, zero when motion is along the field, and its direction is found with Fleming's left-hand rule (motor) or right-hand rule (generator).",
  whyItMatters:
    "Five PYQs, and a reliable source of direction-trap questions. The essentials: the force on a moving charge is greatest when it crosses the field at right angles and zero when it moves along the field; positive and negative charges deflect opposite ways; and the two Fleming's rules — LEFT hand for the force on a current (motor), RIGHT hand for the current induced by motion (generator).",
  concepts: [
    // 1 — force on moving charge
    {
      kind: "formula" as const,
      slug: "force-on-moving-charge",
      name: "Force on a charge moving in a magnetic field",
      intuition:
        "A magnetic field only pushes on a charge that is MOVING, and only on the part of the motion that crosses the field. Move straight along the field and you feel nothing; cross it at right angles and the push is maximum. The force is always sideways — perpendicular to both the velocity and the field.",
      definition:
        "The magnetic force on a charge \\(q\\) moving with speed \\(v\\) at angle \\(\\theta\\) to a field \\(B\\) is\n" +
        "**\\(F = qvB\\sin\\theta\\)**, directed perpendicular to both \\(v\\) and \\(B\\).\n" +
        "- **Maximum** (\\(F = qvB\\)) when \\(v \\perp B\\) (\\(\\theta = 90°\\)).\n" +
        "- **Zero** when \\(v \\parallel B\\) or antiparallel (\\(\\theta = 0°\\) or \\(180°\\)).\n" +
        "Positive and negative charges feel forces in **opposite** directions, so a beam of mixed charge separates.",
      formula: {
        label: "Magnetic force on a moving charge",
        latex: "F = qvB\\sin\\theta",
        symbols: [
          { symbol: "q", meaning: "charge (C)" },
          { symbol: "v", meaning: "speed (m/s)" },
          { symbol: "B", meaning: "magnetic field (T)" },
          { symbol: "\\theta", meaning: "angle between v and B" },
        ],
      },
      authoredExample: {
        prompt:
          "A proton moves parallel to a uniform magnetic field. What magnetic force does it experience?",
        steps: [
          "\\(F = qvB\\sin\\theta\\) with \\(\\theta = 0°\\) (motion along the field).",
          "\\(\\sin 0° = 0\\).",
          "So the force is zero — a charge moving along the field feels no magnetic force.",
        ],
        answer: "Zero — there is no force when the velocity is parallel to B.",
      },
      selfCheckExample: {
        prompt:
          "A positive charge moves toward the south; the magnetic field points toward the north. What force does it feel?",
        steps: [
          "Velocity (south) and field (north) point in exactly opposite directions.",
          "The angle between them is 180°, so \\(\\sin\\theta = \\sin 180° = 0\\).",
          "\\(F = qvB\\sin\\theta = 0\\).",
        ],
        answer: "No force — the velocity is antiparallel to the field.",
      },
      practiceSet: [
        { prompt: "When is the magnetic force on a moving charge maximum?", answer: "When v ⊥ B (θ = 90°)" },
        { prompt: "Force on a charge moving along the field direction?", answer: "Zero" },
        { prompt: "Do positive and negative charges deflect the same way in a magnetic field?", answer: "No — opposite ways", method: "force reverses with the sign of q" },
      ],
      pyqExampleId: "da34f431-ed84-4df3-9ed4-6b17d549b6b1", // 2023 — antiparallel v, B ⟹ no force
      traps: [
        {
          title: "No force when motion is ALONG (or against) the field",
          body:
            "Both θ = 0° and θ = 180° give sinθ = 0, so a charge moving parallel OR antiparallel to B feels no magnetic force. 'Moving south, field north' is the antiparallel case — the answer is no deflecting force, not a sideways one.",
        },
      ],
    },

    // 2 — Fleming's left-hand rule (force on a conductor)
    {
      kind: "formula" as const,
      slug: "flemings-left-hand-rule",
      name: "Force on a current-carrying conductor — Fleming's left-hand rule",
      intuition:
        "A wire carrying current in a magnetic field is really a stream of moving charges, so the field pushes on it too. The force is F = BIL, and its DIRECTION comes from Fleming's LEFT-hand rule — the rule behind every electric motor.",
      definition:
        "A straight conductor of length \\(L\\) carrying current \\(I\\) across a field \\(B\\) feels a force **\\(F = BIL\\)** (when \\(B \\perp I\\)), perpendicular to both. " +
        "**Fleming's left-hand rule** (motor rule): hold the left hand with thumb, forefinger and middle finger mutually perpendicular —\n" +
        "- **Fore**finger → **F**ield (B),\n" +
        "- **C**entre finger → **C**urrent (I),\n" +
        "- **Thumb** → **Thrust** (force/motion).",
      visualizationSlug: "flemings-left-hand-rule",
      formula: {
        label: "Force on a current-carrying conductor",
        latex: "F = B I L",
        symbols: [
          { symbol: "F", meaning: "force (N)" },
          { symbol: "B", meaning: "magnetic field (T)" },
          { symbol: "I", meaning: "current (A)" },
          { symbol: "L", meaning: "length of conductor in the field (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "Which rule gives the direction of the force on a straight current-carrying conductor placed perpendicular to a magnetic field?",
        steps: [
          "The force on a current in a field is the MOTOR effect.",
          "Its direction comes from Fleming's LEFT-hand rule.",
          "(Forefinger = field, centre finger = current, thumb = force.)",
        ],
        answer: "Fleming's left-hand rule.",
      },
      selfCheckExample: {
        prompt:
          "A conductor of length 0.5 m carries 4 A perpendicular to a 0.2 T field. What is the force on it?",
        steps: [
          "\\(F = BIL\\) (B ⊥ I).",
          "\\(F = 0.2 \\times 4 \\times 0.5\\).",
          "\\(F = 0.4\\) N.",
        ],
        answer: "0.4 N.",
      },
      practiceSet: [
        { prompt: "Which Fleming's rule gives the force on a current-carrying conductor?", answer: "Left-hand rule" },
        { prompt: "In Fleming's left-hand rule, the thumb represents…", answer: "Thrust (force / motion)" },
        { prompt: "Force on a 2 m wire carrying 3 A across a 0.1 T field?", answer: "0.6 N", method: "F = BIL = 0.1×3×2" },
      ],
      pyqExampleId: "9cb5b633-1bc9-4cc0-9878-de243d998b29", // 2025 — force direction ⟹ Fleming's left-hand rule
      traps: [
        {
          title: "LEFT hand for force (motor), not right",
          body:
            "Fleming's LEFT-hand rule gives the FORCE on a current (motor effect). The right-hand rule is for the current INDUCED by motion (generator). The distractor 'right-hand rule' is the classic swap.",
        },
      ],
    },

    // 3 — Fleming's right-hand rule (induced current)
    {
      kind: "formula" as const,
      slug: "flemings-right-hand-rule",
      name: "Induced current — Fleming's right-hand rule",
      intuition:
        "Run the motor backwards: instead of current making a wire move, MOVE a wire through a field and it generates a current. That's a generator, and the direction of the induced current comes from Fleming's RIGHT-hand rule.",
      definition:
        "When a conductor is **moved** through a magnetic field, an EMF (and current) is induced. **Fleming's right-hand rule** (generator/dynamo rule): with the right hand's thumb, forefinger and middle finger mutually perpendicular —\n" +
        "- **Fore**finger → **F**ield (B),\n" +
        "- **Thumb** → **motion** of the conductor,\n" +
        "- **C**entre finger → **induced current**.",
      authoredExample: {
        prompt:
          "By Fleming's right-hand rule, the forefinger points along the magnetic field and the thumb along the motion of the conductor. What does the stretched middle finger give?",
        steps: [
          "Fleming's right-hand rule is the GENERATOR rule.",
          "Forefinger = field, thumb = motion (input).",
          "The middle finger then gives the INDUCED current (output).",
        ],
        answer: "The direction of the induced current.",
      },
      selfCheckExample: {
        prompt:
          "Which device works on the rule that moving a conductor through a magnetic field induces a current — and which Fleming's rule applies?",
        steps: [
          "Converting motion into electric current is what a GENERATOR (dynamo) does.",
          "Its underlying physics is electromagnetic induction.",
          "Direction of the induced current: Fleming's RIGHT-hand rule.",
        ],
        answer: "A generator/dynamo; Fleming's right-hand rule gives the induced current.",
      },
      practiceSet: [
        { prompt: "Which Fleming's rule gives the direction of induced current?", answer: "Right-hand rule" },
        { prompt: "Fleming's right-hand rule is associated with which machine?", answer: "Generator / dynamo" },
        { prompt: "In Fleming's right-hand rule, the middle finger represents…", answer: "Induced current" },
      ],
      pyqExampleId: "df45f436-bf79-471b-bebc-40b27a2f33b3", // 2022 — middle finger ⟹ induced current
      traps: [
        {
          title: "Right hand → induced current (generator)",
          body:
            "Keep the pair straight: LEFT hand = force on a current (motor), RIGHT hand = current induced by motion (generator). Here forefinger = field and thumb = motion, so the middle finger gives the INDUCED CURRENT — not 'force' and not 'electric field'.",
        },
      ],
    },
  ],
};
