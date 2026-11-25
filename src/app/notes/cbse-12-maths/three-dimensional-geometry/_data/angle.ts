import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_TG_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Angle Between Two Lines",
  title: "Angle Between Two Lines",
  oneLineDefinition:
    "The angle between two lines is the angle between their directions: its cosine is the dot product of the direction vectors divided by their lengths, taken without sign for the acute angle.",
  whyItMatters:
    "31 questions, eighteen of them from board papers between 2023 and 2026. The board asked for the angle between two lines (2023, 2025 and 2026; in 2023 and 2026 the answer was the inverse cosine of 19/21), for the value of an unknown that makes two lines perpendicular (every year from 2023), and for assertion-reason items on the conditions for parallel and perpendicular lines (2023 and 2026). A 2026 MCQ asked for the formula of the acute angle, which needs a modulus, and the 2025 metro case study asked whether two tracks are parallel. The textbook adds Examples 7 and 8, Exercise 11.2 Q1 to Q3 and Q8 to Q11, and Miscellaneous Exercise Q1 and Q3.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmtg-angle",
      name: "The angle between two lines",
      intuition:
        "Two lines in space may not meet, but each has a direction. Draw lines parallel to both through the origin: the angle between these is the angle between the given lines. So only the direction ratios matter, never the points. The dot product gives the cosine, and taking its modulus gives the acute angle.",
      definition:
        "- With direction ratios \\(a_1, b_1, c_1\\) and \\(a_2, b_2, c_2\\): \\(\\cos\\theta = \\dfrac{|a_1a_2 + b_1b_2 + c_1c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}}\\).\n" +
        "- In vector form, for \\(\\vec{r} = \\vec{a_1} + \\lambda\\vec{b_1}\\) and \\(\\vec{r} = \\vec{a_2} + \\mu\\vec{b_2}\\): \\(\\cos\\theta = \\dfrac{|\\vec{b_1} \\cdot \\vec{b_2}|}{|\\vec{b_1}|\\,|\\vec{b_2}|}\\).\n" +
        "- With direction cosines: \\(\\cos\\theta = |l_1l_2 + m_1m_2 + n_1n_2|\\).\n" +
        "- Put both lines in standard form first, and do not use the points \\(\\vec{a_1}\\), \\(\\vec{a_2}\\) at all.\n" +
        "- Give the answer as \\(\\theta = \\cos^{-1}(\\ldots)\\) unless it is a standard angle.",
      formula: {
        label: "Acute angle between two lines",
        latex: "\\cos\\theta = \\dfrac{|a_1a_2 + b_1b_2 + c_1c_2|}{\\sqrt{a_1^2 + b_1^2 + c_1^2}\\,\\sqrt{a_2^2 + b_2^2 + c_2^2}} = \\dfrac{|\\vec{b_1} \\cdot \\vec{b_2}|}{|\\vec{b_1}|\\,|\\vec{b_2}|}",
        symbols: [
          { symbol: "\\(a_1, b_1, c_1\\)", meaning: "direction ratios of the first line" },
          { symbol: "\\(a_2, b_2, c_2\\)", meaning: "direction ratios of the second line" },
        ],
      },
      authoredExample: {
        prompt: "Find the angle between the lines \\(\\dfrac{x - 1}{2} = \\dfrac{y + 2}{-1} = \\dfrac{3 - z}{-2}\\) and \\(\\dfrac{x}{6} = \\dfrac{y - 1}{2} = \\dfrac{z + 5}{3}\\).",
        steps: [
          "\\(\\dfrac{3 - z}{-2} = \\dfrac{z - 3}{2}\\), so the first line has direction ratios \\(2, -1, 2\\).",
          "The second line has direction ratios \\(6, 2, 3\\).",
          "\\(a_1a_2 + b_1b_2 + c_1c_2 = 12 - 2 + 6 = 16\\).",
          "\\(\\sqrt{4 + 1 + 4} = 3\\) and \\(\\sqrt{36 + 4 + 9} = 7\\).",
          "\\(\\cos\\theta = \\dfrac{16}{3 \\times 7} = \\dfrac{16}{21}\\).",
          "\\(\\theta = \\cos^{-1}\\left(\\dfrac{16}{21}\\right)\\).",
        ],
        answer: "\\(\\theta = \\cos^{-1}\\left(\\dfrac{16}{21}\\right)\\)",
      },
      selfCheckExample: {
        prompt: "Find the angle between the lines \\(\\vec{r} = \\hat{i} + \\lambda(\\hat{i} + \\hat{j})\\) and \\(\\vec{r} = 2\\hat{j} + \\mu(\\hat{j} + \\hat{k})\\).",
        steps: [
          "\\(\\vec{b_1} \\cdot \\vec{b_2} = 0 + 1 + 0 = 1\\).",
          "\\(|\\vec{b_1}| = |\\vec{b_2}| = \\sqrt{2}\\).",
          "\\(\\cos\\theta = \\dfrac{1}{2}\\), so \\(\\theta = \\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(\\dfrac{\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the acute angle between lines with direction ratios \\(1, -2, 2\\) and \\(2, 2, -1\\).", answer: "\\(\\cos^{-1}\\left(\\dfrac{4}{9}\\right)\\)", method: "\\(|2 - 4 - 2| = 4\\), and the lengths are 3 and 3." },
        { prompt: "Find the angle between the lines \\(x = y = z\\) and \\(\\dfrac{x}{1} = \\dfrac{y}{-1} = \\dfrac{z}{0}\\).", answer: "\\(90^\\circ\\)" },
        { prompt: "Find the angle between the line \\(x - 1 = y = z\\) and the x-axis.", answer: "\\(\\cos^{-1}\\left(\\dfrac{1}{\\sqrt{3}}\\right)\\)" },
      ],
      pyqExampleId: "a7b840e1-70a5-4b62-845e-a40dbe4adf19",
      traps: [
        {
          title: "No modulus, an obtuse angle",
          body: "Without the modulus a negative dot product gives an obtuse angle. The angle between two lines is taken acute, so \\(\\cos\\theta = |l_1l_2 + m_1m_2 + n_1n_2|\\).",
        },
        {
          title: "Using the points",
          body: "The vectors \\(\\vec{a_1}\\) and \\(\\vec{a_2}\\) only place the lines. Putting them into the angle formula is a common slip in long vector equations.",
        },
        {
          title: "A numerator with the variable second",
          body: "In \\(\\dfrac{k - z}{c}\\) the direction ratio is \\(-c\\). A wrong sign changes the dot product and the angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-perpendicular",
      name: "Perpendicular lines, and finding an unknown",
      intuition:
        "Two lines are perpendicular when the angle between them is \\(90^\\circ\\), so its cosine is 0. The denominator of the angle formula is never zero, so the numerator must be: the sum of products of the direction ratios is zero. An unknown in the direction ratios is then found from one equation.",
      definition:
        "- Perpendicular: \\(a_1a_2 + b_1b_2 + c_1c_2 = 0\\), that is \\(\\vec{b_1} \\cdot \\vec{b_2} = 0\\).\n" +
        "- **Standard form first.** \\(\\dfrac{1 - x}{3} = \\dfrac{x - 1}{-3}\\); \\(\\dfrac{7y - 14}{2p} = \\dfrac{y - 2}{2p/7}\\).\n" +
        "- Lines written as \\(x = py + q\\), \\(z = ry + s\\) have direction ratios \\(p, 1, r\\). Two such lines are perpendicular when \\(pp' + 1 + rr' = 0\\).\n" +
        "- Three lines are mutually perpendicular when every pair is.\n" +
        "- An unknown that appears squared gives two values; keep both.",
      formula: {
        label: "Condition for perpendicular lines",
        latex: "a_1a_2 + b_1b_2 + c_1c_2 = 0 \\qquad \\vec{b_1} \\cdot \\vec{b_2} = 0",
      },
      authoredExample: {
        prompt: "Find the value of \\(k\\) for which the lines \\(\\dfrac{x - 2}{3} = \\dfrac{1 - y}{k} = \\dfrac{z + 1}{2}\\) and \\(\\dfrac{x + 1}{k} = \\dfrac{y - 3}{4} = \\dfrac{2z - 1}{6}\\) are perpendicular.",
        steps: [
          "\\(\\dfrac{1 - y}{k} = \\dfrac{y - 1}{-k}\\), so the first line has direction ratios \\(3, -k, 2\\).",
          "\\(\\dfrac{2z - 1}{6} = \\dfrac{z - \\frac{1}{2}}{3}\\), so the second line has direction ratios \\(k, 4, 3\\).",
          "Perpendicular: \\(3(k) + (-k)(4) + 2(3) = 0\\).",
          "\\(3k - 4k + 6 = 0\\), so \\(k = 6\\).",
        ],
        answer: "\\(k = 6\\)",
      },
      selfCheckExample: {
        prompt: "Show that the line through \\((0, 1, 2)\\) and \\((2, 3, 1)\\) is perpendicular to the line through \\((1, 0, 0)\\) and \\((2, -1, 0)\\).",
        steps: [
          "Direction ratios: \\(2, 2, -1\\) and \\(1, -1, 0\\).",
          "\\(2(1) + 2(-1) + (-1)(0) = 0\\).",
          "So the lines are perpendicular.",
        ],
        answer: "The sum of products is 0, so the lines are perpendicular.",
      },
      practiceSet: [
        { prompt: "Find \\(\\lambda\\) if lines with direction ratios \\(\\lambda, 2, -1\\) and \\(3, \\lambda, 4\\) are perpendicular.", answer: "\\(\\lambda = \\dfrac{4}{5}\\)", method: "\\(3\\lambda + 2\\lambda - 4 = 0\\)" },
        { prompt: "Find \\(p\\) if the line \\(\\dfrac{x}{p} = \\dfrac{y}{2} = \\dfrac{z}{3}\\) is perpendicular to \\(\\dfrac{x}{1} = \\dfrac{y}{-1} = \\dfrac{z}{p}\\).", answer: "\\(p = \\dfrac{1}{2}\\)", method: "\\(p - 2 + 3p = 0\\)" },
        { prompt: "Find \\(a\\) if lines with direction ratios \\(a, a, 1\\) and \\(a, -2, -3\\) are perpendicular.", answer: "\\(a = 3\\) or \\(a = -1\\)", method: "\\(a^2 - 2a - 3 = 0\\)" },
      ],
      pyqExampleId: "e5f9f941-9f34-41d8-af2e-f3db46bad57f",
      traps: [
        {
          title: "The sign hidden in the numerator",
          body: "A numerator written as (number minus variable) flips the sign of its denominator. Missing this changes the equation, and the value of the unknown comes out wrong.",
        },
        {
          title: "Forgetting the 1 for y",
          body: "In \\(x = py + q\\), \\(z = ry + s\\) the direction ratios are \\(p, 1, r\\). Perpendicular means \\(pp' + rr' = -1\\), not \\(+1\\); the 2026 assertion printed \\(+1\\) and was false.",
        },
        {
          title: "One root of a square",
          body: "When the unknown appears as a square, the equation has two roots. Both give perpendicular lines; write both.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmtg-parallel",
      name: "Parallel lines",
      intuition:
        "Parallel lines point the same way (or exactly the opposite way). So their direction ratios are proportional, one set a fixed multiple of the other, and the angle between them is 0. A zero dot product says the opposite: the lines are at right angles.",
      definition:
        "- Parallel: \\(\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}\\), that is \\(\\vec{b_2} = k\\vec{b_1}\\), or \\(\\vec{b_1} \\times \\vec{b_2} = \\vec{0}\\).\n" +
        "- **Not** \\(\\vec{b_1} \\cdot \\vec{b_2} = 0\\): that is the condition for perpendicular lines.\n" +
        "- If one ratio differs from the other two, the lines are not parallel.",
      formula: {
        label: "Condition for parallel lines",
        latex: "\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}",
      },
      authoredExample: {
        prompt: "Show that the line through \\((1, 0, 2)\\) and \\((4, 6, 5)\\) is parallel to the line \\(\\vec{r} = 5\\hat{i} - \\hat{j} + \\lambda(-2\\hat{i} - 4\\hat{j} - 2\\hat{k})\\).",
        steps: [
          "Direction ratios of the first line: \\(4 - 1, 6 - 0, 5 - 2\\), that is \\(3, 6, 3\\).",
          "Direction ratios of the second line: \\(-2, -4, -2\\).",
          "\\(\\dfrac{3}{-2} = \\dfrac{6}{-4} = \\dfrac{3}{-2} = -\\dfrac{3}{2}\\).",
          "All three ratios are equal, so the lines are parallel.",
        ],
        answer: "The direction ratios are proportional (common ratio \\(-\\dfrac{3}{2}\\)), so the lines are parallel.",
      },
      selfCheckExample: {
        prompt: "Are the lines \\(\\dfrac{x - 1}{2} = \\dfrac{y + 1}{3} = \\dfrac{z}{-1}\\) and \\(\\dfrac{x + 2}{4} = \\dfrac{y}{6} = \\dfrac{z - 3}{2}\\) parallel?",
        steps: [
          "\\(\\dfrac{2}{4} = \\dfrac{3}{6} = \\dfrac{1}{2}\\), but \\(\\dfrac{-1}{2} = -\\dfrac{1}{2}\\).",
          "The third ratio differs, so the lines are not parallel.",
        ],
        answer: "No: the third ratio has the opposite sign.",
      },
      practiceSet: [
        { prompt: "Lines with direction ratios \\(2, m, -3\\) and \\(6, 9, n\\) are parallel. Find \\(m\\) and \\(n\\).", answer: "\\(m = 3\\), \\(n = -9\\)" },
        { prompt: "Is a line with direction ratios \\(1, 2, 3\\) parallel or perpendicular to one with direction ratios \\(3, 0, -1\\)?", answer: "Perpendicular: \\(3 + 0 - 3 = 0\\). The ratios are not proportional, so it is not parallel." },
      ],
      pyqExampleId: "8df5cf19-70e8-49d5-9544-ffa89ad93fb9",
      traps: [
        {
          title: "Dot product zero means perpendicular",
          body: "A Reason that says lines are parallel when \\(\\vec{b_1} \\cdot \\vec{b_2} = 0\\) is false. Parallel needs proportional direction ratios.",
        },
        {
          title: "Opposite directions still parallel",
          body: "Direction ratios \\(3, -6, 9\\) and \\(-1, 2, -3\\) are proportional with a negative multiplier. The lines are parallel; a minus sign does not stop that.",
        },
      ],
    },
  ],
};
