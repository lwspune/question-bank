import type { SubtopicNote } from "@/app/notes/_types";

export const LENSES_AND_LENS_FORMULA_NOTE: SubtopicNote = {
  subtopicName: "Lenses and Lens Formula",
  title: "Lenses and the Lens Formula",
  oneLineDefinition:
    "A lens refracts light through two curved surfaces: a convex (converging) lens bends rays together, a concave (diverging) lens spreads them apart. The lens formula 1/v − 1/u = 1/f, power P = 1/f in dioptres, the lens maker's equation, and magnification together fix every image.",
  whyItMatters:
    "Twelve PYQs, and the bank's cleanest source of numeric marks — power calculations and combinations appear almost every year. The recurring tests are: P = 1/f (with f in metres), adding powers for lenses in contact, the lens maker's equation, the New Cartesian sign convention, and the fixed fact that a concave lens only ever gives a virtual, erect, diminished image. All three HARD questions in the chapter involving lenses sit here.",
  concepts: [
    // 1 — FOUNDATION: lens types and behaviour
    {
      kind: "formula" as const,
      slug: "lens-types-and-behaviour",
      name: "Convex and concave lenses",
      intuition:
        "A convex lens is thick in the middle and squeezes parallel rays to a point — it converges light and can make real images. A concave lens is thin in the middle and fans rays apart — it diverges light and can only ever make a virtual, smaller, upright image. That single fact about the concave lens settles a surprising number of questions.",
      definition:
        "- **Convex (converging) lens:** thicker at the centre; brings parallel rays to a real focus. It can form **real or virtual** images, and images **larger, equal, or smaller** than the object, depending on object position.\n" +
        "- **Concave (diverging) lens:** thinner at the centre; spreads parallel rays so they appear to come from a virtual focus. It **always** forms a **virtual, erect, diminished** image — never a real one.\n" +
        "A convex lens can spread out a beam of sunlight (it refracts the rays toward a focus and beyond); a plane mirror cannot.",
      visualizationSlug: "opt-convex-lens-rays",
      authoredExample: {
        prompt:
          "State which statement is NOT correct: (i) a convex lens can produce both real and virtual images; (ii) a concave lens can produce both real and virtual images; (iii) a concave lens always produces a diminished image.",
        steps: [
          "A convex lens does produce real images (object beyond f) and virtual images (object inside f) — (i) is correct.",
          "A concave lens can NEVER produce a real image — it always gives a virtual one — so (ii) is the incorrect statement.",
          "A concave lens always gives a diminished image — (iii) is correct.",
        ],
        answer: "Statement (ii) is NOT correct — a concave lens produces only virtual images.",
      },
      selfCheckExample: {
        prompt:
          "Which device can spread the light energy from the Sun over a larger area: a plane mirror, a convex lens, or a concave lens?",
        steps: [
          "A plane mirror just reflects rays without converging or spreading them as a beam.",
          "A convex lens refracts parallel sunlight to a focus and the rays then diverge beyond it, spreading the light.",
          "So a convex lens is the answer.",
        ],
        answer: "A convex lens.",
      },
      practiceSet: [
        { prompt: "A converging lens is convex or concave?", answer: "Convex" },
        { prompt: "Can a concave lens ever form a real image?", answer: "No, only virtual" },
        { prompt: "Nature of every concave-lens image?", answer: "Virtual, erect, diminished" },
        { prompt: "Which lens is thicker at the centre?", answer: "Convex" },
      ],
      pyqExampleId: "b32c44eb-6961-4e55-9d08-7315e860e1a9", // 2019 — concave lens does NOT make real images
      traps: [
        {
          title: "A concave lens has no real-image setting",
          body:
            "Unlike a concave MIRROR (which gives real images for most positions), a concave LENS gives a virtual, erect, diminished image for EVERY object position. Any claim that a concave lens makes real images is the wrong statement.",
        },
      ],
    },

    // 2 — lens formula + sign convention
    {
      kind: "formula" as const,
      slug: "lens-formula-and-sign-convention",
      name: "Lens formula and the sign convention",
      intuition:
        "The lens formula links object distance, image distance and focal length, just like the mirror formula but with a minus sign in a different place. The New Cartesian convention does the bookkeeping: measure everything from the optic centre, take the incident-light direction as positive, and a convex lens gets a positive focal length while a concave lens gets a negative one.",
      definition:
        "**Lens formula:** \\(\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}\\) (New Cartesian sign convention; distances measured from the optic centre).\n" +
        "- **Convex lens:** \\(f\\) is **positive**. **Concave lens:** \\(f\\) is **negative**.\n" +
        "- The same general FORM \\(1/v \\pm 1/u = 1/f\\) underlies both mirror and lens — the convention differs because light is transmitted (lens) versus reflected (mirror), so the formula 'applies to spherical mirrors as well as spherical lenses'.",
      formula: {
        label: "Lens formula",
        latex: "\\dfrac{1}{v} - \\dfrac{1}{u} = \\dfrac{1}{f}",
        symbols: [
          { symbol: "u", meaning: "object distance from optic centre (−ve for a real object)" },
          { symbol: "v", meaning: "image distance from optic centre" },
          { symbol: "f", meaning: "focal length (+ve convex, −ve concave)" },
        ],
      },
      authoredExample: {
        prompt:
          "An object is placed 30 cm in front of a convex lens of focal length 20 cm. Where is the image formed?",
        steps: [
          "Sign convention: \\(u = -30\\) cm, \\(f = +20\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} + \\dfrac{1}{u} = \\dfrac{1}{20} + \\dfrac{1}{-30} = \\dfrac{3}{60} - \\dfrac{2}{60} = \\dfrac{1}{60}\\).",
          "So \\(v = +60\\) cm — a real image 60 cm beyond the lens.",
        ],
        answer: "\\(v = +60\\) cm (real, on the far side).",
      },
      selfCheckExample: {
        prompt:
          "Under the New Cartesian sign convention, what sign do the focal lengths of a convex lens and a concave lens carry?",
        steps: [
          "A convex lens converges light to a real focus on the far side → focal length is positive.",
          "A concave lens has a virtual focus on the same side as the object → focal length is negative.",
        ],
        answer: "Convex lens: +f. Concave lens: −f.",
      },
      practiceSet: [
        { prompt: "Sign of f for a convex lens?", answer: "Positive" },
        { prompt: "Sign of f for a concave lens?", answer: "Negative" },
        { prompt: "In the lens formula, a real object has what sign of u?", answer: "Negative" },
        { prompt: "Lens formula relating u, v, f?", answer: "1/v − 1/u = 1/f" },
      ],
      pyqExampleId: "d4f3eaa4-b09f-41ad-a459-739f4ac1840c", // 2021 — Cartesian sign convention, formula applies to mirrors AND lenses
      traps: [
        {
          title: "Lens uses 1/v − 1/u; mirror uses 1/v + 1/u",
          body:
            "The two formulae look almost identical — a sign on the 1/u term is the only difference. Mixing them up flips your image distance. Memorise: lens is MINUS, mirror is PLUS.",
        },
      ],
    },

    // 3 — power and dioptre
    {
      kind: "formula" as const,
      slug: "power-of-a-lens",
      name: "Power of a lens — the dioptre",
      intuition:
        "Power tells you how strongly a lens bends light: a short focal length means a powerful lens. Power is just one over the focal length, with the focal length in metres — and it is measured in dioptres. A convex lens has positive power; a concave lens has negative power.",
      definition:
        "**Power** \\(P = \\dfrac{1}{f}\\) with \\(f\\) in **metres**; unit: **dioptre (D)**.\n" +
        "- Convex lens: \\(P > 0\\). Concave lens: \\(P < 0\\).\n" +
        "- A short focal length ⟹ large power (strongly bending).\n" +
        "- Watch the units: f given in cm must be converted to metres first (\\(f\\,\\text{cm} = f/100\\,\\text{m}\\)).",
      formula: {
        label: "Power of a lens",
        latex: "P = \\dfrac{1}{f\\,(\\text{in metres})}",
        symbols: [
          { symbol: "P", meaning: "power (dioptre, D)" },
          { symbol: "f", meaning: "focal length in METRES" },
        ],
      },
      authoredExample: {
        prompt:
          "A convex lens has a focal length of 25 cm. What is its power?",
        steps: [
          "Convert: \\(f = 25\\) cm \\(= 0.25\\) m.",
          "\\(P = 1/f = 1/0.25 = +4\\) D.",
          "Positive because the lens is convex.",
        ],
        answer: "+4 dioptre.",
      },
      selfCheckExample: {
        prompt:
          "The focal length of a concave lens is 0.5 m. What is its power?",
        steps: [
          "A concave lens has a negative focal length: \\(f = -0.5\\) m.",
          "\\(P = 1/f = 1/(-0.5) = -2\\) D.",
        ],
        answer: "−2.0 D.",
      },
      practiceSet: [
        { prompt: "Power of a lens with f = 50 cm?", answer: "+2 D", method: "f = 0.5 m, P = 1/f" },
        { prompt: "Unit of lens power?", answer: "Dioptre (D)" },
        { prompt: "Sign of power for a concave lens?", answer: "Negative" },
        { prompt: "Power of a lens with f = 20 cm?", answer: "+5 D", method: "f = 0.2 m" },
      ],
      pyqExampleId: "593b5a0f-e360-4530-8abd-a8c136ba26d2", // 2021 — f = 25 cm → +4 D
      traps: [
        {
          title: "Convert cm to metres before computing power",
          body:
            "P = 1/f needs f in METRES. f = 25 cm gives P = 1/0.25 = 4 D, not 1/25 = 0.04 D. Forgetting the conversion is the standard power-question trap.",
        },
      ],
    },

    // 4 — lens maker's equation
    {
      kind: "formula" as const,
      slug: "lens-makers-equation",
      name: "Lens maker's equation",
      intuition:
        "How do you build a lens of a chosen focal length? The lens maker's equation says it depends on two things: how much the glass slows light (its refractive index) and how sharply the two faces are curved (their radii). Make the surfaces more curved or the glass more refractive, and you get a more powerful lens.",
      definition:
        "**Lens maker's equation:** \\(\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)\\), for a thin lens in air.\n" +
        "- \\(n\\) is the refractive index of the lens material; \\(R_1, R_2\\) are the radii of curvature of the two faces (signed by convention).\n" +
        "- For a **double convex** lens, \\(R_1 > 0\\) and \\(R_2 < 0\\), so the two terms add.\n" +
        "- Higher \\(n\\) or smaller radii ⟹ shorter focal length ⟹ greater power.",
      formula: {
        label: "Lens maker's equation",
        latex: "\\dfrac{1}{f} = (n - 1)\\left(\\dfrac{1}{R_1} - \\dfrac{1}{R_2}\\right)",
        symbols: [
          { symbol: "n", meaning: "refractive index of the lens material" },
          { symbol: "R_1, R_2", meaning: "radii of curvature of the two faces (signed)" },
          { symbol: "f", meaning: "focal length" },
        ],
      },
      authoredExample: {
        prompt:
          "A double convex lens has faces of radii 20 cm and 20 cm, made of glass with n = 1.5. Find its power.",
        steps: [
          "Double convex: \\(R_1 = +20\\) cm, \\(R_2 = -20\\) cm.",
          "\\(\\dfrac{1}{f} = (1.5 - 1)\\left(\\dfrac{1}{20} - \\dfrac{1}{-20}\\right) = 0.5 \\times \\dfrac{2}{20} = 0.5 \\times \\dfrac{1}{10} = \\dfrac{1}{20}\\,\\text{cm}^{-1}\\).",
          "So \\(f = 20\\) cm \\(= 0.2\\) m, and \\(P = 1/0.2 = +5\\) D.",
        ],
        answer: "f = 20 cm; power = +5 D.",
      },
      selfCheckExample: {
        prompt:
          "The faces of a double convex lens have radii of curvature 10 cm and 20 cm, with glass of refractive index 1.5. Find the power of the lens.",
        steps: [
          "Double convex: \\(R_1 = +10\\) cm, \\(R_2 = -20\\) cm.",
          "\\(\\dfrac{1}{f} = (1.5-1)\\left(\\dfrac{1}{10} - \\dfrac{1}{-20}\\right) = 0.5\\left(\\dfrac{1}{10} + \\dfrac{1}{20}\\right) = 0.5 \\times \\dfrac{3}{20} = \\dfrac{3}{40}\\,\\text{cm}^{-1}\\).",
          "So \\(f = 40/3\\) cm \\(= 0.1333\\) m, and \\(P = 1/f = 7.5\\) D.",
        ],
        answer: "+7.5 D.",
      },
      practiceSet: [
        { prompt: "What two material/shape factors set a lens's focal length?", answer: "Refractive index and the radii of curvature" },
        { prompt: "Does a higher refractive index give a longer or shorter focal length?", answer: "Shorter (more power)" },
        { prompt: "For a double convex lens, R₂ carries which sign?", answer: "Negative" },
        { prompt: "Lens maker's equation: 1/f = ?", answer: "(n − 1)(1/R₁ − 1/R₂)" },
      ],
      pyqExampleId: "b3fc2c1d-7c24-486e-92dc-38d087df0357", // 2017 — lens maker → +7.5 D
      traps: [
        {
          title: "Sign the radii — convex faces are not both positive",
          body:
            "For a double convex lens R₁ is positive but R₂ is negative, so 1/R₁ − 1/R₂ becomes 1/R₁ + 1/|R₂| — the terms ADD. Treating both as the same sign halves your answer.",
        },
      ],
    },

    // 5 — combination of lenses
    {
      kind: "formula" as const,
      slug: "lenses-in-combination",
      name: "Lenses in contact — powers add",
      intuition:
        "Put two thin lenses against each other and they behave like one lens whose strength is just the sum of the two. Because power adds so cleanly, combination problems are almost always faster in power than in focal length — convert each f to a power, add, then convert back if needed.",
      definition:
        "For thin lenses **in contact**, the powers add:\n" +
        "\\[ P = P_1 + P_2 + \\dots = \\dfrac{1}{f_1} + \\dfrac{1}{f_2} + \\dots \\]\n" +
        "and the combined focal length is \\(f = 1/P\\).\n" +
        "- A convex (+) and a concave (−) lens partly cancel; the sign of the net power tells you whether the combination converges (+) or diverges (−).\n" +
        "- Always work in **dioptres** (f in metres) — adding focal lengths directly is wrong.",
      formula: {
        label: "Combination of thin lenses in contact",
        latex: "P = P_1 + P_2, \\qquad f = \\dfrac{1}{P}",
        symbols: [
          { symbol: "P_1, P_2", meaning: "powers of the individual lenses (D)" },
          { symbol: "P", meaning: "power of the combination (D)" },
          { symbol: "f", meaning: "focal length of the combination (m)" },
        ],
      },
      authoredExample: {
        prompt:
          "A convex lens of power +3 D is placed in contact with a concave lens of power −1 D. Find the focal length of the combination.",
        steps: [
          "Powers add: \\(P = +3 + (-1) = +2\\) D.",
          "Combined focal length \\(f = 1/P = 1/2 = 0.5\\) m.",
          "Net power is positive, so the combination is converging.",
        ],
        answer: "+2 D, f = 0.5 m (converging).",
      },
      selfCheckExample: {
        prompt:
          "Two convex lenses of focal lengths 50 cm and 25 cm are placed in contact. Find the net power of the combination.",
        steps: [
          "Convert to powers: \\(P_1 = 100/50 = +2\\) D, \\(P_2 = 100/25 = +4\\) D.",
          "Powers add: \\(P = 2 + 4 = +6\\) D.",
        ],
        answer: "+6 dioptre.",
      },
      practiceSet: [
        { prompt: "Two lenses in contact: do focal lengths or powers add?", answer: "Powers" },
        { prompt: "Net power of +2 D and +2 D in contact?", answer: "+4 D" },
        { prompt: "Combined focal length when net power is +4 D?", answer: "0.25 m", method: "f = 1/P" },
        { prompt: "Net power of +2.5 D and −2.0 D in contact, and its focal length?", answer: "+0.5 D, f = +2.0 m" },
      ],
      pyqExampleId: "56e34968-b430-448f-8167-679ad2d45054", // 2018 — two +2 D → 0.25 m
      traps: [
        {
          title: "Add powers, not focal lengths",
          body:
            "For lenses in contact the POWERS add. Two +2 D lenses give +4 D ⟹ f = 0.25 m, NOT 1 m. Never add focal lengths directly.",
        },
      ],
    },

    // 6 — magnification & image formation
    {
      kind: "formula" as const,
      slug: "lens-magnification-and-images",
      name: "Lens magnification and image formation",
      intuition:
        "Magnification for a lens is image distance over object distance — its sign tells you whether the image is upright or inverted, its size tells you how much bigger or smaller. As with mirrors, get the signs from the convention first, then the arithmetic is straightforward.",
      definition:
        "**Magnification:** \\(m = \\dfrac{h'}{h} = \\dfrac{v}{u}\\) for a lens.\n" +
        "- \\(m > 0\\): virtual, erect image. \\(m < 0\\): real, inverted image.\n" +
        "- \\(|m| > 1\\): magnified; \\(|m| < 1\\): diminished.\n" +
        "Convex-lens image table (object moving in): beyond 2F → real, inverted, diminished (between F and 2F); at 2F → real, inverted, same size; between F and 2F → real, inverted, magnified; at F → at infinity; inside F → virtual, erect, magnified (the magnifying glass).",
      formula: {
        label: "Lens magnification",
        latex: "m = \\dfrac{h'}{h} = \\dfrac{v}{u}",
        symbols: [
          { symbol: "m", meaning: "magnification" },
          { symbol: "v", meaning: "image distance" },
          { symbol: "u", meaning: "object distance" },
        ],
      },
      authoredExample: {
        prompt:
          "A convex lens of focal length 15 cm forms an image of an object placed 30 cm away. Find the image distance and magnification.",
        steps: [
          "\\(u = -30\\) cm, \\(f = +15\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} + \\dfrac{1}{u} = \\dfrac{1}{15} - \\dfrac{1}{30} = \\dfrac{2}{30} - \\dfrac{1}{30} = \\dfrac{1}{30}\\), so \\(v = +30\\) cm.",
          "\\(m = v/u = 30/(-30) = -1\\): real, inverted, same size (object at 2F).",
        ],
        answer: "\\(v = +30\\) cm; \\(m = -1\\) (real, inverted, same size).",
      },
      selfCheckExample: {
        prompt:
          "A concave lens of focal length 10 cm forms an image at a distance of 5 cm from the lens. What is the magnification?",
        steps: [
          "Concave lens: \\(f = -10\\) cm; the image of a concave lens is virtual, so \\(v = -5\\) cm.",
          "From \\(1/v - 1/u = 1/f\\): \\(1/u = 1/v - 1/f = -1/5 - (-1/10) = -1/5 + 1/10 = -1/10\\), so \\(u = -10\\) cm.",
          "\\(m = v/u = (-5)/(-10) = 0.5\\).",
        ],
        answer: "\\(m = 0.5\\) (virtual, erect, diminished — as a concave lens always gives).",
      },
      practiceSet: [
        { prompt: "Lens magnification formula?", answer: "m = v/u" },
        { prompt: "A magnification of −2 for a lens means…", answer: "Real, inverted, twice the size" },
        { prompt: "Object inside the focus of a convex lens — image is…", answer: "Virtual, erect, magnified (magnifying glass)" },
        { prompt: "Object at 2F of a convex lens — image size?", answer: "Same size (m = −1)" },
      ],
      pyqExampleId: "7ec3d1eb-1e5c-413a-968c-244de1da8aaf", // 2022 — concave lens magnification 0.5
      traps: [
        {
          title: "Lens m = v/u (no minus); mirror m = −v/u",
          body:
            "The magnification formula differs by a sign between lens and mirror. For a lens m = v/u; for a mirror m = −v/u. The sign convention then makes both give the right orientation — but use the correct one for the device.",
        },
      ],
    },
  ],
};
