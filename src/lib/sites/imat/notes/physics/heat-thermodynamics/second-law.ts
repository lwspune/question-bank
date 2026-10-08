import type { SubtopicNote } from "@/app/notes/_types";

export const IMAT_PHY_HTH_SECOND_LAW_NOTE: SubtopicNote = {
  subtopicName: "Second Law and Heat Engines",
  title: "The Second Law, Entropy and Heat Engines",
  oneLineDefinition:
    "Heat flows by itself only from hot to cold, no engine turns all its heat into work, and the entropy of an isolated system never decreases.",
  whyItMatters:
    "One past question, from 2011, touches this page: which process produces almost no entropy. The ministry papers have not asked about it yet, but engine efficiency is standard syllabus and a one-line calculation when it appears.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "imat-hth-engines",
      name: "Heat engines, efficiency and the Carnot limit",
      intuition:
        "A heat engine takes heat from something hot, turns part of it into work, and must dump the rest into something cold. The bigger the temperature gap between the hot and the cold side, the larger the share that can become work. Even a perfect, frictionless engine cannot beat the Carnot limit, and that limit reaches 100% only if the cold side is at absolute zero.",
      definition:
        "- A **heat engine** takes heat \\(Q_h\\) from a hot reservoir, does work \\(W\\), and rejects heat \\(Q_c\\) to a cold reservoir: \\(W = Q_h - Q_c\\).\n" +
        "- **Efficiency** \\(\\eta = W/Q_h = 1 - Q_c/Q_h\\), always less than 1.\n" +
        "- The **Carnot efficiency** \\(1 - T_c/T_h\\) is the maximum for any engine working between those two temperatures, with \\(T\\) in **kelvin**.\n" +
        "- A **refrigerator** or **heat pump** runs an engine backwards: work moves heat from cold to hot.",
      formula: {
        label: "Efficiency and the Carnot limit",
        latex: "\\eta = \\frac{W}{Q_h} = 1 - \\frac{Q_c}{Q_h} \\qquad \\eta_{\\max} = 1 - \\frac{T_c}{T_h}",
        symbols: [
          { symbol: "\\(Q_h,\\ Q_c\\)", meaning: "heat taken from the hot reservoir, heat given to the cold one, in J" },
          { symbol: "\\(W\\)", meaning: "useful work done, in J" },
          { symbol: "\\(T_h,\\ T_c\\)", meaning: "reservoir temperatures, in K" },
        ],
      },
      authoredExample: {
        prompt:
          "Each cycle, an engine takes 2000 J from a reservoir at 500 K and gives 1400 J to a reservoir at 300 K. Find its efficiency and compare it with the Carnot limit.",
        steps: [
          "Work: \\(W = 2000 - 1400 = 600\\ \\text{J}\\).",
          "Efficiency: \\(\\eta = 600/2000 = 0.30\\), so 30%.",
          "Carnot limit: \\(1 - 300/500 = 0.40\\), so 40%. The engine is below the limit, so it is possible.",
        ],
        answer: "30%, below the Carnot limit of 40%",
      },
      selfCheckExample: {
        prompt:
          "An engine works between a hot reservoir at 527 °C and a cold one at 127 °C. What is the greatest efficiency it could possibly have?",
        options: ["24%", "40%", "76%", "100%", "50%"],
        steps: [
          "Convert to kelvin: \\(T_h = 800\\ \\text{K}\\), \\(T_c = 400\\ \\text{K}\\).",
          "\\(\\eta_{\\max} = 1 - 400/800 = 0.50\\), so 50%.",
          "Option C uses Celsius (\\(1 - 127/527\\)); A is \\(127/527\\) alone; D ignores the second law.",
        ],
        answer: "(E) 50%",
      },
      practiceSet: [
        { prompt: "An engine does 250 J of work from 1000 J of heat. What is its efficiency, and how much heat does it reject?", answer: "25%; 750 J" },
        { prompt: "What is the Carnot efficiency between 400 K and 300 K?", answer: "25%", method: "\\(1 - 300/400\\)" },
        { prompt: "Could an engine between 600 K and 300 K have an efficiency of 60%?", answer: "No: the limit is 50%", method: "\\(1 - 300/600\\)" },
      ],
      traps: [
        {
          title: "The Carnot formula needs kelvin",
          body: "Putting Celsius temperatures into \\(1 - T_c/T_h\\) gives a far too large efficiency. Convert both temperatures to kelvin first.",
        },
        {
          title: "No real engine reaches the Carnot efficiency",
          body: "The Carnot value is a ceiling for an ideal, reversible engine. Any claim that an engine beats it, or reaches 100% with a cold side above absolute zero, breaks the second law.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "imat-hth-entropy",
      name: "The second law and entropy",
      intuition:
        "Hot coffee cools in a room, but a cool coffee never warms itself by taking heat from the room. Nature runs one way: energy spreads out and order turns into disorder. Entropy measures that spreading. Processes with friction, mixing or heat flowing across a temperature gap create entropy; a perfectly smooth, frictionless motion creates almost none.",
      definition:
        "- **Clausius statement**: heat does not flow by itself from a colder body to a hotter one.\n" +
        "- **Kelvin-Planck statement**: no engine working in a cycle can turn all the heat it takes in into work.\n" +
        "- **Entropy** measures disorder, or how spread out energy is. In an **isolated system** the total entropy never decreases; it rises in every real (irreversible) process.\n" +
        "- The entropy of one part can fall, as long as the surroundings gain at least as much.",
      table: {
        columns: ["Process", "Entropy change", "Why"],
        rows: [
          { cells: ["Ice melting", "Increases", "An ordered crystal becomes a disordered liquid"] },
          { cells: ["Liquid evaporating", "Increases", "Molecules spread out into a much larger volume as gas"] },
          { cells: ["Friction slowing a sliding block", "Increases", "Ordered motion becomes random thermal motion"] },
          { cells: ["Heat flowing from hot to cold", "Increases overall", "The cold body gains more entropy than the hot body loses"] },
          { cells: ["Frictionless swing of a pendulum in a vacuum", "Close to zero", "No energy is turned into heat, so the motion is reversible"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "In which of these does the entropy of the named substance decrease, without breaking the second law?",
        options: [
          "Water freezing into ice in a freezer",
          "Ice melting on a warm table",
          "A gas expanding into an empty container",
          "Perfume spreading through a room",
          "Sugar dissolving in tea",
        ],
        steps: [
          "Freezing turns a disordered liquid into an ordered crystal, so the water's entropy falls.",
          "The second law still holds: the freezer pushes heat out into the kitchen, and the kitchen's entropy rises by more.",
          "Options B to E all spread matter or energy out, so their entropy rises.",
        ],
        answer: "(A) Water freezing into ice in a freezer",
      },
      practiceSet: [
        { prompt: "Can the total entropy of an isolated system decrease?", answer: "No" },
        { prompt: "Which has more entropy: 1 mol of steam or 1 mol of liquid water, both at 100 °C?", answer: "The steam" },
        { prompt: "Does a refrigerator break the second law by moving heat from cold to hot?", answer: "No: it uses work to do it, and releases more heat into the room than it removes" },
      ],
      traps: [
        {
          title: "Entropy can fall locally",
          body: "The second law is about the total entropy of an isolated system. A living cell, a freezer or a growing crystal can lower its own entropy, as long as it raises the entropy of its surroundings by more.",
        },
      ],
    },
  ],
};
