import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_ESR_LINKS_NOTE: SubtopicNote = {
  subtopicName: "Links Between Sentences",
  title: "Links Between Sentences",
  oneLineDefinition:
    "The words that tie a sentence to the one before it: pronouns and short names, pointers such as 'this' and 'such', and linking words such as however and therefore.",
  whyItMatters:
    "Seventy-six questions in the bank, 25 from the 2023 shifts, 10 from the 2024 shifts and 41 from the 2025 shifts. In most of them one sentence leans on another through a pronoun, a 'this' or a linking word, and that one pair decides between the options.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscesrli-pronouns",
      name: "Pronouns and short names point back",
      intuition:
        "A pronoun (it, he, they, them) or a short form of a name points back to something already named in full. So the sentence with the full name comes first, and the sentence with the pronoun or the short form follows it.",
      definition:
        "- **Pronouns:** it, he, she, they, them, his, its and their need a noun before them, so a sentence that opens with one cannot be first.\n" +
        "- **Short forms:** a surname alone follows the sentence with the full name; an abbreviation (UN) follows the full term (United Nations).\n" +
        "- **Match the pronoun:** \"he\" needs a man named before it, \"they\" a plural, \"it\" a single thing or idea.\n" +
        "- **Fast route:** find the sentences with no pronoun and no short form; the opener is one of them.",
      authoredExample: {
        prompt:
          "Arrange the sentences: A. He later wrote a book about his travels. B. Ravi Menon is a photographer from Kochi. C. His photographs of the Western Ghats won a national award. D. Menon began taking pictures as a schoolboy. (a) BDCA (b) DBCA (c) BCAD (d) ABDC",
        steps: [
          "B gives the full name and has no pronoun, so it opens.",
          "D uses the surname alone, so it follows B.",
          "A says he \"later\" wrote a book, after the award in C: BDCA.",
        ],
        answer: "(a) BDCA",
      },
      selfCheckExample: {
        prompt:
          "Arrange the sentences: A. They are also among the longest-lived animals. B. Giant tortoises are the largest tortoises in the world. C. Some are known to have lived for more than 150 years. D. Their shells can be over a metre long. (a) BDAC (b) BCAD (c) DBAC (d) ABDC",
        steps: [
          "B names giant tortoises and has no pronoun, so it opens; A and D lean on it with \"They\" and \"Their\".",
          "D adds to their size, and A's \"also\" brings in a second fact, long life.",
          "C gives an example of that long life, so it follows A: BDAC.",
        ],
        answer: "(a) BDAC",
      },
      practiceSet: [
        { prompt: "A sentence begins with \"He\". Can it open the paragraph?", answer: "No: \"He\" needs a person named before it." },
        { prompt: "Which comes first: a sentence with \"World Health Organization\" or one with \"WHO\"?", answer: "The one with the full name." },
        { prompt: "A sentence uses a person's surname alone. What must come before it?", answer: "A sentence that gives the person's full name." },
        { prompt: "Of four sentences, only one has no pronoun. Which is likely to open?", answer: "That one." },
      ],
      pyqExampleId: "52f66e42-0533-4d8c-a0dc-aaf0ff296c02",
      traps: [
        {
          title: "Linking a pronoun to the wrong noun",
          body:
            "Check that the pronoun makes sense with the noun just before it. \"They\" after a sentence about one scientist and her experiments may mean the experiments, not the people.",
        },
        {
          title: "Opening with a short form",
          body:
            "A surname or an abbreviation alone almost never opens a paragraph. The sentence that spells the name out comes first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesrli-pointers",
      name: "This, these and such",
      intuition:
        "\"This\", \"these\" and \"such\" with a noun (this method, these steps, this phenomenon) point back to an idea the sentence before described, often in other words. Ask \"this what?\" and place the sentence straight after the one that answers.",
      definition:
        "- **This + noun:** \"this issue\", \"this measure\", \"this process\" names in a word what the sentence before described.\n" +
        "- **These or such + plural:** \"these steps\", \"such methods\" point to several things just named.\n" +
        "- **This alone:** \"This helps ...\" refers to the whole action of the sentence before.\n" +
        "- **The noun is a label:** it tells you what kind of sentence to look for: \"this problem\" needs a problem before it, \"this measure\" a step taken.\n" +
        "- **No opener:** a sentence that starts with a pointer cannot be first.",
      authoredExample: {
        prompt:
          "Arrange the sentences: A. This measure has reduced traffic in those cities. B. Many cities face heavy traffic at peak hours. C. To ease this problem, some have made bus travel free. D. Such schemes are now being tried in other countries. (a) BCAD (b) BACD (c) CBAD (d) BDCA",
        steps: [
          "B states the problem and has no pointer, so it opens.",
          "C's \"this problem\" is the traffic in B, so C follows B.",
          "A's \"This measure\" is free bus travel from C, and D's \"Such schemes\" widens it to other countries: BCAD.",
        ],
        answer: "(a) BCAD",
      },
      selfCheckExample: {
        prompt:
          "Arrange the sentences: A. These skills help them in every subject. B. Many schools now teach children to code. C. Coding teaches pupils to break a problem into steps and to check their work. D. Such lessons are likely to spread as computers become common. (a) BCAD (b) BADC (c) CBDA (d) DBCA",
        steps: [
          "B introduces the topic and has no pointer, so it opens.",
          "A's \"These skills\" are the ones C names, so C comes before A.",
          "D's \"Such lessons\" looks ahead and closes: BCAD.",
        ],
        answer: "(a) BCAD",
      },
      practiceSet: [
        { prompt: "A sentence begins \"This measure\". What kind of sentence must come before it?", answer: "One that describes a step taken, such as a rule or a remedy." },
        { prompt: "A sentence speaks of \"such methods\". What must the sentence before it describe?", answer: "One or more methods." },
        { prompt: "Can a sentence that begins with \"These\" open the paragraph?", answer: "No: \"These\" points back to something named earlier." },
        { prompt: "A sentence begins \"This helps ...\". What does \"This\" refer to?", answer: "The action described in the sentence before." },
      ],
      pyqExampleId: "34777fef-9fd5-436d-b802-7bc7e5a07d69",
      traps: [
        {
          title: "Separating the pointer from what it names",
          body:
            "\"This issue\" must sit right after the sentence that raises the issue. Put another sentence between them and \"this\" points at the wrong idea.",
        },
        {
          title: "Expecting the same word",
          body:
            "The label often renames the idea: \"this phenomenon\" can follow a sentence that never uses the word phenomenon. Match the meaning, not the word.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscesrli-linkers",
      name: "Linking words",
      intuition:
        "A linking word says how a sentence relates to the one before: however turns against it, therefore and as a result draw its result, also and additionally add to it, for example illustrates it, and indeed strengthens it. Each needs the right kind of sentence just before.",
      definition:
        "- **Contrast:** however, but, on the contrary, whereas: an opposing point comes just before.\n" +
        "- **Result:** therefore, as a result, consequently, for this reason: the cause comes just before.\n" +
        "- **Addition:** also, additionally, furthermore, moreover: a first point of the same kind comes before.\n" +
        "- **Example:** for example, for instance: follows the general claim it illustrates.\n" +
        "- **Emphasis:** indeed, in fact: strengthens the sentence before.\n" +
        "- A sentence that starts with any of these cannot open the paragraph.",
      authoredExample: {
        prompt:
          "Arrange the sentences: A. However, the equipment costs more than digging simple channels. B. Drip irrigation carries water straight to the roots of plants. C. As a result, it uses far less water than flooding a field. D. For this reason, some state governments pay part of the cost. (a) BCAD (b) BACD (c) CBAD (d) BDCA",
        steps: [
          "B names the method and has no linker, so it opens.",
          "C's \"As a result\" draws on B: water goes straight to the roots, so less is used.",
          "A's \"However\" turns from that benefit to the cost, and D's \"For this reason\" answers the cost: BCAD.",
        ],
        answer: "(a) BCAD",
      },
      selfCheckExample: {
        prompt:
          "Arrange the sentences: A. For example, a bat can find a moth in total darkness from the echo of its call. B. Some animals find their way by sound rather than sight. C. Therefore, these animals can hunt at night when their prey cannot see them. D. They make high calls and listen for the echoes. (a) BDAC (b) BCDA (c) DBAC (d) ADBC",
        steps: [
          "B is the general claim, so it opens; D explains how (\"They make high calls\").",
          "A's \"For example\" illustrates D with the bat.",
          "C draws the result with \"Therefore\" and closes: BDAC.",
        ],
        answer: "(a) BDAC",
      },
      practiceSet: [
        { prompt: "A sentence begins with \"Consequently\". What must the sentence before it give?", answer: "The cause of what it states." },
        { prompt: "Which of these shows a contrast: furthermore or however?", answer: "However" },
        { prompt: "Can a sentence that begins \"For example\" come before the claim it illustrates?", answer: "No" },
        { prompt: "Name two linkers that add a point of the same kind.", answer: "Also and additionally (furthermore and moreover too)." },
      ],
      pyqExampleId: "114a1c55-5ae7-46a6-b624-a0ab70a9181d",
      traps: [
        {
          title: "Joining the linker to the wrong sentence",
          body:
            "\"As a result\" needs its cause in the sentence directly before, not two sentences back. Read the pair aloud: the result must follow from that one sentence.",
        },
        {
          title: "Reading past 'also'",
          body:
            "\"Also\" means a first point of the same kind has been made. The sentence with \"also\" cannot come before that first point.",
        },
      ],
    },
  ],
};
