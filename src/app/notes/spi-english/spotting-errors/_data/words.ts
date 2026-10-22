import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const SPI_SE_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Pronouns, Comparisons and Connectors",
  title: "Pronouns, Comparisons and Connectors",
  oneLineDefinition:
    "After the verb and the preposition, check the smaller words: the pronoun's form, the comparing word, the pairs of joining words, and whether each word makes sense.",
  whyItMatters:
    "Six questions in the bank test these words, one of them from the 2022 paper. Two are EASY and four MODERATE. Each rule is short, so these are quick marks once the rule is known.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spisewo-forms",
      name: "Who or whom, and one comparing form",
      intuition:
        "A pronoun changes its form with its job. 'Who' does the action; 'whom' has the action done to it. " +
        "A comparing word also has fixed forms: tall, taller, tallest. Adding 'more' or 'most' to a word that already ends in -er or -est uses the comparison twice.",
      definition:
        "Pronouns:\n" +
        "- **who** and **whoever** do the action of the next verb: 'Whoever comes first wins.'\n" +
        "- **whom** and **whomever** receive it: 'The girl whom we met was kind.'\n" +
        "- After a preposition, use the object form: 'between you and **me**', 'to **whom** I spoke'.\n" +
        "- When a preposition stands before a whole clause, the pronoun takes its job from the clause: 'Give it to **whoever** wants it' (whoever wants).\n\n" +
        "Comparisons:\n" +
        "- Short words add -er and -est: taller, tallest. Long words use more and most: more careful, most careful.\n" +
        "- **Never both**: 'more taller' and 'most kindest' are wrong.\n" +
        "- Use the -er form for two things and the -est form for three or more.",
      table: {
        columns: ["Point", "Wrong", "Right"],
        rows: [
          { cells: ["one superlative only", "the most kindest", "the kindest"] },
          { cells: ["one comparative only", "more taller", "taller"] },
          { cells: ["than after a comparative", "better from", "better than"] },
          { cells: ["two things take the -er form", "the tallest of the two", "the taller of the two"] },
          { cells: ["who does the next verb", "whom is coming?", "who is coming?"] },
          { cells: ["whom after a preposition", "to who I spoke", "to whom I spoke"] },
          {
            cells: ["whoever when it does the next verb", "give it to whomever wants it", "give it to whoever wants it"],
            noteAmber: "The pronoun is the doer of 'wants', so it is whoever.",
          },
          { cells: ["object form after between", "between you and I", "between you and me"] },
        ],
        caption: "To choose who or whom, find the verb right after it. If the pronoun does that verb, it is who.",
      },
      pyqExampleId: "73b0be5a-b3e1-4fff-b1a7-b6d094074b64",
      selfCheckExample: {
        prompt: item("Of the two sisters,", "Meena is the more taller", "one."),
        steps: [
          "'Taller' already compares, so 'more' uses the comparison twice.",
          "Two sisters means the -er form is right; only 'more' must go.",
          "The correct sentence: Of the two sisters, Meena is the taller one.",
        ],
        answer: "(b) Meena is the more taller",
      },
      practiceSet: [
        { prompt: "Correct the sentence: 'This is the most cleverest boy in the class.'", answer: "This is the cleverest boy in the class." },
        {
          prompt: "Choose: 'The prize goes to (whoever / whomever) finishes first.'",
          answer: "whoever",
          method: "The pronoun is the doer of 'finishes'.",
        },
        { prompt: "Correct the sentence: 'Keep this secret between you and I.'", answer: "Keep this secret between you and me." },
        { prompt: "Choose: 'The doctor (who / whom) we visited was kind.'", answer: "whom" },
      ],
      traps: [
        {
          title: "Two comparing words in a row",
          body:
            "'More' and '-er' do the same job, and so do 'most' and '-est'. Use one of them: 'the brightest star', never 'the most brightest star'.",
        },
        {
          title: "The verb after the pronoun decides who or whoever",
          body:
            "A preposition before the pronoun does not force 'whom'. In 'Speak to whoever is in charge', the pronoun is the doer of 'is', so it stays whoever.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spisewo-pairs",
      name: "Joining words that come in pairs",
      intuition:
        "Some joining words always come with a fixed partner later in the sentence. If the first word is printed, check that its partner is the right one. " +
        "Some words go the other way: 'though' already joins two ideas, so a 'but' after it is one joining word too many.",
      definition:
        "The pairs:\n" +
        "- **No sooner** ... **than**: 'No sooner did the bell ring than the boys ran out.'\n" +
        "- **Hardly** or **scarcely** ... **when**: 'Hardly had we sat down when the lights went out.'\n" +
        "- **Though** or **although** ... no **but** (a 'yet' is allowed): 'Though it was late, we kept working.'\n" +
        "- **Not only** ... **but also**, **either** ... **or**, **neither** ... **nor**, **both** ... **and**.",
      table: {
        columns: ["First word", "Partner", "Correct example"],
        rows: [
          { cells: ["no sooner", "than", "No sooner did the bell ring than the boys ran out."] },
          { cells: ["hardly, scarcely", "when", "Hardly had we sat down when the lights went out."] },
          {
            cells: ["though, although", "no but (yet is allowed)", "Though it was late, we kept working."],
            noteAmber: "'Although he was tired, but he went on' is wrong.",
          },
          { cells: ["not only", "but also", "She is not only clever but also kind."] },
          { cells: ["either", "or", "Either you or I must go."] },
          { cells: ["neither", "nor", "Neither the bat nor the ball was found."] },
          { cells: ["both", "and", "Both Raj and Anu came."] },
        ],
        caption: "No sooner goes with than; hardly and scarcely go with when. Swapping them is the usual error.",
      },
      pyqExampleId: "eed9ca9f-0a3b-4a89-9b4b-fe942544c85f",
      selfCheckExample: {
        prompt: item("Hardly had the guests arrived", "than it", "started to rain."),
        steps: [
          "'Hardly' is partnered by 'when', not 'than'.",
          "The correct sentence: Hardly had the guests arrived when it started to rain.",
        ],
        answer: "(b) than it",
      },
      practiceSet: [
        {
          prompt: "Correct the sentence: 'Although he was tired, but he finished the race.'",
          answer: "Although he was tired, he finished the race.",
          method: "'Although' already joins the two ideas, so 'but' must go.",
        },
        { prompt: "Correct the sentence: 'Neither my brother or my sister likes milk.'", answer: "Neither my brother nor my sister likes milk." },
        { prompt: "Complete: 'No sooner had the bus stopped ___ we got in.'", answer: "than" },
        { prompt: "Correct the sentence: 'Both Amit as well as Rohan were absent.'", answer: "Both Amit and Rohan were absent." },
      ],
      traps: [
        {
          title: "No sooner takes than, hardly takes when",
          body:
            "The two look alike in meaning, so their partners get swapped. 'No sooner ... when' and 'hardly ... than' are both errors.",
        },
        {
          title: "Though needs no but",
          body:
            "'Though' and 'but' both join two opposite ideas, so using both doubles the joining word. Keep one: 'Though he is poor, he is honest' or 'He is poor, but he is honest'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spisewo-sense",
      name: "Words that must make sense",
      intuition:
        "Some errors are not grammar at all. The sentence is built correctly but one word says something impossible, or a look-alike word has taken the place of the right one. " +
        "Read each part for its meaning as well as its grammar.",
      definition:
        "Check these:\n" +
        "- A word for a number must fit the number: a **pair** is two, a **dozen** is twelve.\n" +
        "- Group words are fixed: a **pack** of wolves or wild dogs, a **herd** of cattle or elephants, a **flock** of sheep or birds.\n" +
        "- Look-alike words: **too** means also or more than enough; **to** means towards or comes before a verb.",
      table: {
        columns: ["Word", "Means", "Correct example"],
        rows: [
          { cells: ["a pair", "two", "a pair of shoes"], noteAmber: "A pair can never be three or more." },
          { cells: ["a dozen", "twelve", "a dozen eggs"] },
          { cells: ["a pack", "a group of wolves or wild dogs", "a pack of wolves"] },
          { cells: ["a herd", "a group of cattle or elephants", "a herd of elephants"] },
          { cells: ["a flock", "a group of sheep or birds", "a flock of sheep"] },
          { cells: ["too", "also, or more than enough", "I am hungry too. The tea is too hot."] },
          { cells: ["to", "towards, or before a verb", "I went to school to learn."] },
        ],
        caption: "If a part says something that cannot be true, that part holds the error.",
      },
      pyqExampleId: "afd5239b-8b25-452d-a304-8dba763d02fd",
      selfCheckExample: {
        prompt: item("A flock of", "cows was grazing", "near the river."),
        steps: [
          "A flock is a group of sheep or birds. Cows come in a herd.",
          "The correct sentence: A herd of cows was grazing near the river.",
        ],
        answer: "(a) A flock of",
      },
      practiceSet: [
        { prompt: "Which word names a group of wolves: herd, pack or flock?", answer: "pack" },
        { prompt: "Correct the sentence: 'This bag is to heavy for me.'", answer: "This bag is too heavy for me." },
        { prompt: "Which word names a group of sheep: herd, pack or flock?", answer: "flock" },
        { prompt: "Correct the sentence: 'My brother wants to come to.'", answer: "My brother wants to come too." },
      ],
      traps: [
        {
          title: "Read for meaning, not only for grammar",
          body:
            "A part can be grammatical and still be the error because it says something impossible, such as 'a herd of parrots'. Ask whether each part can be true.",
        },
        {
          title: "To and too",
          body:
            "'Too' means also or more than enough; 'to' does not. 'The road is to narrow' is wrong; write 'too narrow'.",
        },
      ],
    },
  ],
};
