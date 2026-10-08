import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_LIT_GREEK_ITALIAN_NOTE: SubtopicNote = {
  subtopicName: "Greek and Italian Literature",
  title: "Greek Classics and Italian Literature from Dante to Ferrante",
  oneLineDefinition:
    "The Greek epics and tragedies that started European literature, the three great Tuscan writers of the 1300s, and the Italian classics and Nobel laureates since.",
  whyItMatters:
    "The past papers asked for true facts about Dante's life, a classic matched with its country, the books of Primo Levi and the author of a best-selling Neapolitan novel. Italian authors are home ground for a test set by the Italian ministry.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-lit-greek",
      name: "Greek epic, tragedy and comedy",
      intuition:
        "European literature begins with two Greek epics about the Trojan War, sung by bards long before they were written down. In 5th-century Athens, drama grew out of religious festivals: tragedies about heroes destroyed by fate or pride, and comedies that mocked living politicians and thinkers.",
      definition:
        "- **Epic**: a long narrative poem about heroes. Homer's **Iliad** and **Odyssey** are the first.\n" +
        "- **Tragedy**: the three great Athenian tragedians are **Aeschylus**, **Sophocles** and **Euripides**.\n" +
        "- **Comedy**: **Aristophanes** is the great comic playwright.\n" +
        "- **History** as a genre: **Herodotus** and **Thucydides**.",
      table: {
        columns: ["Author", "Work", "What it is about"],
        rows: [
          { cells: ["Homer", "Iliad", "The anger of Achilles in the last year of the Trojan War; the death of Hector"] },
          { cells: ["Homer", "Odyssey", "Odysseus' ten-year journey home to Ithaca and his wife Penelope"] },
          { cells: ["Sappho", "Lyric poems", "Love poetry from the island of Lesbos"] },
          { cells: ["Aeschylus", "Oresteia", "Trilogy: the murder of Agamemnon and the revenge of his son Orestes"] },
          { cells: ["Sophocles", "Oedipus Rex; Antigone", "Oedipus unknowingly kills his father and marries his mother; Antigone buries her brother against the king's order"] },
          { cells: ["Euripides", "Medea", "Medea kills her own children to punish her unfaithful husband Jason"] },
          { cells: ["Aristophanes", "The Clouds; Lysistrata", "Comedies; The Clouds mocks Socrates, Lysistrata has women strike to end a war"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of these Athenian playwrights wrote comedies rather than tragedies?",
        options: ["Sophocles", "Aristophanes", "Aeschylus", "Euripides", "Seneca"],
        steps: [
          "Aristophanes is the great writer of Old Comedy (The Clouds, Lysistrata, The Frogs).",
          "Sophocles, Aeschylus and Euripides are the three tragedians. Seneca wrote tragedies too, but in Latin, in Rome.",
        ],
        answer: "(B) Aristophanes",
      },
      practiceSet: [
        { prompt: "Which Homeric epic follows a hero's journey home to Ithaca?", answer: "The Odyssey" },
        { prompt: "Who wrote Oedipus Rex?", answer: "Sophocles" },
        { prompt: "Which tragedy is about a mother who kills her children to punish Jason?", answer: "Medea, by Euripides" },
      ],
      traps: [
        {
          title: "Oedipus is Greek, not Roman",
          body: "Oedipus Rex is a Greek tragedy by Sophocles (5th century BC). Classic-and-country questions pair a work with the wrong nation; Greek tragedy belongs to Athens, and Roman authors (Virgil, Ovid, Seneca) wrote in Latin.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-three-crowns",
      name: "Dante, Petrarch and Boccaccio: the three crowns of Italian literature",
      intuition:
        "In the 1300s three Tuscans showed that the spoken language of Florence could carry great literature as well as Latin could. Their Tuscan became the basis of standard Italian. Each gave a model: Dante for the long poem, Petrarch for the love lyric, Boccaccio for prose stories.",
      definition:
        "- **Dante Alighieri** (Florence 1265, died in exile in **Ravenna** 1321). The **Divine Comedy** has three parts: **Inferno**, **Purgatorio**, **Paradiso**: 100 cantos in **terza rima**. Virgil guides him through Hell and Purgatory, **Beatrice** through Heaven. He also wrote the Vita Nuova.\n" +
        "- **Francesco Petrarca** (Petrarch) (Arezzo 1304 to 1374): the **Canzoniere**, 366 poems mostly for **Laura**; the model for the sonnet across Europe and a father of **humanism**.\n" +
        "- **Giovanni Boccaccio** (1313 to 1375): the **Decameron**.",
      table: {
        columns: ["Writer", "Life", "Main work", "Key facts"],
        rows: [
          { cells: ["Dante Alighieri", "Born Florence 1265; exiled 1302; died Ravenna 1321", "Divine Comedy", "Journey through Hell, Purgatory and Heaven; written in Tuscan, not Latin"] },
          { cells: ["Petrarch", "Born Arezzo 1304; died Arquà 1374", "Canzoniere", "366 poems, most for Laura; crowned poet in Rome, 1341"] },
          { cells: ["Giovanni Boccaccio", "Born 1313 (Certaldo or Florence); died Certaldo 1375", "Decameron", "100 tales told over ten days by ten young people who leave Florence to escape the plague of 1348"] },
        ],
      },
      selfCheckExample: {
        prompt: "In Boccaccio's Decameron, why do the ten young storytellers leave Florence?",
        options: [
          "To join a crusade",
          "Because they have been exiled by the Pope",
          "Because a flood of the Arno has destroyed their homes",
          "To escape the plague of 1348",
          "To attend the coronation of an emperor",
        ],
        steps: [
          "The frame story opens with the Black Death in Florence in 1348; the group retreats to a villa in the hills and tells stories for ten days.",
          "Exile belongs to Dante's life, not to the Decameron, and the other options have no basis in the book.",
        ],
        answer: "(D) To escape the plague of 1348",
      },
      practiceSet: [
        { prompt: "Who guides Dante through Hell?", answer: "Virgil" },
        { prompt: "For which woman did Petrarch write most of the Canzoniere?", answer: "Laura" },
        { prompt: "In which city did Dante die?", answer: "Ravenna (1321), in exile" },
        { prompt: "How many tales does the Decameron contain?", answer: "100" },
      ],
      traps: [
        {
          title: "Dante lived in the 1200s and 1300s, not later",
          body: "Dante was born in Florence in 1265 and died in 1321, so he was born in the 13th century and died before 1400. He wrote poetry, not tragedies; the word \"Comedy\" in his title means a story that ends happily, in Paradise.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-italian-classics",
      name: "Italian classics from Machiavelli to Verga",
      intuition:
        "After the three crowns, each century produced a few Italian works that every school student reads. They line up with the European movements of their time: Renaissance epic, Enlightenment comedy, Romantic poetry and the novel, then realism. Learn the work with its author and one feature.",
      definition:
        "- **Alessandro Manzoni** (Milan, 1785 to 1873) wrote **I promessi sposi** (The Betrothed), the founding modern Italian novel. His mother was **Giulia Beccaria**, daughter of the Enlightenment jurist Cesare Beccaria.\n" +
        "- **Giacomo Leopardi** (Recanati, 1798 to 1837): the **Canti**, including \"L'infinito\"; a poet of deep pessimism.\n" +
        "- **Verismo** (Italian realism, late 1800s): **Giovanni Verga**, I Malavoglia (Sicilian fishermen).",
      table: {
        columns: ["Writer", "Work", "Fact to remember"],
        rows: [
          { cells: ["Niccolò Machiavelli", "The Prince (written 1513)", "Florentine; how a ruler gains and keeps power"] },
          { cells: ["Ludovico Ariosto", "Orlando Furioso (1516)", "Chivalric epic written at the court of Ferrara"] },
          { cells: ["Torquato Tasso", "Gerusalemme liberata (1581)", "Epic poem of the First Crusade"] },
          { cells: ["Carlo Goldoni", "The Servant of Two Masters; La locandiera", "Venetian playwright who reformed Italian comedy"] },
          { cells: ["Ugo Foscolo", "Dei Sepolcri; Last Letters of Jacopo Ortis", "Neoclassical and Romantic poet"] },
          { cells: ["Giacomo Leopardi", "Canti (L'infinito)", "Poet from Recanati"] },
          { cells: ["Alessandro Manzoni", "I promessi sposi (final version 1840 to 1842)", "Renzo and Lucia in Lombardy, 1628 to 1630, under Spanish rule and the plague"] },
          { cells: ["Giovanni Verga", "I Malavoglia (1881)", "Leader of verismo"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which Italian classic follows two young lovers in Lombardy between 1628 and 1630, during Spanish rule and the plague?",
        options: ["I promessi sposi", "Orlando Furioso", "I Malavoglia", "The Prince", "Gerusalemme liberata"],
        steps: [
          "This is Manzoni's I promessi sposi: Renzo and Lucia, near Lake Como and Milan, in the 1620s.",
          "Orlando Furioso and Gerusalemme liberata are Renaissance epic poems; I Malavoglia is set among Sicilian fishermen in the 1860s; The Prince is political advice, not a story.",
        ],
        answer: "(A) I promessi sposi",
      },
      practiceSet: [
        { prompt: "Who wrote The Prince?", answer: "Niccolò Machiavelli" },
        { prompt: "What was the name of Manzoni's mother?", answer: "Giulia Beccaria" },
        { prompt: "In which town was Giacomo Leopardi born?", answer: "Recanati" },
      ],
      traps: [
        {
          title: "Giulia Beccaria was Manzoni's mother, not Dante's",
          body: "Giulia Beccaria (daughter of Cesare Beccaria) was the mother of Alessandro Manzoni, the Milanese novelist of the 1800s. Options attach her to Dante, who lived five centuries earlier.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-modern-italian",
      name: "Modern Italian writers and Italian Nobel laureates in literature",
      intuition:
        "Italy has six Nobel Prizes in Literature, a favourite source of questions. The 20th-century novels below are the ones most translated and taught. Several deal with identity or with the Second World War, which helps you remember them.",
      definition:
        "- Italian **Nobel laureates in Literature**: Carducci (1906), Deledda (1926), Pirandello (1934), Quasimodo (1959), Montale (1975), Dario Fo (1997).\n" +
        "- **Primo Levi** (Turin, 1919 to 1987), a chemist deported to **Auschwitz**, wrote If This Is a Man, The Truce and The Periodic Table.\n" +
        "- **Elena Ferrante** is a **pseudonym**; her four Neapolitan novels begin with **My Brilliant Friend** (2011), about the friendship of Lenù and Lila in Naples.",
      table: {
        columns: ["Writer", "Work", "Fact to remember"],
        rows: [
          { cells: ["Giosuè Carducci", "Odi barbare and other poems", "First Italian Nobel in Literature, 1906"] },
          { cells: ["Grazia Deledda", "Canne al vento", "Sardinian; Nobel 1926, the first Italian woman to win it"] },
          { cells: ["Luigi Pirandello", "Six Characters in Search of an Author; The Late Mattia Pascal; One, No One and One Hundred Thousand", "Sicilian; Nobel 1934; masks and identity"] },
          { cells: ["Italo Svevo", "Zeno's Conscience (1923)", "From Trieste; a novel shaped by psychoanalysis"] },
          { cells: ["Primo Levi", "If This Is a Man; The Truce; The Periodic Table", "Turin chemist, survivor of Auschwitz"] },
          { cells: ["Giuseppe Tomasi di Lampedusa", "The Leopard (1958)", "A Sicilian prince at the time of unification"] },
          { cells: ["Italo Calvino", "Invisible Cities; If on a Winter's Night a Traveller", "Fantastic and experimental fiction"] },
          { cells: ["Umberto Eco", "The Name of the Rose (1980)", "Murder mystery in a medieval abbey"] },
          { cells: ["Elena Ferrante", "My Brilliant Friend and the Neapolitan novels", "Pseudonymous author; worldwide best-seller"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which Italian writer received the Nobel Prize in Literature in 1934?",
        options: ["Italo Calvino", "Primo Levi", "Umberto Eco", "Italo Svevo", "Luigi Pirandello"],
        steps: [
          "Luigi Pirandello won the Nobel in 1934, largely for his theatre.",
          "Calvino, Levi, Eco and Svevo are major Italian novelists, but none of them won the Nobel Prize.",
        ],
        answer: "(E) Luigi Pirandello",
      },
      practiceSet: [
        { prompt: "Who wrote The Name of the Rose?", answer: "Umberto Eco" },
        { prompt: "Which Sardinian writer was the first Italian woman to win the Nobel in Literature?", answer: "Grazia Deledda (1926)" },
        { prompt: "Which Turin chemist wrote The Periodic Table?", answer: "Primo Levi" },
      ],
      traps: [
        {
          title: "A famous title by someone else",
          body: "Questions on one author's books slip in a famous title by a different writer, often a philosopher. The Leopard is by Tomasi di Lampedusa, not Pirandello; The Name of the Rose is Eco's, not Calvino's. Know each author's own titles.",
        },
      ],
    },
  ],
};
