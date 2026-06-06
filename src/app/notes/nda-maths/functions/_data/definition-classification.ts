import type { SubtopicNote } from "@/app/notes/_types";

export const FUNCTIONS_DEFINITION_CLASSIFICATION_NOTE: SubtopicNote = {
  subtopicName:
    "Function Definition and Classification — Injectivity, Surjectivity, Bijectivity",
  title: "What a Function Is, and How to Classify It",
  oneLineDefinition:
    "A function assigns each input exactly one output; classifying it as one-one, onto, or bijective is about how inputs and outputs are paired.",
  whyItMatters:
    "Eight PYQs, all EASY–MODERATE — the vocabulary the rest of the chapter is built on. " +
    "The bank tests three things: whether a given rule even is a function (the vertical-line / " +
    "well-defined test), whether it is one-one and/or onto, and how to count functions of a given " +
    "type. Get the definitions exact and these are free marks; blur 'onto' and 'into' and you lose them.",
  concepts: [
    // Foundation — vocabulary, no bank PYQ of its own
    {
      kind: "formula" as const,
      slug: "funcs-mapping-terms",
      name: "Domain, codomain, range — the vocabulary",
      intuition:
        "Every function comes with three sets. The **domain** is what you are allowed to put in, the " +
        "**codomain** is the declared set of possible outputs, and the **range** is the part of the " +
        "codomain you actually hit. Range is always a subset of the codomain — the gap between them is " +
        "exactly what 'onto' is about.",
      definition:
        "For \\(f:A\\to B\\):\n" +
        "- **Domain** \\(=A\\): the set of all valid inputs.\n" +
        "- **Codomain** \\(=B\\): the declared target set.\n" +
        "- **Range** \\(=f(A)=\\{f(x):x\\in A\\}\\): the set of values actually taken. Always \\(f(A)\\subseteq B\\).\n" +
        "- **Image** of \\(x\\) is \\(f(x)\\); **pre-image** of \\(y\\) is any \\(x\\) with \\(f(x)=y\\).",
      authoredExample: {
        prompt:
          "For \\(f:\\mathbb{R}\\to\\mathbb{R}\\), \\(f(x)=x^2\\), state the domain, codomain and range.",
        steps: [
          "Domain is the declared input set \\(\\mathbb{R}\\) — every real has a square.",
          "Codomain is the declared target \\(\\mathbb{R}\\).",
          "Range is what is actually produced: squares are \\(\\ge 0\\), so range \\(=[0,\\infty)\\).",
          "Range \\([0,\\infty)\\subsetneq\\mathbb{R}\\) — the negatives are never hit, so this is not onto.",
        ],
        answer: "Domain \\(\\mathbb{R}\\), codomain \\(\\mathbb{R}\\), range \\([0,\\infty)\\).",
      },
      practiceSet: [
        { prompt: "Range vs codomain — which can be smaller?", answer: "Range; range \\(\\subseteq\\) codomain always" },
        { prompt: "Domain of \\(f(x)=x^3\\) on \\(\\mathbb{R}\\)?", answer: "\\(\\mathbb{R}\\)" },
        { prompt: "Image of \\(3\\) under \\(f(x)=2x-1\\)?", answer: "\\(5\\)" },
        { prompt: "A pre-image of \\(4\\) under \\(f(x)=x^2\\)?", answer: "\\(2\\) (or \\(-2\\))" },
      ],
    },

    // Is it a function?
    {
      kind: "formula" as const,
      slug: "funcs-is-it-a-function",
      name: "Is it a function? Well-defined and the vertical-line test",
      intuition:
        "A rule is a function only if every input gives **exactly one** output — no input left out, none " +
        "sent to two places. On a graph this is the **vertical-line test**: any vertical line meets the " +
        "graph at most once.",
      definition:
        "\\(f:A\\to B\\) is a function iff for every \\(x\\in A\\) there is **one and only one** \\(y\\in B\\) " +
        "with \\(f(x)=y\\). Failures: a value with **no** output (gap in domain) or a value with **two** " +
        "outputs (relation, not a function). A piecewise rule must **agree at the join** to stay well-defined.",
      authoredExample: {
        prompt:
          "Does \\(y^2=x\\) define \\(y\\) as a function of \\(x\\) for \\(x>0\\)?",
        steps: [
          "Solve for \\(y\\): \\(y=\\pm\\sqrt{x}\\).",
          "For \\(x=4\\) this gives \\(y=2\\) and \\(y=-2\\) — two outputs for one input.",
          "The vertical line \\(x=4\\) meets the curve twice.",
        ],
        answer: "No — one input has two outputs, so it is not a function.",
      },
      traps: [
        {
          title: "Piecewise rules must agree at the boundary",
          body:
            "A two-piece rule like \\(f(x)=x^2\\) on \\([0,4]\\) and \\(3x\\) on \\([4,8]\\) is only a function if the " +
            "pieces give the **same value** at the shared point \\(x=4\\) (here \\(16\\neq12\\), so it is **not** " +
            "well-defined). Always check the join before declaring it a function.",
        },
      ],
      pyqExampleId: "f3031b8a-80d9-4207-a8ad-1890b348bb21", // 2018 — S = {(x,y): x²+y²=1} is not a function
    },

    // One-one, onto, bijective
    {
      kind: "formula" as const,
      slug: "funcs-one-one-onto-bijective",
      name: "One-one, onto, and bijective",
      intuition:
        "**One-one (injective):** different inputs give different outputs — no two arrows land together. " +
        "**Onto (surjective):** every element of the codomain is hit — range equals codomain. " +
        "**Bijective:** both at once, so inputs and outputs pair up perfectly (and the function is invertible).",
      definition:
        "- **Injective:** \\(f(x_1)=f(x_2)\\Rightarrow x_1=x_2\\) (equivalently, every horizontal line meets the graph at most once).\n" +
        "- **Surjective:** range \\(=\\) codomain, i.e. every \\(y\\in B\\) has a pre-image.\n" +
        "- **Bijective:** injective **and** surjective. Only bijections have an inverse.\n" +
        "Onto depends on the **codomain you declare** — shrinking the codomain to the range makes any function onto.",
      visualizationSlug: "function-mapping-diagram",
      authoredExample: {
        prompt:
          "Classify \\(f:\\mathbb{R}\\to\\mathbb{R}\\), \\(f(x)=x^2\\), as one-one / onto.",
        steps: [
          "One-one? \\(f(2)=f(-2)=4\\) — two inputs, one output, so **not** one-one.",
          "Onto? Range is \\([0,\\infty)\\), which is not all of \\(\\mathbb{R}\\) — negatives are missed, so **not** onto.",
          "If instead \\(f:[0,\\infty)\\to[0,\\infty)\\), it becomes both one-one and onto — a bijection. Domain/codomain matter.",
        ],
        answer: "On \\(\\mathbb{R}\\to\\mathbb{R}\\): neither one-one nor onto.",
      },
      selfCheckExample: {
        prompt:
          "Is \\(f:\\mathbb{R}\\to\\mathbb{R}\\), \\(f(x)=2x+3\\), a bijection?",
        steps: [
          "One-one: \\(2x_1+3=2x_2+3\\Rightarrow x_1=x_2\\). Yes.",
          "Onto: for any \\(y\\), \\(x=\\tfrac{y-3}{2}\\) is a real pre-image. Yes.",
        ],
        answer: "Yes — a non-constant linear map on \\(\\mathbb{R}\\) is always bijective.",
      },
      traps: [
        {
          title: "'Onto' is not absolute — it depends on the codomain",
          body:
            "\\(f:\\mathbb{N}\\to\\mathbb{N}\\), \\(f(x)=x+1\\) is one-one but **not** onto (nothing maps to 1). The " +
            "same rule on \\(\\mathbb{Z}\\to\\mathbb{Z}\\) **is** onto. Read the declared domain and codomain before deciding.",
        },
      ],
      pyqExampleId: "54c319fd-4b22-4d87-97ea-e4db6c457889", // 2021 — x+1 on Z (bijective) vs N (one-one not onto)
    },

    // Counting functions
    {
      kind: "formula" as const,
      slug: "funcs-counting-functions",
      name: "Counting functions of a given type",
      intuition:
        "Counting how many functions exist from a finite set to another is just the multiplication " +
        "principle: each input independently picks an output. Restricting to one-one or onto narrows the count.",
      definition:
        "Let \\(|A|=m\\), \\(|B|=n\\).\n" +
        "- **All functions** \\(A\\to B\\): \\(n^m\\) (each of \\(m\\) inputs has \\(n\\) choices).\n" +
        "- **One-one** (needs \\(n\\ge m\\)): \\(n(n-1)\\cdots(n-m+1)={}^{n}P_{m}\\).\n" +
        "- **Onto** (general): inclusion–exclusion; for \\(n=2\\) it is \\(2^m-2\\).",
      formula: {
        label: "Number of functions A → B",
        latex: "|A|=m,\\ |B|=n\\ \\Rightarrow\\ \\text{functions}=n^{m},\\quad \\text{injections}={}^{n}P_{m}",
      },
      authoredExample: {
        prompt:
          "With \\(|A|=3\\), \\(|B|=4\\): how many functions, and how many are one-one?",
        steps: [
          "All functions: \\(n^m=4^3=64\\).",
          "One-one: \\({}^{4}P_{3}=4\\cdot3\\cdot2=24\\).",
        ],
        answer: "64 functions in all, of which 24 are one-one.",
      },
      practiceSet: [
        { prompt: "Functions from a 2-element to a 5-element set?", answer: "\\(5^2=25\\)" },
        { prompt: "One-one functions from a 2-set to a 4-set?", answer: "\\(4\\cdot3=12\\)" },
        { prompt: "Onto functions from a 4-set to a 2-set?", answer: "\\(2^4-2=14\\)" },
        { prompt: "Can there be a one-one function from a 5-set to a 3-set?", answer: "No — needs codomain \\(\\ge\\) domain size" },
      ],
      pyqExampleId: "43643430-e597-486a-8c1d-2431b18f1231", // 2024 — onto A→B, |A|=5,|B|=2 → 30
    },
  ],
};
