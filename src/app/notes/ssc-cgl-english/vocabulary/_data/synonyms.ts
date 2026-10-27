import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EVO_SYNONYMS_NOTE: SubtopicNote = {
  subtopicName: "Synonyms",
  title: "Synonyms",
  oneLineDefinition:
    "Choosing the word closest in meaning to a given word, learnt in families: law and duty, character and temper, harm and size, and feelings and speech.",
  whyItMatters:
    "Two hundred and ten questions in the bank, 80 from the 2023 shifts, 89 from the 2024 shifts and 41 from the 2025 shifts, and 168 of them EASY. Every question from the 2025 shifts gives the word alone, in capitals; the earlier shifts often set it inside a sentence, underlined or in brackets beside a blank.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscevosy-law",
      name: "Law, duty and getting things done",
      intuition:
        "Say the word's meaning to yourself before you look at the options. SSC usually puts the opposite among the four (rectify beside mar and corrupt, forsake beside clutch), so a quick 'same or opposite?' check on each option removes the trap before it can catch you.",
      definition:
        "The groups:\n" +
        "- **Cheating and wrongdoing:** scam (swindle), spurious (fraudulent, not genuine), transgression (violation of a law or rule).\n" +
        "- **Forgiving and taking away:** condone (pardon an offence), confiscate (seize by authority), repulse (repel an attack).\n" +
        "- **Giving up and giving in:** forsake (abandon), abnegate (renounce a right or claim), yield (concede).\n" +
        "- **Need and order:** indispensable and necessary (essential), kilter (order, as in 'out of kilter'), haphazard (random), rectify (amend, put right).\n" +
        "- **Pace:** dilatory (slow, causing delay), respite (a short break), persistently (continuously, again and again).",
      table: {
        columns: ["Word", "Meaning", "Keyed synonym", "Asked in"],
        rows: [
          { cells: ["Scam", "A dishonest scheme to cheat people", "Swindle", "2023"] },
          { cells: ["Spurious", "False, not genuine", "Fraudulent", "2023"] },
          { cells: ["Transgression", "An act that breaks a law or rule", "Violation", "2023"] },
          { cells: ["Inculcate", "Fix an idea in someone's mind by repeating it", "Instil", "2023"] },
          { cells: ["Yield", "Give in to a demand", "Concede", "2023"] },
          { cells: ["Condone", "Overlook or forgive an offence", "Pardon", "2024"] },
          { cells: ["Confiscate", "Take property away by authority", "Seize", "2024"] },
          { cells: ["Forsake", "Give up or leave", "Abandon", "2024"] },
          { cells: ["Rectify", "Correct, put right", "Amend", "2024"] },
          { cells: ["Indispensable", "Absolutely necessary", "Essential", "2024"] },
          { cells: ["Respite", "A short period of rest or relief", "Break", "2024"] },
          { cells: ["Kilter", "Good working order", "Order", "2024"] },
          { cells: ["Abnegate", "Give up a right or claim", "Renounce", "2025"] },
          { cells: ["Dilatory", "Slow to act, causing delay", "Tardy", "2025"] },
          { cells: ["Haphazard", "Without order or plan", "Random", "2025"] },
        ],
      },
      pyqExampleId: "6b78e32e-2cd1-49c7-8a6a-60f437b97bf3",
      selfCheckExample: {
        prompt: "Choose the synonym of 'condone'. (a) Punish (b) Pardon (c) Report (d) Repeat",
        steps: ["To condone is to overlook or forgive an offence.", "Punish is close to the opposite; report and repeat are unrelated."],
        answer: "(b) Pardon",
      },
      practiceSet: [
        { prompt: "Give a one-word synonym of 'confiscate'.", answer: "Seize" },
        { prompt: "Give a one-word synonym of 'spurious'.", answer: "Fraudulent (false, not genuine)" },
        { prompt: "What does 'out of kilter' mean?", answer: "Out of order, not working or balanced properly" },
        { prompt: "Give a one-word synonym of 'haphazard'.", answer: "Random" },
      ],
      traps: [
        {
          title: "Picking the opposite",
          body: "SSC often places the antonym among the options (mar and corrupt beside rectify, clutch beside forsake). An option that is strongly related to the word may be its opposite, so check the direction before you mark it.",
        },
        {
          title: "Dilatory is not about dilating",
          body: "Dilatory means slow and causing delay, so its synonym is tardy. It has nothing to do with dilate (to widen).",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevosy-character",
      name: "Character and temper",
      intuition:
        "Most of these words describe a person, and many come in clusters that share one synonym: adamant, obstinate, obdurate and intransigent all mean stubborn; genial and jovial both mean cheerful. Learn the cluster and four questions become one.",
      definition:
        "The groups:\n" +
        "- **Stubborn:** adamant, obstinate, obdurate, intransigent, implacable (cannot be calmed or moved).\n" +
        "- **Generous and careful with money:** benevolent (kind, generous), munificent (very generous, magnanimous), altruistic (selfless, philanthropic), frugal (thrifty, careful with money).\n" +
        "- **Disloyal:** treacherous (disloyal), perfidious (treacherous, untrustworthy).\n" +
        "- **Cheerful and eager:** genial and jovial (cheerful), ebullient and zealous (enthusiastic), exuberance (lively energy).\n" +
        "- **Wise and careful:** judicious (sensible, prudent), circumspect (cautious), diligent (careful and hard-working).\n" +
        "- **Bold or rough:** temerity (impudence, rash boldness), pugnacious (belligerent, eager to fight).\n" +
        "- **Young and untried:** callow (inexperienced), juvenile (childish).",
      table: {
        columns: ["Word", "Meaning", "Keyed synonym", "Asked in"],
        rows: [
          { cells: ["Judicious", "Showing good judgement", "Sensible, prudent", "2023, 2024"] },
          { cells: ["Adamant", "Refusing to change one's mind", "Stubborn", "2023"] },
          { cells: ["Benevolent", "Kind and ready to help", "Generous", "2023"] },
          { cells: ["Treacherous", "Betraying trust", "Disloyal", "2023"] },
          { cells: ["Genial", "Friendly and cheerful", "Cheerful", "2023"] },
          { cells: ["Temerity", "Rash, cheeky boldness", "Impudence", "2023"] },
          { cells: ["Obstinate", "Refusing to change one's mind", "Stubborn", "2024"] },
          { cells: ["Munificent", "Very generous", "Magnanimous", "2024"] },
          { cells: ["Frugal", "Careful and sparing with money", "Thrifty", "2024"] },
          { cells: ["Jovial", "Cheerful and friendly", "Cheerful", "2024"] },
          { cells: ["Pugnacious", "Eager to argue or fight", "Belligerent", "2024"] },
          { cells: ["Intransigent", "Refusing to change one's views", "Stubborn", "2025"] },
          { cells: ["Implacable", "Cannot be calmed or moved", "Unyielding", "2025"] },
          { cells: ["Perfidious", "Deceitful and untrustworthy", "Treacherous", "2025"] },
          { cells: ["Circumspect", "Wary, unwilling to take risks", "Cautious", "2025"] },
          { cells: ["Callow", "Young and inexperienced", "Inexperienced", "2025"] },
        ],
      },
      pyqExampleId: "cb401cb9-c1cb-41ce-8af0-711c92b8ab82",
      selfCheckExample: {
        prompt: "Choose the synonym of 'obdurate'. (a) Gentle (b) Stubborn (c) Cheerful (d) Generous",
        steps: ["Obdurate belongs to the stubborn cluster with adamant and obstinate.", "Gentle is close to the opposite; cheerful and generous describe other traits."],
        answer: "(b) Stubborn",
      },
      practiceSet: [
        { prompt: "Give a one-word synonym of 'frugal'.", answer: "Thrifty" },
        { prompt: "Give a one-word synonym of 'jovial'.", answer: "Cheerful" },
        { prompt: "Give a one-word synonym of 'circumspect'.", answer: "Cautious" },
        { prompt: "Name two words from SSC papers that mean stubborn.", answer: "Any two of adamant, obstinate, obdurate and intransigent" },
      ],
      traps: [
        {
          title: "Complaisant is not complacent",
          body: "Complaisant means eager to please others, so SSC keyed it as submissive. Complacent means smugly satisfied with oneself. One letter apart, different meanings.",
        },
        {
          title: "Frugal does not mean poor or mean",
          body: "A frugal person spends carefully (thrifty). Miserly and stingy go further and suggest meanness; frugal does not.",
        },
        {
          title: "Genuine and authentic both ways",
          body: "SSC asked authentic with genuine as the key and genuine with authentic as the key, both in 2023. A pair that is asked in both directions is worth learning as a pair.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevosy-harm",
      name: "Harm, size and the senses",
      intuition:
        "Group these by what they measure. Some say how dangerous something is (deleterious, fatal, toxic), some how strong or weak (feeble, fragile, brittle), some how big or how much (vast, abundant, exiguous), and some what you see or hear (luminous, mellifluous). Place the word in its group first, then pick the option in the same group.",
      definition:
        "The groups:\n" +
        "- **Harm and death:** deleterious and insidious (harmful), fatal (deadly), toxic and mortal (lethal), devastating (destructive), ravaged (ruined).\n" +
        "- **Weak and easily broken:** feeble (weak), fragile (delicate), brittle (fragile), enervate (weaken, drain of energy).\n" +
        "- **Size and amount:** vast (extensive), immense (huge), abundant (ample), adequate (sufficient), exiguous (scanty), truncated (shortened).\n" +
        "- **Highest and most important:** paramount (supreme), apogee (peak).\n" +
        "- **Light, sound and life:** luminous (radiant), coruscate (sparkle), mellifluous (musical, sweet-sounding), cadaverous (pale, like a corpse), sentient (conscious).\n" +
        "- **Hard luck and good luck:** predicament (quandary), adversity (misfortune), hapless (unfortunate), propitious (favourable).",
      table: {
        columns: ["Word", "Meaning", "Keyed synonym", "Asked in"],
        rows: [
          { cells: ["Luminous", "Giving off light", "Resplendent, radiant", "2023, 2025"] },
          { cells: ["Insidious", "Harmful in a slow, hidden way", "Harmful", "2023"] },
          { cells: ["Mortal", "Causing death (a mortal blow)", "Lethal", "2023"] },
          { cells: ["Feeble", "Lacking strength", "Weak", "2023"] },
          { cells: ["Fragile", "Easily broken", "Delicate", "2023"] },
          { cells: ["Predicament", "A difficult situation", "Quandary", "2023"] },
          { cells: ["Fatal", "Causing death", "Deadly", "2024"] },
          { cells: ["Toxic", "Poisonous", "Lethal", "2024"] },
          { cells: ["Brittle", "Hard but easily broken", "Fragile", "2024"] },
          { cells: ["Abundant", "Existing in large amounts", "Ample", "2024"] },
          { cells: ["Paramount", "More important than anything else", "Supreme", "2024"] },
          { cells: ["Adversity", "Hardship", "Misfortune", "2024"] },
          { cells: ["Deleterious", "Causing harm or damage", "Harmful", "2025"] },
          { cells: ["Exiguous", "Very small in amount", "Scanty", "2025"] },
          { cells: ["Apogee", "The highest point", "Peak", "2025"] },
          { cells: ["Propitious", "Giving a good chance of success", "Favourable", "2025"] },
        ],
      },
      pyqExampleId: "ab858b97-4c39-4e34-b7ad-c11736de4623",
      selfCheckExample: {
        prompt: "Choose the synonym of 'exiguous'. (a) Scanty (b) Plentiful (c) Ancient (d) Brilliant",
        steps: ["Exiguous is a size-and-amount word: very small in amount.", "Plentiful is its opposite; ancient and brilliant belong to other groups."],
        answer: "(a) Scanty",
      },
      practiceSet: [
        { prompt: "Give a one-word synonym of 'feeble'.", answer: "Weak" },
        { prompt: "Give a one-word synonym of 'paramount'.", answer: "Supreme" },
        { prompt: "What does 'mellifluous' describe?", answer: "A sweet, musical sound" },
        { prompt: "Give a one-word synonym of 'adversity'.", answer: "Misfortune" },
      ],
      traps: [
        {
          title: "Apogee and nadir",
          body: "Apogee is the highest point; nadir is the lowest. SSC put nadir among the options for apogee, so the pair is a ready-made trap.",
        },
        {
          title: "Mortal can mean deadly",
          body: "Mortal is not only 'a human who will die'. In 'a mortal wound' it means causing death, which is why SSC keyed it as lethal.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevosy-feelings",
      name: "Feelings, speech and praise",
      intuition:
        "These words describe how people feel and how they talk. Sort the word by direction first: praise or blame, clear or unclear, interested or bored. The keyed option almost always lies in the same direction, and the antonym in the options lies in the other.",
      definition:
        "The groups:\n" +
        "- **Praise:** extol and glorify (praise), eulogy (a tribute), celebrate (rejoice).\n" +
        "- **Blame:** upbraid (reprimand), condemn (criticise), invective (a tirade of abuse), derogatory (insulting), cavil (quibble over small faults).\n" +
        "- **Talking:** verbose and garrulous (talkative), eloquent (articulate), jargon (the special words of a trade), innuendo (an insinuation).\n" +
        "- **Clear and unclear:** equivocal (ambiguous), nebulous (vague), obfuscation (confusion), cogent (convincing), trenchant (incisive).\n" +
        "- **Feelings:** apathy (indifference), mesmerised (fascinated), rapturous (ecstatic), vexed (annoyed), mawkish (too sentimental), tedious (tiresome).\n" +
        "- **Asking and agreeing:** beseech (implore), acquiesce (concur), consent (assent).",
      table: {
        columns: ["Word", "Meaning", "Keyed synonym", "Asked in"],
        rows: [
          { cells: ["Verbose", "Using more words than needed", "Talkative", "2023"] },
          { cells: ["Extol", "Praise highly", "Praise", "2023"] },
          { cells: ["Glorify", "Praise and honour", "Praise", "2023"] },
          { cells: ["Apathy", "Lack of interest or feeling", "Indifference", "2023"] },
          { cells: ["Consent", "Agreement or permission", "Assent", "2023"] },
          { cells: ["Tedious", "Long, slow and dull", "Tiresome", "2023"] },
          { cells: ["Equivocal", "Open to more than one meaning", "Ambiguous", "2024"] },
          { cells: ["Beseech", "Ask urgently", "Implore", "2024"] },
          { cells: ["Acquiesce", "Accept without protest", "Concur", "2024"] },
          { cells: ["Innuendo", "An indirect, unkind hint", "Insinuation", "2024"] },
          { cells: ["Garrulous", "Talking too much about small things", "Talkative", "2025"] },
          { cells: ["Eulogy", "A speech praising someone, often after death", "Tribute", "2025"] },
          { cells: ["Upbraid", "Scold", "Reprimand", "2025"] },
          { cells: ["Invective", "Abusive, angry language", "Tirade", "2025"] },
          { cells: ["Nebulous", "Hazy, not clearly defined", "Vague", "2025"] },
          { cells: ["Cogent", "Clear and convincing", "Convincing", "2025"] },
        ],
      },
      pyqExampleId: "66de59bc-e98c-4647-8131-9c57e378bb82",
      selfCheckExample: {
        prompt: "Choose the synonym of 'upbraid'. (a) Scold (b) Admire (c) Ignore (d) Reward",
        steps: ["Upbraid is a blame word: to scold or find fault.", "Admire and reward point the other way; ignore is neither."],
        answer: "(a) Scold",
      },
      practiceSet: [
        { prompt: "Give a one-word synonym of 'apathy'.", answer: "Indifference" },
        { prompt: "Give a one-word synonym of 'equivocal'.", answer: "Ambiguous" },
        { prompt: "Give a one-word synonym of 'beseech'.", answer: "Implore" },
        { prompt: "Is a eulogy praise or criticism?", answer: "Praise: a speech or writing in tribute to someone" },
      ],
      traps: [
        {
          title: "Apathy and empathy",
          body: "Apathy is a lack of feeling or interest; empathy is sharing another person's feelings. SSC put empathy among the options for apathy.",
        },
        {
          title: "Assent and dissent",
          body: "Consent and assent both mean agreement; dissent means disagreement. The options for consent carried both, so read the prefix.",
        },
      ],
    },
  ],
};
