import type { SubtopicNote } from "@/app/notes/_types";

const CLOZE = "/notes/cds-english/cloze-test";

export const CDSEN_FB_SENTENCE_BLANKS_NOTE: SubtopicNote = {
  subtopicName: "Sentence Fill-in-Blanks",
  title: "Sentence Blanks: Slot, Clue, Collocation and Phrasal Verb",
  oneLineDefinition:
    "A single sentence with one gap. Find what the gap needs from the words around it, then pick the one option that fits both the grammar and the meaning.",
  whyItMatters:
    "Single-sentence blanks come up in several CDS English papers, sometimes as a whole set of their own. " +
    "Each one hides one of four tasks: a grammar form, a meaning given away by the rest of the sentence, a fixed partner word, or a phrasal verb. " +
    "Phrasal verbs are the largest group, so their table below is worth learning by heart.",
  concepts: [
    // C1 — the grammar slot (method taught in the Cloze chapter; this page lists the patterns tested)
    {
      kind: "formula" as const,
      slug: "cdsenfb-grammar-slot",
      name: "Name the grammar slot first",
      intuition:
        "In many of these sentences one nearby word locks the form of the blank: 'in case', 'If ... would have', 'one of the', 'asked'. " +
        "Spot that word and three options fall away before you think about meaning.",
      definition:
        "The method (taught in full in the Cloze chapter, linked at the end of this page):\n" +
        "- Name the slot from the words on both sides before you read the options.\n" +
        "- Find the locking word near the blank, then strike every option of the wrong form.\n" +
        "The patterns these items test, one line each:\n" +
        "- **know how to** + base verb, for a skill: She knows how to drive.\n" +
        "- **in case** + present simple, even about the future: Take a coat in case it rains. No will, shall or may after in case.\n" +
        "- **one of the** + superlative + plural noun: one of the best players.\n" +
        "- **asked whether** (or if) + a yes-or-no question. told needs a person after it (told me), and said cannot open a question.\n" +
        "- **All that** (meaning everything that) takes a singular verb: All that he says is true.\n" +
        "- **If + had + past participle**, then **would have + past participle**: the third conditional, for a past that did not happen.\n" +
        "- **bid farewell**: its formal past form is **bade**, which a past time phrase such as 'last year' calls for.",
      authoredExample: {
        prompt:
          "Fill each blank: 'Carry a torch in case the lights ___ (fail / will fail). Arjun is one of the ___ (fastest runner / fastest runners) in the unit. Do you know ___ (to read / how to read) a map?'",
        steps: [
          "First blank: the locking words are 'in case'. They take the present simple even about the future, so fail, not will fail.",
          "Second blank: 'one of the' picks one from a group, so the noun after it is plural: fastest runners.",
          "Third blank: knowing a skill is 'know how to' + base verb: how to read.",
        ],
        answer: "fail; fastest runners; how to read",
      },
      selfCheckExample: {
        prompt:
          "If the sentry had stayed awake, the thief ___ caught. (a) will be (b) would be (c) would have been (d) had been",
        steps: [
          "The If clause has had + stayed: a past that did not happen. This is the third conditional.",
          "The other half must be would have + past participle.",
          "The thief receives the action, so the passive form: would have been caught.",
        ],
        answer: "(c) would have been",
      },
      practiceSet: [
        { prompt: "All that he told us ___ true. (was / were)", answer: "was", method: "All that = everything that: singular." },
        { prompt: "The officer ___ me whether I had a pass. (said / asked)", answer: "asked", method: "A yes-or-no question after whether needs asked; said cannot take a person and a question." },
        { prompt: "This is one of the ___ in the city. (oldest building / oldest buildings)", answer: "oldest buildings", method: "one of the + superlative + plural noun." },
        { prompt: "She took notes in case she ___ the details later. (forgot / would forget)", answer: "forgot", method: "in case takes a simple tense, not would; the story is in the past, so past simple." },
      ],
      pyqExampleId: "0b20af9e-c95e-47c4-9ff5-29bb5724363f",
      traps: [
        {
          title: "will after in case",
          body:
            "'in case he will come' sounds natural to many students but is wrong. Like if and when, **in case** takes the present simple for the future: in case he comes.",
        },
        {
          title: "Mixing the two halves of a conditional",
          body:
            "'If he would have known ...' and 'If he has known ..., he would have ...' are both wrong. In the third conditional the If clause has **had + past participle** and the other clause has **would have + past participle**. They always come as a pair.",
        },
        {
          title: "one of the + a singular noun",
          body:
            "'one of the top ten most powerful member' fails twice over. The noun after 'one of the' is always plural, and a group of ten needs the superlative (most), not the comparative (more).",
        },
        {
          title: "told or said before whether",
          body:
            "told needs a person straight after it (told him), and said reports a statement, not a question. To report a yes-or-no question, use **asked whether** or **asked if**.",
        },
      ],
    },

    // C2 — the clue in the other half of the sentence
    {
      kind: "formula" as const,
      slug: "cdsenfb-sentence-clue",
      name: "The other half of the sentence names the word",
      intuition:
        "When the grammar allows all four options, the meaning decides. The part of the sentence without the blank almost always explains it, defines it, or turns against it. " +
        "Read that part first and say your own word before you look at the options.",
      definition:
        "The terms:\n" +
        "- **Clue**: the part of the sentence that tells you what the blank means. It often comes after a semicolon or a comma, or it is a definition.\n" +
        "- **Same direction**: the clue explains or restates the blank.\n" +
        "- **Contrast**: a word such as but, yet, although or 'till now' turns the clue against the blank.\n" +
        "The method (the passage version is taught in the Cloze chapter):\n" +
        "- Find the clue: the half of the sentence with no blank.\n" +
        "- Decide the direction: same or contrast. Look for but, although, yet.\n" +
        "- Put your own word in the blank before reading the options.\n" +
        "- Pick the option closest to your word. Strike look-alikes that only share its shape: commanded for commended, deduce for reduce, exit for extant.\n" +
        "- Read the whole sentence again with your choice.",
      authoredExample: {
        prompt:
          "The captain praised the team's effort, but he was ___ with the result. (a) pleased (b) disappointed (c) proud (d) satisfied",
        steps: [
          "Find the clue: the first half says the captain praised the effort.",
          "Decide the direction: 'but' turns the second half against the first. The result did not please him.",
          "Say your own word: unhappy.",
          "pleased, proud and satisfied all go the same way as the praise, so strike them. disappointed matches unhappy.",
        ],
        answer: "(b) disappointed",
      },
      selfCheckExample: {
        prompt:
          "A ___ is a person who lives alone and keeps away from other people. (a) host (b) hermit (c) guide (d) pilgrim",
        steps: [
          "The clue is a definition: the rest of the sentence says what the word means.",
          "Own word: someone who lives alone, away from others.",
          "A host receives guests, a guide leads people, a pilgrim travels to a holy place. Only a hermit lives alone.",
        ],
        answer: "(b) hermit",
      },
      practiceSet: [
        { prompt: "The medicine eased his pain, but it did not ___ the disease. (cure / cause)", answer: "cure", method: "'but' sets the second half against 'eased': it helped, yet did not remove the illness." },
        { prompt: "The soldier was ___ for his courage and given a medal. (punished / honoured)", answer: "honoured", method: "'given a medal' goes the same way: a reward." },
        { prompt: "___ he was tired, he finished the march. (Because / Though)", answer: "Though", method: "Being tired and finishing the march pull against each other: contrast." },
        { prompt: "He ___ the offer because the pay was too low. (accepted / declined)", answer: "declined", method: "The reason clause explains a refusal." },
      ],
      pyqExampleId: "9aae84a2-278d-4b1f-8b3b-e3d6b79f9212",
      traps: [
        {
          title: "A look-alike instead of the word",
          body:
            "commanded looks like **commended** (praised), deduce like **reduce**, exit and exempt like **extant** (still in existence). Each wrong option shares a shape, not a meaning. Say what the clue means before you scan the options.",
        },
        {
          title: "broke and broken",
          body:
            "A man who has lost all his money is **broke**. broken is for things that are damaged: a broken chair, a broken promise. The clue about lost investments points to money, so broke.",
        },
        {
          title: "Missing the contrast word",
          body:
            "'We should give everyone training in citizenship but we have ___ this aspect till now' turns on 'but' and 'till now': the thing was not done. **neglected** fits. denied and refused need someone who asked for it.",
        },
        {
          title: "Even or Since where a contrast is needed",
          body:
            "'___ it was raining, he went out without a raincoat': rain and no raincoat pull against each other, so **Although**. Since gives a reason, Unless means if not, and Even cannot join two clauses on its own (even though can).",
        },
      ],
    },

    // C3 — collocations tested
    {
      kind: "reference" as const,
      slug: "cdsenfb-collocations",
      name: "Collocations tested: fixed partners",
      intuition:
        "Some blanks are settled by habit, not by grammar. English pairs certain words: you pay for a thing, you carry a risk. " +
        "The wrong options are real words of the right class that simply do not go with the neighbour.",
      definition:
        "The rule in one line (taught in the Cloze chapter): a **collocation** is a word's habitual partner, so read the neighbour of the blank, say each pair in your head and keep the one English uses.\n" +
        "- Some partners are prepositions: pay for, live in, respond to.\n" +
        "- Some are verb and noun pairs: administer an oath, carry a risk.\n" +
        "- Some are fixed nouns that never change form: a has-been.\n" +
        "- Learn the pairs below as units.",
      table: {
        columns: ["Collocation", "Meaning", "Clue in the sentence", "Wrong options offered", "Sitting"],
        rows: [
          { cells: ["pay for", "give money in exchange for something", "Can you pay ___ all these articles?", "out, of, off", "2017 (I)"], pyqExampleId: "ee6594b3-778b-4ba0-9b9b-6af4641b7a48" },
          { cells: ["live in (a building)", "have your home inside it", "We live ___ a tower block. Our apartment is on the fifteenth floor.", "at, over, above", "2019 (I)"], pyqExampleId: "1454da1d-9892-4539-b5f4-b87c8484bd43" },
          { cells: ["administer the oath", "formally lead someone through taking an oath", "The Governor will ___ the oath of office to the new ministers", "confer, present, execute", "2017 (I)"], pyqExampleId: "48106b32-a2bd-44e5-a2d3-ac7dc9e273c0" },
          { cells: ["carry a risk", "involve a risk", "Complementary medicine ___ fewer risks", "reacts, releases, ejects", "2019 (I)"], pyqExampleId: "a819154d-c776-4a56-a7e6-2a046c1ba24f" },
          { cells: ["respond to", "react to, deal with", "How we ___ to ageing is a choice we must make wisely.", "absolve, discharge, overlook", "2019 (I)"], pyqExampleId: "30a87f6b-8d65-4542-a61d-4e8291c1310c" },
          { cells: ["a has-been", "a person who is no longer important or popular", "a politician of about forty years whom his party now sidelines", "a have-been, a had-been, would have been", "2020 (II)"], pyqExampleId: "3d488fda-bb4c-40e3-9dfc-74342bad3647" },
          { cells: ["percolate to", "spread slowly down to", "The consequences of economic growth have now ___ to the lowest level.", "drawn, slipped, crept", "2017 (I)"], pyqExampleId: "88fd905b-5ff2-45b8-ae09-e87fa3a1f027" },
          { cells: ["no precedent for", "no earlier case to follow", "there is no ___ for awarding scholarships on the basis of merit in examination alone", "opportunity, chance, possibility", "2017 (I)"], pyqExampleId: "68c25e14-f4f9-4aae-83ad-cb1266679349" },
        ],
        caption: "Every wrong option has the right word class. Only the partner word decides.",
      },
      pyqExampleId: "48106b32-a2bd-44e5-a2d3-ac7dc9e273c0",
      selfCheckExample: {
        prompt:
          "The instructor asked the cadets to ___ an effort to finish before dark. (a) do (b) make (c) take (d) give",
        steps: [
          "The noun after the blank is 'effort'. Say each pair: do an effort, make an effort, take an effort, give an effort.",
          "English uses **make an effort**. The other verbs are common words but not its partner.",
        ],
        answer: "(b) make",
      },
      practiceSet: [
        { prompt: "Who will pay ___ the damage? (for / off)", answer: "for", method: "pay for a thing; pay off a debt means clear it fully." },
        { prompt: "Every surgery ___ some risk. (carries / ejects)", answer: "carries", method: "carry a risk = involve a risk." },
        { prompt: "One word for a former star who is no longer popular: a has-been or a had-been?", answer: "a has-been", method: "A fixed noun; its form never changes." },
        { prompt: "There is no ___ for such a decision; it has never been done before. (precedent / president)", answer: "precedent", method: "A precedent is an earlier case that can be followed." },
      ],
      traps: [
        {
          title: "Choosing the preposition from the floor number",
          body:
            "'Our apartment is on the fifteenth floor' tempts you to above or over. But you live **in** a building, a block or a city. at is for a point or an address: at 12 MG Road.",
        },
        {
          title: "Close meaning, wrong partner",
          body:
            "confer goes with a degree or an honour, and present with a prize. An oath is **administered**. Test each option with the noun next to it, not on its own.",
        },
        {
          title: "Changing a fixed noun",
          body:
            "**a has-been** is one fixed word for a person whose best days are over. a had-been and a have-been are not English, even though they look like other tenses of the same verb.",
        },
        {
          title: "Any downward verb for percolate",
          body:
            "slipped and crept also move downward, but only **percolate** means spread slowly through every layer until it reaches the bottom. It is the word for benefits reaching the poorest.",
        },
      ],
    },

    // C4 — phrasal verbs tested
    {
      kind: "reference" as const,
      slug: "cdsenfb-phrasal-verbs",
      name: "Phrasal verbs tested",
      intuition:
        "A phrasal verb is a verb plus a small word (a particle) with a meaning of its own. Here the four options usually share the verb and differ only in the particle, " +
        "so you must know which particle carries which meaning.",
      definition:
        "The rule in one line (taught in the Cloze chapter): a **phrasal verb** is verb + particle (on, off, out, up, upon) with its own meaning, so complete it exactly and never swap the particle.\n" +
        "- When all four options share one verb, match the particle to the meaning the sentence needs.\n" +
        "- Use the rest of the sentence as the check: 'because of the weather', 'even amidst pouring rain'.\n" +
        "- The verb still takes the tense of the sentence: in a past story, came across, not come across.\n" +
        "- Learn the tested ones below.",
      table: {
        columns: ["Phrasal verb", "Meaning", "Clue in the sentence", "Wrong options offered", "Sitting"],
        rows: [
          { cells: ["get on (in a job)", "manage, make progress", "How are you ___ in your new job? Are you enjoying it?", "keeping on, going on, carrying on", "2019 (I)"], pyqExampleId: "11d86600-e3ea-4e26-85f8-a384216f98ca" },
          { cells: ["turn out (to be)", "prove in the end", "Nobody believed Ram at first but he ___ to be right.", "came out, carried out, worked out", "2019 (I)"], pyqExampleId: "43186f0f-72fe-46bf-8f29-9fbeedfc8881" },
          { cells: ["get away with", "escape punishment for a wrong act", "I parked my car in a no-parking zone, but I ___ it.", "came up with, made off with, got on with", "2019 (I)"], pyqExampleId: "4b6267b5-9509-4b5d-903b-7fb521319c23" },
          { cells: ["put (someone) off", "make someone lose interest or change their mind", "You were going to apply ... then you decided not to. So what ___?", "put you out, turned you off, turned you away", "2019 (I)"], pyqExampleId: "f489c45a-5efb-4617-afd5-7bf84a1bea63" },
          { cells: ["call off", "cancel", "The football match had to be ___ because of the weather.", "called on, called out, called over", "2019 (I)"], pyqExampleId: "114d2883-c96e-4599-9acd-2c46a0920d8c" },
          { cells: ["carry on", "continue, even when it is hard", "The boisterous crowd ___ with its merry-making even amidst pouring rain.", "played on, flowed on, carried out", "2024 (I)"], pyqExampleId: "eff6f36b-ffb4-4f07-ae58-cb30b5127e74" },
          { cells: ["get back (to)", "return to an earlier state", "She was advised by her coach to ___ to form", "get on, get along, get done", "2024 (I)"], pyqExampleId: "e95f1da4-51b1-4624-b9b1-170f5c277693" },
          { cells: ["set upon", "attack suddenly", "The goons ___ the unsuspecting victims", "set up, set along, set down", "2024 (I)"], pyqExampleId: "df75c4dc-3c42-400e-b399-1ce7db4c1d1f" },
          { cells: ["pore over", "study something closely", "a team that checked a contract with great care before making its recommendation", "plied over, poured over, run over", "2024 (I)"], pyqExampleId: "790f76ba-e003-45a6-abdc-23b52e4ee604" },
          { cells: ["trip off", "walk away with light, quick steps", "She said goodbye and ___ along the road.", "tripped out, tripped over, tripped in", "2024 (I)"], pyqExampleId: "00e0554b-69b8-4b4d-8389-1daf3205cc45" },
          { cells: ["come across", "find by chance", "When I visited the villages nearby the city I ___ many water bodies intact.", "come across, came, came in", "2020 (II)"], pyqExampleId: "42858f84-66ff-42bd-a616-037e1b9072de" },
        ],
        caption: "The options usually share the verb. The particle carries the meaning.",
      },
      pyqExampleId: "114d2883-c96e-4599-9acd-2c46a0920d8c",
      selfCheckExample: {
        prompt:
          "The two brothers fought as children, but now they ___ very well. (a) get along (b) get away (c) get back (d) get off",
        steps: [
          "All four options share the verb get, so the particle decides.",
          "The sentence needs a word for being friendly with each other: the opposite of fighting.",
          "get along means have a friendly relationship. get away means escape, get back means return, get off means leave a bus or a train.",
        ],
        answer: "(a) get along",
      },
      practiceSet: [
        { prompt: "The rumour ___ to be false. (turned out / turned in)", answer: "turned out", method: "turn out to be = prove in the end." },
        { prompt: "He cheated in the test and ___ it; nobody found out. (got away with / got on with)", answer: "got away with", method: "get away with = escape punishment." },
        { prompt: "I ___ an old photo while cleaning the cupboard. (came across / came in)", answer: "came across", method: "come across = find by chance; past tense for a past event." },
        { prompt: "Don't let one failure ___ you ___ trying again. (put ... off / put ... out)", answer: "put ... off", method: "put someone off = make them lose interest; put out = inconvenience." },
      ],
      traps: [
        {
          title: "Same verb, different particle",
          body:
            "set up means start or build, set upon means attack. get on means manage, get back means return. The examiner keeps the verb and changes the particle, so learn the pair, not the verb.",
        },
        {
          title: "pore over and pour over",
          body:
            "They sound the same. To **pore over** a document is to study it closely. To pour over is to pour a liquid onto something. Only pore over fits careful reading.",
        },
        {
          title: "carry on and carry out",
          body:
            "**carry on** means continue (carry on with the celebration). carry out means perform a task (carry out an order). A crowd that keeps celebrating in the rain carries on.",
        },
        {
          title: "Right particle, wrong tense",
          body:
            "In 'When I visited the villages ... I ___ many water bodies', both came across and come across have the right particle. The past story needs the past form, **came across**.",
        },
      ],
    },
  ],
  related: [
    { label: "Cloze: reading the blank's slot", href: `${CLOZE}/cdsen-cz-slot` },
    { label: "Cloze: verb forms in the blank", href: `${CLOZE}/cdsen-cz-verbs` },
    { label: "Cloze: prepositions and fixed partners", href: `${CLOZE}/cdsen-cz-prepositions` },
    { label: "Cloze: collocations, fixed phrases and phrasal verbs", href: `${CLOZE}/cdsen-cz-collocations` },
    { label: "Cloze: linkers and what they signal", href: `${CLOZE}/cdsen-cz-linkers` },
    { label: "Cloze: meaning from the passage", href: `${CLOZE}/cdsen-cz-meaning` },
    { label: "Grammar: conditionals and tense sequence", href: "/notes/cds-english/grammar/cdsen-sc-conditionals" },
  ],
};
