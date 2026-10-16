// SSC CGL lane configuration. Runbook: scripts/ssc-cgl/README.md.
import { readFileSync } from "node:fs";
import { join } from "node:path";
import type { Part } from "./lib";

/** Same tenant + creator every bank pipeline writes as (see scripts/upsc/config.ts). */
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";

export const EXAM_NAME = "SSC CGL";
/** `SSC CGL`, created by seed-exam.ts on 2026-10-16, when the pilot shifts were ready to commit. */
export const EXAM_ID = "eec6daa8-bea9-4643-a10e-cfb3739be607";
export function requireExamId(): string {
  if (!EXAM_ID) throw new Error("EXAM_ID is empty: run scripts/ssc-cgl/seed-exam.ts --apply and paste the id into config.ts");
  return EXAM_ID;
}

/**
 * Tier I is four parts of 25. General Awareness is split into the eight subjects
 * CDS General Knowledge uses (owner, 2026-10-16), so a GA question names its own;
 * the other three parts are one subject each.
 */
export const SECTION_SUBJECTS: Record<Part, string[]> = {
  A: ["Reasoning"],
  B: ["History", "Geography", "Polity", "Economics", "Physics", "Chemistry", "Biology", "Current Affairs"],
  C: ["Quantitative Aptitude"],
  D: ["English"],
};
export const SUBJECTS = (): string[] => Object.values(SECTION_SUBJECTS).flat();

export function subjectFor(part: Part, named?: string): string {
  const allowed = SECTION_SUBJECTS[part];
  if (named === undefined) {
    if (allowed.length > 1) throw new Error(`PART-${part} is General Awareness: each question must name its subject`);
    return allowed[0];
  }
  if (!allowed.includes(named)) throw new Error(`"${named}" is not a PART-${part} subject (${allowed.join(", ")})`);
  return named;
}

export type Catalog = Record<string, { chapter: string; subtopics: string[] }[]>;
/** Written by seed-catalog.ts: CDS's names plus catalog-authored.json. */
export const CATALOG: Catalog = JSON.parse(readFileSync(join(__dirname, "catalog.json"), "utf8"));

export const SOURCE_ROOT = "C:\\Vilas\\LWS_Pune\\SSC\\CGL";

/**
 * One exam DAY = one PDF holding every shift of that day, as hosted by AglaSem: the
 * printed "challenge module" saved paper, SSC's own render (one fixed question order
 * per shift, the key coloured in). Never a retyped copy.
 *
 * The 2025 Tier I key is PROVISIONAL: these sheets come from the challenge window
 * opened 2025-10-16, and the final key was released only through candidate login
 * (until 2026-02-08). Our answers are derived independently and compared with it.
 */
export type Day = { tier: 1 | 2; date: string; shifts: number; file: string; url: string; provisionalKey: boolean };
export const DAYS: Record<string, Day> = {
  "t1-2025-09-18": {
    tier: 1,
    date: "2025-09-18",
    shifts: 3,
    file: join(SOURCE_ROOT, "2025_Tier1", "SSC_CGL_2025_Tier1_18Sep_AllShifts.pdf"),
    url: "https://cdn.aglasem.com/aglasem-doc/2917d268-8c19-11f1-b22f-0aa932765c8b/2917d268-8c19-11f1-b22f-0aa932765c8b.pdf",
    provisionalKey: true,
  },
  "t1-2025-09-19": {
    tier: 1,
    date: "2025-09-19",
    shifts: 3,
    file: join(SOURCE_ROOT, "2025_Tier1", "SSC_CGL_2025_Tier1_19Sep_AllShifts.pdf"),
    url: "https://cdn.aglasem.com/aglasem-doc/2d8e69ce-8c19-11f1-8775-0aa932765c8b/2d8e69ce-8c19-11f1-8775-0aa932765c8b.pdf",
    provisionalKey: true,
  },
};

/** pyqMonth is a month NAME, as everywhere in the bank ("September"), never a number. */
export type Shift = { day: string; shift: number; sourceFile: string; pyqYear: number; pyqMonth: string; pyqNote: string };

const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const TIER = ["", "I", "II"];

/** Every shift of every registered day, derived: id `<day>-s<n>`, one source_file each. */
export const SHIFTS: Record<string, Shift> = Object.fromEntries(
  Object.entries(DAYS).flatMap(([day, d]) => {
    const [y, m, dd] = d.date.split("-").map(Number);
    return Array.from({ length: d.shifts }, (_, i) => {
      const shift = i + 1;
      return [
        `${day}-s${shift}`,
        {
          day,
          shift,
          sourceFile: `SSC_CGL_T${d.tier}_${d.date}_S${shift}`,
          pyqYear: y,
          pyqMonth: MONTHS[m - 1],
          pyqNote: `Tier ${TIER[d.tier]}, ${dd} ${MONTHS[m - 1].slice(0, 3)} ${y}, Shift ${shift}`,
        },
      ] as const;
    });
  })
);

export function requireShift(id: string | undefined): Shift & { id: string } {
  if (!id || !SHIFTS[id]) throw new Error(`unknown shift "${id}". Known: ${Object.keys(SHIFTS).join(", ")}`);
  return { id, ...SHIFTS[id] };
}

export const OUT = join(__dirname, "out"); // gitignored: page images, geometry, reading sheets
export const TRANSCRIPTS = join(__dirname, "transcripts"); // committed: the source of record
export const FIGURES = join(__dirname, "figures"); // committed: SSC's own figure images, per shift
