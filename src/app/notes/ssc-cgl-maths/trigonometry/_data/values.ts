import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_VALUES_NOTE: SubtopicNote = {
  subtopicName: "Degree, Radian and Standard Values",
  title: "Degree, Radian and Standard Values",
  oneLineDefinition:
    "The six ratios of an angle, their exact values at 0°, 30°, 45°, 60° and 90°, and how to turn degrees into radians and back.",
  whyItMatters:
    "34 questions in the bank, 32 of them EASY. Nine ask you to move between degrees and radians, and eight of those nine are from 2025, so the conversion is a recent favourite. The rest are a line of arithmetic once the table is in your head: the cheapest marks in the chapter, provided the table comes out in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgva-ratios",
      name: "The six trigonometric ratios",
      intuition:
        "Pick one acute angle of a right triangle. Every ratio is a fraction of two of its sides, so there are six of them, and the last three are just the first three turned upside down.",
      definition:
        "Name the sides from the angle θ you are looking at:\n" +
        "- The **hypotenuse** is the longest side, opposite the right angle.\n" +
        "- The **opposite** side faces θ; the **adjacent** side touches θ and is not the hypotenuse.\n" +
        "- \\(\\sin\\theta = \\frac{\\text{opposite}}{\\text{hypotenuse}}\\), \\(\\cos\\theta = \\frac{\\text{adjacent}}{\\text{hypotenuse}}\\), \\(\\tan\\theta = \\frac{\\text{opposite}}{\\text{adjacent}}\\).\n" +
        "- The **reciprocals**: \\(\\text{cosec}\\,\\theta = \\frac{1}{\\sin\\theta}\\), \\(\\sec\\theta = \\frac{1}{\\cos\\theta}\\), \\(\\cot\\theta = \\frac{1}{\\tan\\theta}\\).\n" +
        "- Also \\(\\tan\\theta = \\frac{\\sin\\theta}{\\cos\\theta}\\) and \\(\\cot\\theta = \\frac{\\cos\\theta}{\\sin\\theta}\\).",
      formula: {
        label: "The six ratios",
        latex:
          "\\sin\\theta = \\frac{\\text{opp}}{\\text{hyp}} \\qquad \\cos\\theta = \\frac{\\text{adj}}{\\text{hyp}} \\qquad \\tan\\theta = \\frac{\\text{opp}}{\\text{adj}} = \\frac{\\sin\\theta}{\\cos\\theta} \\qquad \\text{cosec}\\,\\theta = \\frac{1}{\\sin\\theta} \\qquad \\sec\\theta = \\frac{1}{\\cos\\theta} \\qquad \\cot\\theta = \\frac{1}{\\tan\\theta}",
      },
      authoredExample: {
        prompt:
          "In a right triangle, the side opposite θ is 8, the side adjacent to θ is 6 and the hypotenuse is 10. Write all six ratios of θ.",
        steps: [
          "\\(\\sin\\theta = \\frac{8}{10} = \\frac{4}{5}\\), \\(\\cos\\theta = \\frac{6}{10} = \\frac{3}{5}\\), \\(\\tan\\theta = \\frac{8}{6} = \\frac{4}{3}\\).",
          "Turn each one over: \\(\\text{cosec}\\,\\theta = \\frac{5}{4}\\), \\(\\sec\\theta = \\frac{5}{3}\\), \\(\\cot\\theta = \\frac{3}{4}\\).",
          "Check: \\(\\frac{\\sin\\theta}{\\cos\\theta} = \\frac{4/5}{3/5} = \\frac{4}{3} = \\tan\\theta\\).",
        ],
        answer:
          "\\(\\frac{4}{5}, \\frac{3}{5}, \\frac{4}{3}, \\frac{5}{4}, \\frac{5}{3}, \\frac{3}{4}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(\\sin\\theta = 0.25\\), what is \\(\\text{cosec}\\,\\theta\\)?",
        steps: ["\\(\\text{cosec}\\,\\theta = \\frac{1}{\\sin\\theta} = \\frac{1}{0.25} = 4\\)."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "If \\(\\cos\\theta = \\frac{2}{3}\\), what is \\(\\sec\\theta\\)?", answer: "\\(\\frac{3}{2}\\)" },
        { prompt: "If \\(\\tan\\theta = 7\\), what is \\(\\cot\\theta\\)?", answer: "\\(\\frac{1}{7}\\)" },
        {
          prompt: "If \\(\\sin\\theta = 0.28\\) and \\(\\cos\\theta = 0.96\\), what is \\(\\tan\\theta\\)?",
          answer: "\\(\\frac{0.28}{0.96} = \\frac{7}{24}\\)",
        },
        { prompt: "What is \\(\\sin\\theta \\times \\text{cosec}\\,\\theta\\) for any angle where both are defined?", answer: "1" },
      ],
      traps: [
        {
          title: "Pairing cosec with cos",
          body:
            "The names mislead: \\(\\text{cosec}\\,\\theta\\) is \\(\\frac{1}{\\sin\\theta}\\) and \\(\\sec\\theta\\) is \\(\\frac{1}{\\cos\\theta}\\). Each 'co' ratio is the reciprocal of the ratio without 'co'.",
        },
        {
          title: "Turning tan the wrong way up",
          body:
            "\\(\\tan\\theta\\) is opposite over adjacent. Adjacent over opposite is \\(\\cot\\theta\\), and it is always one of the printed wrong options.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssctgva-table",
      name: "Values of the six ratios at 0°, 30°, 45°, 60° and 90°",
      intuition:
        "Five angles carry almost every SSC value question. The sine row climbs from 0 to 1, the cosine row is the same numbers read backwards, and the other four rows follow from those two.",
      definition:
        "A quick way to rebuild the sine row:\n" +
        "- Write \\(\\frac{\\sqrt{0}}{2}, \\frac{\\sqrt{1}}{2}, \\frac{\\sqrt{2}}{2}, \\frac{\\sqrt{3}}{2}, \\frac{\\sqrt{4}}{2}\\) for 0°, 30°, 45°, 60°, 90°. That is \\(0, \\frac{1}{2}, \\frac{1}{\\sqrt{2}}, \\frac{\\sqrt{3}}{2}, 1\\).\n" +
        "- **Cosine** is the sine row in reverse.\n" +
        "- **tan** is sine divided by cosine; cosec, sec and cot are the reciprocals.\n" +
        "- From 0° to 90° sine rises and cosine falls. They are equal only at 45°, so \\(\\sin\\theta < \\cos\\theta\\) below 45° and \\(\\sin\\theta > \\cos\\theta\\) above it.\n" +
        "- \\(\\sin^2 60^\\circ\\) means \\((\\sin 60^\\circ)^2 = \\frac{3}{4}\\): square the value, never the angle.",
      table: {
        columns: ["Ratio", "0°", "30°", "45°", "60°", "90°"],
        rows: [
          { cells: ["sin", "\\(0\\)", "\\(\\frac{1}{2}\\)", "\\(\\frac{1}{\\sqrt{2}}\\)", "\\(\\frac{\\sqrt{3}}{2}\\)", "\\(1\\)"] },
          { cells: ["cos", "\\(1\\)", "\\(\\frac{\\sqrt{3}}{2}\\)", "\\(\\frac{1}{\\sqrt{2}}\\)", "\\(\\frac{1}{2}\\)", "\\(0\\)"] },
          {
            cells: ["tan", "\\(0\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(1\\)", "\\(\\sqrt{3}\\)", "Not defined"],
            noteAmber: "tan 90° has no value, because cos 90° = 0 sits in the denominator.",
          },
          { cells: ["cosec", "Not defined", "\\(2\\)", "\\(\\sqrt{2}\\)", "\\(\\frac{2}{\\sqrt{3}}\\)", "\\(1\\)"] },
          { cells: ["sec", "\\(1\\)", "\\(\\frac{2}{\\sqrt{3}}\\)", "\\(\\sqrt{2}\\)", "\\(2\\)", "Not defined"] },
          { cells: ["cot", "Not defined", "\\(\\sqrt{3}\\)", "\\(1\\)", "\\(\\frac{1}{\\sqrt{3}}\\)", "\\(0\\)"] },
        ],
        caption: "Squares are friendlier: \\(\\sin^2\\) runs \\(0, \\frac{1}{4}, \\frac{1}{2}, \\frac{3}{4}, 1\\) and \\(\\tan^2\\) runs \\(0, \\frac{1}{3}, 1, 3\\).",
      },
      selfCheckExample: {
        prompt: "Find the value of \\(4\\sin^2 60^\\circ - 2\\tan^2 45^\\circ + \\sec 60^\\circ\\).",
        steps: [
          "\\(4 \\times \\frac{3}{4} = 3\\), \\(2 \\times 1 = 2\\), \\(\\sec 60^\\circ = 2\\).",
          "\\(3 - 2 + 2 = 3\\).",
        ],
        answer: "3",
      },
      practiceSet: [
        { prompt: "What is \\(\\sin 30^\\circ + \\cos 60^\\circ\\)?", answer: "1" },
        { prompt: "What is \\(\\tan^2 60^\\circ - \\sec^2 45^\\circ\\)?", answer: "\\(3 - 2 = 1\\)" },
        { prompt: "What is \\(\\cot 30^\\circ \\times \\tan 60^\\circ\\)?", answer: "\\(\\sqrt{3} \\times \\sqrt{3} = 3\\)" },
        { prompt: "What is \\(2\\sin 30^\\circ \\cos 30^\\circ\\)?", answer: "\\(\\frac{\\sqrt{3}}{2}\\)" },
      ],
      pyqExampleId: "bf07c069-1b0f-4cad-9fa4-a585857ae626",
      traps: [
        {
          title: "Swapping sin 60° and cos 60°",
          body:
            "\\(\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}\\) and \\(\\cos 60^\\circ = \\frac{1}{2}\\). The bigger angle has the bigger sine, which is a fast way to check you have not swapped them.",
        },
        {
          title: "Treating tan 90° as a number",
          body:
            "\\(\\tan 90^\\circ\\) and \\(\\sec 90^\\circ\\) are not defined, and neither are \\(\\cot 0^\\circ\\) and \\(\\text{cosec}\\,0^\\circ\\). An expression containing one of them has no value at that angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgva-angle",
      name: "Reading the angle from a value",
      intuition:
        "The table also works backwards: a value such as \\(\\frac{1}{2}\\) for sine names the angle 30°. Once each bracket is a known angle, a pair of equations is just two lines of arithmetic.",
      definition:
        "- Match the value to the table in the **ratio that is given**: \\(\\sec\\theta = 2\\) means \\(\\cos\\theta = \\frac{1}{2}\\), so \\(\\theta = 60^\\circ\\).\n" +
        "- A bracket is one angle: \\(\\cos(x + 10^\\circ) = \\frac{1}{2}\\) gives \\(x + 10^\\circ = 60^\\circ\\).\n" +
        "- Two equations in \\(A + B\\) and \\(A - B\\): read both angles, then add and halve for A, subtract and halve for B.\n" +
        "- The table answer is the acute one. SSC states 'acute' or a range such as \\(0^\\circ < \\theta < 90^\\circ\\) for exactly this reason.",
      authoredExample: {
        prompt:
          "If \\(\\tan(A + B) = \\sqrt{3}\\) and \\(\\tan(A - B) = \\frac{1}{\\sqrt{3}}\\), where \\(A + B\\) is acute and \\(A > B\\), find A and B.",
        steps: [
          "\\(\\tan(A + B) = \\sqrt{3}\\) gives \\(A + B = 60^\\circ\\).",
          "\\(\\tan(A - B) = \\frac{1}{\\sqrt{3}}\\) gives \\(A - B = 30^\\circ\\).",
          "Adding: \\(2A = 90^\\circ\\), so \\(A = 45^\\circ\\). Then \\(B = 60^\\circ - 45^\\circ = 15^\\circ\\).",
        ],
        answer: "\\(A = 45^\\circ\\), \\(B = 15^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "If \\(2\\cos\\theta = \\sqrt{3}\\) and θ is acute, find \\(\\sin 2\\theta\\).",
        steps: [
          "\\(\\cos\\theta = \\frac{\\sqrt{3}}{2}\\), so \\(\\theta = 30^\\circ\\) and \\(2\\theta = 60^\\circ\\).",
          "\\(\\sin 60^\\circ = \\frac{\\sqrt{3}}{2}\\).",
        ],
        answer: "\\(\\frac{\\sqrt{3}}{2}\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\sin\\theta = \\frac{1}{\\sqrt{2}}\\) and θ is acute, what is θ?", answer: "\\(45^\\circ\\)" },
        { prompt: "If \\(\\sec\\theta = 2\\) and θ is acute, what is θ?", answer: "\\(60^\\circ\\)" },
        {
          prompt: "If \\(\\cos(x + 10^\\circ) = \\frac{1}{2}\\) and \\(x + 10^\\circ\\) is acute, find x.",
          answer: "\\(x + 10^\\circ = 60^\\circ\\), so \\(x = 50^\\circ\\)",
        },
        { prompt: "If \\(\\tan 3\\theta = 1\\) and \\(3\\theta\\) is acute, find θ.", answer: "\\(15^\\circ\\)" },
      ],
      pyqExampleId: "80f55e86-ba23-4181-bcea-d5564c7a4858",
      traps: [
        {
          title: "Reading the angle off the wrong row",
          body:
            "\\(\\sec\\theta = 2\\) is 60°, not 30°: sec 30° is \\(\\frac{2}{\\sqrt{3}}\\). Change a reciprocal ratio back to sin, cos or tan before you look the value up.",
        },
        {
          title: "Taking the angle as the answer",
          body:
            "When the question asks for an expression such as \\(\\sin A + \\cos 2A\\), the angle is only the middle step. An option that prints the angle itself is a trap: put the values back in before you choose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgva-radian",
      name: "Converting degrees and radians",
      intuition:
        "A half turn is 180° and also π radians, so the two units differ by one fixed factor. Multiply by \\(\\frac{180}{\\pi}\\) to reach degrees and by \\(\\frac{\\pi}{180}\\) to reach radians.",
      definition:
        "- \\(\\pi \\text{ rad} = 180^\\circ\\), so \\(1 \\text{ rad} = \\frac{180^\\circ}{\\pi} \\approx 57.3^\\circ\\).\n" +
        "- Radians to degrees: multiply by \\(\\frac{180}{\\pi}\\). With π in the angle, just put 180° in place of π: \\(\\frac{3\\pi}{4} = \\frac{3 \\times 180^\\circ}{4} = 135^\\circ\\).\n" +
        "- Degrees to radians: multiply by \\(\\frac{\\pi}{180}\\) and cancel: \\(45^\\circ = \\frac{\\pi}{4}\\).\n" +
        "- A plain number of radians (0.5, 1.5, 2.5) needs \\(\\pi \\approx 3.14159\\): \\(1.5 \\text{ rad} \\approx 85.94^\\circ\\), not 90°.\n" +
        "- A clock's **minute hand** turns 360° in 60 minutes, so 6° a minute. The hour hand turns 0.5° a minute.",
      formula: {
        label: "Degree and radian conversion",
        latex:
          "\\theta_{\\text{deg}} = \\theta_{\\text{rad}} \\times \\frac{180^\\circ}{\\pi} \\qquad \\theta_{\\text{rad}} = \\theta_{\\text{deg}} \\times \\frac{\\pi}{180^\\circ}",
      },
      authoredExample: {
        prompt: "Convert \\(\\frac{7\\pi}{6}\\) radians to degrees and \\(315^\\circ\\) to radians.",
        steps: [
          "\\(\\frac{7\\pi}{6} = \\frac{7 \\times 180^\\circ}{6} = 210^\\circ\\).",
          "\\(315 \\times \\frac{\\pi}{180} = \\frac{315\\pi}{180} = \\frac{7\\pi}{4}\\) (divide 315 and 180 by 45).",
        ],
        answer: "\\(210^\\circ\\) and \\(\\frac{7\\pi}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Convert 2 radians to degrees, correct to two decimal places.",
        steps: ["\\(2 \\times \\frac{180^\\circ}{\\pi} = \\frac{360^\\circ}{3.14159} \\approx 114.59^\\circ\\)."],
        answer: "\\(114.59^\\circ\\)",
      },
      practiceSet: [
        { prompt: "Convert \\(\\frac{5\\pi}{6}\\) radians to degrees.", answer: "\\(150^\\circ\\)" },
        { prompt: "Convert \\(40^\\circ\\) to radians.", answer: "\\(\\frac{2\\pi}{9}\\)" },
        {
          prompt: "Through what angle, in radians, does the minute hand of a clock turn in 20 minutes?",
          answer: "\\(20 \\times 6^\\circ = 120^\\circ = \\frac{2\\pi}{3}\\)",
        },
        { prompt: "Convert \\(\\frac{\\pi}{12}\\) radians to degrees.", answer: "\\(15^\\circ\\)" },
      ],
      pyqExampleId: "b2429ae9-2c28-49c5-a4e4-be090c642e5a",
      traps: [
        {
          title: "Multiplying by the wrong factor",
          body:
            "To reach degrees multiply by \\(\\frac{180}{\\pi}\\); to reach radians multiply by \\(\\frac{\\pi}{180}\\). A quick check: degrees should come out as the bigger number, since 1 radian is about 57°.",
        },
        {
          title: "Rounding 1 radian to 60°",
          body:
            "1 radian is about 57.3°, so 1.5 rad is about 85.9° and 2.5 rad about 143.2°. Using 60° per radian lands on a printed wrong option such as 90° or 150°.",
        },
      ],
    },
  ],
};
