import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESE_STRUCTURE_NOTE: SubtopicNote = {
  subtopicName: "Connectors and Word Order",
  title: "Connectors and Word Order",
  oneLineDefinition:
    "Joining words that come in fixed pairs, the parallel halves those pairs join, and the sentences that change the usual word order.",
  whyItMatters:
    "Thirty-six questions in the bank, 23 of them from the 2025 shifts, which set long formal sentences built on pairs such as not only ... but also and on openers such as no sooner, little and it was not until. Five of the 36 are HARD, more than on any other page here.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesst-pairs",
      name: "Paired connectors and parallel halves",
      intuition:
        "Some joining words come in fixed pairs: no sooner ... than, hardly ... when, not only ... but also, neither ... nor. And the two halves a pair joins must have the same form: a noun with a noun, a verb with a verb, a phrase with a phrase.",
      definition:
        "- **Fixed pairs:** no sooner ... than; hardly or scarcely ... when; not only ... but also; either ... or; neither ... nor; both ... and; whether ... or; so ... that; such ... that.\n" +
        "- **Lest** means \"so that ... not\": it takes should or the base form, and never not or may: \"lest he should fall\".\n" +
        "- **Parallel halves:** \"not only sings but also dances\"; \"partly to X and partly to Y\".\n" +
        "- **Place the first word right:** it stands just before the first of the two matching parts.\n" +
        "- **Adverbs cannot join clauses:** nevertheless, however and therefore need a full stop, a semicolon or a conjunction before them.\n" +
        "- **When and while:** when for a single moment, while for an action going on.",
      authoredExample: {
        prompt: "Find the part with the error: (a) She not only (b) sings well (c) but also a good dancer. (d) No error",
        steps: [
          "\"Not only\" is followed by a verb, \"sings well\".",
          "So \"but also\" must be followed by a verb too: \"but also dances well\".",
        ],
        answer: "(c) but also a good dancer",
      },
      selfCheckExample: {
        prompt: "Choose the correct option: Hardly had the bell rung ___ the children ran out. (a) than (b) when (c) then (d) that",
        steps: ["Hardly pairs with when.", "Than belongs with no sooner, not with hardly."],
        answer: "(b) when",
      },
      practiceSet: [
        { prompt: "Complete the pair: Neither the book ___ the pen is mine.", answer: "nor" },
        { prompt: "Correct the sentence: Walk carefully lest you should not slip.", answer: "Walk carefully lest you should slip." },
        { prompt: "Complete: It was such a hot day ___ we stayed indoors.", answer: "that" },
        { prompt: "Correct the sentence: It rained heavily nevertheless we went out.", answer: "It rained heavily; nevertheless, we went out." },
      ],
      pyqExampleId: "a3dcdf3d-c885-4dac-84ca-0df3239803b3",
      traps: [
        {
          title: "The wrong partner for no sooner",
          body: "No sooner always takes than; hardly and scarcely take when. \"No sooner ... when\" and \"no sooner ... that\" are errors.",
        },
        {
          title: "Unbalanced halves",
          body: "\"He likes not only to sing but also dancing\" joins an infinitive to an -ing form. Make both halves the same: to sing and to dance.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesst-order",
      name: "Word order: indirect questions, inversion and negatives",
      intuition:
        "Some sentences break the usual order. An indirect question keeps statement order (where she lives, not where does she live). A sentence that opens with a negative word (rarely, little, seldom) puts the helping verb before the subject. And one negative is enough: hardly anything, not hardly nothing.",
      definition:
        "- **Indirect questions:** after know, tell me, asked or wonder, the subject comes before the verb and do or did drops out: \"Can you tell me when the bank opens?\"\n" +
        "- **Negative openers invert:** hardly, scarcely, rarely, seldom, little, never and no sooner: \"Little did he know\", \"Rarely have I seen\".\n" +
        "- **One negative only:** hardly, scarcely, rarely and no one are already negative, so \"hardly anything\", not \"hardly nothing\".\n" +
        "- **Cleft sentences** use that: \"It was in Delhi that we met\", \"It was not until he left that I knew\".\n" +
        "- **No matter how** + adverb + subject + verb: \"no matter how hard you try\".\n" +
        "- **Question tags** use the sentence's helping verb and a pronoun: \"She has a car, doesn't she?\"\n" +
        "- **Describing clauses** sit next to the noun they describe.",
      authoredExample: {
        prompt: "Find the part with the error: (a) Seldom we have seen (b) such heavy rain (c) in this town. (d) No error",
        steps: [
          "Seldom is a negative opener, so the helping verb comes before the subject.",
          "It should read \"Seldom have we seen such heavy rain\".",
        ],
        answer: "(a) Seldom we have seen",
      },
      selfCheckExample: {
        prompt:
          "Choose the correct option: Can you tell me ___? (a) when does the bank open (b) when the bank opens (c) when opens the bank (d) when did the bank open",
        steps: ["This is an indirect question inside \"Can you tell me\".", "It takes statement order with no does: \"when the bank opens\"."],
        answer: "(b) when the bank opens",
      },
      practiceSet: [
        { prompt: "Correct the sentence: I asked him what was his name.", answer: "I asked him what his name was." },
        { prompt: "Correct the sentence: He hardly knows nobody here.", answer: "He hardly knows anybody here." },
        { prompt: "Add the tag: You are coming, ___?", answer: "aren't you?" },
        { prompt: "Correct the sentence: It was in Pune where I met her.", answer: "It was in Pune that I met her." },
      ],
      pyqExampleId: "610acff8-88a9-4a3c-af8a-ef0eaa829ff5",
      traps: [
        {
          title: "Inverting an indirect question",
          body: "\"Do you know where does she live?\" turns a reported question back into a direct one. Inside another sentence it is \"where she lives\".",
        },
        {
          title: "Not inverting after a negative opener",
          body: "\"Never I have seen\" and \"Little he knew\" are wrong; the helping verb moves in front: \"Never have I seen\", \"Little did he know\".",
        },
      ],
    },
  ],
};
