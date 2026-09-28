import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/laws-of-motion";

export const EQUILIBRIUM_NOTE: SubtopicNote = {
  subtopicName: "Equilibrium, Centre of Mass, and Friction",
  title: "Equilibrium and the Centre of Mass",
  oneLineDefinition:
    "A body is in equilibrium when both the net force and the net torque on it are zero; the centre of mass of a set of particles is their mass-weighted average position, which for two particles lies on the line joining them, nearer the heavier.",
  whyItMatters:
    "5 PYQs, one HARD: a metre scale balanced on a wedge, the reaction at one of two knife-edges, three weights held by strings over pulleys, and where the centre of mass of two particles lies and how it stays fixed. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-lm-equilibrium",
      name: "Moments, Reactions and the Centre of Mass",
      intuition:
        "For balance, take moments about a point where an unknown force acts, so it drops out. A metre scale on a wedge at its centre balances when w × (its distance) = W × (the other distance). A rod on two knife-edges r apart, with its weight x from A, has reaction W(r − x)/r at A. At a knot held by strings the vector sum of the tensions is zero: two equal tensions T at θ to the vertical hold up 2T cos θ. The centre of mass of two particles is at (m₁x₁ + m₂x₂)/(m₁ + m₂), on the line between them; to keep it fixed, moving m₁ by d toward it must be balanced by moving m₂ by (m₁/m₂)d toward it too.",
      definition:
        "- Moments: \\(\\sum \\tau = 0\\) (w at 20 cm, 25 g at 74 cm about 50 cm ⇒ w = 20 g).\n" +
        "- Two supports r apart, CM at x from A: \\(N_A = \\dfrac{W(r - x)}{r}\\).\n" +
        "- Knot: \\(\\sum \\vec{T} = 0\\) (two Mg at θ holding √2 Mg ⇒ θ = 45°).\n" +
        "- \\(x_{cm} = \\dfrac{m_1x_1 + m_2x_2}{m_1 + m_2}\\); fixed CM: \\(m_1\\Delta x_1 + m_2\\Delta x_2 = 0\\).",
      formula: {
        label: "Equilibrium and CM",
        latex: "\\sum\\vec{F} = 0, \\quad \\sum\\tau = 0, \\qquad x_{cm} = \\frac{m_1x_1 + m_2x_2}{m_1 + m_2}",
      },
      authoredExample: {
        prompt: "A uniform 2 m plank of weight 100 N rests on supports at its ends. A 300 N load sits 0.5 m from the left end. Reactions?",
        steps: ["Moments about the left end: 2R_right = 100 × 1 + 300 × 0.5 = 250, so R_right = 125 N.", "R_left = 400 − 125 = 275 N."],
        answer: "275 N (left), 125 N (right)",
      },
      selfCheckExample: {
        prompt: "2 kg at x = 0 and 3 kg at x = 5 m. Centre of mass?",
        steps: ["(0 + 15)/5."],
        answer: "x = 3 m",
      },
      practiceSet: [
        { prompt: "The centre of mass of two particles of different masses lies?", answer: "On the line joining them" },
      ],
      pyqExampleId: "c81ee95c-9782-419e-b08b-ab651fe29d0a",
      traps: [
        {
          title: "Taking moments about the wrong point",
          body:
            "Take moments about the support whose reaction you do NOT want. For the reaction at A, take moments about B: N_A·r = W(r − x).",
        },
        {
          title: "Placing the centre of mass at the midpoint",
          body:
            "Only for equal masses. For unequal masses it sits closer to the heavier one, still on the line joining them.",
        },
      ],
    },
  ],
  related: [
    { label: "Newton's Laws — forces in motion", href: `${BASE}/cetp-lm-newton` },
  ],
};
