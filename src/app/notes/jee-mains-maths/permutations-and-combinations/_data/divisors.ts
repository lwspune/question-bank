import type { SubtopicNote } from "@/app/notes/_types";

export const DIVISORS_PNC_NOTE: SubtopicNote = {
  subtopicName: "Divisibility, Divisors and Factorials",
  title: "Divisibility, Divisors and Factorials",
  oneLineDefinition:
    "Counting with number theory: the power of a prime in n!, divisors of a given form, how many numbers in a range are multiples of one number but not another, and pairs chosen by their remainders.",
  whyItMatters:
    "Twenty PYQs, fifteen of them numerical answer. Five find the power of a prime in a factorial, ten count multiples or gcd conditions by inclusion–exclusion, and five sort numbers by remainder before pairing them. Three ideas cover the page.",
  concepts: [
    // C1 — Legendre and divisors
    {
      kind: "formula" as const,
      slug: "jpnc-legendre",
      name: "Powers of a prime in n!, and counting divisors",
      intuition:
        "The power of a prime \\(p\\) in \\(n!\\) is \\(\\left\\lfloor\\frac np\\right\\rfloor+\\left\\lfloor\\frac n{p^2}\\right\\rfloor+\\cdots\\): each multiple of \\(p\\) gives one factor, each multiple of \\(p^2\\) one more, and so on. For a composite base like \\(40=2^3\\cdot5\\), the answer is the smallest of the separate limits. A number \\(p^aq^b\\cdots\\) has \\((a+1)(b+1)\\cdots\\) divisors; a condition on the divisor (odd, of the form \\(4n+1\\)) restricts each exponent.",
      definition:
        "- Legendre: \\(v_p(n!)=\\sum_{k\\ge1}\\left\\lfloor\\frac{n}{p^k}\\right\\rfloor\\).\n" +
        "- Largest \\(m\\) with \\(a^m\\mid n!\\): \\(\\min_p\\left\\lfloor\\frac{v_p(n!)}{v_p(a)}\\right\\rfloor\\).\n" +
        "- Divisors of \\(p^aq^b\\): \\((a+1)(b+1)\\).\n" +
        "- Odd divisors: set the exponent of 2 to 0.",
      formula: {
        label: "Legendre's formula",
        latex: "v_p(n!)=\\left\\lfloor\\frac np\\right\\rfloor+\\left\\lfloor\\frac n{p^2}\\right\\rfloor+\\left\\lfloor\\frac n{p^3}\\right\\rfloor+\\cdots",
      },
      authoredExample: {
        prompt: "Find the largest \\(n\\) with \\(5^n\\mid 100!\\).",
        steps: [
          "\\(\\lfloor100/5\\rfloor+\\lfloor100/25\\rfloor=20+4\\).",
        ],
        answer: "\\(24\\).",
      },
      selfCheckExample: {
        prompt: "How many odd divisors does \\(2^3\\cdot3^2\\cdot5\\) have?",
        steps: [
          "Exponent of 2 fixed at 0: \\((2+1)(1+1)\\).",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "Trailing zeros of \\(50!\\)?", answer: "\\(12\\)" },
        { prompt: "\\(v_2(10!)\\)?", answer: "\\(8\\)" },
        { prompt: "Divisors of 72?", answer: "\\(12\\)" },
        { prompt: "Largest \\(n\\) with \\(6^n\\mid 10!\\)?", answer: "\\(4\\)" },
      ],
      pyqExampleId: "184efad3-4811-40e7-a973-86d84d7f0bd0", // 2025 — largest n with 3^n dividing 50!
      traps: [
        {
          title: "The scarcer prime decides",
          body: "For \\(40^n\\mid n!\\) you need both \\(2^{3n}\\) and \\(5^n\\). Compute each limit and take the smaller; the prime that appears less often usually wins.",
        },
      ],
    },

    // C2 — multiples by inclusion–exclusion
    {
      kind: "formula" as const,
      slug: "jpnc-multiples",
      name: "Counting multiples in a range",
      intuition:
        "The multiples of \\(d\\) up to \\(N\\) number \\(\\left\\lfloor\\frac Nd\\right\\rfloor\\); in a range, subtract the count below it. 'By \\(a\\) or \\(b\\)' is \\(|A|+|B|-|A\\cap B|\\), where the overlap counts multiples of \\(\\operatorname{lcm}(a,b)\\). A gcd condition such as \\(\\gcd(n,54)=2\\) becomes 'even, and not divisible by 3'.",
      definition:
        "- Multiples of \\(d\\) in \\([a,b]\\): \\(\\left\\lfloor\\frac bd\\right\\rfloor-\\left\\lfloor\\frac{a-1}d\\right\\rfloor\\).\n" +
        "- \\(|A\\cup B|=|A|+|B|-|A\\cap B|\\); overlap uses the lcm.\n" +
        "- \\(\\gcd(n,m)=g\\): \\(g\\mid n\\) and \\(\\gcd\\left(\\frac ng,\\frac mg\\right)=1\\).\n" +
        "- Coprime to 24 means not divisible by 2 or 3.",
      formula: {
        label: "Inclusion–exclusion",
        latex: "|A\\cup B|=|A|+|B|-|A\\cap B|",
      },
      authoredExample: {
        prompt: "How many numbers from 1 to 100 are divisible by 4 or 6?",
        steps: [
          "\\(25+16-\\lfloor100/12\\rfloor=25+16-8\\).",
        ],
        answer: "\\(33\\).",
      },
      selfCheckExample: {
        prompt: "How many two-digit numbers are even but not divisible by 3?",
        steps: [
          "Even: 45. Multiples of 6: 15.",
        ],
        answer: "\\(30\\).",
      },
      practiceSet: [
        { prompt: "3-digit multiples of 7?", answer: "\\(128\\)" },
        { prompt: "4-digit even numbers?", answer: "\\(4500\\)" },
        { prompt: "Numbers in 1–30 coprime to 6?", answer: "\\(10\\)" },
        { prompt: "\\(\\gcd(n,36)=2\\) means?", answer: "\\(n\\equiv2\\pmod4\\) and \\(3\\nmid n\\)" },
      ],
      pyqExampleId: "ecb6b30f-30ec-473c-a93e-8fe48c3be9be", // 2023 — 3-digit numbers divisible by 3 or 4 but not 48
      traps: [
        {
          title: "Use the lcm, not the product",
          body: "Numbers divisible by both 4 and 6 are multiples of 12, not of 24. Always take the lcm for the overlap.",
        },
      ],
    },

    // C3 — residues
    {
      kind: "formula" as const,
      slug: "jpnc-residues",
      name: "Pairing numbers by their remainders",
      intuition:
        "To count pairs whose sum is divisible by \\(m\\), sort the numbers by remainder mod \\(m\\): a pair works when the remainders add to \\(0\\) or \\(m\\). Multiply the class sizes for each matching pair of classes. Powers work the same way: \\(6^m\\equiv1\\pmod5\\) for every \\(m\\), so only the other term decides.",
      definition:
        "- \\(x+y\\equiv0\\pmod m\\): remainders \\(r\\) and \\(m-r\\).\n" +
        "- Same class \\(r=0\\) (or \\(r=\\frac m2\\)): choose two from one class.\n" +
        "- Ordered pairs: count \\((r,s)\\) and \\((s,r)\\) separately.\n" +
        "- Cycles of powers mod \\(m\\) decide divisibility of sums of powers.",
      formula: {
        label: "Matching classes",
        latex: "\\#\\{x+y\\equiv0\\}=\\sum_{r+s\\equiv0}|C_r|\\,|C_s|",
      },
      authoredExample: {
        prompt: "How many unordered pairs of distinct numbers from 1 to 10 have a sum divisible by 3?",
        steps: [
          "Classes: \\(\\{3,6,9\\}\\), \\(\\{1,4,7,10\\}\\), \\(\\{2,5,8\\}\\).",
          "\\(\\binom32+4\\cdot3=3+12\\).",
        ],
        answer: "\\(15\\).",
      },
      selfCheckExample: {
        prompt: "For how many \\(n\\) in \\(1,\\dots,10\\) is \\(4^n+1\\) divisible by 5?",
        steps: [
          "\\(4^n\\equiv4\\) for odd \\(n\\), \\(1\\) for even \\(n\\).",
        ],
        answer: "The 5 odd values.",
      },
      practiceSet: [
        { prompt: "Residue classes mod 5 in \\(1\\dots25\\): size?", answer: "5 each" },
        { prompt: "\\(9^n\\bmod5\\) for odd \\(n\\)?", answer: "\\(4\\)" },
        { prompt: "Remainders that pair with 2 mod 7?", answer: "\\(5\\)" },
        { prompt: "Ordered pairs from classes of sizes 3 and 4?", answer: "\\(24\\)" },
      ],
      pyqExampleId: "5c908ba7-1869-4731-af7f-407eef1db1b9", // 2023 — distinct x, y in 1..25 with x + y divisible by 5
      traps: [
        {
          title: "Ordered or unordered",
          body: "'Ways of choosing \\(x\\) and \\(y\\)' with named variables counts ordered pairs. Decide before multiplying, and for pairs inside one class use \\(k(k-1)\\) ordered or \\(\\binom k2\\) unordered.",
        },
      ],
    },
  ],
};
