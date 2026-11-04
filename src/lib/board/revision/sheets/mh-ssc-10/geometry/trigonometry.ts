import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geometry, Ch. 6 Trigonometry. Definitions follow the Balbharati
 * book; identities and the values table rebuilt (the book text loses its
 * powers, roots and theta). Most-asked from the SSC board past papers in the
 * bank, 2016-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geometry",
  subjectRoute: "geometry",
  chapterName: "Trigonometry",
  chapterSlug: "trigonometry",
  source: "Balbharati Mathematics Part II Std X (Maharashtra State Board), Chapter 6",
  keyPoints: [
    {
      term: "Trigonometric ratios",
      text: "In right angled \\(\\triangle ABC\\) with \\(\\angle B = 90^\\circ\\) and \\(\\angle A = \\theta\\): \\(\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}\\).",
    },
    {
      term: "cosec, sec and cot",
      text: "The reciprocal of the sine ratio is the cosecant ratio; the reciprocals of cosine and tangent are secant and cotangent. So \\(\\sin\\theta \\times \\operatorname{cosec}\\theta = 1\\), \\(\\cos\\theta \\times \\sec\\theta = 1\\), \\(\\tan\\theta \\times \\cot\\theta = 1\\).",
    },
    {
      term: "tan and cot from sin and cos",
      text: "\\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}\\) and \\(\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}\\).",
    },
    {
      term: "Fundamental identities",
      text: "\\(\\sin^2\\theta + \\cos^2\\theta = 1\\), \\(1 + \\tan^2\\theta = \\sec^2\\theta\\), \\(1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta\\). They come from Pythagoras theorem.",
    },
    {
      term: "Line of vision",
      text: "If the observer is standing at A, looking at an object B, then the line AB is the line of vision.",
    },
    {
      term: "Angle of elevation",
      text: "When we see above the horizontal line, the angle between the line of vision and the horizontal line is the angle of elevation.",
    },
    {
      term: "Angle of depression",
      text: "When we see below the horizontal line, the angle formed is the angle of depression. It equals the angle of elevation from the lower point (alternate angles).",
    },
    {
      term: "Heights and distances: conventions",
      text: "Trees, hills and towers are drawn perpendicular to the ground. Ignore the observer's height and take the line of vision from eye level as the horizontal, unless told otherwise.",
    },
  ],
  formulas: [
    { label: "Reciprocal ratios", latex: "\\operatorname{cosec}\\theta = \\frac{1}{\\sin\\theta} \\qquad \\sec\\theta = \\frac{1}{\\cos\\theta} \\qquad \\cot\\theta = \\frac{1}{\\tan\\theta}" },
    { label: "Quotient ratios", latex: "\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta} \\qquad \\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}" },
    { label: "Fundamental identities", latex: "\\sin^2\\theta + \\cos^2\\theta = 1 \\qquad 1 + \\tan^2\\theta = \\sec^2\\theta \\qquad 1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta" },
    {
      label: "Values of standard angles",
      latex:
        "\\begin{array}{c|ccccc} \\theta & 0^\\circ & 30^\\circ & 45^\\circ & 60^\\circ & 90^\\circ \\\\ \\hline \\sin & 0 & \\frac{1}{2} & \\frac{1}{\\sqrt{2}} & \\frac{\\sqrt{3}}{2} & 1 \\\\ \\cos & 1 & \\frac{\\sqrt{3}}{2} & \\frac{1}{\\sqrt{2}} & \\frac{1}{2} & 0 \\\\ \\tan & 0 & \\frac{1}{\\sqrt{3}} & 1 & \\sqrt{3} & \\text{not defined} \\end{array}",
    },
    { label: "Height from distance and angle of elevation", latex: "h = d\\tan\\theta" },
  ],
  derivations: [
    {
      title: "Prove the fundamental trigonometric identities",
      steps: [
        "In \\(\\triangle ABC\\), \\(\\angle B = 90^\\circ\\), \\(\\angle A = \\theta\\). Pythagoras: \\(BC^2 + AB^2 = AC^2\\) (I).",
        "Divide (I) by \\(AC^2\\): \\(\\left(\\frac{BC}{AC}\\right)^2 + \\left(\\frac{AB}{AC}\\right)^2 = 1\\), so \\(\\sin^2\\theta + \\cos^2\\theta = 1\\) (II).",
        "Divide (II) by \\(\\sin^2\\theta\\): \\(1 + \\cot^2\\theta = \\operatorname{cosec}^2\\theta\\).",
        "Divide (II) by \\(\\cos^2\\theta\\): \\(\\tan^2\\theta + 1 = \\sec^2\\theta\\).",
      ],
    },
    {
      title: "Given one ratio, find another (e.g. sec θ = 25/7, find tan θ)",
      steps: [
        "Pick the identity that links the two: \\(1 + \\tan^2\\theta = \\sec^2\\theta\\).",
        "\\(\\tan^2\\theta = \\frac{625}{49} - 1 = \\frac{576}{49}\\).",
        "\\(\\theta\\) is acute, so take the positive root: \\(\\tan\\theta = \\frac{24}{7}\\).",
      ],
    },
    {
      title: "Eliminate θ: x = r cos θ and y = r sin θ",
      steps: [
        "Square both: \\(x^2 = r^2\\cos^2\\theta\\), \\(y^2 = r^2\\sin^2\\theta\\).",
        "Add: \\(x^2 + y^2 = r^2(\\cos^2\\theta + \\sin^2\\theta) = r^2\\).",
      ],
    },
    {
      title: "Width of a river from two angles of elevation (heights and distances)",
      steps: [
        "Rough figure: tree AB on the far bank, first position C, second position D, 24 m (or the given distance) behind C.",
        "From \\(\\triangle ABC\\): \\(\\tan 60^\\circ = \\frac{AB}{BC}\\), so \\(AB = \\sqrt{3}\\,BC\\).",
        "From \\(\\triangle ABD\\): \\(\\tan 30^\\circ = \\frac{AB}{BC + CD}\\), so \\(\\sqrt{3}\\,AB = BC + CD\\).",
        "Substitute \\(AB\\): \\(3BC = BC + CD\\), so \\(BC = \\frac{CD}{2}\\) (the width), then find \\(AB\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Angle of elevation", labels: ["observer at A", "object B above", "horizontal line AM", "line of vision AB", "angle BAM"] },
    { title: "Angle of depression", labels: ["observer at A", "object C below", "horizontal line AM", "line of vision AC", "angle MAC"] },
    { title: "Right triangle for the ratios", labels: ["right angle at B", "angle θ at A", "opposite side BC", "adjacent side AB", "hypotenuse AC"] },
  ],
  mostAsked: [
    { topic: "Given one ratio (sin, cos or sec), find another using an identity", marks: 2, years: [2026, 2025, 2024, 2022, 2020, 2019, 2018] },
    { topic: "Heights and distances: angle of elevation or depression", marks: 2, years: [2026, 2025, 2024, 2023, 2020, 2019, 2018, 2017, 2016] },
    { topic: "Prove an identity, or eliminate θ", marks: 3, years: [2024, 2023, 2022, 2020, 2018, 2017] },
    { topic: "Prove a fundamental identity: sin²θ + cos²θ = 1, 1 + tan²θ = sec²θ, 1 + cot²θ = cosec²θ", marks: 2, years: [2026, 2025, 2024, 2019] },
    { topic: "Values of standard angles and reciprocal ratios", marks: 1, years: [2024, 2022, 2019, 2018] },
    { topic: "Find the sides of a right triangle from an angle", marks: 2, years: [2025, 2019] },
  ],
  mistakes: [
    {
      title: "Measuring the angle from the vertical",
      body: "Angles of elevation and depression are measured from the **horizontal** line. Draw the horizontal line through the observer's eye first.",
    },
    {
      title: "Putting the angle of depression at the observer only",
      body: "The angle of depression at the top equals the angle of elevation at the bottom (alternate angles). Use the one inside your right triangle.",
    },
    {
      title: "Choosing sin or cos when tan is needed",
      body: "Height and horizontal distance are the two perpendicular sides, so use \\(\\tan\\). Use \\(\\sin\\) or \\(\\cos\\) only when the slant length is given.",
    },
    {
      title: "Keeping the negative root",
      body: "Here \\(\\theta\\) is acute, so every ratio is positive. From \\(\\cos^2\\theta = \\frac{3600}{3721}\\), write \\(\\cos\\theta = \\frac{60}{61}\\).",
    },
    {
      title: "Reading sin²θ as sin(θ²)",
      body: "\\(\\sin^2\\theta\\) means \\((\\sin\\theta)^2\\). Square the value of the ratio, not the angle.",
    },
  ],
};

export default sheet;
