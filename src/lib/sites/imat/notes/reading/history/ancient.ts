import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_HIS_ANCIENT_NOTE: SubtopicNote = {
  subtopicName: "The Ancient World",
  title: "The Ancient World: Early Civilisations, Greece and Rome",
  oneLineDefinition:
    "The first civilisations invented writing; Greece gave Europe the city-state and democracy; Rome built an empire and a Latin literature that schools still read.",
  whyItMatters:
    "This is the most asked era in the chapter. The 2023 ministry paper asked what a famous Latin prose work is, and the Cambridge papers asked about Greek city-states, Hannibal, the Rosetta Stone, the Seven Wonders and the borders of the Roman Empire.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-his-early-civilisations",
      name: "Early civilisations and the birth of writing",
      intuition:
        "Writing was invented where people first lived in cities and needed to record taxes, laws and trade. Each early civilisation is remembered for one thing it left behind: a script, a law code, a monument. Learn the civilisation, its modern country and its one famous object.",
      definition:
        "- **Mesopotamia** (\"land between the rivers\", the Tigris and Euphrates) is modern Iraq. The Sumerians there wrote **cuneiform** on clay tablets.\n" +
        "- **Egypt** wrote in **hieroglyphs**. They were deciphered thanks to the **Rosetta Stone**, which carries one decree in three scripts.\n" +
        "- The **Phoenicians** spread an alphabet of consonants that the Greeks adapted, adding vowels; Latin letters come from Greek.\n" +
        "- In the Americas the **Maya**, **Aztecs** and **Incas** built empires before Spanish conquest in the 1500s.",
      table: {
        columns: ["Civilisation or object", "Where (modern country)", "Fact to remember"],
        rows: [
          { cells: ["Sumerians", "Southern Iraq", "Cuneiform, one of the first writing systems, about 3200 BC"] },
          { cells: ["Babylon under Hammurabi", "Iraq", "Code of Hammurabi, a written law code of about 1750 BC (\"an eye for an eye\")"] },
          { cells: ["Ancient Egypt", "Egypt, along the Nile", "Hieroglyphs; the pyramids of Giza, built about 2500 BC"] },
          { cells: ["Rosetta Stone", "Found in Egypt in 1799; now in the British Museum", "One decree in hieroglyphs, Demotic and Greek; Champollion deciphered hieroglyphs in 1822"] },
          { cells: ["Phoenicians", "Lebanon coast; founded Carthage in Tunisia", "Consonant alphabet, ancestor of the Greek and Latin alphabets"] },
          { cells: ["Maya", "Southern Mexico, Guatemala", "Hieroglyphic writing, precise calendar and astronomy"] },
          { cells: ["Aztecs", "Central Mexico; capital Tenochtitlan (now Mexico City)", "Conquered by Hernán Cortés in 1521"] },
          { cells: ["Incas", "Andes, centred on Peru; capital Cusco", "Machu Picchu; conquered by Francisco Pizarro from 1532"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which scripts appear on the Rosetta Stone?",
        options: [
          "Cuneiform, Greek and Latin",
          "Hieroglyphs, Phoenician and Greek",
          "Hieroglyphs, Demotic and Greek",
          "Hieroglyphs, Demotic and Latin",
          "Cuneiform, Demotic and Aramaic",
        ],
        steps: [
          "The stone was carved in Ptolemaic Egypt, ruled by Greek-speaking kings, so it carries Egypt's two scripts (hieroglyphs and the everyday Demotic) plus Greek.",
          "Greek could be read, which is how scholars cracked the hieroglyphs. Cuneiform belongs to Mesopotamia, and Latin was not used.",
        ],
        answer: "(C) Hieroglyphs, Demotic and Greek",
      },
      practiceSet: [
        { prompt: "What was the capital of the Inca Empire?", answer: "Cusco, in the Andes of modern Peru" },
        { prompt: "On what material did the Sumerians write cuneiform?", answer: "Clay tablets" },
        { prompt: "Which Spanish conqueror defeated the Aztecs?", answer: "Hernán Cortés (1521)" },
      ],
      traps: [
        {
          title: "Hieroglyphs belong to Egypt, cuneiform to Mesopotamia",
          body: "Options swap the two. Egyptian writing is hieroglyphic and was decoded through the Rosetta Stone. Cuneiform (wedge-shaped marks on clay) is from Mesopotamia, the land of the Sumerians and Babylon. The Code of Hammurabi is written in cuneiform.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-seven-wonders",
      name: "The Seven Wonders of the Ancient World",
      intuition:
        "The list was drawn up by Greek writers as a tourist list of the most amazing human works around the eastern Mediterranean. Only one survives. The trick is to know the seven exactly, because the wrong options are famous monuments that are not on the list.",
      definition:
        "- The **Seven Wonders** are seven monuments listed by Hellenistic Greek writers (2nd century BC).\n" +
        "- Only the **Great Pyramid of Giza**, the oldest of them, still stands.\n" +
        "- Famous monuments that are **not** on the list: the Parthenon, the Colosseum, the Great Wall of China, Stonehenge, the Sphinx.",
      table: {
        columns: ["Wonder", "Where (today)", "What happened to it"],
        rows: [
          { cells: ["Great Pyramid of Giza", "Egypt", "Still standing: the only survivor"] },
          { cells: ["Hanging Gardens of Babylon", "Iraq", "Lost; some historians doubt they existed"] },
          { cells: ["Statue of Zeus at Olympia", "Greece", "Destroyed in late antiquity"] },
          { cells: ["Temple of Artemis at Ephesus", "Turkey", "Burnt and destroyed; a few ruins"] },
          { cells: ["Mausoleum at Halicarnassus", "Bodrum, Turkey", "Destroyed by earthquakes; gave us the word \"mausoleum\""] },
          { cells: ["Colossus of Rhodes", "Greece", "Bronze statue of the sun god Helios, fell in an earthquake soon after it was built"] },
          { cells: ["Lighthouse (Pharos) of Alexandria", "Egypt", "Destroyed by earthquakes in the Middle Ages"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of the Seven Wonders of the Ancient World can still be visited today?",
        options: [
          "The Great Pyramid of Giza",
          "The Colossus of Rhodes",
          "The Colosseum in Rome",
          "The Lighthouse of Alexandria",
          "The Parthenon in Athens",
        ],
        steps: [
          "Only the Great Pyramid survives; the Colossus and the Lighthouse were destroyed by earthquakes.",
          "The Colosseum and the Parthenon still stand, but neither was ever one of the Seven Wonders.",
        ],
        answer: "(A) The Great Pyramid of Giza",
      },
      practiceSet: [
        { prompt: "Which wonder stood in Babylon?", answer: "The Hanging Gardens" },
        { prompt: "Which god did the Colossus of Rhodes represent?", answer: "Helios, the sun god" },
        { prompt: "Which word for a grand tomb comes from one of the Seven Wonders?", answer: "Mausoleum (from the tomb of Mausolus at Halicarnassus)" },
      ],
      traps: [
        {
          title: "Famous does not mean one of the Seven",
          body: "The Parthenon, the Colosseum, the Great Wall and Stonehenge are world famous but are not among the Seven Wonders. The seven are the Pyramid, the Hanging Gardens, Zeus at Olympia, Artemis at Ephesus, the Mausoleum, the Colossus and the Lighthouse of Alexandria.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-classical-greece",
      name: "Classical Greece: the polis, democracy and Alexander",
      intuition:
        "Greece was never one country in ancient times. It was hundreds of small independent cities, each with its own laws and army, which sometimes united against an outside enemy and often fought each other. Athens and Sparta were the two great rivals, and Alexander of Macedon later carried Greek culture as far as India.",
      definition:
        "- A **polis** is a **city-state**: one city and its surrounding land, governing itself.\n" +
        "- **Athenian democracy** was **direct**: citizens voted in person in the Assembly. Only free adult male citizens could vote; women, slaves and foreigners could not.\n" +
        "- **Sparta** was a military state with two kings and a council of elders.\n" +
        "- **Herodotus** (the \"father of history\") wrote about the Persian Wars; **Thucydides** about the Peloponnesian War.",
      table: {
        columns: ["Event or term", "Date", "What to remember"],
        rows: [
          { cells: ["First Olympic Games", "776 BC", "Held at Olympia in honour of Zeus"] },
          { cells: ["Reforms of Cleisthenes", "508 BC", "Start of democracy in Athens"] },
          { cells: ["Persian Wars", "490 to 479 BC", "Greek victories at Marathon (490), Salamis (480, at sea) and Plataea (479); the Spartans' last stand at Thermopylae (480)"] },
          { cells: ["Age of Pericles", "About 461 to 429 BC", "Golden age of Athens; the Parthenon built on the Acropolis"] },
          { cells: ["Peloponnesian War", "431 to 404 BC", "Athens against Sparta; Sparta won"] },
          { cells: ["Alexander the Great", "Reigned 336 to 323 BC", "King of Macedon, pupil of Aristotle; conquered Persia and reached India; founded Alexandria in Egypt"] },
          { cells: ["Hellenistic age", "323 to 31 BC", "Greek culture across the East; ended when Rome took Egypt after the battle of Actium"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which statement about democracy in classical Athens is correct?",
        options: [
          "All adult residents of Athens, including women, could vote",
          "Citizens elected representatives who voted on their behalf",
          "It was introduced by Alexander the Great",
          "Free adult male citizens voted in person in the Assembly",
          "Slaves could vote once they had served in the army",
        ],
        steps: [
          "Athenian democracy was direct: citizens attended the Assembly and voted themselves, so B (representatives) describes modern democracy, not Athens.",
          "Only free adult male citizens had the vote; women, slaves and foreigners were excluded, which rules out A and E. Alexander lived long after democracy began in 508 BC.",
        ],
        answer: "(D) Free adult male citizens voted in person in the Assembly",
      },
      practiceSet: [
        { prompt: "What is a polis?", answer: "An independent Greek city-state" },
        { prompt: "Who taught the young Alexander the Great?", answer: "Aristotle" },
        { prompt: "Which city won the Peloponnesian War?", answer: "Sparta" },
        { prompt: "Who is called the \"father of history\"?", answer: "Herodotus" },
      ],
      traps: [
        {
          title: "Ancient democracy was direct, and narrow",
          body: "Options describe Athens as if it were a modern parliament. It was not: citizens voted in person, with no elected representatives, and the vote belonged only to free adult men born of citizen families, a small part of the population.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-rome",
      name: "Rome from foundation to fall: the key dates",
      intuition:
        "Roman history has three stages: kings, then a republic, then emperors. The republic was destroyed by its own successful generals, Caesar above all, and his heir Augustus became the first emperor. Fix about eight dates and every Roman question can be placed in order.",
      definition:
        "- **Monarchy** (753 to 509 BC), **Republic** (509 to 27 BC, two consuls elected each year, advised by the Senate), **Empire** (from 27 BC).\n" +
        "- At its largest (AD 117, under Trajan) the empire reached from Britain and Spain to Egypt and Mesopotamia. Modern countries partly inside it include Portugal, Spain, France, Belgium, England, Slovenia, Romania, Egypt and Tunisia.\n" +
        "- Rome **never** ruled Ireland, Scotland's Highlands, Scandinavia (including Denmark) or most of Germany east of the Rhine.\n" +
        "- The empire split into West and East. The West ended in AD 476; the East (the **Byzantine Empire**, capital Constantinople) lasted until 1453.",
      table: {
        columns: ["Date", "Event", "Why it matters"],
        rows: [
          { cells: ["753 BC", "Legendary founding of Rome by Romulus", "Romans counted years from it (ab urbe condita)"] },
          { cells: ["509 BC", "Last king expelled", "The Republic begins"] },
          { cells: ["264 to 146 BC", "Three Punic Wars against Carthage", "Hannibal of Carthage crossed the Alps with elephants in 218 BC; Carthage destroyed in 146 BC"] },
          { cells: ["49 to 44 BC", "Julius Caesar crosses the Rubicon, becomes dictator, is murdered on the Ides of March (15 March 44 BC)", "The Republic collapses in civil war"] },
          { cells: ["27 BC", "Octavian receives the title Augustus", "First emperor; start of the Pax Romana"] },
          { cells: ["AD 79", "Vesuvius erupts", "Pompeii and Herculaneum buried"] },
          { cells: ["AD 313", "Edict of Milan by Constantine", "Christianity tolerated; made the state religion by Theodosius in 380"] },
          { cells: ["AD 476", "Last Western emperor, Romulus Augustulus, deposed by Odoacer", "Conventional end of the Western Empire and of antiquity"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these events came first?",
        options: [
          "Augustus becomes the first Roman emperor",
          "Hannibal crosses the Alps",
          "Vesuvius buries Pompeii",
          "Constantine issues the Edict of Milan",
          "Odoacer deposes the last Western emperor",
        ],
        steps: [
          "Put dates on them: Hannibal 218 BC, Augustus 27 BC, Pompeii AD 79, Edict of Milan AD 313, Odoacer AD 476.",
          "The only date before Christ that is earlier than 27 BC is 218 BC. Remember that BC dates count down: 218 BC is earlier than 27 BC.",
        ],
        answer: "(B) Hannibal crosses the Alps",
      },
      practiceSet: [
        { prompt: "In which year did the Western Roman Empire end, by convention?", answer: "AD 476" },
        { prompt: "Which city did Rome fight in the Punic Wars?", answer: "Carthage (in modern Tunisia)" },
        { prompt: "Which of the two large islands of the British Isles did Rome never conquer?", answer: "Ireland" },
        { prompt: "What was the capital of the Eastern Roman Empire?", answer: "Constantinople (now Istanbul)" },
      ],
      traps: [
        {
          title: "Hannibal was Rome's enemy, not a Roman",
          body: "Hannibal was a Carthaginian general, son of Hamilcar, who crossed the Alps to attack Rome. Options mix him with Roman leaders such as Octavian, Augustus or Mark Antony. Augustus and Octavian are the same man: Octavian took the title Augustus in 27 BC.",
        },
        {
          title: "Caesar was never emperor",
          body: "Julius Caesar was made dictator for life and was murdered in 44 BC, while Rome was still a republic in form. The first emperor was his adopted heir Octavian, called Augustus from 27 BC.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-his-latin-authors",
      name: "Latin authors and their major works",
      intuition:
        "Most famous Latin books are known by their Latin titles, which usually say what they are about: De Bello Gallico is \"about the Gallic War\", De Rerum Natura is \"on the nature of things\". Translate the title and you are halfway to the answer. Then attach each work to its genre: history, poem, speech or philosophy.",
      definition:
        "- **Prose** writers: Caesar, Cicero, Livy, Seneca, Pliny the Elder, Tacitus.\n" +
        "- **Poets**: Lucretius, Catullus, Virgil, Horace, Ovid.\n" +
        "- The **Golden Age** of Latin literature was the late Republic and the reign of Augustus (about 80 BC to AD 17).\n" +
        "- Marcus Aurelius was a Roman emperor but wrote his Meditations in **Greek**.",
      table: {
        columns: ["Author", "Main work", "What it is"],
        rows: [
          { cells: ["Julius Caesar", "De Bello Gallico (Commentaries on the Gallic War)", "Caesar's own prose account of his conquest of Gaul, 58 to 50 BC, written in the third person"] },
          { cells: ["Cicero", "Speeches against Catiline; De Re Publica; letters", "Orator and statesman; the model of Latin prose style"] },
          { cells: ["Lucretius", "De Rerum Natura", "Poem explaining the Epicurean view that everything is made of atoms"] },
          { cells: ["Virgil", "Aeneid; Georgics; Eclogues", "Epic of Aeneas, who flees Troy and founds the Roman line in Italy; Dante's guide in the Divine Comedy"] },
          { cells: ["Horace", "Odes; Satires; Ars Poetica", "Lyric poet of the age of Augustus; source of \"carpe diem\""] },
          { cells: ["Ovid", "Metamorphoses", "Poem of myths about transformations; Ovid was exiled by Augustus"] },
          { cells: ["Livy", "Ab Urbe Condita", "History of Rome from its founding"] },
          { cells: ["Seneca", "Letters to Lucilius; tragedies", "Stoic philosopher and tutor of the emperor Nero"] },
          { cells: ["Pliny the Elder", "Naturalis Historia", "Encyclopedia of the natural world; he died in the eruption of Vesuvius, AD 79"] },
          { cells: ["Tacitus", "Annals; Histories; Germania", "Historian of the early emperors and of the Germanic peoples"] },
        ],
      },
      selfCheckExample: {
        prompt: "The Aeneid, the national epic of Rome, was written by which poet?",
        options: ["Ovid", "Horace", "Lucretius", "Cicero", "Virgil"],
        steps: [
          "The Aeneid is Virgil's epic about Aeneas, written under Augustus.",
          "Ovid wrote the Metamorphoses, Horace the Odes, and Lucretius De Rerum Natura. Cicero was an orator who wrote prose, not epic poetry.",
        ],
        answer: "(E) Virgil",
      },
      practiceSet: [
        { prompt: "What does the title De Bello Gallico mean?", answer: "About the Gallic War" },
        { prompt: "Which Latin author wrote a natural history and died near Vesuvius?", answer: "Pliny the Elder" },
        { prompt: "Who wrote the Metamorphoses?", answer: "Ovid" },
      ],
      traps: [
        {
          title: "De Bello Gallico is Caesar's prose, not a poem",
          body: "It is Julius Caesar's own account of his campaigns in Gaul, in plain prose and in the third person. It is not a collection of poems (Horace wrote lyric poems on other subjects), and not a painting, sculpture or opera.",
        },
      ],
    },
  ],
};
