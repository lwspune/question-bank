import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 9 Tourism, Transport and Communication. India and
 * Brazil side by side, checked against the Balbharati Geography Std X text;
 * most-asked years and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Tourism, Transport and Communication",
  chapterSlug: "tourism-transport-and-communication",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 9",
  keyPoints: [
    {
      term: "Tourism in Brazil",
      text: "Clean white sand beaches, islands, the dense Amazon forests, birds and animals, Brasilia, Rio de Janeiro and Sao Paulo attract tourists. Because its natural resources are sensitive, **ecotourism** is developing fast in Brazil.",
    },
    {
      term: "Tourism as an economic activity",
      text: "Tourism is an important economic activity. It is an **invisible trade**: a country earns from services given to visitors, not from selling goods.",
    },
    {
      term: "Tourism and GDP",
      text: "India had more international tourists than Brazil in 2015, and more of its people work in tourism, yet tourism's share of India's GDP is **less** than Brazil's. This is because India's population and GDP are both larger.",
    },
    {
      term: "Tourism in India",
      text: "International tourists are rising steadily, faster after 2010. They come for **heritage, adventure, cultural, health and business** tourism; ecotourism is also being boosted.",
    },
    {
      term: "Roadways in Brazil",
      text: "The **most common** mode: more than half of transport. The road network is dense in the east; the Amazon forests and swamps limit roads there.",
    },
    {
      term: "Waterways in Brazil",
      text: "Developed commercially on the **Amazon**: boats ply from Iquitos in Peru to the mouth, about 3700 km, the longest waterway in the world. The south-flowing Parana is also used, and coastal shipping runs along the coast.",
    },
    {
      term: "Railways and airways in Brazil",
      text: "Railways are **not well developed**; long distance passenger trains run only on a few urban tourist routes. Airways contribute little.",
    },
    {
      term: "Transport in India",
      text: "Denser than Brazil's. Roads carry about 85% of passengers and 70% of freight. Railways are **dense in the North Indian Plains** and less dense in hill states, the north east, central India and Rajasthan.",
    },
    {
      term: "Waterways and airways in India",
      text: "Waterways are the **cheapest** means of transport, about 1% of India's transport; about 95% of foreign trade moves by sea. Airways are more developed than in Brazil.",
    },
    {
      term: "Transport and progress",
      text: "The development of means of transport is an **indicator of rapid progress** of a country.",
    },
    {
      term: "Time in Brazil",
      text: "Its extreme points differ by about 168 minutes. Brazil has **four time zones**, 2 to 5 hours **behind** GMT. Official Brazilian time (BRT) is GMT minus 3 hours.",
    },
    {
      term: "Time in India",
      text: "Extremes differ by 120 minutes, but India has **one** standard time: the **82.5° E** longitude through Allahabad, **5 hours 30 minutes ahead** of GMT.",
    },
    {
      term: "Communication in Brazil",
      text: "Well developed: landlines, mobiles, TV, radio, internet; over 45% have internet. Modern in central-south Brazil, much less in the north and north-west, where land size and dense forests block coverage. Brazil is building its own satellites and rockets (AEB).",
    },
    {
      term: "Communication in India",
      text: "India is one of the largest users of smartphones and internet. With the explosion of electronic media, the **telecom industry** has become one of the fastest growing sectors. ISRO runs India's satellite launches.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Read the tourism graphs: international tourists, tourism in GDP and jobs",
      labels: ["Type of graph (bar or line)", "Title", "Years on the X axis", "Brazil and India index", "Values in lakhs or %"],
    },
    {
      title: "Transport map: what to mark",
      labels: ["Ports: Mumbai, Chennai, Kolkata", "Vishakhapatnam port", "East-West corridor (Porbandar to Silchar)", "Manaus port (Brazil)", "Rio Grande airport (Brazil)"],
    },
  ],
  mostAsked: [
    { topic: "Transport map: mark or read ports, airports and highways of India and Brazil", marks: 1, years: [2026, 2024, 2022, 2020] },
    { topic: "Read the tourism graphs: international tourists, share of tourism in GDP and jobs", marks: 6, years: [2026] },
    { topic: "Tourism: invisible trade, eco-tourism in Brazil, heritage places, conserving historical places", marks: 1, years: [2026, 2024, 2022] },
    { topic: "Cheapest mode (waterways), most common in Brazil (roadways), railway density, Manmad", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Brazil: Samba dance, football, Rio de Janeiro", marks: 1, years: [2026, 2022, 2020] },
    { topic: "Give reasons: dense railways in the North Indian plains; waterways not developed in Brazil", marks: 3, years: [2025] },
    { topic: "Give reasons: telecom is one of the fastest growing sectors in India", marks: 3, years: [2024] },
  ],
  mistakes: [
    {
      title: "Cheapest and most common mixed up",
      body: "The **cheapest** mode of transport is **waterways**. The **most common** mode in Brazil is **roadways**.",
    },
    {
      title: "Brazil's time ahead of India's",
      body: "Wrong. Brazil is **behind** GMT (BRT is GMT minus 3 hours) and India is **ahead** of GMT by 5 hours 30 minutes, so Brazil's time is behind India's.",
    },
    {
      title: "Wrong place for a monument",
      body: "The Taj Mahal is at Agra, not New Delhi. Gateway of India: Mumbai. Ajanta Caves: Aurangabad. Naldurg is a fort on land, not a hill fort.",
    },
    {
      title: "Railways dense everywhere",
      body: "Railways are dense in the North Indian Plains (flat land, many people, farming) and sparse in Rajasthan, hill states and the north east.",
    },
    {
      title: "Waterways not developed in Brazil",
      body: "Only the Amazon and the Parana carry much traffic. Most other rivers cross the highlands, and the Amazon region is forested and thinly populated, so waterways stay limited.",
    },
  ],
};

export default sheet;
