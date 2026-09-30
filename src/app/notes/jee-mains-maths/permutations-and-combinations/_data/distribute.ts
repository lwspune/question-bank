import type { SubtopicNote } from "@/app/notes/_types";

export const DISTRIBUTE_PNC_NOTE: SubtopicNote = {
  subtopicName: "Distributions and Integer Solutions",
  title: "Distributions and Integer Solutions",
  oneLineDefinition:
    "Sharing objects among people or boxes: identical objects (stars and bars, integer solutions with bounds) and distinct objects (onto maps, groups, partitions).",
  whyItMatters:
    "Seventeen PYQs, and 2024 alone has six. The first question is always whether the objects are identical and whether the boxes are distinct; that decides the method. Eleven share identical objects and six share distinct ones. Two ideas cover the page.",
  concepts: [
    // C1 — identical objects
    {
      kind: "formula" as const,
      slug: "jpnc-identical",
      name: "Identical objects: stars and bars",
      intuition:
        "Sharing \\(n\\) identical objects among \\(k\\) people is the number of solutions of \\(x_1+\\dots+x_k=n\\) in non-negative integers: \\(\\binom{n+k-1}{k-1}\\). A lower bound is removed by substitution; an upper bound is handled by subtracting the cases that break it. When the boxes are identical too, only the partition of \\(n\\) matters, so list the partitions.",
      definition:
        "- \\(x_i\\ge0\\): \\(\\binom{n+k-1}{k-1}\\); \\(x_i\\ge1\\): \\(\\binom{n-1}{k-1}\\).\n" +
        "- \\(x_i\\ge a_i\\): put \\(y_i=x_i-a_i\\).\n" +
        "- Upper bound \\(x_i\\le b\\): subtract solutions with \\(x_i\\ge b+1\\).\n" +
        "- A coefficient such as \\(a+b+2c=N\\): fix \\(c\\) and add.\n" +
        "- Identical into identical boxes: partitions of \\(n\\).",
      formula: {
        label: "Stars and bars",
        latex: "x_1+\\cdots+x_k=n,\\ x_i\\ge0:\\quad\\binom{n+k-1}{k-1}",
      },
      authoredExample: {
        prompt: "In how many ways can 12 identical sweets be shared among 3 children, each getting at least 2?",
        steps: [
          "\\(y_i=x_i-2\\): \\(y_1+y_2+y_3=6\\).",
        ],
        answer: "\\(\\binom82=28\\).",
      },
      selfCheckExample: {
        prompt: "How many non-negative solutions has \\(x+y+z=7\\) with \\(x\\le3\\)?",
        steps: [
          "All: \\(\\binom92=36\\). With \\(x\\ge4\\): \\(\\binom52=10\\).",
        ],
        answer: "\\(26\\).",
      },
      practiceSet: [
        { prompt: "Positive solutions of \\(a+b+c=10\\)?", answer: "\\(\\binom92=36\\)" },
        { prompt: "Non-negative solutions of \\(a+b+c+d=5\\)?", answer: "\\(\\binom83=56\\)" },
        { prompt: "Partitions of 5 into at most 2 parts?", answer: "\\(3\\)" },
        { prompt: "Positive solutions of \\(xyz=12\\)?", answer: "\\(\\binom42\\cdot3=18\\)" },
      ],
      pyqExampleId: "9fdde18c-155d-4e73-bf86-82be3132af3c", // 2024 — 21 identical apples, three children, each at least 2
      traps: [
        {
          title: "Distinct values are a separate count",
          body: "'\\(x,y,z\\) distinct' is not built into stars and bars. Count all solutions, then subtract those with two or three equal values, using inclusion–exclusion.",
        },
      ],
    },

    // C2 — distinct objects
    {
      kind: "formula" as const,
      slug: "jpnc-distinct",
      name: "Distinct objects: onto maps and groups",
      intuition:
        "Each of \\(n\\) distinct objects chooses one of \\(k\\) distinct boxes: \\(k^n\\) ways. If no box may be empty, subtract by inclusion–exclusion: \\(\\sum_{j}(-1)^j\\binom kj(k-j)^n\\). Splitting into groups of given sizes is \\(\\frac{n!}{a!\\,b!\\cdots}\\), divided by the factorial of the number of equal-sized groups if the groups are unlabelled.",
      definition:
        "- Onto maps: \\(k^n-\\binom k1(k-1)^n+\\binom k2(k-2)^n-\\cdots\\).\n" +
        "- Groups of sizes \\(a,b,c\\) (labelled): \\(\\frac{n!}{a!\\,b!\\,c!}\\).\n" +
        "- Unlabelled equal groups: divide by the factorial of how many are equal.\n" +
        "- Into \\(k\\) identical boxes: sum of Stirling numbers \\(S(n,1)+\\dots+S(n,k)\\).",
      formula: {
        label: "Onto maps",
        latex: "\\sum_{j=0}^{k}(-1)^j\\binom kj(k-j)^n",
      },
      authoredExample: {
        prompt: "In how many ways can 4 different balls go into 2 different boxes with neither empty?",
        steps: [
          "\\(2^4-2=14\\).",
        ],
        answer: "\\(14\\).",
      },
      selfCheckExample: {
        prompt: "In how many ways can 6 people be split into two unlabelled groups of 3?",
        steps: [
          "\\(\\frac{6!}{3!\\,3!\\,2!}\\).",
        ],
        answer: "\\(10\\).",
      },
      practiceSet: [
        { prompt: "5 distinct letters into 3 distinct boxes, any allowed?", answer: "\\(3^5\\)" },
        { prompt: "Onto maps from 4 elements to 3?", answer: "\\(36\\)" },
        { prompt: "8 people into labelled cars of 3, 3, 2?", answer: "\\(\\frac{8!}{3!\\,3!\\,2!}=560\\)" },
        { prompt: "\\(S(4,2)\\)?", answer: "\\(7\\)" },
      ],
      pyqExampleId: "08c5a11d-82aa-4122-88ea-0fdcd7024213", // 2026 — four books into three bags, no bag empty
      traps: [
        {
          title: "Labelled or unlabelled",
          body: "Cars of different makes are labelled, so which car gets 2 people matters. Unnamed groups of equal size are not: divide by the ways to permute those groups.",
        },
      ],
    },
  ],
};
