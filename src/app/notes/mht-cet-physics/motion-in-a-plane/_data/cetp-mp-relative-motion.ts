import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/motion-in-a-plane";

export const RELATIVE_MOTION_NOTE: SubtopicNote = {
  subtopicName: "Relative Motion and Meeting Problems",
  title: "Relative Motion and Meeting Problems",
  oneLineDefinition:
    "Two moving bodies are handled by watching one from the other — their relative velocity is the difference of their velocities — or by writing each position as a function of time and asking when the positions, or the velocities, are equal.",
  whyItMatters:
    "7 PYQs, none HARD: two trains crossing, two cars whose velocities become equal, a uniformly accelerating body catching a steady one, and a runner who must cut across to meet another running at right angles. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mp-relative-motion",
      name: "Relative Velocity and Meeting",
      intuition:
        "Two trains passing each other must together cover the sum of their lengths at their relative speed: the sum of speeds if opposite, the difference if the same way. Two bodies starting together meet when their displacements are equal: a steady V and an accelerating a meet at t = 2V/a. Their velocities are equal when the derivatives of the positions match. A runner at A meeting one who starts at B and runs perpendicular to AB covers the hypotenuse: (v t)² = b² + (v₁t)², so t = b/√(v² − v₁²).",
      definition:
        "- Crossing: \\(t = \\dfrac{L_1 + L_2}{v_{\\text{rel}}}\\), \\(v_{\\text{rel}} = v_1 + v_2\\) (opposite) or \\(|v_1 - v_2|\\) (same way).\n" +
        "- Meeting from the same start: equal displacements (\\(\\tfrac{1}{2}at^2 = Vt\\) ⇒ \\(t = \\dfrac{2V}{a}\\)).\n" +
        "- Equal velocities: equal derivatives (\\(a + 2bt = F - 2t\\) ⇒ \\(t = \\dfrac{F - a}{2(1 + b)}\\)).\n" +
        "- Gap when velocities match (u steady, a from rest): \\(\\dfrac{u^2}{2a}\\).\n" +
        "- Perpendicular chase: \\(t = \\dfrac{b}{\\sqrt{v_2^2 - v_1^2}}\\).",
      formula: {
        label: "Relative velocity",
        latex: "\\vec{v}_{AB} = \\vec{v}_A - \\vec{v}_B",
      },
      authoredExample: {
        prompt: "A car at a steady 20 m/s passes a scooter at rest, which then accelerates at 2 m/s². When and where does the scooter catch up?",
        steps: ["20t = ½ × 2 × t².", "t = 20 s, 400 m from the start."],
        answer: "After 20 s, 400 m away",
      },
      selfCheckExample: {
        prompt: "Trains 100 m and 150 m long run the same way at 20 m/s and 15 m/s. Time for the faster to pass the slower?",
        steps: ["250 m at 5 m/s."],
        answer: "50 s",
      },
      practiceSet: [
        { prompt: "Two 30 m trains in opposite directions at 5 and 10 m/s. Time to cross?", answer: "4 s" },
      ],
      pyqExampleId: "f9ebdd2e-7ff4-4f18-a760-5ec93971913c",
      traps: [
        {
          title: "Using the sum of speeds for trains going the same way",
          body:
            "Same direction: the faster gains only by the DIFFERENCE of speeds. Opposite directions: the sum.",
        },
        {
          title: "Forgetting both train lengths",
          body:
            "Crossing is complete when the rear of one passes the rear of the other: the distance is the sum of the two lengths.",
        },
      ],
    },
  ],
  related: [
    { label: "Kinematics — the equations of motion", href: `${BASE}/cetp-mp-kinematics` },
    { label: "Projectiles — two motions at once", href: `${BASE}/cetp-mp-projectile` },
  ],
};
