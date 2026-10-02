import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_PRONOUNS_NOTE: SubtopicNote = {
  subtopicName: "Pronouns and Names in Paragraphs",
  title: "He, she, it, they: a pronoun needs its noun first",
  oneLineDefinition:
    "A pronoun such as he, it or they stands for a noun already named. The sentence that names the person or thing must come before the sentence that uses the pronoun.",
  whyItMatters:
    "Pronouns are the most reliable clue in these passages, because a pronoun cannot point at something the reader has not met yet. " +
    "The hard items put two people in one passage, so 'he' or 'she' seems to fit more than one place. The same rule covers 'the' before a noun: 'the committee' needs a committee named first.",
  concepts: [
    // C1 — pronoun points back
    {
      kind: "formula" as const,
      slug: "cdsenps-pronoun",
      name: "A pronoun points back to a named noun",
      intuition:
        "Read 'He wrote a letter' and you ask at once: who? The answer must already be on the page. So a sentence with a pronoun sits after the sentence that names its noun, usually right after it.",
      definition:
        "The terms:\n" +
        "- **Pronoun**: a short word that stands for a noun: he, she, it, they, him, her, them, his, its, their.\n" +
        "- **Antecedent**: the noun a pronoun stands for. It must come first.\n" +
        "- **The former / the latter**: the first and the second of two things just named.\n" +
        "The method:\n" +
        "- Circle every pronoun at the start of P, Q, R and S.\n" +
        "- For each one, find the noun it stands for: in S1, or in another middle sentence.\n" +
        "- If the noun is in another middle sentence, that sentence comes first, usually just before.\n" +
        "- When two people of the same kind are in the passage, ask who is acting in the sentence just before. The pronoun normally points to the person last named as the main actor.\n" +
        "- Check number: 'they' and 'their' need a plural noun; 'it' and 'its' need a singular one.",
      authoredExample: {
        prompt:
          "S1: In 1952, a young doctor arrived at a small hospital in the hills.\n" +
          "P: She asked the old nurse, Meena, to show her the wards.\n" +
          "Q: Her name was Kavita Rao, and she had just finished her training.\n" +
          "R: Meena had worked there for twenty years and knew every patient by name.\n" +
          "S: Bed by bed, she told the doctor each patient's story, as she had heard it over those years.\n" +
          "S6: By evening, the young doctor felt she already knew the hospital well.\n" +
          "(a) QPRS (b) PQRS (c) QRPS (d) QPSR",
        steps: [
          "There are two women in this passage, so 'she' needs care. Q names the young doctor of S1 (Kavita Rao). P's 'She asked' needs the doctor named, so Q comes before P. (b) fails.",
          "R names Meena as if we know her. P is where Meena is first named ('the old nurse, Meena'). So P comes before R. (c) fails.",
          "In S, 'she told the doctor' means the nurse, and 'those years' points to R's twenty years. So S follows R. (d) fails, because it puts S before R.",
          "Read (a): Q, P, R, S, S6. Each pronoun has its noun just before it.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: Arjun had wanted to fly since he was a small boy.\n" +
          "P: His uncle, a retired pilot, took him to an air show when he was ten.\n" +
          "Q: There he met a real fighter pilot, Squadron Leader Iyer.\n" +
          "R: The officer let him sit in the cockpit of her jet for a minute.\n" +
          "S: From that day, he talked of nothing but the Air Force.\n" +
          "S6: Twelve years later, he was commissioned as a fighter pilot himself.\n" +
          "(a) PQRS (b) QPRS (c) PRQS (d) PQSR",
        steps: [
          "Q starts with 'There', which needs a place. The place is the air show in P. So P comes before Q, and (b) fails.",
          "R's 'The officer' and 'her jet' need Squadron Leader Iyer, who is named in Q. So Q comes before R, and (c) fails.",
          "S's 'From that day' needs the big moment just before it: sitting in the cockpit (R). (d) puts S before R and fails.",
          "(a) is left: P, Q, R, S, S6.",
        ],
        answer: "(a) PQRS",
      },
      practiceSet: [
        {
          prompt:
            "Which order is right? (i) He was the youngest player in the team. (ii) Rohan Mehta joined the club at sixteen.",
          answer: "(ii), then (i)",
          method: "'He' needs Rohan named first.",
        },
        {
          prompt: "A sentence names 'Ravi and his sister Priya'. The next sentence says 'The latter'. Who is meant?",
          answer: "Priya",
          method: "The latter is the second of two things just named.",
        },
        {
          prompt:
            "Spot the wrong order: 'It was built in 1911. The clock tower stands in the middle of the market.'",
          answer: "Wrong. The clock tower must be named before 'It'.",
          method: "Swap the two sentences.",
        },
        {
          prompt:
            "P begins 'They'. The only plural noun in the passage is 'the farmers' in R. Where must P go?",
          answer: "After R, normally right after it.",
          method: "'They' needs a plural noun named before it.",
        },
      ],
      pyqExampleId: "da37d61d-3ff8-4f18-b460-1aec4f9eb332",
      traps: [
        {
          title: "Two people, one 'he'",
          body:
            "When a passage has two men or two women, 'he' or 'she' can seem to fit either. Do not stop at 'a man is named somewhere'. Ask which person was acting in the sentence just before; that is the one the pronoun normally points to.",
        },
        {
          title: "Ruling out a pronoun that points at S1",
          body:
            "A middle sentence that starts with 'It' or 'They' can still come first, if S1 supplies the noun. Check S1 before you strike the sentence.",
        },
        {
          title: "Wrong number",
          body:
            "'They' cannot point at a single thing, and 'it' cannot point at a group of people. If the only noun that fits in number sits in one sentence, the pronoun sentence goes after that one.",
        },
      ],
    },

    // C2 — name it before 'the' or 'its'
    {
      kind: "formula" as const,
      slug: "cdsenps-name-first",
      name: "Name a thing before 'the' or 'its' points at it",
      intuition:
        "Writers bring a thing in first ('a committee', 'set up a scheme', 'a fort known as Red Fort'), and only then call it 'the committee' or 'its report'. " +
        "So a sentence that says 'the X' as if you already know X must come after the sentence that introduces X.",
      definition:
        "The terms:\n" +
        "- **Introducing mention**: the first time a thing appears, often with a or an, a full name, or a verb like set up, founded, called.\n" +
        "- **Later mention**: the same thing again, with the, its, their, or a shorter name.\n" +
        "The method:\n" +
        "- Look for 'the X' or 'its X' where X has not appeared in S1.\n" +
        "- Find the sentence that introduces X. It must come before the later mention.\n" +
        "- If two sentences both mention X, the one that introduces it comes first.\n" +
        "- If S1 already names X, a 'the X' sentence may follow S1 directly.",
      authoredExample: {
        prompt:
          "S1: Every October, the city of Mysuru celebrates Dasara.\n" +
          "P: For nine nights, the palace is lit with nearly a hundred thousand bulbs.\n" +
          "Q: On the tenth day comes the grand procession.\n" +
          "R: It is led by an elephant carrying a golden howdah.\n" +
          "S: The procession's route, about five kilometres long, is lined with crowds by dawn.\n" +
          "S6: For many visitors, that morning is the high point of the year.\n" +
          "(a) PQRS (b) PSQR (c) QRPS (d) SPQR",
        steps: [
          "S says 'The procession's route' as if we know the procession. Q is where the procession is first named. So Q comes before S. (b) and (d) put S before Q and fail.",
          "R's 'It' also needs the procession, so R follows Q.",
          "That leaves (a) and (c). In (c) the procession on the tenth day comes before the nine nights of lights. Time runs the other way, so (c) fails.",
          "Read (a): nine nights of lights (P), the procession on the tenth day (Q), its leading elephant (R), its route and crowds (S), and S6.",
        ],
        answer: "(a) PQRS",
      },
      selfCheckExample: {
        prompt:
          "S1: The college canteen had received many complaints about its food.\n" +
          "P: The committee tasted the food every day for a month.\n" +
          "Q: So the principal set up a committee of three teachers and two students.\n" +
          "R: Its report asked for a new cook and a weekly menu.\n" +
          "S: Both changes were made before the new term.\n" +
          "S6: Since then, the complaints have almost stopped.\n" +
          "(a) PQRS (b) QPRS (c) QRPS (d) PRQS",
        steps: [
          "P says 'The committee', but the committee is set up in Q. So Q comes before P. (a) and (d) fail.",
          "In (c), the report (R) comes before the month of tasting (P). A report comes after the work, and S's 'Both changes' needs R's two changes just before it. (c) fails on both counts.",
          "Read (b): Q, P, R, S, S6.",
        ],
        answer: "(b) QPRS",
      },
      practiceSet: [
        {
          prompt:
            "Which comes first? (i) The new rule came into force on 1 April. (ii) In March, the state passed a rule against plastic bags.",
          answer: "(ii)",
          method: "'The new rule' needs the rule introduced first.",
        },
        {
          prompt: "A middle sentence says 'The plan worked.' What must an earlier sentence do?",
          answer: "Describe a particular plan.",
          method: "'the plan' points at one plan the reader has already met.",
        },
        {
          prompt:
            "Spot the wrong order: 'The report was sent to Delhi. A team of engineers studied the dam for six months and wrote a report.'",
          answer: "Wrong. The report must be written before 'The report' can point at it.",
        },
        {
          prompt: "The first time a thing appears, it usually takes ___; later mentions take ___.",
          answer: "a (or a full name); the",
        },
      ],
      pyqExampleId: "55ed8601-7b22-4e91-afa8-2225f6594804",
      traps: [
        {
          title: "'The' that looks harmless",
          body:
            "'The ascension', 'The lists', 'The Department': these look like normal openings, but 'the' says the reader already knows the thing. Find the sentence that first brings it in, and put it earlier.",
        },
        {
          title: "Two sentences about the same thing",
          body:
            "When two sentences both mention the same thing, do not order them by topic. The one that introduces it ('set up a committee', 'known as', 'a new scheme') comes first; the one with 'the' or 'its' comes after.",
        },
        {
          title: "Forgetting that S1 counts",
          body:
            "If S1 already names the thing, a 'the X' sentence can come first. Check S1 before you rule a sentence out.",
        },
      ],
    },
  ],
};
