import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_LIT_WORLD_NOTE: SubtopicNote = {
  subtopicName: "European and World Literature",
  title: "European and World Literature, Movements and the Nobel Prize",
  oneLineDefinition:
    "The French, Spanish, German and Russian classics with their characters, great works from beyond Europe, the Nobel laureates the exam likes, and the main literary movements.",
  whyItMatters:
    "The past papers asked which Russian author did not write a given work, which classic does not come from a given country, and which famous writer never won the Nobel Prize. The 2023 ministry question on characters included French, German-language and Colombian novels.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-lit-french-spanish",
      name: "French and Spanish-language classics",
      intuition:
        "French literature gave Europe its great 19th-century novels of ambition and society; Spanish gave it the first modern novel, Don Quixote. In the 20th century Latin America produced magic realism. As always, the exam pairs a character with a book.",
      definition:
        "- **Don Quixote** (Cervantes, 1605 and 1615) is often called the first modern novel.\n" +
        "- **Victor Hugo** and **Alexandre Dumas** are the great French Romantic storytellers; **Flaubert** is the master of realism.\n" +
        "- **Magic realism**: extraordinary events told as ordinary (**Gabriel García Márquez**, Colombia).",
      table: {
        columns: ["Author", "Work", "Famous character", "Country"],
        rows: [
          { cells: ["Miguel de Cervantes", "Don Quixote", "Don Quixote and his squire Sancho Panza", "Spain"] },
          { cells: ["Molière", "Tartuffe; The Miser", "Tartuffe the hypocrite; Harpagon", "France"] },
          { cells: ["Victor Hugo", "Les Misérables; The Hunchback of Notre-Dame", "Jean Valjean and Javert; Quasimodo and Esmeralda", "France"] },
          { cells: ["Alexandre Dumas", "The Count of Monte Cristo; The Three Musketeers", "Edmond Dantès; d'Artagnan", "France"] },
          { cells: ["Gustave Flaubert", "Madame Bovary (1857)", "Emma Bovary", "France"] },
          { cells: ["Marcel Proust", "In Search of Lost Time", "The narrator Marcel and the memory of the madeleine", "France"] },
          { cells: ["Albert Camus", "The Stranger (1942); The Plague", "Meursault; Dr Rieux", "France (born in Algeria)"] },
          { cells: ["Antoine de Saint-Exupéry", "The Little Prince (1943)", "The little prince, the fox and the rose", "France"] },
          { cells: ["Gabriel García Márquez", "One Hundred Years of Solitude; Love in the Time of Cholera", "The Buendía family of Macondo; Florentino Ariza and Fermina Daza", "Colombia"] },
          { cells: ["Jorge Luis Borges", "Ficciones", "Short stories of labyrinths and infinite libraries", "Argentina"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who wrote Madame Bovary?",
        options: ["Gustave Flaubert", "Victor Hugo", "Alexandre Dumas", "Marcel Proust", "Albert Camus"],
        steps: [
          "Madame Bovary (1857) is Flaubert's realist novel about Emma Bovary, a doctor's wife bored by provincial life.",
          "Hugo wrote Les Misérables, Dumas The Count of Monte Cristo, Proust In Search of Lost Time, Camus The Stranger.",
        ],
        answer: "(A) Gustave Flaubert",
      },
      practiceSet: [
        { prompt: "Who is the hero of The Count of Monte Cristo?", answer: "Edmond Dantès" },
        { prompt: "Who is Don Quixote's squire?", answer: "Sancho Panza" },
        { prompt: "In which fictional town is One Hundred Years of Solitude set?", answer: "Macondo" },
      ],
      traps: [
        {
          title: "Quasimodo the hunchback, Quasimodo the poet",
          body: "Quasimodo is the bell-ringer in Victor Hugo's The Hunchback of Notre-Dame (1831). Salvatore Quasimodo is a different person entirely: an Italian poet who won the Nobel Prize in 1959.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-german-russian",
      name: "German-language and Russian classics",
      intuition:
        "German literature runs from Goethe's Faust to the strange modern world of Kafka, who wrote in German though he lived in Prague. Russian literature had its golden age in the 1800s with huge novels of moral struggle, then a 20th century marked by censorship. The trap is to attach each title to the right Russian.",
      definition:
        "- **Goethe**'s **Faust**: a scholar sells his soul to the devil Mephistopheles.\n" +
        "- **Franz Kafka** (Prague, 1883 to 1924) wrote in German about individuals crushed by absurd systems: the adjective **Kafkaesque**.\n" +
        "- Russian **novelists** (Tolstoy, Dostoevsky) and the **playwright** and short-story writer **Chekhov** (a doctor by training).\n" +
        "- Soviet-era writers often faced censorship: **Pasternak** was forced to refuse the 1958 Nobel; **Solzhenitsyn** described the Gulag camps.",
      table: {
        columns: ["Author", "Work", "Famous character or subject", "Country and fact"],
        rows: [
          { cells: ["Johann Wolfgang von Goethe", "Faust; The Sorrows of Young Werther", "Faust and Mephistopheles", "Germany; Romantic and classical giant"] },
          { cells: ["Thomas Mann", "Buddenbrooks; The Magic Mountain; Death in Venice", "Hans Castorp in a Swiss sanatorium", "Germany; Nobel 1929"] },
          { cells: ["Franz Kafka", "The Metamorphosis; The Trial", "Gregor Samsa wakes up as an insect; Josef K. is arrested without reason", "Prague, writing in German"] },
          { cells: ["Alexander Pushkin", "Eugene Onegin", "Onegin and Tatiana", "Russia's national poet"] },
          { cells: ["Leo Tolstoy", "War and Peace; Anna Karenina", "Pierre and Natasha in the Napoleonic wars; Anna's tragic love", "Russia"] },
          { cells: ["Fyodor Dostoevsky", "Crime and Punishment; The Brothers Karamazov", "Raskolnikov the student murderer; the brothers Dmitri, Ivan and Alyosha", "Russia"] },
          { cells: ["Anton Chekhov", "Uncle Vanya; The Three Sisters; The Cherry Orchard", "Plays of provincial disappointment", "Russia; trained as a doctor"] },
          { cells: ["Mikhail Bulgakov", "The Master and Margarita", "The Devil visits Soviet Moscow", "Russia; published after his death"] },
          { cells: ["Boris Pasternak", "Doctor Zhivago", "Yuri Zhivago and Lara", "Russia; Nobel 1958, forced to refuse it"] },
          { cells: ["Vladimir Nabokov", "Lolita", "Humbert Humbert", "Russian-born; wrote Lolita in English"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which writer created the character Raskolnikov?",
        options: ["Leo Tolstoy", "Alexander Pushkin", "Mikhail Bulgakov", "Boris Pasternak", "Fyodor Dostoevsky"],
        steps: [
          "Raskolnikov is the student who commits murder in Dostoevsky's Crime and Punishment (1866).",
          "Tolstoy wrote War and Peace and Anna Karenina, Pushkin Eugene Onegin, Bulgakov The Master and Margarita, Pasternak Doctor Zhivago.",
        ],
        answer: "(E) Fyodor Dostoevsky",
      },
      practiceSet: [
        { prompt: "Who wrote The Metamorphosis?", answer: "Franz Kafka" },
        { prompt: "Which Russian writer of plays was also a doctor?", answer: "Anton Chekhov" },
        { prompt: "Who makes a pact with Mephistopheles in Goethe's play?", answer: "Faust" },
      ],
      traps: [
        {
          title: "Chekhov wrote the plays, Bulgakov the Moscow novel",
          body: "Uncle Vanya, The Three Sisters and The Cherry Orchard are plays by Anton Chekhov. Mikhail Bulgakov wrote the novel The Master and Margarita. Questions on Russian writers often swap titles between authors, so learn at least one work for each name.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-world-classics",
      name: "Great works from beyond Europe and their origins",
      intuition:
        "General knowledge questions test whether you can place a classic in its country and language. A few clues help: Sanskrit epics are Indian, Persian Sufi poetry comes from the Persian-speaking world, and the earliest novel-like work comes from the Japanese imperial court.",
      definition:
        "- **Persian** literature: **Rumi** (13th century), Sufi mystic poet, born in Balkh (today Afghanistan), lived in Konya (today Turkey).\n" +
        "- **Japanese**: **The Tale of Genji** (about 1000), by the court lady **Murasaki Shikibu**.\n" +
        "- **Arabic**: **One Thousand and One Nights**, stories told by **Scheherazade**.\n" +
        "- **African**: Chinua Achebe's **Things Fall Apart** (Nigeria, 1958).",
      table: {
        columns: ["Work", "Author", "Origin"],
        rows: [
          { cells: ["Epic of Gilgamesh", "Anonymous", "Mesopotamia (Iraq); the oldest surviving great poem, about 2000 BC"] },
          { cells: ["Mahabharata and Ramayana", "Traditionally Vyasa and Valmiki", "India, in Sanskrit; the Bhagavad Gita is part of the Mahabharata"] },
          { cells: ["The Tale of Genji", "Murasaki Shikibu", "Japan, about 1000"] },
          { cells: ["One Thousand and One Nights", "Anonymous, told by Scheherazade", "Arabic, from Persian and Indian sources"] },
          { cells: ["Masnavi and other poems", "Jalal al-Din Rumi", "Persian language, 13th century"] },
          { cells: ["Dream of the Red Chamber", "Cao Xueqin", "China, 18th century"] },
          { cells: ["Gitanjali", "Rabindranath Tagore", "India (Bengali); Nobel 1913"] },
          { cells: ["Things Fall Apart", "Chinua Achebe", "Nigeria"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which work from ancient Mesopotamia is the oldest surviving great work of literature?",
        options: ["The Mahabharata", "The Iliad", "The Epic of Gilgamesh", "The Aeneid", "The Ramayana"],
        steps: [
          "Gilgamesh comes from Mesopotamia; its earliest versions are about 2000 BC, written in cuneiform.",
          "The Mahabharata and Ramayana are Indian, the Iliad is Greek (about 750 BC) and the Aeneid Roman (1st century BC).",
        ],
        answer: "(C) The Epic of Gilgamesh",
      },
      practiceSet: [
        { prompt: "In which language did Rumi write most of his poetry?", answer: "Persian" },
        { prompt: "Who tells the stories in One Thousand and One Nights?", answer: "Scheherazade" },
        { prompt: "Which Indian epic contains the Bhagavad Gita?", answer: "The Mahabharata" },
      ],
      traps: [
        {
          title: "Rumi is Persian, not Chinese or Arab",
          body: "Rumi wrote in Persian. Because he lived in Konya, in today's Turkey, options may also say Turkey; the safe answer is the Persian language and culture. He has nothing to do with China, and he is not the author of One Thousand and One Nights.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-nobel-literature",
      name: "The Nobel Prize in Literature: laureates to know",
      intuition:
        "The Nobel Prize in Literature has been awarded since 1901, so writers who died before then never had a chance. Some great 20th-century writers never won it either. The exam likes to offer one famous non-winner among four winners.",
      definition:
        "- Awarded since **1901** by the Swedish Academy in Stockholm.\n" +
        "- Writers who **died before 1901** cannot have won it: Dickens, Dostoevsky, Austen, Hugo, Flaubert.\n" +
        "- Famous 20th-century writers who **never won**: Tolstoy, Joyce, Proust, Woolf, Kafka, Borges.\n" +
        "- **Sartre declined** the prize (1964); **Pasternak** was forced by the Soviet government to refuse it (1958).",
      table: {
        columns: ["Writer", "Year", "Country", "Known for"],
        rows: [
          { cells: ["Selma Lagerlöf", "1909", "Sweden", "First woman laureate in literature"] },
          { cells: ["Rabindranath Tagore", "1913", "India", "First laureate from outside Europe"] },
          { cells: ["Thomas Mann", "1929", "Germany", "Buddenbrooks"] },
          { cells: ["Ernest Hemingway", "1954", "USA", "The Old Man and the Sea"] },
          { cells: ["Albert Camus", "1957", "France", "The Stranger"] },
          { cells: ["Pablo Neruda", "1971", "Chile", "Love poems and political poetry"] },
          { cells: ["Gabriel García Márquez", "1982", "Colombia", "One Hundred Years of Solitude"] },
          { cells: ["Toni Morrison", "1993", "USA", "Beloved"] },
          { cells: ["Harold Pinter", "2005", "United Kingdom", "Plays such as The Birthday Party"] },
          { cells: ["Doris Lessing", "2007", "United Kingdom", "The Golden Notebook"] },
          { cells: ["Bob Dylan", "2016", "USA", "Songwriter, the first musician to win"] },
          { cells: ["Kazuo Ishiguro", "2017", "United Kingdom (born in Japan)", "The Remains of the Day"] },
        ],
      },
      selfCheckExample: {
        prompt: "Who was the first laureate from outside Europe to win the Nobel Prize in Literature?",
        options: ["Pablo Neruda", "Rabindranath Tagore", "Gabriel García Márquez", "Toni Morrison", "Kazuo Ishiguro"],
        steps: [
          "Tagore won in 1913 for the poems of Gitanjali.",
          "Neruda (1971), García Márquez (1982), Morrison (1993) and Ishiguro (2017) all won much later.",
        ],
        answer: "(B) Rabindranath Tagore",
      },
      practiceSet: [
        { prompt: "Which singer-songwriter won the Nobel Prize in Literature in 2016?", answer: "Bob Dylan" },
        { prompt: "Who was the first woman to win the Nobel Prize in Literature?", answer: "Selma Lagerlöf (1909)" },
        { prompt: "Which French philosopher declined the Nobel Prize in Literature in 1964?", answer: "Jean-Paul Sartre" },
      ],
      traps: [
        {
          title: "Too early to win",
          body: "The prize began in 1901. Any writer who died before then, however great, never won it. Charles Dickens died in 1870, Dostoevsky in 1881 and Victor Hugo in 1885, so none of them is a laureate.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-movements",
      name: "Literary movements from Humanism to magic realism",
      intuition:
        "A literary movement is a group of writers in one period who share ideas about what literature should do. Each movement reacts against the one before: Romantic feeling against Enlightenment reason, Realism against Romantic dreaming, Modernism against Realist order. Match the movement to its period, its idea and two names.",
      definition:
        "- **Romanticism** (about 1790 to 1850): feeling, nature, the individual, the nation.\n" +
        "- **Realism** and **Naturalism** (later 1800s): ordinary life described objectively; Naturalism adds heredity and environment as forces.\n" +
        "- **Modernism** (about 1900 to 1940): **stream of consciousness**, broken time, inner experience.\n" +
        "- **Existentialism** (1940s to 1950s): freedom and responsibility in an absurd world.",
      table: {
        columns: ["Movement", "Period", "Main idea", "Writers"],
        rows: [
          { cells: ["Humanism", "1300s to 1400s", "Rediscovery of Greek and Latin classics; human dignity", "Petrarch, Erasmus"] },
          { cells: ["Romanticism", "About 1790 to 1850", "Emotion, nature, nation, the individual", "Goethe, Wordsworth, Byron, Leopardi, Manzoni, Hugo"] },
          { cells: ["Realism and Naturalism", "About 1850 to 1890", "Objective portraits of society; heredity and environment", "Balzac, Flaubert, Zola, Tolstoy"] },
          { cells: ["Verismo", "About 1875 to 1900, Italy", "Italian realism about the poor of the South", "Verga, Capuana"] },
          { cells: ["Decadentism and Symbolism", "About 1880 to 1910", "Art for art's sake; suggestion and refined sensation", "Baudelaire, Wilde, D'Annunzio, Pascoli"] },
          { cells: ["Modernism", "About 1910 to 1940", "Stream of consciousness and fragmented time", "Joyce, Woolf, Proust, Kafka, Svevo"] },
          { cells: ["Existentialism", "1940s to 1950s", "Freedom, the absurd, responsibility", "Sartre, Camus, de Beauvoir"] },
          { cells: ["Neorealism", "1940s to 1950s, Italy", "Post-war everyday life in novels and films", "Pavese, Vittorini; De Sica and Rossellini in cinema"] },
          { cells: ["Magic realism", "From the 1960s, Latin America", "Marvellous events told as normal", "García Márquez, Isabel Allende"] },
        ],
      },
      selfCheckExample: {
        prompt: "The \"stream of consciousness\" technique of Joyce and Woolf belongs to which movement?",
        options: ["Romanticism", "Verismo", "Realism", "Modernism", "Humanism"],
        steps: [
          "Stream of consciousness, which follows a character's flow of thoughts, is the signature technique of Modernism, about 1910 to 1940.",
          "Romanticism and Realism are 19th-century, Verismo is Italian realism, and Humanism belongs to the 1300s and 1400s.",
        ],
        answer: "(D) Modernism",
      },
      practiceSet: [
        { prompt: "Which Italian movement did Giovanni Verga lead?", answer: "Verismo" },
        { prompt: "With which continent is magic realism most associated?", answer: "Latin America" },
        { prompt: "Which movement stressed emotion and nature in reaction to the Enlightenment?", answer: "Romanticism" },
      ],
      traps: [
        {
          title: "Neorealism is not Realism",
          body: "Realism is a 19th-century European movement (Flaubert, Tolstoy). Neorealism is an Italian movement of the 1940s and 1950s, mostly remembered for films about post-war poverty, such as De Sica's Bicycle Thieves.",
        },
      ],
    },
  ],
};
