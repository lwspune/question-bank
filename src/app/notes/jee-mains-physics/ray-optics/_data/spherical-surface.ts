import type { SubtopicNote } from "@/app/notes/_types";

export const SPHERICAL_SURFACE_RAY_NOTE: SubtopicNote = {
  subtopicName: "Refraction at a Spherical Surface and the Lens-Maker's Formula",
  title: "Refraction at a Spherical Surface and the Lens-Maker's Formula",
  oneLineDefinition:
    "One curved boundary refracts by μ₂/v − μ₁/u = (μ₂ − μ₁)/R; two such boundaries make a thin lens, whose focal length follows from 1/f = (μ − 1)(1/R₁ − 1/R₂).",
  whyItMatters:
    "Twenty-one PYQs, fifteen of them multiple choice, and seven from 2026. Eleven image an object through one curved surface: a parallel beam entering a glass ball, an object and its image equally far from the surface, a meniscus between two liquids, two concave faces facing each other. Ten use the lens-maker's formula to link the radii, the refractive index and the focal length, including lenses built by joining two plano lenses.",
  concepts: [
    // C1 — a single refracting surface
    {
      kind: "formula" as const,
      slug: "jpray-single-surface",
      name: "Refraction at a single spherical surface",
      intuition:
        "A single curved boundary between two media forms an image, just as a lens does, but the two sides have different refractive indices. Each side's distance is weighted by its own index. The sign of R follows the same convention as every other distance: positive when the centre of curvature lies on the side the light goes to.",
      definition:
        "- \\(\\dfrac{\\mu_2}{v} - \\dfrac{\\mu_1}{u} = \\dfrac{\\mu_2 - \\mu_1}{R}\\): \\(\\mu_1\\) is the medium the light comes from, \\(\\mu_2\\) the medium it enters.\n" +
        "- \\(R > 0\\) if the centre of curvature is on the outgoing side (a convex face met from outside); \\(R < 0\\) if it is on the incoming side.\n" +
        "- Magnification \\(m = \\dfrac{\\mu_1 v}{\\mu_2 u}\\).\n" +
        "- Parallel beam (\\(u = \\infty\\)): \\(v = \\dfrac{\\mu_2 R}{\\mu_2 - \\mu_1}\\).\n" +
        "- A sphere or any thick piece: image through the first surface, move the origin to the second surface, and use that image as the object there.\n" +
        "- Light going from the denser to the rarer side uses the same formula with \\(\\mu_1 > \\mu_2\\); never rearrange it by hand.",
      formula: {
        label: "Single spherical surface",
        latex: "\\frac{\\mu_2}{v} - \\frac{\\mu_1}{u} = \\frac{\\mu_2 - \\mu_1}{R}, \\qquad m = \\frac{\\mu_1 v}{\\mu_2 u}",
      },
      authoredExample: {
        prompt:
          "A point object in air is 30 cm in front of a convex glass surface (\\(\\mu = 1.5\\)) whose radius of curvature is 20 cm. Find the position and nature of the image, and the magnification.",
        steps: [
          "Light goes from air into glass: \\(\\mu_1 = 1\\), \\(\\mu_2 = 1.5\\). The centre is inside the glass, on the outgoing side: \\(R = +20\\) cm. \\(u = -30\\) cm.",
          "\\(\\dfrac{1.5}{v} = \\dfrac{0.5}{20} + \\dfrac{1}{-30} = \\dfrac{1}{40} - \\dfrac{1}{30} = -\\dfrac{1}{120}\\).",
          "\\(v = -180\\) cm: the image is virtual, 180 cm from the surface on the air side.",
          "\\(m = \\dfrac{\\mu_1 v}{\\mu_2 u} = \\dfrac{1 \\times (-180)}{1.5 \\times (-30)} = 4\\): erect and four times as tall.",
        ],
        answer: "A virtual image 180 cm in front of the surface; \\(m = 4\\).",
      },
      selfCheckExample: {
        prompt:
          "A parallel beam in air falls on a glass sphere (\\(\\mu = 1.5\\)) of radius 10 cm. Where does the light come to a focus?",
        steps: [
          "First surface: \\(u = \\infty\\), \\(R = +10\\) cm, so \\(\\dfrac{1.5}{v} = \\dfrac{0.5}{10}\\) and \\(v = 30\\) cm. That point is 10 cm beyond the far surface.",
          "Second surface: glass to air, \\(\\mu_1 = 1.5\\), \\(\\mu_2 = 1\\). The centre is on the incoming side, \\(R = -10\\) cm. The object lies 10 cm beyond this surface: \\(u = +10\\) cm.",
          "\\(\\dfrac{1}{v} - \\dfrac{1.5}{10} = \\dfrac{1 - 1.5}{-10} = \\dfrac{1}{20}\\), so \\(\\dfrac{1}{v} = \\dfrac{1}{5}\\) and \\(v = 5\\) cm.",
        ],
        answer: "5 cm beyond the far surface, 15 cm from the centre.",
      },
      practiceSet: [
        { prompt: "A parallel beam in air falls on a convex glass surface (\\(\\mu = 1.5\\)) of radius 12 cm. Where does it converge?", answer: "36 cm inside the glass" },
        { prompt: "A small bubble sits at the centre of a glass sphere (\\(\\mu = 1.5\\)) of radius 6 cm. Where does it appear when viewed from outside?", answer: "At the centre: its rays meet the surface normally and are not bent" },
        { prompt: "An object in air is 40 cm from a convex glass surface (\\(\\mu = 1.5\\)) of radius 10 cm. Where is the image?", answer: "60 cm inside the glass, real" },
        { prompt: "An object in air at \\(u = -40\\) cm forms an image inside glass (\\(\\mu = 1.5\\)) at \\(v = +60\\) cm through one curved surface. Magnification?", answer: "−1 (inverted, the same size)" },
      ],
      pyqExampleId: "d40c331a-2d34-457e-a670-45deb80d9a7c", // 2025: air to glass 1.5, PO = PI, answer 5R
      traps: [
        {
          title: "Each distance carries its own index",
          body: "The image distance is divided into μ₂ and the object distance into μ₁. Writing 1/v − 1/u, as for a lens, ignores the two media.",
        },
        {
          title: "The sign of R depends on where the centre is",
          body: "A concave face met from outside has its centre on the incoming side, so R is negative. Using +R for every curved face can turn a virtual image into a real one.",
        },
        {
          title: "The magnification has the indices too",
          body: "For one surface m = μ₁v/(μ₂u), not v/u. Leaving out the indices gives a wrong image height.",
        },
      ],
    },

    // C2 — the lens-maker's formula
    {
      kind: "formula" as const,
      slug: "jpray-lens-maker",
      name: "Lens-maker's formula",
      intuition:
        "A thin lens is two curved surfaces close together. Adding their effects gives the lens-maker's formula. The focal length depends on how strongly the glass bends light, μ − 1, and on how curved the faces are, 1/R₁ − 1/R₂. With the sign convention, a biconvex lens has R₁ > 0 and R₂ < 0, so the two curvatures add.",
      definition:
        "- \\(\\dfrac{1}{f} = (\\mu - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)\\), where \\(R_1\\) is the face the light meets first, and the lens is in air. Power \\(P = 1/f\\), in dioptres when f is in metres.\n" +
        "- Equiconvex, radius R: \\(f = \\dfrac{R}{2(\\mu - 1)}\\). Plano-convex: \\(f = \\dfrac{R}{\\mu - 1}\\), because the flat face has \\(1/R = 0\\).\n" +
        "- Biconvex with radii a and b: \\(\\dfrac{1}{f} = (\\mu - 1)\\left(\\dfrac{1}{a} + \\dfrac{1}{b}\\right)\\). Keeping the power fixed means keeping \\(\\dfrac{1}{a} + \\dfrac{1}{b}\\) fixed.\n" +
        "- μ from the speed of light in the glass: \\(\\mu = c/v\\).\n" +
        "- A curved face of aperture radius r rising by t (the centre thickness of a plano-convex lens): \\(R^{2} = r^{2} + (R - t)^{2}\\), so \\(R \\approx \\dfrac{r^{2}}{2t}\\).\n" +
        "- Lenses joined face to face act as thin lenses in contact: find each one's power from this formula and add the powers.\n" +
        "- A thin layer of liquid trapped between glass faces is itself a lens; include its power.",
      formula: {
        label: "Lens-maker's formula",
        latex: "\\frac{1}{f} = (\\mu - 1)\\left(\\frac{1}{R_1} - \\frac{1}{R_2}\\right), \\qquad P = \\frac{1}{f}",
      },
      authoredExample: {
        prompt:
          "A biconvex lens made of glass of refractive index 1.6 has radii of curvature 15 cm and 30 cm. (a) Find its focal length and power. (b) A plano-convex lens of the same glass is to have the same power. What radius should its curved face have?",
        steps: [
          "Light meets the 15 cm face first: \\(R_1 = +15\\) cm, \\(R_2 = -30\\) cm.",
          "\\(\\dfrac{1}{f} = 0.6\\left(\\dfrac{1}{15} + \\dfrac{1}{30}\\right) = 0.6 \\times \\dfrac{1}{10} = \\dfrac{3}{50}\\ \\text{cm}^{-1}\\), so \\(f = \\dfrac{50}{3} \\approx 16.7\\) cm.",
          "\\(P = \\dfrac{100}{f\\ (\\text{in cm})} = 6\\) D.",
          "(b) Plano-convex: \\(\\dfrac{1}{f} = \\dfrac{0.6}{R}\\). Setting this equal to \\(\\dfrac{3}{50}\\) gives \\(R = 10\\) cm.",
        ],
        answer: "(a) About 16.7 cm, +6 D; (b) 10 cm.",
      },
      selfCheckExample: {
        prompt:
          "A plano-convex lens of refractive index 1.5 is 8 cm across and 0.4 cm thick at the centre. Find the radius of its curved face and its focal length.",
        steps: [
          "Aperture radius \\(r = 4\\) cm; the curved face rises \\(t = 0.4\\) cm.",
          "\\(R^{2} = r^{2} + (R - t)^{2}\\) gives \\(R = \\dfrac{r^{2} + t^{2}}{2t} = \\dfrac{16 + 0.16}{0.8} \\approx 20.2\\) cm, close to \\(r^{2}/2t = 20\\) cm.",
          "\\(f = \\dfrac{R}{\\mu - 1} \\approx \\dfrac{20.2}{0.5} \\approx 40\\) cm.",
        ],
        answer: "R ≈ 20 cm; f ≈ 40 cm.",
      },
      practiceSet: [
        { prompt: "An equiconvex lens of refractive index 1.5 has a focal length of 20 cm. Radius of each face?", answer: "20 cm" },
        { prompt: "A plano-convex lens of refractive index 1.6 has a curved face of radius 18 cm. Focal length?", answer: "30 cm" },
        { prompt: "An equiconvex lens is made of glass of refractive index 1.25. Ratio of its focal length to the radius of each face?", answer: "2" },
        { prompt: "A plano-convex lens (\\(\\mu = 1.5\\)) and a plano-concave lens (\\(\\mu = 1.6\\)), whose curved faces both have radius 30 cm, fit together. Focal length of the pair?", answer: "−300 cm (a weak diverging lens)" },
      ],
      pyqExampleId: "5fea9f2c-8291-4e3f-bcfa-ec93addc000a", // 2026: biconvex 1.5 and plano-concave 1.7 of equal power, R₁ : R₂ = 5 : 2
      traps: [
        {
          title: "R₂ of a biconvex lens is negative",
          body: "Writing both radii as positive in 1/R₁ − 1/R₂ subtracts the curvatures instead of adding them, and f comes out far too long.",
        },
        {
          title: "A flat face has 1/R = 0, not R = 0",
          body: "A plane surface has an infinite radius. Its term 1/R vanishes, so a plano-convex lens has f = R/(μ − 1).",
        },
        {
          title: "μ − 1 is for a lens in air",
          body: "In another medium the factor becomes μ(lens)/μ(medium) − 1. Using μ − 1 for a lens in water gives a focal length that is far too short.",
        },
      ],
    },
  ],
};
