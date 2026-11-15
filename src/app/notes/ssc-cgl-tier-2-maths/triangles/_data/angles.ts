import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_TR_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles of a Triangle",
  title: "Angles of a Triangle",
  oneLineDefinition:
    "The angles of a triangle add to 180 degrees and an exterior angle equals the two far interior angles; equal sides face equal angles, and the bisector and altitude from one corner meet at half the difference of the other two angles.",
  whyItMatters:
    "9 questions in the Tier II bank, 4 EASY and 5 MODERATE. The MODERATE ones chain two or three isosceles triangles or an exterior angle, so label every angle in terms of one letter before solving.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2tran-sum",
      name: "Angle sum and exterior angles",
      intuition:
        "The three angles of a triangle add to 180°, and an exterior angle equals the two interior angles away from it. Nearly every angle question uses these two facts once or twice.",
      definition:
        "- \\(A + B + C = 180^\\circ\\).\n" +
        "- An angle outside the triangle, made by extending one side, equals the two inside angles at the other corners added together.\n" +
        "- Angles on a straight line add to 180°.\n" +
        "- A point on the perpendicular bisector of PQ is the same distance from P and from Q, so it forms an isosceles triangle with them.",
      formula: {
        label: "Angle sum and exterior angle",
        latex: "A + B + C = 180^\\circ, \\quad \\text{exterior angle} = \\text{sum of the two far interior angles}",
      },
      authoredExample: {
        prompt: "In triangle ABC, angle A is 25° more than angle B, and angle C is 10° less than angle B. Find the largest angle.",
        steps: ["\\((B + 25^\\circ) + B + (B - 10^\\circ) = 180^\\circ\\), so \\(3B = 165^\\circ\\) and \\(B = 55^\\circ\\).", "A \\(= 80^\\circ\\), C \\(= 45^\\circ\\); the largest is \\(80^\\circ\\)."],
        answer: "\\(80^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In triangle PQR, S is a point on QR. Angle PQS = 40°, angle QPS = 35° and angle SPR = 30°. Find angle PRS.",
        steps: ["Angle PSR is exterior to triangle PQS: \\(40^\\circ + 35^\\circ = 75^\\circ\\).", "In triangle PSR: \\(180^\\circ - 75^\\circ - 30^\\circ = 75^\\circ\\)."],
        answer: "\\(75^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Two angles of a triangle are 47° and 68°. Find the third.", answer: "\\(65^\\circ\\)" },
        { prompt: "An exterior angle of a triangle is 110°, and one of the two far interior angles is 45°. Find the other.", answer: "\\(65^\\circ\\)" },
        { prompt: "A triangle's angles go 2 : 3 : 4. What is the biggest of them?", answer: "\\(80^\\circ\\)" },
      ],
      pyqExampleId: "93942090-5064-4ddc-bb55-1ce0fbc12437",
      traps: [
        {
          title: "Using the neighbouring angle for the exterior angle",
          body: "An exterior angle equals the two interior angles FAR from it. The interior angle beside it is its supplement, not part of the sum.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tran-isosceles",
      name: "Isosceles chains",
      intuition:
        "Equal sides face equal angles. When a stem sets several equal lengths in a row, each one makes an isosceles triangle, and the angles build up through exterior angles as x, 2x and so on.",
      definition:
        "- In any triangle, equal sides stand opposite equal angles.\n" +
        "- Call the smallest angle x, then use 'equal sides, equal angles' and the exterior-angle rule to label the others in terms of x.\n" +
        "- Close the chain with one angle sum.\n" +
        "- A triangle built on a side of a square or of an equilateral triangle shares that side's length: use it as another equal side.",
      formula: {
        label: "Equal sides, equal angles",
        latex: "AB = AC \\;\\Rightarrow\\; \\angle B = \\angle C",
      },
      authoredExample: {
        prompt: "In triangle PQR, PQ = PR and angle P = 40°. S is a point on PR with QS = QR. Find angle PQS.",
        steps: [
          "The base angles are \\(\\angle Q = \\angle R = 70^\\circ\\).",
          "QS = QR, so \\(\\angle QSR = \\angle QRS = 70^\\circ\\) and \\(\\angle SQR = 40^\\circ\\).",
          "\\(\\angle PQS = 70^\\circ - 40^\\circ = 30^\\circ\\).",
        ],
        answer: "\\(30^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In triangle XYZ, XY = XZ, and the exterior angle at Z (with YZ produced) is 115°. Find angle X.",
        steps: ["\\(\\angle XZY = 180^\\circ - 115^\\circ = 65^\\circ\\), so \\(\\angle Y = 65^\\circ\\) too.", "\\(\\angle X = 180^\\circ - 130^\\circ = 50^\\circ\\)."],
        answer: "\\(50^\\circ\\)",
      },
      practiceSet: [
        { prompt: "In an isosceles triangle the angle between the equal sides is 50°. Find each base angle.", answer: "\\(65^\\circ\\)" },
        { prompt: "An isosceles triangle has base angles of 72°. Find its top angle.", answer: "\\(36^\\circ\\)" },
        { prompt: "In triangle ABC, AB = AC, angle A = 40°, and BD bisects angle B, meeting AC at D. Find angle BDC.", answer: "\\(75^\\circ\\)", method: "Exterior to triangle ABD: \\(40^\\circ + 35^\\circ\\)." },
      ],
      pyqExampleId: "135090e0-8275-42cd-ba4f-c91a206b1248",
      traps: [
        {
          title: "Looking for the equal angles in the wrong place",
          body: "In a triangle with AB = AC, the equal angles are at B and C, opposite the equal sides, not at A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2tran-bisector",
      name: "The angle between a bisector and an altitude",
      intuition:
        "From a corner A, the angle bisector and the altitude both run down to the opposite side. The angle between them depends only on the other two angles: it is half their difference.",
      definition:
        "- Angle between the bisector of A and the altitude from A \\(= \\frac{B - C}{2}\\), with B the larger angle.\n" +
        "- Given that angle and one of B and C, the other follows.\n" +
        "- The altitude from A makes an angle of \\(90^\\circ - B\\) with side AB.",
      formula: {
        label: "Bisector against altitude",
        latex: "\\angle(\\text{bisector}, \\text{altitude}) = \\frac{B - C}{2}",
      },
      authoredExample: {
        prompt: "In triangle ABC, angle B = 70° and angle C = 40°. Find the angle between the bisector of angle A and the altitude from A.",
        steps: ["\\(\\frac{70^\\circ - 40^\\circ}{2} = 15^\\circ\\).", "Check: A = 70°, half of it 35°; the altitude makes \\(90^\\circ - 70^\\circ = 20^\\circ\\) with AB; \\(35^\\circ - 20^\\circ = 15^\\circ\\)."],
        answer: "\\(15^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "The angle between the bisector and the altitude from A is 12°, and angle B = 64° is larger than angle C. Find angle C.",
        steps: ["\\(\\frac{64^\\circ - C}{2} = 12^\\circ\\).", "\\(C = 40^\\circ\\)."],
        answer: "\\(40^\\circ\\)",
      },
      practiceSet: [
        { prompt: "In a triangle, the other two angles are 80° and 50°. Find the angle between the bisector and the altitude from the third corner.", answer: "\\(15^\\circ\\)" },
        { prompt: "In triangle PQR, angle Q = 75°. Find the angle between the altitude from P and side PQ.", answer: "\\(15^\\circ\\)" },
        { prompt: "The bisector and the altitude from A coincide. What kind of triangle is it?", answer: "Isosceles, with AB = AC" },
      ],
      pyqExampleId: "ab2878f8-62a5-4d10-b68c-0419079bb8db",
      traps: [
        {
          title: "Halving the sum instead of the difference",
          body: "The angle between the bisector and the altitude is half of \\(B - C\\), not half of \\(B + C\\). Half the sum is \\(90^\\circ - \\frac{A}{2}\\), a different angle.",
        },
      ],
    },
  ],
};
