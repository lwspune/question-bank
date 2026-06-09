import type { SubtopicNote } from "@/app/notes/_types";

export const COEFFICIENTS_TERMS_NOTE: SubtopicNote = {
  subtopicName: "Coefficients and Specific Terms in Expansion",
  title: "Coefficients & Specific Terms in the Expansion",
  oneLineDefinition:
    "The binomial theorem writes (a+b)ⁿ as a sum of n+1 terms; the general term lets you reach into that sum and pull out any single term — a specific power, the middle term, or the term independent of x — without expanding the whole thing.",
  whyItMatters:
    "This is the chapter's foundation and largest pocket (29 PYQs). Almost every question reduces to one move: write the general term, set its exponent to the value you want, solve for r, and read off the coefficient. Master that and the rest is bookkeeping.",
  concepts: [
    // FOUNDATION 1 — the binomial theorem + general term
    {
      kind: "formula" as const,
      slug: "bt-theorem-general-term",
      name: "The Binomial Theorem & the General Term",
      intuition:
        "Expanding (a+b)ⁿ by hand is hopeless for large n. The binomial theorem gives every term at once: term number (r+1) is built from C(n, r), a power of a, and a power of b whose exponents always add to n. Knowing this 'general term' means you never expand — you jump straight to the term you need.",
      definition:
        "For a positive integer \\(n\\),\n" +
        "\\[(a+b)^n = \\sum_{r=0}^{n} \\binom{n}{r} a^{\\,n-r} b^{\\,r}.\\]\n" +
        "- It has exactly **\\(n+1\\) terms**.\n" +
        "- The **general term** (the \\((r+1)\\)-th term) is \\(T_{r+1} = \\binom{n}{r} a^{\\,n-r} b^{\\,r}\\), with \\(r = 0, 1, \\ldots, n\\).\n" +
        "- The exponents of \\(a\\) and \\(b\\) **always sum to \\(n\\)**; the powers of \\(a\\) decrease while the powers of \\(b\\) increase.\n" +
        "This single formula answers \"find the term with \\(x^k\\)\", \"find the middle term\", \"find the constant term\" — substitute and solve for \\(r\\).",
      formula: {
        label: "General term",
        latex: "T_{r+1} = \\binom{n}{r}\\, a^{\\,n-r} b^{\\,r}",
      },
      authoredExample: {
        prompt: "Write the general term of \\(\\left(2x - \\dfrac{3}{x}\\right)^7\\) and find \\(T_3\\).",
        steps: [
          "General term: \\(T_{r+1} = \\binom{7}{r}(2x)^{7-r}\\left(-\\dfrac{3}{x}\\right)^r = \\binom{7}{r} 2^{7-r}(-3)^r x^{7-2r}\\).",
          "\\(T_3\\) is the term with \\(r = 2\\): \\(\\binom{7}{2} 2^{5}(-3)^2 x^{3} = 21 \\cdot 32 \\cdot 9 \\, x^3\\).",
        ],
        answer: "\\(T_3 = 6048\\,x^3\\).",
      },
      practiceSet: [
        { prompt: "How many terms are in the expansion of \\((1+x)^{15}\\)?", answer: "16", method: "\\(n+1 = 15+1\\)." },
        { prompt: "Write \\(T_{r+1}\\) for \\((x+2)^{10}\\).", answer: "\\(\\binom{10}{r} x^{10-r} 2^{r}\\)" },
      ],
      traps: [
        {
          title: "Term number is r + 1, not r",
          body:
            "\\(T_{r+1}\\) uses \\(r\\), but the term's POSITION is \\(r+1\\). The 4th term has \\(r = 3\\), not \\(r = 4\\). Off-by-one here is the single most common binomial error.",
        },
      ],
    },

    // FOUNDATION 2 — binomial coefficients (viz)
    {
      kind: "formula" as const,
      slug: "bt-binomial-coefficients",
      name: "Binomial Coefficients — C(n, r)",
      intuition:
        "The numbers C(n, r) are the building blocks of every term. They live in Pascal's triangle: each is the sum of the two above it, each row reads the same forwards and backwards, and the whole structure is symmetric. Recognising that symmetry turns many \"solve for r\" problems into one line.",
      definition:
        "The **binomial coefficient** is\n" +
        "\\[\\binom{n}{r} = {}^{n}C_r = \\dfrac{n!}{r!\\,(n-r)!}, \\qquad 0 \\le r \\le n.\\]\n" +
        "Key properties:\n" +
        "- **Symmetry:** \\(\\binom{n}{r} = \\binom{n}{n-r}\\) (so \\(\\binom{9}{4} = \\binom{9}{5}\\)).\n" +
        "- **Ends:** \\(\\binom{n}{0} = \\binom{n}{n} = 1\\).\n" +
        "- **Pascal's rule:** \\(\\binom{n}{r} = \\binom{n-1}{r-1} + \\binom{n-1}{r}\\) (each entry is the sum of the two above it).\n" +
        "- **Equal coefficients:** \\(\\binom{n}{a} = \\binom{n}{b} \\iff a = b \\text{ or } a + b = n\\) — the symmetry property in disguise, and a recurring NDA shortcut.",
      formula: {
        label: "Binomial coefficient",
        latex: "\\binom{n}{r} = \\dfrac{n!}{r!\\,(n-r)!}",
      },
      visualizationSlug: "bt-pascal-triangle",
      authoredExample: {
        prompt: "Solve \\(\\binom{20}{r} = \\binom{20}{2r-3}\\).",
        steps: [
          "By symmetry, either the lower indices are equal, \\(r = 2r-3 \\Rightarrow r = 3\\),",
          "or they add to \\(n = 20\\): \\(r + (2r-3) = 20 \\Rightarrow 3r = 23\\), not an integer — reject.",
        ],
        answer: "\\(r = 3\\).",
      },
      traps: [
        {
          title: "Equal coefficients gives TWO cases",
          body:
            "\\(\\binom{n}{a}=\\binom{n}{b}\\) means \\(a=b\\) OR \\(a+b=n\\). Students stop at \\(a=b\\) and miss the \\(a+b=n\\) solution (which is usually the one the question wants).",
        },
      ],
    },

    // 3 — specific term / coefficient of x^k
    {
      kind: "formula" as const,
      slug: "bt-specific-term-coefficient",
      name: "Finding a Specific Term or Coefficient",
      pyqExampleId: "884a3807-cc5a-4d55-b700-6445a8d40233",
      intuition:
        "To find the coefficient of a particular power of x, write the general term, collect ALL the powers of x into one exponent, set that exponent equal to the power you want, and solve for r. The single value of r then hands you the coefficient.",
      definition:
        "For an expansion in \\(x\\), write \\(T_{r+1}\\), simplify the exponent of \\(x\\) to a single linear expression in \\(r\\), set it equal to the target power, and solve:\n" +
        "- **Coefficient of \\(x^k\\):** solve (exponent of \\(x\\)) \\(= k\\) for \\(r\\), then evaluate \\(T_{r+1}\\).\n" +
        "- A **term from the end:** the \\(m\\)-th term from the end of an \\((n+1)\\)-term expansion is the \\((n+2-m)\\)-th from the start.\n" +
        "- If solving gives a non-integer \\(r\\), that power simply does not appear (its coefficient is 0).",
      formula: {
        label: "Set the exponent, solve for r",
        latex: "\\text{exponent of } x \\text{ in } T_{r+1} = k \\ \\Rightarrow\\ r \\ \\Rightarrow\\ \\text{coefficient}",
      },
      authoredExample: {
        prompt: "Find the coefficient of \\(x^{5}\\) in \\(\\left(x^2 + \\dfrac{1}{x}\\right)^{10}\\).",
        steps: [
          "\\(T_{r+1} = \\binom{10}{r}(x^2)^{10-r}\\left(\\tfrac{1}{x}\\right)^r = \\binom{10}{r} x^{20-2r-r} = \\binom{10}{r} x^{20-3r}\\).",
          "Set \\(20 - 3r = 5 \\Rightarrow r = 5\\).",
          "Coefficient: \\(\\binom{10}{5} = 252\\).",
        ],
        answer: "\\(252\\).",
      },
      traps: [
        {
          title: "Collect every power of x first",
          body:
            "A term like \\(\\left(\\tfrac{1}{x}\\right)^r = x^{-r}\\) contributes a NEGATIVE power. Combine all the \\(x\\)-exponents into one expression before equating — forgetting a fractional or negative exponent is where most slips happen.",
        },
      ],
    },

    // 4 — middle term
    {
      kind: "formula" as const,
      slug: "bt-middle-term",
      name: "The Middle Term",
      pyqExampleId: "5529b2ba-a00e-4c46-b3bb-ce47b792a6c4",
      intuition:
        "Because an expansion has n+1 terms, there is one middle term when n is even and two middle terms when n is odd. The middle term carries the largest binomial coefficient, which is why questions love it.",
      definition:
        "For \\((a+b)^n\\) (which has \\(n+1\\) terms):\n" +
        "- **\\(n\\) even:** a single middle term, the \\(\\left(\\tfrac{n}{2}+1\\right)\\)-th term, \\(T_{\\frac{n}{2}+1}\\).\n" +
        "- **\\(n\\) odd:** two middle terms, the \\(\\left(\\tfrac{n+1}{2}\\right)\\)-th and \\(\\left(\\tfrac{n+3}{2}\\right)\\)-th.\n" +
        "Tip: a square trinomial like \\(1 + 4x + 4x^2 = (1+2x)^2\\) should be collapsed to a binomial first — then it has a clean middle term.",
      formula: {
        label: "Middle term, n even",
        latex: "T_{\\frac{n}{2}+1} = \\binom{n}{n/2}\\, a^{\\,n/2} b^{\\,n/2}",
      },
      authoredExample: {
        prompt: "Find the middle term of \\(\\left(\\dfrac{x}{2} + 2\\right)^8\\).",
        steps: [
          "\\(n = 8\\) is even, so the single middle term is \\(T_5\\) (\\(r = 4\\)).",
          "\\(T_5 = \\binom{8}{4}\\left(\\tfrac{x}{2}\\right)^4 (2)^4 = 70 \\cdot \\tfrac{x^4}{16} \\cdot 16\\).",
        ],
        answer: "\\(70\\,x^4\\).",
      },
      traps: [
        {
          title: "Odd n has two middle terms",
          body:
            "For odd \\(n\\) the question may ask for \"the middle term\" expecting BOTH, or the ratio of the two. Count \\(n+1\\) terms and find the two central positions; don't report just one.",
        },
      ],
    },

    // 5 — term independent of x
    {
      kind: "formula" as const,
      slug: "bt-term-independent-of-x",
      name: "The Term Independent of x (Constant Term)",
      pyqExampleId: "6e5640e9-6720-4e42-9c8f-9d13a3bd3b31",
      intuition:
        "The 'term independent of x' is just the term whose total power of x is zero — the constant. Same method as a specific term, with the target power set to 0.",
      definition:
        "Write \\(T_{r+1}\\), collect the exponent of \\(x\\) into one expression in \\(r\\), and set it to **0**. Solve for \\(r\\); that term is the constant. If \\(r\\) comes out non-integer, there is no term independent of \\(x\\).",
      formula: {
        label: "Constant term condition",
        latex: "\\text{exponent of } x \\text{ in } T_{r+1} = 0 \\ \\Rightarrow\\ r",
      },
      authoredExample: {
        prompt: "Find the term independent of \\(x\\) in \\(\\left(\\dfrac{2}{x^2} - \\sqrt{x}\\right)^{10}\\).",
        steps: [
          "\\(T_{r+1} = \\binom{10}{r}\\left(\\tfrac{2}{x^2}\\right)^{10-r}(-\\sqrt{x})^{r} = \\binom{10}{r} 2^{10-r}(-1)^r x^{-2(10-r) + r/2}\\).",
          "Exponent \\(= -20 + 2r + \\tfrac{r}{2} = 0 \\Rightarrow \\tfrac{5r}{2} = 20 \\Rightarrow r = 8\\).",
          "\\(T_9 = \\binom{10}{8} 2^{2}(-1)^8 = 45 \\cdot 4 = 180\\).",
        ],
        answer: "\\(180\\).",
      },
    },

    // 6 — coefficient conditions
    {
      kind: "formula" as const,
      slug: "bt-coefficient-conditions",
      name: "Conditions Linking Coefficients",
      pyqExampleId: "c11b5c32-90a7-4acb-b1c6-140394450d2c",
      intuition:
        "Many questions impose a relation — two coefficients are equal, the first three terms are given, you want the greatest coefficient. Each becomes an equation in n, r, or the parameters by writing the relevant general terms and comparing.",
      definition:
        "Common condition types:\n" +
        "- **Equal coefficients** of two terms: equate the two general-term coefficients (use \\(\\binom{n}{a}=\\binom{n}{b} \\iff a+b=n\\)).\n" +
        "- **First three terms given** (e.g. \\(1,\\ 12x,\\ 64x^2\\)): read off \\(\\binom{n}{1}a = 12\\) and \\(\\binom{n}{2}a^2 = 64\\), divide to eliminate, solve for \\(n\\).\n" +
        "- **Greatest coefficient** of \\((1+x)^n\\): it is the middle coefficient \\(\\binom{n}{\\lfloor n/2 \\rfloor}\\).\n" +
        "- **Sum of coefficients = value** (e.g. \\(2^n = 256\\)): solve for \\(n\\) first.",
      formula: {
        label: "First-three-terms shape",
        latex: "\\binom{n}{1}a = (\\text{2nd}),\\quad \\binom{n}{2}a^2 = (\\text{3rd}) \\ \\Rightarrow\\ \\text{divide, solve } n",
      },
      authoredExample: {
        prompt: "In \\((1+x)^n\\) the coefficients of the 5th and 9th terms are equal. Find \\(n\\).",
        steps: [
          "The 5th term coefficient is \\(\\binom{n}{4}\\); the 9th is \\(\\binom{n}{8}\\).",
          "Equal coefficients: \\(\\binom{n}{4} = \\binom{n}{8}\\), and by symmetry that needs \\(4 + 8 = n\\).",
        ],
        answer: "\\(n = 12\\).",
      },
    },

    // 7 — counting terms in products/powers
    {
      kind: "formula" as const,
      slug: "bt-counting-terms-products",
      name: "Counting Terms in Products and Powers",
      pyqExampleId: "8d8ff22b-ea31-48ac-ba95-7af7bc22170d",
      intuition:
        "\"How many terms?\" questions are traps unless you simplify the structure first. Multiply conjugate factors, recognise a perfect square, or spot a trinomial — the simplified form has a clean, countable number of terms.",
      definition:
        "Simplify before counting:\n" +
        "- **Conjugate product:** \\((a+b)(a-b) = a^2 - b^2\\), so \\((a+b)^k(a-b)^k = (a^2-b^2)^k\\) has \\(k+1\\) terms.\n" +
        "- **Perfect-square trinomial:** \\(1 + 2x + x^2 = (1+x)^2\\); collapse, then count.\n" +
        "- **Genuine trinomial** \\((a+b+c)^n\\): the number of distinct terms is \\(\\binom{n+2}{2}\\).\n" +
        "- **Sum/difference of two expansions** \\((a+b)^n \\pm (a-b)^n\\): like powers either add or cancel — count only the survivors.",
      formula: {
        label: "Distinct terms of a trinomial power",
        latex: "(a+b+c)^n \\ \\longrightarrow\\ \\binom{n+2}{2}\\ \\text{distinct terms}",
      },
      authoredExample: {
        prompt: "How many terms are in the expansion of \\((3x-y)^4 (x+3y)^4\\)?",
        steps: [
          "Combine the equal powers: \\((3x-y)^4(x+3y)^4 = [(3x-y)(x+3y)]^4 = (3x^2 + 8xy - 3y^2)^4\\).",
          "That is a trinomial to the 4th power, so the number of distinct terms is \\(\\binom{4+2}{2} = \\binom{6}{2}\\).",
        ],
        answer: "\\(15\\) terms.",
      },
      traps: [
        {
          title: "Multiply the bases before raising the power",
          body:
            "\\((3x-y)^4(x+3y)^4 \\ne\\) \"add the term-counts\". Combine the equal exponents into one base first — \\([(3x-y)(x+3y)]^4\\) — then count.",
        },
      ],
    },

    // 8 — rational terms / general index
    {
      kind: "formula" as const,
      slug: "bt-rational-and-general-index",
      name: "Rational Terms & the General-Index Series",
      pyqExampleId: "d29f8f11-6143-47d0-abf2-5d74de5dd820",
      intuition:
        "When the base has surds, a term is rational only if EVERY fractional exponent lands on a whole number — so you count the values of r that clear all the denominators at once. And for a negative or fractional index, the same general term works as an infinite series with binomial coefficients extended to any power.",
      definition:
        "- **Rational terms:** in \\((p^{1/j} + q^{1/k})^n\\), the general term carries exponents \\(\\tfrac{(n-r)}{j}\\) and \\(\\tfrac{r}{k}\\). A term is rational iff BOTH are integers; count the \\(r\\) in \\(\\{0,\\ldots,n\\}\\) satisfying both divisibility conditions.\n" +
        "- **General index:** for any real \\(m\\) and \\(|x|<1\\), \\((1+x)^m = \\sum_{r\\ge 0} \\binom{m}{r} x^r\\) with \\(\\binom{m}{r} = \\dfrac{m(m-1)\\cdots(m-r+1)}{r!}\\). This is how \\((1 - \\tfrac{x^2}{20})^{-1}\\) becomes a geometric-type series.",
      formula: {
        label: "Rational-term test",
        latex: "\\tfrac{n-r}{j} \\in \\mathbb{Z}\\ \\text{ and }\\ \\tfrac{r}{k} \\in \\mathbb{Z}",
      },
      authoredExample: {
        prompt: "How many rational terms are in \\(\\left(2^{1/3} + 3^{1/2}\\right)^{6}\\)?",
        steps: [
          "General term: \\(\\binom{6}{r} 2^{(6-r)/3} 3^{r/2}\\).",
          "Need \\(\\tfrac{6-r}{3}\\in\\mathbb{Z}\\) (so \\(r\\) a multiple of 3) AND \\(\\tfrac{r}{2}\\in\\mathbb{Z}\\) (so \\(r\\) even).",
          "Both hold when \\(r\\) is a multiple of 6: \\(r = 0, 6\\).",
        ],
        answer: "\\(2\\) rational terms.",
      },
      traps: [
        {
          title: "BOTH exponents must be integers, not just one",
          body:
            "A term is rational only when every surd disappears. Requiring only one of the two fractional exponents to be an integer over-counts — intersect the two conditions.",
        },
      ],
    },
  ],
};
