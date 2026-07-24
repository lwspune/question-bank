import type { SubtopicNote } from "@/app/notes/_types";

export const WORK_AND_WORK_DONE_NOTE: SubtopicNote = {
  subtopicName: "Work and Work Done",
  title: "Work — Force Times Displacement Times Cosine",
  oneLineDefinition:
    "Work is done when a force moves its point of application through a displacement. Only the part of the force along the displacement counts, so W = F d cos θ — which makes work zero when force is perpendicular to motion and negative when it opposes motion.",
  whyItMatters:
    "This is the foundation of the whole chapter — every energy and power result is built on the definition of work. " +
    "The NDA tests it almost entirely through the sign and the angle: zero work when force is perpendicular, negative work when force is anti-parallel, and the definition of one joule. " +
    "5 PYQs, all EASY or MODERATE. Get the cosine rule and its sign cases right and these are free marks.",
  concepts: [
    // Concept 1 — FOUNDATION: definition of work (W = F d cos theta)
    {
      kind: "formula" as const,
      slug: "wep-definition-of-work",
      name: "What work means in physics — W = F d cos θ",
      intuition:
        "In everyday language, holding a heavy bag is hard work. In physics it is not work at all — nothing moved in the direction of the force. " +
        "Physics work happens only when a force actually pushes its target through a displacement, and it counts only the part of the force that lies ALONG that displacement.",
      definition:
        "**Work** done by a constant force is the product of the force, the displacement, and the cosine of the angle between them: \\(W = F\\,d\\cos\\theta\\). " +
        "The SI unit is the **joule (J)**: 1 J = 1 newton acting through 1 metre in its own direction. " +
        "Work is a **scalar** — it has magnitude and sign but no direction.",
      formula: {
        label: "Work done by a constant force",
        latex: "W = F\\,d\\cos\\theta",
        symbols: [
          { symbol: "W", meaning: "work done (joules, J)" },
          { symbol: "F", meaning: "magnitude of the applied force (N)" },
          { symbol: "d", meaning: "magnitude of the displacement (m)" },
          { symbol: "\\(\\theta\\)", meaning: "angle between the force and the displacement" },
        ],
      },
      visualizationSlug: "wep-work-at-angle",
      authoredExample: {
        prompt:
          "A force of 20 N pulls a box 5 m along the floor, acting at 60° above the horizontal. How much work does the force do?",
        steps: [
          "Use \\(W = F\\,d\\cos\\theta\\).",
          "Substitute \\(F = 20\\) N, \\(d = 5\\) m, \\(\\theta = 60^\\circ\\), with \\(\\cos 60^\\circ = 0.5\\).",
          "\\(W = 20 \\times 5 \\times 0.5 = 50\\) J.",
        ],
        answer: "\\(W = 50\\) J.",
      },
      selfCheckExample: {
        prompt:
          "A horizontal force of 12 N drags a crate 8 m across a floor in the same direction as the force. How much work is done?",
        steps: [
          "Force and displacement are parallel, so \\(\\theta = 0^\\circ\\) and \\(\\cos 0^\\circ = 1\\).",
          "\\(W = F\\,d\\cos\\theta = 12 \\times 8 \\times 1 = 96\\) J.",
        ],
        answer: "\\(W = 96\\) J.",
      },
      practiceSet: [
        { prompt: "A 10 N force moves a body 3 m in the direction of the force. Find the work done.", answer: "30 J", method: "\\(W = F d \\cos 0^\\circ = 10 \\times 3 \\times 1\\)" },
        { prompt: "What is the SI unit of work?", answer: "joule (J)", method: "1 J = 1 N acting through 1 m" },
        { prompt: "Is work a scalar or a vector quantity?", answer: "Scalar", method: "it has magnitude and sign but no direction" },
        { prompt: "A 50 N force acts at 60° to a 4 m displacement. Find the work done.", answer: "100 J", method: "\\(50 \\times 4 \\times \\cos 60^\\circ = 50 \\times 4 \\times 0.5\\)" },
      ],
      pyqExampleId: "35727392-73cd-495c-a57a-9ffcf0daa442", // 2021 — 1 joule = 4 N over 25 cm
      traps: [
        {
          title: "Work needs MOVEMENT in the force's direction — holding a weight is zero work",
          body:
            "If the displacement is zero, the work is zero no matter how large the force. Holding a heavy load still, or pushing a wall that does not move, does no physics work even though you feel tired.",
        },
      ],
    },

    // Concept 2 — sign of work (zero when perpendicular, negative when anti-parallel)
    {
      kind: "formula" as const,
      slug: "wep-sign-of-work",
      name: "The sign of work — positive, zero, or negative by the angle",
      intuition:
        "The cosine in \\(W = F d\\cos\\theta\\) carries the sign. When the force helps the motion the work is positive; when it is at right angles it contributes nothing; when it opposes the motion it is negative (friction removes energy this way). " +
        "Three angles cover almost every NDA question on work: 0°, 90°, and 180°.",
      definition:
        "The sign of work follows the angle between force and displacement:\n" +
        "- **θ = 0° (parallel):** \\(\\cos 0^\\circ = 1\\), work is **positive maximum** — force fully aids the motion.\n" +
        "- **θ = 90° (perpendicular):** \\(\\cos 90^\\circ = 0\\), work is **zero** — e.g. centripetal force, or carrying a load horizontally.\n" +
        "- **θ = 180° (anti-parallel):** \\(\\cos 180^\\circ = -1\\), work is **negative** — e.g. friction, or pulling against the direction of motion.",
      formula: {
        label: "Sign cases of W = F d cos θ",
        latex: "\\cos 0^\\circ = 1,\\quad \\cos 90^\\circ = 0,\\quad \\cos 180^\\circ = -1",
        symbols: [
          { symbol: "\\(\\theta = 0^\\circ\\)", meaning: "force along motion — positive work" },
          { symbol: "\\(\\theta = 90^\\circ\\)", meaning: "force perpendicular — zero work" },
          { symbol: "\\(\\theta = 180^\\circ\\)", meaning: "force opposes motion — negative work" },
        ],
      },
      authoredExample: {
        prompt:
          "A frictional force of 6 N acts on a block that slides 3 m in the direction opposite to the friction. How much work does friction do?",
        steps: [
          "Friction opposes the motion, so the angle between friction and displacement is \\(180^\\circ\\).",
          "\\(W = F\\,d\\cos 180^\\circ = 6 \\times 3 \\times (-1)\\).",
          "\\(W = -18\\) J — negative, because friction removes energy from the block.",
        ],
        answer: "\\(W = -18\\) J (negative work).",
      },
      selfCheckExample: {
        prompt:
          "A satellite moves in a circular orbit. The gravitational pull on it always points toward the centre while its velocity is tangent to the circle. How much work does gravity do on the satellite over one orbit?",
        steps: [
          "The centripetal (gravitational) force is always perpendicular to the velocity, so \\(\\theta = 90^\\circ\\).",
          "\\(W = F\\,d\\cos 90^\\circ = 0\\) at every instant, hence zero over the orbit.",
        ],
        answer: "Zero work — the force is always perpendicular to the displacement.",
      },
      practiceSet: [
        { prompt: "Force and displacement are anti-parallel. Is the work positive, zero, or negative?", answer: "Negative", method: "\\(\\cos 180^\\circ = -1\\)" },
        { prompt: "A force acts perpendicular to the displacement. How much work is done?", answer: "Zero", method: "\\(\\cos 90^\\circ = 0\\)" },
        { prompt: "A man carries a suitcase horizontally across a room. What work does he do against gravity?", answer: "Zero", method: "weight is vertical, displacement horizontal → perpendicular" },
        { prompt: "Force and displacement point the same way. Sign of work?", answer: "Positive", method: "\\(\\cos 0^\\circ = +1\\)" },
      ],
      pyqExampleId: "8b244843-6d2f-4a04-be95-c47517237f7a", // 2025 — zero work when perpendicular
      traps: [
        {
          title: "Perpendicular force does ZERO work — not maximum",
          body:
            "Carrying a weight at constant height, or the centripetal force on an orbiting body, does no work because the force is at \\(90^\\circ\\) to the motion. Students often confuse \"large force\" with \"large work\" — but with \\(\\cos 90^\\circ = 0\\) the work is exactly zero.",
        },
        {
          title: "Negative work means the force OPPOSES motion",
          body:
            "When force and displacement are anti-parallel (\\(\\theta = 180^\\circ\\)), \\(\\cos\\theta = -1\\) and the work is negative — the force is taking energy away (friction, air resistance, a brake). It does not mean \"no work\".",
        },
      ],
    },

    // Concept 3 — work done by gravity is path-independent
    {
      kind: "formula" as const,
      slug: "wep-work-done-by-gravity",
      name: "Work done by gravity depends only on the height change",
      intuition:
        "Gravity is a conservative force, so the work it does on a body moving from one point to another depends only on the change in height — not on the route taken. " +
        "Climb a hill by a straight path or a winding one, lift the same load up the same height, and gravity does the same work either way.",
      definition:
        "The work done by gravity on a body that moves through a vertical height change \\(h\\) is \\(W = \\pm mgh\\), where the sign is negative when the body rises (gravity opposes) and positive when it falls (gravity aids). " +
        "Crucially this **depends only on the vertical displacement, not on the horizontal path** — that path-independence is the defining property of a conservative force. " +
        "So the statement \"work done by gravity depends on the path followed\" is **false**.",
      formula: {
        label: "Work done by gravity over a height change h",
        latex: "W_\\text{gravity} = \\pm\\,mgh",
        symbols: [
          { symbol: "m", meaning: "mass of the body (kg)" },
          { symbol: "g", meaning: "acceleration due to gravity (\\(\\approx 9.8\\) m/s²)" },
          { symbol: "h", meaning: "vertical height change only (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2 kg book is lifted 1.5 m onto a shelf. How much work does gravity do on it? Take \\(g = 10\\) m/s².",
        steps: [
          "The book rises, so gravity opposes the motion — the work it does is negative.",
          "\\(W_\\text{gravity} = -mgh = -(2)(10)(1.5)\\).",
          "\\(W_\\text{gravity} = -30\\) J (and you do \\(+30\\) J of work against gravity).",
        ],
        answer: "\\(W_\\text{gravity} = -30\\) J.",
      },
      selfCheckExample: {
        prompt:
          "A 5 kg mass slides down a frictionless ramp, dropping a vertical height of 2 m. How much work does gravity do? Take \\(g = 10\\) m/s².",
        steps: [
          "The mass falls, so gravity aids the motion — positive work.",
          "Only the vertical drop matters: \\(W = mgh = 5 \\times 10 \\times 2 = 100\\) J.",
          "The ramp angle and path length do not change this.",
        ],
        answer: "\\(W = +100\\) J.",
      },
      practiceSet: [
        { prompt: "Does the work done by gravity depend on the path taken between two points?", answer: "No", method: "gravity is conservative — only the height change matters" },
        { prompt: "A 3 kg body falls 4 m. Work done by gravity? (g = 10)", answer: "120 J", method: "\\(W = mgh = 3 \\times 10 \\times 4\\)" },
        { prompt: "A body is lifted up. Is the work done BY gravity positive or negative?", answer: "Negative", method: "gravity opposes the upward motion" },
        { prompt: "A ball is thrown up and returns to the same point. Net work done by gravity?", answer: "Zero", method: "no net height change for a closed path" },
      ],
      pyqExampleId: "93d5b23b-ea98-4ada-aa4e-cc64c2cd8ee9", // 2025 — gravity work path-independent (NOT correct statement)
      traps: [
        {
          title: "Gravity's work does NOT depend on the path",
          body:
            "Because gravity is conservative, the work it does between two points is fixed by the height difference alone. A statement that \"work done by gravity depends on the path followed\" is the wrong one the NDA tests.",
        },
      ],
    },
  ],
};
