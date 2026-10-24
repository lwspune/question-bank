import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TR_ANGLES_NOTE: SubtopicNote = {
  subtopicName: "Angles of a Triangle",
  title: "Angles of a Triangle",
  oneLineDefinition:
    "Every triangle's angles total 180°, an outside angle is the sum of the two inside angles away from it, and the angles opposite equal sides match.",
  whyItMatters:
    "Twenty-four questions in the bank, all EASY but one. Fourteen are the angle sum dressed up as a ratio, a pair of differences or a chain like 4P = 5Q = 20R. The rest are an exterior angle or an isosceles triangle, and the only skill they test is putting the equal angles at the right corners.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctran-sum",
      name: "Angle sum of a triangle, with ratios and equations",
      intuition:
        "Tear the three corners off a paper triangle and lay them side by side: they always make a straight line. So any two angles fix the third, and any rule that ties the angles together can be solved with that one fact.",
      definition:
        "- **The three angles of every triangle add to 180°.**\n" +
        "- **Angles in a ratio** \\(a : b : c\\): one part is \\(\\frac{180^\\circ}{a + b + c}\\). Multiply by the part you need. For a difference between two angles, multiply the difference of their parts.\n" +
        "- **A chain** like \\(2A = 3B = 6C\\): set each equal to \\(k\\), so \\(A = \\frac{k}{2}\\), \\(B = \\frac{k}{3}\\), \\(C = \\frac{k}{6}\\), add them and set the sum to 180°.\n" +
        "- **Differences** like \\(A - B = 10^\\circ\\): write every angle in terms of one of them, then use the sum.\n" +
        "- In a right triangle the two acute angles add to 90°. If one angle is the average of the other two, it is 60°.\n" +
        "- **Kinds:** acute (all angles under 90°), right (one 90°), obtuse (one over 90°). A triangle has at most one angle of 90° or more. Scalene means all angles differ, isosceles two equal, equilateral all 60°.\n" +
        "- **Fast route:** for a ratio question, find one part first. The answer is almost always a whole number of degrees, which checks the arithmetic.",
      formula: {
        label: "Angle sum",
        latex: "\\angle A + \\angle B + \\angle C = 180^\\circ \\qquad \\text{one part} = \\frac{180^\\circ}{a + b + c}",
        symbols: [{ symbol: "a, b, c", meaning: "the numbers in the ratio of the angles" }],
      },
      authoredExample: {
        prompt: "The angles of a triangle are in the ratio 3 : 7 : 8. Find the largest angle and say whether the triangle is acute, right or obtuse.",
        steps: [
          "There are \\(3 + 7 + 8 = 18\\) parts, so one part is \\(\\frac{180^\\circ}{18} = 10^\\circ\\).",
          "The angles are \\(30^\\circ\\), \\(70^\\circ\\) and \\(80^\\circ\\). Check: they add to \\(180^\\circ\\).",
          "The largest is \\(80^\\circ\\), under \\(90^\\circ\\), so every angle is acute.",
        ],
        answer: "80°, an acute triangle",
      },
      selfCheckExample: {
        prompt: "In triangle ABC, \\(2\\angle A = 3\\angle B = 6\\angle C\\). Find \\(\\angle A\\).",
        steps: [
          "Let each be \\(k\\): \\(\\angle A = \\frac{k}{2}\\), \\(\\angle B = \\frac{k}{3}\\), \\(\\angle C = \\frac{k}{6}\\).",
          "Sum: \\(\\frac{3k + 2k + k}{6} = k = 180^\\circ\\).",
          "\\(\\angle A = 90^\\circ\\) (and \\(\\angle B = 60^\\circ\\), \\(\\angle C = 30^\\circ\\)).",
        ],
        answer: "90°",
      },
      practiceSet: [
        { prompt: "Two angles of a triangle are 48° and 67°. Find the third angle.", answer: "65°" },
        {
          prompt: "The angles of a triangle are in the ratio 1 : 3 : 5. Find the difference between the largest and the smallest angle.",
          answer: "80°",
          method: "One part is \\(20^\\circ\\), and the difference is 4 parts.",
        },
        {
          prompt: "In a triangle, \\(\\angle A - \\angle B = 15^\\circ\\) and \\(\\angle B - \\angle C = 30^\\circ\\). Find \\(\\angle A\\).",
          answer: "80°",
          method: "\\(\\angle B = A - 15^\\circ\\), \\(\\angle C = A - 45^\\circ\\), so \\(3A - 60^\\circ = 180^\\circ\\).",
        },
        { prompt: "One acute angle of a right triangle is four times the other. Find the smaller acute angle.", answer: "18°" },
        { prompt: "One angle of a triangle is the average of the other two. Find that angle.", answer: "60°" },
      ],
      pyqExampleId: "3a102dfe-2399-44f7-8c57-1f8a13e58eb1",
      traps: [
        {
          title: "Dividing 180° by one part of the ratio",
          body: "The size of one part is 180° divided by the sum of all the parts. Only then multiply by the part the question asks for.",
        },
        {
          title: "Allowing two obtuse or right angles",
          body: "Two angles of 90° or more already reach 180°, so a triangle has at most one right or obtuse angle.",
        },
        {
          title: "Giving the difference in parts, not degrees",
          body: "With angles in the ratio 2 : 5 : 11 the difference between the largest and smallest is 9 parts of 10°, which is 90°, not 9°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctran-exterior",
      name: "The exterior angle of a triangle",
      intuition:
        "Extend one side past a corner. The angle outside and the angle inside that corner make a straight line, and the angle inside plus the other two make 180° too. So the outside angle is exactly the other two interior angles put together.",
      definition:
        "- Extend side BC beyond C to D. The **exterior angle** at C is \\(\\angle ACD = 180^\\circ - \\angle ACB\\).\n" +
        "- **An exterior angle equals the sum of the two interior angles opposite it:** \\(\\angle ACD = \\angle A + \\angle B\\).\n" +
        "- So \\(\\angle ACD - \\angle B = \\angle A\\), and the exterior angle is larger than either opposite interior angle.\n" +
        "- The three exterior angles, one at each corner, add to 360°.\n" +
        "- **Fast route:** when the exterior angle and a ratio of the two opposite angles are given, split the exterior angle in that ratio directly.",
      formula: {
        label: "Exterior angle",
        latex: "\\angle ACD = \\angle A + \\angle B = 180^\\circ - \\angle ACB",
        symbols: [{ symbol: "D", meaning: "a point on BC extended beyond C" }],
      },
      authoredExample: {
        prompt:
          "In triangle PQR, side QR is extended beyond R to S. The exterior angle \\(\\angle PRS = 128^\\circ\\) and \\(\\angle P = 49^\\circ\\). Find \\(\\angle Q\\) and \\(\\angle PRQ\\).",
        steps: [
          "The exterior angle at R equals the two opposite interior angles: \\(\\angle P + \\angle Q = 128^\\circ\\), so \\(\\angle Q = 128^\\circ - 49^\\circ = 79^\\circ\\).",
          "The interior angle at R sits beside the exterior one: \\(\\angle PRQ = 180^\\circ - 128^\\circ = 52^\\circ\\).",
          "Check: \\(49^\\circ + 79^\\circ + 52^\\circ = 180^\\circ\\).",
        ],
        answer: "∠Q = 79°, ∠PRQ = 52°",
      },
      selfCheckExample: {
        prompt:
          "Side BC of triangle ABC is extended beyond C to D. The exterior angle \\(\\angle ACD = 114^\\circ\\) and \\(\\angle A = 2\\angle B\\). Find \\(\\angle B\\) and \\(\\angle ACB\\).",
        steps: [
          "\\(\\angle A + \\angle B = 114^\\circ\\) and \\(\\angle A = 2\\angle B\\), so \\(3\\angle B = 114^\\circ\\) and \\(\\angle B = 38^\\circ\\).",
          "\\(\\angle ACB = 180^\\circ - 114^\\circ = 66^\\circ\\). Check: \\(76^\\circ + 38^\\circ + 66^\\circ = 180^\\circ\\).",
        ],
        answer: "∠B = 38°, ∠ACB = 66°",
      },
      practiceSet: [
        { prompt: "One angle of a triangle is 64°. What is the exterior angle at that corner?", answer: "116°" },
        { prompt: "The two interior angles opposite an exterior angle of a triangle are 38° and 57°. Find the exterior angle.", answer: "95°" },
        { prompt: "What do the three exterior angles of a triangle, one at each corner, add to?", answer: "360°" },
        {
          prompt: "In triangle ABC, BC is extended beyond C to D, \\(\\angle ACD = 130^\\circ\\) and \\(\\angle ABC = 55^\\circ\\). Find \\(\\angle BAC\\).",
          answer: "75°",
        },
      ],
      pyqExampleId: "ad78d4ac-6e31-4a0d-adb1-e75bdf76c846",
      traps: [
        {
          title: "Adding the interior angle beside the exterior one",
          body: "The exterior angle at C equals ∠A + ∠B, the two angles away from C. The interior angle at C is its supplement, not part of the sum.",
        },
        {
          title: "Answering with the exterior angle as an interior one",
          body: "An exterior angle of 120° is not an angle of the triangle. The interior angle at that corner is 60°, and the largest interior angle has to be found from the three interior angles.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctran-isosceles",
      name: "Isosceles and equilateral triangles",
      intuition:
        "Fold an isosceles triangle along the line from the top corner to the middle of the base. The two halves match exactly, so the two base angles are equal.",
      definition:
        "- **Equal sides face equal angles.** If AB = AC, then \\(\\angle B = \\angle C\\): the angles opposite the equal sides, at the two ends of the third side.\n" +
        "- The angle between the two equal sides is the **apex**. Base angle \\(= \\frac{180^\\circ - \\text{apex}}{2}\\), and apex \\(= 180^\\circ - 2 \\times\\) base angle.\n" +
        "- **Find the apex from the letters.** If AC = BC, the equal sides meet at C, so the equal angles are \\(\\angle A\\) and \\(\\angle B\\).\n" +
        "- **Equilateral:** all three sides equal and every angle 60°. A right isosceles triangle has angles 90°, 45° and 45°.\n" +
        "- Combine with the exterior angle when a side is extended: find the base angles first.",
      formula: {
        label: "Base angle of an isosceles triangle",
        latex: "\\text{base angle} = \\frac{180^\\circ - \\text{apex}}{2}",
      },
      authoredExample: {
        prompt: "In triangle PQR, PQ = PR and \\(\\angle Q = 66^\\circ\\). Find \\(\\angle P\\).",
        steps: [
          "PQ = PR, so the equal angles are the ones opposite these sides: \\(\\angle R = \\angle Q = 66^\\circ\\).",
          "\\(\\angle P = 180^\\circ - 66^\\circ - 66^\\circ = 48^\\circ\\).",
        ],
        answer: "48°",
      },
      selfCheckExample: {
        prompt:
          "In triangle XYZ, XZ = YZ and \\(\\angle Z = 44^\\circ\\). Side XY is extended beyond Y to W. Find \\(\\angle ZYW\\).",
        steps: [
          "XZ = YZ, so \\(\\angle X = \\angle Y = \\frac{180^\\circ - 44^\\circ}{2} = 68^\\circ\\).",
          "\\(\\angle ZYW\\) is the exterior angle at Y: \\(180^\\circ - 68^\\circ = 112^\\circ\\). Check: \\(\\angle X + \\angle Z = 68^\\circ + 44^\\circ = 112^\\circ\\).",
        ],
        answer: "112°",
      },
      practiceSet: [
        { prompt: "The apex angle of an isosceles triangle is 100°. Find each base angle.", answer: "40°" },
        { prompt: "Each base angle of an isosceles triangle is 35°. Find the apex angle.", answer: "110°" },
        { prompt: "Two sides of an equilateral triangle add to 22 cm. Find its perimeter.", answer: "33 cm" },
        { prompt: "In triangle ABC, AC = BC and \\(\\angle C = 50^\\circ\\). Find \\(\\angle A\\).", answer: "65°" },
      ],
      pyqExampleId: "ce024a24-79fa-4064-9b36-250bd88a3211",
      traps: [
        {
          title: "Putting the equal angles at the wrong corners",
          body: "The equal angles are opposite the equal sides. With AC = BC the equal angles are ∠A and ∠B, and ∠C is the apex.",
        },
        {
          title: "Halving the apex to get a base angle",
          body: "Each base angle is half of what is left after the apex: (180° − apex) ÷ 2. An apex of 80° gives base angles of 50°, not 40°.",
        },
      ],
    },
  ],
};
