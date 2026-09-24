import type { SubtopicNote } from "@/app/notes/_types";

export const FUNDAMENTALS_NOTE: SubtopicNote = {
  subtopicName: "Fundamental Principle, nPr and nCr — Definitions and Identities",
  title: "Fundamental Principle, nPr and nCr — Definitions and Identities",
  oneLineDefinition:
    "Multiply the choices of successive stages; nPr counts ordered selections and nCr unordered ones — and the identities nCr + nCr−1 = n+1Cr and nCr = nCn−r settle the equation-style stems.",
  whyItMatters:
    "8 PYQs, none HARD — the cheapest page in the chapter and the one the other four assume. " +
    "The recurring stems are a two-stage arrangement written as a product of nPr terms, a ratio of two binomial coefficients set equal to a number, a Pascal-rule inequality, and the domain of a function defined through nPr. " +
    "Each is answered by one identity; the work is choosing which.",
  concepts: [
    // 1 — fundamental principle
    {
      kind: "formula" as const,
      slug: "cetpc-fundamental-principle-of-counting",
      name: "The Fundamental Principle: Multiply Stages, Add Alternatives",
      intuition:
        "If a task is done in stages and the first stage has \\(m\\) ways and the second \\(n\\) ways (whatever happened first), the task has \\(mn\\) ways. If instead the task is done in one of two mutually exclusive ways, add.",
      definition:
        "- **Multiplication**: stages in sequence — women choose \\(2\\) of chairs \\(1\\)–\\(4\\) in \\({}^4P_2\\) ways, THEN men choose \\(3\\) of the remaining \\(6\\) in \\({}^6P_3\\) ways: \\({}^4P_2 \\times {}^6P_3\\).\n" +
        "- **Addition**: alternatives that cannot both happen — a number ending in \\(25\\) OR ending in \\(75\\).\n" +
        "- The test for multiplication: does the count of the second stage depend on WHICH first-stage choice was made? If not, multiply. (The men's count is \\(6\\) chairs whichever \\(2\\) the women took.)\n" +
        "- 'Select and then arrange' is two stages: \\({}^7C_3 \\times {}^4C_2\\) picks \\(3\\) consonants and \\(2\\) vowels, then \\(5!\\) arranges the five letters chosen: \\(35 \\times 6 \\times 120 = 25{,}200\\).",
      formula: {
        label: "Fundamental principle",
        latex:
          "\\text{stages: } m \\times n \\qquad \\text{alternatives: } m + n",
      },
      authoredExample: {
        prompt: "A password is one letter from \\(\\{A, B, C\\}\\) followed by two different digits from \\(\\{1, 2, 3, 4, 5\\}\\). How many passwords are there?",
        steps: [
          "Stage 1, the letter: \\(3\\) ways. Stage 2, an ordered pair of different digits: \\({}^5P_2 = 20\\) ways.",
          "Multiply: \\(3 \\times 20 = 60\\).",
        ],
        answer: "\\(60\\)",
      },
      selfCheckExample: {
        prompt: "From \\(5\\) teachers and \\(6\\) students, a committee of \\(2\\) teachers and \\(3\\) students is chosen and then one of the five is named convener. How many ways?",
        steps: [
          "Choose: \\({}^5C_2 \\times {}^6C_3 = 10 \\times 20 = 200\\).",
          "Then a convener from the \\(5\\) chosen: \\(200 \\times 5 = 1000\\).",
        ],
        answer: "\\(1000\\)",
      },
      practiceSet: [
        {
          prompt: "\\(3\\) shirts and \\(4\\) trousers: outfits?",
          answer: "\\(12\\)",
        },
        {
          prompt: "Two-digit numbers with distinct digits from \\(\\{1,2,3,4\\}\\)?",
          answer: "\\(12\\)",
          method: "\\({}^4P_2\\).",
        },
        {
          prompt: "A coin tossed \\(4\\) times: outcomes?",
          answer: "\\(16\\)",
        },
        {
          prompt: "Choose a vowel from \\(5\\) OR a consonant from \\(21\\)?",
          answer: "\\(26\\)",
        },
      ],
      pyqExampleId: "045b974d-56bd-4660-a63e-3c95f9f1afa1",
      traps: [
        {
          title: "Adding stages",
          body:
            "\\({}^4P_2 + {}^6P_3\\) is offered as an option. Stages that BOTH happen multiply; only mutually exclusive alternatives add.",
        },
      ],
    },

    // 2 — nPr and nCr definitions
    {
      kind: "formula" as const,
      slug: "cetpc-npr-and-ncr-definitions",
      name: "nPr and nCr: Ordered Versus Unordered, and When They Are Defined",
      intuition:
        "\\({}^nC_r\\) picks \\(r\\) of \\(n\\) with no regard to order; \\({}^nP_r = {}^nC_r \\cdot r!\\) then lines them up. Both need \\(0 \\le r \\le n\\) with \\(n, r\\) whole numbers — which is itself a question when \\(n\\) and \\(r\\) are expressions in \\(x\\).",
      definition:
        "- \\({}^nP_r = \\dfrac{n!}{(n - r)!}\\), \\({}^nC_r = \\dfrac{n!}{r!\\,(n - r)!}\\), \\({}^nP_r = r!\\,{}^nC_r\\).\n" +
        "- **Defined only for** whole numbers \\(n \\ge r \\ge 0\\). The domain of \\(f(x) = {}^{7 - x}P_{x - 1}\\): \\(x - 1 \\ge 0\\), \\(7 - x \\ge x - 1\\), \\(x\\) an integer — so \\(x \\in \\{1, 2, 3, 4\\}\\), a four-element set, not an interval.\n" +
        "- 'Always include \\(6\\), always exclude \\(5\\)' from \\(25\\) for a team of \\(11\\): the pool shrinks to \\(25 - 6 - 5 = 14\\) and the choice to \\(11 - 6 = 5\\): \\({}^{14}C_5 = 2002\\).\n" +
        "- Small values worth knowing cold: \\({}^nC_2 = \\dfrac{n(n-1)}{2}\\), \\({}^nC_3 = \\dfrac{n(n-1)(n-2)}{6}\\), \\({}^nC_1 = n\\), \\({}^nC_0 = {}^nC_n = 1\\).",
      formula: {
        label: "Definitions",
        latex:
          "{}^nP_r = \\frac{n!}{(n-r)!} \\qquad {}^nC_r = \\frac{n!}{r!\\,(n-r)!} \\qquad {}^nP_r = r!\\,{}^nC_r \\qquad (0 \\le r \\le n)",
      },
      authoredExample: {
        prompt: "Find the domain of \\(f(x) = {}^{9 - x}C_{x - 2}\\).",
        steps: [
          "Need \\(x - 2 \\ge 0\\), so \\(x \\ge 2\\); need \\(9 - x \\ge x - 2\\), so \\(2x \\le 11\\), \\(x \\le 5\\); and \\(x\\) an integer.",
        ],
        answer: "\\(\\{2, 3, 4, 5\\}\\)",
      },
      selfCheckExample: {
        prompt: "A team of \\(9\\) is chosen from \\(20\\) players; \\(4\\) named players must be in and \\(3\\) named players must be out. How many teams?",
        steps: [
          "Pool \\(20 - 4 - 3 = 13\\); still to pick \\(9 - 4 = 5\\): \\({}^{13}C_5 = 1287\\).",
        ],
        answer: "\\(1287\\)",
      },
      practiceSet: [
        {
          prompt: "\\({}^6P_2 = ?\\)",
          answer: "\\(30\\)",
        },
        {
          prompt: "\\({}^6C_2 = ?\\)",
          answer: "\\(15\\)",
        },
        {
          prompt: "\\({}^{10}C_3 = ?\\)",
          answer: "\\(120\\)",
        },
        {
          prompt: "Is \\({}^{3}C_{5}\\) defined?",
          answer: "No — \\(r > n\\).",
        },
      ],
      pyqExampleId: "c338359e-b38b-4ff5-92fc-b9c01fa7c5ed",
      traps: [
        {
          title: "Reporting an interval as the domain of nPr",
          body:
            "\\(1 \\le x \\le 4\\) is right as an inequality but the domain is the INTEGERS in it, \\(\\{1, 2, 3, 4\\}\\). Option (A) '\\(\\mathbb{R}\\)' and option (B) '\\(\\mathbb{R} - \\{1\\}\\)' exist for readers who forget \\(n\\) and \\(r\\) must be whole numbers.",
        },
      ],
    },

    // 3 — identities
    {
      kind: "formula" as const,
      slug: "cetpc-binomial-coefficient-identities",
      name: "Identities: Pascal's Rule, Symmetry and the Ratio of Consecutive Coefficients",
      intuition:
        "Three identities cover every equation-style stem: \\({}^nC_r = {}^nC_{n-r}\\) (choosing \\(r\\) to keep is choosing \\(n - r\\) to drop), Pascal's \\({}^nC_r + {}^nC_{r-1} = {}^{n+1}C_r\\), and the ratio \\(\\dfrac{{}^nC_r}{{}^nC_{r-1}} = \\dfrac{n - r + 1}{r}\\).",
      definition:
        "- **Symmetry**: \\({}^{n+4}C_{n+1} = {}^{n+4}C_3\\). Rewrite a large lower index as \\(n - r\\) before doing anything else.\n" +
        "- **Pascal**: \\({}^{n+4}C_3 - {}^{n+3}C_3 = {}^{n+3}C_2 = \\dfrac{(n+3)(n+2)}{2}\\). Set equal to \\(15(n+2)\\): \\(n + 3 = 30\\), \\(n = 27\\). Also \\({}^nC_4 + {}^nC_5 = {}^{n+1}C_5\\).\n" +
        "- **Ratio**: \\(\\dfrac{{}^{n+1}C_5}{{}^{n+1}C_4} = \\dfrac{n + 1 - 4}{5} = \\dfrac{n - 3}{5}\\); '\\(> 1\\)' gives \\(n > 8\\).\n" +
        "- **Greatest coefficient**: \\({}^nC_r\\) is largest at \\(r = \\dfrac{n}{2}\\) (\\(n\\) even) or at both \\(r = \\dfrac{n \\pm 1}{2}\\) (\\(n\\) odd). \\(\\dfrac{{}^{10}C_5}{{}^{11}C_6} = \\dfrac{252}{462} = \\dfrac{6}{11}\\).\n" +
        "- **Two particular items**: chosen together in \\({}^{n-2}C_{r-2}\\) ways, both left out in \\({}^{n-2}C_r\\) ways. Ratio \\(2 : 3\\) with \\(r = 5\\): \\(\\dfrac{{}^{n-2}C_3}{{}^{n-2}C_5} = \\dfrac{5 \\cdot 4}{(n-5)(n-6)} = \\dfrac23 \\Rightarrow (n-5)(n-6) = 30 \\Rightarrow n = 11\\).",
      formula: {
        label: "The three identities",
        latex:
          "{}^nC_r = {}^nC_{n-r} \\qquad {}^nC_r + {}^nC_{r-1} = {}^{n+1}C_r \\qquad \\frac{{}^nC_r}{{}^nC_{r-1}} = \\frac{n - r + 1}{r}",
      },
      authoredExample: {
        prompt: "If \\({}^{n}C_{4} = {}^{n}C_{6}\\), find \\({}^{n}C_{2}\\).",
        steps: [
          "Symmetry: \\({}^nC_4 = {}^nC_6\\) with \\(4 \\ne 6\\) forces \\(4 + 6 = n\\), so \\(n = 10\\).",
          "\\({}^{10}C_2 = 45\\).",
        ],
        answer: "\\(45\\)",
      },
      selfCheckExample: {
        prompt: "If \\({}^{n}C_{3} + {}^{n}C_{2} = 56\\), find \\(n\\).",
        steps: [
          "Pascal: \\({}^{n+1}C_3 = 56 \\Rightarrow \\dfrac{(n+1)n(n-1)}{6} = 56 \\Rightarrow (n+1)n(n-1) = 336 = 8 \\cdot 7 \\cdot 6\\).",
        ],
        answer: "\\(n = 7\\)",
      },
      practiceSet: [
        {
          prompt: "\\({}^{12}C_{10} = ?\\)",
          answer: "\\(66\\)",
          method: "\\(= {}^{12}C_2\\).",
        },
        {
          prompt: "\\({}^{8}C_3 + {}^{8}C_2 = {}^{?}C_{?}\\)",
          answer: "\\({}^9C_3 = 84\\)",
        },
        {
          prompt: "Largest \\({}^{8}C_r\\) occurs at \\(r = ?\\)",
          answer: "\\(4\\)",
        },
        {
          prompt: "\\(\\dfrac{{}^{9}C_4}{{}^{9}C_3} = ?\\)",
          answer: "\\(\\dfrac{6}{4} = \\dfrac32\\)",
        },
      ],
      pyqExampleId: "a3384500-862f-4a15-83c4-5edeb6391d3a",
      traps: [
        {
          title: "Expanding the factorials",
          body:
            "\\({}^{n+4}C_{n+1} - {}^{n+3}C_n\\) written out in factorials is a swamp. Symmetry turns the lower indices into \\(3\\), Pascal collapses the difference to one term, and the equation is quadratic-free.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Arrangements with Constraints — the moves that use nPr in rows",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-arrangements-with-constraints",
    },
    {
      label: "Selections with Conditions — the moves that use nCr with at-least and at-most",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-selections-with-conditions",
    },
  ],
};
