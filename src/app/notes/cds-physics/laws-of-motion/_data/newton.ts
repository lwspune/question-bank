import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_LA_NEWTON_NOTE: SubtopicNote = {
  subtopicName: "Newton's Laws and Momentum",
  title: "Newton's Laws and Momentum",
  oneLineDefinition:
    "What happens when the net force is zero, how a net force changes momentum, and when the total momentum of a system stays the same.",
  whyItMatters:
    "Nine CDS questions from 2017 (II) to 2026 (II), three of them in the two 2026 papers. Most test one law in words. The two sums ask for the momentum and kinetic energy of a moving body, and for its final speed after a force acts for a few seconds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphla-equilibrium",
      name: "Zero net force: inertia and equilibrium",
      intuition:
        "A body left alone keeps doing what it was doing: at rest it stays at rest, moving it keeps moving in a straight line at the same speed. That is the first law, the law of inertia. When the forces on a body cancel, it is in equilibrium. Whether that equilibrium survives a small push depends on what happens to the centre of gravity when you tilt the body.",
      definition:
        "The first law and equilibrium:\n" +
        "- **First law (inertia)**: with **zero net force**, a body stays at rest or moves with **constant velocity** (same speed, same direction).\n" +
        "- On a frictionless horizontal surface, the weight is balanced by the normal reaction, so a moving body keeps a constant velocity. These two forces act on the **same** body, so they are **not** a third-law pair.\n" +
        "- **Equilibrium**: net force zero **and** net moment (turning effect) zero.\n" +
        "- **Stable**: a small tilt **raises** the centre of gravity, and the body returns (a cone on its base).\n" +
        "- **Unstable**: a small tilt **lowers** the centre of gravity, and the body falls further (a rod or cone balanced on its tip or end).\n" +
        "- **Neutral**: the centre of gravity stays at the same height (a ball on a flat floor).\n" +
        "- A rope holding a weight at its middle: each half pulls up with \\(T\\sin\\theta\\), so \\(2T\\sin\\theta = mg\\). As the rope is pulled straight, \\(\\theta \\to 0\\) and \\(T\\) grows without limit: **no finite tension can make it perfectly straight**.",
      table: {
        columns: ["Situation", "What happens"],
        rows: [
          {
            cells: ["Object sliding on a frictionless horizontal surface", "Moves with constant velocity (first law)"],
            noteAmber: "CDS 2017 (II): with the forces balanced and no friction, the object moves with constant velocity.",
            pyqExampleId: "6dada327-5554-4f99-8ad0-a00eeb402c65",
          },
          {
            cells: ["Rod balanced on one end", "Unstable equilibrium"],
            noteAmber: "CDS 2026 (II): a rod balanced vertically on one end is in unstable equilibrium.",
            pyqExampleId: "d0130f36-b72d-45ca-84d8-3dabaef5a325",
          },
          { cells: ["Cone resting on its flat base", "Stable equilibrium"] },
          { cells: ["Ball on a level floor", "Neutral equilibrium"] },
          {
            cells: ["Rope with a weight at its middle, pulled straight", "Needs an infinitely large tension"],
            noteAmber: "CDS 2018 (II): the tension needed to make the rope perfectly straight is infinitely large.",
            pyqExampleId: "8e316d2b-2404-45c7-aba5-edcad78e2018",
          },
        ],
      },
      pyqExampleId: "d0130f36-b72d-45ca-84d8-3dabaef5a325",
      selfCheckExample: {
        prompt: "A cone lies on its side on a table. If it is rolled a little, its centre of gravity stays at the same height. What kind of equilibrium is this?",
        steps: [
          "Stable means a tilt raises the centre of gravity; unstable means it lowers it.",
          "Here the height of the centre of gravity does not change.",
        ],
        answer: "Neutral equilibrium.",
      },
      practiceSet: [
        { prompt: "Which law of motion is also called the law of inertia?", answer: "The first law" },
        { prompt: "A cone rests on its flat base. What kind of equilibrium is it in?", answer: "Stable equilibrium" },
        { prompt: "Besides zero net force, what else must be zero for a body to be in equilibrium?", answer: "The net moment (turning effect)" },
        { prompt: "A puck slides across perfectly smooth, level ice. What happens to its velocity?", answer: "It stays constant" },
      ],
      traps: [
        {
          title: "Weight and normal reaction are not an action-reaction pair",
          body: "An action-reaction pair acts on **two different** bodies. The weight and the normal reaction both act on the **same** body, so when they cancel, that is equilibrium (first law), not the third law.",
        },
        {
          title: "Zero net force does not mean at rest",
          body: "With zero net force a body moves with **constant velocity**, which may be zero or may not. A body already moving keeps moving.",
        },
        {
          title: "Tilt test for equilibrium",
          body: "Ask what a small tilt does to the **centre of gravity**: up means stable, down means unstable, no change means neutral. A rod on its end is unstable because its centre of gravity is as high as it can be.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphla-second-law",
      name: "Second law: force changes momentum",
      intuition:
        "Momentum is how much motion a body carries: its mass times its velocity. A loaded truck and a bicycle at the same speed have very different momentum. The second law says a net force changes momentum, and the rate of that change equals the force. For a body whose mass does not change, that is the familiar force equals mass times acceleration.",
      definition:
        "The second law and momentum:\n" +
        "- **Momentum** \\(p = mv\\), unit kg m/s (the same as N s).\n" +
        "- **Second law**: the **rate of change of momentum equals the applied force**, \\(F = \\dfrac{\\Delta p}{\\Delta t}\\). For constant mass, \\(F = ma\\).\n" +
        "- So a force \\(F\\) acting for time \\(t\\) changes the velocity by \\(\\Delta v = \\dfrac{F t}{m}\\).\n" +
        "- **Impulse** = force × time = change in momentum.\n" +
        "- **Kinetic energy** \\(= \\tfrac{1}{2}mv^{2} = \\dfrac{p^{2}}{2m}\\).\n" +
        "- Convert km/h to m/s by multiplying by \\(\\tfrac{5}{18}\\), and back by \\(\\tfrac{18}{5}\\).",
      formula: {
        label: "Second law of motion",
        latex: "p = mv \\qquad F = \\dfrac{\\Delta p}{\\Delta t} = ma \\qquad \\Delta v = \\dfrac{Ft}{m} \\qquad K = \\tfrac{1}{2}mv^{2} = \\dfrac{p^{2}}{2m}",
        symbols: [
          { symbol: "p", meaning: "momentum" },
          { symbol: "F", meaning: "net applied force" },
          { symbol: "t", meaning: "time for which the force acts" },
          { symbol: "K", meaning: "kinetic energy" },
        ],
      },
      authoredExample: {
        prompt: "A car of mass 1200 kg is moving at 36 km/h. A forward force of 600 N acts on it for 20 s. Find its final speed in km/h.",
        steps: [
          "Acceleration: \\(a = F/m = 600/1200 = 0.5\\) m/s².",
          "Gain in speed: \\(0.5 \\times 20 = 10\\) m/s, which is \\(10 \\times \\tfrac{18}{5} = 36\\) km/h.",
          "Final speed: \\(36 + 36 = 72\\) km/h.",
        ],
        answer: "72 km/h.",
      },
      selfCheckExample: {
        prompt: "A ball of mass 0.5 kg moves at 8 m/s. Find its momentum and its kinetic energy.",
        steps: [
          "Momentum: \\(p = mv = 0.5 \\times 8 = 4\\) kg m/s.",
          "Kinetic energy: \\(\\tfrac{1}{2} \\times 0.5 \\times 8^{2} = 16\\) J.",
        ],
        answer: "4 kg m/s and 16 J.",
      },
      pyqExampleId: "b8cd2c52-02ab-4c87-926d-d52b0a7b42d8",
      practiceSet: [
        { prompt: "A net force of 20 N acts on a mass of 4 kg. What is the acceleration?", answer: "5 m/s²" },
        { prompt: "State the second law of motion in terms of momentum.", answer: "The rate of change of momentum of a body equals the applied force" },
        { prompt: "Express 54 km/h in m/s.", answer: "15 m/s", method: "\\(54 \\times \\tfrac{5}{18}\\)" },
        { prompt: "A force of 50 N acts for 3 s. What change in momentum does it produce?", answer: "150 kg m/s (150 N s)", method: "Impulse = force × time" },
      ],
      traps: [
        {
          title: "Force changes momentum, not displacement or acceleration",
          body: "The second law links force to the **rate of change of momentum**. Statements about the rate of change of displacement (that is velocity) or of acceleration are distractors. For angular momentum the matching cause is a **torque**, not a force.",
        },
        {
          title: "Change the speed into m/s before using F = ma",
          body: "With the force in newtons and the mass in kg, the acceleration comes out in m/s². Convert km/h to m/s first (× 5/18), work out the gain, then convert back (× 18/5) if the answer is wanted in km/h.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphla-momentum",
      name: "Conservation of momentum",
      intuition:
        "If nothing outside a group of bodies pushes on it, the total momentum of the group cannot change. When a gun fires, the bullet goes forward and the gun kicks back so that the total stays zero. This is also the only way to move on perfectly smooth ground: throw something one way, and you move the other way.",
      definition:
        "The rule and its limits:\n" +
        "- Total momentum is **conserved when the net external force is zero**. It is not conserved \"always\".\n" +
        "- For two bodies: \\(m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2\\).\n" +
        "- **Recoil**: starting from rest, \\(m_1v_1 = -m_2v_2\\), so the lighter body moves faster.\n" +
        "- On a **frictionless** floor you cannot walk, run, jump or roll anywhere, because each needs a push from friction. You can move only by **throwing something out**: even sneezing or blowing air works.\n" +
        "- **Kinetic energy** is not always conserved: it is lost in inelastic collisions and to friction, though momentum is still conserved in the collision.",
      formula: {
        label: "Conservation of momentum",
        latex: "m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2 \\qquad \\text{recoil from rest: } m_1v_1 = -m_2v_2",
        symbols: [
          { symbol: "m₁, m₂", meaning: "masses of the two bodies" },
          { symbol: "u, v", meaning: "velocities before and after" },
        ],
      },
      authoredExample: {
        prompt: "A gun of mass 4 kg fires a bullet of mass 20 g at 400 m/s. Find the recoil speed of the gun.",
        steps: [
          "Before firing, the total momentum is zero.",
          "Bullet's momentum after: \\(0.02 \\times 400 = 8\\) kg m/s forward.",
          "The gun must carry 8 kg m/s backward: \\(v = 8 \\div 4 = 2\\) m/s.",
        ],
        answer: "2 m/s, opposite to the bullet.",
      },
      selfCheckExample: {
        prompt: "A 50 kg skater at rest on smooth ice throws a 2 kg ball forward at 10 m/s. How fast does the skater move, and which way?",
        steps: [
          "Total momentum before the throw is zero.",
          "Ball: \\(2 \\times 10 = 20\\) kg m/s forward, so the skater carries 20 kg m/s backward.",
          "\\(v = 20 \\div 50 = 0.4\\) m/s.",
        ],
        answer: "0.4 m/s, backward.",
      },
      pyqExampleId: "6d1f64b5-e2a1-4774-88c0-58675ace59fa",
      practiceSet: [
        { prompt: "Why does a gun move backward when it fires?", answer: "To keep the total momentum zero, the gun gains momentum opposite to the bullet's" },
        { prompt: "In an inelastic collision with no outside force, which is conserved: momentum, kinetic energy, or both?", answer: "Momentum only" },
        { prompt: "A 2 kg trolley at 3 m/s hits and sticks to a 1 kg trolley at rest. What is their common speed?", answer: "2 m/s", method: "\\(6 = 3v\\)" },
        { prompt: "Why can a person not walk on perfectly frictionless ground?", answer: "Walking needs friction to push the feet backward against the ground" },
      ],
      traps: [
        {
          title: "Watch the word 'always'",
          body: "Momentum is conserved only when the **net external force is zero**, and kinetic energy is conserved only in elastic collisions. A statement saying either is **always** conserved is wrong.",
        },
        {
          title: "Running and rolling need friction",
          body: "On frictionless ground, running, jumping and rolling all fail because there is nothing to push against. Throwing out mass (sneezing, blowing, throwing a shoe) is the only way to move.",
        },
        {
          title: "Torque is not the condition for linear momentum",
          body: "Zero net **force** conserves linear momentum. Zero net **torque** conserves angular momentum. Do not swap them.",
        },
      ],
    },
  ],
};
