import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PREP_TIME_PLACE_NOTE: SubtopicNote = {
  subtopicName: "Prepositions of Time, Place and Means",
  title: "Prepositions of time, place and means",
  oneLineDefinition:
    "Small words like at, on, in, by and until tell us when, where and how. Each one has a job, and the noun after the blank tells you which job is needed.",
  whyItMatters:
    "A blank before a time, a place or a vehicle is one of the most common one-mark items in the CDS English paper. " +
    "The rules are few and fixed, so these are marks you should never lose. The traps are the near-misses: in the morning but on Friday morning, by Monday but until Monday, beside but besides.",
  concepts: [
    // C1 — prepositions of time
    {
      kind: "formula" as const,
      slug: "cdsenprep-time",
      name: "At, on, in, by, until and during for time",
      intuition:
        "Think of time at three sizes. A point on the clock takes **at**. A whole day or date takes **on**. A longer stretch (part of the day, a month, a year, a season) takes **in**. " +
        "Then two words answer a different question: **by** gives a deadline, **until** says an action goes on up to a point.",
      definition:
        "The terms:\n" +
        "- **Preposition**: a small word placed before a noun to show time, place, direction or means (at, on, in, by).\n" +
        "- **Object of a preposition**: the noun or noun phrase that comes after it (at **night**, during **our holiday**).\n" +
        "- **Noun phrase vs clause**: a noun phrase has no verb of its own (our holiday). A clause has a subject and a verb (we were on holiday).\n" +
        "The rules:\n" +
        "- **at** + a point: at 6 p.m., at noon, at night.\n" +
        "- **on** + a day or date: on Monday, on 15 August. A part of a **named** day also takes on: on Monday morning, on the evening of 5 May.\n" +
        "- **in** + a part of the day, month, year or season: in the morning, in the afternoon, in May, in 2024, in winter.\n" +
        "- **by** + a deadline (no later than): by Friday, by 23rd September, by now.\n" +
        "- **until / till** + the point where a continuing action stops: away until Monday, working until 10:30 p.m.\n" +
        "- **during** + a noun phrase; **while** + a clause: during our holiday, while we were on holiday.\n" +
        "- **ago** counts back from now (fifteen years ago). **before** counts back from another past point.\n" +
        "- **on time** = punctually, at the planned time. **in time** = early enough.\n" +
        "Phrases tested this way:\n" +
        "- at night (2024 I); in the morning (2024 I); in the afternoon (2023 II); on Friday morning (2023 I)\n" +
        "- away until Monday (2023 I); working until 10:30 p.m. (2024 II)\n" +
        "- used by 23rd September (2024 II); received the dues by now (2022 II)\n" +
        "- during our holiday (2024 I); finish the work on time (2021 II); fifteen years ago (2022 I)",
      authoredExample: {
        prompt:
          "The library will stay open ______ midnight during the exam week. (a) by (b) until (c) on (d) at",
        steps: [
          "Look at the noun after the blank: midnight is a point of time.",
          "Ask what the sentence says about that point. 'Stay open' is an action that goes on and stops at midnight.",
          "An action that continues up to a point takes until. By would mean 'no later than', which suits a deadline, not a continuing action.",
          "On is for days and dates. At midnight would give the time it opens or closes, not how long it stays open.",
        ],
        answer: "(b) until: the library stays open up to midnight.",
      },
      selfCheckExample: {
        prompt:
          "You must submit the project ______ Monday; late entries will not be accepted. (a) until (b) by (c) in (d) at",
        steps: [
          "Monday is a day, but the sentence is about a deadline.",
          "'Late entries will not be accepted' means no later than Monday.",
          "A deadline takes by. Until would mean you keep submitting up to Monday, which makes no sense.",
        ],
        answer: "(b) by.",
      },
      practiceSet: [
        { prompt: "We usually go for a walk ______ the evening.", answer: "in", method: "a part of the day, not a named day" },
        { prompt: "The train leaves ______ half past six.", answer: "at", method: "a clock time is a point" },
        { prompt: "She was born ______ 2 October.", answer: "on", method: "a date takes on" },
        {
          prompt: "The phone rang ______ the film. (while / during)",
          answer: "during",
          method: "the film is a noun phrase; while needs a clause such as 'while we were watching the film'",
        },
      ],
      pyqExampleId: "29a7a3ba-defc-45ff-95f2-0e4d5c0ebcee",
      traps: [
        {
          title: "In the morning, but on Monday morning",
          body:
            "A part of the day alone takes **in** (in the morning). Once you name the day, the day wins and the phrase takes **on** (on Monday morning, on the night of the match). Students who learnt only 'in the morning' pick in here.",
        },
        {
          title: "By is a deadline; until is a duration",
          body:
            "**by Friday** = at any time up to Friday, but not later. **until Friday** = the action goes on all the way to Friday. 'He will be away until Monday' (he stays away the whole time). 'Return the book by Monday' (a deadline).",
        },
        {
          title: "During needs a noun, while needs a clause",
          body:
            "If the words after the blank have their own verb (we were travelling), use **while**. If they are only a noun phrase (the journey, our holiday), use **during**. The options often offer both.",
        },
        {
          title: "Ago, not before, when you count back from now",
          body:
            "'Ten years **ago**' is measured from today. 'Ten years **before**' needs another past event to count from: 'He had left ten years before the war.'",
        },
      ],
    },

    // C2 — prepositions of place
    {
      kind: "reference" as const,
      slug: "cdsenprep-place",
      name: "At, on, in and into for place, surface and direction",
      intuition:
        "Picture the place. If it is a point or a spot, use **at**. If something lies on a surface or a line (a wall, a board, a list), use **on**. If it is inside a space, use **in**. If something moves or changes into a new state, use **into**.",
      definition:
        "The rules:\n" +
        "- **at** + a point or a named spot: at the top of the page, at the door, at the university (as a place where you study).\n" +
        "- **on** + a surface or a line: on the wall, on the board, on a list. The Internet and a website also take on.\n" +
        "- **in** + an enclosed space: in the room, in the box, in the city.\n" +
        "- **into** + movement or change: walked into the room, translated into Hindi.\n" +
        "- Movement across or past takes **over**, **across**, **around**, **down**: cross over to the other side.",
      table: {
        columns: ["Phrase", "Why this preposition", "Sitting"],
        rows: [
          { cells: ["write your name **at** the top of the page", "the top is a point on the page", "2023 (I)"] },
          { cells: ["studying **at** the university", "an institution seen as a place you attend", "2023 (I)"] },
          { cells: ["a mark **on** the wall", "the mark sits on a surface", "2024 (I)"] },
          { cells: ["a name written **on** the board", "writing is on a surface", "2023 (II)"] },
          { cells: ["placed the elephant **on** the endangered list", "items are put on a list", "2024 (II)"] },
          { cells: ["available **on** the Internet", "the Internet is treated as a platform", "2026 (I), 2026 (II)"] },
          { cells: ["demonstrated **at** the Drop Zone", "a named spot where something happens", "2022 (II)"] },
          { cells: ["translated **into** many languages", "a change from one form to another", "2024 (I)"] },
          { cells: ["cross **over** to the other side of the river", "movement from one side to the other", "2025 (I)"] },
          {
            cells: ["hang out **down** the pier", "informal British use: down = along, at", "2023 (I)"],
            noteAmber: "In everyday English 'on the pier' or 'at the pier' is also common. When only 'down' fits among the options, choose it.",
          },
          {
            cells: ["loiter **around** the street", "loiter = wander about with no purpose; around shows aimless movement", "2021 (II)"],
            noteAmber: "'Loiter in the street' and 'on the street' are also good English. Read all four options: if two seem right, pick the one that best shows movement here and there.",
          },
        ],
        caption: "Point = at, surface = on, inside = in, movement into = into.",
      },
      pyqExampleId: "bef5925d-94bb-4030-b946-7e6ced960326",
      selfCheckExample: {
        prompt: "The poster is stuck ______ the door of the classroom. (a) in (b) at (c) on (d) into",
        steps: [
          "A poster is stuck flat on something.",
          "The door is a surface here, not a point and not a space.",
          "A surface takes on.",
        ],
        answer: "(c) on.",
      },
      practiceSet: [
        { prompt: "My brother works ______ a bank in Pune. (at / on)", answer: "at", method: "a workplace seen as a place you go to" },
        { prompt: "The keys are ______ the drawer.", answer: "in", method: "inside an enclosed space" },
        { prompt: "She jumped ______ the pool.", answer: "into", method: "movement from outside to inside" },
        { prompt: "I read the news ______ a website.", answer: "on", method: "websites and the Internet take on" },
      ],
      traps: [
        {
          title: "In or into?",
          body:
            "**in** tells where something is; **into** tells where it goes. 'He is in the room' but 'He walked into the room'. A change of form also takes into: translated **into** French, turned **into** ice.",
        },
        {
          title: "The Internet takes on, not in",
          body:
            "We say **on** the Internet, **on** a website, **on** TV, **on** the radio. 'In the Internet' looks logical but is wrong.",
        },
        {
          title: "Writing goes on a surface",
          body:
            "Words, marks and posters are **on** a wall, board or list. 'In the board' is wrong unless something is inside the wood.",
        },
      ],
    },

    // C3 — prepositions of means
    {
      kind: "reference" as const,
      slug: "cdsenprep-means",
      name: "By, in and with for travel, payment and means",
      intuition:
        "**by** names the general method (by bus, by train, by cheque) and takes no article. Once you talk about one particular vehicle (my car, Mr. Rao's car), you are sitting inside it, so the phrase takes **in**, or **on** for a bus or train you board.",
      definition:
        "The rules:\n" +
        "- **by** + vehicle with no article = the means of travel: by bus, by train, by air. But **on foot**.\n" +
        "- **in** + a particular car or taxi: in my car, in Mr. Rao's car, in a taxi.\n" +
        "- **on** + a particular bus, train, plane or bike: on the 7:15 train, on his bike.\n" +
        "- **by** + payment with no article: by cheque, by credit card. 'With a credit card' needs the article.\n" +
        "- **by means of** + the thing used to do something: by means of a ladder.\n" +
        "- **along with** = together with, in the company of.",
      table: {
        columns: ["Phrase", "Use it for", "Sitting"],
        rows: [
          { cells: ["travelled **in** Mr. Joshi's car / **in** Mr. Barthwal's car", "one particular, named car", "2021 (II), 2022 (I)"] },
          { cells: ["came home **by** train", "the general means of travel, no article", "2022 (I)"] },
          { cells: ["goes to work **by** bus", "the general means of travel, no article", "2024 (I)"] },
          { cells: ["pay **by** credit card", "the means of payment, no article", "2026 (II)"] },
          { cells: ["**By means of** rope ladders they scaled the wall", "the tool used to do something", "2023 (II)"] },
          { cells: ["come **along with** you", "together with a person", "2022 (II)"] },
        ],
        caption: "By + a bare noun for the method; in or on + a particular vehicle.",
      },
      pyqExampleId: "3bb59f28-ceb6-46d7-aee6-08c951ad7d37",
      selfCheckExample: {
        prompt: "We crossed the river ______ boat and then walked to the village. (a) in (b) by (c) with (d) on",
        steps: [
          "There is no article: just 'boat'. That is the general means of travel.",
          "The general means takes by: by boat, like by bus or by train.",
        ],
        answer: "(b) by.",
      },
      practiceSet: [
        { prompt: "I go to school ______ foot.", answer: "on", method: "the one exception: on foot, never by foot" },
        { prompt: "He paid the fees ______ cheque.", answer: "by", method: "means of payment, no article" },
        { prompt: "She got ______ the 8 o'clock bus.", answer: "on", method: "a particular bus you board" },
        { prompt: "He cut the rope ______ a knife.", answer: "with", method: "with + a tool held in the hand" },
      ],
      traps: [
        {
          title: "By car, but in his car",
          body:
            "**by** works only with a bare noun: by car, by train. As soon as there is an article or an owner (the car, my car, Mr. Joshi's car), switch to **in** for a car and **on** for a bus or train.",
        },
        {
          title: "By way of is not by means of",
          body:
            "**by means of** = using. **by way of** = through, via, or as a form of ('by way of an apology'). A bare 'by way' without of is never complete.",
        },
        {
          title: "Pay by card, pay with a card",
          body:
            "Both are English, but they are built differently. **by** takes no article (pay by credit card). **with** needs one (pay with a credit card). If the blank is followed by a bare noun, choose by.",
        },
      ],
    },

    // C4 — confusable pairs
    {
      kind: "reference" as const,
      slug: "cdsenprep-pairs",
      name: "Confusable pairs: between and among, beside and besides",
      intuition:
        "**between** sees each item one by one, so it works for named items, even more than two. **among** sees a crowd or a group as one mass. **beside** (no s) is about position: next to. **besides** (with s) is about adding: in addition to.",
      definition:
        "The rules:\n" +
        "- **between** + items named or seen one by one: between you and me; between India, Nepal and Bhutan.\n" +
        "- **among** + a group seen as a mass: among the students, divided among his children.\n" +
        "- **beside** = next to, at the side of: sit beside me.\n" +
        "- **besides** = in addition to, as well as: besides hockey, he plays cricket.\n" +
        "- **aside** is an adverb (step aside); it takes no object.",
      table: {
        columns: ["Word", "Meaning", "Tested in", "Sitting"],
        rows: [
          { cells: ["**among**", "shared out within a group", "property divided among his daughters and sons", "2017 (II)"] },
          { cells: ["**between**", "items named one by one, however many", "a country lying between four named neighbours", "2026 (II)"] },
          { cells: ["**beside**", "next to", "He sat beside her all night.", "2026 (II)"] },
          {
            cells: ["**beside**", "next to", "Sit here beside me.", "2021 (II)"],
            noteAmber: "'Sit here by me' is also natural English. Beside is the exact word for 'next to'.",
          },
          { cells: ["**besides**", "in addition to", "What other sport do you play besides hockey?", "2026 (I)"] },
        ],
        caption: "Beside = next to. Besides = as well as.",
      },
      pyqExampleId: "8513fad0-64b2-4f28-a579-e1fa57f3a149",
      selfCheckExample: {
        prompt: "______ English, she speaks French and Tamil. (a) Beside (b) Besides (c) Aside (d) Between",
        steps: [
          "The sentence lists languages she speaks in addition to English.",
          "'In addition to' is besides, with an s.",
          "Beside would mean she speaks next to English, which is nonsense.",
        ],
        answer: "(b) Besides.",
      },
      practiceSet: [
        { prompt: "The ball stopped ______ the two chairs.", answer: "between", method: "two items seen one by one" },
        { prompt: "There was little agreement ______ the members of the large committee.", answer: "among", method: "a group seen as a mass" },
        { prompt: "The lamp stands ______ the bed.", answer: "beside", method: "position: next to" },
        { prompt: "Who ______ you knew the answer?", answer: "besides", method: "apart from you, in addition to you" },
      ],
      traps: [
        {
          title: "Between is not only for two",
          body:
            "The school rule 'between for two, among for more' is too simple. When the items are **named** one by one, between is correct for any number. Among is for a group you do not separate.",
        },
        {
          title: "One letter changes the meaning",
          body:
            "**beside** = next to; **besides** = in addition to. If the sentence talks about 'other' things (other sports, other languages), you need besides.",
        },
        {
          title: "Aside cannot take an object",
          body: "**aside** stands alone (put it aside). 'Sat aside her' is wrong; use beside her.",
        },
      ],
    },
  ],
};
