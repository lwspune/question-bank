import type { SubtopicNote } from "@/app/notes/_types";

export const TIDES_MOVEMENTS_NOTE: SubtopicNote = {
  subtopicName: "Tides and Ocean Movements",
  title: "Tides and Ocean Movements",
  oneLineDefinition:
    "Tides are the daily rise and fall of the sea raised by the gravitational pull of the Moon and Sun — large when the three bodies line up (spring), small when the Moon and Sun pull at right angles (neap).",
  whyItMatters:
    "5 PYQs, mostly EASY–MODERATE. The marks come from the mechanism: tides are gravitational; two tides arrive 12 h 26 min apart; SPRING tides happen at new and full Moon (Sun-Earth-Moon in a line) and have the biggest range; NEAP tides happen at the quarter Moons (Sun and Moon at right angles) and have the smallest range. Learn the geometry once and four of the five questions answer themselves.",
  concepts: [
    // 1. what tides are + timing (FOUNDATION, formula)
    {
      kind: "formula" as const,
      slug: "tides-foundation",
      name: "What tides are and why two arrive each day",
      intuition:
        "A tide is the periodic rise and fall of the whole ocean, pulled up by the GRAVITY of the Moon (mainly) and the Sun. As the Earth spins, the bulge of raised water passes a coast roughly twice a day. But the Moon also moves forward in its orbit each day, so the place 'catches up' a little later each time — which is why two successive high tides are about 12 hours 26 minutes apart, not exactly 12 hours.",
      definition:
        "- A **tide** = the periodic rise and fall of ocean water in response to the **gravitational pull** of the Moon and the Sun.\n" +
        "- The Moon's pull dominates (it is far closer than the Sun), raising a bulge of water on the near side (and another on the far side).\n" +
        "- Two successive tides at a place are about **12 hours 26 minutes** apart — half of a 'lunar day' (~24 h 52 min). The extra ~26 minutes is because the Moon has moved ahead in its orbit and the Earth must rotate a little further to face it again.\n" +
        "- Do NOT confuse tides with **currents** (steady horizontal flows), **waves** (wind-driven surface energy), or a **tsunami** (a seismic sea wave).",
      authoredExample: {
        prompt:
          "Why are two successive high tides about 12 h 26 min apart rather than exactly 12 hours?",
        steps: [
          "If the Moon stood still, the Earth's spin would bring a coast back under the tidal bulge every 12 hours.",
          "But the Moon advances along its orbit each day, so the bulge shifts forward too.",
          "The Earth must rotate a little extra to catch up with the Moon, adding about 26 minutes.",
        ],
        answer: "Because the Moon moves ahead in its orbit, so a place takes ~26 minutes longer to return under the tidal bulge.",
      },
      selfCheckExample: {
        prompt: "The periodic rise and fall of ocean water in response to gravitational forces is called what?",
        steps: [
          "Currents are steady horizontal flows; waves are wind-driven; a tsunami is a seismic sea wave.",
          "The gravity-driven periodic rise and fall is the tide.",
        ],
        answer: "Tides.",
      },
      practiceSet: [
        { prompt: "What force raises the tides?", answer: "Gravitational pull of the Moon and the Sun" },
        { prompt: "How far apart are two successive tides at a place?", answer: "About 12 hours 26 minutes" },
        { prompt: "Which body's pull dominates the tides?", answer: "The Moon's (it is closer than the Sun)" },
      ],
      pyqExampleId: "9c6d85a4-704b-4a20-9a52-29d6b221baa9", // tides = periodic rise and fall (gravity)
      traps: [
        {
          title: "12 h 26 min, not 12 h",
          body:
            "The intuitive answer '12 hours' is the trap. The correct gap is **12 hours 26 minutes**, because the Moon advances in its orbit and the Earth must spin a little further to face it again.",
        },
        {
          title: "Tide is not a current or a wave",
          body:
            "A tide is the GRAVITY-driven vertical rise/fall of the sea. A **current** is a steady horizontal flow, a **wave** is wind-driven, and a **tsunami** is a seismic sea wave — different phenomena.",
        },
      ],
    },

    // 2. spring vs neap tides (formula, mechanism + diagram)
    {
      kind: "formula" as const,
      slug: "spring-neap-tides",
      name: "Spring tides and neap tides",
      intuition:
        "How big a tide gets depends on whether the Sun and the Moon pull together or against each other. When the Sun, Earth and Moon line up (new or full Moon — a 'syzygy'), their pulls ADD, stretching the ocean into the biggest tides: SPRING tides. When the Moon is at right angles to the Sun (the quarter Moons — 'quadrature'), the two pulls partly CANCEL, giving the smallest tides: NEAP tides. (Spring here means 'to spring up', nothing to do with the season.)",
      definition:
        "- **Spring tide** — Sun, Earth and Moon in a STRAIGHT LINE (**syzygy**: conjunction = new Moon, OR opposition = full Moon). The solar and lunar pulls add → the GREATEST difference between high and low water (largest tidal range).\n" +
        "- **Neap tide** — Moon at RIGHT ANGLES to the Sun as seen from Earth (**quadrature**, at the first and third quarter Moon). The pulls partly cancel → the SMALLEST tidal range. Neap tides occur every ~14–15 days, coinciding with the quarter Moons.\n" +
        "- So spring tides need syzygy (conjunction OR opposition), NOT quadrature; neap tides need quadrature.",
      visualizationSlug: "ocn-spring-neap-tides",
      authoredExample: {
        prompt:
          "Of these positions of Sun, Earth and Moon, which produce a SPRING tide: (1) syzygy conjunction, (2) syzygy opposition, (3) quadrature?",
        steps: [
          "A spring tide needs the three bodies in a straight line so the pulls add.",
          "Conjunction (new Moon) and opposition (full Moon) are both straight-line, syzygy positions — both give spring tides.",
          "Quadrature is the right-angle position — that gives a NEAP tide, not a spring tide.",
        ],
        answer: "Positions 1 and 2 (both syzygy alignments) produce spring tides.",
      },
      selfCheckExample: {
        prompt:
          "Statements on neap tides: (1) they occur every 14–15 days at the first and third quarter Moon; (2) the range is small because the Moon's and Sun's pulls are in quadrature (at right angles). Which are correct?",
        steps: [
          "Neap tides do coincide with the quarter Moons, every ~14–15 days — (1) correct.",
          "At quadrature the two pulls are perpendicular and partly cancel, so the range is small — (2) correct.",
        ],
        answer: "Both statements are correct.",
      },
      practiceSet: [
        { prompt: "Spring tides give the greatest or smallest tidal range?", answer: "Greatest" },
        { prompt: "At which Moon phases do spring tides occur?", answer: "New Moon and full Moon (syzygy)" },
        { prompt: "Neap tides occur when the Moon and Sun are in what configuration?", answer: "Quadrature (at right angles)" },
        { prompt: "Spring tide requires syzygy or quadrature?", answer: "Syzygy (straight-line)" },
      ],
      pyqExampleId: "be7c2065-832a-4a36-adfd-0e4b47ff4bc1", // spring tide positions: syzygy conjunction + opposition
      traps: [
        {
          title: "'Spring' has nothing to do with the season",
          body:
            "Spring tide means the water 'springs up' — it is the BIGGEST tide and happens twice a month (new + full Moon), in every season. Don't read it as a springtime tide.",
        },
        {
          title: "Spring needs a LINE; neap needs a RIGHT ANGLE",
          body:
            "Spring tide = Sun-Earth-Moon in a straight line (syzygy, pulls ADD). Neap tide = Moon at right angles to the Sun (quadrature, pulls CANCEL). Swapping the two is the classic error.",
        },
      ],
    },
  ],
};
