import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_GR_PASSIVE_NOTE: SubtopicNote = {
  subtopicName: "Passive Voice by Tense",
  title: "Passive Voice by Tense",
  oneLineDefinition:
    "In the passive voice the thing that receives the action becomes the subject, and the verb becomes a form of be plus the past participle in the same tense as before.",
  whyItMatters:
    "Fourteen questions in the bank, 12 EASY and 2 MODERATE, and every mock paper has some. The wrong options almost always keep the meaning but change the tense, so the whole skill is matching the form of be to the tense of the active verb.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "spigrpa-steps",
      name: "The three steps from active to passive",
      intuition:
        "Turn the sentence round: the object moves to the front, the verb becomes 'be + past participle', and the doer moves to the end after 'by'. The tense never changes.",
      definition:
        "- **Step 1**: the object of the active sentence becomes the subject.\n" +
        "- **Step 2**: the verb becomes a form of **be** in the **same tense** + the **past participle** (written, made, given). The form of be agrees with the new subject.\n" +
        "- **Step 3**: the old subject goes after **by**, in its object form: I to me, we to us, he to him, she to her, they to them.\n" +
        "- A vague doer such as people, someone or they is usually **dropped**: 'Hindi is spoken in Bihar.'\n" +
        "- Keep every other word (not, all over the world, in the morning) in place.",
      authoredExample: {
        prompt: "Change to the passive voice: Ravi waters the plants.",
        steps: [
          "The object 'the plants' becomes the subject.",
          "'Waters' is simple present, so the passive is am, is or are + past participle. 'The plants' is plural: are watered.",
          "The doer goes after by: by Ravi.",
        ],
        answer: "The plants are watered by Ravi.",
      },
      selfCheckExample: {
        prompt: "Change to the passive voice: She helps me.",
        steps: [
          "The object 'me' becomes the subject in its subject form: I.",
          "'Helps' is simple present, and the subject is I: am helped.",
          "'She' goes after by in its object form: by her.",
        ],
        answer: "I am helped by her.",
      },
      practiceSet: [
        { prompt: "Change to the passive: The cook makes tea.", answer: "Tea is made by the cook." },
        { prompt: "Change to the passive: Farmers grow rice in Punjab.", answer: "Rice is grown in Punjab (by farmers)." },
        { prompt: "Change to the passive: The boys do not break the rules.", answer: "The rules are not broken by the boys." },
        { prompt: "In a passive sentence, what does the doer 'they' become after 'by'?", answer: "them" },
      ],
      pyqExampleId: "56ce6e29-f28f-4838-a822-fd43fa47e865",
      traps: [
        {
          title: "Changing the tense while changing the voice",
          body:
            "A simple present active stays simple present in the passive: 'is given', not 'has been given' or 'is being given'. Only the voice changes.",
        },
        {
          title: "Putting 'not' in the wrong place",
          body: "In a negative passive, not comes straight after the first helping verb: 'is not eaten', not 'is eaten not' or 'is being not eaten'.",
        },
        {
          title: "Dropping a phrase while changing the voice",
          body:
            "Every phrase of place or time stays: 'English is spoken all over the world'. An option that drops 'all over the world' has changed the sentence.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spigrpa-tenses",
      name: "The passive form of be in each tense",
      intuition:
        "The past participle never changes; only the form of be in front of it changes, and it copies the tense of the active verb exactly. Continuous tenses add 'being', perfect tenses add 'been'.",
      definition:
        "- **Simple** tenses: is, are, was, were, will be + past participle.\n" +
        "- **Continuous** tenses: is being, are being, was being, were being + past participle.\n" +
        "- **Perfect** tenses: has been, have been, had been, will have been + past participle.\n" +
        "- The form of be agrees with the **new** subject: 'The town has been ...', 'The towns have been ...'.\n" +
        "- A verb with its own preposition keeps it: 'They laughed at him' becomes 'He was laughed at.'",
      table: {
        columns: ["Active tense", "Active", "Passive"],
        rows: [
          { cells: ["Simple Present", "She cleans the room.", "The room is cleaned by her."] },
          { cells: ["Present Continuous", "She is cleaning the room.", "The room is being cleaned by her."] },
          { cells: ["Present Perfect", "She has cleaned the room.", "The room has been cleaned by her."] },
          { cells: ["Simple Past", "She cleaned the room.", "The room was cleaned by her."] },
          { cells: ["Past Continuous", "She was cleaning the room.", "The room was being cleaned by her."] },
          { cells: ["Past Perfect", "She had cleaned the room.", "The room had been cleaned by her."] },
          { cells: ["Simple Future", "She will clean the room.", "The room will be cleaned by her."] },
          { cells: ["Future Perfect", "She will have cleaned the room.", "The room will have been cleaned by her."] },
        ],
        caption: "Continuous adds being, perfect adds been. The perfect continuous tenses have no everyday passive.",
      },
      selfCheckExample: {
        prompt: "Change to the passive voice: The workers were repairing the bridge.",
        steps: [
          "'Were repairing' is past continuous, so the passive is was or were being + past participle.",
          "The new subject 'the bridge' is singular: was being repaired.",
        ],
        answer: "The bridge was being repaired by the workers.",
      },
      practiceSet: [
        { prompt: "Change to the passive: Mohan has painted the gate.", answer: "The gate has been painted by Mohan." },
        { prompt: "Change to the passive: The girls sang a song.", answer: "A song was sung by the girls." },
        { prompt: "Change to the passive: The police will catch the thief.", answer: "The thief will be caught by the police." },
        { prompt: "Change to the passive: Asha had cooked the meal.", answer: "The meal had been cooked by Asha." },
        { prompt: "Which word does the passive of a continuous tense add: been or being?", answer: "being" },
      ],
      pyqExampleId: "5c21b663-463e-4cc9-a86b-0e43917449f3",
      traps: [
        {
          title: "Leaving out 'being' in a continuous tense",
          body:
            "'He was driving the car' becomes 'The car was being driven'. 'The car was driven' is the simple past and changes the tense.",
        },
        {
          title: "Letting the old subject choose has or have",
          body:
            "'They have built a wall' becomes 'A wall has been built by them'. The form of be agrees with the new subject, a wall, so it is has, not have.",
        },
        {
          title: "Dropping the preposition of a prepositional verb",
          body: "'Laugh at', 'look after' and 'send for' keep their preposition in the passive: 'The baby was looked after by her aunt.'",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "spigrpa-to-active",
      name: "Turning a passive sentence back into the active",
      intuition:
        "Run the three steps backwards: the doer after 'by' becomes the subject, the form of be is dropped and the verb goes into the same active tense, and the old subject becomes the object.",
      definition:
        "- Find the doer after **by** and make it the subject in its subject form: by us to we, by him to he.\n" +
        "- Read the tense from the form of be: is or are used means simple present, had been used means past perfect, is being used means present continuous.\n" +
        "- If no doer is named, take one from the sentence (our to we, his to he) or use a sensible subject such as someone.\n" +
        "- The verb must agree with the new subject: 'We use', never 'We uses'.",
      authoredExample: {
        prompt: "Change to the active voice: The letter was posted by my sister.",
        steps: [
          "The doer after by is 'my sister', so she becomes the subject.",
          "'Was posted' is the simple past passive, so the active verb is the simple past: posted.",
          "'The letter' becomes the object.",
        ],
        answer: "My sister posted the letter.",
      },
      selfCheckExample: {
        prompt: "Change to the active voice: The windows are cleaned by the servants every week.",
        steps: [
          "The doer is 'the servants', which becomes the subject.",
          "'Are cleaned' is simple present, so the active verb is 'clean', plural to agree with 'the servants'.",
        ],
        answer: "The servants clean the windows every week.",
      },
      practiceSet: [
        { prompt: "Change to the active: The song was sung by Lata.", answer: "Lata sang the song." },
        { prompt: "Change to the active: The match will be won by our team.", answer: "Our team will win the match." },
        { prompt: "Change to the active: The walls have been painted by the workers.", answer: "The workers have painted the walls." },
        { prompt: "Change to the active: The cake is being baked by Mother.", answer: "Mother is baking the cake." },
      ],
      pyqExampleId: "92b26236-c530-43b8-a8a4-968b68f8503b",
      traps: [
        {
          title: "Reading 'had been' as the simple past",
          body: "'Had been + past participle' is the past perfect passive, so the active keeps had: 'had finished', not 'finished'.",
        },
        {
          title: "Breaking agreement in the new active sentence",
          body: "When the new subject is we, they or I, the present verb has no -s: 'We use this room', not 'We uses this room'.",
        },
      ],
    },
  ],
};
