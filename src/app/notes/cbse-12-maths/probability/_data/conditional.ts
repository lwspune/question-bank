import type { SubtopicNote } from "@/app/notes/_types";

export const CB_MA_PR_CONDITIONAL_NOTE: SubtopicNote = {
  subtopicName: "Conditional Probability",
  title: "Conditional Probability",
  oneLineDefinition:
    "The probability of an event E once we know that another event F has happened: P(E|F) is the probability of E and F together divided by the probability of F.",
  whyItMatters:
    "102 questions, fifty-four of them from board papers in every year from 2022 to 2026. Twenty-one of the fifty-four are one-mark MCQs (2023 to 2026) that give two or three probabilities and ask for P(B|A), P(A) or P(A'|B'), two of them assertion-reason items (2023, 2026). The written questions count outcomes on dice, coins and line-ups once a condition is given (2022, 2023, 2025, 2026), the case studies of 2023, 2024 and 2026 ask for probabilities read from a Venn diagram or a passage, and a 2025 question reads them from a survey. The textbook adds Examples 1 to 7, all of Exercise 13.1, Exercise 13.2 Q16, Exercise 13.3 Q14 and Miscellaneous Questions 1, 2, 5, 9 and 11 to 13.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cbmpr-define",
      name: "The definition of P(E|F)",
      intuition:
        "Once F is known to have happened, F becomes the whole new sample space. Only the part of E that lies inside F can still happen, so we compare the probability of E and F together with the probability of F.",
      definition:
        "- **Definition:** if E and F are two events of the same sample space, the conditional probability of E given that F has occurred is \\(P(E|F) = \\dfrac{P(E \\cap F)}{P(F)}\\), provided \\(P(F) \\ne 0\\).\n" +
        "- Words that signal it: 'given that', 'if it is known that', 'it is observed that'. Some papers write \\(P(E/F)\\) for \\(P(E|F)\\).\n" +
        "- \\(P(B|A)\\) has \\(P(A)\\) in the denominator; \\(P(A|B)\\) has \\(P(B)\\). The numerator \\(P(A \\cap B)\\) is the same for both.\n" +
        "- **Turned round:** \\(P(E \\cap F) = P(F)\\,P(E|F)\\). Use it when a conditional probability is given and the intersection is needed.\n" +
        "- If the union is given instead, find the intersection first from \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).",
      formula: {
        label: "Conditional probability of E given F",
        latex: "P(E|F) = \\dfrac{P(E \\cap F)}{P(F)}, \\quad P(F) \\ne 0",
      },
      authoredExample: {
        prompt: "If \\(P(A) = 0.7\\), \\(P(B) = 0.6\\) and \\(P(A \\cup B) = 0.9\\), find \\(P(A|B)\\) and \\(P(B|A)\\).",
        steps: [
          "First find the intersection from the addition theorem: \\(P(A \\cap B) = P(A) + P(B) - P(A \\cup B)\\).",
          "\\(P(A \\cap B) = 0.7 + 0.6 - 0.9 = 0.4\\).",
          "\\(P(A|B) = \\dfrac{P(A \\cap B)}{P(B)} = \\dfrac{0.4}{0.6} = \\dfrac{2}{3}\\).",
          "\\(P(B|A) = \\dfrac{P(A \\cap B)}{P(A)} = \\dfrac{0.4}{0.7} = \\dfrac{4}{7}\\).",
        ],
        answer: "\\(P(A|B) = \\dfrac{2}{3}\\), \\(P(B|A) = \\dfrac{4}{7}\\)",
      },
      selfCheckExample: {
        prompt: "If \\(P(B) = \\dfrac{3}{5}\\) and \\(P(A \\cap B) = \\dfrac{1}{5}\\), find \\(P(A|B)\\).",
        steps: ["\\(P(A|B) = \\dfrac{1/5}{3/5} = \\dfrac{1}{5} \\times \\dfrac{5}{3}\\)."],
        answer: "\\(\\dfrac{1}{3}\\)",
      },
      practiceSet: [
        { prompt: "If \\(P(E) = 0.8\\) and \\(P(E \\cap F) = 0.2\\), find \\(P(F|E)\\).", answer: "\\(0.25\\)" },
        { prompt: "If \\(P(A) = 0.8\\) and \\(P(B|A) = 0.25\\), find \\(P(A \\cap B)\\).", answer: "\\(0.2\\)" },
        {
          prompt: "If \\(P(A \\cap B) = 0.12\\) and \\(P(A|B) = 0.3\\), find \\(P(B)\\).",
          answer: "\\(P(B) = \\dfrac{0.12}{0.3} = 0.4\\)",
        },
      ],
      pyqExampleId: "e3e88677-15f4-4444-9aa6-f09999a942cd",
      traps: [
        {
          title: "Dividing by the wrong event",
          body: "\\(P(B|A)\\) divides by \\(P(A)\\), the event that is given. Writing \\(\\dfrac{P(A \\cap B)}{P(B)}\\) for it gives \\(P(A|B)\\), which is usually a different number.",
        },
        {
          title: "Conditioning on an impossible event",
          body: "If \\(P(B) = 0\\), then \\(P(A|B)\\) is not defined. It is not 0: the formula would divide by zero.",
        },
        {
          title: "An intersection bigger than an event",
          body: "\\(P(A \\cap B)\\) can never be more than \\(P(A)\\) or \\(P(B)\\). A few board MCQs (2025, 2026) printed data that break this rule; answer with the numbers as set, and in your own work treat such a value as a sign of an arithmetic slip.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-counting",
      name: "Counting in the reduced sample space",
      intuition:
        "When every outcome is equally likely, the condition simply throws away the outcomes outside F. Count what is left, count how many of those are also in E, and divide.",
      definition:
        "- For equally likely outcomes, \\(P(E|F) = \\dfrac{n(E \\cap F)}{n(F)}\\).\n" +
        "- **Steps for a full-marks answer:** write the sample space; name the two events in words; list F; list \\(E \\cap F\\); divide.\n" +
        "- Two dice give 36 ordered pairs: \\((2, 5)\\) and \\((5, 2)\\) are different outcomes.\n" +
        "- For children, write each outcome as (elder, younger); 'the younger is a girl' and 'at least one is a girl' are different conditions.\n" +
        "- **Outcomes that are not equally likely:** when a coin decides whether a die is thrown (NCERT Example 7), give each outcome its own probability and use \\(\\dfrac{P(E \\cap F)}{P(F)}\\), not a count.",
      formula: {
        label: "Equally likely outcomes",
        latex: "P(E|F) = \\dfrac{n(E \\cap F)}{n(F)}",
      },
      authoredExample: {
        prompt: "A die is thrown twice. Find the probability that the sum of the numbers is 10, given that the first throw shows a number greater than 3.",
        steps: [
          "The sample space has \\(6 \\times 6 = 36\\) equally likely ordered pairs.",
          "Let E be 'the sum is 10' and F be 'the first throw is greater than 3'.",
          "F: the first number is 4, 5 or 6 and the second is anything, so \\(n(F) = 3 \\times 6 = 18\\).",
          "\\(E \\cap F = \\{(4, 6), (5, 5), (6, 4)\\}\\), so \\(n(E \\cap F) = 3\\).",
          "\\(P(E|F) = \\dfrac{n(E \\cap F)}{n(F)} = \\dfrac{3}{18} = \\dfrac{1}{6}\\).",
        ],
        answer: "\\(\\dfrac{1}{6}\\)",
      },
      selfCheckExample: {
        prompt: "Three coins are tossed. Find the probability of exactly two heads, given that the first coin shows a head.",
        steps: [
          "F = {HHH, HHT, HTH, HTT}, so \\(n(F) = 4\\).",
          "Exactly two heads inside F: HHT and HTH.",
        ],
        answer: "\\(\\dfrac{2}{4} = \\dfrac{1}{2}\\)",
      },
      practiceSet: [
        {
          prompt: "A card is drawn from twenty cards numbered 1 to 20. Given that the number is even, find the probability that it is a multiple of 3.",
          answer: "Even numbers: 10; of these 6, 12, 18 are multiples of 3, so \\(\\dfrac{3}{10}\\)",
        },
        {
          prompt: "A family has three children. Find the probability that all three are boys, given that at least one is a boy.",
          answer: "\\(\\dfrac{1}{7}\\)",
        },
        {
          prompt: "Two dice are thrown and a doublet appears. Find the probability that the sum is more than 8.",
          answer: "Doublets: 6; sum more than 8: (5, 5), (6, 6); so \\(\\dfrac{1}{3}\\)",
        },
      ],
      pyqExampleId: "8b13dfef-1f99-4218-962b-1b86eccea6bd",
      traps: [
        {
          title: "Keeping 36 in the denominator",
          body: "Once the condition is given, divide by the number of outcomes in F, not by all 36. Dividing by 36 gives \\(P(E \\cap F)\\), a common wrong option in board MCQs.",
        },
        {
          title: "Counting a pair once",
          body: "On two dice, 'a 5 on at least one die' with sum 7 is \\((2, 5)\\) and \\((5, 2)\\): two outcomes, not one.",
        },
        {
          title: "Counting outcomes that are not equally likely",
          body: "In 'toss a coin; if tail, throw a die', the outcome HH has probability \\(\\dfrac{1}{4}\\) but each (T, i) has \\(\\dfrac{1}{12}\\). Counting them as equal gives a wrong answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-properties",
      name: "Properties of conditional probability",
      intuition:
        "With F fixed as the new sample space, conditional probabilities behave like ordinary probabilities: the whole space has probability 1, complements add to 1, and the addition theorem still works.",
      definition:
        "- **Property 1:** \\(P(S|F) = P(F|F) = 1\\).\n" +
        "- **Property 2:** \\(P((A \\cup B)|F) = P(A|F) + P(B|F) - P((A \\cap B)|F)\\); if A and B are disjoint, \\(P((A \\cup B)|F) = P(A|F) + P(B|F)\\).\n" +
        "- **Property 3:** \\(P(E'|F) = 1 - P(E|F)\\). The condition F stays the same.\n" +
        "- **Both complements:** \\(A' \\cap B' = (A \\cup B)'\\), so \\(P(A'|B') = \\dfrac{1 - P(A \\cup B)}{P(B')}\\).\n" +
        "- **Special cases from the definition:** if \\(A \\subset B\\), then \\(P(B|A) = 1\\) and \\(P(A|B) = \\dfrac{P(A)}{P(B)} \\ge P(A)\\); if A and B are disjoint, \\(P(B|A) = 0\\); if \\(P(A|B) = P(B|A) \\ne 0\\), then \\(P(A) = P(B)\\).",
      formula: {
        label: "Complement under the same condition",
        latex: "P(E'|F) = 1 - P(E|F)",
      },
      authoredExample: {
        prompt: "If \\(P(A) = 0.3\\), \\(P(B) = 0.4\\) and \\(P(A \\cup B) = 0.6\\), find \\(P(A'|B)\\) and \\(P(A'|B')\\).",
        steps: [
          "\\(P(A \\cap B) = 0.3 + 0.4 - 0.6 = 0.1\\).",
          "\\(P(A|B) = \\dfrac{0.1}{0.4} = \\dfrac{1}{4}\\), so by Property 3, \\(P(A'|B) = 1 - \\dfrac{1}{4} = \\dfrac{3}{4}\\).",
          "For \\(P(A'|B')\\): by De Morgan's law \\(A' \\cap B' = (A \\cup B)'\\), so \\(P(A' \\cap B') = 1 - 0.6 = 0.4\\).",
          "\\(P(B') = 1 - 0.4 = 0.6\\).",
          "\\(P(A'|B') = \\dfrac{0.4}{0.6} = \\dfrac{2}{3}\\).",
        ],
        answer: "\\(P(A'|B) = \\dfrac{3}{4}\\), \\(P(A'|B') = \\dfrac{2}{3}\\)",
      },
      selfCheckExample: {
        prompt: "A and B are events with \\(A \\subset B\\), \\(P(A) = 0.2\\) and \\(P(B) = 0.5\\). Find \\(P(A|B)\\) and \\(P(B|A)\\).",
        steps: [
          "\\(A \\cap B = A\\), so \\(P(A|B) = \\dfrac{0.2}{0.5}\\).",
          "\\(P(B|A) = \\dfrac{P(A)}{P(A)}\\).",
        ],
        answer: "\\(P(A|B) = 0.4\\), \\(P(B|A) = 1\\)",
      },
      practiceSet: [
        { prompt: "For any event F with \\(P(F) > 0\\), what is \\(P(F|F)\\)?", answer: "1" },
        { prompt: "A and B are disjoint events and \\(P(A) = 0.3\\). Find \\(P(B|A)\\).", answer: "0" },
        { prompt: "If \\(P(E|F) = 0.35\\), find \\(P(E'|F)\\).", answer: "\\(0.65\\)" },
      ],
      pyqExampleId: "fb23aed3-d04e-431d-b40e-138e8474905f",
      traps: [
        {
          title: "Complementing the condition",
          body: "\\(P(E'|F) = 1 - P(E|F)\\), but \\(P(E|F')\\) is not \\(1 - P(E|F)\\). Only the event before the bar may be complemented this way.",
        },
        {
          title: "De Morgan the wrong way round",
          body: "\\(A' \\cap B'\\) is \\((A \\cup B)'\\), so its probability is \\(1 - P(A \\cup B)\\). Writing \\(1 - P(A \\cap B)\\) is the near-miss option in board MCQs.",
        },
        {
          title: "Subset the wrong way",
          body: "If \\(P(B|A) = 1\\), then A lies inside B (\\(A \\subset B\\)), not B inside A.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cbmpr-data",
      name: "Survey, Venn diagram and case-study data",
      intuition:
        "Case studies hide conditional probabilities in sentences. 'Of the dropouts, 5% qualify' is already a probability given that the student is a dropout. Turn each sentence into a probability with its condition before you calculate.",
      definition:
        "- Change percentages to probabilities: 35% becomes \\(\\dfrac{35}{100}\\).\n" +
        "- A percentage **of a group** is conditional: 'of the women, 30% work outside' means P(works outside | woman) = 0.3.\n" +
        "- 'Only A' is \\(P(A) - P(A \\cap B)\\); 'neither A nor B' is \\(1 - P(A \\cup B)\\).\n" +
        "- **Addition theorem:** \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\).\n" +
        "- In a Venn diagram, the separate regions add to 1; an event is the sum of its regions.\n" +
        "- The complement keeps its condition: if 17% of male smokers develop the illness, 83% of male smokers do not.",
      formula: {
        label: "Addition theorem",
        latex: "P(A \\cup B) = P(A) + P(B) - P(A \\cap B)",
      },
      authoredExample: {
        prompt:
          "A village has 5000 people; 2000 are women and 1500 work in the fields. 40% of the women work in the fields. A person is chosen at random. Find the probability that the person is (i) a woman who works in the fields, (ii) a woman or a field worker, (iii) a field worker, given that the person is a man.",
        steps: [
          "Let W be 'a woman' and F be 'works in the fields': \\(P(W) = \\dfrac{2000}{5000} = \\dfrac{2}{5}\\), \\(P(F) = \\dfrac{1500}{5000} = \\dfrac{3}{10}\\).",
          "40% of the 2000 women is 800 people, so (i) \\(P(W \\cap F) = \\dfrac{800}{5000} = \\dfrac{4}{25}\\).",
          "(ii) \\(P(W \\cup F) = \\dfrac{2}{5} + \\dfrac{3}{10} - \\dfrac{4}{25} = 0.4 + 0.3 - 0.16 = 0.54 = \\dfrac{27}{50}\\).",
          "(iii) There are 3000 men, and \\(1500 - 800 = 700\\) of the field workers are men.",
          "\\(P(F|W') = \\dfrac{700}{3000} = \\dfrac{7}{30}\\).",
        ],
        answer: "(i) \\(\\dfrac{4}{25}\\) (ii) \\(\\dfrac{27}{50}\\) (iii) \\(\\dfrac{7}{30}\\)",
      },
      selfCheckExample: {
        prompt: "In a class, 60% of the students are girls, and 25% of the girls wear glasses. Find the probability that a student chosen at random is a girl who wears glasses.",
        steps: ["P(girl and glasses) = P(girl) \\(\\times\\) P(glasses | girl) \\(= 0.6 \\times 0.25\\)."],
        answer: "\\(0.15\\)",
      },
      practiceSet: [
        {
          prompt: "In a Venn diagram, 'A only' has probability 0.2, 'A and B' 0.1, 'B only' 0.3 and the region outside both 0.4. Find \\(P(A|B')\\).",
          answer: "\\(P(B') = 0.6\\) and \\(P(A \\cap B') = 0.2\\), so \\(\\dfrac{1}{3}\\)",
        },
        {
          prompt: "Of the items made by machine A, 3% are defective. An item made by machine A is chosen. Find the probability that it is not defective.",
          answer: "\\(0.97\\)",
        },
        {
          prompt: "In a Venn diagram, the regions 'A only', 'A and B' and 'B only' have probabilities 0.35, 0.15 and 0.25. Find \\(P(B|A)\\).",
          answer: "\\(P(A) = 0.5\\), so \\(P(B|A) = \\dfrac{0.15}{0.5} = 0.3\\)",
        },
      ],
      pyqExampleId: "ac3b5f33-6384-449d-8e33-501094b0503e",
      traps: [
        {
          title: "Treating 'of the group' as 'of everyone'",
          body: "'30% of the women work outside' is a conditional probability. The probability of 'woman and works outside' is P(woman) times 0.3.",
        },
        {
          title: "'Only A' written as P(A)",
          body: "P(A) includes the people in both groups. 'Only A' subtracts the overlap: \\(P(A) - P(A \\cap B)\\).",
        },
        {
          title: "'Neither' as 1 minus each",
          body: "'Neither A nor B' is \\(1 - P(A \\cup B)\\). Writing \\(1 - P(A) - P(B)\\) forgets to add back the overlap.",
        },
      ],
    },
  ],
};
