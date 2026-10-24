import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESE_MODIFIERS_NOTE: SubtopicNote = {
  subtopicName: "Articles, Adjectives and Comparison",
  title: "Articles, Adjectives and Comparison",
  oneLineDefinition:
    "Choosing a, an or the, treating uncountable nouns correctly, using the right degree of comparison, and an adverb where a verb needs one.",
  whyItMatters:
    "Sixty-nine questions in the bank, 23 from the 2023 shifts, 32 from the 2024 shifts and 14 from the 2025 shifts, and 54 of them EASY. Most are quick once you listen to the first sound of the next word and ask what a word describes: a noun takes an adjective, a verb an adverb.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesmo-article",
      name: "A, an, the and uncountable nouns",
      intuition:
        "A or an depends on the first sound of the next word, not its letter: an hour, a university. The is for something unique, already mentioned or defined, and for a superlative. Uncountable nouns such as advice and information take no a and no plural.",
      definition:
        "- **A or an by sound:** an hour, an heir, an MBA; a university, a European, a one-day match.\n" +
        "- **The:** for something unique (the sky), already mentioned, defined by what follows (the truth of the case), or with a superlative (the best).\n" +
        "- **No article:** general plurals (\"Historians study the past\") and fixed phrases (by chance, by bus, at home).\n" +
        "- **Uncountable nouns:** advice, information, luggage, feedback, evidence, homework and furniture take no a and no -s: \"some advice\", \"a piece of advice\".\n" +
        "- **Much and many:** much with uncountable nouns, many with plurals.\n" +
        "- **Few and a few:** a few means some; few means hardly any.\n" +
        "- **Order:** \"the next few days\", \"the first two chapters\".",
      authoredExample: {
        prompt: "Find the part with the error: (a) He gave me (b) an useful advice (c) about the test. (d) No error",
        steps: [
          "Advice is uncountable, so it takes no a or an.",
          "(Useful also begins with a \"yoo\" sound, so an would be wrong anyway.) It should read \"some useful advice\".",
        ],
        answer: "(b) an useful advice",
      },
      selfCheckExample: {
        prompt: "Choose the correct option: She has ___ MBA degree. (a) a (b) an (c) the (d) no article",
        steps: ["MBA is said \"em-bee-ay\", which starts with a vowel sound.", "So it takes an."],
        answer: "(b) an",
      },
      practiceSet: [
        { prompt: "A or an: ___ university", answer: "A (it begins with a \"yoo\" sound)" },
        { prompt: "Correct the sentence: I need some informations.", answer: "I need some information." },
        { prompt: "Few or a few: I have ___ friends here, so I am not lonely.", answer: "a few" },
        { prompt: "Which article: ___ sun rises in the east.", answer: "The" },
      ],
      pyqExampleId: "4788360b-b734-4ef0-a8c8-819814a9d68c",
      traps: [
        {
          title: "Choosing a or an by the letter",
          body: "It is the sound that counts: a university and a one-day match, but an hour and an heir.",
        },
        {
          title: "A plural for an uncountable noun",
          body: "Advices, informations, luggages and feedbacks are all wrong. Count them with \"pieces of\" instead.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesmo-compare",
      name: "Comparison, adjectives and adverbs",
      intuition:
        "Use the comparative (taller, better) with than and for two things, the superlative (the tallest) for one out of three or more, and the plain form in as ... as. A verb is described by an adverb (spoke clearly); a linking verb such as become takes an adjective (became violent).",
      definition:
        "- **Comparative + than:** better than, more slowly than; never \"more better\" or \"more taller\".\n" +
        "- **Two things:** the comparative, even with the: \"the cleverer of the two\".\n" +
        "- **Superlative:** the best of all, the greatest of the emperors (of or among, never than).\n" +
        "- **As ... as and so ... as** take the plain form: as smart as.\n" +
        "- **Latin comparatives take to:** senior, junior, superior, inferior, prior, and prefer: \"superior to\".\n" +
        "- **Compare like with like:** \"smaller than yours\", not \"smaller than you\".\n" +
        "- **Adverb for a verb:** sings well, ran quickly, badly injured. **Adjective after a linking verb** (be, become, seem, look, taste): became violent, tastes bad.\n" +
        "- **Very goes with the plain form:** very quick, much quicker; never \"very quicker\".",
      authoredExample: {
        prompt: "Find the part with the error: (a) Of the two sisters, (b) Meena is the most clever (c) one. (d) No error",
        steps: [
          "Only two sisters are compared, so the comparative is needed, not the superlative.",
          "It should read \"Meena is the cleverer one\".",
        ],
        answer: "(b) Meena is the most clever",
      },
      selfCheckExample: {
        prompt: "Choose the correct option: This road is ___ than that one. (a) more wider (b) wider (c) widest (d) more wide",
        steps: ["Than calls for the comparative.", "Wide is one syllable, so its comparative is wider, with no more."],
        answer: "(b) wider",
      },
      practiceSet: [
        { prompt: "Correct the sentence: He drives careful.", answer: "He drives carefully." },
        { prompt: "Correct the sentence: This book is inferior than that one.", answer: "This book is inferior to that one." },
        { prompt: "Which is right: as tall as, or as taller as?", answer: "As tall as" },
        { prompt: "Correct the sentence: My bag is heavier than you.", answer: "My bag is heavier than yours." },
      ],
      pyqExampleId: "07c3b26b-b979-4e4a-829b-1f905704fc48",
      traps: [
        {
          title: "Doubling the comparative",
          body: "\"More better\" and \"more taller\" say the comparison twice. Use better and taller alone.",
        },
        {
          title: "An adverb after a linking verb",
          body: "\"The food tastes badly\" and \"She looks beautifully\" are wrong: a linking verb takes an adjective, so tastes bad, looks beautiful.",
        },
      ],
    },
  ],
};
