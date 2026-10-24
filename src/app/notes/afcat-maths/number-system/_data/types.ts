import type { SubtopicNote } from "@/app/notes/_types";

export const AF_NS_TYPES_NOTE: SubtopicNote = {
  subtopicName: "Types of Numbers",
  title: "Types of Numbers: Sets, Rationals, Primes, Squares and Cubes",
  oneLineDefinition:
    "Natural, whole, integer, rational, irrational and real numbers sit inside one another; primes have exactly two factors; perfect squares and cubes are n × n and n × n × n.",
  whyItMatters:
    "Two thirds of this page is EASY: pick the number of a given kind from four. The marks go on the borderline cases, such as zero, the number 1, 22/7 and the root of a perfect square, so learn where each set begins and ends.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afns-number-sets",
      name: "Natural, whole, integer, rational, irrational and real numbers",
      intuition:
        "Each set is the one before it plus something new. Whole numbers add 0 to the counting numbers, integers add the negatives, rationals add the fractions, and the reals add the numbers no fraction can reach.",
      definition:
        "- The chain is \\(\\mathbb{N} \\subset \\mathbb{W} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}\\): every natural number is whole, every whole number is an integer, every integer is rational, and every rational is real.\n" +
        "- Every integer is rational, because \\(n = \\tfrac n1\\). So \\(-9\\) is an integer and a rational number at once.\n" +
        "- **Zero** is whole, an integer, rational and real, and it is even. It is **not** a natural number, and it is neither prime nor composite.\n" +
        "- The irrationals are the reals that are not rational. No irrational number is an integer.",
      table: {
        columns: ["Set", "What it holds", "In it", "Not in it"],
        rows: [
          { cells: ["Natural \\(\\mathbb{N}\\)", "The counting numbers 1, 2, 3, ...", "\\(1,\\ 15,\\ 200\\)", "\\(0,\\ -4,\\ 2.5\\)"] },
          { cells: ["Whole \\(\\mathbb{W}\\)", "The natural numbers and 0", "\\(0,\\ 9,\\ 41\\)", "\\(-1,\\ \\tfrac 34\\)"] },
          {
            cells: ["Integers \\(\\mathbb{Z}\\)", "The whole numbers and their negatives", "\\(-12,\\ 0,\\ 8\\)", "\\(\\tfrac 12,\\ 0.4\\)"],
            noteAmber: "A negative number is an integer but never a whole or natural number.",
          },
          { cells: ["Rational \\(\\mathbb{Q}\\)", "\\(\\tfrac pq\\) with integers \\(p, q\\) and \\(q \\neq 0\\)", "\\(\\tfrac 34,\\ -5,\\ 0.25,\\ 0.\\overline{4}\\)", "\\(\\sqrt 3,\\ \\sqrt{11}\\)"] },
          { cells: ["Irrational", "Decimals that never end and never repeat", "\\(\\sqrt 3,\\ \\sqrt{11},\\ 2\\sqrt 6\\)", "\\(\\sqrt{25},\\ 0.\\overline{4}\\)"] },
          { cells: ["Real \\(\\mathbb{R}\\)", "The rationals and irrationals together", "Every point on the number line", "The square root of a negative number"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of \\(0\\), \\(4\\), \\(-3\\) and \\(\\tfrac 12\\) is a whole number but not a natural number?",
        steps: ["Whole numbers are 0, 1, 2, ...; natural numbers start at 1.", "Only 0 is in the first set and not the second."],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "Is \\(-12\\) a whole number?", answer: "No", method: "Whole numbers are never negative." },
        { prompt: "Is every integer a rational number?", answer: "Yes", method: "\\(n = \\tfrac n1\\)." },
        { prompt: "Which is the smallest whole number?", answer: "\\(0\\)" },
        { prompt: "Is \\(\\sqrt{25}\\) an integer?", answer: "Yes, it is \\(5\\)." },
      ],
      pyqExampleId: "3040f7cb-f52f-4bf8-8415-c63f5aeb3d4c",
      traps: [
        {
          title: "Zero is whole, not natural",
          body: "The natural numbers start at 1. Zero belongs to every other set in the chain, so 'zero is a natural number' is the false statement in an option list.",
        },
        {
          title: "The chain runs one way",
          body: "Every natural number is an integer, but not every integer is natural: \\(-3\\) is an integer and not natural. A statement that reverses the chain is false.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-rational-irrational",
      name: "Rational or irrational, and terminating or repeating",
      intuition:
        "Written as a decimal, a rational number either stops or falls into a repeating block. An irrational number does neither. A fraction stops exactly when its denominator, in lowest terms, is built from 2s and 5s alone, because only then can it be scaled to a power of 10.",
      definition:
        "- **Rational:** \\(\\tfrac pq\\) with \\(q \\neq 0\\). Its decimal terminates (\\(\\tfrac{7}{20} = 0.35\\)) or repeats (\\(\\tfrac{5}{11} = 0.\\overline{45}\\)).\n" +
        "- In lowest terms, \\(\\tfrac pq\\) **terminates** when \\(q\\) has no prime factor but 2 and 5, and **repeats** otherwise (\\(\\tfrac{5}{12} = 0.41\\overline{6}\\)).\n" +
        "- \\(\\sqrt n\\) is rational only when \\(n\\) is a perfect square: \\(\\sqrt{36} = 6\\), but \\(\\sqrt{50} = 5\\sqrt 2\\) is irrational.\n" +
        "- \\(\\pi\\) is irrational. \\(\\tfrac{22}{7}\\) and 3.14 are rational numbers close to it.\n" +
        "- A repeating decimal is rational: \\(0.\\overline{7} = \\tfrac 79\\).",
      formula: {
        label: "Terminating test",
        latex: "\\dfrac pq \\text{ in lowest terms terminates} \\;\\text{means}\\; q = 2^a \\times 5^b",
      },
      authoredExample: {
        prompt: "Which of \\(\\tfrac{7}{20}\\), \\(\\tfrac{5}{12}\\), \\(\\tfrac{9}{40}\\) and \\(\\tfrac{4}{15}\\) have terminating decimals?",
        steps: [
          "\\(20 = 2^2 \\times 5\\): terminates, \\(\\tfrac{7}{20} = 0.35\\).",
          "\\(12 = 2^2 \\times 3\\): the 3 makes it repeat, \\(0.41\\overline{6}\\).",
          "\\(40 = 2^3 \\times 5\\): terminates, \\(\\tfrac{9}{40} = 0.225\\).",
          "\\(15 = 3 \\times 5\\): repeats, \\(0.2\\overline{6}\\).",
        ],
        answer: "\\(\\tfrac{7}{20}\\) and \\(\\tfrac{9}{40}\\).",
      },
      selfCheckExample: {
        prompt: "Which of \\(\\sqrt{50}\\), \\(\\sqrt{49}\\), \\(0.\\overline{12}\\) and \\(\\tfrac{13}{25}\\) is irrational?",
        steps: [
          "\\(\\sqrt{49} = 7\\) and \\(\\tfrac{13}{25} = 0.52\\) are rational.",
          "\\(0.\\overline{12} = \\tfrac{12}{99} = \\tfrac{4}{33}\\) repeats, so it is rational.",
          "50 is not a perfect square: \\(\\sqrt{50} = 5\\sqrt 2\\).",
        ],
        answer: "\\(\\sqrt{50}\\).",
      },
      practiceSet: [
        { prompt: "Does \\(\\tfrac{11}{16}\\) have a terminating decimal?", answer: "Yes, \\(0.6875\\)", method: "\\(16 = 2^4\\)." },
        { prompt: "Write \\(0.\\overline{7}\\) as a fraction.", answer: "\\(\\tfrac 79\\)" },
        { prompt: "Is \\(\\sqrt{121}\\) rational?", answer: "Yes, it is \\(11\\)." },
        { prompt: "Does \\(\\tfrac{3}{14}\\) have a terminating decimal?", answer: "No", method: "14 has the factor 7." },
      ],
      pyqExampleId: "7b015e41-7328-43cb-aca0-30635a8baea8",
      traps: [
        {
          title: "Simplify before you test",
          body: "\\(\\tfrac{6}{15}\\) looks like a repeater because 15 has a factor 3, but it is \\(\\tfrac 25 = 0.4\\). Reduce to lowest terms first.",
        },
        {
          title: "22/7 is not pi",
          body: "\\(\\tfrac{22}{7}\\) is a fraction, so it is rational; it only approximates \\(\\pi\\). An option list asking for the irrational number wants \\(\\pi\\), not \\(\\tfrac{22}{7}\\).",
        },
        {
          title: "A long decimal can still repeat",
          body: "\\(0.142857142857\\ldots\\) looks endless, but the block 142857 repeats, so it is \\(\\tfrac 17\\) and rational.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-primes-composites",
      name: "Primes, composites, even and odd numbers",
      intuition:
        "A prime has exactly two factors, 1 and itself. To test a number, you need only try the primes up to its square root: if it had a larger factor, the matching factor would be smaller and you would have met it already.",
      definition:
        "- **Prime:** exactly two factors. **Composite:** more than two. **1** has one factor, so it is neither.\n" +
        "- **2** is the only even prime. Every even number above 2 is composite.\n" +
        "- **Even** numbers end in 0, 2, 4, 6 or 8; **odd** numbers end in 1, 3, 5, 7 or 9. An odd number need not be prime.\n" +
        "- The primes below 50: 2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47.\n" +
        "- To test \\(n\\), divide by 2, 3, 5, 7, 11, ... up to \\(\\sqrt n\\). For any \\(n\\) below 121 the primes up to 7 are enough. (Quick tests for 3, 7 and 11 come on the next page.)",
      formula: {
        label: "Prime test",
        latex: "n > 1 \\text{ is prime when no prime } p \\le \\sqrt n \\text{ divides it}",
      },
      authoredExample: {
        prompt: "Which of 111, 113, 117 and 119 is prime?",
        steps: [
          "Every one is below \\(11^2 = 121\\), so test 2, 3, 5 and 7.",
          "\\(111 = 3 \\times 37\\), \\(117 = 9 \\times 13\\) and \\(119 = 7 \\times 17\\).",
          "113 is not divisible by 2, 3, 5 or 7.",
        ],
        answer: "\\(113\\).",
      },
      selfCheckExample: {
        prompt: "Is 143 prime?",
        steps: ["\\(\\sqrt{143}\\) is just under 12, so test the primes up to 11.", "\\(143 = 11 \\times 13\\)."],
        answer: "No, it is composite.",
      },
      practiceSet: [
        { prompt: "How many primes lie between 20 and 40?", answer: "\\(4\\)", method: "23, 29, 31, 37." },
        { prompt: "Is 1 prime, composite or neither?", answer: "Neither" },
        { prompt: "Is 187 prime?", answer: "No, \\(11 \\times 17\\)." },
        { prompt: "Which list holds only primes: 2, 9, 11 or 3, 13, 31?", answer: "3, 13, 31" },
      ],
      pyqExampleId: "004e14c3-30f4-4fc4-a20a-b713e1ce239f",
      traps: [
        {
          title: "1 is not prime",
          body: "A list that includes 1 is not a list of primes. A prime needs exactly two factors and 1 has only one.",
        },
        {
          title: "Odd is not prime",
          body: "\\(51 = 3 \\times 17\\) and \\(57 = 3 \\times 19\\) are odd and composite. Test each candidate; do not stop at 'it is odd'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-squares-cubes",
      name: "Perfect squares and perfect cubes",
      intuition:
        "Know the squares up to \\(20^2\\) and the cubes up to \\(10^3\\). A number that falls strictly between two neighbouring squares is not a square, and the same goes for cubes, so one comparison settles each option.",
      definition:
        "- A **perfect square** is \\(n^2\\); the squares from \\(11^2\\) to \\(20^2\\) are 121, 144, 169, 196, 225, 256, 289, 324, 361 and 400.\n" +
        "- A **perfect cube** is \\(n^3\\): \\(6^3 = 216\\), \\(8^3 = 512\\), \\(9^3 = 729\\) and so on.\n" +
        "- A perfect square never ends in 2, 3, 7 or 8, and it ends in an even number of zeros.\n" +
        "- A number that is both a square and a cube is a sixth power: 1, then 729 (\\(27^2\\) and \\(9^3\\)), then 4096.",
      formula: {
        label: "Bracketing test",
        latex: "n^3 < N < (n+1)^3 \\;\\Rightarrow\\; N \\text{ is not a perfect cube}",
      },
      authoredExample: {
        prompt: "Which of 289, 324, 350 and 361 is not a perfect square?",
        steps: [
          "\\(17^2 = 289\\), \\(18^2 = 324\\) and \\(19^2 = 361\\).",
          "350 lies between \\(18^2\\) and \\(19^2\\), so it is not a square.",
        ],
        answer: "\\(350\\).",
      },
      selfCheckExample: {
        prompt: "Which of 216, 512, 600 and 729 is not a perfect cube?",
        steps: ["\\(216 = 6^3\\), \\(512 = 8^3\\) and \\(729 = 9^3\\).", "600 lies between \\(8^3\\) and \\(9^3\\)."],
        answer: "\\(600\\).",
      },
      practiceSet: [
        { prompt: "Is 2,000 a perfect cube?", answer: "No", method: "\\(12^3 = 1728\\) and \\(13^3 = 2197\\)." },
        { prompt: "Can a perfect square end in the digit 7?", answer: "No" },
        { prompt: "Is 729 both a perfect square and a perfect cube?", answer: "Yes, \\(27^2 = 9^3\\)." },
        { prompt: "What is \\(15^2\\)?", answer: "\\(225\\)" },
      ],
      pyqExampleId: "1a12dc56-ad91-499c-b5a5-a5aae4be7bf7",
      traps: [
        {
          title: "A cube is not automatically a square",
          body: "\\(27 = 3^3\\) is a cube, but it lies between \\(5^2 = 25\\) and \\(6^2 = 36\\), so it is not a square. Being both needs a sixth power.",
        },
        {
          title: "Count the zeros",
          body: "4,000 ends in three zeros, an odd number, so it cannot be a perfect square. 40,000 ends in four and is \\(200^2\\).",
        },
      ],
    },
  ],
};
