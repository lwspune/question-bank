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

function main() {
  const apply = process.argv.includes("--apply");
  const path = join(__dirname, "catalog.json");
  const catalog: Catalog = JSON.parse(readFileSync(path, "utf8"));

  let newChapters = 0;
  let newSubtopics = 0;
  const errors: string[] = [];

  for (const a of ADDITIONS) {
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
