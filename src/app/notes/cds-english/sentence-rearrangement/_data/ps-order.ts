import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_PS_ORDER_NOTE: SubtopicNote = {
  subtopicName: "Time Order and Lists",
  title: "Order of events: dates, time words, stories and counted lists",
  oneLineDefinition:
    "Many passages follow time or a count. Put dates on a line, follow time words like then, by then and later, tell a story in the order it happens, and keep a list in the order it was announced.",
  whyItMatters:
    "History, biography and process passages are common in this format, and they reward a simple habit: build the timeline first. " +
    "The traps are a sentence that steps back in time ('Before that'), a pointer like 'By then' that must sit next to its date, and a list member ('The other', 'Secondly') placed before the first one.",
  concepts: [
    // C1 — time words (reference)
    {
      kind: "reference" as const,
      slug: "cdsenps-time-words",
      name: "Dates and time words fix the order",
      intuition:
        "If the sentences carry dates or time words, put them on a timeline before you look at the options. Dates usually rise from earliest to latest. " +
        "Time words tell you more: 'then' and 'later' move forward from the event just told, and 'by then' and 'since then' point back to a time just named.",
      definition:
        "The terms:\n" +
        "- **Time marker**: a date or a phrase that places an event in time.\n" +
        "How to use them:\n" +
        "- Dates and centuries: put them in rising order, earliest first.\n" +
        "- 'Then', 'later', 'much later', 'thereafter', 'within a few years': the event comes after the one just told.\n" +
        "- 'By then', 'since then', 'after that': they point back to a date or event in the sentence **just before**, so they cannot be split from it.\n" +
        "- 'Before that': steps back in time. The sentence comes later in the paragraph, but its event is earlier.\n" +
        "- 'Hitherto ... now', 'For a long time ... however, with': a past-and-present pair. The past sentence comes first.\n" +
        "- 'Today' and 'now': present-day sentences usually come last, just before S6.",
      table: {
        columns: ["Time marker", "What it tells you", "In the passage", "Sitting"],
        rows: [
          { cells: ["Since then", "Points back to the date just before it", "It was introduced ... by the British in the 1800s. / Since then, it has spread over six lakh square kilometres ...", "2026 (I)"] },
          { cells: ["By then", "Points back to the time just named", "By the end of the seventeenth century, money was widely used ... / By then a large section of the people received their income in the form of wages ...", "2020 (I)"] },
          { cells: ["Before that", "Steps back to an earlier time", "Before that, for countless generations, nearly all humans had lived as hunters and gatherers ...", "2026 (I)"] },
          { cells: ["Much later / Then / In this century", "Moves forward step by step", "Much later, the first industrial revolution was based on ... coal. / Then steam was used to produce electricity.", "2017 (II)"] },
          { cells: ["Then", "The next stage after a long earlier period", "Then, between 10,000 and 4,500 years ago, people ... learnt to domesticate certain plants and animals.", "2020 (I)"] },
          { cells: ["Thereafter", "Follows the event just told", "The Treaty of Paris (1763) brought an end to the Seven Years War. / Thereafter, the European continent had been free from bloody conflicts ...", "2023 (II)"] },
          { cells: ["Within a few years", "Measures time from an event just told", "In the immediate aftermath ... there was apprehension. / Within a few years, however, the beneficial impact ... became manifest.", "2022 (II)"] },
          { cells: ["Hitherto ... Now", "Past first, then present", "Hitherto he had been backward. / Now with scientific knowledge ... he has done what was impossible.", "2021 (I)"] },
          { cells: ["During the Middle Ages ... In the middle of the fifteenth century", "Centuries in rising order", "During the Middle Ages the coming of Science was hindered by the Church. / In the middle of the fifteenth century, however, the Turks captured ... Constantinople.", "2017 (II)"] },
          { cells: ["From the sixteenth century onwards", "Later than the early civilisations", "The early civilisations of Egypt, India, China ... made vital contributions. / From the sixteenth century onwards, great strides were also made in science in Europe.", "2026 (I)"] },
          { cells: ["In July 1898 ... 1901", "Dates in rising order", "In July 1898, Manson described Ross's results ... / Ross was elected a fellow of the Royal Society in 1901.", "2017 (II)"] },
          { cells: ["1953 ... 1954 ... During the Civil War ... After the War", "A life told year by year", "He received a BA ... in 1953 ... / He joined the Nigerian Broadcasting Company ... in 1954 ... / After the War, he was appointed Senior Research Fellow ...", "2020 (I)"] },
          { cells: ["fourteenth century ... In its heyday ... In 1565", "Rise, height, fall", "The empire was founded in the fourteenth century. / In its heyday, it stretched from the river Krishna ... / In 1565, the city was destroyed ...", "2023 (I)"] },
          { cells: ["33 AD ... After Pakhangba ... 1819-1826 ... Then ... 1891", "A long history in rising order", "The political history of Manipur could be traced back to 33 AD ... / After Pakhangba, a number of kings ruled ... / Then, Manipur came under the British rule in 1891.", "2023 (I)"] },
          { cells: ["1959 ... In 1975", "The next date in an institution's history", "The National School of Drama (NSD) was set up ... in 1959. / In 1975, it became an autonomous organisation.", "2024 (II)"] },
          { cells: ["began around 1929 ... ended in 1935", "Start before end", "It began around 1929 and lasted till the mid-1930s. / The Depression ended in 1935 and led to major political initiatives.", "2025 (I)"] },
        ],
        caption: "Build the timeline first. A pointer like 'by then' or 'since then' stays next to its date; 'before that' steps back.",
      },
      pyqExampleId: "8ffb4399-5ba8-44e4-9e02-623912fedf95",
      selfCheckExample: {
        prompt:
          "S1: The town of Rampur got its first bus service in 1965.\n" +
          "P: Within ten years, twelve buses were running on six routes.\n" +
          "Q: By then, the weekly market had grown into a daily one.\n" +
          "R: It had just one bus, which made two trips a day to the district town.\n" +
          "S: Today, more than a hundred buses pass through Rampur every day.\n" +
          "S6: Few people there remember the town before the first bus.\n" +
          "(a) RPQS (b) PRQS (c) RQPS (d) SRPQ",
        steps: [
          "R describes the 1965 service itself ('It had just one bus'), so it follows S1.",
          "P's 'Within ten years' moves forward from the start; Q's 'By then' points back to that ten-year mark. So P comes just before Q. (c) fails.",
          "S ('Today') is the present and belongs last. (d) opens with it and fails.",
          "(b) puts P before R, so R's 'It had just one bus' comes after twelve buses are running. It fails. (a) is left.",
        ],
        answer: "(a) RPQS",
      },
      practiceSet: [
        {
          prompt: "Order these: (i) Later, he joined the Navy. (ii) He grew up in a fishing village.",
          answer: "(ii), then (i)",
          method: "'Later' needs an earlier event before it.",
        },
        {
          prompt: "A sentence begins 'Before that, ...'. Does its event come earlier or later than the event just told?",
          answer: "Earlier.",
          method: "The sentence comes later in the paragraph, but it steps back in time.",
        },
        {
          prompt: "A sentence begins 'Hitherto'. What kind of sentence do you expect after it?",
          answer: "A sentence about now.",
          method: "Hitherto describes the past, so the present follows.",
        },
        {
          prompt:
            "Spot the wrong order: 'In 1990 the dam was finished. Work on the dam began in 1982. The survey was done in 1975.'",
          answer: "Wrong. With no step-back word, the dates should rise: 1975, 1982, 1990.",
        },
      ],
      traps: [
        {
          title: "Ordering by numbers alone",
          body:
            "A sentence with an early date can come later in the paragraph if 'Before that' marks the step back. Read the time word, not only the number.",
        },
        {
          title: "Splitting a pointer from its date",
          body:
            "'By then' and 'since then' stand for the time in the sentence just before. An option that puts another sentence between them breaks the link.",
        },
        {
          title: "'Today' too early",
          body:
            "In a history passage, a present-day sentence usually comes last, just before S6. An option that puts 'Today ...' in the middle of the past is usually wrong.",
        },
      ],
    },

    // C2 — story order
    {
      kind: "formula" as const,
      slug: "cdsenps-story-order",
      name: "A story runs in the order things happen",
      intuition:
        "In a story or a process there may be no time words at all. You still know the order, because each action needs the one before it: you cannot open a letter before it reaches you.",
      definition:
        "The terms:\n" +
        "- **Narrative order**: events told in the order they happen.\n" +
        "- **Process order**: steps told in the order they are done.\n" +
        "The method:\n" +
        "- For each middle sentence, ask: what must already have happened for this to be possible?\n" +
        "- Chain the sentences so that each one's 'must already have happened' is told before it.\n" +
        "- In a story, keep the order in which the person **finds things out**: they see the result before they learn the cause.\n" +
        "- In a process, an object must exist before 'them' or 'it' can be used: you crush the spices before you put them in the pan.",
      authoredExample: {
        prompt:
          "S1: Ajay reached the station ten minutes before his train.\n" +
          "P: When he reached for some money, he found that his wallet was not in his pocket.\n" +
          "Q: He went to the counter to buy a platform ticket for his brother.\n" +
          "R: Just then a porter came running up, holding the wallet.\n" +
          "S: Ajay had dropped it near the entrance.\n" +
          "S6: Ajay thanked him and caught his train with a minute to spare.\n" +
          "(a) QPRS (b) PQRS (c) RSQP (d) QRPS",
        steps: [
          "P says he reached for money. He needs a reason to pay first: buying the ticket in Q. So Q comes before P. (b) fails.",
          "R has the porter bring the wallet back. The wallet must be found missing first (P). (c) and (d) put R before P and fail.",
          "S explains where the wallet was dropped. Ajay learns that only when the porter brings it, so S follows R.",
          "Read (a): Q, P, R, S, S6.",
        ],
        answer: "(a) QPRS",
      },
      selfCheckExample: {
        prompt:
          "S1: Making a cup of masala tea takes only a few minutes.\n" +
          "P: When the water boils, add a spoonful of tea leaves.\n" +
          "Q: Crush a little ginger and two pods of cardamom.\n" +
          "R: Put them in a pan with a cup of water and heat it.\n" +
          "S: After a minute, pour in the milk and sugar and boil it again.\n" +
          "S6: Strain the tea into a cup and serve it hot.\n" +
          "(a) QRPS (b) RQPS (c) QPRS (d) RPSQ",
        steps: [
          "R says 'Put them in a pan'. 'Them' needs the ginger and cardamom of Q. So Q comes before R. (b) and (d) fail.",
          "P needs boiling water, which needs the pan of water in R. So R comes before P. (c) fails.",
          "Read (a): crush (Q), heat with water (R), add tea leaves (P), add milk (S), strain (S6).",
        ],
        answer: "(a) QRPS",
      },
      practiceSet: [
        {
          prompt:
            "Order the events: (i) The guard raised the alarm. (ii) He saw a light moving near the fence. (iii) The intruder ran off.",
          answer: "(ii), (i), (iii)",
          method: "He must see the light before he raises the alarm, and the alarm makes the intruder run.",
        },
        {
          prompt: "A story passage has no time words. What do you use to order it?",
          answer: "What each action needs to have happened before it.",
        },
        {
          prompt: "Spot the wrong order: 'She opened the letter. She read it twice. The postman handed her a letter.'",
          answer: "Wrong. The postman must hand it over before she can open it.",
        },
      ],
      pyqExampleId: "18f443e5-da5c-4ee2-9b41-bd941c45b161",
      traps: [
        {
          title: "Ordering by importance",
          body:
            "The most dramatic sentence is not always last, and the calmest is not always first. Order by when each event happened.",
        },
        {
          title: "Telling the cause before it is found out",
          body:
            "In a story told through one person's eyes, keep the order of discovery. They notice the damage first and learn how it happened later, even though the cause happened earlier.",
        },
        {
          title: "Skipping a needed step",
          body:
            "If a sentence needs an earlier action (you cannot go in before you reach the house), that action must sit before it. Check each sentence for what it takes for granted.",
        },
      ],
    },

    // C3 — announced lists and counted pairs
    {
      kind: "formula" as const,
      slug: "cdsenps-lists",
      name: "Announced lists and counted pairs: first, second; one, the other",
      intuition:
        "When a sentence says 'three dangers' or 'two schools of thought', it promises a list. The members then come in order: the first, the second, the third. " +
        "Pairs work the same way: 'Some ... Others', 'One ... The other'.",
      definition:
        "The terms:\n" +
        "- **Announced list**: a sentence that gives a number or says 'different forms', 'several ways'. The members follow it.\n" +
        "- **Counted pair**: two linked openers: one ... the other; some ... others; firstly ... secondly; the first school ... the second.\n" +
        "The method:\n" +
        "- Find the announcement. It may be in S1 or in a middle sentence; if it is in a middle sentence, it comes before the list.\n" +
        "- Put the members in order: first, second, third; one before the other; some before others.\n" +
        "- Keep each member next to the sentence that explains it, before the next member begins.\n" +
        "- A closing pointer such as 'all three' or 'both' comes after the whole list.",
      authoredExample: {
        prompt:
          "S1: Soldiers in the desert face three main dangers.\n" +
          "P: The second is the cold at night, which can fall close to freezing.\n" +
          "Q: The first is the heat of the day.\n" +
          "R: The third, and the hardest to see coming, is the sandstorm.\n" +
          "S: It can raise the body temperature to a dangerous level within hours.\n" +
          "S6: Good training prepares a soldier for all three.\n" +
          "(a) QSPR (b) QPSR (c) PQSR (d) QPRS",
        steps: [
          "S1 announces three dangers, so the members come in order: first (Q), second (P), third (R). (c) puts the second before the first and fails.",
          "S explains one danger: 'It can raise the body temperature'. That fits the heat (Q), not the cold or the sandstorm. So S stays next to Q.",
          "(b) puts S after the cold, and (d) after the sandstorm. Both split S from the heat and fail.",
          "Read (a): Q, S, P, R, and S6's 'all three'.",
        ],
        answer: "(a) QSPR",
      },
      selfCheckExample: {
        prompt:
          "S1: People react to exam stress in different ways.\n" +
          "P: Others cannot sleep and keep revising late into the night.\n" +
          "Q: Some stop eating properly.\n" +
          "R: A few, however, use the pressure to work harder and better.\n" +
          "S: Both habits leave them tired on the day of the exam.\n" +
          "S6: Learning to handle stress is therefore as important as learning the syllabus.\n" +
          "(a) QPSR (b) PQSR (c) QSPR (d) QPRS",
        steps: [
          "'Others' needs 'Some' before it, so Q comes before P. (b) fails.",
          "S's 'Both habits' needs two bad habits before it: not eating (Q) and not sleeping (P). (c) puts S after one habit and fails.",
          "In (d), 'Both habits' comes after R, the good reaction, so it no longer points cleanly at the two bad habits. R's 'however' also turns from those bad habits, so it belongs after S. (d) fails.",
          "Read (a): Q, P, S, R, S6.",
        ],
        answer: "(a) QPSR",
      },
      practiceSet: [
        {
          prompt:
            "S1 says 'There are two kinds of fuel.' Which comes next? (i) The second kind is renewable. (ii) The first kind is fossil fuel.",
          answer: "(ii)",
          method: "The first member comes before the second.",
        },
        {
          prompt: "Q contains 'Secondly'. What must come before Q?",
          answer: "The first point (firstly, first, or one).",
        },
        {
          prompt: "A sentence starts 'Others ...'. What does it need before it?",
          answer: "A sentence starting 'Some ...' about the same group.",
        },
        {
          prompt:
            "A middle sentence says 'The new law changes three things.' Where does it go?",
          answer: "Before the three sentences that name the changes.",
          method: "An announcement in the middle still comes before its list.",
        },
      ],
      pyqExampleId: "a8955a63-24b3-4fe4-ba41-220a0587e170",
      traps: [
        {
          title: "'The other' too early",
          body:
            "'The other', 'Others' and 'Secondly' can never come before 'One', 'Some' and 'First'. Options that break this are the quickest to strike.",
        },
        {
          title: "Splitting a member from its detail",
          body:
            "A sentence that explains a member ('It can...', 'This means...') must stay next to that member, before the next member starts.",
        },
        {
          title: "Missing a middle announcement",
          body:
            "The count is not always in S1. If a middle sentence says 'two events' or 'in three ways', it must come before the members, even if it does not look like an opening sentence.",
        },
      ],
    },
  ],
};
