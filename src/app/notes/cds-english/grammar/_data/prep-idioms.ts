import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_IDIOMS_NOTE: SubtopicNote = {
  subtopicName: "Prepositional Idioms and Fixed Phrases",
  title: "Prepositional idioms and fixed phrases",
  oneLineDefinition:
    "An idiom is a fixed group of words whose meaning is more than its parts: read between the lines, by dint of, out of the question. Not one word in it can be changed.",
  whyItMatters:
    "Idiom blanks look easy because the sentence makes sense with several options. Only one option gives the fixed phrase. " +
    "The safest way is to know the phrase whole, so this page lists the idioms past CDS papers have used in these blanks, with their meanings.",
  concepts: [
    // C1 — idioms built on a preposition
    {
      kind: "reference" as const,
      slug: "cdsenprep-prep-idioms",
      name: "Idioms built on a preposition",
      intuition:
        "In these idioms the preposition carries the picture: you read **between** the lines (the hidden meaning lies in the gaps), you keep someone **at** arm's length (a fixed distance away). Picture the scene and the preposition follows.",
      definition:
        "The method:\n" +
        "- Spot the fixed phrase around the blank (the lines, arm's length, the long run, dint of).\n" +
        "- Recall the phrase whole and say it aloud with each option.\n" +
        "- Do not reason from the meaning of the single preposition: 'on the long run' sounds possible, but the idiom is in the long run.",
      table: {
        columns: ["Idiom", "Meaning", "Sitting"],
        rows: [
          { cells: ["read **between** the lines", "find the hidden meaning", "2021 (I)"] },
          { cells: ["live **by** one's pen", "earn a living by writing", "2021 (II)"] },
          { cells: ["much water has run **under** the bridge", "much time has passed and much has changed", "2021 (II)"] },
          { cells: ["fight **to** the last man", "fight until everyone is killed", "2021 (II)"] },
          { cells: ["keep someone **at** arm's length", "avoid becoming close or friendly", "2021 (II)"] },
          { cells: ["**in** the long run", "in the end, over a long time", "2021 (II)"] },
          { cells: ["**by** dint of", "by means of, because of (effort)", "2021 (II), 2022 (I)"] },
          { cells: ["rules to live **by**", "rules that guide your life", "2022 (I)"] },
          { cells: ["**in** such a way that", "so that (introduces a result)", "2021 (I)"] },
          {
            cells: ["go **with** the wind", "drift along with whatever happens, without thinking", "2021 (I)"],
            noteAmber: "The more common forms are 'go with the flow' and 'go with the tide'. All take with.",
          },
        ],
        caption: "Idioms do not follow the usual preposition rules. Learn them whole.",
      },
      pyqExampleId: "e32a066b-7e7c-4654-8b8e-49f48af315c0",
      selfCheckExample: {
        prompt: "The thief was caught ______ the act of breaking the lock. (a) at (b) on (c) in (d) by",
        steps: [
          "The fixed phrase is 'caught in the act' = caught while doing something wrong.",
          "At, on and by do not make this idiom.",
        ],
        answer: "(c) in.",
      },
      practiceSet: [
        { prompt: "______ the whole, the trip was a success.", answer: "On", method: "on the whole = in general" },
        { prompt: "I did not break it ______ purpose.", answer: "on", method: "on purpose = deliberately" },
        { prompt: "She learnt the poem ______ heart.", answer: "by", method: "by heart = from memory" },
        { prompt: "______ a nutshell, the plan failed.", answer: "In", method: "in a nutshell = in short" },
      ],
      traps: [
        {
          title: "In the long run, never on the long run",
          body:
            "**in the long run** = in the end. Options like 'on the long run' are built to sound almost right. Only the fixed form is correct.",
        },
        {
          title: "By dint of, not with dint",
          body:
            "**by dint of** = by means of. Dint is used in no other phrase, so it always takes by. The same sentence has come back in a later paper with different options.",
        },
        {
          title: "Same phrase, different blank",
          body:
            "'rules to live **by**' can be tested at by (the rules to live ___) or at to (good rules ___ live by). Read which words are already printed before you choose.",
        },
      ],
    },

    // C2 — idiomatic phrases that complete a sentence
    {
      kind: "reference" as const,
      slug: "cdsenprep-phrase-idioms",
      name: "Idiomatic phrases that complete a sentence",
      intuition:
        "Here the blank takes a whole phrase, not one word. The four options look alike (taken for granted, taken as granted), so you need the exact form. The meaning of the sentence tells you which idiom; your memory tells you its exact words.",
      definition:
        "The method:\n" +
        "- Say the meaning of the sentence in plain words (he was very tired; it is impossible; he was not valued).\n" +
        "- Find the idiom with that meaning.\n" +
        "- Check the exact form letter by letter: spilt, not split; out of the question, not in question.\n" +
        "- Proverbs are quoted exactly: Where there is a will, there is a way.",
      table: {
        columns: ["Idiom", "Meaning", "Sitting"],
        rows: [
          { cells: ["**done in**", "completely exhausted", "2018 (I)"] },
          { cells: ["no use crying over **spilt milk**", "no point regretting what cannot be undone", "2018 (I)"] },
          { cells: ["**a wet blanket**", "a person who spoils others' fun", "2018 (I)"] },
          { cells: ["Where there is a **will**, there is a way.", "determination finds a way", "2020 (I)"] },
          { cells: ["**out of the question**", "impossible, not to be considered", "2022 (II)"] },
          { cells: ["in **full swing**", "at the height of activity", "2022 (II)"] },
          { cells: ["thrown **out of gear**", "disrupted, disorganised", "2022 (II)"] },
          { cells: ["**taken for granted**", "not valued; assumed without thanks", "2022 (II)"] },
          { cells: ["taken long **strides**", "made great progress", "2023 (II)"] },
          { cells: ["paid his debts **down** to the last penny", "paid every single penny", "2023 (I)"] },
        ],
        caption: "Change one word and the idiom is broken.",
      },
      pyqExampleId: "614d0a0c-6926-4fb3-9ce5-5d50f9af3796",
      selfCheckExample: {
        prompt: "Stop beating about the ______ and tell me what happened. (a) tree (b) bush (c) field (d) hedge",
        steps: [
          "Plain meaning: stop avoiding the main point.",
          "The idiom is 'beat about the bush'.",
          "Tree, field and hedge do not make the idiom.",
        ],
        answer: "(b) bush.",
      },
      practiceSet: [
        { prompt: "Losing that job was a blessing in ______.", answer: "disguise", method: "something bad that turns out good" },
        { prompt: "We meet only once in a blue ______.", answer: "moon", method: "very rarely" },
        { prompt: "It is late; let us call it a ______.", answer: "day", method: "stop working for now" },
        { prompt: "Before the exam he burnt the midnight ______.", answer: "oil", method: "studied late into the night" },
      ],
      traps: [
        {
          title: "Spilt milk, not split or spoiled",
          body:
            "The proverb is 'no use crying over **spilt** milk'. Split (broken in two) and spoiled (gone bad) look and sound close, and they are placed in the options for that reason.",
        },
        {
          title: "Out of the question, not in question",
          body:
            "**out of the question** = impossible. **in question** = being talked about (the man in question). They mean different things.",
        },
        {
          title: "Look for the contrast word",
          body:
            "'The whole group was enthusiastic but your friend alone was ___.' The word **but** signals the opposite of enthusiastic: a wet blanket, the person who spoils the fun.",
        },
      ],
    },
  ],
};
