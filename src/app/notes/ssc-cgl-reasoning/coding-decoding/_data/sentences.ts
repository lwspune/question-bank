import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RCD_SENTENCES_NOTE: SubtopicNote = {
  subtopicName: "Word-Code Sentences",
  title: "Word-Code Sentences",
  oneLineDefinition:
    "Whole sentences are coded word by word, with the codes in a mixed order; a word that two sentences share takes the code that their two codes share.",
  whyItMatters:
    "Twenty-six questions in the bank, twenty of them EASY. Eleven give two sentences and fifteen give three. The method is the common-letter method of the page before, one level up: shared words take shared codes, and what is left over pairs with what is left over.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrcdse-pairs",
      name: "Two sentences: the shared word takes the shared code",
      intuition:
        "Each word has one code in every sentence, but the codes are written in a mixed order. So place tells you nothing; only sharing does. A word in both sentences must take the code that is in both codes.",
      definition:
        "1. The codes are **not** in the order of the words. Never pair the first word with the first code.\n" +
        "2. A word found in both sentences takes the code found in both codes.\n" +
        "3. If **two** words are shared and **two** codes are shared, each shared word is one of the two codes, and nothing more can be said. Choose the 'either ... or' option.\n" +
        "4. A word in only one sentence is fixed only if it is the last word left once the shared words are placed.\n" +
        "5. **Fast route:** underline the shared word, ring the shared code, and read the answer straight off.",
      authoredExample: {
        prompt: "In a certain code language, 'cold winter night' is coded as 'pa lo ve' and 'long winter night' is coded as 've ru pa'. What is the code for 'night'?",
        steps: [
          "The two sentences share two words, winter and night, and the two codes share two codes, pa and ve.",
          "Nothing else separates winter from night, so night is pa or ve.",
          "(The leftover words are fixed: cold = lo and long = ru.)",
        ],
        answer: "Either 'pa' or 've'",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'eat fresh fruit' is coded as 'mu de zo' and 'fruit is sweet' is coded as 'ki zo ba'. What is the code for 'fruit'?",
        steps: ["Fruit is the only word in both sentences, and zo is the only code in both codes."],
        answer: "zo",
      },
      practiceSet: [
        { prompt: "In a certain code language, 'go home now' is coded as 'ta pi ru' and 'come home soon' is coded as 'xe pi lo'. What is the code for 'home'?", answer: "pi" },
        { prompt: "In a certain code language, 'red rose' is coded as 'mi ka' and 'red lily' is coded as 'ka su'. What is the code for 'rose'?", answer: "mi", method: "red = ka, the shared code, so rose takes the other code of its sentence." },
        { prompt: "In a certain code language, 'we play' is coded as 'do ne' and 'we play well' is coded as 'ne fa do'. What is the code for 'well'?", answer: "fa" },
        { prompt: "Two coded sentences share two words, and their codes share two codes. Can the code of either shared word be fixed from these two sentences alone?", answer: "No. Each shared word is one of the two shared codes, so the answer is 'either ... or'." },
      ],
      pyqExampleId: "f40275df-a5b9-4594-85ae-f8a7389481d1",
      traps: [
        {
          title: "Reading the codes in word order",
          body:
            "The first code of a coded sentence is not the first word's code. SSC mixes the order on purpose, and the option that pairs words and codes by place is printed.",
        },
        {
          title: "Picking one code when two words are shared",
          body:
            "When two words and two codes are shared, each word could be either code. A single code is a guess; the 'either ... or' option is the only safe answer.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrcdse-chains",
      name: "Three or more sentences: fix one word, then the next",
      intuition:
        "With three sentences, compare them two at a time. Each pair usually shares one word, which that pair fixes, and every word you fix clears a code out of the way for the next pair.",
      definition:
        "1. A word in **all** the sentences takes the code in all the codes. Fix it first.\n" +
        "2. Compare sentences 1 and 2, then 1 and 3, then 2 and 3. Each pair's shared word takes its shared code, once codes already fixed are set aside.\n" +
        "3. A word left alone in a sentence after the others are fixed takes the code left over.\n" +
        "4. When the question asks for several words, decode only those; the options usually differ in one code.\n" +
        "5. If two words still share two codes, choose the option that is right whichever way they go.\n" +
        "6. **Fast route:** strike out any option holding a code you have already given to another word.",
      authoredExample: {
        prompt: "In a certain code language, 'big red car' is coded as 'lu ta mo', 'red fast bike' is coded as 'ta ze ko' and 'fast big ship' is coded as 'ze lu ni'. What is the code for 'car'?",
        steps: [
          "Sentences 1 and 2 share red, and their codes share ta: red = ta.",
          "Sentences 1 and 3 share big, and their codes share lu: big = lu.",
          "In 'big red car' = 'lu ta mo', big and red are placed, so car = mo.",
        ],
        answer: "mo",
      },
      selfCheckExample: {
        prompt: "In a certain code language, 'we love music' is coded as 'pi no ra', 'music is life' is coded as 'ra vu se' and 'life we share' is coded as 'se pi ko'. How is 'love life' coded?",
        steps: [
          "Sentences 1 and 2 share music: ra. Sentences 1 and 3 share we: pi. Sentences 2 and 3 share life: se.",
          "In sentence 1, love takes the leftover code, no.",
        ],
        answer: "no se",
      },
      practiceSet: [
        { prompt: "In a certain code language, 'sun is hot' is coded as 'ka ri po', 'moon is cold' is coded as 'ri de lu' and 'hot and cold' is coded as 'po lu ze'. What is the code for 'sun'?", answer: "ka", method: "is = ri and hot = po, so sun takes ka." },
        { prompt: "In a certain code language, 'I like tea' is coded as 'ab cd ef', 'tea is hot' is coded as 'ef gh ij' and 'I am hot' is coded as 'ab ij kl'. What is the code for 'like'?", answer: "cd" },
        { prompt: "In a certain code language, 'go to school' is coded as 'ma pe ri', 'go to bed' is coded as 'pe ri so' and 'school bus' is coded as 'ma tu'. What is the code for 'bed'?", answer: "so", method: "go and to take pe and ri between them, so bed is the code left over." },
        { prompt: "In a certain code language, 'one two three' is coded as 'xa yo zu' and 'two three four' is coded as 'yo zu wi'. What is the code for 'four'?", answer: "wi" },
      ],
      pyqExampleId: "f271adee-6d4f-4698-a2dc-a90b61c4eb41",
      traps: [
        {
          title: "Placing a shared code before setting aside the fixed ones",
          body:
            "Two sentences may share two words, one of them already fixed. The other shared word then takes the remaining shared code, not either of the two.",
        },
        {
          title: "Rejecting an option for the order of its codes",
          body:
            "Options list codes in any order. An option is right when it holds exactly the right set of codes, so compare sets, not positions.",
        },
      ],
    },
  ],
};
