import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_FL_MOMENTUM_NOTE: SubtopicNote = {
  subtopicName: "Momentum and Its Conservation",
  title: "Momentum and Its Conservation",
  oneLineDefinition:
    "Momentum is mass times velocity (p = mv); a force acting for a time changes it by F × t, and when no outside force acts, the total momentum of colliding or exploding bodies stays the same.",
  whyItMatters:
    "The busiest page of the chapter: eleven questions, six EASY and five MODERATE. Five use p = mv alone (a car's momentum, two ratios, a graph of velocity against mass, and a change in velocity from a force acting for a time). Six use the conservation of momentum: two rifle recoils (2010 and December 2021), a two-part question on a body sticking to a block, and the same equation for two equal masses colliding, asked in December 2021 and again in 2023.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9flmo-momentum",
      name: "Momentum p = mv and the change made by a force",
      intuition:
        "A slow, heavy truck and a fast cricket ball are both hard to stop. Momentum measures this: it grows with both mass and speed. To change a body's momentum you need a force, and a force acting for a longer time changes it more. That product, force times time, is exactly the change in momentum.",
      definition:
        "- **Momentum**: \\(p = mv\\). It has the direction of the velocity. Unit: **kg m/s**, which is the same as **N s**.\n" +
        "- If two bodies have **equal momentum**, their velocities are in the **inverse ratio** of their masses: \\(\\frac{v_1}{v_2} = \\frac{m_2}{m_1}\\).\n" +
        "- At constant momentum, \\(v = \\frac{p}{m}\\): a graph of v against m is a curve that falls steeply, then flattens, and never touches either axis.\n" +
        "- If both mass and velocity change, multiply the two factors: twice the mass and three times the velocity gives \\(2 \\times 3 = 6\\) times the momentum.\n" +
        "- **Impulse**: a force F acting for a time t changes the momentum by \\(Ft = mv-mu\\), so the change in velocity is \\(\\frac{Ft}{m}\\).",
      formula: {
        label: "Momentum and impulse",
        latex: "p = mv \\qquad Ft = mv-mu \\qquad v-u = \\frac{Ft}{m}",
        symbols: [
          { symbol: "p", meaning: "momentum, in kg m/s (or N s)" },
          { symbol: "m", meaning: "mass, in kilograms" },
          { symbol: "u, v", meaning: "initial and final velocity, in m/s" },
          { symbol: "F", meaning: "force, in newtons" },
          { symbol: "t", meaning: "time for which the force acts, in seconds" },
        ],
      },
      authoredExample: {
        prompt: "A ball of mass 0.15 kg moving at 20 m/s is stopped by a fielder in 0.1 s. Find its momentum before the catch and the average force on the fielder's hands.",
        steps: [
          "Momentum: \\(p = mv = 0.15 \\times 20 = 3\\) kg m/s.",
          "The whole 3 kg m/s is removed in 0.1 s: \\(F = \\frac{3}{0.1} = 30\\) N.",
        ],
        answer: "3 kg m/s; an average force of 30 N",
      },
      selfCheckExample: {
        prompt: "What is the momentum of a girl of mass 50 kg running at 4 m/s?",
        steps: ["\\(p = 50 \\times 4 = 200\\) kg m/s."],
        answer: "200 kg m/s",
      },
      practiceSet: [
        { prompt: "Two bodies have equal momentum and their masses are in the ratio 3 : 1. What is the ratio of their velocities?", answer: "1 : 3" },
        { prompt: "The velocity of a body is doubled and its mass stays the same. What happens to its momentum?", answer: "It doubles" },
        { prompt: "A force of 5 N acts for 4 s on a 2 kg body at rest. What velocity does it reach?", answer: "\\(\\frac{5 \\times 4}{2} = 10\\) m/s" },
        { prompt: "Write the unit of momentum in two ways.", answer: "kg m/s, or N s" },
      ],
      pyqExampleId: "992efdce-d568-4541-bf73-69f4cbad62bc",
      traps: [
        {
          title: "Leaving the mass in grams",
          body: "Momentum in kg m/s needs the mass in kilograms. A 200 g ball at 10 m/s has a momentum of 2 kg m/s, not 2000.",
        },
        {
          title: "Giving equal-momentum bodies velocities in the ratio of their masses",
          body: "With equal momentum, the lighter body is the faster one: the velocities are in the inverse ratio of the masses.",
        },
        {
          title: "Changing only one factor when both change",
          body: "If both mass and velocity change, multiply both factors. Doubling the mass alone doubles the momentum, but doubling it while the velocity is halved leaves the momentum unchanged.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9flmo-conservation",
      name: "Conservation of momentum: recoil and collisions",
      intuition:
        "Before a gun is fired, the gun and the bullet are both at rest: their total momentum is zero. After firing, the bullet rushes forward, so the gun must move backward with the same momentum to keep the total at zero. That kick is recoil. In every collision the same rule holds: whatever momentum one body loses, the other gains.",
      definition:
        "- **Law of conservation of momentum**: when no outside unbalanced force acts, the **total momentum** of a group of bodies **stays the same** before and after a collision or explosion.\n" +
        "- For two bodies: \\(m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2\\).\n" +
        "- **Recoil**: total momentum is zero before firing, so \\(mv = MV\\): the bullet's momentum equals the gun's, in the opposite direction.\n" +
        "- **Bodies that stick together** move off with one velocity: \\(v = \\frac{m_1u_1 + m_2u_2}{m_1 + m_2}\\). The total momentum is unchanged; the mass that carries it grows.\n" +
        "- **Equal masses** collide: m cancels and \\(u_1 + u_2 = v_1 + v_2\\), which can be rearranged as \\(u_1-v_1 = v_2-u_2\\).",
      formula: {
        label: "Conservation of momentum",
        latex: "m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2 \\qquad mv = MV \\qquad v = \\frac{m_1u_1 + m_2u_2}{m_1 + m_2}",
        symbols: [
          { symbol: "m₁, m₂", meaning: "masses of the two bodies" },
          { symbol: "u₁, u₂", meaning: "their velocities before the collision" },
          { symbol: "v₁, v₂", meaning: "their velocities after the collision" },
          { symbol: "m, v", meaning: "mass and velocity of the bullet" },
          { symbol: "M, V", meaning: "mass and recoil velocity of the gun" },
        ],
      },
      authoredExample: {
        prompt: "A 3 kg trolley moving at 4 m/s runs into a 1 kg trolley at rest, and the two move off joined together. Find their common velocity.",
        steps: [
          "Momentum before: \\(3 \\times 4 + 1 \\times 0 = 12\\) kg m/s.",
          "After, the joined mass is 4 kg with the same 12 kg m/s: \\(v = \\frac{12}{4} = 3\\) m/s.",
        ],
        answer: "3 m/s",
      },
      selfCheckExample: {
        prompt: "A 20 g bullet leaves a 2 kg pistol at 200 m/s. With what velocity does the pistol recoil?",
        steps: ["Bullet's momentum: \\(0.02 \\times 200 = 4\\) kg m/s.", "Pistol: \\(V = \\frac{4}{2} = 2\\) m/s, backward."],
        answer: "2 m/s, in the opposite direction to the bullet",
      },
      practiceSet: [
        { prompt: "A boy of mass 40 kg jumps forward at 2 m/s from a boat of mass 160 kg that was at rest. With what velocity does the boat move?", answer: "\\(\\frac{40 \\times 2}{160} = 0.5\\) m/s, backward" },
        { prompt: "What is the total momentum of a gun and its bullet before the gun is fired?", answer: "Zero" },
        { prompt: "A ball moving at 6 m/s hits an equal ball at rest and they stick together. What is their common velocity?", answer: "\\(\\frac{6}{2} = 3\\) m/s" },
        { prompt: "State the law of conservation of momentum.", answer: "When no outside unbalanced force acts, the total momentum of a group of bodies stays the same" },
      ],
      pyqExampleId: "d1d32f31-931c-4fea-a4f4-154043d92d6a",
      traps: [
        {
          title: "Forgetting the recoil is backward",
          body: "The gun moves opposite to the bullet. Their momenta are equal in size and opposite in direction, so the total stays zero.",
        },
        {
          title: "Using only the first body's mass after sticking",
          body: "Bodies that stick together share one velocity, so divide the total momentum by the combined mass.",
        },
        {
          title: "Thinking momentum is lost when bodies stick",
          body: "The total momentum is the same before and after; only the speed drops, because a larger mass now carries it.",
        },
      ],
    },
  ],
};
