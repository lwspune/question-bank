import type { SubtopicNote } from "@/app/notes/_types";

export const AF_STD_TRAINS_NOTE: SubtopicNote = {
  subtopicName: "Trains",
  title: "Trains: Lengths, Platforms and Crossings",
  oneLineDefinition:
    "A train covers its own length to pass a point, and its own length plus the other length to pass a platform or another train, at the relative speed when the other thing moves.",
  whyItMatters:
    "AFCAT has set eight of the chapter's past-year questions here, from 2015 to 2018. Almost every one is a choice of which lengths to add and whether the speeds add or subtract, with km/h turned into m/s on the way.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "afstd-train-pole",
      name: "Passing a pole or a standing man",
      intuition:
        "A pole, a signal post or a man standing still has no length. The train has passed it when it has moved forward by one train length.",
      definition:
        "- Time to pass a point \\(= \\dfrac{\\text{train length}}{\\text{train speed}}\\), with the speed in m/s.\n" +
        "- Two trains passing the same standing man: each covers only its own length, at its own speed.\n" +
        "- A speed in km/h: multiply by \\(\\tfrac{5}{18}\\) first.",
      formula: {
        label: "Passing a point",
        latex: "t = \\dfrac{L}{v}",
      },
      authoredExample: {
        prompt: "A 180 m train runs at 81 km/h. How long does it take to pass a signal post?",
        steps: ["81 km/h is \\(81 \\times \\tfrac{5}{18} = 22.5\\) m/s.", "\\(180 \\div 22.5 = 8\\) s."],
        answer: "8 s.",
      },
      selfCheckExample: {
        prompt: "A train running at 90 km/h passes a pole in 9 s. Find its length.",
        steps: ["90 km/h is 25 m/s.", "\\(25 \\times 9 = 225\\) m."],
        answer: "225 m.",
      },
      practiceSet: [
        { prompt: "A 250 m train passes a man standing on a platform in 10 s. Find its speed in km/h.", answer: "90 km/h" },
        { prompt: "A train covers 13.5 km in 9 minutes and passes a post in 7 s. Find its length.", answer: "175 m", method: "90 km/h is 25 m/s." },
        { prompt: "A train at 90 km/h passes a pole in 8 s. How long does it take at 80 km/h?", answer: "9 s" },
      ],
      pyqExampleId: "0ec04fa8-7d40-451d-a1ff-4766d69f16a7",
      traps: [
        {
          title: "Metres with metres per second",
          body: "A 180 m train at 81 km/h: \\(180 \\div 81\\) mixes metres with kilometres per hour. Change 81 km/h to 22.5 m/s first.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-train-platform",
      visualizationSlug: "af-train-platform",
      name: "Crossing a platform or a bridge",
      intuition:
        "To clear a platform the front of the train must run the platform's length and then the train's own length, until the last coach leaves the far end.",
      definition:
        "- Distance to cross \\(=\\) train length \\(+\\) platform length.\n" +
        "- \\(t = \\dfrac{L + P}{v}\\), \\(v = \\dfrac{L + P}{t}\\), and \\(P = vt - L\\).\n" +
        "- 'A platform twice as long as the train': the distance is \\(3L\\).\n" +
        "- A man who walks across a bridge gives you the bridge's length: his speed times his time.",
      formula: {
        label: "Crossing a platform",
        latex: "t = \\dfrac{L + P}{v}",
      },
      authoredExample: {
        prompt: "A 200 m train at 90 km/h crosses a 300 m platform. How long does it take?",
        steps: [
          "90 km/h is 25 m/s.",
          "The front must go \\(200 + 300 = 500\\) m.",
          "\\(500 \\div 25 = 20\\) s.",
        ],
        answer: "20 s.",
      },
      selfCheckExample: {
        prompt: "A 160 m train crosses a 340 m bridge in 25 s. Find its speed in km/h.",
        steps: ["\\(500 \\div 25 = 20\\) m/s.", "\\(20 \\times \\tfrac{18}{5} = 72\\) km/h."],
        answer: "72 km/h.",
      },
      practiceSet: [
        { prompt: "A 120 m train at 36 km/h crosses a bridge in 30 s. Find the length of the bridge.", answer: "180 m" },
        { prompt: "A train at 72 km/h crosses a platform twice its own length in 30 s. Find the train's length.", answer: "200 m" },
        {
          prompt: "A man walking at 6 km/h crosses a bridge in 5 minutes. A 100 m train at 72 km/h crosses the same bridge. How long does the train take?",
          answer: "30 s",
          method: "The bridge is 500 m.",
        },
      ],
      pyqExampleId: "2f11334a-f6dd-4b1e-a4c3-2b48d717f89e",
      traps: [
        {
          title: "Add the train's own length",
          body: "A 200 m train crossing a 300 m platform must cover 500 m. Using 300 m stops the clock while most of the train is still on the platform.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-two-crossings",
      name: "Length and speed from two crossings",
      intuition:
        "Two crossings at the same speed give two equations. Subtract them and the train's length drops out: the extra time was spent on the extra length.",
      definition:
        "- A pole in \\(t_1\\) and a platform \\(P\\) in \\(t_2\\): \\(v = \\dfrac{P}{t_2 - t_1}\\), then \\(L = v t_1\\).\n" +
        "- Two platforms \\(P_1, P_2\\) in \\(t_1, t_2\\): \\(v = \\dfrac{P_2 - P_1}{t_2 - t_1}\\).\n" +
        "- Then \\(L = vt - P\\) from either crossing.\n" +
        "- A man standing on the platform counts as a pole.",
      formula: {
        label: "Speed from two crossings",
        latex: "v = \\dfrac{P_2 - P_1}{t_2 - t_1}",
      },
      authoredExample: {
        prompt: "A train passes a pole in 12 s and a 240 m platform in 28 s. Find its speed and length.",
        steps: [
          "The extra 240 m takes the extra 16 s: \\(v = 240 \\div 16 = 15\\) m/s, which is 54 km/h.",
          "Length \\(= 15 \\times 12 = 180\\) m.",
        ],
        answer: "54 km/h; 180 m.",
      },
      selfCheckExample: {
        prompt: "A train crosses a 150 m bridge in 18 s and a 300 m bridge in 27 s. Find its length.",
        steps: [
          "\\(v = \\dfrac{300 - 150}{27 - 18} = \\dfrac{150}{9} = \\dfrac{50}{3}\\) m/s.",
          "\\(L = \\dfrac{50}{3} \\times 18 - 150 = 300 - 150 = 150\\) m.",
        ],
        answer: "150 m.",
      },
      practiceSet: [
        { prompt: "A train passes a post in 9 s and a 180 m platform in 21 s. Find its speed in km/h.", answer: "54 km/h" },
        { prompt: "A train passes a man standing on a 90 m platform in 10 s and the whole platform in 16 s. Find its length.", answer: "150 m" },
        { prompt: "A train crosses platforms of 100 m and 250 m in 15 s and 25 s. Find its length.", answer: "125 m" },
      ],
      pyqExampleId: "35f00194-234a-46b3-ac5d-ede196ca44c4",
      traps: [
        {
          title: "The man on the platform is a pole",
          body: "Passing a man who stands on the platform takes the train's length only. Adding the platform to that crossing double counts it.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-train-moving-man",
      name: "Passing someone who is moving",
      intuition:
        "A walker or cyclist is still a point, so the train covers only its own length, but at the relative speed from the last page: the difference if they go the same way, the sum if they meet.",
      definition:
        "- Same direction: \\(t = \\dfrac{L}{v - u}\\). Opposite: \\(t = \\dfrac{L}{v + u}\\).\n" +
        "- A man sitting in another train moves with that train. Use the two trains' relative speed and only the length of the train he watches.\n" +
        "- Same direction in \\(t_1\\) and opposite in \\(t_2\\): \\((v - u)t_1 = (v + u)t_2\\), both equal to \\(L\\).\n" +
        "- One crossing time, with length and speed both unknown, cannot fix a second crossing time.",
      formula: {
        label: "Passing a moving person",
        latex: "t = \\dfrac{L}{v \\mp u}",
      },
      authoredExample: {
        prompt: "A 240 m train at 63 km/h passes a man walking at 9 km/h. How long does it take if he walks (a) the same way, (b) towards the train?",
        steps: [
          "(a) Relative speed \\(63 - 9 = 54\\) km/h \\(= 15\\) m/s: \\(240 \\div 15 = 16\\) s.",
          "(b) Relative speed \\(63 + 9 = 72\\) km/h \\(= 20\\) m/s: \\(240 \\div 20 = 12\\) s.",
        ],
        answer: "16 s; 12 s.",
      },
      selfCheckExample: {
        prompt: "A 200 m train passes a cyclist riding the same way at 18 km/h in 20 s. Find the train's speed.",
        steps: [
          "Relative speed \\(= 200 \\div 20 = 10\\) m/s \\(= 36\\) km/h.",
          "The train runs at \\(36 + 18 = 54\\) km/h.",
        ],
        answer: "54 km/h.",
      },
      practiceSet: [
        { prompt: "A 175 m train at 57 km/h passes a man running towards it at 6 km/h. How long does it take?", answer: "10 s" },
        {
          prompt: "A man in a train going at 40 km/h sees a train going the other way at 50 km/h pass him in 10 s. Find the length of that train.",
          answer: "250 m",
        },
        {
          prompt: "A train passes a cyclist riding the same way at 10 km/h in 30 s, and one riding towards it at 10 km/h in 20 s. Find the train's speed.",
          answer: "50 km/h",
          method: "\\((v - 10) \\times 30 = (v + 10) \\times 20\\).",
        },
      ],
      pyqExampleId: "93ee78d4-207f-4d4e-851b-29df0af13114",
      traps: [
        {
          title: "The man in the train",
          body: "A man in one train watching the other go past sees only the other train's length go by. Adding both trains' lengths is for when the trains clear each other completely.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "afstd-two-trains",
      name: "Two trains crossing or overtaking",
      intuition:
        "When two trains pass each other completely, the fronts must separate by both lengths, and that gap opens at the relative speed.",
      definition:
        "- Opposite directions: \\(t = \\dfrac{L_1 + L_2}{v_1 + v_2}\\). Same direction (overtaking): \\(t = \\dfrac{L_1 + L_2}{v_1 - v_2}\\).\n" +
        "- Equal lengths with pole times \\(t_1, t_2\\): the speeds are \\(\\tfrac{L}{t_1}, \\tfrac{L}{t_2}\\), and crossing head on takes \\(\\dfrac{2 t_1 t_2}{t_1 + t_2}\\).\n" +
        "- An unknown second speed: relative speed \\(= \\dfrac{L_1 + L_2}{t}\\), then take away the known speed.",
      formula: {
        label: "Two trains",
        latex: "t = \\dfrac{L_1 + L_2}{v_1 \\pm v_2}",
      },
      authoredExample: {
        prompt: "Trains 190 m and 230 m long run towards each other at 50 km/h and 58 km/h. How long do they take to cross?",
        steps: [
          "Relative speed \\(50 + 58 = 108\\) km/h \\(= 30\\) m/s.",
          "Distance \\(190 + 230 = 420\\) m.",
          "\\(420 \\div 30 = 14\\) s.",
        ],
        answer: "14 s.",
      },
      selfCheckExample: {
        prompt: "A 250 m train at 80 km/h overtakes a 170 m train running at 44 km/h on a parallel track. How long does it take?",
        steps: ["Relative speed 36 km/h \\(= 10\\) m/s.", "\\(420 \\div 10 = 42\\) s."],
        answer: "42 s.",
      },
      practiceSet: [
        { prompt: "Two 100 m trains pass a pole in 10 s and 20 s. How long do they take to cross each other going opposite ways?", answer: "\\(13\\tfrac13\\) s" },
        { prompt: "A 200 m train at 60 km/h crosses a 300 m train coming the other way in 18 s. Find the second train's speed.", answer: "40 km/h" },
        { prompt: "Two trains of equal length run the same way at 50 km/h and 32 km/h; the faster passes the slower in 40 s. Find each length.", answer: "100 m" },
      ],
      pyqExampleId: "dcc36632-6bfd-4193-8fd1-7d08ed2898dd",
      traps: [
        {
          title: "Both lengths, and subtract for the same direction",
          body: "Clearing another train covers \\(L_1 + L_2\\), not one length. And overtaking on a parallel track closes at the difference of the speeds, which is why it takes so much longer.",
        },
      ],
    },
  ],
};
