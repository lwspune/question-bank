import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_AD_MAXIMA_NOTE: SubtopicNote = {
  subtopicName: "Maxima and Minima",
  title: "Maxima and Minima",
  oneLineDefinition:
    "Maximum and minimum values, local maxima and minima, critical points, the first and second derivative tests, points of inflexion, and word problems that ask for the greatest or least value.",
  whyItMatters:
    "122 questions, the largest page of the chapter, fifty-eight of them from board papers in every year from 2023 to 2026. The board asks for local maximum and minimum values by the second derivative test (2024 to 2026), a function shown to have neither a maximum nor a minimum (2024, 2025), the critical point of x to the power x and the meaning of a point of inflexion (2024, 2025), and two numbers with a given sum or product that make a sum of squares, a sum of cubes or a plain sum least (2023, 2025). Most of the marks are in word problems: a rectangle rolled or revolved into a cylinder of greatest volume (2024 to 2026), a garden, a visiting card or a solar panel of greatest or least area (2023 to 2025), a cylinder, box or tumbler of greatest volume or least surface (2023, 2025, 2026), a tank of least cost (2023), revenue, fuel use and the height of a ball or a plant (2023 to 2026), and in 2026 the point on a road where two ladders to the tops of two poles have the least sum of squares. The textbook adds Exercise 6.3, its examples and most of the Miscellaneous Exercise.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmad-values",
      name: "Maximum and minimum values of a function",
      intuition:
        "The maximum value of a function on a set is its greatest value there, and the minimum value is its least. Some functions can be read without any calculus: a square is never negative, a modulus is never negative, and sine and cosine stay between \\(-1\\) and 1. Move and stretch those bounds, then check that each bound is actually reached.",
      definition:
        "- f has a **maximum value** in I if there is a point c in I with \\(f(c) \\ge f(x)\\) for all x in I. Then \\(f(c)\\) is the maximum value and c a point of maximum value.\n" +
        "- f has a **minimum value** in I if \\(f(c) \\le f(x)\\) for all x in I. Either value is an **extreme value**, and c an **extreme point**.\n" +
        "- **Without calculus:** \\((ax + b)^2 \\ge 0\\), \\(|x - a| \\ge 0\\), \\(-1 \\le \\sin\\theta \\le 1\\). Build the bounds of f from these, and name an x where each bound is reached.\n" +
        "- A function may have no maximum or no minimum. \\(x^3\\) on R has neither. \\(x\\) on the open interval \\((0, 1)\\) has neither, because 0 and 1 are left out.\n" +
        "- Every monotonic function takes its maximum and minimum values at the end points of its domain, when those are included.",
      formula: {
        label: "Bounds of a shifted sine",
        latex: "-1 \\le \\sin\\theta \\le 1 \\;\\Rightarrow\\; c - a \\le c + a\\sin\\theta \\le c + a \\quad (a > 0)",
      },
      authoredExample: {
        prompt: "Find the maximum and minimum values, if any, of \\(f(x) = 7 - 3\\cos 2x\\).",
        steps: [
          "For every real x, \\(-1 \\le \\cos 2x \\le 1\\).",
          "Multiplying by \\(-3\\) turns the inequalities round: \\(-3 \\le -3\\cos 2x \\le 3\\).",
          "Adding 7: \\(4 \\le 7 - 3\\cos 2x \\le 10\\).",
          "The value 10 is reached when \\(\\cos 2x = -1\\), for example at \\(x = \\dfrac{\\pi}{2}\\).",
          "The value 4 is reached when \\(\\cos 2x = 1\\), for example at \\(x = 0\\).",
        ],
        answer: "Maximum value 10, minimum value 4",
      },
      selfCheckExample: {
        prompt: "Find the minimum value of \\(f(x) = (3x + 1)^2 - 4\\). Does f have a maximum value?",
        steps: ["\\((3x + 1)^2 \\ge 0\\), so \\(f(x) \\ge -4\\), with equality at \\(x = -\\dfrac{1}{3}\\); f grows without limit."],
        answer: "Minimum value \\(-4\\); no maximum value",
      },
      practiceSet: [
        {
          prompt: "Find the maximum value of \\(g(x) = 6 - |x - 2|\\).",
          answer: "6, at \\(x = 2\\); there is no minimum value",
        },
        {
          prompt: "Find the maximum and minimum values of \\(h(x) = 2\\sin x - 1\\).",
          answer: "Maximum 1 (when \\(\\sin x = 1\\)), minimum \\(-3\\) (when \\(\\sin x = -1\\))",
        },
        {
          prompt: "Does \\(f(x) = 2x + 1\\), \\(x \\in (0, 3)\\), have a maximum value?",
          answer: "No. Its values come close to 7 but never reach it, since 3 is left out; it has no minimum value either",
        },
      ],
      pyqExampleId: "3cc7d15e-04df-4cff-9f34-2287363a0fe9",
      traps: [
        {
          title: "A bound that is never reached",
          body: "A maximum value must be taken at some point. x on \\((0, 1)\\) comes close to 1 but never equals it, so it has no maximum value.",
        },
        {
          title: "Losing the minus sign in front of a modulus",
          body: "For \\(3 - |x + 1|\\) the modulus is subtracted, so 3 is the MAXIMUM value, reached at \\(x = -1\\), and there is no minimum.",
        },
        {
          title: "Reading 'no maximum' as 'no minimum'",
          body: "\\(x^2\\) on R has the minimum value 0 but no maximum value. Answer each part on its own.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-firsttest",
      name: "Local maxima and minima: critical points and the first derivative test",
      intuition:
        "At the top of a hill the graph stops rising and starts falling, so the derivative changes from positive to negative. At the bottom of a valley it changes from negative to positive. If the derivative is zero but keeps its sign, the graph only flattens for a moment and carries on: that is a point of inflexion.",
      definition:
        "- c is a point of **local maxima** if \\(f(c) \\ge f(x)\\) for all x in some interval \\((c - h, c + h)\\); of **local minima** if \\(f(c) \\le f(x)\\) there.\n" +
        "- **Theorem 2:** if f has a local maximum or minimum at c, then either \\(f'(c) = 0\\) or f is not differentiable at c. The converse is false: \\(x^3\\) has \\(f'(0) = 0\\) but no maximum or minimum at 0.\n" +
        "- A point where \\(f'(c) = 0\\) or f is not differentiable is a **critical point**.\n" +
        "- **First derivative test:** as x increases through a critical point c, if \\(f'\\) changes from positive to negative, c is a point of local maxima.\n" +
        "- If \\(f'\\) changes from negative to positive, c is a point of local minima.\n" +
        "- If \\(f'\\) does not change sign, c is neither, and is called a **point of inflexion**.\n" +
        "- The first test also works where f is not differentiable, as for \\(3 + |x|\\) at \\(x = 0\\).",
      formula: {
        label: "First derivative test",
        latex: "f' : + \\to - \\;\\Rightarrow\\; \\text{local max},\\qquad f' : - \\to + \\;\\Rightarrow\\; \\text{local min}",
      },
      authoredExample: {
        prompt: "Find the points of local maxima, local minima and inflexion of \\(f(x) = 3x^4 - 4x^3 + 1\\), and the local extreme values.",
        steps: [
          "\\(f'(x) = 12x^3 - 12x^2 = 12x^2(x - 1)\\).",
          "\\(f'(x) = 0\\) gives the critical points \\(x = 0\\) and \\(x = 1\\).",
          "Near \\(x = 0\\): \\(12x^2 > 0\\) and \\(x - 1 < 0\\) on both sides, so \\(f'(x) < 0\\) on both sides. No change of sign, so \\(x = 0\\) is a point of inflexion.",
          "Near \\(x = 1\\): just to the left, \\(x - 1 < 0\\), so \\(f'(x) < 0\\); just to the right, \\(f'(x) > 0\\). The sign changes from negative to positive, so \\(x = 1\\) is a point of local minima.",
          "Local minimum value: \\(f(1) = 3 - 4 + 1 = 0\\).",
        ],
        answer: "Local minimum value 0 at \\(x = 1\\); no local maximum; \\(x = 0\\) is a point of inflexion",
      },
      selfCheckExample: {
        prompt: "Find the local minimum value of \\(f(x) = 5 + |x - 2|\\).",
        steps: [
          "f is not differentiable at \\(x = 2\\), so 2 is a critical point.",
          "To the left of 2, \\(f(x) = 7 - x\\) and \\(f'(x) = -1\\); to the right, \\(f(x) = 3 + x\\) and \\(f'(x) = 1\\).",
        ],
        answer: "The sign changes from negative to positive: local minimum value \\(f(2) = 5\\)",
      },
      practiceSet: [
        {
          prompt: "Show that \\(f(x) = x^5 + x\\) has neither a local maximum nor a local minimum.",
          answer: "\\(f'(x) = 5x^4 + 1 > 0\\) for every x, so there is no critical point",
        },
        {
          prompt: "Find the critical points of \\(f(x) = x^3 - 27x + 4\\) and say what each one is.",
          answer: "\\(f'(x) = 3(x - 3)(x + 3)\\): local maximum at \\(x = -3\\) (value 58), local minimum at \\(x = 3\\) (value \\(-50\\))",
        },
        {
          prompt: "What is a point of inflexion?",
          answer: "A critical point at which \\(f'\\) does not change sign, so it is neither a point of local maxima nor of local minima, such as \\(x = 0\\) for \\(x^3\\)",
        },
      ],
      pyqExampleId: "d5f0c104-cfe4-4721-9729-c0c4c6848393",
      traps: [
        {
          title: "Taking f′(c) = 0 as proof of an extremum",
          body: "\\(x^3\\) has \\(f'(0) = 0\\) but rises straight through 0. Test whether \\(f'\\) changes sign before you call a point a maximum or a minimum.",
        },
        {
          title: "Reading the sign on one side only",
          body: "The first test needs the sign of \\(f'\\) just to the LEFT and just to the RIGHT of c. Write both in words in your answer.",
        },
        {
          title: "Missing a corner",
          body: "A point where f is not differentiable, such as \\(x = 0\\) for \\(|x|\\), is a critical point too. Look for these as well as for \\(f'(x) = 0\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-secondtest",
      name: "The second derivative test: local maximum and minimum values",
      intuition:
        "At a critical point the curve is flat for a moment. If it bends downwards there (\\(f'' < 0\\)), the point is the top of a hill: a local maximum. If it bends upwards (\\(f'' > 0\\)), it is the bottom of a valley: a local minimum. One number decides it, so this test is quicker than checking signs on both sides.",
      definition:
        "- **Theorem 4:** let f be twice differentiable at c, with \\(f'(c) = 0\\).\n" +
        "- If \\(f''(c) < 0\\), c is a point of **local maxima**, and \\(f(c)\\) is the local maximum value.\n" +
        "- If \\(f''(c) > 0\\), c is a point of **local minima**, and \\(f(c)\\) is the local minimum value.\n" +
        "- If \\(f''(c) = 0\\), the test fails: go back to the first derivative test.\n" +
        "- **A full answer:** find \\(f'\\), solve \\(f'(x) = 0\\), find \\(f''\\), test every critical point, then work out \\(f(c)\\) for each. Name the point AND the value.\n" +
        "- A local maximum value can be less than a local minimum value: 'local' compares a point only with points near it.",
      formula: {
        label: "Second derivative test",
        latex: "f'(c) = 0,\\ f''(c) < 0 \\Rightarrow \\text{local max};\\qquad f'(c) = 0,\\ f''(c) > 0 \\Rightarrow \\text{local min}",
      },
      authoredExample: {
        prompt: "Find the local maximum and local minimum values of \\(f(x) = 2x^3 - 3x^2 - 12x + 6\\).",
        steps: [
          "\\(f'(x) = 6x^2 - 6x - 12 = 6(x^2 - x - 2) = 6(x - 2)(x + 1)\\).",
          "\\(f'(x) = 0\\) gives \\(x = -1\\) and \\(x = 2\\).",
          "\\(f''(x) = 12x - 6\\).",
          "\\(f''(-1) = -18 < 0\\), so \\(x = -1\\) is a point of local maxima. Local maximum value: \\(f(-1) = -2 - 3 + 12 + 6 = 13\\).",
          "\\(f''(2) = 18 > 0\\), so \\(x = 2\\) is a point of local minima. Local minimum value: \\(f(2) = 16 - 12 - 24 + 6 = -14\\).",
        ],
        answer: "Local maximum value 13 at \\(x = -1\\); local minimum value \\(-14\\) at \\(x = 2\\)",
      },
      selfCheckExample: {
        prompt: "Find the local minimum value of \\(f(x) = x^2 + \\dfrac{16}{x}\\), \\(x \\neq 0\\).",
        steps: [
          "\\(f'(x) = 2x - \\dfrac{16}{x^2} = 0\\) gives \\(x^3 = 8\\), \\(x = 2\\).",
          "\\(f''(x) = 2 + \\dfrac{32}{x^3}\\), so \\(f''(2) = 6 > 0\\).",
        ],
        answer: "Local minimum value \\(f(2) = 4 + 8 = 12\\)",
      },
      practiceSet: [
        {
          prompt: "Find the local maximum value of \\(f(x) = -x^2 + 6x + 1\\).",
          answer: "\\(f'(x) = 0\\) at \\(x = 3\\), \\(f''(x) = -2 < 0\\): local maximum value \\(f(3) = 10\\)",
        },
        {
          prompt: "Apply the second derivative test to \\(f(x) = x^4\\) at \\(x = 0\\). What do you conclude?",
          answer: "\\(f''(0) = 0\\), so the test fails. \\(f'(x) = 4x^3\\) changes from negative to positive, so the first test gives a local minimum value 0",
        },
        {
          prompt: "Find the local minimum value of \\(f(x) = xe^{x}\\).",
          answer: "\\(f'(x) = (1 + x)e^x = 0\\) at \\(x = -1\\); \\(f''(-1) = e^{-1} > 0\\), so the local minimum value is \\(-\\dfrac{1}{e}\\)",
        },
      ],
      pyqExampleId: "41bb60e1-c7fc-40e2-bdcc-3161c1723a6b",
      traps: [
        {
          title: "Stopping at the point",
          body: "When the question asks for the local maximum VALUE, put c back into f. 'Local maximum at \\(x = -1\\)' without the value loses a mark.",
        },
        {
          title: "Settling a test that failed",
          body: "If \\(f''(c) = 0\\), the second test says nothing. Do not call the point an inflexion at once: use the first derivative test. For \\(x^4\\) at 0 it is a minimum.",
        },
        {
          title: "Expecting the local maximum to be the bigger value",
          body: "For \\(x + \\dfrac{1}{x}\\) the local maximum value \\(-2\\) is less than the local minimum value 2. Report each as the tests give it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-numbers",
      name: "Optimisation with numbers, money and given formulas",
      intuition:
        "Here the quantity to make greatest or least is given, or takes one line to write: a sum of two numbers, a revenue, a fuel use, a height. Use the condition to write it in one variable, find the critical point, check it with the second derivative, and answer the question that was asked.",
      definition:
        "- **Step 1:** name the variable.\n" +
        "- **Step 2:** use the condition to write the quantity as a function of ONE variable.\n" +
        "- **Step 3:** differentiate and solve \\(f'(x) = 0\\).\n" +
        "- **Step 4:** check with \\(f''\\) (or the first derivative test) that it is a maximum or a minimum.\n" +
        "- **Step 5:** answer in the words of the question, with units.\n" +
        "- **Two numbers** with sum s: take x and \\(s - x\\). With product p: take x and \\(\\dfrac{p}{x}\\), with \\(x > 0\\).\n" +
        "- **Revenue** is the number sold times the price: \\(R(x) = x\\,p(x)\\). **Profit** = selling price minus cost price.\n" +
        "- Reject a critical point the situation does not allow, such as a negative number of units.",
      formula: {
        label: "Revenue from a demand function",
        latex: "R(x) = x \\cdot p(x)",
        symbols: [
          { symbol: "\\(x\\)", meaning: "the number of units sold" },
          { symbol: "\\(p(x)\\)", meaning: "the price of one unit when x units are sold" },
        ],
      },
      authoredExample: {
        prompt:
          "Find two positive numbers whose sum is 20 such that the product of the square of one and the other is the greatest.",
        steps: [
          "Let the numbers be x and \\(20 - x\\), with \\(0 < x < 20\\).",
          "\\(P(x) = x^2(20 - x) = 20x^2 - x^3\\).",
          "\\(P'(x) = 40x - 3x^2 = x(40 - 3x)\\). In \\((0, 20)\\), \\(P'(x) = 0\\) gives \\(x = \\dfrac{40}{3}\\).",
          "\\(P''(x) = 40 - 6x\\), so \\(P''\\left(\\dfrac{40}{3}\\right) = 40 - 80 = -40 < 0\\): a maximum.",
          "The other number is \\(20 - \\dfrac{40}{3} = \\dfrac{20}{3}\\).",
        ],
        answer: "\\(\\dfrac{40}{3}\\) (the one squared) and \\(\\dfrac{20}{3}\\)",
      },
      selfCheckExample: {
        prompt: "A firm's profit in rupees from selling x units is \\(P(x) = 60x - 2x^2 - 100\\). How many units give the greatest profit, and what is it?",
        steps: ["\\(P'(x) = 60 - 4x = 0\\) at \\(x = 15\\); \\(P''(x) = -4 < 0\\)."],
        answer: "15 units, profit \\(P(15) = 900 - 450 - 100 = 350\\) rupees",
      },
      practiceSet: [
        {
          prompt: "Find two numbers whose difference is 10 and whose product is least.",
          answer: "Take x and \\(x - 10\\): \\(P = x^2 - 10x\\), least at \\(x = 5\\). The numbers are 5 and \\(-5\\)",
        },
        {
          prompt: "The height in metres of a stone thrown upwards is \\(h = 20t - 5t^2\\) after t seconds. Find its greatest height.",
          answer: "\\(h' = 20 - 10t = 0\\) at \\(t = 2\\), \\(h'' = -10 < 0\\): greatest height 20 m",
        },
        {
          prompt: "A shop can sell x items a day at \\(\\left(60 - \\dfrac{x}{2}\\right)\\) rupees each. How many items give the greatest revenue?",
          answer: "\\(R = 60x - \\dfrac{x^2}{2}\\), \\(R' = 60 - x = 0\\) at \\(x = 60\\), \\(R'' = -1 < 0\\): 60 items (revenue ₹ 1800)",
        },
      ],
      pyqExampleId: "94067e77-6764-4be7-8294-805e7f693f4c",
      traps: [
        {
          title: "Not checking that it is a maximum",
          body: "\\(f'(x) = 0\\) gives a critical point, which may be a minimum. Work out \\(f''\\) at that point and state its sign: the check carries a mark.",
        },
        {
          title: "Answering x when something else is asked",
          body: "If the question asks for the rebate, the greatest revenue or the least sum, find x first and then work out what was asked.",
        },
        {
          title: "Keeping a root that makes no sense",
          body: "\\(x^2 = 25\\) gives \\(x = \\pm 5\\). A length, a number of items or a positive number cannot be \\(-5\\): reject it and say why.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-shapes",
      name: "Optimisation with lengths, areas and volumes",
      intuition:
        "Most five-mark answers are of this kind: a fixed length of fencing, a fixed sheet of metal, a fixed volume or a fixed perimeter, and the greatest area or volume, or the least surface or cost. Two lengths are unknown, but the fixed quantity links them. Use it to remove one length, and the problem becomes one in a single variable.",
      definition:
        "- Draw and label a rough figure, with a letter for every length.\n" +
        "- Write two equations: the CONSTRAINT (the fixed quantity, such as \\(2x + y = 200\\)) and the quantity to make greatest or least (such as \\(A = xy\\)).\n" +
        "- Use the constraint to write the quantity in one variable, and state the values allowed (such as \\(0 < x < 100\\)).\n" +
        "- Differentiate, solve, and check with \\(f''\\). Then find every length the question asks for, and answer in its words.\n" +
        "- **Rolled** along a side: that side becomes the circumference \\(2\\pi r\\). **Revolved** about a side: that side is the axis (the height) and the other side is the radius.\n" +
        "- A cylinder open at the top has surface \\(\\pi r^2 + 2\\pi r h\\); a closed one, \\(2\\pi r^2 + 2\\pi r h\\).\n" +
        "- When the quantity has a square root in it, make its square greatest or least instead: it is greatest or least at the same point.",
      formula: {
        label: "Surface of an open box with a square base",
        latex: "S = x^2 + 4xh,\\qquad V = x^2 h",
        symbols: [
          { symbol: "\\(x\\)", meaning: "the side of the square base" },
          { symbol: "\\(h\\)", meaning: "the height of the box" },
        ],
      },
      authoredExample: {
        prompt:
          "An open box with a square base is to hold 32 cm\\(^3\\). Find its dimensions when the least amount of material is used.",
        steps: [
          "Let the base be x cm by x cm and the height h cm. Constraint: \\(x^2 h = 32\\), so \\(h = \\dfrac{32}{x^2}\\).",
          "Material (surface, no top): \\(S = x^2 + 4xh = x^2 + \\dfrac{128}{x}\\), for \\(x > 0\\).",
          "\\(\\dfrac{dS}{dx} = 2x - \\dfrac{128}{x^2}\\). Setting it to 0: \\(2x^3 = 128\\), \\(x^3 = 64\\), \\(x = 4\\).",
          "\\(\\dfrac{d^2S}{dx^2} = 2 + \\dfrac{256}{x^3}\\), which is \\(6 > 0\\) at \\(x = 4\\): a minimum.",
          "Then \\(h = \\dfrac{32}{16} = 2\\).",
        ],
        answer: "Base 4 cm by 4 cm, height 2 cm",
      },
      selfCheckExample: {
        prompt: "A rectangle has perimeter 40 cm. Find its sides when its area is greatest.",
        steps: ["Sides x and \\(20 - x\\): \\(A = 20x - x^2\\), \\(A' = 20 - 2x = 0\\) at \\(x = 10\\), \\(A'' = -2 < 0\\)."],
        answer: "10 cm by 10 cm: a square",
      },
      practiceSet: [
        {
          prompt: "Equal squares are cut from the corners of a square sheet of side 12 cm and the sides folded up to make an open box. Find the side of the square cut off for the greatest volume.",
          answer: "\\(V = x(12 - 2x)^2\\), \\(V' = (12 - 2x)(12 - 6x) = 0\\) gives \\(x = 2\\) in \\((0, 6)\\): 2 cm (volume 128 cm\\(^3\\))",
        },
        {
          prompt: "A rectangle of perimeter 18 cm is revolved about one of its sides. Find its dimensions when the cylinder has the greatest volume.",
          answer: "Radius x, height \\(9 - x\\): \\(V = \\pi x^2(9 - x)\\), greatest at \\(x = 6\\). The rectangle is 6 cm by 3 cm, revolved about the 3 cm side",
        },
        {
          prompt: "Of all closed cylinders of volume \\(16\\pi\\) cm\\(^3\\), find the radius of the one with the least total surface.",
          answer: "\\(h = \\dfrac{16}{r^2}\\), \\(S = 2\\pi r^2 + \\dfrac{32\\pi}{r}\\), \\(S' = 0\\) gives \\(r^3 = 8\\): radius 2 cm (height 4 cm)",
        },
      ],
      pyqExampleId: "295cd572-ff8e-4efc-a414-e6a4bd185ced",
      traps: [
        {
          title: "Rolled or revolved",
          body: "Rolling a sheet along a side makes that side the circumference \\(2\\pi r\\). Revolving a rectangle about a side makes that side the axis, with the other side as the radius. Read which one the question says before you write V.",
        },
        {
          title: "Open top or closed",
          body: "A tank or tumbler open at the top has ONE circular face, \\(\\pi r^2 + 2\\pi r h\\). A closed can has two, \\(2\\pi r^2 + 2\\pi r h\\).",
        },
        {
          title: "Giving x when the dimensions are asked",
          body: "'Find the dimensions' means every side. After finding x, find the other length from the constraint, and write both with units.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmad-distance",
      name: "Shortest distance and least sum of squares",
      intuition:
        "To find the point of a curve nearest to a given point, write the distance with the distance formula and use the curve's equation to put it in one variable. A square root is awkward to differentiate, so make the SQUARE of the distance least: it is least at the same point.",
      definition:
        "- Take a general point of the curve in one variable, such as \\((x, x^2)\\) on \\(y = x^2\\).\n" +
        "- The square of the distance from \\((a, b)\\) is \\(D^2 = (x - a)^2 + (y - b)^2\\). Make \\(D^2\\) least; the least distance is then \\(\\sqrt{D^2}\\).\n" +
        "- **Two poles on a road:** with a point x m from one pole, each ladder is a hypotenuse, \\(l^2 = (\\text{height of pole})^2 + (\\text{distance})^2\\). The sum of the squares is a quadratic in x.\n" +
        "- Check the least value with \\(f''\\) or the first derivative test, and give the point as well as the distance when both are asked.",
      formula: {
        label: "Square of the distance from (a, b) to (x, y)",
        latex: "D^2 = (x - a)^2 + (y - b)^2",
      },
      authoredExample: {
        prompt: "Find the points on the curve \\(y^2 = 4x\\) nearest to the point \\((3, 0)\\), and the least distance.",
        steps: [
          "For a point \\((x, y)\\) on the curve, \\(D^2 = (x - 3)^2 + y^2\\), and \\(y^2 = 4x\\) with \\(x \\ge 0\\).",
          "So \\(D^2 = (x - 3)^2 + 4x = x^2 - 2x + 9\\).",
          "\\(\\dfrac{d(D^2)}{dx} = 2x - 2 = 0\\) gives \\(x = 1\\); the second derivative is \\(2 > 0\\), so this is a minimum.",
          "At \\(x = 1\\), \\(y^2 = 4\\), so \\(y = \\pm 2\\).",
          "\\(D^2 = 1 - 2 + 9 = 8\\), so \\(D = 2\\sqrt{2}\\).",
        ],
        answer: "\\((1, 2)\\) and \\((1, -2)\\), at distance \\(2\\sqrt{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find the point on the line \\(y = x\\) nearest to the point \\((4, 2)\\).",
        steps: ["\\(D^2 = (x - 4)^2 + (x - 2)^2 = 2x^2 - 12x + 20\\), least where \\(4x - 12 = 0\\)."],
        answer: "\\((3, 3)\\), at distance \\(\\sqrt{2}\\)",
      },
      practiceSet: [
        {
          prompt: "Find the least distance of the point \\((0, 2)\\) from the curve \\(y = x^2\\).",
          answer: "With \\(u = x^2\\), \\(D^2 = u + (u - 2)^2\\), least at \\(u = \\dfrac{3}{2}\\): \\(D^2 = \\dfrac{7}{4}\\), so \\(D = \\dfrac{\\sqrt{7}}{2}\\)",
        },
        {
          prompt: "Find the points on the curve \\(x^2 = 8y\\) nearest to the point \\((0, 6)\\).",
          answer: "\\(D^2 = 8y + (y - 6)^2\\), least at \\(y = 2\\): the points \\((4, 2)\\) and \\((-4, 2)\\), at distance \\(4\\sqrt{2}\\)",
        },
        {
          prompt: "Why may you make \\(D^2\\) least instead of D?",
          answer: "D is positive, and of two positive numbers the larger has the larger square, so D and \\(D^2\\) are least at the same point",
        },
      ],
      pyqExampleId: "14081eae-41b6-4683-81dd-077c5d5aa29c",
      traps: [
        {
          title: "Differentiating the square root",
          body: "Making \\(\\sqrt{(x - 3)^2 + x^4}\\) least directly works but is long and easy to get wrong. Make the expression under the root least, and take the square root only at the end.",
        },
        {
          title: "Giving D² as the distance",
          body: "After you find the least value of \\(D^2\\), take its square root. If the least \\(D^2\\) is 9, the least distance is 3.",
        },
        {
          title: "Forgetting the second point",
          body: "On \\(y^2 = 4x\\) or \\(x^2 = 8y\\), one value of x or of y can give two points, mirror images in an axis. Both are nearest: give both.",
        },
      ],
    },
  ],
};
