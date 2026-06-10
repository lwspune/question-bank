import type { SubtopicNote } from "@/app/notes/_types";

export const EYE_AND_INSTRUMENTS_NOTE: SubtopicNote = {
  subtopicName: "Human Eye and Optical Instruments",
  title: "The Human Eye and Optical Instruments",
  oneLineDefinition:
    "The eye is a variable-focus converging lens that forms a real, inverted image on the retina; accommodation adjusts its focal length. Its defects (myopia, hypermetropia, presbyopia, cataract) each have a standard correction. Microscopes use two convex lenses; telescopes magnify by f_objective / f_eyepiece.",
  whyItMatters:
    "Thirteen PYQs, mostly recall. The recurring tests are: accommodation as the variable-focus mechanism, the four defects and their corrective lenses (myopia → concave, hypermetropia → convex), the lens-power calculation for a defect, and the microscope/telescope facts — two convex lenses, larger objective focal length in a telescope, and the magnification rules. The one HARD question is a multi-statement microscope-vs-telescope item.",
  concepts: [
    // 1 — the human eye + accommodation (FOUNDATION-style with PYQs)
    {
      kind: "formula" as const,
      slug: "human-eye-and-accommodation",
      name: "The human eye and accommodation",
      intuition:
        "The eye works like a camera with a self-adjusting lens. Light enters through the cornea, passes the pupil (whose size the iris controls), and is focused by the crystalline lens onto the retina, forming a real, inverted, diminished image. To keep near and far objects both in focus, the lens changes its own focal length — that automatic refocusing is called accommodation.",
      definition:
        "The eye is a **converging optical system**: cornea + crystalline lens focus light to a **real, inverted, diminished image on the retina**.\n" +
        "- **Accommodation:** the ciliary muscles change the **shape (and hence focal length)** of the lens, so objects at different distances and illuminations all focus on the retina. The eye is a lens of **variable focal length and variable aperture** (the iris/pupil sets the aperture).\n" +
        "- The eye uses a **converging (convex) lens system** — it is NOT a diverging system.\n" +
        "- **Near point** ≈ 25 cm (least distance of distinct vision); **far point** = infinity for a normal eye.",
      visualizationSlug: "opt-human-eye",
      authoredExample: {
        prompt:
          "Why can a healthy human eye see both a book held close and a distant hill clearly without any external help?",
        steps: [
          "The eye lens can change its shape, and so its focal length, by the action of the ciliary muscles.",
          "For a near object the lens becomes more curved (shorter focal length); for a distant object it flattens.",
          "This automatic refocusing is accommodation, keeping the image on the retina either way.",
        ],
        answer: "Because of accommodation — the lens changes focal length to focus objects at different distances.",
      },
      selfCheckExample: {
        prompt:
          "In what way is the human eye like a camera lens — fixed focal length, or variable focal length and variable aperture?",
        steps: [
          "The eye lens changes its focal length by accommodation.",
          "The iris changes the pupil size, varying the aperture.",
          "So it is a lens of variable focal length and variable aperture.",
        ],
        answer: "Variable focal length and variable aperture.",
      },
      practiceSet: [
        { prompt: "What mechanism lets the eye focus objects at different distances?", answer: "Accommodation" },
        { prompt: "On which part of the eye is the image formed?", answer: "The retina" },
        { prompt: "Is the eye a converging or diverging optical system?", answer: "Converging (convex)" },
        { prompt: "Nature of the image on the retina?", answer: "Real, inverted, diminished" },
      ],
      pyqExampleId: "4b537bbb-f7f0-48f4-8068-6da868b58fa8", // 2022 — accommodation
      traps: [
        {
          title: "The eye is a CONVERGING system, not a diverging one",
          body:
            "The eye focuses light to a real image, so its lens system is convex/converging. Any statement calling the eye a diverging-lens system is the false one.",
        },
      ],
    },

    // 2 — eye defects + corrections (REFERENCE)
    {
      kind: "reference" as const,
      slug: "eye-defects-and-corrections",
      name: "Eye defects and their corrections",
      intuition:
        "Four common defects come up again and again, and each has one standard fix. Myopia (short-sight) can't see far — correct with a concave lens. Hypermetropia (long-sight) can't see near — correct with a convex lens. Presbyopia is age-related loss of accommodation — correct with bifocals. Cataract is a clouded lens — fixed by surgery, not a lens. Learn the four pairings cold.",
      definition:
        "Each defect has a single standard correction. For myopia (far point at distance d), the corrective lens has power \\(P = -1/d\\) (d in metres) — a **concave** lens that shifts the far point back to infinity.",
      table: {
        columns: ["Defect", "Problem", "Correction"],
        rows: [
          {
            cells: ["**Myopia** (short / near-sightedness)", "Cannot see DISTANT objects clearly; image of a distant object focuses BEFORE the retina; far point is finite", "**Concave** (diverging) lens"],
            noteAmber: "Myopia = sees near clearly, far blurred. Power P = −1/(far point in m).",
          },
          { cells: ["**Hypermetropia** (long / far-sightedness)", "Cannot see NEAR objects clearly; image focuses behind the retina", "**Convex** (converging) lens"] },
          { cells: ["**Presbyopia**", "Age-related loss of accommodation; both near and far affected", "**Bifocal** lens"] },
          {
            cells: ["**Cataract**", "Eye lens becomes cloudy/opaque", "**Surgery** (lens replacement) — not a spectacle lens"],
            pyqExampleId: "476d257b-eb32-405d-b966-65ae585e53e1",
          },
        ],
        caption:
          "Myopia → concave, Hypermetropia → convex, Presbyopia → bifocal, Cataract → surgery. The match-list pairing is tested almost every year.",
      },
      selfCheckExample: {
        prompt:
          "A person cannot see objects clearly beyond 2 m. What is the power of the lens needed to correct this defect?",
        steps: [
          "Cannot see distant objects ⟹ myopia; far point is 2 m.",
          "The corrective concave lens must form a virtual image of a distant object at the far point: \\(P = -1/d = -1/2 = -0.5\\) D.",
          "The negative sign confirms a concave (diverging) lens.",
        ],
        answer: "−0.5 D (a concave lens).",
      },
      practiceSet: [
        { prompt: "Myopia is corrected with which type of lens?", answer: "Concave" },
        { prompt: "Hypermetropia is corrected with which type of lens?", answer: "Convex" },
        { prompt: "Which defect is corrected by a bifocal lens?", answer: "Presbyopia" },
        { prompt: "Cataract is corrected by…", answer: "Surgery" },
        { prompt: "Power of the lens to correct myopia with far point 1 m?", answer: "−1 D", method: "P = −1/d" },
      ],
      pyqExampleId: "d6be7f19-d071-476b-80cd-8a6d3625fe16", // 2023 — myopia far point 2 m → −0.5 D
      traps: [
        {
          title: "Myopia → concave; hypermetropia → convex (don't swap)",
          body:
            "Short-sight (myopia) over-converges, so it needs a DIVERGING (concave) lens. Long-sight (hypermetropia) under-converges, so it needs a CONVERGING (convex) lens. Swapping these two is the classic match-list trap.",
        },
        {
          title: "Cataract is surgery, not a lens",
          body:
            "A clouded lens cannot be fixed by spectacles — it needs surgery. In a disease-remedy match list, pair cataract with surgery, never with a lens.",
        },
      ],
    },

    // 3 — microscope & telescope
    {
      kind: "formula" as const,
      slug: "microscope-and-telescope",
      name: "Microscope and telescope",
      intuition:
        "Both instruments use two lenses — an objective near the object and an eyepiece near the eye. A microscope magnifies tiny nearby things, so it wants a SHORT objective focal length. A telescope magnifies distant things, so it wants a LONG objective focal length and a short eyepiece. The telescope's magnification is simply the ratio of those two focal lengths.",
      definition:
        "- **Compound microscope:** two **convex** lenses (objective + eyepiece). Magnification rises as the **objective focal length DECREASES** and as the eyepiece focal length decreases. A short objective focal length is wanted.\n" +
        "- **Refracting telescope:** objective has a **larger focal length and larger aperture** than the eyepiece. Magnification (normal adjustment) \\(M = \\dfrac{f_o}{f_e}\\) — it INCREASES with a larger objective focal length and a smaller eyepiece focal length.\n" +
        "- A **reflecting telescope** (e.g. Newtonian) uses **mirrors only**, no lenses.",
      formula: {
        label: "Telescope magnification (normal adjustment)",
        latex: "M = \\dfrac{f_o}{f_e}",
        symbols: [
          { symbol: "f_o", meaning: "focal length of the objective" },
          { symbol: "f_e", meaning: "focal length of the eyepiece" },
        ],
      },
      authoredExample: {
        prompt:
          "A telescope's objective has focal length 100 cm and its eyepiece 5 cm. What is its magnifying power in normal adjustment?",
        steps: [
          "Use \\(M = f_o / f_e\\).",
          "\\(M = 100 / 5 = 20\\).",
          "So the telescope magnifies 20 times.",
        ],
        answer: "20×.",
      },
      selfCheckExample: {
        prompt:
          "The objective lens of a telescope has focal length 50 cm and the magnification is 25. Find the focal length of the eyepiece.",
        steps: [
          "Normal adjustment: \\(M = f_o / f_e\\).",
          "Rearrange: \\(f_e = f_o / M = 50 / 25 = 2\\) cm.",
        ],
        answer: "2 cm.",
      },
      practiceSet: [
        { prompt: "A compound microscope uses how many convex lenses?", answer: "Two (objective and eyepiece)" },
        { prompt: "In a telescope, which lens has the larger focal length?", answer: "The objective" },
        { prompt: "Telescope magnification formula?", answer: "M = f_objective / f_eyepiece" },
        { prompt: "Which telescope uses only mirrors?", answer: "Newtonian (reflecting) telescope" },
        { prompt: "To increase microscope magnification, the objective focal length should be…", answer: "Smaller" },
      ],
      pyqExampleId: "cdb36ebb-1393-496c-86b4-3d876b8a6a90", // 2018 — microscope/telescope statements (HARD)
      traps: [
        {
          title: "Microscope wants a SHORT objective; telescope wants a LONG one",
          body:
            "Microscope magnification rises as the objective focal length DECREASES (statement 'increases with objective f' is false). Telescope magnification rises as the objective focal length INCREASES. The two instruments pull opposite ways on the objective focal length.",
        },
        {
          title: "Newtonian telescope = mirrors only",
          body:
            "A reflecting (Newtonian) telescope contains no lenses — only mirrors. Galilean and Keplerian telescopes use lenses. Watch the 'only mirrors' phrasing.",
        },
      ],
    },
  ],
};
