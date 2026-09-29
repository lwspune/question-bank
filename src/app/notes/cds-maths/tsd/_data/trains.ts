import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_TD_TRAINS_NOTE: SubtopicNote = {
  subtopicName: "Trains and Relative Speed",
  title: "Trains: Length and Crossing",
  oneLineDefinition:
    "A train passing an object must cover its own length plus the object's length, at the speed relative to that object.",
  whyItMatters:
    "Fourteen PYQs. The distance to cover is always 'train + whatever it passes' (zero for a pole or a person), and the speed is always the relative speed. Most mistakes are unit conversions: multiply km/hr by 5/18 for m/s.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdstd-train-crossing",
      name: "Passing poles, platforms and bridges",
      intuition:
        "The front of the train must travel until the back has cleared the object. That is the train's length plus the object's length — or just the train's length for a point like a pole or a km-stone.",
      definition:
        "- Pole, person, km-stone: distance \\(= L\\).\n" +
        "- Platform, bridge, station of length \\(P\\): distance \\(= L + P\\).\n" +
        "- \\(1\\) km/hr \\(= \\dfrac{5}{18}\\) m/s; \\(1\\) m/s \\(= \\dfrac{18}{5}\\) km/hr.\n" +
        "- Two crossings at the same speed: subtract them to eliminate the unknown length.",
      formula: {
        label: "Crossing time",
        latex: "t = \\dfrac{L + P}{v}",
      },
      authoredExample: {
        prompt: "A \\(150\\) m train crosses a pole in \\(9\\) seconds. How long does it take to cross a \\(250\\) m platform?",
        steps: ["Speed \\(= \\dfrac{150}{9} = \\dfrac{50}{3}\\) m/s.", "Time \\(= \\dfrac{400}{50/3} = 24\\) s."],
        answer: "\\(24\\) seconds.",
      },
      selfCheckExample: {
        prompt: "A train crosses a \\(200\\) m bridge in \\(15\\) s and a \\(300\\) m bridge in \\(20\\) s. Find its length.",
        steps: ["\\(100\\) m extra takes \\(5\\) s: speed \\(20\\) m/s.", "\\(L + 200 = 300\\)."],
        answer: "\\(100\\) m.",
      },
      practiceSet: [
        { prompt: "\\(54\\) km/hr in m/s?", answer: "\\(15\\)" },
        { prompt: "\\(200\\) m train at \\(20\\) m/s passes a pole in?", answer: "\\(10\\) s" },
        { prompt: "\\(100\\) m train, \\(100\\) m platform, \\(10\\) s. Speed in km/hr?", answer: "\\(72\\)" },
        { prompt: "Distance to cross a man standing still?", answer: "The train's length" },
      ],
      pyqExampleId: "b510f00d-96d5-4f26-a7ab-be8f443cff6e", // 2018 (II) — 100 m train, 100 m platform, 10 s
      traps: [
        {
          title: "Clearing the last stone",
          body:
            "Passing \\(91\\) km-stones spans \\(90\\) km between the first and last, plus the train's length to clear the last one completely.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdstd-train-relative",
      name: "Trains passing moving objects",
      intuition:
        "When the object also moves, use the speed of the train relative to it: the difference if they move the same way, the sum if they approach. A man sitting in another train is still a point.",
      definition:
        "- Same direction: relative speed \\(= u - v\\). Opposite: \\(u + v\\).\n" +
        "- Train passing a train: distance \\(= L_1 + L_2\\). Passing a man in the other train: distance \\(= L_1\\) only.\n" +
        "- Same-way time is \\(k\\) times opposite-way time: \\(u + v = k(u - v)\\).\n" +
        "- Overtaking two walkers of different speeds gives two expressions for the same length.",
      formula: {
        label: "Relative crossing",
        latex: "t = \\dfrac{L_1 + L_2}{u \\pm v}",
      },
      authoredExample: {
        prompt: "A \\(180\\) m train at \\(60\\) km/hr overtakes a man walking at \\(6\\) km/hr the same way. How long does it take?",
        steps: ["Relative speed \\(54\\) km/hr \\(= 15\\) m/s.", "\\(\\dfrac{180}{15} = 12\\) s."],
        answer: "\\(12\\) seconds.",
      },
      selfCheckExample: {
        prompt: "Trains of \\(120\\) m and \\(180\\) m run in opposite directions at \\(40\\) and \\(50\\) km/hr. How long to cross each other?",
        steps: ["\\(300\\) m at \\(90\\) km/hr \\(= 25\\) m/s."],
        answer: "\\(12\\) seconds.",
      },
      practiceSet: [
        { prompt: "Same direction, \\(80\\) and \\(50\\) km/hr. Relative speed?", answer: "\\(30\\) km/hr" },
        { prompt: "Passing a man in the other train: which length counts?", answer: "Only the passing train's" },
        { prompt: "Same-way time \\(3\\times\\) opposite-way. Speed ratio?", answer: "\\(2 : 1\\)" },
        { prompt: "\\(100\\) m train, relative \\(10\\) m/s. Time to pass a man?", answer: "\\(10\\) s" },
      ],
      pyqExampleId: "895bb9fc-dccf-4dfb-a123-266b0aa910a1", // 2025 (II) — X crosses a man in Y in 9 s
      traps: [
        {
          title: "A man in a train is a point",
          body:
            "When a train crosses a PERSON in another train, the other train's length is a distractor. Adding it gives a speed that matches no option.",
        },
      ],
    },
  ],
};
