import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_PATTERNS_NOTE: SubtopicNote = {
  subtopicName: "Structure and Principles",
  title: "Matching Structures and Applying Principles",
  oneLineDefinition:
    "Strip an argument down to its skeleton or its general rule, then find the option that shares it on a different topic.",
  whyItMatters:
    "Principle questions were asked 8 times and matching-structure questions 3 times, all in the Cambridge papers from 2015 to 2022. Both reward the same habit: ignoring the topic and comparing the shape of the reasoning.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-crt-parallel",
      name: "Matching arguments with the same structure",
      intuition:
        "Two arguments about completely different things can have exactly the same shape. Replace the topic words with letters and the shape appears. The right option has the same skeleton, including the same mistake if the original is flawed.",
      definition:
        "**Method** for 'which one most closely parallels the reasoning':\n" +
        "- **Step 1**: rewrite the original with letters, for example 'All A are B. x is not B. So x is not A.'\n" +
        "- **Step 2**: note the type of conclusion (certain, probable, a recommendation) and whether the reasoning is valid or flawed.\n" +
        "- **Step 3**: rewrite each option the same way and compare skeletons, never topics.\n" +
        "- Statements may come in a different order and still match; 'all' and 'every' are the same; 'all' and 'most' are not.\n" +
        "- If the original is flawed, a valid option is wrong, however close its topic.",
      authoredExample: {
        prompt:
          "Original: 'All the plants in this greenhouse are watered every day. This cactus is not watered every day. So this cactus is not in this greenhouse.' Which matches: (a) 'All the trains on this line stop at Verona. This train stops at Verona, so it is on this line.' (b) 'Every member of the choir can read music. Tom cannot read music, so Tom is not in the choir.' (c) 'Every member of the choir can read music. Sara is not in the choir, so she cannot read music.'",
        steps: [
          "Original: all A (greenhouse plants) are B (watered daily); x is not B; so x is not A. This is valid.",
          "(a): all A are B; x is B; so x is A. Different, and flawed: other trains may stop at Verona too.",
          "(b): all A (choir members) are B (read music); x is not B; so x is not A. Same skeleton, also valid.",
          "(c): all A are B; x is not A; so x is not B. Different, and flawed: people outside the choir can read music.",
        ],
        answer: "(b) matches the original's structure.",
      },
      selfCheckExample: {
        prompt:
          "Anyone who has the flu has a high temperature. Elena has a high temperature, so she has the flu.\n\nWhich one of the following most closely parallels the reasoning used in the above argument?",
        options: [
          "All the books in this library are catalogued. This book is not catalogued, so it is not from this library.",
          "All the books in this library are catalogued. This book is from this library, so it is catalogued.",
          "All the books in this library are catalogued. This book is not from this library, so it is not catalogued.",
          "All the books in this library are catalogued. This book is catalogued, so it is from this library.",
          "Most books in this library are catalogued. This book is from this library, so it is probably catalogued.",
        ],
        steps: [
          "Original: all A (flu sufferers) are B (high temperature); x is B; so x is A. This is flawed: a high temperature has other causes (affirming the consequent).",
          "D: all A (library books) are B (catalogued); x is B; so x is A. Same skeleton and the same flaw.",
          "A and B are valid arguments, so they cannot match a flawed one. C is a different flaw (x is not A, so not B). E uses 'most' and a probable conclusion, a different shape.",
        ],
        answer: "(D) All the books in this library are catalogued. This book is catalogued, so it is from this library.",
      },
      practiceSet: [
        {
          prompt: "Write the skeleton: 'If the shop is open, the lights are on. The lights are off, so the shop is closed.'",
          answer: "If A then B; not B; so not A.",
        },
        {
          prompt: "The original argument is flawed. One option is a valid argument on the same topic. Can it be the answer?",
          answer: "No. A parallel argument must copy the flaw as well as the shape.",
        },
        {
          prompt: "Do 'All doctors are graduates' and 'Every doctor is a graduate' have the same structure?",
          answer: "Yes. 'All' and 'every' make the same claim.",
        },
      ],
      traps: [
        {
          title: "Matching the topic is not matching the structure",
          body: "IMAT often gives one option on a topic close to the original's (health for health, school for school) with a different shape. Topic is irrelevant here. Only the skeleton, the strength of the claims and the validity count.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-principle",
      name: "Identifying and applying the principle behind an argument",
      intuition:
        "A principle is the general rule behind a particular recommendation. Find it by removing the particular people, places and things, so that only the rule is left. Then look for the option where the same rule gives the same kind of conclusion in a new setting.",
      definition:
        "A **principle** is a general rule or value which, applied to the case in the passage, gives its conclusion.\n" +
        "- **Step 1**: find the conclusion and the main reason for it.\n" +
        "- **Step 2**: write the rule with no names: 'Anyone who ... should ...', or 'It is wrong to ... when ...'.\n" +
        "- **Step 3**: for 'which illustrates the principle', choose the option where the same rule applies and points the same way.\n" +
        "- Reject options on the same topic that follow a different rule, and rules so broad that they leave out the conditions the argument depends on.\n" +
        "- Principles are often about fairness, responsibility, harm, cost against benefit, or setting an example.",
      authoredExample: {
        prompt:
          "'The restaurant was right to list every allergen in its dishes on the menu, even though only a few customers have allergies. People who could be seriously harmed by a hidden ingredient cannot protect themselves unless they are told about it, and the cost of telling them is small.' State the principle, then pick the option that illustrates it: (a) a gym should put up a sign beside a newly washed, slippery floor; (b) a shop should lower its prices to attract more customers; (c) a school should ban all nuts from its kitchen.",
        steps: [
          "Conclusion: listing allergens was right. Reason: people facing a serious hidden risk can only protect themselves if told, and telling them costs little.",
          "Principle: when a hidden risk could seriously harm someone and warning them costs little, those responsible should warn them.",
          "(a) fits: a slippery floor is a hidden risk of injury, and a sign is cheap. The gym should warn people.",
          "(b) is about profit, not risk. (c) shares the food topic but follows a different rule: removing the risk rather than informing people about it.",
        ],
        answer:
          "Principle: warn people of a serious hidden risk when warning costs little. (a) illustrates it.",
      },
      selfCheckExample: {
        prompt:
          "The football club should let the town's youth team use its main pitch on Saturday mornings, when the pitch is otherwise empty. The club already pays to look after the pitch, so letting the youth team use it costs almost nothing, and it gives young players experience they cannot get anywhere else in the town.\n\nWhich one of the following best illustrates the principle underlying the above argument?",
        options: [
          "A cinema should lower its ticket prices on weekday afternoons to fill its empty seats.",
          "A hospital should build a second car park because its first one is always full.",
          "A university should give extra places to students who played sport at school.",
          "A family should sell their caravan because they no longer use it.",
          "A school should let a local choir rehearse in its hall in the evenings, when the hall is empty and the choir has nowhere else to practise.",
        ],
        steps: [
          "Principle: when a facility is unused and sharing it costs the owner almost nothing, the owner should let others use it if they would benefit and have no alternative.",
          "E matches every part: an empty hall, little cost to the school, a group with nowhere else to go.",
          "A is about the owner earning more, not about helping others. B is about a facility that is full, not idle. C has a sports link but a different rule. D is about selling for the owner's own gain.",
        ],
        answer: "(E) A school should let a local choir rehearse in its hall in the evenings, when the hall is empty and the choir has nowhere else to practise.",
      },
      practiceSet: [
        {
          prompt: "State the principle behind: 'Tom should give back the extra change the cashier handed him by mistake.'",
          answer: "You should not keep something that was given to you by mistake.",
        },
        {
          prompt:
            "Principle: 'Those who cause a mess should pay to clean it up.' Which fits: (a) a festival organiser pays to clear the litter after the event; (b) the council cleans the park every week?",
          answer: "(a)",
          method: "The organiser caused the mess; the council did not",
        },
        {
          prompt: "Why is 'everyone should help others' usually a poor answer to 'which principle underlies the argument'?",
          answer: "It is too broad: it drops the conditions the argument depends on.",
        },
      ],
      traps: [
        {
          title: "Same topic, different principle",
          body: "IMAT likes an option on the passage's own subject that follows a different rule (banning instead of warning, profit instead of fairness). Write the rule in general words first, then check that the option fits all of it, conditions included.",
        },
      ],
    },
  ],
};
