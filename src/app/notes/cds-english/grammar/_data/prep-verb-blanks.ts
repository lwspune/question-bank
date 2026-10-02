import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_VERB_BLANKS_NOTE: SubtopicNote = {
  subtopicName: "Connector Blanks: Conditionals and Verb Forms",
  title: "Conditionals, tenses and verb forms in blanks",
  oneLineDefinition:
    "Many blanks ask for the right form of a verb. The words around the blank (if, had, since, scarcely, a modal, is) decide the form, so find those signal words first.",
  whyItMatters:
    "These items look like vocabulary but are pure grammar. Four options often differ only in tense or form (started, had started, would start, has started). " +
    "Each signal word allows only one form, so a short checklist turns them into sure marks.",
  concepts: [
    // C1 — conditionals
    {
      kind: "formula" as const,
      slug: "cdsenprep-conditionals",
      name: "The three conditionals and inverted 'Had he'",
      intuition:
        "An if-sentence has two halves that must match in time. Real future: present + will. Imagined present: past + would. Imagined past, which can no longer change: had done + would have done. Read the half that is printed and build the other half to match.",
      definition:
        "The terms:\n" +
        "- **First conditional** (a real future possibility): If + present, will + base verb. If it rains, we will stay in.\n" +
        "- **Second conditional** (an imagined present or future): If + past, would / could + base verb. If I had wings, I would fly.\n" +
        "- **Third conditional** (an imagined past): If + had + past participle, would / could have + past participle. If he had run, he would have won.\n" +
        "- **Subjunctive were**: in an imagined condition, use were for every subject: If I were you.\n" +
        "- **Inversion**: drop if and put had first: Had he run = If he had run.\n" +
        "The method:\n" +
        "- Find the printed half and identify its form (will? would? would have?).\n" +
        "- Give the blank the matching form from the list above.\n" +
        "- Never put will or would in the if-half.\n" +
        "Items tested this way:\n" +
        "- If Mohan had started at 5 a.m., he would not have missed the train (2017 II)\n" +
        "- If I were you, I would love to accept the offer (2018 II)\n" +
        "- Had I been informed beforehand, I could have made it to the celebrations (2021 I)\n" +
        "- Had he told me the news beforehand, I would have been careful (2022 II)\n" +
        "- If a Time Machine could take you anywhere, where would you go? (2022 II)\n" +
        "- I shall not be going to the theatre if it snows (2024 I)",
      authoredExample: {
        prompt: "If I ______ the answer, I would tell you. (a) know (b) knew (c) had known (d) will know",
        steps: [
          "The printed half is 'I would tell you': would + base verb.",
          "would + base verb belongs to the second conditional, an imagined present.",
          "The if-half of the second conditional takes the past: knew.",
          "Had known would need 'would have told'; know and will know belong to the first conditional.",
        ],
        answer: "(b) knew.",
      },
      selfCheckExample: {
        prompt: "If it ______ tomorrow, we will cancel the trip. (a) rains (b) will rain (c) rained (d) would rain",
        steps: [
          "The printed half is 'we will cancel': will + base verb, the first conditional.",
          "The if-half of the first conditional takes the present simple.",
          "Will and would never go in the if-half.",
        ],
        answer: "(a) rains.",
      },
      practiceSet: [
        { prompt: "If I were rich, I ______ a big house. (will buy / would buy)", answer: "would buy", method: "were → second conditional → would" },
        { prompt: "Had they asked me, I ______ them. (would help / would have helped)", answer: "would have helped", method: "Had + past participle → would have" },
        { prompt: "If you heat ice, it ______. (melts / would melt)", answer: "melts", method: "a general truth: present + present" },
        { prompt: "If she ______ here now, she would know what to do. (is / were)", answer: "were" },
      ],
      pyqExampleId: "e8e2c2e8-d47c-41c4-8360-30ce0bf4f7cc",
      traps: [
        {
          title: "No would in the if-half",
          body:
            "'If he would have come, I would have met him' is wrong. The if-half takes **had come**: If he had come, I would have met him.",
        },
        {
          title: "Inversion drops the if",
          body:
            "'Had she trained harder, she would have won the race' = 'If she had trained harder ...'. When a sentence opens with the blank and the other half has would have, look for an option starting with **Had**.",
        },
        {
          title: "If I were, not if I was, in an imagined condition",
          body:
            "For an unreal condition the exam expects **were** for every subject: If I were you, If he were here. Pair it with **would**, not will.",
        },
      ],
    },

    // C2 — tense signals and agreement
    {
      kind: "formula" as const,
      slug: "cdsenprep-tense-agreement",
      name: "Tense signals and subject-verb agreement",
      intuition:
        "Some words fix the tense: since and for with an ongoing action take the present perfect; yesterday takes the simple past; scarcely and hardly at the start take had. And the verb must agree with its subject, even when the subject looks plural but is one idea, or looks singular but means many.",
      definition:
        "The rules:\n" +
        "- **since / for** + an action still going on → present perfect (continuous): He has been waiting since morning.\n" +
        "- **lately, recently, ever, yet** → present perfect: Have you seen him lately?\n" +
        "- **yesterday, last year, in 2010** → simple past: I saw him yesterday.\n" +
        "- **Scarcely / Hardly** at the start → had + subject + past participle ... **when**: Scarcely had he left when it rained. (No sooner had ... **than**.)\n" +
        "- **Reported speech**: after a past reporting verb (told, said, asked), move the tense back: will → would, am → was or were.\n" +
        "- **Agreement**: a singular subject takes a singular verb (He has), a plural subject a plural verb (They behaved, They have).\n" +
        "- **Plural sense**: a quantity like twelve dozen takes a plural verb (twelve dozen cost); politics meaning political affairs or opinions takes are.\n" +
        "- **Time clauses** match the main clause: When she met her friend, her throat choked (both past).\n" +
        "Items tested this way:\n" +
        "- Scarcely had the teacher entered the class when he heard the noise (2018 I)\n" +
        "- When she met her friend after two decades (2021 I); She told me that she would have completed her degree by 2023 (2021 I)\n" +
        "- My sister asked me if I were willing (2018 II); He has been waiting for you since morning (2022 II)\n" +
        "- Have you seen Mohan lately? (2023 I); twelve dozen cost one hundred rupees (2022 I)\n" +
        "- The country's politics are complex (2024 II); They behaved as responsible people do (2023 II)",
      authoredExample: {
        prompt: "She ______ in Delhi since 2019. (a) lives (b) lived (c) has lived (d) is living",
        steps: [
          "The signal word is since: an action that began in 2019 and is still going on.",
          "An action from a past point up to now takes the present perfect.",
          "Lives and is living ignore the 'since'; lived would mean she no longer lives there, which does not fit since.",
        ],
        answer: "(c) has lived.",
      },
      selfCheckExample: {
        prompt: "He said that he ______ the work by Monday. (a) will finish (b) would finish (c) finishes (d) finished",
        steps: [
          "The reporting verb said is in the past.",
          "His actual words were 'I will finish'. In reported speech, will moves back to would.",
        ],
        answer: "(b) would finish.",
      },
      practiceSet: [
        { prompt: "Mathematics ______ my favourite subject. (is / are)", answer: "is", method: "the name of one subject is singular" },
        { prompt: "I ______ him yesterday. (have seen / saw)", answer: "saw", method: "yesterday takes the simple past" },
        { prompt: "Each of the boys ______ a bag. (has / have)", answer: "has", method: "each is singular" },
        { prompt: "We ______ here for two hours now. (are waiting / have been waiting)", answer: "have been waiting", method: "for + an action still going on" },
      ],
      pyqExampleId: "e482a012-aded-4b96-85e0-dcf91cc4df5f",
      traps: [
        {
          title: "Scarcely ... when, not scarcely ... than",
          body:
            "**Scarcely / Hardly** pair with **when**. **No sooner** pairs with **than**. Both openers take **had** before the subject.",
        },
        {
          title: "Present perfect never sits with yesterday",
          body:
            "'Have you seen him yesterday?' is wrong. A finished time (yesterday, last week) takes the simple past. The present perfect takes open time words: lately, ever, so far, since.",
        },
        {
          title: "A plural-looking subject can be one idea, and the reverse",
          body:
            "Twelve dozen (a quantity counted as items) takes **cost**; politics meaning political affairs takes **are**. But Mathematics, the news and Economics as subjects take **is**. Ask whether the subject means one thing or many.",
        },
      ],
    },

    // C3 — verb forms
    {
      kind: "formula" as const,
      slug: "cdsenprep-verb-forms",
      name: "Verb form after a modal, a verb or 'is': base, gerund, participle, passive",
      intuition:
        "Look at the word just before the blank. It decides the form. A modal (can, should, must, needn't) is followed by the base verb. Verbs like enjoy and dislike are followed by -ing. Is, are, was followed by a verb whose subject receives the action need the past participle: the passive.",
      definition:
        "The terms:\n" +
        "- **Modal**: can, could, should, must, may, need. It is followed by the base verb (should leave).\n" +
        "- **Gerund**: the -ing form used as a noun (enjoy swimming, dislike having to wait).\n" +
        "- **Past participle**: the third form (written, affected, expected).\n" +
        "- **Passive**: be + past participle, when the subject receives the action (The report is written by him).\n" +
        "The method:\n" +
        "- After a modal → base verb.\n" +
        "- After enjoy, dislike, avoid, mind, finish, try (meaning test out) → -ing.\n" +
        "- After is / are / was / were, if the subject does not do the action → past participle.\n" +
        "- **needn't** = it is not necessary; **mustn't** = it is not allowed.\n" +
        "Items tested this way:\n" +
        "- your brother needn't go just yet (2018 I); Davis is not sure whether he should leave (2023 II)\n" +
        "- Honesty is written on his face (2021 II); Reading ability is affected by speech disorders (2024 I); The damage is expected to be extensive (2024 II)\n" +
        "- Have you ever tried climbing a coconut tree? (2021 II); He dislikes having to punish his friends (2021 II)",
      authoredExample: {
        prompt: "He really enjoys ______ cricket in the evening. (a) to play (b) playing (c) play (d) played",
        steps: [
          "The word before the blank is enjoys.",
          "Enjoy is one of the verbs followed by the -ing form.",
          "So the answer is playing. 'Enjoys to play' and 'enjoys play' are wrong.",
        ],
        answer: "(b) playing.",
      },
      selfCheckExample: {
        prompt: "You ______ bring an umbrella; the forecast says it will be sunny all day. (a) mustn't (b) needn't (c) shouldn't (d) can't",
        steps: [
          "The meaning: an umbrella is not necessary.",
          "Not necessary = needn't.",
          "Mustn't would forbid it, which is too strong; nobody is forbidding an umbrella.",
        ],
        answer: "(b) needn't.",
      },
      practiceSet: [
        { prompt: "She can ______ very well. (sing / singing)", answer: "sing", method: "a modal takes the base verb" },
        { prompt: "The letters ______ every morning. (deliver / are delivered)", answer: "are delivered", method: "letters do not deliver; they receive the action" },
        { prompt: "I avoid ______ late at night. (to eat / eating)", answer: "eating", method: "avoid + -ing" },
        { prompt: "You ______ use your phone in the exam hall. (mustn't / needn't)", answer: "mustn't", method: "it is not allowed" },
      ],
      pyqExampleId: "0e34839e-80f8-4dc6-9d20-96ef599cfeda",
      traps: [
        {
          title: "Affect is the verb, effect is usually the noun",
          body:
            "**affect** = to influence (it affects reading). **effect** = a result (a good effect). In the passive the verb is still affect: is **affected** by. 'Is effected' means 'is brought about', a different meaning.",
        },
        {
          title: "Is expecting or is expected?",
          body:
            "Does the subject do the action or receive it? 'The damage is expected to be extensive': people expect it; the damage receives the expectation. So the passive, **is expected**.",
        },
        {
          title: "Needn't and mustn't are not the same",
          body:
            "**needn't** = no need, you may if you like. **mustn't** = do not do it. If the sentence gives a reason why something is unnecessary (the train leaves in three hours), choose needn't.",
        },
        {
          title: "Dislike having to, not dislike have to",
          body:
            "After dislike the verb takes -ing, and that includes have to: dislikes **having to** punish. An option with the base form after dislike is wrong.",
        },
      ],
    },

    // C4 — relatives and comparisons
    {
      kind: "formula" as const,
      slug: "cdsenprep-relatives-comparison",
      name: "Relative pronouns and comparisons",
      intuition:
        "A relative pronoun joins a describing clause to a noun: who for people, which for things, whose for belonging. A comparison has fixed frames: than with a comparative, too ... to, one of the + plural. Each frame accepts only one shape.",
      definition:
        "The terms:\n" +
        "- **Relative pronoun**: who (people, as subject), whom (people, as object or after a preposition), whose (belonging), which (things).\n" +
        "- **Comparative**: the -er or more form (better, greater, more than). It is followed by than.\n" +
        "The rules:\n" +
        "- **whose** + noun shows belonging: the person whose daughter married your cousin.\n" +
        "- After a preposition use **whom** or **which**: four of whom were armed.\n" +
        "- **too + adjective + to + verb** = more than enough to stop the action: too good to be true. (**so ... that** is the other frame.)\n" +
        "- **than any other + singular noun** when one item is compared with the rest of its own group.\n" +
        "- **one of the + plural noun**: one of the well-known journalists.\n" +
        "Items tested this way:\n" +
        "- the person whose daughter married your cousin (2021 I); a group of men, four of whom were armed (2024 II)\n" +
        "- The news is too good to be true (2022 I); There is nothing better than a busy life (2022 I)\n" +
        "- The portrait conveys more than it appears (2021 I); greater than any other city in India (2022 II)\n" +
        "- one of the well-known journalists in the country (2022 II)",
      authoredExample: {
        prompt: "This is the boy ______ bicycle was stolen yesterday. (a) who (b) whom (c) whose (d) which",
        steps: [
          "The blank sits before a noun, bicycle, and joins it to 'the boy'.",
          "The bicycle belongs to the boy, so we need the pronoun of belonging.",
          "Who and whom cannot sit before a noun; which is for things.",
        ],
        answer: "(c) whose.",
      },
      selfCheckExample: {
        prompt: "The box was ______ heavy to lift. (a) so (b) too (c) very (d) enough",
        steps: [
          "The frame after the blank is 'heavy to lift'.",
          "Adjective + to + verb, meaning more than enough to stop the action, takes too.",
          "So would need that (so heavy that nobody could lift it); enough comes after the adjective (heavy enough).",
        ],
        answer: "(b) too.",
      },
      practiceSet: [
        { prompt: "She is one of the best ______ in the team. (player / players)", answer: "players", method: "one of the + plural" },
        { prompt: "The students, most of ______ were tired, went home. (who / whom)", answer: "whom", method: "after a preposition (of)" },
        { prompt: "Here is the book ______ I borrowed from you. (who / which)", answer: "which", method: "a thing" },
        { prompt: "Ravi is taller ______ his brother. (then / than)", answer: "than", method: "a comparative takes than" },
      ],
      pyqExampleId: "1ade6a4b-ae4b-4948-ab22-ba3aa0dee6a8",
      traps: [
        {
          title: "Than any other, not than any",
          body:
            "When something is compared with the rest of its own group, keep **other**: Everest is higher than any **other** mountain. Without other, Everest is compared with itself too. And other takes a singular noun: any other mountain, not any other mountains.",
        },
        {
          title: "One of the + plural noun",
          body:
            "'One of the best student' is wrong; it is **one of the best students**. The one is chosen from a plural group.",
        },
        {
          title: "Who after a preposition becomes whom",
          body:
            "'Four of **whom** were armed', 'the man to **whom** I spoke'. 'Four of who' or 'four whom' (with no of) are wrong.",
        },
        {
          title: "What cannot follow a noun",
          body:
            "'The books, what are on the table, are mine' is wrong. After a noun use **which** (things) or **who** (people). What means 'the thing that' and stands alone: What you said is true.",
        },
      ],
    },
  ],
};
