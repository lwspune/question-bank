import type { SubtopicNote } from "@/app/notes/_types";

export const DIFFRACTION_WO_NOTE: SubtopicNote = {
  subtopicName: "Single-Slit Diffraction and Resolving Power",
  title: "Single-Slit Diffraction and Resolving Power",
  oneLineDefinition:
    "A single slit of width a gives dark fringes where a sin θ = nλ, a central bright band twice as wide as the rest, and a round aperture limits how finely a telescope or microscope can separate two points.",
  whyItMatters:
    "Eighteen PYQs, eight of them multiple choice, and four from 2026; eight came in 2024 alone. Eight locate the dark fringes: the distance between two of them, or the slit width that puts one at a given angle. Six ask for the width of the central maximum, two of them by counting the double-slit fringes that fit inside it. Four are about resolving power: a telescope, a microscope in oil and a pinhole.",
  concepts: [
    // C1 — minima
    {
      kind: "formula" as const,
      slug: "jpwo-minima",
      name: "Dark fringes of a single slit",
      intuition:
        "Split the slit into two halves. If the edge-to-edge path difference a sin θ is one wavelength, each point in the top half has a partner in the bottom half exactly half a wave behind, and the pairs cancel. So a sin θ = λ is dark, not bright. That is the reverse of the double slit, where a path of λ gives a bright fringe.",
      definition:
        "- Minima: \\(a\\sin\\theta = n\\lambda\\), n = 1, 2, 3, … (n = 0 is the bright centre).\n" +
        "- On a screen at distance D: \\(y_{n} = \\dfrac{n\\lambda D}{a}\\). First to third minimum (same side): \\(\\dfrac{2\\lambda D}{a}\\).\n" +
        "- Secondary maxima lie roughly halfway: \\(a\\sin\\theta \\approx \\left(n + \\tfrac{1}{2}\\right)\\lambda\\), the first at \\(\\dfrac{3\\lambda}{2}\\).\n" +
        "- For large angles keep \\(\\sin\\theta\\); the small-angle form \\(y = n\\lambda D/a\\) is only for small \\(\\theta\\).\n" +
        "- \"Angular divergence\" of a pair of minima usually means the full angle between them, \\(2\\theta\\); say which reading you use.",
      formula: {
        label: "Single-slit minima",
        latex: "a\\sin\\theta = n\\lambda, \\qquad y_{n} = \\frac{n\\lambda D}{a}, \\qquad y_{3} - y_{1} = \\frac{2\\lambda D}{a}",
      },
      authoredExample: {
        prompt:
          "Light of 500 nm falls on a slit 0.25 mm wide, with the screen 1.5 m away. Find the distances of the first and second minima from the centre, and of the first secondary maximum.",
        steps: [
          "\\(\\dfrac{\\lambda D}{a} = \\dfrac{500 \\times 10^{-9} \\times 1.5}{0.25 \\times 10^{-3}} = 3 \\times 10^{-3}\\) m.",
          "First minimum 3 mm; second minimum 6 mm.",
          "First secondary maximum at about \\(1.5 \\times 3 = 4.5\\) mm.",
        ],
        answer: "3 mm, 6 mm and about 4.5 mm.",
      },
      selfCheckExample: {
        prompt:
          "Light of 450 nm, a slit 0.15 mm wide, a screen 1 m away. How far apart are the two second minima on opposite sides of the centre?",
        steps: [
          "\\(y_{2} = \\dfrac{2 \\times 450 \\times 10^{-9} \\times 1}{0.15 \\times 10^{-3}} = 6\\) mm.",
          "Opposite sides: \\(2 \\times 6 = 12\\) mm.",
        ],
        answer: "12 mm",
      },
      practiceSet: [
        { prompt: "λ = 500 nm. Slit width that puts the first minimum at \\(30^{\\circ}\\)?", answer: "1 μm" },
        { prompt: "First to third minimum, in terms of λ, D and a?", answer: "\\(2\\lambda D/a\\)" },
        { prompt: "Wavelengths 600 nm and 602 nm, a = 0.6 mm, D = 1 m. Separation of their first minima?", answer: "About 3.3 μm" },
        { prompt: "Approximate condition for the first secondary maximum?", answer: "\\(a\\sin\\theta = 3\\lambda/2\\)" },
      ],
      pyqExampleId: "b5ba400d-d946-4306-8c3c-40a1b3b79e24", // 2024: 6000 Å, first-to-third minima 3 mm, D = 50 cm → a = 2 × 10⁻⁴ m
      traps: [
        {
          title: "nλ is dark for a single slit",
          body: "In the double slit, a path of nλ is bright. For one slit, a sin θ = nλ is a minimum. Mixing the two puts every fringe in the wrong place.",
        },
        {
          title: "First to third is two steps",
          body: "The first and third minima are 2λD/a apart, not 3λD/a. Subtract positions, do not read off the higher order.",
        },
        {
          title: "Angle of one minimum or the angle between two?",
          body: "\"Angular divergence\" can mean θ or 2θ. Check the options: they often contain both.",
        },
      ],
    },

    // C2 — central maximum
    {
      kind: "formula" as const,
      slug: "jpwo-central-max",
      name: "Width of the central maximum",
      intuition:
        "The central bright band runs from the first dark fringe on one side to the first on the other, so it is twice as wide as the gap between later dark fringes. A narrower slit spreads the light more. In a double slit, each slit's own diffraction sets an envelope, and the interference fringes are seen inside it.",
      definition:
        "- Angular width of the central maximum: \\(\\dfrac{2\\lambda}{a}\\) (small angles).\n" +
        "- Linear width on a screen at D: \\(\\dfrac{2\\lambda D}{a}\\); in the focal plane of a lens of focal length f: \\(\\dfrac{2\\lambda f}{a}\\).\n" +
        "- Each secondary maximum is half as wide: \\(\\dfrac{\\lambda D}{a}\\).\n" +
        "- For large angles use \\(\\sin\\theta = \\lambda/a\\) and double the angle for the full spread.\n" +
        "- Double slit with slits of width a and gap d: the central maximum, \\(2\\lambda D/a\\), holds \\(\\dfrac{2\\lambda D/a}{\\lambda D/d} = \\dfrac{2d}{a}\\) fringe widths. JEE counts this as the number of bright fringes inside it.",
      formula: {
        label: "Central maximum",
        latex: "\\theta_{\\text{width}} = \\frac{2\\lambda}{a}, \\qquad W = \\frac{2\\lambda D}{a}\\ \\left(\\text{or } \\frac{2\\lambda f}{a}\\right), \\qquad N = \\frac{2d}{a}",
      },
      authoredExample: {
        prompt:
          "Light of 450 nm falls on a slit 0.3 mm wide, and the pattern is formed in the focal plane of a lens of focal length 40 cm. Find the angular and linear widths of the central maximum.",
        steps: [
          "Angular width: \\(\\dfrac{2\\lambda}{a} = \\dfrac{2 \\times 450 \\times 10^{-9}}{0.3 \\times 10^{-3}} = 3 \\times 10^{-3}\\) rad.",
          "Linear width: \\(f \\times\\) angular width \\(= 0.4 \\times 3 \\times 10^{-3} = 1.2 \\times 10^{-3}\\) m.",
        ],
        answer: "\\(3 \\times 10^{-3}\\) rad and 1.2 mm.",
      },
      selfCheckExample: {
        prompt:
          "In a double slit the gap is 0.6 mm and each slit is 0.15 mm wide. How many fringe widths fit inside the central diffraction maximum?",
        steps: [
          "Central maximum \\(\\dfrac{2\\lambda D}{a}\\); fringe width \\(\\dfrac{\\lambda D}{d}\\).",
          "Ratio \\(\\dfrac{2d}{a} = \\dfrac{2 \\times 0.6}{0.15} = 8\\).",
        ],
        answer: "8",
      },
      practiceSet: [
        { prompt: "λ = 600 nm, a = 0.3 mm. Angular width of the central maximum?", answer: "\\(4 \\times 10^{-3}\\) rad" },
        { prompt: "Width of a secondary maximum compared with the central one?", answer: "Half" },
        { prompt: "The slit is made narrower. The central maximum becomes?", answer: "Wider" },
        { prompt: "Slit gap 0.9 mm. Slit width that fits 6 fringe widths inside the central maximum?", answer: "0.3 mm" },
      ],
      pyqExampleId: "920e4ccf-db8d-468d-a01e-992457a465a4", // 2024: 6000 Å, a = 0.01 mm, f = 20 cm → 24 mm
      traps: [
        {
          title: "Twice λD/a, not λD/a",
          body: "The central maximum spans from the first minimum on one side to the first on the other: 2λD/a. The single-step λD/a is the width of a secondary maximum.",
        },
        {
          title: "a, not d",
          body: "The single-slit width a sets the envelope; the gap d sets the double-slit fringes. Using λD/d for a central maximum mixes the two patterns.",
        },
        {
          title: "Large angles need the sine",
          body: "When λ/a is not small, as with microwaves on a slit a few wavelengths wide, find θ from sin θ = λ/a and double it.",
        },
      ],
    },

    // C3 — resolving power
    {
      kind: "formula" as const,
      slug: "jpwo-resolving",
      name: "Resolving power of a telescope and a microscope",
      intuition:
        "A round lens is a round hole, so it spreads each point of light into a small disc. Two stars can be told apart only if their discs do not overlap too much. A wider lens makes smaller discs, and shorter light does the same. A microscope gains from oil under the lens, which shortens the wavelength in the gap.",
      definition:
        "- Circular aperture of diameter D: first dark ring at \\(\\sin\\theta = \\dfrac{1.22\\lambda}{D}\\).\n" +
        "- Telescope: limit of resolution \\(\\Delta\\theta = \\dfrac{1.22\\lambda}{D}\\); resolving power is \\(\\dfrac{1}{\\Delta\\theta}\\). A bigger objective resolves finer detail.\n" +
        "- Microscope: resolving power \\(\\dfrac{2\\mu\\sin\\theta}{1.22\\lambda}\\). Oil of index μ multiplies it by μ.\n" +
        "- Smallest separation resolved at distance R: \\(R\\,\\Delta\\theta\\).\n" +
        "- A larger pinhole gives a smaller, brighter diffraction pattern.",
      formula: {
        label: "Resolution",
        latex: "\\Delta\\theta = \\frac{1.22\\lambda}{D}, \\qquad \\text{RP}_{\\text{microscope}} = \\frac{2\\mu\\sin\\theta}{1.22\\lambda}",
      },
      authoredExample: {
        prompt:
          "A telescope has an objective 1.5 m across and is used with light of 600 nm. Find its limit of resolution, and the smallest separation it can resolve on the Moon, \\(3.8 \\times 10^{8}\\) m away.",
        steps: [
          "\\(\\Delta\\theta = \\dfrac{1.22 \\times 600 \\times 10^{-9}}{1.5} = 4.88 \\times 10^{-7}\\) rad.",
          "On the Moon: \\(3.8 \\times 10^{8} \\times 4.88 \\times 10^{-7} \\approx 185\\) m.",
        ],
        answer: "\\(4.88 \\times 10^{-7}\\) rad; about 185 m.",
      },
      selfCheckExample: {
        prompt:
          "What objective diameter is needed to resolve \\(2.0 \\times 10^{-7}\\) rad with light of 600 nm?",
        steps: [
          "\\(D = \\dfrac{1.22\\lambda}{\\Delta\\theta} = \\dfrac{1.22 \\times 600 \\times 10^{-9}}{2.0 \\times 10^{-7}}\\).",
          "\\(D = 3.66\\) m.",
        ],
        answer: "3.66 m",
      },
      practiceSet: [
        { prompt: "The objective diameter is doubled. The limit of resolution?", answer: "Halves" },
        { prompt: "A microscope is moved from air into oil of μ = 1.5. Its resolving power?", answer: "1.5 times as large" },
        { prompt: "Eye pupil 2 mm, light of 600 nm. Limit of resolution?", answer: "\\(3.66 \\times 10^{-4}\\) rad" },
        { prompt: "Blue or red light: which gives the finer resolution?", answer: "Blue (shorter wavelength)" },
      ],
      pyqExampleId: "fafde436-ac8c-4b1c-ad04-335e486db7f2", // 2026: 500 nm, 5 × 10⁻⁷ rad → objective 122 cm
      traps: [
        {
          title: "Limit and power are opposites",
          body: "The limit of resolution is an angle, 1.22λ/D; smaller is better. The resolving power is its reciprocal; larger is better.",
        },
        {
          title: "Keep the 1.22",
          body: "A round aperture gives 1.22λ/D, not λ/D. Dropping the factor lands on a distractor about 20% off.",
        },
        {
          title: "Oil helps a microscope, not a telescope",
          body: "The microscope's resolving power has μ in it, so oil raises it. A telescope's limit depends only on λ and the objective diameter.",
        },
      ],
    },
  ],
};
