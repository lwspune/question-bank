import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TG_COMPOUND_NOTE: SubtopicNote = {
  subtopicName: "Compound and Multiple Angles",
  title: "Compound and Multiple Angles",
  oneLineDefinition:
    "The formulas for sin, cos and tan of A ± B, the double, half and triple angle forms that follow from them, and the rules that turn products into sums.",
  whyItMatters:
    "28 questions in the bank, and 16 of them are MODERATE, the highest share of any page. They test two things: recalling the right formula (several simply ask which option equals sin(A + B) or tan of a half angle) and recognising a printed expression as one side of a formula, so that it collapses to a single value such as sin 30° or cos 90°.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctgcm-addition",
      name: "The addition and subtraction formulas",
      intuition:
        "sin(A + B) is not sin A + sin B. Each formula mixes the ratios of both angles, and once you have them you can reach angles off the table, such as 15° = 45° − 30° and 75° = 45° + 30°.",
      definition:
        "- \\(\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B\\): the sign inside matches the sign outside.\n" +
        "- \\(\\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B\\): the sign **flips**.\n" +
        "- \\(\\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}\\).\n" +
        "- Values worth remembering: \\(\\sin 15^\\circ = \\frac{\\sqrt{6} - \\sqrt{2}}{4}\\), \\(\\cos 15^\\circ = \\frac{\\sqrt{6} + \\sqrt{2}}{4}\\), \\(\\tan 15^\\circ = 2 - \\sqrt{3}\\), \\(\\tan 75^\\circ = 2 + \\sqrt{3}\\). sin 75° and cos 15° are equal (co-functions).\n" +
        "- **Fast route:** read the printed expression backwards. \\(\\sin 20^\\circ\\cos 25^\\circ + \\cos 20^\\circ\\sin 25^\\circ\\) is \\(\\sin 45^\\circ\\) at sight.\n" +
        "- If \\(A + B = 45^\\circ\\), then \\(\\tan A + \\tan B + \\tan A\\tan B = 1\\); if \\(A - B = 45^\\circ\\), then \\(\\tan A - \\tan B - \\tan A\\tan B = 1\\). Both come from \\(\\tan 45^\\circ = 1\\).",
      formula: {
        label: "Compound angles",
        latex:
          "\\sin(A \\pm B) = \\sin A\\cos B \\pm \\cos A\\sin B \\qquad \\cos(A \\pm B) = \\cos A\\cos B \\mp \\sin A\\sin B \\qquad \\tan(A \\pm B) = \\frac{\\tan A \\pm \\tan B}{1 \\mp \\tan A\\tan B}",
      },
      authoredExample: {
        prompt: "Find the exact value of \\(\\cos 105^\\circ\\).",
        steps: [
          "\\(105^\\circ = 60^\\circ + 45^\\circ\\), so \\(\\cos 105^\\circ = \\cos 60^\\circ\\cos 45^\\circ - \\sin 60^\\circ\\sin 45^\\circ\\).",
          "\\(= \\frac{1}{2} \\cdot \\frac{1}{\\sqrt{2}} - \\frac{\\sqrt{3}}{2} \\cdot \\frac{1}{\\sqrt{2}} = \\frac{1 - \\sqrt{3}}{2\\sqrt{2}} = \\frac{\\sqrt{2} - \\sqrt{6}}{4}\\).",
          "Check: \\(\\frac{1.414 - 2.449}{4} \\approx -0.259\\), negative as it should be in the second quadrant.",
        ],
        answer: "\\(\\frac{\\sqrt{2} - \\sqrt{6}}{4}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(\\cos 70^\\circ\\cos 10^\\circ + \\sin 70^\\circ\\sin 10^\\circ\\).",
        steps: ["This is \\(\\cos(70^\\circ - 10^\\circ) = \\cos 60^\\circ\\)."],
        answer: "\\(\\frac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "What is \\(\\sin 50^\\circ\\cos 40^\\circ + \\cos 50^\\circ\\sin 40^\\circ\\)?", answer: "\\(\\sin 90^\\circ = 1\\)" },
        { prompt: "What is \\(\\tan 75^\\circ\\)?", answer: "\\(2 + \\sqrt{3}\\)" },
        {
          prompt: "A and B are acute, \\(\\cos A = \\frac{8}{17}\\) and \\(\\cos B = \\frac{3}{5}\\). Find \\(\\cos(A + B)\\).",
          answer: "\\(\\frac{8}{17} \\cdot \\frac{3}{5} - \\frac{15}{17} \\cdot \\frac{4}{5} = -\\frac{36}{85}\\)",
        },
        {
          prompt: "Find \\(\\tan 40^\\circ + \\tan 5^\\circ + \\tan 40^\\circ\\tan 5^\\circ\\).",
          answer: "1, since \\(40^\\circ + 5^\\circ = 45^\\circ\\)",
        },
      ],
      pyqExampleId: "de911998-deab-4783-8cff-31515fea0627",
      traps: [
        {
          title: "Keeping the sign in cos(A + B)",
          body:
            "\\(\\cos(A + B) = \\cos A\\cos B - \\sin A\\sin B\\), with a minus. The plus version is \\(\\cos(A - B)\\), and SSC prints both as options.",
        },
        {
          title: "Splitting tan over a sum",
          body:
            "\\(\\tan(A + B)\\) is not \\(\\tan A + \\tan B\\). With A = B = 30°: \\(\\tan 60^\\circ = \\sqrt{3} \\approx 1.73\\), while \\(2\\tan 30^\\circ \\approx 1.15\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgcm-double",
      name: "Double, half and triple angle formulas",
      intuition:
        "Put B = A in the addition formulas and the double-angle forms drop out. Read them the other way and they halve an angle, which is how \\(1 - \\cos\\theta\\) and \\(1 + \\cos\\theta\\) turn into squares.",
      definition:
        "- \\(\\sin 2A = 2\\sin A\\cos A = \\frac{2\\tan A}{1 + \\tan^2 A}\\).\n" +
        "- \\(\\cos 2A = \\cos^2 A - \\sin^2 A = 1 - 2\\sin^2 A = 2\\cos^2 A - 1 = \\frac{1 - \\tan^2 A}{1 + \\tan^2 A}\\).\n" +
        "- So \\(1 - \\cos 2A = 2\\sin^2 A\\), \\(1 + \\cos 2A = 2\\cos^2 A\\), and \\(\\frac{1 - \\cos 2A}{1 + \\cos 2A} = \\tan^2 A\\).\n" +
        "- Half angle: \\(\\tan\\frac{A}{2} = \\frac{\\sin A}{1 + \\cos A} = \\frac{1 - \\cos A}{\\sin A} = \\sqrt{\\frac{1 - \\cos A}{1 + \\cos A}}\\) for an acute A.\n" +
        "- Triple angle: \\(\\sin 3A = 3\\sin A - 4\\sin^3 A\\) and \\(\\cos 3A = 4\\cos^3 A - 3\\cos A\\).\n" +
        "- Nested roots: \\(\\sqrt{2 + 2\\cos 2A} = 2\\cos A\\) when \\(\\cos A \\ge 0\\), so each square root halves the angle.\n" +
        "- \\((\\sin A + \\cos A)^2 = 1 + \\sin 2A\\), so a given sum of sin and cos gives sin 2A directly.\n" +
        "- **Fast route:** to choose between formula options, test A = 60°, where the double angle 120° and the half angle 30° are both known. Avoid A = 90°, where several half-angle forms all equal 1.",
      formula: {
        label: "Multiple angles",
        latex:
          "\\sin 2A = 2\\sin A\\cos A = \\frac{2\\tan A}{1 + \\tan^2 A} \\qquad \\cos 2A = 1 - 2\\sin^2 A = 2\\cos^2 A - 1 = \\frac{1 - \\tan^2 A}{1 + \\tan^2 A} \\qquad \\tan\\frac{A}{2} = \\frac{\\sin A}{1 + \\cos A} \\qquad \\sin 3A = 3\\sin A - 4\\sin^3 A \\qquad \\cos 3A = 4\\cos^3 A - 3\\cos A",
      },
      authoredExample: {
        prompt: "If \\(\\tan A = 2\\), find \\(\\sin 2A\\) and \\(\\cos 2A\\).",
        steps: [
          "\\(\\sin 2A = \\frac{2 \\times 2}{1 + 4} = \\frac{4}{5}\\).",
          "\\(\\cos 2A = \\frac{1 - 4}{1 + 4} = -\\frac{3}{5}\\).",
          "Check: \\(\\frac{16}{25} + \\frac{9}{25} = 1\\).",
        ],
        answer: "\\(\\sin 2A = \\frac{4}{5}\\), \\(\\cos 2A = -\\frac{3}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Find \\(4\\cos^3 20^\\circ - 3\\cos 20^\\circ\\).",
        steps: ["This is \\(\\cos 3A\\) with A = 20°, so it equals \\(\\cos 60^\\circ\\)."],
        answer: "\\(\\frac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "What is \\(2\\sin 15^\\circ\\cos 15^\\circ\\)?", answer: "\\(\\sin 30^\\circ = \\frac{1}{2}\\)" },
        { prompt: "What is \\(\\cos^2 22.5^\\circ - \\sin^2 22.5^\\circ\\)?", answer: "\\(\\cos 45^\\circ = \\frac{1}{\\sqrt{2}}\\)" },
        { prompt: "Simplify \\(\\frac{1 - \\cos 2A}{\\sin 2A}\\).", answer: "\\(\\frac{2\\sin^2 A}{2\\sin A\\cos A} = \\tan A\\)" },
        { prompt: "If \\(\\cos A = \\frac{1}{3}\\), find \\(\\cos 2A\\).", answer: "\\(2 \\times \\frac{1}{9} - 1 = -\\frac{7}{9}\\)" },
      ],
      pyqExampleId: "5515a827-62d6-4c7b-ad81-765019b9bfad",
      traps: [
        {
          title: "Doubling the ratio instead of the angle",
          body:
            "\\(\\sin 2A\\) is not \\(2\\sin A\\). At A = 60°, \\(\\sin 120^\\circ = \\frac{\\sqrt{3}}{2}\\) while \\(2\\sin 60^\\circ = \\sqrt{3}\\).",
        },
        {
          title: "Turning the half-angle fraction upside down",
          body:
            "\\(\\frac{\\sin A}{1 + \\cos A}\\) is \\(\\tan\\frac{A}{2}\\), but \\(\\frac{\\sin A}{1 - \\cos A}\\) is \\(\\cot\\frac{A}{2}\\). At A = 60° the first is \\(\\frac{1}{\\sqrt{3}}\\) and the second \\(\\sqrt{3}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctgcm-product",
      name: "Products and sums of sines and cosines",
      intuition:
        "Add or subtract the two addition formulas and the cross terms cancel, leaving a product equal to a sum. Read backwards, a sum of two sines or cosines becomes a product, which is what makes long sums factor.",
      definition:
        "- \\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\).\n" +
        "- \\(2\\cos A\\cos B = \\cos(A - B) + \\cos(A + B)\\).\n" +
        "- \\(2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B)\\).\n" +
        "- Backwards: \\(\\sin C + \\sin D = 2\\sin\\frac{C + D}{2}\\cos\\frac{C - D}{2}\\) and \\(\\cos C + \\cos D = 2\\cos\\frac{C + D}{2}\\cos\\frac{C - D}{2}\\).\n" +
        "- A product of a sum and a difference: \\(\\cos(A + B)\\cos(A - B) = \\cos^2 A - \\sin^2 B\\).\n" +
        "- **Fast route:** check a formula option at A = B. Then \\(\\sin A\\sin B = \\sin^2 A\\), and only the right option gives \\(\\frac{1}{2}(1 - \\cos 2A) = \\sin^2 A\\).",
      formula: {
        label: "Product and sum formulas",
        latex:
          "2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B) \\qquad 2\\cos A\\cos B = \\cos(A - B) + \\cos(A + B) \\qquad 2\\sin A\\cos B = \\sin(A + B) + \\sin(A - B) \\qquad \\sin C + \\sin D = 2\\sin\\tfrac{C + D}{2}\\cos\\tfrac{C - D}{2} \\qquad \\cos C + \\cos D = 2\\cos\\tfrac{C + D}{2}\\cos\\tfrac{C - D}{2}",
      },
      authoredExample: {
        prompt: "Find the value of \\(2\\sin 75^\\circ\\sin 15^\\circ\\).",
        steps: [
          "\\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\) with A = 75°, B = 15°.",
          "\\(= \\cos 60^\\circ - \\cos 90^\\circ = \\frac{1}{2} - 0 = \\frac{1}{2}\\).",
        ],
        answer: "\\(\\frac{1}{2}\\)",
      },
      selfCheckExample: {
        prompt: "Write \\(\\cos 3x + \\cos x\\) as a product.",
        steps: ["\\(\\cos C + \\cos D = 2\\cos\\frac{C + D}{2}\\cos\\frac{C - D}{2}\\) with C = 3x, D = x.", "\\(= 2\\cos 2x\\cos x\\)."],
        answer: "\\(2\\cos 2x\\cos x\\)",
      },
      practiceSet: [
        {
          prompt: "Find \\(2\\cos 45^\\circ\\cos 15^\\circ\\).",
          answer: "\\(\\cos 30^\\circ + \\cos 60^\\circ = \\frac{\\sqrt{3} + 1}{2}\\)",
        },
        { prompt: "Write \\(\\sin 50^\\circ + \\sin 10^\\circ\\) as a single cosine.", answer: "\\(2\\sin 30^\\circ\\cos 20^\\circ = \\cos 20^\\circ\\)" },
        { prompt: "Write \\(2\\sin 3A\\cos A\\) as a sum.", answer: "\\(\\sin 4A + \\sin 2A\\)" },
        {
          prompt: "Simplify \\(\\cos(45^\\circ + A)\\cos(45^\\circ - A)\\).",
          answer: "\\(\\cos^2 45^\\circ - \\sin^2 A = \\frac{1}{2} - \\sin^2 A = \\frac{1}{2}\\cos 2A\\)",
        },
      ],
      pyqExampleId: "98ab2eb9-0eb6-4118-b4a9-2d8f82a59b31",
      traps: [
        {
          title: "Reversing the order in 2 sin A sin B",
          body:
            "\\(2\\sin A\\sin B = \\cos(A - B) - \\cos(A + B)\\). Written the other way round, \\(\\cos(A + B) - \\cos(A - B)\\), it is the negative of the right answer, and that form is always offered.",
        },
      ],
    },
  ],
};
