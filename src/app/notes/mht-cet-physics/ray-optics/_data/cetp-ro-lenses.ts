import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/ray-optics";

export const LENSES_NOTE: SubtopicNote = {
  subtopicName: "Lenses — Lens Formula, Power, and Lensmaker",
  title: "Lenses: the Lens Formula, the Lensmaker's Equation and Combinations",
  oneLineDefinition:
    "A thin lens forms an image where 1/v − 1/u = 1/f with magnification v/u; its focal length comes from its surfaces through the lensmaker's equation 1/f = (μ − 1)(1/R₁ − 1/R₂); and lenses in contact add their powers P = 1/f in dioptres.",
  whyItMatters:
    "24 PYQs, 6 of them HARD. Nine use the lens formula — object and image distances for a given magnification, the least object–image distance, an air bubble in water. " +
    "Fifteen use the lensmaker's equation and powers: a lens immersed in a liquid, cut or ground flat, lenses in contact or apart, and a plano-convex lens fitted into a plano-concave one. Two cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ro-lens-formula",
      name: "The Lens Formula and Magnification",
      intuition:
        "With the Cartesian convention, 1/v − 1/u = 1/f and m = v/u. For a real image n times the size of the object, v = −nu (opposite sides), so the object distance is f(1 + 1/n) and the image distance f(n + 1). The object and its real image are closest, 4f apart, when both sit at 2f. An air bubble in water is a double-convex lens of the rarer medium inside the denser, so it diverges. Chromatic aberration — colours focusing at different points — comes from dispersion in the lens. At a single spherical surface, μ₂/v − μ₁/u = (μ₂ − μ₁)/R.",
      definition:
        "- \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\), \\(m = \\dfrac{v}{u}\\), power \\(P = \\dfrac{1}{f}\\) (m).\n" +
        "- Real image n times larger: \\(|u| = f\\left(1 + \\dfrac{1}{n}\\right)\\), \\(v = f(n + 1)\\) (twice, f = 1/3 m ⇒ u = 0.5 m).\n" +
        "- Least object–image distance for a real image: 4f.\n" +
        "- Air bubble in water: diverging. Colours not meeting: chromatic aberration.\n" +
        "- One surface: \\(\\dfrac{\\mu_2}{v} - \\dfrac{\\mu_1}{u} = \\dfrac{\\mu_2 - \\mu_1}{R}\\).",
      formula: {
        label: "Lens formula",
        latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}, \\qquad m = \\frac{v}{u}",
      },
      authoredExample: {
        prompt: "An object is 30 cm from a convex lens of focal length 20 cm. Image distance and magnification?",
        steps: ["1/v = 1/20 + 1/(−30) = 1/60.", "v = +60 cm; m = 60/(−30) = −2."],
        answer: "60 cm, magnification −2",
      },
      selfCheckExample: {
        prompt: "A convex lens of focal length f forms a real image 3 times the object's size. Object distance?",
        steps: ["f(1 + 1/n) with n = 3."],
        answer: "4f/3",
      },
      practiceSet: [
        { prompt: "Least distance between an object and its real image in a convex lens of focal length f?", answer: "4f" },
      ],
      pyqExampleId: "29c78552-cbec-419a-b749-2b1585115dc7",
      traps: [
        {
          title: "Taking v = nu for a real image in a lens",
          body:
            "A lens's real image is on the OTHER side, so v and u have opposite signs: v = −nu. Using v = nu gives (n − 1) where the answer has (n + 1).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ro-lensmaker-power",
      name: "Lensmaker's Equation and Combining Lenses",
      intuition:
        "1/f = (μ − 1)(1/R₁ − 1/R₂): a biconvex lens with equal radii R has 1/f = 2(μ − 1)/R. Grinding one face flat, or cutting the lens along its axis into two plano-convex halves, removes one term, so the focal length doubles and the power halves. In a liquid the lens works with the relative index μ/μ_l: a 1.5 lens in a 1.25 liquid keeps only 0.2/0.5 of its power, and in a liquid denser than the glass a converging lens diverges. Lenses in contact add powers; separated by d, P = P₁ + P₂ − dP₁P₂, which with the contact value fixes both powers. A plano-convex lens of index n₁ fitted into a plano-concave one of n₂ with the same R has 1/f = (n₁ − n₂)/R.",
      definition:
        "- \\(\\dfrac{1}{f} = (\\mu - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)\\).\n" +
        "- One face made plane, or cut along the axis: \\(f \\to 2f\\), \\(P \\to \\dfrac{P}{2}\\).\n" +
        "- In a liquid: \\(\\dfrac{P'}{P} = \\dfrac{\\mu/\\mu_l - 1}{\\mu - 1}\\) (1.5 in 1.25 ⇒ 2 : 5; 1.5 in 2 ⇒ \\(-\\tfrac{1}{2}\\)).\n" +
        "- Contact: \\(P = P_1 + P_2\\); apart by d: \\(P = P_1 + P_2 - dP_1P_2\\) (+10 D, +6 D at 0.25 m ⇒ 8 D and 2 D).\n" +
        "- Fitted pair: \\(f = \\dfrac{R}{n_1 - n_2}\\).",
      formula: {
        label: "Lensmaker and combinations",
        latex: "\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad P = P_1 + P_2 - dP_1P_2",
      },
      authoredExample: {
        prompt: "A biconvex lens (μ = 1.5) has both radii 30 cm. Its focal length, and its focal length in water (μ = 4/3)?",
        steps: ["Air: 1/f = 0.5 × 2/30 ⇒ f = 30 cm.", "Water: relative μ = 9/8; 1/f′ = (1/8)(2/30) ⇒ f′ = 120 cm."],
        answer: "30 cm; 120 cm",
      },
      selfCheckExample: {
        prompt: "Lenses of +4 D and −2.5 D are in contact. Power and focal length of the pair?",
        steps: ["P = 1.5 D; f = 1/1.5 m."],
        answer: "+1.5 D; ≈ 66.7 cm",
      },
      practiceSet: [
        { prompt: "Convex 40 cm and concave 25 cm in contact. Power?", answer: "−1.5 D" },
        { prompt: "A concave lens (μ = 1.5) is placed in a liquid of μ = 1.75. It acts as?", answer: "A converging lens" },
      ],
      pyqExampleId: "a58dbfa4-4d80-4841-9b76-949379e1fa2b",
      traps: [
        {
          title: "Adding focal lengths instead of powers",
          body:
            "Lenses in contact add POWERS, 1/f. A 40 cm convex with a 25 cm concave gives 2.5 − 4 = −1.5 D, not 15 cm.",
        },
        {
          title: "Using centimetres in the power",
          body:
            "Power in dioptres is 1/f with f in METRES: 100/f with f in cm.",
        },
      ],
    },
  ],
  related: [
    { label: "Prism — refraction and dispersion", href: `${BASE}/cetp-ro-prism` },
    { label: "Optical Instruments — lenses at work", href: `${BASE}/cetp-ro-instruments` },
  ],
};
