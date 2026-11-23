import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_HE_EXPANSION_NOTE: SubtopicNote = {
  subtopicName: "Expansion and Anomalous Behaviour of Water",
  title: "Expansion and Anomalous Behaviour of Water",
  oneLineDefinition:
    "Most things expand on heating and contract on cooling, keeping their mass while their volume and density change; water is the exception between 0 °C and 4 °C, so it is densest at 4 °C and expands when it freezes.",
  whyItMatters:
    "Five questions in the bank, one EASY, three MODERATE and one HARD. Two ask what changes when a liquid or a sealed gas is heated or cooled. Three are about water's odd behaviour: what happens to its volume and density when it freezes, the layers of a frozen reservoir, and the HARD one, the temperature (written in °C, K and °F) at which water gives the greatest buoyant force.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9heex-expansion",
      name: "Expansion of solids, liquids and gases",
      intuition:
        "Heat a substance and its particles move faster and push one another further apart, so it takes up more room. Nothing is added or taken away, so its mass stays the same; the same mass spread over more room means a lower density. Shut a gas inside a strong bottle and cool it: its molecules slow down and hit the walls less hard, so its pressure falls.",
      definition:
        "- Solids, liquids and gases **expand on heating** and **contract on cooling**. For the same rise in temperature, gases expand most and solids least.\n" +
        "- On heating, the **mass stays the same**, the **volume increases**, so the **density decreases**; the **internal energy** (energy of the particles) increases.\n" +
        "- A gas sealed in a strong container: **heating raises its pressure**, **cooling lowers it**, because the molecules move faster or slower.\n" +
        "- Everyday cases: gaps are left between railway rails; electric wires sag in summer; a balloon shrinks in a fridge.",
      table: {
        columns: ["Quantity", "When a liquid is heated", "Why"],
        rows: [
          { cells: ["Volume", "Increases", "The particles move further apart"] },
          { cells: ["Mass", "Stays the same", "No matter is added or taken away"] },
          { cells: ["Density", "Decreases", "The same mass fills a larger volume"] },
          { cells: ["Internal energy", "Increases", "The particles move faster"] },
        ],
        caption: "Cooling reverses each change, except that the mass still stays the same. Water between 0 °C and 4 °C is the exception.",
      },
      selfCheckExample: {
        prompt: "A blown-up balloon is moved from a warm room into a cold fridge. What happens to its size, and why?",
        steps: ["The air inside cools.", "Cooled air contracts, so it takes up less room."],
        answer: "The balloon shrinks, because the cooled air inside contracts",
      },
      practiceSet: [
        { prompt: "Why are small gaps left between the rails of a railway track?", answer: "So that the rails have room to expand in hot weather" },
        { prompt: "Air is sealed in a strong steel can and the can is heated. What happens to the pressure of the air inside?", answer: "It increases, because the molecules move faster" },
        { prompt: "For the same rise in temperature, which expands most: a solid, a liquid or a gas?", answer: "A gas" },
        { prompt: "Why do overhead electric wires sag more in summer than in winter?", answer: "They expand and become longer in the heat" },
      ],
      pyqExampleId: "27501d6b-3c8c-461c-93a4-dc5ed3fd77bd",
      traps: [
        {
          title: "Thinking the mass changes on heating",
          body: "Heating changes the volume, the density and the internal energy. The mass stays exactly the same.",
        },
        {
          title: "Thinking cooling raises the pressure of a sealed gas",
          body: "Cooled molecules move more slowly and strike the walls less hard, so the pressure falls.",
        },
        {
          title: "Thinking density rises on heating",
          body: "The same mass in a larger volume has a lower density. A heated liquid is less dense, except water between 0 °C and 4 °C.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9heex-water",
      name: "Anomalous behaviour of water",
      intuition:
        "Water does something strange. Cool it from room temperature and it shrinks, as you would expect, until 4 °C. Below 4 °C it starts to swell again, and when it freezes it swells even more. So water is heaviest for its size at 4 °C, and ice floats. In a frozen lake the densest water, at 4 °C, sinks to the bottom, and fish live there through the winter.",
      definition:
        "- Heated from **0 °C to 4 °C**, water **contracts**; above 4 °C it expands like other liquids. This is the **anomalous expansion** of water.\n" +
        "- So water has its **smallest volume** and **greatest density** (1 g/cm³) at **4 °C**. 4 °C is the same as **277.15 K** and **39.2 °F**.\n" +
        "- When water **freezes** it **expands**: ice has a larger volume and a **lower density** than water, so **ice floats**.\n" +
        "- In a frozen lake: ice on top, then water at 0 °C, 1 °C, 2 °C, 3 °C, with the **densest water at 4 °C at the bottom**. Ice is a poor conductor, so the water below stays liquid and fish survive.\n" +
        "- Water pipes burst and rocks crack in very cold weather because freezing water expands.\n" +
        "- A liquid's **buoyant force** is greatest when its density is greatest, so for water at 4 °C.",
      table: {
        columns: ["Water at", "Volume", "Density"],
        rows: [
          { cells: ["0 °C, as ice", "Largest", "Lowest: ice floats"] },
          { cells: ["0 °C, as water", "Larger than at 4 °C", "Lower than at 4 °C"] },
          { cells: ["4 °C", "Smallest", "Highest"] },
          { cells: ["Above 4 °C", "Grows as it warms", "Falls as it warms"] },
        ],
        caption: "In a frozen pond the layers go from 0 °C under the ice down to 4 °C at the bottom.",
      },
      selfCheckExample: {
        prompt: "In winter the top of a lake freezes. At what temperature is the water at the bottom, and why does it collect there?",
        steps: ["Water is densest at 4 °C.", "The densest water sinks below the lighter, colder water."],
        answer: "About 4 °C, because water at 4 °C is the densest and sinks",
      },
      practiceSet: [
        { prompt: "At what temperature does water have its greatest density?", answer: "4 °C" },
        { prompt: "Why do water pipes sometimes burst in very cold weather?", answer: "Water expands when it freezes and pushes on the pipe" },
        { prompt: "What happens to the volume of water when it is heated from 0 °C to 4 °C?", answer: "It decreases" },
        { prompt: "Why can fish stay alive in a lake whose surface has frozen?", answer: "The ice floats and does not let heat escape easily, so the water below stays liquid, at 4 °C at the bottom" },
      ],
      pyqExampleId: "bcf9f71c-cec8-40f7-80a9-afa47e3401e9",
      traps: [
        {
          title: "Thinking water is densest at 0 °C",
          body: "Water is densest at 4 °C. Between 4 °C and 0 °C it expands again, so water at 0 °C is lighter and stays near the top.",
        },
        {
          title: "Thinking ice is denser than water",
          body: "Water expands when it freezes, so ice has a lower density and floats.",
        },
        {
          title: "Treating 4 °C, 277.15 K and 39.2 °F as different temperatures",
          body: "They are the same temperature written on three scales. Convert each before comparing.",
        },
      ],
    },
  ],
};
