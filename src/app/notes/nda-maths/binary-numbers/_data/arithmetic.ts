import type { SubtopicNote } from "@/app/notes/_types";

export const ARITHMETIC_NOTE: SubtopicNote = {
  subtopicName: "Binary Arithmetic — Addition, Division, and Algebraic Identities",
  title: "Binary Arithmetic — Addition, Division & Algebraic Identities",
  oneLineDefinition:
    "Add, subtract and divide in base 2 — or, for almost every NDA question, convert to decimal, do the arithmetic you already know, and convert back. The same subtopic also hides a few algebra-identity questions whose only twist is that the numbers arrive in binary.",
  whyItMatters:
    "This is the chapter's largest and hardest pocket: 7 PYQs, 3 of them HARD. Two genres recur. The first is straight arithmetic — sums and divisions, often with unknown bits (p, q, r or x, y) to pin down. The second is an algebra identity (a cube-sum or difference-of-cubes relation) where recognising the structure beats grinding the numbers. Convert-first handles the arithmetic; the identity questions reward spotting x = y + z or a²+b²+c² before you compute anything.",
  concepts: [
    // 1 — addition / subtraction + unknown-digit puzzles (PYQ: sum of two binaries; tags p,q,r and x,y puzzles)
    {
      kind: "formula" as const,
      slug: "bin-addition-subtraction",
      name: "Binary Addition, Subtraction & Unknown-Digit Puzzles",
      pyqExampleId: "a6c8238a-447f-43e1-acee-359765a3468b",
      intuition:
        "You can add binary numbers bit-by-bit with carries (1 + 1 = 10, carry the 1), exactly like decimal column addition. But for NDA the safe route is almost always: convert each number to decimal, add or subtract there, then convert the result back. Unknown-bit puzzles become a small equation once everything is decimal.",
      definition:
        "**Binary addition rules** (per column, right to left): \\(0+0=0\\), \\(0+1=1\\), \\(1+1=10\\) (write 0, carry 1), \\(1+1+1=11\\) (write 1, carry 1).\n" +
        "**Convert-first method (recommended):** turn each binary into decimal, add or subtract in decimal, then convert the answer back to binary.\n" +
        "**Unknown-digit puzzles:** when bits like \\(p, q, r\\) or \\(x, y\\) are unknown, write each binary in decimal **keeping the unknowns as variables** (e.g. \\((1p101)_2 = 16 + 8p + 5\\)), form the equation the problem states, and solve — remembering every unknown bit is itself \\(0\\) or \\(1\\).",
      formula: {
        label: "Binary addition carry rule",
        latex: "1 + 1 = (10)_2,\\qquad 1 + 1 + 1 = (11)_2",
      },
      authoredExample: {
        prompt: "Find \\((10110)_2 + (1101)_2\\), giving the answer in binary.",
        steps: [
          "Convert: \\((10110)_2 = 16 + 4 + 2 = 22\\) and \\((1101)_2 = 8 + 4 + 1 = 13\\).",
          "Add in decimal: \\(22 + 13 = 35\\).",
          "Convert back: \\(35 = 32 + 2 + 1 = (100011)_2\\).",
        ],
        answer: "\\((10110)_2 + (1101)_2 = (100011)_2\\).",
      },
      selfCheckExample: {
        prompt:
          "In \\((11p1)_2 + (101)_2 = (10100)_2\\), where \\(p\\) is a binary digit, find \\(p\\).",
        steps: [
          "Convert with \\(p\\) as a variable: \\((11p1)_2 = 8 + 4 + 2p + 1 = 13 + 2p\\); \\((101)_2 = 5\\); \\((10100)_2 = 20\\).",
          "Equation: \\(13 + 2p + 5 = 20 \\Rightarrow 2p = 2\\).",
          "So \\(p = 1\\) (a valid bit).",
        ],
        answer: "\\(p = 1\\).",
      },
      practiceSet: [
        { prompt: "Find \\((101)_2 + (11)_2\\) in binary.", answer: "\\((1000)_2\\)", method: "\\(5 + 3 = 8\\)." },
        { prompt: "Find \\((1110)_2 - (101)_2\\) in binary.", answer: "\\((1001)_2\\)", method: "\\(14 - 5 = 9\\)." },
        { prompt: "Find \\((1111)_2 + (1)_2\\) in binary.", answer: "\\((10000)_2\\)", method: "\\(15 + 1 = 16 = 2^4\\)." },
        { prompt: "If \\((1x0)_2 = 6\\), what is the bit \\(x\\)?", answer: "\\(x = 1\\)", method: "\\(4 + 2x = 6 \\Rightarrow x = 1\\)." },
      ],
      traps: [
        {
          title: "Every unknown is a BIT — only 0 or 1 is allowed",
          body:
            "When you solve for \\(p, q, r, x, y\\), the value must be 0 or 1. A solution like \\(p = 2\\) is impossible in base 2 — it means you mis-set the place values. Check each unknown lands in \\(\\{0, 1\\}\\) before choosing an option.",
        },
        {
          title: "Convert the FINAL answer back to binary",
          body:
            "If the question gives the numbers in binary, the options are usually binary too. Doing the addition in decimal is fine — but don't forget the last step of converting your decimal total back to base 2.",
        },
      ],
    },

    // 2 — binary division (PYQ: 1110011 ÷ 10111; tags the 101110 ÷ 110 quotient/remainder q)
    {
      kind: "formula" as const,
      slug: "bin-division",
      name: "Binary Division — Quotient and Remainder",
      pyqExampleId: "7c2ecaea-de4a-438e-b469-c9f8f0a50aea",
      intuition:
        "Dividing one binary number by another is just ordinary integer division in disguise. Convert both to decimal, divide to get a whole-number quotient and a remainder, then convert each of those back to binary if the options ask for it.",
      definition:
        "To compute \\((A)_2 \\div (B)_2\\):\n" +
        "- Convert \\(A\\) and \\(B\\) to decimal.\n" +
        "- Do **integer division**: find the whole quotient \\(Q\\) and remainder \\(R\\) with \\(A = BQ + R\\) and \\(0 \\le R < B\\).\n" +
        "- Convert \\(Q\\) (and \\(R\\), if asked) back to binary.\n" +
        "When the division is exact the remainder is \\(0\\); otherwise the remainder is strictly less than the divisor — the same rule as decimal long division.",
      formula: {
        label: "Division identity",
        latex: "A = B\\,Q + R,\\qquad 0 \\le R < B",
      },
      authoredExample: {
        prompt:
          "Find the quotient and remainder of \\((11011)_2 \\div (100)_2\\), in binary.",
        steps: [
          "Convert: \\((11011)_2 = 16 + 8 + 2 + 1 = 27\\) and \\((100)_2 = 4\\).",
          "Integer division: \\(27 = 4 \\times 6 + 3\\), so quotient \\(= 6\\), remainder \\(= 3\\).",
          "Convert back: \\(6 = (110)_2\\), \\(3 = (11)_2\\).",
        ],
        answer: "Quotient \\((110)_2\\), remainder \\((11)_2\\).",
      },
      selfCheckExample: {
        prompt: "What is \\((100100)_2 \\div (110)_2\\)?",
        steps: [
          "Convert: \\((100100)_2 = 32 + 4 = 36\\) and \\((110)_2 = 6\\).",
          "Divide: \\(36 \\div 6 = 6\\) exactly (remainder 0).",
          "Convert back: \\(6 = (110)_2\\).",
        ],
        answer: "\\((110)_2\\) (exact, remainder 0).",
      },
      practiceSet: [
        { prompt: "Find \\((1010)_2 \\div (10)_2\\).", answer: "\\((101)_2\\)", method: "\\(10 \\div 2 = 5\\)." },
        { prompt: "Quotient and remainder of \\((1011)_2 \\div (11)_2\\)?", answer: "Quotient \\((11)_2\\), remainder \\((10)_2\\)", method: "\\(11 = 3\\times3 + 2\\)." },
        { prompt: "Find \\((110000)_2 \\div (1000)_2\\).", answer: "\\((110)_2\\)", method: "\\(48 \\div 8 = 6\\)." },
        { prompt: "Is \\((1111)_2 \\div (101)_2\\) exact?", answer: "Yes — \\(15 \\div 5 = 3 = (11)_2\\), remainder 0." },
      ],
      traps: [
        {
          title: "Quotient and remainder are usually asked in BINARY",
          body:
            "After dividing in decimal you have two numbers to convert back — both the quotient and the remainder. Reading the remainder option in decimal (e.g. picking 4 instead of \\((100)_2\\)) is the standard slip.",
        },
      ],
    },

    // 3 — algebraic identities reading values from binary (PYQ: x³+y³ HARD; tags the x³−y³−z³−3xyz q)
    {
      kind: "formula" as const,
      slug: "bin-algebraic-identities",
      name: "Algebraic Identities with Binary-Given Values",
      pyqExampleId: "0eba755b-f38e-4f3f-8459-af426331ff60",
      intuition:
        "Some of the hardest-looking questions in this chapter are really algebra: a cube-sum or difference-of-cubes identity, where the only reason it's filed under Binary is that the given numbers are written in base 2. Convert the binaries to decimal, then let a standard identity do the work instead of cubing huge numbers.",
      definition:
        "The recurring identities (after converting every binary to decimal):\n" +
        "- **Sum of cubes:** \\(x^3 + y^3 = (x+y)(x^2 - xy + y^2)\\). Given \\(x^3+y^3\\) and \\(x+y\\), you get \\(x^2 - xy + y^2\\) by dividing — and note \\((x-y)^2 + xy = x^2 - xy + y^2\\), so the same quantity answers both.\n" +
        "- **The \\(a = b + c\\) identity:** if \\(a = b + c\\) then \\(a^3 - b^3 - c^3 = 3bc\\,a\\), so \\(a^3 - b^3 - c^3 - 3abc = 0\\). Whenever three given values satisfy one equals the sum of the other two, this expression collapses to zero.\n" +
        "Spot the relationship between the converted values **before** computing — it usually removes all the heavy arithmetic.",
      formula: {
        label: "Key cube identities",
        latex:
          "x^3 + y^3 = (x+y)(x^2 - xy + y^2);\\qquad a = b + c \\ \\Rightarrow\\ a^3 - b^3 - c^3 - 3abc = 0",
      },
      authoredExample: {
        prompt:
          "Let \\(a = (1010)_2,\\ b = (110)_2,\\ c = (100)_2\\). Evaluate \\(a^3 - b^3 - c^3 - 3abc\\).",
        steps: [
          "Convert: \\(a = 10,\\ b = 6,\\ c = 4\\).",
          "Check the relationship: \\(b + c = 6 + 4 = 10 = a\\), so \\(a = b + c\\).",
          "By the identity \\(a = b + c \\Rightarrow a^3 - b^3 - c^3 = 3abc\\), so \\(a^3 - b^3 - c^3 - 3abc = 0\\).",
        ],
        answer: "\\(0\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(x + y = (1010)_2\\) and \\(xy = (10101)_2\\), find \\(x^2 + y^2\\) in decimal.",
        steps: [
          "Convert: \\(x + y = 10\\) and \\(xy = 21\\).",
          "Use \\(x^2 + y^2 = (x+y)^2 - 2xy = 10^2 - 2(21)\\).",
          "Compute: \\(100 - 42 = 58\\).",
        ],
        answer: "\\(x^2 + y^2 = 58\\).",
      },
      practiceSet: [
        { prompt: "If \\(x + y = 5\\) and \\(xy = 6\\), find \\((x - y)^2\\).", answer: "\\(1\\)", method: "\\((x-y)^2 = (x+y)^2 - 4xy = 25 - 24\\)." },
        { prompt: "If \\(a = b + c\\), what is \\(a^3 - b^3 - c^3 - 3abc\\)?", answer: "\\(0\\)", method: "\\(a = b+c \\Rightarrow a^3 - b^3 - c^3 = 3abc\\)." },
        { prompt: "Factor \\(x^3 + y^3\\).", answer: "\\((x+y)(x^2 - xy + y^2)\\)" },
        { prompt: "If \\(x^3 + y^3 = 35\\) and \\(x + y = 5\\), find \\(x^2 - xy + y^2\\).", answer: "\\(7\\)", method: "Divide: \\(35 \\div 5 = 7\\)." },
      ],
      traps: [
        {
          title: "Spot the identity before cubing anything",
          body:
            "Cubing two-digit numbers by hand is slow and error-prone. The questions are engineered so that, after converting, either \\(a = b + c\\) or a sum/difference-of-cubes factoring applies. Look for that structure first — the brute-force route is the trap.",
        },
        {
          title: "(x − y)² + xy equals x² − xy + y²",
          body:
            "Expanding, \\((x-y)^2 + xy = x^2 - 2xy + y^2 + xy = x^2 - xy + y^2\\). So a question asking for \\((x-y)^2 + xy\\) is secretly asking for the cube-sum cofactor \\(x^2 - xy + y^2\\) — recognise them as the same target.",
        },
      ],
    },
  ],
};
