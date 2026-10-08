import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_DYN_MOMENTUM_NOTE: SubtopicNote = {
  subtopicName: "Momentum and Collisions",
  title: "Momentum, Impulse and Collisions",
  oneLineDefinition:
    "Momentum is mass times velocity; a force acting for a time changes it, and in any collision with no outside force the total momentum stays the same.",
  whyItMatters:
    "The 2023 ministry paper asked for both velocities after an elastic collision between a moving mass and a heavier one at rest. Momentum is otherwise new ground for the paper, so expect the standard cases: sticking together, recoil and rebound.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-dyn-impulse",
      name: "Momentum and impulse",
      intuition:
        "A slow lorry and a fast bullet are both hard to stop: momentum combines mass and velocity into one measure of how much motion a body carries. To change it you need a force acting for some time. The same change of momentum can come from a big force for a short time or a small force for a long time, which is why airbags and crumple zones save lives.",
      definition:
        "- **Momentum** \\(p = mv\\): a vector, in \\(\\text{kg m/s}\\), in the direction of the velocity.\n" +
        "- **Impulse** = force × time = change of momentum: \\(F\\Delta t = \\Delta p\\). Unit: N s, the same as kg m/s.\n" +
        "- This is the second law in its general form: \\(F = \\Delta p/\\Delta t\\).\n" +
        "- For a rebound, the change of velocity includes the reversal: from \\(+u\\) to \\(-v\\) is a change of \\(u + v\\).\n" +
        "- Stretching the stopping time lowers the average force for the same change of momentum.",
      formula: {
        label: "Momentum and impulse",
        latex: "p = mv \\qquad F\\,\\Delta t = \\Delta p = mv - mu",
        symbols: [
          { symbol: "\\(p\\)", meaning: "momentum, in kg m/s" },
          { symbol: "\\(F\\)", meaning: "average force, in N" },
          { symbol: "\\(\\Delta t\\)", meaning: "time the force acts, in s" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.15 kg ball reaches a bat at 20 m/s and leaves it at 30 m/s in the opposite direction. The contact lasts 0.010 s. Find the impulse and the average force.",
        steps: [
          "Take the outgoing direction as positive: \\(u = -20\\ \\text{m/s}\\), \\(v = +30\\ \\text{m/s}\\).",
          "\\(\\Delta p = 0.15 \\times (30 - (-20)) = 0.15 \\times 50 = 7.5\\ \\text{N s}\\).",
          "\\(F = \\Delta p/\\Delta t = 7.5/0.010 = 750\\ \\text{N}\\). Using a change of only 10 m/s would give a force five times too small.",
        ],
        answer: "Impulse 7.5 N s; average force 750 N",
      },
      selfCheckExample: {
        prompt: "A 1200 kg car moving at 15 m/s is brought to rest by a constant braking force in 4.0 s. What is the size of the braking force?",
        options: ["18 000 N", "4500 N", "72 000 N", "300 N", "2250 N"],
        steps: [
          "Change of momentum: \\(1200 \\times 15 = 18\\,000\\ \\text{kg m/s}\\).",
          "\\(F = \\Delta p/\\Delta t = 18\\,000/4.0 = 4500\\ \\text{N}\\).",
          "A is the momentum itself. C multiplies by the time instead of dividing. D divides the mass by the time and forgets the speed.",
        ],
        answer: "(B) 4500 N",
      },
      practiceSet: [
        { prompt: "What is the momentum of a 2.0 kg trolley moving at 3.0 m/s?", answer: "6.0 kg m/s", method: "\\(p = mv\\)" },
        { prompt: "A force of 50 N acts on a puck for 0.20 s. What impulse does it give?", answer: "10 N s", method: "\\(F\\Delta t\\)" },
        { prompt: "Why does an airbag reduce the force on a passenger?", answer: "It makes the stopping time longer", method: "Same \\(\\Delta p\\), larger \\(\\Delta t\\), smaller \\(F\\)" },
      ],
      traps: [
        {
          title: "A rebound changes the momentum by more than a stop does",
          body: "Momentum is a vector. A ball arriving at 20 m/s and leaving at 30 m/s the other way changes its velocity by 50 m/s, not 10 m/s. Bouncing back always needs a bigger impulse than simply stopping.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-dyn-collisions",
      name: "Conservation of momentum in collisions and explosions",
      intuition:
        "When two bodies collide, each pushes the other with an equal and opposite force for the same time, so whatever momentum one gains the other loses. With no outside force, the total momentum is the same before and after. Kinetic energy is a different story: some is usually turned into heat, sound and dents. Only in an elastic collision does all of it survive.",
      definition:
        "**Conservation of momentum**: in an isolated system (no external resultant force), the total momentum before = total momentum after. This holds for **every** collision and explosion.\n" +
        "- **Elastic** collision: kinetic energy is also conserved.\n" +
        "- **Inelastic** collision: some kinetic energy is lost. **Perfectly inelastic**: the bodies stick together, and the loss is the largest possible.\n" +
        "- **Explosion** or recoil from rest: total momentum stays zero, so the pieces move off in opposite directions with equal momentum.\n" +
        "- Elastic head-on collision, mass \\(m_1\\) at speed \\(u\\) hitting \\(m_2\\) at rest: \\(v_1 = \\dfrac{m_1 - m_2}{m_1 + m_2}u\\) and \\(v_2 = \\dfrac{2m_1}{m_1 + m_2}u\\). Equal masses simply swap velocities.",
      formula: {
        label: "Conservation of momentum",
        latex: "m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2",
        symbols: [
          { symbol: "\\(u_1, u_2\\)", meaning: "velocities before the collision, with signs" },
          { symbol: "\\(v_1, v_2\\)", meaning: "velocities after the collision, with signs" },
        ],
      },
      authoredExample: {
        prompt:
          "A 2.0 kg trolley moving at 6.0 m/s hits a stationary 1.0 kg trolley and they stick together. Find their common velocity and the kinetic energy lost.",
        steps: [
          "Momentum before: \\(2.0 \\times 6.0 + 0 = 12\\ \\text{kg m/s}\\).",
          "After, the combined 3.0 kg moves at \\(v\\): \\(3.0v = 12\\), so \\(v = 4.0\\ \\text{m/s}\\).",
          "Kinetic energy before: \\(\\tfrac{1}{2} \\times 2.0 \\times 6.0^2 = 36\\ \\text{J}\\). After: \\(\\tfrac{1}{2} \\times 3.0 \\times 4.0^2 = 24\\ \\text{J}\\). Lost: 12 J, as heat and sound.",
        ],
        answer: "4.0 m/s; 12 J of kinetic energy lost",
      },
      selfCheckExample: {
        prompt:
          "A puck A of mass \\(m\\) slides at speed \\(u\\) on frictionless ice and hits a puck B of mass \\(3m\\) at rest, head on. The collision is elastic. What happens after the collision?",
        options: [
          "A stops; B moves forwards at \\(u/3\\)",
          "A and B both move forwards at \\(u/4\\)",
          "A and B both move forwards at \\(u/2\\)",
          "A moves backwards at \\(u\\); B stays at rest",
          "A moves backwards at \\(u/2\\); B moves forwards at \\(u/2\\)",
        ],
        steps: [
          "\\(v_A = \\dfrac{m - 3m}{4m}u = -\\dfrac{u}{2}\\) (backwards); \\(v_B = \\dfrac{2m}{4m}u = \\dfrac{u}{2}\\).",
          "Check momentum: \\(m(-u/2) + 3m(u/2) = mu\\). Check kinetic energy: \\(\\tfrac{1}{2}m\\tfrac{u^2}{4} + \\tfrac{1}{2}(3m)\\tfrac{u^2}{4} = \\tfrac{1}{2}mu^2\\). Both are conserved.",
          "A conserves momentum but loses two thirds of the kinetic energy. B is the sticking-together (perfectly inelastic) result. C and D do not conserve momentum.",
        ],
        answer: "(E) A moves backwards at \\(u/2\\); B moves forwards at \\(u/2\\)",
      },
      practiceSet: [
        { prompt: "Two equal masses collide elastically head on; one was at rest. What happens?", answer: "They swap velocities", method: "The moving one stops, the other moves off at its speed" },
        { prompt: "A 4.0 kg rifle fires a 0.020 kg bullet at 400 m/s. What is the rifle's recoil speed?", answer: "2.0 m/s", method: "\\(0.020 \\times 400 = 4.0 \\times v\\)" },
        { prompt: "A shell at rest explodes into two pieces. What is their total momentum just after?", answer: "Zero", method: "It was zero before" },
        { prompt: "In a perfectly inelastic collision, is momentum conserved? Is kinetic energy?", answer: "Momentum yes; kinetic energy no", method: "Some becomes heat and sound" },
      ],
      traps: [
        {
          title: "Momentum is always conserved; kinetic energy only in elastic collisions",
          body: "In any collision with no external force the total momentum stays the same. Kinetic energy is conserved only when the collision is elastic. An option saying both are always conserved, or that momentum is lost when bodies stick together, is wrong.",
        },
        {
          title: "Velocities after a collision carry signs",
          body: "A light body bouncing off a heavier one at rest moves backwards. Writing every speed as positive in the momentum equation gives an answer that breaks conservation of momentum.",
        },
      ],
    },
  ],
};
