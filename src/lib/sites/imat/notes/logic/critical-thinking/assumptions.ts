import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_CRT_ASSUMPTIONS_NOTE: SubtopicNote = {
  subtopicName: "Assumptions",
  title: "Hidden Assumptions and the Negation Test",
  oneLineDefinition:
    "An assumption is an unstated premise the argument needs; deny it and the conclusion no longer follows.",
  whyItMatters:
    "Assumption questions appeared in every Cambridge paper from 2011 to 2022, 20 times in all, usually as 'which one of the following is an assumption on which the argument depends'. The wrong options are mostly things that would help the argument but are not needed by it.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-crt-assumption",
      name: "Finding the hidden assumption by locating the gap",
      intuition:
        "An assumption is a missing premise: something the author needs to be true but never says. Arguments leave a gap between what the reasons show and what the conclusion claims. A new idea that appears in the conclusion but nowhere in the premises points straight at the assumption that bridges it.",
      definition:
        "An **assumption** is an unstated premise that the argument **depends on**.\n" +
        "- It is **not stated** in the passage. A premise the passage gives is never the assumption.\n" +
        "- **Method**: find the conclusion and the premises; find the **gap** (a word or idea in the conclusion that the premises never reach); state the bridge that closes it.\n" +
        "- Common gaps: that two cases are **comparable**; that a plan **will work**; that **nothing else** explains the evidence; that a **sample is typical**; that the people involved will **behave as expected**.\n" +
        "- The assumption is usually modest: just enough to close the gap, no more.",
      authoredExample: {
        prompt:
          "Find the assumption. 'When the city museum stopped charging for entry last year, its visitor numbers rose by a third. Its shop and café now earn more than the entry fees ever did. The art gallery next door charges a fee and has few visitors. So if the gallery also stopped charging, it would earn more money than it does now.'",
        steps: [
          "Conclusion: the gallery would earn more if entry were free.",
          "Premises: free entry brought the museum more visitors, and its shop and café made up for the lost fees.",
          "Gap 1: the evidence is about the museum, the conclusion about the gallery. The author assumes the gallery would also gain visitors from free entry.",
          "Gap 2: the museum's extra income came from its shop and café. The conclusion needs the gallery to have a similar way of earning from visitors. Nothing says it has one.",
          "The bridge: the gallery has ways of earning money from visitors, such as a shop or café, as the museum does.",
        ],
        answer:
          "The gallery can earn from extra visitors (for example through a shop or café) in the way the museum does, and free entry would bring it more visitors.",
      },
      selfCheckExample: {
        prompt:
          "A software firm moved its staff to a four-day week with no cut in pay. In the following year, more of its projects were finished on time and fewer staff left the company. A clothing factory is now considering the same change. Its managers argue that, since the change worked so well for the software firm, the factory will also complete its orders faster and keep more of its workers.\n\nWhich one of the following is an assumption on which the managers' argument depends?",
        options: [
          "The software firm's staff are paid more than the factory's workers.",
          "Most workers would prefer a four-day week to a rise in pay.",
          "The software firm will keep the four-day week permanently.",
          "The factory's workers leave more often than the software firm's staff used to.",
          "A shorter week affects the output of factory workers in a similar way to that of software staff.",
        ],
        steps: [
          "Conclusion: the factory will finish orders faster and keep more workers. Evidence: the change worked at a software firm.",
          "Gap: a software firm and a clothing factory are different kinds of work. The argument needs them to respond to the change in the same way. That is E.",
          "A, B and C are not needed: the conclusion could still follow whatever the pay levels, workers' wider preferences or the firm's future plans. D is not needed either: the factory can keep more workers whatever its current rate is.",
        ],
        answer: "(E) A shorter week affects the output of factory workers in a similar way to that of software staff.",
      },
      practiceSet: [
        {
          prompt: "'Fresh fruit is expensive in this village shop, so people in the village must eat little fruit.' State the assumption.",
          answer: "People in the village get their fruit mainly from this shop (they cannot easily buy it more cheaply elsewhere).",
        },
        {
          prompt: "A sentence appears in the passage as one of the reasons. Can it be the answer to an assumption question?",
          answer: "No. An assumption is unstated.",
        },
        {
          prompt: "'This sunscreen has the highest protection factor on sale, so it will stop you getting sunburnt.' State the assumption.",
          answer: "That the highest protection factor is enough on its own to prevent sunburn.",
          method: "The gap is between 'highest on sale' and 'will stop'",
        },
      ],
      traps: [
        {
          title: "A stated premise is not an assumption",
          body: "IMAT often puts one of the passage's own reasons, slightly reworded, among the options. Because it is stated, it is not assumed. An assumption is what the author takes for granted without saying.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-crt-negation",
      name: "The negation test for assumptions",
      intuition:
        "If an argument truly depends on a statement, then denying that statement should make the argument fall apart. A statement that only helps the argument does not pass: deny it and the argument still stands. This test separates what is needed from what is merely nice to have.",
      definition:
        "**Negation test**: write the opposite of the candidate. If the conclusion no longer follows, the candidate is an assumption. If the argument survives, it is not.\n" +
        "- Negate with care. Not 'all' is 'at least one is not'; not 'some' is 'none'; not 'will' is 'will not'; not 'the main cause' is 'not the main cause'.\n" +
        "- Strong candidates (all, only, every, never) often fail the test, because the argument needs only a weaker version.\n" +
        "- An **assumption** is required; a **strengthener** only makes the conclusion more likely. An option can be a strengthener without being an assumption.",
      authoredExample: {
        prompt:
          "'A footbridge across the river would let people on the east bank walk to the new health centre in ten minutes. At present they must drive or take a bus round by the main road. So building the footbridge would reduce car journeys to the health centre.' Test three candidates: (a) some east bank residents who now drive to the centre would be willing to walk there; (b) most east bank residents are in good health; (c) the footbridge would be cheap to build.",
        steps: [
          "(a) Negation: none of the residents who now drive would be willing to walk. Then the bridge would not reduce car journeys at all. The argument collapses, so (a) is an assumption.",
          "(b) Negation: most residents are not in good health. The argument can still work, because some healthy residents could still walk instead of driving. Not required.",
          "(c) Negation: the bridge would be expensive. That may be a reason not to build it, but the conclusion is only about car journeys, which are unaffected. Not required.",
        ],
        answer: "(a) is the assumption; (b) and (c) fail the negation test.",
      },
      selfCheckExample: {
        prompt:
          "A coffee chain throws away millions of paper cups every year, most of which cannot be recycled. It now plans to give a small discount to customers who bring their own reusable cup. The chain says the scheme will reduce the number of paper cups it uses.\n\nWhich one of the following is an assumption on which the chain's claim depends?",
        options: [
          "All of the chain's regular customers will start bringing a reusable cup.",
          "Over its lifetime, a reusable cup is better for the environment than paper cups.",
          "Some customers who would otherwise take a paper cup will bring their own cup because of the discount.",
          "The discount will be larger than those offered by other coffee chains.",
          "Paper cups will become easier to recycle in future.",
        ],
        steps: [
          "Negate C: no customer who would have used a paper cup brings their own because of the discount. Then paper cup use does not fall, and the claim fails. C is the assumption.",
          "Negate A: not all regulars will bring a cup. The claim survives, since a few is enough to reduce the number. A is too strong.",
          "Negate B: reusable cups are worse overall. That does not change how many paper cups are used. D and E, negated, also leave the claim standing.",
        ],
        answer: "(C) Some customers who would otherwise take a paper cup will bring their own cup because of the discount.",
      },
      practiceSet: [
        {
          prompt: "Negate: 'All the tickets were sold.'",
          answer: "At least one ticket was not sold.",
        },
        {
          prompt: "Negate: 'Some patients will benefit.'",
          answer: "No patients will benefit.",
        },
        {
          prompt:
            "'A new warning sign will reduce speeding on this bend, so accidents here will fall.' Does the argument assume that speeding causes at least some of the accidents on this bend?",
          answer: "Yes.",
          method: "Negated, less speeding would not reduce the accidents",
        },
      ],
      traps: [
        {
          title: "Negating 'all' gives 'not all', not 'none'",
          body: "The opposite of 'all the customers will change' is 'at least one will not'. Negating it as 'no customer will change' makes the test far too harsh and leads you to accept strong options that the argument does not need.",
        },
        {
          title: "Helpful is not the same as required",
          body: "An option can make the conclusion more likely without the argument depending on it. In an assumption question, if denying the option leaves the argument standing, it is a strengthener at most, not the answer.",
        },
      ],
    },
  ],
};
