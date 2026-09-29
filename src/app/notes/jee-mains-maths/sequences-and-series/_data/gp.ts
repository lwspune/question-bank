import type { SubtopicNote } from "@/app/notes/_types";

export const GP_SEQ_NOTE: SubtopicNote = {
  subtopicName: "GP: Terms and Sums",
  title: "Geometric Progressions: Terms and Sums",
  oneLineDefinition:
    "A geometric progression multiplies by the same ratio r at every step: find terms and sums from two conditions, use products and odd–even parts, and spot a GP hidden in a function, a recurrence or a two-base sum.",
  whyItMatters:
    "Thirty-six PYQs. Most give two conditions on an increasing GP and ask for a later term or a sum. The rest hide the GP: in a function with f(x + y) = f(x)f(y), in a recurrence, or in a sum of products of powers of two bases. Three ideas cover the page.",
  concepts: [
    // C1 — terms and sums
    {
      kind: "formula" as const,
      slug: "jseq-gp-terms",
      name: "Terms and sums of a GP from two conditions",
      intuition:
        "\\(a_n=ar^{n-1}\\) and \\(S_n=a\\frac{r^n-1}{r-1}\\). Two conditions give two equations in \\(a\\) and \\(r\\): divide one by the other and \\(a\\) cancels, leaving \\(r\\). A product condition is often quicker: terms whose positions add to the same total have the same product, \\(a_ma_n=a_pa_q\\) when \\(m+n=p+q\\), so a product such as \\(a_3a_5\\) is \\(a_4^2\\).",
      definition:
        "- \\(a_n=ar^{n-1}\\), \\(S_n=a\\frac{r^n-1}{r-1}\\) (\\(r\\ne1\\)).\n" +
        "- **Divide two conditions** to cancel \\(a\\).\n" +
        "- \\(a_ma_n=a_pa_q\\) when \\(m+n=p+q\\); in particular \\(a_{k-j}a_{k+j}=a_k^2\\).\n" +
        "- **Three terms in GP:** take \\(\\frac ar,a,ar\\), so their product is \\(a^3\\).",
      formula: {
        label: "Sum of n terms",
        latex: "S_n=a\\,\\frac{r^n-1}{r-1}",
      },
      authoredExample: {
        prompt: "A GP of positive terms has \\(a_3=12\\) and \\(a_5=48\\). Find \\(S_6\\).",
        steps: [
          "\\(r^2=\\frac{48}{12}=4\\), \\(r=2\\), so \\(a=3\\).",
          "\\(S_6=3(2^6-1)\\).",
        ],
        answer: "\\(189\\).",
      },
      selfCheckExample: {
        prompt: "In a GP, \\(a_2+a_3=12\\) and \\(a_3+a_4=36\\). Find \\(S_5\\).",
        steps: [
          "Dividing, \\(r=3\\). Then \\(a_2(1+3)=12\\), \\(a_2=3\\), \\(a=1\\).",
          "\\(S_5=\\frac{3^5-1}{2}\\).",
        ],
        answer: "\\(121\\).",
      },
      practiceSet: [
        { prompt: "Positive GP with \\(a_1a_9=25\\). \\(a_5\\)?", answer: "\\(5\\)" },
        { prompt: "\\(1+2+4+\\dots+2^9\\)?", answer: "\\(1023\\)" },
        { prompt: "\\(S_6=9S_3\\). \\(r\\)?", answer: "\\(2\\) (\\(1+r^3=9\\))" },
        { prompt: "Fewest terms of \\(3,6,12,\\dots\\) with sum over 1000?", answer: "\\(9\\)" },
      ],
      pyqExampleId: "464589be-d8a4-4afa-b6cf-5ef37aec3d24", // 2025 — increasing GP, a1a5 = 28, a2 + a4 = 29, find a6
      traps: [
        {
          title: "Increasing and positive means r > 1",
          body: "Dividing two conditions often gives a quadratic in \\(r\\) with roots \\(t\\) and \\(\\frac1t\\). An increasing GP of positive terms keeps only the root above 1.",
        },
      ],
    },

    // C2 — products, means and parts
    {
      kind: "formula" as const,
      slug: "jseq-gp-parts",
      name: "Products, means and odd–even parts of a GP",
      intuition:
        "The product of the first \\(n\\) terms is \\(a^nr^{n(n-1)/2}\\), so its \\(n\\)th root is \\(ar^{(n-1)/2}\\): the geometric mean of the terms is the middle term. The odd-placed terms form a GP with ratio \\(r^2\\), and so do the even-placed ones, each even term being \\(r\\) times the odd term before it. The logarithms of GP terms are in AP.",
      definition:
        "- **Product of \\(n\\) terms:** \\(a^nr^{n(n-1)/2}\\).\n" +
        "- **Geometric mean** of the terms \\(=ar^{(n-1)/2}\\).\n" +
        "- **\\(2m\\) terms:** (even-placed sum) \\(=r\\times\\)(odd-placed sum), so the whole sum is \\((1+r)\\) times the odd part.\n" +
        "- \\(\\log a_1,\\log a_2,\\dots\\) are in AP with difference \\(\\log r\\).",
      formula: {
        label: "Whole sum of 2m terms",
        latex: "S=(1+r)\\,S_{\\text{odd}}",
      },
      authoredExample: {
        prompt: "A GP of 10 terms has sum 4 times the sum of its odd-placed terms. Find \\(r\\).",
        steps: [
          "\\(1+r=4\\).",
        ],
        answer: "\\(r=3\\).",
      },
      selfCheckExample: {
        prompt: "Find the product of the first five terms of \\(2,6,18,\\dots\\).",
        steps: [
          "The middle term is \\(a_3=18\\), the geometric mean of the five.",
        ],
        answer: "\\(18^5\\).",
      },
      practiceSet: [
        { prompt: "Geometric mean of \\(1,2,4,8,16\\)?", answer: "\\(4\\)" },
        { prompt: "\\(r=5\\): even-placed sum over odd-placed sum (even count of terms)?", answer: "\\(5\\)" },
        { prompt: "\\(\\log_2\\) of \\(2,8,32\\)?", answer: "\\(1,3,5\\): an AP" },
        { prompt: "\\(n\\)th root of the product of the first \\(n\\) terms of \\(1,3,9,\\dots\\)?", answer: "\\(3^{(n-1)/2}\\)" },
      ],
      pyqExampleId: "463cae1c-2fa3-4427-822c-10750ee49541", // 2024 — 64 terms, sum = 7 x sum of odd terms, find r
      traps: [
        {
          title: "An odd number of terms",
          body: "With an odd count there is one more odd-placed term than even-placed, and the factor \\(1+r\\) no longer holds. Write both sums out.",
        },
      ],
    },

    // C3 — recognising a GP
    {
      kind: "formula" as const,
      slug: "jseq-gp-disguise",
      name: "Recognising a GP in a function, a recurrence or a two-base sum",
      intuition:
        "Several shapes hide a GP. A function with \\(f(x+y)=f(x)f(y)\\) on natural numbers has \\(f(n)=f(1)^n\\). A sum \\(\\sum 2^k3^{m-k}\\) is a GP with ratio \\(\\frac23\\). A recurrence \\(a_{n+2}=pa_{n+1}+qa_n\\) is solved by powers of the roots of \\(t^2=pt+q\\); conversely \\(a_n=\\alpha^n-\\beta^n\\) satisfies that recurrence. To find the remainder of a GP's sum, add the GP first, then reduce.",
      definition:
        "- \\(f(x+y)=f(x)f(y)\\Rightarrow f(n)=f(1)^n\\), a GP.\n" +
        "- \\(\\sum_{k=0}^{m}x^ky^{m-k}=\\frac{y^{m+1}-x^{m+1}}{y-x}\\).\n" +
        "- \\(a_n=A\\alpha^n+B\\beta^n\\) where \\(\\alpha,\\beta\\) are the roots of \\(t^2=pt+q\\).\n" +
        "- **Remainders:** sum the GP in closed form, then reduce the closed form.",
      formula: {
        label: "Two-base sum",
        latex: "\\sum_{k=0}^{m}x^{k}y^{m-k}=\\frac{y^{m+1}-x^{m+1}}{y-x}",
      },
      authoredExample: {
        prompt: "\\(f(x+y)=f(x)f(y)\\) for natural \\(x,y\\) and \\(f(1)=2\\). Find \\(\\sum_{k=1}^{8}f(k)\\).",
        steps: [
          "\\(f(k)=2^k\\), so the sum is \\(2(2^8-1)\\).",
        ],
        answer: "\\(510\\).",
      },
      selfCheckExample: {
        prompt: "\\(a_n=5^n-2^n\\). Find \\(\\frac{7a_5-a_6}{10a_4}\\).",
        steps: [
          "5 and 2 are the roots of \\(t^2=7t-10\\), so \\(a_6=7a_5-10a_4\\).",
          "\\(7a_5-a_6=10a_4\\).",
        ],
        answer: "\\(1\\).",
      },
      practiceSet: [
        { prompt: "\\(\\sum_{k=0}^{4}2^k3^{4-k}\\)?", answer: "\\(3^5-2^5=211\\)" },
        { prompt: "\\(f(x+y)=f(x)f(y)\\), \\(f(2)=9\\), \\(f>0\\). \\(f(1)\\)?", answer: "\\(3\\)" },
        { prompt: "Roots behind \\(a_{n+2}=3a_{n+1}-2a_n\\)?", answer: "\\(1\\) and \\(2\\)" },
        { prompt: "Remainder of \\(1+2+\\dots+2^9\\) on division by 5?", answer: "\\(3\\) (the sum is 1023)" },
      ],
      pyqExampleId: "e5102f4b-6b57-409d-ab5e-dad9db4c6cb2", // 2023 — f(x+y) = f(x)f(y), f(1) = 3, sum of f(k) = 3279
      traps: [
        {
          title: "f(x + y) = 2f(x)f(y) is not f(1)^n",
          body: "Put \\(g=2f\\): then \\(g(x+y)=g(x)g(y)\\), so \\(g(n)=g(1)^n\\) and \\(f(n)=\\frac12(2f(1))^n\\).",
        },
      ],
    },
  ],
};
