import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_KI_PLANE_NOTE: SubtopicNote = {
  subtopicName: "Motion in a Plane",
  title: "Motion in a Plane",
  oneLineDefinition:
    "Adding vectors and splitting them into components, a body falling or launched sideways under gravity, and why uniform circular motion is accelerated.",
  whyItMatters:
    "Eight CDS questions from 2018 (II) to 2026 (II), and all three of the chapter's HARD questions are here: spherical polar components, the velocity and acceleration of a position vector, and the largest and smallest resultant of four forces.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsphki-vectors",
      name: "Adding vectors and resolving them",
      intuition:
        "A vector has a size and a direction, so two vectors cannot simply be added as numbers. Two forces pulling the same way add fully; pulling opposite ways, they cancel as far as they can; at right angles, the resultant is the slanting side of a right triangle. Any vector can also be split into parts along the x, y and z axes, and those parts can be added axis by axis.",
      definition:
        "Rules for vectors:\n" +
        "- Resultant of \\(A\\) and \\(B\\) at angle \\(\\theta\\): \\(R = \\sqrt{A^{2} + B^{2} + 2AB\\cos\\theta}\\).\n" +
        "- \\(R\\) is largest, \\(A + B\\), at \\(\\theta = 0°\\); smallest, \\(|A - B|\\), at \\(\\theta = 180°\\); \\(\\sqrt{A^{2} + B^{2}}\\) at 90°.\n" +
        "- So for any angle other than 0°, \\(|\\vec{A} + \\vec{B}| < |\\vec{A}| + |\\vec{B}|\\).\n" +
        "- **Components** in a plane: a vector of size \\(P\\) at angle \\(\\phi\\) to the x-axis has \\(P\\cos\\phi\\) along x and \\(P\\sin\\phi\\) along y.\n" +
        "- In **spherical polar** form (polar angle \\(\\theta\\) from the z-axis, azimuth \\(\\alpha\\) from the x-axis): \\(P_x = P\\sin\\theta\\cos\\alpha\\), \\(P_y = P\\sin\\theta\\sin\\alpha\\), \\(P_z = P\\cos\\theta\\).\n" +
        "- **Velocity** is the rate of change of the position vector and **acceleration** the rate of change of velocity: differentiate each component separately. A constant component disappears.",
      formula: {
        label: "Resultant of two vectors",
        latex:
          "R = \\sqrt{A^{2} + B^{2} + 2AB\\cos\\theta} \\qquad |A - B| \\le R \\le A + B \\qquad \\vec{v} = \\dfrac{d\\vec{r}}{dt}, \\ \\vec{a} = \\dfrac{d\\vec{v}}{dt}",
        symbols: [
          { symbol: "A, B", meaning: "sizes of the two vectors" },
          { symbol: "θ", meaning: "angle between them" },
          { symbol: "R", meaning: "size of the resultant" },
        ],
      },
      authoredExample: {
        prompt: "Forces of 5 N and 12 N act on a body. Find the resultant when they act along the same line in the same direction, in opposite directions, and at right angles.",
        steps: [
          "Same direction (\\(\\theta = 0°\\)): \\(R = 5 + 12 = 17\\) N.",
          "Opposite directions (\\(\\theta = 180°\\)): \\(R = 12 - 5 = 7\\) N.",
          "At right angles (\\(\\theta = 90°\\)): \\(R = \\sqrt{5^{2} + 12^{2}} = \\sqrt{169} = 13\\) N.",
        ],
        answer: "17 N, 7 N and 13 N. Any other angle gives a value between 7 N and 17 N.",
      },
      selfCheckExample: {
        prompt: "The position of a particle is \\(\\vec{r} = 5t\\,\\hat{x} + 2t^{2}\\,\\hat{z}\\). In which direction is its acceleration?",
        steps: [
          "Velocity: differentiate each part. \\(\\vec{v} = 5\\,\\hat{x} + 4t\\,\\hat{z}\\).",
          "Acceleration: differentiate again. The constant 5 disappears, leaving \\(\\vec{a} = 4\\,\\hat{z}\\).",
        ],
        answer: "Along the z-axis.",
      },
      pyqExampleId: "c5b7df3c-a48b-4919-8da7-3cdc2af9210e",
      practiceSet: [
        { prompt: "A force of 10 N makes an angle of 30° with the x-axis in the xy-plane. What are its x and y components?", answer: "\\(5\\sqrt{3}\\) N along x and 5 N along y" },
        { prompt: "Two forces of 4 N and 7 N act on a body. What are the largest and the smallest possible resultants?", answer: "11 N and 3 N" },
        { prompt: "Two equal forces of 6 N act at right angles. What is their resultant?", answer: "\\(6\\sqrt{2}\\) N" },
        { prompt: "In spherical polar coordinates, which component of a vector of size P equals \\(P\\cos\\theta\\)?", answer: "The z-component" },
      ],
      traps: [
        {
          title: "Sizes add only when the directions match",
          body: "\\(|\\vec{A}| + |\\vec{B}|\\) equals \\(|\\vec{A} + \\vec{B}|\\) only at 0°. At any other angle the resultant is **smaller** than the sum of the sizes, never larger.",
        },
        {
          title: "Combine forces along one line first",
          body: "When several forces act along two perpendicular lines, first add the forces on each line (same way: add; opposite ways: subtract). Only then join the two line totals with Pythagoras.",
        },
        {
          title: "sin and cos swap with the angle you measure from",
          body: "Measured from the **x-axis**, the x-part uses cos and the y-part sin. Measured from the **z-axis** (the polar angle), the z-part uses cos and the part in the xy-plane uses sin.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphki-free-fall",
      name: "Free fall and horizontal launch",
      intuition:
        "Near the earth every falling body speeds up by the same amount each second: its acceleration g stays the same all the way down. A ball thrown sideways falls exactly like a ball simply dropped, because gravity pulls only downward and does nothing to the sideways motion. So both reach the ground together, and the sideways speed only decides how far away the ball lands.",
      definition:
        "Motion under gravity alone (air resistance ignored):\n" +
        "- The **acceleration** stays constant at \\(g\\) (about 9.8 m/s², often taken as 10 m/s²). Speed, momentum and kinetic energy increase; potential energy decreases.\n" +
        "- Dropped from height \\(h\\): \\(h = \\tfrac{1}{2}gt^{2}\\), so \\(t = \\sqrt{2h/g}\\), and it lands at \\(v = \\sqrt{2gh}\\).\n" +
        "- **Launched horizontally** with speed \\(u\\) from height \\(h\\): the time to land is the **same** \\(\\sqrt{2h/g}\\), whatever \\(u\\) is.\n" +
        "- The horizontal speed stays \\(u\\) throughout, so the body lands at a horizontal distance \\(R = u\\sqrt{2h/g}\\).",
      formula: {
        label: "Free fall and horizontal launch",
        latex: "h = \\tfrac{1}{2}gt^{2} \\qquad t = \\sqrt{\\dfrac{2h}{g}} \\qquad v = \\sqrt{2gh} \\qquad R = u\\sqrt{\\dfrac{2h}{g}}",
        symbols: [
          { symbol: "h", meaning: "height of the fall" },
          { symbol: "g", meaning: "acceleration due to gravity" },
          { symbol: "u", meaning: "horizontal launch speed" },
          { symbol: "R", meaning: "horizontal distance to the landing point" },
        ],
      },
      authoredExample: {
        prompt: "A ball rolls off a table 20 m high with a horizontal speed of 15 m/s. When and how far from the foot of the table does it land? (Take \\(g = 10\\) m/s².)",
        steps: [
          "The fall decides the time: \\(20 = \\tfrac{1}{2} \\times 10 \\times t^{2}\\), so \\(t^{2} = 4\\) and \\(t = 2\\) s.",
          "The horizontal speed stays 15 m/s, so the horizontal distance is \\(15 \\times 2 = 30\\) m.",
        ],
        answer: "After 2 s, 30 m from the foot of the table.",
      },
      selfCheckExample: {
        prompt: "A stone is dropped from a tower 80 m high. How long does it take to reach the ground, and how fast is it moving then? (Take \\(g = 10\\) m/s².)",
        steps: [
          "\\(t = \\sqrt{2h/g} = \\sqrt{160/10} = \\sqrt{16} = 4\\) s.",
          "\\(v = gt = 10 \\times 4 = 40\\) m/s.",
        ],
        answer: "4 s, at 40 m/s.",
      },
      pyqExampleId: "363a1e81-8e20-4352-b9c4-6eb8c7377d5c",
      practiceSet: [
        { prompt: "One ball is dropped and another is thrown horizontally from the same height at the same instant. Which lands first?", answer: "Both land together" },
        { prompt: "A stone falls freely from rest for 2 s. How far does it fall? (Take \\(g = 10\\) m/s².)", answer: "20 m" },
        { prompt: "For a body thrown horizontally, what happens to its horizontal velocity during the flight?", answer: "It stays the same (no horizontal force)" },
        { prompt: "As a body falls freely, does its potential energy increase or decrease?", answer: "It decreases" },
      ],
      traps: [
        {
          title: "The launch speed does not change the time in the air",
          body: "For a horizontal launch the time comes from the height alone, \\(t = \\sqrt{2h/g}\\). The horizontal speed changes **where** the body lands, not **when**.",
        },
        {
          title: "Acceleration stays constant, speed does not",
          body: "In free fall the **acceleration** \\(g\\) is the one thing that stays uniform. Speed, momentum and kinetic energy all grow as the body falls.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsphki-circular",
      name: "Uniform circular motion",
      intuition:
        "A car going round a bend at a steady speed is still accelerating, because its direction keeps changing, and velocity includes direction. The push that keeps turning it always points to the centre of the circle, at right angles to the way the car is moving. Its size stays the same, but its direction swings round with the car, so even the acceleration is not constant.",
      definition:
        "For a body moving in a circle of radius \\(r\\) at constant speed \\(v\\):\n" +
        "- The **speed** is constant but the **velocity** changes, because its direction changes.\n" +
        "- The acceleration is **centripetal**: it points to the **centre**, **perpendicular to the velocity**.\n" +
        "- Its size is \\(a = \\dfrac{v^{2}}{r} = \\omega^{2}r\\), with \\(\\omega = v/r\\) the angular speed.\n" +
        "- Its size is constant but its direction changes, so the acceleration is **non-zero and not constant**.\n" +
        "- Time for one round: \\(T = \\dfrac{2\\pi r}{v}\\).",
      formula: {
        label: "Centripetal acceleration",
        latex: "a = \\dfrac{v^{2}}{r} = \\omega^{2}r \\qquad v = \\omega r \\qquad T = \\dfrac{2\\pi r}{v}",
        symbols: [
          { symbol: "v", meaning: "speed along the circle" },
          { symbol: "r", meaning: "radius of the circle" },
          { symbol: "ω", meaning: "angular speed in radians per second" },
          { symbol: "T", meaning: "time for one round" },
        ],
      },
      authoredExample: {
        prompt: "A car goes round a circular bend of radius 50 m at a steady 20 m/s. Find the size of its acceleration and say where it points.",
        steps: [
          "\\(a = \\dfrac{v^{2}}{r} = \\dfrac{20^{2}}{50} = \\dfrac{400}{50} = 8\\) m/s².",
          "It points towards the centre of the bend, at right angles to the car's velocity.",
        ],
        answer: "8 m/s², towards the centre.",
      },
      selfCheckExample: {
        prompt: "A stone whirls in a circle at a steady speed. If its speed is doubled and the radius kept the same, what happens to its centripetal acceleration?",
        steps: [
          "\\(a = v^{2}/r\\), so \\(a\\) is proportional to \\(v^{2}\\) at fixed \\(r\\).",
          "Doubling \\(v\\) multiplies \\(v^{2}\\) by 4.",
        ],
        answer: "It becomes four times as large.",
      },
      pyqExampleId: "0725d472-ef52-4a49-823b-76b247d9d30b",
      practiceSet: [
        { prompt: "A body moves at 10 m/s round a circle of radius 25 m. What is its centripetal acceleration?", answer: "4 m/s²" },
        { prompt: "In uniform circular motion, which stays constant: the speed or the velocity?", answer: "The speed" },
        { prompt: "What is the name of the acceleration of a body in uniform circular motion?", answer: "Centripetal acceleration" },
        { prompt: "A body takes 4 s for one round of a circle of radius 2 m. What is its speed? (Leave \\(\\pi\\) in the answer.)", answer: "\\(\\pi\\) m/s", method: "\\(2\\pi r / T = 4\\pi / 4\\)" },
      ],
      traps: [
        {
          title: "Uniform circular motion is accelerated",
          body: "Constant **speed** does not mean zero acceleration. The direction of the velocity keeps changing, so there is always an acceleration of size \\(v^{2}/r\\).",
        },
        {
          title: "Constant size is not constant acceleration",
          body: "The centripetal acceleration has a fixed **size** but its **direction** turns with the body. A vector whose direction changes is not constant.",
        },
      ],
    },
  ],
};
