import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_THIS_THESE_NOTE: SubtopicNote = {
  subtopicName: "This, These and Such",
  title: "This, these, such: find what the pointing word picks up",
  oneLineDefinition:
    "This, these, that, such and there point back to something just said. Find what they pick up, and put that sentence just before.",
  whyItMatters:
    "Pointing words are the clue examiners use most in these passages, and they are easy to miss because they look like ordinary words. " +
    "The hard items reword the noun ('decided to charge for water' becomes 'This decision') or use a bare 'This' for a whole sentence, so a word-for-word search fails.",
  concepts: [
    // C1 — 'This X' picks up a noun
    {
      kind: "formula" as const,
      slug: "cdsenps-this-noun",
      name: "'This X' repeats or rewords a noun just used",
      intuition:
        "'This staircase', 'these aspirations', 'such meters': each one points at something the last sentence named. Sometimes the noun is the same word; sometimes it is the same idea in a new word. " +
        "Either way, the sentence it points at sits just before.",
      definition:
        "The terms:\n" +
        "- **Demonstrative**: a pointing word: this, that, these, those, such.\n" +
        "- **Reworded reference**: 'this X' where X is a new word for an idea already given ('every five years' becomes 'this five-yearly census').\n" +
        "The method:\n" +
        "- Find every 'this X', 'these X', 'that X' and 'such X' at the start of P, Q, R and S.\n" +
        "- Look for the sentence that names X, or describes it in other words. Put it just before.\n" +
        "- Match number: this and that need one thing; these, those and such + plural need more than one.\n" +
        "- If three sentences each point back to the one before, they form a chain. Start the chain with the sentence that points at nothing, and follow the pointers.",
      authoredExample: {
        prompt:
          "S1: Every summer, the cantonment's water supply ran short.\n" +
          "P: This decision meant fitting a meter on every pipe.\n" +
          "Q: In 2015, the board decided to charge each house for the water it used.\n" +
          "R: The board held meetings in every ward to explain how the meters worked.\n" +
          "S: Such meters had never been used in the area, and many people distrusted them.\n" +
          "S6: Within two years, water use had fallen by a third.\n" +
          "(a) QPSR (b) QSPR (c) PQSR (d) QPRS",
        steps: [
          "P says 'This decision'. The decision is in Q ('the board decided to charge...'), in other words. So Q comes just before P. (b) and (c) fail.",
          "S says 'Such meters'. The meters are first named in P. So S comes after P.",
          "Compare (a) and (d). R's meetings answer the distrust in S, so S comes before R. (d) puts R before S and fails.",
          "Read (a): Q, P, S, R, S6.",
        ],
        answer: "(a) QPSR",
      },
      selfCheckExample: {
        prompt:
          "S1: Long ago, people in this region built their houses of mud and bamboo.\n" +
          "P: These materials kept the rooms cool in the hot months.\n" +
          "Q: Such repairs took weeks and cost a family a season's savings.\n" +
          "R: But heavy rain washed away part of the walls every monsoon.\n" +
          "S: The walls then had to be rebuilt by hand.\n" +
          "S6: That is why many families today prefer brick, even though it is hotter.\n" +
          "(a) PRSQ (b) RSQP (c) PQRS (d) RPSQ",
        steps: [
          "P's 'These materials' points at the mud and bamboo in S1, so P can follow S1 directly.",
          "Q's 'Such repairs' needs a repair named before it: the rebuilding in S. So S comes just before Q. (c) fails.",
          "R's 'But' turns from a good point. The good point is in P (the rooms stayed cool). So P comes before R. (b) and (d) put R before P and fail.",
          "Read (a): P, R, S, Q, S6.",
        ],
        answer: "(a) PRSQ",
      },
      practiceSet: [
        {
          prompt:
            "A middle sentence says 'This weapon changed warfare.' Which sentence fits before it? (i) The longbow could pierce armour at two hundred yards. (ii) Battles were often fought in winter.",
          answer: "(i)",
          method: "'This weapon' needs a weapon named; (i) names the longbow.",
        },
        {
          prompt:
            "One sentence says 'The census is held every ten years.' A later one says 'This ___ count'. Fill in the matching word.",
          answer: "ten-yearly (or decennial)",
          method: "The pointer rewords the idea of every ten years.",
        },
        {
          prompt: "Spot the wrong order: 'Such storms are rare in March. Last week a hailstorm flattened the wheat.'",
          answer: "Wrong. 'Such storms' needs the hailstorm first.",
        },
        {
          prompt: "'These problems' must follow a sentence that names how many problems?",
          answer: "Two or more.",
          method: "'These' is plural; one problem would need 'this problem'.",
        },
      ],
      pyqExampleId: "725cd050-e8c7-4197-9627-f8feab59fe87",
      traps: [
        {
          title: "Searching for the exact word",
          body:
            "'This decision' may point at a sentence that never uses the word 'decision' ('the board decided to charge...'). Match the **meaning**, not the spelling.",
        },
        {
          title: "Singular and plural",
          body:
            "'This' and 'such a' need one thing; 'these' and 'such' + plural need more than one. A plural pointer cannot pick up a single item, so use number to strike a candidate.",
        },
        {
          title: "Starting a chain in the middle",
          body:
            "When three sentences each point back to the one before, it is tempting to begin with the most important-sounding one. Begin instead with the sentence that points at **nothing**; every other link then falls into place.",
        },
      ],
    },

    // C2 — bare pointers sum up a sentence or a place
    {
      kind: "formula" as const,
      slug: "cdsenps-this-idea",
      name: "Bare 'this', 'that', 'these', 'there' sum up the sentence before",
      intuition:
        "Sometimes the pointing word stands alone: 'This is sensible', 'That will take a week', 'From there you can see...'. It does not pick up one noun. It sums up the whole action, fact or place in the sentence just before.",
      definition:
        "The terms:\n" +
        "- **Summary pointer**: this, that or these used alone, standing for a whole idea.\n" +
        "- **Place pointer**: there or here standing for a place just named.\n" +
        "The method:\n" +
        "- When a middle sentence starts with a bare This, That, These or There, ask: what idea or place does it stand for?\n" +
        "- Put the sentence that gives that idea or place just before it.\n" +
        "- Test it by replacing the pointer with the idea: 'That (the exam) will end on the 13th'. If the sentence then makes sense, the link holds.\n" +
        "- 'There is' and 'There are' are not pointers. Only 'there' meaning 'in that place' needs a place before it.",
      authoredExample: {
        prompt:
          "S1: Our unit was ordered to move to a new post in the hills.\n" +
          "P: This left us only four days to pack three years of equipment.\n" +
          "Q: The order came on a Monday, and the trucks were due on Friday.\n" +
          "R: That was hard, but the men worked through the nights.\n" +
          "S: When we reached the post, the cold was the first thing everyone noticed.\n" +
          "S6: Within a week, though, the new post felt like home.\n" +
          "(a) QPRS (b) PQRS (c) QRPS (d) PRQS",
        steps: [
          "P's bare 'This' must stand for something that leaves only four days. Moving to the hills (S1) does not do that; Monday to Friday (Q) does. So Q comes before P. (b) and (d) fail.",
          "R's 'That was hard' must stand for a hard task: packing three years of equipment in four days (P). So P comes just before R. (c) puts R before P and fails.",
          "Read (a): Q, P, R, then the arrival (S) and S6.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: The old fort above our town was built more than three hundred years ago.\n" +
          "P: That is why the kings of the region chose the site.\n" +
          "Q: From its hilltop walls, a guard could see an army coming a day before it arrived.\n" +
          "R: Today, a path of over a thousand steps climbs to its gate.\n" +
          "S: Few visitors make the climb in the summer heat.\n" +
          "S6: Those who do say the view from the walls is worth every step.\n" +
          "(a) PQRS (b) QPRS (c) QRSP (d) RSQP",
        steps: [
          "P's 'That is why' needs a reason just before it. The age of the fort (S1) is no reason to choose a site; a wide view of an approaching army (Q) is. So Q comes just before P. (a) fails.",
          "(c) and (d) put P at the end, after the summer visitors, where 'That is why the kings chose the site' has no reason before it. Both fail.",
          "Read (b): Q, P, R, S, S6.",
        ],
        answer: "(b) QPRS",
      },
      practiceSet: [
        {
          prompt: "'This made the march twice as long.' What must the sentence before it contain?",
          answer: "Something that could lengthen a march, such as a bridge washed away.",
          method: "Bare 'This' stands for the whole event before it.",
        },
        {
          prompt: "Which one sums up a whole sentence: (i) 'This bridge' (ii) a bare 'This'?",
          answer: "(ii)",
          method: "'This bridge' picks up one noun; a bare 'This' stands for the whole idea.",
        },
        {
          prompt: "'From there, the ships sailed east.' What must come before this sentence?",
          answer: "A place: a port or a harbour.",
          method: "'there' as a place needs the place named first.",
        },
        {
          prompt:
            "Spot the wrong order: 'That will take a week. The road to the camp has been washed away, and engineers will rebuild it.'",
          answer: "Wrong. 'That' must follow the rebuilding it stands for.",
        },
      ],
      pyqExampleId: "f8df75dc-a7d5-4352-bc55-0c180d75d1f6",
      traps: [
        {
          title: "Pointing at the last noun instead of the whole idea",
          body:
            "In 'The road was washed away. That will take a week to fix', 'That' stands for the damage, not for 'the road'. Read a bare pointer as the whole sentence before it.",
        },
        {
          title: "Treating 'There is' as a pointer",
          body:
            "'There is a lot of work' points at nothing; it can sit almost anywhere. Only 'there' meaning 'in that place' ('Sitting there', 'From there') needs a place just before it.",
        },
        {
          title: "Reaching too far back",
          body:
            "A bare pointer normally picks up the sentence just before. If you have to skip a sentence to find what 'that' means, the order is probably wrong.",
        },
      ],
    },
  ],
};
