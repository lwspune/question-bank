import type { SubtopicNote } from "@/app/notes/_types";

export const NEET_PH_TP_EXPANSION_NOTE: SubtopicNote = {
  subtopicName: "Expansion and Specific Heat",
  title: "Expansion and Specific Heat",
  oneLineDefinition:
    "How lengths, areas and volumes grow when a body is heated (ΔL = αLΔT, γ = 3α), then how much heat a body takes for a rise in temperature or a change of state.",
  whyItMatters:
    "Two NEET questions, both from 2024 or later. Re-NEET 2026 asks how much the volume of a heated metal sphere grows, given only the linear coefficient. Re-NEET 2024 asks why water is used as a coolant in a nuclear reactor.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "nphtp-expansion",
      name: "Linear, area and volume expansion",
      visualizationSlug: "ht-anomalous-water-expansion",
      intuition:
        "Heat a solid and its particles vibrate more and push each other a little further apart. Every length in the body grows by the same small fraction, αΔT. An area has two lengths in it, so it grows by about twice that fraction; a volume has three, so it grows by about three times. A hole in a plate grows too, exactly as the piece of metal that would fill it.",
      definition:
        "- Length: \\(\\Delta L = \\alpha L\\Delta T\\), where \\(\\alpha\\) is the coefficient of linear expansion.\n" +
        "- Area: \\(\\Delta A = 2\\alpha A\\Delta T\\). Volume: \\(\\Delta V = \\gamma V\\Delta T\\) with \\(\\gamma = 3\\alpha\\) for a solid.\n" +
        "- A hole or a gap expands as if it were filled with the same material.\n" +
        "- **Water is different** between 0 °C and 4 °C: it contracts on heating, so its density is greatest at 4 °C.\n" +
        "- Celsius and Fahrenheit: \\(t_F = \\dfrac{9}{5}t_C + 32\\). A change of 1 °C equals a change of 1 K.",
      formula: {
        label: "Thermal expansion",
        latex: "\\Delta L = \\alpha L\\Delta T, \\qquad \\Delta A = 2\\alpha A\\Delta T, \\qquad \\Delta V = 3\\alpha V\\Delta T",
        symbols: [
          { symbol: "\\(\\alpha\\)", meaning: "coefficient of linear expansion" },
          { symbol: "\\(\\gamma\\)", meaning: "coefficient of volume expansion, 3α for a solid" },
          { symbol: "\\(\\Delta T\\)", meaning: "rise in temperature" },
        ],
      },
      authoredExample: {
        prompt:
          "A steel plate has a round hole of diameter 10 cm at 20 °C. The plate is heated to 120 °C. Find the new diameter of the hole. (\\(\\alpha = 1.2 \\times 10^{-5}\\ \\text{K}^{-1}\\))",
        steps: [
          "The hole grows like a steel disc of the same size, so use \\(\\Delta D = \\alpha D\\Delta T\\).",
          "\\(\\Delta T = 120 - 20 = 100\\) K, so \\(\\Delta D = 1.2 \\times 10^{-5} \\times 10 \\times 100 = 0.012\\) cm.",
          "New diameter \\(= 10 + 0.012 = 10.012\\) cm. The hole gets larger, not smaller.",
        ],
        answer: "10.012 cm",
      },
      selfCheckExample: {
        prompt:
          "A metal rod 2 m long at 20 °C becomes 1.2 mm longer when heated to 70 °C. What is the coefficient of linear expansion of the metal?",
        steps: [
          "\\(\\alpha = \\dfrac{\\Delta L}{L\\Delta T}\\), with \\(\\Delta L = 1.2 \\times 10^{-3}\\) m and \\(\\Delta T = 50\\) K.",
          "\\(\\alpha = \\dfrac{1.2 \\times 10^{-3}}{2 \\times 50} = 1.2 \\times 10^{-5}\\ \\text{K}^{-1}\\).",
        ],
        answer: "\\(1.2 \\times 10^{-5}\\ \\text{K}^{-1}\\)",
      },
      practiceSet: [
        { prompt: "A metal has a coefficient of linear expansion \\(2 \\times 10^{-5}\\ \\text{K}^{-1}\\). What is its coefficient of area expansion?", answer: "\\(4 \\times 10^{-5}\\ \\text{K}^{-1}\\)" },
        { prompt: "A copper wire 50 m long is heated through 20 K. By how much does it lengthen? (\\(\\alpha = 1.7 \\times 10^{-5}\\ \\text{K}^{-1}\\))", answer: "1.7 cm" },
        { prompt: "A metal plate with a round hole in it is heated. Does the hole become larger or smaller?", answer: "Larger" },
        { prompt: "At what temperature is the density of water greatest?", answer: "4 °C" },
      ],
      pyqExampleId: "361f61c6-165b-4d07-9003-8dff5cb7ca88",
      traps: [
        {
          title: "A volume grows by 3α, not α",
          body: "The volume of a solid grows by \\(3\\alpha V\\Delta T\\) and an area by \\(2\\alpha A\\Delta T\\). Using \\(\\alpha\\) alone gives an answer three or two times too small, and that value is usually one of the options.",
        },
        {
          title: "A hole grows when the plate is heated",
          body: "The metal around a hole expands outward and carries the edge of the hole with it. The hole grows exactly as a disc of the same metal would.",
        },
        {
          title: "Water shrinks between 0 °C and 4 °C",
          body: "Most liquids expand on heating, but water contracts from 0 °C to 4 °C. Its density is greatest at 4 °C, which is why a lake freezes from the top down.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "nphtp-specific-heat",
      name: "Specific heat, calorimetry and latent heat",
      intuition:
        "Different materials need different amounts of heat for the same rise in temperature. The specific heat capacity says how much heat one kilogram needs for a rise of one kelvin. Water's is very high, so it soaks up a lot of heat while warming only a little. When a substance melts or boils, the heat it takes goes into changing its state, and its temperature stays fixed until the change is complete.",
      definition:
        "- Heat for a rise in temperature: \\(Q = mc\\Delta T\\), where c is the **specific heat capacity**. The **heat capacity** of a whole body is \\(S = mc\\).\n" +
        "- Water has the highest specific heat of common substances, about 4186 J kg⁻¹ K⁻¹. That is why it is used as a coolant in car radiators and nuclear reactors, and in hot water bags.\n" +
        "- Heat for a change of state at constant temperature: \\(Q = mL\\), where L is the **latent heat** (of fusion for melting, of vaporisation for boiling).\n" +
        "- For ice, \\(L_f \\approx 3.33 \\times 10^{5}\\ \\text{J kg}^{-1}\\); for water, \\(L_v \\approx 22.6 \\times 10^{5}\\ \\text{J kg}^{-1}\\).\n" +
        "- **Calorimetry**: when hot and cold bodies are mixed and no heat escapes, heat lost by the hot body = heat gained by the cold body.",
      formula: {
        label: "Heat and change of state",
        latex: "Q = mc\\Delta T, \\qquad Q = mL, \\qquad \\text{heat lost} = \\text{heat gained}",
        symbols: [
          { symbol: "\\(c\\)", meaning: "specific heat capacity" },
          { symbol: "\\(L\\)", meaning: "latent heat of the change of state" },
        ],
      },
      authoredExample: {
        prompt:
          "100 g of water at 80 °C is mixed with 200 g of water at 20 °C. No heat escapes. What is the final temperature?",
        steps: [
          "Let the final temperature be T. Heat lost by the hot water = heat gained by the cold water, and c cancels.",
          "\\(100(80 - T) = 200(T - 20)\\), so \\(8000 - 100T = 200T - 4000\\).",
          "\\(300T = 12000\\), so \\(T = 40\\) °C. It sits closer to 20 °C because there is more cold water.",
        ],
        answer: "40 °C",
      },
      selfCheckExample: {
        prompt:
          "How much heat turns 10 g of ice at 0 °C into water at 20 °C? (Take the latent heat of fusion as 336 J g⁻¹ and the specific heat of water as 4.2 J g⁻¹ K⁻¹.)",
        steps: [
          "Melting at 0 °C: \\(Q_1 = mL = 10 \\times 336 = 3360\\) J.",
          "Warming the water from 0 °C to 20 °C: \\(Q_2 = mc\\Delta T = 10 \\times 4.2 \\times 20 = 840\\) J.",
          "Total \\(= 3360 + 840 = 4200\\) J.",
        ],
        answer: "4200 J",
      },
      practiceSet: [
        { prompt: "How much heat raises the temperature of 2 kg of water by 5 K? (Specific heat of water 4200 J kg⁻¹ K⁻¹)", answer: "42,000 J" },
        { prompt: "Two bodies of equal mass receive equal heat. A rises by 10 K and B by 20 K. What is the ratio of their specific heats, A to B?", answer: "2 : 1" },
        { prompt: "How much heat melts 50 g of ice at 0 °C? (Latent heat of fusion 336 J g⁻¹)", answer: "16,800 J" },
        { prompt: "Ice at 0 °C is heated slowly. What happens to its temperature while it is melting?", answer: "It stays at 0 °C until all the ice has melted" },
      ],
      pyqExampleId: "493a71ca-cfce-439c-8bd9-f17fb43d36f3",
      traps: [
        {
          title: "No temperature rise while the state changes",
          body: "While ice melts or water boils, the heat supplied goes into the change of state, \\(Q = mL\\). The temperature stays fixed until the change is complete, so do not use \\(mc\\Delta T\\) for that stage.",
        },
        {
          title: "Specific heat is per kilogram",
          body: "Specific heat c belongs to the material; heat capacity \\(mc\\) belongs to the whole body. A large pot of water and a cup of water have the same specific heat but very different heat capacities.",
        },
        {
          title: "A high specific heat means a slow rise",
          body: "A substance with a high specific heat warms up slowly for the heat it takes. That is what makes water a good coolant: it carries away a lot of heat for a small rise in its own temperature.",
        },
      ],
    },
  ],
};
