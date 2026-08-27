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
 * These are `catalog-gap` flags that survived round 2, i.e. a transcriber holding
 * the 297-subtopic catalog still found nothing that fitted. Recorded here rather
 * than left in band reports, because a gap noticed and forgotten is worse than one
 * never noticed — it gets silently re-parked somewhere wrong on the next paper.
 *
 *   - Plant mineral nutrition — macro- vs micronutrients (2024-2 Q1). Parked in
 *     `Plant Biology > Transpiration, Tropisms and Plant Processes`.
 *   - Modes of heat transfer — conduction / convection / radiation (2024-2 Q22).
 *     Parked in `Heat, Calorimetry and Specific Heat`.
 *   - Civil-service training academies and their locations, LBSNAA / NACIN
 *     (2024-2 Q31). Parked in `Polity > Government Departments and Schemes`.
 *   - National symbols — Flag Code of India, state emblem (2024-2 Q32). Parked in
 *     `National Institutions, Milestones and History`.
 *
 * WORTH NOTING STRUCTURALLY: round 2 gave PHYSICS no entries at all, and one of
 * the four above is a physics gap. Physics is also the subject whose per-paper
 * count swings most (7 to 16 across the papers ingested so far), so its catalog
 * fit is the least well evidenced of the eight and deserves a deliberate look
 * rather than another round of incidental flags.
 */
function main() {
  const apply = process.argv.includes("--apply");
  const path = join(__dirname, "catalog.json");
  const catalog: Catalog = JSON.parse(readFileSync(path, "utf8"));

  let newChapters = 0;
  let newSubtopics = 0;
  const errors: string[] = [];

  for (const a of [...ADDITIONS, ...ADDITIONS_ROUND2]) {
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
