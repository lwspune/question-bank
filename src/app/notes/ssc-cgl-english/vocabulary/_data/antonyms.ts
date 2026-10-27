import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EVO_ANTONYMS_NOTE: SubtopicNote = {
  subtopicName: "Antonyms",
  title: "Antonyms",
  oneLineDefinition:
    "Choosing the word opposite in meaning to a given word, learnt in pairs: people and character, speech and praise, size and worth, change and action, and feelings.",
  whyItMatters:
    "Two hundred and sixty questions in the bank, 112 from the 2023 shifts, 102 from the 2024 shifts and 46 from the 2025 shifts, and 197 of them EASY. Six words SSC asked for a synonym came back asking for the opposite (perfidious, munificent, obdurate, frugal, spurious and brittle), so learn each word with its partner and its opposite together.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscevoan-people",
      name: "People and character",
      intuition:
        "Nearly every antonym question in the 2025 shifts gives three options that mean roughly the same as the word and one that means the opposite. Spot the three that agree with each other and the odd one out is usually the answer, even when the word itself is hard.",
      definition:
        "The pairs:\n" +
        "- **Wise and foolish:** sagacious and astute (foolish, stupid), erudite (uninformed), obtuse (astute).\n" +
        "- **Honest and lying:** candid (dishonest), mendacious (truthful), perfidious (loyal), patriot (traitor), subterfuge (candour).\n" +
        "- **Careful and careless:** meticulous and selective (careless).\n" +
        "- **Brave and timid:** timid (daring), pusillanimous (brave), coy (extroverted).\n" +
        "- **Generous and greedy:** munificent (stingy), avariciousness (generosity), frugal (extravagant).\n" +
        "- **Humble and proud:** modest (conceited), servile and obsequious (arrogant, assertive), ostentatious (restrained).\n" +
        "- **Good and wicked:** wicked (virtuous), nefarious (pious), turpitude (morality), barbarity (compassion).\n" +
        "- **Skill and experience:** amateur (expert), veteran (novice), incompetent (dexterous).",
      table: {
        columns: ["Word", "Meaning", "Keyed antonym", "Asked in"],
        rows: [
          { cells: ["Meticulous", "Very careful about detail", "Careless", "2023 (twice)"] },
          { cells: ["Veteran", "Someone with long experience", "Novice", "2023"] },
          { cells: ["Amateur", "A non-professional, a beginner", "Expert", "2023"] },
          { cells: ["Modest", "Humble, not boastful", "Conceited", "2023"] },
          { cells: ["Gullible", "Easily fooled", "Cynical", "2023"] },
          { cells: ["Frugal", "Sparing with money", "Extravagant", "2023"] },
          { cells: ["Candid", "Frank and honest", "Dishonest", "2024"] },
          { cells: ["Timid", "Lacking courage", "Daring", "2024"] },
          { cells: ["Ostentatious", "Showy, meant to impress", "Restrained", "2024"] },
          { cells: ["Dogmatic", "Insisting one's views are right", "Liberal", "2024"] },
          { cells: ["Sagacious", "Wise and shrewd", "Foolish", "2025"] },
          { cells: ["Perfidious", "Treacherous", "Loyal", "2025"] },
          { cells: ["Pusillanimous", "Cowardly", "Brave", "2025"] },
          { cells: ["Mendacious", "Lying", "Truthful", "2025"] },
          { cells: ["Munificent", "Very generous", "Stingy", "2025"] },
          { cells: ["Obsequious", "Too eager to please", "Assertive", "2025"] },
        ],
      },
      pyqExampleId: "49638edf-5090-4d21-bdbc-02e4d74ff033",
      selfCheckExample: {
        prompt: "Choose the antonym of 'timid'. (a) Shy (b) Daring (c) Nervous (d) Quiet",
        steps: ["Shy, nervous and quiet all lie close to timid: they agree with each other.", "The odd one out, daring, is the opposite."],
        answer: "(b) Daring",
      },
      practiceSet: [
        { prompt: "Give the antonym of 'veteran'.", answer: "Novice" },
        { prompt: "Give the antonym of 'meticulous'.", answer: "Careless" },
        { prompt: "Give the antonym of 'mendacious'.", answer: "Truthful" },
        { prompt: "Give the antonym of 'frugal'.", answer: "Extravagant" },
      ],
      traps: [
        {
          title: "Disinterested and uninterested",
          body: "SSC keyed disinterested as the opposite of inquisitive, using it to mean not interested. In careful English disinterested means impartial and uninterested means not interested, so expect the looser use in SSC papers.",
        },
        {
          title: "Astute and obtuse",
          body: "Astute means sharp and clever; obtuse means slow to understand. They are each other's antonyms, and SSC asked both.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoan-speech",
      name: "Speech, praise and blame",
      intuition:
        "Words about speaking split along a few lines: praise or blame, agree or object, clear or hidden, loud or quiet. Put the word on its line, then look for the option at the other end of the same line, not one from a different line.",
      definition:
        "The pairs:\n" +
        "- **Praise and blame:** praised (rebuked), chided (applauded), encomium (castigation), derision (admiration), opprobrium (honour), fulsome (sincere).\n" +
        "- **Agree and object:** object and demur (assent, agree), concede (deny), affirmative (negative), accepted (rejected), refuse (permit), oppugn (defend), vouch (invalidate).\n" +
        "- **Talk into and talk out of:** persuade (dissuade).\n" +
        "- **Clear and hidden:** lucid (ambiguous), evident (hidden), intelligible (incoherent), esoteric (straightforward), clandestine (known), dissemble (reveal).\n" +
        "- **Loud and quiet:** yell (whisper), vociferous (silent), babble (quiet), cacophony (harmony), bombastic (simple).",
      table: {
        columns: ["Word", "Meaning", "Keyed antonym", "Asked in"],
        rows: [
          { cells: ["Absurd", "Wildly unreasonable", "Sensible, realistic", "2023 (twice)"] },
          { cells: ["Persuade", "Talk someone into doing something", "Dissuade", "2023"] },
          { cells: ["Chide", "Scold", "Applaud", "2023"] },
          { cells: ["Lucid", "Clear and easy to understand", "Ambiguous", "2023"] },
          { cells: ["Clandestine", "Kept secret", "Known", "2023"] },
          { cells: ["Yell", "Shout loudly", "Whisper", "2023"] },
          { cells: ["Concede", "Admit that something is true", "Deny", "2024"] },
          { cells: ["Bombastic", "High-sounding and inflated", "Simple", "2024"] },
          { cells: ["Vouch", "Confirm that something is true", "Invalidate", "2024"] },
          { cells: ["Vociferous", "Loud and forceful", "Silent", "2025"] },
          { cells: ["Demur", "Raise an objection", "Agree", "2025"] },
          { cells: ["Encomium", "A speech of high praise", "Castigation", "2025"] },
          { cells: ["Esoteric", "Understood by only a few", "Straightforward", "2025"] },
          { cells: ["Opprobrium", "Harsh public criticism", "Honour", "2025"] },
          { cells: ["Dissemble", "Hide one's real feelings", "Reveal", "2025"] },
          { cells: ["Cacophony", "A harsh mix of sounds", "Harmony", "2025"] },
        ],
      },
      pyqExampleId: "89488e3f-b3e3-4eee-ac0a-b022aec7ac8b",
      selfCheckExample: {
        prompt: "Choose the antonym of 'intelligible'. (a) Clear (b) Incoherent (c) Sensible (d) Readable",
        steps: ["Intelligible is on the clear-or-hidden line: able to be understood.", "Clear, sensible and readable sit at the same end; incoherent is the other end."],
        answer: "(b) Incoherent",
      },
      practiceSet: [
        { prompt: "Give the antonym of 'yell'.", answer: "Whisper" },
        { prompt: "Give the antonym of 'persuade'.", answer: "Dissuade" },
        { prompt: "Give the antonym of 'concede'.", answer: "Deny" },
        { prompt: "Give the antonym of 'cacophony'.", answer: "Harmony" },
      ],
      traps: [
        {
          title: "Fulsome praise is not generous praise",
          body: "Fulsome means excessive and insincere, so SSC keyed sincere as its opposite. Overdone, excessive and lavish were the three options that agree with it.",
        },
        {
          title: "Demur means object",
          body: "To demur is to raise an objection, so its antonym is agree. In 2023 demur also appeared as a wrong option beside praise when the word was complaint: it is close to complaint, not opposite.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoan-worth",
      name: "Size, worth and law",
      intuition:
        "Many of these words come with a prefix that already flips the meaning: in- and im- (innocuous, impecunious), ab- (abolish, absolve, abrogate). Read the prefix, but check the root as well: an in- word is not always the 'not' of something you know.",
      definition:
        "The pairs:\n" +
        "- **Important and trivial:** trivial, nominal and nugatory (significant), superficial (profound), laudable (deplorable), stunning (mundane).\n" +
        "- **More and less:** profuse (scarce), deficient (ample), curtail (increase), grow (shrink), large (tiny), entire (incomplete).\n" +
        "- **Rich and poor:** impecunious (wealthy), prosperity (failure), plight (advantage).\n" +
        "- **Allowed and forbidden:** prohibition (permission), forbid (allow), taboo (acceptable), compulsory (voluntary), access (denial).\n" +
        "- **Law and blame:** acquitted (convicted), absolve and vindicate (accuse), abolish (establish), abrogate (uphold), delegate (retain).\n" +
        "- **Strong, weak and harmful:** puissant (feeble), brittle (resilient), pernicious (innocuous).\n" +
        "- **Bright and dull:** refulgent (dull), incandescent (dusky).",
      table: {
        columns: ["Word", "Meaning", "Keyed antonym", "Asked in"],
        rows: [
          { cells: ["Trivial", "Of little importance", "Significant", "2023 (twice)"] },
          { cells: ["Acquitted", "Declared not guilty", "Convicted", "2023"] },
          { cells: ["Compulsory", "Required by rule", "Voluntary", "2023"] },
          { cells: ["Prohibition", "Forbidding something", "Permission", "2023"] },
          { cells: ["Superficial", "On the surface, shallow", "Profound", "2023"] },
          { cells: ["Spurious", "False, fake", "Authentic", "2023"] },
          { cells: ["Profuse", "Plentiful", "Scarce", "2024"] },
          { cells: ["Absolve", "Declare free from blame", "Accuse", "2024"] },
          { cells: ["Taboo", "Forbidden by custom", "Acceptable", "2024"] },
          { cells: ["Brittle", "Hard but easily broken", "Resilient", "2024"] },
          { cells: ["Laudable", "Deserving praise", "Deplorable", "2024"] },
          { cells: ["Abrogate", "Repeal, do away with", "Uphold", "2025"] },
          { cells: ["Vindicate", "Clear someone of blame", "Accuse", "2025"] },
          { cells: ["Impecunious", "Having little money", "Wealthy", "2025"] },
          { cells: ["Nugatory", "Of no value", "Significant", "2025"] },
          { cells: ["Pernicious", "Harmful in a slow, hidden way", "Innocuous", "2025"] },
        ],
      },
      pyqExampleId: "69986279-7c08-45ae-90f1-16b69b5c7813",
      selfCheckExample: {
        prompt: "Choose the antonym of 'abolish'. (a) End (b) Establish (c) Cancel (d) Destroy",
        steps: ["To abolish is to put an end to something formally.", "End, cancel and destroy agree with it; establish is the opposite."],
        answer: "(b) Establish",
      },
      practiceSet: [
        { prompt: "Give the antonym of 'compulsory'.", answer: "Voluntary" },
        { prompt: "Give the antonym of 'acquitted'.", answer: "Convicted" },
        { prompt: "Give the antonym of 'profuse'.", answer: "Scarce" },
        { prompt: "Give the antonym of 'impecunious'.", answer: "Wealthy" },
      ],
      traps: [
        {
          title: "Epitome can mean a summary",
          body: "Besides 'a perfect example', epitome also means a short summary. SSC used that sense and keyed expansion as its opposite.",
        },
        {
          title: "Nominal means very small here",
          body: "A nominal fee is a tiny one, so SSC keyed significant as the opposite of nominal. Do not read it only as 'in name only'.",
        },
        {
          title: "Pernicious and innocuous",
          body: "Pernicious means harmful; innocuous means harmless. The other three options (harmful, virulent, noxious) all agreed with pernicious.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoan-change",
      name: "Time, change and action",
      intuition:
        "These words describe how long something lasts, whether it grows or fades, and whether an action helps or blocks. Each has a clean opposite on the same scale: lasting and passing, growing and fading, helping and hindering. Name the scale, then go to its other end.",
      definition:
        "The pairs:\n" +
        "- **Lasting and passing:** transient and transitory (permanent, eternal), incessant (sporadic, intermittent), seldom (frequently).\n" +
        "- **Growing and fading:** bloom (wither, fade), wax (wane), abate (increase), incipient (advanced).\n" +
        "- **Helping and blocking:** hinder (aid, facilitate), jeopardise (safeguard), foment (regulate).\n" +
        "- **Hiding and showing:** conceal and camouflage (reveal).\n" +
        "- **Order and wandering:** randomly (systematically), meander (direct), divergence (convergence), scattered (gathered).\n" +
        "- **Breaking and building:** pulverize (restore), extirpate (establish), catastrophe (success).",
      table: {
        columns: ["Word", "Meaning", "Keyed antonym", "Asked in"],
        rows: [
          { cells: ["Hinder", "Hold back, obstruct", "Aid, facilitate", "2023, 2024"] },
          { cells: ["Incessant", "Continuing without a pause", "Sporadic, intermittent", "2023, 2025"] },
          { cells: ["Wax", "Grow, increase", "Wane", "2023"] },
          { cells: ["Seldom", "Rarely", "Frequently", "2023"] },
          { cells: ["Transient", "Lasting a short time", "Permanent", "2023"] },
          { cells: ["Divergence", "Moving apart", "Convergence", "2023"] },
          { cells: ["Conceal", "Hide", "Reveal", "2023"] },
          { cells: ["Abate", "Lessen", "Increase", "2023"] },
          { cells: ["Jeopardise", "Put in danger", "Safeguard", "2024"] },
          { cells: ["Meander", "Follow a winding course", "Direct", "2024"] },
          { cells: ["Foment", "Stir up trouble", "Regulate", "2024"] },
          { cells: ["Chronic", "Long-lasting (of an illness)", "Mild", "2024"] },
          { cells: ["Transitory", "Lasting a short time", "Eternal", "2025"] },
          { cells: ["Extirpate", "Root out, destroy completely", "Establish", "2025"] },
          { cells: ["Incipient", "Just beginning", "Advanced", "2025"] },
          { cells: ["Pulverize", "Crush into powder", "Restore", "2025"] },
        ],
      },
      pyqExampleId: "3907e809-bd4d-4920-900f-2ead852f1b9e",
      selfCheckExample: {
        prompt: "Choose the antonym of 'sporadic'. (a) Rare (b) Incessant (c) Occasional (d) Scattered",
        steps: ["Sporadic is on the lasting-and-passing scale: happening now and then.", "Rare, occasional and scattered agree with it; incessant (never stopping) is the other end."],
        answer: "(b) Incessant",
      },
      practiceSet: [
        { prompt: "Give the antonym of 'seldom'.", answer: "Frequently" },
        { prompt: "Give the antonym of 'wax' when it means to grow.", answer: "Wane" },
        { prompt: "Give the antonym of 'jeopardise'.", answer: "Safeguard" },
        { prompt: "Give the antonym of 'transient'.", answer: "Permanent" },
      ],
      traps: [
        {
          title: "Wax as a verb",
          body: "The moon waxes (grows) and wanes (shrinks). SSC put polish among the options for wax: that is the noun sense, not the one asked.",
        },
        {
          title: "Chronic is about time, not strength",
          body: "Chronic means long-lasting; its strict opposite is acute. Acute was not among the options, so SSC keyed mild. Read every option before deciding none fits.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoan-feelings",
      name: "Feelings and calm",
      intuition:
        "Feeling words sit on a few scales: happy or sad, calm or stirred up, lively or sleepy, respectful or scornful. Many hard words here have Latin roots that tell you the scale: lachry- is tears, sopor- is sleep, lugubr- is mourning.",
      definition:
        "The pairs:\n" +
        "- **Happy and sad:** jubilant, joyous, exultant and elated (melancholic, disconsolate, discouraged), lament (celebrate), lachrymose and lugubrious (jovial, joyous), miserable (cheerful), desolate (festive), dismal (lively).\n" +
        "- **Calm and stirred up:** allay, quell and placatory (aggravate, provoke), calm down (agitate), annoyance (serenity), feud (harmony).\n" +
        "- **Lively and sleepy:** lethargic (active), lassitude (vigour), soporific (stimulating), tedious (interesting).\n" +
        "- **Respect and scorn:** reverence (contempt), forgive (loathe).\n" +
        "- **Smell, taste and heat:** redolent (unscented), piquant (bland), hot (frigid).",
      table: {
        columns: ["Word", "Meaning", "Keyed antonym", "Asked in"],
        rows: [
          { cells: ["Jubilant", "Full of joy", "Melancholic", "2023"] },
          { cells: ["Exultant", "Triumphantly happy", "Disconsolate", "2023"] },
          { cells: ["Lament", "Mourn, express grief", "Celebrate", "2023"] },
          { cells: ["Tedious", "Dull and tiring", "Interesting", "2023"] },
          { cells: ["Allay", "Calm a fear or doubt", "Aggravate", "2024"] },
          { cells: ["Elated", "Very happy and excited", "Discouraged", "2024"] },
          { cells: ["Desolate", "Bleak and joyless", "Festive", "2024"] },
          { cells: ["Lethargic", "Sluggish, without energy", "Active", "2024"] },
          { cells: ["Risible", "Laughable", "Serious", "2024"] },
          { cells: ["Lachrymose", "Tearful", "Jovial", "2025"] },
          { cells: ["Lugubrious", "Mournful", "Joyous", "2025"] },
          { cells: ["Lassitude", "Tiredness, lack of energy", "Vigour", "2025"] },
          { cells: ["Soporific", "Causing sleep", "Stimulating", "2025"] },
          { cells: ["Reverence", "Deep respect", "Contempt", "2025"] },
          { cells: ["Redolent", "Strongly smelling of something", "Unscented", "2025"] },
          { cells: ["Quell", "Put down, calm", "Provoke", "2025"] },
        ],
      },
      pyqExampleId: "135e3536-f956-46fd-ad11-7a98bb03d10e",
      selfCheckExample: {
        prompt: "Choose the antonym of 'serenity'. (a) Calm (b) Peace (c) Agitation (d) Silence",
        steps: ["Serenity is on the calm-or-stirred scale, at the calm end.", "Calm, peace and silence agree with it; agitation is the other end."],
        answer: "(c) Agitation",
      },
      practiceSet: [
        { prompt: "Give the antonym of 'lethargic'.", answer: "Active" },
        { prompt: "Give the antonym of 'lament'.", answer: "Celebrate" },
        { prompt: "Give the antonym of 'soporific'.", answer: "Stimulating" },
        { prompt: "Give the antonym of 'reverence'.", answer: "Contempt" },
      ],
      traps: [
        {
          title: "Allay, mitigate and mollify",
          body: "To allay a fear is to calm it. Mitigate and mollify, which also appeared as options, mean much the same, so they cannot be its opposite; aggravate is.",
        },
        {
          title: "Risible is not risky",
          body: "Risible means so silly that it makes people laugh, so its antonym is serious. It has nothing to do with risk.",
        },
      ],
    },
  ],
};
