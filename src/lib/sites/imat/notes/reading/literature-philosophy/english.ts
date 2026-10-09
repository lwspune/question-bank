import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_LIT_ENGLISH_NOTE: SubtopicNote = {
  subtopicName: "English-Language Literature",
  title: "Shakespeare and the English-Language Novel",
  oneLineDefinition:
    "Shakespeare's plays and where they are set, the great British and Irish novels with their famous characters, and the American classics.",
  whyItMatters:
    "Both ministry questions in this chapter came from here: the 2023 paper asked which character does not belong to a given novel, and the 2024 paper asked who wrote a Virginia Woolf novel. The Cambridge papers asked about Shakespeare's settings and American prize-winning novels.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "imat-lit-shakespeare",
      name: "Shakespeare's plays and their settings",
      intuition:
        "William Shakespeare (Stratford-upon-Avon, 1564 to 1616) wrote about 37 plays and 154 sonnets. A surprising number of his plays are set in Italy, which he never visited: Italy was the fashionable setting for stories of love, intrigue and money. Learn each play with its setting and its main characters.",
      definition:
        "- **Tragedies** end in death (Hamlet, Macbeth, Othello, King Lear, Romeo and Juliet).\n" +
        "- **Comedies** end in marriage (A Midsummer Night's Dream, Much Ado About Nothing, The Taming of the Shrew).\n" +
        "- **History plays** tell English history (Henry V, Richard III); **Roman plays** tell Roman history (Julius Caesar, Antony and Cleopatra).\n" +
        "- His company performed at the **Globe Theatre** in London.",
      table: {
        columns: ["Play", "Type", "Setting", "Key characters"],
        rows: [
          { cells: ["Romeo and Juliet", "Tragedy", "Verona (and Mantua)", "The Montague and Capulet families"] },
          { cells: ["The Merchant of Venice", "Comedy", "Venice and Belmont", "Shylock, Portia, Antonio"] },
          { cells: ["Othello", "Tragedy", "Venice, then Cyprus", "Othello, Desdemona, Iago"] },
          { cells: ["The Taming of the Shrew", "Comedy", "Padua", "Katherina, Petruchio"] },
          { cells: ["Much Ado About Nothing", "Comedy", "Messina, Sicily", "Beatrice and Benedick"] },
          { cells: ["Julius Caesar", "Roman tragedy", "Rome", "Brutus, Cassius, Mark Antony"] },
          { cells: ["Hamlet", "Tragedy", "Elsinore, Denmark", "Prince Hamlet, Ophelia, his uncle Claudius"] },
          { cells: ["Macbeth", "Tragedy", "Scotland", "Macbeth, Lady Macbeth, three witches"] },
          { cells: ["King Lear", "Tragedy", "Ancient Britain", "Lear and his daughters Goneril, Regan and Cordelia"] },
          { cells: ["A Midsummer Night's Dream", "Comedy", "Athens and a nearby wood", "Puck, Oberon, Titania, Bottom"] },
          { cells: ["The Tempest", "Romance", "A remote island", "Prospero, his daughter Miranda, Caliban, Ariel"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which of Shakespeare's plays is set at the castle of Elsinore in Denmark?",
        options: ["Macbeth", "King Lear", "Hamlet", "The Tempest", "Othello"],
        steps: [
          "Hamlet, Prince of Denmark, is set at Elsinore.",
          "Macbeth is set in Scotland, King Lear in ancient Britain, The Tempest on an island, Othello in Venice and Cyprus.",
        ],
        answer: "(C) Hamlet",
      },
      practiceSet: [
        { prompt: "In which Italian city is The Taming of the Shrew set?", answer: "Padua" },
        { prompt: "Who is the villain who deceives Othello?", answer: "Iago" },
        { prompt: "In which country is Macbeth set?", answer: "Scotland" },
      ],
      traps: [
        {
          title: "Athens is not in Italy",
          body: "A Midsummer Night's Dream is set in Athens and The Tempest on an island; Hamlet, Macbeth and King Lear are set in northern Europe. The plays set in Italy are Romeo and Juliet, The Merchant of Venice, Othello (it opens in Venice), The Taming of the Shrew, Much Ado About Nothing, The Two Gentlemen of Verona and Julius Caesar.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-british-novel",
      name: "The British and Irish novel and its famous characters",
      intuition:
        "The English novel grew from adventure stories in the 1700s, to novels of marriage and society in the 1800s, to experiments with the mind in the 1900s. Exam questions name a character and ask for the book, or name a book and ask for the author. Learn the three together.",
      definition:
        "- **19th century**: Jane Austen's social comedy, the Brontë sisters' passionate novels, Dickens's novels of poverty in industrial London.\n" +
        "- **Modernism** (about 1910 to 1940): **James Joyce** (Irish) and **Virginia Woolf** follow the flow of thoughts (**stream of consciousness**).\n" +
        "- **Dystopias**: Huxley's Brave New World and Orwell's Nineteen Eighty-Four describe nightmare future states.",
      table: {
        columns: ["Author", "Work", "Famous character", "Date"],
        rows: [
          { cells: ["Daniel Defoe", "Robinson Crusoe", "Robinson Crusoe and Friday", "1719"] },
          { cells: ["Jonathan Swift (Irish)", "Gulliver's Travels", "Lemuel Gulliver", "1726"] },
          { cells: ["Jane Austen", "Pride and Prejudice", "Elizabeth Bennet and Mr Darcy", "1813"] },
          { cells: ["Mary Shelley", "Frankenstein", "Victor Frankenstein and his creature", "1818"] },
          { cells: ["Charlotte Brontë", "Jane Eyre", "Jane Eyre and Mr Rochester", "1847"] },
          { cells: ["Emily Brontë", "Wuthering Heights", "Heathcliff and Catherine", "1847"] },
          { cells: ["Charles Dickens", "Oliver Twist; A Christmas Carol; Great Expectations", "Oliver, Fagin; Ebenezer Scrooge; Pip", "1838 to 1861"] },
          { cells: ["Oscar Wilde (Irish)", "The Picture of Dorian Gray", "Dorian Gray", "1890"] },
          { cells: ["Arthur Conan Doyle", "A Study in Scarlet and later stories", "Sherlock Holmes and Dr Watson", "From 1887"] },
          { cells: ["James Joyce (Irish)", "Ulysses", "Leopold Bloom, during one day in Dublin (16 June 1904)", "1922"] },
          { cells: ["Virginia Woolf", "Mrs Dalloway; To the Lighthouse", "Clarissa Dalloway; the Ramsay family", "1925; 1927"] },
          { cells: ["George Orwell", "Animal Farm; Nineteen Eighty-Four", "Napoleon the pig; Winston Smith and Big Brother", "1945; 1949"] },
          { cells: ["Aldous Huxley", "Brave New World", "Bernard Marx", "1932"] },
        ],
      },
      selfCheckExample: {
        prompt: "In which novel does the character Heathcliff appear?",
        options: ["Jane Eyre", "Wuthering Heights", "Pride and Prejudice", "Great Expectations", "Mrs Dalloway"],
        steps: [
          "Heathcliff is the central figure of Emily Brontë's Wuthering Heights.",
          "Jane Eyre is by her sister Charlotte (its hero is Mr Rochester); Pride and Prejudice has Mr Darcy; Great Expectations has Pip; Mrs Dalloway follows Clarissa Dalloway.",
        ],
        answer: "(B) Wuthering Heights",
      },
      practiceSet: [
        { prompt: "Who wrote Frankenstein?", answer: "Mary Shelley (1818)" },
        { prompt: "In which city does Joyce's Ulysses take place?", answer: "Dublin" },
        { prompt: "Which Dickens character is a miser visited by ghosts at Christmas?", answer: "Ebenezer Scrooge" },
        { prompt: "Who wrote Nineteen Eighty-Four?", answer: "George Orwell" },
      ],
      traps: [
        {
          title: "Virginia Woolf, not \"Wolf\", and not Austen",
          body: "To the Lighthouse (1927) and Mrs Dalloway (1925) are by Virginia Woolf, a modernist. Jane Austen wrote a century earlier (Pride and Prejudice, Emma), and Mary Shelley wrote Frankenstein. Women writers are often offered together as distractors.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-lit-american",
      name: "American literature and its famous characters",
      intuition:
        "American literature found its own voice in the 1800s with stories of the sea, the frontier and Puritan guilt. In the 1900s it produced novels about the American dream, the Depression and racial injustice, many of them winning the Pulitzer Prize. Learn author, book and character together.",
      definition:
        "- The **Pulitzer Prize for Fiction** is the top US award for a novel (since 1918).\n" +
        "- The **Lost Generation** (Hemingway, Fitzgerald) wrote after the First World War; the **Beat Generation** (Kerouac) in the 1950s.\n" +
        "- **Little Women** (Louisa May Alcott) follows the four **March sisters**: Meg, Jo, Beth and Amy.",
      table: {
        columns: ["Author", "Work", "Famous character or subject", "Date"],
        rows: [
          { cells: ["Nathaniel Hawthorne", "The Scarlet Letter", "Hester Prynne, in Puritan New England", "1850"] },
          { cells: ["Herman Melville", "Moby-Dick", "Captain Ahab hunts the white whale; narrator Ishmael", "1851"] },
          { cells: ["Louisa May Alcott", "Little Women", "The March sisters", "1868 to 1869"] },
          { cells: ["Mark Twain", "Adventures of Huckleberry Finn", "Huck and the escaped slave Jim on the Mississippi", "1884"] },
          { cells: ["F. Scott Fitzgerald", "The Great Gatsby", "Jay Gatsby, narrated by Nick Carraway", "1925"] },
          { cells: ["Ernest Hemingway", "A Farewell to Arms; The Old Man and the Sea", "An American ambulance driver in Italy in the First World War; the old fisherman Santiago", "1929; 1952 (Pulitzer 1953, Nobel 1954)"] },
          { cells: ["John Steinbeck", "The Grapes of Wrath", "The Joad family in the Great Depression", "1939"] },
          { cells: ["J. D. Salinger", "The Catcher in the Rye", "Holden Caulfield", "1951"] },
          { cells: ["Jack Kerouac", "On the Road", "Sal Paradise and Dean Moriarty", "1957"] },
          { cells: ["Harper Lee", "To Kill a Mockingbird", "Scout Finch and her father, the lawyer Atticus", "1960 (Pulitzer 1961)"] },
          { cells: ["Toni Morrison", "Beloved", "Sethe, a woman who escaped slavery", "1987 (Nobel 1993)"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which novel is narrated by a sailor called Ishmael?",
        options: ["The Great Gatsby", "The Scarlet Letter", "The Catcher in the Rye", "Moby-Dick", "Adventures of Huckleberry Finn"],
        steps: [
          "Moby-Dick opens with \"Call me Ishmael\"; he sails on Captain Ahab's whaling ship.",
          "Gatsby is narrated by Nick Carraway, Catcher by Holden Caulfield, Huckleberry Finn by Huck himself; The Scarlet Letter has a third-person narrator.",
        ],
        answer: "(D) Moby-Dick",
      },
      practiceSet: [
        { prompt: "Who wrote Little Women?", answer: "Louisa May Alcott" },
        { prompt: "Who is the narrator of The Catcher in the Rye?", answer: "Holden Caulfield" },
        { prompt: "Which Hemingway novel is set partly on the Italian front in the First World War?", answer: "A Farewell to Arms" },
      ],
      traps: [
        {
          title: "Little Women has the March sisters, not the Bennet sisters",
          body: "Both books are about a family of sisters, so they are easy to swap. Elizabeth Bennet is in Jane Austen's Pride and Prejudice (England, 1813); Jo March is in Louisa May Alcott's Little Women (USA, 1868).",
        },
      ],
    },
  ],
};
