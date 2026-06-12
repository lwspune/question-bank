import type { SubtopicNote } from "@/app/notes/_types";

export const IDENTITIES_CHANGE_OF_BASE_SUMS_NOTE: SubtopicNote = {
  subtopicName: "Logarithm Identities, Change of Base, and Sums",
  title: "Logarithm Identities, Change of Base & Sums",
  oneLineDefinition:
    "A logarithm answers “what power do I raise the base to?” — and almost every NDA log question collapses once you apply the three laws, the change-of-base rule, or its reciprocal twin.",
  whyItMatters:
    "This is the larger of the chapter's two subtopics — 16 PYQs, mostly EASY/MODERATE with 2 HARD. The patterns repeat: split or combine logs with the laws, switch base to collapse a product or a telescoping sum (the 1/log_k N family appears almost every other year), or read off the sign of a log. Master change of base and these become one-liners.",
  concepts: [
    // 0 — FOUNDATION (no PYQ): what a log is + the three laws + special values + domain
    {
      kind: "formula" as const,
      slug: "log-foundations",
      name: "What a Logarithm Is — Laws, Special Values, Domain",
      intuition:
        "A logarithm is just an exponent turned inside out. The question “\\(\\log_a N = ?\\)” asks “to what power must I raise the base \\(a\\) to get \\(N\\)?” Once you read every log as “the exponent that produces \\(N\\),” the three laws are simply the exponent rules in disguise.",
      definition:
        "**Definition.** \\(\\log_a N = x \\iff a^x = N\\), valid for base \\(a>0,\\ a\\neq 1\\) and \\(N>0\\).\n" +
        "**The three laws** (same base throughout):\n" +
        "- **Product:** \\(\\log_a(MN) = \\log_a M + \\log_a N\\)\n" +
        "- **Quotient:** \\(\\log_a\\!\\dfrac{M}{N} = \\log_a M - \\log_a N\\)\n" +
        "- **Power:** \\(\\log_a(M^k) = k\\,\\log_a M\\)\n" +
        "**Special values:** \\(\\log_a a = 1\\), \\(\\log_a 1 = 0\\), \\(\\log_a(a^k) = k\\), and \\(a^{\\log_a N} = N\\).\n" +
        "**Domain:** you may only take the log of a **positive** number — the argument of every log in a problem must stay \\(>0\\). This is what later forces solution-rejection.",
      formula: {
        label: "The defining equivalence and the three laws",
        latex:
          "\\log_a N = x \\iff a^x = N;\\quad \\log_a(MN)=\\log_a M+\\log_a N,\\ \\ \\log_a M^k = k\\log_a M",
      },
      authoredExample: {
        prompt: "Evaluate \\(\\log_2 80 - \\log_2 5\\).",
        steps: [
          "Quotient law: \\(\\log_2 80 - \\log_2 5 = \\log_2\\dfrac{80}{5} = \\log_2 16\\).",
          "\\(16 = 2^4\\), so \\(\\log_2 16 = 4\\).",
        ],
        answer: "\\(4\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log_3 81 = ?\\)", answer: "\\(4\\)", method: "\\(81 = 3^4\\)." },
        { prompt: "\\(\\log_{10} 25 + \\log_{10} 4 = ?\\)", answer: "\\(2\\)", method: "Product: \\(\\log_{10}100 = 2\\)." },
        { prompt: "\\(\\log_5 1 = ?\\) and \\(\\log_5 5 = ?\\)", answer: "\\(0\\) and \\(1\\)", method: "\\(\\log_a 1=0,\\ \\log_a a=1\\)." },
        { prompt: "Why is \\(\\log_2(-8)\\) undefined?", answer: "The argument must be positive.", method: "No power of \\(2\\) is negative." },
      ],
      traps: [
        {
          title: "\\(\\log(M+N)\\) is NOT \\(\\log M + \\log N\\)",
          body:
            "The product law splits a log of a **product**, not a log of a **sum**. \\(\\log_a(M+N)\\) has no simplification — only \\(\\log_a(MN)\\) splits into \\(\\log_a M+\\log_a N\\).",
        },
        {
          title: "The base must be \\(>0\\) and \\(\\neq 1\\)",
          body:
            "\\(\\log_a N\\) is only defined for a base \\(a > 0,\\ a \\neq 1\\). A base of \\(1\\) is forbidden because \\(1^x = 1\\) for every \\(x\\), so \\(\\log_1 N\\) has no unique value; a base \\(\\le 0\\) breaks the exponential entirely.",
        },
      ],
    },

    // 1 — Product / Quotient / Power laws in action (evaluate & combine)
    {
      kind: "formula" as const,
      slug: "log-laws-evaluate-combine",
      name: "Applying the Laws — Evaluate and Combine",
      pyqExampleId: "b41109fb-38c9-4fec-8407-bf2abb660772",
      intuition:
        "Most “find the value” log questions are solved by rewriting every number as a power of a small base, then letting the power and product/quotient laws do the bookkeeping. The trick is to spot the common base hiding inside \\(27, 32, 1024\\), nested radicals, and so on.",
      definition:
        "Strategy for an evaluate-and-combine problem:\n" +
        "- **Rewrite arguments as powers** of the smallest convenient base: \\(27=3^3,\\ 1024=2^{10},\\ 3125=5^5\\), and a nested radical like \\(\\sqrt{7\\sqrt{7\\sqrt{7}}}\\) as \\(7^{1/2+1/4+1/8}=7^{7/8}\\).\n" +
        "- **Pull exponents out front** with the power law, then combine with product/quotient.\n" +
        "- **Sum of logs across a list** — e.g. \\(\\sum_j \\log_{10}(2^j5^j)=\\sum_j j\\,\\log_{10}10=\\sum_j j\\) — telescopes once you notice \\(2\\cdot 5 = 10\\).",
      formula: {
        label: "Rewrite as powers, then pull the exponent out",
        latex: "\\log_a(b^m \\cdot c^n) = m\\log_a b + n\\log_a c",
      },
      authoredExample: {
        prompt: "Find the value of \\(\\log_3 27 + \\log_5 125\\).",
        steps: [
          "\\(27 = 3^3\\) so \\(\\log_3 27 = 3\\).",
          "\\(125 = 5^3\\) so \\(\\log_5 125 = 3\\).",
          "Add: \\(3 + 3\\).",
        ],
        answer: "\\(6\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\log_4 8 + \\log_9 27\\).",
        steps: [
          "\\(\\log_4 8 = \\dfrac{\\log_2 8}{\\log_2 4} = \\dfrac{3}{2}\\).",
          "\\(\\log_9 27 = \\dfrac{\\log_3 27}{\\log_3 9} = \\dfrac{3}{2}\\).",
          "Add: \\(\\dfrac{3}{2}+\\dfrac{3}{2}\\).",
        ],
        answer: "\\(3\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log_2 32 - \\log_2 2 = ?\\)", answer: "\\(4\\)", method: "Quotient law: \\(\\log_2 16 = 4\\)." },
      ],
      traps: [
        {
          title: "Keep the base when you pull out a power",
          body:
            "\\(\\log_7\\sqrt{7\\sqrt{7\\sqrt{7}}}\\) first becomes \\(\\tfrac{7}{8}\\), but a second outer \\(\\log_7\\) of that gives \\(\\log_7\\tfrac{7}{8} = 1 - 3\\log_7 2\\) — don't lose the \\(-\\log_7 8 = -3\\log_7 2\\) term.",
        },
      ],
    },

    // 2 — Change of base + the reciprocal identity + telescoping 1/log_k N sums
    {
      kind: "formula" as const,
      slug: "log-change-of-base",
      name: "Change of Base & the Reciprocal Identity",
      pyqExampleId: "f67b35c5-eddb-4952-8a98-8f137a8a3e32",
      intuition:
        "Any logarithm can be re-expressed in a base of your choosing: \\(\\log_b a = \\dfrac{\\log a}{\\log b}\\) in any common base. The single most useful consequence is that flipping a log inverts it: \\(\\dfrac{1}{\\log_a b} = \\log_b a\\). That reciprocal turns the recurring \\(\\sum \\dfrac{1}{\\log_k N}\\) sums into a one-line collapse.",
      definition:
        "**Change of base:** \\(\\log_b a = \\dfrac{\\log_c a}{\\log_c b}\\) for any valid base \\(c\\).\n" +
        "Two consequences carry most of the marks:\n" +
        "- **Reciprocal identity:** \\(\\dfrac{1}{\\log_a b} = \\log_b a\\) (set \\(c=a\\)). So \\(\\dfrac{1}{\\log_k N} = \\log_N k\\).\n" +
        "- **Telescoping sum:** \\(\\displaystyle\\sum_{k=2}^{m}\\dfrac{1}{\\log_k N} = \\sum_{k=2}^{m}\\log_N k = \\log_N(2\\cdot 3\\cdots m) = \\log_N(m!)\\). When \\(N=m!\\) this equals \\(\\log_N N = 1\\).\n" +
        "- **Product collapse:** \\(\\log_a b\\cdot\\log_b a = 1\\), and \\(\\log_a b\\cdot\\log_b c = \\log_a c\\) (chain).",
      formula: {
        label: "Change of base and its reciprocal twin",
        latex: "\\log_b a = \\dfrac{\\log a}{\\log b}, \\qquad \\dfrac{1}{\\log_a b} = \\log_b a",
      },
      authoredExample: {
        prompt: "If \\(n = 50!\\), find \\(\\dfrac{1}{\\log_2 n} + \\dfrac{1}{\\log_3 n} + \\cdots + \\dfrac{1}{\\log_{50} n}\\).",
        steps: [
          "Reciprocal identity: \\(\\dfrac{1}{\\log_k n} = \\log_n k\\).",
          "Sum \\(= \\log_n(2\\cdot 3\\cdots 50) = \\log_n(50!)\\).",
          "But \\(n = 50!\\), so this is \\(\\log_n n = 1\\).",
        ],
        answer: "\\(1\\).",
      },
      selfCheckExample: {
        prompt: "Evaluate \\(\\log_{10} 2 \\cdot \\log_2 10\\).",
        steps: [
          "Reciprocal identity: \\(\\log_2 10 = \\dfrac{1}{\\log_{10} 2}\\).",
          "So the product is \\(\\log_{10} 2 \\cdot \\dfrac{1}{\\log_{10} 2}\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\log_4 64 = ?\\)", answer: "\\(3\\)", method: "\\(\\log_4 64 = \\dfrac{\\log_2 64}{\\log_2 4} = \\dfrac{6}{2} = 3\\)." },
      ],
      traps: [
        {
          title: "Reciprocal flips the base and the argument together",
          body:
            "\\(\\dfrac{1}{\\log_a b} = \\log_b a\\) — the base and argument **swap**. It does NOT equal \\(\\log_a(1/b)\\) (which would be \\(-\\log_a b\\)). Keep the two operations separate.",
        },
        {
          title: "Change of base does NOT invert the fraction",
          body:
            "\\(\\log_b a = \\dfrac{\\log a}{\\log b}\\) — the NEW argument \\(a\\) goes on top, the NEW base \\(b\\) on the bottom. Writing it upside-down as \\(\\dfrac{\\log b}{\\log a}\\) gives \\(\\log_a b\\), the reciprocal, and flips the whole answer.",
        },
      ],
    },

    // 3 — Sign of a log + minimum/maximum of a log function
    {
      kind: "formula" as const,
      slug: "log-sign-and-bounds",
      name: "Sign of a Logarithm & Bounds of a Log Function",
      pyqExampleId: "c9bc689a-de81-4760-bd6a-f935b88e8e18",
      intuition:
        "Because the log of \\(1\\) is \\(0\\), a logarithm is positive when its argument exceeds \\(1\\) and negative when the argument lies strictly between \\(0\\) and \\(1\\) (for a base \\(>1\\)). And since \\(\\log\\) is increasing, the smallest value of \\(\\log_{10}(\\text{quadratic})\\) happens exactly where the quadratic is smallest.",
      definition:
        "For base \\(a>1\\):\n" +
        "- \\(\\log_a N > 0 \\iff N > 1\\); \\(\\quad\\log_a N = 0 \\iff N = 1\\); \\(\\quad\\log_a N < 0 \\iff 0 < N < 1\\).\n" +
        "- The function \\(\\log_a\\) is **strictly increasing**, so \\(\\log_a f(x)\\) attains its **minimum** exactly where \\(f(x)\\) is minimised (provided \\(f>0\\) there).\n" +
        "**Minimising \\(\\log_{10}(\\text{quadratic}):\\)** complete the square — \\(x^2+bx+c = (x+\\tfrac{b}{2})^2 + (c-\\tfrac{b^2}{4})\\) — the minimum argument is \\(c-\\tfrac{b^2}{4}\\), and the minimum of the log is \\(\\log_{10}\\) of that.",
      formula: {
        label: "Sign of a log (base > 1)",
        latex: "\\log_a N \\;\\begin{cases}>0 & N>1\\\\ =0 & N=1\\\\ <0 & 0<N<1\\end{cases}",
      },
      authoredExample: {
        prompt: "Find the minimum value of \\(f(x) = \\log_{10}(x^2 - 4x + 104)\\).",
        steps: [
          "Complete the square: \\(x^2 - 4x + 104 = (x-2)^2 + 100\\).",
          "The argument is smallest \\(=100\\) at \\(x=2\\).",
          "Minimum of \\(f = \\log_{10} 100 = 2\\).",
        ],
        answer: "\\(2\\).",
      },
      practiceSet: [
        { prompt: "Is \\(\\log_{10} 0.5\\) positive or negative?", answer: "Negative", method: "Argument \\(0.5 \\in (0,1)\\)." },
        { prompt: "For which \\(a\\) is \\(\\log_{10} a = 0\\)?", answer: "\\(a = 1\\)", method: "\\(\\log_a 1 = 0\\)." },
      ],
      traps: [
        {
          title: "The minimum is of the LOG, not the quadratic",
          body:
            "After finding the quadratic's minimum (say \\(100\\)), you must still take \\(\\log_{10} 100 = 2\\). The smallest argument and the smallest log value are different numbers — the question asks for the log.",
        },
      ],
    },

    // 4 — Logarithms inside sequences (AP/GP) and geometric mean
    {
      kind: "formula" as const,
      slug: "log-in-sequences",
      name: "Logarithms in AP/GP and the Geometric Mean",
      pyqExampleId: "daa2c4d7-b102-493b-9ad8-cff503d48332",
      intuition:
        "Logs convert multiplication into addition, so a geometric progression of powers becomes an arithmetic progression of logs. That's why questions phrased as “\\(\\ln x, \\ln x^3, \\ln x^5\\) are in AP/GP?” or “geometric mean of \\(1,2,2^2,\\dots\\)” are pure log-law exercises in disguise.",
      definition:
        "Two recurring shapes:\n" +
        "- **AP / GP test on logs:** \\(\\ln x, \\ln x^3, \\ln x^5 = \\ln x,\\,3\\ln x,\\,5\\ln x\\). They are in **AP** (common difference \\(2\\ln x\\)); for **GP** you must separately check \\(q^2 = pr\\), i.e. \\((3\\ln x)^2 = (\\ln x)(5\\ln x)\\) — here \\(9 \\neq 5\\), so never GP.\n" +
        "- **Geometric mean of a list of powers:** the GM of \\(1,2,2^2,\\dots,2^{n-1}\\) is \\(\\big(2^{0+1+\\cdots+(n-1)}\\big)^{1/n} = 2^{(n-1)/2}\\); taking \\(\\log_2\\) gives \\(\\dfrac{n-1}{2}\\), so expressions like \\(1+2\\log_2 G\\) simplify to \\(n\\).",
      formula: {
        label: "AP and GP conditions for three terms",
        latex: "\\text{AP}: 2q = p+r, \\qquad \\text{GP}: q^2 = pr",
      },
      authoredExample: {
        prompt: "Are \\(\\log_2 4,\\ \\log_2 16,\\ \\log_2 64\\) in AP?",
        steps: [
          "Evaluate: \\(\\log_2 4 = 2,\\ \\log_2 16 = 4,\\ \\log_2 64 = 6\\).",
          "Differences: \\(4-2 = 2\\) and \\(6-4 = 2\\) — equal.",
        ],
        answer: "Yes — they are in AP with common difference \\(2\\).",
      },
      selfCheckExample: {
        prompt: "Let \\(G\\) be the geometric mean of \\(1, 3, 3^2, 3^3\\). Find \\(\\log_3 G\\).",
        steps: [
          "Product \\(= 3^{0+1+2+3} = 3^6\\); GM \\(= (3^6)^{1/4} = 3^{6/4} = 3^{3/2}\\).",
          "\\(\\log_3 G = \\dfrac{3}{2}\\).",
        ],
        answer: "\\(\\dfrac{3}{2}\\).",
      },
      traps: [
        {
          title: "AP holding does not make it GP — test GP separately",
          body:
            "\\(p, q, r\\) being in AP says nothing about GP. The GP condition \\(q^2 = pr\\) must be checked on its own; for \\(\\ln x, 3\\ln x, 5\\ln x\\) it fails because \\(9 \\neq 5\\), so the terms are AP-but-never-GP.",
        },
      ],
    },
  ],
};
