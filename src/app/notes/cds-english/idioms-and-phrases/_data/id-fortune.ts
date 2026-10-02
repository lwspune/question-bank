import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_FORTUNE_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Trouble and Success",
  title: "Idioms for trouble, risk, failure and success",
  oneLineDefinition:
    "Idioms for being in trouble, making it worse, taking risks, failing or giving up, and doing well.",
  whyItMatters:
    "This is the largest family of meanings in the CDS idiom set. Trouble idioms test whether a problem is hard, is getting worse, or is being avoided. " +
    "Failure idioms test whether something ends, weakens or is missed; success idioms test value and good fortune.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsenid-trouble",
      name: "Trouble and making it worse",
      intuition:
        "Trouble idioms differ in what is happening to the trouble. It exists (in the soup), it is hard to handle (a hot potato, a Gordian knot), someone starts it (open a can of worms), everyone avoids it (the elephant in the room), or it gets worse (a turn of the screw, a twist of the knife).",
      definition:
        "Ask what is happening to the problem:\n" +
        "- **You are in it:** be in the soup, be in the same boat (with others), be under a cloud (suspected).\n" +
        "- **It is hard to handle:** a hot potato, a Gordian knot.\n" +
        "- **Someone starts it:** open a can of worms.\n" +
        "- **Everyone avoids it:** the elephant in the room, cut and run.\n" +
        "- **It gets worse:** a turn of the screw, a twist of the knife.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["A hot potato", "An issue so disputed or awkward that people avoid handling it", "Someone who is very angry", "2018 (I), 2023 (I)"],
            noteAmber: "Asked twice. Like a hot potato in the hand, it is hard to hold and everyone wants to pass it on.",
            pyqExampleId: "50319245-3672-49a2-aff1-12d5ff52958f",
          },
          {
            cells: ["A Gordian knot", "A very difficult problem", "Undoable job", "2019 (II)"],
            noteAmber: "Difficult, not impossible: in the legend, Alexander the Great cut the knot.",
            pyqExampleId: "f25bae6c-e839-460c-9bbb-8a6878eb5db1",
          },
          {
            cells: ["Be in the soup", "Be in trouble", "To be very healthy", "2023 (I)"],
            pyqExampleId: "bd84e909-fb75-4261-b894-e56d46c05b76",
          },
          {
            cells: ["Open a can of worms", "Start something that leads to many new problems", "To create suspense about how things will turn out", "2026 (I)"],
            pyqExampleId: "a97976c6-5740-4f90-9296-0b6f04c23351",
          },
          {
            cells: ["The elephant in the room", "An obvious problem that everyone avoids talking about", "The important topic", "2024 (I)"],
            pyqExampleId: "c3fb53be-7893-49a9-ae27-ee2c395a78a1",
          },
          {
            cells: ["Be under a cloud", "Be under suspicion", "To be filled with gloom", "2026 (I)"],
            pyqExampleId: "fc302dd1-d819-4101-b570-c20a21f59b0b",
          },
          {
            cells: ["A turn of the screw", "An act that makes a bad situation worse", "To become unpopular", "2023 (I)"],
            pyqExampleId: "282c8cd0-d850-4be2-abbb-0f1d4d0c7bb6",
          },
          {
            cells: ["A twist of the knife", "Words or acts that make someone who already feels bad feel worse", "The last thrust of a difficult operation", "2025 (II)"],
            pyqExampleId: "9442d18f-131a-4418-85aa-783d854e2540",
          },
          {
            cells: ["Cut and run", "Escape a difficult situation by leaving suddenly", "To meet some danger suddenly", "2020 (II)"],
            pyqExampleId: "c3ae30d2-55d5-4440-b56b-ff1ef396733c",
          },
          {
            cells: ["Be in the same boat", "Be in the same difficult situation as others", "To do something that is dangerous", "2024 (II)"],
            pyqExampleId: "d5ec1a5a-2c78-40e2-aec5-94539a60cc8e",
          },
        ],
      },
      pyqExampleId: "a97976c6-5740-4f90-9296-0b6f04c23351",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'In a tight spot'. (a) in a small room (b) in a difficult situation (c) very well organised (d) very angry",
        steps: [
          "Ask what is happening: the person is in some kind of trouble.",
          "(a) takes 'tight' as small in size: that is the picture.",
          "Being organised is pleasant, and anger is a feeling, not a situation.",
        ],
        answer: "(b) in a difficult situation.",
      },
      practiceSet: [
        { prompt: "'The elephant in the room' is a problem that is what?", answer: "Obvious, but everyone avoids talking about it" },
        { prompt: "'Be under a cloud': sad, or suspected?", answer: "Suspected" },
        { prompt: "Which two idioms in the table describe making a bad situation worse?", answer: "A turn of the screw; a twist of the knife" },
        {
          prompt: "Spot the wrong row: 'Be in the same boat' = to do something dangerous.",
          answer: "Wrong. It means to be in the same difficult situation as others.",
        },
      ],
      traps: [
        {
          title: "A cloud of suspicion, not of gloom",
          body:
            "**Be under a cloud** means people suspect you of something. 'Filled with gloom' sounds right because clouds are dark, but the cloud here is suspicion.",
        },
        {
          title: "Difficult is not impossible",
          body:
            "**A Gordian knot** is a very difficult problem. 'Undoable job' goes too far, and 'a different problem' is a misreading of 'difficult'.",
        },
        {
          title: "The avoiding is the point",
          body:
            "**The elephant in the room** is not just an important topic. It is an obvious problem that nobody will mention. An option without the avoiding is incomplete.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-failure",
      name: "Risk, failure and endings",
      intuition:
        "Read these as the stages of a story. You take a risk (sail close to the wind, overplay your hand), or you act early or carefully to avoid harm (nip in the bud, tread on eggshells). " +
        "Then things end or fade: a death blow, falling by the wayside, being in eclipse, being put out to pasture, a ship that has sailed.",
      definition:
        "The stages:\n" +
        "- **Risk:** sail close to the wind (do something dangerous), overplay your hand (spoil your chances through overconfidence), cut your own throat (harm your own interests).\n" +
        "- **Care:** nip in the bud (stop a problem while it is small), tread on eggshells (be very careful what you say and do).\n" +
        "- **Decline and endings:** a death blow, be in eclipse, fall by the wayside, put out to pasture, the ship has sailed.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Sail close to the wind", "Do something risky, close to being dangerous or illegal", "To be in some unpleasant situation", "2019 (I)"],
            pyqExampleId: "0f00a9eb-9c64-493a-82a1-f713a1709b79",
          },
          {
            cells: ["Tread on eggshells", "Be very careful in what you say and do", "Making the best bets in one's trade", "2022 (I)"],
            noteAmber: "Also asked as 'walking on eggshells' in 2024 (I).",
            pyqExampleId: "2f89e5da-b5ad-48e4-920b-9156ec560385",
          },
          {
            cells: ["Nip in the bud", "Stop a small problem before it grows", "Prevent the big problems", "2019 (II)"],
            pyqExampleId: "697a68ba-7af1-4219-b089-0dcb3cef1303",
          },
          {
            cells: ["A death blow", "An event that makes something fail or end", "To be nearly dead", "2019 (I)"],
            pyqExampleId: "03121ba8-fc5a-4b11-b7a4-0f24fbf22fb1",
          },
          {
            cells: ["Cut your own throat", "Harm your own interests by your own actions", "To behave in a relaxed manner", "2019 (I)"],
          },
          {
            cells: ["Be in eclipse", "Be less successful or less famous than before", "Very successful", "2021 (I)"],
            pyqExampleId: "98a8fb66-5156-4cda-8482-73d50b79a577",
          },
          {
            cells: ["Overplay your hand", "Spoil your chances by being too confident", "To play card games for too long", "2026 (II)"],
            pyqExampleId: "04ad866b-e01a-4653-af49-512378f2ea1f",
          },
          {
            cells: ["Fall by the wayside", "Drop out of an effort before the end", "To lose one's sense of direction", "2026 (II)"],
            pyqExampleId: "dceb5d92-7d11-458d-88e3-a6c7184c20f6",
          },
          {
            cells: ["Put out to pasture", "Retire someone, or treat them as no longer useful", "To feed someone", "2025 (II)"],
            noteAmber: "An old farm horse that can no longer work is put out to pasture to graze.",
            pyqExampleId: "77152a56-7f0c-495a-8abf-a7244aa4f0fe",
          },
          {
            cells: ["The ship has sailed", "The chance has passed", "The matter is decided", "2024 (I)"],
            pyqExampleId: "bb70ba99-e5b4-4e1f-9cec-eb21eba18e5b",
          },
        ],
      },
      pyqExampleId: "dceb5d92-7d11-458d-88e3-a6c7184c20f6",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Throw caution to the wind'. (a) warn others of danger (b) act boldly without caring about the risk (c) stay indoors in a storm (d) lose something valuable",
        steps: [
          "Stage: this is about risk.",
          "(c) is the weather picture: out.",
          "You throw your caution away, so you stop being careful. Warning others is the opposite, and nothing is lost.",
        ],
        answer: "(b) act boldly without caring about the risk.",
      },
      practiceSet: [
        { prompt: "'Nip in the bud': stop a problem early, or late?", answer: "Early, while it is still small" },
        { prompt: "'The ship has sailed' means what has passed?", answer: "The chance" },
        { prompt: "Which idiom in the table means to retire someone as no longer useful?", answer: "Put out to pasture" },
        {
          prompt: "Spot the wrong row: 'Be in eclipse' = be very successful.",
          answer: "Wrong. It means to be less successful than before.",
        },
      ],
      traps: [
        {
          title: "Small and early",
          body:
            "**Nip in the bud** means to stop a problem while it is still **small**. 'Prevent the big problems' loses both the size and the timing.",
        },
        {
          title: "A missed chance, not a decision",
          body:
            "**The ship has sailed** means the chance has gone. 'The matter is decided' sounds final too, but the idiom is about an opportunity, not a ruling.",
        },
        {
          title: "Eclipse is a fall, not a defeat",
          body:
            "Something **in eclipse** is less successful or less famous than before. It has faded, not been beaten outright, so 'being defeated' is too strong.",
        },
        {
          title: "Cards are only the picture",
          body:
            "To **overplay your hand** is to spoil your chances through overconfidence. 'Playing card games for too long' keeps the card-table picture.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-success",
      name: "Success and value",
      intuition:
        "Success idioms praise a time, a thing or a chance: a great run of form (a purple patch), the best part of something (the jewel in the crown), a prized goal (the Holy Grail), wide opportunity (the world is your oyster).",
      definition:
        "The groups:\n" +
        "- **Doing well:** a purple patch, rise to the occasion.\n" +
        "- **Value:** the jewel in the crown, the Holy Grail, the best of both worlds.\n" +
        "- **Opportunity:** the world is your oyster.\n" +
        "- **Getting things going:** prime the pump (act to help something start or succeed).",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["The Holy Grail", "Something very important that people try hard to get", "The pious place of worship", "2018 (I)"],
            pyqExampleId: "1db6e92b-c25b-488b-9785-7695a628a883",
          },
          {
            cells: ["The best of both worlds", "All the advantages of two different things at once", "Someone whom everybody likes", "2018 (I)"],
            pyqExampleId: "4dfde240-19d4-47d0-8397-e9c247165fd2",
          },
          {
            cells: ["The jewel in the crown", "The most valuable part of something", "Someone who has many skills", "2019 (I)"],
            pyqExampleId: "eb2ed3c8-8390-4ea4-bb5e-48b8a4634fc9",
          },
          {
            cells: ["Rise to the occasion", "Deal well with a difficult situation", "To celebrate a success in a difficult situation", "2020 (I)"],
            pyqExampleId: "89912e9d-c880-4646-9bf8-b90062ad001f",
          },
          {
            cells: ["Prime the pump", "Do something to help an activity start or succeed", "To do good things to succeed in life", "2020 (I)"],
            pyqExampleId: "2ea2e65b-de01-41e8-bf51-eb00e7fe362e",
          },
          {
            cells: ["A purple patch", "A period of great success or good form", "The final bloom of the season", "2025 (II)"],
            pyqExampleId: "c8141626-0679-41f2-bf7e-5241a0852613",
          },
          {
            cells: ["The world is your oyster", "You have every chance to get what you want from life", "Life is a precious gift", "2025 (I)"],
            pyqExampleId: "8e1634fa-7790-46f3-b4d2-a19c0a292a21",
          },
        ],
      },
      pyqExampleId: "c8141626-0679-41f2-bf7e-5241a0852613",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'The cream of the crop'. (a) a farm product (b) the richest person in a village (c) the best of a group (d) the newest member of a team",
        steps: [
          "Group: this is about value.",
          "(a) is the farm picture: out.",
          "Cream rises to the top of milk, so it is the best part. Riches and newness are different qualities.",
        ],
        answer: "(c) the best of a group.",
      },
      practiceSet: [
        { prompt: "Which idiom in the table names the most valuable part of something?", answer: "The jewel in the crown" },
        { prompt: "'Rise to the occasion' means you do what?", answer: "Deal well with a difficult situation" },
        { prompt: "'The world is your oyster' says you have what?", answer: "Every opportunity to get what you want" },
        {
          prompt: "Spot the wrong row: 'Prime the pump' = do good things to succeed in life.",
          answer: "Wrong. It means to do something that helps an activity start or succeed.",
        },
      ],
      traps: [
        {
          title: "Succeed, not celebrate",
          body:
            "To **rise to the occasion** is to deal well with a hard situation. The wrong options celebrated a success, regretted a failure, or motivated others. Only dealing with it yourself fits.",
        },
        {
          title: "A specific act, not a way of life",
          body:
            "**Prime the pump** is one action that gets something going, like pouring water into a pump to start it. 'Doing good things to succeed in life' is too general.",
        },
        {
          title: "Religious picture, ordinary meaning",
          body:
            "**The Holy Grail** is any goal people want badly. 'A pious place of worship' reads the words literally.",
        },
      ],
    },
  ],
};
