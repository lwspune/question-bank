import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_FRAME_NOTE: SubtopicNote = {
  subtopicName: "Paragraph Frame: S1 and S6",
  title: "Start from the frame: what S1 sets up and what S6 needs",
  oneLineDefinition:
    "In a six-sentence passage, S1 and S6 are fixed. Read them first: S1 tells you which sentence can come next, and S6 tells you which sentence must come just before it.",
  whyItMatters:
    "This six-sentence format has appeared in every CDS English paper since 2017, and nearly half of these items are rated hard. " +
    "Most students start by trying to order all four middle sentences. The faster way is to use the two sentences you are given: one sure link to S1 or to S6 often leaves only one option standing.",
  concepts: [
    // C1 — the format, the routine, and the opener
    {
      kind: "formula" as const,
      slug: "cdsenps-opener",
      name: "Find the sentence S1 sets up",
      intuition:
        "S1 is the start of the paragraph, and it is given to you. Read it and ask: what does it leave open? A plan needs its first step, a person needs a name or a role, a claim needs a reason. " +
        "The middle sentence that answers that question comes first. Often only one option starts with it.",
      definition:
        "The format:\n" +
        "- **S1** is the first sentence of the passage and **S6** is the last. Both are fixed.\n" +
        "- The four middle sentences are marked **P, Q, R and S**, in jumbled order.\n" +
        "- Each option is an order of the four letters, for example QPSR. Read it as S1, Q, P, S, R, S6.\n" +
        "- You must pick the order that makes one connected paragraph from S1 to S6.\n" +
        "The routine:\n" +
        "- Read S1 and S6 first. S1 tells you where the passage starts; S6 tells you where it must arrive.\n" +
        "- Read P, Q, R and S once. Mark the words that lean on an earlier sentence: he, it, they, this, these, such, the latter, but, however, also, so, then, later.\n" +
        "- A sentence that leans back cannot come right after S1 unless S1 gives it what it needs.\n" +
        "- Find one sure link: the sentence that must follow S1, the sentence S6 needs before it, or two sentences that must sit together.\n" +
        "- Go to the options. Keep only those that respect the sure link. Then read the survivor from S1 to S6 to check it.\n" +
        "The opener:\n" +
        "- Ask what S1 leaves open, and find the middle sentence that answers it with no help from P, Q, R or S.",
      authoredExample: {
        prompt:
          "S1: Last winter our school decided to plant a vegetable garden behind the library.\n" +
          "P: Within a month, the first green shoots had come up.\n" +
          "Q: The job of clearing the ground was given to the senior students.\n" +
          "R: They removed the stones and weeds in two weekends.\n" +
          "S: Then the junior classes sowed seeds of spinach, beans and tomatoes.\n" +
          "S6: Today the garden sends fresh vegetables to the school canteen every week.\n" +
          "(a) QRSP (b) SPQR (c) PQRS (d) RQSP",
        steps: [
          "Read S1: the school has a plan, a garden. It leaves open who did the work and how it began.",
          "Scan the middle sentences. R starts with 'They', so it needs a group named before it. S starts with 'Then', so it needs an earlier step. P ('Within a month') needs a starting event, such as sowing.",
          "Q names the senior students and their job. It needs nothing from P, R or S, so it can follow S1 directly. Q comes first.",
          "Only (a) starts with Q. Read it through: the seniors are given the job (Q), they clear the ground (R), the juniors sow (S), shoots come up (P), and today the garden feeds the canteen (S6).",
        ],
        answer: "(a) QRSP",
      },
      selfCheckExample: {
        prompt:
          "S1: On the first day of the course, every cadet was given a small notebook.\n" +
          "P: At first, many of them forgot to use it.\n" +
          "Q: In it, each cadet was told to write down what he had learnt that day.\n" +
          "R: Slowly, however, writing a few lines each night became a habit.\n" +
          "S: So the instructors began to check the notebooks every Sunday.\n" +
          "S6: By the end of the course, most of the notebooks were full.\n" +
          "(a) PQRS (b) QPSR (c) QSPR (d) SQPR",
        steps: [
          "S1 brings in a notebook but does not say what it is for. Q answers that ('In it, each cadet was told to write...'), so Q comes first. That removes (a) and (d).",
          "(b) and (c) both start with Q. Compare them where they differ: P or S second?",
          "S starts with 'So': it needs a problem before it. The problem is in P (many forgot to use the notebook). So P comes before S, and (c) fails.",
          "Read (b): Q, P (many forgot), S (so the checks began), R (slowly it became a habit), S6 (the notebooks were full).",
        ],
        answer: "(b) QPSR",
      },
      practiceSet: [
        {
          prompt:
            "S1: The match was stopped in the tenth over for an unusual reason. Which sentence comes next? (i) A swarm of bees had settled on the pitch. (ii) It was finished the next morning.",
          answer: "(i)",
          method: "S1 promises a reason. (i) gives it; (ii) can only come after the reason is known.",
        },
        {
          prompt:
            "S1: Every new recruit faces two questions in his first week. Which sentence comes next? (i) Most recruits answer it within a few days. (ii) The first is whether he can keep up with the training.",
          answer: "(ii)",
          method: "S1 announces two questions, so the sentence that names the first one opens. (i) leans on a question already named.",
        },
        {
          prompt:
            "S1: The village had only one well. Which sentence comes next? (i) It dried up every May. (ii) Then the panchayat dug a second one.",
          answer: "(i)",
          method: "'It' fits the well in S1. 'Then ... a second one' needs a problem with the first well before it.",
        },
        {
          prompt:
            "S1 is about a new hospital in a district. A middle sentence starts: 'However, it still has no heart specialist.' Can it come first?",
          answer: "No, not usually.",
          method: "'However' turns from a good point about the hospital. S1 only introduces the hospital, so another sentence must give that good point first.",
        },
      ],
      pyqExampleId: "7d3b4919-2840-4359-b362-8fd4de7afd8b",
      traps: [
        {
          title: "Opening with a sentence that leans back",
          body:
            "A sentence that starts with He, It, This, That, Then, But, However, or has 'also' in it, needs something before it. If S1 does not supply it, that sentence cannot come first. Check what its first word points at.",
        },
        {
          title: "Picking the sentence that sounds like a beginning",
          body:
            "A broad, general sentence often feels like a start. But S1 is already the start. The first middle sentence must **follow** S1, so look for the one that answers what S1 leaves open.",
        },
        {
          title: "Marking after one link",
          body:
            "Two options can start with the same letter. After you fix the opener, test one more link where those options differ, then read the order through from S1 to S6.",
        },
      ],
    },

    // C2 — the closer
    {
      kind: "formula" as const,
      slug: "cdsenps-closer",
      name: "Find the sentence S6 needs before it",
      intuition:
        "S6 is fixed, so the fourth middle sentence must lead straight into it. Read the first words of S6. If it points back ('These...', 'He', 'that camp', 'But...'), only one middle sentence can sit just before it.",
      definition:
        "The method:\n" +
        "- Read S6 and underline what it leans on: a pointer (this, these, that, such), a pronoun (he, she, it, they), a linker (but, so, therefore, also) or a named thing with 'the'.\n" +
        "- Find the middle sentence that supplies it. That sentence goes **fourth**.\n" +
        "- Keep only the options that end with that letter. If more than one survives, test one more link where they differ.\n" +
        "- If S6 leans on nothing, use it the other way: it shows where the passage must arrive, so the sentence closest to its topic usually comes last.",
      authoredExample: {
        prompt:
          "S1: For years, our town library was almost empty.\n" +
          "P: First, she kept it open late on weekdays.\n" +
          "Q: Last year a new librarian decided to change that.\n" +
          "R: She also started story sessions for children on Saturday afternoons.\n" +
          "S: Office workers began to drop in on their way home.\n" +
          "S6: These Saturday sessions are now so popular that parents book seats a week ahead.\n" +
          "(a) QPSR (b) QRPS (c) RQPS (d) QPRS",
        steps: [
          "Read S6 first: 'These Saturday sessions'. It needs the sentence that brings in the Saturday sessions. That is R. So R goes fourth.",
          "Look at the last letter of each option: (a) ends with R; (b), (c) and (d) end with S. Only (a) survives.",
          "Check (a) from the start: Q (a new librarian wants to change that), P (first, she kept it open late), S (office workers began to come), R (she also started story sessions), S6 (these sessions are popular). It flows.",
        ],
        answer: "(a) QPSR",
      },
      selfCheckExample: {
        prompt:
          "S1: In July, a landslide blocked the only road to our hill village.\n" +
          "P: For three days, no truck could reach us.\n" +
          "Q: On the fourth day, an army helicopter landed in the school ground.\n" +
          "R: It brought rice, medicines and two doctors.\n" +
          "S: The doctors set up a camp in the panchayat hall.\n" +
          "S6: More than two hundred people were treated at that camp in one week.\n" +
          "(a) PQSR (b) PQRS (c) QRSP (d) PRQS",
        steps: [
          "S6 says 'that camp', so the sentence before it must set up the camp. That is S. Keep the options ending in S: (b) and (d).",
          "Compare (b) and (d) where they differ. In (d), R ('It brought rice...') comes straight after P, but P has no truck arriving, so 'It' has nothing to stand for.",
          "In (b), R follows Q, and 'It' is the helicopter. Read it through: P, Q, R, S, S6.",
        ],
        answer: "(b) PQRS",
      },
      practiceSet: [
        {
          prompt:
            "S6: She was given the award in front of the whole school. Which sentence must come just before it? (i) The best cadet that year was Riya Sharma. (ii) The parade began at eight.",
          answer: "(i)",
          method: "'She' needs a woman named just before. (ii) names no one.",
        },
        {
          prompt:
            "S6: Because of this delay, the bridge cost twice the planned amount. What must the sentence before S6 describe?",
          answer: "A delay in the work.",
          method: "'this delay' points back to a delay told in the sentence just before.",
        },
        {
          prompt: "S6 begins: 'But the team did not give up.' What kind of sentence must come just before it?",
          answer: "A setback for the team.",
          method: "'But' turns from the sentence before, so that sentence must give bad news.",
        },
      ],
      pyqExampleId: "e3415f3e-7c96-4b94-acab-8fb20c853acf",
      traps: [
        {
          title: "Ignoring S6",
          body:
            "Many students order P, Q, R and S as if the passage could end anywhere. S6 is fixed. Its first words often decide which letter is fourth, and that one check can remove three options.",
        },
        {
          title: "Matching a word instead of the reference",
          body:
            "If S6 says 'that camp', the sentence before it must be the one that **sets up** the camp, not any sentence that mentions doctors or patients. Match what the pointer refers to, not a word that only looks related.",
        },
        {
          title: "A conclusion that is not the fourth sentence",
          body:
            "A sentence that sounds like an ending ('Thus...', 'In this way...') is not always fourth. If S6 leans on a different sentence, that one goes fourth, and the 'concluding' sentence sits earlier.",
        },
      ],
    },
  ],
};
