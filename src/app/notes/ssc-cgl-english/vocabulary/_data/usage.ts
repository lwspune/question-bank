import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EVO_USAGE_NOTE: SubtopicNote = {
  subtopicName: "Homophones and Word Meaning",
  title: "Homophones and Word Meaning",
  oneLineDefinition:
    "Words that sound alike but are spelt differently, words spelt alike with two unrelated meanings, and choosing the right word or word form for a sentence.",
  whyItMatters:
    "One hundred and eight questions in the bank, 42 from the 2023 shifts, 24 from the 2024 shifts and 42 from the 2025 shifts, and 64 of them EASY. The homophone blanks all come from the 2023 and 2024 shifts; the 38 homonym questions, which ask for the sentence where a word means something else, all come from the 2025 shifts.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscevous-homo",
      name: "Homophones: same sound, different spelling",
      intuition:
        "Every option sounds the same, so your ear cannot help. Read the sentence, decide what the blank must MEAN (a smell, a passage between seats, a strap for a horse), and only then look for the spelling that carries that meaning. Check the part of speech too: a blank after 'agreed to' needs a verb.",
      definition:
        "The sets SSC used:\n" +
        "- **Food and home:** flour (ground grain), floor (the ground of a room), flower (a bloom); pair (two of a kind), pear (a fruit); whole (all of it), hole (a gap); buy (purchase), by, bye; add (put in more), aid (help).\n" +
        "- **Body and health:** heal (cure), heel (back of the foot); pale (light in colour, unwell), pail (a bucket); dose (an amount of medicine), doze (sleep lightly).\n" +
        "- **People and rule:** heir (one who inherits), hair, hare; reign (rule), rein (a strap to control a horse); troupe (a group of performers), troop (a group of soldiers); capitol (the US Congress building), capital (chief city, money).\n" +
        "- **Ways and places:** route (a way), root, rout; aisle (a passage between rows), isle (an island); site (a place), cite (quote), sight (vision).\n" +
        "- **Actions:** waive (give up a right), wave; brakes (stop a vehicle), breaks; prays, preys (hunts); bear (put up with), bare (uncovered); rode (past of ride), road, rowed; write, right, rite.\n" +
        "- **Small words:** their (belonging to them), there; too (very, also), to, two; dew (water drops at dawn), due.\n" +
        "- **Look-alikes:** accept (receive), except (leave out); complement (go well with, complete), compliment (praise); dual (double), duel (a fight between two).",
      table: {
        columns: ["Word SSC wanted", "Meaning", "Sound-alikes in the options", "Asked in"],
        rows: [
          { cells: ["Scent", "A smell", "Sent, cent", "2023 (twice), 2024"] },
          { cells: ["Flour", "Ground grain for bread", "Floor, flower", "2024 (twice)"] },
          { cells: ["Floor", "The ground surface of a room", "Flour, flower", "2024"] },
          { cells: ["Heir", "One who inherits", "Hair, hare", "2023"] },
          { cells: ["Rein", "A strap to control a horse", "Reign, rain", "2023"] },
          { cells: ["Aisle", "A passage between rows of seats", "Isle, I'll", "2023"] },
          { cells: ["Troupe", "A group of performers", "Troop", "2023"] },
          { cells: ["Cite", "Quote as evidence", "Site, sight", "2023"] },
          { cells: ["Waive", "Give up a right or claim", "Wave", "2023"] },
          { cells: ["Pale", "Light in colour, unwell-looking", "Pail, pall", "2023"] },
          { cells: ["Dew", "Water drops formed overnight", "Due", "2023"] },
          { cells: ["Heal", "Cure", "Heel", "2024"] },
          { cells: ["Capitol", "The building where the US Congress meets", "Capital", "2024"] },
          { cells: ["Bear", "Put up with", "Bare, beer", "2024"] },
          { cells: ["Too", "More than enough, very", "To, two", "2024"] },
          { cells: ["Their", "Belonging to them", "There", "2024"] },
        ],
      },
      pyqExampleId: "0727d2b5-44f2-4884-8be8-2d44be6bf2b9",
      selfCheckExample: {
        prompt: "Choose the word for the blank: The king's ______ lasted forty years. (a) rain (b) rein (c) reign (d) ran",
        steps: ["The blank needs a word for a period of rule.", "Rein is a strap for a horse and rain is water; reign is rule."],
        answer: "(c) reign",
      },
      practiceSet: [
        { prompt: "Which spelling means 'a group of performers': troupe or troop?", answer: "Troupe" },
        { prompt: "Which word means 'to give up a right or claim': wave or waive?", answer: "Waive" },
        { prompt: "Fill in with complements or compliments: The red scarf ______ her grey coat.", answer: "Complements (goes well with)" },
        { prompt: "What is a capitol?", answer: "The building where the US Congress meets" },
      ],
      traps: [
        {
          title: "Waive and waiver",
          body: "Waive is the verb (to waive a tax); waiver is the noun (a tax waiver). After 'agreed to' only the verb fits, so SSC keyed waive, not waiver.",
        },
        {
          title: "Complement and compliment",
          body: "A complement completes or goes well with something; a compliment is praise. 'His shirt complemented his trousers' needs the e spelling.",
        },
        {
          title: "Capitol and capital",
          body: "The Capitol is one building, where the US Congress meets. A capital is a chief city, or money. SSC asked for the building.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevous-homonym",
      name: "Homonyms: same spelling, different meaning",
      intuition:
        "SSC prints a sentence with one word in bold, then four sentences that use the same spelling. Three keep the bold word's meaning; one uses a different word that happens to be spelt the same. Often the part of speech changes too: stern the adjective (strict) becomes stern the noun (the back of a ship). Find the three that agree and the odd one out is the answer.",
      definition:
        "How to work these:\n" +
        "- **Name the meaning first.** Say in two words what the bold word means in its own sentence (strict, a timepiece, a low sound).\n" +
        "- **Test each option against that meaning.** A sentence where the meaning still fits is not the answer, even if the setting changes.\n" +
        "- **A new form is not a new word.** 'Compacted the soil' keeps the sense of pressing close; it is the same word as a verb, not a homonym.\n" +
        "- **When no option is a true homonym.** Twenty-one of the 38 questions carry a notice: the word SSC printed has only one meaning. SSC's key picked the sentence that uses the word furthest from its normal setting.",
      table: {
        columns: ["Word", "Meaning in SSC's sentence", "The other meaning (keyed)", "Asked in"],
        rows: [
          { cells: ["Stern", "Strict, severe", "The rear part of a ship", "2025"] },
          { cells: ["Compact", "Small and neatly packed", "A formal agreement", "2025"] },
          { cells: ["Current", "Present, of now", "A flow of water", "2025 (twice)"] },
          { cells: ["Fine", "Subtle, precise", "A money penalty", "2025"] },
          { cells: ["Bass", "A low, deep sound", "A kind of fish", "2025"] },
          { cells: ["Ring", "A band worn on the finger", "To make a bell-like sound", "2025"] },
          { cells: ["Watch", "To observe", "A timepiece", "2025"] },
          { cells: ["Pike", "A long spear", "A freshwater fish", "2025"] },
          { cells: ["Vault", "An arched roof or chamber", "A gymnast's leap", "2025"] },
          { cells: ["Mitre", "A bishop's tall headdress", "A joint cut at an angle", "2025"] },
          { cells: ["Crosier", "A bishop's hooked staff", "The coiled young frond of a fern", "2025"] },
          { cells: ["Tripos", "The Cambridge honours exam", "A three-legged stool", "2025"] },
          { cells: ["Sconce", "A wall bracket for a light", "To fine a student (an Oxford custom)", "2025"] },
        ],
      },
      pyqExampleId: "09d383e4-e453-459d-bf3e-17b0dc055c45",
      selfCheckExample: {
        prompt: "Given sentence: 'She wore a light jacket.' Which sentence uses a homonym of 'light'? (a) The jacket was light and easy to carry. (b) A light bag is easier to lift. (c) Turn on the light, please. (d) He packed light for the trip.",
        steps: ["In the given sentence light means not heavy.", "Options a, b and d keep that meaning; in c light is brightness, a different word."],
        answer: "(c) Turn on the light, please.",
      },
      practiceSet: [
        { prompt: "Give two unrelated meanings of the word 'bass'.", answer: "A low, deep sound, and a kind of fish" },
        { prompt: "What does 'compact' mean when it is a noun?", answer: "A formal agreement" },
        { prompt: "Is the 'fine' in 'a parking fine' the same word as in 'a fine distinction'?", answer: "No: one is a money penalty, the other means subtle or precise" },
        { prompt: "What is the stern of a ship?", answer: "Its rear part" },
      ],
      traps: [
        {
          title: "Keep watch still means watching",
          body: "In 'the guards keep watch', watch still means observing, so it is not the homonym of 'watch the suspect'. The timepiece is the other word.",
        },
        {
          title: "A change of setting is not a change of meaning",
          body: "A mitre in a glass case and a mitre on a bishop's head are the same headdress. Only a sentence where the meaning itself changes (a mitre joint) holds the homonym.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevous-meaning",
      name: "Word meaning and word choice",
      intuition:
        "Some questions simply ask what a word means; others give a sentence and ask which word fits. For the second kind, check two things before meaning: which words usually go together (diametrically opposed, rigorous scrutiny) and which form the blank needs (a noun after 'widespread', an adverb after 'spoke').",
      definition:
        "What SSC asked:\n" +
        "- **Words for people:** termagant (a violent, quarrelsome woman), diffident (shy through lack of confidence), daredevil (a fearless person), atheist (one who does not believe in god), illiterate (one who cannot read and write).\n" +
        "- **Speech and truth:** harangue (a long, aggressive speech), verity (truth), perspicuous (clear, easy to understand).\n" +
        "- **Look-alike pairs:** adverse (harmful, as in adverse effects) and averse (unwilling, as in averse to risk); perspicuous (clear) and perspicacious (shrewd).\n" +
        "- **Words that go together:** diametrically opposed (completely opposite), rigorous scrutiny (close examination), a flock of birds and a herd of cattle.\n" +
        "- **Word forms:** the blank decides the form. After an adjective such as 'widespread' you need a noun (confusion); after a verb such as 'spoke', an adverb (perspicuously).",
      table: {
        columns: ["Word", "Meaning", "Asked in"],
        rows: [
          { cells: ["Harangue", "A long, aggressive speech", "2023"] },
          { cells: ["Termagant", "A violent, quarrelsome woman", "2023"] },
          { cells: ["Diffident", "Shy through lack of confidence", "2023"] },
          { cells: ["Retaliation", "Revenge", "2023"] },
          { cells: ["Colossal", "Very huge", "2024"] },
          { cells: ["Verity", "Truth", "2024"] },
          { cells: ["Cascade", "A waterfall", "2024"] },
          { cells: ["Affiliated", "Allied, officially connected", "2024"] },
          { cells: ["Daredevil", "A fearless person", "2024"] },
          { cells: ["Diametrically opposed", "Completely opposite", "2025"] },
          { cells: ["Rigorous scrutiny", "Close, careful examination", "2025"] },
          { cells: ["Perspicuously", "Clearly, in a way easy to follow", "2025"] },
        ],
      },
      pyqExampleId: "4036de9c-4fb4-4c04-bb1b-2aa3e4fa7676",
      selfCheckExample: {
        prompt: "Choose the word for the blank: He is ______ to taking risks with his savings. (a) adverse (b) averse (c) converse (d) diverse",
        steps: ["The sentence describes a person who is unwilling.", "Adverse means harmful; averse means unwilling, and it takes 'to'."],
        answer: "(b) averse",
      },
      practiceSet: [
        { prompt: "What is the difference between adverse and averse?", answer: "Adverse means harmful (adverse effects); averse means unwilling (averse to risk)" },
        { prompt: "As cattle are to a herd, birds are to a ______.", answer: "Flock" },
        { prompt: "What does 'verity' mean?", answer: "Truth" },
        { prompt: "Which word means 'shy through lack of confidence'?", answer: "Diffident" },
      ],
      traps: [
        {
          title: "Perspicuous and perspicacious",
          body: "Perspicuous speech is clear and easy to follow; a perspicacious person is shrewd. SSC put both in the options when the sentence was about speaking clearly.",
        },
        {
          title: "Adverse is not averse",
          body: "Weather and effects are adverse (harmful); people are averse (unwilling) to something. Diametrically takes neither: the fixed phrase is diametrically opposed.",
        },
      ],
    },
  ],
};
