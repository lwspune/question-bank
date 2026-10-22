import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_CL_WINDS_NOTE: SubtopicNote = {
  subtopicName: "Pressure, Winds and Cyclones",
  title: "Pressure, Winds and Cyclones",
  oneLineDefinition:
    "What makes wind blow and turn, the pressure belts and the three cells that set the planetary winds, the names cyclones go by, and the local winds CDS asks about.",
  whyItMatters:
    "Eleven CDS questions from 2018 to 2025: 2 EASY, 9 MODERATE. Six are about pressure and the planetary winds, two about cyclones and three about local winds and storms. The Coriolis force and the Hadley cell are the two ideas the statement items keep testing.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgecl-pressure",
      name: "Pressure gradient and the Coriolis force",
      intuition:
        "Air moves from high pressure to low pressure, and the bigger the difference over a short distance, the stronger the wind. But the Earth spins under the moving air, so the wind does not go straight: it is turned to one side. That turning is the Coriolis force.",
      definition:
        "Forces that shape the wind:\n" +
        "- **Isobars** are lines joining places of equal pressure. **Closely spaced** isobars show a **steep pressure gradient** and **strong winds**; widely spaced isobars show a gentle gradient and light winds.\n" +
        "- The **Coriolis force** comes from the Earth's rotation. It turns the wind to the **right in the northern hemisphere** and to the **left in the southern hemisphere**.\n" +
        "- It is **zero at the equator** and **greatest at the poles** (it grows with latitude).\n" +
        "- Cold land builds **high pressure**. In winter a high forms over **north-west India**, so a place like **Jaisalmer** has higher winter pressure than Chennai or Guwahati. High places like **Leh** have low pressure because there is less air above them.",
      table: {
        columns: ["Feature", "Fact"],
        rows: [
          {
            cells: ["Strong pressure gradient on a weather map", "Closely spaced isobars"],
            noteAmber: "CDS 2024 (II): closely spaced isobars, not widely spaced ones.",
            pyqExampleId: "6a05f344-bb4a-4062-a64d-3072ee1aa0c0",
          },
          { cells: ["Coriolis deflection, northern hemisphere", "To the right"] },
          { cells: ["Coriolis deflection, southern hemisphere", "To the left"] },
          { cells: ["Coriolis force at the equator", "Zero"] },
          { cells: ["Coriolis force at the poles", "Greatest"] },
          {
            cells: ["Highest winter pressure in India", "The north-west, for example Jaisalmer"],
            noteAmber: "CDS 2018 (I): Jaisalmer, ahead of Leh, Chennai and Guwahati.",
            pyqExampleId: "0bd64205-e85c-46e3-b695-92a9398d17cf",
          },
        ],
      },
      pyqExampleId: "91d7ad97-4681-409b-baf0-f148a39a904d",
      selfCheckExample: {
        prompt: "On a weather map, the isobars over Odisha are drawn very close together while those over Rajasthan are far apart. Where will the wind be stronger, and why?",
        steps: [
          "Close isobars mean the pressure changes a lot over a short distance.",
          "That is a steep pressure gradient, which drives air faster.",
          "Far-apart isobars mean a gentle gradient and light winds.",
        ],
        answer: "Over Odisha: its close isobars show a steep pressure gradient.",
      },
      practiceSet: [
        { prompt: "What does an isobar join on a weather map?", answer: "Places of equal air pressure" },
        { prompt: "Air moves from which kind of pressure to which?", answer: "From high pressure to low pressure" },
        { prompt: "What is the Coriolis force caused by?", answer: "The rotation of the Earth" },
        { prompt: "Why does Leh have low air pressure?", answer: "It is very high up, so there is less air above it" },
      ],
      traps: [
        {
          title: "Left in the south, right in the north",
          body: "The Coriolis force turns winds to the **right in the northern** hemisphere and to the **left in the southern**. A statement that it turns winds to the right in the southern hemisphere is false.",
        },
        {
          title: "No Coriolis force at the equator",
          body: "The Coriolis force is **zero at the equator** and **greatest at the poles**. This is why tropical cyclones never form right on the equator.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-planetary-winds",
      name: "Pressure belts and the three cells",
      intuition:
        "The equator is heated most, so air there rises. It flows towards the poles high up, cools, and sinks around 30° latitude, then flows back to the equator along the ground. That loop is the Hadley cell, and the surface part of it is the trade winds. Two more loops, the Ferrel and polar cells, complete the pattern up to the poles.",
      definition:
        "The global pattern:\n" +
        "- **Equatorial low** (0 to 5°): hot air rises; calm air called the **doldrums**; the trade winds meet here at the **ITCZ** (Inter-Tropical Convergence Zone).\n" +
        "- **Subtropical highs** (about 30°): air that rose at the equator **sinks** here. Most hot deserts lie under them.\n" +
        "- **Subpolar lows** (about 60°) and **polar highs**.\n" +
        "- **Trade winds** blow from the subtropical highs to the equator; **westerlies** from the subtropical highs towards the subpolar lows; **polar easterlies** from the poles.\n" +
        "- **Hadley cell** (0 to 30°): driven by heating at the equator. **Ferrel cell** (30 to 60°). **Polar cell** (60 to 90°).\n" +
        "- NCERT: the pattern of planetary winds depends on **latitudinal variation of heating**, the **pressure belts** and their seasonal shift with the Sun, the **distribution of continents and oceans**, and the **rotation of the Earth**.",
      table: {
        columns: ["Belt or cell", "Latitude", "What happens"],
        rows: [
          { cells: ["Equatorial low (doldrums, ITCZ)", "0 to 5°", "Hot air rises; trade winds meet"] },
          {
            cells: ["Subtropical high", "About 30°", "Air of the Hadley cell sinks"],
            noteAmber: "CDS 2020 (I): Hadley cell air rises at the equator and descends at the subtropical high-pressure cells.",
            pyqExampleId: "6d82491e-cd68-4fdb-af38-7ba3e0741d08",
          },
          { cells: ["Subpolar low", "About 60°", "Westerlies and polar easterlies meet"] },
          { cells: ["Polar high", "About 90°", "Cold air sinks"] },
          { cells: ["Hadley cell", "0 to 30°", "Driven by strong heating at the equator; gives the trade winds"] },
          { cells: ["Ferrel cell", "30 to 60°", "Gives the westerlies"] },
          { cells: ["Polar cell", "60 to 90°", "Gives the polar easterlies"] },
        ],
      },
      pyqExampleId: "6d82491e-cd68-4fdb-af38-7ba3e0741d08",
      selfCheckExample: {
        prompt: "Sailing ships going from Europe to the Caribbean first sailed south to about 20° N and then let a steady wind carry them west. Which wind was it, and why did it blow from the north-east?",
        steps: [
          "Between about 30° N and the equator, surface air flows from the subtropical high towards the equatorial low.",
          "That flow is the trade wind, the surface part of the Hadley cell.",
          "In the northern hemisphere the Coriolis force turns it to the right, so air heading south arrives from the north-east.",
        ],
        answer: "The north-east trade wind: air flowing to the equator, turned right by the Coriolis force.",
      },
      practiceSet: [
        { prompt: "Between which latitudes does the Hadley cell work?", answer: "From the equator to about 30°" },
        { prompt: "Which winds blow out from the polar highs?", answer: "The polar easterlies" },
        { prompt: "Which winds blow between about 30° and 60° latitude?", answer: "The westerlies" },
        { prompt: "What name is given to the calm belt of rising air near the equator?", answer: "The doldrums" },
      ],
      traps: [
        {
          title: "Hadley air sinks at 30°, not at the equator",
          body: "The ITCZ, doldrums and equatorial trough are where Hadley cell air **rises**. It **descends** at the **subtropical high-pressure belts** near 30°.",
        },
        {
          title: "All the listed factors count",
          body: "NCERT names heating by latitude, the distribution of continents and oceans, and the rotation of the Earth among the factors behind the planetary winds. A statement item listing all three expects all three.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-cyclones",
      name: "Tropical and temperate cyclones",
      intuition:
        "A cyclone is a low-pressure centre with winds spiralling into it. Tropical cyclones are born over warm seas and are steered westward by the trade winds. Temperate cyclones form where warm and cold air masses meet, and the westerlies carry them eastward. The same storm has different names in different oceans.",
      definition:
        "What every cyclone shares, and how the two kinds differ:\n" +
        "- Every cyclone has **low pressure at the centre**, ringed by closed isobars. (High pressure at the centre is an **anticyclone**.)\n" +
        "- Winds turn **anticlockwise** round a cyclone in the northern hemisphere and **clockwise** in the southern.\n" +
        "- **Tropical cyclones** form over **warm seas** (above about 27 °C), move **east to west** with the trade winds, and have a calm, clear centre called the **eye**.\n" +
        "- **Temperate cyclones** form along **fronts** in the middle latitudes and move **west to east** with the westerlies.",
      table: {
        columns: ["Name", "Where"],
        rows: [
          { cells: ["Cyclones", "Indian Ocean"] },
          { cells: ["Hurricanes", "Atlantic Ocean and the Caribbean"] },
          { cells: ["Typhoons", "Western Pacific and South China Sea"] },
          { cells: ["Willy-willies", "Off north-western Australia"] },
        ],
      },
      pyqExampleId: "e5a980b2-d4ca-4f9e-b8be-1cdee4e921b5",
      selfCheckExample: {
        prompt: "A storm forms over the Bay of Bengal and moves west onto the Odisha coast. Another forms over the North Atlantic near 50° N and moves east towards Britain. Which is the tropical cyclone, and what steers each?",
        steps: [
          "The Bay of Bengal storm formed over a warm tropical sea and moved west.",
          "Westward movement in the tropics is the work of the trade winds.",
          "The Atlantic storm at 50° N is in the middle latitudes and moved east, the direction of the westerlies.",
        ],
        answer: "The Bay of Bengal storm is tropical (steered by the trades); the Atlantic one is temperate (carried by the westerlies).",
      },
      practiceSet: [
        { prompt: "What is the calm, clear centre of a tropical cyclone called?", answer: "The eye" },
        { prompt: "Is the pressure at the centre of a cyclone high or low?", answer: "Low" },
        { prompt: "In which direction do temperate cyclones usually move?", answer: "West to east, with the westerlies" },
        { prompt: "Do tropical cyclones form over warm seas or cold seas?", answer: "Warm seas, above about 27 °C" },
      ],
      traps: [
        {
          title: "The eye is the centre, not the front",
          body: "The **eye** of a cyclone is its **calm centre**, where the air sinks and the sky clears. It is not the front edge of the storm.",
        },
        {
          title: "Hurricanes are tropical",
          body: "Hurricanes are tropical cyclones of the **Atlantic**. They form over warm tropical seas, **not** in the middle latitudes.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-local-winds",
      name: "Local winds and storms",
      intuition:
        "Local winds are set up by the land around them: a cold mountain draining air into a warm coast, a hot plain baking under the summer Sun, a sea breeze meeting a hot land. CDS asks you to put each name in its place.",
      definition:
        "Named winds and storms:\n" +
        "- **Bora**: a **cold, dry** wind blowing **down from the mountains** onto the **eastern shore of the Adriatic Sea**.\n" +
        "- **Mistral**: a cold wind blowing down the **Rhone valley** in France.\n" +
        "- **Bise**: a cold, dry wind of **Switzerland**.\n" +
        "- **Loo**: a **hot, dry** wind over the plains of north India in summer afternoons.\n" +
        "- **Kalbaisakhi** (Nor'westers): violent evening **thunderstorms** of **West Bengal** and Assam before the monsoon.\n" +
        "- **Mango showers**: NCERT's name for the **pre-monsoon showers** common in **Kerala and coastal Karnataka** at the end of summer, which help mangoes ripen early. NCERT also names **blossom showers**, which make **coffee** flowers blossom in Kerala and nearby areas.\n" +
        "- **Blizzard**: a violent **snowstorm** with strong wind, found in high snowy mountains and polar lands. In India, the Himalayan heights of states such as **Arunachal Pradesh**.",
      table: {
        columns: ["Wind or storm", "Kind", "Where"],
        rows: [
          {
            cells: ["Bora", "Cold, dry, blows down the mountains", "Eastern shore of the Adriatic Sea"],
            noteAmber: "CDS 2020 (I): Bora, not the Mistral or the Bise.",
            pyqExampleId: "6063de2c-6188-47e2-bb8e-a5ac36e2d368",
          },
          { cells: ["Mistral", "Cold", "Rhone valley, France"] },
          { cells: ["Bise", "Cold, dry", "Switzerland"] },
          { cells: ["Loo", "Hot, dry, summer afternoons", "Plains of north India"] },
          { cells: ["Kalbaisakhi", "Evening thunderstorms before the monsoon", "West Bengal and Assam"] },
          { cells: ["Mango showers", "Pre-monsoon showers", "Kerala and coastal Karnataka"] },
          {
            cells: ["Blizzard", "Violent snowstorm", "High snowy mountains and polar lands"],
            noteAmber: "CDS 2021 (II): of four states, only Arunachal Pradesh, with its high Himalaya, needs a blizzard warning.",
            pyqExampleId: "feea8238-0430-4a7c-9638-dee2bc254142",
          },
        ],
      },
      pyqExampleId: "6063de2c-6188-47e2-bb8e-a5ac36e2d368",
      selfCheckExample: {
        prompt: "A trekker in Bihar in May complains of a hot, dry wind in the afternoon, and her friend in Kolkata the same month gets a violent evening thunderstorm. Name both.",
        steps: [
          "A hot, dry summer afternoon wind over the north Indian plains is the Loo.",
          "Violent evening thunderstorms in West Bengal before the monsoon are the Kalbaisakhi, or Nor'westers.",
        ],
        answer: "The Loo in Bihar; a Kalbaisakhi (Nor'wester) in Kolkata.",
      },
      practiceSet: [
        { prompt: "Which cold wind blows down the Rhone valley in France?", answer: "The Mistral" },
        { prompt: "What is the hot, dry summer wind of the north Indian plains called?", answer: "The Loo" },
        { prompt: "What are the evening thunderstorms of West Bengal before the monsoon called?", answer: "Kalbaisakhi (Nor'westers)" },
        { prompt: "What is a blizzard?", answer: "A violent snowstorm with strong wind" },
      ],
      traps: [
        {
          title: "Bora and Mistral are different valleys",
          body: "Both are cold winds draining off mountains. The **Bora** reaches the **Adriatic** coast; the **Mistral** blows down the **Rhone** valley of France.",
        },
        {
          title: "Kalbaisakhi is Bengal, mango showers are the south-west",
          body: "**Kalbaisakhi** storms belong to **West Bengal** and Assam. The pre-monsoon showers of **Kerala and coastal Karnataka** are the **mango showers**.",
        },
      ],
    },
  ],
};
