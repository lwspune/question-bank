import type { SubtopicNote } from "@/app/notes/_types";

export const POLARISATION_NOTE: SubtopicNote = {
  subtopicName: "Polarisation — Malus and Brewster",
  title: "Polarisation: Malus' Law and Brewster's Law",
  oneLineDefinition:
    "A polaroid passes only the component of light along its axis: unpolarised light is halved, and polarised light is cut to I cos²θ; light reflected at Brewster's angle, tan θ = μ, is fully polarised.",
  whyItMatters:
    "10 PYQs, one HARD. Two shapes: intensity through a chain of polaroids — halve once, then multiply a cos² for every angle between neighbours — " +
    "and Brewster's angle, tied to the refractive index and to the speed of light in the medium.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-malus",
      name: "Malus' Law and Chains of Polaroids",
      intuition:
        "The first polaroid throws away half of unpolarised light whatever its angle. After that the light is polarised, and each polaroid passes the fraction cos²θ, θ being the angle between its axis and the previous one's. Crossed polaroids pass nothing, but slip a third one between them and light gets through.",
      definition:
        "- Unpolarised through one polaroid: \\(\\dfrac{I_0}{2}\\). Polarised through a polaroid at \\(\\theta\\): \\(I\\cos^2\\theta\\).\n" +
        "- Chains: use the angle between NEIGHBOURS. Axes at 0°, 60°, 90°: \\(\\dfrac{I_0}{2}\\cdot\\dfrac{1}{4}\\cdot\\dfrac{3}{4} = \\dfrac{3I_0}{32}\\).\n" +
        "- Four polaroids each 30° from the last: \\(\\dfrac{I_0}{2}\\left(\\dfrac{3}{4}\\right)^3 = \\dfrac{27I_0}{128}\\).\n" +
        "- Crossed pair with a third at \\(\\theta\\) between: \\(\\dfrac{I_0}{8}\\sin^2 2\\theta\\).",
      formula: {
        label: "Malus' law",
        latex: "I = I_{\\text{in}}\\cos^2\\theta",
      },
      authoredExample: {
        prompt: "Unpolarised light of 40 W/m² passes two polaroids whose axes are 60° apart. Intensity out?",
        steps: ["\\(\\dfrac{40}{2} = 20\\); \\(20\\cos^2 60^\\circ = 5\\) W/m²."],
        answer: "5 W/m²",
      },
      selfCheckExample: {
        prompt: "Three polaroids at 0°, 45° and 90°; unpolarised light \\(I_0\\) enters. Intensity out?",
        steps: ["\\(\\dfrac{I_0}{2}\\times\\dfrac{1}{2}\\times\\dfrac{1}{2}\\)."],
        answer: "\\(\\dfrac{I_0}{8}\\)",
      },
      practiceSet: [
        { prompt: "Two polaroids 30° apart. Fraction of unpolarised light transmitted?", answer: "37.5%" },
        { prompt: "Polarised light of intensity \\(I_0\\) through a polaroid turned 45° from its plane?", answer: "\\(\\dfrac{I_0}{2}\\)" },
      ],
      pyqExampleId: "e3c5d166-a0a0-43c2-a88e-8256c4f3c566",
      traps: [
        {
          title: "Measuring every angle from the first polaroid",
          body:
            "Malus' law uses the angle between a polaroid and the ONE BEFORE it. At 60° then 90° from the first, the second step is only 30°: the factor is \\(\\cos^2 30^\\circ\\), not \\(\\cos^2 90^\\circ = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-brewster",
      name: "Brewster's Angle",
      intuition:
        "At one special angle of incidence the reflected and refracted rays are at right angles, and the reflected light has no component in the plane of incidence — it is completely polarised. That angle obeys tan θ = μ, and since μ = c/v it also ties the angle to the speed of light in the medium.",
      definition:
        "- \\(\\tan i_p = \\mu = \\dfrac{c}{v}\\); reflected light fully polarised; \\(i_p + r = 90^\\circ\\).\n" +
        "- So \\(v\\sin i_p = c\\cos i_p\\), and \\(i_p = \\cot^{-1}\\dfrac{v}{c}\\).\n" +
        "- Reflected ray polarised at \\(60^\\circ\\) ⇒ \\(\\mu = \\sqrt{3}\\); at another incidence use Snell's law with that \\(\\mu\\).",
      formula: {
        label: "Brewster's law",
        latex: "\\tan i_p = \\mu = \\frac{c}{v}",
      },
      authoredExample: {
        prompt: "Glass has \\(\\mu = 1.732\\). Brewster's angle, and the angle of refraction at it?",
        steps: ["\\(\\tan i_p = \\sqrt{3}\\) ⇒ \\(i_p = 60^\\circ\\).", "\\(r = 90^\\circ - 60^\\circ = 30^\\circ\\)."],
        answer: "60°; 30°",
      },
      selfCheckExample: {
        prompt: "Light travels at \\(2 \\times 10^8\\) m/s in a medium. Its polarising angle?",
        steps: ["\\(\\mu = 1.5\\), \\(i_p = \\tan^{-1}1.5\\)."],
        answer: "≈ 56.3°",
      },
      practiceSet: [
        { prompt: "At the polarising angle, what angle do the reflected and refracted rays make?", answer: "90°" },
      ],
      pyqExampleId: "e11d2db1-337c-451f-9e14-dce26583b6c3",
      traps: [
        {
          title: "Using sin instead of tan",
          body:
            "Brewster's law is \\(\\tan i_p = \\mu\\); \\(\\sin i_c = \\frac{1}{\\mu}\\) is the critical angle. The two get swapped in the options.",
        },
      ],
    },
  ],
  related: [
    { label: "Single-Slit Diffraction and Resolving Power", href: "/notes/mht-cet-physics/wave-optics/cetp-diffraction" },
    { label: "Wavefronts and Coherent Sources", href: "/notes/mht-cet-physics/wave-optics/cetp-wavefronts" },
  ],
};
