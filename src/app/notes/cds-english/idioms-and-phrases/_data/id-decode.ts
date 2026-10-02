import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_ID_DECODE_NOTE: SubtopicNote = {
  subtopicName: "Idioms: Method",
  title: "Idioms: how to decode one you have never seen",
  oneLineDefinition:
    "An idiom never means what its words picture. Cross out the literal options, say the meaning in your own words, and pick the option that matches every part of it.",
  whyItMatters:
    "Idiom meanings have been set in almost every CDS English paper since 2018, usually ten at a time. Most idioms are asked only once, so a list alone will not carry you. " +
    "You need a way to decode an idiom you have never met. Three habits do most of the work: reject the picture, match every part of the meaning, and turn a proverb into a rule.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsenid-literal",
      name: "Reject the literal picture",
      intuition:
        "An idiom is a fixed group of words with a **figurative** meaning: you cannot get it by adding up the words. A 'close shave' has nothing to do with a razor. " +
        "Paper setters know you will be pulled towards the picture, so one or two options always restate the words. Those options go first.",
      definition:
        "The method:\n" +
        "- **Idiom:** a fixed phrase whose meaning is **figurative**, not **literal**.\n" +
        "- **Step 1:** cross out every option that restates the words or the picture (a razor, a book, a wild animal).\n" +
        "- **Step 2:** ask what situation, feeling or action the picture stands for.\n" +
        "- **Step 3:** pick the option that names that situation in plain words.\n" +
        "- An option that repeats the idiom's own key word (suit, book, wild, French) is nearly always a trap.\n" +
        "- If the idiom is underlined inside a sentence, read the whole sentence: it tells you whether the meaning is pleasant or unpleasant.\n" +
        "Idioms CDS has set this way: **Follow suit** (do what someone has just done), **Close shave** (a narrow escape), **A pearl of wisdom** (a piece of wise advice), **Go by the book** (follow the rules exactly), **French leave** (absence from work without permission), **Forty winks** (a short sleep in the day), **Top-notch** (of the highest quality), **Run wild** (grow or behave without control), **Change hands** (pass to a new owner).",
      authoredExample: {
        prompt:
          "Choose the meaning of the underlined idiom. After the long route march, the cadets were ready to \\(\\underline{\\text{hit the sack}}\\). (a) punch a bag of grain (b) go to bed (c) lose their jobs (d) carry a heavy load",
        steps: [
          "Options (a) and (d) are about a real sack: punching it or carrying it. That is the picture, so cross both out.",
          "Option (c) borrows a different idiom, 'get the sack' (lose your job). The words here are 'hit the sack', so it does not fit.",
          "Use the sentence: after a long march, tired cadets want rest. An old mattress was a sack of straw, so 'hitting' it means lying down.",
        ],
        answer: "(b) go to bed.",
      },
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Break the ice'. (a) break frozen water on a lake (b) make people feel relaxed when they first meet (c) end a friendship (d) cool a drink quickly",
        steps: [
          "Options (a) and (d) are about real ice: cross them out.",
          "Option (c) takes 'break' as 'end'. But nothing in the phrase points to a friendship.",
          "The ice is the stiff silence between strangers. Breaking it lets them talk.",
        ],
        answer: "(b) make people feel relaxed when they first meet.",
      },
      practiceSet: [
        {
          prompt: "'Under the weather': standing out in the rain, or feeling slightly ill?",
          answer: "Feeling slightly ill",
          method: "Standing in the rain is the picture; reject it.",
        },
        {
          prompt: "'Pull someone's leg': trip them up, or tease them in fun?",
          answer: "Tease them in fun",
          method: "Nobody's leg is pulled; tripping is the literal reading.",
        },
        {
          prompt: "'Once in a blue moon': when the moon turns blue, or very rarely?",
          answer: "Very rarely",
          method: "The colour of the moon is the picture; the meaning is how often.",
        },
        {
          prompt: "'Hit the nail on the head': work as a carpenter, or say exactly the right thing?",
          answer: "Say exactly the right thing",
          method: "The hammer is the picture; hitting the exact spot is the meaning.",
        },
      ],
      pyqExampleId: "773bc19e-b05d-47a2-a37d-d95ac80fe173",
      traps: [
        {
          title: "The option that repeats the idiom's word",
          body:
            "For 'French leave' one option read 'absent from work without permission **in French**'. For 'Top-notch' one read 'the highest **marking** on a tree'. Both keep the idiom's own word or picture. The right answers ('absent without permission', 'of the highest quality') drop it.",
        },
        {
          title: "Narrow is not easy",
          body:
            "A **close shave** is a narrow escape from danger. 'Easy escape' gets the size of the escape wrong, and 'saving someone from danger' changes who escapes. Keep every detail of the picture's point, not just its topic.",
        },
        {
          title: "A thing is not a person",
          body:
            "**A pearl of wisdom** is a piece of advice, a thing. 'A wise man' is a person, so it is wrong even though it sounds wise. Check that the option is the same kind of word as the idiom.",
        },
        {
          title: "Change hands is about owners",
          body:
            "When a car **changes hands**, its owner changes. Driver, mechanic and machinery all touch the car, but only ownership passes from one person's hands to another's.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsenid-features",
      name: "Match every part of the meaning",
      intuition:
        "Many CDS options look alike. They share one frame and change one or two words: daring or convenient, small or large, with the crowd or against it. " +
        "So say the meaning yourself first, break it into parts, and test each option part by part. One wrong part is enough to reject an option.",
      definition:
        "The method:\n" +
        "- Before you read the options, say the meaning in your own words.\n" +
        "- Break it into **features**: what kind of act, in which direction, how much, for what purpose.\n" +
        "- Test each option feature by feature. One wrong feature rules it out. This is **elimination**.\n" +
        "- When two options differ in one word, that word is the question. Decide it and the answer follows.\n" +
        "- Prefer the precise option to the merely close one: 'stop doing something' beats 'completion of work' for 'call it a day', because you can stop before the work is done.\n" +
        "Idioms CDS has set this way: **Go out on a limb** (take a daring position against the popular view), **Penny-wise and pound-foolish** (careful with small sums, careless with large ones), **Neither fish nor fowl** (hard to describe or classify), **Walking on eggshells** (being careful not to upset anyone), **The brain drain** (skilled people leaving for better prospects abroad), **Call it a day** (stop working on something), **Double-talk** (speech meant to confuse and hide the truth), **Cut the cord** (stop depending on others and act on your own), **At the crossroads** (at an important stage or decision), **On the fly** (quickly, without careful thought).",
      authoredExample: {
        prompt:
          "Choose the meaning of 'Bite off more than you can chew'. (a) take on a task too big for you (b) take on a task too small for you (c) eat too quickly at a meal (d) refuse a task that is too big",
        steps: [
          "Own words: to accept more work than you can manage.",
          "Features: you **accept** the task (not refuse it), and the task is **too big** (not too small).",
          "(c) is the literal picture of eating: out.",
          "(b) gets the size wrong, and (d) gets the action wrong. Only (a) has both features right.",
        ],
        answer: "(a) take on a task too big for you.",
      },
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Burn the candle at both ends'. (a) work late at night and start early in the morning, until worn out (b) waste money on two things at once (c) rest both in the morning and in the evening (d) light a room evenly",
        steps: [
          "Own words: to overwork, using up your energy from both sides of the day.",
          "Features: it is about **work** (not rest, not money), and it ends in **exhaustion**.",
          "(d) is the picture. (c) reverses the activity. (b) changes energy into money.",
        ],
        answer: "(a) work late at night and start early in the morning, until worn out.",
      },
      practiceSet: [
        {
          prompt: "'Bury the hatchet': stop a quarrel, or start one?",
          answer: "Stop a quarrel and make peace",
          method: "Direction feature: burying a weapon ends the fight.",
        },
        {
          prompt: "'Throw in the towel': give up, or try harder?",
          answer: "Give up",
          method: "A boxer's corner throws the towel into the ring to stop the fight.",
        },
        {
          prompt: "'Burn the midnight oil': work late into the night, or waste time at night?",
          answer: "Work or study late into the night",
          method: "Kind of act: the oil lamp is lit for useful work.",
        },
        {
          prompt: "'Get cold feet': sudden nervousness before an act, or sudden anger?",
          answer: "Sudden nervousness before an act",
          method: "Same charge (unpleasant), different feeling: fear, not anger.",
        },
      ],
      pyqExampleId: "63c4e905-9548-4ad7-b2a6-58be3ee0e0bc",
      traps: [
        {
          title: "One feature reversed",
          body:
            "For **penny-wise and pound-foolish** one option read 'careful about large amounts but careless about small amounts'. It has the right frame and the two sizes swapped. Read both halves of every option.",
        },
        {
          title: "The literal-leaning option",
          body:
            "For **walking on eggshells**, 'walking with great care' is close but stays with the picture. 'Careful not to offend or upset others' says what the care is for. Pick the option that names the real situation.",
        },
        {
          title: "Double-talk is not a double meaning",
          body:
            "**Double-talk** is speech meant to confuse people and hide the truth. A word with two meanings is a **double entendre**, a different idiom. 'Speaking with double meaning' is the trap.",
        },
        {
          title: "When all four options begin the same",
          body:
            "For **the brain drain** every option began 'movement of professionals to another country for ...'. Only the endings differed: higher studies, better prospects, security, excursion. Skip the shared part and judge the endings alone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsenid-proverbs",
      name: "Proverbs: state the moral as a rule",
      intuition:
        "A **proverb** is a whole sentence that carries a **moral**: a piece of advice about life. Turn it into a short rule ('act early', 'share the work') before you read the options. " +
        "The right option gives the same advice in other words. The picture (a stitch, a bird, a dog, a fire) is never the answer.",
      definition:
        "How to handle a proverb:\n" +
        "- A **proverb** is a complete saying with a **moral**; an idiom is usually only a phrase.\n" +
        "- Restate it as a rule that starts with a verb: 'Act early', 'Share the work', 'Keep what you have'.\n" +
        "- Reject options that keep the picture (fire, light, a gift) or play on the proverb's own words.\n" +
        "- Check the direction: 'what you have is worth more' is not 'what may come is worth more'.",
      table: {
        columns: ["Proverb", "The rule it states", "Wrong option to avoid", "Asked in"],
        rows: [
          {
            cells: ["You snooze, you lose", "Do not hesitate; if you delay, you miss the chance", "Don't take it lightly", "2018 (I)"],
            pyqExampleId: "05e7a159-2b58-44a6-8e3c-9ea00f3fcaaf",
          },
          {
            cells: ["You scratch my back, I'll scratch yours", "Do me a favour and I will do one for you", "Mutual understanding", "2018 (I)"],
            pyqExampleId: "f7e5a721-b79c-47e4-bf4b-6543342dfa03",
          },
          {
            cells: ["A stitch in time saves nine", "Fix a problem early, before it grows", "Poking at something repeatedly to rescue it", "2025 (I)"],
            pyqExampleId: "b30d6645-51dd-474d-8c3a-a11248060767",
          },
          {
            cells: ["Many hands make light work", "When many people help, a job is done quickly", "Many people together can light a new path", "2025 (II)"],
            pyqExampleId: "e984f2a4-593a-43f3-96fc-a55e14859d53",
          },
          {
            cells: ["A bird in hand is worth two in the bush", "What you have is worth more than what you might get", "What can happen is better than what has happened", "2025 (II)"],
            pyqExampleId: "7805da22-7ed0-4458-849c-c418502a6d71",
          },
          {
            cells: ["Let sleeping dogs lie", "Leave a quiet matter alone; stirring it may make things worse", "Not stoke a dangerous situation", "2025 (I)"],
            noteAmber: "The matter is quiet now, not dangerous. That is why 'do not interfere where it may make matters worse' beats 'do not stoke a dangerous situation'.",
            pyqExampleId: "bdda226a-7a61-475b-ab48-e60ff1d88828",
          },
          {
            cells: ["Fight fire with fire", "Answer an opponent with the same force or method", "Add fuel to make the situation worse", "2025 (I)"],
            pyqExampleId: "2a1e91de-e595-4dcb-a010-02bea99f8494",
          },
          {
            cells: ["Cast one's bread upon the waters", "Do good without expecting a reward", "Misdirect one's efforts in life", "2025 (I)"],
            pyqExampleId: "591204ed-0572-4b4e-b529-ee9f847e3fd4",
          },
          {
            cells: ["A watched pot never boils", "Anxious waiting makes time seem to pass slowly", "Failure because of over-eagerness", "2024 (II)"],
            pyqExampleId: "aac24f37-2db8-4f7e-afd1-13b126ed1036",
          },
        ],
        caption: "Say the rule first. The option that gives the same advice, in any words, is the answer.",
      },
      pyqExampleId: "b30d6645-51dd-474d-8c3a-a11248060767",
      selfCheckExample: {
        prompt:
          "Choose the meaning of 'Empty vessels make the most noise'. (a) people who know little talk the most (b) empty pots rattle when they are moved (c) poor people complain loudly (d) a quiet person is always wise",
        steps: [
          "State the rule: those with little knowledge talk the loudest.",
          "(b) keeps the picture of pots: out.",
          "(c) reads 'empty' as 'poor'. The emptiness is of the mind, not the pocket.",
          "(d) goes further than the proverb, which judges noisy people and says nothing certain about quiet ones.",
        ],
        answer: "(a) people who know little talk the most.",
      },
      practiceSet: [
        { prompt: "Turn 'Look before you leap' into a rule.", answer: "Think before you act." },
        { prompt: "Turn 'Make hay while the sun shines' into a rule.", answer: "Use a chance while it lasts." },
        {
          prompt: "Which proverb in the table says that what you already have beats what you might get?",
          answer: "A bird in hand is worth two in the bush",
        },
        {
          prompt: "Which proverb in the table means 'do good without seeking a reward'?",
          answer: "Cast one's bread upon the waters",
        },
      ],
      traps: [
        {
          title: "Puns on the proverb's own words",
          body:
            "For **many hands make light work** one option said many people can 'light a new path'. For **fight fire with fire** one spoke of 'incendiary tactics'. Both play on a word of the proverb. The moral never depends on the picture word.",
        },
        {
          title: "Direction reversed",
          body:
            "**A bird in hand is worth two in the bush** values what you have. 'What can happen is always better than what has happened' says the opposite. Check which side the proverb favours.",
        },
        {
          title: "How waiting feels, not whether you fail",
          body:
            "**A watched pot never boils** is about time feeling slow while you wait anxiously. It does not say you will fail or that you have no chance. Keep the moral as narrow as the proverb.",
        },
      ],
    },
  ],
};
