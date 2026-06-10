import type { SubtopicNote } from "@/app/notes/_types";

export const PHASE_CHANGE_AND_BOILING_NOTE: SubtopicNote = {
  subtopicName: "Phase Change and Boiling",
  title: "Phase Change, Boiling, Evaporation, and Cooling",
  oneLineDefinition:
    "When a substance changes phase it absorbs or releases latent heat at constant temperature; boiling happens when vapour pressure equals atmospheric pressure, so changing the pressure changes the boiling point.",
  whyItMatters:
    "About 7 PYQs, mostly EASY recall with a couple of MODERATE conceptual ones. " +
    "The recurring facts: the definition of latent heat of vaporization, the pressure-boiling-point link (pressure cooker cooks faster, water boils cooler on a mountain), and evaporation versus boiling. " +
    "One MODERATE trap is Newton's law of cooling — knowing exactly which situations it applies to (gentle convective cooling, not phase change or furnace radiation).",
  concepts: [
    // Concept 1 — latent heat of fusion and vaporization
    {
      kind: "formula" as const,
      slug: "latent-heat-of-phase-change",
      name: "Latent heat of fusion and vaporization",
      intuition:
        "While a substance changes state — solid melting to liquid, or liquid boiling to vapour — its temperature stays FLAT even though heat is still pouring in. That heat goes entirely into breaking the bonds between molecules, not into raising the temperature. That hidden heat is the latent heat.",
      definition:
        "**Latent heat** is the heat per unit mass absorbed or released during a phase change **with no change of temperature** (\\(Q = mL\\)). Two kinds:\n" +
        "- **Latent heat of fusion** — heat to change unit mass of **solid to liquid** (melting) at the melting point.\n" +
        "- **Latent heat of vaporization** — heat to change unit mass of **liquid to vapour** (boiling) at the boiling point, with no temperature change.\n" +
        "The temperature plateau during melting/boiling is the signature of latent heat.",
      formula: {
        label: "Latent heat",
        latex: "Q = mL",
        symbols: [
          { symbol: "Q", meaning: "heat absorbed or released at constant temperature" },
          { symbol: "m", meaning: "mass changing phase" },
          { symbol: "L", meaning: "specific latent heat (fusion or vaporization)" },
        ],
      },
      authoredExample: {
        prompt: "How much heat changes 50 g of water at 100°C into steam at 100°C? (Latent heat of vaporization = 540 cal/g.)",
        steps: [
          "This is a pure phase change at constant temperature, so use \\(Q = mL\\).",
          "\\(Q = 50\\times 540 = 27000\\) cal.",
          "No \\(mc\\,\\Delta\\theta\\) term is needed because the temperature stays at 100°C throughout.",
        ],
        answer: "27000 cal (27 kcal).",
      },
      selfCheckExample: {
        prompt:
          "The specific latent heat of vaporization is the heat needed to change unit mass of a substance from what, to what — and what happens to the temperature?",
        steps: [
          "Vaporization is the liquid-to-vapour transition.",
          "Latent heat of vaporization changes unit mass of LIQUID into VAPOUR.",
          "It happens at constant temperature (the boiling point) — the temperature does not change while it occurs.",
        ],
        answer: "From liquid to vapour, with no change in temperature.",
      },
      practiceSet: [
        { prompt: "Liquid-to-gas latent heat is called?", answer: "Latent heat of vaporization" },
        { prompt: "Solid-to-liquid latent heat is called?", answer: "Latent heat of fusion" },
        { prompt: "Does temperature change during melting?", answer: "No", method: "heat goes into breaking bonds, not raising temperature" },
        { prompt: "Heat to vaporize 2 g of water at 100°C (L = 540 cal/g)?", answer: "1080 cal" },
      ],
      pyqExampleId: "751127b8-3dd9-4f0d-b574-57b3ff97eb6f", // 2017 EASY — latent heat of vaporization
      traps: [
        {
          title: "Latent heat is absorbed at CONSTANT temperature",
          body:
            "The defining phrase the NDA hunts for is 'without changing the temperature'. During a phase change the thermometer reading is flat while heat is still flowing — the heat breaks molecular bonds instead of warming the substance.",
        },
      ],
    },

    // Concept 2 — boiling and pressure
    {
      kind: "formula" as const,
      slug: "boiling-point-and-pressure",
      name: "Boiling point depends on pressure",
      intuition:
        "A liquid boils when its vapour pressure climbs up to equal the surrounding (atmospheric) pressure — at that point bubbles of vapour can form throughout the liquid. So if you RAISE the external pressure, the liquid needs a higher temperature to reach that pressure: boiling point goes up (pressure cooker). LOWER the pressure and it boils cooler (high altitude).",
      definition:
        "**Boiling point** is the temperature at which a liquid's **vapour pressure equals the external (atmospheric) pressure** in an open vessel. Consequences:\n" +
        "- **Higher pressure → higher boiling point.** A **pressure cooker** seals in steam, raising the pressure, so water boils above 100°C and food cooks faster.\n" +
        "- **Lower pressure → lower boiling point.** At **high altitude** the air pressure is lower, so water boils below 100°C — cooking takes longer.",
      formula: {
        label: "Boiling condition",
        latex: "P_{\\text{vapour}} = P_{\\text{atmospheric}}",
        symbols: [
          { symbol: "P_{\\text{vapour}}", meaning: "saturated vapour pressure of the liquid" },
          { symbol: "P_{\\text{atmospheric}}", meaning: "external (atmospheric) pressure" },
        ],
      },
      authoredExample: {
        prompt: "Explain why a pressure cooker cooks food faster than an open pan.",
        steps: [
          "A sealed cooker traps steam, so the pressure inside rises above atmospheric.",
          "Boiling needs vapour pressure to reach the (now higher) internal pressure, so water must get HOTTER before it boils — boiling point rises above 100°C.",
          "Food cooks faster because it is now surrounded by water/steam at a higher temperature.",
        ],
        answer: "It raises the internal pressure, which raises the boiling point of water above 100°C.",
      },
      selfCheckExample: {
        prompt: "Why does water boil at a lower temperature at high altitudes?",
        steps: [
          "At altitude the atmospheric pressure is lower than at sea level.",
          "A liquid boils when its vapour pressure equals the external pressure.",
          "With a lower external pressure to match, water reaches that condition at a lower temperature — so it boils below 100°C.",
        ],
        answer: "Because the air pressure is lower, so the boiling point falls.",
      },
      practiceSet: [
        { prompt: "Boiling occurs when vapour pressure equals what?", answer: "Atmospheric (external) pressure" },
        { prompt: "Does a pressure cooker raise or lower the boiling point?", answer: "Raise" },
        { prompt: "Water boils above or below 100°C on a mountain top?", answer: "Below 100°C", method: "lower air pressure" },
        { prompt: "Could 1500°C be the melting point of iron?", answer: "Yes", method: "iron melts near 1538°C" },
      ],
      pyqExampleId: "5d8df60d-1ab6-4df6-89c3-1622f70dee41", // 2025 EASY — boiling point definition
      traps: [
        {
          title: "Boiling is vapour pressure = atmospheric, not 'less than'",
          body:
            "Distractors offer 'vapour pressure becomes less than' or 'greater than' atmospheric. Boiling is the exact EQUALITY: the liquid's vapour pressure rises to meet the external pressure. Pick the 'equal to' option.",
        },
      ],
    },

    // Concept 3 — evaporation vs boiling
    {
      kind: "formula" as const,
      slug: "evaporation-vs-boiling",
      name: "Evaporation versus boiling",
      intuition:
        "Evaporation and boiling both turn liquid into vapour, but they are different. Evaporation is a slow, surface-only process that happens at ALL temperatures; boiling is a rapid, throughout-the-liquid process that happens only at the boiling point. Evaporation speeds up with higher temperature, larger surface area, dry air, and a breeze.",
      definition:
        "**Evaporation** — a surface phenomenon in which fast-moving molecules escape from the liquid surface at **any temperature**. It is faster when:\n" +
        "- the **temperature is higher**,\n" +
        "- the **surface area is larger**,\n" +
        "- the surrounding air is **drier** and **moving** (wind).\n" +
        "**Boiling** — a bulk phenomenon (bubbles form throughout) occurring only **at the boiling point**, where vapour pressure equals atmospheric pressure. Evaporation cools the liquid left behind (it carries away the most energetic molecules).",
      authoredExample: {
        prompt: "Under what conditions does evaporation from a liquid surface happen most rapidly?",
        steps: [
          "Evaporation is escape of energetic molecules from the surface, so more energetic molecules and more surface help.",
          "Higher temperature → more molecules have enough energy to escape.",
          "Larger surface area → more molecules are at the surface able to leave.",
          "Combine: evaporation is fastest when the temperature is high AND the surface area is large (dry, windy air helps too).",
        ],
        answer: "When the temperature is high and the surface area of the liquid is large.",
      },
      selfCheckExample: {
        prompt: "Name two differences between evaporation and boiling.",
        steps: [
          "Location: evaporation occurs only at the surface; boiling occurs throughout the bulk of the liquid.",
          "Temperature: evaporation occurs at all temperatures; boiling occurs only at the boiling point.",
        ],
        answer:
          "Evaporation is surface-only and at any temperature; boiling is throughout the liquid and only at the boiling point.",
      },
      practiceSet: [
        { prompt: "Does evaporation happen only at the boiling point?", answer: "No", method: "it happens at all temperatures" },
        { prompt: "Is evaporation a surface or bulk process?", answer: "Surface process" },
        { prompt: "Does a larger surface area speed up evaporation?", answer: "Yes" },
        { prompt: "Does evaporation cool or warm the remaining liquid?", answer: "Cools it", method: "the most energetic molecules leave" },
      ],
      pyqExampleId: "0a66811e-b316-471e-9676-a280c907c733", // 2022 EASY — evaporation faster when
      traps: [
        {
          title: "Evaporation happens at ALL temperatures; boiling does not",
          body:
            "A common confusion is that a liquid only evaporates when heated. Evaporation occurs at any temperature (wet clothes dry in the shade). Boiling is the one that needs the specific boiling-point temperature.",
        },
      ],
    },

    // Concept 4 — Newton's law of cooling (MODERATE)
    {
      kind: "formula" as const,
      slug: "newtons-law-of-cooling",
      name: "Newton's law of cooling",
      intuition:
        "A hot body cools faster when it is much hotter than its surroundings and slows down as it approaches room temperature — that is why a cup of coffee cools quickly at first, then lingers. Newton's law of cooling captures this: the rate of cooling is proportional to the temperature difference with the surroundings. It applies only to gentle convective cooling over a small temperature difference, not to phase changes or furnace-hot radiation.",
      definition:
        "**Newton's law of cooling:** the rate of loss of heat of a body is proportional to the difference between its temperature and that of its surroundings (for a small temperature difference, by convection):\n" +
        "\\[-\\frac{d\\theta}{dt} \\propto (\\theta - \\theta_0).\\]\n" +
        "It applies to **ordinary convective cooling** — e.g. a hot drink cooling on a table. It does **NOT** apply during a phase change (melting ice, boiling water) or to a body radiating at furnace temperatures (very large temperature difference).",
      formula: {
        label: "Newton's law of cooling",
        latex: "-\\frac{d\\theta}{dt} \\propto (\\theta - \\theta_0)",
        symbols: [
          { symbol: "\\theta", meaning: "temperature of the body" },
          { symbol: "\\theta_0", meaning: "temperature of the surroundings" },
          { symbol: "\\frac{d\\theta}{dt}", meaning: "rate of change of temperature with time" },
        ],
      },
      authoredExample: {
        prompt:
          "Of these four cases, where does Newton's law of cooling apply? (1) ice melting in a glass of water, (2) water boiling in an open container, (3) a metal rod heated in a furnace, (4) a cup of coffee cooling on a table.",
        steps: [
          "Cases 1 and 2 are phase changes at constant temperature — the law does not apply (no proportional cooling).",
          "Case 3 is a body at furnace temperature, a huge temperature difference dominated by radiation — outside the small-difference convective regime.",
          "Case 4 is exactly the situation Newton's law describes: a warm object cooling gently by convection toward room temperature.",
        ],
        answer: "Case 4 only — the cup of coffee cooling on a table.",
      },
      selfCheckExample: {
        prompt: "Why does Newton's law of cooling NOT apply to ice melting in water?",
        steps: [
          "While ice melts, the mixture stays at a constant temperature (0°C) absorbing latent heat.",
          "Newton's law describes the temperature FALLING in proportion to the difference with the surroundings; here the temperature is not changing at all.",
          "So the law simply does not describe a phase change.",
        ],
        answer: "Because a phase change occurs at constant temperature, not a proportional cooling.",
      },
      practiceSet: [
        { prompt: "Rate of cooling is proportional to what?", answer: "Temperature difference with the surroundings" },
        { prompt: "Does Newton's law apply to boiling water?", answer: "No", method: "boiling is a constant-temperature phase change" },
        { prompt: "Does a cooling cup of coffee obey Newton's law of cooling?", answer: "Yes" },
        { prompt: "Newton's law assumes a small or large temperature difference?", answer: "Small" },
      ],
      pyqExampleId: "5a3c2b4d-b382-4d2b-9f7b-93640e4526bb", // 2024 MOD — Newton's law applies to case 4
      traps: [
        {
          title: "Newton's law does NOT apply to phase changes or furnace heat",
          body:
            "The law needs the body's temperature to actually be changing and the temperature difference to be small. Melting ice and boiling water hold a constant temperature; a furnace-hot rod has a huge difference dominated by radiation. Only gentle convective cooling qualifies.",
        },
      ],
    },
  ],
};
