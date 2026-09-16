import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_NS_SQUARES_CUBES_NOTE: SubtopicNote = {
  subtopicName: "Perfect Squares, Cubes and Difference of Squares",
  title: "Perfect Squares, Cubes & Difference of Squares",
  oneLineDefinition:
    "Recognising and building perfect squares — which last digits are possible, how far the nearest square is, and above all how to turn a difference of squares into a factor-pair count with a parity constraint.",
  whyItMatters:
    "Fourteen PYQs, and the difference-of-squares factorisation carries four of them on its own. The rest are recall (a square never ends in 2, 3, 7 or 8) or a nearest-square computation. One HARD question needs the completing-the-square trick, which turns an apparently open search into a two-case factor problem.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsns-square-last-digit",
      name: "The last digit of a perfect square",
      intuition:
        "Square each digit 0 to 9 and look at the last digit of the result: only six values ever appear. So any number ending in 2, 3, 7 or 8 is instantly disqualified as a square, with no arithmetic at all.",
      definition:
        "A perfect square can end only in \\(0, 1, 4, 5, 6\\) or \\(9\\).\n" +
        "- Ending in \\(2, 3, 7\\) or \\(8\\) is **impossible** — this is a complete disqualifier.\n" +
        "- The converse fails: ending in 4 does not make a number a square (14 does not).\n" +
        "- A square's number of divisors is **odd**, and an odd square is \\(\\equiv 1 \\pmod 8\\).",
      table: {
        columns: ["Unit digit of n", "Unit digit of n squared"],
        rows: [
          { cells: ["0", "0"] },
          { cells: ["1 or 9", "1"] },
          { cells: ["2 or 8", "4"] },
          { cells: ["3 or 7", "9"] },
          { cells: ["4 or 6", "6"] },
          {
            cells: ["5", "5"],
            noteAmber:
              "So the possible endings are exactly 0, 1, 4, 5, 6, 9 — and 2, 3, 7, 8 never occur.",
          },
        ],
        caption:
          "Six reachable endings out of ten. The four unreachable ones are the examinable content.",
      },
      selfCheckExample: {
        prompt:
          "Which of 4489, 7442 and 3087 could be perfect squares? Decide without a calculator.",
        steps: [
          "7442 ends in 2 — impossible for a square. Eliminated.",
          "3087 ends in 7 — also impossible. Eliminated.",
          "4489 ends in 9, which is allowed, so it survives the test and needs checking.",
          "\\(67^{2} = 4489\\), so it is indeed a square. Note the digit test only ever **eliminates**; a survivor still has to be verified.",
        ],
        answer: "Only 4489, and it is \\(67^{2}\\).",
      },
      practiceSet: [
        { prompt: "Can a square end in 8?", answer: "No" },
        { prompt: "Possible last digits of a square?", answer: "\\(0,1,4,5,6,9\\)" },
        { prompt: "Is 2222 a perfect square?", answer: "No", method: "Ends in 2" },
        { prompt: "Does ending in 6 make a number a square?", answer: "No", method: "e.g. 26" },
      ],
      pyqExampleId: "eb3dbf2d-8675-46ec-a92f-a89cc8f3e00e", // 2017 — which of 2222, 11664, 343343, 220347 are NOT perfect squares
      traps: [
        {
          title: "The last-digit test only rules out, never rules in",
          body:
            "Of 2222, 11664, 343343 and 220347, the endings 2, 3 and 7 eliminate three immediately — but the survivor 11664 still has to be checked, and it happens to be \\(108^{2}\\). Treat the test as a filter that saves time, not as a proof of squareness.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-nearest-square",
      name: "The nearest perfect square above or below",
      intuition:
        "To find how much to add or subtract to reach a square, locate the two consecutive squares straddling the number. Estimate the root, square the integers either side, and take the difference — two multiplications settle it.",
      definition:
        "Given \\(N\\), find the integer \\(k\\) with \\(k^{2} \\le N < (k+1)^{2}\\). Then:\n" +
        "- the least amount to **subtract** to reach a square is \\(N-k^{2}\\);\n" +
        "- the least amount to **add** is \\((k+1)^{2}-N\\).\n" +
        "The same method works for higher powers — for a fourth power, bracket \\(N\\) between \\(m^{4}\\) and \\((m+1)^{4}\\).\n" +
        "Useful landmarks: \\(30^2=900\\), \\(40^2=1600\\), \\(70^2=4900\\), \\(90^2=8100\\), \\(100^2=10000\\).",
      formula: {
        label: "Distance to the neighbouring squares",
        latex: "k^{2}\\le N<(k+1)^{2}: \\quad \\text{subtract } N-k^{2}, \\quad \\text{add } (k+1)^{2}-N",
      },
      authoredExample: {
        prompt:
          "What is the least number that must be added to 5000 to make it a perfect square?",
        steps: [
          "Estimate the root: \\(70^{2} = 4900\\) and \\(71^{2} = 5041\\), so 5000 lies between them.",
          "The next square up is 5041.",
          "So the least amount to add is \\(5041-5000 = 41\\).",
          "For contrast, the least to **subtract** would be \\(5000-4900 = 100\\).",
        ],
        answer: "\\(41\\).",
      },
      selfCheckExample: {
        prompt:
          "What is the least number that must be subtracted from 2000 to make it a perfect square?",
        steps: [
          "Bracket it: \\(44^{2} = 1936\\) and \\(45^{2} = 2025\\).",
          "Since \\(2025 > 2000\\), the largest square not exceeding 2000 is 1936.",
          "So subtract \\(2000-1936 = 64\\).",
          "Check: \\(2000-64 = 1936 = 44^{2}\\).",
        ],
        answer: "\\(64\\).",
      },
      practiceSet: [
        { prompt: "Smallest 4-digit perfect square?", answer: "\\(1024\\)", method: "\\(32^2\\); \\(31^2=961\\)" },
        { prompt: "Least to subtract from 9410 for a square?", answer: "\\(1\\)", method: "\\(97^2=9409\\)" },
        { prompt: "\\(21^4\\)?", answer: "\\(194481\\)" },
        { prompt: "Least to add to 194480 for a fourth power?", answer: "\\(1\\)" },
      ],
      pyqExampleId: "c2ce1576-c5e7-4974-a65b-4f4511e6e7da", // 2022 — smallest number subtracted from 9410 to make a perfect square
      traps: [
        {
          title: "The number itself may not be a square even when it looks round",
          body:
            "The smallest four-digit number is 1000, and it is tempting to answer 1000 for \"smallest four-digit perfect square\". But 1000 is not a square: \\(31^2=961\\) has three digits and \\(32^2=1024\\) has four, so the answer is 1024. Bracket with actual squares rather than trusting the round number.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-difference-of-squares",
      name: "Difference of squares and the parity constraint on factor pairs",
      intuition:
        "\\(m^{2}-n^{2} = (m-n)(m+n)\\), so asking which numbers are a difference of squares is asking how to split a number into two factors. The catch is that the two factors must have the **same parity**, because their sum \\(2m\\) is even — and that constraint is what makes the count come out small.",
      definition:
        "Set \\(m^{2}-n^{2}=N\\), so \\((m-n)(m+n)=N\\). Write \\(N = uv\\) with \\(u<v\\); then\n" +
        "\\[m=\\frac{u+v}{2}, \\qquad n=\\frac{v-u}{2},\\]\n" +
        "which are integers **only if \\(u\\) and \\(v\\) have the same parity**.\n" +
        "- \\(N\\) **odd**: every factor pair is odd-odd, so all pairs work.\n" +
        "- \\(N \\equiv 0 \\pmod 4\\): only the even-even pairs work.\n" +
        "- \\(N \\equiv 2 \\pmod 4\\): **no** pairs work, so such an \\(N\\) is never a difference of squares.\n" +
        "The same setup solves \\(n^{2}+c = m^{2}\\), which rearranges to \\((m-n)(m+n)=c\\).",
      formula: {
        label: "Difference of squares",
        latex: "m^{2}-n^{2}=(m-n)(m+n)",
      },
      authoredExample: {
        prompt:
          "How many pairs of natural numbers have squares differing by 45?",
        steps: [
          "Write \\((m-n)(m+n)=45\\). Since 45 is odd, every factor pair is odd-odd, so the parity condition is automatic.",
          "Factor pairs with \\(u<v\\): \\((1,45)\\), \\((3,15)\\), \\((5,9)\\).",
          "Convert each: \\((1,45)\\to m=23,\\ n=22\\); \\((3,15)\\to m=9,\\ n=6\\); \\((5,9)\\to m=7,\\ n=2\\).",
          "All three give natural numbers, so there are 3 pairs. Check one: \\(9^2-6^2 = 81-36 = 45\\).",
        ],
        answer: "Three pairs: \\((23,22)\\), \\((9,6)\\) and \\((7,2)\\).",
      },
      selfCheckExample: {
        prompt:
          "In how many ways is 60 a difference of squares of two natural numbers?",
        steps: [
          "\\((m-n)(m+n)=60\\). Since 60 is even, both factors must be even — an odd-even split would make \\(m\\) and \\(n\\) non-integers.",
          "Even-even factor pairs of 60 with \\(u<v\\): \\((2,30)\\) and \\((6,10)\\). The pairs \\((4,15)\\), \\((12,5)\\), \\((20,3)\\) and \\((60,1)\\) are mixed parity and fail.",
          "Convert: \\((2,30)\\to m=16,\\ n=14\\); \\((6,10)\\to m=8,\\ n=2\\).",
          "So two ways. Check: \\(16^2-14^2 = 256-196 = 60\\) and \\(8^2-2^2 = 64-4 = 60\\).",
        ],
        answer: "Two ways.",
      },
      practiceSet: [
        { prompt: "Pairs with squares differing by 35?", answer: "\\(2\\)", method: "\\((1,35)\\) and \\((5,7)\\)" },
        { prompt: "Is 2 a difference of two squares?", answer: "No", method: "\\(2\\equiv 2 \\bmod 4\\)" },
        { prompt: "\\(199 = m^2-n^2\\). Find \\(mn\\).", answer: "\\(9900\\)", method: "199 is prime, so \\(m=100,n=99\\)" },
        { prompt: "How many pairs for 72?", answer: "\\(3\\)", method: "\\((2,36),(4,18),(6,12)\\)" },
      ],
      pyqExampleId: "9ca86203-acc2-437f-9df1-b3a14dcb0742", // 2019 — pairs of natural numbers whose squares differ by 35
      traps: [
        {
          title: "Mixed-parity factor pairs must be discarded",
          body:
            "For \\(N=72\\) the pair \\((8,9)\\) multiplies correctly but gives \\(m=8.5\\) — not an integer. Only \\((2,36)\\), \\((4,18)\\) and \\((6,12)\\) survive, so the answer is 3. Counting **all** factor pairs rather than the same-parity ones is the standard error and inflates every answer in this concept.",
        },
        {
          title: "A prime target forces a unique pair",
          body:
            "If \\(N\\) is prime the only factorisation is \\(1\\times N\\), so \\(m=\\frac{N+1}{2}\\) and \\(n=\\frac{N-1}{2}\\) uniquely. For \\(N=199\\) that is \\(m=100\\), \\(n=99\\), giving \\(mn = 9900\\) — no searching needed.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-complete-the-square-to-factor",
      name: "Completing the square to force a factorisation",
      intuition:
        "\"For which \\(n\\) is this quadratic a perfect square?\" looks like an open search. Completing the square turns it into a difference of two squares equal to a **constant**, and a constant has only finitely many factorisations — so the search becomes a short list.",
      definition:
        "To solve \\(n^{2}+bn+c = k^{2}\\):\n" +
        "- complete the square on the left, giving \\(\\left(n+\\tfrac b2\\right)^{2} + \\left(c - \\tfrac{b^{2}}{4}\\right) = k^{2}\\);\n" +
        "- if \\(b\\) is odd, multiply through by 4 first to keep everything integral: \\(4n^{2}+4bn+4c = (2n+b)^{2}+\\left(4c-b^{2}\\right)\\);\n" +
        "- rearrange to \\(k^{2}-(\\cdots)^{2} = \\text{constant}\\) and factor as a difference of squares;\n" +
        "- enumerate the same-parity factor pairs of that constant and solve each.",
      formula: {
        label: "Reduce to a constant difference of squares",
        latex: "n^{2}+bn+c=k^{2} \\;\\Longrightarrow\\; (2k)^{2}-(2n+b)^{2}=4c-b^{2}",
      },
      authoredExample: {
        prompt:
          "For how many integers \\(n\\) is \\(n^{2}+8n+20\\) a perfect square?",
        steps: [
          "Complete the square: \\(n^{2}+8n+20 = (n+4)^{2}+4\\).",
          "Set that equal to \\(k^{2}\\): \\(k^{2}-(n+4)^{2} = 4\\), so \\((k-n-4)(k+n+4)=4\\).",
          "The two factors must have the same parity, so both are even: \\((2,2)\\) is the only option (and \\((-2,-2)\\), which gives the same \\(n\\)).",
          "From \\(k-n-4=2\\) and \\(k+n+4=2\\): adding gives \\(k=2\\), subtracting gives \\(n=-4\\). Check: \\(16-32+20 = 4 = 2^{2}\\).",
        ],
        answer: "Exactly one: \\(n=-4\\).",
      },
      selfCheckExample: {
        prompt:
          "For how many integers \\(n\\) is \\(n^{2}+6n+13\\) a perfect square?",
        steps: [
          "Complete the square: \\(n^{2}+6n+13 = (n+3)^{2}+4\\).",
          "Set \\(=k^{2}\\): \\((k-n-3)(k+n+3)=4\\).",
          "Same parity forces both factors even, so \\((2,2)\\).",
          "That gives \\(k=2\\) and \\(n+3=0\\), so \\(n=-3\\). Check: \\(9-18+13 = 4\\).",
        ],
        answer: "Exactly one: \\(n=-3\\).",
      },
      practiceSet: [
        { prompt: "Complete the square on \\(n^2+10n+29\\).", answer: "\\((n+5)^2+4\\)" },
        { prompt: "Why multiply by 4 when \\(b\\) is odd?", answer: "To keep \\((2n+b)\\) an integer" },
        { prompt: "\\(4(n^2+19n+92)\\) equals?", answer: "\\((2n+19)^2+7\\)" },
        { prompt: "Same-parity factor pairs of 7?", answer: "\\((1,7)\\) only" },
      ],
      pyqExampleId: "714e22f1-bf42-4455-adb8-b25729f75512", // 2019 — sum of all integer n making n^2+19n+92 a perfect square
      traps: [
        {
          title: "An odd middle coefficient needs the factor of 4",
          body:
            "For \\(n^{2}+19n+92\\), completing the square directly gives halves. Multiply by 4 first: \\(4(n^2+19n+92) = (2n+19)^{2}+7\\), so \\((2k)^{2}-(2n+19)^{2}=7\\). Since 7 is prime the factors are \\(\\pm1\\) and \\(\\pm7\\), giving \\(2n+19=\\pm3\\) and hence \\(n=-8\\) or \\(n=-11\\), summing to \\(-19\\). Skipping the multiplication loses both solutions.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-square-identities",
      name: "Expressions that are always perfect squares",
      intuition:
        "A few standard expressions are squares for every value of the variable, and the examinable content is the closed form. The trick in each case is to spot the right substitution — usually the symmetric middle quantity.",
      definition:
        "Two identities CDS uses directly:\n" +
        "- **Four consecutive integers plus one.** Put \\(m = n^{2}+3n\\); then\n" +
        "\\[n(n+1)(n+2)(n+3)+1 = m(m+2)+1 = (m+1)^{2} = \\left(n^{2}+3n+1\\right)^{2}.\\]\n" +
        "- **Consecutive pair with their product.** If \\(a=n\\), \\(b=n+1\\) and \\(c=ab\\), then\n" +
        "\\[a^{2}+b^{2}+c^{2}=\\left(n^{2}+n+1\\right)^{2}.\\]\n" +
        "In both cases the result is **odd**, because a product of consecutive integers is even and the square of an odd number follows.",
      formula: {
        label: "Four consecutive integers plus one",
        latex: "n(n+1)(n+2)(n+3)+1=\\left(n^{2}+3n+1\\right)^{2}",
      },
      authoredExample: {
        prompt:
          "Show that \\(n(n+1)(n+2)(n+3)+1\\) is always a perfect square, and evaluate it at \\(n=2\\).",
        steps: [
          "Pair the outer and inner factors: \\(n(n+3) = n^{2}+3n\\) and \\((n+1)(n+2) = n^{2}+3n+2\\).",
          "Put \\(m = n^{2}+3n\\). The product is \\(m(m+2) = m^{2}+2m\\).",
          "Adding 1 gives \\(m^{2}+2m+1 = (m+1)^{2}\\), a perfect square for every \\(n\\).",
          "At \\(n=2\\): \\(m = 4+6 = 10\\), so the value is \\(11^{2} = 121\\). Direct check: \\(2\\times3\\times4\\times5+1 = 121\\).",
        ],
        answer: "It equals \\(\\left(n^{2}+3n+1\\right)^{2}\\); at \\(n=2\\) it is \\(121\\).",
      },
      selfCheckExample: {
        prompt:
          "With \\(a=5\\), \\(b=6\\) and \\(c=ab\\), show \\(a^{2}+b^{2}+c^{2}\\) is a perfect square.",
        steps: [
          "Here \\(c = 5\\times 6 = 30\\).",
          "So \\(a^{2}+b^{2}+c^{2} = 25+36+900 = 961\\).",
          "And \\(961 = 31^{2}\\).",
          "The identity predicts \\(n^{2}+n+1\\) with \\(n=5\\), which is \\(25+5+1 = 31\\) — matching, and odd as the identity guarantees.",
        ],
        answer: "\\(961 = 31^{2}\\).",
      },
      practiceSet: [
        { prompt: "\\(1\\times2\\times3\\times4+1\\)?", answer: "\\(25\\)", method: "\\((1+3+1)^2\\)" },
        { prompt: "\\(3\\times4\\times5\\times6+1\\)?", answer: "\\(361\\)", method: "\\((9+9+1)^2=19^2\\)" },
        { prompt: "Is \\(n(n+1)(n+2)(n+3)+1\\) odd or even?", answer: "Odd" },
        { prompt: "\\(a=2,b=3,c=6\\): \\(a^2+b^2+c^2\\)?", answer: "\\(49\\)", method: "\\((4+2+1)^2=7^2\\)" },
      ],
      pyqExampleId: "a25f1e62-16c8-4044-b560-93a975f292a7", // 2024 — p = n(n+1)(n+2)(n+3)+1 statements
      traps: [
        {
          title: "Pair the OUTER factors, not adjacent ones",
          body:
            "The identity works because \\(n(n+3)\\) and \\((n+1)(n+2)\\) differ by exactly 2. Pairing \\(n(n+1)\\) with \\((n+2)(n+3)\\) instead gives two quadratics differing by \\(4n+6\\), and the substitution collapses. Always multiply the first by the last.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsns-cubes-and-higher-powers",
      name: "Cubes, fourth powers and taxicab numbers",
      intuition:
        "Cubes come up in two shapes: recognising a small cube to solve \\(m^{n}=N\\), and the famous 1729, the smallest number expressible as a sum of two positive cubes in two different ways. Both are recall plus one line of arithmetic.",
      definition:
        "Cubes worth knowing on sight: \\(2^3=8\\), \\(3^3=27\\), \\(4^3=64\\), \\(5^3=125\\), \\(6^3=216\\), \\(7^3=343\\), \\(9^3=729\\), \\(10^3=1000\\), \\(11^3=1331\\), \\(12^3=1728\\).\n" +
        "- To solve \\(m^{n}=N\\), factorise \\(N\\) into a single prime power; \\(1331 = 11^{3}\\) gives \\(m=11,\\ n=3\\).\n" +
        "- \\(1729 = 1^{3}+12^{3} = 9^{3}+10^{3}\\) — two ways, and the only number below 2000 with that property.\n" +
        "- For a **mixed** condition (a cube now, a square later) the small cases are few enough to list.",
      formula: {
        label: "Taxicab identity",
        latex: "1729 = 1^{3}+12^{3} = 9^{3}+10^{3}",
      },
      authoredExample: {
        prompt:
          "Verify that 1729 is a sum of two positive cubes in two different ways.",
        steps: [
          "First way: \\(1^{3}+12^{3} = 1+1728 = 1729\\).",
          "Second way: \\(9^{3}+10^{3} = 729+1000 = 1729\\).",
          "These use different pairs, so there are two representations.",
          "No third pair exists, which is why the correct statement is \"in exactly two ways\" rather than \"in two or more\".",
        ],
        answer: "\\(1+1728\\) and \\(729+1000\\), both \\(=1729\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(m^{n}=2401\\) with \\(m,n\\) integers greater than 1, find \\((m-1)^{\\,n-1}\\).",
        steps: [
          "Factorise 2401: it is odd and not a multiple of 3 or 5; \\(2401/7 = 343 = 7^{3}\\).",
          "So \\(2401 = 7^{4}\\), giving \\(m=7\\) and \\(n=4\\).",
          "Then \\((m-1)^{n-1} = 6^{3}\\).",
          "That is \\(216\\).",
        ],
        answer: "\\(216\\).",
      },
      practiceSet: [
        { prompt: "\\(11^3\\)?", answer: "\\(1331\\)" },
        { prompt: "\\(m^n=1331\\), both above 1. Find \\(m\\).", answer: "\\(11\\)" },
        { prompt: "Which number is \\(1^3+12^3\\)?", answer: "\\(1729\\)" },
        { prompt: "\\(12^3\\)?", answer: "\\(1728\\)" },
      ],
      pyqExampleId: "71f958e8-12b4-416d-85b4-5492cc022335", // 2016 — which is correct about 1729
      traps: [
        {
          title: "m to the n has a trivial solution that the question does not intend",
          body:
            "\\(m^{n}=1331\\) is satisfied by \\(m=1331,\\ n=1\\) as well as by \\(m=11,\\ n=3\\), and the trivial reading gives \\(1330^{0}=1\\) — which appears in the option list. The stem's intent is the genuine power, so read any restriction such as \"different from 1\" carefully, and prefer the non-trivial factorisation when both are admissible.",
        },
      ],
    },
  ],
  related: [
    { label: "Division, parity and consecutive integers", href: "/notes/cds-maths/number-system/cds-ns-foundations" },
    { label: "Factors, divisor counting and trailing zeros", href: "/notes/cds-maths/number-system/cds-ns-factors-divisors" },
  ],
};
