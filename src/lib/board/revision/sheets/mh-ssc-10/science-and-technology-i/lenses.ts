import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Science and Technology I, Ch. 7 Lenses. Statements checked against
 * the Balbharati text; most-asked years from the board past papers in the
 * bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Science and Technology I",
  subjectRoute: "science-and-technology-i",
  chapterName: "Lenses",
  chapterSlug: "lenses",
  source: "Balbharati Science and Technology Part 1 Std X (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "Convex and concave lenses",
      text: "A convex lens brings rays parallel to the principal axis together at a point: a **converging** lens. A concave lens spreads them out: a **diverging** lens.",
    },
    {
      term: "Lens terms",
      text: "Principal axis: the line through both centres of curvature. Optical centre O: rays through it pass without changing their path. Principal focus F: where parallel rays meet (convex) or seem to come from (concave). Focal length: OF.",
    },
    {
      term: "Image by a concave lens",
      text: "Always virtual, erect and diminished, between the focus F1 and the optical centre, on the same side as the object.",
    },
    {
      term: "Cartesian sign convention",
      text: "O is the origin; the object is on the left. Distances to the right of O are positive, to the left negative. Heights above the axis are positive, below negative. f of a convex lens is positive, of a concave lens negative.",
    },
    {
      term: "Power of a lens",
      text: "The capacity of a lens to converge or diverge incident rays. Power is the inverse of the focal length in metres. Unit: dioptre (D). Convex lens: positive power; concave lens: negative power.",
    },
    {
      term: "Lenses in contact",
      text: "When two lenses are kept touching each other, the power of the combined lens is equal to the sum of their individual powers.",
    },
    {
      term: "Human eye",
      text: "Light enters through the **cornea**, where most refraction happens. The **iris** controls the **pupil**, which controls the light entering. The **lens**, held by ciliary muscles, forms a real, inverted image on the **retina**; the **optic nerve** carries signals to the brain.",
    },
    {
      term: "Power of accommodation",
      text: "The capacity of the eye lens to change its focal length as per need. For distant objects the lens gets thinner (focal length increases); for nearby objects it gets thicker.",
    },
    {
      term: "Minimum distance of distinct vision",
      text: "The minimum distance of an object from a normal eye at which it is seen clearly without stress. For a normal eye the near point is at **25 cm**; the far point is at infinity.",
    },
    {
      term: "Myopia (nearsightedness)",
      text: "Near objects are clear, distant ones are not; the image forms in front of the retina. Causes: curvature of cornea and lens increases; the eyeball elongates. Corrected by a **concave** lens (negative power).",
    },
    {
      term: "Hypermetropia (farsightedness)",
      text: "Distant objects are clear, near ones are not; the image forms behind the retina. Causes: curvature of cornea and lens decreases; the eyeball flattens. Corrected by a **convex** lens (positive power).",
    },
    {
      term: "Presbyopia and bifocal lenses",
      text: "With age, the muscles near the lens lose the ability to change its focal length, so the near point moves away. Bifocal lens: upper part concave (distant vision), lower part convex (near vision).",
    },
    {
      term: "Simple microscope",
      text: "A convex lens of small focal length gives a virtual, erect, bigger image (up to about 20 times). Used for watch repair and testing precious gems.",
    },
    {
      term: "Compound microscope and telescope",
      text: "Both use two convex lenses, objective and eyepiece; the objective's image is the object for the eyepiece. Microscope objective: small focal length. Telescope objective: large diameter and large focal length.",
    },
  ],
  formulas: [
    { label: "Lens formula", latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}" },
    { label: "Magnification", latex: "M = \\frac{h_2}{h_1} = \\frac{v}{u}" },
    { label: "Power", latex: "P = \\frac{1}{f\\,(\\text{m})} \\qquad 1\\ \\text{D} = 1\\ \\text{m}^{-1}" },
    { label: "Lenses in contact", latex: "\\frac{1}{f} = \\frac{1}{f_1} + \\frac{1}{f_2} \\qquad P = P_1 + P_2" },
    {
      label: "Power: worked values",
      latex: "f = 20\\ \\text{cm}: P = \\frac{1}{0.20} = +5\\ \\text{D} \\qquad f = 40\\ \\text{cm}: P = +2.5\\ \\text{D} \\qquad f = -25\\ \\text{cm}: P = -4\\ \\text{D}",
    },
    { label: "Focal length from power", latex: "P = +2\\ \\text{D}: \\quad f = \\frac{1}{2} = 0.5\\ \\text{m} = 50\\ \\text{cm}" },
  ],
  derivations: [
    {
      title: "Images formed by a convex lens for different positions of the object",
      steps: [
        "At infinity: image at F2, a point, real and inverted.",
        "Beyond 2F1: between F2 and 2F2, real, inverted, diminished.",
        "At 2F1: at 2F2, real, inverted, same size.",
        "Between F1 and 2F1: beyond 2F2, real, inverted, magnified.",
        "At F1: at infinity, real, inverted, highly magnified.",
        "Between F1 and O: on the same side as the object, virtual, erect, magnified.",
      ],
    },
    {
      title: "Solve a lens problem with the sign convention",
      steps: [
        "Example: object 5 cm tall at 20 cm from a convex lens of focal length 10 cm. So \\(u = -20\\) cm, \\(f = +10\\) cm.",
        "Lens formula: \\(\\frac{1}{v} = \\frac{1}{f} + \\frac{1}{u} = \\frac{1}{10} - \\frac{1}{20} = \\frac{1}{20}\\), so \\(v = +20\\) cm (other side of the lens).",
        "\\(M = \\frac{v}{u} = \\frac{20}{-20} = -1\\), so \\(h_2 = -5\\) cm: real, inverted, same size.",
      ],
    },
  ],
  diagrams: [
    { title: "Construction of human eye", labels: ["cornea", "iris and pupil", "eye lens", "ciliary muscles", "retina", "optic nerve"] },
    { title: "Nearsightedness and its correction", labels: ["image in front of the retina", "elongated eyeball", "concave lens", "image now on the retina"] },
    { title: "Farsightedness and its correction", labels: ["image behind the retina", "near object", "convex lens", "image now on the retina"] },
    { title: "Image formed by a concave lens", labels: ["object PQ", "ray parallel to the axis, diverging as if from F1", "ray through O undeviated", "virtual, erect, diminished image P1Q1"] },
    { title: "Real image formed by a convex lens", labels: ["object AB", "ray parallel to the axis through F2", "ray through O undeviated", "real, inverted image", "F1, F2, 2F1, 2F2"] },
    { title: "Compound microscope", labels: ["objective lens (small focal length)", "eyepiece", "object", "first image", "final magnified image"] },
  ],
  mostAsked: [
    { topic: "Defects of vision: name the defect from the figure or a story, its causes, the correcting lens and its focal length", marks: 3, years: [2026, 2025, 2024, 2023, 2019, 2018, 2016] },
    { topic: "Human eye: labelled diagram, near point 25 cm, power of accommodation", years: [2026, 2025, 2020, 2018] },
    { topic: "Power of a lens from its focal length (or focal length from power)", marks: 2, years: [2026, 2024, 2023, 2022, 2016] },
    { topic: "Simple microscope (used for watch repairs), compound microscope", marks: 2, years: [2025, 2024, 2022, 2016] },
    { topic: "Images by a convex lens: complete the table or the ray diagram; concave lens is diverging", years: [2022, 2019] },
    { topic: "Write the Cartesian sign convention for lenses", marks: 3, years: [2025] },
  ],
  mistakes: [
    {
      title: "Using focal length in cm for power",
      body: "Convert to metres first: f = 20 cm = 0.20 m, so P = +5 D, not 1/20 D.",
    },
    {
      title: "Dropping the sign of power",
      body: "A concave lens has negative focal length and negative power: f = 25 cm concave gives P = -4 D. Myopia needs negative power, hypermetropia positive.",
    },
    {
      title: "Mixing up the two main defects",
      body: "Myopia: can see **near**, image in **front** of retina, **concave** lens. Hypermetropia: can see **far**, image **behind** retina, **convex** lens.",
    },
    {
      title: "Wrong sign for the object distance",
      body: "The object is always on the left, so u is negative. A positive v means a real image on the other side.",
    },
    {
      title: "Calling a concave lens converging",
      body: "A concave lens is diverging. Its image is always virtual, erect and diminished.",
    },
  ],
};

export default sheet;
