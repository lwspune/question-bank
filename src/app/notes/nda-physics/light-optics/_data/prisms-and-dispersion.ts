import type { SubtopicNote } from "@/app/notes/_types";

export const PRISMS_AND_DISPERSION_NOTE: SubtopicNote = {
  subtopicName: "Prisms and Dispersion",
  title: "Prisms and Dispersion",
  oneLineDefinition:
    "A prism refracts light twice and deviates it toward the base. White light splits into a spectrum because the glass refracts each colour by a different amount — violet (shortest wavelength, highest refractive index) bends most, red bends least. A rainbow is dispersion plus internal reflection inside water drops.",
  whyItMatters:
    "Eight PYQs that cluster on one idea: the order of deviation in a prism. The recurring tests are which colour deviates most (violet/blue) and least (red), WHY (refractive index, not reflection), the standard ray-path figure, and the make-up of a rainbow. Almost every question is settled by the single rule 'violet bends most'.",
  concepts: [
    // 1 — FOUNDATION: refraction through a prism + deviation
    {
      kind: "formula" as const,
      slug: "refraction-through-a-prism",
      name: "Refraction through a prism and deviation",
      intuition:
        "A prism is a wedge of glass with two slanted faces. Light entering bends toward the normal at the first face and away from the normal at the second — both bends turn the ray the same way, toward the thick base of the prism. The total turning is the angle of deviation.",
      definition:
        "Light passing through a prism refracts at **both** faces and emerges **deviated toward the base**. The total turn is the **angle of deviation** \\(\\delta\\).\n" +
        "- It depends on the angle of incidence, the prism angle \\(A\\), and the refractive index.\n" +
        "- The deviation is a **minimum** at one symmetric angle (the angle of minimum deviation, \\(\\delta_m\\)), where \\(n = \\dfrac{\\sin\\!\\left(\\frac{A + \\delta_m}{2}\\right)}{\\sin\\!\\left(\\frac{A}{2}\\right)}\\).\n" +
        "The bending is **refraction** (a speed change at each face), not reflection.",
      visualizationSlug: "opt-prism-dispersion",
      authoredExample: {
        prompt:
          "Trace what happens to a single ray of light entering one slanted face of a glass prism. Which way does it ultimately turn?",
        steps: [
          "Entering the denser glass, the ray bends toward the normal at the first face.",
          "Leaving into air at the second face, it bends away from the normal.",
          "Both refractions turn the ray the same way — toward the base of the prism.",
        ],
        answer: "It refracts at both faces and deviates toward the base of the prism.",
      },
      selfCheckExample: {
        prompt:
          "Is the deviation of a ray by a glass prism caused by reflection or refraction of light?",
        steps: [
          "The ray's path bends because its speed changes as it crosses the glass-air boundaries.",
          "A speed change at a boundary is refraction, not reflection.",
        ],
        answer: "Refraction.",
      },
      practiceSet: [
        { prompt: "A prism deviates light toward its apex or its base?", answer: "Base" },
        { prompt: "How many times does a ray refract passing through a prism?", answer: "Twice (once at each face)" },
        { prompt: "Prism deviation is caused by reflection or refraction?", answer: "Refraction" },
        { prompt: "At minimum deviation, the ray inside the prism is…", answer: "Parallel to the base (symmetric path)" },
      ],
      pyqExampleId: "de6408d2-3b8b-4c0d-9763-8fe65b305c5d", // 2021 — correct ray path through prism (figure a)
      traps: [
        {
          title: "Deviation is refraction, not reflection",
          body:
            "A prism bends light because it refracts at each face. Options blaming 'reflection' for the deviation or the colour spread are wrong — both are refraction effects.",
        },
      ],
    },

    // 2 — dispersion
    {
      kind: "formula" as const,
      slug: "dispersion-of-white-light",
      name: "Dispersion — why violet bends most",
      intuition:
        "White light is a mix of colours, and the glass refracts each colour by a slightly different amount. Violet has the shortest wavelength and the highest refractive index in glass (so the slowest speed there), so it bends the most. Red has the longest wavelength, the lowest index, the highest speed in glass — so it bends the least. That spread of bend angles is dispersion.",
      definition:
        "**Dispersion** is the splitting of white light into its component colours (VIBGYOR) by a prism.\n" +
        "- A medium's refractive index is **highest for violet, lowest for red** — so violet's speed in glass is the lowest and red's the highest.\n" +
        "- Hence **violet deviates the most, red the least**.\n" +
        "- The cause is **refraction** (wavelength-dependent index), not reflection.\n" +
        "- Order of increasing deviation: Red < Orange < Yellow < Green < Blue < Violet.",
      authoredExample: {
        prompt:
          "When white light passes through a glass prism, which colour deviates the most, and why?",
        steps: [
          "Violet has the shortest wavelength of visible light.",
          "Glass has its highest refractive index for violet (so violet travels slowest in glass).",
          "A higher refractive index means a larger bend, so violet deviates the most.",
        ],
        answer: "Violet — because the glass's refractive index is greatest (and its speed lowest) for violet.",
      },
      selfCheckExample: {
        prompt:
          "In the dispersion of white light by a prism, which colour deviates the most and what is the correct reason about its speed in the prism?",
        steps: [
          "Blue/violet have the shortest wavelengths and the highest refractive index in glass.",
          "Highest index means the lowest speed in the prism.",
          "Lowest speed ⟹ greatest bending ⟹ greatest deviation.",
        ],
        answer: "Blue/violet deviates the most because it has the lowest speed in the prism.",
      },
      practiceSet: [
        { prompt: "Which colour deviates the most through a prism?", answer: "Violet" },
        { prompt: "Which colour deviates the least?", answer: "Red" },
        { prompt: "Glass has its highest refractive index for which colour?", answer: "Violet" },
        { prompt: "Which colour travels fastest inside the glass prism?", answer: "Red" },
      ],
      pyqExampleId: "8f1edc39-1cd8-48fb-8db6-c707d4abe00c", // 2023 — blue deviates most, lowest speed in prism
      traps: [
        {
          title: "Violet bends most because its speed in glass is LOWEST",
          body:
            "The chain is: shortest wavelength → highest refractive index in glass → lowest speed in glass → greatest deviation. Distractors flip the speed ('highest speed') or swap red and violet. Red is the fast, least-bent one.",
        },
      ],
    },

    // 3 — rainbow
    {
      kind: "formula" as const,
      slug: "rainbow-formation",
      name: "The rainbow",
      intuition:
        "A rainbow is the sky's prism: each raindrop refracts sunlight on the way in, reflects it once off the back, and refracts it again on the way out — splitting the light into colours. The primary rainbow uses one internal reflection and is the brighter, inner bow; the secondary uses two reflections, is dimmer, and sits outside with the colours reversed.",
      definition:
        "A **rainbow** forms by **dispersion in water droplets**:\n" +
        "- **Primary rainbow:** sunlight undergoes **refraction → one internal reflection → refraction** inside each drop. It is the **inner** (lower) bow, brighter, with red on the outside.\n" +
        "- **Secondary rainbow:** involves **two** internal reflections, is fainter, sits **outside** the primary, with colours reversed.\n" +
        "So the rainbow is fundamentally a **dispersion** phenomenon (refraction + internal reflection combined), not simple reflection.",
      authoredExample: {
        prompt:
          "Which statements about the PRIMARY rainbow are correct? (1) It involves refraction and one internal reflection of sunlight. (2) It involves refraction of sunlight only. (3) It is the inner bow. (4) It may involve more than one internal reflection.",
        steps: [
          "Primary rainbow = refraction (entry) + ONE internal reflection + refraction (exit) → (1) is correct.",
          "It is NOT refraction only — internal reflection is involved → (2) is wrong.",
          "It is the inner/lower bow compared to the secondary → (3) is correct.",
          "More than one internal reflection describes the SECONDARY rainbow → (4) is wrong.",
        ],
        answer: "Statements 1 and 3 are correct.",
      },
      selfCheckExample: {
        prompt:
          "A rainbow in the sky is produced primarily by which optical phenomenon?",
        steps: [
          "Sunlight enters water droplets and is split into colours.",
          "Splitting white light into its colours is dispersion (refraction + internal reflection).",
        ],
        answer: "Dispersion of light.",
      },
      practiceSet: [
        { prompt: "A rainbow is produced by which phenomenon?", answer: "Dispersion of light" },
        { prompt: "How many internal reflections form a primary rainbow?", answer: "One" },
        { prompt: "Is the primary rainbow the inner or outer bow?", answer: "Inner (lower) bow" },
        { prompt: "The secondary rainbow involves how many internal reflections?", answer: "Two" },
      ],
      pyqExampleId: "b216b6b0-eb4a-4913-8318-cf204da482fc", // 2024 — primary rainbow: 1 internal reflection, inner bow
      traps: [
        {
          title: "Primary rainbow = ONE internal reflection (the inner bow)",
          body:
            "The primary bow has exactly one internal reflection and is the inner bow; two reflections make the fainter secondary (outer) bow. 'Refraction only' is wrong — reflection is always part of it.",
        },
      ],
    },
  ],
};
