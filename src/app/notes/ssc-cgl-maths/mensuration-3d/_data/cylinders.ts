import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_CYLINDERS_NOTE: SubtopicNote = {
  subtopicName: "Cylinders",
  title: "Cylinders",
  oneLineDefinition:
    "A cylinder is a prism with a circle for its base: it holds πr²h, its curved side is 2πrh, and closing both ends adds two circles.",
  whyItMatters:
    "Twenty-two questions in the bank, seventeen EASY and five MODERATE, thirteen of them from the 2024 shifts. Most give one measure (the curved area, the circumference or the volume) and ask for another, so the skill is getting the radius out quickly. With π taken as 22/7, cancel the 7 before you multiply.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3cy-formulas",
      name: "Volume and surface area of a cylinder",
      intuition:
        "A cylinder is a prism whose base is a circle, so its volume is the circle's area times the height. Cut the curved side down a straight line and unroll it: you get a rectangle whose sides are the circumference and the height.",
      definition:
        "- **Volume** \\(= \\pi r^2 h\\).\n" +
        "- **Curved surface** \\(= 2\\pi rh\\): circumference times height.\n" +
        "- **Total surface** of a closed cylinder \\(= 2\\pi rh + 2\\pi r^2 = 2\\pi r(r + h)\\). A vessel open at the top has only one circle: \\(2\\pi rh + \\pi r^2\\).\n" +
        "- **Ratio** of total to curved surface \\(= (r + h) : h\\), with no \\(\\pi\\) to work out.\n" +
        "- With \\(\\pi = \\frac{22}{7}\\), cancel the 7 against a radius or height that is a multiple of 7 before you multiply. If a question says 3.14, use 3.14, because the options are worked with it.",
      formula: {
        label: "Cylinder",
        latex: "V = \\pi r^2 h \\qquad \\text{CSA} = 2\\pi rh \\qquad \\text{TSA} = 2\\pi r(r + h)",
        symbols: [
          { symbol: "\\(r\\)", meaning: "radius of the base" },
          { symbol: "\\(h\\)", meaning: "height" },
        ],
      },
      authoredExample: {
        prompt: "A closed cylindrical drum has radius 7 cm and height 15 cm. Find its volume, its curved surface area and its total surface area. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Base area \\(= \\frac{22}{7} \\times 49 = 154\\ \\text{cm}^2\\), so the volume \\(= 154 \\times 15 = 2310\\ \\text{cm}^3\\).",
          "Circumference \\(= 2 \\times \\frac{22}{7} \\times 7 = 44\\) cm, so the curved surface \\(= 44 \\times 15 = 660\\ \\text{cm}^2\\).",
          "Total surface \\(= 660 + 2 \\times 154 = 968\\ \\text{cm}^2\\). Check: \\(44 \\times (7 + 15) = 968\\).",
        ],
        answer: "\\(2310\\ \\text{cm}^3\\), \\(660\\ \\text{cm}^2\\) and \\(968\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A cylinder of radius 21 cm has volume \\(13860\\ \\text{cm}^3\\). Find its height. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "Base area \\(= \\frac{22}{7} \\times 441 = 1386\\ \\text{cm}^2\\).",
          "Height \\(= \\frac{13860}{1386} = 10\\) cm.",
        ],
        answer: "10 cm",
      },
      practiceSet: [
        {
          prompt: "Find the curved surface area of a cylinder of radius 3.5 cm and height 10 cm. (Take \\(\\pi = \\frac{22}{7}\\).)",
          answer: "\\(220\\ \\text{cm}^2\\)",
        },
        {
          prompt: "A closed cylinder has radius 5 cm and height 15 cm. Find the ratio of its total surface area to its curved surface area.",
          answer: "\\(4 : 3\\)",
          method: "\\((5 + 15) : 15 = 20 : 15\\).",
        },
        { prompt: "Find the volume of a cylinder of radius 2 cm and height 7 cm. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "\\(88\\ \\text{cm}^3\\)" },
        {
          prompt: "The curved surface area of a cylinder is \\(440\\ \\text{cm}^2\\). Find the product of its radius and its height. (Take \\(\\pi = \\frac{22}{7}\\).)",
          answer: "\\(70\\ \\text{cm}^2\\)",
          method: "\\(rh = 440 \\div \\frac{44}{7} = 70\\).",
        },
      ],
      pyqExampleId: "0c1fa981-5b27-4a13-92d9-0de78896a067",
      traps: [
        {
          title: "Using the diameter as the radius",
          body:
            "Many cylinder questions give the diameter. Halve it first: a flask 10 cm across has radius 5 cm. Putting 10 into \\(\\pi r^2 h\\) gives four times the volume.",
        },
        {
          title: "Two ends on an open vessel",
          body:
            "A tank or a glass open at the top has one circular end, so its outer surface is \\(2\\pi rh + \\pi r^2\\), not \\(2\\pi r(r + h)\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3cy-working-back",
      name: "Finding the radius from the curved surface or the circumference",
      intuition:
        "Many questions hide the radius inside another measure. Take it out first: from the circumference by dividing by 2π, from the curved area by dividing by 2πh. After that it is the basic formula again.",
      definition:
        "- From the **circumference** \\(C\\): \\(r = \\frac{C}{2\\pi}\\). With \\(\\pi = \\frac{22}{7}\\) this is \\(r = \\frac{7C}{44}\\).\n" +
        "- From the **curved area** and the height: \\(r = \\frac{\\text{CSA}}{2\\pi h}\\).\n" +
        "- **Shortcut**: \\(\\pi r^2 h = \\frac{r}{2} \\times 2\\pi rh\\), so **volume \\(=\\) curved area \\(\\times \\frac{r}{2}\\)**. It is safe whenever the radius and the curved area belong to the same cylinder.\n" +
        "- **Rolling a sheet**: the edge that goes round becomes the circumference and the other edge becomes the height. Rolled along the breadth means the breadth goes round.\n" +
        "- **Litres and level**: \\(1000\\ \\text{cm}^3 = 1\\) litre. Water drawn out of a cylinder lowers the level by (volume drawn out) \\(\\div\\) (base area).",
      formula: {
        label: "Radius from the circumference, volume from the curved area",
        latex: "r = \\frac{C}{2\\pi} \\qquad V = \\frac{r}{2} \\times \\text{CSA}",
      },
      authoredExample: {
        prompt: "The curved surface area of a cylinder is \\(1320\\ \\text{cm}^2\\) and its height is 15 cm. Find its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(2\\pi r \\times 15 = 1320\\), so the circumference \\(2\\pi r = 88\\) cm.",
          "\\(r = \\frac{7 \\times 88}{44} = 14\\) cm.",
          "Full method: \\(V = \\frac{22}{7} \\times 196 \\times 15 = 616 \\times 15 = 9240\\ \\text{cm}^3\\).",
          "Fast route: \\(V = 1320 \\times \\frac{14}{2} = 9240\\ \\text{cm}^3\\).",
        ],
        answer: "\\(9240\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A sheet of paper 44 cm by 20 cm is rolled so that the 44 cm edge goes round, forming a cylinder. Find its volume. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "The 44 cm edge is the circumference: \\(r = \\frac{7 \\times 44}{44} = 7\\) cm. The height is 20 cm.",
          "Volume \\(= \\frac{22}{7} \\times 49 \\times 20 = 154 \\times 20 = 3080\\ \\text{cm}^3\\).",
        ],
        answer: "\\(3080\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "The circumference of the base of a cylinder is 88 cm. Find its radius. (Take \\(\\pi = \\frac{22}{7}\\).)", answer: "14 cm" },
        { prompt: "A cylindrical jar holds \\(2500\\ \\text{cm}^3\\). How many litres is that?", answer: "2.5 litres" },
        {
          prompt: "A cylinder has curved surface area \\(600\\ \\text{cm}^2\\) and radius 5 cm. Find its volume.",
          answer: "\\(1500\\ \\text{cm}^3\\)",
          method: "\\(600 \\times \\frac{5}{2}\\).",
        },
        {
          prompt: "A cylindrical tank has base area \\(2000\\ \\text{cm}^2\\). By how many centimetres does the water level fall when 10 litres are drawn out?",
          answer: "5 cm",
          method: "\\(10000 \\div 2000\\).",
        },
      ],
      pyqExampleId: "cf9eec2c-0522-4732-95fd-c1c6a26af06f",
      traps: [
        {
          title: "Rolling the sheet the wrong way",
          body:
            "A sheet rolled along its breadth has the breadth as the circumference. Swap the two edges and you get a different cylinder with a different volume, so check which edge goes round.",
        },
        {
          title: "Litres against cubic metres",
          body:
            "\\(1\\ \\text{m}^3\\) is 1000 litres, but 1 litre is \\(1000\\ \\text{cm}^3\\). A level drop worked in centimetres with a volume in litres is off by 1000 unless you convert first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3cy-hollow",
      name: "Hollow cylinders, pipes and drilled holes",
      intuition:
        "A pipe is a big cylinder with a smaller one taken out of its middle. Both have the same length, so the metal is the ring at the end times the length.",
      definition:
        "- **Metal in a pipe** of outer radius \\(R\\), inner radius \\(r\\) and length \\(h\\): \\(\\pi(R^2 - r^2)h = \\pi(R + r)(R - r)h\\).\n" +
        "- The water the pipe holds is the inner cylinder alone: \\(\\pi r^2 h\\).\n" +
        "- **Share drilled out**: with the same height, volumes compare as the squares of the radii. A hole of radius \\(r\\) through a cylinder of radius \\(R\\) removes \\(\\frac{r^2}{R^2}\\) of it; \\(k\\) such holes remove \\(\\frac{kr^2}{R^2}\\).\n" +
        "- Read \"the inner diameter equals the outer radius\" slowly: it means \\(R = 2r\\).",
      formula: {
        label: "Pipe and drilled share",
        latex: "V_{\\text{metal}} = \\pi(R^2 - r^2)h \\qquad \\text{share removed} = \\frac{r^2}{R^2}",
      },
      authoredExample: {
        prompt: "A metal pipe is 20 cm long. Its outer radius is 4 cm and its inner radius is 3 cm. Find the volume of metal. (Take \\(\\pi = \\frac{22}{7}\\).)",
        steps: [
          "\\(R^2 - r^2 = 16 - 9 = 7\\).",
          "Metal \\(= \\frac{22}{7} \\times 7 \\times 20 = 440\\ \\text{cm}^3\\).",
        ],
        answer: "\\(440\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A solid cylinder of radius 8 cm has a hole of radius 2 cm drilled through its full length along its axis. What percentage of its volume is removed?",
        steps: ["Same height, so the share removed is \\(\\frac{2^2}{8^2} = \\frac{4}{64} = \\frac{1}{16}\\).", "That is 6.25%."],
        answer: "6.25%",
      },
      practiceSet: [
        {
          prompt: "A pipe has outer radius 6 cm, inner radius 4 cm and length 7 cm. Find the volume of metal in terms of \\(\\pi\\).",
          answer: "\\(140\\pi\\ \\text{cm}^3\\)",
        },
        { prompt: "The inner diameter of a pipe equals its outer radius. If the inner radius is 1 cm, what is the outer radius?", answer: "2 cm" },
        {
          prompt: "Two holes of radius 1 cm are drilled through a cylinder of radius 4 cm along its full length. What fraction of its volume is removed?",
          answer: "\\(\\frac{1}{8}\\)",
          method: "\\(\\frac{2 \\times 1}{16}\\).",
        },
      ],
      pyqExampleId: "46484e34-088f-4b34-88f6-f0d4c6b22304",
      traps: [
        {
          title: "Subtracting the radii before squaring",
          body:
            "\\(\\pi(R - r)^2 h\\) is not the metal in a pipe. Square each radius first: \\(R^2 - r^2 = (R + r)(R - r)\\). For radii 4 and 3 that is 7, not 1.",
        },
      ],
    },
  ],
};
