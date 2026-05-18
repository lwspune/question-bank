/**
 * Per-playbook deep-dive content for /guide/nda-history/playbooks/{slug}.
 *
 * Each entry mirrors geography/biology/chemistry/physics/english shape:
 * trigger (one-line "when to reach for this"), story (2–3 paragraph teacherly
 * explanation), sub-skills (the rules / patterns inside), traps (chapter-
 * specific distractor shapes), worked example UUIDs (2 per playbook,
 * resolved via loadWorkedExamples at request time), and relatedSlugs
 * (cross-links to other playbooks).
 *
 * UUIDs SQL-picked 2026-05-19 against the live 260-q NDA History PUBLIC
 * bank — most-recent year first, HARD picked when the chapter has a HARD
 * pool. All 4 chapters have details.
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
  // ───────────────────────────── CORNERSTONE ─────────────────────────────
  "modern-india": {
    trigger:
      "A Freedom Movement question (INC session, Gandhi satyagraha, leader-movement pair), a reformer ↔ movement question (Brahmo/Arya/Theosophical), a British Act ↔ year question (Regulating Act 1773 / Charter Act 1813 / GoI Acts 1909/1919/1935), an early-British-conquest question (Plassey/Buxar/Diwani), a Post-Independence question (Five Year Plans, integration of states), or a British Economic Policy question (drain of wealth, deindustrialization).",
    story: [
      "122 q in 10 years — NDA History's largest chapter AND densest-HARD chapter (34% HARD). Freedom Movement — INC, Gandhi and Independence is the chapter giant (56 q · 34% HARD — 46% of Modern India's content). The HARD-pool concentration is in the SHORTER subtopics: 19th Century Social and Religious Reform (17 q · 41% HARD — chapter's densest %HARD) and British Economic Policy (9 q · 44% HARD — highest %HARD subtopic). But you can't legitimately 'cherry-pick around HARDs' the way Physics's DrillPosture would suggest — Freedom Movement IS the chapter, and its 19 HARDs across 56 q are the difference between 12-mark and 18-mark Modern India scores.",
      "INC sessions year-by-year are the chronological backbone: Bombay 1885 (Hume's founding), Calcutta 1886 (Dadabhai Naoroji second president), Madras 1887 (Badruddin Tyabji third president), Calcutta 1906 (Swaraj resolution, Naoroji's third term), Surat 1907 (Moderate-Extremist split), Lucknow 1916 (Tilak rejoined; Lucknow Pact INC-Muslim League unity), Calcutta 1917 (Annie Besant first woman president), Nagpur 1920 (Non-Cooperation adoption), Ahmedabad 1921 (Hasrat Mohani — first to demand Purna Swaraj), Lahore 1929 (Purna Swaraj resolution, midnight pledge), Karachi 1931 (Fundamental Rights resolution after Bhagat Singh execution), Lucknow 1936 (Nehru's address on socialism), Faizpur 1936 (first rural session), Haripura 1938 (Bose's first term), Tripuri 1939 (Bose's second term, defeated Pattabhi Sitaramayya then resigned), Ramgarh 1940, Meerut 1946 (last pre-independence). Gandhi's satyagrahas in order: Champaran 1917 (indigo, Bihar) → Kheda 1918 (peasant revenue) → Ahmedabad 1918 (mill workers) → Rowlatt 1919 (Jallianwala Bagh follow-up) → Khilafat-Non-Cooperation 1920 → Bardoli 1928 → Civil Disobedience-Salt March 1930 → Round Table Conferences 1930–32 → Quit India 1942.",
      "19th Century Social and Religious Reform (17 q · 41% HARD) tests reformer↔movement↔text triples that NDA distractor-swaps relentlessly. Memorise: Raja Ram Mohan Roy / Brahmo Samaj 1828 / Tuhfat-ul-Muwahhidin (also Sati abolition 1829 via Bentinck's Regulation XVII). Debendranath Tagore (continued Brahmo). Keshub Chandra Sen (Sadharan Brahmo 1878). Dayanand Saraswati / Arya Samaj 1875 / Satyarth Prakash (Vedic revivalism, shuddhi). Vivekananda / Ramakrishna Mission 1897 (post-Chicago 1893). Annie Besant / Theosophical Society (Adyar headquarters; Home Rule League). Jyotirao Phule / Satyashodhak Samaj 1873 (anti-caste). Ishwarchand Vidyasagar (Widow Remarriage Act 1856). Henry Vivian Derozio (Young Bengal). Pandita Ramabai (Arya Mahila Samaj 1882). Aligarh Movement — Syed Ahmad Khan (MAO College 1875 → AMU 1920). British Acts: Regulating Act 1773 (Warren Hastings as GG of Bengal), Pitt's India Act 1784 (Board of Control), Charter Act 1813 (broke EIC trade monopoly except tea+China; £100k for education), Charter Act 1833 (Bentinck as first GG of INDIA), Charter Act 1853 (separated executive+legislative; civil services competitive), GoI Act 1858 (Crown rule, Secretary of State for India), Indian Councils Act 1861/1892 (representation expansion), Morley-Minto 1909 (separate electorates), Montagu-Chelmsford 1919 (diarchy in provinces), GoI Act 1935 (provincial autonomy, federal scheme), Indian Independence Act 1947.",
    ],
    subSkills: [
      {
        name: "INC session ↔ year ↔ location ↔ president",
        description:
          "Anchor at least 10 INC sessions cold: Bombay 1885 (Womesh Banerjee), Calcutta 1886 (Dadabhai Naoroji), Lucknow 1916 (AC Mazumdar — Lucknow Pact with ML), Calcutta 1917 (Annie Besant — first woman), Nagpur 1920 (C Vijayaraghavachariar — Non-Cooperation), Lahore 1929 (Nehru — Purna Swaraj), Karachi 1931 (Vallabhbhai Patel — Fundamental Rights resolution), Haripura 1938 (Bose first term), Tripuri 1939 (Bose second term — defeated Pattabhi Sitaramayya then resigned), Ramgarh 1940 (Maulana Azad — Bose excluded). Distractor swaps president↔location or session↔year.",
      },
      {
        name: "Reformer ↔ movement ↔ key text triple",
        description:
          "Memorise the triple cold (distractors swap any pair): Ram Mohan Roy / Brahmo Samaj 1828 / Tuhfat-ul-Muwahhidin. Dayanand / Arya Samaj 1875 / Satyarth Prakash. Vivekananda / Ramakrishna Mission 1897 / Karma Yoga. Annie Besant / Theosophical Society / The Secret Doctrine (Blavatsky's text she popularised). Sir Syed Ahmad Khan / Aligarh Movement / Asbab-e-Baghawat-e-Hind. Jyotirao Phule / Satyashodhak Samaj 1873 / Gulamgiri. Vidyasagar / Widow Remarriage Act 1856 / Marriage of Hindu Widows. RamMohan-Sati abolition is Bentinck 1829 (regulation, not act).",
      },
      {
        name: "British Act ↔ year — date anchoring",
        description:
          "The chronology backbone of Modern India HARD questions. Regulating Act 1773 → Pitt's India Act 1784 → Charter Acts 1793, 1813, 1833, 1853 → GoI Act 1858 (post-1857 Mutiny) → Indian Councils Acts 1861, 1892 → Morley-Minto 1909 → Montagu-Chelmsford 1919 (Government of India Act 1919) → GoI Act 1935 → Indian Independence Act 1947. The trick: Charter Acts are about EIC (commercial monopoly), GoI Acts are about governance (post-Crown rule). Distractor mixes Charter and GoI act years.",
      },
      {
        name: "Gandhian satyagraha chronological sequence",
        description:
          "Champaran 1917 (indigo, Tirhut Bihar) → Kheda 1918 (revenue suspension, Gujarat — first Sardar Patel collab) → Ahmedabad 1918 (textile mill workers strike, first hunger strike) → Rowlatt 1919 (Jallianwala Bagh massacre April 13) → Non-Cooperation 1920–22 (Chauri Chaura Feb 1922 incident → withdrawal) → Bardoli 1928 (Patel led, revenue, Gujarat) → Civil Disobedience-Salt March 1930 (Dandi March Mar 12 – Apr 6) → Round Tables 1930–32 → Poona Pact 1932 → Quit India 1942 (Aug 9, 'Do or Die'). Common distractor: places Champaran AFTER Ahmedabad, or claims Quit India preceded Civil Disobedience.",
      },
      {
        name: "Plassey vs Buxar vs Diwani — early conquest sequence",
        description:
          "Plassey 1757 (Robert Clive vs Siraj-ud-Daulah of Bengal — won by Mir Jafar's defection; British became dominant in Bengal). Buxar 1764 (Hector Munro vs combined forces of Mir Qasim of Bengal + Shuja-ud-Daulah of Awadh + Mughal Emperor Shah Alam II — won decisively, established military supremacy). Treaty of Allahabad 1765 (Diwani of Bengal-Bihar-Orissa granted to EIC by Shah Alam II — fiscal control). Distractor swaps Plassey-Buxar dates or claims Plassey gave EIC Diwani (it didn't — that came via Buxar→Allahabad 1765).",
      },
    ],
    traps: [
      {
        name: "Reformer ↔ movement swap (Brahmo-vs-Arya)",
        description:
          "Distractor pairs Ram Mohan Roy with Arya Samaj (wrong — Brahmo Samaj 1828; Arya is Dayanand 1875), or Dayanand with Brahmo (wrong). Aligarh is Syed Ahmad Khan (NOT Sayyid Ahmad of Rae Bareli — that's the 1820s Mujahidin/Wahhabi movement). Theosophical is Blavatsky + Olcott founded 1875 NY, Annie Besant joined 1889 and led from Adyar 1907 onwards. The 2025 HARD match-list PYQ tests this directly.",
      },
      {
        name: "Charter Act vs GoI Act year swap",
        description:
          "Distractor pairs 'Charter Act' with 1858 (wrong — that's GoI Act post-Crown-rule), or 'GoI Act 1813' (wrong — that's Charter Act 1813). Charter Acts are 1793/1813/1833/1853 (every 20 years for EIC renewal). GoI Acts are 1858/1909/1919/1935. Distractor mixes Indian Councils Acts (1861/1892) with GoI Acts (different scope: councils acts expanded representation in existing councils, GoI Acts restructured government).",
      },
      {
        name: "Gandhi satyagraha out-of-sequence",
        description:
          "Distractor places Quit India 1942 before Civil Disobedience 1930, or Champaran after Ahmedabad. Chronological-order questions require absolute date anchoring. Champaran 1917 was Gandhi's FIRST satyagraha in India; Quit India 1942 was his LAST major mass movement. The interim is Non-Cooperation 1920 → Civil Disobedience 1930 → Quit India 1942 — the three big phases of Gandhian mass politics.",
      },
      {
        name: "Pre-Five-Year-Plan plan attribution",
        description:
          "Bombay Plan 1944 (8 INDUSTRIALISTS — JRD Tata, GD Birla, Purushottamdas Thakurdas, Lala Shri Ram, Kasturbhai Lalbhai, AD Shroff, Ardeshir Dalal, John Mathai). Peoples Plan 1945 by MN Roy (post-Marxist socialist). Sarvodaya Plan 1950 by Jaya Prakash Narayan (Gandhian agrarian). Gandhian Plan 1944 by Shriman Narayan Agrawal (decentralised village economy). Distractor over-includes (e.g. 'Nehru Plan' which doesn't exist as a pre-FYP framework) or swaps author↔plan. The 2024 HARD PYQ tests exactly which of these 4 were pre-FYP plans.",
      },
    ],
    exampleQuestionIds: [
      "5db2243e-77a5-444a-ac4b-a82ce0635bdf", // HARD 2025-2 — Reformer match-list
      "743fd8ef-320e-4635-a77c-2409894d47c6", // HARD 2024-2 — Pre-FYP plans
    ],
    relatedSlugs: ["medieval-india", "ancient-india", "world-history"],
  },

  // ─────────────────────────── FOUNDATION RECALL ───────────────────────────
  "medieval-india": {
    trigger:
      "A Mughal Empire question (Akbar/Aurangzeb/Shah Jahan administration, mansabdari, jizya), a Vijayanagara question (Krishnadevaraya campaigns, Hampi, Talikota 1565), a Bhakti or Sufi figure question (Kabir/Tulsidas/Shankardeva/Chaitanya, Chishti/Suhrawardi orders), a foreign-traveller question (Ibn Battuta/Marco Polo/Nikitin/Bernier), or a Chola/Rajput/Ahom/Sikh question (Saraighat 1671, Chola maritime, Sikh Gurus).",
    story: [
      "53 q in 10 years, 28% HARD. The DIFFUSE-HARD chapter — 6 subtopics carry 3-3-3-3-2-1 HARDs, no cherry-pick lever. The chapter is recall-heavy (64% pure recall) with strong paired-fact lever (ruler ↔ dynasty ↔ achievement). Medieval Travellers, Trade and Crops (11 q · 27% HARD) is the chapter's largest subtopic — and the only one with a chronology component (foreign-traveller-by-era ordering is a 2025 HARD PYQ). Mughal Empire (10 q · 30% HARD) + Vijayanagara Empire (9 q · 33% HARD) are the named-fact workhorses.",
      "Mughal lineage: Babur (1526 Panipat-I vs Ibrahim Lodi → Khanwa 1527 vs Rana Sanga → Ghaghra 1529 vs Afghans → died 1530). Humayun (defeated by Sher Shah Suri at Chausa 1539 + Kannauj 1540 → exile in Persia → returned 1555 with Persian aid → died 1556). Akbar 1556–1605 (third battle of Panipat 1556 won via Bairam Khan; mansabdari system — zat + sawar ranks; revenue: dahsala/ain-i-dahsala by Todar Mal; Din-i-Ilahi 1582 syncretic faith; Ibadat Khana religious discussions; jizya abolished; Rajput marriage alliances; conquered Gujarat 1572, Bengal 1576, Kashmir 1586, Deccan partially). Jahangir 1605–27 (Mehrunissa = Nur Jahan; captured Kandahar but lost it back). Shah Jahan 1628–58 (Taj Mahal for Mumtaz, Red Fort, Peacock Throne, Jama Masjid; deposed by Aurangzeb 1658 → imprisoned in Agra Fort till 1666). Aurangzeb 1658–1707 (Deccan campaigns, anti-Sikh Guru Tegh Bahadur execution 1675, anti-Marathas Shivaji died 1680, jizya restored 1679, longest reign 49 years). Vijayanagara: Sangama (Harihara + Bukka 1336) → Saluva (Saluva Narasimha 1485) → Tuluva (Vira Narasimha 1505 → Krishnadevaraya 1509–29 — GOLDEN AGE; captured Raichur 1520, Udayagiri 1514, Kondavidu 1515; foreign accounts of Domingo Paes + Fernao Nuniz; Telugu Amuktamalyada; Vyasaraya + Tenali Rama in court) → Aravidu (Sadasiva 1542, Tirumala 1565 post-Talikota). Talikota 1565 vs Deccan Sultanates coalition (Bijapur+Ahmadnagar+Golkonda+Bidar) = end of Vijayanagara political dominance.",
      "Medieval Travellers (11 q) tests traveller-by-era CHRONOLOGY plus origin↔patron details. Order: Al-Biruni (11C — accompanied Mahmud of Ghazni; wrote Kitab-ul-Hind in Arabic). Ibn Battuta (1333–1347 — Muhammad bin Tughlaq's court Delhi; appointed Qadi; Rihla travelogue Arabic). Marco Polo (briefly 13C). Afanasii Nikitin (1469–72 — Russian merchant Tver; Bahmani + Vijayanagara; Voyage Beyond Three Seas). Abdur Razzaq (1442–43 — Persian envoy to Vijayanagara Devaraya II; Matla-us-Sa'dain). Nicolo Conti (15C). Antonio Monserrate (1580–82 — Portuguese Jesuit; Akbar's court; tutored Salim/Jahangir). Ralph Fitch (1583–91 — first English to visit India). Domingo Paes + Fernao Nuniz (1520–35 — Portuguese; Vijayanagara Krishnadevaraya court). Sir Thomas Roe (1615–19 — English ambassador to Jahangir; got trading rights for English EIC). Peter Mundy (1628–34 — English traveller Shah Jahan's reign — wrote on Taj Mahal construction). Bernier (1656–68 — French physician Aurangzeb; Travels in the Mogul Empire). Tavernier (6 voyages 1631–68 — French jeweler; Aurangzeb's court). Manucci (late 1650s–1717 — Italian; served various Mughal courts).",
    ],
    subSkills: [
      {
        name: "Mughal ruler ↔ achievement ↔ year triple",
        description:
          "Babur — Panipat-I 1526 (vs Ibrahim Lodi). Akbar — mansabdari (zat+sawar), Din-i-Ilahi 1582, Ibadat Khana, jizya abolition. Jahangir — Nur Jahan, Kandahar loss. Shah Jahan — Taj Mahal, Red Fort, Peacock Throne, Jama Masjid (architecture peak). Aurangzeb — Deccan, anti-Sikh/Maratha, jizya restored 1679, longest reign 49 yr. Distractor swaps achievements: Akbar's mansabdari attributed to Shah Jahan, or Aurangzeb's jizya-restoration attributed to Jahangir.",
      },
      {
        name: "Vijayanagara dynasty + Krishnadevaraya specifics",
        description:
          "4 dynasties: Sangama (1336–1485, founders Harihara+Bukka I) → Saluva (1485–1505) → Tuluva (1505–1542, golden age under Krishnadevaraya 1509–29) → Aravidu (1542–1646, post-Talikota decline). Krishnadevaraya: captured RAICHUR FORT 1520 (vs Adil Shah of Bijapur), Udayagiri 1514 + Kondavidu 1515 (vs Gajapati of Orissa). Foreign accounts: Paes + Nuniz (Portuguese). Wrote Telugu Amuktamalyada (poetry) — was a poet-king. Patron of Vyasaraya (Madhva theologian) + Tenali Rama (poet-jester legend). Distractor: Krishnadevaraya 'marched against Gujarat' (wrong — he attacked Orissa Gajapatis early; never Gujarat).",
      },
      {
        name: "Bhakti / Sufi figure ↔ region ↔ order/sampradaya",
        description:
          "Bhakti: Kabir (Banaras, nirgun, weaver caste, Kabir Panth). Tulsidas (Awadhi Ramcharitmanas — 16C Banaras-Ayodhya). Surdas (Brajbhasha Sursagar, Krishna-Vatsalya). Mirabai (Rajasthan-Mewar, Krishna devotion, Pada-Kheda). Shankardeva (Assam Vaishnavism — late 15C/early 16C founder of EKASARANA-DHARMA / Mahapuruxiya Dharma — NOT Gaudiya Vaishnavism which is CHAITANYA's Bengal movement). Chaitanya (Bengal Gaudiya Vaishnavism 1486–1534 — Krishna-Radha bhakti, Mayapur birth). Sufi orders: Chishti (Khwaja Moinuddin Chishti at Ajmer 12C; Nizamuddin Auliya Delhi 14C — Delhi Sultanate-era). Suhrawardi (Multan-based, royal-favoured by sultans). Naqshbandi (Akbar's later period, Sirhindi). Qadiri (Aurangzeb's brother Dara Shikoh, syncretic). Distractor: Shankardeva attributed to Gaudiya Vaishnavism (the 2025 HARD PYQ tests this).",
      },
      {
        name: "Foreign traveller chronological order + patron",
        description:
          "Order Al-Biruni 11C → Ibn Battuta 14C (Muhammad bin Tughlaq) → Nikitin 15C (Bahmani+Vijayanagara) → Abdur Razzaq 15C (Vijayanagara Devaraya II) → Monserrate 16C (Akbar Jesuit) → Paes+Nuniz 16C (Krishnadevaraya) → Roe 17C (Jahangir) → Mundy 17C (Shah Jahan) → Bernier+Tavernier+Manucci 17C-18C (Aurangzeb era). The 2025 HARD PYQ requires arranging Mundy (17C) + Monserrate (16C) + Nikitin (15C) + Ibn Battuta (14C) → answer Battuta → Nikitin → Monserrate → Mundy.",
      },
    ],
    traps: [
      {
        name: "Shankardeva attributed to Gaudiya Vaishnavism",
        description:
          "Distractor states Shankardeva founded Gaudiya Vaishnavism (WRONG — that's Chaitanya in Bengal). Shankardeva founded Ekasarana-Dharma / Mahapuruxiya Dharma in Assam (late 15C/early 16C) — Vaishnavism but distinctly Assamese, not Gaudiya. The 2025 HARD multi-statement PYQ tests this: statement 'He was the founder of Gaudiya Vaishnavism' is FALSE. Mnemonic: Shankardeva = Assam Vaishnavism (sankaR + assAM share the 'a'); Chaitanya = Bengal Gaudiya (CHAitanya + benGAla share 'ga').",
      },
      {
        name: "Krishnadevaraya's expedition mistargeting",
        description:
          "Distractor says Krishnadevaraya marched against 'Orissa Gajapatis early in reign' (correct — Udayagiri 1514, Kondavidu 1515 are Orissa-front actions). Distractor says he marched against 'Gujarat' (wrong — never Gujarat) or 'captured Raichur in 1530' (wrong — 1520 in lifetime; 1530 is after his death). Specific year + battle + opponent pairs matter. The 2024 HARD PYQ tests Raichur 1520 (correct) vs early-reign Orissa campaign (correct).",
      },
      {
        name: "Traveller-by-era mis-sequence",
        description:
          "Distractor places Bernier (17C Aurangzeb era) before Ibn Battuta (14C Muhammad bin Tughlaq), or Marco Polo (13C) after Monserrate (16C). Use the patron-era anchor: Battuta = MB Tughlaq = 1300s; Razzaq = Devaraya II Vijayanagara = 1400s; Paes+Nuniz = Krishnadevaraya = 1500s; Mundy = Shah Jahan = 1600s; Bernier+Tavernier+Manucci = Aurangzeb = mid-1600s onwards.",
      },
      {
        name: "Chola/Ahom/Sikh chronology confusion",
        description:
          "Cholas peaked in 9C–13C (Rajaraja I 985–1014, Rajendra I 1014–44 — sent naval expeditions to SE Asia, Sailendra empire). Distractor places Cholas in 15C or claims they ruled north India. Ahoms: Battle of Saraighat 1671 — Lachit Borphukan defeated Mughals (Ram Singh I commanding Aurangzeb's forces). Sikhs: Guru Nanak 1469–1539, Guru Tegh Bahadur executed 1675 by Aurangzeb, Guru Gobind Singh 1666–1708 (Khalsa founded 1699 Baisakhi). Distractor mis-attributes Khalsa to Guru Nanak (wrong — that's Gobind Singh 1699).",
      },
    ],
    exampleQuestionIds: [
      "ad1b4218-344f-474e-ab75-1961f437adda", // HARD 2025-2 — Traveller chronology
      "8e23ac0b-ba08-40ac-bfb5-437a53aa87af", // HARD 2025-1 — Shankardeva Vaishnavism
    ],
    relatedSlugs: ["ancient-india", "modern-india", "world-history"],
  },

  "ancient-india": {
    trigger:
      "A Harappan question (Mohenjo-daro, Dholavira, Lothal, town planning), a Vedic / Upanishadic literature question (Rigveda oldest, six Vedangas, Smritis), an Ashokan inscription or Mauryan administration question (Major/Minor Rock Edicts, dhamma-mahamatta, Kautilya's Arthashastra), a Buddhism / Jainism question (4 Noble Truths, tirthankaras, stupa architecture), a Sangam-period question (3 sangams, Tamil literature), or a foreign-account question (Megasthenes' Indica, Greek/Roman coins).",
    story: [
      "44 q in 10 years, 27% HARD. The MOST recall-heavy NDA History chapter — 75% pure named-fact recall, only 5% date-anchored (compare Modern at 33% date-anchored). The chapter is six small subtopics: Literature + Inscriptions (12 q · 42% HARD — chapter's densest %HARD) is the highest-leverage drill target. Harappan (9 q · 33% HARD) + Mahajanapadas-Mauryan (8 q · 13% HARD) + Buddhism-Jainism (6 q · 0% HARD — guaranteed marks pocket) + Society-Trade-Foreign (5 q · 40% HARD) + Post-Mauryan-Gupta-Sangam (4 q · 25% HARD) round out the chapter.",
      "Ancient Indian Literature and Inscriptions (12 q · 42% HARD — densest %HARD subtopic in chapter) is the chapter's keystone. Vedas: Rigveda (oldest — 1500–1000 BCE; 10 mandalas; hymns to Indra/Agni/Varuna). Yajurveda (rituals — Shukla/Krishna recensions). Samaveda (music — basis of Indian classical music). Atharvaveda (folk magic + medicine; newest of the 4). Six Vedangas: Shiksha (phonetics), Kalpa (rituals — including Shulba Sutras for altar geometry), Vyakarana (grammar — Panini's Ashtadhyayi), Nirukta (etymology — Yaska), Chhandas (prosody), Jyotisha (astronomy). Smritis: Manu Smriti, Yajnavalkya Smriti, Narada Smriti. Upanishads (Vedanta — Brahman + Atman; ~108 traditional, 13 major). Itihasa: Mahabharata (Vyasa, 100,000 verses, Bhagavad Gita within), Ramayana (Valmiki). Sangam Tamil: 3 Sangams (1st in Madurai, 2nd at Kapatapuram, 3rd at modern Madurai); Tolkappiyam = oldest extant Tamil grammar. Ashokan inscriptions: Major Rock Edicts (14, e.g. at Girnar Junagadh, Dhauli Odisha, Jaugada AP); Kalinga Rock Edicts (13 + 14 special — war remorse, dhamma). 7 Pillar Edicts (Allahabad-Kosambi, Lauriya-Nandangarh). Minor Rock Edicts (Maski + Gujarra mention 'Ashoka' by name — the rest say 'Devanampiya Piyadasi'). Schismatic Edict (about Sangha unity). Scripts: Brahmi (most of subcontinent, written L-to-R), Kharosthi (NW India / Gandhara, written R-to-L like Aramaic — deciphered with help of bilingual Indo-Greek coins). Sushruta Samhita (Ayurveda — surgery focus; Chakrapanidatta wrote 11C Bengal commentary).",
      "Harappan / Indus Valley (9 q · 33% HARD) tests site-specific details. Mohenjo-daro (Sindh Pakistan; Great Bath — public ritual bath with adjacent WELL supplying water; Dancing Girl; granary). Harappa (Punjab Pakistan; cemetery R37 + H). Dholavira (Gujarat; sophisticated water management — reservoirs, dams; inscribed sign-board 10 characters). Lothal (Gujarat; dockyard / port; bead-making industry). Kalibangan (Rajasthan; ploughed field; fire altars). Banawali (Haryana). Rakhigarhi (Haryana — largest Harappan site in India). Mehrgarh (Balochistan; pre-Harappan Neolithic c. 7000 BCE). Common features: standardised brick (4:2:1 ratio), grid-pattern town planning, citadel + lower town, granaries, advanced drainage, weights (binary system 1-2-4-8), seals with steatite (Pashupati seal at Mohenjo-daro). The 2026 HARD PYQ tests Mohenjo-daro Great Bath water source (answer: the adjacent well).",
    ],
    subSkills: [
      {
        name: "Vedic literature classification + Vedanga six",
        description:
          "4 Vedas: Rigveda (oldest hymns) / Yajurveda (rituals) / Samaveda (music) / Atharvaveda (folk magic + medicine, newest). 6 Vedangas: Shiksha (phonetics), Kalpa (rituals — Shulba Sutras for geometry of altars), Vyakarana (grammar — Panini's Ashtadhyayi), Nirukta (etymology — Yaska's Nirukta), Chhandas (prosody), Jyotisha (astronomy). 3 Smritis: Manu / Yajnavalkya / Narada. Upanishads = Vedanta. Aranyakas = forest texts. Brahmanas = ritual commentary on Vedas. Distractor mixes Vedanga with Veda (claims Shiksha is a Veda — wrong; Shiksha is a Vedanga, an auxiliary discipline).",
      },
      {
        name: "Ashokan edict typology",
        description:
          "14 Major Rock Edicts (Girnar, Dhauli, Jaugada, Kalsi, Mansehra, Shahbazgarhi, Sopara, Yerragudi, Sannati). 2 Kalinga Rock Edicts (special at Dhauli + Jaugada — Ashoka expresses war remorse, dhamma policy toward conquered). 7 Pillar Edicts (Lauriya-Nandangarh, Lauriya-Araraj, Topra, Meerut, Allahabad-Kosambi, Rampurva). Minor Rock Edicts (Maski + Gujarra mention 'Ashoka' by personal name; rest say 'Devanampiya Piyadasi'). Schismatic Edict (Sangha unity warning). Bilingual edict at Kandahar (Greek + Aramaic). Mnemonic: 14 Major + 2 Kalinga + 7 Pillar + Minor scattered.",
      },
      {
        name: "Harappan site ↔ region ↔ unique feature",
        description:
          "Mohenjo-daro (Sindh) — Great Bath, Dancing Girl, granary, Pashupati seal. Harappa (Punjab Pakistan) — cemetery H + R37, granary. Dholavira (Gujarat Kutch) — water management dams + reservoirs, signboard 10 characters. Lothal (Gujarat) — dockyard/port + bead industry. Kalibangan (Rajasthan) — ploughed field + fire altars. Banawali (Haryana) — fortification + plough field. Rakhigarhi (Haryana) — largest Harappan site in India by area. Mehrgarh (Balochistan) — pre-Harappan Neolithic farming community c. 7000 BCE. Distractor swaps site features: 'Lothal is famous for the Great Bath' (wrong — Mohenjo-daro), 'Dholavira has the dockyard' (wrong — Lothal).",
      },
      {
        name: "Buddhism + Jainism essentials",
        description:
          "BUDDHISM: Siddhartha Gautama born Lumbini c. 563 BCE (clan Shakya), enlightenment at Bodh Gaya under Bodhi tree, first sermon at Sarnath (Deer Park) — Dharmachakra-pravartana, parinirvana at Kushinagar c. 483 BCE. 4 Noble Truths (dukkha exists / dukkha has cause = tanha craving / dukkha can end / 8-fold path is the way). 8-fold path: right view + intention + speech + action + livelihood + effort + mindfulness + concentration. 3 jewels: Buddha + Dhamma + Sangha. Mahayana vs Hinayana split. Buddhist Councils: I Rajagriha (after Buddha's death), II Vaishali (~383 BCE), III Pataliputra (Ashoka), IV Kashmir (Kanishka). JAINISM: 24 tirthankaras — Rishabhanatha 1st (symbol bull), Parshvanatha 23rd (Banaras c. 8C BCE), Mahavira 24th (Vardhamana, born Vaishali c. 540 BCE, attained kevala-jnana at Jrimbhikagrama, parinirvana at Pavapuri c. 468 BCE). 5 vows: ahimsa + satya + asteya + brahmacharya + aparigraha. Digambara vs Shvetambara sect split at 3C BCE.",
      },
      {
        name: "Mauryan administration + Ashokan dhamma",
        description:
          "Chandragupta Maurya (321 BCE founder, defeated last Nanda Dhana Nanda; founded with Kautilya/Chanakya as PM; Arthashastra is Kautilya's text on statecraft). Bindusara (next; sent Megasthenes back; territorial consolidation in Deccan). Ashoka (272/268–232 BCE; Kalinga War c. 261 BCE → remorse → dhamma policy). DHAMMA-MAHAMATTAS = special officers appointed by Ashoka for dhamma-propagation (different from regular mahamattas). 4 Mahamattas types: Anta-mahamatta (frontier districts), Ithijhakha-mahamatta (women's welfare), Vyavaharika-mahamatta (judicial), Vraja-mahamatta (animal protection). Ashokan administration: provinces (5: Pataliputra capital, Taxila NW, Ujjain W, Suvarnagiri Deccan, Tosali Kalinga); spies + rajukas + yuktas. Sangam Tamil Cheras+Cholas+Pandyas were CONTEMPORARIES of late Mauryan-post-Mauryan (3C BCE–3C CE). Megasthenes wrote Indica from Bindusara's court → Strabo's account.",
      },
    ],
    traps: [
      {
        name: "Vedanga classified as Veda",
        description:
          "Distractor claims Shiksha is a Veda (wrong — Shiksha is a Vedanga, one of the 6 auxiliary disciplines). Or claims there are 6 Vedas (wrong — 4 Vedas + 6 Vedangas = 10 distinct categories). Or claims Upanishads are Vedangas (wrong — Upanishads are Vedanta, the philosophical conclusion of the Vedas; Vedangas are technical-auxiliary). Memorise: 4 Vedas = Rig+Yajur+Sama+Atharva. 6 Vedangas = Shiksha+Kalpa+Vyakarana+Nirukta+Chhandas+Jyotisha.",
      },
      {
        name: "Harappan site ↔ feature swap",
        description:
          "Distractor swaps site signatures: 'Lothal has the Great Bath' (wrong — Mohenjo-daro), 'Mohenjo-daro has the dockyard' (wrong — Lothal), 'Dholavira has the ploughed field' (wrong — Kalibangan), 'Banawali has the largest site by area' (wrong — Rakhigarhi). Memorise one-feature-per-site: Mohenjo-daro = Great Bath + Dancing Girl + Pashupati seal; Lothal = dockyard; Dholavira = water management + signboard; Kalibangan = ploughed field; Rakhigarhi = largest in India.",
      },
      {
        name: "Mahamatta function swap",
        description:
          "The 2022 HARD PYQ tests Ashokan mahamatta functions. Anta-mahamatta = frontier districts (NOT women — distractor swaps with Ithijhakha). Ithijhakha-mahamatta = women's welfare. Vyavaharika = judicial. Vraja = animal protection. Dhamma-mahamatta (SPECIAL Ashokan creation) = dhamma propagation. Distractor swaps any two functions or attributes Vyavaharika to women's welfare. Memorise the 4 from List I↔II PYQ format.",
      },
      {
        name: "Kharosthi vs Brahmi script swap",
        description:
          "Distractor claims Kharosthi is L-to-R like Brahmi (wrong — Kharosthi is R-to-L like Aramaic; used in NW India/Gandhara region). Or claims Brahmi was deciphered via Indo-Greek coins (wrong — Kharosthi was deciphered via BILINGUAL Indo-Greek coins; Brahmi was deciphered by James Prinsep 1837 via Ashokan inscriptions). The 2024 MOD multi-statement PYQ tests this: 'Kharosthi script used in NW India was deciphered with help of coins of Indo-Greek kings' = TRUE statement.",
      },
    ],
    exampleQuestionIds: [
      "9b32a18d-6ebb-4977-b6c3-415c1c195850", // HARD 2026-1 — Mohenjo-daro Great Bath well
      "9f32fbad-4d5e-468a-aa16-dc2dd8777ffd", // HARD 2025-2 — Ramacharita dvyasrya-kavya author
    ],
    relatedSlugs: ["medieval-india", "modern-india", "world-history"],
  },

  // ──────────────────────────── QUICK-WIN ────────────────────────────
  "world-history": {
    trigger:
      "A Renaissance or Exploration question (Vasco da Gama 1498, Magellan 1519–22, Columbus 1492, EIC founding dates), an Industrial Revolution question (term origin, key inventions: spinning jenny / steam engine / telephone), an Enlightenment or Political Revolution question (American Revolution, French Revolution, Continental Congress, Magna Carta, Locke / Rousseau / Voltaire), or a 20th Century question (WWI causes / impact, Treaty of Versailles, League / UN, Cold War origins).",
    story: [
      "41 q in 10 years, 20% HARD — NDA History's LIGHTEST-%HARD chapter and the date-anchored quick-win pocket. 39% of the chapter q is date-anchored (highest of any History chapter — compare Modern 33%, Medieval 6%, Ancient 5%). The skill is chronological anchoring: once a candidate has ~15 absolute dates cold (1492 Columbus, 1498 Vasco da Gama, 1519 Magellan, 1600 BEIC, 1602 DEIC, 1764 Spinning Jenny, 1774 Continental Congress, 1789 French Revolution, 1815 Waterloo, 1869 Suez, 1876 telephone, 1914 WWI, 1917 Russian Revolution, 1919 Versailles, 1939 WWII, 1945 UN), most World History questions answer themselves.",
      "Enlightenment + Political Revolutions (12 q · 25% HARD — chapter's densest %HARD subtopic) tests Continental Congress decisions + French Revolution sequence + Enlightenment philosophers. FIRST Continental Congress (Sept-Oct 1774, Philadelphia, 12 colonies — Georgia absent): rejected Joseph Galloway's plan for colonial union under British authority, drew up Declaration of Rights and Grievances, voted to boycott British goods until grievances addressed, agreed to reconvene if grievances unaddressed. SECOND Continental Congress (May 1775): managed Revolutionary War, appointed Washington as Continental Army commander, adopted Declaration of Independence July 4 1776 (drafted by Jefferson with Franklin + Adams + Sherman + Livingston). French Revolution: Bastille July 14 1789 (storming of Paris prison — National Day of France), August 4 1789 (feudalism abolished), August 26 1789 (Declaration of Rights of Man and Citizen), September 1791 (constitution), 1793–94 (Reign of Terror under Robespierre), 1799 (Napoleon's coup of 18 Brumaire). Enlightenment thinkers: John Locke (Two Treatises of Government 1689 — social contract, natural rights), Montesquieu (Spirit of the Laws 1748 — separation of powers), Voltaire (Candide 1759 — religious tolerance), Rousseau (Social Contract 1762 — general will, popular sovereignty), Adam Smith (Wealth of Nations 1776 — capitalism). Magna Carta 1215 (King John forced by barons at Runnymede; limited royal power; due process precursor).",
      "Industrial Revolution (12 q · 17% HARD) tests TERM ORIGIN + key inventions order. Arnold Toynbee gave Oxford lectures 1880–81 (published posthumously 1884) — popularly credited with coining 'Industrial Revolution' though French economists used the term earlier. (Friedrich Engels used 'Industrielle Revolution' in 1845; Toynbee Sr's nephew Toynbee Jr's lectures cemented the term in English economic history.) Key inventions chronologically: Flying Shuttle (John Kay 1733), Spinning Jenny (James Hargreaves 1764), Water Frame (Richard Arkwright 1769), Steam Engine improved (James Watt 1769 patent — earlier Newcomen 1712), Spinning Mule (Samuel Crompton 1779), Power Loom (Edmund Cartwright 1785), Cotton Gin (Eli Whitney 1793), Bessemer Process (Henry Bessemer 1856 — cheap steel), Telegraph (Samuel Morse 1837), Telephone (Alexander Graham Bell 1876), Phonograph (Thomas Edison 1877), Electric Light Bulb (Edison 1879), Wireless (Marconi 1895). Causes: Britain's coal + iron + textile demand + capital from colonial trade + agricultural revolution releasing labour + scientific revolution providing methodology. 20th Century (10 q · 20% HARD) tests WWI causes + impact, Treaty of Versailles, League of Nations vs UN. WWI 1914–18: trigger = assassination of Archduke Franz Ferdinand of Austria-Hungary at Sarajevo June 28 1914; alliance chain (Triple Entente Russia+France+UK vs Central Powers Germany+Austria-Hungary+Ottoman+Bulgaria); US joined 1917 (Zimmermann Telegram + unrestricted submarine warfare); Versailles June 1919 imposed war-guilt + reparations + Rhineland demilitarization + League of Nations; Germany never accepted resentment → Nazi rise. UN founded 1945 (San Francisco Charter, replaced League 1946 dissolution).",
    ],
    subSkills: [
      {
        name: "EIC founding chronology (British, Dutch, Danish, French)",
        description:
          "British EIC 1600 (Dec 31 Royal Charter from Elizabeth I; Sir Thomas Smythe first governor; first voyage 1601 under James Lancaster to Bantam). Dutch VOC 1602 (Vereenigde Oostindische Compagnie; world's first public company with traded shares). Danish EIC 1616 (had presence at Tranquebar Tamil Nadu 1620–1845). French EIC 1664 (Compagnie française des Indes orientales by Colbert under Louis XIV). Portuguese — NO 'EIC' per se; Estado da Índia from 1505 (Francisco de Almeida first viceroy at Cochin; Goa captured 1510 by Albuquerque). The 2026 MOD chronological PYQ: Vasco da Gama 1498 → Magellan circumnavigation completed 1522 → British EIC 1600 → Dutch EIC 1602. So order = Gama → Magellan → BEIC → DEIC.",
      },
      {
        name: "Industrial Revolution invention chronology",
        description:
          "Spinning Jenny 1764 (James Hargreaves) → Water Frame 1769 (Arkwright) → Steam Engine improved 1769 (Watt's patent) → Spinning Mule 1779 (Crompton) → Power Loom 1785 (Cartwright) → Cotton Gin 1793 (Eli Whitney USA) → Telegraph 1837 (Morse USA) → Bessemer Process 1856 → Telephone 1876 (Bell) → Phonograph 1877 (Edison) → Electric Light Bulb 1879 (Edison) → Wireless 1895 (Marconi). All pre-1800 textile inventions are British; post-1840 inventions include American (Morse, Whitney, Bell, Edison) and Italian (Marconi). Distractor mixes spinning jenny/spinning mule (both 'spinning' — Hargreaves 1764 jenny vs Crompton 1779 mule) or claims telephone preceded telegraph.",
      },
      {
        name: "Enlightenment philosopher ↔ work ↔ idea triple",
        description:
          "John Locke (English) / Two Treatises of Government 1689 / natural rights (life + liberty + property) + social contract + right of revolution. Montesquieu (French) / Spirit of the Laws 1748 / separation of powers (legislative + executive + judicial). Voltaire (French) / Candide 1759 / religious tolerance + civil liberties + critique of organized religion. Rousseau (French) / Social Contract 1762 + Emile 1762 / general will + popular sovereignty + 'man is born free'. Adam Smith (Scottish) / Wealth of Nations 1776 / invisible hand + division of labour + free markets. Distractor swaps philosopher↔work (e.g. Locke wrote Social Contract — wrong, that's Rousseau).",
      },
      {
        name: "WWI causes vs WWI impact distinction",
        description:
          "CAUSES of WWI (1914): immediate trigger = Sarajevo assassination of Archduke Franz Ferdinand June 28 1914 by Gavrilo Princip (Black Hand). Underlying: militarism + alliance system (Triple Entente vs Triple Alliance) + imperialism + nationalism. IMPACT of WWI (1918+): Treaty of Versailles 1919 (Germany humiliated, war-guilt clause Article 231, reparations 132 bn marks, Rhineland demilitarised, lost colonies, army limited to 100k); League of Nations 1920 (US Senate rejected joining); Russian Revolution 1917 (Bolshevik takeover, end of Romanov dynasty); 4 empires collapsed (German + Austria-Hungary + Russian + Ottoman); women's suffrage advanced; map redrawn (Poland reborn, Czechoslovakia + Yugoslavia created); economic devastation in Europe. The 2023 HARD 'in which way did WWI NOT impact Europe?' tests: distractor option that's NOT an impact is the correct answer. (Industrial decline in Europe is NOT — Europe stayed industrial; political upheaval / colonial unrest / women's suffrage / treaty resentment ARE impacts.)",
      },
    ],
    traps: [
      {
        name: "EIC founding date confusion",
        description:
          "Distractor claims Dutch EIC preceded British EIC (wrong — British 1600, Dutch 1602; very close but BEIC first). Or claims French EIC was 17C earliest (wrong — French 1664 is 60+ years after BEIC). Memorise: British 1600 → Dutch 1602 → Danish 1616 → French 1664. The 2026 PYQ tests Vasco da Gama 1498 + Magellan 1522 + BEIC 1600 + DEIC 1602 in chronological order.",
      },
      {
        name: "Industrial Revolution term originator",
        description:
          "Distractor attributes 'Industrial Revolution' coinage to Adam Smith (wrong — Smith's Wealth of Nations 1776 pre-dates the term). Or Karl Marx (wrong — Marx used the term but didn't coin it). Arnold Toynbee (the elder, 1852–83) is conventionally credited via his Oxford lectures 1880–81 published 1884. Friedrich Engels used 'industrielle Revolution' in 1845 (Condition of the Working Class in England) — earlier than Toynbee but in German. Distractor over-attributes to high-profile thinkers (Smith / Marx / Mill) — verify the date carefully.",
      },
      {
        name: "First Continental Congress decisions over-inclusion",
        description:
          "1st Continental Congress (Sept-Oct 1774) DID: reject Galloway plan for colonial union under British, draw up Declaration of Rights, agree to boycott British goods. 1st DID NOT: declare independence (that's 2nd Congress July 4 1776), appoint Washington commander (that's 2nd Congress May 1775), adopt a constitution (Articles of Confederation 1781, US Constitution 1787). Distractor mixes 1st and 2nd Congress decisions — common in the 2019 HARD PYQ which lists 4 statements about the 1st Congress; you must verify each against the 1774 vs 1775+ split.",
      },
      {
        name: "WWI impact universal claim",
        description:
          "Distractor uses absolute quantifiers about WWI impact: 'All European countries became democracies after WWI' (wrong — Soviet Russia became communist; Germany got Weimar then Nazis; Austria/Hungary fragmented but weren't all democratic). 'Every European empire collapsed' (wrong — British + French empires persisted into mid-20C; Belgian + Dutch + Italian colonial empires also persisted). 'Industrial decline hit all of Europe' (wrong — Britain + France + Germany retained industrial capacity; impact was infrastructure + manpower + finance, not industrial collapse). Universal claims are usually false in 20C history — search for exceptions before judging correct.",
      },
    ],
    exampleQuestionIds: [
      "cb278562-e2e7-44f5-8b7c-3c7ea03020f2", // MOD 2026-1 — EIC + Gama + Magellan chronology
      "3f0dcdc9-1d6a-49f7-ad8d-41be7418d40a", // HARD 2023-2 — WWI impact NOT
    ],
    relatedSlugs: ["modern-india", "medieval-india", "ancient-india"],
  },
};

export const PLAYBOOK_DETAIL_SLUGS = Object.keys(PLAYBOOK_DETAILS);
