import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/ray-optics";

export const REFRACTION_NOTE: SubtopicNote = {
  subtopicName: "Refraction, Apparent Depth, and Total Internal Reflection",
  title: "Refraction, Apparent Depth and Total Internal Reflection",
  oneLineDefinition:
    "Light entering a denser medium slows to c/μ and bends toward the normal, sin i = μ sin r; an object under a medium appears raised to its real depth divided by μ; and light going from denser to rarer is totally reflected once its angle of incidence exceeds the critical angle sin⁻¹(1/μ).",
  whyItMatters:
    "26 PYQs, 7 of them HARD — the largest page in the chapter. Eight apply Snell's law — the index from a speed, the deviation on entering a slab, the angle when reflected and refracted rays are perpendicular. " +
    "Nine are apparent depth through one or several layers, a bubble in a cube or a slab on an ink mark; nine are total internal reflection. Three cards.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ro-snell",
      name: "Snell's Law and the Refractive Index",
      intuition:
        "The refractive index μ = c/v says how much light slows; a 20% slower speed means μ = 1/0.8 = 1.25. Snell's law, sin i = μ sin r, bends the ray toward the normal; for small angles i ≈ μr, so the deviation i − r is i(1 − 1/μ). Between two media the relative index is the ratio of speeds. The optical path μd is the distance light would cover in vacuum in the same time, so equal times through two materials mean equal μd. When i = 2r, μ = sin 2r / sin r = 2 cos r.",
      definition:
        "- \\(\\mu = \\dfrac{c}{v}\\); \\(\\sin i = \\mu\\sin r\\); relative index \\(_1\\mu_2 = \\dfrac{v_1}{v_2}\\).\n" +
        "- Small angles: deviation \\(i - r = i\\left(1 - \\dfrac{1}{\\mu}\\right)\\) (speed down 25% ⇒ i/4).\n" +
        "- Deviation δ at one surface: \\(\\dfrac{1}{\\mu} = \\cos\\delta - \\dfrac{\\sin\\delta}{\\tan i}\\).\n" +
        "- Optical path \\(\\mu d\\): 3 cm of 1.6 = 3.84 cm of 1.25. Same time in slab and air ⇒ \\(d_{\\text{air}} = \\mu t\\).\n" +
        "- \\(i = 2r\\) ⇒ \\(i = 2\\cos^{-1}\\dfrac{\\mu}{2}\\).",
      formula: {
        label: "Snell's law",
        latex: "\\sin i = \\mu\\sin r, \\qquad \\mu = \\frac{c}{v}",
      },
      authoredExample: {
        prompt: "Light enters water (μ = 4/3) from air at 53°. Angle of refraction? (sin 53° = 0.8)",
        steps: ["sin r = 0.8/(4/3) = 0.6.", "r = 37°."],
        answer: "37°",
      },
      selfCheckExample: {
        prompt: "Light travels at 2 × 10⁸ m/s in a glass. Its refractive index?",
        steps: ["μ = c/v."],
        answer: "1.5",
      },
      practiceSet: [
        { prompt: "Speed falls by 20% on entering a slab at a small angle i. Deviation?", answer: "i/5" },
      ],
      pyqExampleId: "32f3fab2-9278-4fe5-b598-b89b98430c05",
      traps: [
        {
          title: "Taking μ as the fraction of speed kept",
          body:
            "Speed reduced by 25% means v = 0.75c and μ = 1/0.75 = 4/3 — not 0.75.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ro-apparent-depth",
      name: "Apparent Depth and Normal Shift",
      intuition:
        "Looking straight down into a medium, an object at real depth d appears at d/μ, raised by d(1 − 1/μ). Layers add their apparent depths: d₁/μ₁ + d₂/μ₂. A slab of thickness t on an ink mark raises it by x = t(1 − 1/μ), so t = μx/(μ − 1). A bubble inside a cube, viewed from both faces, gives two equations d/μ and (L − d)/μ, and their sum fixes μ. A mirror at the bottom of a liquid puts the image of an object h above it at h below the mirror; the observer sees both through the liquid, so their apparent separation is 2h/μ.",
      definition:
        "- Apparent depth \\(\\dfrac{d}{\\mu}\\); normal shift \\(d\\left(1 - \\dfrac{1}{\\mu}\\right)\\) (4.8 cm of 1.5 ⇒ 1.6 cm).\n" +
        "- Layers: \\(\\sum \\dfrac{d_i}{\\mu_i}\\) (3, 4, 6 cm of 3/2, 4/3, 6/5 ⇒ 10 cm).\n" +
        "- Slab on a mark: \\(t = \\dfrac{\\mu x}{\\mu - 1}\\).\n" +
        "- Bubble in a cube of side L: \\(\\dfrac{d}{\\mu} + \\dfrac{L - d}{\\mu} = \\text{sum of the two readings}\\) (24 cm, 10 + 6 ⇒ μ = 1.5, d = 15 cm).",
      formula: {
        label: "Apparent depth",
        latex: "d_{\\text{app}} = \\frac{d}{\\mu}, \\qquad \\text{shift} = d\\left(1 - \\frac{1}{\\mu}\\right)",
      },
      authoredExample: {
        prompt: "A container 30 cm tall should look half full of water (μ = 4/3) from above. Water depth?",
        steps: ["Apparent depth 15 cm = d/μ.", "d = 15 × 4/3 = 20 cm."],
        answer: "20 cm",
      },
      selfCheckExample: {
        prompt: "A tank holds 40 cm of water (μ = 4/3). Apparent depth when viewed from above?",
        steps: ["40 × 3/4."],
        answer: "30 cm",
      },
      practiceSet: [
        { prompt: "40 cm of μ = 1.6 on 30 cm of μ = 1.5. Apparent depth?", answer: "45 cm" },
      ],
      pyqExampleId: "b2d215c3-7795-41d1-9557-832973fcb7c8",
      traps: [
        {
          title: "Multiplying by μ instead of dividing",
          body:
            "Objects in a denser medium look NEARER. Apparent depth is the real depth divided by μ.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cetp-ro-total-internal-reflection",
      name: "Total Internal Reflection",
      intuition:
        "Going from denser to rarer, the ray bends away from the normal, and at the critical angle sin C = 1/μ (or μ₂/μ₁ between two media) it grazes the surface; beyond that, all the light reflects. Two conditions, then: denser to rarer, and i > C. Blue light has a higher index than red, so a smaller critical angle: when green is just totally reflected, violet, indigo and blue are too. Glass to air has the smallest critical angle among common pairs. A source at depth h is hidden by a floating disc of radius h tan C = h/√(μ² − 1). Mirages, a diamond's sparkle and optical fibres rely on it; the apparent depth of a pond does not.",
      definition:
        "- Conditions: **denser → rarer** and **i > C**; \\(\\sin C = \\dfrac{1}{\\mu} = \\dfrac{\\mu_2}{\\mu_1} = \\dfrac{v_1}{v_2}\\).\n" +
        "- Speeds 1.5 and 2 × 10⁸ m/s ⇒ \\(C = \\sin^{-1}\\dfrac{3}{4}\\).\n" +
        "- Blue has the smallest C; with green just reflected, VIB are reflected too.\n" +
        "- Hiding disc: \\(r = h\\tan C = \\dfrac{h}{\\sqrt{\\mu^2 - 1}}\\).\n" +
        "- Reflected ⟂ refracted (denser to rarer): \\(C = \\sin^{-1}(\\tan r)\\).",
      formula: {
        label: "Critical angle",
        latex: "\\sin C = \\frac{1}{\\mu}, \\qquad r_{\\text{disc}} = \\frac{h}{\\sqrt{\\mu^2 - 1}}",
      },
      authoredExample: {
        prompt: "A lamp is 4 cm below water (μ = 4/3). Radius of the smallest disc on the surface that hides it?",
        steps: ["μ² − 1 = 16/9 − 1 = 7/9.", "r = 4/√(7/9) = 12/√7 ≈ 4.5 cm."],
        answer: "≈ 4.5 cm",
      },
      selfCheckExample: {
        prompt: "A glass has μ = √2. Its critical angle with air?",
        steps: ["sin C = 1/√2."],
        answer: "45°",
      },
      practiceSet: [
        { prompt: "Which is NOT due to total internal reflection: mirage, diamond's brilliance, a pond looking shallow, optical fibre?", answer: "A pond looking shallow" },
        { prompt: "Critical angle glass→air is least for which colour?", answer: "Blue (violet end)" },
      ],
      pyqExampleId: "71c369f4-14fb-4e7f-a43d-ff5617feafa0",
      traps: [
        {
          title: "Allowing total internal reflection from rarer to denser",
          body:
            "Entering a denser medium the ray bends toward the normal and always gets through. Total internal reflection needs denser to rarer.",
        },
        {
          title: "Giving red the smaller critical angle",
          body:
            "Red has the smallest refractive index, so the LARGEST critical angle. Blue and violet are totally reflected first.",
        },
      ],
    },
  ],
  related: [
    { label: "Mirrors", href: `${BASE}/cetp-ro-mirrors` },
    { label: "Prism — refraction twice", href: `${BASE}/cetp-ro-prism` },
  ],
};
