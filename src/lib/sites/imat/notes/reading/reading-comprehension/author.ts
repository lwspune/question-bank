import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_RDC_AUTHOR_NOTE: SubtopicNote = {
  subtopicName: "Main Point, Meaning and Tone",
  title: "The Author's Point, Words in Context and Tone",
  oneLineDefinition:
    "Some questions are about the passage as a whole: what it mainly says, what a word or image means here, and how the author feels about the subject.",
  whyItMatters:
    "The 2026 paper asked what a passage says about its subject as a whole, and the 2025 paper asked which animal a figurative text describes without naming it. Tone and word-meaning questions have not appeared yet, but they use the same reading skills and each needs only one method.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-rdc-main-point",
      name: "The author's main point and purpose",
      intuition:
        "The main point is the claim that the rest of the passage supports. Examples, dates and quotations are evidence for it, not the point itself. Wrong options are too narrow (one true example), too broad (more than the passage covers), or a view the author mentions only to reject it.",
      definition:
        "- The **main point** is the one claim most sentences serve. Look hard at the first and last sentences and at signals such as 'yet', 'in short', 'the point is', 'but'.\n" +
        "- **Too narrow**: an option that states one example or detail, even correctly.\n" +
        "- **Too broad**: an option that claims more than the passage covers (all of history, every country, every case).\n" +
        "- **Purpose** asks what the author is doing: to explain, to argue, to warn, to compare, to describe, to criticise. Many cases from many centuries, all making the same point, usually serve to show that something is old, not new.\n" +
        "- **Test a candidate**: if the author read it, would they say 'yes, that is what I set out to show'?",
      authoredExample: {
        prompt:
          "We often speak of quarantine as a modern public-health tool, yet the idea is old. In the fourteenth century, the port of Ragusa, now Dubrovnik, required ships arriving from plague-affected areas to wait before landing, and the wait was later fixed at forty days, which gave us the word 'quarantine', from the Italian for forty. Even earlier, people with leprosy had been kept apart from towns. Methods have changed, and modern quarantine relies on knowing how a disease spreads and how long it takes to appear. But the basic idea of separating those who might be ill, to protect those who are not, is centuries old.\n\n" +
          "Which of the following best expresses the main point of the text?\n" +
          "(A) Ragusa was the first city to protect itself from the plague.\n" +
          "(B) Separating people who may be ill is an old idea, though its methods have changed.\n" +
          "(C) Modern quarantine is no more effective than medieval quarantine.\n" +
          "(D) The word 'quarantine' comes from the Italian for forty.\n" +
          "(E) Every society in history has used quarantine.",
        steps: [
          "First sentence: the idea 'is old'. Last sentence: the basic idea 'is centuries old'. The middle gives examples (Ragusa, leprosy) and one contrast (modern methods). The point: an old idea, with new methods. B.",
          "D is true and stated, but it is one detail inside one example: too narrow.",
          "A adds 'first', which the text never claims. E is too broad: the text gives two examples, not every society.",
          "C compares effectiveness, which the passage never does.",
        ],
        answer: "(B) Separating people who may be ill is an old idea, though its methods have changed.",
      },
      selfCheckExample: {
        prompt:
          "In many drug trials, patients who receive a sugar pill report real improvements, especially in pain, nausea and tiredness. This placebo effect is not simply imagination: brain scans show that expecting relief can release the body's own pain-relieving chemicals. It is weaker for conditions that can be measured objectively, such as the size of a tumour. For this reason, a new drug is compared not with no treatment but with a placebo: only if it does better than the sugar pill can we say that the drug itself works.\n\n" +
          "What is the main purpose of the text?",
        options: [
          "To explain what the placebo effect is and why drug trials must allow for it.",
          "To argue that sugar pills should replace painkillers.",
          "To show that the placebo effect is imaginary.",
          "To list the diseases that placebos can cure.",
          "To warn patients that sugar pills are dangerous.",
        ],
        steps: [
          "The passage defines the effect (sentence 1), explains how it works (2), gives a limit (3), and draws the consequence for trials (4). That is explaining, ending in a reason for how trials are designed. A.",
          "B and E take a position the text never takes. C contradicts 'not simply imagination'.",
          "D: the text names symptoms that improve, not diseases that are cured, and lists them only as an example.",
        ],
        answer: "(A) To explain what the placebo effect is and why drug trials must allow for it.",
      },
      practiceSet: [
        {
          prompt: "A passage gives three examples of ancient water clocks to argue that people have always measured time. Is 'The Egyptians used water clocks' the main point?",
          answer: "No: it is one example supporting the main point.",
        },
        {
          prompt: "Name the two commonest kinds of wrong option in a main-point question.",
          answer: "Too narrow (one detail) and too broad (more than the passage covers).",
        },
        {
          prompt: "A text describes a problem and ends: 'unless we act now, the damage will be permanent.' What is its likely purpose?",
          answer: "To warn, and to urge action.",
        },
      ],
      traps: [
        {
          title: "A true detail is not the main point",
          body: "Main-point questions usually include an option that the passage states almost word for word but that is only one example. It is true, and still the wrong answer, because the passage was not written to say it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-word-context",
      name: "Meaning of a word or phrase in context, and figurative texts",
      intuition:
        "Many words have several meanings, and the passage selects one. Put each option in place of the word and reread the sentence: the right meaning keeps the sense and fits the sentences around it. Figurative texts (fables, allegories, metaphors) describe something without naming it; the details and any familiar saying they echo are the clues.",
      definition:
        "- **Substitute**: put each option in place of the word and reread the whole sentence and the one before it.\n" +
        "- The **commonest meaning** is often a trap. In 'a sharp rise in prices', sharp means sudden and large, not able to cut.\n" +
        "- **Signals**: 'unlike', 'but', 'whereas' set the word against its opposite; 'such as', 'for example' illustrate it; 'so' and 'because' show its result or reason.\n" +
        "- **Idioms** mean more than their words: 'to break the ice' is to end an awkward silence, not to smash anything.\n" +
        "- **Figurative texts**: ask what the described thing stands for. Collect the details (what it does, how it behaves) and match them to what they point to, including well-known sayings, such as 'a wolf in sheep's clothing' for someone dangerous who looks harmless.",
      authoredExample: {
        prompt:
          "Charles Darwin had worked out the main lines of his theory of natural selection by the early 1840s, yet he published it only in 1859. Historians have offered several explanations for the delay: he wanted to gather an overwhelming body of evidence, he feared the reaction of the religious establishment, and he was often ill. What finally \\(\\underline{\\text{forced his hand}}\\) was a letter from the young naturalist Alfred Russel Wallace, who had reached almost the same theory independently. Darwin's long silence, once read as timidity, is now often seen as the patience of a scientist who knew his idea would be attacked.\n\n" +
          "In the text, the underlined phrase means:\n" +
          "(A) injured him physically\n" +
          "(B) made him act sooner than he had planned\n" +
          "(C) made him write by hand rather than print\n" +
          "(D) persuaded him to change his theory\n" +
          "(E) made him share the credit with Wallace",
        steps: [
          "Context: a long delay, then 'what finally forced his hand' was a letter showing that someone else had the same theory. The letter ends the delay.",
          "Substitute B: 'What finally made him act sooner than he had planned was a letter ...'. It fits the delay and the word 'finally'.",
          "A and C take 'hand' literally. D contradicts the passage: Wallace had 'almost the same theory', so there was nothing to change.",
          "E may be true historically, but it is not what the phrase means, and the text says nothing about credit.",
        ],
        answer: "(B) made him act sooner than he had planned",
      },
      selfCheckExample: {
        prompt:
          "There is a bird that never builds a nest of its own. It waits until another bird leaves its nest for a moment, lays a single egg among the others, and flies away. The chick hatches early, pushes the other eggs out, and is fed by its foster parents, who work themselves thin for a stranger many times their size. So it is with the man who lets others labour for him and takes the reward as if it were his own.\n\n" +
          "Which bird is the author describing?",
        options: ["Magpie", "Swallow", "Stork", "Cuckoo", "Owl"],
        steps: [
          "Collect the details: no nest of its own, an egg laid in another bird's nest, a chick that pushes out the other eggs and is raised by smaller foster parents.",
          "That behaviour (brood parasitism) belongs to the cuckoo. D.",
          "The magpie is a tempting choice because of its reputation for stealing, but magpies build their own nests and raise their own young. The swallow and the stork build nests; nothing in the text points to the owl.",
        ],
        answer: "(D) Cuckoo",
      },
      practiceSet: [
        {
          prompt: "'The committee's report was damning.' Does 'damning' mean very critical, or religious?",
          answer: "Very critical.",
        },
        {
          prompt: "'Unlike his cautious colleagues, Rossi was rash.' What does 'rash' mean here?",
          answer: "Acting without enough thought: the opposite of cautious.",
          method: "The contrast signal 'unlike'",
        },
        {
          prompt: "What kind of person is called 'a wolf in sheep's clothing'?",
          answer: "Someone dangerous who pretends to be harmless.",
        },
      ],
      traps: [
        {
          title: "The dictionary's first meaning is often the trap",
          body: "Options in a meaning-in-context question usually include the commonest meaning of the word. If that meaning does not fit the sentence, it is wrong, however familiar it is. Substitute each option and reread.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-tone",
      name: "Tone and attitude: how the author feels about the subject",
      intuition:
        "Tone shows in word choice. A writer who 'claims' something doubts it more than one who 'shows' it; 'remarkably', 'sadly' and 'so-called' carry a judgement. Decide first whether the attitude is positive, negative or neutral, then how strong it is. Exam passages are usually measured, so extreme tone words are rarely right.",
      definition:
        "- Collect the **loaded words**: adjectives and adverbs (remarkable, alarming, naive, hardly), verbs of saying (claims, admits, insists, as against states, shows), and phrases like 'so-called'.\n" +
        "- Decide the **direction** (positive, negative, neutral) first, then the **strength** (mild or strong).\n" +
        "- Common tone words: **objective** or **neutral** (reports without judging), **critical** (finds fault), **sceptical** (doubts a claim), **admiring**, **ironic** (says the opposite of what is meant), **indignant** (angry at an injustice), **nostalgic** (longing for the past), **cautious**.\n" +
        "- **Rhetorical questions** ('Why do we accept this?') and exclamations usually signal a strong personal view.\n" +
        "- Choose the option whose **strength** matches the text: a passage that weighs evidence and adds limits is cautious, not enthusiastic.",
      authoredExample: {
        prompt:
          "Brain-training apps promise to make users sharper, faster and even younger in mind, and millions download them every year. The evidence is less exciting. Players certainly get better at the games themselves; that is hardly surprising, since practice improves almost anything. What the companies rarely mention is that large studies have found little sign that these gains carry over to memory or attention in daily life. Perhaps one day a game will be designed that does more. For now, a walk with a friend may do as much for an ageing brain, and it costs nothing.\n\n" +
          "Which word best describes the author's attitude to brain-training apps?\n" +
          "(A) enthusiastic\n" +
          "(B) sceptical\n" +
          "(C) indifferent\n" +
          "(D) furious\n" +
          "(E) nostalgic",
        steps: [
          "Loaded words: 'promise' (a claim, not a fact), 'less exciting', 'hardly surprising', 'rarely mention', 'perhaps one day'.",
          "Direction: negative about the apps' claims. Strength: mild and reasoned; the author even allows that a better game may come one day.",
          "Doubting a claim politely, on the evidence, is scepticism. B.",
          "A is the wrong direction. C is wrong because the author clearly takes a view. D is far too strong for this calm language. E has nothing to do with the past.",
        ],
        answer: "(B) sceptical",
      },
      selfCheckExample: {
        prompt:
          "Florence Nightingale is remembered as the lady with the lamp, walking the hospital wards at night. Less often remembered is that she was a remarkable statistician. After the Crimean War, she showed with carefully gathered figures that far more soldiers had died of preventable disease in the army hospitals than of their wounds, and she presented the data in clear, original diagrams that ministers could understand at a glance. Her charts helped to persuade the government to reform army sanitation. Few people have used numbers to save so many lives.\n\n" +
          "Which of the following best describes the author's attitude towards Nightingale?",
        options: [
          "Critical, because her fame is undeserved.",
          "Neutral, because the text only reports facts.",
          "Admiring, especially of her use of statistics.",
          "Ironic, because the image of the lamp is mocked.",
          "Sceptical about whether her charts had any effect.",
        ],
        steps: [
          "Loaded words: 'remarkable statistician', 'carefully gathered', 'clear, original diagrams', and the closing judgement 'Few people have used numbers to save so many lives'. Positive and fairly strong, aimed at her statistics. C.",
          "B fails because of those judgement words: a neutral text would not praise. A and D find criticism or mockery that is not there; the lamp image is mentioned to contrast with the less famous side of her work, not to mock it.",
          "E contradicts 'Her charts helped to persuade the government'.",
        ],
        answer: "(C) Admiring, especially of her use of statistics.",
      },
      practiceSet: [
        {
          prompt: "A writer calls a theory 'so-called'. What does this suggest?",
          answer: "Doubt or disapproval: the writer does not accept the name.",
        },
        {
          prompt: "'The minister claims the policy worked' or 'The minister showed the policy worked': which verb expresses doubt?",
          answer: "'Claims'.",
        },
        {
          prompt: "A text weighs evidence on both sides and ends 'the question remains open'. What is its tone?",
          answer: "Neutral or cautious: balanced.",
        },
      ],
      traps: [
        {
          title: "Extreme tone words are rarely right",
          body: "Passages chosen for an exam are usually measured. Options such as 'furious', 'contemptuous' or 'ecstatic' need equally strong language in the text. A writer who doubts a claim politely is sceptical, not hostile.",
        },
      ],
    },
  ],
};
