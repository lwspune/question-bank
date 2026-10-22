import type { SubtopicNote } from "@/app/notes/_types";

export const SPI_ES_POWER_NOTE: SubtopicNote = {
  subtopicName: "Power Plants and Clean Energy",
  title: "Power Plants and Clean Energy",
  oneLineDefinition:
    "A power plant changes one form of energy into electrical energy, and a source is clean when using it gives out no smoke, harmful gases or dangerous waste.",
  whyItMatters:
    "Five questions in the bank, four EASY and one MODERATE: the order of energy changes in a nuclear plant, which source is not clean, which pollutes least, why a dam site needs care, and what solar cells are made of. Each is one fact, so the mark goes to whoever knows the drawback of each source.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "spiespw-chain",
      name: "The chain of energy changes in each power plant",
      intuition:
        "Almost every power plant ends the same way: something spins a turbine, and the turbine turns a generator that makes electricity. What differs is where the energy starts. Follow it from the start to the wire and you can answer any 'energy transformation' question.",
      definition:
        "- In a **thermal** plant, coal or gas is burnt. Its **chemical energy** becomes **heat**, the heat boils water into steam, the steam spins the turbine, and the generator gives **electrical energy**.\n" +
        "- In a **nuclear** plant, the fuel (uranium) splits in a reaction called **fission**. The **nuclear energy** released comes out as **heat**, and from there the steps are the same as in a thermal plant.\n" +
        "- In a **hydroelectric** plant, water stored high behind a dam has **potential energy**. As it falls it gains **kinetic energy**, which spins the turbine.\n" +
        "- A **solar cell** is different: it changes **light** straight into electricity, with no turbine at all.",
      table: {
        columns: ["Plant or device", "Energy at the start", "Chain of changes"],
        rows: [
          { cells: ["Thermal power plant", "Chemical energy of coal", "chemical → heat → kinetic (turbine) → electrical"] },
          { cells: ["Nuclear power plant", "Nuclear energy of uranium", "nuclear → heat → kinetic (turbine) → electrical"] },
          { cells: ["Hydroelectric plant", "Potential energy of stored water", "potential → kinetic → electrical"] },
          { cells: ["Wind mill generator", "Kinetic energy of wind", "kinetic → electrical"] },
          { cells: ["Solar cell", "Light energy of the Sun", "light → electrical"] },
        ],
        caption: "Electrical energy is always the LAST link, never the first.",
      },
      selfCheckExample: {
        prompt: "In a hydroelectric power plant, in what order does the energy change?",
        steps: [
          "The water stored high behind the dam has potential energy.",
          "Falling water has kinetic energy, which spins the turbine.",
          "The generator gives electrical energy.",
        ],
        answer: "Potential energy into kinetic energy into electrical energy.",
      },
      practiceSet: [
        { prompt: "In a thermal power plant, what form of energy does the coal hold before it is burnt?", answer: "Chemical energy" },
        { prompt: "What is the name of the reaction in which uranium nuclei split to release energy in a nuclear power plant?", answer: "Fission" },
        { prompt: "Which device changes sunlight directly into electrical energy without a turbine?", answer: "A solar cell" },
        { prompt: "In a wind mill generator, what form of energy does the wind bring?", answer: "Kinetic energy" },
      ],
      pyqExampleId: "2395f6be-59cb-4cb3-ba23-9256aa78b408",
      traps: [
        {
          title: "Putting electrical energy in the middle",
          body:
            "Electrical energy is what a power plant delivers, so it is always the last step. Any chain that starts with electrical energy, or turns electrical energy into something else on the way, is wrong.",
        },
        {
          title: "Skipping the heat step in a nuclear plant",
          body:
            "Fission does not make electricity directly. It releases heat, the heat makes steam, and the steam drives the turbine, just as in a coal plant.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiespw-clean",
      name: "Clean and polluting sources, and the drawback of each",
      intuition:
        "Every source has a cost. Burning coal gives smoke, a nuclear plant leaves dangerous waste, and even a dam floods land. A question on clean energy is really asking which cost you know for each source.",
      definition:
        "- A **clean** source gives out no smoke, no harmful gases and no dangerous waste while making energy. **Solar**, **wind**, **tidal** and **hydroelectric** energy are clean in this sense.\n" +
        "- **Solar energy** pollutes least of all: sunlight is used directly, nothing is burnt and nothing is left over.\n" +
        "- **Nuclear energy** is **not clean**. It gives no smoke, but it leaves **radioactive waste** that stays dangerous for thousands of years, and a leak can harm people.\n" +
        "- **Thermal** power burns coal and gives out smoke, carbon dioxide and other gases.\n" +
        "- **Geothermal** plants use the heat of hot rocks underground, but they can let out gases such as hydrogen sulphide.\n" +
        "- A **hydroelectric** dam burns no fuel, but it floods a large area. Forests, farms, homes and the plants and animals of the region are lost, so the **site must be chosen with care**.",
      table: {
        columns: ["Source", "Clean while making energy?", "Main drawback"],
        rows: [
          { cells: ["Solar", "Yes, the least polluting", "Weak at night and on cloudy days"] },
          { cells: ["Wind", "Yes", "Needs steady strong winds and a lot of land"] },
          { cells: ["Tidal", "Yes", "Few coastal sites are suitable"] },
          { cells: ["Hydroelectric (dam)", "Yes, no fuel is burnt", "Floods land and harms the plants and animals of the region"] },
          { cells: ["Geothermal", "Mostly", "Can release gases such as hydrogen sulphide"] },
          { cells: ["Nuclear", "No", "Radioactive waste and the risk of radiation leaks"] },
          { cells: ["Thermal (coal)", "No", "Smoke, carbon dioxide and other gases"] },
        ],
        caption: "No smoke is not the same as clean: nuclear power gives no smoke and is still not clean.",
      },
      selfCheckExample: {
        prompt: "Of coal, wind, tides and sunlight, which one gives out smoke when it is used to make electricity?",
        steps: [
          "Wind, tides and sunlight are used without burning anything.",
          "Coal is burnt in a thermal plant and gives out smoke and gases.",
        ],
        answer: "Coal",
      },
      practiceSet: [
        { prompt: "What kind of waste does a nuclear power plant leave behind?", answer: "Radioactive waste" },
        { prompt: "Why must the site of a dam for a hydroelectric plant be chosen with care?", answer: "The dam floods a large area and destroys the forests and the plants and animals of the region." },
        { prompt: "Which gas can a geothermal plant release from the ground?", answer: "Hydrogen sulphide" },
        { prompt: "Does a hydroelectric plant burn any fuel?", answer: "No" },
      ],
      pyqExampleId: "d7cbc1fa-91a0-4947-9add-0330dc7ef07d",
      traps: [
        {
          title: "Calling nuclear energy clean because it gives no smoke",
          body:
            "A nuclear plant gives out no smoke, but its radioactive waste stays dangerous for thousands of years. That is why nuclear energy is not counted as a clean source.",
        },
        {
          title: "Saying a dam pollutes the air",
          body:
            "A hydroelectric plant burns no fuel, so it does not give out carbon monoxide or carbon dioxide while working. Its real cost is the land and living things lost under the water.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "spiespw-solar",
      name: "Solar cells and what they are made of",
      intuition:
        "A solar cell is a thin slice of a special material that gives out electricity when light falls on it. The material is a semiconductor, which is neither a good conductor like copper nor an insulator like glass.",
      definition:
        "- A **solar cell** changes **light energy directly into electrical energy**.\n" +
        "- It is made of a **semiconductor**. **Silicon** is the one used most today; **selenium** was used in the earliest cells.\n" +
        "- Many cells joined together make a **solar panel**. Solar cells power satellites, road signs and calculators.\n" +
        "- A solar cell has no moving parts and gives out no pollution, but it makes nothing at night.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          { cells: ["Energy change in a solar cell", "Light energy into electrical energy"] },
          { cells: ["Kind of material", "Semiconductor"] },
          { cells: ["Elements used", "Silicon (most common), selenium (earliest cells)"] },
          { cells: ["Many cells joined together", "A solar panel"] },
          { cells: ["Common uses", "Satellites, road signs, calculators"] },
        ],
      },
      selfCheckExample: {
        prompt: "Which element is used most today to make solar cells?",
        steps: ["Solar cells are made of semiconductors.", "The most common semiconductor used for them is silicon."],
        answer: "Silicon",
      },
      practiceSet: [
        { prompt: "What energy change takes place in a solar cell?", answer: "Light energy into electrical energy" },
        { prompt: "What is a large group of solar cells joined together called?", answer: "A solar panel" },
        { prompt: "Is the material of a solar cell a conductor, an insulator or a semiconductor?", answer: "A semiconductor" },
      ],
      pyqExampleId: "b5b39ac4-0dd8-418b-99d8-6e220f7e85a4",
      traps: [
        {
          title: "Picking a familiar metal",
          body:
            "Lead and tin are metals, not semiconductors, and are not what solar cells are made of. The elements to remember are silicon and selenium.",
        },
      ],
    },
  ],
};
