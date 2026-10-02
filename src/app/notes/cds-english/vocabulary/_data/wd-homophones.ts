import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_HOMOPHONES_NOTE: SubtopicNote = {
  subtopicName: "Homophones in Sentences",
  title: "Homophones in sentences: test every sentence on its own",
  oneLineDefinition:
    "Two or three words that sound alike, each used in a sentence. Decide what each sentence's slot needs, and mark only the sentences where the right word sits in it.",
  whyItMatters:
    "Recent papers give sets of sound-alike words (cite, sight, site) with two or three sentences, and ask which sentences use them correctly. " +
    "Often the words are rotated so that each one lands in another's sentence. Judge each sentence alone; 'only one is right' and 'all are right' both happen.",
  concepts: [
    // C1 — let the slot decide
    {
      kind: "formula" as const,
      slug: "cdsenwd-slot",
      name: "Noun, verb or adjective? Let the slot decide",
      intuition:
        "**Homophones** are words that sound the same but differ in spelling and meaning (rein, reign). **Near-homophones** sound close but not the same (lesson, lesion). " +
        "In a sentence, the empty slot already tells you what kind of word it needs: a noun after 'the' or 'a', a verb after 'to' or a subject, an adverb before an adjective. Find the word that has that part of speech and that meaning.",
      definition:
        "The method:\n" +
        "- Take one sentence at a time. Ignore the other sentences while you judge it.\n" +
        "- Ask what the slot needs: a **noun** (after a, the, his), a **verb** (after to, or as the action), an **adjective** (describing a noun), an **adverb** (describing a verb or adjective).\n" +
        "- Ask which word of the set has that part of speech and meaning.\n" +
        "- If the underlined word is that word, the sentence is correct. Mark it, then move to the next sentence.\n" +
        "- Only after all sentences are judged, map your result to the options.\n" +
        "Sets tested this way:\n" +
        "- 2026 (II): ascend (verb, to climb) / ascent (noun, a climb) / assent (noun or verb, agreement).\n" +
        "- 2026 (II): quiet (adjective, without noise) / quite (adverb, fairly or fully) / quit (verb, to leave).\n" +
        "- 2025 (II): lesion (noun, a wound or damaged area) / legion (noun, a large number) / lesson (noun, something learnt). To make less is lessen.\n" +
        "- 2026 (II): rein (noun or verb, a strap to control a horse; rein in = control) / reign (noun, a monarch's rule) / arraign (verb, to call before a court).\n" +
        "- 2026 (I): raze (verb, to destroy completely) / raise (verb, to lift; noun, a pay rise) / rays (noun, beams of light or heat).\n" +
        "- 2026 (II): weather (noun, the state of the air) / whether (conjunction, if) / whither (adverb, to what place).\n" +
        "- 2025 (I): consequent (adjective, following as a result; consequent to) / consequence (noun, a result; also importance).",
      authoredExample: {
        prompt:
          "Pray, Prey. 1. The eagle swooped down on its pray. 2. The villagers prey for rain every summer. 3. The lion stalked its prey through the grass. In which of the sentences is the underlined word used correctly? (a) 1 and 3 only (b) 2 only (c) 3 only (d) 1, 2 and 3",
        steps: [
          "Sentence 1: 'its ___' needs a noun meaning the hunted animal. That is prey. Pray is used, so 1 is wrong.",
          "Sentence 2: 'the villagers ___' needs a verb meaning to ask God. That is pray. Prey is used, so 2 is wrong.",
          "Sentence 3: 'its ___' needs the noun prey. Prey is used, so 3 is correct.",
          "Only 3 is correct.",
        ],
        answer: "(c) 3 only.",
      },
      selfCheckExample: {
        prompt:
          "Waist, Waste. 1. She tied a red belt round her waist. 2. Please do not waist food. 3. The factory dumped its waste into the river. Which sentences use the underlined word correctly?",
        steps: [
          "1: 'round her ___' needs a noun for the middle of the body: waist. Correct.",
          "2: 'do not ___ food' needs a verb meaning to use badly: waste. Waist is used, so wrong.",
          "3: 'its ___' needs a noun for unwanted material: waste. Correct.",
        ],
        answer: "1 and 3 only.",
      },
      practiceSet: [
        { prompt: "Yesterday he (lead / led) the team to victory.", answer: "Led", method: "past tense of lead; lead (rhymes with bed) is a metal" },
        { prompt: "We walked (passed / past) the old fort.", answer: "Past", method: "a preposition is needed; passed is a verb" },
        { prompt: "The cloth felt (coarse / course) and rough.", answer: "Coarse", method: "an adjective is needed; a course is a noun" },
        { prompt: "(Grate / Great) the cheese over the pasta.", answer: "Grate", method: "a verb is needed: to shred" },
      ],
      pyqExampleId: "75b88919-8583-424c-9e9c-3706d1ff2a38",
      traps: [
        {
          title: "Judging sentences against each other",
          body:
            "Students see that sentence 1 is wrong and assume another sentence must be right, or the reverse. Each sentence stands alone. All three can be wrong; all three can be right.",
        },
        {
          title: "Rein and reign",
          body:
            "A king's period of rule is a **reign**. To control something is to **rein** it in, as a rider pulls the reins of a horse. 'Reign in your impulses' is a common mistake in real writing too.",
        },
        {
          title: "Quite and quiet",
          body:
            "**Quite** is an adverb (quite well, quite good). **Quiet** is an adjective (a quiet wedding). Check the slot: before 'well' you need an adverb; before 'wedding' you need an adjective.",
        },
      ],
    },

    // C2 — sets naming places, things and money
    {
      kind: "reference" as const,
      slug: "cdsenwd-things",
      name: "Homophone sets: places, things and money",
      intuition:
        "Each set below has two or three words that sound alike and name different things. Learn each word with one short sentence of your own. The sentence is what you will recall in the exam.",
      definition:
        "How to use the table:\n" +
        "- Cover the meanings and say what each word names.\n" +
        "- Then make a sentence for each word. If you cannot, learn that word again.\n" +
        "- Watch the two-letter changes: tier / tyre / tire, aisle / isle.",
      table: {
        columns: ["Set", "Meanings", "Correct use", "Sitting"],
        rows: [
          { cells: ["Crops / corps / corpse", "Plants grown for food; a body of people (said 'core'); a dead body", "The medical corps set up a camp.", "2026 (I)"] },
          { cells: ["Tire / tier / tyre", "To make or grow weary; a level or row; the rubber ring on a wheel", "The stadium has three tiers of seats.", "2026 (I)"] },
          { cells: ["Cite / sight / site", "To quote as proof; the ability to see or a view; a place", "The new school will be built on this site.", "2026 (I)"] },
          { cells: ["Aisle / ale / isle", "A passage between rows of seats; a kind of beer; an island", "She asked for an aisle seat.", "2026 (II)"] },
          { cells: ["Sent / scent / cent", "Past tense of send; a smell; one hundredth of a dollar", "The hounds followed the fox's scent.", "2026 (II)"] },
          { cells: ["Way / weigh / whey", "A path or manner; to measure heaviness; liquid left when milk curdles", "Weigh the parcel before posting it.", "2026 (II)"] },
          { cells: ["Dairy / dreary / diary", "A place for milk products; dull and gloomy; a daily personal record", "He writes in his diary every night.", "2025 (II)"] },
          { cells: ["Brawl / bawl / bowl", "A noisy fight; to cry loudly; a round dish", "The baby began to bawl.", "2026 (II)"] },
          { cells: ["Bear / bare / bier", "To carry or endure; uncovered or empty; a stand for a coffin", "I cannot bear the noise.", "2026 (I)"] },
        ],
        caption: "In these sets each word was usually placed in another word's sentence, so most sentences were wrong.",
      },
      pyqExampleId: "c95cdddf-d934-4fae-9439-1494fd5cb35e",
      selfCheckExample: {
        prompt:
          "Flour, Flower. 1. Knead the flower into a soft dough. 2. The rose is my favourite flower. Which sentences use the underlined word correctly?",
        steps: [
          "1: dough is made from ground wheat, which is flour. Flower is wrong here.",
          "2: a rose is a flower. Correct.",
        ],
        answer: "2 only.",
      },
      practiceSet: [
        { prompt: "The postman brought the (mail / male).", answer: "Mail" },
        { prompt: "He ate the (hole / whole) pizza.", answer: "Whole" },
        { prompt: "The bridge is made of (steal / steel).", answer: "Steel" },
        { prompt: "Spot the wrong sentence: 'He lives on the third tyre of the building.'", answer: "Wrong. A level of a building is a tier." },
      ],
      traps: [
        {
          title: "Corps is not corpse",
          body:
            "**Corps** (said 'core') is a body of people: the Army Medical Corps. **Corpse** is a dead body. A cadet should never mix these in an interview or an essay.",
        },
        {
          title: "Bear and bare",
          body:
            "To **bear** is to carry or endure (I cannot bear the heat). **Bare** means uncovered or empty (bare walls). Swapping them is one of the most common slips.",
        },
        {
          title: "All correct does happen",
          body:
            "Sets such as way / weigh / whey and crops / corps / corpse had every sentence correct. Do not assume the examiner always plants a mistake.",
        },
      ],
    },

    // C3 — sets naming actions, feelings and events
    {
      kind: "reference" as const,
      slug: "cdsenwd-actions",
      name: "Homophone sets: actions, feelings and events",
      intuition:
        "These sets mix a verb with nouns that sound like it: pare, pair, pear; seize, cease, crease. Decide first whether the sentence needs an action or a thing. That one question removes most wrong words.",
      definition:
        "How to use the table:\n" +
        "- Mark which word in each set is a **verb** (pare, seize, cease, censor, censure, insure, ensure, weave, wave, waive, peek).\n" +
        "- In a sentence, if the slot needs a verb, only the verbs can fill it.\n" +
        "- Then choose between the verbs by meaning.",
      table: {
        columns: ["Set", "Meanings", "Correct use", "Sitting"],
        rows: [
          { cells: ["Pare / pair / pear", "To trim or cut down; two of a kind; a fruit", "Pare the budget to the minimum.", "2025 (I), 2026 (I)"] },
          { cells: ["Seize / cease / crease", "To take by force; to stop; a fold line in cloth", "The firing will cease at midnight.", "2025 (I)"] },
          { cells: ["Censer / censor / censure", "A vessel for burning incense; to cut objectionable parts; to criticise strongly", "The film board censored two scenes.", "2026 (I)"] },
          { cells: ["Fate / fete / faith", "Destiny; a festive celebration; trust or belief", "The village fete had stalls, games and music.", "2026 (I)"] },
          { cells: ["Idyll / idle / idol", "A peaceful, happy scene; doing nothing; an image worshipped or a hero", "The film star was the idol of the youth.", "2026 (I)"] },
          { cells: ["Insure / ensure / unsure", "To protect with an insurance policy; to make certain; not certain", "Ensure that the door is locked.", "2026 (I)"] },
          { cells: ["Weave / wave / waive", "To make by crossing threads, or to put together; a ridge of water, or to move the hand; to give up a right", "The bank agreed to waive the late fee.", "2026 (II)"] },
          { cells: ["Peak / peek / pique", "The top or highest point; a quick look; resentment from hurt pride", "His pique at being ignored showed on his face.", "2026 (II)"] },
        ],
        caption: "Ensure and insure also came as a labelled pair in 2025 (I); pare, pair and pear came in both 2025 (I) and 2026 (I).",
      },
      pyqExampleId: "34925524-933f-47ff-9efe-aa2a2b4c3f52",
      selfCheckExample: {
        prompt:
          "Alter, Altar. 1. The tailor will altar the length of the sleeves. 2. The couple exchanged vows before the altar. Which sentences use the underlined word correctly?",
        steps: [
          "1: 'will ___' needs a verb meaning to change: alter. Altar is used, so wrong.",
          "2: 'before the ___' needs a noun: the raised table in a temple or church is the altar. Correct.",
        ],
        answer: "2 only.",
      },
      practiceSet: [
        { prompt: "Farmers (sew / sow) seeds in spring.", answer: "Sow", method: "sew = to stitch" },
        { prompt: "The wound will (heal / heel) in a week.", answer: "Heal" },
        { prompt: "He sat in the library to (pore / pour) over old maps.", answer: "Pore", method: "to pore over = to study closely" },
        { prompt: "Spot the wrong sentence: 'The censure board must approve every film.'", answer: "Wrong. A board that cuts objectionable parts is a censor board." },
      ],
      traps: [
        {
          title: "Censor and censure",
          body:
            "To **censor** is to cut parts of a film, book or report. To **censure** is to criticise formally (the House censured the minister). A **censer** is a vessel for incense.",
        },
        {
          title: "Ensure and insure",
          body:
            "**Ensure** = make certain (ensure you carry cash). **Insure** = protect with an insurance policy (insure the car). 'Kewal was ensure of the consequences' fails because the slot needs the adjective **unsure** or **sure**.",
        },
        {
          title: "Waive and wave",
          body:
            "To **waive** a right or a fee is to give it up. To **wave** is to move the hand or a ridge of water. To **weave** is to make cloth, or to put a story together.",
        },
      ],
    },

    // C4 — near-homophones
    {
      kind: "reference" as const,
      slug: "cdsenwd-near",
      name: "Near-homophones: words that only look alike",
      intuition:
        "These words do not sound exactly the same. They share most of their letters, so a quick reader takes one for another. Read each underlined word letter by letter, then test it in its sentence.",
      definition:
        "How to handle them:\n" +
        "- Say the underlined word aloud in your head, syllable by syllable.\n" +
        "- Ask what it means, and whether that meaning fits the sentence.\n" +
        "- An unusual but real sense is still correct. To bate = to hold back (as in 'with bated breath').",
      table: {
        columns: ["Set", "Meanings", "Correct use", "Sitting"],
        rows: [
          { cells: ["Séance / sconce / scone", "A meeting to contact the dead; a candle holder fixed to a wall; a small baked cake", "They served scones with tea.", "2025 (I)"] },
          { cells: ["Truism / altruism", "A statement so obviously true it hardly needs saying; selfless concern for others", "His altruism made him give away his savings.", "2025 (I)"] },
          { cells: ["Braid / beard / brood", "To weave hair into a plait; hair on the chin; to sit on eggs, or to think gloomily", "The hen broods her eggs.", "2025 (II)"] },
          { cells: ["Depose / deplore / deport", "To remove from office; to condemn strongly; to send out of a country", "The illegal migrants were deported.", "2025 (II)"] },
          { cells: ["Bate / bait / bade", "To hold back or lessen; food used to trap an animal; past tense of bid (said goodbye)", "We waited with bated breath.", "2025 (II)"] },
        ],
        caption: "Deplore means to condemn, so it cannot sit happily next to something good.",
      },
      pyqExampleId: "4a3da22d-c2a1-4160-8f65-0cb0352cc95d",
      selfCheckExample: {
        prompt:
          "Moral, Mortal, Morale. 1. The story ends with a simple moral. 2. All human beings are mortal. 3. The victory raised the team's moral. Which sentences use the underlined word correctly?",
        steps: [
          "1: the lesson of a story is its moral. Correct.",
          "2: mortal = certain to die. Correct.",
          "3: the team's spirit and confidence is its morale (stress on the second syllable). Moral is wrong.",
        ],
        answer: "1 and 2 only.",
      },
      practiceSet: [
        { prompt: "Later or latter: 'Of tea and coffee, I prefer the ___.'", answer: "Latter", method: "the second of two" },
        { prompt: "Beside or besides: 'Who came ___ Ravi?' (in addition to)", answer: "Besides", method: "beside = next to" },
        { prompt: "Deport means (a) to remove from office (b) to send out of a country?", answer: "(b)", method: "depose = remove from office" },
        { prompt: "A sconce is (a) a wall bracket for a candle or lamp (b) a small cake?", answer: "(a)", method: "a scone is the cake" },
      ],
      traps: [
        {
          title: "Altruism is not a saying",
          body:
            "**Altruism** is a quality: selfless concern for others. A **truism** is a statement so obvious it hardly needs saying. Ask whether the slot needs a quality or a statement.",
        },
        {
          title: "Deplore is negative",
          body:
            "To **deplore** is to condemn strongly. Pairing it with a good thing ('they happily deplore the new hospital') makes the sentence contradict itself.",
        },
        {
          title: "A rare sense can still be right",
          body:
            "'Bate your anger' looks wrong, but **bate** is a real verb meaning to hold back. Do not mark a sentence wrong just because a word looks unusual; check whether its meaning fits.",
        },
      ],
    },
  ],
};
