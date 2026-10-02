import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A sentence-improvement item: the underlined part, three replacements and (d) No improvement. */
const si = (before: string, under: string, after: string, a: string, b: string, c: string): string =>
  `Choose the best replacement for the underlined part. ${before}${u(under)}${after} (a) ${a} (b) ${b} (c) ${c} (d) No improvement`;

export const CDSEN_SEA_SENTENCE_IMPROVEMENT_NOTE: SubtopicNote = {
  subtopicName: "Sentence Improvement",
  title: "Sentence improvement: test each option in the sentence",
  oneLineDefinition:
    "A sentence with one part underlined and three possible replacements: put each option into the sentence, read it whole, and keep the original (No improvement) when it is already right.",
  whyItMatters:
    "Sentence improvement was a full section of the 2017 (I) paper and came back in 2024 (II). The rules it tests are the same as in spotting errors: tense, agreement, prepositions and word choice. " +
    "What is new is the format. You must judge three replacements as well as the original, and 'No improvement' is a real answer, not a last resort.",
  concepts: [
    // C1 — when the underlined part is already right
    {
      kind: "formula" as const,
      slug: "cdsensea-si-no-improvement",
      name: "When the underlined part is already right",
      intuition:
        "In a sentence-improvement item, the underlined part may be wrong, or it may be the best choice already. The three options are written to look like improvements. " +
        "Some are wrong, some are only different. Your job is to decide whether any option makes the sentence **better**, not just whether it changes it.",
      definition:
        "**The method:**\n" +
        "- Read the whole sentence first, with the underlined part as printed. Run the usual checks: time marker, agreement, preposition, word choice.\n" +
        "- If the original passes every check, it is a candidate for **No improvement**.\n" +
        "- Now put each option into the sentence and read the **whole sentence** again. An option must fit the words around it, not just make sense alone.\n" +
        "- Reject an option that is wrong, awkward, or only a **synonym** with no gain ('occurring' for 'happening').\n" +
        "- Choose **No improvement** when the original is correct and no option is clearly better.",
      authoredExample: {
        prompt: si("She ", "has been teaching", " at this school since 2010.", "taught", "was teaching", "had taught"),
        steps: [
          "Check the original: 'since 2010' runs from a past point up to now, so the present perfect continuous 'has been teaching' fits.",
          "(a) 'She taught at this school since 2010': the simple past cannot go with 'since' + up to now. Wrong.",
          "(b) 'was teaching' and (c) 'had taught' both place the action wholly in the past. Wrong.",
          "The original is right and no option is better.",
        ],
        answer: "(d) No improvement.",
      },
      selfCheckExample: {
        prompt: si("He ", "is knowing", " the answer to every question in the book.", "knows", "has been knowing", "was knowing"),
        steps: [
          "'Know' is a verb of mental state. It is not used in the continuous (-ing) form.",
          "So the original 'is knowing' is wrong, and so are (b) and (c), which also use -ing.",
          "(a) 'He knows the answer' fits.",
        ],
        answer: "(a) knows.",
      },
      practiceSet: [
        { prompt: "Improve if needed: 'The match was **called off** because of the rain.' (a) called out (b) called up (c) called on", answer: "No improvement.", method: "called off = cancelled" },
        { prompt: "Improve if needed: 'He **has gone** to Mumbai last week.' (a) went (b) had gone (c) was going", answer: "(a) went", method: "'last week' takes the simple past" },
        { prompt: "Improve if needed: 'We **discussed** the plan at length.' (a) discussed about (b) discussed on (c) discussed over", answer: "No improvement.", method: "'discuss' takes no preposition" },
        { prompt: "Improve if needed: 'She **lent** me her notes before the exam.' (a) borrowed (b) loaned out (c) gave away", answer: "No improvement.", method: "the owner lends; the other person borrows" },
      ],
      pyqExampleId: "de604c80-a64e-4929-8641-848b1f061e34",
      traps: [
        {
          title: "A synonym is not an improvement",
          body: "If the original says 'mishaps are happening' and an option offers 'occurring', the option is no better. Pick an option only when it fixes something wrong or clearly weak.",
        },
        {
          title: "Read the option inside the sentence",
          body: "'Let' looks like a fine replacement for 'allow', but 'They allowed me to leave' becomes 'They let me to leave', which is wrong: 'let' takes the base verb without 'to'. Always read the full sentence with the option in place.",
        },
        {
          title: "Look-alike forms are the usual decoys",
          body: "For a correct phrase such as 'wide-ranging discussions', the options are near-twins: 'widely-ranged', 'wide-ranged', 'wide-range'. They look plausible but are not standard. Keep the form you know.",
        },
        {
          title: "Check the words outside the underline",
          body: "The clue that decides the answer is often outside the underlined part: 'yesterday', 'since 2010', 'by 8.00'. Read the whole sentence before judging the underlined words.",
        },
      ],
    },

    // C2 — improving the verb
    {
      kind: "formula" as const,
      slug: "cdsensea-si-verb",
      name: "Improving the verb: tense and agreement",
      intuition:
        "Most sentence-improvement items with an error underline a verb. The fix is found by asking two questions: **when** does the action happen, compared with the time words and other verbs? And **who** is the real subject?",
      definition:
        "**Tense rules the 2017 (I) paper tested:**\n" +
        "- After **till, until, when, before, after, if**, use the present for a future action, not 'will': 'Wait till I **come** back.'\n" +
        "- **By + a past time** → past perfect: 'By noon he **had finished**.'\n" +
        "- The **earlier** of two past actions takes the past perfect when the order matters: 'He disappeared after he **had rescued** the boy.'\n" +
        "- A finished period in the past ('for ten years when I was a child') takes the simple past: 'I **lived** there for ten years.'\n" +
        "- **Third conditional** (an unreal past): 'If he had come, he **would have** seen it.' **But for** = 'if it had not been for', and takes the same result: 'But for the rain, we **would have** won.'\n" +
        "- A **stative verb** describes a state, not an action: exist, know, belong, own, contain, seem. It is not used in the -ing form: 'does not **exist**'.\n" +
        "**Agreement:** 'along with', 'together with', 'with' and 'as well as' do not add to the subject. 'The teacher, along with her children, **was** ...'.",
      authoredExample: {
        prompt: si("If he had left on time, he ", "would catch", " the train.", "would have caught", "will catch", "had caught"),
        steps: [
          "'If he had left' is about the past, and it did not happen. That is an unreal past condition: the third conditional.",
          "The result of a third conditional is 'would have' + past participle.",
          "(b) 'will catch' is for a real future; (c) 'had caught' puts the past perfect in both halves.",
          "(a) 'would have caught' completes the pattern.",
        ],
        answer: "(a) would have caught.",
      },
      selfCheckExample: {
        prompt: si("The captain, together with his players, ", "have arrived", " at the ground.", "has arrived", "are arriving", "have been arriving"),
        steps: [
          "Find the real subject: 'The captain'. 'Together with his players' is an added phrase and does not change the number.",
          "A singular subject takes 'has'.",
          "Only (a) gives a singular verb in the right tense.",
        ],
        answer: "(a) has arrived.",
      },
      practiceSet: [
        { prompt: "Improve: 'Wait here till I **will come** back.' (a) come (b) came (c) shall come", answer: "(a) come", method: "No 'will' after till" },
        { prompt: "Improve: 'This old house **is belonging** to my uncle.' (a) belongs (b) has belonged (c) was belonging", answer: "(a) belongs", method: "'belong' is stative" },
        { prompt: "Improve if needed: 'After she **finished** her homework, she went out to play.' (a) has finished (b) was finishing (c) finishes", answer: "No improvement.", method: "'After' already shows the order, so the simple past is fine." },
        { prompt: "Improve: 'But for your help yesterday, I **would fail** the test.' (a) would have failed (b) will fail (c) had failed", answer: "(a) would have failed", method: "'But for' + a past event takes 'would have'." },
      ],
      pyqExampleId: "7a5fb33e-26ce-4d36-8470-bd47876d9e92",
      traps: [
        {
          title: "No 'will' after till, when or before",
          body: "In English the future is not repeated inside a time clause: 'I'll call you when I **reach**', 'Go on till you **reach** the river'. An option with 'will' inside the time clause is wrong.",
        },
        {
          title: "'Ought to have' is not a conditional result",
          body: "'Ought to have' and 'should have' mean a duty that was not done. After an unreal condition (if ... had, but for ...), the result is 'would have'.",
        },
        {
          title: "Stative verbs reject the -ing form",
          body: "'Is not existing', 'is knowing', 'is belonging' are all wrong. These verbs describe a state, so the simple form is used: 'does not exist', 'knows', 'belongs'.",
        },
        {
          title: "'Along with' does not make a plural",
          body: "'The chairman, with the other members, **is** touring'. The phrase after 'with' or 'along with' is extra information. The verb agrees with the first noun.",
        },
      ],
    },
  ],
};
