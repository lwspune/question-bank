/**
 * Content for /guide/nda-history/timeline-and-pairs.
 *
 * History-specific subject artefact — the analogue of nda-english's
 * /vocab-families, nda-physics's /formulas, nda-chemistry's /common-compounds,
 * and nda-biology's + nda-geography's /reference-tables. A single-page
 * index of the ~95 named-pair + chronology entries NDA History actually
 * tests.
 *
 * Structurally a MULTI-DOMAIN reference (rendered via the new
 * HistoryReferenceTables component, parallel to BiologyReferenceTables +
 * GeographyReferenceTables — each cluster carries its own column headers
 * because History's named facts span 5 distinct domains:
 *
 *   1. Era timeline — ~35 absolute-date anchors (BCE Vedic → 1947+).
 *      The lever for the 61 date-anchored q (39% of World History,
 *      33% of Modern India).
 *   2. Rulers ↔ dynasty ↔ achievement — ~20 ruler-pair entries
 *      (Ancient + Medieval recall workhorse).
 *   3. Reformers ↔ movement ↔ text — ~16 reformer-pair entries
 *      (19th Century Social and Religious Reform; 17 q · 41% HARD).
 *   4. Scholars ↔ texts — ~14 author/scholar/poet-pair entries
 *      (Ancient Literature + Medieval Bhakti/Sufi + Vijayanagara texts).
 *   5. Viceroys / British Acts ↔ year — ~10 entries
 *      (British Administration; 16 q · 38% HARD).
 *
 * Why themed clusters (not alphabetical flat list): matches the bank's
 * subtopic structure, and active-recall is easier when related named
 * facts are co-located. Active-recall in 4 passes (cover middle + right
 * columns, read entity name, write paired fact + context) is the highest-
 * leverage drill for the 144 q of recall + 61 q of date-anchored shape.
 *
 * Each entry: the entity (date/ruler/reformer/scholar/Act), the paired
 * fact (event/dynasty/movement/text/year), optionally the playbook it
 * most often appears in (so a reader can drill that chapter's bank q),
 * and an optional trap-note for the highest-leverage distractor.
 *
 * Curation rule: every entry has appeared in the 2017–2026 NDA History
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
  /** One-line context / detail / note. */
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
    theme: "Era timeline — absolute-date anchors",
    blurb:
      "~35 absolute dates spanning ancient India → 1947+. Anchor these cold and chronological-order questions answer themselves. Largest leverage on World History (39% date-anchored) and Modern India British Acts (16 q · 38% HARD).",
    columns: {
      name: "Year / Period",
      fact: "Event",
      context: "Detail + significance",
    },
    entries: [
      {
        id: "harappan-mature",
        name: "c. 2600–1900 BCE",
        fact: "Mature Harappan / Indus Valley civilisation",
        context: "Mohenjo-daro, Harappa, Dholavira, Lothal active · standardised bricks, planned drainage, Pashupati seal",
        playbookSlug: "ancient-india",
      },
      {
        id: "vedic-rigveda",
        name: "c. 1500–1000 BCE",
        fact: "Rigvedic period",
        context: "Rigveda (oldest of 4 Vedas) composed · pastoral Aryan society · river-region settlement",
        playbookSlug: "ancient-india",
      },
      {
        id: "buddha-life",
        name: "c. 563–483 BCE",
        fact: "Gautama Buddha's life",
        context: "Born Lumbini (Shakya clan) · enlightenment Bodh Gaya · first sermon Sarnath · parinirvana Kushinagar",
        playbookSlug: "ancient-india",
      },
      {
        id: "mahavira-life",
        name: "c. 540–468 BCE",
        fact: "Mahavira (24th Tirthankara, Jainism)",
        context: "Born Vaishali · kevala-jnana at Jrimbhikagrama · parinirvana Pavapuri",
        playbookSlug: "ancient-india",
      },
      {
        id: "mauryan-founding",
        name: "321 BCE",
        fact: "Chandragupta Maurya founds Mauryan empire",
        context: "Defeated last Nanda (Dhana Nanda) with Kautilya/Chanakya · Arthashastra is Kautilya's text",
        playbookSlug: "ancient-india",
      },
      {
        id: "kalinga-war",
        name: "c. 261 BCE",
        fact: "Ashoka's Kalinga War + dhamma turn",
        context: "Kalinga Rock Edicts 13 + 14 (war remorse, dhamma); 3rd Buddhist Council at Pataliputra",
        playbookSlug: "ancient-india",
      },
      {
        id: "gupta-founding",
        name: "c. 320 CE",
        fact: "Gupta empire founded (Chandragupta I)",
        context: "Golden age of Indian classical culture · Samudragupta, Chandragupta II Vikramaditya · Fa-Hien visit",
        playbookSlug: "ancient-india",
      },
      {
        id: "harshavardhana",
        name: "606–647 CE",
        fact: "Harshavardhana's reign",
        context: "Kannauj capital · last great Hindu emperor of north India · Xuanzang (Hsuan Tsang) Chinese pilgrim visit",
        playbookSlug: "ancient-india",
      },
      {
        id: "delhi-sultanate",
        name: "1206–1526 CE",
        fact: "Delhi Sultanate (5 dynasties)",
        context: "Mamluk/Slave 1206 (Qutbuddin Aibak) → Khilji 1290 → Tughlaq 1320 → Sayyid 1414 → Lodi 1451–1526",
        playbookSlug: "medieval-india",
      },
      {
        id: "vijayanagara-founding",
        name: "1336 CE",
        fact: "Vijayanagara founded (Harihara + Bukka)",
        context: "Sangama dynasty · Hampi capital · resisted Bahmani / Deccan Sultanates till Talikota 1565",
        playbookSlug: "medieval-india",
      },
      {
        id: "babur-panipat-1",
        name: "1526 CE",
        fact: "First Battle of Panipat",
        context: "Babur (Mughal founder) defeated Ibrahim Lodi · ended Delhi Sultanate · gunpowder + field artillery",
        playbookSlug: "medieval-india",
      },
      {
        id: "krishnadevaraya-reign",
        name: "1509–1529 CE",
        fact: "Krishnadevaraya — Vijayanagara golden age",
        context: "Tuluva dynasty · captured Raichur 1520, Udayagiri 1514, Kondavidu 1515 · Amuktamalyada in Telugu · Paes + Nuniz visit",
        playbookSlug: "medieval-india",
      },
      {
        id: "akbar-reign",
        name: "1556–1605 CE",
        fact: "Akbar's reign",
        context: "Third Panipat 1556 · mansabdari (zat+sawar) · Din-i-Ilahi 1582 · Ibadat Khana · jizya abolished · Rajput alliances",
        playbookSlug: "medieval-india",
      },
      {
        id: "talikota",
        name: "1565 CE",
        fact: "Battle of Talikota — fall of Vijayanagara",
        context: "Deccan Sultanate coalition (Bijapur + Ahmadnagar + Golkonda + Bidar) defeated Vijayanagara · political end",
        playbookSlug: "medieval-india",
      },
      {
        id: "british-eic",
        name: "1600 CE",
        fact: "British East India Company founded",
        context: "Dec 31 Royal Charter from Elizabeth I · Sir Thomas Smythe first governor · trading rights in East Indies",
        playbookSlug: "world-history",
      },
      {
        id: "dutch-voc",
        name: "1602 CE",
        fact: "Dutch VOC founded",
        context: "Vereenigde Oostindische Compagnie · world's first listed public company · 2 years after BEIC",
        playbookSlug: "world-history",
        notes: "BEIC (1600) preceded DVOC (1602) by 2 years. Distractor reverses the order.",
      },
      {
        id: "saraighat",
        name: "1671 CE",
        fact: "Battle of Saraighat — Ahoms vs Mughals",
        context: "Lachit Borphukan defeated Aurangzeb's general Ram Singh I (Mirza Raja Jai Singh I's son) on Brahmaputra · Assam saved from Mughals",
        playbookSlug: "medieval-india",
      },
      {
        id: "khalsa-founding",
        name: "1699 CE",
        fact: "Khalsa founded by Guru Gobind Singh",
        context: "Baisakhi at Anandpur Sahib · Panj Pyare (5 beloved) baptised with amrit · militant Sikh order",
        playbookSlug: "medieval-india",
      },
      {
        id: "plassey",
        name: "1757 CE",
        fact: "Battle of Plassey",
        context: "Robert Clive vs Siraj-ud-Daulah of Bengal · Mir Jafar's defection decisive · British dominance in Bengal begins",
        playbookSlug: "modern-india",
      },
      {
        id: "buxar",
        name: "1764 CE",
        fact: "Battle of Buxar",
        context: "Hector Munro defeated combined Mir Qasim (Bengal) + Shuja-ud-Daulah (Awadh) + Shah Alam II (Mughal Emperor) · military supremacy",
        playbookSlug: "modern-india",
      },
      {
        id: "spinning-jenny",
        name: "1764 CE",
        fact: "Spinning Jenny invented",
        context: "James Hargreaves · multi-spindle spinning frame · Industrial Revolution textile breakthrough · same year as Buxar",
        playbookSlug: "world-history",
      },
      {
        id: "allahabad-treaty",
        name: "1765 CE",
        fact: "Treaty of Allahabad — EIC gets Diwani",
        context: "Shah Alam II granted Diwani (fiscal control) of Bengal-Bihar-Orissa to EIC · transformed EIC into territorial power",
        playbookSlug: "modern-india",
      },
      {
        id: "regulating-act",
        name: "1773 CE",
        fact: "Regulating Act passed",
        context: "British Parliament regulates EIC · Warren Hastings as first GG of Bengal · Supreme Court at Calcutta · first GG-in-Council",
        playbookSlug: "modern-india",
      },
      {
        id: "first-continental",
        name: "1774 CE",
        fact: "First Continental Congress (Philadelphia)",
        context: "12 colonies (Georgia absent) · rejected Galloway plan for British-led union · Declaration of Rights · boycott British goods",
        playbookSlug: "world-history",
      },
      {
        id: "american-independence",
        name: "1776 CE",
        fact: "American Declaration of Independence",
        context: "July 4 · drafted by Jefferson (with Franklin, Adams, Sherman, Livingston) · 2nd Continental Congress · Lockean natural rights",
        playbookSlug: "world-history",
      },
      {
        id: "french-revolution",
        name: "1789 CE",
        fact: "French Revolution — Bastille (July 14)",
        context: "Storming of Bastille (Paris prison) · feudalism abolished Aug 4 · Declaration of Rights of Man Aug 26 · National Day of France",
        playbookSlug: "world-history",
      },
      {
        id: "charter-act-1813",
        name: "1813 CE",
        fact: "Charter Act 1813",
        context: "Broke EIC trade monopoly (except tea + China trade) · £1 lakh/year for Indian education · missionary entry permitted",
        playbookSlug: "modern-india",
      },
      {
        id: "brahmo-samaj",
        name: "1828 CE",
        fact: "Brahmo Samaj founded by Raja Ram Mohan Roy",
        context: "Calcutta · monotheistic Hindu reform · also championed Sati abolition 1829 (via Bentinck's Regulation XVII)",
        playbookSlug: "modern-india",
      },
      {
        id: "charter-act-1833",
        name: "1833 CE",
        fact: "Charter Act 1833",
        context: "Bentinck = first GOVERNOR-GENERAL OF INDIA (was earlier GG of Bengal only) · ended EIC's commercial functions · Macaulay's English education minute",
        playbookSlug: "modern-india",
      },
      {
        id: "1857-mutiny",
        name: "1857 CE",
        fact: "Revolt of 1857 / Indian Mutiny / First War of Independence",
        context: "Greased cartridges sparked Meerut May 10 · spread to Delhi (Bahadur Shah II), Kanpur (Nana Sahib), Lucknow (Begum Hazrat Mahal), Jhansi (Rani Lakshmibai)",
        playbookSlug: "modern-india",
      },
      {
        id: "goi-1858",
        name: "1858 CE",
        fact: "Government of India Act 1858 — Crown rule",
        context: "EIC abolished post-1857 · Secretary of State for India + India Council (London) · Viceroy + Council (India) · Crown direct rule begins",
        playbookSlug: "modern-india",
      },
      {
        id: "inc-founded",
        name: "1885 CE",
        fact: "Indian National Congress founded",
        context: "Womesh Chandra Banerjee first president · Bombay Dec 28–31 · AO Hume British retired official as catalyst · 72 delegates",
        playbookSlug: "modern-india",
      },
      {
        id: "morley-minto",
        name: "1909 CE",
        fact: "Morley-Minto Reforms (Indian Councils Act 1909)",
        context: "Separate electorates for Muslims · expanded legislative councils · first concession to communal representation",
        playbookSlug: "modern-india",
      },
      {
        id: "wwi",
        name: "1914–1918 CE",
        fact: "World War I",
        context: "Trigger = Sarajevo assassination of Archduke Franz Ferdinand Jun 28 1914 · Triple Entente (Russia+France+UK) vs Central Powers · US joined 1917",
        playbookSlug: "world-history",
      },
      {
        id: "russian-revolution",
        name: "1917 CE",
        fact: "Russian Revolution",
        context: "Feb Revolution (Tsar Nicholas II abdicates) → Oct Revolution (Bolsheviks under Lenin take power) · world's first communist state",
        playbookSlug: "world-history",
      },
      {
        id: "rowlatt-jallianwala",
        name: "1919 CE",
        fact: "Rowlatt Act + Jallianwala Bagh massacre + Versailles + GoI Act 1919",
        context: "Apr 13 Jallianwala Bagh Amritsar (Gen Dyer) · Treaty of Versailles Jun 28 (war-guilt + reparations on Germany) · GoI Act 1919 introduced diarchy in provinces (Montagu-Chelmsford)",
        playbookSlug: "modern-india",
      },
      {
        id: "purna-swaraj",
        name: "1929 CE",
        fact: "Lahore session — Purna Swaraj resolution",
        context: "Dec 31 Nehru as INC president · midnight pledge of complete independence · Jan 26 1930 first Independence Day",
        playbookSlug: "modern-india",
      },
      {
        id: "salt-march",
        name: "1930 CE",
        fact: "Civil Disobedience — Dandi Salt March",
        context: "Mar 12 Sabarmati Ashram → Apr 6 Dandi · 240 mi 24 days · Gandhi broke salt law · mass mobilisation",
        playbookSlug: "modern-india",
      },
      {
        id: "goi-1935",
        name: "1935 CE",
        fact: "Government of India Act 1935",
        context: "Provincial autonomy · federal scheme with princely states (never operationalised) · longest UK statute · basis for 1950 Constitution",
        playbookSlug: "modern-india",
      },
      {
        id: "wwii",
        name: "1939–1945 CE",
        fact: "World War II",
        context: "Germany invades Poland Sept 1 1939 · Pearl Harbor Dec 7 1941 · D-Day Jun 6 1944 · Hiroshima+Nagasaki Aug 1945 · Holocaust",
        playbookSlug: "world-history",
      },
      {
        id: "quit-india",
        name: "1942 CE",
        fact: "Quit India Movement",
        context: "Aug 8–9 Bombay AICC · Gandhi's 'Do or Die' · arrests of all top INC leaders · spontaneous mass risings",
        playbookSlug: "modern-india",
      },
      {
        id: "un-founded",
        name: "1945 CE",
        fact: "United Nations founded",
        context: "Oct 24 San Francisco Charter signed Jun 26 · replaced League of Nations (dissolved 1946) · 5 permanent UNSC members",
        playbookSlug: "world-history",
      },
      {
        id: "india-independence",
        name: "1947 CE",
        fact: "Indian Independence + Partition",
        context: "Aug 15 India + Aug 14 Pakistan · Mountbatten Plan Jun 3 · Radcliffe Line · Nehru first PM · 1947 Indian Independence Act",
        playbookSlug: "modern-india",
      },
    ],
  },
  {
    theme: "Rulers ↔ dynasty ↔ achievement",
    blurb:
      "Ancient + Medieval ruler-pair recall. Distractors swap ruler↔dynasty or ruler↔achievement. The Medieval bank (53 q · 28% HARD) and Ancient Mauryan-Gupta cluster are the primary drill targets.",
    columns: {
      name: "Ruler",
      fact: "Dynasty / Period",
      context: "Achievement + identifier",
    },
    entries: [
      {
        id: "chandragupta-maurya",
        name: "Chandragupta Maurya",
        fact: "Mauryan (321–297 BCE) — founder",
        context: "Defeated Dhana Nanda · Kautilya as PM (Arthashastra) · ceded NW to Seleucus → Megasthenes mission",
        playbookSlug: "ancient-india",
      },
      {
        id: "ashoka",
        name: "Ashoka",
        fact: "Mauryan (272/268–232 BCE)",
        context: "Kalinga War c. 261 BCE → dhamma · Major + Pillar + Kalinga + Minor Rock Edicts · 3rd Buddhist Council · Maski/Gujarra inscriptions name 'Ashoka'",
        playbookSlug: "ancient-india",
      },
      {
        id: "samudragupta",
        name: "Samudragupta",
        fact: "Gupta (c. 335–375 CE)",
        context: "Allahabad Pillar Inscription (Prashasti by Harisena) · Indian Napoleon · conquered N India + dakshin patha campaign",
        playbookSlug: "ancient-india",
      },
      {
        id: "chandragupta-ii",
        name: "Chandragupta II Vikramaditya",
        fact: "Gupta (c. 375–415 CE)",
        context: "Defeated Shakas · Fa-Hien (Chinese pilgrim) visit · Navaratnas including Kalidasa · Iron Pillar Mehrauli",
        playbookSlug: "ancient-india",
      },
      {
        id: "harshavardhana-r",
        name: "Harshavardhana",
        fact: "Pushyabhuti / Vardhana (606–647 CE)",
        context: "Kannauj capital · Xuanzang visit · Harshacharita by Banabhatta · last great Hindu emperor of north India",
        playbookSlug: "ancient-india",
      },
      {
        id: "rajaraja",
        name: "Rajaraja I",
        fact: "Chola (985–1014 CE)",
        context: "Brihadeeswara Temple Thanjavur · naval conquest of Sri Lanka + Maldives · centralised administration",
        playbookSlug: "medieval-india",
      },
      {
        id: "rajendra-i",
        name: "Rajendra I",
        fact: "Chola (1014–1044 CE)",
        context: "Naval expeditions to SE Asia (Sailendra empire) · Gangaikondacholapuram new capital · title Gangaikonda",
        playbookSlug: "medieval-india",
      },
      {
        id: "qutbuddin-aibak",
        name: "Qutbuddin Aibak",
        fact: "Mamluk / Slave dynasty (1206–10)",
        context: "First Delhi Sultanate sultan · Qutub Minar begun · died playing chaugan (polo)",
        playbookSlug: "medieval-india",
      },
      {
        id: "iltutmish",
        name: "Iltutmish",
        fact: "Mamluk (1211–36)",
        context: "Completed Qutub Minar · introduced silver tanka + copper jital · iqta system",
        playbookSlug: "medieval-india",
      },
      {
        id: "razia-sultana",
        name: "Razia Sultana",
        fact: "Mamluk (1236–40)",
        context: "First and only female Sultan of Delhi · Iltutmish's chosen successor · deposed by Turkish nobles",
        playbookSlug: "medieval-india",
      },
      {
        id: "alauddin-khilji",
        name: "Alauddin Khilji",
        fact: "Khilji (1296–1316)",
        context: "Market reforms + price control · Deccan campaigns via Malik Kafur · Mongol invasions repelled",
        playbookSlug: "medieval-india",
      },
      {
        id: "mb-tughlaq",
        name: "Muhammad bin Tughlaq",
        fact: "Tughlaq (1325–51)",
        context: "Capital transfer to Daulatabad · token currency · Ibn Battuta as Qadi · 'wisest fool'",
        playbookSlug: "medieval-india",
      },
      {
        id: "krishnadevaraya",
        name: "Krishnadevaraya",
        fact: "Vijayanagara / Tuluva (1509–29)",
        context: "Captured Raichur 1520, Udayagiri 1514, Kondavidu 1515 · Telugu Amuktamalyada · Paes+Nuniz accounts · Tenali Rama legend",
        playbookSlug: "medieval-india",
        notes: "Krishnadevaraya attacked Orissa Gajapatis early (Udayagiri+Kondavidu); never marched on Gujarat (distractor).",
      },
      {
        id: "babur-r",
        name: "Babur",
        fact: "Mughal founder (1526–30)",
        context: "Panipat I 1526 vs Ibrahim Lodi · Khanwa 1527 vs Rana Sanga · Ghaghra 1529 · Baburnama autobiography",
        playbookSlug: "medieval-india",
      },
      {
        id: "akbar-r",
        name: "Akbar",
        fact: "Mughal (1556–1605)",
        context: "Panipat III 1556 via Bairam Khan · mansabdari (zat+sawar) · Din-i-Ilahi 1582 · Ibadat Khana · jizya abolished · Rajput marriage alliances",
        playbookSlug: "medieval-india",
      },
      {
        id: "shah-jahan",
        name: "Shah Jahan",
        fact: "Mughal (1628–58)",
        context: "Taj Mahal for Mumtaz · Red Fort + Jama Masjid + Peacock Throne · deposed by Aurangzeb 1658, imprisoned in Agra Fort till 1666",
        playbookSlug: "medieval-india",
      },
      {
        id: "aurangzeb",
        name: "Aurangzeb",
        fact: "Mughal (1658–1707)",
        context: "Deccan campaigns · executed Guru Tegh Bahadur 1675 · Shivaji died 1680 · jizya restored 1679 · longest reign 49 yr · empire's peak then decline",
        playbookSlug: "medieval-india",
      },
      {
        id: "shivaji",
        name: "Shivaji",
        fact: "Maratha founder (1674 coronation)",
        context: "Coronation at Raigad Jun 6 1674 · guerrilla tactics vs Mughals + Bijapur · Ashtapradhan council of 8 ministers",
        playbookSlug: "medieval-india",
      },
      {
        id: "guru-nanak",
        name: "Guru Nanak",
        fact: "Sikh 1st Guru (1469–1539)",
        context: "Founded Sikhism · Talwandi (now Nankana Sahib Pakistan) · Ik Onkar · Kartarpur final years",
        playbookSlug: "medieval-india",
      },
      {
        id: "guru-gobind-singh",
        name: "Guru Gobind Singh",
        fact: "Sikh 10th Guru (1666–1708)",
        context: "Founded Khalsa 1699 Baisakhi at Anandpur Sahib · 5 Ks (kesh, kangha, kara, kachera, kirpan) · died Nanded · ended human Guru lineage (Guru Granth Sahib became Guru)",
        playbookSlug: "medieval-india",
        notes: "Khalsa = Guru Gobind Singh 1699 (NOT Guru Nanak — distractor).",
      },
      {
        id: "lachit-borphukan",
        name: "Lachit Borphukan",
        fact: "Ahom general (1671 Saraighat)",
        context: "Defeated Aurangzeb's general Ram Singh I on Brahmaputra · saved Assam from Mughal annexation · son of Momai Tamuli Borbarua",
        playbookSlug: "medieval-india",
      },
    ],
  },
  {
    theme: "Reformers ↔ movement ↔ key text",
    blurb:
      "19th Century Social and Religious Reform — the densest-%HARD Modern India subtopic (17 q · 41% HARD). Distractor relentlessly swaps reformer↔movement↔text triples. Memorise the triple, not just the pair.",
    columns: {
      name: "Reformer",
      fact: "Movement / Society",
      context: "Key text + year + note",
    },
    entries: [
      {
        id: "rmroy",
        name: "Raja Ram Mohan Roy",
        fact: "Brahmo Samaj 1828",
        context: "Tuhfat-ul-Muwahhidin (against polytheism, in Persian) · championed Sati abolition 1829 via Bentinck's Regulation XVII",
        playbookSlug: "modern-india",
        notes: "Brahmo Samaj 1828 — NOT Arya Samaj (which is Dayanand 1875). Distractor swaps these two relentlessly.",
      },
      {
        id: "debendranath-tagore",
        name: "Debendranath Tagore",
        fact: "Brahmo Samaj continuator",
        context: "Father of Rabindranath · Tattvabodhini Sabha 1839 (later merged into Brahmo) · Brahmo Dharma Granth",
        playbookSlug: "modern-india",
      },
      {
        id: "kc-sen",
        name: "Keshub Chandra Sen",
        fact: "Brahmo split (1866) → Sadharan Brahmo Samaj 1878",
        context: "Civil Marriage Act 1872 (Brahmo marriages) · Bharatvarshiya Brahmo Samaj 1866 then split with Sadharan Brahmo 1878",
        playbookSlug: "modern-india",
      },
      {
        id: "dayanand",
        name: "Dayanand Saraswati",
        fact: "Arya Samaj 1875 Bombay",
        context: "Satyarth Prakash 1875 · 'back to the Vedas' · shuddhi reconversion · against idolatry + caste + child marriage",
        playbookSlug: "modern-india",
      },
      {
        id: "vivekananda",
        name: "Swami Vivekananda",
        fact: "Ramakrishna Mission 1897 Belur Math",
        context: "Disciple of Ramakrishna Paramhansa · Chicago Parliament of Religions 1893 'Sisters and Brothers of America' · Karma Yoga + Bhakti Yoga",
        playbookSlug: "modern-india",
      },
      {
        id: "annie-besant",
        name: "Annie Besant",
        fact: "Theosophical Society (Adyar HQ) + Home Rule League 1916",
        context: "British socialist → joined Theosophy 1889 → led from Adyar 1907 onwards · Home Rule for India 1916 Madras · first woman INC president 1917 Calcutta",
        playbookSlug: "modern-india",
      },
      {
        id: "phule",
        name: "Jyotirao Phule",
        fact: "Satyashodhak Samaj 1873 Pune",
        context: "Gulamgiri (anti-caste polemic) · championed women's + Dalit education · Bhide Wada first girls' school 1848",
        playbookSlug: "modern-india",
      },
      {
        id: "vidyasagar",
        name: "Ishwar Chandra Vidyasagar",
        fact: "Widow Remarriage advocacy",
        context: "Hindu Widow Remarriage Act 1856 (Dalhousie passed) · Marriage of Hindu Widows treatise · Sanskrit College Calcutta · Bengali primer Borno Porichoy",
        playbookSlug: "modern-india",
      },
      {
        id: "syed-ahmad-khan",
        name: "Sir Syed Ahmad Khan",
        fact: "Aligarh Movement — MAO College 1875 (AMU 1920)",
        context: "Asbab-e-Baghawat-e-Hind (Causes of Indian Mutiny) · loyalist modernisation of Muslim education · two-nation theory roots",
        playbookSlug: "modern-india",
      },
      {
        id: "derozio",
        name: "Henry Louis Vivian Derozio",
        fact: "Young Bengal movement (1820s–30s)",
        context: "Hindu College Calcutta lecturer · radical free-thinking · died young 1831 · rationalist + reformist students",
        playbookSlug: "modern-india",
      },
      {
        id: "pandita-ramabai",
        name: "Pandita Ramabai",
        fact: "Arya Mahila Samaj 1882 · Sharada Sadan 1889 Pune",
        context: "First Indian woman fellow of Cheltenham Ladies' College · championed widows + women's education · Mukti Mission Kedgaon",
        playbookSlug: "modern-india",
      },
      {
        id: "narayan-guru",
        name: "Sri Narayana Guru",
        fact: "SNDP Yogam 1903 Kerala",
        context: "Ezhava reform · 'One Caste, One Religion, One God' · Aruvippuram Pratishtha 1888 (consecrated Shiva idol against Brahminical norms)",
        playbookSlug: "modern-india",
      },
      {
        id: "kabir",
        name: "Kabir",
        fact: "Bhakti — Nirgun (15C Banaras)",
        context: "Weaver caste · disciple of Ramananda · Bijak + Sakhi + Ramaini · Kabir Panth · taught Hindu-Muslim unity",
        playbookSlug: "medieval-india",
      },
      {
        id: "tulsidas",
        name: "Tulsidas",
        fact: "Bhakti — Saguna Ram (16C)",
        context: "Awadhi Ramcharitmanas · Hanuman Chalisa · Vinaya Patrika · Banaras-Ayodhya · Vishnu/Ram devotion",
        playbookSlug: "medieval-india",
      },
      {
        id: "mirabai",
        name: "Mirabai",
        fact: "Bhakti — Saguna Krishna (16C Rajasthan-Mewar)",
        context: "Rajput princess (Mewar royal family) · Krishna devotion · padas in Brajbhasha + Rajasthani · defied caste + gender norms",
        playbookSlug: "medieval-india",
      },
      {
        id: "shankardeva",
        name: "Srimanta Shankardeva",
        fact: "Ekasarana-Dharma / Mahapuruxiya (Assam Vaishnavism, late 15C-early 16C)",
        context: "Founded Vaishnavism in Assam · Borgeet devotional songs · Ankia Naat plays · Sattras as monastic institutions",
        playbookSlug: "medieval-india",
        notes: "Shankardeva = Assam Vaishnavism (Ekasarana/Mahapuruxiya), NOT Gaudiya Vaishnavism (which is Chaitanya's Bengal movement). 2025 HARD PYQ tests this.",
      },
      {
        id: "chaitanya",
        name: "Chaitanya Mahaprabhu",
        fact: "Gaudiya Vaishnavism (Bengal, 1486–1534)",
        context: "Krishna-Radha bhakti · Mayapur birth · Sankirtana congregational chanting · Six Goswamis of Vrindavana as disciples",
        playbookSlug: "medieval-india",
      },
    ],
  },
  {
    theme: "Scholars ↔ texts ↔ era",
    blurb:
      "Author/text pair recall across all 4 chapters. Highest leverage on Ancient Indian Literature (12 q · 42% HARD — chapter's densest %HARD) and Vijayanagara/Mughal literature. Distractor swaps author↔text or text↔patron-era.",
    columns: {
      name: "Scholar / Author",
      fact: "Text",
      context: "Era / patron + genre + significance",
    },
    entries: [
      {
        id: "vyasa",
        name: "Vyasa",
        fact: "Mahabharata (Itihasa, ~100,000 verses)",
        context: "Includes Bhagavad Gita (Krishna-Arjuna dialogue on Kurukshetra) · longest epic poem in world literature",
        playbookSlug: "ancient-india",
      },
      {
        id: "valmiki",
        name: "Valmiki",
        fact: "Ramayana (Itihasa, ~24,000 verses)",
        context: "Adi Kavya (first poem) · 7 kandas · Rama's story · NOT Mahabharata (distractor swaps these)",
        playbookSlug: "ancient-india",
      },
      {
        id: "panini",
        name: "Panini",
        fact: "Ashtadhyayi (Vyakarana / Sanskrit grammar)",
        context: "8 chapters · ~4000 sutras · ~500 BCE · world's earliest formal grammar of any language",
        playbookSlug: "ancient-india",
      },
      {
        id: "kautilya",
        name: "Kautilya / Chanakya",
        fact: "Arthashastra (statecraft)",
        context: "Mauryan PM under Chandragupta Maurya · 15 books · political economy + diplomacy + war + spy networks",
        playbookSlug: "ancient-india",
      },
      {
        id: "sushruta",
        name: "Sushruta",
        fact: "Sushruta Samhita (Ayurveda — surgery)",
        context: "Father of surgery · cataract + plastic surgery + rhinoplasty · Chakrapanidatta wrote 11C Bengal commentary",
        playbookSlug: "ancient-india",
        notes: "Sushruta Samhita commentary by Chakrapanidatta (11C Bengal) is a 2024 HARD PYQ answer.",
      },
      {
        id: "charaka",
        name: "Charaka",
        fact: "Charaka Samhita (Ayurveda — internal medicine)",
        context: "Kanishka's court (1C-2C CE) · 8 sthanas · medicine + pharmacology · companion to Sushruta's surgical Samhita",
        playbookSlug: "ancient-india",
      },
      {
        id: "kalidasa",
        name: "Kalidasa",
        fact: "Abhijnanasakuntalam + Meghaduta + Kumarasambhava",
        context: "Gupta-era poet · one of Vikramaditya's Navaratnas · Sanskrit drama + lyrical poetry peak",
        playbookSlug: "ancient-india",
      },
      {
        id: "banabhatta",
        name: "Banabhatta",
        fact: "Harshacharita + Kadambari",
        context: "Harshavardhana's court poet (7C) · Harshacharita = historical biography · Kadambari = romantic prose",
        playbookSlug: "ancient-india",
      },
      {
        id: "kalhana",
        name: "Kalhana",
        fact: "Rajatarangini (Kashmir's history)",
        context: "12C Sanskrit chronicle · earliest extant historical narrative from Kashmir · used by Mughal-era historians",
        playbookSlug: "medieval-india",
      },
      {
        id: "tolkappiyam",
        name: "Tolkappiyar",
        fact: "Tolkappiyam",
        context: "Oldest extant Tamil grammar · Sangam era · phonology + morphology + syntax + poetics + rhetoric",
        playbookSlug: "ancient-india",
      },
      {
        id: "amir-khusrau",
        name: "Amir Khusrau",
        fact: "Tarikh-e-Alai + Tughluq-Nama + Hindavi poems",
        context: "Sultanate-era polymath · disciple of Nizamuddin Auliya · 'Parrot of India' · attributed development of Hindavi + Khayal music",
        playbookSlug: "medieval-india",
      },
      {
        id: "barani",
        name: "Ziauddin Barani",
        fact: "Tarikh-i-Firoz Shahi + Fatawa-i-Jahandari",
        context: "14C historian · Delhi Sultanate chronicle · political theory of Islamic kingship",
        playbookSlug: "medieval-india",
      },
      {
        id: "abul-fazl",
        name: "Abul Fazl",
        fact: "Ain-i-Akbari + Akbarnama",
        context: "Akbar's court historian + Navratan · Persian · detailed administrative + statistical account of Mughal empire",
        playbookSlug: "medieval-india",
      },
      {
        id: "jahangir",
        name: "Jahangir",
        fact: "Tuzuk-i-Jahangiri (autobiography)",
        context: "Mughal emperor + autobiographer · Persian · personal account of reign + court · art patronage",
        playbookSlug: "medieval-india",
      },
      {
        id: "babur-baburnama",
        name: "Babur",
        fact: "Baburnama (autobiography)",
        context: "Mughal founder + autobiographer · Chagatai Turkic original (translated to Persian later) · candid memoir of conquests + culture · first major South Asian autobiography",
        playbookSlug: "medieval-india",
      },
      {
        id: "krishnadevaraya-author",
        name: "Krishnadevaraya",
        fact: "Amuktamalyada (Telugu) + Jambavati Kalyanam (Sanskrit)",
        context: "Vijayanagara emperor + poet · Telugu poetry's golden age · advice to king · patron of Tenali Rama + Vyasaraya",
        playbookSlug: "medieval-india",
      },
      {
        id: "ibn-battuta",
        name: "Ibn Battuta",
        fact: "Rihla (Travels)",
        context: "14C Moroccan traveller · served as Qadi under Muhammad bin Tughlaq in Delhi · Arabic travelogue",
        playbookSlug: "medieval-india",
      },
      {
        id: "alberuni",
        name: "Al-Biruni",
        fact: "Kitab-ul-Hind (Tahqiq-i-Hind)",
        context: "11C Persian scholar with Mahmud of Ghazni · Arabic study of Indian society + philosophy + science · ethnography of Hinduism",
        playbookSlug: "medieval-india",
      },
      {
        id: "nikitin",
        name: "Afanasii Nikitin",
        fact: "Voyage Beyond Three Seas",
        context: "15C Russian merchant from Tver · Bahmani Sultanate + Vijayanagara · Slavic-Persian-Arabic travelogue",
        playbookSlug: "medieval-india",
      },
      {
        id: "bernier",
        name: "François Bernier",
        fact: "Travels in the Mogul Empire",
        context: "17C French physician · Aurangzeb's court · social-economic critique of Mughal land system + jagirdari",
        playbookSlug: "medieval-india",
      },
    ],
  },
  {
    theme: "Viceroys / British Acts ↔ year",
    blurb:
      "British Administration, Acts and Legislation — 16 q · 38% HARD. The chronological backbone of Modern India HARDs. Memorise Act ↔ year ↔ key provision triples cold; distractor mixes Charter Acts with GoI Acts.",
    columns: {
      name: "Act / Viceroy",
      fact: "Year",
      context: "Key provision + viceroy/PM responsible",
    },
    entries: [
      {
        id: "regulating-act-row",
        name: "Regulating Act",
        fact: "1773",
        context: "British Parliament regulates EIC · Warren Hastings as GG of Bengal · Supreme Court at Calcutta",
        playbookSlug: "modern-india",
      },
      {
        id: "pitts-india",
        name: "Pitt's India Act",
        fact: "1784",
        context: "Established Board of Control (London) over EIC political matters · separated political + commercial functions",
        playbookSlug: "modern-india",
      },
      {
        id: "charter-1813-row",
        name: "Charter Act 1813",
        fact: "1813",
        context: "Broke EIC commercial monopoly (except tea + China trade) · £1 lakh/yr Indian education · missionary entry",
        playbookSlug: "modern-india",
      },
      {
        id: "charter-1833-row",
        name: "Charter Act 1833",
        fact: "1833",
        context: "Bentinck = first GG of INDIA (was GG of Bengal earlier) · ended EIC's commercial role · Macaulay's education minute · centralised legislation",
        playbookSlug: "modern-india",
      },
      {
        id: "charter-1853",
        name: "Charter Act 1853",
        fact: "1853",
        context: "Separated legislative + executive councils · introduced civil services COMPETITIVE EXAM (open to Indians)",
        playbookSlug: "modern-india",
      },
      {
        id: "goi-1858-row",
        name: "Government of India Act 1858",
        fact: "1858",
        context: "Post-1857 Mutiny · ended EIC + Crown direct rule · Secretary of State for India + India Council (London) · Viceroy + Council (India)",
        playbookSlug: "modern-india",
      },
      {
        id: "ic-act-1861",
        name: "Indian Councils Act 1861",
        fact: "1861",
        context: "Reformed legislative council · portfolio system (Canning) · non-official Indian members allowed (token)",
        playbookSlug: "modern-india",
      },
      {
        id: "ic-act-1892",
        name: "Indian Councils Act 1892",
        fact: "1892",
        context: "Expanded legislative councils · indirect election + nomination · still no representative government",
        playbookSlug: "modern-india",
      },
      {
        id: "morley-minto-row",
        name: "Morley-Minto Reforms (Indian Councils Act 1909)",
        fact: "1909",
        context: "Separate electorates for Muslims (first communal representation) · expanded provincial councils · Indians on Viceroy's Executive Council",
        playbookSlug: "modern-india",
      },
      {
        id: "rowlatt-row",
        name: "Rowlatt Act",
        fact: "1919",
        context: "Anarchical and Revolutionary Crimes Act · arrest + detention without trial · Gandhi launched Rowlatt Satyagraha · Jallianwala Bagh massacre Apr 13 1919",
        playbookSlug: "modern-india",
      },
      {
        id: "goi-1919-row",
        name: "Government of India Act 1919 (Montagu-Chelmsford)",
        fact: "1919",
        context: "Introduced DIARCHY in provinces (transferred + reserved subjects) · bicameral central legislature · still no responsible government at centre",
        playbookSlug: "modern-india",
      },
      {
        id: "simon-commission",
        name: "Simon Commission",
        fact: "1927–28",
        context: "All-British commission to review GoI Act 1919 · NO Indian members → 'Go Back Simon' protests · Lala Lajpat Rai injured in Lahore lathi charge → died Nov 1928",
        playbookSlug: "modern-india",
      },
      {
        id: "goi-1935-row",
        name: "Government of India Act 1935",
        fact: "1935",
        context: "Provincial autonomy · all-India federation with princely states (never operationalised — princes refused) · separate electorates expanded · basis for 1950 Constitution",
        playbookSlug: "modern-india",
      },
      {
        id: "independence-act",
        name: "Indian Independence Act 1947",
        fact: "1947",
        context: "Aug 14 Pakistan + Aug 15 India · Mountbatten Plan Jun 3 · partition into 2 dominions · 1947 Aug 15 ended British paramountcy over princely states",
        playbookSlug: "modern-india",
      },
      {
        id: "dalhousie",
        name: "Lord Dalhousie",
        fact: "Viceroy 1848–56",
        context: "Doctrine of Lapse (Satara 1848, Jhansi 1853, Nagpur 1854, Awadh annexed 1856) · railways introduced 1853 Bombay-Thane · telegraph + postal reform · Widow Remarriage Act 1856",
        playbookSlug: "modern-india",
      },
      {
        id: "canning",
        name: "Lord Canning",
        fact: "GG 1856–58 + first Viceroy 1858–62",
        context: "Faced 1857 Revolt · Queen's Proclamation 1858 · IC Act 1861 portfolio system · 'Clemency Canning' policy after Mutiny",
        playbookSlug: "modern-india",
      },
      {
        id: "curzon",
        name: "Lord Curzon",
        fact: "Viceroy 1899–1905",
        context: "Partition of Bengal 1905 → Swadeshi Movement · Indian Archaeological Survey (ASI) revival · Ancient Monuments Preservation Act 1904",
        playbookSlug: "modern-india",
      },
      {
        id: "mountbatten",
        name: "Lord Mountbatten",
        fact: "Last Viceroy 1947 + first GG of free India 1947–48",
        context: "Mountbatten Plan Jun 3 1947 · partition + transfer of power Aug 14–15 · supervised integration of princely states",
        playbookSlug: "modern-india",
      },
    ],
  },
];

/** Quick stats for the timeline-and-pairs hero. */
export const REFERENCE_STATS = {
  facts: REFERENCE_CLUSTERS.reduce((s, c) => s + c.entries.length, 0),
  clusters: REFERENCE_CLUSTERS.length,
};
