import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_TF_APPLICATIONS_NOTE: SubtopicNote = {
  subtopicName: "Applications of Sine, Cosine and Projection Rules",
  title: "Half-Angle Formulae, Heron's Formula, Napier's Analogy and Proofs",
  oneLineDefinition:
    "The sine, cosine and projection rules give the half-angle formulae in terms of the semi-perimeter s, Heron's formula for the area, Napier's analogy, and the proofs of identities in a triangle.",
  whyItMatters:
    "37 questions. Nine were set in board papers: half-angle values in the triangles with sides 13, 14, 15 (2017, 2025) and 18, 24, 30 (2024), prove the formula for sin(A/2) (2020), prove sin((B − C)/2) = ((b − c)/a) cos(A/2) (2019), prove (a − b)² cos²(C/2) + (a + b)² sin²(C/2) = c² (2016, 2019), prove cos A/a + cos B/b + cos C/c = (a² + b² + c²)/2abc (2024), and the ratio of the sides when A = 45° and B = 60° (2026). The textbook adds Heron's formula, Napier's analogy and longer proofs.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmtf-half-angle",
      name: "Half-angle formulae and Heron's formula",
      intuition:
        "When you know only the three sides, the half-angles come out neatly in terms of the semi-perimeter \\(s\\). The cosine rule gives \\(\\cos A\\), and \\(1 - \\cos A\\) and \\(1 + \\cos A\\) each factorise as a difference of two squares, which is where \\(s - a\\), \\(s - b\\), \\(s - c\\) come from.",
      definition:
        "- With \\(2s = a + b + c\\): \\(\\sin\\dfrac{A}{2} = \\sqrt{\\dfrac{(s - b)(s - c)}{bc}}\\), \\(\\cos\\dfrac{A}{2} = \\sqrt{\\dfrac{s(s - a)}{bc}}\\), \\(\\tan\\dfrac{A}{2} = \\sqrt{\\dfrac{(s - b)(s - c)}{s(s - a)}}\\). Change the letters in order for \\(B\\) and \\(C\\).\n" +
        "- **Proof of the sine formula, step 1:** \\(2\\sin^2\\dfrac{A}{2} = 1 - \\cos A = 1 - \\dfrac{b^2 + c^2 - a^2}{2bc}\\) (cosine rule).\n" +
        "- **Step 2:** \\(= \\dfrac{a^2 - (b - c)^2}{2bc} = \\dfrac{(a - b + c)(a + b - c)}{2bc}\\).\n" +
        "- **Step 3:** \\(a - b + c = 2(s - b)\\) and \\(a + b - c = 2(s - c)\\), so \\(\\sin^2\\dfrac{A}{2} = \\dfrac{(s - b)(s - c)}{bc}\\).\n" +
        "- **Step 4:** \\(\\dfrac{A}{2}\\) is acute, so take the positive square root.\n" +
        "- For \\(\\cos\\dfrac{A}{2}\\), start from \\(1 + \\cos A = 2\\cos^2\\dfrac{A}{2}\\) and factorise \\((b + c)^2 - a^2\\). Then \\(\\tan\\dfrac{A}{2}\\) is the sine divided by the cosine.\n" +
        "- **Heron's formula:** \\(A(\\triangle ABC) = \\sqrt{s(s - a)(s - b)(s - c)}\\). Proof: \\(A(\\triangle ABC) = \\dfrac{1}{2}ab\\sin C = ab\\sin\\dfrac{C}{2}\\cos\\dfrac{C}{2}\\); put in the half-angle formulae.",
      formula: {
        label: "Half-angle formulae and area",
        latex:
          "\\sin\\frac{A}{2} = \\sqrt{\\frac{(s-b)(s-c)}{bc}}, \\quad \\cos\\frac{A}{2} = \\sqrt{\\frac{s(s-a)}{bc}}, \\quad \\tan\\frac{A}{2} = \\sqrt{\\frac{(s-b)(s-c)}{s(s-a)}}, \\quad A(\\triangle ABC) = \\sqrt{s(s-a)(s-b)(s-c)}",
        symbols: [{ symbol: "\\(s\\)", meaning: "the semi-perimeter, half of a + b + c" }],
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 7\\), \\(b = 8\\) and \\(c = 9\\). Find \\(\\cos\\dfrac{A}{2}\\), \\(\\tan\\dfrac{A}{2}\\) and the area of the triangle.",
        steps: [
          "\\(s = \\dfrac{7 + 8 + 9}{2} = 12\\), so \\(s - a = 5\\), \\(s - b = 4\\), \\(s - c = 3\\).",
          "\\(\\cos\\dfrac{A}{2} = \\sqrt{\\dfrac{s(s - a)}{bc}} = \\sqrt{\\dfrac{12 \\times 5}{8 \\times 9}} = \\sqrt{\\dfrac{60}{72}} = \\sqrt{\\dfrac{5}{6}}\\).",
          "\\(\\tan\\dfrac{A}{2} = \\sqrt{\\dfrac{(s - b)(s - c)}{s(s - a)}} = \\sqrt{\\dfrac{4 \\times 3}{12 \\times 5}} = \\sqrt{\\dfrac{1}{5}} = \\dfrac{1}{\\sqrt{5}}\\).",
          "\\(A(\\triangle ABC) = \\sqrt{12 \\times 5 \\times 4 \\times 3} = \\sqrt{720} = 12\\sqrt{5}\\).",
          "Check: \\(\\cos A = \\dfrac{64 + 81 - 49}{144} = \\dfrac{2}{3}\\), \\(\\sin A = \\dfrac{\\sqrt{5}}{3}\\), and \\(\\dfrac{1}{2}bc\\sin A = 36 \\times \\dfrac{\\sqrt{5}}{3} = 12\\sqrt{5}\\).",
        ],
        answer: "\\(\\cos\\dfrac{A}{2} = \\sqrt{\\dfrac{5}{6}}\\), \\(\\tan\\dfrac{A}{2} = \\dfrac{1}{\\sqrt{5}}\\), area \\(= 12\\sqrt{5}\\) square units",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 5\\), \\(b = 6\\) and \\(c = 7\\). Find \\(\\sin\\dfrac{C}{2}\\).",
        steps: [
          "\\(s = 9\\), \\(s - a = 4\\), \\(s - b = 3\\).",
          "\\(\\sin\\dfrac{C}{2} = \\sqrt{\\dfrac{(s - a)(s - b)}{ab}} = \\sqrt{\\dfrac{12}{30}} = \\sqrt{\\dfrac{2}{5}}\\).",
        ],
        answer: "\\(\\sin\\dfrac{C}{2} = \\sqrt{\\dfrac{2}{5}}\\)",
      },
      practiceSet: [
        { prompt: "The sides of a triangle are 3, 4 and 5. Find its area by Heron's formula.", answer: "\\(s = 6\\); area \\(= \\sqrt{6 \\times 3 \\times 2 \\times 1} = 6\\) square units" },
        { prompt: "Write \\(\\cos\\dfrac{B}{2}\\) in terms of the sides.", answer: "\\(\\cos\\dfrac{B}{2} = \\sqrt{\\dfrac{s(s - b)}{ca}}\\)" },
        { prompt: "In \\(\\triangle ABC\\), \\(a = 5\\), \\(b = 6\\) and \\(c = 7\\). Find \\(\\tan\\dfrac{A}{2}\\).", answer: "\\(\\sqrt{\\dfrac{3 \\times 2}{9 \\times 4}} = \\dfrac{1}{\\sqrt{6}}\\)" },
      ],
      pyqExampleId: "751f8ba9-e4cc-4254-b4b5-ab39f2b577d2",
      traps: [
        {
          title: "Mixing up the letters",
          body: "\\(\\sin\\dfrac{A}{2}\\) has the two sides that meet at \\(A\\) (\\(b\\) and \\(c\\)) below, and \\((s - b)(s - c)\\) above. \\(\\cos\\dfrac{A}{2}\\) has \\(s(s - a)\\) above.",
        },
        {
          title: "Skipping the s lines",
          body: "Write \\(s\\), \\(s - a\\), \\(s - b\\) and \\(s - c\\) on separate lines before using a formula. These lines carry marks, and they catch an arithmetic slip early.",
        },
        {
          title: "A negative root for a half-angle",
          body: "\\(\\dfrac{A}{2}\\) lies between \\(0\\) and \\(\\dfrac{\\pi}{2}\\), so every half-angle ratio is positive. Say so when you take the square root in a proof.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-napier",
      name: "Napier's analogy and half-angle ratios of the sides",
      intuition:
        "Replace each side by \\(2R\\) times the sine of its angle and the \\(2R\\) cancels. A sum or difference of two sines becomes a product of half-angle ratios, and since \\(B + C = \\pi - A\\), the half-angle \\(\\dfrac{B + C}{2}\\) turns into \\(\\dfrac{\\pi}{2} - \\dfrac{A}{2}\\).",
      definition:
        "- **Napier's analogy:** \\(\\tan\\dfrac{B - C}{2} = \\dfrac{b - c}{b + c}\\cot\\dfrac{A}{2}\\). In the same way \\(\\tan\\dfrac{C - A}{2} = \\dfrac{c - a}{c + a}\\cot\\dfrac{B}{2}\\) and \\(\\tan\\dfrac{A - B}{2} = \\dfrac{a - b}{a + b}\\cot\\dfrac{C}{2}\\).\n" +
        "- **Proof outline (textbook):** by the sine rule, \\(\\dfrac{b - c}{b + c} = \\dfrac{\\sin B - \\sin C}{\\sin B + \\sin C}\\).\n" +
        "- \\(= \\dfrac{2\\cos\\frac{B + C}{2}\\sin\\frac{B - C}{2}}{2\\sin\\frac{B + C}{2}\\cos\\frac{B - C}{2}} = \\cot\\dfrac{B + C}{2}\\tan\\dfrac{B - C}{2}\\).\n" +
        "- \\(\\dfrac{B + C}{2} = \\dfrac{\\pi}{2} - \\dfrac{A}{2}\\), so \\(\\cot\\dfrac{B + C}{2} = \\tan\\dfrac{A}{2}\\). Rearrange to get the result.\n" +
        "- The same steps prove \\(\\sin\\dfrac{B - C}{2} = \\dfrac{b - c}{a}\\cos\\dfrac{A}{2}\\) and \\(\\cos\\dfrac{A - B}{2} = \\dfrac{a + b}{c}\\sin\\dfrac{C}{2}\\); there write \\(\\sin A = 2\\sin\\dfrac{A}{2}\\cos\\dfrac{A}{2}\\).\n" +
        "- Use Napier's analogy to find the other two angles when two sides and the angle between them are known.",
      formula: {
        label: "Napier's analogy",
        latex: "\\tan\\frac{B - C}{2} = \\frac{b - c}{b + c}\\cot\\frac{A}{2}",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(b = 2 + \\sqrt{3}\\), \\(c = 1\\) and \\(A = 90^\\circ\\). Find \\(B\\) and \\(C\\) using Napier's analogy.",
        steps: [
          "Given: \\(b - c = 1 + \\sqrt{3}\\), \\(b + c = 3 + \\sqrt{3} = \\sqrt{3}(\\sqrt{3} + 1)\\), \\(\\cot\\dfrac{A}{2} = \\cot 45^\\circ = 1\\).",
          "Formula: \\(\\tan\\dfrac{B - C}{2} = \\dfrac{b - c}{b + c}\\cot\\dfrac{A}{2}\\).",
          "\\(\\tan\\dfrac{B - C}{2} = \\dfrac{1 + \\sqrt{3}}{\\sqrt{3}(1 + \\sqrt{3})} \\times 1 = \\dfrac{1}{\\sqrt{3}}\\), so \\(\\dfrac{B - C}{2} = 30^\\circ\\) and \\(B - C = 60^\\circ\\).",
          "Also \\(B + C = 180^\\circ - 90^\\circ = 90^\\circ\\).",
          "Adding: \\(2B = 150^\\circ\\), so \\(B = 75^\\circ\\) and \\(C = 15^\\circ\\).",
        ],
        answer: "\\(B = 75^\\circ\\) and \\(C = 15^\\circ\\)",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a = 3\\), \\(b = 1\\) and \\(C = 60^\\circ\\). Find \\(\\tan\\dfrac{A - B}{2}\\).",
        steps: ["\\(\\tan\\dfrac{A - B}{2} = \\dfrac{a - b}{a + b}\\cot\\dfrac{C}{2} = \\dfrac{2}{4}\\cot 30^\\circ = \\dfrac{1}{2} \\times \\sqrt{3}\\)."],
        answer: "\\(\\tan\\dfrac{A - B}{2} = \\dfrac{\\sqrt{3}}{2}\\)",
      },
      practiceSet: [
        { prompt: "State Napier's analogy for \\(\\tan\\dfrac{A - B}{2}\\).", answer: "\\(\\tan\\dfrac{A - B}{2} = \\dfrac{a - b}{a + b}\\cot\\dfrac{C}{2}\\)" },
        { prompt: "In \\(\\triangle ABC\\), \\(b = c\\). What does Napier's analogy give for \\(B\\) and \\(C\\)?", answer: "\\(\\tan\\dfrac{B - C}{2} = 0\\), so \\(B = C\\)" },
        { prompt: "In any triangle, write \\(\\cos\\dfrac{B + C}{2}\\) in terms of \\(A\\).", answer: "\\(\\sin\\dfrac{A}{2}\\), since \\(\\dfrac{B + C}{2} = \\dfrac{\\pi}{2} - \\dfrac{A}{2}\\)" },
      ],
      pyqExampleId: "5be709ef-3006-4c06-9178-e71cb7c677e8",
      traps: [
        {
          title: "Mixing the letters",
          body: "\\(B - C\\) goes with \\(b - c\\), \\(b + c\\) and the third angle \\(A\\). Taking \\(\\cot\\dfrac{B}{2}\\) by mistake gives a wrong result with no warning.",
        },
        {
          title: "cot of (B + C)/2 is not cot(A/2)",
          body: "\\(\\dfrac{B + C}{2} = \\dfrac{\\pi}{2} - \\dfrac{A}{2}\\), so \\(\\cot\\dfrac{B + C}{2} = \\tan\\dfrac{A}{2}\\). Write this step in full; it is the key line of the proof.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-sine-proofs",
      name: "Proofs with a = 2R sin A and the angle sum",
      intuition:
        "Many identities mix sides and angles. Turn every side into \\(2R\\) times a sine and the identity becomes pure trigonometry in \\(A\\), \\(B\\), \\(C\\). Then \\(A + B + C = \\pi\\) does the rest: \\(\\sin(A + B) = \\sin C\\) and \\(\\cos(A + B) = -\\cos C\\).",
      definition:
        "- Replace \\(a\\), \\(b\\), \\(c\\) by \\(2R\\sin A\\), \\(2R\\sin B\\), \\(2R\\sin C\\) (or \\(k\\sin A\\), and so on).\n" +
        "- Use \\(A + B + C = \\pi\\): \\(\\sin(A + B) = \\sin C\\), \\(\\cos(A + B) = -\\cos C\\), \\(\\sin\\dfrac{A + B}{2} = \\cos\\dfrac{C}{2}\\).\n" +
        "- Useful identity: \\(\\sin^2 A - \\sin^2 B = \\sin(A + B)\\sin(A - B)\\).\n" +
        "- **Ratio of sides from angles:** find the third angle, then \\(a : b : c = \\sin A : \\sin B : \\sin C\\), and clear the fractions.\n" +
        "- **Type of triangle from a condition:** change the condition into sides (or into angles) and read it: \\(a = b\\) means isosceles, \\(a^2 + b^2 = c^2\\) means right angled at \\(C\\).",
      formula: {
        label: "Sides through the circumradius",
        latex: "a = 2R\\sin A, \\quad b = 2R\\sin B, \\quad c = 2R\\sin C, \\qquad A + B + C = \\pi",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), \\(A = 2B\\). Prove that \\(a = 2b\\cos B\\).",
        steps: [
          "By the sine rule, \\(a = 2R\\sin A\\) and \\(b = 2R\\sin B\\).",
          "Given \\(A = 2B\\): \\(a = 2R\\sin 2B = 2R(2\\sin B\\cos B)\\).",
          "\\(= 2(2R\\sin B)\\cos B = 2b\\cos B\\).",
        ],
        answer: "Hence proved: \\(a = 2b\\cos B\\)",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), \\(a\\sin A = b\\sin B\\). What kind of triangle is it?",
        steps: ["\\(\\sin A = \\dfrac{a}{2R}\\), \\(\\sin B = \\dfrac{b}{2R}\\), so \\(\\dfrac{a^2}{2R} = \\dfrac{b^2}{2R}\\).", "\\(a^2 = b^2\\), so \\(a = b\\)."],
        answer: "Isosceles, with \\(a = b\\)",
      },
      practiceSet: [
        { prompt: "In \\(\\triangle ABC\\), prove that \\(\\dfrac{a - b}{c} = \\dfrac{\\sin A - \\sin B}{\\sin C}\\).", answer: "Write each side as \\(2R\\) times its sine; the \\(2R\\) cancels" },
        { prompt: "In \\(\\triangle ABC\\), write \\(\\sin(B + C)\\) and \\(\\cos(B + C)\\) in terms of \\(A\\).", answer: "\\(\\sin(B + C) = \\sin A\\) and \\(\\cos(B + C) = -\\cos A\\)" },
        { prompt: "In \\(\\triangle ABC\\), \\(\\sin^2 A = \\sin^2 B + \\sin^2 C\\). Which angle is a right angle?", answer: "\\(A\\), since the condition becomes \\(a^2 = b^2 + c^2\\)" },
      ],
      pyqExampleId: "76a27d1e-8b6c-4ae7-a776-1ff5d51c14e3",
      traps: [
        {
          title: "Finding the ratio with two angles",
          body: "\\(a : b : c = \\sin A : \\sin B : \\sin C\\) needs all three angles. Find the third from \\(A + B + C = 180^\\circ\\) first, and write that line.",
        },
        {
          title: "Proving by trying one triangle",
          body: "Checking an identity in an equilateral or a right triangle tests it but never proves it. Work with general \\(A\\), \\(B\\), \\(C\\).",
        },
        {
          title: "The sign of cos(A + B)",
          body: "In a triangle \\(\\sin(A + B) = \\sin C\\), but \\(\\cos(A + B) = -\\cos C\\). Only the cosine changes sign.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmtf-cosine-proofs",
      name: "Proofs with the cosine rule and the projection rule",
      intuition:
        "When an identity has cosines of the angles with sides around them, write each cosine as a fraction of sides and the whole thing becomes algebra. When it has pieces like \\(a\\cos C + c\\cos A\\), the projection rule turns each piece into a single side.",
      definition:
        "- Replace each cosine by its side form, \\(\\cos A = \\dfrac{b^2 + c^2 - a^2}{2bc}\\), and bring all terms over one denominator such as \\(2abc\\).\n" +
        "- Or multiply out: \\(2bc\\cos A = b^2 + c^2 - a^2\\), \\(2ca\\cos B = c^2 + a^2 - b^2\\), \\(2ab\\cos C = a^2 + b^2 - c^2\\).\n" +
        "- Look for projection pairs, such as \\(a\\cos C + c\\cos A = b\\), and rewrites like \\(c - b\\cos A = a\\cos B\\).\n" +
        "- Half-angle squares: \\(\\cos^2\\dfrac{C}{2} = \\dfrac{1 + \\cos C}{2}\\), \\(\\sin^2\\dfrac{C}{2} = \\dfrac{1 - \\cos C}{2}\\), and \\(\\cos^2\\dfrac{C}{2} - \\sin^2\\dfrac{C}{2} = \\cos C\\).\n" +
        "- Work on one side (the longer one) until it becomes the other side, and end with \"Hence proved\".",
      formula: {
        label: "Cosine rule, multiplied out",
        latex: "2bc\\cos A = b^2 + c^2 - a^2, \\quad 2ca\\cos B = c^2 + a^2 - b^2, \\quad 2ab\\cos C = a^2 + b^2 - c^2",
      },
      authoredExample: {
        prompt: "In \\(\\triangle ABC\\), prove that \\(2\\left(b\\cos^2\\dfrac{C}{2} + c\\cos^2\\dfrac{B}{2}\\right) = a + b + c\\).",
        steps: [
          "L.H.S. \\(= 2b\\cos^2\\dfrac{C}{2} + 2c\\cos^2\\dfrac{B}{2}\\).",
          "Using \\(2\\cos^2\\dfrac{\\theta}{2} = 1 + \\cos\\theta\\): \\(= b(1 + \\cos C) + c(1 + \\cos B)\\).",
          "\\(= b + c + (b\\cos C + c\\cos B)\\).",
          "By the projection rule, \\(b\\cos C + c\\cos B = a\\).",
          "\\(\\therefore\\) L.H.S. \\(= a + b + c = \\) R.H.S.",
        ],
        answer: "Hence proved",
      },
      selfCheckExample: {
        prompt: "In \\(\\triangle ABC\\), prove that \\(ab\\cos C + bc\\cos A = b^2\\).",
        steps: [
          "\\(ab\\cos C = \\dfrac{a^2 + b^2 - c^2}{2}\\) and \\(bc\\cos A = \\dfrac{b^2 + c^2 - a^2}{2}\\).",
          "Adding: \\(\\dfrac{2b^2}{2} = b^2\\).",
        ],
        answer: "Hence proved",
      },
      practiceSet: [
        { prompt: "Write \\(ca\\cos B\\) in terms of the sides.", answer: "\\(\\dfrac{c^2 + a^2 - b^2}{2}\\)" },
        { prompt: "Simplify \\(\\cos^2\\dfrac{A}{2} - \\sin^2\\dfrac{A}{2}\\).", answer: "\\(\\cos A\\)" },
        { prompt: "Using the projection rule, write \\(b - c\\cos A\\) as a single term.", answer: "\\(a\\cos C\\)" },
      ],
      pyqExampleId: "438cc87b-26d7-4b76-b095-856f87ff29e8",
      traps: [
        {
          title: "Working on both sides at once",
          body: "Start from one side, usually the longer one, and reach the other. That is how the textbook writes every proof, and it keeps each step easy for the examiner to follow.",
        },
        {
          title: "Taking the difference of the squares as 1",
          body: "\\(\\cos^2\\dfrac{C}{2} + \\sin^2\\dfrac{C}{2} = 1\\), but \\(\\cos^2\\dfrac{C}{2} - \\sin^2\\dfrac{C}{2} = \\cos C\\). Mixing them up is the commonest slip in these proofs.",
        },
      ],
    },
  ],
};
