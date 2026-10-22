import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PO_GV_MINISTERS_NOTE: SubtopicNote = {
  subtopicName: "Prime Minister, Ministers and Law Officers",
  title: "Prime Minister, Ministers and Law Officers",
  oneLineDefinition:
    "How the Council of Ministers is formed and how big it may be, why it answers to the Lok Sabha, how a no-confidence motion works, and the Attorney General.",
  whyItMatters:
    "Eight CDS questions from 2018 to 2025. Two ask about the no-confidence motion (2021 and 2025) and three about the Articles that build the Council of Ministers (74 to 78). The size cap, 15 per cent of the Lok Sabha, is the number to know exactly.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdspolgv-council",
      name: "The Council of Ministers",
      intuition:
        "The President is the formal head, but the real work of government is done by the Prime Minister and the ministers. The Constitution makes them answer to the Lok Sabha, the House the people elect, and caps their number so that a government cannot reward every supporter with a ministry.",
      definition:
        "Articles 74 to 78:\n" +
        "- **Article 74**: a **Council of Ministers headed by the Prime Minister** aids and advises the President. Since the **42nd Amendment (1976)** the President must act on that advice; since the **44th (1978)** the President may send it back **once** for reconsideration.\n" +
        "- **Article 75(1)**: the President appoints the Prime Minister, and the other ministers **on the Prime Minister's advice**.\n" +
        "- **Article 75(1A)**, added by the **91st Amendment (2003)**: the total number of ministers, the Prime Minister included, may not exceed **15 per cent of the total members of the Lok Sabha**.\n" +
        "- **Article 75(3)**: the Council is **collectively responsible to the Lok Sabha**.\n" +
        "- **Article 75(5)**: a person who is **not an MP** can be made a minister, but must become a member of either House within **six consecutive months**.\n" +
        "- **Article 77**: all executive action is taken **in the name of the President**. **Article 78**: the Prime Minister must **tell the President** all decisions of the Council and give any information the President asks for.",
      table: {
        columns: ["Article", "What it says"],
        rows: [
          { cells: ["74", "The Council of Ministers aids and advises the President"] },
          { cells: ["75(1A)", "Ministers may number at most 15 per cent of the Lok Sabha's strength"] },
          { cells: ["75(3)", "The Council is collectively responsible to the Lok Sabha"] },
          {
            cells: ["75(5)", "A non-member may be a minister for six months without a seat"],
            noteAmber: "CDS 2021 (I): 'a person from outside Parliament can never be appointed to the Cabinet' is the wrong description.",
            pyqExampleId: "c85ae346-2cb0-4660-86c7-4aa887315cb7",
          },
          { cells: ["77", "Executive action is taken in the President's name"] },
          {
            cells: ["78", "The Prime Minister keeps the President informed of the Council's decisions"],
            noteAmber: "CDS 2022 (I): the Article requiring the Prime Minister to furnish information to the President is 78.",
            pyqExampleId: "50009b63-eacc-4c94-a16b-075e14136d4b",
          },
        ],
      },
      pyqExampleId: "bf04036d-2578-42c8-8d23-a541433c5769",
      selfCheckExample: {
        prompt: "A well-known economist who is not a Member of Parliament is sworn in as a Union Minister on 1 March. By about when must she win a seat in Parliament to stay a minister?",
        steps: [
          "Article 75(5) lets a non-member be a minister for six consecutive months.",
          "Six months from 1 March runs to the end of August.",
        ],
        answer: "By about the end of August, or she must leave the ministry.",
      },
      practiceSet: [
        { prompt: "Which Article says a Council of Ministers headed by the Prime Minister shall aid and advise the President?", answer: "Article 74" },
        { prompt: "To which House is the Union Council of Ministers collectively responsible?", answer: "The Lok Sabha" },
        { prompt: "Which amendment made the President bound to act on the advice of the Council of Ministers?", answer: "The 42nd Amendment (1976)" },
        { prompt: "In whose name is all executive action of the Government of India taken?", answer: "The President's (Article 77)" },
      ],
      traps: [
        {
          title: "Fifteen per cent of the Lok Sabha",
          body: "The cap on ministers is **15 per cent** of the **Lok Sabha's** total strength. Options that say 10 per cent, or that count the members of both Houses of Parliament, are wrong.",
        },
        {
          title: "A minister without a seat, for six months",
          body: "A person outside Parliament **can** be made a minister, Prime Minister included, but must become an MP within **six consecutive months**. 'Never' and 'only after election' are both wrong.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-no-confidence",
      name: "No-confidence and censure motions",
      intuition:
        "Because the ministers stand or fall together, the Lok Sabha does not vote out a single minister: it says whether it still trusts the whole government. That is the no-confidence motion. A censure motion is milder: it criticises the government for something specific, so it has to say what.",
      definition:
        "The two motions:\n" +
        "- A **no-confidence motion** is moved **only in the Lok Sabha**, because the Council of Ministers is responsible to the Lok Sabha alone. The Rajya Sabha cannot entertain one.\n" +
        "- It is moved against the **whole Council of Ministers**, never one minister.\n" +
        "- It **need not state reasons**, and is admitted if **50 members** support it.\n" +
        "- If it is passed, the **whole Council of Ministers must resign**.\n" +
        "- A **censure motion** must **state its grounds**. It may be against one minister, a group of ministers or the whole Council. If it passes, the government is **not bound to resign**, though it should seek the House's confidence.",
      table: {
        columns: ["Point", "No-confidence motion", "Censure motion"],
        rows: [
          { cells: ["Must it give reasons?", "No", "Yes"] },
          {
            cells: ["Against whom?", "The whole Council of Ministers", "A minister, a group of ministers or the whole Council"],
            noteAmber: "CDS 2021 (I): a no-confidence motion is moved against the Council of Ministers, not one minister or the Prime Minister alone.",
            pyqExampleId: "52f3eb12-91a5-4bb8-be45-6123d9b377d9",
          },
          { cells: ["If passed", "The Council of Ministers must resign", "The government need not resign"] },        ],
      },
      pyqExampleId: "fe63ee70-07e1-47b9-b676-43dd0a6b2109",
      selfCheckExample: {
        prompt: "The Lok Sabha passes a censure motion against the government's handling of a flood. Does the Council of Ministers have to resign at once?",
        steps: [
          "A censure motion criticises the government on stated grounds.",
          "Only a no-confidence motion forces the whole Council to resign.",
        ],
        answer: "No. It is not bound to resign, though it should seek the House's confidence.",
      },
      practiceSet: [
        { prompt: "How many members must support a no-confidence motion before it is admitted?", answer: "50" },
        { prompt: "What happens to the Council of Ministers if a no-confidence motion is passed?", answer: "The whole Council must resign" },
        { prompt: "Which motion must set out specific charges against the government: no-confidence or censure?", answer: "Censure" },
        { prompt: "Which Article makes the Council of Ministers collectively responsible to the Lok Sabha?", answer: "Article 75(3)" },
      ],
      traps: [
        {
          title: "No reasons for no-confidence",
          body: "A **no-confidence** motion need not give any reason. A **censure** motion must. Options that swap the two are the usual trap.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdspolgv-law-officers",
      name: "The Attorney General and Solicitor General",
      intuition:
        "The government needs its own lawyer. The Attorney General is the top one, and the Constitution creates the office. He is paid a fee for the government's cases but is not a government servant, so he may still take private cases that are not against the government.",
      definition:
        "The Attorney General (**Article 76**):\n" +
        "- Appointed by the **President**; must be **qualified to be a Judge of the Supreme Court**; holds office **during the pleasure of the President**.\n" +
        "- The **first law officer** of the Government of India.\n" +
        "- **Not a full-time counsel** and not a government servant, so **private practice** is allowed (not against the Government of India).\n" +
        "- May **speak** in either House of Parliament and its committees, but has **no vote** (Article 88). Gets the **privileges of an MP** (Article 105(4)).\n\n" +
        "The **Solicitor General** is the **second law officer** and assists the Attorney General. The post is **not created by the Constitution**. Appointments are made through the **Appointments Committee of the Cabinet**. A State's law officer is the **Advocate General** (Article 165).",
      table: {
        columns: ["Point", "Attorney General", "Solicitor General"],
        rows: [
          {
            cells: ["Rank", "First law officer", "Second law officer"],
            noteAmber: "CDS 2018 (I): the false statement was that the Attorney General is a whole-time counsel for the Government.",
            pyqExampleId: "e7bda1d5-c61c-4bd4-a4d8-6213c3f67b1f",
          },
          { cells: ["Source of the office", "Article 76 of the Constitution", "Not in the Constitution"] },
          { cells: ["Qualification", "Fit to be a Supreme Court judge", "Set by the appointment rules"] },
          { cells: ["Right to speak in Parliament", "Yes, but no vote", "No"] },
        ],
      },
      pyqExampleId: "e7bda1d5-c61c-4bd4-a4d8-6213c3f67b1f",
      selfCheckExample: {
        prompt: "During a Lok Sabha debate on a Bill, the Attorney General explains its legal effect. When the Bill is put to the vote, may he vote?",
        steps: [
          "Article 88 lets the Attorney General speak in, and take part in the proceedings of, either House.",
          "The same Article says he is not entitled to vote.",
        ],
        answer: "No. He may speak but not vote.",
      },
      practiceSet: [
        { prompt: "Who appoints the Attorney General of India?", answer: "The President" },
        { prompt: "Which Article creates the office of the Attorney General?", answer: "Article 76" },
        { prompt: "Who is the second law officer of the Government of India?", answer: "The Solicitor General" },
        { prompt: "What is the State-level counterpart of the Attorney General called?", answer: "The Advocate General" },
      ],
      traps: [
        {
          title: "The Attorney General may practise privately",
          body: "The Attorney General is **not** a full-time counsel or a government servant, so he keeps a private practice. He may not appear against the Government of India.",
        },
        {
          title: "Only one law officer is in the Constitution",
          body: "The **Attorney General** (Article 76) is a constitutional office. The **Solicitor General** is not, and is the second law officer, not the chief legal adviser.",
        },
      ],
    },
  ],
};
