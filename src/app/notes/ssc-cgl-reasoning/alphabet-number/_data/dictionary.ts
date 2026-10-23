import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RAL_DICTIONARY_NOTE: SubtopicNote = {
  subtopicName: "Dictionary Order",
  title: "Dictionary Order",
  oneLineDefinition:
    "Five or six words are put in the order an English dictionary lists them, by comparing them letter by letter from the left, and the option with that order is chosen.",
  whyItMatters:
    "Forty-one questions in the bank: 38 from the 2023 shifts, when nearly every shift carried one, and 3 from the 2025 shifts. Thirty-nine are EASY. The words often share their first four or five letters, so the marks go to the student who finds the first letter of difference and uses the options to avoid sorting everything.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscraldi-letters",
      name: "Comparing words letter by letter",
      intuition:
        "A dictionary orders words by their first letter. When two words share the first letter, it looks at the second, and so on, until one letter differs; the word with the earlier letter comes first. Capital letters make no difference.",
      definition:
        "1. Group the words by their first letter, then sort each group by the next letter.\n" +
        "2. Inside a group, move along until the letters differ. Only that one letter decides the order; the rest of the word does not matter.\n" +
        "3. Write the numbers of the words in the order you found.\n" +
        "- **Fast route (option elimination):** find the word that comes first and strike every option that does not start with its number. Then find the word that comes last and strike again. Usually one option is left; if two are left, compare only the places where they differ. This is safe because every option lists all the words, so a wrong first or last number is enough to reject it.",
      authoredExample: {
        prompt: "Arrange in dictionary order: 1. Garden 2. Gentle 3. Glass 4. Gather 5. Ghost",
        steps: [
          "All begin with G, so look at the second letter: a (Garden, Gather), e (Gentle), h (Ghost), l (Glass).",
          "Garden and Gather share 'Ga'; the third letters are r and t, so Garden comes first.",
          "Order: Garden, Gather, Gentle, Ghost, Glass.",
        ],
        answer: "1, 4, 2, 5, 3",
      },
      selfCheckExample: {
        prompt: "Arrange in dictionary order: 1. Pencil 2. Paper 3. Planet 4. Pocket 5. Puzzle",
        steps: [
          "Second letters: a (Paper), e (Pencil), l (Planet), o (Pocket), u (Puzzle).",
          "Each second letter is different, so this alone fixes the order.",
        ],
        answer: "2, 1, 3, 4, 5",
      },
      practiceSet: [
        { prompt: "Which comes first in a dictionary, Market or Marble?", answer: "Marble", method: "They share 'Mar'; b comes before k." },
        { prompt: "Arrange in dictionary order: 1. Rose 2. River 3. Rain 4. Ruby", answer: "3, 2, 1, 4", method: "Second letters a, i, o, u." },
        { prompt: "Which of Table, Tiger, Torch and Tank comes last in a dictionary?", answer: "Torch", method: "Second letters a, a, i, o: o is the latest." },
        { prompt: "Arrange in dictionary order: 1. Bold 2. Bake 3. Brush 4. Bitter", answer: "2, 4, 1, 3", method: "Second letters a, i, o, r." },
      ],
      pyqExampleId: "f9898048-fc80-40f0-b882-3788a4371bf7",
      traps: [
        {
          title: "Looking past the first difference",
          body:
            "Once two words differ at one letter, the order is settled. In Garden and Gather the r before t decides it; the later letters of the two words do not matter.",
        },
        {
          title: "Picking the order instead of the option",
          body:
            "After you find the right order, match it digit by digit against the options. Many options agree on the first three numbers and differ only at the end, so a quick glance picks the wrong one.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscraldi-long",
      name: "Long shared beginnings and a word inside a word",
      intuition:
        "SSC likes sets of words that share a long beginning, such as Transfer, Transit and Translate. The rule is the same as before, only the letter that decides is further in. When one word is the whole beginning of another, the shorter word comes first.",
      definition:
        "- Underline the beginning that a group of words shares, then compare only the first letter after it.\n" +
        "- **A word inside a word comes first:** Light comes before Lighter, Call before Called. Nothing comes before any letter.\n" +
        "- Work in groups. Settle the words that differ early, then go back to the group that shares the longest beginning.\n" +
        "- **Fast route:** in the options, find the two words SSC has paired to look alike (Circular and Circulate, Physical and Physics). Their order is usually the only thing that separates the last two options.",
      authoredExample: {
        prompt: "Arrange in dictionary order: 1. Transport 2. Transfer 3. Translate 4. Trance 5. Transit",
        steps: [
          "All share 'Tran'. The fifth letters are c (Trance) and s (the other four), so Trance comes first.",
          "The other four share 'Trans'. Their sixth letters are f (Transfer), i (Transit), l (Translate), p (Transport).",
          "Order: Trance, Transfer, Transit, Translate, Transport.",
        ],
        answer: "4, 2, 5, 3, 1",
      },
      selfCheckExample: {
        prompt: "Arrange in dictionary order: 1. Note 2. Notebook 3. Noted 4. Notice 5. Nothing",
        steps: [
          "All share 'Not'. The fourth letters are e (Note, Notebook, Noted), h (Nothing) and i (Notice).",
          "Note is the whole beginning of Notebook and Noted, so it comes first. Then Notebook (b) before Noted (d).",
          "Order: Note, Notebook, Noted, Nothing, Notice.",
        ],
        answer: "1, 2, 3, 5, 4",
      },
      practiceSet: [
        { prompt: "Which comes first in a dictionary, Brother or Brotherhood?", answer: "Brother", method: "Brother is the whole beginning of Brotherhood." },
        { prompt: "Arrange in dictionary order: 1. Constant 2. Consider 3. Console 4. Consent", answer: "4, 2, 3, 1", method: "They share 'Cons'; the next letters are e, i, o, t." },
        { prompt: "Which comes first in a dictionary, Interview or Internet?", answer: "Internet", method: "They share 'Inter'; n comes before v." },
        { prompt: "Arrange in dictionary order: 1. Played 2. Play 3. Player 4. Playful", answer: "2, 1, 3, 4", method: "Play is inside the others; then 'Playe' before 'Playf', and d before r." },
      ],
      pyqExampleId: "1af67245-9a3f-494d-9d0e-230d11ae7e0a",
      traps: [
        {
          title: "Putting the longer word first",
          body:
            "Lighter is not before Light because it has more letters. Light ends where Lighter goes on, and an ended word always comes before a longer word that begins with it.",
        },
        {
          title: "Losing count in a long shared beginning",
          body:
            "In Circular and Circulate the first seven letters match and only the eighth decides (r before t). Count the shared letters slowly, or the decision lands on the wrong letter.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscraldi-pick",
      name: "Finding one place in the order",
      intuition:
        "Some questions ask only which word comes first, last or second. You do not need the full order: scan for the earliest word, and stop as soon as you can answer.",
      definition:
        "- **First:** scan for the earliest first letter; break ties with the next letter.\n" +
        "- **Last:** scan for the latest letter the same way.\n" +
        "- **Second or third:** find the first word, set it aside, and find the earliest of what is left. Repeat as often as the place asks.\n" +
        "- **Fast route:** the four options are usually alike up to two or three letters, so look straight at the first letter where they differ.",
      authoredExample: {
        prompt: "Which word comes third in dictionary order: Mango, Melon, Maple, Mint?",
        steps: [
          "Second letters: a (Mango, Maple), e (Melon), i (Mint).",
          "Mango and Maple come first and second (n before p).",
          "The third word is Melon.",
        ],
        answer: "Melon",
      },
      selfCheckExample: {
        prompt: "Which word comes last in dictionary order: Sunset, Sunday, Sunlight, Sunny?",
        steps: ["All share 'Sun'. The fourth letters are s, d, l and n.", "s is the latest, so Sunset is last."],
        answer: "Sunset",
      },
      practiceSet: [
        { prompt: "Which word comes first in a dictionary: Kettle, Kitten, Kennel, Kernel?", answer: "Kennel", method: "Ke words first; then n before r before t." },
        { prompt: "Which word comes second in a dictionary: Hat, Ham, Hay, Had?", answer: "Ham", method: "The third letters are t, m, y, d: d, then m." },
        { prompt: "Which word comes last in a dictionary: Window, Winter, Winner, Wind?", answer: "Winter", method: "Wind is inside Window; then d, n, t after 'Win'." },
      ],
      pyqExampleId: "e47b277a-5744-4302-943f-5dbded0ee38f",
      traps: [
        {
          title: "Answering the first word when the second is asked",
          body:
            "A question that asks for the second word puts the first word among the options on purpose. Find the first word, set it aside, and only then pick.",
        },
      ],
    },
  ],
};
