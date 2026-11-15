import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_M3_CYLINDERS_NOTE: SubtopicNote = {
  subtopicName: "Cylinders",
  title: "Cylinders",
  oneLineDefinition:
    "A cylinder is a circle stacked to a height: its volume is base area times height, its curved wall unrolls into a rectangle, and a pipe is one cylinder with another taken out.",
  whyItMatters:
    "15 questions in the Tier II bank, 12 EASY and 3 MODERATE. Half of them hand you a surface or a volume and ask you to work back to the radius or the height.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2m3cy-formulas",
      name: "Volume and surfaces of a cylinder",
      intuition:
        "Stack circles of radius r to a height h and you have a cylinder. The volume is the circle's area times h. Cut the curved wall down one side and it lies flat as a rectangle, the circumference long and h high.",
      definition:
        "- Volume \\(= \\pi r^2 h\\); curved surface \\(= 2\\pi rh\\); total surface \\(= 2\\pi r(r + h)\\).\n" +
        "- From the circumference \\(C\\): \\(r = \\frac{C}{2\\pi}\\), and the curved surface is simply \\(C \\times h\\).\n" +
        "- Base area \\(=\\) volume \\(\\div\\) height.\n" +
        "- With \\(\\pi = \\frac{22}{7}\\), a radius that is a multiple of 7 cancels the 7 at once.",
      formula: {
        label: "Cylinder",
        latex: "V = \\pi r^2 h, \\quad \\text{CSA} = 2\\pi r h, \\quad \\text{TSA} = 2\\pi r(r + h)",
      },
      authoredExample: {
        prompt: "A cylindrical drum has radius 35 cm and height 60 cm. Find its capacity in litres. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Base area \\(= \\frac{22}{7} \\times 35^2 = 3850\\ \\text{cm}^2\\).",
          "Volume \\(= 3850 \\times 60 = 231000\\ \\text{cm}^3\\).",
          "Divide by 1,000: 231 litres.",
        ],
        answer: "231 litres",
      },
      selfCheckExample: {
        prompt: "The circumference of a cylinder's base is 88 cm and its height is 25 cm. Find its curved surface area and its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Curved surface \\(= 88 \\times 25 = 2200\\ \\text{cm}^2\\).",
          "\\(r = 88 \\times \\frac{7}{44} = 14\\), so volume \\(= \\frac{22}{7} \\times 196 \\times 25 = 15400\\ \\text{cm}^3\\).",
        ],
        answer: "\\(2200\\ \\text{cm}^2\\) and \\(15400\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the total surface area of a cylinder of radius 7 cm and height 13 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(880\\ \\text{cm}^2\\)" },
        { prompt: "A cylinder's volume is 1,540 cm³ and its height is 10 cm. Find the area of its base.", answer: "\\(154\\ \\text{cm}^2\\)" },
        { prompt: "A cylinder's radius is 7 cm and its height is 4 cm more than its radius. Find its volume. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(1694\\ \\text{cm}^3\\)" },
      ],
      pyqExampleId: "dc368495-9ab4-4283-b6d7-2db60ef08804",
      traps: [
        {
          title: "Using the diameter as the radius",
          body: "A cylinder 21 cm across has radius 10.5 cm. Putting 21 into \\(\\pi r^2\\) makes the volume four times too big.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3cy-back",
      name: "Working back from a surface or a volume",
      intuition:
        "Many stems give two facts, such as a surface and a volume, or one surface as a fraction of another, and ask for the radius or the height. Divide one formula by the other and most of the symbols cancel.",
      definition:
        "- Volume \\(\\div\\) curved surface \\(= \\frac{r}{2}\\), so \\(r = \\frac{2V}{\\text{CSA}}\\).\n" +
        "- Given the total surface and the radius: \\(r + h = \\frac{\\text{TSA}}{2\\pi r}\\).\n" +
        "- A link like 'height is three times the radius' turns any surface or volume into an equation in \\(r\\) alone.\n" +
        "- 'Curved surface is a third of the total' gives \\(3 \\times 2\\pi rh = 2\\pi rh + 2\\pi r^2\\), so \\(r = 2h\\).",
      formula: {
        label: "Volume over curved surface",
        latex: "\\frac{V}{\\text{CSA}} = \\frac{\\pi r^2 h}{2\\pi r h} = \\frac{r}{2}",
      },
      authoredExample: {
        prompt: "A cylinder has a curved surface area of 264 cm² and a volume of 924 cm³. Find its radius and height. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(r = \\frac{2 \\times 924}{264} = 7\\) cm.",
          "\\(2 \\times \\frac{22}{7} \\times 7 \\times h = 264\\), so \\(44h = 264\\) and \\(h = 6\\) cm.",
          "Check: \\(\\frac{22}{7} \\times 49 \\times 6 = 924\\).",
        ],
        answer: "7 cm and 6 cm",
      },
      selfCheckExample: {
        prompt: "The total surface area of a cylinder is 2,112 cm² and its radius is 14 cm. Find its height. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: ["\\(2\\pi r = 88\\), so \\(r + h = 2112 \\div 88 = 24\\).", "\\(h = 24 - 14 = 10\\) cm."],
        answer: "10 cm",
      },
      practiceSet: [
        { prompt: "A cylinder's height is twice its radius and its curved surface is 616 cm². Find its radius. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "7 cm", method: "\\(4\\pi r^2 = 616\\)" },
        { prompt: "A cylinder's curved surface equals the area of its two ends together. How does its height compare with its radius?", answer: "They are equal", method: "\\(2\\pi rh = 2\\pi r^2\\)" },
        { prompt: "A cylinder's volume is 3,850 cm³ and its curved surface is 1,100 cm². Find its radius.", answer: "7 cm" },
      ],
      pyqExampleId: "cd13db85-0d18-4a1e-9c59-33b5c55f8354",
      traps: [
        {
          title: "Counting one end, or none",
          body: "The total surface of a closed cylinder adds BOTH circles: \\(2\\pi rh + 2\\pi r^2\\). An open tank or a pipe is a different shape; read which one the stem describes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2m3cy-hollow",
      name: "Hollow and drilled cylinders",
      intuition:
        "A pipe is what is left when a thinner cylinder is removed from the middle of a thicker one, so its metal is the difference of two volumes. Drilling a hole out of a solid lowers the volume but can add surface, because the inside wall of the hole is new surface.",
      definition:
        "- Metal in a pipe \\(= \\pi(R^2 - r^2) \\times\\) length \\(= \\pi(R - r)(R + r) \\times\\) length.\n" +
        "- Thickness \\(= R - r\\); find the inner radius from the outer one and the thickness first.\n" +
        "- Volume left after drilling \\(=\\) outer volume \\(-\\) volume of the hole.\n" +
        "- Surface after drilling: add the hole's inside surface and take off any flat face the hole cut away.",
      formula: {
        label: "Metal in a hollow cylinder",
        latex: "V_{\\text{metal}} = \\pi(R^2 - r^2)h = \\pi(R - r)(R + r)h",
      },
      authoredExample: {
        prompt: "A metal pipe is 3 m long. Its inner radius is 5 cm and the metal is 1 cm thick. Find the volume of metal.",
        steps: ["Outer radius \\(= 6\\) cm; length 300 cm.", "Metal \\(= \\pi(36 - 25) \\times 300 = 3300\\pi\\ \\text{cm}^3\\)."],
        answer: "\\(3300\\pi\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A cone of radius 6 cm and height 8 cm is cut out of one end of a solid cylinder of radius 6 cm and height 20 cm. Find the volume left.",
        steps: ["Cylinder \\(= \\pi \\times 36 \\times 20 = 720\\pi\\); cone \\(= \\frac{1}{3}\\pi \\times 36 \\times 8 = 96\\pi\\).", "Volume left \\(= 624\\pi\\ \\text{cm}^3\\)."],
        answer: "\\(624\\pi\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "A pipe 1 m long has outer radius 10 cm and inner radius 8 cm. Find the volume of metal.", answer: "\\(3600\\pi\\ \\text{cm}^3\\)" },
        { prompt: "A hollow cylinder 21 cm high has outer radius 7 cm and inner radius 3 cm. Find the volume of metal.", answer: "\\(840\\pi\\ \\text{cm}^3\\)" },
        { prompt: "A hole of radius 2 cm is drilled straight through a cube of edge 10 cm, face to opposite face. Find the volume left. (Take \\(\\pi = 3.14\\).)", answer: "\\(874.4\\ \\text{cm}^3\\)" },
      ],
      pyqExampleId: "eb63b678-b9fb-49d8-b8ed-66e0b45ce924",
      traps: [
        {
          title: "Subtracting the radii before squaring",
          body: "With \\(R = 4\\) and \\(r = 3\\), the metal's cross-section is \\(\\pi(16 - 9) = 7\\pi\\), not \\(\\pi(4 - 3)^2 = \\pi\\).",
        },
      ],
    },
  ],
};
