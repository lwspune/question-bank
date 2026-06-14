import type { SubtopicNote } from "@/app/notes/_types";

export const COORDINATES_TIME_NOTE: SubtopicNote = {
  subtopicName: "World — Coordinates, Time and Place",
  title: "World Coordinates, Time and Place",
  oneLineDefinition:
    "How latitude and longitude fix a place on the globe, how longitude controls local time (GMT offsets, the Prime Meridian) and what happens when you cross the International Date Line.",
  whyItMatters:
    "4 PYQs, all MODERATE. Two are pure recall (which capital is northernmost, which African country the Prime Meridian misses), but two test a RULE: time changes with longitude (1 hour per 15°), so the country farthest east of Greenwich has the biggest time difference, and crossing the International Date Line east means you set the clock back a day. Learn the rule and you don't have to memorise every case.",
  concepts: [
    // 1. latitude/longitude foundation (formula, no box) — northernmost question
    {
      kind: "formula" as const,
      slug: "latitude-longitude-place",
      name: "Latitude, longitude and locating a place",
      intuition:
        "Every place on Earth is fixed by two numbers. LATITUDE measures how far north or south of the Equator you are (0° at the Equator, 90° at the poles) — bigger latitude means closer to a pole. LONGITUDE measures how far east or west of the Prime Meridian (0°) you are. So to ask 'which place is northernmost', you simply compare latitudes: the one nearest the North Pole wins.",
      definition:
        "- **Latitude** — angular distance north or south of the **Equator** (0° to 90°). Higher north latitude = farther north.\n" +
        "- **Longitude** — angular distance east or west of the **Prime Meridian** (0° to 180°).\n" +
        "- 'Northernmost' = the location with the **highest northern latitude**. Among South-Asian capitals, **New Delhi (~28.6° N)** lies north of Kathmandu, Thimphu and Dhaka.",
      authoredExample: {
        prompt:
          "Of four South-Asian capitals — New Delhi, Kathmandu, Thimphu, Dhaka — which is the northernmost?",
        steps: [
          "'Northernmost' means the highest northern latitude.",
          "Kathmandu, Thimphu and Dhaka all sit in the Himalayan/Gangetic belt around 27°–28° N.",
          "New Delhi lies at about 28.6° N, just north of the others.",
        ],
        answer: "New Delhi.",
      },
      selfCheckExample: {
        prompt: "A place at 0° latitude lies on which line?",
        steps: [
          "Latitude 0° is the reference circle midway between the poles.",
          "That circle is the Equator.",
        ],
        answer: "The Equator.",
      },
      practiceSet: [
        { prompt: "Latitude is measured north/south of which line?", answer: "The Equator" },
        { prompt: "Longitude is measured east/west of which line?", answer: "The Prime Meridian (0°)" },
        { prompt: "'Northernmost' means the highest what?", answer: "Northern latitude" },
      ],
      pyqExampleId: "5c6783ed-d6d6-4951-96be-f89cd58efda7", // northernmost = New Delhi
    },

    // 2. longitude and local time (formula, no box) — max time diff from GMT
    {
      kind: "formula" as const,
      slug: "longitude-and-time",
      name: "Longitude, GMT offsets and the Prime Meridian",
      intuition:
        "The Earth turns 360° in 24 hours, so it sweeps 15° of longitude every hour — that is why local time changes as you move east or west. Greenwich (0° longitude) sets Greenwich Mean Time; a place to the east is AHEAD of GMT, a place to the west is BEHIND. So among a group of countries, the one whose standard meridian is farthest EAST of Greenwich has the largest positive time difference from GMT. The Prime Meridian itself (0°) is a geography fact: it runs through a fixed string of countries, so a question can ask which listed country it does NOT cross.",
      definition:
        "- The Earth rotates **15° of longitude per hour** (360° in 24 hours), so **1° ≈ 4 minutes** of time.\n" +
        "- Places **east** of Greenwich are **ahead** of GMT; places **west** are **behind**.\n" +
        "- Among India, Nepal, Sri Lanka and Bhutan, **Bhutan** lies farthest east, so it has the **maximum time difference from GMT**.\n" +
        "- The **Prime Meridian (0°)** crosses several African countries — including **Algeria, Mali and Ghana** — but **NOT Morocco**.",
      authoredExample: {
        prompt:
          "Of India, Nepal, Sri Lanka and Bhutan, which has the maximum time difference from GMT?",
        steps: [
          "Time difference from GMT grows the farther east a country's standard meridian lies.",
          "Of the four, Bhutan is the easternmost.",
          "So Bhutan is the most hours ahead of GMT.",
        ],
        answer: "Bhutan.",
      },
      selfCheckExample: {
        prompt: "If you move 30° of longitude east, by how much does local time change?",
        steps: [
          "Each 15° of longitude equals 1 hour.",
          "30° ÷ 15° = 2 hours, and moving east means going ahead.",
        ],
        answer: "2 hours ahead.",
      },
      practiceSet: [
        { prompt: "How many degrees of longitude does the Earth turn per hour?", answer: "15°" },
        { prompt: "Is a place east of Greenwich ahead of or behind GMT?", answer: "Ahead" },
        { prompt: "Which of Morocco, Algeria, Mali, Ghana does the Prime Meridian NOT cross?", answer: "Morocco" },
      ],
      pyqExampleId: "e048bfa6-16f6-4174-94d5-c88d2b14939e", // max time diff from GMT = Bhutan
      traps: [
        {
          title: "East = ahead, but the DATE line is the opposite",
          body:
            "Moving east of Greenwich puts you AHEAD in time — but crossing the **International Date Line** going east makes you set the clock BACK a day. Keep the two ideas separate (see the next concept).",
        },
      ],
    },

    // 3. International Date Line (formula, no box)
    {
      kind: "formula" as const,
      slug: "international-date-line",
      name: "The International Date Line",
      intuition:
        "The International Date Line (IDL) runs roughly along the 180° meridian, opposite the Prime Meridian. It is where the calendar date changes. The rule reverses what you expect from time: when you fly EAST across the IDL you SUBTRACT a day (you 'lose' 24 hours, i.e. repeat the date); flying WEST across it you ADD a day. The NDA tests exactly this 'east across the IDL = lose 24 hours' fact.",
      definition:
        "- The **International Date Line** follows about the **180°** meridian and is where the calendar date changes.\n" +
        "- Crossing the IDL travelling **EAST** → set the date **back one day** (you 'lose' 24 hours).\n" +
        "- Crossing the IDL travelling **WEST** → set the date **forward one day** (you 'gain' 24 hours).",
      authoredExample: {
        prompt: "What happens to your calendar date when you fly WEST across the International Date Line?",
        steps: [
          "The IDL is where the date changes.",
          "Going east across it subtracts a day; going west does the opposite.",
          "So crossing it westward you advance the date by one day.",
        ],
        answer: "You gain a day (set the date forward 24 hours).",
      },
      selfCheckExample: {
        prompt: "Flying EAST across the International Date Line, do you gain or lose a day?",
        steps: [
          "East-across-IDL is the 'subtract' direction.",
          "You repeat the date, effectively losing 24 hours.",
        ],
        answer: "You lose a day (24 hours).",
      },
      practiceSet: [
        { prompt: "The International Date Line lies near which meridian?", answer: "180°" },
        { prompt: "Flying east across the IDL: gain or lose a day?", answer: "Lose a day" },
        { prompt: "Flying west across the IDL: gain or lose a day?", answer: "Gain a day" },
      ],
      pyqExampleId: "e66765a4-5122-484b-8517-13dd2d301003", // east across IDL = lose 24 hours
      traps: [
        {
          title: "East across the date line LOSES 24 hours",
          body:
            "Intuition says 'east = ahead = gain', but for the **International Date Line** it is the opposite: flying EAST across it you **lose 24 hours** (set the date back). West across it you gain a day.",
        },
      ],
    },
  ],
};
