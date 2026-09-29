import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_HD_TWOPOINTS_NOTE: SubtopicNote = {
  subtopicName: "Two Points of Observation",
  title: "Two Points of Observation",
  oneLineDefinition:
    "Two observations of one height give two ground distances, h cot α and h cot β; the question hands you their difference or their sum.",
  whyItMatters:
    "Nineteen PYQs, four of them HARD — the biggest page of the chapter. Moving towards a tower, a car approaching, two stones on a road: the gap between the points is h(cot β − cot α). Opposite sides: the distances add. Complementary angles give the shortcut h² = pq.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdshd-two-points",
      name: "Difference and sum of the distances",
      intuition:
        "Each observation of the same height fixes one ground distance, \\(h\\cot\\theta\\). If both points are on the same side, walking between them covers the difference; if the object is between them, their gap is the sum.",
      definition:
        "- Same side, angles \\(\\alpha < \\beta\\): gap \\(= h(\\cot\\alpha - \\cot\\beta)\\).\n" +
        "- Opposite sides: gap \\(= h(\\cot\\alpha + \\cot\\beta)\\).\n" +
        "- \\(30^\\circ\\) and \\(60^\\circ\\): \\(\\cot 30^\\circ - \\cot 60^\\circ = \\dfrac2{\\sqrt3}\\); \\(\\cot 30^\\circ + \\cot 60^\\circ = \\dfrac4{\\sqrt3}\\).\n" +
        "- Uniform speed: times are in the ratio of the distances covered.\n" +
        "- A flagstaff on a tower: two heights, the same ground distances.",
      formula: {
        label: "Same side",
        latex: "d = h(\\cot\\alpha - \\cot\\beta)",
      },
      authoredExample: {
        prompt: "From two points \\(20\\) m apart on the same side of a tower, the elevations of its top are \\(30^\\circ\\) and \\(60^\\circ\\). Find its height.",
        steps: ["\\(h \\cdot \\dfrac{2}{\\sqrt3} = 20\\)."],
        answer: "\\(10\\sqrt3\\) m.",
      },
      selfCheckExample: {
        prompt: "From the top of a tower, a car's depression changes from \\(30^\\circ\\) to \\(60^\\circ\\) in \\(10\\) minutes. How much longer until it reaches the tower?",
        steps: ["Distances \\(h\\sqrt3\\) and \\(\\dfrac{h}{\\sqrt3}\\): the car covered \\(\\dfrac{2h}{\\sqrt3}\\) in \\(10\\) min.", "\\(\\dfrac{h}{\\sqrt3}\\) left is half of that."],
        answer: "\\(5\\) minutes.",
      },
      practiceSet: [
        { prompt: "Height \\(30\\), opposite sides at \\(45^\\circ\\) and \\(45^\\circ\\). Gap?", answer: "\\(60\\)" },
        { prompt: "Height \\(h\\), same side, \\(45^\\circ\\) and \\(60^\\circ\\). Gap?", answer: "\\(h\\left(1 - \\tfrac1{\\sqrt3}\\right)\\)" },
        { prompt: "\\(\\tan\\) values \\(\\tfrac12\\) and \\(1\\), \\(50\\) m apart. Height?", answer: "\\(50\\)" },
        { prompt: "Consecutive km-stones at \\(45^\\circ\\) and \\(60^\\circ\\), same side. Height?", answer: "\\(\\dfrac{\\sqrt3}{\\sqrt3 - 1}\\) km" },
      ],
      pyqExampleId: "d8247579-cd72-4f73-abae-c4af1099348e", // 2026 (I) — opposite sides of a 100 m tower, 30° and 60°
      traps: [
        {
          title: "Same side or opposite sides?",
          body:
            "'On either side of the tower' or 'on the opposite banks' means the distances ADD. Subtracting them gives an option that is always there.",
        },
        {
          title: "Nearer point, larger angle",
          body:
            "The point closer to the tower sees the larger elevation. Swapping the angles makes the gap negative.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdshd-complementary",
      name: "Complementary angles",
      intuition:
        "If the two elevations add to \\(90^\\circ\\), then \\(\\tan\\alpha \\cdot \\tan\\beta = 1\\). Multiplying \\(h = p\\tan\\alpha\\) by \\(h = q\\tan\\beta\\) removes the angles entirely.",
      definition:
        "- Elevations \\(\\alpha\\) and \\(90^\\circ - \\alpha\\) from distances \\(p\\) and \\(q\\): \\(h^2 = pq\\).\n" +
        "- With heights \\(h_1\\) and \\(h_2\\) seen from one point: \\(h_1h_2 = xy\\).\n" +
        "- Conversely, \\(\\tan\\alpha\\tan\\beta = 1\\) means \\(\\alpha + \\beta = 90^\\circ\\).\n" +
        "- A double angle, \\(\\beta = 2\\alpha\\): use \\(\\tan 2\\alpha = \\dfrac{2\\tan\\alpha}{1 - \\tan^2\\alpha}\\).",
      formula: {
        label: "Complementary elevations",
        latex: "h^2 = pq",
      },
      authoredExample: {
        prompt: "The elevations of a tower's top from points \\(4\\) m and \\(16\\) m from its foot (same line) are complementary. Find its height.",
        steps: ["\\(h^2 = 4 \\times 16\\)."],
        answer: "\\(8\\) m.",
      },
      selfCheckExample: {
        prompt: "A pole \\(12\\) m high is seen from points \\(9\\) m and \\(16\\) m from its foot. Are the elevations complementary?",
        steps: ["\\(\\tan\\alpha\\tan\\beta = \\dfrac{12}{9} \\cdot \\dfrac{12}{16} = 1\\)."],
        answer: "Yes.",
      },
      practiceSet: [
        { prompt: "Complementary from \\(2\\) and \\(8\\). Height?", answer: "\\(4\\)" },
        { prompt: "Height \\(6\\), complementary, one distance \\(4\\). Other?", answer: "\\(9\\)" },
        { prompt: "\\(\\tan\\alpha = \\tfrac34\\), \\(\\tan\\beta = \\tfrac43\\). \\(\\alpha + \\beta\\)?", answer: "\\(90^\\circ\\)" },
        { prompt: "Complementary depressions from height \\(h\\), opposite banks. Width?", answer: "\\(h(\\tan\\alpha + \\cot\\alpha)\\)" },
      ],
      pyqExampleId: "5a39c272-1dd7-443f-8854-3792e9d971f2", // 2020 (I) — elevations 27° and 63° from p and q
      traps: [
        {
          title: "Heights multiply, distances multiply",
          body:
            "\\(h^2 = pq\\) uses the PRODUCT of the distances. With \\(4\\) and \\(16\\), the height is \\(8\\), not \\(10\\), their average.",
        },
      ],
    },
  ],
};
