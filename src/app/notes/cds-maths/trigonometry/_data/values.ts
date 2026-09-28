import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TR_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Degree, Radian and Standard Values",
  title: "Degree, Radian & Standard Values",
  oneLineDefinition:
    "The raw material of the chapter: converting between degrees and radians, the ratios of 0°, 30°, 45°, 60° and 90°, and what values a ratio can and cannot take.",
  whyItMatters:
    "Twenty PYQs and the cheapest page in the chapter — seven are EASY and only one is HARD. Every other page assumes these values are instant, so an hour here pays back across all 227 questions in the chapter.",
  concepts: [
    // C1 — degree and radian measure
    {
      kind: "formula" as const,
      slug: "cdstr-degree-radian",
      name: "Degree and radian measure, and arc length",
      intuition:
        "A radian is the angle that cuts off an arc exactly one radius long. A full turn fits \\(2\\pi\\) radii round the circle, so a full turn is \\(2\\pi\\) radians as well as \\(360^\\circ\\). One radian is therefore a big angle — about \\(57.3^\\circ\\) — which is the fact behind every 'compare \\(\\sin 1^\\circ\\) with \\(\\sin 1^c\\)' question.",
      definition:
        "**Conversion:** \\(\\pi\\) radians \\(= 180^\\circ\\), so multiply degrees by \\(\\dfrac{\\pi}{180}\\) to get radians, and radians by \\(\\dfrac{180}{\\pi}\\) to get degrees. A superscript \\(c\\) (as in \\(1^c\\)) means radians.\n" +
        "- \\(1^c \\approx 57.3^\\circ\\), and \\(1^\\circ \\approx 0.0175\\) radian.\n" +
        "- **Arc length** \\(s = r\\theta\\), with \\(\\theta\\) in **radians**.\n" +
        "- One revolution is \\(2\\pi\\) radians, so \\(N\\) revolutions turn \\(2\\pi N\\) radians.",
      formula: {
        label: "Degree–radian conversion and arc length",
        latex: "\\pi \\text{ rad} = 180^\\circ, \\qquad s = r\\theta \\;(\\theta \\text{ in radians})",
      },
      authoredExample: {
        prompt: "Two angles add up to \\(\\dfrac{\\pi}{2}\\) radian and differ by \\(30^\\circ\\). Find the larger angle in degrees.",
        steps: [
          "Convert the sum: \\(\\dfrac{\\pi}{2}\\) radian \\(= 90^\\circ\\).",
          "So \\(x + y = 90^\\circ\\) and \\(x - y = 30^\\circ\\).",
          "Adding, \\(2x = 120^\\circ\\), so \\(x = 60^\\circ\\).",
        ],
        answer: "\\(60^\\circ\\).",
      },
      selfCheckExample: {
        prompt: "An arc of a circle of radius \\(6\\) cm subtends \\(60^\\circ\\) at the centre. Find its length.",
        steps: [
          "Convert the angle: \\(60^\\circ = \\dfrac{\\pi}{3}\\) radian.",
          "Arc length \\(s = r\\theta = 6 \\times \\dfrac{\\pi}{3} = 2\\pi\\) cm.",
        ],
        answer: "\\(2\\pi\\) cm.",
      },
      practiceSet: [
        { prompt: "\\(135^\\circ\\) in radians?", answer: "\\(\\dfrac{3\\pi}{4}\\)" },
        { prompt: "\\(\\dfrac{5\\pi}{6}\\) radian in degrees?", answer: "\\(150^\\circ\\)" },
        { prompt: "Radians turned by a wheel making 2 revolutions per second, in one second?", answer: "\\(4\\pi\\)" },
        { prompt: "Which is larger, \\(\\sin 1^\\circ\\) or \\(\\sin 1^c\\)?", answer: "\\(\\sin 1^c\\)", method: "\\(1^c \\approx 57.3^\\circ\\), and sine increases in the first quadrant" },
      ],
      pyqExampleId: "08561a61-44a3-40fb-b702-71d7505aea8a", // 2025 (I) — arc of length π on radius 4
      traps: [
        {
          title: "Arc length needs the angle in radians",
          body:
            "\\(s = r\\theta\\) is only true with \\(\\theta\\) in radians. Putting \\(60\\) (degrees) into it gives \\(360\\) cm for a \\(6\\) cm circle — an arc longer than the whole circumference. Convert first.",
        },
        {
          title: "One radian is not a small angle",
          body:
            "Students read \\(1^c\\) as 'about one degree'. It is about \\(57.3^\\circ\\), so \\(\\sin 1^c \\approx 0.84\\) while \\(\\sin 1^\\circ \\approx 0.017\\). Every comparison between the two turns on this.",
        },
      ],
    },

    // C2 — standard values (reference)
    {
      kind: "reference" as const,
      slug: "cdstr-standard-values",
      name: "Ratios of the standard angles",
      intuition:
        "Five angles — \\(0^\\circ, 30^\\circ, 45^\\circ, 60^\\circ, 90^\\circ\\) — are the only ones the paper expects you to know by value. Sine climbs through \\(\\dfrac{\\sqrt0}{2}, \\dfrac{\\sqrt1}{2}, \\dfrac{\\sqrt2}{2}, \\dfrac{\\sqrt3}{2}, \\dfrac{\\sqrt4}{2}\\); cosine runs the same list backwards; everything else is a quotient or a reciprocal.",
      definition:
        "Learn the sine row as \\(\\dfrac{\\sqrt{n}}{2}\\) for \\(n = 0, 1, 2, 3, 4\\). Then:\n" +
        "- **cosine** is the sine row reversed;\n" +
        "- \\(\\tan = \\dfrac{\\sin}{\\cos}\\), and \\(\\cot\\), \\(\\sec\\), \\(\\operatorname{cosec}\\) are reciprocals of \\(\\tan\\), \\(\\cos\\), \\(\\sin\\).\n" +
        "A value that is 'not defined' comes from dividing by zero: \\(\\tan 90^\\circ\\), \\(\\sec 90^\\circ\\), \\(\\cot 0^\\circ\\) and \\(\\operatorname{cosec} 0^\\circ\\).",
      table: {
        columns: ["Angle", "sin", "cos", "tan"],
        rows: [
          { cells: ["\\(0^\\circ\\)", "\\(0\\)", "\\(1\\)", "\\(0\\)"] },
          { cells: ["\\(30^\\circ\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\dfrac{\\sqrt3}{2}\\)", "\\(\\dfrac{1}{\\sqrt3}\\)"] },
          { cells: ["\\(45^\\circ\\)", "\\(\\dfrac{1}{\\sqrt2}\\)", "\\(\\dfrac{1}{\\sqrt2}\\)", "\\(1\\)"] },
          { cells: ["\\(60^\\circ\\)", "\\(\\dfrac{\\sqrt3}{2}\\)", "\\(\\dfrac{1}{2}\\)", "\\(\\sqrt3\\)"] },
          { cells: ["\\(90^\\circ\\)", "\\(1\\)", "\\(0\\)", "not defined"], noteAmber: "\\(\\tan 90^\\circ\\) and \\(\\sec 90^\\circ\\) are not defined — they are not 0 and not 1." },
        ],
        caption: "Sine climbs as \\(\\sqrt{n}/2\\), cosine is the same list reversed, and tangent is their quotient.",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\dfrac{\\tan 60^\\circ - \\tan 30^\\circ}{1 + \\tan 60^\\circ \\tan 30^\\circ}\\).",
        steps: [
          "Numerator: \\(\\sqrt3 - \\dfrac{1}{\\sqrt3} = \\dfrac{2}{\\sqrt3}\\).",
          "Denominator: \\(1 + \\sqrt3 \\cdot \\dfrac{1}{\\sqrt3} = 2\\).",
          "Quotient: \\(\\dfrac{2}{\\sqrt3} \\div 2 = \\dfrac{1}{\\sqrt3}\\), which is \\(\\tan 30^\\circ\\).",
        ],
        answer: "\\(\\dfrac{1}{\\sqrt3}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sin 60^\\circ \\cos 30^\\circ\\)?", answer: "\\(\\dfrac34\\)" },
        { prompt: "\\(\\operatorname{cosec} 45^\\circ\\)?", answer: "\\(\\sqrt2\\)" },
        { prompt: "\\(4\\cos^2 60^\\circ + \\tan^2 45^\\circ\\)?", answer: "\\(2\\)" },
        { prompt: "\\(\\cot 30^\\circ\\)?", answer: "\\(\\sqrt3\\)" },
      ],
      pyqExampleId: "4860bd42-297f-4271-a066-05ab38ffed84", // 2017 (II) — A and B from 45°, 30°, 60° values
      traps: [
        {
          title: "Rationalise before comparing",
          body:
            "\\(\\dfrac{\\sqrt2 - 1}{\\sqrt2 + 1}\\) and \\(3 - 2\\sqrt2\\) are the same number. When two expressions in a question look different, rationalise both before deciding they differ.",
        },
      ],
    },

    // C3 — ranges, signs and monotonicity
    {
      kind: "formula" as const,
      slug: "cdstr-ranges-and-signs",
      name: "What values a ratio can take, and its sign",
      intuition:
        "Sine and cosine are coordinates of a point on a circle of radius 1, so they can never leave \\([-1, 1]\\). Their reciprocals can therefore never enter \\((-1, 1)\\). Tangent is unrestricted. Most 'which of these is possible?' questions are settled by that one sentence before any algebra.",
      definition:
        "- \\(-1 \\le \\sin\\theta \\le 1\\) and \\(-1 \\le \\cos\\theta \\le 1\\).\n" +
        "- \\(|\\sec\\theta| \\ge 1\\) and \\(|\\operatorname{cosec}\\theta| \\ge 1\\).\n" +
        "- \\(\\tan\\theta\\) and \\(\\cot\\theta\\) take every real value.\n" +
        "- **Signs:** all ratios are positive in the first quadrant; sine (and cosec) in the second; tangent (and cot) in the third; cosine (and sec) in the fourth.\n" +
        "- **In the first quadrant** sine and tangent increase with the angle and cosine decreases, so a larger cosine means a **smaller** angle. Below \\(45^\\circ\\) the cotangent exceeds the tangent; above \\(45^\\circ\\) the tangent exceeds the cotangent.",
      formula: {
        label: "Ranges",
        latex: "|\\sin\\theta|, |\\cos\\theta| \\le 1, \\qquad |\\sec\\theta|, |\\operatorname{cosec}\\theta| \\ge 1",
      },
      visualizationSlug: "trig-astc-quadrants",
      authoredExample: {
        prompt: "If \\(\\sin\\alpha + \\sin\\beta + \\sin\\gamma = 3\\), find \\(\\cos\\alpha + \\cos\\beta + \\cos\\gamma\\).",
        steps: [
          "Each sine is at most \\(1\\), so three sines can total \\(3\\) only if each equals \\(1\\).",
          "Where the sine is \\(1\\), the cosine is \\(0\\).",
          "So the sum of the cosines is \\(0\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt: "Which of \\(\\cos x = 1.2\\), \\(\\cot y = 50\\), \\(\\sec z = 0.5\\) are possible?",
        steps: [
          "\\(\\cos x = 1.2\\) is impossible: cosine never exceeds \\(1\\).",
          "\\(\\cot y = 50\\) is possible: cotangent takes every real value.",
          "\\(\\sec z = 0.5\\) is impossible: \\(|\\sec z| \\ge 1\\).",
        ],
        answer: "Only \\(\\cot y = 50\\).",
      },
      practiceSet: [
        { prompt: "Sign of \\(\\cos 150^\\circ\\)?", answer: "Negative" },
        { prompt: "Can \\(\\operatorname{cosec}\\theta = \\dfrac12\\)?", answer: "No", method: "\\(|\\operatorname{cosec}\\theta| \\ge 1\\)" },
        { prompt: "If \\(0 < \\theta, \\phi < 90^\\circ\\) and \\(\\cos\\theta > \\cos\\phi\\), which angle is larger?", answer: "\\(\\phi\\)" },
        { prompt: "Sign of \\(\\tan 20^\\circ - \\cot 20^\\circ\\)?", answer: "Negative", method: "below \\(45^\\circ\\), \\(\\cot > \\tan\\)" },
      ],
      pyqExampleId: "ba4908fd-8bed-4cdc-90ea-f1eae526e26f", // 2019 (II) — which of sec = 1/4, tan = 20, cosec = 1/2, cos = 2 are impossible
      traps: [
        {
          title: "A larger cosine means a smaller angle",
          body:
            "On \\(0^\\circ\\) to \\(90^\\circ\\) the cosine falls as the angle rises. So \\(\\cos\\theta < \\cos\\phi\\) means \\(\\theta > \\phi\\). Reading it the way sine behaves reverses the answer.",
        },
      ],
    },
  ],
};
