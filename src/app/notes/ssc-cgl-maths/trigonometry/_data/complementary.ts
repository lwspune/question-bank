import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_COMPLEMENTARY_NOTE: SubtopicNote = {
  subtopicName: "Complementary and Allied Angles",
  title: "Complementary and Allied Angles",
  oneLineDefinition:
    "Angles that add to 90° swap sin for cos, tan for cot and sec for cosec; any larger or negative angle reduces to an acute one with a sign fixed by its quadrant.",
  whyItMatters:
    "61 questions in the bank, the largest page in the chapter, with 49 EASY and 18 from 2025. Most look long (a product of five tangents, a sum of eight squares) and are really one pairing step that collapses to 1 or 0. The 15 on quadrants and large angles carry most of this page's MODERATE questions, and the marks there go on signs.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgco-cofunction",
      name: "The co-function rule for complementary angles",
      intuition:
        "The two acute angles of a right triangle add to 90°, and the side opposite one of them is adjacent to the other. So the sine of one angle is the cosine of the other, and the same swap links tan with cot and sec with cosec.",
      definition:
        "- \\(\\sin(90^\\circ - \\theta) = \\cos\\theta\\) and \\(\\cos(90^\\circ - \\theta) = \\sin\\theta\\).\n" +
        "- \\(\\tan(90^\\circ - \\theta) = \\cot\\theta\\) and \\(\\cot(90^\\circ - \\theta) = \\tan\\theta\\).\n" +
        "- \\(\\sec(90^\\circ - \\theta) = \\text{cosec}\\,\\theta\\) and \\(\\text{cosec}(90^\\circ - \\theta) = \\sec\\theta\\).\n" +
        "- So a pair of angles adding to 90° gives: \\(\\tan A \\tan(90^\\circ - A) = 1\\), \\(\\sin^2 A + \\sin^2(90^\\circ - A) = 1\\), and \\(\\frac{\\sin A}{\\cos(90^\\circ - A)} = 1\\).\n" +
        "- **Fast route:** in a long product or sum, add the angles in pairs. Each pair that makes 90° collapses to 1 or cancels, and \\(\\tan 45^\\circ = 1\\) is usually the middle term.\n" +
        "- **Limit:** only angles adding to exactly 90° pair this way. 20° and 60° do not.",
      formula: {
        label: "Co-function rule",
        latex:
          "\\sin(90^\\circ - \\theta) = \\cos\\theta \\qquad \\tan(90^\\circ - \\theta) = \\cot\\theta \\qquad \\sec(90^\\circ - \\theta) = \\text{cosec}\\,\\theta",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\frac{\\sin 36^\\circ}{\\cos 54^\\circ} + \\frac{\\sec 28^\\circ}{\\text{cosec}\\,62^\\circ} - \\tan 15^\\circ \\tan 75^\\circ\\).",
        steps: [
          "\\(\\cos 54^\\circ = \\sin 36^\\circ\\), so the first fraction is 1.",
          "\\(\\text{cosec}\\,62^\\circ = \\sec 28^\\circ\\), so the second fraction is 1.",
          "\\(\\tan 75^\\circ = \\cot 15^\\circ\\), so \\(\\tan 15^\\circ \\tan 75^\\circ = 1\\).",
          "Value \\(= 1 + 1 - 1 = 1\\).",
        ],
        answer: "1",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos^2 20^\\circ + \\cos^2 70^\\circ + \\sin^2 45^\\circ\\).",
        steps: [
          "\\(\\cos 70^\\circ = \\sin 20^\\circ\\), so \\(\\cos^2 20^\\circ + \\cos^2 70^\\circ = 1\\).",
          "\\(\\sin^2 45^\\circ = \\frac{1}{2}\\). Total \\(= \\frac{3}{2}\\).",
        ],
        answer: "\\(\\frac{3}{2}\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\sin 72^\\circ - \\cos 18^\\circ\\)?", answer: "0" },
        { prompt: "Write \\(\\cot 81^\\circ\\) as a ratio of 9°.", answer: "\\(\\tan 9^\\circ\\)" },
        { prompt: "What is \\(\\tan 33^\\circ \\times \\tan 57^\\circ\\)?", answer: "1" },
        {
          prompt: "What is \\(\\sec^2 40^\\circ - \\cot^2 50^\\circ\\)?",
          answer: "\\(\\sec 40^\\circ = \\text{cosec}\\,50^\\circ\\), so \\(\\text{cosec}^2 50^\\circ - \\cot^2 50^\\circ = 1\\)",
        },
      ],
      pyqExampleId: "2c22763b-a081-4886-86c9-f9edfb97feb2",
      traps: [
        {
          title: "Pairing angles that add to 180°",
          body:
            "The co-function rule needs a sum of exactly 90°. \\(\\tan 50^\\circ \\tan 130^\\circ\\) is not 1: those angles add to 180°, and 130° is handled by the allied-angle rule, not by swapping tan for cot.",
        },
        {
          title: "Pairing a ratio with itself",
          body:
            "\\(\\sin 20^\\circ \\sin 70^\\circ\\) is not 1. Swap one of them first: \\(\\sin 70^\\circ = \\cos 20^\\circ\\), so the product is \\(\\sin 20^\\circ \\cos 20^\\circ\\), and it is tan times cot, or a square plus a square, that gives 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgco-sum90",
      name: "Angles that add up to 90°",
      intuition:
        "If the sine of one acute angle equals the cosine of another, the two must be partners that make 90°. Turn the equation of ratios into an equation of angles, and solve that.",
      definition:
        "- \\(\\sin A = \\cos B\\), \\(\\tan A = \\cot B\\) or \\(\\sec A = \\text{cosec}\\,B\\), with A and B acute: \\(A + B = 90^\\circ\\).\n" +
        "- \\(\\tan A \\tan B = 1\\) is the same statement, since it says \\(\\tan A = \\cot B\\).\n" +
        "- With brackets, add the brackets: \\(\\sin(2x + 10^\\circ) = \\cos(x + 20^\\circ)\\) gives \\(3x + 30^\\circ = 90^\\circ\\).\n" +
        "- In a triangle right-angled at C, \\(A + B = 90^\\circ\\), so \\(\\cos B = \\sin A\\) and \\(\\tan B = \\cot A\\) with no working.\n" +
        "- **Limit:** the rule needs both angles acute. \\(\\sin 120^\\circ = \\cos 30^\\circ\\), yet the angles add to 150°. SSC writes 'acute' in the question for this reason.",
      formula: {
        label: "Partners that make 90°",
        latex: "\\sin A = \\cos B \\ \\text{or} \\ \\tan A = \\cot B \\ (A, B \\text{ acute}) \\Rightarrow A + B = 90^\\circ",
      },
      authoredExample: {
        prompt: "If \\(\\sec 4x = \\text{cosec}(x + 15^\\circ)\\), with both angles acute, find x.",
        steps: [
          "sec and cosec are co-functions, so the angles add to 90°: \\(4x + x + 15^\\circ = 90^\\circ\\).",
          "\\(5x = 75^\\circ\\), so \\(x = 15^\\circ\\).",
          "Check: \\(4x = 60^\\circ\\) and \\(x + 15^\\circ = 30^\\circ\\); \\(\\sec 60^\\circ = 2 = \\text{cosec}\\,30^\\circ\\).",
        ],
        answer: "\\(15^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In triangle PQR, right-angled at R, \\(\\tan P = \\frac{3}{4}\\). Find \\(\\sin Q\\).",
        steps: [
          "\\(P + Q = 90^\\circ\\), so \\(\\sin Q = \\cos P\\).",
          "\\(\\tan P = \\frac{3}{4}\\) is the 3, 4, 5 triangle, so \\(\\cos P = \\frac{4}{5}\\).",
        ],
        answer: "\\(\\frac{4}{5}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sin 2x = \\cos 3x\\) and both angles are acute, find x.", answer: "\\(5x = 90^\\circ\\), so \\(x = 18^\\circ\\)" },
        { prompt: "If \\(\\tan A \\tan B = 1\\) and \\(A = 35^\\circ\\), find B.", answer: "\\(55^\\circ\\)" },
        {
          prompt: "If \\(\\cos(x + 5^\\circ) = \\sin 25^\\circ\\) and \\(x + 5^\\circ\\) is acute, find x.",
          answer: "\\(x + 5^\\circ = 65^\\circ\\), so \\(x = 60^\\circ\\)",
        },
        {
          prompt: "If \\(A + B = 90^\\circ\\) and \\(\\cos A = \\frac{5}{13}\\), what is \\(\\sin B\\)?",
          answer: "\\(\\frac{5}{13}\\)",
        },
      ],
      pyqExampleId: "8e0c8461-26ed-4a26-886c-5318009d7800",
      traps: [
        {
          title: "Setting the angles equal",
          body:
            "\\(\\sin 2x = \\cos 3x\\) does not mean \\(2x = 3x\\). Different ratios on the two sides mean the angles ADD to 90°; only the same ratio on both sides means the angles are equal.",
        },
        {
          title: "Using a non-standard answer as a sign of error",
          body:
            "\\(\\sin x = \\cos(2x - 10^\\circ)\\) gives \\(x = 33.33^\\circ\\), which is not a table angle. That is fine: this rule never needs the table, only the sum of 90°.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgco-allied",
      name: "Allied angles, quadrant signs and large angles",
      intuition:
        "Every angle beyond 90° behaves like an acute angle wearing a sign. Find the acute angle it is tied to, take that value from the table, and let the quadrant decide plus or minus.",
      definition:
        "- **Signs (ASTC):** from 0° to 90° All ratios are positive; 90° to 180° only Sine (and cosec); 180° to 270° only Tan (and cot); 270° to 360° only Cos (and sec).\n" +
        "- \\(180^\\circ \\pm \\theta\\) and \\(360^\\circ - \\theta\\) keep the **same** ratio: \\(\\sin 150^\\circ = \\sin 30^\\circ\\), \\(\\cos 240^\\circ = -\\cos 60^\\circ\\).\n" +
        "- \\(90^\\circ + \\theta\\) and \\(270^\\circ \\pm \\theta\\) switch to the **co-ratio**: \\(\\cos(90^\\circ + \\theta) = -\\sin\\theta\\).\n" +
        "- **Large angles:** take away whole turns of 360°: \\(\\cos 750^\\circ = \\cos 30^\\circ\\). tan and cot repeat every 180°, so you may take away 180° for them.\n" +
        "- **Negative angles:** \\(\\sin(-\\theta) = -\\sin\\theta\\), \\(\\tan(-\\theta) = -\\tan\\theta\\), \\(\\cos(-\\theta) = \\cos\\theta\\).\n" +
        "- **A ratio given in a quadrant:** draw the acute triangle for the sizes, then give each ratio the quadrant's sign.",
      formula: {
        label: "Allied angles",
        latex:
          "\\sin(180^\\circ - \\theta) = \\sin\\theta \\qquad \\cos(180^\\circ - \\theta) = -\\cos\\theta \\qquad \\tan(180^\\circ + \\theta) = \\tan\\theta \\qquad \\cos(360^\\circ - \\theta) = \\cos\\theta \\qquad \\sin(-\\theta) = -\\sin\\theta",
      },
      authoredExample: {
        prompt: "Find \\(\\sin 495^\\circ + \\cos(-300^\\circ)\\).",
        steps: [
          "\\(495^\\circ - 360^\\circ = 135^\\circ\\), and \\(\\sin 135^\\circ = \\sin(180^\\circ - 45^\\circ) = \\frac{1}{\\sqrt{2}}\\) (positive in the second quadrant).",
          "\\(\\cos(-300^\\circ) = \\cos 300^\\circ = \\cos(360^\\circ - 60^\\circ) = \\frac{1}{2}\\).",
          "Sum \\(= \\frac{1}{\\sqrt{2}} + \\frac{1}{2} = \\frac{\\sqrt{2} + 1}{2}\\).",
        ],
        answer: "\\(\\frac{\\sqrt{2} + 1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\cos x = -\\frac{8}{17}\\) and x lies in the third quadrant, find \\(\\tan x + \\sin x\\).",
        steps: [
          "The sizes come from the 8, 15, 17 triangle.",
          "In the third quadrant sin is negative and tan is positive: \\(\\sin x = -\\frac{15}{17}\\), \\(\\tan x = \\frac{15}{8}\\).",
          "\\(\\frac{15}{8} - \\frac{15}{17} = \\frac{15 \\times 9}{136} = \\frac{135}{136}\\).",
        ],
        answer: "\\(\\frac{135}{136}\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\cos 150^\\circ\\)?", answer: "\\(-\\frac{\\sqrt{3}}{2}\\)" },
        { prompt: "What is \\(\\tan 225^\\circ\\)?", answer: "1" },
        { prompt: "In which quadrant are sin and cos both negative?", answer: "The third (180° to 270°)" },
        { prompt: "What is \\(\\sin(-30^\\circ)\\)?", answer: "\\(-\\frac{1}{2}\\)" },
      ],
      pyqExampleId: "1c30c677-d58b-43f2-8f78-ae32a8ce341b",
      traps: [
        {
          title: "Dropping the sign in the second quadrant",
          body:
            "Between 90° and 180° only sin and cosec are positive. If \\(\\sin x = \\frac{3}{5}\\) there, then \\(\\cos x = -\\frac{4}{5}\\) and \\(\\tan x = -\\frac{3}{4}\\); the positive versions are always among the options.",
        },
        {
          title: "Taking away 180° from a sine",
          body:
            "Only tan and cot repeat every 180°. For sin and cos, \\(\\sin(\\theta + 180^\\circ) = -\\sin\\theta\\), so remove whole turns of 360° instead.",
        },
        {
          title: "Putting a minus on cos of a negative angle",
          body: "\\(\\cos(-\\theta) = \\cos\\theta\\): cos ignores the sign of the angle. sin and tan are the ones that change sign.",
        },
      ],
    },
  ],
};
