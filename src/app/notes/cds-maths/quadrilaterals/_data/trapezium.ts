import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_QU_TRAPEZIUM_NOTE: SubtopicNote = {
  subtopicName: "Trapeziums",
  title: "Trapeziums",
  oneLineDefinition:
    "In a trapezium the diagonals cut each other in the ratio of the parallel sides, and the line joining the midpoints of the legs is their average.",
  whyItMatters:
    "Eight PYQs, two of them HARD. Five use one pair of similar triangles — the two on the parallel sides, cut off by the diagonals — for ratios of lengths and, squared, of areas. The rest use the midline or an isosceles or right trapezium.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsqu-trapezium-diagonals",
      name: "Diagonals and the four triangles",
      intuition:
        "The parallel sides make alternate angles equal, so the triangles on them, \\(AOB\\) and \\(COD\\), are similar in the ratio \\(AB : CD\\). The two side triangles have equal areas, because each is a big triangle on a parallel side minus the same piece.",
      definition:
        "- \\(AB \\parallel CD\\): \\(\\dfrac{AO}{OC} = \\dfrac{BO}{OD} = \\dfrac{AB}{CD}\\).\n" +
        "- \\([AOB] : [COD] = AB^2 : CD^2\\).\n" +
        "- The side triangles are equal: \\([AOD] = [BOC]\\), and \\([AOD]^2 = [AOB]\\cdot[COD]\\).\n" +
        "- A line parallel to the parallel sides cuts the legs in the same ratio.",
      formula: {
        label: "Diagonal ratio",
        latex: "\\dfrac{AO}{OC} = \\dfrac{BO}{OD} = \\dfrac{AB}{CD}",
      },
      authoredExample: {
        prompt: "In trapezium \\(ABCD\\), \\(AB \\parallel CD\\) and \\(3AB = 5CD\\). Find \\([AOB] : [COD]\\).",
        steps: ["\\(\\dfrac{AB}{CD} = \\dfrac53\\).", "Areas of similar triangles go as the squares."],
        answer: "\\(25 : 9\\).",
      },
      selfCheckExample: {
        prompt: "In a trapezium, the triangles on the parallel sides have areas \\(4\\) and \\(25\\) cm\\(^2\\). Find the area of each side triangle.",
        steps: ["\\([AOD]^2 = 4 \\times 25\\)."],
        answer: "\\(10\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "\\(AB : CD = 2 : 1\\). \\(AO : OC\\)?", answer: "\\(2 : 1\\)" },
        { prompt: "\\(AO : OC = 3 : 2\\). \\([AOB] : [COD]\\)?", answer: "\\(9 : 4\\)" },
        { prompt: "\\([AOB] = 9\\), \\([COD] = 1\\). Whole trapezium?", answer: "\\(16\\)" },
        { prompt: "Which two of the four triangles are always equal?", answer: "The two on the legs" },
      ],
      pyqExampleId: "fa192897-7418-44ee-9d63-5480fbe0d90b", // 2021 (I) — 2AB = 3DC, ratio of areas AOB : DOC
      traps: [
        {
          title: "Lengths go straight, areas go squared",
          body:
            "The diagonals cut each other in the ratio \\(AB : CD\\). The AREAS of the triangles on the parallel sides go as its square. Using one where the other is asked is the standard wrong option.",
        },
        {
          title: "Which sides are parallel?",
          body:
            "Some items make \\(AD \\parallel BC\\) instead of \\(AB \\parallel CD\\). The similar triangles are then \\(AOD\\) and \\(COB\\); relabel before using the rules.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsqu-trapezium-midline",
      name: "The midline and special trapeziums",
      intuition:
        "The segment joining the midpoints of the legs runs halfway up the trapezium, so its length is halfway between the two parallel sides: their average.",
      definition:
        "- Midline \\(= \\dfrac{a + b}{2}\\), where \\(a, b\\) are the parallel sides. Area \\(=\\) midline \\(\\times\\) height.\n" +
        "- Isosceles trapezium (equal legs, not a parallelogram): base angles equal, and it is always cyclic.\n" +
        "- A trapezium with an incircle: the height is the circle's diameter, and each leg equals the sum of the two tangents from its ends.",
      formula: {
        label: "Midline",
        latex: "EF = \\dfrac{AB + CD}{2}",
      },
      authoredExample: {
        prompt: "A trapezium's midline is \\(13\\) cm and its parallel sides differ by \\(6\\) cm. Find the parallel sides.",
        steps: ["\\(AB + CD = 26\\), \\(AB - CD = 6\\)."],
        answer: "\\(16\\) cm and \\(10\\) cm.",
      },
      selfCheckExample: {
        prompt: "A trapezium has parallel sides \\(11\\) and \\(7\\) cm and height \\(5\\) cm. Find its area.",
        steps: ["Midline \\(9\\) cm."],
        answer: "\\(45\\) cm\\(^2\\).",
      },
      practiceSet: [
        { prompt: "Parallel sides \\(8\\) and \\(14\\). Midline?", answer: "\\(11\\)" },
        { prompt: "Is an isosceles trapezium cyclic?", answer: "Always" },
        { prompt: "Incircle of radius \\(6\\). Height of the trapezium?", answer: "\\(12\\)" },
        { prompt: "Midline \\(10\\), height \\(4\\). Area?", answer: "\\(40\\)" },
      ],
      pyqExampleId: "df41c7ee-719e-4081-969d-42267d7a227a", // 2022 (I) — EF = 10 cm, AB − DC = 4 cm, find AB × DC
      traps: [
        {
          title: "Equal legs do not make it a trapezium",
          body:
            "With one pair of sides parallel and the other pair equal, the figure may still be a parallelogram. Only when the equal sides are NOT parallel is it an isosceles trapezium, and so cyclic.",
        },
      ],
    },
  ],
};
