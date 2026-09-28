import type { SubtopicNote } from "@/app/notes/_types";

const BASE = "/notes/mht-cet-physics/ray-optics";

export const INSTRUMENTS_NOTE: SubtopicNote = {
  subtopicName: "Optical Instruments — Microscope and Telescope",
  title: "The Microscope and the Telescope",
  oneLineDefinition:
    "A compound microscope magnifies by (v₀/u₀)(D/fₑ) with a short-focus objective near the object, a telescope in normal adjustment by f₀/fₑ with a tube f₀ + fₑ long, and a telescope's large objective aperture is for resolving fine detail.",
  whyItMatters:
    "6 PYQs, one HARD: the objective's object distance from a microscope's length and magnification, a telescope's eyepiece from its length, why a telescope needs a large aperture, what a microscope objective looks like, and how a simple magnifier changes from blue light to red. One card.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cetp-ro-instruments",
      name: "Magnifying Power and Resolution",
      intuition:
        "A simple magnifier gives D/f (relaxed eye); red light has a lower index, a longer focal length and so less magnification than blue. A compound microscope's objective has a short focal length and a small aperture; for a relaxed eye its magnification is (v₀/u₀)(D/fₑ) and its length is v₀ + fₑ. An astronomical telescope in normal adjustment magnifies f₀/fₑ and is f₀ + fₑ long. A large objective aperture gathers more light and, above all, resolves finer detail — resolving power grows with the aperture.",
      definition:
        "- Simple magnifier: \\(M = \\dfrac{D}{f}\\) (D = 25 cm); red light ⇒ smaller M than blue.\n" +
        "- Compound microscope, relaxed eye: \\(M = \\dfrac{v_0}{u_0}\\cdot\\dfrac{D}{f_e}\\), length \\(L = v_0 + f_e\\) (L = 15, fₑ = 6, M = 25 ⇒ \\(u_0 = 1.5\\) cm).\n" +
        "- Telescope, normal adjustment: \\(M = \\dfrac{f_0}{f_e}\\), \\(L = f_0 + f_e\\) (1.5 m, 1.56 m ⇒ \\(f_e = 0.06\\) m).\n" +
        "- Large telescope aperture: higher **resolution** (RP ∝ aperture/λ).",
      formula: {
        label: "Magnifying power",
        latex: "M_{\\text{micro}} = \\frac{v_0}{u_0}\\cdot\\frac{D}{f_e}, \\qquad M_{\\text{tele}} = \\frac{f_0}{f_e}",
      },
      authoredExample: {
        prompt: "A compound microscope is 20 cm long with an eyepiece of focal length 5 cm, relaxed eye. Its objective forms the image 15 cm away from an object 1 cm in front. Magnifying power?",
        steps: ["v₀ = 20 − 5 = 15 cm; v₀/u₀ = 15.", "M = 15 × 25/5 = 75."],
        answer: "75",
      },
      selfCheckExample: {
        prompt: "A telescope has f₀ = 1 m and fₑ = 5 cm, normal adjustment. Magnifying power and length?",
        steps: ["f₀/fₑ; f₀ + fₑ."],
        answer: "20; 105 cm",
      },
      practiceSet: [
        { prompt: "Why does a telescope objective have a large aperture?", answer: "For greater resolution" },
        { prompt: "Simple microscope used with red instead of blue light. Magnifying power?", answer: "Decreases" },
      ],
      pyqExampleId: "efeab964-efdd-4908-af62-ae0c8715c4e1",
      traps: [
        {
          title: "Thinking a large aperture raises the magnification",
          body:
            "Magnification is set by focal lengths. A large aperture collects more light and resolves finer detail.",
        },
        {
          title: "Using the full tube length as the objective's image distance",
          body:
            "For a relaxed eye the intermediate image sits at the eyepiece's focus, so v₀ = L − fₑ.",
        },
      ],
    },
  ],
  related: [
    { label: "Lenses — the lens formula behind each instrument", href: `${BASE}/cetp-ro-lenses` },
  ],
};
