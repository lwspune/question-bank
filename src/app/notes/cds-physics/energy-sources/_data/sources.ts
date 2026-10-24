import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_PH_EN_SOURCES_NOTE: SubtopicNote = {
  subtopicName: "Sources of Energy",
  title: "Sources of Energy",
  oneLineDefinition:
    "Conventional and non-conventional sources of energy, how a thermal power station makes electricity, what biogas is made of, and how glass traps the Sun's heat.",
  whyItMatters:
    "Five CDS questions from 2017 (II) to 2023 (I), two of them in the 2022 (I) paper. Biogas has been asked twice; the others ask which source is non-conventional, how a thermal power station works, and how a greenhouse traps heat.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsphen-kinds",
      name: "Conventional and non-conventional sources",
      intuition:
        "Conventional sources are the ones we have used on a large scale for a long time: firewood, coal, petroleum, natural gas, and electricity from big dams and thermal plants. Fossil fuels took millions of years to form and will run out. Non-conventional sources are newer ways of using energy that keeps coming back: sunlight, wind, tides, the heat inside the Earth, and biogas. In a thermal power station, burning fuel boils water, the steam spins a turbine, and the turbine turns a generator.",
      definition:
        "Two ways to sort energy sources:\n" +
        "- **Conventional**: firewood, coal, petroleum, natural gas, and electricity from hydroelectric and thermal power stations. The fossil fuels are **non-renewable** (exhaustible).\n" +
        "- **Non-conventional (alternative)**: **solar**, wind, tidal, wave, geothermal, biomass and biogas. These are **renewable**.\n" +
        "- **Thermal power station**: burns coal, oil or natural gas; the heat turns water into **steam**; the steam spins a **turbine**; the turbine turns a **generator**, which makes electricity.\n" +
        "- **Energy chain** in a thermal plant: chemical energy, then heat, then kinetic energy of the turbine, then electrical energy.",
      table: {
        columns: ["Source", "Kind"],
        rows: [
          { cells: ["Coal", "Conventional, non-renewable"] },
          { cells: ["Petroleum and natural gas", "Conventional, non-renewable"] },
          { cells: ["Solar energy", "Non-conventional, renewable"] },
          { cells: ["Wind, tides and geothermal heat", "Non-conventional, renewable"] },
          {
            cells: ["Thermal power station", "Burns fuel to raise steam that spins a turbine and generator"],
            noteAmber: "CDS 2023 (I): fuel heats water to steam, which drives the turbine; that is how the station makes electricity.",
            pyqExampleId: "cdb4b95b-0543-43d8-a72b-8c11a45baaca",
          },
        ],
      },
      pyqExampleId: "cdb4b95b-0543-43d8-a72b-8c11a45baaca",
      selfCheckExample: {
        prompt: "Sort these into renewable and non-renewable sources: coal, wind, natural gas, biogas, petroleum, sunlight.",
        steps: [
          "A source is renewable if nature keeps replacing it as fast as we use it.",
          "Wind, biogas and sunlight keep coming back.",
          "Coal, natural gas and petroleum took millions of years to form and are being used up.",
        ],
        answer: "Renewable: wind, biogas, sunlight. Non-renewable: coal, natural gas, petroleum.",
      },
      practiceSet: [
        { prompt: "Is coal a renewable or a non-renewable source of energy?", answer: "Non-renewable" },
        { prompt: "Is solar energy a conventional or a non-conventional source?", answer: "Non-conventional" },
        { prompt: "Name a non-conventional source that uses the heat inside the Earth.", answer: "Geothermal energy" },
        { prompt: "Name a non-conventional source that uses the rise and fall of the sea.", answer: "Tidal energy" },
      ],
      traps: [
        {
          title: "Fossil fuels are conventional and exhaustible",
          body: "Coal, petroleum and natural gas are the classic **conventional** sources, and they are **non-renewable**. Sunlight, wind and tides are never used up, which is why they are called non-conventional, renewable sources.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphen-biogas",
      name: "Biogas",
      intuition:
        "Biogas is made when cow dung, plant waste or sewage rots in a closed tank with no air. Bacteria that live without oxygen break the waste down and give off a gas that is mostly methane, which burns with a clean blue flame. Because there is always more dung and waste, biogas is a renewable fuel, and what is left in the tank makes good manure.",
      definition:
        "Biogas facts:\n" +
        "- **Made by** anaerobic decomposition (in the **absence of oxygen**) of cow dung, plant waste and sewage, in a biogas plant.\n" +
        "- **Composition**: mainly **methane** (about 55 to 75 per cent) with **carbon dioxide** making up most of the rest, plus traces of hydrogen sulphide and hydrogen.\n" +
        "- **Renewable**, because the raw material is replaced all the time.\n" +
        "- A good fuel: burns **without smoke**, leaves no ash, and has a high heating value.\n" +
        "- The **slurry** left behind is rich in nitrogen and phosphorus and is used as **manure**.",
      table: {
        columns: ["Property of biogas", "Fact"],
        rows: [
          { cells: ["Main gas", "Methane, about 55 to 75 per cent"] },
          { cells: ["Second gas", "Carbon dioxide"] },
          { cells: ["How it is formed", "Anaerobic decomposition of dung and waste"] },
          {
            cells: ["Renewable or not", "Renewable"],
            noteAmber: "CDS 2022 (I): the false statement about biogas is that it is non-renewable.",
            pyqExampleId: "aaa64352-9dfb-4b28-a6da-83ccb6b2d261",
          },
          { cells: ["Leftover slurry", "Used as manure"] },
        ],
      },
      pyqExampleId: "fafd1b66-ea14-44b7-9cab-39dfd101692b",
      selfCheckExample: {
        prompt: "A village builds a biogas plant for its cattle dung. Give two benefits besides the cooking gas.",
        steps: [
          "The gas burns without smoke, so kitchens stay clean and healthier than with dung cakes or wood.",
          "The slurry left after digestion is a rich manure for the fields.",
          "Dung that would otherwise lie around is disposed of safely.",
        ],
        answer: "Smoke-free cooking and good manure from the slurry (and cleaner surroundings).",
      },
      practiceSet: [
        { prompt: "In the presence or the absence of oxygen is cow dung decomposed in a biogas plant?", answer: "In the absence of oxygen (anaerobic)" },
        { prompt: "Is biogas a renewable source of energy?", answer: "Yes" },
        { prompt: "What is the slurry from a biogas plant used for?", answer: "Manure" },
        { prompt: "Does biogas burn with smoke?", answer: "No: it burns without smoke" },
      ],
      traps: [
        {
          title: "Biogas is methane with carbon dioxide",
          body: "The two main gases are **methane** and **carbon dioxide**. Sulphur dioxide and nitric oxide are not major parts of biogas; hydrogen sulphide is only a trace.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsphen-solar",
      name: "Solar heating and the greenhouse effect",
      intuition:
        "The Sun is very hot, so most of its radiation is short in wavelength: visible light and short infrared. Glass lets this in. The ground and plants inside a glass house are only warm, so they give out long-wavelength infrared, and glass does not let that out. Energy comes in more easily than it leaves, so the inside heats up. Solar cookers use the same trick.",
      definition:
        "Using the Sun's energy:\n" +
        "- **Greenhouse effect** in a glass house: **short-wavelength** radiation from the Sun passes through the glass; the **long-wavelength infrared** given out by the warm ground and plants **cannot pass back out**, so heat is trapped.\n" +
        "- A hotter body gives out radiation of **shorter** wavelength; a cooler one, longer.\n" +
        "- **Solar cooker (box type)**: blackened inside to **absorb** heat, a **glass lid** to trap it, and a plane mirror to reflect more sunlight in.\n" +
        "- **Solar cell**: turns sunlight **directly into electricity**; usually made of **silicon**.",
      table: {
        columns: ["Device or effect", "How it uses sunlight"],
        rows: [
          { cells: ["Glass greenhouse", "Lets short-wavelength sunlight in, traps long-wavelength infrared"] },
          { cells: ["Box-type solar cooker", "Black inside to absorb, glass lid to trap heat, mirror to reflect light in"] },
          { cells: ["Solar cell", "Sunlight to electricity directly; made of silicon"] },
          { cells: ["Solar water heater", "Black pipes absorb heat and warm the water"] },
        ],
      },
      pyqExampleId: "3a7fd476-4868-4711-9f63-11d0f6a6c04f",
      selfCheckExample: {
        prompt: "A car is parked in the Sun with all its windows shut. Why does the inside become much hotter than the air outside?",
        steps: [
          "Sunlight, mostly short wavelengths, passes through the window glass and warms the seats.",
          "The warm seats give out long-wavelength infrared, which the glass does not let through.",
          "Heat comes in faster than it can leave, so the temperature inside keeps rising.",
        ],
        answer: "The glass lets short-wavelength sunlight in but traps the long-wavelength infrared from the warm seats.",
      },
      practiceSet: [
        { prompt: "Why is the inside of a solar cooker painted black?", answer: "Black surfaces absorb the most heat" },
        { prompt: "Which device turns sunlight directly into electricity?", answer: "A solar cell" },
        { prompt: "Which element are most solar cells made of?", answer: "Silicon" },
        { prompt: "Does a hotter body give out radiation of shorter or longer wavelength?", answer: "Shorter" },
      ],
      traps: [
        {
          title: "Glass lets short waves in and keeps long waves out",
          body: "Glass lets the Sun's **short-wavelength** radiation in and blocks the **long-wavelength** infrared from warm objects inside. It does not block all infrared, and it does not let the long-wave heat back out.",
        },
      ],
    },
  ],
};
