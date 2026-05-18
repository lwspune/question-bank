/**
 * Per-playbook deep-dive content for /guide/nda-geography/playbooks/{slug}.
 *
 * Each entry mirrors the chemistry/physics/english/biology shape: trigger
 * (one-line "when to reach for this"), story (2–3 paragraph teacherly
 * explanation), sub-skills (the rules / patterns inside), traps
 * (chapter-specific distractor shapes), worked example UUIDs (2 per
 * playbook, resolved via loadWorkedExamples at request time), and
 * relatedSlugs (cross-links to other playbooks).
 *
 * UUIDs SQL-picked 2026-05-18 against the live 345-q NDA Geography PUBLIC
 * bank — most-recent year first, HARD picked when the chapter has a HARD
 * pool, else MOD/EASY. All 7 chapters have details.
 */

export type PlaybookDetail = {
  /** One-line "when to use" cue. */
  trigger: string;
  /** 2–3 paragraph teacherly explanation. */
  story: string[];
  /** The rules / sub-skills inside this playbook. */
  subSkills: { name: string; description: string }[];
  /** Distractor patterns specific to this playbook. */
  traps: { name: string; description: string }[];
  /** Ordered worked-example UUIDs from the bank. */
  exampleQuestionIds: string[];
  /** Cross-link to 2–3 related playbook slugs. */
  relatedSlugs: string[];
};

export const PLAYBOOK_DETAILS: Record<string, PlaybookDetail> = {
  // ─────────────────────── RECALL ───────────────────────
  "indian-geography-economy": {
    trigger:
      "An agriculture question (kharif vs rabi crop, leading-producer state, soil-crop match), a mineral identification (critical minerals, mining state), an energy-and-industries question (oil fields, iron-steel plants, power-station type), a government-scheme question (RAD/PM-KISAN/PMFBY), or a transport-corridor / port identification.",
    story: [
      "81 q in 10 years — NDA Geography's largest chapter AND densest-HARD recall chapter. Agriculture, Crops, Soils and Land Use is the giant subtopic (36 q · 17% HARD): kharif crops (rice, maize, jowar, bajra, cotton, sugarcane — sown June, harvested October), rabi crops (wheat, barley, mustard, gram, peas — sown October, harvested April), zaid crops (watermelon, cucumber, fodder — short summer season). Leading-producer states: rice (West Bengal), wheat (UP), cotton (Gujarat), sugarcane (UP), groundnut (Gujarat), pulses (MP), tea (Assam), coffee (Karnataka), cashew (Maharashtra). Soils: alluvial (Indo-Gangetic plains, most fertile), black/regur (Deccan trap, cotton-friendly), red (peninsular, iron-rich), laterite (heavy rainfall regions, leached), arid (Rajasthan), saline/alkaline (irrigation-affected), peaty (Kerala).",
      "Minerals and Mining (11 q · 36% HARD) is the chapter's densest HARD pool. Coal (Jharkhand, Odisha, Chhattisgarh, WB), iron ore (Odisha, Jharkhand, Chhattisgarh, Karnataka), bauxite (Odisha, Gujarat), copper (Rajasthan, Jharkhand), mica (Jharkhand, Rajasthan), uranium (Jharkhand — Jaduguda mine), petroleum (Bombay High off Mumbai, Mumbai High onshore Gujarat — Ankleshwar/Kalol/Cambay/Navagam, Assam — Digboi/Naharkatiya, Krishna-Godavari basin onshore Andhra). Critical minerals (recent NDA focus): lithium, cobalt, gallium, germanium, neodymium, dysprosium, tellurium, vanadium — India's import-dependent for most; the 2026 PYQ tests which of these are critical (answer: depends on the option list, but neodymium + dysprosium + gallium are typically listed; tellurium is usually NOT — it's a by-product of copper refining).",
      "Energy and Industries (12 q · 25% HARD) tests power-station identification (thermal vs hydro vs nuclear vs solar) and iron-steel plants (Bhilai-Chhattisgarh, Bokaro-Jharkhand, Durgapur-WB, Rourkela-Odisha — all SAIL). Government Schemes (10 q · 30% HARD) tests scheme purpose: PMFBY (crop insurance), PM-KISAN (income support to farmers), PMKVY (skill development), RAD/Rainfed Area Development (rainfed agriculture support — strategies include integrated farming + watershed development + diversified cropping but NOT large-scale irrigation, which would defeat the 'rainfed' purpose). Transport: Golden Quadrilateral (Delhi-Mumbai-Chennai-Kolkata), N-S Corridor (Srinagar-Kanyakumari), E-W (Silchar-Porbandar). Ports: Mumbai/JNPT (Maharashtra, largest container), Kandla (Gujarat), Chennai (TN), Vishakhapatnam (Andhra), Paradip (Odisha), Kolkata (riverine), Cochin (Kerala), Mangalore (Karnataka), Tuticorin (TN), Mormugao (Goa).",
    ],
    subSkills: [
      {
        name: "Kharif vs rabi crop identification",
        description:
          "Kharif (June–October, monsoon-fed): rice, maize, jowar, bajra, cotton, sugarcane, groundnut, soybean, urad, moong. Rabi (October–April, winter-irrigated): wheat, barley, mustard, gram, peas, lentil. Zaid (March–June, short-summer): watermelon, cucumber, fodder. Cash crops: cotton + sugarcane + jute + tobacco + tea + coffee + spices. Plantation: tea (Assam, WB, Tamil Nadu), coffee (Karnataka, Kerala, TN), rubber (Kerala, TN), spices (Kerala).",
      },
      {
        name: "Soil-type ↔ region ↔ crop matching",
        description:
          "Alluvial (Indo-Gangetic plains, river deltas) — most fertile, rice + wheat + sugarcane. Black/Regur (Deccan trap, Maharashtra, MP, Gujarat) — cotton-friendly (moisture-retaining). Red (peninsular, iron-rich, less fertile) — ragi, groundnut, pulses. Laterite (Western Ghats, Eastern Ghats, NE — heavy rainfall, leached) — tea, coffee, cashew. Arid (Rajasthan) — bajra, jowar. Saline/alkaline (irrigation-affected) — needs reclamation. Peaty (Kerala backwaters) — rice. Mountain (Himalayan) — tea, fruits.",
      },
      {
        name: "Mineral ↔ producer state mapping",
        description:
          "Iron ore: Odisha (largest), Karnataka, Jharkhand, Chhattisgarh. Coal: Jharkhand (Jharia, Bokaro), Odisha (Talcher), Chhattisgarh, WB (Raniganj). Bauxite: Odisha. Copper: Rajasthan (Khetri), Jharkhand (Singhbhum). Mica: Jharkhand (Koderma), Rajasthan, AP. Manganese: Odisha, MP, Maharashtra. Uranium: Jharkhand (Jaduguda). Gold: Karnataka (Kolar — closed; Hutti — active). Diamond: MP (Panna). Petroleum: Mumbai High offshore, Gujarat (Ankleshwar, Cambay), Assam (Digboi), KG basin (Andhra).",
      },
      {
        name: "Government scheme purpose identification",
        description:
          "PMFBY (Pradhan Mantri Fasal Bima Yojana) = crop insurance against yield loss. PM-KISAN = ₹6000/yr direct income support to farmers. PMKVY = skill development. PMAY = housing. PMJDY = financial inclusion / bank accounts. Ayushman Bharat = health insurance. RAD (Rainfed Area Development) = under NMSA umbrella, supports rainfed agriculture via integrated farming systems + watershed management + crop diversification + soil moisture conservation. RAD does NOT include large-scale canal irrigation (that defeats the 'rainfed' purpose).",
      },
    ],
    traps: [
      {
        name: "Mineral ↔ state swap (iron ore in Rajasthan)",
        description:
          "Iron ore is concentrated in Odisha + Karnataka + Jharkhand + Chhattisgarh. Distractor pairs iron ore with Rajasthan (which has copper at Khetri, lead-zinc, and mica — but NOT major iron ore). Other swaps: 'coal in Karnataka' (wrong — coal is in Jharkhand-Odisha-Chhattisgarh-WB; Karnataka has iron + gold), 'uranium in MP' (wrong — Jharkhand Jaduguda; MP has diamond at Panna). Memorise leading-producer-state-per-mineral tables, not just 'rich in minerals' generic facts.",
      },
      {
        name: "Crop ↔ kharif/rabi season swap",
        description:
          "Wheat is RABI (sown Oct, harvested Apr) NOT kharif. Rice is KHARIF (sown Jun monsoon) NOT rabi (except summer rice in some regions). Distractor swaps the season for headline crops. Memorise: kharif = monsoon-fed (rice, cotton, sugarcane, maize, bajra, jowar); rabi = winter-irrigated (wheat, barley, mustard, gram, peas). Cotton and sugarcane span longer than one season but are CLASSIFIED kharif (sowing time).",
      },
      {
        name: "Critical minerals — over-inclusion trap",
        description:
          "Critical minerals (Ministry of Mines list 2023): lithium, cobalt, gallium, germanium, indium, niobium, tantalum, tungsten, neodymium, dysprosium, terbium, yttrium, vanadium, beryllium, others. Distractor includes a NON-critical mineral (tellurium is debated, often listed but the 2026 PYQ excluded it; aluminium/iron/copper are NOT critical — abundant). Read each option independently against the official 30-mineral list.",
      },
      {
        name: "RAD includes large-scale irrigation",
        description:
          "RAD (Rainfed Area Development) is specifically designed for RAINFED agriculture — areas without irrigation. Its strategies: integrated farming systems (crop + livestock + horticulture + agroforestry), watershed development, soil + water conservation, crop diversification, water-harvesting structures. RAD does NOT include large-scale canal irrigation (that converts rainfed to irrigated, defeating the scheme's premise). The 2026 PYQ tests exactly this — large-scale irrigation is NOT an RAD strategy.",
      },
    ],
    exampleQuestionIds: [
      "283104b6-728a-4649-af3a-33befcd9b807", // HARD 2026 — Critical minerals NOT
      "2138b509-21e2-43a5-a91c-261ef2e08370", // MOD 2026 — RAD scheme strategy NOT
    ],
    relatedSlugs: [
      "indian-geography-physical",
      "world-and-human-geography",
      "earths-structure-landforms",
    ],
  },

  "indian-geography-physical": {
    trigger:
      "A river ↔ state question, a mountain peak ↔ range identification, a Himalayan-pass question, a soil-type question, a forest-type or biodiversity-hotspot question, or an Indian-state ↔ island ↔ border question.",
    story: [
      "67 q in 10 years, 15% HARD. The named-fact recall workhorse for Indian physiography. Forests and Natural Vegetation of India (34 q · 12% HARD) is the chapter's giant subtopic — biodiversity hotspots (Himalaya, Western Ghats, Indo-Burma, Sundaland include Nicobar), forest classification (tropical evergreen — Western Ghats, NE; tropical deciduous = monsoon forests — most of India; tropical thorn — Rajasthan-Gujarat; montane = Himalayan oak/deodar/pine; tidal/mangrove — Sundarbans), key wildlife sanctuaries (Kaziranga = Assam, one-horned rhino; Gir = Gujarat, Asiatic lion; Ranthambore = Rajasthan, tiger; Periyar = Kerala, elephant).",
      "Indian Rivers, Lakes and Water Bodies (15 q · 13% HARD) tests river↔state pairs and tributary identification. Himalayan rivers (perennial, glacier-fed): Indus system (Indus + Jhelum + Chenab + Ravi + Beas + Sutlej — flows Pakistan; partitioned via Indus Waters Treaty 1960), Ganga system (Ganga + Yamuna + Chambal/Betwa/Ken to Yamuna + Ghaghara + Gandak + Kosi from Nepal), Brahmaputra system (Tibet → Arunachal as Siang/Dihang → Assam → joins Ganga in Bangladesh → Bay of Bengal). Peninsular rivers (seasonal, rain-fed): east-flowing into Bay of Bengal (Mahanadi, Godavari, Krishna, Kaveri) form deltas; west-flowing into Arabian Sea (Narmada, Tapi — flow through rift valleys, no delta — estuaries instead). Lakes: Chilika (Odisha, largest brackish), Wular (J&K, largest freshwater), Sambhar (Rajasthan, salt), Dal (J&K), Loktak (Manipur).",
      "Mountains, Plateaus and Plains of India (7 q · 43% HARD) is the chapter's densest HARD subtopic — Himalayan passes ↔ ranges ↔ states. Greater Himalayas (Himadri): Mount Everest (Nepal-China), Kanchenjunga (India-Nepal border, India's highest at 8586m in Sikkim), Nanda Devi (Uttarakhand 7816m). Passes: Zoji La (J&K, connects Srinagar-Leh; in Zanskar range), Banihal (J&K, Pir Panjal), Khardung La (Ladakh, world's highest motorable), Nathu La (Sikkim, India-China), Bomdi La / Sela / Bumla (Arunachal), Tuju (Manipur). Peninsular: Eastern Ghats (discontinuous, Mahendragiri 1501m in Odisha is highest; Anaimalai/Cardamom in S), Western Ghats (continuous, Anamudi 2695m in Kerala is highest peak; also a UNESCO World Heritage biodiversity hotspot). Plateaus: Deccan (largest), Malwa, Chhota Nagpur (Jharkhand, mineral-rich), Meghalaya. Plains: Indo-Gangetic plains (most fertile), Brahmaputra plain, coastal plains.",
    ],
    subSkills: [
      {
        name: "Himalayan vs peninsular river distinction",
        description:
          "Himalayan rivers: PERENNIAL (snow + rain fed), originate beyond/within Greater Himalayas, form deep gorges + meanders + ox-bow lakes in plains, form deltas. Examples: Indus, Ganga, Brahmaputra + tributaries. Peninsular rivers: SEASONAL (rain-fed only), older + smaller, flow in fixed channels, form deltas (east-flowing) OR estuaries (west-flowing through rift valleys — Narmada + Tapi only). Examples: Mahanadi, Godavari, Krishna, Kaveri (east-flowing); Narmada, Tapi, Mahi, Sabarmati (west-flowing).",
      },
      {
        name: "Himalayan pass ↔ range ↔ state",
        description:
          "Zoji La (J&K) → Zanskar range, Srinagar-Leh route. Banihal (J&K) → Pir Panjal, Jammu-Srinagar. Khardung La (Ladakh) → Ladakh range, highest motorable. Rohtang (HP) → Pir Panjal, Manali-Leh. Nathu La (Sikkim) → Dongkya, India-China trade route. Jelep La (Sikkim). Bomdi La / Sela / Bumla / Diphu (Arunachal) → Eastern Himalayas, India-China. Tuju (Manipur), Imphal/Behdienkhlam (NE).",
      },
      {
        name: "Forest type ↔ region matching",
        description:
          "Tropical evergreen: Western Ghats, NE India, Andamans — rainfall >200 cm, no leafless season. Tropical deciduous (monsoon): most of India — rainfall 70–200 cm, leafless in dry season — sal, teak, sandalwood. Tropical thorn: NW (Rajasthan, Gujarat) — rainfall <70 cm — babul, kikar, acacia. Montane: Himalayas — oak (lower), pine + deodar + fir (higher). Tidal/mangrove: Sundarbans (WB), Bhitarkanika (Odisha), Pichavaram (TN) — Sundari trees in WB.",
      },
      {
        name: "Wildlife sanctuary ↔ state ↔ flagship species",
        description:
          "Kaziranga (Assam) — one-horned rhino, UNESCO. Manas (Assam) — rhino, tiger. Gir (Gujarat) — Asiatic lion (ONLY home in wild). Ranthambore (Rajasthan) — tiger. Sariska (Rajasthan) — tiger. Periyar (Kerala) — elephant + tiger. Bandipur (Karnataka) — elephant + tiger. Sundarbans (WB) — Royal Bengal tiger + mangrove. Jim Corbett (Uttarakhand) — first national park 1936, tiger. Nanda Devi + Valley of Flowers (Uttarakhand) — UNESCO. Great Himalayan (HP) — UNESCO.",
      },
    ],
    traps: [
      {
        name: "Mahendragiri location swap (Odisha not TN)",
        description:
          "Mahendragiri (1501m) is the highest peak of the EASTERN GHATS, located in ODISHA (Gajapati district near AP border). Distractor places it in Tamil Nadu (which has TN's Mahendragiri Hill near Kanyakumari but THAT'S a separate 1647m peak in the Western Ghats; the question is about Eastern Ghats highest). The 2025 PYQ tests this — Mahendragiri Eastern Ghats highest = Odisha. Read the question for 'Eastern Ghats' qualifier.",
      },
      {
        name: "Himalayan pass ↔ wrong-range pairing",
        description:
          "Zoji La is in ZANSKAR range (NOT Pir Panjal — that's Banihal). Khardung La is in LADAKH range (NOT Karakoram). Rohtang is in PIR PANJAL (NOT Greater Himalayas). Nathu La is in DONGKYA (NOT Greater Himalayas). The 2024 PYQ tests pass↔range pairs — pair-swap is the dominant distractor. Memorise the pass-range-state triple together, not separately.",
      },
      {
        name: "West-flowing peninsular river forms delta",
        description:
          "West-flowing peninsular rivers (Narmada, Tapi) flow through RIFT VALLEYS and form ESTUARIES, NOT deltas. East-flowing peninsular rivers (Mahanadi, Godavari, Krishna, Kaveri) DO form deltas. Distractor says 'Narmada forms a delta at Arabian Sea' — wrong, it's an estuary. The rift-valley channel doesn't slow down enough for sediment deposition to form a delta.",
      },
      {
        name: "Anamudi vs Kanchenjunga highest-peak confusion",
        description:
          "Anamudi (2695m, Kerala) is the highest peak of WESTERN GHATS / PENINSULAR India. Kanchenjunga (8586m, Sikkim) is India's highest peak overall AND highest of the Greater Himalayas. K2 (8611m) is HIGHER than Kanchenjunga but K2 is in PAKISTAN-administered Kashmir (POK), so technically not in India. Distractor swaps Anamudi for 'highest in India' or lists K2 as India's highest.",
      },
    ],
    exampleQuestionIds: [
      "3e1970b4-8534-4cb7-8aa2-616d58b4ee21", // HARD 2024 — Himalayan passes-ranges pairs
      "098d3dbe-0996-4a0c-97f5-37c19e5baa1e", // EASY 2025 — Mahendragiri Eastern Ghats highest
    ],
    relatedSlugs: [
      "indian-geography-economy",
      "earths-structure-landforms",
      "world-and-human-geography",
    ],
  },

  "world-and-human-geography": {
    trigger:
      "A world-river or canal question (Suez/Panama/Helmand identification), a landlocked-water-body or sea identification, a world-coordinates question (latitude of a major city), or a megacity / population question.",
    story: [
      "25 q in 10 years, 8% HARD — the lightest %HARD chapter in NDA Geography. Human Geography — Megacities and Population (15 q · 0% HARD) is pure recall: megacity definition (10M+ urban agglomeration), India's megacities (Mumbai, Delhi, Kolkata, Chennai, Bangalore, Hyderabad — top 6). World megacities by population: Tokyo, Delhi, Shanghai, São Paulo, Mexico City, Cairo, Mumbai, Beijing, Dhaka, Osaka, NYC, Karachi, Buenos Aires, Istanbul. Population basics: India's population ~140 crore (2026), world ~810 crore, India will overtake China. Population density: Bihar (highest among states), Arunachal (lowest), Delhi (highest UT). Sex ratio: Kerala (best at 1084), Haryana (worst). Literacy: Kerala (best ~94%), Bihar (lowest).",
      "World — Rivers, Canals and Water Bodies (6 q · 33% HARD) is the chapter's HARD pocket. Major world rivers: Nile (longest, 6650 km, Africa, flows N from Lake Victoria through Sudan-Egypt to Mediterranean), Amazon (largest by discharge volume, S America, 6400 km), Yangtze (longest in Asia, China), Mississippi-Missouri (N America), Yenisei + Ob + Lena (Siberian, flow N to Arctic Ocean), Volga (longest in Europe, Russia, flows to Caspian Sea — landlocked), Danube (flows E through 10 countries to Black Sea), Helmand (originates Hindu Kush in Afghanistan, flows SW into Hamoun wetlands at Iran border — endorheic basin, doesn't reach ocean). Canals: Suez (Egypt, 1869, Med↔Red Sea, no locks — sea-level), Panama (Panama, 1914, Atlantic↔Pacific, has locks because Pacific higher), Kiel (Germany, North Sea↔Baltic). Landlocked water bodies: Caspian Sea (largest lake/sea, between Europe + Asia), Aral Sea (Central Asia, shrunken), Dead Sea (Israel-Jordan, hypersaline, lowest land elevation), Lake Baikal (Russia, deepest + oldest freshwater lake), Great Salt Lake (Utah).",
      "World — Coordinates, Time and Place (4 q) tests world-city longitude/latitude basics and special-location identification. Equator passes through Ecuador, Colombia, Brazil, Gabon, DRC, Uganda, Kenya, Somalia, Indonesia (Sumatra, Borneo via Kalimantan, Sulawesi). Tropic of Cancer passes through India (8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, WB, Tripura, Mizoram). Prime Meridian (0°) passes through UK, France, Spain, Algeria, Mali, Burkina Faso, Togo, Ghana. International Date Line (180° with deviations) — cross westbound = ADD a day, eastbound = SUBTRACT.",
    ],
    subSkills: [
      {
        name: "World river ↔ continent ↔ outflow",
        description:
          "Nile: longest river overall (6650 km), Africa, flows N to Mediterranean. Amazon: largest by discharge volume, S America, flows E to Atlantic. Yangtze: longest in Asia, China, flows E to East China Sea. Volga: longest in Europe, Russia, flows S to CASPIAN SEA (landlocked, endorheic). Mississippi: N America, flows S to Gulf of Mexico. Danube: flows E through 10 countries to Black Sea. Rhine: W Europe to North Sea. Helmand: Hindu Kush → Hamoun wetlands at Iran-Afghanistan border (endorheic).",
      },
      {
        name: "Canal ↔ country ↔ connects",
        description:
          "Suez Canal (Egypt, 1869) — Mediterranean ↔ Red Sea. Sea-level, NO locks. Shortest sea route Europe↔Asia. Nationalised 1956. Panama Canal (Panama, 1914) — Atlantic ↔ Pacific. Has LOCKS (Pacific is higher). US-built, returned to Panama 1999. Kiel Canal (Germany) — North Sea ↔ Baltic. Erie Canal (US) — Lake Erie ↔ Hudson River.",
      },
      {
        name: "Landlocked water body identification",
        description:
          "Caspian Sea — largest landlocked water body (technically the world's largest lake, also called sea due to salinity). Bordered by Russia, Kazakhstan, Turkmenistan, Iran, Azerbaijan. Aral Sea — Central Asia, shrunken due to Soviet irrigation. Dead Sea — between Israel, Jordan, Palestine; hypersaline (8x ocean salinity); lowest land elevation on Earth (-430m). Lake Baikal — Siberia; deepest (1642m), oldest, holds ~20% of world's surface freshwater. Lake Victoria — Africa's largest lake, source of White Nile.",
      },
      {
        name: "Equator / Tropic of Cancer passage countries",
        description:
          "Equator (0° latitude) passes through 13 countries: Ecuador, Colombia, Brazil (S America); São Tomé, Gabon, Republic of Congo, DRC, Uganda, Kenya, Somalia (Africa); Indonesia (Asia — across Sumatra, Borneo, Sulawesi); Maldives (just touches). Tropic of Cancer (23.5° N) passes through Mexico, Cuba, Bahamas, Western Sahara, Mauritania, Mali, Algeria, Niger, Libya, Chad, Egypt, Saudi Arabia, UAE, Oman, India (8 states), Bangladesh, Myanmar, China, Taiwan.",
      },
    ],
    traps: [
      {
        name: "Suez has locks (it doesn't)",
        description:
          "Suez Canal is SEA-LEVEL — no locks needed because Mediterranean and Red Sea are at the same elevation. Panama Canal has LOCKS because the Pacific side is higher than the Atlantic side, requiring vessel-lifting. Distractor labels Suez as 'lock-equipped' or Panama as 'sea-level'. Mnemonic: SueZ has Zero locks; Panama has lots (it's a multi-stage water-lift).",
      },
      {
        name: "Helmand flows to Arabian Sea",
        description:
          "Helmand originates in Hindu Kush (Afghanistan) and flows SW into HAMOUN WETLANDS at the Iran-Afghanistan border. It's an ENDORHEIC river — it doesn't reach any ocean. Distractor says Helmand flows to Arabian Sea (wrong — Afghanistan is landlocked; Helmand drains internally into a closed basin). The 2023 HARD PYQ tests exactly this — 'this river originates in Hindu Kush and flows into Hamoun wetlands' = Helmand.",
      },
      {
        name: "Caspian is a sea (not a lake)",
        description:
          "Caspian Sea is technically the WORLD'S LARGEST LAKE — it's landlocked (no outflow to any ocean). It's called a 'sea' due to its salinity (1/3 of ocean salinity) and size. Distractor labels it as 'connected to Black Sea' or 'sea like the Mediterranean' (wrong — it's endorheic). Other landlocked: Aral Sea, Dead Sea, Lake Baikal, Lake Eyre.",
      },
      {
        name: "Equator passes through Sahara",
        description:
          "Equator does NOT pass through Sahara desert — Sahara is north of equator (entirely in N hemisphere, latitude ~15°N to 30°N). Equator passes through tropical rainforest belt (Amazon, Congo, Indonesia). Distractor lists Sahara or North African countries as equator-crossing. Memorise the 13 equator countries — most are tropical, not desert.",
      },
    ],
    exampleQuestionIds: [
      "81af52a9-d67a-473e-a49a-14553de810cb", // HARD 2023 — Helmand river statements
      "6b6626a4-ef0f-4f31-a98b-ad2682098412", // EASY 2024 — landlocked water body
    ],
    relatedSlugs: [
      "indian-geography-physical",
      "oceanography",
      "earth-in-space-maps",
    ],
  },

  // ─────────────────────── APPLY ───────────────────────
  "climatology-atmosphere-weather": {
    trigger:
      "An atmospheric-layer question (troposphere/stratosphere identification, ozone layer, aurora region), a cyclone question (tropical vs extratropical, eye-wall, Coriolis effects), a humidity/cloud/rainfall question, a Koeppen climate-zone identification, a pressure-belt or trade-wind question, or a temperature-inversion / solar-geometry question.",
    story: [
      "57 q in 10 years, 28% HARD — the densest-HARD chapter in NDA Geography. Atmospheric Layers (14 q · 21% HARD): troposphere (0–12 km, weather happens here, temperature DECREASES with altitude at ~6.5°C/km lapse rate, contains 75% of atmospheric mass + nearly all water vapour), stratosphere (12–50 km, OZONE LAYER 20–30 km, temperature INCREASES with altitude due to ozone absorbing UV — that's why ozone destruction matters), mesosphere (50–80 km, coldest layer, meteors burn here), thermosphere (80–600 km, temperature INCREASES again to 2000°C, AURORAS occur here at 100–300 km, ionosphere overlaps), exosphere (600+ km, satellites orbit). Auroras: Aurora Borealis (N hemisphere, near magnetic N pole), Aurora Australis (S hemisphere). Caused by solar-wind charged particles interacting with magnetic-field-trapped gases.",
      "Cyclones, Fronts and Local Winds (14 q · 29% HARD) tests cyclogenesis. TROPICAL cyclones: form 5°–30° latitude (NOT at equator — Coriolis ≈ 0 there can't initiate spin), need warm ocean ≥27°C + moist air, NO fronts (uniform tropical air mass), winds rotate counterclockwise N hemisphere (clockwise S), have an EYE (calm center, low pressure ~900 hPa). Named regionally: hurricane (Atlantic/E Pacific), typhoon (NW Pacific), cyclone (Indian Ocean), willy-willy (Australia). EXTRATROPICAL cyclones: mid + high latitudes (30°–60°), driven by fronts (cold + warm air masses), much larger area than tropical, no warm core, no distinct eye, driven by jet streams + temperature gradients. The 2026 NDA-1 PYQ tests this distinction. Local winds: Loo (hot dry NW summer wind in N India), Kalbaisakhi (pre-monsoon thunderstorms in WB+Assam), Chinook (warm dry wind down lee side of Rockies, melts snow → 'snow eater'), Foehn (Alpine equivalent of Chinook), Mistral (cold N wind down Rhône valley in France), Sirocco (hot dry wind from Sahara → S Europe), Harmattan (dry dust-laden wind W Africa), Santa Ana (warm dry wind in California, FIRE-PROMOTING — the 2026 PYQ tests this).",
      "Atmospheric Pressure + Winds (6 q · 50% HARD) is small but the densest-HARD subtopic. Pressure belts (at sea level, idealised): equatorial low (0°, intertropical convergence zone, rising air, rain belt); subtropical high (30°, descending air from Hadley cell, world's deserts), sub-polar low (60°, rising air at polar front, frontal storms), polar high (90°, descending cold air). Planetary winds: trade winds (30° → 0°, NE in N hemisphere, SE in S — Coriolis-deflected from high to low pressure); westerlies (30° → 60°, SW in N, NW in S); polar easterlies (90° → 60°). Jet streams: polar jet (~60°, between cold polar air + warm mid-latitude air), subtropical jet (~30°). Climate Classification (8 q · 38% HARD): Koeppen system uses temperature + precipitation. Major groups — A (tropical, no winter, all months >18°C), B (arid + semi-arid, evaporation > precipitation), C (temperate, mild winter), D (continental, cold winter), E (polar, all months <10°C). Sub-categories: Af (tropical rainforest), Aw (savanna), BWh (hot desert — Sahara), BSh (hot steppe), Cfa (humid subtropical — SE USA, NE China), Csa (Mediterranean — coast California, Med basin), Dfb (humid continental), ET (tundra), EF (ice cap).",
    ],
    subSkills: [
      {
        name: "Atmospheric-layer altitude + lapse-rate identification",
        description:
          "Troposphere (0–12 km, lapse rate 6.5°C/km — temp DECREASES with altitude, weather here). Stratosphere (12–50 km, temp INCREASES with altitude due to ozone absorbing UV, ozone layer 20–30 km, smooth flight here). Mesosphere (50–80 km, temp decreases again, coldest layer, meteors burn here). Thermosphere (80–600 km, temp INCREASES to 2000°C, ionosphere + auroras 100–300 km). Exosphere (600+ km, satellites). Tropopause = troposphere-stratosphere boundary.",
      },
      {
        name: "Tropical vs extratropical cyclone distinction",
        description:
          "TROPICAL: 5°–30° latitude (not at equator), warm ocean ≥27°C, moist air, NO fronts, has EYE (calm low-pressure center), winds rotate CCW (N) / CW (S), regionally named hurricane/typhoon/cyclone/willy-willy. EXTRATROPICAL: 30°–60° latitude (mid + high), driven by FRONTS (cold + warm air masses), larger area, NO warm core, NO distinct eye, jet-stream-driven, baroclinic.",
      },
      {
        name: "Local wind ↔ region ↔ character matching",
        description:
          "Loo (N India, hot dry NW summer). Kalbaisakhi (WB-Assam, pre-monsoon thunderstorms). Chinook (Rockies leeward, warm dry, 'snow eater'). Foehn (Alps leeward, warm dry). Mistral (Rhône valley France, cold N). Sirocco (Sahara → S Europe, hot dry dust-laden). Harmattan (Sahel W Africa, dry dust). Santa Ana (S California, warm dry, fire-promoting). Bora (Adriatic, cold downslope). Berg (S Africa, hot dry).",
      },
      {
        name: "Pressure-belt + trade-wind mechanism",
        description:
          "Pressure belts: equatorial low (0°), subtropical high (30°), sub-polar low (60°), polar high (90°). Wind flows high→low pressure but Coriolis deflects: trade winds (30°→0°) blow NE in N, SE in S. Westerlies (30°→60°) blow SW in N, NW in S. Polar easterlies (90°→60°). Jet streams: polar jet at ~60°, subtropical at ~30°, narrow fast westerly winds in upper troposphere.",
      },
      {
        name: "Koeppen climate-zone identification",
        description:
          "A (tropical, all months >18°C) — Af rainforest, Am monsoon, Aw savanna. B (arid, evaporation > precipitation) — BWh hot desert (Sahara), BWk cold desert, BSh hot steppe, BSk cold steppe. C (temperate, mild winter) — Cfa humid subtropical, Csa Mediterranean, Cwa subtropical-monsoon (N India). D (continental, cold winter) — Dfa/Dfb humid continental, Dfc subarctic. E (polar) — ET tundra, EF ice cap. India: Cwa N, Aw central, BSh-BWh NW, Am Western Ghats.",
      },
    ],
    traps: [
      {
        name: "Temperature inversion = normal lapse rate",
        description:
          "Normal lapse rate: temperature DECREASES with altitude in troposphere (~6.5°C/km). INVERSION: temperature INCREASES with altitude (opposite). Happens on winter nights (radiation cooling at surface), in valleys (cold air pools), and ahead of warm fronts. Causes fog, smog, poor air quality (pollutants trapped). The 2026 HARD PYQ tests inversion statements. Distractor calls inversion 'the normal lapse rate' or claims it doesn't form on winter nights.",
      },
      {
        name: "Tropical cyclones form at equator",
        description:
          "Tropical cyclones do NOT form within ~5° of equator because Coriolis force ≈ 0 there, can't initiate the spin that creates a cyclonic system. They form 5°–30° latitude where warm ocean (≥27°C) + sufficient Coriolis coexist. Distractor says 'cyclones form at the equator' (wrong) or 'cyclones form anywhere over warm water' (wrong — needs Coriolis too). This is why hurricanes/typhoons start in tropical seas BUT not directly on equator.",
      },
      {
        name: "Ozone layer in troposphere",
        description:
          "Ozone layer is in STRATOSPHERE (20–30 km altitude), NOT troposphere. Tropospheric ozone is a POLLUTANT (component of smog, harms lungs). Stratospheric ozone PROTECTS Earth by absorbing UV-B and UV-C. Distractor places ozone in troposphere or mesosphere. The lapse-rate clue: stratospheric ozone absorbs UV → heats the stratosphere → temperature INCREASES with altitude there.",
      },
      {
        name: "Chinook is a cold wind",
        description:
          "Chinook is a WARM DRY wind blowing down the LEE (eastern) side of the Rocky Mountains. Called 'snow eater' because it can melt feet of snow in hours via temperature rises of 20–30°C. Distractor labels it cold (confusing with Mistral or Bora). Mnemonic: warm-dry downslope winds = Chinook (Rockies), Foehn (Alps), Berg (S Africa), Santa Ana (California). Cold downslope = Bora (Adriatic), Mistral (Rhône).",
      },
    ],
    exampleQuestionIds: [
      "524ed115-e3e5-467e-9944-29325caa20bc", // HARD 2026 — Temperature inversion statements
      "6a7b496a-77c1-49b3-bc04-6c4d251e1997", // MOD 2026 — Extratropical cyclones statements
    ],
    relatedSlugs: [
      "earths-structure-landforms",
      "oceanography",
      "earth-in-space-maps",
    ],
  },

  "earths-structure-landforms": {
    trigger:
      "A plate-tectonics or earthquake question (plate-boundary type, seismic-wave behaviour), a rock-type identification (igneous/sedimentary/metamorphic), a landform question (folding/faulting/erosion features), a weathering-process question (mechanical vs chemical vs biological), or a soil/volcano question.",
    story: [
      "74 q in 10 years, 20% HARD. The Apply strand workhorse for solid-earth geography — every subtopic requires tracing a process, not just naming a feature. Earth's Interior, Crust and Plate Tectonics (18 q · 28% HARD) is the chapter's densest HARD subtopic. Earth's layers: inner core (solid iron-nickel, 5100–6371 km depth, ~5500°C), outer core (LIQUID iron-nickel, 2900–5100 km, generates magnetic field via geodynamo), mantle (silicate rocks, 30–2900 km; upper mantle includes asthenosphere = partial melt, drives convection currents that move plates), crust (5–10 km oceanic = basalt-dense; 30–70 km continental = granite-light). Discontinuities: Moho (crust-mantle), Gutenberg (mantle-outer core), Lehmann (outer-inner core). Plate boundaries: CONVERGENT (collide — oceanic-continental = subduction + volcanic arc + deep trenches, e.g. Andes; continental-continental = mountain folding, e.g. Himalayas; oceanic-oceanic = island arcs, e.g. Japan), DIVERGENT (separate — mid-oceanic ridges = seafloor spreading, e.g. Mid-Atlantic Ridge), TRANSFORM (slide past — strike-slip faults, e.g. San Andreas California).",
      "Landforms and Mass Movements (15 q · 13% HARD) tests landform genesis. Fold mountains (Himalayas, Andes, Alps, Rockies) — formed by compression at convergent boundaries; block mountains (Sierra Nevada, Vosges, Black Forest) — formed by faulting; volcanic mountains (Mauna Loa Hawaii, Mount Fuji, Mount Vesuvius) — formed by magma eruption; residual mountains (Aravalli — among oldest in world) — what's left after erosion. Plateaus: intermontane (Tibet, Bolivian) — between mountain ranges; piedmont (Patagonia) — at mountain base; volcanic (Deccan, Columbia) — lava flows. Erosion features by agent: river — V-shaped valleys, waterfalls, ox-bow lakes, deltas; glacier — U-shaped valleys, cirques, moraines, fjords; wind — yardangs, sand dunes, mushroom rocks; sea — sea cliffs, sea caves, stacks, beaches; underground water — caves, sinkholes, stalactites, stalagmites. Mass movements: landslides, avalanches, rockfalls, mudflows, soil creep.",
      "Rocks, Minerals and Geological Time (14 q · 29% HARD): Igneous rocks form from COOLED MAGMA — intrusive/plutonic (cooled SLOWLY underground → coarse-grained → granite, gabbro), extrusive/volcanic (cooled FAST at surface → fine-grained → basalt, rhyolite, obsidian, pumice). Sedimentary rocks form from compacted sediments — mechanically formed (sandstone, shale, conglomerate), CHEMICALLY formed (chert, halite/rock salt, gypsum), organically formed (limestone, coal, chalk). The 2025 HARD PYQ tests sedimentary classification — chert is chemically formed (silica precipitates), shale is mechanical. Metamorphic rocks form from heat/pressure transformation: limestone → MARBLE, sandstone → QUARTZITE, shale → SLATE → schist → gneiss, granite → gneiss, basalt → schist, coal → anthracite. The 2026 EASY PYQ tests quartzite genesis — metamorphosed from sandstone. Rock cycle: igneous ↔ sedimentary ↔ metamorphic. Earthquakes and Seismic Waves (8 q · 37% HARD): P-waves (Primary, longitudinal/compressional, fastest at 5–8 km/s, travel through solid + liquid + gas — through everything); S-waves (Secondary, transverse/shear, ~3–4 km/s, CAN'T travel through liquid — that's how we know outer core is liquid because S-waves don't pass through it); L-waves (surface, slowest, most destructive, travel along Earth's surface). Magnitude: Richter (logarithmic, each unit = 10× amplitude), Moment Magnitude (modern). Volcanoes: shield (low slope, basaltic, effusive — Hawaii), composite/stratovolcano (steep, andesitic, EXPLOSIVE eruptions with pyroclastic flows — Fuji, Vesuvius), cinder cone (small, mafic). The 2026 MOD PYQ tests composite volcanoes — explosive + pyroclastic + steep.",
    ],
    subSkills: [
      {
        name: "Earth's interior layer + composition",
        description:
          "Inner core: solid iron-nickel (5100–6371 km, 5500°C, density 13). Outer core: LIQUID iron-nickel (2900–5100 km, generates magnetic field via geodynamo). Mantle: silicate rocks (30–2900 km); asthenosphere = upper mantle partial-melt (drives plate convection). Crust: oceanic basalt-dense (5–10 km, 3.0 g/cm³); continental granite-light (30–70 km, 2.7 g/cm³). Discontinuities: Moho (crust-mantle), Gutenberg (mantle-outer core), Lehmann (outer-inner core).",
      },
      {
        name: "Plate boundary type → resulting feature",
        description:
          "Convergent oceanic-continental → SUBDUCTION + volcanic arc + deep trench + earthquakes (Andes, Cascades). Convergent continental-continental → MOUNTAIN FOLDING + earthquakes (Himalayas, Alps). Convergent oceanic-oceanic → ISLAND ARC + trench (Japan, Aleutians, Mariana). Divergent → MID-OCEANIC RIDGE + seafloor spreading + volcanic activity (Mid-Atlantic Ridge, East Pacific Rise). Transform → STRIKE-SLIP FAULT + shallow earthquakes (San Andreas, Anatolian).",
      },
      {
        name: "Rock-type identification by formation process",
        description:
          "IGNEOUS: cooled magma. Intrusive (slow, deep, coarse) = granite, gabbro. Extrusive (fast, surface, fine) = basalt, rhyolite, obsidian, pumice. SEDIMENTARY: compacted sediments. Mechanical = sandstone, shale, conglomerate. Chemical = chert, halite/rock salt, gypsum. Organic = limestone, coal, chalk. METAMORPHIC: heat/pressure. Limestone → marble. Sandstone → quartzite. Shale → slate → schist → gneiss. Granite → gneiss. Basalt → schist. Coal → anthracite.",
      },
      {
        name: "Seismic-wave behaviour + Earth-interior inference",
        description:
          "P-waves: Primary, longitudinal/compressional, fastest (5–8 km/s), travel through solid + liquid + gas. S-waves: Secondary, transverse/shear (3–4 km/s), CAN'T travel through liquid — that's why S-wave SHADOW ZONE behind outer core tells us outer core is LIQUID. L-waves: surface (Love + Rayleigh), slowest, most destructive (cause building damage). Magnitude: Richter scale logarithmic (each unit = 10× amplitude, 32× energy). Modern: Moment Magnitude scale.",
      },
      {
        name: "Volcano type + eruption character",
        description:
          "Shield volcano: low slope, basaltic lava, EFFUSIVE eruptions (smooth, low silica, runny lava), Hawaii (Mauna Loa, Mauna Kea), Iceland. Composite/stratovolcano: steep, andesitic lava, EXPLOSIVE eruptions, pyroclastic flows + ash columns, Mount Fuji, Mount Vesuvius, Krakatoa, Mount St. Helens. Cinder cone: small, mafic, fragmented ejecta. Caldera: collapsed magma chamber, very large (Yellowstone, Toba).",
      },
    ],
    traps: [
      {
        name: "S-waves travel through liquid",
        description:
          "S-waves CAN'T travel through liquid (transverse waves need shear strength, which liquids lack). Distractor says S-waves travel through outer core or all Earth's layers. The S-wave SHADOW ZONE (104°–140° from epicenter) is the direct evidence that outer core is liquid. P-waves travel through everything (solid + liquid + gas), but slow down through liquid. Memorise: P = Pass through everything; S = Stops at liquid.",
      },
      {
        name: "Marble is sedimentary (or limestone is metamorphic)",
        description:
          "Marble is METAMORPHIC (formed from limestone under heat/pressure). Limestone is SEDIMENTARY (organically formed, mostly calcium carbonate from marine organism shells). Distractor swaps the categories. Other swap-prone pairs: quartzite (metamorphic, FROM sandstone-sedimentary), slate (metamorphic, FROM shale-sedimentary), gneiss (metamorphic, FROM granite-igneous OR shale path).",
      },
      {
        name: "Convergent boundaries always form mountains",
        description:
          "Convergent boundaries can form mountains (continental-continental → Himalayas) OR subduction zones with volcanic arcs (oceanic-continental → Andes) OR island arcs (oceanic-oceanic → Japan). The outcome depends on the type of crust colliding. Distractor says 'all convergent boundaries form mountain ranges' — wrong, oceanic-oceanic forms island arcs + trenches, not large mountain ranges.",
      },
      {
        name: "Chert is mechanically formed",
        description:
          "Chert is a CHEMICALLY formed sedimentary rock — silica (SiO₂) precipitates out of solution to form chert, flint, jasper. Distractor labels chert as mechanically formed. Mechanical sedimentary rocks: sandstone, shale, conglomerate, breccia (compacted from rock fragments). Chemical: chert, halite, gypsum, dolomite. Organic: limestone, coal, chalk. The 2025 HARD PYQ tests this exact distinction.",
      },
    ],
    exampleQuestionIds: [
      "2604a840-a988-4bee-a47c-75d78baa9cd1", // HARD 2025 — Sedimentary rock pairs
      "62cc35e6-7c3b-4175-b7c4-8a3cbf06492a", // MOD 2026 — Composite volcanoes
    ],
    relatedSlugs: [
      "climatology-atmosphere-weather",
      "indian-geography-physical",
      "oceanography",
    ],
  },

  // ─────────────────────── VERIFY ───────────────────────
  "earth-in-space-maps": {
    trigger:
      "An Earth-rotation/revolution/seasons question, a latitude/longitude or geographical-grid question, a planet identification (terrestrial vs Jovian), a time-zone or IDL arithmetic question, or a map/GPS question.",
    story: [
      "22 q in 10 years, 18% HARD. Verify strand because multi-statement evaluation dominates ('consider the following statements about terrestrial planets', 'arrange these zones in latitudinal extent'). Earth's Shape, Rotation and Motion (7 q · 14% HARD): Earth is an OBLATE SPHEROID (flattened at poles, bulging at equator due to rotation). Equatorial radius 6378 km, polar 6357 km. Rotation period: 23h 56m 4s (sidereal) ≈ 24 hr (solar). Revolution period: 365.25 days. Axial tilt: 23.5° from orbital plane normal — this causes SEASONS. June solstice (Cancer 23.5°N) = N summer / S winter; December solstice (Capricorn 23.5°S) = N winter / S summer; March + September equinoxes = day = night everywhere.",
      "Latitude, Longitude and Geographical Grid (6 q · 0% HARD) — guaranteed marks pocket. Latitude: 0°–90° N or S, parallels to equator. Special: equator (0°), Tropic of Cancer (23.5°N), Tropic of Capricorn (23.5°S), Arctic Circle (66.5°N), Antarctic Circle (66.5°S). Longitude: 0°–180° E or W, meridians from pole to pole. Special: Prime Meridian (0°, Greenwich), International Date Line (180°). 1° of latitude ≈ 111 km (constant, since parallels are perpendicular to axis). 1° of longitude ≈ 111 km × cos(latitude) — VARIES, max at equator (111 km), zero at poles. The 2025 MOD PYQ tests latitudinal-extent ranking — equatorial > mid-latitude > polar.",
      "Planets and Solar System (4 q · 50% HARD) — chapter's HARD pocket. TERRESTRIAL planets (Mercury, Venus, Earth, Mars): small + dense + rocky + few/no moons + close to Sun + thin atmosphere. JOVIAN/gas-giant planets (Jupiter, Saturn, Uranus, Neptune): large + low-density + gaseous + MANY moons + far from Sun + thick atmosphere with rings. The 2026 HARD PYQ tests terrestrial vs Jovian distinction via multi-statement evaluation — distractor claims terrestrial have low density (wrong, terrestrial are DENSE; Jovian are LOW density). Time Zones and International Date Line (3 q · 33% HARD): IST = UTC + 5:30 (82.5°E meridian — passes through Mirzapur UP, also AP + Odisha + Chhattisgarh + MP — five states). Each 15° of longitude = 1 hour. East = AHEAD (more solar time), West = BEHIND. London = UTC + 0. So if it's 12 noon in Delhi (UTC+5:30), in London (UTC+0) it's 12 - 5:30 = 06:30 AM. The 2023 EASY PYQ tests this. IDL = 180° meridian with deviations (around island groups + Bering Strait). Westbound IDL crossing = ADD a day (Mon → Tue); Eastbound = SUBTRACT (Mon → Sun).",
    ],
    subSkills: [
      {
        name: "Earth's shape + rotation + revolution",
        description:
          "Shape: oblate spheroid (flattened at poles, bulging equator). Equatorial radius 6378 km; polar 6357 km (21 km difference). Rotation: 23h 56m 4s sidereal (24h solar = how we set clocks). Revolution: 365.25 days around Sun → leap years every 4 except century-non-400 (1900 not leap; 2000 was). Axial tilt 23.5° → causes seasons. Earth's orbit is elliptical (eccentricity 0.017, nearly circular).",
      },
      {
        name: "Solstice + equinox positions",
        description:
          "June 21 solstice: Sun overhead at Tropic of Cancer (23.5°N) — N hemisphere summer, longest day; S hemisphere winter, shortest day. December 22 solstice: Sun overhead at Tropic of Capricorn (23.5°S) — N winter, S summer. March 21 + September 23 equinoxes: Sun overhead at EQUATOR — day = night everywhere (12 hr each).",
      },
      {
        name: "Latitude/longitude arithmetic + special lines",
        description:
          "Latitude: 0° (equator) to 90° (poles). Tropic of Cancer (23.5°N), Tropic of Capricorn (23.5°S), Arctic Circle (66.5°N), Antarctic Circle (66.5°S). Longitude: 0° (Prime Meridian, Greenwich) to 180° (IDL). 1° latitude ≈ 111 km (constant). 1° longitude ≈ 111 km × cos(lat) — max at equator (111 km), zero at poles. IST = 82.5°E meridian (through Mirzapur UP).",
      },
      {
        name: "Terrestrial vs Jovian planet distinction",
        description:
          "TERRESTRIAL (Mercury, Venus, Earth, Mars): SMALL (Earth = 12742 km diameter), HIGH density (3.9–5.5 g/cm³), ROCKY surface, FEW/NO moons (Mercury 0, Venus 0, Earth 1, Mars 2 small), thin atmosphere, close to Sun. JOVIAN (Jupiter, Saturn, Uranus, Neptune): LARGE (Jupiter 142984 km), LOW density (0.7–1.6 g/cm³), GASEOUS, MANY moons (Jupiter 95+, Saturn 145+), thick atmosphere, RINGS (all four have rings, Saturn's most prominent), far from Sun.",
      },
      {
        name: "Time zone + IDL arithmetic",
        description:
          "Each 15° longitude = 1 hour. East = AHEAD of UTC, West = BEHIND. IST = UTC+5:30 (82.5°E). London/Lisbon = UTC+0. NYC = UTC-5. Tokyo = UTC+9. Sydney = UTC+10/11 (DST). IDL = 180° with deviations. Westbound crossing = ADD a day. Eastbound = SUBTRACT. Example: leave Tokyo Mon 9PM → arrive LA Mon 4PM (eastbound, subtract a day from gain).",
      },
    ],
    traps: [
      {
        name: "Terrestrial planets have many moons",
        description:
          "Terrestrial planets have FEW/NO moons (Mercury 0, Venus 0, Earth 1, Mars 2). Jovian (gas giant) planets have MANY moons (Jupiter 95+, Saturn 145+, Uranus 27, Neptune 14). Distractor lists 'many moons' as a terrestrial-planet feature. The 2026 HARD PYQ tests this multi-statement shape. Other swap-prone traits: terrestrial = HIGH density (Jovian = LOW); terrestrial = ROCKY (Jovian = GASEOUS); terrestrial = no rings (Jovian = ALL FOUR have rings).",
      },
      {
        name: "IST = UTC+5",
        description:
          "IST = UTC + 5:30 (NOT +5). Indian Standard Time is set to 82.5°E meridian, which equals 82.5° × 4 min/° = 330 min = 5h 30m ahead of UTC. Distractor says IST is UTC+5 or +6. Other half-hour offsets: IST (+5:30), Iran (+3:30), Afghanistan (+4:30), Myanmar (+6:30), Newfoundland (-3:30). India does NOT observe DST (daylight saving).",
      },
      {
        name: "1° longitude is always 111 km",
        description:
          "1° of LATITUDE ≈ 111 km (constant — parallels are perpendicular to Earth's axis, equidistant). 1° of LONGITUDE ≈ 111 km × cos(latitude) — VARIES with latitude. At equator = 111 km, at 60° latitude ≈ 55 km, at poles = 0 (meridians converge). Distractor says 1° longitude is constant 111 km. Practical implication: latitudinal extent of a 1° zone is much larger at equator than at high latitudes.",
      },
      {
        name: "Earth is a perfect sphere",
        description:
          "Earth is an OBLATE SPHEROID — flattened at poles, bulging at equator. Equatorial radius 6378 km; polar 6357 km (21 km difference; flattening 1/298). The bulge is caused by Earth's rotation (centrifugal effect at equator). Distractor says 'Earth is a perfect sphere'. More precise model = GEOID (mean-sea-level surface, irregular due to gravity variations).",
      },
    ],
    exampleQuestionIds: [
      "5af85b80-4784-4c89-8024-b410ef61928e", // HARD 2026 — Terrestrial planets statements
      "2fcd6efc-6b24-4a4f-bc64-f59034035499", // EASY 2023 — 12 noon Delhi → London
    ],
    relatedSlugs: [
      "earths-structure-landforms",
      "world-and-human-geography",
      "oceanography",
    ],
  },

  "oceanography": {
    trigger:
      "An ocean-current question (warm vs cold, driving factors, Coriolis), a tide question (spring vs neap, gravitational mechanism), a sea-floor topography question (mid-oceanic ridge, trench, abyssal plain), or a coral reef / marine ecosystem question.",
    story: [
      "19 q in 10 years, 11% HARD. Verify strand because multi-statement evaluation dominates ('which of the following are cold ocean currents', 'consider the following factors influencing currents'). Ocean Currents (7 q · 14% HARD) is the biggest subtopic. WARM currents (move from equator toward poles, eastern sides of continents N hemisphere): Gulf Stream (N Atlantic, off E coast US → NW Europe via North Atlantic Drift — that's why W Europe is mild despite high latitude), Kuroshio (NW Pacific, off Japan), Brazil Current (S America E coast), Agulhas (Africa E coast), East Australian. COLD currents (move from poles toward equator, western sides of continents): California Current (W coast US), Humboldt/Peru (W S America), Benguela (W Africa), Labrador (off Canada), Oyashio (off Russia/Japan), Canary (off NW Africa), West Wind Drift / Antarctic Circumpolar (around Antarctica). The 2025 HARD PYQ tests cold-current identification — Alaska Current is WARM (despite being near Alaska), North Atlantic Drift is WARM (it's the extension of Gulf Stream), West Wind Drift IS cold. Factors driving currents: (1) wind (planetary winds drag surface water), (2) Coriolis force (deflects right N, left S), (3) gravity (water flows down pressure gradients), (4) solar heating (creates density + temperature gradients), (5) salinity differences (denser saltwater sinks), (6) continental shapes (deflect currents).",
      "Tides and Ocean Movements (5 q · 0% HARD) — guaranteed marks pocket. Tides caused by GRAVITATIONAL pull of Moon (primary) + Sun (secondary). Moon's pull stronger than Sun's despite Sun's larger mass because Moon is much closer (gravity ∝ mass/distance²). Two high tides + two low tides per ~25 hours (one at the side facing Moon, one at opposite side due to inertia bulge). SPRING tides = high range: when Sun + Moon + Earth aligned (full moon + new moon) — combined gravity pulls maximally. NEAP tides = low range: when Sun-Earth-Moon at right angles (first + third quarter) — Sun's pull partially cancels Moon's. Tidal currents: flood tide (rising), ebb tide (falling). Tidal bore: river-mouth wall of water at high tide (Amazon's pororoca, Hooghly in WB).",
      "Ocean Waves and Sea-Floor Topography (4 q · 25% HARD): sea-floor zones — continental shelf (0–200 m depth, gently sloping, rich in fish + petroleum), continental slope (200–4000 m, steep), continental rise (4000–5000 m, gradual), abyssal plain (5000–6000 m, vast flat ocean floor), oceanic trenches (>6000 m, Mariana Trench Pacific 11034 m = deepest point Challenger Deep), MID-OCEANIC RIDGES (underwater mountain ranges where seafloor spreading occurs — Mid-Atlantic Ridge runs N-S through middle of Atlantic; East Pacific Rise; Indian Ocean Ridge). VOLCANIC island chains: most are HOTSPOT-driven (Hawaii is on Pacific plate moving over hotspot, NOT on a ridge) OR ridge-associated (Iceland sits ON Mid-Atlantic Ridge — that's why it's volcanic). The 2025 MOD PYQ tests this — which volcanic island chain is NOT associated with mid-oceanic ridge → Hawaii (hotspot, not ridge). Marine Ecosystems — Coral Reefs (3 q · 0% HARD): coral polyps (Anthozoa class) need warm clear shallow seawater (25–29°C), live symbiotically with zooxanthellae algae. Reef types: fringing (close to shore), barrier (separated from shore by lagoon — Great Barrier Reef Australia is largest), atoll (ring-shaped around submerged volcano — Maldives, Lakshadweep).",
    ],
    subSkills: [
      {
        name: "Warm vs cold ocean current identification",
        description:
          "WARM (equator → poles, east coasts in N hemisphere): Gulf Stream (N Atlantic), Kuroshio (NW Pacific), Brazil, Agulhas, East Australian, Alaska Current (despite location). COLD (poles → equator, west coasts in N hemisphere): California, Humboldt/Peru, Benguela, Labrador, Oyashio, Canary, West Wind Drift / Antarctic Circumpolar. Driving force = wind + Coriolis (deflect right N, left S).",
      },
      {
        name: "Tide types (spring vs neap)",
        description:
          "Tides caused by Moon (primary) + Sun (secondary). Moon's pull stronger despite Sun's larger mass (gravity ∝ mass/distance²; Moon much closer). SPRING tides (HIGH range): Sun-Moon-Earth ALIGNED (full moon + new moon), combined gravity max. NEAP tides (LOW range): Sun-Moon-Earth at RIGHT ANGLES (first + third quarter), Sun partially cancels Moon. Two high + two low tides per ~25 hours.",
      },
      {
        name: "Sea-floor topography zones",
        description:
          "Continental shelf (0–200 m, gently sloping, rich in fish + petroleum). Continental slope (200–4000 m, steep). Continental rise (4000–5000 m). Abyssal plain (5000–6000 m, vast flat). Oceanic trenches (>6000 m, Mariana Trench 11034 m deepest). Mid-oceanic ridges (underwater mountain ranges, seafloor spreading sites). Seamounts = underwater volcanoes that don't reach surface; guyots = flat-topped seamounts.",
      },
      {
        name: "Coral reef classification",
        description:
          "Coral polyps need warm (25–29°C) clear shallow seawater + zooxanthellae algae (symbiosis). FRINGING reef: close to shore, narrow lagoon. BARRIER reef: separated from shore by wide lagoon (Great Barrier Reef Australia — largest). ATOLL: ring-shaped around submerged volcano (Maldives, Lakshadweep). Threats: bleaching from temperature rise, ocean acidification, pollution.",
      },
    ],
    traps: [
      {
        name: "North Atlantic Drift is a cold current",
        description:
          "North Atlantic Drift is WARM — it's the northward extension of the Gulf Stream, bringing warm equatorial water to W Europe and keeping it mild despite high latitude (London at 51°N is far milder than Quebec at same latitude). Distractor labels it as cold. Other warm/cold-swap-prone: Alaska Current (WARM despite name + location), West Wind Drift (COLD, Antarctic circumpolar), Canary Current (COLD, off NW Africa). The 2025 HARD PYQ tests these distinctions.",
      },
      {
        name: "Hawaii is on a mid-oceanic ridge",
        description:
          "Hawaii is a HOTSPOT volcanic chain — the Pacific plate moves over a stationary mantle hotspot, creating a chain of islands (older to NW, youngest = Big Island in SE). Hawaii is NOT on a ridge. Iceland IS on the Mid-Atlantic Ridge (that's why it's volcanic + has rift valleys). Galapagos sits near a triple junction. Distractor lists Hawaii as ridge-associated. The 2025 MOD PYQ tests this distinction.",
      },
      {
        name: "Spring tides happen in spring",
        description:
          "SPRING TIDES are named for the verb 'to spring up' (to leap), NOT the season spring. They occur TWICE a month (at full moon + new moon) when Sun-Moon-Earth are aligned, producing the highest tidal range. Neap tides occur twice a month at quarter moons, producing the lowest range. Distractor says spring tides occur in the spring season only. They happen every fortnight year-round.",
      },
      {
        name: "Sun's gravity dominates tides",
        description:
          "MOON's gravity is the primary tidal force, NOT Sun's. Even though Sun is much more massive (27M × Moon's mass), it's much farther (390× farther). Tidal force scales as mass/distance³ → Moon's tidal effect ≈ 2.2× Sun's. Distractor says Sun causes most tidal action. Sun matters only for spring/neap modulation. Moon's tidal pull primarily; Sun's secondarily.",
      },
    ],
    exampleQuestionIds: [
      "962c22e6-0ab0-4704-9d80-d0f2eb21c4c0", // HARD 2025 — Cold ocean currents
      "2b79da6c-c630-4659-a799-28728c22bb90", // EASY 2025 — Factors influencing currents
    ],
    relatedSlugs: [
      "climatology-atmosphere-weather",
      "earth-in-space-maps",
      "earths-structure-landforms",
    ],
  },
};

/** Slugs that have detail entries — used by /playbooks index to flag "deep dive" badges. */
export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
