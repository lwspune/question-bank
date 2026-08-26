/**
 * Config for the NDA Maths MOCK-TEST-SERIES ingestion (10 papers x 120 q).
 *
 * Source: the LWS "NDA Math 1 to 10 - Complete Mock" author manuscripts —
 * born-digital DOCX with a clean OMML math layer, so extraction is the PANDOC
 * lane (pandoc -> LaTeX), NOT the vision lane that scripts/practice uses for
 * the lossy practice-book PDFs.
 *
 * These are authored mock papers, not real NDA sittings, so they land as
 * NDA / Mathematics with question_kind='practice' (the same axis as the other
 * ~3.3k NDA Maths practice rows). One source_file per paper keeps each mock
 * reconstructable — a prerequisite if they later become /mock timed tests
 * (they match the NDA Paper I blueprint exactly: 120 q / 300 marks / 150 min).
 *
 * KNOWN SOURCE VARIATION (measured, see the ingestion notes):
 *  - Mocks 1,2,3,5 : tail "ANSWER KEYS" block in the QP; separate solution DOCX.
 *  - Mock 4        : no tail key; answers inline on the solutions.
 *  - Mocks 6,7,8   : escaped `1\.` numbering; answers inline on the solutions.
 *  - Mock 8        : passage sets; 3 solutions live in a supplement DOCX.
 *  - Mock 9        : math is legacy MS-Equation .wmf IMAGES -> pandoc cannot
 *                    recover it; needs the vision lane. Do it last.
 *  - Mock 10       : single DOCX interleaving question + `SOL. (a)` solution.
 */
import { join } from "node:path";

// LWS Pune org + admin + NDA exam — same identities as scripts/practice.
export const ORG_ID = "5d528776-1263-4d77-bc12-f2836fd6073f";
export const CREATED_BY = "28528215-c968-40bf-abac-acdc19cc306f";
export const EXAM_ID = "e4e753d1-c84a-45a8-93ad-6f0bf9733c95"; // NDA
export const SUBJECT_NAME = "Mathematics";

export const SOURCE_ROOT =
  "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Test_Series\\NDA Math 1 to 10 - Complete Mock\\" +
  "Questions_paper\\File updated 1 to 10 NDA Math  Author Manuscript";

/**
 * The WEEKLY NDA-1 2026 mock series — a SIBLING folder of SOURCE_ROOT, and a
 * different source despite the similar name. Five dated papers (8-3-26 →
 * 5-4-26), each 120 q on the NDA Paper I blueprint, each shipping a Maths and a
 * GAT paper (only Maths is in scope here).
 *
 * Only FOUR are ingested. Test-5 (5-4-26) IS the paper already committed as
 * `NDA_Maths_Mock_Test_03.docx`: a stem-similarity pass over all 6,829 NDA
 * Maths rows matched 68 of its questions at Jaccard 1.00, every one at the SAME
 * question number and 100% concentrated in that single source_file. Re-ingesting
 * it would be a no-op at best (content_hash would dedup it) and a second copy at
 * worst, so it is deliberately absent rather than listed and disabled.
 */
export const WEEKLY_ROOT = "C:\\Vilas\\LWS_Pune\\NDA_Subjects_Content\\Test_Series\\NDA_Mock_Tests";

export const OUT = join(__dirname, "out"); // gitignored: pandoc media + previews
export const DATA = join(__dirname, "data"); // committed: extraction + classification

/** A correction from the source's own Corrections.docx, or one we prove at ingest. */
export type Errata = {
  answer?: string; // replaces the printed key letter
  stem?: string; // replaces the extracted stem verbatim
  options?: Record<string, string>; // label -> corrected option text
  /**
   * Supply all four option texts in A,B,C,D order, overriding whatever the
   * parser produced. Applied UNCONDITIONALLY — not only when the parse failed.
   *
   * It began life as a parse-FAILURE escape hatch (Mock 1 Q17 prints
   * "(a) (b) (c) (c)", so there is no chain to find and the parser rightly
   * refuses to guess). But three entries authored against questions that parsed
   * *successfully* with damaged content — m3 Q41, m3 Q117, m4 Q32 — were then
   * silently ignored and those rows shipped with the damage. Hence: always wins.
   */
  optionTexts?: [string, string, string, string];
  /** Replaces the shared Direction/Passage context this question belongs to. */
  context?: string;
  /**
   * Replaces the worked solution. Needed when the solution attached to a number
   * belongs to a DIFFERENT question — Mock 10 numbers two questions "96", so the
   * first was dropped from the numbering run and its options and solution were
   * absorbed into Q95, leaving Q95 keyed and solved as its neighbour.
   */
  solution?: string;
  /**
   * Surgical `[from, to]` edits to the worked solution, for a defect that is one
   * clause of an otherwise-correct derivation (Mock 10 Q100's final line prints
   * `e^x =` where every earlier line establishes `e^y =`).
   *
   * Preferred over restating the whole `solution`: a 700-character LaTeX block
   * retyped by hand is where transcription errors come from. Each `from` MUST
   * appear exactly once — extract.ts throws otherwise, so an edit can never
   * silently miss or apply twice.
   */
  solutionReplace?: [string, string][];
  reason: string; // WHY — always recorded, never a silent edit
};

/**
 * A question the SOURCE failed to number, supplied by hand.
 *
 * `splitQuestionBlocks` keeps a strictly increasing run, so a number the author
 * duplicated loses one of its two questions — the text is swallowed by the
 * preceding block rather than dropped, which is how it gets noticed. Relaxing
 * the run to non-decreasing would re-admit the interior noise that rule exists
 * to reject, across all ten papers; supplying the orphan by hand is contained to
 * the one paper that needs it.
 *
 * `number` is the internal sort/lookup key and must be unique within the paper;
 * `numberLabel` is what the bank stores and shows, so it can carry the number
 * the paper actually prints.
 */
export type ExtraQuestion = {
  number: number;
  numberLabel: string;
  stem: string;
  optionTexts: [string, string, string, string];
  answer: string;
  solution: string;
  reason: string;
};

/**
 * A human ruling on a question the blind/key cross-check could not settle.
 * `answer` commits that letter; `hold` keeps the question OUT of the bank
 * because the printed question is genuinely defective (no correct option,
 * duplicate options, or data the stem never supplies). Every ruling carries
 * the grounds it rests on.
 */
export type Resolution = { answer: string; reason: string } | { hold: true; reason: string };

export type Paper = {
  id: string;
  label: string; // human name, e.g. "NDA Maths Mock Test 1"
  questionDocx: string;
  solutionDocx?: string; // omit when questions+solutions share one DOCX (Mock 10)
  /**
   * Additional solution DOCX appended to the main one before parsing. Mock 8
   * ships its solutions for Q8/Q38/Q56 in a separate "Missing Solutions" file.
   */
  extraSolutionDocx?: string[];
  /**
   * A standalone answer-key DOCX holding a GRID table (the weekly NDA-1 2026
   * series). Distinct from the ten-paper series, which prints its key as a tail
   * `ANSWER KEYS` block inside the question or solution document.
   *
   * Read by `parseGridAnswerKey`, whose duplicate/missing lists are REPORTED so
   * a mislabelled cell can be repaired from the grid's own geometry rather than
   * silently resolved into a wrong key.
   */
  answerKeyDocx?: string;
  /** The typeset booklet. Used to arbitrate when the manuscript looks corrupt. */
  printedPdf?: string;
  sourceFile: string; // questions.source_file — the dedup/rollback key
  questionCount: number;
  note: string; // questions.pyq_note provenance
  errata?: Record<number, Errata>;
  resolutions?: Record<number, Resolution>;
  /** Questions the source failed to number — see ExtraQuestion. */
  extraQuestions?: ExtraQuestion[];
  /**
   * A shared-context block the source prints with NO recognisable header, so
   * `detectDirectionSets` cannot find it and its questions arrive with no
   * context at all — unanswerable, and silently so.
   *
   * w1 prints three: one under a bare `**Passage:**` (the word is supported but
   * the pattern also requires a Q-range, which is absent), and two under plain
   * lead-in prose ("Consider the function f(x) defined as:", "Consider a sphere
   * S given by..."). Declared per-paper rather than by loosening the header
   * pattern: a rule that fires on any paragraph beginning "Consider" would
   * swallow ordinary stems across all fourteen papers.
   */
  contextSets?: { from: number; to: number; context: string }[];
  /**
   * VISION LANE. `tag -> pdf path`, rendered to page PNGs by
   * `render-vision.ts` and transcribed by eye instead of by pandoc.
   *
   * Only Mock 9 needs this: its equations are legacy MS-Equation `.wmf` objects,
   * which pandoc reduces to an image reference. Its PDFs have a text layer, but
   * Word exported every formula as individually-positioned glyphs, so the math
   * arrives with its reading order shredded and its exponents flattened.
   */
  visionPdfs?: Record<string, string>;
};

const p = (...seg: string[]) => join(SOURCE_ROOT, ...seg);
const w = (...seg: string[]) => join(WEEKLY_ROOT, ...seg);

export const PAPERS: Record<string, Paper> = {
  m1: {
    id: "m1",
    label: "NDA Maths Mock Test 1",
    questionDocx: p("Mock - 1", "NDA Maths Mock Test Paper 1 Questions.docx"),
    solutionDocx: p("Mock - 1", "NDA Maths Mock Test Paper 1 Solutions.docx"),
    printedPdf: join(SOURCE_ROOT, "..", "01. Match_Mock_Test_QP.pdf"),
    sourceFile: "NDA_Maths_Mock_Test_01.docx",
    questionCount: 120,
    note: "NDA Mathematics mock test 1 (LWS test series)",
    // From the source's own Soln/Corrections.docx (the author's errata sheet),
    // each one re-verified against the extracted text before being encoded —
    // two of the four turned out to be already applied in this manuscript.
    errata: {
      17: {
        // The paper prints FOUR options but labels them (a)(b)(c)(c): the last
        // is meant to be (d), which is what the key points at. Supplying the
        // texts explicitly rather than letting the parser guess which "(c)" won.
        optionTexts: [
          "an equivalence relation",
          "a symmetric relation only",
          "a transitive relation only",
          "None of these",
        ],
        reason:
          "source mislabels the 4th option as '(c)'; key D + solution ('neither reflexive, symmetric nor transitive') confirm it is (d) None of these",
      },
      64: {
        answer: "C",
        reason:
          "Corrections.docx: 'Q.64 -> Option C is correct'. Printed key says D; verified: x+y=2 with x^2+y^2=4 gives xy=0, so {(0,2),(2,0)} = option C",
      },
      // NB: the Q71-75 Direction block fix lives with the other recovered
      // defects further down — Corrections.docx's de-duplication alone leaves
      // the block underdetermined, so a second correction is needed too.
      // Q92 and Q93 have their STEMS exchanged in the source. Established three
      // ways, all agreeing: Q92 carries the ANGLE options and its printed
      // solution computes /_ABD = 15 (= its key A), while Q93 carries the RATIO
      // options and its solution computes AD/DC = (7-4*sqrt3):1 (= its key B).
      // So the options/solutions/keys are internally consistent as printed and
      // only the two stems are swapped — swapping them back is the minimal fix.
      92: {
        stem: "What is $\\angle ABD\\ ?$",
        reason:
          "source swaps the Q92/Q93 stems: Q92 prints 'What is AD:DC' but carries angle options and a solution deriving /_ABD = 15 deg, matching its key A",
      },
      93: {
        stem: "What is AD:DC equal to?",
        reason:
          "source swaps the Q92/Q93 stems: Q93 prints 'What is /_ABD' but carries ratio options and a solution deriving AD/DC = (7-4*sqrt3):1, matching its key B",
      },
      96: {
        stem: "An experiment consists of flipping a coin and then flipping it a second time if head occurs. If a tail occurs on the first flip, then a six faced die is tossed once. Assuming that the outcomes are equally likely, what is the probability of getting one head and one tail?",
        reason: "Corrections.docx: the word 'tall' in the fourth line should be 'tail'",
      },
      // Q101 needs NO fix: Corrections.docx reports option (d) as '5/5', but this
      // Author Manuscript already prints 5/9 and the key D matches the solution
      // (6/6 x 5/6 x 4/6 = 5/9). Recorded so a later reader does not "re-apply" it.
      59: {
        stem: "Consider the following with regard to a relation R on a set of real numbers defined by $xRy$ if $3x + 4y = 5$\n1. $\\ _{0}R_{1}$\n2. $\\ _{1}R_{1/2}$\n3. $\\ _{2/3}R_{3/4}$\nWhich of the above are correct?",
        reason:
          "stem typos, both present in the printed booklet: a stray 'f' in '$f3x + 4y = 5$', '$xry$' for '$xRy$', and statement 2 printed '1R1/1' where the paper's own solution evaluates 1R(1/2) -> 3(1)+4(1/2)=5",
      },
      // ── The five recovered defects. Each option repair is the SMALLEST edit
      //    that (a) makes all four options distinct and (b) makes the paper's
      //    own printed key correct — never a repair chosen to fit some other
      //    answer. Verified against the typeset booklet.
      61: {
        // Printed (a) and (d) are both "pi/2 - x^2/2 + c" and neither is the
        // antiderivative. (c) is "-x*pi/2 - x^2/2 + c" — the sign-flipped twin
        // of the correct answer — so (a) lost its `x`. Restoring it makes (a)
        // correct (= key A) and all four distinct.
        options: { A: "\\(\\frac{x\\pi}{2} - \\frac{x^{2}}{2} + c\\)" },
        reason:
          "option (a) dropped the x: int sin^-1(cos x) dx = int (pi/2 - x) dx = x*pi/2 - x^2/2 + c. (c) is its exact negative, confirming the intended form; key A then correct",
      },
      71: {
        // Supersedes the earlier context-only fix. The printed booklet carries
        // TWO corruptions, and the paper's own solutions pin both:
        //  * Q71's solution computes "6x = 6 x 5 = 30", so the three pairwise
        //    groups are x, 2x, 3x with x = 5 — i.e. EF-not-H is thrice
        //    HF-not-E, NOT thrice only-Hindi (3 x 23 = 69 would blow past the
        //    stated French total of 46).
        //  * Q75's solution reads "23 + 17 + + 6x + 15 = 96" — a visible gap
        //    where only-French (11) belongs, and it opens with only-Hindi = 23,
        //    the datum the duplicated clause swallowed.
        // Reconstruction check, all five keys agree: only-H 23, only-E 17,
        // only-F 11, HF 5, HE 10, EF 15, all-three 15, none 28.
        //   Q71 precisely two = 30 (C) | Q72 at least two = 45 (C)
        //   Q73 total = 124 (A)        | Q74 E and F = 15+15 = 30 (A)
        //   Q75 at least one = 96 (C)  | French total = 11+5+15+15 = 46 as stated
        context:
          "The students of a class are offered three languages (Hindi, English and French). 15 students learn all the three languages, whereas 28 students do not learn any language. The number of students learning Hindi and English but not French is twice the number of students learning Hindi and French but not English. The number of students learning English and French but not Hindi is thrice the number of students learning Hindi and French but not English. 23 students learn only Hindi and 17 students learn only English. The total number of students learning French is 46 and the total number of students learning only French is 11.",
        reason:
          "printed Direction block is doubly corrupt: it duplicates a clause (Corrections.docx strikes it) which swallowed '23 students learn only Hindi', and it says 'thrice the number of students learn only Hindi' where the arithmetic requires 'thrice the number learning Hindi and French but not English'. Reconstruction is pinned by the paper's own Q71 and Q75 solutions and satisfies all five printed keys",
      },
      102: {
        // The four options are the 2x2 grid {a=b, f=g} x {h=0, c=0}, but the
        // "a=b and h=0" cell is missing and "a=b and c=0" is printed twice.
        // Key C says the correct one is (c), so (c) is the corrupted cell.
        options: { C: "$a = b$ and $h = 0$" },
        reason:
          "printed (a) and (c) are identical ('a = b and c = 0') and the correct circle condition 'a = b and h = 0' is absent. Options form a 2x2 grid with exactly that cell missing; key C identifies (c) as the corrupted one",
      },
      117: {
        // Range of cos2x - sin2x = sqrt2*sin(pi/4 - 2x) is [-sqrt2, sqrt2].
        // (c) has the right CLOSED brackets but a wrong lower endpoint; (d) is
        // the open-interval distractor. A stray 2 in (c) is the single edit
        // that makes key C correct and keeps (d) a meaningful distractor.
        options: { C: "\\(\\lbrack - \\sqrt{2},\\ \\sqrt{2}\\rbrack\\)" },
        reason:
          "option (c) printed [-2sqrt2, sqrt2]; the paper's own solution derives [-sqrt2, sqrt2]. (d) is the deliberate open-interval distractor, so (c) is the closed-interval answer and key C is correct once the stray 2 is removed",
      },
    },
    // Rulings on everything the blind-vs-key cross-check left open. Four of the
    // five HOLDs are defects confirmed against the typeset booklet (01. Match_
    // Mock_Test_QP.pdf), so they are the source's, not the extraction's.
    resolutions: {
      51: {
        answer: "D",
        reason:
          "printed key A is WRONG. A,B,C in AP => B=60; sine rule gives sinC = sinB*(c/b) = (sqrt3/2)(sqrt2/sqrt3) = 1/sqrt2 = option D. Confirmed three ways: own derivation, blind agent, and the paper's OWN solution which ends 'sin C = 1/sqrt2'",
      },
      59: {
        answer: "C",
        reason:
          "printed key C is CORRECT; the blind agent was misled by the OCR-damaged statement 2. The paper's solution evaluates st.1 (0R1) as 4!=5 FALSE, st.2 and st.3 TRUE => '2 and 3' = C",
      },
      65: {
        answer: "C",
        reason:
          "printed key A is WRONG and so is the paper's own solution. Statement 2 is TRUE: if A is singular then det(AB)=det(A)det(B)=0, so AB is always singular. Both statements hold => C",
      },
      92: {
        answer: "A",
        reason:
          "unresolvable in the blind pass only because the packet predated the Q92/Q93 stem swap. With the stem corrected to 'What is /_ABD?', the paper's solution (=15 deg) and key A agree",
      },
      93: {
        answer: "B",
        reason:
          "as Q92: with the stem corrected to 'What is AD:DC?', the paper's solution ((7-4sqrt3):1) and key B agree",
      },
      96: {
        answer: "D",
        reason:
          "printed key B (1/36) is WRONG. Treating the 8 outcomes {HH,HT,T1..T6} as equally likely (as the stem instructs) gives P(one head and one tail)=P(HT)=1/8 = option D — which is exactly what the paper's own solution states",
      },
      // ── Recovered: each was defective as printed and is repaired by the
      //    corresponding errata entry above, after which the paper's own key
      //    is correct. Nothing here overrides a key; the repairs restore the
      //    option the key was always pointing at.
      61: {
        answer: "A",
        reason:
          "recovered: option (a) restored to x*pi/2 - x^2/2 + c (it had lost its x, printing as a duplicate of (d)). Printed key A is then correct and matches the paper's solution",
      },
      73: {
        answer: "A",
        reason:
          "recovered: with only-Hindi = 23 restored to the Direction block, total = 23+17+11+30+15+28 = 124 = option A, the printed key. Corroborated by the paper's Q75 solution, which sums the same groups to 96",
      },
      75: {
        answer: "C",
        reason:
          "recovered: at least one language = 124 - 28 = 96 = option C, the printed key, and exactly the total the paper's own solution states ('= 96')",
      },
      102: {
        answer: "C",
        reason:
          "recovered: option (c) restored to 'a = b and h = 0' (the missing cell of the 2x2 option grid). Printed key C is then correct — that IS the circle condition",
      },
      117: {
        answer: "C",
        reason:
          "recovered: option (c) restored to [-sqrt2, sqrt2] (a stray 2 in the lower endpoint). Printed key C is then correct and matches the paper's derived range",
      },
    },
  },
};

PAPERS.m2 = {
  id: "m2",
  label: "NDA Maths Mock Test 2",
  questionDocx: p("Mock - 2", "NDA Maths Mock Test Paper 2 Questions.docx"),
  solutionDocx: p("Mock - 2", "NDA Maths Mock Test Paper 2 Solutions.docx"),
  printedPdf: join(SOURCE_ROOT, "..", "02. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_02.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 2 (LWS test series)",
  errata: {
    66: {
      // The manuscript prints only (a)-(c); the typeset booklet has all four,
      // so the fourth was lost in the DOCX, not by the author.
      optionTexts: [
        "\\(A - (B \\cap C)\\)",
        "\\((A - B) \\cup C\\)",
        "\\((A - B) \\cup (A \\cap C)\\)",
        "None of these",
      ],
      reason:
        "manuscript dropped option (d) 'None of these'; restored from the typeset booklet (02. Match_Mock_Test_QP.pdf p3)",
    },
    111: {
      // Labels print as (a)(b)(b)(d) in BOTH the manuscript and the booklet —
      // the third is meant to be (c). Values are unambiguous.
      optionTexts: ["0", "1", "2", "5"],
      reason:
        "source mislabels the third option as '(b)' (so the block reads a,b,b,d) in both the manuscript and the printed booklet; values 0/1/2/5 are unambiguous",
    },
    41: {
      options: { A: "\\(\\frac{1}{2}\\) and 2" },
      reason: "option (a) prints '1/2 and d'; the 'd' is a mis-scanned 2 (the roots are 1/2 and 2)",
    },
    46: {
      stem: "Equation of the hyperbola with eccentricity \\(\\frac{3}{2}\\) and foci at \\(( \\pm 2,\\ 0)\\) is \\(5x^{2} - 4y^{2} = k^{2},\\) what is the value of k?",
      reason:
        "manuscript prints the foci as '9 \\pm 2, 0)'; the typeset booklet reads '(\\pm 2, 0)' — a stray 9 for the opening bracket",
    },
    80: {
      stem: "The frequency distribution of a discrete variable x with one missing frequency f is given above. If the arithmetic mean of x is \\(\\frac{23}{8}\\), What is the value of the missing frequency?",
      reason:
        "printed mean 32/8 = 4 is impossible (max x is 4, so a mean of 4 needs every observation to be 4; solving gives f = -12). The intended 23/8 is a digit transposition and yields f = 6, the keyed option",
    },
    82: {
      stem: "For a set of discreate numbers, three measures of central tendency are given below.\n1. Arithmetic mean\n2. Median\n3. Geometric Mean\nThen which of the following is/are defined?",
      reason:
        "manuscript lost the question line entirely, leaving four options and nothing asked; restored verbatim from the typeset booklet ('Then which of the following is/are defined?')",
    },
    86: {
      stem: "If \\(\\left( 3\\overrightarrow{a} - \\overrightarrow{b} \\right) \\times \\left( \\overrightarrow{a} + 3\\overrightarrow{b} \\right) = \\ k\\ \\overrightarrow{a} \\times \\overrightarrow{b},\\) then what is the value of k?",
      reason:
        "stem is corrupt in BOTH manuscript and booklet: it prints '(a - b) x (a + 3b) = a x b', losing the leading 3 and the k it then asks for. The paper's own solution works '(3a - b) x (a + 3b) = k a x b' = 10(a x b), matching key A",
    },
    113: {
      stem: "If \\(\\begin{bmatrix}\n1 & 3 \\\\\n0 & 1\n\\end{bmatrix}\\ A = \\ \\begin{bmatrix}\n1 & - 1 \\\\\n0 & 1\n\\end{bmatrix}\\), then what is the matrix A?",
      reason:
        "printed coefficient matrix reads [[1,-3],[0,1]] (and the booklet even puts a comma between the two matrices), for which the unique solution [[1,2],[0,1]] is in no option. The paper's own solution uses [[1,3],[0,1]], giving [[1,-4],[0,1]] = key D",
    },
    // ── Stem/option repairs for OCR damage. Each is taken from a source that
    //    DOCUMENTS the intended text — the paper's own worked solution, or the
    //    typeset booklet — never reconstructed from the answer.
    17: {
      stem: "If \\({\\overrightarrow{r}}_{1} = \\lambda\\widehat{i} + 2\\widehat{j} + \\widehat{k},\\ {\\overrightarrow{r}}_{2} = \\widehat{i} + (2 - \\lambda)\\widehat{j} + 2\\widehat{k}\\) are such that \\(\\left| {\\overrightarrow{r}}_{1} \\right| > \\left| {\\overrightarrow{r}}_{2} \\right|,\\) then \\(\\lambda\\) satisfies which one of the following?",
      reason:
        "manuscript splices text from other questions into r2 ('t bda )f length 1 and parallel to ... sum of even terms in is') and the booklet mistypes the j-hat as i-hat. The paper's OWN solution prints the clean vector: r2 = i + (2 - lambda)j + 2k",
    },
    22: {
      options: { B: "\\(y^{2}\\left( 1 + x^{3} \\right) = x^{4}\\)" },
      reason:
        "option (b) lost its '=' sign in the manuscript, printing as 'y^2(1+x^3) x^4'; restored from the typeset booklet",
    },
    23: {
      // The manuscript's option (b) is text bled in from Q22(b). The booklet
      // prints (b) IDENTICALLY to (a) — itself a printing error, and shipping
      // two identical options is not usable. So (b) becomes a distinct member of
      // the same wrong family (a sign variant). The KEY IS UNTOUCHED: D is
      // correct either way, since the paper's own solution derives
      // tan(x+y) = x + c, which no option offers.
      options: { B: "\\(y + c = \\sin(x + y)\\)" },
      reason:
        "manuscript option (b) is OCR bleed from Q22(b); the booklet prints (b) identical to (a), so neither source gives a usable distractor. Replaced with a distinct sign-variant of the same wrong form — key D is unaffected and independently verified (the paper derives tan(x+y) = x + c, offered by no option)",
    },
    33: {
      stem: "Let \\(f(x) = \\frac{1}{1 - |1 - x|}.\\) Then, what is \\(\\lim_{x \\rightarrow 1}f(x)\\) equal to?",
      reason:
        "printed limit point x->0 makes the limit non-existent (f reduces to 1/x near 0) and no option says so. The paper's own solution substitutes x = 1 - h — i.e. x->1 — and gets 1, which is key C. One edit to the limit point makes stem, solution and key consistent; the alternative needs BOTH the solution and the key to be wrong",
    },
    110: {
      stem: "If \\(\\left( \\frac{a_{1}}{x} \\right) + \\left( \\frac{b_{1}}{y} \\right) = c_{1}\\) and \\(\\left( \\frac{a_{2}}{x} \\right) + \\left( \\frac{b_{2}}{y} \\right) = c_{2}\\)\n\\(\\Delta_{1} = \\ \\left| \\begin{matrix}\na_{1} & b_{1} \\\\\na_{2} & b_{2}\n\\end{matrix} \\right|,\\ \\Delta_{2} = \\left| \\begin{matrix}\nb_{1} & c_{1} \\\\\nb_{2} & c_{2}\n\\end{matrix} \\right|,\\ \\Delta_{3} = \\left| \\begin{matrix}\nc_{1} & a_{1} \\\\\nc_{2} & a_{2}\n\\end{matrix} \\right|,\\) then, (x, y) is equal to which one of the following?",
      reason:
        "the RHS of the second equation was replaced by a garbled run bled in from the Q104/Q109 region, and the Delta_2 determinant was truncated mid-matrix. Restored from the typeset booklet (p7), which the paper's own solution corroborates",
    },
    120: {
      options: { D: "8" },
      reason: "option (d) carried a stray trailing '$$' LaTeX delimiter from the extraction",
    },
    70: {
      // (a) and (d) are byte-identical (4 1 3 2) in BOTH manuscript and booklet.
      // Key C (4 3 1 2) is the unique correct ordering and is unaffected —
      // verified independently: A -> omega^2 = -1/2(1+i*sqrt3) = 4,
      // B -> i = 3, C -> (1-i)^3 = -2(1+i) = 1, D -> (1+i)^2 = 2i = 2.
      // (d) is made distinct by transposing the last two entries of the
      // duplicate, so it stays a wrong ordering of the same family.
      options: {
        D: "\\(\\begin{matrix} A\\ \\ B\\ \\ C\\ \\ D \\\\ 4\\ \\ \\ 1\\ \\ \\ 2\\ \\ \\ 3 \\end{matrix}\\)",
      },
      reason:
        "options (a) and (d) print identically as '4 1 3 2' in both the manuscript and the booklet; (d) transposed to '4 1 2 3' so the four choices are distinct. Key C is the unique correct ordering and is untouched",
    },
  },
  resolutions: {
    20: {
      answer: "D",
      reason:
        "printed key C ('always real') is false for complex coefficients — (x-1)(x-i) has one real root and one not. Option D ('real, if the coefficients are real') is true under BOTH readings, so it is the only uniquely defensible answer; the paper's solution asserts C without the qualifier that option D exists to test",
    },
    23: {
      answer: "D",
      reason:
        "printed key D is CORRECT and the blind derivation's transposed-differential hypothesis is unsupported: the paper reads the stem exactly as printed (dy/dx = -sin^2(x+y)) and derives tan(x+y) = x + c, which matches no option — hence None of these",
    },
    32: {
      answer: "A",
      reason:
        "printed key D is WRONG. All three statements hold: x^2/x -> 0 so the limit exists; x^2/x is undefined at 0 so it is NOT continuous there; |x|/x has one-sided limits -1 and +1. The paper's solution errs by calling x^2/x a polynomial ('all polynomials are continuous') — it is a rational function with 0 excluded from its domain",
    },
    55: {
      answer: "B",
      reason:
        "printed key D is WRONG. With t = tan(phi) the equation factors as t^2 (t-1)^2 (t^2+t+1) = 0, so it holds only for tan(phi) = 0 or 1 — a conditional equation. Option B ('not an identity') states exactly that",
    },
    62: {
      answer: "B",
      reason:
        "printed key D (A = B = C) is WRONG — A={1}, B=C={2} satisfies both hypotheses with A != B. The correct conclusion is B = C, which is option B and is EXACTLY what the paper's own solution states ('=> B = C')",
    },
    90: {
      answer: "B",
      reason:
        "printed key A is WRONG. Textbook rule: m(OA) + n(OB) = (m+n)(OG). The second force is 3(BO) = -3(OB), so m = 2, n = -3 and the multiplier is m+n = -1. The paper's own solution states G divides AB externally, then computes with unsigned magnitudes and loses the sign",
    },
    104: {
      answer: "A",
      reason:
        "printed key A KEPT. This is definitional, not mathematical: the assertion rests on the textbook convention that a 100% enumeration involves no probability and so is not 'statistical data' in the inferential sense — which is precisely what the Reason states. The paper is internally consistent (solution + key agree); flagged because the modern mainstream view would call census output statistical data",
    },
    108: {
      answer: "D",
      reason:
        "printed key A is WRONG. |A^-1| = 1/|A| = 1/(ab) = option D. The paper's solution writes |A^-1| = (1/ab)|[[b,0],[1,a]]| = (1/ab) x ab = 1, forgetting that a scalar pulled out of a 2x2 determinant is SQUARED: |kM| = k^2|M|",
    },
    82: {
      answer: "D",
      reason:
        "key D correct once the missing question line is restored — AM, median and GM are all defined for a set of discrete numbers",
    },
    86: {
      answer: "A",
      reason: "key A correct once the stem is repaired: (3a - b) x (a + 3b) = 10 (a x b)",
    },
    113: {
      answer: "D",
      reason: "key D correct once the coefficient matrix is repaired to [[1,3],[0,1]]",
    },
    33: {
      answer: "C",
      reason:
        "RECOVERED. Printed as lim x->0 the limit does not exist and no option says so; the paper's own solution substitutes x = 1 - h (i.e. x->1) and obtains 1 = key C. Repairing the limit point to x->1 makes stem, solution and key all consistent — one edit rather than assuming both the solution and the key are wrong",
    },
  },
};

PAPERS.m3 = {
  id: "m3",
  label: "NDA Maths Mock Test 3",
  questionDocx: p("Mock - 3", "NDA Maths Mock Test Paper 3 Questions.docx"),
  solutionDocx: p("Mock - 3", "NDA Maths Mock Test Paper 3 Solutions.docx"),
  printedPdf: join(SOURCE_ROOT, "..", "03. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_03.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 3 (LWS test series)",
  errata: {
    4: {
      // Labels print as (a) () (c) (d) — the second is EMPTY — and option (c)
      // prints '3x + 2y - 0' where the '-' is a misprinted '='.
      optionTexts: ["\\(x - z = 0\\)", "\\(z + y = 0\\)", "\\(3x + 2y = 0\\)", "\\(3x + 2z = 0\\)"],
      reason:
        "second option label is printed empty as '()' instead of '(b)', and option (c) prints '3x + 2y - 0' for '= 0'. A plane contains the Z-axis iff it has the form ax + by = 0, so (c) is the answer",
    },
    85: {
      // Labels print as (a)(b)(c)(c) — the fourth is meant to be (d).
      optionTexts: ["\\(k|AB|\\)", "\\(k^{2}|AB|\\)", "\\(k^{3}|AB|\\)", "\\(|AB|\\)"],
      reason:
        "source mislabels the fourth option as '(c)', so the block reads a,b,c,c. AB is 3x3 (3x2 times 2x3), so |kAB| = k^3|AB|",
    },
    88: {
      // Labels print as (a)(b)(d)(d) — the third is meant to be (c). Also
      // tidies the malformed subscript commas in the stem.
      stem: "Suppose the system of equations\n\\(a_{1}x + b_{1}y + c_{1}z = d_{1}\\)\n\\(a_{2}x + b_{2}y + c_{2}z = d_{2}\\)\n\\(a_{3}x + b_{3}y + c_{3}z = d_{3}\\)\nhas a unique solution \\(\\left( x_{0},\\ y_{0},\\ z_{0} \\right).\\) If \\(x_{0} = 0\\) then which one of the following is correct?",
      optionTexts: [
        "\\(\\left| \\begin{matrix}\na_{1} & b_{1} & c_{1} \\\\\na_{2} & b_{2} & c_{2} \\\\\na_{3} & b_{3} & c_{3}\n\\end{matrix} \\right| = 0\\)",
        "\\(\\left| \\begin{matrix}\nd_{1} & b_{1} & c_{1} \\\\\nd_{2} & b_{2} & c_{2} \\\\\nd_{3} & b_{3} & c_{3}\n\\end{matrix} \\right| = 0\\)",
        "\\(\\left| \\begin{matrix}\nd_{1} & a_{1} & c_{1} \\\\\nd_{2} & a_{2} & c_{2} \\\\\nd_{3} & a_{3} & c_{3}\n\\end{matrix} \\right| = 0\\)",
        "\\(\\left| \\begin{matrix}\nd_{1} & a_{1} & b_{1} \\\\\nd_{2} & a_{2} & b_{2} \\\\\nd_{3} & a_{3} & b_{3}\n\\end{matrix} \\right| = 0\\)",
      ],
      reason:
        "source mislabels the third option as '(d)', so the block reads a,b,d,d. By Cramer x0 = |d b c| / |a b c| and uniqueness forces |a b c| != 0, so x0 = 0 gives |d b c| = 0 = option (b)",
    },
    // ── OCR damage. Every repair below is what the paper's OWN worked solution
    //    prints; none is reconstructed from the answer.
    1: {
      stem: "Under which one of the following conditions will be two planes \\(x + y + z = 7\\) and \\(\\alpha x + \\beta y + \\gamma z = 3\\) be parallel (but not coincident)?",
      options: { C: "\\(\\alpha = \\beta = \\gamma\\)" },
      reason:
        "stem had a fragment of its own text spliced into the equation, pushing the RHS 3 to the end; option (c) printed 'eta' for 'beta'. The paper's solution prints both cleanly",
    },
    11: {
      stem: "If \\(y = x + e^{x},\\) find \\(\\frac{d^{2}x}{dy^{2}}.\\)",
      // (b) and (d) print identically; (d) becomes the intermediate-step value,
      // a natural wrong answer. Key C (the negative form) is untouched.
      options: { D: "\\(\\frac{e^{x}}{\\left( 1 + e^{x} \\right)^{2}}\\)" },
      reason:
        "stem printed 'dx^2/dy^2' for 'd^2x/dy^2' (the solution prints it correctly), and options (b) and (d) were byte-identical; (d) set to the intermediate value e^x/(1+e^x)^2 so the four differ. Key C unaffected",
    },
    26: {
      stem: "What is the locus of the point (x,y) for which the vectors \\((\\widehat{i} - x\\widehat{j} - 2\\widehat{k})\\) and \\((2\\widehat{i} + \\widehat{j} + y\\widehat{k})\\) are orthogonal ?",
      reason:
        "the second vector's j-coefficient was swallowed by text bled in from neighbouring questions ('...regular hexagon closed with 200 m of fencing'). The paper's solution prints (2i + j + yk)",
    },
    31: {
      stem: "Let, \\(f(x) = \\ \\left\\{ \\begin{matrix}\n3x - 4, & 0 \\leq x \\leq 2 \\\\\n2x + l, & 2 < x \\leq 9\n\\end{matrix} \\right.\\) If f is continuous at \\(x = 2,\\) then what is the value of l?",
      reason:
        "the parameter l was dropped from the second branch, so the question asked for an l that appeared nowhere. The paper's solution computes '2(2+h) + l' giving 2 = 4 + l, l = -2 = key C",
    },
    37: {
      stem: "If \\(g(x) = \\sin{x,}\\ x\\ \\epsilon\\ R\\) and \\(f(x) = \\frac{1}{\\sin x},\\ x\\ \\epsilon\\ \\left( 0,\\frac{\\pi}{2} \\right),\\) What is \\((gof)(x)\\) equal to?",
      reason:
        "both functions were labelled f(x), so the composition gof was undefined. The paper's solution opens 'g(x) = sin x and f(x) = 1/sin x'",
    },
    41: {
      // An inverse expresses x in terms of y; all four options printed 'y ='.
      optionTexts: [
        "\\(x = 5^{1/\\log y}\\)",
        "\\(x = y^{1/\\log 5}\\)",
        "\\(x = 5^{\\log y}\\)",
        "\\(x = y^{\\log 5}\\)",
      ],
      reason:
        "all four options printed 'y = ...', which is meaningless for an inverse. The paper's solution concludes x = y^(1/log 5) = key B",
    },
    42: {
      stem: "Which one of the following is correct?\nThe function \\(f:A \\rightarrow R,\\) where \\(A = \\ \\left\\{ x\\ \\epsilon\\ R,\\  - \\frac{\\pi}{2} < x < \\frac{\\pi}{2} \\right\\}\\) defined by \\(f(x) = \\tan x\\)",
      reason:
        "the function was buried under text spliced in from other questions ('efined by n ow owng function intsh units perpendicular to the vectors'); the paper's solution opens 'f(x) = tan x'",
    },
    44: {
      stem: "Under what condition are the two lines\n\\(y = \\frac{m}{l}x + \\alpha,\\ z = \\frac{n}{l}\\ x + \\beta;\\) and \\(y = \\frac{m'}{l'}\\ x + \\alpha',\\ z = \\frac{n'}{l'}\\ x + \\beta'\\) orthogonal?",
      reason:
        "the second line's z-equation was missing and its y-intercept printed beta' for alpha'; restored from the paper's solution, which writes both lines in full",
    },
    56: {
      stem: "The populations of four towns A,B,C and D as on 2001 are as follows.\n\n| Town | Population |\n|---|---|\n| A | 6863 |\n| B | 519 |\n| C | 12185 |\n| D | 1756 |\n\nWhich one of the following is the most appropriate diagram to present the above data?",
      reason:
        "the question line was missing entirely, leaving only the table and four options. Restored from the paper's solution ('Bar chart is the most appropriate diagram to present the population of given four towns'); the table is also re-authored as a GFM pipe-table so it renders",
    },
    67: {
      stem: "What is the number of five -- digit numbers formed with 0, 1, 2, 3, 4, without any repetition of digits?",
      reason:
        "the digit 4 was dropped, leaving four digits from which no five-digit number exists. The paper's solution states '0,1,2,3,4' and computes 4x4x3x2x1 = 96 = key C",
    },
    72: {
      stem: "If \\(x = 2^{\\frac{1}{3}} - 2^{- \\frac{1}{3}},\\) then what is the value of \\(2x^{3} + 6x\\) ?",
      reason:
        "stem printed the first exponent as 1/2; both must be 1/3 for the cube identity to close. The paper's solution opens with x = 2^(1/3) - 2^(-1/3) and reaches 3 = key C",
    },
    73: {
      options: {
        D: "\\(\\pm \\ \\left( \\frac{1}{2} - i\\frac{\\sqrt{3}}{2} \\right)\\)",
      },
      reason: "option (d) printed 1/1 for 1/2",
    },
    75: {
      stem: "If \\(10^{\\left( \\log_{10}|x| \\right)} = 2\\) what is the value of x?",
      reason:
        "the base printed as x instead of 10, making the equation unsolvable within the options. The paper's solution opens '10^(log10|x|) = 2 => |x| = 2 => x = +-2' = key C",
    },
    115: {
      stem: "For what value of x does the equation \\(4\\sin x + 3\\sin{2x} - 2\\sin{3x} + \\sin{4x} = 2\\sqrt{3}\\) hold?",
      reason:
        "the RHS printed as sqrt3, for which no option works. The paper's solution states the RHS as 2*sqrt3 in its first line, and evaluating its own x = pi/6 gives 2 + 3sqrt3/2 - 2 + sqrt3/2 = 2*sqrt3 = key A",
    },
    117: {
      // The four "pairs" are equalities; every '=' printed as '-'.
      optionTexts: [
        "\\(\\sin{2\\pi} = \\sin( - 2\\pi)\\)",
        "\\(\\tan 45^{o} = \\tan\\left( - 315^{o} \\right)\\)",
        "\\(\\cot\\left( \\tan^{- 1}{0.5} \\right) = \\tan\\left( \\cot^{- 1}{0.5} \\right)\\)",
        "\\(\\tan{420^{o}} = \\tan\\left( - 60^{o} \\right)\\)",
      ],
      reason:
        "the question asks which PAIR is not correctly matched, so each option must be an equality; all four printed '-' where '=' belongs",
    },
  },
  resolutions: {
    117: {
      answer: "D",
      reason:
        "printed key A is WRONG, and so is the reasoning behind it: the solution argues sin(-2pi) = -sin(2pi) != sin(2pi), but sin(2pi) = 0 so the two ARE equal and (a) is correctly matched. (b) tan45 = tan(-315) = 1 and (c) cot(arctan 0.5) = tan(arccot 0.5) = 2 also hold. Only (d) fails: tan420 = +sqrt3 while tan(-60) = -sqrt3",
    },
    1: {
      answer: "C",
      reason:
        "printed key C KEPT as the general condition the paper's solution states (alpha = beta = gamma). Noted as a loose question: option (a) alpha=beta=gamma=1 is ALSO a sufficient condition, and (c) strictly admits the coincident case alpha=beta=gamma=3/7 which option (b) exists to catch",
    },
    42: {
      answer: "C",
      reason:
        "printed key C KEPT. tan x on (-pi/2, pi/2) -> R is bijective, which the paper's solution states. Noted as loose: option (a) 'Injective' is also a true statement, so (c) is the intended strongest answer rather than the only true one",
    },
    37: {
      answer: "D",
      reason:
        "printed key D is CORRECT; the blind derivation answered the CORRUPTED stem (both functions were labelled f). With the stem repaired to g(x) = sin x, f(x) = 1/sin x, (gof)(x) = sin(1/sin x) = option D, exactly as the paper's solution shows",
    },
    39: {
      answer: "A",
      reason:
        "printed key D is WRONG, and its reasoning with it: the solution claims sin|x| is periodic and therefore non-differentiable at many points. sin|x| is EVEN, not periodic. It equals sin x for x >= 0 and -sin x for x < 0, both differentiable, so the only failure is at x = 0 where the one-sided derivatives are +1 and -1 — option A",
    },
    55: {
      answer: "B",
      reason:
        "printed key B KEPT. This is textbook-convention recall with no derivation: the paper's solution states only criterion 2 (frequencies cluster around the class mid-point), and key B matches. Flagged because criterion 1 (a single rise-then-fall peak) is also a commonly taught criterion, so the blind pass reasonably read it as 'both'",
    },
    71: {
      answer: "D",
      reason:
        "printed key A is WRONG. |z+w|^2 - |z-w|^2 = 4 Re(z * conj(w)), so equality forces Re(z conj w) = 0, i.e. z conj(w) purely imaginary = option D. Counterexample to key A: z = 1, w = i gives |1+i| = |1-i| = sqrt2 with NEITHER zero",
    },
    75: {
      answer: "C",
      reason:
        "answerable once the base is repaired from x to 10: 10^(log10|x|) = 2 gives |x| = 2, x = +-2 = key C, exactly as the paper's solution derives",
    },
    115: {
      answer: "A",
      reason:
        "answerable once the RHS is repaired from sqrt3 to 2*sqrt3 (the value the paper's own solution states): at x = pi/6 the LHS is 2 + 3sqrt3/2 - 2 + sqrt3/2 = 2*sqrt3 = key A",
    },
  },
};

// Mock 4 differs from 1-3: the QP carries NO tail answer-key block; the answers
// live in the solution DOCX instead.
PAPERS.m4 = {
  id: "m4",
  label: "NDA Maths Mock Test 4",
  questionDocx: p("Mock -4", "Mock TEST 4  Question Author MS  updated.docx"),
  solutionDocx: p("Mock -4", "Mock Test 4 Solution -Author MS  updated.docx"),
  printedPdf: join(SOURCE_ROOT, "..", "04. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_04.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 4 (LWS test series)",
  // This paper's recurring defect is a corrupted FOURTH option label — printed
  // as '(b)', '(c)' or even '9d)' where '(d)' belongs. The option TEXTS are
  // undamaged in every case, so only the labels are restored.
  errata: {
    25: {
      optionTexts: ["256", "512", "1024", "None of these"],
      reason: "fourth option label printed '(b)', so the block reads a,b,c,b",
    },
    34: {
      optionTexts: ["2 having negative powers", "2 having positive powers", "2 only", "None of the above"],
      reason: "fourth option label printed '9d)' — a '9' scanned for the opening parenthesis",
    },
    77: {
      optionTexts: [
        "\\(x^{2} + y^{2} - 2x + 4y + 1 = 0\\)",
        "\\(x^{2} + y^{2} - 2x - 4y + 1 = 0\\)",
        "\\(x^{2} + y^{2} + 2x + 4y + 1 = 0\\)",
        "\\(x^{2} + y^{2} + 4x + 2y + 4 = 0\\)",
      ],
      reason: "fourth option label printed '(c)', so the block reads a,b,c,c",
    },
    79: {
      optionTexts: ["\\(bx - ay = 0\\)", "\\(bx + ay - 2ab = 0\\)", "\\(bx + ay = 0\\)", "None of these"],
      reason: "fourth option label printed '(b)', so the block reads a,b,c,b",
    },
    // ── Stem OCR damage, every repair taken from the paper's own solution.
    7: {
      stem: "The value of 'a' for which one root of the quadratic equation \\(\\left( a^{2} - 5a + 3 \\right)x^{2} + (3a - 1)x + 2 = 0\\) is twice as large as the other, is",
      reason:
        "stem printed (3a + 1)x, for which 51a = 26 and no option works. The paper's solution uses sum of roots = (1 - 3a)/(a^2-5a+3), i.e. the coefficient is (3a - 1); then 39a = 26, a = 2/3 = key A. The trailing 'is' was also clipped to 's'",
    },
    23: {
      stem: "If \\(\\ ^{n}P_{3} + \\ ^{n}C_{n - 2} = 14n,\\) then n =",
      reason:
        "second term printed as a permutation, for which no integer n satisfies the equation. As a COMBINATION it reads n(n-1)(n-2) + n(n-1)/2 = 14n, whose unique solution is n = 5 (60 + 10 = 70) — the paper's solution says 'By inspection n = 5' = key A",
    },
    32: {
      // The exponent fractions were flattened: a^{1/(1-log_a x)} printed as
      // 1/a^{1-log_a x}. The paper's solution derives log_a y = 1/(1 - log_a x),
      // which fixes the intended form. Option (b)'s exponent is garbled beyond
      // recovery (a digit became 'z'), so it is replaced by a distinct member of
      // the same family; key C is untouched.
      stem: "If \\(y = a^{\\frac{1}{1 - \\log_{a}x}}\\) and \\(z = a^{\\frac{1}{1 - \\log_{a}y}},\\) then x is equal to",
      optionTexts: [
        "\\(a^{\\frac{1}{1 + \\log_{a}z}}\\)",
        "\\(a^{\\frac{1}{\\log_{a}z - 1}}\\)",
        "\\(a^{\\frac{1}{1 - \\log_{a}z}}\\)",
        "None of these",
      ],
      reason:
        "exponent fractions flattened in the stem AND all three expression options; the paper's solution derives log_a y = 1/(1 - log_a x), fixing the intended a^(1/(1-log_a x)) form. Option (b) was garbled ('z + log_a z') and is replaced by a distinct wrong member of the same family",
    },
    43: {
      stem: "\\(\\lim_{x \\rightarrow 0}{\\frac{e^{\\frac{1}{x}}}{e^{\\left( \\frac{1}{x} + 1 \\right)}} = \\ }\\)",
      reason:
        "stem printed the limit point as 4 where the paper's solution evaluates x -> 0. The expression is the constant 1/e either way, so key D ('None of these') holds; the limit point is aligned to the solution",
    },
    58: {
      stem: "If \\(y = 4x - 5\\) is tangent to the curve \\(y^{2} = px^{3} + q\\) at \\((2,3),\\) then",
      reason:
        "the operator between px^3 and q was lost ('px^{3} q'). The paper's solution writes y^2 = px^3 + q and derives p = 2 then 9 = 16 + q, q = -7 = key A",
    },
    69: {
      // (a) and (b) both print pi/4. The key is B, so (b) keeps the correct
      // value and (a) becomes a distinct wrong one.
      options: { A: "\\(\\frac{\\pi}{2}\\)" },
      reason:
        "options (a) and (b) printed identically as pi/4. Key B is correct (the paper's solution derives pi/4), so (a) is set to pi/2 to make the four distinct",
    },
    111: {
      options: { C: "\\(\\frac{2^{n} - 1}{n}\\)" },
      reason:
        "options (a) and (c) printed identically as (2^n + 1)/n — a duplicated DISTRACTOR, since key B ((2^(n+1) - 1)/(n+1)) is correct per the paper's solution. (c) set to (2^n - 1)/n so the four differ",
    },
  },
  resolutions: {
    2: {
      answer: "D",
      reason:
        "printed key B is WRONG. For |z| >= 2 the nearest point to -1/2 is z = -2, so min |z + 1/2| = 3/2 EXACTLY — attained, not approached. Option B says 'strictly greater than 3/2', which is therefore false; option D ('lies in the interval (1,2)') is true since 3/2 is in (1,2). The paper's solution uses strict inequalities where the triangle-inequality bound is attained",
    },
    70: {
      answer: "A",
      reason:
        "printed key B is WRONG. Area for x >= 1 is 2*int_1^2 sqrt(4-x^2) dx = 2[pi - sqrt3/2 - pi/3] = 4pi/3 - sqrt3 = option A (~2.46). Key B (8pi/3 - sqrt3 ~ 6.65) EXCEEDS half the circle's 4pi area, so it cannot be the smaller part; the paper set up the right integral then doubled the pi term twice",
    },
    98: {
      answer: "B",
      reason:
        "printed key A is WRONG and the paper's OWN solution says so: it derives tan(alpha+beta) = p/(q-1) and then states 'Which is given in (b)'. Option A is the sign-flipped distractor — the expression evaluates to +q, not -q",
    },
    69: {
      answer: "B",
      reason:
        "key B correct once the duplicate option (a) is made distinct; the paper's solution derives pi/4",
    },
    68: {
      hold: true,
      reason:
        "DEFECTIVE — all THREE sources disagree and no repair reconciles them. The stem prints int_{pi}^{pi} (= 0, not an option); the paper's solution writes int_{-pi}^{pi}, which by evenness and period pi equals 4*int_0^{pi/2} f = pi — also not an option; and the key 3pi/2 requires an integration span of 3pi. Since f averages 1/2, the offered values pin spans of pi/2, pi, 3pi and 4pi, so the printed limits, the solution's limits and the key each imply a different question",
    },
  },
};

PAPERS.m5 = {
  id: "m5",
  label: "NDA Maths Mock Test 5",
  questionDocx: p("Mock - 5", "NDA Maths Mock Test Paper 5 Questions.docx"),
  solutionDocx: p("Mock - 5", "NDA Maths Mock Test Paper 5 Solutions.docx"),
  printedPdf: join(SOURCE_ROOT, "..", "05. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_05.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 5 (LWS test series)",
  errata: {
    50: {
      // Stem lost the square: the solution computes (a x b)^2 = 16 = key B.
      // Options (c) and (d) are both garbage — (c) prints a VECTOR and (d) is
      // Q49's plane equation spliced in — as answers to a scalar question, so
      // both are replaced by plausible wrong scalars. Key B is untouched.
      stem: "If \\(\\left| \\overrightarrow{a} \\right| = 4,\\ \\left| \\overrightarrow{b} \\right| = 2\\) and the angle between \\(\\overrightarrow{a}\\) and \\(\\overrightarrow{b}\\) is \\(\\frac{\\pi}{6}\\) then \\(\\left( \\overrightarrow{a} \\times \\overrightarrow{b} \\right)^{2}\\) is equal to",
      options: { C: "64", D: "4" },
      reason:
        "stem dropped the exponent — the paper's solution evaluates (a x b)^2 = |a|^2|b|^2 sin^2(pi/6) = 16 = key B. Option (a) 48 is the designed (a.b)^2 trap; options (c) (a bare vector) and (d) (Q49's plane equation, spliced) were not scalars at all and are replaced by |a|^2|b|^2 = 64 and |a x b| = 4",
    },
    52: {
      // The second line's direction ratios were flattened to 1,1,1. The paper's
      // solution uses the determinant rows (1,1,-k) and (k,2,1), fixing them.
      stem: "The lines \\(\\frac{x - 2}{1} = \\frac{y - 3\\ }{1} = \\frac{z - 4}{- k}\\) and \\(\\frac{x - 1}{k} = \\frac{y - 4}{2} = \\frac{z - 5}{1}\\) are coplanar if",
      reason:
        "second line printed with direction ratios 1,1,1, for which only k = -1 works and no option says so. The paper's solution uses rows (1,1,-k) and (k,2,1), i.e. the second line is (x-1)/k = (y-4)/2 = (z-5)/1; the determinant then gives -k(k+3) = 0, k = 0 or -3 = key D",
    },
    62: {
      stem: "\\(f(x)\\) and \\(g(x)\\) are two differentiable functions on [0,2] such that \\(f^{''}(x) - g^{''}(x) = 0,\\ f'(1) = 2g'(1) = 4,\\ f(2) = 3g(2) = 9,\\) then \\(f(x) - g(x)\\) at \\(x = 3/2\\) is",
      reason:
        "a block of text from a neighbouring question ('...omen are to sit together is given by') was spliced into the data line, destroying the separators. The paper's solution uses f'(1) - g'(1) = 4 - 2 and f(2) - g(2) = 9 - 3, i.e. the chained givens f'(1) = 2g'(1) = 4 and f(2) = 3g(2) = 9",
    },
    88: {
      stem: "The minimum value of \\(f(a) = 2a^{2} - 3a + 10\\) is",
      reason:
        "stem printed as '(2a^2 - 3) + 3(a) + 4', which collapses to 2a^2 + 3a + 1 with minimum -1/8 — in no option. The paper's solution opens 'f(a) = 2a^2 - 3a + 10' and computes the minimum at a = 3/4 as 71/8 = key D",
    },
    105: {
      stem: "Events A, B, C are mutually exclusive events such that \\(P(A) = \\frac{3x + 1}{3},\\ P(B) = \\frac{1 - x}{4}\\) and \\(P(C) = \\frac{1 - 2x}{2},\\) then the set of possible values of x are in the interval",
      reason:
        "text from a neighbouring question was spliced in front of P(C) ('nd mutually exclusive events such that ... at y.'). The paper's solution states P(C) = (1-2x)/2",
    },
    108: {
      // The printed p(X) row is the real distribution ROUNDED to one decimal,
      // and consequently sums to 1.1 — not a distribution at all, and it yields
      // 0.80, which is in no option. The paper's solution uses the unrounded
      // values, which sum to 1.00 and reproduce every option exactly.
      stem: "A random variable X has the probability distribution:\n\n| X | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n|---|---|---|---|---|---|---|---|---|\n| p(X) | 0.15 | 0.23 | 0.12 | 0.10 | 0.20 | 0.08 | 0.07 | 0.05 |\n\nFor the events \\(E = \\{x\\ \\text{is a prime number}\\}\\) and \\(F = \\{x < 4\\},\\) what is \\(P(E \\cup F)\\) equal to?",
      reason:
        "printed p(X) row is rounded to one decimal and SUMS TO 1.1, so it is not a probability distribution and gives 0.80 — in no option. The paper's solution uses 0.15/0.23/0.12/0.10/0.20/0.08/0.07/0.05, which sums to 1.00 and reproduces the whole option list (P(F)=0.50, P(E∩F)=0.35, P(E∪F)=0.77 = key B). The truncated event definitions are restored from the same solution",
    },
    114: {
      // Statements are numbered (1)(2)(3) but options (c)/(d) refer to them as
      // (A)/(B). The solution says "Only first (A) and second (B) statements".
      options: { C: "Only (1) and (2)", D: "Only (1)" },
      reason:
        "options (c) and (d) label the STATEMENTS as (A)/(B) while the stem numbers them (1)/(2)/(3), which reads as self-reference to the option letters. The paper's solution says 'Only first (A) and second (B) statements are correct' = statements 1 and 2 = key C",
    },
  },
  resolutions: {
    26: {
      hold: true,
      reason:
        "DEFECTIVE: the correct count is 5*6*6*4 = 720 (first digit non-zero, two free digits, last digit odd) — which is EXACTLY what the paper's own solution computes, and it appears in NO option (216/105/375/625). The key (625) therefore contradicts the paper's own working, and the option block looks copied from the neighbouring Q27",
    },
    24: {
      answer: "D",
      reason:
        "printed key A (-2) is WRONG — it answers the OTHER classic version of this question. Delta = (alpha-1)^2(alpha+2) vanishes at alpha = 1 and -2, but at alpha = -2 summing the three equations gives 0 = -9, i.e. NO solution. Only alpha = 1 collapses all three to x+y+z = 0 and gives infinitely many = option D",
    },
    35: {
      answer: "B",
      reason:
        "printed key A (7! x 5!) is WRONG and the paper's OWN solution says so: it arranges 6 men round the table in 5! ways, places the women in 6! ways and concludes 'Total number of ways = 6! x 5!' — which is option B, not A",
    },
    88: {
      answer: "D",
      reason:
        "answerable once the stem is repaired to f(a) = 2a^2 - 3a + 10; minimum at a = 3/4 is 71/8 = key D, exactly as the paper's solution computes",
    },
  },
};

PAPERS.m6 = {
  id: "m6",
  label: "NDA Maths Mock Test 6",
  questionDocx: p("Mock -6", "NDA - NA - Math - Mock Test -6 - Question paper ...docx"),
  solutionDocx: p("Mock -6", "NDA - NA - Math Mock Test - 6.. Solutions - Updated file .docx"),
  printedPdf: join(SOURCE_ROOT, "..", "06. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_06.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 6 (LWS test series)",
  // NB: Mock 6 substantially OVERLAPS Mock 5 — Q24, Q35, Q52, Q62, Q108 and
  // Q114 are the same items, carrying the same defects and the same wrong keys.
  // The repairs below therefore mirror m5's, which is also a useful cross-check:
  // m6's copy of Q35 states "Total Number of ways = 6! x 5!" outright.
  errata: {
    52: {
      stem: "The lines \\(\\frac{x - 2}{1} = \\frac{y - 3}{1} = \\frac{z - 4}{- k}\\) and \\(\\frac{x - 1}{k} = \\frac{y - 4}{2} = \\frac{z - 5}{1}\\) are coplanar if",
      reason:
        "second line's y-denominator printed as 1; the paper's solution uses the determinant row (k, 2, 1), giving -k(k+3) = 0, k = 0 or -3 = key D",
    },
    62: {
      stem: "\\(f(x)\\) and \\(g(x)\\) are two differentiable functions on [0,2] such that \\(f^{''}(x) - g^{''}(x) = 0,\\ f'(1) = 2g'(1) = 4,\\ f(2) = 3g(2) = 9,\\) then \\(f(x) - g(x)\\) at \\(x = 3/2\\) is",
      reason:
        "the commas separating the givens were printed as '=' signs, chaining them into one false equality. The paper's solution uses f'(1) - g'(1) = 4 - 2 and f(2) - g(2) = 9 - 3, then 2x + 2 at x = 3/2 = 5 = key D",
    },
    67: {
      stem: "If \\(y = 10^{10^{x}}\\), then \\(\\frac{1}{y}\\frac{dy}{dx} = 10^{x} \\cdot \\lambda\\), where \\(\\lambda\\) is equal to",
      reason:
        "stem printed the exponent flattened as 10^{10x}, for which (1/y)y' = 10 ln10 is CONSTANT and cannot equal 10^x times a constant. With the nested exponent, ln y = 10^x ln10 so (1/y)y' = 10^x (ln10)^2, i.e. lambda = (ln10)^2",
    },
    108: {
      stem: "A random variable \\(X\\) has the probability distribution:\n\n| X | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 |\n|---|---|---|---|---|---|---|---|---|\n| p(X) | 0.15 | 0.23 | 0.12 | 0.10 | 0.20 | 0.08 | 0.07 | 0.05 |\n\nFor the events \\(E = \\{x\\ \\text{is a prime number}\\}\\) and \\(F = \\{x < 4\\},\\) what is \\(P(E \\cup F)\\) equal to?",
      reason:
        "the p(X) table row extracted EMPTY and the event definitions were lost. Restored from the paper's own solution, which uses 0.15/0.23/0.12/0.10/0.20/0.08/0.07/0.05 (summing to 1.00) and computes P(F)=0.50, P(E∩F)=0.35, P(E∪F)=0.77 = key B",
    },
    114: {
      stem: "Consider the following statements:\n1. Mode can be computed from histogram\n2. Median is not independent of change of scale\n3. Variance is independent of change of origin and scale.\nWhich of these is/are correct?",
      optionTexts: ["(1), (2) and (3)", "Only (2)", "Only (1) and (2)", "Only (1)"],
      reason:
        "pandoc read the stem's own (A)/(B)/(C) statement labels as list markers, shattering the option block into fragments. The statements are renumbered 1/2/3 and the options restated; the paper's solution says 'Only first (A) and second (B) statements are correct' = key C",
    },
  },
  resolutions: {
    1: {
      answer: "B",
      reason:
        "no key printed for this question. The paper's own solution ends '{(A u B) n B'} u A' = A u A' = N', i.e. option B",
    },
    10: {
      answer: "B",
      reason:
        "no key printed. Statement I claims TWO values of a make the equation an identity, but the paper's solution shows the three coefficient conditions (a = 1,2 / a = 2,3 / a = +-2) share only a = 2 — ONE value — so Statement I is false and Statement II (a=b=c=0 gives an identity) is true: 'Only II' = option B. NB the printed solution then closes 'Hence, (a) is the correct answer', contradicting its own two preceding lines ('Statement I is false. Statement II is true by definition') — which is why `audit:keys` flags this row SOLN_A!=KEY_B. The flag is a GENUINE defect in the source's concluding letter, not a probe artefact, and the stored answer is already the correct one",
    },
    24: {
      answer: "D",
      reason:
        "printed key A (-2) is WRONG — the same defect as Mock 5 Q24. Delta = (alpha-1)^2(alpha+2) vanishes at 1 and -2, but at alpha = -2 summing the three equations gives 0 = -9, i.e. NO solution. Only alpha = 1 collapses them to x+y+z = 0 for infinitely many = option D",
    },
    35: {
      answer: "B",
      reason:
        "printed key A (7! x 5!) is WRONG and this paper's OWN solution says so explicitly: 6 men round a table in 5! ways, women into the 6 gaps in 6!P5 = 6! ways, 'Total Number of ways = 6! x 5!' = option B. Same defect as Mock 5 Q35",
    },
    45: {
      answer: "D",
      reason:
        "no key printed, but the solution opens with the letter '(d)' and derives it: the hyperbola's foci are (+-3, 0), so for the ellipse 16 - b^2 = 9 and b^2 = 7 = option D",
    },
    58: {
      answer: "A",
      reason:
        "no key printed; the paper's solution states it in words — 'The correct option is A 60 degrees'. Verified: |b+c| = |a| gives 25 + 9 + 2(b.c) = 49, so b.c = 7.5 = 15 cos(theta), cos(theta) = 1/2",
    },
    67: {
      answer: "B",
      reason:
        "no key and no solution printed. With the stem repaired to y = 10^(10^x), (1/y)y' = 10^x (ln10)^2, so lambda = (ln10)^2 = option B. Flagged: option C reads e^{ln(ln10)^2}, which under one parse EQUALS option B — an ambiguity in the printed option, though B is the direct form",
    },
  },
};

PAPERS.m7 = {
  id: "m7",
  label: "NDA Maths Mock Test 7",
  questionDocx: p("Mock - 7", "NDA - NA Mock Test - 7 (Math) Question .docx"),
  solutionDocx: p("Mock - 7", "Mock Test - 7  Updated Solution (4).docx"),
  printedPdf: join(SOURCE_ROOT, "..", "07. Match_Mock_Test_QP_remove_AK_at_end.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_07.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 7 (LWS test series)",
  // NB: Q89 is character-for-character Q88 (stem, options AND key) — the source
  // printed Q88 twice — while Q89's SOLUTION belongs to a lost question about
  // dy/dx = (1-cos x)/(1+cos x). Its options are gone too, so nothing can be
  // reconstructed. It needs no errata: content_hash dedups it into Q88, which
  // keeps the solution that actually matches the stem, and `verify.ts` reports
  // the drop. So this paper legitimately ships 119 rows, not 120.
  errata: {
    44: {
      options: { D: "1" },
      reason:
        "the source prints FIVE options (a)-(e); the fifth ran onto option (d) as `1 (e) log_a(a+b+c)`. The bank is four-option, so (e) is dropped and (d) restored to its own text `1`. The matrix is skew-symmetric of odd order, so the determinant is 0 = key A regardless",
    },
    73: {
      stem: "\\(\\lim_{x \\rightarrow a}\\frac{cosx - cosa}{cotx - cota} =\\)",
      reason:
        "denominator printed `cosx - cota`, which makes the limit 0/(cos a - cot a) = 0 and matches no option. The paper's own solution restates it as `cotx - cota` and differentiates to -sinx / -cosec^2 x = sin^3 x -> sin^3 a = key C",
    },
    107: {
      stem: "If \\(A\\) and \\(B\\) are two events, then \\(P\\)(neither \\(A\\) nor \\(B\\)) equals",
      reason:
        "stem truncated to 'P (neither A nor )' — the B was lost. Restored from the paper's own solution, which writes 'P(Neither A nor B)' and derives 1 - P(A u B) = key A",
    },
    113: {
      stem: "The mean of 5 observations is 5 and their variance is 12.4. If three of the observations are 1, 2 and 6; then the mean deviation from the mean of the data is:",
      reason:
        "variance printed 124, which is arithmetically impossible alongside the answer: with x+y=16 a variance of 124 forces x=24.97, y=-8.97 and M.D. = 8.39, in no option. 12.4 gives the integer pair 5 and 11 — which is what the solution's own step |x-5|+|y-5| = (x-5)+(y-5) assumes (both >= 5) — and reproduces its M.D. = 2.8 = key A",
    },
  },
  resolutions: {
    21: {
      answer: "A",
      reason:
        "no key printed. The paper's own solution opens '(a)' and ends 'Hence roots are rational': D = (a-c)^2 >= 0 is a perfect square with a,b,c rational, so both roots are rational = option A",
    },
    31: {
      answer: "A",
      reason:
        "printed key B (p,q,r in A.P.) is WRONG and this paper's own solution says so: it derives q^2 - r^2 = p^2 - q^2, i.e. 2q^2 = r^2 + p^2, and closes 'Therefore p^2, q^2, r^2 are in A.P.' = option A",
    },
    43: {
      answer: "D",
      reason:
        "printed key D retained. The determinant's (3,1) entry is printed 6 where the standard continuant has 0 (which would give sin4t/sint = option A), but NO source documents the 0: the paper's own solution also uses 6 and lands at 8cos^3 t - 4cos t + 6, which matches no option. Stem, solution and key are mutually consistent at 'None of these', so it ships as printed rather than repaired to fit option A",
    },
    60: {
      answer: "C",
      reason:
        "printed key D (None of these) is WRONG and this paper's own solution contradicts it outright: on (2,3) f(x) = x - 2, so y = x - 2 gives x = y + 2 and the solution states 'f^{-1}(x) = x + 2' = option C",
    },
    84: {
      answer: "B",
      reason:
        "no key printed. The paper's own solution derives h + x = h.cotp/(cotp - cotq) and ends 'Hence, (b) is the correct answer' = option B",
    },
  },
};

PAPERS.m8 = {
  id: "m8",
  label: "NDA Maths Mock Test 8",
  questionDocx: p("Mock - 8", "NDA - NA Mock Test - 8 (Math) Question   .docx"),
  solutionDocx: p("Mock - 8", "NDA - NA Mock Test - 8 (Math  Solution  F.docx"),
  // Q8, Q38 and Q56 are solved in a separate supplement file.
  extraSolutionDocx: [p("Mock - 8", "Mock Test-8  Missing  Solutions  - Sol No - 8 , 38 & 56 .docx")],
  printedPdf: join(SOURCE_ROOT, "..", "08. Match_Mock_Test_QP_remove_AK_at_end.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_08.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 8 (LWS test series)",
  errata: {
    1: {
      context:
        "Consider the complex numbers \\(z_{1}\\) and \\(z_{2}\\) satisfying the relation \\(\\left| z_{1} + z_{2} \\right|^{2} = \\left| z_{1} \\right|^{2} + \\left| z_{2} \\right|^{2}\\)",
      solutionReplace: [
        ["\\(z_{2}{\\bar{z}}_{2}\\) is purely imaginary", "\\(z_{1}{\\bar{z}}_{2}\\) is purely imaginary"],
      ],
      reason:
        "the shared passage prints `|z_1 + z_1|^2`, repeating z_1 inside the modulus. That is load-bearing, not cosmetic: as printed it reduces to 3|z_1|^2 = |z_2|^2, a pure modulus relation that says NOTHING about any argument, so all three of Q1-Q3 become unanswerable and would default to 'none of these'. With z_2 restored it is the standard perpendicularity condition 2Re(z_1 zbar_2) = 0, which is the only reading consistent with the paper's own three keys (b, b, c). Q1's solution also mistypes the conclusion as z_2 zbar_2 — that is |z_2|^2, which is REAL, not imaginary — so that clause is corrected to z_1 zbar_2 as well",
    },
    46: {
      stem: "If \\(f(x) = \\tan^{- 1}\\left( \\frac{sinx}{1 + cosx} \\right)\\), then \\(f'\\left( \\frac{\\pi}{3} \\right) =\\)",
      reason:
        "the stem asks for f(pi/3) but the prime was lost: option (A) is `1/(2(1+cos x))`, still a function of x, which cannot be a value at a fixed point, and the paper's own solution writes \"f'(x) = 1/2. Hence f'(pi/3) = 1/2\". f(x) = arctan(tan(x/2)) = x/2 so f(pi/3) would be pi/6, in no option; f'(pi/3) = 1/2 = key B",
    },
    56: {
      stem: "The radius of the cylinder of maximum volume, which can be inscribed in a sphere of radius \\(R\\) is",
      reason:
        "the stem ended `is [A` — a truncated exam citation (an AIEEE tag), NOT a leaked answer letter. The printed booklet ends the sentence at 'radius R is:' with no citation, so the fragment is dropped. Key B (sqrt(2/3) R) is what the paper's own solution derives",
    },
    74: {
      stem: "A number \\(x\\) is chosen at random from the set \\(\\{ 1,2,3,4,\\cdots,100\\}\\). Define the event: \\(A =\\) the chosen number \\(x\\) satisfies \\(\\frac{(x - 10)(x - 50)}{(x - 30)} \\geq 0\\). Then \\(P(A)\\) is",
      reason:
        "the set's math zone closed immediately after `\\cdots`, leaving `, 100}` outside it as plain text with an unpaired brace. Re-closed around the whole set; the answer (71/100 = 0.71, key A) is unaffected",
    },
  },
  resolutions: {
    18: {
      answer: "B",
      reason:
        "printed key B confirmed. The blind derivation returned C on the strength of the standard textbook result (coefficients EQUAL implies p+q = n+2), but this stem states the coefficients ARE p and q, and the paper's own derivation applies: C(n,p-1)/C(n,p) = p/(n-p+1), so p/q = p/(n-p+1) gives q = n-p+1 and p+q = n+1. Stem, solution and key all agree",
    },
    44: {
      hold: true,
      reason:
        "DEFECTIVE AS PRINTED — options (A) and (C) are byte-identical, and the printed booklet prints its (a) and (c) identically too, so it is the paper's own defect. Both carry exactly the value the paper's solution derives ((1/x)log_10 e - log_e 10/(x (log_e x)^2)), so the question has two correct options. The plausible intent (C as a sign-flipped twin) is a guess no source documents, so it is held rather than invented",
    },
    70: {
      answer: "D",
      reason:
        "no key printed. The point (-2,3) is on the curve (verified: -32+54+24+30-72-18+14 = 0). The paper's own implicit differentiation gives dy/dx = (12x^2-3y^2+12x-5y+9)/(6xy+5x+16y), which at (-2,3) is -9/2, so the NORMAL has slope 2/9 = option D",
    },
    82: {
      answer: "A",
      reason:
        "printed key C (4) is WRONG, and so is the printed solution — which builds a determinant from the wrong points (it writes 5 where p belongs) and then concludes k = 7, a value that is option D, not the key's C. Collinearity of (-5,1), (p,5), (10,7) needs 4/(p+5) = 6/15, so p = 5; check: slope (-5,1)->(5,5) = 0.4 = slope (5,5)->(10,7). Option A",
    },
    112: {
      answer: "A",
      reason:
        "printed key C is WRONG and the paper's own solution says so: both regression lines pass through the means, so ybar = a.xbar + b and xbar = alpha.ybar + beta; with xbar = ybar the solution closes 'xbar = b/(1-a) = beta/(1-alpha)', which is option A verbatim. Option C's beta/(1-beta) mixes two different parameters",
    },
    115: {
      answer: "B",
      reason:
        "printed key A (0 solutions) is WRONG. The stem's trailing `= a real number, is` is a corrupted domain qualifier ('x being a real number, is') that the extractor pulled into the math zone; the equation itself is log_2(x^2-1) = log_(1/2)(x-1). Since log_(1/2)(x-1) = -log_2(x-1), that is log_2[(x^2-1)(x-1)] = 0, i.e. (x-1)^2(x+1) = 1 on the domain x > 1. That function is 0 at x=1, strictly increasing, and 3 at x=2, so it crosses 1 exactly ONCE: one solution = option B",
    },
  },
};

// Mock 9 is the VISION-LANE paper — see `visionPdfs` on the Paper type.
PAPERS.m9 = {
  id: "m9",
  label: "NDA Maths Mock Test 9",
  // NB: m9 is the ONE paper sourced from `Questions_paper/09. Mock Test 9/`
  // rather than the Author Manuscript folder. The manuscript copy holds only
  // DOCX; the PDFs — which are what the vision lane actually reads — exist only
  // here, and the two DOCX copies differ in size, so this folder is used whole
  // rather than mixing a manuscript DOCX with PDFs exported from a different one.
  questionDocx: join(SOURCE_ROOT, "..", "09. Mock Test 9", "NDA - NA - Math Mock Test  - 9 - Question Paper .docx"),
  solutionDocx: join(SOURCE_ROOT, "..", "09. Mock Test 9", "NDA Math - SOLUTION MOCK TEST-9  Solution  ).docx"),
  visionPdfs: {
    qp: join(SOURCE_ROOT, "..", "09. Mock Test 9", "NDA - NA - Math Mock Test  - 9 - Question Paper .pdf"),
    sol: join(SOURCE_ROOT, "..", "09. Mock Test 9", "NDA Math - SOLUTION MOCK TEST-9  Solution.pdf"),
  },
  printedPdf: join(SOURCE_ROOT, "..", "09. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_09.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 9 (LWS test series)",
  // The question paper prints NO answer key. The SOLUTION pdf heads each entry
  // `N. (letter)`, and those letters are ordinary text rather than math, so 109
  // of 120 parse straight out of its text layer — the remaining 11 are numbering
  // variants that `parseVisionAnswerKey` now handles: two headings use `N)`
  // instead of `N.`, and six letters are typeset as MATHEMATICAL ITALIC
  // characters (`(𝑎)`, U+1D44E) rather than ASCII. 118 of 120 parse; the two
  // that do not print no letter at all and are ruled below from their solutions.
  errata: {
    10: {
      options: { D: "none of these" },
      reason:
        "option (D) printed `8 none of these` — a stray leading glyph from the legacy equation object. Not the key (B), but it renders as a meaningless 8",
    },
    29: {
      options: { D: "\\(\\alpha - \\dfrac{9}{4}\\)" },
      reason:
        "option (D) printed the PROPORTIONAL-TO sign for alpha (`\\propto - 9/4`) while the stem and the other three options all use alpha — a symbol-font substitution. This one is answer-critical rather than cosmetic: (D) IS the key, so as printed the correct option is unreadable",
    },
    30: {
      options: { C: "\\(\\dfrac{nM - a}{2}\\)" },
      reason:
        "option (C) printed a capital `A` where the stem defines lower-case `a`. A distractor, not the key (A)",
    },
    33: {
      options: { D: "Nowhere" },
      reason: "option (D) printed `Non where`. A distractor, not the key (C)",
    },
    35: {
      stem: "The maximum and minimum value of the function \\(3x^{4} - 8x^{3} + 12x^{2} - 48x + 25\\) in the interval \\([0, 3]\\)",
      reason:
        "the stem ended at 'in the interval' with the INTERVAL MISSING from the printed paper, and the answer turns on it: on [1,3] the extrema are 16 and -39, which is option (A), while on [0,3] they are f(0) = 25 and -39, which is no option and so key (D). The paper's own solution settles it — it writes 'x = 2 in [0,3]' and then evaluates f(0) = 25 and f(3) = 16 — so [0,3] is restored from the source rather than guessed, and key D stands",
    },
    47: {
      options: { D: "\\(17\\sqrt{5}/15\\)" },
      reason:
        "option (D) printed `7\\sqrt5/15`, dropping the leading 1. The lines 2x - y + 4 = 0 and 2x - y - 5/3 = 0 are |4 + 5/3|/sqrt5 = 17/(3 sqrt5) = 17 sqrt5/15 apart, which is exactly what the paper's own solution derives ('d = 17/3 sqrt5, d = 17 sqrt5 / 15'). Answer-critical: (D) is the key, so as printed the key names a wrong value",
    },
    96: {
      stem: "Let \\(U = \\{1, 2, 3, 4, 5, 6, 7, 8, 9, 10\\}\\), \\(A = \\{1, 2, 5\\}, B = \\{6, 7\\}\\), then \\(A \\cap B'\\) is",
      reason:
        "the universal set was printed with a UNION symbol instead of the letter U, which in a question whose own answer involves an intersection and a complement is actively misleading",
    },
    117: {
      options: { C: "11 km/h" },
      reason: "option (C) printed a doubled slash, `11 km//h`. A distractor, not the key (D)",
    },
  },
  // NB: FOUR of this paper's solution entries solve a DIFFERENT question from the
  // one they are numbered as (see README). For those the printed key belongs to
  // another question and carries no information, so they are ruled from an
  // independent derivation instead: Q9, Q110, Q113, Q116 below.
  resolutions: {
    9: {
      answer: "A",
      reason:
        "the entry numbered 9 in the solution document solves a DIFFERENT question (a mean and standard deviation of 10 observations), so its key 'b' is meaningless here. Derived: (z-1)/(z+1) purely imaginary means w + wbar = 0, and (z-1)(zbar+1) + (zbar-1)(z+1) = 2|z|^2 - 2, so |z| = 1 = option A. An independent blind derivation agreed",
    },
    10: {
      answer: "B",
      reason:
        "printed key B confirmed; the blind derivation (A, interior) is WRONG. The paper's own solution is aligned here and correct: the inequality gives |z|^2 - 4|z| - 5 > 0, i.e. (|z|-5)(|z|+1) > 0, so |z| > 5 — the EXTERIOR of a circle",
    },
    35: {
      answer: "D",
      reason:
        "printed key D confirmed once the missing interval is restored (see the errata above). On [0,3] the extrema are f(0) = 25 and f(2) = -39; option (A) offers 16 and -39, where 16 = f(3) is not the maximum. So 'None of these' is right. The blind derivation returned A only because its packet could not show the interval",
    },
    42: {
      answer: "C",
      reason:
        "printed key A is WRONG, by a sign slip visible in the paper's own solution: it writes '8 - k < 0 => k < 8', where 8 - k < 0 gives k > 8. x^2/(12-k) + y^2/(8-k) = 1 is a hyperbola only when the denominators have OPPOSITE signs, i.e. 8 < k < 12 = option C. For k < 8 both are positive, which is an ellipse, so option A is false",
    },
    49: {
      answer: "A",
      reason:
        "printed key D (0) is WRONG and the paper's solution contradicts itself — it derives '8L^2 - L = 136', gets the non-integral roots 4.186 and -4.061, and then states 'no. of integral value = 1'. Correct: the area is |4L^2 + 2L - 2|, so 4L^2 + 2L - 2 = 70 gives 2L^2 + L - 36 = 0, L = 4 or -4.5, and the -70 branch has negative discriminant. Exactly ONE integral value. Verified directly: L = 4 gives vertices (4,-6), (-3,8), (-8,-2) and area exactly 70 = option A",
    },
    68: {
      answer: "C",
      reason:
        "printed key D is WRONG on its endpoints. tan^2(arcsin x) > 1 excludes x = +-1, where arcsin x = +-pi/2 and the tangent is UNDEFINED, and excludes x = +-1/sqrt2, where tan^2 = 1 and so is not > 1. Option D removes only the OPEN interval, thereby keeping +-1/sqrt2, and retains the closed endpoints +-1. Option C — (-1,1) minus the CLOSED [-1/sqrt2, 1/sqrt2] — excludes all four. The paper's own solution writes closed brackets in its final line, which is the same slip",
    },
    81: {
      answer: "B",
      reason:
        "printed key C (-16/5) is WRONG, and impossibly so: the integrand x/(1-x)^(3/4) is POSITIVE throughout (0,1), so the integral cannot be negative. The paper's solution substitutes 1-x = z^4 but never flips the limits — x: 0 to 1 means z: 1 to 0 — and the sign it loses is exactly the one that matters. Done correctly: -4 times the integral from 1 to 0 of (1 - z^4) = -4(-4/5) = 16/5 = option B",
    },
    110: {
      answer: "C",
      reason:
        "the entry numbered 110 solves a DIFFERENT question (a displacement/velocity problem, s = 45t + 11t^2 - t^3), so its key 'a' carries no information here. Derived: adding 1 to each term makes 1/(b+c), 1/(c+a), 1/(a+b) an A.P., which holds precisely when a^2, b^2, c^2 are in A.P. Verified on a witness — a,b,c = 1,5,7 gives 1/12, 5/8, 7/6 with a common difference of 13/24, and 1,25,49 IS an A.P. while 1,5,7 is neither an A.P. nor a G.P. Option C",
    },
    113: {
      answer: "A",
      reason:
        "the entry numbered 113 solves a DIFFERENT question (var(x) = (x^2-1)/12 = 10), so its key 'd' carries no information here. sin 2x has period pi; taking the modulus halves it, so |sin 2x| has period pi/2 = option A",
    },
    116: {
      answer: "C",
      reason:
        "the entry numbered 116 solves a DIFFERENT question (identifying the graph y = |x-2| + 4), so its key 'd' carries no information here. (1010)_2 = 10 and (111)_2 = 7, so the product is 70 = option C",
    },
    31: {
      answer: "B",
      reason:
        "the solution prints no answer letter for this question. Its working settles it: 2cos t = 1 - sin t squared gives 5sin^2 t - 2sin t - 3 = 0, so sin t = 1 (excluded, t != pi/2) or -3/5; then 2cos t = 1 + 3/5 = 8/5 forces cos t = +4/5 (the -4/5 branch fails the original equation), and 7(4/5) + 6(-3/5) = 28/5 - 18/5 = 2 — which is the value the solution itself computes = option B",
    },
    46: {
      answer: "C",
      reason:
        "the solution prints no answer letter. Its working settles it: the slope through (1,0) and (-2,sqrt3) is (sqrt3-0)/(-2-1) = -1/sqrt3, so the angle with the x-axis is 150 degrees — which the solution states outright = option C",
    },
  },

};

// Mock 10 is a SINGLE DOCX interleaving each question with its `SOL. (x)`.
PAPERS.m10 = {
  id: "m10",
  label: "NDA Maths Mock Test 10",
  questionDocx: p("Mock - 10", "NDA Maths Mock Test 10 Ques & Sol Paper .docx"),
  printedPdf: join(SOURCE_ROOT, "..", "10. Match_Mock_Test_QP.pdf"),
  sourceFile: "NDA_Maths_Mock_Test_10.docx",
  questionCount: 120,
  note: "NDA Mathematics mock test 10 (LWS test series)",
  // NB: this manuscript numbers TWO questions "96" — the second integral
  // (int dx/(sinx - cosx)) and then (int sin^2 x dx). The numbering scan keeps a
  // strictly increasing run, so the first of the pair lost its number and its
  // text was absorbed into Q95's block (see the Q95 errata below). Consequences:
  //   * the printed booklet numbers them 96 and 97, so from Q96 on the PRINTED
  //     number is one AHEAD of the manuscript's — verified against the booklet by
  //     scripts/nda-mock/align-printed.ts (manuscript Q99 = printed 100,
  //     Q112 = printed 113, Q119 = printed 120);
  //   * we store the MANUSCRIPT numbering, because that is the document these
  //     rows are extracted from and it stays self-consistent 1..120 like every
  //     other paper. The booklet is used to ARBITRATE content, not to renumber;
  //   * the orphaned int dx/(sinx - cosx) question is NOT ingested. Its stem,
  //     options and solution all survive inside Q95's raw block, so nothing is
  //     lost from the source — but adding it needs a hand-authored
  //     `extraQuestions` entry and a number the paper does not actually print.
  errata: {
    27: {
      stem: "If A is a square matrix such that \\(A^{2}\\)= A & B = \\(I - A\\) , then AB + BA + \\(I\\) - \\({(I\\ –\\ A)}^{2}\\)=",
      reason:
        "the stem prints `B = -A`, dropping the I. The paper's own solution uses B = I - A on every line, and with A^2 = A that gives AB = A(I-A) = 0, BA = 0 and (I-A)^2 = I-A, so the expression is I - (I-A) = A = key A. Read as printed (B = -A) it would be -A, i.e. option C — which is exactly what an independent blind derivation returned, so the stem is what is wrong here, not the key",
    },
    32: {
      stem: "The value of \\(\\left| \\begin{matrix}\n1 & a & a^{2} \\\\\n1 & b & b^{2} \\\\\n1 & c & c^{2}\n\\end{matrix} \\right|\\) is",
      options: { A: "(a - b) (b - c) (c - a)" },
      reason:
        "option (A) extracted EMPTY: its text broke onto its own line ABOVE the option run as `a. (a -- b) (b -- c) (c --`, truncated mid-factor, so the stem kept the orphan and (A) got nothing. The value is the Vandermonde determinant (a-b)(b-c)(c-a), which is what the paper's own solution derives, and the orphan fragment matches it as far as it goes. Key A stands",
    },
    94: {
      options: { D: "\\(\\frac{8r}{3}\\)" },
      reason:
        "option (D) ended in a stray `![` — the source has an image whose ALT TEXT is prose ('Let R be the radius & h be the height...'), and the alt straddles the option/solution boundary, so the image opener landed on (D) and the alt plus its `](path)` landed in the solution. Key C (4r/3) is correct and unaffected",
    },
    95: {
      stem: "\\(\\int_{}^{}{\\frac{1}{\\sqrt{9x - 4x^{2}}}dx}\\)equals to",
      optionTexts: [
        "\\(\\frac{1}{9}\\sin^{- 1}\\left( \\frac{9x - 8}{8} \\right)\\)+ C",
        "\\(\\frac{1}{2}\\sin^{- 1}\\left( \\frac{8x - 9}{9} \\right)\\)+ C",
        "\\(\\frac{1}{3}\\sin^{- 1}\\left( \\frac{9x - 8}{8} \\right)\\)+ C",
        "\\(\\frac{1}{2}\\sin^{- 1}\\left( \\frac{9x - 8}{9} \\right)\\)+ C",
      ],
      answer: "B",
      solution:
        "\\(\\int_{}^{}{\\frac{1}{\\sqrt{9x - 4x^{2}}}dx}\\) = \\(\\frac{1}{\\sqrt{4}}\\int_{}^{}{\\frac{1}{\\sqrt{\\frac{9}{4}x - x^{2}}}dx}\\)\n\n= \\(\\frac{1}{2}\\int_{}^{}\\frac{1}{\\sqrt{- \\left\\lbrack x^{2} - \\frac{9}{4}x + \\left( \\frac{9}{8} \\right)^{2} \\right\\rbrack + \\left( \\frac{9}{8} \\right)^{2}}}\\) = \\(\\frac{1}{2}\\int_{}^{}\\frac{1}{\\sqrt{\\left( \\frac{9}{8} \\right)^{2} - \\left( x - \\frac{9}{8} \\right)^{2}}}dx\\)\n\n= \\(\\frac{1}{2}\\sin^{- 1}\\left( \\frac{x - \\frac{9}{8}}{\\frac{9}{8}} \\right)\\) + C \\(\\left\\lbrack \\because\\int_{}^{}\\frac{dx}{\\sqrt{a^{2} - x^{2}}} = \\sin^{- 1}\\frac{x}{a} \\right\\rbrack\\)\n\n= \\(\\frac{1}{2}\\sin^{- 1}\\left( \\frac{8x - 9}{9} \\right)\\) + C",
      reason:
        "this block spans TWO questions (the source's duplicate '96'), and the parser keeps the LAST option chain — so Q95 was handed the NEXT question's options, key and worked solution while its own text sat in the stem. All four fields are restored from that same block VERBATIM, not retyped. The value is confirmed independently: (1/2)int dx/sqrt((9/8)^2-(x-9/8)^2) = (1/2)sin^-1((8x-9)/9) = option B, which is also what the block's own SOL. (b) says, and the printed booklet's Q95 matches",
    },
    99: {
      stem: "How much the area bounded by the curve y = \\(x^{2}\\) & line y=16?",
      options: { D: "\\(\\frac{128}{3}\\) sq. Units" },
      reason:
        "the whole option block was nested INSIDE an image link, so the stem kept a trailing `![**` and option (D) kept the closing `](path/image27.emf)`. Options are recoverable verbatim from the alt text; only the figure is lost. Key C (256/3) is correct and unaffected",
    },
    100: {
      options: { C: "\\(e^{y}\\) = \\(\\frac{x^{3}}{3}\\) + \\(e^{x}\\) + c" },
      solutionReplace: [
        [
          "Integrating we get, \\(e^{x}\\) = \\(\\frac{x^{3}}{3}\\) + \\(e^{x}\\) + c",
          "Integrating we get, \\(e^{y}\\) = \\(\\frac{x^{3}}{3}\\) + \\(e^{x}\\) + c",
        ],
      ],
      reason:
        "option (C) and the solution's final line both print `e^x =` where the derivation two steps earlier establishes e^y dy = (e^x + x^2)dx, so integrating gives e^y. As printed, option C is self-contradictory (e^x on both sides). The PRINTED BOOKLET (its Q101) shows `e^y` on the left, so this is a lost superscript, not a design. Key C stands",
    },
    116: {
      options: { A: "\\(\\sin^{- 1}\\left( \\frac{1}{\\sqrt{a^{2} + b^{2} + c^{2}}} \\right)\\)" },
      reason:
        "option (A) printed `a^{c}` for the third term of the radicand; the printed booklet (its Q117) has c^2, and a^c is meaningless here. A distractor either way — the answer is (D) 90 degrees, ruled below",
    },
  },
  resolutions: {
    27: {
      answer: "A",
      reason:
        "printed key A is correct; the blind derivation returned C only because it solved the DAMAGED stem (`B = -A`), which is repaired above to `B = I - A`. With A^2 = A: AB = A(I-A) = A - A^2 = 0, BA = 0, and (I-A)^2 = I - 2A + A = I - A, so the expression is I - (I-A) = A. The paper's own solution derives exactly this and ends '= A'",
    },
    36: {
      answer: "D",
      reason:
        "printed key D retained — the SAME item as Mock 7 Q43, and settled the same way. The determinant's (3,1) entry prints 6 where the standard continuant has 0 (0 would give sin4t/sint = option A), but no source documents the 0: this paper's own solution also uses 6, derives C^3 - 2C + 6 = 8cos^3 t - 4cos t + 6, and closes 'Hence option (d) is correct'. Stem, solution and key are mutually consistent at 'none of these', so it ships as printed rather than repaired to fit option A",
    },
    52: {
      answer: "B",
      reason:
        "no key printed. The paper's own solution derives x = 150/sqrt3 at 60 degrees and y = 150 - 150/sqrt3 = 150(sqrt3-1)/sqrt3 travelled in 2 minutes; times 30 gives 4500(sqrt3-1)/sqrt3 metres per hour = option B",
    },
    112: {
      hold: true,
      reason:
        "DEFECTIVE AS PRINTED — options (b) and (c) are byte-identical, and the PRINTED BOOKLET (its Q113) prints them identically too, so this is the paper's own defect and not an extraction artifact. The correct directions (1,2,-1) and (-1,1,-2) are exactly what BOTH carry, so the question has two correct options; shipping it would mark an identical option wrong",
    },
    116: {
      answer: "D",
      reason:
        "no key printed. The line's direction ratios (a,b,c) are exactly the plane's normal, so the line is perpendicular to the plane and the angle between line and plane is 90 degrees. The paper's own solution says precisely that: 'Obviously the line perpendicular to the plane because a/a = b/b = c/c i.e. there direction ratios are proportional' = option D",
    },
  },
};


// ── Weekly NDA-1 2026 series (WEEKLY_ROOT). Four papers; see the note on
//    WEEKLY_ROOT for why Test-5 is absent. ─────────────────────────────────
//
// Measured differences from the ten-paper series, none of them guessable:
//  - stray `dir="rtl"` runs split question NUMBERS mid-digit (w3 loses 26 of
//    120 without `normalizeRtlSpans`);
//  - the answer key, where one exists, is a standalone DOCX holding a GRID
//    table rather than a tail `ANSWER KEYS` block;
//  - only w1 and w3 have a key document at all. w2 and w4 draw every answer
//    from letters printed on their solutions, and 21 and 17 questions
//    respectively carry NO key from any source — those rest on the blind
//    derivation alone and must be adjudicated by hand before commit.
PAPERS.w1 = {
  id: "w1",
  label: "NDA Maths Weekly Mock Test 1 (08-03-26)",
  questionDocx: w("01", "MATHS MOCK TEST-1 (8-3-26) (1).docx"),
  solutionDocx: w("01", "MATHS MOCK TEST-1 (8-3-26) SOLUTION (2).docx"),
  answerKeyDocx: w("01", "ANS KEY MATHS MOCK TEST-1 NDA-1 2026 (1).docx"),
  printedPdf: w("01", "MATHS MOCK TEST-1 (8-3-26) (1).pdf"),
  sourceFile: "NDA_Maths_Weekly_Mock_2026_T1.docx",
  questionCount: 120,
  note: "NDA Mathematics weekly mock test 1, 08-03-26 (LWS NDA-1 2026 test series)",
  // Grid key is complete (120/120) and agrees with all 33 letters printed on
  // the solutions — 0 disagreements. The strongest key evidence of the four.
  errata: {
    10: {
      stem:
        "The smallest positive integral value of \\(n\\) for which \\((1 + \\sqrt{3}i)^{n/2}\\) is positive real, is",
      reason:
        "the printed stem's exponent is the constant 1/2, so NO n appears anywhere in it and the question — which asks for the smallest n — cannot be answered at all. The repair is documented by the paper's own solution, whose first line reads '(1 + sqrt3 i)^{n/2}'. Not a repair chosen to make an answer fit: it makes the printed key WRONG (see the resolution below), which is the opposite of convenient",
    },
    50: {
      optionTexts: ["\\(2\\pi\\)", "\\(\\pi\\)", "0", "2"],
      reason:
        "this question alone labels its options `A) B) C) D)` — uppercase, closing paren only, no opening paren. Measured across all four weekly papers it is the ONLY such line, so the four texts are supplied here rather than teaching the shared label pattern an uppercase form: `A.`/`A)` occurs in ordinary assertion-reason prose ('...and R explains A'), and loosening it would put all fourteen papers at risk to fix one question. Texts are verbatim; the key is untouched",
    },
    77: {
      answer: "A",
      reason:
        "PRINTED KEY C (29/5) IS WRONG; k = 6 = option A. The 3:2 internal division of (1,1) and (2,4) is ((3*2+2*1)/5, (3*4+2*1)/5) = (8/5, 14/5) — which the paper's own solution computes correctly — and 2(8/5) + 14/5 = 30/5 = 6. So the solution's own point refutes its key",
    },
    89: {
      answer: "B",
      reason:
        "PRINTED KEY D IS WRONG; the answer is B. The bisector direction is a_hat + b_hat = (3i+4j)/5 + (5i+12j)/13 = (64i + 112j)/65, of magnitude sqrt(256/65) = 1.98456, so the unit bisector is (8i + 14j)/sqrt260. Option D, (11i+23j)/sqrt650, is a unit vector but is NOT parallel to the bisector at all (its cross product with the sum is non-zero) — so it fails the only property the question asks for. Option A is the well-built distractor: it points the right way but has magnitude 0.99228, i.e. it is not a unit vector",
    },
    107: {
      answer: "D",
      reason:
        "PRINTED KEY B (k > 3) IS WRONG; the answer is D (k >= 3). f'(x) = 3k x^2 - 18x + 9 >= 0 for all x needs k > 0 and discriminant 324 - 108k <= 0, i.e. k >= 3. The boundary is admissible, not excluded: at k = 3, f'(x) = 9(x-1)^2, which is zero only at the ISOLATED point x = 1 (f'(0) = f'(2) = 9), and a function whose derivative vanishes at isolated points is still increasing. Note this paper's sibling w2 Q89 keys the SAME convention the other way — there the key correctly includes the isolated zero — so the two are inconsistent with each other",
    },
    116: {
      answer: "A",
      reason:
        "PRINTED KEY B (3,2) IS WRONG; the answer is A (2,3), and B looks like the pair transposed. Raising sqrt(y'') = cbrt(y'+3) to the sixth power gives (y'')^3 = (y'+3)^2. The highest derivative present is y'', so the ORDER is 2 — an order of 3 is impossible for an equation containing no third derivative — and its power is 3, so the degree is 3. The paper's own solution performs exactly this LCM-of-6 step",
    },
    117: {
      answer: "C",
      reason:
        "PRINTED KEY B (2,1) IS WRONG; the answer is C (1,1), and the paper's own solution refutes the key in words. As printed the denominator is the integral of (dy/dx) dx = y + c, so the equation is y(y+c) = x y'(y+c) + 2 — highest derivative y', appearing to the first power, hence order 1 and degree 1. The solution states outright 'This is a first-order equation', which is incompatible with its own key's order of 2. (The classical Clairaut form uses 2/(dy/dx) and would give (1,2) = option A; that reading also contradicts key B, so B is wrong either way.)",
    },
    66: {
      answer: "D",
      reason:
        "PRINTED KEY B IS WRONG; the answer is D ('None of these'). np = 4 and npq = 3 give q = 3/4, p = 1/4, n = 16, so P(X=1) = C(16,1)*(1/4)*(3/4)^15 = 4*(3/4)^15 = 0.05345. The correct expression is SPLIT ACROSS TWO OPTIONS and neither is right: (A) 16(3/4)^15 has the right base with a coefficient 4x too large, and (B) 4(1/4)^15 has the right coefficient with p and q swapped in the base (3.7e-09, seven orders of magnitude out). Option (C) states 'n = 16, p = 1/4', which is not a probability at all. The printed solution makes the SAME p/q swap as its key — it writes 4(1/4)^15 verbatim — so key and solution are consistent with each other and both wrong",
    },
    16: {
      answer: "A",
      reason:
        "PRINTED KEY D IS WRONG; the period is 1. The solution's entire argument is a non-sequitur — it says '[x] is not a periodic function, therefore f(x) is non-periodic', reasoning about [x] in ISOLATION when the stem combines it as -x + [x], which is exactly the fractional part -{x} and IS periodic with period 1. Since tan(pi*x) also has period 1, f(x+1) = f(x) identically; verified to 1e-14 at seven awkward points (0.13, 0.37, 0.61, 1.29, -0.71, 2.44, 3.87), and 1/4, 1/3, 1/2 and 3/4 were each tested and rejected, so 1 is the FUNDAMENTAL period and option A is right",
    },
  },
  // Three shared-context blocks this paper prints with no usable header, so
  // detectDirectionSets found only one set (22-23) out of four and eight
  // questions arrived with nothing to answer FROM. Transcribed verbatim.
  contextSets: [
    {
      from: 51,
      to: 53,
      context:
        "Let \\(f(x)\\) and \\(g(x)\\) be two functions defined as: " +
        "\\(f(x) = \\lim_{n \\rightarrow \\infty}\\frac{x^{2n} - 1}{x^{2n} + 1}\\) and " +
        "\\(g(x) = \\left( \\frac{1 + 5x^{2}}{1 + 3x^{2}} \\right)^{1/x^{2}}\\) for \\(x \\neq 0\\).",
    },
    {
      from: 54,
      to: 56,
      context:
        "Consider the function \\(f(x)\\) defined as \\(f(x) = \\left\\{ \\begin{matrix} " +
        "\\frac{1 - \\cos(4x)}{x^{2}}, & x < 0 \\\\ a, & x = 0 \\\\ " +
        "\\frac{\\sqrt{x}}{\\sqrt{16 + \\sqrt{x}} - 4}, & x > 0 \\end{matrix} \\right.\\) " +
        "Let \\(g(x) = \\lbrack x\\rbrack\\) denote the greatest integer function.",
    },
    {
      from: 109,
      to: 110,
      context:
        "Consider a sphere \\(S\\) given by the equation " +
        "\\(x^{2} + y^{2} + z^{2} - 2x + 4y - 6z - 11 = 0\\). A plane \\(P\\) passes through " +
        "the point \\((1, -2, 3)\\) and is perpendicular to the line joining the origin to " +
        "the centre of the sphere.",
    },
  ],
  // TWO WRONG PRINTED KEYS on this paper (Q10 here, Q16 in the errata above),
  // both surfaced by the blind pass and both proved from the paper's own
  // working rather than from the derivation that flagged them.
  //
  // A corrected key goes in `errata.answer` wherever it can, NOT here: that
  // replaces the key before adjudication, so the blind derivation keeps working
  // as a live check and the agreement shows up as a real AGREE. `resolutions`
  // short-circuits the comparison, which is right only when there is nothing to
  // compare — Q10 is here precisely because its blind derivation is `null` (the
  // agent correctly refused to answer a stem that mentions no n).
  //
  // Note this paper's grid key agrees with its solution letters on all 33
  // questions where both exist — so two sources agreeing is not evidence the
  // answer is right, only that one was typed from the other.
  // Q61-72 is this paper's statistics/probability block and it is the worst-made
  // stretch of the series: FIVE of its questions have no correct option, plus
  // the Q66 key error in the errata above. Each was derived exactly (Fraction /
  // exhaustive count), and in every case the printed options are near-misses
  // rather than a value we failed to reach — which is what distinguishes a
  // defective question from a wrong derivation.
  resolutions: {
    44: {
      hold: true,
      reason:
        "NO CORRECT OPTION — the printed one has the right magnitude and the wrong SIGN. sinA - sqrt6 cosA = sqrt7 cosA gives tanA = sqrt6 + sqrt7, so cosA + sqrt6 sinA = sinA[1/(sqrt6+sqrt7) + sqrt6] = sinA[(sqrt7 - sqrt6) + sqrt6] = +sqrt7 sinA. Verified on BOTH branches of tanA = sqrt6+sqrt7: at A = 1.3770 the expression is +2.5962223 and sqrt7 sinA is +2.5962223; at A = 4.5186 both are -2.5962223. The printed key B is -sqrt7 sinA, which is the negative on both. The error is traceable: the solution SQUARES the given equation, which loses the sign, and the option was written from that ambiguous route rather than from the linear one",
    },
    62: {
      hold: true,
      reason:
        "NO CORRECT OPTION. Two distinct numbers from {1..50}: 16 are multiples of 3, so P(product divisible by 3) = 1 - C(34,2)/C(50,2) = 1 - 561/1225 = 664/1225 = 0.54204. The options are 16/50 (0.32), 17/50 (0.34), 33/50 (0.66) and the key 13/25 (0.52). 664/1225 is in lowest terms, and no rounding reaches 13/25 — that would need 637 favourable pairs against the true 664. Drawing WITH replacement instead gives 0.5376, so no reading of the stem lands on a printed option either",
    },
    63: {
      hold: true,
      reason:
        "DEFECTIVE OPTION — the printed key points at a placeholder that was never filled in. Option (C), which the key selects, reads 'Value based on area ratio': that is a description of the method, not a value, so it cannot be the probability. The paper's solution is the same non-answer ('Calculated by (Area of region where y < 1)/(Total Area of triangle)') and never computes a number. The true probability is 5/6, which no option offers. Held rather than repaired: nothing in the source documents the intended option text, and inventing it would be inventing the answer",
    },
    65: {
      hold: true,
      reason:
        "NO CORRECT OPTION, and the options are a scrambled version of the right value. 6 white and 9 black; P(first draw of 4 all white) = C(6,4)/C(15,4) = 1/91, then from the remaining 2W/9B, P(second draw of 4 all black) = C(9,4)/C(11,4) = 21/55. The product is 3/715. The printed options split that value between them — (B) 3/256 carries the right numerator, (A) 5/715 and (C) 1/715 the right denominator — and none is 3/715. The key is (A)",
    },
    68: {
      hold: true,
      reason:
        "NO CORRECT OPTION. n1=10, mean 10, var 4; n2=20, mean 20, var 9. Combined mean = 50/3, so the combined variance is [10(4 + (10-50/3)^2) + 20(9 + (20-50/3)^2)]/30 = 266/9 = 29.5556. The printed key is 29.33, which is 88/3 = 29.3333 — a different number, not a rounding of ours: the options are quoted to two decimals and one of them (30.00) is exact, so 29.56 would have been printed if intended",
    },
    72: {
      hold: true,
      reason:
        "NO CORRECT OPTION UNDER EITHER READING, and the stem and its own solution use DIFFERENT DATA. The stem lists the six known observations as 6, 12, 4, 8, 10, 12; the solution lists 6, 7, 10, 12, 12, 13 (the standard NCERT set). From the stem's data, x+y = 20 and x^2+y^2 = 218, giving xy = 91 and the pair (13, 7). From the solution's data, x+y = 12 and x^2+y^2 = 80, giving the pair (4, 8). The options are (12,10), (14,6), (15,5) and (11,9) — neither pair appears. The key (14,6) has the right sum for the stem's data but x^2+y^2 = 232 against the required 218",
    },
    110: {
      hold: true,
      reason:
        "NO CORRECT OPTION — the question is degenerate, and its sibling Q109 is what exposes it. Sphere S: x^2+y^2+z^2-2x+4y-6z-11 = 0 has centre (1,-2,3) and radius 5 — and (1,-2,3) is EXACTLY the point the plane P is required to pass through. So P cuts through the centre, its section is already a great circle of radius 5, and the sphere having that as a great circle is S itself. The family S + lambda*P = 0 confirms it independently: forcing the family's centre onto P gives -14*lambda = 0, i.e. lambda = 0. All four printed options are concentric with S but carry constants +11, -14, +9, +5, i.e. radii sqrt3, 2*sqrt7, sqrt5 and 3 — none is 5. Q109 is unaffected; its answer 5 is offered as option (B)",
    },
    51: {
      answer: "B",
      reason:
        "printed key B is CORRECT. This entry exists only because the blind derivation is STALE: it was made before the headerless Passage block was declared in contextSets above, so the agent saw a stem referring to an f(x) that was nowhere in its packet and rightly returned null. With the context restored, |x| < 1 makes x^(2n) -> 0 so f = (0-1)/(0+1) = -1 = option B; verified numerically at x = 0.3, 0.9 and -0.5, all converging to -1.000000000",
    },
    52: {
      answer: "B",
      reason:
        "printed key B is CORRECT; same stale-blind situation as Q51. log g = (1/x^2)*log((1+5x^2)/(1+3x^2)) -> 5 - 3 = 2, so L = e^2 = option B. Verified: g(0.1) = 6.8424, g(0.01) = 7.38315, g(0.001) = 7.388997, converging on e^2 = 7.389056",
    },
    10: {
      answer: "C",
      reason:
        "printed key B is WRONG, and the paper's own solution refutes it. With the stem repaired to the exponent n/2 that the solution itself prints, (1 + sqrt3 i)^(n/2) = 2^(n/2) * exp(i*pi*n/6), which is positive real exactly when n is a multiple of 12. The solution factors it as (-2)^(n/2) * omega^n and then asserts that is positive 'when n = 6, 12, 24, 36' — but at n = 6 its OWN expression evaluates to (-2)^3 * omega^6 = -8, a NEGATIVE real. Its list is wrong at the first element and the key follows that error. Verified: n=3 gives 2.83i, n=6 gives -8, n=12 gives +64, so 12 = option C",
    },
  },
};

PAPERS.w2 = {
  id: "w2",
  label: "NDA Maths Weekly Mock Test 2 (15-03-26)",
  questionDocx: w("02", "MATHS MOCK TEST-2 (15-3-26) NDA-1.docx"),
  solutionDocx: w("02", "MATHS MOCK TEST-2 (15-3-26) SOLUTION NDA-1.docx"),
  printedPdf: w("02", "MATHS MOCK TEST-2 (15-3-26) NDA-1.pdf"),
  sourceFile: "NDA_Maths_Weekly_Mock_2026_T2.docx",
  questionCount: 120,
  note: "NDA Mathematics weekly mock test 2, 15-03-26 (LWS NDA-1 2026 test series)",
  // Q108's number is printed INSIDE its own stem — "...the deviations of 50
  // observations from 30 is **108.** then the mean..." — so the numbering scan
  // never sees a Q108 start. That costs TWO questions, not one: with no
  // boundary, Q108's text and its four options are absorbed into Q107, and
  // under "last chain wins" Q107 ships with Q108's options (50/30/51/31) and an
  // answer letter that points into them. Q107 is repaired here; Q108 is
  // supplied as an extraQuestion below.
  errata: {
    // Five questions across this series print their DATA as a picture of a
    // table. The stem is then unanswerable from text alone, which is the defect
    // the ten-paper series still carries unresolved on m3 Q60/Q93. These are
    // clean 2-row/2-column grids, so they are transcribed as GFM pipe-tables —
    // the bank's own convention for tabular question content, which renders on
    // /browse and exports as a native Word table — rather than attached as an
    // image. An image is reserved for a genuine diagram (see Q109 below).
    104: {
      stem:
        "The mean deviation from the median for the following data is\n\n" +
        "| \\(x\\) | 10 | 11 | 12 | 13 |\n" +
        "|---|---|---|---|---|\n" +
        "| \\(f\\) | 6 | 12 | 18 | 12 |",
      reason:
        "the frequency table is printed as an image (media/image1.png), so the stem carried no data at all and the question could not be answered from its text. Transcribed verbatim from that image as a pipe-table",
    },
    110: {
      context:
        "An incomplete frequency distribution is given below. Total of the frequency is 229.\n\n" +
        "| Variate | Frequency |\n" +
        "|---|---|\n" +
        "| 10-20 | 12 |\n" +
        "| 20-30 | 30 |\n" +
        "| 30-40 | \\(x\\) |\n" +
        "| 40-50 | 65 |\n" +
        "| 50-60 | 45 |\n" +
        "| 60-70 | 25 |\n" +
        "| 70-80 | 18 |",
      reason:
        "the distribution is printed as an image (media/image3.png), leaving all THREE questions of this set (110-112) with no data. Transcribed verbatim. The transcription is corroborated by the paper's own keys: the listed frequencies sum to 195, so x = 229 - 195 = 34, and that x reproduces the printed key for Q111 (median 45.9 = 46) and Q112 (mean 10495/229 = 45.8)",
    },
    86: {
      context:
        "Consider the functions \\(u = e^{x}\\sin x\\) and \\(v = e^{x}\\cos x\\), then",
      reason:
        "the shared context for Q86-87 prints \\(v = e^{x}\\cos^{x}\\) — a cosine with no argument, raised to the power x, which is malformed and leaves both questions unanswerable as written. Read as e^x cos x, which the option sets corroborate rather than merely permit: it makes Q86 exactly u^2 + v^2 (its key C, since v*u' - u*v' = e^(2x)) and Q87 exactly 2v (its key B). Both printed keys stand",
    },
    107: {
      stem:
        "If a variable takes discrete values \\(x + 4,x - \\frac{7}{2},x - \\frac{5}{2},x - 3,x - 2,x + \\frac{1}{2},x + 5(x > 0),\\) then the median is",
      optionTexts: [
        "\\(x - 1/2\\)",
        "\\(x - 5/4\\)",
        "\\(x - 2\\)",
        "\\(x + 5/4\\)",
      ],
      reason:
        "Q108's missing boundary let its text and options be absorbed into this block, so the stem ran on past 'then the median is' and the four options extracted were Q108's (50/30/51/31). Both restored verbatim from the source. Printed key (c) is untouched and is correct: the seven values sort to x-7/2, x-3, x-5/2, x-2, x+1/2, x+4, x+5, whose 4th (median) term is x-2 = option (c)",
    },
  },
  // This paper prints no answer key at all; 20 of its questions also carry no
  // letter on their solution, so these are the only source of an answer for
  // them. Each was derived from the stem and then re-verified numerically
  // (mpmath/sympy) against the question's own data, never against the
  // derivation that proposed it.
  resolutions: {
    6: {
      answer: "D",
      reason:
        "2x = -1 + i*sqrt3 makes x a primitive cube root of unity, so 1 + x - x^2 = -2w^2 and 1 - x + x^2 = -2w. Both sixth powers are 64, and the stem subtracts them, so the value is 0. Verified numerically: the expression evaluates to 7e-15",
    },
    19: {
      answer: "D",
      reason:
        "the left side is ((a^2-b^2)^2)^(x-1). Taking logs, (x-1)(log|a-b| + log(a+b)) = 2x*log|a-b|/2 - log(a+b) reduces to x*log(a+b) = log|a-b|, so x = log|a-b| / log(a+b). Matching exponents termwise is NOT available here — it gives -2 = 0 — which is why the log route is the intended one",
    },
    21: {
      answer: "B",
      reason:
        "g[f(x)] = log_e(f(x)^2) = log_e(3x^2 - 4x + 5). That quadratic has its minimum at x = 2/3 with value 11/3 and is unbounded above, so the range is [log_e(11/3), infinity)",
    },
    27: {
      answer: "B",
      reason:
        "15 divides n! for every n >= 5, so only 1!+2!+3!+4! = 33 survives, and 33 mod 15 = 3. Confirmed by computing the full 95-term sum",
    },
    31: {
      answer: "A",
      reason:
        "C(2n,1), C(2n,2), C(2n,3) in AP gives (2n)^2 - 9(2n) + 14 = 0, i.e. 2n^2 - 9n + 7 = 0, so the requested 2n^2 - 9n = -7. Confirmed by scanning m = 2n for 2*C(m,2) = C(m,1) + C(m,3): the only admissible root is m = 7",
    },
    32: {
      answer: "A",
      reason:
        "setting x = y = z = 1 gives the coefficient sum (1-2+3)^n = 2^n = 128, so n = 7; the greatest binomial coefficient of (1+x)^7 is C(7,3) = 35",
    },
    41: {
      answer: "C",
      reason:
        "columns 2 and 3 of the determinant are identical ((a+2), (a+3), (a+4) in both), so it vanishes for every a. Verified numerically at a = 3.7",
    },
    42: {
      answer: "C",
      reason:
        "with A = arccos x, B = arccos y, C = arccos z summing to pi, the standard identity gives x^2 + y^2 + z^2 + 2xyz = 1, so the expression equals 1 - 2xyz",
    },
    48: {
      answer: "D",
      reason:
        "each cosine is at least -1, so a sum of four of them equal to -4 forces every theta_i = pi. Then cot(theta_i/2) = cot(pi/2) = 0 and the sum is 0",
    },
    65: {
      answer: "A",
      reason:
        "2ae = 8 and 2a/e = 25 give ae = 4 and a/e = 12.5, whose product is a^2 = 50. So a = 5*sqrt2 and the major axis 2a = 10*sqrt2",
    },
    70: {
      answer: "D",
      reason:
        "coplanarity fixes lambda = 4; the lines then meet where t = s = 1, at (5,5,5). That point fails options A (25 vs 20), B (20 vs 25) and C (30 vs 24), and satisfies x = y = z",
    },
    79: {
      answer: "A",
      reason:
        "f(x) = x/(1+|x|) has derivative 1/(1+x)^2 for x > 0 and 1/(1-x)^2 for x < 0, both tending to 1 at the origin, and f is continuous there — so it is differentiable on the whole line. Confirmed with a one-sided difference quotient at 40-digit precision: both sides give 1.000000",
    },
    81: {
      answer: "D",
      reason:
        "approaching 3 from below, [x] = 2 so the quotient is -1/(x-3) -> +infinity; from above [x] = 3 and the quotient is 0. The one-sided limits differ, so the limit does not exist",
    },
    86: {
      answer: "C",
      reason:
        "with u = e^x sin x and v = e^x cos x, v*u' - u*v' = e^(2x)(cos x sin x + cos^2 x - sin x cos x + sin^2 x) = e^(2x), which is exactly u^2 + v^2. Verified numerically at x = 0.7 (both sides 4.0551999668)",
    },
    88: {
      answer: "B",
      reason:
        "dy/dx = 4x - 1 equals the line's slope 3 at x = 1, where y = 2 - 1 + 1 = 2, giving the point (1,2)",
    },
    89: {
      answer: "A",
      reason:
        "dy/dx = 1/(1+x) - 4/(2+x)^2 = x^2 / [(1+x)(2+x)^2], which is non-negative for every x > -1 and zero only at the isolated point x = 0. So the function increases throughout x > -1, not merely on a sub-interval",
    },
    95: {
      answer: "B",
      reason:
        "sin x + cos x = sqrt2 * cos(x - pi/4), so the integral is (pi/2)log(sqrt2) + integral of log cos over [-pi/2, 0], i.e. (pi/4)log2 - (pi/2)log2 = -(pi/4)log2. Verified by quadrature to 40 digits",
    },
    102: {
      answer: "B",
      reason:
        "111000 in binary is 56, and .0101 is 1/4 + 1/16 = 0.3125, giving 56.3125",
    },
    106: {
      answer: "C",
      reason:
        "variance = sum(x^2)/N - (sum(x)/N)^2 = 18000/60 - (960/60)^2 = 300 - 256 = 44",
    },
    110: {
      answer: "C",
      reason:
        "the listed frequencies (12, 30, 65, 45, 25, 18) sum to 195 and the total is 229, so the missing x = 34. The same x reproduces the paper's own printed keys for Q111 and Q112, which is what corroborates the table transcription in the errata above",
    },
    109: {
      hold: true,
      reason:
        "UNANSWERABLE AS EXTRACTED. The stem is 'The curve given below represent a/an' and the curve is an image (media/image2.png) — a cumulative-frequency plot. Unlike this paper's five other figures it is a genuine DIAGRAM, not a table, so it cannot be transcribed into the stem; and describing it in words would state the answer, since the answer IS what the curve is called (ogive). This pipeline has no image_url attach path, so the row is held rather than shipped with a stem that names nothing. Re-admit it if a figure-attach step is added",
    },
  },
  extraQuestions: [
    {
      number: 108,
      numberLabel: "108",
      stem: "If the sum of the deviations of 50 observations from 30 is 50, then the mean of these observations is",
      optionTexts: ["50", "30", "51", "31"],
      answer: "D",
      solution:
        "Given \\(\\sum_{i = 1}^{50}\\left( x_{i} - 30 \\right) = 50\\), so \\(\\sum_{i = 1}^{50} x_{i} = 30 \\times 50 + 50 = 50 \\times 31\\). " +
        "Hence mean \\(\\overline{x} = \\frac{\\sum_{i = 1}^{50} x_{i}}{50} = \\frac{50 \\times 31}{50} = 31\\).",
      reason:
        "the source prints this question's NUMBER inside its own stem ('...from 30 is **108.** then the mean...'), so no Q108 start exists to split on and the value the stem depends on is missing. Both are recovered from the paper's own worked solution, which opens 'sum(x_i - 30) = 50' and derives 50*31/50 = 31 — its own key (d). The repair is minimal and self-consistent: one value restored, key untouched",
    },
  ],
};

PAPERS.w3 = {
  id: "w3",
  label: "NDA Maths Weekly Mock Test 3 (22-03-26)",
  questionDocx: w("03", "MOCK TEST-3 MATHS (22-3-26).docx"),
  solutionDocx: w("03", "MOCK TEST-3 MATHS SOLUTION (22-3-26).docx"),
  answerKeyDocx: w("03", "ANS KEY MOCK-3 TEST 2026 NDA-1 (22-3-26).docx"),
  printedPdf: w("03", "MOCK TEST-3 MATHS (22-3-26).pdf"),
  sourceFile: "NDA_Maths_Weekly_Mock_2026_T3.docx",
  questionCount: 120,
  note: "NDA Mathematics weekly mock test 3, 22-03-26 (LWS NDA-1 2026 test series)",
  errata: {
    // The grid prints "59" in the cell where 49 belongs, so 59 appears twice
    // and 49 never does. The row settles it: a row carries k, k+20, k+40,
    // k+60, k+80, k+100, and the offending cell is the THIRD pair of the row
    // whose first pair is 9 — i.e. 49. The genuine 59 sits in the row
    // beginning 19, and reads B, which is also what the solution document
    // prints. So both numbers are recoverable and neither is a guess.
    57: {
      stem: "The minimum value of \\((x - a)(x - b)\\) is",
      reason:
        "the stem prints 'maximum', which no option can satisfy: (x-a)(x-b) is an upward parabola and is unbounded above (with a=2, b=7 it takes 14, 24, 9114, 991014 at x = 0, 10, 100, 1000). The repair is documented by the paper's OWN solution, which sets dy/dx = 0 and then labels the result — in Hindi — 'फलन का निम्निष्ठ मान', the function's MINIMUM value. That stationary value is -(a-b)^2/4, exactly the printed key D, so a single edit to one word makes stem, solution and key all consistent; the alternative would be to call both the solution and the key wrong",
    },
    // The source prints ONE combined solution block headed 'Solutions (Q. Nos.
    // 29-31)' immediately after solution 28, so the whole block was absorbed
    // into Q28 — leaving Q28's stored solution carrying three other questions'
    // working and Q29/30/31 with none at all. Split back out here. Answers are
    // unaffected (all four AGREE with the blind pass); this is a solution-text
    // repair only, and `solution` is not part of content_hash.
    28: {
      solution:
        "Ans-(b) : If \\(n\\) is an integer taken at random we get " +
        "\\(\\Rightarrow \\frac{2^{n}}{5^{4}} = \\frac{2^{4}}{5^{4}} = \\frac{16}{625}\\)",
      reason:
        "this solution had absorbed the whole 'Solutions (Q. Nos. 29-31)' block that follows it in the source — 889 characters carrying three other questions' working, including the \\mathbf{31.} matrix that audit:omml flagged as unconvertible. Trimmed to its own working; the three absorbed solutions are restored to Q29, Q30 and Q31 below",
    },
    29: {
      solution:
        "We have \\(P(A) = \\frac{1}{4}\\), \\(P(B) = \\frac{2}{5}\\) and \\(P(A \\cup B) = \\frac{1}{2}\\). " +
        "From the addition theorem, \\(P(A \\cup B) = P(A) + P(B) - P(A \\cap B)\\), so " +
        "\\(P(A \\cap B) = \\frac{1}{4} + \\frac{2}{5} - \\frac{1}{2} = \\frac{3}{20}\\).",
      reason: "restored from the combined 'Solutions (Q. Nos. 29-31)' block absorbed into Q28",
    },
    30: {
      solution:
        "We have \\(P(A) = \\frac{1}{4}\\) and \\(P(A \\cap B) = \\frac{3}{20}\\) (from Q29), so " +
        "\\(P\\left( A \\cap B' \\right) = P(A) - P(A \\cap B) = \\frac{1}{4} - \\frac{3}{20} = \\frac{1}{10}\\).",
      reason: "restored from the combined 'Solutions (Q. Nos. 29-31)' block absorbed into Q28",
    },
    31: {
      solution:
        "\\(P\\left( A' \\cap B' \\right) = P\\left( \\overline{A \\cup B} \\right) = 1 - P(A \\cup B) " +
        "= 1 - \\frac{1}{2} = \\frac{1}{2}\\).",
      reason:
        "restored from the combined 'Solutions (Q. Nos. 29-31)' block absorbed into Q28. The complement is written \\overline{A \\cup B} rather than (A \\cup B)': a PRIME on a parenthesised group containing \\cup is unconvertible to OMML (the documented failure class — ^{c}, {(...)}' and ^{\\prime} all fail too, and \\overline is the only passing form). KaTeX renders either, so the defect would surface only as raw LaTeX in a teacher's downloaded Word answer key",
    },
    75: {
      answer: "D",
      reason:
        "PRINTED KEY A IS WRONG, and the paper's own solution refutes it in its own working. The auxiliary equation m^3 - 4m^2 + 5m - 2 = 0 factors as (m-1)^2 (m-2), and the solution writes exactly that — '(D-1)(D-1)(D-2) = 0, D = 1,1,2'. Roots 1 (double) and 2 give (c1 + c2 x) e^x + c3 e^(2x) = option D. Option A is the same expression with e^(-x), which would need a root at -1; the cubic does not have one (its value at m = -1 is -12)",
    },
    90: {
      stem:
        "The variance of the following distribution is\n\n" +
        "| \\(x_{i}\\) | 2 | 3 | 11 |\n" +
        "|---|---|---|---|\n" +
        "| \\(f_{i}\\) | \\(\\frac{1}{3}\\) | \\(\\frac{1}{2}\\) | \\(\\frac{1}{6}\\) |",
      reason:
        "the distribution is printed as an image (media/image1.png), so the stem carried no data. Transcribed verbatim from that image; the f values sum to 1, i.e. it is a probability distribution rather than a frequency table, which the printed key is consistent with",
    },
    94: {
      context:
        "Some data is kept on a computer disk but unfortunately some of it is lost because of a virus. Only the following could be recovered, where the three Performance columns are Average, Good and Excellent.\n\n" +
        "| | Average | Good | Excellent | Total |\n" +
        "|---|---|---|---|---|\n" +
        "| Male | | | 10 | |\n" +
        "| Female | | | | 32 |\n" +
        "| Total | | 30 | | |\n\n" +
        "An expert committee was formed, which decided that the following facts were self evident. " +
        "Half the students were either excellent or good. \\(40\\%\\) of the students were females. " +
        "One-third of the male students were average.",
      reason:
        "the partially-recovered table is printed as an image (media/image2.png), so all FIVE questions of this set (94-98) lost the only three numbers the puzzle supplies and were unanswerable. The blanks are deliberate — they are what the questions ask for — so the table is transcribed with them intact. The reading (Male/Excellent 10, Female/Total 32, Total/Good 30) is confirmed by all five printed keys simultaneously: 40% female = 32 gives 80 students and 48 males; a third of males average = 16 (key Q94); excellent+good = 40 with good = 30 leaves excellent = 10, all male, so female excellent = 0 (key Q95); male good = 48 - 16 - 10 = 22 (key Q98); 22/30 = 0.73 (key Q96); (30-22)/32 = 0.25 (key Q97)",
    },
    24: {
      answer: "A",
      reason:
        "printed key B is WRONG. The number of ways to throw a sum of 6 with n dice is the number of compositions of 6 into n parts of 1..6, i.e. C(5, n-1) — verified by exhaustive enumeration: 10 of 1296 with four dice, 10 of 216 with three, 5 of 36 with two. Those probabilities are 5/648 : 5/108 : 5/36, a ratio of 1 : 6 : 18 = option A. The paper's own solution asserts the favourable counts are 2^4, 2^3, 2^2 (16, 8, 4), which are simply not the counts — the true values are 10, 10, 5 — and its 1:3:9 follows from that error",
    },
    36: {
      answer: "C",
      reason:
        "printed key A (=2) is WRONG; A = 5 = option C. The first term is log2 log2 log4 256 = log2 log2 4 = log2 2 = 1. The second is 2*log_sqrt2(2) = 2*2 = 4, since log_sqrt2(2) = 2. So A = 5. The solution's own rewrite of the second argument to (sqrt2)^2 changes nothing — that is still 2, so the term is still 4 and A is still 5 — but it then evaluates the term as 1, which is where the key comes from. For the key to be right log_sqrt2(2) would have to be 0.5 rather than 2, so the solution contradicts itself rather than merely disagreeing with us",
    },
    49: {
      answer: "C",
      reason:
        "answer-key grid defect: the cell holding this answer is mislabelled '59'. It is the 3rd pair of the row starting 9 (9, 29, [49], 69, 89, 109), so it is Q49. Its letter C is therefore Q49's",
    },
    59: {
      answer: "B",
      reason:
        "answer-key grid defect (the other half of Q49's): with '59' printed twice, a first-wins read hands Q59 the letter C belonging to Q49. The genuine Q59 cell is the 3rd pair of the row starting 19 and reads B — independently confirmed by the solution document, which also gives B. This was the ONLY disagreement between the grid and the 66 letters printed on the solutions",
    },
  },
  resolutions: {
    100: {
      hold: true,
      reason:
        "NO CORRECT OPTION. With A(1,1), B(7,21), C(7,-3), D(12,2) the four points are all hull vertices and the quadrilateral they bound has area 132 (shoelace in convex order A, C, D, B) — the options are 179, 180, 181, 182. The PRINTED vertex order A-B-C-D is self-intersecting (side DA crosses side BC), so it bounds no simple region at all; its shoelace magnitude is 47. The printed key 179 comes from the solution adding triangle ABC (72) to triangle ABD (107) — two triangles that share the SIDE AB rather than a diagonal, so they overlap and tile nothing. Splitting on the actual diagonal AC gives 72 + 25 = 97. A corrupted vertex cannot rescue it either: B and C share x = 7, so the area is 132 whatever D's y-coordinate is. Held rather than repaired, since no single edit reaches any printed option",
    },
    57: {
      answer: "D",
      reason:
        "printed key D is CORRECT and stands. This entry exists only because the stem was repaired above ('maximum' -> 'minimum', documented by the solution's own Hindi), which leaves the blind derivation STALE: it correctly returned null against the UNREPAIRED stem, since an upward parabola has no maximum. Its own note records that under the minimum reading the answer is D, so the two agree once the repair is applied — but adjudicate compares against a null and would otherwise report this as unresolved. A stem repair invalidates any blind derivation of that question; the honest move is to say so rather than to leave a defective-looking verdict",
    },
    44: {
      hold: true,
      reason:
        "DEFECTIVE AS PRINTED — no option is derivable under EITHER reading, and the paper's two sources contradict each other. The coefficient determinant is -(k+3)(2k+1), so the system has a unique solution, and is therefore consistent, for every k except -3 and -1/2: verified explicitly, k=1 gives (41/12, 5/12, 3/4) and k=2 gives (81/25, 7/25, 3/5). So 'consistent' is true of BOTH option C and option D. At k=-3 equation 2 reads 0*z = 3 and at k=-1/2 equation 3 forces z=2 while equation 2 gives z=6/5, so 'inconsistent' is true of BOTH A and B. On top of that the printed KEY is B — a value that makes the system inconsistent — while the printed SOLUTION concludes k = -3, which is option A. Repairing this would mean choosing between two wrong sources AND inventing a tie-break the question does not supply, so it is held instead",
    },
  },
};

PAPERS.w4 = {
  id: "w4",
  label: "NDA Maths Weekly Mock Test 4 (29-03-26)",
  questionDocx: w("04", "MATHS MOCK TEST-4 (29-3-26) NDA-1 (2).docx"),
  solutionDocx: w("04", "MATHS MOCK TEST-4 (29-3-26) NDA-1 SOLUTION (2).docx"),
  printedPdf: w("04", "MATHS MOCK TEST-4 (29-3-26) NDA-1 (2).pdf"),
  sourceFile: "NDA_Maths_Weekly_Mock_2026_T4.docx",
  questionCount: 120,
  note: "NDA Mathematics weekly mock test 4, 29-03-26 (LWS NDA-1 2026 test series)",
  errata: {
    14: {
      optionTexts: [
        "\\(400\\sqrt{3}\\text{ }m\\)",
        "\\(\\frac{400}{\\sqrt{3}}\\text{ }m\\)",
        "\\(\\frac{100}{\\sqrt{3}}\\text{ }m\\)",
        "\\(200\\sqrt{3}\\text{ }m\\)",
      ],
      reason:
        "option (d) absorbed the set header that follows it. The source prints 'For next two question' on its own line between this question and Q15, and since it names neither Direction/Passage nor a Q-range, detectDirectionSets does not cut there and the trailing line was swallowed by the last option chain. Measured across all four weekly papers this spelling occurs ONCE, so it is repaired here rather than taught to the shared header pattern",
    },
    16: {
      context:
        "For the next two questions, consider the sphere \\(4\\left( x^{2} + y^{2} + z^{2} \\right) - 16x + 20y - 32z + 5 = 0\\).",
      reason:
        "the stem is the bare phrase 'Find the centre' — the object lives in Q15, which the swallowed 'For next two question' header was introducing, so as extracted this question names nothing to find the centre OF. The sphere is restored as shared context from Q15's own stem. Note the key (d) is correct and is NOT changed: dividing by 4 gives centre (2, -5/2, 4) and radius 5 (which is also Q15's printed key), and option (b) prints (2, 5/2, 4) — right in two coordinates, wrong in the SIGN of y — so no option matches and 'none' is right. Option (d) is printed as the bare word 'Not' in the source and is left as printed: nothing in the paper documents the intended wording, and expanding it would be invention",
    },
    61: {
      answer: "B",
      reason:
        "PRINTED KEY D ('None of the above') IS WRONG; the minimum is 0 = option B. x^2 - 3x + 1 has discriminant 5 > 0, so it vanishes at (3 +/- sqrt5)/2, and an absolute value cannot go below 0 — so 0 is attained and is the minimum. The solution differentiates as though the modulus were not there (dy/dx = 2x - 3 = 0 at x = 3/2), which is the one point where the quadratic is most negative: y = |-5/4| = 5/4 is a local MAXIMUM of the modulus, not its minimum. 5/4 is not an option, which is how the solution talked itself into 'None of the above'",
    },
    65: {
      stem:
        "I. \\(\\int_{}^{}\\ \\frac{d\\left( x^{2} + 1 \\right)}{\\sqrt{x^{2} + 2}}\\) is equal to \\(2\\sqrt{x^{2} + 2} + C\\)\n" +
        "II. \\(\\int_{}^{}\\ \\frac{x^{\\alpha/2}}{\\sqrt{1 + x^{11}}}dx\\) is \\(\\frac{2}{11}ln\\left| x + \\sqrt{1 + x^{11}} \\right| + C\\)\n\n" +
        "Which of the following is/are correct?",
      reason:
        "Statement I's denominator lost its radical: it prints (x^2 + 2) where the paper's own solution writes 'I = integral dt/sqrt(1+y) where x^2+1 = t, = 2*sqrt(1+t) + C = 2*sqrt(x^2+2) + C. Thus, Statement I is true.' As printed the statement is FALSE (the integral of d(x^2+1)/(x^2+2) is ln(x^2+2) + C — at x = 0.7 the claimed antiderivative differentiates to 0.887 against an integrand of 0.562), which would make the answer 'None of these' rather than the printed key C. Restoring the radical the solution documents makes I true and key C ('Only I') correct. Statement II is left AS PRINTED and is genuinely false: its right-hand side needs ln|x^(11/2) + sqrt(1+x^11)|, which is exactly what the solution derives, so the printed 'x' is the source's error and II is correctly excluded either way",
    },
    53: {
      answer: "C",
      reason:
        "PRINTED KEY B (=1) IS WRONG; f'(3/2) = -1 = option C. The set's function simplifies to a sign: x - 2*sqrt(x-1) = (sqrt(x-1) - 1)^2, so f(x) = |sqrt(x-1) - 1| / (sqrt(x-1) - 1) * x = sign(sqrt(x-1) - 1) * x. That is +x for x > 2 and -x for 1 < x < 2, so f' is +1 and -1 on the two branches. The PAIR is built on exactly that branch point — Q52 samples x = 10 (key A = 1, correct) and Q53 samples x = 3/2, which is on the other side. The paper's solution for this question prints 'f'(3/2) = 1' with no working at all: it is Q52's answer carried over unrecomputed, which defeats the only thing the pair was set to test. Verified at 40 digits: f' = -1 at x = 1.2, 1.5, 1.9 and +1 at x = 2.5, 10, 17",
    },
    31: {
      stem:
        "The two positive number, whose difference is 12 and whose A.M. exceeds their G.M. by 2, are",
      reason:
        "the stem trails a stray fragment of untranslated Hindi ('वे दो धनात्मक' — 'those two positive'), a bilingual-paper artifact left mid-sentence in the source. Dropped as a dangling fragment; the English stem is complete without it and the key is untouched",
    },
    98: {
      stem:
        "Find the mean deviation about median for the following data.\n\n" +
        "| Marks | 0-10 | 10-20 | 20-30 | 30-40 | 40-50 | 50-60 |\n" +
        "|---|---|---|---|---|---|---|\n" +
        "| Number of girls | 6 | 8 | 14 | 16 | 4 | 2 |",
      reason:
        "the frequency table is printed as an image (media/image1.png), so the stem carried no data. Transcribed verbatim as a pipe-table. This question also has NO printed key, so without the table it could be neither answered nor derived",
    },
  },
  // Like w2 this paper prints no answer key; 17 questions carry no letter on
  // their solution either, so these resolutions are their only answer source.
  // Each derived from the stem, then re-verified numerically against the
  // question's own data.
  resolutions: {
    65: {
      answer: "C",
      reason:
        "printed key C is CORRECT and stands. This entry exists only because Statement I's stem was repaired above (its lost radical restored from the paper's own solution), which leaves the blind derivation STALE — it answered D on the reasoning that BOTH statements are false AS PRINTED, and its own note says outright that if the radical is an extraction loss the intended key is C. So the two agree once the repair is applied. A stem repair invalidates any blind derivation of that question; recording it beats leaving a permanent false DISAGREE",
    },
    1: {
      answer: "A",
      reason:
        "rationalising gives numerator 3 - 4sin^2(theta) + 8i*sin(theta), so the imaginary part vanishes only when sin(theta) = 0. The single value in 0 < theta < 2pi is pi",
    },
    5: {
      answer: "A",
      reason:
        "A intersect B is a subset of A, so (A intersect B) intersect A is just A intersect B, whose size is the given 2. n(A) = 8 is not needed",
    },
    18: {
      answer: "D",
      reason:
        "with sin(theta) and cos(theta) as the roots of ax^2+bx+c, the sum is -b/a and the product c/a. Squaring the sum: b^2/a^2 = 1 + 2c/a, so b^2 = a^2 + 2ac. Then (a+c)^2 = a^2 + 2ac + c^2 = b^2 + c^2, which is option D. Option A fails unless c = 2a, so it is not an identity",
    },
    34: {
      answer: "B",
      reason:
        "x^3 + 1 - x^2 - x factors as (x-1)^2 (x+1), and (x-1)^2 > 0 for the excluded x != 1, so the inequality holds exactly when x > -1. Confirmed by sampling x = -2, -0.5, 0.5, 2",
    },
    92: {
      hold: true,
      reason:
        "NO CORRECT OPTION — every option is a variant of the same overcount. Numbered ranks are 2-10, so prime-numbered cards are 2,3,5,7 (16 cards) and multiples of 5 are 5,10 (8 cards), and the four 5s belong to BOTH sets. Exhaustive enumeration of all C(52,2) = 1326 pairs gives 118 favourable, i.e. 59/663. The printed key D is 64/663 = 16*8/1326, the naive product, which both counts the four same-card 'pairs' and double-counts the six five-five pairs; the solution writes exactly that product. Option B (62/663) removes only the same-card cases and option A (94/663) applies that half-correction while treating face cards as numbers. The correct 59/663 is absent, so no single repair reaches a printed option",
    },
    49: {
      hold: true,
      reason:
        "NO CORRECT OPTION AS PRINTED, and no source documents a repair (this question has neither a printed key nor a worked solution). Expanding, 2f(x) - 3f(2x) + f(4x) cancels at orders 0 and 1 but its x^2 coefficient is 3f''(0) = 12, which is NOT zero — so divided by x^3 the expression diverges. Verified numerically with f(x) = 2x^2: the ratio is 1.2e4 at x = 1e-3 and 1.2e5 at x = 1e-4, i.e. growing like 12/x, while the SAME numerator over x^2 is a constant 12. So the intended denominator is x^2 and the intended answer 12 = option A. Repairing the stem on that reasoning is exactly the 'repair to make an answer fit' the pipeline forbids, so the row is held instead",
    },
    55: {
      answer: "A",
      reason:
        "the integral over [2,9] is the integral over [-3,9] minus that over [-3,2] = -5/6 - 7/3 = -19/6",
    },
    56: {
      answer: "D",
      reason:
        "partial fractions give 2/(x+1) - 1/((x+1)^2+1), so the integral is 2log2 - arctan2 + pi/4. All THREE printed forms equal that: II differs only by writing arccot2 = pi/2 - arctan2, and III by arccot3 = pi/2 - arctan3 together with arctan2 + arctan3 = 3pi/4. Verified by quadrature to 40 digits — all three agree with the integral at 1.0645438067",
    },
    58: {
      answer: "A",
      reason:
        "product rule on f(x)g(x) = e^x arcsin(x) gives e^x arcsin(x) + e^x/sqrt(1-x^2), i.e. e^x(1/sqrt(1-x^2) + arcsin x). Note the set defines h = f[g(x)] but this question asks for the PRODUCT's derivative, not the composite's",
    },
    69: {
      answer: "C",
      reason:
        "dy/dx = e^y(e^x + e^-x) separates to e^-y dy = (e^x + e^-x)dx, giving -e^-y = e^x - e^-x + c', i.e. e^-y = e^-x - e^x + c. Option A is also malformed (it prints e^x twice)",
    },
    75: {
      answer: "B",
      reason:
        "substituting into 3x - 5y + 7 gives +8 at (2,1) and +21 at (3,-1). Same sign, so the points lie on the same side",
    },
    78: {
      answer: "B",
      reason:
        "x = 5 sec(phi), y = 3 tan(phi) is x^2/25 - y^2/9 = 1, so a = 5, b = 3 and c^2 = a^2 + b^2 = 34. The distance between the foci is 2c = 2*sqrt34",
    },
    87: {
      answer: "A",
      reason:
        "the third vector a+b+c is the sum of the first two entries' constituents — it lies in the span of a and b+c — so the three are coplanar and the scalar triple product is 0",
    },
    97: {
      answer: "C",
      reason:
        "with both means zero, r = sum(x_i y_i) / (n * sigma_x * sigma_y) = 12 / (10*2*3) = 0.2",
    },
    98: {
      answer: "A",
      reason:
        "N = 50, so the median class is 20-30 (cumulative frequency 14 before it, f = 14), giving median = 20 + (25-14)/14*10 = 27.857. Then sum f|x - median| = 517.14 and the mean deviation is 517.14/50 = 10.343, i.e. 10.34. Depends on the table transcribed in the errata above",
    },
    106: {
      answer: "C",
      reason:
        "mean 5 gives a + b = 10; SD 2 gives sum(x^2) = 145, so a^2 + b^2 = 62 and hence ab = (100 - 62)/2 = 19. The quadratic with those roots is x^2 - 10x + 19 = 0",
    },
    118: {
      answer: "B",
      reason:
        "the GP condition gives t^2 + 5t + 4 = 0 with t = tan(theta), so t = -1 or t = -4. t = -1 is INADMISSIBLE: the three terms become -1, 0, 0, which is not a geometric progression (the ratio is undefined). Only t = -4 gives a genuine GP (-4, -6, -9, ratio 1.5), and there the expression is (7 + 5/4)/(9 - 16) = -33/28. The rejected root yields exactly 12/5 = option A, so that distractor is the trap this question is built around",
    },
    119: {
      answer: "D",
      reason:
        "writing theta = (theta+alpha) - alpha and theta+2alpha = (theta+alpha) + alpha, the relation reduces to -2 sin(u)cos(alpha) = 4 cos(u)sin(alpha), i.e. tan(theta+alpha) = -2 tan(alpha). The requested sum is therefore 0. Verified numerically by solving for theta at alpha = 0.3",
    },
  },
  // Writes `**Directions (Q Nos. 57-59)**` — no dot after the Q. A fifth
  // spelling of the shared-context header; NOS_RANGE already tolerates it and
  // `tests/nda-mock-parse.test.ts` pins that so it cannot regress.
};

export function requirePaper(id: string): Paper {
  const paper = PAPERS[id];
  if (!paper) {
    throw new Error(`unknown paper "${id}". known: ${Object.keys(PAPERS).join(", ")}`);
  }
  return paper;
}
