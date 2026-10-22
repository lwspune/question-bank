import type { SubtopicNote } from "@/app/notes/_types";

export const AF_NS_PRIME_FACTORS_NOTE: SubtopicNote = {
  subtopicName: "Prime Factorization",
  title: "Prime Factorisation, and Counting Divisors from It",
  oneLineDefinition:
    "Write a number as a product of powers of primes, then read off its distinct primes, its number of divisors, its odd and even divisors and the sum of its divisors.",
  whyItMatters:
    "This is the largest page of the chapter, and half of it asks for a factorisation in powers of primes. The options differ by a single exponent, so multiply your answer back before you choose. The rest reads facts off the factorisation, above all how many divisors a number has.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afns-factor-tree",
      name: "Writing a prime factorisation",
      intuition:
        "Divide by the smallest prime that goes in, again and again: 2 until the number is odd, then 3, then 5, then 7. When what is left is 1, the primes you divided by are the factorisation. Splitting into known pieces first (a power of 10, a square) is often faster.",
      definition:
        "- Every whole number above 1 has exactly one prime factorisation, written as powers: \\(2^a \\times 3^b \\times 5^c \\times \\cdots\\)\n" +
        "- Use the divisibility rules from the last page to see which prime divides next.\n" +
        "- Known pieces help: \\(100 = 2^2 \\times 5^2\\), \\(1000 = 2^3 \\times 5^3\\), \\(2^{10} = 1024\\).\n" +
        "- Check by multiplying back. The options usually differ by one exponent.",
      formula: {
        label: "Prime factorisation",
        latex: "N = p_1^{a_1} \\times p_2^{a_2} \\times \\cdots \\times p_k^{a_k} \\quad (p_i \\text{ prime})",
      },
      authoredExample: {
        prompt: "Find the prime factorisation of 1,260.",
        steps: [
          "Halve twice: \\(1260 = 2 \\times 630 = 2^2 \\times 315\\).",
          "315 has digit sum 9, so divide by 3 twice: \\(315 = 3^2 \\times 35\\).",
          "\\(35 = 5 \\times 7\\). Check: \\(4 \\times 9 \\times 35 = 1260\\).",
        ],
        answer: "\\(2^2 \\times 3^2 \\times 5 \\times 7\\).",
      },
      selfCheckExample: {
        prompt: "Find the prime factorisation of 3,600.",
        steps: ["\\(3600 = 36 \\times 100\\).", "\\(36 = 2^2 \\times 3^2\\) and \\(100 = 2^2 \\times 5^2\\). Add the powers of 2."],
        answer: "\\(2^4 \\times 3^2 \\times 5^2\\).",
      },
      practiceSet: [
        { prompt: "Find the prime factorisation of 588.", answer: "\\(2^2 \\times 3 \\times 7^2\\)" },
        { prompt: "Find the prime factorisation of 512.", answer: "\\(2^9\\)" },
        { prompt: "Find the prime factorisation of 1,050.", answer: "\\(2 \\times 3 \\times 5^2 \\times 7\\)" },
        { prompt: "Find the prime factorisation of 675.", answer: "\\(3^3 \\times 5^2\\)" },
      ],
      pyqExampleId: "10475d86-1559-48ea-8003-f8e2348df72d",
      traps: [
        {
          title: "Keep going until every factor is prime",
          body: "\\(2^2 \\times 3 \\times 15\\) is not finished: \\(15 = 3 \\times 5\\), so the factorisation is \\(2^2 \\times 3^2 \\times 5\\).",
        },
        {
          title: "Add exponents when pieces share a prime",
          body: "\\(3600 = 36 \\times 100\\) has \\(2^2\\) from each piece, so the power of 2 is \\(2^4\\), not \\(2^2\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-reading-factorisation",
      name: "Reading a factorisation: distinct primes, repeats and the number itself",
      intuition:
        "Once the number is written as powers of primes, many questions are a glance: the bases are the distinct primes, the exponents count the repeats, and multiplying out gives the number back.",
      definition:
        "- **Distinct prime factors:** the bases. \\(2^3 \\times 5^2\\) has two, 2 and 5.\n" +
        "- **Prime factors counted with repeats:** the sum of the exponents. \\(2^3 \\times 5^2\\) has five: 2, 2, 2, 5, 5.\n" +
        "- **Product of the distinct primes:** multiply the bases once each.\n" +
        "- **Exponent form:** \\(2 \\times 2 \\times 7\\) is \\(2^2 \\times 7\\).\n" +
        "- A product is a **prime** factorisation only if every base is prime; a 9, 15 or 21 hides more primes.",
      formula: {
        label: "For N = pᵃ × qᵇ × rᶜ",
        latex: "\\text{distinct primes} = 3,\\qquad \\text{primes with repeats} = a + b + c",
      },
      authoredExample: {
        prompt: "\\(2700 = 2^2 \\times 3^3 \\times 5^2\\). Find its number of distinct prime factors, its prime factors counted with repeats, and the product of its distinct primes.",
        steps: ["The bases are 2, 3 and 5: three distinct primes.", "With repeats: \\(2 + 3 + 2 = 7\\).", "Product of the bases: \\(2 \\times 3 \\times 5 = 30\\)."],
        answer: "3; 7; 30.",
      },
      selfCheckExample: {
        prompt: "Which number has the prime factorisation \\(2 \\times 3^3 \\times 7\\)?",
        steps: ["\\(3^3 = 27\\), and \\(2 \\times 27 = 54\\).", "\\(54 \\times 7 = 378\\)."],
        answer: "\\(378\\).",
      },
      practiceSet: [
        { prompt: "Write \\(3 \\times 3 \\times 5 \\times 7 \\times 7\\) in exponent form.", answer: "\\(3^2 \\times 5 \\times 7^2\\)" },
        { prompt: "How many distinct prime factors has 2,310?", answer: "\\(5\\)", method: "\\(2 \\times 3 \\times 5 \\times 7 \\times 11\\)." },
        { prompt: "Is \\(2^3 \\times 5 \\times 21\\) a prime factorisation?", answer: "No", method: "\\(21 = 3 \\times 7\\)." },
        { prompt: "Find the sum of the exponents in \\(2^4 \\times 3 \\times 5^2\\).", answer: "\\(7\\)" },
      ],
      pyqExampleId: "fa91dd07-7923-497c-8ee4-38f9f98594c4",
      traps: [
        {
          title: "Distinct is not counted with repeats",
          body: "\\(2^3 \\times 5\\) has 2 distinct prime factors but 4 counted with repeats. Read which one the question asks for.",
        },
        {
          title: "A bare exponent counts once",
          body: "In \\(2^4 \\times 3 \\times 5^2\\) the 3 has exponent 1. Leaving it out makes the sum of exponents 6 instead of 7.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-number-of-divisors",
      name: "How many divisors a number has",
      intuition:
        "A divisor of \\(2^3 \\times 5^2\\) takes some power of 2 (from \\(2^0\\) to \\(2^3\\), four choices) and some power of 5 (from \\(5^0\\) to \\(5^2\\), three choices). Every pair of choices is a different divisor, so there are \\(4 \\times 3 = 12\\).",
      definition:
        "- If \\(N = p^a \\times q^b \\times r^c\\), the number of divisors is \\((a + 1)(b + 1)(c + 1)\\).\n" +
        "- The count includes 1 and \\(N\\) itself.\n" +
        "- A prime has 2 divisors; \\(p^a\\) has \\(a + 1\\).\n" +
        "- Only perfect squares have an odd number of divisors, because only there does one divisor pair with itself.",
      formula: {
        label: "Number of divisors",
        latex: "N = p^a q^b r^c \\;\\Rightarrow\\; d(N) = (a + 1)(b + 1)(c + 1)",
      },
      authoredExample: {
        prompt: "How many divisors has 450?",
        steps: ["\\(450 = 2 \\times 3^2 \\times 5^2\\).", "\\((1 + 1)(2 + 1)(2 + 1) = 2 \\times 3 \\times 3 = 18\\)."],
        answer: "\\(18\\).",
      },
      selfCheckExample: {
        prompt: "How many divisors has 1,000?",
        steps: ["\\(1000 = 2^3 \\times 5^3\\).", "\\((3 + 1)(3 + 1) = 16\\)."],
        answer: "\\(16\\).",
      },
      practiceSet: [
        { prompt: "How many divisors has 100?", answer: "\\(9\\)", method: "\\(2^2 \\times 5^2\\)." },
        { prompt: "How many divisors has \\(2^7\\)?", answer: "\\(8\\)" },
        { prompt: "How many divisors has 96?", answer: "\\(12\\)", method: "\\(2^5 \\times 3\\)." },
        { prompt: "How many divisors has a prime number?", answer: "\\(2\\)" },
      ],
      pyqExampleId: "cbed4b6c-94de-409a-a40d-76245f783d1d",
      traps: [
        {
          title: "Add 1 to each exponent first",
          body: "\\(2^3 \\times 3^2\\) has \\((3 + 1)(2 + 1) = 12\\) divisors. Multiplying the exponents themselves gives 6, which is wrong.",
        },
        {
          title: "Factorise fully before counting",
          body: "Written as \\(4 \\times 25\\), 100 seems to give \\((1 + 1)(1 + 1) = 4\\) divisors. Only prime powers work: \\(2^2 \\times 5^2\\) gives 9.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-odd-even-sum-divisors",
      name: "Odd divisors, even divisors and the sum of the divisors",
      intuition:
        "An odd divisor takes no factor of 2 at all, so count the divisors of the number with its power of 2 removed. Every other divisor is even. The sum of the divisors multiplies out the same choices, adding the powers of each prime instead of counting them.",
      definition:
        "- For \\(N = 2^a \\times q^b \\times r^c\\) with \\(q, r\\) odd primes: **odd divisors** \\((b + 1)(c + 1)\\).\n" +
        "- **Even divisors** = all divisors minus odd ones = \\(a(b + 1)(c + 1)\\).\n" +
        "- **Sum of divisors:** \\((1 + p + \\cdots + p^a)(1 + q + \\cdots + q^b)\\cdots\\)\n" +
        "- An odd number has no even divisors at all.",
      formula: {
        label: "Odd and even divisors of 2ᵃ × qᵇ × rᶜ",
        latex: "\\text{odd} = (b + 1)(c + 1),\\qquad \\text{even} = a(b + 1)(c + 1)",
      },
      authoredExample: {
        prompt: "How many odd and how many even divisors has 1,200?",
        steps: [
          "\\(1200 = 2^4 \\times 3 \\times 5^2\\), with \\((5)(2)(3) = 30\\) divisors in all.",
          "Odd: drop the \\(2^4\\), giving \\((1 + 1)(2 + 1) = 6\\).",
          "Even: \\(30 - 6 = 24\\), or \\(4 \\times 6 = 24\\).",
        ],
        answer: "6 odd and 24 even.",
      },
      selfCheckExample: {
        prompt: "Find the sum of the divisors of 28.",
        steps: ["\\(28 = 2^2 \\times 7\\).", "\\((1 + 2 + 4)(1 + 7) = 7 \\times 8 = 56\\). Check: \\(1 + 2 + 4 + 7 + 14 + 28 = 56\\)."],
        answer: "\\(56\\).",
      },
      practiceSet: [
        { prompt: "How many odd divisors has \\(2^5 \\times 7\\)?", answer: "\\(2\\)", method: "1 and 7." },
        { prompt: "How many even divisors has 48?", answer: "\\(8\\)", method: "\\(2^4 \\times 3\\): \\(4 \\times 2\\)." },
        { prompt: "Find the sum of the divisors of 20.", answer: "\\(42\\)", method: "\\((1 + 2 + 4)(1 + 5)\\)." },
      ],
      pyqExampleId: "865d13b8-f42f-467a-8324-6a8537950b4f",
      traps: [
        {
          title: "Even divisors are not half the total",
          body: "\\(2^3 \\times 3 = 24\\) has 8 divisors: 2 odd (1 and 3) and 6 even. Split the count with the formula, never in half.",
        },
      ],
    },
  ],
};
