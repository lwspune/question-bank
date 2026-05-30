import type { SubtopicNote } from "@/app/notes/_types";

export const CLASSICAL_PROBABILITY_COUNTING_NOTE: SubtopicNote = {
  // DB subtopic name — must match live taxonomy (the merged counting subtopic).
  subtopicName: "Probability via Counting",
  title: "Classical Probability & Counting",
  oneLineDefinition:
    "Probability as a counting ratio — favourable outcomes over total — applied to cards, dice, coins, arrangements, and number selections.",
  whyItMatters:
    "Start here. Every other probability subtopic — event algebra, independence, conditional probability, Bayes — is built on the classical idea below: count the favourable outcomes, count the total, divide. " +
    "This is the single largest slice of the NDA Probability bank (85 questions across dice, coins, balls, arrangements, and number-selection problems), and the easy marks live here — roughly a third of the bank is EASY. " +
    "Master the counting (combinations, sample-space size, the complement trick) and the rest of the chapter becomes bookkeeping.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    // FOUNDATION — no bank anchor; the vocabulary the rest of the chapter uses.
    {
      kind: "formula" as const,
      slug: "what-is-probability",
      name: "What is probability? (Random experiments, sample space, events)",
      visualizationSlug: "sample-space-event",
      intuition:
        "A random experiment is any process whose individual result you cannot predict in advance, even though you know every result that COULD occur — tossing a coin, rolling a die, drawing a card. " +
        "Each possible result is an outcome; the set of all outcomes is the sample space; any collection of outcomes you care about is an event. " +
        "Probability measures how much of the sample space an event covers.",
      definition:
        "Four pieces of vocabulary the whole chapter rests on:\n" +
        "- A **random experiment** has a known set of possible results but an unpredictable individual result.\n" +
        "- The **sample space** \\(S\\) is the set of all outcomes — for one die \\(S=\\{1,2,3,4,5,6\\}\\).\n" +
        "- An **event** \\(E\\) is any subset \\(E \\subseteq S\\); it **occurs** when the actual outcome lies in \\(E\\).\n" +
        "- Outcomes are **equally likely** when symmetry gives no reason to prefer one over another (a fair die, a fair coin) — the assumption the classical definition rests on.",
      authoredExample: {
        prompt:
          "Two coins are tossed together. Write the sample space \\(S\\), then write the event \\(A\\) = \"at least one head\" and count its outcomes.",
        steps: [
          "List every ordered outcome of the two coins: \\(S = \\{HH,\\ HT,\\ TH,\\ TT\\}\\), so \\(n(S)=4\\).",
          "\"At least one head\" excludes only \\(TT\\): \\(A = \\{HH,\\ HT,\\ TH\\}\\).",
          "Count: \\(n(A)=3\\).",
        ],
        answer: "\\(S=\\{HH,HT,TH,TT\\}\\), \\(n(S)=4\\); \\(A=\\{HH,HT,TH\\}\\), \\(n(A)=3\\).",
      },
      practiceSet: [
        { prompt: "Sample space when a single die is rolled?", answer: "\\(\\{1,2,3,4,5,6\\}\\)" },
        { prompt: "How many outcomes when two dice are rolled?", answer: "\\(36\\)", method: "\\(6 \\times 6\\)" },
        { prompt: "A coin is tossed 3 times. How many outcomes?", answer: "\\(8\\)", method: "\\(2^3\\)" },
        { prompt: "On one die, list the event \"an even number\".", answer: "\\(\\{2,4,6\\}\\)" },
      ],
      traps: [
        {
          title: "An event is a SET of outcomes, not a single outcome",
          body:
            "\"Getting a number greater than 4\" on a die is the event \\(\\{5,6\\}\\) — two outcomes — not one. " +
            "Mis-reading an event as a single outcome is the most common source of a wrong favourable-count.",
        },
        {
          title: "Write or size the sample space before you count anything",
          body:
            "Almost every classical-probability error is a counting error in \\(n(S)\\) or \\(n(E)\\). " +
            "Fix \\(n(S)\\) first (it is \\(2^n\\) for coins, \\(6^k\\) for dice, \\(\\binom{n}{r}\\) for unordered selections), then count favourable outcomes against it.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "classical-probability",
      name: "Classical (theoretical) probability",
      intuition:
        "When every outcome is equally likely, probability is just a counting ratio: how many outcomes make the event happen, out of how many are possible. " +
        "No experiment needed — pure counting.",
      definition:
        "For a finite sample space \\(S\\) of **equally likely** outcomes, the probability of an event \\(E\\) is " +
        "\\(P(E) = \\dfrac{n(E)}{n(S)}\\) — favourable outcomes over total outcomes. " +
        "Because \\(0 \\le n(E) \\le n(S)\\), every probability lies between \\(0\\) and \\(1\\). " +
        "This is the *classical* (or theoretical) definition; it fails the moment the outcomes are not equally likely (a loaded die), where each outcome must be weighted instead.",
      formula: {
        label: "Classical probability",
        latex:
          "P(E) = \\dfrac{n(E)}{n(S)} = \\dfrac{\\text{favourable outcomes}}{\\text{total outcomes}}",
        symbols: [
          { symbol: "\\(n(E)\\)", meaning: "number of outcomes that make \\(E\\) occur" },
          { symbol: "\\(n(S)\\)", meaning: "total number of equally likely outcomes" },
        ],
      },
      authoredExample: {
        prompt:
          "A card is drawn from a well-shuffled deck of 52 cards. What is the probability that it is a king?",
        steps: [
          "Total outcomes: \\(n(S)=52\\) (each card equally likely).",
          "Favourable: there are 4 kings, so \\(n(E)=4\\).",
          "Divide: \\(P(\\text{king}) = \\dfrac{4}{52} = \\dfrac{1}{13}\\).",
        ],
        answer: "\\(\\dfrac{1}{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "A single fair die is rolled. What is the probability of getting a number greater than 4?",
        steps: [
          "Total outcomes: \\(n(S)=6\\).",
          "Favourable outcomes (greater than 4): \\(\\{5,6\\}\\), so \\(n(E)=2\\).",
          "Divide: \\(P = \\dfrac{2}{6} = \\dfrac{1}{3}\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(\\text{head})\\) for a fair coin?", answer: "\\(\\dfrac{1}{2}\\)" },
        { prompt: "\\(P(\\text{a number} > 4)\\) on a die?", answer: "\\(\\dfrac{1}{3}\\)", method: "\\(2/6\\)" },
        { prompt: "\\(P(\\text{an ace})\\) from 52 cards?", answer: "\\(\\dfrac{1}{13}\\)", method: "\\(4/52\\)" },
        { prompt: "\\(P(\\text{a red card})\\) from 52 cards?", answer: "\\(\\dfrac{1}{2}\\)", method: "\\(26/52\\)" },
      ],
      pyqExampleId: "4687b434-944f-4e7e-956b-288d72a96773",
      traps: [
        {
          title: "The classical formula needs EQUALLY LIKELY outcomes",
          body:
            "\\(P=n(E)/n(S)\\) is only valid when every outcome is equally likely. " +
            "A loaded die, a biased coin, or faces repeated unevenly (a die with two 4s) breaks the assumption — weight each outcome by its own probability instead of counting.",
        },
        {
          title: "Favourable is a subset of total, so \\(P\\) can never exceed 1",
          body:
            "If a computation gives \\(P>1\\) or \\(P<0\\), the favourable or total count is wrong. Recount before trusting the answer.",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "complement-and-axioms",
      name: "Axioms, range, complement, and odds",
      intuition:
        "Probabilities live between 0 and 1; the whole sample space has probability 1; and the chance an event does NOT happen is 1 minus the chance it does. " +
        "That last fact — the complement rule — is the single most useful shortcut in the chapter: when an event is messy to count directly (\"at least one…\"), count its opposite instead.",
      definition:
        "- **Range + axioms:** for any event \\(E\\), \\(0 \\le P(E) \\le 1\\), with \\(P(S)=1\\) (certain) and \\(P(\\varnothing)=0\\) (impossible).\n" +
        "- **Complement:** \\(E'\\) (\"\\(E\\) does not occur\") satisfies \\(P(E') = 1 - P(E)\\).\n" +
        "- **Odds:** odds in favour of \\(E\\) of \\(a:b\\) give \\(P(E) = \\dfrac{a}{a+b}\\); odds against of \\(a:b\\) give \\(P(E) = \\dfrac{b}{a+b}\\).",
      formula: {
        label: "Complement rule and range",
        latex:
          "0 \\le P(E) \\le 1, \\qquad P(S)=1, \\qquad P(E') = 1 - P(E)",
        symbols: [
          { symbol: "\\(E'\\)", meaning: "complement of \\(E\\) — the event that \\(E\\) does not occur" },
          { symbol: "\\(P(\\varnothing)\\)", meaning: "probability of the impossible event, equal to \\(0\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "The probability that it rains tomorrow is \\(0.3\\). (i) What is the probability it does not rain? (ii) If the odds in favour of an event are \\(3:2\\), what is its probability?",
        steps: [
          "(i) Complement: \\(P(\\text{no rain}) = 1 - 0.3 = 0.7\\).",
          "(ii) Odds in favour \\(3:2\\) mean 3 favourable parts out of \\(3+2=5\\): \\(P = \\dfrac{3}{5}\\).",
        ],
        answer: "(i) \\(0.7\\); (ii) \\(\\dfrac{3}{5}\\).",
      },
      selfCheckExample: {
        prompt:
          "When two dice are thrown, the probability of getting a sum of 7 is \\(\\dfrac{1}{6}\\). What is the probability of NOT getting a sum of 7?",
        steps: [
          "Use the complement: \\(P(\\text{not } 7) = 1 - P(7)\\).",
          "\\(= 1 - \\dfrac{1}{6} = \\dfrac{5}{6}\\).",
        ],
        answer: "\\(\\dfrac{5}{6}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(E)=0.4\\). Find \\(P(E')\\).", answer: "\\(0.6\\)" },
        { prompt: "Odds in favour \\(2:3\\). Find \\(P(E)\\).", answer: "\\(\\dfrac{2}{5}\\)", method: "\\(a/(a+b)\\)" },
        { prompt: "Odds against an event \\(5:1\\). Find \\(P(E)\\).", answer: "\\(\\dfrac{1}{6}\\)", method: "\\(1/(5+1)\\)" },
        { prompt: "Can \\(P(E)=1.2\\)?", answer: "No", method: "\\(P \\le 1\\)" },
      ],
      pyqExampleId: "9f05e2ac-02e3-489d-975b-8f34649272f0",
      traps: [
        {
          title: "Odds are not probability: \\(a:b\\) in favour means \\(\\dfrac{a}{a+b}\\), not \\(\\dfrac{a}{b}\\)",
          body:
            "Convert odds to a probability by putting the favourable parts over the TOTAL parts. " +
            "Odds in favour \\(3:2\\) is \\(\\tfrac{3}{5}\\); odds against \\(3:2\\) is \\(\\tfrac{2}{5}\\).",
        },
        {
          title: "\"At least one…\" almost always means use the complement",
          body:
            "\\(P(\\text{at least one}) = 1 - P(\\text{none})\\). Counting the cases directly (exactly one, exactly two, …) is slower and a frequent source of arithmetic slips.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "counting-with-combinations",
      name: "Selection probability with combinations",
      intuition:
        "When you draw a handful of objects \"at random\" and order does not matter, both the favourable and the total counts are combinations \\(\\binom{n}{r}\\). " +
        "The probability is one combination count divided by another.",
      definition:
        "Choosing \\(r\\) objects from \\(n\\) where order is irrelevant has \\(\\binom{n}{r}\\) total outcomes. " +
        "If the objects split into types (say \\(a\\) of one kind and \\(b\\) of another) and you want \\(k\\) of the first kind, the favourable count is \\(\\binom{a}{k}\\binom{b}{r-k}\\). " +
        "Then \\(P = \\dfrac{\\binom{a}{k}\\binom{b}{r-k}}{\\binom{a+b}{r}}\\).",
      formula: {
        label: "Selection probability (combinations)",
        latex:
          "P = \\dfrac{\\dbinom{a}{k}\\dbinom{b}{r-k}}{\\dbinom{a+b}{r}}",
        symbols: [
          { symbol: "\\(a, b\\)", meaning: "counts of the two types of object" },
          { symbol: "\\(k\\)", meaning: "how many of the first type the event requires" },
          { symbol: "\\(r\\)", meaning: "total number drawn" },
        ],
      },
      authoredExample: {
        prompt:
          "A bag has 5 red and 4 blue balls. Three balls are drawn at random. What is the probability that exactly 2 are red?",
        steps: [
          "Total ways to draw 3 from 9: \\(\\binom{9}{3} = 84\\).",
          "Favourable: choose 2 red from 5 and 1 blue from 4: \\(\\binom{5}{2}\\binom{4}{1} = 10 \\times 4 = 40\\).",
          "Divide: \\(P = \\dfrac{40}{84} = \\dfrac{10}{21}\\).",
        ],
        answer: "\\(\\dfrac{10}{21}\\)",
      },
      selfCheckExample: {
        prompt:
          "An urn contains 4 white and 6 black balls. Two balls are drawn at random. What is the probability that both are black?",
        steps: [
          "Total: \\(\\binom{10}{2} = 45\\).",
          "Favourable (both black): \\(\\binom{6}{2} = 15\\).",
          "Divide: \\(P = \\dfrac{15}{45} = \\dfrac{1}{3}\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "\\(\\binom{5}{2} = ?\\)", answer: "\\(10\\)" },
        { prompt: "Choose 2 from 6 — total ways?", answer: "\\(15\\)", method: "\\(\\binom{6}{2}\\)" },
        { prompt: "Bag of 3 red, 2 green; draw 2. \\(P(\\text{both red})\\)?", answer: "\\(\\dfrac{3}{10}\\)", method: "\\(\\binom{3}{2}/\\binom{5}{2}\\)" },
        { prompt: "From 5 people, a 2-person committee is chosen. \\(P(\\text{2 specified people})\\)?", answer: "\\(\\dfrac{1}{10}\\)", method: "\\(1/\\binom{5}{2}\\)" },
      ],
      pyqExampleId: "6f767ca5-0587-40f8-bf2e-63eff43a2f7c",
      traps: [
        {
          title: "\"Drawn together / selected at random\" means order does NOT matter — use \\(\\binom{n}{r}\\), not permutations",
          body:
            "If you accidentally use \\({}^{n}P_r\\) (ordered) in both numerator and denominator the ratio often still works, but mixing one ordered count with one unordered count gives the wrong answer. Keep both counts unordered.",
        },
        {
          title: "\"At least one of a type\" is fastest via the complement",
          body:
            "\\(P(\\text{at least one red}) = 1 - P(\\text{no red}) = 1 - \\dfrac{\\binom{b}{r}}{\\binom{a+b}{r}}\\). Summing exactly-one, exactly-two, … wastes time.",
        },
      ],
    },

    // 5 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "probability-with-dice",
      name: "Probability with dice",
      visualizationSlug: "dice-sum-grid",
      intuition:
        "Two dice produce \\(36\\) equally-likely ordered outcomes \\((1,1)\\) through \\((6,6)\\). " +
        "Most dice questions are just \"count the \\((a,b)\\) pairs that satisfy the condition, divide by 36\". " +
        "A \\(6 \\times 6\\) grid of pairs is the fastest way to count sums and differences.",
      definition:
        "- **One die:** \\(S=\\{1,\\dots,6\\}\\), \\(n(S)=6\\).\n" +
        "- **Two dice:** \\(n(S)=6^2=36\\) ordered pairs; the sum ranges \\(2\\) to \\(12\\) with \\(7\\) the most likely (6 ways).\n" +
        "- **\\(k\\) dice:** \\(n(S)=6^k\\).\n" +
        "- **Non-standard or loaded die** (faces repeated, or weighted) no longer has equally likely faces — weight each face by its own probability rather than using \\(n(E)/6\\).",
      formula: {
        label: "Two-dice sample space",
        latex:
          "n(S) = 6^2 = 36, \\qquad P(\\text{sum}=7) = \\dfrac{6}{36} = \\dfrac{1}{6}",
        symbols: [
          { symbol: "\\((a,b)\\)", meaning: "ordered pair: \\(a\\) on the first die, \\(b\\) on the second" },
        ],
      },
      authoredExample: {
        prompt:
          "Two fair dice are thrown. What is the probability that the sum of the numbers is 9 or more?",
        steps: [
          "Total outcomes: \\(36\\).",
          "Count pairs by sum: sum \\(9\\): 4 ways; sum \\(10\\): 3; sum \\(11\\): 2; sum \\(12\\): 1. Total \\(= 10\\).",
          "Divide: \\(P = \\dfrac{10}{36} = \\dfrac{5}{18}\\).",
        ],
        answer: "\\(\\dfrac{5}{18}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two fair dice are thrown. What is the probability that the sum is a multiple of 4?",
        steps: [
          "Multiples of 4 in range \\(2\\)–\\(12\\): sums \\(4, 8, 12\\).",
          "Count pairs: sum \\(4\\): 3 ways; sum \\(8\\): 5; sum \\(12\\): 1. Total \\(= 9\\).",
          "Divide: \\(P = \\dfrac{9}{36} = \\dfrac{1}{4}\\).",
        ],
        answer: "\\(\\dfrac{1}{4}\\)",
      },
      practiceSet: [
        { prompt: "\\(n(S)\\) for two dice?", answer: "\\(36\\)" },
        { prompt: "\\(P(\\text{sum}=7)\\) with two dice?", answer: "\\(\\dfrac{1}{6}\\)", method: "\\(6/36\\)" },
        { prompt: "\\(P(\\text{a doublet})\\) with two dice?", answer: "\\(\\dfrac{1}{6}\\)", method: "\\(6/36\\)" },
        { prompt: "\\(P(\\text{sum}=12)\\) with two dice?", answer: "\\(\\dfrac{1}{36}\\)" },
      ],
      pyqExampleId: "711f2a02-ef39-4c5f-b9df-06ade1921ac6",
      traps: [
        {
          title: "Two-dice outcomes are ORDERED pairs: \\((2,3)\\) and \\((3,2)\\) are different",
          body:
            "The sample space has \\(36\\) outcomes, not \\(21\\). Counting unordered pairs undercounts every non-doublet event by a factor of two.",
        },
        {
          title: "Loaded or non-standard dice: faces are NOT equally likely",
          body:
            "If a die has two faces showing 4, or even faces are twice as likely as odd, you cannot use \\(n(E)/36\\). Assign each face its probability first, then add up the favourable outcomes' probabilities.",
        },
      ],
    },

    // 6 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "probability-with-coins",
      name: "Probability with coins",
      visualizationSlug: "coin-toss-tree",
      intuition:
        "Tossing a fair coin \\(n\\) times gives \\(2^n\\) equally-likely ordered sequences. " +
        "For a biased coin with \\(P(\\text{head})=p\\), multiply \\(p\\) and \\(1-p\\) along the sequence. " +
        "\"At least one head\" is almost always fastest through the complement.",
      definition:
        "- **Fair coin, \\(n\\) tosses:** \\(n(S)=2^n\\), every sequence equally likely; exactly \\(k\\) heads occurs in \\(\\binom{n}{k}\\) of them.\n" +
        "- **Biased coin, \\(P(H)=p\\):** a specific sequence with \\(h\\) heads and \\(t\\) tails has probability \\(p^{h}(1-p)^{t}\\).\n" +
        "- **At least one head** in \\(n\\) fair tosses: \\(1-\\left(\\tfrac{1}{2}\\right)^{n}\\).",
      formula: {
        label: "Coin tosses",
        latex:
          "n(S)=2^{n}, \\qquad P(\\text{at least one head in } n) = 1 - \\left(\\tfrac{1}{2}\\right)^{n}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of tosses" },
          { symbol: "\\(p\\)", meaning: "probability of a head on one toss (\\(\\tfrac{1}{2}\\) if fair)" },
        ],
      },
      authoredExample: {
        prompt:
          "A fair coin is tossed 3 times. What is the probability of getting at least one head?",
        steps: [
          "Total sequences: \\(2^3 = 8\\).",
          "Complement \"no head\" is the single sequence \\(TTT\\): \\(P(\\text{no head}) = \\dfrac{1}{8}\\).",
          "So \\(P(\\text{at least one head}) = 1 - \\dfrac{1}{8} = \\dfrac{7}{8}\\).",
        ],
        answer: "\\(\\dfrac{7}{8}\\)",
      },
      selfCheckExample: {
        prompt:
          "A fair coin is tossed 4 times. What is the probability of getting exactly two heads?",
        steps: [
          "Total sequences: \\(2^4 = 16\\).",
          "Exactly two heads occurs in \\(\\binom{4}{2} = 6\\) sequences.",
          "Divide: \\(P = \\dfrac{6}{16} = \\dfrac{3}{8}\\).",
        ],
        answer: "\\(\\dfrac{3}{8}\\)",
      },
      practiceSet: [
        { prompt: "\\(n(S)\\) for 3 coin tosses?", answer: "\\(8\\)", method: "\\(2^3\\)" },
        { prompt: "Fair coin, 3 tosses: \\(P(\\text{all heads})\\)?", answer: "\\(\\dfrac{1}{8}\\)" },
        { prompt: "Fair coin, 2 tosses: \\(P(\\text{at least one tail})\\)?", answer: "\\(\\dfrac{3}{4}\\)", method: "\\(1-\\tfrac{1}{4}\\)" },
        { prompt: "Biased coin \\(P(H)=\\tfrac{1}{3}\\): \\(P(HH)\\) in 2 tosses?", answer: "\\(\\dfrac{1}{9}\\)", method: "\\(p^2\\)" },
      ],
      pyqExampleId: "cca686a8-b337-4350-9355-f496107f3983",
      traps: [
        {
          title: "Sequences are ordered: \\(HT \\ne TH\\)",
          body:
            "Count the \\(2^n\\) ordered sequences, not the \\(n+1\\) \"number of heads\" buckets — those buckets are not equally likely (\"exactly 1 head in 2 tosses\" has 2 sequences, \"2 heads\" has 1).",
        },
        {
          title: "Biased coin: do not use \\(2^n\\) equally-likely counting",
          body:
            "When \\(P(H) \\ne \\tfrac{1}{2}\\), each sequence has its own probability \\(p^{h}(1-p)^{t}\\). Counting outcomes and dividing by \\(2^n\\) is only valid for a fair coin.",
        },
      ],
    },

    // 7 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "probability-with-arrangements",
      name: "Probability with arrangements",
      intuition:
        "When people or letters are arranged in a row \"at random\", the total is \\(n!\\) arrangements (divided by factorials for repeats). " +
        "For \"\\(X\\) and \\(Y\\) together\", glue them into a single block. Probability is favourable arrangements over total arrangements.",
      definition:
        "Total arrangements of \\(n\\) distinct objects: \\(n!\\). For two specified objects to be **together**, treat them as one block: that block plus the other \\(n-2\\) objects is \\((n-1)!\\) arrangements, times \\(2!\\) for the block's internal order. " +
        "So \\(P(\\text{two specified together}) = \\dfrac{2\\,(n-1)!}{n!} = \\dfrac{2}{n}\\). " +
        "With repeated letters, divide \\(n!\\) by the factorial of each repeat count.",
      formula: {
        label: "Arrangement probability (two together)",
        latex:
          "P(\\text{two specified together}) = \\dfrac{2\\,(n-1)!}{n!} = \\dfrac{2}{n}",
        symbols: [
          { symbol: "\\(n\\)", meaning: "number of objects being arranged" },
          { symbol: "\\(2\\,(n-1)!\\)", meaning: "favourable: glue the pair (\\((n-1)!\\)) and order them internally (\\(2!\\))" },
        ],
      },
      authoredExample: {
        prompt:
          "Five people sit in a row at random. What is the probability that two particular people, A and B, sit together?",
        steps: [
          "Total arrangements: \\(5! = 120\\).",
          "Glue A and B into one block: the block plus 3 others give \\(4!\\) arrangements, and the block can be \\(AB\\) or \\(BA\\): favourable \\(= 2 \\times 4! = 48\\).",
          "Divide: \\(P = \\dfrac{48}{120} = \\dfrac{2}{5}\\). (Matches \\(\\tfrac{2}{n}=\\tfrac{2}{5}\\).)",
        ],
        answer: "\\(\\dfrac{2}{5}\\)",
      },
      selfCheckExample: {
        prompt:
          "The letters of the word DELHI are arranged at random. What is the probability that the two vowels E and I are together?",
        steps: [
          "All 5 letters are distinct, so total \\(= 5! = 120\\).",
          "Glue E and I: \\(2 \\times 4! = 48\\) favourable.",
          "Divide: \\(P = \\dfrac{48}{120} = \\dfrac{2}{5}\\).",
        ],
        answer: "\\(\\dfrac{2}{5}\\)",
      },
      practiceSet: [
        { prompt: "Total arrangements of 4 distinct people?", answer: "\\(24\\)", method: "\\(4!\\)" },
        { prompt: "4 people in a row: \\(P(\\text{A, B together})\\)?", answer: "\\(\\dfrac{1}{2}\\)", method: "\\(2/4\\)" },
        { prompt: "Number of arrangements of the letters in BOOK?", answer: "\\(12\\)", method: "\\(4!/2!\\)" },
        { prompt: "6 people in a row: \\(P(\\text{A, B together})\\)?", answer: "\\(\\dfrac{1}{3}\\)", method: "\\(2/6\\)" },
      ],
      pyqExampleId: "e1537b28-cd2b-479b-b465-68153b671c46",
      traps: [
        {
          title: "\"Together\" = glue into a block, then multiply by the block's internal arrangements",
          body:
            "Forgetting the \\(2!\\) for the order within the pair halves the favourable count. For a block of \\(k\\) people the internal factor is \\(k!\\).",
        },
        {
          title: "Repeated letters divide the total by the factorial of each repeat count",
          body:
            "The arrangements of TIRUPATI use \\(\\dfrac{8!}{2!\\,2!}\\) (two T's, two I's), not \\(8!\\). Forgetting this inflates both counts unequally and breaks the ratio.",
        },
      ],
    },

    // 8 ───────────────────────────────────────────────────────────────────────
    {
      kind: "formula" as const,
      slug: "selecting-numbers",
      name: "Choosing numbers with a property",
      intuition:
        "Many PYQs choose a number (or a few numbers) at random from a finite set and ask the probability it has some property — consecutive, a multiple, satisfies an inequality. " +
        "The recipe is unchanged: count the elements with the property, divide by the size of the set (or use \\(\\binom{n}{r}\\) when several are chosen at once).",
      definition:
        "A number chosen at random from \\(\\{1,\\dots,n\\}\\): \\(P = \\dfrac{\\#\\{x \\text{ with the property}\\}}{n}\\). " +
        "When several numbers are chosen together, the denominator becomes \\(\\binom{n}{r}\\). " +
        "Useful counts: multiples of \\(d\\) in \\(\\{1,\\dots,n\\}\\) number \\(\\lfloor n/d\\rfloor\\); consecutive triples among \\(1,\\dots,N\\) number \\(N-2\\).",
      formula: {
        label: "Counting favourable numbers",
        latex:
          "P = \\dfrac{\\#\\{x : x \\text{ has the property}\\}}{n}",
        symbols: [
          { symbol: "\\(\\lfloor n/d\\rfloor\\)", meaning: "how many of \\(1,\\dots,n\\) are multiples of \\(d\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "A number is chosen at random from 1 to 20. What is the probability that it is a multiple of 3 or a multiple of 5?",
        steps: [
          "Multiples of 3 up to 20: \\(\\lfloor 20/3\\rfloor = 6\\). Multiples of 5: \\(\\lfloor 20/5\\rfloor = 4\\).",
          "Multiples of both (i.e. of 15): \\(\\lfloor 20/15\\rfloor = 1\\). By inclusion-exclusion, favourable \\(= 6 + 4 - 1 = 9\\).",
          "Divide: \\(P = \\dfrac{9}{20}\\).",
        ],
        answer: "\\(\\dfrac{9}{20}\\)",
      },
      selfCheckExample: {
        prompt:
          "A number is chosen at random from the first 30 natural numbers. What is the probability that it is divisible by 4?",
        steps: [
          "Multiples of 4 up to 30: \\(\\lfloor 30/4\\rfloor = 7\\) (namely \\(4,8,\\dots,28\\)).",
          "Divide: \\(P = \\dfrac{7}{30}\\).",
        ],
        answer: "\\(\\dfrac{7}{30}\\)",
      },
      practiceSet: [
        { prompt: "From \\(1\\)–\\(10\\), \\(P(\\text{prime})\\)?", answer: "\\(\\dfrac{2}{5}\\)", method: "primes \\(\\{2,3,5,7\\}\\), \\(4/10\\)" },
        { prompt: "From \\(1\\)–\\(20\\), \\(P(\\text{multiple of 5})\\)?", answer: "\\(\\dfrac{1}{5}\\)", method: "\\(4/20\\)" },
        { prompt: "Consecutive triples among \\(1,\\dots,10\\) — how many?", answer: "\\(8\\)", method: "\\(N-2\\)" },
        { prompt: "From \\(1\\)–\\(50\\), \\(P(\\text{divisible by 10})\\)?", answer: "\\(\\dfrac{1}{10}\\)", method: "\\(5/50\\)" },
      ],
      pyqExampleId: "e67d4760-5b1b-408a-9ec4-c16f5fcd437f",
      traps: [
        {
          title: "\"Or\" on number properties needs inclusion-exclusion",
          body:
            "\\(P(\\text{mult of 3 or 5}) = P(3) + P(5) - P(15)\\). Forgetting to subtract the overlap (multiples of both) double-counts and overstates the probability.",
        },
        {
          title: "Several numbers chosen at once: denominator is \\(\\binom{n}{r}\\), not \\(n\\)",
          body:
            "\"Three numbers chosen from 1 to 10\" has \\(\\binom{10}{3}=120\\) outcomes. Only use \\(n\\) in the denominator when exactly one number is picked.",
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
