import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_CHARACTER_NOTE: SubtopicNote = {
  subtopicName: "Idioms: People and Character",
  title: "Idioms for people and character",
  oneLineDefinition:
    "Idioms that label a kind of person: shy, cowardly, firm, honest, dishonest, disloyal or out for themselves.",
  whyItMatters:
    "Character idioms are a steady part of the CDS idiom set. Many of them are labels for a person ('a turncoat', 'a paper tiger'), so the right option describes someone, while wrong options describe an action or a thing. " +
    "The largest group here is about deceit and self-interest, where the options differ in the exact kind of dishonesty.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsenid-people",
      name: "Kinds of people",
      intuition:
        "Many idioms are labels: 'a shrinking violet' is a shy person, 'a paper tiger' only looks strong. " +
        "Ask two things. Is the label praise or criticism? And what single quality does the picture stand for?",
      definition:
        "How to read a label idiom:\n" +
        "- A **label idiom** names a type of person, so the answer describes a person, not an action.\n" +
        "- Find the one quality the picture shows: a violet is small and hidden (shy); a tiger made of paper cannot hurt anyone (not really powerful).\n" +
        "- Decide praise or criticism first: a culture vulture loves the arts; a laughing stock is mocked.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["A culture vulture", "Someone very keen on art, music and literature", "Someone who defends ancient culture", "2019 (I)"],
            pyqExampleId: "d363752d-8ecd-4828-9b68-2d029408efb3",
          },
          {
            cells: ["A rotten apple", "One bad person who spoils a good group", "A disorganised person with bad habits", "2019 (I)"],
            pyqExampleId: "1b5e8811-9e89-4b04-8403-e52c23a04803",
          },
          {
            cells: ["Blue blood", "Someone from a noble or very high-class family", "To suddenly become jealous", "2019 (I)"],
            pyqExampleId: "8457a667-d875-416a-bb76-4ab43891334a",
          },
          {
            cells: ["A shrinking violet", "A very shy person", "A lean person", "2019 (II)"],
            pyqExampleId: "a499b455-bd59-4ff6-9c0e-881f119e320b",
          },
          {
            cells: ["A laughing stock", "Someone everyone mocks for doing something foolish", "To laugh at someone secretly", "2023 (I)"],
            pyqExampleId: "e24abb1c-23de-4a76-bf78-3845fadaead7",
          },
          {
            cells: ["Like a shag on a rock", "Completely alone", "Completely idle", "2019 (II)"],
            noteAmber: "A shag is a seabird often seen standing alone on a rock.",
            pyqExampleId: "43127dcc-7b94-47fb-9254-c8408dcaf00f",
          },
          {
            cells: ["A paper tiger", "Someone or something that looks powerful or threatening but is weak", "Someone who acts like a tiger", "2020 (I), 2021 (II)"],
            noteAmber: "Asked twice. Paper looks like a tiger but cannot bite.",
            pyqExampleId: "dfb7ca2e-b3a5-4085-a330-7de15446f3ab",
          },
        ],
      },
      pyqExampleId: "1b5e8811-9e89-4b04-8403-e52c23a04803",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'A dark horse'. (a) a wicked person (b) a person who surprises everyone with a hidden talent (c) a fast runner (d) a sad person",
        steps: [
          "It is a label, so the answer describes a person. All four do, so check the quality.",
          "In a race, a dark horse is one nobody knew much about, who then does well.",
          "'Dark' is not evil here: it means unknown. So (a) goes, and (c) and (d) miss the surprise.",
        ],
        answer: "(b) a person who surprises everyone with a hidden talent.",
      },
      practiceSet: [
        { prompt: "Praise or criticism: 'a laughing stock'?", answer: "Criticism: the person is mocked." },
        { prompt: "Which idiom in the table names a very shy person?", answer: "A shrinking violet" },
        { prompt: "'Blue blood' tells you what about a person?", answer: "Their family: noble or of high social class" },
        {
          prompt: "Spot the wrong row: 'A paper tiger' = a person who campaigns to protect tigers.",
          answer: "Wrong. It is someone or something that looks powerful but is weak.",
        },
      ],
      traps: [
        {
          title: "A label wants a person, not an action",
          body:
            "**Blue blood** names a kind of person, yet its wrong options were actions ('to swallow poison', 'to suddenly become jealous'). If the idiom is a noun for a person, the answer should be too.",
        },
        {
          title: "The laughing stock is the one laughed at",
          body:
            "**A laughing stock** is the person everyone mocks. 'To laugh at someone secretly' turns them into the one who laughs. Check who does what.",
        },
        {
          title: "Shrinking is not about size",
          body:
            "**A shrinking violet** is shy: it shrinks back from people. 'A lean person' reads 'shrinking' as getting thinner.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-courage",
      name: "Courage, conviction and conscience",
      intuition:
        "These idioms judge a person's backbone: brave or cowardly, firm or easily moved, honest or flawed. " +
        "The liver was once thought to hold a person's courage, so a liver as pale as a lily belongs to a coward.",
      definition:
        "The groups:\n" +
        "- **Cowardice:** lily-livered.\n" +
        "- **Firm belief:** dyed in the wool (fixed in your views).\n" +
        "- **Hidden weakness:** feet of clay (a hidden fault in a respected person).\n" +
        "- **Honesty:** the straight and narrow (an honest, moral way of life).\n" +
        "- **Facing pain:** bite the bullet (accept something unpleasant and get on with it).\n" +
        "- **Your own rules:** a law unto yourself (behave in your own unpredictable way).",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Lily-livered", "Cowardly; not brave", "Weak", "2020 (I), 2026 (II)"],
            noteAmber: "Asked twice. The 2026 (II) paper spells it 'Lilly-livered'; the usual spelling is lily-livered.",
            pyqExampleId: "737e78ae-246e-4100-a108-b605efd0d511",
          },
          {
            cells: ["Be a law unto yourself", "Act in your own way, ignoring rules and what others expect", "Abide by law and order", "2021 (I)"],
            pyqExampleId: "4a6b76d0-e41d-4bc0-9ee6-88ecbe1bc634",
          },
          {
            cells: ["Feet of clay", "A hidden fault in someone who is admired", "Slow in actions", "2022 (I)"],
            pyqExampleId: "7c922c99-2cb6-409d-a6e6-93bd18ab9001",
          },
          {
            cells: ["Dyed in the wool", "Firm and unchanging in your beliefs", "Adapting to conditions", "2025 (I)"],
            pyqExampleId: "176e9c17-3250-4f27-82e6-6a21949b208e",
          },
          {
            cells: ["The straight and narrow", "An honest, moral way of life", "To not deviate from one's goal", "2025 (I)"],
            pyqExampleId: "7d0218ca-d2fc-4a39-ae18-901f1c2f728b",
          },
          {
            cells: ["Bite the bullet", "Accept something unpleasant and face it bravely", "To be angry and unhappy", "2023 (I)"],
            pyqExampleId: "c0fda16f-1d7b-4698-b3b1-316d506446e1",
          },
        ],
      },
      pyqExampleId: "6dbdbf38-0e71-47b4-a5ee-11f37e34e2c1",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Stick to one's guns'. (a) keep weapons ready (b) attack first (c) hold firmly to one's opinion despite opposition (d) change one's mind quickly",
        steps: [
          "Group: this is about conviction, how firmly you hold a view.",
          "(a) and (b) are about real guns: out.",
          "(d) is the opposite of sticking. A soldier who stays at his gun does not give up his position.",
        ],
        answer: "(c) hold firmly to one's opinion despite opposition.",
      },
      practiceSet: [
        { prompt: "'Feet of clay' describes what in an admired person?", answer: "A hidden fault or weakness" },
        { prompt: "'Dyed in the wool': firm or changeable?", answer: "Firm and unchanging in belief" },
        { prompt: "Which idiom in the table means to accept something unpleasant bravely?", answer: "Bite the bullet" },
        {
          prompt: "Spot the wrong row: 'Be a law unto yourself' = obey the law strictly.",
          answer: "Wrong. It means to act in your own way, ignoring rules.",
        },
      ],
      traps: [
        {
          title: "Weak is not cowardly",
          body:
            "**Lily-livered** is about courage, not strength. A strong person can be a coward. 'Not brave' or 'cowardly' is the answer; 'weak' is the near miss.",
        },
        {
          title: "A law unto yourself ignores the law",
          body:
            "Every wrong option for **be a law unto yourself** was about obeying or making laws. The idiom means the reverse: you follow only your own rules.",
        },
        {
          title: "Morals, not goals",
          body:
            "**The straight and narrow** is an honest way of living. 'Not deviating from one's goal' and 'following the path society defines' keep the picture of a straight road but lose the moral meaning.",
        },
        {
          title: "Bite the bullet is acceptance",
          body:
            "**Bite the bullet** means to accept something hard and get on with it. It is not anger, and it is not eagerness ('start doing something in a very keen way').",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-deceit",
      name: "Deceit and self-interest",
      intuition:
        "These idioms describe someone who cheats, hides, dodges or acts for selfish gain. " +
        "The options usually include a near miss: a plain lie instead of false accounts, a hiding place instead of a hidden problem. Look for the exact kind of dishonesty.",
      definition:
        "The groups:\n" +
        "- **Fraud with money:** cook the books (falsify accounts), under the table (secret, illegal payments), feather your own nest (enrich yourself dishonestly).\n" +
        "- **Selfish motive:** have an axe to grind, cupboard love, change your tune, play to the gallery.\n" +
        "- **Dodging:** pass the buck (shift the blame), sweep under the carpet (hide a problem), play possum (pretend to be dead or asleep).\n" +
        "- **Disloyalty:** a turncoat (someone who changes sides).",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Cook the books", "Falsify an organisation's accounts", "To tell a false story", "2019 (I)"],
            pyqExampleId: "0f33721f-851e-47d6-83a3-c5e54354ca04",
          },
          {
            cells: ["Have an axe to grind", "Have a selfish aim or private motive", "An essential equipment for work", "2023 (I)"],
            pyqExampleId: "fe3d8420-61c1-4a4e-ad6c-8f4f71b19c2a",
          },
          {
            cells: ["Change your tune", "Change your opinion completely because it suits you", "To pretend to be very friendly", "2019 (I)"],
            pyqExampleId: "6b5005a3-1e4b-4214-b3ef-aca3304b6db8",
          },
          {
            cells: ["Cupboard love", "Love shown only to get something", "Innocent love", "2020 (II)"],
            pyqExampleId: "d7539dff-681d-4f63-aeb3-c10b38e63fe2",
          },
          {
            cells: ["Feather your own nest", "Make money for yourself by dishonest means", "Make one's lodgings comfortable", "2024 (I)"],
            pyqExampleId: "7fcb9fc5-8cb5-4e23-99a1-db2ea800529c",
          },
          {
            cells: ["Under the table", "Paid or received secretly and illegally", "Working undercover", "2021 (II)"],
            pyqExampleId: "668d95bc-e2e2-4cb9-b80d-f4aabff4068b",
          },
          {
            cells: ["Play possum", "Pretend to be dead or asleep", "Behave in a stupid way", "2026 (I)"],
            noteAmber: "The possum, an animal, lies still and plays dead when it is attacked.",
            pyqExampleId: "89e91523-21ca-4fcc-a30e-9fcfb8736fbd",
          },
          {
            cells: ["Sweep under the carpet", "Hide a problem and hope it will be forgotten", "Hide from general view", "2025 (II)"],
            pyqExampleId: "03ce20fb-ac8a-40af-b333-43c91e1cdb5e",
          },
          {
            cells: ["Pass the buck", "Shift the blame or responsibility to someone else", "To refuse money", "2026 (II)"],
            pyqExampleId: "b0a80363-7e26-4d79-a70d-aa2dc9a356c3",
          },
          {
            cells: ["Turncoat", "Someone who leaves one side to join the other", "A truly dishonest person", "2021 (II)"],
            pyqExampleId: "3fa65d17-d21f-48a3-9579-79e0506b00c1",
          },
          {
            cells: ["Play to the gallery", "Say or do things just to win people's praise", "To do something alone", "2023 (I)"],
            pyqExampleId: "971e1d2c-ec24-49bf-9c17-471893bc3361",
          },
        ],
      },
      pyqExampleId: "fe3d8420-61c1-4a4e-ad6c-8f4f71b19c2a",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Pull the wool over someone's eyes'. (a) keep someone warm (b) deceive someone (c) make someone sleep (d) praise someone",
        steps: [
          "Group: covering someone's eyes means stopping them from seeing the truth. This is deceit.",
          "(a) and (c) stay with the picture of wool and closed eyes: out.",
          "Praise (d) is not hiding anything.",
        ],
        answer: "(b) deceive someone.",
      },
      practiceSet: [
        { prompt: "Which idiom in the table means to shift the blame to someone else?", answer: "Pass the buck" },
        { prompt: "'Cook the books' is dishonesty with what?", answer: "Accounts: financial records" },
        { prompt: "'Sweep under the carpet': hide a person, or hide a problem?", answer: "Hide a problem" },
        {
          prompt: "Spot the wrong row: 'Turncoat' = someone skilled at altering coats.",
          answer: "Wrong. A turncoat is someone who leaves one side to join the other.",
        },
      ],
      traps: [
        {
          title: "A comfortable nest is the picture",
          body:
            "**Feather your own nest** means to make money for yourself dishonestly. 'To make one's lodgings comfortable' is the bird's nest read literally.",
        },
        {
          title: "What is hidden, and why",
          body:
            "**Sweep under the carpet** hides a **problem**, hoping it will be forgotten. 'Hide from general view' and 'maintain secrecy' miss both the problem and the hope.",
        },
        {
          title: "Too general to be right",
          body:
            "A **turncoat** changes sides. 'A truly dishonest person' is too broad: it fits many people who never change sides. The precise option wins.",
        },
        {
          title: "Buck is not money here",
          body:
            "In **pass the buck**, the buck was a marker passed to the next player at cards. 'To refuse money' reads it as the slang word for a dollar.",
        },
      ],
    },
  ],
};
