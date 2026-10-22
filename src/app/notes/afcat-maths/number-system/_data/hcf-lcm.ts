import type { SubtopicNote } from "@/app/notes/_types";

export const AF_NS_HCF_LCM_NOTE: SubtopicNote = {
  subtopicName: "Factors and Multiples",
  title: "Factors and Multiples: HCF, LCM and Co-prime Numbers",
  oneLineDefinition:
    "List factors and multiples, find the HCF (the greatest common factor) and the LCM (the least common multiple), and use HCF × LCM = product for two numbers.",
  whyItMatters:
    "None of this page is HARD, but HCF and LCM are easy to swap. Every question asks either for the greatest number that divides (the HCF) or the smallest number that is divided (the LCM), and settling which one comes before any arithmetic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afns-factor-multiple-lists",
      name: "Factors, multiples and the common ones",
      intuition:
        "A factor of \\(n\\) divides it exactly; a multiple of \\(n\\) is \\(n\\) times a whole number. Factors come in pairs that multiply to \\(n\\), so you only need to search up to \\(\\sqrt n\\). Multiples never stop.",
      definition:
        "- List the factors of \\(n\\) in pairs: for 28, \\(1 \\times 28\\), \\(2 \\times 14\\), \\(4 \\times 7\\).\n" +
        "- Every number has 1 and itself as factors. Factors are at most \\(n\\); multiples are at least \\(n\\).\n" +
        "- **Common factors** of two numbers appear in both lists. They are exactly the factors of the HCF (next concept).\n" +
        "- **Common multiples** are divisible by both. They are exactly the multiples of the LCM.",
      formula: {
        label: "Factor pairs",
        latex: "n = a \\times b \\;\\Rightarrow\\; a \\text{ and } b \\text{ are both factors of } n",
      },
      authoredExample: {
        prompt: "List the factors of 42 and of 56, and their common factors.",
        steps: [
          "42: \\(1 \\times 42,\\ 2 \\times 21,\\ 3 \\times 14,\\ 6 \\times 7\\), so 1, 2, 3, 6, 7, 14, 21, 42.",
          "56: \\(1 \\times 56,\\ 2 \\times 28,\\ 4 \\times 14,\\ 7 \\times 8\\), so 1, 2, 4, 7, 8, 14, 28, 56.",
          "In both lists: 1, 2, 7, 14.",
        ],
        answer: "Common factors 1, 2, 7, 14.",
      },
      selfCheckExample: {
        prompt: "Which of 54, 63, 72 and 84 is a multiple of both 9 and 4?",
        steps: ["It must be a multiple of 36.", "Only \\(72 = 36 \\times 2\\) is."],
        answer: "\\(72\\).",
      },
      practiceSet: [
        { prompt: "List the factors of 28.", answer: "1, 2, 4, 7, 14, 28" },
        { prompt: "Write the first four multiples of 12.", answer: "12, 24, 36, 48" },
        { prompt: "Find the common factors of 18 and 27.", answer: "1, 3, 9" },
        { prompt: "Is 1 a factor of every whole number?", answer: "Yes" },
      ],
      pyqExampleId: "021c6e22-76f1-4b9e-98e8-2f617cf74151",
      traps: [
        {
          title: "Factors versus multiples",
          body: "The factors of 24 run from 1 to 24; its multiples start at 24 and go on (48, 72, ...). An option list of multiples offered as factors is the wrong answer.",
        },
        {
          title: "Do not drop 1 or the number itself",
          body: "A factor list of 28 without 1 or 28 is incomplete, and so is a list of common factors without 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-hcf",
      name: "HCF, by primes or by Euclid, and co-prime numbers",
      intuition:
        "The highest common factor is the largest number that divides each of them. From the prime factorisations, it keeps only the primes every number shares, each to the smallest power found. For two large numbers, Euclid's method replaces the larger by its remainder until the division comes out exact.",
      definition:
        "- **By primes:** common primes, each to its **lowest** power.\n" +
        "- **By Euclid:** divide the larger by the smaller, then divide the smaller by the remainder, and so on. The last non-zero remainder is the HCF.\n" +
        "- 'The greatest number that divides \\(a\\), \\(b\\) and \\(c\\) exactly' is their HCF.\n" +
        "- The number of common factors is the number of divisors of the HCF.\n" +
        "- **Co-prime** numbers have HCF 1. Neither need be prime: 8 and 15 are co-prime.",
      formula: {
        label: "HCF from prime factors",
        latex: "\\text{HCF} = \\text{product of the common primes, each to its lowest power}",
      },
      authoredExample: {
        prompt: "Find the HCF of 84 and 126, by primes and by Euclid.",
        steps: [
          "\\(84 = 2^2 \\times 3 \\times 7\\), \\(126 = 2 \\times 3^2 \\times 7\\). Lowest powers: \\(2 \\times 3 \\times 7 = 42\\).",
          "Euclid: \\(126 = 84 \\times 1 + 42\\), then \\(84 = 42 \\times 2 + 0\\). The last non-zero remainder is 42.",
        ],
        answer: "\\(42\\).",
      },
      selfCheckExample: {
        prompt: "How many common factors do 54 and 90 have?",
        steps: [
          "\\(54 = 2 \\times 3^3\\), \\(90 = 2 \\times 3^2 \\times 5\\). HCF \\(= 2 \\times 3^2 = 18\\).",
          "18 has \\((1 + 1)(2 + 1) = 6\\) divisors.",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Find the HCF of 56 and 98.", answer: "\\(14\\)" },
        { prompt: "Are 35 and 64 co-prime?", answer: "Yes", method: "\\(5 \\times 7\\) and \\(2^6\\) share no prime." },
        { prompt: "Find the greatest number that divides 84, 140 and 196 exactly.", answer: "\\(28\\)" },
        { prompt: "Find the HCF of 391 and 323 by Euclid's method.", answer: "\\(17\\)", method: "Remainders 68, 51, 17, 0." },
      ],
      pyqExampleId: "b0e4d224-5ece-4312-b89b-f82604142091",
      traps: [
        {
          title: "Co-prime is not prime",
          body: "8 and 15 are co-prime though neither is prime. Two odd numbers need not be co-prime: 15 and 21 share the factor 3.",
        },
        {
          title: "Lowest powers for HCF",
          body: "For \\(2^3 \\times 5\\) and \\(2 \\times 5^2\\) the HCF is \\(2 \\times 5 = 10\\). Taking the highest powers gives the LCM instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-lcm",
      name: "LCM, and the least number leaving a given remainder",
      intuition:
        "The least common multiple is the smallest number that each of them divides. It must hold every prime any of them needs, each to the largest power any of them needs, and nothing more. Lights that flash together again, or bells that ring together, meet after the LCM.",
      definition:
        "- **By primes:** every prime that appears, each to its **highest** power.\n" +
        "- 'The smallest number divisible by \\(a\\), \\(b\\) and \\(c\\)', 'when will they ring (flash, meet) together' are LCM questions.\n" +
        "- The least number that leaves the **same remainder** \\(r\\) on division by \\(a\\), \\(b\\) and \\(c\\) is \\(\\text{LCM} + r\\).\n" +
        "- For numbers that share no factor, the LCM is their product.",
      formula: {
        label: "LCM from prime factors",
        latex: "\\text{LCM} = \\text{product of every prime present, each to its highest power}",
      },
      authoredExample: {
        prompt: "Three lights flash every 8, 14 and 18 seconds. They flash together now. After how many seconds will they next flash together?",
        steps: [
          "\\(8 = 2^3\\), \\(14 = 2 \\times 7\\), \\(18 = 2 \\times 3^2\\).",
          "Highest powers: \\(2^3 \\times 3^2 \\times 7 = 504\\).",
        ],
        answer: "504 seconds.",
      },
      selfCheckExample: {
        prompt: "Find the least number that leaves remainder 3 when divided by 4, by 9 and by 14.",
        steps: [
          "LCM: \\(4 = 2^2\\), \\(9 = 3^2\\), \\(14 = 2 \\times 7\\), so \\(2^2 \\times 3^2 \\times 7 = 252\\).",
          "Add the remainder: \\(252 + 3 = 255\\).",
        ],
        answer: "\\(255\\).",
      },
      practiceSet: [
        { prompt: "Find the LCM of 16 and 24.", answer: "\\(48\\)" },
        { prompt: "Find the LCM of 4, 9 and 10.", answer: "\\(180\\)" },
        { prompt: "Find the smallest number divisible by 8, 10 and 14.", answer: "\\(280\\)" },
        { prompt: "Find the least number that leaves remainder 2 when divided by 5, 7 and 8.", answer: "\\(282\\)" },
      ],
      pyqExampleId: "91a42791-2664-4f0b-9009-0eb41145b4d6",
      traps: [
        {
          title: "The LCM is not always the product",
          body: "8 and 14 share the factor 2, so their LCM is 56, not \\(8 \\times 14 = 112\\). The product is the LCM only for co-prime numbers.",
        },
        {
          title: "Add the remainder, do not subtract it",
          body: "A number leaving remainder 3 on 4, 9 and 14 is 3 more than a common multiple: 255, not 249.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-hcf-times-lcm",
      name: "HCF × LCM = product of the two numbers",
      intuition:
        "For two numbers, the HCF collects the primes they share and the LCM collects everything; between them they use each prime exactly as often as the two numbers do. So the HCF times the LCM is the product of the numbers.",
      definition:
        "- For **two** numbers \\(a\\) and \\(b\\): \\(\\text{HCF} \\times \\text{LCM} = a \\times b\\).\n" +
        "- Given the HCF, the LCM and one number, the other is \\(\\tfrac{\\text{HCF} \\times \\text{LCM}}{a}\\).\n" +
        "- The HCF always divides the LCM. If it does not, no such pair exists.\n" +
        "- For co-prime numbers the HCF is 1, so the LCM is the product.",
      formula: {
        label: "Two numbers",
        latex: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
      },
      authoredExample: {
        prompt: "The HCF of two numbers is 12 and their LCM is 360. One number is 72. Find the other.",
        steps: [
          "Other \\(= \\dfrac{12 \\times 360}{72} = \\dfrac{4320}{72} = 60\\).",
          "Check: \\(72 = 2^3 \\times 3^2\\) and \\(60 = 2^2 \\times 3 \\times 5\\) have HCF 12 and LCM 360.",
        ],
        answer: "\\(60\\).",
      },
      selfCheckExample: {
        prompt: "Two numbers have product 2,028 and HCF 13. Find their LCM.",
        steps: ["\\(\\text{LCM} = \\dfrac{2028}{13} = 156\\)."],
        answer: "\\(156\\).",
      },
      practiceSet: [
        { prompt: "The HCF of two numbers is 8, their LCM is 120 and one of them is 24. Find the other.", answer: "\\(40\\)" },
        { prompt: "Two co-prime numbers have product 117. Find their LCM.", answer: "\\(117\\)" },
        { prompt: "Can two numbers have HCF 6 and LCM 50?", answer: "No", method: "6 does not divide 50." },
      ],
      pyqExampleId: "9d9dd1fb-c975-4f3e-8e6d-46a08feeb5d5",
      traps: [
        {
          title: "Two numbers only",
          body: "For 2, 4 and 8 the HCF is 2 and the LCM is 8, so HCF × LCM is 16, but the product is 64. The rule holds for a pair, not for three numbers.",
        },
      ],
    },
  ],
};
