import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 3 Physiography and Drainage. India and Brazil side
 * by side, checked against the Balbharati Geography Std X text; most-asked
 * years and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Physiography and Drainage",
  chapterSlug: "physiography-and-drainage",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "India: five physiographic divisions",
      text: "The Himalayas, the North Indian Plains, the Peninsula, the Coastal Plains and the Island groups.",
    },
    {
      term: "The Himalayas",
      text: "**Young fold mountains**, from the Pamir Knot eastwards; in India from Jammu and Kashmir to Arunachal Pradesh. Parallel ranges from south to north: **Siwaliks** (youngest), Lesser Himalayas, Greater Himalayas (Himadri), Trans Himalayas. Divided into Western (Kashmir), Central (Kumaun) and Eastern (Assam) Himalayas.",
    },
    {
      term: "North Indian Plains",
      text: "Between the Himalayas and the Peninsula, from Rajasthan and Punjab to Assam; mostly flat and low lying. Ganga Plains (east of the Aravalis) slope east. Thar Desert (Marusthali) in the west. Punjab Plains, made by the Satluj and its tributaries, slope west and are very fertile.",
    },
    {
      term: "Sunderbans",
      text: "The delta of the Ganga-Brahmaputra system, in West Bengal and Bangladesh. It is considered the **world's largest delta**.",
    },
    {
      term: "The Peninsula",
      text: "South of the North Indian Plains, tapering towards the Indian Ocean: many plateaus and hill ranges. The **Aravalis** are the oldest fold mountains here; Vindhyas and Satpudas in the centre; Western and Eastern Ghats at the sides.",
    },
    {
      term: "Coasts of India",
      text: "About 7500 km long. **West coast** (Arabian Sea): rocky and narrow; short, swift rivers form **estuaries**, not deltas. **East coast** (Bay of Bengal): made by river deposition; gentle slope, so rivers form **deltas**.",
    },
    {
      term: "Islands of India",
      text: "**Lakshadweep** (Arabian Sea): mostly atoll (coral) islands, small and low. **Andaman** group (Bay of Bengal): mainly **volcanic**, large and hilly; Barren Island has India's only active volcano.",
    },
    {
      term: "Brazil: physiography",
      text: "Mostly **highlands**, plateaus and small mountains; no very high, long mountains. Wide plains only in the Amazon basin and the upper Paraguay basin. Divisions: Highlands, Great Escarpment, Coastal region, Plains, Island groups.",
    },
    {
      term: "Brazilian Highlands",
      text: "An extensive plateau in the south (Brazilian Shield). With the Guyana Highlands it forms the core of South America. Highest peak: **Pico de Neblina**, 3014 m, on the Brazil-Venezuela border.",
    },
    {
      term: "The Great Escarpment",
      text: "The steep eastern edge of the Highlands, steepest from Sao Paulo to Porto Alegre. It blocks the **Southeast Trade winds**, making a rain shadow in the north east of the highlands; the region to its north is the **Drought Quadrilateral**.",
    },
    {
      term: "Coasts of Brazil",
      text: "About 7400 km. **Northern** (North Atlantic) coast, Amapa to Rio Grande do Norte: low, with river mouths; **Marajo** island between the Amazon and Tocantins mouths. **Eastern** coast: small rivers and the Sao Francisco, beaches, dunes, coral reefs. Praia do Cassino: longest sandy beach (over 200 km).",
    },
    {
      term: "Plains and Pantanal",
      text: "Amazon plains: the largest plain of Brazil, sloping east, about 1300 km wide in the west and 240 km at the narrowest; flooded, covered by tropical rainforest. **Pantanal**, in the south west, is one of the largest wetlands in the world.",
    },
    {
      term: "Rivers of Brazil",
      text: "**Amazon**: headwaters on the eastern Andes in Peru; discharge about 2 lakh cubic metres a second, so sediments are washed off and **no delta** forms; 150 km wide at the mouth. **Paraguay-Parana** (and Uruguay) drain to the River Plata in Argentina. **Sao Francisco**: third river, basin wholly in Brazil, flows north then east.",
    },
    {
      term: "Rivers of India",
      text: "**Himalayan** rivers rise from glaciers: **perennial** (Indus with Jhelum, Chenab, Ravi, Satluj; Ganga from Gangotri with Yamuna; Brahmaputra). **Peninsular** rivers are rain fed and **seasonal**. Western Ghats: the main water divide. West flowing: Narmada and Tapi (rift valleys). East flowing: Mahanadi, Godavari (second largest by catchment), Krishna, Kaveri.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Physical and drainage map of India: what to mark",
      labels: ["Himalayas, Aravalis", "Western and Eastern Ghats", "Ganga, Brahmaputra, Narmada", "Godavari, Krishna, Kaveri", "Lakshadweep, Andaman", "Sunderbans"],
    },
    {
      title: "Physical and drainage map of Brazil: what to mark",
      labels: ["Guyana and Brazilian Highlands", "Pico de Neblina", "Amazon, Sao Francisco", "Paraguay, Parana", "Marajo Island", "Pantanal, Cassino beach"],
    },
  ],
  mostAsked: [
    { topic: "Mark on the map of Brazil: Marajo Island, Pico de Neblina, Paraguay, Parana, Sao Francisco, Cassino beach, Pantanal", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Read a physical or drainage map: rivers, sources, islands, lakes, coasts", marks: 1, years: [2026, 2024, 2022] },
    { topic: "Physiography of Brazil: highlands, Great Escarpment, coasts, Pantanal, highest peak", marks: 1, years: [2026, 2025, 2024, 2022, 2020] },
    { topic: "Rivers of Brazil: Amazon has no delta, its tributaries, river basins, no west flowing rivers", marks: 1, years: [2025, 2024, 2020] },
    { topic: "Physiography of India: Himalayas, North Indian Plains, coasts, islands", marks: 4, years: [2025, 2024, 2022, 2020] },
    { topic: "Mark on the map of India: Aravali mountains, river Narmada, Lakshadweep", marks: 1, years: [2026, 2022] },
    { topic: "Rivers of India: Godavari, tributaries of Ganga, the Sunderbans delta", marks: 1, years: [2026, 2025] },
    { topic: "Give geographical reasons: Himalayan rivers are perennial", marks: 3, years: [2026, 2025] },
  ],
  mistakes: [
    {
      title: "A delta at the Amazon's mouth",
      body: "No. The Amazon's huge discharge washes the sediments away, so no delta and almost no distributaries form; a series of islands lies at the mouth instead.",
    },
    {
      title: "Swapping Lakshadweep and Andaman",
      body: "Lakshadweep islands are **coral** (atolls). Andaman islands are mainly **volcanic**. Do not write it the other way.",
    },
    {
      title: "Oldest and youngest",
      body: "The **Aravalis** are the oldest fold mountains of India. The **Siwaliks** are the youngest Himalayan range. The Himalayas as a whole are young fold mountains.",
    },
    {
      title: "Perennial and seasonal mixed up",
      body: "Himalayan rivers get water from melting glaciers in summer and from the monsoon, so they flow all year. Peninsular rivers are rain fed, so they are seasonal and seldom flood.",
    },
    {
      title: "West flowing rivers in Brazil",
      body: "There are none. The highlands slope north and east, and the Amazon flows east from the Andes, so rivers reach the Atlantic in the east and north, or flow south into Argentina.",
    },
    {
      title: "Deltas on the west coast of India",
      body: "West coast rivers are short and swift, so they form estuaries. Deltas form on the east coast, where the slope is gentle and rivers deposit sediment.",
    },
  ],
};

export default sheet;
