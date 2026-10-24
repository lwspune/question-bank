import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_SR_LINKERS_NOTE: SubtopicNote = {
  subtopicName: "Linkers and the None Option",
  title: "Linkers and the None Option",
  oneLineDefinition:
    "Joining words such as but, yet, while and even if show which idea comes first, and the right order is checked against every printed option before 'None of these' is chosen.",
  whyItMatters:
    "Four questions in the bank, all MODERATE, two from the 2022 paper. They are longer sentences held together by a contrast or a condition, and one of them has its right order missing from the options, so the answer is 'None of these'.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spisrli-linkers",
      name: "Joining words show the order",
      intuition:
        "A joining word tells you what kind of link the two ideas have. 'But' and 'yet' turn against what came before, so the idea they turn against must come first. Read the link, and the two halves fall into place.",
      definition:
        "- **but, yet, though**: a contrast. The part that starts with them follows the idea it contrasts with.\n" +
        "- **when, while, as**: two things at the same time. They join a second event to a main one.\n" +
        "- **even if, although**: a condition or a surprise. The part can lead the sentence or follow the main idea.\n" +
        "- **not only ... but also**: always in that order, and the two halves are the same kind of thing.\n" +
        "- **because, so**: a reason and a result. 'Because' brings the reason; 'so' brings the result.",
      authoredExample: {
        prompt:
          "Rearrange: P: but the shops were closed / Q: we reached the market / R: because it was a holiday / S: early in the morning",
        steps: [
          "Q opens: we is the subject.",
          "S tells when we reached: Q S.",
          "'But' turns against reaching the market: the shops were closed. So P comes next.",
          "'Because' gives the reason the shops were closed: R last.",
        ],
        answer: "Q S P R: We reached the market early in the morning but the shops were closed because it was a holiday.",
      },
      selfCheckExample: {
        prompt:
          "Rearrange: P: not only cleaned the house / Q: Seema / R: but also cooked / S: dinner for the guests",
        steps: [
          "Q opens: Seema is the subject.",
          "'Not only' comes before 'but also': P then R.",
          "'Cooked' needs what was cooked: S.",
        ],
        answer: "Q P R S: Seema not only cleaned the house but also cooked dinner for the guests.",
      },
      practiceSet: [
        {
          prompt:
            "Rearrange: P: yet he finished the race / Q: the runner hurt his foot",
          answer: "Q P: The runner hurt his foot, yet he finished the race.",
        },
        {
          prompt:
            "Rearrange: P: while she was cooking / Q: the phone rang",
          answer: "Q P: The phone rang while she was cooking.",
        },
        {
          prompt:
            "Which comes first, the part with 'not only' or the part with 'but also'?",
          answer: "The part with 'not only'.",
        },
        {
          prompt:
            "Rearrange: P: so the match was put off / Q: it rained all day",
          answer: "Q P: It rained all day, so the match was put off.",
          method: "'So' brings the result, which follows the reason.",
        },
      ],
      pyqExampleId: "d214da6e-9708-412c-985c-53f330ffec51",
      traps: [
        {
          title: "Putting 'but' or 'yet' first",
          body:
            "A part that starts with 'but' or 'yet' answers an idea already given. It cannot be the first part of the sentence.",
        },
        {
          title: "Reversing reason and result",
          body:
            "'Because' introduces the reason and 'so' the result. Swapping them gives a sentence that says the effect caused the cause.",
        },
        {
          title: "Splitting 'not only' from its noun",
          body:
            "The two halves of 'not only ... but also' must be the same kind of thing: two actions, or two nouns. A half that does not match its partner is in the wrong place.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spisrli-none",
      name: "Check the options before choosing None of these",
      intuition:
        "Build the sentence yourself first, then look for your order among the options. If it is not there, and your order reads correctly, the answer is 'None of these'. Do not change a good order to fit a printed one.",
      definition:
        "The method:\n" +
        "- Work out the order from the opener, the glued pairs and the joining words.\n" +
        "- Read your sentence aloud in your head. It must make sense and be grammatical.\n" +
        "- Cut options fast by their first letter and by any pair you are sure of.\n" +
        "- If your order is printed, mark it. If not, test the printed orders once: if each one breaks a pair or a link, choose **None of these**.\n" +
        "- In the 2022 paper the instructions say: if the correct order is not given, choose (d) None of these.",
      authoredExample: {
        prompt:
          "Rearrange: P: who was hungry / Q: the little boy / R: ate all the bread / S: on the table. Options: (a) QRPS (b) PQRS (c) QPSR (d) None of these",
        steps: [
          "Q opens, and 'who' must follow the boy: Q P.",
          "R gives the verb, and S says where the bread was: Q P R S.",
          "QPRS is not printed. (a) puts 'who was hungry' after the bread, (b) opens with 'who', (c) puts the boy on the table.",
        ],
        answer: "(d) None of these",
      },
      selfCheckExample: {
        prompt:
          "Rearrange: P: of the team / Q: the captain / R: lifted the cup / S: with both hands. Options: (a) PQRS (b) QPRS (c) RSQP (d) None of these",
        steps: [
          "Q opens and 'of the team' belongs to the captain: Q P.",
          "R has the verb and S says how: Q P R S.",
          "QPRS is printed as (b).",
        ],
        answer: "(b) QPRS",
      },
      practiceSet: [
        {
          prompt:
            "Your order is SPQR and the options are PQRS, QSPR, RSPQ and None of these. Your sentence reads correctly. What do you mark?",
          answer: "None of these",
        },
        {
          prompt:
            "You know Q must open the sentence. Options: PQRS, QRSP, SQPR, RPQS. How many options are left after this one check?",
          answer: "One: QRSP",
        },
        {
          prompt:
            "Parts: P: in the pond / Q: the ducks / R: swam happily. You built QRP. The options are PQR, RPQ, QPR and None of these. What do you mark?",
          answer: "QPR",
          method: "QPR reads 'The ducks in the pond swam happily', a second correct order, so None of these is wrong.",
        },
        {
          prompt: "Before choosing 'None of these', what must you be sure of about your own order?",
          answer: "That it reads as a correct, sensible sentence.",
        },
      ],
      pyqExampleId: "78a8592c-dc8b-4a53-86d5-f9455e802410",
      traps: [
        {
          title: "Forcing the nearest option",
          body:
            "If your order is right and not printed, the answer is 'None of these'. Picking an option that is one swap away from yours costs the mark.",
        },
        {
          title: "Choosing None of these too quickly",
          body:
            "Some sentences can be built in two good orders. Before marking 'None of these', check whether a printed option is a second correct order.",
        },
        {
          title: "Not reading the instructions",
          body:
            "The option (d) may be an ordinary order in one set of questions and 'None of these' in another. Read what the options say before you answer.",
        },
      ],
    },
  ],
};
