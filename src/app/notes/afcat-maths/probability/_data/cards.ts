import type { SubtopicNote } from "@/app/notes/_types";

export const AF_PR_CARDS_NOTE: SubtopicNote = {
  subtopicName: "Playing Cards",
  title: "Playing Cards: the Deck, Or, Given That, and Drawing Two",
  oneLineDefinition:
    "Know the 52-card deck by suit, colour and rank, count the cards that fit, take off any overlap in an or, and for two or three cards multiply, with or without replacement.",
  whyItMatters:
    "Most card questions are one card and one count, so the deck itself is the formula: 4 suits of 13, 26 cards of each colour, 12 face cards. The marks go on an or with an overlap (a seven that is also a spade), on whether the Ace counts high or low, and on forgetting that the deck shrinks when a card is not put back.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "afpr-deck",
      name: "The 52-card deck",
      intuition:
        "A standard deck has 4 suits of 13 cards. Hearts and diamonds are red; spades and clubs are black. Each suit runs Ace, 2 to 10, Jack, Queen, King.",
      definition:
        "Count the cards that fit, then divide by 52. Every rank appears 4 times, once in each suit, and every suit has 13 cards. In these questions the **face cards** (also called court or picture cards) are the Jack, Queen and King only.",
      table: {
        columns: ["Group", "Cards", "Probability of one card"],
        rows: [
          { cells: ["One colour (red, or black)", "26", "\\(\\tfrac{1}{2}\\)"] },
          { cells: ["One suit", "13", "\\(\\tfrac{1}{4}\\)"] },
          { cells: ["One rank (for example the kings)", "4", "\\(\\tfrac{1}{13}\\)"] },
          { cells: ["Face cards: J, Q, K", "12", "\\(\\tfrac{3}{13}\\)"], noteAmber: "The Ace is not a face card here." },
          { cells: ["Number cards: 2 to 10", "36", "\\(\\tfrac{9}{13}\\)"] },
          { cells: ["One named card (for example the 7 of clubs)", "1", "\\(\\tfrac{1}{52}\\)"] },
        ],
      },
      selfCheckExample: {
        prompt: "A card is drawn from a standard deck. What is the probability that it is a black king?",
        steps: ["There are 2 black kings (spades and clubs).", "\\(P = \\tfrac{2}{52} = \\tfrac{1}{26}\\)."],
        answer: "\\(\\tfrac{1}{26}\\).",
      },
      practiceSet: [
        { prompt: "How many diamonds are in a standard deck?", answer: "13" },
        { prompt: "What is the probability of drawing a queen?", answer: "\\(\\tfrac{1}{13}\\)" },
        { prompt: "What is the probability of drawing a black card?", answer: "\\(\\tfrac{1}{2}\\)" },
        { prompt: "How many face cards are black?", answer: "6" },
      ],
      pyqExampleId: "ffb73eba-785b-48d7-a36e-d0b74698065d",
      traps: [
        {
          title: "Twelve face cards, not sixteen",
          body: "With the Jack, Queen and King as face cards there are 12. Adding the four Aces gives 16, which these questions do not use.",
        },
        {
          title: "Number cards are 2 to 10",
          body: "Each suit has 9 number cards, 2 to 10. The Ace is not one of them unless the question says it counts as 1.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-card-ranks",
      name: "Ranges of values, and two conditions on one card",
      intuition:
        "A condition on value picks out some ranks, and each rank gives 4 cards. 'Value 9 or 10' is 2 ranks, so 8 cards: \\(\\tfrac{8}{52} = \\tfrac{2}{13}\\).",
      definition:
        "- Cards that fit \\(= 4 \\times\\) the ranks that fit, when every suit is allowed.\n" +
        "- Read how the Ace is valued: as 1 (low) or as 14 (high). The question says which, and it changes the count.\n" +
        "- Two conditions on one card ('a black number card', 'a spade that is not a face card'): count inside one group. Black number cards are 9 in spades and 9 in clubs, 18.\n" +
        "- A condition every card meets has probability 1; one no card meets has probability 0.",
      formula: {
        label: "Cards in some ranks",
        latex: "P = \\dfrac{4 \\times \\text{ranks that fit}}{52}",
      },
      authoredExample: {
        prompt: "With the Ace counted as 14, find the probability that a card drawn has value greater than 11.",
        steps: [
          "Greater than 11: Queen (12), King (13), Ace (14). That is 3 ranks.",
          "\\(3 \\times 4 = 12\\) cards.",
          "\\(P = \\tfrac{12}{52} = \\tfrac{3}{13}\\).",
        ],
        answer: "\\(\\tfrac{3}{13}\\).",
      },
      selfCheckExample: {
        prompt: "Find the probability that a card drawn is a diamond that is not a number card.",
        steps: ["The diamonds that are not 2 to 10: Ace, Jack, Queen, King. That is 4 cards.", "\\(P = \\tfrac{4}{52} = \\tfrac{1}{13}\\)."],
        answer: "\\(\\tfrac{1}{13}\\).",
      },
      practiceSet: [
        { prompt: "Find the probability that a card drawn is an even number card (2, 4, 6, 8 or 10).", answer: "\\(\\tfrac{5}{13}\\)" },
        { prompt: "Find the probability that a card drawn is a black number card.", answer: "\\(\\tfrac{9}{26}\\)" },
        { prompt: "Find the probability that a card drawn has value 3 or 9.", answer: "\\(\\tfrac{2}{13}\\)" },
        { prompt: "Find the probability that a card drawn is a red 5 or a red 10.", answer: "\\(\\tfrac{1}{13}\\)" },
      ],
      pyqExampleId: "b78e1f6b-652b-41e2-9ecc-3e4bf8ac10ef",
      traps: [
        {
          title: "Ace high or Ace low",
          body: "With the Ace as 1, 'value less than 4' is Ace, 2, 3: 12 cards. With the Ace as 14 it is 2 and 3 only: 8 cards.",
        },
        {
          title: "Inclusive ranges",
          body: "'Between 3 and 7 inclusive' is 3, 4, 5, 6, 7: five ranks, 20 cards. Leaving out an end gives 16.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-card-or",
      name: "Or: add, then take off the overlap",
      intuition:
        "'A king or a spade' counts 4 kings and 13 spades, but the king of spades is in both groups. Take it off once: 16 cards.",
      definition:
        "- \\(n(A \\text{ or } B) = n(A) + n(B) - n(A \\text{ and } B)\\), the rule from the first page.\n" +
        "- If no card is in both groups (a king or a queen; a diamond or a black card), simply add.\n" +
        "- Find the overlap by asking which cards are in both groups: one rank and one suit share exactly one card; one colour and one rank share two.",
      formula: {
        label: "Or with an overlap",
        latex: "P(A \\text{ or } B) = \\dfrac{n(A) + n(B) - n(A \\text{ and } B)}{52}",
      },
      authoredExample: {
        prompt: "A card is drawn. Find the probability that it is a king or a spade.",
        steps: ["4 kings and 13 spades, with the king of spades in both.", "\\(4 + 13 - 1 = 16\\) cards.", "\\(P = \\tfrac{16}{52} = \\tfrac{4}{13}\\)."],
        answer: "\\(\\tfrac{4}{13}\\).",
      },
      selfCheckExample: {
        prompt: "A card is drawn. Find the probability that it is red or an Ace.",
        steps: ["26 red cards and 4 Aces, with 2 red Aces in both.", "\\(26 + 4 - 2 = 28\\), so \\(\\tfrac{28}{52} = \\tfrac{7}{13}\\)."],
        answer: "\\(\\tfrac{7}{13}\\).",
      },
      practiceSet: [
        { prompt: "A card is drawn. Find the probability that it is black or a face card.", answer: "\\(\\tfrac{8}{13}\\)", method: "\\(26 + 12 - 6 = 32\\)." },
        { prompt: "A card is drawn. Find the probability that it is a 2 or a red Ace.", answer: "\\(\\tfrac{3}{26}\\)" },
        { prompt: "A card is drawn. Find the probability that it is a diamond or a spade.", answer: "\\(\\tfrac{1}{2}\\)" },
      ],
      pyqExampleId: "edbd7e51-35fb-45d0-9937-ecff97e96874",
      traps: [
        {
          title: "The overlap is counted twice",
          body: "A queen or a club is \\(4 + 13 - 1 = 16\\) cards. Writing 17 counts the queen of clubs twice.",
        },
        {
          title: "Groups that cannot overlap",
          body: "A diamond or a black card has no card in both groups, so it is \\(13 + 26 = 39\\) cards with nothing taken off.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-card-given",
      name: "Given that, or a deck with cards removed",
      intuition:
        "Once you are told the card is red, only the 26 red cards are possible. Count inside them. A deck with some cards taken out works the same way: count in what is left.",
      definition:
        "- \\(P(A \\mid B) = \\dfrac{n(A \\text{ and } B)}{n(B)}\\), the coins rule applied to cards.\n" +
        "- 'Given a red card' leaves 26 cards; 'given a spade' leaves 13.\n" +
        "- If cards are removed first, the new total is what remains. Check whether any removed card belonged to the group you want.",
      formula: {
        label: "Given that",
        latex: "P(A \\mid B) = \\dfrac{n(A \\cap B)}{n(B)}",
      },
      authoredExample: {
        prompt: "A card is drawn and it is black. Find the probability that it is a king.",
        steps: ["Given black: 26 cards.", "2 of them are kings.", "\\(P = \\tfrac{2}{26} = \\tfrac{1}{13}\\)."],
        answer: "\\(\\tfrac{1}{13}\\).",
      },
      selfCheckExample: {
        prompt: "All the face cards are removed from a deck. A card is drawn from the rest. Find the probability that it is a spade.",
        steps: ["40 cards remain, 10 in each suit.", "\\(P = \\tfrac{10}{40} = \\tfrac{1}{4}\\)."],
        answer: "\\(\\tfrac{1}{4}\\).",
      },
      practiceSet: [
        { prompt: "The card drawn is a diamond. Find the probability that it is a number card (2 to 10).", answer: "\\(\\tfrac{9}{13}\\)" },
        { prompt: "The four kings are removed. Find the probability that a card drawn from the rest is red.", answer: "\\(\\tfrac{1}{2}\\)", method: "24 red of 48." },
        { prompt: "The card drawn is red. Find the probability that it is the Ace of hearts.", answer: "\\(\\tfrac{1}{26}\\)" },
      ],
      pyqExampleId: "6b30df1f-9a2b-4695-ac43-4838fcc978a5",
      traps: [
        {
          title: "Removed cards change both counts",
          body: "Taking out the 4 kings leaves 48 cards and 12 spades, so a spade is \\(\\tfrac{12}{48}\\). Keeping 13 spades forgets that the king of spades went out with the kings.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-card-replace",
      name: "Two draws with replacement",
      intuition:
        "If the first card goes back and the deck is shuffled, the second draw starts from 52 again. The draws are independent, so multiply.",
      definition:
        "- With replacement, P(first A, then B) \\(= P(A) \\times P(B)\\), both out of 52.\n" +
        "- 'Exactly one' of two draws has two orders: add P(A, then not A) and P(not A, then A).\n" +
        "- Three draws: multiply three times. All three are hearts with probability \\(\\left(\\tfrac14\\right)^3\\).",
      formula: {
        label: "With replacement",
        latex: "P(A \\text{ then } B) = P(A) \\times P(B)",
      },
      authoredExample: {
        prompt: "A card is drawn, replaced, and a second card drawn. Find the probability that the first is a heart and the second a face card.",
        steps: ["\\(P(\\text{heart}) = \\tfrac14\\) and \\(P(\\text{face card}) = \\tfrac{3}{13}\\).", "\\(\\tfrac14 \\times \\tfrac{3}{13} = \\tfrac{3}{52}\\)."],
        answer: "\\(\\tfrac{3}{52}\\).",
      },
      selfCheckExample: {
        prompt: "Two cards are drawn with replacement. Find the probability that exactly one is a spade.",
        steps: ["Spade then not: \\(\\tfrac14 \\times \\tfrac34 = \\tfrac{3}{16}\\); the other order is the same.", "\\(2 \\times \\tfrac{3}{16} = \\tfrac{3}{8}\\)."],
        answer: "\\(\\tfrac{3}{8}\\).",
      },
      practiceSet: [
        { prompt: "Two cards are drawn with replacement. Find the probability that both are diamonds.", answer: "\\(\\tfrac{1}{16}\\)" },
        { prompt: "Three cards are drawn with replacement. Find the probability that all three are clubs.", answer: "\\(\\tfrac{1}{64}\\)" },
        { prompt: "Two cards are drawn with replacement. Find the probability that the first is red and the second a king.", answer: "\\(\\tfrac{1}{26}\\)" },
      ],
      pyqExampleId: "f2564750-6d78-4f7e-8032-dfa4c90cd478",
      traps: [
        {
          title: "Replacement keeps the totals",
          body: "With replacement both draws are out of 52. Writing 51 for the second draw answers the without-replacement question.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afpr-card-no-replace",
      name: "Two or three cards without replacement",
      intuition:
        "If the first card stays out, the second is drawn from 51, and if the first was a heart only 12 hearts are left. Multiply the step-by-step probabilities.",
      definition:
        "- P(first A, then B) \\(= P(A) \\times P(B \\text{ after } A \\text{ has gone})\\).\n" +
        "- Both of a kind: \\(\\tfrac{36}{52} \\times \\tfrac{35}{51}\\) for two number cards, \\(\\tfrac{26}{52} \\times \\tfrac{25}{51}\\) for two red cards.\n" +
        "- When only the second card has to match the first (same suit, same rank), the first card can be anything, so only the second step counts.\n" +
        "- At least one: \\(1 - P(\\text{none})\\), with the none worked out step by step.",
      formula: {
        label: "Without replacement",
        latex: "P(A \\text{ then } B) = P(A) \\times P(B \\mid A)",
      },
      authoredExample: {
        prompt: "Two cards are drawn without replacement. Find the probability that both are red.",
        steps: ["First red: \\(\\tfrac{26}{52} = \\tfrac12\\). Then 25 red cards are left in 51.", "\\(\\tfrac12 \\times \\tfrac{25}{51} = \\tfrac{25}{102}\\)."],
        answer: "\\(\\tfrac{25}{102}\\).",
      },
      selfCheckExample: {
        prompt: "Two cards are drawn without replacement. Find the probability that at least one is a heart.",
        steps: [
          "No heart: \\(\\tfrac{39}{52} \\times \\tfrac{38}{51} = \\tfrac34 \\times \\tfrac{38}{51} = \\tfrac{19}{34}\\).",
          "\\(1 - \\tfrac{19}{34} = \\tfrac{15}{34}\\).",
        ],
        answer: "\\(\\tfrac{15}{34}\\).",
      },
      practiceSet: [
        { prompt: "Three cards are drawn without replacement. Find the probability that all are kings.", answer: "\\(\\tfrac{1}{5525}\\)", method: "\\(\\tfrac{4}{52} \\times \\tfrac{3}{51} \\times \\tfrac{2}{50}\\)." },
        { prompt: "Two cards are drawn without replacement. Find the probability that the first is a king and the second a queen.", answer: "\\(\\tfrac{4}{663}\\)" },
        { prompt: "Two cards are drawn without replacement. Find the probability that both are face cards.", answer: "\\(\\tfrac{11}{221}\\)" },
      ],
      pyqExampleId: "a0574238-7c30-404a-9403-a141ac60b5ad",
      traps: [
        {
          title: "Same suit as the first card",
          body: "For two cards of the same suit the first card can be any card, then 12 of the 51 left match: \\(\\tfrac{12}{51} = \\tfrac{4}{17}\\). Multiplying by \\(\\tfrac{13}{52}\\) as well answers 'both are hearts' instead.",
        },
        {
          title: "Shrink both counts",
          body: "After one face card is drawn and kept, 11 face cards remain in 51 cards. Keeping 12 or 52 for the second draw gives the with-replacement answer.",
        },
      ],
    },
  ],
};
