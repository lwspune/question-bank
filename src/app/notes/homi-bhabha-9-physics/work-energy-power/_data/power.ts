import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_WE_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power",
  title: "Power",
  oneLineDefinition:
    "Power is the rate of doing work, P = W/t: it is measured in watts (1 W = 1 J/s), and in industry in horsepower (1 hp = 746 W).",
  whyItMatters:
    "Six questions in the bank, three EASY and three MODERATE: the industrial unit of power, a machine's power from its work in one hour, two people climbing the same height in different times, the power of a gun firing a bullet every second, a boy running up 30 steps, and a coolie lifting a bag in 4 s. Every one is P = W/t with the time in seconds.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hb9wepo-power",
      name: "Power: the rate of doing work",
      intuition:
        "Two people carry the same load up the same stairs. They do the same work, but the one who gets there first is more powerful. Power tells you how fast work is done: the work divided by the time it takes.",
      definition:
        "- **Power** = work done ÷ time taken: \\(P = \\frac{W}{t}\\).\n" +
        "- The SI unit is the **watt (W)**: \\(1\\ \\mathrm{W} = 1\\ \\mathrm{J/s}\\). 1 kW = 1000 W.\n" +
        "- In industry the power of engines and motors is given in **horsepower (hp)**: 1 hp = 746 W.\n" +
        "- **Time must be in seconds**: 1 minute = 60 s, 1 hour = 3600 s.\n" +
        "- For the **same work**, power is inversely proportional to time: half the time, twice the power.\n" +
        "- When a machine gives a body kinetic energy again and again, its power is the kinetic energy given each second.",
      formula: {
        label: "Power",
        latex: "P = \\frac{W}{t} \\qquad 1\\ \\mathrm{W} = 1\\ \\mathrm{J/s} \\qquad 1\\ \\mathrm{hp} = 746\\ \\mathrm{W}",
        symbols: [
          { symbol: "P", meaning: "power, in watts (W)" },
          { symbol: "W", meaning: "work done, in joules (J)" },
          { symbol: "t", meaning: "time taken, in seconds (s)" },
        ],
      },
      authoredExample: {
        prompt: "An electric motor does 90 000 J of work in 5 minutes. Find its power in watts and in kilowatts.",
        steps: [
          "Time in seconds: \\(5 \\times 60 = 300\\) s.",
          "\\(P = \\frac{90000}{300} = 300\\) W.",
          "\\(300\\) W \\(= \\frac{300}{1000} = 0.3\\) kW.",
        ],
        answer: "300 W, which is 0.3 kW",
      },
      selfCheckExample: {
        prompt: "A water pump does 6000 J of work in 2 minutes. What is its power?",
        steps: ["2 minutes = 120 s.", "\\(P = \\frac{6000}{120} = 50\\) W."],
        answer: "50 W",
      },
      practiceSet: [
        { prompt: "What is the power of a machine that does 4500 J of work in 15 s?", answer: "\\(\\frac{4500}{15} = 300\\) W" },
        { prompt: "How many watts make one horsepower?", answer: "746 W" },
        { prompt: "A machine of power 2 kW runs for 10 s. How much work does it do?", answer: "\\(2000 \\times 10 = 20000\\) J" },
        { prompt: "A machine gives a 0.5 kg ball a speed of 20 m/s once every 2 seconds. What power does it develop?", answer: "Each ball gets \\(\\frac{1}{2} \\times 0.5 \\times 20^2 = 100\\) J, so \\(P = \\frac{100}{2} = 50\\) W" },
      ],
      pyqExampleId: "f27a5fba-3a9c-4fea-84fd-1aa2591acb48",
      traps: [
        {
          title: "Leaving the time in minutes or hours",
          body: "Change the time to seconds first. 1200 J of work in 1 minute is a power of \\(\\frac{1200}{60} = 20\\) W, not 1200 W.",
        },
        {
          title: "Mixing up the SI unit and the industrial unit",
          body: "The watt (J/s) is the SI unit of power. Engines and motors in industry are rated in horsepower. The newton and the joule are not units of power at all.",
        },
        {
          title: "Thinking more work always means more power",
          body: "Power depends on time too. A small job done very fast can need more power than a big job done slowly.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "hb9wepo-climbing",
      name: "Power in climbing and lifting",
      intuition:
        "Running up a staircase, you lift your own weight through the height of the stairs. The work is your weight times the height, mgh. Divide by the time you took and you have your power. A crane lifting a load works the same way.",
      definition:
        "- Work done in climbing or lifting: \\(W = mgh\\).\n" +
        "- Power: \\(P = \\frac{mgh}{t}\\).\n" +
        "- For a staircase, the height is **number of steps × height of one step**, with the step height in **metres** (20 cm = 0.2 m).\n" +
        "- The lifter's work is positive and gravity's work is negative; the power asked for is the lifter's.",
      formula: {
        label: "Power in lifting",
        latex: "P = \\frac{mgh}{t}",
        symbols: [
          { symbol: "m", meaning: "mass lifted, in kg" },
          { symbol: "g", meaning: "acceleration due to gravity, in m/s²" },
          { symbol: "h", meaning: "height climbed, in metres" },
          { symbol: "t", meaning: "time taken, in seconds" },
        ],
      },
      authoredExample: {
        prompt: "A 60 kg man climbs 40 steps, each 15 cm high, in 20 s. Take g = 10 m/s². Find his power.",
        steps: [
          "Height: \\(40 \\times 0.15 = 6\\) m.",
          "Work: \\(W = mgh = 60 \\times 10 \\times 6 = 3600\\) J.",
          "Power: \\(P = \\frac{3600}{20} = 180\\) W.",
        ],
        answer: "180 W",
      },
      selfCheckExample: {
        prompt: "A crane lifts a 500 kg load through 8 m in 40 s. Take g = 10 m/s². Find its power.",
        steps: ["\\(W = 500 \\times 10 \\times 8 = 40000\\) J.", "\\(P = \\frac{40000}{40} = 1000\\) W."],
        answer: "1000 W, which is 1 kW",
      },
      practiceSet: [
        { prompt: "A 45 kg girl runs up a staircase 4 m high in 6 s. What is her power? Take g = 10 m/s².", answer: "\\(\\frac{45 \\times 10 \\times 4}{6} = 300\\) W" },
        { prompt: "A pump lifts 100 kg of water through 9 m in 15 s. Find its power. Take g = 9.8 m/s².", answer: "\\(\\frac{100 \\times 9.8 \\times 9}{15} = \\frac{8820}{15} = 588\\) W" },
        { prompt: "A boy climbs the same stairs once in 10 s and once in 20 s. In which climb is his power greater, and by how much?", answer: "In the 10 s climb: twice as much, because the work is the same and the time is half" },
        { prompt: "A load is lifted with 500 J of work by a rope. How much work does gravity do on the load while it rises?", answer: "\\(-500\\) J (negative)" },
      ],
      pyqExampleId: "1f470c18-592f-4a78-a116-531d671c5323",
      traps: [
        {
          title: "Leaving the step height in centimetres",
          body: "Change centimetres to metres before multiplying. 25 steps of 20 cm is 5 m, not 500 m.",
        },
        {
          title: "Using the number of steps as the height",
          body: "The height is the number of steps times the height of each step.",
        },
        {
          title: "Forgetting g",
          body: "The force needed to lift a body is its weight mg, not its mass. A 50 kg boy weighs about 500 N.",
        },
      ],
    },
  ],
};
