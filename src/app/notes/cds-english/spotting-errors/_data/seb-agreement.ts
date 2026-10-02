import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEB_AGREEMENT_NOTE: SubtopicNote = {
  subtopicName: "Subject-Verb Agreement",
  title: "Subject-verb agreement: find the real subject",
  oneLineDefinition:
    "How a spotting-errors item works, how to read one, and the first check to run on every sentence: a singular subject takes a singular verb, and a plural subject takes a plural verb.",
  whyItMatters:
    "Spotting errors appears in every CDS English paper, and subject-verb agreement is one of its most tested rules, asked again and again from 2017 to 2026. " +
    "The trick is nearly always the same: a noun placed between the subject and its verb pulls your ear the wrong way. Learn to find the real subject and these become quick marks.",
  concepts: [
    // C1 — the item format, the reading method, and the head-noun check
    {
      kind: "formula" as const,
      slug: "cdsenseb-head-noun",
      name: "The verb agrees with the head noun, not the nearest noun",
      intuition:
        "Each item is one sentence cut into underlined parts. At most one part holds a mistake. The most common mistake is a verb that does not match its subject. " +
        "The subject is often far from its verb, with a phrase such as 'of Indian languages' in between. Your ear hears the nearest noun. Grammar listens only to the main noun of the subject, the **head noun**.",
      definition:
        "**The item.** The sentence is split into parts (a), (b) and (c). Option (d) is **No error**. Choose the part that contains the wrong word. In one sitting, 2019 (II), the sentence came in four parts with no 'No error' option, so one part had to be wrong.\n" +
        "**The reading method:**\n" +
        "- Read the **whole sentence** once before you judge any part. Many errors show only across parts: the subject sits in (a) and its verb in (c).\n" +
        "- **Test every part** in a fixed order: subject and verb, then tense, then verb form, then articles and nouns, then pronouns, then prepositions and word choice.\n" +
        "- Mark the part that holds the **word you would change**, not the part that creates the rule.\n" +
        "- Choose **No error** only when every part has passed every check. A wrong answer costs a third of a mark, so a guess is not free.\n" +
        "**The agreement check:**\n" +
        "- Find the **verb**. If it has a helping verb (an **auxiliary**: is/are, was/were, has/have, does/do), the helper carries the number.\n" +
        "- Find its **subject**: ask 'who or what is doing this?'.\n" +
        "- Cross out the **intervening phrase** between them (of ..., in ..., on ..., made by ..., regarding ...). What is left is the **head noun**.\n" +
        "- **Singular** head noun: singular verb (is, was, has, verb + s). **Plural** head noun: plural verb (are, were, have, no s).",
      authoredExample: {
        prompt: item("The list of names", "on the notice boards", "are out of date."),
        steps: [
          "Read the whole sentence: 'The list of names on the notice boards are out of date.' It sounds smooth because 'boards are' sounds right. That smoothness is the trap.",
          "Part (a), 'The list of names': the subject starts here. The head noun is **list**. 'Of names' only tells us what kind of list.",
          "Part (b), 'on the notice boards': a phrase of place. It cannot be the subject, so cross it out.",
          "Part (c): the verb 'are' must agree with 'list', which is singular. It agrees with 'boards', the nearest noun, instead. The word to change is in (c).",
        ],
        answer: "(c). The list of names on the notice boards **is** out of date.",
      },
      selfCheckExample: {
        prompt: item("The cost of the new", "science books", "have gone up sharply."),
        steps: [
          "What has gone up? The **cost**. 'Of the new science books' only describes it.",
          "'Cost' is singular, so the helper must be 'has', not 'have'.",
          "The wrong word 'have' sits in part (c).",
        ],
        answer: "(c). The cost of the new science books **has** gone up sharply.",
      },
      practiceSet: [
        { prompt: "Correct the verb: 'The keys to the cupboard is on the table.'", answer: "The keys to the cupboard **are** on the table.", method: "Head noun 'keys' is plural; 'cupboard' is in the phrase." },
        { prompt: "Correct the verb: 'The quality of these mangoes are poor.'", answer: "The quality of these mangoes **is** poor.", method: "Head noun 'quality' is singular." },
        { prompt: "Correct the verb: 'The boxes in the store room has been emptied.'", answer: "The boxes in the store room **have** been emptied.", method: "Head noun 'boxes' is plural." },
        { prompt: "Correct the verb: 'The colour of her eyes are brown.'", answer: "The colour of her eyes **is** brown.", method: "Head noun 'colour' is singular." },
      ],
      pyqExampleId: "16234f6f-3c44-4030-9755-1401c86980f4",
      traps: [
        {
          title: "The nearest noun is a decoy",
          body: "The exam puts a noun of the opposite number just before the verb. 'The list of names ... are' sounds right because 'names are' sounds right. Always cross out the of-phrase or place phrase and match the verb to the head noun.",
        },
        {
          title: "Mark the wrong word, not the cause",
          body: "In 'The pair of trousers you bought for me do not fit me', the subject 'The pair' is correct. The verb 'do' is wrong. The answer is the part that holds 'do', even though the reason sits in another part.",
        },
        {
          title: "A name or a single idea is singular",
          body: "A book title, a company or a single word like 'tomorrow' is one thing: 'The Encyclopaedia Britannica **estimates** ...', 'tomorrow **belongs** to those who ...'. A trailing 's' or a plural feel does not change that.",
        },
        {
          title: "Choosing No error too fast",
          body: "A sentence with an agreement error often reads smoothly, because the verb matches the nearest noun. Before you pick (d), run the subject-verb check on every verb in the sentence, including verbs inside 'that' and 'who' parts.",
        },
      ],
    },

    // C2 — subjects that hide their number
    {
      kind: "reference" as const,
      slug: "cdsenseb-tricky-subjects",
      name: "Subjects that hide their number: uncountables, clauses, fractions, 'there'",
      intuition:
        "Some subjects look plural but are singular. Some give no clue at all. A few types come back in paper after paper, so learn them as a list.",
      definition:
        "- An **uncountable noun** has no plural and takes a singular verb: news, information, advice, progress, furniture. 'The news **is** good.'\n" +
        "- A **clause** (a group of words with its own verb) or a 'to' phrase used as the subject is one idea, so it is **singular**, even if it contains 'and': 'To read widely and write daily **is** the best training.'\n" +
        "- **All that** + clause means 'everything that': singular.\n" +
        "- A **fraction, percentage or 'part of'** takes its number from the noun after 'of': 'Half of the milk **has** gone sour'; 'Half of the eggs **were** broken.'\n" +
        "- **There is / there are**: 'there' is only a filler, not the real subject. The real subject comes **after** the verb, and the verb agrees with it: 'There **is** a reason'; 'There **are** two reasons.'",
      table: {
        columns: ["Subject type", "Verb", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["Uncountable noun: news", "Singular", "The news about the floods is worrying.", "2024 (I)"],
            pyqExampleId: "4c185ad0-556f-4b4b-84cc-a37617109d82",
          },
          {
            cells: ["A 'to' phrase joined by 'and'", "Singular", "To love one art and appreciate another is a gift.", "2019 (I)"],
            pyqExampleId: "f4d28082-022c-4269-93a4-53fceb6c1a3a",
          },
          {
            cells: ["All that + clause", "Singular", "All that glitters is not gold.", "2021 (I)"],
            pyqExampleId: "3f742f8c-902a-49a3-84ce-1cc6918b9c8b",
          },
          {
            cells: ["Fraction + singular noun", "Singular", "Two thirds of the book was rubbish.", "2018 (I)"],
            pyqExampleId: "25fee445-6f10-4245-968d-29e6042ef614",
          },
          {
            cells: ["There + singular noun", "Singular", "There has been a storm warning for tonight.", "2018 (I)"],
            pyqExampleId: "d5c7edd1-2b25-4b79-95eb-b6f9a02dea26",
          },
          {
            cells: ["There + singular noun", "Singular", "There comes a time when you must choose.", "2019 (II)"],
            pyqExampleId: "0b8f67ef-ba47-401b-9215-41458c95a7cd",
          },
        ],
        caption: "The same 'there' rule gives a plural verb when a plural noun follows: 'There are many reasons.'",
      },
      pyqExampleId: "4c185ad0-556f-4b4b-84cc-a37617109d82",
      selfCheckExample: {
        prompt: item("The information you gave", "about the trains", "were wrong."),
        steps: [
          "What was wrong? The **information**.",
          "'Information' is uncountable: it has no plural and takes a singular verb.",
          "So 'were' must be 'was'. The wrong word is in part (c).",
        ],
        answer: "(c). The information you gave about the trains **was** wrong.",
      },
      practiceSet: [
        { prompt: "Correct it: 'There is three ways to solve this.'", answer: "There **are** three ways to solve this.", method: "The real subject, 'three ways', comes after the verb." },
        { prompt: "Correct it: 'Half of the milk have gone sour.'", answer: "Half of the milk **has** gone sour.", method: "The noun after 'of' (milk) is uncountable." },
        { prompt: "Correct it: 'Half of the eggs was broken.'", answer: "Half of the eggs **were** broken.", method: "The noun after 'of' (eggs) is plural." },
        { prompt: "Correct it: 'The advice he gave us were useful.'", answer: "The advice he gave us **was** useful.", method: "'Advice' is uncountable." },
      ],
      traps: [
        {
          title: "'There' is not the subject",
          body: "In 'There have been a warning', look past the verb to the noun: 'a warning' is singular, so 'There **has** been a warning'. The error sits in the part with the verb.",
        },
        {
          title: "A fraction borrows its number",
          body: "'Two thirds of the book' is a part of one book: singular. 'Two thirds of the pages' is many pages: plural. Read the noun after 'of' before you judge the verb.",
        },
        {
          title: "'And' inside a 'to' phrase does not make it plural",
          body: "'To appreciate another art and find connections' is one activity, so it takes 'is'. Do not count the two verbs as two subjects.",
        },
      ],
    },

    // C3 — distributive words
    {
      kind: "reference" as const,
      slug: "cdsenseb-each-every",
      name: "Each, every, either, neither, none, many a: singular",
      intuition:
        "These words take the members of a group one at a time. 'Each student' means one student, then the next, then the next. So the verb is singular, even when a plural noun follows 'of'.",
      definition:
        "- These are **distributive** words: they deal with members one by one.\n" +
        "- **Each / every + singular noun**: singular verb. 'Every room **has** a fan.'\n" +
        "- **Each of / either of / neither of / every one of + plural noun**: still singular. 'Neither of the answers **is** right.'\n" +
        "- **Each and every**: singular.\n" +
        "- **Many a + singular noun**: singular verb. 'Many a soldier **has** died here.'\n" +
        "- **None**: this exam treats it as 'not one' and wants a singular verb: 'None of these problems **is** more serious.' Everyday English often uses 'are'; on this paper, use 'is'.\n" +
        "- A verb in a 'that' or 'who' part after these words is singular too: 'each and every thing that **is** connected with drama'.",
      table: {
        columns: ["Word or pattern", "Verb", "Correct example", "Tested in"],
        rows: [
          {
            cells: ["Each + singular noun", "Singular", "Each new player gets a kit.", "2017 (II), 2024 (I)"],
            pyqExampleId: "580f6616-300c-4429-bc83-d36d526cb628",
          },
          {
            cells: ["Each one of + plural noun", "Singular", "Each one of these bulbs is fused.", "2019 (I)"],
            pyqExampleId: "1c1e8242-065e-4295-afde-f4ce147c9f9f",
          },
          {
            cells: ["Each and every + noun", "Singular", "He loves each and every thing that is connected with drama.", "2018 (I)"],
            pyqExampleId: "19ba42ae-5272-4e6b-a1a1-e3cf11c4901b",
          },
          {
            cells: ["Every + noun", "Singular", "While every care has been taken, errors may remain.", "2019 (II)"],
            pyqExampleId: "22fc52b8-5c80-415f-a552-e0ea92ddba13",
          },
          {
            cells: ["Neither of + plural noun", "Singular", "Neither of the two answers is correct.", "2026 (II)"],
            pyqExampleId: "959fc9ac-3eb3-4a0f-9546-361d87de0773",
          },
          {
            cells: ["Many a + singular noun", "Singular", "Full many a flower is born to blush unseen.", "2022 (I)"],
            pyqExampleId: "f371b779-8ddc-4504-8ff5-f2a6ef4d42b7",
          },
          {
            cells: ["None of + plural noun", "Singular, by this exam's rule", "None of these problems is more serious than that one.", "2017 (I)"],
            noteAmber: "Everyday English often says 'none are'. This paper has marked 'none are' as the error.",
            pyqExampleId: "dcf654e1-d23f-4c27-8b29-4ab92afc25c2",
          },
        ],
        caption: "Each of these words is tested with a plural noun close to the verb. The plural noun is the bait.",
      },
      pyqExampleId: "bb626477-856a-4b84-adaf-d534cc3591d2",
      selfCheckExample: {
        prompt: item("Every one of the windows", "in the old hall", "were broken by the storm."),
        steps: [
          "The subject starts with 'Every one of': a distributive phrase, so it is singular.",
          "'The windows' and 'the old hall' are only the bait.",
          "So 'were' must be 'was'. The wrong word is in part (c).",
        ],
        answer: "(c). Every one of the windows in the old hall **was** broken by the storm.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Neither of the roads are safe at night.'", answer: "Neither of the roads **is** safe at night." },
        { prompt: "Correct it: 'Many a student have failed this test.'", answer: "Many a student **has** failed this test." },
        { prompt: "Choose: 'Each of the answers ___ two marks.' (carry / carries)", answer: "carries", method: "'Each of' is singular." },
        { prompt: "Correct it: 'Every boy and every girl were given a prize.'", answer: "Every boy and every girl **was** given a prize.", method: "'Every ... and every ...' stays singular." },
      ],
      traps: [
        {
          title: "The plural noun after 'of' does not decide",
          body: "In 'each of the ...', 'neither of the ...', 'every one of the ...', the verb follows 'each', 'neither' or 'one', not the plural noun beside it.",
        },
        {
          title: "'Many a' looks plural",
          body: "'Many' sounds plural, but 'many a flower' means one flower, many times over. It takes a singular noun and a singular verb.",
        },
        {
          title: "'None': follow the exam's rule",
          body: "Modern speakers often say 'none of them are'. This paper has marked that as wrong. When 'none' is the subject, choose 'is', 'was' or 'has'.",
        },
      ],
    },

    // C4 — joined subjects
    {
      kind: "formula" as const,
      slug: "cdsenseb-joined-subjects",
      name: "Joined subjects: either/or, neither/nor, as well as",
      intuition:
        "When two subjects are joined, ask how they are joined. 'And' adds them, so the verb is plural. 'Or' and 'nor' pick one of them, so the verb follows the one nearer to it. 'As well as', 'along with' and 'together with' only add a side remark, so the verb follows the first subject.",
      definition:
        "- **A and B**: plural verb. 'Ravi and his sister **are** here.'\n" +
        "- **Either A or B / Neither A nor B / Not only A but also B**: the verb agrees with **B**, the subject nearer to it. 'Either the teacher or the students **are** wrong.' 'Either the students or the teacher **is** wrong.'\n" +
        "- **A as well as B / A along with B / A together with B / A with B**: the verb agrees with **A**, the first subject. 'The captain, as well as his players, **was** praised.'\n" +
        "- Commas around a phrase are a signal: the words inside the commas are extra. The subject comes before the first comma.",
      authoredExample: {
        prompt: item("Neither the manager", "nor the clerks", "was present at the meeting."),
        steps: [
          "Read the whole sentence. Two subjects, 'the manager' and 'the clerks', are joined by **neither ... nor**.",
          "With neither/nor, the verb agrees with the subject nearer to it: 'the clerks', which is plural.",
          "Parts (a) and (b) are correct. The verb 'was' in part (c) does not match 'clerks'.",
        ],
        answer: "(c). Neither the manager nor the clerks **were** present at the meeting.",
      },
      selfCheckExample: {
        prompt: item("The teacher, along with", "her thirty pupils,", "were visiting the museum."),
        steps: [
          "'Along with her thirty pupils' sits between commas: it is a side remark.",
          "The subject is 'The teacher', singular.",
          "So 'were' must be 'was'. The wrong word is in part (c).",
        ],
        answer: "(c). The teacher, along with her thirty pupils, **was** visiting the museum.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Either you or he are to blame.'", answer: "Either you or he **is** to blame.", method: "Nearer subject 'he' is singular." },
        { prompt: "Correct it: 'The minister, together with his aides, have arrived.'", answer: "The minister, together with his aides, **has** arrived.", method: "'Together with' does not add: the first subject decides." },
        { prompt: "Correct it: 'Neither the chairs nor the table are clean.'", answer: "Neither the chairs nor the table **is** clean.", method: "Nearer subject 'the table' is singular." },
        { prompt: "Correct it: 'My father and my uncle is coming.'", answer: "My father and my uncle **are** coming.", method: "'And' adds two people: plural." },
      ],
      pyqExampleId: "67906b91-1eda-4785-9ad8-ced3b0336cd4",
      traps: [
        {
          title: "The two rules point in opposite directions",
          body: "Either/or and neither/nor look at the **second** subject. As well as, along with and together with look at the **first**. Mixing them up gives exactly the wrong verb.",
        },
        {
          title: "The same frame can need 'is' or 'are'",
          body: "The exam has tested either/or in both directions: once with the plural subject second (verb 'are') and once with the singular subject second (verb 'is'). Never learn 'either/or takes a singular verb'. Look at which subject is nearer.",
        },
        {
          title: "Only 'and' makes a plural",
          body: "'The principal, as well as the teachers, **was** at the gate' is singular, even though more than one person is named. 'With', 'besides' and 'as well as' never add subjects together.",
        },
      ],
    },

    // C5 — one of the + plural noun
    {
      kind: "formula" as const,
      slug: "cdsenseb-one-of",
      name: "'One of the + plural noun' and the relative clause after it",
      intuition:
        "'One of the best players' picks one person out of a group, so the group must be plural: players. When a 'who' or 'that' clause follows, it usually describes the whole group, not the one. So the verb in that clause is plural too.",
      definition:
        "- **One of the + plural noun**: 'one of the tallest buildings', never 'one of the tallest building'. Do not drop 'of' or 'the' either.\n" +
        "- The **main verb** agrees with 'one': 'One of my friends **lives** in Pune.'\n" +
        "- A **relative clause** is a group of words that starts with who, which or that and describes a noun. The noun it describes is its **antecedent**.\n" +
        "- After 'one of the + plural noun', the antecedent is the plural noun, so the verb in the relative clause is **plural**: 'one of the best speakers who **have** addressed us'.\n" +
        "- Exception: **the only one of ... who/that** takes a **singular** verb, because now the clause describes the one: 'the only one of the students who **has** passed'.",
      authoredExample: {
        prompt: item("Lata Mangeshkar was one of the", "finest singer", "India has ever produced."),
        steps: [
          "Read the whole sentence. 'One of the finest ...' picks one person out of a group.",
          "A group needs a plural noun, so 'singer' must be 'singers'.",
          "Part (a) is correct. 'India has ever produced' is correct: its subject is 'India'.",
          "The wrong word 'singer' is in part (b).",
        ],
        answer: "(b). Lata Mangeshkar was one of the finest **singers** India has ever produced.",
      },
      selfCheckExample: {
        prompt: item("This is one of the oldest", "temples that stands", "on the river bank."),
        steps: [
          "'One of the oldest temples' is correct: plural noun after 'one of the'.",
          "The clause 'that stands on the river bank' describes the temples, the whole group.",
          "So its verb must be plural: 'that stand'. The wrong word is in part (b).",
        ],
        answer: "(b). This is one of the oldest temples that **stand** on the river bank.",
      },
      practiceSet: [
        { prompt: "Correct it: 'He is one of the best batsman of his time.'", answer: "He is one of the best **batsmen** of his time." },
        { prompt: "Correct it: 'She is one of those people who never gives up.'", answer: "She is one of those people who never **give** up.", method: "'Who' refers to 'people', which is plural." },
        { prompt: "Correct it: 'He is the only one of the boys who have passed.'", answer: "He is the only one of the boys who **has** passed.", method: "'The only one' turns the clause back to the one." },
        { prompt: "Correct it: 'One of my friends live in Pune.'", answer: "One of my friends **lives** in Pune.", method: "The main verb agrees with 'one'." },
      ],
      pyqExampleId: "f5ccf9aa-4179-4221-9951-7d0e0ea136d6",
      traps: [
        {
          title: "Two verbs, two different subjects",
          body: "In 'One of the boys who **play** cricket **is** my cousin', the main verb follows 'one' (singular) and the clause verb follows 'boys' (plural). Check each verb separately.",
        },
        {
          title: "'The only one' flips the rule",
          body: "Add 'the only' and the clause now describes the single person: 'the only one of the girls who **has** won a medal'.",
        },
        {
          title: "Missing 'of' or a singular noun",
          body: "'One the most revered member' has two faults in one part: 'of' is missing and the noun must be plural, 'one **of** the most revered **members**'. The answer is the part that holds them.",
        },
      ],
    },
  ],
};
