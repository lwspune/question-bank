import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Mathematics (Part I), Ch. 3 Trigonometric Functions. Definitions
 * are the Balbharati text's own, trimmed; every formula re-derived or checked
 * on a past-paper value; most-asked years from the 50 board past-paper
 * questions in the bank, 2015-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Mathematics",
  subjectRoute: "mathematics",
  chapterName: "Trigonometric Functions",
  chapterSlug: "trigonometric-functions",
  source: "Balbharati Mathematics and Statistics Part I Std XII (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Solutions of a trigonometric equation",
      text: "Because of periodicity of trigonometric functions, a trigonometric equation may have infinite number of solutions. Some have none: \\(\\sin\\theta = 3\\) has no solution.",
    },
    {
      term: "Principal solution",
      text: "A solution \\(\\alpha\\) with \\(0 \\le \\alpha < 2\\pi\\). So \\(0\\) is a principal solution of \\(\\sin\\theta = 0\\) but \\(2\\pi\\) is not. \\(\\cos\\theta = -1\\) has only one principal solution, \\(\\theta = \\pi\\).",
    },
    {
      term: "General solution",
      text: "The expression, in terms of \\(n \\in Z\\), from which all the solutions of the equation can be generated.",
    },
    {
      term: "Polar co-ordinates",
      text: "O is the pole and ray OX the polar axis. For a point P, with \\(OP = r\\) and \\(m\\angle XOP = \\theta\\), the ordered pair \\((r, \\theta)\\) gives its polar co-ordinates: \\(r\\) is the radius vector, \\(\\theta\\) the vectorial angle.",
    },
    {
      term: "Solving a triangle",
      text: "The three sides and three angles are the elements of a triangle. To solve a triangle means to find the unknown elements. Three angles alone cannot solve it: at least one side should be known.",
    },
    {
      term: "Usual notation",
      text: "In \\(\\triangle ABC\\): \\(a = BC\\), \\(b = CA\\), \\(c = AB\\), \\(R\\) is the circumradius, and \\(2s = a + b + c\\).",
    },
    {
      term: "Sine rule",
      text: "In any \\(\\triangle ABC\\), the sides are proportional to the sines of the opposite angles, and each ratio \\(\\frac{a}{\\sin A}\\) equals \\(2R\\), the diameter of the circumcircle.",
    },
    {
      term: "Projection rule",
      text: "Each side equals the sum of the projections of the other two sides on it: with the altitude AD on BC, BD is the projection of AB on BC, so \\(a = c\\cos B + b\\cos C\\).",
    },
    {
      term: "Inverse trigonometric functions",
      text: "No trigonometric function is one-one, so each is restricted to an interval on which it is one-one and onto; its inverse is then defined there. The value of the inverse function in that range is called the **principal value**.",
    },
    {
      term: "Domains of the sum formulas",
      text: "\\(\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\frac{x + y}{1 - xy}\\) needs \\(x > 0\\), \\(y > 0\\) and \\(xy < 1\\). If \\(xy > 1\\), add \\(\\pi\\); if \\(xy = 1\\), the sum is \\(\\frac{\\pi}{2}\\).",
    },
  ],
  formulas: [
    {
      label: "General solutions",
      latex:
        "\\sin\\theta = \\sin\\alpha \\Rightarrow \\theta = n\\pi + (-1)^n\\alpha \\quad \\cos\\theta = \\cos\\alpha \\Rightarrow \\theta = 2n\\pi \\pm \\alpha \\quad \\tan\\theta = \\tan\\alpha \\Rightarrow \\theta = n\\pi + \\alpha",
      symbols: [{ symbol: "n", meaning: "any integer" }],
    },
    {
      label: "Squared equations",
      latex: "\\sin^2\\theta = \\sin^2\\alpha,\\ \\cos^2\\theta = \\cos^2\\alpha \\text{ or } \\tan^2\\theta = \\tan^2\\alpha \\Rightarrow \\theta = n\\pi \\pm \\alpha",
    },
    {
      label: "Zero values",
      latex: "\\sin\\theta = 0 \\iff \\theta = n\\pi \\qquad \\cos\\theta = 0 \\iff \\theta = (2n + 1)\\frac{\\pi}{2} \\qquad \\tan\\theta = 0 \\iff \\theta = n\\pi",
    },
    {
      label: "Sum to product (for sums of sines)",
      latex: "\\sin C + \\sin D = 2\\sin\\frac{C + D}{2}\\cos\\frac{C - D}{2}",
    },
    {
      label: "Polar and Cartesian co-ordinates",
      latex: "x = r\\cos\\theta \\quad y = r\\sin\\theta \\qquad r = \\sqrt{x^2 + y^2} \\quad \\tan\\theta = \\frac{y}{x}",
    },
    { label: "Sine rule", latex: "\\frac{a}{\\sin A} = \\frac{b}{\\sin B} = \\frac{c}{\\sin C} = 2R" },
    {
      label: "Cosine rule",
      latex: "a^2 = b^2 + c^2 - 2bc\\cos A \\qquad \\cos A = \\frac{b^2 + c^2 - a^2}{2bc}",
    },
    { label: "Projection rule", latex: "a = b\\cos C + c\\cos B \\quad b = c\\cos A + a\\cos C \\quad c = a\\cos B + b\\cos A" },
    {
      label: "Half angle formulae",
      latex:
        "\\sin\\frac{A}{2} = \\sqrt{\\frac{(s - b)(s - c)}{bc}} \\quad \\cos\\frac{A}{2} = \\sqrt{\\frac{s(s - a)}{bc}} \\quad \\tan\\frac{A}{2} = \\sqrt{\\frac{(s - b)(s - c)}{s(s - a)}}",
    },
    {
      label: "Area of a triangle (Heron's formula)",
      latex: "A(\\triangle ABC) = \\frac{1}{2}bc\\sin A = \\sqrt{s(s - a)(s - b)(s - c)}",
    },
    { label: "Napier's analogy", latex: "\\tan\\frac{B - C}{2} = \\frac{b - c}{b + c}\\cot\\frac{A}{2}" },
    {
      label: "Principal value ranges",
      latex:
        "\\sin^{-1}x \\in \\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right] \\quad \\cos^{-1}x \\in [0, \\pi] \\quad \\tan^{-1}x \\in \\left(-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right) \\quad \\cot^{-1}x \\in (0, \\pi)",
    },
    {
      label: "Principal value ranges (sec and cosec)",
      latex: "\\sec^{-1}x \\in [0, \\pi] - \\left\\{\\tfrac{\\pi}{2}\\right\\} \\qquad \\csc^{-1}x \\in \\left[-\\tfrac{\\pi}{2}, \\tfrac{\\pi}{2}\\right] - \\{0\\}",
    },
    {
      label: "Negative arguments",
      latex:
        "\\sin^{-1}(-x) = -\\sin^{-1}x \\quad \\tan^{-1}(-x) = -\\tan^{-1}x \\quad \\cos^{-1}(-x) = \\pi - \\cos^{-1}x \\quad \\cot^{-1}(-x) = \\pi - \\cot^{-1}x",
    },
    {
      label: "Complementary sums",
      latex: "\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2} \\quad \\tan^{-1}x + \\cot^{-1}x = \\frac{\\pi}{2} \\quad \\csc^{-1}x + \\sec^{-1}x = \\frac{\\pi}{2}",
    },
    {
      label: "Sum and difference of inverse tangents",
      latex: "\\tan^{-1}x + \\tan^{-1}y = \\tan^{-1}\\frac{x + y}{1 - xy}\\ (xy < 1) \\qquad \\tan^{-1}x - \\tan^{-1}y = \\tan^{-1}\\frac{x - y}{1 + xy}",
      symbols: [{ symbol: "x, y", meaning: "both positive" }],
    },
    { label: "Twice an inverse tangent", latex: "2\\tan^{-1}x = \\tan^{-1}\\frac{2x}{1 - x^2} \\quad (|x| < 1)" },
  ],
  derivations: [
    {
      title: "Find the general solution of a trigonometric equation",
      steps: [
        "Reduce to one of \\(\\sin\\theta = \\sin\\alpha\\), \\(\\cos\\theta = \\cos\\alpha\\), \\(\\tan\\theta = \\tan\\alpha\\) or a squared form, writing the number as a ratio of a standard angle.",
        "For a sum like \\(\\sin\\theta + \\sin 3\\theta + \\sin 5\\theta = 0\\), pair the outer terms: \\(\\sin 3\\theta(2\\cos 2\\theta + 1) = 0\\). Factorise; never cancel a factor.",
        "Solve each factor with the general solution formula and write \"where \\(n \\in Z\\)\".",
        "Example: \\(4\\cos^2\\theta = 3\\) gives \\(\\cos^2\\theta = \\cos^2\\frac{\\pi}{6}\\), so \\(\\theta = n\\pi \\pm \\frac{\\pi}{6}\\).",
      ],
    },
    {
      title: "Find the principal solutions of a trigonometric equation",
      steps: [
        "Find the acute angle with the given value, ignoring the sign (\\(\\cot\\theta = -\\sqrt{3}\\) means \\(\\tan\\theta = -\\frac{1}{\\sqrt{3}}\\): angle \\(\\frac{\\pi}{6}\\)).",
        "Use the sign to pick the two quadrants (here II and IV).",
        "Write both answers in \\([0, 2\\pi)\\): \\(\\pi - \\frac{\\pi}{6} = \\frac{5\\pi}{6}\\) and \\(2\\pi - \\frac{\\pi}{6} = \\frac{11\\pi}{6}\\).",
      ],
    },
    {
      title: "Find the polar co-ordinates of a point from its Cartesian co-ordinates",
      steps: [
        "\\(r = \\sqrt{x^2 + y^2}\\).",
        "\\(\\cos\\theta = \\frac{x}{r}\\), \\(\\sin\\theta = \\frac{y}{r}\\); the signs of \\(x\\) and \\(y\\) fix the quadrant.",
        "Example: \\((1, -\\sqrt{3})\\) gives \\(r = 2\\), \\(\\cos\\theta = \\frac{1}{2}\\), \\(\\sin\\theta = -\\frac{\\sqrt{3}}{2}\\), so \\(\\theta = \\frac{5\\pi}{3}\\): polar co-ordinates \\(\\left(2, \\frac{5\\pi}{3}\\right)\\).",
      ],
    },
    {
      title: "Prove the sine rule",
      steps: [
        "Draw AD perpendicular to BC; \\(AD = b\\sin C\\).",
        "\\(A(\\triangle ABC) = \\frac{1}{2}BC \\cdot AD = \\frac{1}{2}ab\\sin C\\); similarly \\(\\frac{1}{2}ac\\sin B\\) and \\(\\frac{1}{2}bc\\sin A\\).",
        "So \\(bc\\sin A = ac\\sin B = ab\\sin C\\). Divide by \\(abc\\): \\(\\frac{\\sin A}{a} = \\frac{\\sin B}{b} = \\frac{\\sin C}{c}\\).",
      ],
    },
    {
      title: "Prove the cosine rule \\(a^2 = b^2 + c^2 - 2bc\\cos A\\)",
      steps: [
        "Take A as the origin and the X-axis along AB: \\(A(0, 0)\\), \\(B(c, 0)\\), \\(C(b\\cos A, b\\sin A)\\).",
        "By the distance formula, \\(a^2 = BC^2 = (c - b\\cos A)^2 + (0 - b\\sin A)^2\\).",
        "\\(= c^2 - 2bc\\cos A + b^2(\\cos^2 A + \\sin^2 A) = b^2 + c^2 - 2bc\\cos A\\).",
      ],
    },
    {
      title: "Prove the half angle formula \\(\\sin\\frac{A}{2} = \\sqrt{\\frac{(s - b)(s - c)}{bc}}\\)",
      steps: [
        "\\(2\\sin^2\\frac{A}{2} = 1 - \\cos A = 1 - \\frac{b^2 + c^2 - a^2}{2bc} = \\frac{a^2 - (b - c)^2}{2bc}\\).",
        "\\(= \\frac{(a - b + c)(a + b - c)}{2bc} = \\frac{(2s - 2b)(2s - 2c)}{2bc}\\).",
        "So \\(\\sin^2\\frac{A}{2} = \\frac{(s - b)(s - c)}{bc}\\); take the positive root, as \\(\\frac{A}{2}\\) is acute.",
      ],
    },
    {
      title: "Prove an identity in a triangle using the sine, cosine or projection rule",
      steps: [
        "Replace sides by \\(2R\\sin A\\) etc. (sine rule), or cosines by side expressions (cosine rule), whichever removes the mixture.",
        "Example: \\(a\\cos A = b\\cos B\\) gives \\(\\sin A\\cos A = \\sin B\\cos B\\), so \\(\\sin 2A = \\sin 2B\\).",
        "Hence \\(2A = 2B\\) or \\(2A = \\pi - 2B\\): \\(A = B\\) (isosceles) or \\(A + B = \\frac{\\pi}{2}\\) (right angled).",
        "Example: \\(a(b\\cos C - c\\cos B) = \\frac{a^2 + b^2 - c^2}{2} - \\frac{a^2 + c^2 - b^2}{2} = b^2 - c^2\\).",
      ],
    },
    {
      title: "Prove that \\(\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}\\) for \\(-1 \\le x \\le 1\\)",
      steps: [
        "Let \\(\\sin^{-1}x = \\theta\\), so \\(x = \\sin\\theta\\) with \\(-\\frac{\\pi}{2} \\le \\theta \\le \\frac{\\pi}{2}\\).",
        "Then \\(x = \\cos\\left(\\frac{\\pi}{2} - \\theta\\right)\\), and \\(0 \\le \\frac{\\pi}{2} - \\theta \\le \\pi\\), the principal range of \\(\\cos^{-1}\\).",
        "So \\(\\cos^{-1}x = \\frac{\\pi}{2} - \\theta\\), giving \\(\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}\\).",
      ],
    },
    {
      title: "Prove that \\(\\sin^{-1}\\frac{3}{5} + \\cos^{-1}\\frac{12}{13} = \\sin^{-1}\\frac{56}{65}\\) (sums of inverse functions)",
      steps: [
        "Let \\(\\alpha = \\sin^{-1}\\frac{3}{5}\\), so \\(\\cos\\alpha = \\frac{4}{5}\\); \\(\\beta = \\cos^{-1}\\frac{12}{13}\\), so \\(\\sin\\beta = \\frac{5}{13}\\). Both are acute.",
        "\\(\\sin(\\alpha + \\beta) = \\frac{3}{5}\\cdot\\frac{12}{13} + \\frac{4}{5}\\cdot\\frac{5}{13} = \\frac{56}{65}\\).",
        "\\(\\alpha + \\beta\\) lies in the principal range, so \\(\\alpha + \\beta = \\sin^{-1}\\frac{56}{65}\\). For inverse tangents, use the sum formula instead.",
      ],
    },
    {
      title: "Solve \\(\\tan^{-1}2x + \\tan^{-1}3x = \\frac{\\pi}{4}\\) (equations in inverse functions)",
      steps: [
        "Use the sum formula: \\(\\tan^{-1}\\frac{5x}{1 - 6x^2} = \\frac{\\pi}{4}\\), so \\(\\frac{5x}{1 - 6x^2} = 1\\).",
        "\\(6x^2 + 5x - 1 = 0\\), so \\((6x - 1)(x + 1) = 0\\).",
        "\\(x = -1\\) fails the condition (the left side is negative), so \\(x = \\frac{1}{6}\\).",
      ],
    },
  ],
  diagrams: [
    { title: "Polar co-ordinates of a point", labels: ["pole O", "polar axis OX", "point P", "radius vector r = OP", "vectorial angle θ"] },
    { title: "Projection rule (altitude from A)", labels: ["altitude AD on BC", "BD = c cos B", "DC = b cos C", "cases: B acute, right, obtuse"] },
    { title: "Sine rule with the circumcircle", labels: ["circumcircle with centre", "diameter AP = 2R", "right angle at C in triangle ACP", "angle APC = angle B"] },
  ],
  mostAsked: [
    {
      topic: "General or principal solutions of a trigonometric equation",
      years: [2026, 2025, 2024, 2023, 2022, 2019, 2018, 2017, 2016, 2015],
    },
    {
      topic: "Prove the cosine rule, or an identity in a triangle, using the sine, cosine or projection rule",
      years: [2026, 2025, 2024, 2019, 2016],
    },
    {
      topic: "Prove a sum of inverse trigonometric functions, including \\(\\sin^{-1}x + \\cos^{-1}x = \\frac{\\pi}{2}\\)",
      years: [2026, 2025, 2024, 2023, 2020, 2018, 2017],
    },
    {
      topic: "Principal value of an inverse trigonometric function, or evaluate an expression with them",
      years: [2026, 2024, 2022, 2015],
    },
    {
      topic: "Sine or cosine rule numericals: find an angle, the ratio of the sides, or the kind of triangle",
      years: [2026, 2025, 2023, 2022, 2020],
    },
    {
      topic: "Half angle formulae: find \\(\\sin\\frac{A}{2}\\), \\(\\cos\\frac{B}{2}\\) from the sides, or prove one",
      years: [2026, 2025, 2024, 2020, 2017],
    },
    {
      topic: "Solve an equation in inverse trigonometric functions for \\(x\\)",
      years: [2026, 2024, 2022, 2016],
    },
    { topic: "Polar co-ordinates of a point from its Cartesian co-ordinates", years: [2025, 2024] },
  ],
  mistakes: [
    {
      title: "Writing a principal value outside its range",
      body: "\\(\\sin^{-1}\\left(\\sin\\frac{5\\pi}{3}\\right)\\) is not \\(\\frac{5\\pi}{3}\\): \\(\\sin\\frac{5\\pi}{3} = -\\frac{\\sqrt{3}}{2}\\), so the answer is \\(-\\frac{\\pi}{3}\\). \\(\\cot^{-1}\\left(-\\frac{1}{\\sqrt{3}}\\right) = \\pi - \\frac{\\pi}{3} = \\frac{2\\pi}{3}\\), not \\(-\\frac{\\pi}{3}\\).",
    },
    {
      title: "Using \\(n\\pi \\pm \\alpha\\) for \\(\\cos\\theta = \\cos\\alpha\\)",
      body: "The general solution of \\(\\cos\\theta = \\cos\\alpha\\) is \\(2n\\pi \\pm \\alpha\\). Only the squared forms (\\(\\cos^2\\theta = \\cos^2\\alpha\\)) give \\(n\\pi \\pm \\alpha\\). Always end with \"where \\(n \\in Z\\)\".",
    },
    {
      title: "Cancelling a factor in an equation",
      body: "Dividing \\(\\sin 3\\theta(2\\cos 2\\theta + 1) = 0\\) by \\(\\sin 3\\theta\\) loses the solutions \\(\\theta = \\frac{n\\pi}{3}\\). Set each factor to zero.",
    },
    {
      title: "Giving one principal solution",
      body: "List every solution in \\([0, 2\\pi)\\): \\(\\cos\\theta = \\frac{1}{2}\\) has two, \\(\\frac{\\pi}{3}\\) and \\(\\frac{5\\pi}{3}\\). \\(2\\pi\\) itself is never a principal solution.",
    },
    {
      title: "Taking \\(\\theta = \\tan^{-1}\\frac{y}{x}\\) blindly for polar co-ordinates",
      body: "For \\((-\\sqrt{2}, -\\sqrt{2})\\), \\(\\frac{y}{x} = 1\\) but the point is in quadrant III: \\(\\theta = \\frac{5\\pi}{4}\\), and \\(r = 2\\).",
    },
    {
      title: "Using the \\(\\tan^{-1}\\) sum formula without its condition",
      body: "\\(\\tan^{-1}\\frac{x + y}{1 - xy}\\) is the sum only when \\(xy < 1\\). After solving an equation, reject a root that breaks the condition or the principal range.",
    },
  ],
};

export default sheet;
