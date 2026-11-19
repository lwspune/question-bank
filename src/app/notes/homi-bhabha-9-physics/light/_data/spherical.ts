import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LI_SPHERICAL_NOTE: SubtopicNote = {
  subtopicName: "Spherical Mirrors",
  title: "Spherical Mirrors",
  oneLineDefinition:
    "A spherical mirror is a piece of a hollow sphere: its focal length is half its radius of curvature, a concave mirror can form real or virtual images, a convex mirror only small virtual ones, and a plane mirror only same-size virtual ones.",
  whyItMatters:
    "Eight questions in the bank, six MODERATE and two HARD. Four are about the parts of a mirror: two are the same question (2021 and 2023) on what is not common to mirrors cut from one sphere, one asks which mirror is least curved, and one sorts the three mirrors by focal length. The other four compare mirrors by their images and rays: spot the wrong ray diagram, name two mirrors from their pictures, and fill two Venn diagrams of image types.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9lisp-terms",
      name: "Parts of a spherical mirror: f = R/2",
      intuition:
        "Cut a piece from a hollow glass ball and silver one side. If the inside of the curve shines, it is a concave mirror; if the outside shines, it is convex. Every piece cut from the same ball has the same curve, so the same radius and the same focal length. Only the middle point of each piece, its pole, is different.",
      definition:
        "- **Pole (P)**: the middle point of the mirror's surface. Each mirror has its **own** pole.\n" +
        "- **Centre of curvature (C)**: the centre of the sphere the mirror is part of. **Radius of curvature (R)**: the radius of that sphere.\n" +
        "- **Principal axis**: the line through P and C. **Principal focus (F)**: the point on it where rays parallel to the axis meet (concave) or seem to come from (convex) after reflection.\n" +
        "- **Focal length**: \\(f = \\frac{R}{2}\\), the distance from P to F. F lies halfway between P and C.\n" +
        "- Mirrors cut from the **same sphere** share C, R and f, but **not** the pole.\n" +
        "- A **larger** radius means a **less curved** mirror. A **plane mirror** is a sphere of infinite radius: its focal length is **infinite**.\n" +
        "- **Sign convention**: distances are measured from the pole, positive in the direction the light travels. So a **concave** mirror has a **negative** focal length and a **convex** mirror a **positive** one.",
      formula: {
        label: "Focal length and radius",
        latex: "f = \\frac{R}{2} \\qquad R = 2f",
        symbols: [
          { symbol: "f", meaning: "focal length, the distance from the pole to the focus" },
          { symbol: "R", meaning: "radius of curvature, the distance from the pole to the centre of curvature" },
        ],
      },
      authoredExample: {
        prompt: "A concave mirror has a radius of curvature of 30 cm. Find its focal length, and say where an object must be placed for the mirror to form a real image of the same size.",
        steps: [
          "\\(f = \\frac{R}{2} = \\frac{30}{2} = 15\\) cm.",
          "A concave mirror forms a real, same-size image when the object is at the centre of curvature, which is R = 30 cm from the pole.",
        ],
        answer: "15 cm; at 30 cm in front of the mirror (at C)",
      },
      selfCheckExample: {
        prompt: "Which mirror is more curved: one with a radius of curvature of 20 cm or one with a focal length of 8 cm?",
        steps: ["The second has \\(R = 2 \\times 8 = 16\\) cm.", "The smaller radius is the more curved mirror."],
        answer: "The mirror with the 8 cm focal length (R = 16 cm)",
      },
      practiceSet: [
        { prompt: "The focal length of a concave mirror is 12 cm. What is its radius of curvature?", answer: "24 cm" },
        { prompt: "Two mirrors are cut from the same hollow sphere. Do they have the same focal length?", answer: "Yes: they have the same radius of curvature, so the same focal length" },
        { prompt: "What is the focal length of a plane mirror?", answer: "Infinite" },
        { prompt: "Using the sign convention, is the focal length of a convex mirror positive or negative?", answer: "Positive" },
      ],
      pyqExampleId: "cb266ed0-1490-4777-9906-c3301f00f00a",
      traps: [
        {
          title: "Thinking a larger radius means a more curved mirror",
          body: "A larger sphere curves more gently. The mirror with the largest radius of curvature is the least curved.",
        },
        {
          title: "Comparing a focal length with a radius directly",
          body: "Change every value to the same quantity first: a focal length of 5 cm is a radius of 10 cm.",
        },
        {
          title: "Saying the pole is common to mirrors from one sphere",
          body: "The centre of curvature, the radius and the focal length are shared, but each mirror's pole is the middle of its own surface, so the poles differ.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9lisp-compare",
      name: "Rays and images of plane, concave and convex mirrors",
      intuition:
        "A concave mirror is like the inside of a spoon: close up it shows you large and upright, far away small and upside down. A convex mirror is like the back of the spoon: always small and upright, but it shows a wide view, which is why it sits on the side of a car. To find an image, draw any two of the easy rays.",
      definition:
        "- **Concave mirror rays**: a ray **parallel** to the axis reflects **through F**; a ray **through F** reflects **parallel** to the axis; a ray **through C** comes **straight back** along itself; a ray striking the **pole** reflects at an equal angle on the other side of the axis.\n" +
        "- **Convex mirror rays**: a ray parallel to the axis reflects as if coming **from F** behind the mirror; a ray heading **towards C** comes straight back.\n" +
        "- **Concave**: forms **real, inverted** images (smaller, same size or larger) when the object is beyond F, and a **virtual, erect, enlarged** image when the object is between P and F. Its virtual image is never smaller.\n" +
        "- **Convex**: always a **virtual, erect, smaller** image.\n" +
        "- **Plane**: always a **virtual, erect, same-size** image.\n" +
        "- All three can form a **virtual, erect** image. Only the plane and concave mirrors give a **same-size** image; only the concave and convex mirrors give a **smaller** one.",
      table: {
        columns: ["Mirror", "Images it can form", "Uses"],
        rows: [
          { cells: ["Plane", "Always virtual, erect and the same size", "Looking glass, periscope"] },
          {
            cells: ["Concave", "Real and inverted (smaller, same size or larger), or virtual, erect and larger", "Shaving and dentist's mirrors, torch and headlight reflectors, solar cookers"],
          },
          { cells: ["Convex", "Always virtual, erect and smaller", "Rear-view mirrors of vehicles, security mirrors in shops"] },
        ],
        caption: "For a Venn diagram of the three mirrors, list what each can form, then find what each overlap shares and the others lack.",
      },
      selfCheckExample: {
        prompt: "A mirror always shows a small, upright image of a whole street behind a bus. Which kind of mirror is it?",
        steps: ["Only a convex mirror always gives a smaller, erect image.", "It also gives a wide field of view."],
        answer: "A convex mirror",
      },
      practiceSet: [
        { prompt: "After reflection from a concave mirror, which way does a ray that passed through the focus travel?", answer: "Parallel to the principal axis" },
        { prompt: "Which mirror can form an image of the same size as the object but never a smaller one?", answer: "A plane mirror" },
        { prompt: "Which kind of mirror is used in a torch to send out a strong, parallel beam?", answer: "A concave mirror, with the bulb at its focus" },
        { prompt: "A ray travelling towards the centre of curvature of a convex mirror strikes it. How is it reflected?", answer: "Straight back along its own path" },
      ],
      pyqExampleId: "bd983b17-9025-42a7-8b43-5de2e1679c19",
      traps: [
        {
          title: "Sending a ray through F back through C",
          body: "A ray through the focus of a concave mirror reflects parallel to the principal axis. Only a ray through C comes straight back.",
        },
        {
          title: "Thinking a concave mirror's virtual image can be small",
          body: "The virtual image of a concave mirror is always larger than the object. A small virtual image means a convex mirror.",
        },
        {
          title: "Thinking a spherical mirror always forms a real image",
          body: "A convex mirror never forms a real image, and a concave mirror forms a virtual one when the object is between the pole and the focus.",
        },
      ],
    },
  ],
};
