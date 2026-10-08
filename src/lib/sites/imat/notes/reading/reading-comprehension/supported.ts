import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_RDC_SUPPORTED_NOTE: SubtopicNote = {
  subtopicName: "Stated and Implied Meaning",
  title: "What the Text Says, and What It Supports",
  oneLineDefinition:
    "A reading answer is right only when a line of the passage states it or makes it follow; outside knowledge and over-strong wording make an option wrong.",
  whyItMatters:
    "Three ministry questions (2023, 2025 and 2026) asked which statement is true according to the text or coherent with it. The wrong options added a claim, made a cautious claim certain, or relied on what the reader already knew.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-rdc-routine",
      name: "A routine and a time budget for each reading question",
      intuition:
        "A reading question is worth exactly as much as a biology question, but it can eat three times the time if you read the passage twice. Read the question first, so you know what you are hunting for. Then read the passage once, noticing what each sentence does, and judge every option against a line of the text rather than against your memory.",
      definition:
        "**The four-step routine** for one reading question:\n" +
        "- **Read the stem first.** Know the task: true, NOT true, cause, main point, meaning of a word.\n" +
        "- **Read the passage once**, briskly, noting what each sentence does: a claim, an example, a cause, a limit, an opinion.\n" +
        "- **Go back to the line** each option depends on. The answer is decided by the text, not by what you know. The 2026 papers say this outright: answer only from what the text states or implies.\n" +
        "- **Judge all five options** before you choose. A good-looking first option often loses to a better one further down.\n" +
        "**Time budget**: 100 minutes for 60 questions is about 1 minute 40 seconds each. A reading question with its passage takes about 2 minutes, so the four together take about 8 minutes. If one passage is stuck at 3 minutes, mark your best option and move on.\n" +
        "**Scoring**: +1.5 right, -0.4 wrong, 0 blank. A blind guess among five options is worth about zero on average. Once you can rule out even one option, a guess among the rest gains points on average.",
      authoredExample: {
        prompt:
          "Researchers asked two groups of volunteers to learn a list of word pairs in the evening. One group then slept for eight hours; the other stayed awake through the night under supervision. When both groups were tested the next afternoon, after the second group had also been allowed to sleep, the volunteers who had slept straight after learning recalled more pairs. The researchers suggest that sleep in the hours after learning helps the brain to stabilise new memories. They add that the study was small and that it tested only one kind of memory, so the result may not apply to skills such as playing an instrument.\n\n" +
          "According to the text, which one of the following is true?\n" +
          "(A) Sleep improves every kind of memory.\n" +
          "(B) The volunteers who stayed awake were not allowed to sleep before the test.\n" +
          "(C) The volunteers who slept soon after learning remembered more word pairs.\n" +
          "(D) Learning a musical instrument is not affected by sleep.\n" +
          "(E) Studying in the evening is better than studying in the morning.",
        steps: [
          "0:00 to 0:10. Read the stem: 'true according to the text'. Every option needs a line that supports it.",
          "0:10 to 1:00. Read the passage once and label the sentences: method (sentences 1 to 3), result (sentence 3, end), interpretation (sentence 4), limits (sentence 5).",
          "1:00 to 1:45. Check each option. A says 'every kind of memory', but the limits sentence says only one kind was tested. B contradicts 'after the second group had also been allowed to sleep'. C restates the result in other words. D makes a claim about learning an instrument, which the study never tested; the last sentence only says the result may not apply there. E compares times of day, which the study never did.",
          "About 1:50: choose C. The whole question took under two minutes because the passage was read once and each option was tied to one sentence.",
        ],
        answer: "(C) The volunteers who slept soon after learning remembered more word pairs.",
      },
      selfCheckExample: {
        prompt:
          "Read the text and answer only on the basis of what it states or implies.\n\n" +
          "A forager honeybee that finds a rich patch of flowers returns to the hive and performs a 'waggle dance' on the vertical surface of the comb. The angle of the straight part of the dance, measured from the vertical, matches the angle between the direction of the flowers and the direction of the sun. The longer the straight run lasts, the farther away the flowers are. Other bees follow the dancer closely and then leave the hive to search in the direction shown.\n\n" +
          "Which one of the following is supported by the text?",
        options: [
          "Bees use the waggle dance to warn the hive about predators.",
          "A longer straight run tells the other bees that the food is farther away.",
          "Bees also find the flowers by the smell carried on the dancer's body.",
          "The dance is performed on the horizontal floor of the hive.",
          "The angle of the dance matches the angle between the flowers and the hive entrance.",
        ],
        steps: [
          "Stem first: 'supported by the text'. Each option must match a sentence.",
          "The third sentence says the longer the straight run, the farther away the flowers. B says the same in other words.",
          "A is not in the text. D contradicts 'vertical surface'. E changes the reference direction: the text says the sun, not the hive entrance.",
          "C may well be true of real bees, but the passage never mentions smell. Outside knowledge does not count, so C is not supported.",
        ],
        answer: "(B) A longer straight run tells the other bees that the food is farther away.",
      },
      practiceSet: [
        { prompt: "In a reading question, what should you read first: the passage or the question?", answer: "The question stem, so you know what you are looking for." },
        {
          prompt: "About how long should the four reading questions take altogether?",
          answer: "About 8 minutes, roughly 2 minutes each.",
          method: "100 minutes for 60 questions is about 1 minute 40 seconds per question",
        },
        {
          prompt: "With +1.5 for a right answer and -0.4 for a wrong one, is a blind guess among all five options worth taking?",
          answer: "No: on average it is worth about zero.",
          method: "\\(0.2 \\times 1.5 - 0.8 \\times 0.4 = -0.02\\)",
        },
        {
          prompt: "You have ruled out two options and cannot choose among the other three. Guess or leave it blank?",
          answer: "Guess: the average gain is about +0.23 points.",
          method: "\\(\\tfrac{1}{3} \\times 1.5 - \\tfrac{2}{3} \\times 0.4 \\approx 0.23\\)",
        },
      ],
      traps: [
        {
          title: "Choosing an option because it is true in real life",
          body: "The ministry papers ask what the text states or implies. An option can be a correct fact about the world and still be the wrong answer, because the passage never says it. Ask 'which line supports this?', not 'is this true?'.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-stated-implied",
      name: "Stated, implied or not supported: the three kinds of option",
      intuition:
        "Every option falls into one of three bins. It is stated (the text says it in other words), implied (the text does not say it, but it must be true if the text is true), or not supported (it might be true, or it contradicts the text). In IMAT an inference is a small, safe step, never a guess about what the author probably thinks.",
      definition:
        "Sort each option into one bin:\n" +
        "- **Stated**: the passage says it, usually in different words (a synonym, or a summary of one sentence).\n" +
        "- **Implied**: the passage does not say it, but it **must** be true if the passage is true. Example: 'the bridge opened in 1890, forty years after the first plan' implies that the first plan dates from 1850.\n" +
        "- **Not supported**: it might be true, but the passage gives no reason to accept it; or the passage contradicts it.\n" +
        "- An implication needs **no extra assumption**. If you must add 'probably' or 'usually' to make it work, it is not implied.\n" +
        "- Paraphrase is normal. The right option rarely repeats the text's words, and a wrong option often repeats them while changing the meaning.",
      authoredExample: {
        prompt:
          "In the 1840s, a Vienna hospital had two maternity wards. In the first, run by doctors and medical students, many more mothers died of fever after giving birth than in the second, run by midwives. The physician Ignaz Semmelweis noticed that the doctors often came to the ward straight from dissecting bodies. In 1847 he ordered them to wash their hands in a chlorine solution before examining patients, and deaths in the first ward fell sharply. Semmelweis could not say what exactly was being carried on the hands, since the idea that germs cause disease was not yet accepted. Many senior doctors rejected his advice, and handwashing became standard practice only decades later.\n\n" +
          "Put each statement in its bin: stated, implied, or not supported.\n" +
          "(1) Before 1847, more mothers died of fever in the first ward than in the second.\n" +
          "(2) Handwashing was introduced in the first ward before germ theory was generally accepted.\n" +
          "(3) By 1850 every hospital in Vienna required doctors to wash their hands.\n" +
          "(4) The midwives in the second ward did not dissect bodies.",
        steps: [
          "(1) The second sentence says this in other words ('many more mothers died ... than in the second'). Stated.",
          "(2) No sentence says it directly, but the text gives 1847 for the handwashing and says germ theory was 'not yet accepted' then. It must be true. Implied.",
          "(3) The last sentence says handwashing became standard 'only decades later', so the text contradicts it. Not supported.",
          "(4) This is the tempting one. It fits the story, and it may be historically true, but the passage only says what the doctors did. To reach (4) you must assume that the midwives behaved differently. Not supported.",
        ],
        answer: "(1) stated; (2) implied; (3) not supported (contradicted); (4) not supported (needs an assumption).",
      },
      selfCheckExample: {
        prompt:
          "In 1912 the German scientist Alfred Wegener proposed that the continents had once been joined in a single landmass and had slowly drifted apart. He pointed to the matching shapes of the coasts of South America and Africa, and to fossils of the same land reptile found on both continents. Most geologists rejected the idea, mainly because Wegener could not name a force strong enough to move continents. Only in the 1960s, when studies of the ocean floor showed that new crust forms at mid-ocean ridges, was a mechanism found, and drift became part of the theory of plate tectonics.\n\n" +
          "Which one of the following can be inferred from the text?",
        options: [
          "Wegener was the first person to notice that the coasts of South America and Africa match.",
          "The fossil evidence persuaded most geologists in 1912.",
          "Wegener's idea was accepted at first and rejected later.",
          "Wegener proposed drift about half a century before a mechanism for it was found.",
          "Wegener lived to see drift accepted as part of plate tectonics.",
        ],
        steps: [
          "D is not stated anywhere, but it follows: the proposal is dated 1912 and the mechanism the 1960s, about fifty years later. Implied.",
          "A needs 'first', which the text never claims. B and C contradict 'most geologists rejected the idea'.",
          "E needs facts about Wegener's life that the passage does not give. (In fact he died in 1930, but you do not need to know that: the text alone gives no support.)",
        ],
        answer: "(D) Wegener proposed drift about half a century before a mechanism for it was found.",
      },
      practiceSet: [
        {
          prompt: "Text: 'The museum opened in 1925 and doubled in size twenty years later.' Is 'The museum was enlarged in 1945' stated, implied or not supported?",
          answer: "Implied.",
          method: "1925 + 20 = 1945",
        },
        {
          prompt: "Text: 'Most of the patients in the trial were over 60.' Is 'Some patients in the trial were over 60' stated, implied or not supported?",
          answer: "Implied.",
          method: "Most means more than half, so at least one",
        },
        {
          prompt: "Text: 'The new drug lowered blood pressure in the trial.' Is 'The new drug will replace older drugs' implied?",
          answer: "No: it is not supported.",
          method: "It needs assumptions about cost, side effects and doctors' choices",
        },
      ],
      traps: [
        {
          title: "An inference is not a sensible guess",
          body: "In everyday speech, to infer means to guess sensibly. In IMAT it means a statement that must be true if the passage is true. If you need 'probably' or 'usually' to make an option work, the passage does not imply it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-true-according",
      name: "Which is true according to the text: matching each option to one line",
      intuition:
        "The question gives five statements, and only one has a line in the passage behind it. The other four are built from the passage's own words but change something: a person, a date, a direction, a quantity. Find the line, then compare the option with it word by word.",
      definition:
        "For 'which is true according to the text' and 'which is coherent with the excerpt':\n" +
        "- For each option, find the **one sentence** it depends on. No sentence, no support.\n" +
        "- Compare the option and the sentence on the details IMAT changes: **who** did it, **when**, **which way** (rise or fall, cause or effect), and **how much**.\n" +
        "- Wrong options often **mix two sentences**: a name from one and a claim from another. In a passage about two things, the property of one is given to the other.\n" +
        "- 'Coherent with the excerpt' asks for the one option that agrees with it. The other four contradict it or distort it.\n" +
        "- A statement that **must follow** from a line also counts as true according to the text.",
      authoredExample: {
        prompt:
          "The grey squirrel was brought to Britain from North America in the nineteenth century, and it has since replaced the native red squirrel across most of England. Greys are larger and digest acorns better than reds, which gives them an advantage in oak woods. They also carry squirrelpox, a virus that does them little harm but is usually fatal to reds. In conifer forests, where seeds are small and food is scarcer, reds hold on better. Recent studies in Ireland and Scotland found that where pine martens, a native predator, have returned, grey numbers fall and reds recover, probably because the larger, more ground-dwelling greys are easier for martens to catch.\n\n" +
          "According to the text, which one of the following is true?\n" +
          "(A) Squirrelpox is usually fatal to grey squirrels.\n" +
          "(B) Red squirrels digest acorns better than grey squirrels.\n" +
          "(C) Pine martens were brought to Britain from North America.\n" +
          "(D) In places where pine martens have returned, red squirrel numbers have risen.\n" +
          "(E) Grey squirrels have replaced red squirrels throughout Britain.",
        steps: [
          "A: the squirrelpox sentence says the virus is fatal to reds and does little harm to greys. The option swaps the two squirrels.",
          "B: the acorn sentence says greys digest acorns better. The option reverses the direction.",
          "C: mixes two sentences. North America is where the greys came from; the martens are called 'native'.",
          "D: the last sentence says that where martens have returned, 'reds recover'. That is the line. True.",
          "E: the text says 'most of England', not all of Britain, and the conifer and marten sentences show reds surviving. Too wide.",
        ],
        answer: "(D) In places where pine martens have returned, red squirrel numbers have risen.",
      },
      selfCheckExample: {
        prompt:
          "Comets and asteroids are both small bodies left over from the formation of the Solar System, but they differ in what they are made of and where most of them are found. Asteroids are mainly rock and metal, and most orbit the Sun between Mars and Jupiter. Comets are mixtures of ice and dust, and most spend their time far beyond Neptune. When a comet's orbit brings it close to the Sun, some of its ice turns directly into gas, which carries dust away and forms the glowing tail. Because the tail is pushed by sunlight and by the stream of particles from the Sun, it always points away from the Sun, whichever way the comet is moving.\n\n" +
          "Only one of the following statements is coherent with the text. Which one?",
        options: [
          "Most asteroids orbit the Sun beyond Neptune.",
          "A comet's tail forms because the comet's metal melts near the Sun.",
          "A comet moving away from the Sun travels with its tail in front of it.",
          "Comets and asteroids formed long after the planets.",
          "The tail of a comet always points in the direction opposite to its motion.",
        ],
        steps: [
          "C is not written in the text, but it must follow. The tail always points away from the Sun; a comet moving away from the Sun is also heading away from it, so the tail is ahead of the comet.",
          "A gives the comets' location to the asteroids. B gives the asteroids' metal to the comets; the text says the tail comes from ice turning into gas.",
          "D contradicts 'left over from the formation of the Solar System'. E fails for the same reason C is true: the direction of the tail is set by the Sun ('whichever way the comet is moving'), so when the comet moves away from the Sun the tail is in front, not behind.",
        ],
        answer: "(C) A comet moving away from the Sun travels with its tail in front of it.",
      },
      practiceSet: [
        {
          prompt: "Text: 'Sales rose in 2019 and fell in 2020.' Option: 'Sales fell in 2019.' What has the option changed?",
          answer: "The direction: for 2019 the text says rose, not fell.",
        },
        {
          prompt: "A passage compares two drugs, X and Y. What kind of wrong option should you check for first?",
          answer: "One that gives a property of X to Y, or the other way round.",
        },
        {
          prompt: "What does a stem asking which statement is 'coherent with the excerpt' want?",
          answer: "The one option that agrees with the excerpt; the other four contradict or distort it.",
        },
      ],
      traps: [
        {
          title: "The text's own words are not proof",
          body: "A wrong option often reuses exact phrases from the passage and changes one small thing: the subject, the date or the direction. Matching words is not matching meaning. Compare the whole claim with the whole line.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-qualifiers",
      name: "Qualifiers and over-strong options: may, some, not yet, approximately",
      intuition:
        "Careful writers limit their claims, and wrong options quietly remove the limits. 'May cause' becomes 'causes', 'some patients' becomes 'patients', 'not yet complete' becomes 'complete'. Read the size of each claim, not only which way it points.",
      definition:
        "- **Possibility words** (may, might, could, can, suggests, is linked to) do not mean certainty (will, always, proves, causes).\n" +
        "- **Quantity words** (some, many, most, a few) do not mean all. 'Not all' does not mean none.\n" +
        "- **Time words** (not yet, so far, until now, preliminary) mean the matter is still open. An option that treats it as settled is wrong.\n" +
        "- **Number words** (about, nearly, almost, just under, more than) set a range. 'Nearly 1%' is less than 1%; 'just under three billion' is less than three billion.\n" +
        "- **Extreme words** in an option (always, never, only, all, completely, proves) are a warning. They are right only when the text is just as strong.\n" +
        "- A **cautious option** ('could lead to', 'is one of the factors') is often the right answer, because it claims exactly as much as the text.",
      authoredExample: {
        prompt:
          "Tiny fragments of plastic, known as microplastics, have now been found in human blood, lungs and placentas. Some researchers fear they may harm health, for example by causing inflammation, and laboratory studies on cells and mice point in that direction. So far, however, no study has shown that the amounts found in people cause disease. Measuring microplastics is also difficult: samples are easily contaminated by plastic in the air and in laboratory equipment, so some early results may have overestimated the levels. Scientists agree that better methods are needed before firm conclusions can be drawn.\n\n" +
          "Which one of the following is supported by the text?\n" +
          "(A) Microplastics cause inflammation in human lungs.\n" +
          "(B) Every early measurement of microplastics was wrong.\n" +
          "(C) Laboratory studies have proved that microplastics cause disease in people.\n" +
          "(D) It has not yet been shown that the levels found in humans cause disease.\n" +
          "(E) Microplastics are found in all human organs.",
        steps: [
          "Underline the qualifiers in the text: 'may harm', 'point in that direction', 'so far ... no study has shown', 'some early results may have'.",
          "A turns 'may harm, for example by causing inflammation' into a certainty. B turns 'some early results may have' into 'every ... was wrong'.",
          "C turns studies on cells and mice into proof about people, and 'point in that direction' into 'proved'.",
          "E turns three named organs into 'all'.",
          "D keeps the text's own limit: 'so far no study has shown'. It claims no more than the text does.",
        ],
        answer: "(D) It has not yet been shown that the levels found in humans cause disease.",
      },
      selfCheckExample: {
        prompt:
          "Wolves, which had disappeared from the Alps by the early twentieth century, began returning from the Apennines in the 1990s. Their number has grown steadily since, although counting such a shy animal is difficult and estimates vary. Most packs feed mainly on wild deer and chamois. Attacks on sheep and goats do occur, especially where flocks are left unguarded at night, and in some valleys they have caused serious losses to farmers. Studies of areas where guard dogs and electric fences are used suggest that these measures can greatly reduce, though not eliminate, such attacks.\n\n" +
          "According to the text, which one of the following is true?",
        options: [
          "Wolves in the Alps feed mainly on sheep and goats.",
          "Guard dogs and electric fences prevent all attacks on flocks.",
          "Wolves have caused serious losses to farmers in every Alpine valley.",
          "The exact number of wolves in the Alps is known.",
          "Attacks on livestock are more likely where flocks are unguarded at night.",
        ],
        steps: [
          "E matches 'especially where flocks are left unguarded at night': 'especially' means more often there.",
          "A contradicts 'most packs feed mainly on wild deer and chamois'. B drops the limit 'though not eliminate'.",
          "C turns 'in some valleys' into 'every'. D contradicts 'counting ... is difficult and estimates vary'.",
        ],
        answer: "(E) Attacks on livestock are more likely where flocks are unguarded at night.",
      },
      practiceSet: [
        {
          prompt: "Text: 'The treatment may reduce pain.' Option: 'The treatment reduces pain.' Supported?",
          answer: "No: 'may' is a possibility, and the option states a certainty.",
        },
        {
          prompt: "Text: 'Just under 40% of the voters took part.' Can you conclude that 40% or more took part?",
          answer: "No: it was less than 40%.",
        },
        {
          prompt: "Text: 'Results so far are encouraging.' Option: 'The trial has succeeded.' Supported?",
          answer: "No: 'so far' means the trial is not finished.",
        },
        {
          prompt: "Which words in an option should make you go back and check how strong the text is?",
          answer: "Extremes: always, never, all, only, proves, completely.",
        },
      ],
      traps: [
        {
          title: "May and could are not will and always",
          body: "A text that says a drug may cause a side effect supports 'it could lead to' that effect. It does not support 'it always leads to' it, and it does not support 'it never leads to' it either. Match the strength of the option to the strength of the text.",
        },
      ],
    },
  ],
};
