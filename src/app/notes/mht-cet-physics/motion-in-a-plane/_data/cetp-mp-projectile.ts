import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/motion-in-a-plane";

export const PROJECTILE_NOTE: SubtopicNote = {
  subtopicName: "Projectile Motion — Range, Height, and Time of Flight",
  title: "Projectiles",
  oneLineDefinition:
    "A projectile moves steadily at u cos θ horizontally while its vertical motion is free fall starting at u sin θ; that gives time of flight 2u sin θ/g, greatest height u²sin²θ/2g and range u²sin 2θ/g on level ground.",
  whyItMatters:
    "6 PYQs, one HARD: time of flight, the angle at which height equals range, the kinetic energy and the radius of curvature at the top, the height reached in terms of two times, and a ball thrown from a tower. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-mp-projectile",
      name: "Time of Flight, Height and Range",
      intuition:
        "Split the motion: horizontally nothing acts, so uₓ = u cos θ stays; vertically it is free fall from u sin θ. At the top only the horizontal velocity remains, so the kinetic energy there is E cos²θ, and gravity acts as the centripetal force on a path of radius u²cos²θ/g. Setting H = R gives tan θ = 4. A ball thrown upward that passes height h at t₁ on the way up and lands t₂ later has h = ½gt₁t₂. From a tower, solve the vertical equation for the time first, taking care whether the throw is above or below the horizontal, then multiply by the horizontal speed.",
      definition:
        "- \\(T = \\dfrac{2u\\sin\\theta}{g}\\), \\(H = \\dfrac{u^2\\sin^2\\theta}{2g}\\), \\(R = \\dfrac{u^2\\sin 2\\theta}{g}\\) (196 m/s at 30° ⇒ T = 20 s).\n" +
        "- At the top: \\(KE = E\\cos^2\\theta\\); radius of curvature \\(\\dfrac{u^2\\cos^2\\theta}{g}\\).\n" +
        "- H = R ⇒ \\(\\tan\\theta = 4\\).\n" +
        "- Vertical throw passing h at \\(t_1\\), landing \\(t_2\\) later: \\(h = \\tfrac{1}{2}gt_1t_2\\).\n" +
        "- From height h: solve \\(-h = u_yt - \\tfrac{1}{2}gt^2\\) (u_y negative if thrown below the horizontal).",
      formula: {
        label: "Projectile",
        latex: "T = \\frac{2u\\sin\\theta}{g}, \\qquad H = \\frac{u^2\\sin^2\\theta}{2g}, \\qquad R = \\frac{u^2\\sin 2\\theta}{g}",
      },
      authoredExample: {
        prompt: "A ball is thrown horizontally at 15 m/s from a 20 m cliff. How far out does it land? (g = 10 m/s²)",
        steps: ["20 = 5t², t = 2 s.", "x = 15 × 2 = 30 m."],
        answer: "30 m",
      },
      selfCheckExample: {
        prompt: "A ball is launched at 20 m/s at 45°. Range and greatest height? (g = 10 m/s²)",
        steps: ["R = 400/10; H = 400 × ½/20."],
        answer: "40 m and 10 m",
      },
      practiceSet: [
        { prompt: "Projected with kinetic energy E at θ. KE at the highest point?", answer: "E cos²θ" },
      ],
      pyqExampleId: "b771e9ee-8aff-445b-a53c-8db464e2e3a1",
      traps: [
        {
          title: "Using cos θ for the vertical motion",
          body:
            "The vertical component is u sin θ; the horizontal is u cos θ. Time of flight and height come from sin θ.",
        },
        {
          title: "Assuming a throw from a tower goes upward",
          body:
            "'At 30° with the horizontal' does not say which side. A throw 30° below lands 8.7 m out from a 10 m tower at 10 m/s; 30° above lands 17.3 m out.",
        },
      ],
    },
  ],
  related: [
    { label: "Circular Motion — the top of the path as a curve", href: `${BASE}/cetp-mp-circular-motion` },
  ],
};
