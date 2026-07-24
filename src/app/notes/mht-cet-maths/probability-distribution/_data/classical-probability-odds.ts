import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSICAL_PROBABILITY_NOTE: SubtopicNote = {
  subtopicName: "Classical Probability, Addition Theorem and Odds",
  title: "Classical Probability, Addition Theorem and Odds",
  oneLineDefinition:
    "Count favourable outcomes over equally-likely total outcomes, combine events with the addition theorem P(A∪B) = P(A)+P(B)−P(A∩B), and convert freely between probability and odds — the foundation layer every later probability topic rests on.",
  whyItMatters:
    "This is the entry point of the chapter and a near-certain 1–2 marks on every MHT-CET paper: 21 PYQs sit here (7 EASY, 12 MODERATE, 2 HARD). The bank tests three recurring shapes — combinatorial counting (tickets, balls via nCr, word-letter arrangements, dice and 'with replacement' pairs), the addition theorem (often applied to a given probability-distribution table, or as 'exactly one occurs'), and odds ↔ probability (single die, and the 'one of A, B, C must and only one can happen' setup). " +
    "The classic slips are all here: subtracting P(A∩B) when you should add it, forgetting the complement in 'at least one', and reading 'odds against' backwards.",
  concepts: [
    // 0 — foundation: classical (equally-likely) probability (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetpd-classical-probability",
      name: "Classical Probability — Favourable over Total",
      intuition:
        "Perform a random experiment whose outcomes are all equally likely. The sample space S is the set of every possible outcome; an event E is any subset of S. The probability of E is simply the fraction of outcomes that make E happen — how many favourable, out of how many in all.",
      definition:
        "For a finite experiment with **equally-likely** outcomes:\n" +
        "- **Sample space** \\(S\\) — the set of all possible outcomes; \\(n(S)\\) is the total count.\n" +
        "- **Event** \\(E\\) — a subset of \\(S\\); \\(n(E)\\) is the number of favourable outcomes.\n" +
        "- **Classical probability:** \\(P(E) = \\dfrac{n(E)}{n(S)}\\), and always \\(0 \\le P(E) \\le 1\\).\n" +
        "- **Complement:** \\(P(E') = 1 - P(E)\\), where \\(E'\\) is 'E does not happen'.\n" +
        "The whole game is counting \\(n(E)\\) and \\(n(S)\\) correctly — everything below is just smarter counting or smarter combining.",
      formula: {
        label: "Classical probability of an event",
        latex:
          "P(E) = \\dfrac{n(E)}{n(S)} = \\dfrac{\\text{favourable outcomes}}{\\text{total equally-likely outcomes}},\\qquad P(E') = 1 - P(E)",
        symbols: [
          { symbol: "n(S)", meaning: "size of the sample space (total outcomes)" },
          { symbol: "n(E)", meaning: "number of outcomes favourable to E" },
          { symbol: "E'", meaning: "complement of E — the event 'E does not occur'" },
        ],
      },
      visualizationSlug: "sample-space-event",
      authoredExample: {
        prompt:
          "A fair die is rolled once. Find the probability of getting an even number.",
        steps: [
          "Sample space \\(S = \\{1,2,3,4,5,6\\}\\), so \\(n(S) = 6\\).",
          "Even numbers: \\(E = \\{2,4,6\\}\\), so \\(n(E) = 3\\).",
          "\\(P(E) = \\dfrac{3}{6} = \\dfrac12\\).",
        ],
        answer: "\\(P(E) = \\dfrac12\\)",
      },
      selfCheckExample: {
        prompt:
          "A card is drawn at random from a well-shuffled pack of 52 playing cards. What is the probability that it is a king?",
        steps: [
          "Total cards: \\(n(S) = 52\\).",
          "Kings: \\(n(E) = 4\\).",
          "\\(P(E) = \\dfrac{4}{52} = \\dfrac{1}{13}\\).",
        ],
        answer: "\\(P(E) = \\dfrac{1}{13}\\)",
      },
      practiceSet: [
        { prompt: "A fair coin is tossed once. Probability of a head?", answer: "\\(\\dfrac12\\)", method: "\\(n(E)=1,\\ n(S)=2\\)" },
        { prompt: "State the classical definition of probability.", answer: "\\(P(E)=\\dfrac{n(E)}{n(S)}\\), favourable over total equally-likely outcomes" },
        { prompt: "If \\(P(E)=0.35\\), find \\(P(E')\\).", answer: "\\(0.65\\)", method: "\\(P(E')=1-P(E)\\)" },
        { prompt: "What is the range of any probability value?", answer: "\\(0 \\le P(E) \\le 1\\)" },
      ],
      traps: [
        {
          title: "Probability needs EQUALLY-likely outcomes",
          body:
            "\\(P(E)=\\dfrac{n(E)}{n(S)}\\) is only valid when every outcome in \\(S\\) is equally likely. Do not count 'sum = 7' as one outcome out of the eleven possible sums 2..12 — the eleven sums are NOT equally likely; count over the 36 equally-likely ordered dice pairs instead.",
        },
        {
          title: "A probability can never exceed 1 or go below 0",
          body:
            "If your count gives \\(n(E) > n(S)\\) or a negative value, the counting is wrong. Every valid \\(P(E)\\) satisfies \\(0 \\le P(E) \\le 1\\); an answer of \\(\\tfrac{7}{6}\\) or a negative fraction is an immediate signal to re-count.",
        },
      ],
    },

    // 1 — combinatorial counting of probabilities (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-combinatorial-counting",
      name: "Counting Probabilities with Combinations and Arrangements",
      intuition:
        "Most probability questions are really counting questions. When order does not matter (drawing balls, choosing vertices, picking numbers) count with combinations \\({}^nC_r\\); when order matters (arranging letters of a word) count with permutations. Build \\(n(S)\\) and \\(n(E)\\) with the same tool, then divide.",
      definition:
        "The counting tools and standard shapes:\n" +
        "- **Selection (order irrelevant):** choose \\(r\\) from \\(n\\) in \\({}^nC_r = \\dfrac{n!}{r!\\,(n-r)!}\\) ways. Draw-without-replacement problems use this for BOTH \\(n(S)\\) and \\(n(E)\\).\n" +
        "- **Different-category draws:** to draw one of each colour multiply the per-colour combinations, e.g. \\({}^3C_1\\,{}^4C_1\\,{}^2C_1\\) over \\({}^9C_3\\).\n" +
        "- **Arrangements of a word:** \\(n\\) letters with a letter repeated \\(k\\) times arrange in \\(\\dfrac{n!}{k!}\\) ways.\n" +
        "- **'Two alike together':** glue them into one block — the block arrangements count the 'together' case, and 'not together' \\(= 1 - P(\\text{together})\\).\n" +
        "- **With replacement / independent choices:** each of \\(m\\) picks from \\(k\\) options gives \\(k^m\\) equally-likely ordered outcomes.",
      formula: {
        label: "Combination count and word-arrangement count",
        latex:
          "{}^nC_r = \\dfrac{n!}{r!\\,(n-r)!},\\qquad \\text{(word, one letter } k \\text{ times)}\\ \\#\\text{arrangements} = \\dfrac{n!}{k!}",
      },
      visualizationSlug: "dice-sum-grid",
      authoredExample: {
        prompt:
          "A bag has 5 red and 3 black balls. Two balls are drawn at random without replacement. Find the probability that both are red.",
        steps: [
          "Total ways to draw 2 from 8: \\(n(S) = {}^8C_2 = \\dfrac{8\\cdot 7}{2} = 28\\).",
          "Favourable (2 red from 5): \\(n(E) = {}^5C_2 = \\dfrac{5\\cdot 4}{2} = 10\\).",
          "\\(P = \\dfrac{10}{28} = \\dfrac{5}{14}\\).",
        ],
        answer: "\\(P(\\text{both red}) = \\dfrac{5}{14}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two fair dice are rolled. Find the probability that the sum of the numbers on the upper faces is at least 9.",
        steps: [
          "Total equally-likely ordered outcomes: \\(n(S) = 6 \\times 6 = 36\\).",
          "Sum \\(\\ge 9\\): sum 9 → 4 ways, sum 10 → 3, sum 11 → 2, sum 12 → 1, giving \\(n(E) = 4+3+2+1 = 10\\).",
          "\\(P = \\dfrac{10}{36} = \\dfrac{5}{18}\\).",
        ],
        answer: "\\(P(\\text{sum} \\ge 9) = \\dfrac{5}{18}\\)",
      },
      practiceSet: [
        { prompt: "A ticket is drawn from 100 tickets numbered 1 to 100. Probability it is a perfect square?", answer: "\\(\\dfrac{1}{10}\\)", method: "10 squares (1,4,...,100) over 100" },
        { prompt: "Three persons each independently pick one of 3 houses. Probability all pick the SAME house?", answer: "\\(\\dfrac19\\)", method: "\\(3/3^3 = 3/27\\)" },
        { prompt: "Word UNIVERSITY (10 letters, I twice): probability the two I's are NOT together?", answer: "\\(\\dfrac45\\)", method: "\\(1 - \\dfrac{9!}{10!/2!} = 1 - \\dfrac{2}{10}\\)" },
        { prompt: "Three of the 6 vertices of a regular hexagon are chosen. Probability the triangle is equilateral?", answer: "\\(\\dfrac{1}{10}\\)", method: "2 equilateral / \\({}^6C_3 = 20\\)" },
      ],
      pyqExampleId: "5f96333c-8714-440a-a2d6-ee76457ca7c7", // urn 3 red/4 blue/2 green, 3 drawn different colours → ³C₁⁴C₁²C₁/⁹C₃ = 2/7
      traps: [
        {
          title: "Use combinations when the draw order does NOT matter",
          body:
            "Drawing 3 balls 'at random' from an urn is an unordered selection: use \\({}^9C_3\\) for the total, not \\(9\\cdot 8\\cdot 7\\). Mixing an ordered numerator with an unordered denominator (or vice-versa) is the commonest counting error — keep both the same.",
        },
        {
          title: "Multiply combinations for 'one of each category'",
          body:
            "For 'one red AND one blue AND one green', count each colour separately and MULTIPLY: \\({}^3C_1\\times{}^4C_1\\times{}^2C_1 = 24\\), then divide by \\({}^9C_3=84\\). Adding the counts instead of multiplying is wrong — the choices are made together, not as alternatives.",
        },
        {
          title: "'With replacement' means \\(k^m\\) ordered outcomes",
          body:
            "Choosing \\(p\\) and \\(q\\) from \\(\\{1,2,3,4\\}\\) with replacement gives \\(4\\times 4 = 16\\) equally-likely ordered pairs (not \\({}^4C_2\\)). Order matters and repeats are allowed, so the sample space is \\(4^2\\).",
        },
        {
          title: "'Not together' = 1 − 'together' (glue the alike letters)",
          body:
            "To count arrangements with two identical letters together, glue them into ONE block and arrange \\((n-1)\\) items. Then P(not together) \\(= 1 - P(\\text{together})\\). For UNIVERSITY this is \\(1 - \\tfrac{9!}{10!/2!} = 1 - \\tfrac{2}{10} = \\tfrac45\\).",
        },
      ],
    },

    // 2 — mutually exclusive & exhaustive events (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-mutually-exclusive-exhaustive",
      name: "Mutually Exclusive and Exhaustive Events",
      intuition:
        "Two events are mutually exclusive when they cannot both happen (no common outcome), and a set of events is exhaustive when together they cover the whole sample space. If events are BOTH — mutually exclusive and exhaustive — their probabilities are disjoint pieces that fill S completely, so they add up to exactly 1.",
      definition:
        "Key facts:\n" +
        "- **Mutually exclusive:** \\(A \\cap B = \\varnothing\\), so \\(P(A \\cap B) = 0\\) and \\(P(A \\cup B) = P(A) + P(B)\\).\n" +
        "- **Exhaustive:** the events together are the whole space, \\(A \\cup B \\cup \\cdots = S\\).\n" +
        "- **Mutually exclusive AND exhaustive:** the probabilities partition S, so \\(P(A) + P(B) + P(C) + \\cdots = 1\\).\n" +
        "This last identity is the workhorse: given the probabilities in terms of one unknown, set their sum to 1 and solve.",
      formula: {
        label: "Mutually exclusive and exhaustive events sum to 1",
        latex:
          "A_1, A_2, \\ldots, A_n \\text{ mut. excl. \\& exhaustive} \\;\\Longrightarrow\\; \\sum_{i=1}^{n} P(A_i) = 1",
      },
      visualizationSlug: "exhaustive-events-tiling",
      authoredExample: {
        prompt:
          "A, B, C are mutually exclusive and exhaustive events with \\(P(B) = 2P(A)\\) and \\(P(C) = 3P(A)\\). Find \\(P(A)\\).",
        steps: [
          "They are mutually exclusive and exhaustive, so \\(P(A)+P(B)+P(C)=1\\).",
          "Substitute: \\(P(A) + 2P(A) + 3P(A) = 6P(A) = 1\\).",
          "So \\(P(A) = \\dfrac16\\).",
        ],
        answer: "\\(P(A) = \\dfrac16\\)",
      },
      selfCheckExample: {
        prompt:
          "A, B, C are mutually exclusive and exhaustive events with \\(P(A) = 2P(B) = 3P(C)\\). Find \\(P(A)\\).",
        steps: [
          "Let \\(P(A) = k\\). Then \\(P(B) = \\dfrac{k}{2}\\) and \\(P(C) = \\dfrac{k}{3}\\).",
          "Sum to 1: \\(k + \\dfrac{k}{2} + \\dfrac{k}{3} = k\\cdot\\dfrac{11}{6} = 1\\).",
          "So \\(k = \\dfrac{6}{11}\\).",
        ],
        answer: "\\(P(A) = \\dfrac{6}{11}\\)",
      },
      practiceSet: [
        { prompt: "For mutually exclusive events A and B, what is \\(P(A\\cap B)\\)?", answer: "\\(0\\)", method: "no common outcome" },
        { prompt: "Mutually exclusive & exhaustive A, B, C: what does \\(P(A)+P(B)+P(C)\\) equal?", answer: "\\(1\\)" },
        { prompt: "For mutually exclusive A, B, write \\(P(A\\cup B)\\).", answer: "\\(P(A)+P(B)\\)", method: "the \\(-P(A\\cap B)\\) term is 0" },
        { prompt: "A, B, C mut. excl. & exhaustive, \\(P(B)=P(C)=2P(A)\\). Find \\(P(A)\\).", answer: "\\(\\dfrac15\\)", method: "\\(P(A)(1+2+2)=1\\)" },
      ],
      pyqExampleId: "a5ee7c02-13ac-44cb-881f-d17b57634006", // A,B,C mut.excl.&exhaustive, P(B)=3/2 P(A), P(C)=1/2 P(B) → P(A)=4/13
      traps: [
        {
          title: "Mutually exclusive is NOT the same as independent",
          body:
            "Mutually exclusive means \\(P(A\\cap B)=0\\) (they cannot co-occur). Independent means \\(P(A\\cap B)=P(A)P(B)\\). Two events with non-zero probability cannot be both — if they were mutually exclusive AND independent, \\(P(A)P(B)=0\\), forcing one to be impossible.",
        },
        {
          title: "Only add all the pieces to 1 when the events are BOTH exclusive AND exhaustive",
          body:
            "The identity \\(\\sum P(A_i)=1\\) needs the events to be mutually exclusive (no overlap to double-count) and exhaustive (nothing left uncovered). If they merely partition part of S, or overlap, the sum is not 1.",
        },
      ],
    },

    // 3 — addition theorem (anchored) — includes distribution-table events, exactly-one, P(A')+P(B')
    {
      kind: "formula" as const,
      slug: "cetpd-addition-theorem",
      name: "The Addition Theorem — P(A∪B), Exactly One, and Complements",
      intuition:
        "For any two events, 'A or B' counts A plus B but double-counts the overlap, so subtract it once: P(A∪B) = P(A)+P(B)−P(A∩B). This single identity, plus the complement rule, answers 'A or B', 'exactly one of A, B', 'neither', and reads events straight off a probability-distribution table (an event is just a set of X-values, so its probability is the sum of those rows).",
      definition:
        "The addition theorem and its friends:\n" +
        "- **Addition theorem:** \\(P(A\\cup B) = P(A) + P(B) - P(A\\cap B)\\).\n" +
        "- **Rearranged:** \\(P(A) + P(B) = P(A\\cup B) + P(A\\cap B)\\); combined with \\(P(A')+P(B') = 2 - [P(A)+P(B)]\\).\n" +
        "- **Exactly one of A, B occurs:** \\(P(A\\cup B) - P(A\\cap B)\\) (the union minus the shared middle).\n" +
        "- **Reading a distribution table:** an event like \\(E=\\{X\\text{ is prime}\\}\\) or \\(F=\\{X<5\\}\\) is a set of X-values; \\(P(E)\\) is the sum of \\(P(X=x)\\) over those \\(x\\), and \\(P(E\\cap F)\\) sums the rows in BOTH.",
      formula: {
        label: "Addition theorem and its derived identities",
        latex:
          "P(A\\cup B) = P(A) + P(B) - P(A\\cap B),\\qquad P(\\text{exactly one}) = P(A\\cup B) - P(A\\cap B)",
        symbols: [
          { symbol: "\\(P(A\\cup B)\\)", meaning: "probability that A or B (or both) occurs" },
          { symbol: "\\(P(A\\cap B)\\)", meaning: "probability that both occur (the overlap)" },
          { symbol: "P(A')", meaning: "complement, \\(1 - P(A)\\)" },
        ],
      },
      visualizationSlug: "venn-two-events",
      authoredExample: {
        prompt:
          "For two events, \\(P(A) = 0.5\\), \\(P(B) = 0.4\\) and \\(P(A\\cap B) = 0.2\\). Find \\(P(A\\cup B)\\) and the probability that exactly one of A, B occurs.",
        steps: [
          "Addition theorem: \\(P(A\\cup B) = 0.5 + 0.4 - 0.2 = 0.7\\).",
          "Exactly one occurs: \\(P(A\\cup B) - P(A\\cap B) = 0.7 - 0.2 = 0.5\\).",
        ],
        answer: "\\(P(A\\cup B) = 0.7\\); exactly one occurs with probability \\(0.5\\).",
      },
      selfCheckExample: {
        prompt:
          "A random variable X has P(X=1)=0.15, P(X=2)=0.25, P(X=3)=0.20, P(X=4)=0.10, P(X=5)=0.30. For E = {X is even} and F = {X ≤ 2}, find P(E∪F).",
        steps: [
          "\\(P(E) = P(2) + P(4) = 0.25 + 0.10 = 0.35\\).",
          "\\(P(F) = P(1) + P(2) = 0.15 + 0.25 = 0.40\\).",
          "\\(P(E\\cap F) = P(2) = 0.25\\) (only X=2 is even AND \\(\\le 2\\)).",
          "\\(P(E\\cup F) = 0.35 + 0.40 - 0.25 = 0.50\\).",
        ],
        answer: "\\(P(E\\cup F) = 0.50\\)",
      },
      practiceSet: [
        { prompt: "State the addition theorem for two events A and B.", answer: "\\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\)" },
        { prompt: "If \\(P(A\\cup B)=0.7\\) and \\(P(A\\cap B)=0.2\\), find \\(P(A')+P(B')\\).", answer: "\\(1.1\\)", method: "\\(P(A)+P(B)=0.9\\), so \\(2-0.9\\)" },
        { prompt: "If exactly one of A, B occurs with probability \\(\\tfrac25\\) and \\(P(A\\cup B)=\\tfrac12\\), find \\(P(A\\cap B)\\).", answer: "\\(0.1\\)", method: "\\(\\tfrac12-\\tfrac25=\\tfrac{1}{10}\\)" },
        { prompt: "Write the probability that exactly one of A, B occurs in terms of the union and intersection.", answer: "\\(P(A\\cup B)-P(A\\cap B)\\)" },
      ],
      pyqExampleId: "4ae9a67f-4bc7-48d1-a29c-aa68a2987c35", // dist table, E={prime}, F={X<4} → P(E∪F)=0.77
      traps: [
        {
          title: "ADD the intersection back, don't subtract, to get P(A)+P(B)",
          body:
            "From \\(P(A\\cup B)=P(A)+P(B)-P(A\\cap B)\\) we get \\(P(A)+P(B)=P(A\\cup B)+P(A\\cap B)\\) — you ADD the intersection. So \\(P(A')+P(B')=2-[P(A\\cup B)+P(A\\cap B)]\\). Subtracting \\(P(A\\cap B)\\) here is the standard MHT-CET distractor.",
        },
        {
          title: "'Exactly one' is the union MINUS the intersection",
          body:
            "'Exactly one of A, B occurs' excludes the both-happen case, so it is \\(P(A\\cup B) - P(A\\cap B)\\), equivalently \\(P(A)+P(B)-2P(A\\cap B)\\). Do not confuse it with \\(P(A\\cup B)\\) (which INCLUDES both occurring).",
        },
        {
          title: "On a distribution table, an event's probability is a SUM of rows",
          body:
            "For \\(E=\\{X\\text{ is prime}\\}\\) add \\(P(2)+P(3)+P(5)+P(7)\\); for the intersection \\(E\\cap F\\) add only the X-values in BOTH sets. Forgetting a prime (2 is prime; 1 is not) or mis-listing the overlap throws \\(P(E\\cup F)\\).",
        },
        {
          title: "\\(P(A')+P(B') = 2 - [P(A)+P(B)]\\), not \\(1-[P(A)+P(B)]\\)",
          body:
            "Each complement subtracts from 1, and there are TWO of them: \\(P(A')+P(B') = (1-P(A)) + (1-P(B)) = 2 - [P(A)+P(B)]\\). Using a single 1 is a frequent slip on the complement-sum questions.",
        },
      ],
    },

    // 4 — odds (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-odds",
      name: "Odds in Favour and Odds Against a Probability",
      intuition:
        "Odds compare favourable outcomes to UNfavourable ones (not to the total). If an event has m favourable and n unfavourable equally-likely outcomes, the odds in favour are m : n and the odds against are n : m. Convert to probability by putting favourable over the total m + n. The 'one of A, B, C must and only one can happen' setup turns three odds into three probabilities that must sum to 1.",
      definition:
        "Odds ↔ probability conversions:\n" +
        "- **Odds in favour** \\(= m : n\\) means \\(P(E) = \\dfrac{m}{m+n}\\); **odds against** \\(= n : m\\) means \\(P(E) = \\dfrac{m}{m+n}\\) (favourable is still the second term).\n" +
        "- From a probability: **odds in favour** \\(= P(E) : P(E') = P(E) : (1-P(E))\\); **odds against** \\(= P(E') : P(E)\\).\n" +
        "- **'One of A, B, C must and only one can happen'** means A, B, C are mutually exclusive and exhaustive, so \\(P(A)+P(B)+P(C) = 1\\). Convert each given odds to a probability, use the sum to find the missing one, then convert back to odds.",
      formula: {
        label: "Odds and probability",
        latex:
          "\\text{odds in favour } m:n \\;\\Longleftrightarrow\\; P(E) = \\dfrac{m}{m+n},\\qquad \\text{odds against} = \\dfrac{P(E')}{P(E)} = \\dfrac{1-P(E)}{P(E)}",
      },
      authoredExample: {
        prompt:
          "In a single throw of a fair die, find the odds against getting a number greater than 4.",
        steps: [
          "Event \\(E=\\{5,6\\}\\), so \\(P(E)=\\dfrac26=\\dfrac13\\) and \\(P(E')=\\dfrac23\\).",
          "Odds against \\(= P(E') : P(E) = \\dfrac23 : \\dfrac13\\).",
          "Simplify: \\(2 : 1\\).",
        ],
        answer: "Odds against \\(= 2 : 1\\)",
      },
      selfCheckExample: {
        prompt:
          "A, B, C are three events, one of which must and only one can happen. The odds in favour of A are 3 : 2 and the odds against B are 2 : 1. Find the odds against C.",
        steps: [
          "Odds in favour of A \\(= 3:2 \\Rightarrow P(A) = \\dfrac{3}{3+2} = \\dfrac35\\).",
          "Odds against B \\(= 2:1 \\Rightarrow P(B) = \\dfrac{1}{2+1} = \\dfrac13\\) (favourable is the second term).",
          "One and only one happens: \\(P(C) = 1 - \\dfrac35 - \\dfrac13 = \\dfrac{15-9-5}{15} = \\dfrac{1}{15}\\).",
          "Odds against C \\(= P(C') : P(C) = \\dfrac{14}{15} : \\dfrac{1}{15} = 14 : 1\\).",
        ],
        answer: "Odds against C \\(= 14 : 1\\)",
      },
      practiceSet: [
        { prompt: "Odds in favour of an event are 3 : 2. Find its probability.", answer: "\\(\\dfrac35\\)", method: "\\(\\dfrac{3}{3+2}\\)" },
        { prompt: "Odds against an event are 7 : 3. Find its probability.", answer: "\\(\\dfrac{3}{10}\\)", method: "favourable is the second term: \\(\\dfrac{3}{7+3}\\)" },
        { prompt: "In one throw of a die, odds against getting 4 or 5?", answer: "\\(2:1\\)", method: "\\(P=\\tfrac13\\), \\(P'=\\tfrac23\\)" },
        { prompt: "'One of A, B, C must and only one can happen' means A, B, C are what?", answer: "Mutually exclusive and exhaustive; \\(P(A)+P(B)+P(C)=1\\)" },
      ],
      pyqExampleId: "7140b6fa-0d66-4709-805d-6d0103665d31", // A,B,C one must happen; odds fav A 4:6, odds against B 7:3 → odds against C = 7:3
      traps: [
        {
          title: "Odds compare favourable to UNfavourable, not to the total",
          body:
            "Odds in favour \\(m:n\\) means \\(m\\) favourable to \\(n\\) unfavourable, so \\(P = \\dfrac{m}{m+n}\\) — NOT \\(\\dfrac{m}{n}\\) and NOT \\(\\dfrac{m}{\\text{total already including } m}\\). The denominator of the probability is the SUM of the two odds terms.",
        },
        {
          title: "'Odds against' puts the unfavourable term first",
          body:
            "Odds against an event are \\(P(E') : P(E)\\) — unfavourable first. For \\(P(E)=\\tfrac13\\) the odds against are \\(\\tfrac23:\\tfrac13 = 2:1\\), while odds IN FAVOUR are \\(1:2\\). Reading the ratio in the wrong order is the most common odds mistake.",
        },
        {
          title: "'Must and only one can happen' = mutually exclusive and exhaustive",
          body:
            "When exactly one of A, B, C happens, they are mutually exclusive and exhaustive, so \\(P(A)+P(B)+P(C)=1\\). Convert each odds to a probability, solve for the missing probability from this sum, THEN convert back to the odds the question asks for.",
        },
      ],
    },
  ],
};
