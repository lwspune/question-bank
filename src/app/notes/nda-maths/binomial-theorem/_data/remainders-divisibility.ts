import type { SubtopicNote } from "@/app/notes/_types";

export const REMAINDERS_DIVISIBILITY_NOTE: SubtopicNote = {
  subtopicName: "Remainders and Divisibility via Binomial Expansion",
  title: "Remainders & Divisibility via Binomial Expansion",
  oneLineDefinition:
    "Writing a base as (multiple ± 1) and expanding by the binomial theorem makes a remainder fall out — every term except the last is divisible by the modulus, so only the tail survives.",
  whyItMatters:
    "Only 3 PYQs, but they are quick marks once you see the move: re-express the base near a multiple of the divisor. The same idea also handles the power of a prime hidden inside a factorial.",
  concepts: [
    // 1 — remainders via binomial
    {
      kind: "formula" as const,
      slug: "bt-remainders-via-binomial",
      name: "Remainders by the Binomial Trick",
      pyqExampleId: "b968ccd3-e98d-4bee-b490-2b66d9dfbb47",
      intuition:
        "To find a remainder of a big power, rewrite the base as a multiple of the divisor plus or minus a small number, then expand. Every term that carries the 'multiple' factor is divisible by the divisor and vanishes mod m — only the small leftover terms decide the remainder.",
      definition:
        "To find \\(A^n \\bmod m\\): write \\(A = km \\pm 1\\) (or \\(km \\pm c\\) for a small \\(c\\)) and expand \\((km \\pm 1)^n = \\sum_r \\binom{n}{r}(km)^r(\\pm 1)^{n-r}\\). Every term with \\(r \\ge 1\\) has a factor \\(m\\), so\n" +
        "\\[A^n \\equiv (\\pm 1)^n \\pmod{m}.\\]\n" +
        "More generally, keep only the terms NOT divisible by \\(m\\). Pairing this with a small subtraction (e.g. \\(7^n - 6n - 1\\)) shows divisibility because the surviving low-order terms cancel.",
      formula: {
        label: "Base near a multiple of m",
        latex: "(km \\pm 1)^n \\equiv (\\pm 1)^n \\pmod{m}",
      },
      authoredExample: {
        prompt: "Find the remainder when \\(2^{120}\\) is divided by 7.",
        steps: [
          "\\(2^{120} = (2^3)^{40} = 8^{40} = (7+1)^{40}\\).",
          "\\((7+1)^{40} = \\sum_r \\binom{40}{r} 7^r\\); every term with \\(r \\ge 1\\) is divisible by 7.",
          "Only the \\(r = 0\\) term survives mod 7: \\(\\binom{40}{0}\\cdot 1 = 1\\).",
        ],
        answer: "Remainder \\(= 1\\).",
      },
      traps: [
        {
          title: "Choose the base CLOSEST to a multiple of the divisor",
          body:
            "Rewrite the base as the divisor (or a power of it) \\(\\pm 1\\). \\(8 = 7+1\\) for mod 7; \\(7 = 6+1\\) for mod 6/36. Picking a far-off form leaves many surviving terms and defeats the trick.",
        },
      ],
    },

    // 2 — Legendre / power of a prime in n!
    {
      kind: "formula" as const,
      slug: "bt-legendre-power-in-factorial",
      name: "Power of a Prime in n! (Legendre's Formula)",
      pyqExampleId: "a659998e-6970-4134-9d4b-c8c7332976cb",
      intuition:
        "To find the largest power of a prime dividing n!, count how many of 1…n are multiples of the prime, then multiples of its square, its cube, and so on — each layer contributes one extra factor. For a composite divisor, find the prime's exponent first and then divide.",
      definition:
        "The exponent of a prime \\(p\\) in \\(n!\\) is **Legendre's formula**\n" +
        "\\[E_p(n!) = \\left\\lfloor \\dfrac{n}{p} \\right\\rfloor + \\left\\lfloor \\dfrac{n}{p^2} \\right\\rfloor + \\left\\lfloor \\dfrac{n}{p^3} \\right\\rfloor + \\cdots\\]\n" +
        "(the sum is finite — stop when \\(p^k > n\\)). For a composite divisor like \\(8 = 2^3\\): find the power of \\(2\\) in \\(n!\\), then the highest \\(k\\) with \\(8^k \\mid n!\\) is \\(\\left\\lfloor E_2(n!)/3 \\right\\rfloor\\).",
      formula: {
        label: "Legendre's formula",
        latex: "E_p(n!) = \\sum_{i\\ge 1} \\left\\lfloor \\dfrac{n}{p^{\\,i}} \\right\\rfloor",
      },
      authoredExample: {
        prompt: "If \\(26! = n \\cdot 8^k\\) with \\(n, k\\) positive integers, find the maximum \\(k\\).",
        steps: [
          "Power of 2 in \\(26!\\): \\(\\lfloor 26/2 \\rfloor + \\lfloor 26/4 \\rfloor + \\lfloor 26/8 \\rfloor + \\lfloor 26/16 \\rfloor = 13 + 6 + 3 + 1 = 23\\).",
          "Since \\(8 = 2^3\\), the max \\(k\\) is \\(\\lfloor 23/3 \\rfloor\\).",
        ],
        answer: "\\(k = 7\\).",
      },
      traps: [
        {
          title: "Count the prime, then divide by its exponent",
          body:
            "For \\(8 = 2^3\\), don't count \"multiples of 8\". Count the total power of 2 (via Legendre), then take the floor of that over 3. Counting 8s directly undercounts badly.",
        },
      ],
    },
  ],
};
