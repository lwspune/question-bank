import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_TD_TRAINS_NOTE: SubtopicNote = {
  subtopicName: "Trains and Relative Speed",
  title: "Trains and Relative Speed",
  oneLineDefinition:
    "A train has length, so to pass anything it must cover its own length plus the length of what it passes, at the relative speed of the two.",
  whyItMatters:
    "Eight questions in the bank, seven of them EASY, and none from the 2025 shifts. Each one is two numbers to get right: the distance, meaning which lengths to add, and the speed, meaning the train's own, a difference or a sum. The m/s values of multiples of 18 km/h do most of the arithmetic.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "ssctdtr-length",
      name: "A train passing a pole, a platform or a standing train",
      intuition:
        "A train has passed a pole only when its last coach goes by, so its engine has moved one full train length. To clear a platform the engine must run the platform's length and then the train's own length again.",
      definition:
        "- **A pole, a signal or a person standing still:** distance \\(=\\) the train's length.\n" +
        "- **A platform, bridge, tunnel or a train standing on the next line:** distance \\(=\\) the train's length \\(+\\) the other length.\n" +
        "- **Time** \\(= \\frac{\\text{distance}}{\\text{speed}}\\), with lengths in metres and the speed in m/s.\n" +
        "- **Two crossings give the speed:** a train that passes a pole in \\(t_1\\) and a platform of length \\(p\\) in \\(t_2\\) has speed \\(\\frac{p}{t_2 - t_1}\\), because the extra time is spent on the platform alone.\n" +
        "- **Fast route:** a speed that is a multiple of 18 km/h is a whole number in m/s: 54 km/h is 15 m/s, 108 km/h is 30 m/s.",
      formula: {
        label: "Train passing a fixed object",
        latex: "t = \\frac{L_{\\text{train}} + L_{\\text{object}}}{s} \\qquad s = \\frac{p}{t_2 - t_1}",
        symbols: [
          { symbol: "\\(L_{\\text{object}}\\)", meaning: "length of the platform, bridge or standing train (0 for a pole)" },
          { symbol: "\\(s\\)", meaning: "speed of the train in m/s" },
          { symbol: "\\(p\\)", meaning: "length of the platform" },
        ],
      },
      authoredExample: {
        prompt: "A 240 m train runs at 72 km/h. How long does it take to cross a 400 m bridge?",
        steps: [
          "\\(72 \\times \\frac{5}{18} = 20\\) m/s.",
          "Distance \\(= 240 + 400 = 640\\) m, so the time is \\(\\frac{640}{20} = 32\\) seconds.",
        ],
        answer: "32 seconds",
      },
      selfCheckExample: {
        prompt: "A train passes a signal post in 12 seconds and a 330 m platform in 27 seconds. What is its length?",
        steps: [
          "The extra 15 seconds are spent on the platform: speed \\(= \\frac{330}{15} = 22\\) m/s.",
          "Length \\(= 22 \\times 12 = 264\\) m.",
        ],
        answer: "264 m",
      },
      practiceSet: [
        {
          prompt: "A 180 m train runs at 54 km/h. How long does it take to pass a pole?",
          answer: "12 seconds",
          method: "15 m/s, and \\(\\frac{180}{15} = 12\\).",
        },
        {
          prompt: "A 150 m train crosses a 250 m tunnel in 20 seconds. What is its speed in km/h?",
          answer: "72 km/h",
          method: "\\(\\frac{400}{20} = 20\\) m/s.",
        },
        {
          prompt: "A 300 m train at 90 km/h passes a 200 m goods train standing on the next line. How long does it take?",
          answer: "20 seconds",
          method: "\\(\\frac{500}{25} = 20\\).",
        },
        {
          prompt: "A train at 36 km/h crosses a 140 m bridge in 30 seconds. How long is the train?",
          answer: "160 m",
          method: "\\(10 \\times 30 = 300\\) m, less the bridge.",
        },
      ],
      pyqExampleId: "67dcee64-fee8-40bd-8a6b-aa94ff319662",
      traps: [
        {
          title: "Leaving out the train's own length",
          body:
            "To clear a platform the train covers the platform and its own length. Using the platform alone gives a time that is too short.",
        },
        {
          title: "Adding a length for a pole or a standing man",
          body:
            "A pole or a person has no length worth counting, so the distance is the train's length alone.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "ssctdtr-relative",
      name: "Trains passing moving trains or people",
      intuition:
        "If the thing being passed is moving too, use relative speed exactly as in a chase: the difference when both go the same way, the sum when they come towards each other. The distance is still the lengths added.",
      definition:
        "- **Two trains, same direction:** time \\(= \\frac{L_1 + L_2}{s_1 - s_2}\\).\n" +
        "- **Two trains, opposite directions:** time \\(= \\frac{L_1 + L_2}{s_1 + s_2}\\).\n" +
        "- **A train passing a moving person:** the person adds no length, so the time is the train's length over the relative speed: the difference if the person walks the same way, the sum if towards the train.\n" +
        "- **Both crossing times given:** the lengths over the same-direction time give \\(s_1 - s_2\\), and over the opposite-direction time give \\(s_1 + s_2\\); half the sum and half the difference give the speeds.\n" +
        "- Add or subtract the speeds in km/h first and change the result to m/s once.",
      formula: {
        label: "Two trains crossing",
        latex: "t_{\\text{same}} = \\frac{L_1 + L_2}{s_1 - s_2} \\qquad t_{\\text{opp}} = \\frac{L_1 + L_2}{s_1 + s_2}",
        symbols: [
          { symbol: "\\(L_1, L_2\\)", meaning: "lengths of the two trains" },
          { symbol: "\\(s_1, s_2\\)", meaning: "speeds of the two trains, the first one the faster" },
        ],
      },
      authoredExample: {
        prompt: "A 200 m train at 75 km/h overtakes a 175 m train running at 48 km/h on a parallel track. How long does the overtaking take?",
        steps: [
          "Same direction: relative speed \\(= 75 - 48 = 27\\) km/h \\(= 7.5\\) m/s.",
          "Distance \\(= 200 + 175 = 375\\) m, so the time is \\(\\frac{375}{7.5} = 50\\) seconds.",
        ],
        answer: "50 seconds",
      },
      selfCheckExample: {
        prompt: "A 210 m train at 60 km/h meets a 140 m train coming the other way at 66 km/h. How long do they take to pass each other?",
        steps: [
          "Opposite directions: relative speed \\(= 126\\) km/h \\(= 35\\) m/s.",
          "\\(\\frac{210 + 140}{35} = 10\\) seconds.",
        ],
        answer: "10 seconds",
      },
      practiceSet: [
        {
          prompt: "A 160 m train at 50 km/h passes a man walking the same way at 5 km/h. How long does it take?",
          answer: "12.8 seconds",
          method: "45 km/h \\(= 12.5\\) m/s, and \\(\\frac{160}{12.5} = 12.8\\).",
        },
        {
          prompt: "Two trains, 120 m and 130 m long, run in opposite directions at 40 km/h and 50 km/h. How long do they take to cross each other?",
          answer: "10 seconds",
          method: "90 km/h \\(= 25\\) m/s.",
        },
        {
          prompt: "A 100 m train passes a cyclist riding towards it at 18 km/h in 4 seconds. What is the train's speed in km/h?",
          answer: "72 km/h",
          method: "Relative speed 25 m/s \\(= 90\\) km/h, less the cyclist's 18 km/h.",
        },
        {
          prompt: "Two trains with a total length of 600 m cross each other in 15 seconds running in opposite directions. What is the sum of their speeds in km/h?",
          answer: "144 km/h",
          method: "\\(\\frac{600}{15} = 40\\) m/s.",
        },
      ],
      pyqExampleId: "05c8a02e-5926-4a1c-b454-331f4ebf73ba",
      traps: [
        {
          title: "Using one train's length for two moving trains",
          body:
            "Two trains have crossed only when their last coaches part, so the distance is the sum of both lengths.",
        },
        {
          title: "Subtracting the speed of a walker coming towards the train",
          body:
            "A walker coming towards the train meets it sooner, so the speeds add. Subtract only when the walker goes the same way as the train.",
        },
      ],
    },
  ],
};
