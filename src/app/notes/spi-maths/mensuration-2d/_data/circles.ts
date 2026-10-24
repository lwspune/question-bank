import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_M2_CIRCLES_NOTE: SubtopicNote = {
  subtopicName: "Circumference and Area of a Circle",
  title: "Circumference and Area of a Circle",
  oneLineDefinition:
    "The distance round a circle is 2πr and the space inside it is πr²; with π as 22/7, radii that are multiples of 7 give whole answers.",
  whyItMatters:
    "Ten questions in the bank, five EASY and five MODERATE: wheels turning over a road, a wire bent from a circle into a square, a semicircular table top and a circle inside a square. Each is one of two formulas; the marks go on radius against diameter and on kilometres against centimetres.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spim2ci-circumference",
      name: "Circumference of a circle",
      intuition:
        "Roll a coin once along a table and the distance it moves is its circumference: a little more than three diameters, exactly \\(\\pi\\) diameters.",
      definition:
        "- **Circumference** \\(= 2\\pi r = \\pi d\\).\n" +
        "- Take \\(\\pi = \\frac{22}{7}\\) unless told otherwise; a radius of 7, 14, 21 or 35 then gives a whole answer.\n" +
        "- Circumference is proportional to radius, so a circle whose circumference is the sum of two others has a radius equal to the sum of their radii.\n" +
        "- 'Circumference minus diameter' is \\(2r(\\pi - 1) = 2r \\times \\frac{15}{7}\\).",
      formula: {
        label: "Circumference",
        latex: "C = 2\\pi r = \\pi d",
      },
      authoredExample: {
        prompt: "Find the circumference of a circle of diameter 35 cm.",
        steps: ["\\(C = \\pi d = \\frac{22}{7} \\times 35\\).", "\\(= 22 \\times 5 = 110\\) cm."],
        answer: "110 cm",
      },
      selfCheckExample: {
        prompt: "The circumference of a circle is 45 cm more than its diameter. Find its radius.",
        steps: [
          "\\(2\\pi r - 2r = 2r\\left(\\frac{22}{7} - 1\\right) = 2r \\times \\frac{15}{7} = 45\\).",
          "\\(r = \\frac{45 \\times 7}{30} = 10.5\\) cm.",
        ],
        answer: "10.5 cm",
      },
      practiceSet: [
        { prompt: "The circumference of a circle is 44 cm. What is its radius?", answer: "7 cm" },
        {
          prompt: "Two circles have radii 10 cm and 4 cm. What is the radius of a circle whose circumference equals the sum of their circumferences?",
          answer: "14 cm",
        },
        { prompt: "What is the perimeter of a semicircle of radius 7 cm, including its diameter?", answer: "\\(22 + 14 = 36\\) cm" },
      ],
      pyqExampleId: "dd926141-e443-4d4a-b38c-c969e783e507",
      traps: [
        {
          title: "The perimeter of a semicircle",
          body: "A semicircle's boundary is half the circumference plus the straight diameter: \\(\\pi r + 2r\\). Leaving out the diameter gives only the curved arc.",
        },
        {
          title: "Circumferences add by radius, areas do not",
          body:
            "If two circumferences are added, the radii simply add: 3 cm and 4 cm give 7 cm. If two areas are added, the new radius is \\(\\sqrt{r_1^2 + r_2^2}\\): 3 cm and 4 cm give 5 cm, not 7 cm.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim2ci-wheel",
      name: "Wheels: distance and revolutions",
      intuition:
        "Each full turn of a wheel rolls it forward by one circumference. So the distance travelled is the number of turns times the circumference.",
      definition:
        "- **Distance** \\(=\\) revolutions \\(\\times\\) circumference.\n" +
        "- **Revolutions** \\(=\\) distance \\(\\div\\) circumference.\n" +
        "- Put the distance and the circumference in the **same unit**: 1 km \\(= 1000\\) m \\(= 100\\,000\\) cm.\n" +
        "- Read whether the question asks for the radius or the diameter of the wheel.",
      formula: {
        label: "Wheel",
        latex: "\\text{distance} = n \\times 2\\pi r, \\qquad n = \\frac{\\text{distance}}{2\\pi r}",
        symbols: [{ symbol: "n", meaning: "number of revolutions" }],
      },
      authoredExample: {
        prompt: "A wheel of radius 35 cm rolls 2.2 km. How many revolutions does it make?",
        steps: [
          "Circumference \\(= 2 \\times \\frac{22}{7} \\times 35 = 220\\) cm.",
          "2.2 km \\(= 220\\,000\\) cm.",
          "\\(n = 220\\,000 \\div 220 = 1000\\).",
        ],
        answer: "1000 revolutions",
      },
      selfCheckExample: {
        prompt: "A wheel turns 400 times to go 704 m. Find its radius.",
        steps: [
          "One turn \\(= 704 \\div 400 = 1.76\\) m \\(= 176\\) cm.",
          "\\(2 \\times \\frac{22}{7} \\times r = 176\\), so \\(r = \\frac{176 \\times 7}{44} = 28\\) cm.",
        ],
        answer: "28 cm",
      },
      practiceSet: [
        { prompt: "A wheel of diameter 70 cm makes 100 revolutions. How far does it go?", answer: "\\(220 \\times 100 = 22\\,000\\) cm \\(= 220\\) m" },
        { prompt: "A wheel has a circumference of 2 m. How many revolutions does it make in 5 km?", answer: "2500" },
        { prompt: "How many centimetres are there in 3 km?", answer: "300 000 cm" },
      ],
      pyqExampleId: "384ac064-f190-44e1-92df-5e5418997f11",
      traps: [
        {
          title: "Kilometres against centimetres",
          body: "1 km is 100 000 cm, not 1000 cm. Turn the distance into the unit of the circumference before you divide.",
        },
        {
          title: "Radius or diameter of the wheel",
          body: "Distance per turn gives \\(\\pi d\\). Dividing by \\(\\pi\\) gives the diameter; halve it only if the radius is asked.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim2ci-area",
      name: "Area of a circle and a semicircle",
      intuition:
        "The area of a circle is \\(\\pi\\) times the square on its radius. Half a circle has half the area; a circle drawn inside a square just touches all four sides.",
      definition:
        "- **Area** \\(= \\pi r^2\\). If the diameter is given, halve it first.\n" +
        "- **Semicircle**: \\(\\frac{1}{2}\\pi r^2\\).\n" +
        "- **Circle inside a square** (touching all four sides): its diameter equals the side of the square.\n" +
        "- **Circle round a square** (through its corners): its diameter equals the square's diagonal, \\(a\\sqrt{2}\\).",
      formula: {
        label: "Area of a circle",
        latex: "A = \\pi r^2, \\qquad A_{\\text{semicircle}} = \\frac{1}{2}\\pi r^2",
      },
      authoredExample: {
        prompt: "Find the area of a circle of radius 14 cm.",
        steps: ["\\(A = \\frac{22}{7} \\times 14 \\times 14\\).", "\\(= 22 \\times 2 \\times 14 = 616\\) square cm."],
        answer: "616 square cm",
      },
      selfCheckExample: {
        prompt: "A circle is drawn inside a square of side 10 cm, touching all four sides. Find the area of the circle in terms of π.",
        steps: ["The diameter equals the side, 10 cm, so \\(r = 5\\) cm.", "\\(A = 25\\pi\\) square cm."],
        answer: "\\(25\\pi\\) square cm",
      },
      practiceSet: [
        { prompt: "What is the area of a semicircle of radius 7 cm?", answer: "\\(\\frac{1}{2} \\times 154 = 77\\) square cm" },
        { prompt: "A circle has an area of 154 square cm. What is its radius?", answer: "7 cm" },
        { prompt: "A circle passes through the four corners of a square of side 4 cm. What is its area in terms of π?", answer: "\\(r = 2\\sqrt{2}\\), area \\(8\\pi\\) square cm" },
      ],
      pyqExampleId: "a5f00825-735a-457a-bc7c-a583d8584d83",
      traps: [
        {
          title: "Squaring the diameter",
          body: "A circle of diameter 14 cm has area \\(\\pi \\times 7^2 = 154\\), not \\(\\pi \\times 14^2 = 616\\). Using the diameter makes the area four times too big.",
        },
        {
          title: "A semicircle given the full circle's area",
          body: "A semicircular top is half of \\(\\pi r^2\\). The full circle's area is usually a printed wrong option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spim2ci-wire",
      name: "A wire bent from one shape into another",
      intuition:
        "Bending a wire changes its shape but not its length. So the circumference of the old circle is the perimeter of the new square, triangle or rectangle.",
      definition:
        "- **Length is kept**: old perimeter \\(=\\) new perimeter.\n" +
        "- Circle to square: \\(2\\pi r = 4a\\), so \\(a = \\frac{\\pi r}{2}\\).\n" +
        "- For the **same length** of wire, a circle encloses more area than a square. With \\(\\pi = \\frac{22}{7}\\) the areas are always in the ratio circle : square \\(= 14 : 11\\).",
      formula: {
        label: "Same wire, new shape",
        latex: "2\\pi r = 4a, \\qquad \\frac{A_{\\text{circle}}}{A_{\\text{square}}} = \\frac{4}{\\pi} = \\frac{14}{11}",
      },
      authoredExample: {
        prompt: "A wire in the shape of a square of side 11 cm is bent into a circle. Find the radius of the circle.",
        steps: [
          "Length of wire \\(= 4 \\times 11 = 44\\) cm.",
          "\\(2 \\times \\frac{22}{7} \\times r = 44\\), so \\(r = 7\\) cm.",
        ],
        answer: "7 cm",
      },
      selfCheckExample: {
        prompt: "A wire 88 cm long is bent into a circle and then into a square. Find the area each one encloses.",
        steps: [
          "Circle: \\(2\\pi r = 88\\), so \\(r = 14\\) cm and area \\(= 616\\) square cm.",
          "Square: side \\(= 22\\) cm, area \\(= 484\\) square cm.",
        ],
        answer: "616 square cm and 484 square cm",
      },
      practiceSet: [
        { prompt: "A wire bent into an equilateral triangle of side 22 cm is reshaped into a circle. What is the radius?", answer: "\\(66 = 2 \\times \\frac{22}{7} \\times r\\), so 10.5 cm" },
        { prompt: "A wire circle of radius 7 cm is bent into a rectangle of length 14 cm. What is the breadth?", answer: "\\(l + b = 22\\), so 8 cm" },
      ],
      pyqExampleId: "33084f26-a22e-413e-a432-13fd84de967d",
      traps: [
        {
          title: "Keeping the area instead of the length",
          body: "When a wire is bent, its length stays the same, not the area it encloses. Equate the perimeters, never the areas.",
        },
        {
          title: "Turning the area ratio round",
          body: "Circle to square is 14 : 11 because the circle encloses more. If the question asks square to circle, the answer is 11 : 14.",
        },
      ],
    },
  ],
};
