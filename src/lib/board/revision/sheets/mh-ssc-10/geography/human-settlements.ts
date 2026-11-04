import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 7 Human Settlements. India and Brazil side by
 * side, checked against the Balbharati Geography Std X text; most-asked years
 * and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Human Settlements",
  chapterSlug: "human-settlements",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 7",
  keyPoints: [
    {
      term: "What shapes settlements in India",
      text: "Climate, availability of water, slope of the land and level of development give India a variety of settlement patterns.",
    },
    {
      term: "Nucleated settlements in India",
      text: "On cultivable land with water: the plateau of the Narmada Valley, paddy lands of Bihar and Uttar Pradesh, the Vindhyan Plateau and other cultivated parts, such as the North Indian plains.",
    },
    {
      term: "Dispersed settlements in India",
      text: "Tribal parts of central India, eastern and southern Rajasthan, Himalayan slopes, and land with dissected and uneven topography.",
    },
    {
      term: "Brazil: coastal settlements",
      text: "Early settlements were made by European settlers mainly on the coast. The coast is hot and humid with limited flat land, but has a good water supply and many natural resources, so it is now dense.",
    },
    {
      term: "Sao Paulo: nucleated",
      text: "Rich soil ideal for **coffee**, natural minerals such as **iron ore** close by, a steady energy supply and a good transport system make Sao Paulo a **nucleated** settlement.",
    },
    {
      term: "North-east Brazil: sparse",
      text: "The north-east Highlands suffer **extreme droughts**, which make agriculture difficult, so settlements are sparse.",
    },
    {
      term: "Amazon and central Brazil: sparse",
      text: "Thick equatorial rainforests, an **unhealthy climate** unfit for settlement, limits on using natural resources, and **poor transport** links.",
    },
    {
      term: "Level of urbanisation",
      text: "Measured as the **percentage of urban population** to total population.",
    },
    {
      term: "Urbanisation in India",
      text: "Growth has been **slow**: **31.16%** in 2011, low compared with developed countries. Expanding urban centres and new towns are raising the urban population.",
    },
    {
      term: "Urbanised states of India",
      text: "More in the south than the north. **Goa** is the most urbanised state (62% urban); Delhi is over 80% urban. High: Tamil Nadu, Maharashtra, Gujarat, Kerala. Low: Himachal Pradesh, Jammu and Kashmir, Uttarakhand, Bihar, Rajasthan.",
    },
    {
      term: "India's urban tradition",
      text: "Indraprastha (Delhi), Mithila, Varanasi, Harappa, Mohenjodaro, Ujjain and Pratishthan (Paithan) were urban settlements of earlier times: India has a great tradition of urbanisation.",
    },
    {
      term: "Urbanisation in Brazil",
      text: "One of the few **highly urbanised** developing countries: about **86%** urban. Rapid in the South and South-east, with Sao Paulo the major industrial metropolis. The **Go West** policy aims to reduce pressure and regional imbalance.",
    },
    {
      term: "Urbanised states of Brazil",
      text: "Coastal states are more urbanised than the interior: Sao Paulo, Goias, Minas Gerais more than the North. The Amazon basin and highlands are less urbanised; **Manaus** is a port where the Negro meets the Amazon.",
    },
  ],
  formulas: [
    { label: "Level of urbanisation", latex: "\\text{Urbanisation (\\%)} = \\dfrac{\\text{Urban population}}{\\text{Total population}} \\times 100" },
  ],
  derivations: [],
  diagrams: [
    {
      title: "Map of Brazil: settlements to mark",
      labels: ["Brasilia (capital)", "Rio de Janeiro", "Sao Paulo", "Manaus", "Most urbanised coastal states"],
    },
  ],
  mostAsked: [
    { topic: "Mark on the map of Brazil: the capital (Brasilia), Rio de Janeiro", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Give reasons: settlements are sparse in north-eastern Brazil and towards the Amazon basin", marks: 3, years: [2025, 2024] },
    { topic: "Sao Paulo has a nucleated settlement", years: [2026, 2025] },
    { topic: "Availability of water, and other favourable factors for settlements", years: [2026, 2025] },
    { topic: "Type of settlements in the North Indian plains", marks: 1, years: [2020] },
  ],
  mistakes: [
    {
      title: "Wrong capital",
      body: "The capital of Brazil is **Brasilia**, not Rio de Janeiro or Sao Paulo.",
    },
    {
      title: "One reason for every sparse area",
      body: "North-east Brazil is sparse because of **droughts**. The Amazon basin is sparse because of dense forests, an unhealthy climate and poor transport. Do not swap them.",
    },
    {
      title: "Dispersed settlements in the plains",
      body: "The North Indian plains have **nucleated** settlements (fertile land, water). Dispersed settlements are found in hilly, forested and dissected areas.",
    },
    {
      title: "Unfavourable climate as a favourable factor",
      body: "Water, fertile land and a favourable climate help settlements to concentrate. Unfavourable climate is the odd man out.",
    },
  ],
};

export default sheet;
