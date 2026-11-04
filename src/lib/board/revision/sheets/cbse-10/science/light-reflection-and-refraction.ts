import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 9 Light: Reflection and Refraction. Statements
 * checked against the NCERT text (definitions in the book's own words);
 * formulas and sign rules rebuilt (New Cartesian Sign Convention). Most-asked
 * years and marks from all 134 CBSE board past-paper questions in the bank,
 * 2023-2026. The database spells the chapter with a dash; the colon form gives
 * the same slug.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "Light: Reflection and Refraction",
  chapterSlug: "light-reflection-and-refraction",
  source: "NCERT Science (CBSE Class 10), Chapter 9",
  keyPoints: [
    {
      term: "Laws of reflection",
      text: "(i) The angle of incidence is equal to the angle of reflection. (ii) The incident ray, the normal to the mirror at the point of incidence and the reflected ray all lie in the same plane. They hold for all reflecting surfaces, curved ones too. A plane mirror's image is virtual, erect, same size and laterally inverted.",
    },
    {
      term: "Spherical mirror terms",
      text: "**Pole** P: centre of the mirror's surface. **Centre of curvature** C, radius of curvature R. **Principal axis:** the line through P and C, normal to the mirror at P. **Principal focus** F: where rays parallel to the axis meet (concave) or appear to come from (convex). **Focal length** f = PF. For small apertures \\(R = 2f\\).",
    },
    {
      term: "Rules for ray diagrams",
      text: "(i) A ray parallel to the axis passes through F after reflection (concave) or appears to come from F (convex). (ii) A ray through F (or aimed at F) comes out parallel. (iii) A ray through C (or aimed at C) returns along itself. (iv) A ray at P reflects at an equal angle. For lenses, a ray through the optical centre goes straight.",
    },
    {
      term: "Images by a concave mirror",
      text: "Object at infinity: image at F, point-sized. Beyond C: between F and C, diminished. At C: at C, same size. Between C and F: beyond C, enlarged. At F: at infinity. In all these it is real and inverted. Between P and F: behind the mirror, virtual, erect, enlarged.",
    },
    {
      term: "Convex mirror",
      text: "Always forms a virtual, erect and diminished image, between P and F behind the mirror (for the object at infinity, a point at F). Used as rear-view (wing) mirrors: the image is erect and they have a wider field of view as they curve outwards.",
    },
    {
      term: "Uses of concave mirrors",
      text: "Torches, search-lights and vehicle headlights (bulb at F, for a parallel beam); shaving mirrors and dentists' mirrors (object between P and F, enlarged erect image); solar furnaces (concentrate sunlight to heat).",
    },
    {
      term: "New Cartesian Sign Convention",
      text: "The object is on the left. All distances are measured from the pole (optical centre for a lens). Distances in the direction of incident light (right) are positive; against it (left) negative. Heights above the axis positive, below negative. So u is always negative; a concave mirror has f negative, a convex mirror f positive.",
    },
    {
      term: "Magnification",
      text: "Ratio of image height to object height. Negative m: real, inverted image; positive m: virtual, erect. \\(|m| > 1\\) enlarged, \\(|m| = 1\\) same size, \\(|m| < 1\\) diminished. A convex mirror and a concave lens always give m between 0 and +1.",
    },
    {
      term: "Laws of refraction",
      text: "(i) The incident ray, the refracted ray and the normal at the point of incidence all lie in the same plane. (ii) The ratio of the sine of the angle of incidence to the sine of the angle of refraction is a constant for light of a given colour and a given pair of media (**Snell's law**).",
    },
    {
      term: "Refractive index and optical density",
      text: "Absolute refractive index: speed of light in vacuum divided by speed in the medium. The medium with the larger refractive index is optically denser. Light going from rarer to denser slows down and bends **towards** the normal; denser to rarer, it speeds up and bends **away**. Kerosene (1.44) is optically denser than water (1.33) though lighter.",
    },
    {
      term: "Glass slab",
      text: "Light bends towards the normal entering the glass and away from it leaving. The emergent ray is parallel to the incident ray, shifted sideways (lateral displacement), because the bending at the two parallel faces is equal and opposite. A ray falling normally goes straight through.",
    },
    {
      term: "Images by a convex lens",
      text: "Object at infinity: at \\(F_2\\), point-sized. Beyond \\(2F_1\\): between \\(F_2\\) and \\(2F_2\\), diminished. At \\(2F_1\\): at \\(2F_2\\), same size. Between \\(F_1\\) and \\(2F_1\\): beyond \\(2F_2\\), enlarged. At \\(F_1\\): at infinity. These are real and inverted. Between \\(F_1\\) and O: same side, virtual, erect, enlarged.",
    },
    {
      term: "Concave lens",
      text: "Diverges a parallel beam; always gives a virtual, erect and diminished image on the same side as the object, between the optical centre and F (at F for an object at infinity). A convex lens converges light.",
    },
    {
      term: "Power of a lens",
      text: "The degree of convergence or divergence a lens produces: \\(P = \\frac{1}{f}\\) with f in metres. SI unit **dioptre** (D): 1 D is the power of a lens of focal length 1 m. Convex lens: positive power; concave lens: negative. For lenses in contact the powers add.",
    },
  ],
  formulas: [
    { label: "Radius of curvature", latex: "R = 2f" },
    {
      label: "Mirror formula",
      latex: "\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}",
      symbols: [{ symbol: "f", meaning: "negative for a concave mirror, positive for a convex mirror" }],
    },
    { label: "Magnification by a mirror", latex: "m = \\frac{h'}{h} = -\\frac{v}{u}" },
    {
      label: "Lens formula",
      latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}",
      symbols: [{ symbol: "f", meaning: "positive for a convex lens, negative for a concave lens" }],
    },
    { label: "Magnification by a lens", latex: "m = \\frac{h'}{h} = \\frac{v}{u}" },
    { label: "Snell's law", latex: "\\frac{\\sin i}{\\sin r} = \\text{constant} = n_{21}" },
    { label: "Refractive index and speed", latex: "n_m = \\frac{c}{v} \\qquad n_{21} = \\frac{v_1}{v_2} = \\frac{n_2}{n_1} \\qquad n_{12} = \\frac{1}{n_{21}}" },
    {
      label: "Power of a lens",
      latex: "P = \\frac{1}{f\\,(\\text{in m})} \\qquad 1\\text{ D} = 1\\text{ m}^{-1}",
    },
    { label: "Lenses in contact", latex: "P = P_1 + P_2 + P_3 + \\ldots" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Image formation by a concave mirror (Figure 9.7)",
      labels: ["P, F, C on the principal axis", "two rays from the object top", "image position for each object position", "real images in front, virtual one behind"],
    },
    {
      title: "Image formation by a convex mirror (Figure 9.8)",
      labels: ["ray parallel to axis, diverging as if from F", "ray aimed at C returning back", "dotted extensions behind the mirror", "virtual, erect, diminished image between P and F"],
    },
    {
      title: "Image formation by a convex lens (Figure 9.16)",
      labels: ["O, F₁, 2F₁, F₂, 2F₂ marked", "ray parallel to axis through F₂", "ray through O undeviated", "image for each object position"],
    },
    {
      title: "Image formation by a concave lens (Figure 9.17)",
      labels: ["ray parallel to axis diverging as if from F₁", "ray through O undeviated", "dotted extensions", "virtual, erect, diminished image between F₁ and O"],
    },
    {
      title: "Refraction through a rectangular glass slab (Figure 9.10)",
      labels: ["incident ray, normal, angle i", "refracted ray bending towards the normal", "emergent ray parallel to incident ray", "lateral displacement"],
    },
    {
      title: "New Cartesian Sign Convention (Figure 9.9)",
      labels: ["mirror at the origin, pole P", "direction of incident light: +", "distances against it: −", "heights up +, down −"],
    },
  ],
  mostAsked: [
    {
      topic: "Mirrors: ray diagrams, nature of the image for each object position, uses (dentist, shaving, headlights, rear-view, solar furnace), definitions",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Lens numericals and u-v tables: lens formula, magnification, image of the same size at 2F, finding f from data",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Refractive index: absolute and relative, speed of light, optical density, bending towards or away from the normal",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Mirror numericals: mirror formula and magnification (concave mirror, rear-view convex mirror), \\(R = 2f\\)",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Lens ray diagrams: image for each object position, half-covered lens, virtual image by convex and concave lens",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Power of a lens in dioptres, its sign, and lenses in contact",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Laws of reflection and refraction; refraction through a rectangular glass slab",
      years: [2026, 2025, 2024],
    },
  ],
  mistakes: [
    {
      title: "Using the wrong sign for f or u",
      body: "u is always negative (object on the left). Concave mirror: \\(f < 0\\); convex mirror: \\(f > 0\\). Convex lens: \\(f > 0\\); concave lens: \\(f < 0\\). A rear-view mirror with f = 1.5 m is a convex mirror, so use \\(f = +1.5\\) m.",
    },
    {
      title: "Mixing the mirror and lens formulas",
      body: "Mirror: \\(\\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f}\\), \\(m = -\\frac{v}{u}\\). Lens: \\(\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f}\\), \\(m = \\frac{v}{u}\\). Check: a real image from a concave mirror has v negative; from a convex lens v positive.",
    },
    {
      title: "Power with f in centimetres",
      body: "Change f to metres first: f = 50 cm gives P = 1/0.5 = +2 D. P = -2.5 D gives f = -0.4 m = -40 cm, a concave lens. Combination: +4 D and -2 D give +2 D, converging.",
    },
    {
      title: "Relative refractive index upside down",
      body: "\\(n_{21}\\) (medium 2 with respect to 1) = \\(\\frac{n_2}{n_1} = \\frac{v_1}{v_2}\\). Water to glass: \\(\\frac{3/2}{4/3} = \\frac{9}{8}\\). Glass to water is \\(\\frac{8}{9}\\). Speed of light in a medium: \\(v = \\frac{c}{n}\\).",
    },
    {
      title: "Half-covered lens",
      body: "Covering half of a lens still gives the **full** image, only less bright, because every part of the lens forms the whole image.",
    },
    {
      title: "Ray diagrams without arrows",
      body: "Put arrows on every ray, draw virtual rays dotted, mark F and 2F (or C), and label the image with its nature: real or virtual, inverted or erect, size.",
    },
  ],
};

export default sheet;
