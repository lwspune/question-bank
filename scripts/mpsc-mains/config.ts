/**
 * MPSC Mains language papers — the paper registry.
 *
 * SOURCE: one merged scan, `All PYQ mar eng.pdf` (1,081 pages, mpscmaterial.com).
 * It holds 34 Set-A booklets; this pipeline takes the Mains "मराठी व इंग्रजी"
 * papers (Group B Mains Paper 1 for STI / ASO / PSI, the 2018 joint Group B
 * paper, and State Services Mains Paper 2). The Forest and Agriculture
 * Service Prelims in the same file are NOT registered here yet.
 *
 * Page numbers are 1-based PDF pages, read from each booklet's cover.
 *
 * TRAPS IN THE FILE, each checked against the pages:
 *  - Two booklets appear TWICE: STI Mains 2015 (pp.189 and 215) and the 2018
 *    joint paper (pp.509 and 711). The copies are text-identical page for page,
 *    so each is registered once. The two STI 2015 copies are followed by
 *    DIFFERENT keys, so a key's position proves nothing: every key is verified
 *    by solving the English section before it is trusted (`keyFit` in merge.ts).
 *  - PSI Mains 2012 is followed by the key for its PAPER 2 (General Knowledge),
 *    and State Services Mains 2016 has no key at all. Their answers are DERIVED
 *    (`derived: true`) — acceptable for grammar, per the user (2026-09-27).
 *  - pp.303-306 are the key of the 2009 Assistant/STI Paper 2, whose booklet is
 *    not in the file. Ignored.
 *  - The ASO 2017 key (pp.507-508) is vector outlines with no text layer, so
 *    its tokens are hand-transcribed into data/aso-2017.keytokens.json.
 *
 * `sourceFile` names ONE paper for ONE exam — the 2009 joint Assistant/STI
 * paper is committed under both exams, so it carries two labels.
 */
import { join } from "node:path";

export const SOURCE_PDF = "C:/Users/vilas/Downloads/All PYQ mar eng.pdf";
/** Founding tenant org + the superadmin who owns ingested content (same as every pipeline). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export type ExamKey = "ssm" | "grpb" | "sti" | "aso" | "psi";

/** DB exam rows (names match EXAM_REGISTRY.examName). Ids are printed by seed.ts. */
export const EXAMS: Record<ExamKey, { name: string; id: string | null; label: string }> = {
  ssm: { name: "MPSC State Services Mains", id: null, label: "State Services Mains" },
  grpb: { name: "MPSC Group B Combined Mains", id: null, label: "Group B Combined Mains" },
  sti: { name: "MPSC STI Mains", id: null, label: "STI Mains" },
  aso: { name: "MPSC ASO Mains", id: null, label: "ASO Mains" },
  psi: { name: "MPSC PSI Mains", id: null, label: "PSI Mains" },
};

export type Paper = {
  id: string;
  /** Every exam this booklet was sat for (the 2009 paper was joint). */
  exams: ExamKey[];
  pyqYear: number;
  /** Sitting date, ISO. */
  date: string;
  code: string;
  pages: [number, number];
  /** Null when the file carries no key for this booklet. */
  keyPages: [number, number] | null;
  questions: 100 | 200;
  /** No official key: answers derived, stamped in derived_model. */
  derived?: boolean;
  /** Key has no text layer — tokens are hand-transcribed. */
  keyImageOnly?: boolean;
  /**
   * Questions absent from the SCAN (a booklet page the merge dropped). They are
   * not transcribed; merge.ts and commit.ts expect exactly the rest. A paper with
   * a gap can never be a whole-paper mock.
   */
  missingQuestions?: number[];
  /**
   * Set aside at the user's call and NOT ingested — the reason, in a sentence.
   * requirePaper refuses a dropped paper, so merge.ts / commit.ts cannot load it.
   * Kept in PAPERS (not deleted) so the page map stays complete and the drop is on record.
   */
  dropped?: string;
};

/** The question numbers a paper's transcription must cover. */
export function expectedNumbers(paper: Paper): number[] {
  const skip = new Set(paper.missingQuestions ?? []);
  const out: number[] = [];
  for (let n = 1; n <= paper.questions; n++) if (!skip.has(n)) out.push(n);
  return out;
}

const p = (
  id: string,
  exams: ExamKey[],
  pyqYear: number,
  date: string,
  code: string,
  pages: [number, number],
  keyPages: [number, number] | null,
  questions: 100 | 200,
  extra: Partial<Paper> = {}
): Paper => ({ id, exams, pyqYear, date, code, pages, keyPages, questions, ...extra });

export const PAPERS: Paper[] = [
  p("ssm-2016", ["ssm"], 2016, "2016-09-24", "D08", [1, 26], null, 100, { derived: true }),
  p("ssm-2017", ["ssm"], 2017, "2017-09-19", "Y09", [27, 54], [55, 56], 100),
  p("ssm-2018", ["ssm"], 2018, "2018-08-18", "R11", [57, 80], [81, 82], 100),
  p("sti-2011", ["sti"], 2011, "2011-12-11", "RRM", [83, 114], [115, 118], 200),
  p("sti-2012", ["sti"], 2012, "2012-11-25", "OOI", [119, 158], [159, 162], 200, { dropped: "Set aside 2026-09-27 mid-transcription (Q1-173 read, nothing merged) at the user's call." }),
  // The key printed after this booklet (pp.187-188, "STI Mains 2014 · 18 Aug 2015") is for
  // ANOTHER sitting: it agreed with 20 of 93 blind answers (21.5%, chance). Kept aside as
  // data/orphan-p187.keytokens.json; this all-grammar paper's answers are derived.
  p("sti-2014", ["sti"], 2014, "2014-06-05", "L04", [163, 186], null, 100, { derived: true }),
  // Printed twice (pp.189 and 215, text-identical). Of the keys after the two copies, pp.213-214
  // fits (86/93 blind answers) and pp.239-240 does not (26/95) — nor does the p.187 orphan (25/95).
  p("sti-2015", ["sti"], 2015, "2016-11-26", "M08", [189, 212], [213, 214], 100),
  p("sti-2017", ["sti"], 2017, "2018-01-07", "Y10", [241, 264], [265, 266], 100),
  // Key fit 189/193 (97.9%). NOT fully blind for Q1-43: those key entries were printed to the
  // terminal before transcription began. Q44-200 were answered without sight of the key.
  p("asosti-2009", ["aso", "sti"], 2009, "2010-08-14", "TNS", [267, 298], [299, 302], 200),
  p("aso-2011", ["aso"], 2011, "2011-11-20", "RGM", [307, 338], [339, 342], 200, { dropped: "Set aside 2026-09-27 mid-transcription (Q1-195 read, nothing merged) at the user's call." }),
  p("aso-2012", ["aso"], 2012, "2012-09-09", "D01", [343, 374], [375, 378], 200),
  p("aso-2013", ["aso"], 2013, "2014-02-15", "IO3", [379, 402], [403, 404], 100),
  p("aso-2014", ["aso"], 2014, "2015-01-04", "RO5", [405, 428], [429, 430], 100),
  p("aso-2015", ["aso"], 2015, "2015-11-08", "VO6", [431, 454], [455, 456], 100),
  p("aso-2016", ["aso"], 2016, "2016-11-06", "K08", [457, 480], [481, 482], 100),
  p("aso-2017", ["aso"], 2017, "2017-12-10", "O10", [483, 506], [507, 508], 100, { keyImageOnly: true }),
  p("grpb-2018", ["grpb"], 2018, "2018-08-26", "W11", [509, 536], [537, 538], 100),
  p("psi-2011", ["psi"], 2011, "2011-09-18", "RAM", [539, 570], [571, 574], 200),
  p("psi-2012", ["psi"], 2012, "2012-07-22", "COO", [575, 606], null, 200, { derived: true, dropped: "Set aside 2026-09-27 after transcription (no key; answers would be derived), nothing merged, at the user's call." }),
  // This scan (from mpscguidance.com) has the answers pre-marked on the page, so its key
  // fit is NOT a blind check: the transcriber's answers are the printed marks.
  p("psi-2013", ["psi"], 2013, "2013-12-08", "Y02", [611, 630], [631, 632], 100),
  p("psi-2014", ["psi"], 2014, "2014-09-21", "EO5", [633, 656], [657, 658], 100, { dropped: "Set aside 2026-09-27 after Q1-60 were transcribed (data/psi-2014.t01-t02.json, uncommitted), nothing merged, at the user's call." }),
  // Booklet pages are bound out of order: p.663 is booklet page 6 (Q18-23), p.664 page 5 (Q12-17).
  p("psi-2016", ["psi"], 2016, "2017-06-25", "KO9", [659, 682], [683, 684], 100),
  p("psi-2017", ["psi"], 2017, "2017-11-05", "L10", [685, 708], [709, 710], 100),
];

/** The booklets on file are all Set A, so the key's first column applies. */
export const BOOKLET_SET_INDEX = 0;

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** "ASO Mains 2017 · 10 Dec 2017" — what a student recognises. */
export function pyqNoteFor(paper: Paper, exam: ExamKey): string {
  const [y, m, d] = paper.date.split("-").map(Number);
  return `${EXAMS[exam].label} ${paper.pyqYear} · ${d} ${MONTHS[m - 1]} ${y}`;
}

/** One label per (paper, exam): the rollback + mock-sitting key. */
export function sourceFileFor(paper: Paper, exam: ExamKey): string {
  return `MPSC-Mains-${paper.id}-${paper.code}-${exam.toUpperCase()}`;
}

export function requirePaper(id: string | undefined): Paper {
  const hit = PAPERS.find((x) => x.id === id);
  if (!hit) throw new Error(`unknown paper "${id}" — one of: ${PAPERS.map((x) => x.id).join(", ")}`);
  if (hit.dropped) throw new Error(`paper "${id}" is dropped: ${hit.dropped}`);
  return hit;
}

export const DATA_DIR = join(process.cwd(), "scripts", "mpsc-mains", "data");
export const dataPath = (id: string, kind: string) => join(DATA_DIR, `${id}.${kind}.json`);
