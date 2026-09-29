import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_LA_LINES_NOTE: SubtopicNote = {
  subtopicName: "Lines, Angles and Parallels",
  title: "Lines, Angles and Parallels",
  oneLineDefinition:
    "Angles on a straight line add to 180°, vertically opposite angles are equal, and a transversal makes equal corresponding and alternate angles with parallel lines.",
  whyItMatters:
    "Twelve PYQs, none HARD, several read from a figure. Three facts settle almost all of them: a straight line is 180°, crossing lines make equal opposite angles, and parallels cut every transversal at the same angle — and in the same ratio when there are three of them.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsla-angles",
      name: "Angles where lines meet",
      intuition:
        "Two crossing lines make two pairs of equal angles, and any two neighbours make a straight line. So one angle fixes all four.",
      definition:
        "- Adjacent angles on a straight line add to \\(180^\\circ\\); complementary angles add to \\(90^\\circ\\).\n" +
        "- Vertically opposite angles are equal.\n" +
        "- Points equidistant from two intersecting lines lie on the two angle bisectors: a pair of perpendicular lines.\n" +
        "- \\(n\\) lines, no two parallel and no three through one point, meet in \\(\\binom n2\\) points.",
      formula: {
        label: "Intersection points",
        latex: "\\binom{n}{2} = \\dfrac{n(n - 1)}{2}",
      },
      authoredExample: {
        prompt: "Two lines cross so that one angle is four times its neighbour. Find all four angles.",
        steps: ["\\(x + 4x = 180^\\circ\\), so \\(x = 36^\\circ\\)."],
        answer: "\\(36^\\circ, 36^\\circ, 144^\\circ, 144^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "An angle is two-thirds of its complement. Find it.",
        steps: ["\\(\\theta = \\tfrac23(90^\\circ - \\theta)\\), so \\(5\\theta = 180^\\circ\\)."],
        answer: "\\(36^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Supplement of \\(65^\\circ\\)?", answer: "\\(115^\\circ\\)" },
        { prompt: "\\(10\\) lines in general position. Intersection points?", answer: "\\(45\\)" },
        { prompt: "Angles \\(x, 2x, 3x\\) on a straight line. \\(x\\)?", answer: "\\(30^\\circ\\)" },
        { prompt: "Locus equidistant from two crossing lines?", answer: "A pair of straight lines" },
      ],
      pyqExampleId: "f9ca979f-ca4c-44d8-839e-fd7476a8771c", // 2018 (II) — angle AOC = 5 × angle AOD
      traps: [
        {
          title: "Two bisectors, not one",
          body:
            "Two intersecting lines make two angles, and each has a bisector. Points equidistant from the lines fill BOTH bisectors, so the locus is a pair of lines.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsla-parallels",
      name: "Parallels and transversals",
      intuition:
        "A transversal crosses parallel lines at the same slant, so the angles it makes repeat at each crossing. Three parallel lines also slice any two transversals into pieces in the same ratio.",
      definition:
        "- Corresponding and alternate angles are equal; co-interior angles add to \\(180^\\circ\\).\n" +
        "- Lines parallel to the same line are parallel; in a plane, lines perpendicular to the same line are parallel.\n" +
        "- Equal acute angles with a third line do NOT make two lines parallel: they can slope opposite ways.\n" +
        "- Three parallels cut transversals in the same ratio: \\(\\dfrac{AB}{BC} = \\dfrac{DE}{EF}\\).",
      formula: {
        label: "Intercept ratio",
        latex: "\\dfrac{AB}{BC} = \\dfrac{DE}{EF}",
      },
      authoredExample: {
        prompt: "Three parallel lines cut one transversal into \\(4\\) cm and \\(6\\) cm, and another into \\(x\\) and \\(9\\) cm. Find \\(x\\).",
        steps: ["\\(\\dfrac{4}{6} = \\dfrac{x}{9}\\)."],
        answer: "\\(6\\) cm.",
      },
      selfCheckExample: {
        prompt: "A transversal makes an angle of \\(62^\\circ\\) with one of two parallel lines. What is the co-interior angle at the other line?",
        steps: ["Co-interior angles are supplementary."],
        answer: "\\(118^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Alternate angle to \\(48^\\circ\\)?", answer: "\\(48^\\circ\\)" },
        { prompt: "\\(AB : BC = 2 : 5\\), \\(EF = 10\\). \\(DE\\)?", answer: "\\(4\\)" },
        { prompt: "\\(A \\perp C\\) and \\(B \\perp C\\) in a plane. \\(A\\) and \\(B\\)?", answer: "Parallel" },
        { prompt: "\\(AB : AC = DE : DF\\) for three parallels?", answer: "True" },
      ],
      pyqExampleId: "69f15f4c-93d7-485b-b4a0-b5dc25403f23", // 2019 (I) — PQ = 3, QR = 9, MN = 10.5, find LM
      traps: [
        {
          title: "Equal angles, opposite slopes",
          body:
            "Two lines making \\(30^\\circ\\) with a third can slope up and down; they are not parallel. Parallel needs equal corresponding angles on the same side.",
        },
      ],
    },
  ],
};
