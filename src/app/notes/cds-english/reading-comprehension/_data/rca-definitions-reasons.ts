import type { SubtopicNote } from "@/app/notes/_types";

export const CDSEN_RCA_DEFINITIONS_REASONS_NOTE: SubtopicNote = {
  subtopicName: "Definition and Reason Questions",
  title: "What Is X? Why Did Y? Questions with a Fixed Home",
  oneLineDefinition:
    "A definition question is answered by the words placed beside the term. A reason question is answered by the words joined to the event by a cause word such as because, for or so.",
  whyItMatters:
    "'What is X?' and 'Why did Y happen?' are among the most common CDS passage questions. " +
    "Both have a fixed home in the passage, so they can be answered quickly and surely. " +
    "Marks are lost to options that are true but answer a different question: a fact about something else, or what happened next.",
  concepts: [
    // C1 — definitions sit beside the term
    {
      kind: "formula" as const,
      slug: "cdsenrca-definition-beside-term",
      name: "A 'What is X?' question: the definition sits beside the term",
      intuition:
        "When a passage uses a special term, it usually explains it right there: in the same sentence, after a dash, or in the next sentence. " +
        "A 'What is X?' question wants that explanation, not your own idea of the word.",
      definition:
        "The terms:\n" +
        "- **Term**: a special word or phrase the passage uses with a set meaning.\n" +
        "- **Definition device**: the words that join a term to its meaning: 'is called', 'means', 'that is', 'comprising', 'such as', a dash, a pair of commas, or a next sentence that begins 'It' or 'This'.\n" +
        "The method:\n" +
        "- Scan for the term in the passage.\n" +
        "- Read on both sides of it for a device: 'X, that is, ...', 'X: a ...', 'X such as A and B', 'X comprising ...', '... is called X'.\n" +
        "- If the sentence has no device, read the next sentence. It often explains what was just named.\n" +
        "- Pick the option that gives the passage's own explanation. Reject an option built from general knowledge when the passage says something narrower.\n" +
        "- When one sentence defines two terms side by side, keep the halves apart: each term goes with its own explanation.\n" +
        "- If the question gives an example ('Which of these is non-living?'), put each option into the passage's definition and see which one fits.",
      authoredExample: {
        prompt:
          "Line: 'Most rivers in the region are seasonal, filling only during the monsoon, while a few perennial rivers, fed by melting snow, flow all year.' " +
          "Perennial rivers are those that (a) fill only during the monsoon (b) flow throughout the year (c) are fed only by rain (d) dry up in summer",
        steps: [
          "The term is 'perennial rivers'. Its explanation sits beside it, inside the pair of commas and after it: fed by melting snow, flow all year.",
          "The sentence defines two terms. 'Filling only during the monsoon' belongs to the other half, the seasonal rivers. So (a) is a swapped half.",
          "(c) and (d) contradict 'fed by melting snow' and 'flow all year'.",
        ],
        answer: "(b) flow throughout the year",
      },
      selfCheckExample: {
        prompt:
          "Line: 'Many towns now practise composting: turning kitchen waste into manure for gardens.' Composting is (a) burning waste (b) making manure from kitchen waste (c) growing gardens in towns (d) collecting waste from homes",
        steps: [
          "The colon after 'composting' is the device. The explanation follows it.",
          "Turning kitchen waste into manure: that is (b).",
          "(c) takes 'gardens' and (d) takes 'waste' from the line, but neither says what composting is.",
        ],
        answer: "(b) making manure from kitchen waste",
      },
      practiceSet: [
        {
          prompt: "'Small farmers, called marginal farmers, own less than one hectare.' What is a marginal farmer?",
          answer: "A farmer who owns less than one hectare.",
          method: "'called' joins the term to its meaning.",
        },
        {
          prompt: "'Fossil fuels such as coal and petrol will one day run out.' What examples of fossil fuels does the line give?",
          answer: "Coal and petrol.",
          method: "'such as' brings examples.",
        },
        {
          prompt: "'The academy uses a buddy system. Each recruit is paired with another, who checks his kit.' What is the buddy system?",
          answer: "Pairing each recruit with another, who checks his kit.",
          method: "The next sentence explains the term.",
        },
        {
          prompt: "Using the line 'Living things such as plants and animals', which is living: wind, rock or grass?",
          answer: "Grass.",
          method: "Put each option into the definition: grass is a plant.",
        },
      ],
      pyqExampleId: "c7111f53-7ec0-42bc-9f7c-b0746ec7d950",
      traps: [
        {
          title: "Taking the phrase that comes next",
          body:
            "'Excluding the **volatile components such as food and fuel**, core retail inflation was around 7 percent in April with almost all subgroups in the index witnessing elevated inflation.' " +
            "The volatile components are food and fuel. 'All subgroups in the index' is the next phrase, about something else.",
        },
        {
          title: "Reading the term's words literally",
          body:
            "A passage calls the loss of contact with nature in car-filled cities an 'asphalt complex'. Options about asphalt roads or air pollution read the words, not the definition. " +
            "The passage explains the term after a dash: 'a deprivation of contact with the natural world'.",
        },
        {
          title: "General knowledge in place of the passage's meaning",
          body:
            "On post-colonialism, the passage says it contests 'the previous dominant western ways of seeing things'. An option adding 'in colonial states' sounds learned but narrows the idea to a place the passage never names. " +
            "Answer with the passage's explanation, not with what you have read elsewhere.",
        },
        {
          title: "Not testing the example against the definition",
          body:
            "When asked which of wind, bacteria, grasses and frogs is non-living, some pause at bacteria because they are tiny and unseen. " +
            "Put each into the definition: bacteria, grasses and frogs are living organisms; **wind** is a physical factor.",
        },
      ],
    },

    // C2 — reason questions: the cause signal
    {
      kind: "formula" as const,
      slug: "cdsenrca-cause-signal",
      name: "Reason questions: find the cause signal in the passage",
      intuition:
        "A 'why' question has its answer next to a cause word. Find the event in the passage, then look on both sides of it for because, for, since, as, so, this is why, owing to, " +
        "or an opening phrase such as 'Finding the gate locked, ...' that gives a reason without the word because.",
      definition:
        "The terms:\n" +
        "- **Cause signal**: a word or pattern that links an event to its reason.\n" +
        "- Signals that come **before** the reason: because, since, as, for, owing to, due to, chiefly because.\n" +
        "- Signals that come **after** the reason and point back to it: so, therefore, thus, hence, this is why, this explains.\n" +
        "- **Hidden signals**: an opening phrase like 'Seeing the smoke, ...' or 'In search of work, ...', or a line like 'Its profits came from ...', gives a reason without any cause word.\n" +
        "The method:\n" +
        "- Find the event the question names (use its anchor word).\n" +
        "- Look before and after it for a cause signal, including the hidden ones.\n" +
        "- The words the signal joins to the event are the reason. Match them to an option.\n" +
        "- With 'so' or 'this is why', the reason is in the part BEFORE the signal, often the sentence before.\n" +
        "- Reject an option that guesses a motive the passage never states, however natural it sounds.",
      authoredExample: {
        prompt:
          "Line: 'The bridge was closed for a week. Heavy trucks had cracked its central pillar, so the engineers would not allow any traffic until it was repaired.' " +
          "Why was the bridge closed? (a) It was being painted (b) Its central pillar had cracked (c) The engineers were on leave (d) Heavy rain had flooded it",
        steps: [
          "The event is 'closed'. Look for a cause signal around it.",
          "'so' joins the reason to the result: the pillar had cracked, so no traffic was allowed.",
          "The reason is the part before 'so': heavy trucks had cracked the central pillar.",
          "(a), (c) and (d) are never stated.",
        ],
        answer: "(b) Its central pillar had cracked",
      },
      selfCheckExample: {
        prompt:
          "Line: 'Finding the shop closed, Ramesh walked to the next village for medicine.' Why did Ramesh walk to the next village? (a) He liked walking (b) The shop was closed (c) His friend lived there (d) The medicine was cheaper there",
        steps: [
          "There is no 'because', but the opening phrase 'Finding the shop closed, ...' is a hidden cause signal.",
          "So he walked on because the shop was closed.",
          "(a), (c) and (d) guess at a motive the line never gives.",
        ],
        answer: "(b) The shop was closed",
      },
      practiceSet: [
        {
          prompt: "'Owing to the strike, the trains ran late.' Why did the trains run late?",
          answer: "Because of the strike.",
          method: "'Owing to' comes before the reason.",
        },
        {
          prompt: "'The crops failed. This is why many families left the village.' Why did the families leave?",
          answer: "The crops failed.",
          method: "'This is why' points back to the sentence before.",
        },
        {
          prompt: "'He stayed indoors, for the storm had not passed.' What does 'for' mean here?",
          answer: "because",
          method: "'for' joining two clauses is a cause signal.",
        },
        {
          prompt: "'Since the road was blocked, the convoy turned back.' Option: 'The convoy was ordered back by its officer.' Accept it?",
          answer: "No. The passage gives the blocked road as the reason; the officer's order is a guess.",
        },
      ],
      pyqExampleId: "33fc7efa-02aa-4ca4-807e-40384b4d23ac",
      traps: [
        {
          title: "A noble motive the passage does not give",
          body:
            "Why did the East India Company encourage the export of Indian goods? Options such as 'it was a philanthropic trading corporation' or 'it wanted Indian manufacturers to prosper' sound kind. " +
            "The passage says: '**Its profits came primarily from** the sale of Indian goods abroad.' That hidden signal gives the real reason: profit.",
        },
        {
          title: "Looking after the event when the reason is before it",
          body:
            "With 'so', 'hence' or 'this is why', the reason has already been given. A student who reads only the lines after the event finds nothing and guesses. " +
            "Read the sentence before the signal.",
        },
        {
          title: "An option that adds a cause",
          body:
            "The poor sold their land because it was 'inferior, unproductive, barren and wasteland'. The option 'salty, not getting water' adds causes the passage never names, and 'fertile, but uncultivable' contradicts it. " +
            "Keep the option that uses only the passage's reason.",
        },
      ],
    },

    // C3 — true but not the reason
    {
      kind: "formula" as const,
      slug: "cdsenrca-cause-not-side-fact",
      name: "A true fact is not the reason: cause versus consequence",
      intuition:
        "Many wrong options in reason questions are true. They are in the passage, but they answer a different question: what happened next, what someone did, or a fact about someone else. " +
        "A reason question wants the cause of this event, and nothing else.",
      definition:
        "The terms:\n" +
        "- **Cause**: what made the event happen. It comes first.\n" +
        "- **Consequence**: what happened because of the event. It comes after.\n" +
        "- **Side fact**: a true detail from the passage that is not joined to the event by any cause signal.\n" +
        "The method:\n" +
        "- Write the event as a blank: 'X happened because ___'.\n" +
        "- Try each option in the blank. Then ask: does the passage join this option to X with a cause signal?\n" +
        "- If the option is true but the passage gives it as a result of X, it is a consequence. Strike it.\n" +
        "- If the option is true but the passage says it about another person or another event, it is a side fact. Strike it.\n" +
        "- If two things are named together as joint causes, neither is the result of the other.\n" +
        "- Keep the option the passage itself links to X.",
      authoredExample: {
        prompt:
          "The town's only factory shut down in 2015, when its owners moved production abroad to cut costs. Hundreds of workers lost their jobs, and many young people left for the cities. " +
          "The owner, a keen cricketer, also gave up his seat on the town council. Why did the factory shut down? " +
          "(a) The workers lost their jobs (b) Young people left for the cities (c) The owners moved production abroad to cut costs (d) The owner gave up his council seat",
        steps: [
          "Write the blank: 'The factory shut down because ___'.",
          "(a) and (b) are true, but they came after the closing. They are consequences.",
          "(d) is true, but nothing joins it to the closing. It is a side fact about the owner.",
          "'when its owners moved production abroad to cut costs' is the passage's own reason.",
        ],
        answer: "(c) The owners moved production abroad to cut costs",
      },
      selfCheckExample: {
        prompt:
          "Because the monsoon failed, the wells in the village ran dry. The women now walk two kilometres for water, and the school has fewer pupils, since the girls help to carry it. " +
          "Why did the wells run dry? (a) The women walk two kilometres (b) The monsoon failed (c) The girls help to carry water (d) The school has fewer pupils",
        steps: [
          "The cause signal 'Because' joins the failed monsoon to the dry wells.",
          "(a), (c) and (d) all happened after the wells ran dry: they are consequences.",
        ],
        answer: "(b) The monsoon failed",
      },
      practiceSet: [
        {
          prompt: "'The march was stopped because the bridge was weak. The soldiers then camped by the river.' Is camping by the river the reason the march stopped?",
          answer: "No. It is what happened after: a consequence.",
        },
        {
          prompt: "'The minister, known for his long speeches, resigned because of the scandal.' Why did he resign?",
          answer: "Because of the scandal.",
          method: "His long speeches are a side fact.",
        },
        {
          prompt: "'Prices rose sharply as the harvest was poor; people then bought less rice.' What caused prices to rise?",
          answer: "The poor harvest.",
          method: "Buying less rice is the result.",
        },
        {
          prompt: "True or false: if an option is stated in the passage, it must be the answer to a 'why' question.",
          answer: "False.",
          method: "It must be joined to the event as its cause.",
        },
      ],
      pyqExampleId: "000b694e-5f52-4a5b-84dd-41e52b962ffd",
      traps: [
        {
          title: "What people did, offered as why it happened",
          body:
            "Why were people freed from farm work for other tasks? The passage says that as productivity improved, not everyone was needed to produce food. " +
            "'People were needed to build monuments, weapons, jewellery' is what the freed people went on to do, not why they were freed. The reason is that there was **enough food**.",
        },
        {
          title: "What a thing does for us, offered as why it is called essential",
          body:
            "'Plastic is an essential commodity **with multiple uses** based on its key qualities.' The option 'it has made our lives easier' may be true, but the passage gives multiple everyday uses as the reason.",
        },
        {
          title: "A consequence offered as the thing itself",
          body:
            "'Our tragedy today is a general and universal physical fear so long sustained by now that we can even bear it.' The writer then says that, **because of this**, young writers have forgotten the problems of the human heart. " +
            "That forgetting follows from the tragedy; it is not the tragedy.",
        },
        {
          title: "Two causes named together, read as cause and result",
          body:
            "'Urbanization and industrialization have often resulted in whole areas of forests being cleared.' Urbanization stands beside industrial growth as a joint cause. " +
            "An option that lists urbanization as a result of industrial development reads a link the passage never makes.",
        },
      ],
    },
  ],
};
