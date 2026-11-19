import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_TP_TRANSFER_NOTE: SubtopicNote = {
  subtopicName: "Heat Transfer and Cooling",
  title: "Heat Transfer and Cooling",
  oneLineDefinition:
    "Conduction through a rod or slab (H = KAΔT/L) and rods joined in series, the three ways heat moves and why trapped air insulates, then Newton's law of cooling.",
  whyItMatters:
    "Three NEET questions. NEET 2025 joins three rods in series and asks for the ratio of the two junction temperatures. Re-NEET 2024 gives an assertion about a foam layer on a concrete roof. NEET 2021 has a cup of coffee cooling in two stages in the same room.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphtp-conduction",
      name: "Conduction and rods in series",
      intuition:
        "Heat flows along a rod from the hot end to the cold end, much as charge flows along a wire from high potential to low. The temperature difference plays the part of the voltage, the rate of heat flow the part of the current, and L/KA the part of the resistance. Once the rod reaches the steady state, its temperatures stop changing and the same heat current passes every cross-section.",
      definition:
        "- Heat current through a rod or slab: \\(H = \\dfrac{KA(T_1 - T_2)}{L}\\), where K is the **thermal conductivity**.\n" +
        "- **Thermal resistance**: \\(R = \\dfrac{L}{KA}\\), so \\(H = \\dfrac{T_1 - T_2}{R}\\).\n" +
        "- Rods **in series** carry the same H. Add their resistances: \\(R = R_1 + R_2 + \\dots\\)\n" +
        "- Rods **in parallel** share the same temperature difference. Add \\(\\dfrac{1}{R}\\), that is add \\(\\dfrac{KA}{L}\\).\n" +
        "- A junction temperature: find H from the whole chain, then the drop across one rod is \\(HR\\) for that rod. The drops are in the ratio of the resistances.",
      formula: {
        label: "Heat conduction",
        latex: "H = \\frac{KA(T_1 - T_2)}{L}, \\qquad R = \\frac{L}{KA}, \\qquad R_{series} = R_1 + R_2 + \\dots",
        symbols: [
          { symbol: "\\(H\\)", meaning: "heat flowing per second" },
          { symbol: "\\(K\\)", meaning: "thermal conductivity" },
          { symbol: "\\(R\\)", meaning: "thermal resistance" },
        ],
      },
      authoredExample: {
        prompt:
          "A copper rod 0.5 m long with a cross-section of 4 cm² has its ends at 100 °C and 0 °C. Find the heat flowing through it each second in the steady state. (\\(K = 400\\ \\text{W m}^{-1}\\text{K}^{-1}\\))",
        steps: [
          "Area \\(A = 4\\ \\text{cm}^{2} = 4 \\times 10^{-4}\\ \\text{m}^{2}\\), temperature difference 100 K.",
          "\\(H = \\dfrac{KA\\Delta T}{L} = \\dfrac{400 \\times 4 \\times 10^{-4} \\times 100}{0.5}\\).",
          "\\(H = \\dfrac{16}{0.5} = 32\\) W.",
        ],
        answer: "32 W",
      },
      selfCheckExample: {
        prompt:
          "Two rods of the same length and cross-section, with conductivities K and 2K, are placed side by side between the same hot and cold ends. What single conductivity would a rod of the combined cross-section need to carry the same heat?",
        steps: [
          "Side by side is parallel: the heat currents add, \\(\\dfrac{KA}{L} + \\dfrac{2KA}{L} = \\dfrac{3KA}{L}\\).",
          "The combined rod has area 2A: \\(\\dfrac{K_{eq}(2A)}{L} = \\dfrac{3KA}{L}\\), so \\(K_{eq} = \\dfrac{3K}{2}\\).",
        ],
        answer: "\\(\\dfrac{3K}{2}\\)",
      },
      practiceSet: [
        { prompt: "The length of a rod is doubled and nothing else changes. What happens to the steady heat current through it?", answer: "It halves" },
        { prompt: "Write the thermal resistance of a slab of thickness L, area A and conductivity K.", answer: "\\(R = \\dfrac{L}{KA}\\)" },
        { prompt: "Two slabs of equal area and equal thickness, with conductivities K and 2K, are joined face to face. What is the conductivity of a single slab of the same total thickness that conducts equally well?", answer: "\\(\\dfrac{4K}{3}\\)" },
        { prompt: "In the steady state, how do the heat currents through rods joined in series compare?", answer: "The same heat current flows through every rod" },
      ],
      pyqExampleId: "7e27de4d-8a51-45ae-95ea-fc872229adca",
      traps: [
        {
          title: "In series, add resistances, not conductivities",
          body: "For rods in series add \\(\\dfrac{L}{KA}\\) for each rod. Adding the conductivities treats them as if they were side by side.",
        },
        {
          title: "The poorer conductor takes the bigger drop",
          body: "The same heat current flows through rods in series, so the temperature drop across each is \\(HR\\). The rod with the larger thermal resistance (smaller K for the same size) has the larger drop.",
        },
        {
          title: "Steady state does not mean equal temperatures",
          body: "In the steady state the temperature at each point stops changing, but it still falls along the rod. What is equal everywhere is the heat current, not the temperature.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "nphtp-convection-radiation",
      name: "Conduction, convection, radiation and insulators",
      visualizationSlug: "ht-heat-transfer-modes",
      intuition:
        "Heat moves in three ways. In conduction it is passed from particle to particle while the material stays in place. In convection the warm fluid itself moves and carries the heat with it. In radiation it travels as electromagnetic waves and needs no medium at all. An insulator works by blocking these paths, and still, trapped air is one of the best.",
      definition:
        "- **Conduction** happens mainly in solids. Metals are good conductors; wood, glass and air are poor ones.\n" +
        "- **Convection** happens only in fluids: warm fluid expands, becomes less dense and rises, and cooler fluid sinks to take its place.\n" +
        "- **Radiation** is carried by electromagnetic waves, so it crosses empty space.\n" +
        "- Trapped air conducts heat poorly and cannot circulate, so materials full of air pockets (foam, wool) insulate well.",
      table: {
        columns: ["Idea", "What happens", "Example"],
        rows: [
          { cells: ["Conduction", "Heat is passed by collisions between neighbouring particles; the material does not move", "The handle of a metal spoon in hot tea warms up"] },
          { cells: ["Convection", "Warm fluid rises and cool fluid sinks, carrying heat with the flow", "A sea breeze by day and a land breeze at night"] },
          { cells: ["Radiation", "Heat is carried by electromagnetic waves and needs no medium", "Heat from the Sun reaching the Earth across empty space"] },
          {
            cells: ["Insulation", "Trapped still air conducts heat poorly and cannot circulate, so little heat gets through", "A foam layer on a concrete roof keeps the room cooler in summer"],
            noteAmber: "Re-NEET 2024: the assertion that a foam layer keeps the room hotter in summer is false; the reason, that foam's air pockets block heat, is true.",
            pyqExampleId: "a904faa3-1b5c-47ae-80dd-aa218c3a91fc",
          },
          { cells: ["Absorbers", "A dark surface absorbs radiation well and a shiny white one reflects most of it", "Light-coloured clothes feel cooler in strong sunshine"] },
        ],
        caption: "Conduction and convection need a medium; radiation does not.",
      },
      selfCheckExample: {
        prompt: "A room heater is usually placed near the floor, and an air conditioner high up on a wall. Why?",
        steps: [
          "Air warmed by a heater becomes less dense and rises, and cooler air flows down to take its place: a convection current that warms the whole room.",
          "Air cooled by an air conditioner becomes denser and sinks, so placing it high lets the cool air spread downwards.",
        ],
        answer: "Both use convection: warm air rises and cool air sinks",
      },
      practiceSet: [
        { prompt: "Which mode of heat transfer can cross empty space?", answer: "Radiation" },
        { prompt: "Which mode of heat transfer carries heat by the bulk flow of a liquid or gas?", answer: "Convection" },
        { prompt: "Which absorbs more of the Sun's radiation, a black surface or a shiny white one?", answer: "The black surface" },
        { prompt: "In which state of matter can convection not take place?", answer: "In a solid" },
      ],
      pyqExampleId: "a904faa3-1b5c-47ae-80dd-aa218c3a91fc",
      traps: [
        {
          title: "Insulation keeps heat out as well as in",
          body: "An insulating layer slows heat flow in both directions. On a roof in summer it keeps the Sun's heat out, so the room stays cooler, not hotter.",
        },
        {
          title: "Convection needs a fluid",
          body: "Convection moves the material itself, so it happens only in liquids and gases. Heat moves through a solid wall by conduction.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphtp-cooling",
      name: "Newton's law of cooling",
      intuition:
        "A hot body in a room loses heat faster the hotter it is than the room. When the difference is small, the rate of cooling is simply proportional to that difference. So a cup of tea cools quickly at first and then more and more slowly as it nears room temperature. Equal drops in temperature take longer and longer.",
      definition:
        "- **Newton's law of cooling**: for a small difference, the rate of cooling is proportional to the excess temperature: \\(\\dfrac{dT}{dt} = -k(T - T_s)\\), where \\(T_s\\) is the temperature of the surroundings.\n" +
        "- For a drop from \\(T_1\\) to \\(T_2\\) in a time t, use the average temperature: \\(\\dfrac{T_1 - T_2}{t} = k\\left(\\dfrac{T_1 + T_2}{2} - T_s\\right)\\).\n" +
        "- Two stages in the same room: find k from the first stage, then use it in the second.\n" +
        "- A body only approaches the temperature of its surroundings; it does not cool below it.",
      formula: {
        label: "Newton's law of cooling",
        latex: "\\frac{dT}{dt} = -k(T - T_s), \\qquad \\frac{T_1 - T_2}{t} = k\\left(\\frac{T_1 + T_2}{2} - T_s\\right)",
        symbols: [
          { symbol: "\\(T_s\\)", meaning: "temperature of the surroundings" },
          { symbol: "\\(k\\)", meaning: "a constant for the body and its surface" },
        ],
      },
      authoredExample: {
        prompt:
          "A body at 60 °C in a room at 20 °C is cooling at 2 °C per minute. At what rate does it cool when it has reached 40 °C?",
        steps: [
          "The rate is proportional to the excess over the room: at 60 °C the excess is 40 °C, at 40 °C it is 20 °C.",
          "The excess has halved, so the rate halves: \\(2 \\times \\dfrac{20}{40} = 1\\) °C per minute.",
        ],
        answer: "1 °C per minute",
      },
      selfCheckExample: {
        prompt:
          "A pan of water cools from 80 °C to 70 °C in 4 minutes in a room at 25 °C. Using the average form of Newton's law, find the constant k.",
        steps: [
          "Rate \\(= \\dfrac{80 - 70}{4} = 2.5\\) °C per minute. Average temperature \\(= 75\\) °C, so the excess is \\(75 - 25 = 50\\) °C.",
          "\\(2.5 = k \\times 50\\), so \\(k = 0.05\\ \\text{min}^{-1}\\).",
        ],
        answer: "\\(0.05\\ \\text{min}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "A body's excess temperature over its surroundings is doubled, and stays small. How does its rate of cooling change?", answer: "It doubles" },
        { prompt: "A body cools at a rate R when it is at 70 °C in a room at 20 °C. What is its rate at 45 °C?", answer: "R/2" },
        { prompt: "A body cools from 60 °C to 50 °C in a room at 15 °C. What excess temperature does the average form use?", answer: "40 °C" },
        { prompt: "By Newton's law of cooling, can a hot body cool below the temperature of the room it is in?", answer: "No, it only approaches room temperature" },
      ],
      pyqExampleId: "bd0639cf-2817-42b8-abee-219daea1e4f5",
      traps: [
        {
          title: "Average the temperatures, then subtract the room",
          body: "In the average form the excess is \\(\\dfrac{T_1 + T_2}{2} - T_s\\). Taking the excess at the start, or averaging the drop, gives a wrong k.",
        },
        {
          title: "Equal drops take longer near room temperature",
          body: "As the body nears the room's temperature the excess is smaller, so it cools more slowly. A drop of 20 °C closer to room temperature takes more time than a drop of 20 °C higher up.",
        },
      ],
    },
  ],
};
