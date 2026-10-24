import type { SubtopicNote } from "@/app/notes/_types";

export const AF_NS_REMAINDERS_NOTE: SubtopicNote = {
  subtopicName: "Remainders and Quotients",
  title: "Remainders and Quotients: Division, Remainder Arithmetic and Powers",
  oneLineDefinition:
    "Every division is dividend = divisor × quotient + remainder; remainders add and multiply like the numbers themselves, and the remainders of powers repeat in a cycle.",
  whyItMatters:
    "Half the page is plain division: a quotient, a remainder or the number itself. The HARD questions ask for the remainder of a power far too large to work out, and the way in is to reduce the base first and then find where the remainders start to repeat.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afns-division-algorithm",
      name: "Dividend = divisor × quotient + remainder",
      intuition:
        "Dividing \\(N\\) by \\(d\\) takes away as many whole \\(d\\)s as fit, the quotient, and leaves a remainder smaller than \\(d\\). The same equation runs backwards: from the divisor, quotient and remainder you rebuild the number.",
      definition:
        "- \\(N = dq + r\\) with \\(0 \\le r < d\\).\n" +
        "- To find \\(q\\), estimate with a round multiple and adjust: \\(27 \\times 40 = 1080\\), \\(27 \\times 45 = 1215\\).\n" +
        "- The remainder is always smaller than the divisor, so an option with \\(r \\ge d\\) is wrong whatever its quotient.\n" +
        "- A remainder of 0 means \\(d\\) divides \\(N\\) exactly.",
      formula: {
        label: "Division algorithm",
        latex: "N = d \\times q + r,\\qquad 0 \\le r < d",
      },
      authoredExample: {
        prompt: "Find the quotient and remainder when 1,234 is divided by 27.",
        steps: ["\\(27 \\times 45 = 1215\\) and \\(27 \\times 46 = 1242\\) is too big.", "\\(1234 - 1215 = 19\\)."],
        answer: "Quotient 45, remainder 19.",
      },
      selfCheckExample: {
        prompt: "A number divided by 17 gives quotient 23 and remainder 11. Find the number.",
        steps: ["\\(N = 17 \\times 23 + 11 = 391 + 11\\)."],
        answer: "\\(402\\).",
      },
      practiceSet: [
        { prompt: "Find the quotient and remainder when 500 is divided by 16.", answer: "31 and 4" },
        { prompt: "The divisor is 12, the quotient 9 and the remainder 7. Find the dividend.", answer: "\\(115\\)" },
        { prompt: "Find the remainder when 2,000 is divided by 37.", answer: "\\(2\\)", method: "\\(37 \\times 54 = 1998\\)." },
        { prompt: "Find the quotient when 6,543 is divided by 21.", answer: "\\(311\\)", method: "\\(21 \\times 311 = 6531\\)." },
      ],
      pyqExampleId: "82abe65d-0da4-4c80-9e57-366f89316f1c",
      traps: [
        {
          title: "The remainder is smaller than the divisor",
          body: "Dividing 500 by 16, the answer 30 remainder 20 is wrong because 20 is more than 16: one more 16 fits, giving 31 remainder 4.",
        },
        {
          title: "Multiply back to check",
          body: "\\(d \\times q + r\\) must give the dividend exactly. \\(16 \\times 31 + 4 = 500\\) confirms the division above.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-remainder-arithmetic",
      name: "Remainders of sums, multiples and products",
      intuition:
        "Only the remainder matters. If \\(N\\) leaves 6 on division by 11, then \\(N\\) is a multiple of 11 plus 6, and the multiple of 11 drops out of anything you add or multiply. So work with the remainders and reduce at the end.",
      definition:
        "- **Notation:** \\(N \\equiv r \\pmod d\\) is short for '\\(N\\) leaves remainder \\(r\\) on division by \\(d\\)'.\n" +
        "- Sums: the remainder of \\(a + b\\) is the remainder of \\(r_a + r_b\\). Products: the remainder of \\(a \\times b\\) is the remainder of \\(r_a \\times r_b\\).\n" +
        "- So \\(kN\\) leaves the remainder of \\(k \\times r\\), and \\(N + c\\) the remainder of \\(r + c\\).\n" +
        "- A product with a multiple of \\(d\\) in it leaves 0; adding 1 to it leaves 1.\n" +
        "- On division by 9 (or 3), a number leaves the same remainder as its digit sum, the fact behind the rule on Divisibility Rules.",
      formula: {
        label: "Working with remainders",
        latex: "a \\equiv r_a,\\ b \\equiv r_b \\pmod d \\;\\Rightarrow\\; a + b \\equiv r_a + r_b,\\quad ab \\equiv r_a r_b \\pmod d",
      },
      authoredExample: {
        prompt: "\\(N\\) leaves remainder 6 on division by 11. Find the remainder when \\(4N + 7\\) is divided by 11.",
        steps: [
          "\\(4N + 7 \\equiv 4 \\times 6 + 7 = 31 \\pmod{11}\\).",
          "\\(31 = 2 \\times 11 + 9\\).",
          "Check with \\(N = 17\\): \\(4 \\times 17 + 7 = 75 = 6 \\times 11 + 9\\).",
        ],
        answer: "\\(9\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when 54,321 is divided by 9.",
        steps: ["Digit sum: \\(5 + 4 + 3 + 2 + 1 = 15\\).", "15 leaves 6 on division by 9."],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "\\(N\\) leaves 4 on division by 7. Find the remainder when \\(5N\\) is divided by 7.", answer: "\\(6\\)", method: "\\(20 = 14 + 6\\)." },
        { prompt: "\\(A \\equiv 3\\) and \\(B \\equiv 6 \\pmod 9\\). Find the remainder of \\(A + B\\) on 9.", answer: "\\(0\\)" },
        { prompt: "Find the remainder when \\(23 \\times 25\\) is divided by 11.", answer: "\\(3\\)", method: "\\(23 \\equiv 1\\), \\(25 \\equiv 3\\)." },
        { prompt: "Find the remainder when \\(3 \\times 5 \\times 11 + 2\\) is divided by 11.", answer: "\\(2\\)" },
      ],
      pyqExampleId: "41c54406-d069-48b0-b586-784853fce943",
      traps: [
        {
          title: "Reduce the answer",
          body: "If \\(N \\equiv 7 \\pmod 9\\), then \\(2N\\) gives \\(14\\), which is not a remainder on 9. Reduce it: \\(14 - 9 = 5\\).",
        },
        {
          title: "The digit-sum shortcut is for 3 and 9 only",
          body: "123 has digit sum 6, and it does leave 6 on division by 9. On division by 7 it leaves 4, not 6.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afns-power-remainders",
      name: "Remainders of large powers",
      intuition:
        "Reduce the base first, then list its powers' remainders until one of them is 1. From there the list repeats, so a huge exponent only matters through its remainder on the length of the cycle. A base that leaves 1 or one less than the divisor needs no cycle at all.",
      definition:
        "- Reduce the base: \\(38^{n}\\) on 37 is \\(1^{n} = 1\\), because \\(38 \\equiv 1 \\pmod{37}\\).\n" +
        "- A base one less than the divisor is \\(-1\\): its even powers leave 1 and its odd powers leave \\(d - 1\\).\n" +
        "- Otherwise list \\(a, a^2, a^3, \\ldots\\) reduced until you reach 1. If \\(a^k \\equiv 1\\), split the exponent as \\(kq + s\\); the answer is the remainder of \\(a^s\\).\n" +
        "- **Fermat:** if \\(p\\) is prime and does not divide \\(a\\), then \\(a^{p - 1} \\equiv 1 \\pmod p\\). So the cycle length divides \\(p - 1\\).",
      formula: {
        label: "Splitting the exponent",
        latex: "a^k \\equiv 1 \\pmod d \\;\\Rightarrow\\; a^{kq + s} \\equiv a^s \\pmod d",
      },
      authoredExample: {
        prompt: "Find the remainder when \\(3^{41}\\) is divided by 7.",
        steps: [
          "Powers of 3 on 7: \\(3, 2, 6, 4, 5, 1\\). So \\(3^6 \\equiv 1\\) and the cycle has length 6.",
          "\\(41 = 6 \\times 6 + 5\\), so \\(3^{41} \\equiv 3^5\\).",
          "\\(3^5\\) is the fifth entry in the list: 5.",
        ],
        answer: "\\(5\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(12^{25}\\) is divided by 13.",
        steps: ["\\(12 \\equiv -1 \\pmod{13}\\).", "\\((-1)^{25} = -1\\), which is \\(13 - 1 = 12\\)."],
        answer: "\\(12\\).",
      },
      practiceSet: [
        { prompt: "Find the remainder when \\(5^{30}\\) is divided by 6.", answer: "\\(1\\)", method: "\\(5 \\equiv -1\\), even power." },
        { prompt: "Find the remainder when \\(4^{20}\\) is divided by 9.", answer: "\\(7\\)", method: "Cycle 4, 7, 1; \\(20 = 18 + 2\\)." },
        { prompt: "Find the remainder when \\(10^{9}\\) is divided by 11.", answer: "\\(10\\)", method: "\\(10 \\equiv -1\\), odd power." },
        { prompt: "Find the remainder when \\(6^{10}\\) is divided by 11.", answer: "\\(1\\)", method: "Fermat with \\(p = 11\\)." },
      ],
      pyqExampleId: "56997d5d-3ea7-479e-8e6c-b44cb188d410",
      traps: [
        {
          title: "Minus 1 means one less than the divisor",
          body: "\\(12^{25} \\equiv -1 \\pmod{13}\\), and the remainder to choose is 12. A negative number is never the answer.",
        },
        {
          title: "Use the full cycle length",
          body: "The powers of 3 on 7 repeat every 6, not every 3. Splitting 41 by 3 gives \\(3^2\\) and the wrong remainder 2; by 6 it gives \\(3^5\\) and 5.",
        },
      ],
    },
  ],
};
