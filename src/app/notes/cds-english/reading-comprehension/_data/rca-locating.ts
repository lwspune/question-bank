import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCA_LOCATING_NOTE: SubtopicNote = {
  subtopicName: "Locating the Answer Line",
  title: "Reading a CDS Passage: Finding the Line",
  oneLineDefinition:
    "Most passage questions are answered by one line of the passage. Read the passage once for its plan, then let each question send you back to the right line.",
  whyItMatters:
    "Reading comprehension is a large part of every CDS English paper, and each passage question carries the same marks as a grammar item. " +
    "Students lose time by reading the passage again and again, and lose marks by answering from memory. " +
    "A fixed routine fixes both: one steady read for the plan, then one exact line for each question.",
  concepts: [
    // C1 — reading under time: map the passage once
    {
      kind: "formula" as const,
      slug: "cdsenrca-passage-map",
      name: "Map the passage first: openings, signposts, closings",
      intuition:
        "You cannot remember a whole passage, and you do not need to. You need a map: what each paragraph is about and where the writer turns. " +
        "With the map in your head, every question points you to one place, and you read only that place again.",
      definition:
        "The terms:\n" +
        "- **Passage map**: a three- or four-word label in your head for each paragraph, saying what it is about.\n" +
        "- **Signpost**: a word that marks a turn or a new step: first, then, a third issue, however, but, for example, in short.\n" +
        "- **Opening and closing lines**: the first line of a paragraph usually names its subject. The last lines of the passage often give the writer's final point.\n" +
        "The method, under time:\n" +
        "- Glance at the question stems first, not the options. Note the names, words and ideas they ask about.\n" +
        "- Read the passage once, at a steady pace. Do not stop on a hard word; its own question will bring you back.\n" +
        "- After each paragraph, give it a short label: 'how the town began', 'too many visitors', 'the council's plan'.\n" +
        "- Notice the signposts as you pass them. 'However' turns the argument. 'A third issue' tells you that two came before.\n" +
        "- Now answer. A question that asks 'in which paragraph' or 'what is the third issue' is answered from the map.\n" +
        "- Never answer from memory of the passage. Go back to the line every time.",
      authoredExample: {
        prompt:
          "Paragraph 1: The hill town was built as a summer retreat. Its cool air drew officials away from the heat of the plains. " +
          "Paragraph 2: Today the town receives far more visitors than it was built for. However, its springs have not grown with it, and the taps run dry by May. " +
          "Paragraph 3: The council now plans a pipeline from a distant river. Critics say the money would be better spent on storing rain. " +
          "In which paragraph does the writer explain why the town is short of water? (a) Paragraph 1 (b) Paragraph 2 (c) Paragraph 3 (d) None of them",
        steps: [
          "Map the passage: P1 = how the town began; P2 = too many visitors, same springs; P3 = the council's plan and its critics.",
          "The signpost 'However' in P2 marks the turn from growth to the problem.",
          "The question asks for the reason for the shortage. The map sends you to P2: more people, but the springs have not grown.",
          "Check P3 to be safe: it gives a plan for the future, not the reason for the shortage.",
        ],
        answer: "(b) Paragraph 2",
      },
      selfCheckExample: {
        prompt:
          "The school's new rule bans phones in class. Parents have raised several concerns. First, children cannot be reached in an emergency. " +
          "Second, the rule was made without asking them. A third concern is who will keep the phones safe during the day. The principal has answered only the first. " +
          "What is the third concern of the parents? (a) Emergencies (b) Not being asked (c) Keeping the phones safe (d) The principal's reply",
        steps: [
          "The signposts First, Second and 'A third concern' number the list for you.",
          "Go straight to the sentence that holds 'A third concern'.",
          "It names who will keep the phones safe. (a) and (b) are the first and second concerns; (d) is not a concern at all.",
        ],
        answer: "(c) Keeping the phones safe",
      },
      practiceSet: [
        {
          prompt: "A paragraph opens with 'However, not everyone agrees.' What does the signpost tell you?",
          answer: "This paragraph gives the other side, against what came before.",
          method: "'However' turns the argument.",
        },
        {
          prompt: "A question asks for the writer's final view. Where do you look first?",
          answer: "The closing lines of the passage.",
          method: "Writers usually end on their main point.",
        },
        {
          prompt: "A passage gives steps with 'first', 'next' and 'finally'. A question asks for the second step. Which word leads you to it?",
          answer: "next",
          method: "Follow the signposts in order.",
        },
        {
          prompt: "Six questions follow one passage. What do you read before the passage?",
          answer: "The six question stems, not their options.",
          method: "The stems tell you what to look for while you read.",
        },
      ],
      pyqExampleId: "829ca427-5e26-4b29-817a-0c26d0a0461e",
      traps: [
        {
          title: "Answering from memory",
          body:
            "After one read, a passage feels clear, and the option that 'sounds like the passage' looks right. But memory blends paragraphs and drops small words. " +
            "Go back to the line before you mark an answer, even when you feel sure.",
        },
        {
          title: "Skipping a short paragraph when counting",
          body:
            "When a question asks 'in which paragraph', count every paragraph on the page, including one made of a single quoted remark. " +
            "A one- or two-line paragraph is easy to miss, and then every later paragraph gets the wrong number.",
        },
        {
          title: "Reading the options before the passage",
          body:
            "Four options tell four stories, and three of them are false. Read them first and you carry false ideas into the passage. " +
            "Read the stems, then the passage, then the options.",
        },
        {
          title: "Counting sentences instead of following the signpost",
          body:
            "In a passage on climate talks, the writer lists objections without numbering them, then says '**A third issue** is whether a share of the revenue ... will go toward the UN's Adaptation Fund.' " +
            "The question on 'the third issue' is answered by the sentence the signpost opens, not by counting sentences from the top.",
        },
      ],
    },

    // C2 — the anchor word leads to the line; read the whole sentence
    {
      kind: "formula" as const,
      slug: "cdsenrca-anchor-word",
      name: "Scan for the anchor word, then read the whole sentence",
      intuition:
        "Each question carries a word that also sits in the passage: a name, a thing, an unusual noun. That word is your anchor. " +
        "Scan for it, land on its sentence, and read the whole sentence before you look at the options.",
      definition:
        "The terms:\n" +
        "- **Anchor word**: a word in the question stem that also appears in the passage, or a close synonym of it.\n" +
        "- **Scanning**: moving the eye quickly over the passage to find one word, without reading the rest.\n" +
        "The method:\n" +
        "- Pick the rarest word in the stem: a name, a number, an unusual noun. Common words such as 'people' or 'life' appear everywhere.\n" +
        "- Scan for it. If it is not there, scan for a synonym: the stem may say 'growth' where the passage says 'progress'.\n" +
        "- Read the whole sentence that holds the anchor, and the sentence after it. The answer is often in the second half, after a comma, 'but' or 'for'.\n" +
        "- Put the line in your own words, then find the option that says the same.\n" +
        "- If the anchor appears in two places, read both before you choose.",
      authoredExample: {
        prompt:
          "The old fort was repaired in 1990. Its walls were cleaned and painted, but the wooden gates were left untouched, and rain has since rotted them badly. Visitors now enter through a side door. " +
          "What has happened to the fort's gates? (a) They were cleaned in 1990 (b) They were replaced (c) Rain has damaged them (d) Visitors use them every day",
        steps: [
          "The anchor is 'gates'. Scan for it: it is in the second sentence.",
          "Read the whole sentence. Its first half is about the walls; the gates come after 'but'.",
          "In your own words: the gates were not repaired, and rain has rotted them.",
          "(a) belongs to the walls, not the gates. (b) is not stated. (d) is wrong, since visitors use a side door.",
        ],
        answer: "(c) Rain has damaged them",
      },
      selfCheckExample: {
        prompt:
          "The village school had no library until 2015. That year a retired teacher gave his own books, and the children began to borrow them on Saturdays. Today the library lends books to the whole village. " +
          "Who started the village library? (a) The children (b) The village council (c) A retired teacher (d) The school",
        steps: [
          "The anchor 'library' appears three times. Read each place.",
          "The first says there was none; the third says what it does today.",
          "The second sentence says how it began: a retired teacher gave his books. The council is never mentioned.",
        ],
        answer: "(c) A retired teacher",
      },
      practiceSet: [
        {
          prompt: "Stem: 'What does the author say about the city's traffic?' Which word do you scan for?",
          answer: "traffic",
          method: "It is the rarest word in the stem; 'author' and 'city' may appear everywhere.",
        },
        {
          prompt: "The stem asks about 'farm income'. The passage never says 'income' but says 'what farmers earn'. Is that your line?",
          answer: "Yes. 'What farmers earn' is a synonym anchor.",
        },
        {
          prompt: "Line: 'The river is clean near its source, but the factories downstream turn it brown.' What colour is the river near the factories?",
          answer: "Brown.",
          method: "The answer is in the second half, after 'but'.",
        },
        {
          prompt: "The anchor 'monsoon' appears in paragraph 1 and in paragraph 3. What do you do?",
          answer: "Read both lines before choosing.",
        },
      ],
      pyqExampleId: "1f755b25-2622-4c19-8a98-472fde405b37",
      traps: [
        {
          title: "Stopping at the anchor clause",
          body:
            "A passage says new ideologies and power structures were created 'to coerce or otherwise convince large groups of people to devote their time to the new tasks **for very little reward**'. " +
            "A reader who stops at 'convince large groups of people' may pick 'very high rewards'. The end of the sentence says the opposite.",
        },
        {
          title: "Missing a synonym anchor",
          body:
            "The stem asks what affects 'economic **growth**'; the passage speaks of 'economic **progress**'. Scanning for 'growth' finds nothing, and the student decides the passage is silent. " +
            "If the anchor is missing, scan for its synonym.",
        },
        {
          title: "Anchoring on a common word",
          body:
            "Words like 'people', 'world' or 'author' appear in many lines, so scanning for them sends you to the wrong place. " +
            "Choose the most unusual word in the stem: a name, a number, a technical term.",
        },
      ],
    },

    // C3 — lists of owners and details; numbers and dates
    {
      kind: "formula" as const,
      slug: "cdsenrca-names-numbers",
      name: "Names, numbers and lists: tie each detail to its owner",
      intuition:
        "Some passages are lists: four animals, three leaders, two dates. The options then mix the details up and give one owner's habit to another. " +
        "Tie every detail to its owner as you read, and copy numbers exactly.",
      definition:
        "The terms:\n" +
        "- **Owner**: the person, thing or group a detail belongs to.\n" +
        "- **Swapped detail**: an option that takes a true detail from the passage and gives it to the wrong owner.\n" +
        "The method:\n" +
        "- When a passage lists several people or things, note each one with its key detail as you read: 'A builds, B coats, C hides'.\n" +
        "- Find the owner the question names, and read only that owner's sentence.\n" +
        "- For a 'which two' question, test each name in the option against the passage, one by one. One wrong name makes the option wrong.\n" +
        "- Copy numbers exactly: 30 is not 300, and 'three or four hours' is not 'one hour'.\n" +
        "- Dates BC count backwards from year 1. To turn a BC date into 'years ago', add the years since then: 1000 BC was about 3,000 years ago.",
      authoredExample: {
        prompt:
          "Three cadets went to the inter-academy meet. Arjun ran the long-distance race and finished second. Kabir, the strongest of the three, threw the javelin. Ravi had hurt his ankle, so he only kept the score. " +
          "Which cadets took part in an event? (a) Arjun and Ravi (b) Arjun and Kabir (c) Kabir and Ravi (d) All three",
        steps: [
          "Tie each detail to its owner: Arjun = ran; Kabir = threw the javelin; Ravi = kept the score.",
          "Keeping the score is not taking part in an event, so every option with Ravi is out: (a), (c) and (d).",
          "Arjun and Kabir both competed.",
        ],
        answer: "(b) Arjun and Kabir",
      },
      selfCheckExample: {
        prompt:
          "A passage says a temple was built in about 300 BC. Roughly how long ago was it built? (a) 300 years (b) 1,700 years (c) 2,300 years (d) 2,000 years",
        steps: [
          "BC counts backwards: 300 BC is 300 years before year 1.",
          "From year 1 to today is about 2,000 years.",
          "Add them: about 2,300 years ago. (a) reads the BC figure as 'years ago'.",
        ],
        answer: "(c) 2,300 years",
      },
      practiceSet: [
        {
          prompt: "Line: 'Meena teaches music; her brother Sunil teaches maths.' Option: 'Meena teaches maths.' True or false?",
          answer: "False.",
          method: "The detail belongs to Sunil: a swapped owner.",
        },
        {
          prompt: "Line: 'The bridge is 450 metres long and 45 years old.' How long is the bridge?",
          answer: "450 metres.",
          method: "45 is its age. Tie each number to what it measures.",
        },
        {
          prompt: "Line: 'The farmers supported the dam; the fishermen opposed it.' Who opposed the dam?",
          answer: "The fishermen.",
        },
        {
          prompt: "An event took place in 1000 BC. Roughly how many years ago was that?",
          answer: "About 3,000 years ago.",
          method: "1,000 years before year 1, plus about 2,000 since.",
        },
      ],
      pyqExampleId: "62aaed8a-683d-45a9-9fe5-57919daf2277",
      traps: [
        {
          title: "The owner who seems natural",
          body:
            "In a passage on Zimbabwe, the old guard backs Mr Mnangagwa, while 'Generation 40', a group of younger leaders, supports Mr Mugabe's wife, Grace. " +
            "Asked who supports Mrs Mugabe, many pick 'Mr Mugabe', the obvious owner. The passage names **Generation 40**.",
        },
        {
          title: "Reading BC dates as 'years ago'",
          body:
            "The potato was domesticated 'sometime between 5000 and 2000 BC'. That is about 7,000 to 4,000 years ago, not 'two to five thousand years ago'. " +
            "Add the years since year 1 before you compare.",
        },
        {
          title: "Changing a number or a time",
          body:
            "The evening meal 'should be light, taken three or four hours before **retiring**', and retiring here means going to bed. " +
            "Options such as 'just before sleeping' or 'an hour after sunset' change the time. Copy the figure from the line.",
        },
      ],
    },
  ],
};
