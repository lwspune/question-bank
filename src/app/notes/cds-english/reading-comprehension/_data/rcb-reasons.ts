import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCB_REASONS_NOTE: SubtopicNote = {
  subtopicName: "Why Questions: The Passage's Reason",
  title: "Why-questions: the reason the passage gives",
  oneLineDefinition:
    "A why-question, or a stem ending in 'because', asks for the reason the passage gives. Find the line that carries the reason, then pick the option that says it in other words.",
  whyItMatters:
    "Why-questions are among the most common in CDS reading. The reason is in the passage, but the right option almost never uses the passage's own words. " +
    "The wrong options are often other true facts from the same passage, a common-sense reason the writer never gives, or an excuse a character makes.",
  concepts: [
    // C1 — the stated reason
    {
      kind: "formula" as const,
      slug: "cdsenrcb-stated-reason",
      name: "Find the because-line, then match its paraphrase",
      intuition:
        "Usually the passage states the reason, often next to a signal word: because, since, as, due to, for fear of. Find it. " +
        "Then the work is matching. The right option says the same reason in different words.",
      definition:
        "The terms:\n" +
        "- **Reason signals**: because, since, as, so, therefore, due to, owing to, for fear of, as a result of, chiefly because, which is why.\n" +
        "- **Paraphrase**: the same meaning in different words.\n" +
        "The method:\n" +
        "- Find the line about the event in the stem.\n" +
        "- Look on both sides of it for a reason signal. The reason can come before the event ('Fearing rain, they left early') or after it ('They left early because they feared rain').\n" +
        "- Say the reason in your own words, in a few words.\n" +
        "- Pick the option that says the same thing. Expect new words: afraid of being laughed at becomes fear of ridicule.\n" +
        "- Strike options that give a reason the passage does not, even a sensible one.",
      authoredExample: {
        prompt:
          "'The villagers moved their cattle to the hills early this year. The river had flooded twice in June, and the low fields were under water.' The villagers moved their cattle early because (a) the hills had better grass (b) their usual grazing land was under water (c) the cattle were sick (d) it was very hot",
        steps: [
          "Event in the stem: the cattle moved early.",
          "The next sentence gives the cause: floods, and the low fields under water.",
          "In your words: their fields were flooded.",
          "(b) says the same with new words: 'usual grazing land' for 'low fields'. (a), (c) and (d) are reasons the passage never gives.",
        ],
        answer: "(b) their usual grazing land was under water",
      },
      selfCheckExample: {
        prompt:
          "'Many young officers say little at the mess table, for fear of being laughed at by their seniors.' The young officers stay quiet because they (a) have nothing to say (b) are afraid of ridicule (c) have been ordered to keep silent (d) dislike their seniors",
        steps: [
          "Signal: 'for fear of'. The reason follows it: being laughed at.",
          "Being laughed at = ridicule.",
          "The other options give reasons the line does not.",
        ],
        answer: "(b) are afraid of ridicule",
      },
      practiceSet: [
        { prompt: "'Owing to the strike, no buses ran on Monday.' Why were there no buses?", answer: "the strike", method: "'Owing to' carries the reason." },
        { prompt: "'Since the well had dried up, the women walked to the river.' Why did they walk to the river?", answer: "The well had no water.", method: "'Since' carries the reason, here before the event." },
        { prompt: "Line: 'the cost of seed and fertiliser has doubled.' Which option paraphrases it: 'farming inputs have become dearer' or 'farmers have become lazy'?", answer: "farming inputs have become dearer", method: "seed and fertiliser = farming inputs; cost doubled = dearer." },
        { prompt: "'The match was stopped, as the light was too poor to see the ball.' Why was it stopped?", answer: "poor light", method: "'as' here means because." },
      ],
      pyqExampleId: "710ad5e2-1867-4fff-99b2-619d1fede520", // 2021 (II) Q20 — the reason consumers held back
      traps: [
        {
          title: "The common-sense reason",
          body:
            "When a passage says an army avoided calling its takeover a coup because a coup would bring world criticism and sanctions, the options 'a coup is illegal' or 'a coup is immoral' sound right but are not the passage's reason. Answer with the line, not with what you believe.",
        },
        {
          title: "Cause and result swapped",
          body:
            "An option can name the right two things in the wrong order: the result given as the reason. Check which one the signal word marks as the cause.",
        },
      ],
    },

    // C2 — the implied reason, one step from the line
    {
      kind: "formula" as const,
      slug: "cdsenrcb-implied-reason",
      name: "The reason one step from the line",
      intuition:
        "Sometimes the passage gives the facts but not the word because. It gives a condition and a result, and you name the link. " +
        "This is an inference, so the same rule applies: one short step, no more.",
      definition:
        "The method:\n" +
        "- Find the event in the stem.\n" +
        "- Look nearby for a condition (if, unless, only if, when), a rule the passage states, or what happens just before the event.\n" +
        "- Turn the condition into a reason: 'Unless seeds are kept dry, they rot' plus 'the store-room leaked' gives: they rotted because they were not kept dry.\n" +
        "- Check the step is short: you can point at the line and say 'that is why'.\n" +
        "- Strike reasons that need a second step or a fact you add yourself.",
      authoredExample: {
        prompt:
          "'Unless a seed is kept dry over winter, it rots before spring. The farmer's store-room leaked all winter.' Why did the farmer's seeds fail in spring? (a) they were not kept dry (b) the spring was too cold (c) birds ate them (d) the soil was poor",
        steps: [
          "The rule: seeds that are not kept dry rot.",
          "The fact: the store-room leaked, so the seeds got wet.",
          "One step: they rotted because they were not kept dry.",
          "(b), (c) and (d) bring in causes the lines never mention.",
        ],
        answer: "(a) they were not kept dry",
      },
      selfCheckExample: {
        prompt:
          "'A section that talks on a night march gives away its position. Section B chatted all the way to the ridge, and the other side found them within an hour.' Why was Section B found so quickly? (a) its map was wrong (b) its talking showed where it was (c) it marched too slowly (d) the night was bright",
        steps: [
          "The rule: talking on a night march gives away your position.",
          "The fact: Section B chatted all the way.",
          "One step: their talking gave away where they were.",
        ],
        answer: "(b) its talking showed where it was",
      },
      practiceSet: [
        { prompt: "'Plants need sunlight to make food. The plant was kept in a dark cupboard for a month and died.' Why did it die?", answer: "It got no sunlight, so it could not make food." },
        { prompt: "'Only those with a pass may enter the base. Ravi had left his pass at home.' Why was Ravi stopped at the gate?", answer: "He had no pass." },
        { prompt: "'Iron rusts when water and air reach it. The gate is painted every year.' Why does the gate not rust?", answer: "The paint keeps water and air off the iron." },
        { prompt: "'An unsealed letter can be read by anyone who handles it.' Why seal a letter?", answer: "To keep its contents private." },
      ],
      pyqExampleId: "23038e11-4e18-451a-a6d4-35349903e522", // 2021 (II) Q11 — why birds die in winter
      traps: [
        {
          title: "Taking two steps",
          body:
            "If you need to add a fact of your own between the line and the reason, you have gone too far. The right option sits one step from a line you can point at.",
        },
        {
          title: "Flipping the condition",
          body:
            "'If they are not trained, they fail' gives the reason 'they were not trained'. Read the not carefully: the reason is the missing thing, not its opposite.",
        },
      ],
    },

    // C3 — the real reason, not a side-fact or half the reason
    {
      kind: "formula" as const,
      slug: "cdsenrcb-real-reason",
      name: "The real reason, not a true side-fact",
      intuition:
        "Some passages give an excuse and a real reason, or a reason with two halves. One option repeats what a person said. Another gives only half. " +
        "The question wants the real, whole reason, and the passage often shows it only at the end.",
      definition:
        "The method:\n" +
        "- Separate what a person says from what the writer shows. A character's stated reason can be a cover.\n" +
        "- Read to the end of the passage. The real reason is often revealed late.\n" +
        "- If the reason has two halves (A, and at the same time B), the option must carry both.\n" +
        "- A true fact from the passage is not the answer unless it explains the event in the stem.\n" +
        "- Check the option against the writer's own view, not a view the writer sets aside.",
      authoredExample: {
        prompt:
          "'The cadet told the instructor he had missed the morning run because his shoes were torn. Later his friend admitted that they had both stayed up watching a match and could not wake in time.' The cadet missed the run because (a) his shoes were torn (b) he overslept after staying up late (c) the instructor excused him (d) his friend was ill",
        steps: [
          "What the cadet said: torn shoes. That is his excuse.",
          "What the passage shows later: he stayed up late and could not wake.",
          "The question asks why he missed it, so the real reason wins.",
        ],
        answer: "(b) he overslept after staying up late",
      },
      selfCheckExample: {
        prompt:
          "'The writer calls the town strange. Its people build a new school every year, yet they let the old library fall to pieces.' The writer calls the town strange because it (a) builds new schools (b) has an old library (c) builds new things while neglecting old ones (d) has people who dislike books",
        steps: [
          "The reason has two halves joined by 'yet': building new schools, and neglecting the library.",
          "(a) and (b) give one half each.",
          "(c) carries both halves. (d) adds a claim the lines do not make.",
        ],
        answer: "(c) builds new things while neglecting old ones",
      },
      practiceSet: [
        { prompt: "'He said he was too busy to attend the wedding; in truth, he had quarrelled with the groom.' Real reason he stayed away?", answer: "the quarrel with the groom", method: "'in truth' marks the real reason." },
        { prompt: "'The writer finds the river sad: it gives the valley life, yet it floods the same valley every year.' Is 'it floods the valley' the whole reason?", answer: "No, only half. The whole reason is that it both gives life and destroys.", method: "Two halves joined by yet." },
        { prompt: "'The shop closed early. It was a Friday. The owner had a fever and went home.' Why did it close early?", answer: "the owner's fever", method: "Friday is a side-fact." },
      ],
      pyqExampleId: "4abea778-48fc-4efe-b5c2-e8c3973814e7", // 2018 (II) Q27 — why a woman returned a letter
      traps: [
        {
          title: "Taking a character's words at face value",
          body:
            "When a person in a story gives a reason, the writer may show a different one later. The answer follows the writer, not the character.",
        },
        {
          title: "Half the reason",
          body:
            "If the writer calls an age curious because it builds and destroys at the same time, an option that names only the building, or only the destruction, is half the reason. Look for the option that holds both.",
        },
        {
          title: "The view the writer sets aside",
          body:
            "Writers often mention an easy explanation in order to reject it ('this may not be merely...'). An option that repeats that rejected explanation is a trap. Follow the writer's own conclusion.",
        },
      ],
    },
  ],
};
