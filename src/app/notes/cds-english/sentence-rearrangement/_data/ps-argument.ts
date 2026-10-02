import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_ARGUMENT_NOTE: SubtopicNote = {
  subtopicName: "Shape of a Paragraph Argument",
  title: "How an argument moves: general to example, reason, answer, correction",
  oneLineDefinition:
    "An argument has a shape: a general claim before its example, a cause before its effect, a question before its answer, and a common view before the writer's correction.",
  whyItMatters:
    "Essay and textbook passages often carry few pronouns or dates, so the order comes from the shape of the argument itself. " +
    "Knowing the usual shapes lets you place a sentence by its job: is it a claim, an example, a reason, a result, a question, or a correction?",
  concepts: [
    // C1 — general then example
    {
      kind: "formula" as const,
      slug: "cdsenps-general-example",
      name: "General statement first, example after",
      intuition:
        "Writers state an idea, then show it with a case. 'Many plants have uses in daily life. For instance, neem twigs are used to clean teeth.' The general sentence sets up the example, so it comes first.",
      definition:
        "The terms:\n" +
        "- **General statement**: a claim about many things or about a whole group.\n" +
        "- **Example**: one case, often with a name, a number or 'for example', 'for instance', 'such as', 'suppose'.\n" +
        "The method:\n" +
        "- Label each middle sentence: general or example.\n" +
        "- Put each example after the general statement it illustrates.\n" +
        "- Keep the example's follow-up sentences ('it', 'he', 'that') next to it.\n" +
        "- If two sentences both sound general, the broader one comes first and the narrower one leads into the example.",
      authoredExample: {
        prompt:
          "S1: Many animals change their behaviour with the seasons.\n" +
          "P: For example, the Arctic tern flies from the far north to the far south and back every year.\n" +
          "Q: Some travel thousands of kilometres to find food and a safe place to breed.\n" +
          "R: That is a round trip of about seventy thousand kilometres.\n" +
          "S: Others, such as bears, sleep through the coldest months.\n" +
          "S6: Both habits help them survive when food is scarce.\n" +
          "(a) QPRS (b) PQRS (c) QSPR (d) SPRQ",
        steps: [
          "Q is a general claim (some animals travel far); P is one case of it (the Arctic tern). So Q comes before P. (b) fails.",
          "R's 'That is a round trip' sums up the tern's journey, so R stays right after P.",
          "S's 'Others' needs 'Some' (Q) before it, so (d) fails. In (c), P's travelling tern comes after the sleeping bears, so it is no longer an example of the sentence before it. (c) fails.",
          "Read (a): Q, P, R, S, S6.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: Not every invention begins in a laboratory.\n" +
          "P: The safety pin is one example.\n" +
          "Q: Many simple things were invented by ordinary people trying to solve a small problem.\n" +
          "R: Walter Hunt made it in 1849 by twisting a piece of wire, because he needed money to pay a small debt.\n" +
          "S: He sold the idea for just four hundred dollars.\n" +
          "S6: Today, billions of safety pins are made every year.\n" +
          "(a) QPRS (b) PQRS (c) QRPS (d) PRSQ",
        steps: [
          "Q is the general claim; P names one example of it. So Q comes before P.",
          "R says 'made it', so it needs the safety pin named in P. (c) puts R before P and fails. (b) puts Q between P and R, so R's 'it' comes after 'many simple things', with no single thing just before it to point at. It fails.",
          "(d) puts the general claim Q last, after the story, and leaves S6 about safety pins after a general sentence. It fails.",
          "Read (a): Q, P, R, S, S6.",
        ],
        answer: "(a) QPRS",
      },
      practiceSet: [
        {
          prompt:
            "Which comes first? (i) For instance, neem twigs are used to clean teeth. (ii) Many plants have uses in daily life.",
          answer: "(ii)",
          method: "The general claim comes before its example.",
        },
        {
          prompt: "A sentence begins 'Suppose ...'. What does it usually do?",
          answer: "It gives an imagined case to explain a general point made just before.",
        },
        {
          prompt: "Spot the wrong order: 'Iron rusts in damp air. For example, many metals react with the air around them.'",
          answer: "Wrong. The general claim (metals react) comes first, then the example (iron rusts).",
        },
      ],
      pyqExampleId: "8c27fa40-5933-4ee0-a250-784c6d28dbda",
      traps: [
        {
          title: "An example with no marker",
          body:
            "Many examples carry no 'for example'. A sentence that names one person, place or number right after a general claim is usually its example.",
        },
        {
          title: "Breaking off the example",
          body:
            "A sentence that continues the example ('it', 'that', 'his') must stay next to it. Do not return to the general idea until the example is finished.",
        },
        {
          title: "Two general sentences",
          body:
            "When two sentences both sound general, the broader one comes first. The narrower one usually introduces the example, so it sits just before the case.",
        },
      ],
    },

    // C2 — cause and effect, question and answer
    {
      kind: "formula" as const,
      slug: "cdsenps-reason-answer",
      name: "Cause before effect, question before answer",
      intuition:
        "Some passages are chains: this happened, so that happened, so a third thing happened. Others ask a question and then answer it. " +
        "In both, one sentence depends on another: an effect needs its cause first, and an answer needs its question first.",
      definition:
        "The terms:\n" +
        "- **Cause and effect**: one event that leads to another. Markers: so, as a result, this led to, which caused.\n" +
        "- **Explanation**: a sentence that gives the reason for a fact already stated. Markers: this is because, the reason is, for.\n" +
        "- **Question and answer**: a middle sentence asks a question; the next one answers it.\n" +
        "The method:\n" +
        "- Build the chain: for each event, ask what caused it, and put the cause before it.\n" +
        "- Put an explanation **after** the fact it explains.\n" +
        "- Put the answer right after its question. An answer cannot come first.",
      authoredExample: {
        prompt:
          "S1: For weeks, the monsoon rain in the hills was twice the usual amount.\n" +
          "P: So the extra water ran off into the river below, which rose above the danger mark.\n" +
          "Q: The low fields along its banks were flooded.\n" +
          "R: The soil on the slopes could hold no more water.\n" +
          "S: As a result, the farmers there lost most of their paddy crop.\n" +
          "S6: The state has since promised them compensation.\n" +
          "(a) RPQS (b) PRQS (c) RQPS (d) QPRS",
        steps: [
          "Follow the chain: heavy rain (S1) soaks the soil (R); the soil can hold no more, so the water runs into the river (P); the river floods the fields (Q); the crop is lost (S).",
          "P starts with 'So': it needs its cause, the soaked soil (R). (b) puts P before R and fails.",
          "Q says 'its banks', so it needs the river in P. (c) and (d) put Q before P and fail.",
          "(a) keeps every cause before its effect: R, P, Q, S.",
        ],
        answer: "(a) RPQS",
      },
      selfCheckExample: {
        prompt:
          "S1: A camel can walk for days in the desert without drinking.\n" +
          "P: How does it manage so long without water?\n" +
          "Q: The answer lies in two parts of its body: its kidneys and its blood.\n" +
          "R: The kidneys waste very little water, and the blood keeps flowing even when the camel is badly dried out.\n" +
          "S: When it does find water, it can drink over a hundred litres in a few minutes.\n" +
          "S6: Few animals are better built for life in the desert.\n" +
          "(a) PQRS (b) QPRS (c) PRQS (d) SPQR",
        steps: [
          "P asks a question; Q gives the answer. The answer must come right after the question, so (b) fails.",
          "R says 'The kidneys' and 'the blood' as if we know them. Q names them first. So Q comes before R, and (c) fails.",
          "(d) opens with S, about finding water, before the question about going without it. It fails.",
          "Read (a): P, Q, R, S, S6.",
        ],
        answer: "(a) PQRS",
      },
      practiceSet: [
        {
          prompt: "Order: (i) As a result, the shops ran out of bread. (ii) The bakers went on strike for a week.",
          answer: "(ii), then (i)",
          method: "The cause comes before 'As a result'.",
        },
        {
          prompt: "A middle sentence asks a question. Where must its answer go?",
          answer: "Right after it.",
        },
        {
          prompt: "Spot the wrong order: 'So the match was moved indoors. Heavy rain was forecast for the evening.'",
          answer: "Wrong. The cause (the rain forecast) must come before 'So'.",
        },
      ],
      pyqExampleId: "aa8ad08b-79cd-4813-8984-8013fc71dc4f",
      traps: [
        {
          title: "An answer before its question",
          body:
            "A sentence that answers ('The answer is ...', 'Because ...', 'The reason is ...') cannot come before the question it answers. Strike any option that does this.",
        },
        {
          title: "A result with no cause",
          body:
            "'So', 'as a result' and 'this led to' need the cause just before them. If the sentence before talks about something else, the link is broken.",
        },
        {
          title: "Explanation before the fact",
          body:
            "When one sentence states a fact and another explains it ('This is because ...'), the fact comes first. The explanation leans back on it.",
        },
      ],
    },

    // C3 — common view, then correction
    {
      kind: "formula" as const,
      slug: "cdsenps-view-correction",
      name: "The common view first, then the writer's correction",
      intuition:
        "A writer often begins with what most people believe, then corrects it: 'It is widely believed that ... In fact, ...'. The belief must come first, because the correction argues against it.",
      definition:
        "The terms:\n" +
        "- **Common view**: a belief the writer reports but does not share. Markers: many people think, it is widely believed, historians have long said, the usual view.\n" +
        "- **Correction**: the writer's answer to it. Markers: in fact, actually, in reality, but, however, others have shown, contrary to popular belief.\n" +
        "The method:\n" +
        "- Find the sentence that reports a belief. It comes before the correction.\n" +
        "- Find the correction words. They need the belief just before them.\n" +
        "- The correction may take two or three sentences: first 'that is wrong', then 'here is what is true'. Keep them together, in that order.",
      authoredExample: {
        prompt:
          "S1: Bats have a poor name in many cultures.\n" +
          "P: In fact, most bats can see quite well.\n" +
          "Q: It is widely believed that bats are blind.\n" +
          "R: At night, however, they rely mainly on sound to find their way.\n" +
          "S: They make high-pitched calls and listen for the echo that bounces back.\n" +
          "S6: This skill, called echolocation, lets them catch insects in total darkness.\n" +
          "(a) QPRS (b) PQRS (c) QRPS (d) RSQP",
        steps: [
          "Q reports a common belief; P corrects it with 'In fact'. The belief comes first, so (b) fails.",
          "(d) puts the belief after the facts about echoes, where nothing is left to correct. It fails.",
          "In (c), R comes before P. R's 'however' turns from 'they can see well' (P): they see well, but at night they use sound. Without P before it, R has nothing to turn from. (c) fails.",
          "Read (a): Q, P, R, S, and S6's 'This skill'.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: The Great Wall of China is one of the most famous structures on earth.\n" +
          "P: A popular claim says that it can be seen with the naked eye from the Moon.\n" +
          "Q: This is not true.\n" +
          "R: From the Moon, astronauts report, no man-made structure can be seen at all.\n" +
          "S: The wall is long, but it is narrow and close in colour to the land around it.\n" +
          "S6: That is why, even from a low orbit, it is very hard to spot.\n" +
          "(a) PQRS (b) QPRS (c) PQSR (d) RPQS",
        steps: [
          "P reports the common claim; Q corrects it. 'This is not true' needs the claim just before it, so (b) fails.",
          "(d) opens with R, the astronauts' report, before any claim has been made. It fails.",
          "S6 says 'That is why ... hard to spot'. The reason is S (narrow, same colour as the land). So S comes fourth, and (c) fails.",
          "Read (a): P, Q, R, S, S6.",
        ],
        answer: "(a) PQRS",
      },
      practiceSet: [
        {
          prompt:
            "Which comes first? (i) Recent studies show that poor roads mattered just as much. (ii) For years, the famine was blamed on the drought alone.",
          answer: "(ii)",
          method: "The common view comes before the correction.",
        },
        {
          prompt: "What does 'Contrary to popular belief' signal?",
          answer: "That the sentence corrects a common view, which is usually stated just before.",
        },
        {
          prompt: "Spot the wrong order: 'In reality, the tomato is a fruit. Most people think of the tomato as a vegetable.'",
          answer: "Wrong. The common view comes first, then 'In reality'.",
        },
      ],
      pyqExampleId: "c79779b6-a931-43e3-af68-31e9aa56e97c",
      traps: [
        {
          title: "Taking the common view as the writer's view",
          body:
            "'Many people think', 'It is widely believed', 'Historians have long said': these report a view the writer is about to correct. Do not treat them as the passage's main point.",
        },
        {
          title: "A correction with nothing to correct",
          body:
            "'In fact', 'actually' and 'in reality' need a claim before them. An option that puts them right after S1, when S1 makes no claim to correct, usually fails.",
        },
        {
          title: "Stopping after the first correction",
          body:
            "The correction often runs over two or three sentences, from 'that is wrong' to 'this is what matters'. Keep that run together; do not put a new topic in the middle of it.",
        },
      ],
    },
  ],
};
