import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_EVO_ONEWORD_NOTE: SubtopicNote = {
  subtopicName: "One-Word Substitution",
  title: "One-Word Substitution",
  oneLineDefinition:
    "Replacing a phrase with the single word that means it: words for people, places and groups, studies and kinds of government, and qualities, acts and fears.",
  whyItMatters:
    "Two hundred and thirty-six questions in the bank, 83 from the 2023 shifts, 86 from the 2024 shifts and 67 from the 2025 shifts, and 200 of them EASY. Many words come back: pessimist was asked four times and invincible, fatalist and cannibal three times each, so a list learnt once keeps paying.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscevoow-people",
      name: "People by what they do or believe",
      intuition:
        "Most person-words are built from a root and an ending: -ist, -er, -ant or -ic names the person (atheist, cartographer, cynic), and the root tells you what they love, hate, believe or do. Learn the common roots and many words explain themselves.",
      definition:
        "The groups:\n" +
        "- **Belief:** atheist (believes no god exists), agnostic (unsure whether god exists), fatalist (believes in fate), apostate (abandons a religion).\n" +
        "- **Outlook:** pessimist (sees the worst), optimist (sees the best), cynic (doubts people's goodness), stoic (unmoved by pain or pleasure).\n" +
        "- **Love and hate:** philanthropist (loves mankind), misanthrope (hates mankind); phil- is love, mis- is hate, anthrop- is man.\n" +
        "- **Deceivers:** impostor (pretends to be someone else), charlatan (pretends to have skill), traitor (betrays the country).\n" +
        "- **Habits:** glutton (eats too much), teetotaller (never drinks alcohol), recluse (lives alone).",
      table: {
        columns: ["Word", "Meaning", "Asked in"],
        rows: [
          { cells: ["Pessimist", "One who sees the worst side of things", "2023, 2024 (twice), 2025"] },
          { cells: ["Fatalist", "One who believes in fate", "2023 (twice), 2025"] },
          { cells: ["Cannibal", "One who eats the flesh of his own kind", "2024 (twice), 2025"] },
          { cells: ["Impostor", "One who pretends to be someone else", "2023, 2024, 2025"] },
          { cells: ["Traitor", "One who betrays his country", "2023, 2024"] },
          { cells: ["Apostate", "One who abandons his religion", "2023, 2025"] },
          { cells: ["Cartographer", "One who draws maps", "2023, 2025"] },
          { cells: ["Atheist", "One who does not believe in god", "2023, 2024"] },
          { cells: ["Anarchist", "One who thinks laws and governments are not needed", "2023, 2025"] },
          { cells: ["Glutton", "One who eats too much", "2024, 2025"] },
          { cells: ["Stoic", "One unmoved by pain or pleasure", "2024, 2025"] },
          { cells: ["Cynic", "One who doubts other people's goodness", "2025 (twice)"] },
          { cells: ["Misanthrope", "One who hates and avoids people", "2023"] },
          { cells: ["Agnostic", "One unsure whether god exists", "2024"] },
        ],
      },
      pyqExampleId: "36a041cb-9592-4acf-8ec7-f57450f56be9",
      selfCheckExample: {
        prompt: "Choose the one word for 'a person who loves mankind'. (a) Misanthrope (b) Philanthropist (c) Misogynist (d) Anarchist",
        steps: ["Phil- means love and anthrop- means mankind.", "Mis- means hate, so misanthrope is the opposite."],
        answer: "(b) Philanthropist",
      },
      practiceSet: [
        { prompt: "One word for 'a person who does not drink alcohol'?", answer: "Teetotaller" },
        { prompt: "One word for 'a person who lives alone, away from others'?", answer: "Recluse" },
        { prompt: "One word for 'a person who pretends to have knowledge or skill'?", answer: "Charlatan" },
        { prompt: "What is the difference between an atheist and an agnostic?", answer: "An atheist believes no god exists; an agnostic is unsure." },
      ],
      traps: [
        {
          title: "Mixing up atheist and agnostic",
          body: "An atheist is sure there is no god; an agnostic says it cannot be known. SSC has asked both, with the other as a distractor.",
        },
        {
          title: "Choosing the quality instead of the person",
          body: "\"A person who argues about everything\" needs a person-word; an option such as contentious describes the habit. Check whether the phrase asks for the person or the quality.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoow-places",
      name: "Places and groups",
      intuition:
        "A place-word usually names what is kept or done there: birds in an aviary, aeroplanes in a hangar, grain in a granary, coins made in a mint. A group-word names who is gathered: a shoal of fish, a horde of people, a congregation of worshippers.",
      definition:
        "The groups:\n" +
        "- **Kept there:** aviary (birds), menagerie (wild animals), hangar (aeroplanes), granary (grain), mortuary (dead bodies, for a time), cemetery (graves).\n" +
        "- **Made or grown there:** mint (coins), orchard (fruit trees).\n" +
        "- **Groups:** shoal (fish), horde (a large moving crowd), congregation (worshippers), clique (a small group that keeps others out).",
      table: {
        columns: ["Word", "Meaning", "Asked in"],
        rows: [
          { cells: ["Aviary", "A place where birds are kept", "2023, 2024"] },
          { cells: ["Mint", "A place where coins are made", "2023, 2025"] },
          { cells: ["Hangar", "A place where aeroplanes are kept", "2023, 2024"] },
          { cells: ["Clique", "A small group that keeps others out", "2024 (twice)"] },
          { cells: ["Granary", "A place where grain is stored", "2023"] },
          { cells: ["Cemetery", "A burial ground", "2023"] },
          { cells: ["Shoal", "A large number of fish swimming together", "2023"] },
          { cells: ["Congregation", "A group of worshippers", "2023"] },
          { cells: ["Orchard", "A place where fruit trees are grown", "2024"] },
          { cells: ["Arena", "A flat area ringed by seats, for sport or shows", "2024"] },
          { cells: ["Menagerie", "A place where wild animals are kept", "2025"] },
          { cells: ["Mortuary", "A building where dead bodies are kept for a time", "2025"] },
          { cells: ["Horde", "A large group of people moving together", "2025"] },
        ],
      },
      pyqExampleId: "88d37e27-d5ed-4bfb-9bb2-4697b069adb3",
      selfCheckExample: {
        prompt: "Choose the one word for 'a place where fruit trees are grown'. (a) Nursery (b) Orchard (c) Granary (d) Aviary",
        steps: ["A granary stores grain and an aviary keeps birds.", "Fruit trees grow in an orchard."],
        answer: "(b) Orchard",
      },
      practiceSet: [
        { prompt: "One word for 'a place where aeroplanes are kept'?", answer: "Hangar" },
        { prompt: "One word for 'a place where wild animals are kept'?", answer: "Menagerie" },
        { prompt: "What is a shoal?", answer: "A large number of fish swimming together" },
        { prompt: "One word for 'a building where dead bodies are kept for a time'?", answer: "Mortuary" },
      ],
      traps: [
        {
          title: "Hangar and hanger",
          body: "A hangar keeps aeroplanes; a hanger holds clothes. The options often include both spellings.",
        },
        {
          title: "Aviary and apiary",
          body: "An aviary keeps birds; an apiary keeps bees. One letter separates them.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoow-studies",
      name: "Studies, governments, writing and speech",
      intuition:
        "Endings carry the meaning: -logy or -ics is a study (anthropology, numismatics), -cracy is a form of rule (plutocracy, theocracy), and words for writing and speech name where they stand or what they do (a preface opens a book, an epilogue ends a play, an extempore speech is unprepared).",
      definition:
        "The groups:\n" +
        "- **Studies:** anthropology (humans and their societies), archaeology (ancient remains), numismatics (coins), demography (populations), lexicography (writing dictionaries).\n" +
        "- **Rule by:** plutocracy (the rich), theocracy (priests in god's name), bureaucracy (officials), autocracy (one person), oligarchy (a powerful few), kleptocracy (rulers who steal).\n" +
        "- **Writing:** autobiography (one's own life, by oneself), preface or foreword (at the start of a book), epilogue (at the end of a play), affidavit (a statement on oath).\n" +
        "- **Speech:** extempore (without preparation), euphemism (a mild word for a harsh one), rhetoric (persuasive speaking), eulogy (praise of the dead).",
      table: {
        columns: ["Word", "Meaning", "Asked in"],
        rows: [
          { cells: ["Numismatics", "The study of coins", "2024, 2025"] },
          { cells: ["Anthropology", "The study of humans and their societies", "2023, 2025"] },
          { cells: ["Autobiography", "One's life story written by oneself", "2023, 2025"] },
          { cells: ["Euphemism", "A mild word used in place of a harsh one", "2025 (twice)"] },
          { cells: ["Plutocracy", "Government by the rich", "2023"] },
          { cells: ["Lexicography", "The writing of dictionaries", "2023"] },
          { cells: ["Epilogue", "A speech at the end of a play", "2023"] },
          { cells: ["Archaeology", "The study of ancient remains", "2024"] },
          { cells: ["Bureaucracy", "Government by officials", "2024"] },
          { cells: ["Demography", "The statistical study of populations", "2024"] },
          { cells: ["Affidavit", "A written statement made on oath", "2024"] },
          { cells: ["Theocracy", "Rule by priests in the name of god", "2025"] },
          { cells: ["Extempore", "A speech made without preparation", "2025"] },
          { cells: ["Rhetoric", "The art of persuasive speaking or writing", "2025"] },
        ],
      },
      pyqExampleId: "da0f4753-6a4d-42b3-a1f4-7f8e04bda457",
      selfCheckExample: {
        prompt: "Choose the one word for 'government by the rich'. (a) Theocracy (b) Bureaucracy (c) Plutocracy (d) Autocracy",
        steps: ["-cracy means rule; the root tells who rules.", "Pluto- is wealth, so plutocracy is rule by the rich."],
        answer: "(c) Plutocracy",
      },
      practiceSet: [
        { prompt: "One word for 'the study of ancient remains such as tools, graves and ruins'?", answer: "Archaeology" },
        { prompt: "One word for 'rule by priests in the name of god'?", answer: "Theocracy" },
        { prompt: "Where does a preface come: at the start or the end of a book?", answer: "At the start" },
        { prompt: "One word for 'a speech made without any preparation'?", answer: "Extempore" },
      ],
      traps: [
        {
          title: "Anthropology and archaeology",
          body: "Anthropology studies humans and their societies; archaeology studies what past people left behind. Both were asked.",
        },
        {
          title: "Biography and autobiography",
          body: "A biography is written by someone else; an autobiography by the person whose life it is.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscevoow-qualities",
      name: "Qualities, acts and fears",
      intuition:
        "Prefixes and endings do most of the work here: in- and il- mean not (invincible, illegible), -ible and -able mean can be (edible, portable), -phobia is a fear (claustrophobia), -cide is a killing (genocide), omni- is all (omnipotent).",
      definition:
        "The groups:\n" +
        "- **Can or cannot be:** edible (fit to eat), portable (easily carried), audible (can be heard), illegible (cannot be read), invincible (cannot be defeated), incorrigible (cannot be corrected), inevitable (cannot be avoided).\n" +
        "- **Fears:** claustrophobia (closed spaces), agoraphobia (open spaces), glossophobia (public speaking), ophidiophobia (snakes).\n" +
        "- **Acts:** genocide (killing a whole people), arson (setting fire to property on purpose), blasphemy (speaking disrespectfully of sacred things), plagiarism (passing off another's work as your own), procrastinate (keep putting off).\n" +
        "- **States and qualities:** omnipotent (all-powerful), ephemeral (short-lived), nostalgia (fond longing for the past), apathy (lack of interest).",
      table: {
        columns: ["Word", "Meaning", "Asked in"],
        rows: [
          { cells: ["Invincible", "Too strong to be defeated", "2023, 2024 (twice)"] },
          { cells: ["Genocide", "The killing of a whole people or nation", "2023 (twice)"] },
          { cells: ["Edible", "Fit to eat", "2023, 2024"] },
          { cells: ["Illegible", "Impossible to read", "2023, 2025"] },
          { cells: ["Blasphemy", "Speaking disrespectfully of sacred things", "2023, 2024"] },
          { cells: ["Claustrophobia", "Fear of closed spaces", "2024, 2025"] },
          { cells: ["Procrastinate", "Keep putting off what should be done", "2023"] },
          { cells: ["Inevitable", "Certain to happen", "2023"] },
          { cells: ["Omnipotent", "Having unlimited power", "2024"] },
          { cells: ["Incorrigible", "Cannot be corrected", "2024"] },
          { cells: ["Agoraphobia", "Fear of open spaces", "2025"] },
          { cells: ["Glossophobia", "Fear of public speaking", "2025"] },
          { cells: ["Arson", "Setting fire to property on purpose", "2025"] },
          { cells: ["Ephemeral", "Lasting a very short time", "2025"] },
        ],
      },
      pyqExampleId: "2ce54039-713d-4297-92b9-2f9c21d0718b",
      selfCheckExample: {
        prompt: "Choose the one word for 'fear of open spaces'. (a) Claustrophobia (b) Agoraphobia (c) Acrophobia (d) Hydrophobia",
        steps: ["Claustro- is closed spaces; agora- was the open market place.", "Fear of open spaces is agoraphobia."],
        answer: "(b) Agoraphobia",
      },
      practiceSet: [
        { prompt: "One word for 'fit to eat'?", answer: "Edible" },
        { prompt: "One word for 'impossible to read'?", answer: "Illegible" },
        { prompt: "One word for 'setting fire to property on purpose'?", answer: "Arson" },
        { prompt: "What does the prefix omni- mean, as in omnipotent?", answer: "All" },
      ],
      traps: [
        {
          title: "Claustrophobia and agoraphobia",
          body: "They are opposites: claustrophobia is the fear of closed spaces, agoraphobia the fear of open ones. SSC asked both.",
        },
        {
          title: "Illegible and ineligible",
          body: "Illegible writing cannot be read; an ineligible candidate is not allowed to take part.",
        },
      ],
    },
  ],
};
