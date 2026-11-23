import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_NS_HCF_NOTE: SubtopicNote = {
  subtopicName: "Factorisation, HCF and LCM",
  title: "Factorisation, HCF and LCM",
  oneLineDefinition:
    "Break numbers into primes: the HCF takes the lowest shared powers, the LCM the highest powers, and the same two tools solve the 'same remainder' recipes and count divisors.",
  whyItMatters:
    "9 questions in the Tier II bank, 8 EASY and 1 MODERATE. Every one starts from prime factors or from the rule that HCF times LCM equals the product of two numbers.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2nshl-laws",
      name: "HCF and LCM",
      visualizationSlug: "ssc-t2-hcf-lcm-venn",
      intuition:
        "The HCF keeps only what the numbers share: the lowest power of each common prime. The LCM keeps everything: the highest power of every prime that appears. For two numbers, the HCF times the LCM is their product.",
      definition:
        "- Write each number as a product of primes. HCF: the lowest power of each prime common to all. LCM: the highest power of every prime in any of them.\n" +
        "- For two numbers: HCF \\(\\times\\) LCM \\(= a \\times b\\).\n" +
        "- Two numbers with HCF h are \\(h \\times\\) (a pair with no common factor), so their product fixes how many such pairs exist.\n" +
        "- Numbers in a ratio of co-prime parts, each times k, have HCF k.\n" +
        "- Fractions: HCF \\(=\\) HCF of the tops \\(\\div\\) LCM of the bottoms; LCM \\(=\\) LCM of the tops \\(\\div\\) HCF of the bottoms.",
      formula: {
        label: "Two numbers",
        latex: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
      },
      authoredExample: {
        prompt: "Find the HCF and LCM of \\(2^3 \\times 3^2 \\times 5\\) and \\(2^2 \\times 3^3 \\times 7\\).",
        steps: ["HCF: lowest shared powers, \\(2^2 \\times 3^2 = 36\\).", "LCM: highest powers, \\(2^3 \\times 3^3 \\times 5 \\times 7 = 7560\\)."],
        answer: "36 and 7560",
      },
      selfCheckExample: {
        prompt: "The HCF of two numbers is 12 and their LCM is 360. One number is 72. Find the other.",
        steps: ["Product of the numbers \\(= 12 \\times 360 = 4320\\).", "Other number \\(= 4320 \\div 72 = 60\\)."],
        answer: "60",
      },
      practiceSet: [
        { prompt: "Find the HCF of 84 and 126.", answer: "42" },
        { prompt: "Two numbers have product 2,700 and HCF 15. How many such pairs are there?", answer: "2", method: "The co-prime parts multiply to 12: (1, 12) and (3, 4)." },
        { prompt: "Three numbers are in the ratio 2 : 3 : 5 and their HCF is 7. Find the largest.", answer: "35" },
      ],
      pyqExampleId: "4b82ab8a-2036-435f-bcfc-93506e644699",
      traps: [
        {
          title: "Taking the highest powers for the HCF",
          body: "The HCF takes the LOWEST power of each shared prime and leaves out primes that are not shared. The highest powers of every prime give the LCM.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2nshl-remainders",
      name: "Remainder recipes",
      intuition:
        "Questions about a number that leaves the same remainder, or remainders that each fall short of the divisor by the same amount, are HCF or LCM questions in disguise.",
      definition:
        "- Greatest number dividing a, b and c with the same remainder each time: the HCF of the differences.\n" +
        "- Least number leaving remainder r with each of several divisors: LCM \\(+ r\\).\n" +
        "- Least number whose remainders are each k less than the divisor: LCM \\(- k\\).\n" +
        "- Largest number of a given size with remainder r: the largest multiple of the LCM of that size, plus r.",
      formula: {
        label: "A number with a fixed remainder",
        latex: "N = m \\times \\text{LCM} + r",
      },
      authoredExample: {
        prompt: "Find the least number that leaves remainder 4 when divided by 6, by 9 and by 15.",
        steps: ["LCM of 6, 9 and 15 is 90.", "The number is \\(90 + 4 = 94\\)."],
        answer: "94",
      },
      selfCheckExample: {
        prompt: "Find the greatest number that divides 70, 115 and 205 leaving the same remainder each time.",
        steps: ["Differences: 45, 90 and 135, whose HCF is 45.", "Check: each number leaves remainder 25 on division by 45."],
        answer: "45",
      },
      practiceSet: [
        { prompt: "Find the least number that leaves remainders 8, 12 and 14 when divided by 12, 16 and 18.", answer: "140", method: "Each remainder is 4 short: \\(144 - 4\\)." },
        { prompt: "Find the largest three-digit number that leaves remainder 3 when divided by 4, 6 and 10.", answer: "963" },
        { prompt: "Find the greatest number that divides 38, 62 and 98 leaving the same remainder.", answer: "12" },
      ],
      pyqExampleId: "92ca53db-7e44-451e-bce9-daa5ff5ead74",
      traps: [
        {
          title: "Taking the HCF of the numbers, not of the differences",
          body: "For 'the same remainder', the remainders cancel only in the DIFFERENCES. The HCF of 70, 115 and 205 is 5, but the answer is 45.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2nshl-divisors",
      name: "Counting divisors",
      intuition:
        "Write a number as a product of prime powers. Each prime can appear in a divisor anywhere from zero times up to its full power, so the number of divisors multiplies those choices.",
      definition:
        "- \\(N = p^a q^b r^c\\) has \\((a + 1)(b + 1)(c + 1)\\) divisors.\n" +
        "- Exactly 2 divisors: a prime. Exactly 3 divisors: the square of a prime (1, p and \\(p^2\\)).\n" +
        "- A perfect square has an odd number of divisors.",
      formula: {
        label: "Number of divisors",
        latex: "N = p^a q^b r^c \\;\\Rightarrow\\; (a + 1)(b + 1)(c + 1) \\text{ divisors}",
      },
      authoredExample: {
        prompt: "How many divisors does 360 have?",
        steps: ["\\(360 = 2^3 \\times 3^2 \\times 5\\).", "Divisors \\(= 4 \\times 3 \\times 2 = 24\\)."],
        answer: "24",
      },
      selfCheckExample: {
        prompt: "How many numbers between 100 and 400 have exactly 3 divisors?",
        steps: ["They are squares of primes: 121, 169, 289 and 361.", "So there are 4."],
        answer: "4",
      },
      practiceSet: [
        { prompt: "How many divisors does 72 have?", answer: "12" },
        { prompt: "Which has more divisors, 64 or 60?", answer: "60 (12 against 7)" },
        { prompt: "How many divisors does the square of a prime have?", answer: "3" },
      ],
      pyqExampleId: "7dc6b25b-a2ea-4bc5-826e-8545fd251012",
      traps: [
        {
          title: "Forgetting that a prime can be left out",
          body: "Each power counts from zero, so \\(2^3\\) gives 4 choices (1, 2, 4, 8), not 3. That is why every exponent gets 1 added.",
        },
      ],
    },
  ],
};
