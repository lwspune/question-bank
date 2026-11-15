import type { SubtopicNote } from "@/app/notes/_types";

export const SSC2_ERC_FACTS_NOTE: SubtopicNote = {
  subtopicName: "RC: Finding the Fact",
  title: "RC: Finding the Fact",
  oneLineDefinition:
    "Questions whose answer is written in the passage: a number, a name, a reason or a definition, often reworded in the options.",
  whyItMatters:
    "48 of the 97 Tier II RC questions, 38 EASY and 10 MODERATE. Half the chapter's marks come from finding the right line, so a quick, sure way to find it pays most.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssc2ercfa-locate",
      name: "Locating the answer line",
      intuition:
        "The question almost always carries a key word that also appears in the passage: a name, a year, a number, 'Ramsar sites'. Find that word in the passage, read the sentence around it, and the answer is there.",
      definition:
        "- **Pick the key word** in the question: a proper noun, a number or an unusual word.\n" +
        "- **Scan for it,** then read the whole sentence and the one after.\n" +
        "- **Match questions** (a-2, b-3, c-1): fix the surest pair first; often only one option keeps it.\n" +
        "- **Order questions** ('which came first'): look for time words (first, then, later) in the passage.",
      authoredExample: {
        prompt:
          "Passage: 'The library opened in 1998 with 4,000 books. By 2010 it held 25,000, and a children's wing was added in 2015.' Question: When was the children's wing added?",
        steps: ["Key words: children's wing.", "The sentence says it was added in 2015."],
        answer: "2015",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'Of the three rivers, the Krishna is the longest, the Tungabhadra joins it near Kurnool, and the Bhima flows mostly through Maharashtra.' Question: Which river flows mostly through Maharashtra?",
        steps: ["Key words: mostly through Maharashtra.", "The clause names the Bhima."],
        answer: "The Bhima",
      },
      practiceSet: [
        { prompt: "In a match question, how do you use the one pair you are sure of?", answer: "Keep only the options that contain that pair, then check one more pair among them." },
        { prompt: "A question asks 'In which year did exports peak?' What do you scan the passage for?", answer: "Years and words like 'peak', 'highest' or 'maximum'" },
        { prompt: "Should you answer a fact question from your own knowledge if the passage is about a topic you know?", answer: "No: answer only from what the passage says" },
      ],
      pyqExampleId: "e4bc5a98-7fe4-4313-91b6-bf4db3b852fe",
      traps: [
        {
          title: "Answering from general knowledge",
          body: "On passages about current affairs (ISRO, rice exports, a spy balloon), an option can be true in the world but not stated in the passage. Only the passage counts.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ercfa-paraphrase",
      name: "Option traps: reworded facts and 'except' questions",
      intuition:
        "The right option usually rewords the passage; a wrong one often copies passage words but changes one detail (a number, a name, all for some). In an 'except' question, three options are in the passage and the answer is the one that is not.",
      definition:
        "- **Reworded is normal:** 'freed of stares' in the passage can be 'unnoticed' in the option.\n" +
        "- **Copied words with one change** are the trap: check numbers, names and words like all, only, never.\n" +
        "- **'All the following except':** tick each option you can find in the passage; the one left is the answer.",
      authoredExample: {
        prompt:
          "Passage: 'The festival drew about 3,000 visitors, mostly from nearby towns, and raised funds for the village school.' Which statement is supported? (a) It drew 30,000 visitors. (b) Most visitors came from nearby towns. (c) All visitors were from the village. (d) It raised funds for a hospital.",
        steps: ["(a) changes the number; (c) changes 'mostly' to 'all'; (d) changes school to hospital.", "(b) rewords 'mostly from nearby towns'."],
        answer: "(b)",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'The museum shows coins, old maps and pottery from the region.' The museum shows all the following EXCEPT: (a) coins (b) maps (c) weapons (d) pottery",
        steps: ["Coins, maps and pottery are named.", "Weapons are not."],
        answer: "(c) weapons",
      },
      practiceSet: [
        { prompt: "The passage says 'most farmers'. An option says 'all farmers'. Is the option supported?", answer: "No: 'all' is stronger than 'most'" },
        { prompt: "In an 'except' question, what is the fastest method?", answer: "Find each option in the passage; the one not found is the answer" },
        { prompt: "An option uses different words from the passage but the same meaning. Can it be right?", answer: "Yes: correct options are usually reworded" },
      ],
      pyqExampleId: "cde02e7c-31de-4419-ade9-716dd6d7d661",
      traps: [
        {
          title: "Trusting an option because it repeats passage words",
          body: "The trap option often copies a phrase from the passage and changes one number or name. Check the detail, not the wording.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssc2ercfa-why",
      name: "Why and definition questions",
      intuition:
        "A 'why' question asks for the reason the passage gives, and a definition question asks for what the passage says a term means. Look for because, as, so that, since, or a sentence that explains the term.",
      definition:
        "- **Reason words:** because, as, since, due to, so that, in order to.\n" +
        "- **The passage's reason, not any reason:** several options may be true; pick the one the passage links to the event.\n" +
        "- **Definition questions:** find the term and read the sentence that explains it, often right after it.",
      authoredExample: {
        prompt:
          "Passage: 'The road was closed for a week because heavy rain had washed away part of the bridge.' Why was the road closed?",
        steps: ["Reason word: because.", "What follows it is the reason."],
        answer: "Heavy rain had washed away part of the bridge.",
      },
      selfCheckExample: {
        prompt:
          "Passage: 'Crop rotation, growing different crops on the same land in turn, keeps the soil fertile.' What does crop rotation mean in the passage?",
        steps: ["The term is explained right after it, between commas."],
        answer: "Growing different crops on the same land in turn",
      },
      practiceSet: [
        { prompt: "Which words in a passage usually introduce a reason?", answer: "because, as, since, due to, so that" },
        { prompt: "Two options are both true facts. How do you pick the reason the question wants?", answer: "Choose the one the passage itself links to the event" },
        { prompt: "Where is a term's meaning usually found in a passage?", answer: "In the same sentence, often right after the term" },
      ],
      pyqExampleId: "fe88e769-28ba-4971-9a3e-f7a33545bbbd",
      traps: [
        {
          title: "Giving a true reason the passage does not give",
          body: "A reason can be correct in the world and still not be the one the passage names. Only the passage's own link counts.",
        },
      ],
    },
  ],
};
