import type { SubtopicNote } from "@/app/notes/_types";

export const CONDITIONAL_BAYES_NOTE: SubtopicNote = {
  subtopicName: "Conditional Probability, Independence and Bayes' Theorem",
  title: "Conditional Probability, Independence and Bayes' Theorem",
  oneLineDefinition:
    "Restrict the sample space to compute P(A|B), chain events with the multiplication rule, exploit independence for 'at least one / exactly one' shortcuts, and reverse the conditioning with total probability and Bayes' theorem.",
  whyItMatters:
    "This is the densest subtopic in the chapter: 23 PYQs sit here (4 HARD, 15 MODERATE, 4 EASY). MHT-CET tests the whole conditional-probability chain — the definition P(A|B) = P(A∩B)/P(B), sequential draws without replacement, the independence identity P(A∩B) = P(A)P(B), the 1 − P(none) shortcut for 'the target is hit / the problem is solved', and Bayes' theorem for bag/box/disease posteriors. " +
    "The recurring traps are all here too: confusing 'exactly one' with 'at least one', forgetting P(A'|B) = P(A') only when A and B are independent, and swapping priors with likelihoods in the Bayes ratio.",
  concepts: [
    // 0 — foundation: conditional probability P(A|B) (no PYQ, lint-exempt)
    {
      kind: "formula" as const,
      slug: "cetpd-conditional-definition",
      name: "Conditional Probability — Restricting the Sample Space",
      intuition:
        "Once you are told that event B has happened, B becomes your new, smaller universe. The conditional probability P(A|B) asks: within that shrunken world of B-outcomes, what fraction also lie in A? You are simply re-measuring A's chance against B instead of against the whole sample space.",
      definition:
        "For events A and B with \\(P(B) > 0\\), the **conditional probability** of A given B is\n" +
        "- \\(P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}\\) — the share of B's probability that also lies in A.\n" +
        "- Equivalently, rearranged, \\(P(A\\cap B) = P(B)\\,P(A\\mid B) = P(A)\\,P(B\\mid A)\\) — the **multiplication rule**.\n" +
        "- When outcomes are equally likely, this reduces to counting: \\(P(A\\mid B) = \\dfrac{n(A\\cap B)}{n(B)}\\).",
      formula: {
        label: "Definition of conditional probability",
        latex:
          "P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)},\\qquad P(B) > 0",
        symbols: [
          { symbol: "\\(P(A\\cap B)\\)", meaning: "probability that both A and B occur" },
          { symbol: "P(B)", meaning: "probability of the conditioning (given) event — the new universe" },
          { symbol: "\\(P(A\\mid B)\\)", meaning: "probability of A once B is known to have occurred" },
        ],
      },
      visualizationSlug: "conditional-restrict",
      authoredExample: {
        prompt:
          "A fair die is rolled. Given that the outcome is even, find the probability that it is greater than 3.",
        steps: [
          "Conditioning event \\(B = \\{2,4,6\\}\\), so \\(P(B) = \\tfrac36 = \\tfrac12\\).",
          "Event \\(A = \\{4,5,6\\}\\); the overlap \\(A\\cap B = \\{4,6\\}\\), so \\(P(A\\cap B) = \\tfrac26 = \\tfrac13\\).",
          "Restrict: \\(P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)} = \\dfrac{1/3}{1/2} = \\dfrac{2}{3}\\).",
          "Check by counting inside B: of the three even outcomes \\(\\{2,4,6\\}\\), two exceed 3, giving \\(\\tfrac23\\).",
        ],
        answer: "\\(P(A\\mid B) = \\dfrac{2}{3}\\)",
      },
      traps: [
        {
          title: "P(A|B) and P(B|A) are not the same number",
          body:
            "The condition goes in the denominator: \\(P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}\\) divides by \\(P(B)\\), while \\(P(B\\mid A) = \\dfrac{P(A\\cap B)}{P(A)}\\) divides by \\(P(A)\\). The numerator \\(P(A\\cap B)\\) is shared, but swapping which event you condition on gives a different answer unless \\(P(A)=P(B)\\).",
        },
        {
          title: "Divide by the GIVEN event's probability, not by 1",
          body:
            "A conditional probability is measured against the reduced universe B, so \\(P(A\\mid B)\\) can be much larger than \\(P(A)\\). Forgetting to divide by \\(P(B)\\) — reporting just \\(P(A\\cap B)\\) — is the most common conditional-probability slip.",
        },
      ],
    },

    // 1 — multiplication rule & sequential draws without replacement (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-multiplication-sequential",
      name: "Multiplication Rule and Sequential Draws Without Replacement",
      intuition:
        "When events happen in sequence — draw a ticket, then another, then another — chain them with the multiplication rule, updating the pool after every draw. Each factor is the conditional probability given everything drawn so far. If the draws come from separate independent sources (one ball from each of several urns), the factors just multiply and no updating is needed.",
      definition:
        "The **general multiplication rule** for a chain of events:\n" +
        "- \\(P(E_1\\cap E_2\\cap E_3) = P(E_1)\\,P(E_2\\mid E_1)\\,P(E_3\\mid E_1\\cap E_2)\\).\n" +
        "- **Without replacement:** after each draw the counts shrink, so denominators drop by 1 and the relevant numerator drops by 1 as well. Drawing tickets one at a time is exactly this.\n" +
        "- **One item from each of several independent sources:** the joint probability is just the product of each source's single-draw probability; add over all the ways a target composition can occur.",
      formula: {
        label: "Chain rule for a sequence of dependent draws",
        latex:
          "P(E_1\\cap E_2\\cap E_3) = P(E_1)\\,P(E_2\\mid E_1)\\,P(E_3\\mid E_1\\cap E_2)",
      },
      visualizationSlug: "probability-tree",
      authoredExample: {
        prompt:
          "A box has 4 red and 3 green tickets. Three tickets are drawn one at a time without replacement. Find the probability that they come out in the order red, green, red.",
        steps: [
          "First draw red: \\(\\dfrac{4}{7}\\).",
          "Given a red is gone, draw green: \\(\\dfrac{3}{6}\\) (6 tickets left, 3 green).",
          "Given red and green gone, draw red: \\(\\dfrac{3}{5}\\) (5 left, 3 red remain).",
          "Multiply the chain: \\(\\dfrac{4}{7}\\cdot\\dfrac{3}{6}\\cdot\\dfrac{3}{5} = \\dfrac{36}{210} = \\dfrac{6}{35}\\).",
        ],
        answer: "\\(P(\\text{R, G, R}) = \\dfrac{6}{35}\\)",
      },
      selfCheckExample: {
        prompt:
          "A box contains 9 tickets numbered 1 to 9. Three tickets are drawn one at a time without replacement. Find the probability that they come out alternately as odd, even, odd.",
        steps: [
          "Odd numbers: 5 (namely 1,3,5,7,9); even numbers: 4 (namely 2,4,6,8).",
          "First odd: \\(\\dfrac{5}{9}\\); then even: \\(\\dfrac{4}{8}\\); then odd (one odd already used): \\(\\dfrac{4}{7}\\).",
          "Multiply: \\(\\dfrac{5}{9}\\cdot\\dfrac{4}{8}\\cdot\\dfrac{4}{7} = \\dfrac{80}{504}\\).",
          "Simplify: \\(\\dfrac{80}{504} = \\dfrac{10}{63}\\).",
        ],
        answer: "\\(P(\\text{O, E, O}) = \\dfrac{10}{63}\\)",
      },
      practiceSet: [
        { prompt: "From 5 red and 3 blue balls, two are drawn without replacement. Probability both red?", answer: "\\(\\dfrac{5}{8}\\cdot\\dfrac{4}{7} = \\dfrac{5}{14}\\)", method: "chain: update after first draw" },
        { prompt: "Urn 1 has 2 white of 5; Urn 2 has 3 white of 5. Draw one from each — probability both white?", answer: "\\(\\dfrac{2}{5}\\cdot\\dfrac{3}{5} = \\dfrac{6}{25}\\)", method: "independent sources multiply" },
        { prompt: "9 tickets 1–9, draw 3 without replacement. P(even, odd, even)?", answer: "\\(\\dfrac{4}{9}\\cdot\\dfrac{5}{8}\\cdot\\dfrac{3}{7} = \\dfrac{60}{504} = \\dfrac{5}{42}\\)", method: "4 even, 5 odd; update pool" },
        { prompt: "In a chain of dependent draws, what does the third factor condition on?", answer: "The first two draws combined", method: "\\(P(E_3\\mid E_1\\cap E_2)\\)" },
      ],
      pyqExampleId: "785ee11c-df21-4e20-9c53-3ecbf466fbc3", // 3 urns, one ball from each, P(1 black 2 white) = 37/125
      traps: [
        {
          title: "Without replacement: shrink BOTH the numerator and the denominator",
          body:
            "After drawing an odd ticket from 9, the next 'another odd' probability is \\(\\dfrac{4}{8}\\) (one fewer odd, one fewer total) — not \\(\\dfrac{5}{8}\\). Freezing the count at its original value is the classic sequential-draw error.",
        },
        {
          title: "Add over all favourable orderings for a composition",
          body:
            "For '1 black and 2 white, one ball from each of three urns', the black can come from urn 1, 2, or 3 — so sum the three products \\(P(B_1W_2W_3)+P(W_1B_2W_3)+P(W_1W_2B_3)\\). Computing only one ordering undercounts.",
        },
        {
          title: "'Alternately O,E,O OR E,O,E' means add both patterns",
          body:
            "Two disjoint arrangements satisfy the requirement, so compute each chain separately and add: \\(P(\\text{O,E,O}) + P(\\text{E,O,E})\\). Treating it as a single pattern halves the answer.",
        },
      ],
    },

    // 2 — conditional probability computed by restriction / counting (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-conditional-computed",
      name: "Computing P(A|B) by Restriction — Distributions, Counting and Composite Events",
      intuition:
        "Many MHT-CET conditional questions are just the definition applied carefully: build the conditioning event B, find the overlap A∩B, and divide. B may be a range of a random variable, a family of tickets sharing a property, or a birth-order event. The whole skill is identifying A∩B correctly and dividing by P(B), never by the full sample space.",
      definition:
        "Apply \\(P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)}\\) to composite events:\n" +
        "- **Distribution table:** \\(P(a\\le X<b\\mid X\\le c)\\) is the sum of the P(X) values in the numerator range that also satisfy \\(X\\le c\\), divided by \\(P(X\\le c)\\).\n" +
        "- **'At least one' condition:** for family/coin problems, \\(P(\\text{all girls}\\mid \\text{at least one girl}) = \\dfrac{P(\\text{all girls})}{P(\\text{at least one girl})}\\), and 'at least one' is best found as \\(1 - P(\\text{none})\\).\n" +
        "- **Counting-based:** \\(P(A\\mid B) = \\dfrac{n(A\\cap B)}{n(B)}\\) — list the outcomes in B, then count how many also lie in A.",
      formula: {
        label: "Restriction form for composite conditioning",
        latex:
          "P(A\\mid B) = \\dfrac{P(A\\cap B)}{P(B)} = \\dfrac{n(A\\cap B)}{n(B)}\\ \\text{(equally likely)}",
      },
      authoredExample: {
        prompt:
          "A random variable X takes values 0,1,2,3 with P(X) equal to \\(2k, 3k, 4k, 6k\\) respectively. Find \\(P(X\\ge 2\\mid X\\ge 1)\\).",
        steps: [
          "Total probability is 1: \\(2k+3k+4k+6k = 15k = 1\\), so \\(k = \\tfrac{1}{15}\\) (not needed as k cancels).",
          "Numerator \\(P(X\\ge 2\\cap X\\ge 1) = P(X\\ge 2) = P(2)+P(3) = 4k+6k = 10k\\).",
          "Denominator \\(P(X\\ge 1) = 3k+4k+6k = 13k\\).",
          "Divide: \\(\\dfrac{10k}{13k} = \\dfrac{10}{13}\\).",
        ],
        answer: "\\(P(X\\ge 2\\mid X\\ge 1) = \\dfrac{10}{13}\\)",
      },
      selfCheckExample: {
        prompt:
          "A family has 3 children. Find the probability that all three are girls, given that at least one of them is a girl.",
        steps: [
          "Sample space of 8 equally likely birth orders; \\(P(\\text{at least one girl}) = 1 - P(\\text{all boys}) = 1 - \\tfrac18 = \\tfrac78\\).",
          "\\(P(\\text{all girls}\\cap\\text{at least one girl}) = P(GGG) = \\tfrac18\\).",
          "Divide: \\(P = \\dfrac{1/8}{7/8} = \\dfrac{1}{7}\\).",
        ],
        answer: "\\(P(\\text{all girls}\\mid\\text{at least one girl}) = \\dfrac{1}{7}\\)",
      },
      practiceSet: [
        { prompt: "For X with P(X=1)=2k, P(X=2)=4k, P(X=0)=k, find P(1≤X≤2 | X≤2).", answer: "\\(\\dfrac{2k+4k}{k+2k+4k} = \\dfrac{6}{7}\\)", method: "numerator range ∩ condition, over P(condition)" },
        { prompt: "A die is rolled. P(prime | odd)?", answer: "Odd = {1,3,5}; primes among them {3,5}; \\(\\dfrac{2}{3}\\)", method: "count inside the condition" },
        { prompt: "'At least one girl' in 3 children — probability?", answer: "\\(1 - \\tfrac18 = \\tfrac78\\)", method: "1 − P(all boys)" },
        { prompt: "Given digit-sum 8 among tickets 00–49, how many tickets qualify?", answer: "5 tickets: 08, 17, 26, 35, 44", method: "list systematically" },
      ],
      pyqExampleId: "3a6ad7e9-04ff-43d2-8483-88eb8bbb8c3d", // distribution table, P(1≤X<4 | X≤2) = 6/7
      traps: [
        {
          title: "The overlap A∩B is measured inside B, not over the whole space",
          body:
            "For \\(P(1\\le X<4\\mid X\\le 2)\\) the numerator is only \\(P(X=1)+P(X=2)\\) — the values that satisfy BOTH conditions (\\(X=3\\) is excluded by \\(X\\le 2\\)). Summing the full range \\(1\\le X<4\\) in the numerator over-counts.",
        },
        {
          title: "Compute 'at least one' as the complement",
          body:
            "\\(P(\\text{at least one girl})\\) in 3 children is \\(1 - P(\\text{no girls}) = 1 - \\tfrac18 = \\tfrac78\\), not \\(\\tfrac38\\) (that is exactly-one) and not \\(\\tfrac12\\). The at-least-one event is large; its complement 'none' is the single easy case.",
        },
        {
          title: "Watch for a 'None of these' answer when your value is not listed",
          body:
            "A carefully computed conditional probability may not appear among the four numeric options; MHT-CET occasionally makes the correct choice 'None of these'. Recount the conditioning set before assuming an arithmetic slip.",
        },
      ],
    },

    // 3 — independence & event algebra with unions (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-independence-union-algebra",
      name: "Independence and Event Algebra with Unions",
      intuition:
        "Two events are independent when knowing one occurred does not change the other's probability — formally P(A∩B) = P(A)P(B). This single identity powers a whole family of algebra problems: given a union probability and one event, solve for the other; combine complements; or evaluate P(A'|B), which collapses to P(A') when A and B are independent. Odds 'in favour a:b' convert to probability a/(a+b) first.",
      definition:
        "The **independence identity** and its consequences:\n" +
        "- \\(P(A\\cap B) = P(A)\\,P(B)\\) (definition); then \\(P(A\\cup B) = P(A)+P(B)-P(A)P(B)\\).\n" +
        "- If A, B are independent, so are the pairs \\((A',B)\\), \\((A,B')\\), \\((A',B')\\); hence \\(P(A'\\mid B) = P(A')\\) and \\(P(B'\\mid A') = P(B')\\).\n" +
        "- **Odds:** 'odds in favour \\(a:b\\)' means \\(P = \\dfrac{a}{a+b}\\); 'odds against \\(a:b\\)' means \\(P = \\dfrac{b}{a+b}\\).\n" +
        "- The complement-conditional sum \\(P(A'\\mid B') + P(B'\\mid A') = \\dfrac{P(A'\\cap B')}{P(B')} + \\dfrac{P(A'\\cap B')}{P(A')}\\), using \\(P(A'\\cap B') = 1 - P(A\\cup B)\\).",
      formula: {
        label: "Independence and the union it produces",
        latex:
          "P(A\\cap B) = P(A)\\,P(B),\\qquad P(A\\cup B) = P(A)+P(B)-P(A)\\,P(B)",
        symbols: [
          { symbol: "P(A)P(B)", meaning: "the product form — holds ONLY for independent A, B" },
          { symbol: "\\(P(A'\\mid B)\\)", meaning: "equals P(A') when A, B are independent" },
        ],
      },
      visualizationSlug: "exclusive-vs-independent",
      authoredExample: {
        prompt:
          "A and B are independent events with \\(P(A) = \\tfrac13\\) and \\(P(A\\cup B) = \\tfrac35\\). Find \\(P(B)\\).",
        steps: [
          "Independence: \\(P(A\\cup B) = P(A) + P(B) - P(A)P(B)\\).",
          "Substitute: \\(\\tfrac35 = \\tfrac13 + P(B) - \\tfrac13 P(B) = \\tfrac13 + \\tfrac23 P(B)\\).",
          "So \\(\\tfrac23 P(B) = \\tfrac35 - \\tfrac13 = \\tfrac{9-5}{15} = \\tfrac{4}{15}\\).",
          "Hence \\(P(B) = \\tfrac{4}{15}\\cdot\\tfrac32 = \\tfrac{2}{5}\\).",
        ],
        answer: "\\(P(B) = \\dfrac{2}{5}\\)",
      },
      selfCheckExample: {
        prompt:
          "A and B are independent events with \\(P(A) = \\tfrac{3}{10}\\) and \\(P(B) = \\tfrac{2}{5}\\). Find \\(P(A'\\cup B)\\).",
        steps: [
          "\\(P(A') = 1 - \\tfrac{3}{10} = \\tfrac{7}{10}\\); \\(A'\\) and \\(B\\) are also independent.",
          "\\(P(A'\\cup B) = P(A') + P(B) - P(A')P(B) = \\tfrac{7}{10} + \\tfrac{2}{5} - \\tfrac{7}{10}\\cdot\\tfrac{2}{5}\\).",
          "\\(= \\tfrac{7}{10} + \\tfrac{4}{10} - \\tfrac{14}{50} = \\tfrac{55}{50} - \\tfrac{14}{50} = \\tfrac{41}{50}\\).",
        ],
        answer: "\\(P(A'\\cup B) = \\dfrac{41}{50}\\)",
      },
      practiceSet: [
        { prompt: "A, B independent, P(A)=1/4, P(B)=2/5. Find P(A∩B).", answer: "\\(\\tfrac14\\cdot\\tfrac25 = \\tfrac{1}{10}\\)", method: "product form" },
        { prompt: "Odds in favour of an event are 2:5. Find its probability.", answer: "\\(\\dfrac{2}{2+5} = \\dfrac{2}{7}\\)", method: "a/(a+b)" },
        { prompt: "A, B independent. Simplify P(A'|B).", answer: "\\(P(A')\\)", method: "independence: conditioning on B doesn't change A'" },
        { prompt: "If P(A∪B)=1/3, find P(A'∩B').", answer: "\\(1 - \\tfrac13 = \\tfrac23\\)", method: "De Morgan: A'∩B' = (A∪B)'" },
        { prompt: "P(A')=0.75, so P(A)=?", answer: "0.25", method: "complement" },
      ],
      pyqExampleId: "a83603f5-4683-4198-b6b4-2d65558d3f5c", // independent, P(B)=2/5, P(A∪B)=11/20 → P(A'|B)=3/4 is a root of 4x²−7x+3=0
      traps: [
        {
          title: "P(A'|B) = P(A') needs INDEPENDENCE",
          body:
            "For independent A and B, \\(P(A'\\mid B) = P(A')\\) — so if \\(P(A) = \\tfrac14\\) then \\(P(A'\\mid B) = \\tfrac34\\). This collapse is FALSE for dependent events; there you must use \\(P(A'\\mid B) = \\dfrac{P(A'\\cap B)}{P(B)}\\).",
        },
        {
          title: "The union formula loses its cross-term only when independent",
          body:
            "\\(P(A\\cup B) = P(A) + P(B) - P(A\\cap B)\\) always holds; replacing \\(P(A\\cap B)\\) by \\(P(A)P(B)\\) is legal ONLY under independence. Do not use the product form for mutually exclusive or unspecified events.",
        },
        {
          title: "Convert odds to probability before plugging in",
          body:
            "'Odds in favour \\(a:b\\)' is \\(P = \\dfrac{a}{a+b}\\), not \\(\\dfrac{a}{b}\\). Odds \\(2:5\\) give \\(P = \\tfrac27\\); using \\(\\tfrac25\\) is the standard odds-vs-fraction mistake in ship/selection problems.",
        },
        {
          title: "Independent is not the same as mutually exclusive",
          body:
            "Mutually exclusive means \\(P(A\\cap B) = 0\\); independent means \\(P(A\\cap B) = P(A)P(B)\\). Two events with nonzero probabilities cannot be both — if they never co-occur, knowing one occurred forces the other out, which is maximal dependence.",
        },
      ],
    },

    // 4 — at-least-one and exactly-one for independent trials (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-at-least-one-exactly-one",
      name: "At Least One and Exactly One for Independent Trials",
      intuition:
        "'The problem is solved' or 'the target is hit' means at least one of several independent attempts succeeds — always compute this as 1 minus the probability that they ALL fail. 'Exactly one is selected' is different: sum the products where one succeeds and the rest fail. Getting these two apart is the single most-tested distinction in this subtopic.",
      definition:
        "For independent events \\(A_1,\\dots,A_n\\) with success probabilities \\(p_i\\):\n" +
        "- **At least one succeeds:** \\(P(\\text{at least one}) = 1 - \\prod_i (1-p_i)\\) — one minus 'all fail'.\n" +
        "- **Exactly one (of two):** \\(P = P(A)P(B') + P(A')P(B)\\).\n" +
        "- **A composite pattern** like 'hit by P or Q but not R' is a sum of the independent triple-products matching that description, e.g. \\(P Q' R' + P' Q R' + P Q R'\\) (all with R failing).",
      formula: {
        label: "At-least-one and exactly-one",
        latex:
          "P(\\text{at least one}) = 1 - \\prod_{i}(1-p_i),\\qquad P(\\text{exactly one of }A,B) = P(A)P(B') + P(A')P(B)",
      },
      visualizationSlug: "coin-toss-tree",
      authoredExample: {
        prompt:
          "Three shooters hit a target independently with probabilities \\(\\tfrac13, \\tfrac14, \\tfrac15\\). Find the probability that the target is hit.",
        steps: [
          "'Target is hit' means at least one shooter hits — use the complement.",
          "\\(P(\\text{all miss}) = (1-\\tfrac13)(1-\\tfrac14)(1-\\tfrac15) = \\tfrac23\\cdot\\tfrac34\\cdot\\tfrac45\\).",
          "\\(= \\dfrac{24}{60} = \\dfrac25\\).",
          "\\(P(\\text{hit}) = 1 - \\tfrac25 = \\tfrac35\\).",
        ],
        answer: "\\(P(\\text{target hit}) = \\dfrac{3}{5}\\)",
      },
      selfCheckExample: {
        prompt:
          "Two candidates A and B are selected independently with probabilities \\(\\tfrac25\\) and \\(\\tfrac47\\). Find the probability that exactly one of them is selected.",
        steps: [
          "\\(P(A) = \\tfrac25,\\ P(A') = \\tfrac35\\); \\(P(B) = \\tfrac47,\\ P(B') = \\tfrac37\\).",
          "Exactly one \\(= P(A)P(B') + P(A')P(B) = \\tfrac25\\cdot\\tfrac37 + \\tfrac35\\cdot\\tfrac47\\).",
          "\\(= \\dfrac{6}{35} + \\dfrac{12}{35} = \\dfrac{18}{35}\\).",
        ],
        answer: "\\(P(\\text{exactly one}) = \\dfrac{18}{35}\\)",
      },
      practiceSet: [
        { prompt: "Four people hit independently with p = 1/2, 1/3, 1/4, 1/5. P(target hit)?", answer: "\\(1 - \\tfrac12\\cdot\\tfrac23\\cdot\\tfrac34\\cdot\\tfrac45 = 1 - \\tfrac15 = \\tfrac45\\)", method: "1 − P(all miss)" },
        { prompt: "A, B, C solve a problem independently with p = 1/2, 1/3, 1/4. P(problem solved)?", answer: "\\(1 - \\tfrac12\\cdot\\tfrac23\\cdot\\tfrac34 = 1 - \\tfrac14 = \\tfrac34\\)", method: "1 − P(none solve)" },
        { prompt: "Husband selected 1/7, wife 1/5, independent. P(only one selected)?", answer: "\\(\\tfrac17\\cdot\\tfrac45 + \\tfrac67\\cdot\\tfrac15 = \\tfrac{4+6}{35} = \\tfrac27\\)", method: "exactly one" },
        { prompt: "State the shortcut for 'at least one of many independent successes'.", answer: "\\(1 - P(\\text{all fail})\\)", method: "complement" },
      ],
      pyqExampleId: "268f6693-fe2d-4efa-83e5-08d2e174c9c9", // A,B,C solve with 1/2,1/3,1/4 → P(solved)=3/4
      traps: [
        {
          title: "'At least one' is 1 − P(none), NOT the sum of individual probabilities",
          body:
            "Adding \\(p_1 + p_2 + p_3\\) over-counts overlaps and can exceed 1. For 'the target is hit / the problem is solved', always use \\(1 - \\prod(1-p_i)\\). E.g. shooters \\(\\tfrac12,\\tfrac13,\\tfrac14\\) give \\(1 - \\tfrac14 = \\tfrac34\\), not \\(\\tfrac12+\\tfrac13+\\tfrac14\\).",
        },
        {
          title: "Exactly one ≠ at least one",
          body:
            "'One of them is selected' asking for EXACTLY one is \\(P(A)P(B') + P(A')P(B)\\). Using \\(P(A\\cup B) = P(A)+P(B)-P(A)P(B)\\) gives AT LEAST one — a bigger number. Read whether the problem excludes the both-succeed case.",
        },
        {
          title: "Complement each event correctly inside a composite pattern",
          body:
            "'Hit by P or Q but not R' forces R to FAIL in every favourable term, so each product carries \\(P(R') = 1 - P(R)\\). Sum \\(PQ'R' + P'QR' + PQR'\\). Forgetting to put \\(R'\\) in each term, or dropping a valid case, is the usual error.",
        },
      ],
    },

    // 5 — total probability theorem (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-total-probability",
      name: "Total Probability Theorem",
      intuition:
        "When an event can happen through several mutually exclusive, exhaustive 'routes' (which bag, which first draw, which machine), its overall probability is the weighted average of the route-conditional probabilities — each weighted by how likely that route is. Draw a two-stage tree: branch to the routes, then to the event, and add the branch products.",
      definition:
        "If \\(H_1,\\dots,H_n\\) are mutually exclusive and exhaustive (they partition the sample space) with \\(P(H_i) > 0\\), then for any event E:\n" +
        "- \\(P(E) = \\displaystyle\\sum_{i=1}^{n} P(H_i)\\,P(E\\mid H_i)\\).\n" +
        "- Each term is one route's prior times its conditional; the routes' priors sum to 1.\n" +
        "- **Polya-urn / draw-then-add** problems fit here: the first draw's colour defines the partition, and the second-draw probability is conditional on the updated bag.",
      formula: {
        label: "Total probability theorem",
        latex:
          "P(E) = \\sum_{i=1}^{n} P(H_i)\\,P(E\\mid H_i)",
        symbols: [
          { symbol: "H_i", meaning: "the partition (mutually exclusive, exhaustive routes)" },
          { symbol: "P(H_i)", meaning: "prior probability of route i" },
          { symbol: "\\(P(E\\mid H_i)\\)", meaning: "probability of E along route i" },
        ],
      },
      visualizationSlug: "probability-tree",
      authoredExample: {
        prompt:
          "Bag I has 2 red and 3 white balls; Bag II has 4 red and 1 white. A bag is chosen at random and one ball is drawn. Find the probability the ball is red.",
        steps: [
          "Routes: \\(P(\\text{Bag I}) = P(\\text{Bag II}) = \\tfrac12\\).",
          "Conditionals: \\(P(R\\mid \\text{I}) = \\tfrac25\\), \\(P(R\\mid \\text{II}) = \\tfrac45\\).",
          "Total probability: \\(P(R) = \\tfrac12\\cdot\\tfrac25 + \\tfrac12\\cdot\\tfrac45 = \\tfrac{2}{10} + \\tfrac{4}{10} = \\tfrac{6}{10}\\).",
          "Simplify: \\(P(R) = \\tfrac35\\).",
        ],
        answer: "\\(P(R) = \\dfrac{3}{5}\\)",
      },
      selfCheckExample: {
        prompt:
          "A bag has 4 red and 6 black balls. A ball is drawn, its colour noted, and it plus 3 more of the same colour are returned. A second ball is then drawn. Find the probability the second ball is red.",
        steps: [
          "Partition on the first draw: \\(P(R_1) = \\tfrac{4}{10}\\), \\(P(B_1) = \\tfrac{6}{10}\\); after adding 3, the bag holds 13.",
          "If first was red: bag has 7 red of 13, so \\(P(R_2\\mid R_1) = \\tfrac{7}{13}\\).",
          "If first was black: bag has 4 red of 13, so \\(P(R_2\\mid B_1) = \\tfrac{4}{13}\\).",
          "Total: \\(P(R_2) = \\tfrac{4}{10}\\cdot\\tfrac{7}{13} + \\tfrac{6}{10}\\cdot\\tfrac{4}{13} = \\tfrac{28 + 24}{130} = \\tfrac{52}{130} = \\tfrac{26}{65}\\).",
        ],
        answer: "\\(P(R_2) = \\dfrac{26}{65}\\)",
      },
      practiceSet: [
        { prompt: "Two machines make 60% and 40% of items; defect rates 2% and 5%. P(item defective)?", answer: "\\(0.6(0.02) + 0.4(0.05) = 0.032\\)", method: "weighted average of routes" },
        { prompt: "What two properties must the routes H_i have for total probability?", answer: "Mutually exclusive and exhaustive (a partition)", method: "they cover everything, no overlap" },
        { prompt: "Bag chosen 1/2 each; P(R|I)=2/5, P(R|II)=3/8. P(R)?", answer: "\\(\\tfrac12\\cdot\\tfrac25 + \\tfrac12\\cdot\\tfrac38 = \\tfrac{16+15}{80} = \\tfrac{31}{80}\\)", method: "sum of branch products" },
        { prompt: "Do the priors P(H_i) sum to 1?", answer: "Yes — the routes are exhaustive", method: "partition of the sample space" },
      ],
      pyqExampleId: "72c4a058-0390-4842-a0e3-6012f470f966", // Polya urn: 4R 6B, add 3 same colour, P(2nd red) = 26/65
      traps: [
        {
          title: "The routes must partition the space — exclusive AND exhaustive",
          body:
            "Total probability \\(P(E) = \\sum P(H_i)P(E\\mid H_i)\\) is valid only when the \\(H_i\\) are mutually exclusive (no overlap) and exhaustive (cover everything). If your routes leave a gap or overlap, the weighted sum is wrong.",
        },
        {
          title: "In draw-then-add problems, update the bag before the conditional",
          body:
            "After returning the drawn ball plus 3 of its colour, the bag size grows to \\(10 + 3 = 13\\) and the matching colour count grows by 4. Use \\(P(R_2\\mid R_1) = \\tfrac{7}{13}\\), not the original \\(\\tfrac{4}{10}\\).",
        },
      ],
    },

    // 6 — Bayes' theorem (anchored)
    {
      kind: "formula" as const,
      slug: "cetpd-bayes-theorem",
      name: "Bayes' Theorem — Reversing the Conditioning",
      intuition:
        "Bayes' theorem answers the reverse question: given that the effect E was observed, which cause H_i was most likely responsible? It reweights each route's prior by how strongly that route predicts the observed evidence (its likelihood), then normalises by the total probability of the evidence. It is total probability run backwards.",
      definition:
        "For a partition \\(H_1,\\dots,H_n\\) and observed event E with \\(P(E) > 0\\):\n" +
        "- \\(P(H_k\\mid E) = \\dfrac{P(H_k)\\,P(E\\mid H_k)}{\\displaystyle\\sum_{i} P(H_i)\\,P(E\\mid H_i)}\\).\n" +
        "- **Numerator** = the chosen route's prior × likelihood; **denominator** = total probability of E (the sum of ALL routes' prior × likelihood).\n" +
        "- With **equal priors** \\(P(H_i) = \\tfrac1n\\), the priors cancel and the posterior is just \\(\\dfrac{P(E\\mid H_k)}{\\sum_i P(E\\mid H_i)}\\) — a ratio of likelihoods.",
      formula: {
        label: "Bayes' theorem (posterior from priors and likelihoods)",
        latex:
          "P(H_k\\mid E) = \\dfrac{P(H_k)\\,P(E\\mid H_k)}{\\sum_{i} P(H_i)\\,P(E\\mid H_i)}",
        symbols: [
          { symbol: "P(H_k)", meaning: "prior — probability of cause k before the evidence" },
          { symbol: "\\(P(E\\mid H_k)\\)", meaning: "likelihood — how well cause k predicts the evidence E" },
          { symbol: "\\(P(H_k\\mid E)\\)", meaning: "posterior — probability of cause k after seeing E" },
        ],
      },
      visualizationSlug: "probability-tree",
      authoredExample: {
        prompt:
          "Bag I has 3 red and 1 white ball; Bag II has 1 red and 3 white. A bag is chosen at random and a red ball is drawn. Find the probability it came from Bag I.",
        steps: [
          "Priors: \\(P(\\text{I}) = P(\\text{II}) = \\tfrac12\\). Likelihoods: \\(P(R\\mid \\text{I}) = \\tfrac34\\), \\(P(R\\mid \\text{II}) = \\tfrac14\\).",
          "Total probability of red: \\(P(R) = \\tfrac12\\cdot\\tfrac34 + \\tfrac12\\cdot\\tfrac14 = \\tfrac{3}{8} + \\tfrac18 = \\tfrac48 = \\tfrac12\\).",
          "Bayes: \\(P(\\text{I}\\mid R) = \\dfrac{\\tfrac12\\cdot\\tfrac34}{\\tfrac12} = \\dfrac{3/8}{1/2}\\).",
          "\\(= \\dfrac34\\).",
        ],
        answer: "\\(P(\\text{Bag I}\\mid R) = \\dfrac{3}{4}\\)",
      },
      selfCheckExample: {
        prompt:
          "For \\(k = 1,2,3\\), box \\(B_k\\) contains k red and \\((k+1)\\) white balls, with \\(P(B_1) = \\tfrac12,\\ P(B_2) = \\tfrac13,\\ P(B_3) = \\tfrac16\\). A box is chosen and a red ball drawn. Find the probability it came from \\(B_2\\).",
        steps: [
          "Likelihoods: \\(P(R\\mid B_1) = \\tfrac13,\\ P(R\\mid B_2) = \\tfrac25,\\ P(R\\mid B_3) = \\tfrac37\\).",
          "Numerator: \\(P(B_2)P(R\\mid B_2) = \\tfrac13\\cdot\\tfrac25 = \\tfrac{2}{15}\\).",
          "Denominator: \\(\\tfrac12\\cdot\\tfrac13 + \\tfrac13\\cdot\\tfrac25 + \\tfrac16\\cdot\\tfrac37 = \\tfrac16 + \\tfrac{2}{15} + \\tfrac{1}{14}\\); LCD 210 gives \\(\\tfrac{35 + 28 + 15}{210} = \\tfrac{78}{210}\\).",
          "Posterior: \\(\\dfrac{2/15}{78/210} = \\dfrac{28/210}{78/210} = \\dfrac{28}{78} = \\dfrac{14}{39}\\).",
        ],
        answer: "\\(P(B_2\\mid R) = \\dfrac{14}{39}\\)",
      },
      practiceSet: [
        { prompt: "Equal priors on 3 diseases; test-positive likelihoods 0.7, 0.5, 0.8. P(disease 2 | positive)?", answer: "\\(\\dfrac{0.5}{0.7+0.5+0.8} = \\dfrac{0.5}{2} = \\dfrac14\\)", method: "equal priors cancel → likelihood ratio" },
        { prompt: "In Bayes' theorem, what sits in the denominator?", answer: "P(E) — the total probability of the evidence (sum of all prior × likelihood)", method: "normaliser" },
        { prompt: "Bag I: 3R 2G, Bag II: 5R 3G, chosen equally; a green is drawn. P(from Bag I)?", answer: "\\(\\dfrac{\\tfrac12\\cdot\\tfrac25}{\\tfrac12\\cdot\\tfrac25 + \\tfrac12\\cdot\\tfrac38} = \\dfrac{16}{31}\\)", method: "prior × likelihood over total" },
        { prompt: "When do priors drop out of the Bayes ratio?", answer: "When all priors are equal — the posterior becomes a likelihood ratio", method: "P(H_i) = 1/n cancels" },
      ],
      pyqExampleId: "b9e47c2e-b811-48c8-a59a-9e58222136d3", // boxes B_k, P(B_2|red) = 14/39
      traps: [
        {
          title: "Numerator is ONE route; denominator is ALL routes",
          body:
            "\\(P(H_k\\mid E)\\) puts only the chosen route \\(P(H_k)P(E\\mid H_k)\\) on top, but the FULL total probability \\(\\sum_i P(H_i)P(E\\mid H_i)\\) on the bottom. Using the same single term top and bottom gives 1 — a classic Bayes setup error.",
        },
        {
          title: "Do not swap priors and likelihoods",
          body:
            "The prior \\(P(H_i)\\) (which box/bag was chosen) multiplies the likelihood \\(P(E\\mid H_i)\\) (chance of the observed ball given that box). Interchanging them — using \\(P(H_i\\mid E)\\) where a likelihood belongs — corrupts every term.",
        },
        {
          title: "Equal priors cancel — reduce to a likelihood ratio",
          body:
            "With equal priors \\(P(H_i) = \\tfrac1n\\), the \\(\\tfrac1n\\) factors out of every term and the posterior becomes \\(\\dfrac{P(E\\mid H_k)}{\\sum_i P(E\\mid H_i)}\\). For disease tests with equal prior probability, this shortcut avoids carrying \\(\\tfrac13\\) through the arithmetic.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Probability Distribution — Random Variables & Expectation",
      href: "/notes/mht-cet-maths/probability-distribution",
    },
  ],
};
