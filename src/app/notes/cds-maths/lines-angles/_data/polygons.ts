import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LA_POLYGONS_NOTE: SubtopicNote = {
  subtopicName: "Interior and Exterior Angles of Polygons",
  title: "Angles of Polygons",
  oneLineDefinition:
    "The interior angles of an n-sided polygon add to (n − 2) × 180°, and its exterior angles always add to 360°.",
  whyItMatters:
    "Ten PYQs, eight of them EASY. Work with the exterior angle: in a regular polygon it is 360°/n, and the interior angle is 180° minus it. Most items then take one line.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsla-polygon",
      name: "Interior and exterior angle sums",
      intuition:
        "Walk round a polygon and you turn through one full circle, so the exterior angles add to \\(360^\\circ\\) whatever the shape. Each interior angle is \\(180^\\circ\\) minus its exterior angle.",
      definition:
        "- Sum of interior angles \\(= (n - 2) \\times 180^\\circ = (2n - 4)\\) right angles.\n" +
        "- Sum of exterior angles \\(= 360^\\circ\\) for every polygon.\n" +
        "- Regular: exterior \\(= \\dfrac{360^\\circ}{n}\\); interior \\(= 180^\\circ -\\) exterior.\n" +
        "- Interior : exterior \\(= \\dfrac{n - 2}{2}\\).\n" +
        "- An angle \\(e\\) is a possible exterior angle exactly when \\(\\dfrac{360}{e}\\) is a whole number of at least \\(3\\).",
      formula: {
        label: "Interior-angle sum",
        latex: "(n - 2) \\times 180^\\circ",
      },
      authoredExample: {
        prompt: "Each interior angle of a regular polygon is \\(156^\\circ\\). How many sides has it?",
        steps: ["Exterior \\(= 24^\\circ\\).", "\\(\\dfrac{360}{24}\\)."],
        answer: "\\(15\\).",
      },
      selfCheckExample: {
        prompt: "A pentagon has four equal angles and a fifth that is \\(20^\\circ\\) larger. Find the equal angles.",
        steps: ["Sum \\(540^\\circ\\): \\(5x + 20 = 540\\)."],
        answer: "\\(104^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Interior angle of a regular octagon?", answer: "\\(135^\\circ\\)" },
        { prompt: "Interior sum twice the exterior sum. Sides?", answer: "\\(6\\)" },
        { prompt: "Interior minus exterior \\(= 90^\\circ\\). Sides?", answer: "\\(8\\)" },
        { prompt: "Can \\(7^\\circ\\) be an exterior angle of a regular polygon?", answer: "No" },
      ],
      pyqExampleId: "0985b41a-0af4-4289-ae02-8512984f11b0", // 2017 (II) — hexagon, one angle 30° more than the other five
      traps: [
        {
          title: "Exterior angles sum to 360° always",
          body:
            "For two polygons together, the exterior sums give \\(720^\\circ\\), not a figure that depends on the sides. The interior sum is the one that grows with \\(n\\).",
        },
      ],
    },
  ],
};
