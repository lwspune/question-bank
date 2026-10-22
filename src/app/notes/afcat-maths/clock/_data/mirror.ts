import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CL_MIRROR_NOTE: SubtopicNote = {
  subtopicName: "Mirror Images",
  title: "Mirror Images of a Clock",
  oneLineDefinition:
    "A mirror standing beside a clock swaps left and right, so the image time is 11:60 minus the real time, and the same subtraction takes an image back to the real time.",
  whyItMatters:
    "Every question here is one subtraction from 11:60, and it works in both directions. The marks go at the edges: times after 11 o'clock that come out as 0 hours, and questions that move the clock on before or after the reflection.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afcl-mirror-rule",
      visualizationSlug: "af-clock-mirror",
      name: "The image time is 11:60 minus the real time",
      intuition:
        "A plane mirror flips the dial across the line from 12 to 6. A hand that points some distance round from 12 on the right of the dial appears the same distance round from 12 on the left, so the real time and the image time always add up to 12 hours.",
      definition:
        "- Image time \\(= 11{:}60 -\\) real time. Writing 12:00 as 11:60 lets you subtract without borrowing.\n" +
        "- Check: real time plus image time is always 12:00.\n" +
        "- On the hour: \\(11{:}60 - 2{:}00 = 9{:}60\\), which is written 10:00.\n" +
        "- 6:00 and 12:00 look the same in the mirror.",
      formula: {
        label: "Mirror time",
        latex: "\\text{image} = 11{:}60 - \\text{real time}",
      },
      authoredExample: {
        prompt: "A clock shows 3:25. What time does its mirror image show?",
        steps: [
          "\\(11{:}60 - 3{:}25\\): minutes \\(60 - 25 = 35\\), hours \\(11 - 3 = 8\\).",
          "Check: \\(3{:}25 + 8{:}35 = 12{:}00\\).",
        ],
        answer: "8:35.",
      },
      selfCheckExample: {
        prompt: "What time does the mirror image of a clock showing 5:48 show?",
        steps: ["\\(11{:}60 - 5{:}48 = 6{:}12\\).", "Check: \\(5{:}48 + 6{:}12 = 12{:}00\\)."],
        answer: "6:12.",
      },
      practiceSet: [
        { prompt: "Find the mirror image of 1:05.", answer: "10:55" },
        { prompt: "Find the mirror image of 4:15.", answer: "7:45" },
        { prompt: "Find the mirror image of 10:35.", answer: "1:25" },
      ],
      pyqExampleId: "e5eaf941-bfb5-4a5a-be0e-d31c37e42d7b",
      traps: [
        {
          title: "Subtract from 11:60, not 12:00",
          body: "Subtracting 2:40 from 12:00 digit by digit tempts you to 10:20. With 11:60 there is nothing to borrow: \\(11{:}60 - 2{:}40 = 9{:}20\\).",
        },
        {
          title: "60 minutes is the next hour",
          body: "\\(11{:}60 - 5{:}00 = 6{:}60\\), which a clock shows as 7:00. Writing 6:60 as the answer matches no option.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-mirror-reverse",
      name: "Finding the real time from the image",
      intuition:
        "Reflecting twice gives back the original, so the rule runs both ways. Subtract the image time from 11:60 and you have the real time.",
      definition:
        "- Real time \\(= 11{:}60 -\\) image time.\n" +
        "- The same check: real plus image is 12:00.\n" +
        "- 'The reflection shows', 'seen in a mirror' and 'the image appears as' all give the image; the answer asked is the real time.",
      formula: {
        label: "Real time from the image",
        latex: "\\text{real} = 11{:}60 - \\text{image}",
      },
      authoredExample: {
        prompt: "A clock seen in a mirror appears to show 2:35. What is the real time?",
        steps: ["\\(11{:}60 - 2{:}35 = 9{:}25\\).", "Check: \\(9{:}25 + 2{:}35 = 12{:}00\\)."],
        answer: "9:25.",
      },
      selfCheckExample: {
        prompt: "The mirror image of a clock shows 6:50. What is the real time?",
        steps: ["\\(11{:}60 - 6{:}50 = 5{:}10\\)."],
        answer: "5:10.",
      },
      practiceSet: [
        { prompt: "The mirror image of a clock shows 4:05. What is the real time?", answer: "7:55" },
        { prompt: "The mirror image of a clock shows 8:45. What is the real time?", answer: "3:15" },
        { prompt: "The mirror image of a clock shows 1:50. What is the real time?", answer: "10:10" },
      ],
      pyqExampleId: "8a6e6da0-0fa0-44d4-a4cc-7bdeb9f75bdd",
      traps: [
        {
          title: "The image is not 6 hours off",
          body: "An image of 1:20 is not 7:20 in real time. Only 12:00 minus the image works: \\(11{:}60 - 1{:}20 = 10{:}40\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-mirror-edge",
      name: "Times after 11, time passing and other twists",
      intuition:
        "The rule stays the same; the work is around it. After 11 o'clock the subtraction gives 0 hours, which a dial shows as 12. When time passes, move the real clock, never the image.",
      definition:
        "- A result of \\(0{:}m\\) is read as \\(12{:}m\\). A time of \\(12{:}m\\) is read as \\(0{:}m\\) before subtracting.\n" +
        "- Time passing: find the real time first, add or subtract the time passed, then reflect again only if the image is asked.\n" +
        "- A real time between \\(h\\) and \\(h + 1\\) has its image between \\(11 - h\\) and \\(12 - h\\), so a time and its image are never in the same hour, except at exactly 6:00 and 12:00.\n" +
        "- A 24-hour version of the rule subtracts from 23:60 instead of 11:60.",
      formula: {
        label: "Reading 0 hours",
        latex: "11{:}60 - 11{:}m = 0{:}(60 - m) = 12{:}(60 - m)",
      },
      authoredExample: {
        prompt: "A clock shows 11:20. What does its mirror image show? If an image shows 12:20, what is the real time?",
        steps: [
          "\\(11{:}60 - 11{:}20 = 0{:}40\\), which the dial shows as 12:40.",
          "Read 12:20 as 0:20: \\(11{:}60 - 0{:}20 = 11{:}40\\).",
        ],
        answer: "12:40; 11:40.",
      },
      selfCheckExample: {
        prompt: "An hour and a half ago, the mirror image of a clock showed 4:10. What is the real time now?",
        steps: ["Real time then: \\(11{:}60 - 4{:}10 = 7{:}50\\).", "Add 1 hour 30 minutes: 9:20."],
        answer: "9:20.",
      },
      practiceSet: [
        { prompt: "Find the mirror image of 11:35.", answer: "12:25" },
        { prompt: "The mirror image of a clock shows 12:05. What is the real time?", answer: "11:55" },
        { prompt: "Using the 24-hour rule (23:60 minus the time), find the real time whose image is 16:35.", answer: "7:25" },
      ],
      pyqExampleId: "c364c53a-6e73-4361-b9b3-741161e24be6",
      traps: [
        {
          title: "Move the real clock, not the image",
          body: "Two hours ago the image showed 3:10, so the real time then was 8:50 and now it is 10:50. Adding the two hours to the image first gives 5:10, whose reflection is 6:50: wrong, because the image runs backwards.",
        },
        {
          title: "There is no 0 on the dial",
          body: "\\(11{:}60 - 11{:}50\\) is 0:10, which a 12-hour dial shows as 12:10.",
        },
      ],
    },
  ],
};
