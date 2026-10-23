import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_CONES_NOTE: SubtopicNote = {
  subtopicName: "Cones",
  title: "Cones",
  oneLineDefinition:
    "A cone holds one third of the cylinder on the same base and height, its curved surface is π times the radius times the slant height, and radius, height and slant height form one right triangle.",
  whyItMatters:
    "Nineteen questions in the bank, seventeen EASY and two MODERATE. Nearly every one turns on a single right triangle: radius, height and slant height. Find whichever of the three is missing, then use the height for the volume and the slant height for the surface.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3co-triangle",
      name: "Radius, height and slant height of a cone",
      intuition:
        "Slice a cone straight down through its tip and you see a right triangle. The height stands up the middle, the radius runs along the base, and the slant height is the sloping side, the longest of the three.",
      definition:
        "- \\(l^2 = r^2 + h^2\\), so \\(l = \\sqrt{r^2 + h^2}\\) and \\(h = \\sqrt{l^2 - r^2}\\).\n" +
        "- Know the common triples and their multiples: 3, 4, 5; 5, 12, 13; 8, 15, 17; 7, 24, 25; 20, 21, 29. A multiple such as 6, 8, 10 or 9, 12, 15 works the same way.\n" +
        "- **Turning a right triangle** about one of its shorter sides makes a cone: that side is the height, the other short side is the radius, and the longest side is the slant height.\n" +
        "- Two special cones: if \\(h = r\\), then \\(l = r\\sqrt{2}\\); if \\(l = 2r\\), then \\(h = r\\sqrt{3}\\).",
      formula: {
        label: "Slant height",
        latex: "l = \\sqrt{r^2 + h^2}",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius of the base" },
          { symbol: "\\(h\\)", meaning: "vertical height" },
          { symbol: "\\(l\\)", meaning: "slant height" },
        ],
      },
      authoredExample: {
        prompt: "A cone has radius 9 cm and height 12 cm. Find its slant height.",
        steps: [
          "Full method: \\(l = \\sqrt{81 + 144} = \\sqrt{225} = 15\\) cm.",
          "Fast route: 9 and 12 are 3 times 3 and 4, so \\(l\\) is 3 times 5.",
        ],
        answer: "15 cm",
      },
      selfCheckExample: {
        prompt: "A right triangle with shorter sides 5 cm and 12 cm is turned about the 12 cm side. Find the radius, height and slant height of the cone formed.",
        steps: [
          "The side it turns about is the height: \\(h = 12\\) cm. The other short side is the radius: \\(r = 5\\) cm.",
          "Slant height \\(= \\sqrt{25 + 144} = 13\\) cm.",
        ],
        answer: "\\(r = 5\\) cm, \\(h = 12\\) cm, \\(l = 13\\) cm",
      },
      practiceSet: [
        { prompt: "A cone has slant height 17 cm and radius 8 cm. Find its height.", answer: "15 cm" },
        { prompt: "A cone has height and radius both equal to 4 cm. Find its slant height.", answer: "\\(4\\sqrt{2}\\) cm" },
        {
          prompt: "A cone has slant height 10 cm, and its slant height is twice its radius. Find its height.",
          answer: "\\(5\\sqrt{3}\\) cm",
          method: "\\(r = 5\\), so \\(h = \\sqrt{100 - 25} = \\sqrt{75}\\).",
        },
      ],
      pyqExampleId: "d644a806-5c95-486b-93f0-56359c78a87c",
      traps: [
        {
          title: "Slant height used as the height",
          body:
            "The slant height is the sloping edge; the height runs from the tip straight down to the centre of the base. With \\(r = 6\\) and \\(l = 10\\) the height is 8, not 10.",
        },
        {
          title: "Turning about the wrong side",
          body:
            "A 6, 8, 10 triangle turned about the 8 cm side gives a cone of height 8 cm and radius 6 cm. The side it turns about is always the height.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3co-volume",
      name: "Volume of a cone",
      intuition:
        "A cone holds one third of the cylinder with the same base and height, just as a pyramid holds one third of its prism.",
      definition:
        "- \\(V = \\frac{1}{3}\\pi r^2 h\\).\n" +
        "- Working back: \\(r^2 = \\frac{3V}{\\pi h}\\) and \\(h = \\frac{3V}{\\pi r^2}\\).\n" +
        "- When the slant height is given, find the height first: \\(h = \\sqrt{l^2 - r^2}\\).\n" +
        "- **Fast arithmetic**: with \\(\\pi = \\frac{22}{7}\\), \\(\\frac{1}{3}\\pi r^2 h = \\frac{22 r^2 h}{21}\\). Cancel the 7 and the 3 against \\(r^2 h\\) before you multiply.",
      formula: {
        label: "Volume of a cone",
        latex: "V = \\frac{1}{3}\\pi r^2 h",
      },
      authoredExample: {
        prompt: "A cone has radius 6 cm and height 14 cm. Find its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(V = \\frac{1}{3} \\times \\frac{22}{7} \\times 36 \\times 14\\).",
          "Cancel first: \\(\\frac{14}{7} = 2\\) and \\(\\frac{36}{3} = 12\\), leaving \\(22 \\times 12 \\times 2 = 528\\).",
        ],
        answer: "\\(528\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A cone of height 12 cm has volume \\(616\\ \\text{cm}^3\\). Find its radius. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(\\frac{1}{3} \\times \\frac{22}{7} \\times r^2 \\times 12 = 616\\), so \\(\\frac{88}{7} r^2 = 616\\).",
          "\\(r^2 = \\frac{616 \\times 7}{88} = 49\\), so \\(r = 7\\) cm.",
        ],
        answer: "7 cm",
      },
      practiceSet: [
        { prompt: "Find the volume of a cone of radius 3 cm and height 7 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(66\\ \\text{cm}^3\\)" },
        {
          prompt: "A cone and a cylinder have the same base and the same height. The cylinder holds \\(270\\ \\text{cm}^3\\). How much does the cone hold?",
          answer: "\\(90\\ \\text{cm}^3\\)",
        },
        {
          prompt: "A cone has radius 5 cm and slant height 13 cm. Find its volume in terms of \\(\\pi\\).",
          answer: "\\(100\\pi\\ \\text{cm}^3\\)",
          method: "\\(h = 12\\), so \\(\\frac{1}{3} \\times 25 \\times 12 = 100\\).",
        },
      ],
      pyqExampleId: "17530dd5-31ca-4d48-a11d-d14102a0062b",
      traps: [
        {
          title: "Leaving out the one third",
          body:
            "A cone holds one third of the matching cylinder. \\(\\pi r^2 h\\) alone gives three times the cone's volume, and that value is often among the options.",
        },
        {
          title: "Slant height in the volume formula",
          body:
            "The volume needs the vertical height. When a question gives the slant height, find \\(h = \\sqrt{l^2 - r^2}\\) before you use \\(\\frac{1}{3}\\pi r^2 h\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3co-surface",
      name: "Curved and total surface area of a cone",
      intuition:
        "Cut a paper cone down its side and flatten it: you get a sector of a circle whose radius is the slant height. Its area works out to π times the base radius times the slant height.",
      definition:
        "- **Curved surface** \\(= \\pi rl\\). It needs the slant height, not the height.\n" +
        "- **Total surface** of a solid cone \\(= \\pi rl + \\pi r^2 = \\pi r(l + r)\\).\n" +
        "- A **tent** or a paper cone has no base: use the curved surface alone.\n" +
        "- If the circumference \\(C\\) of the base is given, \\(r = \\frac{C}{2\\pi}\\).\n" +
        "- \"Curved area is \\(k\\) times the base area\" means \\(\\pi rl = k\\pi r^2\\), so \\(l = kr\\).",
      formula: {
        label: "Surface of a cone",
        latex: "\\text{CSA} = \\pi rl \\qquad \\text{TSA} = \\pi r(l + r)",
      },
      authoredExample: {
        prompt: "A solid cone has radius 5 cm and height 12 cm. Find its curved surface area and its total surface area in terms of \\(\\pi\\).",
        steps: [
          "Slant height \\(= \\sqrt{25 + 144} = 13\\) cm.",
          "Curved surface \\(= \\pi \\times 5 \\times 13 = 65\\pi\\ \\text{cm}^2\\).",
          "Total surface \\(= \\pi \\times 5 \\times (13 + 5) = 90\\pi\\ \\text{cm}^2\\).",
        ],
        answer: "\\(65\\pi\\ \\text{cm}^2\\) and \\(90\\pi\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A conical tent has a base 42 m across and a slant height of 25 m. How much canvas is needed? (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Radius \\(= 21\\) m. A tent has no base, so only the curved surface counts.",
          "Canvas \\(= \\frac{22}{7} \\times 21 \\times 25 = 66 \\times 25 = 1650\\ \\text{m}^2\\).",
        ],
        answer: "\\(1650\\ \\text{m}^2\\)",
      },
      practiceSet: [
        {
          prompt: "Find the curved surface area of a cone with radius 7 cm and slant height 10 cm. (Take \\(\\pi = \\frac{22}{7}\\).)",
          answer: "\\(220\\ \\text{cm}^2\\)",
        },
        {
          prompt: "The curved surface area of a cone is 3 times its base area. Its radius is 4 cm. Find its slant height.",
          answer: "12 cm",
          method: "\\(\\pi rl = 3\\pi r^2\\) gives \\(l = 3r\\).",
        },
        {
          prompt: "A solid cone has curved surface area \\(60\\pi\\ \\text{cm}^2\\) and radius 6 cm. Find its total surface area in terms of \\(\\pi\\).",
          answer: "\\(96\\pi\\ \\text{cm}^2\\)",
        },
      ],
      pyqExampleId: "e7284f3e-3eda-4940-9fa6-582dafa8aaa7",
      traps: [
        {
          title: "Adding a base to a tent",
          body:
            "A tent or a cap has no base. Adding \\(\\pi r^2\\) asks for canvas that is not there; use \\(\\pi rl\\) alone.",
        },
        {
          title: "Height in the curved surface",
          body:
            "\\(\\pi rh\\) is not a cone formula. The curved surface uses the slant height: \\(\\pi rl\\).",
        },
      ],
    },
  ],
};
