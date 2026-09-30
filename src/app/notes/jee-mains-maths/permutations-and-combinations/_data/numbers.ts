import type { SubtopicNote } from "@/app/notes/_types";

export const NUMBERS_PNC_NOTE: SubtopicNote = {
  subtopicName: "Forming Numbers from Digits",
  title: "Forming Numbers from Digits",
  oneLineDefinition:
    "Counting numbers built from a given set of digits: with a range or position condition, with a divisibility condition, or with a condition on the sum or product of the digits.",
  whyItMatters:
    "Thirty-seven PYQs, the largest page in the chapter, and twenty-seven of them numerical answer. Sixteen fill positions under a range or no-repetition rule, fourteen need a divisibility test, and seven fix the sum or product of the digits. Three ideas cover the page.",
  concepts: [
    // C1 — positions, ranges, sums of numbers
    {
      kind: "formula" as const,
      slug: "jpnc-place",
      name: "Filling positions: ranges, leading digits and no repetition",
      intuition:
        "Fill the most restricted position first — the leading digit (never 0, bounded by the range), the last digit (parity) — then the rest. A range like 'between 5000 and 9000' fixes the leading digit's choices. To add all the numbers formed, find how often each digit sits in each place: by symmetry, every place carries the same digit total.",
      definition:
        "- Restricted positions first, then the rest in order.\n" +
        "- No repetition: choices drop by one at each step.\n" +
        "- Sum of all numbers from \\(n\\) distinct digits (all used): \\((n-1)!\\,(\\text{digit sum})\\,(11\\dots1)\\).\n" +
        "- Three-digit numbers with exactly one digit repeated twice: all, minus all digits equal, minus all digits distinct.",
      formula: {
        label: "Sum of all arrangements",
        latex: "\\sum=\\frac{(\\text{number of arrangements})\\times(\\text{digit sum})}{n}\\times\\underbrace{11\\cdots1}_{n}",
      },
      authoredExample: {
        prompt: "How many 4-digit numbers greater than 6000 can be formed from 2, 4, 6, 8, 9 without repetition?",
        steps: [
          "Leading digit 6, 8 or 9: 3 choices; the other three places: \\(4\\cdot3\\cdot2=24\\).",
        ],
        answer: "\\(72\\).",
      },
      selfCheckExample: {
        prompt: "Find the sum of all 3-digit numbers formed from 1, 2, 3 without repetition.",
        steps: [
          "6 numbers, digit sum 6: each place totals \\(\\frac{6\\cdot6}{3}=12\\).",
        ],
        answer: "\\(12\\times111=1332\\).",
      },
      practiceSet: [
        { prompt: "3-digit numbers from 0, 1, 2, 3 without repetition?", answer: "\\(18\\)" },
        { prompt: "Even 3-digit numbers from 1, 2, 3, 4 without repetition?", answer: "\\(12\\)" },
        { prompt: "5-digit numbers from 0, 2, 4, 6, 8 using each once?", answer: "\\(96\\)" },
        { prompt: "3-digit numbers with all digits equal?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "41e0cf84-4a81-4a00-a762-ebd877c20a81", // 2023 — integers greater than 7000 from 3, 5, 6, 7, 8
      traps: [
        {
          title: "Zero in the leading place",
          body: "When 0 is available, the leading digit has one fewer choice. If the last digit is also restricted (say even, and 0 is even), split into cases 'last digit 0' and 'last digit not 0'.",
        },
      ],
    },

    // C2 — divisibility
    {
      kind: "formula" as const,
      slug: "jpnc-divisible",
      name: "Divisibility conditions",
      intuition:
        "Turn each divisibility rule into a condition on digits: by 5, last digit 0 or 5; by 4, the last two digits; by 3, the digit sum; by 11, the alternating sum. For 'divisible by 3' with repetition allowed, group the digits by remainder mod 3 and count the combinations of remainders that add to a multiple of 3. Combined divisors (6, 15, 55) need both tests.",
      definition:
        "- By 3 or 9: digit sum. By 4: last two digits. By 5: last digit 0 or 5.\n" +
        "- By 11: (sum of odd places) \\(-\\) (sum of even places) is a multiple of 11.\n" +
        "- Six-digit palindromes \\(\\overline{abccba}\\) are all multiples of 11.\n" +
        "- With repetition, if the allowed digits are spread evenly over remainders mod 3, exactly a third of the free choices work.",
      formula: {
        label: "Digit-sum test",
        latex: "3\\mid\\overline{d_1d_2\\cdots d_n}\\ \\text{exactly when}\\ 3\\mid d_1+d_2+\\cdots+d_n",
      },
      authoredExample: {
        prompt: "How many 4-digit numbers divisible by 4 can be formed from 1, 6, 8, 9 without repetition?",
        steps: [
          "Endings from these digits divisible by 4: 16, 68, 96.",
          "Each leaves 2 digits for the first two places: \\(2!\\).",
        ],
        answer: "\\(3\\cdot2=6\\).",
      },
      selfCheckExample: {
        prompt: "How many 4-digit numbers ending in 5, with digits from \\(\\{1,2,3,4,5\\}\\) and repetition allowed, are divisible by 5?",
        steps: [
          "Every one ending in 5 is; the first three digits are free.",
        ],
        answer: "\\(5^3=125\\).",
      },
      practiceSet: [
        { prompt: "Is 5 1 7 7 1 5 divisible by 11?", answer: "Yes (palindrome of even length)" },
        { prompt: "Last two digits for divisibility by 4 from 1–6 without repeats, ending in 2?", answer: "12, 32, 52" },
        { prompt: "Divisible by 6 means?", answer: "Even and digit sum divisible by 3" },
        { prompt: "Digits 1, 2, 3, 5, 6, 7 have sum?", answer: "\\(24\\)" },
      ],
      pyqExampleId: "f8931f8f-a25c-450a-b76f-dcfd6faecbb8", // 2024 — 3-digit numbers from 2, 3, 4, 5, 7 not divisible by 3
      traps: [
        {
          title: "Count the complement when it is smaller",
          body: "'Not divisible by 3' is usually easier as total minus divisible. Listing the digit triples whose sum is a multiple of 3 is short; listing the others is long.",
        },
      ],
    },

    // C3 — digit sums and products
    {
      kind: "formula" as const,
      slug: "jpnc-digit-sum",
      name: "Fixed digit sum or product",
      intuition:
        "A fixed digit sum is an equation \\(d_1+\\dots+d_n=S\\) in bounded integers: substitute to remove the lower bounds, count with stars and bars, then subtract the cases where a digit exceeds 9. A fixed product is a factorisation: list the multisets of digits with that product, then count arrangements of each.",
      definition:
        "- \\(a+b+c=S\\), \\(a\\ge1\\), \\(b,c\\ge0\\): put \\(a'=a-1\\), then \\(\\binom{S-1+2}{2}\\) before bounds.\n" +
        "- Subtract each case with a digit \\(\\ge10\\) (put \\(d'=d-10\\)).\n" +
        "- Digits from \\(\\{1,2,3\\}\\) with sum \\(S\\): solve for the counts of each digit, then \\(\\frac{n!}{a!\\,b!\\,c!}\\).\n" +
        "- Product \\(k\\): list digit multisets whose product is \\(k\\).",
      formula: {
        label: "Stars and bars",
        latex: "x_1+\\cdots+x_k=S,\\ x_i\\ge0:\\ \\binom{S+k-1}{k-1}",
      },
      authoredExample: {
        prompt: "How many 3-digit numbers have digit sum 5?",
        steps: [
          "\\(a+b+c=5\\), \\(a\\ge1\\): \\(a'+b+c=4\\), \\(\\binom62=15\\). No digit can exceed 9.",
        ],
        answer: "\\(15\\).",
      },
      selfCheckExample: {
        prompt: "How many 4-digit numbers use only the digits 1 and 2 and have digit sum 6?",
        steps: [
          "Two 1s and two 2s: \\(\\frac{4!}{2!\\,2!}\\).",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Solutions of \\(x+y+z=6\\), \\(x,y,z\\ge0\\)?", answer: "\\(28\\)" },
        { prompt: "3-digit numbers with digit sum 1?", answer: "\\(1\\)" },
        { prompt: "Digit multisets of product 6 with three digits?", answer: "\\(\\{1,1,6\\},\\{1,2,3\\}\\)" },
        { prompt: "Arrangements of \\(\\{1,2,3\\}\\) as a 3-digit number?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "1469f145-9943-4c53-adca-323945cad10c", // 2024 — integers between 100 and 1000 with digit sum 14
      traps: [
        {
          title: "Digits stop at 9",
          body: "Stars and bars counts solutions with any size of digit. For a sum above 9, remove the solutions where some digit is 10 or more before answering.",
        },
      ],
    },
  ],
};
