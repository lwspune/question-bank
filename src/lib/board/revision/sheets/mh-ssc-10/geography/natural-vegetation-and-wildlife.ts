import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH SSC 10 Geography, Ch. 5 Natural Vegetation and Wildlife. India and
 * Brazil side by side, checked against the Balbharati Geography Std X text;
 * most-asked years and marks from the board past-paper questions in the bank.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-ssc-10",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Natural Vegetation and Wildlife",
  chapterSlug: "natural-vegetation-and-wildlife",
  source: "Balbharati Geography Std X (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Rainfall decides vegetation (Brazil)",
      text: "In the equatorial north it rains all year, so **evergreen** forests grow. Away from the equator, rainy days and rainfall reduce, so forests thin out into grasses, short shrubs and thorny vegetation.",
    },
    {
      term: "Brazil: plant species",
      text: "Brazil has the **largest number of vegetation species** in the world: evergreen, semi-evergreen and arid types. Trees: Pau Brasil, rubber, mahogany, rosewood, and many orchids.",
    },
    {
      term: "Lungs of the world",
      text: "Brazil's evergreen rainforests release a large amount of **oxygen** and help reduce carbon dioxide. So they are called the **lungs of the world**.",
    },
    {
      term: "India: evergreen forests",
      text: "More than **2000 mm** rain and abundant sunlight. Broad green leaves; hard, heavy, durable wood: mahogany, rosewood, rubber; many creepers. Highest biodiversity.",
    },
    {
      term: "India: deciduous forests",
      text: "**1000 to 2000 mm** rain. In the dry season trees **shed their leaves** so that water is not lost by evaporation. Teak, bamboo, banyan, peepal. They occupy most of India.",
    },
    {
      term: "India: thorny and shrub vegetation",
      text: "Less than **500 mm** rain and long dry summers. Small leaves: catechu, acacia, khejadi, and cactus such as aloe vera and agave.",
    },
    {
      term: "Coastal forests (mangroves)",
      text: "In swampy areas, estuaries and lagoons with saline soil and moist climate. Called mangroves or Sunderbans in India. The wood is oily, light and durable.",
    },
    {
      term: "Himalayan forests",
      text: "Three types by altitude: seasonally flowering trees at the highest altitude; **coniferous** trees (pine, deodar, fir) at medium altitude; **mixed** forests at the foothills, with many sal trees.",
    },
    {
      term: "Brazil: wildlife",
      text: "Greater wildlife diversity than any other country. Huge **anacondas** in the Pantanal swamps; **pink dolphins** and piranhas in rivers; swordfish in the sea; condors, macaws, parrots, flamingoes; golden lion tamarin, pumas, crocodiles; millions of insects.",
    },
    {
      term: "Brazil: environmental problems",
      text: "Illegal smuggling of wild animals, slash and burn agriculture (**roca**), deforestation and pollution. Many endemic species are near extinction. About 5831 sq km of forest had degraded by 2016.",
    },
    {
      term: "Roca",
      text: "Shifting agriculture in Brazil: forest land is cleared by cutting and burning, and subsistence farming is done on it for the next few years.",
    },
    {
      term: "India: wildlife",
      text: "A mega-diverse country. Elephants in hot, humid forests; one-horned rhinos in Assam's swamps; wild ass and camels in arid lands; **snow leopards and yaks** in the snowy Himalayas; Indian bisons, deer, antelopes, monkeys in the Peninsula. Turtles, crocodiles and gharials in rivers.",
    },
    {
      term: "Tigers and lions",
      text: "**India** is the only country in the world where both tigers and lions are found.",
    },
    {
      term: "Conservation in India",
      text: "Poaching, pollution and deforestation push species towards extinction (the cheetah). The government has set up national parks, wildlife sanctuaries, bird sanctuaries and biosphere reserves.",
    },
  ],
  formulas: [],
  derivations: [],
  diagrams: [
    {
      title: "Forest types of India (Figure 5.3): what to mark",
      labels: ["Evergreen forests (Western Ghats, north east)", "Deciduous forests", "Thorny shrubs", "Himalayan forests", "Coastal forests (Sunderbans)"],
    },
    {
      title: "Vegetation and wildlife of Brazil: what to mark",
      labels: ["Evergreen forests (Amazon basin)", "Thorny shrubs (Caatinga, north east)", "Pampas grassland (far south)", "Pantanal (anacondas)", "Golden lion tamarin"],
    },
  ],
  mostAsked: [
    { topic: "Mark on the map: Pampas, Caatinga, thorny shrubs (Brazil); evergreen forest of the Western Ghats (India)", marks: 1, years: [2026, 2025, 2024, 2020] },
    { topic: "Read a vegetation or wildlife map: forest of the Amazon basin, southern grassland, tamarin, crocodiles", marks: 1, years: [2026, 2022] },
    { topic: "Brazil's forests: lungs of the world, most plant species, evergreen rainforests and their trees", marks: 1, years: [2026, 2025, 2020] },
    { topic: "Wildlife: tigers and lions, snow leopards, anacondas, animals of the Peninsula", marks: 1, years: [2026, 2025, 2024] },
    { topic: "Environmental issues, and causes of forest degradation, in Brazil and India", marks: 4, years: [2026, 2025, 2024, 2020] },
    { topic: "Deciduous forests of India: why they cover most of India", marks: 3, years: [2025, 2024, 2022] },
    { topic: "Give reasons: vegetation is scarce at high altitudes of the Himalayas", marks: 3, years: [2024] },
  ],
  mistakes: [
    {
      title: "Tigers and lions in Brazil",
      body: "Wrong. **India** is the only country with both tigers and lions. Lion is the odd man out among Brazil's animals.",
    },
    {
      title: "Himalayan forests in Brazil",
      body: "Brazil has no Himalayan (coniferous) forests: it has no high snowy mountains. It is the odd man out among Brazil's forest types.",
    },
    {
      title: "Naming the rainforests",
      body: "Brazil's evergreen rainforests of the Amazon are called **Selvas**, the lungs of the world. They release oxygen; deciduous and thorny forests do not earn that name.",
    },
    {
      title: "Wrong reason for leaf fall",
      body: "Deciduous trees shed leaves in the **dry season** to save water from evaporation, not because of cold. That is why they suit India's 1000 to 2000 mm seasonal rain.",
    },
    {
      title: "Animals in the wrong place",
      body: "Yaks and snow leopards: snowy Himalayas, not the Peninsula. Anacondas: Pantanal swamps. Pink dolphins: Brazil's rivers. One-horned rhino: Assam.",
    },
  ],
};

export default sheet;
