import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CL_FAULTY_NOTE: SubtopicNote = {
  subtopicName: "Faulty Clocks",
  title: "Clocks That Gain or Lose Time",
  oneLineDefinition:
    "A faulty clock drifts by a fixed amount each hour: multiply to find what it shows, divide to find when it is right, and use its rate to turn shown time into real time.",
  whyItMatters:
    "Most questions on this page are EASY and need one multiplication or one division. Marks go when an hour or noon is crossed carelessly, when a fast clock is treated as slow, and when an hour of gain is taken to set a clock right, which needs 12 hours.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afcl-time-shown",
      name: "What a gaining or losing clock shows",
      intuition:
        "A clock that gains a few minutes every hour gets that much further ahead after each real hour. Count the real hours since it was right, multiply by the rate, and add the gain to the real time or take the loss away.",
      definition:
        "- Drift \\(=\\) rate \\(\\times\\) real hours since the clock was right.\n" +
        "- A rate per 2 or 3 hours: count the spells. 6 hours at 5 minutes per 2 hours is 3 spells, so 15 minutes.\n" +
        "- Time shown \\(=\\) real time \\(+\\) gain, or real time \\(-\\) loss.\n" +
        "- Adding minutes to a clock time carries into the hour: 9:50 plus 25 minutes is 10:15. Passing noon turns AM into PM.",
      formula: {
        label: "Time shown",
        latex: "\\text{shown} = \\text{real} \\pm \\text{rate} \\times \\text{hours}",
      },
      authoredExample: {
        prompt: "A clock gains 4 minutes every hour. It was set right at 7:00 AM. What does it show at 3:00 PM?",
        steps: ["7:00 AM to 3:00 PM is 8 hours.", "Gain: \\(8 \\times 4 = 32\\) minutes.", "It shows 32 minutes past 3."],
        answer: "3:32 PM.",
      },
      selfCheckExample: {
        prompt: "A clock loses 5 minutes every 3 hours. It was right at 6:00 AM. What does it show at 9:00 PM?",
        steps: ["6:00 AM to 9:00 PM is 15 hours, 5 spells of 3 hours.", "Loss: \\(5 \\times 5 = 25\\) minutes.", "\\(9{:}00 - 25\\) minutes is 8:35."],
        answer: "8:35 PM.",
      },
      practiceSet: [
        { prompt: "A clock gains 7 minutes an hour and was right at 10:00 AM. What does it show at 4:00 PM?", answer: "4:42 PM" },
        { prompt: "A clock loses 2 minutes an hour and was right at 6:00 AM. What does it show at 4:00 PM?", answer: "3:40 PM" },
        { prompt: "A clock gains 9 minutes every 4 hours and was right at 8:00 AM. What does it show at 8:00 PM?", answer: "8:27 PM" },
      ],
      pyqExampleId: "d43efbd3-fc84-4a9c-8e09-53b7951b40a0",
      traps: [
        {
          title: "Carry into the hour",
          body: "A clock 75 minutes ahead at 4:00 PM shows 5:15 PM, not 4:75.",
        },
        {
          title: "Count the real hours across noon",
          body: "From 9:00 AM to 2:00 PM is 5 hours. Taking \\(9 - 2 = 7\\) hours counts the wrong way and overstates the drift.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-when-correct",
      name: "When a fast or slow clock shows the right time",
      intuition:
        "A clock that is ahead and loses time closes its error at its rate per hour. It is right when the error reaches zero, so divide the error by the rate.",
      definition:
        "- Hours until right \\(= \\dfrac{\\text{minutes fast or slow}}{\\text{minutes corrected per hour}}\\).\n" +
        "- A fast clock must lose time to come right, and a slow clock must gain.\n" +
        "- Turn a fraction of an hour into minutes: 2.5 hours is 2 hours 30 minutes.",
      formula: {
        label: "Hours until right",
        latex: "t = \\dfrac{\\text{error}}{\\text{rate}}",
      },
      authoredExample: {
        prompt: "A clock is 15 minutes fast at 9:00 AM and loses 3 minutes every hour. When does it show the right time?",
        steps: ["\\(15 \\div 3 = 5\\) hours.", "9:00 AM plus 5 hours is 2:00 PM."],
        answer: "2:00 PM.",
      },
      selfCheckExample: {
        prompt: "A clock is 14 minutes slow at noon and gains 4 minutes an hour. When is it right?",
        steps: ["\\(14 \\div 4 = 3.5\\) hours, which is 3 hours 30 minutes."],
        answer: "3:30 PM.",
      },
      practiceSet: [
        { prompt: "A clock is 12 minutes fast at 7:00 AM and loses 2 minutes an hour. When is it right?", answer: "1:00 PM" },
        { prompt: "A clock is 9 minutes slow at 10:00 AM and gains 3 minutes an hour. When is it right?", answer: "1:00 PM" },
        { prompt: "A clock is 25 minutes fast at 6:00 AM and loses 10 minutes an hour. When is it right?", answer: "8:30 AM" },
      ],
      pyqExampleId: "359e9d37-2e55-418f-a222-845a4f55f7f6",
      traps: [
        {
          title: "A third of an hour is 20 minutes",
          body: "\\(6\\tfrac{1}{3}\\) hours is 6 hours 20 minutes, not 6 hours 33 minutes. Multiply the fraction by 60.",
        },
        {
          title: "A fast clock that gains never catches up",
          body: "A clock 10 minutes fast that gains 2 minutes an hour only gets further ahead. It looks right again only after gaining a whole 12 hours, the last concept on this page.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-clock-rate",
      name: "Turning shown time into real time",
      intuition:
        "A clock that loses 5 minutes an hour shows 55 minutes for every 60 real ones. Shown time and real time are in the ratio \\(55 : 60\\), so convert with that ratio rather than by adding the loss.",
      definition:
        "- Gaining \\(g\\) minutes an hour: shown \\(:\\) real \\(= (60 + g) : 60\\). Losing \\(g\\) minutes: \\((60 - g) : 60\\).\n" +
        "- Real time passed \\(=\\) shown time passed \\(\\times \\dfrac{60}{60 \\pm g}\\).\n" +
        "- 'Loses 1 minute in every 10' means it shows 9 minutes for every 10, a ratio of \\(9 : 10\\). '30 seconds slow every minute' means it runs at half speed.",
      formula: {
        label: "Shown and real time",
        latex: "\\text{real} = \\text{shown} \\times \\dfrac{60}{60 \\pm g}",
      },
      authoredExample: {
        prompt: "A watch loses 5 minutes every hour. It was set right at noon. What is the real time when it shows 5:30 PM?",
        steps: [
          "It shows 55 minutes for every 60 real ones.",
          "Shown since noon: 330 minutes. Real: \\(330 \\times \\tfrac{60}{55} = 360\\) minutes.",
          "360 minutes after noon is 6:00 PM.",
        ],
        answer: "6:00 PM.",
      },
      selfCheckExample: {
        prompt: "A clock loses 1 minute in every 6. It was right at 9:00 AM. What does it show at noon?",
        steps: ["It shows \\(\\tfrac{5}{6}\\) of the real time.", "\\(180 \\times \\tfrac{5}{6} = 150\\) minutes after 9:00 AM."],
        answer: "11:30 AM.",
      },
      practiceSet: [
        {
          prompt: "A clock runs 20 seconds slow every minute. It was right at 1:00 PM. When it shows 3:00 PM, what is the real time?",
          answer: "4:00 PM",
          method: "It runs at \\(\\tfrac{2}{3}\\) speed, so 120 shown minutes are 180 real ones.",
        },
        {
          prompt: "A watch gains 10 minutes an hour and was right at 8:00 AM. What is the real time when it shows 3:00 PM?",
          answer: "2:00 PM",
          method: "\\(420 \\times \\tfrac{60}{70} = 360\\) minutes.",
        },
        { prompt: "A clock loses 1 minute in every 4. How long does it take to show 3 hours passing?", answer: "4 hours" },
      ],
      pyqExampleId: "72d4a7ca-726b-45b9-a50d-3f4a377e9681",
      traps: [
        {
          title: "The rate is per real hour",
          body: "A watch gaining 12 minutes an hour shows 6 hours gone. Taking off \\(6 \\times 12 = 72\\) minutes gives 4 hours 48 minutes, but those were the watch's hours. The ratio gives \\(360 \\times \\tfrac{60}{72} = 300\\) minutes, exactly 5 hours.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-correct-again",
      name: "When a faulty clock is right again",
      intuition:
        "A 12-hour dial looks right again once the clock has gained or lost exactly 12 hours, which is 720 minutes. Divide 720 by the drift per hour.",
      definition:
        "- Hours until right again \\(= \\dfrac{720}{\\text{minutes gained or lost per hour}}\\).\n" +
        "- Two faulty clocks set together show the same time again when the gap between them reaches 720 minutes. One gains and one loses: add the rates. Both gain, or both lose: subtract them.\n" +
        "- Turn large answers into days if the options ask: 360 hours is 15 days.",
      formula: {
        label: "Right again after",
        latex: "t = \\dfrac{720}{\\text{drift per hour}} \\text{ hours}",
      },
      authoredExample: {
        prompt: "A clock gains 8 minutes every hour. After how many hours does it show the right time again?",
        steps: ["It must gain 12 hours, which is 720 minutes.", "\\(720 \\div 8 = 90\\) hours."],
        answer: "90 hours.",
      },
      selfCheckExample: {
        prompt: "Clock A gains 7 minutes an hour and clock B gains 3. Both are set right together. When do they next show the same time?",
        steps: ["Both gain, so the gap grows by \\(7 - 3 = 4\\) minutes an hour.", "\\(720 \\div 4 = 180\\) hours."],
        answer: "After 180 hours.",
      },
      practiceSet: [
        { prompt: "A clock loses 20 minutes an hour. After how many hours is it right again?", answer: "36 hours" },
        { prompt: "A clock gains 3 minutes an hour. After how many days is it right again?", answer: "10 days", method: "\\(720 \\div 3 = 240\\) hours." },
        { prompt: "One clock gains 2 minutes an hour and another loses 4. Set together, when do they show the same time again?", answer: "After 120 hours" },
      ],
      pyqExampleId: "e5d054ee-d931-4175-b24a-e814f28da072",
      traps: [
        {
          title: "An hour of gain is not enough",
          body: "A clock 60 minutes ahead shows the wrong hour. Only a gain of 12 hours, 720 minutes, brings both hands back to the right place.",
        },
        {
          title: "Both gain: subtract the rates",
          body: "Clocks gaining 5 and 3 minutes an hour pull apart by only 2 minutes an hour, so they match again after 360 hours, not \\(720 \\div 8 = 90\\).",
        },
      ],
    },
  ],
};
