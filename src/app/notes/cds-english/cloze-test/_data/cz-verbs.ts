import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_CZ_VERBS_NOTE: SubtopicNote = {
  subtopicName: "Verb Forms in the Blank",
  title: "The Verb Slot: Tense, Agreement and Form",
  oneLineDefinition:
    "When the four options are forms of one verb, find the subject and the time of the passage, then look at the word just before the blank.",
  whyItMatters:
    "Verb forms are one of the largest groups of cloze blanks in CDS papers. The options often differ only in tense or form: has, have, has had, had had. " +
    "One clue settles the answer: a time phrase, the subject, or a small word such as 'to' or 'does not' right before the gap.",
  concepts: [
    // C1 — subject and time frame
    {
      kind: "formula" as const,
      slug: "cdsencz-tense-agreement",
      name: "Find the subject and the passage's time frame",
      intuition:
        "A verb must agree with two things: its subject (one or many) and the time of the passage (past, present, or from the past up to now). " +
        "Find both before you look at the options.",
      definition:
        "The terms:\n" +
        "- **Subject**: the person or thing that does the verb. Find it by asking 'who or what ...?' before the verb.\n" +
        "- **Time marker**: a word or phrase that fixes the time: in 1869, since the 12th century, today, nowadays.\n" +
        "- **Present perfect** (has or have + past form): an action that began in the past and is still true now, or a past action whose result is with us now.\n" +
        "The method:\n" +
        "- Find the subject. Skip the words between it and the verb. In 'Bad habits such as over-eating, drinking or smoking ___ very easy to acquire', the subject is habits, so are.\n" +
        "- After that, which or who, the verb agrees with the noun before it: a science that studies.\n" +
        "- Find the time marker. A past year: simple past. 'since' a point or 'for' a period up to now: has or have + past form. A general truth or a rule: simple present.\n" +
        "- If the sentence has no time marker, read the sentences around it. A passage keeps one time unless something changes it.\n" +
        "- After till, until, when or if about the future, use the simple present: it will drag on till there is a revolution, not 'till there will be'.",
      authoredExample: {
        prompt:
          "Fill the three blanks: 'The old fort ___ by the Marathas in 1670. Today it ___ a museum that ___ thousands of visitors each year.' Options: (was captured / has captured); (is / are); (attract / attracts)",
        steps: [
          "'in 1670' is a past year, and the fort did not capture anything; it was taken. So was captured.",
          "'Today' marks the present. The subject 'it' is singular. So is.",
          "'a museum that ___': the verb agrees with museum, which is singular. So attracts.",
        ],
        answer: "was captured; is; attracts",
      },
      selfCheckExample: {
        prompt:
          "The list of cadets selected for the final round ___ on the notice board. (a) are (b) is (c) were (d) have",
        steps: [
          "Ask: what is on the notice board? The list, not the cadets.",
          "list is singular, so are, were and have are out.",
          "Nothing points to the past, so the present: is.",
        ],
        answer: "(b) is",
      },
      practiceSet: [
        { prompt: "The price of these shoes ___ gone up. (has / have)", answer: "has", method: "The subject is price, not shoes." },
        { prompt: "The war ended in 1945, and the soldiers ___ home soon after. (return / returned)", answer: "returned", method: "A past year sets the time: simple past." },
        { prompt: "We will wait here until the bus ___. (arrives / will arrive)", answer: "arrives", method: "After until about the future, simple present." },
        { prompt: "Water ___ at 100 °C at sea level. (boil / boils / boiled)", answer: "boils", method: "A general truth: simple present, singular subject." },
      ],
      pyqExampleId: "371e3a67-c44c-4706-8b0e-e84e4d9b21ed",
      traps: [
        {
          title: "Agreeing with the nearest noun",
          body:
            "In 'Bad habits such as over-eating, drinking, or smoking ___', the word next to the blank is smoking, which looks singular. The subject is **habits**, so are. Find the subject, not the neighbour.",
        },
        {
          title: "will after till or until",
          body:
            "'it will drag on till there will be a revolution' is wrong. The main clause already carries the future; the till clause takes the simple present: **till there is**.",
        },
        {
          title: "Ignoring the time of the sentence",
          body:
            "'the totalitarian government knows how to shape the minds ... they ___ the trick.' knows is present, so the result is with us now: **have learnt**, not had learnt.",
        },
      ],
    },

    // C2 — the word before the blank fixes the form
    {
      kind: "formula" as const,
      slug: "cdsencz-verb-pattern",
      name: "The word before the blank fixes the verb's form",
      intuition:
        "Some words lock the form of the verb that follows them. After 'to' comes the base form; after 'about' or 'for' comes the -ing form. " +
        "Spot the locking word and three options fall away.",
      definition:
        "The terms:\n" +
        "- **Base form**: the verb with nothing added: build, mean, judge.\n" +
        "- **Infinitive**: to + base form: to build, to judge.\n" +
        "- **Gerund**: the -ing form used as a noun: studying, changing.\n" +
        "- **Preposition**: a small word before a noun or an -ing form: about, for, in, of, by, against.\n" +
        "- **Causative**: make or let + a person + a verb: makes me want, let him go.\n" +
        "The method:\n" +
        "- Look at the word just before the blank.\n" +
        "- do, does or did (also with not), and can, will, should: base form. does not mean, can go.\n" +
        "- 'to' as part of a verb (want to, tend to, impossible to): base form. tends to affect, impossible to judge.\n" +
        "- A preposition: the -ing form. about studying, for changing, in articulating.\n" +
        "- make or let + person: base form with no 'to'. makes me want.\n" +
        "- want, ask or expect + person + to: we want children to be educated. If the person receives the action, use to be + past form.\n" +
        "- Careful: in a few phrases 'to' is a preposition, so the -ing form follows: look forward to meeting, object to waiting.",
      authoredExample: {
        prompt:
          "Fill both blanks: 'The instructor let the recruits ___ early, but warned them against ___ late the next day.' First blank: rest / to rest / resting. Second blank: come / to come / coming.",
        steps: [
          "First blank: 'let + the recruits' is a causative. It takes the base form with no 'to': rest.",
          "Second blank: 'against' is a preposition. A preposition takes the -ing form: coming.",
        ],
        answer: "rest; coming",
      },
      selfCheckExample: {
        prompt:
          "The heavy rain made the river ___ its banks. (a) overflow (b) to overflow (c) overflowing (d) overflowed",
        steps: [
          "'made the river' is make + object: a causative.",
          "A causative with make takes the base form with no 'to'.",
        ],
        answer: "(a) overflow",
      },
      practiceSet: [
        { prompt: "She is good at ___ maps. (read / reading)", answer: "reading", method: "'at' is a preposition: -ing form." },
        { prompt: "The general expects every soldier ___ on time. (be / to be)", answer: "to be", method: "expect + person + to." },
        { prompt: "He did not ___ the answer. (knew / know)", answer: "know", method: "After did not, the base form." },
        { prompt: "I am looking forward to ___ my family. (see / seeing)", answer: "seeing", method: "In 'look forward to', 'to' is a preposition." },
      ],
      pyqExampleId: "3a2725b3-f610-4494-9c95-d1797de19900",
      traps: [
        {
          title: "Adding -s or -ed after does or did",
          body:
            "'But that does not means it can't occur' is wrong. does already carries the tense and the singular, so the verb after it stays bare: **does not mean**.",
        },
        {
          title: "Active where the person receives the action",
          body:
            "'we want large numbers of children ___ together': the children are educated by someone. So **to be educated**, not to be educating or to educate.",
        },
        {
          title: "make + to",
          body:
            "'it makes me to want to run away' is wrong. After make + person, use the base form with no 'to': **makes me want**.",
        },
      ],
    },

    // C3 — -ing or -ed describing a noun
    {
      kind: "formula" as const,
      slug: "cdsencz-participles",
      name: "-ing or -ed: does the noun act or is it acted on?",
      intuition:
        "An -ing or -ed form can describe a noun. The -ing form says the noun does the action. The -ed (past) form says the noun receives it. " +
        "Ask: who is doing what to whom?",
      definition:
        "The terms:\n" +
        "- **Participle**: a verb form that works like a describing word: the rising sun (-ing), a broken chair (past form).\n" +
        "- **Active**: the noun does the action. **Passive**: the action is done to the noun.\n" +
        "The method:\n" +
        "- Find the noun the blank describes. It is usually just before the blank, or the subject of the main clause when the blank opens the sentence.\n" +
        "- Ask: does the noun do the action, or is it acted on?\n" +
        "- It does the action: -ing. A form originating from Japan (it comes from Japan); outcomes suggesting that (they suggest).\n" +
        "- It is acted on: past form. A system based on elections; the framework described in this section; the movement portrayed.\n" +
        "- A 'by ...' phrase after the blank almost always means acted on.\n" +
        "- If the sentence already has its main verb, the blank cannot be a full verb such as 'originates': it must be a participle.\n" +
        "- 'It is ___ that' about what people think or know is passive: it is widely believed that, it is known that.",
      authoredExample: {
        prompt:
          "Fill both blanks: '___ at dawn, the patrol reached the river by noon. The bridge ___ across it had been blown up.' First blank: Leaving / Left / Leaves. Second blank: building / built / builds.",
        steps: [
          "First blank opens the sentence, so it describes the subject: the patrol.",
          "The patrol left at dawn; it did the action. So the -ing form: Leaving.",
          "Second blank describes the bridge. A bridge does not build anything; people built it. It is acted on: built.",
          "The sentence already has its main verb ('had been blown up'), so 'builds' cannot stand there.",
        ],
        answer: "Leaving; built",
      },
      selfCheckExample: {
        prompt:
          "The letters ___ by the soldiers during the war are now in a museum. (a) writing (b) written (c) wrote (d) writes",
        steps: [
          "The blank describes 'letters'. The soldiers wrote them; the letters were acted on.",
          "'by the soldiers' confirms it. The main verb is 'are', so wrote and writes are out.",
        ],
        answer: "(b) written",
      },
      practiceSet: [
        { prompt: "I heard a ___ child crying. (frightening / frightened)", answer: "frightened", method: "The child feels the fear; it is acted on." },
        { prompt: "The news was ___. (shocking / shocked)", answer: "shocking", method: "The news causes the shock." },
        { prompt: "A road ___ to the border was opened. (leading / led)", answer: "leading", method: "The road leads; it does the action." },
        { prompt: "The window ___ by the storm was repaired. (breaking / broken)", answer: "broken", method: "The storm broke the window; the window is acted on." },
      ],
      pyqExampleId: "38e775fc-98b3-493d-a498-b1037b39efce",
      traps: [
        {
          title: "Choosing a full verb when the sentence already has one",
          body:
            "'This cultural form ___ from Japan has a name ...' already has its verb, has. So the blank cannot be originates or originated as a main verb. It describes the form: **originating**.",
        },
        {
          title: "-ing for a thing that is acted on",
          body:
            "'a representative system of government ___ on free and fair elections': the system is built on elections by someone. **based**, not basing.",
        },
        {
          title: "Feeling words: -ing causes, -ed feels",
          body:
            "A boring lecture makes you bored. Ask whether the noun causes the feeling (-ing) or has it (-ed).",
        },
      ],
    },

    // C4 — modals and how sure the writer is
    {
      kind: "formula" as const,
      slug: "cdsencz-modals",
      name: "Modals and mood: how sure is the writer?",
      intuition:
        "A modal (must, may, might, should) shows how sure the writer is. Match the modal to the strength of the claim around it.",
      definition:
        "The terms:\n" +
        "- **Modal**: a helping verb that adds certainty, possibility or duty: must, may, might, can, could, should, ought to, will, would.\n" +
        "- **Inference**: a conclusion the writer draws from evidence.\n" +
        "The method:\n" +
        "- Look for words that show how sure the writer is. 'it stands to reason', 'clearly', 'surely': a firm inference, so must (have).\n" +
        "- 'perhaps', 'this could be because', an open question, a guide to trying things out: a weak possibility, so may or might.\n" +
        "- A duty or advice: should, ought to. Do not use them for a guess about the cause of something.\n" +
        "- For a guess about the past, use modal + have + past form: may have left, must have found.\n" +
        "- Wishes and unreal conditions take were for every subject: If only it were that easy. If I were you.",
      authoredExample: {
        prompt:
          "Nobody is certain why the engine stopped. Some say it ___ have run out of fuel. (a) must (b) may (c) should (d) will",
        steps: [
          "Read the clue before the blank: 'Nobody is certain' and 'Some say'. The claim is weak.",
          "must would make it a firm conclusion, which the first sentence denies.",
          "should is about duty, and will is a prediction. Neither fits a guess about the past.",
          "A weak guess about the past: may have.",
        ],
        answer: "(b) may",
      },
      selfCheckExample: {
        prompt: "If I ___ in your place, I would accept the offer. (a) am (b) was (c) were (d) will be",
        steps: [
          "'If I ___ in your place' is unreal: I am not in your place.",
          "An unreal condition takes were for every subject in exam English.",
        ],
        answer: "(c) were",
      },
      practiceSet: [
        { prompt: "Cadets ___ salute a senior officer. (should / might)", answer: "should", method: "A duty." },
        { prompt: "Take an umbrella; it ___ rain later. (might / should)", answer: "might", method: "A weak possibility." },
        { prompt: "He looks tired. He ___ have slept badly. (may / should)", answer: "may", method: "A guess about the past." },
        { prompt: "I wish I ___ taller. (was / were)", answer: "were", method: "A wish takes were." },
      ],
      pyqExampleId: "ab10b3bd-747a-4af8-9838-de441df7d27f",
      traps: [
        {
          title: "should for a guess",
          body:
            "'Learning levels are highly unequal. This ___ be happening because of institutional features' offers a possible cause. should and ought to speak of duty, so the tentative **may** fits.",
        },
        {
          title: "A firm modal in a careful sentence",
          body:
            "Academic writing often hedges. When the passage says 'arguably', 'perhaps' or 'one possible reason', a strong must or will claims more than the writer does.",
        },
        {
          title: "was after 'If only'",
          body:
            "'If only it was that easy' is common in speech, but the exam answer for a wish or an unreal condition is **were**.",
        },
      ],
    },
  ],
};
