/**
 * MPSC Group B & C combined preliminary papers — the paper registry.
 *
 * SOURCE: one merged scan, `Group B & C Pre Papers 2017 to 2024.pdf` (557 pages,
 * iLovePDF), holding 14 Set-A booklets of the "सामान्य क्षमता चाचणी" (General
 * Ability Test) — 100 questions, 100 marks, 1 hour, −¼ per wrong answer
 * (booklet instruction 7) — each followed by the Commission's FINAL answer key
 * (published after the objection round). Page numbers below are 1-based PDF
 * pages, located by the booklet cover's black banner and read from each key's
 * header.
 *
 * TWO TRAPS IN THE FILE:
 *  - The 2020 Group B key (pp.127-128) sits BEFORE its paper (pp.129-168),
 *    immediately after the 2019 key — so "the key follows the paper" is not a rule.
 *  - The 2019 Group C key (pp.362-363) has NO text layer; it is transcribed by
 *    hand into data/2019-c.keytokens.json rather than extracted.
 *
 * `pyqYear` is MPSC's EXAM-YEAR label, not the sitting date: the "2020" Group B
 * exam sat on 4 Sep 2021 and both "2024" exams in 2025. The sitting date is in
 * `pyqNote`, which is what a student recognises.
 *
 * `sourceFile` is a per-paper label, not the PDF name — all 14 papers share one
 * PDF, and `source_file` is the rollback + mock-sitting key, so it must name ONE
 * paper.
 */
import { join } from "node:path";
import { SUBJECT_CHAPTERS as MAINS_CHAPTERS } from "../mpsc-mains/lib";
import { KEY_DOUBT_NOTICES } from "./keyDoubtNotices";
import { notice } from "./notice";

export const SOURCE_PDF = "C:/Users/vilas/Downloads/Group B & C Pre Papers 2017 to 2024.pdf";
/**
 * The State Services (Rajyaseva) Prelims scan: 10 GS Paper I booklets, Set A,
 * 2013-2022, compiled by a coaching institute (THE ACHIEVERS MENTORSHIP header on
 * every page — never crop it into a figure). Its hand-drawn answer boxes are NOT
 * the key: each paper's key is the Commission's own FINAL key, a separate PDF
 * (mpscmaterial.com mirrors of the mpsc.gov.in files) in SSP_KEY_DIR.
 */
export const SSP_SOURCE_PDF = "C:/Users/vilas/Downloads/MPSC Rajyaseva PYQ by ACHIEVERS MENTORSHIP.pdf";
export const SSP_KEY_DIR = "C:/Users/vilas/Downloads/mpsc-ssp-final-keys";
/**
 * CSAT Paper II: each year's booklet and final key are their own PDFs from
 * mpscmaterial.com (paper-<year>.pdf, key-<year>.pdf). The file named
 * paper-2017.pdf is really the 2018 booklet (cover: G11, 8 April 2018) and no
 * 2017 booklet was on the listing, so 2017 has a key but no paper.
 */
export const SSP_CSAT_DIR = "C:/Users/vilas/Downloads/mpsc-ssp-csat";
/**
 * State Services 2023-2025, both papers: MPSC's booklets and keys as posted on
 * Google Drive by Physics Wallah (2026-11-03). paper-<gs|csat>-<year>.pdf and
 * key-<gs|csat>-<year>.pdf. The 2024 booklets are a candidate's used copies,
 * photographed (ticks and circles on options, an "@SPOTLESS_MPSC" mark, some
 * pages sideways): the marks are a cross-check at most, never the key. The 2025
 * papers shipped on MPSC's FIRST keys and moved to the FINAL keys on 2026-11-04
 * (MPSC_2026_DIR).
 */
export const SSP_2023_DIR = "C:/Users/vilas/Downloads/mpsc-ssp-2023-2025";
/**
 * MPSC's own files from mpsc.gov.in (2026-11-04): the 2026 sittings' booklets and
 * FINAL keys, and the FINAL keys of both 2025 State Services papers (published
 * 2 Jan 2026), which replaced the first keys those papers shipped on. The site's
 * file links only work through its own pages; see README "Sources".
 */
export const MPSC_2026_DIR = "C:/Users/vilas/Downloads/mpsc-2026";
const FINAL_KEY_2025: Record<string, string> = {
  gs: `${MPSC_2026_DIR}/key-gs-2025-final.pdf`,
  csat: `${MPSC_2026_DIR}/key-csat-2025-final.pdf`,
};

/** The exams this pipeline writes to. Ids are printed by seed.ts --apply. */
export type ExamKey = "gbc" | "ssp" | "fsp" | "asp";
export const EXAMS: Record<ExamKey, { name: string; id: string | null }> = {
  gbc: { name: "MPSC Group B & C Prelims", id: "583f914f-f323-42ed-ae7c-5e445ed796c3" },
  ssp: { name: "MPSC State Services Prelims", id: "a61ef55d-baf5-4e15-a4c2-2ac599519229" }, // seed.ts ssp --apply, 2026-09-27
  fsp: { name: "MPSC Forest Service Prelims", id: "646ced4c-5ec8-4896-b4f6-5bd141bb3926" }, // seed.ts fsp --apply, 2026-10-16
  asp: { name: "MPSC Agriculture Service Prelims", id: "2e99a09c-6422-4360-a33c-8e13aeb231ec" }, // seed.ts asp --apply, 2026-11-02
};
/** Kept for the Group B & C callers that predate EXAMS. */
export const EXAM_NAME = EXAMS.gbc.name;
export const EXAM_ID = EXAMS.gbc.id!;

/** A paper's exam row id — refuses an exam seed.ts has not created yet. */
export function examIdFor(paper: Paper): string {
  const id = EXAMS[paper.exam].id;
  if (!id) throw new Error(`exam "${EXAMS[paper.exam].name}" has no id yet — run seed.ts --apply and paste it into EXAMS`);
  return id;
}
/** Founding tenant org + the superadmin who owns ingested content (same as every pipeline). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export type Group = "B" | "C" | "B+C";

export type Paper = {
  id: string;
  exam: ExamKey;
  /** Group B & C only. */
  group?: Group;
  /** The scan holding the booklet. */
  sourcePdf: string;
  /** The key's own PDF, when it is not inside `sourcePdf` (then `keyPages` are its pages). */
  keyPdf?: string;
  pyqYear: number;
  /** Sitting date, ISO. */
  date: string;
  /** Printed booklet code (series + number). */
  code: string;
  /** First and last PDF page of the booklet (cover included). */
  pages: [number, number];
  keyPages: [number, number];
  /** Questions in the booklet; absent means QUESTIONS_PER_PAPER. */
  questions?: number;
  /** The fixed subject -> chapter list merge.ts holds this paper to (absent: none). */
  chapters?: Record<string, readonly string[]>;
  /** Key has no text layer — tokens are hand-transcribed. */
  keyImageOnly?: boolean;
  /**
   * The key on file is the Commission's FIRST (provisional) key — its header
   * invites objections — not the final one. Every answer is checked against the
   * transcriber's own (boxes.json) before commit.
   */
  provisionalKey?: boolean;
  /**
   * Questions left out of the bank on purpose, number -> why. merge.ts and
   * commit.ts expect every OTHER number; a paper with an omission is never a
   * whole-paper mock.
   */
  omitted?: Record<number, string>;
  /**
   * Questions whose MPSC key the owner judged doubtful (2026-11-02): the key is
   * KEPT, this notice heads the solution in both languages, and the mock awards
   * the question to every candidate (scripts/mocks/mpscSittings.ts).
   */
  notices?: Record<number, { en: string; mr: string }>;
  /**
   * Questions MPSC's final key exempts from negative marking beyond the
   * decision-making ones. CSAT 2015 only: sets B and C printed the five
   * decision-making questions in another set's place, so MPSC waived the penalty
   * on the fifteen questions that moved, in every set (key-2015.pdf p.3). For
   * the mock's marking; not used by the bank.
   */
  noPenalty?: number[];
  /** The booklet's set (संच), whose column of the 4-set key applies. Absent: A. */
  bookletSet?: "A" | "B" | "C" | "D";
  pyqNote: string;
  sourceFile: string;
};

const paper = (
  id: string,
  group: Group,
  pyqYear: number,
  date: string,
  code: string,
  pages: [number, number],
  keyPages: [number, number],
  label: string,
  extra: Partial<Paper> = {}
): Paper => ({
  id,
  exam: "gbc",
  group,
  sourcePdf: SOURCE_PDF,
  pyqYear,
  date,
  code,
  pages,
  keyPages,
  pyqNote: label,
  sourceFile: `MPSC-${id}-${code}`,
  ...extra,
});

export const PAPERS: Paper[] = [
  paper("2017-b", "B", 2017, "2017-07-16", "NO9", [1, 32], [33, 34], "Group B · 16 Jul 2017"),
  paper("2018-b", "B", 2018, "2018-05-13", "H11", [35, 82], [83, 84], "Group B · 13 May 2018"),
  paper("2019-b", "B", 2019, "2019-03-24", "V12", [85, 124], [125, 126], "Group B · 24 Mar 2019"),
  paper("2020-b", "B", 2020, "2021-09-04", "A14", [129, 168], [127, 128], "Group B · 4 Sep 2021"),
  paper("2021-b", "B", 2021, "2022-02-26", "U14", [169, 208], [209, 210], "Group B · 26 Feb 2022"),
  paper("2022-b", "B", 2022, "2022-10-08", "A16", [211, 250], [251, 252], "Group B · 8 Oct 2022"),
  paper("2017-c", "C", 2017, "2017-05-28", "B09", [253, 288], [289, 290], "Group C (Excise SI) · 28 May 2017"),
  paper("2018-c", "C", 2018, "2018-06-10", "J11", [292, 323], [324, 325], "Group C · 10 Jun 2018"),
  paper("2019-c", "C", 2019, "2019-06-16", "Y12", [326, 361], [362, 363], "Group C · 16 Jun 2019", {
    keyImageOnly: true,
  }),
  paper("2021-c", "C", 2021, "2022-04-03", "Y14", [364, 395], [396, 397], "Group C · 3 Apr 2022"),
  paper("2022-c", "C", 2022, "2022-11-05", "F16", [398, 429], [430, 431], "Group C · 5 Nov 2022"),
  paper("2023-bc", "B+C", 2023, "2023-04-30", "J17", [432, 471], [472, 473], "Group B & C · 30 Apr 2023"),
  paper("2024-b", "B", 2024, "2025-02-02", "H19", [474, 513], [514, 515], "Group B · 2 Feb 2025"),
  paper("2024-c", "C", 2024, "2025-06-01", "R19", [516, 555], [556, 557], "Group C · 1 Jun 2025"),
];

/**
 * The ONLY subject/chapter pairs a State Services Prelims transcription may use
 * (merge.ts refuses anything else). Fixed up front so ten papers transcribed
 * over many sessions land on one taxonomy. Subjects mirror seed.ts SUBJECTS.ssp.
 */
export const SSP_CHAPTERS: Record<string, readonly string[]> = {
  History: [
    "Ancient India", "Medieval India", "Modern India: British Rule", "Socio-Religious Reform Movements",
    "Indian National Movement", "History of Maharashtra", "Post-Independence India", "Art and Culture", "World History",
  ],
  Geography: ["Physical Geography", "Geography of India", "Geography of Maharashtra", "World Geography", "Human and Economic Geography"],
  Polity: [
    "Indian Constitution", "Union and State Government", "Judiciary", "Local Self-Government",
    "Constitutional and Statutory Bodies", "Rights, Laws and Policy",
  ],
  Economics: [
    "Indian Economy", "Economy of Maharashtra", "Planning and Development", "Money, Banking and Finance",
    "Agriculture and Rural Development", "Government Schemes and Programmes", "International Economy",
  ],
  "General Science": ["Physics", "Chemistry", "Biology", "Health and Diseases", "Science and Technology"],
  Environment: ["Ecology and Ecosystems", "Biodiversity and Conservation", "Climate Change and Pollution", "Environmental Laws and Institutions"],
  "Current Affairs": [
    "National Affairs", "International Affairs", "Maharashtra Affairs", "Awards and Honours", "Sports",
    "Science, Technology and Space", "Defence and Security", "Economy in News", "Books and Persons",
  ],
};

/**
 * State Services Prelims, GS Paper I — 100 questions, 200 marks, 2 hours, -1/4 of
 * a question's marks per wrong answer (booklet instruction 7). Page ranges are
 * 1-based pages of SSP_SOURCE_PDF, read from each booklet's cover; the scan is NOT
 * in year order (2017 precedes 2018, 2013 precedes 2014). `pyqYear` is the
 * exam-year label: the "2020" paper sat on 21 Mar 2021 and "2021" on 23 Jan 2022.
 * Dates are the final key's "परीक्षेचा दिनांक".
 */
const ssp = (pyqYear: number, date: string, code: string, pages: [number, number], label: string): Paper => ({
  id: `ssp-${pyqYear}`,
  exam: "ssp",
  pyqYear,
  date,
  code,
  pages,
  sourcePdf: SSP_SOURCE_PDF,
  keyPdf: `${SSP_KEY_DIR}/${pyqYear}.pdf`,
  keyPages: [1, 2],
  pyqNote: `GS Paper I · ${label}`,
  sourceFile: `MPSC-ssp-${pyqYear}-${code}`,
  chapters: SSP_CHAPTERS,
});

/**
 * The owner's 2026-11-03 ruling on the doubtful keys in the State Services
 * 2023-2025 papers: notice + grace, MPSC's key kept (the 2026-11-02 Forest and
 * Agriculture ruling).
 */
const SSP_2023_2025_NOTICES: Record<string, Record<number, { en: string; mr: string }>> = {
  "ssp-2023": {
    17: notice(
      "MPSC's key gives option C, nitrogen trioxide. When soil bacteria break down nitrogen fertilisers (nitrification and denitrification), the gas they release is nitrous oxide, \\(\\mathrm{N_2O}\\), option B.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C, नायट्रोजन ट्रायऑक्साइड, बरोबर दिला आहे. मातीतील जिवाणू नायट्रोजन खतांचे विघटन करतात (नायट्रीकरण व विनायट्रीकरण) तेव्हा मुक्त होणारा वायू नायट्रस ऑक्साइड, \\(\\mathrm{N_2O}\\), म्हणजे पर्याय B आहे."
    ),
    50: notice(
      "MPSC's key gives option C. AMRUT's first aim is a tap and sewerage connection for every household, so statement C is correct. The incorrect statement is more likely B: AMRUT was launched in 2015 by the Ministry of Urban Development, which became the Ministry of Housing and Urban Affairs only in 2017.",
      "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. प्रत्येक घराला नळजोडणी व मलनिःसारण जोडणी देणे हे अमृत योजनेचे पहिले उद्दिष्ट आहे, म्हणून विधान C बरोबर आहे. चुकीचे विधान बहुधा B आहे: अमृत योजना 2015 मध्ये नगरविकास मंत्रालयाने सुरू केली; त्याचे गृहनिर्माण व नागरी व्यवहार मंत्रालय 2017 मध्ये झाले."
    ),
  },
  // ssp-2025 Q84's notice (key 1990 vs 1992) was dropped 2026-11-04: MPSC's
  // FINAL key gives C, 1992.
  "ssp-csat-2024": {
    64: notice(
      "MPSC's key gives option B. The passage says we are surrounded by people who enjoy the suffering of others; it does not say that most people become happy that way. Option A follows the whole paragraph: empathy brings kind acts and happiness, while jealousy and greed poison social life and lower the self-esteem of others.",
      "आयोगाच्या उत्तरतालिकेत पर्याय B बरोबर दिला आहे. इतरांच्या दुःखात आनंद मानणारे लोक आपल्याभोवती असतात एवढेच उताऱ्यात म्हटले आहे; बहुतेक लोक त्यातून आनंदी होतात असे म्हटलेले नाही. पर्याय A संपूर्ण उताऱ्याचा आशय मांडतो: सहानुभूतीमुळे दयाळू कृती व आनंद मिळतो, तर मत्सर व लोभ सामाजिक जीवन विषारी करतात आणि इतरांचा आत्मसन्मान कमी करतात."
    ),
  },
  "ssp-csat-2025": {
    58: notice(
      "No option is right as printed. Three of the 13 balls are red, so the probability that all three balls drawn are red is \\(\\frac{1}{\\binom{13}{3}} = \\frac{1}{286}\\), which is not an option. MPSC's key gives option C, \\(\\frac{2}{91}\\).",
      "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. 13 बॉलपैकी 3 लाल आहेत, म्हणून काढलेले तिन्ही बॉल लाल असण्याची शक्यता \\(\\frac{1}{\\binom{13}{3}} = \\frac{1}{286}\\) आहे; हे उत्तर पर्यायांमध्ये नाही. आयोगाच्या उत्तरतालिकेत पर्याय C, \\(\\frac{2}{91}\\), दिला आहे."
    ),
  },
};
const notices2023 = (id: string) => (SSP_2023_2025_NOTICES[id] ? { notices: SSP_2023_2025_NOTICES[id] } : {});

export const SSP_PAPERS: Paper[] = [
  ssp(2022, "2022-08-21", "H15", [1, 40], "21 Aug 2022"),
  ssp(2021, "2022-01-23", "O14", [41, 88], "23 Jan 2022"),
  ssp(2020, "2021-03-21", "Y13", [89, 136], "21 Mar 2021"),
  ssp(2019, "2019-02-17", "T12", [137, 184], "17 Feb 2019"),
  ssp(2017, "2017-04-02", "W08", [185, 232], "2 Apr 2017"),
  ssp(2018, "2018-04-08", "F11", [233, 276], "8 Apr 2018"),
  ssp(2016, "2016-04-10", "N07", [277, 316], "10 Apr 2016"),
  ssp(2015, "2015-04-05", "V05", [317, 364], "5 Apr 2015"),
  ssp(2013, "2013-05-18", "X01", [365, 412], "18 May 2013"),
  ssp(2014, "2014-02-02", "G03", [413, 460], "2 Feb 2014"),
  ...([
    [2023, "2023-06-04", "Q17", 46, "4 Jun 2023", "A"],
    [2024, "2024-12-01", "W18", 45, "1 Dec 2024", "D"],
    [2025, "2025-11-09", "E21", 46, "9 Nov 2025", "C"],
  ] as const).map(([y, date, code, n, label, set]): Paper => ({
    ...ssp(y, date, code, [1, n], label),
    ...notices2023(`ssp-${y}`),
    sourcePdf: `${SSP_2023_DIR}/paper-gs-${y}.pdf`,
    keyPdf: y === 2025 ? FINAL_KEY_2025.gs : `${SSP_2023_DIR}/key-gs-${y}.pdf`,
    bookletSet: set,
  })),
];

/**
 * CSAT Paper II's fixed list. Comprehension chapters group passages by theme
 * (the subtopic is the passage title, so a passage's questions stay together);
 * the aptitude heads follow the syllabus; decision-making questions carry their
 * own marking rule (no penalty), so they are their own subject.
 */
export const SSP_CSAT_CHAPTERS: Record<string, readonly string[]> = {
  Comprehension: [
    "Society and Development", "Environment and Science", "Economy and Governance",
    "History and Culture", "Education and Personality", "Language Comprehension",
  ],
  "Reasoning and Aptitude": ["Logical Reasoning", "Analytical Ability", "General Mental Ability", "Basic Numeracy", "Data Interpretation"],
  "Decision Making": ["Decision Making and Problem Solving", "Interpersonal and Communication Skills"],
};

/**
 * State Services Prelims, CSAT Paper II — 80 questions, 200 marks, 2 hours.
 * Each booklet and key is its own PDF in SSP_CSAT_DIR; `file` is the year in
 * the booklet's file name (see SSP_CSAT_DIR for the 2018 mislabel). The key's
 * page range is its whole file (2015's runs to 3 pages).
 */
const csat = (pyqYear: number, date: string, code: string, pageCount: number, label: string, file = pyqYear): Paper => ({
  id: `ssp-csat-${pyqYear}`,
  exam: "ssp",
  pyqYear,
  date,
  code,
  pages: [1, pageCount],
  sourcePdf: `${SSP_CSAT_DIR}/paper-${file}.pdf`,
  keyPdf: `${SSP_CSAT_DIR}/key-${pyqYear}.pdf`,
  keyPages: [1, pyqYear === 2015 ? 3 : 2],
  questions: 80,
  chapters: SSP_CSAT_CHAPTERS,
  pyqNote: `CSAT Paper II · ${label}`,
  sourceFile: `MPSC-ssp-csat-${pyqYear}-${code}`,
});

export const SSP_CSAT_PAPERS: Paper[] = [
  csat(2022, "2022-08-21", "I15", 64, "21 Aug 2022"),
  csat(2021, "2022-01-23", "P14", 56, "23 Jan 2022"),
  csat(2020, "2021-03-21", "Z13", 64, "21 Mar 2021"),
  csat(2019, "2019-02-17", "U12", 56, "17 Feb 2019"),
  csat(2018, "2018-04-08", "G11", 56, "8 Apr 2018", 2017),
  csat(2016, "2016-04-10", "O07", 56, "10 Apr 2016"),
  { ...csat(2015, "2015-04-05", "W05", 56, "5 Apr 2015"), noPenalty: [46, 47, 48, 49, 50, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80] },
  csat(2014, "2014-02-02", "H03", 48, "2 Feb 2014"),
  csat(2013, "2013-05-18", "Y01", 48, "18 May 2013"),
  ...([
    [2023, "2023-06-04", "R17", 64, "4 Jun 2023", "D"],
    [2024, "2024-12-01", "X18", 43, "1 Dec 2024", "D"],
    [2025, "2025-11-09", "F21", 52, "9 Nov 2025", "C"],
  ] as const).map(([y, date, code, n, label, set]): Paper => ({
    ...csat(y, date, code, n, label),
    ...notices2023(`ssp-csat-${y}`),
    sourcePdf: `${SSP_2023_DIR}/paper-csat-${y}.pdf`,
    keyPdf: y === 2025 ? FINAL_KEY_2025.csat : `${SSP_2023_DIR}/key-csat-${y}.pdf`,
    keyPages: [1, 2],
    bookletSet: set,
  })),
];

/**
 * Forest Service (महाराष्ट्र वन सेवा) and Agriculture Service (महाराष्ट्र कृषि सेवा)
 * Prelims sit in the back of the merged MAINS scan (`All PYQ mar eng.pdf`, the
 * source of scripts/mpsc-mains), pp.741-1081, each booklet followed by its key.
 * Both are "मराठी, इंग्रजी व सामान्य अध्ययन": a Marathi grammar section printed in
 * Marathi only, an English section in English only, then GS and aptitude printed
 * in both — Agriculture adds an agriculture head ("कृषि विषयक घटक").
 *
 * The language sections reuse the Mains chapter lists, so an MPSC grammar
 * question lands on one taxonomy whichever paper it came from.
 */
export const MERGED_MAINS_PDF = "C:/Vilas/LWS_Pune/MPSC/All PYQ mar eng (1).pdf";

const languageChapters = {
  Marathi: MAINS_CHAPTERS.Marathi as readonly string[],
  English: MAINS_CHAPTERS.English as readonly string[],
};
export const FSP_CHAPTERS: Record<string, readonly string[]> = {
  ...languageChapters,
  ...SSP_CHAPTERS,
  "Reasoning and Aptitude": SSP_CSAT_CHAPTERS["Reasoning and Aptitude"],
};
export const ASP_CHAPTERS: Record<string, readonly string[]> = {
  ...FSP_CHAPTERS,
  Agriculture: [
    "Agronomy and Field Crops", "Soil Science and Fertilisers", "Irrigation and Water Management",
    "Horticulture", "Plant Protection", "Animal Husbandry, Dairy and Fisheries",
    "Agricultural Economics and Schemes", "Agricultural Research and Extension",
  ],
};

const prelims = (
  exam: "fsp" | "asp",
  pyqYear: number,
  date: string,
  code: string,
  pages: [number, number],
  keyPages: [number, number],
  label: string,
  extra: Partial<Paper> = {}
): Paper => ({
  id: `${exam}-${pyqYear}`,
  exam,
  pyqYear,
  date,
  code,
  pages,
  keyPages,
  sourcePdf: MERGED_MAINS_PDF,
  chapters: exam === "fsp" ? FSP_CHAPTERS : ASP_CHAPTERS,
  pyqNote: label,
  sourceFile: `MPSC-${exam}-${pyqYear}-${code}`,
  ...extra,
});


/** The owner's 2026-11-02 ruling on every doubtful key in these papers: notice + grace, key kept. */
const FSP_2014_NOTICES = {
  55: notice(
    "MPSC's key gives option A, (a) or (d). The woman's words show only that the person is her brother or sister, or herself; nothing says the person is a woman, so option C fits better.",
    "आयोगाच्या उत्तरतालिकेत पर्याय A, (a) किंवा (d), बरोबर दिला आहे. स्त्रीच्या विधानावरून ती व्यक्ती तिचा भाऊ किंवा बहीण किंवा ती स्वतः आहे एवढेच कळते; ती व्यक्ती स्त्री आहे असे कुठेही म्हटलेले नाही, म्हणून पर्याय C अधिक योग्य ठरतो."
  ),
  63: notice(
    "MPSC's key gives option C. Reading the three dots clockwise, options A, C and D are mirror images of the first figure and only B is a rotation of it, so B is the odd one out.",
    "आयोगाच्या उत्तरतालिकेत पर्याय C बरोबर दिला आहे. तीन ठिपके घड्याळाच्या दिशेने वाचल्यास पर्याय A, C व D हे पहिल्या आकृतीचे आरशातील प्रतिबिंब आहेत आणि फक्त B हा त्याच आकृतीचा फिरवलेले रूप आहे, म्हणून B वेगळा आहे."
  ),
  67: notice(
    "No option is exactly right as printed. If \\(t\\) minutes remain until noon, then \\(145 - t = 2t\\), so \\(t = 48\\tfrac{1}{3}\\); MPSC's key gives option C, 47.",
    "छापलेल्या स्वरूपात कोणताही पर्याय अचूक नाही. दुपारी 12 वाजण्यास \\(t\\) मिनिटे बाकी असल्यास \\(145 - t = 2t\\), म्हणजे \\(t = 48\\tfrac{1}{3}\\); आयोगाच्या उत्तरतालिकेत पर्याय C, 47, दिला आहे."
  ),
  74: notice(
    "No option is right as printed. Two days after Monday is Wednesday, the day immediately after is Thursday, two days after that is Saturday, and three days after Saturday is Tuesday, which is not an option. MPSC's key gives option B, Friday.",
    "छापलेल्या स्वरूपात कोणताही पर्याय बरोबर नाही. सोमवारनंतर दोन दिवसांनी बुधवार, त्यानंतरचा दिवस गुरुवार, त्यानंतर दोन दिवसांनी शनिवार आणि शनिवारनंतर तीन दिवसांनी मंगळवार येतो; मंगळवार पर्यायांमध्ये नाही. आयोगाच्या उत्तरतालिकेत पर्याय B, शुक्रवार, दिला आहे."
  ),
};
const ASP_2011_NOTICES = {
  41: notice(
    "MPSC's key gives option D, no article. The sentence needs the definite article, \"The Himalaya is the biggest mountain in India\", option C.",
    "आयोगाच्या उत्तरतालिकेत पर्याय D (आर्टिकल नाही) बरोबर दिला आहे. या वाक्याला निश्चित आर्टिकल हवे: \"The Himalaya is the biggest mountain in India\", म्हणजे पर्याय C."
  ),
  42: notice(
    "MPSC's key gives option B, \"go\". With \"neither ... nor\" the verb agrees with the nearer subject, \"his sister\", which is singular: \"Neither the boy nor his sister goes to school\", option C.",
    "आयोगाच्या उत्तरतालिकेत पर्याय B, \"go\", बरोबर दिला आहे. \"neither ... nor\" मध्ये क्रियापद जवळच्या कर्त्याशी जुळते; \"his sister\" एकवचनी आहे, म्हणून \"Neither the boy nor his sister goes to school\", म्हणजे पर्याय C."
  ),
  109: notice(
    "MPSC's key gives option A, Sahyadri. The range between the Narmada and Tapi valleys is the Satpuda, option B.",
    "आयोगाच्या उत्तरतालिकेत पर्याय A, सह्याद्री, बरोबर दिला आहे. नर्मदा व तापी खोऱ्यांमधील जलविभाजक सातपुडा पर्वतरांग आहे, म्हणजे पर्याय B."
  ),
};
const ASP_2012_NOTICES = {
  117: notice(
    "MPSC's key gives option A, the law of constant returns. The standard textbook answer is that manufacturing follows the law of increasing returns, option B, so the key is doubtful.",
    "आयोगाच्या उत्तरतालिकेत पर्याय A, स्थिर उत्पत्तीचा नियम, बरोबर दिला आहे. पाठ्यपुस्तकानुसार निर्मिती उद्योगाला वाढत्या उत्पत्तीचा नियम (पर्याय B) लागू होतो, म्हणून हे उत्तर संशयास्पद आहे."
  ),
  150: notice(
    "MPSC's key gives option C, opening branches in rural areas. A Regional Rural Bank's main function is credit to small farmers and other weaker sections, option A, so the key is doubtful.",
    "आयोगाच्या उत्तरतालिकेत पर्याय C, ग्रामीण भागात शाखा उघडणे, बरोबर दिला आहे. प्रादेशिक ग्रामीण बँकेचे मुख्य कार्य लहान शेतकरी व इतर दुर्बल घटकांना कर्जपुरवठा करणे हे आहे (पर्याय A), म्हणून हे उत्तर संशयास्पद आहे."
  ),
};
const ASP_2016_NOTICES = {
  38: notice(
    "MPSC's key gives option A, a and b. Statement a is not correct: the rules on Indian citizenship applied in Jammu and Kashmir too. Statements c and d are not correct either (registration needed seven years' residence, naturalisation twelve), so no option is fully right.",
    "आयोगाच्या उत्तरतालिकेत पर्याय A, अ आणि ब, बरोबर दिला आहे. विधान अ बरोबर नाही: भारतीय नागरिकत्वाचे नियम जम्मू व काश्मीरलाही लागू होते. विधाने क व ड देखील बरोबर नाहीत (नोंदणीसाठी सात वर्षांचे, तर देशीयीकरणासाठी बारा वर्षांचे वास्तव्य आवश्यक), म्हणून कोणताही पर्याय पूर्णपणे बरोबर नाही."
  ),
  75: notice(
    "MPSC's key gives option B, that farmers pay very small charges. Kisan Call Centres are a free, toll-free service run at the government's cost, so the key is doubtful.",
    "आयोगाच्या उत्तरतालिकेत पर्याय B, शेतकऱ्यांना फार अल्प खर्च सहन करावा लागतो, बरोबर दिला आहे. किसान कॉल सेंटर ही सरकारी खर्चाने चालणारी मोफत (टोल-फ्री) सेवा आहे, म्हणून हे उत्तर संशयास्पद आहे."
  ),
};

/** Dates are each key's "परीक्षेचा दिनांक". */
export const FSP_PAPERS: Paper[] = [
  prelims("fsp", 2014, "2014-04-27", "D04", [741, 772], [773, 774], "Forest Service Prelims · 27 Apr 2014", {
    notices: FSP_2014_NOTICES,
  }),
  prelims("fsp", 2016, "2016-04-03", "M07", [775, 814], [815, 816], "Forest Service Prelims · 3 Apr 2016", {
    omitted: { 7: "Each pair differs only in how a conjunct is drawn (half-form vs stacked), which plain text cannot show; left out at the user's call, 2026-10-16." },
  }),
  prelims("fsp", 2017, "2017-06-04", "E09", [817, 856], [857, 858], "Forest Service Prelims · 4 Jun 2017"),
  prelims("fsp", 2018, "2018-06-24", "K11", [859, 890], [891, 892], "Forest Service Prelims · 24 Jun 2018"),
];

/** 2011 and 2012 are 200 questions in 2 hours; from 2016 the "सामान्य क्षमता चाचणी", 100 questions. */
export const ASP_PAPERS: Paper[] = [
  prelims("asp", 2011, "2011-07-31", "RSM", [893, 939], [940, 943], "Agriculture Service Prelims · 31 Jul 2011", {
    questions: 200,
    provisionalKey: true,
    notices: ASP_2011_NOTICES,
  }),
  prelims("asp", 2012, "2012-08-05", "EOO", [944, 983], [984, 987], "Agriculture Service Prelims · 5 Aug 2012", {
    questions: 200,
    notices: ASP_2012_NOTICES,
  }),
  prelims("asp", 2016, "2016-07-10", "U07", [988, 1019], [1020, 1021], "Agriculture Service Prelims · 10 Jul 2016", {
    notices: ASP_2016_NOTICES,
  }),
  prelims("asp", 2017, "2017-07-30", "Q09", [1022, 1045], [1046, 1047], "Agriculture Service Prelims · 30 Jul 2017"),
  prelims("asp", 2018, "2018-05-20", "I11", [1048, 1079], [1080, 1081], "Agriculture Service Prelims · 20 May 2018"),
];

/** Every paper this pipeline can load. `PAPERS` stays Group B & C only — the mock builder derives its sittings from it. */
export const ALL_PAPERS: Paper[] = [...PAPERS, ...SSP_PAPERS, ...SSP_CSAT_PAPERS, ...FSP_PAPERS, ...ASP_PAPERS];

// The owner's 2026-11-03 ruling on the 203 doubts in KEY_DOUBTS.md (notice + grace,
// key kept), folded into each paper's `notices` so every list above carries them.
// A notice on a question that already has one is a mistake, not a merge.
for (const [id, byQ] of Object.entries(KEY_DOUBT_NOTICES)) {
  const p = ALL_PAPERS.find((x) => x.id === id);
  if (!p) throw new Error(`KEY_DOUBT_NOTICES: no paper "${id}"`);
  const twice = Object.keys(byQ).filter((n) => p.notices?.[Number(n)]);
  if (twice.length) throw new Error(`KEY_DOUBT_NOTICES: ${id} Q${twice.join(", Q")} already has a notice`);
  p.notices = { ...p.notices, ...byQ };
}

/** The column of the 4-set key that applies to a paper's booklet (Set A unless `bookletSet` says otherwise). */
export const bookletSetIndex = (p: Paper): number => "ABCD".indexOf(p.bookletSet ?? "A");
export const QUESTIONS_PER_PAPER = 100;
export const questionCount = (p: Paper): number => p.questions ?? QUESTIONS_PER_PAPER;

/** The question numbers a transcription must cover: 1..N less any `omitted`. */
export function expectedNumbers(p: Paper): number[] {
  const out: number[] = [];
  for (let n = 1; n <= questionCount(p); n++) if (!p.omitted?.[n]) out.push(n);
  return out;
}

export function requirePaper(id: string | undefined): Paper {
  const p = ALL_PAPERS.find((x) => x.id === id);
  if (!p) throw new Error(`unknown paper "${id}" — one of: ${ALL_PAPERS.map((x) => x.id).join(", ")}`);
  return p;
}

export const DATA_DIR = join(process.cwd(), "scripts", "mpsc", "data");
export const dataPath = (id: string, kind: string) => join(DATA_DIR, `${id}.${kind}.json`);
