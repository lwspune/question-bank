import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCA_WORD_HUNTS_NOTE: SubtopicNote = {
  subtopicName: "Word Hunts, Antonyms and Word Forms",
  title: "Find the Word, Its Opposite and Its Form",
  oneLineDefinition:
    "Some word questions turn the task around: they give a meaning and ask which passage word carries it, or ask for a word's opposite or another form of it. Test each option in its own sentence before you choose.",
  whyItMatters:
    "Word hunts look easy, but all four options are real passage words, so 'it is in the passage' proves nothing. " +
    "The marks go to the student who checks each option's meaning in its own sentence. " +
    "Antonym and word-form items add one more step: fix the meaning first, then reverse it or change its class.",
  concepts: [
    // C1 — find the passage word
    {
      kind: "formula" as const,
      slug: "cdsenrca-word-hunt",
      name: "Find the passage word: test each option in its own sentence",
      intuition:
        "In a word hunt every option comes from the passage. So read each option in its own sentence and ask one question: " +
        "could the stem's word stand in its place without changing the meaning?",
      definition:
        "The terms:\n" +
        "- **Word hunt**: 'Which word in the passage means X?' The answer is the passage word that means X.\n" +
        "- **Reverse forms**: the stem gives a description and asks for the term ('This effect is called ...'), or gives a blank to fill with a passage word.\n" +
        "The method:\n" +
        "- Say the stem word's meaning in plain words: 'tendency' = the way things usually go.\n" +
        "- Find each option in the passage and read its sentence.\n" +
        "- Ask: in that sentence, could I put the stem word in its place? Keep the option where it fits.\n" +
        "- Two options may belong to the same family of ideas and both sound close. Only one means the stem word exactly; a related word is not a synonym.\n" +
        "- Check the part of speech: if the stem word is a noun, the answer is usually a noun; an adverb rarely answers for a noun.",
      authoredExample: {
        prompt:
          "The general was a modest man. He rarely spoke of his victories and gave the credit to his soldiers. Yet in battle he was resolute: once he had decided on a plan, nothing could shake him. " +
          "Which word in the passage means 'firm and determined'? (a) modest (b) rarely (c) resolute (d) credit",
        steps: [
          "Meaning of the stem: not changing one's mind, fixed on a goal.",
          "Test each in its sentence: 'modest' = humble; 'rarely' = seldom; 'credit' = praise.",
          "'resolute: once he had decided on a plan, nothing could shake him'. Firm and determined fits.",
        ],
        answer: "(c) resolute",
      },
      selfCheckExample: {
        prompt:
          "The drought lasted three years. Crops withered, cattle grew thin, and the scarcity of water drove many families away. " +
          "Which word in the passage means 'shortage'? (a) drought (b) withered (c) scarcity (d) thin",
        steps: [
          "'drought' is close: a long time without rain. But it is the event, not the shortage itself.",
          "'withered' and 'thin' describe crops and cattle.",
          "'the scarcity of water' = the shortage of water. It fits in place.",
        ],
        answer: "(c) scarcity",
      },
      practiceSet: [
        {
          prompt: "Passage words: ancient, swift, fragile, vast. Which means 'easily broken'?",
          answer: "fragile",
        },
        {
          prompt: "Passage words: commence, halt, endure, abandon. Which means 'stop'?",
          answer: "halt",
        },
        {
          prompt: "'The fear of closed spaces is called ___.' Choose: claustrophobia / hydrophobia / acrophobia.",
          answer: "claustrophobia",
          method: "A reverse form: description first, term second.",
        },
        {
          prompt: "The stem word is 'brave' (an adjective). Passage words: courage, courageous, coward, caution. Which?",
          answer: "courageous",
          method: "Same part of speech: courage is a noun.",
        },
      ],
      pyqExampleId: "3974d84e-f3a3-4627-b20b-6ddf12877a6c",
      traps: [
        {
          title: "A related word, not a synonym",
          body:
            "Asked which pair of passage words describes enemies of the caterpillar, a student may pick 'predator and host'. " +
            "The host is the plant the leaf miner lives inside, related to the caterpillar but not an enemy. **Predator and marauding** both describe attackers.",
        },
        {
          title: "The wrong part of speech",
          body:
            "Which passage word means 'bias'? 'Uncomprehendingly' is an adverb and 'contrary' an adjective. 'Bias' is a noun, and the passage's noun is **prejudice**: 'without the prejudice of the right or of the left'.",
        },
        {
          title: "The general word for the exact one",
          body:
            "Whole areas of forests are 'cleared to gain new land'. The effect is called **deforestation**. 'Devastation' is wide destruction of any kind; it does not name what happens to forests.",
        },
      ],
    },

    // C2 — antonyms in context
    {
      kind: "formula" as const,
      slug: "cdsenrca-antonyms",
      name: "Antonyms in context: fix the meaning first, then reverse it",
      intuition:
        "An antonym question in a passage has two steps: fix what the word means in its sentence, then find the option that means the reverse. " +
        "The usual trap is a synonym among the options. It is close to the word, so it feels right.",
      definition:
        "The method:\n" +
        "- Find the word in its sentence and say its meaning in plain words.\n" +
        "- Say the opposite in plain words before you look at the options.\n" +
        "- Strike any option that means the same as the word: it is a synonym, not an antonym.\n" +
        "- Strike options that only rhyme with the word or look like it.\n" +
        "- For 'which two words mean the opposite of X', both words must carry the opposite meaning: 'parts' against 'whole'.\n" +
        "- For an idea word, think of the idea: contrast shows difference, so its opposite shows likeness.",
      authoredExample: {
        prompt:
          "Line: 'The old map was so obscure that even the guide could not read the route.' The antonym of 'obscure' is (a) unclear (b) clear (c) old (d) hidden",
        steps: [
          "In its sentence, obscure means hard to read or understand: even the guide could not read it.",
          "The opposite in plain words: easy to read, clear.",
          "Strike (a) and (d): they mean the same as obscure. (c) is not about meaning at all.",
        ],
        answer: "(b) clear",
      },
      selfCheckExample: {
        prompt:
          "Line: 'His reply was brief: two words, and he left the room.' The antonym of 'brief' is (a) short (b) lengthy (c) rude (d) quick",
        steps: [
          "Brief means short: two words.",
          "Strike (a), a synonym, and (d), which is close to it.",
          "(c) describes manner, not length. The opposite of short is lengthy.",
        ],
        answer: "(b) lengthy",
      },
      practiceSet: [
        {
          prompt: "Antonym of 'scarce': plentiful / few / costly?",
          answer: "plentiful",
        },
        {
          prompt: "Antonym of 'hostile': friendly / unfriendly / angry?",
          answer: "friendly",
          method: "'unfriendly' and 'angry' are close to hostile.",
        },
        {
          prompt: "Antonym of 'expand': grow / shrink / spread?",
          answer: "shrink",
        },
        {
          prompt: "Which two words mean the opposite of 'many': few, scarce, numerous, plenty?",
          answer: "few and scarce",
          method: "Both must carry the opposite meaning.",
        },
      ],
      pyqExampleId: "785fbf27-e9e3-4697-be08-f5c90682d93f",
      traps: [
        {
          title: "The synonym among the options",
          body:
            "Scholars say the groups did not form a '**resistant**' style. The antonym is **pliant** (yielding). 'Defiant' is a synonym of resistant, and 'hesitant' and 'persistent' only rhyme with it.",
        },
        {
          title: "A near-synonym that sounds negative",
          body:
            "Over-population 'has largely **diluted** the fruits of the remarkable economic progress'. Diluted means weakened, so the antonym is **consolidated**. " +
            "'Cheapened' sounds like the right kind of word, but it is close to diluted, not its reverse.",
        },
        {
          title: "Missing the opposite of an idea",
          body:
            "The opposite of 'contrast' is not a negative word like 'discredited'. Contrast shows difference, so its opposite is the passage's '**analogy**', which shows likeness.",
        },
        {
          title: "Half a pair",
          body:
            "For the opposite of 'whole', both words must mean parts: **components and dimensions**. 'Phenomena and programmes' are passage words, but neither means a part.",
        },
      ],
    },

    // C3 — word forms
    {
      kind: "formula" as const,
      slug: "cdsenrca-word-forms",
      name: "Word forms: noun, verb, adjective from one root",
      intuition:
        "Many English words grow from one root: settle, settler, settlement, settled. A word-form question asks which class a form belongs to, or which form fits a slot. " +
        "Look at the word's ending and at its job in its sentence.",
      definition:
        "The terms:\n" +
        "- **Root**: the base word: comprehend, subvert, settle.\n" +
        "- **Suffix**: an ending that changes the class. -ment, -ion, -ness, -er make nouns; -ive, -ful, -ous make adjectives; -ly makes adverbs.\n" +
        "- **Prefix**: a beginning that changes the meaning: un- means not.\n" +
        "The method:\n" +
        "- Find the word's job in its sentence: does it name (noun), describe a noun (adjective), act (verb) or describe an action (adverb)?\n" +
        "- A word ending in -ed placed before a noun ('a painted wall') is working as an adjective.\n" +
        "- To find a noun form, try the endings -ion, -ment, -ness, -ity, and check that the word exists.\n" +
        "- To read a long word, split it: un + comprehend + ing + ly = in a way that does not understand.\n" +
        "- Watch for a look-alike that is a different word: subvention is not the noun of subversive.",
      authoredExample: {
        prompt:
          "Which is the noun form of 'decisive'? (a) decide (b) deciding (c) decision (d) decided",
        steps: [
          "'decisive' ends in -ive: an adjective. The root is decide.",
          "A noun ending: -ion gives decision, a real word.",
          "decide is the verb; deciding is an -ing form of the verb; decided is the past form.",
        ],
        answer: "(c) decision",
      },
      selfCheckExample: {
        prompt:
          "Line: 'She looked at the letter unbelievingly.' 'unbelievingly' means (a) with full belief (b) in a way that does not believe (c) without reading (d) happily",
        steps: [
          "Split it: un + believe + ing + ly.",
          "un- = not; believing; -ly = in a way. So: in a way that does not believe.",
          "(a) drops the un-; (c) and (d) do not come from the parts.",
        ],
        answer: "(b) in a way that does not believe",
      },
      practiceSet: [
        {
          prompt: "Noun form of 'arrive'?",
          answer: "arrival",
        },
        {
          prompt: "In 'a broken chair', what class is 'broken'?",
          answer: "An adjective.",
          method: "It describes the noun chair.",
        },
        {
          prompt: "Adjective form of 'danger'?",
          answer: "dangerous",
        },
        {
          prompt: "Which form of 'paint' names a person: painter / painted / painting?",
          answer: "painter",
          method: "-er names the doer.",
        },
      ],
      pyqExampleId: "b4df19dd-dd2a-42b9-b049-6b57925faee2",
      traps: [
        {
          title: "A look-alike that is another word",
          body:
            "The noun form of 'subversive' is **subversion**. 'Subvention' looks like it but is a different word: a grant of money.",
        },
        {
          title: "Taking the -ing form as the noun",
          body:
            "'Subverting' is an -ing form of the verb subvert. When a question asks for the noun form, look for the established noun ending: -ion, -ment, -ness.",
        },
        {
          title: "Dropping the un-",
          body:
            "'When we yield **uncomprehendingly** to environment ...' means without understanding. 'With complete knowledge' is the trap for a reader who drops the un-.",
        },
      ],
    },
  ],
};
