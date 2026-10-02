import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCB_MAIN_IDEA_NOTE: SubtopicNote = {
  subtopicName: "Main Idea, Author's View and Tone",
  title: "The whole passage: main idea, view, purpose and tone",
  oneLineDefinition:
    "These questions ask about the passage as a whole: what it is about, what the writer thinks, why a detail is there, and how the writer sounds.",
  whyItMatters:
    "Questions on the whole passage come in many forms: a title, the central theme, what the writer believes or advises, why an example is used, and the tone. " +
    "They are answered from the opening and closing lines and from the writer's own judgement words, not from one vivid detail. That vivid detail is where most wrong options come from.",
  concepts: [
    // C1 — the main-idea test
    {
      kind: "formula" as const,
      slug: "cdsenrcb-main-idea-test",
      name: "The main-idea test: it covers the whole passage",
      intuition:
        "The main idea covers the whole passage. An example, a detail or one paragraph is too narrow. A big statement about the whole world is too broad. " +
        "The answer sits between the two: it names the one point every part of the passage serves.",
      definition:
        "The terms:\n" +
        "- **Main idea / central theme**: the one point every part of the passage serves.\n" +
        "- **Too narrow**: covers one example, one detail or one paragraph.\n" +
        "- **Too broad**: covers far more than the passage discusses.\n" +
        "The method:\n" +
        "- Read the first and last sentences again. They usually frame the point.\n" +
        "- Name the topic in a few words before you look at the options.\n" +
        "- Test each option: does every paragraph serve it? Does the passage really discuss all of it?\n" +
        "- Examples are not the theme. If the writer uses animals, a story or a person to make a point, the point is the theme.\n" +
        "- For a title: when the passage weighs both sides, a neutral title (the impact of X) beats a one-sided one (the advantages of X).\n" +
        "- For 'the writer is arguing for': choose the step the passage leads to, at its own strength (rethink, not stop completely).\n" +
        "- For 'the passage traces': the answer covers the whole journey, from the first stage to the last.",
      authoredExample: {
        prompt:
          "'Our grandparents walked to school, ate food grown nearby and spent their evenings outdoors. Today children ride in buses, eat packaged snacks and spend their evenings at screens. Doctors now see more young patients with weak bones and poor eyesight. The way children live has changed, and their health has changed with it.' The best title is (a) Packaged Snacks (b) School Buses (c) How Changing Habits Affect Children's Health (d) The History of Medicine",
        steps: [
          "First and last lines: how children lived then and now, and the health result.",
          "In a few words: changed lifestyle, changed health.",
          "(a) and (b) are single details: too narrow.",
          "(d) is far wider than the passage: too broad.",
          "(c) covers every sentence.",
        ],
        answer: "(c) How Changing Habits Affect Children's Health",
      },
      selfCheckExample: {
        prompt:
          "'Tea plants first grew wild in the hills of south-west China. Monks carried tea to Japan, and Dutch traders brought it to Europe in the seventeenth century. Later the British planted it in Assam.' The passage traces (a) the arrival of tea in Japan (b) the spread of tea from China to other lands (c) tea gardens in Assam (d) the Dutch spice trade",
        steps: [
          "The passage moves from China to Japan, Europe and India.",
          "(a) and (c) are single stages: too narrow.",
          "(d) is not in the passage.",
          "(b) covers the whole journey.",
        ],
        answer: "(b) the spread of tea from China to other lands",
      },
      practiceSet: [
        { prompt: "A passage on careful saving uses one paragraph to tell of a man who lost his money. Option: 'A man who lost his money'. Main idea?", answer: "No: too narrow. It is an example, not the theme." },
        { prompt: "A passage on one village's dried-up well. Option: 'The water problems of the world'. Main idea?", answer: "No: too broad." },
        { prompt: "A passage weighs the good and the harm of the internet. Better title: 'Advantages of the Internet' or 'The Internet and Its Effects'?", answer: "The Internet and Its Effects", method: "A one-sided title fits only a one-sided passage." },
        { prompt: "Where do you look first for the main idea?", answer: "the first and last sentences" },
      ],
      pyqExampleId: "fd5a21c5-c453-49e5-a4b7-486ae28d7899", // 2021 (II) Q15 — central theme of a short essay
      traps: [
        {
          title: "Choosing the vivid example",
          body:
            "Writers make a point with a story, a person or an animal. The example is what you remember, so an option that names it tempts. Ask what the example was there to prove.",
        },
        {
          title: "A verb stronger than the writer",
          body:
            "A writer who questions the record of a practice is arguing for a rethink, not for stopping it completely. Match the strength of the action to the strength of the passage.",
        },
      ],
    },

    // C2 — the author's view and advice
    {
      kind: "formula" as const,
      slug: "cdsenrcb-author-view",
      name: "The author's view and advice",
      intuition:
        "Here you are asked what the writer thinks, or what the writer wants people to do. Look for judgement words: should, must, I believe, the real aim, folly. " +
        "Writers often weigh things: some good, more harm. The answer matches that weighing exactly.",
      definition:
        "The terms:\n" +
        "- **Author's view**: the writer's own judgement, not a view the writer reports in order to reject it.\n" +
        "- **Advocate**: argue in favour of; recommend.\n" +
        "- **Mixed verdict**: the writer grants some good and some harm, then leans one way.\n" +
        "The method:\n" +
        "- Find judgement words: should, must, ought, I believe, I doubt, the real, mere, folly, I have always opposed.\n" +
        "- Separate the writer's voice from other voices: 'some say', 'it is argued', 'many believe'.\n" +
        "- Match the strength. If the writer grants a benefit and still condemns, the answer is not 'wholly bad'.\n" +
        "- Cut absolute options (absolute, entirely, always, never) unless the writer is absolute.\n" +
        "- For 'people should': pick the step the writer's argument leads to. It is often a balance.",
      authoredExample: {
        prompt:
          "'Mobile phones have brought villages closer to markets, banks and doctors. Yet the same phones keep students awake at night and away from books. Used with limits, they help; used without limits, they harm.' In the author's opinion, mobile phones are (a) wholly harmful (b) wholly useful (c) useful only when used with limits (d) useful only to villagers",
        steps: [
          "Judgement lines: they help villages, they harm students, and the last line weighs the two.",
          "The writer's verdict is in the last sentence: help with limits, harm without.",
          "(a) and (b) are absolute; the writer is not.",
          "(d) takes one example as the whole verdict.",
        ],
        answer: "(c) useful only when used with limits",
      },
      selfCheckExample: {
        prompt:
          "'Some say a soldier should obey without thinking. I disagree. A soldier who understands why an order is given carries it out better, and knows what to do when plans change.' The author believes a soldier should (a) obey without thinking (b) understand the purpose of his orders (c) question every order (d) follow only orders he likes",
        steps: [
          "'Some say' marks a view the writer reports; 'I disagree' rejects it. So (a) is not the author's view.",
          "The writer's view: understanding why an order is given makes a better soldier.",
          "(c) and (d) go further than the writer.",
        ],
        answer: "(b) understand the purpose of his orders",
      },
      practiceSet: [
        { prompt: "'Some argue that X. This view, however, ignores Y.' Is X the author's view?", answer: "No. The author reports X in order to reject it." },
        { prompt: "'Television can teach, but most of what we watch is noise.' Is the writer wholly against television?", answer: "No. The writer grants it can teach, but leans critical." },
        { prompt: "'The new policy was mere show.' Which word carries the writer's judgement?", answer: "mere", method: "It means the policy had no real substance." },
        { prompt: "'Each regiment may keep its own customs and still learn from the others.' What does the writer advise?", answer: "Keep your own ways and respect, and learn from, other ways." },
      ],
      pyqExampleId: "4fcbd61e-d465-42f8-9027-43c34278d136", // 2018 (I) Q63 — the author's verdict on industrialization
      traps: [
        {
          title: "A reported view taken as the author's",
          body:
            "Lines that start 'some say', 'it is often argued' or 'many believe' report other people. If the next line says 'but' or 'I disagree', the reported view is the opposite of the answer.",
        },
        {
          title: "Absolute options",
          body:
            "Wholly good, wholly bad, entirely useless: writers in exam passages rarely speak this way. If the writer grants anything on the other side, cut the absolute option.",
        },
      ],
    },

    // C3 — why a detail is there: example, irony, source, device
    {
      kind: "formula" as const,
      slug: "cdsenrcb-why-mentioned",
      name: "Why the author mentions it: example, irony, device",
      intuition:
        "Every detail has a job. A story, a person or a quotation is usually there to prove or show a point made just before or after it. " +
        "Some questions name the job directly: what the irony is, what kind of source is cited, what literary device is used.",
      definition:
        "The terms:\n" +
        "- **Purpose of a detail**: the point it supports. Look at the claim just before it.\n" +
        "- **Irony**: the outcome is the opposite of what is expected, or a thing ends up feeding the very cause that produced it.\n" +
        "- **Source**: where the writer's evidence comes from: a novel or poem (literary), old records (archival), newspapers (journalistic), experiments (scientific).\n" +
        "- **Personification**: giving a human quality to a thing or an idea: 'the wind whispered'.\n" +
        "- **Symbolism**: a thing stands for an idea (a dove for peace). **Allegory**: a whole story with a hidden meaning. **Paradox**: a statement that seems to contradict itself but holds a truth.\n" +
        "The method:\n" +
        "- For 'why does the writer mention X': find the general claim X sits under. The answer restates that claim, not X itself.\n" +
        "- Cut options that say something new about X (what will happen to it, how rich it is).\n" +
        "- For irony: say what was expected and what happened. The answer names the reversal.\n" +
        "- For a device: test each definition on the quoted words.",
      authoredExample: {
        prompt:
          "'Small savings add up. My neighbour, a tailor, put aside ten rupees a day for twenty years and paid for his daughter's college without a loan.' Why does the writer mention the tailor? (a) Tailors earn well. (b) To show that small regular savings can grow large. (c) Colleges are expensive. (d) Loans are always bad.",
        steps: [
          "The claim just before the tailor: small savings add up.",
          "The tailor's story proves it: ten rupees a day became college fees.",
          "(a) and (c) say something new about the details; (d) is a claim the writer never makes.",
        ],
        answer: "(b) To show that small regular savings can grow large.",
      },
      selfCheckExample: {
        prompt:
          "'The town's fire station burned down last week. Its own fire alarm had been broken for a month.' What is the irony? (a) Fires are common in summer. (b) The building meant to fight fires was lost to fire, with its own alarm broken. (c) The town needs a new station. (d) Alarms are costly to repair.",
        steps: [
          "Expected: a fire station protects against fire, and its alarm works.",
          "What happened: it burned, and its own alarm was broken.",
          "(b) names that reversal; the others are side-points.",
        ],
        answer: "(b) The building meant to fight fires was lost to fire, with its own alarm broken.",
      },
      practiceSet: [
        { prompt: "'Time waits for no man.' Which device?", answer: "personification", method: "Time is given a human action, waiting." },
        { prompt: "A writer quotes a line from a famous novel as evidence. What kind of source?", answer: "literary" },
        { prompt: "'Less is more.' Which device?", answer: "paradox", method: "It seems to contradict itself but holds a truth." },
        { prompt: "A writer says hard work pays, then tells of a farmer who rebuilt his farm after a flood. Why the farmer?", answer: "To show that hard work pays." },
      ],
      pyqExampleId: "843fc273-433b-4bba-a9c2-2017644cf5ce", // 2017 (II) Q61 — why a person in the passage is mentioned
      traps: [
        {
          title: "Answering about the example, not the claim",
          body:
            "When a writer mentions a person, options often say something new about that person: what will happen to them, or what they could become. The question asks what the person proves. Find the claim the example sits under.",
        },
        {
          title: "Irony is not just bad luck",
          body:
            "A sad or unlucky event is not ironic by itself. Irony needs a reversal: the result is the opposite of what was expected, or the cure feeds the disease.",
        },
      ],
    },

    // C4 — tone and attitude words
    {
      kind: "reference" as const,
      slug: "cdsenrcb-tone-words",
      name: "Tone and attitude words",
      intuition:
        "Tone is how the writer sounds: the feeling behind the words. You find it from judgement words and from what the writer is doing, not from the topic. " +
        "A passage about a disaster can be calm and factual; a passage about a festival can be bitter.",
      definition:
        "The method:\n" +
        "- First ask: does the writer take a side? No side means informational, descriptive or objective. A side means critical, hopeful, and so on.\n" +
        "- Then ask: what feeling? Hope, gloom, gravity, mockery, complaint.\n" +
        "- The topic is not the tone. A sad subject does not by itself make the tone tragic or pessimistic.\n" +
        "- Cut extreme words (impassioned, querulous) unless the passage really shouts or complains.\n" +
        "- For a character in a story, use the actions and body signs the passage gives: a pounding heart and a dry mouth mean nervous.\n" +
        "- For attitude in a phrase, ask what feeling the chosen words carry.\n" +
        "The words below have all appeared in CDS tone and attitude questions, as the answer or as a wrong option.",
      table: {
        columns: ["Word", "Meaning", "Signs in the passage", "Tested as", "Sitting"],
        rows: [
          { cells: ["objective", "fair and factual, not swayed by feeling", "facts and balanced wording, no 'I feel'", "Answer, as 'objective and critical'; wrong option, as 'objective but querulous'", "2017 (II)"] },
          { cells: ["critical", "points out faults or harms", "judgement words: defect, folly, harm, misuse", "Answer; also a wrong option", "2017 (II), 2022 (I), 2023 (I)"] },
          { cells: ["querulous", "complaining, whining", "grumbling and self-pity", "Wrong option", "2017 (II)"] },
          { cells: ["impassioned", "full of strong feeling", "exclamations, emotional appeals", "Wrong option", "2017 (II)"] },
          { cells: ["argumentative", "quarrelsome; arguing for its own sake", "attacks on other people's views", "Wrong option", "2017 (II)"] },
          { cells: ["descriptive", "paints a scene or says how something looks", "sense details, little or no judgement", "Wrong option", "2017 (II), 2023 (I)"] },
          { cells: ["sombre", "grave and serious", "a heavy problem discussed with weight, no lightness", "Answer", "2018 (I)"] },
          { cells: ["humorous", "funny", "jokes, comic exaggeration", "Wrong option", "2018 (I)"] },
          { cells: ["didactic", "preaching; teaching a moral lesson", "'we must', 'one ought to', a lesson for the reader", "Wrong option", "2018 (I)"] },
          { cells: ["tragic", "about great suffering, usually a story of loss or death", "a downfall or a death told as a story", "Wrong option", "2018 (I)"] },
          { cells: ["optimism", "hope that things will get better", "recovering, improving, a positive outlook", "Answer", "2021 (II)"] },
          { cells: ["pessimism", "expecting the worst", "decline, gloom, nothing will work", "Wrong option", "2021 (II)"] },
          { cells: ["fatalism", "belief that events are fixed and cannot be changed", "fate, 'it was bound to happen'", "Wrong option", "2021 (II)"] },
          { cells: ["defeatism", "giving up before trying", "'there is no point', surrender", "Wrong option", "2021 (II)"] },
          { cells: ["informational", "gives facts and explains, takes no side", "definitions, how something works", "Answer; also a wrong option", "2022 (I), 2023 (I)"] },
          { cells: ["satirical", "mocks something to criticise it", "praise that is really a jab, mock-serious wording", "Wrong option", "2022 (I)"] },
          { cells: ["analytical", "breaks a problem into parts and examines each", "causes, effects, first and second points", "Wrong option", "2022 (I)"] },
          { cells: ["demonstrative", "showing feelings openly", "open displays of emotion", "Wrong option", "2023 (I)"] },
          { cells: ["nervous", "anxious and uneasy", "pounding heart, dry mouth, frozen in place", "Answer, for a character", "2017 (I)"] },
          { cells: ["cautious", "careful to avoid risk", "checking, waiting, moving slowly on purpose", "Wrong option, for a character", "2017 (I)"] },
          { cells: ["imaginative", "full of new ideas and pictures", "fancies and inventions", "Wrong option, for a character", "2017 (I)"] },
          { cells: ["observant", "quick to notice things", "small details noticed and named", "Wrong option, for a character", "2017 (I)"] },
          { cells: ["calm and courageous", "steady and brave", "acting steadily in danger", "Answer, for a character", "2017 (I)"] },
          { cells: ["cunning and crafty", "sly and tricky", "tricks and deceit", "Wrong option, for a character", "2017 (I)"] },
          { cells: ["noisy and dangerous", "loud and a threat to others", "shouting, harming others", "Wrong option, for a character", "2017 (I)"] },
          { cells: ["active and jumpy", "restless and easily startled", "sudden starts and fidgeting", "Wrong option, for a character", "2017 (I)"] },
          { cells: ["concrete jungle", "a crowded city of buildings that replaced fields and forests", "a phrase that shows regret for lost nature", "Attitude: regret", "2017 (I)"] },
        ],
        caption: "Decide first whether the writer takes a side, then which feeling. The topic alone never decides the tone.",
      },
      pyqExampleId: "70637589-399d-4dec-8449-c214e93cf35d", // 2018 (I) Q52 — the general tone of a short passage
      selfCheckExample: {
        prompt:
          "'Exports fell last year, but orders have risen for three months running and factories are hiring again. The worst may be behind us.' The tone is (a) pessimistic (b) hopeful (c) satirical (d) fatalistic",
        steps: [
          "The writer takes a side: things are improving.",
          "The feeling: 'the worst may be behind us' is hope.",
          "Pessimistic and fatalistic are the opposite; nothing is mocked, so not satirical.",
        ],
        answer: "(b) hopeful",
      },
      practiceSet: [
        { prompt: "Which word means 'preaching a moral lesson'?", answer: "didactic" },
        { prompt: "A passage explains, step by step, how a volcano forms, with no opinion. Tone?", answer: "informational" },
        { prompt: "Spot the wrong row: 'fatalism: belief that things will surely improve'.", answer: "Wrong. Fatalism is the belief that events are fixed and cannot be changed." },
        { prompt: "A writer praises a minister for 'bravely cutting the ribbon on his twelfth unfinished bridge'. Tone?", answer: "satirical", method: "The praise is a jab." },
      ],
      traps: [
        {
          title: "The topic is not the tone",
          body:
            "A passage about a flood or a famine can be calm and informational. 'Tragic' fits a story of suffering told as a story, not a serious discussion of a problem.",
        },
        {
          title: "Critical or informational?",
          body:
            "If the writer judges anything (a defect, a misuse, a harm), the tone is not purely informational. Informational writing explains and takes no side.",
        },
        {
          title: "Extreme words",
          body:
            "Impassioned, querulous and argumentative need a passage that shouts, complains or quarrels. A calm passage that points out harm is critical, not argumentative.",
        },
      ],
    },
  ],
};
