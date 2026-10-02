import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCB_PHRASES_NOTE: SubtopicNote = {
  subtopicName: "Meaning of a Phrase or Image",
  title: "What a phrase, image or sentence means here",
  oneLineDefinition:
    "Some questions quote words from the passage and ask what they mean. The answer is the plain meaning those words have in this passage, not a dictionary meaning and not the picture taken literally.",
  whyItMatters:
    "These questions quote the passage, so they look easy. The trap is that every option also borrows the passage's words. " +
    "The marks go to the reader who goes back to the lines around the quote and says the meaning in plain words before reading the options.",
  concepts: [
    // C1 — pointing words: it, this, these, such
    {
      kind: "formula" as const,
      slug: "cdsenrcb-points-back",
      name: "What a phrase points back to",
      intuition:
        "Words like it, this, these and such have no meaning of their own. They point back to something the writer has already said. " +
        "Find that earlier thing and put it in place of the pointing word. The sentence must still make sense.",
      definition:
        "The terms:\n" +
        "- **Pointing word**: it, this, that, these, those, such, they, the former, the latter.\n" +
        "- **Referent**: the earlier words that the pointing word stands for.\n" +
        "The method:\n" +
        "- Go to the quoted words in the passage. Read the start of the same sentence and the sentence before it. The referent is usually close.\n" +
        "- Match the number: these and those point to two or more things; it and this usually point to one.\n" +
        "- Test each candidate: put it in place of the pointing word and read the sentence. Keep the one that makes sense.\n" +
        "- Check the edges. The referent includes everything the writer grouped together, and nothing the writer says is still missing or comes later.\n" +
        "- **the former** = the first of two things named; **the latter** = the second.",
      authoredExample: {
        prompt:
          "'The old fort stands on a hill above the river. Every monsoon the river rises, but it has never reached the gate.' In the second sentence, 'it' refers to (a) the old fort (b) the hill (c) the river (d) the monsoon",
        steps: [
          "List the nouns before 'it': fort, hill, river, monsoon.",
          "Test the fort: 'the fort has never reached the gate' makes no sense, since the gate is part of the fort.",
          "Test the river: 'the river rises, but the river has never reached the gate' makes sense. Rising water reaching a gate is the point.",
          "The monsoon does not reach a gate, and the hill does not move.",
        ],
        answer: "(c) the river",
      },
      selfCheckExample: {
        prompt:
          "'Soldiers on the high border posts face thin air, bitter cold and long months away from home. These hardships, the officer said, are easier to bear when the men trust each other. Good food helps too.' 'These hardships' refers to (a) thin air and bitter cold only (b) thin air, bitter cold and long months away from home (c) a lack of trust and good food (d) the long months away from home only",
        steps: [
          "'These' points back, so look at the sentence before.",
          "That sentence lists three things the soldiers face: thin air, bitter cold, long months away from home.",
          "All three are hardships, and the writer groups them, so the referent is the whole list.",
          "Good food comes after and is something that helps, not a hardship.",
        ],
        answer: "(b) thin air, bitter cold and long months away from home",
      },
      practiceSet: [
        { prompt: "'The plan was to dig a new well. This took the villagers three months.' What does 'This' refer to?", answer: "digging the new well", method: "Put it in place of 'This' and read the sentence." },
        { prompt: "'Meena and her brother both joined the army; the latter became a pilot.' Who became a pilot?", answer: "her brother", method: "the latter = the second of the two named." },
        { prompt: "'Some people say exams test memory, not skill. Such a view ignores the practical papers.' What is 'such a view'?", answer: "the view that exams test memory, not skill", method: "'such' points back to the whole idea just stated." },
        { prompt: "'The committee rejected the first two designs and chose the third. It was cheaper to build.' What does 'It' refer to?", answer: "the third design", method: "One thing, and the one that was chosen." },
      ],
      pyqExampleId: "eb6bc8c2-3564-49c7-a90d-e7cb6a63f73c", // 2017 (II) Q63 — "these liberties"
      traps: [
        {
          title: "Taking the nearest noun without testing it",
          body:
            "The noun just before a pointing word is often not the referent. Put each candidate in place of the pointing word and read the sentence. Only one makes sense.",
        },
        {
          title: "Adding what the writer says is still missing",
          body:
            "When a passage lists what people have and then says what they still lack, a word like **these** covers only the first group. An option that adds the missing thing looks complete but is wrong.",
        },
      ],
    },

    // C2 — images: metaphor, simile, analogy
    {
      kind: "formula" as const,
      slug: "cdsenrcb-image-to-plain",
      name: "Turn the image into plain words",
      intuition:
        "Writers use pictures in words. 'The classroom was a zoo' does not mean there were animals in it. It means the class was noisy and wild. " +
        "The question asks for the plain meaning of the picture. Never take it literally.",
      definition:
        "The terms:\n" +
        "- **Metaphor**: says one thing is another to show a quality: 'his arms were iron' = very strong.\n" +
        "- **Simile**: a comparison with like or as: 'as busy as a bee'.\n" +
        "- **Analogy**: a longer comparison, where one case (often an animal or an object) explains another (often people).\n" +
        "The method:\n" +
        "- Ask what quality the picture carries: iron is strong and hard; a zoo is noisy and wild.\n" +
        "- Say the sentence again in plain words with that quality.\n" +
        "- In an analogy, match the parts: who stands for whom, and what the action stands for. The answer is about the second case, not the first.\n" +
        "- Strike options that read the picture literally (real metal, real animals) and options that change the quality.\n" +
        "- Check the mood of the lines around it. An image in a tired, sad passage carries a tired, sad quality.",
      authoredExample: {
        prompt:
          "'The captain's words were a lamp in that dark night; the men stopped arguing and began to plan.' 'The captain's words were a lamp' means (a) the captain carried a lamp (b) his words showed the men a way forward (c) his words were very loud (d) the night was not really dark",
        steps: [
          "The picture is a lamp. Its quality: it lets you see where to go in the dark.",
          "The rest of the sentence confirms it: after his words, the men stopped arguing and began to plan.",
          "Plain words: his words made the way forward clear.",
          "(a) and (d) take the picture literally; (c) changes the quality from light to sound.",
        ],
        answer: "(b) his words showed the men a way forward",
      },
      selfCheckExample: {
        prompt:
          "'A kite rises against the wind, not with it. In the same way, a young officer grows most when the task is hard.' The writer compares the officer with a kite in respect of (a) flying high in rank (b) growing through difficulty (c) needing a strong leader (d) moving with the crowd",
        steps: [
          "Match the parts: the kite is the officer; the wind is the hard task.",
          "The kite rises against the wind, so the officer grows through difficulty.",
          "(a) takes 'rises' literally; (c) and (d) bring in ideas the lines do not give.",
        ],
        answer: "(b) growing through difficulty",
      },
      practiceSet: [
        { prompt: "'The result was a cold shower for the team.' Plain meaning?", answer: "It suddenly killed their excitement.", method: "A cold shower shocks and cools." },
        { prompt: "'Time is a thief.' Plain meaning?", answer: "Time quietly takes things from us, such as youth and chances.", method: "A thief takes without your notice." },
        { prompt: "'During the flood she was a rock for her family.' Plain meaning?", answer: "She was a strong, steady support.", method: "A rock is firm and does not move." },
        { prompt: "'In that office the clerk was always a listener, never a speaker.' Plain meaning?", answer: "He was never allowed to give his own views.", method: "Turn the pair of roles into what he could and could not do." },
      ],
      pyqExampleId: "0ab46abf-7ba1-426d-8cac-6f4473e54923", // 2017 (I) Q91 — a seagull's wings as an image
      traps: [
        {
          title: "Reading the picture literally",
          body:
            "An option that keeps the real objects of the image (real metal, real rags, real animals) is almost always wrong. The writer chose the picture for one quality. Name that quality.",
        },
        {
          title: "Answering about the first half of an analogy",
          body:
            "In a passage that compares how a dog treats a frightened person with how people treat each other, the question is about people. A saying about dogs, such as 'barking dogs seldom bite', talks about the wrong half.",
        },
      ],
    },

    // C3 — restating a whole sentence from its context
    {
      kind: "formula" as const,
      slug: "cdsenrcb-sentence-meaning",
      name: "Restate the sentence from the lines around it",
      intuition:
        "Some questions quote a whole sentence and ask what it means, or how. The sentence often sums up an idea that the lines around it spell out. " +
        "The next sentence is the most useful: writers often explain a sentence right after they write it.",
      definition:
        "The terms:\n" +
        "- **Restate**: say the same meaning in your own simple words.\n" +
        "- **Defined term**: a name the passage itself explains, such as 'the X hypothesis argues that...'.\n" +
        "The method:\n" +
        "- Find the quoted sentence. Read one sentence before it and two after it.\n" +
        "- Find its key word and see what the passage shows that word to mean here.\n" +
        "- Restate the sentence in plain words before you look at the options.\n" +
        "- Pick the option that says the same thing in different words. The right answer rarely copies the passage.\n" +
        "- Strike the option that states the view the passage argues against, and the one that adds a cause the passage does not give.\n" +
        "- If the passage defines a term, the answer is that definition in plain words.",
      authoredExample: {
        prompt:
          "'Courage is not the absence of fear. The bravest soldiers I knew were often afraid; they acted in spite of it.' 'Courage is not the absence of fear' means (a) brave people feel no fear (b) a brave person can feel fear and still act (c) fear makes people brave (d) soldiers are never afraid",
        steps: [
          "Read the next sentence: the bravest soldiers were often afraid, but acted anyway.",
          "So courage and fear can exist together. Courage is acting while afraid.",
          "Restate: a brave person may feel fear and still do what is needed.",
          "(a) and (d) state the view the sentence denies; (c) adds a cause the lines do not give.",
        ],
        answer: "(b) a brave person can feel fear and still act",
      },
      selfCheckExample: {
        prompt:
          "'Economists speak of a brain drain. By this they mean that trained doctors, engineers and scientists leave their own country to work abroad, so the country loses the skill it paid to build.' 'Brain drain' means (a) people forgetting what they learned (b) skilled people leaving their country to work abroad (c) money for education being wasted at home (d) students failing their exams",
        steps: [
          "The passage defines the term in the next sentence: 'By this they mean...'.",
          "The definition: trained people leave their country for work abroad.",
          "(a) takes 'drain' literally; (c) and (d) are not what the passage says.",
        ],
        answer: "(b) skilled people leaving their country to work abroad",
      },
      practiceSet: [
        { prompt: "'The festival brought the whole town to life.' Restate.", answer: "The festival made the town busy and lively." },
        { prompt: "'His silence said more than words.' Restate.", answer: "His silence clearly showed what he felt." },
        { prompt: "'The rule looked good on paper.' Restate.", answer: "It seemed fine in theory but may fail in practice." },
        { prompt: "'The new law cuts both ways.' Restate.", answer: "It has both good and bad effects." },
      ],
      pyqExampleId: "00373628-9a5d-43f1-be3d-bed9a85ff18b", // 2017 (II) Q67 — restate one sentence of a short passage
      traps: [
        {
          title: "Stopping at the quoted sentence",
          body:
            "The explanation is often in the next line. In one passage, a sentence about farmers who own no land was explained by the very next sentence: they lacked the money to buy it. " +
            "Students who read only the quote chose a guess instead.",
        },
        {
          title: "Picking the view the passage rejects",
          body:
            "When a passage says something is **more than** X, an option saying it is **only** X is the opposite of the passage. It uses the passage's words, which is why it tempts.",
        },
        {
          title: "Choosing the option with the most passage words",
          body:
            "Wrong options often copy phrases from the passage and change the meaning. The right one usually says the same idea in new words.",
        },
      ],
    },
  ],
};
