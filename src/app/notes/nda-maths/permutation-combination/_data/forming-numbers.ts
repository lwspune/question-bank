import type { SubtopicNote } from "@/app/notes/_types";

export const FORMING_NUMBERS_NOTE: SubtopicNote = {
  subtopicName: "Forming Numbers from Digits",
  title: "Forming Numbers from Digits",
  oneLineDefinition:
    "Counting how many numbers can be built from given digits under constraints — number of digits, a leading-zero rule, divisibility, or the sum of all such numbers.",
  whyItMatters:
    "Digit problems are permutations dressed in number rules. The two perennial gotchas are the leading-zero exclusion and divisibility tests; the 'sum of all numbers' shortcut saves real time.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "pc-forming-numbers",
      name: "Counting numbers with digit constraints",
      intuition:
        "Building an \\(n\\)-digit number is filling \\(n\\) ordered slots from the available digits. The one special rule: the leading digit can't be 0, so fill it first from the non-zero digits.",
      definition:
        "Fill positions left to right. **Distinct digits:** first slot has (non-zero choices), each later slot one fewer. **Leading-zero rule:** if 0 is available, the first digit has one fewer option; equivalently total arrangements minus those starting with 0. **Repetition allowed** multiplies the per-slot choices.",
      authoredExample: {
        prompt: "How many 3-digit numbers have all distinct digits from \\(\\{1,2,3,4\\}\\)?",
        steps: [
          "No zero present, so just \\(^4P_3=4\\times3\\times2\\).",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "How many numbers greater than 1000 can be formed using \\(0,1,2,3\\) without repetition?",
        steps: [
          "4-digit numbers from these 4 digits: \\(4!=24\\); subtract those with leading 0 (\\(3!=6\\)).",
          "\\(24-6=18\\).",
        ],
        answer: "\\(18\\).",
      },
      practiceSet: [
        { prompt: "Which digit cannot be 0?", answer: "The leading digit" },
        { prompt: "3-digit distinct numbers from \\(\\{1,2,3,4\\}\\)?", answer: "\\(24\\)" },
        { prompt: "Handle leading zero by?", answer: "Total minus those starting with 0" },
        { prompt: "Repetition allowed: slots are?", answer: "Multiplied (each full set of choices)" },
      ],
      pyqExampleId: "004fbc91-a6f2-487c-b6f1-67e550943169", // 4-digit all distinct
    },

    {
      kind: "formula" as const,
      slug: "pc-number-divisibility",
      name: "Divisibility constraints",
      intuition:
        "Divisibility fixes specific digits. By 2/5/10 → the units digit; by 4 → the last two digits; by 3/9 → the digit sum. Often the digit sum is fixed (e.g. \\(1+2+3+4+5=15\\)), which forces divisibility by 3 for every arrangement.",
      definition:
        "- **÷2:** units even. **÷5:** units 0 or 5. **÷10:** units 0.\n" +
        "- **÷4:** last two digits form a multiple of 4. **÷8:** last three.\n" +
        "- **÷3 / ÷9:** digit sum divisible by 3 / 9 (independent of order — so a fixed digit set is all-or-nothing).\n" +
        "- **÷6:** divisible by 2 and 3 together.",
      authoredExample: {
        prompt: "How many 3-digit numbers from \\(1,2,3,4,5\\) (no repeat) are divisible by 5?",
        steps: [
          "Divisible by 5 ⇒ units digit is 5 (only choice here): 1 way.",
          "First two slots from the remaining 4 digits: \\(4\\times3=12\\).",
        ],
        answer: "\\(12\\).",
      },
      selfCheckExample: {
        prompt: "How many 5-digit primes can be formed using all of \\(1,2,3,4,5\\)?",
        steps: [
          "Digit sum \\(=15\\), divisible by 3 — so every such number is divisible by 3.",
          "None can be prime.",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "Divisible by 4 depends on?", answer: "The last two digits" },
        { prompt: "Divisible by 3 depends on?", answer: "The digit sum" },
        { prompt: "Divisible by 10 needs units digit?", answer: "\\(0\\)" },
        { prompt: "5-digit numbers from 1–5: divisible by 3?", answer: "Always (sum 15)" },
      ],
      pyqExampleId: "ee8edfff-bc24-4d61-adae-7a61f3c69710", // 4-digit divisible by 4
    },

    {
      kind: "formula" as const,
      slug: "pc-sum-of-numbers",
      name: "Sum of all numbers formed",
      intuition:
        "By symmetry, each digit lands in each position the same number of times. So the sum of all numbers formed is (sum of digits) × (times each appears per place) × (place-value repunit).",
      definition:
        "Using \\(n\\) distinct digits to form all \\(n\\)-digit numbers: each digit appears in each place \\((n-1)!\\) times. Sum \\(=(n-1)!\\times(\\text{sum of digits})\\times\\underbrace{111\\ldots1}_{n}\\). Adjust the repeat count and place-value string for \\(r\\)-digit selections.",
      authoredExample: {
        prompt: "Find the sum of all 3-digit numbers formed using \\(3,4,5\\) without repetition.",
        steps: [
          "Each digit appears in each place \\((3-1)!=2\\) times; digit sum \\(=12\\).",
          "Sum \\(=2\\times12\\times111=2664\\).",
        ],
        answer: "\\(2664\\).",
      },
      selfCheckExample: {
        prompt: "Each digit of \\(\\{1,2,3\\}\\) appears how many times in the units place across all 3-digit numbers (no repeat)?",
        steps: [
          "Fix a digit in units; the other two fill the rest: \\((3-1)!=2\\).",
        ],
        answer: "\\(2\\) times.",
      },
      practiceSet: [
        { prompt: "Each digit appears per place how many times (n distinct)?", answer: "\\((n-1)!\\)" },
        { prompt: "Place-value string for 3-digit sums?", answer: "\\(111\\)" },
        { prompt: "Sum of all 3-digit numbers from 3,4,5?", answer: "\\(2664\\)" },
        { prompt: "Sum formula factors?", answer: "\\((n-1)!\\times\\)(digit sum)\\(\\times\\)repunit" },
      ],
      pyqExampleId: "56c676d4-50bf-4e09-bee4-feb8a72ca694", // sum of all 3-digit numbers
    },
  ],
  related: [
    { label: "Arrangements with Restrictions", href: "/notes/nda-maths/permutation-combination/pc-arrangements" },
    { label: "Geometric Counting", href: "/notes/nda-maths/permutation-combination/pc-geometric-counting" },
  ],
};
