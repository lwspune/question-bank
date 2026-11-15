import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_EVO_SPELLING_NOTE: SubtopicNote = {
  subtopicName: "Spelling and Words That Sound Alike",
  title: "Spelling and Words That Sound Alike",
  oneLineDefinition:
    "Spotting the misspelt word (or the correct one), and choosing between words that sound the same but are spelt and meant differently, like route and root or bear and bare.",
  whyItMatters:
    "28 questions in the Tier II bank, all EASY. Spelling errors cluster in a few places (double letters, -ance or -ence, -able or -ible), so knowing those places finds most of them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "ssc2evosp-spelling",
      name: "Spelling",
      intuition:
        "Misspellings in SSC options are not random: a letter dropped from a double (suceeded), the wrong vowel in an ending (indispensible), or two letters swapped (guage). Check those three places first.",
      definition:
        "Where errors hide:\n" +
        "- **Double letters:** succeeded, affiliated, nipped, accede.\n" +
        "- **Endings:** indispensable (-able), descendant, emphasis.\n" +
        "- **Swapped vowels:** gauge (a before u), guarantee, grandeur.\n" +
        "- **Odd words:** practitioner, consensus, systematic, vacillates, grotesque.",
      table: {
        columns: ["Misspelt as asked", "Correct", "Asked in"],
        rows: [
          { cells: ["suceeded", "succeeded", "2022"] },
          { cells: ["afiliated", "affiliated", "2022"] },
          { cells: ["Guarentee", "Guarantee", "2022"] },
          { cells: ["Acede", "Accede", "2022"] },
          { cells: ["Desedent", "Descendant", "2022"] },
          { cells: ["conscence", "consensus", "2022"] },
          { cells: ["systemetic", "systematic", "2022"] },
          { cells: ["granduor, monumants", "grandeur, monuments", "2022"] },
          { cells: ["emphasiss", "emphasis", "2023"] },
          { cells: ["niped", "nipped", "2024"] },
          { cells: ["guage", "gauge", "2024"] },
          { cells: ["indispensible", "indispensable", "2024"] },
          { cells: ["Practitionaire", "Practitioner", "2024"] },
          { cells: ["Impetunent", "Impertinent", "2025"] },
        ],
      },
      pyqExampleId: "2afa45a7-4619-4705-8fa4-a3d9890fe283",
      selfCheckExample: {
        prompt: "Select the incorrectly spelt word: (a) Necessary (b) Occasion (c) Accomodate (d) Embarrass",
        steps: ["Check the double letters.", "'Accommodate' has a double c AND a double m; 'Accomodate' drops one m."],
        answer: "(c) Accomodate",
      },
      practiceSet: [
        { prompt: "Correct the spelling: 'recieve'", answer: "receive" },
        { prompt: "Correct the spelling: 'independant'", answer: "independent" },
        { prompt: "Correct the spelling: 'occured'", answer: "occurred" },
      ],
      traps: [
        {
          title: "Reading a word as you expect it",
          body: "Guage and gauge look alike at speed. Read each option letter by letter around the vowels and double letters.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "ssc2evosp-sound",
      name: "Words that sound alike",
      intuition:
        "Homophones sound the same but differ in spelling and meaning, so the sentence's meaning picks the one. A homonym is the same word with a second meaning, like address (where you live) and address (a speech).",
      definition:
        "How to answer:\n" +
        "- **Ask what the gap means:** the minister takes a road (route), not a plant part (root).\n" +
        "- **Check the part of speech:** blew is a verb (past of blow); blue is a colour.\n" +
        "- **For homonyms,** find the sentence where the same word carries a different meaning.",
      table: {
        columns: ["Right word", "Sound-alike", "Asked in"],
        rows: [
          { cells: ["blew (the wind blew)", "blue", "2022"] },
          { cells: ["maize (a crop)", "maze", "2022"] },
          { cells: ["pair (of shoes)", "pear, pare", "2022"] },
          { cells: ["aloud (read aloud)", "allowed", "2022"] },
          { cells: ["toe", "tow", "2022"] },
          { cells: ["route (a way)", "root", "2022"] },
          { cells: ["their (belonging to them)", "there, they're", "2022"] },
          { cells: ["oar (to row a boat)", "ore, or", "2023"] },
          { cells: ["bear (the pain)", "bare", "2024"] },
          { cells: ["cast (away prejudice)", "caste", "2024"] },
          { cells: ["laughter", "latter, later", "2024"] },
          { cells: ["address (a speech)", "address (where one lives)", "2025"] },
        ],
      },
      pyqExampleId: "7efad9dd-2c7f-41dd-b20e-ebb035a85d07",
      selfCheckExample: {
        prompt: "Fill the gap: The children could not ___ the cold and went inside. (a) bare (b) bear (c) beer (d) bier",
        steps: ["The gap means 'put up with'.", "That is 'bear'."],
        answer: "(b) bear",
      },
      practiceSet: [
        { prompt: "Fill the gap: The road was closed, so we took another ___. (root / route)", answer: "route" },
        { prompt: "Fill the gap: Please read the poem ___. (aloud / allowed)", answer: "aloud" },
        { prompt: "Fill the gap: Farmers in the valley grow ___. (maize / maze)", answer: "maize" },
      ],
      traps: [
        {
          title: "Cast and caste",
          body: "'Cast away prejudice' means throw away. 'Caste' is a social group. The verb in the sentence needs 'cast'.",
        },
      ],
    },
  ],
};
