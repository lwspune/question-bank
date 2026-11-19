import type { SubtopicNote } from "@/app/notes/_types";

export const HB9_SA_SATELLITES_NOTE: SubtopicNote = {
  subtopicName: "Artificial Satellites",
  title: "Artificial Satellites",
  oneLineDefinition:
    "An artificial satellite is put in orbit by a launch vehicle and runs on a communication system, a power system of solar panels and batteries, and thrusters that keep it in place until their fuel runs out.",
  whyItMatters:
    "Seven questions in the bank, three EASY and four MODERATE. Five come from one 2018 passage on how a satellite works (its communication and power systems, what recharges its batteries, why a geostationary satellite drifts, what limits its life), and two are about India in space: its first home-made launch vehicle, and which Indian satellite does which job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "hb9sasa-parts",
      name: "How a satellite works",
      intuition:
        "A satellite is a small factory in the sky that must run for years with no one to repair it. It talks to the ground with antennas, makes its own electricity from sunlight, stores some in batteries for the times the Earth hides the Sun, and fires tiny rockets now and then to stay in its place. When the fuel for those rockets runs out, its working life is over.",
      definition:
        "- An **artificial satellite** is a man-made object placed in orbit by a rocket (a **launch vehicle**).\n" +
        "- **Communication system**: **antennas** and **transponders** receive signals from the Earth and send them back.\n" +
        "- **Power system**: **solar panels** turn sunlight into electricity; **batteries** (such as nickel-cadmium cells) run the satellite when the Earth blocks the Sun, and are **recharged by the extra current from the solar panels** in sunlight.\n" +
        "- **Propulsion**: **thrusters** are fired from time to time to correct the satellite's position.\n" +
        "- A **geostationary** satellite circles about 36 000 km above the equator once every **24 hours**, turning with the Earth, so it seems to stay over one place. It is used for communication, TV and weather.\n" +
        "- The **gravitational pull of the Moon and the Sun** makes a geostationary satellite drift slowly; the thrusters bring it back.\n" +
        "- The **life span** is set mainly by the **fuel** for the thrusters. Wear of the power system and damage from radiation in space also shorten it. A dead satellite becomes **space debris**.\n" +
        "- **Liquid oxygen** is used in rocket fuel, not as a power source for the satellite. **SONAR** uses sound, which cannot travel in space.",
      table: {
        columns: ["System", "Main parts", "Job"],
        rows: [
          { cells: ["Communication", "Antennas, transponders", "Receive signals from the Earth and send them back"] },
          { cells: ["Power", "Solar panels, rechargeable batteries", "Make electricity from sunlight and store it for when the Earth hides the Sun"] },
          { cells: ["Propulsion", "Thrusters and their fuel", "Correct the satellite's position from time to time"] },
        ],
        caption: "When the thruster fuel runs out, the satellite drifts out of use.",
      },
      selfCheckExample: {
        prompt: "Why does a satellite carry batteries when it already has solar panels?",
        steps: ["For part of each orbit the Earth comes between the satellite and the Sun.", "The solar panels then give no electricity."],
        answer: "The batteries run the satellite while the Earth blocks the Sun, and the panels recharge them in sunlight",
      },
      practiceSet: [
        { prompt: "About how high above the equator does a geostationary satellite orbit?", answer: "About 36 000 km" },
        { prompt: "How long does a geostationary satellite take to go once round the Earth?", answer: "24 hours, the same time as the Earth takes to spin once" },
        { prompt: "What are the thrusters of a satellite used for?", answer: "They are fired now and then to correct the satellite's position" },
        { prompt: "Why can a SONAR system not work on a satellite in space?", answer: "SONAR uses sound, and sound cannot travel through the vacuum of space" },
      ],
      pyqExampleId: "400f92ce-b8fa-4477-9544-8fe5b4c80b24",
      traps: [
        {
          title: "Thinking a satellite burns fuel for its electricity",
          body: "Its electricity comes from solar panels and batteries. Fuel is used only by the thrusters that correct its position.",
        },
        {
          title: "Thinking a geostationary satellite stands still",
          body: "It moves fast round the Earth, but it turns at the same rate as the Earth spins, so it seems to stay over one place.",
        },
        {
          title: "Thinking a satellite works for ever",
          body: "Once the thruster fuel runs out it cannot hold its position, drifts out of use and becomes space debris.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "hb9sasa-india",
      name: "India's satellites and launch vehicles",
      intuition:
        "India's space story runs from a satellite launched on a borrowed rocket in 1975 to home-made rockets that have sent missions to the Moon and Mars. Questions ask two things: which rocket came first, and which satellite series does which job. Learn the table and match the name to the job.",
      definition:
        "- **ISRO** (Indian Space Research Organisation) was set up in **1969**; its rockets are launched from **Sriharikota**.\n" +
        "- India's first satellite, **Aryabhata**, was launched in **1975** on a Soviet rocket.\n" +
        "- **SLV-3** was India's **first indigenous launch vehicle**: it put the **Rohini** satellite in orbit in **1980**. Dr A. P. J. Abdul Kalam led the project.\n" +
        "- Later launch vehicles: **ASLV**, **PSLV** (which launched Chandrayaan-1 in 2008 and the Mars Orbiter Mission in 2013) and **GSLV** (for heavy satellites in high orbits).",
      table: {
        columns: ["Satellite or series", "Job"],
        rows: [
          { cells: ["INSAT, GSAT", "Communication and TV; INSAT also gives weather pictures"] },
          { cells: ["IRS, CARTOSAT", "Earth observation; CARTOSAT takes detailed pictures for making maps"] },
          { cells: ["IRNSS (NavIC)", "Navigation"] },
          { cells: ["Chandrayaan, Mangalyaan", "Planetary science: the Moon and Mars"] },
          { cells: ["AstroSat", "Space astronomy"] },
        ],
        caption: "CARTOSAT is named after cartography, the making of maps; NavIC after navigation.",
      },
      selfCheckExample: {
        prompt: "Which series of Indian satellites is used for navigation?",
        steps: ["INSAT and GSAT are for communication; CARTOSAT is for maps."],
        answer: "IRNSS, also called NavIC",
      },
      practiceSet: [
        { prompt: "What was the name of India's first satellite, and in which year was it launched?", answer: "Aryabhata, in 1975" },
        { prompt: "What is the main job of the INSAT and GSAT satellites?", answer: "Communication and TV broadcasting" },
        { prompt: "From which place does ISRO launch its rockets?", answer: "Sriharikota" },
        { prompt: "What is the name of India's mission that went into orbit round Mars?", answer: "Mangalyaan (the Mars Orbiter Mission)" },
      ],
      pyqExampleId: "df1381bb-808a-49f1-a772-eebe0c999a5b",
      traps: [
        {
          title: "Calling PSLV or GSLV India's first launch vehicle",
          body: "SLV-3 came first, in 1980. ASLV, PSLV and GSLV were built after it.",
        },
        {
          title: "Calling INSAT a navigation satellite",
          body: "INSAT and GSAT are communication satellites. India's navigation satellites are the IRNSS (NavIC) series.",
        },
        {
          title: "Thinking Aryabhata went up on an Indian rocket",
          body: "Aryabhata, India's first satellite, was launched in 1975 on a Soviet rocket. India's own rocket first reached orbit with SLV-3 in 1980.",
        },
      ],
    },
  ],
};
