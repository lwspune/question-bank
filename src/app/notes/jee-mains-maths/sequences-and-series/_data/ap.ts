import type { SubtopicNote } from "@/app/notes/_types";

export const AP_SEQ_NOTE: SubtopicNote = {
  subtopicName: "AP: Terms and Sums",
  title: "Arithmetic Progressions: Terms and Sums",
  oneLineDefinition:
    "An arithmetic progression adds the same common difference d at every step: find a term from two others, a sum from two others, and use symmetric terms and odd–even parts to shorten the algebra.",
  whyItMatters:
    "Forty-four PYQs, the largest page in the chapter. Half of them are about sums, usually two given and a third asked; the rest give terms, or split the AP into odd-placed and even-placed parts. Every one comes down to two unknowns, the first term and d.",
  concepts: [
    // C1 — the nth term
    {
      kind: "formula" as const,
      slug: "jseq-ap-term",
      name: "The nth term and the common difference",
      intuition:
        "Two terms fix an AP. Between \\(a_p\\) and \\(a_q\\) there are \\(q-p\\) steps, so \\(d=\\frac{a_q-a_p}{q-p}\\), and then any term follows. Inserting \\(n\\) arithmetic means between \\(a\\) and \\(b\\) makes \\(n+2\\) terms, so \\(n+1\\) steps. Counting from the end of an AP with last term \\(l\\), the \\(k\\)th term from the end is \\(l-(k-1)d\\).",
      definition:
        "- \\(a_n=a+(n-1)d\\).\n" +
        "- **From two terms:** \\(d=\\frac{a_q-a_p}{q-p}\\).\n" +
        "- **\\(n\\) means between \\(a\\) and \\(b\\):** \\(d=\\frac{b-a}{n+1}\\).\n" +
        "- **\\(k\\)th term from the end:** \\(l-(k-1)d\\).\n" +
        "- **Number of terms** in \\(a,\\dots,l\\): \\(\\frac{l-a}{d}+1\\).",
      formula: {
        label: "nth term",
        latex: "a_n=a+(n-1)d,\\qquad d=\\frac{a_q-a_p}{q-p}",
      },
      authoredExample: {
        prompt: "In an AP, \\(a_7=30\\) and \\(a_{15}=62\\). Find \\(a_1\\).",
        steps: [
          "Eight steps from \\(a_7\\) to \\(a_{15}\\): \\(d=\\frac{62-30}{8}=4\\).",
          "\\(a_1=a_7-6d=30-24\\).",
        ],
        answer: "\\(a_1=6\\).",
      },
      selfCheckExample: {
        prompt: "Insert 4 arithmetic means between 5 and 30.",
        steps: [
          "Six terms, five steps: \\(d=\\frac{30-5}{5}=5\\).",
        ],
        answer: "\\(10,15,20,25\\).",
      },
      practiceSet: [
        { prompt: "\\(a_3=11\\), \\(a_9=29\\). Find \\(d\\).", answer: "\\(3\\)" },
        { prompt: "How many terms has \\(7,11,15,\\dots,207\\)?", answer: "\\(51\\)" },
        { prompt: "The 12th term from the end of \\(2,5,8,\\dots,62\\)?", answer: "\\(29\\)" },
        { prompt: "\\(d\\) when 9 means are inserted between 1 and 31?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "5719230f-d1e5-45ee-ae3f-965d64d819a5", // 2026 — d of one AP from b31, b43; the other's a1 from a18
      traps: [
        {
          title: "Count steps, not terms",
          body: "From \\(a_p\\) to \\(a_q\\) there are \\(q-p\\) steps. With \\(n\\) means inserted there are \\(n+1\\) steps, not \\(n\\).",
        },
      ],
    },

    // C2 — sums
    {
      kind: "formula" as const,
      slug: "jseq-ap-sum",
      name: "Sum of n terms, and an AP given by its sum",
      intuition:
        "\\(S_n=\\frac n2\\big(2a+(n-1)d\\big)=\\frac n2(a+l)\\). Two given sums make two linear equations in \\(a\\) and \\(d\\); solve them and any third sum follows. When the sum is given as a formula in \\(n\\), the terms come from \\(a_n=S_n-S_{n-1}\\). An AP's sum is always of the form \\(An^2+Bn\\), with no constant, and then \\(d=2A\\).",
      definition:
        "- \\(S_n=\\frac n2\\big(2a+(n-1)d\\big)=\\frac n2(\\text{first}+\\text{last})\\).\n" +
        "- **Two sums given:** divide each by \\(\\frac n2\\) to get \\(2a+(n-1)d\\), then subtract.\n" +
        "- **Sum given as a formula:** \\(a_n=S_n-S_{n-1}\\) for \\(n\\ge2\\), \\(a_1=S_1\\).\n" +
        "- \\(S_n=An^2+Bn\\) means an AP with \\(d=2A\\), \\(a_1=A+B\\).",
      formula: {
        label: "Sum of n terms",
        latex: "S_n=\\frac n2\\big[2a+(n-1)d\\big]",
      },
      authoredExample: {
        prompt: "\\(S_5=40\\) and \\(S_{10}=155\\). Find \\(S_{20}\\).",
        steps: [
          "\\(2a+4d=16\\) and \\(2a+9d=31\\), so \\(5d=15\\): \\(d=3\\), \\(a=2\\).",
          "\\(S_{20}=10(4+57)\\).",
        ],
        answer: "\\(610\\).",
      },
      selfCheckExample: {
        prompt: "\\(S_n=2n^2+3n\\). Find \\(a_{10}\\) and \\(d\\).",
        steps: [
          "\\(a_{10}=S_{10}-S_9=230-189=41\\).",
          "\\(d=2A=4\\).",
        ],
        answer: "\\(a_{10}=41\\), \\(d=4\\).",
      },
      practiceSet: [
        { prompt: "Sum of the first 20 odd numbers?", answer: "\\(400\\)" },
        { prompt: "\\(S_n=5n^2-n\\). Common difference?", answer: "\\(10\\)" },
        { prompt: "Sum of \\(3,7,\\dots,43\\)?", answer: "\\(253\\) (11 terms)" },
        { prompt: "\\(a=-5\\), \\(d=2\\). For which \\(n\\) is \\(S_n=0\\)?", answer: "\\(n=6\\)" },
      ],
      pyqExampleId: "c09e2695-240a-48ac-a12e-5525848ff156", // 2025 — S40 = 1030, S12 = 57, find S30 - S10
      traps: [
        {
          title: "A constant term in S_n",
          body: "If the given \\(S_n\\) has a constant term, \\(S_1\\) does not follow the pattern of \\(S_n-S_{n-1}\\): the sequence is an AP only from the second term.",
        },
      ],
    },

    // C3 — symmetric terms, pairs, odd–even parts
    {
      kind: "formula" as const,
      slug: "jseq-ap-structure",
      name: "Symmetric terms, equal pairs and odd–even parts",
      intuition:
        "Choose unknown terms symmetrically: three as \\(a-d,a,a+d\\), four as \\(a-3d,a-d,a+d,a+3d\\). Then the sum fixes \\(a\\) at once. Terms the same distance from the two ends add to the same total. In an AP of \\(2k\\) terms each even-placed term is \\(d\\) more than the odd-placed term before it, so the two parts differ by \\(kd\\). A product such as \\(a_1a_4\\) written in \\(d\\) is a polynomial: find its maximum or minimum by calculus or by completing the square.",
      definition:
        "- **Three terms:** \\(a-d,a,a+d\\) (sum \\(3a\\)). **Four terms:** \\(a-3d,a-d,a+d,a+3d\\) (common difference \\(2d\\)).\n" +
        "- \\(a_k+a_{n+1-k}=a_1+a_n\\) for every \\(k\\).\n" +
        "- **\\(2k\\) terms:** (even-placed sum) \\(-\\) (odd-placed sum) \\(=kd\\).\n" +
        "- Each part is itself an AP with difference \\(2d\\).",
      formula: {
        label: "Odd–even parts of 2k terms",
        latex: "S_{\\text{even}}-S_{\\text{odd}}=kd,\\qquad a_k+a_{n+1-k}=a_1+a_n",
      },
      authoredExample: {
        prompt: "Three numbers in AP have sum 21 and product 231. Find them.",
        steps: [
          "Take \\(a-d,a,a+d\\): \\(3a=21\\), \\(a=7\\).",
          "\\(7(49-d^2)=231\\), so \\(d^2=16\\).",
        ],
        answer: "\\(3,7,11\\).",
      },
      selfCheckExample: {
        prompt: "An AP has 20 terms. Its odd-placed terms add to 100 and its even-placed terms to 120. Find \\(d\\).",
        steps: [
          "\\(k=10\\): \\(10d=120-100\\).",
        ],
        answer: "\\(d=2\\).",
      },
      practiceSet: [
        { prompt: "An AP of 30 terms has \\(a_1+a_{30}=50\\). Its sum?", answer: "\\(750\\)" },
        { prompt: "An AP of 20 terms has \\(a_3+a_{18}=40\\). \\(S_{20}\\)?", answer: "\\(400\\)" },
        { prompt: "Four numbers in AP add to 20. The average of the middle two?", answer: "\\(5\\)" },
        { prompt: "12 terms; even-placed sum exceeds odd-placed sum by 18. \\(d\\)?", answer: "\\(3\\)" },
      ],
      pyqExampleId: "436ca621-771e-4d79-8a1e-f44765bb912e", // 2025 — 2k terms, odd sum 40, even sum 55, last - first = 27
      traps: [
        {
          title: "Odd-placed, not odd-valued",
          body: "The odd terms of an AP are \\(a_1,a_3,a_5,\\dots\\), the terms in odd positions. Their values need not be odd numbers.",
        },
      ],
    },
  ],
};
