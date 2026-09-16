import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_UNIT_DIGIT_NOTE: SubtopicNote = {
  subtopicName: "Unit Digit and Cyclicity",
  title: "Unit Digit & Cyclicity",
  oneLineDefinition:
    "The last digit of a power depends only on the last digit of the base and on the exponent's remainder modulo 4, so an enormous power can be settled in two lines of arithmetic.",
  whyItMatters:
    "Thirteen PYQs and among the most reliable marks in CDS Elementary Mathematics — six of the thirteen are EASY and every one of those is a thirty-second question once the cycle table is memorised. The two HARD ones are the same technique pushed one step further: instead of one power you are asked how many different last digits a sum of several powers can produce.",
  concepts: [
    // C1 — the cycle table (reference variant)
    {
      kind: "reference" as const,
      slug: "cdsns-unit-digit-cycles",
      name: "The unit-digit cycle of each base",
      intuition:
        "Multiply a number by itself repeatedly and watch only the last digit: it never wanders. It falls into a short repeating loop, and the loop length is 1, 2 or 4 for every possible last digit. Nothing else can happen, because there are only ten possible last digits and multiplication by the base is deterministic.",
      definition:
        "Only the **last digit of the base** matters, so \\(67^{n}\\) and \\(7^{n}\\) always end in the same digit. Each last digit has a fixed cycle:\n" +
        "- **Period 1** (the digit never changes): 0, 1, 5, 6.\n" +
        "- **Period 2**: 4 and 9.\n" +
        "- **Period 4**: 2, 3, 7 and 8.\n" +
        "Because every period divides 4, reducing the exponent modulo 4 is enough for **all** bases — which is why one rule covers the whole table.",
      table: {
        columns: ["Last digit of base", "Cycle of unit digits", "Period"],
        rows: [
          { cells: ["0", "0", "1"] },
          { cells: ["1", "1", "1"] },
          { cells: ["2", "2, 4, 8, 6", "4"] },
          { cells: ["3", "3, 9, 7, 1", "4"] },
          { cells: ["4", "4, 6", "2"] },
          {
            cells: ["5", "5", "1"],
            noteAmber:
              "Every positive power of a number ending in 5 ends in 5. There is no alternation.",
          },
          { cells: ["6", "6", "1"] },
          { cells: ["7", "7, 9, 3, 1", "4"] },
          { cells: ["8", "8, 4, 2, 6", "4"] },
          { cells: ["9", "9, 1", "2"] },
        ],
        caption:
          "Read the cycle left to right starting at exponent 1. Every period divides 4, so exponent modulo 4 settles every case.",
      },
      selfCheckExample: {
        prompt: "What is the unit digit of \\(1234^{567}\\)?",
        steps: [
          "Only the base's last digit matters, so this is the unit digit of \\(4^{567}\\).",
          "The digit 4 has period 2: the cycle is \\(4, 6\\) for exponents \\(1, 2\\) and repeats.",
          "The exponent 567 is odd, so we are at the first entry of the cycle.",
          "Hence the unit digit is 4.",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "Unit digit of \\(6^{100}\\)?", answer: "\\(6\\)", method: "Period 1" },
        { prompt: "Unit digit of \\(9^{15}\\)?", answer: "\\(9\\)", method: "Period 2, odd exponent" },
        { prompt: "Period of the cycle for base ending in 8?", answer: "\\(4\\)" },
        { prompt: "Unit digit of \\(385^{41}\\)?", answer: "\\(5\\)", method: "Anything ending in 5 stays 5" },
      ],
      pyqExampleId: "48b2f708-fa23-4364-9353-1b42ff1118bf", // 2019 — unit digit of 7^73
      traps: [
        {
          title: "The base's other digits are irrelevant, and the exponent's are not",
          body:
            "\\(67^{32}\\), \\(7^{32}\\) and \\(1257^{32}\\) all end in the same digit — only the base's last digit counts. But you must use the **whole** exponent when reducing modulo 4: the exponent's last digit alone is not enough, since \\(14\\) and \\(34\\) end alike yet leave different remainders on division by 4.",
        },
      ],
    },

    // C2 — exponent mod 4, with the cycle wheel
    {
      kind: "formula" as const,
      slug: "cdsns-exponent-mod-4",
      name: "Reducing the exponent modulo 4",
      intuition:
        "If the cycle has length 4, then walking 4 steps brings you back where you started — so only the exponent's remainder on division by 4 decides the answer. The one place this goes wrong is a remainder of **zero**: that means you have just completed a lap, so you land on the **last** entry of the cycle, not the first.",
      definition:
        "To find the unit digit of \\(b^{n}\\):\n" +
        "- take \\(d\\), the last digit of \\(b\\), and look up its cycle;\n" +
        "- compute \\(r = n \\bmod 4\\);\n" +
        "- if \\(r \\in \\{1,2,3\\}\\), take the \\(r\\)-th entry of the cycle; if \\(r = 0\\), take the **last** entry.\n" +
        "For a period-2 base (4 or 9) the shortcut is simply the **parity** of \\(n\\): odd exponent gives the first entry, even the second.",
      formula: {
        label: "Exponent reduction",
        latex: "b^{n} \\text{ ends in the } r\\text{-th cycle entry}, \\quad r = n \\bmod 4 \\;\\;(r=0 \\Rightarrow \\text{4th entry})",
      },
      visualizationSlug: "cds-unit-digit-cycle-wheel",
      authoredExample: {
        prompt: "What is the unit digit of \\(3^{2026}\\)?",
        steps: [
          "The base ends in 3, whose cycle is \\(3, 9, 7, 1\\) with period 4.",
          "Reduce the exponent: \\(2026 = 4\\times 506 + 2\\), so \\(r = 2\\).",
          "Take the 2nd entry of the cycle.",
          "That entry is 9.",
        ],
        answer: "\\(9\\).",
      },
      selfCheckExample: {
        prompt: "What is the unit digit of \\(2^{100}\\)?",
        steps: [
          "Base ends in 2, cycle \\(2, 4, 8, 6\\), period 4.",
          "\\(100 = 4 \\times 25\\), so \\(r = 0\\).",
          "A remainder of 0 means the lap is complete, so take the **4th** entry, not the 1st.",
          "That entry is 6. (Check the small case \\(2^4 = 16\\), which does end in 6.)",
        ],
        answer: "\\(6\\).",
      },
      practiceSet: [
        { prompt: "\\(139 \\bmod 4\\)?", answer: "\\(3\\)" },
        { prompt: "Unit digit of \\(7^{139}\\)?", answer: "\\(3\\)", method: "3rd entry of \\(7,9,3,1\\)" },
        { prompt: "Unit digit of \\(8^{40}\\)?", answer: "\\(6\\)", method: "\\(r=0\\), so the 4th entry" },
        { prompt: "Unit digit of \\(3^{2023}\\)?", answer: "\\(7\\)", method: "\\(2023 \\bmod 4 = 3\\)" },
      ],
      pyqExampleId: "876212d2-0cab-42fd-8bfd-be65ba0fbd12", // 2016 — unit digit of 7^139
      traps: [
        {
          title: "A remainder of 0 sends you to the END of the cycle, not the start",
          body:
            "This is the single commonest error in the whole subtopic. \\(2^{100}\\) has \\(100 \\bmod 4 = 0\\), and the answer is 6 — the fourth entry — not 2. Think of it as finishing a lap: remainder 0 means you are standing on the last step, and the amber node in the diagram above is exactly that position.",
        },
        {
          title: "Reduce the exponent modulo 4, never modulo 10",
          body:
            "The cycle length is 4, so 4 is the modulus for the exponent. Students who reduce the exponent modulo 10 — because the question is about the last digit — get a number between 0 and 9 that means nothing here. The 10 lives in the **answer**; the 4 lives in the **exponent**.",
        },
      ],
    },

    // C3 — combining several terms
    {
      kind: "formula" as const,
      slug: "cdsns-unit-digit-combinations",
      name: "Unit digits of sums, differences and products of powers",
      intuition:
        "Last digits behave well under every arithmetic operation: to get the last digit of a sum, add the last digits and keep only the last digit of that. So a frightening expression becomes a handful of one-digit sums. For a difference, borrow 10 if the first digit is smaller.",
      definition:
        "Work modulo 10 throughout, since the last digit **is** the residue modulo 10.\n" +
        "- **Sum:** add the individual unit digits, then reduce modulo 10.\n" +
        "- **Product:** multiply the individual unit digits, then reduce modulo 10.\n" +
        "- **Difference:** subtract; if the result is negative add 10.\n" +
        "For an expression like \\(3^{98}-3^{89}\\), factor out the smaller power **first** — \\(3^{89}(3^{9}-1)\\) — and then take unit digits of each factor, because subtracting before factoring invites a sign slip.",
      formula: {
        label: "Unit digit of a combination",
        latex: "(A \\pm B) \\bmod 10 = \\big[(A \\bmod 10) \\pm (B \\bmod 10)\\big] \\bmod 10",
      },
      authoredExample: {
        prompt:
          "How many distinct unit digits can \\(2^{a} + 3^{b}\\) take, for natural numbers \\(a\\) and \\(b\\)?",
        steps: [
          "\\(2^{a}\\) ends in one of \\(2, 4, 8, 6\\); \\(3^{b}\\) ends in one of \\(3, 9, 7, 1\\).",
          "All sixteen sums, reduced modulo 10: \\(5,1,9,3\\) from 2; \\(7,3,1,5\\) from 4; \\(1,7,5,9\\) from 8; \\(9,5,3,7\\) from 6.",
          "The distinct values are \\(\\{1,3,5,7,9\\}\\).",
          "The structural reason they are all odd: \\(2^a\\) is always even and \\(3^b\\) always odd, so the sum is always odd.",
        ],
        answer: "Five, namely every odd digit.",
      },
      selfCheckExample: {
        prompt:
          "What is the sum of all distinct unit digits of \\(4^{n} + 9^{n}\\) as \\(n\\) runs over the natural numbers?",
        steps: [
          "Both bases have period 2, so only the parity of \\(n\\) matters — there are just two cases.",
          "\\(n\\) odd: \\(4^n\\) ends in 4 and \\(9^n\\) ends in 9, so the sum ends in \\(13 \\bmod 10 = 3\\).",
          "\\(n\\) even: \\(4^n\\) ends in 6 and \\(9^n\\) ends in 1, so the sum ends in \\(7\\).",
          "Distinct unit digits are \\(\\{3, 7\\}\\), summing to 10.",
        ],
        answer: "\\(10\\).",
      },
      practiceSet: [
        { prompt: "Unit digit of \\(7^{4}+2^{3}\\)?", answer: "\\(9\\)", method: "\\(1+8\\)" },
        { prompt: "Unit digit of \\(3^{5}\\times 4^{2}\\)?", answer: "\\(8\\)", method: "\\(3\\times 6=18\\)" },
        { prompt: "Unit digit of \\(8^{2}-3^{3}\\)?", answer: "\\(7\\)", method: "\\(4-7=-3\\), add 10" },
        { prompt: "Factor \\(5^{20}-5^{17}\\) to expose its unit digit.", answer: "\\(5^{17}(5^{3}-1)\\)", method: "Ends in \\(5\\times 4=20\\), so 0" },
      ],
      pyqExampleId: "6d798034-400e-467e-87a4-0cb1ed6d433b", // 2023 — last digit of 9^27 + 27^9
      traps: [
        {
          title: "Factor a difference of powers before taking unit digits",
          body:
            "For \\(3^{98}-3^{89}\\), taking each term's unit digit gives \\(9-3\\) and the tempting answer 6 — which happens to be right here, but the method is unsafe: it breaks whenever the first unit digit is the smaller. Factoring to \\(3^{89}(3^9-1)\\) turns it into a **product**, which never needs borrowing.",
        },
        {
          title: "A negative difference needs plus 10, not a minus sign",
          body:
            "If the unit digits give \\(4-7=-3\\), the last digit is \\(7\\), not \\(-3\\) or \\(3\\). Add 10 once. A digit is always in the range 0 to 9.",
        },
      ],
    },

    // C4 — odd multiples of five
    {
      kind: "formula" as const,
      slug: "cdsns-odd-multiple-of-five",
      name: "A number that is odd and a multiple of 5 must end in 5",
      intuition:
        "Multiples of 5 end in 0 or 5, and nothing else. If the number is also odd, 0 is impossible — so it ends in 5. This one-line argument replaces a lot of work: a long product of odd numbers that includes a 5 somewhere has last digit 5, however many factors there are.",
      definition:
        "A number is a multiple of 5 exactly when its unit digit is \\(0\\) or \\(5\\); and it is even exactly when its unit digit is even.\n" +
        "- Odd **and** a multiple of 5 \\(\\Rightarrow\\) it ends in \\(5\\).\n" +
        "- A product of integers is odd only when every factor is odd, and is a multiple of 5 as soon as **one** factor is.\n" +
        "So for a product: if every factor is odd and at least one carries a factor of 5, the last digit is \\(5\\). If any factor is even and one carries a 5, the last digit is \\(0\\).",
      formula: {
        label: "Odd multiple of five",
        latex: "5 \\mid N \\;\\text{and}\\; N \\text{ odd} \\;\\Longrightarrow\\; N \\equiv 5 \\pmod{10}",
      },
      authoredExample: {
        prompt:
          "What is the unit digit of the product of all odd numbers from 21 to 39 inclusive?",
        steps: [
          "Every factor in the list \\(21, 23, \\ldots, 39\\) is odd, so the product is odd.",
          "The list contains 25 and 35, each a multiple of 5, so the product is a multiple of 5.",
          "An odd multiple of 5 must end in 5 — it cannot end in 0, since that would make it even.",
          "So the unit digit is 5, and no multiplication was needed.",
        ],
        answer: "\\(5\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the unit digit of \\(1\\times 2\\times 3\\times \\cdots \\times 12\\)?",
        steps: [
          "The product contains 5 (and 10), so it is a multiple of 5.",
          "It also contains 2, so it is even.",
          "Even and a multiple of 5 means it is a multiple of 10, so it ends in 0.",
          "Contrast this with the worked example: dropping the even factors flips the answer from 0 to 5.",
        ],
        answer: "\\(0\\).",
      },
      practiceSet: [
        { prompt: "Unit digit of \\(5\\times 7\\times 9\\times 11\\)?", answer: "\\(5\\)", method: "All odd, one multiple of 5" },
        { prompt: "Unit digit of \\(15 \\times 24\\)?", answer: "\\(0\\)", method: "One factor even, one a multiple of 5" },
        { prompt: "Can an odd number end in 0?", answer: "No" },
        { prompt: "Unit digit of the product of all primes below 20?", answer: "\\(0\\)", method: "It contains both 2 and 5" },
      ],
      pyqExampleId: "fc917d03-a35c-4d4a-8451-9ad5695e8761", // 2026 — unit digit of 1^1 x 3^3 x 5^5 x 7^7 x 9^9
      traps: [
        {
          title: "The word ODD in the question is what changes the answer from 0 to 5",
          body:
            "\"The product of all odd primes up to 110\" ends in 5; \"the product of all primes up to 110\" ends in 0, because including 2 makes the product even. CDS sets both versions. The single word doing the work is **odd**, and it is easy to read past.",
        },
      ],
    },

    // C5 — counting achievable unit digits
    {
      kind: "formula" as const,
      slug: "cdsns-counting-distinct-unit-digits",
      name: "Counting how many unit digits an expression can produce",
      intuition:
        "When several exponents are free to vary independently, the question stops being \"what is the last digit\" and becomes \"how many last digits are reachable\". The method is to collapse the constant terms first, then enumerate only the terms that actually move — usually just two short cycles, so sixteen cases at most.",
      definition:
        "Procedure:\n" +
        "- Reduce each base modulo 10 and identify its cycle.\n" +
        "- **Fix the constant terms.** A base ending in 0, 1, 5 or 6 has period 1, so it contributes the same digit always and can be added in once.\n" +
        "- Enumerate the Cartesian product of the remaining cycles and collect the distinct residues.\n" +
        "- A parity argument often shortcuts the count: if the expression is forced even, at most the five even digits are reachable.",
      formula: {
        label: "Number of cases to check",
        latex: "\\text{cases} = \\prod_{\\text{moving terms}} (\\text{period of that term})",
      },
      authoredExample: {
        prompt:
          "How many distinct unit digits can \\(6^{a} + 2^{b}\\) take, for natural numbers \\(a\\) and \\(b\\)?",
        steps: [
          "The base 6 has period 1, so \\(6^{a}\\) always ends in 6 — it is a constant and contributes no cases.",
          "The base 2 has period 4, with cycle \\(2, 4, 8, 6\\), so there are just four cases.",
          "Add 6 to each and reduce: \\(6+2=8\\), \\(6+4=0\\), \\(6+8=4\\), \\(6+6=2\\).",
          "Distinct values: \\(\\{0, 2, 4, 8\\}\\) — four of them, and all even, as expected since both terms are always even.",
        ],
        answer: "Four.",
      },
      selfCheckExample: {
        prompt:
          "How many distinct unit digits can \\(5^{a} + 11^{c} + 7^{b}\\) take, for natural \\(a, b, c\\)?",
        steps: [
          "\\(5^{a}\\) always ends in 5 and \\(11^{c}\\) always ends in 1 — both period 1, so together they contribute a constant \\(5+1 = 6\\).",
          "\\(7^{b}\\) has cycle \\(7, 9, 3, 1\\), giving four cases.",
          "Add: \\(6+7=13 \\to 3\\); \\(6+9=15 \\to 5\\); \\(6+3=9\\); \\(6+1=7\\).",
          "Distinct values \\(\\{3,5,7,9\\}\\) — four, and all odd, since an even constant plus an odd power is odd.",
        ],
        answer: "Four.",
      },
      practiceSet: [
        { prompt: "How many cases does one period-4 term give?", answer: "Four" },
        { prompt: "Does \\(1^{a}\\) add any cases?", answer: "No", method: "Period 1" },
        { prompt: "How many cases for two period-4 terms?", answer: "Sixteen" },
        { prompt: "Unit digits reachable by \\(5^{a}+5^{b}\\)?", answer: "Just \\(0\\)", method: "\\(5+5=10\\)" },
      ],
      pyqExampleId: "49e7d156-7594-46ac-a7fe-20853a038ebd", // 2024 — distinct remainders of 5^a+7^b+11^c+13^d mod 10
      traps: [
        {
          title: "Collapse the period-1 terms before you start enumerating",
          body:
            "In \\(5^{a}+7^{b}+11^{c}+13^{d}\\) two of the four terms never change: \\(5^a\\) ends in 5 and \\(11^c\\) ends in 1. Treating all four as variable means enumerating sixteen cases instead of the necessary sixteen over only the two that move — and, worse, invites you to imagine \\(5^a\\) cycling, which it does not.",
        },
        {
          title: "The question asks for a COUNT, or sometimes for a SUM of the distinct values",
          body:
            "CDS sets both phrasings, and they sit next to each other in the same paper. \"How many distinct remainders\" wants 5; \"the sum of all distinct remainders\" wants the total of that set. Re-read the last line of the stem before you answer.",
        },
      ],
    },
  ],
  related: [
    { label: "Divisibility rules and missing digits", href: "/notes/cds-maths/number-system/cds-ns-divisibility-rules" },
    { label: "Place value and digit problems", href: "/notes/cds-maths/number-system/cds-ns-place-value" },
  ],
};
