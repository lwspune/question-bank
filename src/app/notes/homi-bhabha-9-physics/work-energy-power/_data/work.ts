import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_WE_WORK_NOTE: SubtopicNote = {
  subtopicName: "Work",
  title: "Work",
  oneLineDefinition:
    "Work is done when a force moves a body: it is positive when the force and the motion point the same way, negative when they point opposite ways, and zero when they are at right angles.",
  whyItMatters:
    "Four questions in the bank, all MODERATE: a force drawn against the motion of a block, why gravity does no work on a body moving in a circle, a match-the-columns table of 0°, 90° and 180°, and a coolie lifting a bag (the sign of gravity's work and the value of mgh). Each one is settled by the angle between the force and the motion.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9wewo-sign",
      name: "Work done by a force and its sign",
      intuition:
        "Push a trolley forward and it moves forward: your push does work. Friction pulls back on the same trolley while it moves forward: friction does work too, but against the motion, so it takes energy away and slows the trolley. A force at right angles to the motion neither speeds the body up nor slows it down, so it does no work at all.",
      definition:
        "- **Work** = force × displacement in the direction of the force: \\(W = Fs\\). For a force at an angle \\(\\theta\\) to the motion, \\(W = Fs\\cos\\theta\\).\n" +
        "- The SI unit of work is the **joule (J)**: 1 J is the work done when a force of 1 N moves a body 1 m along the force.\n" +
        "- **Angle 0°** (force along the motion): work is **positive**, \\(W = Fs\\). Example: gravity on a falling body.\n" +
        "- **Angle 180°** (force against the motion): work is **negative**, \\(W = -Fs\\). The body **slows down**. Examples: friction on a sliding box, gravity on a body moving up.\n" +
        "- **Angle 90°** (force at right angles to the motion): work is **zero**. Examples: gravity on a body moving along level ground, gravity on a satellite going round the Earth in a circle (the pull is towards the centre, the motion is along the circle).\n" +
        "- If there is no displacement, no work is done, however hard you push.",
      formula: {
        label: "Work",
        latex: "W = Fs \\qquad W = Fs\\cos\\theta",
        symbols: [
          { symbol: "W", meaning: "work done, in joules (J)" },
          { symbol: "F", meaning: "force, in newtons (N)" },
          { symbol: "s", meaning: "displacement, in metres (m)" },
          { symbol: "θ", meaning: "angle between the force and the displacement" },
        ],
      },
      authoredExample: {
        prompt: "A trolley is pushed 4 m along a level floor with a force of 30 N in the direction it moves. A friction force of 10 N acts against the motion. Find the work done by the push, by friction and by gravity.",
        steps: [
          "The push is along the motion: \\(W = 30 \\times 4 = 120\\) J, positive.",
          "Friction is against the motion: \\(W = -10 \\times 4 = -40\\) J, negative.",
          "Gravity pulls straight down while the trolley moves sideways, at 90°: its work is zero.",
        ],
        answer: "Push 120 J, friction \\(-40\\) J, gravity 0 J",
      },
      selfCheckExample: {
        prompt: "A man carries a suitcase and walks 10 m along a level railway platform. How much work does gravity do on the suitcase?",
        steps: ["Gravity acts straight down; the suitcase moves sideways.", "The force and the motion are at right angles."],
        answer: "Zero",
      },
      practiceSet: [
        { prompt: "A force of 20 N moves a box 5 m in the direction of the force. How much work does the force do?", answer: "\\(20 \\times 5 = 100\\) J" },
        { prompt: "What is the SI unit of work?", answer: "The joule (J), which is one newton × one metre" },
        { prompt: "A ball is thrown straight up. While it rises, is the work done on it by gravity positive, negative or zero?", answer: "Negative: gravity acts down while the ball moves up" },
        { prompt: "A moving car brakes and slows down. Is the work done on the car by the friction of the brakes positive or negative?", answer: "Negative: the force acts against the motion, so the car slows down" },
      ],
      pyqExampleId: "7b971136-f980-4418-b2ba-cb114ee0a54c",
      traps: [
        {
          title: "Thinking every force on a moving body does work",
          body: "A force at right angles to the motion does no work. Gravity does no work on a body moving along level ground or round a circle about the Earth.",
        },
        {
          title: "Thinking a force against the motion speeds the body up",
          body: "A force opposite to the displacement does negative work, takes energy away and slows the body down.",
        },
        {
          title: "Counting effort as work",
          body: "Pushing a wall that does not move does no work, because there is no displacement.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9wewo-gravity",
      name: "Work done against gravity in lifting",
      intuition:
        "To lift a load you must pull up with a force equal to its weight, mg. Moving it up a height h, you do work mg × h. Gravity pulls down the whole time while the load goes up, so gravity does the same amount of work but with a minus sign. The work you did is not lost: it is stored in the raised load as potential energy.",
      definition:
        "- The **weight** of a body of mass m is \\(mg\\), with \\(g = 9.8\\ \\mathrm{m/s^2}\\) (often taken as 10).\n" +
        "- Work done in **lifting** a body through a height h: \\(W = mgh\\). It is **positive** for the person or machine that lifts.\n" +
        "- Work done by **gravity** on the same rising body: \\(-mgh\\), **negative**.\n" +
        "- The work done in lifting is stored in the body as **potential energy**, \\(mgh\\).\n" +
        "- Only the **vertical height** counts, not the length of the path.",
      formula: {
        label: "Work against gravity",
        latex: "W = mgh",
        symbols: [
          { symbol: "m", meaning: "mass, in kg" },
          { symbol: "g", meaning: "acceleration due to gravity, 9.8 m/s² (or 10)" },
          { symbol: "h", meaning: "height lifted, in metres" },
        ],
      },
      authoredExample: {
        prompt: "A crane lifts a 200 kg steel beam through 12 m. Take g = 10 m/s². Find the work done by the crane, the work done by gravity and the potential energy gained by the beam.",
        steps: [
          "Weight of the beam: \\(200 \\times 10 = 2000\\) N.",
          "Work by the crane: \\(W = mgh = 2000 \\times 12 = 24000\\) J, positive.",
          "Gravity acts down while the beam goes up: its work is \\(-24000\\) J.",
          "The work done by the crane is stored as potential energy: 24 000 J.",
        ],
        answer: "Crane 24 000 J, gravity \\(-24000\\) J, potential energy 24 000 J",
      },
      selfCheckExample: {
        prompt: "A girl lifts a 2 kg book from the floor to a shelf 1.5 m high. How much work does she do? Take g = 9.8 m/s².",
        steps: ["\\(W = mgh = 2 \\times 9.8 \\times 1.5 = 29.4\\) J."],
        answer: "29.4 J",
      },
      practiceSet: [
        { prompt: "How much work is done in lifting a 10 kg bag through 3 m? Take g = 10 m/s².", answer: "\\(10 \\times 10 \\times 3 = 300\\) J" },
        { prompt: "A 5 kg box is lifted through 2 m. How much work does gravity do on the box? Take g = 10 m/s².", answer: "\\(-100\\) J (negative, because the box moves up against gravity)" },
        { prompt: "A porter carries a 20 kg load up 4 m of stairs. How much potential energy does the load gain? Take g = 9.8 m/s².", answer: "\\(20 \\times 9.8 \\times 4 = 784\\) J" },
        { prompt: "What is the weight of a body of mass 6 kg? Take g = 9.8 m/s².", answer: "\\(6 \\times 9.8 = 58.8\\) N" },
      ],
      pyqExampleId: "ea28b491-1358-4de0-8041-c7ae3604fbfe",
      traps: [
        {
          title: "Using the mass in place of the weight",
          body: "The lifting force is the weight, mg. Lifting a 50 kg sack through 2 m takes \\(50 \\times 9.8 \\times 2 = 980\\) J, not \\(50 \\times 2 = 100\\) J.",
        },
        {
          title: "Calling gravity's work positive when a load is lifted",
          body: "The load goes up and gravity pulls down, so the work done by gravity is negative. Only the lifter's work is positive.",
        },
        {
          title: "Using the length of a slope as the height",
          body: "Work against gravity depends only on how far the body rises straight up, whatever path it takes.",
        },
      ],
    },
  ],
};
