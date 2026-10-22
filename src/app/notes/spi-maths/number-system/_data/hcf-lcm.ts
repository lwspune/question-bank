import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_NS_HCF_LCM_NOTE: SubtopicNote = {
  subtopicName: "HCF and LCM",
  title: "HCF and LCM",
  oneLineDefinition:
    "The HCF is the largest number that divides all the given numbers, and the LCM is the smallest number that all of them divide.",
  whyItMatters:
    "Eleven questions in the bank, eight EASY and three MODERATE. Six are read straight off the prime factors, three ask for the largest number that divides two numbers (with or without a remainder), and two use the link between HCF, LCM and the product.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spinshl-factor",
      name: "HCF and LCM from prime factors",
      intuition:
        "Write each number as a product of primes. The HCF can only use what every number has, so it takes the smallest power of each shared prime. The LCM must hold every number, so it takes the largest power of every prime that appears.",
      definition:
        "- **HCF:** multiply the primes common to all the numbers, each to its **lowest** power.\n" +
        "- **LCM:** multiply every prime that appears in any number, each to its **highest** power.\n" +
        "- Numbers with no common prime (co-prime numbers) have HCF 1 and LCM equal to their product.\n" +
        "- If one power in the LCM is unknown, the number that carries that prime must supply the highest power.",
      formula: {
        label: "HCF and LCM by powers",
        latex:
          "\\text{HCF} = \\prod p^{\\text{lowest power}} \\qquad \\text{LCM} = \\prod p^{\\text{highest power}}",
      },
      authoredExample: {
        prompt: "Find the HCF and the LCM of 72 and 120.",
        steps: [
          "\\(72 = 2^3 \\times 3^2\\) and \\(120 = 2^3 \\times 3 \\times 5\\).",
          "HCF: common primes 2 and 3 at their lowest powers, \\(2^3 \\times 3 = 24\\).",
          "LCM: every prime at its highest power, \\(2^3 \\times 3^2 \\times 5 = 360\\).",
          "Check: \\(24 \\times 360 = 8640 = 72 \\times 120\\).",
        ],
        answer: "HCF 24, LCM 360",
      },
      selfCheckExample: {
        prompt: "Find the LCM of 18, 30 and 45.",
        steps: [
          "\\(18 = 2 \\times 3^2\\), \\(30 = 2 \\times 3 \\times 5\\), \\(45 = 3^2 \\times 5\\).",
          "Highest powers: \\(2\\), \\(3^2\\), \\(5\\). LCM \\(= 2 \\times 9 \\times 5 = 90\\).",
        ],
        answer: "90",
      },
      practiceSet: [
        { prompt: "Find the HCF of \\(2^3 \\times 3^2 \\times 5\\) and \\(2^2 \\times 3^3 \\times 7\\).", answer: "\\(2^2 \\times 3^2 = 36\\)" },
        { prompt: "Find the LCM of 12 and 16.", answer: "48" },
        { prompt: "Find the LCM of 7 and 9.", answer: "63 (they are co-prime)" },
        {
          prompt: "If \\(a = 2^m \\times 5\\), \\(b = 2^2 \\times 3\\) and the LCM of a and b is \\(2^4 \\times 3 \\times 5\\), find m.",
          answer: "\\(m = 4\\)",
        },
      ],
      pyqExampleId: "517fb9f6-ed1b-4f05-85c8-47ddf4c21fa0",
      traps: [
        {
          title: "Putting a prime in the HCF that one number lacks",
          body: "The HCF uses only primes that divide every number. If 5 divides one number but not the other, 5 is not in the HCF.",
        },
        {
          title: "Picking a common multiple that is not the least",
          body: "72 is a common multiple of 12 and 18, but the LCM is 36. Options often include larger common multiples; the LCM is the smallest.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinshl-euclid",
      name: "Euclid's division and the largest number that divides",
      intuition:
        "Any common factor of two numbers also divides their remainder. So you can keep replacing the larger number by the remainder until the remainder is 0: the last divisor is the HCF. A 'largest number that divides' question is an HCF question.",
      definition:
        "- **Euclid's division:** for whole numbers \\(a\\) and \\(b\\), \\(a = bq + r\\) with \\(0 \\le r < b\\).\n" +
        "- \\(\\text{HCF}(a, b) = \\text{HCF}(b, r)\\). Repeat until \\(r = 0\\); the divisor at that step is the HCF.\n" +
        "- The largest number that divides \\(x\\) and \\(y\\) leaving remainders \\(r_1\\) and \\(r_2\\) is \\(\\text{HCF}(x - r_1, y - r_2)\\).\n" +
        "- 'Largest number that divides' means HCF. 'Smallest number divisible by' means LCM.",
      formula: {
        label: "Euclid's division",
        latex: "a = bq + r, \\quad 0 \\le r < b \\qquad \\text{HCF}(a, b) = \\text{HCF}(b, r)",
      },
      authoredExample: {
        prompt: "Use Euclid's division to find the HCF of 420 and 130.",
        steps: [
          "\\(420 = 3 \\times 130 + 30\\).",
          "\\(130 = 4 \\times 30 + 10\\).",
          "\\(30 = 3 \\times 10 + 0\\). The remainder is 0, so the HCF is the last divisor.",
        ],
        answer: "10",
      },
      selfCheckExample: {
        prompt: "Find the largest number that divides 70 and 125, leaving remainders 5 and 8 respectively.",
        steps: [
          "The number divides \\(70 - 5 = 65\\) and \\(125 - 8 = 117\\) exactly.",
          "\\(65 = 5 \\times 13\\) and \\(117 = 9 \\times 13\\), so the HCF is 13.",
          "Check: \\(70 = 13 \\times 5 + 5\\) and \\(125 = 13 \\times 9 + 8\\).",
        ],
        answer: "13",
      },
      practiceSet: [
        { prompt: "Use Euclid's division to find the HCF of 156 and 120.", answer: "12" },
        { prompt: "What is the largest number that divides 84 and 126 exactly?", answer: "42" },
        { prompt: "What is the largest number that divides 63 and 93, leaving remainder 3 in each?", answer: "30, the HCF of 60 and 90" },
        { prompt: "In Euclid's division \\(a = bq + r\\), which values can r take?", answer: "\\(0 \\le r < b\\)" },
      ],
      pyqExampleId: "ccd6dbb1-b091-4e12-b721-97ec61d4ace7",
      traps: [
        {
          title: "Taking the HCF before removing the remainder",
          body: "When a remainder is left, subtract it from each number first. The answer divides the reduced numbers exactly, not the original ones.",
        },
        {
          title: "An answer smaller than the remainder",
          body: "A divisor must be larger than the remainder it leaves. If your answer is 4 and the remainder is 5, something went wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spinshl-product",
      name: "HCF times LCM equals the product",
      intuition:
        "For two numbers, the HCF holds the primes they share and the LCM holds everything else as well. Together they use each prime exactly as often as the two numbers do, so their product equals the product of the numbers.",
      definition:
        "- For **two** numbers: \\(\\text{HCF} \\times \\text{LCM} = a \\times b\\). This does not hold for three numbers.\n" +
        "- The HCF always divides the LCM.\n" +
        "- If \\(b\\) is a multiple of \\(a\\), then \\(\\text{HCF}(a, b) = a\\) and \\(\\text{LCM}(a, b) = b\\).",
      formula: {
        label: "Product of two numbers",
        latex: "\\text{HCF}(a, b) \\times \\text{LCM}(a, b) = a \\times b",
      },
      authoredExample: {
        prompt: "The HCF of two numbers is 12 and their LCM is 180. One number is 36. Find the other.",
        steps: [
          "Other number \\(= \\dfrac{\\text{HCF} \\times \\text{LCM}}{36} = \\dfrac{12 \\times 180}{36} = 60\\).",
          "Check: \\(36 = 2^2 \\times 3^2\\) and \\(60 = 2^2 \\times 3 \\times 5\\) give HCF 12 and LCM 180.",
        ],
        answer: "60",
      },
      selfCheckExample: {
        prompt: "Two numbers have product 1350 and HCF 15. Find their LCM.",
        steps: ["LCM \\(= \\dfrac{1350}{15} = 90\\).", "Check with 30 and 45: product 1350, HCF 15, LCM 90."],
        answer: "90",
      },
      practiceSet: [
        { prompt: "8 divides 40. What are the HCF and the LCM of 8 and 40?", answer: "HCF 8, LCM 40" },
        { prompt: "The HCF of two numbers is 4 and their LCM is 48. One number is 16. Find the other.", answer: "12" },
        { prompt: "Can two numbers have HCF 6 and LCM 50?", answer: "No: the HCF must divide the LCM, and 6 does not divide 50." },
      ],
      pyqExampleId: "9c5b46e2-55c1-44af-87f4-5cd5e26170e8",
      traps: [
        {
          title: "Using the product rule for three numbers",
          body: "For 2, 4 and 8 the HCF is 2 and the LCM is 8, so HCF times LCM is 16, but the product is 64. The rule is for two numbers only.",
        },
      ],
    },
  ],
};
