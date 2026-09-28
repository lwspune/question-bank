import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/motion-in-a-plane";

export const CIRCULAR_MOTION_NOTE: SubtopicNote = {
  subtopicName: "Uniform Circular Motion — Centripetal Acceleration, Banking",
  title: "Uniform Circular Motion",
  oneLineDefinition:
    "A body going round a circle at constant speed v has constant kinetic energy but a velocity that keeps turning, so it accelerates toward the centre at v²/r = ω²r; a banked track or a vertical loop supplies that centripetal force from gravity.",
  whyItMatters:
    "11 PYQs, none HARD: what stays constant, the change in momentum over half a circle, the average acceleration over half a turn, the acceleration from a frequency, the tangential speed from revolutions, banking of a railway track, and the least speed at the top of a vertical circle. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mp-circular-motion",
      name: "Centripetal Acceleration, Banking and the Vertical Circle",
      intuition:
        "In uniform circular motion only the speed, and so the kinetic energy, stays constant; velocity, momentum and acceleration all keep changing direction. The velocity is tangential, the acceleration points to the centre: a = v²/r = ω²r = 4π²f²r. Half a turn reverses the velocity, a change of 2v in momentum 2mv, and over the time πr/v that is an average acceleration 2v²/πr. A track banked by raising the outer rail h over a gauge d has tan θ = h/d = v²/rg. At the top of a vertical circle gravity alone can supply the centripetal force, so the least speed is √(gr).",
      definition:
        "- Constant: speed, KE. Changing: velocity, momentum, acceleration (direction).\n" +
        "- \\(a = \\dfrac{v^2}{r} = \\omega^2 r\\), \\(\\omega = 2\\pi f\\) (d = 1 m, f = 4 Hz ⇒ \\(32\\pi^2\\) m/s²).\n" +
        "- Half a circle: \\(\\Delta p = 2mv\\); average acceleration \\(\\dfrac{2v^2}{\\pi r}\\).\n" +
        "- Banking: \\(\\tan\\theta = \\dfrac{h}{d} = \\dfrac{v^2}{rg}\\) ⇒ \\(r = \\dfrac{v^2d}{gh}\\).\n" +
        "- Vertical circle, top: \\(v_{\\min} = \\sqrt{gr}\\), \\(f_{\\min} = \\dfrac{1}{2\\pi}\\sqrt{\\dfrac{g}{r}}\\).",
      formula: {
        label: "Centripetal acceleration",
        latex: "a = \\frac{v^2}{r} = \\omega^2 r, \\qquad \\tan\\theta = \\frac{v^2}{rg}",
      },
      authoredExample: {
        prompt: "A stone on a 0.8 m string is whirled at 5 m/s. Centripetal acceleration, and the least speed at the top if whirled vertically? (g = 10 m/s²)",
        steps: ["a = 25/0.8 ≈ 31 m/s².", "v_min = √(10 × 0.8) ≈ 2.8 m/s."],
        answer: "≈ 31 m/s²; ≈ 2.8 m/s",
      },
      selfCheckExample: {
        prompt: "A particle goes round a circle of radius 0.5 m at 2 revolutions per second. Its acceleration?",
        steps: ["(2π × 2)² × 0.5."],
        answer: "8π² ≈ 79 m/s²",
      },
      practiceSet: [
        { prompt: "Uniform circular motion: which is constant — velocity, acceleration or kinetic energy?", answer: "Kinetic energy" },
        { prompt: "Change in momentum between diametrically opposite points?", answer: "2mv" },
      ],
      pyqExampleId: "9a472a1b-894e-4cc8-8162-bf1536e753c4",
      traps: [
        {
          title: "Calling the acceleration constant",
          body:
            "Its magnitude v²/r is constant but its direction turns with the body. Only the kinetic energy and speed are truly constant.",
        },
        {
          title: "Confusing instantaneous and average acceleration",
          body:
            "Over half a circle the average acceleration is 2v²/(πr), smaller than the instantaneous v²/r.",
        },
      ],
    },
  ],
  related: [
    { label: "Projectiles", href: `${BASE}/cetp-mp-projectile` },
  ],
};
