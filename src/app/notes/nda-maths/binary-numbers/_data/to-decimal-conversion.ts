import type { SubtopicNote } from "@/app/notes/_types";

export const TO_DECIMAL_CONVERSION_NOTE: SubtopicNote = {
  subtopicName: "Binary to Decimal Conversion",
  title: "Binary ↔ Decimal Conversion",
  oneLineDefinition:
    "Base 2 writes every number with just the digits 0 and 1, where each place is worth a power of 2. Converting between binary and decimal is the single skill that unlocks the whole chapter — almost every PYQ starts with it.",
  whyItMatters:
    "This subtopic is the chapter's foundation. The NDA almost never asks you to do clever things IN binary — it asks you to convert, do ordinary decimal arithmetic, and (sometimes) convert back. Three direct PYQs live here, but the conversion skill is used in every other question in the chapter. Get decimal ↔ binary fluent first and the rest becomes easy.",
  concepts: [
    // 1 — FOUNDATION: what base 2 is + powers-of-2 place values (reference table folded in as a formula foundation)
    {
      kind: "formula" as const,
      slug: "bin-place-value-foundation",
      name: "What Base 2 Means — Place Values Are Powers of 2",
      intuition:
        "In ordinary decimal (base 10) each place is worth a power of 10: ones, tens, hundreds. Binary (base 2) is the same idea with only two digits, 0 and 1, and each place worth a power of 2: ones, twos, fours, eights. A binary digit is called a bit, and it can only be 0 or 1 — there is no digit '2' in base 2.",
      definition:
        "A **binary number** is written using only the **bits** 0 and 1, in **base 2**. Reading from the right, the place values are\n" +
        "\\[2^0 = 1,\\ \\ 2^1 = 2,\\ \\ 2^2 = 4,\\ \\ 2^3 = 8,\\ \\ 2^4 = 16,\\ \\ 2^5 = 32,\\ \\ \\ldots\\]\n" +
        "A binary string \\((b_n b_{n-1}\\ldots b_1 b_0)_2\\) means the **weighted sum**\n" +
        "\\[(b_n b_{n-1}\\ldots b_1 b_0)_2 = b_n\\,2^n + b_{n-1}\\,2^{n-1} + \\cdots + b_1\\,2^1 + b_0\\,2^0,\\]\n" +
        "where each bit \\(b_i \\in \\{0, 1\\}\\). The little subscript \\(2\\) is what marks a number as binary; with no subscript a number is assumed decimal (base 10).\n" +
        "- The **rightmost** bit (\\(b_0\\), worth \\(2^0 = 1\\)) is the **least significant bit**.\n" +
        "- The **leftmost** bit is the **most significant bit**.\n" +
        "- A handy fact: a string of \\(n\\) ones, \\((\\underbrace{11\\ldots1}_{n})_2\\), equals \\(2^n - 1\\) (e.g. \\((11111)_2 = 2^5 - 1 = 31\\)).",
      formula: {
        label: "Powers of 2 (place values)",
        latex:
          "\\begin{array}{c|ccccccccc} 2^n & 2^9 & 2^8 & 2^7 & 2^6 & 2^5 & 2^4 & 2^3 & 2^2 & 2^1 & 2^0 \\\\ \\hline \\text{value} & 512 & 256 & 128 & 64 & 32 & 16 & 8 & 4 & 2 & 1 \\end{array}",
      },
      authoredExample: {
        prompt:
          "What place values do the bits of \\((1011)_2\\) carry, and what number is it?",
        steps: [
          "From the right the place values are \\(2^0 = 1,\\ 2^1 = 2,\\ 2^2 = 4,\\ 2^3 = 8\\).",
          "The bits of \\((1011)_2\\) from the right are \\(1, 1, 0, 1\\).",
          "Add the place values where the bit is \\(1\\): \\(8 + 0 + 2 + 1 = 11\\).",
        ],
        answer: "\\((1011)_2\\) carries places \\(8, 4, 2, 1\\) and equals \\(11_{10}\\).",
      },
      practiceSet: [
        { prompt: "What is the place value of the leftmost bit of \\((100000)_2\\)?", answer: "\\(2^5 = 32\\)", method: "Six bits → leftmost is the \\(2^5\\) place." },
        { prompt: "How many bits are 1 in \\((1101)_2\\), and which is the least significant bit?", answer: "Three 1s; the least significant bit is the rightmost (value \\(2^0 = 1\\))." },
        { prompt: "Without converting, what is \\((1111)_2\\) using the all-ones shortcut?", answer: "\\(15\\)", method: "\\(n=4\\) ones \\(= 2^4 - 1 = 15\\)." },
        { prompt: "Is \\((1021)_2\\) a valid binary number?", answer: "No — base 2 allows only the digits 0 and 1, and it contains a 2." },
      ],
      traps: [
        {
          title: "Place values grow leftward, from 2⁰ on the RIGHT",
          body:
            "The rightmost bit is the \\(2^0 = 1\\) place, not the \\(2^1\\) place. Counting the powers from the left, or starting at \\(2^1\\), shifts every weight and is the most common conversion slip.",
        },
      ],
    },

    // 2 — binary → decimal (PYQ: cdccddcccddd) + tags the addition-then-decimal q
    {
      kind: "formula" as const,
      slug: "bin-binary-to-decimal",
      name: "Converting Binary to Decimal",
      pyqExampleId: "adc37248-f2da-4904-863e-6399eab24851",
      intuition:
        "To turn a binary number into decimal, just add up the place values wherever a bit is 1 — ignore every position holding a 0. That is the whole method; everything else in the chapter leans on it.",
      definition:
        "To convert \\((b_n\\ldots b_1 b_0)_2\\) to decimal, **sum the powers of 2 at the positions where the bit is 1**:\n" +
        "\\[\\text{decimal} = \\sum_{i:\\,b_i = 1} 2^i.\\]\n" +
        "- Line the bits up under their place values \\(\\ldots, 8, 4, 2, 1\\) and add the ones that are switched on.\n" +
        "- A symbolic binary like \\((cdc\\ldots)_2\\) with a stated order such as \\(c > d\\) is still binary: the only digits available are 0 and 1, so \\(c = 1\\) and \\(d = 0\\). Substitute and convert as usual.",
      formula: {
        label: "Binary → decimal",
        latex: "(b_n\\ldots b_1 b_0)_2 = \\sum_{i=0}^{n} b_i\\, 2^i",
      },
      authoredExample: {
        prompt: "Convert \\((110101)_2\\) to decimal.",
        steps: [
          "Place values from the right: \\(32, 16, 8, 4, 2, 1\\).",
          "Bits from the right: \\(1, 0, 1, 0, 1, 1\\) — so the 1s sit at the \\(32, 8, 4, 1\\) places.",
          "Add them: \\(32 + 16 + 0 + 4 + 0 + 1\\)... line them up: \\(1\\!\\cdot\\!32 + 1\\!\\cdot\\!16 + 0\\!\\cdot\\!8 + 1\\!\\cdot\\!4 + 0\\!\\cdot\\!2 + 1\\!\\cdot\\!1 = 32 + 16 + 4 + 1 = 53\\).",
        ],
        answer: "\\((110101)_2 = 53_{10}\\).",
      },
      selfCheckExample: {
        prompt: "Convert \\((100110)_2\\) to decimal.",
        steps: [
          "Place values: \\(32, 16, 8, 4, 2, 1\\); bits: \\(1, 0, 0, 1, 1, 0\\).",
          "The 1s are at the \\(32, 4, 2\\) places.",
          "Add: \\(32 + 4 + 2 = 38\\).",
        ],
        answer: "\\((100110)_2 = 38_{10}\\).",
      },
      practiceSet: [
        { prompt: "Convert \\((1010)_2\\) to decimal.", answer: "\\(10\\)", method: "\\(8 + 2\\)." },
        { prompt: "Convert \\((1101)_2\\) to decimal.", answer: "\\(13\\)", method: "\\(8 + 4 + 1\\)." },
        { prompt: "Convert \\((111000)_2\\) to decimal.", answer: "\\(56\\)", method: "\\(32 + 16 + 8\\)." },
        { prompt: "Convert \\((100001)_2\\) to decimal.", answer: "\\(33\\)", method: "\\(32 + 1\\)." },
      ],
      traps: [
        {
          title: "A 0 bit contributes nothing — don't add its place value",
          body:
            "Only positions holding a 1 are summed. The fastest error is to add every place value you wrote down. Cross out the 0-bit places before adding so only the active weights remain.",
        },
      ],
    },

    // 3 — decimal → binary (PYQ: decimal 31 → binary)
    {
      kind: "formula" as const,
      slug: "bin-decimal-to-binary",
      name: "Converting Decimal to Binary",
      pyqExampleId: "f0eb1818-f218-4fab-a15c-59a90876333f",
      intuition:
        "Going the other way, you peel off powers of 2 from largest to smallest, or — more mechanically — repeatedly divide by 2 and read the remainders bottom-up. Both give the same bits; pick whichever you find faster.",
      definition:
        "Two equivalent methods to convert a decimal number to binary:\n" +
        "- **Subtract powers of 2 (greedy):** find the largest power of 2 not exceeding the number, put a 1 in that place, subtract it, and repeat with the remainder; every skipped place gets a 0.\n" +
        "- **Repeated division by 2:** divide the number by 2, record the remainder (0 or 1), divide the quotient by 2 again, and so on until the quotient is 0. **Read the remainders from bottom to top** — that is the binary number.\n" +
        "Useful checkpoints: a value of the form \\(2^n - 1\\) is \\(n\\) ones (so \\(31 = 2^5 - 1 = (11111)_2\\)), and a single power \\(2^n\\) is a 1 followed by \\(n\\) zeros.",
      formula: {
        label: "Repeated division by 2",
        latex:
          "N \\xrightarrow{\\div 2} (q_1, r_1) \\xrightarrow{\\div 2} (q_2, r_2) \\to \\cdots \\to 0;\\quad N = (\\,r_k \\ldots r_2\\, r_1)_2",
      },
      authoredExample: {
        prompt: "Convert \\(45_{10}\\) to binary by repeated division.",
        steps: [
          "\\(45 \\div 2 = 22\\) r \\(1\\); \\(22 \\div 2 = 11\\) r \\(0\\); \\(11 \\div 2 = 5\\) r \\(1\\); \\(5 \\div 2 = 2\\) r \\(1\\); \\(2 \\div 2 = 1\\) r \\(0\\); \\(1 \\div 2 = 0\\) r \\(1\\).",
          "Read the remainders from bottom to top: \\(1, 0, 1, 1, 0, 1\\).",
          "Check by place value: \\(32 + 8 + 4 + 1 = 45\\) ✓.",
        ],
        answer: "\\(45_{10} = (101101)_2\\).",
      },
      selfCheckExample: {
        prompt: "Convert \\(26_{10}\\) to binary.",
        steps: [
          "Greedy powers: largest power \\(\\le 26\\) is \\(16\\); \\(26 - 16 = 10\\). Next \\(8\\); \\(10 - 8 = 2\\). Next \\(2\\); \\(2 - 2 = 0\\).",
          "Places used: \\(16, 8, 2\\) → put 1s there, 0s elsewhere (places \\(16, 8, 4, 2, 1\\)).",
          "So bits are \\(1, 1, 0, 1, 0\\).",
        ],
        answer: "\\(26_{10} = (11010)_2\\).",
      },
      practiceSet: [
        { prompt: "Convert \\(8_{10}\\) to binary.", answer: "\\((1000)_2\\)", method: "\\(8 = 2^3\\) → 1 then three 0s." },
        { prompt: "Convert \\(15_{10}\\) to binary.", answer: "\\((1111)_2\\)", method: "\\(15 = 2^4 - 1\\) → four 1s." },
        { prompt: "Convert \\(20_{10}\\) to binary.", answer: "\\((10100)_2\\)", method: "\\(16 + 4\\)." },
        { prompt: "Convert \\(63_{10}\\) to binary.", answer: "\\((111111)_2\\)", method: "\\(63 = 2^6 - 1\\) → six 1s." },
      ],
      traps: [
        {
          title: "Read the division remainders from the BOTTOM up",
          body:
            "Repeated division produces the least significant bit first. Reading the remainders top-to-bottom reverses the number. The first remainder you write is the rightmost bit of the answer.",
        },
      ],
    },
  ],
};
