import type { SubtopicNote } from "@/app/notes/_types";

export const RULES_PROB_NOTE: SubtopicNote = {
  subtopicName: "Addition, Conditional Probability and Independence",
  title: "Addition, Conditional Probability and Independence",
  oneLineDefinition:
    "The rules that combine probabilities: the addition rule for unions, the conditional-probability formula, independence as a product, and repeated independent trials until a success.",
  whyItMatters:
    "Twenty-five PYQs, twenty of them multiple choice. Ten work with the rules themselves — unions, complements, conditional probabilities — eight with independent events, and seven with trials repeated until a success, which sum a geometric series. Three ideas cover the page.",
  concepts: [
    // C1 — addition and conditional
    {
      kind: "formula" as const,
      slug: "jprob-addition",
      name: "Addition rule and conditional probability",
      intuition:
        "Most of these questions give two or three of \\(P(A)\\), \\(P(B)\\), \\(P(A\\cap B)\\), \\(P(A\\mid B)\\) and ask for another. Write everything in terms of \\(P(A)\\), \\(P(B)\\) and \\(P(A\\cap B)\\): \\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\) and \\(P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\). Complements follow: \\(P(A\\cap B')=P(A)-P(A\\cap B)\\), \\(P(A'\\cap B')=1-P(A\\cup B)\\).",
      definition:
        "- \\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\).\n" +
        "- \\(P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}\\).\n" +
        "- \\(P(A\\cap B')=P(A)-P(A\\cap B)\\); \\(P(A'\\cap B')=1-P(A\\cup B)\\).\n" +
        "- Probabilities lie in \\([0,1]\\), and mutually exclusive events' probabilities add to at most 1.\n" +
        "- Geometric probability: a ratio of lengths or areas.",
      formula: {
        label: "Conditional probability",
        latex: "P(A\\mid B)=\\frac{P(A\\cap B)}{P(B)}",
      },
      authoredExample: {
        prompt: "\\(P(A)=0.5\\), \\(P(B)=0.4\\), \\(P(A\\cup B)=0.7\\). Find \\(P(A\\mid B)\\).",
        steps: [
          "\\(P(A\\cap B)=0.5+0.4-0.7=0.2\\).",
        ],
        answer: "\\(\\frac{0.2}{0.4}=\\frac12\\).",
      },
      selfCheckExample: {
        prompt: "\\(P(A)=0.6\\), \\(P(B)=0.5\\), \\(P(A\\cap B)=0.3\\). Find \\(P(A'\\cap B')\\).",
        steps: [
          "\\(P(A\\cup B)=0.8\\).",
        ],
        answer: "\\(0.2\\).",
      },
      practiceSet: [
        { prompt: "\\(P(A\\cap B')\\) with \\(P(A)=0.4\\), \\(P(A\\cap B)=0.1\\)?", answer: "\\(0.3\\)" },
        { prompt: "\\(P(B)\\) from \\(P(A\\cap B)=0.1\\), \\(P(A\\mid B)=0.25\\)?", answer: "\\(0.4\\)" },
        { prompt: "Can \\(P(A)=0\\) with \\(A\\neq\\varnothing\\)?", answer: "Yes (e.g. a single point in \\([0,1]\\))" },
        { prompt: "\\(P(|x-y|\\le a)\\) for \\(x,y\\) uniform on \\([0,L]\\)?", answer: "\\(1-\\left(1-\\frac aL\\right)^2\\)" },
      ],
      pyqExampleId: "7425a849-23c9-47fe-ae75-5b2cd7a83739", // 2022 — P(A | B') + P(B | A')
      traps: [
        {
          title: "Condition on the complement",
          body: "\\(P(A\\mid B')=\\frac{P(A)-P(A\\cap B)}{1-P(B)}\\). Dividing by \\(P(B)\\) out of habit, or forgetting to remove \\(A\\cap B\\), are the two usual slips.",
        },
      ],
    },

    // C2 — independence
    {
      kind: "formula" as const,
      slug: "jprob-independent",
      name: "Independent events",
      intuition:
        "Independent means \\(P(A\\cap B)=P(A)P(B)\\), and then every combination of the events and their complements also multiplies. 'Exactly one of \\(A,B\\)' is \\(P(A)P(B')+P(A')P(B)\\). With three independent events, 'only \\(E_1\\)' is \\(P(E_1)P(E_2')P(E_3')\\), and dividing by 'none' leaves \\(\\frac{P(E_1)}{1-P(E_1)}\\).",
      definition:
        "- Independent: \\(P(A\\cap B)=P(A)P(B)\\); so are \\(A,B'\\), \\(A',B\\), \\(A',B'\\).\n" +
        "- Exactly one: \\(P(A)(1-P(B))+(1-P(A))P(B)\\).\n" +
        "- At least one of \\(n\\) independent events: \\(1-\\prod(1-P(E_i))\\).\n" +
        "- Independent is not the same as mutually exclusive.",
      formula: {
        label: "Independence",
        latex: "P(A\\cap B)=P(A)\\,P(B)",
      },
      authoredExample: {
        prompt: "Independent events have \\(P(A)=0.3\\), \\(P(B)=0.4\\). Find \\(P(\\)exactly one\\()\\).",
        steps: [
          "\\(0.3\\cdot0.6+0.7\\cdot0.4=0.18+0.28\\).",
        ],
        answer: "\\(0.46\\).",
      },
      selfCheckExample: {
        prompt: "Three independent shots each hit with probability \\(\\frac12\\). Find the probability of at least one hit.",
        steps: [
          "\\(1-\\left(\\frac12\\right)^3\\).",
        ],
        answer: "\\(\\frac78\\).",
      },
      practiceSet: [
        { prompt: "Independent, \\(P(A)=\\frac12\\), \\(P(B)=\\frac13\\): \\(P(A\\cup B)\\)?", answer: "\\(\\frac23\\)" },
        { prompt: "Mutually exclusive with positive probabilities: independent?", answer: "No" },
        { prompt: "\\(P(A'\\cap B')\\) for independent \\(A,B\\)?", answer: "\\((1-P(A))(1-P(B))\\)" },
        { prompt: "Two people each toss 2 coins: \\(P\\)(same number of heads)?", answer: "\\(\\frac38\\)" },
      ],
      pyqExampleId: "cb8e13fa-03ad-40b0-a551-5902e8a857d6", // 2021 — P(A) = p, P(B) = 2p, exactly one occurs with 5/9
      traps: [
        {
          title: "Take the root that is a probability",
          body: "Equations from 'exactly one' are quadratic in \\(p\\). Both roots may lie in \\((0,1)\\), but each event's probability must too: with \\(P(B)=2p\\), need \\(p\\le\\frac12\\).",
        },
      ],
    },

    // C3 — until the first success
    {
      kind: "formula" as const,
      slug: "jprob-until",
      name: "Trials repeated until a success",
      intuition:
        "If each trial succeeds with probability \\(p\\), the first success is on trial \\(k\\) with probability \\(q^{k-1}p\\). Questions about an even-numbered trial, or about two players throwing in turn, add a geometric series: player A (first) wins with \\(\\frac{p_A}{1-q_Aq_B}\\). 'At least \\(k\\) trials' is \\(q^{k-1}\\), which makes conditional questions short.",
      definition:
        "- \\(P(X=k)=q^{k-1}p\\); \\(P(X\\ge k)=q^{k-1}\\).\n" +
        "- \\(P(X>m+n\\mid X>n)=P(X>m)=q^{m}\\) (memoryless).\n" +
        "- First success on an even trial: \\(\\frac{qp}{1-q^2}=\\frac{q}{1+q}\\).\n" +
        "- A and B alternate, A first: \\(P(A\\text{ wins})=\\frac{p_A}{1-q_Aq_B}\\).",
      formula: {
        label: "Alternate turns",
        latex: "P(A\\text{ wins})=p_A+q_Aq_Bp_A+(q_Aq_B)^2p_A+\\cdots=\\frac{p_A}{1-q_Aq_B}",
      },
      authoredExample: {
        prompt: "A coin is tossed until a head appears. Find the probability that it takes an odd number of tosses.",
        steps: [
          "\\(\\frac12+\\frac18+\\frac1{32}+\\cdots=\\frac{1/2}{1-1/4}\\).",
        ],
        answer: "\\(\\frac23\\).",
      },
      selfCheckExample: {
        prompt: "A and B throw a die in turn, A first; the first to throw a 6 wins. Find \\(P(A\\text{ wins})\\).",
        steps: [
          "\\(\\frac{1/6}{1-\\frac56\\cdot\\frac56}=\\frac{1/6}{11/36}\\).",
        ],
        answer: "\\(\\frac{6}{11}\\).",
      },
      practiceSet: [
        { prompt: "\\(P(X\\ge3)\\) for a fair coin's first head?", answer: "\\(\\frac14\\)" },
        { prompt: "\\(\\sum_{k\\ge1}q^{k-1}p\\)?", answer: "\\(1\\)" },
        { prompt: "Mean number of trials to the first success?", answer: "\\(\\frac1p\\)" },
        { prompt: "\\(P(X>5\\mid X>2)\\) for \\(p=\\frac12\\)?", answer: "\\(\\frac18\\)" },
      ],
      pyqExampleId: "34fb1ff1-d06f-4cbf-be0c-645992d225f5", // 2024 — die thrown until 2 appears, even number of throws
      traps: [
        {
          title: "Who throws first",
          body: "The player who throws first has the extra head start: their series starts at \\(p_A\\), the other's at \\(q_Ap_B\\). Swapping them gives the other player's chance.",
        },
      ],
    },
  ],
};
