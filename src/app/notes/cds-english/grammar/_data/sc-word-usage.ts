import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SC_WORD_USAGE_NOTE: SubtopicNote = {
  subtopicName: "Using a Word Correctly",
  title: "Is the word used correctly? Confusable pairs and meaning in context",
  oneLineDefinition:
    "A word is printed with two, three or four sentences, and you judge which of them use it correctly. Most items test a pair of look-alike words; the rest test whether a rare word's meaning fits the sentence.",
  whyItMatters:
    "Recent CDS papers carry whole blocks of these items. The confusable pairs, such as affect and effect or elicit and illicit, come back across sittings, so a short list covers many marks. " +
    "The rare-word items reward one habit: state the meaning first, then test each sentence against it.",
  concepts: [
    // C1 — confusable pairs
    {
      kind: "reference" as const,
      slug: "cdsensc-confusables",
      name: "Confusable pairs: affect/effect, discrete/discreet, less/fewer and the rest",
      intuition:
        "Many English words have a twin that looks or sounds almost the same but means something else, or is a different part of speech. " +
        "The examiner prints one twin and writes sentences that need the other. Know both halves of each pair and the wrong sentences stand out.",
      definition:
        "The terms:\n" +
        "- **Confusable**: a word easily mixed up with a look-alike (affect and effect, discrete and discreet).\n" +
        "- **Part of speech**: what job a word does: a **noun** names a thing, a **verb** names an action, an **adjective** describes a noun, an **adverb** describes a verb or an adjective.\n" +
        "The method:\n" +
        "- Say what the printed word means and what part of speech it is.\n" +
        "- Name its twin and what that means.\n" +
        "- In each sentence, ask which twin the sentence needs. Keep only the sentences that need the printed word.\n" +
        "- Watch the forms: a noun cannot take -ed or -ing. 'Adviced' and 'illicited' are not words.",
      table: {
        columns: ["Word", "Meaning and part of speech", "Its look-alike", "Sitting"],
        rows: [
          {
            cells: [
              "Affect",
              "Verb: to influence; to move someone's feelings",
              "Effect, a noun: a result (have an effect, take effect, in effect)",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "Effect",
              "Noun: a result. As a verb, 'to bring about' (effect a change)",
              "Affect, a verb: to influence (deeply affected by the new laws)",
              "2025 (II)",
            ],
          },
          {
            cells: ["Elicit", "Verb: to draw out a response or facts", "Illicit, an adjective: unlawful", "2022 (II)"],
          },
          {
            cells: ["Illicit", "Adjective: not allowed by law", "Elicit, a verb: to draw out (elicit more information)", "2025 (II)"],
          },
          {
            cells: [
              "Climactic",
              "Adjective: forming the climax, the most intense or decisive point",
              "Climatic: to do with climate (climatic changes)",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "Discrete",
              "Adjective: separate, distinct (a discrete series has gaps)",
              "Discreet: careful, tactful, not drawing attention (discreet enquiries)",
              "2022 (II)",
            ],
          },
          {
            cells: ["It's", "Short for 'it is' or 'it has'", "Its: belonging to it, with no apostrophe (its nature)", "2022 (II)"],
          },
          {
            cells: [
              "Amidst",
              "Preposition: in the middle of a situation or atmosphere (amidst the confusion)",
              "Among: within a group of separate people or things",
              "2022 (II), 2024 (II)",
            ],
          },
          {
            cells: [
              "Among",
              "Preposition: within a group of three or more separate people or things",
              "Amidst: in the middle of something you cannot count; between: for two",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "Less",
              "With uncountable nouns: less sugar, less time",
              "Fewer: with countable plurals (fewer people, fewer days, fewer states)",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "Practise",
              "Verb in British spelling: to do something again and again to improve",
              "Practice: the noun, a habit or custom (common practice)",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "Practice",
              "Noun: a habit, custom or method (a good practice)",
              "Practise: the verb in British spelling (practise for hours)",
              "2025 (I)",
            ],
          },
          {
            cells: [
              "Continuously",
              "Adverb: without any break (it rained continuously for six hours)",
              "Continually: again and again, with breaks in between",
              "2022 (II)",
            ],
          },
          {
            cells: [
              "Immanent",
              "Adjective: existing within, inherent",
              "Imminent: about to happen; eminent: famous and respected (an eminent guest)",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "Will",
              "The plain future with every person: They will apply soon",
              "Shall: with I and we in formal English; with other persons it adds a promise or an order",
              "2024 (II)",
            ],
          },
          {
            cells: [
              "Amoral",
              "Adjective: without any sense of right and wrong, not concerned with morals",
              "Immoral: morally wrong (murder and cheating are immoral)",
              "2025 (I)",
            ],
          },
          {
            cells: [
              "Emigrate",
              "Verb: to leave your own country to live in another",
              "Immigrate: to come into a country to live; migrate: to move from place to place (animals, seasonal workers)",
              "2025 (I)",
            ],
          },
          {
            cells: [
              "Advice",
              "Noun: a suggestion (the doctor's advice)",
              "Advise, the verb: advised, advising. 'Adviced' is not a word",
              "2025 (II)",
            ],
          },
          {
            cells: ["Brake", "Verb or noun: to slow or stop a vehicle", "Break: to snap, to interrupt, to tell news", "2025 (II)"],
          },
          {
            cells: ["Incite", "Verb: to stir people up to feel or do something", "Insight, a noun: a deep understanding", "2025 (II)"],
          },
        ],
        caption: "Most pairs differ in part of speech: one is a verb, the other a noun or an adjective. Check the job the word does in the sentence.",
      },
      pyqExampleId: "cf3a61c9-6bbc-42f1-87cc-5d40796d4972",
      selfCheckExample: {
        prompt: "Choose: Please be ___ about her illness; she does not want others to know. (discrete / discreet)",
        steps: [
          "The sentence asks for care and silence, not for separateness.",
          "Discreet means careful and tactful. Discrete means separate.",
          "So the sentence needs discreet.",
        ],
        answer: "Please be discreet about her illness; she does not want others to know.",
      },
      practiceSet: [
        { prompt: "There were ___ cars on the road today. (less / fewer)", answer: "fewer", method: "cars can be counted" },
        { prompt: "The dog wagged ___ tail. (it's / its)", answer: "its", method: "possession, so no apostrophe" },
        { prompt: "The storm is ___; take shelter now. (imminent / eminent)", answer: "imminent", method: "about to happen" },
        { prompt: "Press the ___ gently on a wet road. (brake / break)", answer: "brake" },
      ],
      traps: [
        {
          title: "One letter changes the part of speech",
          body: "Advice and practice are nouns; advise and practise are verbs. A verb form built on the noun ('adviced', 'advicing') is not English. Ask whether the sentence needs a thing or an action.",
        },
        {
          title: "An apostrophe in its",
          body: "**Its** shows possession and has no apostrophe: its value, its nature. **It's** always means 'it is' or 'it has'. Read 'it's' aloud as 'it is'; if the sentence breaks, it is wrong.",
        },
        {
          title: "Less with a plural",
          body: "'Less than fourteen people', 'less states' and 'very less days' are wrong in exam English. Countable plurals take **fewer**. Less is for uncountables: less sugar.",
        },
        {
          title: "Direction in emigrate and immigrate",
          body: "You **emigrate from** your own country and **immigrate into** a new one. 'Emigration into the country' is a direction error. Animals and workers moving from place to place **migrate**.",
        },
      ],
    },
    // C2 — meaning in context
    {
      kind: "formula" as const,
      slug: "cdsensc-meaning-in-context",
      name: "Test each sentence against the word's core meaning and charge",
      intuition:
        "These items give one rare word and several sentences. The sentences are usually grammatical; what goes wrong is the meaning. " +
        "A word that means 'tiny' cannot describe a mountain, however well the sentence reads. So pin down the meaning and its charge before you read the sentences.",
      definition:
        "The terms:\n" +
        "- **Core meaning**: the dictionary sense, in a few plain words.\n" +
        "- **Charge**: whether the word is positive, negative or neutral. Pristine (spotless, as new) is positive; sinister (threatening evil) is negative.\n" +
        "- **Part of speech** matters too: an adverb such as immensely must describe a verb or an adjective (immensely happy).\n" +
        "The method:\n" +
        "- Write the core meaning and the charge in four or five words.\n" +
        "- Replace the word in each sentence with that meaning.\n" +
        "- Keep a sentence only if it still makes sense and the charge fits.\n" +
        "- In the 'in how many sentences' format, count only clean uses. A sentence that only half fits is a wrong use.\n" +
        "Words tested this way:\n" +
        "- **Alibi** (2022 II): proof that you were somewhere else when a crime took place. A valid alibi leads to acquittal.\n" +
        "- **Cuneiform** (2025 I): wedge-shaped; also the ancient wedge-shaped script pressed into clay.\n" +
        "- **Chutzpah** (2025 I): bold, even shameless, daring. It describes an attitude, not speed or effort.\n" +
        "- **Quotidian** (2025 I): everyday, ordinary, routine.\n" +
        "- **Moribund** (2025 I): dying, close to its end, in decline.\n" +
        "- **Fecundity / fecund** (2025 I): fertility; producing much growth or many offspring.\n" +
        "- **Immensely** (2025 I): to a very great degree. An adverb.\n" +
        "- **Insuperable** (2025 I): impossible to overcome. It describes difficulties and obstacles.\n" +
        "- **Pristine** (2026 II): in its original, unspoilt state.",
      authoredExample: {
        prompt:
          "Word: frugal. In how many of these is it used correctly? 1. The frugal family saved enough to buy a house. 2. The frugal feast had twenty dishes and a band. 3. Being frugal, he reused old envelopes.",
        steps: [
          "Core meaning: careful with money, spending little. Charge: mildly positive.",
          "Sentence 1: saving money fits spending little. Correct.",
          "Sentence 2: a feast of twenty dishes is the opposite of spending little. Wrong.",
          "Sentence 3: reusing envelopes fits. Correct.",
        ],
        answer: "Two sentences (1 and 3).",
      },
      pyqExampleId: "a4a27f84-b91c-4eec-9fe6-f0b47080e218",
      selfCheckExample: {
        prompt:
          "Word: ephemeral (lasting a very short time). Which sentence uses it correctly? (a) The pyramids are ephemeral monuments that have stood for thousands of years. (b) Fame on social media is often ephemeral. (c) He ephemeral walked to school. (d) The ephemeral mountain has never changed.",
        steps: [
          "Core meaning: short-lived. It is an adjective.",
          "(a) and (d) describe things that last a very long time, the opposite meaning.",
          "(c) uses the adjective where an adverb would be needed, and the sense is empty.",
          "(b) social media fame fades fast. It fits.",
        ],
        answer: "(b) Fame on social media is often ephemeral.",
      },
      practiceSet: [
        {
          prompt: "Word: lethargic (sluggish, without energy). Is it used correctly? 'After the long fever he felt lethargic for days.'",
          answer: "Correct",
        },
        {
          prompt: "Word: benevolent (kind, wishing others well). Is it used correctly? 'The benevolent landlord threw the poor widow out in the rain.'",
          answer: "Incorrect",
          method: "the charge clashes: a kind person does not do this",
        },
        {
          prompt: "Word: candid (honest and direct). Is it used correctly? 'She gave a candid answer and hid nothing.'",
          answer: "Correct",
        },
        {
          prompt: "Word: obsolete (no longer in use). Is it used correctly? 'The obsolete phone is the latest model on sale.'",
          answer: "Incorrect",
          method: "the latest model cannot be out of use",
        },
      ],
      traps: [
        {
          title: "Judging grammar instead of meaning",
          body: "In these items the sentences are usually grammatical. A sentence that reads smoothly can still use the word wrongly. Test the meaning, not the flow.",
        },
        {
          title: "Missing the charge",
          body: "A negative word in a sentence of praise, or a positive word in a sentence of blame, is a wrong use. Note the charge before you read the sentences.",
        },
        {
          title: "The wrong part of speech",
          body: "'Ravi's contribution was immensely to the project' puts an adverb where a noun or adjective phrase is needed. 'The group went insuperable for weeks' puts a word for obstacles on a group of people.",
        },
        {
          title: "Counting a near fit",
          body: "In 'in how many of the sentences' items, a sentence that half fits counts as wrong. Do not give a sentence the benefit of the doubt; one clash of meaning sinks it.",
        },
      ],
    },
  ],
};
