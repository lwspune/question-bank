import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_CZ_SLOT_NOTE: SubtopicNote = {
  subtopicName: "Reading the Blank's Slot",
  title: "Read the Blank's Slot First: Word Class, Articles and Determiners",
  oneLineDefinition:
    "A cloze passage has many blanks. Read the whole passage once, then name the kind of word each blank needs before you think about meaning.",
  whyItMatters:
    "The cloze passage is a regular part of the CDS English paper, and each blank carries the same marks as any other question. " +
    "Most blanks are settled by grammar alone: the words around the gap allow only one kind of word. " +
    "Students who start with meaning fall for options that sound right but cannot stand in the gap.",
  concepts: [
    // C1 — the reading method: whole passage first, then the slot, then meaning
    {
      kind: "formula" as const,
      slug: "cdsencz-name-the-slot",
      name: "Read the whole sentence, then name the slot",
      intuition:
        "A blank is a hole with a fixed shape. The words on both sides decide the shape: a naming word, a describing word, an action word or an -ly word. " +
        "Find the shape first. Then only one or two options can fit, and meaning picks between them.",
      definition:
        "The terms:\n" +
        "- **Slot**: the kind of word a blank needs, read from the words on both sides of it.\n" +
        "- **Word class**: noun (a thing or an idea), adjective (describes a noun), verb (an action or a state), adverb (describes a verb or an adjective, often ends in -ly).\n" +
        "- **Word family**: one root in different classes: difficult and difficulty; observe, observant and observation.\n" +
        "The method:\n" +
        "- Read the whole passage once, quickly, before you choose anything. Get its topic and where the writer is going.\n" +
        "- At each blank, read the full sentence and the next one. Never decide on the three words next to the gap.\n" +
        "- Name the slot before you read the options. After 'the' or 'a', a noun must follow, perhaps with an adjective first. A blank between 'the' and a noun is an adjective. After 'feels', 'is' or 'seems' an adjective often follows. A word that describes a verb is an adverb.\n" +
        "- Strike every option of the wrong class. When the four options are one word family, this alone often leaves one.\n" +
        "- If two remain, read the sentence with each and keep the one the passage means.\n" +
        "- Check one or many: a plural verb after the blank, or no 'a' in front, can point to a plural noun.",
      authoredExample: {
        prompt:
          "The engineers were surprised by the ___ of the old bridge; it had stood for two hundred years without repair. (a) strong (b) strongly (c) strength (d) strengthen",
        steps: [
          "Read the whole sentence, including the part after the semicolon: the point is that the bridge lasted a very long time.",
          "Name the slot: after 'the' and before 'of', the blank needs a noun.",
          "Strike the wrong classes: strong is an adjective, strongly is an adverb, strengthen is a verb.",
          "Only strength is a noun, and it matches the meaning: the bridge lasted because it was strong.",
        ],
        answer: "(c) strength",
      },
      selfCheckExample: {
        prompt:
          "The new recruit was ___ nervous before his first parade, but he marched well. (a) visible (b) visibly (c) visibility (d) vision",
        steps: [
          "The blank sits before the adjective 'nervous' and describes it.",
          "A word that describes an adjective is an adverb.",
          "visible is an adjective; visibility and vision are nouns.",
        ],
        answer: "(b) visibly",
      },
      practiceSet: [
        { prompt: "She spoke with great ___ about her village. (confident / confidence / confidently)", answer: "confidence", method: "'great' is an adjective, so a noun follows it." },
        { prompt: "The soldiers looked ___ after the long march. (tire / tired / tiredly)", answer: "tired", method: "After 'looked' (meaning seemed), an adjective follows." },
        { prompt: "He finished the test ___ than anyone else. (quick / quicker / more quickly)", answer: "more quickly", method: "The blank describes the verb 'finished', so it must be an adverb." },
        { prompt: "The ___ of the plan surprised everyone. (simple / simplicity / simply)", answer: "simplicity", method: "After 'the' and before 'of', a noun." },
      ],
      pyqExampleId: "88e34b6c-c5a3-4c19-af7b-12c45184b4b5",
      traps: [
        {
          title: "Choosing on meaning before checking the slot",
          body:
            "Options from one word family share one meaning. elates, elating and elated all carry the same delight. Only the slot decides: 'the happiest man feels ___' needs an adjective, so **elated**. " +
            "If you start with meaning, all four look right.",
        },
        {
          title: "Stopping at the blank",
          body:
            "The words after the gap count as much as the words before it. In 'change is a ___ that never fully concludes', the words that follow show a noun for something that goes on: **process**. " +
            "Read to the end of the sentence, and often into the next one.",
        },
        {
          title: "A look-alike from another class",
          body:
            "In 'not ___ routine automatons', the blank sits before a noun, so it needs an adjective: **beastly**. beast is a noun, and bear and bare only look similar. " +
            "Check the class of each option, not just its look.",
        },
      ],
    },

    // C2 — a, an, the
    {
      kind: "formula" as const,
      slug: "cdsencz-articles",
      name: "a, an or the: sound, count and known-or-new",
      intuition:
        "An article tells the reader two things. Is this noun one of many (a, an), or a particular one we both know (the)? " +
        "The choice between a and an depends on the first sound you say, not the first letter you write.",
      definition:
        "The terms:\n" +
        "- **Article**: a, an or the, placed before a noun.\n" +
        "- **Vowel sound**: the sounds of a, e, i, o, u as you say them. 'hour' starts with a vowel sound because the h is silent; 'university' starts with a 'yu' sound, which is not a vowel sound.\n" +
        "The method:\n" +
        "- Find the noun the article goes with. If a describing word comes in between, the form of the article depends on that word: a great idea.\n" +
        "- One countable thing, new to the reader: a or an. Choose by the sound of the very next word: a useful tool, an honest man, an hour.\n" +
        "- A thing already named, the only one of its kind, or made particular by a phrase after it: the. Examples: the duty of the Government, the phrase 'education for peace'.\n" +
        "- 'such' and 'what' take a or an after them: such a course, what a day.\n" +
        "- A plural or uncountable noun used in general takes no article: Banks lend money.\n" +
        "- 'some' and 'any' are not articles. They go with a plural or uncountable noun: some books, some water.",
      authoredExample: {
        prompt:
          "Fill each blank with a, an or the: 'He waited for ___ hour at the gate. ___ guard on duty then let him in. It was ___ unusual welcome.'",
        steps: [
          "'hour': the h is silent, so the word starts with a vowel sound. One hour, new to the reader: an.",
          "'guard on duty': a particular guard, the one on duty at that gate. The phrase after the noun makes it particular: The.",
          "'unusual welcome': one welcome, new to the reader. The next word 'unusual' starts with a vowel sound: an.",
        ],
        answer: "an, The, an",
      },
      selfCheckExample: {
        prompt:
          "Choose the pair: 'She joined ___ university in Pune and studied ___ history of the Marathas.' (a) an, the (b) a, the (c) a, a (d) an, a",
        steps: [
          "'university' starts with a 'yu' sound, not a vowel sound, so a.",
          "'history of the Marathas' is a particular history, made particular by 'of the Marathas', so the.",
        ],
        answer: "(b) a, the",
      },
      practiceSet: [
        { prompt: "It was ___ honour to meet the general.", answer: "an", method: "The h in honour is silent: a vowel sound." },
        { prompt: "I have never seen such ___ calm sea.", answer: "a", method: "'such' takes a or an; calm starts with a consonant sound." },
        { prompt: "___ Ganga is the longest river in India.", answer: "The", method: "Names of rivers take the." },
        { prompt: "We bought ___ one-way ticket.", answer: "a", method: "'one' starts with a 'w' sound, not a vowel sound." },
      ],
      pyqExampleId: "2e04a55d-3464-449e-ade6-efa88c86393c",
      traps: [
        {
          title: "Going by the letter, not the sound",
          body:
            "'an university' and 'a hour' are both wrong. Say the next word aloud in your head and listen to its first sound.",
        },
        {
          title: "Matching the article to the noun, not the next word",
          body:
            "In 'It sounds like ___ great idea', idea starts with a vowel, but the word right after the blank is great. So **a**, not an.",
        },
        {
          title: "Using some for one countable thing",
          body:
            "'such some course' and 'some course' do not work for one course. After 'such', a single countable noun takes **a**: such a course.",
        },
      ],
    },

    // C3 — determiners and pronouns agree with their noun
    {
      kind: "formula" as const,
      slug: "cdsencz-determiners-pronouns",
      name: "this, these, those, any, no and pronouns agree with the noun they point to",
      intuition:
        "Words like this, these, that, those, any and no point to a noun, and they must match it: this with one thing, these with many. " +
        "A pronoun must match the noun it stands for in the same way.",
      definition:
        "The terms:\n" +
        "- **Determiner**: a word before a noun that says which one or how many: this, that, these, those, any, no, all, some.\n" +
        "- **Agreement in number**: singular goes with singular, plural with plural.\n" +
        "- **Pronoun reference**: a pronoun (it, its, they, their, themselves) must match the noun it refers back to.\n" +
        "The method:\n" +
        "- Find the noun after the blank. One thing: this or that. Many: these or those.\n" +
        "- Near, or just mentioned: this, these. Farther, or picked out by a phrase after it ('those with more equal outcomes'): that, those.\n" +
        "- After not or never, or in a question: any ('could not find any difference').\n" +
        "- To say 'not a single one' with a positive verb: no ('no society will ever reach ...').\n" +
        "- For a pronoun, find the noun it refers back to. Plural people or things: they, their, themselves. One thing: it, its.\n" +
        "- 'commit oneself to', 'pride oneself on': the object is the same person as the subject, so a -self word is needed.\n" +
        "- Strike options that cannot point at a noun at all: where, which and but cannot stand before a noun in this way.",
      authoredExample: {
        prompt:
          "Fill both blanks: 'The cadets polished ___ boots. ___ cadet was allowed to march in dirty ones.' First blank: its / his / their. Second blank: Any / No / Those.",
        steps: [
          "First blank: the pronoun refers back to 'cadets', which is plural. So their, not its or his.",
          "Second blank: the noun 'cadet' is singular, so 'Those' is out.",
          "The verb 'was allowed' is positive, and the meaning is 'not a single cadet'. That calls for No. 'Any cadet was allowed' says the opposite.",
        ],
        answer: "their; No",
      },
      selfCheckExample: {
        prompt:
          "I asked at three shops but could not find ___ battery of this size. (a) no (b) some (c) any (d) these",
        steps: [
          "The sentence already has 'not', so 'no' would make a double negative.",
          "'these' needs a plural noun; battery is singular.",
          "After not, use any.",
        ],
        answer: "(c) any",
      },
      practiceSet: [
        { prompt: "___ book on the table is mine. (This / These)", answer: "This", method: "book is singular." },
        { prompt: "The team trained hard and prided ___ on its discipline. (it / itself)", answer: "itself", method: "The team is treated as one ('its'), and the object is the team again." },
        { prompt: "Of all the plans, ___ that cost less were chosen. (these / those)", answer: "those", method: "Picked out by the phrase after it: 'that cost less'." },
        { prompt: "I don't have ___ money left. (some / any)", answer: "any", method: "After not, any." },
      ],
      pyqExampleId: "880e6bda-8f05-40c4-9c08-189f839cfba6",
      traps: [
        {
          title: "this before a plural noun",
          body:
            "'If scientists have discovered how this patterns work' can slip past a fast reader. patterns is plural, so **these**. Always look at the noun after the blank.",
        },
        {
          title: "any where the meaning is 'not one'",
          body:
            "'Arguably, ___ society will ever reach total equality' has a positive verb, but it means not a single society. That is **no**. any needs a negative or a question before it.",
        },
        {
          title: "them where the subject acts on itself",
          body:
            "'the courage to commit ___ to two major innovations': the founders commit themselves, so **themselves**, not them.",
        },
        {
          title: "its for a plural noun",
          body:
            "'between the organisms and ___ physical environment' refers back to organisms, which is plural. So **their**, not its.",
        },
      ],
    },
  ],
};
