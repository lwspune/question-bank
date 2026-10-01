import type { SubtopicNote } from "@/app/notes/_types";

export const INSTRUMENTS_RAY_NOTE: SubtopicNote = {
  subtopicName: "Optical Instruments and the Eye",
  title: "Optical Instruments and the Eye",
  oneLineDefinition:
    "A compound microscope magnifies by (L/fₒ)(D/fₑ) in normal adjustment, a telescope by fₒ/fₑ with its lenses fₒ + fₑ apart, and resolving power grows with the aperture and falls with the wavelength.",
  whyItMatters:
    "Twelve PYQs, ten of them multiple choice, and four from 2026. Seven are about magnifiers, microscopes and telescopes: the magnification in normal adjustment, the length of a telescope, a beam expander and the job of a reflecting telescope's second mirror. Five are about seeing detail: resolving power, a camera's focal length, and the defects of the eye and the lenses that correct them.",
  concepts: [
    // C1 — microscope and telescope
    {
      kind: "reference" as const,
      slug: "jpray-microscope-telescope",
      name: "Magnification of microscopes and telescopes",
      intuition:
        "Both instruments use two converging lenses, for opposite jobs. A microscope's objective has a short focal length and makes a large real image of a near object; the eyepiece then works as a magnifying glass on that image. A telescope's objective has a long focal length and makes a small real image of a distant object at its focus; the eyepiece magnifies the angle. In normal adjustment the final image is at infinity, so the eye is relaxed.",
      definition:
        "- Simple microscope: the gain comes from bringing the object closer than D = 25 cm; at the eye, the image subtends the same angle as the object. \\(M = D/f\\) with the image at infinity, \\(1 + D/f\\) with the image at D.\n" +
        "- Compound microscope, normal adjustment: \\(M = \\dfrac{L}{f_o} \\times \\dfrac{D}{f_e}\\), with L the tube length.\n" +
        "- Refracting telescope, normal adjustment: \\(M = \\dfrac{f_o}{f_e}\\), length \\(f_o + f_e\\). A wider objective gathers more light and resolves finer detail; it does not change M.\n" +
        "- Beam expander: two converging lenses with a common focus, \\(f_1 + f_2\\) apart; output width over input width is \\(f_2/f_1\\).\n" +
        "- Reflecting telescope: a concave mirror is the objective; a small secondary mirror sends the light out of the tube to the eyepiece.",
      table: {
        columns: ["Instrument", "First element", "Magnification, final image at infinity", "Distance between the elements"],
        rows: [
          { cells: ["Simple microscope", "One short-focus convex lens", "\\(D/f\\)", "Only one lens"] },
          { cells: ["Compound microscope", "Short-focus objective lens", "\\(\\dfrac{L}{f_o}\\cdot\\dfrac{D}{f_e}\\)", "Set by the tube length L"] },
          { cells: ["Refracting telescope", "Long-focus objective lens", "\\(f_o/f_e\\)", "\\(f_o + f_e\\)"] },
          { cells: ["Reflecting telescope", "Concave mirror, \\(f_o = R/2\\)", "\\(f_o/f_e\\)", "A secondary mirror folds the light to an eyepiece outside the tube"] },
          { cells: ["Beam expander", "Convex lens of focal length \\(f_1\\)", "Beam width multiplied by \\(f_2/f_1\\)", "\\(f_1 + f_2\\)"] },
        ],
        caption: "D = 25 cm, the least distance of distinct vision. Normal adjustment puts the final image at infinity.",
      },
      selfCheckExample: {
        prompt:
          "A compound microscope has an objective of focal length 1.5 cm, an eyepiece of focal length 5 cm and a tube length of 15 cm. Find its magnification in normal adjustment. (D = 25 cm)",
        steps: [
          "\\(\\dfrac{L}{f_o} = \\dfrac{15}{1.5} = 10\\); \\(\\dfrac{D}{f_e} = \\dfrac{25}{5} = 5\\).",
          "\\(M = 10 \\times 5 = 50\\).",
        ],
        answer: "50",
      },
      practiceSet: [
        { prompt: "A telescope in normal adjustment magnifies 5 times and is 36 cm long. Focal length of its objective?", answer: "30 cm" },
        { prompt: "A telescope has an objective of focal length 100 cm and an eyepiece of focal length 4 cm. Magnification and length in normal adjustment?", answer: "25; 104 cm" },
        { prompt: "A magnifying glass of focal length 5 cm forms its image at infinity. Magnification? (D = 25 cm)", answer: "5" },
        { prompt: "A reflecting telescope has a concave mirror of radius 4 m and an eyepiece of focal length 2.5 cm. Magnification in normal adjustment?", answer: "80" },
      ],
      pyqExampleId: "7c37c21f-23af-440f-b142-3b10f7549737", // 2026: fₒ = 2 cm, fₑ = 4 cm, L = 32 cm, M = 100
      traps: [
        {
          title: "A telescope's M is fₒ/fₑ, not fₑ/fₒ",
          body: "The objective has the long focal length. Inverting the ratio gives a magnification below 1, which is never an option for a working telescope.",
        },
        {
          title: "A wider objective does not raise the magnification",
          body: "A larger aperture lets in more light and resolves more detail, but in normal adjustment M depends only on the focal lengths.",
        },
        {
          title: "Normal adjustment uses D/fₑ, not 1 + D/fₑ",
          body: "The extra 1 appears only when the final image is at the near point. Read where the final image is before choosing the formula.",
        },
      ],
    },

    // C2 — resolving power and the eye
    {
      kind: "reference" as const,
      slug: "jpray-resolving-eye",
      name: "Resolving power and defects of vision",
      intuition:
        "A lens of finite size cannot make a point image: diffraction blurs it. Two points can be told apart only if their blurs do not overlap too much. A wider aperture and a shorter wavelength make the blur smaller. The eye has its own limits: the range from its near point to its far point, which spectacles correct.",
      definition:
        "- Telescope: smallest resolvable angle \\(\\theta = \\dfrac{1.22\\lambda}{D}\\); resolving power \\(\\dfrac{D}{1.22\\lambda}\\), with D the aperture.\n" +
        "- Microscope: resolving power \\(\\dfrac{2\\mu\\sin\\theta}{1.22\\lambda}\\). A liquid of larger μ between the object and the objective improves it.\n" +
        "- Camera photographing a distant scene: image size over object size equals f over the distance, so \\(f = \\text{distance} \\times \\dfrac{\\text{film size}}{\\text{scene size}}\\).\n" +
        "- Myopia: the far point is too close; a concave lens of focal length equal to minus the far-point distance corrects it.\n" +
        "- Hypermetropia: the near point is too far; a convex lens forms, at the person's near point, a virtual image of an object at 25 cm.\n" +
        "- Astigmatism: the cornea curves differently in different planes, so lines in one direction blur or look distorted; a cylindrical lens corrects it.",
      table: {
        columns: ["Defect", "What goes wrong", "Correcting lens", "How to find the lens"],
        rows: [
          { cells: ["Myopia (short sight)", "Far point closer than infinity", "Concave", "\\(f = -(\\text{far-point distance})\\)"] },
          { cells: ["Hypermetropia (long sight)", "Near point farther than 25 cm", "Convex", "It images an object at 25 cm onto the near point"] },
          { cells: ["Presbyopia", "The near point recedes with age as focusing weakens", "Convex for reading, often in a bifocal", "As for hypermetropia"] },
          { cells: ["Astigmatism", "Unequal curvature of the cornea; lines in one direction blur", "Cylindrical", "Shaped to correct the faulty plane only"] },
        ],
        caption: "A reading glass is tested at the near point: an object at 25 cm must appear at the person's own near point.",
      },
      selfCheckExample: {
        prompt:
          "A person's near point is 75 cm from the eye. What power of reading glass lets them read a book held 25 cm away?",
        steps: [
          "Object at \\(u = -25\\) cm; the lens must put a virtual image at the near point, \\(v = -75\\) cm.",
          "\\(\\dfrac{1}{f} = \\dfrac{1}{v} - \\dfrac{1}{u} = -\\dfrac{1}{75} + \\dfrac{1}{25} = \\dfrac{2}{75}\\), so f = 37.5 cm.",
          "\\(P = \\dfrac{100}{37.5} \\approx +2.7\\) D.",
        ],
        answer: "About +2.7 D, a convex lens",
      },
      practiceSet: [
        { prompt: "A telescope objective is 2 m across. Smallest angle it can resolve with light of wavelength 500 nm?", answer: "About \\(3.1 \\times 10^{-7}\\) rad" },
        { prompt: "A short-sighted person's far point is 2 m. Power of the lens needed to see distant objects?", answer: "−0.5 D" },
        { prompt: "To resolve finer detail with a microscope, should the wavelength of the light be raised or lowered?", answer: "Lowered" },
        { prompt: "A camera 10 km above the ground photographs a strip 5 km wide onto film 25 mm wide. Focal length of its lens?", answer: "50 mm" },
      ],
      pyqExampleId: "46a451d9-46a5-40bd-acd7-eb334ba959f1", // 2023: −1.0 D for distance, +2.0 D reading glass, near point 50 cm
      traps: [
        {
          title: "Resolving power is not magnification",
          body: "A stronger eyepiece enlarges the blur too. Only a wider aperture, a shorter wavelength or, in a microscope, a denser medium in front of the objective resolves finer detail.",
        },
        {
          title: "A reading glass forms a virtual image",
          body: "It images an object at 25 cm onto the person's near point, on the same side as the object. So v is negative and farther from the lens than 25 cm.",
        },
        {
          title: "Blurred is not the same as distorted",
          body: "Distant objects that look blurred point to myopia. Lines that look uneven or distorted point to astigmatism, which needs a cylindrical lens.",
        },
      ],
    },
  ],
};
