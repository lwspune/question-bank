import type { SubtopicNote } from "@/app/notes/_types";

export const SPECIAL_SERIES_NOTE: SubtopicNote = {
  subtopicName: "Special Series and Special Sums",
  title: "Special Series and Special Sums",
  oneLineDefinition:
    "The summation toolkit beyond AP and GP — power sums, arithmetic-geometric series, factorial sums, and telescoping — plus the number-pattern questions that ride on them.",
  whyItMatters:
    "Eight PYQs, leaning HARD — this is where the difficulty of the chapter concentrates. The shapes " +
    "are distinctive and each has a signature move: power sums use standard formulas, " +
    "arithmetic-geometric sums use the subtract-r-times-the-sum trick, factorial sums telescope, " +
    "and repunit / divisibility questions hinge on a clean factor identity. Recognise the shape, apply the move.",
  concepts: [
    // C1 — power sums (FOUNDATION, no PYQ)
    {
      kind: "formula" as const,
      slug: "power-sums",
      name: "Sums of powers of natural numbers",
      intuition:
        "Three formulas sum the first \\(n\\) natural numbers, their squares, and their cubes. They " +
        "are worth memorising outright — they appear as building blocks inside many other series, and " +
        "the cube-sum is just the square of the linear sum (a pleasing fact worth remembering).",
      definition:
        "For the first \\(n\\) natural numbers:\n" +
        "- \\(\\displaystyle\\sum_{k=1}^{n} k = \\frac{n(n+1)}{2}\\).\n" +
        "- \\(\\displaystyle\\sum_{k=1}^{n} k^2 = \\frac{n(n+1)(2n+1)}{6}\\).\n" +
        "- \\(\\displaystyle\\sum_{k=1}^{n} k^3 = \\left[\\frac{n(n+1)}{2}\\right]^2 = \\left(\\sum_{k=1}^{n} k\\right)^2\\).",
      formula: {
        label: "The three power sums",
        latex: "\\sum k = \\frac{n(n+1)}{2},\\quad \\sum k^2 = \\frac{n(n+1)(2n+1)}{6},\\quad \\sum k^3 = \\left[\\frac{n(n+1)}{2}\\right]^2",
      },
      authoredExample: {
        prompt: "Find \\(\\displaystyle\\sum_{k=1}^{10} k^2\\).",
        steps: [
          "Use \\(\\sum k^2 = \\dfrac{n(n+1)(2n+1)}{6}\\) with \\(n = 10\\).",
          "\\(= \\dfrac{10 \\times 11 \\times 21}{6} = \\dfrac{2310}{6}\\).",
        ],
        answer: "\\(385\\).",
      },
      selfCheckExample: {
        prompt: "Find \\(\\displaystyle\\sum_{k=1}^{5} k^3\\) and check it equals \\((\\sum k)^2\\).",
        steps: [
          "\\(\\sum_{k=1}^{5} k = \\dfrac{5 \\times 6}{2} = 15\\).",
          "So \\(\\sum k^3 = 15^2 = 225\\).",
          "Direct check: \\(1 + 8 + 27 + 64 + 125 = 225\\). ✓",
        ],
        answer: "\\(225\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k=1}^{n} k\\) equals?", answer: "\\(\\tfrac{n(n+1)}{2}\\)" },
        { prompt: "\\(\\sum_{k=1}^{20} k\\)?", answer: "\\(210\\)", method: "\\(\\tfrac{20\\cdot21}{2}\\)" },
        { prompt: "\\(\\sum_{k=1}^{4} k^2\\)?", answer: "\\(30\\)", method: "\\(1+4+9+16\\)" },
        { prompt: "\\(\\sum k^3\\) equals the square of?", answer: "\\(\\sum k\\)" },
      ],
      traps: [
        {
          title: "Don't confuse the three power-sum formulas",
          body:
            "Keep them distinct: \\(\\sum k = \\dfrac{n(n+1)}{2}\\), " +
            "\\(\\sum k^2 = \\dfrac{n(n+1)(2n+1)}{6}\\), and \\(\\sum k^3 = \\left[\\dfrac{n(n+1)}{2}\\right]^2\\). " +
            "Only the cube-sum is a square. A frequent error is using the \\(\\sum k\\) formula where " +
            "\\(\\sum k^2\\) is needed — the squares formula carries the extra \\((2n+1)\\) and divides by 6. " +
            "For \\(n = 4\\): \\(\\sum k^2 = \\dfrac{4\\cdot 5\\cdot 9}{6} = 30\\), not \\(\\dfrac{4\\cdot 5}{2} = 10\\).",
        },
      ],
    },

    // C2 — arithmetic-geometric series
    {
      kind: "formula" as const,
      slug: "arithmetic-geometric-series",
      name: "Arithmetic-geometric series (the S − rS trick)",
      intuition:
        "An arithmetic-geometric series has each term made of an AP factor times a GP factor — " +
        "\\(1\\cdot r + 2\\cdot r^2 + 3\\cdot r^3 + \\cdots\\). You sum it the same way you derived the " +
        "GP sum: write \\(S\\), write \\(rS\\) shifted one place, and subtract. The subtraction turns " +
        "the AP coefficients into a constant, leaving an ordinary GP to sum.",
      definition:
        "For \\(S = \\sum_{k=1}^{n} k\\,r^k\\), form \\(rS\\), align by powers of \\(r\\), and subtract: " +
        "\\(S - rS = (r + r^2 + \\cdots + r^n) - n\\,r^{n+1}\\). The bracket is a plain GP, so\n" +
        "\\[ S(1 - r) = \\frac{r(1 - r^n)}{1 - r} - n\\,r^{n+1}. \\]\n" +
        "Solve for \\(S\\). The same shift-and-subtract works for any AP \\(\\times\\) GP term.",
      authoredExample: {
        prompt: "Find \\(S = \\displaystyle\\sum_{k=1}^{n} k\\,2^k = 1\\cdot 2 + 2\\cdot 2^2 + 3\\cdot 2^3 + \\cdots + n\\cdot 2^n\\).",
        steps: [
          "Write \\(S = 1\\cdot 2 + 2\\cdot 2^2 + \\cdots + n\\cdot 2^n\\).",
          "Write \\(2S = 1\\cdot 2^2 + 2\\cdot 2^3 + \\cdots + n\\cdot 2^{n+1}\\) (every term shifted up one power).",
          "Subtract: \\(S - 2S = (2 + 2^2 + \\cdots + 2^n) - n\\cdot 2^{n+1}\\).",
          "The GP sums to \\(2^{n+1} - 2\\), so \\(-S = 2^{n+1} - 2 - n\\cdot 2^{n+1}\\).",
          "Thus \\(S = (n-1)\\,2^{n+1} + 2\\).",
        ],
        answer: "\\(S = (n-1)\\,2^{n+1} + 2\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\displaystyle\\sum_{k=1}^{3} k\\,4^k = 1\\cdot 4 + 2\\cdot 4^2 + 3\\cdot 4^3\\).",
        steps: [
          "Term by term: \\(1\\cdot 4 = 4\\), \\(2\\cdot 16 = 32\\), \\(3\\cdot 64 = 192\\).",
          "Add: \\(4 + 32 + 192 = 228\\).",
        ],
        answer: "\\(228\\).",
      },
      practiceSet: [
        { prompt: "In an arithmetic-geometric term \\(k\\,r^k\\), which factor is the AP part?", answer: "\\(k\\)" },
        { prompt: "The summing trick is to subtract what from \\(S\\)?", answer: "\\(rS\\)" },
        { prompt: "After subtracting, what kind of series is left?", answer: "A GP" },
        { prompt: "\\(\\sum_{k=1}^{2} k\\,3^k\\)?", answer: "\\(21\\)", method: "\\(3 + 2\\cdot 9\\)" },
      ],
      pyqExampleId: "6934ff38-49a6-47b2-a01c-068a19c0746b", // 2017 — 1.3 + 2.3^2 + ... = ((2n-1)3^a+b)/4
    },

    // C3 — factorial series
    {
      kind: "formula" as const,
      slug: "factorial-series",
      name: "Factorial sums — telescoping and remainders",
      intuition:
        "Factorials grow explosively, and two NDA shapes exploit that. A sum of \\(n\\cdot n!\\) " +
        "telescopes because \\(n\\cdot n! = (n+1)! - n!\\), so almost everything cancels. And a sum like " +
        "\\(1! + 2! + 3! + \\cdots\\) modulo a small number is easy, because from some point on every " +
        "factorial is divisible by that number — only the first few terms survive.",
      definition:
        "**Telescoping identity:** \\(n\\cdot n! = (n+1)! - n!\\), so \\(\\sum_{k=1}^{n} k\\cdot k! = " +
        "(n+1)! - 1\\). **Remainder shape:** to find \\(\\big(\\sum k!\\big) \\bmod m\\), note that " +
        "\\(k! \\equiv 0 \\pmod{m}\\) for all \\(k\\) large enough that \\(m \\mid k!\\) — so only the " +
        "small-\\(k\\) terms contribute to the remainder.",
      formula: {
        label: "Factorial telescoping",
        latex: "n\\cdot n! = (n+1)! - n! \\;\\Rightarrow\\; \\sum_{k=1}^{n} k\\cdot k! = (n+1)! - 1",
      },
      authoredExample: {
        prompt: "Find the remainder when \\(1! + 2! + 3! + \\cdots + 100!\\) is divided by 12.",
        steps: [
          "From \\(4!\\) onward every factorial contains the factors \\(4 \\times 3 = 12\\), so \\(4!, 5!, \\ldots, 100!\\) are all divisible by 12.",
          "Only \\(1! + 2! + 3!\\) can leave a remainder: \\(1 + 2 + 6 = 9\\).",
          "Since \\(9 < 12\\), the remainder is \\(9\\).",
        ],
        answer: "\\(9\\).",
      },
      selfCheckExample: {
        prompt: "Use the telescoping identity to find \\(\\displaystyle\\sum_{k=1}^{5} k\\cdot k!\\).",
        steps: [
          "\\(\\sum_{k=1}^{n} k\\cdot k! = (n+1)! - 1\\); here \\(n = 5\\).",
          "\\(= 6! - 1 = 720 - 1\\).",
        ],
        answer: "\\(719\\).",
      },
      practiceSet: [
        { prompt: "\\(n\\cdot n!\\) equals which difference?", answer: "\\((n+1)! - n!\\)" },
        { prompt: "\\(\\sum_{k=1}^{n} k\\cdot k!\\) equals?", answer: "\\((n+1)! - 1\\)" },
        { prompt: "For \\(k \\ge 4\\), is \\(k!\\) divisible by 12?", answer: "Yes" },
        { prompt: "Remainder of \\(1! + 2! + 3! + 4!\\) divided by 8?", answer: "\\(1\\)", method: "\\(4! = 24\\) divisible; \\(1+2+6 = 9 \\equiv 1\\)" },
      ],
      pyqExampleId: "b57bae8c-01a6-4ef9-a764-24e675183c02", // 2021 — a_n = n(n!), sum to 10 -> 11!-1
    },

    // C4 — telescoping + number patterns (repunits, a^n +/- b^n)
    {
      kind: "formula" as const,
      slug: "telescoping-and-number-patterns",
      name: "Telescoping sums, repunits, and divisibility patterns",
      intuition:
        "Telescoping is the most satisfying summation: rewrite each term as a difference so that " +
        "consecutive pieces cancel, leaving only the first and last. The same \"find the hidden " +
        "structure\" instinct cracks repunit problems (a string of 1s is \\(\\tfrac{10^n - 1}{9}\\)) and " +
        "divisibility questions about \\(a^n \\pm b^n\\) (which factor through \\(a \\pm b\\)).",
      definition:
        "**Telescoping:** if \\(t_k = f(k) - f(k+1)\\), then \\(\\sum_{k=1}^{n} t_k = f(1) - f(n+1)\\). " +
        "A standard case: \\(\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}\\), so the sum is " +
        "\\(1 - \\dfrac{1}{n+1} = \\dfrac{n}{n+1}\\). **Repunit:** \\(\\underbrace{11\\ldots1}_{n} = " +
        "\\dfrac{10^n - 1}{9}\\). **Factor identities:** \\(a^n - b^n\\) is divisible by \\(a - b\\) " +
        "(all \\(n\\)); \\(a^n + b^n\\) is divisible by \\(a + b\\) for odd \\(n\\).",
      formula: {
        label: "Telescoping standard sum",
        latex: "\\sum_{k=1}^{n} \\frac{1}{k(k+1)} = 1 - \\frac{1}{n+1} = \\frac{n}{n+1}",
      },
      authoredExample: {
        prompt: "Find \\(\\dfrac{1}{1\\cdot 2} + \\dfrac{1}{2\\cdot 3} + \\dfrac{1}{3\\cdot 4} + \\cdots + \\dfrac{1}{n(n+1)}\\).",
        steps: [
          "Split each term: \\(\\dfrac{1}{k(k+1)} = \\dfrac{1}{k} - \\dfrac{1}{k+1}\\).",
          "The sum becomes \\(\\left(1 - \\tfrac12\\right) + \\left(\\tfrac12 - \\tfrac13\\right) + \\cdots + \\left(\\tfrac1n - \\tfrac{1}{n+1}\\right)\\).",
          "All the inner terms cancel, leaving \\(1 - \\dfrac{1}{n+1}\\).",
        ],
        answer: "\\(\\dfrac{n}{n+1}\\).",
      },
      selfCheckExample: {
        prompt: "Show that \\(7^3 + 5^3\\) is divisible by 12, and give the quotient.",
        steps: [
          "For odd \\(n\\), \\(a^n + b^n\\) is divisible by \\(a + b\\). Here \\(n = 3\\), \\(a + b = 7 + 5 = 12\\).",
          "Compute: \\(7^3 + 5^3 = 343 + 125 = 468\\).",
          "\\(468 \\div 12 = 39\\).",
        ],
        answer: "Divisible by 12; quotient \\(39\\).",
      },
      practiceSet: [
        { prompt: "\\(\\dfrac{1}{k(k+1)}\\) splits into?", answer: "\\(\\tfrac1k - \\tfrac{1}{k+1}\\)" },
        { prompt: "A repunit of \\(n\\) ones equals?", answer: "\\(\\tfrac{10^n - 1}{9}\\)" },
        { prompt: "\\(a^n - b^n\\) is always divisible by?", answer: "\\(a - b\\)" },
        { prompt: "\\(\\sum_{k=1}^{3} \\tfrac{1}{k(k+1)}\\)?", answer: "\\(\\tfrac34\\)", method: "\\(1 - \\tfrac14\\)" },
      ],
      pyqExampleId: "1552f3eb-d87c-48b9-b9c5-401255ae72f2", // 2021 — repunit p, value of 9p^2 + p
    },
  ],
  related: [
    { label: "Arithmetic Progressions", href: "/notes/nda-maths/sequence-series/seq-arithmetic-progressions" },
    { label: "Geometric Progressions", href: "/notes/nda-maths/sequence-series/seq-geometric-progressions" },
  ],
};
