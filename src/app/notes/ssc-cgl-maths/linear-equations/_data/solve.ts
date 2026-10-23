import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_LE_SOLVE_NOTE: SubtopicNote = {
  subtopicName: "Solving Linear Systems",
  title: "Solving Linear Systems",
  oneLineDefinition:
    "Remove one unknown at a time, by adding, subtracting or substituting equations, until one equation in one unknown is left; then check the answer in an equation you did not use.",
  whyItMatters:
    "Ten questions in the bank, six EASY and four MODERATE: three solve a pair of equations, five solve a set of three, and two are fastest by putting the options back into the equations. Every word problem and age problem later in this chapter ends with an equation or a pair of equations solved the way this page teaches.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssclesv-two",
      name: "Solving two equations in two unknowns",
      intuition:
        "One equation in x and y is true for endless pairs of numbers. A second equation keeps only the pairs that fit both, and for most pairs of equations that is a single pair. To find it, get rid of one unknown so that one equation in one unknown is left.",
      definition:
        "- **Elimination:** multiply one or both equations so that one unknown has the same coefficient in both, then add or subtract the equations to remove it.\n" +
        "- **Substitution:** when one equation already gives one unknown on its own, such as \\(y = 2x + 3\\), put that expression into the other equation.\n" +
        "- **Two equations of the form y = ...:** set the two right sides equal, since both equal \\(y\\).\n" +
        "- **Sum and difference:** if \\(x + y = S\\) and \\(x - y = D\\), add to get \\(2x = S + D\\) and subtract to get \\(2y = S - D\\).\n" +
        "- Find the second unknown from either equation, then check the pair in the other one. The check takes five seconds and catches most slips.",
      formula: {
        label: "Sum and difference of two numbers",
        latex: "x + y = S,\\; x - y = D \\;\\Rightarrow\\; x = \\frac{S + D}{2},\\; y = \\frac{S - D}{2}",
        symbols: [
          { symbol: "S", meaning: "the sum of the two numbers" },
          { symbol: "D", meaning: "the difference, larger minus smaller" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(2x + 3y = 13\\) and \\(4x - y = 5\\).",
        steps: [
          "The second equation has \\(-y\\); multiply it by 3 so the \\(y\\) terms match: \\(12x - 3y = 15\\).",
          "Add this to the first equation: the \\(y\\) terms cancel and \\(14x = 28\\), so \\(x = 2\\).",
          "Put \\(x = 2\\) into \\(4x - y = 5\\): \\(8 - y = 5\\), so \\(y = 3\\).",
          "Check in the first equation: \\(2(2) + 3(3) = 4 + 9 = 13\\).",
        ],
        answer: "\\(x = 2,\\ y = 3\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(y = 5 - 2x\\) and \\(3x + 4y = 10\\).",
        steps: [
          "The first equation gives \\(y\\) on its own, so substitute: \\(3x + 4(5 - 2x) = 10\\).",
          "\\(3x + 20 - 8x = 10\\), so \\(-5x = -10\\) and \\(x = 2\\).",
          "Then \\(y = 5 - 4 = 1\\). Check: \\(3(2) + 4(1) = 10\\).",
        ],
        answer: "\\(x = 2,\\ y = 1\\)",
      },
      practiceSet: [
        {
          prompt: "The sum of two numbers is 50 and their difference is 14. Find the larger number.",
          answer: "32",
          method: "\\(\\frac{50 + 14}{2} = 32\\); the smaller is \\(\\frac{50 - 14}{2} = 18\\).",
        },
        {
          prompt: "Solve \\(x + y = 9\\) and \\(2x - y = 6\\).",
          answer: "\\(x = 5,\\ y = 4\\)",
          method: "Add: \\(3x = 15\\).",
        },
        {
          prompt: "Solve \\(y = 3x - 1\\) and \\(y = x + 5\\).",
          answer: "\\(x = 3,\\ y = 8\\)",
          method: "\\(3x - 1 = x + 5\\), so \\(2x = 6\\).",
        },
        {
          prompt: "Solve \\(4x + 3y = 18\\) and \\(2x - 3y = 0\\).",
          answer: "\\(x = 3,\\ y = 2\\)",
          method: "Add: \\(6x = 18\\).",
        },
      ],
      pyqExampleId: "a0c5830a-d396-4612-b8a2-112c465d6fe1",
      traps: [
        {
          title: "Stopping at the first unknown",
          body:
            "Finding \\(x\\) is half the job. An option may print only the other number, or a pair with the right \\(x\\) and a wrong \\(y\\). Find both values and check the pair in the equation you did not use last.",
        },
        {
          title: "Subtracting only part of an equation",
          body:
            "When you subtract one equation from another, subtract every term, the constant included: \\((2x + 3y) - (2x - y) = 4y\\), not \\(2y\\), and the right sides are subtracted too.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclesv-three",
      name: "Solving three equations in three unknowns",
      intuition:
        "Three unknowns need three equations. Use two different pairs of them to remove the same unknown, and you are back to two equations in two unknowns, which you already know how to solve.",
      definition:
        "- Pick the unknown that is easiest to remove: one with coefficient 1, or one that is missing from an equation already.\n" +
        "- Combine two **different** pairs of equations to remove that same unknown. This gives two equations in the other two unknowns.\n" +
        "- Solve that pair, then put both values into the simplest original equation to get the third unknown.\n" +
        "- **Fast route, sign pattern:** when the equations differ only in signs, such as \\(x + y + z\\) and \\(x + y - z\\), subtracting one from the other leaves \\(2z\\) at once.\n" +
        "- **Fast route, symmetric set:** for \\(x + y = p\\), \\(y + z = q\\), \\(z + x = r\\), add all three. Each unknown appears twice, so \\(x + y + z = \\frac{p + q + r}{2}\\); subtract each equation from this to get the unknown it leaves out.\n" +
        "- If the options print full values, testing them can be quicker still (the next concept).",
      formula: {
        label: "Symmetric set of three equations",
        latex: "x + y = p,\\; y + z = q,\\; z + x = r \\;\\Rightarrow\\; x + y + z = \\frac{p + q + r}{2}",
        symbols: [
          { symbol: "p, q, r", meaning: "the three pair sums" },
        ],
      },
      authoredExample: {
        prompt: "Solve \\(x + y + z = 9\\), \\(x - y + 2z = 7\\) and \\(2x + y - z = 3\\).",
        steps: [
          "Remove \\(z\\). Add the first and third equations: \\(3x + 2y = 12\\).",
          "Twice the first minus the second: \\((2x + 2y + 2z) - (x - y + 2z) = 18 - 7\\), so \\(x + 3y = 11\\).",
          "From \\(x = 11 - 3y\\): \\(3(11 - 3y) + 2y = 12\\), so \\(33 - 7y = 12\\), \\(y = 3\\) and \\(x = 2\\).",
          "Then \\(z = 9 - 2 - 3 = 4\\). Check in the second equation: \\(2 - 3 + 8 = 7\\).",
        ],
        answer: "\\(x = 2,\\ y = 3,\\ z = 4\\)",
      },
      selfCheckExample: {
        prompt: "Solve \\(x + y = 7\\), \\(y + z = 9\\) and \\(z + x = 8\\).",
        steps: [
          "Add all three: \\(2(x + y + z) = 24\\), so \\(x + y + z = 12\\).",
          "\\(x = 12 - 9 = 3\\), \\(y = 12 - 8 = 4\\), \\(z = 12 - 7 = 5\\).",
          "Check: \\(3 + 4 = 7\\), \\(4 + 5 = 9\\), \\(5 + 3 = 8\\).",
        ],
        answer: "\\(x = 3,\\ y = 4,\\ z = 5\\)",
      },
      practiceSet: [
        {
          prompt: "Solve \\(a + b + c = 6\\), \\(a + b - c = 0\\) and \\(a - b + c = 2\\).",
          answer: "\\(a = 1,\\ b = 2,\\ c = 3\\)",
          method: "First minus second: \\(2c = 6\\). First minus third: \\(2b = 4\\).",
        },
        {
          prompt: "Solve \\(x + y = 10\\), \\(y + z = 14\\) and \\(z + x = 12\\).",
          answer: "\\(x = 4,\\ y = 6,\\ z = 8\\)",
          method: "\\(x + y + z = \\frac{36}{2} = 18\\), then subtract each equation.",
        },
        {
          prompt: "Solve \\(x = 2y\\), \\(y = 3z\\) and \\(x + y + z = 20\\).",
          answer: "\\(x = 12,\\ y = 6,\\ z = 2\\)",
          method: "Write all in \\(z\\): \\(6z + 3z + z = 20\\).",
        },
        {
          prompt: "Solve \\(x + z = 5\\), \\(y - z = 1\\) and \\(x + y + z = 8\\).",
          answer: "\\(x = 3,\\ y = 3,\\ z = 2\\)",
          method: "Third minus first: \\(y = 3\\); then \\(z = 2\\) and \\(x = 3\\).",
        },
      ],
      pyqExampleId: "af415457-786a-449a-b6a9-554b420283e0",
      traps: [
        {
          title: "Removing a different unknown from each pair",
          body:
            "If one pair of equations loses \\(x\\) and the other pair loses \\(y\\), you still have all three unknowns spread over two equations. Remove the same unknown from both pairs.",
        },
        {
          title: "Using the same pair twice",
          body:
            "Two combinations of the same two equations give only one new fact. Each of the two pairs must bring in the third equation, or the system cannot be finished.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssclesv-options",
      name: "Testing the options in a system of equations",
      intuition:
        "A solution has to satisfy every equation. With four answers printed, putting them back into the equations is often faster than solving, and the last check is built in.",
      definition:
        "- Choose the equation with the smallest numbers and test every option in it. It usually rules out two or three options.\n" +
        "- Put the survivor into **every** other equation. A wrong option can pass one equation and fail the next.\n" +
        "- When the question says a given point solves the system and asks for a constant, substitute the point: each equation becomes an equation in the constant alone.\n" +
        "- When each option names a constant and a solution together (\"if a = 2, then x = 3, y = 1\"), put the constant into the equations first, then test the pair.\n" +
        "- **When it breaks:** if the options print only a combination (a sum, a ratio, one unknown), testing cannot check the rest of the solution. Solve instead.",
      authoredExample: {
        prompt:
          "Which of these solves \\(2x + y - z = 1\\), \\(x - y + 3z = 8\\) and \\(3x + 2y + z = 10\\)?\n\n(A) \\((1, 2, 3)\\)  (B) \\((2, 1, 3)\\)  (C) \\((1, 3, 2)\\)  (D) \\((3, 2, 1)\\), each written as \\((x, y, z)\\).",
        steps: [
          "Test all four in the first equation: A gives \\(2 + 2 - 3 = 1\\); B gives \\(4 + 1 - 3 = 2\\); C gives \\(2 + 3 - 2 = 3\\); D gives \\(6 + 2 - 1 = 7\\). Only A survives.",
          "Check A in the second: \\(1 - 2 + 9 = 8\\).",
          "Check A in the third: \\(3 + 4 + 3 = 10\\).",
        ],
        answer: "(A) \\(x = 1,\\ y = 2,\\ z = 3\\)",
      },
      selfCheckExample: {
        prompt: "\\(x = 2,\\ y = -1\\) is the solution of \\(px + 3y = 5\\) and \\(4x + qy = 11\\). Find \\(p\\) and \\(q\\).",
        steps: [
          "Substitute in the first: \\(2p - 3 = 5\\), so \\(p = 4\\).",
          "Substitute in the second: \\(8 - q = 11\\), so \\(q = -3\\).",
        ],
        answer: "\\(p = 4,\\ q = -3\\)",
      },
      practiceSet: [
        {
          prompt: "Which of \\((2, 3)\\), \\((3, 2)\\), \\((1, 4)\\) and \\((4, 1)\\) solves \\(x + y = 5\\) and \\(2x - y = 4\\)?",
          answer: "\\((3, 2)\\)",
          method: "All four give \\(x + y = 5\\); only \\((3, 2)\\) gives \\(2x - y = 4\\).",
        },
        { prompt: "\\(x = 1,\\ y = 2\\) satisfies \\(kx + y = 5\\). Find \\(k\\).", answer: "3" },
        {
          prompt: "Is \\(x = 2,\\ y = 1,\\ z = 0\\) a solution of \\(x + y + z = 3\\), \\(x - y = 1\\) and \\(y + z = 2\\)?",
          answer: "No",
          method: "It passes the first two equations but \\(y + z = 1\\), not 2.",
        },
        {
          prompt: "\\(x = 3,\\ y = -1\\) solves \\(ax + y = 8\\) and \\(2x + by = 4\\). Find \\(a + b\\).",
          answer: "5",
          method: "\\(3a - 1 = 8\\) gives \\(a = 3\\); \\(6 - b = 4\\) gives \\(b = 2\\).",
        },
      ],
      pyqExampleId: "d260dbb1-a1d0-44f2-a42e-fece2d2cd518",
      traps: [
        {
          title: "Accepting an option after one equation",
          body:
            "An option that satisfies one equation is not yet a solution. Options are often built to pass the first equation, so check the survivor in every equation of the system.",
        },
        {
          title: "Testing the pair before fixing the constant",
          body:
            "When an option says \"if a = 6, then x = 4, y = 2\", the equations change with \\(a\\). Put the value of \\(a\\) in first, then test the pair in the new equations.",
        },
      ],
    },
  ],
};
