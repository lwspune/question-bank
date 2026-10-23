import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCL_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Word Classification",
  title: "Word Classification",
  oneLineDefinition:
    "Four words or word pairs are given and three belong to one group: the same kind of thing, a narrower group inside it, the same meaning, or the same relation inside a pair. Name the group and find the word outside it.",
  whyItMatters:
    "Fifty-four questions in the bank, 48 of them from the 2025 shifts, with 51 EASY and 3 MODERATE. Most need a general-knowledge fact rather than a calculation, so these are the quickest marks in the chapter for a student who reads widely, and a trap for one who stops at the first group that fits.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrclwo-kind",
      name: "Naming the kind of thing",
      intuition:
        "Most word questions ask what kind of thing each word names: an organ, a planet, a tax, a piece of software. Three words share a kind; the fourth is something else that sounds close.",
      definition:
        "1. Say the kind of each word in two or three words of your own: \"a temperature scale\", \"a part of the eye\".\n" +
        "2. Look for the kind that fits exactly three of the four.\n" +
        "3. The odd word is often from a neighbouring kind: a star among planets, a sea among oceans, software among hardware.\n" +
        "- **A category word among its members:** when one option names the group the other three belong to (Classical Languages beside Tamil, Sanskrit and Kannada), SSC's key picks the category word.\n" +
        "- **Fast route:** read the four words aloud as a list. The one that does not belong in the sentence \"These are all ...\" is usually clear before you name the group.",
      authoredExample: {
        prompt: "Find the odd one out: (a) Copper (b) Iron (c) Oxygen (d) Silver",
        steps: [
          "Copper, iron and silver are metals.",
          "Oxygen is a gas and not a metal.",
        ],
        answer: "(c) Oxygen",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) Kidney (b) Liver (c) Tibia (d) Heart",
        steps: [
          "Kidney, liver and heart are organs of the body.",
          "The tibia is a bone of the lower leg.",
        ],
        answer: "(c) Tibia",
      },
      practiceSet: [
        { prompt: "Find the odd one out: Mercury, Mars, Moon, Neptune", answer: "Moon", method: "The Moon is a satellite of the Earth; the others are planets." },
        { prompt: "Find the odd one out: Hockey, Cricket, Chess, Football", answer: "Chess", method: "Chess is a board game; the others are field games played with a ball." },
        { prompt: "Find the odd one out: Ganga, Godavari, Krishna, Chilika", answer: "Chilika", method: "Chilika is a lake; the others are rivers." },
        { prompt: "Find the odd one out: Keyboard, Mouse, Scanner, Printer", answer: "Printer", method: "A printer is an output device; the others are input devices." },
      ],
      pyqExampleId: "f7502d8f-c564-46e6-bcef-7274ba046789",
      traps: [
        {
          title: "Stopping at a group that holds all four",
          body:
            "Saturn, Venus, Jupiter and the Sun are all bodies in the solar system, so that group splits nothing. Narrow it until exactly three fit: three planets and one star.",
        },
        {
          title: "Taking the category word for a member",
          body:
            "When one option is the name of the group the others belong to, it is not one more member. SSC's keys treat the category word as the odd one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclwo-narrow",
      name: "Narrowing the group",
      intuition:
        "Sometimes all four words share a broad group (four cities, four dances, four freedom fighters), and the question turns on a narrower group inside it: cities of one state, classical dances, leaders who became Prime Minister.",
      definition:
        "1. If all four fit the first group you think of, the answer lies one level down.\n" +
        "2. Ask the next question about each word: which state, which era, which kind of instrument, which side of a list.\n" +
        "3. The narrower group must hold exactly three words.\n" +
        "- **Common narrow groups:** cities of one state; state capitals; Indus Valley sites; classical against folk dances; percussion against stringed instruments; programming against markup languages; Prime Ministers among other leaders.\n" +
        "- **Fast route:** look for the word that comes from a different place or time. It is the odd one far more often than a word that differs in some finer way.",
      authoredExample: {
        prompt: "Find the odd one out: (a) Mumbai (b) Pune (c) Nagpur (d) Indore",
        steps: [
          "All four are cities, so the broad group splits nothing.",
          "Narrow it by state: Mumbai, Pune and Nagpur are in Maharashtra.",
          "Indore is in Madhya Pradesh.",
        ],
        answer: "(d) Indore",
      },
      selfCheckExample: {
        prompt: "Find the odd one out: (a) Violin (b) Guitar (c) Veena (d) Flute",
        steps: [
          "All four are musical instruments.",
          "Violin, guitar and veena are played on strings.",
          "The flute is a wind instrument.",
        ],
        answer: "(d) Flute",
      },
      practiceSet: [
        { prompt: "Find the odd one out: Kathakali, Kuchipudi, Manipuri, Bhangra", answer: "Bhangra", method: "Bhangra is a folk dance of Punjab; the others are classical dances." },
        { prompt: "Find the odd one out: Wheat, Rice, Jute, Maize", answer: "Jute", method: "Jute is a fibre crop; the others are food grains." },
        { prompt: "Find the odd one out: Dispur, Shillong, Kohima, Silchar", answer: "Silchar", method: "Dispur, Shillong and Kohima are state capitals (Assam, Meghalaya, Nagaland); Silchar is not a capital." },
        { prompt: "All four options in a question are freedom fighters. What should you do next?", answer: "Look for a narrower group that holds exactly three of them." },
      ],
      pyqExampleId: "3e6ecc16-cae7-4151-a516-e85d97769284",
      traps: [
        {
          title: "Answering from the broad group",
          body:
            "Four rivers, four cities or four leaders cannot be split by their broad group. The answer is always one level down, so keep narrowing.",
        },
        {
          title: "Confusing a big city with the capital",
          body:
            "Guwahati is the largest city of Assam, but the capital is Dispur. When a question is about capitals, check the capital itself, not the best-known city.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclwo-meaning",
      name: "Grouping words by meaning",
      intuition:
        "Here the words are grouped by what they mean, not by what they name. Three words mean nearly the same thing, or three pairs are pairs of similar words, and the odd one means the opposite.",
      definition:
        "- **Single words:** find the shared meaning of three (all mean quiet, all mean detailed). The odd word usually means the opposite.\n" +
        "- **Word pairs:** decide whether each pair is two words of similar meaning or two opposites. Three pairs share one type; the odd pair has the other.\n" +
        "- The stem's note asks you to treat the words as meaningful English words, so ignore the number of letters or vowels.\n" +
        "- **Fast route:** look for the one word with a clearly opposite feel (Simple among Complex words, Clamorous among quiet words).",
      authoredExample: {
        prompt: "Find the word that does not fit: Brave, Bold, Fearless, Timid, Daring",
        steps: [
          "Brave, bold, fearless and daring all mean ready to face danger.",
          "Timid means easily frightened, the opposite.",
        ],
        answer: "Timid",
      },
      selfCheckExample: {
        prompt: "Find the odd pair: Big : large, Quick : fast, Begin : start, Rich : poor",
        steps: [
          "Big and large, quick and fast, begin and start are pairs of words with the same meaning.",
          "Rich and poor are opposites.",
        ],
        answer: "Rich : poor",
      },
      practiceSet: [
        { prompt: "Find the word that does not fit: Happy, Cheerful, Glad, Gloomy", answer: "Gloomy", method: "It means sad; the others mean happy." },
        { prompt: "Find the odd pair: Hot : cold, Up : down, Wet : dry, Shut : close", answer: "Shut : close", method: "It is a pair of words with the same meaning; the others are opposites." },
        { prompt: "Find the word that does not fit: Ancient, Old, Aged, Modern", answer: "Modern" },
        { prompt: "In a word-pair question, are 'Generous : kind' and 'Generous : mean' the same type of pair?", answer: "No: the first pair is similar in meaning, the second is a pair of opposites." },
      ],
      pyqExampleId: "8c96c7d1-2e7c-4a13-87fa-df355dab10ff",
      traps: [
        {
          title: "Calling two near words opposites",
          body:
            "Worry and fear are not opposites: both are kinds of unease. Decide for each pair whether the two words point the same way before you compare it with the others.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrclwo-pairs",
      name: "The relation inside a word pair",
      intuition:
        "Some pairs are linked by a relation rather than by meaning: a whole and its part, an organ and the doctor who treats it, a sport and its team size. Three pairs share the relation; the fourth either uses another relation or gets the fact wrong.",
      definition:
        "1. Put the first pair into a short sentence: \"pages are part of a book\".\n" +
        "2. Test the same sentence on every other pair. The pair it does not fit is the odd one.\n" +
        "3. Keep the order of the words: \"a book has pages\" is not the same relation as \"shoes are worn on feet\".\n" +
        "4. When every pair has the same relation, check the facts: a wrong number of sides or players makes a pair odd.\n" +
        "- **Fast route:** a pair whose second word could not go into the sentence at all is the answer; you do not need to test it further.",
      authoredExample: {
        prompt: "Find the odd pair: Car : wheel, Tree : branch, House : roof, Pen : paper",
        steps: [
          "The sentence \"a wheel is part of a car\" fits the first three: a branch is part of a tree, a roof is part of a house.",
          "Paper is not part of a pen; a pen writes on paper.",
        ],
        answer: "Pen : paper",
      },
      selfCheckExample: {
        prompt: "Find the odd pair: Teacher : school, Doctor : hospital, Chef : kitchen, Judge : stadium",
        steps: [
          "Each pair names a worker and the place where that person works.",
          "A judge works in a court, not a stadium.",
        ],
        answer: "Judge : stadium",
      },
      practiceSet: [
        { prompt: "Find the odd pair: Cow : calf, Dog : puppy, Cat : kitten, Horse : cub", answer: "Horse : cub", method: "The young of a horse is a foal." },
        { prompt: "Find the odd pair: Cricket : 11 players, Basketball : 5 players, Volleyball : 6 players, Kabaddi : 9 players", answer: "Kabaddi : 9 players", method: "A kabaddi side has 7 players on court." },
        { prompt: "In the pair Book : pages, how is the second word related to the first?", answer: "The pages are part of the book." },
        { prompt: "Are 'Shoes : feet' and 'Gloves : hands' the same relation?", answer: "Yes: each names something worn and where it is worn." },
      ],
      pyqExampleId: "c6e0f0ae-bece-4040-a224-9903bd358cca",
      traps: [
        {
          title: "Reading the pair in the other order",
          body:
            "\"Shoes : feet\" reads as something worn and where it is worn, not as a whole and its part. Say each pair's relation in the order printed before you match it with the others.",
        },
        {
          title: "Ignoring a wrong fact inside a correct relation",
          body:
            "Every pair can share one relation (a shape and its number of sides) while one gets the number wrong, such as a hexagon with 8 sides. Check each fact as well as the relation.",
        },
      ],
    },
  ],
};
