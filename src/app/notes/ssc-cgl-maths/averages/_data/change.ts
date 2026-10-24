import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_AV_CHANGE_NOTE: SubtopicNote = {
  subtopicName: "Members Joining and Leaving",
  title: "Members Joining and Leaving",
  oneLineDefinition:
    "When one member joins or leaves, the change in the total tells you that member's value, and the change in the total is the count times the change in the average.",
  whyItMatters:
    "Twenty questions in the bank, all EASY and sixteen of them from 2025: a new innings, a new student, a supervisor added, one number removed. The full method takes four lines; the fast route below takes one, and that saving matters at about 36 seconds a question.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "sscavch-join",
      name: "A new member joins the group",
      intuition:
        "The newcomer has to bring the old average for themselves, plus enough extra to lift every member of the new group, themselves included, by the rise. If the average falls, the newcomer brought less than the old average.",
      definition:
        "- **Full method:** newcomer \\(=\\) new total \\(-\\) old total \\(= (n + 1)A' - nA\\), where \\(n\\) members had average \\(A\\) and the \\(n + 1\\) members now have average \\(A'\\).\n" +
        "- **Fast route:** newcomer \\(= A + (n + 1) \\times \\) rise. The rise is \\(A' - A\\); it is negative if the average falls.\n" +
        "- The same value from the new average: newcomer \\(= A' + n \\times \\) rise. Both forms are right; mixing them is the usual slip.\n" +
        "- **New average after a known newcomer \\(x\\):** \\(A' = A + \\frac{x - A}{n + 1}\\). The newcomer's distance from the old average is shared by all \\(n + 1\\).\n" +
        "- **Unknown old count:** the newcomer's excess over the new average equals \\(n \\times\\) rise, so \\(n = \\frac{x - A'}{A' - A}\\).",
      formula: {
        label: "A member joins",
        latex: "x = A + (n + 1)(A' - A) \\qquad A' = A + \\frac{x - A}{n + 1}",
        symbols: [
          { symbol: "n", meaning: "number of members before the newcomer joins" },
          { symbol: "A", meaning: "average before" },
          { symbol: "A'", meaning: "average after" },
          { symbol: "x", meaning: "the newcomer's value" },
        ],
      },
      authoredExample: {
        prompt: "A batsman's average over 14 innings is 36 runs. How many runs must he score in the 15th innings to raise his average to 38?",
        steps: [
          "Full method: new total \\(= 15 \\times 38 = 570\\); old total \\(= 14 \\times 36 = 504\\).",
          "Runs needed \\(= 570 - 504 = 66\\).",
          "Fast route: the rise is 2 for all 15 innings, so he needs \\(36 + 15 \\times 2 = 66\\).",
        ],
        answer: "66 runs",
      },
      selfCheckExample: {
        prompt: "A shop's average daily sale over some days is ₹900. A sale of ₹1,500 on the next day raises the average to ₹950. Over how many days was the ₹900 average taken?",
        steps: [
          "The new day's excess over the new average is \\(1500 - 950 = 550\\).",
          "That excess equals the old count times the rise: \\(550 = n \\times 50\\), so \\(n = 11\\).",
          "Check: \\(11 \\times 900 + 1500 = 11400 = 12 \\times 950\\).",
        ],
        answer: "11 days",
      },
      practiceSet: [
        {
          prompt: "The average of 9 numbers is 20. A tenth number is added and the average becomes 21. What is the tenth number?",
          answer: "30",
          method: "\\(20 + 10 \\times 1 = 30\\).",
        },
        {
          prompt: "The average weight of 5 boxes is 12 kg. A box of 18 kg is added. What is the new average weight?",
          answer: "13 kg",
          method: "\\(12 + \\frac{18 - 12}{6} = 13\\).",
        },
        {
          prompt: "A class of 30 students has an average of 50 marks. A new student joins and the average falls to 49. What did the new student score?",
          answer: "19",
          method: "\\(50 + 31 \\times (-1) = 19\\).",
        },
        { prompt: "The average of 7 test scores is 60. What score in an 8th test keeps the average at 60?", answer: "60" },
      ],
      pyqExampleId: "d44d0267-48a7-40b8-8888-2070af8c1f9d",
      traps: [
        {
          title: "Multiplying the rise by the wrong count",
          body:
            "Starting from the old average, the newcomer must lift all \\(n + 1\\) members, so the extra is \\((n + 1) \\times\\) rise. Starting from the new average, it is \\(n \\times\\) rise. Using \\(n\\) with the old average is short by exactly one rise.",
        },
        {
          title: "Taking the new average as the newcomer's value",
          body:
            "If the average rises after someone joins, the newcomer is above the new average, not equal to it. Only when the average does not change is the newcomer equal to it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "sscavch-leave",
      name: "A member leaves the group",
      intuition:
        "If the average falls when someone leaves, the leaver was above it and took more than their share away. Every member who stays is down by the fall, and the leaver carried that total away on top of the old average.",
      definition:
        "- **Full method:** leaver \\(=\\) old total \\(-\\) new total \\(= nA - (n - 1)A'\\).\n" +
        "- **Fast route:** leaver \\(= A + (n - 1) \\times \\) fall, where the fall is \\(A - A'\\). Only the \\(n - 1\\) who stay carry the new average, so multiply by \\(n - 1\\). From the new average instead: leaver \\(= A' + n \\times \\) fall.\n" +
        "- If the average **rises** when someone leaves, the fall is negative and the leaver was below the old average.\n" +
        "- **Several leave:** the leavers' total \\(= nA - (n - k)A'\\), and their average is that total \\(\\div k\\).\n" +
        "- **Average of those who stay** after known values are removed: (old total \\(-\\) removed values) \\(\\div\\) the number left. Removing values that average exactly \\(A\\) leaves the average at \\(A\\).",
      formula: {
        label: "A member leaves",
        latex: "x = A + (n - 1)(A - A') \\qquad \\text{Leavers' total} = nA - (n - k)A'",
        symbols: [
          { symbol: "n", meaning: "number of members before anyone leaves" },
          { symbol: "k", meaning: "number who leave" },
          { symbol: "A", meaning: "average before" },
          { symbol: "A'", meaning: "average of those who stay" },
        ],
      },
      authoredExample: {
        prompt: "The average of 16 numbers is 30. One number is removed and the average of the rest is 29. Find the number removed.",
        steps: [
          "Full method: old total \\(= 16 \\times 30 = 480\\); new total \\(= 15 \\times 29 = 435\\).",
          "Number removed \\(= 480 - 435 = 45\\).",
          "Fast route: each of the 15 who stay fell by 1, so the removed number is \\(30 + 15 \\times 1 = 45\\).",
        ],
        answer: "45",
      },
      selfCheckExample: {
        prompt: "The average weight of 20 bags is 25 kg. When 5 bags are taken away, the remaining bags average 24 kg. What is the average weight of the 5 bags taken away?",
        steps: [
          "Old total \\(= 500\\) kg; the 15 left weigh \\(15 \\times 24 = 360\\) kg.",
          "The 5 bags weigh \\(500 - 360 = 140\\) kg, an average of \\(28\\) kg.",
          "Fast route: \\(25 + \\frac{15 \\times 1}{5} = 28\\).",
        ],
        answer: "28 kg",
      },
      practiceSet: [
        {
          prompt: "The average of 6 numbers is 10. One number is dropped and the other 5 average 11. What number was dropped?",
          answer: "5",
          method: "\\(60 - 55 = 5\\): the average rose, so the dropped number was below 10.",
        },
        { prompt: "The average of 8 scores is 40. The lowest score, 12, is removed. What is the average of the other 7?", answer: "44" },
        { prompt: "The average of 10 values is 50. Two values, 45 and 55, are removed. What is the average of the remaining 8?", answer: "50" },
        { prompt: "The average of 12 numbers is 20. One number is removed and the average stays 20. What number was removed?", answer: "20" },
      ],
      pyqExampleId: "c09dcffd-6056-4103-a8dd-d174e04d743f",
      traps: [
        {
          title: "Multiplying the fall by the old count",
          body:
            "When someone leaves, only the members who stay carry the new average. From the old average, the leaver is old average plus \\((n - 1) \\times\\) fall, not \\(n \\times\\) fall. The \\(n \\times\\) fall form belongs with the new average.",
        },
        {
          title: "Thinking a fall means the leaver was low",
          body:
            "If the average falls after someone leaves, the leaver was above the old average: removing a high value pulls the average down.",
        },
      ],
    },
  ],
};
