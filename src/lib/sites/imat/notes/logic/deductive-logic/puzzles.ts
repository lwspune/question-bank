import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_LOG_DED_PUZZLES_NOTE: SubtopicNote = {
  subtopicName: "Logic Puzzles",
  title: "Certainty, Truth-tellers and Assignment Puzzles",
  oneLineDefinition:
    "Puzzles give a set of rules and ask what must follow; you solve them by testing cases, building the worst case, and crossing out what the rules forbid.",
  whyItMatters:
    "A 2025 ministry question asked which object is in which container under a few exclusion rules, an assignment puzzle solved by elimination. The Cambridge papers asked what must be true after objects are drawn from a bag (2011) and who won a tournament from scoring rules (2014).",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-ded-worst-case",
      name: "What must happen: worst-case reasoning and the pigeonhole principle",
      intuition:
        "\"Must\" means \"even with the worst possible luck\". To find how many items guarantee a result, imagine taking every item that avoids the result first; one more item then forces it. The same idea says that if there are more items than boxes, some box holds at least two.",
      definition:
        "- A statement **must** be true only if it holds in the least favourable case. \"Could\" needs just one case.\n" +
        "- **Worst case**: to be sure of getting at least \\(k\\) items of a wanted kind, take every unwanted item first, then \\(k\\) wanted ones.\n" +
        "- **Pigeonhole principle**: if \\(n + 1\\) items go into \\(n\\) boxes, at least one box holds two or more items.",
      formula: {
        label: "Guarantee by the worst case",
        latex: "\\text{items needed} = (\\text{largest number you could take without the result}) + 1",
        symbols: [
          { symbol: "\\(n + 1\\)", meaning: "items into \\(n\\) boxes force a shared box" },
        ],
      },
      authoredExample: {
        prompt:
          "A drawer holds 5 black socks, 4 white socks and 3 grey socks, all loose. Taking socks in the dark, how many must you take to be sure of (a) a matching pair, (b) two white socks?",
        steps: [
          "(a) The worst case gives one sock of each colour: 3 socks and no pair. The 4th sock must match one of them, so 4.",
          "(b) The worst case takes every non-white sock first: \\(5 + 3 = 8\\). Then 2 more are both white: \\(8 + 2 = 10\\).",
        ],
        answer: "(a) 4 socks; (b) 10 socks",
      },
      selfCheckExample: {
        prompt:
          "A jar contains 7 lemon sweets, 5 mint sweets and 3 cherry sweets. Without looking, what is the smallest number of sweets you must take to be certain of having at least one mint sweet?",
        options: ["6", "2", "11", "10", "8"],
        steps: [
          "In the worst case every non-mint sweet comes out first: \\(7 + 3 = 10\\) sweets, none of them mint.",
          "The next sweet must be mint, so 11 sweets are needed.",
          "D forgets the final sweet. E forgets the cherry sweets. A and B describe lucky cases, which cannot give certainty.",
        ],
        answer: "(C) 11",
      },
      practiceSet: [
        { prompt: "13 people are in a room. Must two of them have been born in the same month?", answer: "Yes", method: "13 people, 12 months" },
        { prompt: "How many people must you gather to be sure that two were born on the same day of the week?", answer: "8", method: "7 days, plus 1" },
        { prompt: "A bag holds 3 green and 9 blue counters. How many must you take to be sure of two of the same colour?", answer: "3", method: "Two colours, plus 1" },
      ],
      traps: [
        {
          title: "\"Could happen\" is not \"must happen\"",
          body: "An option that is true in the lucky case (\"the next one will be mint\") is not certain. For \"must\" or \"definitely\" questions, test each option against the worst case that the rules allow.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ded-truth-liars",
      name: "Truth-tellers and liars: assume a case and test it",
      intuition:
        "Each person either always tells the truth or always lies, so every statement is a test. Assume one person is a truth-teller and follow the consequences. If they lead to a contradiction, the assumption is wrong and that person is a liar.",
      definition:
        "- A **truth-teller**'s statements are all true; a **liar**'s statements are all false.\n" +
        "- Method: pick one person, assume they tell the truth, and work out what everyone else must be. A **contradiction** rules the case out. Then try the other case.\n" +
        "- With \\(n\\) people there are \\(2^n\\) possible cases, so with three people you can simply check all 8.\n" +
        "- A liar's statement is false as a whole: the opposite of \"both are liars\" is \"at least one tells the truth\".\n" +
        "- Nobody can truthfully or falsely say \"I am a liar\", so that statement cannot appear in a consistent puzzle.",
      authoredExample: {
        prompt:
          "Ada and Bo each either always tell the truth or always lie. Ada says: \"At least one of us is a liar.\" What are Ada and Bo?",
        steps: [
          "Suppose Ada lies. Then her statement is false, so neither of them is a liar, which makes Ada truthful. Contradiction.",
          "So Ada tells the truth. Her statement is then true: at least one of them is a liar. Ada is not, so Bo is.",
        ],
        answer: "Ada tells the truth; Bo lies",
      },
      selfCheckExample: {
        prompt:
          "Pino, Quinto and Rosa each either always tell the truth or always lie. Pino says: \"Quinto is a liar.\" Quinto says: \"Rosa is a liar.\" Rosa says: \"Pino and Quinto are both liars.\" Who tells the truth?",
        options: [
          "Only Quinto",
          "Pino and Rosa",
          "Nobody",
          "Pino and Quinto",
          "Only Rosa",
        ],
        steps: [
          "Suppose Rosa tells the truth. Then Pino and Quinto both lie. But if Pino lies, Quinto is truthful. Contradiction, so Rosa lies.",
          "Quinto said Rosa is a liar, which is true, so Quinto tells the truth.",
          "Pino said Quinto is a liar, which is false, so Pino lies. Check Rosa: \"both lie\" is false because Quinto is truthful. Consistent.",
          "B, C, D and E each break at least one statement.",
        ],
        answer: "(A) Only Quinto",
      },
      practiceSet: [
        { prompt: "A says: \"B and I both tell the truth.\" B says: \"A is a liar.\" What are A and B?", answer: "A lies; B tells the truth", method: "If A were truthful, B would be too, but B calls A a liar" },
        { prompt: "A says \"B is a liar\" and B says \"A is a liar\". How many of them tell the truth?", answer: "Exactly one (either could be the one)" },
        { prompt: "What is the negation of \"Both of us are liars\"?", answer: "At least one of us tells the truth" },
      ],
      traps: [
        {
          title: "A liar's \"both\" statement is false, not reversed word by word",
          body: "If a liar says \"we are both truth-tellers\", it does not follow that both are liars. It only follows that at least one is a liar. Negate the whole statement, as for any negation.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-ded-assignment",
      name: "Assignment puzzles: a grid and elimination",
      intuition:
        "When each person gets exactly one item and each item goes to exactly one person, a grid makes the rules visible. Every \"not\" clue is a cross. A row or column with one empty square left must take a tick there, and that tick crosses out the rest of its column or row.",
      definition:
        "- Draw a grid: people down the side, items along the top.\n" +
        "- Mark each \"not\" clue with a cross. Mark each fixed fact with a tick, then cross the rest of that row and column.\n" +
        "- A row (or column) with a single square left gets the tick.\n" +
        "- If two people can only share the same two items between them, nobody else can have those items.\n" +
        "- In a multiple-choice item, testing each option against every clue is often faster: reject an option at its first broken clue.",
      authoredExample: {
        prompt:
          "Anna, Bruno and Chiara live in Rome, Milan and Turin, one each. Anna does not live in Rome. Bruno lives neither in Milan nor in Turin. Chiara does not live in Turin. Who lives where?",
        steps: [
          "Bruno's row has crosses on Milan and Turin, so Bruno lives in Rome. Cross Rome for everyone else.",
          "Chiara can no longer have Rome or Turin, so Chiara lives in Milan.",
          "Anna has the one city left: Turin.",
        ],
        answer: "Anna: Turin; Bruno: Rome; Chiara: Milan",
      },
      selfCheckExample: {
        prompt:
          "Dario, Elena, Fabio and Gaia each study a different subject: biology, chemistry, physics or maths. Dario studies neither biology, chemistry nor maths. Elena studies neither physics nor chemistry. Gaia studies neither maths nor biology. Fabio studies neither physics nor maths. Which assignment fits all the clues?",
        options: [
          "Dario maths, Elena biology, Fabio chemistry, Gaia physics",
          "Dario physics, Elena chemistry, Fabio biology, Gaia maths",
          "Dario physics, Elena maths, Fabio chemistry, Gaia biology",
          "Dario chemistry, Elena maths, Fabio biology, Gaia physics",
          "Dario physics, Elena maths, Fabio biology, Gaia chemistry",
        ],
        steps: [
          "Dario is left with physics only. Gaia (not maths, not biology, not physics) must take chemistry.",
          "Fabio (not physics, not maths, not chemistry) takes biology, and Elena takes the last subject, maths. That is E.",
          "A breaks Dario's clue (maths). B breaks Elena's (chemistry). C breaks Gaia's (biology). D breaks Dario's (chemistry).",
        ],
        answer: "(E) Dario physics, Elena maths, Fabio biology, Gaia chemistry",
      },
      practiceSet: [
        { prompt: "In a complete grid for 4 people and 4 items, how many ticks does each row hold?", answer: "Exactly one" },
        { prompt: "Ada, Ben and Cy each own one pet: a cat, a dog or a fish. Ada's pet has no fur. Ben does not own the dog. Who owns what?", answer: "Ada fish, Ben cat, Cy dog" },
        { prompt: "Two people can each only have the red or the blue card. What does this tell you about everyone else?", answer: "Nobody else has the red or the blue card", method: "Those two use up both cards" },
      ],
      traps: [
        {
          title: "Check every clue against your chosen option",
          body: "An option often satisfies the first two clues and fails a later one. Before choosing, run the option through every clue; a single broken clue rules it out.",
        },
      ],
    },
  ],
};
