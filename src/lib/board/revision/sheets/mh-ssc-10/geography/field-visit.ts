import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 1 Field Visit. Points checked against the
 * Balbharati Geography Std X text (a sample visit from Naldurg to Alibag);
 * most-asked years and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Field Visit",
  chapterSlug: "field-visit",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 1",
  keyPoints: [
    {
      term: "Field visit",
      text: "Visiting a given place to observe it and gain **first hand information**: relief, water bodies, vegetation, soil, agriculture, human settlements and settlement patterns. Observations are noted down in notebooks.",
    },
    {
      term: "Importance of a field visit",
      text: "We see with our own eyes what we read in the book. We notice how relief, rainfall, vegetation, crops, houses and occupations change from place to place, and we learn to collect, record and present information.",
    },
    {
      term: "Planning the visit",
      text: "Organised under the teachers' guidance. Decide the place, the route (with a map), transport, food and night halt, and the timings. Prepare the questionnaire in school before leaving.",
    },
    {
      term: "Items to carry",
      text: "I-card, notebook, pen, map, questionnaire, binoculars, camera, cap and water bottle. Personal luggage stays in the bus.",
    },
    {
      term: "Questionnaire",
      text: "A list of questions prepared in school. At the Talathi office the students asked about crops, soil types, fruits and cash crops, land revenue, land under irrigation, watershed programmes and other occupations.",
    },
    {
      term: "Ways of collecting information",
      text: "Observe and note down, click photographs, read information boards at the place, and ask officials and local people the questions of the questionnaire.",
    },
    {
      term: "Vegetation shows rainfall",
      text: "A change in the type of vegetation is an indicator of a change in the amount of rainfall. Thorny semi-arid plants near Naldurg; teak and dense forest in the rainy Ghats.",
    },
    {
      term: "Crops follow water",
      text: "Pulses (moog, urad) where rainfall is low (Naldurg); sugarcane where irrigation is available (Solapur to Pune); paddy (rice) where rainfall is high (Sinhagad, the coast).",
    },
    {
      term: "Settlements seen",
      text: "Rural houses in a straight line along the road (linear settlements), with mud and wood houses (dhabyachi ghare). In urban areas population density is high, with multi-storeyed houses.",
    },
    {
      term: "Types of forts",
      text: "**Hill fort** built on a hill (Sinhagad). **Land fort** (Naldurg). **Sea fort** surrounded by sea water, built on a wave-cut platform (Kolaba, Sindhudurg, Janjira).",
    },
    {
      term: "Precautions",
      text: "Stay with the group and follow the teachers' instructions. At the sea coast, check the timings of high and low tides and do not go deep into the water. Do not litter or damage plants and monuments.",
    },
    {
      term: "Field visit report",
      text: "Compiled after the visit: place, date and route, aim, observations (relief, vegetation, soil, crops, settlements, occupations), photographs and sketches, and a conclusion.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [],
  mostAsked: [
    { topic: "Prepare a questionnaire for a field visit (factory, sugar factory, forest, weather station)", marks: 4, years: [2025, 2024, 2022, 2020] },
    { topic: "Preparations before a field visit and the items to carry", years: [2025, 2024, 2022] },
    { topic: "What is field visit? State its importance (with precautions at a sea coast)", marks: 4, years: [2026, 2024] },
    { topic: "Fill in or odd man out: first hand information, main purpose of a field visit", marks: 1, years: [2024, 2020] },
  ],
  mistakes: [
    {
      title: "Entertainment as the main purpose",
      body: "The purpose of a field visit is geographical, historical or cultural study. Entertainment is the odd man out.",
    },
    {
      title: "Wrong item in the list",
      body: "Carry a questionnaire, notebook, camera, map and binoculars. A computer, chair or black board is not carried on a field visit.",
    },
    {
      title: "A vague questionnaire",
      body: "Write 8 to 10 clear questions about that place. A factory: raw material and its source, workers, products, market, water and power used, waste and pollution control.",
    },
    {
      title: "A report with no order",
      body: "Write it under headings: place, date, route, observations, photographs and conclusion. A list of what you ate on the trip gets no marks.",
    },
  ],
};

export default sheet;
