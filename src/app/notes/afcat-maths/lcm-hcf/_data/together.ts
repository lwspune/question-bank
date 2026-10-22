import type { SubtopicNote } from "@/app/notes/_types";

export const AF_LH_TOGETHER_NOTE: SubtopicNote = {
  subtopicName: "HCF and LCM Together",
  title: "HCF and LCM Together: the Product Rule and Coprime Parts",
  oneLineDefinition:
    "Two numbers multiply to their HCF times their LCM, and each can be written as the HCF times a coprime part; between them these two facts find a missing number from the HCF, the LCM, a ratio or a sum.",
  whyItMatters:
    "AFCAT asks this more than any other part of the chapter: three of its four past-year questions are here, from 2015 and 2018. Each gives two of the HCF, the LCM, one number, a ratio or a sum and asks for the rest. Marks go when the product rule is used for three numbers, or when a ratio is not first written in its lowest terms.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "aflh-product-rule",
      name: "Product of two numbers equals HCF times LCM",
      intuition:
        "Every prime of two numbers lands once in the HCF at its lower power and once in the LCM at its higher power. Together they hold exactly the primes of both numbers, so HCF × LCM is the product of the two numbers.",
      definition:
        "- For two numbers \\(a\\) and \\(b\\): \\(a \\times b = \\text{HCF} \\times \\text{LCM}\\).\n" +
        "- So the other number is \\(\\dfrac{\\text{HCF} \\times \\text{LCM}}{\\text{one number}}\\).\n" +
        "- If the LCM is a multiple of the HCF, say \\(L = mH\\), and their sum or difference is given, find \\(H\\) first.\n" +
        "- If the product of HCF and LCM is given, it is the product of the numbers: pair it with the sum or difference.",
      formula: {
        label: "Product rule (two numbers only)",
        latex: "a \\times b = \\text{HCF}(a, b) \\times \\text{LCM}(a, b)",
      },
      authoredExample: {
        prompt: "The HCF of two numbers is 6 and their LCM is 180. One number is 36. Find the other.",
        steps: [
          "The product of the numbers is \\(6 \\times 180 = 1080\\).",
          "The other number is \\(1080 \\div 36 = 30\\).",
          "Check: \\(36 = 2^2 \\times 3^2\\) and \\(30 = 2 \\times 3 \\times 5\\) have HCF 6 and LCM 180.",
        ],
        answer: "\\(30\\).",
      },
      selfCheckExample: {
        prompt:
          "The LCM of two numbers is 12 times their HCF, and the LCM and HCF add up to 403. One number is 93. Find the other.",
        steps: [
          "\\(L = 12H\\), so \\(L + H = 13H = 403\\) and \\(H = 31\\), \\(L = 372\\).",
          "The other number is \\(\\dfrac{31 \\times 372}{93} = 124\\).",
        ],
        answer: "\\(124\\).",
      },
      practiceSet: [
        { prompt: "The HCF of two numbers is 12 and their LCM is 336. One number is 48. Find the other.", answer: "\\(84\\)" },
        { prompt: "Two numbers have a product of 2,160 and an HCF of 12. Find their LCM.", answer: "\\(180\\)" },
        { prompt: "The HCF of two numbers is 9 and their LCM is 270. One number is 54. Find the other.", answer: "\\(45\\)" },
        {
          prompt: "The product of the HCF and LCM of two numbers is 60, and the numbers differ by 7. Find them.",
          answer: "5 and 12",
          method: "Their product is 60.",
        },
      ],
      pyqExampleId: "7b9e3fba-9dfa-4209-a1eb-b953f95c3c33",
      traps: [
        {
          title: "Two numbers only",
          body: "For 3, 6 and 12 the product is 216, but HCF × LCM is \\(3 \\times 12 = 36\\). The product rule holds for a pair of numbers, never for three or more.",
        },
        {
          title: "Check the answer is a whole number",
          body: "If HCF × LCM divided by the given number is not a whole number, or its HCF with that number is not the HCF given, recheck the arithmetic before picking an option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "aflh-coprime-parts",
      name: "Numbers as the HCF times coprime parts",
      intuition:
        "If the HCF of two numbers is \\(H\\), they are \\(Ha\\) and \\(Hb\\), where \\(a\\) and \\(b\\) share no factor. Then the LCM is \\(Hab\\). A ratio in lowest terms gives \\(a\\) and \\(b\\) directly, and the HCF is the multiplier.",
      definition:
        "- Numbers in the ratio \\(a : b\\) (lowest terms) are \\(ak\\) and \\(bk\\), with HCF \\(k\\) and LCM \\(abk\\).\n" +
        "- Three numbers \\(ak, bk, ck\\): the HCF is \\(k\\) when \\(a, b, c\\) have no common factor, and the LCM is \\(\\text{LCM}(a, b, c) \\times k\\).\n" +
        "- The HCF divides the sum and the difference of the numbers. Given the sum and the LCM, the HCF is the HCF of those two, because \\(H(a + b)\\) and \\(Hab\\) share only \\(H\\).\n" +
        "- If both numbers are multiples of a given number, write them as that number times a part and work with the parts.",
      formula: {
        label: "Coprime parts",
        latex: "a' = Ha,\\; b' = Hb,\\; \\text{HCF}(a, b) = 1 \\;\\Rightarrow\\; \\text{LCM} = Hab",
      },
      authoredExample: {
        prompt: "Two numbers are in the ratio \\(3 : 5\\) and their LCM is 225. Find the numbers and their HCF.",
        steps: [
          "The numbers are \\(3k\\) and \\(5k\\), with LCM \\(15k = 225\\), so \\(k = 15\\).",
          "The numbers are 45 and 75, and the HCF is \\(k = 15\\).",
        ],
        answer: "45 and 75; HCF 15.",
      },
      selfCheckExample: {
        prompt: "Two numbers add up to 96 and their LCM is 180. Find them.",
        steps: [
          "The HCF divides both 96 and 180, and equals \\(\\text{HCF}(96, 180) = 12\\).",
          "The numbers are \\(12a\\) and \\(12b\\) with \\(a + b = 8\\) and \\(12ab = 180\\), so \\(ab = 15\\).",
          "\\(a = 3\\), \\(b = 5\\).",
        ],
        answer: "36 and 60.",
      },
      practiceSet: [
        { prompt: "Two numbers are in the ratio \\(5 : 7\\) and their HCF is 6. Find their LCM.", answer: "\\(210\\)" },
        { prompt: "Three numbers are in the ratio \\(2 : 3 : 5\\) and their LCM is 600. Find their HCF.", answer: "\\(20\\)", method: "LCM \\(= 30k\\)." },
        {
          prompt: "Two numbers are in the ratio \\(4 : 9\\) and the product of their HCF and LCM is 3,600. Find their sum.",
          answer: "\\(130\\)",
          method: "\\(36k^2 = 3600\\), so \\(k = 10\\).",
        },
      ],
      pyqExampleId: "dcbe5f83-2373-4f73-b6df-a56b2bfae429",
      traps: [
        {
          title: "Reduce the ratio first",
          body: "Numbers in the ratio \\(6 : 8\\) with HCF 5 are 15 and 20, because \\(6 : 8 = 3 : 4\\). Writing 30 and 40 gives a pair whose HCF is 10.",
        },
        {
          title: "The LCM of the ratio terms, not their product",
          body: "Numbers \\(3k, 4k, 6k\\) have LCM \\(12k\\), since \\(\\text{LCM}(3, 4, 6) = 12\\). Multiplying the terms to get \\(72k\\) works only when the terms share no factor.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "aflh-possible-values",
      name: "What the HCF and LCM can and cannot be",
      intuition:
        "Some questions give one of the two and ask which value the other could be, or could never be. The facts below settle them without finding any numbers.",
      definition:
        "The HCF divides each number and each number divides the LCM, so the HCF always divides the LCM. A value that fails one of these facts is impossible.",
      table: {
        columns: ["Fact", "Example"],
        rows: [
          { cells: ["The LCM is a multiple of the HCF", "HCF 6 allows LCM 90, since \\(90 = 15 \\times 6\\)"] },
          { cells: ["HCF ≤ the smaller number, LCM ≥ the larger", "14 and 35: HCF 7, LCM 70"] },
          { cells: ["Coprime numbers: HCF 1, LCM is the product", "9 and 16: HCF 1, LCM 144"] },
          { cells: ["One number divides the other: HCF is the smaller, LCM the larger", "13 and 39: HCF 13, LCM 39"] },
          { cells: ["Two consecutive numbers are coprime", "20 and 21: HCF 1, LCM 420"] },
        ],
      },
      selfCheckExample: {
        prompt: "The HCF of two numbers is 9. Can their LCM be 120?",
        steps: ["The LCM must be a multiple of the HCF, and \\(120 \\div 9\\) is not a whole number."],
        answer: "No.",
      },
      practiceSet: [
        { prompt: "The HCF of two numbers is 15. Which of 45, 75, 100 and 150 cannot be their LCM?", answer: "100" },
        { prompt: "The LCM of two numbers is 77. Which of 7, 11, 14 and 1 cannot be their HCF?", answer: "14" },
        { prompt: "Find the HCF and LCM of 25 and 26.", answer: "HCF 1, LCM 650" },
      ],
      pyqExampleId: "477c0eab-2b81-4edf-830c-91b50e46ce25",
      traps: [
        {
          title: "Ruling out is not proving",
          body: "Any divisor of the LCM could be the HCF. A question asking what the HCF will be can only rule out the options that do not divide the LCM; the one left is the answer only because the others fail.",
        },
      ],
    },
  ],
};
