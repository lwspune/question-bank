import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_SPEECH_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Speech and Opinion",
  title: "Idioms for speaking, listening and taking a view",
  oneLineDefinition:
    "Idioms about how people talk, how they listen, and how they give an opinion or make a decision.",
  whyItMatters:
    "Speech idioms test the exact manner of speaking: too much, too boastfully, too timidly, or letting a secret slip. Opinion idioms separate giving a view from making a decision and from refusing to decide. " +
    "Often all four options are about talking or thinking, so the small difference between them is the answer.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsenid-speech",
      name: "Ways of speaking",
      intuition:
        "All of these idioms are about talk, so most options will be about talk too. Ask three questions. Too much or too little? Boasting, hiding or revealing? Confident or timid?",
      definition:
        "The groups:\n" +
        "- **Too much:** verbal diarrhoea (talking far too much).\n" +
        "- **Skill:** the gift of the gab (the ability to speak easily and confidently).\n" +
        "- **Boasting:** blow your own trumpet.\n" +
        "- **Timid or evasive:** mealy-mouthed (afraid to say things plainly).\n" +
        "- **Revealing:** spill the beans (let a secret out).\n" +
        "- **Two meanings:** a double entendre (a word or phrase with two meanings).\n" +
        "- **Rude dismissal:** cut the crap (an impolite way to say 'stop talking nonsense').",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Verbal diarrhoea", "Talking far too much", "To be sick", "2019 (I)"],
            pyqExampleId: "c666e72f-c08f-4f03-bf0b-c31b8e885c9c",
          },
          {
            cells: ["A double entendre", "A word or phrase with two meanings", "Something with both advantages and problems", "2019 (I)"],
            pyqExampleId: "e7c55b3a-6855-400a-95b6-9520cd143c03",
          },
          {
            cells: ["Cut the crap", "A rude way to tell someone to stop saying untrue or useless things", "To talk about something important", "2019 (I)"],
            pyqExampleId: "f0ef6341-c93e-4d7d-bd9c-b0e02172306f",
          },
          {
            cells: ["The gift of the gab", "The ability to speak easily and confidently", "Ability to convince", "2023 (II)"],
            pyqExampleId: "e333450a-956b-421c-8870-e155bdcc7f07",
          },
          {
            cells: ["Blow your own trumpet", "Boast about your own achievements", "Be very loud in company", "2025 (II)"],
            pyqExampleId: "c8abfdf2-43b4-454b-809f-8e3d0cd58854",
          },
          {
            cells: ["Mealy-mouthed", "Not brave enough to say things plainly", "Habitually using harsh words", "2026 (I)"],
            pyqExampleId: "6ad84312-becc-40e3-9bcb-7fde539a0be0",
          },
          {
            cells: ["Spill the beans", "Let a secret out", "To let food go waste", "2026 (II)"],
            pyqExampleId: "64121f16-0cb3-4f50-ae9f-1180e0ff7846",
          },
        ],
      },
      pyqExampleId: "c8abfdf2-43b4-454b-809f-8e3d0cd58854",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Talk through one's hat'. (a) whisper secretly (b) speak politely (c) talk confidently about something one knows nothing about (d) boast about one's clothes",
        steps: [
          "Ask the speech questions: is it about the amount, the manner or the truth of what is said?",
          "(d) keeps the hat in the picture: out.",
          "The hat stands for empty talk: the speaker sounds sure but knows nothing. Whispering and politeness are not the point.",
        ],
        answer: "(c) talk confidently about something one knows nothing about.",
      },
      practiceSet: [
        { prompt: "'Mealy-mouthed': too timid, or too harsh?", answer: "Too timid to say things plainly" },
        { prompt: "Which idiom in the table means to let a secret out?", answer: "Spill the beans" },
        { prompt: "'The gift of the gab' is a skill in what?", answer: "Speaking easily and confidently" },
        {
          prompt: "Spot the wrong row: 'A double entendre' = something that brings both advantages and problems.",
          answer: "Wrong. It is a word or phrase with two meanings.",
        },
      ],
      traps: [
        {
          title: "The skill, not its result",
          body:
            "**The gift of the gab** is the ability to speak easily and confidently. Convincing people may follow from it, but 'ability to convince' names a result, not the skill. Writing and reading are not speech at all.",
        },
        {
          title: "Mealy-mouthed is soft, not harsh",
          body:
            "**Mealy-mouthed** people are too timid to speak plainly. 'Inflicting harsh words on others' is the opposite fault.",
        },
        {
          title: "Medical and food pictures",
          body:
            "**Verbal diarrhoea** is not an illness, and **spill the beans** has nothing to do with wasting food. The first is too much talk; the second is letting a secret out.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-opinion",
      name: "Opinions and decisions",
      intuition:
        "Several different acts hide in this group: giving a view (my two cents, say your piece, take a stand), making a decision (the ball is in your court), refusing to choose (sitting on the fence), and arguing a side you do not hold (playing devil's advocate). " +
        "Others weigh a choice (the pros and cons) or say the result is already certain (a foregone conclusion).",
      definition:
        "The groups:\n" +
        "- **Giving a view:** my two cents, say your piece, take a stand (publicly and firmly).\n" +
        "- **Showing disapproval by action:** vote with your feet (leave or stay away).\n" +
        "- **Not deciding:** sit on the fence.\n" +
        "- **Your turn to decide:** the ball is in your court.\n" +
        "- **Weighing:** the pros and cons (the good and bad points).\n" +
        "- **Certain result:** a foregone conclusion.\n" +
        "- **Testing an idea:** play devil's advocate (argue against it without really opposing it).",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["My two cents", "My opinion", "My money", "2018 (I)"],
            pyqExampleId: "72850976-493a-49f0-a377-1166e761b7cf",
          },
          {
            cells: ["Say your piece", "Say what you think", "Make your argument piece by piece", "2021 (II)"],
            pyqExampleId: "9da0d513-d21e-4cf6-8107-27c477ccf74d",
          },
          {
            cells: ["Take a stand", "State your view on something publicly and firmly", "To be firm on your work", "2020 (II)"],
            pyqExampleId: "0cbb63b4-c1ec-4de6-8eee-96e147a8a9ab",
          },
          {
            cells: ["Vote with your feet", "Show you do not support something by leaving or staying away", "To express a particular opinion", "2019 (I)"],
            pyqExampleId: "281c68aa-3c62-44f3-8910-84c506138586",
          },
          {
            cells: ["Sit on the fence", "Avoid taking a side or a decision", "Taking sides", "2023 (II)"],
            pyqExampleId: "ab6ef4a5-65e7-4fab-b3ca-0cf76e446201",
          },
          {
            cells: ["The ball is in your court", "It is your turn to decide or act", "Not speaking directly about an issue", "2018 (I)"],
            pyqExampleId: "1d40fee2-6bce-4139-aaf8-f147d4f0024b",
          },
          {
            cells: ["The pros and cons", "The good and bad points of something", "Like and dislike of a situation", "2020 (I)"],
            pyqExampleId: "aa9d4ee1-c279-4cac-a376-4be95720f76c",
          },
          {
            cells: ["A foregone conclusion", "A result that is certain before it happens", "An obvious speculation", "2022 (I)"],
            pyqExampleId: "819c6496-28bc-489d-8081-7a253cb90d1b",
          },
          {
            cells: ["Play devil's advocate", "Argue against an idea, without really opposing it, to test it", "To delay doing something", "2024 (II)"],
            pyqExampleId: "48108ad0-0675-4db3-9f0e-357d53935ea1",
          },
        ],
      },
      pyqExampleId: "0cbb63b4-c1ec-4de6-8eee-96e147a8a9ab",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Have second thoughts'. (a) think twice as fast (b) begin to doubt a decision already made (c) agree with everyone (d) forget a plan",
        steps: [
          "Group: this is about a decision.",
          "'Second' does not mean speed, so (a) goes.",
          "The first thought was the decision; the second thought questions it. Agreeing and forgetting do not question anything.",
        ],
        answer: "(b) begin to doubt a decision already made.",
      },
      practiceSet: [
        { prompt: "Giving a view, or refusing to decide: 'sitting on the fence'?", answer: "Refusing to decide" },
        { prompt: "'My two cents' offers what?", answer: "My opinion" },
        { prompt: "Which idiom in the table means a result is certain in advance?", answer: "A foregone conclusion" },
        {
          prompt: "Someone argues against a plan they actually like, to test it. Which idiom fits?",
          answer: "Play devil's advocate",
        },
      ],
      traps: [
        {
          title: "Sitting on the fence is the opposite of taking sides",
          body:
            "A person **sitting on the fence** will not choose. 'Taking sides' is the exact reverse, and it was one of the options.",
        },
        {
          title: "Voting with your feet is always disapproval",
          body:
            "**Vote with your feet** shows that you do **not** support something, by walking away. 'To express a particular opinion' is too general to be right.",
        },
        {
          title: "Points, not feelings",
          body:
            "**The pros and cons** are the good and bad points of a situation. 'Like and dislike' are a person's feelings about it, which is a different thing.",
        },
        {
          title: "The devil's advocate does not really oppose",
          body:
            "To **play devil's advocate** is to argue against an idea only to test it. If the option says the person truly wants to defeat it, it is wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-ears",
      name: "Listening and being talked about",
      intuition:
        "Ear idioms are about attention. Pinned-back ears listen hard; half an ear barely listens; flapping ears try to overhear; burning ears sense that others are talking about you.",
      definition:
        "The four, from most attention to the odd one out:\n" +
        "- **Pin back your ears:** listen carefully.\n" +
        "- **Listen with half an ear:** not pay full attention.\n" +
        "- **Someone's ears are flapping:** someone is trying to overhear.\n" +
        "- **Someone's ears are burning:** someone feels they are being talked about.",
      table: {
        columns: ["Idiom", "Meaning", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["Pin back your ears", "Listen carefully", "Keep yourself from hearing bad things", "2021 (II)"],
            pyqExampleId: "748c2f49-b7b1-44b8-aec6-1158a6cdd67a",
          },
          {
            cells: ["Listen with half an ear", "Not pay full attention", "Being impartial", "2025 (I)"],
            pyqExampleId: "eee78d34-07bd-490e-a58e-68d45e089aee",
          },
          {
            cells: ["Someone's ears are flapping", "Someone is trying to overhear a private talk", "Someone in a state of excitement", "2025 (II)"],
            pyqExampleId: "43a13f8e-52cb-4a87-9f9c-4abfcebc4cd4",
          },
          {
            cells: ["Someone's ears are burning", "Someone feels that others are talking about them", "Being jealous of others", "2025 (I)"],
            pyqExampleId: "1d2fe3de-9783-4ffe-9572-17f4fdc18cc6",
          },
        ],
      },
      pyqExampleId: "eee78d34-07bd-490e-a58e-68d45e089aee",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Fall on deaf ears'. (a) be ignored (b) be heard by people who cannot hear (c) be spoken loudly (d) be repeated many times",
        steps: [
          "Ear idioms are about attention. Here the words reach ears that take nothing in.",
          "(b) reads 'deaf' literally: out.",
          "Loudness and repetition do not say whether anyone listened.",
        ],
        answer: "(a) be ignored.",
      },
      practiceSet: [
        { prompt: "Full attention or little attention: 'pin back your ears'?", answer: "Full attention" },
        { prompt: "Which idiom in the table describes someone trying to eavesdrop?", answer: "Someone's ears are flapping" },
        { prompt: "Your ears are burning. What do you feel?", answer: "That others are talking about you" },
      ],
      traps: [
        {
          title: "Flapping and burning are different",
          body:
            "Ears that are **flapping** try to overhear others. Ears that are **burning** belong to the person being talked about. One listens in; the other is the topic.",
        },
        {
          title: "Half attention is not neutrality",
          body:
            "**Listen with half an ear** means you are not paying full attention. 'Being impartial' reads 'half' as taking neither side.",
        },
        {
          title: "No pins, no cleaning",
          body:
            "**Pin back your ears** means listen carefully. 'To clean your ears with a pin' is the picture read literally.",
        },
      ],
    },
  ],
};
