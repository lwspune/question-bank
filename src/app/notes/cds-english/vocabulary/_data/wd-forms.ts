import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_FORMS_NOTE: SubtopicNote = {
  subtopicName: "Word Forms and Parts of Speech",
  title: "Word forms: one root, four parts of speech",
  oneLineDefinition:
    "One root gives a noun, a verb, an adverb and an adjective. Read the ending of each word to place it, and solve the leftover by elimination.",
  whyItMatters:
    "Recent papers set match lists where List I names parts of speech and List II gives four forms of one word, and pair items where each option labels two look-alike words. " +
    "The endings decide most of them in seconds. The few hard ones use a word with no telling ending, such as fast or just, and are solved by elimination.",
  concepts: [
    // C1 — suffixes give away the part of speech
    {
      kind: "formula" as const,
      slug: "cdsenwd-suffix-pos",
      name: "Suffixes give away the part of speech",
      intuition:
        "A word's job in a sentence is its part of speech. A **noun** names a thing or idea, a **verb** names an action, an **adjective** describes a noun, and an **adverb** describes a verb or an adjective. " +
        "English marks these jobs with endings, so the ending usually tells you the part of speech before you think about meaning.",
      definition:
        "Endings to read:\n" +
        "- **Noun**: -tion, -sion, -ance, -ence, -ment, -ness, -ity, -ledge (supposition, forbiddance, knowledge).\n" +
        "- **Verb**: the bare base word, or -ate, -ify, -ise, -en (suppose, err, cogitate, intuit).\n" +
        "- **Adverb**: usually -ly (supposedly, erroneously, knowingly).\n" +
        "- **Adjective**: -ous, -ive, -ful, -al, -able, and -ed, -en or -ing forms used to describe a noun (erroneous, intuitive, forbidden, supposed).\n" +
        "The method for a match list:\n" +
        "- Find the -ly word first: that is the adverb.\n" +
        "- Find the noun ending next, then the bare verb.\n" +
        "- The word left over is the adjective. Check that it can sit before a noun.\n" +
        "Families tested this way (noun / verb / adverb / adjective):\n" +
        "- 2025 (I): supposition / suppose / supposedly / supposed; forbiddance / forbid / forbiddingly / forbidden.\n" +
        "- 2025 (II): error / err / erroneously / erroneous; knowledge / know / knowingly / knowing; cogitation / cogitate / pensively / cogitative; intuition / intuit / intuitively / intuitive.",
      authoredExample: {
        prompt:
          "Match List I with List II. List I: A. Noun B. Verb C. Adverb D. Adjective. List II: 1. Destroy 2. Destructively 3. Destruction 4. Destructive",
        steps: [
          "The -ly word is 2. Destructively, so C-2.",
          "The -tion word is 3. Destruction, so A-3.",
          "The bare base word is 1. Destroy, so B-1.",
          "The word left over, 4. Destructive, sits before a noun (a destructive storm), so D-4.",
        ],
        answer: "A-3, B-1, C-2, D-4.",
      },
      selfCheckExample: {
        prompt:
          "Match List I with List II. List I: A. Noun B. Verb C. Adverb D. Adjective. List II: 1. Reliable 2. Rely 3. Reliably 4. Reliance",
        steps: [
          "-ly word: 3. Reliably, so C-3.",
          "-ance word: 4. Reliance, so A-4.",
          "Bare base: 2. Rely, so B-2.",
          "Left over: 1. Reliable (a reliable friend), so D-1.",
        ],
        answer: "A-4, B-2, C-3, D-1.",
      },
      practiceSet: [
        { prompt: "Tightness: which part of speech?", answer: "Noun", method: "-ness ending" },
        { prompt: "Tighten: which part of speech?", answer: "Verb", method: "-en added to an adjective makes a verb" },
        { prompt: "Courageous: which part of speech?", answer: "Adjective", method: "-ous ending" },
        { prompt: "Patiently: which part of speech?", answer: "Adverb", method: "-ly added to the adjective patient" },
      ],
      pyqExampleId: "d1ac0061-08cf-4698-bf5c-dd16872ab43a",
      traps: [
        {
          title: "Not every -ly word is an adverb",
          body:
            "**Friendly**, **lovely**, **lonely** and **costly** are adjectives (a friendly dog). In a match list the -ly word is almost always the adverb, but in a sentence check what the word describes.",
        },
        {
          title: "The -ed form is the adjective, not the verb",
          body:
            "In 'suppose / supposed', the verb slot takes the bare form **suppose**. **Supposed** and **forbidden** are past participles used to describe a noun (the supposed winner, forbidden fruit), so they fill the adjective slot.",
        },
        {
          title: "A word from another root can still fit",
          body:
            "In the cogitate set, the adverb was **pensively**, from a different root. Do not strike it for that. The list asks for the part of speech, not for the family.",
        },
      ],
    },

    // C2 — participle, gerund, infinitive, interjection
    {
      kind: "formula" as const,
      slug: "cdsenwd-verb-forms",
      name: "Participle, gerund, infinitive and interjection",
      intuition:
        "Sometimes List I asks for a verb form instead of an adverb. A verb has forms that do other jobs: an -ing form can act as a noun or describe a noun, and 'to' plus the verb makes the infinitive. " +
        "An interjection is a word that stands alone and shows a feeling or calls for attention.",
      definition:
        "The four labels:\n" +
        "- **Present participle**: the -ing form used as part of a verb or to describe a noun (the intending candidate; she is writing).\n" +
        "- **Gerund**: the -ing form used as a noun (Neglecting your health is foolish).\n" +
        "- **Infinitive**: 'to' + the base verb (to experiment, to win). It is two words.\n" +
        "- **Interjection**: a word that stands alone with a feeling or a call (Hark! Alas! Oh!).\n" +
        "The method:\n" +
        "- Place the noun (-tion, -ment, -ness) and the adjective (-al, -ory, -ent) by their endings.\n" +
        "- The bare word is the verb. The -ing word or the 'to' form takes the special slot.\n" +
        "- An -ing word can also be a plain noun (hearing, building). If the special slot is taken by another word, the -ing word is the noun.\n" +
        "Families tested this way:\n" +
        "- 2025 (I): intention / intend / intending (present participle) / intentional; experimentation / experiment / to experiment (infinitive) / experimental.\n" +
        "- 2025 (I): discrimination / discriminate / discriminating (gerund) / discriminatory; neglectfulness / neglect / neglecting (gerund) / negligent.\n" +
        "- 2025 (II): hearing (noun) / hear (verb) / hark (interjection) / auditory (adjective).",
      authoredExample: {
        prompt:
          "Match List I with List II. List I: A. Noun B. Verb C. Gerund D. Adjective. List II: 1. Hesitant 2. Hesitate 3. Hesitating 4. Hesitation",
        steps: [
          "The -tion word is 4. Hesitation, so A-4.",
          "The bare verb is 2. Hesitate, so B-2.",
          "The -ing form takes the gerund slot: 'Hesitating cost him the match.' So C-3.",
          "Left over: 1. Hesitant describes a noun (a hesitant reply), so D-1.",
        ],
        answer: "A-4, B-2, C-3, D-1.",
      },
      selfCheckExample: {
        prompt:
          "Match List I with List II. List I: A. Noun B. Verb C. Present participle D. Adjective. List II: 1. Decorative 2. Decorating 3. Decoration 4. Decorate",
        steps: [
          "-tion word: 3. Decoration, so A-3.",
          "Bare verb: 4. Decorate, so B-4.",
          "-ing form: 2. Decorating (they are decorating the hall), so C-2.",
          "Left over: 1. Decorative (a decorative lamp), so D-1.",
        ],
        answer: "A-3, B-4, C-2, D-1.",
      },
      practiceSet: [
        { prompt: "Jogging keeps him fit. Is 'jogging' a gerund or a present participle?", answer: "Gerund", method: "it is the subject of the sentence, a noun job" },
        { prompt: "We watched the rising sun. Is 'rising' a gerund or a present participle?", answer: "Present participle", method: "it describes the noun sun" },
        { prompt: "He wants to win. What is 'to win'?", answer: "An infinitive", method: "to + base verb" },
        { prompt: "Bravo! You did it. What part of speech is 'Bravo'?", answer: "An interjection", method: "it stands alone and shows a feeling" },
      ],
      pyqExampleId: "65f0ad18-cfb4-4402-8a76-5f01fa183a7d",
      traps: [
        {
          title: "Gerund and participle look the same",
          body:
            "Both end in -ing. Ask what the word does. If it is a thing (subject or object), it is a **gerund**. If it describes a noun or is part of 'is ...-ing', it is a **present participle**.",
        },
        {
          title: "An -ing word can be the plain noun",
          body:
            "In the hear family, the noun was **hearing**, because the interjection slot went to **hark** and the adjective to **auditory**. Do not force every -ing word into the participle slot.",
        },
        {
          title: "The infinitive needs 'to'",
          body:
            "A single word cannot be the infinitive. If List II has a 'to ...' form, it takes the infinitive slot, and the bare word is the verb.",
        },
      ],
    },

    // C3 — flat adverbs and elimination
    {
      kind: "formula" as const,
      slug: "cdsenwd-odd-forms",
      name: "Flat adverbs and the odd word out: solve by elimination",
      intuition:
        "Some adverbs have no -ly. 'Run fast', 'work hard', 'go straight': here fast, hard and straight are adverbs with the same form as the adjective. These are **flat adverbs**. " +
        "When a set has no -ly word, or has a word from a different root, fix the slots you are sure of and give the leftover word the slot that is left. That is **solving by elimination**.",
      definition:
        "The method:\n" +
        "- Fix the sure slots first: the noun (-ness, -tion, -ice) and the verb (-en, -ify, -ate).\n" +
        "- A **superlative** (-est) form describes a noun, so it takes the adjective slot (the straightest road).\n" +
        "- A **flat adverb** (fast, hard, straight, just) takes the adverb slot.\n" +
        "- A word from another root can still be the answer for its slot. Label it by its job, not by its family.\n" +
        "- When two slots are left, try each word in a short sentence.\n" +
        "Sets tested this way (noun / verb / adverb / adjective):\n" +
        "- 2025 (I): justice / justify / just / juridical; straightness / straighten / straight / straightest; hardness / harden / hard / hardy; fastness / fasten / fast / fastest.\n" +
        "- 2025 (II): qualification / qualify / conditionally / qualifying; care / think / carefully / careful; duplication / duplicate / dually / duple.\n" +
        "- 2025 (II): exodus / exit / outward / emanant; spectator / spectate / extremely / spectatorial.",
      authoredExample: {
        prompt:
          "Match List I with List II. List I: A. Noun B. Verb C. Adverb D. Adjective. List II: 1. Deepest 2. Depth 3. Deep 4. Deepen",
        steps: [
          "No word ends in -ly, so look for the sure slots first.",
          "Noun: 2. Depth (the depth of the river), so A-2.",
          "Verb: 4. Deepen (-en makes a verb), so B-4.",
          "Two words are left: deep and deepest. 'The deepest well' shows that the superlative describes a noun, so D-1.",
          "'Dig deep' shows deep as a flat adverb, so C-3.",
        ],
        answer: "A-2, B-4, C-3, D-1.",
      },
      selfCheckExample: {
        prompt:
          "Match List I with List II. List I: A. Noun B. Verb C. Adverb D. Adjective. List II: 1. Courageous 2. Bravely 3. Courage 4. Encourage",
        steps: [
          "Noun: 3. Courage, so A-3.",
          "Verb: 4. Encourage (en- makes a verb), so B-4.",
          "Adverb: 2. Bravely. It is from a different root, but it is the only -ly word. C-2.",
          "Left over: 1. Courageous, so D-1.",
        ],
        answer: "A-3, B-4, C-2, D-1.",
      },
      practiceSet: [
        { prompt: "The train arrived late. Is 'late' an adjective or an adverb here?", answer: "Adverb", method: "it tells when the train arrived; a flat adverb" },
        { prompt: "He works hard. Is 'hard' an adjective or an adverb here?", answer: "Adverb", method: "it describes how he works" },
        { prompt: "He hardly works. Does 'hardly' mean the same as 'hard'?", answer: "No. Hardly means scarcely, almost not." },
        { prompt: "Brighten: noun, verb or adjective?", answer: "Verb", method: "-en added to an adjective" },
      ],
      pyqExampleId: "c0e5805d-a7d3-4f4e-8af3-5542500e8a11",
      traps: [
        {
          title: "Hardly is not the adverb of hard",
          body:
            "'He works **hard**' means with effort. 'He **hardly** works' means he almost does not work. In the hard family the adverb is **hard**, and **hardy** (tough, able to survive) is the adjective.",
        },
        {
          title: "Do not leave the -est word for last",
          body:
            "**Straightest** looks like a degree of straight, so students hesitate. A superlative sits before a noun (the straightest line), so it fills the adjective slot. Then **straight** is the flat adverb.",
        },
        {
          title: "Do not strike a word because its root is different",
          body:
            "In the qualify set the adverb was **conditionally**; in the spectator set it was **extremely**. They break the family but fit the slot. Elimination works only if you place every word.",
        },
      ],
    },

    // C4 — confusable pairs labelled by part of speech
    {
      kind: "formula" as const,
      slug: "cdsenwd-pos-pairs",
      name: "Confusable pairs labelled by part of speech",
      intuition:
        "Here two look-alike words are given, and each option labels both words with a part of speech and a meaning. Every option sounds plausible until you check both halves. " +
        "The wrong options use labels that cannot fit a content word, or keep the labels and swap the meanings.",
      definition:
        "The method:\n" +
        "- Strike options that call a content word a **determiner** (this, that, his), a **pronoun**, a **conjunction** or an **interjection**. Words like compare or illicit cannot be these.\n" +
        "- Check that each meaning sits with the right word. A swapped meaning makes the whole option wrong.\n" +
        "- Then check the part-of-speech label of each word.\n" +
        "- Two words in a pair can share a part of speech. A **transitive verb** is a verb that takes an object (ensure safety); a **phrase** is a group of words without its own subject and verb (any way).\n" +
        "Pairs tested this way:\n" +
        "- 2025 (I): elicit (verb, draw out a reaction) / illicit (adjective, forbidden by law); ensure (make certain) / insure (make certain by taking precaution), both transitive verbs.\n" +
        "- 2025 (I): imitate (verb, follow as a model) / intimate (adjective, closely acquainted); compare (verb, estimate or measure) / compere (noun, person who introduces performers); precept (noun, rule of behaviour) / percept (noun, object of perception).\n" +
        "- 2025 (II): lose (verb, misplace) / loose (adjective, slack); anyway (adverb, regardless) / any way (phrase, any manner); allusion (noun, implied reference) / illusion (noun, false idea).\n" +
        "- 2025 (II): appraise (verb, examine and judge) / apprise (verb, inform); climactic (adjective, of a climax) / climatic (adjective, of climate).",
      authoredExample: {
        prompt:
          "Prophecy and Prophesy. (a) Prophecy is a verb meaning to predict. Prophesy is a noun meaning a prediction. (b) Prophecy is a noun meaning a prediction. Prophesy is a verb meaning to predict. (c) Prophecy is a determiner meaning a prediction. Prophesy is a conjunction meaning to predict. (d) Prophecy is an adverb meaning a prediction. Prophesy is a verb meaning to predict.",
        steps: [
          "Strike (c): a determiner and a conjunction cannot be content words like these.",
          "Strike (d): prophecy is not an adverb.",
          "(a) and (b) differ only in which word gets which meaning.",
          "The -cy ending is a noun ending (privacy, accuracy). So prophecy is the noun and prophesy the verb.",
        ],
        answer: "(b).",
      },
      selfCheckExample: {
        prompt:
          "Loath and Loathe. Which is correct? (a) Loath is an adjective meaning unwilling. Loathe is a verb meaning to hate. (b) Loath is a verb meaning to hate. Loathe is an adjective meaning unwilling. (c) Loath is a pronoun meaning unwilling. Loathe is a verb meaning to hate. (d) Both are nouns meaning hatred.",
        steps: [
          "Strike (c) and (d): loath is not a pronoun, and neither word is a noun.",
          "Test in sentences: 'I am loath to leave' (unwilling, an adjective after 'am'); 'I loathe cruelty' (a verb with an object).",
          "So the meanings and labels in (a) are right, and (b) swaps them.",
        ],
        answer: "(a).",
      },
      practiceSet: [
        { prompt: "Breath and breathe: which is the verb?", answer: "Breathe", method: "Take a deep breath (noun); breathe slowly (verb)" },
        { prompt: "Practice and practise (British use): which is the verb?", answer: "Practise", method: "-ice noun, -ise verb, as in advice / advise" },
        { prompt: "Lightning and lightening: which means making lighter?", answer: "Lightening", method: "lighten + -ing; lightning is the flash in a storm" },
        { prompt: "An option calls 'illicit' a determiner. Can it be right?", answer: "No", method: "determiners are words like this, that, his, some" },
      ],
      pyqExampleId: "7bfb5830-dec8-47fe-bbc2-2acf03a59aaf",
      traps: [
        {
          title: "Right labels, swapped meanings",
          body:
            "In the lose / loose item, one option keeps 'verb' and 'adjective' in place but gives lose the meaning 'slack'. Check the meaning of each word, not just the labels. **Lose** = misplace; **loose** = slack.",
        },
        {
          title: "Two words can share a part of speech",
          body:
            "**Ensure** and **insure** are both transitive verbs; **allusion** and **illusion** are both nouns. Do not reject an option just because it gives both words the same label.",
        },
        {
          title: "One word or two",
          body:
            "**Anyway** (one word) is an adverb meaning regardless. **Any way** (two words) is a phrase meaning any manner or method: 'Is there any way to help?'. The space changes the meaning.",
        },
      ],
    },
  ],
};
