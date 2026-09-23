/**
 * Resolve a `questions.source_file` to the PDF it came from, its page range and
 * its exam — by READING the owning pipeline's own config, never a second table.
 *
 * WHY NOT A PATH TABLE. The obvious shape here is a committed
 * `{ "<source_file>": { pdf, pages } }` JSON. It would be a copy of facts each
 * pipeline's `config.ts` already states, and a copy is a thing that rots: a
 * chapter repaginated or a book moved on disk would leave the copy pointing at
 * the wrong pages, and the failure would be a WRONG CROP rather than an error —
 * the single worst outcome this whole area has. Importing the configs means
 * there is exactly one statement of where a chapter lives.
 *
 * Every pipeline here happens to share the same shape (`CHAPTERS` keyed by id,
 * each with `sourceFile`, `pdf`, optional `pages`), so one adapter covers all
 * four. A pipeline that does not is simply absent from the index and reported
 * as unresolvable rather than guessed at.
 */
import { join } from "node:path";

import { CHAPTERS as NCERT, SOURCE_ROOT as NCERT_ROOT } from "../../ncert/config";
import { CHAPTERS as SB12, EXAM_ID as SB12_EXAM } from "../../stateboard/config";
import { CHAPTERS as SB11, EXAM_ID as SB11_EXAM } from "../../mh-sb-11/config";
import { CHAPTERS as SSC10, EXAM_ID as SSC10_EXAM } from "../../mh-ssc-10-text/config";

export type FigureSource = {
  sourceFile: string;
  pdf: string;
  /** 0-based, inclusive-exclusive — the range `derive.py` scans. */
  page0: number;
  page1: number;
  examId: string;
  pipeline: string;
  chapterId: string;
};

/** A chapter's `pages` is a 0-based list; derive.py wants a contiguous range.
 *  One page of slack is added at the end because a chapter's last exercise
 *  routinely spills onto the following page — Circle's Fig. 3.101-3.103 sat one
 *  page past its configured range and three questions went unresolved until the
 *  range was widened.
 *
 *  MOST CHAPTERS OMIT `pages` ENTIRELY, and in these configs that means "the
 *  whole PDF" (each chapter is its own file). The first version of this treated
 *  a missing `pages` as unresolvable and indexed NOTHING — 0 of 20 source files
 *  resolved. `-1` is passed through to derive.py as "to the last page". */
function range(pages: number[] | undefined): [number, number] {
  if (!pages?.length) return [0, -1];
  return [Math.min(...pages), Math.max(...pages) + 2];
}

function collect(
  chapters: Record<string, { sourceFile: string; pdf: string; pages?: number[]; examId?: string }>,
  pipeline: string,
  fallbackExam?: string,
): FigureSource[] {
  const out: FigureSource[] = [];
  for (const [chapterId, c] of Object.entries(chapters)) {
    const r = range(c.pages);
    const examId = c.examId ?? fallbackExam;
    if (!examId) continue;
    out.push({ sourceFile: c.sourceFile, pdf: c.pdf, page0: r[0], page1: r[1], examId, pipeline, chapterId });
  }
  return out;
}

/**
 * NCERT Class-10 SCIENCE has no config in this repo.
 *
 * Its 421 questions are in the bank under `NCERT_10_Science__*.pdf` and its
 * books are on disk, but whatever ingested them was never committed — so unlike
 * every other entry here this one cannot be read off a config and has to be
 * stated. It is written as a NUMBER map rather than a path map because the book
 * ships as `NN. <Title>.pdf` and the `pyq_note` on every row already says
 * "(Chapter N, NCERT Science)", so the number is the durable join and the title
 * spelling is not.
 *
 * That the pipeline is missing is itself worth fixing; logged in ROADMAP.md.
 */
// Built from the pipeline's own SOURCE_ROOT rather than retyped — a hand-typed
// Windows path in a TS string literal loses every `\` to escape processing and
// silently resolves to "C:VilasLWS_Pune...", which fails as a missing file
// rather than as a syntax error.
const CLS10_SCIENCE_DIR = join(NCERT_ROOT, "10th", "Science");
const CLS10_SCIENCE: Record<string, string> = {
  NCERT_10_Science__ChemicalReactionsAndEquations: "01. Chemical Reactions and Equations.pdf",
  NCERT_10_Science__AcidsBasesAndSalts: "02. Acids, Bases, and Salts.pdf",
  NCERT_10_Science__MetalsAndNonMetals: "03. Metals and Non-metals.pdf",
  NCERT_10_Science__CarbonAndItsCompounds: "04. Carbon and its Compounds.pdf",
  NCERT_10_Science__LifeProcesses: "05. Life Processes.pdf",
  NCERT_10_Science__ControlAndCoordination: "06. Control and Coordination.pdf",
  NCERT_10_Science__HowDoOrganismsReproduce: "07. How do Organisms Reproduce.pdf",
  NCERT_10_Science__Heredity: "08. Heredity.pdf",
  NCERT_10_Science__LightReflectionAndRefraction: "09. Light.pdf",
  NCERT_10_Science__TheHumanEyeAndTheColourfulWorld: "10. Human Eye.pdf",
  NCERT_10_Science__Electricity: "11. Electricity.pdf",
  NCERT_10_Science__MagneticEffectsOfElectricCurrent: "12. Magnetic Effects of Electric Current.pdf",
  NCERT_10_Science__OurEnvironment: "13. Our Environment.pdf",
};
const EXAM_CBSE_10 = "defb4ad2-7ec8-42e4-ad2e-8fbe9c454e1c";

function cls10Science(): FigureSource[] {
  return Object.entries(CLS10_SCIENCE).map(([slug, file]) => ({
    sourceFile: `${slug}.pdf`,
    pdf: join(CLS10_SCIENCE_DIR, file),
    page0: 0,
    page1: -1,
    examId: EXAM_CBSE_10,
    pipeline: "(none committed)",
    chapterId: slug,
  }));
}

let cache: Map<string, FigureSource> | null = null;

export function figureSources(): Map<string, FigureSource> {
  if (cache) return cache;
  const all = [
    ...collect(NCERT as never, "ncert"),
    ...collect(SB12 as never, "stateboard", SB12_EXAM),
    ...collect(SB11 as never, "mh-sb-11", SB11_EXAM),
    ...collect(SSC10 as never, "mh-ssc-10-text", SSC10_EXAM),
    ...cls10Science(),
  ];
  cache = new Map(all.map((s) => [s.sourceFile, s]));
  return cache;
}

export function resolveSource(sourceFile: string): FigureSource | null {
  return figureSources().get(sourceFile) ?? null;
}
