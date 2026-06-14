import type { SubtopicNote } from "@/app/notes/_types";

export const PLANETS_SOLAR_SYSTEM_NOTE: SubtopicNote = {
  subtopicName: "Planets and Solar System",
  title: "Planets and the Solar System",
  oneLineDefinition:
    "Eight planets orbit the Sun — the four small rocky terrestrial planets inside the asteroid belt and the four giant planets outside it — and the universe itself is explained by the Big Bang theory.",
  whyItMatters:
    "4 PYQs, mixing one EASY recall (origin of the universe) with HARD density-ranking. Two anchors carry most marks: the origin theories (Big Bang for the universe; Nebular for the Solar System) and the density facts — EARTH is the densest planet, Jupiter the largest, Saturn the least dense. The terrestrial-planet statements (low density vs the giants, lying inside the asteroid belt, gravity holding gases) are a recurring statement-trap.",
  concepts: [
    // 1. Origin theories (reference)
    {
      kind: "reference" as const,
      slug: "origin-theories",
      name: "Theories of the origin of the universe and Solar System",
      intuition:
        "Two different questions, two different answers. The **universe** as a whole is explained by the **Big Bang theory** — everything expanding from a single hot, dense point. The **Solar System** (the Sun and its planets) is explained by the **Nebular hypothesis** and its relatives. Don't mix the two: Big Bang = universe; Nebular/Planetesimal/Binary = Solar System.",
      definition:
        "Match the theory to what it explains:",
      table: {
        columns: ["Theory / hypothesis", "Explains", "Idea"],
        rows: [
          {
            cells: ["**Big Bang theory**", "Origin of the **universe**", "Universe expanded from a hot, dense single point"],
            noteAmber: "NDA 2019 — the universe's origin is the Big Bang.",
          },
          { cells: ["Nebular hypothesis", "Origin of the **Solar System**", "Sun and planets formed from a spinning gas-dust cloud (nebula)"] },
          { cells: ["Planetesimal hypothesis", "Origin of the Solar System", "Planets built up from small bodies (planetesimals)"] },
          { cells: ["Binary / tidal theory", "Origin of the Solar System", "A passing star pulled matter off the Sun"] },
        ],
      },
      selfCheckExample: {
        prompt:
          "Which theory explains the origin of the UNIVERSE: Nebular hypothesis, Binary theory, Big Bang theory, or Planetesimal hypothesis?",
        steps: [
          "Nebular, Binary and Planetesimal are all about the Solar System.",
          "The universe as a whole is explained by the Big Bang theory.",
        ],
        answer: "The Big Bang theory.",
      },
      practiceSet: [
        { prompt: "Which theory explains the origin of the universe?", answer: "Big Bang theory" },
        { prompt: "Which hypothesis explains the origin of the Solar System from a gas-dust cloud?", answer: "Nebular hypothesis" },
        { prompt: "Is the Big Bang about the universe or just the Solar System?", answer: "The universe as a whole" },
      ],
      pyqExampleId: "607e3f17-e057-4825-ae2f-a70320d784e9", // origin of universe = Big Bang
      traps: [
        {
          title: "Big Bang = universe, Nebular = Solar System",
          body:
            "The trap puts the **Nebular** and **Planetesimal** hypotheses next to the Big Bang and asks about the **universe**. Those two explain the **Solar System**; only the **Big Bang** explains the universe.",
        },
      ],
    },

    // 2. Planet order + terrestrial vs giant (formula + diagram)
    {
      kind: "formula" as const,
      slug: "planet-order-terrestrial-giant",
      name: "Planet order: terrestrial vs giant planets",
      intuition:
        "Outward from the Sun the order is Mercury, Venus, Earth, Mars, then the **asteroid belt**, then Jupiter, Saturn, Uranus, Neptune. The first four are the small, rocky, dense **terrestrial (inner) planets**; the last four are the big, low-density **giant (outer) planets**. The terrestrial planets lie **between the Sun and the asteroid belt** — a fact the NDA tests directly.",
      definition:
        "- Order outward from the Sun: **Mercury, Venus, Earth, Mars | (asteroid belt) | Jupiter, Saturn, Uranus, Neptune**.\n" +
        "- **Terrestrial (inner) planets** — Mercury, Venus, Earth, Mars: small, rocky, **HIGH density**, and they lie **between the Sun and the asteroid belt**.\n" +
        "- **Giant (outer) planets** — Jupiter, Saturn, Uranus, Neptune: large, gas/ice, **LOW density**.\n" +
        "- **Statement-trap fact:** terrestrial planets have HIGHER density than the giants (not lower), and their **stronger** surface gravity (relative to their small mass, helped by being cooler/inner) is part of why they retain or lose certain gases — be careful with the exact wording offered.",
      visualizationSlug: "eis-solar-system-order",
      authoredExample: {
        prompt:
          "Two statements: (I) The terrestrial planets lie between the Sun and the asteroid belt. (II) The terrestrial planets have higher density than the giant planets. Are both correct?",
        steps: [
          "Mercury, Venus, Earth and Mars sit inside the asteroid belt — statement I is correct.",
          "Rocky terrestrial planets are denser than the gas/ice giants — statement II is correct.",
        ],
        answer: "Yes — both statements are correct.",
      },
      selfCheckExample: {
        prompt: "Name the four terrestrial planets in order from the Sun.",
        steps: [
          "Start nearest the Sun and move out, stopping at the asteroid belt.",
          "Mercury, then Venus, then Earth, then Mars.",
        ],
        answer: "Mercury, Venus, Earth, Mars.",
      },
      practiceSet: [
        { prompt: "Name the four terrestrial planets.", answer: "Mercury, Venus, Earth, Mars" },
        { prompt: "What lies between the terrestrial and giant planets?", answer: "The asteroid belt" },
        { prompt: "Do terrestrial planets have higher or lower density than the giants?", answer: "Higher" },
        { prompt: "Which planet comes right after Mars going outward?", answer: "Jupiter" },
      ],
      pyqExampleId: "5af85b80-4784-4c89-8024-b410ef61928e", // terrestrial planets statements (lie inside asteroid belt)
      traps: [
        {
          title: "Terrestrial planets have HIGHER density, not lower",
          body:
            "A statement claims terrestrial planets have 'low densities as compared to other planets'. The opposite is true — the rocky terrestrials are the **densest** planets; the gas giants are low-density. So that statement is treated as incorrect.",
        },
        {
          title: "Terrestrial planets lie INSIDE the asteroid belt",
          body:
            "The reliable true statement is that the terrestrial planets lie **between the Sun and the belt of asteroids**. Anchor on that one when a multi-statement question mixes it with density errors.",
        },
      ],
    },

    // 3. Density: Earth is densest (formula + diagram via ref above; use formula here)
    {
      kind: "formula" as const,
      slug: "planet-density-ranking",
      name: "Density ranking — Earth is the densest planet",
      intuition:
        "Of all eight planets, **Earth has the highest density** (about 5.5 g/cm3), just ahead of Mercury and Venus. The giants are far lighter for their size — **Saturn is the LEAST dense** (it would float on water). So in 'highest density' or 'arrange by density' questions, Earth sits at the top and the gas giants at the bottom.",
      definition:
        "- **Earth is the densest planet** (~5.51 g/cm3). Mercury and Venus are close behind; Mars is a bit lower.\n" +
        "- The **giant planets are low density**: Jupiter ~1.33, Saturn ~0.69 g/cm3. **Saturn is the least dense planet** (less dense than water).\n" +
        "- A typical descending-density order among Earth, Venus, Saturn, Jupiter is **Earth > Venus > Jupiter > Saturn** (Jupiter, though low-density, is slightly denser than Saturn).\n" +
        "- Don't confuse **density** (mass per volume) with **size**: Jupiter is the **largest** planet but Earth is the **densest**.",
      authoredExample: {
        prompt:
          "Arrange in descending order of density: Earth, Saturn, Venus, Jupiter.",
        steps: [
          "Earth is the densest planet — first.",
          "Venus, a rocky terrestrial, is next.",
          "Among the two giants, Jupiter (~1.33) is denser than Saturn (~0.69).",
          "So Saturn, the least dense, is last.",
        ],
        answer: "Earth > Venus > Jupiter > Saturn.",
      },
      selfCheckExample: {
        prompt: "Which planet has the highest density: Mercury, Venus, Jupiter or Earth?",
        steps: [
          "The giants (like Jupiter) are low-density, so rule out Jupiter.",
          "Among the rocky planets, Earth has the highest density of all.",
        ],
        answer: "Earth.",
      },
      practiceSet: [
        { prompt: "Which planet has the highest density?", answer: "Earth" },
        { prompt: "Which planet is the least dense?", answer: "Saturn (it would float on water)" },
        { prompt: "Largest planet vs densest planet?", answer: "Jupiter is largest; Earth is densest" },
        { prompt: "Order by density: Earth, Venus, Jupiter, Saturn.", answer: "Earth > Venus > Jupiter > Saturn" },
      ],
      pyqExampleId: "41228665-d507-4d24-8f79-3e4ee97c0d45", // descending density: Earth > Venus > Jupiter > Saturn
      traps: [
        {
          title: "Densest is EARTH, not Jupiter",
          body:
            "Jupiter is the **largest** planet, which tempts students into picking it for 'highest density'. But density is mass per volume — **Earth** is the densest. Size and density are different questions.",
        },
      ],
    },
  ],
};
