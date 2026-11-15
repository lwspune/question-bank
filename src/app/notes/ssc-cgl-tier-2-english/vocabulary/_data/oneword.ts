import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EVO_ONEWORD_NOTE: SubtopicNote = {
  subtopicName: "One-Word Substitution",
  title: "One-Word Substitution",
  oneLineDefinition:
    "A phrase or description is given, and the answer is the single word that means exactly that, for a kind of person or for a thing, act or idea.",
  whyItMatters:
    "18 questions in the Tier II bank, 16 EASY and 2 MODERATE. Narcissist was asked twice, and word roots (phil-, ped-, -phobia) unlock many of the rest.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2evoow-person",
      name: "Words for kinds of people",
      intuition:
        "Many one-word answers name a person by what they do or how they behave. The endings help: -ist and -er name a doer, -ant names someone who acts a certain way.",
      definition:
        "Useful roots:\n" +
        "- **phil-** = love: philanthropist (loves mankind).\n" +
        "- **ped-** = foot: pedestrian (goes on foot).\n" +
        "- **intro-** = inward: introvert (turned inward, shy).\n" +
        "- **in- + fallible:** infallible (cannot make a mistake).",
      table: {
        columns: ["Description", "One word", "Asked in"],
        rows: [
          { cells: ["Admires oneself too much", "Narcissist", "2022, 2024"] },
          { cells: ["Photographers who chase celebrities", "Paparazzi", "2022"] },
          { cells: ["One who loves mankind", "Philanthropist", "2022"] },
          { cells: ["Reserved and shy", "Introvert", "2022"] },
          { cells: ["A flatterer, a boot licker", "Sycophant", "2022"] },
          { cells: ["One who cannot make a mistake", "Infallible", "2024"] },
          { cells: ["One who walks on foot", "Pedestrian", "2024"] },
        ],
      },
      pyqExampleId: "a97dda9a-8a73-4be6-a6ab-0086659470e4",
      selfCheckExample: {
        prompt: "One word for 'a person who gives money and help to people in need': (a) Miser (b) Philanthropist (c) Misanthrope (d) Pessimist",
        steps: ["Phil- means love; -anthrop- means mankind.", "One who loves and helps mankind: philanthropist."],
        answer: "(b) Philanthropist",
      },
      practiceSet: [
        { prompt: "One word for 'a person who walks on foot'?", answer: "Pedestrian" },
        { prompt: "One word for 'a person who flatters to win favour'?", answer: "Sycophant" },
        { prompt: "One word for 'one who never makes a mistake'?", answer: "Infallible" },
      ],
      traps: [
        {
          title: "Mixing up philanthropist and misanthrope",
          body: "Phil- loves; mis- hates. A misanthrope dislikes people, the exact opposite of a philanthropist.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2evoow-thing",
      name: "Words for things, acts and ideas",
      intuition:
        "The rest name a place, an act, a field of study or a fear. A '-phobia' is a fear, an '-ary' is often a store, '-culture' is growing, and '-cracy' is rule.",
      definition:
        "Useful endings:\n" +
        "- **-phobia** = fear: cacophobia (fear of ugliness).\n" +
        "- **-ary** = place for: granary (place for grain).\n" +
        "- **-culture** = growing: horticulture (fruits, vegetables, flowers).\n" +
        "- **-cracy** = rule: democracy (rule by the people).",
      table: {
        columns: ["Description", "One word", "Asked in"],
        rows: [
          { cells: ["Wilful destruction", "Sabotage", "2022"] },
          { cells: ["Arched garden frame with climbing plants", "Pergola", "2022"] },
          { cells: ["Growing fruits, vegetables, flowers", "Horticulture", "2022"] },
          { cells: ["Ability to express oneself clearly", "Articulation", "2023"] },
          { cells: ["A place for grains", "Granary", "2023"] },
          { cells: ["A place of activity, debate or conflict", "Arena", "2024"] },
          { cells: ["A sudden violent upheaval", "Turbulence", "2024"] },
          { cells: ["Speaking disrespectfully of sacred things", "Blasphemy", "2024"] },
          { cells: ["Government by the people", "Democracy", "2024"] },
          { cells: ["Fear of ugliness", "Cacophobia", "2025"] },
        ],
      },
      pyqExampleId: "906eb486-92ff-494d-a3e8-732d8ce1994c",
      selfCheckExample: {
        prompt: "One word for 'a building where grain is stored': (a) Arsenal (b) Granary (c) Aviary (d) Apiary",
        steps: ["-ary is a place for something; gran- is grain.", "Aviary is for birds, apiary for bees, arsenal for weapons."],
        answer: "(b) Granary",
      },
      practiceSet: [
        { prompt: "One word for 'rule by the people'?", answer: "Democracy" },
        { prompt: "One word for 'the cultivation of gardens, fruits and flowers'?", answer: "Horticulture" },
        { prompt: "One word for 'deliberate damage to stop something working'?", answer: "Sabotage" },
      ],
      traps: [
        {
          title: "Choosing the right ending with the wrong root",
          body: "Aviary, apiary and granary all end in -ary. The root (avi- birds, api- bees, gran- grain) decides which place it is.",
        },
      ],
    },
  ],
};
