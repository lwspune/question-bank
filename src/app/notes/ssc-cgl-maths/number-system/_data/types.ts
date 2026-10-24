import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_NS_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Number Types, Primes and Squares",
  title: "Number Types, Primes and Squares",
  oneLineDefinition:
    "Every number belongs to a family (natural, whole, integer, rational, irrational, real), and a few of those families have quick tests you can run in your head.",
  whyItMatters:
    "Fourteen questions in the bank, all EASY, and twelve of the thirteen questions from the 2025 shifts sit on this page. Each one is a single fact or a single bracket between two squares, so it should cost you far less than the 36 seconds Tier I gives a question.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscnsty-families",
      name: "The families of numbers and how they nest",
      intuition:
        "Think of the families as boxes inside boxes. The counting numbers sit inside the whole numbers, which sit inside the integers, which sit inside the rationals. The irrationals sit beside the rationals, and the two together fill the real number line.",
      definition:
        "- **Natural numbers** start at 1. **Whole numbers** are 0 together with the natural numbers.\n" +
        "- **Integers** add the negatives: \\(\\ldots, -2, -1, 0, 1, 2, \\ldots\\)\n" +
        "- A **rational number** can be written as \\(\\frac{p}{q}\\) with \\(p, q\\) integers and \\(q \\ne 0\\). Its decimal either stops or repeats.\n" +
        "- An **irrational number** cannot be written that way. Its decimal never stops and never repeats: \\(\\sqrt{2}\\), \\(\\sqrt{7}\\), \\(\\pi\\).\n" +
        "- The square root of a natural number is an integer when the number is a perfect square, and irrational otherwise.\n" +
        "- Rational plus irrational is always irrational. A **non-zero** rational times an irrational is irrational, but \\(0 \\times \\sqrt{3} = 0\\) is rational, so 'rational times irrational' is only **sometimes** irrational.\n" +
        "- **Even** numbers are the multiples of 2; **odd** numbers leave remainder 1 on division by 2. Two consecutive even numbers, or two consecutive odd numbers, differ by 2, so write them as \\(n\\) and \\(n + 2\\).",
      table: {
        columns: ["Family", "What it contains", "Examples"],
        rows: [
          { cells: ["Natural numbers", "the counting numbers, starting at 1", "1, 7, 250"] },
          { cells: ["Whole numbers", "0 and every natural number", "0, 1, 2, 15"], noteAmber: "0 is whole but not natural." },
          { cells: ["Integers", "the whole numbers and their negatives", "\\(-4\\), 0, 7"] },
          { cells: ["Rational numbers", "every \\(\\frac{p}{q}\\) with \\(p, q\\) integers and \\(q \\ne 0\\)", "\\(\\frac{3}{4}\\), \\(-2\\), 1.5, \\(0.333\\ldots\\)"] },
          { cells: ["Irrational numbers", "real numbers that are not \\(\\frac{p}{q}\\)", "\\(\\sqrt{2}\\), \\(\\sqrt{7}\\), \\(\\pi\\)"] },
          { cells: ["Real numbers", "all rational and all irrational numbers", "every point on the number line"] },
          { cells: ["Even numbers", "integers that are multiples of 2", "\\(-6\\), 0, 86, 88"] },
          { cells: ["Odd numbers", "integers that leave remainder 1 on division by 2", "\\(-7\\), 3, 15"] },
        ],
        caption: "Natural numbers sit inside the whole numbers, whole numbers inside the integers, integers inside the rationals; the rationals and the irrationals together make the real numbers.",
      },
      selfCheckExample: {
        prompt: "Which of the numbers 0, \\(-3\\), \\(\\frac{3}{2}\\) and 5 is an integer but NOT a whole number?",
        steps: [
          "Whole numbers are 0, 1, 2, and so on, so 0 and 5 are whole.",
          "\\(\\frac{3}{2}\\) is not an integer at all.",
          "\\(-3\\) is an integer, and negatives are not whole numbers.",
        ],
        answer: "\\(-3\\)",
      },
      practiceSet: [
        { prompt: "Is 0 a natural number, a whole number, both, or neither?", answer: "A whole number only" },
        { prompt: "Is the repeating decimal 0.272727... rational or irrational?", answer: "Rational", method: "A decimal that repeats is rational: \\(0.\\overline{27} = \\frac{27}{99} = \\frac{3}{11}\\)." },
        { prompt: "Is \\(2 + \\sqrt{3}\\) rational or irrational?", answer: "Irrational", method: "Rational plus irrational is always irrational." },
        {
          prompt: "The sum of two consecutive odd numbers is 64. What is the larger number?",
          answer: "33",
          method: "\\(n + (n + 2) = 64\\) gives \\(n = 31\\), so the numbers are 31 and 33.",
        },
      ],
      pyqExampleId: "6ffd9081-389f-42a9-97d3-271aa80be2c7",
      traps: [
        {
          title: "Calling 0 a natural number",
          body: "Natural numbers start at 1. Zero is a whole number, an integer and a rational number, but not a natural number.",
        },
        {
          title: "Saying rational times irrational is always irrational",
          body: "It is irrational only when the rational number is not zero. Since \\(0 \\times \\sqrt{3} = 0\\), the honest answer is 'sometimes rational, sometimes irrational'.",
        },
        {
          title: "Taking a repeating decimal for an irrational number",
          body: "\\(0.333\\ldots = \\frac{1}{3}\\) is rational. A decimal is irrational only when it never stops and never settles into a repeating block.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsty-decimals",
      name: "When a fraction has a terminating decimal",
      intuition:
        "A decimal that stops is a fraction over 10, 100, 1000 and so on. Those numbers are built only from 2s and 5s, so a fraction can stop only when its denominator, after cancelling, is built only from 2s and 5s as well.",
      definition:
        "- First write the fraction in **lowest terms**.\n" +
        "- It has a **terminating** decimal exactly when the denominator has no prime factor other than 2 and 5.\n" +
        "- Any other prime in the denominator (3, 7, 11, ...) gives a **recurring** decimal. Both kinds are rational.\n" +
        "- With denominator \\(2^a \\times 5^b\\), the decimal has as many places as the larger of \\(a\\) and \\(b\\).\n" +
        "- Fast route: the denominators 2, 4, 5, 8, 10, 16, 20, 25, 40 and 50 all terminate; 3, 6, 7, 9, 11, 12 and 15 never do (in lowest terms).",
      formula: {
        label: "Terminating decimal test",
        latex: "\\frac{p}{q} \\ (\\text{lowest terms}) \\text{ terminates exactly when } q = 2^a \\times 5^b",
        symbols: [
          { symbol: "q", meaning: "the denominator after cancelling" },
          { symbol: "a, b", meaning: "whole numbers, either may be 0" },
        ],
      },
      authoredExample: {
        prompt: "Which of \\(\\frac{7}{20}\\), \\(\\frac{5}{12}\\) and \\(\\frac{9}{14}\\) has a terminating decimal? Write that one as a decimal.",
        steps: [
          "All three are already in lowest terms.",
          "\\(20 = 2^2 \\times 5\\): only 2s and 5s, so \\(\\frac{7}{20}\\) terminates.",
          "\\(12 = 2^2 \\times 3\\) and \\(14 = 2 \\times 7\\) carry a 3 and a 7, so those two recur.",
          "\\(\\frac{7}{20} = \\frac{35}{100} = 0.35\\).",
        ],
        answer: "\\(\\frac{7}{20} = 0.35\\)",
      },
      selfCheckExample: {
        prompt: "Does \\(\\frac{21}{28}\\) have a terminating decimal? If it does, write it.",
        steps: [
          "Cancel first: \\(\\frac{21}{28} = \\frac{3}{4}\\).",
          "\\(4 = 2^2\\), so it terminates: \\(\\frac{3}{4} = 0.75\\).",
        ],
        answer: "Yes, 0.75",
      },
      practiceSet: [
        { prompt: "Does \\(\\frac{11}{40}\\) have a terminating decimal? If so, write it.", answer: "Yes, 0.275", method: "\\(40 = 2^3 \\times 5\\), and \\(\\frac{11}{40} = \\frac{275}{1000}\\)." },
        { prompt: "Does \\(\\frac{2}{15}\\) have a terminating decimal?", answer: "No", method: "\\(15 = 3 \\times 5\\) carries a 3: \\(\\frac{2}{15} = 0.1333\\ldots\\)" },
        { prompt: "How many decimal places does \\(\\frac{3}{16}\\) have?", answer: "4", method: "\\(16 = 2^4\\), so four places: 0.1875." },
        { prompt: "Does \\(\\frac{9}{75}\\) have a terminating decimal? If so, write it.", answer: "Yes, 0.12", method: "\\(\\frac{9}{75} = \\frac{3}{25}\\), and \\(25 = 5^2\\)." },
      ],
      pyqExampleId: "67e23025-56a4-4470-a3b8-2b8bd81f3296",
      traps: [
        {
          title: "Judging the denominator before cancelling",
          body: "\\(\\frac{6}{15}\\) looks recurring because 15 has a factor 3, but it cancels to \\(\\frac{2}{5} = 0.4\\). Always reduce to lowest terms first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsty-primes",
      name: "Prime numbers and the square-root test",
      intuition:
        "If a number splits as a product of two factors, one of them is at most its square root. So to see whether a number is prime you only need to try the primes up to its square root, not every number below it.",
      definition:
        "- A **prime** has exactly two factors: 1 and itself. **1 is not prime** (it has one factor), and **2 is the only even prime**.\n" +
        "- To test \\(n\\), divide by the primes \\(2, 3, 5, 7, 11, 13, \\ldots\\) up to \\(\\sqrt{n}\\). If none divides it, \\(n\\) is prime.\n" +
        "- The 25 primes below 100: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97.\n" +
        "- Look-alikes that are NOT prime: \\(51 = 3 \\times 17\\), \\(57 = 3 \\times 19\\), \\(87 = 3 \\times 29\\), \\(91 = 7 \\times 13\\).\n" +
        "- For a list of primes in a range, cross out evens, then multiples of 3 (digit sum), 5 (last digit) and 7; what survives below 121 is prime.",
      authoredExample: {
        prompt: "Is 247 a prime number?",
        steps: [
          "\\(\\sqrt{247}\\) is a little under 16, since \\(16^2 = 256\\). Try the primes 2, 3, 5, 7, 11 and 13.",
          "247 is odd, its digit sum 13 is not a multiple of 3, and it does not end in 0 or 5.",
          "\\(247 = 7 \\times 35 + 2\\) and \\(247 = 11 \\times 22 + 5\\), but \\(247 = 13 \\times 19\\).",
        ],
        answer: "No: \\(247 = 13 \\times 19\\)",
      },
      selfCheckExample: {
        prompt: "How many prime numbers lie between 70 and 90?",
        steps: [
          "Odd numbers from 71 to 89, after removing multiples of 3 and 5: 71, 73, 77, 79, 83, 89.",
          "\\(77 = 7 \\times 11\\) goes. The rest pass every prime up to 7 (\\(\\sqrt{89} < 10\\)).",
          "Primes: 71, 73, 79, 83, 89.",
        ],
        answer: "5",
      },
      practiceSet: [
        { prompt: "Is 97 a prime number?", answer: "Yes", method: "\\(\\sqrt{97} < 10\\), and 2, 3, 5 and 7 do not divide 97." },
        { prompt: "What is the smallest prime number greater than 50?", answer: "53", method: "\\(51 = 3 \\times 17\\) and 52 is even." },
        { prompt: "What is the sum of all the prime numbers between 10 and 20?", answer: "60", method: "\\(11 + 13 + 17 + 19 = 60\\)." },
        { prompt: "How many factors does the number 1 have, and is it prime?", answer: "One factor; not prime", method: "A prime needs exactly two factors." },
      ],
      pyqExampleId: "da7e8afa-adc5-4777-b470-f422416c408e",
      traps: [
        {
          title: "Counting 1 as a prime",
          body: "A prime has exactly two factors. The number 1 has only one, so it is neither prime nor composite.",
        },
        {
          title: "Letting 51, 57 or 91 through as prime",
          body: "They look prime but are not: \\(51 = 3 \\times 17\\), \\(57 = 3 \\times 19\\), \\(91 = 7 \\times 13\\). Run the digit-sum check for 3 and try 7 before you accept a two-digit number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsty-squares",
      name: "Perfect squares near a given number",
      intuition:
        "Perfect squares are fence posts along the number line: 1600, then 1681, then 1764. Any number sits between two posts, and the question is only ever which post is nearest, or how far away it is.",
      definition:
        "- A **perfect square** is \\(k^2\\) for a whole number \\(k\\). Its square root is an integer.\n" +
        "- **Bracket** the number: find \\(k\\) with \\(k^2 \\le N < (k + 1)^2\\). Then the least number to **add** is \\((k + 1)^2 - N\\), and the least to **subtract** is \\(N - k^2\\).\n" +
        "- The least \\(n\\)-digit square is the first square at or above \\(10^{n-1}\\): estimate the root, then step up by 1.\n" +
        "- A square ends in 0, 1, 4, 5, 6 or 9, **never in 2, 3, 7 or 8**. Use this to strike options; it cannot prove a number is a square.\n" +
        "- Fast route for a square root: the last digit narrows the root's last digit (a square ending in 9 has a root ending in 3 or 7), and the tens fix the rest. For 5329: \\(70^2 = 4900\\) and \\(80^2 = 6400\\), so the root is 73 or 77, and \\(75^2 = 5625\\) is too big, so 73.\n" +
        "- Square a number near a round one with \\((a + b)^2 = a^2 + 2ab + b^2\\): \\(73^2 = 4900 + 420 + 9 = 5329\\).",
      formula: {
        label: "Bracketing between squares",
        latex:
          "k^2 \\le N < (k + 1)^2: \\ \\text{add } (k + 1)^2 - N \\text{ or subtract } N - k^2 \\qquad (a + b)^2 = a^2 + 2ab + b^2",
        symbols: [
          { symbol: "N", meaning: "the given number" },
          { symbol: "k", meaning: "the whole number whose square is just at or below N" },
        ],
      },
      authoredExample: {
        prompt: "What is the least number that must be subtracted from 3000 to make it a perfect square? What is the least number that must be added instead?",
        steps: [
          "\\(\\sqrt{3000}\\) is between 50 and 60. \\(54^2 = 2916\\) and \\(55^2 = 3025\\), so 3000 lies between them.",
          "Subtract: \\(3000 - 2916 = 84\\).",
          "Add: \\(3025 - 3000 = 25\\).",
        ],
        answer: "Subtract 84, or add 25",
      },
      selfCheckExample: {
        prompt: "Find the square root of 5476.",
        steps: [
          "It ends in 6, so the root ends in 4 or 6.",
          "\\(70^2 = 4900\\) and \\(80^2 = 6400\\), so the root is 74 or 76.",
          "\\(75^2 = 5625\\) is bigger than 5476, so the root is 74. Check: \\(74^2 = 4900 + 560 + 16 = 5476\\).",
        ],
        answer: "74",
      },
      practiceSet: [
        { prompt: "What is the least number that must be added to 1000 to make it a perfect square?", answer: "24", method: "\\(31^2 = 961\\) and \\(32^2 = 1024\\)." },
        { prompt: "Can 43728 be a perfect square?", answer: "No", method: "No perfect square ends in 8." },
        { prompt: "What is the greatest 4-digit perfect square?", answer: "9801", method: "\\(100^2 = 10000\\) has five digits, so \\(99^2 = 9801\\)." },
        {
          prompt: "1300 students stand in a square with as many rows as columns, and 4 students are left over. How many students are in each row?",
          answer: "36",
          method: "\\(1300 - 4 = 1296 = 36^2\\).",
        },
      ],
      pyqExampleId: "967e1c7a-83b3-4ad6-ada6-866cddec9241",
      traps: [
        {
          title: "Going to the wrong square",
          body: "The least number to add takes you UP to the next square; the least number to subtract takes you DOWN to the square below. Bracket the number first so you know both.",
        },
        {
          title: "Trusting the last digit as proof",
          body: "A number ending in 1, 4, 5, 6 or 9 may still not be a square (26 is not). The last digit can only strike options out; confirm a square by bracketing or squaring.",
        },
      ],
    },
  ],
};
