import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_WD_SINGLE_NOTE: SubtopicNote = {
  subtopicName: "Word Meaning: Single Words",
  title: "Single-word meanings: read the word, then test the meaning",
  oneLineDefinition:
    "A single hard word with four suggested meanings. Break the word into its parts, build a rough meaning, then test each option against it.",
  whyItMatters:
    "Recent CDS papers give a block of single words, each with four meanings to choose from, or two meanings to judge as true or false. " +
    "Most of these words can be read from their parts. The rest are words for people and conduct, or for documents, law and ideas, and they are learnt as lists.",
  concepts: [
    // C1 — roots and affixes
    {
      kind: "formula" as const,
      slug: "cdsenwd-roots",
      name: "Read a word from its root and affixes",
      intuition:
        "Many hard English words are built from Latin or Greek parts. If you know the parts, you can read the word even if you have never seen it. " +
        "But some words only look like a word you know. Those are false friends, and the examiner builds wrong options from them.",
      definition:
        "The terms:\n" +
        "- **Root**: the part that carries the core meaning (derm = skin, vitis = vine, ergon = work).\n" +
        "- **Prefix**: a part added in front (sub- = under, ex- = out, de- = remove).\n" +
        "- **Suffix**: a part added at the end (-ology = study of, -culture = growing, -clast = breaker).\n" +
        "- **Affix**: a prefix or a suffix.\n" +
        "- **False friend**: a word that looks built from a familiar word but is not (deleterious has nothing to do with delete).\n" +
        "The method:\n" +
        "- Split the word into prefix, root and suffix.\n" +
        "- Give each part its meaning, then join them into a rough meaning.\n" +
        "- Pick the option that matches the rough meaning. Strike options that only echo the sound of the word.\n" +
        "- If the parts lead nowhere, suspect a false friend and fall back on meaning you have learnt.\n" +
        "Words tested this way:\n" +
        "- **Gastronomy** (2024 I): gastro (stomach) + -nomy (rules). The art and science of fine food and eating.\n" +
        "- **Expatriate** (2024 I): ex (out of) + patria (fatherland). A person living outside his country of citizenship.\n" +
        "- **Incommunicado** (2024 I): in (not) + communicate. Not able or not willing to communicate.\n" +
        "- **Pachyderm** (2026 I): pachy (thick) + derm (skin). A thick-skinned mammal such as an elephant.\n" +
        "- **Ubiquitous** (2026 I): ubique (everywhere). Present everywhere.\n" +
        "- **Holistic** (2026 I): holos (whole). Dealing with the whole system, not the separate parts.\n" +
        "- **Iconoclast** (2026 I): icon (image) + -clast (breaker). A person who rejects accepted beliefs and traditions.\n" +
        "- **Ergonomics** (2026 II): ergon (work) + -nomics (rules). The study of human efficiency at work.\n" +
        "- **Viticulture** (2026 II): vitis (vine) + culture (growing). The growing of grapevines.\n" +
        "- **Sub judice** (2026 II): sub (under) + judex (judge). A matter still under the court's consideration.\n" +
        "- **Deleterious** (2026 I): causing harm or damage. A false friend of delete.\n" +
        "- **Desiccate** (2026 I): de (remove) + siccus (dry). To dry out completely.",
      authoredExample: {
        prompt:
          "Choose the most appropriate meaning of **Chronometer**. (a) a list of events in order of time (b) an instrument that measures time very accurately (c) a long-lasting illness (d) the study of old coins",
        steps: [
          "Split the word: chrono + meter.",
          "chrono = time (as in chronology); meter = measure (as in thermometer).",
          "Rough meaning: something that measures time.",
          "(a) is a chronology and (c) is chronic: both only share the chrono sound. (d) has no time in it.",
          "Only (b) is an instrument that measures time.",
        ],
        answer: "(b) an instrument that measures time very accurately.",
      },
      selfCheckExample: {
        prompt:
          "Choose the most appropriate meaning of **Subterranean**. (a) lying under the surface of the earth (b) moving across the sea (c) below the standard expected (d) related to a hot climate",
        steps: [
          "Split the word: sub + terra + -nean.",
          "sub = under; terra = earth or land (as in territory).",
          "Rough meaning: under the earth.",
          "(c) uses only the 'sub = below' part and drops the root. (b) and (d) have no earth in them.",
        ],
        answer: "(a) lying under the surface of the earth.",
      },
      practiceSet: [
        { prompt: "Malediction: a blessing, or a curse?", answer: "A curse", method: "male = badly + diction = saying: speaking evil of someone" },
        { prompt: "Omnipotent: having unlimited power, or present in every place?", answer: "Having unlimited power", method: "omni = all + potent = powerful. Present everywhere is omnipresent." },
        { prompt: "Insomnia: too much sleep, or inability to sleep?", answer: "Inability to sleep", method: "in = not + somnus = sleep" },
        { prompt: "Dehydrate: to add water, or to remove water?", answer: "To remove water", method: "de = remove + hydra = water" },
      ],
      pyqExampleId: "4dc40b6e-e00f-413a-9ee6-9ea1fdab01d9",
      traps: [
        {
          title: "A false friend looks built from a word you know",
          body:
            "**Deleterious** is not 'effecting a deletion'. It means harmful. When an option simply turns the familiar look-alike into a meaning, treat it as a decoy and check the word on its own.",
        },
        {
          title: "Science words have look-alike units",
          body:
            "**Ergonomics** is the study of efficiency at work, from ergon = work. The option 'a non-SI unit of energy' is the **erg**, a different word. A shared opening does not make a shared meaning.",
        },
        {
          title: "Part of the meaning is not the meaning",
          body:
            "An **iconoclast** rejects accepted beliefs and traditions in general. 'A person who criticises a cultural icon' uses only the icon part and is too narrow. Prefer the option that covers the whole word.",
        },
      ],
    },

    // C2 — two meanings, judged one at a time
    {
      kind: "formula" as const,
      slug: "cdsenwd-two-meanings",
      name: "Two suggested meanings: judge each one on its own",
      intuition:
        "Here the word comes with two suggested meanings, and you choose 1 only, 2 only, both or neither. " +
        "Do not compare the two meanings with each other. Judge statement 1 alone, then statement 2 alone. Many words really do have two meanings, and sometimes both statements are traps.",
      definition:
        "The method:\n" +
        "- Write the meaning you know for the word before reading the statements.\n" +
        "- Judge statement 1 alone: true or false?\n" +
        "- Judge statement 2 alone: true or false?\n" +
        "- Map the result: true-false = 1 only; false-true = 2 only; true-true = both; false-false = neither.\n" +
        "- A statement that is too weak or too narrow is false (to deify someone is to treat him as a god, not just to respect him highly).\n" +
        "Words tested in this format (2024 II):\n" +
        "- **Anarchism**: absence of government; also the chaos that follows.\n" +
        "- **Pristine**: in its original, unspoilt condition.\n" +
        "- **Enormity**: great seriousness; also a very wicked crime.\n" +
        "- **Quotidian**: daily, ordinary. Nothing to do with quoting.\n" +
        "- **Immolate**: to kill by burning; also to kill as a sacrifice.\n" +
        "- **Minimise**: to reduce to the smallest degree; also to reduce costs or any activity.\n" +
        "- **Deify**: to worship or treat as a god.\n" +
        "- **Raconteur**: a person who tells stories in an interesting way.\n" +
        "- **Emasculate**: to make weaker. Nothing to do with muscle.\n" +
        "- **Perturbation**: mental anxiety; also, in science, a change in a moving body caused by an outside force.",
      authoredExample: {
        prompt:
          "**Cleave** — 1. To split something apart. 2. To stick closely to something or someone. Which of the meanings is/are correct? (a) 1 only (b) 2 only (c) Both 1 and 2 (d) Neither 1 nor 2",
        steps: [
          "Meaning you know: to cleave wood is to split it, as with a meat cleaver.",
          "Statement 1 alone: to split apart. True.",
          "Statement 2 alone: 'a child cleaves to its mother' means it clings to her. This sense is real too. True.",
          "Do not reject statement 2 because it is the opposite of statement 1. Some words carry two opposite senses.",
          "True-true maps to both.",
        ],
        answer: "(c) Both 1 and 2.",
      },
      selfCheckExample: {
        prompt:
          "**Officious** — 1. Having official authority. 2. Too eager to give advice or orders that are not wanted. Which of the meanings is/are correct? (a) 1 only (b) 2 only (c) Both 1 and 2 (d) Neither 1 nor 2",
        steps: [
          "Statement 1 alone: officious looks like official, but it does not mean having authority. False.",
          "Statement 2 alone: an officious clerk pushes his advice on you. True.",
          "False-true maps to 2 only.",
        ],
        answer: "(b) 2 only.",
      },
      practiceSet: [
        { prompt: "Restive — 1. calm and restful 2. unable to keep still. Which is/are correct?", answer: "2 only", method: "restive looks like rest but means restless" },
        { prompt: "Enervate — 1. to fill with energy 2. to give someone nerve. Which is/are correct?", answer: "Neither", method: "enervate means to weaken; both statements are built on the look-alike" },
        { prompt: "Inflammable — 1. easily set on fire 2. not able to burn. Which is/are correct?", answer: "1 only", method: "in- here does not mean not; inflammable = flammable" },
        { prompt: "Nauseous — 1. feeling sick 2. causing disgust. Which is/are correct?", answer: "Both", method: "both senses are in standard use" },
      ],
      pyqExampleId: "81afe9bc-5cd0-4782-b907-13c1e734eef2",
      traps: [
        {
          title: "Too weak is false",
          body:
            "To **deify** someone is to worship him as a god. 'To treat someone in high office with great reverence' is close but weaker, so it is false. A statement must carry the full force of the word.",
        },
        {
          title: "A real second meaning is not a trick",
          body:
            "**Perturbation** means anxiety, and in physics it also means a change in a moving body caused by an outside force. Students strike the unfamiliar sense and lose the mark. Ask whether the sense exists, not whether you use it.",
        },
        {
          title: "Neither is a real answer",
          body:
            "When both statements are built on a look-alike, both are false. **Emasculate** is offered as 'make strong' and 'increase musculature', and both come from the sound of muscle. It means to weaken.",
        },
      ],
    },

    // C3 — people, manner and conduct
    {
      kind: "reference" as const,
      slug: "cdsenwd-people",
      name: "Words for people, manner and conduct",
      intuition:
        "These words describe how a person behaves or what a person is called. Their parts do not help much, so learn them with a short memory hook. " +
        "The wrong options are usually a nearby quality: arrogance for confidence, indulgence for laziness.",
      definition:
        "How to handle them:\n" +
        "- Learn each word with one **hook** (a root, a picture or a look-alike to avoid).\n" +
        "- In the question, first decide if the word is **positive or negative**. Strike options with the wrong charge.\n" +
        "- Between two options with the same charge, choose the exact one, not the one that only sounds close.",
      table: {
        columns: ["Word", "Meaning", "Memory hook", "Sitting"],
        rows: [
          { cells: ["Aplomb", "Self-confidence and calm, especially under pressure", "French à plomb: upright as a plumb line. Calm, not proud.", "2024 (I)"] },
          { cells: ["Obsequious", "Too eager to please or obey someone important", "Latin obsequi = to comply. A servant who agrees with everything.", "2026 (I)"] },
          { cells: ["Equivocate", "To use vague language to hide the truth", "equi (equal) + voc (voice): speaking with two voices at once.", "2026 (I)"] },
          { cells: ["Indolent", "Lazy, avoiding effort", "Not indulgent. An indolent student skips practice.", "2026 (I)"] },
          { cells: ["Sobriquet", "An assumed name, a nickname", "Like a pen name or a call sign.", "2026 (II)"] },
        ],
        caption: "Decide the charge first: obsequious, equivocate and indolent are all negative; aplomb is positive.",
      },
      pyqExampleId: "c60e1551-1036-4956-93be-75eb46ce4d30",
      selfCheckExample: {
        prompt:
          "A spokesman is asked if the bridge was built with poor cement. He talks about 'many factors' and 'ongoing reviews' and never says yes or no. Which word from the table describes what he is doing?",
        steps: [
          "He is not lazy, so not indolent.",
          "He is not showing calm confidence, so not aplomb.",
          "He uses vague words so that he never has to state the truth.",
        ],
        answer: "He equivocates.",
      },
      practiceSet: [
        { prompt: "A cadet nicknamed 'Tiger' by his course mates. 'Tiger' is his ___.", answer: "Sobriquet" },
        { prompt: "Indolent means (a) indulgent (b) lazy?", answer: "(b) lazy" },
        { prompt: "She gave the speech with aplomb. Did she speak with arrogance or with calm confidence?", answer: "With calm confidence" },
        { prompt: "Spot the wrong row: 'Equivocate = to give equal weight to both sides'.", answer: "Wrong. Equivocate = to use vague language to hide the truth.", method: "the equi- part is a trap" },
      ],
      traps: [
        {
          title: "Confidence is not arrogance",
          body:
            "**Aplomb** is calm self-confidence. Pride and arrogance are negative cousins. If the sentence praises the person, the negative option cannot be right.",
        },
        {
          title: "Equi- does not mean fair here",
          body:
            "**Equivocate** is not 'to give equal weight to both arguments'. It means to speak vaguely on purpose. The equal part is a decoy built into the options.",
        },
        {
          title: "Sound-alike options",
          body:
            "**Indolent** is offered next to 'indulgent'. They share letters, not meaning. Indolent = lazy; indulgent = allowing too much pleasure.",
        },
      ],
    },

    // C4 — documents, law and ideas
    {
      kind: "reference" as const,
      slug: "cdsenwd-documents",
      name: "Words for documents, law and ideas",
      intuition:
        "This group names a document, a legal idea or an idea in language. The wrong options are usually a neighbour from the same world: an order instead of a statement, a witness instead of an alibi. " +
        "Learn each word with the neighbour it is confused with.",
      definition:
        "How to handle them:\n" +
        "- Ask what **kind of thing** the word names: a document, a punishment, a principle, a meaning.\n" +
        "- Strike options that name a different kind of thing, even if they come from the same field.\n" +
        "- **Connotation** is the suggested meaning of a word; **denotation** is its literal meaning.",
      table: {
        columns: ["Word", "Meaning", "Not to be confused with", "Sitting"],
        rows: [
          { cells: ["Codex", "An ancient manuscript in book form", "Code or a code-breaking algorithm", "2026 (II)"] },
          { cells: ["Communiqué", "An official announcement or statement", "An official order", "2026 (II)"] },
          { cells: ["Manifesto", "A written statement of the policies and aims of a person or group", "A transcript of a speech, or a law", "2026 (II)"] },
          { cells: ["Alibi", "Proof of having been somewhere else when a crime took place", "A witness who speaks for the accused", "2026 (II)"] },
          { cells: ["Condign", "(Of punishment) fitting the wrong that was done", "Condiment, or confined", "2024 (I)"] },
          { cells: ["Axiom", "A principle that most people accept as true", "A rule of behaviour, or equality", "2026 (I)"] },
          { cells: ["Connotation", "The suggested meaning beyond the literal one", "Denotation, the literal meaning", "2026 (II)"] },
          { cells: ["Tapestry", "A heavy decorative cloth woven with pictures, hung on a wall", "A painting on fabric", "2026 (II)"] },
        ],
        caption: "Each wrong option names a real thing from the same field. Match the kind of thing first.",
      },
      pyqExampleId: "79affa5e-34da-4b36-9a72-9b01500df7c0",
      selfCheckExample: {
        prompt:
          "'Mother' literally means a female parent. It also suggests care, warmth and sacrifice. Is the idea of care and sacrifice the connotation or the denotation of 'mother'?",
        steps: [
          "The literal, dictionary meaning is the denotation: a female parent.",
          "The feelings and ideas the word suggests are the connotation.",
        ],
        answer: "The connotation.",
      },
      practiceSet: [
        { prompt: "The accused proved he was in Pune when the theft took place in Delhi. He has an ___.", answer: "Alibi" },
        { prompt: "A punishment that exactly fits the crime is ___ punishment.", answer: "Condign" },
        { prompt: "An old handwritten book with pages, not a scroll, is a ___.", answer: "Codex" },
        { prompt: "'The whole is greater than its part' is accepted by all as true. It is an ___.", answer: "Axiom" },
      ],
      traps: [
        {
          title: "An alibi is proof, not an excuse or a witness",
          body:
            "In daily speech people say 'alibi' for any excuse. In the test it means **proof of being elsewhere** at the time of the crime. 'A witness who speaks for the defendant' is a decoy from the same courtroom.",
        },
        {
          title: "Connotation and denotation swapped",
          body:
            "The option 'the literal or primary meaning of a word' describes **denotation**. Connotation is the opposite: what the word suggests beyond its literal meaning.",
        },
        {
          title: "Codex is not about codes",
          body:
            "A **codex** is an ancient manuscript bound as a book. 'An algorithm for cracking codes' is built only on the sound of the word.",
        },
      ],
    },
  ],
};
