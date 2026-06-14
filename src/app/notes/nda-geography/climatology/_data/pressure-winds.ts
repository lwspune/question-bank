import type { SubtopicNote } from "@/app/notes/_types";

export const PRESSURE_WINDS_NOTE: SubtopicNote = {
  subtopicName: "Atmospheric Pressure and Winds",
  title: "Atmospheric Pressure and Winds",
  oneLineDefinition:
    "Differences in air pressure set air in motion, and the Earth's rotation (the Coriolis force) bends that motion — together they create the planetary wind belts, the geostrophic winds aloft, and the high-pressure anticyclones.",
  whyItMatters:
    "6 PYQs, several of them HARD, and the Coriolis force is the star: where it is strongest (the poles), why it is zero at the equator, and how it balances the pressure-gradient force to give geostrophic winds. Pair that with the pressure-belt picture and the anticyclone definition and you have the subtopic covered.",
  concepts: [
    // 1. pressure belts + planetary winds (FOUNDATION, formula + diagram)
    {
      kind: "formula" as const,
      slug: "pressure-belts-winds",
      name: "Pressure belts and planetary winds",
      intuition:
        "Air pressure on Earth is organised into belts. At the equator the air is heated, rises and leaves a LOW-pressure belt (the doldrums). Near 30 degrees the descending air piles up into a HIGH-pressure belt (the subtropical highs / horse latitudes). Winds blow OUT of the highs toward the lows, and the Coriolis force bends them: trade winds toward the equator, westerlies (the Roaring Forties) toward the poles. Pressure is measured in millibars.",
      definition:
        "The major pressure belts, equator to pole:\n" +
        "- **Equatorial low (doldrums)** — rising hot air, calm and rainy.\n" +
        "- **Subtropical high (~30 deg, horse latitudes)** — descending air, dry, source of trade winds and westerlies.\n" +
        "- **Subpolar low (~60 deg)** and **polar high**.\n" +
        "Planetary winds blow from high to low pressure, deflected by Coriolis:\n" +
        "- **Trade winds** — from subtropical highs toward the equatorial low.\n" +
        "- **Westerlies** — from subtropical highs toward the subpolar lows. The strong Southern-Hemisphere westerlies over open ocean are the **Roaring Forties**.\n" +
        "- Air **pressure in India is measured in millibars** (the usual unit).",
      visualizationSlug: "clim-pressure-belts-winds",
      authoredExample: {
        prompt:
          "Two claims about the Roaring Forties: (1) they are strong WESTERLY winds of the Southern Hemisphere oceans; (2) they are strong EAST-to-WEST currents caused partly by abundant landmasses acting as wind breaks. Which are correct?",
        steps: [
          "The Roaring Forties are indeed strong westerlies over the Southern Ocean — (1) correct.",
          "Westerlies blow WEST-to-EAST, not east-to-west, and the Southern Hemisphere has FEW landmasses there (that is why the winds are unbroken and strong) — (2) wrong on both counts.",
        ],
        answer: "Only statement 1 is correct.",
      },
      selfCheckExample: {
        prompt:
          "What is the usual unit for measuring air pressure in India?",
        steps: [
          "Pressure is not measured in cm, mg or ml.",
          "Meteorologists use the millibar.",
        ],
        answer: "The millibar.",
      },
      practiceSet: [
        { prompt: "What is the low-pressure belt at the equator called?", answer: "The doldrums (equatorial low)" },
        { prompt: "Trade winds blow from which belt to which?", answer: "Subtropical high to the equatorial low" },
        { prompt: "The Roaring Forties are which planetary wind?", answer: "Southern-Hemisphere westerlies" },
        { prompt: "Unit of air pressure in India?", answer: "Millibar" },
      ],
      pyqExampleId: "eb87d605-8d25-43b3-9d16-d1c047e55b36", // Roaring Forties statement 1 only
      traps: [
        {
          title: "Westerlies blow WEST-to-EAST",
          body:
            "A Roaring-Forties trap calls them 'east-to-west currents' and credits 'abundant landmasses as wind breaks'. Both are wrong: westerlies blow **west-to-east**, and the Southern Ocean has FEW landmasses — the scarcity of land is exactly why these winds stay strong and unbroken.",
        },
      ],
    },

    // 2. coriolis force (formula)
    {
      kind: "formula" as const,
      slug: "coriolis-force",
      name: "The Coriolis force",
      intuition:
        "The spinning Earth makes moving air appear to curve — right in the Northern Hemisphere, left in the Southern. This Coriolis force is STRONGEST at the poles and ZERO at the equator (so at the equator wind crosses the isobars straight, without bending). It always acts at right angles to the wind's motion, i.e. perpendicular to the pressure-gradient force.",
      definition:
        "- The **Coriolis force** deflects moving air: to the RIGHT in the Northern Hemisphere, to the LEFT in the Southern.\n" +
        "- It is **largest at the poles** and **zero at the equator** (it varies with the sine of the latitude).\n" +
        "- Because it is zero at the equator, **wind there blows perpendicular to the isobars** (straight across, undeflected) — NOTE the bank treats this 'wind perpendicular to isobars at the equator' as a SUBTLE/incorrect framing in one PYQ; what is unambiguously true is that Coriolis acts **perpendicular to the pressure-gradient force**.\n" +
        "- It arises purely from the **Earth's rotation**.",
      authoredExample: {
        prompt:
          "Where is the Coriolis effect largest: at the equator, the tropics, the North Pole, or 45 degrees latitude?",
        steps: [
          "Coriolis grows with latitude (it scales as sine of latitude).",
          "It is zero at the equator and maximum at the poles.",
        ],
        answer: "At the North Pole (the poles).",
      },
      selfCheckExample: {
        prompt:
          "Statement: 'The Coriolis force acts perpendicular to the pressure-gradient force.' Correct?",
        steps: [
          "Coriolis always acts at right angles to the direction of motion.",
          "The pressure-gradient force drives the wind, and Coriolis deflects it sideways — perpendicular to that drive.",
        ],
        answer: "Correct.",
      },
      practiceSet: [
        { prompt: "Where is the Coriolis force largest?", answer: "At the poles" },
        { prompt: "What is the Coriolis force at the equator?", answer: "Zero" },
        { prompt: "Coriolis deflects winds to which side in the Northern Hemisphere?", answer: "To the right" },
      ],
      pyqExampleId: "a010f4c5-cb64-440b-9d73-b5ce1f4f4291", // Coriolis largest at the pole
      traps: [
        {
          title: "Largest at the poles, zero at the equator",
          body:
            "Distractors offer 'the equator' or '45 degrees' for where Coriolis is strongest. It scales with the **sine of latitude**: zero at the equator, **maximum at the poles**.",
        },
      ],
    },

    // 3. geostrophic wind (formula) — set member S10
    {
      kind: "formula" as const,
      slug: "geostrophic-wind",
      name: "The geostrophic wind",
      intuition:
        "High above the ground (above ~600 m), friction with the surface disappears. There the pressure-gradient force (pushing air from high to low pressure) is exactly balanced by the Coriolis force, and the wind ends up blowing PARALLEL to the isobars rather than across them. That balanced upper wind is the geostrophic wind.",
      definition:
        "- The **geostrophic wind** is the horizontal wind that results when the **Coriolis force exactly balances the horizontal pressure-gradient force**.\n" +
        "- It blows **parallel to the isobars**, above a height of about **600 m** (above the friction layer).\n" +
        "- Statement II ('Coriolis balances the pressure force') is the correct EXPLANATION of statement I ('it blows parallel to the isobars above 600 m').",
      authoredExample: {
        prompt:
          "Why does the geostrophic wind blow parallel to the isobars rather than straight from high to low pressure?",
        steps: [
          "The pressure-gradient force pushes air from high toward low pressure.",
          "The Coriolis force deflects that moving air sideways.",
          "When the two forces balance exactly, the wind settles into a path along the isobars.",
        ],
        answer: "Because the Coriolis force balances the pressure-gradient force, the net flow runs parallel to the isobars.",
      },
      practiceSet: [
        { prompt: "Geostrophic wind blows parallel to what?", answer: "The isobars" },
        { prompt: "Which two forces balance to give a geostrophic wind?", answer: "Pressure-gradient force and Coriolis force" },
        { prompt: "Above roughly what height does it occur?", answer: "About 600 m (above the friction layer)" },
      ],
      pyqExampleId: "a1df50b6-dcbe-4bfb-88cb-6ed114d8c452", // geostrophic wind, both true, II explains I
    },

    // 4. anticyclones (formula)
    {
      kind: "formula" as const,
      slug: "anticyclones",
      name: "Anticyclones",
      intuition:
        "An anticyclone is the opposite of a cyclone: a HIGH-pressure system. Air sinks (subsides) at its centre and then spreads outward, so the winds DIVERGE (flow away), not converge. Sinking air warms and dries, which is why anticyclones bring calm, clear, fair weather.",
      definition:
        "- An **anticyclone is a HIGH-pressure system** — correct.\n" +
        "- Air in its centre **subsides (sinks)** — correct.\n" +
        "- Its surface winds **DIVERGE outward**, NOT converge — so the claim 'characterised by converging winds' is FALSE (only cyclones have converging winds).\n" +
        "- Subsiding, warming air gives anticyclones their **fair, settled weather**.",
      authoredExample: {
        prompt:
          "Three claims: (1) anticyclones are high-pressure systems; (2) air at the centre subsides; (3) anticyclones have converging winds. How many are correct?",
        steps: [
          "High pressure — correct.",
          "Centre air subsides — correct.",
          "Anticyclone winds DIVERGE outward, they do not converge — wrong.",
        ],
        answer: "Two statements are correct.",
      },
      practiceSet: [
        { prompt: "Is an anticyclone a high- or low-pressure system?", answer: "High pressure" },
        { prompt: "Do anticyclone winds converge or diverge?", answer: "Diverge (outward)" },
        { prompt: "What weather do anticyclones bring?", answer: "Fair, calm, clear weather" },
      ],
      pyqExampleId: "88cc031a-8411-49e1-9a61-162d8ff07e0a", // 2 statements correct
      traps: [
        {
          title: "Anticyclone winds DIVERGE",
          body:
            "The trap statement gives anticyclones 'converging winds'. Converging winds belong to **cyclones**. Anticyclones have **sinking, diverging** air — the source of their fair weather.",
        },
      ],
    },
  ],
};
