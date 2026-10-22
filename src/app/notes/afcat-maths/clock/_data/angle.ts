import type { SubtopicNote } from "@/app/notes/_types";

export const AF_CL_ANGLE_NOTE: SubtopicNote = {
  subtopicName: "Angle Between the Hands",
  title: "The Angle Between the Hands at a Given Time",
  oneLineDefinition:
    "Place each hand in degrees from 12 and subtract: the shortcut is the size of 30 times the hour minus 5.5 times the minutes, and the answer is the smaller of the two angles.",
  whyItMatters:
    "This is the chapter's largest page and mostly EASY: a time is given and the angle is asked. Marks go in two places, forgetting that the hour hand has moved past its number, and giving the angle the long way round when the formula comes out above 180°.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afcl-whole-hours",
      name: "The angle on the hour",
      intuition:
        "On the hour the minute hand points at 12 and the hour hand sits exactly on its number. Neighbouring numbers are \\(30°\\) apart, so count the gaps the short way round and multiply by 30.",
      definition:
        "- At \\(h\\) o'clock the angle is \\(30h\\), or \\(360 - 30h\\) when \\(30h\\) is more than 180.\n" +
        "- The short way from 9 to 12 is 3 gaps, so 9:00 is \\(90°\\), the same as 3:00.\n" +
        "- 6:00 is the only hour when the hands form a straight angle, and 12:00 the only one when they coincide.",
      formula: {
        label: "On the hour",
        latex: "\\theta = 30h \\;\\text{ or }\\; 360 - 30h",
      },
      authoredExample: {
        prompt: "Find the angle between the hands at 5:00 and at 10:00.",
        steps: [
          "5:00: 5 gaps, so \\(5 \\times 30 = 150°\\).",
          "10:00: 10 gaps one way and 2 the other. The angle is the smaller, \\(2 \\times 30 = 60°\\).",
        ],
        answer: "\\(150°\\) and \\(60°\\).",
      },
      selfCheckExample: {
        prompt: "At which two whole hours are the hands at right angles?",
        steps: ["A right angle is 3 gaps of \\(30°\\).", "The hour hand is 3 gaps from 12 at 3 and at 9."],
        answer: "3:00 and 9:00.",
      },
      practiceSet: [
        { prompt: "Find the angle between the hands at 1:00.", answer: "\\(30°\\)" },
        { prompt: "Find the angle between the hands at 6:00.", answer: "\\(180°\\)" },
        { prompt: "Find the angle between the hands at 2:00.", answer: "\\(60°\\)" },
      ],
      pyqExampleId: "8ffdd9c0-5467-427a-ae1c-a1891a25b739",
      traps: [
        {
          title: "Count the short way",
          body: "At 11:00 the hour hand is 11 gaps from 12 one way but only 1 the other. The angle between the hands is \\(30°\\), not \\(330°\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-angle-formula",
      visualizationSlug: "af-clock-angle",
      name: "The angle at any time",
      intuition:
        "Place each hand by how far it has turned from 12: the hour hand \\(30h + 0.5m\\), the minute hand \\(6m\\). The angle is the difference, and the two combine into one line, \\(|30h - 5.5m|\\).",
      definition:
        "- Hour hand at \\(h{:}m\\): \\(30h + 0.5m\\) degrees from 12. Minute hand: \\(6m\\) degrees.\n" +
        "- Angle \\(= |30h - 5.5m|\\). The 5.5 is the relative speed from the first page.\n" +
        "- At half past, the hour hand is exactly halfway between two numbers, \\(15°\\) past the first.\n" +
        "- Each minute changes the angle by \\(5.5°\\), so a minute misread moves the answer by \\(5.5°\\).",
      formula: {
        label: "Angle between the hands",
        latex: "\\theta = |30h - 5.5m|",
      },
      authoredExample: {
        prompt: "Find the angle between the hands at 3:40.",
        steps: [
          "Hour hand: \\(3 \\times 30 + 40 \\times 0.5 = 110°\\). Minute hand: \\(40 \\times 6 = 240°\\).",
          "Difference: \\(240 - 110 = 130°\\).",
          "By the formula: \\(|90 - 220| = 130°\\).",
        ],
        answer: "\\(130°\\).",
      },
      selfCheckExample: {
        prompt: "Find the angle between the hands at 4:50.",
        steps: ["\\(|30 \\times 4 - 5.5 \\times 50| = |120 - 275| = 155°\\)."],
        answer: "\\(155°\\).",
      },
      practiceSet: [
        { prompt: "Find the angle between the hands at 1:20.", answer: "\\(80°\\)" },
        { prompt: "Find the angle between the hands at 6:12.", answer: "\\(114°\\)" },
        { prompt: "Find the angle between the hands at 9:24.", answer: "\\(138°\\)" },
        { prompt: "Find the angle between the hands at 7:06.", answer: "\\(177°\\)" },
      ],
      pyqExampleId: "2df41a70-6be7-4a37-b0a8-a4fb335c86a9",
      traps: [
        {
          title: "The hour hand has moved",
          body: "At 5:40 the hour hand is \\(20°\\) past the 5, at \\(170°\\). Taking it at \\(150°\\) gives \\(90°\\) instead of the true \\(70°\\).",
        },
        {
          title: "Half past is not on the number",
          body: "At 7:30 the hour hand is halfway between 7 and 8, at \\(225°\\). The angle is \\(|210 - 165| = 45°\\), not \\(30°\\).",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-reflex",
      name: "Above 180°: the smaller angle and the reflex angle",
      intuition:
        "Two hands make two angles that add up to \\(360°\\). A question means the smaller one unless it says reflex. When \\(|30h - 5.5m|\\) comes out above 180, subtract it from 360.",
      definition:
        "- Smaller angle \\(= \\theta\\) if \\(\\theta \\le 180\\), otherwise \\(360 - \\theta\\).\n" +
        "- Reflex angle \\(= 360 -\\) the smaller angle, always above \\(180°\\).\n" +
        "- At 12 and some minutes, take \\(h = 0\\) or \\(h = 12\\): one gives each of the two angles, and the smaller is the answer either way.",
      formula: {
        label: "Smaller and reflex angle",
        latex: "\\theta_{\\text{small}} = \\min(\\theta,\\ 360 - \\theta), \\qquad \\theta_{\\text{reflex}} = 360 - \\theta_{\\text{small}}",
      },
      authoredExample: {
        prompt: "Find the angle between the hands at 11:05, and the reflex angle.",
        steps: [
          "\\(|330 - 27.5| = 302.5°\\), which is more than 180.",
          "Smaller angle: \\(360 - 302.5 = 57.5°\\).",
          "Reflex angle: \\(302.5°\\).",
        ],
        answer: "\\(57.5°\\); reflex \\(302.5°\\).",
      },
      selfCheckExample: {
        prompt: "Find the angle between the hands at 12:35.",
        steps: ["With \\(h = 0\\): \\(5.5 \\times 35 = 192.5°\\), more than 180.", "\\(360 - 192.5 = 167.5°\\)."],
        answer: "\\(167.5°\\).",
      },
      practiceSet: [
        { prompt: "Find the angle between the hands at 9:05.", answer: "\\(117.5°\\)", method: "\\(|270 - 27.5| = 242.5\\)." },
        { prompt: "Find the angle between the hands at 12:50.", answer: "\\(85°\\)" },
        { prompt: "Find the reflex angle between the hands at 1:30.", answer: "\\(225°\\)", method: "The smaller angle is \\(135°\\)." },
      ],
      pyqExampleId: "9692fb62-656c-4efe-b223-9a7e7c68d672",
      traps: [
        {
          title: "Above 180 is the long way round",
          body: "At 12:44 the formula gives \\(242°\\). The hands are \\(118°\\) apart the short way; \\(242°\\) is the reflex angle, the answer only when the question asks for it.",
        },
        {
          title: "Reflex is 360 minus the smaller angle",
          body: "If the smaller angle is \\(70°\\), the reflex angle is \\(290°\\). Adding 180 gives \\(250°\\), which is neither angle.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afcl-compare-angles",
      name: "Naming, comparing and changing angles",
      intuition:
        "These questions need two facts, not one: an angle and its type, or the angles at two times. Work each angle with the formula, then name it, compare the two, or subtract.",
      definition:
        "- **Acute**: under \\(90°\\). **Right**: exactly \\(90°\\). **Obtuse**: between \\(90°\\) and \\(180°\\). **Straight**: \\(180°\\).\n" +
        "- Which time has the smaller angle: find both angles. Times that look alike can give very different angles.\n" +
        "- The change in the angle between two times is the difference of the two angles.",
      formula: {
        label: "Change in the angle",
        latex: "\\Delta\\theta = |\\theta_2 - \\theta_1|",
      },
      authoredExample: {
        prompt:
          "Is the angle between the hands at 4:40 acute or obtuse? By how many degrees does the angle change from 8:05 to 8:25?",
        steps: [
          "4:40: \\(|120 - 220| = 100°\\), so the angle is obtuse.",
          "8:05: \\(|240 - 27.5| = 212.5\\), so the angle is \\(147.5°\\). 8:25: \\(|240 - 137.5| = 102.5°\\).",
          "Change: \\(147.5 - 102.5 = 45°\\).",
        ],
        answer: "Obtuse (\\(100°\\)); \\(45°\\).",
      },
      selfCheckExample: {
        prompt: "Which has the smaller angle between the hands, 1:15 or 1:45?",
        steps: [
          "1:15: \\(|30 - 82.5| = 52.5°\\).",
          "1:45: \\(|30 - 247.5| = 217.5\\), so the angle is \\(142.5°\\).",
        ],
        answer: "1:15.",
      },
      practiceSet: [
        { prompt: "Is the angle between the hands at 10:20 acute, right or obtuse?", answer: "Obtuse (\\(170°\\))" },
        { prompt: "Which has the smaller angle between the hands, 9:10 or 9:50?", answer: "9:50 (\\(5°\\) against \\(145°\\))" },
        { prompt: "By how many degrees does the angle between the hands change from 6:05 to 6:15?", answer: "\\(55°\\)", method: "\\(152.5°\\) and \\(97.5°\\)." },
      ],
      pyqExampleId: "6394e909-b118-4d8e-915b-372368b2e040",
      traps: [
        {
          title: "Work the angles, do not judge the times",
          body: "6:15 and 6:45 look alike, but the angles are \\(97.5°\\) and \\(67.5°\\): one obtuse, one acute.",
        },
        {
          title: "Near 90 still needs the exact value",
          body: "An angle of \\(87.5°\\) is acute even though it is close to a right angle. Name the type from the worked value, never from a rough picture.",
        },
      ],
    },
  ],
};
