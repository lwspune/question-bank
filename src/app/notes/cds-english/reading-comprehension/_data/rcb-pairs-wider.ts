import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCB_PAIRS_WIDER_NOTE: SubtopicNote = {
  subtopicName: "Sentence Pairs: Premise, Extension, Degree and Word Use",
  title: "Sentence pairs: premise, extension, push-back, degree and word use",
  oneLineDefinition:
    "Some sentence-pair items use a wider set of labels: premise, precursor, extends, analogy, fully or partly consistent. Another kind asks whether an underlined word is used rightly in each of two sentences.",
  whyItMatters:
    "These items sit in the same block as the four core relations, but the options are wider and two of them often look nearly right. " +
    "Three questions settle most of them: which sentence comes first in logic or time, does S2 build on S1 or push back, and how strongly does it support it. " +
    "The underlined-word items are a different job altogether: grammar and word choice, judged one sentence at a time.",
  concepts: [
    // C1 — order: premise, reason, precursor, consequence
    {
      kind: "formula" as const,
      slug: "cdsenrcb-cause-order",
      name: "Premise, reason, precursor, consequence: which came first",
      intuition:
        "Some labels describe order. A premise or a reason supports a claim. A precursor comes earlier and leads to an event. A consequence follows from it. " +
        "Ask which sentence is the support or cause, and which is the claim or result.",
      definition:
        "The terms:\n" +
        "- **Premise / reason**: S2 is the support that the claim in S1 rests on.\n" +
        "- **Precursor**: S2 happened earlier and led to what S1 describes.\n" +
        "- **Consequence / follows the first**: S2 results from S1.\n" +
        "The method:\n" +
        "- Join them with because: 'S1, because S2.' If it reads well, S2 is the reason or premise.\n" +
        "- Join them with so: 'S1, so S2.' If it reads well, S2 is a consequence of S1.\n" +
        "- Check time: if S2's event came first and drove S1's, S2 is a precursor.\n" +
        "- Cut labels of opposition (rebuts, contradicts, dilutes, disputes) when nothing in S1 is denied or weakened.",
      authoredExample: {
        prompt:
          "S1: The regiment won the inter-army shooting trophy. S2: Its soldiers had practised on the range every morning for a year. The second sentence (a) is a precursor to the first (b) follows the first (c) contradicts the first (d) dilutes the first",
        steps: [
          "Join with because: 'The regiment won the trophy, because its soldiers had practised every morning for a year.' It reads well.",
          "Time: the year of practice came before the win and led to it.",
          "So S2 comes first and drives S1: a precursor. (b) has the order backwards; (c) and (d) are opposition labels, and nothing is denied.",
        ],
        answer: "(a) is a precursor to the first",
      },
      selfCheckExample: {
        prompt:
          "S1: The dam stored more water this year than ever before. S2: Farmers downstream can now grow a second crop. The second sentence (a) is the premise for the first (b) is a logical consequence of the first (c) contradicts the first (d) has no connection with the first",
        steps: [
          "Join with so: 'The dam stored more water than ever, so farmers can grow a second crop.' It reads well.",
          "Join with because: 'The dam stored more water, because farmers can grow a second crop.' It does not.",
          "S2 results from S1.",
        ],
        answer: "(b) is a logical consequence of the first",
      },
      practiceSet: [
        { prompt: "S1: The mountain road was closed. S2: A landslide had blocked it overnight. What is S2?", answer: "the reason for, or precursor to, the first", method: "'closed, because a landslide had blocked it' reads well." },
        { prompt: "S1: The price of onions doubled. S2: Families bought fewer onions. What is S2?", answer: "a consequence (it follows the first)", method: "'doubled, so families bought fewer'." },
        { prompt: "'S1, because S2' reads well. What is S2?", answer: "the premise, or reason, for S1" },
        { prompt: "S1: Heavy snow fell on the pass. S2: The army convoy waited two days. What is S2?", answer: "a consequence of the first" },
      ],
      pyqExampleId: "ec38ec20-f191-49f4-aefb-7844997aea00", // 2024 (I) Q90
      traps: [
        {
          title: "Reversing the direction",
          body:
            "Premise and consequence name the same link from opposite ends. Test with because and with so. Only one of the two joined sentences reads well.",
        },
        {
          title: "An opposition label when nothing is denied",
          body:
            "Rebuts, dilutes, disputes and contradicts need S2 to deny or weaken S1. If S2 only explains or follows from S1, cut them all.",
        },
      ],
    },

    // C2 — reference: labels for building on S1
    {
      kind: "reference" as const,
      slug: "cdsenrcb-builds-on",
      name: "Building on S1: expands, extends, analogy, restates",
      intuition:
        "When S2 agrees with S1 and goes on from it, the options ask HOW it goes on. Does it add detail, carry the story to the next stage, apply S1's rule to a field, give a parallel case, add a separate fact, or say the same thing again? " +
        "Each label names one of these moves.",
      definition:
        "The method:\n" +
        "- First check that S2 does not push back: both can be true and nothing in S1 is limited.\n" +
        "- Then ask what S2 adds, and match it to a row below.\n" +
        "- Markers help: 'much in the same way', 'just as', 'likewise' signal a parallel case; 'after', 'then', 'once' signal the next stage.\n" +
        "- If S1 is a saying or an image and S2 says its meaning plainly, that is a reassertion, not an explanation.\n" +
        "The labels used in these items:",
      table: {
        columns: ["Label", "What S2 does", "Quick test", "Sitting"],
        rows: [
          { cells: ["expands the first", "adds detail inside S1's topic, or widens it to a related area", "S1, and more about it: S2", "2024 (I), 2025 (I)"] },
          { cells: ["extends the first", "carries S1's process or story to its next stage", "S1; next, S2", "2025 (I)"] },
          { cells: ["develops an axiom based on the first", "turns S1's general rule into a rule for one field", "S1 in general; so in this field, S2", "2024 (I)"] },
          { cells: ["provides an analogy for the first", "gives a parallel case that works the same way", "just as S1, so S2", "2024 (I)"] },
          { cells: ["provides additional information", "adds a separate fact of the same kind beside S1", "S1. Also, S2. Each stands alone.", "2025 (II)"] },
          { cells: ["reiterates the axiom stated in the first","says the same idea again, often in more general words", "S1; that is, S2", "2025 (II)"] },
          { cells: ["provides a metaphorical reassertion of the first", "S1 is a saying or an image; S2 says the same thing without the picture", "S1 is a picture; S2 is its plain meaning", "2025 (I)"] },
          { cells: ["explains / explicates the first (often a wrong option)", "gives the reason behind S1 or how it works", "S1, and here is why: S2", "2024 (I), 2025 (I)"] },
          { cells: ["coincides with the first (often a wrong option)", "is the very same statement, or happens at the same moment", "S1 and S2 are one fact", "2025 (I)"] },
        ],
        caption: "First rule out push-back, then ask what S2 adds: detail, next stage, rule for a field, parallel case, separate fact, or the same idea again.",
      },
      pyqExampleId: "f011460c-7287-490b-b27c-d8a7c7bd6e40", // 2024 (I) Q89
      selfCheckExample: {
        prompt:
          "S1: Clay is first shaped on a potter's wheel. S2: Once dry, it is fired in a kiln and becomes pottery. The second sentence (a) contradicts the first (b) extends the first (c) coincides with the first (d) provides an analogy for the first",
        steps: [
          "Both can be true; nothing is limited. So S2 builds on S1.",
          "'Once dry' marks the next stage of the same process.",
          "Next stage = extends.",
        ],
        answer: "(b) extends the first",
      },
      practiceSet: [
        { prompt: "S1: The mango is India's national fruit. S2: The lotus is India's national flower.", answer: "provides additional information", method: "A separate fact of the same kind." },
        { prompt: "S1: Still waters run deep. S2: Quiet people often think deeply.", answer: "provides a metaphorical reassertion of the first", method: "The saying, without the picture." },
        { prompt: "S1: Rules must apply equally to all. S2: In sport, the same rules must bind every team.", answer: "develops an axiom based on the first", method: "A general rule applied to one field." },
        { prompt: "S1: The museum displays old coins. S2: Its coin hall holds pieces from the Maurya, Gupta and Mughal ages.", answer: "expands the first", method: "More detail inside S1's topic." },
      ],
      traps: [
        {
          title: "Extends or expands?",
          body:
            "**Extends** moves forward to the next stage (hypothesis, then proven thesis). **Expands** stays on the same point and adds detail or widens it (an adjective for the rose, then the rose as a poetic symbol).",
        },
        {
          title: "Additional information is not confirmation",
          body:
            "A second fact of the same kind (a state bird beside the national bird) neither proves nor limits S1. It simply adds to it.",
        },
        {
          title: "Reasserting a saying is not explaining it",
          body:
            "When S1 is a proverb and S2 states the same lesson in plain words, the label is a (metaphorical) reassertion. **Explains** would need S2 to give a reason why the proverb is true.",
        },
      ],
    },

    // C3 — push-back labels
    {
      kind: "formula" as const,
      slug: "cdsenrcb-pushes-back",
      name: "Pushing back: contradicts, contrasts, limits, qualifies",
      intuition:
        "These are the core relations in new clothes. Contradicts, disputes, annuls and negates all mean S2 makes S1 false. Establishes limits on means the same as qualifies. " +
        "Run the same test: can both be true, and is it the same subject?",
      definition:
        "The labels:\n" +
        "- **contradicts / negates / disputes / annuls / rebuts**: if S2 is true, S1 cannot be.\n" +
        "- **contrasts / offers a contrast to**: a different case or approach set beside S1; both stand.\n" +
        "- **establishes limits on / qualifies**: S1 stands, but S2 marks where it stops.\n" +
        "- Labels of support, offered as wrong options here: corroborates, confirms, coincides with, correlates to.\n" +
        "The method:\n" +
        "- Can both be true? No: contradicts.\n" +
        "- Both true, same subject, and S2 marks an edge, an exception or a condition: qualifies, or establishes limits.\n" +
        "- Both true, and S2 brings a different subject or a different approach: contrasts.\n" +
        "- An absolute claim (all, every, in every respect) falls to a single counter-case: that is contradiction, not a limit.",
      authoredExample: {
        prompt:
          "S1: Maps help travellers find their way. S2: No map can show a road built after it was printed. The second sentence (a) contradicts the assertion of the first (b) explains the basis of the first (c) establishes limits on the assertion of the first (d) corroborates the first",
        steps: [
          "Can both be true? Yes. Maps help, and old maps miss new roads.",
          "Same subject: maps.",
          "S2 marks where S1 stops: maps cannot help with roads they do not show.",
          "Same subject, both true, an edge: establishes limits.",
        ],
        answer: "(c) establishes limits on the assertion of the first",
      },
      selfCheckExample: {
        prompt:
          "S1: Every member of the team was present at the parade. S2: Two members of the team missed the parade. The second sentence (a) contradicts the first (b) contrasts with the first (c) qualifies the first (d) correlates to the first",
        steps: [
          "S1 is absolute: every member.",
          "If two members missed it, S1 is false. Both cannot be true.",
        ],
        answer: "(a) contradicts the first",
      },
      practiceSet: [
        { prompt: "S1: Japan grew rich by exporting cars. S2: Saudi Arabia grew rich by exporting oil.", answer: "offers a contrast to the first", method: "Two countries, two paths; both true." },
        { prompt: "S1: All metals are solid at room temperature. S2: Mercury is a metal that is liquid at room temperature.", answer: "contradicts the first", method: "An absolute claim falls to one counter-case." },
        { prompt: "S1: Science can explain how the body works. S2: It cannot yet explain why we dream.", answer: "establishes limits on the first", method: "S1 stands; S2 marks an edge." },
        { prompt: "Which is NOT a push-back label: disputes, annuls, corroborates, rebuts?", answer: "corroborates", method: "It means supports." },
      ],
      pyqExampleId: "b716c4e7-c27b-4e9b-ba24-920138d1266c", // 2025 (II) Q41
      traps: [
        {
          title: "New labels, same test",
          body:
            "Annuls, disputes and rebuts look harder than contradicts, but they ask the same question: can both be true? Translate the label into one of the four core relations, then run the test.",
        },
        {
          title: "Two 'but' sentences are not a contradiction",
          body:
            "S1: one country grew fast but gave up democracy. S2: another grew fast and kept it. Both are true of different countries, so S2 **offers a contrast**. Different subjects cannot contradict each other.",
        },
      ],
    },

    // C4 — degree words
    {
      kind: "formula" as const,
      slug: "cdsenrcb-degree-words",
      name: "Degree words: fully, to an extent, reinforces, correlates",
      intuition:
        "Some options grade how much S2 supports S1: fully, to an extent, marginally. Others name a looser tie: S2 correlates to S1 when the two go together without one proving the other. " +
        "Match strength against strength.",
      definition:
        "The terms:\n" +
        "- **fully consistent / fully reinforces**: S2 backs S1 as far as S1 goes.\n" +
        "- **reinforces to an extent / marginally consistent**: S2 backs S1 only partly, because S2 is weaker or narrower than S1's claim.\n" +
        "- **reinforces**: S2 adds a fact that strengthens S1.\n" +
        "- **correlates to**: S2 is a related fact or trend on the same side as S1, but neither proves S1 nor simply follows from it.\n" +
        "The method:\n" +
        "- Find the strength word in each sentence: never, always, all, every against not always, some, often, may.\n" +
        "- S1 claims more than S2 can back (every case against some cases): support only to an extent.\n" +
        "- S2 backs S1 at full strength: fully consistent.\n" +
        "- S2 goes together with S1 but is a separate fact: correlates.\n" +
        "- Cut 'definitely follows' unless S2 is a result of S1, and 'is the only possible explanation' unless nothing else could explain S1.",
      authoredExample: {
        prompt:
          "S1: Learning a language well takes years of regular practice. S2: Army interpreters train for three to four years before they are posted. The second sentence (a) is not consistent with the first (b) is fully consistent with the first (c) is marginally consistent with the first (d) is the only possible explanation for the first",
        steps: [
          "Strength of S1: years of regular practice. No absolute word.",
          "S2 gives a case of exactly that: years of training before an interpreter is ready.",
          "S2 backs S1 at the same strength, so: fully consistent.",
          "(d) is too strong: one example cannot be the only explanation of a general claim.",
        ],
        answer: "(b) is fully consistent with the first",
      },
      selfCheckExample: {
        prompt:
          "S1: Literacy in the state has risen sharply. S2: The state now has more newspaper readers than ever. The second sentence (a) correlates to the first (b) contradicts the first (c) contrasts with the first (d) is the only possible explanation for the first",
        steps: [
          "Both can be true, and they point the same way.",
          "More newspaper readers goes together with higher literacy, but it does not prove it or explain it.",
          "A related trend on the same side: correlates.",
        ],
        answer: "(a) correlates to the first",
      },
      practiceSet: [
        { prompt: "S1: Every bridge on this road is safe. S2: The engineers' report lists all bridges on this road as safe.", answer: "fully consistent", method: "'all' backs 'every' at full strength." },
        { prompt: "S1: Regular reading improves vocabulary. S2: Students who read daily scored higher in a vocabulary test.", answer: "reinforces the first", method: "S2 adds a supporting fact." },
        { prompt: "S1: Car sales have risen this year. S2: Petrol sales have also risen this year.", answer: "correlates to the first", method: "Two trends that go together; neither proves the other." },
        { prompt: "Which option is almost always too strong: 'is the only possible explanation' or 'reinforces'?", answer: "is the only possible explanation", method: "One fact rarely rules out every other cause." },
      ],
      pyqExampleId: "20a00aa4-2d28-445d-acee-575d27b4a481", // 2025 (I) Q46
      traps: [
        {
          title: "Ignoring the strength word",
          body:
            "A reason that holds 'often' cannot fully back a claim about 'every case'. Before choosing between fully and to an extent, circle the strength word in each sentence.",
        },
        {
          title: "Correlates is not confirms",
          body:
            "Two facts can point the same way (a cleaner engine and the phasing out of an older one) without one proving the other. If S2 is related but is not evidence for S1, choose **correlates**.",
        },
      ],
    },

    // C5 — underlined-word grid
    {
      kind: "formula" as const,
      slug: "cdsenrcb-judge-each",
      name: "Is the underlined word right? Judge each sentence alone",
      intuition:
        "A different format. Each of two sentences has one underlined word. Decide whether each is used correctly, then pick one of four boxes: S1 right and S2 wrong, S1 wrong and S2 right, both wrong, or both right. " +
        "This is grammar and word choice, not logic. The two sentences are not linked.",
      definition:
        "The method:\n" +
        "- Cover S2. Judge only S1's underlined word: is it the right word for this sentence? Mark R or W.\n" +
        "- Cover S1. Judge S2's underlined word the same way.\n" +
        "- One sentence being right tells you nothing about the other. The same word may be right in one and wrong in the other.\n" +
        "- Then choose the box. 'Both right' and 'both wrong' are real answers; do not avoid them.\n" +
        "- Judge only the underlined word, not the rest of the sentence.\n" +
        "The word pairs tested:\n" +
        "- **since / for**: since + a point in time (since Monday, since the war ended); for + a length of time (for two years, for a long time).\n" +
        "- **shall / will**: both mark the future. Shall goes with I and we in formal English; will goes with every person, including I and we.\n" +
        "- **any / some**: any in negatives, questions and after whether or if; some in plain positive statements and offers.\n" +
        "- **between / among**: between two; among three or more, or a group.\n" +
        "- **especially / specially**: especially = particularly, above all; specially = for one particular purpose.",
      authoredExample: {
        prompt:
          "S1: The sweets were shared \\(\\underline{\\text{between}}\\) the whole class. S2: She asked whether there was \\(\\underline{\\text{any}}\\) mail for her. (a) S1 is right and S2 is wrong (b) S1 is wrong and S2 is right (c) Both S1 and S2 are wrong (d) Both S1 and S2 are right",
        steps: [
          "S1 alone: a whole class is a group of many, so the word should be among. W.",
          "S2 alone: after whether, any is the usual word. R.",
          "S1 W, S2 R.",
        ],
        answer: "(b) S1 is wrong and S2 is right",
      },
      selfCheckExample: {
        prompt:
          "S1: This ramp was \\(\\underline{\\text{specially}}\\) built for wheelchairs. S2: I like all fruit, \\(\\underline{\\text{specially}}\\) mangoes. (a) S1 is right and S2 is wrong (b) S1 is wrong and S2 is right (c) Both S1 and S2 are wrong (d) Both S1 and S2 are right",
        steps: [
          "S1 alone: built for one particular purpose, wheelchairs. specially fits. R.",
          "S2 alone: the sense is 'above all', so the word should be especially. W.",
          "The same word is right in one sentence and wrong in the other.",
        ],
        answer: "(a) S1 is right and S2 is wrong",
      },
      practiceSet: [
        { prompt: "I don't have \\(\\underline{\\text{some}}\\) money left. Right or wrong?", answer: "Wrong: any", method: "A negative takes any." },
        { prompt: "The two brothers divided the land \\(\\underline{\\text{among}}\\) themselves. Right or wrong?", answer: "Wrong: between", method: "Two people take between." },
        { prompt: "We \\(\\underline{\\text{shall}}\\) meet again tomorrow. Right or wrong?", answer: "Right", method: "shall with we, for the future." },
        { prompt: "The cake was \\(\\underline{\\text{especially}}\\) made for her birthday. Right or wrong?", answer: "Wrong: specially", method: "Made for one purpose." },
      ],
      pyqExampleId: "03a9851b-a768-4988-b283-2bcc23f226f5", // 2024 (I) Q119
      traps: [
        {
          title: "Letting one sentence decide the other",
          body:
            "Students judge S1, then assume S2 must be the opposite. The four boxes include 'both right' and 'both wrong' because the sentences are independent. Judge each with the other covered.",
        },
        {
          title: "Will with I and we is not wrong",
          body:
            "Shall with I and we is formal, but will is correct with every person. Do not mark 'We will go' or 'They will need' wrong.",
        },
        {
          title: "Judging words that are not underlined",
          body:
            "Only the underlined word is being tested. A tense or a comma elsewhere in the sentence does not change the box you choose.",
        },
      ],
    },
  ],
};
