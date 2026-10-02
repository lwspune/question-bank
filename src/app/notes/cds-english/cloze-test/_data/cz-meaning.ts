import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_CZ_MEANING_NOTE: SubtopicNote = {
  subtopicName: "Meaning from the Passage",
  title: "Meaning from the Passage: Tone, Echoes and Elimination",
  oneLineDefinition:
    "When two or more options fit the grammar, the passage decides: its tone, a word it repeats or sets against another, and what makes sense.",
  whyItMatters:
    "These are the blanks the grammar slot cannot settle. All four options may be the right class, and several look reasonable on their own. " +
    "The answer sits in the rest of the passage, so the habit of reading the whole passage first pays off most here.",
  concepts: [
    // C1 — follow the tone
    {
      kind: "formula" as const,
      slug: "cdsencz-follow-the-tone",
      name: "Follow the passage's tone",
      intuition:
        "Every passage carries a feeling: praise, worry, anger, sadness. Most blanks keep that feeling going. " +
        "Decide the tone of the passage, then strike the options with the wrong charge.",
      definition:
        "The terms:\n" +
        "- **Tone**: the writer's attitude or feeling in a passage: admiring, critical, fearful, hopeful.\n" +
        "- **Charge**: whether a word is positive, negative or neutral.\n" +
        "The method:\n" +
        "- After your first read of the passage, name its tone in one word.\n" +
        "- At the blank, give each option a charge.\n" +
        "- Strike the options whose charge goes against the tone of the sentence.\n" +
        "- Among those left, use the details. 'smarting under the ___ control' needs something that hurts, so rigid, not orthodox.\n" +
        "- Watch for a turn. A contrast linker (but, yet, however) can flip the tone inside a passage. Follow the sentence the blank sits in.",
      authoredExample: {
        prompt:
          "The village had lost its crops to the flood, and the farmers watched the ruined fields in ___ silence. (a) cheerful (b) grim (c) proud (d) lively",
        steps: [
          "Name the tone: loss and ruin. The feeling is sad and heavy.",
          "Give each option a charge: cheerful, proud and lively are positive; grim is negative.",
          "Strike the three positive options. grim fits the scene.",
        ],
        answer: "(b) grim",
      },
      selfCheckExample: {
        prompt:
          "After years of hard training, the young boxer won the gold medal, and his coach was ___. (a) furious (b) delighted (c) bored (d) ashamed",
        steps: [
          "The tone is success after effort: positive.",
          "furious, bored and ashamed are all negative.",
        ],
        answer: "(b) delighted",
      },
      practiceSet: [
        { prompt: "The general praised the soldiers for their ___ courage. (reckless / remarkable)", answer: "remarkable", method: "Praise needs a positive word; reckless is negative." },
        { prompt: "Under the cruel ruler, the people lived in ___. (fear / comfort)", answer: "fear", method: "A cruel ruler sets a negative tone." },
        { prompt: "The speech was dull, and the crowd grew ___. (restless / excited)", answer: "restless", method: "A dull speech does not excite." },
        { prompt: "The old song filled the hall with a ___ sadness. (gentle / joyful)", answer: "gentle", method: "joyful clashes with sadness." },
      ],
      pyqExampleId: "ce6bbe21-4419-4b9c-83a8-a3292fe2ed3c",
      traps: [
        {
          title: "Right charge, wrong shade",
          body:
            "'They made a last ___ attempt to regain their independence': horrible is negative, but it describes how something feels to others. A last attempt made with little hope is **desperate**.",
        },
        {
          title: "Missing a turn",
          body:
            "A passage can praise in one sentence and criticise in the next. Take the tone from the sentence around the blank, not from the opening line alone.",
        },
        {
          title: "Two options with the right charge",
          body:
            "When two options both match the tone, the charge has done its job. Move on to the details of the sentence, or to the methods below.",
        },
      ],
    },

    // C2 — find the echo or the opposite
    {
      kind: "formula" as const,
      slug: "cdsencz-find-the-echo",
      name: "Find the echo or the opposite elsewhere in the passage",
      intuition:
        "Writers repeat their key words, or set them against their opposites. Often the answer to a blank is printed somewhere else in the passage, a line before or after.",
      definition:
        "The terms:\n" +
        "- **Echo**: a word or an idea that appears again in the passage, the same or in another form.\n" +
        "- **Opposite frame**: a pattern that sets two things against each other: X rather than Y; from narrow ... to broad; some ... others more.\n" +
        "The method:\n" +
        "- After naming the slot, scan the sentences just before and after the blank.\n" +
        "- If a nearby sentence names the thing, the blank often takes that word.\n" +
        "- If the sentence sets up a contrast (from ___ local issues to broad aims), the blank is the opposite of the other half: narrow.\n" +
        "- 'Some ... Others are ___ complex' compares the second group with the first: more.\n" +
        "- 'that is how it has been, that is how it is ___': then and now set the past against the present.\n" +
        "- Check that the echo also fits the slot.",
      authoredExample: {
        prompt:
          "The battalion trained in the desert for months. This ___ training prepared them for the heat they later faced in battle. (a) mountain (b) desert (c) river (d) jungle",
        steps: [
          "Name the slot: a describing word before 'training'. All four can stand there.",
          "Scan the sentence before: 'trained in the desert'.",
          "Scan the rest of the sentence: 'the heat'. Both point to the same place.",
          "The blank echoes the earlier word: desert.",
        ],
        answer: "(b) desert",
      },
      selfCheckExample: {
        prompt:
          "Some cadets learn a drill in a day. Others need ___ time and extra help. (a) less (b) more (c) no (d) little",
        steps: [
          "'Some ... Others' sets two groups against each other.",
          "The first group learns fast. The words 'and extra help' show the second group struggles.",
          "So the second group needs more time.",
        ],
        answer: "(b) more",
      },
      practiceSet: [
        { prompt: "The plan was praised for its simplicity rather than its ___. (complexity / clarity)", answer: "complexity", method: "'rather than' sets an opposite." },
        { prompt: "Prices rose from low levels in spring to ___ levels in winter. (high / low)", answer: "high", method: "from X to Y: Y is the opposite end." },
        { prompt: "He had always wanted to sing, and that night he ___ before a large crowd. (sang / danced)", answer: "sang", method: "The echo of 'sing'." },
        { prompt: "Then he was a clerk; ___ he is a colonel. (now / later)", answer: "now", method: "then and now set the past against the present." },
      ],
      pyqExampleId: "2d727d35-b3a6-4825-bb7c-5b006c316f6a",
      traps: [
        {
          title: "An echo in the wrong word class",
          body:
            "'to build a democratic and civil ___ society': liberty is the idea the passage is about, but the blank sits before a noun and needs an adjective: **libertarian**. The echo must also fit the slot.",
        },
        {
          title: "Missing the opposite frame",
          body:
            "'change from ___ local issues to broad aims' sets two ends against each other. The blank is the opposite of broad, **narrow**, not a word that means the same as broad.",
        },
        {
          title: "Taking a look-alike for the echo",
          body:
            "When the options share a root (revolution, devolution, involution), only the one the passage actually uses is the echo. Find the word in the text; do not guess from the sound.",
        },
      ],
    },

    // C3 — eliminate by logic
    {
      kind: "formula" as const,
      slug: "cdsencz-eliminate-by-logic",
      name: "Eliminate options that fit the slot but not the passage's logic",
      intuition:
        "When the grammar and the tone both allow more than one option, test each against plain sense. Could this be true in the world the passage describes? " +
        "Is it too small, too big, or the opposite of what the subject wants?",
      definition:
        "The terms:\n" +
        "- **Elimination**: removing options one by one, each for a stated reason, until one is left.\n" +
        "The method:\n" +
        "- Put each option in the blank and read the full sentence.\n" +
        "- Strike options that are impossible in the real world. A scientist does not 'sink' biofuels.\n" +
        "- Strike options that clash with a fact stated elsewhere in the passage.\n" +
        "- Strike options that are too strong or too weak. 'people of all foreign countries' overstates; 'many' fits.\n" +
        "- Strike options that do the opposite of what the subject is trying to do. Scientists who want new enzymes synthesize them; they do not inhibit them.\n" +
        "- Give a reason for every option you strike. If you cannot, read the sentence again.",
      authoredExample: {
        prompt:
          "The doctor ___ the wound carefully before sending the soldier back to his unit. (a) ignored (b) dressed (c) opened (d) widened",
        steps: [
          "All four are past-tense verbs, so the slot does not decide.",
          "ignored clashes with 'carefully'. You do not ignore something carefully.",
          "opened and widened would harm the soldier, the opposite of a doctor's aim.",
          "The soldier goes back to his unit, so the wound was treated. dressed (cleaned and covered) fits.",
        ],
        answer: "(b) dressed",
      },
      selfCheckExample: {
        prompt:
          "The new road cut travel time to the border post, so supplies now reach the troops ___. (a) later (b) faster (c) rarely (d) never",
        steps: [
          "'cut travel time' means the journey is shorter.",
          "later, rarely and never all go against that fact.",
        ],
        answer: "(b) faster",
      },
      practiceSet: [
        { prompt: "The pilot landed the damaged plane ___, and everyone walked away unhurt. (safely / badly)", answer: "safely", method: "'walked away unhurt' rules out badly." },
        { prompt: "Engineers built a dam to ___ floods. (control / invite)", answer: "control", method: "A dam's purpose is to stop floods, not invite them." },
        { prompt: "He failed the test because he had not ___ at all. (studied / slept)", answer: "studied", method: "Only a lack of study explains failing." },
        { prompt: "She unlocked the door with a ___. (key / spoon)", answer: "key", method: "Plain real-world sense." },
      ],
      pyqExampleId: "b0a876de-c9f8-4ac9-830a-5eba5af47df7",
      traps: [
        {
          title: "Too strong a word",
          body:
            "'people of ___ foreign countries listened to her music': all claims every country on earth, which no concert can reach. **many** says what is true.",
        },
        {
          title: "The opposite of the subject's aim",
          body:
            "'used directed evolution to ___ variants of naturally occurring enzymes': inhibit and hamper are real verbs of the right class, but the scientists wanted to make enzymes. **synthesize** fits their aim.",
        },
        {
          title: "Striking without a reason",
          body:
            "If you cannot say why an option is wrong, you have not eliminated it. Guessing between two 'fine-sounding' options is where marks are lost.",
        },
      ],
    },
  ],
};
