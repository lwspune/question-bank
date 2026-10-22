import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_CL_ATMOSPHERE_NOTE: SubtopicNote = {
  subtopicName: "Composition and Layers of the Atmosphere",
  title: "Composition and Layers of the Atmosphere",
  oneLineDefinition:
    "Which gases make up the air and in what shares, why water vapour matters so much, how the atmosphere is layered by temperature, and where the ozone layer sits.",
  whyItMatters:
    "Twelve CDS questions from 2016 to 2026: 4 EASY, 6 MODERATE, 2 HARD. Five are about ozone, two about water vapour, and both HARD ones ask you to rank gases by their share of the air, so the NCERT gas table is worth learning in order.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgecl-gases",
      name: "The gases of the air and where they came from",
      intuition:
        "Dry air is almost all nitrogen and oxygen. Everything else, argon, carbon dioxide and the rare gases, adds up to about one per cent. The air we have today is the third atmosphere the Earth has had: the first was lost, the second came out of the hot interior, and living things changed the third.",
      definition:
        "Permanent gases (NCERT Class 11, share by volume of dry air):\n" +
        "- **Nitrogen** 78.08 and **oxygen** 20.95 per cent: together about 99 per cent.\n" +
        "- **Argon** 0.93 per cent: the third gas, far ahead of the rest.\n" +
        "- **Carbon dioxide** 0.036 per cent: small, but a strong **greenhouse gas** (it lets sunlight in and traps outgoing heat).\n" +
        "- The rare gases: **neon** 0.002, **krypton** 0.001, **helium** 0.0005, **xenon** 0.00009, **hydrogen** 0.00005 per cent.\n" +
        "- Other greenhouse gases: **methane**, **nitrous oxide**, **CFCs** and **water vapour**.\n\n" +
        "Evolution of the present atmosphere, in three stages:\n" +
        "- **Stage 1**: the **primordial atmosphere** (mostly hydrogen and helium) was lost, stripped away by the solar wind.\n" +
        "- **Stage 2**: the **hot interior** of the Earth gave out gases and water vapour (**degassing**).\n" +
        "- **Stage 3**: living things changed the mix through **photosynthesis**, which added oxygen.",
      table: {
        columns: ["Gas", "Share by volume (per cent)"],
        rows: [
          { cells: ["Nitrogen", "78.08"] },
          { cells: ["Oxygen", "20.95"] },
          { cells: ["Argon", "0.93"] },
          { cells: ["Carbon dioxide", "0.036"] },
          { cells: ["Neon", "0.002"] },
          { cells: ["Krypton", "0.001"] },
          { cells: ["Helium", "0.0005"] },
          { cells: ["Xenon", "0.00009"] },
          { cells: ["Hydrogen", "0.00005"] },
        ],
      },
      pyqExampleId: "6d474659-d28b-4e00-a3ec-438cf968c9ad",
      selfCheckExample: {
        prompt: "Rank argon, carbon dioxide and neon from the largest share of the air to the smallest.",
        steps: [
          "Argon is 0.93 per cent, the third gas of the air after nitrogen and oxygen.",
          "Carbon dioxide is 0.036 per cent.",
          "Neon is 0.002 per cent, smaller again.",
        ],
        answer: "Argon, then carbon dioxide, then neon.",
      },
      practiceSet: [
        { prompt: "Which gas is the third largest part of dry air, after nitrogen and oxygen?", answer: "Argon (0.93 per cent)" },
        { prompt: "About what percentage of dry air is oxygen?", answer: "About 21 per cent (20.95)" },
        { prompt: "Which has the larger share of the air: helium or neon?", answer: "Neon (0.002 per cent against 0.0005)" },
        { prompt: "Which gas, only 0.036 per cent of the air, is the best known greenhouse gas?", answer: "Carbon dioxide" },
      ],
      traps: [
        {
          title: "Argon, not carbon dioxide, is third",
          body: "Carbon dioxide gets the most attention, but **argon** (0.93 per cent) is about 25 times as plentiful. In any ranking of gases by volume, argon comes right after nitrogen and oxygen.",
        },
        {
          title: "Ascending means smallest first",
          body: "A ranking item that asks for **ascending** order wants the scarcest gas first. Write the shares beside each gas before you read the options, then check whether the option runs up or down.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-water-vapour",
      name: "Water vapour",
      intuition:
        "Water vapour is the one gas whose amount changes from place to place and hour to hour. Warm air can hold much more of it than cold air, so the hot wet tropics have the most and cold deserts and the poles have the least. Though small in amount, it shapes the weather.",
      definition:
        "What NCERT says about water vapour:\n" +
        "- It is a **variable gas**: up to **4 per cent** of the air in the warm, wet tropics, **less than 1 per cent** in the dry, cold deserts and polar regions.\n" +
        "- It **decreases with altitude**, because colder air holds less.\n" +
        "- It **absorbs** part of the incoming sunlight and **traps** the heat the Earth gives out, so it acts like a **blanket**: the Earth becomes neither too hot nor too cold.\n" +
        "- It plays a part in the **stability and instability** of the air, because it releases heat when it condenses.\n" +
        "- It is the source of all **clouds and precipitation**.",
      table: {
        columns: ["Place", "Water vapour in the air"],
        rows: [
          { cells: ["Warm, wet tropics", "Up to about 4 per cent"] },
          { cells: ["Dry, cold deserts and polar regions", "Less than 1 per cent"] },
          {
            cells: ["Higher up in the atmosphere", "Less than near the ground"],
            noteAmber: "CDS 2026 (II): water vapour is variable and decreases with altitude, and is under 1 per cent in deserts and polar regions. Both true.",
            pyqExampleId: "6050c17f-31df-40e7-bcde-d64cfd0a5b0f",
          },
        ],
      },
      pyqExampleId: "6050c17f-31df-40e7-bcde-d64cfd0a5b0f",
      selfCheckExample: {
        prompt: "A desert has hot days and very cold nights, while a humid coastal town nearby stays mild all night. Which property of water vapour explains the difference?",
        steps: [
          "Water vapour traps the heat that the ground gives out at night.",
          "Dry desert air has little water vapour, so the heat escapes quickly.",
          "Humid air keeps the heat in, like a blanket.",
        ],
        answer: "Water vapour acts as a blanket; the desert has too little of it to hold the night heat.",
      },
      practiceSet: [
        { prompt: "Up to what percentage of the air can water vapour reach in the warm, wet tropics?", answer: "About 4 per cent" },
        { prompt: "Why does water vapour matter for stability and instability of air?", answer: "It releases heat when it condenses, which can keep rising air warm and make it unstable" },
        { prompt: "Water vapour is the source of what two weather features?", answer: "Clouds and precipitation" },
        { prompt: "Does warm air or cold air hold more water vapour?", answer: "Warm air" },
      ],
      traps: [
        {
          title: "Variable, not permanent",
          body: "Nitrogen, oxygen and argon are **permanent** gases with a fixed share. **Water vapour** is **variable**: its share changes with place, season and height.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-layers",
      name: "Layers of the atmosphere",
      intuition:
        "The atmosphere is cut into layers by how temperature changes with height. Temperature falls through the lowest layer, rises through the ozone layer, falls again, and then rises very high up. Each turning point is a 'pause'.",
      definition:
        "From the ground up:\n" +
        "- **Troposphere**: about **8 km** thick at the poles and **18 km** at the equator. All **weather** happens here. Temperature **falls** with height.\n" +
        "- **Tropopause**: the top of the troposphere, where temperature **stays nearly the same** with height (an **isothermal** zone), about minus 80 °C over the equator.\n" +
        "- **Stratosphere**: up to about **50 km**. Holds the **ozone layer**, and temperature **rises** with height because ozone absorbs ultraviolet rays.\n" +
        "- **Mesosphere**: about 50 to 80 km. Temperature **falls** again, to about minus 100 °C at 80 km, the **coldest** part of the atmosphere (the mesopause).\n" +
        "- **Thermosphere** (with the **ionosphere**, about 80 to 400 km): temperature **rises** again; its charged layers **reflect radio waves** back to Earth.\n" +
        "- **Exosphere**: the thin outermost layer.",
      table: {
        columns: ["Layer", "Height", "Temperature with height", "Remember it for"],
        rows: [
          { cells: ["Troposphere", "Ground to 8 km (poles) or 18 km (equator)", "Falls", "All weather"] },
          { cells: ["Stratosphere", "Up to about 50 km", "Rises", "Ozone layer, calm air for jets"] },
          { cells: ["Mesosphere", "About 50 to 80 km", "Falls", "Coldest air, near its top"] },
          { cells: ["Thermosphere and ionosphere", "About 80 to 400 km", "Rises", "Reflects radio waves"] },
          { cells: ["Exosphere", "Above the thermosphere", "Very thin air", "Outermost layer"] },
        ],
      },
      pyqExampleId: "2480920c-6eba-4057-ab48-cc1008f5103d",
      selfCheckExample: {
        prompt: "Clouds, rain and storms are almost never found above about 18 km. Why?",
        steps: [
          "Weather needs water vapour and rising air.",
          "Nearly all the water vapour and all the rising, mixing air are in the troposphere.",
          "The troposphere ends at about 18 km over the equator, and less elsewhere.",
        ],
        answer: "All weather happens in the troposphere, which is at most about 18 km thick.",
      },
      practiceSet: [
        { prompt: "In which layer of the atmosphere does all weather happen?", answer: "The troposphere" },
        { prompt: "About how thick is the troposphere at the equator?", answer: "About 18 km" },
        { prompt: "Which layer reflects radio waves back to the Earth?", answer: "The ionosphere" },
        { prompt: "Is the troposphere thicker at the equator or at the poles?", answer: "At the equator (about 18 km against 8 km)" },
      ],
      traps: [
        {
          title: "The troposphere is thickest at the equator",
          body: "Strong heating at the equator lifts air higher, so the troposphere is about **18 km** thick there and only about **8 km** at the poles.",
        },
        {
          title: "Coldest is the top of the mesosphere",
          body: "The lowest temperature in the atmosphere is near the **top of the mesosphere** (about minus 100 °C at 80 km), not at the tropopause and not in the stratosphere.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-ozone",
      name: "The ozone layer",
      intuition:
        "Ozone is oxygen with three atoms instead of two. In the stratosphere it soaks up most of the Sun's ultraviolet rays, which would otherwise burn skin and harm living things. CFC gases released by people break ozone down, and the damage is worst over the South Pole.",
      definition:
        "Facts CDS asks:\n" +
        "- Ozone (O₃) is a form of oxygen with **three oxygen atoms**, made by **chemical reactions** in sunlight.\n" +
        "- About **90 per cent** of all ozone is in the **stratosphere** (mostly 15 to 35 km): the **ozone layer**.\n" +
        "- It **absorbs ultraviolet** radiation, which is why the stratosphere warms with height. Ultraviolet rays that get through cause **skin cancer**.\n" +
        "- The **ozone hole** is over **Antarctica**, caused mainly by **CFCs** (chlorofluorocarbons), whose chlorine destroys ozone.\n" +
        "- The **Montreal Protocol** (1987) cut CFC use. **16 September** is the International Day for the Preservation of the Ozone Layer.",
      table: {
        columns: ["Question", "Answer"],
        rows: [
          {
            cells: ["Where is most ozone?", "In the stratosphere, about 90 per cent of it"],
            noteAmber: "Asked twice: CDS 2017 (II) and 2021 (I). Not the troposphere, not the ionosphere.",
            pyqExampleId: "07b13bfc-b1ae-44cf-ab71-94a5304f226f",
          },
          {
            cells: ["Does the stratosphere let ultraviolet in?", "No, its ozone absorbs most of it"],
            noteAmber: "CDS 2017 (II): ultraviolet causes skin cancer, but the stratosphere blocks it rather than letting it in.",
            pyqExampleId: "41714f82-a7c2-49e2-adc2-6b3da8a50e04",
          },
          {
            cells: ["Where is the ozone hole, and what causes it?", "Over Antarctica, mainly CFCs"],
            noteAmber: "CDS 2024 (II): Antarctic and CFCs, not the Arctic and not carbon dioxide.",
            pyqExampleId: "73118bc7-a7c7-4bfd-9a28-124ecb2e585b",
          },
          {
            cells: ["Ozone Day", "16 September (Montreal Protocol signed, 1987)"],
            noteAmber: "CDS 2020 (II): the false statement put Ozone Day in November.",
            pyqExampleId: "8020e210-c91a-42b2-b10e-fd23932e9585",
          },
        ],
      },
      pyqExampleId: "087e9756-fb5a-41fc-b476-3af03ce4a76a",
      selfCheckExample: {
        prompt: "Temperature falls with height in the troposphere but rises with height in the stratosphere. What makes the difference?",
        steps: [
          "The troposphere is heated from below, by the warm ground, so it gets colder upwards.",
          "The stratosphere holds the ozone layer.",
          "Ozone absorbs ultraviolet rays and warms the air around it, more so higher up.",
        ],
        answer: "Ozone in the stratosphere absorbs ultraviolet rays and heats that layer.",
      },
      practiceSet: [
        { prompt: "How many oxygen atoms are there in one molecule of ozone?", answer: "Three" },
        { prompt: "On which date is the International Day for the Preservation of the Ozone Layer?", answer: "16 September" },
        { prompt: "Which agreement of 1987 cut the use of CFCs?", answer: "The Montreal Protocol" },
        { prompt: "Over which continent does the ozone hole form?", answer: "Antarctica" },
      ],
      traps: [
        {
          title: "The hole is over Antarctica, the cause is CFCs",
          body: "Options mix the pairs. The ozone hole is over the **Antarctic**, not the Arctic, and it is caused mainly by **CFCs**, not by carbon dioxide (which warms the planet but does not destroy ozone).",
        },
        {
          title: "Ozone Day is in September",
          body: "The International Day for the Preservation of the Ozone Layer is **16 September**, the date the Montreal Protocol was signed. A statement putting it in November is false.",
        },
      ],
    },
  ],
};
