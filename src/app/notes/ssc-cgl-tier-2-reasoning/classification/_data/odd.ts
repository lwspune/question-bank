import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_RCL_ODD_NOTE: SubtopicNote = {
  subtopicName: "Odd One Out: Words and Numbers",
  title: "Odd One Out: Words and Numbers",
  oneLineDefinition:
    "Pick the word, word pair, number pair or number triad that does not share the feature the other three share.",
  whyItMatters:
    "14 questions in the Tier II bank, 12 EASY and 2 MODERATE. For words the shared feature is a category; for numbers it is one rule, usually a multiple or a square.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2rclod-word",
      name: "Odd word or word pair",
      intuition:
        "Say what three of the words are: fruits, big cats, capital cities. The word outside that group is the answer. For pairs, say the link (place : what you do there) and find the pair where it fails.",
      definition:
        "- **Words:** name the narrowest group three belong to (big cats, not just animals).\n" +
        "- **Pairs:** turn each pair into a sentence: 'you pray in a temple', 'you watch a film in a theatre'. The pair that makes a wrong sentence is odd.\n" +
        "- **Ignore spelling and length;** SSC says the words must be grouped by meaning.",
      authoredExample: {
        prompt: "Odd one out: Mango, Apple, Potato, Banana",
        steps: ["Mango, apple and banana are fruits.", "Potato is a vegetable."],
        answer: "Potato",
      },
      selfCheckExample: {
        prompt: "Odd pair: Pen : Write, Knife : Cut, Spoon : Stir, Chair : Run",
        steps: ["Each pair is a tool and what it is used for.", "A chair is not used to run."],
        answer: "Chair : Run",
      },
      practiceSet: [
        { prompt: "Odd one out: Lion, Tiger, Leopard, Wolf", answer: "Wolf (the others are big cats)" },
        { prompt: "Odd pair: Hot : Cold, Up : Down, Big : Large, Fast : Slow", answer: "Big : Large (the others are opposites)" },
        { prompt: "Odd one out: Delhi, Mumbai, Chennai, Nepal", answer: "Nepal (a country, the others are cities)" },
      ],
      pyqExampleId: "f6db88ee-378d-45e0-93b8-7f5dcb81cf86",
      traps: [
        {
          title: "Using too wide a group",
          body: "Violin, sitar, guitar and tabla are all 'musical instruments'. The odd one shows only in the narrower group: stringed instruments, which leaves out the tabla.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2rclod-number",
      name: "Odd number pair or triad",
      visualizationSlug: "ssc-t2-odd-pair",
      intuition:
        "Every pair turns its left number into its right number the same way, except one. Work that way out from two pairs, try it on the remaining two, and whichever pair breaks it is your answer.",
      definition:
        "Rules to try, in order:\n" +
        "- **A fixed multiple:** 14 → 98 is × 7.\n" +
        "- **Multiply and add:** n × 3 + 3, n × 2 + 1.\n" +
        "- **Squares and cubes:** n², n² + n, n³ − n.\n" +
        "- **Triads:** the third from the first two (a × b, a + b), or each term from the one before.\n" +
        "- **Do not split numbers into digits** unless the stem allows it.",
      authoredExample: {
        prompt: "Odd pair: 3 : 9, 5 : 25, 6 : 36, 7 : 48",
        steps: ["3², 5² and 6² give 9, 25 and 36.", "7² = 49, not 48."],
        answer: "7 : 48",
      },
      selfCheckExample: {
        prompt: "Odd pair: 4 : 20, 6 : 30, 9 : 45, 7 : 36",
        steps: ["The rule is × 5: 20, 30, 45.", "7 × 5 = 35, not 36."],
        answer: "7 : 36",
      },
      practiceSet: [
        { prompt: "Odd pair: 2 : 8, 3 : 27, 4 : 64, 5 : 120", answer: "5 : 120 (cubes; 5³ = 125)" },
        { prompt: "Odd triad: (2, 3, 6), (4, 5, 20), (3, 7, 21), (5, 6, 31)", answer: "(5, 6, 31): the others are a × b" },
        { prompt: "Odd pair: 10 : 21, 7 : 15, 12 : 25, 9 : 20", answer: "9 : 20 (rule n × 2 + 1 gives 19)" },
      ],
      pyqExampleId: "0d07aa2a-9b3a-41ad-a8f4-6cbabca5eeda",
      traps: [
        {
          title: "Finding a rule from one pair",
          body: "Any one pair fits many rules. Fix the rule using two pairs, then test it on the rest; the odd pair is the one it fails.",
        },
      ],
    },
  ],
};
