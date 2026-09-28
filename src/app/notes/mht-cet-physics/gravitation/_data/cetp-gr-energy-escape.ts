import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/gravitation";

export const ENERGY_ESCAPE_NOTE: SubtopicNote = {
  subtopicName: "Gravitational PE, Escape Velocity, and Energy",
  title: "Gravitational Potential Energy and Escape Velocity",
  oneLineDefinition:
    "A mass m at distance r from the centre of a mass M has potential energy −GMm/r; conserving kinetic plus potential energy between two distances gives a falling body's speed, a projected body's greatest height, and the escape velocity √(2GM/R) at which it never returns.",
  whyItMatters:
    "19 PYQs, 8 of them HARD — the most HARD questions in the chapter. Nine use potential energy between two distances: the speed a body gains falling from far away, the energy to raise a satellite, a satellite's energy ratios. " +
    "Ten are escape velocity and the height reached below it, including escape from a point between the earth and the moon. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-gr-potential-energy",
      name: "Energy Conservation Between Two Distances",
      intuition:
        "Gravitational potential energy −GMm/r is negative and rises toward zero with distance. Energy conservation between r₁ and r₂ gives ½mv² = GMm(1/r₂ − 1/r₁) for a body falling inward; a body released at R₀ reaches the surface at √(2GM(1/R − 1/R₀)). Measure every distance from the CENTRE: a body '3R above the surface' is 4R out. The energy to lift a body to height h is GMm h/(R(R + h)) = mgh/(1 + h/R); setting it in orbit there needs the orbital kinetic energy GMm/2(R + h) as well, so the two are in the ratio 2h : R. In a circular orbit the potential energy is −2 times the kinetic energy.",
      definition:
        "- \\(U = -\\dfrac{GMm}{r}\\); \\(\\tfrac{1}{2}mv^2 = GMm\\left(\\dfrac{1}{r_2} - \\dfrac{1}{r_1}\\right)\\).\n" +
        "- From 3R above the surface to R above: \\(KE = \\dfrac{GMm}{2R} - \\dfrac{GMm}{4R} = \\dfrac{GMm}{4R}\\).\n" +
        "- Magnitude E at distance R ⇒ weight at 1.5R \\(= \\dfrac{4E}{9R}\\).\n" +
        "- Raising to h: \\(E_1 = \\dfrac{mgh}{1 + h/R}\\); orbital KE there: \\(E_2 = \\dfrac{mgR}{2(1 + h/R)}\\); \\(E_1 : E_2 = 2h : R\\).\n" +
        "- Projectiles near the ground: heights and so PE at the top go as the square of the vertical velocity component (vertical vs 60° to the vertical ⇒ 4 : 1).",
      formula: {
        label: "Gravitational potential energy",
        latex: "U = -\\frac{GMm}{r}, \\qquad \\tfrac{1}{2}mv^2 = GMm\\left(\\frac{1}{r_2} - \\frac{1}{r_1}\\right)",
      },
      authoredExample: {
        prompt: "A body is released from rest at 2R from the earth's centre. Its speed on reaching the surface, in terms of g and R?",
        steps: ["½v² = GM(1/R − 1/2R) = GM/2R = gR/2.", "v = √(gR)."],
        answer: "√(gR)",
      },
      selfCheckExample: {
        prompt: "A body falls from rest at 3R from the centre to the surface. Kinetic energy gained?",
        steps: ["GMm(1/R − 1/3R)."],
        answer: "2GMm/(3R)",
      },
      practiceSet: [
        { prompt: "Satellite in a circular orbit: PE/KE?", answer: "−2" },
      ],
      pyqExampleId: "460cf475-88f5-4987-848f-76a4df438aa4",
      traps: [
        {
          title: "Measuring from the surface instead of the centre",
          body:
            "Potential energy uses the distance from the centre. '3R above the surface' is 4R from the centre, and the answers differ by a factor of two.",
        },
        {
          title: "Using mgh far from the earth",
          body:
            "mgh assumes g does not change. For heights comparable to R, use −GMm/r at both ends.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-gr-escape-velocity",
      name: "Escape Velocity and the Height Below It",
      intuition:
        "To escape, a body needs enough kinetic energy to bring its total energy to zero: ½mv_e² = GMm/R, so v_e = √(2GM/R) = √(2gR), about 11.2 km/s on earth. It does not depend on the body's mass. For planets of the same density v_e ∝ R, and in general v_e ∝ R√ρ. Projected at a fraction n of v_e, the body rises to h = n²R/(1 − n²): a third of v_e reaches R/8, half reaches R/3. Between two bodies, the escape speed comes from the total potential energy at the launch point.",
      definition:
        "- \\(v_e = \\sqrt{\\dfrac{2GM}{R}} = \\sqrt{2gR} = R\\sqrt{\\dfrac{8\\pi G\\rho}{3}}\\): independent of the body's mass; \\(v_e \\propto R\\sqrt{\\rho}\\).\n" +
        "- Radius 2R, same density ⇒ 22 km/s; radius and density both ×4 ⇒ ×8.\n" +
        "- Projected at \\(nv_e\\): \\(h = \\dfrac{n^2R}{1 - n^2}\\) (\\(\\tfrac{1}{3}v_e\\) ⇒ R/8; \\(\\tfrac{1}{2}v_e\\) ⇒ R/3).\n" +
        "- Midway between masses M₁, M₂ a distance d apart: \\(v = 2\\sqrt{\\dfrac{G(M_1 + M_2)}{d}}\\).",
      formula: {
        label: "Escape velocity",
        latex: "v_e = \\sqrt{\\frac{2GM}{R}} = \\sqrt{2gR}, \\qquad h = \\frac{n^2R}{1 - n^2}",
      },
      authoredExample: {
        prompt: "A body is projected upward at 2/3 of the escape velocity. How high does it rise?",
        steps: ["n² = 4/9.", "h = (4/9)R/(5/9) = 4R/5."],
        answer: "4R/5",
      },
      selfCheckExample: {
        prompt: "A planet has the earth's density and three times its radius. Escape velocity? (earth: 11.2 km/s)",
        steps: ["v_e ∝ R."],
        answer: "33.6 km/s",
      },
      practiceSet: [
        { prompt: "Escape velocity does not depend on: earth's mass, the body's mass, earth's radius, or G?", answer: "The body's mass" },
      ],
      pyqExampleId: "8d568377-f651-4e24-bde4-dcc930b5a5d0",
      traps: [
        {
          title: "Using h = v²/2g for a large launch speed",
          body:
            "At a third of the escape velocity, v²/2g gives R/9; the true height, with g falling off, is R/8.",
        },
        {
          title: "Scaling escape velocity with √R at fixed density",
          body:
            "v_e = R√(8πGρ/3) is proportional to R when the density is fixed, so twice the radius doubles it.",
        },
      ],
    },
  ],
  related: [
    { label: "Satellites — orbits that do not escape", href: `${BASE}/cetp-gr-satellites` },
  ],
};
