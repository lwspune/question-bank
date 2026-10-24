import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EFB_BLANKS_NOTE: SubtopicNote = {
  subtopicName: "Sentence Fill-in-Blanks",
  title: "Sentence Fill-in-Blanks",
  oneLineDefinition:
    "A single sentence with one blank (sometimes two) and four options; the right word fits both the grammar of the slot and the meaning the rest of the sentence points to.",
  whyItMatters:
    "Thirty-four questions in the bank, 16 from the 2023 shifts, 7 from the 2024 shifts and 11 from the 2025 shifts, with 29 EASY and 5 MODERATE. The 2025 questions use harder words, but every one is decided by a clue word in the sentence or by the grammar of the gap.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscefbbl-meaning",
      name: "Reading the clue in the sentence",
      intuition:
        "Every sentence carries a clue to the missing word: a word that means the same, a contrast word such as although or far from, or a result such as so ... that. Find the clue first and the blank's meaning follows; then pick the option that says it.",
      definition:
        "- **Same-direction clues** (and, so, because, which means): the blank agrees with the clue. \"Short and ___\" wants a word like concise.\n" +
        "- **Contrast clues** (although, but, far from, while): the blank goes against the clue. \"Although carefully designed, unforeseen factors ___ the result\" wants a negative word.\n" +
        "- **Result clues** (so ... that, such ... that): the blank is what the first part leads to.\n" +
        "- **Naming questions** (the young one of a lion, a female horse, the fear of heights) test a fixed word you either know or do not; learn the common sets.\n" +
        "- **Fast route:** cover the options, say a word of your own for the blank, then pick the option nearest to it.",
      authoredExample: {
        prompt: "Fill in the blank: Although the team had trained hard all season, a string of injuries ___ their chances in the final. (a) improved (b) damaged (c) doubled (d) celebrated",
        steps: [
          "\"Although\" sets up a contrast with hard training.",
          "So the injuries must have hurt their chances: damaged.",
        ],
        answer: "(b) damaged",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: The speech was so ___ that half the audience fell asleep. (a) lively (b) tedious (c) brief (d) witty",
        steps: ["\"So ... that half the audience fell asleep\" needs a word meaning boring.", "Tedious means long and dull."],
        answer: "(b) tedious",
      },
      practiceSet: [
        { prompt: "What is the young one of a cow called?", answer: "A calf" },
        { prompt: "What is the fear of closed spaces called?", answer: "Claustrophobia" },
        { prompt: "In \"Far from being careless, she was ___ in her work\", should the blank agree with careless or go against it?", answer: "Go against it: a word like careful or thorough." },
        { prompt: "Fill in the blank: People who lived at the same time are called ___.", answer: "Contemporaries" },
      ],
      pyqExampleId: "0f88ab96-d648-4e3e-b886-8f502c191828",
      traps: [
        {
          title: "Missing a contrast word",
          body:
            "Although, while, but and far from turn the meaning round. A word that agrees with the first half of such a sentence is usually the trap.",
        },
        {
          title: "Picking a word that only sounds right",
          body:
            "Options are often look-alikes (conform and confirm, cheque and cheek). Read each option's meaning, not its sound, before you choose.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscefbbl-pairs",
      name: "Words that go together",
      intuition:
        "Some words simply go together in English: a doctor prescribes medicine, one has a narrow escape, one confirms a booking. These pairings are fixed, so a word with the right meaning can still be wrong if it does not pair with its neighbour.",
      definition:
        "- **Verb and object:** prescribe a medicine, confirm a ticket, quell dissent, take one's hat off to someone.\n" +
        "- **Adjective and noun:** a narrow escape, incessant rain, a runaway convict.\n" +
        "- Two options may mean nearly the same thing; only one is the usual pairing.\n" +
        "- **Fast route:** read the blank with its neighbour aloud. The fixed pair sounds familiar; the others sound odd.",
      authoredExample: {
        prompt: "Fill in the blank: The judge ___ the man to five years in prison. (a) awarded (b) sentenced (c) ordered (d) gave",
        steps: ["A court sentences a person to a term in prison.", "\"Sentenced to five years\" is the fixed pairing."],
        answer: "(b) sentenced",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: We had to ___ a decision before the meeting ended. (a) do (b) take (c) give (d) put",
        steps: ["In English one takes (or makes) a decision.", "Do, give and put do not pair with decision."],
        answer: "(b) take",
      },
      practiceSet: [
        { prompt: "Which verb goes with \"a complaint\": lodge or deposit?", answer: "Lodge" },
        { prompt: "Complete the fixed phrase: a ___ escape (only just avoiding harm).", answer: "Narrow" },
        { prompt: "Which verb goes with \"a promise\": keep or hold?", answer: "Keep" },
        { prompt: "Complete the phrase: to pay ___ to someone (to praise them publicly).", answer: "Tribute" },
      ],
      pyqExampleId: "5631ffff-9117-4f62-8a2b-5c031a30d8f1",
      traps: [
        {
          title: "Choosing by meaning alone",
          body:
            "Advised and prescribed both relate to a doctor's guidance, but a doctor prescribes tablets. When two options mean similar things, pick the one that pairs with the next word.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscefbbl-grammar",
      name: "The grammar of the blank",
      intuition:
        "Some blanks are decided before meaning matters: the word before or after the gap demands a certain form. A noun needs an adjective in front of it; the word than needs a comparative; a sentence that opens with rarely needs inverted word order.",
      definition:
        "- **Before a noun:** an adjective (a neighbouring country, not a neighbour country).\n" +
        "- **After the or a:** a noun. **After had:** a past participle (had clipped).\n" +
        "- **Than:** needs a comparative (more, less, -er). **As ... as:** for equality in a positive sentence.\n" +
        "- **Negative openers** (rarely, never, seldom, hardly) put the helping verb before the subject: \"Rarely has there been ...\".\n" +
        "- **Agreement:** a singular subject takes a singular verb (\"a powder that looks\"); a plural subject a plural one.\n" +
        "- **Fast route:** look at the words just before and just after the gap first; they usually strike two options at once.",
      authoredExample: {
        prompt: "Fill in the blank: Seldom ___ such a crowd at the village fair. (a) we have seen (b) have we seen (c) we saw (d) seen we have",
        steps: ["Seldom at the start of a sentence takes inverted order: the helping verb comes before the subject.", "So: Seldom have we seen."],
        answer: "(b) have we seen",
      },
      selfCheckExample: {
        prompt: "Fill in the blank: This road is ___ than the one we took yesterday. (a) more narrow (b) narrower (c) most narrow (d) narrowest",
        steps: ["Than needs a comparative.", "A two-syllable word ending in -ow takes -er: narrower."],
        answer: "(b) narrower",
      },
      practiceSet: [
        { prompt: "Which form follows \"had\" in a past perfect verb: written or wrote?", answer: "Written" },
        { prompt: "Which word fits before the noun \"town\": neighbouring or neighbour's?", answer: "Neighbouring" },
        { prompt: "Fill in the blank: Never ___ such a fine performance. (a) I have seen (b) have I seen", answer: "(b) have I seen" },
        { prompt: "Fill in the blank: She is as tall ___ her brother.", answer: "as" },
      ],
      pyqExampleId: "0ece2e6e-7bc7-4bcf-a49f-80f5a33ce464",
      traps: [
        {
          title: "Keeping normal word order after a negative opener",
          body:
            "\"Rarely there has been\" is wrong. After rarely, seldom, never or hardly at the start, the helping verb comes before the subject.",
        },
        {
          title: "Using so ... as in a positive sentence",
          body:
            "\"She is so beautiful as a peacock\" is wrong. Equality in a positive sentence uses as ... as.",
        },
      ],
    },
  ],
};
