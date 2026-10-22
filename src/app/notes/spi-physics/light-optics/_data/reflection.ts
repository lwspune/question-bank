import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_LO_REFLECTION_NOTE: SubtopicNote = {
  subtopicName: "Light and Reflection",
  title: "Light and Reflection",
  oneLineDefinition:
    "Light is a transverse electromagnetic wave that travels in straight lines, and when it bounces off a mirror the angle of reflection always equals the angle of incidence.",
  whyItMatters:
    "Six questions in the bank, all EASY: what kind of wave light is, what a bundle of rays is called, whether the angle of reflection always equals the angle of incidence, and twice which mirror gives the widest view. Each is one fact, so a short table and the two laws of reflection cover the page.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spilore-light",
      name: "What light is",
      intuition:
        "Light needs nothing to travel through: it reaches us from the Sun across empty space. It is an electromagnetic wave whose vibrations are at right angles to its direction of travel, and it moves in straight lines, which is why objects cast sharp shadows.",
      definition:
        "- Light is an **electromagnetic wave**, so it needs **no medium** and can travel through a vacuum.\n" +
        "- It is a **transverse** wave: its electric and magnetic fields vibrate at right angles to the direction it travels.\n" +
        "- A **ray** is a single straight line along which light travels; a **beam** is a bundle of rays.",
      table: {
        columns: ["Fact", "Value"],
        rows: [
          { cells: ["Kind of wave", "Electromagnetic"] },
          {
            cells: ["Transverse or longitudinal", "Transverse"],
            noteAmber: "Sound is the longitudinal one; light is not.",
          },
          { cells: ["Needs a medium", "No, it travels through a vacuum"] },
          { cells: ["Speed in a vacuum", "\\(3 \\times 10^8\\) m/s"] },
          { cells: ["Path in one medium", "Straight lines, so opaque objects cast shadows"] },
          { cells: ["Ray", "One straight line along which light travels"] },
          { cells: ["Beam", "A bundle of rays"] },
        ],
        caption: "Radio waves, X-rays and light are all electromagnetic waves; they differ only in wavelength.",
      },
      selfCheckExample: {
        prompt: "Can light travel through a vacuum? Give the reason.",
        steps: ["Light is an electromagnetic wave.", "Electromagnetic waves need no medium."],
        answer: "Yes, because it is an electromagnetic wave",
      },
      practiceSet: [
        { prompt: "What is the speed of light in a vacuum?", answer: "\\(3 \\times 10^8\\) m/s" },
        { prompt: "What is a single straight line along which light travels called?", answer: "A ray" },
        { prompt: "Why does an opaque object cast a shadow?", answer: "Light travels in straight lines" },
        { prompt: "Is light a mechanical wave?", answer: "No, it is an electromagnetic wave and needs no medium" },
      ],
      pyqExampleId: "69fb51c2-9732-47a4-acbd-f118147ae4d5",
      traps: [
        {
          title: "Calling light a radio wave",
          body: "Radio waves and light belong to the same electromagnetic family, but light is not a radio wave. The family name is 'electromagnetic waves'.",
        },
        {
          title: "Calling light longitudinal",
          body: "Light is transverse: its fields vibrate across its direction of travel. A longitudinal wave, like sound, vibrates along it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spilore-laws",
      name: "The laws of reflection",
      intuition:
        "A ray of light bounces off a mirror like a ball off a wall: it leaves at the same slope it came in. The slope is always measured from the **normal**, the line at right angles to the mirror.",
      definition:
        "- **First law:** the incident ray, the reflected ray and the normal all lie in one plane.\n" +
        "- **Second law:** the angle of reflection equals the angle of incidence, \\(\\angle r = \\angle i\\).\n" +
        "- Both angles are measured from the **normal**, never from the mirror's surface.\n" +
        "- The laws hold **always**: for plane and curved mirrors alike, using the normal at the point where the ray strikes.\n" +
        "- A **plane mirror** gives an image that is virtual, erect, the same size, as far behind the mirror as the object is in front, and laterally inverted (left and right swapped).",
      formula: {
        label: "Law of reflection",
        latex: "\\angle r = \\angle i \\qquad \\angle i = 90^\\circ - (\\text{angle between the ray and the mirror})",
      },
      authoredExample: {
        prompt: "A ray strikes a plane mirror making an angle of \\(35^\\circ\\) with the mirror's surface. Find the angle of reflection and the angle between the incident and reflected rays.",
        steps: [
          "Angle of incidence is measured from the normal: \\(90^\\circ - 35^\\circ = 55^\\circ\\).",
          "Angle of reflection \\(= 55^\\circ\\).",
          "Angle between the two rays \\(= 55^\\circ + 55^\\circ = 110^\\circ\\).",
        ],
        answer: "\\(55^\\circ\\); \\(110^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "A girl stands 2 m in front of a plane mirror. How far is she from her image?",
        steps: ["The image is 2 m behind the mirror.", "Distance from girl to image \\(= 2 + 2 = 4\\) m."],
        answer: "4 m",
      },
      practiceSet: [
        { prompt: "The angle of incidence on a mirror is \\(40^\\circ\\). What is the angle between the incident and reflected rays?", answer: "\\(80^\\circ\\)" },
        { prompt: "A ray falls along the normal to a mirror. What is its angle of reflection?", answer: "\\(0^\\circ\\): it goes straight back" },
        { prompt: "Is the image in a plane mirror real or virtual?", answer: "Virtual" },
        { prompt: "From which line are the angles of incidence and reflection measured?", answer: "The normal to the surface" },
      ],
      pyqExampleId: "38e87d24-024f-4dce-bd46-a9f014177812",
      traps: [
        {
          title: "Measuring from the mirror",
          body: "A ray at \\(30^\\circ\\) to the mirror's surface has an angle of incidence of \\(60^\\circ\\), because the angle is taken from the normal.",
        },
        {
          title: "Thinking the law fails for curved mirrors",
          body: "The angle of reflection equals the angle of incidence for every mirror, every time. On a curved mirror, use the normal at the point where the ray strikes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spilore-mirrors",
      name: "Plane, concave and convex mirrors and their uses",
      intuition:
        "A mirror's shape decides its image, and its image decides its job. A convex mirror bulges out, so it squeezes a wide scene into a small upright picture; a concave mirror curves in, so it can gather light or magnify a face held close.",
      definition:
        "- A **concave** mirror curves inward; a **convex** mirror bulges outward.\n" +
        "- For a spherical mirror the focal length is half the radius of curvature: \\(f = \\dfrac{R}{2}\\).\n" +
        "- A **convex** mirror always gives a virtual, erect, **diminished** image and the **widest field of view**.",
      table: {
        columns: ["Mirror", "Image", "Uses"],
        rows: [
          { cells: ["Plane", "Virtual, erect, same size", "Looking glass, periscope"] },
          {
            cells: ["Concave, object far away", "Real and inverted", "Torch and headlight reflectors, solar cookers"],
          },
          {
            cells: ["Concave, object very close", "Virtual, erect, enlarged", "Shaving and make-up mirrors, a dentist's mirror"],
          },
          {
            cells: ["Convex", "Always virtual, erect, diminished", "Rear-view and side-view mirrors of vehicles, shop security mirrors"],
            noteAmber: "Widest field of view of the three.",
          },
        ],
        caption: "A torch or headlight puts its bulb at the focus of a concave mirror to send out a parallel beam.",
      },
      selfCheckExample: {
        prompt: "Which mirror is used in a car's headlight to send out a strong parallel beam?",
        steps: ["A parallel beam comes from a source at the focus of a converging mirror.", "The converging mirror is concave."],
        answer: "Concave mirror",
      },
      practiceSet: [
        { prompt: "Which mirror does a dentist use to see an enlarged image of a tooth?", answer: "Concave mirror" },
        { prompt: "What kind of image does a convex mirror always form?", answer: "Virtual, erect and diminished" },
        { prompt: "A spherical mirror has a radius of curvature of 30 cm. What is its focal length?", answer: "15 cm" },
        { prompt: "Which mirror is used as a shaving mirror?", answer: "Concave mirror" },
      ],
      pyqExampleId: "9ab36a8a-82a9-4d87-9284-c952144c247c",
      traps: [
        {
          title: "Choosing a plane mirror for the rear view",
          body: "A plane mirror shows only an area as big as itself. A convex mirror shows a much wider area, which is why vehicles use it.",
        },
        {
          title: "Thinking a concave mirror always gives a real image",
          body: "With the object between the focus and the mirror, a concave mirror gives a virtual, erect, enlarged image. That is how a shaving mirror works.",
        },
      ],
    },
  ],
};
