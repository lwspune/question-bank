import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_ENG_USAGE_NOTE: SubtopicNote = {
  subtopicName: "Sentences and Usage",
  title: "Sentence Roles, Common Errors, Vocabulary and Language Families",
  oneLineDefinition:
    "Name the job each word does in a sentence, avoid the errors examiners plant, read new words from their context, and know how Europe's languages group into families.",
  whyItMatters:
    "The two Cambridge questions in this chapter (2020 and 2022) asked which language does not belong to a family, Romance in one and Slavic in the other. Sentence roles and common errors are the ground any grammar item stands on.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-eng-parts-of-speech",
      name: "Parts of speech and sentence roles: subject, object and clauses",
      intuition:
        "A word's part of speech is what kind of word it is; its role is the job it does in this particular sentence. The same word can change kind: 'a test' is a noun, 'to test' is a verb. Find the verb first, then ask who or what does it (the subject) and who or what receives it (the object).",
      definition:
        "- The **subject** does the action of an active verb (or receives it in a passive one), and the verb agrees with it.\n" +
        "- The **direct object** receives the action. The **indirect object** is the person or thing it is done for or to. In 'She gave the patient a leaflet', the leaflet is the direct object and the patient the indirect object.\n" +
        "- A **clause** has its own subject and verb. A **main clause** can stand alone; a **subordinate clause** depends on it and usually starts with a word such as because, although, if, when, which, who.\n" +
        "- A **relative clause** (who, which, that, whose) describes a noun: 'the nurse **who works at night**'.",
      table: {
        columns: ["Part of speech", "Job", "Examples"],
        rows: [
          { cells: ["Noun", "Names a person, thing, place or idea", "doctor, cell, Rome, freedom"] },
          { cells: ["Pronoun", "Stands in place of a noun", "she, it, them, who, which"] },
          { cells: ["Verb", "Expresses an action or a state", "analyse, is, seems"] },
          { cells: ["Adjective", "Describes a noun", "rapid, chronic, red"] },
          { cells: ["Adverb", "Describes a verb, an adjective or another adverb", "rapidly, very, often"] },
          { cells: ["Preposition", "Links a noun to the rest of the sentence (place, time, relation)", "in, on, by, during"] },
          { cells: ["Conjunction", "Joins words or clauses", "and, but, because, although"] },
          { cells: ["Article or determiner", "Comes before a noun and limits it", "a, the, this, some"] },
        ],
      },
      selfCheckExample: {
        prompt: "In the sentence 'The nurse who works at night gave the child a blanket', what is the direct object?",
        options: ["The nurse", "at night", "the child", "a blanket", "who works at night"],
        steps: [
          "The main verb is 'gave'. What was given? A blanket: that is the direct object. D.",
          "The child is who it was given to: the indirect object, the tempting wrong answer.",
          "'The nurse' is the subject; 'who works at night' is a relative clause describing the nurse; 'at night' is a phrase of time inside that clause.",
        ],
        answer: "(D) a blanket",
      },
      practiceSet: [
        { prompt: "Find the subject: 'In the corner stood an old microscope.'", answer: "an old microscope", method: "What stood? The microscope; the word order is inverted" },
        { prompt: "What part of speech is 'fast' in 'She runs fast'?", answer: "Adverb: it describes how she runs." },
        { prompt: "Is 'because the lab was closed' a main or a subordinate clause?", answer: "Subordinate: it cannot stand alone." },
      ],
      traps: [
        {
          title: "The subject is not always the first noun",
          body: "In 'In the corner stood an old microscope' or 'The results of the test were clear', the first noun is not the subject. Find what the verb agrees with: 'results were', not 'test was'.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eng-common-errors",
      name: "Common errors: agreement, pronouns, its and it's, who and whom, fewer and less",
      intuition:
        "Grammar items usually test a short list of errors that native speakers also make. Each has a quick test you can run in your head, so you do not need to rely on what sounds right.",
      definition:
        "- **Agreement**: the verb agrees with the head noun of its subject, not with the nearest noun. 'The list of names **is** long.'\n" +
        "- **Each, every, everyone, either, neither** take a singular verb in careful English.\n" +
        "- **Pronoun reference**: a pronoun must point clearly to one noun. 'When the doctor met the patient, she smiled' is unclear: who smiled?\n" +
        "- **Quick tests**: expand **it's** to 'it is' or 'it has'; replace **who** or **whom** with he or him; ask whether you can count the thing one by one (**fewer**) or only measure it (**less**).",
      table: {
        columns: ["Rule", "Correct use", "Quick test", "Example"],
        rows: [
          { cells: ["its or it's", "its = belonging to it; it's = it is or it has", "Say 'it is': if it fits, write it's", "The cell lost its nucleus. It's late."] },
          { cells: ["who or whom", "who = subject; whom = object, often after a preposition", "he → who, him → whom", "Who called? To whom did you write?"] },
          { cells: ["fewer or less", "fewer with plural nouns you can count; less with things you measure", "Can you count them one by one?", "fewer patients, less blood"] },
          { cells: ["Subject and verb", "The verb agrees with the head noun", "Cover the 'of ...' phrase", "The box of samples is ready."] },
          { cells: ["Each, neither, everyone", "Singular verb", "Read as 'each one'", "Each of the students has a locker."] },
          { cells: ["their, there, they're", "belonging to them; a place; they are", "Expand they're to 'they are'", "They're in their room over there."] },
          { cells: ["affect or effect", "affect is usually a verb; effect is usually a noun", "Can 'the' go in front? Then effect", "Stress affects sleep; it has an effect on sleep."] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following sentences is grammatically correct?",
        options: [
          "The results of the experiment was published last week.",
          "There are less students in the lab today.",
          "The committee, whom met yesterday, approved the plan.",
          "The virus changes it's surface proteins.",
          "Neither of the samples shows any sign of contamination.",
        ],
        steps: [
          "E: 'neither' takes a singular verb, and 'shows' is singular. Correct.",
          "A: the head noun is 'results', so 'were published'. B: students can be counted, so 'fewer students'.",
          "C: the relative pronoun is the subject of 'met' (he met, not him met), so 'who' (or 'which' for a committee). D: 'it is surface proteins' makes no sense, so 'its'.",
        ],
        answer: "(E) Neither of the samples shows any sign of contamination.",
      },
      practiceSet: [
        { prompt: "Choose: 'The number of cases (has / have) fallen.'", answer: "has", method: "The head noun is 'number', which is singular" },
        { prompt: "Choose: '(Who / Whom) did you invite?'", answer: "Whom", method: "You invited him: object" },
        { prompt: "Choose: '(Fewer / Less) than ten people came.'", answer: "Fewer", method: "People can be counted" },
        { prompt: "Choose: 'The company changed (its / it's) name.'", answer: "its", method: "'It is name' makes no sense" },
      ],
      traps: [
        {
          title: "Less with things you can count",
          body: "'Less patients' is a common error: patients can be counted, so it is 'fewer patients'. 'Less' goes with things measured rather than counted: less water, less time. Everyday English does say 'less than ten euros' or 'less than five kilometres', treating the amount as a single quantity.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-eng-vocab",
      name: "Vocabulary in context: working out an unknown word",
      intuition:
        "In an exam you will meet words you have never seen. The sentence around the word, the word's parts (prefix, root, suffix) and words it resembles in languages you know usually give enough to choose among five options. Resemblance can also mislead, so always check your guess against the sentence.",
      definition:
        "- **Context clues**: a definition in brackets or after a comma; an example ('such as'); a contrast ('but', 'unlike', 'although'); a cause or a result ('so', 'because').\n" +
        "- **Prefixes**: un-, in-, dis- (not); pre- (before); post- (after); hyper- (over, above normal); hypo- (under, below normal); anti- and contra- (against).\n" +
        "- **Roots and suffixes** common in medicine: cardi- (heart), derm- (skin), hepat- (liver), nephr- and ren- (kidney); -itis (inflammation), -ectomy (removal), -ology (study of).\n" +
        "- **Cognates**: many English words share Latin roots with Italian, Spanish or French (hepatic, epatico). **False friends** look the same but mean something else: 'eventually' means in the end, not possibly; 'actually' means in fact, not currently; 'sensible' means reasonable, not sensitive.",
      authoredExample: {
        prompt:
          "Work out the meaning of the underlined word: 'This drug is \\(\\underline{\\text{contraindicated}}\\) in pregnancy, so doctors prescribe a different one to pregnant women.'",
        steps: [
          "Parts: contra- means against; 'indicated', in medicine, means recommended. So: recommended against.",
          "Context: the clause after 'so' shows the result. Doctors choose a different drug for pregnant women, which means this one should not be used for them.",
          "Both clues agree.",
        ],
        answer: "It should not be used in that situation (here, in pregnancy).",
      },
      selfCheckExample: {
        prompt:
          "'Although the early symptoms were mild, the disease later became \\(\\underline{\\text{debilitating}}\\), and many patients could no longer work.' The underlined word most nearly means:",
        options: ["infectious", "causing great weakness", "easy to treat", "without symptoms", "lasting a short time"],
        steps: [
          "Contrast signal: 'Although the early symptoms were mild' means the later stage was severe.",
          "Result: 'many patients could no longer work'. The disease made people too weak to work. B.",
          "A is a possible property of a disease but does not follow from the sentence. C, D and E point the wrong way: they make the disease milder, not worse.",
        ],
        answer: "(B) causing great weakness",
      },
      practiceSet: [
        { prompt: "What does 'hepatitis' mean, from its parts?", answer: "Inflammation of the liver.", method: "hepat- (liver) + -itis (inflammation)" },
        { prompt: "What does 'eventually' mean in English?", answer: "In the end, finally (not 'possibly')." },
        {
          prompt: "'Unlike his gregarious brother, Paolo preferred to be alone.' What does 'gregarious' mean?",
          answer: "Sociable, fond of company.",
          method: "The contrast with 'preferred to be alone'",
        },
      ],
      traps: [
        {
          title: "False friends",
          body: "'Eventually' means in the end, 'actually' means in fact, 'sensible' means reasonable, and a 'library' lends books rather than selling them. A word that looks like one in Italian, Spanish or French may not mean the same thing; check your guess against the sentence.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-eng-language-families",
      name: "Language families of Europe: Romance, Germanic, Slavic and the rest",
      intuition:
        "Most European languages belong to the Indo-European family and descend through branches from older languages. Questions ask which language does not belong to a branch, and the traps are languages whose location or alphabet points the wrong way: a Romance language surrounded by Slavic neighbours, a Baltic language next to Poland, a Semitic language written in the Latin alphabet.",
      definition:
        "- **Indo-European** is the large family that includes most European languages. Its main branches in Europe are Romance, Germanic, Slavic, Baltic, Celtic, Greek and Albanian.\n" +
        "- **Romance** languages descend from Latin.\n" +
        "- **Not Indo-European**: Finnish, Estonian and Hungarian (Uralic); Basque (an isolate, related to no known language); Maltese (Semitic, related to Arabic); Turkish (Turkic).\n" +
        "- **Location and alphabet are not family**. Bulgarian is Slavic and written in Cyrillic; Romanian is Romance; Maltese uses the Latin alphabet but is Semitic.",
      table: {
        columns: ["Branch or family", "Members", "Watch out"],
        rows: [
          { cells: ["Romance (from Latin)", "Italian, Spanish, Portuguese, French, Catalan, Romanian", "Romanian is Romance although most of its neighbours speak Slavic languages or Hungarian"] },
          { cells: ["Germanic", "English, German, Dutch, Swedish, Danish, Norwegian, Icelandic", "English is Germanic, though much of its vocabulary comes from Latin and French"] },
          { cells: ["Slavic", "Russian, Ukrainian, Polish, Czech, Slovak, Slovene, Serbian, Croatian, Bulgarian", "Some use Cyrillic and some the Latin alphabet; the alphabet does not decide the branch"] },
          { cells: ["Baltic", "Lithuanian, Latvian", "Neighbours of the Slavic languages, but a separate branch"] },
          { cells: ["Celtic", "Irish, Scottish Gaelic, Welsh, Breton", "Breton is spoken in France but is Celtic, not Romance"] },
          { cells: ["Greek and Albanian", "Greek; Albanian", "Each is a branch of Indo-European on its own"] },
          { cells: ["Not Indo-European", "Finnish, Estonian, Hungarian (Uralic); Basque (isolate); Maltese (Semitic); Turkish (Turkic)", "Maltese uses the Latin alphabet but is related to Arabic"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the following languages is NOT a Germanic language?",
        options: ["Danish", "Dutch", "Icelandic", "Norwegian", "Irish"],
        steps: [
          "Danish, Dutch, Icelandic and Norwegian are all in the Germanic branch.",
          "Irish is Celtic. It is spoken in a country where English, a Germanic language, is also spoken, which is the trap: location is not family. E.",
        ],
        answer: "(E) Irish",
      },
      practiceSet: [
        { prompt: "To which branch does Portuguese belong?", answer: "Romance." },
        { prompt: "Is Hungarian an Indo-European language?", answer: "No: it is Uralic, like Finnish and Estonian." },
        { prompt: "Which is the odd one out: Polish, Czech, Latvian, Slovak?", answer: "Latvian (Baltic); the others are Slavic." },
      ],
      traps: [
        {
          title: "Geography is not family",
          body: "A language spoken among Slavic neighbours can be Romance (Romanian) or Baltic (Lithuanian). A language spoken in France can be Celtic (Breton), and Basque, spoken in Spain and France, belongs to no family at all. Learn the branch of each language, not its location.",
        },
      ],
    },
  ],
};
