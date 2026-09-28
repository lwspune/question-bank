import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/ray-optics";

export const MIRRORS_NOTE: SubtopicNote = {
  subtopicName: "Mirrors and Image Formation",
  title: "Mirrors",
  oneLineDefinition:
    "A spherical mirror of focal length f = R/2 forms an image where 1/v + 1/u = 1/f, with magnification −v/u; a plane mirror gives an erect image of the same size, and two plane mirrors at an angle θ give 360°/θ − 1 images.",
  whyItMatters:
    "5 PYQs, one HARD: the object distance for a real image n times larger, the speed of an object read from its image's motion in a convex mirror, the number of images between two mirrors, a plane mirror's magnification, and a half-covered mirror. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ro-mirrors",
      name: "The Mirror Formula and Plane Mirrors",
      intuition:
        "With the Cartesian sign convention the mirror formula is 1/v + 1/u = 1/f and the magnification is −v/u. A real image n times the size of the object means v = nu (both in front), so u = (n + 1)f/n. For a convex mirror, the formula turns an image position into an object position, so a moving image gives the object's speed. A plane mirror has magnification +1. Two plane mirrors at θ form 360°/θ − 1 images: three images at 90°. Covering half a mirror leaves every point of the image formed by the rest of the mirror, so the image is complete but dimmer.",
      definition:
        "- \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\), \\(f = \\dfrac{R}{2}\\), \\(m = -\\dfrac{v}{u}\\).\n" +
        "- Real image n times larger: \\(u = \\dfrac{(n + 1)f}{n}\\).\n" +
        "- Plane mirror: m = +1. Two mirrors at θ: \\(\\dfrac{360^\\circ}{\\theta} - 1\\) images (90° ⇒ 3).\n" +
        "- Half the mirror covered: full image, lower intensity.",
      formula: {
        label: "Mirror formula",
        latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}, \\qquad m = -\\frac{v}{u}",
      },
      authoredExample: {
        prompt: "An object is 30 cm in front of a concave mirror of focal length 20 cm. Image position and magnification?",
        steps: ["1/v = 1/f − 1/u = −1/20 + 1/30 = −1/60 (u = −30, f = −20).", "v = −60 cm (real, in front); m = −v/u = −2."],
        answer: "60 cm in front; magnification −2",
      },
      selfCheckExample: {
        prompt: "Two plane mirrors meet at 60°. Number of images of an object between them?",
        steps: ["360/60 − 1."],
        answer: "5",
      },
      practiceSet: [
        { prompt: "Lower half of a concave mirror is covered. The image?", answer: "Complete, but less bright" },
      ],
      pyqExampleId: "d54603d9-9feb-4994-8f69-e0edf6ed23af",
      traps: [
        {
          title: "Thinking a half-covered mirror forms half an image",
          body:
            "Every part of the mirror receives light from every point of the object. Covering half removes half the light, not half the picture.",
        },
      ],
    },
  ],
  related: [
    { label: "Refraction — light entering a denser medium", href: `${BASE}/cetp-ro-refraction` },
  ],
};
