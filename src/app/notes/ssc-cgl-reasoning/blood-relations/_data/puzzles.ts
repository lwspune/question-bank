import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_RBR_PUZZLES_NOTE: SubtopicNote = {
  subtopicName: "Family Puzzles",
  title: "Family Puzzles",
  oneLineDefinition:
    "A set of clues about a whole family, often out of order, from which you build one tree and then answer a relation or count the men, women or couples.",
  whyItMatters:
    "Eleven questions in the bank, spread over all three years, eight of them EASY. They take longer than a statement chain only because the clues do not come in order, so the time goes into choosing which clue to draw first.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscrbrfp-anchor",
      name: "Placing clues that come out of order",
      intuition:
        "In a family puzzle you cannot draw the clues one by one as you read, because a clue may name two people who are not on the tree yet. Draw first the clue that fixes the most, then hang the others on it.",
      definition:
        "1. Read every clue once before drawing anything.\n" +
        "2. Draw first the clues that fix a pair for certain: a married couple, an 'only daughter', an 'only son-in-law'.\n" +
        "3. Park a clue whose people are not on the tree yet; come back to it when one of them is.\n" +
        "4. Mark each gender the moment a word fixes it. A square for male and a circle for female is quick.\n" +
        "5. Answer once every clue the question needs is placed. A clue about a person the question never asks about may be there only to complete the family.",
      authoredExample: {
        prompt:
          "J is the father of K. L is the only daughter of M, a woman. K is the husband of L. N is the son of K. How is M related to N?",
        steps: [
          "Anchor on the couple: K is the husband of L.",
          "N is K's son, so N is also L's son.",
          "L is the only daughter of M, a woman, so M is L's mother.",
          "M is the mother of N's mother. The clue about J is not needed.",
        ],
        answer: "Maternal grandmother (mother's mother)",
      },
      selfCheckExample: {
        prompt: "R is the wife of S. T is the son of U. U is the daughter of R. V is the brother of U. How is S related to T?",
        steps: [
          "U is R's daughter, and R's husband S is U's father.",
          "T is U's son, so S is the father of T's mother.",
        ],
        answer: "Maternal grandfather",
      },
      practiceSet: [
        {
          prompt: "P is the only son of Q. R is the wife of P. S is the daughter of R. Q's gender is not given. How is Q related to S?",
          answer: "Paternal grandparent (grandfather or grandmother)",
        },
        {
          prompt: "A has two children, B and C, and C is a girl. D is the wife of B. E is the son of D. How is C related to E?",
          answer: "Paternal aunt (father's sister)",
          method: "E is the son of B and D, and C is B's sister.",
        },
        {
          prompt: "X is the husband of Y. Z is the only daughter of Y. W is the husband of Z. How is W related to X?",
          answer: "Son-in-law",
        },
      ],
      pyqExampleId: "bb481bfa-da80-48b2-be45-2efe2f853451",
      traps: [
        {
          title: "Forcing a clue before its people are placed",
          body:
            "If neither person in a clue is on the tree yet, drawing it anyway means guessing where it joins. Park it, place the clues that fix pairs, and it will usually join in one obvious place.",
        },
        {
          title: "Letting a spare clue change the answer",
          body:
            "Family puzzles often add clues about people the question does not ask about. Draw them if they help, but do not change a relation you have already fixed to make a spare clue feel used.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscrbrfp-count",
      name: "Families of a given size: couples, generations and counting members",
      intuition:
        "Some puzzles give the size of the family and the number of generations or couples, then ask who is the mother or how many men there are. The size is a check you can use: every named person must end up on the tree exactly once.",
      definition:
        "1. List the named people down the side of your page. Beside each, write the gender and the level as soon as a clue fixes them.\n" +
        "2. A married couple stands on one level; 'three generations' means three levels, grandparents at the top.\n" +
        "3. A gender often comes from a clue that is not about gender: a person who has a wife is male, a person who has a husband is female.\n" +
        "4. Count only when every person in the count has a fixed gender. If one is still open, find the clue that fixes them first.\n" +
        "5. Check that the number of people on the tree equals the family size.",
      authoredExample: {
        prompt:
          "A family has five members: P, Q, R, S and T. P and Q are a married couple, and Q is a woman. R and S are their children, and S is a daughter. T is the wife of R. How many males are in the family?",
        steps: [
          "P is married to Q, a woman, so P is male.",
          "R has a wife, T, so R is male; T is female.",
          "S is a daughter, so S is female.",
          "Males: P and R. Females: Q, S and T. Five in all, which matches.",
        ],
        answer: "2",
      },
      selfCheckExample: {
        prompt:
          "A family of six covers three generations. K and L are a married couple, and K is a grandfather. M and N are the two sons of K. N is married to O, and Q is the daughter of N and O. How many females are in the family?",
        steps: [
          "K is male, so his wife L is female.",
          "M and N are sons, so male; O is N's wife, so female; Q is a daughter, so female.",
          "Females: L, O and Q. Six people in all: K, L, M, N, O, Q.",
        ],
        answer: "3",
      },
      practiceSet: [
        {
          prompt: "In a family of four, X and Y are a married couple and Y is a man. Z is their son, and W is Y's mother. How many women are in the family?",
          answer: "2 (X and W)",
        },
        {
          prompt: "P, Q and R are a mother, a father and their son, in some order. P is not a man, and R is the son of Q. Who is the father?",
          answer: "Q",
          method: "P is the only woman, so P is the mother; R is Q's son, so Q is the father.",
        },
        {
          prompt: "A family has three generations and exactly two married couples. What is the smallest number of members it can have?",
          answer: "5",
          method: "Two grandparents, one of their children with a husband or wife, and one grandchild.",
        },
      ],
      pyqExampleId: "abae3424-ee2a-47e9-b8f7-7bdf28549609",
      traps: [
        {
          title: "Counting a person twice",
          body:
            "The same person often appears in two clues, once as someone's son and again as someone's husband. Count the names on your list, not the times a name is mentioned.",
        },
        {
          title: "Counting an open gender as male",
          body:
            "A person whose gender no clue fixes cannot be counted as a man or a woman. When the question asks for a count, find the clue that settles that person before you add up.",
        },
      ],
    },
  ],
};
