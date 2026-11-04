import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 2 Location and Extent. India and Brazil side by
 * side, checked against the Balbharati Geography Std X text; most-asked years
 * and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Location and Extent",
  chapterSlug: "location-and-extent",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 2",
  keyPoints: [
    {
      term: "India: location",
      text: "Republic of India, capital New Delhi. India is located in the **northern and eastern hemispheres**, in the southern part of the Asian continent.",
    },
    {
      term: "India: extent",
      text: "Mainland India: 8°4' N to 37°6' N latitudes and 68°7' E to 97°25' E longitudes. The **Tropic of Cancer** passes through the middle of India.",
    },
    {
      term: "Southernmost tip of India",
      text: "**Indira Point** (in the Andaman and Nicobar Islands), on the 6°45' N parallel. Kanyakumari is the southern tip of the mainland only.",
    },
    {
      term: "India: boundaries",
      text: "Pakistan to the north west; China, Nepal and Bhutan to the north; Bangladesh and Myanmar to the east; Sri Lanka to the south. Arabian Sea to the west, Bay of Bengal to the east, Indian Ocean to the south.",
    },
    {
      term: "Brazil: location",
      text: "Federative Republic of Brazil, capital Brasilia. Some part lies in the northern hemisphere, **most of it in the southern hemisphere**, and all of it in the western hemisphere, in the northern part of South America.",
    },
    {
      term: "Brazil: extent",
      text: "Mainland Brazil: 5°15' N to 33°45' S latitudes and 34°47' W to 73°48' W longitudes. The **Equator** passes through the northern part of Brazil.",
    },
    {
      term: "Brazil: boundaries",
      text: "The Atlantic Ocean lies to the east. Brazil borders every South American country except **Chile and Ecuador**.",
    },
    {
      term: "India: historical background",
      text: "Under British rule for almost one and a half centuries; independence in **1947**. Despite three wars and famines, India is a major developing country and a global market. Economic reforms have sped up development.",
    },
    {
      term: "India: a young country",
      text: "The proportion of youth in India's population is high. They form a major part of the working population, so India is looked upon as a young country.",
    },
    {
      term: "Brazil: historical background",
      text: "Under **Portuguese** rule for more than three centuries; independence in **1822**. From 1930 to 1985 it was under a populist military government. It overcame global financial difficulties in the late 20th century.",
    },
    {
      term: "Type of government",
      text: "Both are **republics**. India: federal parliamentary republic. Brazil: federal presidential republic. Independence Day: India 15 August, Brazil 7 September.",
    },
    {
      term: "Brazil's name and clues",
      text: "The name Brazil comes from Pau Brasil, a local wooded tree. Brazil is famous for Samba dance and football and is known as the coffee pot of the world.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Outline map of India: what to mark",
      labels: ["Tropic of Cancer", "Indira Point", "Arabian Sea, Bay of Bengal", "Indian Ocean", "Neighbouring countries", "States asked: Sikkim, Goa"],
    },
    {
      title: "Outline map of Brazil: what to mark",
      labels: ["Equator", "Tropic of Capricorn", "North Atlantic Ocean", "South Atlantic Ocean", "States asked: Maranhao, Parana"],
    },
  ],
  mostAsked: [
    { topic: "Read the map of India: southernmost point, IST longitude, middle latitude, seas, neighbours, distances", marks: 1, years: [2026, 2025, 2024, 2022] },
    { topic: "Mark on the outline map: Equator (Brazil), Tropic of Cancer (India), a state, an ocean", marks: 1, years: [2026, 2025, 2024, 2022] },
    { topic: "Hemispheres, Equator and Tropics: where India and Brazil lie", marks: 1, years: [2026, 2025, 2024, 2022, 2020] },
    { topic: "States, coasts and size: Brazil's states and coast, smallest and largest Indian state", marks: 1, years: [2026, 2025, 2024, 2022] },
    { topic: "Describe the latitudinal and longitudinal extent of India and Brazil", years: [2026, 2024] },
    { topic: "Historical background of India or Brazil", years: [2024, 2020] },
    { topic: "Type of government of India and Brazil: republic", marks: 1, years: [2025] },
  ],
  mistakes: [
    {
      title: "Tropic of Capricorn through India",
      body: "Wrong. The **Tropic of Cancer** passes through the middle of India; the sun's rays are perpendicular up to it. The Tropic of Capricorn passes through southern Brazil.",
    },
    {
      title: "Kanyakumari or Rameshwaram as the southernmost tip",
      body: "The southernmost tip of India is **Indira Point** (6°45' N). Rameshwaram is not, and Kanyakumari is the tip of the mainland only.",
    },
    {
      title: "Brazil on the Pacific",
      body: "Brazil's coast is along the **Atlantic Ocean**. Chile and Ecuador do not share a border with Brazil. Uruguay is a country, not a state of Brazil; Acre is a state with no coast.",
    },
    {
      title: "Presidential for both",
      body: "Both countries are **republics**. Only Brazil is presidential; India is parliamentary. Military rule in Brazil ended in 1985.",
    },
    {
      title: "Map-reading facts the board asks",
      body: "Indian Standard Time: the 82°30' E longitude, 5 hours 30 minutes ahead of Greenwich. India's north-south distance is about 3214 km and east-west about 2933 km. Rajasthan is the largest state, Goa the smallest. Brazil is fifth in the world by area.",
    },
  ],
};

export default sheet;
