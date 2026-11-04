import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * CBSE Class 10 Science, Ch. 10 The Human Eye and the Colourful World.
 * Statements checked against the NCERT text (definitions in the book's own
 * words); lens powers worked with the New Cartesian Sign Convention. Most-asked
 * years and marks from all 107 CBSE board past-paper questions in the bank,
 * 2023-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "cbse-10",
  subjectName: "Science",
  subjectRoute: "science",
  chapterName: "The Human Eye and the Colourful World",
  chapterSlug: "the-human-eye-and-the-colourful-world",
  source: "NCERT Science (CBSE Class 10), Chapter 10",
  keyPoints: [
    {
      term: "Parts of the human eye",
      text: "Light enters through the **cornea**, where most of the refraction occurs. The **iris** (dark muscular diaphragm) controls the size of the **pupil**, which controls the light entering. The crystalline **eye lens** focuses a real, inverted image on the **retina**, whose cells send signals by the **optic nerve** to the brain.",
    },
    {
      term: "Power of accommodation",
      text: "The ability of the eye lens to adjust its focal length. Looking at a near object, the ciliary muscles contract, the lens becomes thicker and its focal length decreases. For a distant object they relax, the lens becomes thin and its focal length increases.",
    },
    {
      term: "Near point and far point",
      text: "Near point (least distance of distinct vision): the smallest distance at which the eye sees clearly without strain, about 25 cm for a young adult. Far point: the farthest point seen clearly, infinity for a normal eye.",
    },
    {
      term: "Myopia",
      text: "Near-sightedness: near objects are clear, distant ones are not; the far point is nearer than infinity and the image forms **in front of** the retina. Causes: excessive curvature of the eye lens, or elongation of the eyeball. Corrected by a **concave** lens of suitable power.",
    },
    {
      term: "Hypermetropia",
      text: "Far-sightedness: distant objects are clear, near ones are not; the near point is farther than 25 cm and the image forms **behind** the retina. Causes: the focal length of the eye lens is too long, or the eyeball has become too small. Corrected by a **convex** lens.",
    },
    {
      term: "Presbyopia, bi-focal lenses and cataract",
      text: "Presbyopia: with age the power of accommodation falls as the ciliary muscles weaken and the lens loses flexibility; the near point recedes. Bi-focal lenses: the upper part is concave (distant vision), the lower part convex (reading). Cataract: the lens becomes milky and cloudy; cured by surgery.",
    },
    {
      term: "Refraction through a prism",
      text: "A glass prism has two triangular bases and three rectangular faces. A ray bends towards the base at each face, because of the angle between the faces. The angle between the incident ray produced and the emergent ray is the **angle of deviation**.",
    },
    {
      term: "Dispersion and spectrum",
      text: "The splitting of white light into its component colours is **dispersion**; the coloured band is the **spectrum**: VIBGYOR. Different colours bend through different angles: red bends the least, violet the most (glass has the lowest refractive index for red).",
    },
    {
      term: "Recombination",
      text: "Isaac Newton placed a second, inverted prism after the first: the colours of the spectrum recombined into white light. So sunlight is made of seven colours.",
    },
    {
      term: "Rainbow",
      text: "A natural spectrum seen after a rain shower, always opposite to the Sun. Tiny water droplets act like small prisms: they refract and disperse sunlight, reflect it internally, and refract it again as it leaves. Also seen through a waterfall or fountain with the Sun behind you.",
    },
    {
      term: "Scattering and Tyndall effect",
      text: "When a beam passes through colloidal particles (smoke, dust, mist), the particles scatter it and the path of the beam becomes visible: the **Tyndall effect** (sunlight through a dense forest canopy). Very fine particles scatter mainly blue light; larger particles scatter all colours, which looks white.",
    },
    {
      term: "Blue sky and red signals",
      text: "Air molecules, smaller than the wavelength of light, scatter blue (shorter wavelength) much more than red, so the sky looks blue. With no atmosphere, or at very high altitude, there is no scattering, so the sky looks dark. Danger signals are red because red is least scattered by fog or smoke, so it is seen far away.",
    },
  ],
  formulas: [
    { label: "Power of a lens", latex: "P = \\frac{1}{f\\,(\\text{in m})} \\qquad \\text{concave: } P < 0 \\qquad \\text{convex: } P > 0" },
    {
      label: "Correcting myopia",
      latex: "f = -(\\text{far point distance}) \\qquad \\text{far point } 80\\text{ cm: } f = -0.8\\text{ m},\\ P = -1.25\\text{ D}",
    },
    {
      label: "Correcting hypermetropia",
      latex: "\\frac{1}{v} - \\frac{1}{u} = \\frac{1}{f} \\quad u = -25\\text{ cm},\\ v = -(\\text{near point}) \\quad \\text{near point } 1\\text{ m: } P = +3\\text{ D}",
    },
  ],
  derivations: [],
  diagrams: [
    {
      title: "The human eye (Figure 10.1)",
      labels: ["cornea", "iris and pupil", "eye lens and ciliary muscles", "retina", "optic nerve", "aqueous humour"],
    },
    {
      title: "Myopic eye and its correction (Figure 10.2)",
      labels: ["far point O′ of the myopic eye", "image in front of the retina", "concave lens before the eye", "image now on the retina"],
    },
    {
      title: "Hypermetropic eye and its correction (Figure 10.3)",
      labels: ["near point N′ beyond 25 cm", "image behind the retina", "convex lens before the eye", "object at N (25 cm) imaged on the retina"],
    },
    {
      title: "Refraction through a triangular glass prism (Figure 10.4)",
      labels: ["incident ray, angle of incidence", "refracted ray, angle of refraction", "emergent ray, angle of emergence", "angle of prism A, angle of deviation D"],
    },
    {
      title: "Dispersion of white light by a glass prism (Figure 10.5)",
      labels: ["beam of white light", "glass prism", "spectrum on a screen", "red at top (least bent), violet at bottom (most bent)"],
    },
    {
      title: "Rainbow formation (Figure 10.8)",
      labels: ["sunlight entering a raindrop", "refraction and dispersion", "internal reflection", "refraction out to the observer, Sun behind"],
    },
  ],
  mostAsked: [
    {
      topic: "Defects of vision: myopia, hypermetropia, presbyopia; causes, ray diagrams of the defect and its correction, power of the lens, bi-focal lenses",
      marks: 3,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Prism: refraction and angle of deviation, dispersion of white light, spectrum, which colour bends most, recombination",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Human eye: parts and functions (cornea, iris, pupil, ciliary muscles, retina), power of accommodation",
      marks: 1,
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Scattering of light: Tyndall effect, why the sky is blue, sky dark at high altitude or with no atmosphere, red danger signals",
      years: [2026, 2025, 2024, 2023],
    },
    {
      topic: "Rainbow: how it forms (refraction, dispersion, internal reflection), labelled ray diagram, conditions to see one",
      marks: 2,
      years: [2026, 2025, 2024, 2023],
    },
  ],
  mistakes: [
    {
      title: "Swapping the lenses for myopia and hypermetropia",
      body: "Myopia (cannot see far): **concave** lens, negative power. Hypermetropia (cannot see near): **convex** lens, positive power. A lens of -0.5 D means myopia; +2.0 D means hypermetropia.",
    },
    {
      title: "Ciliary muscles the wrong way round",
      body: "For a **near** object the ciliary muscles **contract** and the lens gets thicker (shorter focal length). For a far object they relax and the lens gets thinner.",
    },
    {
      title: "Bi-focal halves upside down",
      body: "Upper part: concave lens, for distant vision. Lower part: convex lens, for reading. So with lenses of -4.0 D and +2.0 D, the -4.0 D one corrects distant vision.",
    },
    {
      title: "Rainbow without internal reflection",
      body: "Name all three: refraction (with dispersion) entering the drop, **internal reflection**, refraction leaving it. The Sun must be behind the observer.",
    },
    {
      title: "Wrong colour bending most",
      body: "Violet bends the most and red the least. Red is also scattered the least, which is why danger signals and the rising or setting Sun look red.",
    },
  ],
};

export default sheet;
