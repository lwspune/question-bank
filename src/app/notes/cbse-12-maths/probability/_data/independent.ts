import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_PR_INDEPENDENT_NOTE: SubtopicNote = {
  subtopicName: "Independent Events",
  title: "Independent Events",
  oneLineDefinition:
    "Two events are independent when one happening does not change the probability of the other, that is when P(E and F) = P(E) P(F); with them come the rules for 'both', 'exactly one' and 'at least one'.",
  whyItMatters:
    "69 questions, thirty-four of them from board papers in every year from 2022 to 2026. Sixteen of the thirty-four are one-mark MCQs (2023, 2025, 2026), one of them a 2025 assertion-reason item on independent and mutually exclusive events. The written questions test two events for independence (2022, 2023, 2025, 2026), find P(F) from P(E) and P(E or F) (2023, 2024, 2026), and ask for 'at least one' or 'exactly one' when two or three people try something independently (every year). A 2023 question has A and B throwing a die in turn until one gets a six. The textbook adds Examples 10 to 14, Miscellaneous Example 23, Exercise 13.2 Q1 and Q4 to Q18 (except Q16), and Miscellaneous Questions 4 and 8.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmpr-indtest",
      name: "Testing two events for independence",
      intuition:
        "If knowing that F happened leaves the chance of E unchanged, the two events do not affect each other. The quick test is to multiply the two probabilities and compare with the probability that both happen.",
      definition:
        "- **Definition:** E and F are independent if \\(P(F|E) = P(F)\\) (with \\(P(E) \\ne 0\\)) and \\(P(E|F) = P(E)\\) (with \\(P(F) \\ne 0\\)).\n" +
        "- **Equivalent test used in answers:** E and F are independent if \\(P(E \\cap F) = P(E)\\,P(F)\\).\n" +
        "- If \\(P(E \\cap F) \\ne P(E)\\,P(F)\\), the events are **dependent**.\n" +
        "- **Answer layout:** write the sample space, list E, F and \\(E \\cap F\\), find the three probabilities, compare \\(P(E)\\,P(F)\\) with \\(P(E \\cap F)\\) in numbers, then state the conclusion.\n" +
        "- Three events A, B, C are **mutually independent** only if all four hold: \\(P(A \\cap B) = P(A)P(B)\\), \\(P(A \\cap C) = P(A)P(C)\\), \\(P(B \\cap C) = P(B)P(C)\\) and \\(P(A \\cap B \\cap C) = P(A)P(B)P(C)\\).",
      formula: {
        label: "Test for independence",
        latex: "P(E \\cap F) = P(E)\\,P(F)",
      },
      authoredExample: {
        prompt: "A card is drawn at random from a pack of 52 cards. E is the event 'the card is a heart' and F is the event 'the card is a face card'. Are E and F independent?",
        steps: [
          "There are 13 hearts, so \\(P(E) = \\dfrac{13}{52} = \\dfrac{1}{4}\\).",
          "There are 12 face cards (jack, queen, king of each suit), so \\(P(F) = \\dfrac{12}{52} = \\dfrac{3}{13}\\).",
          "\\(E \\cap F\\) is the jack, queen and king of hearts, so \\(P(E \\cap F) = \\dfrac{3}{52}\\).",
          "\\(P(E)\\,P(F) = \\dfrac{1}{4} \\times \\dfrac{3}{13} = \\dfrac{3}{52}\\).",
          "Since \\(P(E \\cap F) = P(E)\\,P(F)\\), E and F are independent.",
        ],
        answer: "Independent",
      },
      selfCheckExample: {
        prompt: "A die is thrown. Let \\(A = \\{1, 2, 3\\}\\) and \\(B = \\{3, 4\\}\\). Are A and B independent?",
        steps: [
          "\\(P(A) = \\dfrac{1}{2}\\), \\(P(B) = \\dfrac{1}{3}\\), \\(A \\cap B = \\{3\\}\\) so \\(P(A \\cap B) = \\dfrac{1}{6}\\).",
          "\\(P(A)\\,P(B) = \\dfrac{1}{6}\\).",
        ],
        answer: "Yes, they are independent",
      },
      practiceSet: [
        { prompt: "\\(P(E) = 0.4\\), \\(P(F) = 0.5\\) and \\(P(E \\cap F) = 0.2\\). Are E and F independent?", answer: "Yes: \\(0.4 \\times 0.5 = 0.2\\)" },
        {
          prompt: "\\(P(E) = \\dfrac{1}{3}\\), \\(P(F) = \\dfrac{1}{4}\\) and \\(P(E \\cap F) = \\dfrac{1}{6}\\). Are E and F independent?",
          answer: "No: \\(P(E)\\,P(F) = \\dfrac{1}{12} \\ne \\dfrac{1}{6}\\)",
        },
        {
          prompt: "Two coins are tossed. A is 'the first coin shows a head' and B is 'both coins show the same face'. Are A and B independent?",
          answer: "Yes: \\(P(A) = P(B) = \\dfrac{1}{2}\\) and \\(P(A \\cap B) = P(HH) = \\dfrac{1}{4}\\)",
        },
      ],
      pyqExampleId: "674870fe-dcaa-46fc-ac3f-5d2373984977",
      traps: [
        {
          title: "A bare yes or no",
          body: "The marks are for the comparison. Write \\(P(E)\\,P(F)\\) and \\(P(E \\cap F)\\) as numbers, show they are equal or not, then conclude.",
        },
        {
          title: "Pairwise is not enough for three events",
          body: "Three events need all three pairs AND \\(P(A \\cap B \\cap C) = P(A)P(B)P(C)\\). If any one fails, they are not independent.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cbmpr-indvsme",
      name: "Independent is not the same as mutually exclusive",
      intuition:
        "Mutually exclusive events cannot happen together; independent events can, and do, happen together at the rate P(E) times P(F). So two events with nonzero probabilities cannot be both.",
      definition:
        "- 'Independent' is defined through **probabilities**: \\(P(E \\cap F) = P(E)\\,P(F)\\).\n" +
        "- 'Mutually exclusive' is defined through **the events themselves**: \\(E \\cap F = \\phi\\).\n" +
        "- Two independent events with nonzero probabilities cannot be mutually exclusive, and two mutually exclusive events with nonzero probabilities cannot be independent.\n" +
        "- In an assertion-reason item in Mathematics, code (D) means the Assertion is false and the Reason is true.",
      table: {
        columns: ["Point", "Independent events", "Mutually exclusive events"],
        rows: [
          { cells: ["Defined by", "\\(P(E \\cap F) = P(E)\\,P(F)\\)", "\\(E \\cap F = \\phi\\), so \\(P(E \\cap F) = 0\\)"] },
          { cells: ["Common outcomes", "May have common outcomes", "Never have a common outcome"] },
          { cells: ["\\(P(E \\cup F)\\)", "\\(P(E) + P(F) - P(E)\\,P(F)\\)", "\\(P(E) + P(F)\\)"] },
          { cells: ["\\(P(E|F)\\), with \\(P(F) \\ne 0\\)", "Equals \\(P(E)\\)", "Equals 0"] },
          {
            cells: ["Both at once?", "Not possible when both probabilities are nonzero", "Not possible when both probabilities are nonzero"],
            noteAmber:
              "Board 2025 asked, as an assertion-reason item, whether P(A and B) = 0 makes A and B independent. It does not: the Assertion is false and the Reason is true, code (D).",
            pyqExampleId: "8ec60c25-2a0b-4f05-b7e6-ad3f177ad1d7",
          },
          {
            cells: ["Checking a pair of events", "Compare \\(P(E \\cap F)\\) with \\(P(E)\\,P(F)\\)", "Check whether \\(E \\cap F\\) is empty"],
            noteAmber: "Board 2025 asked whether two events on two dice were independent or mutually exclusive. Check both separately: they were neither.",
            pyqExampleId: "592bec69-9e6c-4950-a7f8-c26adbfea122",
          },
        ],
      },
      selfCheckExample: {
        prompt: "A die is thrown. \\(E = \\{1, 2\\}\\) and \\(F = \\{5, 6\\}\\). Are E and F mutually exclusive? Are they independent?",
        steps: [
          "\\(E \\cap F = \\phi\\), so they are mutually exclusive.",
          "\\(P(E)\\,P(F) = \\dfrac{1}{3} \\times \\dfrac{1}{3} = \\dfrac{1}{9}\\), but \\(P(E \\cap F) = 0\\).",
        ],
        answer: "Mutually exclusive, and not independent",
      },
      practiceSet: [
        {
          prompt: "E and F are independent with \\(P(E) = 0.2\\) and \\(P(F) = 0.5\\). Find \\(P(E \\cup F)\\).",
          answer: "\\(0.2 + 0.5 - 0.1 = 0.6\\)",
        },
        {
          prompt: "E and F are mutually exclusive with \\(P(E) = 0.2\\) and \\(P(F) = 0.5\\). Find \\(P(E \\cup F)\\).",
          answer: "\\(0.7\\)",
        },
        {
          prompt: "Can two events with \\(P(E) = 0.5\\) and \\(P(F) = 0.4\\) be both independent and mutually exclusive?",
          answer: "No: independence needs \\(P(E \\cap F) = 0.2\\), mutually exclusive needs 0",
        },
      ],
      pyqExampleId: "8ec60c25-2a0b-4f05-b7e6-ad3f177ad1d7",
      traps: [
        {
          title: "Reading P(A and B) = 0 as independence",
          body: "\\(P(A \\cap B) = 0\\) says A and B are mutually exclusive. With nonzero probabilities, that rules independence out.",
        },
        {
          title: "Using the Physics code (D)",
          body: "In the Mathematics paper, code (D) is 'Assertion false, Reason true'. It is not 'both false'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-indrules",
      name: "Working with independent events and their complements",
      intuition:
        "If E and F do not affect each other, neither do 'E happens' and 'F does not happen'. So every complement can be multiplied in the same way, and a conditional probability simply drops its condition.",
      definition:
        "- If E and F are independent, so are E and \\(F'\\), \\(E'\\) and F, and \\(E'\\) and \\(F'\\) (NCERT Example 13 and the note after it).\n" +
        "- For independent events, \\(P(E|F) = P(E)\\) and \\(P(F|E) = P(F)\\): no calculation is needed.\n" +
        "- \\(P(E \\cup F) = P(E) + P(F) - P(E)\\,P(F)\\). Given \\(P(E)\\) and \\(P(E \\cup F)\\), this is a linear equation in \\(P(F)\\).\n" +
        "- 'Neither E nor F' is \\(P(E' \\cap F') = P(E')\\,P(F')\\).\n" +
        "- **Proof that E and F' are independent:** \\(P(E) = P(E \\cap F) + P(E \\cap F')\\), so \\(P(E \\cap F') = P(E) - P(E)P(F) = P(E)[1 - P(F)] = P(E)P(F')\\).",
      formula: {
        label: "Independent events",
        latex: "P(E \\cap F) = P(E)\\,P(F), \\quad P(E \\cap F') = P(E)\\,P(F')",
      },
      authoredExample: {
        prompt: "E and F are independent events with \\(P(E) = 0.3\\) and \\(P(F) = 0.5\\). Find \\(P(E \\cap F')\\), \\(P(E' \\cap F')\\), \\(P(E|F')\\) and \\(P(E \\cup F)\\).",
        steps: [
          "\\(P(E') = 0.7\\) and \\(P(F') = 0.5\\).",
          "E and \\(F'\\) are independent, so \\(P(E \\cap F') = P(E)\\,P(F') = 0.3 \\times 0.5 = 0.15\\).",
          "\\(E'\\) and \\(F'\\) are independent, so \\(P(E' \\cap F') = 0.7 \\times 0.5 = 0.35\\).",
          "Since E and \\(F'\\) are independent, \\(P(E|F') = P(E) = 0.3\\).",
          "\\(P(E \\cup F) = P(E) + P(F) - P(E)\\,P(F) = 0.3 + 0.5 - 0.15 = 0.65\\).",
        ],
        answer: "\\(0.15\\), \\(0.35\\), \\(0.3\\) and \\(0.65\\)",
      },
      selfCheckExample: {
        prompt: "X and Y are independent with \\(P(X) = 0.4\\) and \\(P(X \\cap Y') = 0.3\\). Find \\(P(Y)\\).",
        steps: [
          "\\(P(X \\cap Y') = P(X)\\,P(Y')\\), so \\(P(Y') = \\dfrac{0.3}{0.4} = 0.75\\).",
        ],
        answer: "\\(P(Y) = 0.25\\)",
      },
      practiceSet: [
        { prompt: "A and B are independent with \\(P(A) = 0.5\\) and \\(P(B) = 0.2\\). Find \\(P(A \\cap B')\\).", answer: "\\(0.5 \\times 0.8 = 0.4\\)" },
        { prompt: "X and Y are independent, \\(P(X) = 0.75\\) and \\(P(X \\cap Y) = 0.3\\). Find \\(P(Y)\\).", answer: "\\(0.4\\)" },
        { prompt: "E and F are independent with \\(P(E) = \\dfrac{2}{3}\\) and \\(P(F) = \\dfrac{1}{4}\\). Find \\(P(F|E)\\).", answer: "\\(\\dfrac{1}{4}\\)" },
      ],
      pyqExampleId: "083b90aa-8f8d-473b-8a62-1e9c686b0aa4",
      traps: [
        {
          title: "Working out P(E|F) the long way and slipping",
          body: "For independent events \\(P(E|F) = P(E)\\). Board MCQs give extra numbers that are not needed; write the result straight away.",
        },
        {
          title: "Using P(E) + P(F) for the union",
          body: "Independent events can happen together, so subtract \\(P(E)\\,P(F)\\): \\(P(E \\cup F) = P(E) + P(F) - P(E)P(F)\\).",
        },
        {
          title: "Keeping only one root",
          body: "When P(A) comes from a quadratic, both roots can lie between 0 and 1. Check each pair in the data; if both work, give both (board 2023).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-indexact",
      name: "Both, exactly one, and none: adding the cases",
      intuition:
        "Write every way the event can happen as a separate case. In each case the people or trials are independent, so multiply; the cases cannot happen together, so add.",
      definition:
        "- **Both:** \\(P(A \\cap B) = P(A)\\,P(B)\\).\n" +
        "- **Exactly one of A, B:** \\(P(A)\\,P(B') + P(A')\\,P(B)\\), two cases.\n" +
        "- **Exactly one of A, B, C:** three cases, \\(P(A)P(B')P(C') + P(A')P(B)P(C') + P(A')P(B')P(C)\\).\n" +
        "- **Exactly two of A, B, C:** three cases, one for each person left out.\n" +
        "- **None:** \\(P(A')\\,P(B')\\,P(C')\\).\n" +
        "- Two people contradict each other when exactly one of them tells the truth.",
      formula: {
        label: "Exactly one of two independent events",
        latex: "P(\\text{exactly one}) = P(A)\\,P(B') + P(A')\\,P(B)",
      },
      authoredExample: {
        prompt: "Three students X, Y and Z try a problem independently. Their chances of solving it are \\(\\dfrac{1}{2}\\), \\(\\dfrac{2}{5}\\) and \\(\\dfrac{1}{6}\\). Find the probability that exactly one of them solves it.",
        steps: [
          "The chances of not solving it are \\(\\dfrac{1}{2}\\), \\(\\dfrac{3}{5}\\) and \\(\\dfrac{5}{6}\\).",
          "Only X: \\(\\dfrac{1}{2} \\times \\dfrac{3}{5} \\times \\dfrac{5}{6} = \\dfrac{15}{60}\\).",
          "Only Y: \\(\\dfrac{1}{2} \\times \\dfrac{2}{5} \\times \\dfrac{5}{6} = \\dfrac{10}{60}\\).",
          "Only Z: \\(\\dfrac{1}{2} \\times \\dfrac{3}{5} \\times \\dfrac{1}{6} = \\dfrac{3}{60}\\).",
          "The three cases are mutually exclusive, so add: \\(\\dfrac{15 + 10 + 3}{60} = \\dfrac{28}{60} = \\dfrac{7}{15}\\).",
        ],
        answer: "\\(\\dfrac{7}{15}\\)",
      },
      selfCheckExample: {
        prompt: "Two shooters hit a target independently with probabilities 0.7 and 0.6. Find the probability that exactly one of them hits it.",
        steps: ["\\(0.7 \\times 0.4 + 0.3 \\times 0.6 = 0.28 + 0.18\\)."],
        answer: "\\(0.46\\)",
      },
      practiceSet: [
        { prompt: "A and B are independent with \\(P(A) = 0.5\\) and \\(P(B) = 0.4\\). Find the probability that both happen.", answer: "\\(0.2\\)" },
        { prompt: "With the same A and B, find the probability that neither happens.", answer: "\\(0.5 \\times 0.6 = 0.3\\)" },
        { prompt: "Two dice are thrown. Find the probability that exactly one of them shows a six.", answer: "\\(2 \\times \\dfrac{1}{6} \\times \\dfrac{5}{6} = \\dfrac{5}{18}\\)" },
      ],
      pyqExampleId: "07ad2d93-54d2-4756-8d65-965cc2b94cd1",
      traps: [
        {
          title: "One case for 'exactly one'",
          body: "'Exactly one' of two people is two cases: A and not B, or B and not A. Writing only \\(P(A)P(B')\\) loses half the answer.",
        },
        {
          title: "Leaving out the 'not' factors",
          body: "'Only A of three' is \\(P(A)P(B')P(C')\\), not \\(P(A)\\) alone: the other two must fail.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-indatleast",
      name: "At least one: use the complement",
      intuition:
        "'At least one' covers many cases, but its opposite, 'none at all', is a single product. Find that and subtract it from 1.",
      definition:
        "- \\(P(\\text{at least one of } A, B) = 1 - P(A')\\,P(B')\\) for independent A and B (NCERT Example 14).\n" +
        "- For three: \\(1 - P(A')\\,P(B')\\,P(C')\\).\n" +
        "- The same works for repeated independent trials: \\(P(\\text{at least one six in } n \\text{ throws}) = 1 - \\left(\\dfrac{5}{6}\\right)^{n}\\).\n" +
        "- 'The target is hit', 'the problem is solved', 'the item is available somewhere' all mean at least one success.\n" +
        "- 'At least one fails' is \\(1 - P(\\text{all succeed})\\); 'at most two of three succeed' is the same thing.",
      formula: {
        label: "At least one of independent events",
        latex: "P(\\text{at least one}) = 1 - P(A')\\,P(B')\\,P(C')",
      },
      authoredExample: {
        prompt: "The probabilities that three bulbs fuse within a year are 0.1, 0.2 and 0.3, independently of one another. Find the probability that at least one of them fuses within the year.",
        steps: [
          "Let A, B, C be the events that the bulbs fuse. Then \\(P(A') = 0.9\\), \\(P(B') = 0.8\\), \\(P(C') = 0.7\\).",
          "The opposite of 'at least one fuses' is 'none fuses'.",
          "\\(P(\\text{none}) = P(A')\\,P(B')\\,P(C') = 0.9 \\times 0.8 \\times 0.7 = 0.504\\).",
          "\\(P(\\text{at least one}) = 1 - 0.504 = 0.496\\).",
        ],
        answer: "\\(0.496\\)",
      },
      selfCheckExample: {
        prompt: "A die is thrown three times. Find the probability of getting at least one six.",
        steps: ["\\(P(\\text{no six}) = \\left(\\dfrac{5}{6}\\right)^3 = \\dfrac{125}{216}\\)."],
        answer: "\\(1 - \\dfrac{125}{216} = \\dfrac{91}{216}\\)",
      },
      practiceSet: [
        { prompt: "Three coins are tossed. Find the probability of at least one head.", answer: "\\(1 - \\dfrac{1}{8} = \\dfrac{7}{8}\\)" },
        {
          prompt: "A and B are independent with \\(P(A) = 0.2\\) and \\(P(B) = 0.25\\). Find the probability that at least one of them happens.",
          answer: "\\(1 - 0.8 \\times 0.75 = 0.4\\)",
        },
        {
          prompt: "An item is in stock at shop X with probability 0.6 and at shop Y with probability 0.5, independently. Find the probability that it is in stock in at least one shop.",
          answer: "\\(1 - 0.4 \\times 0.5 = 0.8\\)",
        },
      ],
      pyqExampleId: "1bb76579-cb05-4955-9c8a-dca68c216a72",
      traps: [
        {
          title: "Adding the probabilities",
          body: "For three bulbs with 0.1, 0.2 and 0.3, 'at least one' is not \\(0.1 + 0.2 + 0.3 = 0.6\\): that counts the overlaps more than once. Use \\(1 - P(\\text{none})\\).",
        },
        {
          title: "Subtracting the wrong product",
          body: "'At least one hits' is \\(1 - P(\\text{all miss})\\); 'at least one misses' is \\(1 - P(\\text{all hit})\\). Decide which single case is the opposite.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-alternate",
      name: "Taking turns until someone succeeds",
      intuition:
        "If A goes first, A can win on the 1st, 3rd, 5th, ... turn. Every extra round needs two more failures, so the chances form a geometric series with ratio q squared.",
      definition:
        "- Let p be the chance of success on one turn and \\(q = 1 - p\\).\n" +
        "- A (who starts) wins on turn 1, or on turn 3 after two failures, or on turn 5 after four failures: \\(P(A) = p + q^2p + q^4p + \\cdots\\).\n" +
        "- This is an infinite geometric series with first term p and ratio \\(q^2 < 1\\), so \\(P(A) = \\dfrac{p}{1 - q^2}\\).\n" +
        "- B wins on turns 2, 4, 6, ...: \\(P(B) = qp + q^3p + \\cdots = \\dfrac{qp}{1 - q^2}\\), and \\(P(B) = 1 - P(A)\\).",
      formula: {
        label: "The player who starts",
        latex: "P(A) = p + q^2p + q^4p + \\cdots = \\dfrac{p}{1 - q^2}",
      },
      authoredExample: {
        prompt: "A and B toss a fair coin in turn, and the first to get a head wins. A starts. Find the probability that each of them wins.",
        steps: [
          "On one toss, \\(p = P(\\text{head}) = \\dfrac{1}{2}\\) and \\(q = \\dfrac{1}{2}\\).",
          "A wins on the 1st, 3rd, 5th, ... toss: \\(P(A) = \\dfrac{1}{2} + \\left(\\dfrac{1}{2}\\right)^2\\dfrac{1}{2} + \\left(\\dfrac{1}{2}\\right)^4\\dfrac{1}{2} + \\cdots\\).",
          "This is a geometric series with first term \\(\\dfrac{1}{2}\\) and ratio \\(\\dfrac{1}{4}\\).",
          "\\(P(A) = \\dfrac{1/2}{1 - 1/4} = \\dfrac{1/2}{3/4} = \\dfrac{2}{3}\\).",
          "\\(P(B) = 1 - \\dfrac{2}{3} = \\dfrac{1}{3}\\).",
        ],
        answer: "\\(P(A) = \\dfrac{2}{3}\\), \\(P(B) = \\dfrac{1}{3}\\)",
      },
      selfCheckExample: {
        prompt: "A and B draw a card in turn, with replacement, from a pack of 52 cards, and the first to draw an ace wins. A starts. Find the probability that A wins.",
        steps: [
          "\\(p = \\dfrac{4}{52} = \\dfrac{1}{13}\\) and \\(q = \\dfrac{12}{13}\\).",
          "\\(P(A) = \\dfrac{1/13}{1 - 144/169} = \\dfrac{1/13}{25/169}\\).",
        ],
        answer: "\\(\\dfrac{13}{25}\\)",
      },
      practiceSet: [
        {
          prompt: "A and B shoot at a target in turn, A first; each hits with probability \\(\\dfrac{1}{3}\\), and the first to hit wins. Find the probability that A wins.",
          answer: "\\(\\dfrac{1/3}{1 - 4/9} = \\dfrac{3}{5}\\)",
        },
        {
          prompt: "A and B draw a ball in turn, with replacement, from a bag of 1 red and 4 white balls; the first to draw red wins. A starts. Find the probability that A wins.",
          answer: "\\(p = \\dfrac{1}{5}\\): \\(\\dfrac{1/5}{1 - 16/25} = \\dfrac{5}{9}\\)",
        },
        {
          prompt: "A, B and C toss a fair coin in that order, again and again; the first to get a head wins. Find the probability that A wins.",
          answer: "Ratio \\(\\dfrac{1}{8}\\): \\(\\dfrac{1/2}{1 - 1/8} = \\dfrac{4}{7}\\)",
        },
      ],
      pyqExampleId: "6074d9a7-14ce-4d79-9843-dbe0edd0f0e1",
      traps: [
        {
          title: "Ratio q instead of q squared",
          body: "Between two of A's turns, both A and B fail once, so the ratio is \\(q^2\\), not q. With three players taking turns it is \\(q^3\\).",
        },
        {
          title: "Giving both players the same chance",
          body: "The player who starts has the larger chance, because he gets the first try. The two answers must add to 1.",
        },
      ],
    },
  ],
};
