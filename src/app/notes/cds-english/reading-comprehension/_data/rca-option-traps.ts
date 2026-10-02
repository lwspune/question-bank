import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCA_OPTION_TRAPS_NOTE: SubtopicNote = {
  subtopicName: "Paraphrase and Option Traps",
  title: "Paraphrase, Repeated Words and Extreme Options",
  oneLineDefinition:
    "The right option says the passage's line in other words. Wrong options reuse the passage's words but change the claim, push it to an extreme, or add what the passage never says.",
  whyItMatters:
    "In CDS passages, most wrong options are built from the passage's own words, so a student who matches words instead of meaning falls for them. " +
    "Four checks catch nearly all of these traps: does the option mean the line, does it make the same claim, is it as strong as the line, and did you read the NOT in the stem.",
  concepts: [
    // C1 — the right option is a paraphrase
    {
      kind: "formula" as const,
      slug: "cdsenrca-paraphrase-match",
      name: "The right option says the line in other words",
      intuition:
        "Examiners rarely copy the passage into the right option. They say the same thing in new words. " +
        "So look for the option that means the line, not the option that looks like it.",
      definition:
        "The terms:\n" +
        "- **Paraphrase**: the same meaning in different words. 'with ease' becomes 'easily'; 'extensive and varied' becomes 'huge and diversified'.\n" +
        "- **Matching on meaning**: the option must say what the line says: the same who, the same what, the same degree.\n" +
        "The method:\n" +
        "- Find the line with the anchor word.\n" +
        "- Say the line to yourself in plain words, in one short sentence.\n" +
        "- Read each option and ask: does it mean my sentence? Do not ask: does it share words with the line?\n" +
        "- Reject an option that adds something the line does not say: a reason, an intention, a place.\n" +
        "- If two options seem to fit, keep the one with the line's exact scope. The other usually adds or drops a part.",
      authoredExample: {
        prompt:
          "Line: 'The old soldier spoke little, but when he did, every man in the room fell silent to listen.' " +
          "The old soldier's words were (a) frequent and loud (b) rare but respected (c) ignored by the men (d) angry and harsh",
        steps: [
          "In plain words: he seldom spoke, and when he did, the men listened closely.",
          "'spoke little' = rare. 'fell silent to listen' = respected.",
          "(a) and (c) say the opposite. (d) adds a mood the line never gives.",
        ],
        answer: "(b) rare but respected",
      },
      selfCheckExample: {
        prompt:
          "Line: 'The new road has cut the journey from the village to the town from four hours to one.' The new road has (a) made the journey much shorter (b) made the village bigger (c) doubled the number of buses (d) made the journey four times longer",
        steps: [
          "In plain words: the trip now takes one hour, not four.",
          "(a) says this in other words. (d) reverses the change.",
          "(b) and (c) add things the line never says.",
        ],
        answer: "(a) made the journey much shorter",
      },
      practiceSet: [
        {
          prompt: "Line: 'He did the work with ease.' Which option paraphrases it: 'He worked slowly' / 'He did it easily' / 'He disliked the work'?",
          answer: "He did it easily.",
        },
        {
          prompt: "Line: 'The fort was built to guard the river crossing.' Option: 'The fort protected the place where people crossed the river.' Paraphrase or not?",
          answer: "Paraphrase: the same meaning in new words.",
        },
        {
          prompt: "Line: 'Most villagers could not read.' Option: 'No villager could read.' Paraphrase or not?",
          answer: "Not a paraphrase.",
          method: "'most' became 'no': the degree changed.",
        },
        {
          prompt: "Line: 'The meeting was put off.' Which fits: cancelled / postponed / held early?",
          answer: "postponed",
          method: "'put off' means moved to a later time, not cancelled.",
        },
      ],
      pyqExampleId: "e60169a4-d276-4183-a021-513b84e98f9c",
      traps: [
        {
          title: "Choosing the option with the most passage words",
          body:
            "'In its simple form, science has helped man to protect himself from Nature and to overcome natural obstacles to movement.' The right option, 'building shelter and making carts, boats', shares almost no words with the line. " +
            "'Build factories using machinery' sounds more like science, but the line speaks of science in its **simple** form. Match the meaning.",
        },
        {
          title: "Moving the meaning to the wrong thing",
          body:
            "A woman and her brother agreed that, 'as long as all went well with him, he should send a **blank sheet**'. So the blank sheet meant he was well. " +
            "'The letter with no postage meant good news' sounds close, but it moves the signal from the blank sheet to the postage.",
        },
        {
          title: "A middle option that sounds balanced",
          body:
            "When a line says people are 'afraid to think contrary to the established pattern of society', the paraphrase is **accepting** the established practices. " +
            "'Neither accepting nor rejecting' sounds careful and fair, but the line is not neutral.",
        },
      ],
    },

    // C2 — same words, changed claim
    {
      kind: "formula" as const,
      slug: "cdsenrca-same-words-changed-claim",
      name: "Same words, changed claim: check what the option asserts",
      intuition:
        "The most dangerous wrong option copies words from the passage: 'import', 'routine', 'public vehicle'. " +
        "But it uses them to say something the passage never said. Read each option as a full claim and check every part of it.",
      definition:
        "The terms:\n" +
        "- **Echo option**: a wrong option that repeats passage words.\n" +
        "- **Claim**: what an option says is true: who did what, to what, and how much.\n" +
        "The method:\n" +
        "- Read the option as a full claim: subject, action, object.\n" +
        "- Check each part against the line. One changed part makes the whole option wrong.\n" +
        "- Watch for the small swaps: import and export, public and private, absorb and reflect, one sheet and no sheet, 'and' and 'and not'.\n" +
        "- Watch for a wider word: 'dogs' becoming 'animals', 'some' becoming 'all'.\n" +
        "- Watch for a picture turned into a fact: a line may say a man 'has a heart of stone'; an option may then claim his heart is ill.\n" +
        "- Watch for an idea the passage denies: 'not X but Y' can never support an option that says X.",
      authoredExample: {
        prompt:
          "Line: 'Indian tea is now exported to over forty countries, though the country still imports some green tea from China.' Which is true? " +
          "(a) India imports tea from forty countries (b) India exports tea to many countries (c) India exports green tea to China (d) India no longer imports any tea",
        steps: [
          "Read each option as a claim and check its parts.",
          "(a) swaps exported for imports. (c) reverses the direction of the green tea.",
          "(d) contradicts 'still imports'.",
          "(b) keeps the subject, the action and the object of the line.",
        ],
        answer: "(b) India exports tea to many countries",
      },
      selfCheckExample: {
        prompt:
          "Line: 'Smoking is banned in all government offices, but not in private homes.' Which is true? (a) Smoking is banned in private homes (b) Smoking is allowed in government offices (c) Smoking is banned in government offices (d) Smoking is banned everywhere",
        steps: [
          "(a) moves the ban to private homes, which the line excludes.",
          "(b) reverses the ban. (d) widens it to everywhere.",
          "(c) keeps the line's claim exactly.",
        ],
        answer: "(c) Smoking is banned in government offices",
      },
      practiceSet: [
        {
          prompt: "Line: 'The thick walls absorb sound.' Option: 'The thick walls reflect sound.' Same claim?",
          answer: "No.",
          method: "Absorb (take in) and reflect (send back) are opposites.",
        },
        {
          prompt: "Line: 'The box held an unsigned letter.' Option: 'The box held no letter.' Same claim?",
          answer: "No.",
          method: "An unsigned letter is still a letter.",
        },
        {
          prompt: "Line: 'The dog is allowed in the garden but not in the house.' Option: 'Animals are not allowed in the house.' Same claim?",
          answer: "No.",
          method: "Too wide: the line is about the dog, not all animals.",
        },
        {
          prompt: "Line: 'He wanted to become a doctor and not a lawyer.' Option: 'He wanted to become a doctor and a lawyer.' Same claim?",
          answer: "No.",
          method: "The option dropped the 'not'.",
        },
      ],
      pyqExampleId: "aec63f8f-651d-4a20-918c-43b006703e3a",
      traps: [
        {
          title: "Import and export",
          body:
            "To compete with Indian cloth, British manufacturers had 'heavy duties ... imposed on the **import** of plain cloth'. The option with 'export of Indian clothes' repeats every other word. " +
            "One swapped word, and the claim is false.",
        },
        {
          title: "One word made wider or turned around",
          body:
            "'In Delhi, it was forbidden by the law, at one time, to take a Dog into a **public** vehicle.' 'Private vehicles' turns the claim around, and 'carry animals' widens a rule about dogs to all animals.",
        },
        {
          title: "Turning an idea the passage denies into the answer",
          body:
            "'What inspires these students to burn cars and books is **not** their political enthusiasm but a frenzied delight in destruction.' " +
            "The option 'are motivated by certain political ideology' reuses the passage's words for the very idea the passage rejects.",
        },
        {
          title: "Right words, wrong object",
          body:
            "To improve reading habits, the passage says we must break out of the routine of reading 'the same newspaper, the same magazine'. " +
            "'Break the routine by changing the time of reading' keeps 'break the routine' but changes what is broken.",
        },
      ],
    },

    // C3 — extreme words and hedges
    {
      kind: "formula" as const,
      slug: "cdsenrca-extreme-words",
      name: "Extreme words: only, completely, already, all",
      intuition:
        "Passages usually speak with care: 'often', 'may', 'most', 'is falling'. Wrong options often push the claim to the end of the scale: 'always', 'only', 'completely', 'already'. " +
        "When the passage is careful and the option is not, the option is wrong.",
      definition:
        "The terms:\n" +
        "- **Extreme word**: only, all, none, always, never, completely, already, entirely.\n" +
        "- **Hedge**: a word that softens a claim: may, might, often, usually, most, some, is likely to, tends to.\n" +
        "- **Process word**: a verb for something still going on (is falling, is shrinking, is spreading). It does not mean the process has finished.\n" +
        "The method:\n" +
        "- Notice any extreme word in an option.\n" +
        "- Find the line and check its strength. Does the passage say 'all' or 'most'? 'has stopped' or 'is falling'? 'rules us now' or 'may one day rule us'?\n" +
        "- If the passage is weaker than the option, strike the option.\n" +
        "- An extreme option is right only when the passage is just as strong.\n" +
        "- 'Only A' is wrong if the passage names B too; 'both A and B' is right only if each half is stated.",
      authoredExample: {
        prompt:
          "Line: 'In recent years, fewer young people in the valley have taken up farming; many now prefer jobs in the towns.' Young people in the valley have " +
          "(a) completely given up farming (b) all moved to the towns (c) become less likely to take up farming (d) never been interested in farming",
        steps: [
          "Mark the extreme words: completely (a), all (b), never (d).",
          "Check the line's strength: 'fewer' and 'many'. These are hedges, not 'none' and 'all'.",
          "(a), (b) and (d) are stronger than the line. (c) keeps its strength.",
        ],
        answer: "(c) become less likely to take up farming",
      },
      selfCheckExample: {
        prompt:
          "Line: 'Some experts warn that, if nothing is done, the glacier may disappear within fifty years.' Which is true? (a) The glacier has already disappeared " +
          "(b) The glacier will certainly disappear (c) The glacier could disappear in future if nothing is done (d) All experts agree that the glacier is safe",
        steps: [
          "The line hedges: 'some experts', 'may', 'if nothing is done'.",
          "(a) says 'already'; (b) says 'certainly'; (d) says 'all experts' and reverses the warning.",
          "(c) keeps the 'may' and the 'if'.",
        ],
        answer: "(c) The glacier could disappear in future if nothing is done",
      },
      practiceSet: [
        {
          prompt: "Line: 'The lake is drying up.' Option: 'The lake has dried up.' Accept?",
          answer: "No.",
          method: "'is drying up' is still going on; it has not finished.",
        },
        {
          prompt: "Line: 'Tigers are found mainly in the forests of central India.' Option: 'Tigers are found only in central India.' Accept?",
          answer: "No.",
          method: "'mainly' is not 'only'.",
        },
        {
          prompt: "Line: 'Pollution harms fish and birds.' Option: 'Pollution harms only fish.' Accept?",
          answer: "No.",
          method: "The line names both.",
        },
        {
          prompt: "Line: 'Every cadet must pass the swimming test.' Option: 'All cadets have to pass the swimming test.' Accept?",
          answer: "Yes.",
          method: "The line is as strong as the option, so the extreme word is right here.",
        },
      ],
      pyqExampleId: "d6280056-1c4c-42b3-8b42-aef338bd7bac",
      traps: [
        {
          title: "A light meal is not no meal",
          body:
            "'The evening meal should be **light**, taken three or four hours before retiring.' The option 'stop eating anything at night' pushes the advice to an extreme the writer never gives.",
        },
        {
          title: "'Already' borrowed from another clause",
          body:
            "'**Already** we find it difficult either to work or play without the machines, and a time **may come** when they will rule us altogether.' " +
            "The option 'they already rule us' takes 'already' from the first clause and drops the 'may come' of the second.",
        },
        {
          title: "'Only' when the passage names both",
          body:
            "A passage on plastic speaks of its effects on marine life and on human health. 'Only humans' and 'only marine life' each drop half of what is said.",
        },
      ],
    },

    // C4 — NOT, EXCEPT, statement sets and 'not stated'
    {
      kind: "formula" as const,
      slug: "cdsenrca-not-except",
      name: "NOT, EXCEPT, statement sets and 'not stated'",
      intuition:
        "A NOT or EXCEPT question turns the task around. Three options are in the passage, and you want the one that is not. " +
        "Read the stem twice, then tick off each option against the line.",
      definition:
        "The terms:\n" +
        "- **NOT / EXCEPT question**: 'Which is not a reason ...', 'All of these EXCEPT ...'. The answer is the option the passage does NOT support.\n" +
        "- **Statement set**: numbered statements, with options that combine them ('1 and 3 only').\n" +
        "- **'Not stated'**: an option such as 'has not been specified'. It is right only when the passage truly gives no answer.\n" +
        "The method:\n" +
        "- Mark NOT or EXCEPT in the stem, so you do not slip back to the usual question halfway.\n" +
        "- Find the line or the list the stem points to.\n" +
        "- Tick each option the passage states. The option left without a tick is the answer.\n" +
        "- For a statement set, judge each statement alone (true, false or not stated), then pick the option with exactly the true ones. Watch for a statement that reverses the cause.\n" +
        "- 'All of the above' is right only if every option is stated. One unstated option rules it out.\n" +
        "- Choose 'not stated' only after you have searched; do not use it to escape a hard question.",
      authoredExample: {
        prompt:
          "Line: 'Cadets at the academy are trained in drill, map reading and swimming, and they also learn a foreign language.' " +
          "Which is NOT part of the cadets' training, according to the passage? (a) Map reading (b) Swimming (c) Horse riding (d) A foreign language",
        steps: [
          "Mark NOT in the stem.",
          "Tick what the line states: map reading, swimming, a foreign language.",
          "Horse riding gets no tick. It is the answer.",
        ],
        answer: "(c) Horse riding",
      },
      selfCheckExample: {
        prompt:
          "Line: 'Neem trees grow well in dry areas, and their leaves are used to keep insects away from stored grain.' Which statements are true? " +
          "1. Neem grows well in dry areas. 2. Neem needs a lot of water. 3. Neem leaves help to protect stored grain. (a) 1 only (b) 1 and 3 (c) 2 and 3 (d) 1, 2 and 3",
        steps: [
          "Statement 1 is stated: true.",
          "Statement 2 reverses the line, which says neem grows well in dry areas: false.",
          "Statement 3 says the same as 'keep insects away from stored grain': true.",
          "Pick the option with exactly 1 and 3.",
        ],
        answer: "(b) 1 and 3",
      },
      practiceSet: [
        {
          prompt: "A passage lists three causes of a flood: heavy rain, a broken dam and blocked drains. Which is NOT a cause: heavy rain / blocked drains / an earthquake / a broken dam?",
          answer: "an earthquake",
        },
        {
          prompt: "A passage says the festival is known for its music. Options: (a) music (b) food (c) fireworks (d) All of the above. What does the passage say the festival is known for?",
          answer: "(a) music",
          method: "Food and fireworks are not stated, so 'All of the above' fails.",
        },
        {
          prompt: "A passage gives the time of a meeting but not its place. Where was the meeting held, if one option is 'Not stated'?",
          answer: "Not stated.",
        },
        {
          prompt: "Passage: 'The river rises because of the rain.' Statement: 'The rising river causes the rain.' True?",
          answer: "False.",
          method: "The statement reverses the cause.",
        },
      ],
      pyqExampleId: "f3f293d9-f75b-40fc-84e5-a1b744a0585b",
      traps: [
        {
          title: "Forgetting the NOT halfway",
          body:
            "Asked which is **not** a natural ecosystem, a student reads 'forests, ponds and lakes' as natural, finds 'forest' in the options and marks it. " +
            "The passage calls crop-fields human-made, so **crop-field** is the answer. Mark the NOT before you start.",
        },
        {
          title: "'All of the above' with one unstated item",
          body:
            "Plastic 'has been found on even the most remote, uninhabited islands, and in the deepest parts of the ocean'. Mountain tops and metals are never mentioned, so 'All of the above' fails. " +
            "Only the oceanic depths are stated.",
        },
        {
          title: "A statement that reverses the cause",
          body:
            "The passage says senior citizens in India, where curcumin is a staple, have a **lower** prevalence of Alzheimer's disease. " +
            "A statement saying they have a high level of the disease because of turmeric uses the same words with the link reversed. Strike it.",
        },
      ],
    },
  ],
};
