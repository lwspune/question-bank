import type { SubtopicNote } from "@/app/notes/_types";

export const SSC_SSE_SPACE_NOTE: SubtopicNote = {
  subtopicName: "Space and Science Milestones",
  title: "Space and Science Milestones",
  oneLineDefinition:
    "ISRO and its centres, the full forms and jobs of its rockets and satellite types, and the firsts of its older missions to the Moon and Mars.",
  whyItMatters:
    "8 questions in the bank, all from the 2025 shifts: two full forms (ISRO, PSLV), one centre's job, one satellite match and four mission questions, two of them on Mangalyaan. The options are always sister names (Chandrayaan-1, 2, 3; launch site against design centre), so learn each name with its one job.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "sscssesp-centres",
      name: "ISRO and its centres",
      intuition:
        "ISRO works through centres, each with one job: one designs rockets, one launches them, one builds satellites, one tracks them. A centre question gives the name and asks the job, so learn them as pairs.",
      definition:
        "The facts:\n" +
        "- **ISRO** is the **Indian Space Research Organisation**, set up on **15 August 1969**, headquartered in **Bengaluru**. **Vikram Sarabhai** is called the father of India's space programme.\n" +
        "- India's first rocket went up from **Thumba**, near Thiruvananthapuram, on **21 November 1963**.\n" +
        "- The **Vikram Sarabhai Space Centre (VSSC)**, Thiruvananthapuram, **designs and builds launch vehicles**. It does not launch them.\n" +
        "- Launches happen at the **Satish Dhawan Space Centre (SDSC SHAR)**, **Sriharikota**, Andhra Pradesh.\n" +
        "- Satellites are built at the **U R Rao Satellite Centre (URSC)**, Bengaluru, and controlled from **ISTRAC** (tracking, Bengaluru) and the **Master Control Facility** (Hassan and Bhopal).",
      table: {
        columns: ["Centre", "Job", "Place"],
        rows: [
          { cells: ["ISRO headquarters", "Runs the space programme (set up 1969)", "Bengaluru"] },
          { cells: ["Vikram Sarabhai Space Centre (VSSC)", "Designs and builds launch vehicles", "Thiruvananthapuram"] },
          { cells: ["Satish Dhawan Space Centre (SDSC SHAR)", "Launch site", "Sriharikota, Andhra Pradesh"] },
          { cells: ["U R Rao Satellite Centre (URSC)", "Designs and builds satellites", "Bengaluru"] },
          { cells: ["Space Applications Centre (SAC)", "Builds satellite instruments and their uses", "Ahmedabad"] },
          { cells: ["ISTRAC", "Tracks satellites and missions", "Bengaluru"] },
          { cells: ["Master Control Facility (MCF)", "Controls geostationary satellites", "Hassan and Bhopal"] },
        ],
      },
      pyqExampleId: "f81c355d-c3f6-4d83-8c9b-cf8943955336",
      selfCheckExample: {
        prompt: "From which place does ISRO launch its rockets?",
        steps: ["Rockets are designed at VSSC in Thiruvananthapuram.", "They are launched from the Satish Dhawan Space Centre at Sriharikota."],
        answer: "Sriharikota (Satish Dhawan Space Centre)",
      },
      practiceSet: [
        { prompt: "In which city is ISRO headquartered?", answer: "Bengaluru" },
        { prompt: "In which year was ISRO set up?", answer: "1969" },
        { prompt: "Which ISRO centre in Bengaluru designs and builds satellites?", answer: "The U R Rao Satellite Centre (URSC)" },
        { prompt: "Where did India launch its first rocket in 1963?", answer: "Thumba, near Thiruvananthapuram" },
        { prompt: "In which city is the Space Applications Centre?", answer: "Ahmedabad" },
      ],
      traps: [
        {
          title: "VSSC builds rockets; Sriharikota launches them",
          body: "**VSSC** at Thiruvananthapuram **designs and builds** launch vehicles. The **launch site** is Sriharikota. An option that calls VSSC a launch site is wrong.",
        },
        {
          title: "The S in ISRO is Space",
          body: "ISRO is the Indian **Space** Research Organisation. Options swap in \"Scientific\", \"Satellite\" or \"International\"; none is right.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssesp-rockets",
      name: "Rockets and satellite types",
      intuition:
        "A rocket's name says where it puts satellites: Polar, Geosynchronous, Small. A satellite type says what it does: weather, communication, navigation, remote sensing. Match the job to the type and odd pairs stand out.",
      definition:
        "The facts:\n" +
        "- **PSLV**: **Polar Satellite Launch Vehicle**, ISRO's workhorse; it flew Chandrayaan-1 and the Mars Orbiter Mission.\n" +
        "- **GSLV**: **Geosynchronous Satellite Launch Vehicle**, for heavier satellites going towards geosynchronous orbit.\n" +
        "- **LVM3** (Launch Vehicle Mark 3, once called GSLV Mk III) is ISRO's heaviest rocket; it flew Chandrayaan-2 and Chandrayaan-3.\n" +
        "- **SSLV**: **Small Satellite Launch Vehicle**.\n" +
        "- **SLV-3** (Satellite Launch Vehicle) was India's first launch vehicle; it put **Rohini** in orbit in **1980**.\n" +
        "- **Navigation** satellites (India's **NavIC**) give **position and time**. **Remote sensing** (earth observation) satellites watch the land: maps, crops, land use, **forest fires**.",
      table: {
        columns: ["Name", "What it is", "Used for"],
        rows: [
          { cells: ["PSLV", "Polar Satellite Launch Vehicle", "Satellites in polar and Sun-synchronous orbits"] },
          { cells: ["GSLV", "Geosynchronous Satellite Launch Vehicle", "Heavier satellites towards geosynchronous orbit"] },
          { cells: ["LVM3", "Launch Vehicle Mark 3", "ISRO's heaviest loads"] },
          { cells: ["SSLV", "Small Satellite Launch Vehicle", "Small satellites, quick launches"] },
          { cells: ["Weather satellite", "For example the INSAT-3D series", "Cloud images, cyclone tracking"] },
          { cells: ["Communication satellite", "For example GSAT", "TV broadcast, phone, internet"] },
          { cells: ["Navigation satellite", "NavIC (IRNSS)", "Position and timing"] },
          { cells: ["Remote sensing satellite", "For example Cartosat, Resourcesat", "Maps, land use, crops, forest fires"] },
        ],
      },
      pyqExampleId: "8a48e061-f9f2-4bce-8c8f-f379b43e7cfc",
      selfCheckExample: {
        prompt: "Which kind of satellite would a state use to map its farmland and forests?",
        steps: ["Mapping land is watching the earth's surface from space.", "That is the job of a remote sensing (earth observation) satellite."],
        answer: "A remote sensing satellite",
      },
      practiceSet: [
        { prompt: "What does GSLV stand for?", answer: "Geosynchronous Satellite Launch Vehicle" },
        { prompt: "What does SSLV stand for?", answer: "Small Satellite Launch Vehicle" },
        { prompt: "What is the name of India's own satellite navigation system?", answer: "NavIC" },
        { prompt: "Which type of satellite carries TV broadcasts?", answer: "A communication satellite" },
        { prompt: "Which rocket put Rohini in orbit in 1980?", answer: "SLV-3" },
      ],
      traps: [
        {
          title: "Navigation satellites do not watch the ground",
          body: "A **navigation** satellite only sends **position and time** signals. Watching forests, crops or fires is **remote sensing**.",
        },
        {
          title: "The P in PSLV is Polar",
          body: "PSLV is the **Polar** Satellite Launch Vehicle, not \"Public\", \"Private\" or \"Planetary\".",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "sscssesp-missions",
      name: "ISRO's missions and their firsts",
      intuition:
        "Each mission owns one first. Chandrayaan-1 found water on the Moon; Mangalyaan was the first trip to another planet. Learn the mission with its first and its year, and the sister missions in the options fall away.",
      definition:
        "The facts:\n" +
        "- **Aryabhata** (1975) was India's **first satellite**, launched on a Soviet rocket.\n" +
        "- **Chandrayaan-1** (launched October **2008** on a PSLV) was India's first Moon mission. Its NASA instrument, the **Moon Mineralogy Mapper (M3)**, found **water and hydroxyl** on the lunar surface (announced in 2009). It also carried ISRO's **Terrain Mapping Camera (TMC)**.\n" +
        "- The **Mars Orbiter Mission (Mangalyaan)** was launched on **5 November 2013** on a PSLV and entered Mars orbit on **24 September 2014**: **India's first interplanetary mission**, and the first to reach Mars orbit on a **first attempt**. Its **Mars Colour Camera (MCC)** took the full-disk colour pictures of Mars. Its **LAM** was the **Liquid Apogee Motor**, the engine that braked it into orbit.\n" +
        "- **Chandrayaan-3** soft-landed near the Moon's **south pole** on **23 August 2023**. **Aditya-L1** (2023) is India's first mission to study the **Sun**. **Gaganyaan** is the human spaceflight programme.",
      table: {
        columns: ["Mission", "Launched", "Its first or best-known fact"],
        rows: [
          { cells: ["Aryabhata", "1975", "India's first satellite"] },
          { cells: ["Rohini (on SLV-3)", "1980", "First satellite put in orbit by an Indian rocket"] },
          { cells: ["Chandrayaan-1", "2008", "First Moon mission; found water and hydroxyl on the Moon"] },
          { cells: ["Mars Orbiter Mission (Mangalyaan)", "2013", "First interplanetary mission; Mars on the first attempt"] },
          { cells: ["Chandrayaan-3", "2023", "Soft landing near the lunar south pole"] },
          { cells: ["Aditya-L1", "2023", "First mission to study the Sun, from the L1 point"] },
        ],
      },
      pyqExampleId: "aee84b52-5558-4ab7-8d24-b174811fe3ee",
      selfCheckExample: {
        prompt: "Which instrument on Chandrayaan-1 found water and hydroxyl on the Moon?",
        steps: ["Chandrayaan-1 carried NASA's Moon Mineralogy Mapper.", "Its data showed water and hydroxyl on the lunar surface."],
        answer: "The Moon Mineralogy Mapper (M3)",
      },
      practiceSet: [
        { prompt: "What was India's first satellite?", answer: "Aryabhata (1975)" },
        { prompt: "On which date did the Mars Orbiter Mission enter Mars orbit?", answer: "24 September 2014" },
        { prompt: "Which camera on the Mars Orbiter Mission took colour pictures of the whole planet?", answer: "The Mars Colour Camera (MCC)" },
        { prompt: "Which Indian mission first soft-landed near the Moon's south pole?", answer: "Chandrayaan-3" },
        { prompt: "Which Indian mission studies the Sun from the L1 point?", answer: "Aditya-L1" },
        { prompt: "In which year was Chandrayaan-1 launched?", answer: "2008" },
      ],
      traps: [
        {
          title: "The Moon is not another planet",
          body: "**Chandrayaan-1** went to the **Moon**, so it is not an interplanetary mission. India's first interplanetary mission is **Mangalyaan**, to **Mars**.",
        },
        {
          title: "The water find was the first Chandrayaan",
          body: "**Water and hydroxyl** on the Moon were found by **Chandrayaan-1** (2008), not by the later Chandrayaan-2 or 3.",
        },
        {
          title: "TMC and M3 flew to the Moon, not Mars",
          body: "**TMC** and **M3** were on **Chandrayaan-1**. The Mars Orbiter Mission's camera is the **MCC**, and its **LAM** is an engine, not a camera.",
        },
      ],
    },
  ],
};
