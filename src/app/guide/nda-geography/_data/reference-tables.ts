/**
 * Content for /guide/nda-geography/reference-tables.
 *
 * Geography-specific subject artefact — the analogue of nda-english's
 * /vocab-families, nda-physics's /formulas, nda-chemistry's /common-compounds,
 * and nda-biology's /reference-tables. A single-page index of the ~70
 * named-fact PAIRS NDA Geography actually tests.
 *
 * Structurally similar to Biology's /reference-tables: Geography's named
 * facts span MULTIPLE domains (rivers, peaks, minerals, crops, winds), so
 * the page is organised as multi-domain clusters, each with its own column
 * headers. Uses the SAME BiologyReferenceTables renderer (multi-domain
 * support; per-cluster column headers).
 *
 * Why themed clusters (not alphabetical flat list): matches the bank's
 * subtopic structure (Indian Rivers, Mountain Peaks, Mineral & Crop
 * Producer States, Local Winds + Climate Zones), and active-recall is
 * easier when related named facts are co-located.
 *
 * Each entry: the entity (river/peak/mineral/crop/wind), the paired
 * fact (state/range/producer/region), optionally the playbook it most
 * often appears in (so a reader can drill that chapter's bank q), and an
 * optional trap-note for the highest-leverage distractor.
 *
 * Curation rule: every entry has appeared in the 2017–2026 NDA Geography
 * bank at least once OR is a high-leverage NCERT-grade fact a candidate
 * needs cold. Editorial curation; not exhaustive.
 */

export type ReferenceEntry = {
  /** Stable kebab-case identifier. */
  id: string;
  /** The 'left column' value — the entity being asked about. */
  name: string;
  /** The 'middle column' value — the paired fact. */
  fact: string;
  /** One-line context / use / note. */
  context: string;
  /** Optional playbook slug — links to deep-dive. */
  playbookSlug?: string;
  /** Optional note for traps / clarification. */
  notes?: string;
};

export type ReferenceCluster = {
  /** Cluster theme. */
  theme: string;
  /** Sub-eyebrow shown below theme. */
  blurb: string;
  /** Column headers for the 3-column table. */
  columns: { name: string; fact: string; context: string };
  entries: ReferenceEntry[];
};

export const REFERENCE_CLUSTERS: ReferenceCluster[] = [
  {
    theme: "Indian Rivers & Tributaries",
    blurb:
      "River↔state↔tributary pairs appear in every paper. Himalayan rivers (perennial, glacier-fed) vs peninsular rivers (seasonal, rain-fed). Drill against the /playbooks/indian-geography-physical deep-dive.",
    columns: {
      name: "River",
      fact: "States / Source",
      context: "Tributaries + outflow",
    },
    entries: [
      {
        id: "indus",
        name: "Indus",
        fact: "Source: Mansarovar Lake (Tibet) · India (J&K) → Pakistan",
        context: "Tributaries (5 of Punjab): Jhelum + Chenab + Ravi + Beas + Sutlej · Outflow: Arabian Sea",
        playbookSlug: "indian-geography-physical",
        notes: "Indus Waters Treaty 1960 — India gets E rivers (Ravi, Beas, Sutlej); Pakistan gets W (Indus, Jhelum, Chenab).",
      },
      {
        id: "ganga",
        name: "Ganga",
        fact: "Source: Gangotri Glacier (Uttarakhand) · India → Bangladesh",
        context: "Tributaries: Yamuna, Ghaghara, Gandak, Kosi, Son · Outflow: Bay of Bengal (Sundarbans delta)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "yamuna",
        name: "Yamuna",
        fact: "Source: Yamunotri (Uttarakhand) · Tributary of Ganga at Allahabad/Prayagraj",
        context: "Tributaries: Chambal, Betwa, Ken (all peninsular, from Vindhyas)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "brahmaputra",
        name: "Brahmaputra",
        fact: "Source: Mansarovar (Tibet, as Tsangpo) · Arunachal → Assam → Bangladesh",
        context: "Tributaries: Lohit, Dibang, Subansiri, Manas · Joins Ganga in Bangladesh → Bay of Bengal",
        playbookSlug: "indian-geography-physical",
        notes: "Called Siang/Dihang in Arunachal, Brahmaputra in Assam, Jamuna in Bangladesh.",
      },
      {
        id: "mahanadi",
        name: "Mahanadi",
        fact: "Source: Sihawa Hills (Chhattisgarh) · CG → Odisha",
        context: "Hirakud Dam (largest earthen dam in India) · Outflow: Bay of Bengal (Paradip delta)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "godavari",
        name: "Godavari",
        fact: "Source: Triambakeshwar (Maharashtra) · MH → Telangana → Andhra Pradesh",
        context: "Longest peninsular river ('Dakshin Ganga') · Tributaries: Pranhita, Indravati, Manjira · Bay of Bengal delta",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "krishna",
        name: "Krishna",
        fact: "Source: Mahabaleshwar (Maharashtra) · MH → Karnataka → Andhra Pradesh",
        context: "Tributaries: Bhima, Tungabhadra, Koyna · Outflow: Bay of Bengal (Andhra delta)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "kaveri",
        name: "Kaveri",
        fact: "Source: Talakaveri, Brahmagiri Hills (Karnataka) · KA → Tamil Nadu",
        context: "Sacred 'Dakshin Ganga' of S India · Outflow: Bay of Bengal (Tanjavur delta) · Cauvery Water Disputes",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "narmada",
        name: "Narmada",
        fact: "Source: Amarkantak (Madhya Pradesh) · MP → Gujarat",
        context: "WEST-flowing rift-valley river · Forms ESTUARY (no delta) into Arabian Sea · Sardar Sarovar Dam",
        playbookSlug: "indian-geography-physical",
        notes: "Narmada and Tapi are the ONLY major west-flowing peninsular rivers; both form estuaries, not deltas.",
      },
      {
        id: "tapi",
        name: "Tapi (Tapti)",
        fact: "Source: Multai (Madhya Pradesh) · MP → Maharashtra → Gujarat",
        context: "WEST-flowing rift-valley river · Forms estuary into Arabian Sea (Gulf of Khambhat)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "chambal",
        name: "Chambal",
        fact: "Source: Janapao Hills (MP) · MP → Rajasthan → UP",
        context: "Tributary of YAMUNA · Famous for badlands ravines · Gandhi Sagar + Rana Pratap Sagar dams",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "luni",
        name: "Luni",
        fact: "Source: Pushkar (Rajasthan) · Rajasthan only",
        context: "Only river of Thar desert · Inland drainage — disappears in Rann of Kutch (does NOT reach sea)",
        playbookSlug: "indian-geography-physical",
        notes: "Inland-drainage river — endorheic, doesn't reach ocean.",
      },
      {
        id: "chilika",
        name: "Chilika Lake",
        fact: "Odisha · Brackish lagoon on east coast",
        context: "LARGEST coastal lagoon in India · Largest brackish-water lake · Ramsar site",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "wular",
        name: "Wular Lake",
        fact: "J&K · Freshwater lake fed by Jhelum",
        context: "LARGEST freshwater lake in India · Glacial origin",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "sambhar",
        name: "Sambhar Lake",
        fact: "Rajasthan · Inland salt lake",
        context: "Largest inland salt lake in India · India's largest source of natural salt",
        playbookSlug: "indian-geography-physical",
      },
    ],
  },
  {
    theme: "Indian Mountain Peaks & Ranges",
    blurb:
      "Peak↔range↔state and Himalayan-pass identifications appear every paper. Greater Himalayas, Pir Panjal, Karakoram, peninsular ghats. Drill against /playbooks/indian-geography-physical (densest-HARD: Mountains subtopic 43% HARD).",
    columns: {
      name: "Peak / Pass",
      fact: "Range",
      context: "State + elevation + note",
    },
    entries: [
      {
        id: "kanchenjunga",
        name: "Kanchenjunga",
        fact: "Greater Himalayas (Himadri)",
        context: "Sikkim · 8586 m · India's HIGHEST peak (K2 in PoK technically not in India)",
        playbookSlug: "indian-geography-physical",
        notes: "India's highest peak. Kanchenjunga = 3rd-highest in world.",
      },
      {
        id: "nanda-devi",
        name: "Nanda Devi",
        fact: "Greater Himalayas",
        context: "Uttarakhand · 7816 m · India's 2nd-highest peak (entirely in India)",
        playbookSlug: "indian-geography-physical",
        notes: "Highest peak ENTIRELY within India (Kanchenjunga is India-Nepal border).",
      },
      {
        id: "anamudi",
        name: "Anamudi",
        fact: "Western Ghats",
        context: "Kerala · 2695 m · Highest peak in PENINSULAR India + Western Ghats",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "mahendragiri",
        name: "Mahendragiri",
        fact: "Eastern Ghats",
        context: "Odisha (Gajapati district) · 1501 m · Highest peak of EASTERN GHATS",
        playbookSlug: "indian-geography-physical",
        notes: "Eastern Ghats highest = ODISHA (NOT Tamil Nadu — TN has a separate 1647m peak in W Ghats also called Mahendragiri).",
      },
      {
        id: "guru-shikhar",
        name: "Guru Shikhar",
        fact: "Aravalli Range",
        context: "Rajasthan (Mt. Abu) · 1722 m · Highest peak of Aravalli (oldest fold mountain in India)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "zoji-la",
        name: "Zoji La (pass)",
        fact: "Zanskar Range",
        context: "J&K · Connects Srinagar–Leh · 3528 m",
        playbookSlug: "indian-geography-physical",
        notes: "Zoji La is in ZANSKAR range (NOT Pir Panjal — that's Banihal).",
      },
      {
        id: "khardung-la",
        name: "Khardung La (pass)",
        fact: "Ladakh Range",
        context: "Ladakh · World's HIGHEST motorable pass · 5359 m · Leh–Nubra Valley",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "rohtang",
        name: "Rohtang (pass)",
        fact: "Pir Panjal Range",
        context: "Himachal Pradesh · 3978 m · Manali–Leh route (Atal Tunnel bypass since 2020)",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "nathu-la",
        name: "Nathu La (pass)",
        fact: "Dongkya Range",
        context: "Sikkim · India–China border pass · Major Indo-China trade route",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "banihal",
        name: "Banihal (pass)",
        fact: "Pir Panjal Range",
        context: "J&K · Jammu–Srinagar route · 2832 m · Jawahar Tunnel bypass",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "sela-pass",
        name: "Sela Pass",
        fact: "Eastern Himalayas",
        context: "Arunachal Pradesh · 4170 m · Gateway to Tawang",
        playbookSlug: "indian-geography-physical",
      },
      {
        id: "western-ghats",
        name: "Western Ghats",
        fact: "Continuous range, W coast",
        context: "Gujarat → Tamil Nadu · Length 1600 km · UNESCO World Heritage biodiversity hotspot · Anamudi highest",
        playbookSlug: "indian-geography-physical",
        notes: "Western Ghats = CONTINUOUS; Eastern Ghats = DISCONTINUOUS (broken by rivers).",
      },
      {
        id: "vindhyas",
        name: "Vindhya Range",
        fact: "Central India (divides N + S India)",
        context: "Madhya Pradesh + nearby states · Block + fold mountains · Old + eroded",
        playbookSlug: "indian-geography-physical",
      },
    ],
  },
  {
    theme: "Mineral & Crop Producer States",
    blurb:
      "Mineral↔leading state and crop↔leading-state pairs are the dominant Indian Geography Economy recall lever (81 q chapter, 24% HARD). Drill against /playbooks/indian-geography-economy.",
    columns: {
      name: "Mineral / Crop",
      fact: "Leading producer state(s)",
      context: "Use / region note",
    },
    entries: [
      {
        id: "iron-ore",
        name: "Iron Ore",
        fact: "Odisha (#1), Karnataka, Jharkhand, Chhattisgarh",
        context: "Hematite + Magnetite · Used in steel · Bailadila + Bellary mines",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "coal",
        name: "Coal",
        fact: "Jharkhand (#1), Odisha, Chhattisgarh, West Bengal",
        context: "Jharia + Bokaro (Jharkhand), Talcher (Odisha), Raniganj (WB) · Thermal power + steel",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "bauxite",
        name: "Bauxite",
        fact: "Odisha (#1), Gujarat, Jharkhand, Maharashtra",
        context: "Aluminium ore · Konkan coast + Eastern Ghats deposits",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "copper",
        name: "Copper",
        fact: "Rajasthan (#1 — Khetri), Jharkhand (Singhbhum)",
        context: "Used in electrical wiring · India is import-dependent",
        playbookSlug: "indian-geography-economy",
        notes: "Copper is in Rajasthan + Jharkhand (NOT Karnataka — that's iron + gold).",
      },
      {
        id: "uranium",
        name: "Uranium",
        fact: "Jharkhand (Jaduguda mine — only commercial)",
        context: "Nuclear fuel · India also explores in AP, Karnataka, Meghalaya",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "gold",
        name: "Gold",
        fact: "Karnataka (Kolar — closed; Hutti — active)",
        context: "India is world's largest gold consumer (imports most)",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "mica",
        name: "Mica",
        fact: "Jharkhand (#1 — Koderma), Rajasthan, Andhra Pradesh",
        context: "Electrical insulation · India was world's largest producer historically",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "petroleum",
        name: "Petroleum",
        fact: "Mumbai High (offshore #1), Gujarat (Ankleshwar), Assam (Digboi), KG basin (Andhra)",
        context: "India is import-dependent (~85% of crude) · ONGC + OIL + Reliance",
        playbookSlug: "indian-geography-economy",
        notes: "Gujarat oil fields: Ankleshwar + Kalol + Cambay + Navagam (NOT Bombay High — that's offshore Maharashtra).",
      },
      {
        id: "rice",
        name: "Rice",
        fact: "West Bengal (#1), Punjab, UP, Andhra Pradesh, Bihar",
        context: "Kharif crop · Needs warm + humid + clay-loam soil",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "wheat",
        name: "Wheat",
        fact: "Uttar Pradesh (#1), Punjab, Madhya Pradesh, Haryana",
        context: "RABI crop · Needs cool + alluvial soil",
        playbookSlug: "indian-geography-economy",
        notes: "Wheat is RABI (sown Oct, harvested Apr) — NOT kharif.",
      },
      {
        id: "cotton",
        name: "Cotton",
        fact: "Gujarat (#1), Maharashtra, Telangana, Karnataka",
        context: "Kharif cash crop · Needs BLACK/REGUR soil (moisture-retaining) + 200 frost-free days",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "sugarcane",
        name: "Sugarcane",
        fact: "Uttar Pradesh (#1), Maharashtra, Karnataka, Tamil Nadu",
        context: "Long-duration crop (12+ months) · Source of sugar + ethanol · Needs hot + humid",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "tea",
        name: "Tea",
        fact: "Assam (#1), West Bengal (Darjeeling), Tamil Nadu (Nilgiris)",
        context: "Plantation crop · Needs heavy rainfall + slopes + cool",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "coffee",
        name: "Coffee",
        fact: "Karnataka (#1, ~70% of India), Kerala, Tamil Nadu",
        context: "Plantation crop · Western Ghats Coorg + Chikmagalur districts",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "jute",
        name: "Jute",
        fact: "West Bengal (#1), Bihar, Assam, Odisha",
        context: "Kharif fibre crop · 'Golden fibre' · Hooghly basin",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "groundnut",
        name: "Groundnut",
        fact: "Gujarat (#1), Andhra Pradesh, Karnataka, Tamil Nadu",
        context: "Kharif oilseed · Needs sandy loam + warm",
        playbookSlug: "indian-geography-economy",
      },
      {
        id: "spices",
        name: "Spices (esp. pepper, cardamom)",
        fact: "Kerala (#1 for pepper + cardamom), Karnataka, Tamil Nadu",
        context: "Pepper = 'king of spices' · Western Ghats spice gardens",
        playbookSlug: "indian-geography-economy",
      },
    ],
  },
  {
    theme: "Local Winds & Climate Zones",
    blurb:
      "Local-wind name↔region↔character pairs (Loo, Kalbaisakhi, Chinook, Foehn, Mistral, Sirocco) + Koeppen climate zone identifications. Drill against /playbooks/climatology-atmosphere-weather.",
    columns: {
      name: "Wind / Zone",
      fact: "Region",
      context: "Character + note",
    },
    entries: [
      {
        id: "loo",
        name: "Loo",
        fact: "North India (May–June)",
        context: "Hot dry NW summer wind · Causes heat-stroke · 'Loo lagi'",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "kalbaisakhi",
        name: "Kalbaisakhi",
        fact: "West Bengal, Assam, Bangladesh",
        context: "Pre-monsoon thunderstorms · Local name 'Norwester'",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "chinook",
        name: "Chinook",
        fact: "Rocky Mountains lee side (USA + Canada)",
        context: "WARM DRY downslope wind · Called 'snow eater' (melts feet of snow in hours)",
        playbookSlug: "climatology-atmosphere-weather",
        notes: "Chinook is WARM (NOT cold). Warm-dry downslope = Chinook (Rockies), Foehn (Alps), Berg (S Africa), Santa Ana (California).",
      },
      {
        id: "foehn",
        name: "Foehn",
        fact: "Alps lee side (Switzerland, Austria, Germany)",
        context: "WARM DRY downslope wind · European equivalent of Chinook",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "mistral",
        name: "Mistral",
        fact: "Rhône valley (S France)",
        context: "COLD DRY N wind · Funnels through valley, can damage crops",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "sirocco",
        name: "Sirocco",
        fact: "Sahara → S Europe (Italy, Spain, Greece)",
        context: "HOT DRY DUSTY S wind · Brings Saharan dust to Mediterranean basin",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "harmattan",
        name: "Harmattan",
        fact: "West Africa (Sahel — Nigeria, Ghana)",
        context: "Dry dusty E wind from Sahara · Reduces visibility · Dec–Feb",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "santa-ana",
        name: "Santa Ana",
        fact: "Southern California, USA",
        context: "WARM DRY downslope wind · FIRE-PROMOTING (responsible for wildfires)",
        playbookSlug: "climatology-atmosphere-weather",
        notes: "Santa Ana = fire-promoting wildfire wind in Southern California (2026 EASY NDA PYQ tests this).",
      },
      {
        id: "bora",
        name: "Bora",
        fact: "Adriatic coast (Croatia, Slovenia)",
        context: "COLD DRY downslope wind · Strong winter wind",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "tropical-rainforest-zone",
        name: "Af — Tropical Rainforest",
        fact: "Amazon basin, Congo basin, Indonesia",
        context: "Hot + wet year-round · Most biodiverse biome · Evergreen broadleaf",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "savanna-zone",
        name: "Aw — Tropical Savanna",
        fact: "Sub-Saharan Africa, parts of India + S America + N Australia",
        context: "Tropical grassland + scattered trees · Wet + dry seasons · Lions, elephants",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "mediterranean-zone",
        name: "Csa — Mediterranean",
        fact: "Mediterranean basin, coastal California, central Chile, SW Australia, Cape Town",
        context: "Hot dry summer + mild wet winter · Olives, citrus, grapes",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "monsoon-india-zone",
        name: "Cwa — Subtropical Monsoon",
        fact: "Northern India, S China, parts of SE Asia",
        context: "Hot wet summer + cool dry winter · Rice-wheat agriculture · India's largest climate zone",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "hot-desert-zone",
        name: "BWh — Hot Desert",
        fact: "Sahara, Arabian, Thar (Rajasthan), Atacama",
        context: "Very low rainfall · Extreme temperature range · Sand + rock landscapes",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "tundra-zone",
        name: "ET — Tundra",
        fact: "Northern Canada, Siberia, Greenland, Iceland",
        context: "Treeless · Permafrost subsoil · Lichens + mosses · Short summer",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "trade-winds",
        name: "Trade Winds",
        fact: "30° → 0° (towards equator)",
        context: "NE in N hemisphere, SE in S · Coriolis-deflected · Drove sailing routes historically",
        playbookSlug: "climatology-atmosphere-weather",
      },
      {
        id: "westerlies",
        name: "Westerlies",
        fact: "30° → 60° (towards poles)",
        context: "SW in N hemisphere, NW in S · 'Roaring Forties' in S hemisphere (no land to slow them)",
        playbookSlug: "climatology-atmosphere-weather",
      },
    ],
  },
];

/** Quick stats for the reference-tables hero. */
export const REFERENCE_STATS = {
  facts: REFERENCE_CLUSTERS.reduce((s, c) => s + c.entries.length, 0),
  clusters: REFERENCE_CLUSTERS.length,
};
