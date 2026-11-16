// Shared config for the RPSC RAS/RTS Prelims ingestion lane.
//
// SOURCE: RPSC's own scanned booklets of the Prelims paper, "General Knowledge
// and General Science" (one objective paper), and RPSC's own answer keys, both
// downloaded from rpsc.rajasthan.gov.in on 2026-11-15 (the "Question Paper" and
// "Answer Key" lists, viewcommon?Slice=QP / Slice=AK) into SOURCE_ROOT/KEY_ROOT.
// RPSC's file names are in SOURCE_URLS.
//
//   150 items / 200 marks / 3 hours / one-third negative
//   (+4/3 correct, -4/9 wrong)
//
// From 2023 every item carries a fifth printed option, "(5) Question not
// attempted" / "अनुत्तरित प्रश्न". It is an OMR rule (a candidate who leaves more
// than 10% of items with no bubble at all loses marks), not part of the
// question, so it is NOT transcribed. The mock instructions mention it.
//
// THE BOOKLET. An image scan with no text layer. Each page is two columns, and
// the columns are the two LANGUAGES: Hindi on the left, English on the right,
// the same items side by side. Instruction 9 (2024): where the two versions
// differ, the ENGLISH version is standard. So English is the canonical
// `questions` row and Hindi is a translation (migration 0118, `hi` allowed by
// 0171), the MPSC pattern with Hindi in place of Marathi.
//
// KEYS. Every paper here has RPSC's FINAL key (2013's is the "Revised" key for
// the 31-10-2015 sitting). The 2016 key onward says "as per the Question Paper
// uploaded on Website", which is the booklet we hold. Read by keys.py into
// KEY_ROOT/<year>.key.json, OUTSIDE the repo, and copied into data/ by
// keycheck.ts only once both blind passes are on disk.
//
// LEFT OUT: the 26-10-2013 and 19-11-2013 booklets RPSC also lists under the
// 2013 exam. No key exists for either; the 2013 cycle's key is for the
// re-held 31-10-2015 paper, which is the one ingested.
import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// LWS Pune org + admin (same as every sibling pipeline).
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
/** `RPSC RAS (Prelims)`, created by seed-exam.ts on 2026-11-16. */
export const EXAM_ID = "2b72a255-8495-4bbc-a719-00de2eee65b9";

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\RPSC\\RAS\\papers";
export const KEY_ROOT = "C:\\Vilas\\LWS_Pune\\RPSC\\RAS\\keys";

export const OUT = join(__dirname, "out"); // gitignored: rendered PNGs, blind packets
export const DATA = join(__dirname, "data"); // committed: transcriptions, key reads
export const DERIVED = join(__dirname, "derived"); // committed: the blind passes

/** RAS Prelims has one objective paper; kept as `1` so the shared core's types fit. */
export type PaperNumber = 1;

export const PATTERN: Record<PaperNumber, {
  questions: number;
  marks: number;
  minutes: number;
  marksPerCorrect: number;
  penaltyPerWrong: number;
  qualifying: boolean;
}> = {
  1: { questions: 150, marks: 200, minutes: 180, marksPerCorrect: 4 / 3, penaltyPerWrong: 4 / 9, qualifying: false },
};

export type Paper = {
  id: string; // the cycle year; also the data/<id>.* prefix
  paper: PaperNumber;
  sourceFile: string; // questions.source_file + upload_jobs.filename (dedup / rollback key)
  pdf: string;
  /** The exam CYCLE ("RAS 2024"), which is how candidates name a paper. */
  pyqYear: number;
  pyqNote: string;
  /** 0-based page indices carrying questions (both languages on each). */
  pages: number[];
  /** Effective scan resolution, measured from the embedded image. */
  dpi: number;
  keyFile: string;
};

const range = (from: number, to: number): number[] => {
  const out: number[] = [];
  for (let i = from; i <= to; i++) out.push(i);
  return out;
};

const paper = (year: number, held: string, pages: number[], dpi: number, keyFile: string): Paper => ({
  id: String(year),
  paper: 1,
  sourceFile: `RAS_Pre_${year}.pdf`,
  pdf: join(SOURCE_ROOT, `RAS_Pre_${year}.pdf`),
  pyqYear: year,
  // SHORT ON PURPOSE: a public page shows `pyq_note` only under 48 characters
  // (publicPyqNote MAX_PUBLIC_PYQ_NOTE_LEN), so the long form ("RPSC RAS/RTS
  // Prelims 2024 (held 2 Feb 2025) - General Knowledge and General Science")
  // would hide the sitting from students. A comma, not brackets: a trailing
  // bracket is stripped as a disclosure.
  pyqNote: `RAS Prelims ${year}, held ${held}`,
  pages,
  dpi,
  keyFile,
});

// Page maps from a contact sheet of every booklet (2026-11-15): page 0 is the
// cover (instructions in both languages), questions run from page 1 to the
// second-last page, and the last page is rough work.
export const PAPERS: Record<string, Paper> = {
  "2024": paper(2024, "2 Feb 2025", range(1, 38), 300, "RAS_Pre_2024_FinalKey.pdf"), // 40pp
  "2023": paper(2023, "1 Oct 2023", range(1, 30), 300, "RAS_Pre_2023_FinalKey.pdf"), // 32pp
  "2021": paper(2021, "27 Oct 2021", range(1, 30), 212, "RAS_Pre_2021_FinalKey.pdf"), // 32pp, two images a page
  "2018": paper(2018, "5 Aug 2018", range(1, 30), 150, "RAS_Pre_2018_FinalKey.pdf"), // 32pp
  "2016": paper(2016, "28 Aug 2016", range(1, 30), 150, "RAS_Pre_2016_FinalKey.pdf"), // 32pp
  "2013": paper(2013, "31 Oct 2015", range(1, 30), 150, "RAS_Pre_2013_RevisedKey.pdf"), // 32pp
};

/** Where each file came from: https://rpsc.rajasthan.gov.in/Static/<path>. */
export const SOURCE_URLS: Record<string, { paper: string; key: string }> = {
  "2024": { paper: "PreviousQuestionPaper/8554F13A-94F1-424A-9504-2419778F8FE4.pdf", key: "AnswerKeys/8F659D53-B8DD-47BE-8CA6-E56AA1A9BE05.pdf" },
  "2023": { paper: "PreviousQuestionPaper/71EA929E-8711-4496-9DC3-B6E8FC358A08.pdf", key: "AnswerKeys/52840E75-7703-4956-BD32-A9C51AEAD91F.pdf" },
  "2021": { paper: "PreviousQuestionPaper/51F55D64-D9A6-42FF-BA45-6E1149126927.pdf", key: "AnswerKeys/9A9A3CAB-1806-48C9-B2C2-132F467B3E0C.pdf" },
  "2018": { paper: "PreviousQuestionPaper/B81186DB-3B11-4395-8030-0C62471E536C.pdf", key: "AnswerKeys/6E6E942F-F5A5-4BFC-AD6D-235405AB4C01.pdf" },
  "2016": { paper: "PreviousQuestionPaper/A16BABD8-A7E5-485C-A43B-002792C42EFA.pdf", key: "AnswerKeys/20B640C8-5FEC-4D57-B5E4-01C90A5D09E7.pdf" },
  "2013": { paper: "PreviousQuestionPaper/4BEC9DC5-132C-4DCE-9A7C-32351D735283.pdf", key: "AnswerKeys/DC9A00D6-B993-4C27-82A3-BA874B906025.pdf" },
};

export function paperById(id: string | undefined): Paper {
  if (!id || !PAPERS[id]) {
    throw new Error(`unknown paper "${id}". Known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return PAPERS[id];
}

export const requirePaper = paperById;

export const pattern = (p: Paper) => PATTERN[p.paper];

/** subject -> chapter -> subtopic[]. Edited BY HAND; the merge gate validates against it. */
export type Catalog = Record<string, Record<string, string[]>>;

let _catalog: Catalog | null = null;
export function catalog(): Catalog {
  if (!_catalog) _catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));
  return _catalog!;
}

export const SUBJECTS = () => Object.keys(catalog());

/** Every catalog subject is legal on the one paper. */
export const subjectsFor = (_paper?: PaperNumber): string[] => SUBJECTS();

export const dataPath = (id: string, kind: string) => join(DATA, `${id}.${kind}.json`);

/** RPSC's key, read by keys.py, outside the repo. */
export const keyJsonOutside = (id: string) => join(KEY_ROOT, `${id}.key.json`);

/** Every row's `pyq_note`. All keys here are FINAL, so there is no caveat to add. */
export const pyqNoteFor = (p: Paper): string => p.pyqNote;

/** Items RPSC deleted: its key's `X` entries (copied into data/ by keycheck.ts). */
export function withdrawnFor(id: string): number[] {
  if (!existsSync(dataPath(id, "key"))) return [];
  const key = JSON.parse(readFileSync(dataPath(id, "key"), "utf8")) as Record<string, string>;
  return Object.entries(key)
    .filter(([n, v]) => /^\d+$/.test(n) && String(v).toUpperCase() === "X")
    .map(([n]) => Number(n))
    .sort((a, b) => a - b);
}
