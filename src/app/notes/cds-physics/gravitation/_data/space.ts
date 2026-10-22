import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_GR_SPACE_NOTE: SubtopicNote = {
  subtopicName: "Stars and Space",
  title: "Stars and Space",
  oneLineDefinition:
    "The stars nearest to us, what a constellation really is, the Lagrange points of the Sun and the earth, and India's Giant Metrewave Radio Telescope.",
  whyItMatters:
    "Four CDS questions, two in the 2019 (I) paper and two in the 2024 papers. They are pure recall: one named fact each, with distractors that sound just as likely.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphgr-stars",
      name: "Nearby stars and constellations",
      intuition:
        "After the Sun, the nearest star is so far away that its light takes more than four years to reach us. The brightest star in the night sky is not the nearest one: Sirius looks brighter partly because it gives out far more light. A constellation is a picture our eyes join up on the sky, but its stars can be at very different distances from us; they only look close together because they lie in nearly the same direction.",
      definition:
        "Facts to know:\n" +
        "- A **light year** is a **distance**: how far light travels in one year, about \\(9.46 \\times 10^{15}\\) m.\n" +
        "- The **Sun** is the nearest star to the earth; its light takes about 8 minutes 20 seconds to reach us.\n" +
        "- After the Sun, the nearest star is **Proxima Centauri**, about **4.24 light years** away, part of the Alpha Centauri system.\n" +
        "- **Sirius** (about 8.6 light years) is the **brightest** star of the night sky, but not the nearest.\n" +
        "- A **constellation** is a pattern of stars as seen from the earth; its stars **need not be equidistant** from us. The International Astronomical Union recognises **88** constellations.",
      table: {
        columns: ["Star or term", "Fact"],
        rows: [
          { cells: ["Sun", "The nearest star; light takes about 8 min 20 s to reach us"] },
          {
            cells: ["Proxima Centauri", "Nearest star after the Sun, about 4.24 light years"],
            noteAmber: "CDS 2019 (I): of Sirius, Arcturus, Spica and Proxima Centauri, the nearest is Proxima Centauri.",
            pyqExampleId: "510b177d-9c08-408e-b969-ec7dfe7127f8",
          },
          { cells: ["Sirius", "Brightest star of the night sky, about 8.6 light years"] },
          { cells: ["Arcturus and Spica", "Bright stars much farther away (tens to hundreds of light years)"] },
          {
            cells: ["Constellation", "A pattern of stars on the sky; the stars may be at very different distances"],
            noteAmber: "CDS 2019 (I): a constellation is a pattern of stars that may not be equidistant from the earth.",
            pyqExampleId: "e5197918-ea02-42d7-bf3b-1a668533966c",
          },
        ],
      },
      pyqExampleId: "510b177d-9c08-408e-b969-ec7dfe7127f8",
      selfCheckExample: {
        prompt: "Two stars in the same constellation look side by side in the sky. Must they be close to each other in space?",
        steps: [
          "A constellation is how the stars look from the earth, in projection on the sky.",
          "Two stars in nearly the same direction can be at very different distances along that line.",
        ],
        answer: "No. They may be very far apart; they only lie in nearly the same direction from us.",
      },
      practiceSet: [
        { prompt: "Is a light year a unit of time or of distance?", answer: "Distance" },
        { prompt: "Which star is the brightest in the night sky?", answer: "Sirius" },
        { prompt: "About how long does sunlight take to reach the earth?", answer: "About 8 minutes 20 seconds" },
        { prompt: "How many constellations does the International Astronomical Union recognise?", answer: "88" },
      ],
      traps: [
        {
          title: "Brightest is not nearest",
          body: "**Sirius** is the brightest star at night, but **Proxima Centauri** is the nearest after the Sun. Brightness depends on how much light a star gives out as well as on its distance.",
        },
        {
          title: "A constellation is not a group in space",
          body: "Its stars are joined up only as seen from the earth. Options saying the stars are equidistant from us, or that the pattern includes planets, are wrong.",
        },
        {
          title: "The Sun is a star too",
          body: "If a question asks for the star nearest to the earth with the Sun among the options, the answer is the **Sun**. Proxima Centauri is the nearest **other** star.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphgr-space-tools",
      name: "Lagrange points and the GMRT",
      intuition:
        "Around two big bodies like the Sun and the earth there are five places where a small spacecraft can stay in step with them, because the two pulls and its circular motion balance. India parks its solar observatory at one of them. On the ground, near Pune, India listens to the sky at radio wavelengths with an array of thirty large dish antennas that work together as one giant telescope.",
      definition:
        "The two facts CDS asks:\n" +
        "- **Lagrange points** L1 to L5 of a two-body system (such as the Sun and the earth): points where a small body keeps its position relative to the two.\n" +
        "- **L1, L2, L3** lie on the **line** through the two bodies. **L1** is between them (Aditya-L1 orbits the Sun-earth L1, about 1.5 million km from the earth); **L2** is beyond the earth (the James Webb Space Telescope).\n" +
        "- **L4 and L5** lie **60°** ahead of and behind the earth in its orbit. Each forms an **equilateral triangle** with the Sun and the earth.\n" +
        "- The **Giant Metrewave Radio Telescope (GMRT)**, at Khodad near Narayangaon, about 80 km north of Pune, is an array of **30 fully steerable parabolic dishes**, each **45 m** across, working at metre wavelengths. It is run by the National Centre for Radio Astrophysics (TIFR).",
      table: {
        columns: ["Place or instrument", "Fact"],
        rows: [
          { cells: ["Sun-earth L1", "On the Sun-earth line, between them; home of Aditya-L1"] },
          { cells: ["Sun-earth L2", "On the line, beyond the earth; home of the James Webb Space Telescope"] },
          {
            cells: ["Sun-earth L4 (and L5)", "Sun, earth and the point form an equilateral triangle"],
            noteAmber: "CDS 2024 (II): the Sun, the earth and L4 form an equilateral triangle.",
            pyqExampleId: "d5499e7e-478a-4431-8a43-69722d92ce57",
          },
          {
            cells: ["GMRT", "30 parabolic dishes, each 45 m across, near Pune"],
            noteAmber: "CDS 2024 (I): the GMRT consists of multiple parabolic antennas.",
            pyqExampleId: "54792195-a430-4de5-ba98-511e97ca291d",
          },
        ],
      },
      pyqExampleId: "d5499e7e-478a-4431-8a43-69722d92ce57",
      selfCheckExample: {
        prompt: "Which Lagrange point of the Sun-earth system lies between the Sun and the earth, and which Indian mission is placed there?",
        steps: [
          "L1, L2 and L3 lie on the line through the Sun and the earth; L1 is the one between them.",
          "India's solar observatory is named after its location.",
        ],
        answer: "L1, home of Aditya-L1.",
      },
      practiceSet: [
        { prompt: "How many Lagrange points does a two-body system such as the Sun and the earth have?", answer: "Five (L1 to L5)" },
        { prompt: "At which Sun-earth Lagrange point does the James Webb Space Telescope operate?", answer: "L2" },
        { prompt: "Near which Indian city is the Giant Metrewave Radio Telescope?", answer: "Pune (at Khodad, near Narayangaon)" },
        { prompt: "How many dishes make up the GMRT, and how wide is each?", answer: "30 dishes, each 45 m across" },
      ],
      traps: [
        {
          title: "L4 and L5 are off the line",
          body: "Only L1, L2 and L3 lie on the straight line through the two bodies. **L4 and L5** make **equilateral** triangles with them, not isosceles or scalene ones.",
        },
        {
          title: "The GMRT is many dishes, not one",
          body: "The GMRT is an **array** of 30 **parabolic** dishes whose signals are combined. Options of a single dish, or of circular antennas, are wrong.",
        },
      ],
    },
  ],
};
