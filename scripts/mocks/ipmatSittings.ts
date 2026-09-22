/**
 * IPMAT Indore sittings — the fourth sitting-discovery shape.
 *
 * A sitting here is THREE `source_file`s, one per section, because the source
 * publishes each section separately and a mock is the whole paper sat in one
 * session. Every other exam's sitting is one file (or two labels for one file,
 * via `mergeWith`, which dedupes them against each other — the opposite of what
 * this needs).
 *
 * SCOPE: 2022-2026 only, five sittings. Indore ran 100 questions in 2019 and 60
 * in the shortened 2020 and 2021 sittings; the 90-question pattern (30 MCQ + 15
 * SA + 45 VA) began in 2022 and is what `IPMAT_INDORE_PAPER` declares. The three
 * earlier sittings need their own blueprints and are deliberately not built.
 *
 * DERIVED, not hand-written: the file names come from `sourceFileFor` in
 * scripts/ipmat/config.ts — the same helper the ingest stamps into
 * `source_file` — so a rename cannot leave this registry pointing at nothing.
 * The only hand-written facts are the year list and the grace numbers, and
 * neither is recorded anywhere else.
 */
import { sourceFileFor } from "../ipmat/config";

/** A section suffix mapped to the question numbers the exam CANCELLED. */
type GraceBySection = Partial<Record<"MCQ" | "SA" | "VA", number[]>>;

type IndoreSitting = {
  year: number;
  grace?: GraceBySection;
};

/**
 * Question numbers restart at 1 in each section, so grace must be keyed by
 * SECTION as well as number — a bare `graceNumbers: [7]` would also grace
 * SA Q7 and VA Q7, two perfectly good questions.
 */
export const IPMAT_INDORE_SITTINGS: readonly IndoreSitting[] = [
  { year: 2022 },
  { year: 2023 },
  // MCQ Q7: "This IPMAT Indore 2024 question was deemed wrong and thus
  // cancelled. All students were given 4 marks." It has four printed options and
  // no correct one, and is loaded keyless for exactly this purpose.
  { year: 2024, grace: { MCQ: [7] } },
  { year: 2025 },
  { year: 2026 },
];

export type IpmatSittingSpec = {
  key: string;
  sourceFile: string;
  extraFiles: string[];
  year: number;
  slug: string;
  title: string;
  questionCount: number;
  grace: GraceBySection;
};

/**
 * The five sittings as specs.
 *
 * Section order is MCQ -> SA -> VA, matching `IPMAT_INDORE_PAPER.sections`; the
 * blueprint drives placement, so this order only decides which file is the
 * "primary" one in the shared loop.
 */
export function ipmatIndoreSittings(): IpmatSittingSpec[] {
  return IPMAT_INDORE_SITTINGS.map((s) => ({
    key: `ipmat-indore-${s.year}`,
    sourceFile: sourceFileFor("ipmat-indore", s.year, "MCQ"),
    extraFiles: [
      sourceFileFor("ipmat-indore", s.year, "SA"),
      sourceFileFor("ipmat-indore", s.year, "VA"),
    ],
    year: s.year,
    // Explicit, because the generic mockSlug would emit
    // "ipmat-indore-2022-paper" — the exam has one paper and the code adds
    // nothing a reader needs.
    slug: `ipmat-indore-${s.year}`,
    title: `IPMAT Indore ${s.year}`,
    questionCount: 90,
    grace: s.grace ?? {},
  }));
}

/** The section suffix a `source_file` ends with, or null. */
export function sectionSuffixOf(sourceFile: string | undefined): string | null {
  if (!sourceFile) return null;
  const m = /-(MCQ|SA|VA)$/.exec(sourceFile);
  return m ? m[1] : null;
}

/** True when this row is a grace question for this sitting. */
export function isGrace(
  grace: GraceBySection,
  sourceFile: string | undefined,
  questionNumber: string | null
): boolean {
  const suffix = sectionSuffixOf(sourceFile);
  if (!suffix) return false;
  const nums = grace[suffix as keyof GraceBySection];
  if (!nums || nums.length === 0) return false;
  const n = Number(questionNumber);
  return Number.isFinite(n) && nums.includes(n);
}
