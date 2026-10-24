import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESE_WORDS_NOTE: SubtopicNote = {
  subtopicName: "Prepositions, Word Choice and Idioms",
  title: "Prepositions, Word Choice and Idioms",
  oneLineDefinition:
    "The preposition a word takes, the right word between two that look alike, and the fixed phrases and extra words that a grammar rule alone will not catch.",
  whyItMatters:
    "Ninety-seven questions in the bank, 26 from the 2023 shifts, 38 from the 2024 shifts and 33 from the 2025 shifts. Grammar rules do not settle these: the preposition after a word, the meaning of look-alike words and the fixed phrases of English have to be known.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssceswo-prep",
      name: "The preposition a word takes",
      intuition:
        "Many words fix the preposition after them (good at, angry with a person, capable of), and some verbs take their object directly with no preposition at all (discuss, describe, reach, comprise). Learn them as pairs.",
      definition:
        "The groups:\n" +
        "- **Of:** capable of, confident of, afraid of, die of, built of (a material).\n" +
        "- **Other fixed prepositions:** good at, specialise in, angry with (a person), aptitude for, adapt to, talk to.\n" +
        "- **From, among, between:** prevent someone from + -ing; among for more than two, between for two.\n" +
        "- **No preposition:** discuss the issue, describe the scene, reach the station, tell me, order the soldiers, comprise experts, go abroad, return home.\n" +
        "- **Place, time, transport:** in the air, on the skin, by bus, from 10 till 6.\n" +
        "- **Despite and in spite of:** despite takes no of; in spite of does.",
      table: {
        columns: ["Wrong", "Right", "Asked in"],
        rows: [
          { cells: ["accused for", "accused of", "2025 (twice)"] },
          { cells: ["capable to / capable for", "capable of + -ing", "2025 (three times)"] },
          { cells: ["confident to win", "confident of winning", "2025 (twice)"] },
          { cells: ["good in / good with", "good at", "2024, 2025 (twice)"] },
          { cells: ["prevent him to go", "prevent him from going", "2025 (twice)"] },
          { cells: ["angry on", "angry with (a person)", "2025"] },
          { cells: ["specialises at", "specialises in", "2024"] },
          { cells: ["comprises of", "comprises", "2025"] },
          { cells: ["discussing about", "discussing", "2025"] },
          { cells: ["despite of", "despite (or in spite of)", "2025"] },
          { cells: ["between themselves (a team)", "among themselves", "2023"] },
          { cells: ["in bus", "by bus", "2025"] },
        ],
      },
      pyqExampleId: "1016c142-3495-4b53-990c-96e0b6224ca1",
      selfCheckExample: {
        prompt: "Choose the correct option: The firm specialises ___ software. (a) at (b) on (c) in (d) with",
        steps: ["Specialise takes in.", "\"The firm specialises in software.\""],
        answer: "(c) in",
      },
      practiceSet: [
        { prompt: "Correct the sentence: We reached at the station late.", answer: "We reached the station late." },
        { prompt: "Fill the preposition: She is angry ___ her brother.", answer: "with" },
        { prompt: "Correct the sentence: Despite of the rain, they played.", answer: "Despite the rain (or In spite of the rain), they played." },
        { prompt: "Between or among: Share the sweets ___ the five children.", answer: "among" },
      ],
      traps: [
        {
          title: "Adding a preposition the verb does not take",
          body: "Discuss, describe, reach and comprise take their object directly: \"discuss about\", \"reach at\" and \"comprise of\" are all errors.",
        },
        {
          title: "Despite of",
          body: "Only \"in spite of\" takes of. \"Despite\" stands alone: despite the rain.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssceswo-choice",
      name: "Look-alike words and the word that fits",
      intuition:
        "Two words that look or sound alike can mean quite different things: principle and principal, affect and effect, personal and personnel. In the questions that ask you to replace an underlined word, the right word is the one whose meaning fits the whole sentence.",
      definition:
        "The groups:\n" +
        "- **Look-alikes:** principle (a rule) and principal (chief; head of a school); affect (a verb) and effect (a noun); personal and personnel (staff); stationary (not moving) and stationery (writing materials); internal and interior; ulterior and interior.\n" +
        "- **Word form:** the slot decides noun, verb or adjective: succeed (verb), success (noun), successful (adjective).\n" +
        "- **Allowed or able:** a rule is \"allowed to\", a skill is \"able to\".\n" +
        "- **Fit the sentence:** read it with each option; ask what the sentence is about, then which option means that.",
      table: {
        columns: ["Wrong", "Right", "Asked in"],
        rows: [
          { cells: ["adopts itself (to water and land)", "adapts itself", "2023"] },
          { cells: ["beware of this fact", "aware of", "2023"] },
          { cells: ["noticeable people", "notable people", "2023"] },
          { cells: ["military person", "military personnel", "2023"] },
          { cells: ["lived by the same principals", "principles", "2024"] },
          { cells: ["the principle rights", "the principal rights", "2025"] },
          { cells: ["it had no affect", "no effect", "2024"] },
          { cells: ["interior problems (of a country)", "internal problems", "2024"] },
          { cells: ["not able to drink until 21", "not allowed to", "2024"] },
          { cells: ["cynical investors who believed every word", "credulous", "2024"] },
          { cells: ["greater accurateness", "greater accuracy", "2025"] },
        ],
      },
      pyqExampleId: "f9df91bb-03ce-467d-b9bd-e35c73bde88f",
      selfCheckExample: {
        prompt: "Find the part with the error: (a) She bought (b) some stationary (c) for school. (d) No error",
        steps: ["Stationary means not moving.", "Writing materials are stationery."],
        answer: "(b) some stationary",
      },
      practiceSet: [
        { prompt: "Principle or principal: He is a man of ___.", answer: "principle" },
        { prompt: "Correct the sentence: Work hard so that you may success.", answer: "Work hard so that you may succeed." },
        { prompt: "Correct the sentence (it is a hospital rule): You are not able to smoke here.", answer: "You are not allowed to smoke here." },
        { prompt: "Affect or effect: The medicine had a quick ___.", answer: "effect" },
      ],
      traps: [
        {
          title: "Choosing the word that only sounds right",
          body: "Principal and principle, stationary and stationery sound the same. Decide by meaning: a rule or a chief, not moving or paper and pens.",
        },
        {
          title: "A noun where the verb is needed",
          body: "After may, might or to, a verb is needed: \"may succeed\", never \"may success\".",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssceswo-idiom",
      name: "Fixed phrases, extra words and correct sentences",
      intuition:
        "Fixed phrases cannot be changed word by word (on foot, in detail, last night), and some words already carry a meaning, so adding to them repeats it (return back, more preferable). A few sentences are correct as printed, so choose No error only after every part checks out.",
      definition:
        "The groups:\n" +
        "- **Fixed phrases:** on foot, in detail, take pains, last night, nothing else but, in the matter of, in peril.\n" +
        "- **Collocations:** hopes are dashed, go on the rampage.\n" +
        "- **Phrasal verbs:** bring out (publish), give away (hand out prizes), back off (withdraw), call around (phone several people).\n" +
        "- **Redundancy:** return back, repeat again, more preferable, the reason is because: drop the extra word.\n" +
        "- **No error:** some sentences are correct as printed; check every part before choosing it.",
      table: {
        columns: ["Wrong", "Right", "Asked in"],
        rows: [
          { cells: ["drove on the rampage", "went on the rampage", "2023"] },
          { cells: ["every single day by walk", "on foot", "2023"] },
          { cells: ["hopes were beaten", "hopes were dashed", "2023"] },
          { cells: ["brought about a new book", "brought out", "2024"] },
          { cells: ["gave up the prizes", "gave away", "2024"] },
          { cells: ["told the agitators to back in", "back off", "2024"] },
          { cells: ["nothing else your pride", "nothing else but", "2024"] },
          { cells: ["returned back", "returned", "2025 (twice)"] },
          { cells: ["in details", "in detail", "2025"] },
          { cells: ["took pain", "took pains", "2025"] },
          { cells: ["yesterday night", "last night", "2025"] },
        ],
      },
      pyqExampleId: "8c3b7e39-1ff1-4ef5-80f2-205a7f7b79a0",
      selfCheckExample: {
        prompt: "Find the part with the error: (a) Please repeat (b) the question again (c) for the class. (d) No error",
        steps: ["Repeat already means say again.", "\"Again\" is extra, so the error is in (b): \"Please repeat the question for the class\"."],
        answer: "(b) the question again",
      },
      practiceSet: [
        { prompt: "Correct the sentence: The reason is because he was ill.", answer: "The reason is that he was ill." },
        { prompt: "What does it mean to bring out a book?", answer: "To publish it" },
        { prompt: "Remove the extra word: The two twins look alike.", answer: "The twins look alike." },
        { prompt: "Which phrasal verb means withdraw: back off or back in?", answer: "Back off" },
      ],
      traps: [
        {
          title: "Translating word for word",
          body: "\"By walk\", \"yesterday night\" and \"in details\" come from translating; English says on foot, last night, in detail.",
        },
        {
          title: "Missing a repeat because it sounds smooth",
          body: "\"Return back\" and \"more preferable\" read naturally but say the same thing twice. Return means come back; preferable already compares.",
        },
      ],
    },
  ],
};
