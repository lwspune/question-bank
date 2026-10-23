import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RBR_SPOKEN_NOTE: SubtopicNote = {
  subtopicName: "Spoken Relation Chains",
  title: "Spoken Relation Chains",
  oneLineDefinition:
    "One person describes another through a chain of possessives, such as 'my mother's brother's son', and you shorten the chain one step at a time, starting from the speaker.",
  whyItMatters:
    "Fifty-one questions in the bank, the largest page of the chapter: twenty-eight from the 2025 shifts and twenty-three from 2023, with twelve MODERATE and the rest EASY. A long chain usually shortens in two or three moves once you know which pairs collapse, including the 'only son' that turns out to be the speaker.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrbrsp-unwind",
      name: "Shortening a possessive chain from the speaker outward",
      intuition:
        "A chain like 'my father's sister's son' is a walk across the family tree. Start where the speaker stands, take one step for each possessive, and after every step give the person you have reached a single name. Long chains are short walks with many words.",
      definition:
        "1. Start at the speaker: 'my' is the speaker, 'your' is the listener, 'his' or 'her' is the person pointed at.\n" +
        "2. Read **left to right**. Each 's is one step: my father, then my father's sister, then her son.\n" +
        "3. After each step, replace the words with one relation: father's sister is a paternal aunt; a paternal aunt's son is a cousin.\n" +
        "4. Pairs that collapse at sight: a parent's husband or wife is your other parent; a sibling's parent is your own parent; your child's other parent is your husband or wife.\n" +
        "5. Read the question's direction last. 'How is the woman related to Param?' and 'How is Param related to the woman?' have opposite answers, such as grandmother and grandson.\n" +
        "6. Use any gender the stem gives ('Param (a man)', 'a woman said'): it decides the final word.",
      authoredExample: {
        prompt:
          "Looking at a photo of a woman, Arun said, 'She is the mother of my father's only sister's son.' (a) How is the woman related to Arun? (b) How is Arun related to her?",
        steps: [
          "My father's only sister is my paternal aunt.",
          "Her son is my cousin, and the mother of that cousin is the aunt herself.",
          "(a) The woman is Arun's father's sister.",
          "(b) From her side, Arun is her brother's son: her nephew.",
        ],
        answer: "(a) Father's sister (paternal aunt) (b) Nephew",
      },
      selfCheckExample: {
        prompt: "Introducing a woman, Kiran said, 'She is the wife of my mother's father's only son.' How is the woman related to Kiran?",
        steps: [
          "My mother's father is my maternal grandfather.",
          "His only son is my mother's brother, my maternal uncle.",
          "The woman is his wife.",
        ],
        answer: "Maternal uncle's wife (an aunt)",
      },
      practiceSet: [
        { prompt: "What single relation is a person's father's brother?", answer: "Paternal uncle" },
        { prompt: "What single relation is a person's mother's mother?", answer: "Maternal grandmother" },
        {
          prompt: "Pointing to a boy, Asha said, 'He is the son of my father's brother.' How is the boy related to Asha?",
          answer: "Cousin",
        },
        {
          prompt: "Pointing to an old man, Ravi said, 'His son is my father's only brother.' How is the old man related to Ravi?",
          answer: "Grandfather (father's father)",
          method: "The old man's son is Ravi's paternal uncle, so the old man is the father of Ravi's father and his brother.",
        },
      ],
      pyqExampleId: "2cd6d371-ee2a-406f-a4f2-701d1d795045",
      traps: [
        {
          title: "Starting the chain from the far end",
          body:
            "Begin at 'my' and walk outward. Starting from the last word ('daughter of ...') and working back makes it easy to drop a step, and a dropped step moves the answer a whole generation.",
        },
        {
          title: "Answering for the wrong person",
          body:
            "When the stem asks how the speaker is related to the person pointed at, finish the chain, then turn it round. If she is the speaker's grandmother, the speaker is her grandson or granddaughter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrsp-self",
      name: "When the chain points back to the speaker",
      intuition:
        "Many chains loop back. 'My mother's only son' is the speaker himself, and 'my father's wife' is just my mother. Spotting the loop early turns a long chain into one step, but the loop depends on the speaker's gender.",
      definition:
        "- 'My mother's only son' or 'my father's only son' is **the speaker, if the speaker is male**. If the speaker is female, it is her brother.\n" +
        "- 'My mother's only daughter' is **the speaker, if the speaker is female**. If the speaker is male, it is his sister.\n" +
        "- 'My father's wife' is my mother; 'my mother's husband' is my father.\n" +
        "- 'My wife's son's father', said by a man, is the man himself.\n" +
        "- 'The only child of my paternal grandfather' is my father; on the mother's side it is my mother.\n" +
        "- 'Your sister's brother' is you or your brother: both have the same parents, which is usually all the question needs.",
      authoredExample: {
        prompt: "Introducing a man, Priyanka said, 'His wife is the only daughter of my mother.' How is the man related to Priyanka?",
        steps: [
          "Priyanka is female, so the only daughter of her mother is Priyanka herself.",
          "The man's wife is therefore Priyanka.",
        ],
        answer: "Husband",
      },
      selfCheckExample: {
        prompt: "Pointing to a man, Sunita said, 'He is the only son of my father's wife.' How is the man related to Sunita?",
        steps: [
          "My father's wife is my mother.",
          "Her only son cannot be Sunita, who is female, so he is Sunita's brother.",
        ],
        answer: "Brother",
      },
      practiceSet: [
        { prompt: "A man speaks of 'my mother's only son'. Who is meant?", answer: "The man himself." },
        { prompt: "A girl speaks of 'my mother's only son'. Who is meant?", answer: "Her brother." },
        {
          prompt: "Raman, a boy, said, 'She is the only daughter of my paternal grandfather's only son.' How is she related to Raman?",
          answer: "Sister",
          method: "The paternal grandfather's only son is Raman's father, and his only daughter is Raman's sister.",
        },
        { prompt: "A man speaks of 'my wife's son's father'. Who is meant?", answer: "The man himself." },
      ],
      pyqExampleId: "1fae53e5-24a4-4001-956b-1fc2bb989f62",
      traps: [
        {
          title: "Collapsing 'only son' to a woman speaker",
          body:
            "For a woman, her mother's only son is her brother, never herself. Whatever the chain says about him next (his wife, his children) is about her brother's family: his wife is her sister-in-law, not herself.",
        },
        {
          title: "Calling the speaker's sibling 'myself' too soon",
          body:
            "'My father's son' is only the speaker when the stem says 'only son' and the speaker is male. Without 'only', it may be a brother; check before you collapse.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscrbrsp-inlaws",
      name: "In-law relations through a husband or wife",
      intuition:
        "An in-law is a relative you gain by marriage. Each in-law word is one ordinary relation plus one marriage step, so the table below is worth knowing by heart: SSC chains such as 'my father's father-in-law's wife's son' are built from it.",
      definition:
        "Two checks settle most in-law rows:\n" +
        "- **Brother-in-law and sister-in-law** each have two meanings: your husband's or wife's sibling, or your sibling's husband or wife.\n" +
        "- A father-in-law and mother-in-law are one level up; a son-in-law and daughter-in-law one level down; brothers- and sisters-in-law on your own level.",
      table: {
        columns: ["Relation", "Who it is", "Level"],
        rows: [
          { cells: ["Father-in-law", "the father of your husband or wife", "one up"] },
          { cells: ["Mother-in-law", "the mother of your husband or wife", "one up"] },
          { cells: ["Son-in-law", "the husband of your daughter", "one down"] },
          { cells: ["Daughter-in-law", "the wife of your son", "one down"] },
          { cells: ["Brother-in-law", "your husband's or wife's brother, or your sister's husband", "same"] },
          { cells: ["Sister-in-law", "your husband's or wife's sister, or your brother's wife", "same"] },
          {
            cells: ["Wife's sister's husband", "a co-brother, keyed by SSC as a brother-in-law", "same"],
            noteAmber: "His son is your nephew, as is the son of any brother-in-law.",
          },
          { cells: ["Husband's or wife's sibling's child", "your nephew or niece", "one down"] },
        ],
        caption: "Every in-law is one blood relation and one marriage step.",
      },
      selfCheckExample: {
        prompt: "Pointing to a woman, Deepak said, 'She is the mother of my wife's only brother.' How is the woman related to Deepak?",
        steps: ["My wife's brother's mother is my wife's mother.", "The mother of one's wife is a mother-in-law."],
        answer: "Mother-in-law",
      },
      practiceSet: [
        { prompt: "What is the wife of a person's son called?", answer: "Daughter-in-law" },
        { prompt: "A woman has no sister. Who is her mother's son-in-law?", answer: "Her husband" },
        { prompt: "What is the daughter of a woman's husband's sister to that woman?", answer: "Niece" },
        { prompt: "What is a man's mother-in-law's only daughter to him?", answer: "Wife" },
      ],
      pyqExampleId: "bba9af63-fc7d-4bfd-a0da-5e9d33319e5e",
      traps: [
        {
          title: "Taking a mother's son-in-law as your husband every time",
          body:
            "Your mother's son-in-law is the husband of one of her daughters. He is your husband only if you are her only daughter; otherwise he may be your sister's husband, your brother-in-law.",
        },
        {
          title: "Calling a cousin's wife a sister-in-law without checking",
          body:
            "Strictly, a cousin's wife is not a sister-in-law; she is your cousin's wife. SSC has keyed 'sister-in-law' for her when nothing closer was printed, so choose it only after cousin, sister and niece are ruled out.",
        },
      ],
    },
  ],
};
