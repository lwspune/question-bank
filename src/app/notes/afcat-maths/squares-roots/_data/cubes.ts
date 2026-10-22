import type { SubtopicNote } from "@/app/notes/_types";

export const AF_SQ_CUBES_NOTE: SubtopicNote = {
  subtopicName: "Cubes and Cube Roots",
  title: "Cubes, Cube Roots, and Square and Cube Roots Together",
  oneLineDefinition:
    "Cube a number and use the cube identities, recognise a perfect cube, find cube roots of whole numbers, negatives, decimals and fractions, and evaluate square and cube roots in one expression.",
  whyItMatters:
    "This is the biggest page of the chapter, and most of it is quick: a cube, a cube root, or a sum of the two kinds of root. Marks go on the sign, since the cube root of a negative number is negative and not undefined, and on decimals, where a cube root takes decimal places in threes.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afsq-cubing",
      name: "Cubing a number, and the cube identities",
      intuition:
        "A cube multiplies a number by itself three times. Unlike a square, it keeps the sign: a negative number cubed is negative.",
      definition:
        "- \\(n^3 = n \\times n \\times n\\): \\(6^3 = 216\\). Also \\(0^3 = 0\\) and \\(1^3 = 1\\).\n" +
        "- \\((-n)^3 = -n^3\\): \\((-4)^3 = -64\\).\n" +
        "- \\((a + b)^3 = a^3 + 3a^2b + 3ab^2 + b^3\\) and \\((a - b)^3 = a^3 - 3a^2b + 3ab^2 - b^3\\).\n" +
        "- \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\) and \\(a^3 - b^3 = (a - b)(a^2 + ab + b^2)\\).",
      formula: {
        label: "Sum and difference of cubes",
        latex: "a^3 \\pm b^3 = (a \\pm b)(a^2 \\mp ab + b^2)",
      },
      authoredExample: {
        prompt: "Find \\(5^3 - 4^3\\) with the identity, and check it directly.",
        steps: [
          "\\((5 - 4)(5^2 + 5 \\times 4 + 4^2) = 1 \\times (25 + 20 + 16) = 61\\).",
          "Directly: \\(125 - 64 = 61\\).",
        ],
        answer: "\\(61\\).",
      },
      selfCheckExample: {
        prompt: "Find \\((1 + 4)^3\\) by the four-term expansion.",
        steps: [
          "\\(a^3 = 1\\), \\(3a^2b = 12\\), \\(3ab^2 = 48\\), \\(b^3 = 64\\).",
          "\\(1 + 12 + 48 + 64 = 125\\), which is \\(5^3\\).",
        ],
        answer: "\\(125\\).",
      },
      practiceSet: [
        { prompt: "Find \\(7^3\\).", answer: "\\(343\\)" },
        { prompt: "Find \\((-6)^3\\).", answer: "\\(-216\\)" },
        {
          prompt: "Find \\(4^3 + 1^3\\) using \\(a^3 + b^3 = (a + b)(a^2 - ab + b^2)\\).",
          answer: "\\(65\\)",
          method: "\\(5 \\times (16 - 4 + 1)\\).",
        },
        { prompt: "Find \\(13^3\\).", answer: "\\(2197\\)", method: "\\(169 \\times 13\\)." },
      ],
      pyqExampleId: "081bf832-417d-4b05-aea6-fb3b03014ee6",
      traps: [
        {
          title: "An odd power keeps the sign",
          body: "\\((-5)^3 = -125\\), but \\((-5)^2 = 25\\). Cubes of negative numbers are negative.",
        },
        {
          title: "A cube of a sum is not a sum of cubes",
          body: "\\((1 + 4)^3 = 125\\), not \\(1 + 64 = 65\\). The expansion has two middle terms.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "afsq-cube-table",
      name: "The cubes from 1 to 10, and spotting a perfect cube",
      intuition:
        "Learn the cubes from 1 to 10. Unlike squares, cubes end in every digit, and each last digit of a cube comes from exactly one last digit of its root. That makes cube roots of perfect cubes quick.",
      definition:
        "A number is a perfect cube when every prime exponent is a multiple of 3. For a perfect cube between 1,000 and 1,000,000 the root has two digits:\n" +
        "- Strike off the last three digits. The largest cube at or below what is left gives the tens digit.\n" +
        "- The last digit of the number gives the units digit, with no second choice (the table below).\n" +
        "- For 2,744: 2 lies between \\(1^3\\) and \\(2^3\\), so the root is in the teens, and a last digit 4 gives 4. The root is 14.",
      table: {
        columns: ["n", "n³", "Last digit of n³"],
        rows: [
          { cells: ["1", "1", "1"] },
          {
            cells: ["2", "8", "8"],
            noteAmber: "2 and 8 swap: a cube ending in 8 has a root ending in 2.",
          },
          {
            cells: ["3", "27", "7"],
            noteAmber: "3 and 7 swap: a cube ending in 7 has a root ending in 3.",
          },
          { cells: ["4", "64", "4"] },
          { cells: ["5", "125", "5"] },
          { cells: ["6", "216", "6"] },
          { cells: ["7", "343", "3"] },
          { cells: ["8", "512", "2"] },
          { cells: ["9", "729", "9"] },
          { cells: ["10", "1,000", "0"] },
        ],
      },
      selfCheckExample: {
        prompt: "Find the cube root of 3,375.",
        steps: [
          "Strike off 375: 3 lies between \\(1^3\\) and \\(2^3\\), so the root is in the teens.",
          "The last digit 5 gives a units digit 5.",
        ],
        answer: "\\(15\\).",
      },
      practiceSet: [
        { prompt: "Is 343 a perfect cube?", answer: "Yes, \\(7^3\\)" },
        { prompt: "4,913 is a perfect cube. What is the last digit of its cube root?", answer: "\\(7\\)", method: "It is \\(17^3\\)." },
        { prompt: "Find \\(\\sqrt[3]{9261}\\).", answer: "\\(21\\)", method: "9 lies between 8 and 27; the last digit 1 gives 1." },
        { prompt: "Is 500 a perfect cube?", answer: "No", method: "\\(500 = 2^2 \\times 5^3\\)." },
      ],
      pyqExampleId: "51512768-5ed5-468f-b8b9-48f39b83a74c",
      traps: [
        {
          title: "Cubes can end in any digit",
          body: "A cube can end in 2, 3, 7 or 8: \\(8^3 = 512\\) and \\(7^3 = 343\\). The last digit never rules a number out as a cube, unlike a square.",
        },
        {
          title: "Bracket with cubes, not squares",
          body: "For 9,261, strike off three digits, not two, and compare 9 with the cubes 8 and 27. Comparing 92 with squares sends you to the wrong tens digit.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-cube-root",
      name: "Cube roots by prime factors",
      intuition:
        "A cube root undoes a cube. Group the prime factors in threes; one factor from each group makes the root.",
      definition:
        "- \\(\\sqrt[3]{n^3} = n\\) and \\((\\sqrt[3]{a})^3 = a\\).\n" +
        "- By factors: divide every exponent by 3. \\(5832 = 2^3 \\times 3^6\\), so \\(\\sqrt[3]{5832} = 2 \\times 3^2 = 18\\).\n" +
        "- Roots inside roots are worked from the inside out: \\(\\sqrt{\\sqrt[3]{729}} = \\sqrt 9 = 3\\).",
      formula: {
        label: "Cube root by prime factors",
        latex: "\\sqrt[3]{p^{3a} q^{3b}} = p^{a} q^{b}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt[3]{10648}\\) by prime factors.",
        steps: [
          "\\(10648 = 8 \\times 1331 = 2^3 \\times 11^3\\).",
          "Divide each exponent by 3: \\(2 \\times 11\\).",
        ],
        answer: "\\(22\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt[3]{\\sqrt{4096}}\\).",
        steps: ["Inside first: \\(\\sqrt{4096} = 64\\).", "\\(\\sqrt[3]{64} = 4\\)."],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt[3]{216}\\).", answer: "\\(6\\)" },
        { prompt: "Find \\((\\sqrt[3]{7})^3\\).", answer: "\\(7\\)" },
        { prompt: "Find \\(\\sqrt[3]{3^3 \\times 2^6}\\).", answer: "\\(12\\)", method: "\\(3 \\times 2^2\\)." },
        { prompt: "Find \\(\\sqrt[3]{13824}\\) by prime factors.", answer: "\\(24\\)", method: "\\(13824 = 2^9 \\times 3^3\\)." },
      ],
      pyqExampleId: "4b68e3e2-dd5f-43f2-8407-e209fef1e2c3",
      traps: [
        {
          title: "Groups of three, not pairs",
          body: "\\(\\sqrt[3]{2^6}\\) is \\(2^2 = 4\\), not \\(2^3 = 8\\). Divide each exponent by 3 for a cube root, by 2 only for a square root.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-cube-root-negative",
      name: "Cube roots of negative numbers, and cube root equations",
      intuition:
        "A cube root keeps the sign, because a negative number cubed is negative. So every number, negative or not, has one real cube root, which a square root cannot offer.",
      definition:
        "- \\(\\sqrt[3]{-a} = -\\sqrt[3]{a}\\): \\(\\sqrt[3]{-125} = -5\\).\n" +
        "- A negative number has no real square root, but it always has a real cube root.\n" +
        "- \\(\\sqrt[3]{ax + b} = k\\): cube both sides, \\(ax + b = k^3\\), and solve. \\(k\\) may be negative here.",
      formula: {
        label: "Clearing a cube root",
        latex: "\\sqrt[3]{ax + b} = k \\;\\Rightarrow\\; ax + b = k^3",
      },
      authoredExample: {
        prompt: "Solve \\(\\sqrt[3]{x + 10} = -2\\).",
        steps: [
          "Cube both sides: \\(x + 10 = (-2)^3 = -8\\).",
          "\\(x = -18\\). Check: \\(\\sqrt[3]{-8} = -2\\).",
        ],
        answer: "\\(x = -18\\).",
      },
      selfCheckExample: {
        prompt: "Solve \\(\\sqrt[3]{4x} = 4\\).",
        steps: ["Cube both sides: \\(4x = 64\\)."],
        answer: "\\(x = 16\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt[3]{-343}\\).", answer: "\\(-7\\)" },
        { prompt: "Solve \\(\\sqrt[3]{x} = 5\\).", answer: "\\(125\\)" },
        { prompt: "Solve \\(\\sqrt[3]{x + 2} = 2\\).", answer: "\\(6\\)" },
        { prompt: "Find \\(\\sqrt[3]{-1000}\\).", answer: "\\(-10\\)" },
      ],
      pyqExampleId: "1341302a-5ee4-4872-9e9f-ca91afe64c57",
      traps: [
        {
          title: "Cube, do not square",
          body: "\\(\\sqrt[3]{x} = 4\\) gives \\(x = 64\\), not 16. Clearing a cube root needs the cube of both sides.",
        },
        {
          title: "A negative cube root exists",
          body: "\\(\\sqrt[3]{-216} = -6\\). Answering 'undefined' mixes up cube roots with square roots.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-cube-root-decimals",
      name: "Cube roots of decimals and fractions",
      intuition:
        "For cube roots, decimal places come in threes: the root has a third as many as the number. A fraction's cube root is the cube root of the top over that of the bottom.",
      definition:
        "- \\(\\sqrt[3]{0.729} = \\sqrt[3]{\\tfrac{729}{1000}} = \\tfrac{9}{10} = 0.9\\).\n" +
        "- Every three decimal places in the number make one in the root: \\(\\sqrt[3]{0.000125} = 0.05\\).\n" +
        "- \\(\\sqrt[3]{\\tfrac{64}{125}} = \\tfrac 45\\).",
      formula: {
        label: "Cube root of a decimal",
        latex: "\\sqrt[3]{\\dfrac{a}{10^{3k}}} = \\dfrac{\\sqrt[3]{a}}{10^{k}}",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt[3]{0.000343}\\).",
        steps: [
          "\\(\\sqrt[3]{343} = 7\\).",
          "Six decimal places in the number make two in the root.",
        ],
        answer: "\\(0.07\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt[3]{\\tfrac{27}{64}}\\).",
        steps: ["\\(\\sqrt[3]{27} = 3\\) and \\(\\sqrt[3]{64} = 4\\)."],
        answer: "\\(\\tfrac 34\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt[3]{0.216}\\).", answer: "\\(0.6\\)" },
        { prompt: "Find \\(\\sqrt[3]{0.000001}\\).", answer: "\\(0.01\\)" },
        { prompt: "Find \\(\\sqrt[3]{\\tfrac{125}{216}}\\).", answer: "\\(\\tfrac 56\\)" },
        { prompt: "Find \\(\\sqrt[3]{1.331}\\).", answer: "\\(1.1\\)" },
      ],
      pyqExampleId: "23f0f098-8c93-4e4c-a210-6a331ad348eb",
      traps: [
        {
          title: "Decimal places in threes",
          body: "\\(\\sqrt[3]{0.0027}\\) is not 0.03, because \\(0.03^3 = 0.000027\\). Four decimal places do not give a neat cube root: \\(\\sqrt[3]{0.0027}\\) is about 0.139.",
        },
        {
          title: "A third of the places",
          body: "\\(\\sqrt[3]{0.000064} = 0.04\\): six places become two. Halving them, as for a square root, gives 0.004.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afsq-mixed-roots",
      name: "Square roots and cube roots in one expression",
      intuition:
        "Evaluate each root on its own, square roots by pairs and cube roots by threes, then do the arithmetic. The small number on the root sign says which root it is.",
      definition:
        "- A root sign with no small number is a square root; a small 3 makes it a cube root.\n" +
        "- Cube roots split over a product just as square roots do: \\(\\sqrt[3]{25} \\times \\sqrt[3]{5} = \\sqrt[3]{125} = 5\\).\n" +
        "- \\((\\sqrt a)^2 = a\\) and \\((\\sqrt[3]{a})^3 = a\\).\n" +
        "- A negative number under a cube root gives a negative value; under a square root it gives no real value.",
      formula: {
        label: "One root at a time",
        latex: "\\sqrt{a^2} = a, \\quad \\sqrt[3]{b^3} = b",
      },
      authoredExample: {
        prompt: "Find \\(\\sqrt{225} \\div \\sqrt[3]{125} + \\sqrt[3]{-64}\\).",
        steps: [
          "\\(\\sqrt{225} = 15\\), \\(\\sqrt[3]{125} = 5\\), \\(\\sqrt[3]{-64} = -4\\).",
          "\\(15 \\div 5 + (-4) = 3 - 4\\).",
        ],
        answer: "\\(-1\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\sqrt[3]{216} \\times \\sqrt{49}\\).",
        steps: ["\\(6 \\times 7\\)."],
        answer: "\\(42\\).",
      },
      practiceSet: [
        { prompt: "Find \\(\\sqrt{81} + \\sqrt[3]{1000}\\).", answer: "\\(19\\)" },
        { prompt: "Find \\(\\sqrt[3]{125} \\times \\sqrt[3]{8}\\).", answer: "\\(10\\)" },
        { prompt: "Find \\((\\sqrt[3]{4})^3 + (\\sqrt 5)^2\\).", answer: "\\(9\\)" },
        { prompt: "Find \\(\\dfrac{\\sqrt{400}}{\\sqrt[3]{64}}\\).", answer: "\\(5\\)" },
      ],
      pyqExampleId: "9892234c-b367-4daa-a38b-9859045a636a",
      traps: [
        {
          title: "Read the small index",
          body: "\\(\\sqrt[3]{64} = 4\\) but \\(\\sqrt{64} = 8\\). Missing the 3 on the root sign doubles the answer here.",
        },
      ],
    },
  ],
};
