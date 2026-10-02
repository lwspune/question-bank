import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PQ_SUBJECT_VERB_NOTE: SubtopicNote = {
  subtopicName: "Subject and Verb (PQRS)",
  title: "Join the subject to its verb",
  oneLineDefinition:
    "A jumbled sentence is rebuilt around its core: find who or what the sentence is about, join it to the verb that agrees with it, then attach the other parts.",
  whyItMatters:
    "CDS English papers set a block of items where one sentence is cut into four parts, P, Q, R and S, and you pick the right order from four options. " +
    "In most of them the fastest first move is the subject and its verb. Once those two parts are locked together, two or three options usually fall away at once.",
  concepts: [
    // C1 — the item format, the routine, subject + verb
    {
      kind: "formula",
      slug: "cdsenpq-subject-verb",
      name: "A subject needs its verb",
      intuition:
        "Every sentence has a core: someone or something, and what it does or is. In a jumbled sentence that core is split across two parts. " +
        "Find those two parts first and join them. The rest of the order follows, and the options do most of the work for you.",
      definition:
        "The item:\n" +
        "- One sentence is cut into four **parts**, labelled P, Q, R and S. Sometimes a few words are printed before P; then the sentence starts with them.\n" +
        "- Four options give four orders, such as (a) RQSP. Only one of them makes a correct, natural sentence.\n" +
        "The terms:\n" +
        "- **Subject**: the person or thing the sentence is about: the members of the club, fruit and vegetables, some archaeologists.\n" +
        "- **Verb**: the word that says what the subject does or is: have sent, are, held.\n" +
        "- **Lock a pair**: decide that two parts must sit side by side, one right after the other.\n" +
        "The routine:\n" +
        "- Find the part that holds the subject. It is usually a noun phrase with no verb of its own.\n" +
        "- Find the part that holds its verb. The verb must agree: a plural subject takes are, have, were; a singular one takes is, has, was.\n" +
        "- Lock the pair: subject part, then verb part.\n" +
        "- Now look at the options. Keep only those that have the pair side by side, in that order. Usually one or two survive.\n" +
        "- Attach the other parts where they make sense, then read the survivor from start to end as one sentence.\n" +
        "- If one part holds both the subject and its verb (he wrote, the camel uses), it usually opens the sentence. Then ask what must come after that verb.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: to the flood victims / Q: the members of the club / R: have sent / S: blankets and medicines. " +
          "Options: (a) QRSP (b) SRQP (c) QSRP (d) PRQS",
        steps: [
          "Subject: who did something? Q, 'the members of the club'. It has no verb of its own.",
          "Verb: R, 'have sent'. It agrees with members, which is plural. It is have, not has, because the subject is the members, not the club.",
          "Lock the pair Q R. Only (a) has Q then R side by side. (b), (c) and (d) are struck out at once.",
          "Check (a): what was sent comes next (S), and who received it closes the sentence (P).",
          "Read it: 'the members of the club have sent blankets and medicines to the flood victims'.",
        ],
        answer: "(a) QRSP",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: was cancelled / Q: because of heavy rain / R: the match between the two schools / S: on Saturday. " +
          "Options: (a) RPSQ (b) PRQS (c) SPRQ (d) QPRS",
        steps: [
          "Subject: R, 'the match between the two schools'. Its main noun is match, which is singular.",
          "Verb: P, 'was cancelled'. was agrees with match. Do not let the nearer word 'schools' fool you.",
          "Lock R P. Only (a) has R then P side by side.",
          "Read it: 'the match between the two schools was cancelled on Saturday because of heavy rain'.",
        ],
        answer: "(a) RPSQ",
      },
      practiceSet: [
        {
          prompt: "Which part holds the subject? P: is growing fast / Q: the number of students / R: in our town",
          answer: "Q. Order QRP: the number of students in our town is growing fast.",
          method: "The main noun is number, which is singular, so its verb is is.",
        },
        {
          prompt: "Lock the pair. P: have won / Q: the girls of Class 10 / R: the inter-school quiz",
          answer: "Q then P. Order QPR: the girls of Class 10 have won the inter-school quiz.",
          method: "Subject part first, its verb part right after it.",
        },
        {
          prompt:
            "S holds the subject and P holds its verb. Options: (a) SPQR (b) QSRP (c) RSQP (d) PQRS. Which option survives?",
          answer: "(a) SPQR",
          method: "Keep only options where S is followed directly by P.",
        },
        {
          prompt: "Choose the verb: 'The box of old letters ___ in the cupboard.' (is / are)",
          answer: "is",
          method: "The subject is box, not letters.",
        },
      ],
      pyqExampleId: "b5fc5973-acb6-45bc-9d63-de7d0be47027",
      traps: [
        {
          title: "Agreeing with the nearest noun",
          body:
            "In 'the price of these shirts', the subject is **price**, not shirts. So the verb is is, not are. " +
            "A verb agrees with the main noun of the subject part, not with the noun that happens to sit next to it.",
        },
        {
          title: "Opening with a verb part",
          body:
            "A part that starts with 'has become' or 'are often asked' has no subject in it. It cannot open a statement. " +
            "Strike any option that starts with such a part.",
        },
        {
          title: "Two noun phrases, one subject",
          body:
            "Often two parts look like subjects. Check the verb's number: 'were' needs a plural subject, 'has' a singular one. " +
            "The noun phrase that does not agree belongs after the verb, not before it.",
        },
        {
          title: "Stopping after the pair",
          body:
            "Sometimes two options both keep the pair together. Do not guess between them. " +
            "Read each from start to end; only one will place every other part where it makes sense.",
        },
      ],
    },

    // C2 — finish the verb: helping verb + complement / main verb
    {
      kind: "formula",
      slug: "cdsenpq-finish-the-verb",
      name: "Is, has, has been: finish the verb",
      intuition:
        "Some parts end on a verb that is not finished: 'agriculture has been', 'poetry is', 'India has'. " +
        "Such a part cannot end the sentence. The part that comes right after it must complete it.",
      definition:
        "The terms:\n" +
        "- **Helping verb**: a short verb such as is, was, are, has, has been, will be or should have been. It joins the subject to a description, or helps a main verb (has brought, is practised).\n" +
        "- **Complement**: the word or phrase after is, was, seems or becomes that says what the subject is: the road was **narrow**; he became **a captain**.\n" +
        "The method:\n" +
        "- Spot a part that ends on a helping verb.\n" +
        "- It needs something right after it: a complement (an adjective or a noun phrase), or the main verb (brought back, considered).\n" +
        "- Find the part that can follow it, and lock the pair.\n" +
        "- A part that ends on a helping verb can never close the sentence. Strike any option that puts it last.\n" +
        "- 'there is', 'there will be' need the thing that exists right after them: there will be **a meeting**.",
      authoredExample: {
        prompt:
          "Arrange the parts into one sentence. P: will be / Q: the parade ground / R: with flags for the visit / S: decorated. " +
          "Options: (a) QPSR (b) QSPR (c) PQSR (d) QPRS",
        steps: [
          "Subject: Q, 'the parade ground'.",
          "P, 'will be', is a helping verb. It is not finished and needs a word after it.",
          "S, 'decorated', completes it: will be decorated. Lock P S.",
          "With the subject first, the core is Q P S. Only (a) has that. R closes the sentence.",
          "Read it: 'the parade ground will be decorated with flags for the visit'.",
        ],
        answer: "(a) QPSR",
      },
      selfCheckExample: {
        prompt:
          "Arrange the parts into one sentence. P: has been / Q: a symbol of courage / R: for centuries / S: the old fort. " +
          "Options: (a) SPQR (b) SQPR (c) PSQR (d) SRQP",
        steps: [
          "Subject: S, 'the old fort'. Its verb is P, 'has been'.",
          "'has been' needs a complement: Q, 'a symbol of courage'. Lock S P Q.",
          "Only (a) has S P Q in a row. R closes it.",
        ],
        answer: "(a) SPQR",
      },
      practiceSet: [
        {
          prompt: "Can this part end the sentence? 'the result of the test was'",
          answer: "No.",
          method: "was needs a complement after it: was clear, was a surprise.",
        },
        {
          prompt: "Which part follows 'the soldiers were'? P: tired / Q: after the march / R: the camp",
          answer: "P. The soldiers were tired after the march.",
          method: "were needs a word that says what the soldiers were.",
        },
        {
          prompt: "Complete the verb: 'The new rules have ___ by the committee.' (been approved / approved)",
          answer: "been approved",
          method: "The rules do not approve anything; they are approved. So have + been + approved.",
        },
        {
          prompt: "Is this order right? 'laughter / the best medicine / is'",
          answer: "No. Laughter is the best medicine.",
          method: "is comes after the subject and before its complement.",
        },
      ],
      pyqExampleId: "482de415-38a7-4aad-80b1-6e77c565c9ff",
      traps: [
        {
          title: "Putting the helping-verb part last",
          body:
            "An option that ends on 'has been', 'is' or 'will be' leaves the verb unfinished. Strike it without reading further.",
        },
        {
          title: "Taking the wrong word after the helping verb",
          body:
            "After 'the soldiers were', both 'tired' and 'in the camp' can follow. Pick the one that still lets every other part find a place. " +
            "Try each choice in the options; do not stop at the first one that sounds fine.",
        },
        {
          title: "there is with a plural noun",
          body:
            "In 'there is' and 'there are', the verb agrees with the noun that comes after it: **there are two reasons**, there is one reason. " +
            "Use that noun's number to choose between parts.",
        },
      ],
    },
  ],
};
