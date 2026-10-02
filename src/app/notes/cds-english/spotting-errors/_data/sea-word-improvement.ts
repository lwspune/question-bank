import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A word-improvement item: one underlined word and four replacements, no 'No improvement'. */
const wi = (before: string, under: string, after: string, a: string, b: string, c: string, d: string): string =>
  `Choose the word that improves the underlined word. ${before}${u(under)}${after} (a) ${a} (b) ${b} (c) ${c} (d) ${d}`;

export const CDSEN_SEA_WORD_IMPROVEMENT_NOTE: SubtopicNote = {
  subtopicName: "Word Improvement in Context",
  title: "Word improvement: the right word for the sentence",
  oneLineDefinition:
    "One underlined word is always wrong, and four words are offered in its place: find the right one from the look of the word, the tone of the sentence, and the exact sense it needs.",
  whyItMatters:
    "This format appeared in both 2025 papers. It is a vocabulary test placed inside a sentence, and the options are hard words that share letters, so guessing by sound fails. " +
    "Three clues solve almost every item: a look-alike of the printed word, the positive or negative tone of the sentence, and the exact term a process or idea demands. The lists below cover the words the paper used.",
  concepts: [
    // C1 — the method: look-alike, charge, exact sense
    {
      kind: "formula" as const,
      slug: "cdsensea-wi-method",
      name: "Reading the clue: look-alike, charge and exact sense",
      intuition:
        "In this format the underlined word is always wrong: there is no 'No improvement' option. So the question is never 'is it right?' but 'what was meant?'. " +
        "Often the printed word is a near-twin of the right one, swapped by sound or spelling. Find the twin that fits the sentence.",
      definition:
        "**Three clues, in this order:**\n" +
        "- **Look-alike:** say the printed word, then look for an option that sounds almost the same but fits the sense (intimated → intimidated).\n" +
        "- **Charge:** every word has a **charge**, a positive or negative tone. Read the tone of the sentence (a bonus → joy; bad behaviour → blame) and reject options with the wrong charge.\n" +
        "- **Exact sense:** when the sentence names a process, a document or a political idea, it wants the one exact term for it.\n" +
        "**The look-alike pairs tested in 2025:**\n" +
        "- intimated (hinted) → **intimidated** (frightened)\n" +
        "- perquisite (a perk of a job) → **perspicacity** (sharp insight)\n" +
        "- scrumptious (delicious, of food) → **sumptuous** (rich, splendid)\n" +
        "- lyre (a harp-like instrument) → **lure** (an attraction)\n" +
        "- enormity (great wickedness) → **enormousness** (great size)\n" +
        "- indefinite (not clear or fixed) → **indifferent** (showing no interest)\n" +
        "- diligent (hard-working) → **indigent** (very poor)\n" +
        "**Decoys from those items, with their meanings:** inculcated (taught by repetition), asphyxiated (choked), annulled (cancelled), perniciousness (harmfulness), peremptoriness (curt bossiness), presumptuousness (over-boldness), synergistic (working together for a bigger effect), stentorian (very loud), scrimpy (stingy), imperious (arrogantly bossy), imperilled (put in danger), disinvested (withdrew money), intransigent (refusing to change), indignant (angry at unfairness), apathetic (not caring), eternity (endless time), extremity (the furthest point), simulacrum (an imitation).",
      authoredExample: {
        prompt: wi("The weather office warned that a cyclone was ", "eminent", " and asked fishermen to stay ashore.", "prominent", "imminent", "immense", "impudent"),
        steps: [
          "The underlined word is wrong by the rules of this format. What was meant? The cyclone is about to arrive.",
          "Look-alike clue: 'eminent' (famous, respected) has a near-twin, 'imminent' (about to happen).",
          "Check the others: 'prominent' (easily seen), 'immense' (huge) and 'impudent' (rude) do not fit a warning.",
          "'Imminent' fits the sense and the look.",
        ],
        answer: "(b) imminent.",
      },
      selfCheckExample: {
        prompt: wi("The villagers gave the rescue team a ", "frosty", " welcome and garlanded every member.", "rapturous", "frigid", "grudging", "tepid"),
        steps: [
          "Charge clue: garlanding every member is a warm, happy act, so the sentence needs a positive word.",
          "'Frigid', 'grudging' and 'tepid' are all cold or half-hearted: wrong charge.",
          "'Rapturous' (full of great joy) has the right charge.",
        ],
        answer: "(a) rapturous.",
      },
      practiceSet: [
        { prompt: "Which word fits: 'The palace rooms were ___, hung with silk and gold.' (scrumptious / sumptuous)", answer: "sumptuous", method: "sumptuous = rich, splendid; scrumptious = delicious (food only)" },
        { prompt: "Which word fits: 'The minister was ___ and refused to change his stand.' (intransigent / indigent)", answer: "intransigent", method: "intransigent = refusing to change; indigent = very poor" },
        { prompt: "Which word fits: 'The ___ of the crime shocked the nation.' (enormity / enormousness)", answer: "enormity", method: "enormity = great wickedness" },
        { prompt: "Which word fits: 'The news of a new vaccine was greeted with ___.' (jubilation / trepidation)", answer: "jubilation", method: "good news: positive charge" },
      ],
      pyqExampleId: "85f02f53-6e6e-4829-94db-87fb5da15b9b",
      traps: [
        {
          title: "There is no 'No improvement'",
          body: "The underlined word is always wrong in this format. Do not look for the option closest in meaning to it. Look for the option that says what the sentence means.",
        },
        {
          title: "Shared letters are the decoy",
          body: "Options such as perniciousness, peremptoriness and presumptuousness all start like 'perquisite'. They are there to catch a guess by sound. Check the meaning of each option against the sentence.",
        },
        {
          title: "Enormity does not mean great size",
          body: "In careful English, **enormity** means great wickedness (the enormity of the crime). For great size, use **enormousness** or **immensity**.",
        },
        {
          title: "Read the charge of the whole sentence",
          body: "Words like 'much to their disappointment', 'inappropriate' or 'met with great joy' set the tone. Decide the charge from them before you read the options.",
        },
      ],
    },

    // C2 — words for feeling, attitude and manner
    {
      kind: "reference" as const,
      slug: "cdsensea-wi-feeling",
      name: "Words for feeling, attitude and manner",
      intuition:
        "These items describe how someone feels or behaves. The printed word has the wrong feeling: joyful where the sentence is calm, thoughtful where it is careless. " +
        "Name the feeling the sentence describes, then find the option that names it exactly.",
      definition:
        "How to use the table:\n" +
        "- The **printed word** column shows the wrong word and its meaning.\n" +
        "- The **right word** is the one the sentence needed.\n" +
        "- The **decoys** are the other options, with their meanings, so you know them when they return.\n" +
        "- Watch suffixes that add a judgement: **paternal** (fatherly) is neutral, **paternalistic** (controlling people 'for their own good') is critical.",
      table: {
        columns: ["Printed word", "Right word", "Meaning", "Decoys", "Sitting"],
        rows: [
          { cells: ["tumult (noisy disorder)", "merriment", "cheerful fun and laughter", "trepidation (fear), upheaval (violent change), uproar (loud protest)", "2025 (I)"], pyqExampleId: "d416118d-59ac-4c37-a92c-5e1ab3a4646e" },
          { cells: ["antipathy (strong dislike)", "animus", "strong hostility, ill will", "sympathy, empathy (sharing feelings), indifference (no interest)", "2025 (II)"] },
          { cells: ["impassioned (full of emotion)", "dispassionate", "calm, not moved by strong feeling", "perfunctory (careless), devolved (handed down), disambiguated (made clear)", "2025 (II)"], pyqExampleId: "3c5e917b-49e7-42aa-84b3-b2c70378848b" },
          { cells: ["paternal (fatherly)", "paternalistic", "controlling people 'for their own good'", "prim (stiffly proper), petulant (sulky), presumptuous (over-bold)", "2025 (II)"], pyqExampleId: "6eceb8ff-4da9-4c06-b203-820399a13014" },
          { cells: ["reflective (thoughtful)", "perfunctory", "done quickly, without care or interest", "precise, engaging (charming), egregious (shockingly bad)", "2025 (II)"], pyqExampleId: "36e3e242-56a0-4b7d-90fd-70e58d306821" },
        ],
      },
      pyqExampleId: "3c5e917b-49e7-42aa-84b3-b2c70378848b",
      selfCheckExample: {
        prompt: wi("On hearing that she had topped the exam, she was ", "morose", " all evening.", "elated", "sullen", "pensive", "listless"),
        steps: [
          "Topping an exam brings joy, so the sentence needs a happy word.",
          "'Morose' and 'sullen' mean gloomy; 'pensive' means deep in thought; 'listless' means without energy.",
          "'Elated' means very happy.",
        ],
        answer: "(a) elated.",
      },
      practiceSet: [
        { prompt: "What does 'perfunctory' mean?", answer: "Done quickly, without care or interest." },
        { prompt: "Spot the wrong row: 'egregious = outstandingly good'.", answer: "Wrong. Egregious = shockingly bad." },
        { prompt: "Which word fits: 'The new boss is ___: he decides everything for his staff, saying it is for their good.' (paternal / paternalistic)", answer: "paternalistic" },
        { prompt: "Which has a negative charge: merriment or trepidation?", answer: "Trepidation (fear)." },
      ],
      traps: [
        {
          title: "-istic adds a judgement",
          body: "**Paternal** care is simply fatherly. **Paternalistic** behaviour controls people and takes away their choice. When the sentence says 'not allowing them to decide', it wants the critical word.",
        },
        {
          title: "Tumult is noise and disorder, not joy",
          body: "A tumult is a loud, confused commotion. Happy excitement after good news is **merriment** or **jubilation**.",
        },
        {
          title: "'No more than a glance' signals carelessness",
          body: "Phrases like 'no more than', 'barely' and 'much to their disappointment' tell you the action was careless or too little. 'Reflective' (thoughtful) is the opposite charge; **perfunctory** fits.",
        },
      ],
    },

    // C3 — praise, blame and justification
    {
      kind: "reference" as const,
      slug: "cdsensea-wi-praise-blame",
      name: "Words for praise, blame and justification",
      intuition:
        "These items turn on one question: is the sentence praising, blaming, or judging whether something was justified? The printed word has the opposite charge. " +
        "Often three options share one charge and only one has the other, which makes the answer easy to spot once you know the words.",
      definition:
        "What to know:\n" +
        "- **Praise words:** laudatory, plaudits, acclaim, eulogistic.\n" +
        "- **Blame words:** opprobrium, scurrilous, reviling, scathing, upbraiding.\n" +
        "- **Justification words:** **salutary** (having a good effect) and **gratuitous** (done without good reason, uncalled for) look unrelated but are tested as a pair.\n" +
        "- Read what caused the reaction: joy from the leadership means praise; inappropriate behaviour means blame.",
      table: {
        columns: ["Printed word", "Right word", "Meaning", "Decoys", "Sitting"],
        rows: [
          { cells: ["scurrilous (abusive, insulting)", "laudatory", "full of praise", "reviling, scathing, upbraiding (all words of blame)", "2025 (I)"], pyqExampleId: "aac13a36-7c6e-4e20-ad2d-5c4127ee5480" },
          { cells: ["plaudits (praise)", "opprobrium", "harsh public criticism, disgrace", "sanctimoniousness (smug moral superiority), triumph, banter (playful teasing)", "2025 (I)"], pyqExampleId: "253cecba-3379-4a31-b159-3e79fe6eee1a" },
          { cells: ["salutary (having a good effect)", "gratuitous", "done without good reason, uncalled for", "ingratiated (won favour by flattery), grating (irritating), gargantuan (huge)", "2025 (II)"], pyqExampleId: "3ceec146-ad78-4ee8-bbef-6a4fbb46ced1" },
        ],
      },
      pyqExampleId: "253cecba-3379-4a31-b159-3e79fe6eee1a",
      selfCheckExample: {
        prompt: wi("The critics' ", "glowing", " reviews forced the director to withdraw the film from cinemas.", "scathing", "fulsome", "eulogistic", "adulatory"),
        steps: [
          "Reviews that force a film out of cinemas are harsh: the sentence needs a blame word.",
          "'Fulsome', 'eulogistic' and 'adulatory' are all words of praise: wrong charge.",
          "'Scathing' (severely critical) is the only blame word.",
        ],
        answer: "(a) scathing.",
      },
      practiceSet: [
        { prompt: "Praise or blame: 'laudatory'?", answer: "Praise." },
        { prompt: "What does 'gratuitous' mean?", answer: "Done without good reason; uncalled for (gratuitous violence)." },
        { prompt: "What does 'salutary' mean?", answer: "Having a good effect; beneficial (a salutary lesson)." },
        { prompt: "Spot the wrong row: 'upbraiding = praising'.", answer: "Wrong. Upbraiding = scolding." },
      ],
      traps: [
        {
          title: "Three options with the same charge",
          body: "When three options are all blame words and one is praise, and the sentence needs praise, the odd one out is the answer. Sort the options by charge first.",
        },
        {
          title: "Salutary is not about saluting, gratuitous is not grateful",
          body: "**Salutary** = good for you (a salutary warning). **Gratuitous** = without reason, uncalled for. Neither has anything to do with salutes or gratitude.",
        },
        {
          title: "Fulsome praise is too much praise",
          body: "**Fulsome** sounds like 'full', but in careful use it means excessive and insincere. It still counts as a praise word when sorting options by charge.",
        },
      ],
    },

    // C4 — exact terms
    {
      kind: "reference" as const,
      slug: "cdsensea-wi-terms",
      name: "Exact terms for procedures, politics and documents",
      intuition:
        "Some sentences name a thing that has one exact word: the training for new recruits is an **induction**, support from two rival parties is **bipartisan**, copying without credit is **plagiarism**. " +
        "The printed word is close in meaning but not the term. Find the term.",
      definition:
        "What to check:\n" +
        "- Ask what the sentence is naming: a process, a political stance, a kind of document, an offence.\n" +
        "- Recall the exact term for it. Prefixes help: **bi-** = two, **-partisan** = of a party; **palim-** = again, **-psest** = scraped.\n" +
        "- A word that is not English at all (simulism) is always wrong.\n" +
        "- For an amount cut by a fixed share, **reduce**; **minimise** means bring down to the smallest possible.",
      table: {
        columns: ["Printed word", "Right word", "Meaning", "Decoys", "Sitting"],
        rows: [
          { cells: ["instruction (teaching)", "induction", "formal introduction and training for new members", "immersion (deep involvement), intimation (notice, hint), unction (anointing with oil)", "2025 (I)"], pyqExampleId: "d8cb8332-23b6-4327-8d34-6c6652ee6e07" },
          { cells: ["minimise (bring to the smallest)", "reduce", "make smaller by some amount", "supervise, surmise (guess), lower", "2025 (I)"] },
          { cells: ["bilateral (between two countries)", "bipartisan", "supported by two opposing parties", "impartial (fair), intermittent (stopping and starting), perilous (dangerous)", "2025 (II)"], pyqExampleId: "6f70bc8b-28a5-45d6-a11b-e9d8fd835f4d" },
          { cells: ["postscript (a note added at the end of a letter)", "palimpsest", "a manuscript whose earlier writing was erased and written over", "parchment (writing material made of skin), pastiche (an imitation of a style), montage (a combined set of images)", "2025 (II)"], pyqExampleId: "c6e72b02-36fb-4772-a98f-f95e0dd35c83" },
          { cells: ["simulism (not an English word)", "plagiarism", "copying another's work without credit", "sensationalism, institutionalism, spoonerism (swapping the first sounds of two words)", "2025 (II)"], pyqExampleId: "787a23a9-10e8-4ac7-9472-08145704ca2d" },
        ],
      },
      pyqExampleId: "c6e72b02-36fb-4772-a98f-f95e0dd35c83",
      selfCheckExample: {
        prompt: wi("After the scandal the minister was asked to ", "abdicate", ", and he gave up his post the next day.", "resign", "retire", "recuse", "relent"),
        steps: [
          "The sentence names giving up an office: the minister left his post.",
          "**Abdicate** is the term for a king or queen giving up the throne. A minister **resigns**.",
          "'Retire' is leaving work at the end of a career; 'recuse' is stepping away from one case; 'relent' is giving in.",
        ],
        answer: "(a) resign.",
      },
      practiceSet: [
        { prompt: "Bilateral or bipartisan: 'a ___ trade agreement between India and Japan'?", answer: "bilateral", method: "two countries" },
        { prompt: "What is an 'induction' programme?", answer: "A formal introduction and training for new members of an organisation." },
        { prompt: "Copying another writer's work without giving credit is called ___.", answer: "plagiarism" },
        { prompt: "What is a 'spoonerism'?", answer: "Swapping the first sounds of two words, as in 'a well-boiled icicle' for 'a well-oiled bicycle'." },
      ],
      traps: [
        {
          title: "Bilateral is between countries",
          body: "**Bilateral** talks are between two countries. **Bipartisan** support comes from two rival political parties inside one country.",
        },
        {
          title: "Minimise is not 'cut a bit'",
          body: "To **minimise** is to bring something down to the smallest amount possible. A cut of a fixed share, such as twenty per cent, is a reduction: **reduce**.",
        },
        {
          title: "Teaching is not induction",
          body: "**Instruction** is any teaching. **Induction** is the named process by which new recruits are brought into a service. When the sentence names the stage before joining, it wants the term.",
        },
      ],
    },
  ],
};
