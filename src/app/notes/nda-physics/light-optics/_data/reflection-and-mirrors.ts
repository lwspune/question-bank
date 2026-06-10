import type { SubtopicNote } from "@/app/notes/_types";

export const REFLECTION_AND_MIRRORS_NOTE: SubtopicNote = {
  subtopicName: "Reflection and Mirrors",
  title: "Reflection and Mirrors",
  oneLineDefinition:
    "Light bounces off a surface obeying two laws (angle in = angle out, all in one plane). A plane mirror gives a virtual, erect, laterally-inverted, same-size image; spherical mirrors (concave converging, convex diverging) form images set by where the object sits relative to F and C.",
  whyItMatters:
    "Eighteen PYQs and the chapter's home for sign-convention numerics. The recurring tests are: the laws of reflection, the plane-mirror image properties (and the half-your-height result), R = 2f, the image-formation table for concave and convex mirrors, and the mirror formula with magnification. Two of the three HARD questions live here, both carried by image-formation reasoning.",
  concepts: [
    // 1 — FOUNDATION: nature of light + laws of reflection
    {
      kind: "formula" as const,
      slug: "laws-of-reflection",
      name: "Light rays and the laws of reflection",
      intuition:
        "Light travels in straight lines (rays) until it meets a surface. When it bounces off, two simple rules always hold: it turns back by exactly the angle it came in at, and the incoming ray, the reflected ray, and the line perpendicular to the surface (the normal) all lie flat in one plane.",
      definition:
        "Light is an electromagnetic wave that travels in straight lines in a uniform medium. On reflection:\n" +
        "- The **angle of incidence equals the angle of reflection** — both measured from the **normal** (the line perpendicular to the surface), not from the surface itself.\n" +
        "- The **incident ray, reflected ray, and normal all lie in one plane**.\n" +
        "These laws hold for every mirror, flat or curved.",
      authoredExample: {
        prompt:
          "A ray strikes a plane mirror making a 30° angle with the mirror surface. What is the angle of reflection?",
        steps: [
          "Angles in reflection are measured from the NORMAL, not the surface.",
          "If the ray makes 30° with the surface, it makes \\(90° - 30° = 60°\\) with the normal — so the angle of incidence is 60°.",
          "By the law of reflection, the angle of reflection equals the angle of incidence.",
        ],
        answer: "60° (measured from the normal).",
      },
      selfCheckExample: {
        prompt:
          "A ray hits a mirror along the normal (perpendicular to the surface). At what angle does it reflect?",
        steps: [
          "Along the normal means the angle of incidence is 0°.",
          "Angle of reflection equals angle of incidence = 0°.",
          "The ray simply retraces its own path straight back.",
        ],
        answer: "It reflects straight back along the normal (0°).",
      },
      practiceSet: [
        { prompt: "Angle of incidence is measured from the surface or the normal?", answer: "The normal" },
        { prompt: "If the angle of incidence is 35°, the angle of reflection is…", answer: "35°" },
        { prompt: "A ray makes 50° with a mirror surface. Angle of incidence?", answer: "40°", method: "90° − 50°" },
      ],
      traps: [
        {
          title: "Measure angles from the normal, not the surface",
          body:
            "The single most common reflection error: a ray quoted as making angle θ with the mirror SURFACE has angle of incidence (90° − θ). NDA likes to state the surface angle and watch you forget to convert.",
        },
      ],
    },

    // 2 — plane mirrors
    {
      kind: "formula" as const,
      slug: "plane-mirror-images",
      name: "Plane mirror images",
      intuition:
        "Stand in front of a flat mirror: your image looks the same size, stands the same way up, appears as far behind the glass as you are in front, and your left hand looks like the image's right hand. The image is virtual — you cannot catch it on a screen.",
      definition:
        "A plane mirror image is:\n" +
        "- **Virtual** (formed behind the mirror, cannot be projected on a screen),\n" +
        "- **Erect** (the same way up),\n" +
        "- **Same size** as the object,\n" +
        "- **Laterally inverted** (left ↔ right swapped),\n" +
        "- as far **behind** the mirror as the object is in front.\n" +
        "A periscope uses two plane mirrors and works purely by **reflection**. To see your **full height** you need a mirror only **half your height**, fixed at the right level — this is independent of how far you stand.",
      authoredExample: {
        prompt:
          "A girl 1.6 m tall wants to see her complete image in a fixed plane mirror on the wall. What is the minimum height of mirror she needs?",
        steps: [
          "The minimum mirror height to see a full image is exactly half the person's height — a result of the geometry of equal incidence and reflection angles.",
          "Minimum height \\(= 1.6 / 2 = 0.8\\) m.",
          "This does not depend on her distance from the mirror.",
        ],
        answer: "0.8 m.",
      },
      selfCheckExample: {
        prompt:
          "Which way is a plane-mirror image inverted — top-to-bottom or left-to-right?",
        steps: [
          "A plane mirror keeps top as top and bottom as bottom (it is erect).",
          "It swaps left and right — this is called lateral inversion.",
        ],
        answer: "Left-to-right (laterally inverted); it is NOT turned upside down.",
      },
      practiceSet: [
        { prompt: "Is a plane-mirror image real or virtual?", answer: "Virtual" },
        { prompt: "Minimum mirror height to see your full 1.5 m height?", answer: "0.75 m", method: "half the height" },
        { prompt: "A periscope works on which phenomenon?", answer: "Reflection of light" },
        { prompt: "Plane-mirror image size compared to object?", answer: "Same size" },
      ],
      pyqExampleId: "6bd69e36-9779-4d35-84b6-be4d87a62fbf", // 2023 — half-height mirror
      traps: [
        {
          title: "Virtual + erect + same-size — and only laterally inverted",
          body:
            "Students often say a plane mirror 'inverts' the image and picture it upside down. It is ERECT. The only swap is left ↔ right (lateral inversion). Size is unchanged.",
        },
        {
          title: "Half your height — distance does not matter",
          body:
            "The minimum mirror height is always half the object height, no matter how far back you stand. Distractors tempt you with the full height or a distance-dependent answer.",
        },
      ],
    },

    // 3 — spherical mirror basics + R = 2f
    {
      kind: "formula" as const,
      slug: "spherical-mirror-basics",
      name: "Spherical mirrors — pole, focus, centre, and R = 2f",
      intuition:
        "A spherical mirror is a slice of a shiny sphere. Its centre point is the pole P; the centre of the original sphere is C (the centre of curvature); halfway between sits the focus F. A concave mirror caves inward and converges light; a convex mirror bulges out and diverges light. The focal length is always half the radius of curvature.",
      definition:
        "Key points on a spherical mirror: **pole (P)** — the centre of the reflecting surface; **centre of curvature (C)** — centre of the sphere it is cut from; **focus (F)** — the point where rays parallel to the axis converge (concave) or appear to diverge from (convex); **radius of curvature (R) = PC**.\n" +
        "- **Relation:** \\(R = 2f\\), i.e. \\(f = R/2\\).\n" +
        "- A **concave** mirror is converging; a **convex** mirror is diverging.\n" +
        "- A **plane mirror** is the limiting case \\(R \\to \\infty\\), so \\(f \\to \\infty\\) — which is why the mirror formula reduces to the plane-mirror equation there.",
      formula: {
        label: "Focal length and radius of curvature",
        latex: "f = \\dfrac{R}{2}",
        symbols: [
          { symbol: "f", meaning: "focal length" },
          { symbol: "R", meaning: "radius of curvature (= PC)" },
        ],
      },
      authoredExample: {
        prompt:
          "A concave mirror has a radius of curvature of 40 cm. What is its focal length?",
        steps: [
          "Use \\(f = R/2\\).",
          "\\(f = 40 / 2 = 20\\) cm.",
        ],
        answer: "20 cm.",
      },
      selfCheckExample: {
        prompt:
          "For a spherical mirror, how does the focal length relate to the radius of curvature, and what happens to f for a plane mirror?",
        steps: [
          "\\(f = R/2\\) for any spherical mirror.",
          "A plane mirror is flat — its radius of curvature is infinite.",
          "So its focal length is also infinite.",
        ],
        answer: "\\(f = R/2\\); for a plane mirror \\(R \\to \\infty\\), so \\(f \\to \\infty\\).",
      },
      practiceSet: [
        { prompt: "Focal length of a mirror with R = 30 cm?", answer: "15 cm", method: "f = R/2" },
        { prompt: "Radius of curvature of a mirror with f = 12 cm?", answer: "24 cm", method: "R = 2f" },
        { prompt: "A concave mirror is converging or diverging?", answer: "Converging" },
        { prompt: "For a plane mirror, focal length is…", answer: "Infinite" },
      ],
      pyqExampleId: "43b9a202-6f07-46f6-9511-9f8824eb6a32", // 2020 — R = 2f
      traps: [
        {
          title: "R = 2f, so f = R/2 — not f = 2R",
          body:
            "The focus is HALFWAY between the pole and the centre of curvature, so f is HALF of R. Flipping it to f = 2R is a classic slip.",
        },
      ],
    },

    // 4 — concave mirror image formation
    {
      kind: "formula" as const,
      slug: "concave-mirror-images",
      name: "Concave mirror — image formation",
      intuition:
        "A concave mirror converges light, so where the image forms — and whether it is real or virtual, enlarged or shrunk — depends entirely on where the object sits relative to F and C. Bring the object closer than F and the image flips to virtual, erect and magnified (that is the shaving/make-up mirror). That is why concave mirrors are used in vehicle headlights — a source at F sends out a parallel beam.",
      definition:
        "Concave-mirror image as the object moves in:\n" +
        "- **Beyond C:** real, inverted, **diminished**, between F and C.\n" +
        "- **At C:** real, inverted, **same size**, at C.\n" +
        "- **Between C and F:** real, inverted, **magnified**, beyond C.\n" +
        "- **At F:** image at **infinity** (used in headlights/searchlights — source at F gives a parallel beam).\n" +
        "- **Between F and P:** **virtual, erect, magnified**, behind the mirror.\n" +
        "An object exactly at the focus does NOT give an image between F and P — that combination is impossible.",
      visualizationSlug: "opt-concave-mirror-rays",
      authoredExample: {
        prompt:
          "Where is the image formed when an object is placed exactly at the centre of curvature of a concave mirror, and what is its nature?",
        steps: [
          "At C, the image forms at C itself (the ray through C retraces, and the parallel ray reflects through F, meeting back at C).",
          "It is real and inverted.",
          "It is the same size as the object (magnification 1).",
        ],
        answer: "At C — real, inverted, same size.",
      },
      selfCheckExample: {
        prompt:
          "An object is placed between the focus F and the pole P of a concave mirror. State the three properties of the image.",
        steps: [
          "Object inside F: the reflected rays diverge, so they only meet when projected behind the mirror.",
          "That makes the image virtual and erect.",
          "It is also magnified (larger than the object) — the shaving-mirror configuration.",
        ],
        answer: "Virtual, erect, magnified (behind the mirror).",
      },
      practiceSet: [
        { prompt: "Object beyond C in a concave mirror — image is enlarged or diminished?", answer: "Diminished" },
        { prompt: "Object at F of a concave mirror — image forms where?", answer: "At infinity" },
        { prompt: "Why is a concave mirror used in a headlight?", answer: "A source at F gives a parallel beam" },
        { prompt: "Object between F and P of a concave mirror — image real or virtual?", answer: "Virtual (erect, magnified)" },
      ],
      pyqExampleId: "69c3c50a-fe1c-4efb-848f-94365c6a3266", // 2020 — object between F and P, image NOT at infinity
      traps: [
        {
          title: "Object at F gives the image at infinity, not between F and P",
          body:
            "When an object sits between F and P the image IS virtual/erect/magnified — but it is the object at F (not the image) that goes to infinity. 'Image at infinity' is the false statement when the object is between F and P.",
        },
        {
          title: "Only inside F does a concave mirror give a virtual image",
          body:
            "Everywhere from infinity down to F the concave mirror gives a REAL, inverted image. The image only becomes virtual and erect once the object crosses inside the focus.",
        },
      ],
    },

    // 5 — convex mirror image formation
    {
      kind: "formula" as const,
      slug: "convex-mirror-images",
      name: "Convex mirror — always virtual, erect, diminished",
      intuition:
        "A convex mirror bulges toward you and spreads light out, so it can never bring rays to a real focus in front of it. Wherever the object is, the image is virtual, the right way up, and smaller — squeezed into the small space between the pole and the focus behind the mirror. Shrinking the scene is exactly what gives a wide field of view, which is why it is the vehicle rear-view mirror.",
      definition:
        "For a convex mirror, for **every** real object position:\n" +
        "- the image is **virtual**,\n" +
        "- **erect**,\n" +
        "- **diminished** (smaller than the object),\n" +
        "- located **between the pole P and the focus F, behind the mirror**.\n" +
        "It can never form a real or inverted image. The wide field of view makes it ideal for **rear-view mirrors** and at blind corners.",
      visualizationSlug: "opt-convex-mirror-rays",
      authoredExample: {
        prompt:
          "An object is moved from far away toward a convex mirror. Describe how the image changes.",
        steps: [
          "A convex mirror always gives a virtual, erect, diminished image between P and F.",
          "As the object approaches, the image stays virtual and erect but grows slightly (still smaller than the object) and moves toward the pole.",
          "It never becomes real or inverted at any position.",
        ],
        answer: "Always virtual, erect and diminished; it grows a little and moves toward P as the object nears.",
      },
      selfCheckExample: {
        prompt:
          "A mirror always forms a virtual, erect, diminished image between its pole and focus, no matter where the object is. What type of mirror is it?",
        steps: [
          "'Image always between pole and focus, behind the mirror' is the signature of one mirror only.",
          "Concave mirrors give real images for most object positions, so it is not concave.",
          "This behaviour is unique to a convex mirror.",
        ],
        answer: "A convex mirror.",
      },
      practiceSet: [
        { prompt: "Nature of a convex-mirror image (three words)?", answer: "Virtual, erect, diminished" },
        { prompt: "Can a convex mirror form an inverted image?", answer: "No, never" },
        { prompt: "Which mirror is used as a vehicle rear-view mirror?", answer: "Convex" },
        { prompt: "A convex-mirror image lies between which two points?", answer: "Pole and focus (behind the mirror)" },
      ],
      pyqExampleId: "408ec05e-8c58-4f57-840a-17b9cd2bb746", // 2025 — convex image between P and F
      traps: [
        {
          title: "A convex mirror NEVER inverts",
          body:
            "Because the image is always virtual and erect, a convex mirror can never produce an inverted image. Any option claiming an inverted convex-mirror image is the wrong statement.",
        },
      ],
    },

    // 6 — mirror formula + magnification
    {
      kind: "formula" as const,
      slug: "mirror-formula-and-magnification",
      name: "Mirror formula and magnification",
      intuition:
        "The mirror formula ties object distance, image distance and focal length in one equation; magnification then tells you how big and which way up the image is. The whole game is signs: with the New Cartesian convention, distances measured against the incoming light are negative, so a concave mirror's f is negative and a convex mirror's f is positive.",
      definition:
        "**Mirror formula:** \\(\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}\\), where distances follow the New Cartesian sign convention (measured from the pole; distances against the incident light are negative).\n" +
        "**Magnification:** \\(m = \\dfrac{h'}{h} = -\\dfrac{v}{u}\\).\n" +
        "- \\(m < 0\\): real, inverted image. \\(m > 0\\): virtual, erect image.\n" +
        "- \\(|m| > 1\\): magnified; \\(|m| < 1\\): diminished.\n" +
        "Concave mirror: \\(f\\) is negative. Convex mirror: \\(f\\) is positive.",
      formula: {
        label: "Mirror formula and magnification",
        latex: "\\dfrac{1}{v} + \\dfrac{1}{u} = \\dfrac{1}{f}, \\qquad m = -\\dfrac{v}{u}",
        symbols: [
          { symbol: "u", meaning: "object distance (from pole)" },
          { symbol: "v", meaning: "image distance (from pole)" },
          { symbol: "f", meaning: "focal length (−ve concave, +ve convex)" },
          { symbol: "m", meaning: "magnification (h'/h)" },
        ],
      },
      authoredExample: {
        prompt:
          "An object is placed 30 cm in front of a concave mirror of focal length 20 cm. Find the image distance and magnification.",
        steps: [
          "Sign convention: \\(u = -30\\) cm, \\(f = -20\\) cm (concave).",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u} = \\dfrac{1}{-20} - \\dfrac{1}{-30} = -\\dfrac{3}{60} + \\dfrac{2}{60} = -\\dfrac{1}{60}\\).",
          "So \\(v = -60\\) cm (real image, in front of the mirror).",
          "\\(m = -v/u = -(-60)/(-30) = -2\\): inverted and twice the size.",
        ],
        answer: "\\(v = -60\\) cm; \\(m = -2\\) (real, inverted, magnified ×2).",
      },
      selfCheckExample: {
        prompt:
          "An object is placed 15 cm in front of a convex mirror of focal length 10 cm. Find the image distance and the magnification.",
        steps: [
          "Convex mirror: \\(f = +10\\) cm, object distance \\(u = -15\\) cm.",
          "\\(\\dfrac{1}{v} = \\dfrac{1}{f} - \\dfrac{1}{u} = \\dfrac{1}{10} - \\dfrac{1}{-15} = \\dfrac{3}{30} + \\dfrac{2}{30} = \\dfrac{5}{30} = \\dfrac{1}{6}\\).",
          "So \\(v = +6\\) cm (positive ⟹ virtual, behind the mirror).",
          "\\(m = -v/u = -(6)/(-15) = +0.4\\): virtual, erect, diminished — exactly what a convex mirror always gives.",
        ],
        answer: "\\(v = +6\\) cm; \\(m = +0.4\\) (virtual, erect, diminished).",
      },
      practiceSet: [
        { prompt: "Sign of f for a concave mirror?", answer: "Negative", method: "New Cartesian convention" },
        { prompt: "A magnification of −2 means the image is…", answer: "Real, inverted, twice the size" },
        { prompt: "Does the mirror formula 1/v + 1/u = 1/f apply to lenses too?", answer: "The same FORM holds; for a lens it is 1/v − 1/u = 1/f" },
        { prompt: "m = +0.5 means the image is…", answer: "Virtual, erect, half size" },
      ],
      pyqExampleId: "a537b313-10ba-4f26-bf71-bd5af8925f8a", // 2021 — plane mirror as f → ∞
      traps: [
        {
          title: "Sign convention is the whole game",
          body:
            "Almost every wrong numeric answer comes from a sign slip. Concave f is negative, convex f is positive, real distances in front of the mirror are negative. Write the signs down BEFORE substituting.",
        },
        {
          title: "Magnification sign tells you real vs virtual",
          body:
            "Negative m = real and inverted; positive m = virtual and erect. Don't read |m| alone and forget the sign — it carries the orientation.",
        },
      ],
    },
  ],
};
