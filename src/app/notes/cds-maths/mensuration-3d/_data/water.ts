import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_WATER_NOTE: SubtopicNote = {
  subtopicName: "Water — Immersion, Flow and Rainfall",
  title: "Water — Immersion, Flow & Rainfall",
  oneLineDefinition:
    "A solid dropped into water raises the level by its own volume; water flowing through a pipe or a river, or falling as rain, is a volume that must be converted between cm, m, litres and hectares.",
  whyItMatters:
    "Easy to set up and easy to get wrong: the physics is one line, and the marks go on units. Learn the four conversions below and the page becomes arithmetic.",
  concepts: [
    // C1 — immersion
    {
      kind: "formula" as const,
      slug: "cdsm3-immersion-rise",
      name: "Immersion raises the level",
      intuition:
        "A solid fully under water pushes aside exactly its own volume. In a cylindrical vessel that volume spreads over the circular base, so the rise is the solid's volume divided by the base area.",
      definition:
        "- Rise \\(= \\dfrac{\\text{volume immersed}}{\\pi R^2}\\) in a cylinder of radius \\(R\\).\n" +
        "- Many balls: multiply one ball's volume by their number.\n" +
        "- Water left after a solid is lowered into a full vessel \\(=\\) vessel \\(-\\) solid.\n" +
        "- Pouring from one vessel to another keeps the volume: new depth \\(= \\dfrac{\\text{volume}}{\\text{new base area}}\\).",
      formula: {
        label: "Rise in a cylinder",
        latex: "\\text{rise} = \\frac{V_{\\text{solid}}}{\\pi R^2}",
      },
      authoredExample: {
        prompt: "A sphere of radius \\(6\\) cm is dropped into a cylinder of radius \\(8\\) cm partly filled with water. By how much does the level rise?",
        steps: [
          "Sphere \\(= \\dfrac43\\pi(216) = 288\\pi\\).",
          "Rise \\(= \\dfrac{288\\pi}{64\\pi} = 4.5\\) cm.",
        ],
        answer: "\\(4.5\\) cm.",
      },
      selfCheckExample: {
        prompt: "A cylinder of radius \\(r\\) and height \\(2r\\) is full of water. The largest sphere that fits is lowered in. What fraction of the water remains?",
        steps: [
          "Cylinder \\(= 2\\pi r^3\\); sphere \\(= \\dfrac43\\pi r^3\\).",
          "Left \\(= \\dfrac23\\pi r^3\\), which is \\(\\dfrac13\\) of the cylinder.",
        ],
        answer: "\\(\\dfrac13\\).",
      },
      practiceSet: [
        { prompt: "Ball of radius \\(6\\) into a cylinder of radius \\(12\\): rise?", answer: "\\(2\\)" },
        { prompt: "Cone \\(r = 3\\), \\(h = 8\\) of water poured into a cylinder of radius \\(6\\): depth?", answer: "\\(\\tfrac23\\)" },
        { prompt: "Rise of \\(2\\) cm in a cylinder of radius \\(10\\): volume immersed?", answer: "\\(200\\pi\\)" },
        { prompt: "\\(n\\) balls of volume \\(v\\) raise the level in base area \\(A\\) by?", answer: "\\(\\dfrac{nv}{A}\\)" },
      ],
      pyqExampleId: "7934784d-38c0-4f93-a24b-fca5f521d560", // 2021 (I) — sphere of diameter 6 into a vessel of radius 6
    },

    // C2 — flow, rainfall and units
    {
      kind: "formula" as const,
      slug: "cdsm3-flow-rain-units",
      name: "Rainfall and flow — watch the units",
      intuition:
        "Rain is a thin slab: area times depth. Flow is a moving column: cross-section times speed times time. The only difficulty is units, so convert everything to metres (or everything to centimetres) before multiplying.",
      definition:
        "- \\(1\\) m\\(^3 = 1000\\) litres; \\(1\\) litre \\(= 1000\\) cm\\(^3\\); \\(1\\) kL \\(= 1\\) m\\(^3\\).\n" +
        "- \\(1\\) hectare \\(= 10000\\) m\\(^2\\).\n" +
        "- Water weighs \\(1\\) g per cm\\(^3\\), i.e. \\(1\\) tonne per m\\(^3\\).\n" +
        "- Rainfall volume \\(=\\) area \\(\\times\\) depth; flow per unit time \\(=\\) cross-section \\(\\times\\) speed.\n" +
        "- A tank losing \\(V\\) of water drops by \\(\\dfrac{V}{\\text{base area}}\\).",
      formula: {
        label: "Flow",
        latex: "\\text{volume per unit time} = \\text{cross-section} \\times \\text{speed}",
      },
      authoredExample: {
        prompt: "A canal \\(5\\) m wide and \\(2\\) m deep flows at \\(3\\) km/h. How many litres pass a point in a minute?",
        steps: [
          "\\(3\\) km/h \\(= 50\\) m per minute.",
          "Volume a minute \\(= 5\\times 2\\times 50 = 500\\) m\\(^3\\).",
          "\\(500\\times 1000 = 5{,}00{,}000\\) litres.",
        ],
        answer: "\\(5{,}00{,}000\\) litres.",
      },
      selfCheckExample: {
        prompt: "\\(3\\) cm of rain falls on a field of \\(1.5\\) hectares. What weight of water is that?",
        steps: [
          "Area \\(15000\\) m\\(^2\\), depth \\(0.03\\) m: volume \\(450\\) m\\(^3\\).",
          "At \\(1\\) tonne per m\\(^3\\): \\(450\\) tonnes.",
        ],
        answer: "\\(450\\) tonnes.",
      },
      practiceSet: [
        { prompt: "\\(2\\) cm of rain on \\(1\\) hectare: volume in m\\(^3\\)?", answer: "\\(200\\)" },
        { prompt: "\\(36\\) kL in m\\(^3\\)?", answer: "\\(36\\)" },
        { prompt: "Pipe of cross-section \\(20\\) cm\\(^2\\), water at \\(50\\) cm/s: litres per second?", answer: "\\(1\\)" },
        { prompt: "Tank base \\(40\\) m\\(^2\\) loses \\(8\\) m\\(^3\\): level drops by?", answer: "\\(20\\) cm" },
      ],
      pyqExampleId: "1fddbc53-4c1e-4580-b1cb-2e9cc35c4a8f", // 2020 (II) — river 3 m deep, 40 m wide, 2 km/h
      traps: [
        {
          title: "Litres, cubic metres and cubic centimetres differ by thousands",
          body:
            "The options on these questions are usually the same digits with different numbers of zeros. Write the unit next to every number until the last line.",
        },
      ],
    },
  ],
};
