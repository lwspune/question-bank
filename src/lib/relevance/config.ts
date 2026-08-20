/**
 * Cross-exam syllabus-fit screen.
 *
 * Answers one question: **can a student who was taught the NDA ∪ CET syllabus
 * solve this JEE Mains question?** JEE is a *source* of harder practice here,
 * not an audience — LWS teaches NDA and CET students, and JEE PYQs are handed
 * to them as stretch material.
 *
 * The screen is an EXCLUSION list, not a verdict-per-question list. The union
 * of the two syllabi covers nearly all of JEE Mains Maths, so ~95% of questions
 * pass and only the failures carry information (12 of 251 for the first chapter
 * screened). Storing 251 rows to say "fine" 239 times would be waste.
 *
 * Because of that, THREE states must stay distinct and the query layer must
 * never collapse them:
 *   - passed          → in a reviewed chapter, no exclusion row
 *   - dropped         → has an exclusion row (`question_audience_exclusions`)
 *   - never looked at → chapter not in REVIEWED_CHAPTERS below
 *
 * Treating "never looked at" as "passed" would hand students questions nobody
 * vetted; treating it as "dropped" would make most of the bank vanish. Hence
 * `fitCoverage()` in ./fit.ts, which the UI surfaces as an inline caveat.
 */

/** The one cohort we screen for: students taught both NDA and MHT-CET Maths. */
export const AUDIENCE = "nda-cet";

/** JEE Mains. The fit filter is meaningless for any other exam — an NDA
 *  question is by definition answerable by an NDA student. */
export const JEE_MAINS_EXAM_ID = "56360311-614d-43ea-9cd9-8ca8178dd679";

/**
 * Techniques a JEE question may demand that neither the NDA nor the MHT-CET
 * syllabus teaches. A question is excluded when it CANNOT be solved without
 * one of these — not merely when our stored solution happens to use it.
 *
 * That distinction is load-bearing. Several questions are solved in the bank
 * via eigenvectors or "similarity preserves the determinant" yet reduce to
 * plain determinant work that NDA does teach. A keyword screen over solution
 * text over-rejects by roughly 3×.
 */
export const BLOCKING_TOOLS = {
  similarity: "Similarity / conjugation — (P⁻¹AP)ⁿ = P⁻¹AⁿP",
  "cayley-hamilton-3x3": "3×3 Cayley-Hamilton (cubic characteristic polynomial)",
  eigenvalues: "Eigenvalues / AX = λX",
  "nilpotent-3x3": "3×3 nilpotent shift with truncated binomial",
  "quadratic-form-test": "Quadratic-form test: XᵀAX = O ∀X ⇒ A skew",
  "weighted-am-gm": "Weighted / n-variable AM-GM (split aᵖbᵠ… into n equal terms)",
  "log-series": "Logarithmic series — log(1−x) = −(x + x²/2 + x³/3 + …)",
} as const;

export type BlockingTool = keyof typeof BLOCKING_TOOLS;

export function isBlockingTool(v: string): v is BlockingTool {
  return Object.prototype.hasOwnProperty.call(BLOCKING_TOOLS, v);
}

/**
 * Chapters that have actually been adjudicated question-by-question.
 *
 * Pinned by UUID, not name: the /notes and /guide cross-refs join to taxonomy
 * BY NAME and silently rot on a chapter rename (see the "Renaming a SHIPPED
 * chapter" pitfall in CLAUDE.md). A UUID cannot drift. Names below are for
 * display only.
 *
 * Append a chapter here ONLY after every question in it has a verdict.
 */
export const REVIEWED_CHAPTERS: { id: string; name: string }[] = [
  { id: "9526b878-11cb-4014-a3a5-79ccc3d8d8e1", name: "Matrices" },
  { id: "84561864-98dd-4943-9949-3ab1fb3016ff", name: "Determinants" },
  { id: "0043c08d-21ce-4c4a-96a5-add5d1924eca", name: "Sequences and Series" },
];

export const REVIEWED_CHAPTER_IDS: ReadonlySet<string> = new Set(
  REVIEWED_CHAPTERS.map((c) => c.id)
);

export const REVIEWED_CHAPTER_NAMES: string[] = REVIEWED_CHAPTERS.map(
  (c) => c.name
);
