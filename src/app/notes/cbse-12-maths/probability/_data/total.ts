import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_PR_TOTAL_NOTE: SubtopicNote = {
  subtopicName: "Theorem of Total Probability",
  title: "Theorem of Total Probability",
  oneLineDefinition:
    "When an event can happen through several separate causes that cover every possibility, its probability is the sum, over the causes, of P(cause) times P(event given that cause).",
  whyItMatters:
    "23 questions, twenty-one of them from board papers in every year from 2022 to 2026. Fifteen of the twenty-one are case-study parts, often part (i), which asks for the overall probability (a seed germinates, a phone is defective, a customer defaults) before the next part reverses it with Bayes' theorem. The other six are written questions: a bag chosen at random or by a die (2022, 2026), a ball or two transferred from one bag to another (2024, 2025), male and female applicants (2025) and two students chosen from a team picked by the type of competition (2026). The textbook adds Example 15 and Exercise 13.3 Q1.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmpr-tptwo",
      name: "A partition and the theorem with two cases",
      intuition:
        "Split everything that can happen into separate cases that cover all possibilities, such as 'Bag I was chosen' and 'Bag II was chosen'. The event can arrive through either case, so add the chance of each route.",
      definition:
        "- **Partition:** events \\(E_1, E_2, \\ldots, E_n\\) form a partition of the sample space S if they are pairwise disjoint, their union is S, and each has a nonzero probability.\n" +
        "- Any event E with \\(0 < P(E) < 1\\) and its complement \\(E'\\) form a partition.\n" +
        "- **Theorem of total probability:** \\(P(A) = P(E_1)P(A|E_1) + P(E_2)P(A|E_2) + \\cdots + P(E_n)P(A|E_n)\\).\n" +
        "- **Answer layout:** define \\(E_1\\), \\(E_2\\) and A in words; write \\(P(E_1)\\), \\(P(E_2)\\) and check they add to 1; write \\(P(A|E_1)\\), \\(P(A|E_2)\\); substitute; simplify.\n" +
        "- **The tree in words:** route 1 is '\\(E_1\\) happens, then A' with probability \\(P(E_1)P(A|E_1)\\); route 2 is '\\(E_2\\) happens, then A'. P(A) is the sum of the routes.",
      formula: {
        label: "Total probability with two cases",
        latex: "P(A) = P(E_1)\\,P(A|E_1) + P(E_2)\\,P(A|E_2)",
      },
      authoredExample: {
        prompt: "In a town, 40% of the days are rainy. On a rainy day the school bus is late with probability 0.5, and on a dry day with probability 0.15. Find the probability that the bus is late on a day chosen at random.",
        steps: [
          "Let \\(E_1\\) be 'the day is rainy', \\(E_2\\) be 'the day is dry' and A be 'the bus is late'.",
          "\\(P(E_1) = 0.4\\), \\(P(E_2) = 0.6\\); they are disjoint and cover every day, so they form a partition.",
          "\\(P(A|E_1) = 0.5\\) and \\(P(A|E_2) = 0.15\\).",
          "Route 1: rainy, then late: \\(0.4 \\times 0.5 = 0.2\\). Route 2: dry, then late: \\(0.6 \\times 0.15 = 0.09\\).",
          "By the theorem of total probability, \\(P(A) = 0.2 + 0.09 = 0.29\\).",
        ],
        answer: "\\(0.29\\)",
      },
      selfCheckExample: {
        prompt: "70% of a factory's bulbs come from line X and the rest from line Y. 2% of line X's bulbs and 5% of line Y's bulbs are faulty. Find the probability that a bulb chosen at random is faulty.",
        steps: ["\\(0.7 \\times 0.02 + 0.3 \\times 0.05 = 0.014 + 0.015\\)."],
        answer: "\\(0.029\\)",
      },
      practiceSet: [
        {
          prompt: "It rains tomorrow with probability 0.3. If it rains, a match is played with probability 0.4; if not, with probability 0.9. Find the probability that the match is played.",
          answer: "\\(0.3 \\times 0.4 + 0.7 \\times 0.9 = 0.75\\)",
        },
        {
          prompt: "A shop gets 60% of its mangoes from farm A and the rest from farm B. 10% of farm A's mangoes and 5% of farm B's are spoilt. Find the probability that a mango chosen at random is spoilt.",
          answer: "\\(0.6 \\times 0.1 + 0.4 \\times 0.05 = 0.08\\)",
        },
        {
          prompt: "A student takes the bus on 75% of days and walks on the rest. He is late with probability 0.1 by bus and 0.3 on foot. Find the probability that he is late on a given day.",
          answer: "\\(0.75 \\times 0.1 + 0.25 \\times 0.3 = 0.15\\)",
        },
      ],
      pyqExampleId: "93d42bdc-a1d9-42da-aae6-a00b027e8f7d",
      traps: [
        {
          title: "Cases that do not add to 1",
          body: "\\(P(E_1) + P(E_2) + \\cdots\\) must be 1. If a die decides the case, list the faces: 'a prime number' is 2, 3 or 5, which is \\(\\dfrac{3}{6}\\), and the other case gets the rest.",
        },
        {
          title: "Adding the conditional probabilities",
          body: "P(A) is not \\(P(A|E_1) + P(A|E_2)\\). Each conditional probability must first be multiplied by the probability of its case.",
        },
        {
          title: "A rate read as a joint probability",
          body: "'45% of type A1 seeds germinate' is P(germinates | A1). The joint probability is P(A1) times 0.45.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-tpmany",
      name: "Three or more causes",
      intuition:
        "Case studies often give a share for each source (companies, machines, kinds of loan) and a rate for each. Every source is one route to the event; add all the routes.",
      definition:
        "- \\(P(A) = \\displaystyle\\sum_{j=1}^{n} P(E_j)\\,P(A|E_j)\\).\n" +
        "- **Shares to probabilities:** 25% becomes 0.25; a ratio \\(4 : 4 : 2\\) becomes \\(\\dfrac{4}{10}, \\dfrac{4}{10}, \\dfrac{2}{10}\\); counts such as 10, 12 and 8 seeds become \\(\\dfrac{10}{30}, \\dfrac{12}{30}, \\dfrac{8}{30}\\).\n" +
        "- **Rates are conditional:** '5% of company A's phones are defective' is \\(P(D|E_1) = 0.05\\).\n" +
        "- If the question asks for the opposite (petrol cars when electric rates are given), complement each rate first: \\(P(A'|E_j) = 1 - P(A|E_j)\\).\n" +
        "- Part (i) of a case study is usually this total; keep it, because the Bayes' theorem part uses it as the denominator.",
      formula: {
        label: "Total probability with n causes",
        latex: "P(A) = \\sum_{j=1}^{n} P(E_j)\\,P(A|E_j)",
      },
      authoredExample: {
        prompt: "A packet has 20 seeds of type A, 15 of type B and 15 of type C, all mixed up. They germinate with probabilities 60%, 30% and 50% respectively. One seed is sown at random. Find the probability that it germinates.",
        steps: [
          "Let \\(E_1, E_2, E_3\\) be 'the seed is of type A, B, C' and G be 'the seed germinates'.",
          "There are 50 seeds, so \\(P(E_1) = \\dfrac{20}{50} = 0.4\\), \\(P(E_2) = \\dfrac{15}{50} = 0.3\\), \\(P(E_3) = 0.3\\).",
          "\\(P(G|E_1) = 0.6\\), \\(P(G|E_2) = 0.3\\), \\(P(G|E_3) = 0.5\\).",
          "\\(P(G) = 0.4 \\times 0.6 + 0.3 \\times 0.3 + 0.3 \\times 0.5\\).",
          "\\(P(G) = 0.24 + 0.09 + 0.15 = 0.48\\).",
        ],
        answer: "\\(0.48\\)",
      },
      selfCheckExample: {
        prompt: "In a city, 50% of commuters take the bus, 30% the metro and 20% a car. They are late with probabilities 0.2, 0.1 and 0.3 respectively. Find the probability that a commuter chosen at random is late.",
        steps: ["\\(0.5 \\times 0.2 + 0.3 \\times 0.1 + 0.2 \\times 0.3 = 0.1 + 0.03 + 0.06\\)."],
        answer: "\\(0.19\\)",
      },
      practiceSet: [
        {
          prompt: "Three people are chosen for a post with chances in the ratio 1 : 2 : 3. Write the probability of each being chosen.",
          answer: "\\(\\dfrac{1}{6}\\), \\(\\dfrac{1}{3}\\), \\(\\dfrac{1}{2}\\)",
        },
        {
          prompt: "Box i is chosen with probability \\(\\dfrac{i}{10}\\), for i = 1, 2, 3, 4. Find the probability that Box III is chosen.",
          answer: "\\(\\dfrac{3}{10}\\)",
        },
        {
          prompt: "Boxes I, II and III are chosen with probabilities \\(\\dfrac{1}{2}\\), \\(\\dfrac{1}{4}\\) and \\(\\dfrac{1}{4}\\). Each holds 4 balls, of which 1, 2 and 3 respectively are red. Find the probability that a ball drawn from the chosen box is red.",
          answer: "\\(\\dfrac{1}{8} + \\dfrac{1}{8} + \\dfrac{3}{16} = \\dfrac{7}{16}\\)",
        },
      ],
      pyqExampleId: "0ac86d14-9d28-4f2e-ad7e-9f538c694c81",
      traps: [
        {
          title: "Using the ratio numbers as probabilities",
          body: "A ratio \\(1 : 2 : 4\\) gives \\(\\dfrac{1}{7}, \\dfrac{2}{7}, \\dfrac{4}{7}\\), not 1, 2 and 4 or tenths. Divide by the total number of parts.",
        },
        {
          title: "Forgetting the remaining share",
          body: "If machine A makes 50% and B makes 30%, machine C makes the remaining 20%. Work it out and write it down.",
        },
        {
          title: "Complementing the share instead of the rate",
          body: "For 'not defective', use \\(1 - P(D|E_j)\\) in each term. The shares \\(P(E_j)\\) do not change.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-tpstage",
      name: "When the first step changes the second",
      intuition:
        "If a ball is moved from one bag into another before drawing, the second bag's contents depend on what was moved. The colour of the moved ball is unknown, so each possibility is a case of the partition.",
      definition:
        "- The cases are the possible results of the first step: 'a red ball is transferred', 'a black ball is transferred'.\n" +
        "- For two balls transferred, the cases are both red, both black, one of each, found by counting: \\(P(\\text{both red}) = \\dfrac{{}^{r}C_2}{{}^{n}C_2}\\), and so on.\n" +
        "- **The receiving bag grows:** after one ball is moved it holds one more ball; after two, two more.\n" +
        "- In each case, count the receiving bag again before writing \\(P(A|E_i)\\), then apply the theorem of total probability.",
      formula: {
        label: "Transfer, then draw",
        latex: "P(A) = P(E_1)\\,P(A|E_1) + P(E_2)\\,P(A|E_2) + \\cdots",
      },
      authoredExample: {
        prompt: "Bag I has 2 white and 3 black balls; Bag II has 4 white and 1 black ball. One ball is moved at random from Bag I to Bag II, and then a ball is drawn from Bag II. Find the probability that it is white.",
        steps: [
          "Let \\(E_1\\) be 'a white ball is moved', \\(E_2\\) be 'a black ball is moved' and A be 'the ball drawn from Bag II is white'.",
          "\\(P(E_1) = \\dfrac{2}{5}\\), \\(P(E_2) = \\dfrac{3}{5}\\).",
          "After the move, Bag II has 6 balls. If white was moved: 5 white, so \\(P(A|E_1) = \\dfrac{5}{6}\\). If black was moved: 4 white, so \\(P(A|E_2) = \\dfrac{4}{6}\\).",
          "\\(P(A) = \\dfrac{2}{5} \\times \\dfrac{5}{6} + \\dfrac{3}{5} \\times \\dfrac{4}{6} = \\dfrac{10}{30} + \\dfrac{12}{30} = \\dfrac{22}{30}\\).",
          "So \\(P(A) = \\dfrac{11}{15}\\).",
        ],
        answer: "\\(\\dfrac{11}{15}\\)",
      },
      selfCheckExample: {
        prompt: "An urn has 4 red and 6 black balls. A ball is drawn, its colour noted, and it is put back with 3 more balls of the same colour. A second ball is then drawn. Find the probability that the second ball is red.",
        steps: [
          "First red (\\(\\dfrac{4}{10}\\)): the urn becomes 7 red, 6 black, so \\(\\dfrac{7}{13}\\). First black (\\(\\dfrac{6}{10}\\)): 4 red, 9 black, so \\(\\dfrac{4}{13}\\).",
          "\\(\\dfrac{4}{10} \\times \\dfrac{7}{13} + \\dfrac{6}{10} \\times \\dfrac{4}{13} = \\dfrac{52}{130}\\).",
        ],
        answer: "\\(\\dfrac{2}{5}\\)",
      },
      practiceSet: [
        {
          prompt: "A bag has 3 white and 2 black balls. A ball is drawn and put back together with 2 more balls of its colour, and a second ball is drawn. Find the probability that the second ball is white.",
          answer: "\\(\\dfrac{3}{5} \\times \\dfrac{5}{7} + \\dfrac{2}{5} \\times \\dfrac{3}{7} = \\dfrac{3}{5}\\)",
        },
        {
          prompt: "Two cards are drawn one after the other without replacement from a pack of 52 cards. Find the probability that the second card is an ace.",
          answer: "\\(\\dfrac{4}{52} \\times \\dfrac{3}{51} + \\dfrac{48}{52} \\times \\dfrac{4}{51} = \\dfrac{1}{13}\\)",
        },
        {
          prompt: "A debate is held with probability \\(\\dfrac{1}{4}\\) and uses team A (3 girls, 2 boys); otherwise a quiz uses team B (1 girl, 4 boys). One student is chosen. Find the probability that it is a girl.",
          answer: "\\(\\dfrac{1}{4} \\times \\dfrac{3}{5} + \\dfrac{3}{4} \\times \\dfrac{1}{5} = \\dfrac{3}{10}\\)",
        },
      ],
      pyqExampleId: "946e4d5c-dc41-4ca3-93a8-e8048a781c37",
      traps: [
        {
          title: "Drawing from the old bag",
          body: "After a ball is moved into Bag II, the total in Bag II goes up by one. Using the old total gives every \\(P(A|E_i)\\) wrong.",
        },
        {
          title: "Missing the 'one of each' case",
          body: "When two balls are moved, there are three cases. 'One red and one black' is the largest of them and is easy to leave out.",
        },
      ],
    },
  ],
};
