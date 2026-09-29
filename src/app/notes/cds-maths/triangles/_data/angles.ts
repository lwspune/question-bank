import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TG_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles of a Triangle",
  title: "Angles of a Triangle",
  oneLineDefinition:
    "The three angles of a triangle add to 180°, an exterior angle equals the two interior angles opposite it, and equal sides face equal angles.",
  whyItMatters:
    "Eleven PYQs, eight of them MODERATE. Most are one line of arithmetic once the right fact is named: split 180° in a ratio, use the exterior-angle rule, or recall the angle at which two bisectors meet. The bisector results (90° + A/2 and 90° − A/2) are the only ones worth memorising outright.",
  concepts: [
    // C1 — angle sum and exterior angle
    {
      kind: "formula" as const,
      slug: "cdstg-angle-sum",
      name: "Angle sum and the exterior angle",
      intuition:
        "Walk round a triangle and you turn through a full \\(360^\\circ\\); the three interior angles are what is left of three straight lines, \\(3\\times 180^\\circ - 360^\\circ = 180^\\circ\\). An exterior angle sits on a straight line with its own interior angle, so it equals the other two angles together.",
      definition:
        "- **Angle sum:** \\(A + B + C = 180^\\circ\\).\n" +
        "- **Exterior angle:** if \\(BC\\) is produced to \\(D\\), then \\(\\angle ACD = A + B\\).\n" +
        "- **Ratios:** angles in the ratio \\(p : q : r\\) are \\(\\dfrac{180^\\circ}{p + q + r}\\) times \\(p\\), \\(q\\) and \\(r\\).\n" +
        "- **Equal multiples:** if \\(pA = qB = rC = k\\), write each angle as \\(k\\) over its multiplier and add.",
      formula: {
        label: "Angle sum and exterior angle",
        latex: "A + B + C = 180^\\circ, \\qquad \\angle ACD = A + B",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(3\\angle A = 4\\angle B = 6\\angle C\\). Find \\(\\angle B\\).",
        steps: [
          "Let each product be \\(k\\): \\(A = \\dfrac k3\\), \\(B = \\dfrac k4\\), \\(C = \\dfrac k6\\).",
          "Their sum is \\(k\\left(\\dfrac13 + \\dfrac14 + \\dfrac16\\right) = \\dfrac{3k}{4} = 180^\\circ\\), so \\(k = 240^\\circ\\).",
          "\\(B = \\dfrac{240^\\circ}{4} = 60^\\circ\\) (and \\(A = 80^\\circ\\), \\(C = 40^\\circ\\)).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "\\(BC\\) is produced to \\(D\\). If \\(\\angle ACD = 115^\\circ\\) and \\(\\angle A = 50^\\circ\\), find \\(\\angle B\\).",
        steps: [
          "The exterior angle equals the two opposite interior angles: \\(115^\\circ = 50^\\circ + B\\).",
          "So \\(B = 65^\\circ\\).",
        ],
        answer: "\\(65^\\circ\\).",
      },
      practiceSet: [
        { prompt: "Angles in the ratio \\(1 : 2 : 3\\). Largest angle?", answer: "\\(90^\\circ\\)" },
        { prompt: "Angles in the ratio \\(2 : 3 : 4\\). Smallest angle?", answer: "\\(40^\\circ\\)" },
        { prompt: "If \\(A = B + C\\), find \\(A\\).", answer: "\\(90^\\circ\\)" },
        { prompt: "Exterior angle at \\(C\\) is \\(120^\\circ\\) and \\(A = 70^\\circ\\). Find \\(B\\).", answer: "\\(50^\\circ\\)" },
      ],
      pyqExampleId: "6ab6b36f-a92a-4d47-8b0c-f5209a0e2543", // 2020 (II) — 2A = 3B = 6C
      traps: [
        {
          title: "Opposite angles, not the adjacent one",
          body:
            "The exterior angle at \\(C\\) equals \\(A + B\\), the two angles AWAY from \\(C\\). It is \\(180^\\circ\\) minus the interior angle at \\(C\\), not the sum including it.",
        },
        {
          title: "Some questions answer themselves",
          body:
            "\\(A = B - C\\) with \\(A + B + C = 180^\\circ\\) forces \\(B = 90^\\circ\\), so \\(A\\) is acute whatever the statements say. In a data-sufficiency item, first check whether the stem alone already decides the answer.",
        },
      ],
    },

    // C2 — angles made by bisectors
    {
      kind: "formula" as const,
      slug: "cdstg-bisector-angles",
      name: "Where two angle bisectors meet",
      intuition:
        "Bisect two angles of a triangle and the lines meet at a point whose angle depends only on the third angle. The internal bisectors meet at the incentre, the external ones at an excentre, and a mixed pair at a point where the angle is exactly half the third angle.",
      definition:
        "For triangle \\(ABC\\):\n" +
        "- **Internal bisectors of \\(B\\) and \\(C\\)** meet at \\(I\\) with \\(\\angle BIC = 90^\\circ + \\dfrac A2\\).\n" +
        "- **External bisectors of \\(B\\) and \\(C\\)** meet at \\(E\\) with \\(\\angle BEC = 90^\\circ - \\dfrac A2\\).\n" +
        "- **Internal bisector of \\(B\\) and external bisector of \\(C\\)** meet at an angle of \\(\\dfrac A2\\).\n" +
        "Proof of the first: in triangle \\(BIC\\) the base angles are \\(\\dfrac B2\\) and \\(\\dfrac C2\\), so \\(\\angle BIC = 180^\\circ - \\dfrac{B + C}{2} = 180^\\circ - \\dfrac{180^\\circ - A}{2}\\).",
      formula: {
        label: "Bisector angles",
        latex: "\\angle BIC = 90^\\circ + \\tfrac{A}{2}, \\qquad \\angle BEC = 90^\\circ - \\tfrac{A}{2}",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(A = 70^\\circ\\). Find the angle at which (a) the internal bisectors of \\(B\\) and \\(C\\) meet, (b) the external bisectors of \\(B\\) and \\(C\\) meet.",
        steps: [
          "(a) \\(90^\\circ + \\dfrac{70^\\circ}{2} = 125^\\circ\\).",
          "(b) \\(90^\\circ - \\dfrac{70^\\circ}{2} = 55^\\circ\\).",
          "Check (a) with numbers: take \\(B = 60^\\circ\\), \\(C = 50^\\circ\\); then \\(180^\\circ - 30^\\circ - 25^\\circ = 125^\\circ\\).",
        ],
        answer: "(a) \\(125^\\circ\\), (b) \\(55^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "The internal bisectors of \\(\\angle B\\) and \\(\\angle C\\) meet at \\(110^\\circ\\). Find \\(\\angle A\\).",
        steps: ["\\(90^\\circ + \\dfrac A2 = 110^\\circ\\), so \\(\\dfrac A2 = 20^\\circ\\)."],
        answer: "\\(40^\\circ\\).",
      },
      practiceSet: [
        { prompt: "\\(A = 60^\\circ\\). Angle between the internal bisectors of \\(B\\) and \\(C\\)?", answer: "\\(120^\\circ\\)" },
        { prompt: "\\(A = 80^\\circ\\). Angle between the external bisectors of \\(B\\) and \\(C\\)?", answer: "\\(50^\\circ\\)" },
        { prompt: "\\(\\angle BIC = 135^\\circ\\). Find \\(A\\).", answer: "\\(90^\\circ\\)" },
        { prompt: "\\(A = 50^\\circ\\). Angle between the internal bisector of \\(B\\) and the external bisector of \\(C\\)?", answer: "\\(25^\\circ\\)" },
      ],
      pyqExampleId: "5152ddc5-aaa6-4b41-979b-d1bc38708a3f", // 2025 (I) — bisectors of A and C meet at 130°
      traps: [
        {
          title: "Two angles form where the bisectors cross",
          body:
            "Crossing lines make an angle and its supplement, say \\(115^\\circ\\) and \\(65^\\circ\\). The angle \\(\\angle BIC\\) faces the side \\(BC\\) and is always obtuse, so use the larger one; the smaller would make the third angle negative.",
        },
      ],
    },

    // C3 — isosceles triangles and parallel lines
    {
      kind: "formula" as const,
      slug: "cdstg-isosceles-parallels",
      name: "Isosceles triangles and parallel lines",
      intuition:
        "Equal sides face equal angles, so one angle of an isosceles triangle fixes the other two. Parallel lines copy angles across a transversal. Most figure questions chain these two facts.",
      definition:
        "- **Isosceles:** \\(AB = AC\\) gives \\(\\angle B = \\angle C\\), and conversely.\n" +
        "- **Parallels:** corresponding angles are equal and alternate angles are equal.\n" +
        "- **Midpoint of the hypotenuse:** it is the same distance from all three vertices, so it cuts a right triangle into two isosceles triangles.",
      formula: {
        label: "Base angles of an isosceles triangle",
        latex: "AB = AC \\;\\Rightarrow\\; \\angle B = \\angle C = 90^\\circ - \\tfrac{A}{2}",
      },
      authoredExample: {
        prompt: "In triangle \\(ABC\\), \\(AB = AC\\) and \\(BC\\) is produced to \\(D\\) with \\(\\angle ACD = 110^\\circ\\). Find \\(\\angle BAC\\).",
        steps: [
          "\\(\\angle ACB = 180^\\circ - 110^\\circ = 70^\\circ\\) (straight line at \\(C\\)).",
          "\\(AB = AC\\), so \\(\\angle ABC = 70^\\circ\\) too.",
          "\\(\\angle BAC = 180^\\circ - 140^\\circ = 40^\\circ\\).",
        ],
        answer: "\\(40^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "An isosceles triangle has its apex angle equal to \\(40^\\circ\\). Find each base angle.",
        steps: ["The base angles are equal and share \\(180^\\circ - 40^\\circ = 140^\\circ\\)."],
        answer: "\\(70^\\circ\\) each.",
      },
      practiceSet: [
        { prompt: "\\(AB = AC\\), \\(\\angle B = 65^\\circ\\). Find \\(\\angle A\\).", answer: "\\(50^\\circ\\)" },
        { prompt: "Exterior angle of an equilateral triangle?", answer: "\\(120^\\circ\\)" },
        { prompt: "Acute angles of a right isosceles triangle?", answer: "\\(45^\\circ\\) each" },
        { prompt: "\\(AB = AC\\), \\(\\angle A = 100^\\circ\\). Find \\(\\angle B\\).", answer: "\\(40^\\circ\\)" },
      ],
      pyqExampleId: "5324d4fe-3855-49fd-83c4-99c5564b1493", // 2022 (I) — AB = AC, ∠ACD = x
      traps: [
        {
          title: "Equal angles face the equal sides",
          body:
            "\\(AB = AC\\) makes \\(\\angle B = \\angle C\\), the angles at the ends of the base, not \\(\\angle A = \\angle B\\). Name the angle opposite each equal side before you write it down.",
        },
      ],
    },
  ],
};
