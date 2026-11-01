import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FKM_MOTION_NOTE: SubtopicNote = {
  subtopicName: "Kinds of Motion and Rotation",
  title: "Kinds of Motion and Rotation",
  oneLineDefinition:
    "Kinds of motion with an example of each, centripetal acceleration, and how angular velocity and moment of inertia behave in a rigid body.",
  whyItMatters:
    "Five questions in the bank: one from the 2023 shifts and two each from the 2024 and 2025 shifts. Each tests one definition, so the two tables answer them.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscfkmmo-kinds",
      name: "Kinds of motion",
      intuition:
        "Motion is named by its path and whether it repeats. SSC pairs each kind with an example and slips in one wrong pair.",
      definition:
        "The kinds:\n" +
        "- **Translatory**: the whole body moves along a line, as a falling ball.\n" +
        "- **Rotatory**: turning about an axis, as **fan blades**.\n" +
        "- **Periodic**: repeating at fixed intervals, as **clock hands** or the Earth round the Sun.\n" +
        "- **Oscillatory**: to and fro about a mean position, as a **pendulum**.\n" +
        "- **Curvilinear**: along a curved path, as a thrown **javelin**. Rectilinear is along a straight line.",
      table: {
        columns: ["Kind", "Example"],
        rows: [
          { cells: ["Rotatory", "Fan blades"] },
          { cells: ["Periodic", "Earth round the Sun"] },
          { cells: ["Oscillatory", "Pendulum"] },
          { cells: ["Curvilinear", "Thrown javelin"], pyqExampleId: "1444888c-61e2-4fc4-8291-27492b661175" },
        ],
      },
      pyqExampleId: "9d2c8041-cc3c-4517-8b62-0f9501e6343e",
      selfCheckExample: {
        prompt: "A ball falls straight down from a cliff. Is its motion curvilinear or rectilinear?",
        steps: ["It moves along a straight vertical line.", "Straight-line motion is rectilinear (and translatory)."],
        answer: "Rectilinear.",
      },
      practiceSet: [
        { prompt: "What kind of motion does a pendulum show?", answer: "Oscillatory" },
        { prompt: "What kind of motion do fan blades show?", answer: "Rotatory" },
        { prompt: "Is the Earth's orbit oscillatory?", answer: "No; it is periodic" },
      ],
      traps: [
        {
          title: "An orbit is not oscillation",
          body: "The Earth round the Sun **repeats**, so it is **periodic**, but it does not swing to and fro. Calling it oscillatory is the wrong pair.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfkmmo-rotation",
      name: "Circular motion and rotation",
      intuition:
        "In a spinning rigid body every point turns through the same angle in the same time. Points farther out move faster along their circles.",
      definition:
        "The facts:\n" +
        "- **Centripetal acceleration** a = v squared / R, where v is the **speed** along the circle.\n" +
        "- In a rigid body every particle has the **same angular velocity**; linear speed v = (angular velocity) x r grows with distance.\n" +
        "- **Moment of inertia** I = sum of m r squared: a **scalar** that **depends on the axis**.",
      table: {
        columns: ["Quantity", "Fact"],
        rows: [
          { cells: ["v in v squared / R", "Speed"], pyqExampleId: "ed57a20c-c8b0-4456-bf65-abd00932ab84" },
          { cells: ["Moment of inertia", "Scalar, depends on the axis"], pyqExampleId: "04985b93-e804-427e-92d7-165fd74eb8fc" },
          { cells: ["Angular velocity in a rigid body", "Same for all particles"] },
        ],
      },
      pyqExampleId: "0ada1a0e-1e13-451f-95b1-4998f3367213",
      selfCheckExample: {
        prompt: "A car takes a bend of radius 50 m at 10 m/s. What is its centripetal acceleration?",
        steps: ["a = v squared / R.", "100 / 50 = 2 m/s squared."],
        answer: "2 m/s squared.",
      },
      practiceSet: [
        { prompt: "Is moment of inertia a scalar or a vector?", answer: "A scalar" },
        { prompt: "Does moment of inertia change with the axis?", answer: "Yes" },
        { prompt: "On a spinning wheel, which point moves fastest?", answer: "The point on the rim" },
      ],
      traps: [
        {
          title: "Same angle, different speed",
          body: "**Angular** velocity is the same everywhere in a rigid body. Only the **linear** speed grows with distance from the axis.",
        },
      ],
    },
  ],
};
