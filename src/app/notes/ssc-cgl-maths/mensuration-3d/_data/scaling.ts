import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_M3_SCALING_NOTE: SubtopicNote = {
  subtopicName: "Scaling and Comparing Solids",
  title: "Scaling and Comparing Solids",
  oneLineDefinition:
    "When every length of a solid is multiplied by k, its areas are multiplied by k² and its volume by k³; two different solids are compared by writing both formulas and cancelling what they share.",
  whyItMatters:
    "Twenty-three questions in the bank, fourteen EASY and nine MODERATE, nineteen of them from the 2025 shifts. None of them needs a full volume: each asks how many times, what ratio or what percentage, so you work with factors and π cancels. This is where a strong student saves the most time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscm3sc-factors",
      name: "How a change in length changes area and volume",
      intuition:
        "Double every length of a solid and each face becomes 2 × 2 = 4 times as big, while the solid holds 2 × 2 × 2 = 8 times as much. Areas follow the square of the scale and volumes follow the cube.",
      definition:
        "- If **every** length is multiplied by \\(k\\), every area is multiplied by \\(k^2\\) and every volume by \\(k^3\\).\n" +
        "- If the lengths change by **different** factors, multiply the factors the way the formula does. A cone or a cylinder holds an amount that goes with \\(r^2 h\\), so radius \\(\\times p\\) and height \\(\\times q\\) give volume \\(\\times p^2 q\\).\n" +
        "- A percentage change is a factor: 15% more is \\(\\times 1.15\\), 25% less is \\(\\times 0.75\\). Turn the final factor back at the end: \\(\\times 1.089\\) is a rise of 8.9%.\n" +
        "- \"Increased by 200%\" means \\(\\times 3\\), not \\(\\times 2\\). \"The volume becomes 8 times\" is an increase of 7 times, or 700%.\n" +
        "- **Fast route**: the same \\(x\\%\\) rise on all three edges multiplies the volume by \\((1 + \\frac{x}{100})^3\\), so 10% on each edge gives \\(1.331\\), a 33.1% rise. Safe only when every edge gets the same rise.",
      formula: {
        label: "Scale factors",
        latex: "\\text{area} \\times k^2 \\qquad \\text{volume} \\times k^3 \\qquad V_{\\text{cone, cylinder}} \\propto r^2 h",
      },
      authoredExample: {
        prompt: "The radius of a cylinder is increased by 30% and its height is decreased by 50%. Find the percentage change in its volume.",
        steps: [
          "Volume goes with \\(r^2 h\\), so the factor is \\(1.3^2 \\times 0.5 = 1.69 \\times 0.5 = 0.845\\).",
          "\\(0.845\\) is \\(15.5\\%\\) less than 1.",
        ],
        answer: "A decrease of 15.5%",
      },
      selfCheckExample: {
        prompt: "Each edge of a cube is increased by 30%. By what percentage does its surface area increase?",
        steps: ["Surface goes with the square of the edge: \\(1.3^2 = 1.69\\).", "That is \\(69\\%\\) more than before."],
        answer: "69%",
      },
      practiceSet: [
        { prompt: "The radius of a sphere is tripled. How many times its old volume is the new volume?", answer: "27" },
        { prompt: "Every length of a solid is halved. What fraction of the old surface area is the new one?", answer: "\\(\\frac{1}{4}\\)" },
        { prompt: "The height of a cone is doubled and its radius is not changed. How many times its old volume is the new volume?", answer: "2" },
        {
          prompt: "The radius of a cylinder is halved and its height is doubled. What fraction of the old volume is the new volume?",
          answer: "\\(\\frac{1}{2}\\)",
          method: "\\(\\left(\\frac{1}{2}\\right)^2 \\times 2\\).",
        },
      ],
      pyqExampleId: "4fd419ce-4c1f-4e55-b124-bf5b38b135c1",
      traps: [
        {
          title: "Adding the percentages",
          body:
            "Radius up 10% and height down 10% does not leave a cone's volume unchanged. The radius counts twice, as \\(r^2\\): \\(1.1 \\times 1.1 \\times 0.9 = 1.089\\), a rise of 8.9%.",
        },
        {
          title: "Increased by 200% means three times",
          body: "An increase of 200% adds twice the length to itself, so the new length is 3 times the old one, not 2 times.",
        },
        {
          title: "New size or increase",
          body:
            "If a volume becomes 8 times as large, the increase is 7 times the original, that is 700%. Options often print both 8 and 7, or 800% and 700%.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3sc-ratios",
      name: "Ratios of two cylinders or two cones",
      intuition:
        "Two cylinders differ only in their radius and their height, and so do two cones. Every ratio of their volumes or surfaces is built from the ratios of those two lengths.",
      definition:
        "- Volumes: \\(\\frac{V_1}{V_2} = \\frac{r_1^2 h_1}{r_2^2 h_2}\\). The same holds for two cones, because the \\(\\frac{1}{3}\\) cancels.\n" +
        "- Curved surfaces of two cylinders: \\(\\frac{r_1 h_1}{r_2 h_2}\\).\n" +
        "- For a missing ratio, solve the same equation: \\(\\frac{h_1}{h_2} = \\frac{V_1}{V_2} \\times \\frac{r_2^2}{r_1^2}\\).\n" +
        "- This rule is for two solids of the same kind. A cone against a cylinder brings the \\(\\frac{1}{3}\\) back.",
      formula: {
        label: "Two cylinders or two cones",
        latex: "\\frac{V_1}{V_2} = \\frac{r_1^2 h_1}{r_2^2 h_2} \\qquad \\frac{\\text{CSA}_1}{\\text{CSA}_2} = \\frac{r_1 h_1}{r_2 h_2}",
      },
      authoredExample: {
        prompt: "The radii of two cylinders are in the ratio \\(5 : 3\\) and their heights in the ratio \\(2 : 5\\). Find the ratio of their volumes and the ratio of their curved surface areas.",
        steps: [
          "Volumes: \\(5^2 \\times 2 : 3^2 \\times 5 = 50 : 45 = 10 : 9\\).",
          "Curved surfaces: \\(5 \\times 2 : 3 \\times 5 = 10 : 15 = 2 : 3\\).",
          "So the first cylinder holds more but has less curved surface: the squared radius matters more in the volume.",
        ],
        answer: "\\(10 : 9\\) and \\(2 : 3\\)",
      },
      selfCheckExample: {
        prompt: "Two cones have volumes in the ratio \\(1 : 4\\) and heights in the ratio \\(4 : 1\\). Find the ratio of their radii.",
        steps: [
          "\\(\\frac{1}{4} = \\frac{r_1^2}{r_2^2} \\times 4\\), so \\(\\frac{r_1^2}{r_2^2} = \\frac{1}{16}\\).",
          "\\(r_1 : r_2 = 1 : 4\\).",
        ],
        answer: "\\(1 : 4\\)",
      },
      practiceSet: [
        { prompt: "Two cones have equal heights and radii in the ratio \\(2 : 3\\). Find the ratio of their volumes.", answer: "\\(4 : 9\\)" },
        { prompt: "Two cylinders hold the same volume, and their radii are in the ratio \\(2 : 3\\). Find the ratio of their heights.", answer: "\\(9 : 4\\)" },
        { prompt: "Two cylinders of equal height have radii 3 cm and 6 cm. Find the ratio of their curved surface areas.", answer: "\\(1 : 2\\)" },
      ],
      pyqExampleId: "c4416d51-f681-428a-84c1-aee8ea66511f",
      traps: [
        {
          title: "Squaring the height too",
          body:
            "Only the radius is squared in a volume ratio. With radii \\(1 : 2\\) and heights \\(1 : 2\\) the volumes are \\(1 \\times 1 : 4 \\times 2 = 1 : 8\\), not \\(1 : 16\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscm3sc-cut-cone",
      name: "Slicing a cone by a plane parallel to the base",
      intuition:
        "Cut a cone with a plane parallel to its base and the top piece is a small copy of the whole cone. Every length shrinks by the same factor, so the volumes go as the cube of that factor. The bottom piece, the frustum, is whatever is left.",
      definition:
        "- The top cone is **similar** to the whole: if its height is \\(\\frac{1}{k}\\) of the whole height, its radius is \\(\\frac{1}{k}\\) of the base radius and its volume is \\(\\frac{1}{k^3}\\) of the whole.\n" +
        "- **Frustum** \\(=\\) whole cone \\(-\\) top cone, that is \\(1 - \\frac{1}{k^3}\\) of the whole.\n" +
        "- Measure heights **from the tip**. A cut 4 cm above the base of a 12 cm cone is 8 cm below the tip.\n" +
        "- With several cuts, find each cone from the tip, then subtract neighbouring cones to get each piece.\n" +
        "- Going back: a top cone holding \\(\\frac{1}{8}\\) of the volume has \\(\\frac{1}{2}\\) of the height (take the cube root).\n" +
        "- The frustum also has its own formula, \\(\\frac{1}{3}\\pi h(R^2 + Rr + r^2)\\), but subtracting two cones is usually faster.",
      formula: {
        label: "Cut cone and frustum",
        latex: "\\frac{V_{\\text{top}}}{V_{\\text{whole}}} = \\left(\\frac{h}{H}\\right)^3 \\qquad V_{\\text{frustum}} = \\frac{1}{3}\\pi h(R^2 + Rr + r^2)",
        symbols: [
          { symbol: "\\(h, H\\)", meaning: "height of the top cone and of the whole cone, both from the tip" },
          { symbol: "\\(R, r\\)", meaning: "radii of the two circular faces of the frustum" },
        ],
      },
      authoredExample: {
        prompt: "A cone 20 cm tall is cut parallel to its base at 15 cm above the base. Find the ratio of the volume of the small top cone to the volume of the frustum.",
        steps: [
          "From the tip the cut is \\(20 - 15 = 5\\) cm down, which is \\(\\frac{1}{4}\\) of the height.",
          "Top cone \\(= \\left(\\frac{1}{4}\\right)^3 = \\frac{1}{64}\\) of the whole, so the frustum is \\(\\frac{63}{64}\\).",
          "Top cone : frustum \\(= 1 : 63\\).",
        ],
        answer: "\\(1 : 63\\)",
      },
      selfCheckExample: {
        prompt: "A cone is cut parallel to its base so that the top cone holds \\(\\frac{1}{27}\\) of the whole volume. Find the ratio of the height of the top cone to the height of the frustum.",
        steps: [
          "Cube root of \\(\\frac{1}{27}\\) is \\(\\frac{1}{3}\\), so the top cone is \\(\\frac{1}{3}\\) of the height.",
          "The frustum is the other \\(\\frac{2}{3}\\), so the ratio is \\(1 : 2\\).",
        ],
        answer: "\\(1 : 2\\)",
      },
      practiceSet: [
        { prompt: "A cone is cut parallel to its base halfway down from the tip. What fraction of the whole volume is the top cone?", answer: "\\(\\frac{1}{8}\\)" },
        {
          prompt: "A cone of base radius 10 cm is cut parallel to its base at two-fifths of its height from the tip. What is the radius of the cut face?",
          answer: "4 cm",
        },
        {
          prompt: "A cone is cut parallel to its base at two-thirds of its height from the tip. Find the ratio of the top cone's volume to the frustum's volume.",
          answer: "\\(8 : 19\\)",
          method: "Top cone \\(\\frac{8}{27}\\), frustum \\(\\frac{19}{27}\\).",
        },
      ],
      pyqExampleId: "c1f19d22-e552-4cd3-83e7-811a73dddd99",
      traps: [
        {
          title: "Measuring from the base",
          body:
            "Similar-cone ratios use heights from the tip. A cut 6 cm above the base of a 24 cm cone leaves a top cone 18 cm tall, three-quarters of the height.",
        },
        {
          title: "Height ratio used as the volume ratio",
          body: "A top cone with half the height holds one-eighth of the volume, not one-half. Volumes go as the cube of the height ratio.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscm3sc-compare",
      name: "Volume and surface formulas of the standard solids",
      intuition:
        "To compare two different solids, write both formulas side by side, set equal whatever the question says is equal, and cancel π and the shared radius.",
      definition:
        "- Two solids with the same radius and **equal volumes**: cancel \\(\\pi r^2\\) and compare what is left. A cone leaves \\(\\frac{1}{3}h\\), a cylinder \\(h\\), a hemisphere \\(\\frac{2}{3}r\\) and a sphere \\(\\frac{4}{3}r\\).\n" +
        "- So a cone equals a cylinder on the same base when it is 3 times as tall, and equals a hemisphere on the same base when \\(h = 2r\\).\n" +
        "- Two solids with **equal surfaces**: write both total surfaces from the table and cancel \\(\\pi r\\).",
      table: {
        columns: ["Solid", "Volume", "Curved or side surface", "Total surface"],
        rows: [
          { cells: ["Cube, edge \\(a\\)", "\\(a^3\\)", "\\(4a^2\\)", "\\(6a^2\\)"] },
          { cells: ["Cuboid", "\\(lbh\\)", "\\(2(l + b)h\\)", "\\(2(lb + bh + hl)\\)"] },
          { cells: ["Prism", "base area \\(\\times h\\)", "base perimeter \\(\\times h\\)", "side surface \\(+ 2 \\times\\) base area"] },
          { cells: ["Pyramid", "\\(\\frac{1}{3} \\times\\) base area \\(\\times h\\)", "\\(\\frac{1}{2} \\times\\) base perimeter \\(\\times\\) slant height", "side surface \\(+\\) base area"] },
          { cells: ["Cylinder", "\\(\\pi r^2 h\\)", "\\(2\\pi rh\\)", "\\(2\\pi r(r + h)\\)"] },
          { cells: ["Cone", "\\(\\frac{1}{3}\\pi r^2 h\\)", "\\(\\pi rl\\)", "\\(\\pi r(l + r)\\)"] },
          { cells: ["Sphere", "\\(\\frac{4}{3}\\pi r^3\\)", "\\(4\\pi r^2\\)", "\\(4\\pi r^2\\)"] },
          {
            cells: ["Solid hemisphere", "\\(\\frac{2}{3}\\pi r^3\\)", "\\(2\\pi r^2\\)", "\\(3\\pi r^2\\)"],
            noteAmber: "The total surface includes the flat circle; a bowl has no lid, so it has only the curved part.",
          },
        ],
        caption: "In the cone row \\(l\\) is the slant height; in the cuboid row \\(l\\) is the length.",
      },
      selfCheckExample: {
        prompt: "A cone and a sphere have the same radius and equal volumes. Find the ratio of the cone's height to its radius.",
        steps: [
          "\\(\\frac{1}{3}\\pi r^2 h = \\frac{4}{3}\\pi r^3\\). Cancel \\(\\frac{1}{3}\\pi r^2\\): \\(h = 4r\\).",
          "Height : radius \\(= 4 : 1\\).",
        ],
        answer: "\\(4 : 1\\)",
      },
      practiceSet: [
        {
          prompt: "A cylinder and a cone have the same base and the same volume. The cylinder is 5 cm tall. How tall is the cone?",
          answer: "15 cm",
        },
        {
          prompt: "A cylinder and a hemisphere have the same radius \\(r\\) and equal volumes. Find the height of the cylinder.",
          answer: "\\(\\frac{2r}{3}\\)",
        },
        {
          prompt: "A sphere and a cylinder have the same radius \\(r\\) and equal volumes. Find the height of the cylinder.",
          answer: "\\(\\frac{4r}{3}\\)",
        },
        { prompt: "Which solid has total surface \\(3\\pi r^2\\)?", answer: "A solid hemisphere of radius \\(r\\)" },
      ],
      pyqExampleId: "0f23ada3-3d9a-4b57-8782-b9c30e16cea9",
      traps: [
        {
          title: "Cone against cylinder the wrong way round",
          body:
            "A cone holds one third of the cylinder on the same base and height. For equal volumes the cone must be 3 times as tall as the cylinder, not one third as tall.",
        },
      ],
    },
  ],
};
