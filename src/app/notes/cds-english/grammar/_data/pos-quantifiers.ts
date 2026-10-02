import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_POS_QUANTIFIERS_NOTE: SubtopicNote = {
  subtopicName: "Quantifiers: Some, Any, Few, Little, Each, Every",
  title: "Quantifiers and other determiners",
  oneLineDefinition:
    "Quantifiers say how much or how many. Which one fits depends on three things: whether the noun can be counted, whether the sentence is positive, negative or a question, and whether you mean one at a time.",
  whyItMatters:
    "Quantifier blanks have become more frequent in recent papers. Each one turns on a single check: countable or uncountable, positive or negative sense, statement or question, one or many. " +
    "Learn the checks and these become quick marks.",
  concepts: [
    // C1 — countable or uncountable
    {
      kind: "formula" as const,
      slug: "cdsenpos-count-or-mass",
      name: "Countable or uncountable decides the word: fewer/less, many/much",
      intuition:
        "Before you fill a quantifier blank, look at the noun after it. Can you put a number in front of it (three officers)? Then it is countable. If not (energy, sugar, advice), it is uncountable, and a different set of words goes with it.",
      definition:
        "Terms:\n" +
        "- A **quantifier** is a determiner that says how much or how many: many, much, few, little, some, any, most, several.\n" +
        "Which word goes with which noun:\n" +
        "- **Countable** (plural nouns): many, few, a few, **fewer**, several, a number of.\n" +
        "- **Uncountable**: much, little, a little, **less**, an amount of.\n" +
        "- **Both**: some, any, most, all, a lot of, enough.\n" +
        "- 'No fewer than a hundred passengers' (a countable number); 'no less than' goes with amounts.\n" +
        "- **Lesser** is not the same as less: it means smaller in importance (the lesser evil).\n" +
        "The method:\n" +
        "- Find the noun the blank goes with.\n" +
        "- Countable or uncountable? Strike the words of the wrong set.\n" +
        "- Check the verb: a plural verb (are) needs a plural countable noun.",
      authoredExample: {
        prompt:
          "Fill in the blank: How _______ sugar do you take in your tea? (a) many (b) much (c) few (d) several",
        steps: [
          "The noun is 'sugar'. You cannot say 'three sugars' here, so it is uncountable.",
          "Many, few and several go with countable nouns. Strike them.",
          "'Much' goes with uncountable nouns.",
        ],
        answer: "(b) much.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: She has read _______ books on the subject, at least a dozen. (a) much (b) many (c) little (d) less",
        steps: [
          "The noun is 'books'. A dozen books: it is countable.",
          "Much, little and less go with uncountable nouns.",
          "'Many' goes with plural countable nouns.",
        ],
        answer: "(b) many.",
      },
      practiceSet: [
        { prompt: "There is too _______ furniture in this room. (many / much)", answer: "much", method: "'furniture' is uncountable" },
        { prompt: "We need _______ suggestions from you. (several / much)", answer: "several", method: "'suggestions' is plural countable" },
        { prompt: "a large _______ of people (amount / number)", answer: "number", method: "people can be counted" },
        { prompt: "Is 'advice' countable?", answer: "No", method: "say 'much advice' or 'a piece of advice', never 'advices'" },
      ],
      pyqExampleId: "b6cd511c-40b6-49d7-b9e7-85b2032f75ac",
      traps: [
        {
          title: "Less is for amounts, fewer for numbers",
          body:
            "'Less water', 'less time', but 'fewer bottles', 'fewer passengers'. If you could count the noun, the word is **fewer**.",
        },
        {
          title: "Lesser is a different word",
          body:
            "'Lesser' means of lower rank or importance (a lesser poet). It never replaces 'less' or 'fewer' before a noun that is being counted or measured.",
        },
        {
          title: "Match the verb",
          body:
            "'_______ of these officers are very well-trained': the plural verb 'are' and the plural noun need **Most**. 'Much' cannot go with a plural noun, and 'One' would need 'is'.",
        },
      ],
    },

    // C2 — few / a few, little / a little
    {
      kind: "formula" as const,
      slug: "cdsenpos-few-a-few",
      name: "Few vs a few, little vs a little",
      intuition:
        "The small word 'a' flips the feeling. 'A few' and 'a little' mean some, and that is good. 'Few' and 'little' alone mean hardly any, and that is a problem. " +
        "Read the rest of the sentence to see which feeling it wants.",
      definition:
        "The four words:\n" +
        "- **A few** + countable: some, a small number (positive). I have **a few** friends here.\n" +
        "- **Few** + countable: hardly any (negative). He has **few** friends, so he is lonely.\n" +
        "- **A little** + uncountable: some, a small amount (positive). There is **a little** milk left.\n" +
        "- **Little** + uncountable: hardly any (negative). There is **little** hope.\n" +
        "The method:\n" +
        "- Countable or uncountable? That chooses between few and little.\n" +
        "- Positive or negative sense? That chooses whether 'a' is needed.\n" +
        "- Clues for the negative sense: busy, lonely, only, worried, but. Clues for the positive: a request, 'went on well', 'still'.",
      authoredExample: {
        prompt:
          "Fill in the blank: He is new in town and has _______ friends, so he feels lonely. (a) a few (b) few (c) little (d) a little",
        steps: [
          "'Friends' can be counted, so little and a little are out.",
          "'So he feels lonely' shows the number is a problem: hardly any.",
          "Hardly any, with a countable noun, is 'few' without 'a'.",
        ],
        answer: "(b) few.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: The soup tastes flat; add _______ salt. (a) few (b) a few (c) little (d) a little",
        steps: [
          "'Salt' is uncountable, so few and a few are out.",
          "The speaker wants some salt added: a positive amount.",
          "Some, with an uncountable noun, is 'a little'.",
        ],
        answer: "(d) a little.",
      },
      practiceSet: [
        { prompt: "_______ students passed, so the teacher was upset. (Few / A few)", answer: "Few", method: "hardly any: a problem" },
        { prompt: "I have _______ questions; can I ask them now? (few / a few)", answer: "a few", method: "some questions: positive" },
        { prompt: "There is _______ hope of rain this week. (little / a little)", answer: "little", method: "hardly any hope" },
        { prompt: "Is 'an little' ever correct?", answer: "No", method: "the form is always 'a little'" },
      ],
      pyqExampleId: "5666ccee-13d2-42ff-8563-3e2613df5b16",
      traps: [
        {
          title: "'Few' is not 'a few'",
          body:
            "'Few people came' means the hall was nearly empty. 'A few people came' means some came. The 'a' changes the meaning, not just the sound.",
        },
        {
          title: "A request wants the positive",
          body:
            "When someone asks for something ('could you spare me ...?'), they want some of it: **a little** or **a few**. 'Little' alone would mean they want almost none.",
        },
        {
          title: "Count first, then feel",
          body:
            "'Time', 'energy', 'milk', 'hope' are uncountable: only little or a little can go with them. Do not pick 'a few' for an uncountable noun just because the sense is positive.",
        },
      ],
    },

    // C3 — some vs any
    {
      kind: "formula" as const,
      slug: "cdsenpos-some-any",
      name: "Some vs any",
      intuition:
        "'Some' is the positive word, 'any' the negative and question word. Two exceptions catch students: offers and requests take 'some', and 'any' with a singular noun means 'no matter which one'.",
      definition:
        "The rules:\n" +
        "- **Some** in positive statements: I had **some** trouble; **Some** children learn very quickly.\n" +
        "- **Any** in negative sentences and ordinary questions: I don't need **any** help; Is there **any** water?\n" +
        "- **Some** in offers, requests, and questions that expect 'yes': Would you like **some** tea? Didn't you borrow **some** books of mine?\n" +
        "- **Any** + singular noun in a positive sentence = no matter which one: **Any** student could tell you.\n" +
        "- **No** before a noun = not any: You have **no** sense.\n" +
        "Their class:\n" +
        "- Some, any and no before a noun are **determiners** (quantifiers).\n" +
        "The method:\n" +
        "- Statement, negative or question? Then check for an offer, a request or an expected 'yes'.",
      authoredExample: {
        prompt:
          "Fill in the blank: We need _______ volunteers for the camp next week. (a) any (b) some (c) much (d) a",
        steps: [
          "The sentence is a positive statement, not a question or a negative.",
          "'Volunteers' is plural countable, so 'much' and 'a' are out.",
          "A positive statement takes 'some'.",
        ],
        answer: "(b) some.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: Did you meet _______ friends at the fair? (a) some (b) any (c) much (d) a",
        steps: [
          "It is an ordinary question; the speaker does not expect yes or no.",
          "'Friends' is plural countable, so 'much' and 'a' are out.",
          "An ordinary question takes 'any'.",
        ],
        answer: "(b) any.",
      },
      practiceSet: [
        { prompt: "Would you like _______ tea? (some / any)", answer: "some", method: "an offer" },
        { prompt: "_______ child can learn to swim with practice. (Any / Some)", answer: "Any", method: "singular noun: no matter which child" },
        { prompt: "\\(\\underline{\\text{Some}}\\) rice is left in the pot. Class of the underlined word?", answer: "Determiner (quantifier)" },
        { prompt: "Her purse is empty; she has _______ money left. (no / any)", answer: "no", method: "a positive verb 'has' + not any = no" },
      ],
      pyqExampleId: "08da80de-292b-4b23-98d3-c73f45260875",
      traps: [
        {
          title: "A question that expects 'yes'",
          body:
            "'Didn't you borrow some books of mine?' The speaker is sure you did. Such questions, and offers and requests, take **some**, not any.",
        },
        {
          title: "'Any' with a singular noun",
          body:
            "'Any student could tell you' is a positive sentence, but 'any' fits: it means every student, whichever you ask. 'Some', 'All' and 'Few' would need a plural noun.",
        },
        {
          title: "'A' is not a quantifier for uncountable nouns",
          body:
            "'The village possesses _______ scenic beauty': beauty here is uncountable, so 'a' and 'an' are out. Use **some**.",
        },
      ],
    },

    // C4 — one at a time
    {
      kind: "formula" as const,
      slug: "cdsenpos-one-at-a-time",
      name: "Each, every, either, one of: the singular words",
      intuition:
        "Each, every, either and neither look at the members of a group one by one. So the noun after them is singular, and so is the verb. " +
        "Even 'one of the players' talks about one person, though the noun after 'of' is plural.",
      definition:
        "The words:\n" +
        "- **Each** and **every** + singular noun + singular verb: **Each** time no one responded; **Every** employee has a duty.\n" +
        "- **Each of** + plural noun + singular verb: **Each of** these paintings **is** famous. ('Every of' is wrong; say 'every one of'.)\n" +
        "- **Either** (one of two) and **neither** (none of two) + singular noun: either road, neither answer.\n" +
        "- **One of** + plural noun + singular verb: one of the **players**; One of my friends **is** a doctor.\n" +
        "- **Not every** = not all: Not every metal is solid.\n" +
        "- An amount of time, money or distance taken as one unit is singular: Ten years **is** a long time.\n" +
        "- Labels: each, every, either, neither before a noun are called **distributive** adjectives (or determiners).",
      authoredExample: {
        prompt:
          "Fill in the blank: _______ player in the team received a medal. (a) All (b) Each (c) Both (d) Many",
        steps: [
          "The noun 'player' is singular, and the verb 'received' must go with it.",
          "All, Both and Many need a plural noun (all players). Strike them.",
          "'Each' takes a singular noun and looks at the players one by one.",
        ],
        answer: "(b) Each.",
      },
      selfCheckExample: {
        prompt:
          "Fill in the blank: Neither of the two answers _______ correct. (a) are (b) is (c) were (d) have been",
        steps: [
          "The subject is 'Neither', not 'answers'. 'Of the two answers' only says from which group.",
          "'Neither' means not one and not the other: it is singular.",
          "A singular subject in the present takes 'is'.",
        ],
        answer: "(b) is.",
      },
      practiceSet: [
        { prompt: "Every one of the boys _______ present. (was / were)", answer: "was", method: "'every one' is singular" },
        { prompt: "One of my friends _______ a doctor. (is / are)", answer: "is", method: "the subject is 'one'" },
        { prompt: "Five kilometres _______ a long way to walk. (is / are)", answer: "is", method: "a distance taken as one unit" },
        { prompt: "Correct the error: 'Every of the students passed.'", answer: "Every one of the students passed (or: Each of the students passed).", method: "'every' cannot be followed by 'of'" },
      ],
      pyqExampleId: "a0a7fe2c-7745-41e2-9066-f6d26c219f4d",
      traps: [
        {
          title: "'One of the ...' needs a plural noun",
          body:
            "Write 'one of the **players**', never 'one of the player'. But the verb after it stays singular: One of the players **is** injured.",
        },
        {
          title: "Either is for two only",
          body:
            "'Either' and 'neither' speak of two things: either end of the bridge, neither of my two brothers. For more than two, use any or none.",
        },
        {
          title: "Each and every in a label question",
          body:
            "When 'every' or 'each' is underlined before a noun, it is an **adjective** (a distributive adjective). It is not an adverb, even in 'every day'.",
        },
      ],
    },

    // C5 — whichever, these, all
    {
      kind: "reference" as const,
      slug: "cdsenpos-which-these-all",
      name: "Whichever, these, all",
      intuition:
        "Three more pointing words. 'Whichever' picks any one from a small known set. 'These' points to plural things near you. 'All' before a noun means every one of them.",
      definition:
        "The words:\n" +
        "- **Whichever**: any one from a known, limited set (whichever road we take, of the few roads there are).\n" +
        "- **Whatever**: anything at all, from an open range (Do whatever you like).\n" +
        "- **This / these**: near things, singular / plural. **That / those**: far things.\n" +
        "- **All**: before a noun it is a determiner (all good things). On its own it is a pronoun (All were present).",
      table: {
        columns: ["Word", "Use", "In the sentence", "Sitting"],
        rows: [
          {
            cells: ["Whichever", "any one from a known, limited set", "Whichever road we take, we shall be late", "2022 (I)"],
            pyqExampleId: "318f4476-862e-49ac-90ba-853b8135e9f7",
          },
          {
            cells: ["all", "every one of; here a determiner before the noun", "May you be blessed with all good things of life", "2022 (II)"],
            noteAmber:
              "No 'Determiner' or 'Adjective' option was given here. When the exact label is missing, pick the closest one offered: 'Pronoun', the class 'all' has when it stands alone.",
          },
          {
            cells: ["these", "points to plural things near in time or place", "There is no truth in these claims", "2025 (I)"],
            pyqExampleId: "b15a4a95-f3ad-44e3-8e2c-c892602f1689",
          },
          {
            cells: ["whichever", "any one from the collection on offer", "You can choose whichever shirt you like from the collection", "2025 (II)"],
          },
        ],
        caption: "Whichever chooses from a limited set; whatever ranges over anything.",
      },
      pyqExampleId: "99bb038e-e4d9-45ca-8053-b2661c4974fa",
      selfCheckExample: {
        prompt:
          "Name the class of the underlined word: \\(\\underline{\\text{All}}\\) were present at the meeting.",
        steps: [
          "Is there a noun right after it? No, the verb 'were' follows.",
          "The word stands in place of a noun (all the members).",
          "A word that stands alone in place of a noun is a pronoun.",
        ],
        answer: "Pronoun.",
      },
      practiceSet: [
        { prompt: "Spot the wrong row: (1) whichever = any one from a known, small set; (2) whatever = any one from a known, small set.", answer: "Row 2", method: "'whatever' means anything at all" },
        { prompt: "_______ books on the top shelf are mine. (This / These)", answer: "These", method: "plural noun 'books'" },
        { prompt: "Do _______ you like; I don't mind. (whatever / whichever)", answer: "whatever", method: "an open choice, no set given" },
        { prompt: "Class of 'all' in 'all the money'?", answer: "Determiner", method: "it stands before a noun" },
      ],
      traps: [
        {
          title: "Whichever or whatever",
          body:
            "If the sentence names or implies a small set to choose from (a road, the shops in this street), use **whichever**. If the choice is open, use **whatever**.",
        },
        {
          title: "Look-alikes of 'these'",
          body:
            "'Thus' and 'there' look like 'these' but cannot stand before a noun. Before a plural noun such as 'claims', only **these** (or those) fits.",
        },
        {
          title: "'All' alone or before a noun",
          body:
            "'All good things' (determiner: a noun follows). 'All were present' (pronoun: no noun follows). Use the same next-word test as for this, that and his.",
        },
      ],
    },
  ],
};
