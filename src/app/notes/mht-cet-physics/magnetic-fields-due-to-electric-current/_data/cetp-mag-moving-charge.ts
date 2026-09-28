import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/magnetic-fields-due-to-electric-current";

export const MOVING_CHARGE_NOTE: SubtopicNote = {
  subtopicName: "Force on Moving Charge in Magnetic Field",
  title: "Force on a Moving Charge, and Circular Motion in a Field",
  oneLineDefinition:
    "A charge q moving with velocity v through a magnetic field B feels F = q(v × B), perpendicular to both, so it does no work and only bends the path; moving across a uniform field the charge goes round a circle of radius mv/(qB), and adding an electric field gives the full Lorentz force qE + q(v × B).",
  whyItMatters:
    "12 PYQs, none HARD. Five are the force itself — its size from a cross product, the work it does (zero), a charge moving along the field lines, the full Lorentz force, what a cyclotron accelerates; seven are circular motion — the radius when the speed, field or kinetic energy changes, the radius after acceleration through a voltage, the mass from a semicircle, and an electron and a proton of equal momentum. " +
    "Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mag-lorentz-force",
      name: "The Magnetic Force on a Moving Charge",
      intuition:
        "F = q(v × B): the force is perpendicular to the velocity, so it can turn the charge but never speed it up or slow it down — the work it does is always zero. Its size is qvB sin θ, so a charge moving along the field lines feels nothing. Work the cross product component by component when v and B are given as vectors. With an electric field too, the total is the Lorentz force qE + q(v × B). A cyclotron uses the magnetic force to bend and an alternating electric field to accelerate, so it works for any charged particle, positive or negative — but not for neutrons.",
      definition:
        "- \\(\\vec F = q(\\vec v \\times \\vec B)\\), \\(|F| = qvB\\sin\\theta\\); **zero work** (F ⟂ v); zero along the field lines.\n" +
        "- \\(\\vec v = a\\hat i\\), \\(\\vec B = b\\hat j + c\\hat k\\): \\(\\vec F = qa(b\\hat k - c\\hat j)\\), \\(|F| = qa\\sqrt{b^2 + c^2}\\).\n" +
        "- **Lorentz force**: \\(\\vec F = q\\vec E + q(\\vec v \\times \\vec B)\\).\n" +
        "- **Cyclotron**: accelerates positive and negative charges, not neutrons.",
      formula: {
        label: "Lorentz force",
        latex: "\\vec F = q\\vec E + q(\\vec v \\times \\vec B)",
      },
      authoredExample: {
        prompt: "A proton moves with v = (2î + 3ĵ) × 10⁵ m/s in B = 0.5k̂ T. Force on it (e = 1.6 × 10⁻¹⁹ C)?",
        steps: ["v × B = 10⁵(2î + 3ĵ) × 0.5k̂ = 10⁵(−1ĵ + 1.5î).", "F = 1.6 × 10⁻¹⁹ × 10⁵(1.5î − ĵ) = (2.4î − 1.6ĵ) × 10⁻¹⁴ N."],
        answer: "(2.4î − 1.6ĵ) × 10⁻¹⁴ N",
      },
      selfCheckExample: {
        prompt: "Work done by the magnetic force on a moving charge?",
        steps: ["F is always perpendicular to v."],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "v = aî, B = bĵ + ck̂. Magnitude of the force?", answer: "qa√(b² + c²)" },
        { prompt: "Force on a charge moving along a field line?", answer: "Zero" },
        { prompt: "What can a cyclotron accelerate?", answer: "Positively and negatively charged particles" },
      ],
      pyqExampleId: "536eb23e-3a0f-4571-9d50-09e38597ba8e",
      traps: [
        {
          title: "Thinking a magnetic field can change a charge's speed",
          body:
            "The magnetic force is perpendicular to the velocity at every instant, so it does no work: kinetic energy and speed stay fixed, only the direction turns.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-mag-circular-motion",
      name: "Circular Motion in a Magnetic Field",
      intuition:
        "Moving straight across a uniform field, the magnetic force supplies the centripetal force: qvB = mv²/r, so r = mv/(qB) = p/(qB) = √(2mK)/(qB). Halve the speed and double the field and the radius falls to a quarter. The radius goes as the square root of the kinetic energy, so three times the energy gives √3 times the radius. A charge accelerated through V has K = qV, so r = (1/B)√(2mV/q). An electron and a proton with the same momentum and charge size move on circles of the same radius, turning opposite ways.",
      definition:
        "- \\(r = \\dfrac{mv}{qB} = \\dfrac{p}{qB} = \\dfrac{\\sqrt{2mK}}{qB}\\).\n" +
        "- v ÷ 2, B × 2 ⇒ r ÷ 4. K × 2 ⇒ \\(\\sqrt{2}r\\); K × 3 ⇒ \\(\\sqrt{3}r\\).\n" +
        "- **Accelerated through V**: \\(r = \\dfrac{1}{B}\\sqrt{\\dfrac{2mV}{q}}\\) ⇒ \\(m = \\dfrac{qB^2r^2}{2V}\\).\n" +
        "- **Equal momenta**, equal |q|: same radius, opposite senses.",
      formula: {
        label: "Radius",
        latex: "r = \\frac{mv}{qB} = \\frac{\\sqrt{2mK}}{qB}",
      },
      authoredExample: {
        prompt: "An alpha particle and a proton enter the same field with the same kinetic energy. Ratio of radii (alpha : proton)?",
        steps: ["r ∝ √m/q: √4/2 : √1/1 = 1 : 1."],
        answer: "1 : 1",
      },
      selfCheckExample: {
        prompt: "An electron moves on a circle of radius R. Its speed is halved and the field doubled. New radius?",
        steps: ["r ∝ v/B: (½)/2."],
        answer: "R/4",
      },
      practiceSet: [
        { prompt: "Kinetic energy tripled. New radius?", answer: "√3 R" },
        { prompt: "Electron accelerated through V enters B at right angles. Radius?", answer: "(1/B)√(2Vm/e)" },
        { prompt: "Electron and proton with equal momenta. Their paths?", answer: "Same radius, curving in opposite directions" },
      ],
      pyqExampleId: "bc77e63d-5696-45cc-a22d-b7c5f290b818",
      traps: [
        {
          title: "Scaling the radius with the energy",
          body:
            "r ∝ √K, not K. Doubling the kinetic energy makes the circle √2 times wider, not twice.",
        },
      ],
    },
  ],
  related: [
    { label: "Force on a Conductor — the same force on a current", href: `${BASE}/cetp-mag-force-on-conductor` },
  ],
};
