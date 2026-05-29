import type { SubtopicNote } from "@/app/notes/_types";

export const CONDITIONAL_PROBABILITY_BAYES_NOTE: SubtopicNote = {
  subtopicName:
    "Conditional Probability, Total Probability, and Bayes' Theorem",
  title: "Conditional Probability, Total Probability & Bayes'",
  oneLineDefinition:
    "Updating a probability once you know something has happened — conditional probability, the multiplication rule, total probability, and Bayes' flip.",
  whyItMatters:
    "This is the conceptual peak of the chapter and its second-largest subtopic (29 questions), with most rated MODERATE — the marks that separate scorers. " +
    "Everything here flows from one idea: knowing that B happened shrinks the sample space to B. From that come the multiplication rule, total probability over a partition, and Bayes' theorem for reversing a conditional. " +
    "Master the bag/machine/factory archetypes and you cover almost every question in this subtopic.",
  concepts: [
    // 1 ───────────────────────────────────────────────────────────────────────
    {
      slug: "conditional-probability",
      name: "Conditional probability",
      intuition:
        "Once you know event \\(B\\) has happened, the only outcomes still possible are those inside \\(B\\) — the sample space shrinks to \\(B\\). " +
        "The conditional probability of \\(A\\) given \\(B\\) is the share of that shrunken world in which \\(A\\) also holds.",
      definition:
        "The **conditional probability** of \\(A\\) given \\(B\\) (with \\(P(B) > 0\\)) is " +
        "\\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}\\). " +
        "It re-normalises the joint probability \\(P(A \\cap B)\\) by the probability of the condition \\(B\\). " +
        "If \\(A\\) and \\(B\\) are independent, conditioning changes nothing: \\(P(A \\mid B) = P(A)\\).",
      formula: {
        label: "Conditional probability",
        latex:
          "P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)}, \\qquad P(B) > 0",
        symbols: [
          { symbol: "\\(P(A \\cap B)\\)", meaning: "probability both occur" },
          { symbol: "\\(P(B)\\)", meaning: "probability of the condition — the new \"total\"" },
        ],
      },
      authoredExample: {
        prompt:
          "For two events, \\(P(A \\cap B) = 0.2\\) and \\(P(B) = 0.5\\). Find \\(P(A \\mid B)\\).",
        steps: [
          "Apply the definition: \\(P(A \\mid B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.2}{0.5}\\).",
          "\\(= 0.4\\).",
        ],
        answer: "\\(0.4\\)",
      },
      selfCheckExample: {
        prompt:
          "\\(P(A \\cap B) = \\dfrac{1}{6}\\) and \\(P(B) = \\dfrac{1}{3}\\). Find \\(P(A \\mid B)\\).",
        steps: [
          "\\(P(A \\mid B) = \\dfrac{1/6}{1/3} = \\dfrac{1}{6} \\times \\dfrac{3}{1} = \\dfrac{1}{2}\\).",
        ],
        answer: "\\(\\dfrac{1}{2}\\)",
      },
      practiceSet: [
        { prompt: "\\(P(A\\cap B)=0.3, P(B)=0.6\\). \\(P(A\\mid B)\\)?", answer: "\\(0.5\\)" },
        { prompt: "\\(P(A\\cap B)=\\tfrac{1}{4}, P(B)=\\tfrac{1}{2}\\). \\(P(A\\mid B)\\)?", answer: "\\(\\dfrac{1}{2}\\)" },
        { prompt: "If \\(A,B\\) independent, \\(P(A\\mid B)=\\)?", answer: "\\(P(A)\\)" },
        { prompt: "\\(P(A\\cap B)=0.1, P(A\\mid B)=0.5\\). \\(P(B)\\)?", answer: "\\(0.2\\)", method: "\\(P(B)=P(A\\cap B)/P(A\\mid B)\\)" },
      ],
      pyqExampleId: "849ae393-e763-4251-9028-923c883a9c85",
      traps: [
        {
          title: "Mind which event is the condition: \\(P(A\\mid B) \\ne P(B\\mid A)\\) in general",
          body:
            "The denominator is the probability of the GIVEN event. \\(P(A\\mid B)\\) divides by \\(P(B)\\); \\(P(B\\mid A)\\) divides by \\(P(A)\\). They are equal only when \\(P(A) = P(B)\\).",
        },
        {
          title: "The condition must have positive probability",
          body:
            "\\(P(A\\mid B)\\) is undefined when \\(P(B) = 0\\). Check the condition is possible before dividing.",
        },
      ],
    },

    // 2 ───────────────────────────────────────────────────────────────────────
    {
      slug: "multiplication-rule-and-restricted-sample-space",
      name: "Multiplication rule & restricted sample space",
      intuition:
        "Rearranging the conditional definition gives the general multiplication rule: the chance of both is the chance of one times the chance of the other given the first. " +
        "And when a question says \"given that …\", the fastest route is often to just list the outcomes inside the condition and count within them.",
      definition:
        "General **multiplication rule**: \\(P(A \\cap B) = P(B)\\,P(A \\mid B) = P(A)\\,P(B \\mid A)\\) (no independence needed). " +
        "**Restricted sample space**: for equally-likely outcomes, \\(P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(B)}\\) — count favourable outcomes among the outcomes in \\(B\\) only. This is the quickest method for dice/card \"given that\" problems.",
      formula: {
        label: "Multiplication rule / restricted counting",
        latex:
          "P(A \\cap B) = P(B)\\,P(A \\mid B), \\qquad P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(B)}",
        symbols: [
          { symbol: "\\(n(B)\\)", meaning: "number of outcomes in the condition — the restricted total" },
          { symbol: "\\(n(A \\cap B)\\)", meaning: "favourable outcomes within the condition" },
        ],
      },
      authoredExample: {
        prompt:
          "Two fair dice are thrown. Given that the sum is 6, what is the probability that one of the dice shows a 2?",
        steps: [
          "Restrict to sum \\(= 6\\): outcomes \\((1,5),(2,4),(3,3),(4,2),(5,1)\\), so \\(n(B) = 5\\).",
          "Among these, those showing a 2: \\((2,4)\\) and \\((4,2)\\), so \\(n(A \\cap B) = 2\\).",
          "Conditional probability: \\(\\dfrac{2}{5}\\).",
        ],
        answer: "\\(\\dfrac{2}{5}\\)",
      },
      selfCheckExample: {
        prompt:
          "A fair die is rolled. Given that the number is even, what is the probability that it is a 4?",
        steps: [
          "Restrict to even: \\(\\{2,4,6\\}\\), so \\(n(B) = 3\\).",
          "Favourable (a 4): just \\(\\{4\\}\\), so \\(n(A \\cap B) = 1\\).",
          "Conditional probability: \\(\\dfrac{1}{3}\\).",
        ],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "Two dice, given sum \\(=8\\): how many outcomes?", answer: "\\(5\\)", method: "\\((2,6),(3,5),(4,4),(5,3),(6,2)\\)" },
        { prompt: "Die rolled, given odd: \\(P(\\text{it is } 3)\\)?", answer: "\\(\\dfrac{1}{3}\\)", method: "odd \\(=\\{1,3,5\\}\\)" },
        { prompt: "\\(P(B)=0.4, P(A\\mid B)=0.5\\). \\(P(A\\cap B)\\)?", answer: "\\(0.2\\)", method: "\\(P(B)P(A\\mid B)\\)" },
        { prompt: "Two dice, given sum \\(=6\\): \\(P(\\text{a doublet})\\)?", answer: "\\(\\dfrac{1}{5}\\)", method: "only \\((3,3)\\) of 5" },
      ],
      pyqExampleId: "61731eaf-3347-41f1-9bad-7b820ea2eb38",
      traps: [
        {
          title: "Under a condition, the TOTAL changes to \\(n(B)\\), not 36 (or 6)",
          body:
            "\"Given that …\" shrinks the sample space. Divide by the number of outcomes in the condition, not by the original total. Forgetting to restrict is the classic conditional-probability error.",
        },
        {
          title: "The general multiplication rule needs \\(P(A \\mid B)\\), not \\(P(A)\\)",
          body:
            "\\(P(A \\cap B) = P(A)P(B)\\) is only the independent case. In general use \\(P(A \\cap B) = P(B)P(A \\mid B)\\).",
        },
      ],
    },

    // 3 ───────────────────────────────────────────────────────────────────────
    {
      slug: "total-probability",
      name: "Total probability (over a partition)",
      visualizationSlug: "probability-tree",
      intuition:
        "When an outcome can arrive through several mutually exclusive routes — pick a bag, then draw a ball — its overall probability is the weighted sum over the routes: probability of each route times the probability of the outcome along that route.",
      definition:
        "If \\(B_1, \\dots, B_n\\) partition the sample space (mutually exclusive and exhaustive), then for any event \\(A\\), " +
        "\\(P(A) = \\sum_{i} P(B_i)\\,P(A \\mid B_i)\\). " +
        "Each term is \"probability of route \\(i\\)\" times \"probability of \\(A\\) given route \\(i\\)\".",
      formula: {
        label: "Total probability",
        latex:
          "P(A) = \\sum_{i=1}^{n} P(B_i)\\,P(A \\mid B_i)",
        symbols: [
          { symbol: "\\(B_i\\)", meaning: "the mutually exclusive, exhaustive routes (partition)" },
          { symbol: "\\(P(A \\mid B_i)\\)", meaning: "probability of \\(A\\) along route \\(i\\)" },
        ],
      },
      authoredExample: {
        prompt:
          "Bag I has 3 red and 2 white balls; Bag II has 1 red and 4 white. A bag is chosen at random and one ball is drawn. What is the probability it is red?",
        steps: [
          "Each bag is chosen with probability \\(\\dfrac{1}{2}\\).",
          "Red given Bag I: \\(\\dfrac{3}{5}\\); red given Bag II: \\(\\dfrac{1}{5}\\).",
          "Total probability: \\(\\dfrac{1}{2}\\cdot\\dfrac{3}{5} + \\dfrac{1}{2}\\cdot\\dfrac{1}{5} = \\dfrac{3}{10} + \\dfrac{1}{10} = \\dfrac{4}{10} = \\dfrac{2}{5}\\).",
        ],
        answer: "\\(\\dfrac{2}{5}\\)",
      },
      selfCheckExample: {
        prompt:
          "Box A has 2 white and 3 black balls; Box B has 4 white and 1 black. A box is chosen at random and one ball is drawn. Find the probability it is white.",
        steps: [
          "White given A: \\(\\dfrac{2}{5}\\); white given B: \\(\\dfrac{4}{5}\\); each box prob \\(\\dfrac{1}{2}\\).",
          "Total: \\(\\dfrac{1}{2}\\cdot\\dfrac{2}{5} + \\dfrac{1}{2}\\cdot\\dfrac{4}{5} = \\dfrac{1}{5} + \\dfrac{2}{5} = \\dfrac{3}{5}\\).",
        ],
        answer: "\\(\\dfrac{3}{5}\\)",
      },
      practiceSet: [
        { prompt: "Routes \\(\\tfrac{1}{2},\\tfrac{1}{2}\\); \\(P(A\\mid\\cdot)=\\tfrac{1}{4},\\tfrac{3}{4}\\). \\(P(A)\\)?", answer: "\\(\\dfrac{1}{2}\\)" },
        { prompt: "Two equally-likely bags, \\(P(\\text{red})=0.6, 0.2\\). \\(P(\\text{red})\\)?", answer: "\\(0.4\\)" },
        { prompt: "Total probability needs the routes to be …?", answer: "mutually exclusive & exhaustive" },
        { prompt: "\\(P(B_1)=0.3,P(A\\mid B_1)=0.5; P(B_2)=0.7,P(A\\mid B_2)=0.1\\). \\(P(A)\\)?", answer: "\\(0.22\\)" },
      ],
      pyqExampleId: "aef4ff5f-10cf-4cb5-b4ea-f50ee6e9524d",
      traps: [
        {
          title: "Weight each route by its own probability",
          body:
            "\\(P(A)\\) is not the average of the conditional probabilities unless the routes are equally likely. Always multiply each \\(P(A \\mid B_i)\\) by \\(P(B_i)\\) before summing.",
        },
        {
          title: "The routes must be a partition",
          body:
            "Total probability requires the \\(B_i\\) to be mutually exclusive and to cover every possibility. Missing a route (or overlapping routes) breaks the sum.",
        },
      ],
    },

    // 4 ───────────────────────────────────────────────────────────────────────
    {
      slug: "bayes-theorem",
      name: "Bayes' theorem (reversing the conditional)",
      intuition:
        "Total probability goes forward — route to outcome. Bayes' theorem goes backward: given the outcome, which route did it most likely come from? " +
        "It rescales each route's forward contribution by the total probability of the outcome.",
      definition:
        "For a partition \\(B_1, \\dots, B_n\\) and an observed event \\(A\\), " +
        "\\(P(B_k \\mid A) = \\dfrac{P(B_k)\\,P(A \\mid B_k)}{\\sum_i P(B_i)\\,P(A \\mid B_i)}\\). " +
        "The numerator is route \\(k\\)'s forward contribution; the denominator is the total probability of \\(A\\) from the previous concept.",
      formula: {
        label: "Bayes' theorem",
        latex:
          "P(B_k \\mid A) = \\dfrac{P(B_k)\\,P(A \\mid B_k)}{\\displaystyle\\sum_{i} P(B_i)\\,P(A \\mid B_i)}",
        symbols: [
          { symbol: "numerator", meaning: "the chosen route's forward contribution \\(P(B_k)P(A\\mid B_k)\\)" },
          { symbol: "denominator", meaning: "total probability of \\(A\\) over all routes" },
        ],
      },
      authoredExample: {
        prompt:
          "A factory makes 60% of its items on machine A (2% defective) and 40% on machine B (5% defective). An item is found defective. What is the probability it was made on machine A?",
        steps: [
          "Forward contributions: A: \\(0.6 \\times 0.02 = 0.012\\); B: \\(0.4 \\times 0.05 = 0.020\\).",
          "Total probability of a defective: \\(0.012 + 0.020 = 0.032\\).",
          "Bayes: \\(P(A \\mid \\text{defective}) = \\dfrac{0.012}{0.032} = \\dfrac{3}{8} = 0.375\\).",
        ],
        answer: "\\(\\dfrac{3}{8}\\) (0.375)",
      },
      selfCheckExample: {
        prompt:
          "1% of a population has a disease. A test is positive 90% of the time for the diseased and 10% of the time for the healthy. A person tests positive. What is the probability they have the disease?",
        steps: [
          "Forward: diseased \\(0.01 \\times 0.90 = 0.009\\); healthy \\(0.99 \\times 0.10 = 0.099\\).",
          "Total positive: \\(0.009 + 0.099 = 0.108\\).",
          "Bayes: \\(\\dfrac{0.009}{0.108} = \\dfrac{1}{12} \\approx 0.083\\).",
        ],
        answer: "\\(\\dfrac{1}{12} \\approx 0.083\\)",
      },
      practiceSet: [
        { prompt: "Forward contributions \\(0.012\\) and \\(0.020\\). \\(P(\\text{first}\\mid A)\\)?", answer: "\\(\\dfrac{3}{8}\\)", method: "\\(0.012/0.032\\)" },
        { prompt: "Bayes' denominator is computed by which rule?", answer: "total probability" },
        { prompt: "Routes \\(\\tfrac{1}{2},\\tfrac{1}{2}\\); \\(P(A\\mid\\cdot)=0.2,0.6\\). \\(P(B_2\\mid A)\\)?", answer: "\\(0.75\\)", method: "\\(0.3/0.4\\)" },
        { prompt: "If both routes give the same \\(P(A\\mid B_i)\\), \\(P(B_k\\mid A)\\) equals?", answer: "\\(P(B_k)\\)", method: "evidence is uninformative" },
      ],
      pyqExampleId: "06ff5d77-2531-4fdd-a390-847af5cc13c7",
      traps: [
        {
          title: "Do not confuse \\(P(B_k \\mid A)\\) with \\(P(A \\mid B_k)\\)",
          body:
            "The question gives you the forward conditionals \\(P(A \\mid B_i)\\) (defect rate per machine) and asks for the reverse \\(P(B_k \\mid A)\\) (which machine, given a defect). Bayes is exactly the tool that flips them — don't report the forward number.",
        },
        {
          title: "The denominator is the FULL total probability, not just \\(P(A \\mid B_k)\\)",
          body:
            "Divide route \\(k\\)'s contribution by the sum over ALL routes. Using only the chosen route's term gives 1 every time — a sure sign the denominator is wrong.",
        },
      ],
    },
  ],
  related: [
    {
      label: "Independent Events & the Multiplication Rule",
      href: "/notes/nda-maths/probability/independent-events",
    },
    {
      label: "Classical Probability & Counting",
      href: "/notes/nda-maths/probability/classical-probability-counting",
    },
  ],
};
