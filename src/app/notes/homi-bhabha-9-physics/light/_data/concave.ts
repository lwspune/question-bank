import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_LI_CONCAVE_NOTE: SubtopicNote = {
  subtopicName: "Images by a Concave Mirror",
  title: "Images by a Concave Mirror",
  oneLineDefinition:
    "Where a concave mirror's image forms, and how large it is, depends on where the object stands; the mirror formula 1/f = 1/v + 1/u and the magnification m = −v/u give both, and a negative m means a real, inverted image.",
  whyItMatters:
    "Six questions in the bank, all MODERATE. Three ask what image forms for a given object position: when the image is erect, when the magnification is less than 1, and what happens with the object at the centre of curvature. Three use the numbers: what a magnification of −2 means, where the image forms when the object is four focal lengths away, and the image distance from the ratio of the heights.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9lico-positions",
      name: "Image positions for a concave mirror",
      intuition:
        "Start with the object far away and walk it towards a concave mirror. Its image starts as a tiny point at the focus, grows as you come closer, matches your size at the centre of curvature, gets bigger than you inside C, vanishes to infinity at F, and then jumps behind the mirror as a large, upright, virtual image.",
      definition:
        "- An object **beyond F** gives a **real, inverted** image in front of the mirror, which can be caught on a screen.\n" +
        "- The image is **smaller** when the object is **beyond C**, the **same size** at **C**, and **larger** between **C and F**.\n" +
        "- Object **at F**: the reflected rays are parallel, so the image is at **infinity**.\n" +
        "- Object **between P and F**: the image is **behind** the mirror, **virtual, erect and enlarged**. This is the only **erect** image a concave mirror makes, and it cannot be taken on a screen.\n" +
        "- **Magnification less than 1** (a smaller image) happens only with the object **beyond C**.",
      table: {
        columns: ["Object at", "Image at", "Nature and size of the image"],
        rows: [
          { cells: ["Infinity", "F", "Real, inverted, a point"] },
          { cells: ["Beyond C", "Between F and C", "Real, inverted, smaller"] },
          { cells: ["C", "C", "Real, inverted, same size"] },
          { cells: ["Between C and F", "Beyond C", "Real, inverted, larger"] },
          { cells: ["F", "Infinity", "Real, inverted, very large"] },
          { cells: ["Between P and F", "Behind the mirror", "Virtual, erect, larger"], noteAmber: "The only erect image of a concave mirror." },
        ],
        caption: "Read the table from top to bottom as the object moves closer to the mirror.",
      },
      selfCheckExample: {
        prompt: "A student wants a concave mirror to throw an enlarged, real image of a candle flame on a wall. Where must she place the flame?",
        steps: ["A real image needs the object beyond F.", "An enlarged real image needs it between C and F."],
        answer: "Between the centre of curvature and the focus",
      },
      practiceSet: [
        { prompt: "Where should an object be placed in front of a concave mirror to get a real image of the same size?", answer: "At the centre of curvature" },
        { prompt: "Can the erect image formed by a concave mirror be caught on a screen?", answer: "No: it is virtual and forms behind the mirror" },
        { prompt: "Where is the image when an object is placed at the focus of a concave mirror?", answer: "At infinity" },
        { prompt: "Where does a concave mirror form the image of the Sun?", answer: "At its focus, as a real, inverted, point-sized image" },
      ],
      pyqExampleId: "5b3a10cc-f913-4dd2-8843-d801ab2c7601",
      traps: [
        {
          title: "Thinking the image at C is enlarged",
          body: "With the object at the centre of curvature, the image is also at C, real, inverted and exactly the same size.",
        },
        {
          title: "Thinking an erect image can be put on a screen",
          body: "A concave mirror's erect image is virtual, formed behind the mirror. Only real images, which are inverted, can be caught on a screen.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9lico-formula",
      name: "Mirror formula and magnification",
      intuition:
        "The table tells you roughly where the image is; the mirror formula tells you exactly. Measure every distance from the pole, put a minus sign on distances in front of the mirror, and the signs then tell you the rest: a negative image distance means a real image in front, and a negative magnification means it is upside down.",
      definition:
        "- **Sign convention**: measure from the **pole**. Distances in **front** of the mirror (against the incident light) are **negative**; distances **behind** it are **positive**. Heights **above** the axis are positive, **below** negative.\n" +
        "- For a real object, u is negative. A **concave** mirror has a **negative f**.\n" +
        "- **Mirror formula**: \\(\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u}\\).\n" +
        "- **Magnification**: \\(m = \\frac{h_2}{h_1} = -\\frac{v}{u}\\).\n" +
        "- **m negative**: real and inverted. **m positive**: virtual and erect. **Size of m more than 1**: enlarged; less than 1: smaller; equal to 1: same size.\n" +
        "- If only the **size** of an image distance is asked, \\(|v| = |m| \\times |u|\\).",
      formula: {
        label: "Mirror formula and magnification",
        latex: "\\frac{1}{f} = \\frac{1}{v} + \\frac{1}{u} \\qquad m = \\frac{h_2}{h_1} = -\\frac{v}{u}",
        symbols: [
          { symbol: "f", meaning: "focal length (negative for a concave mirror)" },
          { symbol: "u", meaning: "object distance from the pole (negative for a real object)" },
          { symbol: "v", meaning: "image distance from the pole (negative in front, positive behind)" },
          { symbol: "m", meaning: "magnification" },
          { symbol: "h₁, h₂", meaning: "heights of the object and the image" },
        ],
      },
      authoredExample: {
        prompt: "An object is placed 30 cm in front of a concave mirror of focal length 10 cm. Find the position of the image and the magnification, and describe the image.",
        steps: [
          "Signs: \\(u = -30\\) cm, \\(f = -10\\) cm.",
          "\\(\\frac{1}{v} = \\frac{1}{f}-\\frac{1}{u} = -\\frac{1}{10} + \\frac{1}{30} = -\\frac{2}{30}\\), so \\(v = -15\\) cm.",
          "\\(m = -\\frac{v}{u} = -\\frac{-15}{-30} = -0.5\\).",
        ],
        answer: "15 cm in front of the mirror; m = −0.5, so real, inverted and half the size of the object",
      },
      selfCheckExample: {
        prompt: "A concave mirror forms an image three times as tall as the object, and the image is caught on a screen. What is the magnification?",
        steps: ["An image on a screen is real, so it is inverted and m is negative.", "Its size is 3."],
        answer: "m = −3",
      },
      practiceSet: [
        { prompt: "An object is 20 cm in front of a concave mirror of focal length 15 cm. Where is the image?", answer: "\\(\\frac{1}{v} = -\\frac{1}{15} + \\frac{1}{20} = -\\frac{1}{60}\\), so 60 cm in front of the mirror" },
        { prompt: "A concave mirror gives a magnification of +2. Is the image real or virtual, erect or inverted?", answer: "Virtual and erect, twice the size of the object" },
        { prompt: "An object is 40 cm in front of a concave mirror and its image forms 10 cm in front of it. What is the magnification?", answer: "\\(m = -\\frac{-10}{-40} = -0.25\\): real, inverted, a quarter of the size" },
        { prompt: "What does a negative value of magnification tell you about an image?", answer: "The image is real and inverted" },
      ],
      pyqExampleId: "e69028f5-636f-45ff-8f61-36d8d126babe",
      traps: [
        {
          title: "Dropping the minus signs",
          body: "For a concave mirror both f and a real object's u are negative. Leaving them positive puts the image on the wrong side of the mirror.",
        },
        {
          title: "Reading m = −2 as a smaller image",
          body: "The minus sign only says the image is inverted. The size 2 says it is twice as tall as the object.",
        },
        {
          title: "Writing the magnification as v/u",
          body: "Magnification is \\(-\\frac{v}{u}\\). Without the minus sign, a real image would come out erect.",
        },
      ],
    },
  ],
};
