import type { SubtopicNote } from "@/app/notes/_types";

export const AF_LH_FINDING_NOTE: SubtopicNote = {
  subtopicName: "Finding HCF and LCM",
  title: "Finding the HCF and LCM",
  oneLineDefinition:
    "Write each number as a product of primes, then take the lowest common powers for the HCF and the highest powers for the LCM; use repeated division for large numbers, and a numerator and denominator rule for fractions.",
  whyItMatters:
    "These questions hand you the numbers and ask for the HCF or the LCM, so the only marks lost are in the factorising. The usual slip is mixing the two rules: taking a prime into the HCF that only one number has, or dropping a higher power from the LCM. Fractions add one more rule that is easy to turn upside down.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aflh-prime-factors",
      name: "HCF and LCM by prime factors",
      intuition:
        "The **HCF** (highest common factor) is the largest number that divides every given number. The **LCM** (least common multiple) is the smallest number that every given number divides. Once each number is written as powers of primes, both can be read off: the HCF keeps only what all the numbers share, and the LCM keeps everything any of them has.",
      definition:
        "- Factorise each number into prime powers.\n" +
        "- **HCF:** take each prime that appears in every number, at its lowest power.\n" +
        "- **LCM:** take every prime that appears in any number, at its highest power.\n" +
        "- Two numbers with no common prime (coprime) have HCF 1, and their LCM is their product.\n" +
        "- For two numbers, HCF × LCM equals the product of the numbers. The next page builds on this.",
      formula: {
        label: "HCF and LCM from prime powers",
        latex:
          "\\text{HCF} = \\prod p^{\\min(a, b)}, \\qquad \\text{LCM} = \\prod p^{\\max(a, b)}",
      },
      authoredExample: {
        prompt: "Find the HCF and the LCM of 72 and 120.",
        steps: [
          "\\(72 = 2^3 \\times 3^2\\) and \\(120 = 2^3 \\times 3 \\times 5\\).",
          "HCF: the common primes are 2 and 3, at their lower powers: \\(2^3 \\times 3 = 24\\).",
          "LCM: every prime at its higher power: \\(2^3 \\times 3^2 \\times 5 = 360\\).",
          "Check: \\(24 \\times 360 = 8640 = 72 \\times 120\\).",
        ],
        answer: "HCF 24, LCM 360.",
      },
      selfCheckExample: {
        prompt: "Find the HCF and the LCM of 18, 28 and 42.",
        steps: [
          "\\(18 = 2 \\times 3^2\\), \\(28 = 2^2 \\times 7\\), \\(42 = 2 \\times 3 \\times 7\\).",
          "Only 2 is in all three, at lowest power \\(2^1\\): the HCF is 2.",
          "LCM: \\(2^2 \\times 3^2 \\times 7 = 252\\).",
        ],
        answer: "HCF 2, LCM 252.",
      },
      practiceSet: [
        { prompt: "Find the HCF of 84 and 126.", answer: "\\(42\\)", method: "\\(2^2 \\times 3 \\times 7\\) and \\(2 \\times 3^2 \\times 7\\)." },
        { prompt: "Find the LCM of 12, 15 and 20.", answer: "\\(60\\)" },
        { prompt: "Find the HCF of \\(2^4 \\times 3^2 \\times 5\\) and \\(2^2 \\times 3^3 \\times 7\\).", answer: "\\(36\\)" },
        { prompt: "Find the LCM of 16, 24 and 40.", answer: "\\(240\\)", method: "\\(2^4 \\times 3 \\times 5\\)." },
      ],
      pyqExampleId: "d8b4e7c2-da5f-4b1a-82a8-e372bda8df3b",
      traps: [
        {
          title: "The HCF keeps only shared primes",
          body: "For \\(2^3 \\times 5\\) and \\(2 \\times 3\\), the HCF is 2. The 5 and the 3 belong to one number each, so they go into the LCM (which is 120) and never into the HCF.",
        },
        {
          title: "The LCM takes the highest power",
          body: "The LCM of \\(2^2 \\times 3\\) and \\(2 \\times 3^2\\) is \\(2^2 \\times 3^2 = 36\\). Taking \\(2 \\times 3\\) from either number gives the HCF, 6, by mistake.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aflh-division-method",
      name: "HCF of large numbers by repeated division",
      intuition:
        "Large numbers such as 667 are slow to factorise. Any number that divides two numbers also divides their difference, and so it divides the remainder when the larger is divided by the smaller. Keep dividing the last divisor by the last remainder until nothing is left over.",
      definition:
        "- Divide the larger number by the smaller.\n" +
        "- Divide the divisor by the remainder. Repeat.\n" +
        "- When the remainder is 0, the last divisor is the HCF.\n" +
        "- For three numbers, find the HCF of two, then the HCF of that answer and the third.",
      formula: {
        label: "Euclid's division step",
        latex: "\\text{HCF}(a, b) = \\text{HCF}(b,\\; a \\bmod b)",
      },
      authoredExample: {
        prompt: "Find the HCF of 391 and 667.",
        steps: [
          "\\(667 = 1 \\times 391 + 276\\).",
          "\\(391 = 1 \\times 276 + 115\\).",
          "\\(276 = 2 \\times 115 + 46\\).",
          "\\(115 = 2 \\times 46 + 23\\), and \\(46 = 2 \\times 23\\) with no remainder.",
        ],
        answer: "\\(23\\) (indeed \\(391 = 17 \\times 23\\) and \\(667 = 29 \\times 23\\)).",
      },
      selfCheckExample: {
        prompt: "Find the HCF of 1,073 and 1,147.",
        steps: [
          "\\(1147 = 1 \\times 1073 + 74\\).",
          "\\(1073 = 14 \\times 74 + 37\\).",
          "\\(74 = 2 \\times 37\\) with no remainder.",
        ],
        answer: "\\(37\\).",
      },
      practiceSet: [
        { prompt: "Find the HCF of 221 and 391.", answer: "\\(17\\)" },
        { prompt: "Find the HCF of 437 and 529.", answer: "\\(23\\)" },
        { prompt: "Find the HCF of 48, 84 and 132.", answer: "\\(12\\)", method: "HCF of 48 and 84 is 12, and 12 divides 132." },
      ],
      traps: [
        {
          title: "Divide by the remainder",
          body: "Each step divides the last divisor by the last remainder. Dividing the first number again by the new remainder breaks the chain and gives a wrong HCF.",
        },
        {
          title: "The answer is the last divisor",
          body: "When the remainder reaches 0, the HCF is the number you divided by in that step, not the quotient and not the remainder before it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aflh-fractions",
      name: "HCF and LCM of fractions",
      intuition:
        "The HCF of fractions is the largest fraction that goes into each of them a whole number of times; the LCM is the smallest fraction that each of them goes into a whole number of times. The numerators behave like ordinary numbers, and the denominators do the opposite job.",
      definition:
        "- Write every fraction in its lowest terms first.\n" +
        "- **HCF** of fractions = HCF of the numerators ÷ LCM of the denominators.\n" +
        "- **LCM** of fractions = LCM of the numerators ÷ HCF of the denominators.\n" +
        "- Decimals: give them the same number of decimal places, work with the whole numbers, then put the point back. The HCF of 1.2 and 0.84 is the HCF of 120 and 84 hundredths, 0.12.",
      formula: {
        label: "Fractions",
        latex:
          "\\text{HCF} = \\dfrac{\\text{HCF of numerators}}{\\text{LCM of denominators}}, \\qquad \\text{LCM} = \\dfrac{\\text{LCM of numerators}}{\\text{HCF of denominators}}",
      },
      authoredExample: {
        prompt: "Find the HCF and the LCM of \\(\\tfrac 23\\), \\(\\tfrac 49\\) and \\(\\tfrac{8}{15}\\).",
        steps: [
          "HCF: \\(\\dfrac{\\text{HCF}(2, 4, 8)}{\\text{LCM}(3, 9, 15)} = \\dfrac{2}{45}\\).",
          "LCM: \\(\\dfrac{\\text{LCM}(2, 4, 8)}{\\text{HCF}(3, 9, 15)} = \\dfrac{8}{3}\\).",
          "Check: \\(\\tfrac 83 \\div \\tfrac 23 = 4\\), \\(\\tfrac 83 \\div \\tfrac 49 = 6\\) and \\(\\tfrac 83 \\div \\tfrac{8}{15} = 5\\), all whole numbers.",
        ],
        answer: "HCF \\(\\tfrac{2}{45}\\), LCM \\(\\tfrac 83\\).",
      },
      selfCheckExample: {
        prompt: "Find the LCM of \\(\\tfrac 34\\), \\(\\tfrac{9}{10}\\) and \\(\\tfrac{15}{16}\\).",
        steps: [
          "LCM of the numerators: \\(\\text{LCM}(3, 9, 15) = 45\\).",
          "HCF of the denominators: \\(\\text{HCF}(4, 10, 16) = 2\\).",
        ],
        answer: "\\(\\tfrac{45}{2}\\).",
      },
      practiceSet: [
        { prompt: "Find the HCF of \\(\\tfrac 12\\), \\(\\tfrac 34\\) and \\(\\tfrac 58\\).", answer: "\\(\\tfrac 18\\)" },
        { prompt: "Find the LCM of \\(\\tfrac 12\\), \\(\\tfrac 34\\) and \\(\\tfrac 58\\).", answer: "\\(\\tfrac{15}{2}\\)" },
        { prompt: "Find the HCF of \\(\\tfrac 45\\) and \\(\\tfrac 67\\).", answer: "\\(\\tfrac{2}{35}\\)" },
      ],
      pyqExampleId: "b63ed550-a18e-414e-b803-580ab02354e9",
      traps: [
        {
          title: "The denominators swap jobs",
          body: "For the HCF of fractions the denominators take their LCM, not their HCF. Check any answer by dividing: each fraction divided by the HCF must give a whole number.",
        },
        {
          title: "Lowest terms first",
          body: "\\(\\tfrac 24\\) and \\(\\tfrac 36\\) are both \\(\\tfrac 12\\), so their HCF is \\(\\tfrac 12\\). Applying the rule to the unreduced fractions gives \\(\\tfrac{1}{12}\\), which is wrong.",
        },
      ],
    },
  ],
};
