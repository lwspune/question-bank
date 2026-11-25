import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_PR_BAYES_NOTE: SubtopicNote = {
  subtopicName: "Bayes' Theorem",
  title: "Bayes' Theorem",
  oneLineDefinition:
    "Bayes' theorem works backwards: knowing that an event A has happened, it gives the probability that A came from a particular cause, P(cause given A) = P(cause) P(A given cause) divided by P(A).",
  whyItMatters:
    "55 questions, thirty-one of them from board papers in every year from 2022 to 2026, and none of them an MCQ. Twenty-two of the thirty-one are case-study parts that reverse the total probability found in the part before (defective phones, electric cars, loan defaults, vaccines, students who answered wrongly). The written questions, worth 3 to 5 marks, cover machines in a factory (2022), a card lost from a pack (2022, 2024), a man who speaks the truth 7 times out of 10 (2022), a CEO and company profits (2022, 2024), a biased and a fair coin (2023) and a student who knows or guesses (2023). The textbook adds Examples 16 to 21, Miscellaneous Examples 22 and 24, Exercise 13.3 Q2 to Q13 and Miscellaneous Questions 3, 6, 7 and 10.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmpr-bayes",
      name: "Bayes' theorem: from the effect back to the cause",
      intuition:
        "The total probability theorem adds up every route to the event A. Bayes' theorem asks what share of that total came through one particular route: that route's product divided by the sum of all the routes.",
      definition:
        "- **Bayes' theorem:** if \\(E_1, E_2, \\ldots, E_n\\) form a partition of S and A is an event with \\(P(A) \\ne 0\\), then \\(P(E_i|A) = \\dfrac{P(E_i)\\,P(A|E_i)}{\\sum_{j=1}^{n} P(E_j)\\,P(A|E_j)}\\).\n" +
        "- The \\(E_i\\) are called **hypotheses**; \\(P(E_i)\\) is the **priori probability** and \\(P(E_i|A)\\) the **posteriori probability**. It is also called the formula for the probability of 'causes'.\n" +
        "- **Proof in two lines:** \\(P(E_i|A) = \\dfrac{P(A \\cap E_i)}{P(A)} = \\dfrac{P(E_i)P(A|E_i)}{P(A)}\\) by the multiplication rule, and P(A) is the theorem of total probability.\n" +
        "- **Spot it:** the result is observed (the ball is red, the item is defective) and the question asks where it came from.\n" +
        "- **Answer layout:** define \\(E_1, E_2, \\ldots\\) and A; write the priors; write \\(P(A|E_i)\\); write the formula; substitute; simplify.",
      formula: {
        label: "Bayes' theorem",
        latex: "P(E_i|A) = \\dfrac{P(E_i)\\,P(A|E_i)}{\\sum_{j=1}^{n} P(E_j)\\,P(A|E_j)}",
        symbols: [
          { symbol: "\\(E_i\\)", meaning: "the cause (hypothesis) asked about" },
          { symbol: "\\(P(E_i)\\)", meaning: "its probability before A is known (priori)" },
          { symbol: "\\(P(E_i|A)\\)", meaning: "its probability after A is known (posteriori)" },
        ],
      },
      authoredExample: {
        prompt: "Machine A makes 60% of a factory's items and machine B the rest. 3% of A's items and 2% of B's items are defective. An item is found to be defective. Find the probability that machine A made it.",
        steps: [
          "Let \\(E_1\\) be 'made by A', \\(E_2\\) be 'made by B' and D be 'the item is defective'.",
          "\\(P(E_1) = 0.6\\), \\(P(E_2) = 0.4\\); \\(P(D|E_1) = 0.03\\), \\(P(D|E_2) = 0.02\\).",
          "Route through A: \\(0.6 \\times 0.03 = 0.018\\). Route through B: \\(0.4 \\times 0.02 = 0.008\\).",
          "By Bayes' theorem, \\(P(E_1|D) = \\dfrac{P(E_1)P(D|E_1)}{P(E_1)P(D|E_1) + P(E_2)P(D|E_2)} = \\dfrac{0.018}{0.018 + 0.008}\\).",
          "\\(P(E_1|D) = \\dfrac{0.018}{0.026} = \\dfrac{18}{26} = \\dfrac{9}{13}\\).",
        ],
        answer: "\\(\\dfrac{9}{13}\\)",
      },
      selfCheckExample: {
        prompt: "A doctor comes by car with probability 0.7 and by bike with probability 0.3. He is late with probability 0.1 by car and 0.2 by bike. He arrives late. Find the probability that he came by car.",
        steps: [
          "Routes: \\(0.7 \\times 0.1 = 0.07\\) and \\(0.3 \\times 0.2 = 0.06\\).",
          "\\(P(\\text{car}|\\text{late}) = \\dfrac{0.07}{0.07 + 0.06}\\).",
        ],
        answer: "\\(\\dfrac{7}{13}\\)",
      },
      practiceSet: [
        {
          prompt: "One coin is fair and the other has heads on both sides. A coin is chosen at random and tossed, and it shows a head. Find the probability that it is the two-headed coin.",
          answer: "\\(\\dfrac{1/2 \\times 1}{1/2 \\times 1 + 1/2 \\times 1/2} = \\dfrac{2}{3}\\)",
        },
        {
          prompt: "\\(P(E_1) = 0.3\\), \\(P(E_2) = 0.7\\), \\(P(A|E_1) = 0.5\\) and \\(P(A|E_2) = 0.1\\). Find \\(P(E_1|A)\\).",
          answer: "\\(\\dfrac{0.15}{0.15 + 0.07} = \\dfrac{15}{22}\\)",
        },
        {
          prompt: "Manager A is put in charge of a project with probability 0.4 and manager B with 0.6. It finishes on time with probability 0.9 under A and 0.5 under B. It finished on time. Find the probability that A was in charge.",
          answer: "\\(\\dfrac{0.36}{0.36 + 0.3} = \\dfrac{6}{11}\\)",
        },
      ],
      pyqExampleId: "f0cbb54c-a48d-4acb-a3a6-ce65b1de3188",
      traps: [
        {
          title: "Answering P(A|E) instead of P(E|A)",
          body: "'The item is defective; find the probability that machine A made it' asks for P(A | defective). The defect rate of machine A is the given \\(P(D|E_1)\\), not the answer.",
        },
        {
          title: "Leaving out the denominator",
          body: "The answer is one route divided by the sum of ALL the routes. The numerator alone is \\(P(E_i \\cap A)\\), not \\(P(E_i|A)\\).",
        },
        {
          title: "Assuming equal priors",
          body: "Only 'chosen at random' gives equal priors. Shares like 60% and 40%, or a die deciding the bag, give unequal ones.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-bayesmany",
      name: "Three or more causes",
      intuition:
        "With three machines or three companies, the work is the same: one product per cause in the denominator, and the cause asked about on top. In a case study the denominator is usually the total found in part (i).",
      definition:
        "- Write the priors from the shares or the ratio, and the rates as \\(P(A|E_i)\\).\n" +
        "- Work out every product \\(P(E_j)P(A|E_j)\\) once; their sum is P(A).\n" +
        "- \\(P(E_i|A)\\) is the product for \\(E_i\\) divided by that sum.\n" +
        "- The posteriors of all the causes add to 1, so 'Amber or Bonzi, given electric' is \\(1 - P(\\text{Comet}|\\text{electric})\\).\n" +
        "- A factor that appears in every term, such as \\(\\dfrac{1}{100}\\), cancels. Show the cancelling in one line.",
      formula: {
        label: "Bayes' theorem with three causes",
        latex: "P(E_3|A) = \\dfrac{P(E_3)P(A|E_3)}{P(E_1)P(A|E_1) + P(E_2)P(A|E_2) + P(E_3)P(A|E_3)}",
      },
      authoredExample: {
        prompt: "Three boxes are chosen with probabilities \\(\\dfrac{1}{2}\\), \\(\\dfrac{1}{3}\\) and \\(\\dfrac{1}{6}\\). Box I has 1 red and 3 blue balls, Box II has 1 red and 1 blue, Box III has 4 red and 1 blue. A box is chosen and a ball drawn; it is red. Find the probability that it came from Box III.",
        steps: [
          "Let \\(E_1, E_2, E_3\\) be 'Box I, II, III is chosen' and A be 'the ball is red'.",
          "\\(P(A|E_1) = \\dfrac{1}{4}\\), \\(P(A|E_2) = \\dfrac{1}{2}\\), \\(P(A|E_3) = \\dfrac{4}{5}\\).",
          "Products: \\(\\dfrac{1}{2} \\times \\dfrac{1}{4} = \\dfrac{1}{8}\\), \\(\\dfrac{1}{3} \\times \\dfrac{1}{2} = \\dfrac{1}{6}\\), \\(\\dfrac{1}{6} \\times \\dfrac{4}{5} = \\dfrac{2}{15}\\).",
          "\\(P(A) = \\dfrac{1}{8} + \\dfrac{1}{6} + \\dfrac{2}{15} = \\dfrac{15 + 20 + 16}{120} = \\dfrac{51}{120}\\).",
          "\\(P(E_3|A) = \\dfrac{2/15}{51/120} = \\dfrac{16}{120} \\times \\dfrac{120}{51} = \\dfrac{16}{51}\\).",
        ],
        answer: "\\(\\dfrac{16}{51}\\)",
      },
      selfCheckExample: {
        prompt: "In a hospital, 40% of patients get treatment X, 40% get Y and 20% get Z; they recover with probabilities 0.6, 0.7 and 0.9. A patient recovered. Find the probability that the patient got treatment Z.",
        steps: ["Products: 0.24, 0.28, 0.18; sum 0.70."],
        answer: "\\(\\dfrac{0.18}{0.70} = \\dfrac{9}{35}\\)",
      },
      practiceSet: [
        {
          prompt: "P, Q and R are chosen as manager with chances in the ratio 2 : 3 : 5, and the chances that sales rise under them are 0.5, 0.4 and 0.2. Sales rose. Find the probability that R was chosen.",
          answer: "\\(\\dfrac{0.1}{0.1 + 0.12 + 0.1} = \\dfrac{5}{16}\\)",
        },
        {
          prompt: "Three urns are equally likely to be chosen; the fractions of red balls in them are \\(\\dfrac{1}{4}\\), \\(\\dfrac{1}{2}\\) and \\(\\dfrac{3}{4}\\). A red ball is drawn. Find the probability that it came from the third urn.",
          answer: "\\(\\dfrac{3/4}{1/4 + 1/2 + 3/4} = \\dfrac{1}{2}\\)",
        },
        {
          prompt: "For three causes, \\(P(E_1|A) = \\dfrac{1}{4}\\) and \\(P(E_2|A) = \\dfrac{1}{3}\\). Find \\(P(E_3|A)\\).",
          answer: "\\(1 - \\dfrac{1}{4} - \\dfrac{1}{3} = \\dfrac{5}{12}\\)",
        },
      ],
      pyqExampleId: "72f49de6-f0f7-4321-860a-705b13425c2d",
      traps: [
        {
          title: "Recomputing P(A) with a slip",
          body: "In a case study, P(A) from part (i) is the denominator of the Bayes part. Reuse it, and copy it exactly.",
        },
        {
          title: "Dropping a cause from the denominator",
          body: "Every cause goes in the denominator, even one whose product is small. A two-term denominator for three causes gives a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-truth",
      name: "Truth-tellers, guessing and test results",
      intuition:
        "A report or a test result is evidence, not the truth. It can come from a true event reported honestly, or from a false one reported wrongly. Bayes' theorem weighs these two routes.",
      definition:
        "- **Truth-teller:** \\(E_1\\) = the event really happened, \\(E_2\\) = it did not, A = the person reports that it happened.\n" +
        "- \\(P(A|E_1)\\) = probability of speaking the truth; \\(P(A|E_2)\\) = probability of lying (1 minus the truth probability).\n" +
        "- The priors come from the experiment itself (a six on a die: \\(\\dfrac{1}{6}\\)), not from the person.\n" +
        "- **Knows or guesses:** a student who knows is correct with probability 1; a guess is correct with the given probability (\\(\\dfrac{1}{4}\\) for four options).\n" +
        "- **Medical tests (NCERT Example 18):** a positive result can come from a sick person (test detects) or a healthy one (false positive). With a rare disease, most positives can be false.",
      formula: {
        label: "Report given by a truth-teller",
        latex: "P(E_1|A) = \\dfrac{P(E_1)\\,t}{P(E_1)\\,t + P(E_2)\\,(1 - t)}",
        symbols: [
          { symbol: "\\(t\\)", meaning: "probability that the person speaks the truth" },
          { symbol: "\\(E_1\\)", meaning: "the event really happened" },
        ],
      },
      authoredExample: {
        prompt: "A speaks the truth 4 times out of 5. A die is thrown and A reports that the number is greater than 4. Find the probability that it really was greater than 4.",
        steps: [
          "Let \\(E_1\\) be 'the number is greater than 4', \\(E_2\\) be 'it is not' and A be 'A reports greater than 4'.",
          "\\(P(E_1) = \\dfrac{2}{6} = \\dfrac{1}{3}\\), \\(P(E_2) = \\dfrac{2}{3}\\).",
          "\\(P(A|E_1) = \\dfrac{4}{5}\\) (he tells the truth) and \\(P(A|E_2) = \\dfrac{1}{5}\\) (he lies).",
          "\\(P(E_1|A) = \\dfrac{\\frac{1}{3} \\times \\frac{4}{5}}{\\frac{1}{3} \\times \\frac{4}{5} + \\frac{2}{3} \\times \\frac{1}{5}} = \\dfrac{4/15}{4/15 + 2/15}\\).",
          "\\(P(E_1|A) = \\dfrac{4}{6} = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(\\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "A student knows the answer to a question with probability \\(\\dfrac{2}{3}\\) and guesses otherwise; a guess is correct with probability \\(\\dfrac{1}{4}\\). The answer is correct. Find the probability that the student knew it.",
        steps: [
          "\\(P = \\dfrac{\\frac{2}{3} \\times 1}{\\frac{2}{3} \\times 1 + \\frac{1}{3} \\times \\frac{1}{4}} = \\dfrac{2/3}{3/4}\\).",
        ],
        answer: "\\(\\dfrac{8}{9}\\)",
      },
      practiceSet: [
        {
          prompt: "1% of people have a disease. A test is positive for 95% of those who have it and for 10% of those who do not. A person tests positive. Find the probability that the person has the disease.",
          answer: "\\(\\dfrac{0.0095}{0.0095 + 0.099} = \\dfrac{19}{217}\\)",
        },
        {
          prompt: "A machine has a fault 20% of the time. An alarm rings for 90% of faults and, falsely, for 10% of the times there is no fault. The alarm rings. Find the probability that there is a fault.",
          answer: "\\(\\dfrac{0.18}{0.18 + 0.08} = \\dfrac{9}{13}\\)",
        },
        {
          prompt: "A student knows an answer with probability \\(\\dfrac{1}{2}\\); a guess is right with probability \\(\\dfrac{1}{3}\\). The answer is right. Find the probability that the student knew it.",
          answer: "\\(\\dfrac{1/2}{1/2 + 1/6} = \\dfrac{3}{4}\\)",
        },
      ],
      pyqExampleId: "9fd485d4-e913-4f88-a1a2-ac3ccb444ba4",
      traps: [
        {
          title: "Giving the truth probability as the answer",
          body: "The chance that the event really happened is not the person's truth rate. It equals the truth rate only when the two priors are equal, as with a fair coin.",
        },
        {
          title: "A wrong report needs a lie",
          body: "If the event did not happen, the person reports it only by lying, so \\(P(A|E_2) = 1 - t\\), not t.",
        },
        {
          title: "A student who knows is always right",
          body: "\\(P(\\text{correct}|\\text{knows}) = 1\\). Writing the guessing probability there is a common slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-lost",
      name: "A lost card or a missing ball",
      intuition:
        "A card goes missing before the draw, so we do not know what the rest of the pack holds. The missing card's kind is the cause; the card drawn later is the evidence.",
      definition:
        "- \\(E_1\\) = 'the lost card is of the kind asked', \\(E_2\\) = 'it is not'. Priors come from the full pack of 52.\n" +
        "- After the loss, 51 cards remain. If the lost card was of that kind, one fewer of it remains.\n" +
        "- For two cards drawn from the 51, use combinations: \\(P(A|E_1) = \\dfrac{{}^{k}C_2}{{}^{51}C_2}\\); the \\({}^{51}C_2\\) cancels in Bayes' theorem.\n" +
        "- The same idea works for a ball moved to another bag (NCERT Miscellaneous Question 10): the moved ball's colour is the cause.",
      formula: {
        label: "Lost card",
        latex: "P(E_1|A) = \\dfrac{P(E_1)P(A|E_1)}{P(E_1)P(A|E_1) + P(E_2)P(A|E_2)}",
      },
      authoredExample: {
        prompt: "A card is lost from a pack of 52 cards. Two cards are drawn from the remaining cards and both are face cards. Find the probability that the lost card was a face card.",
        steps: [
          "Let \\(E_1\\) be 'the lost card is a face card', \\(E_2\\) be 'it is not' and A be 'both cards drawn are face cards'.",
          "There are 12 face cards, so \\(P(E_1) = \\dfrac{12}{52} = \\dfrac{3}{13}\\) and \\(P(E_2) = \\dfrac{10}{13}\\).",
          "If a face card was lost, 11 remain among 51 cards: \\(P(A|E_1) = \\dfrac{{}^{11}C_2}{{}^{51}C_2} = \\dfrac{55}{{}^{51}C_2}\\). Otherwise 12 remain: \\(P(A|E_2) = \\dfrac{{}^{12}C_2}{{}^{51}C_2} = \\dfrac{66}{{}^{51}C_2}\\).",
          "\\(P(E_1|A) = \\dfrac{\\frac{3}{13} \\times 55}{\\frac{3}{13} \\times 55 + \\frac{10}{13} \\times 66}\\), after cancelling \\({}^{51}C_2\\).",
          "\\(P(E_1|A) = \\dfrac{165}{165 + 660} = \\dfrac{165}{825} = \\dfrac{1}{5}\\).",
        ],
        answer: "\\(\\dfrac{1}{5}\\)",
      },
      selfCheckExample: {
        prompt: "Bag I has 2 red and 3 black balls; Bag II has 1 red and 2 black. One ball is moved from Bag I to Bag II, and a ball drawn from Bag II is red. Find the probability that the moved ball was red.",
        steps: [
          "Red moved (\\(\\dfrac{2}{5}\\)): Bag II has 2 red of 4, so \\(\\dfrac{1}{2}\\). Black moved (\\(\\dfrac{3}{5}\\)): 1 red of 4, so \\(\\dfrac{1}{4}\\).",
          "\\(\\dfrac{\\frac{2}{5} \\times \\frac{1}{2}}{\\frac{2}{5} \\times \\frac{1}{2} + \\frac{3}{5} \\times \\frac{1}{4}} = \\dfrac{1/5}{7/20}\\).",
        ],
        answer: "\\(\\dfrac{4}{7}\\)",
      },
      practiceSet: [
        {
          prompt: "A bag has 4 red and 3 black balls. One ball is lost. Two balls drawn from the rest are both red. Find the probability that the lost ball was red.",
          answer: "\\(\\dfrac{\\frac{4}{7} \\times \\frac{3}{15}}{\\frac{4}{7} \\times \\frac{3}{15} + \\frac{3}{7} \\times \\frac{6}{15}} = \\dfrac{2}{5}\\)",
        },
        {
          prompt: "Bag I has 4 white and 4 black balls; Bag II has 2 white and 2 black. One ball is moved from Bag I to Bag II, and then a white ball is drawn from Bag II. Find the probability that the moved ball was white.",
          answer: "\\(\\dfrac{\\frac{1}{2} \\times \\frac{3}{5}}{\\frac{1}{2} \\times \\frac{3}{5} + \\frac{1}{2} \\times \\frac{2}{5}} = \\dfrac{3}{5}\\)",
        },
      ],
      pyqExampleId: "4d1e8d68-6b0a-495d-b4fc-064b0b48a9ac",
      traps: [
        {
          title: "Drawing from 52 after the loss",
          body: "Once a card is lost, the pack is one card smaller. The conditional probabilities use the smaller pack; only the priors use the full pack.",
        },
        {
          title: "Thinking the evidence makes the loss more likely",
          body: "Drawing cards of a kind is a little LESS likely when one of that kind is missing, so the answer always comes out slightly below the prior. An answer above the prior signals a slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-bayesnot",
      name: "When the observed event is a 'not'",
      intuition:
        "Case studies often turn the question round: the person was NOT infected, the student did NOT qualify. Bayes' theorem still works; use the complement of every rate and keep the priors as they are.",
      definition:
        "- The evidence is \\(A'\\): 'the profit did not increase', 'the person is not infected'.\n" +
        "- In each case, \\(P(A'|E_i) = 1 - P(A|E_i)\\). The priors \\(P(E_i)\\) do not change.\n" +
        "- \\(P(E_i|A') = \\dfrac{P(E_i)\\,P(A'|E_i)}{\\sum_j P(E_j)\\,P(A'|E_j)}\\).\n" +
        "- The denominator is \\(P(A') = 1 - P(A)\\), so a total found earlier can be reused.\n" +
        "- A rate that is already a 'not' (95% of dropouts do not qualify) is used as given.",
      formula: {
        label: "Bayes' theorem with the complement as evidence",
        latex: "P(E_i|A') = \\dfrac{P(E_i)\\,[1 - P(A|E_i)]}{\\sum_{j} P(E_j)\\,[1 - P(A|E_j)]}",
      },
      authoredExample: {
        prompt: "A shop gets its parcels from suppliers P, Q and R in the ratio 1 : 2 : 2. They deliver on time with probabilities 0.9, 0.8 and 0.6. A parcel arrives late. Find the probability that it came from R.",
        steps: [
          "Let \\(E_1, E_2, E_3\\) be 'from P, Q, R' and A be 'on time', so the evidence is \\(A'\\).",
          "\\(P(E_1) = \\dfrac{1}{5}\\), \\(P(E_2) = \\dfrac{2}{5}\\), \\(P(E_3) = \\dfrac{2}{5}\\).",
          "\\(P(A'|E_1) = 0.1\\), \\(P(A'|E_2) = 0.2\\), \\(P(A'|E_3) = 0.4\\).",
          "\\(P(E_3|A') = \\dfrac{0.4 \\times 0.4}{0.2 \\times 0.1 + 0.4 \\times 0.2 + 0.4 \\times 0.4} = \\dfrac{0.16}{0.02 + 0.08 + 0.16}\\).",
          "\\(P(E_3|A') = \\dfrac{0.16}{0.26} = \\dfrac{8}{13}\\).",
        ],
        answer: "\\(\\dfrac{8}{13}\\)",
      },
      selfCheckExample: {
        prompt: "Bulbs come from factories A, B and C with probabilities 0.5, 0.3 and 0.2, and last 1000 hours with probabilities 0.9, 0.8 and 0.7. A bulb fails before 1000 hours. Find the probability that it came from C.",
        steps: ["Failure rates 0.1, 0.2, 0.3; products 0.05, 0.06, 0.06; sum 0.17."],
        answer: "\\(\\dfrac{0.06}{0.17} = \\dfrac{6}{17}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A|E_1) = 0.85\\). Write \\(P(A'|E_1)\\).", answer: "\\(0.15\\)" },
        {
          prompt: "Part (i) of a case study gives \\(P(A) = 0.62\\). What is the denominator when part (ii) asks for \\(P(E_1|A')\\)?",
          answer: "\\(P(A') = 1 - 0.62 = 0.38\\)",
        },
        {
          prompt: "Machines X, Y and Z make 50%, 25% and 25% of the items; 90%, 80% and 60% of their items pass inspection. An item fails. Find the probability that machine Z made it.",
          answer: "\\(\\dfrac{0.1}{0.05 + 0.05 + 0.1} = \\dfrac{1}{2}\\)",
        },
      ],
      pyqExampleId: "14bfea8d-f5cd-4f6f-88fa-0eb0afa2d3b7",
      traps: [
        {
          title: "Complementing the priors",
          body: "Only the rates change to \\(1 - P(A|E_i)\\). The share of each group, \\(P(E_i)\\), stays as it was.",
        },
        {
          title: "Using the 'yes' rates for a 'no' question",
          body: "If the profit did NOT increase, the rates 0.8, 0.5, 0.3 for an increase become 0.2, 0.5, 0.7. A 2022 board question turned on this step.",
        },
      ],
    },
  ],
};
