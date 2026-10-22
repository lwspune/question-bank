import type { SubtopicNote } from "@/app/notes/_types";

export const CDS_GE_SP_GLOBE_NOTE: SubtopicNote = {
  subtopicName: "Latitude, Longitude, Time and Maps",
  title: "Latitude, Longitude, Time and Maps",
  oneLineDefinition:
    "The Earth's shape and spin, what latitude tells you about a place, how to turn a difference in longitude into a difference in time, and the isolines and diagrams of map work.",
  whyItMatters:
    "Nine CDS questions from 2017 to 2025: 1 EASY, 6 MODERATE, 2 HARD. Four came in 2023 alone. Only one is a calculation (the local time at 90° E), but the 4-minutes-a-degree rule behind it also settles the questions on Indian Standard Time.",
  concepts: [
    {
      kind: "reference" as const,
      slug: "cdsgesp-shape-rotation",
      name: "The Earth's shape and rotation",
      intuition:
        "The Earth is almost a ball, a little flattened at the poles and fatter at the equator. It spins once a day from west to east, as one solid body. So every place turns through the same angle in an hour, but a place on the equator has a much bigger circle to go round than a place near a pole, so it moves much faster.",
      definition:
        "The facts to hold:\n" +
        "- Shape: an **oblate spheroid** (also called a **geoid**), flattened at the poles. The equatorial diameter (about 12,756 km) is a little longer than the polar one (about 12,714 km).\n" +
        "- **Eratosthenes** (Greek, about 240 BC) measured the Earth's circumference from the Sun's angle at **Syene** (Aswan) and **Alexandria**. Today's figure is about **40,000 km**.\n" +
        "- **Rotation**: from **west to east**, once in about 24 hours, so the Sun rises in the east.\n" +
        "- **Angular velocity** (degrees turned per hour, 15°) is the **same everywhere**.\n" +
        "- **Linear velocity** (distance travelled per hour) is **greatest at the equator**, about 1,670 km an hour, and **zero at the poles**.\n" +
        "- **Revolution** round the Sun takes about 365¼ days; the axis is tilted 23½° from the upright.",
      table: {
        columns: ["Fact", "Value"],
        rows: [
          { cells: ["Shape", "Oblate spheroid, flattened at the poles"] },
          { cells: ["Circumference at the equator", "About 40,000 km"] },
          {
            cells: ["Eratosthenes' two cities", "Syene (Aswan) and Alexandria"],
            noteAmber: "CDS 2024 (II): Alexandria and Syene, not Troy or Thebes.",
            pyqExampleId: "35eef31a-2b66-427c-8a91-7efa4f0a3c2d",
          },
          { cells: ["Direction of rotation", "West to east"] },
          {
            cells: ["Angular velocity", "15° an hour, the same at every place"],
            noteAmber: "CDS 2024 (I): angular velocity is the same everywhere; linear velocity is greatest at the equator, least at the poles.",
            pyqExampleId: "65d640b3-a5c2-47db-8264-fb722ca4e04d",
          },
          { cells: ["Linear velocity", "About 1,670 km an hour at the equator; zero at the poles"] },
          { cells: ["Tilt of the axis", "23½° from the upright"] },
        ],
      },
      pyqExampleId: "65d640b3-a5c2-47db-8264-fb722ca4e04d",
      selfCheckExample: {
        prompt: "How did Eratosthenes find the size of the Earth using two cities?",
        steps: [
          "At noon on the longest day the Sun was straight overhead at Syene, so a stick there cast no shadow.",
          "At the same time at Alexandria, to the north, the Sun's rays fell at an angle of about 7.2°, one fiftieth of a full circle.",
          "So the distance from Syene to Alexandria was one fiftieth of the Earth's circumference; he multiplied it by 50.",
        ],
        answer: "He used the difference in the Sun's angle at the two cities and the distance between them.",
      },
      practiceSet: [
        { prompt: "In which direction does the Earth rotate?", answer: "From west to east" },
        { prompt: "Is the Earth's diameter longer across the equator or through the poles?", answer: "Across the equator" },
        { prompt: "What is the true shape of the Earth called?", answer: "An oblate spheroid (geoid)" },
        { prompt: "About how long is the Earth's equator?", answer: "About 40,000 km" },
      ],
      traps: [
        {
          title: "Angular speed is the same, linear speed is not",
          body: "Every place turns through **15° an hour**. The **distance** covered in that hour is greatest at the **equator** and falls to **zero at the poles**. A statement that mixes the two up is false.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgesp-latitude",
      name: "Latitude and what it tells you",
      intuition:
        "Latitude says how far north or south of the equator a place is. That one number decides how high the Sun climbs, so it shapes a place's temperature, rainfall and plants, and how long its days are in summer and winter. To find which of two places is nearer the equator, just compare their latitudes.",
      definition:
        "The facts to hold:\n" +
        "- Latitude runs from **0° at the equator** to **90° at each pole**. The Tropic of Cancer is at **23½° N**, the Arctic Circle at **66½° N**.\n" +
        "- Drawn every 1°, there are **89 parallels in each hemisphere**; with the equator that makes **179**. The poles are points, not lines.\n" +
        "- One degree of latitude is about **111 km** on the ground. Because the Earth is flattened at the poles, it grows slightly from about 110.6 km at the equator to about 111.7 km near the poles.\n" +
        "- At the equator day and night are about 12 hours each all year. The gap between the longest and shortest day **grows with latitude**, until at the poles there are six months of day and six of night.\n" +
        "- India: **Indira Point** (Great Nicobar), the southernmost point, is at about **6°45′ N**. The mainland runs from about **8°4′ N to 37°6′ N**, and the **Tropic of Cancer** passes through its middle.",
      table: {
        columns: ["Line or place", "Latitude or fact"],
        rows: [
          { cells: ["Equator", "0°"] },
          {
            cells: ["Indira Point, Great Nicobar", "About 6°45′ N, India's southernmost point"],
            noteAmber: "CDS 2017 (II): all three statements about latitude were true, including Indira Point at about 6°45′ N.",
            pyqExampleId: "61eda1cf-1d29-451b-b80a-3828af022a5f",
          },
          {
            cells: ["Panaji", "About 15½° N"],
            noteAmber: "CDS 2023 (II): Panaji is the closest of these four capitals to the equator.",
            pyqExampleId: "6b046920-7092-4949-b60a-1258659650f9",
          },
          { cells: ["Hyderabad", "About 17½° N"] },
          { cells: ["Mumbai", "About 19° N"] },
          { cells: ["Bhubaneswar", "About 20° N"] },
          { cells: ["Tropic of Cancer", "23½° N"] },
          { cells: ["Arctic Circle", "66½° N"] },
          {
            cells: ["Parallels drawn every 1°", "89 in each hemisphere plus the equator: 179"],
            noteAmber: "CDS 2025 (II): both statements true; 179 parallels, and a degree of latitude changes slightly in length.",
            pyqExampleId: "684ea69b-c854-47f0-b780-6a7850ae726e",
          },
        ],
      },
      pyqExampleId: "61eda1cf-1d29-451b-b80a-3828af022a5f",
      selfCheckExample: {
        prompt: "Parallels are drawn at every degree from the North Pole to the South Pole. Why do we count 179 of them and not 181?",
        steps: [
          "From 1° to 89° there are 89 parallels in the north, and 89 more in the south.",
          "The equator adds one: 89 + 89 + 1 = 179.",
          "At 90° a parallel shrinks to a single point, the pole, so it is not counted as a line.",
        ],
        answer: "179, because the poles at 90° are points, not parallels.",
      },
      practiceSet: [
        { prompt: "At what latitude is the Tropic of Cancer?", answer: "23½° N" },
        { prompt: "About how long on the ground is one degree of latitude?", answer: "About 111 km" },
        { prompt: "Is a degree of latitude slightly longer near the equator or near the poles?", answer: "Near the poles" },
        { prompt: "Which line of latitude passes through the middle of India?", answer: "The Tropic of Cancer" },
      ],
      traps: [
        {
          title: "Closest to the equator means lowest latitude",
          body: "For places north of the equator, the one with the **smallest latitude** is nearest the equator. Compare the numbers; do not judge by how far south a city feels on the map.",
        },
        {
          title: "The poles are not parallels",
          body: "Counting parallels at 1° gives **179**, not 181: the two poles are **points**.",
        },
      ],
    },
    {
      kind: "formula" as const,
      slug: "cdsgesp-local-time",
      name: "Local time and longitude",
      intuition:
        "The Earth turns 360° in 24 hours, which is 15° every hour, or 1° every 4 minutes. The Sun reaches places in the east first, so a place east of another is ahead of it in time, and a place to the west is behind. Every time question is this one rule.",
      definition:
        "The rule and the standard times:\n" +
        "- 360° in 24 hours, so **15° = 1 hour** and **1° = 4 minutes**.\n" +
        "- Time difference = difference in longitude × 4 minutes. **East is ahead, west is behind.**\n" +
        "- If the two places are on opposite sides of Greenwich, **add** their longitudes to get the difference.\n" +
        "- **Indian Standard Time** uses the meridian of **82°30′ E**, which passes near **Mirzapur** (Uttar Pradesh). So IST is **5 hours 30 minutes ahead** of Greenwich Mean Time.\n" +
        "- India keeps **one standard time** for the whole country, the Andaman and Nicobar and Lakshadweep islands included.\n" +
        "- The **International Date Line** runs roughly along 180°. Crossing it eastward (Asia to America) the date goes **back** one day; westward it goes **forward** one day.",
      formula: {
        label: "Time difference from longitude",
        latex: "\\text{Time difference} = (\\text{difference in longitude in degrees}) \\times 4\\ \\text{minutes}",
        symbols: [
          { symbol: "\\(1^\\circ\\)", meaning: "4 minutes of time" },
          { symbol: "\\(15^\\circ\\)", meaning: "1 hour of time" },
        ],
      },
      authoredExample: {
        prompt: "When it is noon at a place on 30° E, what is the local time at a place on 45° W?",
        steps: [
          "The places are on opposite sides of Greenwich, so add the longitudes: \\(30 + 45 = 75^\\circ\\).",
          "Time difference \\(= 75 \\times 4 = 300\\) minutes \\(= 5\\) hours.",
          "45° W lies to the west, so it is 5 hours behind noon.",
        ],
        answer: "7:00 a.m.",
      },
      pyqExampleId: "101afc53-1cf1-4b5d-aaae-a980131c3efb",
      selfCheckExample: {
        prompt: "Indian Standard Time is set by the meridian of 82°30′ E. Show how far ahead of Greenwich Mean Time it is.",
        steps: [
          "82°30′ is 82.5°.",
          "Time difference \\(= 82.5 \\times 4 = 330\\) minutes.",
          "330 minutes is 5 hours 30 minutes, and the meridian is east of Greenwich, so IST is ahead.",
        ],
        answer: "5 hours 30 minutes ahead of GMT.",
      },
      practiceSet: [
        { prompt: "How many minutes of time does one degree of longitude make?", answer: "4 minutes" },
        { prompt: "Two places on the same side of Greenwich are 45° of longitude apart. What is the difference in their local times?", answer: "3 hours", method: "45 × 4 = 180 minutes." },
        { prompt: "Near which town does India's standard meridian pass?", answer: "Mirzapur, Uttar Pradesh" },
        { prompt: "A ship crosses the International Date Line going east, from Asia towards America. Does the date go back or forward one day?", answer: "Back one day" },
      ],
      traps: [
        {
          title: "IST is ahead, not behind",
          body: "India is **east** of Greenwich, so Indian Standard Time is **5 hours 30 minutes ahead** of GMT. A statement saying it is behind is false.",
        },
        {
          title: "Opposite sides of Greenwich: add the longitudes",
          body: "Between 30° E and 45° W the difference is **75°**, not 15°. Subtract only when both places are on the **same** side of Greenwich.",
        },
        {
          title: "One time zone for all of India",
          body: "The Andaman and Nicobar Islands and Lakshadweep keep **Indian Standard Time** like the mainland. India has no second official time zone.",
        },
      ],
    },
    {
      kind: "reference" as const,
      slug: "cdsgesp-isolines",
      name: "Isolines and diagrams",
      intuition:
        "An isoline joins places that share the same value of something, so the name tells you what: iso means equal, and the rest of the word names the thing measured. Diagrams follow a similar logic: pick the one whose shape matches what you want to show.",
      definition:
        "Isolines, by what they join:\n" +
        "- **Isotherm**: temperature. **Isobar**: pressure. **Isohyet**: rainfall.\n" +
        "- **Isohel**: sunshine. **Isonif**: snowfall. **Isoneph**: cloudiness.\n" +
        "- **Isohaline**: salinity. **Isobath**: depth of water. **Isoseismal**: earthquake intensity.\n" +
        "- **Isohypse** (contour): height above sea level.\n" +
        "Diagrams, by what they show:\n" +
        "- **Pie chart**: the parts of one whole. **Bar chart**: compares amounts. **Line graph**: change over time.\n" +
        "- **Scatter graph**: whether **two** sets of data are related.\n" +
        "- **Triangular graph**: **three** parts that add up to 100%, such as sand, silt and clay in a soil.",
      table: {
        columns: ["Line or diagram", "What it shows"],
        rows: [
          { cells: ["Isotherm", "Equal temperature"] },
          { cells: ["Isobar", "Equal pressure"] },
          { cells: ["Isohyet", "Equal rainfall"] },
          { cells: ["Isohel", "Equal sunshine"] },
          { cells: ["Isonif", "Equal snowfall"] },
          { cells: ["Isoneph", "Equal cloudiness"] },
          {
            cells: ["Isohypse (contour)", "Equal height above sea level"],
            noteAmber: "CDS 2023 (II): an isohypse joins equal height, not cloudiness.",
            pyqExampleId: "ad7c585f-8b29-4725-899f-605190261e9a",
          },
          { cells: ["Isobath", "Equal depth of water"] },
          {
            cells: ["Scatter graph", "Whether two sets of data are related"],
            noteAmber: "CDS 2023 (I): population size against number of services needs a scatter graph.",
            pyqExampleId: "866683fc-5dfb-4818-8970-a29a94d936b8",
          },
          { cells: ["Triangular graph", "Three parts adding up to 100%"] },
        ],
      },
      pyqExampleId: "ad7c585f-8b29-4725-899f-605190261e9a",
      selfCheckExample: {
        prompt: "A weather map shows lines labelled 1,000, 1,008 and 1,016 mb. What are these lines, and what do all places on the 1,008 line share?",
        steps: [
          "mb (millibar) is a unit of air pressure.",
          "A line joining places of equal pressure is an isobar.",
        ],
        answer: "Isobars; every place on the 1,008 line has the same air pressure, 1,008 mb.",
      },
      practiceSet: [
        { prompt: "What does an isobath join?", answer: "Places of equal depth of water" },
        { prompt: "What does an isoseismal line join?", answer: "Places of equal earthquake intensity" },
        { prompt: "Which diagram best shows the share of each crop in a state's farmland?", answer: "A pie chart" },
        { prompt: "Which diagram shows three parts that add up to 100%, such as sand, silt and clay?", answer: "A triangular graph" },
      ],
      traps: [
        {
          title: "Isoneph, not isohypse, is cloudiness",
          body: "**Isoneph** joins equal cloudiness. **Isohypse** is another name for a **contour**, joining equal height.",
        },
        {
          title: "Two variables need a scatter graph",
          body: "A pie chart or bar chart shows **one** set of data. To see whether **two** sets rise and fall together, plot them as points on a **scatter graph**.",
        },
      ],
    },
  ],
};
