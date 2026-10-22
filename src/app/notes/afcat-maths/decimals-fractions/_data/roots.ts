import type { SubtopicNote } from "@/app/notes/_types";

export const AF_DF_ROOTS_NOTE: SubtopicNote = {
  subtopicName: "Squares, Cubes and Roots",
  title: "Squares, Cubes and Their Roots, Including Decimals and Nested Roots",
  oneLineDefinition:
    "Know the squares and cubes by heart, find the nearest perfect square, take roots of decimals by halving or thirding the places, and open nested roots from the inside.",
  whyItMatters:
    "AFCAT asks from this page more than from any other in the chapter: seven of its past-year questions are here, from 2016 to 2019. Most are quick if the squares and cubes are known by heart. The marks go on the decimal places in a root, and on opening a nested root from the outside instead of the inside.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afdf-perfect-powers",
      name: "Perfect squares and cubes, and the nearest square",
      intuition:
        "Every number sits between two perfect squares. The least number to add reaches the square above it; the least number to subtract drops to the square below.",
      definition:
        "- Know the squares up to \\(30^2 = 900\\) and the cubes up to \\(15^3 = 3375\\); they make most roots one step.\n" +
        "- If \\(n^2 \\le N < (n + 1)^2\\): add \\((n + 1)^2 - N\\) to reach a square, or subtract \\(N - n^2\\).\n" +
        "- Rows of a square: if \\(N\\) people form a square with some left over, the square holds the largest perfect square below \\(N\\).\n" +
        "- The largest \\(k\\)-digit square is the square of the largest root that keeps \\(k\\) digits.\n" +
        "- Take square factors out of a root: \\(\\sqrt{72} = \\sqrt{36 \\times 2} = 6\\sqrt2\\).",
      formula: {
        label: "Reaching the nearest square",
        latex: "n^2 \\le N < (n + 1)^2: \\quad \\text{add } (n + 1)^2 - N \\text{ or subtract } N - n^2",
      },
      authoredExample: {
        prompt: "Find the least number to add to 1,000 to make a perfect square, and the least number to subtract.",
        steps: [
          "\\(31^2 = 961\\) and \\(32^2 = 1024\\), so 1,000 lies between them.",
          "Add \\(1024 - 1000 = 24\\), or subtract \\(1000 - 961 = 39\\).",
        ],
        answer: "Add 24, or subtract 39.",
      },
      selfCheckExample: {
        prompt: "1,300 cadets stand in a square formation and 4 are left over. How many stand in each row?",
        steps: ["The square holds \\(1300 - 4 = 1296\\) cadets.", "\\(\\sqrt{1296} = 36\\)."],
        answer: "\\(36\\).",
      },
      practiceSet: [
        { prompt: "What is the greatest 4-digit perfect square?", answer: "\\(9801\\)", method: "\\(99^2\\)." },
        { prompt: "What is the least number to add to 150 to make a perfect square?", answer: "\\(19\\)" },
        { prompt: "Which of 512, 729 and 1,000 is the cube of an odd number?", answer: "\\(729 = 9^3\\)" },
        { prompt: "Find \\(\\dfrac{\\sqrt{50}}{\\sqrt{8}}\\).", answer: "\\(\\tfrac52\\)", method: "\\(\\tfrac{5\\sqrt2}{2\\sqrt2}\\)." },
      ],
      pyqExampleId: "88374381-865c-4228-81e5-ee9462fc448a",
      traps: [
        {
          title: "Add uses the square above, subtract the square below",
          body: "For 300, the squares around it are \\(17^2 = 289\\) and \\(18^2 = 324\\). The least number to add is 24; the least to subtract is 11. Mixing them up gives the other one.",
        },
        {
          title: "Find the range from the number of digits",
          body: "The greatest 5-digit square is \\(316^2 = 99856\\), not \\(99^2\\), which has only four digits.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-decimal-roots",
      name: "Square and cube roots of decimals",
      intuition:
        "Squaring a number doubles its decimal places: \\(0.03^2 = 0.0009\\). So a square root halves them, and a cube root divides them by 3.",
      definition:
        "- A decimal has an exact square root only if its number of decimal places is even; the root has half as many.\n" +
        "- For a cube root the places must be a multiple of 3; the root has a third as many.\n" +
        "- Moving the point two places in the number moves it one place in the square root: if \\(\\sqrt{2116} = 46\\), then \\(\\sqrt{21.16} = 4.6\\).\n" +
        "- When the root is not exact, estimate from the nearest squares and pick the closest option.",
      formula: {
        label: "Roots of decimals",
        latex: "\\sqrt{\\dfrac{a}{10^{2n}}} = \\dfrac{\\sqrt a}{10^n}, \\qquad \\sqrt[3]{\\dfrac{a}{10^{3n}}} = \\dfrac{\\sqrt[3]{a}}{10^n}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{0.0049} + \\sqrt[3]{0.027}\\).",
        steps: [
          "\\(0.0049\\) has four places, so its root has two: \\(\\sqrt{0.0049} = 0.07\\).",
          "\\(0.027\\) has three places, so its cube root has one: \\(\\sqrt[3]{0.027} = 0.3\\).",
          "\\(0.07 + 0.3 = 0.37\\).",
        ],
        answer: "\\(0.37\\).",
      },
      selfCheckExample: {
        prompt: "Given \\(\\sqrt{2116} = 46\\), find \\(\\sqrt{21.16} + \\sqrt{0.2116}\\).",
        steps: ["Two places in 21.16: the root is \\(4.6\\).", "Four places in 0.2116: the root is \\(0.46\\)."],
        answer: "\\(5.06\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{0.000081}\\).", answer: "\\(0.009\\)" },
        { prompt: "Find \\(\\sqrt[3]{0.000125}\\).", answer: "\\(0.05\\)" },
        { prompt: "Find \\(\\sqrt{0.36} + \\sqrt{0.0036}\\).", answer: "\\(0.66\\)" },
        { prompt: "Estimate \\(\\sqrt{50} + \\sqrt{99}\\) to one decimal place.", answer: "About \\(17.0\\)", method: "\\(7.07 + 9.95\\)." },
      ],
      pyqExampleId: "a1985dd6-9433-4724-b914-b8b8a5f8a2f7",
      traps: [
        {
          title: "An odd number of places has no neat root",
          body: "\\(\\sqrt{0.09} = 0.3\\), but \\(\\sqrt{0.9}\\) is about \\(0.949\\). The \\(0.3\\) option for \\(\\sqrt{0.9}\\) is a trap.",
        },
        {
          title: "Halve the places, do not keep them",
          body: "\\(\\sqrt{0.0016} = 0.04\\), with two places. Writing \\(0.004\\) keeps three and is ten times too small.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afdf-nested-roots",
      name: "Nested and never-ending roots",
      intuition:
        "A root inside a root inside a root is opened like a set of boxes, from the innermost outwards. A root that goes on for ever contains a copy of itself, so call it \\(x\\) and write one equation.",
      definition:
        "- Finite nesting: evaluate the innermost root, add it to the number beside it, and take the next root. Each step is usually a perfect square.\n" +
        "- \\(x = \\sqrt{a + \\sqrt{a + \\sqrt{a + \\dots}}}\\): the part under the first root is \\(a + x\\), so \\(x^2 = a + x\\). Keep the positive root.\n" +
        "- \\(x = \\sqrt{a\\sqrt{a\\sqrt{a \\dots}}}\\): \\(x^2 = ax\\), so \\(x = a\\).",
      formula: {
        label: "A never-ending root",
        latex: "x = \\sqrt{a + \\sqrt{a + \\dots}} \\;\\Rightarrow\\; x^2 = a + x",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{28 + \\sqrt{50 + \\sqrt{176 + \\sqrt{400}}}}\\).",
        steps: [
          "\\(\\sqrt{400} = 20\\), and \\(\\sqrt{176 + 20} = \\sqrt{196} = 14\\).",
          "\\(\\sqrt{50 + 14} = \\sqrt{64} = 8\\).",
          "\\(\\sqrt{28 + 8} = \\sqrt{36} = 6\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt{2 + \\sqrt{2 + \\sqrt{2 + \\dots}}}\\).",
        steps: ["\\(x^2 = 2 + x\\), so \\(x^2 - x - 2 = 0\\).", "\\((x - 2)(x + 1) = 0\\); a root is positive."],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{56 + \\sqrt{56 + \\sqrt{56 + \\dots}}}\\).", answer: "\\(8\\)" },
        { prompt: "Find \\(\\sqrt{7\\sqrt{7\\sqrt{7 \\dots}}}\\).", answer: "\\(7\\)" },
        { prompt: "Find \\(\\sqrt{90 + \\sqrt{100}}\\).", answer: "\\(10\\)" },
        { prompt: "Find \\(\\sqrt{42 + \\sqrt{42 + \\sqrt{42 + \\dots}}}\\).", answer: "\\(7\\)" },
      ],
      pyqExampleId: "f0c1a9fc-3f13-4ee2-86d6-87bd48616dc3",
      traps: [
        {
          title: "Start at the innermost root",
          body: "In \\(\\sqrt{90 + \\sqrt{100}}\\) the \\(\\sqrt{100}\\) comes first. A root does not split over a sum: \\(\\sqrt{36 + 64} = 10\\), not \\(6 + 8\\).",
        },
        {
          title: "Keep the positive root",
          body: "\\(x^2 - x - 2 = 0\\) has roots 2 and \\(-1\\). A square root is never negative, so the answer is 2.",
        },
      ],
    },
  ],
};
