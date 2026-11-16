import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_LM_NEWTON_NOTE: SubtopicNote = {
  subtopicName: "Newton's Laws and Momentum",
  title: "Newton's Laws and Momentum",
  oneLineDefinition:
    "Newton's three laws, force as the rate of change of momentum, impulse as the change of momentum in a short hit, and conservation of momentum when no outside force acts.",
  whyItMatters:
    "Four NEET questions from 2021 to 2026. One adds two perpendicular forces to find an acceleration and its direction (NEET 2026), one finds the direction of the force on a player who turns (2023), and two find the impulse on a ball that falls and bounces back up (2021 and 2025).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphlm-newton-laws",
      name: "Newton's three laws of motion",
      intuition:
        "A body left alone keeps doing what it was doing: resting, or moving straight at a steady speed. To change its velocity you need a net force, and the force points the way the velocity changes, not the way the body is moving. Forces always come in pairs: when you push a wall, the wall pushes you back just as hard.",
      definition:
        "- **First law:** a body stays at rest or in uniform motion in a straight line unless a net external force acts on it. This tendency is **inertia**, and mass is its measure.\n" +
        "- **Momentum** is \\(\\vec{p} = m\\vec{v}\\), a vector, in kg m/s.\n" +
        "- **Second law:** \\(\\vec{F} = \\dfrac{\\Delta\\vec{p}}{\\Delta t}\\). For a constant mass this is \\(\\vec{F} = m\\vec{a}\\). The force points along the CHANGE in momentum.\n" +
        "- Forces add as vectors. Two perpendicular forces \\(F_1\\) and \\(F_2\\) give \\(F = \\sqrt{F_1^{2} + F_2^{2}}\\), at an angle \\(\\tan^{-1}(F_2/F_1)\\) from \\(F_1\\).\n" +
        "- **Third law:** forces come in equal and opposite pairs, and the two forces of a pair act on DIFFERENT bodies.\n" +
        "- Constant velocity means zero net force, however fast the body moves.",
      formula: {
        label: "Second law",
        latex: "\\vec{F} = \\frac{\\Delta \\vec{p}}{\\Delta t} = m\\vec{a}, \\qquad F = \\sqrt{F_1^{2} + F_2^{2}}",
        symbols: [
          { symbol: "\\(\\vec{p}\\)", meaning: "momentum, mass times velocity" },
          { symbol: "\\(\\vec{a}\\)", meaning: "acceleration, along the net force" },
        ],
      },
      authoredExample: {
        prompt:
          "A 3 kg body moving east at 4 m/s is turned so that 2 s later it moves north at 4 m/s. Find the average force on it, and its direction.",
        steps: [
          "Take east as \\(\\hat{i}\\) and north as \\(\\hat{j}\\). Change in velocity: \\(4\\hat{j} - 4\\hat{i}\\), of size \\(4\\sqrt{2}\\) m/s.",
          "Change in momentum: \\(3 \\times 4\\sqrt{2} = 12\\sqrt{2}\\) kg m/s, pointing north-west.",
          "\\(F = \\dfrac{\\Delta p}{\\Delta t} = \\dfrac{12\\sqrt{2}}{2} = 6\\sqrt{2} \\approx 8.5\\) N, toward the north-west.",
        ],
        answer: "\\(6\\sqrt{2}\\) N (about 8.5 N) toward the north-west",
      },
      selfCheckExample: {
        prompt:
          "A horse pulls a cart forward. By the third law the cart pulls the horse back with an equal force. Why does the cart still move forward?",
        steps: [
          "The two forces of a third-law pair act on different bodies, so they never cancel each other.",
          "The cart moves because of the forces on the cart alone: the horse's pull is larger than the friction on the cart.",
        ],
        answer: "The pair acts on different bodies; the pull on the cart beats the friction on the cart",
      },
      practiceSet: [
        { prompt: "A net force of 20 N acts on a 4 kg body. What is its acceleration?", answer: "\\(5\\ \\text{m/s}^{2}\\)" },
        { prompt: "A body moves in a straight line at a constant 30 m/s. What is the net force on it?", answer: "Zero" },
        { prompt: "Standing passengers fall backward when a bus starts suddenly. Which law explains this?", answer: "The first law (inertia)" },
        { prompt: "A body's momentum grows from 10 kg m/s to 30 kg m/s in 4 s, in the same direction. Find the average force.", answer: "5 N" },
      ],
      pyqExampleId: "60595d2a-dfca-470d-bb6b-ac1c7e15c0ca",
      traps: [
        {
          title: "Force follows the change, not the motion",
          body: "A body that turns from moving south to moving east, at the same speed, feels a force toward the north-east. That is the direction of \\(\\Delta\\vec{v} = \\vec{v} - \\vec{u}\\), not of either velocity.",
        },
        {
          title: "Check which force the angle is measured from",
          body: "For perpendicular forces \\(F_1\\) and \\(F_2\\), the resultant makes \\(\\tan^{-1}(F_2/F_1)\\) with \\(F_1\\) but \\(\\tan^{-1}(F_1/F_2)\\) with \\(F_2\\). The two angles add up to 90°.",
        },
        {
          title: "Action and reaction never cancel",
          body: "The two forces of a third-law pair act on different bodies. Only forces on the SAME body can be added to give its net force.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphlm-impulse",
      name: "Impulse and conservation of momentum",
      intuition:
        "When a bat hits a ball, a large force acts for a very short time. We rarely know the force, but we can measure what it did: the change in the ball's momentum. That change is the impulse. A bounce reverses the velocity, so the change is large. When no outside force acts on a group of bodies, their total momentum cannot change: a gun kicks back when it fires a bullet.",
      definition:
        "- **Impulse:** \\(\\vec{J} = \\vec{F}_{\\text{avg}}\\,\\Delta t = \\Delta\\vec{p} = m(\\vec{v} - \\vec{u})\\). Unit N s, the same as kg m/s.\n" +
        "- On a force-time graph the impulse is the area under the graph.\n" +
        "- A ball dropped from height h reaches the ground at \\(\\sqrt{2gh}\\) downward. If it bounces up to height h', it leaves at \\(\\sqrt{2gh'}\\) upward. With the signs, \\(J = m\\left(\\sqrt{2gh'} + \\sqrt{2gh}\\right)\\).\n" +
        "- Average force in a hit: \\(F = \\dfrac{\\Delta p}{\\Delta t}\\). Lowering the hands while catching makes \\(\\Delta t\\) longer, so the force is smaller.\n" +
        "- **Conservation:** with no external force the total momentum stays constant. A gun of mass M fires a bullet of mass m at speed v from rest: \\(mv = MV\\), so the gun recoils at \\(V = \\dfrac{mv}{M}\\).",
      formula: {
        label: "Impulse",
        latex: "J = F_{\\text{avg}}\\,\\Delta t = \\Delta p = m(v - u), \\qquad m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2",
      },
      authoredExample: {
        prompt:
          "A 0.2 kg ball comes at a bat at 15 m/s and goes straight back at 25 m/s. The contact lasts 0.01 s. Find the impulse and the average force on the ball.",
        steps: [
          "Take the return direction as positive: \\(u = -15\\) m/s, \\(v = +25\\) m/s.",
          "\\(J = m(v - u) = 0.2 \\times (25 + 15) = 8\\) N s.",
          "\\(F = \\dfrac{J}{\\Delta t} = \\dfrac{8}{0.01} = 800\\) N.",
        ],
        answer: "8 N s, and 800 N",
      },
      selfCheckExample: {
        prompt: "A 4 kg gun at rest fires a 20 g bullet at 400 m/s. With what speed does the gun recoil?",
        steps: [
          "Total momentum before firing is zero, so after it the two momenta are equal and opposite.",
          "\\(0.02 \\times 400 = 4 \\times V\\), so \\(V = \\dfrac{8}{4} = 2\\) m/s.",
        ],
        answer: "2 m/s, backward",
      },
      practiceSet: [
        { prompt: "A force of 50 N acts on a body for 0.2 s. What impulse does it give?", answer: "10 N s" },
        { prompt: "The unit of impulse is the same as the unit of which quantity?", answer: "Momentum (kg m/s)" },
        { prompt: "A force-time graph is a rectangle 10 N high and 3 s wide. What is the change in momentum?", answer: "30 kg m/s" },
        { prompt: "Why does a fielder pull the hands back while catching a fast ball?", answer: "It makes the time of impact longer, so the force is smaller" },
      ],
      pyqExampleId: "e3d12b93-113c-4acf-a9b5-df9ff0e3777f",
      traps: [
        {
          title: "A bounce adds the speeds",
          body: "When the velocity reverses, the size of the change is \\(m(v + u)\\), not \\(m(v - u)\\). Getting zero for a ball that bounces back to the same height means a sign was dropped.",
        },
        {
          title: "Turn heights into speeds first",
          body: "Impulse uses velocities. A drop from h gives \\(\\sqrt{2gh}\\) at the ground; you cannot use the heights themselves in \\(m(v + u)\\).",
        },
        {
          title: "Impulse is the area, not the peak",
          body: "On a force-time graph the impulse is the area under the curve. A tall, narrow spike can give less impulse than a low, wide one.",
        },
      ],
    },
  ],
};
