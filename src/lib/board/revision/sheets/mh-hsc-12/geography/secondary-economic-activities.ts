import type { RevisionSheet } from "@/lib/board/revision/types";

/**
 * MH HSC 12 Geography, Ch. 5 Secondary Economic Activities. Definitions and
 * classifications in the Balbharati text's own wording; most-asked years from
 * the board past-paper questions in the bank, 2024-2026.
 */
const sheet: RevisionSheet = {
  examSlug: "mh-hsc-12",
  subjectName: "Geography",
  subjectRoute: "geography",
  chapterName: "Secondary Economic Activities",
  chapterSlug: "secondary-economic-activities",
  source: "Balbharati Geography Std XII (Maharashtra State Board), Chapter 5",
  keyPoints: [
    {
      term: "Secondary activities",
      text: "Secondary activities add value to natural resources by transforming raw materials (the products of primary activities) into valuable products. They include **manufacturing, processing and construction** (infrastructure) industries. The place where this conversion takes place is called a **factory**.",
    },
    {
      term: "Weight-losing and weight-gaining industries",
      text: "**Weight-losing:** raw materials are bulky but the product is lighter (sugar from sugarcane), so they are located near the raw material. **Weight-gaining:** raw materials are lighter but the product is heavier and bulky (cake from a bakery), so they are located near the market.",
    },
    {
      term: "Economic distance",
      text: "The cost of transportation and the time required to carry goods. Low cost of transportation is the key factor in the location of industries; it is high for heavy, bulky, perishable raw materials and long distances.",
    },
    {
      term: "Footloose industries",
      text: "A footloose industry does not have a strong locational preference, because its resources, production skills and consumers can be found in numerous places, so it may relocate anytime. Inputs and output are lightweight: **low volume, high value**. Examples: watch-making, diamond cutting, hairpins, honey processing.",
    },
    {
      term: "Economies of scale (agglomeration)",
      text: "Available facilities attract industries to a region, and with time the region attracts more, so industries concentrate (agglomerate) there. Mutually complementary industries grow together: iron and steel brings utensils, automobile parts, locomotives. New industries earn more profit for low investment.",
    },
    {
      term: "Special Economic Zones (SEZs)",
      text: "Specially earmarked geographical zones developed for industrial production by the private sector, the public sector or a public-private partnership (PPP), mainly to boost export-quality production. Example: SEEPZ near Santa Cruz.",
    },
    {
      term: "Industrial region",
      text: "Pockets with a high concentration of industries due to favourable geo-economic conditions, where manufacturing employs a large share of the working population. Features: agglomeration of industries, dense population and large labour force, large banking and credit facilities, a large transport network, excellent communication.",
    },
    {
      term: "Uneven distribution of industries",
      text: "Industries are unevenly distributed because the factors affecting industrial location are **not the same everywhere**. They concentrate in a few pockets with favourable factors, mostly in the Northern Hemisphere and along coasts.",
    },
    {
      term: "Classification by source of raw material",
      text: "**Agro-based** (sugar, cotton textiles, food processing), **marine-based** (fish oil, sea-shell objects), **forest-based** (paper, timber, resins, gums, turpentine), **mineral-based** (petrochemicals, iron and steel, aluminium), **pastoral-based** (hide, bone, horn, leather shoes, dairy, wool, silk).",
    },
    {
      term: "Classification by capital investment",
      text: "**Large-scale:** over ₹10 crore (iron and steel, power, cotton textiles). In plant and machinery, **medium:** over ₹5 crore up to ₹10 crore (cycle, TV, radio); **small:** over ₹25 lakh up to ₹5 crore (bottles, toys, papers); **micro:** up to ₹25 lakh (pens, dairy products).",
    },
    {
      term: "Cottage or household industry",
      text: "The most basic type of manufacturing: manual production using locally available raw materials at a very small scale or at home, for local markets. Little capital and transport cost; needs good skills. Potters, weavers, blacksmiths, carpenters. Some products are exported: Paithani sarees, Indian quilts.",
    },
    {
      term: "Classification by nature of output",
      text: "**Basic or heavy:** produce material used by other industries (iron and steel). **Consumer goods or light:** goods ready for direct consumption (watches, electronics, textile mills, pharmaceuticals). **Ancillary:** parts and components for heavy articles like trucks and tractors (nails, tyres, iron sheets).",
    },
    {
      term: "Classification by ownership",
      text: "**Public sector:** owned by the State (BHEL). **Private sector:** owned by an individual or partners (TISCO). **Joint sector:** government and individuals together (MNGL). **Co-operative:** members pool resources and share profit and loss (AMUL). **MNCs:** operations in more than one country (Hindustan Lever, ONGC).",
    },
  ],
  formulas: [],
  derivations: [
    {
      title: "Explain the factors affecting the location of industries",
      steps: [
        "Physical: climate (harsh climate hinders; humid coast suited cotton thread), raw material (perishable, bulky ones near source), water and power (coal-based near mines).",
        "Physical: labour (skilled or semi-skilled, labour colonies near large industries), transportation (low economic distance), site (flat land, now rural areas like Chakan, Lote Parshuram).",
        "Economic: proximity to market (perishable, heavy or bulky products) and capital (banking and finance, as in Mumbai, Kolkata, Chennai, Delhi).",
        "Political: government policies (incentives, subsidised land and water, tax concessions in backward regions) and SEZs.",
        "Other: split location (parts made in different places and assembled at one) and economies of scale or agglomeration.",
      ],
    },
    {
      title: "Give reasons: sugar mills are near the raw material, bakeries near the market",
      steps: [
        "Sugarcane loses weight and sugar content as time after harvest increases, so it must reach a nearby factory fast: sugar is weight-losing and located near the cane fields.",
        "A cake is heavier than its raw materials, and transport cost rises with weight, so a bakery (weight-gaining) is located near the market, in cities.",
      ],
    },
    {
      title: "Give reasons: fruit processing in Ratnagiri and Sindhudurg; iron and steel near Dhanbad",
      steps: [
        "Fruits are perishable and must be processed soon, so processing units sit where the fruit is grown (Konkan mangoes and cashew; also Mahabaleshwar, Nagpur).",
        "Iron and steel uses heavy, bulky iron ore and coal; carrying them is costly, so the industry is located in the mineral-rich area near the mines (Dhanbad, Chhota Nagpur).",
      ],
    },
    {
      title: "Give reasons: distribution of industries is uneven",
      steps: [
        "Location factors (climate, raw material, water, power, labour, transport, market, capital, government policy) are not the same everywhere.",
        "Industries concentrate in the few pockets where these are favourable, forming industrial regions; harsh, remote or sparsely peopled areas have few industries.",
      ],
    },
    {
      title: "Why industrial growth is limited in central Australia and South America",
      steps: [
        "Central Australia: hot, dry desert climate, scarce water, sparse population (little labour and market), poor transport and far from ports; industries lie on the coasts (eastern part, Perth).",
        "South America: harsh interior relief, climate and dense forest, poor transport, small markets and limited capital; industry is confined to coastal regions of Argentina, Brazil, Venezuela, Chile.",
      ],
    },
    {
      title: "Differentiate between large-scale and cottage industries",
      steps: [
        "Large-scale: huge capital (over ₹10 crore), machinery and infrastructure; large output for wide markets; e.g. iron and steel, power, cotton textiles.",
        "Cottage: little capital, manual production at home with local raw material by skilled craftspersons; for local markets; e.g. pottery, weaving, Paithani sarees.",
      ],
    },
    {
      title: "Differentiate between public sector and private sector industries",
      steps: [
        "Public: owned by the State; government makes all investments and markets goods through its agencies; e.g. BHEL.",
        "Private: owned by an individual or partnership, who makes the investment and keeps the profit; e.g. TISCO.",
      ],
    },
    {
      title: "Differentiate between heavy (basic) and light (consumer goods) industries",
      steps: [
        "Heavy or basic: produce material used by other industries; large raw materials and capital; e.g. iron and steel makes steel for automobiles and machinery.",
        "Light or consumer goods: produce goods ready for direct consumption; e.g. watches, electronic goods, textiles, pharmaceuticals.",
      ],
    },
  ],
  diagrams: [
    {
      title: "World map: major industrial regions (Fig. 5.3; exercise Q. 7)",
      labels: [
        "Ruhr industrial region (Germany)",
        "Japan: Tokyo-Yokohama or Osaka-Kobe-Kyoto",
        "South Africa: Witwatersrand or Kimberley",
        "Australia: Perth (west) or the eastern part",
        "Industrial region near the Great Lakes (USA)",
        "a suitable index (key)",
      ],
    },
    {
      title: "Types of industries (Fig. 5.7)",
      labels: [
        "capital investment: cottage, micro, small, medium, large",
        "ownership: private, public, joint, co-operative, MNC",
        "raw material: agro, pastoral, marine, mineral, forest",
        "nature of output: basic, consumer, ancillary",
      ],
    },
  ],
  mostAsked: [
    { topic: "Major industrial regions of the world: name and locate them (USA, Great Lakes, Japan, South Africa, Australia)", years: [2026, 2025, 2024] },
    { topic: "Factors affecting location of industries, with reasons (sugar, bakery, fruit processing, iron and steel) and footloose industries", years: [2026, 2025, 2024] },
    { topic: "Classification by capital investment: arrange by investment, cottage and large-scale industries", years: [2026, 2025, 2024] },
    { topic: "Classification by source of raw material: agro, mineral, pastoral-based", years: [2026, 2025, 2024] },
    { topic: "Give reasons: distribution of industries is uneven (India's industries concentrated in a few regions)", years: [2026, 2025, 2024] },
    { topic: "Classification by ownership: public, private, joint, co-operative sectors", years: [2026, 2025, 2024] },
    { topic: "Classification by nature of output: heavy and light industries, consumer goods", years: [2026, 2024] },
    { topic: "Give reasons: limited industrial growth in South America and central Australia", years: [2025, 2024] },
  ],
  mistakes: [
    {
      title: "Putting the bakery near the raw material",
      body: "A bakery is weight-gaining: its product is heavier than its inputs, so it is located near the market. Sugar is weight-losing and goes near the cane. The board sets \"Bakery industries are not located near the markets\" to be corrected.",
    },
    {
      title: "Calling a heavy industry footloose",
      body: "Footloose industries have light, high-value inputs and outputs: diamond cutting, watch or clock making, hairpins. Cement is not footloose; it is tied to its bulky raw material.",
    },
    {
      title: "Mixing up the classifications",
      body: "Ancillary is a type by output, not by ownership. Woollen textiles are pastoral-based, not mineral-based. BHEL is public sector, TISCO private, AMUL co-operative, MNGL joint.",
    },
    {
      title: "Getting the order of capital investment backwards",
      body: "Large > medium > small > micro (cottage lowest). Read whether the question asks ascending or descending before you write.",
    },
    {
      title: "Wrong reason for cotton mills in Mumbai",
      body: "Humid climate stopped cotton thread from breaking before artificial humidifiers. \"Industries need water\" is true but does not explain it.",
    },
  ],
};

export default sheet;
