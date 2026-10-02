import type { SubtopicNote } from "@/app/notes/_types";

/** An underlined sentence part, written the way the paper prints it. */
const u = (s: string): string => `\\(\\underline{\\text{${s}}}\\)`;
/** A three-part spotting-errors item with option (d) No error. */
const item = (a: string, b: string, c: string): string =>
  `Find the part with the error. (a) ${u(a)} (b) ${u(b)} (c) ${u(c)} (d) No error`;

export const CDSEN_SEB_PRONOUNS_NOTE: SubtopicNote = {
  subtopicName: "Pronouns",
  title: "Pronouns: case and agreement",
  oneLineDefinition:
    "The fifth check: test every pronoun twice. Is it the right form for its job (I or me, who or whom), and does it match the noun it stands for?",
  whyItMatters:
    "Pronoun errors are short words, so they hide well: 'their' for 'his', 'who' for 'whom', 'who's' for 'whose'. " +
    "Two questions find almost all of them: what job does the pronoun do in its clause, and which noun does it replace?",
  concepts: [
    // C1 — pronoun case
    {
      kind: "formula" as const,
      slug: "cdsenseb-case",
      name: "Pronoun case: who/whom, I/me, whose, your, its being",
      intuition:
        "A pronoun changes its form with its job. As a subject: I, he, she, we, they, who. As an object: me, him, her, us, them, whom. Showing ownership: my, his, your, their, its, whose. These forms are called the pronoun's **case**.",
      definition:
        "- **Subjective case** (the doer): I, he, she, we, they, **who**.\n" +
        "- **Objective case** (receives the action, or comes after a preposition): me, him, her, us, them, **whom**.\n" +
        "- **Possessive case** (owns a noun): my, your, his, her, its, our, their, **whose**.\n" +
        "- **Who or whom? Substitute.** Turn the clause into a statement and try he or him in its place. If 'he' fits, use who; if 'him' fits, use whom. Ignore a side phrase such as 'you think' or 'I believe'.\n" +
        "- **Two people joined by 'and':** drop the other person and test the pronoun alone: 'Ravi and I are going' (I am going); 'She invited Ravi and me' (she invited me).\n" +
        "- **Look-alikes:** whose (owner) vs who's (who is); its (owner) vs it's (it is); your (owner) vs you.\n" +
        "- Before an -ing form used as a noun, the exam wants the possessive: 'I insist on **its** being sent', 'I dislike **his** coming late'.\n" +
        "- After **everything, all, nothing, the only**, use **that**, not what: 'Everything **that** happened ...'.",
      authoredExample: {
        prompt: item("The manager", "invited Ravi and I", "to the meeting."),
        steps: [
          "Read the whole sentence and find the pronoun: 'I' in part (b).",
          "What job does it do? The manager invited it, so it receives the action: it is an object.",
          "Test it alone: 'The manager invited I' is clearly wrong; 'invited me' is right.",
          "The wrong word is in part (b).",
        ],
        answer: "(b). The manager invited **Ravi and me** to the meeting.",
      },
      selfCheckExample: {
        prompt: item("The girl", "who's bicycle was stolen", "went to the police."),
        steps: [
          "The pronoun shows whose bicycle it was: it needs the possessive.",
          "'Who's' means 'who is'. 'Who is bicycle' makes no sense.",
          "The possessive is 'whose'. The wrong word is in part (b).",
        ],
        answer: "(b). The girl **whose** bicycle was stolen went to the police.",
      },
      practiceSet: [
        { prompt: "Correct it: 'Between you and I, the plan will fail.'", answer: "Between you and **me**, the plan will fail.", method: "After a preposition: objective case." },
        { prompt: "Correct it: 'Who did you meet at the station?'", answer: "**Whom** did you meet at the station?", method: "You met him: him fits, so whom." },
        { prompt: "Correct it: 'The dog wagged it's tail.'", answer: "The dog wagged **its** tail.", method: "Ownership: its, with no apostrophe." },
        { prompt: "Correct it: 'Us boys were punished.'", answer: "**We** boys were punished.", method: "Subject: we were punished." },
      ],
      pyqExampleId: "9ed55786-9f03-40f0-a7d0-b137b521ea55",
      traps: [
        {
          title: "A side phrase hides the pronoun's job",
          body: "In 'the man who I think is guilty', the words 'I think' are a side phrase. Remove them: 'the man who is guilty'. The pronoun is the subject of 'is', so 'who' is right and 'whom' would be wrong.",
        },
        {
          title: "'And me' as a subject",
          body: "A pronoun joined to a name by 'and' looks harmless. Remove the name and say the sentence with the pronoun alone: 'Me am going to the fair' shows at once that 'I' is needed.",
        },
        {
          title: "Contraction or possessive?",
          body: "'Who's' and 'it's' always mean 'who is' and 'it is'. If the word shows an owner ('who's books', 'it's tail'), it must be 'whose' or 'its'.",
        },
        {
          title: "'Everything what'",
          body: "After everything, all, nothing and the only, the relative pronoun is 'that': 'Everything that happened was my fault', not 'everything what happened'.",
        },
      ],
    },

    // C2 — pronoun-antecedent agreement
    {
      kind: "formula" as const,
      slug: "cdsenseb-antecedent",
      name: "A pronoun matches its antecedent in number and person",
      intuition:
        "A pronoun stands for a noun said earlier, its antecedent. It must match that noun in number (one or many) and in person (I and we, you, or he, she and they).",
      definition:
        "- Find the **antecedent**: the noun the pronoun replaces.\n" +
        "- **Singular** antecedent, singular pronoun. Each, every, every one, everybody and anyone are singular: 'Every student must bring **his or her** book.' Everyday English often says 'their' here; this exam has marked 'their' wrong after every and each.\n" +
        "- **Plural** antecedent: **their**. 'Certain animals talk only to **their** own kind.'\n" +
        "- **Person** must match too: 'Those of us who ...' is first person (we), so the pronoun is **our**. 'One' takes **one's**: 'One must do one's duty.'\n" +
        "- A country as one unit takes **its**: 'India and its neighbours'.\n" +
        "- **Reciprocal pronouns** (for actions done to each other): **each other** for two, **one another** for more than two. This is the exam's rule.\n" +
        "- Fixed phrases keep their own possessive: 'out of **her** mind', 'make up **his** mind'.",
      authoredExample: {
        prompt: item("Each of the girls", "has brought", "their own lunch."),
        steps: [
          "Read the whole sentence and find the pronoun: 'their' in part (c).",
          "Find its antecedent: 'Each of the girls'. 'Each' is singular.",
          "The verb 'has' in part (b) is singular and correct. The pronoun must be singular too: 'her'.",
          "The wrong word is in part (c).",
        ],
        answer: "(c). Each of the girls has brought **her** own lunch.",
      },
      selfCheckExample: {
        prompt: item("The two neighbours", "have not spoken to", "one another for years."),
        steps: [
          "The action goes between the two neighbours: a reciprocal pronoun is needed.",
          "For exactly two people, the exam wants 'each other'.",
          "The wrong words are in part (c).",
        ],
        answer: "(c). The two neighbours have not spoken to **each other** for years.",
      },
      practiceSet: [
        { prompt: "Correct it: 'The birds flew back to its nests.'", answer: "The birds flew back to **their** nests.", method: "Plural antecedent 'birds'." },
        { prompt: "Correct it: 'Every one of the boys has done their work.'", answer: "Every one of the boys has done **his** work.", method: "'Every one' is singular." },
        { prompt: "Correct it: 'One should keep his promises.'", answer: "One should keep **one's** promises.", method: "'One' takes 'one's'." },
        { prompt: "Correct it: 'The committee members gave his views one by one.'", answer: "The committee members gave **their** views one by one.", method: "Plural antecedent 'members'." },
      ],
      pyqExampleId: "e76613d3-1f33-42b4-b836-b6942685e52e",
      traps: [
        {
          title: "'Their' after every or each",
          body: "'Every student should give their ideas' is normal speech, but this paper has marked it as the error. After every, each and every one, use 'his' or 'his or her'.",
        },
        {
          title: "Check person, not only number",
          body: "A pronoun can be plural and still wrong if the person is wrong. A subject that includes the speaker (us, we) needs 'our', not 'their'.",
        },
        {
          title: "Each other is for two",
          body: "When the sentence names exactly two people ('both of them', 'the two brothers'), the exam wants 'each other'. 'One another' is for three or more.",
        },
        {
          title: "The antecedent may sit in another part",
          body: "The noun is often in part (a) and the pronoun in part (c). Trace every pronoun back to its noun before you choose No error.",
        },
      ],
    },
  ],
};
