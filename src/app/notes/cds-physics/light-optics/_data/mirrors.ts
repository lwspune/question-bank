import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_LI_MIRRORS_NOTE: SubtopicNote = {
  subtopicName: "Reflection and Mirrors",
  title: "Reflection and Mirrors",
  oneLineDefinition:
    "Light travelling in straight lines and the shadows it makes, the laws of reflection and the plane mirror, and how concave and convex mirrors form images.",
  whyItMatters:
    "Nine CDS questions from 2016 (II) to 2026 (I). Two are about straight-line travel and shadows, three about the plane mirror, and four about curved mirrors, two of them short sums with the mirror formula.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphli-rays",
      name: "Light travels in straight lines: shadows",
      intuition:
        "In a medium that is the same all the way through, light goes in a straight line. That is why an opaque object casts a shadow: light cannot bend round it. If the light comes from a single point, the edge of the shadow is sharp. If it comes from a broad source, like a large lamp, some parts near the edge get light from part of the source, and the edge looks blurred.",
      definition:
        "Straight-line travel and shadows:\n" +
        "- **Rectilinear propagation**: light travels in straight lines in a **homogeneous** (uniform) transparent medium. Where the refractive index changes, the path bends.\n" +
        "- **Umbra**: the fully dark part of a shadow, which gets no light from the source.\n" +
        "- **Penumbra**: the partly lit fringe round the umbra, made when the source is **extended** (has size).\n" +
        "- A **point source** gives only an umbra, so its shadow has a **sharp** edge. The shadow is seen on an **opaque** screen.\n" +
        "- A **pinhole camera** forms an **inverted** image because rays from the top and bottom of the object cross at the pinhole.\n" +
        "- In a **solar eclipse**, places in the Moon's umbra see a total eclipse and places in its penumbra a partial one.",
      table: {
        columns: ["Situation", "What you see"],
        rows: [
          {
            cells: ["Light in a uniform transparent medium", "A straight path"],
            noteAmber: "CDS 2016 (II): light keeps a straight line only in a homogeneous, transparent medium.",
            pyqExampleId: "8af2b949-3ccd-4833-be05-6978e0886ba2",
          },
          { cells: ["Point source and an opaque object", "Umbra only: a sharp shadow"] },
          { cells: ["Extended source and an opaque object", "Umbra with a penumbra round it: a blurred edge"] },
          { cells: ["Pinhole camera", "Inverted real image"] },
          { cells: ["Standing in the Moon's umbra", "Total solar eclipse"] },
        ],
      },
      pyqExampleId: "70997544-8f29-475a-9ccc-e94b81e8ccd0",
      selfCheckExample: {
        prompt: "A pinhole camera is pointed at a candle flame. Is the image on its screen upright or upside down, and why?",
        steps: [
          "Light travels in straight lines, so each ray from the flame passes straight through the pinhole.",
          "A ray from the top of the flame goes down through the hole and lands low on the screen; a ray from the bottom lands high.",
          "So top and bottom swap.",
        ],
        answer: "Upside down (inverted), because the straight rays cross at the pinhole.",
      },
      practiceSet: [
        { prompt: "What is the fully dark central part of a shadow called?", answer: "The umbra" },
        { prompt: "What is the partly lit fringe round a shadow called?", answer: "The penumbra" },
        { prompt: "During a solar eclipse, what do people standing in the Moon's penumbra see?", answer: "A partial eclipse" },
        { prompt: "Does light keep a straight path through layers of air at different temperatures?", answer: "No: the refractive index changes, so the path bends" },
      ],
      traps: [
        {
          title: "Straight lines need a uniform medium",
          body: "Light goes straight only where the refractive index is the **same everywhere**. Slabs of different refractive index, or a medium whose index changes from place to place, bend the ray.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphli-plane",
      name: "Laws of reflection and the plane mirror",
      intuition:
        "When light bounces off a mirror, it leaves at the same angle at which it arrived, both angles measured from the normal, the line at right angles to the mirror. A plane mirror makes an image that looks as far behind the mirror as the object is in front. No light actually goes behind the mirror, so the image cannot be caught on a screen: it is virtual.",
      definition:
        "Reflection rules:\n" +
        "- **Laws of reflection**: the angle of incidence equals the angle of reflection, \\(i = r\\), both measured from the **normal**; the incident ray, the reflected ray and the normal lie in one plane.\n" +
        "- **Deviation** of the ray by a plane mirror: \\(\\delta = 180^\\circ - 2i\\).\n" +
        "- **Plane mirror image**: **virtual**, **erect**, the **same size**, **laterally inverted** (left and right swap), and as far behind the mirror as the object is in front.\n" +
        "- **Periscope**: two plane mirrors, each at 45° to the tube, so the mirrors are **parallel** to each other.",
      formula: {
        label: "Law of reflection and the deviation by a plane mirror",
        latex: "i = r \\qquad \\delta = 180^\\circ - 2i",
        symbols: [
          { symbol: "i", meaning: "angle of incidence, from the normal" },
          { symbol: "r", meaning: "angle of reflection, from the normal" },
          { symbol: "\\(\\delta\\)", meaning: "angle through which the ray is turned" },
        ],
      },
      authoredExample: {
        prompt: "A ray strikes a plane mirror at an angle of incidence of 25°. Find the angle of reflection and the angle through which the ray is turned.",
        steps: [
          "By the law of reflection, \\(r = i = 25^\\circ\\).",
          "The deviation is \\(\\delta = 180^\\circ - 2i = 180^\\circ - 50^\\circ\\).",
          "\\(\\delta = 130^\\circ\\).",
        ],
        answer: "Angle of reflection 25°; the ray is turned through 130°.",
      },
      selfCheckExample: {
        prompt: "A ray makes an angle of 30° with the surface of a plane mirror. Through what angle is it turned on reflection?",
        steps: [
          "The angle of incidence is measured from the normal, which is at 90° to the surface.",
          "So \\(i = 90^\\circ - 30^\\circ = 60^\\circ\\).",
          "\\(\\delta = 180^\\circ - 2 \\times 60^\\circ = 60^\\circ\\).",
        ],
        answer: "60°.",
      },
      pyqExampleId: "4a567af1-2eb6-4c60-9b62-8ee0e1ab432b",
      practiceSet: [
        { prompt: "Can the image formed by a plane mirror be caught on a screen?", answer: "No: it is virtual" },
        { prompt: "You stand 2 m in front of a plane mirror. How far are you from your image?", answer: "4 m" },
        { prompt: "Why does the word AMBULANCE appear reversed on the front of an ambulance?", answer: "So that it reads correctly in a driver's mirror, which inverts left and right" },
        { prompt: "How are the two mirrors of a periscope placed relative to each other?", answer: "Parallel, each at 45° to the tube" },
      ],
      traps: [
        {
          title: "Angles are measured from the normal",
          body: "If a stem gives the angle with the **mirror surface**, subtract it from 90° first. A ray at 30° to the surface has \\(i = 60^\\circ\\), and its deviation is 60°, not 120°.",
        },
        {
          title: "A plane mirror's image is virtual",
          body: "The image is erect, the same size and laterally inverted, but it is **never real**: the rays only seem to come from behind the mirror.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphli-spherical",
      name: "Concave and convex mirrors",
      intuition:
        "A concave mirror is curved inwards, like the inside of a bowl, and brings parallel light together at its focus. A convex mirror bulges outwards and spreads light apart, so it always shows a small, upright image of a wide view. The focus is halfway between the mirror and its centre of curvature, so the focal length is half the radius. The mirror formula then gives where any image forms.",
      definition:
        "Curved mirrors, with distances measured from the pole (New Cartesian convention: distances in front of the mirror are negative):\n" +
        "- **Focal length** \\(f = R/2\\).\n" +
        "- **Mirror formula** \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\); **magnification** \\(m = -\\dfrac{v}{u}\\). A negative \\(v\\) means the image is in front of the mirror and real.\n" +
        "- **Concave mirror**: object beyond C, small real image between F and C; at C, same size at C; between C and F, enlarged real image beyond C; **at F, image at infinity**; between F and the mirror, enlarged **virtual erect** image behind it.\n" +
        "- **Convex mirror**: always a **virtual, erect, diminished** image behind the mirror, whatever the distance. Used as a rear-view mirror.\n" +
        "- So an image that stays **erect at every distance** comes from a **plane or a convex** mirror; a concave mirror inverts it once the object is beyond F.",
      formula: {
        label: "Focal length, mirror formula and magnification",
        latex: "f = \\frac{R}{2} \\qquad \\frac{1}{v} + \\frac{1}{u} = \\frac{1}{f} \\qquad m = -\\frac{v}{u}",
        symbols: [
          { symbol: "R", meaning: "radius of curvature" },
          { symbol: "f", meaning: "focal length (negative for a concave mirror)" },
          { symbol: "u, v", meaning: "object and image distances from the pole" },
          { symbol: "m", meaning: "magnification; negative means inverted" },
        ],
      },
      authoredExample: {
        prompt: "An object stands 20 cm in front of a concave mirror of radius of curvature 30 cm. Where is the image, and what is it like?",
        steps: [
          "Focal length: \\(f = R/2 = 15\\) cm, so \\(f = -15\\) cm; the object is in front, so \\(u = -20\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u} = -\\dfrac{1}{15} + \\dfrac{1}{20} = \\dfrac{-4 + 3}{60} = -\\dfrac{1}{60}\\).",
          "So \\(v = -60\\) cm: 60 cm in front of the mirror, a real image.",
          "\\(m = -v/u = -(-60)/(-20) = -3\\): inverted and three times as tall.",
        ],
        answer: "60 cm in front of the mirror; real, inverted and magnified three times.",
      },
      selfCheckExample: {
        prompt: "An object is 10 cm in front of a convex mirror of focal length 10 cm. Where is the image?",
        steps: [
          "For a convex mirror \\(f = +10\\) cm, and \\(u = -10\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{10} - \\dfrac{1}{-10} = \\dfrac{2}{10}\\), so \\(v = +5\\) cm.",
          "A positive \\(v\\) is behind the mirror, so the image is virtual.",
        ],
        answer: "5 cm behind the mirror: virtual, erect and diminished.",
      },
      pyqExampleId: "e0174208-f888-45bc-ae56-b5e0008bb586",
      practiceSet: [
        { prompt: "What is the focal length of a concave mirror whose radius of curvature is 40 cm?", answer: "20 cm" },
        { prompt: "Which kind of mirror is used as a rear-view mirror in a car?", answer: "Convex" },
        { prompt: "Where should an object be placed before a concave mirror to get a real image of the same size?", answer: "At the centre of curvature, C" },
        { prompt: "Which mirror is used in a torch or a car headlight to send out a parallel beam?", answer: "Concave, with the bulb at its focus" },
      ],
      traps: [
        {
          title: "The focus is at half the radius",
          body: "For a spherical mirror \\(f = R/2\\). An object at a distance equal to \\(R/2\\) is **at the focus**, so its image is at infinity, not at the centre of curvature.",
        },
        {
          title: "Erect at every distance means plane or convex",
          body: "A concave mirror gives an erect image only when the object is inside its focus. If the image stays erect wherever you stand, the mirror is **plane or convex**, and the stem cannot tell which.",
        },
      ],
    },
  ],
};
