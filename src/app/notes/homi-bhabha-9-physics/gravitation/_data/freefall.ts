import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_GR_FREEFALL_NOTE: SubtopicNote = {
  subtopicName: "Free Fall",
  title: "Free Fall",
  oneLineDefinition:
    "A body falling under gravity alone starts from rest and speeds up by g every second, so v = gt, h = ½gt² and v² = 2gh; as it falls its mass and total energy stay the same while its speed, momentum and kinetic energy grow.",
  whyItMatters:
    "Four questions in the bank, two EASY and two MODERATE. Two use the free-fall equations with u = 0 (the height of a tree from a coconut's fall time, and the speed after falling 1 m). One asks which quantities stay the same during a fall, and one asks which force speeds an unpowered car down a slope.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9grfr-equations",
      name: "Equations of free fall",
      intuition:
        "Drop a stone and it starts at zero speed, then gains about 9.8 m/s of speed every second. Because it is slow at first and fast later, the distance it covers grows quickly: in two seconds it falls four times as far as in one second, and in three seconds nine times as far. A feather falls slowly only because of the air: in a vacuum it keeps pace with a stone.",
      definition:
        "- **Free fall** is motion under **gravity alone**, with air resistance left out.\n" +
        "- A body dropped from rest has \\(u = 0\\) and acceleration \\(a = g\\) (about 9.8 m/s²).\n" +
        "- So the equations of motion become \\(v = gt\\), \\(h = \\frac{1}{2}gt^2\\) and \\(v^2 = 2gh\\), which gives \\(v = \\sqrt{2gh}\\).\n" +
        "- Every body, heavy or light, falls with the **same acceleration** g. In a vacuum a feather and a coin land together.\n" +
        "- A body thrown straight up slows down by g every second and stops for a moment at the top.",
      formula: {
        label: "Free fall from rest",
        latex: "v = gt \\qquad h = \\frac{1}{2}gt^2 \\qquad v^2 = 2gh",
        symbols: [
          { symbol: "v", meaning: "speed after falling, in m/s" },
          { symbol: "g", meaning: "acceleration due to gravity, about 9.8 m/s²" },
          { symbol: "t", meaning: "time of fall, in seconds" },
          { symbol: "h", meaning: "height fallen, in metres" },
        ],
      },
      authoredExample: {
        prompt: "A stone dropped from a bridge hits the water 3 s later. Find the height of the bridge above the water and the stone's speed as it hits. Take g = 9.8 m/s².",
        steps: [
          "Height: \\(h = \\frac{1}{2}gt^2 = \\frac{1}{2} \\times 9.8 \\times 3^2 = 4.9 \\times 9 = 44.1\\) m.",
          "Speed: \\(v = gt = 9.8 \\times 3 = 29.4\\) m/s.",
        ],
        answer: "44.1 m high; it hits the water at 29.4 m/s",
      },
      selfCheckExample: {
        prompt: "A ball is dropped from a height of 20 m. With what speed does it hit the ground? Take g = 10 m/s².",
        steps: ["\\(v^2 = 2gh = 2 \\times 10 \\times 20 = 400\\).", "\\(v = \\sqrt{400} = 20\\) m/s."],
        answer: "20 m/s",
      },
      practiceSet: [
        { prompt: "A stone falls freely from rest for 2 s. How far does it fall? Take g = 9.8 m/s².", answer: "\\(\\frac{1}{2} \\times 9.8 \\times 2^2 = 19.6\\) m" },
        { prompt: "What is the speed of a freely falling body 4 s after it is dropped? Take g = 10 m/s².", answer: "\\(10 \\times 4 = 40\\) m/s" },
        { prompt: "A feather and a coin are dropped together inside a tube with all the air pumped out. Which reaches the bottom first?", answer: "Both reach the bottom together" },
        { prompt: "Write the speed of a body that has fallen a height h from rest, in terms of g and h.", answer: "\\(v = \\sqrt{2gh}\\)" },
      ],
      pyqExampleId: "b6b60ba3-4879-42cd-b0c5-6c6993ad47bc",
      traps: [
        {
          title: "Leaving out the half in h = ½gt²",
          body: "Taking g = 10 m/s², in 4 s a body falls \\(\\frac{1}{2} \\times 10 \\times 4^2 = 80\\) m, not 160 m.",
        },
        {
          title: "Writing v = 2gh",
          body: "It is \\(v^2\\) that equals 2gh. The speed itself is \\(\\sqrt{2gh}\\).",
        },
        {
          title: "Thinking heavier bodies fall faster",
          body: "Without air, every body falls with the same acceleration g, whatever its mass. Air slows a feather more than a stone, which is why they differ in daily life.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9grfr-changes",
      name: "What changes and what stays the same in a fall",
      intuition:
        "As a stone falls it loses height and gains speed. The energy it had because of its height turns into the energy of its motion, so the total stays the same. The stone itself does not change: its mass is the same at the bottom as at the top. The force doing all this is the stone's own weight, and on a slope part of that weight still pulls things downhill.",
      definition:
        "- The force that speeds up a falling body is its own **weight**, mg.\n" +
        "- During free fall the **mass** and the **total mechanical energy** stay the same (air resistance left out).\n" +
        "- The **speed**, **momentum** (mv) and **kinetic energy** (\\(\\frac{1}{2}mv^2\\)) **increase**; the **height** and **potential energy** (mgh) **decrease**.\n" +
        "- Potential energy lost = kinetic energy gained.\n" +
        "- On a slope, part of a body's **weight acts along the slope**. That part makes an unpowered car or a ball speed up downhill; friction and air only oppose the motion.",
      table: {
        columns: ["Quantity", "During free fall", "Why"],
        rows: [
          { cells: ["Mass", "Stays the same", "The amount of matter does not change"] },
          { cells: ["Speed", "Increases", "Gravity speeds it up by g each second"] },
          { cells: ["Momentum", "Increases", "Momentum is mass times velocity, and velocity grows"] },
          { cells: ["Kinetic energy", "Increases", "It depends on the speed"] },
          { cells: ["Potential energy", "Decreases", "The height falls"] },
          { cells: ["Total mechanical energy", "Stays the same", "Potential energy turns into kinetic energy"] },
        ],
        caption: "Only two of these stay the same: mass and total energy.",
      },
      selfCheckExample: {
        prompt: "A 1 kg ball is dropped from a height of 10 m. Taking g = 10 m/s², what is its potential energy at the top, and its kinetic energy just before it hits the ground?",
        steps: ["At the top: \\(PE = mgh = 1 \\times 10 \\times 10 = 100\\) J, and it is at rest, so KE = 0.", "All the potential energy has turned into kinetic energy at the bottom."],
        answer: "100 J of potential energy at the top; 100 J of kinetic energy at the bottom",
      },
      practiceSet: [
        { prompt: "Which force makes a freely falling body speed up?", answer: "Its weight, the Earth's gravitational pull" },
        { prompt: "Does the potential energy of a falling stone increase or decrease?", answer: "It decreases, because its height falls" },
        { prompt: "Why does a bicycle roll faster and faster down a slope even when nobody pedals?", answer: "Part of its weight acts along the slope and pulls it downhill" },
        { prompt: "Does the momentum of a freely falling body stay the same?", answer: "No: its velocity grows, so its momentum grows" },
      ],
      pyqExampleId: "d273bd79-c161-4163-afe9-a16862a165b5",
      traps: [
        {
          title: "Thinking momentum stays the same because mass does",
          body: "Momentum is mass times velocity. The mass is fixed, but the velocity grows, so the momentum grows.",
        },
        {
          title: "Thinking the total energy grows as the body speeds up",
          body: "The kinetic energy grows only because the potential energy falls by the same amount. The total stays the same.",
        },
        {
          title: "Saying the tyres or the road push a free-rolling car downhill",
          body: "An unpowered car speeds up on a slope because part of its weight acts down the slope. The road's roughness and the air only slow it.",
        },
      ],
    },
  ],
};
