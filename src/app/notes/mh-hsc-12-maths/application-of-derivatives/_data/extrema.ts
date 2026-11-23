import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_MA_AD_EXTREMA_NOTE: SubtopicNote = {
  subtopicName: "Maxima and Minima",
  title: "Maxima and Minima",
  oneLineDefinition:
    "At a maximum or a minimum of a smooth function the derivative is zero; the sign change of f' or the sign of f'' then tells which it is, and word problems use this to find the greatest or least value.",
  whyItMatters:
    "48 questions, the largest page of the chapter, nine of them from board papers: the maximum and minimum of 2x³ − 21x² + 36x − 20 (2015, 2018), the maximum value of log x / x (an MCQ in 2022), the rectangle of greatest area from a wire or rod (2019, 2022, 2026), dividing 20 so that the sum of the squares is least (2025), the open box of greatest volume (2024) and the circle and square cut from one wire (2016). The textbook rows are Exercise 2.4 Q.9 to Q.22, the solved examples of sections 2.4.3 and 2.4.4 and twelve Miscellaneous Exercise questions.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscmad-first",
      name: "Local maxima, minima and the first derivative test",
      intuition:
        "At the top of a hill the graph stops rising and starts falling, so the derivative changes from positive to negative there. At the bottom of a valley it changes from negative to positive. Points where f'(x) = 0 are only candidates; the change of sign decides.",
      definition:
        "- \\(f\\) has a **maxima** at \\(x = c\\) if \\(f(c) > f(x)\\) for all \\(x\\) near \\(c\\); a **minima** if \\(f(c) < f(x)\\) for all \\(x\\) near \\(c\\).\n" +
        "- These are local (relative) values: the greatest or least near \\(c\\), not necessarily on the whole domain.\n" +
        "- Points where \\(f'(x) = 0\\) are **stationary (turning) points**.\n" +
        "- **First derivative test:** if \\(f'(c) = 0\\) and \\(f'\\) changes from positive to negative at \\(c\\), \\(f\\) has a maxima at \\(c\\); from negative to positive, a minima.\n" +
        "- If \\(f'\\) does not change sign at \\(c\\), there is neither: \\(x = c\\) is a point of inflexion, as for \\(x^3\\) at 0.",
      formula: {
        label: "First derivative test",
        latex: "f'(c) = 0: \\quad f' \\text{ from } + \\text{ to } - \\Rightarrow \\text{maxima}, \\qquad f' \\text{ from } - \\text{ to } + \\Rightarrow \\text{minima}",
      },
      authoredExample: {
        prompt: "Using the first derivative test, find the local maxima and minima of \\(f(x) = x^4 - 2x^2\\).",
        steps: [
          "\\(f'(x) = 4x^3 - 4x = 4x(x - 1)(x + 1)\\), so the stationary points are \\(x = -1, 0, 1\\).",
          "For \\(x < -1\\), \\(f' < 0\\); for \\(-1 < x < 0\\), \\(f' > 0\\); for \\(0 < x < 1\\), \\(f' < 0\\); for \\(x > 1\\), \\(f' > 0\\).",
          "At \\(x = -1\\) and \\(x = 1\\), \\(f'\\) changes from negative to positive: minima, \\(f(\\pm 1) = 1 - 2 = -1\\).",
          "At \\(x = 0\\), \\(f'\\) changes from positive to negative: maxima, \\(f(0) = 0\\).",
        ],
        answer: "Maxima 0 at \\(x = 0\\); minima \\(-1\\) at \\(x = -1\\) and at \\(x = 1\\)",
      },
      selfCheckExample: {
        prompt: "At \\(x = 1\\), \\(f'(x)\\) changes from negative to positive. Does \\(f\\) have a maxima or a minima there?",
        steps: ["\\(f\\) falls and then rises, so \\(x = 1\\) is the bottom of a valley."],
        answer: "A minima",
      },
      practiceSet: [
        { prompt: "\\(f'(x) = (x - 1)(x - 3)\\). Which of \\(x = 1\\) and \\(x = 3\\) gives a maxima?", answer: "\\(x = 1\\) (\\(f'\\) goes from positive to negative); \\(x = 3\\) gives a minima" },
        { prompt: "Does \\(f(x) = x^3\\) have a maxima or a minima at \\(x = 0\\)?", answer: "Neither: \\(f'(x) = 3x^2\\) does not change sign, so 0 is a point of inflexion" },
      ],
      pyqExampleId: "34065ae9-b14c-4333-806d-4f69bf9561d7",
      traps: [
        {
          title: "Calling a local maximum the greatest value",
          body: "A cubic's local maximum is only the highest value near that point; the cubic goes on to larger values. Say 'maxima' or 'local maximum value', as the book does.",
        },
        {
          title: "Treating every stationary point as an extreme",
          body: "\\(f'(c) = 0\\) only finds candidates. Without a change of sign in \\(f'\\) (or a non-zero \\(f''(c)\\)) there is no maxima or minima.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-second",
      name: "The second derivative test",
      intuition:
        "At a hilltop the slope is falling from positive to negative, so f'' is negative; at a valley it is rising, so f'' is positive. This test needs only one number at each stationary point, which is why the board's 'find the maximum and minimum values' answers use it.",
      definition:
        "- If \\(f'(c) = 0\\) and \\(f''(c) < 0\\), \\(f\\) has a maxima at \\(x = c\\).\n" +
        "- If \\(f'(c) = 0\\) and \\(f''(c) > 0\\), \\(f\\) has a minima at \\(x = c\\).\n" +
        "- If \\(f''(c) = 0\\) the test fails; use the first derivative test.\n" +
        "- Board layout: \\(f'(x)\\); solve \\(f'(x) = 0\\); \\(f''(x)\\); the sign of \\(f''\\) at each root; then the value \\(f(c)\\).\n" +
        "- 'Maximum value' means \\(f(c)\\), not \\(c\\).",
      formula: {
        label: "Second derivative test",
        latex: "f'(c) = 0,\\ f''(c) < 0 \\Rightarrow \\text{maxima}; \\qquad f'(c) = 0,\\ f''(c) > 0 \\Rightarrow \\text{minima}",
      },
      authoredExample: {
        prompt: "Find the maximum and minimum values of \\(f(x) = 2x^3 - 9x^2 + 12x + 1\\).",
        steps: [
          "\\(f'(x) = 6x^2 - 18x + 12 = 6(x - 1)(x - 2)\\). \\(f'(x) = 0\\) at \\(x = 1\\) and \\(x = 2\\).",
          "\\(f''(x) = 12x - 18\\).",
          "\\(f''(1) = -6 < 0\\): maxima at \\(x = 1\\), maximum value \\(f(1) = 2 - 9 + 12 + 1 = 6\\).",
          "\\(f''(2) = 6 > 0\\): minima at \\(x = 2\\), minimum value \\(f(2) = 16 - 36 + 24 + 1 = 5\\).",
        ],
        answer: "Maximum value 6 (at \\(x = 1\\)); minimum value 5 (at \\(x = 2\\))",
      },
      selfCheckExample: {
        prompt: "For a function \\(f\\), \\(f'(2) = 0\\) and \\(f''(2) = -5\\). What does \\(f\\) have at \\(x = 2\\)?",
        steps: ["\\(f''(2) < 0\\)."],
        answer: "A maxima",
      },
      practiceSet: [
        { prompt: "Find the maximum value of \\(f(x) = \\sin x + \\cos x\\) for \\(0 < x < \\dfrac{\\pi}{2}\\).", answer: "\\(\\sqrt{2}\\), at \\(x = \\dfrac{\\pi}{4}\\)" },
        { prompt: "Find the minimum value of \\(f(x) = x + \\dfrac{1}{x}\\) for \\(x > 0\\).", answer: "2, at \\(x = 1\\) (\\(f''(1) = 2 > 0\\))" },
      ],
      pyqExampleId: "46d1cc0c-316c-4001-a78e-9e198ed1cbc4",
      traps: [
        {
          title: "Giving the point instead of the value",
          body: "For \\(\\dfrac{\\log x}{x}\\) the maximum is at \\(x = e\\), and the maximum value is \\(\\dfrac{1}{e}\\). Board 2022 offered both as options; only the value was right.",
        },
        {
          title: "Trusting the test when f''(c) = 0",
          body: "A zero second derivative tells you nothing. Go back to the sign of \\(f'\\) on either side of \\(c\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-plane",
      name: "Word problems on numbers, lengths and areas",
      intuition:
        "Every word problem has the same skeleton. Name the variables, write the quantity to be made greatest or least, and use the given condition to bring it down to one variable. Then it is an ordinary maxima and minima question, and the answer goes back into words.",
      definition:
        "- **Step 1:** name the variables and write the quantity to be made greatest or least.\n" +
        "- **Step 2:** use the given condition (a fixed sum, perimeter or area) to write it in one variable.\n" +
        "- **Step 3:** differentiate, put the derivative equal to 0 and solve.\n" +
        "- **Step 4:** show by the second derivative test that it is a maximum or a minimum.\n" +
        "- **Step 5:** answer what was asked: the dimensions or the parts, and the greatest or least value, with units.\n" +
        "- Of all rectangles with a given perimeter, the square has the greatest area; of all rectangles with a given area, the square has the least perimeter.",
      formula: {
        label: "Reducing to one variable",
        latex: "A = xy,\\ \\ 2(x + y) = p \\;\\Rightarrow\\; A = x\\left(\\frac{p}{2} - x\\right)",
      },
      authoredExample: {
        prompt:
          "A farmer has 200 m of fencing to enclose a rectangular field beside a straight river, with no fence needed along the river. Find the dimensions that give the greatest area.",
        steps: [
          "Let the side along the river be \\(x\\) m and each side at right angles to it be \\(y\\) m. Then \\(x + 2y = 200\\), so \\(x = 200 - 2y\\).",
          "Area \\(A = xy = (200 - 2y)y = 200y - 2y^2\\).",
          "\\(\\dfrac{dA}{dy} = 200 - 4y = 0\\), so \\(y = 50\\).",
          "\\(\\dfrac{d^2A}{dy^2} = -4 < 0\\), so \\(A\\) is greatest at \\(y = 50\\).",
          "Then \\(x = 200 - 100 = 100\\) and \\(A = 100 \\times 50 = 5000\\) sq. m.",
        ],
        answer: "100 m along the river and 50 m at right angles to it; greatest area 5000 sq. m",
      },
      selfCheckExample: {
        prompt: "Divide 12 into two parts whose product is the greatest.",
        steps: ["\\(P = x(12 - x)\\), \\(P' = 12 - 2x = 0\\), so \\(x = 6\\).", "\\(P'' = -2 < 0\\), a maximum."],
        answer: "6 and 6",
      },
      practiceSet: [
        { prompt: "A rectangle has area 49 sq. cm. Find its least possible perimeter.", answer: "28 cm, when it is a square of side 7 cm" },
        { prompt: "The sum of two numbers is 10. Find them if the sum of their squares is least.", answer: "5 and 5" },
      ],
      pyqExampleId: "6b8d3b82-fc19-42da-9430-0437ee70b369",
      traps: [
        {
          title: "Stopping at the value of x",
          body: "The question asks for dimensions or parts and usually the greatest or least value too. Put \\(x\\) back to find the other side and the value, and write the units.",
        },
        {
          title: "Leaving out the second derivative",
          body: "Finding where the derivative is 0 does not show that the value is a maximum. The board gives a separate mark for the line '\\(\\dfrac{d^2A}{dx^2} < 0\\), so \\(A\\) is maximum'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hscmad-solids",
      name: "Boxes, cylinders and cones",
      intuition:
        "Solid figures follow the same skeleton, but you need the right formulas for volume and surface area, and you must notice whether the solid is open or closed. The given quantity (a fixed sheet of metal or a fixed volume) lets you remove one variable before differentiating.",
      definition:
        "- Open box with square base of side \\(x\\) and height \\(h\\): surface area \\(x^2 + 4xh\\), volume \\(x^2h\\).\n" +
        "- Box from a square sheet of side \\(a\\) by cutting squares of side \\(x\\) from the corners: \\(V = x(a - 2x)^2\\).\n" +
        "- Closed cylinder: \\(S = 2\\pi r^2 + 2\\pi rh\\), \\(V = \\pi r^2 h\\). Open at the top: \\(S = \\pi r^2 + 2\\pi rh\\).\n" +
        "- Cone: \\(V = \\dfrac{1}{3}\\pi r^2 h\\).\n" +
        "- Use the fixed quantity to write \\(h\\) in terms of \\(r\\) (or \\(x\\)) before you differentiate.",
      formula: {
        label: "Open box and closed cylinder",
        latex: "V = x^2 h,\\ S = x^2 + 4xh \\ \\text{(open box)}; \\qquad V = \\pi r^2 h,\\ S = 2\\pi r^2 + 2\\pi r h \\ \\text{(closed cylinder)}",
      },
      authoredExample: {
        prompt:
          "A box without a lid is made from a square sheet of tin of side 24 cm by cutting equal squares from the corners and folding up the sides. Find the side of the square cut off for the greatest volume, and that volume.",
        steps: [
          "Let the side of each square cut off be \\(x\\) cm. Then \\(V = x(24 - 2x)^2\\), with \\(0 < x < 12\\).",
          "\\(\\dfrac{dV}{dx} = (24 - 2x)^2 - 4x(24 - 2x) = (24 - 2x)(24 - 6x)\\).",
          "\\(\\dfrac{dV}{dx} = 0\\) gives \\(x = 12\\) (no box) or \\(x = 4\\).",
          "\\(\\dfrac{d^2V}{dx^2} = -2(24 - 6x) - 6(24 - 2x)\\); at \\(x = 4\\) it is \\(0 - 96 = -96 < 0\\), a maximum.",
          "\\(V = 4(24 - 8)^2 = 4 \\times 256 = 1024\\) cu. cm.",
        ],
        answer: "Cut squares of side 4 cm; greatest volume 1024 cu. cm",
      },
      selfCheckExample: {
        prompt: "A closed cylinder has volume \\(16\\pi\\) cu. cm. Write its total surface area in terms of the radius \\(r\\) alone.",
        steps: ["\\(\\pi r^2 h = 16\\pi\\), so \\(h = \\dfrac{16}{r^2}\\).", "\\(S = 2\\pi r^2 + 2\\pi r\\left(\\dfrac{16}{r^2}\\right)\\)."],
        answer: "\\(S = 2\\pi r^2 + \\dfrac{32\\pi}{r}\\)",
      },
      practiceSet: [
        { prompt: "Show that a closed cylinder of volume \\(54\\pi\\) cu. cm has the least surface area when its radius is 3 cm.", answer: "\\(S = 2\\pi r^2 + \\dfrac{108\\pi}{r}\\), \\(S' = 4\\pi r - \\dfrac{108\\pi}{r^2} = 0\\) gives \\(r^3 = 27\\), \\(r = 3\\), and \\(S'' > 0\\)" },
        { prompt: "An open cylindrical tank must hold \\(8\\pi\\) cu. m. Find the radius that uses the least metal sheet.", answer: "2 m (\\(S = \\pi r^2 + \\dfrac{16\\pi}{r}\\), so \\(r^3 = 8\\))" },
      ],
      pyqExampleId: "cb837863-2d9c-47bc-8e71-d97cb71c1df0",
      traps: [
        {
          title: "Using the closed formula for an open solid",
          body: "An open box has no top, so its surface area is \\(x^2 + 4xh\\), not \\(2x^2 + 4xh\\). Read 'open' and 'closed' before you write the formula.",
        },
        {
          title: "Differentiating with two variables left",
          body: "\\(V = \\pi r^2 h\\) cannot be differentiated w.r.t. \\(r\\) while \\(h\\) is still free. Replace \\(h\\) using the fixed quantity first.",
        },
      ],
    },
  ],
};
