import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_SYN_METHOD_NOTE: SubtopicNote = {
  subtopicName: "Synonyms: Method",
  title: "How to pick the nearest meaning",
  oneLineDefinition:
    "Four checks that find the option nearest in meaning to an underlined word: read its sentence, match its form, break it into parts, and strike the traps.",
  whyItMatters:
    "Most CDS English papers carry a block of ten synonym questions: a word is underlined in a sentence, and you pick the option nearest in meaning. Almost no word is tested twice, so a word list alone is not enough. These four checks work even on words you have never met.",
  concepts: [
    // C1 — read the word in its sentence
    {
      kind: "formula" as const,
      slug: "cdsensyn-context",
      name: "Read the word in its sentence",
      intuition:
        "Many English words have several meanings. The sentence picks one of them, and the right option matches that one meaning, not the first meaning you learnt. 'Nearest in meaning' also allows a loose fit: the answer need not be exact, only the closest of the four.",
      definition:
        "The method:\n" +
        "- **Read the whole sentence** before you look at the options.\n" +
        "- **Name the sense**: say in your own words what the word means here.\n" +
        "- **Check the charge**: is the word praising, blaming or neutral here? A word's **charge** is the good or bad feeling it carries, and the answer must carry the same charge.\n" +
        "- **Test each option** in place of the underlined word. Keep the one that leaves the meaning of the sentence unchanged.\n" +
        "- If two options seem to fit, choose the one that fits **this** sentence more closely.",
      authoredExample: {
        prompt:
          "Choose the word nearest in meaning to the underlined word: The judge promised both sides a \\(\\underline{\\text{fair}}\\) hearing. (a) pale (b) just (c) average (d) beautiful",
        steps: [
          "Fair has several senses: light in colour, average in quality, good-looking, and just or honest.",
          "The sentence is about a judge and a hearing, so the sense here is justice: both sides will be treated equally.",
          "The charge is positive: the judge is promising something good. Average (only so-so) does not carry that charge.",
          "Put each option in the sentence. 'A just hearing' keeps the meaning; 'a pale hearing' and 'a beautiful hearing' make no sense.",
        ],
        answer: "(b) just",
      },
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The new manager is still quite \\(\\underline{\\text{green}}\\). (a) envious (b) inexperienced (c) healthy (d) eco-friendly",
        steps: [
          "Green can mean a colour, envious ('green with envy'), eco-friendly, or new to a job.",
          "'Still' and 'new manager' point to the last sense: he has not yet learnt the work.",
          "Test it: 'the new manager is still quite inexperienced' keeps the meaning.",
        ],
        answer: "(b) inexperienced",
      },
      practiceSet: [
        {
          prompt: "She \\(\\underline{\\text{ran}}\\) the family business for ten years. (a) sprinted (b) managed (c) fled (d) hurried",
          answer: "(b) managed",
          method: "Here run means be in charge of.",
        },
        {
          prompt: "Drivers must \\(\\underline{\\text{observe}}\\) the speed limit. (a) watch (b) notice (c) obey (d) study",
          answer: "(c) obey",
          method: "To observe a rule is to keep it, not to look at it.",
        },
        {
          prompt: "He gave a \\(\\underline{\\text{sound}}\\) reply to every question. (a) noisy (b) sensible (c) healthy (d) deep",
          answer: "(b) sensible",
          method: "A sound reply is a well-reasoned one.",
        },
        {
          prompt: "The soup was too \\(\\underline{\\text{thin}}\\) for the children. (a) slim (b) watery (c) narrow (d) weak",
          answer: "(b) watery",
          method: "Thin soup has too much water. Slim and narrow describe shape.",
        },
      ],
      pyqExampleId: "bf51b514-6417-40b0-bb4c-9a17eae25270",
      traps: [
        {
          title: "Do not stop at the first meaning you know",
          body: "A **terminal** disease is one that cannot be cured; it has nothing to do with a bus terminal. A **dry** season is one with little rain (arid), not a dull one. Read the sentence before the options.",
        },
        {
          title: "An option can fit the word but not the sentence",
          body: "**Differences** between people who keep quarrelling are **disagreements**. **Discrepancies** are differences between figures or facts that should match. Both are 'differences', but only one fits people.",
        },
        {
          title: "Nearest does not mean exact",
          body: "Sometimes no option is a perfect synonym. **Endurance** is the power to keep going; the nearest option offered was **patience**, the only one pointing the same way. Strike the options that point the wrong way and take the closest one left.",
        },
      ],
    },

    // C2 — match the part of speech and the form
    {
      kind: "formula" as const,
      slug: "cdsensyn-part-of-speech",
      name: "Match the part of speech and the form",
      intuition:
        "A synonym must be able to take the place of the word in the sentence. So it should be the same kind of word: a noun for a noun, a verb for a verb, an adjective for an adjective. Examiners often add an option with the right idea in the wrong form.",
      definition:
        "The method:\n" +
        "- Find the word's **part of speech** from its job in the sentence. A word that describes a noun is an **adjective**; a word that shows an action is a **verb**; a word after 'the', 'a' or 'his' is usually a **noun**; a word that tells how something is done is usually an **adverb**.\n" +
        "- Note the **form**: tense (-ed, -ing), singular or plural, and endings such as -ness, -tion, -ous and -ly.\n" +
        "- Prefer the option with the **same part of speech** and the right meaning.\n" +
        "- If no option has the exact form, **meaning wins**: choose the option with the right idea.",
      authoredExample: {
        prompt:
          "Choose the word nearest in meaning: Her \\(\\underline{\\text{generous}}\\) gift surprised the whole village. (a) generosity (b) kindly (c) liberal (d) give",
        steps: [
          "Generous sits before the noun 'gift' and describes it, so it is an adjective.",
          "Generosity is a noun and give is a verb. Kindly is mostly used as an adverb ('he spoke kindly').",
          "Liberal is an adjective, and a liberal gift is a large, open-handed one.",
          "Test it: 'her liberal gift surprised the whole village' reads correctly.",
        ],
        answer: "(c) liberal",
      },
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: The crowd \\(\\underline{\\text{dispersed}}\\) after the match. (a) scattering (b) scattered (c) dispersal (d) gathered",
        steps: [
          "Dispersed is a verb in the past tense: it tells what the crowd did.",
          "Gathered is the opposite, so strike it.",
          "Dispersal is a noun and scattering is an -ing form. Neither fits 'the crowd ___ after the match'.",
          "Scattered has the same meaning and the same tense.",
        ],
        answer: "(b) scattered",
      },
      practiceSet: [
        {
          prompt: "He answered the questions \\(\\underline{\\text{candidly}}\\). (a) frank (b) frankly (c) frankness (d) shyly",
          answer: "(b) frankly",
          method: "An adverb (-ly) needs an adverb. Shyly changes the meaning.",
        },
        {
          prompt: "The engineer said the plan was \\(\\underline{\\text{feasible}}\\). (a) feasibility (b) workable (c) costly (d) work",
          answer: "(b) workable",
          method: "After 'was', an adjective is needed: workable.",
        },
        {
          prompt: "They \\(\\underline{\\text{postponed}}\\) the match because of rain. (a) deferment (b) deferred (c) cancelled (d) deferring",
          answer: "(b) deferred",
          method: "Same tense, same meaning. Cancelled is a different action.",
        },
      ],
      pyqExampleId: "5d74e5cc-9fd3-4af6-a952-a4946f0ee8c6",
      traps: [
        {
          title: "Right idea, wrong part of speech",
          body: "In 'a **lavish** party', lavish is an adjective. 'Luxury' is a noun, so 'a luxury party' changes the grammar. **Luxurious** or **extravagant** is the match.",
        },
        {
          title: "Treat -ed and -ing as different words",
          body: "**Exhausted** describes the person who is tired; **exhausting** describes the thing that tires. In 'the long walk exhausted us', exhausted is a past-tense verb, and only a past-tense verb such as **tired** fits.",
        },
        {
          title: "When no option has the form, go by meaning",
          body: "In 'leaves much to be **desired**', no option was a past form like 'wanted'. The answer was **wish for**, the only option with the right idea. Do not leave a question because the form is imperfect.",
        },
      ],
    },

    // C3 — roots and affixes
    {
      kind: "formula" as const,
      slug: "cdsensyn-roots",
      name: "Break the word into roots and affixes",
      intuition:
        "Many hard English words are built from Latin and Greek parts. If you know the parts, you can often guess the meaning of a word you have never seen. The sentence then confirms or corrects the guess.",
      definition:
        "Split the word into three parts:\n" +
        "- **Prefix** (at the front): **in-, im-, un-, a-, an-** = not or without; **ex-** = out; **de-** = down or away; **circum-** = around; **per-** = through; **mal-** = bad; **omni-** = all.\n" +
        "- **Root** (the core): **ped** = foot; **capit** = head; **mens** = measure; **onym** = name; **chron** = time; **aud** = hear; **spect** = look; **bene** = good, well.\n" +
        "- **Suffix** (at the end): **-less** = without; **-ous** = full of; **-ude, -ness, -tion** make nouns; **-ly** makes adverbs.\n" +
        "- Join the parts into a rough meaning, then check it in the sentence.",
      authoredExample: {
        prompt:
          "Choose the word nearest in meaning: The old king was known as a \\(\\underline{\\text{benevolent}}\\) ruler. (a) hostile (b) kindly (c) wealthy (d) careless",
        steps: [
          "Split it: bene (good, well) + vol (wish) + -ent (an adjective ending).",
          "Rough meaning: wishing others well.",
          "Hostile and careless point the other way. Wealthy is about money, not wishes.",
          "A kindly ruler wishes his people well, so the sentence keeps its meaning.",
        ],
        answer: "(b) kindly",
      },
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: In the old stories the gods were \\(\\underline{\\text{omnipotent}}\\). (a) all-powerful (b) everywhere (c) all-knowing (d) ancient",
        steps: [
          "Split it: omni (all) + potent (powerful).",
          "Everywhere is omnipresent and all-knowing is omniscient: the same prefix with a different root.",
          "All-powerful matches both parts.",
        ],
        answer: "(a) all-powerful",
      },
      practiceSet: [
        {
          prompt: "The speaker's voice was \\(\\underline{\\text{inaudible}}\\) at the back of the hall. (a) unclear (b) impossible to hear (c) very loud (d) unseen",
          answer: "(b) impossible to hear",
          method: "in (not) + aud (hear) + -ible (able to be).",
        },
        {
          prompt: "He suffers from a \\(\\underline{\\text{chronic}}\\) cough. (a) sudden (b) long-lasting (c) loud (d) mild",
          answer: "(b) long-lasting",
          method: "chron = time: an illness that goes on for a long time.",
        },
        {
          prompt: "In \\(\\underline{\\text{retrospect}}\\), the decision was wise. (a) looking back (b) looking ahead (c) at first sight (d) in theory",
          answer: "(a) looking back",
          method: "retro (back) + spect (look).",
        },
        {
          prompt: "A \\(\\underline{\\text{misanthrope}}\\) avoids company. (a) a lover of people (b) a hater of people (c) a shy child (d) a hermit's hut",
          answer: "(b) a hater of people",
          method: "mis (hate) + anthrop (human being).",
        },
      ],
      pyqExampleId: "9db45d5e-7799-431b-b6ad-46ff7ef731a6",
      traps: [
        {
          title: "in- does not always mean 'not'",
          body: "In **indigenous**, in- means within: indigenous cinema is home-grown cinema. In **inflammable**, in- means into: it catches fire easily. Check the sentence before you read in- as 'not'.",
        },
        {
          title: "Use both parts, not one",
          body: "**Ped** means foot in **impede** (to put a foot in the way, so to hinder) but child in **paediatric**. The **omni-** words differ only by root: omnipotent (all-powerful), omniscient (all-knowing), omnipresent (everywhere).",
        },
        {
          title: "The parts give the direction, not the exact word",
          body: "**Perpetual** starts with per- (through): it suggests going on through time. The sentence then tells you the exact sense, ever lasting. Always test your guess in the sentence.",
        },
      ],
    },

    // C4 — eliminate antonyms and sound-alikes
    {
      kind: "formula" as const,
      slug: "cdsensyn-elimination",
      name: "Eliminate antonyms and sound-alikes",
      intuition:
        "Examiners build the wrong options on purpose. One is often the antonym (the opposite). Another often looks or sounds like the underlined word but means something else. Strike these first; the answer is usually what is left.",
      definition:
        "The method:\n" +
        "- **Strike the antonym**: an option with the opposite meaning is placed to catch a careless reader.\n" +
        "- **Strike the sound-alike**: an option that shares letters with the word (circum-, deri-, grat-) is a trap more often than a help.\n" +
        "- **Strike the off-topic option**: a word from a different field that does not fit the sentence.\n" +
        "- Choose from what remains, and test it in the sentence.",
      authoredExample: {
        prompt:
          "Choose the word nearest in meaning: The \\(\\underline{\\text{prodigal}}\\) son spent his whole share in a year. (a) prodigious (b) wasteful (c) thrifty (d) careful",
        steps: [
          "Thrifty and careful mean the opposite (saving money). Strike both.",
          "Prodigious looks like prodigal but means huge or amazing. Strike it.",
          "Wasteful remains, and 'spent his whole share in a year' confirms it.",
        ],
        answer: "(b) wasteful",
      },
      selfCheckExample: {
        prompt:
          "Choose the word nearest in meaning: Some \\(\\underline{\\text{venal}}\\) officials were caught taking bribes. (a) venial (b) corrupt (c) honest (d) vengeful",
        steps: [
          "Honest is the antonym: strike it.",
          "Venial (a small, forgivable sin) and vengeful (wanting revenge) only sound like venal. Strike both.",
          "Corrupt remains, and 'taking bribes' confirms it.",
        ],
        answer: "(b) corrupt",
      },
      practiceSet: [
        {
          prompt: "Only a \\(\\underline{\\text{credulous}}\\) buyer would believe that offer. (a) credible (b) gullible (c) sceptical (d) creditable",
          answer: "(b) gullible",
          method: "Sceptical is the opposite; credible and creditable only look alike.",
        },
        {
          prompt: "She is an \\(\\underline{\\text{eminent}}\\) scientist. (a) imminent (b) famous (c) unknown (d) emanating",
          answer: "(b) famous",
          method: "Unknown is the opposite; imminent means about to happen.",
        },
        {
          prompt: "That was a \\(\\underline{\\text{judicious}}\\) choice. (a) judicial (b) sensible (c) rash (d) judgmental",
          answer: "(b) sensible",
          method: "Rash is the opposite; judicial means of a court.",
        },
      ],
      pyqExampleId: "e46c4906-1852-4d02-a270-75ed9dff18de",
      traps: [
        {
          title: "Ingenuous is not ingenious",
          body: "**Ingenuous** means innocent or naive. **Ingenious** means clever. A sentence that calls a belief ingenuous calls it simple-minded, so 'clever' is the trap.",
        },
        {
          title: "Derisory is not derogatory",
          body: "A **derisory** offer is laughably small, so it is **inadequate**. **Derogatory** means insulting in words. The two share 'der-' and nothing else.",
        },
        {
          title: "Shared first letters are a warning",
          body: "**Complexity** is intricacy; **complacency** is smugness. **Gratuitous** (uncalled for) is not **gratifying** (pleasing). When an option shares the first few letters of the word, slow down: it is there to catch you.",
        },
        {
          title: "Check the direction of strong words",
          body: "An option like **faulty** next to **exemplary** is there because a fast reader matches strong words without checking their direction. Ask: does this option praise or blame? Exemplary praises, so the answer must praise too.",
        },
      ],
    },
  ],
};
