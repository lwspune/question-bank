import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_OC_CURRENTS_NOTE: SubtopicNote = {
  subtopicName: "Tides and Ocean Currents",
  title: "Tides and Ocean Currents",
  oneLineDefinition:
    "What makes the tides and the kinds of tide, the forces that drive ocean currents, which currents are warm and which cold, and the great gyres with the Sargasso Sea inside one.",
  whyItMatters:
    "Eleven CDS questions from 2016 to 2026: 1 EASY, 9 MODERATE, 1 HARD. Three ask you to sort currents into warm and cold or match them to a coast, and the Sargasso Sea has come up twice. The 2026 (I) paper alone asked three of them in a row.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgeoc-tides",
      name: "Tides and their kinds",
      intuition:
        "The Moon pulls on the ocean and heaps the water up into a bulge on the side facing it, with a second bulge on the far side. As the Earth turns, a place passes through both bulges, so it gets two high tides a day. The Sun pulls too, but less, because it is so far away. When the Sun and Moon pull in the same line the tides are biggest; when they pull at right angles they are smallest.",
      definition:
        "The facts to hold:\n" +
        "- A **tide** is the regular rise and fall of the sea, once or twice a day, caused mainly by the **pull of the Moon and the Sun**. The Moon's pull is the stronger because the Moon is much nearer.\n" +
        "- Most coasts get **two high tides and two low tides a day**; high tides come about **12 hours 25 minutes** apart.\n" +
        "- **Spring tides**: the Sun, Moon and Earth are in **one line** (new moon and full moon). The pulls add up, so high tides are highest and low tides lowest.\n" +
        "- **Neap tides**: the Sun and Moon are at **right angles** to the Earth (quadrature, at the first and last quarter moon). The pulls partly cancel, so the range is smallest. They come about **seven days** after a spring tide.\n" +
        "- **Perigean tides**: the Moon is **nearest** the Earth, so tides are higher than usual. **Apogean tides**: the Moon is **farthest**, so tides are lower.\n" +
        "- **Equinoctial spring tides**: extra-large spring tides near the March and September **equinoxes**, so they come about **six months** apart.",
      table: {
        columns: ["Kind of tide", "Position", "Effect"],
        rows: [
          { cells: ["Spring tide", "Sun, Moon and Earth in a line (new and full moon)", "Largest range: very high high tides"] },
          { cells: ["Neap tide", "Sun and Moon at right angles to the Earth (quadrature)", "Smallest range"] },
          { cells: ["Perigean tide", "Moon nearest the Earth", "Higher than usual"] },
          { cells: ["Apogean tide", "Moon farthest from the Earth", "Lower than usual"] },
          {
            cells: ["Equinoctial spring tide", "Spring tide near an equinox", "Recurs about every six months"],
            noteAmber: "CDS 2026 (I): spring 4, neap 1, apogean 2, equinoctial spring 3.",
            pyqExampleId: "5bcae894-b26b-4936-81c3-5dafabac8cb4",
          },
        ],
      },
      pyqExampleId: "5bcae894-b26b-4936-81c3-5dafabac8cb4",
      selfCheckExample: {
        prompt: "There is a full moon on a Monday. Roughly when will the next neap tide come, and why is it small?",
        steps: [
          "At full moon the Sun, Earth and Moon are in a line, so that Monday brings a spring tide.",
          "About a week later the Moon is at its last quarter, at right angles to the Sun as seen from the Earth.",
          "Pulls at right angles partly cancel, so the tidal range is at its smallest.",
        ],
        answer: "About the next Monday, a week later; the Sun and Moon then pull at right angles.",
      },
      practiceSet: [
        { prompt: "Why does the Moon affect the tides more than the Sun does?", answer: "It is much nearer to the Earth" },
        { prompt: "How many high tides does most of the coast get in a day?", answer: "Two, about 12 hours 25 minutes apart" },
        { prompt: "What is a tide called when the Moon is nearest the Earth?", answer: "A perigean tide" },
        { prompt: "At which two phases of the Moon do spring tides come?", answer: "New moon and full moon" },
      ],
      traps: [
        {
          title: "Spring tides are not about the season",
          body: "A **spring tide** has nothing to do with spring. It comes twice every month, at new moon and full moon, when the Sun, Moon and Earth are in one line.",
        },
        {
          title: "The direction of the Earth's spin does not explain tides",
          body: "Tides come from the **pull of the Moon and Sun**, with the Earth's turning carrying each place through the bulges. That the Earth turns **west to east** is true, but the direction is not the reason tides happen.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeoc-forces",
      name: "What drives ocean currents",
      intuition:
        "An ocean current is a river of water flowing through the sea. NCERT names four forces that start it moving: the Sun's heat, the wind, gravity and the Coriolis force. Differences in density then make water sink or rise. The pull of the Moon and Sun is not on the list: it makes tides, which go up and down, not currents.",
      definition:
        "From NCERT (Movements of Ocean Water):\n" +
        "- **Heating by the Sun** makes water expand, so near the equator the sea stands about **8 cm higher** than in the middle latitudes, and water slowly flows down that slope.\n" +
        "- **Wind** blowing on the surface pushes the water along. The great **surface** currents follow the prevailing winds.\n" +
        "- **Gravity** (the Earth's) pulls the heaped water down and keeps it flowing.\n" +
        "- **Coriolis force** turns moving water to the **right** in the Northern Hemisphere and to the **left** in the Southern.\n" +
        "- **Density**: cold or salty water is denser and sinks; warm or fresh water is lighter and rises. This drives the slow deep circulation (the thermohaline circulation).\n" +
        "- The **gravitational pull of the Sun and Moon** raises **tides**, not ocean currents.",
      table: {
        columns: ["Force", "What it does to sea water"],
        rows: [
          { cells: ["Heating by the Sun", "Expands water near the equator, making a gentle slope"] },
          { cells: ["Wind", "Drags the surface water along: the main push behind surface currents"] },
          { cells: ["Gravity of the Earth", "Pulls heaped-up water down the slope"] },
          { cells: ["Coriolis force", "Turns currents right in the north, left in the south"] },
          { cells: ["Differences in density", "Make cold, salty water sink and drive the deep circulation"] },
          {
            cells: ["Pull of the Sun and Moon", "Raises tides; not a cause of currents"],
            noteAmber: "CDS 2022 (II): the gravitational pull of the Sun and Moon is the one that does not influence currents.",
            pyqExampleId: "97cc14cb-f1c9-4315-981a-079a192fc581",
          },
        ],
      },
      pyqExampleId: "97cc14cb-f1c9-4315-981a-079a192fc581",
      selfCheckExample: {
        prompt: "Near the equator the ocean surface stands about 8 cm higher than in the middle latitudes. What causes this, and what does it do to the water?",
        steps: [
          "The strong sun near the equator heats the water, and warm water expands.",
          "Expanded water stands a little higher, so the surface slopes gently towards the middle latitudes.",
          "Water tends to flow down a slope, so this helps start a current.",
        ],
        answer: "Heating by the Sun expands the water; the slight slope makes water flow away from the equator.",
      },
      practiceSet: [
        { prompt: "Which way does the Coriolis force turn a current in the Southern Hemisphere?", answer: "To the left" },
        { prompt: "Is cold, salty water denser or lighter than warm, fresh water?", answer: "Denser" },
        { prompt: "What is the slow deep ocean circulation driven by temperature and salt called?", answer: "The thermohaline circulation" },
        { prompt: "What sets most surface ocean currents moving?", answer: "The prevailing winds" },
      ],
      traps: [
        {
          title: "Gravity is on the list, the Moon's pull is not",
          body: "NCERT lists **gravity** among the forces behind currents, meaning the **Earth's** gravity pulling heaped water down. The **pull of the Sun and Moon** is a different thing: it makes **tides**.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeoc-warm-cold",
      name: "Warm and cold currents, and El Niño",
      intuition:
        "One rule sorts almost every current. Water flowing from the warm tropics towards the poles is a warm current; water flowing from the cold high latitudes towards the equator is a cold current. In the tropics and subtropics the warm currents run along the east coasts of the continents and the cold ones along the west coasts.",
      definition:
        "The rule and the exception:\n" +
        "- **Warm currents** flow **away from the equator**: the Gulf Stream, North Atlantic Drift, Kuroshio, Brazil, Agulhas and the Equatorial currents.\n" +
        "- **Cold currents** flow **towards the equator** or out of polar seas: the California, Humboldt (Peru), Canary, Benguela, Labrador, Falkland and Oyashio currents and the West Wind Drift.\n" +
        "- **El Niño**: every few years a **warm** current appears off the coast of **Peru**, in place of the cold Humboldt current, around Christmas. NCERT lists its effects: it **distorts the equatorial atmospheric circulation**, makes the **evaporation of sea water irregular**, and **reduces plankton**, so there are **fewer fish**. It is also used to forecast India's monsoon.",
      table: {
        columns: ["Current", "Where it flows", "Warm or cold"],
        rows: [
          { cells: ["Gulf Stream", "East coast of the USA, North Atlantic", "Warm"] },
          {
            cells: ["North Atlantic Drift", "Towards north-west Europe", "Warm"],
            noteAmber: "CDS 2020 (I): the North Atlantic Drift and the Brazil current are the warm pair.",
            pyqExampleId: "a74f8003-b5db-400a-aa21-6ee804afbc77",
          },
          { cells: ["Brazil Current", "East coast of South America", "Warm"] },
          { cells: ["Kuroshio", "East coast of Japan, North Pacific", "Warm"] },
          {
            cells: ["Agulhas Current", "South-east coast of Africa (South Africa)", "Warm"],
            noteAmber: "CDS 2016 (II): Agulhas South Africa, Humboldt Peru, Labrador Canada, Falkland Argentina.",
            pyqExampleId: "af0ec3db-fe4e-4f8f-81c0-925848772e90",
          },
          {
            cells: ["California Current", "West coast of North America", "Cold"],
            noteAmber: "CDS 2021 (I): the California current is the cold one.",
            pyqExampleId: "94aa4aa4-2d29-47cf-a628-0d938bdd713a",
          },
          { cells: ["Humboldt (Peru) Current", "West coast of South America (Peru)", "Cold"] },
          { cells: ["Canary Current", "North-west coast of Africa", "Cold"] },
          { cells: ["Benguela Current", "South-west coast of Africa", "Cold"] },
          { cells: ["Labrador Current", "East coast of Canada", "Cold"] },
          { cells: ["Falkland Current", "East coast of Argentina", "Cold"] },
          {
            cells: ["El Niño", "Off Peru and Ecuador, replacing the Humboldt", "Warm"],
            noteAmber: "CDS 2022 (I): the south-east trades blowing towards the Indian Ocean is the normal state, not a result of El Niño.",
            pyqExampleId: "e520a6a2-66ee-409d-9ae2-59de5a7209dc",
          },
        ],
      },
      pyqExampleId: "a74f8003-b5db-400a-aa21-6ee804afbc77",
      selfCheckExample: {
        prompt: "A current flows south from about 60° N to about 40° N along a coast. Is it warm or cold, and why?",
        steps: [
          "It flows from high latitudes towards the equator.",
          "Water coming from cold high latitudes is colder than the water it meets.",
        ],
        answer: "Cold, because it carries water from the high latitudes towards the equator.",
      },
      practiceSet: [
        { prompt: "Is the Oyashio current warm or cold?", answer: "Cold" },
        { prompt: "Which cold current flows south past the east coast of Canada?", answer: "The Labrador Current" },
        { prompt: "What happens to plankton and fish off Peru in an El Niño year?", answer: "Plankton falls, so there are fewer fish" },
        { prompt: "Along which coasts of the continents do the cold currents of the tropics flow?", answer: "The west coasts" },
      ],
      traps: [
        {
          title: "Pairs in the options mix one warm with one cold",
          body: "Kuroshio is warm but California is cold; West Wind Drift and Falkland are both cold; Canary and Benguela are both cold. Check **each** current in a pair against the rule before choosing.",
        },
        {
          title: "El Niño weakens the trades, it does not cause them",
          body: "In a normal year the **south-east trades** push warm water west across the Pacific. In an El Niño year they **weaken** and warm water spreads east to Peru. Trades blowing west are the normal state, not an El Niño effect.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgeoc-gyres",
      name: "Gyres and the Sargasso Sea",
      intuition:
        "Push the surface of an ocean with the trade winds near the equator and the westerlies further out, and let the Coriolis force bend the flow, and the water goes round in a huge loop: a gyre. In the North Atlantic the calm middle of that loop is the Sargasso Sea, a sea with currents for its shores.",
      definition:
        "How the loops work:\n" +
        "- **Gyres** are huge circular loops of surface currents, one in each ocean basin on each side of the equator. They are **driven by the surface winds**.\n" +
        "- They turn **clockwise** in the Northern Hemisphere and **anticlockwise** in the Southern.\n" +
        "- The **equatorial currents** carry **warm** water **westward**; at the continents they turn **poleward along the east coasts** as warm currents (Gulf Stream, Kuroshio), then come back towards the equator along the west coasts as cold currents.\n" +
        "The **Sargasso Sea** sits inside the North Atlantic gyre:\n" +
        "- It is the only sea with **no land boundary**; currents ring it on every side.\n" +
        "- Its water is calm and covered with floating **Sargassum** seaweed, which gives it its name.\n" +
        "- With strong evaporation and no rivers, its water is **saltier** than the average ocean.",
      table: {
        columns: ["Side of the Sargasso Sea", "Current that bounds it"],
        rows: [
          {
            cells: ["West", "Gulf Stream"],
            noteAmber: "CDS 2019 (I): the sea lies east of the Gulf Stream and west of the Canary current, not the other way round.",
            pyqExampleId: "3de1d893-9e06-4729-bbe6-0b44397813cb",
          },
          { cells: ["North", "North Atlantic Drift"] },
          { cells: ["East", "Canary Current"] },
          {
            cells: ["South", "North Equatorial Current"],
            noteAmber: "CDS 2026 (I): it is the one sea without a land boundary; it is salty, not the least salty part of the Atlantic.",
            pyqExampleId: "af6a2746-8555-420a-ab04-87f5f4cd8c1c",
          },
        ],
      },
      pyqExampleId: "dbb80f71-dd55-4d3e-ba1c-babe89f28cf3",
      selfCheckExample: {
        prompt: "Which way does the gyre of the South Atlantic turn, and why?",
        steps: [
          "The Coriolis force turns moving water to the left in the Southern Hemisphere.",
          "Water pushed west by the trades and east by the westerlies, always bending left, goes round anticlockwise.",
        ],
        answer: "Anticlockwise, because the Coriolis force bends currents to the left south of the equator.",
      },
      practiceSet: [
        { prompt: "What floating seaweed gives the Sargasso Sea its name?", answer: "Sargassum" },
        { prompt: "Does the North Atlantic gyre turn clockwise or anticlockwise?", answer: "Clockwise" },
        { prompt: "Which current bounds the Sargasso Sea on the north?", answer: "The North Atlantic Drift" },
        { prompt: "Is the Sargasso Sea saltier or less salty than the average ocean?", answer: "Saltier" },
      ],
      traps: [
        {
          title: "Gulf Stream west, Canary east",
          body: "On a map the **Gulf Stream** runs up the American side, so it is on the Sargasso Sea's **west**. The **Canary** current runs down the African side, on its **east**.",
        },
        {
          title: "No land boundary does not mean fresh",
          body: "The Sargasso Sea has no coast and no rivers, so nothing dilutes it, and strong evaporation makes it **salty**. A statement calling it the least salty part of the Atlantic is false.",
        },
      ],
    },
  ],
};
