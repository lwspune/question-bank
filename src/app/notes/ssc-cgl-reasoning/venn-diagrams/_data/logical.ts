import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RVD_LOGICAL_NOTE: SubtopicNote = {
  subtopicName: "Logical Venn Diagrams",
  title: "Logical Venn Diagrams",
  oneLineDefinition:
    "Three classes are named and you pick the diagram of circles that shows how they relate: one inside another, overlapping, or apart.",
  whyItMatters:
    "Thirty questions in the bank, 29 of them from the 2023 shifts, with 26 EASY and 4 MODERATE. Each is decided by three yes-or-no questions about pairs of classes, so it should take under 20 seconds once the habit is set.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrvdlo-apart",
      name: "Inside or apart",
      intuition:
        "For any two classes, ask: is every member of one also in the other? If yes, its circle goes inside the other's. Do they share no members at all? Then the circles stand apart. These two answers settle most diagrams before you look at an option.",
      definition:
        "- **Inside:** every A is a B (every alligator is a reptile), so circle A sits inside circle B.\n" +
        "- **Nested:** if also every B is a C, the three circles sit one inside another.\n" +
        "- **Apart:** no A is a B (no snake is a crocodile), so the two circles do not touch.\n" +
        "- **Two kinds of one thing:** two classes that are both kinds of a third but never each other become two separate circles inside one large circle.\n" +
        "- **Unrelated:** a class with nothing in common with the others (a city beside two currencies) is a circle on its own, outside the rest.\n" +
        "- **Fast route:** settle the pair you are surest of first, strike the options that draw it wrongly, then check the next pair.",
      authoredExample: {
        prompt: "Which diagram best shows the classes Kolkata, India and Europe?",
        steps: [
          "Kolkata is a city in India, so the Kolkata circle sits inside the India circle.",
          "India is not in Europe, and nothing is both, so the Europe circle stands apart from the other two.",
        ],
        answer: "A small circle inside a larger one, and a third circle apart from both",
      },
      selfCheckExample: {
        prompt: "Which diagram best shows the classes Cats, Animals and Living things?",
        steps: ["Every cat is an animal, and every animal is a living thing.", "So the three circles sit one inside another: Cats inside Animals inside Living things."],
        answer: "Three circles, each inside the next",
      },
      practiceSet: [
        { prompt: "Which diagram best shows the classes Month, January and Week?", answer: "January inside Month, and Week apart from both" },
        { prompt: "Which diagram best shows the classes Square, Shape and Colour?", answer: "Square inside Shape, and Colour apart from both" },
        { prompt: "Two classes share no members at all. How are their circles drawn?", answer: "Apart, not touching" },
        { prompt: "Every A is a B. Which circle goes inside the other?", answer: "Circle A inside circle B" },
      ],
      pyqExampleId: "2dc79ff9-adff-4652-b398-9e5dfc32da04",
      traps: [
        {
          title: "Putting the larger class inside the smaller one",
          body:
            "\"Every alligator is a reptile\" puts Alligators inside Reptiles, not the other way round. The circle of the class that is a kind of the other goes inside.",
        },
        {
          title: "Overlapping two kinds that never meet",
          body:
            "Badminton and hockey are both sports, but no game is both. Draw them as two separate circles inside Sports, not as overlapping circles.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrvdlo-overlap",
      name: "Overlapping classes",
      intuition:
        "Two classes overlap when some members are in both and some are in only one: some women are doctors, some are not, and some doctors are not women. People-based classes (jobs, roles, relations) overlap far more often than things do.",
      definition:
        "- **Overlap:** some A are B, some A are not B, and some B are not A. The circles cross.\n" +
        "- **Three overlapping circles:** each pair can share members and some members are in all three (teachers, singers and dancers).\n" +
        "- **One circle crossing two separate ones:** students overlap boys and overlap girls, but no one is both a boy and a girl.\n" +
        "- **Inside and crossing:** mothers sit inside women, and doctors cross both circles.\n" +
        "- Check every pair: for three classes there are three pairs, and each pair is inside, apart or overlapping.\n" +
        "- **Fast route:** a job or a hobby nearly always overlaps a group of people; a kind of thing nearly always sits inside the larger kind.",
      authoredExample: {
        prompt: "Which diagram best shows the classes Women, Mothers and Doctors?",
        steps: [
          "Every mother is a woman, so Mothers sits inside Women.",
          "Some doctors are women and some are mothers, but some doctors are men, so the Doctors circle crosses Women and Mothers and also reaches outside Women.",
        ],
        answer: "Mothers inside Women, with a Doctors circle crossing both",
      },
      selfCheckExample: {
        prompt: "Which diagram best shows the classes Teachers, Singers and Dancers?",
        steps: [
          "A teacher can sing, a singer can dance, a teacher can do both, and each class has members who do neither of the others.",
          "So each pair overlaps, and all three share a middle region.",
        ],
        answer: "Three circles that all overlap one another",
      },
      practiceSet: [
        { prompt: "Which diagram best shows the classes Students, Boys and Girls?", answer: "One Students circle crossing two separate circles, Boys and Girls" },
        { prompt: "Which diagram best shows the classes Indians, Cricketers and Doctors?", answer: "Three circles that all overlap one another" },
        { prompt: "Which diagram best shows the classes Parents, Fathers and Teachers?", answer: "Fathers inside Parents, with a Teachers circle crossing both" },
        { prompt: "Every A is a B. Can circles A and B simply overlap?", answer: "No: circle A must sit inside circle B." },
      ],
      pyqExampleId: "b9e9d895-1037-4213-a5d6-ef74c1b0ef17",
      traps: [
        {
          title: "Drawing an overlap where one class is inside the other",
          body:
            "All mothers are women, so the Mothers circle must sit wholly inside Women. An option where Mothers sticks out of Women is wrong.",
        },
        {
          title: "Forgetting the members outside",
          body:
            "Some singers are not women, so the Singers circle must reach outside Women even though it overlaps it. Ask whether each class has members outside the others before you choose.",
        },
      ],
    },
  ],
};
