import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_NS_FACTORS_NOTE: SubtopicNote = {
  subtopicName: "Factorisation, HCF and LCM",
  title: "Factorisation, HCF and LCM",
  oneLineDefinition:
    "Write a number as a product of prime powers, and its divisors, its common factors with another number and its least common multiple can all be read off directly.",
  whyItMatters:
    "Eleven questions in the bank, eight EASY and three MODERATE. Every one starts the same way, by writing a number or a sum as a product of primes, and the answer is then one line away: a divisor count, a factor of a sum of powers, a tile size or the least square multiple.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscnsfa-divisors",
      name: "Prime factorisation and counting divisors",
      intuition:
        "Every divisor of \\(2^3 \\times 3^2\\) is built by choosing how many 2s (none to three) and how many 3s (none to two) to take. So counting divisors is counting choices, and adding them up is multiplying the sums of each prime's choices.",
      definition:
        "- Write \\(N = p^a \\times q^b \\times r^c\\), with \\(p, q, r\\) different primes. Divide out the small primes 2, 3, 5, 7 in turn.\n" +
        "- **Number of divisors** \\(= (a + 1)(b + 1)(c + 1)\\). It counts 1 and \\(N\\) itself.\n" +
        "- **Sum of divisors** \\(= (1 + p + \\cdots + p^a)(1 + q + \\cdots + q^b)(1 + r + \\cdots + r^c)\\).\n" +
        "- **Divisors that are perfect squares** use only even powers of each prime: for \\(2^4\\) the choices are \\(2^0, 2^2, 2^4\\).\n" +
        "- \\(d\\) divides \\(N\\) exactly when every prime power in \\(d\\) also appears in \\(N\\), at least as high.\n" +
        "- For the sum of the first \\(n\\) natural numbers, find it with \\(\\frac{n(n + 1)}{2}\\), then factorise to see what divides it.",
      formula: {
        label: "Divisors from the prime factorisation",
        latex:
          "N = p^a q^b r^c: \\quad \\text{number of divisors} = (a + 1)(b + 1)(c + 1) \\qquad \\text{sum of divisors} = (1 + p + \\cdots + p^a)(1 + q + \\cdots + q^b)(1 + r + \\cdots + r^c) \\qquad 1 + 2 + \\cdots + n = \\frac{n(n + 1)}{2}",
        symbols: [
          { symbol: "p, q, r", meaning: "the different prime factors of N" },
          { symbol: "a, b, c", meaning: "how many times each prime appears" },
        ],
      },
      authoredExample: {
        prompt: "How many divisors does 540 have, and what is their sum?",
        steps: [
          "\\(540 = 4 \\times 135 = 2^2 \\times 3^3 \\times 5\\).",
          "Number of divisors \\(= (2 + 1)(3 + 1)(1 + 1) = 3 \\times 4 \\times 2 = 24\\).",
          "Sum \\(= (1 + 2 + 4)(1 + 3 + 9 + 27)(1 + 5) = 7 \\times 40 \\times 6 = 1680\\).",
        ],
        answer: "24 divisors, sum 1680",
      },
      selfCheckExample: {
        prompt: "How many divisors of 144 are perfect squares?",
        steps: [
          "\\(144 = 2^4 \\times 3^2\\).",
          "Even powers only: \\(2^0, 2^2, 2^4\\) (3 choices) and \\(3^0, 3^2\\) (2 choices), so \\(3 \\times 2 = 6\\).",
          "They are 1, 4, 16, 9, 36 and 144.",
        ],
        answer: "6",
      },
      practiceSet: [
        { prompt: "Write 252 as a product of prime powers.", answer: "\\(2^2 \\times 3^2 \\times 7\\)" },
        { prompt: "How many divisors does 72 have?", answer: "12", method: "\\(72 = 2^3 \\times 3^2\\), so \\(4 \\times 3 = 12\\)." },
        { prompt: "What is the sum of all the divisors of 50?", answer: "93", method: "\\(50 = 2 \\times 5^2\\): \\((1 + 2)(1 + 5 + 25) = 3 \\times 31 = 93\\)." },
        { prompt: "Is \\(2^3 \\times 3 \\times 7\\) a divisor of \\(2^4 \\times 3^2 \\times 5\\)?", answer: "No", method: "The prime 7 does not appear in the second number." },
      ],
      pyqExampleId: "200471d5-7c94-4f56-b3f6-17e0a811cb44",
      traps: [
        {
          title: "Multiplying the powers instead of the powers plus one",
          body: "\\(2^3 \\times 3^2\\) has \\((3 + 1)(2 + 1) = 12\\) divisors, not \\(3 \\times 2 = 6\\). The plus one is the choice of taking none of that prime.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsfa-powers",
      name: "Taking a common power out of a sum of powers",
      intuition:
        "A sum like \\(3^{10} + 3^{11} + 3^{12}\\) is too big to work out, but every term holds \\(3^{10}\\). Take it out, and what is left in the bracket is a small number you can factorise in your head.",
      definition:
        "- **Take out the smallest power:** \\(a^m + a^{m+1} + \\cdots + a^{m+k} = a^m(1 + a + \\cdots + a^k)\\).\n" +
        "- The sum is divisible by every factor of the bracket **and** by every factor of \\(a^m\\).\n" +
        "- \\(a^n - b^n\\) is always divisible by \\(a - b\\). So \\(a^n - 1\\) is divisible by \\(a - 1\\).\n" +
        "- \\(a^n - b^n\\) is also divisible by \\(a + b\\) when \\(n\\) is **even**, and \\(a^n + b^n\\) is divisible by \\(a + b\\) when \\(n\\) is **odd**.\n" +
        "- Fast route: rewrite to a bigger base first. With \\(m\\) even, \\(8^m - 1 = 64^{m/2} - 1\\), divisible by 63.\n" +
        "- For a 'least value of n' question, try the options from the smallest.",
      formula: {
        label: "Sums and differences of powers",
        latex:
          "a^m + a^{m+1} + \\cdots + a^{m+k} = a^m(1 + a + \\cdots + a^k) \\qquad a^n - b^n \\text{ is divisible by } a - b \\qquad a^n - b^n \\text{ is divisible by } a + b \\ (n \\text{ even}) \\qquad a^n + b^n \\text{ is divisible by } a + b \\ (n \\text{ odd})",
      },
      authoredExample: {
        prompt: "Which of 11, 13 and 31 divides \\(5^{20} + 5^{21} + 5^{22}\\)?",
        steps: [
          "Take out \\(5^{20}\\): \\(5^{20}(1 + 5 + 25) = 5^{20} \\times 31\\).",
          "31 is prime, so the only prime factors are 5 and 31.",
          "So 31 divides it, and 11 and 13 do not.",
        ],
        answer: "31",
      },
      selfCheckExample: {
        prompt: "Is \\(3^{40} - 1\\) divisible by 80?",
        steps: [
          "\\(3^{40} = (3^4)^{10} = 81^{10}\\).",
          "\\(81^{10} - 1\\) is divisible by \\(81 - 1 = 80\\).",
        ],
        answer: "Yes",
      },
      practiceSet: [
        { prompt: "Write \\(2^{10} + 2^{11} + 2^{12}\\) as \\(2^{10}\\) times a whole number.", answer: "\\(2^{10} \\times 7\\)", method: "\\(1 + 2 + 4 = 7\\)." },
        { prompt: "Is \\(7^{12} - 1\\) divisible by 6?", answer: "Yes", method: "\\(a^n - 1\\) is divisible by \\(a - 1 = 6\\)." },
        { prompt: "Is \\(5^{9} + 1\\) divisible by 6?", answer: "Yes", method: "The power is odd, so \\(5^9 + 1^9\\) is divisible by \\(5 + 1 = 6\\)." },
        { prompt: "Which prime divides \\(10^{5} + 10^{6}\\) other than 2 and 5?", answer: "11", method: "\\(10^5(1 + 10) = 10^5 \\times 11\\)." },
      ],
      pyqExampleId: "ecb7b67c-d513-489d-83f4-847908aca279",
      traps: [
        {
          title: "Forgetting the factors of the power you took out",
          body: "\\(3^8 + 3^9 = 3^8 \\times 4\\) is divisible by 4, but also by 3, by 81 and by 12. When more than one option divides the sum, check the factors of \\(3^8\\) as well as the bracket.",
        },
        {
          title: "Using a + b on an odd power of a difference",
          body: "\\(a^n - b^n\\) is divisible by \\(a + b\\) only for even \\(n\\). \\(8^3 - 1 = 511 = 7 \\times 73\\) is not divisible by \\(8 + 1 = 9\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscnsfa-hcflcm",
      name: "HCF, LCM and the least square multiple",
      intuition:
        "The HCF is the biggest measure that fits a whole number of times into each number; the LCM is the smallest number each one fits into. In prime powers, the HCF takes the lower power of each common prime and the LCM takes the higher power of every prime.",
      definition:
        "- **HCF**: the lowest power of each prime common to all the numbers. **LCM**: the highest power of every prime that appears.\n" +
        "- Co-prime numbers (you met them on the tests page) have HCF 1, and their LCM is their product.\n" +
        "- For **two** numbers: HCF \\(\\times\\) LCM \\(=\\) the product of the numbers. Their **mean proportional** \\(\\sqrt{ab}\\) is therefore \\(\\sqrt{\\text{HCF} \\times \\text{LCM}}\\).\n" +
        "- The largest square tile for a floor \\(L \\times B\\) has side HCF\\((L, B)\\), in the same units; the number of tiles is \\(\\frac{L}{h} \\times \\frac{B}{h}\\).\n" +
        "- The least number divisible by several numbers is their LCM.\n" +
        "- The **least perfect square** divisible by several numbers: find the LCM, then multiply by each prime that appears to an odd power, once. A square has every prime to an even power.",
      formula: {
        label: "HCF, LCM, tiles and the mean proportional",
        latex:
          "\\text{HCF} \\times \\text{LCM} = a \\times b \\qquad \\sqrt{ab} = \\sqrt{\\text{HCF} \\times \\text{LCM}} \\qquad \\text{tiles} = \\frac{L}{h} \\times \\frac{B}{h}, \\ h = \\text{HCF}(L, B)",
        symbols: [
          { symbol: "a, b", meaning: "the two numbers" },
          { symbol: "L, B", meaning: "the length and breadth of the floor, in one unit" },
          { symbol: "h", meaning: "the side of the largest square tile" },
        ],
      },
      authoredExample: {
        prompt: "Find the least perfect square that is divisible by 4, 6 and 14.",
        steps: [
          "\\(4 = 2^2\\), \\(6 = 2 \\times 3\\), \\(14 = 2 \\times 7\\). LCM \\(= 2^2 \\times 3 \\times 7 = 84\\).",
          "3 and 7 appear to odd powers, so multiply by \\(3 \\times 7 = 21\\).",
          "\\(84 \\times 21 = 1764 = 42^2\\).",
        ],
        answer: "1764",
      },
      selfCheckExample: {
        prompt: "A floor 3 m 60 cm long and 2 m 40 cm wide is paved with equal square tiles, as large as possible. How many tiles are needed?",
        steps: [
          "In centimetres: 360 and 240. HCF\\((360, 240) = 120\\), so each tile is 120 cm.",
          "Tiles \\(= \\frac{360}{120} \\times \\frac{240}{120} = 3 \\times 2 = 6\\).",
        ],
        answer: "6",
      },
      practiceSet: [
        { prompt: "The HCF of two numbers is 6 and their LCM is 72. One of them is 18. What is the other?", answer: "24", method: "\\(\\frac{6 \\times 72}{18} = 24\\)." },
        { prompt: "Find the HCF and the LCM of \\(2^3 \\times 3^2 \\times 5\\) and \\(2^2 \\times 3^3 \\times 7\\).", answer: "HCF 36, LCM 7560", method: "HCF \\(= 2^2 \\times 3^2\\); LCM \\(= 2^3 \\times 3^3 \\times 5 \\times 7\\)." },
        { prompt: "What is the least number divisible by 9, 12 and 15?", answer: "180", method: "\\(2^2 \\times 3^2 \\times 5 = 180\\)." },
        { prompt: "Two numbers have HCF 3 and LCM 27. What is their mean proportional?", answer: "9", method: "\\(\\sqrt{3 \\times 27} = \\sqrt{81} = 9\\)." },
      ],
      pyqExampleId: "9b1f1b42-73af-4796-99e5-a9eb845f0945",
      traps: [
        {
          title: "Using HCF times LCM for three numbers",
          body: "HCF \\(\\times\\) LCM equals the product only for two numbers. For 2, 4 and 8 the HCF is 2 and the LCM 8, but the product is 64.",
        },
        {
          title: "Squaring the LCM to get a square multiple",
          body: "The least square multiple of \\(12 = 2^2 \\times 3\\) is \\(12 \\times 3 = 36\\), not \\(12^2 = 144\\). Multiply only by the primes whose power is odd.",
        },
      ],
    },
  ],
};
