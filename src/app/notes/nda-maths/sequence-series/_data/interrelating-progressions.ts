import type { SubtopicNote } from "@/app/notes/_types";

export const INTERRELATING_PROGRESSIONS_NOTE: SubtopicNote = {
  subtopicName: "Interrelating AP, GP and HP",
  title: "Interrelating AP, GP and HP — the bridge tricks",
  oneLineDefinition:
    "NDA's favourite hard genre: take logs to turn a GP into an AP, take reciprocals to turn an HP into an AP, and translate \"roots of an equation\" conditions into progression conditions.",
  whyItMatters:
    "Fifteen PYQs and the chapter's signature difficulty — six of these are HARD. The wins come from " +
    "three reflexes: take logs to turn a GP into an AP, take reciprocals to turn an HP into an AP, " +
    "and write down the three standard three-term conditions before doing anything else. " +
    "Almost every \"if … are in AP and … are in GP\" chain falls to writing those conditions and " +
    "eliminating. Master the five moves below and the hard band of this chapter opens up.",
  concepts: [
    // C1 — the three conditions + (a-b)/(b-c) identity
    {
      kind: "formula" as const,
      slug: "three-term-conditions",
      name: "The three three-term conditions",
      intuition:
        "Every progression has a one-line test for three numbers. AP: the middle is the average. " +
        "GP: the middle squared is the product. HP: flip to reciprocals and test for AP. A neat " +
        "unifier is the ratio \\(\\tfrac{a-b}{b-c}\\): it equals 1 for an AP, \\(\\tfrac{a}{b}\\) for a " +
        "GP, and \\(\\tfrac{a}{c}\\) for an HP — a quick way to tell them apart.",
      definition:
        "For three numbers \\(a, b, c\\):\n" +
        "- **AP** \\(\\iff 2b = a + c\\), and then \\(\\dfrac{a-b}{b-c} = 1\\).\n" +
        "- **GP** \\(\\iff b^2 = ac\\), and then \\(\\dfrac{a-b}{b-c} = \\dfrac{a}{b}\\).\n" +
        "- **HP** \\(\\iff b = \\dfrac{2ac}{a+c}\\), and then \\(\\dfrac{a-b}{b-c} = \\dfrac{a}{c}\\).\n" +
        "These three are the workhorses of the entire subtopic — write them down first, always.",
      formula: {
        label: "The unifying ratio",
        latex: "\\frac{a-b}{b-c} = \\begin{cases} 1 & \\text{AP} \\\\[2pt] a/b & \\text{GP} \\\\[2pt] a/c & \\text{HP} \\end{cases}",
      },
      authoredExample: {
        prompt: "Are \\(3, 6, 12\\) in AP, GP, or HP? Compute \\(\\dfrac{a-b}{b-c}\\) and confirm it matches.",
        steps: [
          "Test GP: \\(b^2 = 6^2 = 36\\) and \\(ac = 3 \\times 12 = 36\\) — equal, so they are in GP (ratio 2).",
          "Compute the ratio: \\(\\dfrac{3 - 6}{6 - 12} = \\dfrac{-3}{-6} = \\dfrac12\\).",
          "For a GP this should equal \\(\\dfrac{a}{b} = \\dfrac{3}{6} = \\dfrac12\\) — it matches.",
        ],
        answer: "GP; \\(\\dfrac{a-b}{b-c} = \\dfrac12 = \\dfrac{a}{b}\\).",
      },
      selfCheckExample: {
        prompt: "For the HP \\(6, 3, 2\\), verify that \\(\\dfrac{a-b}{b-c} = \\dfrac{a}{c}\\).",
        steps: [
          "\\(\\dfrac{a-b}{b-c} = \\dfrac{6-3}{3-2} = \\dfrac{3}{1} = 3\\).",
          "\\(\\dfrac{a}{c} = \\dfrac{6}{2} = 3\\).",
          "They match — confirming the HP identity.",
        ],
        answer: "Both equal 3.",
      },
      practiceSet: [
        { prompt: "Three-term test for GP?", answer: "\\(b^2 = ac\\)" },
        { prompt: "\\(\\tfrac{a-b}{b-c}\\) for an AP equals?", answer: "\\(1\\)" },
        { prompt: "Are \\(2, 4, 6\\) AP, GP, or HP?", answer: "AP", method: "\\(2(4) = 2 + 6\\)" },
        { prompt: "\\(\\tfrac{a-b}{b-c}\\) for an HP equals?", answer: "\\(\\tfrac{a}{c}\\)" },
      ],
      pyqExampleId: "8c269bc9-e12a-4fb3-b6eb-0e3f75955070", // 2018 — (a-b)/(b-c) for AP/GP/HP
    },

    // C2 — log bridge: GP -> AP
    {
      kind: "formula" as const,
      slug: "log-bridge-gp-to-ap",
      name: "The log bridge: a GP becomes an AP",
      intuition:
        "Logarithms turn multiplication into addition. So taking the log of every term of a GP turns " +
        "the constant ratio into a constant difference — the logs are in AP. This single move handles " +
        "questions that mix \"in GP\" with \"\\(\\ln\\) … in AP\", and questions with exponents like " +
        "\\(p^x = q^y = r^z\\).",
      definition:
        "If \\(x, y, z\\) are in GP (\\(y^2 = xz\\)), then \\(\\log x, \\log y, \\log z\\) are in AP " +
        "(since \\(2\\log y = \\log x + \\log z\\)) — for any base. Conversely, if logs are in AP the " +
        "originals are in GP. For \\(p^x = q^y = r^z = k\\): take logs to get \\(x\\log p = y\\log q = " +
        "z\\log r\\), then \\(\\log p, \\log q, \\log r\\) relate through the progression of \\(x, y, z\\).",
      formula: {
        label: "The bridge",
        latex: "x, y, z \\text{ in GP} \\iff \\log x, \\log y, \\log z \\text{ in AP}",
      },
      authoredExample: {
        prompt: "The numbers \\(2, 4, 8\\) are in GP. Show that \\(\\log 2, \\log 4, \\log 8\\) are in AP.",
        steps: [
          "Write each: \\(\\log 2,\\ \\log 4 = 2\\log 2,\\ \\log 8 = 3\\log 2\\).",
          "These are \\(\\log 2 \\cdot (1, 2, 3)\\) — equally spaced, common difference \\(\\log 2\\).",
          "Check the AP condition: \\(2\\log 4 = 4\\log 2 = \\log 2 + \\log 8\\). ✓",
        ],
        answer: "\\(\\log 2, \\log 4, \\log 8\\) are in AP with common difference \\(\\log 2\\).",
      },
      selfCheckExample: {
        prompt:
          "If \\(p^2, q^2, r^2\\) are in GP (with \\(p, q, r > 0\\)), show \\(\\ln p, \\ln q, \\ln r\\) are in AP.",
        steps: [
          "\\(p^2, q^2, r^2\\) in GP \\(\\Rightarrow (q^2)^2 = p^2 r^2 \\Rightarrow q^2 = pr\\), so \\(p, q, r\\) are in GP.",
          "Take logs: \\(2\\ln q = \\ln p + \\ln r\\).",
          "That is exactly the AP condition for \\(\\ln p, \\ln q, \\ln r\\).",
        ],
        answer: "\\(\\ln p, \\ln q, \\ln r\\) are in AP.",
      },
      practiceSet: [
        { prompt: "Taking logs turns a GP into a(n)?", answer: "AP" },
        { prompt: "If \\(\\log a, \\log b, \\log c\\) are in AP, then \\(a, b, c\\) are in?", answer: "GP" },
        { prompt: "Are \\(\\log 3, \\log 9, \\log 27\\) in AP?", answer: "Yes", method: "they are \\(\\log 3 \\cdot (1,2,3)\\)" },
        { prompt: "If \\(x, y, z\\) in GP, what is the common difference of \\(\\ln x, \\ln y, \\ln z\\)?", answer: "\\(\\ln r\\)" },
      ],
      pyqExampleId: "32ee872f-accc-46d3-9709-9c322b9ba4e1", // 2020 — p^2,q^2,r^2 in GP -> p,q,r GP & ln AP
    },

    // C3 — reciprocal bridge: HP -> AP
    {
      kind: "formula" as const,
      slug: "reciprocal-bridge-hp-to-ap",
      name: "The reciprocal bridge: an HP becomes an AP",
      intuition:
        "An HP is defined by its reciprocals being in AP — so any HP condition is best handled by " +
        "flipping. The classic NDA shape wraps the reciprocals in expressions like " +
        "\\(\\tfrac{1}{b+c}, \\tfrac{1}{c+a}, \\tfrac{1}{a+b}\\): \"in HP\" means the denominators " +
        "\\(b+c, c+a, a+b\\) are in AP, which collapses to a simple relation among \\(a, b, c\\).",
      definition:
        "\\(\\tfrac{1}{u}, \\tfrac{1}{v}, \\tfrac{1}{w}\\) are in HP \\(\\iff u, v, w\\) are in AP " +
        "\\(\\iff 2v = u + w\\). So whenever you see reciprocals \"in HP\", drop to the denominators " +
        "and impose the AP condition on them.",
      formula: {
        label: "Reciprocal flip",
        latex: "\\frac{1}{u}, \\frac{1}{v}, \\frac{1}{w} \\text{ in HP} \\iff u, v, w \\text{ in AP}",
      },
      authoredExample: {
        prompt:
          "If \\(\\dfrac{1}{b+c}, \\dfrac{1}{c+a}, \\dfrac{1}{a+b}\\) are in HP, show that \\(a, b, c\\) are in AP.",
        steps: [
          "\"Reciprocals in HP\" means the denominators \\(b+c,\\ c+a,\\ a+b\\) are in AP.",
          "AP condition: \\(2(c+a) = (b+c) + (a+b)\\).",
          "Expand: \\(2c + 2a = a + 2b + c \\Rightarrow a + c = 2b\\).",
          "That is exactly the AP condition for \\(a, b, c\\).",
        ],
        answer: "\\(a, b, c\\) are in AP.",
      },
      selfCheckExample: {
        prompt: "If \\(a, b, c\\) are in HP, find \\(\\dfrac{1}{b-a} + \\dfrac{1}{b-c}\\) in a simpler form.",
        steps: [
          "HP means \\(\\tfrac1a, \\tfrac1b, \\tfrac1c\\) are in AP, so \\(\\tfrac1b - \\tfrac1a = \\tfrac1c - \\tfrac1b\\).",
          "Rewrite: \\(\\dfrac{1}{b-a} + \\dfrac{1}{b-c}\\) over a common idea — using \\(\\tfrac{2}{b} = \\tfrac1a + \\tfrac1c\\), it simplifies to \\(\\dfrac{2}{b}\\).",
        ],
        answer: "\\(\\dfrac{2}{b}\\).",
      },
      practiceSet: [
        { prompt: "\\(\\tfrac1u, \\tfrac1v, \\tfrac1w\\) in HP means \\(u, v, w\\) in?", answer: "AP" },
        { prompt: "To solve an HP problem, first take?", answer: "Reciprocals" },
        { prompt: "If \\(\\tfrac1x, \\tfrac1y, \\tfrac1z\\) are in AP, then \\(x, y, z\\) are in?", answer: "HP" },
        { prompt: "Denominators \\(b+c, c+a, a+b\\) in AP give which relation?", answer: "\\(2b = a + c\\)" },
      ],
      pyqExampleId: "8a33bf13-04c5-4c45-a542-b7aaa8884696", // 2021 — 1/(b+c),1/(c+a),1/(a+b) in HP -> a,b,c AP
    },

    // C4 — mixed chains
    {
      kind: "formula" as const,
      slug: "mixed-progression-problems",
      name: "Mixed and chained progression problems",
      intuition:
        "When a problem strings several conditions together — some terms in AP, others in GP, others " +
        "in HP — the method never changes: write each condition algebraically (\\(2b=a+c\\), " +
        "\\(c^2=bd\\), \\(\\tfrac{2}{d}=\\tfrac1c+\\tfrac1e\\)), then eliminate to get the asked relation. " +
        "A famous special case: three numbers that are simultaneously in AP and GP must be equal.",
      definition:
        "Translate every clause into its three-term condition, then substitute and eliminate. Useful " +
        "facts that drop out: numbers in **both AP and GP are all equal** (\\(a = b = c\\)); and chains " +
        "like \\(a,b,c\\) in AP, \\(b,c,d\\) in GP, \\(c,d,e\\) in HP force \\(a, c, e\\) into GP. There " +
        "is no shortcut beyond careful elimination — set it up cleanly.",
      authoredExample: {
        prompt: "If \\(a, b, c\\) are in AP and also in GP, prove that \\(a = b = c\\).",
        steps: [
          "AP: \\(a + c = 2b\\). GP: \\(b^2 = ac\\).",
          "Treat \\(a\\) and \\(c\\) as roots of \\(t^2 - (a+c)t + ac = 0\\), i.e. \\(t^2 - 2bt + b^2 = 0\\).",
          "That factors as \\((t - b)^2 = 0\\), so both roots equal \\(b\\): \\(a = c = b\\).",
        ],
        answer: "\\(a = b = c\\).",
      },
      selfCheckExample: {
        prompt: "If \\(p, 1, q\\) are in AP and \\(p, 2, q\\) are in GP, show that \\(p, 4, q\\) are in HP.",
        steps: [
          "AP gives \\(p + q = 2(1) = 2\\). GP gives \\(pq = 2^2 = 4\\).",
          "HP of \\(p\\) and \\(q\\) with middle term \\(m\\) needs \\(m = \\dfrac{2pq}{p+q}\\).",
          "Compute: \\(\\dfrac{2pq}{p+q} = \\dfrac{2 \\times 4}{2} = 4\\).",
          "So the harmonic mean of \\(p, q\\) is 4 — hence \\(p, 4, q\\) are in HP.",
        ],
        answer: "Confirmed: \\(p, 4, q\\) are in HP.",
      },
      practiceSet: [
        { prompt: "Three numbers in both AP and GP must be?", answer: "Equal" },
        { prompt: "AM, GM, HM of two numbers are themselves in which progression?", answer: "GP", method: "\\(\\text{GM}^2 = \\text{AM}\\cdot\\text{HM}\\)" },
        { prompt: "If \\(a, b, c\\) in AP, what equals \\(2b\\)?", answer: "\\(a + c\\)" },
        { prompt: "If \\(b, c, d\\) in GP, write the condition.", answer: "\\(c^2 = bd\\)" },
      ],
      pyqExampleId: "079f5a5a-de5c-46fd-b2c5-7dfbba0a007d", // 2024 — a,b,c AP; b,c,d GP; c,d,e HP -> a,c,e GP
    },

    // C5 — Vieta's into a progression condition
    {
      kind: "formula" as const,
      slug: "vieta-progression-conditions",
      name: "Roots, coefficients, and progression conditions",
      intuition:
        "Some questions hide a progression inside a quadratic. The link is Vieta's relations: for " +
        "\\(ax^2 + bx + c = 0\\), the roots sum to \\(-b/a\\) and multiply to \\(c/a\\). A condition on " +
        "the roots (their ratio, or a symmetric expression in them) becomes an equation in the " +
        "coefficients — which often turns out to say the coefficients are in AP, GP, or HP.",
      definition:
        "For \\(ax^2 + bx + c = 0\\) with roots \\(\\alpha, \\beta\\):\n" +
        "\\[ \\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}. \\]\n" +
        "Symmetric functions reduce to these: \\(\\alpha^2 + \\beta^2 = (\\alpha+\\beta)^2 - 2\\alpha\\beta\\), " +
        "\\(\\tfrac{1}{\\alpha} + \\tfrac{1}{\\beta} = \\tfrac{\\alpha+\\beta}{\\alpha\\beta}\\), etc. Plug a " +
        "given root-condition into these and simplify to read off the progression among the coefficients.",
      formula: {
        label: "Vieta's relations (monic-friendly)",
        latex: "\\alpha + \\beta = -\\frac{b}{a}, \\qquad \\alpha\\beta = \\frac{c}{a}",
      },
      authoredExample: {
        prompt:
          "For \\(x^2 + px + q = 0\\) with roots \\(\\alpha, \\beta\\), express \\(\\alpha^2 + \\beta^2\\) in terms of \\(p\\) and \\(q\\).",
        steps: [
          "Vieta: \\(\\alpha + \\beta = -p\\) and \\(\\alpha\\beta = q\\).",
          "Use the identity \\(\\alpha^2 + \\beta^2 = (\\alpha + \\beta)^2 - 2\\alpha\\beta\\).",
          "Substitute: \\((-p)^2 - 2q = p^2 - 2q\\).",
        ],
        answer: "\\(\\alpha^2 + \\beta^2 = p^2 - 2q\\).",
      },
      selfCheckExample: {
        prompt: "The roots of \\(x^2 - 18x + k = 0\\) are in the ratio \\(4 : 5\\). Find \\(k\\).",
        steps: [
          "Let the roots be \\(4t\\) and \\(5t\\). Sum \\(= 9t = 18 \\Rightarrow t = 2\\).",
          "So the roots are \\(8\\) and \\(10\\).",
          "Product \\(= k = 8 \\times 10\\).",
        ],
        answer: "\\(k = 80\\).",
      },
      practiceSet: [
        { prompt: "Sum of roots of \\(x^2 - 7x + 12 = 0\\)?", answer: "\\(7\\)" },
        { prompt: "Product of roots of \\(2x^2 + 3x + 5 = 0\\)?", answer: "\\(\\tfrac52\\)", method: "\\(c/a\\)" },
        { prompt: "\\(\\tfrac1\\alpha + \\tfrac1\\beta\\) equals?", answer: "\\(\\tfrac{\\alpha+\\beta}{\\alpha\\beta}\\)" },
        { prompt: "If roots of \\(x^2 - bx + c\\) are equal, then?", answer: "\\(b^2 = 4c\\)" },
      ],
      pyqExampleId: "e6533f20-e994-4031-b727-546a18fd7c57", // 2017 — sum of roots = sum of recip squares -> a,ca^2,c^2 in GP
    },
  ],
  related: [
    { label: "Harmonic Progressions and the Three Means", href: "/notes/nda-maths/sequence-series/seq-harmonic-means" },
    { label: "NDA Maths compound tricks", href: "/guide/nda-maths/compound-tricks" },
  ],
};
