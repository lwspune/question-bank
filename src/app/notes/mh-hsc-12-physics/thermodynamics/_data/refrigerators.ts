import type { SubtopicNote } from "@/app/notes/_types";

export const HSC_PH_TD_REFRIGERATORS_NOTE: SubtopicNote = {
  subtopicName: "Refrigerators and Heat Pumps",
  title: "Refrigerators, Air Conditioners and Heat Pumps",
  oneLineDefinition:
    "A refrigerator as a heat engine run backwards, its coefficient of performance, and where its refrigerant takes in heat and gives it out.",
  whyItMatters:
    "3 questions, one of them from a board paper: the coefficient of performance of a Carnot refrigerator working between 150 K and 200 K (2026). The textbook adds a second Carnot refrigerator and asks in which part of the refrigeration cycle the refrigerant gives out its heat.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "hscptd-cop",
      name: "Coefficient of performance",
      intuition:
        "A refrigerator moves heat the 'wrong' way, from its cold inside to the warmer room, and that needs work, done by the compressor. We judge it by how much heat it pulls out of the cold space for each joule of work. That ratio is its coefficient of performance, and unlike an efficiency it is usually bigger than 1.",
      definition:
        "- A refrigerator (or heat pump) is a heat engine run in reverse. Work W is done on the working substance, which takes heat \\(Q_C\\) from the cold reservoir and gives \\(Q_H = Q_C + W\\) to the hot reservoir.\n" +
        "- **Coefficient of performance:** \\(K = \\dfrac{Q_C}{W} = \\dfrac{Q_C}{Q_H - Q_C}\\). It has no unit.\n" +
        "- For a Carnot refrigerator: \\(K = \\dfrac{T_C}{T_H - T_C}\\), with temperatures in kelvin.\n" +
        "- The smaller the difference between the two temperatures, the larger K.",
      formula: {
        label: "Coefficient of performance",
        latex: "K = \\frac{Q_C}{W} = \\frac{Q_C}{Q_H - Q_C} = \\frac{T_C}{T_H - T_C} \\ (\\text{Carnot})",
      },
      authoredExample: {
        prompt:
          "The compressor of a refrigerator does 200 J of work in each cycle, and the refrigerator gives out 1000 J of heat to the room. Find the heat it removes from the cold space and its coefficient of performance.",
        steps: [
          "Given: \\(W = 200\\) J, \\(Q_H = 1000\\) J.",
          "Heat removed: \\(Q_C = Q_H - W = 1000 - 200 = 800\\) J.",
          "Formula: \\(K = \\dfrac{Q_C}{W}\\).",
          "Substitution: \\(K = \\dfrac{800}{200} = 4\\).",
        ],
        answer: "\\(Q_C = 800\\) J; K = 4",
      },
      selfCheckExample: {
        prompt:
          "A freezer has a coefficient of performance of 6. How much work must its compressor do to remove 1800 J of heat from inside?",
        steps: ["\\(W = Q_C/K = 1800/6 = 300\\) J."],
        answer: "300 J",
      },
      practiceSet: [
        { prompt: "What is the unit of the coefficient of performance?", answer: "It has none; it is a ratio of two energies" },
        { prompt: "A refrigerator removes 600 J from its cold space while its compressor does 150 J of work. How much heat reaches the room?", answer: "750 J" },
        { prompt: "Which Carnot refrigerator has the larger K: one working between 250 K and 300 K, or one between 200 K and 300 K?", answer: "The first: K = 5 against K = 2" },
      ],
      pyqExampleId: "07716943-bb3f-4bcd-bedf-34895f7fe6c3",
      traps: [
        {
          title: "Using the engine formula for a refrigerator",
          body: "\\(1 - T_C/T_H\\) is an engine's efficiency. A refrigerator needs \\(K = T_C/(T_H - T_C)\\), which is usually bigger than 1.",
        },
        {
          title: "Putting the hot temperature on top",
          body: "The cold temperature goes on top: \\(K = T_C/(T_H - T_C)\\). With \\(T_H\\) on top the answer is 1 more than K.",
        },
        {
          title: "Leaving temperatures in °C",
          body: "The difference \\(T_H - T_C\\) is the same in both scales, but the \\(T_C\\) on top must be in kelvin.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hscptd-refrigeration-cycle",
      name: "Inside a refrigerator, an air conditioner and a heat pump",
      intuition:
        "A fluid called the refrigerant is pumped round a closed loop of pipes. Inside the cold space it soaks up heat; the compressor squeezes it; outside, in the condenser coils, it gives that heat away to the air. An air conditioner and a heat pump use the same loop with the coils placed differently.",
      definition:
        "- The **evaporator** coils are where the refrigerant takes in heat from the space being cooled.\n" +
        "- The **compressor** does work on the refrigerant, raising its pressure and temperature.\n" +
        "- The **condenser** coils are where the hot refrigerant gives out heat to its surroundings.\n" +
        "- The heat given out in the condenser is the heat taken in plus the work done by the compressor.",
      table: {
        columns: ["Device", "Evaporator coils (take in heat)", "Condenser coils (give out heat)"],
        rows: [
          {
            cells: ["Refrigerator", "Inside the fridge", "On the outside of the fridge, giving heat to the room"],
            pyqExampleId: "1dc7db99-f38a-4083-827c-2c7cd1a27819",
            noteAmber: "The textbook asks where the refrigerant gives out its heat: in the condenser.",
          },
          { cells: ["Air conditioner", "Inside the room to be cooled", "Outside the room"] },
          { cells: ["Heat pump warming a building", "Outside the building", "Inside the building, releasing heat to the room air"] },
        ],
      },
      selfCheckExample: {
        prompt: "Why do the coils at the back of a working refrigerator feel warm?",
        steps: ["They are the condenser coils, where the refrigerant gives out the heat taken from inside the fridge plus the compressor's work."],
        answer: "They are the condenser, giving heat to the room",
      },
      practiceSet: [
        { prompt: "In which part of a refrigerator does the refrigerant take in heat?", answer: "The evaporator coils inside the cold space" },
        { prompt: "Which part of a refrigerator does work on the refrigerant?", answer: "The compressor" },
        { prompt: "Where are the condenser coils of a heat pump that warms a room?", answer: "Inside the building" },
      ],
      pyqExampleId: "1dc7db99-f38a-4083-827c-2c7cd1a27819",
      traps: [
        {
          title: "Thinking a refrigerator destroys heat",
          body: "It only moves heat from the inside to the room, and adds the compressor's work, so the room receives more heat than the fridge removes.",
        },
      ],
    },
  ],
};
