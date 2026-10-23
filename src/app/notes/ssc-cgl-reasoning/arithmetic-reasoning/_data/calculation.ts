import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAR_CALCULATION_NOTE: SubtopicNote = {
  subtopicName: "Calculation and Number Facts",
  title: "Calculation and Number Facts",
  oneLineDefinition:
    "Plain arithmetic set as a reasoning question: work the brackets first, know the small squares and cubes, and use LCM and HCF for questions about remainders.",
  whyItMatters:
    "Nineteen questions in the bank, all EASY and all from the 2025 shifts. Twelve are a sum, a bill or a bracket to work out, four test powers, cubes or the digit-sum test, and three test LCM and HCF. Each should take well under the 36 seconds a Tier I question allows.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrarca-order",
      name: "Order of operations and quick totals",
      intuition:
        "These questions are pure arithmetic. The only way to lose a mark is to do the steps in the wrong order or to slip on a multiplication, and the options often let you check the last digit before you finish.",
      definition:
        "- **Order:** brackets first, then powers and roots, then multiply and divide, then add and subtract.\n" +
        "- **\"The sum of a and b multiplied by c\"** means \\((a + b) \\times c\\): add first, then multiply.\n" +
        "- **A bill:** for each item, quantity times price; then add the items.\n" +
        "- **Fast multiplying:** \\(\\times 9\\) is \\(\\times 10\\) minus the number, and \\(\\times 99\\) is \\(\\times 100\\) minus the number; \\(\\times 5\\) is \\(\\times 10\\) then halve; \\(\\times 4\\) is doubling twice.\n" +
        "- **Last-digit check:** work out only the last digit of the answer and drop every option that ends differently. It is safe only when the options end in different digits; if two options share a last digit, finish the sum.\n" +
        "- **Zero:** any product that has 0 as a factor is 0.",
      authoredExample: {
        prompt: "If the sum of 27 and 18 is multiplied by 6, and 15 is then taken away, what is the result?",
        steps: [
          "Brackets first: \\(27 + 18 = 45\\).",
          "Multiply: \\(45 \\times 6 = 270\\).",
          "Take away 15: \\(270 - 15 = 255\\).",
          "Last-digit check: 45 times 6 ends in 0, and 0 minus 5 (borrowing) ends in 5, so only an option ending in 5 can be right.",
        ],
        answer: "255",
      },
      selfCheckExample: {
        prompt: "Evaluate \\((9 - 4)^2 \\times 2 + \\sqrt{49}\\).",
        steps: [
          "Bracket: \\(9 - 4 = 5\\), and \\(5^2 = 25\\). Root: \\(\\sqrt{49} = 7\\).",
          "Multiply before adding: \\(25 \\times 2 = 50\\), then \\(50 + 7 = 57\\).",
        ],
        answer: "57",
      },
      practiceSet: [
        { prompt: "If the sum of 23 and 17 is multiplied by 7, what is the result?", answer: "280", method: "\\(40 \\times 7 = 280\\)." },
        {
          prompt: "A customer buys 6 pencils at ₹7 each and 2 rulers at ₹15 each. What is the total bill?",
          answer: "₹72",
          method: "\\(42 + 30 = 72\\).",
        },
        { prompt: "Work out \\(64 \\times 99\\) as \\(64 \\times 100\\) minus 64.", answer: "6336", method: "\\(6400 - 64 = 6336\\)." },
        { prompt: "Evaluate \\(\\sqrt{81} + \\sqrt[3]{64}\\).", answer: "13", method: "\\(9 + 4 = 13\\)." },
      ],
      pyqExampleId: "9f2ed351-0ee1-4d9c-bdae-b7f527b5b076",
      traps: [
        {
          title: "Multiplying before adding the sum",
          body:
            "\"The sum of 12 and 8 multiplied by 3\" is \\((12 + 8) \\times 3 = 60\\). Doing \\(12 + 8 \\times 3 = 36\\) answers a different question, and SSC prints that wrong total as an option.",
        },
        {
          title: "Squaring each number inside a bracket",
          body:
            "\\((7 - 4)^2\\) is \\(3^2 = 9\\). Squaring each number first gives \\(49 - 16 = 33\\), which is wrong: work out the bracket, then square.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarca-powers",
      name: "Squares, cubes and the digit-sum test",
      intuition:
        "A few number facts, known by heart, turn these questions into a glance: the small squares and cubes, how a cube ends, and the rule that a number and its digit sum leave the same remainder on division by 9.",
      definition:
        "- **Cubes 1 to 10:** 1, 8, 27, 64, 125, 216, 343, 512, 729, 1000.\n" +
        "- **Squares 11 to 20:** 121, 144, 169, 196, 225, 256, 289, 324, 361, 400.\n" +
        "- **Last digit of a cube:** a cube ends in the same digit as its root for 0, 1, 4, 5, 6 and 9; the pairs 2 and 8, and 3 and 7, swap. So a cube ending in 8 has a root ending in 2.\n" +
        "- **To test a cube:** find the two cubes it sits between. If it equals neither, it is not a cube.\n" +
        "- **Digit-sum test:** a number leaves the same remainder on division by 9 as the sum of its digits. The same holds for 3. It does not work for 7, 11 or any other divisor.\n" +
        "- **Geometric progression:** each term is the one before times the same ratio \\(r\\), so term \\(n\\) is \\(a r^{n-1}\\). To find \\(r\\), divide the given term by \\(a\\) and take the root of power \\(n - 1\\).",
      formula: {
        label: "Term n of a geometric progression",
        latex: "T_n = a\\,r^{\\,n-1}",
        symbols: [
          { symbol: "a", meaning: "the first term" },
          { symbol: "r", meaning: "the common ratio" },
          { symbol: "n", meaning: "the position of the term" },
        ],
      },
      authoredExample: {
        prompt: "Which of these is a perfect cube: 512, 576, 625, 676?",
        steps: [
          "Cubes near these numbers: \\(8^3 = 512\\) and \\(9^3 = 729\\).",
          "512 is \\(8^3\\), so it is a cube.",
          "The others are squares, not cubes: \\(576 = 24^2\\), \\(625 = 25^2\\), \\(676 = 26^2\\). Each lies between 512 and 729, so none can be a cube.",
        ],
        answer: "512",
      },
      selfCheckExample: {
        prompt: "What is the remainder when 583214 is divided by 9?",
        steps: [
          "Digit sum: \\(5 + 8 + 3 + 2 + 1 + 4 = 23\\).",
          "\\(23 = 2 \\times 9 + 5\\), so the remainder is 5.",
        ],
        answer: "5",
      },
      practiceSet: [
        { prompt: "What is the cube root of 729?", answer: "9" },
        { prompt: "What is the remainder when 123456 is divided by 3?", answer: "0", method: "Digit sum 21 is a multiple of 3." },
        {
          prompt: "A geometric progression has first term 5 and common ratio 3. What is its 4th term?",
          answer: "135",
          method: "\\(5 \\times 3^3 = 135\\).",
        },
        { prompt: "Which perfect cube lies between 20 and 30?", answer: "27" },
      ],
      pyqExampleId: "a22925b7-917e-41f7-8041-c7730d1702f9",
      traps: [
        {
          title: "Taking a square or a fourth power for a cube",
          body:
            "625 is \\(25^2\\) and \\(5^4\\), but it is not a cube: \\(8^3 = 512\\) and \\(9^3 = 729\\), and nothing between them is a cube.",
        },
        {
          title: "Using the digit sum for 7 or 11",
          body:
            "The digit-sum test gives the remainder for 9 and for 3 only. For 7 or 11 it gives a wrong remainder, so divide.",
        },
        {
          title: "Raising the ratio to the power n",
          body:
            "The 6th term of a geometric progression is \\(a r^5\\), not \\(a r^6\\): the first term has had no multiplication yet.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrarca-lcm",
      name: "LCM, HCF and remainders",
      intuition:
        "The LCM is the first number every divisor goes into exactly. So a number that leaves the same remainder for every divisor is a multiple of the LCM with that remainder added on.",
      definition:
        "- **LCM:** write each number as a product of primes and take the highest power of every prime that appears.\n" +
        "- **HCF:** take the lowest power of each prime that appears in all of them.\n" +
        "- **Two numbers:** HCF \\(\\times\\) LCM \\(=\\) the product of the two numbers. This is true for two numbers only; for three it fails.\n" +
        "- **Same remainder r for every divisor:** the number is \\(k \\times\\) LCM \\(+ r\\). The smallest one above r is LCM \\(+ r\\).\n" +
        "- **Fast route:** with four options, divide each by the divisors and keep the one that leaves the right remainder every time.",
      formula: {
        label: "HCF, LCM and remainders",
        latex: "\\text{HCF} \\times \\text{LCM} = a \\times b \\qquad N = k \\times \\text{LCM} + r",
        symbols: [
          { symbol: "a, b", meaning: "the two numbers" },
          { symbol: "r", meaning: "the remainder left by every divisor" },
          { symbol: "k", meaning: "a whole number, 1 for the smallest such number" },
        ],
      },
      authoredExample: {
        prompt: "Find the LCM of 16, 24 and 36.",
        steps: [
          "Primes: \\(16 = 2^4\\), \\(24 = 2^3 \\times 3\\), \\(36 = 2^2 \\times 3^2\\).",
          "Highest powers: \\(2^4\\) and \\(3^2\\).",
          "LCM \\(= 16 \\times 9 = 144\\). Check: \\(144 = 16 \\times 9 = 24 \\times 6 = 36 \\times 4\\).",
        ],
        answer: "144",
      },
      selfCheckExample: {
        prompt: "Two numbers have HCF 12 and LCM 180. One of them is 36. What is the other?",
        steps: [
          "Product \\(= 12 \\times 180 = 2160\\).",
          "Other number \\(= 2160 \\div 36 = 60\\). Check: 36 and 60 have HCF 12 and LCM 180.",
        ],
        answer: "60",
      },
      practiceSet: [
        { prompt: "Find the LCM of 4, 9 and 12.", answer: "36" },
        { prompt: "Find the HCF of 48 and 72.", answer: "24" },
        {
          prompt: "Find the smallest number that leaves remainder 3 when divided by 4, by 5 and by 6.",
          answer: "63",
          method: "LCM 60, plus 3.",
        },
        {
          prompt: "The product of two numbers is 864 and their HCF is 12. What is their LCM?",
          answer: "72",
          method: "\\(864 \\div 12 = 72\\).",
        },
      ],
      pyqExampleId: "f56d43fc-6169-477e-8e17-355f2f07f56b",
      traps: [
        {
          title: "Using HCF times LCM for three numbers",
          body:
            "For 2, 4 and 6 the HCF is 2 and the LCM is 12, so HCF times LCM is 24, while the product is 48. The rule holds only for two numbers.",
        },
        {
          title: "Forgetting to add the remainder",
          body:
            "The LCM itself leaves remainder 0. A number leaving remainder r for every divisor is the LCM plus r.",
        },
      ],
    },
  ],
};
