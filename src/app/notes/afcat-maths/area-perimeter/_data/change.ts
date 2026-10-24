import type { SubtopicNote } from "@/app/notes/_types";

export const AF_AP_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Change in Dimensions",
  title: "Change in Dimensions: Scaling and Percentage Changes",
  oneLineDefinition:
    "When every length is multiplied by k, perimeters are multiplied by k and areas by k²; percentage changes in two sides multiply, they do not add.",
  whyItMatters:
    "No question here is HARD, yet the page loses marks steadily, because adding two percentages or forgetting to square a ratio gives an answer that is always printed among the options. Each question is one multiplication of factors once the change is written as a factor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afap-scale",
      name: "Scaling a figure and comparing areas",
      intuition:
        "Make every length of a figure k times as long and each unit square inside it becomes a square k times as wide and k times as tall. So lengths, perimeters and radii go up k times, but areas go up k² times. The same holds for any two figures of the same shape.",
      definition:
        "- **Same shape** (two squares, two circles, two similar triangles): ratio of perimeters = ratio of sides; ratio of areas = (ratio of sides)².\n" +
        "- From areas back to sides: take square roots. Areas \\(36 : 49\\) mean sides \\(6 : 7\\).\n" +
        "- 'The area becomes 25 times' is a rise of 24 times the old area, or 2400%. Read whether the question asks for the new area or the rise.\n" +
        "- **Fixed perimeter:** of all rectangles with the same perimeter, the square has the largest area.\n" +
        "- **Same area, different shape:** set the two area formulas equal and solve.",
      formula: {
        label: "Scale factor k",
        latex: "\\dfrac{P_2}{P_1} = k,\\qquad \\dfrac{A_2}{A_1} = k^2",
      },
      authoredExample: {
        prompt: "Two circles have radii in the ratio \\(5 : 7\\). Find the ratio of their circumferences and of their areas.",
        steps: [
          "Circumference is \\(2\\pi r\\), a length, so the ratio is \\(5 : 7\\).",
          "Area is \\(\\pi r^2\\), so the ratio is \\(5^2 : 7^2 = 25 : 49\\).",
        ],
        answer: "\\(5 : 7\\) and \\(25 : 49\\).",
      },
      selfCheckExample: {
        prompt: "The areas of two squares are in the ratio \\(49 : 64\\). Find the ratio of their perimeters.",
        steps: ["The sides are in the ratio \\(\\sqrt{49} : \\sqrt{64} = 7 : 8\\).", "Perimeters go with the sides: \\(7 : 8\\)."],
        answer: "\\(7 : 8\\).",
      },
      practiceSet: [
        { prompt: "Every side of a triangle is made five times as long. How many times its area is the new area?", answer: "\\(25\\)" },
        { prompt: "Two circles have areas in the ratio \\(36 : 49\\). Find the ratio of their diameters.", answer: "\\(6 : 7\\)" },
        {
          prompt: "An 8 cm by 2 cm rectangle and a square have the same perimeter. Which has the larger area, and by how much?",
          answer: "The square, by 9 cm²",
          method: "The square's side is 5 cm: \\(25 - 16\\).",
        },
      ],
      pyqExampleId: "415940fb-bca0-40d9-8f60-5db73cec13ff",
      traps: [
        {
          title: "Square the ratio for area",
          body: "Radii \\(5 : 7\\) give areas \\(25 : 49\\). Keeping \\(5 : 7\\) for the areas is the option most often wrongly picked.",
        },
        {
          title: "Square roots on the way back",
          body: "Areas \\(36 : 49\\) mean sides \\(6 : 7\\). Giving \\(36 : 49\\) for the sides, or squaring again, are the usual wrong options.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afap-percent-change",
      name: "Percentage changes in the sides",
      intuition:
        "An area is a product, so changes in its two lengths multiply. A rise of 30% in the length is a factor of 1.3 and a rise of 10% in the breadth a factor of 1.1; the area is multiplied by \\(1.3 \\times 1.1\\), and the extra 3% comes from the corner where both strips meet.",
      definition:
        "- Write each change as a factor: +30% is 1.3, −20% is 0.8. The area's factor is their product.\n" +
        "- Changes of \\(a\\%\\) and \\(b\\%\\) in two sides change the area by \\(a + b + \\dfrac{ab}{100}\\) percent (a fall counts as negative).\n" +
        "- A square's side or a circle's radius up \\(x\\%\\): both lengths change together, so the area changes by \\(2x + \\dfrac{x^2}{100}\\) percent.\n" +
        "- **To keep the area unchanged** after one side rises \\(x\\%\\), the other must fall \\(\\dfrac{x}{100 + x} \\times 100\\) percent.\n" +
        "- Land is often given in **hectares**: 1 hectare is 10,000 m², a square of side 100 m. Turn it into a side before applying the change.",
      formula: {
        label: "Two percentage changes",
        latex: "\\text{area change} = a + b + \\dfrac{ab}{100}\\ \\%",
      },
      authoredExample: {
        prompt: "A rectangle's length rises by 30% and its breadth by 10%. By what percentage does its area rise?",
        steps: [
          "The area is multiplied by \\(1.3 \\times 1.1 = 1.43\\).",
          "Check with the formula: \\(30 + 10 + \\tfrac{30 \\times 10}{100} = 43\\).",
        ],
        answer: "43%.",
      },
      selfCheckExample: {
        prompt: "The radius of a circle is cut by 20%. By what percentage does its area fall?",
        steps: ["The area is multiplied by \\(0.8^2 = 0.64\\).", "It falls by \\(100 - 64 = 36\\%\\)."],
        answer: "36%.",
      },
      practiceSet: [
        { prompt: "The side of a square rises by 10%. By what percentage does its area rise?", answer: "21%" },
        { prompt: "A rectangle's length rises by 25%. By what percentage must its breadth fall to keep the area the same?", answer: "20%", method: "\\(\\tfrac{25}{125} \\times 100\\)." },
        { prompt: "The side of a square rises by 30%. By what percentage does its area rise?", answer: "69%" },
        { prompt: "A rectangle's length rises by 50% and its breadth by 40%. How many times the old area is the new one?", answer: "\\(2.1\\)" },
      ],
      pyqExampleId: "7c5c01ee-bdcd-4da7-8380-3b66e51f30f4",
      traps: [
        {
          title: "Percentages multiply, they do not add",
          body: "Both sides of a rectangle up 20% raise the area by 44%, not 40%: \\(1.2 \\times 1.2 = 1.44\\).",
        },
        {
          title: "Undoing a rise is a smaller fall",
          body: "After a 25% rise in the length, the breadth must fall 20%, not 25%: \\(1.25 \\times 0.8 = 1\\).",
        },
      ],
    },
  ],
};
