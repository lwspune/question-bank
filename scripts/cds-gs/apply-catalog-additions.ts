/**
 * Apply the adjudicated catalog additions to catalog.json.
 *
 *   npx tsx scripts/cds-gs/apply-catalog-additions.ts          # dry-run
 *   npx tsx scripts/cds-gs/apply-catalog-additions.ts --apply  # rewrite catalog.json
 *
 * The catalog was generated once from NDA's GAT-GK taxonomy and is now the
 * hand-edited source of truth. This script records the FIRST hand edit — the
 * batch adjudicated from `CATALOG_GAPS.md` (a 4-paper survey) plus the pilot
 * paper's own transcription flags — as data rather than as an invisible edit, so
 * the git diff of catalog.json has a reviewable rationale beside it.
 *
 * WHY MORE GENEROUS THAN THE SURVEY'S "two examples or it doesn't count" RULE:
 * that rule was right for the SURVEYOR, to stop it speculating. The adjudication
 * faces a different cost asymmetry. catalog.json is a validation ALLOWLIST, not a
 * seed — a chapter or subtopic listed here creates nothing in the database until
 * a question actually uses it (`commitStaged` auto-creates on first use). So an
 * entry that turns out unused costs literally nothing, while a MISSING entry
 * silently mis-files questions across all 19 papers and is expensive to undo once
 * rows exist. Single-example gaps are therefore accepted where the topic is a
 * recognised recurring UPSC theme, and the thin evidence is recorded below.
 *
 * Idempotent: re-running adds nothing.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";
import type { Catalog } from "./config";

type Addition = {
  subject: string;
  chapter: string;
  subtopics: string[];
  newChapter?: boolean;
  why: string;
};

const ADDITIONS: Addition[] = [
  // ── Economics — the largest gap by a wide margin ────────────────────────────
  // 1 chapter / 3 subtopics caught exactly ONE of ~17 economics questions
  // sampled across four papers, and 2 of the pilot's own 6.
  {
    subject: "Economics",
    chapter: "Microeconomics — Demand, Supply and Market Structure",
    newChapter: true,
    subtopics: [
      "Basic Economic Concepts and Opportunity Cost",
      "Demand, Supply and Elasticity",
      "Market Structures and Types of Firms",
    ],
    why: "2021-II Q47 movement along the demand curve, Q48 opportunity cost, Q70 monopolistic competition; 2025-II Q71 firm-type matching; pilot Q120 diminishing marginal utility.",
  },
  {
    subject: "Economics",
    chapter: "Money, Banking and Public Finance",
    newChapter: true,
    subtopics: [
      "Money, Inflation and Price Behaviour",
      "Banking, RBI and Financial Institutions",
      "Taxation and Public Finance",
      "Union Budget and Fiscal Policy",
    ],
    why: "2016-II Q107 hot money, Q108 credit rating agencies; 2021-II Q71 GST Acts; 2025-II Q72 FDI caps, Q73 shrinkflation; pilot Q51 ETFs, Q53 RBI, Q119 tax incidence.",
  },
  {
    subject: "Economics",
    chapter: "National Income, Growth and Development Indicators",
    newChapter: true,
    subtopics: [
      "National Income and Sectoral Composition",
      "Poverty, Employment and Human Development",
      "Economic Curves, Indices and Statistical Reports",
    ],
    why: "2016-II Q106 composition of national income; 2021-II Q69 Lorenz/Phillips/Engel/Laffer; 2023-I Q96 MPI; 2025-II Q79 PLFS, Q118 Credit/GDP; pilot Q90 core-sector growth.",
  },

  // ── Polity ──────────────────────────────────────────────────────────────────
  {
    subject: "Polity",
    chapter: "Indian Constitution — Making, Foundation and Amendments",
    subtopics: ["Citizenship", "Emergency Provisions"],
    why: "Citizenship: 2016-II Q69, 2023-I Q95. Emergency: 2016-II Q96 and 2021-II Q92 set essentially the same Article 352 question nine years apart — a fixed CDS staple, not a one-off.",
  },
  {
    subject: "Polity",
    chapter: "Government Structure — Parliament, Judiciary and Constitutional Bodies",
    subtopics: [
      "Statutory Bodies and Post-Independence Legislation",
      "State Legislatures and Governors",
    ],
    why: "Statutes: the catalog covers CONSTITUTIONAL bodies and COLONIAL-era Acts but nothing post-1947 — 2016-II Q97 Domestic Violence Act, Q111 SC/ST Atrocities Act, 2021-II Q72 Directorate of Enforcement. State legislatures: pilot Q99 Assembly strength, Q100 Governor's ordinance power — Polity had no state-level slot at all.",
  },
  {
    subject: "Polity",
    chapter: "World Polity, Democracy and International Relations",
    subtopics: ["International Law and Maritime Zones"],
    why: "Pilot Q36 (EEZ rights vs high-seas freedoms) is international LAW, not physical oceanography, so Geography > Oceanography — whose subtopics are all physical — was the wrong home. Single-example; accepted on the cost asymmetry in the header.",
  },

  // ── Current Affairs — Defence is the shape that was wrong, not the size ─────
  // "Military Exercises" and "Indian Navy" both work well. What is missing is an
  // Army/Air Force equipment slot and anywhere at all for OPERATIONS and force
  // ORGANISATION, which "Exercises" is not.
  {
    subject: "Current Affairs",
    chapter: "Defence and Military Exercises",
    subtopics: [
      "Armed Forces — Organisation, Commands and Operations",
      "Weapon Systems, Missiles and Military Aircraft",
    ],
    why: "Organisation/ops: 2016-II Q99 A&N theatre command, 2025-II Q111 Operation Ablaze/Trident/Bandar; pilot Q72 Coast Guard charter, Q84 rank structure, Q102 ITBP. Equipment: 2016-II Q54 battle tanks, 2021-II Q105 Pinaka, Q107 Agni-P.",
  },
  {
    subject: "Current Affairs",
    chapter: "International Affairs and Relations",
    subtopics: ["International Days and Global Observances"],
    why: "Pilot Q77 (World Soil Day theme) is an FAO/UN observance, so the India-scoped 'National Days, Festivals and Observances' did not fit. A recurring UPSC staple.",
  },
  {
    subject: "Current Affairs",
    chapter: "Awards, Honours, Books and Culture",
    subtopics: ["Films, Cinema and Festival Awards"],
    why: "Pilot Q75 (Best Short Film) had to go under civilian awards. Recurring theme; single-example, accepted on the cost asymmetry.",
  },

  // ── Physics — electronics and computing have no home anywhere ───────────────
  {
    subject: "Physics",
    chapter: "Electronics and Computer Fundamentals",
    newChapter: true,
    subtopics: [
      "Number Systems and Boolean Logic",
      "Computer Hardware, Software and Networking",
      "Semiconductors, Diodes and Transistors",
    ],
    why: "FOUR CONSECUTIVE questions in 2025-II (Q81 assembly language, Q82 software ports, Q83 2's complement, Q84 logical operators) with nothing in the catalog covering them. The nearest slot, Current Affairs > Science and Technology > 'Information Technology and Railway Safety', is a current-affairs subtopic — filing 2's-complement arithmetic there is wrong on both axes. Semiconductors is single-instance and included as the natural sibling; it costs nothing if unused.",
  },

  // ── Geography ───────────────────────────────────────────────────────────────
  {
    subject: "Geography",
    chapter: "Earth's Structure, Landforms and Geological Time",
    subtopics: ["Disaster Management and Hazards"],
    why: "2021-II Q96 avalanche-as-disaster-TYPE is pure classification with no physical-geography content; 'Landforms and Mass Movements' would file it by subject matter (snow moving downhill) and lose what it tests. Q95 asks about vulnerability (population density, building type), not seismology. Both from one paper — weaker evidence, recorded.",
  },
  {
    subject: "Geography",
    chapter: "Indian Geography — Economy, Resources and Transport",
    subtopics: ["Population, Census and Urbanisation"],
    why: "Pilot Q42 (state with highest ST population share) had to go under 'World and Human Geography > Human Geography — Megacities and Population', whose chapter is World-scoped. The survey independently listed Indian census/urbanisation as a candidate.",
  },
  {
    subject: "Geography",
    chapter: "World and Human Geography",
    subtopics: ["World Ports, Straits and Maritime Geography"],
    why: "Pilot Q108 (Hambantota) — 'Ports and Maritime Infrastructure' sits under INDIAN Geography, so a world port had to go under 'World — Coordinates, Time and Place'.",
  },

  // ── History — the best-fitting subject, with three structural holes ─────────
  {
    subject: "History",
    chapter: "World History",
    subtopics: ["Ancient and Classical World"],
    why: "World History's four subtopics all begin at the Renaissance; pilot Q79 is Greek and Roman usage of 'barbarian'. The chapter is right and had no pre-Renaissance slot.",
  },
  {
    subject: "History",
    chapter: "Ancient India",
    subtopics: ["Temple and Rock-Cut Architecture"],
    why: "Pilot Q117 (Elephanta, Shaiva Ellora, Badami) — the only religious-architecture subtopic is scoped 'Buddhism, Jainism and Religious Architecture' and names neither Hindu nor Shaiva.",
  },
  {
    subject: "History",
    chapter: "Medieval India",
    subtopics: ["Society, Economy and Land Grants"],
    why: "Pilot Q115 (Brahmadeya, Agrahara, Devadana — early-medieval agrarian structure). Medieval India had NO society/economy subtopic at all, which is a structural hole rather than a near-miss.",
  },
];

/**
 * ROUND 2 — adjudicated from the 46 `catalog-gap` flags raised by the four papers
 * transcribed AFTER round 1 (2018-1 re-filed, plus 2025-1, 2025-2, 2024-1).
 *
 * Round 1 was adjudicated from a 4-paper SURVEY plus the pilot's flags. This round
 * is different in kind and better evidenced: it comes from four papers transcribed
 * question-by-question against the round-1 catalog, so each flag is a place where a
 * transcriber who HAD the extended catalog in hand still found nothing that fitted.
 *
 * Same cost asymmetry as round 1 — an entry creates nothing in the DB until a
 * question uses it, so an unused one is free while a missing one mis-files across
 * the 15 papers still to come. Applying now rather than at the end is deliberate:
 * only 4 papers need re-filing today, against 19 later.
 *
 * NO new chapters this round. Every gap is a missing subtopic under a chapter that
 * is already the right home — which is itself evidence that round 1 got the
 * chapter-level structure right.
 *
 * DELIBERATELY NOT ADDED, flagged twice now and still homeless. Recorded so the
 * next reader knows these were considered and declined, not overlooked:
 *   - attribution of famous quotations to public figures (2018-1 Q93) — an option
 *     set spanning Indian and British figures fits no single chapter.
 *   - a national event/exhibition and its host State (2018-1 Q65).
 *   - a foreign landmark in the news (2025-2 Q115) — too thin, and the existing
 *     World Leaders/Global Events subtopic is a defensible home.
 *   - Special Category Status (2025-2 Q19) — `Federal Structure — States, UTs and
 *     Finance` already covers centre-state devolution; the flag was raised soft.
 */
const ADDITIONS_ROUND2: Addition[] = [
  // ── History: the richest seam, 15 flags ────────────────────────────────────
  // Military technology spans THREE period chapters, so it gets the same subtopic
  // name in each rather than one cross-cutting chapter. History is period-chaptered
  // and that is the right organising principle; a same-named subtopic per period
  // works WITH it. Two of these four questions currently sit in "Society, Economy
  // and Land Grants", which is plainly wrong for a siege engine.
  { subject: "History", chapter: "Ancient India", subtopics: ["Warfare, Arms and Military Technology"],
    why: "2025-1 Q38 (Sanskrit names for the bow as a weapon of war)." },
  { subject: "History", chapter: "Medieval India", subtopics: ["Warfare, Arms and Military Technology"],
    why: "2025-1 Q36 (stirrup, Konarak c.1250) and Q39 (manjaniq siege engine) — both currently wedged into Society, Economy and Land Grants." },
  { subject: "History", chapter: "Modern India", subtopics: ["Warfare, Arms and Military Technology"],
    why: "2025-1 Q42 (flint-lock muskets, bayonets, cannon used by Europeans in India)." },

  { subject: "History", chapter: "Medieval India",
    subtopics: ["Science, Medicine and Technology", "Art, Painting and Sculpture", "Religious and Philosophical Schools"],
    why: "Science/medicine: 2024-1 Q3 (Jai Singh's observatories and astronomical tables) + Q96 (Tibb-i-Yunani, smallpox inoculation). Painting: 2024-1 Q49 (early Chola mural at Brihadisvara) — History had only Temple and Rock-Cut Architecture. Philosophy: 2024-1 Q98 (Kashmir Shaivism, Vasugupta) — the only religious bucket is scoped to Bhakti and Sufi." },
  // The Marathas are simply MISSING from a catalog that names four other medieval
  // dynasties — a real omission for Indian history, not a fine-grained gap, and
  // one the NDA taxonomy carried in unnoticed. And rock ART is not rock-cut
  // ARCHITECTURE, so Bhimbetka had nowhere to sit either.
  { subject: "History", chapter: "Medieval India", subtopics: ["Maratha Empire and Administration"],
    why: "2024-2 Q55 (Shivaji's Ashta Pradhan) had to go under 'Other Medieval Kingdoms (Chola, Rajput, Ahom, Sikh)', which names four dynasties and not the Marathas." },
  // Round 2 first added `Art, Painting and Sculpture` to MEDIEVAL India only, for a
  // Chola mural — an asymmetry that stranded AJANTA, which is both the canonical
  // Indian painting site and ANCIENT. Adding it to Ancient India too; the period
  // axis is the chapter, so the same subtopic belongs in both.
  // SECOND instance of the same mistake, caught the same way. Round 2 put
  // `Religious and Philosophical Schools` under MEDIEVAL India only, so a band
  // transcribing a 7th-8th century Mimamsa philosopher had to file him as
  // MEDIEVAL purely to reach the subtopic — distorting the period axis to reach a
  // topic. A topic subtopic that is not period-specific belongs in every period
  // chapter it can occur in; adding one to a single chapter silently forces
  // mis-dating. Same fix as Art/Painting below.
  { subject: "History", chapter: "Ancient India", subtopics: ["Religious and Philosophical Schools"],
    why: "2022-2 Q37 (Kumarila Bhatta and Prabhakara, the 7th-8th c. Mimamsa thinkers) was filed under Medieval India solely because Ancient India had no philosophy-schools subtopic. The chapter was wrong; only the subtopic was missing." },
  { subject: "History", chapter: "Ancient India", subtopics: ["Art, Painting and Sculpture"],
    why: "2025-2 Q62 (Ajanta cave paintings — yakshas/apsaras, the 'multiple perspectives' technique) was stranded in Temple and Rock-Cut Architecture: Ajanta IS a rock-cut site, but the question tests its PAINTING, not its architecture." },
  { subject: "History", chapter: "Ancient India", subtopics: ["Prehistory, Stone Age and Rock Art"],
    why: "2024-2 Q56 (Mesolithic art at Bhimbetka) was filed under 'Temple and Rock-Cut Architecture' — rock ART is not rock-cut ARCHITECTURE, and the catalog began at the Harappan period with nothing before it." },
  { subject: "History", chapter: "Ancient India", subtopics: ["Chalcolithic and Pre-Harappan Cultures"],
    why: "2024-1 Q1 (Jorwe, Malwa, Ahar-Banas) had to go under Harappan and Indus Valley, which is a different culture entirely." },
  { subject: "History", chapter: "Modern India",
    subtopics: ["Revolt of 1857 and Popular Uprisings", "Indian Literature, Poets and Cultural Figures"],
    why: "1857: 2025-2 Q64 (Shah Mal, Gonoo) was forced into 'Freedom Movement — INC, Gandhi and Independence', which postdates it by three decades. Literature: 2025-2 Q59, Q63, Q65 — three in one band." },

  // ── Geography: 10 flags, clustering on the WORLD side ──────────────────────
  { subject: "Geography", chapter: "World and Human Geography",
    subtopics: [
      "World Political Geography — Countries, Borders and Regions",
      "World Physical Geography — Continents, Relief and Landmarks",
      "World Natural Vegetation and Biomes",
    ],
    why: "Political: 2024-1 Q40 (Arabian Peninsula), 2025-1 Q98 (Ukraine's neighbours), 2025-2 Q9 (Durand Line — named boundary lines are a CDS staple). Physical: 2024-1 Q41 (Antarctica's relief), 2025-1 Q12 (Virunga). Biomes: 2025-2 Q93 (mid-latitude deciduous forests) — Geography had only the India-scoped Forests and Natural Vegetation." },
  { subject: "Geography", chapter: "Oceanography", subtopics: ["Salinity and Composition of Sea Water"],
    why: "2025-1 Q7 (ascending order of salts in sea water) — Oceanography's four subtopics are coral, currents, waves/sea-floor and tides, none chemical." },
  { subject: "Geography", chapter: "Indian Geography — Economy, Resources and Transport",
    subtopics: ["Manufacturing Industries"],
    why: "2025-2 Q99 (cotton textiles, sugar, cement) — the existing 'Energy and Industries — Power, Petroleum, Iron and Steel' is energy and heavy industry." },

  // ── Economics: round 1 built the chapters, round 2 fills the micro one ─────
  { subject: "Economics", chapter: "Microeconomics — Demand, Supply and Market Structure",
    subtopics: ["Externalities, Market Failure and Public Goods", "Market Equilibrium and Comparative Statics"],
    why: "2024-1 Q69 (positive externality, cap-and-trade, Pigouvian subsidy, Tragedy of the Commons) and Q76 (demand shift against perfectly elastic supply). Both core micro, from the 10-question theory block that made 2024-1 a 17-question Economics paper." },

  { subject: "Economics", chapter: "National Income, Growth and Development Indicators",
    subtopics: ["Industrial and Manufacturing Policy"],
    why: "2024-2 Q96 (Atmanirbhar Bharat; the same slot serves PLI and Make in India). Economics > Indian Economy offers only Five Year Plans, agriculture schemes and international trade, so industrial policy fell to Current Affairs by default." },
  { subject: "Biology", chapter: "Microbiology and Disease",
    subtopics: ["Traditional Medicine and Public Health Systems"],
    why: "2024-2 Q107 (Siddha, Unani, Sowa-Rigpa, Ayurveda) had NO home anywhere in the catalog — the nearest candidate, Chemistry > Medicines and Health Chemistry, is drug chemistry and is simply a different subject." },

  // ── Biology and Chemistry ─────────────────────────────────────────────────
  { subject: "Biology", chapter: "Biochemistry", subtopics: ["Carbohydrates and Biomolecules"],
    why: "2025-1 Q77 (lactose composition) and 2025-2 Q48 (mono/di/polysaccharide classification) — flagged independently on two papers, both parked in Human Physiology > Nutrition." },
  { subject: "Biology", chapter: "Plant Biology", subtopics: ["Plant Morphology — Roots, Stems and Modifications"],
    why: "2024-1 Q28 (tuber, bulb, corm, rhizome, taproot) had to go under Vegetative Propagation, which is a different process." },
  { subject: "Chemistry", chapter: "Metals and Non-Metals",
    subtopics: ["Classification of Elements — Metals, Non-Metals and Metalloids"],
    why: "2025-1 Q57 (metalloid classification) was filed under Atomic Structure > Periodic Trends; the Metals and Non-Metals chapter is the right home but its subtopics are alloys, corrosion, extraction and reactivity — none is the classification itself." },
];

/**
 * ROUND 3 CANDIDATES — evidence banked, NOT yet adjudicated or applied.
 *
 * These are gaps that survived round 2: a transcriber holding the ~298-subtopic
 * catalog still found nothing that fitted. Recorded here rather than left in band
 * reports, because a gap noticed and forgotten is worse than one never noticed —
 * it gets silently re-parked somewhere wrong on the next paper.
 *
 * THE STRUCTURAL ONE, and the reason to do a round 3 at all rather than keep
 * bolting on subtopics: `Current Affairs > Awards, Honours, Books and Culture >
 * Civilian Awards, Honours and Educational Institutions` has become a CATCH-ALL
 * FOR EVERY KIND OF AWARD. Two bands on different papers hit it independently and
 * from different directions — 2023-1 Q84 (UNEP Champions of the Earth, an
 * ENVIRONMENTAL award) and 2023-1 Q38 (the 2022 Nobel Prize in Physics, an
 * INTERNATIONAL SCIENTIFIC prize) — and both observed that the subtopic plainly
 * means Padma-style INDIAN CIVILIAN honours. Round 2 already carved film awards
 * out on exactly this logic, so the pattern is established: the chapter wants
 * splitting by award TYPE, not another one-off subtopic per award that turns up.
 *
 * MEASURED 2026-08-28, and it SHARPENS the structural finding above rather than
 * confirming it. Reading all 11 questions that subtopic holds across the 9 committed
 * papers, the split is not by award TYPE at all — it is TWO DIFFERENT AXES sharing
 * one name:
 *
 *   7 awards/honours  Padma (2023-2 Q110), Bharat Ratna (2024-1 Q118), Jnanpith
 *                     (2022-1 Q111), Nobel Physics (2023-1 Q38), UNEP Champions of
 *                     the Earth (2023-1 Q84), and two FOREIGN state honours —
 *                     Suriname's Yellow Star (2023-2 Q119), Kuwait's Mubarak
 *                     Al-Kabeer (2025-1 Q116)
 *   3 institutions    Indian Maritime University (2023-2 Q95), a Ministry of
 *                     Culture body (2025-1 Q107), an institute/location match list
 *                     (2025-2 Q16) — none of which mentions an award at all
 *   1 borderline      2018-1 Q65, which State hosts the Nobel Prize Series India
 *                     exhibition: an EVENT-hosting question wearing an award's name
 *
 * So the remedy is CHEAPER than splitting by type, and needs no new subtopic:
 * `Current Affairs > National Events, Persons and India General Knowledge >
 * National Institutions, Milestones and History` ALREADY EXISTS and is a clean fit
 * for all three — IMU and the IITs are central institutions established by statute.
 * Round 3 should therefore RENAME this subtopic to `Civilian Awards and Honours`,
 * dropping the educational-institutions clause that made it a catch-all, and RE-FILE
 * those three. Check for a home before adding one: round 2 twice added a subtopic to
 * one period chapter and stranded content in another, and an addition that duplicates
 * an existing home is the same mistake pointing the other way.
 *
 * The foreign-honours pair is a genuine second candidate (a Kuwaiti order is not an
 * Indian civilian award), but two questions is thin, and `Civilian Awards and Honours`
 * covers them without strain once the institutions leave. Left un-split deliberately.
 *
 * THE DELHI SULTANATE HAS NO SUBTOPIC ANYWHERE, and it is the one structural hole
 * in History. `Medieval India` gives the Mughals a chapter-level dynastic slot
 * (`Mughal Empire and Administration`) and Vijayanagara another
 * (`Vijayanagara Empire`), while its remaining dynastic slot is literally
 * `Other Medieval Kingdoms (Chola, Rajput, Ahom, Sikh)` — the Sultanate is named
 * in neither. Found on 2020-1, whose Q35 (Turkan-i-Chihalgani) and Q36 (the Mongol
 * invasions) had to be parked on `Other Medieval Kingdoms` and `Warfare, Arms and
 * Military Technology` respectively.
 *
 * MEASURED before proposing, and the measurement CUT THE CLAIM DOWN. A first probe
 * reported nine affected questions across the committed papers and read as urgent.
 * Five were false: `sultan` matches inside conSULTANt and reSULTANt, and separately
 * matched Sultanpur National Park in a Ramsar question; `Sayyid` matched a painter's
 * name rather than the dynasty. Re-run with terms that cannot occur as ordinary
 * English or as another proper noun (delhi sultanate, khalji, tughlaq, iltutmish,
 * balban, chihalgani, iqta, amir), the real figure is THREE across eleven papers —
 * and two of those three are Amir Khusrau questions already sitting on
 * `Medieval Literature and Texts`, which is a defensible home for a literature
 * question, with the third on `Society, Economy and Land Grants`, also defensible.
 *
 * So: add `Delhi Sultanate` to Medieval India in round 3, because the hole is real
 * and the addition is structurally correct beside its two sibling dynastic slots —
 * but it is NOT urgent and it triggers little or no re-filing of existing rows. The
 * rate is roughly 0.4 questions per paper.
 *
 * This is the prefix-matching trap the syllabus-map work already recorded
 * (`cement` inside `displaCEMENT`), met again in a different corpus. Anchor the
 * search on a term that cannot occur as ordinary English, and read the matched text
 * before believing a count — an inflated count makes a modest gap look like an
 * emergency, and would have justified re-filing rows that are correctly filed.
 *
 * WHEN TO APPLY: AN ADDITION AND A RENAME HAVE DIFFERENT ECONOMICS, and round 2's
 * blanket rule ("applying it re-files 5 papers now vs 19 later, so sooner is
 * cheaper") is only half right. It holds for an ADDITION, whose whole value is
 * preventing FUTURE mis-filing: every paper transcribed before the addition lands
 * is a paper that had to park content somewhere approximate, so an addition is
 * strictly cheaper the earlier it goes in.
 *
 * It does NOT hold for a RENAME or a re-file, which only corrects filing that has
 * ALREADY happened. That cost is per-QUESTION, not per-paper, so it is identical
 * whenever it is paid — eleven rows cost the same to move today or after the
 * nineteenth paper. A rename can therefore wait for one consolidated pass at the
 * end, where it is done once against a settled corpus rather than repeatedly
 * against a moving one.
 *
 * Hence the split for round 3: apply the ADDITIONS as soon as no agent is mid-flight
 * (a catalog change under a running transcriber invalidates its validation), and
 * defer the `Civilian Awards, Honours and Educational Institutions` rename plus its
 * three institution re-files to a single end-of-run pass.
 *
 * SCIENTIST-ATTRIBUTION EXISTS IN PHYSICS AND NOWHERE ELSE — the round-2 asymmetry
 * rule again, one level up. Round 2 twice added a subtopic to ONE period chapter of
 * History and stranded content in another; the rule written then was that a topic
 * subtopic which is not period-specific belongs in EVERY period chapter it can occur
 * in. The same holds ACROSS SUBJECTS, and the catalog violates it here:
 *
 *   Physics    > Modern Physics            > Scientists and Discoveries   (general)
 *   Biology    > Microbiology and Disease  > Antibiotics — Discovery      (topic-specific)
 *   Chemistry  >                           > nothing at all
 *
 * "Who discovered X" is not a physics question — it is a question shape that occurs in
 * every science subject. Two independent hits, from different papers and different
 * transcribers, neither having seen the other's report:
 *   - 2020-1 Q30 (Jenner and immunization) had to go on `Antibiotics — Discovery`,
 *     which is about antibiotics, not about scientists.
 *   - 2020-2 Q97 (who introduced the symbols of the elements) had to go on
 *     `Atomic Models: Dalton, Rutherford, Bohr`, which is about atomic models.
 * In both cases the parked home is a CONTENT subtopic absorbing an ATTRIBUTION
 * question, which is precisely how a catch-all forms — the mechanism measured on
 * `Civilian Awards, Honours and Educational Institutions` above.
 *
 * Round 3 should add `Scientists and Discoveries` to Biology and to Chemistry, mirroring
 * the Physics entry. Note the Physics one is itself oddly filed under `Modern Physics`
 * — an attribution question is not necessarily modern physics — but that is existing
 * structure and is left alone rather than widened into a fourth thing to fix.
 *
 * ECONOMIC GEOGRAPHY EXISTS FOR INDIA AND NOT FOR THE WORLD — the asymmetry rule a
 * third time, and the one with the most hits. Measured across the full Geography
 * catalog: `Indian Geography — Economy, Resources and Transport` carries EIGHT
 * economic subtopics (agriculture, economic sectors, energy and industries,
 * transport corridors, manufacturing, minerals and mining, population, ports),
 * while `World and Human Geography`'s seven are ALL physical or political —
 * continents and relief, rivers and canals, natural vegetation, political borders,
 * coordinates, megacities, ports. There is no world agriculture, no world minerals,
 * no world energy or manufacturing anywhere.
 *
 * That matters because `chapter` is HARD-validated: a world-scope economic question
 * cannot simply be parked on the Indian chapter, so it gets pushed onto whichever
 * world subtopic is nearest by shape rather than by subject. Three hits, three
 * papers, three transcribers:
 *   - 2021-1 Q39  Milpa and Ladang (world shifting cultivation) -> World Natural
 *     Vegetation and Biomes
 *   - 2020-1 Q42  types of world farming systems -> same
 *   - 2020-2 Q38  the Climax mine, world's largest molybdenum producer -> World
 *     Political Geography, on the reasoning that the question reduces to "which
 *     country"
 * The last is the clearest symptom: a MINING question filed under POLITICAL
 * geography because the option set happened to be country names.
 *
 * Round 3 should add `World Agriculture and Farming Systems` and `World Minerals,
 * Mining and Resources` to `World and Human Geography`. Two subtopics cover all
 * three hits.
 *
 * BE PRECISE ABOUT THE SCOPE OF THE CLAIM, though: the asymmetry is PARTIAL, not
 * total. `World Ports, Straits and Maritime Geography` already exists as a
 * counterpart to the Indian `Ports and Maritime Infrastructure`, so the catalog is
 * not blind to world economic geography as a principle — it is missing two specific
 * axes. Adding only what is evidenced beats "mirror every Indian economic subtopic",
 * which would create four or five subtopics no question has ever needed.
 *
 * Individual gaps:
 *   - Indian TRIBES and ethnic communities (2023-1 Q35, Bhil/Gond/Ahom/Adi).
 *     Parked in `Population, Census and Urbanisation`. The near-misses are worse:
 *     'Other Medieval Kingdoms' names the Ahom but as a DYNASTY.
 *   - Plant mineral nutrition, macro- vs micronutrients (2024-2 Q1).
 *   - Modes of heat transfer, conduction/convection/radiation (2024-2 Q22).
 *   - Civil-service training academies, LBSNAA / NACIN (2024-2 Q31).
 *   - National symbols, Flag Code of India, state emblem (2024-2 Q32).
 *   - Agricultural science / crop biotechnology (2025-2 Q117, ICAR genome-edited
 *     rice), parked in `Health Technology, Science Awards and Anniversaries`.
 *   - Archaeological SITE identification as distinct from literature/inscriptions
 *     (2025-2 Q57 — Girnar, Cholistan, Mant, Sannati). Thin; its current home is
 *     defensible via the Girnar inscription, so this may never need an entry.
 *   - Cross-period social movements (2025-2 Q10 chains 1873 / 1928 / 1973).
 *     Thin, recorded only so it is not rediscovered as if new.
 *
 * WORTH NOTING: round 2 gave PHYSICS no entries at all, and one of the above is a
 * physics gap. Physics also swings most per paper (7 to 16 across the papers
 * ingested so far), so its catalog fit is the least well evidenced of the eight
 * subjects and deserves a deliberate look rather than another round of incidental
 * flags.
 *
 * ALREADY FIXED, listed so it is not re-proposed: `Art, Painting and Sculpture`
 * was added to Ancient India as well as Medieval, after round 2's Medieval-only
 * placement stranded Ajanta.
 */
// ROUND 3 — applied 2026-08-28, after twelve papers. Every entry below is backed by
// a transcriber hitting it on a real question and saying so, and the three biggest
// are not independent gaps at all: they are ONE rule — round 2's asymmetry rule —
// violated in three different places. See the analysis block above for the
// measurements, including the probe that overstated the Delhi Sultanate gap 3x.
//
// The `Civilian Awards, Honours and Educational Institutions` RENAME is deliberately
// NOT here. An addition prevents future mis-filing and is cheaper the earlier it
// lands; a rename only corrects filing that already happened, so its cost is
// per-question and identical whenever paid. It waits for one end-of-run pass.
/*
 * ROUND 4 CANDIDATES — evidence banked 2026-08-28, NOT applied.
 *
 * FIRST, A CORRECTION TO ROUND 3'S OWN WORK. Round 3 added `Scientists and
 * Discoveries` to Biology and Chemistry on the reasoning that "who discovered X"
 * is a question SHAPE occurring in every subject, not a physics topic. It added the
 * subtopic to the two subjects that had produced hits and left every other subject
 * alone. Within one paper of applying it, 2019-2 Q72 asked who coined the word
 * "Geography" — and GEOGRAPHY has no such subtopic either, so the question went to
 * `World History > Ancient and Classical World`.
 *
 * The rule was right and the application was too narrow: I followed the evidence to
 * the subjects that happened to have it rather than to the subjects the rule names.
 * That is the SAME mistake round 2 made twice at period-chapter level and that
 * round 3 was explicitly written to stop making. Add `Scientists and Discoveries`
 * to Geography in round 4, and when a rule of this shape is applied again, apply it
 * to every subject it names — the cost of an unused subtopic is a filter nobody
 * clicks, while the cost of a missing one is a question filed under the wrong
 * SUBJECT, which no `/browse` filter can recover.
 *
 * (Not a licence to mirror everything: the round-3 geography note declined to
 * mirror all eight Indian economic subtopics, and that was right, because there
 * the rule was about SCOPE and only two axes had ever been asked. The distinction
 * is whether the rule itself names the targets — "every science subject" does;
 * "world equivalents of Indian economic geography" does not.)

 *
 * THE ONE THAT IS CHAPTER-LEVEL, and the first since round 1: CHEMISTRY HAS NO
 * THERMODYNAMICS CHAPTER. Verified against the full catalog — Chemistry's twelve
 * chapters are Acids/Bases/Salts, Atomic Structure, Carbon, Chemical Bonding,
 * Chemical Reactions, Everyday Life, Hydrogen and Water, Industrial and Applied,
 * Matter and Its States, Metals and Non-Metals, Mole Concept, Practical — and the
 * ONLY thermodynamics home anywhere is `Physics > Heat and Thermodynamics`. So
 * 2019-1 Q79 (state functions) and Q80 (Gibbs free energy and spontaneity) were
 * filed under PHYSICS: the closest genuine home, and still the wrong SUBJECT, so a
 * student filtering `subject = Chemistry` will never see them.
 *
 * A chapter needs `newChapter: true` and more evidence than two questions from one
 * paper, so it is deliberately not bolted onto round 3. Watch for
 * enthalpy/entropy/Hess's-law rows in the remaining papers.
 *
 * WHAT 2019-1 CHANGED ABOUT THE SHAPE OF THE GAP LIST. Every earlier round found
 * gaps INSIDE the existing subject structure — a missing subtopic under a chapter
 * that exists. This paper produced the first cluster that sits OUTSIDE it:
 *   - Sociology / modern Indian social theory (Q31, Ashis Nandy) — no subject, let
 *     alone a chapter, anywhere in the catalog.
 *   - 19th-century AMERICAN history (Q43, Kansas-Nebraska Act) — World History's
 *     five chapters are Ancient/Classical, Renaissance, Enlightenment and Political
 *     Revolutions, Industrial Revolution, 20th Century. No 19th-century slot.
 *   - Medieval Islamic world / history of science outside Europe (Q42, Al-Khwarizmi).
 *   - Macroeconomic THEORY — consumption function, Keynesian effective demand (Q39,
 *     Q40). Economics' three chapters are all applied/Indian-economy.
 * These are a different KIND of finding from "add a subtopic", and the honest
 * response is not to bolt four more chapters on. The catalog was generated once from
 * NDA's GAT-GK taxonomy, and CDS evidently reaches further into academic material
 * than NDA does. Decide the SCOPE question deliberately at the end of the run, with
 * all 19 papers' evidence in hand, rather than one paper at a time.
 *
 * Subtopic-level, in chapters that already exist:
 *   - ELASTICITY — Hooke's law, stress-strain, Young's modulus (2019-1 Q85), absent
 *     from `Fluid Mechanics and Properties of Matter` despite that chapter being
 *     named for properties of matter. With KINETIC THEORY OF GASES (Q83) this
 *     corrects round 3's reading that Physics is well-fitted: it fits at CHAPTER
 *     level and still has real subtopic holes.
 *   - Medieval temple architecture (2021-2 Q58). Ancient India has `Temple and
 *     Rock-Cut Architecture` and Medieval has no counterpart — the round-2 period
 *     asymmetry again, and the closest of these to applying on its own.
 *   - Indian tribes and ethnic communities — THREE hits now (2023-1 Q35, 2020-1 Q38,
 *     2019-1 Q3 Damin-i-Koh/Santals). The best-evidenced item on this list.
 *   - Linguistic geography / world language families (2020-1 Q89 + Q90).
 *   - Polymers and plastics (2019-1 Q56 and Q78, two hits in one paper, and the two
 *     transcribers independently filed them the same way).
 *   - Colonial education and Orientalist institutions — Fort William College, the
 *     Asiatic Society, Serampore (2019-1 Q1).
 *   - Stereochemistry / conformational analysis (2019-1 Q55).
 *   - Airports and civil aviation infrastructure (2019-1 Q17, Pakyong).
 *   - Non-current book authorship: the only books-and-authors home is under CURRENT
 *     AFFAIRS, so a 1976 academic work has nowhere to go (2019-1 Q30).
 *   - Modern historiography, historians of India and their works (2019-1 Q109).
 *   - Water harvesting and watershed structures (2019-1 Q76).
 *   - World industrial cities and their products (2019-1 Q74). Same world-scope shape
 *     as the round-3 geography additions.
 *   - Taxonomic hierarchy and binomial nomenclature (2020-2 Q92); antibiotic
 *     MECHANISM as distinct from discovery (2020-2 Q110); biogeography (2020-1 Q64);
 *     crustal abundance of an element (2021-2 Q9).
 */
const ADDITIONS_ROUND3: Addition[] = [
  // ── The asymmetry rule, violation 1: a dynastic slot the Sultanate never got ──
  // Medieval India names the Mughals and Vijayanagara as chapters' worth of dynasty
  // and then lumps the rest into "Other Medieval Kingdoms (Chola, Rajput, Ahom,
  // Sikh)" — a list that does not include the Delhi Sultanate. Modest volume
  // (~0.4 q/paper, measured), but structurally obvious beside its two siblings.
  { subject: "History", chapter: "Medieval India", subtopics: ["Delhi Sultanate"],
    why: "2020-1 Q35 (Turkan-i-Chihalgani) had to go on 'Other Medieval Kingdoms', which names four dynasties and not the Sultanate; Q36 (Mongol invasions) went to Warfare. Measured across eleven committed papers: 3 genuine Sultanate questions, two of them Amir Khusrau rows already defensibly filed under Medieval Literature." },

  // ── The asymmetry rule, violation 2: attribution is not a physics topic ─────────
  // "Who discovered X" is a question SHAPE. Physics has a general slot; Biology had
  // only the topic-specific "Antibiotics — Discovery" and Chemistry had nothing, so
  // both were absorbing attribution questions into CONTENT subtopics — the exact
  // mechanism that produced the awards catch-all.
  { subject: "Biology", chapter: "Microbiology and Disease", subtopics: ["Scientists and Discoveries"],
    why: "2020-1 Q30 (Jenner and immunization) had to go on 'Antibiotics — Discovery', which is about antibiotics, not about who discovered what." },
  { subject: "Chemistry", chapter: "Atomic Structure and Periodic Classification", subtopics: ["Scientists and Discoveries"],
    why: "2020-2 Q97 (who introduced the symbols of the elements) had to go on 'Atomic Models: Dalton, Rutherford, Bohr', which is about the models rather than the attribution. Independently found by a different transcriber on a different paper from the Biology case." },

  // ── The asymmetry rule, violation 3: economic geography exists only for India ───
  // Indian Geography carries eight economic subtopics; World and Human Geography's
  // seven are all physical or political. `chapter` is HARD-validated, so a
  // world-scope economic question cannot be parked on the Indian chapter and gets
  // pushed onto whatever world subtopic is nearest BY SHAPE. Only the two evidenced
  // axes are added — world PORTS already have a counterpart, so the asymmetry is
  // partial and mirroring the whole Indian chapter would invent unused subtopics.
  { subject: "Geography", chapter: "World and Human Geography",
    subtopics: ["World Agriculture and Farming Systems", "World Minerals, Mining and Resources"],
    why: "Agriculture: 2021-1 Q39 (Milpa, Ladang) and 2020-1 Q42 (world farming-system types), both parked on 'World Natural Vegetation and Biomes'. Minerals: 2020-2 Q38 (the Climax mine, largest molybdenum producer) filed under 'World Political Geography' because its options were country names — a mining question under political geography." },

  // ── Individually-evidenced gaps ────────────────────────────────────────────────
  // The strongest single piece of evidence in the whole round: the existing subtopic
  // EXCLUDES muscle BY NAME, so this is not a judgement call about granularity.
  { subject: "Biology", chapter: "Human Physiology", subtopics: ["Muscle Tissue"],
    why: "2020-1 Q112 (structure of a cardiac muscle cell). Human Physiology's only tissue subtopic is 'Connective and Epithelial Tissues', which excludes muscle in its own name." },
  { subject: "Physics", chapter: "Heat and Thermodynamics",
    subtopics: ["Modes of Heat Transfer — Conduction, Convection and Radiation"],
    why: "2024-2 Q22. Verified absent: the chapter's four subtopics are Heat/Calorimetry/Specific Heat, Phase Change and Boiling, Temperature and Thermometry, and Thermodynamic Processes — none covers transfer. Also the only Physics gap in a subject otherwise measured as well-fitted (98 q, zero off-catalog)." },
  { subject: "History", chapter: "Modern India", subtopics: ["Art, Painting and Sculpture"],
    why: "2020-1 Q34 (modern Indian painters / art institutions). Ancient and Medieval both have this subtopic and Modern does not — the round-2 period-chapter asymmetry, still unclosed for the third period. 'Indian Literature, Poets and Cultural Figures' is a literature slot, not an art one." },
  { subject: "History", chapter: "Ancient India", subtopics: ["Archaeology, Sites and Excavations"],
    why: "2021-2 Q43 (who IDENTIFIED Taxila — an archaeology question, not a society/trade one) and 2025-2 Q57 (Girnar, Cholistan, Mant, Sannati site identification). Two independent hits." },
];

// ROUND 4 — applied 2026-08-28, with the corpus COMPLETE at 19 papers / 2,280 q.
//
// SCOPE, and what is deliberately NOT here. Only the ORDINARY additions ran: a
// missing subtopic under a chapter that already exists, with TWO OR MORE
// independent hits, plus one structural single-hit fix. Two things were held back
// for the user because neither is a filing decision:
//   - CHEMISTRY HAS NO THERMODYNAMICS CHAPTER (verified against all twelve of its
//     chapters), so state-function and Gibbs-energy rows sit under PHYSICS — the
//     closest honest home and still the wrong SUBJECT. That is a new chapter, not
//     a subtopic.
//   - Sociology, 19th-century world history, the medieval Islamic world and
//     macroeconomic THEORY sit outside the subject structure entirely. The catalog
//     came from NDA's GAT-GK taxonomy and CDS plainly reaches further into
//     academic material; adding four chapters would widen what the product claims
//     to cover. A scope call, not a catalog one.
// Single-hit non-structural gaps stay banked in the analysis block above:
// stereochemistry, kinetic theory, taxonomic hierarchy, biogeography, crustal
// abundance, electrochemistry, climate finance, notable persons, airports, legal
// maxims, economic systems, Indian political thought, public administration.
const ADDITIONS_ROUND4: Addition[] = [
  // ── 6 hits: the best-evidenced item of the entire run ──────────────────────
  // Kept out of round 3 only because it had no obvious home; it belongs beside
  // Population and Census, which is where every one of the six was parked.
  { subject: "Geography", chapter: "Indian Geography — Economy, Resources and Transport",
    subtopics: ["Indian Tribes and Ethnic Communities"],
    why: "SIX hits across five papers: 2023-1 Q35 (Bhil/Gond/Ahom/Adi), 2020-1 Q38 (Nyishi), 2019-1 Q3 (Damin-i-Koh/Santals), 2019-2 Q30 (khuntkatti) and Q59 (a List-I header literally reading 'Ethnic Territorial Segment'), 2017-2 Q1 (Todas). All were parked on Population/Census or on a History chapter; the near-miss 'Other Medieval Kingdoms' names the Ahom but as a DYNASTY." },

  // ── 4 hits each ───────────────────────────────────────────────────────────
  { subject: "Current Affairs", chapter: "Government Schemes, Policy and Governance",
    subtopics: ["Rural Development and Village-Level Schemes"],
    why: "2026-1 Q88 (SAGY), Q106 (CSIR SMART VILLAGE), Q108 (STRY/DAY-NRLM/SVEP) and 2017-2 Q119 (SAGY again). All parked on 'Government Departments and Schemes' under POLITY, which is a machinery-of-government slot rather than a rural-development one." },
  { subject: "History", chapter: "Modern India", subtopics: ["Peasant and Labour Movements"],
    why: "2018-2 Q97 (All India Kisan Sabha) and Q119 (Eka Movement), 2017-2 Q35 (AITUC) and Q37 (an opium-policy peasant struggle). Four hits across two papers, and the chapter's existing subtopics are administration, economic policy, the freedom movement and 1857 — none of which is an organised-movement slot." },
  // Language is not scoped to one hemisphere, so it goes in BOTH chapters. This is
  // the round-2 asymmetry rule applied deliberately rather than learned again:
  // adding it to only one strands the other side's questions.
  { subject: "Geography", chapter: "Indian Geography — Economy, Resources and Transport",
    subtopics: ["Languages and Linguistic Geography"],
    why: "2020-1 Q89 (Indian languages) and 2018-2 Q45 (Khasi language family) — the Indian side of a gap also hit from the world side." },
  { subject: "Geography", chapter: "World and Human Geography", subtopics: ["World Language Families"],
    why: "2020-1 Q90 (world language families) and 2016-2 Q77 (Roma-Gypsy origins, Romani as Indo-Aryan) — the world side of the same gap. Added alongside the Indian subtopic so neither side strands the other." },

  // ── 3 hits ────────────────────────────────────────────────────────────────
  { subject: "History", chapter: "Modern India", subtopics: ["Historiography and Historians of India"],
    why: "2019-1 Q109, 2017-2 Q78 and 2016-2 Q65 (Sumit Sarkar, Ranajit Guha, Bipan Chandra). The nearest home, 'Indian Literature, Poets and Cultural Figures', is a literary slot; an academic historian is not a poet." },

  // ── 2 hits each ───────────────────────────────────────────────────────────
  { subject: "Chemistry", chapter: "Carbon and Its Compounds", subtopics: ["Polymers and Plastics"],
    why: "2019-1 Q56 (Nylon 6) and Q78 (thermoplastic vs thermosetting). Both were parked on 'Common Industrial Substances and Alloys', and two different transcribers reached for the same wrong home independently." },
  { subject: "Physics", chapter: "Fluid Mechanics and Properties of Matter",
    subtopics: ["Elasticity, Hooke's Law and Young's Modulus"],
    why: "2019-1 Q85 and 2016-2 Q16. The chapter is NAMED for properties of matter and has no elasticity subtopic — the same shape as Biology's tissue slot excluding muscle by name." },
  // Ancient India has 'Temple and Rock-Cut Architecture' and Medieval had no
  // counterpart — the round-2 period asymmetry, still open after round 3.
  { subject: "History", chapter: "Medieval India", subtopics: ["Temple and Monument Architecture"],
    why: "2021-2 Q58 (a Vaishnavite temple, all four options Chola-era) and 2017-2 Q77. Ancient India carries 'Temple and Rock-Cut Architecture'; Medieval carried nothing equivalent despite being the period of the great monument-building." },
  { subject: "Current Affairs", chapter: "National Events, Persons and India General Knowledge",
    subtopics: ["National Symbols, Emblems and Protocol"],
    why: "2024-2 Q32 (Flag Code of India, state emblem), 2020-1 Q98 (national fish) and 2026-1 Q105 (Table of Precedence). Three hits." },
  { subject: "Polity", chapter: "Government Structure — Parliament, Judiciary and Constitutional Bodies",
    subtopics: ["Civil Services and Training Academies"],
    why: "2024-2 Q31 (LBSNAA/NACIN), 2020-1 Q110 (National Water Academy) and 2017-2 Q86/Q106 (Art. 311, All India Services). The constitutional provisions and the academies are the same subject and had no slot." },

  // ── Structural single hit: correcting round 3's own application of its rule ──
  // Round 3 added 'Scientists and Discoveries' to Biology and Chemistry on the
  // reasoning that "who discovered X" is a question SHAPE occurring in every
  // subject — then added it only to the subjects that had already produced hits.
  // Geography produced one within a paper. See the analysis block above.
  { subject: "Geography", chapter: "Earth in Space, Maps and Coordinates",
    subtopics: ["Geographers, Scientists and Discoveries"],
    why: "2019-2 Q72 (who coined the word 'Geography') had to go to World History > Ancient and Classical World. Physics, Biology and Chemistry all carry such a slot after round 3; Geography did not, which is round 3's rule applied too narrowly rather than a new finding." },
];

// ROUND 5 — applied 2026-08-28, after measuring the two items round 4 deferred.
//
// THE MEASUREMENT CORRECTED THE FRAMING, which is the point of this round. Both
// had been described as a cluster sitting "outside the subject structure entirely"
// and needing new CHAPTERS. Measured across all 2,280 committed questions, only
// one of them is even in the wrong subject, and the largest is not a scope
// question at all:
//
//   macro theory        6 q — and ALL SIX ARE ALREADY FILED UNDER ECONOMICS.
//                       Right subject, applied chapters. An ordinary subtopic
//                       addition, not a scope decision.
//   chem thermodynamics 2 q — the ONLY case in the corpus of questions under the
//                       WRONG SUBJECT (they sit in Physics). A new chapter for two
//                       questions is disproportionate; a subtopic fixes the subject
//                       error at ordinary cost.
//   sociology           2 q — both defensibly filed already (Ashis Nandy under
//                       History/Modern India, Burnham under Polity/Political Theory)
//   19th-c world hist   2 q — of four probe hits, TWO WERE FALSE POSITIVES (the
//                       Deccan Riots and the Hathigumpha inscription both matched on
//                       "confederacy" and are Indian history, correctly filed)
//   medieval Islamic    1 q — of four hits, THREE are Al-Biruni and Ibn Battuta
//                       under Medieval Travellers, which is right: they are sources
//                       FOR Indian history
//
// So the last three total FIVE questions across NINETEEN papers, ~0.26/paper, most
// already sitting somewhere reasonable. No new chapters were added for them. The two
// genuinely awkward rows — Kansas-Nebraska (1854) under "Enlightenment and Political
// Revolutions", and Al-Khwarizmi (9th c.) under "Ancient and Classical World" — were
// checked for a better existing home and have none, since World History carries no
// 19th-century and no medieval chapter. They stay put rather than justify structure
// on their own.
//
// The probe also UNDER-counted chemistry, missing the Gibbs-energy row because it
// matched "spontaneit" and the stem says "spontaneous". Both directions of probe
// error in one round: two false positives and one false negative.
const ADDITIONS_ROUND5: Addition[] = [
  { subject: "Economics", chapter: "National Income, Growth and Development Indicators",
    subtopics: ["Macroeconomic Theory and Schools of Thought"],
    why: "SIX hits, the largest single gap left: 2016-2 Q91 (Classical Theory of Employment) and Q92 (capital deepening), 2018-2 Q54 (natural-rate hypothesis), 2019-1 Q40 (Keynes on employment), 2021-2 Q69, 2022-1 Q37 (deficit financing). All six were already under Economics — five in this very chapter — so this is a chapter-fit problem, not a subject one: every Economics chapter is applied or Indian-institutional and none holds THEORY or the history of economic thought." },
  { subject: "Chemistry", chapter: "Chemical Reactions",
    subtopics: ["Thermochemistry and Energetics"],
    why: "2019-1 Q79 (which of q+w, q, w, H-TS are state functions) and Q80 (Gibbs energy and the minimum temperature for spontaneity). THE ONLY QUESTIONS IN THE CORPUS FILED UNDER THE WRONG SUBJECT — both sit in Physics > Heat and Thermodynamics, the closest honest home available, and a student filtering Chemistry cannot reach them by any /browse control. Chemistry genuinely has no thermodynamics CHAPTER, but two questions at 0.11/paper do not warrant one; a subtopic corrects the subject error at ordinary-addition cost and the chapter question can be revisited if the rate ever rises." },
];

function main() {
  const apply = process.argv.includes("--apply");
  const path = join(__dirname, "catalog.json");
  const catalog: Catalog = JSON.parse(readFileSync(path, "utf8"));

  let newChapters = 0;
  let newSubtopics = 0;
  const errors: string[] = [];

  for (const a of [...ADDITIONS, ...ADDITIONS_ROUND2, ...ADDITIONS_ROUND3, ...ADDITIONS_ROUND4, ...ADDITIONS_ROUND5]) {
    const chapters = catalog[a.subject];
    if (!chapters) {
      errors.push(`unknown subject "${a.subject}" — additions never create a subject`);
      continue;
    }
    const exists = Object.prototype.hasOwnProperty.call(chapters, a.chapter);
    if (a.newChapter && exists) {
      // Not fatal on a re-run, but a NEW chapter that already exists on a FIRST
      // run would mean the adjudication misread the catalog.
      console.log(`  = ${a.subject} / ${a.chapter}  (already present)`);
    }
    if (!a.newChapter && !exists) {
      errors.push(
        `${a.subject}: "${a.chapter}" is not an existing chapter, but the addition is not marked newChapter. ` +
          `Refusing to guess — a typo here silently creates a duplicate chapter.`
      );
      continue;
    }
    if (!exists) {
      chapters[a.chapter] = [];
      newChapters++;
      console.log(`  + CHAPTER  ${a.subject} / ${a.chapter}`);
    }
    for (const st of a.subtopics) {
      if (chapters[a.chapter].includes(st)) continue;
      chapters[a.chapter].push(st);
      newSubtopics++;
      console.log(`  + subtopic ${a.subject} / ${a.chapter} / ${st}`);
    }
    chapters[a.chapter].sort((x, y) => x.localeCompare(y));
  }

  if (errors.length) {
    console.log(`\nERRORS (${errors.length}):`);
    for (const e of errors) console.log(`  ${e}`);
    throw new Error("refusing to apply — fix the additions first.");
  }

  const nCh = Object.values(catalog).reduce((a, c) => a + Object.keys(c).length, 0);
  const nSt = Object.values(catalog).reduce(
    (a, c) => a + Object.values(c).reduce((b, s) => b + s.length, 0),
    0
  );
  console.log(`\n+${newChapters} chapter(s), +${newSubtopics} subtopic(s)`);
  console.log(`catalog now: ${Object.keys(catalog).length} subjects, ${nCh} chapters, ${nSt} subtopics`);

  if (!apply) {
    console.log("\n[dry-run] pass --apply to rewrite catalog.json. Nothing written.");
    return;
  }
  writeFileSync(path, JSON.stringify(catalog, null, 2) + "\n", "utf8");
  console.log(`\nwrote ${path}`);
}

main();
