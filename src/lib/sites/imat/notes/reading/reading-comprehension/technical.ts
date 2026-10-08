import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_REA_RDC_TECHNICAL_NOTE: SubtopicNote = {
  subtopicName: "Technical and Medical Texts",
  title: "Reading Leaflets, Reports and Figures",
  oneLineDefinition:
    "Technical texts pack exact information into few words; read every frequency, condition and number exactly as written, and add nothing.",
  whyItMatters:
    "The 2025 paper used an excerpt from a medicine leaflet and asked for its correct interpretation, and an economic news article full of growth figures and percentages. Practise both kinds of source: they reward reading every qualifier and every number.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-rdc-leaflet",
      name: "Reading a medicine leaflet: frequency, possibility and warning signs",
      intuition:
        "A patient leaflet is written to be exact. Each side effect sits in a frequency band, words like 'may' and 'could' mark a risk rather than a certainty, and the words in brackets usually say what a symptom points to. Wrong options make a possible effect certain, move an effect to the wrong organ, or turn a risk into a benefit.",
      definition:
        "- **Frequency bands** in European leaflets: very common (more than 1 in 10 people), common (up to 1 in 10), uncommon (up to 1 in 100), rare (up to 1 in 1,000), very rare (up to 1 in 10,000), and **not known** (the frequency cannot be estimated from the available data). 'Not known' does not mean rare.\n" +
        "- **Possibility, not certainty**: 'may cause', 'could lead to', 'can progress to' mean the effect is possible, not that it always happens.\n" +
        "- **Signs and what they indicate**: a symptom is often followed by its meaning in brackets, for example 'dark urine (a sign of liver problems)'. The organ named in the brackets is the one at risk.\n" +
        "- **Conditions**: 'if you have', 'in patients over 65', 'when taken with' limit a statement to one group or situation.\n" +
        "- A **side effect** is an unwanted effect of the medicine. A medicine that can harm an organ is never, for that reason, a treatment for that organ's disease.",
      authoredExample: {
        prompt:
          "Possible side effects. Common (may affect up to 1 in 10 people): drowsiness, dry mouth. Uncommon (may affect up to 1 in 100 people): blurred vision, difficulty passing urine. Rare (may affect up to 1 in 1,000 people): fast or irregular heartbeat (a sign that the heart is affected); if this happens, stop taking the tablets and contact a doctor at once. Do not drive or operate machinery if you feel drowsy. Do not drink alcohol while taking this medicine, as it can increase drowsiness.\n\n" +
          "Which statement is the correct interpretation of this excerpt?\n" +
          "(A) Most people who take the tablets become drowsy.\n" +
          "(B) The medicine may affect the heart in a small number of users.\n" +
          "(C) Patients must never drive while taking this medicine.\n" +
          "(D) Blurred vision affects about 1 in 10 users.\n" +
          "(E) Alcohol reduces the drowsiness caused by the tablets.",
        steps: [
          "A: drowsiness is 'common', which means up to 1 in 10 people. That is far from most.",
          "B: a fast or irregular heartbeat is listed as rare, and the brackets say it is 'a sign that the heart is affected'. Rare means a small number; 'may' keeps it a possibility. Correct.",
          "C: the warning is conditional: do not drive 'if you feel drowsy'. 'Never' drops the condition.",
          "D: blurred vision is 'uncommon', up to 1 in 100, not 1 in 10. E reverses the warning: alcohol can increase drowsiness.",
        ],
        answer: "(B) The medicine may affect the heart in a small number of users.",
      },
      selfCheckExample: {
        prompt:
          "Warnings and precautions. Talk to your doctor before taking this medicine if you have asthma, as it may trigger an attack in some patients. Not known (frequency cannot be estimated from the available data): swelling of the face, lips or tongue, with difficulty breathing (signs of a severe allergic reaction). Rare (may affect up to 1 in 1,000 people): black or tarry stools (a sign of bleeding in the stomach or gut). Taking more than the recommended dose increases the risk of stomach bleeding.\n\n" +
          "Which of the following is the correct interpretation of the information in this excerpt?",
        options: [
          "A severe allergic reaction is very rare, so it can be ignored.",
          "Patients with asthma must not take this medicine.",
          "This medicine can cause bleeding in the digestive tract.",
          "Black stools are a sign of a severe allergic reaction.",
          "Taking the recommended dose removes any risk of stomach bleeding.",
        ],
        steps: [
          "C: black stools are listed as a rare effect, and the brackets name 'bleeding in the stomach or gut'. 'Can cause' keeps the possibility. Correct.",
          "A: the allergic reaction is 'not known', which means no estimate is possible, not 'very rare'; and nothing says it can be ignored.",
          "B: the leaflet says talk to your doctor first, because the medicine 'may trigger an attack in some patients'. It does not forbid it.",
          "D: the brackets after black stools name bleeding, not allergy. E: the text says a higher dose increases the risk; it does not say the normal dose has none, and bleeding is listed as a rare effect of ordinary use.",
        ],
        answer: "(C) This medicine can cause bleeding in the digestive tract.",
      },
      practiceSet: [
        {
          prompt: "A leaflet lists an effect as 'uncommon'. At most about how many users in 100 does it affect?",
          answer: "About 1 in 100.",
        },
        {
          prompt: "What does 'frequency not known' mean in a leaflet?",
          answer: "The data do not allow an estimate. It does not mean the effect is rare.",
        },
        {
          prompt: "A leaflet says 'pale stools (a sign of liver problems)'. Which organ is at risk?",
          answer: "The liver.",
        },
        {
          prompt: "A leaflet says the medicine 'may cause dizziness'. Is 'it causes dizziness in every patient' a correct reading?",
          answer: "No: 'may' marks a possibility.",
        },
      ],
      traps: [
        {
          title: "Frequency not known is not very rare",
          body: "'Not known' means the available data cannot give a number. The effect could be rare or fairly common. An option that calls it rare, or says it can be ignored, reads something into the leaflet that is not there.",
        },
        {
          title: "A side effect is not a treatment",
          body: "If a leaflet says a medicine can damage the kidneys, it says nothing good about using the medicine for kidney disease. Options that turn a risk into a benefit for the same organ are always wrong.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "imat-rdc-numbers",
      name: "Numbers in a report: rises, falls, percentages and causes",
      intuition:
        "Business, health and science reports mix figures with claims about why the figures changed. Wrong options misread a figure (an amount for a percentage), compare the wrong periods, or treat two things that happened at the same time as cause and effect.",
      definition:
        "- **Absolute and relative change**: from 40 to 50 is a rise of 10 units, or 25%. A fall of 5% is 5% of the earlier value.\n" +
        "- **Percent and percentage points**: a rate that goes from 10% to 12% rises by 2 **percentage points**, which is a 20% rise relative to where it started.\n" +
        "- **Periods**: 'compared with the same quarter last year' is not 'compared with the previous quarter'. Check which period each figure belongs to.\n" +
        "- **Approximations**: 'just under three billion' is less than three billion; 'nearly doubled' is less than double; 'more than a third' is over 33%.\n" +
        "- **Together is not because**: if sales rose while advertising rose, the text has not said one caused the other unless it uses a cause word. A cause given by a person quoted in the text is that person's claim.\n" +
        "- **One of several causes**: 'among other reasons' or 'one of the factors' must not become 'the reason'.",
      authoredExample: {
        prompt:
          "Bike sharing in the city of Lindham grew strongly last year. The number of rentals rose from 800,000 in 2022 to 1.1 million in 2023, an increase of more than a third, after a 5% fall in 2021 during a long rail strike. The council credits the growth to forty new docking stations, although the operator points out that the price of a single ride was also cut by a quarter. Women made up 38% of riders in 2023, up from 32% the year before. Despite the growth, the service still loses money, and the council has not yet decided whether to extend the contract.\n\n" +
          "According to the text, which one of the following is true?\n" +
          "(A) Rentals in 2023 were more than a third higher than in 2022.\n" +
          "(B) The share of riders who were women rose by 6% in 2023.\n" +
          "(C) The new docking stations were the only cause of the growth.\n" +
          "(D) Rentals fell by 5% in 2022.\n" +
          "(E) The service made a profit in 2023 thanks to the growth.",
        steps: [
          "A: the rise is \\(1{,}100{,}000 - 800{,}000 = 300{,}000\\), and \\(300{,}000 / 800{,}000 = 37.5\\%\\), which is more than a third. The text also says so. Correct.",
          "B: 32% to 38% is a rise of 6 percentage points. As a share of the old value it is \\(6/32 \\approx 19\\%\\). 'Rose by 6%' confuses the two.",
          "C: the council credits the stations, but the operator names a second factor (the price cut). 'Only' is not supported.",
          "D: the 5% fall was in 2021, not 2022: wrong period. E contradicts 'the service still loses money'.",
        ],
        answer: "(A) Rentals in 2023 were more than a third higher than in 2022.",
      },
      selfCheckExample: {
        prompt:
          "A regional health service reported that the average wait for a first hip-replacement appointment fell from 120 days in 2022 to 90 days in 2023. Over the same period the number of orthopaedic surgeons in the region rose from 20 to 24. The report notes that the improvement coincided with the opening of a new day-surgery unit and with an online booking system, and says that it is too early to tell which change mattered more. The share of patients seen within 60 days rose from 15% to 25%.\n\n" +
          "Which one of the following is correct according to the text?",
        options: [
          "The average wait fell by 30%.",
          "The share of patients seen within 60 days rose by 10 percentage points.",
          "The number of surgeons rose by 4%.",
          "The online booking system was the main reason the waits fell.",
          "Most patients were seen within 60 days in 2023.",
        ],
        steps: [
          "B: 15% to 25% is a rise of \\(25 - 15 = 10\\) percentage points. Correct.",
          "A: the wait fell by 30 days, which is \\(30/120 = 25\\%\\), not 30%. The option mixes the number of days with the percentage.",
          "C: 20 to 24 is 4 more surgeons, a rise of \\(4/20 = 20\\%\\).",
          "D: the report says it is 'too early to tell which change mattered more'. E: 25% is a quarter of patients, not most.",
        ],
        answer: "(B) The share of patients seen within 60 days rose by 10 percentage points.",
      },
      practiceSet: [
        { prompt: "A price rises from 50 to 60. By what percentage has it risen?", answer: "20%", method: "\\(10/50 = 0.20\\)" },
        {
          prompt: "Unemployment goes from 8% to 6%. What is the change in percentage points, and the relative change?",
          answer: "Down 2 percentage points, a 25% relative fall.",
          method: "\\(2/8 = 0.25\\)",
        },
        {
          prompt: "Text: 'Exports rose by 10% compared with the same quarter last year.' Have exports risen since the previous quarter?",
          answer: "The text does not say: the comparison is with a year earlier.",
        },
        {
          prompt: "Text: 'Sales grew, among other reasons, because of the new website.' Option: 'Sales grew because of the new website alone.' Supported?",
          answer: "No: the text names it as one of several reasons.",
        },
      ],
      traps: [
        {
          title: "Percentage points are not percent",
          body: "A share that goes from 20% to 30% has risen by 10 percentage points, but by 50% of its old value. Options exploit the mix-up in both directions, so work out both numbers and see which one the option states.",
        },
      ],
    },
  ],
};
