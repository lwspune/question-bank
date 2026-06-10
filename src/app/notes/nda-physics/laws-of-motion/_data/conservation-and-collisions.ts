import type { SubtopicNote } from "@/app/notes/_types";

export const CONSERVATION_AND_COLLISIONS_NOTE: SubtopicNote = {
  subtopicName: "Conservation of Momentum and Collisions",
  title: "Conservation of Momentum and Collisions",
  oneLineDefinition:
    "In the absence of external forces, total linear momentum is conserved; this governs recoil, collisions, and any system where mass is being added or ejected.",
  whyItMatters:
    "Roughly 8 PYQs across 2019–2024 — the second-biggest computation pocket in the chapter. " +
    "Every problem reduces to one rule: total momentum before = total momentum after. " +
    "Recoil of a gun, a boy jumping onto a cart, sand on a conveyor belt, equal-mass elastic collisions — all are the same conservation statement with the algebra rearranged.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "conservation-of-momentum",
      name: "Conservation of linear momentum",
      intuition:
        "If no outside force pushes on a system, its total momentum cannot change — internal forces (like a chemical explosion or two balls colliding) only shuffle momentum between the parts. So before-and-after, the total stays the same. This single rule solves recoil, explosions, and 'stick-together' collisions.",
      definition:
        "**Law of conservation of linear momentum:** for a system with no net external force, the total momentum is constant: \\(\\sum \\vec{p}_{\\text{before}} = \\sum \\vec{p}_{\\text{after}}\\). " +
        "Internal forces (explosions, collisions, chemical reactions) cannot change the total momentum or the velocity of the **centre of mass**. " +
        "It follows directly from Newton's third law: internal action-reaction pairs cancel.",
      formula: {
        label: "Conservation of momentum (two bodies)",
        latex: "m_1 u_1 + m_2 u_2 = m_1 v_1 + m_2 v_2",
        symbols: [
          { symbol: "m₁, m₂", meaning: "masses of the two bodies" },
          { symbol: "u₁, u₂", meaning: "velocities before" },
          { symbol: "v₁, v₂", meaning: "velocities after" },
        ],
      },
      authoredExample: {
        prompt:
          "A 10 g bullet is fired at 300 m/s from a 1 kg pistol initially at rest. Find the recoil velocity of the pistol.",
        steps: [
          "Total momentum before firing is zero (everything at rest).",
          "Conservation: \\(0 = m_b v_b + m_p v_p\\), with \\(m_b = 0.01\\,\\text{kg}\\), \\(v_b = 300\\,\\text{m/s}\\), \\(m_p = 1\\,\\text{kg}\\).",
          "\\(v_p = -\\dfrac{0.01 \\times 300}{1} = -3\\,\\text{m/s}\\).",
          "The minus sign means the pistol recoils opposite to the bullet.",
        ],
        answer: "-3 m/s (3 m/s backward).",
      },
      selfCheckExample: {
        prompt:
          "A 52 kg boy runs horizontally at 2 m/s and jumps onto a stationary 3 kg cart on frictionless wheels. They then move together. Find their common speed.",
        steps: [
          "Conservation of momentum (boy lands and they move as one body): \\(m_b v_b = (m_b + m_c)v\\).",
          "Substitute: \\(52 \\times 2 = (52 + 3)v\\), i.e. \\(104 = 55v\\).",
          "\\(v = 104 / 55 \\approx 1.89\\,\\text{m/s}\\).",
        ],
        answer: "≈ 1.89 m/s.",
      },
      practiceSet: [
        { prompt: "When is total linear momentum conserved?", answer: "When there is no net external force on the system" },
        { prompt: "Can internal forces change a system's total momentum?", answer: "No — internal action-reaction pairs cancel" },
        { prompt: "A 0.02 kg bullet leaves a 2 kg gun at 200 m/s. Recoil speed?", answer: "2 m/s", method: "v = 0.02×200 / 2" },
        { prompt: "Can a chemical reaction inside a body change its centre-of-mass velocity?", answer: "No — the reaction is internal" },
      ],
      pyqExampleId: "2832d359-c7e6-41c1-be31-e41f5bc77cf2", // 2022 — bullet/pistol recoil
      traps: [
        {
          title: "Internal forces can't move the centre of mass",
          body:
            "NDA 2019: an object moving at velocity v has a chemical reaction inside it. The reaction is internal, so it cannot change the velocity of the centre of mass (statement 1 correct). It CAN, however, redistribute kinetic energy among the particles, so the energy-conservation statement is false. Internal forces redistribute, never reset the total.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "variable-mass-force",
      name: "Force when mass is added or ejected (variable mass)",
      intuition:
        "When mass piles onto a moving object — sand falling onto a belt, rain filling a wagon — momentum must still be accounted for. Falling material that has no horizontal motion adds horizontal mass but no horizontal momentum, so the speed drops to keep momentum constant. To keep the belt moving steadily you must supply a force equal to the rate at which momentum is being added.",
      definition:
        "When mass is added or ejected, force is the rate of change of momentum: \\(F = \\dfrac{dp}{dt} = v\\,\\dfrac{dm}{dt}\\) when the added mass arrives with no momentum along the motion. " +
        "If material falls vertically onto a horizontally moving body, **horizontal momentum is conserved**: \\(M_1 v_1 = M_2 v_2\\), so the body slows as it gains mass.",
      formula: {
        label: "Force to maintain speed while loading mass at rate dm/dt",
        latex: "F = v\\,\\frac{dm}{dt}",
        symbols: [
          { symbol: "F", meaning: "force needed to keep speed constant" },
          { symbol: "v", meaning: "(constant) speed of the body" },
          { symbol: "dm/dt", meaning: "rate at which mass is added" },
        ],
      },
      authoredExample: {
        prompt:
          "Sand falls vertically onto a conveyor belt at 0.1 kg/s. The belt must keep moving at a steady 2 m/s. What horizontal force is needed on the belt?",
        steps: [
          "The sand lands with zero horizontal speed and must be accelerated up to the belt speed.",
          "Force = rate of change of momentum = \\(v\\,\\dfrac{dm}{dt}\\).",
          "\\(F = 2 \\times 0.1 = 0.2\\,\\text{N}\\).",
        ],
        answer: "0.2 N.",
      },
      selfCheckExample: {
        prompt:
          "An open railway wagon of mass M₁ moves at speed v₁. Rain falls vertically into it until its mass is M₂ and its speed is v₂. The water is at rest horizontally inside. Relate v₁ and v₂.",
        steps: [
          "Rain falls vertically, so it carries NO horizontal momentum into the wagon.",
          "Horizontal momentum is therefore conserved: \\(M_1 v_1 = M_2 v_2\\).",
          "Since \\(M_2 > M_1\\), the speed v₂ < v₁ — the wagon slows as it fills.",
        ],
        answer: "M₁v₁ = M₂v₂ (the wagon slows down as its mass grows).",
      },
      practiceSet: [
        { prompt: "Force to keep a belt at 3 m/s while sand lands at 0.2 kg/s?", answer: "0.6 N", method: "F = v·dm/dt = 3 × 0.2" },
        { prompt: "Rain falls vertically into a moving open wagon. What is conserved horizontally?", answer: "Horizontal momentum (M₁v₁ = M₂v₂)" },
        { prompt: "As a wagon fills with vertically-falling rain, does its speed rise or fall?", answer: "Fall — mass rises while momentum is fixed" },
        { prompt: "Why does vertically-falling rain add no horizontal momentum?", answer: "It has zero horizontal velocity" },
      ],
      pyqExampleId: "2d6bba87-ca3b-423a-a29a-a9d2265a4acc", // 2023 — sand on conveyor belt
      traps: [
        {
          title: "Vertically-falling mass adds no horizontal momentum",
          body:
            "NDA 2023 (rain into a moving wagon): the rain has zero horizontal speed, so horizontal momentum is conserved as M₁v₁ = M₂v₂ — the wagon SLOWS. Don't assume the speed stays the same; the added mass must be dragged up to speed, and with no external horizontal force the wagon pays for it by slowing.",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "elastic-collisions",
      name: "Collisions — elastic and the equal-mass result",
      intuition:
        "In a collision, momentum is always conserved. In an ELASTIC collision, kinetic energy is conserved too. The most-tested special case: when two equal masses collide head-on elastically and one was at rest, they simply swap velocities — the moving one stops dead and the struck one moves off with the full original speed.",
      definition:
        "In all collisions **momentum is conserved**. In an **elastic** collision **kinetic energy is also conserved**; in an **inelastic** collision some KE is lost (to heat/deformation), and in a **perfectly inelastic** collision the bodies stick and move together. " +
        "Special case — **equal masses, one at rest, elastic, head-on:** the velocities are exchanged. The moving body stops and the target moves off with the incoming speed.",
      formula: {
        label: "Equal-mass elastic head-on collision (m₂ initially at rest)",
        latex: "v_1' = 0, \\qquad v_2' = u_1",
        symbols: [
          { symbol: "u₁", meaning: "speed of the incoming body (mass m)" },
          { symbol: "v₁'", meaning: "speed of body 1 after — it stops" },
          { symbol: "v₂'", meaning: "speed of body 2 after — it takes the full speed" },
        ],
      },
      authoredExample: {
        prompt:
          "A 0.2 kg ball moving at 6 m/s collides head-on with a stationary 0.3 kg ball. After the collision the 0.2 kg ball stops dead. Find the speed of the 0.3 kg ball.",
        steps: [
          "Conserve momentum: \\(0.2 \\times 6 = 0.2 \\times 0 + 0.3 \\times v\\).",
          "\\(1.2 = 0.3 v\\).",
          "\\(v = 1.2 / 0.3 = 4\\,\\text{m/s}\\).",
        ],
        answer: "4 m/s.",
      },
      selfCheckExample: {
        prompt:
          "A bob X of mass m swings down and collides elastically, head-on, with an identical bob Y at rest on a frictionless surface. What happens to X immediately after the collision?",
        steps: [
          "Equal masses, target at rest, elastic, head-on: the velocities are exchanged.",
          "X transfers all its kinetic energy and momentum to Y.",
          "So X comes to rest at the point of collision and Y moves off with X's speed.",
        ],
        answer: "X stops dead at the collision point (Y moves off with the full speed).",
      },
      practiceSet: [
        { prompt: "What is conserved in every collision?", answer: "Momentum" },
        { prompt: "What extra quantity is conserved in an elastic collision?", answer: "Kinetic energy" },
        { prompt: "Equal masses, elastic head-on, one at rest: what does the moving one do?", answer: "Stops dead (velocities are exchanged)" },
        { prompt: "In a perfectly inelastic collision, what happens to the bodies?", answer: "They stick together and move as one" },
      ],
      pyqExampleId: "cffda4c7-50c1-472c-a1bc-a954deae841d", // 2023 — 100g/50g elastic, speed 40
      traps: [
        {
          title: "Equal-mass elastic collision: velocities are EXCHANGED",
          body:
            "NDA 2024 (bob X hits identical bob Y at rest): X does not bounce back or rise on the other side — it STOPS at the collision point and Y carries off all the speed. This swap only happens for equal masses in an elastic head-on hit; unequal masses share the velocity differently.",
        },
        {
          title: "Use momentum (not KE) to find the unknown speed",
          body:
            "When a problem tells you the post-collision state (e.g. the first sphere stops), use conservation of MOMENTUM to find the other speed. Plugging into kinetic-energy conservation is unnecessary and a common time-sink; momentum alone gives the answer directly.",
        },
      ],
    },
  ],
};
