import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_PLACE_VALUE_NOTE: SubtopicNote = {
  subtopicName: "Place Value and Digit Problems",
  title: "Place Value & Digit Problems",
  oneLineDefinition:
    "Turning a number's written form into algebra — a two-digit number is 10a+b — so that reversals, cyclic shifts, repeated blocks and repunits all become identities you can quote instead of puzzles you have to solve.",
  whyItMatters:
    "Twenty-six PYQs, the second-largest block in the chapter and one of the most predictable: CDS reuses the same half-dozen identities year after year. Once you know that reversing a two-digit number changes the sum by nothing and the difference by a multiple of 9, and that XYZ plus YZX plus ZXY is always 111 times the digit sum, most of these are single-line questions.",
  concepts: [
    // C1 — foundation: the expanded form
    {
      kind: "formula" as const,
      slug: "cdsns-place-value-form",
      name: "Writing a number in expanded algebraic form",
      intuition:
        "Digits are not the number — they are coefficients of powers of ten. The instant you write a two-digit number as \\(10a+b\\), every sentence about its digits becomes an ordinary equation, and the whole family of CDS digit questions turns into simultaneous equations in two small unknowns.",
      definition:
        "Let the digits be named from the left.\n" +
        "- A **two-digit** number is \\(10a+b\\), with \\(1 \\le a \\le 9\\) and \\(0 \\le b \\le 9\\).\n" +
        "- A **three-digit** number is \\(100a+10b+c\\).\n" +
        "- The **digit sum** is \\(a+b\\) (or \\(a+b+c\\)), and the **digit product** is \\(ab\\).\n" +
        "Two constraints are always in force and are the source of most eliminations: the leading digit cannot be \\(0\\), and every digit is an integer from \\(0\\) to \\(9\\).",
      formula: {
        label: "Expanded form",
        latex: "\\overline{ab} = 10a+b, \\qquad \\overline{abc} = 100a+10b+c",
        symbols: [
          { symbol: "a", meaning: "leading digit, never 0" },
          { symbol: "b, c", meaning: "following digits, 0 to 9" },
        ],
      },
      authoredExample: {
        prompt:
          "A two-digit number is 4 times the sum of its digits. Find the number.",
        steps: [
          "Write it as \\(10a+b\\). The condition is \\(10a+b = 4(a+b)\\).",
          "Expand and collect: \\(10a+b = 4a+4b\\), so \\(6a = 3b\\), giving \\(b = 2a\\).",
          "Now apply the digit constraints: \\(b=2a \\le 9\\) forces \\(a \\le 4\\), and \\(a \\ne 0\\).",
          "So \\(a \\in \\{1,2,3,4\\}\\) giving 12, 24, 36, 48 — and all four satisfy the condition (e.g. \\(48 = 4 \\times 12\\)).",
        ],
        answer: "Four numbers work: \\(12, 24, 36, 48\\).",
      },
      selfCheckExample: {
        prompt:
          "A two-digit number exceeds 3 times its digit sum by 4. Find it.",
        steps: [
          "Set up \\(10a+b = 3(a+b)+4\\).",
          "Simplify: \\(10a+b = 3a+3b+4\\), so \\(7a = 2b+4\\).",
          "Test \\(a=1,\\dots,9\\) needing \\(2b+4 = 7a\\) with \\(b\\) a digit: \\(a=2\\) gives \\(2b=10\\), so \\(b=5\\). No other \\(a\\) keeps \\(b\\) in range.",
          "So the number is 25; check \\(3(2+5)+4 = 25\\).",
        ],
        answer: "\\(25\\).",
      },
      practiceSet: [
        { prompt: "Expanded form of a three-digit number with digits \\(p,q,r\\)?", answer: "\\(100p+10q+r\\)" },
        { prompt: "Digit sum of 407?", answer: "\\(11\\)" },
        { prompt: "Smallest value the leading digit of a 4-digit number can take?", answer: "\\(1\\)" },
        { prompt: "A two-digit number equals twice its digit sum. Find it.", answer: "\\(18\\)", method: "\\(10a+b=2(a+b)\\Rightarrow 8a=b\\)" },
      ],
      pyqExampleId: "33c302c9-a3d3-4157-9baa-31d74dc365be", // 2022 — 2-digit number is 5 times its digit sum
      traps: [
        {
          title: "The digit constraints are part of the problem, not an afterthought",
          body:
            "An equation like \\(b=2a\\) has infinitely many integer solutions and exactly four digit solutions. Most wrong answers on this concept come from solving the algebra correctly and then forgetting that \\(a \\ne 0\\) and \\(b \\le 9\\). Impose both before you count.",
        },
      ],
    },

    // C2 — two-digit reversal
    {
      kind: "formula" as const,
      slug: "cdsns-reversal-two-digit",
      name: "Reversing a two-digit number: the 11 and 9 identities",
      intuition:
        "Reverse a two-digit number and two things happen that do not depend on the digits at all: the **sum** becomes 11 times the digit sum, and the **difference** becomes 9 times the digit difference. That is why so many of these questions give you a sum and a difference — they are handing you \\(a+b\\) and \\(a-b\\) in disguise.",
      definition:
        "For \\(N = 10a+b\\) with reversal \\(N' = 10b+a\\):\n" +
        "- \\(N + N' = 11(a+b)\\) — always a multiple of 11;\n" +
        "- \\(N - N' = 9(a-b)\\) — always a multiple of 9;\n" +
        "- so \\(N=N'\\) exactly when \\(a=b\\), and the difference is 0, 9, 18, ... only.\n" +
        "Given a sum and a difference you recover the digits immediately, because you then know \\(a+b\\) and \\(a-b\\).",
      formula: {
        label: "Reversal sum and difference",
        latex: "N+N' = 11(a+b), \\qquad N-N' = 9(a-b)",
      },
      authoredExample: {
        prompt:
          "The sum of a two-digit number and its reversal is 121, and their difference is 9. Find the number.",
        steps: [
          "Sum: \\(11(a+b) = 121\\), so \\(a+b = 11\\).",
          "Difference: \\(9(a-b) = 9\\), so \\(a-b = 1\\).",
          "Add the two: \\(2a = 12\\), so \\(a = 6\\) and \\(b = 5\\).",
          "The number is 65; check \\(65+56=121\\) and \\(65-56=9\\).",
        ],
        answer: "\\(65\\).",
      },
      selfCheckExample: {
        prompt:
          "When the digits of a two-digit number are reversed, the number increases by 36. If the digit sum is 10, find the original number.",
        steps: [
          "An **increase** on reversal means \\(N' - N = 36\\), so \\(9(b-a) = 36\\) and \\(b-a = 4\\).",
          "With \\(a+b = 10\\), adding gives \\(2b = 14\\), so \\(b = 7\\) and \\(a = 3\\).",
          "The original number is 37; check \\(73 - 37 = 36\\).",
        ],
        answer: "\\(37\\).",
      },
      practiceSet: [
        { prompt: "Sum of 47 and its reversal?", answer: "\\(121\\)", method: "\\(11 \\times 11\\)" },
        { prompt: "Can the difference of a two-digit number and its reversal be 15?", answer: "No", method: "It must be a multiple of 9" },
        { prompt: "\\(N-N'=27\\). Find \\(a-b\\).", answer: "\\(3\\)" },
        { prompt: "A two-digit number equals its reversal. What must be true?", answer: "Its digits are equal" },
      ],
      pyqExampleId: "2d30b70f-5173-4909-b702-f9635ba8d546", // 2020 — digit sum 13, difference 27, find digit product
      traps: [
        {
          title: "Decide which way the difference runs before using it",
          body:
            "\\(9(a-b)\\) is positive when the leading digit is larger. If the question says the number **increases** on reversal, the quantity you know is \\(9(b-a)\\), and getting the sign backwards produces the reversal of the intended answer — which is usually also in the option list.",
        },
        {
          title: "A difference that is not a multiple of 9 means no such number exists",
          body:
            "Since \\(N-N'=9(a-b)\\) always, a question offering a difference of 20 or 15 has no solution. Occasionally CDS uses this as the point of the question, so treat it as information rather than a misprint.",
        },
      ],
    },

    // C3 — three-digit reversal
    {
      kind: "formula" as const,
      slug: "cdsns-reversal-three-digit",
      name: "Reversing a three-digit number and swapping just two digits",
      intuition:
        "With three digits, reversing leaves the middle digit alone — it sits in the tens place both times and cancels. So the difference depends only on the two **outer** digits, and it is always a multiple of 99. Swapping a different pair gives a different multiplier, so read carefully which two digits moved.",
      definition:
        "For \\(N = 100X+10Y+Z\\):\n" +
        "- full reversal: \\(N - \\overline{ZYX} = 99(X-Z)\\), so the difference is a multiple of 99 and the middle digit is irrelevant;\n" +
        "- swapping the **first two** digits: \\(N - \\overline{YXZ} = 90(X-Y)\\);\n" +
        "- swapping the **last two** digits: \\(N - \\overline{XZY} = 9(Y-Z)\\).\n" +
        "Every multiple of 99 below 1000 — namely 99, 198, ..., 891 — has middle digit \\(9\\) and outer digits summing to \\(9\\), which is a fact CDS has used directly.",
      formula: {
        label: "Three-digit reversal difference",
        latex: "\\overline{XYZ} - \\overline{ZYX} = 99\\,(X-Z)",
      },
      authoredExample: {
        prompt:
          "A three-digit number exceeds its reversal by 297. What is the difference between its hundreds and units digits?",
        steps: [
          "The identity gives \\(99(X-Z) = 297\\).",
          "So \\(X-Z = 3\\).",
          "Notice the middle digit never entered — it cannot be determined, and the question does not ask for it.",
        ],
        answer: "\\(X - Z = 3\\).",
      },
      selfCheckExample: {
        prompt:
          "For a three-digit number \\(\\overline{XYZ}\\) with distinct non-zero digits, the difference \\(\\overline{XYZ} - \\overline{XZY}\\) is 27. Find \\(Y - Z\\).",
        steps: [
          "Here the swap is of the **last two** digits, so the identity to use is \\(9(Y-Z)\\), not the 99 one.",
          "Set \\(9(Y-Z) = 27\\), giving \\(Y-Z = 3\\).",
          "Check with an example: \\(X=1, Y=5, Z=2\\) gives \\(152 - 125 = 27\\).",
        ],
        answer: "\\(Y - Z = 3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\overline{XYZ}-\\overline{ZYX}=495\\). Find \\(X-Z\\).", answer: "\\(5\\)" },
        { prompt: "Remainder when \\(\\overline{XYZ}-\\overline{ZYX}\\) is divided by 99?", answer: "\\(0\\)" },
        { prompt: "Middle digit of every three-digit multiple of 99?", answer: "\\(9\\)" },
        { prompt: "\\(\\overline{XYZ}-\\overline{YXZ}=180\\). Find \\(X-Y\\).", answer: "\\(2\\)", method: "Multiplier is 90" },
      ],
      pyqExampleId: "bf67e831-db65-4af2-9dea-02dc039e23eb", // 2025 — remainder when D = XYZ - ZYX is divided by 99
      traps: [
        {
          title: "99, 90 and 9 are three different swaps",
          body:
            "Only the **full reversal** gives 99. Swapping the first two digits gives 90 and swapping the last two gives 9. Students who memorise \"the answer is a multiple of 99\" get the 90-case wrong every time, and CDS sets both.",
        },
      ],
    },

    // C4 — cyclic sum
    {
      kind: "formula" as const,
      slug: "cdsns-cyclic-sum-111",
      name: "The cyclic sum of a three-digit number is 111 times its digit sum",
      intuition:
        "Take a three-digit number and add the two numbers you get by cycling its digits round. Every digit visits the hundreds, tens and units place exactly once, so each contributes \\(100+10+1 = 111\\) times itself. The total is 111 times the digit sum — and \\(111 = 3 \\times 37\\), which is where the divisors come from.",
      definition:
        "For \\(\\overline{XYZ} + \\overline{YZX} + \\overline{ZXY}\\):\n" +
        "\\[S = 111\\,(X+Y+Z) = 3 \\times 37 \\times (X+Y+Z).\\]\n" +
        "Consequently \\(S\\) is **always** divisible by 3, by 37, by 111 and by the digit sum \\(X+Y+Z\\) itself.\n" +
        "It is divisible by 9 only when \\(3 \\mid (X+Y+Z)\\), which is the usual planted false statement.",
      formula: {
        label: "Cyclic sum identity",
        latex: "\\overline{XYZ} + \\overline{YZX} + \\overline{ZXY} = 111\\,(X+Y+Z)",
      },
      authoredExample: {
        prompt:
          "For the number 247, compute \\(247 + 472 + 724\\) using the identity, and name three divisors of the result that hold for any starting number.",
        steps: [
          "The digit sum is \\(2+4+7 = 13\\).",
          "By the identity the total is \\(111 \\times 13 = 1443\\). (Direct check: \\(247+472+724 = 1443\\).)",
          "Since \\(111 = 3 \\times 37\\), the result is always divisible by 3, by 37 and by 111 — and here also by the digit sum 13.",
        ],
        answer:
          "\\(1443\\), always divisible by \\(3\\), \\(37\\) and \\(111\\).",
      },
      selfCheckExample: {
        prompt:
          "Is the cyclic sum \\(\\overline{XYZ}+\\overline{YZX}+\\overline{ZXY}\\) always divisible by 9?",
        steps: [
          "The sum is \\(111(X+Y+Z)\\), and \\(111 = 3 \\times 37\\) contributes only one factor of 3.",
          "So 9 divides the sum only if \\(3 \\mid (X+Y+Z)\\).",
          "Counterexample: take 100, whose digit sum is 1. The cyclic sum is \\(100+1+10 = 111\\), and \\(111\\) is not a multiple of 9.",
        ],
        answer: "No — only when the digit sum is itself a multiple of 3.",
      },
      practiceSet: [
        { prompt: "Cyclic sum for digits summing to 12?", answer: "\\(1332\\)", method: "\\(111\\times 12\\)" },
        { prompt: "Factorise 111.", answer: "\\(3\\times 37\\)" },
        { prompt: "Is the cyclic sum always divisible by 37?", answer: "Yes" },
        { prompt: "Is the cyclic sum always divisible by \\(X+Y+Z\\)?", answer: "Yes" },
      ],
      pyqExampleId: "6aa9ebdb-b127-4230-84b2-50c38654c7e0", // 2020 — statements about S = XYZ + YZX + ZXY
      traps: [
        {
          title: "Divisible by 3 does not upgrade to divisible by 9",
          body:
            "\\(111\\) carries exactly one 3. The statement \"\\(S\\) is always divisible by 9\" is the standard planted falsehood in this question, and \\(100\\) (giving \\(S=111\\)) is the one-line counterexample. Keep 37 in mind too — it is the divisor students never think to check, and it is always there.",
        },
      ],
    },

    // C5 — repeated blocks
    {
      kind: "formula" as const,
      slug: "cdsns-repeated-block-numbers",
      name: "Numbers built by repeating a block of digits",
      intuition:
        "A number like 372372 is not a random six-digit number — it is \\(372 \\times 1001\\). Repeating a block is the same as multiplying by a fixed constant, and that constant factorises once and for all. So every number of that shape shares a guaranteed set of divisors.",
      definition:
        "Repeating a block is multiplication by a **repunit-style constant**:\n" +
        "- \\(\\overline{XYXYXY} = \\overline{XY} \\times 10101\\), and \\(10101 = 3 \\times 7 \\times 13 \\times 37\\);\n" +
        "- \\(\\overline{abcabc} = \\overline{abc} \\times 1001\\), and \\(1001 = 7 \\times 11 \\times 13\\);\n" +
        "- \\(\\overline{abab} = \\overline{ab} \\times 101\\), and \\(101\\) is prime.\n" +
        "For a block that is repeated but not cleanly — \\(\\overline{XXYXX} = 11011X + 100Y\\), where \\(11011 = 7 \\times 11^2 \\times 13\\) — expand rather than guess, then use divisibility on the pieces.",
      formula: {
        label: "Repeated-block constants",
        latex: "\\overline{abcabc} = \\overline{abc}\\times 1001, \\qquad \\overline{XYXYXY} = \\overline{XY}\\times 10101",
      },
      authoredExample: {
        prompt:
          "Show that every number of the form \\(\\overline{abcabc}\\) is divisible by 7, 11 and 13.",
        steps: [
          "Split by place value: \\(\\overline{abcabc} = 1000 \\times \\overline{abc} + \\overline{abc} = \\overline{abc}\\,(1000+1)\\).",
          "So \\(\\overline{abcabc} = \\overline{abc} \\times 1001\\).",
          "Factorise the constant: \\(1001 = 7 \\times 11 \\times 13\\).",
          "Hence all three primes divide the number regardless of \\(a, b, c\\). Check 258258: \\(258258 = 258 \\times 1001\\).",
        ],
        answer: "Because \\(\\overline{abcabc} = \\overline{abc}\\times 7 \\times 11 \\times 13\\).",
      },
      selfCheckExample: {
        prompt:
          "How many five-digit numbers of the form \\(\\overline{XYXYX}\\) are divisible by 11?",
        steps: [
          "Expand: \\(\\overline{XYXYX} = 10101X + 1010Y\\).",
          "Modulo 11: \\(10101 = 11 \\times 918 + 3\\), so \\(10101 \\equiv 3\\); and \\(1010 = 11 \\times 91 + 9\\), so \\(1010 \\equiv 9\\).",
          "We need \\(3X + 9Y \\equiv 0 \\pmod{11}\\), i.e. \\(3(X+3Y) \\equiv 0\\). Since \\(\\gcd(3,11)=1\\) this is \\(X+3Y \\equiv 0 \\pmod{11}\\).",
          "With \\(1 \\le X \\le 9\\) and \\(0 \\le Y \\le 9\\), \\(X+3Y\\) runs from 1 to 36, so the multiples of 11 in reach are \\(11\\), \\(22\\) and \\(33\\) — all three, and forgetting the last one is the easy slip.",
          "\\(X+3Y=11\\): \\((8,1), (5,2), (2,3)\\). \\(X+3Y=22\\): \\((7,5), (4,6), (1,7)\\). \\(X+3Y=33\\): \\((9,8), (6,9)\\).",
          "That is \\(3+3+2 = 8\\) numbers. Spot-check the two from the highest case: \\(98989 = 11 \\times 8999\\) and \\(69696 = 11 \\times 6336\\).",
        ],
        answer:
          "Eight: 81818, 52525, 23232, 75757, 46464, 17171, 98989, 69696.",
      },
      practiceSet: [
        { prompt: "Factorise 1001.", answer: "\\(7\\times 11\\times 13\\)" },
        { prompt: "Factorise 10101.", answer: "\\(3\\times 7\\times 13\\times 37\\)" },
        { prompt: "Is 456456 divisible by 13?", answer: "Yes", method: "\\(456\\times1001\\)" },
        { prompt: "\\(\\overline{abab}\\) equals \\(\\overline{ab}\\) times what?", answer: "\\(101\\)" },
      ],
      pyqExampleId: "8dfb21d6-86dc-47f6-ad2f-50940436f467", // 2023 — XYXYXY divisible by which
      traps: [
        {
          title: "1001 and 10101 factorise differently",
          body:
            "A repeated three-digit block gives \\(1001 = 7\\times11\\times13\\) — which contains 11. A repeated two-digit block over six digits gives \\(10101 = 3\\times7\\times13\\times37\\) — which does **not** contain 11 but does contain 3 and 37. Reaching for the wrong constant is the whole failure mode here; count the block length first.",
        },
      ],
    },

    // C6 — repunits
    {
      kind: "formula" as const,
      slug: "cdsns-repunits",
      name: "Strings of repeated ones and nines",
      intuition:
        "A run of \\(n\\) nines is exactly \\(10^n - 1\\), and a run of \\(n\\) ones is that divided by 9. Once you can convert a digit string into a closed form, enormous-looking numbers become ordinary algebra — a 20-digit monster becomes a single fraction you can square.",
      definition:
        "Write \\(R_n\\) for the **repunit** with \\(n\\) ones:\n" +
        "\\[\\underbrace{99\\cdots9}_{n} = 10^n - 1, \\qquad R_n = \\underbrace{11\\cdots1}_{n} = \\frac{10^n-1}{9}.\\]\n" +
        "- A string of \\(n\\) copies of the digit \\(d\\) is \\(d \\times R_n\\).\n" +
        "- The **digit sum** of \\(10^n-1\\) is \\(9n\\), because it is \\(n\\) nines.\n" +
        "- \\(R_{2n} = R_n \\times (10^n+1)\\), which is the identity behind the \\(x-y^2\\) question.",
      formula: {
        label: "Repunit closed form",
        latex: "R_n = \\underbrace{11\\cdots1}_{n\\text{ ones}} = \\frac{10^{n}-1}{9}",
      },
      authoredExample: {
        prompt:
          "Let \\(x\\) be the number written with 12 ones and \\(y\\) the number written with 6 ones. Show that \\(x - y^2\\) is a multiple of \\(y\\), and find \\(\\dfrac{x-y^2}{y}\\).",
        steps: [
          "In closed form \\(x = \\dfrac{10^{12}-1}{9}\\) and \\(y = \\dfrac{10^{6}-1}{9}\\).",
          "Then \\(y^2 = \\dfrac{(10^6-1)^2}{81} = \\dfrac{10^{12} - 2\\cdot 10^6 + 1}{81}\\).",
          "So \\(x - y^2 = \\dfrac{9(10^{12}-1) - (10^{12}-2\\cdot10^6+1)}{81} = \\dfrac{8\\cdot 10^{12} + 2\\cdot 10^{6} - 10}{81}\\).",
          "Factor \\(10^6-1\\) out of the numerator: \\(8\\cdot10^{12}+2\\cdot10^6-10 = (10^6-1)(8\\cdot 10^6 + 10)\\), so \\(x-y^2 = y \\cdot \\dfrac{8\\cdot10^6+10}{9}\\).",
          "That last factor is \\(\\dfrac{80000010}{9} = 8888890\\), an integer, confirming divisibility.",
        ],
        answer: "\\(\\dfrac{x-y^2}{y} = 8888890\\).",
      },
      selfCheckExample: {
        prompt:
          "The digit sum of \\(10^n - 1\\) is 189. Find \\(n\\).",
        steps: [
          "\\(10^n-1\\) is a string of \\(n\\) nines, so its digit sum is \\(9n\\).",
          "Set \\(9n = 189\\), so \\(n = 21\\).",
          "Check the shape: \\(10^3-1 = 999\\) has digit sum 27 \\(= 9\\times 3\\).",
        ],
        answer: "\\(n = 21\\).",
      },
      practiceSet: [
        { prompt: "\\(10^5-1\\) in digits?", answer: "\\(99999\\)" },
        { prompt: "Digit sum of \\(10^{40}-1\\)?", answer: "\\(360\\)", method: "\\(9n\\)" },
        { prompt: "\\(R_4\\) as a number?", answer: "\\(1111\\)" },
        { prompt: "A string of six 4s equals \\(4\\times\\) what?", answer: "\\(R_6 = 111111\\)" },
      ],
      pyqExampleId: "83da8885-8921-4f51-900d-4582811b34d4", // 2020 — digit sum of 10^n - 1 is 3798
      traps: [
        {
          title: "A repunit is not a power of ten",
          body:
            "\\(R_n = \\frac{10^n-1}{9}\\), not \\(10^n\\) and not \\(10^{n-1}\\). The number of ones is \\(n\\), and the number of **digits** of \\(10^n-1\\) is also \\(n\\) — but \\(10^n\\) itself has \\(n+1\\) digits. Off-by-one here silently changes the answer on every question of this type.",
        },
      ],
    },

    // C7 — last k digits
    {
      kind: "formula" as const,
      slug: "cdsns-last-k-digits",
      name: "Only the last few digits decide the last few digits",
      intuition:
        "If you only want the last three digits of a huge product, you can throw away everything above the hundreds place in each factor. Higher places contribute multiples of 1000, which cannot reach the last three digits. This turns a ten-digit multiplication into a three-digit one.",
      definition:
        "Working **modulo \\(10^k\\)** keeps exactly the last \\(k\\) digits, and modular arithmetic respects addition and multiplication. So:\n" +
        "- to get the last \\(k\\) digits of a product, reduce each factor mod \\(10^k\\) first, multiply, then reduce again;\n" +
        "- the same holds for sums and for powers.\n" +
        "A useful special case: for \\(n \\ge 3\\), powers of 5 settle into a pattern on their last three digits (\\(5^4 = 625\\), and every even power from the fourth onwards ends in \\(625\\)), which is why the hundreds digit of \\(25^{10}\\) can be read off without computing the number.",
      formula: {
        label: "Last k digits",
        latex: "\\text{last } k \\text{ digits of } AB \\;=\\; (A \\bmod 10^{k})(B \\bmod 10^{k}) \\bmod 10^{k}",
      },
      authoredExample: {
        prompt:
          "What are the last three digits of \\(87654321 \\times 12345678\\)?",
        steps: [
          "Keep only the last three digits of each factor: \\(321\\) and \\(678\\).",
          "Multiply: \\(321 \\times 678 = 217638\\).",
          "Reduce mod 1000: the last three digits are \\(638\\).",
          "Why discarding is safe: every dropped part is a multiple of 1000, and a multiple of 1000 times anything is still a multiple of 1000.",
        ],
        answer: "\\(638\\).",
      },
      selfCheckExample: {
        prompt: "What is the digit in the tens place of \\(5^{12}\\)?",
        steps: [
          "Look at the tail of small powers: \\(5^3=125\\), \\(5^4=625\\), \\(5^5=3125\\), \\(5^6=15625\\).",
          "From \\(5^3\\) on, the last three digits alternate between \\(125\\) (odd exponent) and \\(625\\) (even exponent).",
          "Since 12 is even, \\(5^{12}\\) ends in \\(625\\).",
          "The tens digit of \\(625\\) is \\(2\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Last two digits of \\(43\\times 57\\)?", answer: "\\(51\\)", method: "\\(2451\\)" },
        { prompt: "Last three digits of \\(1000000 + 456\\)?", answer: "\\(456\\)" },
        { prompt: "Last three digits of \\(5^{9}\\)?", answer: "\\(125\\)", method: "Odd exponent from \\(5^3\\) on" },
        { prompt: "Which modulus keeps the last 4 digits?", answer: "\\(10^4\\)" },
      ],
      pyqExampleId: "85683a48-6576-4821-b853-48ab389cde8d", // 2024 — last three digits of a big product
      traps: [
        {
          title: "Keep as many digits as the question asks for, and no fewer",
          body:
            "For the last three digits you must keep three digits of each factor. Keeping two and multiplying gives the last two digits correctly but the hundreds digit wrongly, because a carry from the dropped place can reach it. Match \\(k\\) to the question exactly.",
        },
        {
          title: "Hundreds place is not the hundredth digit",
          body:
            "CDS has printed a question asking for \"the digit at the 100th place\" of a number with only 95 digits. Read whether the paper means a **place value** (hundreds) or a **position counted from one end**; if the position does not exist, the intended reading is the place value.",
        },
      ],
    },

    // C8 — digit puzzles
    {
      kind: "formula" as const,
      slug: "cdsns-digit-equation-puzzles",
      name: "Solving equations whose unknowns are single digits",
      intuition:
        "When a sum or product is printed with letters standing for digits, expand everything into place-value form. The letters almost always collect into one neat linear combination, and the digit bounds then leave only a handful of possibilities to test.",
      definition:
        "Procedure:\n" +
        "- Expand every numeral into place-value form so the unknown digits appear as ordinary variables.\n" +
        "- Collect terms. A column sum usually produces something like \\(10(P+Q+R) + \\text{constant}\\).\n" +
        "- Apply the digit bounds \\(0 \\le \\text{digit} \\le 9\\) and any leading-digit restriction, then test the survivors.\n" +
        "For a product with a near-round multiplier, use the **complement trick**: \\(999 \\times n = 1000n - n\\), which makes the tail of the product easy to control.",
      formula: {
        label: "Complement trick for near-round multipliers",
        latex: "999 \\times n = 1000n - n, \\qquad 99 \\times n = 100n - n",
      },
      authoredExample: {
        prompt:
          "In \\(4P6 + 2Q8 = 774\\), where \\(P\\) and \\(Q\\) are digits, what is the largest possible value of \\(Q\\)?",
        steps: [
          "Expand: \\(4P6 = 400 + 10P + 6\\) and \\(2Q8 = 200 + 10Q + 8\\).",
          "Add: \\(614 + 10(P+Q) = 774\\), so \\(10(P+Q) = 160\\) and \\(P+Q = 16\\).",
          "To maximise \\(Q\\) take \\(P\\) as small as the digit bounds allow. \\(Q \\le 9\\) forces \\(P \\ge 7\\), so the largest \\(Q\\) is 9 with \\(P = 7\\).",
          "Check: \\(476 + 298 = 774\\).",
        ],
        answer: "\\(Q = 9\\).",
      },
      selfCheckExample: {
        prompt:
          "In decimal notation \\(99 \\times \\overline{ab} = \\overline{cd01}\\) is impossible. Explain why, using the complement trick.",
        steps: [
          "By the trick, \\(99 \\times \\overline{ab} = 100\\,\\overline{ab} - \\overline{ab}\\).",
          "Work modulo 100: \\(100\\,\\overline{ab} \\equiv 0\\), so the product is \\(\\equiv -\\overline{ab} \\pmod{100}\\).",
          "Ending in 01 means \\(-\\overline{ab} \\equiv 1\\), i.e. \\(\\overline{ab} \\equiv -1 \\equiv 99 \\pmod{100}\\).",
          "The only two-digit number satisfying that is \\(\\overline{ab}=99\\), and \\(99\\times 99 = 9801\\) does end in 01. So it is possible after all, and only for 99.",
        ],
        answer:
          "It is possible, but only for \\(\\overline{ab}=99\\): \\(99 \\times 99 = 9801\\).",
      },
      practiceSet: [
        { prompt: "\\(999\\times 7\\) using the trick?", answer: "\\(6993\\)", method: "\\(7000-7\\)" },
        { prompt: "\\(3P1 + 1Q9 = 540\\). Find \\(P+Q\\).", answer: "\\(13\\)", method: "\\(410+10(P+Q)=540\\)" },
        { prompt: "Largest digit value possible for any letter?", answer: "\\(9\\)" },
        { prompt: "\\(99\\times 46\\)?", answer: "\\(4554\\)", method: "\\(4600-46\\)" },
      ],
      pyqExampleId: "d84caa11-43e4-4b39-89ba-ff34929d098b", // 2016 — max value of Q in 5P9+3R7+2Q8=1114
      traps: [
        {
          title: "Maximising one digit means minimising the others, within bounds",
          body:
            "Once you reach something like \\(P+R+Q = 9\\), the largest \\(Q\\) needs the other letters as small as **their own** constraints permit — which is 0 for an interior digit but 1 for a leading digit. Assuming 0 everywhere is the standard slip and inflates the answer by one.",
        },
      ],
    },
  ],
  related: [
    { label: "Division, parity and consecutive integers", href: "/notes/cds-maths/number-system/cds-ns-foundations" },
    { label: "Divisibility rules and missing digits", href: "/notes/cds-maths/number-system/cds-ns-divisibility-rules" },
  ],
};
