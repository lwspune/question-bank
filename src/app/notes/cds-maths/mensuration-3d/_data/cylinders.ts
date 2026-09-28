import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_M3_CYLINDERS_NOTE: SubtopicNote = {
  subtopicName: "Cylinders",
  title: "Cylinders",
  oneLineDefinition:
    "Volume, curved surface and total surface of a cylinder, a sheet rolled into a cylinder, and hollow pipes.",
  whyItMatters:
    "Mostly MODERATE and very regular: the paper fixes a ratio of radius to height, or of curved to total surface, and one number. The ratio is the real information; turn it into a relation between r and h first.",
  concepts: [
    // C1 — volume and surface
    {
      kind: "formula" as const,
      slug: "cdsm3-cylinder-basics",
      name: "Volume and surface of a cylinder",
      intuition:
        "Unroll the curved surface and it is a rectangle: the circumference by the height. Add the two circular ends for the total surface. Ratio conditions then collapse to one line: curved : total \\(= h : (r + h)\\).",
      definition:
        "- Volume \\(\\pi r^2 h\\); curved surface \\(2\\pi rh\\); total surface \\(2\\pi r(r + h)\\).\n" +
        "- Curved : total \\(= h : (r + h)\\). Curved \\(=\\) half the total means \\(r = h\\).\n" +
        "- Radius : height \\(= p : q\\): write \\(r = pk\\), \\(h = qk\\) and solve for \\(k\\).\n" +
        "- Given \\(r + h\\) and \\(rh\\) (from the curved surface): \\(r\\) and \\(h\\) are the roots of a quadratic.",
      formula: {
        label: "Cylinder",
        latex: "V = \\pi r^2 h, \\quad \\text{CSA} = 2\\pi r h, \\quad \\text{TSA} = 2\\pi r(r + h)",
      },
      authoredExample: {
        prompt: "The radius and height of a cylinder are in the ratio \\(1 : 2\\) and its volume is \\(2156\\) cm\\(^3\\). Find its total surface area. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(r = k\\), \\(h = 2k\\): \\(\\dfrac{22}{7}\\times k^2\\times 2k = 2156\\), so \\(k^3 = 343\\) and \\(k = 7\\).",
          "\\(r = 7\\), \\(h = 14\\): TSA \\(= 2\\times\\dfrac{22}{7}\\times 7\\times 21 = 924\\) cm\\(^2\\).",
        ],
        answer: "\\(924\\) cm\\(^2\\).",
      },
      selfCheckExample: {
        prompt: "Three times the total surface area of a cylinder equals four times its curved surface area. Find \\(h : r\\).",
        steps: [
          "\\(3\\times 2\\pi r(r + h) = 4\\times 2\\pi rh\\), so \\(3(r + h) = 4h\\).",
          "\\(h = 3r\\), a ratio of \\(3 : 1\\).",
        ],
        answer: "\\(3 : 1\\).",
      },
      practiceSet: [
        { prompt: "\\(r = 7\\), \\(h = 10\\): curved surface? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(440\\)" },
        { prompt: "Curved : total \\(= 2 : 3\\): \\(h : r\\)?", answer: "\\(2 : 1\\)" },
        { prompt: "Diameter \\(10\\), curved surface \\(300\\): volume?", answer: "\\(750\\)" },
        { prompt: "Well of radius \\(0.7\\) m and depth \\(10\\) m: earth dug? \\((\\pi = \\tfrac{22}{7})\\)", answer: "\\(15.4\\) m\\(^3\\)" },
      ],
      pyqExampleId: "e17e0a50-b0dd-4408-89b2-25e2826c36fa", // 2016 (II) — curved : total = 1 : 2, total 616
      traps: [
        {
          title: "Diameter or radius — again",
          body:
            "Stems give the diameter of a well, a box or a pipe. Halve it before squaring; the option built on the full diameter is four times too big.",
        },
      ],
    },

    // C2 — rolling a sheet
    {
      kind: "formula" as const,
      slug: "cdsm3-rolled-sheet",
      name: "Rolling a sheet into a cylinder",
      intuition:
        "Roll a rectangle and one side becomes the circumference, the other the height. The two ways of rolling give different volumes: the longer side as the circumference gives the fatter, larger cylinder.",
      definition:
        "- Sheet \\(a\\times b\\) rolled so that \\(a\\) is the circumference: \\(r = \\dfrac{a}{2\\pi}\\), \\(h = b\\), \\(V = \\dfrac{a^2 b}{4\\pi}\\).\n" +
        "- The two rollings have volumes in the ratio \\(\\dfrac{a^2 b}{a b^2} = \\dfrac ab\\): longer side round gives more.\n" +
        "- The curved surface is the sheet's area either way.",
      formula: {
        label: "Sheet rolled along side a",
        latex: "V = \\frac{a^2 b}{4\\pi}",
      },
      authoredExample: {
        prompt: "A \\(66\\) cm by \\(22\\) cm sheet is rolled so that the \\(66\\) cm side forms the circumference. Find the volume. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(2\\pi r = 66\\) gives \\(r = 10.5\\) cm; the height is \\(22\\) cm.",
          "\\(V = \\dfrac{22}{7}\\times 110.25\\times 22 = 7623\\) cm\\(^3\\).",
        ],
        answer: "\\(7623\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "The same sheet is rolled the other way. What is the ratio of the first volume to the second?",
        steps: [
          "The ratio is \\(\\dfrac ab = \\dfrac{66}{22} = 3\\).",
        ],
        answer: "\\(3 : 1\\).",
      },
      practiceSet: [
        { prompt: "Sheet \\(4\\pi\\times 2\\pi\\), \\(4\\pi\\) as circumference: volume?", answer: "\\(8\\pi^2\\)" },
        { prompt: "Square sheet: do the two rollings differ?", answer: "No" },
        { prompt: "Sheet \\(x\\times y\\): volumes of the two rollings in ratio?", answer: "\\(x : y\\)" },
        { prompt: "Curved surface of a cylinder rolled from a \\(20\\times 15\\) sheet?", answer: "\\(300\\)" },
      ],
      pyqExampleId: "820add93-aee5-4b44-9ac2-639eedf6e7f5", // 2021 (I) — 44 × 22 paper rolled both ways
    },

    // C3 — hollow cylinders and pipes
    {
      kind: "formula" as const,
      slug: "cdsm3-hollow-cylinder",
      name: "Hollow cylinders and pipes",
      intuition:
        "A pipe is a big cylinder minus a small one. Its metal is \\(\\pi(R^2 - r^2)h\\), which factorises as \\(\\pi(R + r)(R - r)h\\) — so a question that gives the thickness \\(R - r\\) and the metal volume hands you \\(R + r\\).",
      definition:
        "- Metal \\(= \\pi(R^2 - r^2)h\\).\n" +
        "- Outer curved minus inner curved \\(= 2\\pi(R - r)h\\).\n" +
        "- All surfaces of a hollow cylinder: outer curved \\(+\\) inner curved \\(+\\) two ring-shaped ends \\(2\\pi(R^2 - r^2)\\).",
      formula: {
        label: "Hollow cylinder",
        latex: "V = \\pi(R^2 - r^2)h = \\pi(R + r)(R - r)h",
      },
      authoredExample: {
        prompt: "A pipe \\(21\\) cm long has outer radius \\(5\\) cm and inner radius \\(4\\) cm. Find the volume of metal. \\((\\pi = \\tfrac{22}{7})\\)",
        steps: [
          "\\(R^2 - r^2 = 25 - 16 = 9\\).",
          "\\(V = \\dfrac{22}{7}\\times 9\\times 21 = 594\\) cm\\(^3\\).",
        ],
        answer: "\\(594\\) cm\\(^3\\).",
      },
      selfCheckExample: {
        prompt: "A hollow cylinder has inner radius \\(2\\), outer radius \\(3\\) and height \\(5\\). Find the ratio of its total surface to its inner curved surface.",
        steps: [
          "Inner \\(2\\pi(2)(5) = 20\\pi\\); outer \\(2\\pi(3)(5) = 30\\pi\\); two ends \\(2\\pi(9 - 4) = 10\\pi\\).",
          "Total \\(= 60\\pi\\), so the ratio is \\(3 : 1\\).",
        ],
        answer: "\\(3 : 1\\).",
      },
      practiceSet: [
        { prompt: "\\(R = 4\\), \\(r = 3\\), \\(h = 7\\): metal volume in terms of \\(\\pi\\)?", answer: "\\(49\\pi\\)" },
        { prompt: "\\(R - r = 1\\), metal \\(\\pi\\times 10\\times h\\) with \\(h\\) known: \\(R + r\\)?", answer: "\\(10\\)" },
        { prompt: "Area of one ring-shaped end, \\(R = 5\\), \\(r = 3\\)?", answer: "\\(16\\pi\\)" },
        { prompt: "Outer minus inner curved surface, \\(R - r = 0.5\\), \\(h = 7\\)?", answer: "\\(7\\pi\\)" },
      ],
      pyqExampleId: "72b8f1c8-0d21-428a-bebc-38bb3ddbbc40", // 2021 (I) — pipe 14 cm, surfaces differ by 44, metal 99
    },
  ],
};
