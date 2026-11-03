import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Geography, Ch. 3 Human Settlements and Land Use. Definitions in
 * the Balbharati text's own wording; most-asked years from the 38 board
 * past-paper questions in the bank, 2024-2026 (4 on an unseen passage about
 * Greek cities left out: the book does not teach them).
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Human Settlements and Land Use",
  chapterSlug: "human-settlements-and-land-use",
  source: "Balbharati Geography Std XII (Maharashtra State Board), Chapter 3",
  keyPoints: [
    {
      term: "Settlement",
      text: "Man being a **social animal** likes to live in groups. Due to social needs, many people come together at a place and construct houses in a particular way: a settlement. It may range from one house to a city.",
    },
    {
      term: "Factors affecting settlements",
      text: "Physical, cultural and economic factors. Physical factors (relief, altitude, soils, climate, drainage, groundwater level) influence the type and spacing of settlements: in dry regions houses stand along the water source. Security concerns favoured nucleated settlements.",
    },
    {
      term: "Types by spacing between houses",
      text: "Four types: (1) compact, clustered or **nucleated**; (2) semi-clustered or fragmented; (3) **dispersed**; (4) isolated.",
    },
    {
      term: "Type and pattern",
      text: "Type is a category with common features; pattern is the spatial arrangement of settlements within an area. Compact is a **type**; linear is a **pattern** (a linear settlement can be compact or dispersed).",
    },
    {
      term: "Rural and urban settlements",
      text: "Divided on the basis of their **functions**. Rural people are mainly in primary activities; urban settlements are generally compact, larger, and engaged in non-primary activities.",
    },
    {
      term: "Functional classification of towns",
      text: "By the dominant function: administrative, industrial, transport, commercial, mining, cantonment, educational, religious, tourism. A city does not carry out only one function: it takes on more as it grows, one of them the major one.",
    },
    {
      term: "Size of settlements",
      text: "Settlements range from a hamlet to metropolitan cities: hamlet, village, town, city, metropolitan city, megacity. As towns become cities and cities become metro cities, land use, structure and skyline change.",
    },
    {
      term: "Land use",
      text: "Different lands suit different uses. Human beings use land as a resource for economic activities, production, residence and recreation. In rural areas land use revolves around **agriculture**; in urban areas around residential and other economic activities.",
    },
    {
      term: "Land use and land cover",
      text: "**Land cover** is the physical surface covering the land: forest, water, ice, bare rock, sand. **Land use** is the use people put the land to. Land cover can be read from satellite imagery; land use cannot, from imagery alone.",
    },
    {
      term: "Rural land use classes (Land Record Department)",
      text: "Forests; non-agricultural uses; barren and wastelands; permanent pastures; tree crops and groves; culturable wasteland (fallow over 5 years); current fallow (1 year or less); other fallow (1 to 5 years); net area sown.",
    },
    {
      term: "Urban land use",
      text: "Residential, industrial, institutional, recreational, transportation, commercial (clustered at the core in the **CBD**, Central Business District), plot layouts on the periphery (encroaching farmland) and mixed land use.",
    },
    {
      term: "Mixed land use",
      text: "An area where various land uses exist together: residential, commercial and industrial in an integrated manner, with houses, businesses, shops, schools, clinics and open spaces at one place.",
    },
    {
      term: "Rural-urban fringe",
      text: "The area between urban and rural areas, with characteristics of both. Not a separate zone but a transition that merges into both, with mixed rural and urban land use. Growth of the urban span is **urban sprawl**.",
    },
    {
      term: "Suburbs",
      text: "Well-established towns or small cities outside a metro city that grew because of it: Bhandup, Kalyan, Virar for Mumbai; Wakad, Hinjawadi for Pune.",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Patterns of settlements and the factors behind them",
      steps: [
        "**Linear:** along a road, railway, canal or river, in a straight line or the shape of the road or river.",
        "**Rectangular:** parallel straight lines of houses; planned cities take this shape.",
        "**Radial:** grows around a central object or centre, which drives the growth around it.",
        "**Circular:** around a lake; houses closely spaced because of the water.",
        "**Triangular:** at the confluence of two rivers or roads, or along a sea coast; grows on all three sides.",
        "**Patternless:** population grows and houses are built haphazardly, as per convenience and space.",
      ],
    },
    {
      title: "Differentiate between nucleated and dispersed settlement",
      steps: [
        "Nucleated (compact, clustered): houses closely spaced together; in the past, security concerns favoured them.",
        "Dispersed: houses widely spaced, scattered among fields; small and sparsely spaced.",
        "Nucleated settlements are large and closely spaced; dispersed ones are small.",
      ],
    },
    {
      title: "Differentiate between land use and land cover",
      steps: [
        "Land cover: the physical surface covering the land (forest, water, ice, bare rock, sand).",
        "Land use: the use people have put the land to (residential, recreational, agricultural).",
        "One land can have both: land use recreational, land cover forest.",
        "Land cover can be found from satellite images; land use cannot be found from them alone.",
      ],
    },
    {
      title: "Give reasons: in rural settlements, land use is related to agriculture",
      steps: [
        "Most rural people are engaged in primary activities, mainly agriculture.",
        "So most rural land is net sown area, fallow, pasture, groves and forest, classified by the Land Record Department.",
        "Non-agricultural uses (houses, roads, shops) take only a small share.",
      ],
    },
    {
      title: "Give reasons: not all rural settlements change into urban settlements",
      steps: [
        "A settlement becomes urban when most of its workers move to non-primary (secondary and tertiary) activities.",
        "That needs location, transport, industries and services, which many villages lack.",
        "So many villages remain agricultural, primary settlements.",
      ],
    },
    {
      title: "Give reasons: rural-urban fringes have the characteristics of both",
      steps: [
        "The fringe is the transition between urban and rural areas and merges into both.",
        "Farmland may be converted to residential or industrial use while villages remain.",
        "Daily commuters travel from the fringe to offices in the city centre, so land use is mixed.",
      ],
    },
    {
      title: "Problems of urban settlements",
      steps: [
        "Pressure on housing, water supply and transport; lack of housing leads to slums.",
        "Farmland on the periphery turns into plot layouts; land prices rise.",
        "Public facilities suffer; economic inequality and crime may increase.",
        "Environmental problems: pollution and loss of open spaces.",
      ],
    },
  ],
  diagrams: [
    { title: "Linear settlement", labels: ["road, railway, river or canal", "houses in a line along it"] },
    { title: "Radial settlement", labels: ["central object or centre", "roads radiating outwards", "houses along the roads"] },
    { title: "Circular settlement", labels: ["lake at the centre", "houses closely spaced around it"] },
    { title: "Triangular settlement", labels: ["confluence of two rivers or roads", "growth on all three sides"] },
    { title: "Compact and dispersed settlement", labels: ["compact: houses clustered close together", "dispersed: houses scattered among fields", "fields, roads and water source"] },
  ],
  mostAsked: [
    { topic: "Functional classification of cities: administrative and other cities, why cities grow multi-functional", years: [2026, 2025, 2024] },
    { topic: "Land use in rural and urban areas, mixed land use, land use and land cover", years: [2026, 2025, 2024] },
    { topic: "Urban growth: settlements by size, megacity, suburbs, rural-urban fringe, urban problems", years: [2026, 2025, 2024] },
    { topic: "Patterns of settlement: linear, triangular, circular", years: [2026, 2025, 2024] },
    { topic: "Types of settlement: nucleated and dispersed, rural and urban", years: [2026, 2024] },
    { topic: "What a settlement is, and the factors (physical) that affect it", years: [2026, 2025, 2024] },
  ],
  mistakes: [
    {
      title: "Calling a pattern a type",
      body: "Compact, semi-clustered, dispersed and isolated are **types** (spacing of houses). Linear, rectangular, radial, circular, triangular are **patterns** (arrangement).",
    },
    {
      title: "Mixing up radial and circular",
      body: "Radial grows around a central object or centre, with roads radiating out. Circular grows around a **lake**, houses close because of the water.",
    },
    {
      title: "Treating land use and land cover as the same",
      body: "Land cover is what covers the surface (forest, water); land use is what people use it for. A park's land use is recreational, its land cover vegetation.",
    },
    {
      title: "Wrong fallow periods",
      body: "Current fallow: 1 year or less. Other fallow: more than 1 but less than 5 years. Culturable wasteland: uncultivated for more than 5 years.",
    },
    {
      title: "Saying a city has one function",
      body: "Cities carry out more than one function as they grow. So \"cities can have only one function\" is wrong, and \"settlements cannot be classified by function\" is wrong too.",
    },
    {
      title: "Getting the size order wrong",
      body: "Largest to smallest: megacity, metropolitan city, city, suburb. Reverse it when the question asks for ascending order.",
    },
  ],
};

export default sheet;
