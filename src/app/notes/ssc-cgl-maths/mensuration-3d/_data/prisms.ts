import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_PRISMS_NOTE: SubtopicNote = {
  subtopicName: "Prisms and Pyramids",
  title: "Prisms and Pyramids",
  oneLineDefinition:
    "A prism holds its base area times its height, and its side faces together are the base perimeter times the height. A pyramid on the same base and height holds one third as much.",
  whyItMatters:
    "Twenty-three questions in the bank, sixteen EASY and seven MODERATE, and every one of them comes from the 2025 shifts; the 2023 and 2024 shifts in the bank have none. Most rows are one line once you know two facts, base area times height for a prism and one third of that for a pyramid. The MODERATE ones stack layers whose heights form an AP, which is one addition more.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3pp-volume",
      name: "Volume of a prism",
      intuition:
        "A prism is one shape stacked straight up: every slice parallel to the base is a copy of the base. So the volume is the base area carried through the height, exactly as for a cuboid, which is the prism with a rectangle for its base.",
      definition:
        "- **Volume** of a right prism \\(=\\) base area \\(\\times\\) height.\n" +
        "- Base areas you will need: an equilateral triangle of side \\(a\\) has area \\(\\frac{\\sqrt{3}}{4}a^2\\); a right triangle has \\(\\frac{1}{2} \\times\\) the two shorter sides; a trapezium has \\(\\frac{1}{2} \\times\\) (sum of the parallel sides) \\(\\times\\) the distance between them; a regular hexagon of side \\(a\\) is six equilateral triangles, \\(\\frac{3\\sqrt{3}}{2}a^2\\).\n" +
        "- With the base unchanged, the volume changes in step with the height: \\(1.5\\) times the height gives \\(1.5\\) times the volume.\n" +
        "- Two prisms of equal height compare as their base areas.\n" +
        "- A **composite** tank (one prism on another): find each volume in one unit and add.",
      formula: {
        label: "Prism and two base areas",
        latex: "V = \\text{base area} \\times h \\qquad A_{\\triangle} = \\frac{\\sqrt{3}}{4}a^2 \\qquad A_{\\text{hexagon}} = \\frac{3\\sqrt{3}}{2}a^2",
      },
      authoredExample: {
        prompt: "A right prism has an equilateral triangle of side 8 cm as its base and is 5 cm tall. Find its volume.",
        steps: [
          "Base area \\(= \\frac{\\sqrt{3}}{4} \\times 8^2 = \\frac{\\sqrt{3}}{4} \\times 64 = 16\\sqrt{3}\\ \\text{cm}^2\\).",
          "Volume \\(= 16\\sqrt{3} \\times 5 = 80\\sqrt{3}\\ \\text{cm}^3\\), about \\(138.56\\ \\text{cm}^3\\).",
        ],
        answer: "\\(80\\sqrt{3}\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A prism has a trapezium for its base. The parallel sides are 9 cm and 5 cm and they are 4 cm apart. The prism is 20 cm tall. Find its volume.",
        steps: [
          "Base area \\(= \\frac{1}{2} \\times (9 + 5) \\times 4 = 28\\ \\text{cm}^2\\).",
          "Volume \\(= 28 \\times 20 = 560\\ \\text{cm}^3\\).",
        ],
        answer: "\\(560\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "A prism has base area \\(36\\ \\text{cm}^2\\) and height 7 cm. Find its volume.", answer: "\\(252\\ \\text{cm}^3\\)" },
        {
          prompt: "A right prism with a square base has volume \\(600\\ \\text{cm}^3\\) and height 6 cm. Find the side of its base.",
          answer: "10 cm",
          method: "Base area \\(= 600 \\div 6 = 100\\), so the side is 10.",
        },
        { prompt: "The height of a prism is doubled and its base is unchanged. By what factor does its volume change?", answer: "2" },
        { prompt: "Find the area of a regular hexagon of side 4 cm.", answer: "\\(24\\sqrt{3}\\ \\text{cm}^2\\)" },
      ],
      pyqExampleId: "a5d59d9a-780c-4393-ae0e-4229ae8c5348",
      traps: [
        {
          title: "A hexagon is six triangles",
          body:
            "A regular hexagon of side \\(a\\) splits into six equilateral triangles of side \\(a\\), so its area is \\(6 \\times \\frac{\\sqrt{3}}{4}a^2 = \\frac{3\\sqrt{3}}{2}a^2\\). Writing \\(\\frac{\\sqrt{3}}{4}a^2\\) alone gives one triangle.",
        },
        {
          title: "Square centimetres times metres",
          body:
            "A base of \\(60\\ \\text{cm}^2\\) and a height of 1.2 m give \\(60 \\times 120 = 7200\\ \\text{cm}^3\\), not \\(72\\). Change the height to centimetres first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3pp-lateral",
      name: "Lateral surface area of a prism",
      intuition:
        "The side faces of a prism are rectangles, each as tall as the prism. Laid side by side they form one long rectangle whose length is the distance round the base.",
      definition:
        "- **Lateral (side) surface** \\(=\\) perimeter of the base \\(\\times\\) height.\n" +
        "- **Total surface** \\(=\\) lateral surface \\(+ 2 \\times\\) base area.\n" +
        "- The lateral surface needs only the perimeter. A question that also gives the base area may be testing whether you know that.\n" +
        "- Base sides given as a ratio with a known perimeter: the lateral surface still needs only the perimeter.",
      formula: {
        label: "Lateral and total surface of a prism",
        latex: "\\text{LSA} = \\text{perimeter of base} \\times h \\qquad \\text{TSA} = \\text{LSA} + 2 \\times \\text{base area}",
      },
      authoredExample: {
        prompt: "A right prism has a triangular base with sides 8 cm, 15 cm and 17 cm, and its height is 10 cm. Find its lateral surface area and its total surface area.",
        steps: [
          "Perimeter \\(= 8 + 15 + 17 = 40\\) cm, so the lateral surface \\(= 40 \\times 10 = 400\\ \\text{cm}^2\\).",
          "\\(8^2 + 15^2 = 289 = 17^2\\), so the base is a right triangle with area \\(\\frac{1}{2} \\times 8 \\times 15 = 60\\ \\text{cm}^2\\).",
          "Total surface \\(= 400 + 2 \\times 60 = 520\\ \\text{cm}^2\\).",
        ],
        answer: "\\(400\\ \\text{cm}^2\\) and \\(520\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "The lateral surface area of a prism is \\(324\\ \\text{cm}^2\\) and the perimeter of its base is 27 cm. Find its height.",
        steps: ["Height \\(= \\frac{324}{27} = 12\\) cm."],
        answer: "12 cm",
      },
      practiceSet: [
        { prompt: "A prism 15 cm tall has a square base of side 4 cm. Find its lateral surface area.", answer: "\\(240\\ \\text{cm}^2\\)" },
        { prompt: "A prism has base perimeter 18 cm and height 7 cm. Find its lateral surface area.", answer: "\\(126\\ \\text{cm}^2\\)" },
        {
          prompt: "A cube of edge 5 cm is a prism with a square base. Find the area of its four side faces.",
          answer: "\\(100\\ \\text{cm}^2\\)",
          method: "Perimeter \\(20 \\times\\) height \\(5\\).",
        },
      ],
      pyqExampleId: "c80db5cc-4f4c-4284-8c93-d9cce04f4363",
      traps: [
        {
          title: "Base area in place of perimeter",
          body:
            "The lateral surface multiplies the perimeter of the base by the height. Base area times height is the volume, a different quantity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3pp-layers",
      name: "A prism built in layers whose heights form an AP",
      intuition:
        "Every layer sits on the same base, so the whole stack is one prism whose height is all the layer heights added together. The only real work is adding an AP.",
      definition:
        "- Same base in every layer, so **volume \\(=\\) base area \\(\\times\\) (sum of the layer heights)**.\n" +
        "- For \\(n\\) layers running from height \\(a\\) to height \\(l\\): sum \\(= \\frac{n}{2}(a + l)\\).\n" +
        "- If you know the first height \\(a\\) and the step \\(d\\), the last height is \\(a + (n - 1)d\\).\n" +
        "- Rising or falling does not matter: only the total height counts.\n" +
        "- The same rule works for a stack of cylinders of one radius.",
      formula: {
        label: "Sum of the layer heights",
        latex: "H = \\frac{n}{2}(a + l) \\qquad l = a + (n - 1)d \\qquad V = \\text{base area} \\times H",
      },
      authoredExample: {
        prompt: "A prism with a square base of side 3 cm is built in 6 layers. The bottom layer is 2 cm tall and each layer is 3 cm taller than the one below it. Find the volume.",
        steps: [
          "Last layer \\(= 2 + 5 \\times 3 = 17\\) cm, so the heights are 2, 5, 8, 11, 14 and 17.",
          "Total height \\(= \\frac{6}{2}(2 + 17) = 57\\) cm.",
          "Volume \\(= 3^2 \\times 57 = 513\\ \\text{cm}^3\\).",
        ],
        answer: "\\(513\\ \\text{cm}^3\\)",
      },
      selfCheckExample: {
        prompt: "A prism with a rectangular base 4 cm by 3 cm has 5 layers whose heights fall in an AP from 14 cm to 6 cm. Find its volume.",
        steps: [
          "Total height \\(= \\frac{5}{2}(14 + 6) = 50\\) cm.",
          "Volume \\(= 12 \\times 50 = 600\\ \\text{cm}^3\\).",
        ],
        answer: "\\(600\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "Find the sum of the AP 3, 5, 7, 9, 11.", answer: "35" },
        { prompt: "Five layers have heights in an AP from 4 cm to 12 cm. What is the total height?", answer: "40 cm" },
        {
          prompt: "A prism of base area \\(10\\ \\text{cm}^2\\) has four layers 2 cm, 4 cm, 6 cm and 8 cm tall. Find its volume.",
          answer: "\\(200\\ \\text{cm}^3\\)",
        },
      ],
      pyqExampleId: "b1e6605e-122a-4397-a0bf-559301c1ccfe",
      traps: [
        {
          title: "Using one layer's height",
          body:
            "The prism is as tall as all its layers together. Base area times the tallest layer, or times the average layer without multiplying by the number of layers, gives only part of the volume.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3pp-pyramid",
      name: "Volume and lateral surface of a pyramid",
      intuition:
        "A pyramid on the same base and with the same height as a prism holds exactly one third of it. Its side faces are triangles, each as tall as the slant height.",
      definition:
        "- **Volume** \\(= \\frac{1}{3} \\times\\) base area \\(\\times\\) height. The height is vertical: from the apex straight down to the base.\n" +
        "- **Lateral surface** of a regular pyramid \\(= \\frac{1}{2} \\times\\) perimeter of the base \\(\\times\\) slant height (the height of each triangular face).\n" +
        "- For a square base of side \\(a\\) this is \\(2al\\).\n" +
        "- A pyramid set on a cube or a prism: add the two volumes.",
      formula: {
        label: "Pyramid",
        latex: "V = \\frac{1}{3} \\times \\text{base area} \\times h \\qquad \\text{LSA} = \\frac{1}{2} \\times \\text{perimeter} \\times l",
        symbols: [
          { symbol: "\\(h\\)", meaning: "vertical height, apex to base" },
          { symbol: "\\(l\\)", meaning: "slant height of a face" },
        ],
      },
      authoredExample: {
        prompt: "A pyramid has a square base of side 6 cm and a vertical height of 4 cm. The slant height of each face is 5 cm. Find its volume and its lateral surface area.",
        steps: [
          "Volume \\(= \\frac{1}{3} \\times 6^2 \\times 4 = \\frac{144}{3} = 48\\ \\text{cm}^3\\). The vertical height goes in the volume.",
          "Lateral surface \\(= \\frac{1}{2} \\times 24 \\times 5 = 60\\ \\text{cm}^2\\). The slant height goes in the faces.",
          "Check the two heights agree: half the side is 3, and \\(3^2 + 4^2 = 5^2\\).",
        ],
        answer: "\\(48\\ \\text{cm}^3\\) and \\(60\\ \\text{cm}^2\\)",
      },
      selfCheckExample: {
        prompt: "A pyramid has a rectangular base 8 cm by 6 cm and a height of 9 cm. Find its volume.",
        steps: ["Volume \\(= \\frac{1}{3} \\times 48 \\times 9 = 144\\ \\text{cm}^3\\)."],
        answer: "\\(144\\ \\text{cm}^3\\)",
      },
      practiceSet: [
        { prompt: "A pyramid has base area \\(45\\ \\text{cm}^2\\) and height 8 cm. Find its volume.", answer: "\\(120\\ \\text{cm}^3\\)" },
        {
          prompt: "A square pyramid has base side 8 cm and slant height 5 cm. Find its lateral surface area.",
          answer: "\\(80\\ \\text{cm}^2\\)",
          method: "\\(\\frac{1}{2} \\times 32 \\times 5\\).",
        },
        {
          prompt: "A prism and a pyramid have the same base and the same height. What fraction of the prism's volume does the pyramid hold?",
          answer: "\\(\\frac{1}{3}\\)",
        },
      ],
      pyqExampleId: "0cd77b65-0391-4217-8b97-1e58e5f723eb",
      traps: [
        {
          title: "Forgetting the one third",
          body:
            "A pyramid is one third of the prism on the same base and height. Base area times height alone gives three times the answer.",
        },
        {
          title: "Slant height in the volume",
          body:
            "A square pyramid of base side 6 cm can have vertical height 4 cm and slant height 5 cm. Use 4 for the volume and 5 for the faces.",
        },
      ],
    },
  ],
};
