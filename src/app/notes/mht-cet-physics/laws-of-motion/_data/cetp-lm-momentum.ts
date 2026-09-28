import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/laws-of-motion";

export const MOMENTUM_NOTE: SubtopicNote = {
  subtopicName: "Impulse, Momentum, and Collisions",
  title: "Impulse, Momentum and Collisions",
  oneLineDefinition:
    "Impulse — force times time, or the area under a force–time graph — equals the change in momentum; with no external force the total momentum of a system is conserved, and in a collision the coefficient of restitution e compares the speed of separation to the speed of approach.",
  whyItMatters:
    "17 PYQs, one HARD. Eight are impulse and momentum rates — a force–time graph, a conveyor belt, a machine gun, balls rebounding from a surface, momentum against kinetic energy. " +
    "Nine are collisions: the speeds after a head-on collision, bodies that stick, the height of a rebound, and the mass ratio for a given slowing. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-lm-impulse",
      name: "Impulse and Rates of Momentum",
      intuition:
        "Impulse FΔt, the area under a force–time graph, equals the change in momentum; starting from rest, it gives the speed. A steady stream of mass needs a force equal to the rate of change of momentum: sand dropped at M kg/s onto a belt moving at V needs MV newtons; n bullets a second of mass m at speed v push back with nmv; balls bouncing back from a wall change momentum by 2mv each. Momentum and kinetic energy are tied by KE = p²/2m, so 20% more momentum is 44% more energy, and at equal energies the heavier body has more momentum. Gravity acting on projectiles for time 2t changes their total momentum by (m₁ + m₂)g·2t.",
      definition:
        "- \\(J = F\\Delta t = \\Delta p\\) = area under F–t (8 N × 0.5 s + 4 N × 0.5 s on 3 kg ⇒ 2 m/s).\n" +
        "- Conveyor: \\(F = V\\dfrac{dm}{dt}\\). Gun: \\(F = n\\,mv\\). Rebound: \\(\\Delta p = 2mv\\) per ball.\n" +
        "- \\(KE = \\dfrac{p^2}{2m}\\): p × 1.2 ⇒ KE × 1.44; equal KE ⇒ heavier has more p.\n" +
        "- Bullets to stop a body: \\(n = \\dfrac{Mv}{mu}\\) (60 kg at 10 m/s with 50 g at 150 m/s ⇒ 80).",
      formula: {
        label: "Impulse",
        latex: "\\vec{J} = \\int \\vec{F}\\,dt = \\Delta\\vec{p}, \\qquad F = \\frac{dp}{dt}",
      },
      authoredExample: {
        prompt: "A 0.5 kg ball hits a wall at 12 m/s and rebounds at 8 m/s. Impulse, and the average force if contact lasts 0.02 s?",
        steps: ["Δp = 0.5 × (12 + 8) = 10 N s.", "F = 10/0.02 = 500 N."],
        answer: "10 N s; 500 N",
      },
      selfCheckExample: {
        prompt: "A 2 kg ball at 5 m/s rebounds at 5 m/s. Impulse?",
        steps: ["2 × (5 + 5)."],
        answer: "20 N s",
      },
      practiceSet: [
        { prompt: "Momentum increased by 20%. Increase in kinetic energy?", answer: "44%" },
        { prompt: "Sand falls at M kg/s on a belt moving at V. Force to keep the belt moving?", answer: "MV" },
      ],
      pyqExampleId: "80c0d449-b6f7-429a-90f4-d8e1c9913b77",
      traps: [
        {
          title: "Forgetting the rebound doubles the change",
          body:
            "A ball that bounces straight back at the same speed changes momentum by 2mv, not mv. The pressure of 1000 balls a second at 50 m/s on 1 cm² is 10⁶ Pa with the factor 2.",
        },
        {
          title: "Adding the areas of a force graph without their signs",
          body:
            "Impulse is the SIGNED area under F–t: a force pointing backward subtracts. Only then does it equal the change in momentum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-lm-collisions",
      name: "Collisions and the Coefficient of Restitution",
      intuition:
        "Momentum is conserved in every collision; kinetic energy only in an elastic one. The coefficient of restitution e = (speed of separation)/(speed of approach) is 1 when elastic and 0 when the bodies stick. Two equations — momentum and restitution — give both final velocities. A body that stops after hitting a stationary one of mass M gives e = m/M. Bodies that stick share one velocity, found component by component when they move at right angles. A ball dropped onto a surface rebounds to e²h.",
      definition:
        "- \\(m_1u_1 + m_2u_2 = m_1v_1 + m_2v_2\\); \\(e = \\dfrac{v_2 - v_1}{u_1 - u_2}\\).\n" +
        "- Elastic, second at rest: \\(v_1 = \\dfrac{m_1 - m_2}{m_1 + m_2}u\\) (slowed to 2u/3 ⇒ m₁ : m₂ = 5 : 1).\n" +
        "- Equal masses, one at rest: \\(\\dfrac{v_2}{v_1} = \\dfrac{1 + e}{1 - e}\\).\n" +
        "- First stops: \\(e = \\dfrac{m}{M}\\). Rebound height: \\(e^2h\\) (0.6 from 1 m ⇒ 0.36 m).\n" +
        "- Sticking at right angles: each component shares the total mass (m east, m north at v ⇒ \\(\\dfrac{v}{\\sqrt{2}}\\)).",
      formula: {
        label: "Restitution",
        latex: "e = \\frac{v_2 - v_1}{u_1 - u_2}",
      },
      authoredExample: {
        prompt: "A 2 kg ball at 6 m/s hits a 4 kg ball at rest, e = 0.5. Velocities after the collision?",
        steps: ["Momentum: 2v₁ + 4v₂ = 12; restitution: v₂ − v₁ = 3.", "v₂ = 3 m/s, v₁ = 0."],
        answer: "0 and 3 m/s",
      },
      selfCheckExample: {
        prompt: "A ball dropped from 4 m on a floor with e = 0.5. Rebound height?",
        steps: ["e²h."],
        answer: "1 m",
      },
      practiceSet: [
        { prompt: "In an inelastic collision, is kinetic energy conserved?", answer: "No — only momentum" },
      ],
      pyqExampleId: "29b6cb1b-e0b7-499e-92c6-845d805c6287",
      traps: [
        {
          title: "Rebound height e·h",
          body:
            "The rebound SPEED is e times the impact speed; height goes as speed squared, so the height is e²h.",
        },
        {
          title: "Conserving kinetic energy in every collision",
          body:
            "Only momentum is always conserved. Kinetic energy is conserved only when e = 1; bodies that stick lose the most.",
        },
      ],
    },
  ],
  related: [
    { label: "Newton's Laws", href: `${BASE}/cetp-lm-newton` },
    { label: "Equilibrium and Centre of Mass", href: `${BASE}/cetp-lm-equilibrium` },
  ],
};
