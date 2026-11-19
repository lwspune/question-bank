import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SA_TELESCOPES_NOTE: SubtopicNote = {
  subtopicName: "Telescopes",
  title: "Telescopes",
  oneLineDefinition:
    "A refracting telescope uses two convex lenses; a reflecting telescope collects light with a concave mirror (Newtonian with a plane mirror, Cassegrain with a convex mirror); radio and space telescopes catch the radiation our eyes and air cannot.",
  whyItMatters:
    "Five questions in the bank, all MODERATE: two pick the true statements about a lens (refracting) telescope, one names the parts of a Cassegrain telescope, one sorts telescopes in a flow chart by their lenses and mirrors, and one asks which country launched the Chandra X-ray telescope. Know which lenses and mirrors each telescope uses and all five fall.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sate-refracting",
      name: "The refracting (lens) telescope",
      intuition:
        "A distant star sends very little light to us. A telescope gathers that light with a big lens, the objective, and forms an image of the star. A small lens near your eye, the eyepiece, then magnifies that image. The bigger the objective, the more light it gathers and the fainter the stars you can see.",
      definition:
        "- A **refracting telescope** uses only **lenses**: two **convex lenses**. Light is only **refracted**, never reflected.\n" +
        "- The **objective** lens is **large**, with a long focal length, to **collect as much light as possible**.\n" +
        "- The **eyepiece** is **smaller**, with a short focal length; it magnifies the image.\n" +
        "- A lens bends different colours by different amounts, so the image has coloured edges: **chromatic aberration**.\n" +
        "- A very large lens is heavy, sags under its own weight and is hard to make, so the biggest telescopes use mirrors instead.\n" +
        "- **Galileo** was the first to turn a telescope to the sky, in 1609.",
      table: {
        columns: ["Part", "Kind of lens", "Size and job"],
        rows: [
          { cells: ["Objective", "Convex lens", "Large, long focal length: collects the light and forms the image"] },
          { cells: ["Eyepiece", "Convex lens", "Small, short focal length: magnifies the image for the eye"] },
        ],
        caption: "The objective is always the bigger of the two lenses.",
      },
      selfCheckExample: {
        prompt: "A telescope shows coloured edges around the image of a white star. Which kind of telescope is it likely to be, and what is this fault called?",
        steps: ["Lenses split white light into colours; mirrors do not.", "So the telescope uses lenses."],
        answer: "A refracting telescope; the fault is chromatic aberration",
      },
      practiceSet: [
        { prompt: "What kind of lenses does a refracting telescope use?", answer: "Two convex lenses" },
        { prompt: "Why is the objective lens of a telescope made large?", answer: "To collect as much light as possible from faint, distant objects" },
        { prompt: "Why are the world's largest telescopes made with mirrors rather than lenses?", answer: "A huge lens is heavy, sags and splits colours; a mirror can be held from behind and has no chromatic aberration" },
        { prompt: "Who was the first person to look at the sky through a telescope?", answer: "Galileo" },
      ],
      pyqExampleId: "59b659b7-c9b1-4202-a170-5b4cded19a3b",
      traps: [
        {
          title: "Thinking the objective is small",
          body: "The objective is made large to gather more light. The eyepiece is the smaller lens.",
        },
        {
          title: "Thinking light is reflected inside a lens telescope",
          body: "In a refracting telescope the light passes through lenses and is only refracted. Reflection happens in mirror telescopes.",
        },
        {
          title: "Putting mirrors in a refracting telescope",
          body: "A refracting telescope uses lenses only. Any telescope with a mirror as its objective is a reflecting telescope.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sate-reflecting",
      name: "Reflecting, radio and space telescopes",
      intuition:
        "A concave mirror can gather light just as a big lens does, without splitting it into colours, and it can be held up from behind, so it can be made huge. The telescopes differ in how they bring the light out to the eyepiece: Newton's design uses a flat mirror, Cassegrain's uses a small convex mirror. Radio waves and X-rays need other telescopes altogether.",
      definition:
        "- A **reflecting telescope** collects light with a large **concave mirror**. It has no chromatic aberration. It still uses a convex lens as its **eyepiece**.\n" +
        "- **Newtonian**: concave mirror, plus a small **plane mirror** at 45° that sends the light sideways to an eyepiece on the side of the tube. Designed by Isaac Newton.\n" +
        "- **Cassegrain**: concave mirror with a hole in its centre, plus a small **convex mirror** that sends the light back through the hole to an eyepiece behind the main mirror.\n" +
        "- **Radio telescope**: a large **dish antenna** that collects radio waves; it has no lenses. The **GMRT** (Giant Metrewave Radio Telescope) near Narayangaon in Pune district has 30 dishes, each 45 m across.\n" +
        "- The air absorbs **X-rays**, so X-ray telescopes work from **space**. The **Chandra X-ray Observatory** was launched by **NASA (USA)** in 1999 and is named after the Indian-born scientist **Subrahmanyan Chandrasekhar**. The **Hubble** Space Telescope went up in 1990, and India's space observatory **AstroSat** in 2015.",
      table: {
        columns: ["Telescope", "Optical parts", "What to remember"],
        rows: [
          { cells: ["Refracting", "Two convex lenses", "Only lenses"] },
          { cells: ["Newtonian", "Concave mirror, plane mirror, convex lens eyepiece", "Eyepiece on the side of the tube"] },
          { cells: ["Cassegrain", "Concave mirror, convex mirror, convex lens eyepiece", "Eyepiece behind the main mirror"] },
          { cells: ["Radio", "A large dish antenna", "No lenses; collects radio waves"] },
        ],
        caption: "A plane mirror means Newtonian; a convex mirror means Cassegrain.",
      },
      selfCheckExample: {
        prompt: "In a Newtonian telescope, which mirror sends the light sideways to the eyepiece?",
        steps: ["The large concave mirror collects the light at the bottom of the tube.", "A small flat mirror at 45° turns it to the side."],
        answer: "A small plane mirror",
      },
      practiceSet: [
        { prompt: "What kind of mirror is the main mirror of every reflecting telescope?", answer: "A concave mirror" },
        { prompt: "Why are X-ray telescopes sent into space?", answer: "The Earth's air absorbs X-rays, so they cannot be seen from the ground" },
        { prompt: "What is the name of India's space observatory launched by ISRO in 2015?", answer: "AstroSat" },
        { prompt: "Where in Maharashtra is the Giant Metrewave Radio Telescope (GMRT)?", answer: "Near Narayangaon, in Pune district" },
      ],
      pyqExampleId: "90d83792-a586-497b-adb1-81a92c12ba2a",
      traps: [
        {
          title: "Giving a Cassegrain telescope a plane mirror",
          body: "The plane mirror belongs to the Newtonian telescope. The Cassegrain's small second mirror is convex.",
        },
        {
          title: "Thinking the Chandra telescope is Indian",
          body: "It is named after the Indian-born scientist S. Chandrasekhar, but NASA of the USA launched it.",
        },
        {
          title: "Thinking a reflecting telescope has no lens at all",
          body: "Only its objective is a mirror. Newtonian and Cassegrain telescopes both use a convex lens as the eyepiece.",
        },
      ],
    },
  ],
};
