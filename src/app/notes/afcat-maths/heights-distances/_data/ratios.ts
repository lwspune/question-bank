import type { SubtopicNote } from "@/app/notes/_types";

export const AF_HD_RATIOS_NOTE: SubtopicNote = {
  subtopicName: "Trigonometric Ratios",
  title: "The Trigonometric Ratios at 0°, 30°, 45°, 60° and 90°",
  oneLineDefinition:
    "Sine, cosine and tangent are ratios of the sides of a right triangle; at the five standard angles their values come from two set squares and are learnt by heart.",
  whyItMatters:
    "More than a third of the chapter's questions sit on this page, and most of them ask one value, or a sum or product of two. The HARD ones give one ratio as a fraction and ask for another. Marks are lost by putting √3/2 at 30° instead of 60°, or by pairing cosec with cos.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afhd-ratio-table",
      name: "Sine, cosine and tangent at the standard angles",
      intuition:
        "In a right triangle, take one acute angle \\(\\theta\\). The side across from it is the opposite side, the side beside it is the adjacent side, and the longest side is the hypotenuse. Sine is opposite over hypotenuse, cosine is adjacent over hypotenuse, and tangent is opposite over adjacent. The values at 30°, 45° and 60° come from two set squares: the half square with sides \\(1, 1, \\sqrt2\\) and the half equilateral triangle with sides \\(1, \\sqrt3, 2\\).",
      definition:
        "- **Sine** \\(= \\dfrac{\\text{opposite}}{\\text{hypotenuse}}\\), **cosine** \\(= \\dfrac{\\text{adjacent}}{\\text{hypotenuse}}\\), **tangent** \\(= \\dfrac{\\text{opposite}}{\\text{adjacent}} = \\dfrac{\\sin\\theta}{\\cos\\theta}\\).\n" +
        "- A memory line for sine at 0°, 30°, 45°, 60°, 90°: \\(\\dfrac{\\sqrt0}{2}, \\dfrac{\\sqrt1}{2}, \\dfrac{\\sqrt2}{2}, \\dfrac{\\sqrt3}{2}, \\dfrac{\\sqrt4}{2}\\). Cosine is the same list read backwards.\n" +
        "- \\(\\sin^2\\theta\\) means \\((\\sin\\theta)^2\\): square the value, not the angle.\n" +
        "- Sine and tangent grow from 0° to 90°; cosine falls.",
      table: {
        columns: ["Angle", "sin", "cos", "tan"],
        rows: [
          { cells: ["0°", "\\(0\\)", "\\(1\\)", "\\(0\\)"] },
          { cells: ["30°", "\\(\\tfrac12\\)", "\\(\\tfrac{\\sqrt3}{2}\\)", "\\(\\tfrac{1}{\\sqrt3}\\)"] },
          { cells: ["45°", "\\(\\tfrac{1}{\\sqrt2}\\)", "\\(\\tfrac{1}{\\sqrt2}\\)", "\\(1\\)"] },
          { cells: ["60°", "\\(\\tfrac{\\sqrt3}{2}\\)", "\\(\\tfrac12\\)", "\\(\\sqrt3\\)"] },
          {
            cells: ["90°", "\\(1\\)", "\\(0\\)", "not defined"],
            noteAmber: "tan 90° would be 1 divided by 0, which has no value.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan^2 60^\\circ - \\sin^2 45^\\circ\\).",
        steps: [
          "\\(\\tan 60^\\circ = \\sqrt3\\), so \\(\\tan^2 60^\\circ = 3\\).",
          "\\(\\sin 45^\\circ = \\tfrac{1}{\\sqrt2}\\), so \\(\\sin^2 45^\\circ = \\tfrac12\\).",
          "\\(3 - \\tfrac12 = \\tfrac52\\).",
        ],
        answer: "\\(\\tfrac52\\).",
      },
      practiceSet: [
        { prompt: "Find \\(2\\sin 30^\\circ + \\tan 60^\\circ \\times \\tan 30^\\circ\\).", answer: "\\(2\\)" },
        { prompt: "Find \\(\\cos^2 30^\\circ - \\sin^2 30^\\circ\\).", answer: "\\(\\tfrac12\\)" },
        { prompt: "Find \\(\\tan 45^\\circ + \\cos 90^\\circ\\).", answer: "\\(1\\)" },
      ],
      pyqExampleId: "bc2b7aae-ae5c-49bd-ac78-02870fc9ab0d",
      traps: [
        {
          title: "√3/2 belongs to 60° for sine",
          body: "\\(\\sin 60^\\circ = \\tfrac{\\sqrt3}{2}\\) and \\(\\sin 30^\\circ = \\tfrac12\\). Swapping them is the most common slip; the memory line puts the bigger value at the bigger angle.",
        },
        {
          title: "Square the value, not the angle",
          body: "\\(\\sin^2 45^\\circ = \\left(\\tfrac{1}{\\sqrt2}\\right)^2 = \\tfrac12\\). It is not \\(\\sin 45^\\circ\\) doubled, and it is not the sine of some larger angle.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afhd-reciprocal-ratios",
      name: "Cosecant, secant and cotangent",
      intuition:
        "Each of the other three ratios is one of the first three turned upside down. Cosecant is 1 over sine, secant is 1 over cosine, and cotangent is 1 over tangent. Flip the value from the first table and simplify.",
      definition:
        "- \\(\\operatorname{cosec}\\theta = \\dfrac{1}{\\sin\\theta}\\), \\(\\sec\\theta = \\dfrac{1}{\\cos\\theta}\\), \\(\\cot\\theta = \\dfrac{1}{\\tan\\theta} = \\dfrac{\\cos\\theta}{\\sin\\theta}\\).\n" +
        "- A ratio times its reciprocal is 1: \\(\\sin\\theta \\times \\operatorname{cosec}\\theta = 1\\).\n" +
        "- If one is given as a fraction, the other is the same fraction flipped.\n" +
        "- Options often print \\(\\tfrac{2}{\\sqrt3}\\) as \\(\\tfrac{2\\sqrt3}{3}\\): multiply top and bottom by \\(\\sqrt3\\) to match.",
      table: {
        columns: ["Angle", "cosec", "sec", "cot"],
        rows: [
          { cells: ["0°", "not defined", "\\(1\\)", "not defined"] },
          { cells: ["30°", "\\(2\\)", "\\(\\tfrac{2}{\\sqrt3}\\)", "\\(\\sqrt3\\)"] },
          { cells: ["45°", "\\(\\sqrt2\\)", "\\(\\sqrt2\\)", "\\(1\\)"] },
          { cells: ["60°", "\\(\\tfrac{2}{\\sqrt3}\\)", "\\(2\\)", "\\(\\tfrac{1}{\\sqrt3}\\)"] },
          { cells: ["90°", "\\(1\\)", "not defined", "\\(0\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Find \\(\\sec^2 60^\\circ - \\tan^2 60^\\circ\\).",
        steps: ["\\(\\sec 60^\\circ = 2\\), so its square is 4.", "\\(\\tan 60^\\circ = \\sqrt3\\), so its square is 3.", "\\(4 - 3 = 1\\)."],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sec\\theta = \\tfrac{17}{8}\\), find \\(\\cos\\theta\\).", answer: "\\(\\tfrac{8}{17}\\)" },
        { prompt: "Find \\(\\operatorname{cosec} 45^\\circ \\times \\cos 45^\\circ\\).", answer: "\\(1\\)" },
        { prompt: "Find \\(\\cot 60^\\circ + \\cot 30^\\circ\\).", answer: "\\(\\tfrac{4\\sqrt3}{3}\\)" },
        { prompt: "Find \\(\\cot 30^\\circ \\times \\tan 30^\\circ\\).", answer: "\\(1\\)" },
      ],
      pyqExampleId: "73d1b601-00ad-4201-82c1-8859e5532446",
      traps: [
        {
          title: "Cosec goes with sine, sec with cosine",
          body: "The names mislead: \\(\\operatorname{cosec}\\theta = \\tfrac{1}{\\sin\\theta}\\), not \\(\\tfrac{1}{\\cos\\theta}\\). So \\(\\operatorname{cosec} 30^\\circ = 2\\) and \\(\\sec 30^\\circ = \\tfrac{2}{\\sqrt3}\\).",
        },
        {
          title: "Reciprocal is not negative",
          body: "The reciprocal of \\(\\tfrac{7}{9}\\) is \\(\\tfrac{9}{7}\\). Writing \\(-\\tfrac{7}{9}\\) or \\(1 - \\tfrac{7}{9}\\) confuses flipping with other operations.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-angle-from-value",
      name: "Finding the angle from a value",
      intuition:
        "Read the two tables backwards. If a ratio of an acute angle has a standard value, the angle is the one that value sits under. Once the angle is known, any other ratio of it is one more look at the table.",
      definition:
        "- First make the ratio stand alone: \\(2\\sin\\theta = 1\\) means \\(\\sin\\theta = \\tfrac12\\).\n" +
        "- A reciprocal ratio is flipped first: \\(\\operatorname{cosec}\\theta = \\sqrt2\\) means \\(\\sin\\theta = \\tfrac{1}{\\sqrt2}\\).\n" +
        "- If two ratios are equal, divide: \\(\\sin\\theta = \\cos\\theta\\) gives \\(\\tan\\theta = 1\\).\n" +
        "- In this chapter the angle is acute (between 0° and 90°), so each value names exactly one angle.",
      formula: {
        label: "Reading the table backwards",
        latex: "\\sin\\theta = \\tfrac{1}{\\sqrt2} \\;\\Rightarrow\\; \\theta = 45^\\circ",
      },
      authoredExample: {
        prompt: "If \\(\\operatorname{cosec}\\theta = \\sqrt2\\) and \\(\\theta\\) is acute, find \\(\\theta\\) and \\(\\cot\\theta\\).",
        steps: [
          "Flip: \\(\\sin\\theta = \\tfrac{1}{\\sqrt2}\\).",
          "That is the sine of 45°, so \\(\\theta = 45^\\circ\\).",
          "\\(\\cot 45^\\circ = 1\\).",
        ],
        answer: "\\(\\theta = 45^\\circ\\) and \\(\\cot\\theta = 1\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\cos\\theta = \\tfrac{\\sqrt3}{2}\\) and \\(\\theta\\) is acute, find \\(\\tan\\theta\\).",
        steps: ["\\(\\tfrac{\\sqrt3}{2}\\) is the cosine of 30°, so \\(\\theta = 30^\\circ\\).", "\\(\\tan 30^\\circ = \\tfrac{1}{\\sqrt3}\\)."],
        answer: "\\(\\tfrac{1}{\\sqrt3}\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\tan\\theta = \\tfrac{1}{\\sqrt3}\\), find the acute angle \\(\\theta\\).", answer: "\\(30^\\circ\\)" },
        { prompt: "If \\(2\\sin\\theta = \\sqrt3\\), find the acute angle \\(\\theta\\).", answer: "\\(60^\\circ\\)" },
        { prompt: "If \\(\\cot\\theta = 1\\), find \\(\\sin\\theta\\).", answer: "\\(\\tfrac{1}{\\sqrt2}\\)" },
        { prompt: "If \\(\\cos\\theta = 0\\) and \\(0^\\circ \\le \\theta \\le 90^\\circ\\), find \\(\\theta\\).", answer: "\\(90^\\circ\\)" },
      ],
      pyqExampleId: "66c75d64-e19a-4a4b-bedd-3ac453392c94",
      traps: [
        {
          title: "Strip the number in front first",
          body: "\\(2\\sin\\theta = 1\\) means \\(\\sin\\theta = \\tfrac12\\) and \\(\\theta = 30^\\circ\\). Reading it as \\(\\sin\\theta = 2\\) gives no angle at all, since sine never passes 1.",
        },
        {
          title: "Flip a reciprocal before looking it up",
          body: "\\(\\cot\\theta = \\sqrt3\\) means \\(\\tan\\theta = \\tfrac{1}{\\sqrt3}\\), so \\(\\theta = 30^\\circ\\), not 60°. Looking \\(\\sqrt3\\) up in the tangent column gives the complement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-complementary-identity",
      name: "Complementary angles and the square identity",
      intuition:
        "The two acute angles of a right triangle add up to 90°. The side opposite one is adjacent to the other, so the sine of one angle is the cosine of the other. And because the two shorter sides and the hypotenuse obey Pythagoras, \\(\\sin^2\\theta + \\cos^2\\theta\\) is always 1.",
      definition:
        "- **Complementary pairs:** \\(\\sin(90^\\circ - \\theta) = \\cos\\theta\\), \\(\\cos(90^\\circ - \\theta) = \\sin\\theta\\), \\(\\tan(90^\\circ - \\theta) = \\cot\\theta\\).\n" +
        "- So \\(\\tan\\theta \\times \\tan(90^\\circ - \\theta) = \\tan\\theta \\times \\cot\\theta = 1\\).\n" +
        "- **Square identity:** \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) for every angle. Dividing by \\(\\cos^2\\theta\\) gives \\(1 + \\tan^2\\theta = \\sec^2\\theta\\).\n" +
        "- These answer a question without knowing \\(\\theta\\): \\(\\tfrac{\\sin 40^\\circ}{\\cos 50^\\circ} = 1\\).",
      formula: {
        label: "Complement and square identity",
        latex: "\\sin(90^\\circ - \\theta) = \\cos\\theta, \\qquad \\sin^2\\theta + \\cos^2\\theta = 1",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{\\tan 20^\\circ}{\\cot 70^\\circ} + \\sin^2 35^\\circ + \\cos^2 35^\\circ\\).",
        steps: [
          "\\(20^\\circ + 70^\\circ = 90^\\circ\\), so \\(\\cot 70^\\circ = \\tan 20^\\circ\\) and the fraction is 1.",
          "\\(\\sin^2 35^\\circ + \\cos^2 35^\\circ = 1\\).",
          "\\(1 + 1 = 2\\).",
        ],
        answer: "\\(2\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\tan 10^\\circ \\times \\tan 80^\\circ\\).",
        steps: ["\\(\\tan 80^\\circ = \\cot 10^\\circ\\), since the angles add to 90°.", "\\(\\tan 10^\\circ \\times \\cot 10^\\circ = 1\\)."],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sin 50^\\circ - \\cos 40^\\circ\\).", answer: "\\(0\\)" },
        { prompt: "Find \\(\\sec^2 25^\\circ - \\tan^2 25^\\circ\\).", answer: "\\(1\\)" },
        { prompt: "Find \\(\\dfrac{\\cos 58^\\circ}{\\sin 32^\\circ}\\).", answer: "\\(1\\)" },
        { prompt: "If \\(\\sin\\theta = 0.6\\) and \\(\\theta\\) is acute, find \\(\\cos(90^\\circ - \\theta)\\).", answer: "\\(0.6\\)" },
      ],
      pyqExampleId: "4aa7c82a-ebd5-44d9-bd2b-7009d0af3b13",
      traps: [
        {
          title: "Complementary means adding to 90°",
          body: "\\(\\sin 20^\\circ\\) equals \\(\\cos 70^\\circ\\), not \\(\\cos 20^\\circ\\). Check that the two angles add to 90° before swapping sine for cosine.",
        },
        {
          title: "The identity needs the same angle",
          body: "\\(\\sin^2 35^\\circ + \\cos^2 35^\\circ = 1\\), but \\(\\sin^2 35^\\circ + \\cos^2 55^\\circ\\) is not 1 (it is \\(2\\sin^2 35^\\circ\\)).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afhd-ratio-from-one",
      name: "All the ratios from one given ratio",
      intuition:
        "A ratio given as a fraction names two sides of a right triangle. Draw it, find the third side by Pythagoras, and read off any other ratio. When both sine and cosine are given, tangent is simply one divided by the other.",
      definition:
        "- \\(\\tan\\theta = \\tfrac{8}{15}\\) means opposite \\(8k\\), adjacent \\(15k\\); then the hypotenuse is \\(\\sqrt{8^2 + 15^2}\\,k = 17k\\). The \\(k\\) cancels in every ratio.\n" +
        "- Triples worth knowing: \\(3, 4, 5\\); \\(8, 15, 17\\); \\(7, 24, 25\\); and any multiple of them.\n" +
        "- \\(\\tan\\theta = \\dfrac{\\sin\\theta}{\\cos\\theta}\\) and \\(\\cot\\theta = \\dfrac{\\cos\\theta}{\\sin\\theta}\\) need no triangle.\n" +
        "- For an acute angle every ratio is positive.",
      formula: {
        label: "The third side",
        latex: "\\text{hypotenuse}^2 = \\text{opposite}^2 + \\text{adjacent}^2",
      },
      authoredExample: {
        prompt: "If \\(\\tan\\theta = \\tfrac{8}{15}\\), find \\(\\sin\\theta\\) and \\(\\cos\\theta\\).",
        steps: [
          "Opposite 8, adjacent 15.",
          "Hypotenuse \\(= \\sqrt{64 + 225} = \\sqrt{289} = 17\\).",
          "\\(\\sin\\theta = \\tfrac{8}{17}\\) and \\(\\cos\\theta = \\tfrac{15}{17}\\).",
        ],
        answer: "\\(\\tfrac{8}{17}\\) and \\(\\tfrac{15}{17}\\).",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin\\theta = \\tfrac{7}{25}\\), find \\(\\tan\\theta\\).",
        steps: ["Opposite 7, hypotenuse 25.", "Adjacent \\(= \\sqrt{625 - 49} = \\sqrt{576} = 24\\).", "\\(\\tan\\theta = \\tfrac{7}{24}\\)."],
        answer: "\\(\\tfrac{7}{24}\\).",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta = \\tfrac{9}{41}\\), find \\(\\cos\\theta\\).", answer: "\\(\\tfrac{40}{41}\\)" },
        { prompt: "If \\(\\cot\\theta = \\tfrac43\\), find \\(\\cos\\theta\\).", answer: "\\(\\tfrac45\\)" },
        { prompt: "If \\(\\sin\\theta = 0.6\\) and \\(\\cos\\theta = 0.8\\), find \\(\\tan\\theta\\).", answer: "\\(0.75\\)" },
      ],
      pyqExampleId: "4dff2072-2ae0-4e02-bc79-7769d37e2d4e",
      traps: [
        {
          title: "Put the numbers on the right sides",
          body: "For \\(\\cos\\theta = \\tfrac{15}{17}\\) the 15 is the adjacent side and 17 the hypotenuse. Putting 15 opposite the angle swaps sine and cosine in every answer.",
        },
        {
          title: "The hypotenuse is the longest side",
          body: "If the side you find comes out longer than the hypotenuse, you added squares where you should have subtracted: the missing shorter side is \\(\\sqrt{\\text{hyp}^2 - \\text{side}^2}\\).",
        },
      ],
    },
  ],
};
