import type { SubtopicNote } from "@/app/notes/_types";

export const REPRESENTATION_NUMBER_THEORY_NOTE: SubtopicNote = {
  subtopicName: "Binary Representation and Number Theory",
  title: "Binary Representation & Number Theory",
  oneLineDefinition:
    "A small grab-bag the NDA files under Binary Numbers: representing a decimal number in binary (and counting its bits), plus a couple of pure number-theory recall items — modular remainders by cycling, and the sum-of-odd-numbers perfect-square fact.",
  whyItMatters:
    "Three PYQs sit here. One is a direct decimal-to-binary representation; the other two are number-theory one-liners (a remainder-by-cycling and a perfect-square recognition) that happen to be grouped with binary in the syllabus. They reward two reflexes you can memorise: powers repeat in a short cycle modulo a number, and 1 + 3 + 5 + ... + (2n − 1) = n².",
  concepts: [
    // 1 — representing a decimal as binary / counting bits (PYQ: decimal 1011 → binary, garbled)
    {
      kind: "formula" as const,
      slug: "bin-representation-bit-count",
      name: "Representing a Number in Binary & Counting Its Bits",
      pyqExampleId: "7c0109b2-b14b-419c-b16b-765a8b16d918",
      intuition:
        "Representing a decimal number in binary is the same repeated-division skill from Subtopic 1, but here the question often cares about HOW MANY bits the answer needs — which is governed by where the number sits between consecutive powers of 2.",
      definition:
        "A decimal number \\(N \\ge 1\\) needs exactly \\(k\\) bits in binary when it lies in the range\n" +
        "\\[2^{k-1} \\le N \\le 2^k - 1.\\]\n" +
        "Equivalently, the number of bits is one more than the highest power of 2 not exceeding \\(N\\). For example \\(1011\\) lies between \\(2^9 = 512\\) and \\(2^{10} = 1024\\), so its binary form uses 10 bits; converting by repeated division gives \\(1011 = (1111110011)_2\\).\n" +
        "- A number that is exactly \\(2^k\\) is the smallest \\((k+1)\\)-bit number: a 1 followed by \\(k\\) zeros.\n" +
        "- A number that is exactly \\(2^k - 1\\) is the largest \\(k\\)-bit number: \\(k\\) ones.",
      formula: {
        label: "Bit count of N",
        latex: "2^{k-1} \\le N \\le 2^k - 1 \\ \\Longrightarrow\\ N \\text{ uses } k \\text{ bits}",
      },
      authoredExample: {
        prompt:
          "How many bits are needed to write \\(100_{10}\\) in binary, and what is that binary form?",
        steps: [
          "Locate \\(100\\) between powers of 2: \\(2^6 = 64 \\le 100 < 128 = 2^7\\), so it needs \\(7\\) bits.",
          "Convert (greedy powers): \\(100 = 64 + 32 + 4 = 2^6 + 2^5 + 2^2\\).",
          "Place 1s at positions \\(6, 5, 2\\) and 0s elsewhere: \\((1100100)_2\\).",
        ],
        answer: "\\(7\\) bits; \\(100_{10} = (1100100)_2\\).",
      },
      selfCheckExample: {
        prompt: "How many bits does \\(250_{10}\\) need in binary?",
        steps: [
          "Find the bracketing powers: \\(2^7 = 128 \\le 250 < 256 = 2^8\\).",
          "So \\(250\\) needs \\(8\\) bits.",
          "(Check: \\(250 = (11111010)_2\\), which is indeed 8 bits.)",
        ],
        answer: "\\(8\\) bits.",
      },
      practiceSet: [
        { prompt: "How many bits to write \\(31_{10}\\)?", answer: "\\(5\\) bits", method: "\\(31 = 2^5 - 1 = (11111)_2\\)." },
        { prompt: "How many bits to write \\(32_{10}\\)?", answer: "\\(6\\) bits", method: "\\(32 = 2^5 = (100000)_2\\)." },
        { prompt: "What is the largest number representable in 4 bits?", answer: "\\(15\\)", method: "\\(2^4 - 1 = 15\\)." },
        { prompt: "Convert \\(200_{10}\\) to binary.", answer: "\\((11001000)_2\\)", method: "\\(128 + 64 + 8\\)." },
      ],
      traps: [
        {
          title: "Watch the digit COUNT in the options",
          body:
            "Representation questions often offer distractors with the wrong number of bits (one too few or too many). Bracket \\(N\\) between consecutive powers of 2 first to know how many bits the correct answer must have, then convert.",
        },
      ],
    },

    // 2 — number theory: modular remainders + sum-of-odds perfect square (PYQ: 5^99 mod 13; tags sum-of-odds q)
    {
      kind: "formula" as const,
      slug: "bin-number-theory-facts",
      name: "Number-Theory One-Liners — Remainder Cycles & Sum of Odd Numbers",
      pyqExampleId: "9c06dac6-0306-40c1-a199-d64d768db126",
      intuition:
        "These two questions aren't about binary at all — they're number-theory facts the syllabus groups here. The first uses the fact that powers repeat in a short cycle when you take remainders. The second uses the clean identity that adding the first n odd numbers always gives a perfect square, n².",
      definition:
        "**Remainder by cycling:** the remainders of \\(a^1, a^2, a^3, \\ldots\\) modulo a fixed number repeat with some period \\(L\\). Find the cycle by computing remainders until they repeat, then reduce the exponent modulo \\(L\\): if the exponent leaves remainder \\(t\\) on division by \\(L\\), then \\(a^{\\text{exp}}\\) has the same remainder as \\(a^t\\).\n" +
        "**Sum of the first n odd numbers:**\n" +
        "\\[1 + 3 + 5 + \\cdots + (2n - 1) = n^2.\\]\n" +
        "So if a sum of consecutive odd numbers from 1 equals some value \\(S\\), the number of terms is \\(n = \\sqrt{S}\\) — and \\(S\\) must be a perfect square. (A neat NDA case: \\(\\sqrt{12345678987654321} = 111111111\\).)",
      formula: {
        label: "Sum of first n odd numbers",
        latex: "1 + 3 + 5 + \\cdots + (2n - 1) = n^2",
      },
      authoredExample: {
        prompt: "What is the remainder when \\(3^{100}\\) is divided by 7?",
        steps: [
          "Cycle of \\(3^n \\bmod 7\\): \\(3^1 \\equiv 3,\\ 3^2 \\equiv 2,\\ 3^3 \\equiv 6,\\ 3^4 \\equiv 4,\\ 3^5 \\equiv 5,\\ 3^6 \\equiv 1\\) — period \\(L = 6\\).",
          "Reduce the exponent: \\(100 = 6 \\times 16 + 4\\), so \\(3^{100} \\equiv 3^4 \\pmod 7\\).",
          "From the cycle, \\(3^4 \\equiv 4\\).",
        ],
        answer: "Remainder \\(4\\).",
      },
      selfCheckExample: {
        prompt:
          "How many terms of \\(1 + 3 + 5 + 7 + \\cdots\\) are needed for the sum to equal \\(441\\)?",
        steps: [
          "The sum of the first \\(n\\) odd numbers is \\(n^2\\), so set \\(n^2 = 441\\).",
          "Take the square root: \\(n = \\sqrt{441} = 21\\).",
          "So \\(21\\) terms are needed.",
        ],
        answer: "\\(21\\) terms.",
      },
      practiceSet: [
        { prompt: "Sum of the first 10 odd numbers?", answer: "\\(100\\)", method: "\\(n^2 = 10^2\\)." },
        { prompt: "\\(1 + 3 + 5 + \\cdots = 169\\): how many terms?", answer: "\\(13\\)", method: "\\(\\sqrt{169} = 13\\)." },
        { prompt: "Remainder of \\(2^{10}\\) divided by 3?", answer: "\\(1\\)", method: "\\(2^n \\bmod 3\\) cycles \\(2, 1, 2, 1, \\ldots\\); even exponent → 1." },
        { prompt: "Remainder of \\(7^{4} \\) divided by 5?", answer: "\\(1\\)", method: "\\(7 \\equiv 2\\); \\(2^4 = 16 \\equiv 1 \\pmod 5\\)." },
      ],
      traps: [
        {
          title: "Reduce the exponent by the CYCLE length, not the modulus",
          body:
            "For \\(5^{99} \\bmod 13\\), the powers cycle with period 4 (not 13). Reduce \\(99\\) modulo 4, not modulo 13. Find the actual cycle length first by listing remainders until one repeats.",
        },
        {
          title: "Sum of odd numbers is a PERFECT SQUARE",
          body:
            "If a sum of \\(1 + 3 + 5 + \\cdots\\) is given, the term count is \\(\\sqrt{\\text{sum}}\\). Recognising a value like \\(12345678987654321\\) as \\(111111111^2\\) is the intended shortcut — don't try to add the series term by term.",
        },
      ],
    },
  ],
};
