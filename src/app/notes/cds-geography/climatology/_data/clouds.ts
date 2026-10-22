import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_CL_CLOUDS_NOTE: SubtopicNote = {
  subtopicName: "Humidity, Clouds and Precipitation",
  title: "Humidity, Clouds and Precipitation",
  oneLineDefinition:
    "How the moisture in the air is measured, how it turns into dew, fog and rain, and how to name a cloud from its look and its height.",
  whyItMatters:
    "Twelve CDS questions from 2018 to 2025: 3 EASY, 9 MODERATE. Eight of them ask you to name, match or order clouds, five of those in 2023 and 2024 alone, so the cloud tables on this page are the best value in the chapter.",
  concepts: [
    {
      kind: "formula" as const,
      slug: "cdsgecl-humidity",
      name: "Humidity and relative humidity",
      intuition:
        "Air holds water as an invisible gas, and warm air can hold more of it than cold air. Relative humidity compares what the air holds with what it could hold at its present temperature. Cool the air without adding water and the relative humidity climbs, until at the dew point the air is full and the vapour starts to condense.",
      definition:
        "The measures:\n" +
        "- **Humidity**: the **moisture content** of the air (water vapour) at a given time and place.\n" +
        "- **Absolute humidity**: the actual weight of water vapour in a volume of air, in grams per cubic metre.\n" +
        "- **Relative humidity**: the moisture present as a **percentage** of the most the air could hold **at that temperature**. So it needs **both** the absolute humidity **and** the temperature.\n" +
        "- Air holding all it can is **saturated** (relative humidity 100 per cent). The temperature at which this happens is the **dew point**.\n" +
        "- Fog, cloud and dew are **products** of condensation, not humidity itself.",
      formula: {
        label: "Relative humidity",
        latex: "\\text{RH} = \\frac{\\text{water vapour present}}{\\text{most water vapour the air can hold at that temperature}} \\times 100",
      },
      authoredExample: {
        prompt: "A cubic metre of air holds 12 g of water vapour. At its temperature it could hold 20 g. What is its relative humidity?",
        steps: [
          "\\(\\text{RH} = \\frac{12}{20} \\times 100\\).",
          "\\(\\frac{12}{20} = 0.6\\), and \\(0.6 \\times 100 = 60\\).",
        ],
        answer: "60 per cent.",
      },
      selfCheckExample: {
        prompt: "That same air, holding 12 g of vapour per cubic metre, cools at night until it can hold only 12 g. What is its relative humidity now, and what starts to happen?",
        steps: [
          "\\(\\text{RH} = \\frac{12}{12} \\times 100 = 100\\) per cent.",
          "The air is saturated: it has reached its dew point.",
          "Any further cooling makes vapour condense as dew, fog or cloud.",
        ],
        answer: "100 per cent: the air is saturated and condensation begins.",
      },
      pyqExampleId: "238dcd81-bf73-46dd-8f60-ddf0a3300d7c",
      practiceSet: [
        { prompt: "Air holds 10 g of vapour per cubic metre and could hold 40 g at its temperature. What is its relative humidity?", answer: "25 per cent" },
        { prompt: "What is the temperature at which air becomes saturated called?", answer: "The dew point" },
        { prompt: "If air warms up but gains no water, does its relative humidity rise or fall?", answer: "It falls, because warmer air can hold more" },
        { prompt: "What is the relative humidity of saturated air?", answer: "100 per cent" },
      ],
      traps: [
        {
          title: "Humidity is the vapour, not the droplets",
          body: "**Humidity** is the water vapour in the air. Suspended droplets are **fog** or **cloud**, and moisture deposited on surfaces is **dew**: these are what condensation makes, not humidity itself.",
        },
        {
          title: "Relative humidity needs two numbers",
          body: "Neither temperature alone nor absolute humidity alone gives the relative humidity. You need the vapour present **and** the temperature, which sets how much the air could hold.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-condensation",
      name: "Dew, frost, fog and how rain forms",
      intuition:
        "When moist air is cooled to its dew point, the vapour turns back to water on whatever is nearby: on grass it is dew, on dust particles in the air near the ground it is fog, higher up it is cloud. To fall as rain, the tiny cloud droplets must grow much bigger, and there are two ways for that to happen.",
      definition:
        "Forms of condensation:\n" +
        "- **Dew**: water drops on cool surfaces (grass, leaves) when the dew point is **above freezing**.\n" +
        "- **Frost**: ice on cold surfaces when the dew point is **below freezing**.\n" +
        "- **Fog**: a **cloud with its base at or very near the ground**. **Radiation fog** forms when the land cools by radiation at night. **Advection fog** forms when moist air blows over a cold surface and is chilled by contact.\n" +
        "- **Mist** is like fog but holds more moisture and thins visibility less.\n\n" +
        "How cloud droplets grow into rain:\n" +
        "- **Collision and coalescence**: big drops sweep up small ones as they fall. This is how rain forms in **warm clouds**, those that **do not reach the freezing level**.\n" +
        "- **Ice-crystal (Bergeron) process**: in clouds that rise **above the freezing level**, ice crystals grow at the expense of water drops, then fall and melt.",
      table: {
        columns: ["Form", "How it forms"],
        rows: [
          { cells: ["Dew", "Vapour condenses on cool surfaces above freezing"] },
          { cells: ["Frost", "Vapour freezes on surfaces below freezing"] },
          { cells: ["Radiation fog", "Ground cools by radiation at night and chills the air"] },
          { cells: ["Advection fog", "Moist air blows over a cold surface"] },
          {
            cells: ["Rain by collision and coalescence", "In clouds that stay below the freezing level"],
            noteAmber: "CDS 2018 (I): the collision and coalescence process applies to clouds that do not extend beyond the freezing level.",
            pyqExampleId: "170b45b3-65ca-4b28-ae72-9d54a7ef2fcd",
          },
        ],
      },
      pyqExampleId: "3c061775-6294-4604-a0ba-053afefdb62e",
      selfCheckExample: {
        prompt: "On a clear winter night the grass in a Delhi park is wet by morning, while the grass in a Shimla park is white. Explain the difference.",
        steps: [
          "In both places the ground cooled at night and the air touching it reached its dew point.",
          "In Delhi the dew point was above freezing, so the vapour condensed as water drops: dew.",
          "In Shimla it was below freezing, so the vapour turned straight to ice: frost.",
        ],
        answer: "Delhi got dew (dew point above freezing); Shimla got frost (dew point below freezing).",
      },
      practiceSet: [
        { prompt: "What forms on grass when the dew point is below freezing?", answer: "Frost" },
        { prompt: "By which process does rain form in clouds that rise above the freezing level?", answer: "The ice-crystal (Bergeron) process" },
        { prompt: "In collision and coalescence, what happens to the drops?", answer: "Big drops sweep up small ones as they fall and grow into raindrops" },
        { prompt: "Which holds more moisture: mist or fog?", answer: "Mist" },
      ],
      traps: [
        {
          title: "Warm-cloud rain is collision and coalescence",
          body: "Collision and coalescence works in clouds that **do not reach the freezing level**. Clouds that rise above it make rain mainly through **ice crystals**. It does not apply to all clouds.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-cloud-families",
      name: "Cloud families by height",
      intuition:
        "Clouds come in two basic shapes: flat layers (stratiform) and heaps (cumuliform). They are also grouped by height: high, middle and low. A cloud's name tells you both. 'Cirro' means high, 'alto' means middle, 'nimbo' or 'nimbus' means it brings rain or snow.",
      definition:
        "How clouds are named:\n" +
        "- Two basic forms: **stratiform** (layers) and **cumuliform** (heaps).\n" +
        "- **High clouds** (above about 6 km, 20,000 feet): **cirrus, cirrostratus, cirrocumulus**. They are made **entirely of ice crystals**.\n" +
        "- **Middle clouds** (about 2 to 6 km): **altostratus, altocumulus**.\n" +
        "- **Low clouds** (below about 2 km): **stratus, stratocumulus, nimbostratus**.\n" +
        "- **Vertical clouds** that span the heights: **cumulus** and **cumulonimbus**.\n" +
        "- A cloud with **nimbo** or **nimbus** in its name gives **precipitation**.\n" +
        "- **Cirrocumulus** makes small rippled patches like fish scales: the **mackerel sky**.",
      table: {
        columns: ["Family", "Height", "Clouds"],
        rows: [
          {
            cells: ["High", "Above about 6 km (20,000 to 40,000 feet)", "Cirrus, cirrostratus, cirrocumulus"],
            noteAmber: "CDS 2024 (I): high, thin ice-crystal ripples at 20,000 to 40,000 feet, the 'mackerel sky', are cirrocumulus.",
            pyqExampleId: "4180570f-ebfd-470a-a019-32d7e53df5c7",
          },
          { cells: ["Middle", "About 2 to 6 km", "Altostratus, altocumulus"] },
          {
            cells: ["Low", "Below about 2 km", "Stratus, stratocumulus, nimbostratus"],
            noteAmber: "CDS 2023 (II): lowest to highest runs nimbostratus, altostratus, cirrocumulus, cirrus.",
            pyqExampleId: "aeb88f59-497f-4254-8c73-4ada911d2128",
          },
          { cells: ["Vertical", "From low bases to great heights", "Cumulus, cumulonimbus"] },
        ],
      },
      pyqExampleId: "ef1e0680-8e32-4937-9e4e-233bb95a4f64",
      selfCheckExample: {
        prompt: "Put cirrostratus, stratocumulus and altocumulus in order from lowest to highest.",
        steps: [
          "Stratocumulus has no height prefix and is a low cloud, below about 2 km.",
          "Altocumulus has 'alto', so it is a middle cloud, about 2 to 6 km.",
          "Cirrostratus has 'cirro', so it is a high cloud, above about 6 km.",
        ],
        answer: "Stratocumulus, altocumulus, cirrostratus.",
      },
      practiceSet: [
        { prompt: "Which family does altostratus belong to: high, middle or low?", answer: "Middle" },
        { prompt: "What are high clouds made of?", answer: "Ice crystals" },
        { prompt: "Which cloud makes the fish-scale pattern called the mackerel sky?", answer: "Cirrocumulus" },
        { prompt: "Above about what height do the high clouds form?", answer: "About 6 km (20,000 feet)" },
      ],
      traps: [
        {
          title: "Stratus clouds are low, not high",
          body: "Stratus, stratocumulus and nimbostratus are **low** clouds. The **high** family is cirrus, cirrostratus and cirrocumulus: look for 'cirro' or 'cirrus' in the name.",
        },
        {
          title: "Nimbostratus is low, though it is thick",
          body: "Nimbostratus is a thick, dark rain cloud, but its base is **low**. In a lowest-to-highest ordering it comes **before** any 'alto' or 'cirro' cloud.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgecl-cloud-forms",
      name: "The four basic cloud forms and the thundercloud",
      intuition:
        "Most cloud names are built from four Latin words: cirrus (a curl of hair), cumulus (a heap), stratus (a layer) and nimbus (a rain cloud). Learn the look that goes with each word. A cumulus that keeps growing upward becomes the thundercloud, cumulonimbus.",
      definition:
        "The four forms (NCERT Class 11):\n" +
        "- **Cirrus**: high (8 to 12 km), **thin, feathery** clouds of **ice**, white in colour.\n" +
        "- **Cumulus**: look like **cotton wool**, with a **flat base**; they lie in **patches**, generally at **4 to 7 km**, and **grow upward**. Small ones are **fair-weather** clouds.\n" +
        "- **Stratus**: **layered** clouds that **spread horizontally** over large areas. A low stratus looks like **fog lifted off the ground** ('low ceiling').\n" +
        "- **Nimbus**: **dark**, thick, **rain-giving** clouds, low or middle level, sometimes very near the surface.\n\n" +
        "The thundercloud:\n" +
        "- A cumulus grows by convection into a towering **cumulus congestus**, and then into a **cumulonimbus**.\n" +
        "- Cumulonimbus is a huge **cauliflower-shaped tower** whose top spreads into an **anvil**. It is the **only** cloud that brings **hail, thunder and lightning**.",
      table: {
        columns: ["Cloud", "Look", "Weather"],
        rows: [
          {
            cells: ["Cirrus", "Thin, feathery, all ice", "Fair"],
            noteAmber: "Matched twice: CDS 2018 (I) as 'feathery' and CDS 2022 (II) as 'entirely of ice particles'.",
            pyqExampleId: "21ed9637-5c36-40c6-9081-5460e3d8b9b5",
          },
          {
            cells: ["Cumulus", "Cotton wool heaps with a flat base, in patches", "Fair, if small"],
            noteAmber: "CDS 2025 (I): cotton wool look, flat base, patches, 4 to 7 km.",
            pyqExampleId: "9ad903a9-44ea-4ed8-9cd5-7ebfd1b8533f",
          },
          { cells: ["Stratus", "Flat layer spreading sideways, like lifted fog", "Dull, grey"] },
          {
            cells: ["Nimbus (and nimbostratus)", "Dark, thick", "Rain or snow"],
            noteAmber: "CDS 2022 (II): nimbostratus matched with storm clouds.",
            pyqExampleId: "73efb37b-dca5-4c5b-91bd-d0f902afd39c",
          },
          {
            cells: ["Cumulonimbus", "Towering cauliflower with an anvil top", "Hail, thunder, lightning"],
            noteAmber: "CDS 2024 (II): cumulonimbus grows from cumulus congestus.",
            pyqExampleId: "5859f924-06fe-446a-be31-47ca0fb46780",
          },
        ],
      },
      pyqExampleId: "b9d129c8-2ec2-4626-a426-174fa0e2d064",
      selfCheckExample: {
        prompt: "A low, grey, even sheet of cloud covers the whole sky like fog lifted off the ground, with no gaps and no heaps. Name the cloud form and say how it differs from cumulus.",
        steps: [
          "A flat layer spreading sideways over a large area is the mark of stratus.",
          "Its low, fog-like look fits stratus too.",
          "Cumulus is the opposite: separate heaps with flat bases that grow upward.",
        ],
        answer: "Stratus: it spreads horizontally in a layer, while cumulus grows vertically in heaps.",
      },
      practiceSet: [
        { prompt: "Which cloud has a feathery look and is made of ice?", answer: "Cirrus" },
        { prompt: "Which cloud form spreads horizontally in layers?", answer: "Stratus" },
        { prompt: "Which cloud form is rain-giving?", answer: "Nimbus" },
        { prompt: "At what height does NCERT say cumulus clouds generally form?", answer: "About 4 to 7 km" },
      ],
      traps: [
        {
          title: "Cumulus grows up, stratus spreads out",
          body: "In a matching list, **cumulus** is the **vertically growing** cloud and **stratus** the **horizontally spreading** one. Swapping them is the usual wrong option.",
        },
        {
          title: "Cumulonimbus comes from cumulus, not nimbostratus",
          body: "A cumulonimbus is a cumulus that has grown very tall, through the **cumulus congestus** stage. It does not grow out of nimbostratus, altostratus or cirrocumulus.",
        },
      ],
    },
  ],
};
