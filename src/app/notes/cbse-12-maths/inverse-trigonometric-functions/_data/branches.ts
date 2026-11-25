import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_IT_BRANCHES_NOTE: SubtopicNote = {
  subtopicName: "Domains, Ranges and Principal Value Branches",
  title: "Domains, Ranges and Principal Value Branches",
  oneLineDefinition:
    "Each trigonometric function is made one-one and onto on one chosen interval, its principal value branch; the inverse function takes the matching domain and returns an angle from that interval only.",
  whyItMatters:
    "59 questions, forty-six of them from board papers from 2023 to 2026, the most of any page in this chapter. The board asks for the domain of a function such as sin⁻¹(x² − 4) or sec⁻¹(2x + 1) (every year from 2023 to 2026), the principal value branch of a function or the one written wrongly (2023 to 2026), the range of an expression such as 2 cos⁻¹x (2023, 2025, 2026), and a graph to draw (2023, 2024) or to name (2025, 2026). In 2026 a long answer asked for a domain, an equation and a range together. The textbook adds the principal values of all six functions.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cbmit-branches",
      name: "The six principal value branches and principal values",
      intuition:
        "Sine takes the value \\(\\dfrac{1}{2}\\) again and again, at \\(\\dfrac{\\pi}{6}\\), \\(\\dfrac{5\\pi}{6}\\), \\(\\dfrac{13\\pi}{6}\\) and so on. So sine is not one-one on all real numbers and has no inverse there. Cut it down to one interval where it rises once through every value from \\(-1\\) to 1, and it has an inverse. The book picks one such interval for each function: the principal value branch. Every answer to a principal value question must come from that interval.",
      definition:
        "- An inverse exists only for a function that is **one-one and onto**. Restrict each trigonometric function to an interval where it is one-one and takes all its values once.\n" +
        "- Sine is one-one and onto \\([-1, 1]\\) on \\(\\left[-\\dfrac{3\\pi}{2}, -\\dfrac{\\pi}{2}\\right]\\), \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\), \\(\\left[\\dfrac{\\pi}{2}, \\dfrac{3\\pi}{2}\\right]\\) and so on. Each gives a **branch** of \\(\\sin^{-1}\\); the one with range \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\) is the **principal value branch**.\n" +
        "- In the same way \\(\\cos^{-1}\\) has branches with ranges \\([-\\pi, 0]\\), \\([0, \\pi]\\), \\([\\pi, 2\\pi]\\); the principal one is \\([0, \\pi]\\).\n" +
        "- When no branch is named, the principal value branch is meant. A value of the inverse function in that branch is its **principal value**.\n" +
        "- To find a principal value: let the inverse equal \\(y\\), write the ratio of \\(y\\) equal to the number, then choose the one \\(y\\) inside the branch.\n" +
        "- For a negative number: \\(\\sin^{-1}\\), \\(\\tan^{-1}\\) and \\(\\operatorname{cosec}^{-1}\\) give a negative angle; \\(\\cos^{-1}\\), \\(\\sec^{-1}\\) and \\(\\cot^{-1}\\) give \\(\\pi\\) minus the acute angle.",
      table: {
        columns: ["Function", "Domain", "Principal value branch (range)"],
        rows: [
          {
            cells: ["\\(\\sin^{-1}x\\)", "\\([-1, 1]\\)", "\\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\)"],
          },
          {
            cells: ["\\(\\cos^{-1}x\\)", "\\([-1, 1]\\)", "\\([0, \\pi]\\)"],
            pyqExampleId: "4d7cd6ad-6ab4-4d94-8a00-31ff5895c4d3",
            noteAmber: "Board 2025 asked for the principal branch of cos⁻¹x. Board 2024 asked an assertion that wrongly removed π/2 from it: nothing is removed, cos⁻¹0 = π/2.",
          },
          {
            cells: ["\\(\\operatorname{cosec}^{-1}x\\)", "\\(R - (-1, 1)\\)", "\\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right] - \\{0\\}\\)"],
          },
          {
            cells: ["\\(\\sec^{-1}x\\)", "\\(R - (-1, 1)\\)", "\\([0, \\pi] - \\left\\{\\dfrac{\\pi}{2}\\right\\}\\)"],
          },
          {
            cells: ["\\(\\tan^{-1}x\\)", "\\(R\\)", "\\(\\left(-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right)\\)"],
            pyqExampleId: "706e609f-56cc-4a9d-a51b-3bcb7a6c60ac",
            noteAmber: "Board 2023 asked for the domain and range of tan⁻¹x. Both ends of the range are open: tan is not defined at ±π/2.",
          },
          {
            cells: ["\\(\\cot^{-1}x\\)", "\\(R\\)", "\\((0, \\pi)\\)"],
            pyqExampleId: "3dcb9a54-1b25-4f8e-a9d4-13a4104a804e",
            noteAmber: "Board 2025 asked for the principal value of cot⁻¹ at a negative number. The answer is an obtuse angle in (0, π), never a negative angle.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "Find the principal value of \\(\\operatorname{cosec}^{-1}\\left(-\\dfrac{2}{\\sqrt{3}}\\right)\\).",
        steps: [
          "Let \\(\\operatorname{cosec}^{-1}\\left(-\\dfrac{2}{\\sqrt{3}}\\right) = y\\). Then \\(\\operatorname{cosec} y = -\\dfrac{2}{\\sqrt{3}}\\), so \\(\\sin y = -\\dfrac{\\sqrt{3}}{2}\\).",
          "\\(\\sin\\left(-\\dfrac{\\pi}{3}\\right) = -\\dfrac{\\sqrt{3}}{2}\\), and \\(-\\dfrac{\\pi}{3}\\) lies in \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right] - \\{0\\}\\).",
          "\\(\\therefore\\) the principal value is \\(-\\dfrac{\\pi}{3}\\).",
        ],
        answer: "\\(-\\dfrac{\\pi}{3}\\)",
      },
      practiceSet: [
        { prompt: "Find the principal value of \\(\\tan^{-1}\\left(-\\dfrac{1}{\\sqrt{3}}\\right)\\).", answer: "\\(-\\dfrac{\\pi}{6}\\)" },
        { prompt: "Find the principal value of \\(\\cot^{-1}(-1)\\).", answer: "\\(\\dfrac{3\\pi}{4}\\)", method: "\\(\\pi - \\dfrac{\\pi}{4}\\), since the branch is \\((0, \\pi)\\)." },
        { prompt: "Find the principal value of \\(\\sec^{-1}(-2)\\).", answer: "\\(\\dfrac{2\\pi}{3}\\)", method: "\\(\\cos y = -\\dfrac{1}{2}\\) with \\(y\\) in \\([0, \\pi]\\)." },
        { prompt: "Give one interval, other than the principal branch, on which \\(\\cos x\\) has an inverse.", answer: "\\([\\pi, 2\\pi]\\) (or \\([-\\pi, 0]\\))" },
      ],
      pyqExampleId: "2df052e3-c679-461f-83a4-097eae42cc8a",
      traps: [
        {
          title: "A negative answer for cos⁻¹, sec⁻¹ or cot⁻¹",
          body: "These three branches lie in \\([0, \\pi]\\). For a negative number the answer is \\(\\pi\\) minus the acute angle, such as \\(\\cot^{-1}(-1) = \\dfrac{3\\pi}{4}\\), never \\(-\\dfrac{\\pi}{4}\\).",
        },
        {
          title: "Forgetting the point taken out",
          body: "The branch of \\(\\operatorname{cosec}^{-1}\\) leaves out 0 and the branch of \\(\\sec^{-1}\\) leaves out \\(\\dfrac{\\pi}{2}\\): cosec is not defined at 0 and sec is not defined at \\(\\dfrac{\\pi}{2}\\). The branches of \\(\\sin^{-1}\\) and \\(\\cos^{-1}\\) leave out nothing.",
        },
        {
          title: "Open and closed brackets mixed up",
          body: "\\(\\sin^{-1}\\) and \\(\\cos^{-1}\\) reach their end values, so their branches are closed. \\(\\tan^{-1}\\) and \\(\\cot^{-1}\\) never reach theirs, so their branches are open.",
        },
        {
          title: "Reading sin⁻¹ x as 1/sin x",
          body: "\\(\\sin^{-1}x\\) is an angle whose sine is \\(x\\). It is not \\((\\sin x)^{-1} = \\dfrac{1}{\\sin x}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-domain",
      name: "The domain of an inverse function of an expression",
      intuition:
        "\\(\\sin^{-1}\\) and \\(\\cos^{-1}\\) accept only numbers from \\(-1\\) to 1. \\(\\sec^{-1}\\) and \\(\\operatorname{cosec}^{-1}\\) accept only numbers that are at least 1 in size. So the domain of \\(\\sin^{-1}\\) of an expression is every \\(x\\) that keeps the expression inside the allowed set: write that condition and solve it.",
      definition:
        "- For \\(\\sin^{-1}u\\) or \\(\\cos^{-1}u\\): solve \\(-1 \\le u \\le 1\\).\n" +
        "- For \\(\\sec^{-1}u\\) or \\(\\operatorname{cosec}^{-1}u\\): solve \\(u \\le -1\\) or \\(u \\ge 1\\), that is \\(|u| \\ge 1\\).\n" +
        "- For \\(\\tan^{-1}u\\) or \\(\\cot^{-1}u\\): every real \\(u\\) is allowed.\n" +
        "- A sum of two functions is defined where **both** are defined: take the intersection of the two domains.\n" +
        "- With \\(x^2\\) in the expression, \\(a \\le x^2 \\le b\\) (with \\(0 < a\\)) gives two pieces: \\([-\\sqrt{b}, -\\sqrt{a}] \\cup [\\sqrt{a}, \\sqrt{b}]\\).\n" +
        "- **Solving** \\(\\cos^{-1}u = \\alpha\\) (with \\(\\alpha\\) in the branch): write \\(u = \\cos\\alpha\\), solve for \\(x\\), and keep only the values inside the domain.",
      formula: {
        label: "Condition for the domain",
        latex: "\\sin^{-1}u,\\ \\cos^{-1}u:\\ -1 \\le u \\le 1 \\qquad \\sec^{-1}u,\\ \\operatorname{cosec}^{-1}u:\\ |u| \\ge 1",
        symbols: [{ symbol: "\\(u\\)", meaning: "the expression in x inside the inverse function" }],
      },
      authoredExample: {
        prompt: "Find the domain of \\(h(x) = \\cos^{-1}(x^2 - 2)\\). Hence find the values of \\(x\\) for which \\(h(x) = \\dfrac{\\pi}{2}\\).",
        steps: [
          "\\(\\cos^{-1}u\\) is defined only for \\(-1 \\le u \\le 1\\), so \\(-1 \\le x^2 - 2 \\le 1\\).",
          "Adding 2 throughout: \\(1 \\le x^2 \\le 3\\).",
          "\\(x^2 \\ge 1\\) gives \\(x \\le -1\\) or \\(x \\ge 1\\); \\(x^2 \\le 3\\) gives \\(-\\sqrt{3} \\le x \\le \\sqrt{3}\\).",
          "Domain: \\([-\\sqrt{3}, -1] \\cup [1, \\sqrt{3}]\\).",
          "\\(h(x) = \\dfrac{\\pi}{2}\\) gives \\(x^2 - 2 = \\cos\\dfrac{\\pi}{2} = 0\\), so \\(x^2 = 2\\) and \\(x = \\pm\\sqrt{2}\\).",
          "Both values lie in the domain, since \\(1 < \\sqrt{2} < \\sqrt{3}\\).",
        ],
        answer: "Domain \\([-\\sqrt{3}, -1] \\cup [1, \\sqrt{3}]\\); \\(x = \\pm\\sqrt{2}\\)",
      },
      selfCheckExample: {
        prompt: "Find the domain of \\(f(x) = \\sin^{-1}\\dfrac{x}{2} + \\cos^{-1}(x - 1)\\).",
        steps: [
          "\\(\\sin^{-1}\\dfrac{x}{2}\\): \\(-1 \\le \\dfrac{x}{2} \\le 1\\), so \\(-2 \\le x \\le 2\\).",
          "\\(\\cos^{-1}(x - 1)\\): \\(-1 \\le x - 1 \\le 1\\), so \\(0 \\le x \\le 2\\).",
          "Both must hold: the intersection is \\([0, 2]\\).",
        ],
        answer: "\\([0, 2]\\)",
      },
      practiceSet: [
        { prompt: "Find the domain of \\(\\cos^{-1}(3x + 2)\\).", answer: "\\(\\left[-1, -\\dfrac{1}{3}\\right]\\)" },
        { prompt: "Find the domain of \\(\\sin^{-1}\\sqrt{2x}\\).", answer: "\\(\\left[0, \\dfrac{1}{2}\\right]\\)", method: "The root needs \\(x \\ge 0\\); then \\(\\sqrt{2x} \\le 1\\) gives \\(x \\le \\dfrac{1}{2}\\)." },
        { prompt: "Find the domain of \\(\\tan^{-1}(x^2 + 5)\\).", answer: "\\(R\\), every real number" },
        { prompt: "Why does \\(\\sec^{-1}\\dfrac{1}{2}\\) have no value?", answer: "\\(|\\sec\\theta| \\ge 1\\) for every angle, so no angle has secant \\(\\dfrac{1}{2}\\); \\(\\dfrac{1}{2}\\) is outside the domain \\(R - (-1, 1)\\)" },
      ],
      pyqExampleId: "551808d9-1ead-47f8-946a-2aff70fddb83",
      traps: [
        {
          title: "Losing the negative piece",
          body: "From \\(1 \\le x^2 \\le 3\\) some students write only \\(1 \\le x \\le \\sqrt{3}\\). \\(x^2\\) is the same for \\(x\\) and \\(-x\\), so the domain has a negative piece too.",
        },
        {
          title: "Not turning the inequality round",
          body: "From \\(-2 \\le -2x \\le 0\\), dividing by \\(-2\\) turns both signs round: \\(0 \\le x \\le 1\\). Keeping the signs gives an empty set.",
        },
        {
          title: "One interval for sec⁻¹ or cosec⁻¹",
          body: "\\(|u| \\ge 1\\) is two conditions, \\(u \\le -1\\) or \\(u \\ge 1\\). The domain then has two parts going off to \\(-\\infty\\) and \\(+\\infty\\).",
        },
        {
          title: "Open brackets at the ends",
          body: "\\(\\sin^{-1}(\\pm 1)\\) and \\(\\cos^{-1}(\\pm 1)\\) exist, so the end points belong to the domain: write closed brackets.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmit-range",
      name: "The range of an expression in an inverse function",
      intuition:
        "If you know where \\(\\sin^{-1}x\\) lives, you know where \\(2\\sin^{-1}x + 1\\) lives: start from the branch and do to all three parts of the inequality what the expression does to \\(\\sin^{-1}x\\). Keep each end closed or open exactly as the branch has it.",
      definition:
        "- Start from the branch as an inequality: \\(-\\dfrac{\\pi}{2} \\le \\sin^{-1}x \\le \\dfrac{\\pi}{2}\\), \\(0 \\le \\cos^{-1}x \\le \\pi\\), \\(-\\dfrac{\\pi}{2} < \\tan^{-1}x < \\dfrac{\\pi}{2}\\), \\(0 < \\cot^{-1}x < \\pi\\).\n" +
        "- Multiply or divide all three parts by the same number (turn the signs round for a negative number), then add or subtract.\n" +
        "- When \\(x\\) is limited to part of the domain, put the end values of \\(x\\) into the function: \\(\\sin^{-1}\\) and \\(\\tan^{-1}\\) increase, \\(\\cos^{-1}\\) and \\(\\cot^{-1}\\) decrease.\n" +
        "- **Assertion and reason** (1 mark). Judge A and R separately first. Codes: (A) both true and R explains A; (B) both true but R does not explain A; (C) A true, R false; (D) A false, R true.",
      formula: {
        label: "Range of a times an inverse function plus b, with a positive",
        latex: "-\\frac{\\pi}{2} \\le \\sin^{-1}x \\le \\frac{\\pi}{2} \\ \\Rightarrow\\ -\\frac{a\\pi}{2} + b \\le a\\sin^{-1}x + b \\le \\frac{a\\pi}{2} + b",
        symbols: [
          { symbol: "\\(a\\)", meaning: "a positive number multiplying the inverse function" },
          { symbol: "\\(b\\)", meaning: "the number added" },
        ],
      },
      authoredExample: {
        prompt: "Find the range of \\(g(x) = 4\\sin^{-1}x + \\dfrac{\\pi}{2}\\).",
        steps: [
          "\\(-\\dfrac{\\pi}{2} \\le \\sin^{-1}x \\le \\dfrac{\\pi}{2}\\) for every \\(x\\) in \\([-1, 1]\\), and both ends are reached.",
          "Multiply by 4: \\(-2\\pi \\le 4\\sin^{-1}x \\le 2\\pi\\).",
          "Add \\(\\dfrac{\\pi}{2}\\): \\(-\\dfrac{3\\pi}{2} \\le 4\\sin^{-1}x + \\dfrac{\\pi}{2} \\le \\dfrac{5\\pi}{2}\\).",
        ],
        answer: "\\(\\left[-\\dfrac{3\\pi}{2}, \\dfrac{5\\pi}{2}\\right]\\)",
      },
      selfCheckExample: {
        prompt: "If \\(y = \\cos^{-1}x\\) and \\(0 \\le x \\le 1\\), find the range of \\(y\\).",
        steps: [
          "\\(\\cos^{-1}\\) decreases, so the largest value is at \\(x = 0\\) and the smallest at \\(x = 1\\).",
          "\\(\\cos^{-1}0 = \\dfrac{\\pi}{2}\\) and \\(\\cos^{-1}1 = 0\\); both are reached.",
        ],
        answer: "\\(\\left[0, \\dfrac{\\pi}{2}\\right]\\)",
      },
      practiceSet: [
        { prompt: "If \\(\\cot^{-1}x = 2y\\), between which values does \\(y\\) lie?", answer: "\\(0 < y < \\dfrac{\\pi}{2}\\)" },
        { prompt: "Find the maximum value of \\((\\sin^{-1}x)^2\\).", answer: "\\(\\dfrac{\\pi^2}{4}\\), at \\(x = 1\\) and at \\(x = -1\\)" },
        { prompt: "Find the range of \\(\\tan^{-1}x + \\dfrac{\\pi}{4}\\).", answer: "\\(\\left(-\\dfrac{\\pi}{4}, \\dfrac{3\\pi}{4}\\right)\\)" },
      ],
      pyqExampleId: "5fe74138-1539-4fb6-8fd5-6463cc08366c",
      traps: [
        {
          title: "Closing an open end",
          body: "\\(\\tan^{-1}x\\) never equals \\(\\pm\\dfrac{\\pi}{2}\\), so a range built from it keeps strict signs \\(<\\). Writing \\(\\le\\) picks the wrong option.",
        },
        {
          title: "Squaring the two ends",
          body: "The range of \\((\\sin^{-1}x)^2\\) is \\(\\left[0, \\dfrac{\\pi^2}{4}\\right]\\), not \\(\\left[\\dfrac{\\pi^2}{4}, \\dfrac{\\pi^2}{4}\\right]\\): \\(\\sin^{-1}x\\) passes through 0, where the square is smallest.",
        },
        {
          title: "Borrowing the wrong branch in a reason",
          body: "In assertion-reason items the reason often gives \\(\\sin^{-1}\\) the branch \\([0, \\pi]\\) or \\(\\cos^{-1}\\) the branch \\(\\left[-\\dfrac{\\pi}{2}, \\dfrac{\\pi}{2}\\right]\\). Check each statement against the table before you pick a code.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmit-graphs",
      name: "Graphs of the inverse trigonometric functions",
      intuition:
        "If \\((a, b)\\) is a point on the graph of sine, then \\((b, a)\\) is a point on the graph of \\(\\sin^{-1}\\). So the graph of an inverse function is the graph of the function with the axes interchanged: its mirror image in the line \\(y = x\\). Take only the part of the function's graph over the principal branch, and reflect that.",
      definition:
        "- To draw \\(y = \\sin^{-1}x\\): draw \\(y = \\sin x\\) for \\(-\\dfrac{\\pi}{2} \\le x \\le \\dfrac{\\pi}{2}\\) and reflect it in \\(y = x\\).\n" +
        "- Mark the end points and one middle point, label both axes, and mark the values \\(\\pm 1\\) on the x-axis and the branch values on the y-axis.\n" +
        "- To name a printed graph, read four things: the x values it covers, the y values it covers, whether it rises or falls, and the horizontal lines it comes close to.\n" +
        "- For a part of the domain, such as \\(x\\) from \\(-1\\) to 0, draw only that piece; its range is read from its two end points.",
      table: {
        columns: ["Graph", "Drawn over", "Shape", "Points and lines to mark"],
        rows: [
          {
            cells: ["\\(y = \\sin^{-1}x\\)", "\\([-1, 1]\\)", "rises", "\\(\\left(-1, -\\dfrac{\\pi}{2}\\right)\\), \\((0, 0)\\), \\(\\left(1, \\dfrac{\\pi}{2}\\right)\\)"],
            pyqExampleId: "9180cd17-7ff2-417a-892a-ece14e266081",
            noteAmber: "Board 2023 asked for the graph of sin⁻¹x over part of [−1, 1] and its range: mark the end points of that piece only.",
          },
          {
            cells: ["\\(y = \\cos^{-1}x\\)", "\\([-1, 1]\\)", "falls", "\\((-1, \\pi)\\), \\(\\left(0, \\dfrac{\\pi}{2}\\right)\\), \\((1, 0)\\)"],
          },
          {
            cells: ["\\(y = \\tan^{-1}x\\)", "all real \\(x\\)", "rises through the origin", "lines \\(y = -\\dfrac{\\pi}{2}\\) and \\(y = \\dfrac{\\pi}{2}\\), never reached"],
            pyqExampleId: "cf58dcd3-21b4-44c8-9dde-62f05b0c4f7c",
            noteAmber: "Board 2025 printed this graph and asked which function it is.",
          },
          {
            cells: ["\\(y = \\cot^{-1}x\\)", "all real \\(x\\)", "falls, always above the x-axis", "\\(\\left(0, \\dfrac{\\pi}{2}\\right)\\); lines \\(y = \\pi\\) and \\(y = 0\\), never reached"],
            pyqExampleId: "92f01a66-88c5-4259-aadc-230905e2f7df",
            noteAmber: "Board 2026 printed this graph and asked which function it is.",
          },
          {
            cells: ["\\(y = \\sec^{-1}x\\)", "\\(x \\le -1\\) and \\(x \\ge 1\\)", "two pieces, both rising", "\\((1, 0)\\), \\((-1, \\pi)\\); line \\(y = \\dfrac{\\pi}{2}\\), never reached"],
            pyqExampleId: "5a92335a-836a-4efe-be8c-46102375c8ac",
            noteAmber: "Board 2025 printed this graph and asked which function it is.",
          },
          {
            cells: ["\\(y = \\operatorname{cosec}^{-1}x\\)", "\\(x \\le -1\\) and \\(x \\ge 1\\)", "two pieces, both falling", "\\(\\left(1, \\dfrac{\\pi}{2}\\right)\\), \\(\\left(-1, -\\dfrac{\\pi}{2}\\right)\\); line \\(y = 0\\), never reached"],
            pyqExampleId: "f308ba95-6165-4034-822f-7ac496f8bf99",
            noteAmber: "Board 2026 printed this graph and asked which function it is.",
          },
        ],
      },
      selfCheckExample: {
        prompt: "The graph of \\(y = \\sin^{-1}x\\) is drawn only for \\(-\\dfrac{1}{2} \\le x \\le 1\\). Write its end points and its range.",
        steps: [
          "\\(\\sin^{-1}\\left(-\\dfrac{1}{2}\\right) = -\\dfrac{\\pi}{6}\\) and \\(\\sin^{-1}1 = \\dfrac{\\pi}{2}\\).",
          "\\(\\sin^{-1}\\) rises, so the piece runs from \\(\\left(-\\dfrac{1}{2}, -\\dfrac{\\pi}{6}\\right)\\) up to \\(\\left(1, \\dfrac{\\pi}{2}\\right)\\).",
        ],
        answer: "Range \\(\\left[-\\dfrac{\\pi}{6}, \\dfrac{\\pi}{2}\\right]\\)",
      },
      practiceSet: [
        { prompt: "How is the graph of \\(y = \\cos^{-1}x\\) got from the graph of \\(y = \\cos x\\)?", answer: "Take \\(y = \\cos x\\) for \\(0 \\le x \\le \\pi\\) and reflect it in the line \\(y = x\\) (interchange the axes)" },
        { prompt: "Which two inverse trigonometric functions have no graph between \\(x = -1\\) and \\(x = 1\\)?", answer: "\\(\\sec^{-1}x\\) and \\(\\operatorname{cosec}^{-1}x\\)" },
        { prompt: "Does the graph of \\(y = \\tan^{-1}x\\) ever reach the line \\(y = \\dfrac{\\pi}{2}\\)?", answer: "No. It comes closer and closer as \\(x\\) grows but never reaches it" },
      ],
      pyqExampleId: "4731b867-2f15-426b-bc6e-f6d53e1e4247",
      traps: [
        {
          title: "Drawing the whole wave",
          body: "The graph of \\(\\cos^{-1}x\\) is one arc from \\((-1, \\pi)\\) to \\((1, 0)\\), not a wave. Reflect only the part of \\(y = \\cos x\\) over \\([0, \\pi]\\).",
        },
        {
          title: "No marked points",
          body: "A sketch with unlabelled axes and no marked end points loses marks. Mark the end points, one middle point and the branch values on the y-axis.",
        },
        {
          title: "Mixing up tan⁻¹ and cot⁻¹",
          body: "Both cover all real \\(x\\). \\(\\tan^{-1}\\) rises through the origin and goes below the x-axis; \\(\\cot^{-1}\\) falls and stays between 0 and \\(\\pi\\).",
        },
      ],
    },
  ],
};
