import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_FOUNDATIONS_NOTE: SubtopicNote = {
  subtopicName: "Division, Parity and Consecutive Integers",
  title: "Division, Parity & Consecutive Integers",
  oneLineDefinition:
    "The four primitives the whole chapter rests on: the division algorithm, odd-even bookkeeping, the fact that an odd square always leaves remainder 1 on division by 8, and the divisibility that a run of consecutive integers hands you for free.",
  whyItMatters:
    "Seventeen PYQs, four of them HARD — but the real weight of this page is indirect. The odd-square fact turns up in five questions spread across the chapter, the consecutive-integer rule silently solves a dozen more, and a quarter of every CDS Maths paper is written in one of three statement formats that you can learn to attack mechanically. Read this page as the toolkit you carry into the other eleven.",
  concepts: [
    // C1 — foundation: the division algorithm
    {
      kind: "formula" as const,
      slug: "cdsns-division-algorithm",
      name: "The division algorithm",
      intuition:
        "Dividing one whole number by another always produces exactly two things: a **quotient** and a **remainder**, and the remainder is always strictly smaller than the divisor. That last clause is the one that earns marks — a remainder on division by 8 can be 0 through 7 and nothing else, so an option offering 9 is dead on sight.",
      definition:
        "For integers \\(N\\) and \\(d>0\\) there are unique integers \\(q\\) and \\(r\\) with\n" +
        "- \\(N = dq + r\\), and\n" +
        "- \\(0 \\le r < d\\).\n" +
        "Here \\(d\\) is the **divisor**, \\(q\\) the **quotient** and \\(r\\) the **remainder**. Uniqueness matters: there is only one such pair, so any consistent story about a division pins the number down completely.",
      formula: {
        label: "Division algorithm",
        latex: "N = d\\,q + r, \\qquad 0 \\le r < d",
        symbols: [
          { symbol: "N", meaning: "the number being divided (the dividend)" },
          { symbol: "d", meaning: "the divisor" },
          { symbol: "q", meaning: "the quotient" },
          { symbol: "r", meaning: "the remainder, strictly less than d" },
        ],
      },
      authoredExample: {
        prompt:
          "A number leaves quotient 23 and remainder 5 when divided by 12. What is the number, and what remainder does it leave on division by 5?",
        steps: [
          "Apply \\(N = dq + r\\) directly: \\(N = 12 \\times 23 + 5 = 276 + 5 = 281\\).",
          "Check the remainder is legal: \\(5 < 12\\), so it is.",
          "Now divide by 5: \\(281 = 5 \\times 56 + 1\\).",
        ],
        answer: "\\(N = 281\\), and it leaves remainder \\(1\\) on division by 5.",
      },
      selfCheckExample: {
        prompt:
          "When \\(N\\) is divided by 9 the quotient is 40. The remainder is one less than the quotient divided by 5. Find \\(N\\).",
        steps: [
          "The quotient is 40, so the remainder is \\(\\frac{40}{5} - 1 = 8 - 1 = 7\\).",
          "Check legality: \\(7 < 9\\), so this is a valid remainder.",
          "Then \\(N = 9 \\times 40 + 7 = 360 + 7 = 367\\).",
        ],
        answer: "\\(N = 367\\).",
      },
      practiceSet: [
        { prompt: "Divisor 7, quotient 13, remainder 4. Find the number.", answer: "\\(95\\)", method: "\\(7\\times13+4\\)" },
        { prompt: "Can a remainder on division by 6 be 6?", answer: "No", method: "\\(r<d\\) always, so \\(r\\le 5\\)" },
        { prompt: "What is the largest possible remainder on division by 15?", answer: "\\(14\\)" },
        { prompt: "\\(N=4q+3\\) and \\(q=25\\). Find \\(N\\).", answer: "\\(103\\)" },
      ],
      pyqExampleId: "de087bc6-e32e-4c35-a5e7-2d07f2175cfd", // 2019 — quotient 182, quotient minus remainder = 175
      traps: [
        {
          title: "A remainder can never equal or exceed the divisor",
          body:
            "Every year an option list on a remainder question includes a value at least as big as the divisor — 9 as a remainder on division by 9, say. It is free elimination. Cross those options out before you compute anything, because \\(0 \\le r < d\\) is part of the definition, not a rule of thumb.",
        },
      ],
    },

    // C2 — reference: parity bookkeeping
    {
      kind: "reference" as const,
      slug: "cdsns-parity-rules",
      name: "Parity bookkeeping for sums and products",
      intuition:
        "Odd and even behave like a two-element arithmetic of their own, and it is almost always faster to track parity than to track the numbers. A sum is odd only when an **odd number of its terms are odd**; a product is even the moment **one single factor** is even.",
      definition:
        "Write every integer as even (\\(2k\\)) or odd (\\(2k+1\\)). Then parity alone decides the parity of any sum, difference or product, whatever the actual values.\n" +
        "- The parity of a **sum** depends on how many odd terms there are, not on their size.\n" +
        "- A **product** is odd only when every factor is odd.\n" +
        "- **Subtraction behaves exactly like addition** for parity, since \\(-1\\) and \\(+1\\) are both odd.",
      table: {
        columns: ["Expression", "Result", "Why"],
        rows: [
          { cells: ["odd + odd", "even", "\\((2a+1)+(2b+1)=2(a+b+1)\\)"] },
          { cells: ["odd + even", "odd", "one unpaired unit is left over"] },
          { cells: ["even + even", "even", "both are multiples of 2"] },
          { cells: ["odd − odd", "even", "same as odd + odd for parity"] },
          { cells: ["odd × odd", "odd", "no factor of 2 anywhere"] },
          { cells: ["odd × even", "even", "one factor of 2 is enough"] },
          { cells: ["even × even", "even", "at least two factors of 2"] },
          {
            cells: ["n(n+1)", "always even", "consecutive integers, so one of them is even"],
            noteAmber:
              "This row does the most work in the chapter. Any expression of the form \\(q^2+q\\) is even without exception, which is what collapses several CDS parity questions to a single line.",
          },
          { cells: ["2k ± any even", "even", "evens are closed under addition"] },
        ],
        caption:
          "Track parity, not values. Nine rows that settle most of what CDS asks about odd and even.",
      },
      selfCheckExample: {
        prompt:
          "Is \\(p^2 + q^2 + q\\) odd or even when \\(p\\) is even and \\(q\\) is odd? And when \\(p\\) is odd?",
        steps: [
          "Group the \\(q\\) terms: \\(q^2+q = q(q+1)\\), a product of consecutive integers, so it is **even** whatever \\(q\\) is.",
          "The expression is therefore \\(p^2 + (\\text{even})\\), whose parity is just the parity of \\(p^2\\).",
          "\\(p^2\\) has the same parity as \\(p\\). So with \\(p\\) even the total is even; with \\(p\\) odd the total is odd.",
          "Note what dropped out: the value of \\(q\\) is irrelevant.",
        ],
        answer:
          "Even when \\(p\\) is even, odd when \\(p\\) is odd — and \\(q\\) never matters.",
      },
      practiceSet: [
        { prompt: "Parity of the sum of five odd numbers?", answer: "Odd", method: "An odd count of odd terms" },
        { prompt: "Parity of \\(n(n+1)(n+2)\\)?", answer: "Even", method: "It contains consecutive integers" },
        { prompt: "If \\(ab\\) is odd, what can you say about \\(a\\) and \\(b\\)?", answer: "Both are odd" },
        { prompt: "Parity of \\(7^{11} + 3^{5}\\)?", answer: "Even", method: "odd + odd" },
      ],
      pyqExampleId: "c3d7b6c4-9256-4688-85ff-98ee039b47ee", // 2023 — DS: is p^2+q^2+q odd?
      traps: [
        {
          title: "An even product does not mean both factors are even",
          body:
            "\\(2 \\times 3 = 6\\) is even although 3 is odd. One even factor is enough. The correct statement is the contrapositive: if a product is **odd** then every factor is odd — and that direction is the one CDS actually uses to force a prime to be 2.",
        },
        {
          title: "A statement about parity often says nothing about the variable you want",
          body:
            "In the data-sufficiency format, \"\\(2p+q\\) is odd\" tells you only that \\(q\\) is odd, because \\(2p\\) is even whatever \\(p\\) is. If the question turns on \\(p\\), that statement is useless — and so is the one that looks different but carries the same single fact. Two statements saying the same thing are jointly insufficient too.",
        },
      ],
    },

    // C3 — the odd-square fact
    {
      kind: "formula" as const,
      slug: "cdsns-odd-square-mod-8",
      name: "The square of an odd number leaves remainder 1 on division by 8",
      intuition:
        "Square any odd number — 9, 25, 49, 81, 121 — and subtract 1: you get 8, 24, 48, 80, 120, every one a multiple of 8. This is not a coincidence and it is worth memorising, because it is the single most reused fact in this chapter.",
      definition:
        "For every odd integer \\(m\\), \\(m^2 \\equiv 1 \\pmod 8\\); equivalently \\(m^2\\) has the form \\(8n+1\\).\n" +
        "The one-line proof is the consecutive-integer rule in disguise: writing \\(m=2k+1\\),\n" +
        "\\[m^2 = 4k^2+4k+1 = 4k(k+1)+1,\\]\n" +
        "and \\(k(k+1)\\) is a product of consecutive integers, hence even. So \\(4k(k+1)\\) is a multiple of 8.\n" +
        "- Every **even** power of an odd number also leaves remainder 1, since \\(m^{2t}=(m^2)^t \\equiv 1^t = 1\\).\n" +
        "- The difference of the squares of two odd numbers is therefore a multiple of 8.",
      formula: {
        label: "Odd square modulo 8",
        latex: "m \\text{ odd} \\;\\Longrightarrow\\; m^2 = 8n+1 \\quad\\text{i.e.}\\quad m^2 \\equiv 1 \\pmod 8",
      },
      authoredExample: {
        prompt:
          "Show that the difference of the squares of any two odd integers is divisible by 8, and find the remainder when \\(37^2 - 15^2\\) is divided by 8.",
        steps: [
          "Both 37 and 15 are odd, so by the rule each square is of the form \\(8n+1\\).",
          "Subtracting, \\((8n_1+1)-(8n_2+1) = 8(n_1-n_2)\\), a multiple of 8. So the difference is always divisible by 8.",
          "Sanity-check with the numbers: \\(37^2-15^2 = 1369-225 = 1144\\), and \\(1144 = 8 \\times 143\\) exactly.",
        ],
        answer: "The difference is always a multiple of 8, so the remainder is \\(0\\).",
      },
      selfCheckExample: {
        prompt:
          "For odd integers \\(x\\) and \\(y\\), is \\(x^2+y^2\\) ever divisible by 4?",
        steps: [
          "Each square is \\(8n+1\\), so the sum is \\(8(n_1+n_2)+2\\).",
          "That is \\(\\equiv 2 \\pmod 8\\), and any multiple of 4 is \\(\\equiv 0\\) or \\(4 \\pmod 8\\).",
          "So the sum is even but never a multiple of 4. Check: \\(3^2+5^2 = 34 = 4\\times 8 + 2\\).",
        ],
        answer:
          "Never. It is always even and always leaves remainder 2 on division by 8, so 4 cannot divide it.",
      },
      practiceSet: [
        { prompt: "Remainder when \\(21^2\\) is divided by 8?", answer: "\\(1\\)" },
        { prompt: "Remainder when \\(13^{6}\\) is divided by 8?", answer: "\\(1\\)", method: "An even power of an odd number" },
        { prompt: "Is \\(11^2+9^2\\) divisible by 4?", answer: "No", method: "It is \\(2 \\bmod 8\\)" },
        { prompt: "Remainder when \\(99^2 - 3^2\\) is divided by 8?", answer: "\\(0\\)" },
      ],
      pyqExampleId: "57ee2f23-da21-45ae-b9b4-f06ad667cc67", // 2026 — P = N^2, N odd, remainder mod 8
      traps: [
        {
          title: "Remainder 1 modulo 8 is a stronger claim than remainder 1 modulo 4",
          body:
            "An odd square is \\(\\equiv 1\\) modulo 8, which of course also gives \\(\\equiv 1\\) modulo 4 — but not the reverse. If a question offers both 4 and 8, the 8 statement is the sharp one and the one that decides borderline options, as in the \\(\\frac{m^4+4m^2+11}{16}\\) question where you need the mod-8 fact twice over.",
        },
        {
          title: "The rule is for ODD bases only",
          body:
            "\\(4^2=16 \\equiv 0\\) and \\(6^2=36 \\equiv 4 \\pmod 8\\), so nothing survives if the base is even. Before using the fact, confirm the base is odd — in a statement question that condition is usually stated once, at the top, and easy to skim past.",
        },
      ],
    },

    // C4 — consecutive integers give divisibility for free
    {
      kind: "formula" as const,
      slug: "cdsns-consecutive-products",
      name: "A product of consecutive integers is divisible by the factorial of how many there are",
      intuition:
        "Among any two consecutive integers one is even. Among any three, one is a multiple of 3 and at least one is even. The pattern keeps going, and it means an expression that **factorises into a run of consecutive integers** carries guaranteed divisors before you substitute anything.",
      definition:
        "The product of \\(k\\) consecutive integers is divisible by \\(k!\\).\n" +
        "- \\(k=2\\): \\(n(n+1)\\) is divisible by \\(2\\).\n" +
        "- \\(k=3\\): \\(n(n+1)(n+2)\\) is divisible by \\(3! = 6\\).\n" +
        "- \\(k=5\\): a run of five is divisible by \\(5! = 120\\).\n" +
        "The examination skill is **spotting the run**, because it is usually disguised as a polynomial: \\(n^3-n=(n-1)n(n+1)\\) and \\(n^5-5n^3+4n=(n-2)(n-1)n(n+1)(n+2)\\).",
      formula: {
        label: "Consecutive-run divisibility",
        latex: "k! \\;\\big|\\; n(n+1)(n+2)\\cdots(n+k-1)",
      },
      authoredExample: {
        prompt: "Show that \\(n^3 - n\\) is divisible by 6 for every integer \\(n\\).",
        steps: [
          "Factorise fully: \\(n^3-n = n(n^2-1) = (n-1)\\,n\\,(n+1)\\).",
          "That is a product of three consecutive integers, so it is divisible by \\(3! = 6\\).",
          "Read off the two pieces separately if you prefer: one of the three is even (giving the 2) and one is a multiple of 3 (giving the 3), and \\(\\gcd(2,3)=1\\), so 6 divides the product.",
          "Check \\(n=4\\): \\(64-4=60=6\\times 10\\).",
        ],
        answer: "\\(n^3-n=(n-1)n(n+1)\\) is a run of three, so 6 always divides it.",
      },
      selfCheckExample: {
        prompt:
          "Is \\(n(n+1)(n+2)\\) always divisible by 48 when \\(n\\) is even? If not, what is guaranteed?",
        steps: [
          "With \\(n\\) even, both \\(n\\) and \\(n+2\\) are even and they are consecutive even numbers, so one of them is a multiple of 4. That gives at least \\(2 \\times 4 = 8\\).",
          "One of any three consecutive integers is a multiple of 3, giving a further factor of 3. So \\(24\\) always divides the product.",
          "But 48 does not: take \\(n=2\\), giving \\(2\\times3\\times4=24\\), which is not a multiple of 48.",
        ],
        answer:
          "Not 48 — the guaranteed divisor is \\(24\\), and \\(n=2\\) is the counterexample that kills 48.",
      },
      practiceSet: [
        { prompt: "Smallest number always dividing \\(n(n+1)\\)?", answer: "\\(2\\)" },
        { prompt: "Smallest number always dividing a product of four consecutive integers?", answer: "\\(24\\)", method: "\\(4!\\)" },
        { prompt: "Factorise \\(n^3-n\\).", answer: "\\((n-1)n(n+1)\\)" },
        { prompt: "Is \\(n^5-n\\) always divisible by 5?", answer: "Yes" },
      ],
      pyqExampleId: "8ab6516b-190d-4843-a4de-60b6905345fc", // 2023 — n^3-n by 6, n^5-n by 5, n^5-5n^3+4n by 120
      traps: [
        {
          title: "The rule gives a guarantee, not the largest divisor",
          body:
            "A run of three is divisible by 6 — but a particular run may be divisible by much more, and a question asking for the **largest** number that **always** divides an expression needs the smallest case tested. \\(n=1\\) or \\(n=2\\) usually settles it in one line, which is exactly how the 48-versus-24 question above is decided.",
        },
      ],
    },

    // C5 — symmetric substitution for consecutive sums
    {
      kind: "formula" as const,
      slug: "cdsns-consecutive-sums",
      name: "Centring a run of consecutive integers on its middle term",
      intuition:
        "If three consecutive numbers are called \\(n-1, n, n+1\\) instead of \\(n, n+1, n+2\\), the algebra gets dramatically shorter: the odd powers cancel in pairs and the sum of squares collapses to \\(3n^2+2\\). Always put the **middle** term at the centre of your notation.",
      definition:
        "For three consecutive integers written symmetrically as \\(n-1,\\, n,\\, n+1\\):\n" +
        "- their **sum** is \\(3n\\), so it is always a multiple of 3;\n" +
        "- their **sum of squares** is \\(3n^2+2\\);\n" +
        "- their **sum of cubes** is \\(3n^3+6n = 3n(n^2+2)\\), always a multiple of 9 for integer \\(n\\).\n" +
        "For an even-length run the midpoint is a half-integer, so use \\(n\\) and \\(n+1\\) around the centre instead. The principle is the same: **symmetry kills the cross terms.**",
      formula: {
        label: "Sum of squares of three consecutive integers",
        latex: "(n-1)^2 + n^2 + (n+1)^2 = 3n^2 + 2",
      },
      authoredExample: {
        prompt:
          "The sum of the squares of three consecutive natural numbers is 77. What is their sum?",
        steps: [
          "Name them symmetrically \\(n-1, n, n+1\\), so the sum of squares is \\(3n^2+2\\).",
          "Set \\(3n^2+2 = 77\\), so \\(3n^2 = 75\\) and \\(n^2 = 25\\), giving \\(n = 5\\).",
          "The numbers are \\(4, 5, 6\\); check \\(16+25+36 = 77\\).",
          "Their sum is \\(3n = 15\\).",
        ],
        answer: "\\(15\\).",
      },
      selfCheckExample: {
        prompt:
          "Prove that the sum of the cubes of any three consecutive natural numbers is divisible by 9.",
        steps: [
          "Write them as \\(n-1, n, n+1\\). Then the sum of cubes is \\((n-1)^3 + n^3 + (n+1)^3\\).",
          "The \\(\\pm 3n^2\\) and \\(\\pm 1\\) terms cancel between the outer two cubes, leaving \\(3n^3 + 6n\\).",
          "Factor: \\(3n^3+6n = 3n(n^2+2)\\). Now \\(n(n^2+2) = (n^3-n) + 3n\\), and \\(n^3-n\\) is a run of three so a multiple of 3; \\(3n\\) is too. Hence \\(3 \\mid n(n^2+2)\\).",
          "So the sum of cubes is \\(3 \\times (\\text{multiple of }3) = \\) a multiple of 9. Check \\(1,2,3\\): \\(1+8+27=36=9\\times 4\\).",
        ],
        answer: "Always divisible by 9.",
      },
      practiceSet: [
        { prompt: "Sum of squares of three consecutive integers centred on 7?", answer: "\\(149\\)", method: "\\(3(49)+2\\)" },
        { prompt: "Three consecutive integers sum to 42. Find the middle one.", answer: "\\(14\\)", method: "Sum \\(=3n\\)" },
        { prompt: "Is the sum of three consecutive integers always a multiple of 3?", answer: "Yes" },
        { prompt: "Is the sum of FOUR consecutive integers always a multiple of 4?", answer: "No", method: "It is \\(4n+6\\), never a multiple of 4" },
      ],
      pyqExampleId: "afbb108a-0455-4dcb-a50e-cfd1562e076f", // 2018 — sum of squares 110, find sum of cubes
      traps: [
        {
          title: "What is true for three consecutive integers is not true for four",
          body:
            "Three consecutive integers always sum to a multiple of 3, and it is tempting to generalise. But four consecutive integers sum to \\(4n+6\\), which is never a multiple of 4. The rule is that a run of **odd** length has a genuine middle term and so a clean multiple; an even-length run does not.",
        },
      ],
    },

    // C6 — parity as a counting constraint
    {
      kind: "formula" as const,
      slug: "cdsns-parity-counting",
      name: "Using the parity of a total to count the odd terms",
      intuition:
        "If several whole numbers add to an even total, the count of odd ones among them must itself be even. That single observation converts a question about four unknown integers into a question about three possible cases — and \\((-1)^a\\) is just a way of reading off parity as a number.",
      definition:
        "Suppose \\(a_1+\\cdots+a_k = S\\). Then the number of odd \\(a_i\\) is even when \\(S\\) is even, and odd when \\(S\\) is odd.\n" +
        "- \\((-1)^a = +1\\) when \\(a\\) is even and \\(-1\\) when \\(a\\) is odd, so a sum of such terms counts parities directly.\n" +
        "- With \\(k\\) terms, if \\(j\\) of them are odd then \\(\\sum (-1)^{a_i} = (k-j) - j = k-2j\\).\n" +
        "- Having found the possible \\(j\\), **check each one is actually attainable** under the question's constraints before counting it.",
      formula: {
        label: "Sum of parity signs",
        latex: "\\sum_{i=1}^{k} (-1)^{a_i} = k - 2j \\quad (j = \\text{how many } a_i \\text{ are odd})",
      },
      authoredExample: {
        prompt:
          "Three positive integers \\(a, b, c\\) satisfy \\(a+b+c = 50\\). How many values can \\(T = (-1)^a + (-1)^b + (-1)^c\\) take?",
        steps: [
          "The total 50 is even, so the number \\(j\\) of odd terms among \\(a,b,c\\) must be even: \\(j = 0\\) or \\(j = 2\\).",
          "Using \\(T = k-2j\\) with \\(k=3\\): \\(j=0\\) gives \\(T=3\\), and \\(j=2\\) gives \\(T=-1\\).",
          "Check attainability with positive integers: \\(j=0\\) needs all even, e.g. \\(2+2+46\\); \\(j=2\\) needs exactly two odd, e.g. \\(1+1+48\\). Both work.",
        ],
        answer: "Two values, \\(T = 3\\) and \\(T = -1\\).",
      },
      selfCheckExample: {
        prompt:
          "Can four positive integers summing to 2025 have exactly two odd members?",
        steps: [
          "2025 is odd, so the number of odd members must be **odd**: 1 or 3 (it cannot be 0 or 4 either).",
          "Two is even, so it is impossible.",
          "Confirm by trying: two odds sum to an even number, and the remaining two evens also sum to even, so the grand total would be even, not 2025.",
        ],
        answer:
          "No. An odd total forces an odd count of odd terms, so two is ruled out.",
      },
      practiceSet: [
        { prompt: "Five integers sum to an odd number. Can exactly two be odd?", answer: "No", method: "Odd total needs an odd count of odds" },
        { prompt: "\\((-1)^{14}\\)?", answer: "\\(+1\\)" },
        { prompt: "Two integers sum to 100. How many are odd?", answer: "Either 0 or 2" },
        { prompt: "\\(k=4\\) terms, \\(j=4\\) odd. What is \\(\\sum(-1)^{a_i}\\)?", answer: "\\(-4\\)", method: "\\(k-2j=4-8\\)" },
      ],
      pyqExampleId: "48b7ee55-2fd8-45f7-a28b-ec839f1fc267", // 2023 — a+b+c+d=200, count values of S
      traps: [
        {
          title: "Count the values that are ATTAINABLE, not the cases that are arithmetically allowed",
          body:
            "Parity narrows \\(j\\) to a short list, but each surviving case still has to be realisable under the question's own constraints — usually \"positive integers\". Write one explicit example per case, as above. A case you cannot exhibit does not count, and a case you forgot to exhibit is the commonest way this question is marked wrong.",
        },
      ],
    },

    // C7 — reference: the three CDS statement formats
    {
      kind: "reference" as const,
      slug: "cdsns-statement-formats",
      name: "The three statement formats CDS uses, and how to attack each",
      intuition:
        "Fifty-five of this chapter's 218 questions — a full quarter — are not plain \"compute this\" questions. They are one of three fixed formats, and each has a mechanical attack. Recognising the format before reading the mathematics is worth real time in a 1.2-minute-per-question paper.",
      definition:
        "The formats and their attacks:\n" +
        "- **Consider the following statements** (numbered 1, 2, 3): judge each statement **independently**, then match your verdict pattern to the option codes. One counterexample kills a statement outright.\n" +
        "- **Data sufficiency** (Statement-I, Statement-II): do not solve the problem. Ask only whether each statement **pins the answer down uniquely**, first alone and then together.\n" +
        "- **Which one of the following is correct / is not correct**: this is elimination, not derivation. Look for the option that overreaches with words like always, every, or must.",
      table: {
        columns: ["Format", "What it really asks", "The attack"],
        rows: [
          {
            cells: [
              "Consider the following statements 1, 2, 3",
              "Is each statement true, separately?",
              "Test each on its own; hunt one counterexample per statement",
            ],
          },
          {
            cells: [
              "Statement-I / Statement-II (data sufficiency)",
              "Is the answer UNIQUE, not what the answer is",
              "Check I alone, then II alone, then both; stop at uniqueness",
            ],
            noteAmber:
              "The commonest error is solving the problem instead of testing sufficiency. If a statement leaves two possible values, it is insufficient even when both are easy to find.",
          },
          {
            cells: [
              "Which one is correct",
              "Three options are false",
              "Eliminate by counterexample rather than proving the survivor",
            ],
          },
          {
            cells: [
              "Which one is NOT correct",
              "Three options are true",
              "Read the word NOT twice; the wrong answer is usually the true statement you liked",
            ],
            noteAmber:
              "CDS sets both polarities and prints them in the same typeface. Underline the word NOT before you start.",
          },
          {
            cells: [
              "Two statements that say the same thing",
              "Whether either adds anything",
              "If both carry one fact, together they are still insufficient",
            ],
          },
          {
            cells: [
              "Option offering none of the above",
              "Whether your value is really absent",
              "Recompute once; this option is occasionally the intended answer",
            ],
          },
        ],
        caption:
          "A quarter of this chapter arrives in one of these shapes. Name the format first, then do the mathematics.",
      },
      selfCheckExample: {
        prompt:
          "Data sufficiency. Question: what is the two-digit number \\(N\\)? Statement-I: the sum of \\(N\\) and its digit-reversal is 88. Statement-II: the digits of \\(N\\) differ by 2. Is either statement sufficient?",
        steps: [
          "Statement-I: the sum of a two-digit number and its reversal is \\(11(a+b)\\), so \\(11(a+b)=88\\) gives \\(a+b=8\\). That allows 17, 26, 35, 44, 53, 62, 71, 80 — not unique, so **insufficient**.",
          "Statement-II: digits differing by 2 allows 13, 31, 24, 42 and many more — **insufficient**.",
          "Together: \\(a+b=8\\) and \\(|a-b|=2\\) give \\(\\{a,b\\}=\\{5,3\\}\\), so \\(N=53\\) or \\(N=35\\). **Still two values**, so still insufficient.",
          "Notice the trap: combining two insufficient statements does not automatically produce sufficiency.",
        ],
        answer:
          "Neither alone, and not even both together — two candidates survive.",
      },
      practiceSet: [
        { prompt: "In data sufficiency, must you find the actual answer?", answer: "No", method: "Only decide whether it is unique" },
        { prompt: "How many counterexamples kill a statement?", answer: "One" },
        { prompt: "Statement I says \\(2p+q\\) is odd. What does it fix?", answer: "Only that \\(q\\) is odd" },
        { prompt: "If both statements carry the same single fact, are they jointly sufficient?", answer: "No" },
      ],
      pyqExampleId: "4f57a785-9ba1-4ac2-9dc8-de4541517188", // 2024 — DS: which of a,b,c,d is closest to abcd
      traps: [
        {
          title: "In data sufficiency, insufficient plus insufficient is not always sufficient",
          body:
            "The option codes tempt you into assuming that if neither statement works alone, both together must. They need not: the self-check above leaves two candidates even with both statements in hand, and CDS prints exactly that case. Always run the combined test explicitly instead of inferring it.",
        },
        {
          title: "A statement question is not an all-or-nothing question",
          body:
            "When three statements are offered, the option list usually includes several partial combinations such as \"1 and 3 only\". Students who decide the question feels true and pick \"all of them\" lose marks to a single planted counterexample — most often a statement that holds for every case except \\(n=0\\), or except the prime 2.",
        },
      ],
    },
  ],
  related: [
    { label: "Divisibility rules and missing digits", href: "/notes/cds-maths/number-system/cds-ns-divisibility-rules" },
    { label: "Unit digit and cyclicity", href: "/notes/cds-maths/number-system/cds-ns-unit-digit" },
  ],
};
