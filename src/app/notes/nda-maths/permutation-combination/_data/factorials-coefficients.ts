import type { SubtopicNote } from "@/app/notes/_types";

export const FACTORIALS_COEFFICIENTS_NOTE: SubtopicNote = {
  subtopicName: "Factorials and Binomial Coefficients",
  title: "Factorials & Binomial Coefficients",
  oneLineDefinition:
    "The building blocks of counting: the fundamental principle, factorials and their divisibility, and the nCr identities (symmetry, Pascal's rule, and the P–C relation).",
  whyItMatters:
    "Every counting problem reduces to factorials and nCr. Knowing the identities — Pascal's rule, the symmetry of nCr, and trailing-zero counting — turns the chapter's algebraic questions into one-liners.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "pc-fundamental-counting",
      name: "The fundamental principle of counting",
      intuition:
        "If a first task can be done in \\(m\\) ways and a second (independent) task in \\(n\\) ways, the pair can be done in \\(m\\times n\\) ways — multiply for 'and', add for 'or'. This single rule generates permutations and combinations.",
      definition:
        "**Multiplication rule:** independent successive choices multiply. **Addition rule:** mutually exclusive alternatives add. **Permutation** (order matters): \\(^nP_r=\\dfrac{n!}{(n-r)!}\\). **Combination** (order doesn't): \\(^nC_r=\\dfrac{n!}{r!(n-r)!}\\). The link: \\(^nP_r=\\,^nC_r\\cdot r!\\).",
      formula: {
        label: "Permutations, combinations, and their link",
        latex: "^nP_r=\\dfrac{n!}{(n-r)!} \\qquad ^nC_r=\\dfrac{n!}{r!\\,(n-r)!} \\qquad ^nP_r=\\,^nC_r\\cdot r!",
      },
      authoredExample: {
        prompt: "A menu has 3 starters and 4 mains. How many starter+main meals are possible?",
        steps: [
          "Independent choices ⇒ multiply.",
          "\\(3\\times 4=12\\).",
        ],
        answer: "\\(12\\).",
      },
      selfCheckExample: {
        prompt: "How many ways to pick a chairperson then a secretary from 6 people?",
        steps: [
          "Order matters (two distinct roles): \\(^6P_2=6\\times 5\\).",
        ],
        answer: "\\(30\\).",
      },
      practiceSet: [
        { prompt: "'And' (independent steps) → which operation?", answer: "Multiply" },
        { prompt: "'Or' (exclusive alternatives) → which operation?", answer: "Add" },
        { prompt: "\\(^nP_r=\\)?", answer: "\\(\\dfrac{n!}{(n-r)!}\\)" },
        { prompt: "Relation between \\(^nP_r\\) and \\(^nC_r\\)?", answer: "\\(^nP_r=\\,^nC_r\\cdot r!\\)" },
      ],
      traps: [
        {
          title: "Permutation vs combination — does order matter?",
          body: "Picking a **chairperson and a secretary** from \\(n\\) people is a **permutation** (\\(^nP_2\\), the two roles are distinct) — but picking a **2-person committee** is a **combination** (\\(^nC_2\\)). Always ask: 'does swapping the two chosen items give a *different* outcome?' If yes, use \\(^nP_r\\); if no, use \\(^nC_r=\\,^nP_r/r!\\).",
        },
      ],
    },

    {
      kind: "formula" as const,
      slug: "pc-factorial-properties",
      name: "Factorials: divisibility and trailing zeros",
      intuition:
        "Factorials grow by absorbing every integer up to \\(n\\), so questions exploit their divisibility: \\(n!\\) is divisible by everything \\(\\le n\\), and its trailing zeros count the factors of 5. For a sum of factorials mod \\(k\\), only the small terms survive.",
      definition:
        "\\(n!=1\\cdot2\\cdots n\\). **Trailing zeros** of \\(n!\\) \\(=\\lfloor n/5\\rfloor+\\lfloor n/25\\rfloor+\\cdots\\) (count factors of 5). **Sum mod \\(k\\):** for \\(n!\\) with \\(n\\) large enough, \\(n!\\equiv 0\\), so \\(\\sum n!\\bmod k\\) depends only on the first few terms (e.g. mod 8, only \\(0!..3!\\) matter).",
      formula: {
        label: "Trailing zeros of n!",
        latex: "Z(n!)=\\left\\lfloor\\dfrac{n}{5}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{25}\\right\\rfloor+\\left\\lfloor\\dfrac{n}{125}\\right\\rfloor+\\cdots",
      },
      authoredExample: {
        prompt: "How many trailing zeros does \\(25!\\) have?",
        steps: [
          "\\(\\lfloor 25/5\\rfloor+\\lfloor 25/25\\rfloor=5+1\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "Find the remainder when \\(1!+2!+3!+\\cdots+50!\\) is divided by \\(8\\).",
        steps: [
          "For \\(n\\ge 4\\), \\(n!\\equiv 0\\pmod 8\\).",
          "Sum \\(\\equiv 1!+2!+3!=1+2+6=9\\equiv 1\\pmod 8\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "Trailing zeros of \\(n!\\) count factors of?", answer: "\\(5\\)" },
        { prompt: "Trailing zeros of \\(25!\\)?", answer: "\\(6\\)" },
        { prompt: "For \\(n\\ge 4\\), \\(n!\\bmod 8=\\)?", answer: "\\(0\\)" },
        { prompt: "Is \\(n!\\) divisible by every integer \\(\\le n\\)?", answer: "Yes" },
      ],
      traps: [
        {
          title: "\\(0!=1\\), not \\(0\\)",
          body: "By definition \\(0!=1\\) (it's the empty product, and it makes \\(^nC_n=\\dfrac{n!}{n!\\,0!}=1\\) work). Treating \\(0!=0\\) breaks every \\(^nC_0\\), \\(^nC_n\\), and boundary case — e.g. the number of ways to choose **0** objects is \\(^nC_0=1\\) (one way: choose nothing), not \\(0\\).",
        },
      ],
      pyqExampleId: "9593f395-b028-438d-8bc3-837e3cb8beb2", // n! has 17 zeros
    },

    {
      kind: "formula" as const,
      slug: "pc-binomial-coefficient-identities",
      name: "Binomial coefficient identities",
      intuition:
        "The \\(nC_r\\) identities let you collapse messy expressions: symmetry pairs equal coefficients, and Pascal's rule telescopes sums of consecutive coefficients into a single term.",
      definition:
        "- **Symmetry:** \\(^nC_r=\\,^nC_{n-r}\\); so \\(^nC_x=\\,^nC_y\\Rightarrow x=y\\) or \\(x+y=n\\).\n" +
        "- **Pascal's rule:** \\(^nC_r+\\,^nC_{r-1}=\\,^{n+1}C_r\\) (telescopes sums of consecutive coefficients).\n" +
        "- **P–C link:** \\(^nP_r=\\,^nC_r\\cdot r!\\) (recover \\(r\\) from \\(P/C=r!\\)).\n" +
        "- **AP of coefficients:** \\(^nC_4,\\,^nC_5,\\,^nC_6\\) in AP gives a quadratic in \\(n\\).",
      formula: {
        label: "Binomial coefficient identities",
        latex: "^nC_r=\\,^nC_{n-r} \\qquad ^nC_r+\\,^nC_{r-1}=\\,^{n+1}C_r \\qquad \\sum_{r=0}^{n}{}^nC_r=2^n \\qquad r\\cdot{}^nC_r=n\\cdot{}^{n-1}C_{r-1}",
      },
      authoredExample: {
        prompt: "If \\(^nC_8=\\,^nC_{12}\\), find \\(n\\).",
        steps: [
          "Symmetry: \\(8+12=n\\).",
          "\\(n=20\\).",
        ],
        answer: "\\(20\\).",
      },
      selfCheckExample: {
        prompt: "If \\(P(n,r)=2520\\) and \\(C(n,r)=21\\), find \\(r\\).",
        steps: [
          "\\(r!=\\dfrac{P}{C}=\\dfrac{2520}{21}=120\\Rightarrow r=5\\).",
        ],
        answer: "\\(r=5\\).",
      },
      practiceSet: [
        { prompt: "\\(^nC_r=\\,^nC_{n-r}\\) is which property?", answer: "Symmetry" },
        { prompt: "Pascal's rule: \\(^nC_r+\\,^nC_{r-1}=\\)?", answer: "\\(^{n+1}C_r\\)" },
        { prompt: "\\(^nC_8=\\,^nC_{12}\\Rightarrow n=\\)?", answer: "\\(20\\)" },
        { prompt: "Recover \\(r\\) from \\(P(n,r)\\) and \\(C(n,r)\\)?", answer: "\\(r!=P/C\\)" },
      ],
      pyqExampleId: "17c5f073-a5f1-416b-8e28-5fb3193e6867", // Pascal brackets sum
    },
  ],
  related: [
    { label: "Arrangements with Restrictions", href: "/notes/nda-maths/permutation-combination/pc-arrangements" },
    { label: "NDA Maths strategy guide", href: "/guide/nda-maths" },
  ],
};
