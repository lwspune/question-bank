import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_PAIRS_NOTE: SubtopicNote = {
  subtopicName: "Confusable Word Pairs",
  title: "Confusable word pairs: both halves must be right",
  oneLineDefinition:
    "Two words that sound or look alike, and four options that give a meaning to each. Only the option that gets both words right scores.",
  whyItMatters:
    "This is one of the most repeated formats in CDS English, and the pairs themselves repeat: compliment and complement, deify and defy, complaisant and complacent all came back in a later paper. " +
    "The trick is always the same. An option gets one word right and the other wrong, or gives the right meanings to the wrong words.",
  concepts: [
    // C1 — the pair method
    {
      kind: "formula" as const,
      slug: "cdsenwd-pair-method",
      name: "Pin one word, then check the other: the pairs UPSC repeats",
      intuition:
        "Every option makes two claims, one for each word. You need both claims true. So pin the word you know best, strike every option that gets it wrong, and only then look at the second word. " +
        "Watch for the **reversed pair**: an option that uses both correct meanings but gives each to the wrong word.",
      definition:
        "The method:\n" +
        "- Pin the word you are surer of. Strike options with a wrong meaning for it.\n" +
        "- Among the survivors, check the second word.\n" +
        "- **Reversed pair**: if two options have the same two meanings in swapped places, decide which word owns which meaning. One of them is the answer.\n" +
        "- **Near-miss meaning**: 'defy = deny' and 'defy = oppose' differ by one idea. Choose the exact sense.\n" +
        "Pairs that have come back:\n" +
        "- **Compliment / complement** (2022 II, 2024 I): compliment = to praise; complement = to go well with, complete.\n" +
        "- **Deify / defy** (2022 II, 2024 I): deify = to treat as a god; defy = to oppose openly.\n" +
        "- **Complaisant / complacent** (2022 II, 2024 I): complaisant = eager to please; complacent = smugly over-confident.\n" +
        "- **Climatic / climactic** (2025 II, 2026 I): climatic = related to climate; climactic = of the most exciting point (the climax).\n" +
        "- **Affect / effect** (2026 I): affect = to influence (a verb); effect = the result (a noun).",
      authoredExample: {
        prompt:
          "Persecute and Prosecute. (a) Persecute means to bring a legal case against, and prosecute means to treat cruelly. (b) Persecute means to treat someone cruelly for their beliefs, and prosecute means to bring a legal case against someone. (c) Persecute means to follow, and prosecute means to protect. (d) Persecute means to treat someone cruelly for their beliefs, and prosecute means to punish without trial.",
        steps: [
          "Pin persecute: to harass or treat cruelly, often for faith or race. Strike (a) and (c).",
          "(b) and (d) survive. Check prosecute.",
          "Prosecute = to bring a legal case against someone; the lawyer who does it is the prosecutor. Punishing without trial is the opposite of prosecution.",
          "Note (a): it holds both correct meanings in swapped places, a reversed pair.",
        ],
        answer: "(b).",
      },
      selfCheckExample: {
        prompt:
          "Venal and Venial. (a) Venal means forgivable, and venial means open to bribery. (b) Venal means open to bribery, and venial means minor and forgivable. (c) Venal means related to veins, and venial means minor and forgivable. (d) Venal means open to bribery, and venial means very serious.",
        steps: [
          "Pin venal: a venal official can be bought. Strike (a) and (c).",
          "Check venial in (b) and (d): a venial sin is a small, forgivable one. Strike (d).",
          "(a) was the reversed pair.",
        ],
        answer: "(b).",
      },
      practiceSet: [
        { prompt: "Adverse or averse: which means unwilling, having a dislike?", answer: "Averse", method: "averse to hard work; adverse = harmful, unfavourable (adverse weather)" },
        { prompt: "Flout or flaunt: which means to break a rule openly?", answer: "Flout", method: "flaunt = to show off" },
        { prompt: "Two options give the same two meanings, but in swapped places. What is the wrong one of them called?", answer: "A reversed pair" },
        { prompt: "Complacent means (a) eager to please (b) smugly over-confident?", answer: "(b) smugly over-confident" },
      ],
      pyqExampleId: "9bb8d01d-b623-4bf2-832b-bcaf0e5a0f35",
      traps: [
        {
          title: "Half right is fully wrong",
          body:
            "An option that gets one word perfectly right is the most tempting wrong answer. Never mark an option until you have checked its claim about **both** words.",
        },
        {
          title: "The reversed pair",
          body:
            "In the deify / defy items, one option gave 'confer the status of god' and 'oppose' but to the wrong words. Both meanings were familiar, so it felt right. Ask which word owns which meaning.",
        },
        {
          title: "Close is not exact",
          body:
            "'Defy = deny' sounds close to 'defy = oppose', but only oppose is right. 'Complacent = in the same place' is built only from the look of the word (place). Pick the sense a dictionary would give.",
        },
      ],
    },

    // C2 — sound-alikes: things, places, writing
    {
      kind: "reference" as const,
      slug: "cdsenwd-sound-things",
      name: "Sound-alike pairs: things, places and writing",
      intuition:
        "These pairs differ by a letter or two and name different things: office paper and standing still, a lodger and a boundary, a poem and a speech. " +
        "Learn each pair with one hook that ties the spelling to the meaning.",
      definition:
        "Hooks that work:\n" +
        "- **Stationery** has e for envelope; **stationary** has a for 'at a standstill'.\n" +
        "- A **boarder** pays for board (meals and lodging); a **border** is a boundary.\n" +
        "- An **epitaph** is on a tomb; an **epithet** describes a person (Alexander the Great).\n" +
        "- An **elegy** is a sad poem; a **eulogy** (eu = good + logos = words) praises the dead.",
      table: {
        columns: ["Pair", "First word means", "Second word means", "Sitting"],
        rows: [
          { cells: ["Stationery / stationary", "Writing and office material", "Not moving, immobile", "2024 (I)"] },
          { cells: ["Boarder / border", "A person paid for food and lodging", "A boundary", "2024 (I)"] },
          { cells: ["Epitaph / epithet", "Words written on a tombstone", "A word or phrase naming a quality", "2024 (I)"] },
          { cells: ["Pontoon / platoon", "A floating support for a temporary bridge", "A small unit of soldiers", "2026 (I)"] },
          { cells: ["Elegy / eulogy", "A sad poem of mourning", "A speech or writing in praise of the dead", "2026 (II)"] },
          { cells: ["Cursor / cursory", "The pointer on a screen", "Done quickly, without care", "2026 (I)"] },
          { cells: ["Liable / libel", "Legally responsible", "Publishing something false that harms someone's name", "2026 (I)"] },
          { cells: ["Voyager / voyeur", "A traveller", "A person who enjoys watching the private lives of others", "2026 (II)"] },
        ],
        caption: "Every pair keeps its sound and changes its meaning completely. Learn each pair as one unit.",
      },
      pyqExampleId: "82494212-c6f9-403f-8172-0e067484f8af",
      selfCheckExample: {
        prompt: "Gorilla and guerrilla. Which one is a fighter in a small, irregular armed group?",
        steps: [
          "Both sound the same in speech.",
          "A gorilla is a large ape.",
          "A guerrilla fights in small groups, using surprise attacks (guerrilla warfare).",
        ],
        answer: "Guerrilla.",
      },
      practiceSet: [
        { prompt: "Cannon or canon: which is a rule or an accepted body of works?", answer: "Canon", method: "a cannon is a large gun" },
        { prompt: "Hoard or horde: which is a large crowd?", answer: "Horde", method: "a hoard is a hidden store" },
        { prompt: "Cereal or serial: which is a story told in parts?", answer: "Serial" },
        { prompt: "Spot the wrong row: 'Cursory = related to a curse'.", answer: "Wrong. Cursory = done quickly, without care." },
      ],
      traps: [
        {
          title: "Both meanings of one word",
          body:
            "If an option gives the two words the same meaning, it is wrong. The pair exists because the words differ.",
        },
        {
          title: "Elegy and eulogy",
          body:
            "Both are about the dead. An **elegy** is a sad poem; a **eulogy** is praise, usually a speech at a funeral. The reversed option swaps them.",
        },
        {
          title: "Platoon is not a bridge",
          body:
            "A **pontoon** floats and holds up a temporary bridge (ponte = bridge). A **platoon** is a group of soldiers. Defence aspirants should never lose this one.",
        },
      ],
    },

    // C3 — sound-alikes: actions, states, qualities
    {
      kind: "reference" as const,
      slug: "cdsenwd-sound-actions",
      name: "Sound-alike pairs: actions, states and qualities",
      intuition:
        "These pairs name actions, states of mind or qualities. They often share most of their letters, and the wrong options borrow a meaning from a third word that sounds similar.",
      definition:
        "Hooks that work:\n" +
        "- **Accept** (take, agree to) vs **except** (leave out): ex = out.\n" +
        "- **Conscious** (awake, able to perceive) vs **conscience** (inner sense of right and wrong): science-like ending, moral sense.\n" +
        "- **Differ** (be different) vs **defer** (delay, or yield to someone's view).\n" +
        "- **Hard** (with effort, difficult) vs **hardly** (scarcely).",
      table: {
        columns: ["Pair", "First word means", "Second word means", "Sitting"],
        rows: [
          { cells: ["Accept / except", "To agree to, to take", "To leave out, exclude", "2022 (II)"] },
          { cells: ["Discomfort / discomfit", "Unease, mild pain", "To embarrass, to upset someone's plans", "2024 (I)"] },
          { cells: ["Conscious / conscience", "Awake and able to perceive", "Inner sense of right and wrong", "2026 (I)"] },
          { cells: ["Hard / hardly", "Difficult; with great effort", "Scarcely, almost not", "2026 (I)"] },
          { cells: ["Differ / defer", "To be different", "To put off, delay", "2026 (II)"] },
          { cells: ["Flaunt / flinch", "To show off", "To shy away in pain or fear", "2026 (II)"] },
          {
            cells: ["Nefarious / nebulous", "Wicked, criminal", "Vague, indistinct", "2026 (II)"],
            noteAmber: "Scandalous is close to nefarious: a nefarious act is wicked enough to cause scandal. When two options both fit nefarious, let the nebulous half decide.",
          },
        ],
        caption: "Check both halves: the option with the best-sounding first meaning can still fail on the second.",
      },
      pyqExampleId: "a7c60c26-f1ae-4c00-9efa-30c6f5164685",
      selfCheckExample: {
        prompt: "Allude and elude. Which one means to escape or avoid being caught?",
        steps: [
          "Allude = to refer to something indirectly (he alluded to his past).",
          "Elude = to escape, to slip away from (the thief eluded the police).",
        ],
        answer: "Elude.",
      },
      practiceSet: [
        { prompt: "Adapt or adopt: which means to take as your own?", answer: "Adopt", method: "adapt = to change to fit" },
        { prompt: "Wander or wonder: which means to roam without a fixed path?", answer: "Wander" },
        { prompt: "Discomfit means (a) to make uncomfortable physically (b) to embarrass or upset someone's plans?", answer: "(b)" },
        { prompt: "Defer means (a) to be different (b) to delay?", answer: "(b) to delay" },
      ],
      traps: [
        {
          title: "Hardly is not 'very hard'",
          body:
            "**Hardly** means scarcely: 'I hardly know him' = I know him very little. The option 'hardly = very difficult' turns it into a stronger form of hard, which it is not.",
        },
        {
          title: "Discomfit is not discomfort",
          body:
            "**Discomfort** is a feeling of unease. **Discomfit** is an action: to embarrass someone or upset their plans. Options that give discomfit 'unfit' are built from the sound alone.",
        },
        {
          title: "Defer has a second sense",
          body:
            "**Defer** also means to yield to someone out of respect (defer to an elder). Options that say 'defer = to be respectful' borrow this, but pair it with a wrong meaning of differ.",
        },
      ],
    },

    // C4 — prefix pairs
    {
      kind: "formula" as const,
      slug: "cdsenwd-prefix-pairs",
      name: "Prefix pairs: e-/ex- out, in-/im- in, re- back",
      intuition:
        "Many pairs differ only in the **prefix**. If you know what each prefix does, you know which word goes which way: e- or ex- moves out, in- or im- moves in, re- goes back or undoes.",
      definition:
        "Prefixes to read:\n" +
        "- **e-, ex-** = out (emigrate = move out of a country; evoke = call out a feeling).\n" +
        "- **in-, im-** = in or on (immigrate = move into a country; invoke = call on).\n" +
        "- **in-, im-** can also mean not (incredible = not believable). Read the word to know which.\n" +
        "- **re-** = back or undo (revoke = call back, cancel).\n" +
        "The method:\n" +
        "- Give each prefix its direction.\n" +
        "- Join it to the shared root and pin one word.\n" +
        "- Check the second word as usual.\n" +
        "Pairs tested this way:\n" +
        "- 2022 (II): evoke (bring out a response) / invoke (call upon, appeal to); emigrate (leave a country) / immigrate (arrive in a country); immolate (sacrifice) / emulate (follow out of admiration).\n" +
        "- 2024 (I): enquiry (asking for information) / inquiry (a formal investigation).\n" +
        "- 2026 (I): invoke (use a law or power to achieve something) / revoke (officially cancel); imminent (about to happen) / eminent (famous and respected); incredible (hard to believe) / incredulous (unwilling to believe).\n" +
        "- 2026 (II): edify (improve someone's mind, uplift) / educe (draw out, extract).",
      authoredExample: {
        prompt:
          "Explicit and Implicit. (a) Explicit means suggested but not stated, and implicit means clearly stated. (b) Explicit means clearly stated, and implicit means suggested but not stated directly. (c) Explicit means outside the law, and implicit means within the law. (d) Explicit means clearly stated, and implicit means completely false.",
        steps: [
          "ex- = out: explicit puts the meaning out in the open, clearly stated.",
          "Strike (a), which gives explicit the meaning of implicit, and (c), which has nothing to do with stating.",
          "im- = in: implicit keeps the meaning folded in, suggested but not said.",
          "(d) gives implicit 'false', which is wrong. (a) was the reversed pair.",
        ],
        answer: "(b).",
      },
      selfCheckExample: {
        prompt:
          "Erupt and Irrupt. Which is correct? (a) Erupt means to burst out, and irrupt means to burst in. (b) Erupt means to burst in, and irrupt means to burst out. (c) Both mean to break into pieces. (d) Erupt means to calm down, and irrupt means to burst in.",
        steps: [
          "e- = out: a volcano erupts, its lava bursts out.",
          "ir- (a form of in-) = in: soldiers irrupt into a building, bursting in.",
          "(b) is the reversed pair; (c) and (d) are wrong.",
        ],
        answer: "(a).",
      },
      practiceSet: [
        { prompt: "Egress or ingress: which is the way out?", answer: "Egress", method: "e- = out" },
        { prompt: "Evade or invade: which means to enter by force?", answer: "Invade", method: "in- = into; evade = to escape" },
        { prompt: "Imminent or eminent: which means about to happen?", answer: "Imminent" },
        { prompt: "Incredible or incredulous: which describes a person who does not believe?", answer: "Incredulous", method: "incredible describes the thing that is hard to believe" },
      ],
      pyqExampleId: "30e9129b-f163-4ea4-8681-6592585657c8",
      traps: [
        {
          title: "Im- does not always mean in",
          body:
            "In **imminent** the im- is not 'into'. Learn it as a whole: imminent = about to happen (an imminent storm); **eminent** = famous and respected (an eminent scientist).",
        },
        {
          title: "Incredible is about the thing, incredulous about the person",
          body:
            "A story is **incredible** (hard to believe). The listener is **incredulous** (unwilling to believe it). An option that swaps them is a reversed pair.",
        },
        {
          title: "Not every pair is a prefix pair",
          body:
            "**Immolate** (to sacrifice, often by burning) and **emulate** (to copy someone you admire) only sound alike. They do not share a root. Treat such a pair as a sound-alike and learn both meanings.",
        },
      ],
    },

    // C5 — same root, different ending
    {
      kind: "reference" as const,
      slug: "cdsenwd-suffix-pairs",
      name: "Same root, different ending",
      intuition:
        "Here both words share a root and differ only in the ending: masterful and masterly, presumptive and presumptuous. The ending changes the meaning, often from a neutral sense to a judgement on someone's behaviour.",
      definition:
        "Endings to watch:\n" +
        "- **-ful** often describes a person's manner (masterful = domineering); **-ly** often describes skill (masterly = very skilful).\n" +
        "- **-ive** often states a fact or likelihood (presumptive = likely, presumed); **-uous** often judges behaviour (presumptuous = too bold).\n" +
        "- **-ious** vs **-uous**: ingenious = clever and inventive; ingenuous = innocent, too trusting.",
      table: {
        columns: ["Pair", "First word means", "Second word means", "Sitting"],
        rows: [
          { cells: ["Perspicacity / perspicuity", "Sharpness of mind, ability to understand", "Clearness of expression", "2022 (II)"] },
          { cells: ["Masterful / masterly", "Domineering, imperious", "Highly skilful", "2024 (I)"] },
          {
            cells: ["Sympathy / empathy", "Feeling for someone in trouble", "Understanding another's feelings as if they were your own", "2022 (II)"],
            noteAmber: "The 2022 (II) item put it as: sympathy = sharing another's feelings, empathy = understanding them.",
          },
          { cells: ["Reward / award", "Something given in return for effort or service", "A prize given in recognition, often formally", "2022 (II)"] },
          { cells: ["Concurrent / consecutive", "Happening at the same time", "Following one after another", "2024 (I)"] },
          { cells: ["Presumptive / presumptuous", "Likely to be true, presumed (the heir presumptive)", "Too bold, disrespectful", "2026 (II)"] },
          { cells: ["Tempestuous / temperamental", "Stormy, violent in feeling", "Moody, unpredictable", "2026 (II)"] },
          { cells: ["Ingenious / ingenuous", "Clever and inventive", "Innocent and too trusting", "2026 (II)"] },
          { cells: ["Concord / concourse", "Agreement, harmony", "A large open hall where people gather (a station concourse)", "2026 (II)"] },
        ],
        caption: "The ending carries the difference. Read it before you read the options.",
      },
      pyqExampleId: "300120c9-a6cb-4ed0-b2b8-78f259271395",
      selfCheckExample: {
        prompt: "Historic and historical. Which word fits: 'The signing of the treaty was a ___ moment for both nations'?",
        steps: [
          "Historical = related to the past (a historical novel, historical records).",
          "Historic = important, likely to be remembered in history.",
          "The sentence calls the moment important, not merely past.",
        ],
        answer: "Historic.",
      },
      practiceSet: [
        { prompt: "Economic or economical: which means using little money, thrifty?", answer: "Economical", method: "economic = related to the economy" },
        { prompt: "Continual or continuous: which means without any break at all?", answer: "Continuous", method: "continual = repeated often, with breaks" },
        { prompt: "Respectful or respectable: which describes a person who deserves respect?", answer: "Respectable", method: "respectful = showing respect to others" },
        { prompt: "Masterly means (a) highly skilful (b) domineering?", answer: "(a) highly skilful" },
      ],
      traps: [
        {
          title: "Masterful is not 'full of mastery'",
          body:
            "**Masterful** describes a commanding, domineering manner. **Masterly** describes great skill (a masterly performance). The ending does not mean what it seems to.",
        },
        {
          title: "Concurrent and consecutive in law",
          body:
            "Two sentences served **concurrently** run at the same time; served **consecutively**, one starts after the other ends. The options swap these to catch quick readers.",
        },
        {
          title: "Ingenuous is not genius",
          body:
            "**Ingenious** has the 'genius' sound and means clever. **Ingenuous** means innocent and too trusting, like a child. Options that call ingenuous 'genuine' or 'inventive' are wrong.",
        },
      ],
    },
  ],
};
