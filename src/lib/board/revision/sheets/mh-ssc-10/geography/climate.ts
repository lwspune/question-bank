import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 4 Climate. India and Brazil side by side, checked
 * against the Balbharati Geography Std X text; most-asked years and marks
 * from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Climate",
  chapterSlug: "climate",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 4",
  keyPoints: [
    {
      term: "Brazil: range of climates",
      text: "Brazil's vast latitudinal extent gives a wide range of climates: **hot** near the equator in the north, **temperate** near the Tropic of Capricorn in the south. Most of Brazil lies in the tropical zone.",
    },
    {
      term: "Brazil: rain-bearing winds",
      text: "Brazil gets rainfall from the **South-East Trade winds** and the **North-East Trade winds**, not from monsoon winds.",
    },
    {
      term: "Escarpment and Drought Quadrilateral",
      text: "The escarpment blocks the winds from the sea and causes **orographic** rainfall on the coast. Beyond the highlands the winds weaken, so rainfall is minimal: this rain shadow region is the **Drought Quadrilateral**.",
    },
    {
      term: "Brazil: temperature and rainfall",
      text: "Amazon valley: 25 to 28°C, about 2000 mm of rain. Highlands: cooler. Coast: mild and humid. North-eastern coast: 1000 to 1200 mm. Near the equator on the coast, temperature hardly varies.",
    },
    {
      term: "Why cyclones are rare in Brazil",
      text: "Near the equator on Brazil's coast, temperature differences are negligible, winds move vertically and the convergence zone of the trade winds is weak. So cyclones are not formed.",
    },
    {
      term: "Snowfall in Brazil",
      text: "Brazil is a tropical country and normally gets no snowfall. Only in exceptional conditions do southern polar air masses reach southern Brazil and bring snow (recorded in 1879, 1957 and 1985).",
    },
    {
      term: "India: monsoon type climate",
      text: "India's climate is **monsoon** type and hot through the year. The sun's rays are perpendicular up to the **Tropic of Cancer**, which passes through the middle of India; temperatures rise towards the south. Winter temperatures drop to minus 40°C in Jammu and Kashmir.",
    },
    {
      term: "Factors of India's climate",
      text: "Latitudinal location and altitude cause the diversity. The **Indian Ocean** and the **Himalayas** strongly influence the climate and the origin of the monsoons.",
    },
    {
      term: "Role of the Himalayas",
      text: "They block the **very cold winds** from the north. They obstruct the monsoon winds, causing orographic rainfall, and the South-West monsoons retreat from them.",
    },
    {
      term: "South-West monsoon",
      text: "Summer heat makes low pressure over the Punjab plains and the Thar desert. Moist winds blow in from the high pressure over the **Indian Ocean**. The Ghats make the coasts rainy; the leeward side gets less. Winds parallel to the Aravalis leave Gujarat and Rajasthan dry.",
    },
    {
      term: "Retreating (North-East) monsoon",
      text: "The winds return from the Himalayas and blow from the north east towards the Indian Ocean, bringing rain again to parts of the Peninsula. **Tamil Nadu** gets its maximum rainfall in this season.",
    },
    {
      term: "Seasons of India",
      text: "Four, as per the Indian Meteorological Department: hot weather season, season of rainfall (monsoon), retreating monsoon, cold weather season.",
    },
    {
      term: "Records of India",
      text: "Wettest places in the world: **Mawsynram** (11,872 mm) and **Cherrapunji** (11,777 mm), Meghalaya. Driest: **Jaisalmer** (less than 120 mm). Ganganagar reaches 50°C in June; Kargil falls to minus 48°C.",
    },
    {
      term: "Opposite seasons",
      text: "India is in the northern hemisphere and most of Brazil in the southern, so their seasons come at different times: when it is summer in India it is winter in Brazil.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Draw or read a temperature and rainfall graph (Manaus, Belem, Delhi, Chennai)",
      labels: ["Months on the X axis", "Rainfall in mm (bars)", "Temperature in °C (line)", "Maximum and minimum temperature", "Range of temperature"],
    },
  ],
  mostAsked: [
    { topic: "Explain the importance of the Himalayas and the Indian Ocean for India's climate", marks: 4, years: [2026, 2025, 2024] },
    { topic: "Brazil's climate: hot north, trade winds, orographic rain, Drought Quadrilateral", marks: 1, years: [2026, 2025, 2022] },
    { topic: "Give reasons: snowfall does not always occur in Brazil", marks: 3, years: [2026, 2024, 2020] },
    { topic: "Give reasons: tropical cyclones occur rarely in Brazil", marks: 3, years: [2026, 2025, 2024] },
    { topic: "Odd man out: places with heavy or very high rainfall in India", marks: 1, years: [2026, 2024] },
    { topic: "Retreating monsoon; India gets rain from the North-East monsoon too", years: [2024, 2020] },
    { topic: "Compare the climates of India and Brazil; same seasons at the same time?", years: [2025, 2022] },
  ],
  mistakes: [
    {
      title: "Monsoon winds in Brazil",
      body: "Wrong. Brazil gets its rain from the **trade winds** (South-East and North-East). Monsoon winds bring rain to India.",
    },
    {
      title: "Same seasons in both countries",
      body: "Wrong. India lies north of the equator and most of Brazil south of it, so their summers and winters fall in opposite months.",
    },
    {
      title: "Jaisalmer as a heavy rainfall place",
      body: "Jaisalmer and western Rajasthan are the driest part of India. Heavy rainfall places: Mawsynram, Cherrapunji (Meghalaya), Mahabaleshwar and the Western Ghats, Arunachal Pradesh.",
    },
    {
      title: "Convectional rain on Brazil's coast",
      body: "The rain on Brazil's coast is **orographic**: the escarpment blocks the winds from the sea.",
    },
    {
      title: "Cyclones in both countries",
      body: "India faces cyclones often. Tropical cyclones rarely visit Brazil's coast: the trade wind convergence zone there is weak.",
    },
  ],
};

export default sheet;
