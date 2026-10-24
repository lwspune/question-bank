import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_PR_CARDS_BAGS_NOTE: SubtopicNote = {
  subtopicName: "Cards, Bags and Numbered Cards",
  title: "Cards, Bags and Numbered Cards",
  oneLineDefinition:
    "Count the cards, balls or letters that fit and divide by how many there are; for a 52-card deck, know its make-up by heart.",
  whyItMatters:
    "Eighteen questions in the bank, the largest page, including the 2022 paper's question on drawing two queens. Half are a single card from a deck, the rest are bags of coloured balls, numbered cards and letters of a word, plus one on odds.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiprcb-deck",
      name: "The make-up of a 52-card deck",
      intuition:
        "A deck is a 4 by 13 grid: four suits, and thirteen ranks in each. Every card question is a count of cells in that grid.",
      definition:
        "- Four **suits** of 13: spades and clubs are **black**, hearts and diamonds are **red**.\n" +
        "- Each suit runs ace, 2 to 10, jack, queen, king, so there are **4 of every rank**.\n" +
        "- **Face cards** are the jack, queen and king: \\(3 \\times 4 = 12\\).",
      table: {
        columns: ["Cards", "How many", "Probability of one"],
        rows: [
          { cells: ["Any one rank (all the 6s, all the queens)", "4", "1/13"] },
          { cells: ["One suit (all spades)", "13", "1/4"] },
          { cells: ["Red cards or black cards", "26", "1/2"] },
          { cells: ["Face cards (jack, queen, king)", "12", "3/13"] },
          { cells: ["Red queens, or black kings", "2", "1/26"] },
          { cells: ["One named card (the 7 of spades)", "1", "1/52"] },
          {
            cells: ["Aces", "4", "1/13"],
            noteAmber: "An ace is not a face card.",
          },
        ],
        caption: "Probability is the count over 52, reduced.",
      },
      selfCheckExample: {
        prompt: "A card is drawn from a well-shuffled deck of 52. Find the probability of a red face card.",
        steps: ["Red suits have 3 face cards each: 6 cards.", "\\(\\frac{6}{52} = \\frac{3}{26}\\)."],
        answer: "\\(\\frac{3}{26}\\)",
      },
      practiceSet: [
        { prompt: "A card is drawn from a deck of 52. What is the probability of an ace?", answer: "\\(\\frac{1}{13}\\)" },
        { prompt: "A card is drawn from a deck of 52. What is the probability of a heart?", answer: "\\(\\frac{1}{4}\\)" },
        { prompt: "A card is drawn from a deck of 52. What is the probability of a black card that is not a face card?", answer: "\\(\\frac{20}{52} = \\frac{5}{13}\\)" },
        { prompt: "A card is drawn from a deck of 52. What is the probability of the king of hearts?", answer: "\\(\\frac{1}{52}\\)" },
      ],
      pyqExampleId: "4aaab76f-fd72-428e-90c4-d366b73953e7",
      traps: [
        {
          title: "All the kings, or only the black ones",
          body: "There are 4 kings but 2 black kings. A black king is \\(\\frac{2}{52} = \\frac{1}{26}\\); \\(\\frac{1}{13}\\) is any king.",
        },
        {
          title: "Counting the ace as a face card",
          body: "Face cards are the jack, queen and king only: 12 of them, so P(face card) \\(= \\frac{3}{13}\\), not \\(\\frac{4}{13}\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprcb-bags",
      name: "Bags of balls, numbered cards and letters of a word",
      intuition:
        "Whatever is drawn, the method is the deck's: count everything in the bag, count what fits, divide. When a count is unknown, the probabilities give an equation for it.",
      definition:
        "- Total first: 6 red, 8 white, 4 green and 7 black balls make 25.\n" +
        "- 'Neither green nor white' is red or black. Either count those, or take green-or-white from 1.\n" +
        "- Cards numbered 6 to 15 are \\(15 - 6 + 1 = 10\\) cards: count both ends.\n" +
        "- A letter chosen from a word: count repeated letters every time they appear (ASSASSINATION has 13 letters).\n" +
        "- Unknown count: if P(blue) is twice P(red), the bag holds twice as many blue balls as red, because both share the same total.",
      formula: {
        label: "Drawing one item",
        latex: "P = \\frac{\\text{items that fit}}{\\text{all items}} \\qquad \\text{numbers } a \\text{ to } b: \\; b - a + 1 \\text{ cards}",
      },
      authoredExample: {
        prompt: "A bag has 4 red, 5 blue and 3 green balls. One is drawn at random. Find the probability that it is not blue.",
        steps: [
          "Total: \\(4 + 5 + 3 = 12\\).",
          "Not blue: red or green, \\(4 + 3 = 7\\).",
          "\\(P = \\frac{7}{12}\\). Check: \\(1 - \\frac{5}{12} = \\frac{7}{12}\\).",
        ],
        answer: "\\(\\frac{7}{12}\\)",
      },
      selfCheckExample: {
        prompt: "A bag has 4 red balls and some white balls. The probability of a white ball is three times that of a red one. How many white balls are there?",
        steps: [
          "Both probabilities have the same total, so white balls \\(= 3 \\times\\) red balls.",
          "\\(3 \\times 4 = 12\\). Check: 16 balls, \\(\\frac{12}{16} = \\frac{3}{4}\\) and \\(\\frac{4}{16} = \\frac{1}{4}\\).",
        ],
        answer: "12",
      },
      practiceSet: [
        { prompt: "Cards numbered 1 to 20 are in a box. One is drawn. What is the probability of a multiple of 4?", answer: "\\(\\frac{5}{20} = \\frac{1}{4}\\)" },
        { prompt: "A letter is chosen at random from the word PROBABILITY. What is the probability that it is a B?", answer: "\\(\\frac{2}{11}\\)" },
        { prompt: "A box of 30 bulbs has 6 defective ones. One is picked. What is the probability that it is good?", answer: "\\(\\frac{24}{30} = \\frac{4}{5}\\)" },
        { prompt: "Cards numbered 11 to 30 are in a box. One is drawn. What is the probability of a prime number?", answer: "\\(\\frac{6}{20} = \\frac{3}{10}\\) (11, 13, 17, 19, 23, 29)" },
      ],
      pyqExampleId: "acef9f20-7118-41c8-9519-48531ef6071f",
      traps: [
        {
          title: "Cards from a to b are b minus a plus 1",
          body: "Cards 2 to 11 are 10 cards, not 9. Subtracting the ends drops one card and changes every probability on the page.",
        },
        {
          title: "Counting a repeated letter once",
          body:
            "A letter drawn from a word is one of all its letters, repeats included. ASSASSINATION has three A's, two I's and one O: six vowels out of 13.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprcb-two",
      name: "Drawing two cards or balls together",
      intuition:
        "Drawing two together is drawing one and then another without putting the first back. The second draw has one fewer item in total and, if the first matched, one fewer that match.",
      definition:
        "- Both items of a kind: \\(\\frac{a}{n} \\times \\frac{a - 1}{n - 1}\\), where \\(a\\) items of \\(n\\) are of that kind.\n" +
        "- The second fraction shrinks top and bottom: the first item is not put back.\n" +
        "- The same answer comes from choosing pairs: \\(\\frac{a(a-1)/2}{n(n-1)/2}\\).",
      formula: {
        label: "Two drawn together",
        latex: "P(\\text{both of a kind}) = \\frac{a}{n} \\times \\frac{a-1}{n-1}",
      },
      authoredExample: {
        prompt: "Two cards are drawn together from a deck of 52. Find the probability that both are red.",
        steps: [
          "First red: \\(\\frac{26}{52}\\). Second red, one red card gone: \\(\\frac{25}{51}\\).",
          "\\(\\frac{26}{52} \\times \\frac{25}{51} = \\frac{1}{2} \\times \\frac{25}{51} = \\frac{25}{102}\\).",
        ],
        answer: "\\(\\frac{25}{102}\\)",
      },
      selfCheckExample: {
        prompt: "Two cards are drawn together from a deck of 52. Find the probability that both are spades.",
        steps: ["\\(\\frac{13}{52} \\times \\frac{12}{51} = \\frac{1}{4} \\times \\frac{4}{17} = \\frac{1}{17}\\)."],
        answer: "\\(\\frac{1}{17}\\)",
      },
      practiceSet: [
        { prompt: "Two balls are drawn together from a bag of 3 red and 2 blue. What is the probability that both are red?", answer: "\\(\\frac{3}{5} \\times \\frac{2}{4} = \\frac{3}{10}\\)" },
        { prompt: "Two cards are drawn together from a deck of 52. What is the probability that both are black kings?", answer: "\\(\\frac{2}{52} \\times \\frac{1}{51} = \\frac{1}{1326}\\)" },
        { prompt: "Two balls are drawn together from a bag of 4 white and 6 black. What is the probability that both are black?", answer: "\\(\\frac{6}{10} \\times \\frac{5}{9} = \\frac{1}{3}\\)" },
      ],
      pyqExampleId: "b0042870-0f9a-4837-beea-5abfbf70c7cf",
      traps: [
        {
          title: "Keeping 52 in the second fraction",
          body:
            "After one card is drawn, 51 remain. \\(\\frac{4}{52} \\times \\frac{4}{52}\\) is the answer for drawing with replacement, which 'drawn together' is not.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spiprcb-odds",
      name: "Odds in favour and odds against",
      intuition:
        "Odds compare the outcomes that fit with the ones that do not, instead of with all of them. A probability of \\(\\frac{1}{4}\\) is odds of 1 to 3 in favour and 3 to 1 against.",
      definition:
        "- **Odds in favour** \\(=\\) favourable : unfavourable. **Odds against** \\(=\\) unfavourable : favourable.\n" +
        "- From odds \\(a : b\\) in favour, \\(P(E) = \\frac{a}{a + b}\\).\n" +
        "- 'A spade or an ace' counts the ace of spades once: \\(13 + 4 - 1 = 16\\) cards.",
      formula: {
        label: "Odds and probability",
        latex: "\\text{odds in favour} = f : u, \\quad P(E) = \\frac{f}{f + u}",
        symbols: [
          { symbol: "f", meaning: "number of favourable outcomes" },
          { symbol: "u", meaning: "number of unfavourable outcomes" },
        ],
      },
      authoredExample: {
        prompt: "A card is drawn from a deck of 52. Find the odds in favour of a face card.",
        steps: ["Favourable: 12 face cards. Unfavourable: \\(52 - 12 = 40\\).", "Odds in favour \\(= 12 : 40 = 3 : 10\\)."],
        answer: "3 : 10",
      },
      selfCheckExample: {
        prompt: "The probability of an event is \\(\\frac{2}{5}\\). What are the odds against it?",
        steps: ["Of every 5 outcomes, 2 favour it and 3 do not.", "Odds against \\(= 3 : 2\\)."],
        answer: "3 : 2",
      },
      practiceSet: [
        { prompt: "A die is thrown. What are the odds in favour of an even number?", answer: "3 : 3, that is 1 : 1" },
        { prompt: "The odds against an event are 3 : 5. What is its probability?", answer: "\\(\\frac{5}{8}\\)" },
        { prompt: "The odds in favour of an event are 4 : 7. What is its probability?", answer: "\\(\\frac{4}{11}\\)" },
        { prompt: "A card is drawn from a deck of 52. What are the odds against a heart?", answer: "39 : 13, that is 3 : 1" },
      ],
      pyqExampleId: "46e0156e-a178-4516-a033-df4a37b687f7",
      traps: [
        {
          title: "Odds are not a probability",
          body:
            "Odds of 3 : 10 mean a probability of \\(\\frac{3}{13}\\), not \\(\\frac{3}{10}\\). Add the two parts to get the total.",
        },
        {
          title: "Counting the ace of spades twice",
          body: "'A spade or an ace' is 16 cards, not 17: the ace of spades is already among the 13 spades.",
        },
      ],
    },
  ],
};
