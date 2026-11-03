import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_FAS_SPACE_NOTE: SubtopicNote = {
  subtopicName: "The Universe and Satellites",
  title: "The Universe and Satellites",
  oneLineDefinition:
    "The steady state theory, pulsars and black holes, the James Webb Space Telescope, light pollution, what keeps a satellite in orbit, sun-synchronous orbits and space weather.",
  whyItMatters:
    "Seven questions in the bank: one from the 2023 shifts and six from the 2025 shifts. The 2025 ones are statement questions, so each fact here comes with the false version SSC set beside it.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscfassp-universe",
      name: "Stars, telescopes and theories",
      intuition:
        "A few objects and theories come up, each with one fact that decides the question.",
      definition:
        "The facts:\n" +
        "- **Pulsars** are rapidly rotating **neutron stars**.\n" +
        "- Nothing escapes a **black hole's event horizon**; its X-rays come from hot gas **outside** it.\n" +
        "- The **steady state** theory (1948): **Fred Hoyle**, with Bondi and Gold. Hubble observed the universe expanding.\n" +
        "- The **James Webb Space Telescope** sees in **near- and mid-infrared**, sits at the Sun-Earth **L2** point and carries **coronagraphs** for exoplanets.\n" +
        "- **Light pollution** hides faint **deep-sky objects** (galaxies, nebulae) most.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Steady state theory", "Fred Hoyle"], pyqExampleId: "3d2ea865-0c5b-45c4-8064-067f621099af" },
          { cells: ["James Webb telescope", "Infrared, at L2"], pyqExampleId: "824c4bd9-31c7-4793-b823-3c91d83dacc3" },
          { cells: ["Hurt most by light pollution", "Deep-sky objects"], pyqExampleId: "9e167fe9-33f6-4efa-9676-3dec31ee995e" },
        ],
      },
      pyqExampleId: "e4be428e-969d-442b-a6c3-07e697b62c11",
      selfCheckExample: {
        prompt: "Which theory says the universe has always looked the same, and who proposed it?",
        steps: ["The theory of an unchanging universe is the steady state theory.", "Fred Hoyle proposed it in 1948, with Bondi and Gold."],
        answer: "The steady state theory; Fred Hoyle.",
      },
      practiceSet: [
        { prompt: "What is a pulsar?", answer: "A rapidly rotating neutron star" },
        { prompt: "At which Lagrange point does the Webb telescope sit?", answer: "Sun-Earth L2" },
        { prompt: "Who observed the expansion of the universe?", answer: "Edwin Hubble" },
      ],
      traps: [
        {
          title: "No X-rays from inside the horizon",
          body: "A statement that black holes emit X-rays **from their event horizon** is false. The X-rays come from gas **outside** it.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscfassp-satellites",
      name: "Satellites and space weather",
      intuition:
        "A satellite stays up because it moves sideways fast enough that it keeps falling round the Earth. Different orbits suit different jobs.",
      definition:
        "Orbits:\n" +
        "- **Orbital velocity** keeps a satellite in orbit without engines; gravity supplies the centripetal force. The satellite's mass does not matter.\n" +
        "- A **sun-synchronous** orbit is near-polar and low; the satellite passes each place at the same local solar time.\n" +
        "- A **geostationary** orbit is a different one: over the equator, about 36,000 km up, one day per orbit.\n\n" +
        "Space weather: **solar flares** and **coronal mass ejections** disrupt satellites and radio and damage power grids. They do **not** change ocean currents.",
      table: {
        columns: ["Item", "Fact"],
        rows: [
          { cells: ["Sun-synchronous orbit", "Same local solar time"], pyqExampleId: "b79a61fb-015e-43d1-ba3e-48dd0f925f2d" },
          { cells: ["Geostationary orbit", "Equatorial, 36,000 km"] },
          { cells: ["Not caused by solar storms", "Changes in ocean currents"], pyqExampleId: "9c62ef43-34d5-44a5-84f8-cd861f847c81" },
        ],
      },
      pyqExampleId: "c35b15e8-0a44-4428-b6c0-caa67275b4e8",
      selfCheckExample: {
        prompt: "A statement says sun-synchronous orbits suit geostationary communication satellites. Is it right?",
        steps: ["A sun-synchronous orbit is near-polar and low.", "A geostationary orbit is equatorial and high; they are different orbits."],
        answer: "No: they are different orbits.",
      },
      practiceSet: [
        { prompt: "Does a satellite's mass affect its orbital velocity?", answer: "No" },
        { prompt: "About how high is a geostationary orbit?", answer: "About 36,000 km" },
        { prompt: "Name one effect of a solar flare on Earth.", answer: "Radio blackouts (or satellite disruption, or grid damage)" },
      ],
      traps: [
        {
          title: "Ocean currents are not space weather",
          body: "Solar storms disturb radio, satellites and power grids. **Ocean currents** are driven by wind, rotation, temperature and salt.",
        },
      ],
    },
  ],
};
