import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ECZ_GRAMMAR_NOTE: SubtopicNote = {
  subtopicName: "Cloze: The Grammar Around the Blank",
  title: "Cloze: The Grammar Around the Blank",
  oneLineDefinition:
    "Blanks settled by grammar alone: an article or a small word like few or as, the form of a verb, or the preposition a phrase needs.",
  whyItMatters:
    "12 of the 35 Tier II cloze questions, all EASY. These are the blanks to answer first, because the words on either side decide them without reading the whole passage.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2eczgr-small",
      name: "Articles and small words",
      intuition:
        "Often three of the four options are the wrong kind of word for the gap. A gap before a noun with 'weeks' after it wants a quantity word; a gap before 'Solar System' wants 'the'. Read the word right after the gap first.",
      definition:
        "- **The:** for something unique or already known: the Sun, the Solar System, the first floor.\n" +
        "- **A:** for one of many, before a consonant sound: a very beautiful part.\n" +
        "- **Few, a few, little:** few and a few with countable nouns (a few weeks); little with uncountable (little water).\n" +
        "- **As ... as and times as:** 'a hundred times as wide as the Earth', never 'wide than'.\n" +
        "- **Intensifiers:** 'quite devastating' (really), not 'seldom' or 'vaguely devastating'.",
      authoredExample: {
        prompt: "Fill the gap: The village has only a ___ houses, all built of stone. (a) little (b) few (c) less (d) much",
        steps: ["'Houses' can be counted.", "With a countable noun after 'a', the word is 'few'."],
        answer: "(b) few",
      },
      selfCheckExample: {
        prompt: "Fill the gap: Mount Everest is ___ highest mountain in the world. (a) a (b) an (c) the (d) some",
        steps: ["'Highest ... in the world' points to one unique mountain.", "A superlative takes 'the'."],
        answer: "(c) the",
      },
      practiceSet: [
        { prompt: "Fill the gap: This tower is twice as tall ___ the old one.", answer: "as" },
        { prompt: "Fill the gap: There is very ___ milk left in the jug. (few / little)", answer: "little" },
        { prompt: "Fill the gap: She lives in ___ small town near the coast. (a / the)", answer: "a" },
      ],
      pyqExampleId: "01282e4b-4695-423a-81d8-bc5b1c74ae45",
      traps: [
        {
          title: "Using 'than' after 'as'",
          body: "'Times as wide' is completed by 'as', not 'than'. 'Than' only follows a comparative like wider.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2eczgr-verb",
      name: "The verb the sentence needs",
      intuition:
        "A blank before an object usually needs a verb, and its form is fixed by the subject and the time of the passage. A passage written in the present keeps its verbs in the present.",
      definition:
        "- **Agreement:** a singular subject takes -s: 'Climate change poses a threat'. A plural subject does not: 'organisations that comprise civil society'.\n" +
        "- **Time:** match the passage. A passage about what happened in October takes the past ('levels reached in October').\n" +
        "- **Duty:** 'must' for what has to be done ('Nations must commit').",
      authoredExample: {
        prompt: "Fill the gap: Air pollution ___ a serious risk to children's health. (a) pose (b) poses (c) posing (d) have posed",
        steps: ["'Air pollution' is singular.", "In the present, it takes 'poses'."],
        answer: "(b) poses",
      },
      selfCheckExample: {
        prompt: "Fill the gap: The players who ___ the team come from five states. (a) forms (b) form (c) forming (d) has formed",
        steps: ["'Who' refers to 'players', which is plural.", "The plural verb is 'form'."],
        answer: "(b) form",
      },
      practiceSet: [
        { prompt: "Fill the gap: Prices fell to their lowest level, ___ last March. (reach)", answer: "reached" },
        { prompt: "Fill the gap: Every citizen ___ obey the law. (must / might)", answer: "must" },
        { prompt: "Fill the gap: The new rule ___ every driver to carry a licence. (require)", answer: "requires" },
      ],
      pyqExampleId: "8e7a9417-e75f-430c-97a8-02dc5d9f48c5",
      traps: [
        {
          title: "Matching the verb to the nearest noun",
          body: "In 'organisations that ___ civil society', the verb agrees with organisations (plural), not with society.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2eczgr-prep",
      name: "The preposition a phrase needs",
      intuition:
        "Some verbs and nouns come with their own preposition: graze on grass, break down, fall against the dollar. If the gap sits right after such a word, the preposition is already decided.",
      definition:
        "- **Verb + preposition pairs:** graze on, depend on, consist of, break down (decompose).\n" +
        "- **Against:** a currency falls or rises against another currency.\n" +
        "- **Check the meaning of the pair:** 'break down' means fall apart; 'break out' means start suddenly.",
      authoredExample: {
        prompt: "Fill the gap: Leaves slowly break ___ into soil on the forest floor. (a) up (b) out (c) down (d) in",
        steps: ["The meaning is 'decompose'.", "That is 'break down'."],
        answer: "(c) down",
      },
      selfCheckExample: {
        prompt: "Fill the gap: The euro gained 2% ___ the yen this week. (a) for (b) against (c) of (d) with",
        steps: ["One currency is measured against another.", "The preposition is 'against'."],
        answer: "(b) against",
      },
      practiceSet: [
        { prompt: "Fill the gap: Sheep feed ___ grass all day.", answer: "on" },
        { prompt: "Fill the gap: The old car broke ___ on the highway.", answer: "down" },
        { prompt: "Fill the gap: A fire broke ___ in the market last night.", answer: "out" },
      ],
      pyqExampleId: "7a319b90-4bb4-4aab-97f2-a574d7b78a32",
      traps: [
        {
          title: "Reading only the verb",
          body: "Break up, break out and break down are all real, so the verb alone does not decide. The passage's meaning (decompose, start, end) does.",
        },
      ],
    },
  ],
};
