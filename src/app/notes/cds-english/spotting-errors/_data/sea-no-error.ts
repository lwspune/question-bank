import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEA_NO_ERROR_NOTE: SubtopicNote = {
  subtopicName: "No Error (Correct Sentence)",
  title: "No error: proving a sentence is correct",
  oneLineDefinition:
    "How to choose option (d) No error with confidence: run every part of the sentence through a fixed checklist, and pick (d) only when every check passes.",
  whyItMatters:
    "'No error' is the right answer on roughly one CDS spotting-errors item in six, but some papers have none at all, so it is neither rare nor a safe guess. " +
    "The sentences are often short and plain, which tempts you to hunt for a hidden fault, and a few look wrong but are right. This page turns each rule into a check you can run in seconds.",
  concepts: [
    // C1 — agreement and pronoun checks
    {
      kind: "formula" as const,
      slug: "cdsensea-ne-agreement",
      name: "Agreement and pronoun checks",
      intuition:
        "The first check on any sentence is **subject-verb agreement**: a singular subject takes a singular verb, a plural subject a plural verb. The agreement page teaches it in full. " +
        "Here the point is the reverse: some subjects look as if they break the rule but do not. Learn those, so you do not mark a correct sentence wrong.",
      definition:
        "**Agreement checks** (a sentence that passes all of them is fine on agreement):\n" +
        "- Match each verb to its **head noun**, not the nearest noun.\n" +
        "- **Latin and Greek plurals** are plural: memoranda, criteria, phenomena, media. 'The memoranda **are** ...' is right.\n" +
        "- Two nouns under one 'my' or 'the' that name **one person** take a singular verb: 'My friend and benefactor **has** come.'\n" +
        "- **either ... or / neither ... nor**: the verb agrees with the **nearer** subject: 'Either you or he **is** ...'.\n" +
        "- A **collective noun** (group, team, committee) acting as one unit is singular: 'A group of tourists **has** arrived.'\n" +
        "- A **what-clause** as subject is singular: 'What students need **is** practice.'\n" +
        "**Pronoun checks:**\n" +
        "- A **relative pronoun** joins a describing clause to a noun: **who** for people, **which** for things and animals, **that** for either.\n" +
        "- Name the subject once. 'A man who has lived here **he** will ...' gives the verb two subjects; drop 'he'.",
      authoredExample: {
        prompt: item("Bread and butter", "is", "my usual breakfast."),
        steps: [
          "Read the whole sentence. 'Bread and butter is' may look like a plural subject with a singular verb.",
          "Part (a): 'bread and butter' names one dish, not two separate things. One idea takes a singular verb.",
          "Part (b): 'is' agrees with that one dish. Part (c): 'my usual breakfast' is a correct complement.",
          "Every part passes every check, so the answer is (d).",
        ],
        answer: "(d) No error. 'Bread and butter' is one dish, so 'is' is correct.",
      },
      selfCheckExample: {
        prompt: item("The tourists,", "which had come from Japan,", "visited the fort."),
        steps: [
          "Agreement: 'The tourists ... visited': past tense, no number problem.",
          "Pronoun check: 'which' refers to 'the tourists', who are people.",
          "People take 'who'. The error sits in part (b).",
        ],
        answer: "(b). The tourists, **who** had come from Japan, visited the fort.",
      },
      practiceSet: [
        { prompt: "Error or no error? 'The criteria for selection are strict.'", answer: "No error.", method: "'Criteria' is the plural of 'criterion'." },
        { prompt: "Error or no error? 'The committee has given its report.'", answer: "No error.", method: "The committee acts as one unit." },
        { prompt: "Error or no error? 'The boy who won the prize he is my cousin.'", answer: "Error: drop 'he'. The boy who won the prize **is** my cousin.", method: "The subject is named once." },
        { prompt: "Error or no error? 'What we need most is more time.'", answer: "No error.", method: "A what-clause subject is singular." },
      ],
      pyqExampleId: "d53114c6-5af5-4ad8-bd36-3fefbaab42ed",
      traps: [
        {
          title: "A sentence can sound odd and still be right",
          body: "'Either he or I **am** mistaken' sounds strange, because 'am' follows two people. But the verb agrees with the nearer subject, 'I', so it is correct. Test the rule; do not trust the sound.",
        },
        {
          title: "'Which' for a person",
          body: "'Our gardener, which is very lazy' is an error, even though the rest of the sentence is fine. Check every 'which' and 'who': is the noun before it a person or a thing?",
        },
        {
          title: "A subject said twice",
          body: "When a long 'who' clause separates the subject from its verb, a pronoun sometimes creeps in: 'a man who has lived here for years **he** will never ...'. The verb already has its subject. The extra 'he' is the error.",
        },
        {
          title: "Short sentences invite over-thinking",
          body: "'All of them speak good English' and 'Their belongings were lost in the fire' are simply correct. If every check passes, choose (d) and move on; inventing an error costs a third of a mark.",
        },
      ],
    },

    // C2 — tense checks
    {
      kind: "formula" as const,
      slug: "cdsensea-ne-tense",
      name: "Tense checks against the time marker",
      intuition:
        "A **time marker** is a word or phrase that fixes when something happens: today, a few years ago, for twenty years, when he was interviewed. " +
        "Each marker allows only certain tenses. Find the marker, then check that the verb fits it. If it fits, the tense is fine.",
      definition:
        "**Match the verb to the marker:**\n" +
        "- **today, now, these days** → present: 'Today she **is** a singer.'\n" +
        "- **ago, yesterday, last year, in 2010** → simple past: 'I **went** there a few years ago.' Never the present perfect.\n" +
        "- **for / since** + a period reaching up to now → present perfect: 'They **have been** married for twenty years.'\n" +
        "- An action already **in progress** when another past event happened → past continuous: 'He **was suffering** from fever when he was interviewed.'\n" +
        "- **Past perfect** (had + past participle) needs a **later past point** to be 'before': 'She **had left** when I arrived.'\n" +
        "- Two past actions told in order both take the simple past: 'She had a book but didn't read it.'\n" +
        "**Questions:** asking someone's home or origin uses the simple present: 'Where **do you come** from?' 'Where are you coming from?' asks about today's journey.",
      authoredExample: {
        prompt: item("I have known", "Ravi", "since we were at school."),
        steps: [
          "Find the time marker: 'since we were at school', a starting point in the past that runs up to now.",
          "A period from a point up to now takes the present perfect. 'Have known' is the present perfect.",
          "'Were' inside the since-clause is right: being at school is over.",
          "Every part passes, so the answer is (d).",
        ],
        answer: "(d) No error.",
      },
      selfCheckExample: {
        prompt: item("She lived", "in Delhi", "since 2015."),
        steps: [
          "Time marker: 'since 2015', a point in the past that runs up to now.",
          "That needs the present perfect, 'has lived', not the simple past.",
          "The wrong verb sits in part (a), even though the marker that proves it sits in (c).",
        ],
        answer: "(a). She **has lived** in Delhi since 2015.",
      },
      practiceSet: [
        { prompt: "Error or no error? 'I met him two days ago.'", answer: "No error.", method: "'Ago' takes the simple past." },
        { prompt: "Error or no error? 'I have met him yesterday.'", answer: "Error: I **met** him yesterday.", method: "'Yesterday' never takes the present perfect." },
        { prompt: "Error or no error? 'Today he is a famous doctor because he worked hard in his youth.'", answer: "No error.", method: "Each verb fits its own marker." },
        { prompt: "Error or no error? 'The phone rang while I had a bath.'", answer: "Error: while I **was having** a bath.", method: "The bath was in progress when the phone rang." },
      ],
      pyqExampleId: "faddb5db-92f2-4844-8ce3-e162f7d97055",
      traps: [
        {
          title: "'Today' with a past verb",
          body: "'Today she was an accomplished singer' looks fine because the sentence also talks about her youth. But each verb answers to its own marker: 'today' needs 'is'; 'in her youth' allows 'had trained'.",
        },
        {
          title: "Simple past for a state that was going on",
          body: "If an illness, a job or an activity was already going on when something else happened, use the past continuous: 'was suffering', 'was working'. The simple past makes it sound like a single finished event.",
        },
        {
          title: "Where do you come from?",
          body: "'Where are you coming from?' is correct English for a journey ('from the market'). When the next sentence asks about nationality, the question is about origin, and English uses 'Where **do you come** from?'.",
        },
        {
          title: "Past perfect with nothing after it",
          body: "The past perfect means 'before another past moment'. If the sentence names no later past moment, the simple past is usually what is needed.",
        },
      ],
    },

    // C3 — word, idiom and determiner checks
    {
      kind: "reference" as const,
      slug: "cdsensea-ne-words",
      name: "Word, idiom and determiner checks",
      intuition:
        "Some correct sentences contain an idiom that sounds silly, a rare word, or a fixed phrase that looks like a mistake. " +
        "These are the items where students most often reject a correct sentence. Know the expressions below, and you will recognise them as correct.",
      definition:
        "What to check, and what is correct:\n" +
        "- An **idiom** is a fixed phrase whose meaning is not the sum of its words: 'raining cats and dogs' = raining very heavily. If it is in its standard form, it is correct.\n" +
        "- A **rare word** is not an error. If it fits the meaning (quotidian = everyday), it is right.\n" +
        "- A **determiner** (another, each, one) sets the noun's form: 'another' + a singular noun; 'one ... **one's** own'.\n" +
        "- A **modal** (can, could, must) takes the base verb: 'couldn't **find**'.\n" +
        "- A **reflexive pronoun** (myself, herself) is right when the subject acts on itself: 'She forced **herself** to eat.'",
      table: {
        columns: ["Correct expression", "Why it is correct", "Sitting"],
        rows: [
          { cells: ["It was raining cats and dogs.", "A standard idiom: raining very heavily", "2017 (I)"], pyqExampleId: "fdd53677-d6f0-46f9-9def-ea633f3d7e32" },
          { cells: ["Tell him to take another photograph of the group.", "'another' + a singular noun", "2017 (I)"], pyqExampleId: "d9d5bd67-a35a-4d8b-9152-6ccc325c7896" },
          { cells: ["He couldn't find an answer.", "A modal takes the base verb; 'an' before a vowel sound", "2017 (I)"], pyqExampleId: "b9a5df48-beb8-4685-bfdf-b26888d4139d" },
          { cells: ["Are you through with that newspaper?", "'through with' = finished with", "2017 (II)"], pyqExampleId: "dfbad29e-09b7-4322-9af3-44e16ae9194c" },
          { cells: ["It's no secret that the President wants a second term.", "'It's no secret that' = everyone knows that", "2018 (I)"], pyqExampleId: "6648511b-99dc-45dd-ac9d-a25356ab223d" },
          { cells: ["The legendary hero laid down his precious life for our country.", "'lay down one's life' = die for a cause; past: laid down", "2018 (II)"], pyqExampleId: "7fe74d48-5a4a-4044-b067-cd9669d36f57" },
          { cells: ["India won by an innings and three runs.", "The standard cricket result phrase", "2019 (I)"], pyqExampleId: "5f0b960d-35d3-4a7c-8a58-18552041d0e2" },
          { cells: ["One must not boast of one's own success.", "'one' is followed by 'one's'; 'boast of' is the fixed partner", "2023 (I)"], pyqExampleId: "c4583bde-ca32-4313-b69b-dd1dae53501f" },
          { cells: ["She forced herself to eat.", "Reflexive pronoun: she acts on herself", "2024 (I)"], pyqExampleId: "f1c45147-43f6-4d1d-8e04-83bab5147b68" },
          { cells: ["In your quotidian life you wouldn't find an elephant in the supermarket.", "'quotidian' = everyday, ordinary", "2026 (II)"], pyqExampleId: "c3f948da-4f6c-47b8-9e3a-c4721f01b3b7" },
        ],
        caption: "Every sentence in this table was a 'No error' item: the right answer was (d).",
      },
      pyqExampleId: "7fe74d48-5a4a-4044-b067-cd9669d36f57",
      selfCheckExample: {
        prompt: item("He is", "fed up with", "the constant noise."),
        steps: [
          "'Fed up with' is an idiom meaning 'tired of, annoyed by'. It is in its standard form.",
          "'He is fed up' agrees: singular subject, singular verb.",
          "Every part passes, so the answer is (d).",
        ],
        answer: "(d) No error.",
      },
      practiceSet: [
        { prompt: "Error or no error? 'One should keep one's promises.'", answer: "No error." },
        { prompt: "Error or no error? 'Can I have another two minutes?'", answer: "No error.", method: "'another' + a number + plural noun is standard: another two minutes." },
        { prompt: "Error or no error? 'He couldn't found the key.'", answer: "Error: He couldn't **find** the key.", method: "A modal takes the base verb." },
        { prompt: "What does 'quotidian' mean?", answer: "Everyday, ordinary." },
      ],
      traps: [
        {
          title: "A silly-sounding idiom is still correct",
          body: "'Raining cats and dogs', 'through with', 'it's no secret': none of these means what its words say, but each is standard English. Do not mark an idiom wrong because it is not literal.",
        },
        {
          title: "Laid down his life is right",
          body: "'Lay down' (to give up, put down) is a transitive verb, and its past is 'laid'. A hero **laid down** his life. Do not confuse it with 'lie down' (rest), whose past is 'lay'.",
        },
        {
          title: "A rare word is not a wrong word",
          body: "If you do not know a word, you cannot use it as evidence of an error. Check the grammar around it; if that passes, the word is probably right.",
        },
      ],
    },

    // C4 — preposition, connector and comparison checks
    {
      kind: "formula" as const,
      slug: "cdsensea-ne-structure",
      name: "Preposition, connector and comparison checks",
      intuition:
        "The last checks cover the small words that join things: prepositions, linking words and comparisons. Each has a fixed form, taught on the earlier pages of this chapter. " +
        "On a 'No error' item they all pass. Run them quickly and in order, and trust the result.",
      definition:
        "**The final checks:**\n" +
        "- **Preposition:** does each preposition match the word before it? waited **for**, dream **of**, agree **with** an idea, succeed **in**. A verb such as 'emphasise' takes no preposition at all.\n" +
        "- **-ing after a preposition:** a verb after a preposition is in the -ing form: dreamed of **being**, by **putting**.\n" +
        "- **Connector:** does the linking word give the right relation? 'so' for a result, 'unless' (= if not) with a **positive** verb, 'after which' to continue.\n" +
        "- **Comparison:** are both sides of the comparison the same kind of thing? 'likes Geography more than **he likes History**'.\n" +
        "- **Lists:** are all the items in the same form? buy, pick up **and** prepare.\n" +
        "If all of these pass, and the agreement, tense and word checks passed too, choose **(d) No error**.",
      authoredExample: {
        prompt: item("He succeeded", "in climbing the peak", "before the storm arrived."),
        steps: [
          "Preposition: 'succeed' takes 'in'. Correct.",
          "After 'in', the verb is in the -ing form: 'climbing'. Correct.",
          "Connector and tense: 'before the storm arrived' is a past time clause after a past main verb. Correct.",
          "Every check passes, so the answer is (d).",
        ],
        answer: "(d) No error.",
      },
      selfCheckExample: {
        prompt: item("She is", "good at solving puzzles", "and to write short stories."),
        steps: [
          "Preposition: 'good at' + -ing, 'solving'. Correct.",
          "List: 'at solving puzzles and to write stories'. The two items are joined by 'and', so they must match.",
          "'To write' breaks the pattern; it should be 'writing'. The error sits in part (c).",
        ],
        answer: "(c). She is good at solving puzzles and **writing** short stories.",
      },
      practiceSet: [
        { prompt: "Error or no error? 'Divide the work between the two of you.'", answer: "No error.", method: "Two people: between." },
        { prompt: "Error or no error? 'He emphasised on the need for silence.'", answer: "Error: He **emphasised the need** for silence.", method: "'Emphasise' takes no preposition." },
        { prompt: "Error or no error? 'You will not be admitted unless you have a pass.'", answer: "No error.", method: "'Unless' + a positive verb." },
        { prompt: "Error or no error? 'He likes swimming, running and to cycle.'", answer: "Error: swimming, running and **cycling**.", method: "Items in a list match." },
      ],
      pyqExampleId: "ecd83851-4ddf-426a-97d1-a0281f5a244f",
      traps: [
        {
          title: "A correct preposition can look wrong",
          body: "'I don't agree with smacking children' is right: you agree **with** an idea or an action, and agree **to** a proposal. Check the pair against what you know, not against how often you have heard it.",
        },
        {
          title: "'Unless' with a positive verb is correct",
          body: "'Children are not allowed in unless they are with an adult' is right. 'Unless' already carries the 'not', so the verb after it stays positive.",
        },
        {
          title: "'Emphasise the need for' has no extra preposition",
          body: "'Emphasised the need **for** strict discipline' is right: the 'for' belongs to 'need', not to 'emphasise'. Do not mistake it for the error 'emphasised on'.",
        },
      ],
    },
  ],
};
