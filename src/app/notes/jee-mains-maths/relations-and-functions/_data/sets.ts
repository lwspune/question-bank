import type { SubtopicNote } from "@/app/notes/_types";

export const SETS_FN_NOTE: SubtopicNote = {
  subtopicName: "Sets and Counting Elements",
  title: "Sets and Counting Elements",
  oneLineDefinition:
    "Sets described by conditions and then combined by union, intersection and difference; counting people in overlapping groups by inclusion–exclusion; and counting subsets.",
  whyItMatters:
    "Eighteen PYQs. Half describe two or three sets by inequalities and ask which statement about their union, intersection or difference holds. The rest count: students in overlapping groups, or subsets with a property. Three ideas cover the page.",
  concepts: [
    // C1 — sets from conditions
    {
      kind: "formula" as const,
      slug: "jfn-set-intervals",
      name: "Sets given by conditions, then combined",
      intuition:
        "Solve each condition first, so that every set becomes an interval, a union of intervals, or a list. Then combine them on a number line: the union keeps anything in either, the intersection keeps only the overlap, and \\(A-B\\) keeps the part of \\(A\\) outside \\(B\\). For sets of points in the plane, sketch the regions and list the points that qualify.",
      definition:
        "- \\(A\\cup B\\): in \\(A\\) or \\(B\\). \\(A\\cap B\\): in both.\n" +
        "- \\(A-B=A\\cap B'\\): in \\(A\\), not in \\(B\\).\n" +
        "- \\(|x-a|<r\\) means \\(a-r<x<a+r\\); \\(|x-a|\\ge r\\) means \\(x\\le a-r\\) or \\(x\\ge a+r\\).\n" +
        "- A complement flips each bracket: \\([\\ \\) becomes \\(\\ )\\) and back.",
      formula: {
        label: "Difference of sets",
        latex: "A-B=A\\cap B'",
      },
      authoredExample: {
        prompt: "\\(A=\\{x:|x-1|<3\\}\\), \\(B=\\{x:x^2\\ge4\\}\\). Find \\(A-B\\).",
        steps: [
          "\\(A=(-2,4)\\), \\(B=(-\\infty,-2]\\cup[2,\\infty)\\).",
          "The part of \\(A\\) outside \\(B\\) lies strictly between \\(-2\\) and \\(2\\).",
        ],
        answer: "\\(A-B=(-2,2)\\).",
      },
      selfCheckExample: {
        prompt: "\\(A=\\{x:|x|\\le3\\}\\), \\(B=\\{x:|x-4|<2\\}\\). Find \\(A\\cap B\\).",
        steps: [
          "\\(A=[-3,3]\\), \\(B=(2,6)\\).",
        ],
        answer: "\\((2,3]\\).",
      },
      practiceSet: [
        { prompt: "\\(|x-2|\\le1\\) as an interval?", answer: "\\([1,3]\\)" },
        { prompt: "Complement of \\((-\\infty,1)\\cup[3,\\infty)\\)?", answer: "\\([1,3)\\)" },
        { prompt: "\\([0,5]-(2,7)\\)?", answer: "\\([0,2]\\)" },
        { prompt: "How many integers lie in \\((-2.5,3]\\)?", answer: "\\(6\\)" },
      ],
      pyqExampleId: "c31fcef2-f5d3-41c5-9540-4634e0e6de9c", // 2022 — |x+1| < 2 and |x-1| >= 2: which statement is NOT true
      traps: [
        {
          title: "Strict or not at the ends",
          body: "\\(|x|<2\\) leaves out \\(\\pm2\\); \\(|x|\\le2\\) keeps them. An option that differs from the truth only at an endpoint is usually the wrong one.",
        },
      ],
    },

    // C2 — inclusion-exclusion
    {
      kind: "formula" as const,
      slug: "jfn-inclusion-exclusion",
      name: "Counting overlapping groups by inclusion–exclusion",
      intuition:
        "Adding the sizes of groups counts everyone in two groups twice, so subtract each pairwise overlap; then everyone in all three has been added three times and subtracted three times, so add the triple overlap back. When the triple overlap is unknown, the rule that no region of the Venn diagram can be negative bounds it. People in exactly one, two or three groups can be counted from the total number of memberships.",
      definition:
        "- \\(n(A\\cup B)=n(A)+n(B)-n(A\\cap B)\\).\n" +
        "- \\(n(A\\cup B\\cup C)=\\sum n(A)-\\sum n(A\\cap B)+n(A\\cap B\\cap C)\\).\n" +
        "- **Least overlap** of two groups inside a total \\(T\\): \\(n(A)+n(B)-T\\).\n" +
        "- If \\(s,t,u\\) people are in exactly 1, 2, 3 groups: \\(s+t+u\\) = people, \\(s+2t+3u\\) = memberships.",
      formula: {
        label: "Three sets",
        latex: "n(A\\cup B\\cup C)=\\textstyle\\sum n(A)-\\sum n(A\\cap B)+n(A\\cap B\\cap C)",
      },
      authoredExample: {
        prompt: "Of 100 students, 60 study Hindi, 50 study Sanskrit and 30 study both. How many study neither?",
        steps: [
          "\\(n(H\\cup S)=60+50-30=80\\).",
        ],
        answer: "\\(20\\).",
      },
      selfCheckExample: {
        prompt: "30 people won 15, 12 and 10 awards in three events; everyone won at least one and 2 won all three. How many won exactly two?",
        steps: [
          "\\(s+t+2=30\\) and \\(s+2t+6=37\\).",
          "So \\(s+t=28\\), \\(s+2t=31\\).",
        ],
        answer: "\\(t=3\\).",
      },
      practiceSet: [
        { prompt: "\\(n(A)=12\\), \\(n(B)=9\\), \\(n(A\\cap B)=4\\). \\(n(A\\cup B)\\)?", answer: "\\(17\\)" },
        { prompt: "70% like tea and 60% like coffee. Least share liking both?", answer: "30%" },
        { prompt: "\\(n(A\\cup B)=20\\), \\(n(A)=12\\), \\(n(B)=15\\). \\(n(A\\cap B)\\)?", answer: "\\(7\\)" },
        { prompt: "Multiples of 2 or 3 from 1 to 30?", answer: "\\(20\\)" },
      ],
      pyqExampleId: "320f4e62-6207-498f-8372-1f5db94374f5", // 2023 — 48, 25, 18 medals to 60 men, 5 got all three
      traps: [
        {
          title: "The least overlap is not zero",
          body: "Two groups inside a fixed total must overlap by at least \\(n(A)+n(B)-T\\). A bound of zero ignores the total.",
        },
      ],
    },

    // C3 — subsets
    {
      kind: "formula" as const,
      slug: "jfn-subsets",
      name: "Counting subsets",
      intuition:
        "A set of \\(n\\) elements has \\(2^n\\) subsets, because each element is either in or out. To count subsets that meet a part \\(B\\) of \\(k\\) elements, subtract those that avoid it: \\(2^n-2^{n-k}\\). For an 'either … or …' condition, count the subsets that fail it and subtract.",
      definition:
        "- Subsets of an \\(n\\)-set: \\(2^n\\). Non-empty: \\(2^n-1\\). Proper and non-empty: \\(2^n-2\\).\n" +
        "- Subsets meeting a \\(k\\)-element part: \\(2^n-2^{n-k}\\).\n" +
        "- Containing some fixed elements and avoiding others: \\(2^{\\text{free elements}}\\).",
      formula: {
        label: "Subsets meeting a k-element part",
        latex: "2^n-2^{n-k}",
      },
      authoredExample: {
        prompt: "How many subsets of \\(\\{1,\\dots,6\\}\\) contain at least one of 1 and 2?",
        steps: [
          "All minus those avoiding both: \\(2^6-2^4\\).",
        ],
        answer: "\\(48\\).",
      },
      selfCheckExample: {
        prompt: "A set has 48 more subsets than another. Find the two sizes.",
        steps: [
          "\\(2^m-2^n=2^n(2^{m-n}-1)=16\\cdot3\\), so \\(n=4\\), \\(2^{m-n}=4\\).",
        ],
        answer: "\\(m=6\\), \\(n=4\\).",
      },
      practiceSet: [
        { prompt: "Subsets of a 5-element set?", answer: "\\(32\\)" },
        { prompt: "Subsets of \\(\\{1,\\dots,5\\}\\) with no even number?", answer: "\\(8\\)" },
        { prompt: "Non-empty proper subsets of a 4-element set?", answer: "\\(14\\)" },
        { prompt: "Subsets of \\(\\{1,\\dots,7\\}\\) containing 1 but not 2?", answer: "\\(32\\)" },
      ],
      pyqExampleId: "6686edd2-cc7e-4b24-a317-027293ec0f13", // 2022 — subsets of {1,...,7} meeting {3,6,7,9}
      traps: [
        {
          title: "Only the shared elements count",
          body: "A subset of \\(A\\) meets \\(B\\) only through \\(A\\cap B\\). Elements of \\(B\\) outside \\(A\\) do not change the count.",
        },
      ],
    },
  ],
};
