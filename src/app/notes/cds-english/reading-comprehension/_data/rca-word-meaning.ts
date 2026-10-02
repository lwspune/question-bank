import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCA_WORD_MEANING_NOTE: SubtopicNote = {
  subtopicName: "Word Meaning in Context",
  title: "Meaning of a Word or Phrase in the Passage",
  oneLineDefinition:
    "A word question asks what the word means in this passage, not in the dictionary. The sentence around it gives the clue: put each option back into the sentence and keep the one that fits.",
  whyItMatters:
    "Questions on the meaning of a word or phrase are a regular part of CDS passage sets. Many of the words are hard, but the passage nearly always helps: a clue in the same sentence, an explanation a line later, or a contrast. " +
    "A word you only half know can still be answered with the method, and the table at the end lists the passage words CDS has tested.",
  concepts: [
    // C1 — substitute each option back into the sentence
    {
      kind: "formula" as const,
      slug: "cdsenrca-substitute-back",
      name: "Read the sentence, then put each option back in",
      intuition:
        "A word in a passage takes its colour from its sentence. Replace the word with each option in turn: the wrong ones sound odd or change what the sentence says. " +
        "The right one keeps the sentence saying the same thing.",
      definition:
        "The terms:\n" +
        "- **Context clue**: a word or phrase near the tested word that shows its meaning: a cause, an effect, a contrast, or a description.\n" +
        "- **Substitution**: reading the sentence again with an option in place of the tested word.\n" +
        "The method:\n" +
        "- Find the word in the passage. Read its whole sentence and the one before it.\n" +
        "- Look for a clue: what caused it, what it led to, what it is set against.\n" +
        "- Guess a plain meaning in your own words before you read the options.\n" +
        "- Put each option into the sentence. Strike any option that changes the meaning or makes the sentence odd.\n" +
        "- Expect the opposite among the options. One option is often the exact reverse of the meaning.",
      authoredExample: {
        prompt:
          "Line: 'Having grown up poor, she remained frugal all her life: she mended old clothes and never wasted food.' 'frugal' means (a) generous (b) careful with money (c) unhappy (d) lazy",
        steps: [
          "Clues: 'grown up poor' before the word, and after the colon, 'mended old clothes and never wasted food'.",
          "Own guess: she did not spend or waste.",
          "Substitute: 'she remained generous' does not explain mending old clothes; 'unhappy' and 'lazy' are not shown by the clues.",
          "'she remained careful with money' fits every clue.",
        ],
        answer: "(b) careful with money",
      },
      selfCheckExample: {
        prompt:
          "Line: 'The speech was so tedious that half the audience fell asleep before it ended.' 'tedious' means (a) exciting (b) boring (c) short (d) loud",
        steps: [
          "The effect is the clue: half the audience fell asleep.",
          "An exciting or loud speech would not send people to sleep; a short one would end first.",
          "A boring speech fits the effect.",
        ],
        answer: "(b) boring",
      },
      practiceSet: [
        {
          prompt: "'The path was so treacherous that two climbers slipped on it.' 'treacherous' = ?",
          answer: "dangerous",
          method: "Clue: the effect, two climbers slipped.",
        },
        {
          prompt: "'Unlike his talkative brother, Arun was taciturn.' 'taciturn' = ?",
          answer: "silent, saying little",
          method: "'Unlike' sets it against talkative.",
        },
        {
          prompt: "'The medicine alleviated his pain, and he slept well that night.' 'alleviated' = ?",
          answer: "eased",
          method: "Clue: the effect, he slept well.",
        },
        {
          prompt: "'The general's orders were explicit: every man knew exactly what to do.' 'explicit' = ?",
          answer: "clear",
          method: "The part after the colon explains it.",
        },
      ],
      pyqExampleId: "64e8d0d3-a59e-4f3c-a203-6188c5d9c1eb",
      traps: [
        {
          title: "Picking the opposite",
          body:
            "Plastic is 'clogging waterways' and 'clogging drains and preventing rainwater from soaking into the soil'. The options flow, opening and clearing are all the reverse of the meaning. " +
            "Put each one back: 'flowing drains' cannot prevent rainwater from soaking in. **Obstruction** fits.",
        },
        {
          title: "The near miss",
          body:
            "Ship captains 'have been **intrigued** by sightings of emerald icebergs'. 'Surprised' is close, but the captains are drawn to the mystery and want to know more. " +
            "That is **fascinated**. Choose the option that carries the whole meaning, not a part of it.",
        },
        {
          title: "Deciding from the picture, not the sentence",
          body:
            "In a speech about man's endurance, the last sound on earth will be 'that of his **puny** inexhaustible voice'. 'Brave' and 'daring' suit a heroic picture. " +
            "But the sentence sets a small voice against its endless strength, so puny means **tiny**.",
        },
      ],
    },

    // C2 — the passage picks the sense; look-alikes
    {
      kind: "formula" as const,
      slug: "cdsenrca-sense-lookalikes",
      name: "The passage picks the sense; look-alike words are traps",
      intuition:
        "Many English words have more than one sense, and many hard words look like easier ones. The words around the tested word decide which sense is meant. " +
        "A look-alike option, such as suffering for suffrage, is set to catch the eye, not the mind.",
      definition:
        "The terms:\n" +
        "- **Sense**: one of a word's meanings. A 'field' is farmland in 'a field of wheat' and a subject in 'the field of physics'.\n" +
        "- **Look-alike**: a different word with a similar spelling or sound: immanent and imminent, eminent and imminent, principal and principle.\n" +
        "The method:\n" +
        "- Read what the word is attached to: the noun after it, the verb before it.\n" +
        "- Ask which sense those words allow, and strike options that give another sense of the same word.\n" +
        "- Spell the tested word letter by letter. Check that the option's meaning belongs to this word, not to its look-alike.\n" +
        "- Read a compound word as a whole: 'grassroots' is not about grass or roots.\n" +
        "- If an option gives the commonest sense of the word but does not fit the sentence, it is the trap.",
      authoredExample: {
        prompt:
          "Line: 'The crew had to bail out the water before the hull filled.' 'bail out' here means (a) pay money to free someone from jail (b) jump from an aircraft (c) scoop water out of a boat (d) rescue a company from losses",
        steps: [
          "'bail out' has several senses; all four options are real senses of it.",
          "Read what it is attached to: 'the water', and 'before the hull filled'. A hull is the body of a ship.",
          "Only one sense works with water in a ship.",
        ],
        answer: "(c) scoop water out of a boat",
      },
      selfCheckExample: {
        prompt:
          "Line: 'The judge was known to be impartial; he never favoured either side.' 'impartial' means (a) incomplete (b) fair, not taking sides (c) partly true (d) impatient",
        steps: [
          "The clue after the semicolon: he never favoured either side.",
          "(a) and (c) play on the look of 'part'; (d) only looks like the word.",
          "Not taking sides is being fair.",
        ],
        answer: "(b) fair, not taking sides",
      },
      practiceSet: [
        {
          prompt: "'The eminent scientist received the award.' What does 'eminent' mean?",
          answer: "famous and respected",
          method: "Not imminent, which means about to happen.",
        },
        {
          prompt: "'The crane lifted the steel beams onto the roof.' Is the crane a bird or a machine?",
          answer: "a machine",
          method: "A bird cannot lift steel beams.",
        },
        {
          prompt: "'He was a principal figure in the freedom movement.' 'principal' = ?",
          answer: "main, leading",
          method: "Not principle, which means a rule or belief.",
        },
        {
          prompt: "'She rented a flat in the city.' 'flat' = ?",
          answer: "an apartment",
          method: "'rented ... in the city' allows only the home sense, not 'level'.",
        },
      ],
      pyqExampleId: "e3897a5a-6a19-4f02-8a41-83b56d4c3f01",
      traps: [
        {
          title: "Immanent read as imminent",
          body:
            "'There is an **immanent** conflict between the automobile and the city.' Immanent means existing within, so the conflict is inherent. " +
            "'Inevitable' is the trap: it suits imminent (about to happen), a different word.",
        },
        {
          title: "Suffrage read as suffering",
          body:
            "The passage speaks of 'the women's **suffrage** and Progressive movements'. Suffrage is the right to vote. 'Women's suffering' only borrows the look of the word.",
        },
        {
          title: "Canonical read as cannon",
          body:
            "'Highbrow **canonical** literature' is the body of works accepted as important and influential. 'War literature' plays on cannon, a gun.",
        },
        {
          title: "A compound taken literally",
          body:
            "Reading groups 'mobilised ... movements at the **grassroots**'. Grassroots means ordinary people at the local level. 'The root cause of poverty' reads the word's parts, not the word.",
        },
      ],
    },

    // C3 — idioms and figurative phrases
    {
      kind: "formula" as const,
      slug: "cdsenrca-idioms-figurative",
      name: "Idioms and figurative phrases: read the picture, keep the sentence's 'not'",
      intuition:
        "An idiom means more than its words: 'square with' has nothing to do with squares. Picture the scene the words paint, then ask what it means for the people in the passage. " +
        "And notice any 'not' that the sentence puts in front of the phrase.",
      definition:
        "The terms:\n" +
        "- **Idiom**: a fixed phrase whose meaning is not the sum of its words: 'evade the law' (escape obeying it), 'square with' (agree with).\n" +
        "- **Figurative phrase**: a picture used to make a point: 'good hunting' for an easy target.\n" +
        "The method:\n" +
        "- Read the full sentence and the one after it. The writer often explains the picture.\n" +
        "- Picture the literal scene, then ask what it means here: who gains, who loses, what feeling.\n" +
        "- Say the meaning in plain words, then match an option.\n" +
        "- If the sentence negates the phrase ('does not square with'), check whether the options give the meaning of the phrase or of the whole sentence. Keep the 'not' in mind.\n" +
        "- Strike options that take the words literally, and options that add a detail the phrase does not carry.",
      authoredExample: {
        prompt:
          "Line: 'When the colonel asked who had broken the window, the young cadet decided to face the music and stepped forward.' 'face the music' means (a) listen to a band (b) accept the blame and its result (c) run away (d) sing loudly",
        steps: [
          "Picture: the colonel wants the culprit, and the cadet steps forward.",
          "(a) and (d) take 'music' literally. (c) is the opposite of stepping forward.",
          "He chose to own up and take what follows.",
        ],
        answer: "(b) accept the blame and its result",
      },
      selfCheckExample: {
        prompt:
          "Line: 'After weeks of argument, the two villages finally buried the hatchet and shared the well.' 'buried the hatchet' means (a) hid their weapons (b) made peace (c) dug a new well (d) started a fight",
        steps: [
          "The clues: 'after weeks of argument' and 'shared the well'.",
          "(a) and (c) read the words literally; (d) is the opposite.",
          "They ended the quarrel.",
        ],
        answer: "(b) made peace",
      },
      practiceSet: [
        {
          prompt: "'He let the cat out of the bag before the party.' Meaning?",
          answer: "He told a secret too early.",
        },
        {
          prompt: "'Her plan does not hold water.' Meaning?",
          answer: "The plan is not sound; it fails when tested.",
          method: "Keep the sentence's 'not'.",
        },
        {
          prompt: "'The new manager has a lot on his plate.' Meaning?",
          answer: "He has many tasks to deal with.",
        },
        {
          prompt: "'His old friends gave him the cold shoulder.' Meaning?",
          answer: "They ignored him on purpose.",
        },
      ],
      pyqExampleId: "802fe6c5-a853-4cc0-8bb8-fe3c5b6403fd",
      traps: [
        {
          title: "Losing the sentence's 'not'",
          body:
            "'The deployment of security forces in a foreign country certainly **does not square with** that idea.' To square with means to agree with. " +
            "The question asks what the phrase implies in the passage, and there the sentence says the opposite: **not in agreement**. Read the whole sentence before you answer.",
        },
        {
          title: "Reading the picture literally",
          body:
            "'If you show that you are afraid of them, you **give promise of good hunting**.' Hunting is the picture; the point is that a frightened person looks like easy prey. " +
            "So the phrase means you are **vulnerable**, not 'challenging'.",
        },
        {
          title: "An option that adds a detail",
          body:
            "'This will give China's vessels a **strategic foothold** in the Pacific.' A foothold is a planned point of access. 'Valid entry', 'legitimate passage' and 'sanctioned routes' add a legal approval the phrase never carries.",
        },
        {
          title: "Choosing the reverse of an idiom",
          body:
            "'Wishing to **evade the law**, she placed her tiny dog in her dress pocket.' To evade is to escape; she wished to avoid following the law. 'Reluctance to break the law' says the opposite.",
        },
      ],
    },

    // C4 — terms and references the passage explains
    {
      kind: "formula" as const,
      slug: "cdsenrca-explained-terms",
      name: "Terms and references: what the phrase points to in this passage",
      intuition:
        "Some phrases are technical terms or point to something outside the sentence: an event, a group, an order. The passage usually explains them nearby. " +
        "When it does not, ask what the phrase points to in this passage, and break a long term into its parts.",
      definition:
        "The terms:\n" +
        "- **Technical term**: a phrase from a subject like economics or ecology: carbon sink, pass through, unanchoring.\n" +
        "- **Reference**: a phrase that points to something named elsewhere: 'the new technology' pointing to an event, 'respectively' pointing back to an order.\n" +
        "The method:\n" +
        "- Find the term and read two sentences before and after. Passages on economics and science often explain a term after a dash or 'that is'.\n" +
        "- Break the term into its parts: un + anchor + ing = losing the anchor. Then join it to what it describes.\n" +
        "- For 'respectively', match the first item to the first meaning and the second to the second. Check the order, not just the pair.\n" +
        "- For a phrase that names a period or an event, the passage gives the date and the field; a little general knowledge may be needed to name it.\n" +
        "- For a negated phrase ('would not seek to become a hegemon'), find the meaning of the term, then apply the 'not'.\n" +
        "- Strike an option that gives a result of the term instead of its meaning.",
      authoredExample: {
        prompt:
          "Line: 'Many small shops have seen a fall in footfall (the number of people who walk in) since the mall opened.' 'footfall' here means " +
          "(a) the sound of feet (b) the number of visitors entering a shop (c) a fall on the stairs (d) the cost of the shop floor",
        steps: [
          "Find the term and look beside it: the brackets explain it.",
          "(a) and (c) read 'foot' and 'fall' literally. (d) is not stated.",
          "The passage's own explanation is the number of people who walk in.",
        ],
        answer: "(b) the number of visitors entering a shop",
      },
      selfCheckExample: {
        prompt:
          "Line: 'The twins, Asha and Meera, joined the navy and the air force respectively.' Which is correct? (a) Asha joined the air force (b) Meera joined the navy (c) Asha joined the navy and Meera the air force (d) Both joined the navy",
        steps: [
          "'respectively' pairs the lists in order: first with first, second with second.",
          "Asha (first) = the navy (first). Meera (second) = the air force (second).",
          "(a) and (b) swap the order.",
        ],
        answer: "(c) Asha joined the navy and Meera the air force",
      },
      practiceSet: [
        {
          prompt: "'The bank's bad loans, that is, loans unlikely to be repaid, have risen.' What are bad loans?",
          answer: "Loans unlikely to be repaid.",
          method: "'that is' introduces the explanation.",
        },
        {
          prompt: "'The firm does not intend to monopolise the market.' What does the firm not plan to do?",
          answer: "To become the only seller and control the whole market.",
          method: "Find the term's meaning, then apply the 'not'.",
        },
        {
          prompt: "'Rising costs are passed on to buyers.' Who pays the higher costs in the end?",
          answer: "The buyers.",
        },
        {
          prompt: "'Traffic and noise grow worse in summer and winter respectively.' When is the noise worse?",
          answer: "In winter.",
          method: "Second item with second item.",
        },
      ],
      pyqExampleId: "53629fb6-0a39-4f69-adb6-2e545242fff9",
      traps: [
        {
          title: "Right pair, wrong order",
          body:
            "'The Orient and the Occident' means the East and the West, in that order. 'The West and the East respectively' has the right pair but the wrong order. " +
            "With 'respectively', check the order.",
        },
        {
          title: "A result offered as the meaning",
          body:
            "'... the regeneration of forests to act as a **carbon sink**.' A carbon sink takes in more carbon than it gives out. " +
            "'Depletion of forest cover adds to carbon emission' is a result of that fact, not the meaning of the phrase.",
        },
        {
          title: "Forgetting who passes what to whom",
          body:
            "Manufacturers have been passing rising input costs on to buyers; in services this is incomplete, and 'as demand firms up, the **pass through** is likely to gather traction'. " +
            "So it means services raising prices as demand picks up. 'Manufacturing is bearing the burden of input costs' reverses who does what.",
        },
        {
          title: "A term that needs a little history",
          body:
            "'New and advanced technology' in the English textile industry of the mid-eighteenth century points to the **Industrial Revolution**. " +
            "The passage gives the date and the field but not the name, so this item needs a little general knowledge as well as the passage.",
        },
      ],
    },

    // C5 — the passage words CDS has tested (reference)
    {
      kind: "reference" as const,
      slug: "cdsenrca-word-table",
      name: "Passage words CDS has tested",
      intuition:
        "Some passage words cannot be guessed: the sentence only confirms a meaning you already know. These are worth learning ahead. " +
        "The table lists the passage words and phrases CDS has asked about, each with its meaning in its passage.",
      definition:
        "How to use this table:\n" +
        "- Learn each word with its **meaning in the passage**. Several have other senses elsewhere.\n" +
        "- Read the 'Tested as' column: a meaning question, a passage word to find, an opposite, or a word form.\n" +
        "- The rows are grouped: feelings and manner; look-alikes and senses; society, law and power; economy and environment; change and events; thinking; word forms.\n" +
        "- When a word you know appears in a passage, still read its sentence. The passage decides the sense.",
      table: {
        columns: ["Word or phrase", "Meaning in the passage", "Tested as", "Sitting"],
        rows: [
          { cells: ["wearily", "in a tired, exhausted way", "Meaning; trap: tireless", "2017 (I)"] },
          { cells: ["intrigued", "fascinated, wanting to know more", "Meaning; near miss: surprised", "2017 (II)"] },
          { cells: ["overwhelming", "very strong", "Meaning", "2017 (I)"] },
          { cells: ["struck dumb", "so shocked that he could not speak", "Meaning of the phrase", "2017 (I)"] },
          { cells: ["puny", "tiny, weak", "Meaning; traps: brave, daring", "2024 (I)"] },
          { cells: ["uncomprehendingly", "without understanding", "Meaning", "2021 (I)"] },
          { cells: ["erudite", "very learned, scholarly", "Antonym: ill-educated", "2021 (II)"], noteAmber: "'Learned' sat among the options: it is a synonym, not the antonym." },
          { cells: ["dilettantes", "people who dabble in an art without real interest", "Meaning", "2024 (II)"] },
          { cells: ["prejudice", "bias, an opinion formed in advance", "Passage word for 'bias'", "2021 (I)"] },
          { cells: ["immanent", "existing within, inherent", "Meaning; trap: inevitable", "2026 (I)"], noteAmber: "Not imminent (about to happen)." },
          { cells: ["culture (of potatoes)", "growing plants, cultivation", "Sense; traps: the arts, shared values", "2026 (II)"] },
          { cells: ["suffrage", "the right to vote", "Meaning; trap: suffering", "2026 (II)"] },
          { cells: ["canonical", "accepted as important and influential", "Meaning; trap: war literature", "2026 (II)"], noteAmber: "Canon (accepted works) is not cannon (a gun)." },
          { cells: ["constituent", "a part, a component", "Meaning; traps: constellation, consternation", "2022 (I)"] },
          { cells: ["grassroots", "ordinary people at the local level", "Meaning; trap: root cause", "2026 (II)"] },
          { cells: ["quotidian", "day-to-day, ordinary", "Meaning", "2022 (II)"] },
          { cells: ["marginalised", "pushed to the edge of society, ignored", "Meaning of the sentence", "2017 (II)"] },
          { cells: ["evade the law", "avoid obeying the law", "Meaning of the phrase", "2018 (I)"] },
          { cells: ["litigations", "lawsuits, court cases", "Passage word for 'lawsuit'", "2019 (II)"] },
          { cells: ["resistance", "opposition, defiance", "Meaning; trap: conforming", "2023 (II)"] },
          { cells: ["resistant", "refusing to give way", "Antonym: pliant", "2026 (II)"], noteAmber: "'Defiant' sat among the options: it is a synonym." },
          { cells: ["hegemon", "a power that dominates others", "Meaning of 'would not become a hegemon'", "2022 (II)"] },
          { cells: ["strategic foothold", "a planned point of access and influence", "Meaning of the phrase", "2022 (II)"] },
          { cells: ["the Orient and the Occident", "the East and the West", "Meaning, in order", "2018 (I)"] },
          { cells: ["diverse combinatory prowess", "skill at joining different elements into one working system", "Meaning of the phrase", "2023 (II)"] },
          { cells: ["protocol", "a formal set of rules for doing something", "Meaning", "2022 (II)"] },
          { cells: ["pent-up demand", "spending held back now, to be released later", "Meaning of the term", "2021 (II)"] },
          { cells: ["pass through", "passing higher costs on to buyers", "Meaning of the term", "2022 (II)"] },
          { cells: ["unanchoring (of inflation)", "inflation breaking loose and running out of control", "Meaning of the term", "2022 (II)"] },
          { cells: ["carbon sink", "something that takes in more carbon than it gives out", "Meaning of the term", "2022 (II)"] },
          { cells: ["clogging", "blocking", "Meaning; traps: flow, clearing", "2023 (I)"] },
          { cells: ["deforestation", "clearing of forests", "Name of the effect", "2017 (I)"] },
          { cells: ["prevalence", "how common something is", "Passage word to fill a blank", "2018 (II)"] },
          { cells: ["diluted", "weakened", "Antonym: consolidated", "2018 (I)"] },
          { cells: ["new and advanced technology", "the Industrial Revolution", "What the phrase refers to", "2019 (I)"] },
          { cells: ["emerged", "came up, surfaced", "Passage word for 'surfaced'", "2019 (II)"] },
          { cells: ["transitioned", "changed over", "Passage word for 'changeover'", "2020 (I)"] },
          { cells: ["previously", "earlier", "Passage word for 'earlier'", "2018 (II)"] },
          { cells: ["trend", "a general direction, a tendency", "Passage word for 'tendency'", "2019 (II)"] },
          { cells: ["customized", "adapted to a need", "Meaning; trap: mass produced", "2019 (II)"] },
          { cells: ["demolition", "destruction", "Meaning", "2018 (II)"] },
          { cells: ["league up", "band together", "Meaning of the phrase", "2022 (I)"] },
          { cells: ["give promise of good hunting", "show yourself an easy target", "Meaning of the phrase", "2018 (II)"] },
          { cells: ["predator, marauding", "predator: an animal that hunts others; marauding: roaming to attack", "Pair of passage words for enemies", "2018 (I)"] },
          { cells: ["square with", "agree with", "Meaning, with the sentence's 'not'", "2022 (II)"] },
          { cells: ["perspectives", "viewpoints", "Passage word for 'viewpoints'", "2020 (I)"] },
          { cells: ["distinctive", "special, setting something apart", "Passage word for 'unique'", "2020 (II)"] },
          { cells: ["analogy", "a comparison that shows likeness", "Opposite of 'contrast'", "2020 (II)"] },
          { cells: ["deterministic relationship", "events caused by forces outside the will", "Term for a definition", "2024 (II)"] },
          { cells: ["components, dimensions", "parts", "Opposite of 'whole'", "2024 (I)"] },
          { cells: ["terraced", "cut into steps; adjective from the noun terrace", "Word form", "2026 (II)"] },
          { cells: ["settled", "verb form of settle that also works as an adjective", "Word form", "2026 (II)"] },
          { cells: ["subversive", "undermining authority; noun form: subversion", "Noun form", "2026 (II)"], noteAmber: "Subvention (a grant of money) only looks like it." },
        ],
        caption: "Grouped by theme. The traps named in the third column are the options set against each word.",
      },
      pyqExampleId: "ac862fe9-ae8d-449d-ad38-4c9c3d759d9c",
      selfCheckExample: {
        prompt:
          "Spot the wrong row: (a) suffrage = the right to vote (b) immanent = about to happen (c) litigations = lawsuits (d) demolition = destruction",
        steps: [
          "Check each row against the table.",
          "Immanent means existing within, inherent.",
          "'About to happen' is the meaning of imminent, its look-alike.",
        ],
        answer: "(b) immanent = about to happen",
      },
      practiceSet: [
        {
          prompt: "In a passage, what are 'dilettantes'?",
          answer: "People who dabble in an art without real interest.",
        },
        {
          prompt: "Spot the wrong row: erudite = learned; resistant = pliant; prevalence = how common; trend = tendency.",
          answer: "resistant = pliant",
          method: "Pliant (yielding) is its opposite.",
        },
        {
          prompt: "What do 'the Orient and the Occident' mean, in that order?",
          answer: "The East and the West.",
        },
        {
          prompt: "What is a 'protocol'?",
          answer: "A formal set of rules for doing something.",
        },
      ],
      traps: [
        {
          title: "Learning one sense only",
          body:
            "You may know 'pass through' as going through a place. In a passage on prices it means passing higher costs on to buyers. Learn the passage sense along with the common one.",
        },
        {
          title: "The synonym in an antonym question",
          body:
            "Erudite and learned mean the same; resistant and defiant mean the same. In an antonym question, these synonyms sit among the options to catch a quick reader.",
        },
        {
          title: "A look-alike in the options",
          body:
            "Suffering, cannon, imminent and subvention are all look-alikes set against the tested words. Spell the tested word letter by letter before you choose.",
        },
      ],
    },
  ],
};
