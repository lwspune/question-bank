import type { SubtopicNote } from "@/app/notes/_types";

export const COUNTING_NUMBERS_AND_FIGURES_NOTE: SubtopicNote = {
  subtopicName: "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
  title: "Counting Numbers and Geometric Figures — Digits, Divisibility, Points and Polygons",
  oneLineDefinition:
    "Count numbers by fixing the constrained digit first (no leading zero, last digits for divisibility), and count figures from points by nCr minus the degenerate collinear choices.",
  whyItMatters:
    "11 PYQs at 36% HARD, and the most mechanical page in the chapter. " +
    "Digit stems test divisibility by 3 (digit sum), by 25 (last two digits) and the leading-zero exclusion; figure stems are nC2 handshakes and diagonals, nC3 triangles with collinear points removed, and the greatest number of intersections of lines and circles. " +
    "The two HARD outliers — a gcd-with-36 count and triangles using no polygon side — are inclusion–exclusion in disguise.",
  concepts: [
    // 1 — digits with leading zero and divisibility
    {
      kind: "formula" as const,
      slug: "cetpc-digit-counting-leading-zero-and-divisibility",
      name: "Digit Counting: No Leading Zero, and Divisibility by the Last Digits or the Digit Sum",
      intuition:
        "Fix the most constrained digit first. A leading position cannot be \\(0\\); divisibility by \\(25\\) fixes the last two digits; divisibility by \\(3\\) constrains WHICH digits are used, via their sum, not where they go.",
      definition:
        "- **No leading zero**: five-digit numbers from \\(\\{0, 1, 2, 4, 5\\}\\) without repetition: \\(5! - 4! = 96\\) (subtract those starting with \\(0\\)), or \\(4 \\times 4!\\) directly.\n" +
        "- **By 3**: choose \\(5\\) of \\(\\{0,\\dots,5\\}\\) (sum \\(15\\)) with digit-sum a multiple of \\(3\\): drop \\(0\\) or drop \\(3\\). \\(\\{1,2,3,4,5\\}\\): \\(120\\); \\(\\{0,1,2,4,5\\}\\): \\(96\\). Total \\(216\\).\n" +
        "- **By 25**: last two digits \\(25\\) or \\(75\\) from \\(\\{1,\\dots,7\\}\\); first two from the remaining \\(5\\): \\(2 \\times {}^5P_2 = 40\\).\n" +
        "- **Greater than a million** from \\(2,3,0,3,4,2,3\\): seven digits, so every arrangement not starting with \\(0\\): \\(\\dfrac{7!}{3!\\,2!} - \\dfrac{6!}{3!\\,2!} = 420 - 60 = 360\\).",
      formula: {
        label: "Digit rules",
        latex:
          "3 \\mid n \\iff 3 \\mid \\text{digit sum} \\qquad 25 \\mid n \\iff \\text{last two digits} \\in \\{00, 25, 50, 75\\} \\qquad \\text{leading digit} \\ne 0",
      },
      authoredExample: {
        prompt: "How many four-digit numbers with distinct digits can be formed from \\(\\{0, 1, 2, 3, 4\\}\\) that are divisible by \\(5\\)?",
        steps: [
          "Last digit \\(0\\): the other three from \\(\\{1,2,3,4\\}\\), \\({}^4P_3 = 24\\).",
          "Last digit \\(5\\) is unavailable, so total \\(24\\).",
        ],
        answer: "\\(24\\)",
      },
      selfCheckExample: {
        prompt: "How many four-digit numbers with distinct digits from \\(\\{0, 1, 2, 3, 4, 5\\}\\) are divisible by \\(3\\)?",
        steps: [
          "Four digits with sum divisible by \\(3\\): the sets are \\(\\{0,1,2,3\\}\\), \\(\\{0,1,3,5\\}\\), \\(\\{0,2,3,4\\}\\), \\(\\{0,3,4,5\\}\\), \\(\\{1,2,4,5\\}\\). Check: \\(6, 9, 9, 12, 12\\).",
          "Sets with \\(0\\): \\(4 \\times (4! - 3!) = 4 \\times 18 = 72\\); the set without \\(0\\): \\(24\\). Total \\(96\\).",
        ],
        answer: "\\(96\\)",
      },
      practiceSet: [
        {
          prompt: "Three-digit numbers with distinct digits from \\(\\{0,1,2,3\\}\\)?",
          answer: "\\(18\\)",
          method: "\\(3 \\times 3 \\times 2\\).",
        },
        {
          prompt: "Numbers from all of \\(1,2,3,4,5\\) divisible by \\(5\\)?",
          answer: "\\(24\\)",
        },
        {
          prompt: "Is \\(\\{0,1,2,4,5\\}\\) usable for a multiple of \\(3\\)?",
          answer: "Yes — sum \\(12\\).",
        },
        {
          prompt: "Numbers \\(> 1000\\) from all of \\(1,2,3,4\\)?",
          answer: "\\(24\\)",
        },
      ],
      pyqExampleId: "1cf531e9-a16f-4234-9667-ced080d24623",
      traps: [
        {
          title: "Keeping the leading zero",
          body:
            "\\(\\{0,1,2,4,5\\}\\) gives \\(96\\) numbers, not \\(120\\); the total is \\(216\\), and \\(240\\) — option (B) — is the count that forgot the zero.",
        },
      ],
    },

    // 2 — gcd / inclusion-exclusion
    {
      kind: "formula" as const,
      slug: "cetpc-inclusion-exclusion-on-multiples",
      name: "Inclusion–Exclusion on Multiples: gcd Conditions",
      intuition:
        "'gcd with \\(36\\) is \\(2\\)' means divisible by \\(2\\), not by \\(4\\), not by \\(3\\). Count the multiples of \\(2\\) in range, then remove those divisible by \\(4\\) or by \\(3\\), adding back the ones divisible by both.",
      definition:
        "- Multiples of \\(d\\) in \\([a, b]\\): \\(\\left\\lfloor \\dfrac{b}{d} \\right\\rfloor - \\left\\lfloor \\dfrac{a - 1}{d} \\right\\rfloor\\). Three-digit multiples of \\(2\\): \\(450\\); of \\(6\\): \\(150\\); of \\(4\\): \\(225\\); of \\(12\\): \\(75\\).\n" +
        "- \\(\\gcd(n, 36) = 2\\): \\(450 - (150 + 225 - 75) = 150\\).\n" +
        "- The template: \\(|A \\cup B| = |A| + |B| - |A \\cap B|\\), and the wanted set is the base set minus \\(|A \\cup B|\\).\n" +
        "- Translate a gcd condition into 'divisible by these, not by those' before counting; \\(36 = 2^2\\cdot3^2\\) is the whole content of the stem.",
      formula: {
        label: "Inclusion–exclusion",
        latex:
          "|A \\cup B| = |A| + |B| - |A \\cap B|",
      },
      authoredExample: {
        prompt: "How many two-digit numbers are divisible by neither \\(2\\) nor \\(5\\)?",
        steps: [
          "Two-digit numbers: \\(90\\). By \\(2\\): \\(45\\); by \\(5\\): \\(18\\); by \\(10\\): \\(9\\).",
          "\\(90 - (45 + 18 - 9) = 36\\).",
        ],
        answer: "\\(36\\)",
      },
      selfCheckExample: {
        prompt: "How many two-digit numbers \\(n\\) have \\(\\gcd(n, 12) = 3\\)?",
        steps: [
          "Divisible by \\(3\\), not by \\(2\\) (else the gcd is at least \\(6\\)): multiples of \\(3\\) from \\(10\\) to \\(99\\): \\(30\\); of these, multiples of \\(6\\): \\(15\\).",
        ],
        answer: "\\(15\\)",
      },
      practiceSet: [
        {
          prompt: "Multiples of \\(6\\) between \\(100\\) and \\(999\\)?",
          answer: "\\(150\\)",
        },
        {
          prompt: "Multiples of \\(12\\) between \\(100\\) and \\(999\\)?",
          answer: "\\(75\\)",
        },
        {
          prompt: "\\(\\gcd(n, 36) = 2\\) means?",
          answer: "\\(2 \\mid n\\), \\(4 \\nmid n\\), \\(3 \\nmid n\\).",
        },
        {
          prompt: "Numbers \\(\\le 30\\) divisible by \\(2\\) or \\(3\\)?",
          answer: "\\(20\\)",
          method: "\\(15 + 10 - 5\\).",
        },
      ],
      pyqExampleId: "ec21d3fe-aea2-4d8b-9fe9-83be4f694ba9",
      traps: [
        {
          title: "Forgetting the add-back",
          body:
            "Subtracting the multiples of \\(4\\) and of \\(6\\) without adding back the multiples of \\(12\\) gives \\(75\\), not \\(150\\). Every two-condition removal has an intersection to restore.",
        },
      ],
    },

    // 3 — handshakes, diagonals, nC2 equations
    {
      kind: "formula" as const,
      slug: "cetpc-handshakes-diagonals-and-nc2-equations",
      name: "Handshakes, Diagonals and Triangle Counts: Solve an nC2 or nC3 Equation",
      intuition:
        "Every pair of people is one handshake, so \\({}^nC_2 = 45\\) gives \\(n\\). A polygon's diagonals are the pairs of vertices minus the sides: \\({}^nC_2 - n = \\dfrac{n(n-3)}{2}\\). Triangles from \\(n\\) vertices are \\({}^nC_3\\), and the step \\(T_{n+1} - T_n = {}^nC_2\\).",
      definition:
        "- \\({}^nC_2 = 45 \\Rightarrow n(n-1) = 90 \\Rightarrow n = 10\\). Factor \\(90 = 10 \\times 9\\) rather than solving the quadratic.\n" +
        "- Diagonals \\(\\dfrac{n(n-3)}{2} = 54 \\Rightarrow n^2 - 3n - 108 = 0 \\Rightarrow (n - 12)(n + 9) = 0\\), \\(n = 12\\).\n" +
        "- \\(T_n = {}^nC_3\\), so \\(T_{n+1} - T_n = {}^nC_2\\) by Pascal; \\(= 21 \\Rightarrow n = 7\\).\n" +
        "- **Intersections**: \\(m\\) lines meet in at most \\({}^mC_2\\) points; \\(c\\) circles in at most \\(2\\,{}^cC_2\\); each line–circle pair in at most \\(2\\). \\(8\\) lines and \\(4\\) circles: \\(28 + 12 + 64 = 104\\).",
      formula: {
        label: "Pairs and triples",
        latex:
          "\\text{handshakes} = {}^nC_2 \\qquad \\text{diagonals} = \\frac{n(n-3)}{2} \\qquad {}^{n+1}C_3 - {}^nC_3 = {}^nC_2",
      },
      visualizationSlug: "pc-geometric-counting-diagram",
      authoredExample: {
        prompt: "A polygon has \\(35\\) diagonals. How many sides does it have?",
        steps: [
          "\\(\\dfrac{n(n-3)}{2} = 35 \\Rightarrow n^2 - 3n - 70 = 0 \\Rightarrow (n - 10)(n + 7) = 0\\).",
        ],
        answer: "\\(10\\)",
      },
      selfCheckExample: {
        prompt: "At a party every person shook hands with every other person exactly once and there were \\(66\\) handshakes. How many people were present?",
        steps: [
          "\\({}^nC_2 = 66 \\Rightarrow n(n-1) = 132 = 12 \\times 11\\).",
        ],
        answer: "\\(12\\)",
      },
      practiceSet: [
        {
          prompt: "Diagonals of a hexagon?",
          answer: "\\(9\\)",
        },
        {
          prompt: "Handshakes among \\(8\\) people?",
          answer: "\\(28\\)",
        },
        {
          prompt: "Max intersections of \\(6\\) lines?",
          answer: "\\(15\\)",
        },
        {
          prompt: "Max intersections of \\(3\\) circles?",
          answer: "\\(6\\)",
        },
      ],
      pyqExampleId: "b34a1aa8-1f50-42e1-8743-2c0d4dc6370a",
      traps: [
        {
          title: "Counting the sides as diagonals",
          body:
            "\\({}^nC_2\\) includes the \\(n\\) sides. Setting \\({}^nC_2 = 54\\) has no integer solution; the diagonals are \\({}^nC_2 - n\\).",
        },
      ],
    },

    // 4 — figures from points with collinear subsets
    {
      kind: "formula" as const,
      slug: "cetpc-figures-from-points-with-collinear-subsets",
      name: "Triangles and Quadrilaterals From Points: Subtract the Collinear Choices",
      intuition:
        "Any \\(3\\) of \\(n\\) points make a triangle unless they are collinear; any \\(4\\) make a quadrilateral unless \\(3\\) or \\(4\\) of them are collinear. Count \\({}^nC_k\\) and subtract the degenerate picks. For 'triangles using no side of a polygon', subtract the triangles that use one or two sides.",
      definition:
        "- \\(11\\) points, \\(5\\) collinear, quadrilaterals: \\({}^{11}C_4 - {}^5C_3\\,{}^6C_1 - {}^5C_4 = 330 - 60 - 5 = 265\\).\n" +
        "- Triangles from \\(n\\) points with \\(m\\) collinear: \\({}^nC_3 - {}^mC_3\\). Lines: \\({}^nC_2 - {}^mC_2 + 1\\).\n" +
        "- **Regular \\(20\\)-gon, triangles using no side**: total \\({}^{20}C_3 = 1140\\); using two sides (three consecutive vertices) \\(20\\); using exactly one side: \\(20\\) sides \\(\\times\\) \\(16\\) non-adjacent third vertices \\(= 320\\); none: \\(1140 - 20 - 320 = 800\\).\n" +
        "- General \\(n\\)-gon, no side: \\({}^nC_3 - n - n(n - 4) = \\dfrac{n(n-4)(n-5)}{6}\\); check \\(n = 20\\): \\(\\dfrac{20 \\cdot 16 \\cdot 15}{6} = 800\\).",
      formula: {
        label: "Degenerate subtraction",
        latex:
          "\\triangle = {}^nC_3 - {}^mC_3 \\qquad \\text{no-side triangles of an } n\\text{-gon} = \\frac{n(n-4)(n-5)}{6}",
      },
      authoredExample: {
        prompt: "There are \\(10\\) points in a plane, of which \\(4\\) are collinear. How many triangles have their vertices among these points?",
        steps: [
          "\\({}^{10}C_3 - {}^4C_3 = 120 - 4 = 116\\).",
        ],
        answer: "\\(116\\)",
      },
      selfCheckExample: {
        prompt: "How many triangles can be drawn using the vertices of a regular octagon such that no side of the triangle is a side of the octagon?",
        steps: [
          "\\(\\dfrac{8 \\cdot 4 \\cdot 3}{6} = 16\\). Check: \\({}^8C_3 = 56\\); two sides \\(8\\); one side \\(8 \\times 4 = 32\\); \\(56 - 40 = 16\\).",
        ],
        answer: "\\(16\\)",
      },
      practiceSet: [
        {
          prompt: "Lines through \\(8\\) points, \\(3\\) collinear?",
          answer: "\\(26\\)",
          method: "\\(28 - 3 + 1\\).",
        },
        {
          prompt: "Triangles from \\(8\\) points, \\(3\\) collinear?",
          answer: "\\(55\\)",
        },
        {
          prompt: "Triangles of a hexagon using no side?",
          answer: "\\(2\\)",
        },
        {
          prompt: "\\({}^5C_3 \\cdot {}^6C_1 = ?\\)",
          answer: "\\(60\\)",
        },
      ],
      pyqExampleId: "8bcb9f0a-2859-496b-b0c9-e0f11dcd7bd1",
      traps: [
        {
          title: "Subtracting only the all-collinear picks",
          body:
            "For quadrilaterals, \\(3\\) collinear points plus any fourth is ALSO degenerate. \\(330 - 5 = 325\\) is option (D); the answer is \\(265\\).",
        },
      ],
    },
  ],
  related: [
    {
      label: "Selections with Conditions — the complement, which every degenerate subtraction is",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-selections-with-conditions",
    },
    {
      label: "Fundamental Principle, nPr and nCr — Pascal's rule behind T(n+1) − T(n)",
      href: "/notes/mht-cet-maths/permutations-and-combinations/cetpc-fundamentals",
    },
  ],
};
