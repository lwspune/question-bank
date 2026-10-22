import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PR_COINS_NOTE: SubtopicNote = {
  subtopicName: "Coin Tosses",
  title: "Coin Tosses: Counting Heads, At Least One, Order and Given That",
  oneLineDefinition:
    "n fair coins, or one coin tossed n times, give 2ⁿ equally likely outcomes; count the favourable ones by listing, by choosing which tosses are heads, or by taking away the ones you do not want.",
  whyItMatters:
    "The page asks for exactly, at least, at most and patterns of heads among up to five coins, and about a fifth of it is HARD. The HARD ones are about order: a first head on a given toss, heads side by side, or a condition you are given. Marks go when a listed sample space misses an outcome, or when 'at least two' is counted as 'exactly two'.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afpr-coin-outcomes",
      name: "Listing the outcomes for up to three coins",
      intuition:
        "Each coin has 2 faces, so 2 coins give 4 outcomes and 3 coins give 8. List them in a fixed order so none is missed: for 3 coins, HHH, HHT, HTH, HTT, THH, THT, TTH, TTT.",
      definition:
        "- n coins tossed together, or one coin tossed n times, give \\(2^n\\) equally likely outcomes: 2, 4, 8, 16, 32 for n = 1 to 5.\n" +
        "- HT and TH are different outcomes. Treating 'one head and one tail' as a single outcome gives a wrong total of 3 for two coins.\n" +
        "- Build the list by branching: write every outcome that starts with H, then every one that starts with T.\n" +
        "- Read the favourable outcomes off the list, then divide by \\(2^n\\).",
      formula: {
        label: "Outcomes for n coins",
        latex: "n(S) = 2^n, \\qquad P(E) = \\dfrac{n(E)}{2^n}",
      },
      authoredExample: {
        prompt: "Three coins are tossed. Find the probability of exactly one head.",
        steps: [
          "There are \\(2^3 = 8\\) outcomes.",
          "Exactly one head: HTT, THT, TTH, which is 3 outcomes.",
          "\\(P = \\tfrac{3}{8}\\).",
        ],
        answer: "\\(\\tfrac{3}{8}\\).",
      },
      selfCheckExample: {
        prompt: "Two coins are tossed. Find the probability of getting no head.",
        steps: ["The outcomes are HH, HT, TH, TT.", "Only TT has no head: \\(\\tfrac14\\)."],
        answer: "\\(\\tfrac{1}{4}\\).",
      },
      practiceSet: [
        { prompt: "Three coins are tossed. Find the probability that all three show the same face.", answer: "\\(\\tfrac{1}{4}\\)", method: "HHH and TTT: 2 of 8." },
        { prompt: "Three coins are tossed. Find the probability of three tails.", answer: "\\(\\tfrac{1}{8}\\)" },
        { prompt: "Four coins are tossed. How many outcomes are there, and in how many does every coin show a head?", answer: "16 outcomes; 1" },
      ],
      pyqExampleId: "1e73ff71-4041-4e95-a8ae-19e49c9d5b5d",
      traps: [
        {
          title: "HT and TH are two outcomes",
          body: "Two coins have four outcomes, not three. 'One head and one tail' happens in 2 of the 4, so its probability is \\(\\tfrac12\\), not \\(\\tfrac13\\).",
        },
        {
          title: "Write the list in order",
          body: "Listing three coins as HHH, HHT, HTT, TTT misses half of them. Branch on the first coin, then the second, and you get all 8.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-coin-choose",
      name: "Exactly k heads from n coins: choose the positions",
      intuition:
        "With six coins you cannot list 64 outcomes quickly. Count instead how many ways there are to choose which coins show heads. Exactly 2 heads from 6 coins means choosing 2 of the 6 places: \\(^6C_2 = 15\\) ways out of 64.",
      definition:
        "- \\(^nC_k = \\dfrac{n!}{k!\\,(n - k)!}\\) is the number of ways to choose k things from n. \\(^nC_0 = {}^nC_n = 1\\), \\(^nC_1 = n\\), and \\(^nC_k = {}^nC_{n - k}\\).\n" +
        "- The probability of exactly k heads in n tosses is \\(\\dfrac{^nC_k}{2^n}\\).\n" +
        "- Exactly k tails is exactly \\(n - k\\) heads, so it has the same count.\n" +
        "- For a range ('at least 3', 'more heads than tails', 'differ by 2'), turn it into a list of exact head counts, then add their counts.\n" +
        "- The counts for 4 coins are 1, 4, 6, 4, 1 (total 16); for 6 coins, 1, 6, 15, 20, 15, 6, 1 (total 64).",
      formula: {
        label: "Exactly k heads in n tosses",
        latex: "P(k \\text{ heads}) = \\dfrac{^nC_k}{2^n}",
      },
      authoredExample: {
        prompt: "Six coins are tossed. Find the probability of at least 5 heads.",
        steps: [
          "At least 5 heads means exactly 5 or exactly 6.",
          "\\(^6C_5 = 6\\) and \\(^6C_6 = 1\\), so 7 favourable outcomes.",
          "\\(P = \\tfrac{7}{64}\\).",
        ],
        answer: "\\(\\tfrac{7}{64}\\).",
      },
      selfCheckExample: {
        prompt: "Six coins are tossed. Find the probability of exactly 3 heads.",
        steps: ["\\(^6C_3 = \\tfrac{6 \\times 5 \\times 4}{3 \\times 2 \\times 1} = 20\\).", "\\(P = \\tfrac{20}{64} = \\tfrac{5}{16}\\)."],
        answer: "\\(\\tfrac{5}{16}\\).",
      },
      practiceSet: [
        { prompt: "Four coins are tossed. Find the probability of exactly one head.", answer: "\\(\\tfrac{1}{4}\\)" },
        { prompt: "Six coins are tossed. Find the probability of more heads than tails.", answer: "\\(\\tfrac{11}{32}\\)", method: "4, 5 or 6 heads: \\(15 + 6 + 1 = 22\\) of 64." },
        { prompt: "A coin is tossed 6 times. Find the probability of at most one head.", answer: "\\(\\tfrac{7}{64}\\)" },
        { prompt: "Find \\(^7C_3\\).", answer: "\\(35\\)" },
      ],
      pyqExampleId: "556bbad8-4cac-4fff-894c-94d058ae8875",
      traps: [
        {
          title: "Exactly is not at least",
          body: "'At least 3 heads from 4 coins' means 3 or 4 heads: \\(\\tfrac{4 + 1}{16} = \\tfrac{5}{16}\\). Stopping at exactly 3 gives \\(\\tfrac{4}{16}\\).",
        },
        {
          title: "The total is 2 to the power n",
          body: "Six coins have \\(2^6 = 64\\) outcomes, not \\(2 \\times 6 = 12\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-coin-at-least-one",
      name: "At least one: one minus none",
      intuition:
        "'At least one head' is every outcome except all tails. With 4 coins that is \\(1 - \\tfrac{1}{16} = \\tfrac{15}{16}\\): one subtraction instead of four cases.",
      definition:
        "- The probability of at least one head in n tosses is \\(1 - \\left(\\tfrac12\\right)^n\\).\n" +
        "- 'At most k' is everything except more than k. At most 3 heads from 4 coins leaves out only HHHH: \\(1 - \\tfrac{1}{16}\\).\n" +
        "- If the probability is given, work back: \\(1 - \\left(\\tfrac12\\right)^n = \\tfrac{15}{16}\\) gives \\(\\left(\\tfrac12\\right)^n = \\tfrac{1}{16}\\), so \\(n = 4\\).\n" +
        "- A repeated go: two coins tossed together give at least one head with probability \\(\\tfrac34\\). For that to happen on each of k goes, multiply: \\(\\left(\\tfrac34\\right)^k\\).",
      formula: {
        label: "At least one",
        latex: "P(\\text{at least one}) = 1 - P(\\text{none})",
      },
      authoredExample: {
        prompt: "A coin is tossed 6 times. Find the probability of at least one tail.",
        steps: ["No tail at all is the one outcome HHHHHH: \\(\\tfrac{1}{64}\\).", "\\(P = 1 - \\tfrac{1}{64} = \\tfrac{63}{64}\\)."],
        answer: "\\(\\tfrac{63}{64}\\).",
      },
      selfCheckExample: {
        prompt: "A coin is tossed n times, and the probability of at least one head is \\(\\tfrac{31}{32}\\). Find n.",
        steps: ["\\(\\left(\\tfrac12\\right)^n = 1 - \\tfrac{31}{32} = \\tfrac{1}{32}\\).", "\\(2^n = 32\\), so \\(n = 5\\)."],
        answer: "\\(n = 5\\).",
      },
      practiceSet: [
        { prompt: "Two coins are tossed. Find the probability of at most one tail.", answer: "\\(\\tfrac{3}{4}\\)" },
        { prompt: "Five coins are tossed. Find the probability of at least one head and at least one tail.", answer: "\\(\\tfrac{15}{16}\\)", method: "Leave out HHHHH and TTTTT: \\(1 - \\tfrac{2}{32}\\)." },
        { prompt: "Two coins are tossed together, 4 times. Find the probability of at least one head on every go.", answer: "\\(\\tfrac{81}{256}\\)" },
        { prompt: "Four coins are tossed. Find the probability of at most three heads.", answer: "\\(\\tfrac{15}{16}\\)" },
      ],
      pyqExampleId: "e3735b18-8278-426b-8a93-47d408a872e3",
      traps: [
        {
          title: "None is one outcome",
          body: "With 4 coins, 'no head' is the single outcome TTTT, probability \\(\\tfrac{1}{16}\\). Writing \\(1 - \\tfrac12\\) for 'at least one' ignores how many coins there are.",
        },
        {
          title: "On every go means multiply the goes",
          body: "'At least one head on each of 3 goes of two coins' is \\(\\left(\\tfrac34\\right)^3 = \\tfrac{27}{64}\\). The number \\(1 - \\left(\\tfrac14\\right)^3\\) answers a different question: a head on at least one of the goes.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-coin-order",
      name: "Order matters: given tosses, a first head, patterns and a biased coin",
      intuition:
        "Each toss is independent with probability \\(\\tfrac12\\), so any one sequence of n tosses has probability \\(\\left(\\tfrac12\\right)^n\\). A question about order is a count of the sequences that fit.",
      definition:
        "- A condition on particular tosses ignores the rest: 'the first two tosses are heads', out of 6 tosses, is \\(\\left(\\tfrac12\\right)^2 = \\tfrac14\\).\n" +
        "- A first head on toss k needs \\(k - 1\\) tails and then a head: probability \\(\\left(\\tfrac12\\right)^k\\).\n" +
        "- Patterns such as alternating faces or heads side by side: list the sequences that fit, then divide by \\(2^n\\).\n" +
        "- 'Tossed until' a pattern appears: the pattern must finish exactly on the last toss and must not have appeared earlier.\n" +
        "- A biased coin with \\(P(H) = p\\): multiply each toss's own probability, then add the orders. Exactly one head in two tosses is \\(2p(1 - p)\\).",
      formula: {
        label: "One sequence of n tosses",
        latex: "P(\\text{a given sequence}) = \\left(\\tfrac12\\right)^n",
      },
      authoredExample: {
        prompt: "A coin is tossed 5 times. Find the probability that heads and tails alternate.",
        steps: [
          "Only two sequences alternate: HTHTH and THTHT.",
          "Each has probability \\(\\left(\\tfrac12\\right)^5 = \\tfrac{1}{32}\\).",
          "\\(P = \\tfrac{2}{32} = \\tfrac{1}{16}\\).",
        ],
        answer: "\\(\\tfrac{1}{16}\\).",
      },
      selfCheckExample: {
        prompt: "A coin is tossed until a tail appears. Find the probability that exactly 4 tosses are needed.",
        steps: ["The sequence must be HHHT.", "\\(\\left(\\tfrac12\\right)^4 = \\tfrac{1}{16}\\)."],
        answer: "\\(\\tfrac{1}{16}\\).",
      },
      practiceSet: [
        { prompt: "A coin is tossed 4 times. Find the probability that the last toss is a head.", answer: "\\(\\tfrac{1}{2}\\)" },
        { prompt: "A coin with \\(P(H) = \\tfrac14\\) is tossed twice. Find the probability of exactly one head.", answer: "\\(\\tfrac{3}{8}\\)", method: "\\(2 \\times \\tfrac14 \\times \\tfrac34\\)." },
        { prompt: "A coin is tossed 4 times. Find the probability that the first head comes on the second toss.", answer: "\\(\\tfrac{1}{4}\\)", method: "T then H; the last two tosses are free." },
        { prompt: "A coin is tossed 5 times. Find the probability of exactly one tail, on the last toss.", answer: "\\(\\tfrac{1}{32}\\)" },
      ],
      pyqExampleId: "9c8b1d8c-85f2-48f6-9a78-911689d3036f",
      traps: [
        {
          title: "Positions are not counts",
          body: "'Heads on the first two of 5 tosses' is \\(\\tfrac14\\). 'Exactly two heads in 5 tosses' is \\(\\tfrac{10}{32}\\), because the two heads can sit in any two places.",
        },
        {
          title: "The pattern must not finish early",
          body: "Tossing until two heads come in a row, exactly 3 tosses needs THH, so \\(\\tfrac18\\). HHH does not count: it stopped after 2 tosses.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-coin-given",
      name: "Given that: count inside the condition",
      intuition:
        "'Given that' shrinks the sample space to the outcomes that meet the condition. The answer is the favourable outcomes inside it, divided by how many outcomes it has.",
      definition:
        "- When outcomes are equally likely, \\(P(A \\mid B) = \\dfrac{n(A \\text{ and } B)}{n(B)}\\). Read it as 'A given B'.\n" +
        "- List the outcomes in B first, then count those that are also in A.\n" +
        "- The same idea comes back later in the chapter with dice, cards and bags.",
      formula: {
        label: "Conditional probability",
        latex: "P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(B)}",
      },
      authoredExample: {
        prompt: "Two coins are tossed. Given that at least one shows a head, find the probability that both show heads.",
        steps: [
          "The condition leaves HH, HT and TH: 3 outcomes.",
          "Only HH has two heads.",
          "\\(P = \\tfrac{1}{3}\\).",
        ],
        answer: "\\(\\tfrac{1}{3}\\).",
      },
      selfCheckExample: {
        prompt: "Three coins are tossed. Given that exactly one head appears, find the probability that it is on the last coin.",
        steps: ["The condition leaves HTT, THT and TTH.", "Only TTH has the head last: \\(\\tfrac13\\)."],
        answer: "\\(\\tfrac{1}{3}\\).",
      },
      practiceSet: [
        { prompt: "Three coins are tossed. Given that the first coin shows a tail, find the probability of exactly two heads.", answer: "\\(\\tfrac{1}{4}\\)", method: "THH, THT, TTH, TTT; only THH." },
        { prompt: "Two coins are tossed. Given that they show different faces, find the probability that the first is a head.", answer: "\\(\\tfrac{1}{2}\\)" },
        { prompt: "Three coins are tossed. Given at least two tails, find the probability of three tails.", answer: "\\(\\tfrac{1}{4}\\)" },
      ],
      pyqExampleId: "9b95bcd7-7fb0-41f9-8041-e0ebb8d9d32a",
      traps: [
        {
          title: "Divide by the condition, not by everything",
          body: "Given at least one head with two coins, divide by 3, not by 4. Dividing by the whole sample space answers 'both heads', which is \\(\\tfrac14\\).",
        },
      ],
    },
  ],
};
