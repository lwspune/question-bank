/**
 * Content for /guide/nda-history/traps.
 *
 * NDA History distractor shapes — bucketed by GENRE (paired-fact swap /
 * chronology-sequence / multi-statement verify), NOT by tier strand,
 * because the FIX maps to the genre (memorise pair tables / anchor on
 * absolute dates / judge each statement independently) regardless of
 * which chapter the trap appears in.
 *
 * Distinguished from other NDA subjects:
 *   - Chemistry traps = compound identity confusion (acid-source swap,
 *     diamond-graphite property flip)
 *   - Physics traps = formula misapplication (sign flip, mass-cancels,
 *     CGS/SI mix)
 *   - English traps = near-synonym semantics (S-V error, idiom meaning)
 *   - Biology traps = paired-fact swap (disease↔pathogen, vitamin↔
 *     deficiency, hormone↔gland) — closest cousin to History's Recall
 *     genre
 *   - Geography traps = MIXED (paired-fact + mechanism-direction + multi-
 *     statement)
 *   - History traps = paired-fact swap (king↔dynasty, scholar↔text,
 *     reformer↔movement, viceroy↔era, treaty↔year) + chronology-
 *     sequence (year-off-by-one, traveller-by-era swap) + multi-statement
 *     Verify (partial-credit, universal-claim, match-list misalignment)
 *
 * The lever is named-pair table mastery + absolute-date anchoring +
 * disciplined statement-by-statement T/F evaluation.
 */

export type TrapBucket = "paired-fact" | "chronology" | "verify";

export type TrapShape = {
  id: string;
  /** Title shown in the page section. */
  title: string;
  bucket: TrapBucket;
  /** Which playbook(s) this trap most commonly appears in. */
  affects: string[]; // playbook slugs
  /** The mechanic — how the trap works. */
  mechanic: string;
  /** The fix — the verification habit that avoids it. */
  fix: string;
  /** Optional worked-example UUID — a real PYQ that demonstrates the trap. */
  exampleQuestionId?: string;
};

export const TRAP_SHAPES: TrapShape[] = [
  // ──────── Paired-fact swap traps (Recall genre) ────────
  {
    id: "reformer-movement-swap",
    title: "Reformer ↔ movement swap (Brahmo vs Arya, Vivekananda's mission, Aligarh)",
    bucket: "paired-fact",
    affects: ["modern-india"],
    mechanic:
      "Distractor swaps reformer ↔ movement pairs. Ram Mohan Roy / Arya Samaj (WRONG — Brahmo 1828; Arya is Dayanand 1875). Dayanand / Brahmo Samaj (WRONG — Arya 1875). Vivekananda / Theosophical Society (WRONG — Ramakrishna Mission 1897; Theosophy is Blavatsky+Olcott→Annie Besant). Phule / Brahmo Samaj (WRONG — Satyashodhak 1873 Pune). Aligarh attributed to Sayyid Ahmad of Rae Bareli (WRONG — that's the 1820s Wahhabi Mujahidin movement; Aligarh is Syed Ahmad Khan, MAO College 1875). The 2025 HARD match-list PYQ tests exactly this — A. Vishnu Shastri Pundit, B. Karsondas Mulji, C. etc., paired against texts.",
    fix:
      "Memorise the reformer ↔ movement ↔ key text TRIPLE cold. Drill /timeline-and-pairs → 'Reformers ↔ movement' cluster — 12 reformer triples. For match-list questions, BUILD YOUR OWN A-B-C-D pairing from memory FIRST, then match to the option. Never start from the option side (distractor anchors there).",
    exampleQuestionId: "5db2243e-77a5-444a-ac4b-a82ce0635bdf",
  },
  {
    id: "ruler-dynasty-swap",
    title: "Ruler ↔ dynasty swap (Vijayanagara dynasties + Mughal succession + Delhi Sultanate)",
    bucket: "paired-fact",
    affects: ["medieval-india"],
    mechanic:
      "Distractor pairs ruler with wrong dynasty. Krishnadevaraya / Sangama (WRONG — Tuluva 1509–29; Sangama is Harihara+Bukka 1336). Iltutmish / Khilji (WRONG — Mamluk/Slave 1211–36; Khilji is Alauddin 1296–1316). Babur / Lodi (WRONG — Babur DEFEATED Lodi at Panipat I 1526; he founded Mughal). Lachit Borphukan / Maratha (WRONG — Ahom, defeated Mughals at Saraighat 1671 Assam). Tegh Bahadur / 9th Sikh Guru (correct) — distractor might say 10th (wrong — that's Gobind Singh).",
    fix:
      "Memorise dynasty chronologies cold. Delhi Sultanate: Mamluk → Khilji → Tughlaq → Sayyid → Lodi (1206–1526). Vijayanagara: Sangama → Saluva → Tuluva → Aravidu (1336–1646). Mughals: Babur → Humayun → Akbar → Jahangir → Shah Jahan → Aurangzeb → 8 later weaker (Bahadur Shah I onwards). Sikh Gurus 1–10 sequence (Nanak, Angad, Amar Das, Ram Das, Arjan, Hargobind, Har Rai, Har Krishan, Tegh Bahadur, Gobind Singh).",
  },
  {
    id: "scholar-text-swap",
    title: "Scholar ↔ text swap (Vyasa/Valmiki, Locke/Rousseau, Akbarnama/Ain-i-Akbari)",
    bucket: "paired-fact",
    affects: ["ancient-india", "medieval-india", "world-history"],
    mechanic:
      "Distractor swaps author ↔ text. Vyasa / Ramayana (WRONG — Mahabharata; Ramayana is Valmiki). Locke / Social Contract (WRONG — Locke wrote Two Treatises of Government 1689; Social Contract is Rousseau 1762). Abul Fazl wrote Ain-i-Akbari AND Akbarnama (both his — distractor might attribute Akbarnama to Badauni). Babur wrote Baburnama (Chagatai Turkic — NOT Persian; distractor might claim Persian). Sushruta Samhita commentary by Vagbhata (WRONG — Chakrapanidatta wrote 11C Bengal Sushruta commentary; Vagbhata wrote his own Ashtanga Hridaya/Sangraha).",
    fix:
      "Memorise scholar ↔ text PAIRS via the /timeline-and-pairs 'Scholars ↔ texts' cluster (20 entries). Use mnemonics: Vyasa = MahaVyasa = Mahabharata; Valmiki = Adi-kavya = Ramayana. Locke = LIBERTY (Two Treatises). Rousseau = ROMANCE (Social Contract). The 2024 HARD Chakrapanidatta PYQ tests Sushruta commentary attribution — memorise the 4 main Ayurveda lineages: Charaka (medicine), Sushruta (surgery), Vagbhata (synthesis Ashtanga Hridaya), Chakrapanidatta (11C Bengal Sushruta commentator).",
    exampleQuestionId: "9f32fbad-4d5e-468a-aa16-dc2dd8777ffd",
  },
  {
    id: "harappan-site-feature-swap",
    title: "Harappan site ↔ unique-feature swap (Lothal dockyard, Dholavira water, Kalibangan ploughed field)",
    bucket: "paired-fact",
    affects: ["ancient-india"],
    mechanic:
      "Distractor swaps site signatures. Mohenjo-daro / dockyard (WRONG — Great Bath + Dancing Girl + Pashupati seal; dockyard is Lothal). Lothal / Great Bath (WRONG — dockyard + bead-making). Dholavira / ploughed field (WRONG — water management + 10-character signboard; ploughed field is Kalibangan). Banawali / largest in India (WRONG — Rakhigarhi is largest in India; Banawali has fortification + ploughed field too). The 2026 HARD PYQ tests Mohenjo-daro Great Bath WATER SOURCE (= adjacent well, NOT a river / reservoir / canal).",
    fix:
      "Memorise one-feature-per-site: Mohenjo-daro = Great Bath + Dancing Girl + Pashupati seal + Sindh. Harappa = cemetery R37+H + Punjab Pakistan. Dholavira = water dams + signboard + Gujarat Kutch. Lothal = dockyard + bead industry + Gujarat. Kalibangan = ploughed field + fire altars + Rajasthan. Banawali = fortification + Haryana. Rakhigarhi = LARGEST in India + Haryana. Mehrgarh = pre-Harappan Neolithic c. 7000 BCE + Balochistan.",
    exampleQuestionId: "9b32a18d-6ebb-4977-b6c3-415c1c195850",
  },
  {
    id: "act-year-swap",
    title: "British Act ↔ year swap (Charter vs GoI Acts, Regulating Act, Indian Councils Acts)",
    bucket: "paired-fact",
    affects: ["modern-india"],
    mechanic:
      "Distractor mixes Charter Acts (about EIC, every 20 yr 1793–1853) with GoI Acts (about governance, 1858/1909/1919/1935). 'Charter Act 1858' (WRONG — that's GoI Act post-Crown rule). 'GoI Act 1813' (WRONG — Charter Act). 'Morley-Minto Reforms 1919' (WRONG — 1909; 1919 is Montagu-Chelmsford). 'Regulating Act 1784' (WRONG — 1773; 1784 is Pitt's India Act). Distractor also mixes Indian Councils Acts (1861/1892 — council reform) with GoI Acts (1858/1909/1919/1935 — governance overhaul). Sometimes attributes a feature to wrong Act: 'Separate electorates introduced by GoI Act 1919' (WRONG — Morley-Minto 1909).",
    fix:
      "Memorise the timeline cold: Regulating Act 1773 → Pitt's India Act 1784 → Charter Acts every 20 yr (1793, 1813, 1833, 1853) → GoI Act 1858 (post-1857 Crown rule) → IC Acts 1861/1892 → Morley-Minto 1909 → Rowlatt + GoI Act 1919 (Montagu-Chelmsford diarchy) → GoI Act 1935 → Indian Independence 1947. Drill /timeline-and-pairs → 'Viceroys / British Acts ↔ year' cluster.",
  },
  {
    id: "mahamatta-function-swap",
    title: "Ashokan mahamatta function swap (Anta vs Ithijhakha vs Dhamma)",
    bucket: "paired-fact",
    affects: ["ancient-india"],
    mechanic:
      "Ashokan administration had multiple mahamatta types. Anta-mahamatta = FRONTIER districts (distractor swaps with women). Ithijhakha-mahamatta = WOMEN'S welfare (distractor swaps with frontier or judicial). Vyavaharika-mahamatta = JUDICIAL. Vraja-mahamatta = ANIMAL protection. Dhamma-mahamatta (special Ashokan creation) = DHAMMA propagation. The 2022 HARD match-list PYQ tests A-B-C-D paired with 4 functions — distractor option mismatches any two.",
    fix:
      "Memorise 4 mahamatta functions as TWO pairs: (Anta + frontier) || (Ithijhakha + women). (Vyavaharika + judicial) || (Vraja + animals). Plus the special Dhamma-mahamatta (Ashokan innovation for dhamma propagation). Build your own A-B-C-D pairing from memory FIRST, then match the option.",
  },

  // ──────── Chronology / Sequence traps ────────
  {
    id: "traveller-era-mis-sequence",
    title: "Foreign traveller chronological out-of-sequence",
    bucket: "chronology",
    affects: ["medieval-india"],
    mechanic:
      "Distractor places travellers in wrong chronological order. Bernier (17C Aurangzeb) before Ibn Battuta (14C Muhammad bin Tughlaq) → WRONG. Marco Polo (13C) after Monserrate (16C Akbar) → WRONG. Patron-era mismatch: Nikitin claimed to visit Akbar's court (WRONG — 15C Bahmani/Vijayanagara, pre-Mughal). The 2025 HARD PYQ requires arranging Mundy (17C) + Monserrate (16C) + Nikitin (15C) + Ibn Battuta (14C) → Battuta → Nikitin → Monserrate → Mundy.",
    fix:
      "Use patron-era anchoring: each traveller maps to a specific ruler/era. Al-Biruni 11C Mahmud Ghazni · Battuta 14C MB Tughlaq · Marco Polo 13C briefly · Nikitin 15C Bahmani/Vijayanagara · Razzaq 15C Devaraya II · Conti 15C · Monserrate 16C Akbar · Paes+Nuniz 16C Krishnadevaraya · Roe 17C Jahangir · Mundy 17C Shah Jahan · Bernier+Tavernier+Manucci 17C-18C Aurangzeb. Drill /timeline-and-pairs era anchors first.",
    exampleQuestionId: "ad1b4218-344f-474e-ab75-1961f437adda",
  },
  {
    id: "gandhian-satyagraha-out-of-order",
    title: "Gandhian satyagraha or freedom-event out-of-sequence",
    bucket: "chronology",
    affects: ["modern-india"],
    mechanic:
      "Distractor places freedom-movement events in wrong order. Quit India 1942 BEFORE Civil Disobedience 1930 → WRONG. Champaran 1917 AFTER Ahmedabad 1918 → WRONG. Lucknow Pact 1916 AFTER Lahore Purna Swaraj 1929 → WRONG. Communal Award 1932 BEFORE Swaraj Party 1923 → WRONG. The 2025 MOD PYQ tests: Formation of Swaraj Party (1923) · Communal Award (1932) · Lucknow Pact (1916) · Simla Conference (1945) → chronological order Lucknow Pact 1916 → Swaraj Party 1923 → Communal Award 1932 → Simla Conference 1945.",
    fix:
      "Memorise 8 anchor dates for Modern India freedom movement: 1885 INC founded · 1905 Bengal partition · 1916 Lucknow Pact · 1917 Champaran · 1919 Rowlatt+Jallianwala · 1920 Non-Cooperation · 1923 Swaraj Party · 1928 Bardoli + Simon · 1929 Lahore Purna Swaraj · 1930 Civil Disobedience-Salt March · 1931 Karachi · 1932 Communal Award + Poona Pact · 1942 Quit India · 1947 Independence. Drill /timeline-and-pairs 'Era timeline' cluster cold.",
  },
  {
    id: "eic-founding-date-confusion",
    title: "EIC founding date confusion (British vs Dutch vs French)",
    bucket: "chronology",
    affects: ["world-history"],
    mechanic:
      "Distractor reverses BEIC vs DVOC order (claims Dutch 1602 preceded British 1600 → WRONG). Or attributes EIC founding to wrong year (BEIC 1602 → WRONG; 1600). Or claims Portuguese had an 'EIC' (WRONG — Portuguese used Estado da Índia from 1505; no separate EIC). French EIC 1664 → distractor places it 17C earliest (WRONG — 60+ yr after BEIC). The 2026 MOD PYQ tests Vasco da Gama 1498 + Magellan 1519–22 + BEIC 1600 + DVOC 1602 in chronological order.",
    fix:
      "Memorise the date pyramid: 1498 Gama (Calicut) → 1519–22 Magellan (circumnavigation) → 1600 BEIC (Elizabeth I charter Dec 31) → 1602 DVOC (Dutch, world's first public company) → 1616 Danish EIC (Tranquebar) → 1664 French EIC (Colbert, Louis XIV). British 1600 is 2 years before Dutch 1602 — the closest pair, and the most-tested distractor pair.",
    exampleQuestionId: "cb278562-e2e7-44f5-8b7c-3c7ea03020f2",
  },
  {
    id: "industrial-invention-chronology",
    title: "Industrial Revolution invention chronology",
    bucket: "chronology",
    affects: ["world-history"],
    mechanic:
      "Distractor places telephone before telegraph (telegraph 1837 Morse / telephone 1876 Bell — telegraph first). Spinning Mule 1779 Crompton before Spinning Jenny 1764 Hargreaves (WRONG — Jenny first). Bessemer process 1856 attributed to 18C (WRONG — 19C). Term-coinage attribution to Adam Smith (WRONG — Toynbee 1880–81, popularised earlier by Engels 1845). The 2025 MOD PYQ tests 'which element discovered earliest' (e.g. nitrogen vs oxygen vs hydrogen vs helium — answer = nitrogen 1772 by Rutherford, before others).",
    fix:
      "Memorise the IR invention pyramid: 1733 Flying Shuttle Kay → 1764 Spinning Jenny Hargreaves → 1769 Water Frame Arkwright + Watt's steam engine patent → 1779 Spinning Mule Crompton → 1785 Power Loom Cartwright → 1793 Cotton Gin Whitney → 1837 Telegraph Morse → 1856 Bessemer steel → 1876 Telephone Bell → 1877 Phonograph Edison → 1879 Electric bulb Edison → 1895 Wireless Marconi. Pre-1800 = British textile; post-1840 = American + Italian electronics.",
  },

  // ──────── Multi-statement Verify traps ────────
  {
    id: "multi-statement-partial-credit",
    title: "Multi-statement evaluation — partial-credit distractor",
    bucket: "verify",
    affects: ["medieval-india", "modern-india", "ancient-india", "world-history"],
    mechanic:
      "'Consider the following statements about [X]... which are correct?' with options 'Only 1, 2' / 'Only 2, 3' / 'All' / 'None'. The trap option lists 2 of 3 correct statements (when 3 are correct) — partial-credit distractor. Or lists '1, 2, 3, 4' / 'all four' when 1 is wrong (universal distractor). 70 q of NDA History bank are multi-statement (43% HARD — multi-statement is HARDER than other shapes by 14 pp).",
    fix:
      "Judge each statement INDEPENDENTLY before reading the options. Write T/F in the margin next to each. Then MATCH to the option that lists EXACTLY your T set. NEVER pick on 'this option has 2 of the 3 I marked T' — that's the partial-credit trap. If you're uncertain about ANY single statement, the whole question is uncertain → skip (−1.33 penalty is harsh).",
    exampleQuestionId: "8e23ac0b-ba08-40ac-bfb5-437a53aa87af",
  },
  {
    id: "universal-claim-trap",
    title: "Universal-claim trap (all / every / no / always)",
    bucket: "verify",
    affects: ["modern-india", "medieval-india", "ancient-india", "world-history"],
    mechanic:
      "Distractor uses absolute quantifiers. 'All convergent boundaries form mountains' — wait, that's Geography. For History: 'ALL Mughal emperors abolished jizya' (WRONG — Akbar abolished 1564; Aurangzeb RESTORED 1679). 'EVERY European empire collapsed after WWI' (WRONG — British + French persisted into mid-20C; only German + Austria-Hungary + Russian + Ottoman collapsed). 'NO Indian was on the Simon Commission' (CORRECT — all-British; that's why protests). 'ALL Five Year Plan precursors were industrialist plans' (WRONG — Bombay Plan 1944 was; Peoples Plan 1945 MN Roy was Marxist; Sarvodaya was Gandhian).",
    fix:
      "When you see 'all', 'every', 'always', 'no', 'none' in a statement, SEARCH for the EXCEPTION before judging it correct. History is rich in exceptions. The 2024 HARD pre-FYP-plans PYQ tests exactly this — the 4 statements about Bombay/Peoples/Sarvodaya/Gandhian plans need individual verification; 'all 4 were industrialist plans' is FALSE.",
    exampleQuestionId: "743fd8ef-320e-4635-a77c-2409894d47c6",
  },
  {
    id: "match-list-misalignment",
    title: "Match List I ↔ List II misalignment",
    bucket: "verify",
    affects: ["modern-india", "ancient-india", "medieval-india"],
    mechanic:
      "Match-list questions pair 4 items (A, B, C, D) with 4 facts (1, 2, 3, 4) — the OPTION combinations make 3 of the 4 pairs correct + 1 wrong. The trap-option swaps two pairs. The 2024 MOD PYQ on early-India units (Muhurta = time, Raktika = weight, Angula = length, Pada = poetry-metre) lists alternatives where any two of the 4 are swapped. The 2024 MOD on medieval revenue (Upari, Pattadar, Mirasidar, Inam lands) has the same shape.",
    fix:
      "BUILD your own A-B-C-D pairing from memory FIRST, then scan the option list for the EXACT match. Never start from an option — you'll anchor on 1 wrong pair and miss it. If unsure of any single pair, the whole match is risky → consider skipping (−1.33 penalty).",
  },
  {
    id: "wwi-impact-universal",
    title: "WWI impact universal claim",
    bucket: "verify",
    affects: ["world-history"],
    mechanic:
      "WWI impact questions test which option is NOT a real impact. Common distractor: 'Industrial decline hit all of Europe' (WRONG — Europe retained + continued industrial capacity; impact was infrastructure damage + manpower loss + finance + Versailles humiliation, NOT industrial decline). Or 'All European countries became democracies' (WRONG — Soviet Russia communist; Germany got Weimar → Nazis 1933; Italy got Mussolini 1922; Spain Civil War 1936). The 2023 HARD PYQ tests 'in which way did WWI NOT impact Europe' — pick the option that's NOT an impact.",
    fix:
      "For 'NOT impact' questions, LIST the real impacts mentally: political upheaval + colonial unrest + women's suffrage advance + treaty resentment + 4 empires collapsed (German + AH + Russian + Ottoman) + map redrawn + economic devastation. Then the option NOT on that list is the answer. Be especially careful of options claiming positive outcomes ('industrial growth', 'European unity') — those are usually the NOT-impact trap.",
    exampleQuestionId: "3f0dcdc9-1d6a-49f7-ad8d-41be7418d40a",
  },
];

/** Index by bucket — used by the /traps page sectioning. */
export const TRAPS_BY_BUCKET: Record<TrapBucket, TrapShape[]> = {
  "paired-fact": TRAP_SHAPES.filter((t) => t.bucket === "paired-fact"),
  chronology: TRAP_SHAPES.filter((t) => t.bucket === "chronology"),
  verify: TRAP_SHAPES.filter((t) => t.bucket === "verify"),
};

export const TRAP_HEADLINE = {
  shapes: TRAP_SHAPES.length,
  topAffects: Math.max(...TRAP_SHAPES.map((t) => t.affects.length)),
};
