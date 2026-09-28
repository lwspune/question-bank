import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/gravitation";

export const NEWTON_LAW_NOTE: SubtopicNote = {
  subtopicName: "Newton's Law of Gravitation and Gravitational Force",
  title: "Newton's Law and the Field of a Sphere",
  oneLineDefinition:
    "Every two masses attract with a force Gm₁m₂/r² along the line joining them; outside a uniform sphere or shell the field is as if all the mass sat at the centre, inside a shell it is zero, and inside a solid sphere it grows in proportion to the distance from the centre.",
  whyItMatters:
    "7 PYQs, 3 of them HARD: the field inside and outside a uniform sphere, a sphere inside a shell, three masses at the corners of a triangle, a ring's pull on a mass at its centre, and how the force between two touching spheres scales with size. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-gr-newton-law",
      name: "Inverse-Square Force, Shells and Spheres",
      intuition:
        "The force Gm₁m₂/r² acts along the line joining the centres, like the electrostatic force, but it only ever attracts. For symmetric shapes, add the pulls as vectors: a ring or a symmetric arrangement cancels at its centre, so a mass at the centre of a ring feels nothing. Outside any spherically symmetric body the field is GM/r², all the mass at the centre; inside a thin shell it is zero; inside a uniform solid sphere only the mass nearer the centre counts, and the field is GMr/R³, growing linearly. For two touching spheres of radius R and density ρ, the mass goes as R³ρ and the separation as R, so the force goes as R⁴ρ².",
      definition:
        "- \\(F = \\dfrac{Gm_1m_2}{r^2}\\), along the line joining the masses, always attractive.\n" +
        "- Outside a sphere or shell: \\(g = \\dfrac{GM}{r^2}\\). Inside a shell: 0. Inside a solid sphere: \\(g = \\dfrac{GMr}{R^3}\\).\n" +
        "- Sphere of mass m in a shell of mass m and radius 2r: at 2.5r, \\(g = \\dfrac{G(2m)}{(2.5r)^2} = \\dfrac{8}{25}\\dfrac{Gm}{r^2}\\).\n" +
        "- Ring's pull at its centre: 0. Triangle of side L/3, mass at a midpoint: only the far corner pulls, \\(\\dfrac{12Gm_1m_2}{L^2}\\).\n" +
        "- Touching spheres: \\(F \\propto R^4\\rho^2\\).",
      formula: {
        label: "Newton's law and the sphere",
        latex: "F = \\frac{Gm_1m_2}{r^2}, \\qquad g_{\\text{out}} = \\frac{GM}{r^2}, \\qquad g_{\\text{in}} = \\frac{GMr}{R^3}",
      },
      authoredExample: {
        prompt: "A uniform sphere of radius R has field g₀ at its surface. What is the field at R/2 inside it and at 2R outside it?",
        steps: ["Inside, g ∝ r: g₀/2.", "Outside, g ∝ 1/r²: g₀/4."],
        answer: "g₀/2 and g₀/4",
      },
      selfCheckExample: {
        prompt: "Two identical touching metal spheres attract with force F. Both radii are doubled, same material. New force?",
        steps: ["F ∝ R⁴."],
        answer: "16F",
      },
      practiceSet: [
        { prompt: "A thin rod bent into a circle of mass M. Force on a mass m at its centre?", answer: "Zero" },
        { prompt: "Which is true: gravitational and electrostatic forces both act along the line joining the objects?", answer: "True" },
      ],
      pyqExampleId: "af7cc293-70b9-438a-ac47-c9748db6257f",
      traps: [
        {
          title: "Using GM/r² inside a solid sphere",
          body:
            "Inside, only the mass closer to the centre pulls, and the field falls to zero at the centre: g = GMr/R³. The ratio of an outside and an inside field is R³/(r₁²r₂).",
        },
        {
          title: "Forgetting the shell's mass outside it",
          body:
            "Inside a shell its own pull cancels, but outside it the shell's mass adds to everything within. Between a sphere and a surrounding shell only the sphere counts; beyond the shell both do.",
        },
      ],
    },
  ],
  related: [
    { label: "Variation of g — height, depth, density and spin", href: `${BASE}/cetp-gr-variation-of-g` },
  ],
};
