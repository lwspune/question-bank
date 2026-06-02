import type { SubtopicNote } from "@/app/notes/_types";

export const INDEPENDENT_EVENTS_NOTE: SubtopicNote = {
  subtopicName: "Independent Events",
  title: "Independent Events & the Multiplication Rule",
  oneLineDefinition:
    "When one event tells you nothing about another, probabilities multiply — the engine behind 'all of', 'at least one', and problem-solving questions.",
  whyItMatters:
    "Independence is the multiplication counterpart of the addition rule: when events do not influence each other, the probability that all of them happen is the product of the individual probabilities. " +
    "This 16-question subtopic is dominated by two archetypes — 'a problem is given to several students' and 'several independent trials' — both solved with the multiplication rule and the 'at least one = 1 - none' complement. " +
    "The recurring exam trap is confusing independent with mutually exclusive, so that distinction is drilled here.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "independence-and-multiplication-rule",
      name: "Independence and the multiplication rule",
      visualizationSlug: "exclusive-vs-independent",
      intuition:
        "Two events are independent when knowing one happened does not change the probability of the other — separate coins, separate machines, separate people. " +
        "For independent events, the probability that BOTH happen is the product of their probabilities.",
      definition:
        "\\(A\\) and \\(B\\) are **independent** if \\(P(A \\cap B) = P(A)\\,P(B)\\). " +
        "This extends to any number: \\(P(A_1 \\cap \\dots \\cap A_n) = P(A_1)\\cdots P(A_n)\\). " +
        "If \\(A, B\\) are independent then so are \\(A, B'\\) (and \\(A', B'\\)) — independence carries over to complements.",
      formula: {
        label: "Multiplication rule (independent events)",
        latex:
          "P(A \\cap B) = P(A)\\,P(B)",
        symbols: [
          { symbol: "\\(P(A \\cap B)\\)", meaning: "probability both occur — a product, only when independent" },
        ],
      },
      authoredExample: {
        prompt:
          "A switch is closed with probability \\(0.8\\). Two such switches operate independently. What is the probability that both are closed?",
        steps: [
          "Independent, so multiply: \\(P(\\text{both closed}) = 0.8 \\times 0.8\\).",
          "\\(= 0.64\\).",
        ],
        answer: "\\(0.64\\)",
      },
      selfCheckExample: {
        prompt:
          "The probability that a seed germinates is \\(0.7\\). Two seeds are sown independently. What is the probability that both germinate?",
        steps: [
          "Multiply the independent probabilities: \\(0.7 \\times 0.7 = 0.49\\).",
        ],
        answer: "\\(0.49\\)",
      },
      practiceSet: [
        { prompt: "Independent \\(P(A)=0.5, P(B)=0.6\\). \\(P(A\\cap B)\\)?", answer: "\\(0.3\\)" },
        { prompt: "Fair coin twice: \\(P(\\text{two heads})\\)?", answer: "\\(\\dfrac{1}{4}\\)", method: "\\(\\tfrac{1}{2}\\cdot\\tfrac{1}{2}\\)" },
        { prompt: "Independent \\(P(A)=\\tfrac{1}{3},P(B)=\\tfrac{1}{4}\\). \\(P(A\\cap B)\\)?", answer: "\\(\\dfrac{1}{12}\\)" },
        { prompt: "If \\(A,B\\) independent and \\(P(A)=0.4\\), is \\(A\\) independent of \\(B'\\)?", answer: "Yes" },
      ],
      pyqExampleId: "2f81f939-8cb4-4625-9a2b-e20377bce02b",
      traps: [
        {
          title: "Independent \\(\\ne\\) mutually exclusive",
          body:
            "Independent means \\(P(A \\cap B) = P(A)P(B)\\) (both can happen, just unrelated); mutually exclusive means \\(P(A \\cap B) = 0\\) (both cannot happen). They are opposite conditions for positive-probability events.",
        },
        {
          title: "Only multiply when independence is given or physically clear",
          body:
            "Drawing without replacement, or events from the same experiment, are usually NOT independent — use conditional probability there. Multiply only when the trials genuinely don't influence each other.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "at-least-one-via-complement",
      name: "\"At least one\" via the complement",
      intuition:
        "For independent trials, \"at least one success\" is messy to count directly but easy through the complement: the only way to get no successes is for every trial to fail.",
      definition:
        "For independent events \\(A_1, \\dots, A_n\\), " +
        "\\(P(\\text{at least one occurs}) = 1 - P(\\text{none occurs}) = 1 - \\prod_{i}\\big(1 - P(A_i)\\big)\\). " +
        "When all \\(n\\) probabilities equal \\(p\\), this is \\(1 - (1-p)^n\\).",
      formula: {
        label: "At least one (independent trials)",
        latex:
          "P(\\text{at least one}) = 1 - \\prod_{i}\\big(1 - P(A_i)\\big)",
        symbols: [
          { symbol: "\\(1 - P(A_i)\\)", meaning: "probability trial \\(i\\) fails" },
          { symbol: "\\(\\prod\\)", meaning: "product over all trials — probability all fail" },
        ],
      },
      authoredExample: {
        prompt:
          "Two independent alarms fire (when needed) with probabilities \\(0.9\\) and \\(0.8\\). What is the probability that at least one fires?",
        steps: [
          "Complement: both fail with probability \\((1 - 0.9)(1 - 0.8) = 0.1 \\times 0.2 = 0.02\\).",
          "At least one fires: \\(1 - 0.02 = 0.98\\).",
        ],
        answer: "\\(0.98\\)",
      },
      selfCheckExample: {
        prompt:
          "A marksman hits a target with probability \\(\\dfrac{1}{3}\\) on each shot. He fires two independent shots. What is the probability he hits at least once?",
        steps: [
          "Both miss: \\(\\left(\\dfrac{2}{3}\\right)^2 = \\dfrac{4}{9}\\).",
          "At least one hit: \\(1 - \\dfrac{4}{9} = \\dfrac{5}{9}\\).",
        ],
        answer: "\\(\\dfrac{5}{9}\\)",
      },
      practiceSet: [
        { prompt: "Independent \\(P(A)=0.4,P(B)=0.5\\). \\(P(\\text{at least one})\\)?", answer: "\\(0.7\\)", method: "\\(1-0.6\\cdot0.5\\)" },
        { prompt: "Fair coin 3 times: \\(P(\\text{at least one head})\\)?", answer: "\\(\\dfrac{7}{8}\\)", method: "\\(1-(\\tfrac{1}{2})^3\\)" },
        { prompt: "\\(p=\\tfrac{1}{2}\\) each, 2 trials: \\(P(\\text{at least one})\\)?", answer: "\\(\\dfrac{3}{4}\\)" },
        { prompt: "Two trials fail with probs \\(0.2, 0.5\\). \\(P(\\text{at least one succeeds})\\)?", answer: "\\(0.9\\)", method: "\\(1 - (0.2)(0.5)\\)" },
      ],
      pyqExampleId: "ff94b4f3-2514-4bf3-ac7b-be3524fe4cd6",
      traps: [
        {
          title: "\"At least one\" = 1 - (all fail), not the sum of individual probabilities",
          body:
            "Adding \\(P(A) + P(B)\\) double-counts the both-succeed case and can exceed 1. Always go through the complement of \"none\".",
        },
        {
          title: "Multiply the FAILURE probabilities, not the success ones, for \"none\"",
          body:
            "\"None occurs\" means every trial fails, so multiply \\((1-p_i)\\). A common slip is multiplying the \\(p_i\\) (that is \"all succeed\").",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "solving-a-problem-independently",
      name: "The \"problem solved by students\" archetype",
      intuition:
        "A whole family of PYQs gives several people who each solve a problem (or hit a target) independently with their own probability, and asks for the chance the problem is solved at all. " +
        "\"Solved by at least one\" is again \\(1 - P(\\text{nobody solves it})\\).",
      definition:
        "If solvers have independent success probabilities \\(p_1, \\dots, p_n\\), then " +
        "\\(P(\\text{problem solved}) = 1 - (1-p_1)(1-p_2)\\cdots(1-p_n)\\). " +
        "Variants ask for \"solved by exactly one\" (sum of one-succeeds-rest-fail products) or \"by both/all\" (product of the \\(p_i\\)).",
      formula: {
        label: "Problem solved by at least one solver",
        latex:
          "P(\\text{solved}) = 1 - \\prod_{i}(1 - p_i)",
        symbols: [
          { symbol: "\\(p_i\\)", meaning: "probability solver \\(i\\) solves it, independently" },
        ],
      },
      authoredExample: {
        prompt:
          "Two students \\(A\\) and \\(B\\) can solve a problem independently with probabilities \\(\\dfrac{1}{2}\\) and \\(\\dfrac{1}{3}\\). What is the probability the problem is solved?",
        steps: [
          "Neither solves it: \\(\\left(1 - \\dfrac{1}{2}\\right)\\left(1 - \\dfrac{1}{3}\\right) = \\dfrac{1}{2} \\cdot \\dfrac{2}{3} = \\dfrac{1}{3}\\).",
          "Solved by at least one: \\(1 - \\dfrac{1}{3} = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt:
          "Three students solve a problem independently with probabilities \\(\\dfrac{2}{3}, \\dfrac{3}{4}, \\dfrac{4}{5}\\). What is the probability that at least one solves it?",
        steps: [
          "None solves it: \\(\\left(1-\\dfrac{2}{3}\\right)\\left(1-\\dfrac{3}{4}\\right)\\left(1-\\dfrac{4}{5}\\right) = \\dfrac{1}{3} \\cdot \\dfrac{1}{4} \\cdot \\dfrac{1}{5} = \\dfrac{1}{60}\\).",
          "At least one: \\(1 - \\dfrac{1}{60} = \\dfrac{59}{60}\\).",
        ],
        answer: "\\(\\dfrac{59}{60}\\)",
      },
      practiceSet: [
        { prompt: "Solvers \\(\\tfrac{1}{2}, \\tfrac{1}{2}\\). \\(P(\\text{solved})\\)?", answer: "\\(\\dfrac{3}{4}\\)" },
        { prompt: "Solvers \\(\\tfrac{1}{2}, \\tfrac{1}{3}\\). \\(P(\\text{both solve})\\)?", answer: "\\(\\dfrac{1}{6}\\)", method: "product of \\(p_i\\)" },
        { prompt: "Solvers \\(\\tfrac{1}{3}, \\tfrac{1}{4}\\). \\(P(\\text{none solves})\\)?", answer: "\\(\\dfrac{1}{2}\\)", method: "\\(\\tfrac{2}{3}\\cdot\\tfrac{3}{4}\\)" },
        { prompt: "Solvers \\(\\tfrac{2}{3}, \\tfrac{3}{4}\\). \\(P(\\text{solved})\\)?", answer: "\\(\\dfrac{11}{12}\\)", method: "\\(1-\\tfrac{1}{3}\\cdot\\tfrac{1}{4}\\)" },
      ],
      pyqExampleId: "38b6aa6d-8a89-4ab1-bea7-5ed529f48649",
      traps: [
        {
          title: "\"Problem solved\" means at least one solver — use the complement",
          body:
            "Do not add the solvers' probabilities (that overcounts and can exceed 1). Compute \\(1 - \\prod(1-p_i)\\).",
        },
        {
          title: "\"Exactly one solves\" is a different computation",
          body:
            "For exactly one, sum the cases where one succeeds and the rest fail: \\(p_1(1-p_2) + (1-p_1)p_2\\) for two solvers. Don't confuse it with \"at least one\".",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "finding-unknowns-with-independence",
      name: "Finding an unknown probability using independence",
      intuition:
        "Some questions give the union (or a complement) plus independence and ask you to back out a missing probability. " +
        "Combine the addition rule with \\(P(A \\cap B) = P(A)P(B)\\) and solve the resulting equation.",
      definition:
        "For independent \\(A, B\\): \\(P(A \\cup B) = P(A) + P(B) - P(A)P(B)\\). " +
        "Given any three of \\(\\{P(A), P(B), P(A\\cup B)\\}\\) you can solve for the fourth. " +
        "Equivalently, since complements of independent events are independent, \\(P(A \\cup B) = 1 - P(A')P(B')\\).",
      formula: {
        label: "Union of independent events",
        latex:
          "P(A \\cup B) = P(A) + P(B) - P(A)P(B) = 1 - P(A')\\,P(B')",
        symbols: [
          { symbol: "\\(P(A')P(B')\\)", meaning: "probability neither occurs (independent complements)" },
        ],
      },
      authoredExample: {
        prompt:
          "\\(A\\) and \\(B\\) are independent with \\(P(A) = 0.5\\) and \\(P(A \\cup B) = 0.7\\). Find \\(P(B)\\).",
        steps: [
          "Independent union: \\(P(A \\cup B) = P(A) + P(B) - P(A)P(B)\\).",
          "Substitute: \\(0.7 = 0.5 + P(B) - 0.5\\,P(B) = 0.5 + 0.5\\,P(B)\\).",
          "Solve: \\(0.5\\,P(B) = 0.2 \\Rightarrow P(B) = 0.4\\).",
        ],
        answer: "\\(0.4\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(A\\) and \\(B\\) are independent with \\(P(A) = \\dfrac{1}{3}\\) and \\(P(B) = \\dfrac{1}{4}\\). Find \\(P(A \\cup B)\\).",
        steps: [
          "\\(P(A \\cup B) = \\dfrac{1}{3} + \\dfrac{1}{4} - \\dfrac{1}{3}\\cdot\\dfrac{1}{4}\\).",
          "\\(= \\dfrac{4 + 3 - 1}{12} = \\dfrac{6}{12} = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "Independent \\(P(A)=0.6,P(B)=0.5\\). \\(P(A\\cup B)\\)?", answer: "\\(0.8\\)", method: "\\(0.6+0.5-0.3\\)" },
        { prompt: "Independent, \\(P(A')=0.7,P(B')=0.4\\). \\(P(A\\cup B)\\)?", answer: "\\(0.72\\)", method: "\\(1-0.7\\cdot0.4\\)" },
        { prompt: "Independent \\(P(A)=0.5,P(A\\cup B)=0.75\\). \\(P(B)\\)?", answer: "\\(0.5\\)", method: "\\(0.75=0.5+0.5P(B)\\)" },
        { prompt: "Independent \\(P(A)=\\tfrac{1}{2},P(B)=\\tfrac{1}{2}\\). \\(P(A\\cup B)\\)?", answer: "\\(\\dfrac{3}{4}\\)" },
      ],
      pyqExampleId: "80b23020-9b3f-40b8-a0b9-438e49ffff3a",
      traps: [
        {
          title: "For independent events the union is NOT \\(P(A) + P(B)\\)",
          body:
            "You must subtract \\(P(A)P(B)\\) for the overlap. \\(P(A) + P(B)\\) (no subtraction) is the mutually-exclusive formula — the wrong model for independent events.",
        },
        {
          title: "Use \\(1 - P(A')P(B')\\) as a fast check",
          body:
            "Computing the union as \\(1\\) minus \"neither\" often avoids a sign slip; both routes must agree.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Event Algebra & the Addition Rule",
      href: "/notes/nda-maths/probability/event-algebra-addition-rule",
    },
    {
      label: "Conditional Probability, Total Probability & Bayes'",
      href: "/notes/nda-maths/probability/conditional-probability-bayes",
    },
  ],
};
