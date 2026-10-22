import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ID_MEANINGS_NOTE: SubtopicNote = {
  subtopicName: "Idiom Meanings",
  title: "Idiom Meanings",
  oneLineDefinition:
    "An idiom is a group of words whose meaning is not the meaning of its words, so 'smell a rat' means to suspect something wrong, not to notice a smell.",
  whyItMatters:
    "Twenty questions in the bank ask what an idiom means, seventeen of them EASY. The wrong options are built from the idiom's own words read literally, so the student who knows the idiom gets the mark in seconds and the one who reads the words falls for the trap.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spiidme-picture",
      name: "Read the picture, not the words",
      intuition:
        "An idiom paints a small picture, and the meaning comes from what the picture suggests. A burnt finger is the hurt you get from touching something you should not have touched. " +
        "So strike every option that reads the words as they stand, then pick the one that fits the picture and the sentence.",
      definition:
        "The method:\n" +
        "- Strike every option about the **literal** words: hats, rats, balls, ploughs, dice.\n" +
        "- Ask what the picture **suggests**, then check it against the rest of the sentence.\n" +
        "- The whole option must be right: a right meaning joined to a literal one is wrong.\n" +
        "Idioms whose words mislead:\n" +
        "- **a dime a dozen**: very common, of little value.\n" +
        "- **at the drop of a hat**: at once, without waiting.\n" +
        "- **smell a rat**: suspect that something is wrong.\n" +
        "- **put one's hand to the plough**: start work seriously.\n" +
        "- **the ball is in your court**: it is your turn to act or decide.\n" +
        "- **burn one's fingers**: suffer a loss, often of money, from a risky step.\n" +
        "- **look high and low**: search everywhere.\n" +
        "- **no dice**: no, it will not happen.\n" +
        "- **once in a blue moon**: very rarely.\n" +
        "- **a piece of cake**: something very easy.\n" +
        "- **under the weather**: slightly unwell.\n" +
        "- **hit the sack**: go to bed.",
      authoredExample: {
        prompt:
          "Choose the meaning: Ravi \\(\\underline{\\text{let the cat out of the bag}}\\) about his sister's surprise party. (a) freed a pet (b) told a secret by mistake (c) bought a new bag (d) lost his cat",
        steps: [
          "Options (a), (c) and (d) are about cats and bags, the literal words. Strike them.",
          "The picture: something hidden in a bag gets out.",
          "A surprise party is a secret, so the sentence agrees: he told the secret by mistake.",
        ],
        answer: "(b) told a secret by mistake",
      },
      selfCheckExample: {
        prompt:
          "Choose the meaning: The new phone sold \\(\\underline{\\text{like hot cakes}}\\). (a) very quickly (b) at a high price (c) in a bakery (d) very slowly",
        steps: [
          "A bakery is the literal reading. Strike it.",
          "Hot cakes are bought as soon as they come out, so the picture is of something selling fast.",
        ],
        answer: "(a) very quickly",
      },
      practiceSet: [
        { prompt: "What does 'once in a blue moon' mean?", answer: "very rarely" },
        {
          prompt: "What does 'a piece of cake' mean? (a) a dessert (b) something very easy (c) a small share (d) a reward",
          answer: "(b) something very easy",
        },
        {
          prompt:
            "Choose the meaning: Grandfather is feeling under the weather today. (a) cold because of the rain (b) slightly unwell (c) caught in a storm (d) very happy",
          answer: "(b) slightly unwell",
        },
        { prompt: "What does 'hit the sack' mean?", answer: "go to bed" },
      ],
      pyqExampleId: "8484eedf-48cc-40e9-8e24-8915bd89c020",
      traps: [
        {
          title: "The literal option is there on purpose",
          body:
            "An option about the idiom's own words (a hat that drops, a rat that smells, dice on a table) is a trap for the student who has not met the idiom. It is almost never the key.",
        },
        {
          title: "Half right is wrong",
          body:
            "An option that joins the true meaning to a literal one, such as 'willing to act at once, and something under a hat', is not the meaning. Choose the option that is right all the way through.",
        },
        {
          title: "No dice is not about money or games",
          body: "No dice simply means no: the request was refused, or the plan is not possible.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiidme-people",
      name: "Idioms about people",
      intuition:
        "Many idioms describe a kind of person or how people treat each other: an enemy who hides, a person of no worth, someone who speaks plainly. Learn each one with the person it describes.",
      definition:
        "How to use this table:\n" +
        "- Learn each idiom with its **charge**: a snake in the grass and a wet blanket blame; calling a spade a spade praises honesty.\n" +
        "- An option with the wrong charge can be struck at once.\n" +
        "- Some idioms are about **feelings between people**, not one person: bad blood is hatred between two sides.",
      table: {
        columns: ["Idiom", "Meaning"],
        rows: [
          { cells: ["a snake in the grass", "a hidden enemy who pretends to be a friend"] },
          { cells: ["a wolf in sheep's clothing", "a dangerous person who looks harmless"] },
          { cells: ["a man of straw", "a weak person of no real worth"] },
          { cells: ["call a spade a spade", "speak plainly and honestly"] },
          { cells: ["a white lie", "a small lie told to avoid hurting someone"] },
          { cells: ["bad blood", "hatred between people after a past quarrel"] },
          { cells: ["take someone to task", "scold someone for a fault"] },
          { cells: ["a wet blanket", "a person who spoils other people's fun"] },
          { cells: ["the black sheep", "a member who brings shame on a family or group"] },
          { cells: ["a fair-weather friend", "a friend only in good times"] },
        ],
      },
      pyqExampleId: "70b93eca-b201-4d8e-8e7f-5c7167e24feb",
      selfCheckExample: {
        prompt:
          "Choose the meaning: Everyone else wanted to dance, but Kiran was a \\(\\underline{\\text{wet blanket}}\\). (a) a person who spoils the fun (b) someone who has caught a cold (c) a shy dancer (d) a good singer",
        steps: [
          "A cold is the literal reading of 'wet'. Strike it.",
          "A wet blanket thrown on a fire puts it out. Kiran put out the fun.",
        ],
        answer: "(a) a person who spoils the fun",
      },
      practiceSet: [
        { prompt: "What is a fair-weather friend?", answer: "a friend only in good times" },
        { prompt: "Who is the black sheep of a family?", answer: "a member who brings shame on it" },
        {
          prompt:
            "Spot the wrong pair: white lie = a harmless lie; bad blood = hatred; man of straw = a strong leader; wet blanket = a spoilsport.",
          answer: "man of straw = a strong leader",
          method: "A man of straw is a weak person of no real worth.",
        },
        { prompt: "What is a wolf in sheep's clothing?", answer: "a dangerous person who looks harmless" },
      ],
      traps: [
        {
          title: "Bad blood is not an illness",
          body: "Bad blood means ill feeling between people, usually after a quarrel. It has nothing to do with health or an accident.",
        },
        {
          title: "A white lie is still a lie",
          body: "A white lie is small and kind, told to spare someone's feelings. An option calling it a true statement reverses its meaning.",
        },
        {
          title: "Taking to task is scolding",
          body: "To take someone to task is to scold them for a fault. It does not mean giving them a task or more work.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiidme-effort",
      name: "Idioms about effort, success and failure",
      intuition:
        "The other idioms describe how hard someone tries and how things turn out: fighting with all one's strength, getting ahead first, coming to nothing, or winning in the end.",
      definition:
        "Three groups to learn:\n" +
        "- **Effort**: fight tooth and nail, burn the midnight oil, leave no stone unturned.\n" +
        "- **How it ends**: steal a march on, have the last laugh, end in smoke, a blessing in disguise.\n" +
        "- **Attitude**: count your blessings, sit on the fence, turn over a new leaf.",
      table: {
        columns: ["Idiom", "Meaning"],
        rows: [
          { cells: ["fight tooth and nail", "fight with all one's strength"] },
          { cells: ["burn the midnight oil", "work or study late into the night"] },
          { cells: ["leave no stone unturned", "try every possible way"] },
          { cells: ["steal a march on someone", "get ahead of someone by acting first"] },
          { cells: ["have the last laugh", "succeed in the end after others doubted you"] },
          { cells: ["end in smoke", "come to nothing, fail completely"] },
          { cells: ["a blessing in disguise", "something good that first looked bad"] },
          { cells: ["count your blessings", "be thankful for the good things you have"] },
          { cells: ["sit on the fence", "not take sides, put off deciding"] },
          { cells: ["turn over a new leaf", "start behaving better"] },
        ],
      },
      pyqExampleId: "67f84ba1-a17a-487e-a6da-7c078c07cbb7",
      selfCheckExample: {
        prompt:
          "Choose the meaning: Before the board exams, Meera \\(\\underline{\\text{burnt the midnight oil}}\\) every night. (a) wasted fuel (b) studied late into the night (c) cooked dinner late (d) slept early",
        steps: [
          "Wasted fuel is the literal reading. Strike it.",
          "Before lamps were electric, working at midnight meant burning oil. With exams coming, she studied late.",
        ],
        answer: "(b) studied late into the night",
      },
      practiceSet: [
        { prompt: "What does 'leave no stone unturned' mean?", answer: "try every possible way" },
        {
          prompt: "What does 'turn over a new leaf' mean? (a) read a new book (b) start behaving better (c) plant a tree (d) change houses",
          answer: "(b) start behaving better",
        },
        {
          prompt:
            "Choose the meaning: Missing the bus turned out to be a blessing in disguise. (a) a hidden gift (b) something good that first looked bad (c) a bad sign (d) a costume",
          answer: "(b) something good that first looked bad",
        },
        {
          prompt:
            "Spot the wrong pair: sit on the fence = not take sides; end in smoke = come to nothing; have the last laugh = fail in the end; count your blessings = be thankful.",
          answer: "have the last laugh = fail in the end",
          method: "To have the last laugh is to succeed in the end.",
        },
      ],
      traps: [
        {
          title: "Sitting on the fence is not resting",
          body: "To sit on the fence is to avoid taking sides or to put off a decision. It says nothing about being lazy or failing.",
        },
        {
          title: "End in smoke means failure, not fire",
          body: "A plan that ends in smoke comes to nothing. Read it as ruin or failure, not as something burning.",
        },
        {
          title: "Stealing a march is not stealing",
          body: "To steal a march on rivals is to get ahead of them by acting first. It does not mean cheating, defying or resisting them.",
        },
      ],
    },
  ],
};
